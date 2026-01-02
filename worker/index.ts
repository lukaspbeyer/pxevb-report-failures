// ⚠️ GENERATED FILE - DO NOT EDIT
// Source: src/template.html + src/bookmarklet-*.ts
// Run 'pnpm build' to regenerate

const HTML = `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RIS Einzelfallmeldung - Installation</title>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:Segoe UI,system-ui,sans-serif;background:#f5f5f5;color:#333;line-height:1.6}
    .header{background:linear-gradient(135deg,#0d5c55,#0a8);color:#fff;padding:40px 20px;text-align:center}
    .header h1{font-size:28px;margin-bottom:8px}
    .header p{opacity:.9}
    .container{max-width:800px;margin:0 auto;padding:20px}
    .card{background:#fff;border-radius:12px;padding:28px;margin-bottom:24px;box-shadow:0 2px 8px rgba(0,0,0,.08)}
    .card h2{font-size:20px;margin-bottom:20px;color:#0d5c55;display:flex;align-items:center;gap:10px}
    .card h2 .icon{font-size:24px}

    /* Wizard Styles */
    .wizard-step{margin-bottom:24px}
    .wizard-step h3{font-size:16px;color:#333;margin-bottom:12px}
    .wizard-options{display:flex;gap:12px;flex-wrap:wrap}
    .wizard-option{flex:1;min-width:200px;padding:16px;border:2px solid #e5e5e5;border-radius:10px;cursor:pointer;transition:all .2s;background:#fff}
    .wizard-option:hover{border-color:#0d5c55;background:#f8fffe}
    .wizard-option.active{border-color:#0d5c55;background:#e8f5f3}
    .wizard-option .option-title{font-weight:600;color:#0d5c55;margin-bottom:4px;display:flex;align-items:center;gap:8px}
    .wizard-option .option-desc{font-size:13px;color:#666}
    .wizard-option .option-icon{font-size:20px}

    /* Content visibility */
    .env-content,.browser-content{display:none}
    .env-content.active,.browser-content.active{display:block}

    .browser-tabs{display:flex;gap:0;margin-bottom:20px;border-bottom:2px solid #e5e5e5}
    .browser-tab{padding:12px 24px;cursor:pointer;border:none;background:none;font-size:15px;color:#666;border-bottom:2px solid transparent;margin-bottom:-2px;display:flex;align-items:center;gap:8px}
    .browser-tab:hover{color:#333}
    .browser-tab.active{color:#0d5c55;border-bottom-color:#0d5c55;font-weight:600}
    .browser-tab svg{width:20px;height:20px}

    .steps{counter-reset:step;list-style:none}
    .steps li{counter-increment:step;margin-bottom:20px;padding-left:50px;position:relative;min-height:36px}
    .steps li::before{content:counter(step);position:absolute;left:0;top:0;width:36px;height:36px;background:#0d5c55;color:#fff;border-radius:50%;text-align:center;line-height:36px;font-weight:600}
    .steps li strong{color:#0d5c55}
    .steps li code{background:#f0f0f0;padding:3px 10px;border-radius:4px;font-family:Consolas,monospace;font-size:14px;border:1px solid #ddd}
    .highlight{background:#fffde7;border-left:4px solid #ffc107;padding:12px 16px;margin:12px 0;border-radius:0 8px 8px 0}
    .highlight.blue{background:#e3f2fd;border-left-color:#2196f3}
    .highlight.red{background:#ffebee;border-left-color:#f44336}
    .highlight.green{background:#e8f5e9;border-left-color:#4caf50}

    .bookmarklet-container{text-align:center;padding:30px;background:linear-gradient(135deg,#f8f9fa,#e9ecef);border-radius:8px;margin:20px 0}
    .bookmarklet{display:inline-block;background:linear-gradient(135deg,#0d5c55,#0a8);color:#fff;padding:18px 36px;border-radius:10px;text-decoration:none;font-weight:600;font-size:18px;cursor:grab;box-shadow:0 4px 12px rgba(13,92,85,.3);transition:transform .2s,box-shadow .2s}
    .bookmarklet:hover{transform:translateY(-2px);box-shadow:0 6px 16px rgba(13,92,85,.4)}
    .bookmarklet:active{cursor:grabbing;transform:translateY(0)}
    .drag-hint{margin-top:12px;color:#666;font-size:14px}

    .code-box{position:relative;margin-top:16px}
    .code-box textarea{width:100%;height:70px;background:#1a1a24;border:none;border-radius:8px;color:#fff;padding:12px;font-family:Consolas,monospace;font-size:11px;resize:none}
    .code-box button{position:absolute;right:8px;top:8px;background:#0d5c55;color:#fff;border:none;padding:10px 20px;border-radius:6px;cursor:pointer;font-size:14px;font-weight:600}
    .code-box button:hover{background:#0a8}

    .help{background:#e3f2fd;border-radius:8px;padding:20px}
    .help h3{color:#1565c0;margin-bottom:12px;font-size:16px}
    .help ul{margin-left:20px}
    .help li{margin-bottom:8px}
    .footer{text-align:center;padding:30px;color:#999;font-size:13px}
    .size-badge{display:inline-block;background:#e8f5e9;color:#2e7d32;padding:4px 12px;border-radius:20px;font-size:12px;margin-left:10px}

    @media(max-width:600px){
      .wizard-options{flex-direction:column}
      .wizard-option{min-width:100%}
      .browser-tab{padding:10px 16px;font-size:14px}
      .browser-tab svg{display:none}
      .steps li{padding-left:44px}
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>RIS Einzelfallmeldung</h1>
    <p>Bookmarklet für ProWorX - Installation in 2 Minuten</p>
  </div>

  <div class="container">
    <!-- Step 1: Environment Selection -->
    <div class="card">
      <h2><span class="icon">👤</span> Schritt 1: Wo nutzt du ProWorX?</h2>

      <div class="wizard-options">
        <div class="wizard-option active" onclick="setEnv('citrix')">
          <div class="option-title"><span class="option-icon">🖥️</span> In Citrix</div>
          <div class="option-desc">MTRA, Bereichsassistenz - ProWorX läuft in der Citrix-Umgebung</div>
        </div>
        <div class="wizard-option" onclick="setEnv('desktop')">
          <div class="option-title"><span class="option-icon">💻</span> Befundungsrechner</div>
          <div class="option-desc">Ärzte - ProWorX läuft direkt auf dem Desktop (außerhalb Citrix)</div>
        </div>
      </div>
    </div>

    <!-- Step 2: Browser Selection -->
    <div class="card">
      <h2><span class="icon">🌐</span> Schritt 2: Welchen Browser nutzt du?</h2>

      <div class="browser-tabs">
        <button class="browser-tab active" onclick="setBrowser('edge')">
          <svg viewBox="0 0 24 24"><path fill="currentColor" d="M21.86 17.86q.14 0 .25.12.1.13.1.25t-.11.33l-.32.46-.43.53-.44.5q-.21.25-.38.42l-.22.23q-.58.53-1.34 1.04-.76.51-1.6.91-.86.4-1.74.64t-1.67.24q-.9 0-1.69-.28-.79-.28-1.48-.78-.68-.5-1.22-1.17-.53-.66-.92-1.44-.38-.77-.58-1.6-.2-.83-.2-1.67 0-1 .32-1.96.33-.97.87-1.8.14.95.55 1.77.41.81 1.02 1.49.6.68 1.38 1.21.78.54 1.64.9.87.36 1.8.56.92.21 1.86.21 1.19 0 2.31-.37 1.12-.38 2.19-1.02zM8.1 13.22q0 .97.31 1.88.32.9.87 1.64.56.75 1.3 1.31.75.57 1.6.88.42-1.97 1.5-3.63 1.1-1.65 2.67-2.86 1.58-1.2 3.47-1.88 1.9-.69 3.93-.69.46 0 .79.03.34.02.56.06-.3-1.35-.93-2.49-.64-1.14-1.54-2.04-.9-.91-2.03-1.53-1.12-.62-2.38-.93-1.26-.31-2.58-.31-1.58 0-3.07.45-1.5.45-2.82 1.27-1.32.81-2.43 1.94-1.1 1.13-1.93 2.5-.82 1.37-1.28 2.9-.47 1.54-.47 3.17 0 .34.02.56.01.21.01.27z"/></svg>
          <span>Microsoft Edge</span>
        </button>
        <button class="browser-tab" onclick="setBrowser('chrome')">
          <svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 20a8 8 0 0 1-8-8 8 8 0 0 1 8-8 8 8 0 0 1 8 8 8 8 0 0 1-8 8m0-18A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2m0 5a5 5 0 0 0-5 5 5 5 0 0 0 5 5 5 5 0 0 0 5-5 5 5 0 0 0-5-5z"/></svg>
          <span>Google Chrome</span>
        </button>
      </div>
    </div>

    <!-- Step 3: Installation Instructions -->
    <div class="card">
      <h2><span class="icon">📥</span> Schritt 3: Installation</h2>

      <!-- CITRIX Environment -->
      <div id="env-citrix" class="env-content active">
        <div class="highlight green">
          ✨ <strong>Direkter Outlook-Start:</strong> Klick auf das Bookmarklet öffnet sofort eine neue Mail mit allen Daten!
        </div>

        <div class="highlight blue">
          ✅ <strong>Einfache Installation:</strong> Du kannst den Button direkt in deine Lesezeichenleiste ziehen!
        </div>

        <div id="citrix-edge" class="browser-content active">
          <ol class="steps">
            <li>
              <strong>Favoritenleiste einblenden</strong><br>
              Drücke <code>Strg</code> + <code>Umschalt</code> + <code>B</code><br>
              <span style="color:#666;font-size:14px">(oder: Menü ⋯ → Favoriten → Favoritenleiste anzeigen)</span>
            </li>
            <li>
              <strong>Button in die Leiste ziehen</strong><br>
              Klicke auf den grünen Button unten, <strong>halte die Maustaste gedrückt</strong> und ziehe ihn in deine Favoritenleiste.
              <div class="highlight">💡 Der Button muss in der Leiste landen, nicht im Favoriten-Menü!</div>
            </li>
            <li>
              <strong>Fertig!</strong><br>
              Öffne eine ProWorX-Patientenseite und klicke auf dein neues Lesezeichen.
            </li>
          </ol>
        </div>

        <div id="citrix-chrome" class="browser-content">
          <ol class="steps">
            <li>
              <strong>Lesezeichenleiste einblenden</strong><br>
              Drücke <code>Strg</code> + <code>Umschalt</code> + <code>B</code><br>
              <span style="color:#666;font-size:14px">(oder: Menü ⋮ → Lesezeichen → Lesezeichenleiste anzeigen)</span>
            </li>
            <li>
              <strong>Button in die Leiste ziehen</strong><br>
              Klicke auf den grünen Button unten, <strong>halte die Maustaste gedrückt</strong> und ziehe ihn in deine Lesezeichenleiste.
              <div class="highlight">💡 Der Button muss in der Leiste landen, nicht im Lesezeichen-Menü!</div>
            </li>
            <li>
              <strong>Fertig!</strong><br>
              Öffne eine ProWorX-Patientenseite und klicke auf dein neues Lesezeichen.
            </li>
          </ol>
        </div>

        <div class="bookmarklet-container">
          <a class="bookmarklet" href="javascript:%22use%20strict%22%3B(()%3D%3E%7B(()%3D%3E%7Blet%20e%3Db%3D%3E%5B...document.querySelectorAll(%22dt%22)%5D.find(p%3D%3Ep.textContent%3F.includes(b))%3F.nextElementSibling%3F.textContent%3F.trim()%3F%3F%22%22%2Cn%3Dnew%20Date%2Cs%3DString(n.getFullYear()).slice(-2)%2Cc%3DString(n.getMonth()%2B1).padStart(2%2C%220%22)%2Cl%3DString(n.getDate()).padStart(2%2C%220%22)%2Ca%3DMath.random().toString(36).substring(2%2C6).toUpperCase()%2Ci%3D%60RIS-%24%7Bs%7D%24%7Bc%7D%24%7Bl%7D-%24%7Ba%7D%60%2Co%3Ddocument.querySelector(%22%23ph%20p%22)%3F.textContent%3F.match(%2FID%3A%5Cs*(%5Cd%2B)%2F)%3F.%5B1%5D%3F%3F%22-%22%2Cu%3De(%22Untersuchungs-Nr%22)%7C%7C%22-%22%2Cr%3De(%22Accession-Nr%22)%7C%7C%22-%22%2Cd%3De(%22Untersuchung%22)%7C%7C%22-%22%2Cg%3D%60%24%7Bi%7D%20-%20Einzelfallmeldung%60%2Cm%3D%60Patient-ID%3A%0A%20%24%7Bo%7D%0A%0AUntersuchungsnummer%3A%0A%20%24%7Bu%7D%0A%0AAccession-Nummer%3A%0A%20%24%7Br%7D%0A%0AProzedurenname%3A%0A%20%24%7Bd%7D%0A%0AInvolvierte%20MTRA%3A%0A%20%5Bbitte%20ausf%C3%BCllen%5D%0A%0AInvolvierte%20Aerztin%20%2F%20Arzt%3A%0A%20%5Bbitte%20ausf%C3%BCllen%5D%0A%0AProblembeschreibung%20(detailliert)%3A%0A%20%5BPFLICHTFELD!%5D%0A%0AOPL%20Punkt%20Nr.%3A%0A%20%5Bnicht%20ausf%C3%BCllen%20-%20wird%20bei%20Weiterbearbeitung%20erg%C3%A4nzt%5D%0A---%60%2Ct%3Ddocument.createElement(%22div%22)%3Bt.style.cssText%3D%22position%3Afixed%3Binset%3A0%3Bbackground%3A%230008%3Bz-index%3A999999%3Bdisplay%3Aflex%3Balign-items%3Acenter%3Bjustify-content%3Acenter%3Bfont-family%3Asystem-ui%22%2Ct.innerHTML%3D%60%3Cdiv%20style%3D%22background%3A%23fff%3Bpadding%3A24px%3Bborder-radius%3A12px%3Bmax-width%3A380px%3Btext-align%3Acenter%22%3E%0A%20%20%20%20%3Cdiv%20style%3D%22font-size%3A44px%22%3E%F0%9F%93%A7%3C%2Fdiv%3E%0A%20%20%20%20%3Ch2%20style%3D%22margin%3A8px%200%2012px%3Bcolor%3A%230d5c55%22%3EOutlook%20%C3%B6ffnet%20sich...%3C%2Fh2%3E%0A%20%20%20%20%3Cdiv%20style%3D%22background%3A%230d5c55%3Bcolor%3A%23fff%3Bpadding%3A8px%2016px%3Bborder-radius%3A6px%3Bfont-family%3Amonospace%3Bfont-size%3A15px%3Bmargin-bottom%3A16px%22%3E%24%7Bi%7D%3C%2Fdiv%3E%0A%20%20%20%20%3Cdiv%20style%3D%22background%3A%23f5f5f5%3Bborder-radius%3A8px%3Bpadding%3A12px%3Btext-align%3Aleft%3Bfont-size%3A13px%3Bline-height%3A1.6%22%3E%0A%20%20%20%20%20%20%3Cdiv%20style%3D%22color%3A%23666%3Bfont-size%3A11px%3Bmargin-bottom%3A6px%22%3EEXTRAHIERTE%20DATEN%3A%3C%2Fdiv%3E%0A%20%20%20%20%20%20%3Cdiv%3E%3Cb%3EPatient-ID%3A%3C%2Fb%3E%20%24%7Bo%7D%3C%2Fdiv%3E%0A%20%20%20%20%20%20%3Cdiv%3E%3Cb%3EUntersuchung%3A%3C%2Fb%3E%20%24%7Bd%7D%3C%2Fdiv%3E%0A%20%20%20%20%20%20%3Cdiv%3E%3Cb%3EAccession-Nr%3A%3C%2Fb%3E%20%24%7Br%7D%3C%2Fdiv%3E%0A%20%20%20%20%3C%2Fdiv%3E%0A%20%20%3C%2Fdiv%3E%60%2Cdocument.body.appendChild(t)%2Clocation.href%3D%60mailto%3Asteffen.burghardt%40klinikumevb.de%3Bkristin.frohberg-grzyl%40klinikumevb.de%3Fsubject%3D%24%7BencodeURIComponent(g)%7D%26body%3D%24%7BencodeURIComponent(m)%7D%60%2CsetTimeout(()%3D%3Et.remove()%2C3e3)%7D)()%3B%7D)()%3B%0A" title="Ziehe mich in deine Lesezeichenleiste!">📧 RIS Meldung</a>
          <p class="drag-hint">⬆️ Diesen Button mit der Maus in die Lesezeichenleiste ziehen</p>
          <p style="margin-top:8px;font-size:12px;color:#888">2.972 Bytes</p>
        </div>
      </div>

      <!-- DESKTOP Environment (Befundungsrechner) -->
      <div id="env-desktop" class="env-content">
        <div class="highlight red">
          ⚠️ <strong>Manuelle Installation nötig:</strong> Da du diese Seite in Citrix öffnest, aber das Bookmarklet auf deinem Befundungsrechner brauchst, musst du den Code kopieren und dort einfügen.
        </div>

        <div id="desktop-edge" class="browser-content active">
          <ol class="steps">
            <li>
              <strong>Code kopieren (hier in Citrix)</strong><br>
              Klicke auf den <strong>"Kopieren"</strong>-Button unten rechts.
            </li>
            <li>
              <strong>Zum Befundungsrechner wechseln</strong><br>
              Wechsle zu deinem Desktop außerhalb von Citrix und öffne <strong>Edge</strong>.
            </li>
            <li>
              <strong>Favoritenleiste einblenden</strong><br>
              Drücke <code>Strg</code> + <code>Umschalt</code> + <code>B</code><br>
              <span style="color:#666;font-size:14px">(oder: Menü ⋯ → Favoriten → Favoritenleiste anzeigen)</span>
            </li>
            <li>
              <strong>Neuen Favorit hinzufügen</strong><br>
              Rechtsklick auf die Favoritenleiste → <strong>"Seite hinzufügen"</strong>
            </li>
            <li>
              <strong>Daten eingeben</strong><br>
              Name: <code>RIS Meldung</code><br>
              URL: <strong>Strg+V</strong> (den kopierten Code einfügen)
            </li>
            <li>
              <strong>Speichern & Fertig!</strong><br>
              Öffne eine ProWorX-Patientenseite und klicke auf dein neues Lesezeichen.
            </li>
          </ol>
        </div>

        <div id="desktop-chrome" class="browser-content">
          <ol class="steps">
            <li>
              <strong>Code kopieren (hier in Citrix)</strong><br>
              Klicke auf den <strong>"Kopieren"</strong>-Button unten rechts.
            </li>
            <li>
              <strong>Zum Befundungsrechner wechseln</strong><br>
              Wechsle zu deinem Desktop außerhalb von Citrix und öffne <strong>Chrome</strong>.
            </li>
            <li>
              <strong>Lesezeichenleiste einblenden</strong><br>
              Drücke <code>Strg</code> + <code>Umschalt</code> + <code>B</code><br>
              <span style="color:#666;font-size:14px">(oder: Menü ⋮ → Lesezeichen → Lesezeichenleiste anzeigen)</span>
            </li>
            <li>
              <strong>Neues Lesezeichen hinzufügen</strong><br>
              Rechtsklick auf die Lesezeichenleiste → <strong>"Seite hinzufügen..."</strong>
            </li>
            <li>
              <strong>Daten eingeben</strong><br>
              Name: <code>RIS Meldung</code><br>
              URL: <strong>Strg+V</strong> (den kopierten Code einfügen)
            </li>
            <li>
              <strong>Speichern & Fertig!</strong><br>
              Öffne eine ProWorX-Patientenseite und klicke auf dein neues Lesezeichen.
            </li>
          </ol>
        </div>

        <div class="code-box">
          <textarea id="code" readonly>javascript:%22use%20strict%22%3B(()%3D%3E%7B(()%3D%3E%7Blet%20e%3Dt%3D%3E%5B...document.querySelectorAll(%22dt%22)%5D.find(i%3D%3Ei.textContent%3F.includes(t))%3F.nextElementSibling%3F.textContent%3F.trim()%3F%3F%22%22%2Cn%3Dnew%20Date%2Cc%3DString(n.getFullYear()).slice(-2)%2Cl%3DString(n.getMonth()%2B1).padStart(2%2C%220%22)%2Ca%3DString(n.getDate()).padStart(2%2C%220%22)%2Cu%3DMath.random().toString(36).substring(2%2C6).toUpperCase()%2Cr%3D%60RIS-%24%7Bc%7D%24%7Bl%7D%24%7Ba%7D-%24%7Bu%7D%60%2Co%3Ddocument.querySelector(%22%23ph%20p%22)%3F.textContent%3F.match(%2FID%3A%5Cs*(%5Cd%2B)%2F)%3F.%5B1%5D%3F%3F%22-%22%2Cp%3De(%22Untersuchungs-Nr%22)%7C%7C%22-%22%2Cd%3De(%22Accession-Nr%22)%7C%7C%22-%22%2Cs%3De(%22Untersuchung%22)%7C%7C%22-%22%2Cb%3D%60An%3A%20steffen.burghardt%40klinikumevb.de%3B%20kristin.frohberg-grzyl%40klinikumevb.de%0ABetreff%3A%20%24%7Br%7D%20-%20Einzelfallmeldung%0A%0APatient-ID%3A%0A%20%24%7Bo%7D%0A%0AUntersuchungsnummer%3A%0A%20%24%7Bp%7D%0A%0AAccession-Nummer%3A%0A%20%24%7Bd%7D%0A%0AProzedurenname%3A%0A%20%24%7Bs%7D%0A%0AInvolvierte%20MTRA%3A%0A%20%5Bbitte%20ausf%C3%BCllen%5D%0A%0AInvolvierte%20Aerztin%20%2F%20Arzt%3A%0A%20%5Bbitte%20ausf%C3%BCllen%5D%0A%0AProblembeschreibung%20(detailliert)%3A%0A%20%5BPFLICHTFELD!%5D%0A%0AOPL%20Punkt%20Nr.%3A%0A%20%5Bnicht%20ausf%C3%BCllen%20-%20wird%20bei%20Weiterbearbeitung%20erg%C3%A4nzt%5D%0A---%60%3Bnavigator.clipboard.writeText(b).then(()%3D%3E%7Blet%20t%3Ddocument.createElement(%22div%22)%3Bt.style.cssText%3D%22position%3Afixed%3Binset%3A0%3Bbackground%3A%230008%3Bz-index%3A999999%3Bdisplay%3Aflex%3Balign-items%3Acenter%3Bjustify-content%3Acenter%3Bfont-family%3Asystem-ui%22%2Ct.onclick%3Di%3D%3Ei.target%3D%3D%3Dt%26%26t.remove()%2Ct.innerHTML%3D%60%3Cdiv%20style%3D%22background%3A%23fff%3Bpadding%3A24px%3Bborder-radius%3A12px%3Bmax-width%3A380px%3Btext-align%3Acenter%22%3E%0A%20%20%20%20%20%20%3Cdiv%20style%3D%22font-size%3A44px%22%3E%E2%9C%85%3C%2Fdiv%3E%0A%20%20%20%20%20%20%3Ch2%20style%3D%22margin%3A8px%200%2012px%3Bcolor%3A%230d5c55%22%3EKopiert!%3C%2Fh2%3E%0A%20%20%20%20%20%20%3Cdiv%20style%3D%22background%3A%230d5c55%3Bcolor%3A%23fff%3Bpadding%3A8px%2016px%3Bborder-radius%3A6px%3Bfont-family%3Amonospace%3Bfont-size%3A15px%3Bmargin-bottom%3A16px%22%3E%24%7Br%7D%3C%2Fdiv%3E%0A%20%20%20%20%20%20%3Cdiv%20style%3D%22background%3A%23f5f5f5%3Bborder-radius%3A8px%3Bpadding%3A12px%3Bmargin-bottom%3A16px%3Btext-align%3Aleft%3Bfont-size%3A13px%3Bline-height%3A1.6%22%3E%0A%20%20%20%20%20%20%20%20%3Cdiv%20style%3D%22color%3A%23666%3Bfont-size%3A11px%3Bmargin-bottom%3A6px%22%3EEXTRAHIERTE%20DATEN%3A%3C%2Fdiv%3E%0A%20%20%20%20%20%20%20%20%3Cdiv%3E%3Cb%3EPatient-ID%3A%3C%2Fb%3E%20%24%7Bo%7D%3C%2Fdiv%3E%0A%20%20%20%20%20%20%20%20%3Cdiv%3E%3Cb%3EUntersuchung%3A%3C%2Fb%3E%20%24%7Bs%7D%3C%2Fdiv%3E%0A%20%20%20%20%20%20%20%20%3Cdiv%3E%3Cb%3EAccession-Nr%3A%3C%2Fb%3E%20%24%7Bd%7D%3C%2Fdiv%3E%0A%20%20%20%20%20%20%3C%2Fdiv%3E%0A%20%20%20%20%20%20%3Cp%20style%3D%22margin%3A0%200%2016px%3Bcolor%3A%23555%3Bfont-size%3A14px%22%3EJetzt%20zu%20%3Cb%3EOutlook%20in%20Citrix%3C%2Fb%3E%20%E2%86%92%3Cbr%3ENeue%20Mail%20%E2%86%92%20%3Cb%3EStrg%2BV%3C%2Fb%3E%3C%2Fp%3E%0A%20%20%20%20%20%20%3Cbutton%20style%3D%22background%3A%230d5c55%3Bcolor%3A%23fff%3Bborder%3Anone%3Bpadding%3A12px%2028px%3Bborder-radius%3A6px%3Bcursor%3Apointer%3Bfont-size%3A14px%22%3EOK%3C%2Fbutton%3E%0A%20%20%20%20%3C%2Fdiv%3E%60%2Ct.querySelector(%22button%22).onclick%3D()%3D%3Et.remove()%2Cdocument.body.appendChild(t)%7D)%7D)()%3B%7D)()%3B%0A</textarea>
          <button onclick="copyCode()">Kopieren</button>
        </div>
        <p style="margin-top:8px;font-size:12px;color:#888;text-align:center">3.509 Bytes</p>
      </div>
    </div>

    <!-- How it works - Environment specific -->
    <div class="card">
      <h2><span class="icon">🎯</span> So funktioniert's</h2>

      <!-- Citrix Workflow -->
      <div id="workflow-citrix" class="env-content active">
        <ol class="steps">
          <li>Öffne eine <strong>ProWorX-Patientenseite</strong> mit Untersuchungsdetails</li>
          <li>Klicke auf <strong>"RIS Meldung"</strong> in deiner Lesezeichenleiste</li>
          <li><strong>Outlook öffnet sich automatisch</strong> mit einer neuen Mail - die Daten sind schon eingefügt!</li>
          <li>Fülle die Felder <strong>MTRA</strong>, <strong>Arzt</strong> und <strong>Problembeschreibung</strong> aus</li>
          <li>Klicke auf <strong>Senden</strong> - fertig!</li>
        </ol>
        <div class="highlight green" style="margin-top:20px">
          💡 <strong>Nur 5 Schritte!</strong> Das Bookmarklet öffnet Outlook direkt - kein Kopieren nötig.
        </div>
      </div>

      <!-- Desktop Workflow -->
      <div id="workflow-desktop" class="env-content">
        <ol class="steps">
          <li>Öffne eine <strong>ProWorX-Patientenseite</strong> mit Untersuchungsdetails</li>
          <li>Klicke auf <strong>"RIS Meldung"</strong> in deiner Lesezeichenleiste</li>
          <li>Die Meldung wird <strong>in die Zwischenablage kopiert</strong> - ein Popup zeigt die extrahierten Daten</li>
          <li>Wechsle zu <strong>Outlook in Citrix</strong> und erstelle eine neue E-Mail</li>
          <li>Drücke <strong>Strg+V</strong> zum Einfügen</li>
          <li>Fülle die Felder <strong>MTRA</strong>, <strong>Arzt</strong> und <strong>Problembeschreibung</strong> aus</li>
          <li>Klicke auf <strong>Senden</strong> - fertig!</li>
        </ol>
      </div>
    </div>

    <div class="card help">
      <h3>❓ Probleme?</h3>
      <ul>
        <li><strong>Lesezeichen tut nichts?</strong> → Stelle sicher, dass du auf einer ProWorX-Seite bist</li>
        <li><strong>Kein Bestätigungsfenster?</strong> → Browser evtl. neu laden und nochmal versuchen</li>
        <li><strong>Daten fehlen?</strong> → Die Seite muss die Untersuchungsdetails anzeigen</li>
        <li><strong>Code lässt sich nicht einfügen?</strong> → Stelle sicher, dass du in das URL-Feld klickst, nicht in das Name-Feld</li>
        <li><strong>Outlook öffnet sich nicht? (Citrix)</strong> → Stelle sicher, dass Outlook als Standard-Mail-Programm eingerichtet ist</li>
      </ul>
    </div>
  </div>

  <div class="footer">
    RIS Einzelfallmeldung Bookmarklet v1.2
  </div>

  <script>
    let currentEnv = 'citrix';
    let currentBrowser = 'edge';

    function setEnv(env) {
      currentEnv = env;
      document.querySelectorAll('.wizard-option').forEach(o => o.classList.remove('active'));
      document.querySelector(\`[onclick="setEnv('\${env}')"]\`).classList.add('active');
      document.querySelectorAll('.env-content').forEach(c => c.classList.remove('active'));
      document.getElementById('env-' + env).classList.add('active');
      document.getElementById('workflow-' + env).classList.add('active');
      updateBrowserContent();
    }

    function setBrowser(browser) {
      currentBrowser = browser;
      document.querySelectorAll('.browser-tab').forEach(t => t.classList.remove('active'));
      document.querySelector(\`[onclick="setBrowser('\${browser}')"]\`).classList.add('active');
      updateBrowserContent();
    }

    function updateBrowserContent() {
      document.querySelectorAll('.browser-content').forEach(c => c.classList.remove('active'));
      const contentId = currentEnv + '-' + currentBrowser;
      const el = document.getElementById(contentId);
      if (el) el.classList.add('active');
    }

    function copyCode() {
      const textarea = document.getElementById('code');
      textarea.select();
      navigator.clipboard.writeText(textarea.value).then(() => {
        const btn = document.querySelector('.code-box button');
        btn.textContent = '✓ Kopiert!';
        btn.style.background = '#2e7d32';
        setTimeout(() => {
          btn.textContent = 'Kopieren';
          btn.style.background = '';
        }, 3000);
      });
    }
  </script>
</body>
</html>
`;

export default {
  async fetch(): Promise<Response> {
    return new Response(HTML, {
      headers: { "Content-Type": "text/html;charset=UTF-8" },
    });
  },
};
