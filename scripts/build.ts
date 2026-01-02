import * as esbuild from "esbuild";
import { writeFileSync, readFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

async function build() {
  console.log("🔨 Building bookmarklet...\n");

  // Bundle & minify
  const result = await esbuild.build({
    entryPoints: [join(root, "src/bookmarklet.ts")],
    bundle: true,
    minify: true,
    write: false,
    target: "es2022",
    format: "iife",
    charset: "utf8",
    legalComments: "none",
    mangleProps: /^_/, // Mangle properties starting with _
    drop: ["console", "debugger"],
  });

  const minified = result.outputFiles[0]?.text ?? "";
  const bookmarklet = `javascript:${encodeURIComponent(minified)}`;

  // Ensure dist exists
  mkdirSync(join(root, "dist"), { recursive: true });

  // Write outputs
  writeFileSync(join(root, "dist/bookmarklet.min.js"), minified);
  writeFileSync(join(root, "dist/bookmarklet.txt"), bookmarklet);

  // Stats
  const jsSize = Buffer.byteLength(minified, "utf8");
  const urlSize = Buffer.byteLength(bookmarklet, "utf8");

  console.log(`✅ Build complete!\n`);
  console.log(`📊 Sizes:`);
  console.log(`   JS:  ${jsSize.toLocaleString()} bytes`);
  console.log(`   URL: ${urlSize.toLocaleString()} bytes`);
  console.log(`\n📁 Output:`);
  console.log(`   dist/bookmarklet.min.js`);
  console.log(`   dist/bookmarklet.txt`);

  // Warning for URL length
  if (urlSize > 2000) {
    console.log(`\n⚠️  URL > 2000 bytes - may not work in all browsers!`);
  }

  // Generate install.html
  generateInstallPage(bookmarklet, urlSize);

  return { minified, bookmarklet, jsSize, urlSize };
}

function generateInstallPage(bookmarklet: string, size: number) {
  const html = `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RIS Einzelfallmeldung - Installation</title>
  <style>
    *{box-sizing:border-box}
    body{font-family:system-ui,-apple-system,sans-serif;background:#1a1a24;color:#fff;margin:0;padding:20px;line-height:1.6}
    .container{max-width:600px;margin:0 auto}
    h1{color:#0d5c55;margin-bottom:8px}
    .subtitle{color:#888;margin-bottom:32px}
    .card{background:#242433;border-radius:8px;padding:24px;margin-bottom:24px}
    h2{font-size:16px;margin:0 0 16px;color:#ccc}
    .bookmarklet{display:inline-block;background:#0d5c55;color:#fff;padding:16px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:16px;cursor:grab}
    .bookmarklet:hover{background:#0f6b63}
    .bookmarklet:active{cursor:grabbing}
    .steps{counter-reset:step}
    .steps li{counter-increment:step;margin-bottom:16px;padding-left:36px;position:relative}
    .steps li::before{content:counter(step);position:absolute;left:0;top:0;width:24px;height:24px;background:#0d5c55;border-radius:50%;text-align:center;line-height:24px;font-size:12px;font-weight:600}
    code{background:#333;padding:2px 6px;border-radius:4px;font-size:13px}
    .alt{margin-top:24px;padding-top:24px;border-top:1px solid #333}
    .alt h3{font-size:14px;color:#888;margin:0 0 12px}
    textarea{width:100%;height:80px;background:#1a1a24;border:1px solid #333;border-radius:4px;color:#fff;padding:12px;font-family:monospace;font-size:11px;resize:vertical}
    .copy-btn{background:#374151;color:#fff;border:none;padding:8px 16px;border-radius:4px;cursor:pointer;font-size:13px;margin-top:8px}
    .copy-btn:hover{background:#4b5563}
    .size{color:#888;font-size:13px;margin-top:16px}
    .warning{background:#d14d00;color:#fff;padding:12px;border-radius:4px;margin-top:16px;font-size:13px}
  </style>
</head>
<body>
  <div class="container">
    <h1>RIS Einzelfallmeldung</h1>
    <p class="subtitle">Bookmarklet für ProWorX</p>

    <div class="card">
      <h2>Installation</h2>
      <ol class="steps">
        <li>Zeige deine <strong>Lesezeichenleiste</strong> an<br><code>Strg+Shift+B</code> (Chrome/Edge)</li>
        <li><strong>Ziehe</strong> den Button unten in deine Lesezeichenleiste</li>
        <li>Fertig! Klicke das Lesezeichen auf einer ProWorX-Seite</li>
      </ol>

      <p style="text-align:center;margin:24px 0 0">
        <a class="bookmarklet" href="${bookmarklet.replace(/"/g, "&quot;")}">📋 RIS Meldung</a>
      </p>

      <p class="size">Größe: ${size.toLocaleString()} Bytes${size > 2000 ? " ⚠️" : ""}</p>
      ${size > 2000 ? '<p class="warning">Das Bookmarklet ist größer als 2000 Bytes. Es funktioniert möglicherweise nicht in allen Browsern. Bei Problemen: Code manuell kopieren.</p>' : ""}
    </div>

    <div class="card">
      <h2>Alternative: Manuell hinzufügen</h2>
      <ol class="steps">
        <li>Erstelle ein neues Lesezeichen</li>
        <li>Name: <code>RIS Meldung</code></li>
        <li>URL: Kopiere den Code unten</li>
      </ol>

      <textarea id="code" readonly>${bookmarklet}</textarea>
      <button class="copy-btn" onclick="navigator.clipboard.writeText(document.getElementById('code').value);this.textContent='Kopiert!'">Code kopieren</button>
    </div>
  </div>
</body>
</html>`;

  mkdirSync(join(root, "docs"), { recursive: true });
  writeFileSync(join(root, "docs/install.html"), html);
  console.log(`   docs/install.html`);
}

build().catch(console.error);
