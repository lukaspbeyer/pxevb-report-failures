/**
 * Build Pipeline for RIS Einzelfallmeldung Bookmarklet
 *
 * Flow:
 *   src/bookmarklet.ts  ──┐
 *                         ├──▶  dist/install.html
 *   src/template.html   ──┤
 *                         └──▶  worker/index.ts (generated)
 */

import * as esbuild from "esbuild";
import { writeFileSync, readFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

// Paths
const PATHS = {
  bookmarkletSrc: join(root, "src/bookmarklet.ts"),
  templateSrc: join(root, "src/template.html"),
  distDir: join(root, "dist"),
  workerDir: join(root, "worker"),
  installHtml: join(root, "dist/install.html"),
  workerTs: join(root, "worker/index.ts"),
  bookmarkletMin: join(root, "dist/bookmarklet.min.js"),
  bookmarkletTxt: join(root, "dist/bookmarklet.txt"),
} as const;

async function build() {
  console.log("🔨 Building bookmarklet...\n");

  // 1. Compile & minify TypeScript
  const result = await esbuild.build({
    entryPoints: [PATHS.bookmarkletSrc],
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
  const bookmarkletUrl = `javascript:${encodeURIComponent(minified)}`;

  // 2. Calculate sizes
  const jsSize = Buffer.byteLength(minified, "utf8");
  const urlSize = Buffer.byteLength(bookmarkletUrl, "utf8");

  // 3. Ensure directories exist
  mkdirSync(PATHS.distDir, { recursive: true });

  // 4. Write minified JS and URL
  writeFileSync(PATHS.bookmarkletMin, minified);
  writeFileSync(PATHS.bookmarkletTxt, bookmarkletUrl);

  // 5. Generate HTML from template
  const html = generateHtml(bookmarkletUrl, urlSize);

  // 6. Write dist/install.html
  writeFileSync(PATHS.installHtml, html);

  // 7. Generate worker/index.ts
  generateWorker(html);

  // 8. Output summary
  printSummary(jsSize, urlSize);

  return { minified, bookmarkletUrl, jsSize, urlSize };
}

/**
 * Generate HTML by replacing placeholders in template
 */
function generateHtml(bookmarkletUrl: string, size: number): string {
  if (!existsSync(PATHS.templateSrc)) {
    throw new Error(`Template not found: ${PATHS.templateSrc}`);
  }

  const template = readFileSync(PATHS.templateSrc, "utf8");

  // Escape quotes for href attribute
  const safeUrl = bookmarkletUrl.replace(/"/g, "&quot;");

  return template
    .replace(/\{\{BOOKMARKLET_URL\}\}/g, safeUrl)
    .replace(/\{\{BOOKMARKLET_SIZE\}\}/g, `${size.toLocaleString()} Bytes`);
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
// Source: src/template.html + src/bookmarklet.ts
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
function printSummary(jsSize: number, urlSize: number): void {
  console.log(`✅ Build complete!\n`);
  console.log(`📊 Sizes:`);
  console.log(`   JS:  ${jsSize.toLocaleString()} bytes`);
  console.log(`   URL: ${urlSize.toLocaleString()} bytes`);

  if (urlSize > 2000) {
    console.log(`\n⚠️  URL > 2000 bytes - may not work in all browsers!`);
  }

  console.log(`\n📁 Generated files:`);
  console.log(`   dist/bookmarklet.min.js`);
  console.log(`   dist/bookmarklet.txt`);
  console.log(`   dist/install.html`);
  console.log(`   worker/index.ts`);
}

build().catch((err) => {
  console.error("❌ Build failed:", err);
  process.exit(1);
});
