/**
 * Build Pipeline for RIS Einzelfallmeldung Bookmarklet
 *
 * Flow:
 *   src/bookmarklet-citrix.ts   ──┐
 *   src/bookmarklet-desktop.ts  ──┼──▶  dist/install.html
 *   src/template.html           ──┤
 *                                 └──▶  worker/index.ts (generated)
 */

import * as esbuild from "esbuild";
import { writeFileSync, readFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

// Paths
const PATHS = {
  // Source files
  citrixSrc: join(root, "src/bookmarklet-citrix.ts"),
  desktopSrc: join(root, "src/bookmarklet-desktop.ts"),
  templateSrc: join(root, "src/template.html"),
  // Output directories
  distDir: join(root, "dist"),
  workerDir: join(root, "worker"),
  // Generated files
  installHtml: join(root, "dist/install.html"),
  workerTs: join(root, "worker/index.ts"),
  citrixMin: join(root, "dist/bookmarklet-citrix.min.js"),
  citrixTxt: join(root, "dist/bookmarklet-citrix.txt"),
  desktopMin: join(root, "dist/bookmarklet-desktop.min.js"),
  desktopTxt: join(root, "dist/bookmarklet-desktop.txt"),
} as const;

interface BuildResult {
  name: string;
  minified: string;
  url: string;
  jsSize: number;
  urlSize: number;
}

async function buildBookmarklet(
  entryPoint: string,
  name: string
): Promise<BuildResult> {
  const result = await esbuild.build({
    entryPoints: [entryPoint],
    bundle: true,
    minify: true,
    write: false,
    target: "es2022",
    format: "iife",
    charset: "utf8",
    legalComments: "none",
    mangleProps: /^_/,
    drop: ["console", "debugger"],
  });

  const minified = result.outputFiles[0]?.text ?? "";
  const url = `javascript:${encodeURIComponent(minified)}`;

  return {
    name,
    minified,
    url,
    jsSize: Buffer.byteLength(minified, "utf8"),
    urlSize: Buffer.byteLength(url, "utf8"),
  };
}

async function build() {
  console.log("🔨 Building bookmarklets...\n");

  // 1. Compile both variants in parallel
  const [citrix, desktop] = await Promise.all([
    buildBookmarklet(PATHS.citrixSrc, "Citrix (mailto:)"),
    buildBookmarklet(PATHS.desktopSrc, "Desktop (Clipboard)"),
  ]);

  // 2. Ensure dist directory exists
  mkdirSync(PATHS.distDir, { recursive: true });

  // 3. Write minified JS and URL files
  writeFileSync(PATHS.citrixMin, citrix.minified);
  writeFileSync(PATHS.citrixTxt, citrix.url);
  writeFileSync(PATHS.desktopMin, desktop.minified);
  writeFileSync(PATHS.desktopTxt, desktop.url);

  // 4. Generate HTML from template
  const html = generateHtml(citrix, desktop);

  // 5. Write dist/install.html
  writeFileSync(PATHS.installHtml, html);

  // 6. Generate worker/index.ts
  generateWorker(html);

  // 7. Output summary
  printSummary(citrix, desktop);

  return { citrix, desktop };
}

/**
 * Generate HTML by replacing placeholders in template
 */
function generateHtml(citrix: BuildResult, desktop: BuildResult): string {
  if (!existsSync(PATHS.templateSrc)) {
    throw new Error(`Template not found: ${PATHS.templateSrc}`);
  }

  const template = readFileSync(PATHS.templateSrc, "utf8");

  // Escape quotes for href attribute
  const safeCitrixUrl = citrix.url.replace(/"/g, "&quot;");
  const safeDesktopUrl = desktop.url.replace(/"/g, "&quot;");

  return template
    .replace(/\{\{BOOKMARKLET_CITRIX\}\}/g, safeCitrixUrl)
    .replace(/\{\{BOOKMARKLET_DESKTOP\}\}/g, safeDesktopUrl)
    .replace(
      /\{\{BOOKMARKLET_SIZE_CITRIX\}\}/g,
      `${citrix.urlSize.toLocaleString()} Bytes`
    )
    .replace(
      /\{\{BOOKMARKLET_SIZE_DESKTOP\}\}/g,
      `${desktop.urlSize.toLocaleString()} Bytes`
    );
}

/**
 * Generate worker/index.ts with embedded HTML
 */
function generateWorker(html: string): void {
  // Escape backticks and ${} for template literal
  const escapedHtml = html
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$\{/g, "\\${");

  const workerCode = `// ⚠️ GENERATED FILE - DO NOT EDIT
// Source: src/template.html + src/bookmarklet-*.ts
// Run 'pnpm build' to regenerate

const HTML = \`${escapedHtml}\`;

export default {
  async fetch(): Promise<Response> {
    return new Response(HTML, {
      headers: { "Content-Type": "text/html;charset=UTF-8" },
    });
  },
};
`;

  writeFileSync(PATHS.workerTs, workerCode);
}

/**
 * Print build summary
 */
function printSummary(citrix: BuildResult, desktop: BuildResult): void {
  console.log(`✅ Build complete!\n`);

  console.log(`📊 Citrix (mailto:):`);
  console.log(`   JS:  ${citrix.jsSize.toLocaleString()} bytes`);
  console.log(`   URL: ${citrix.urlSize.toLocaleString()} bytes`);
  if (citrix.urlSize > 2000) {
    console.log(`   ⚠️  URL > 2000 bytes - may not work in all browsers!`);
  }

  console.log(`\n📊 Desktop (Clipboard):`);
  console.log(`   JS:  ${desktop.jsSize.toLocaleString()} bytes`);
  console.log(`   URL: ${desktop.urlSize.toLocaleString()} bytes`);
  if (desktop.urlSize > 2000) {
    console.log(`   ⚠️  URL > 2000 bytes - may not work in all browsers!`);
  }

  console.log(`\n📁 Generated files:`);
  console.log(`   dist/bookmarklet-citrix.min.js`);
  console.log(`   dist/bookmarklet-citrix.txt`);
  console.log(`   dist/bookmarklet-desktop.min.js`);
  console.log(`   dist/bookmarklet-desktop.txt`);
  console.log(`   dist/install.html`);
  console.log(`   worker/index.ts`);
}

build().catch((err) => {
  console.error("❌ Build failed:", err);
  process.exit(1);
});
