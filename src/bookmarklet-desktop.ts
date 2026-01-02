(() => {
  const g = (l: string) =>
    [...document.querySelectorAll("dt")].find((e) => e.textContent?.includes(l))
      ?.nextElementSibling?.textContent?.trim() ?? "";

  // Ticket-ID generieren: RIS-YYMMDD-XXXX
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const rnd = Math.random().toString(36).substring(2, 6).toUpperCase();
  const ticketId = `RIS-${yy}${mm}${dd}-${rnd}`;

  // Extrahierte Daten
  const pid = document.querySelector("#ph p")?.textContent?.match(/ID:\s*(\d+)/)?.[1] ?? "-";
  const unr = g("Untersuchungs-Nr") || "-";
  const acc = g("Accession-Nr") || "-";
  const prz = g("Untersuchung") || "-";

  const t = `An: steffen.burghardt@klinikumevb.de; kristin.frohberg-grzyl@klinikumevb.de
Betreff: ${ticketId} - Einzelfallmeldung

Patient-ID:
 ${pid}

Untersuchungsnummer:
 ${unr}

Accession-Nummer:
 ${acc}

Prozedurenname:
 ${prz}

Involvierte MTRA:
 [bitte ausfüllen]

Involvierte Aerztin / Arzt:
 [bitte ausfüllen]

Problembeschreibung (detailliert):
 [PFLICHTFELD!]

OPL Punkt Nr.:
 [nicht ausfüllen - wird bei Weiterbearbeitung ergänzt]
---`;

  navigator.clipboard.writeText(t).then(() => {
    const d = document.createElement("div");
    d.style.cssText = "position:fixed;inset:0;background:#0008;z-index:999999;display:flex;align-items:center;justify-content:center;font-family:system-ui";
    d.onclick = (e) => e.target === d && d.remove();
    d.innerHTML = `<div style="background:#fff;padding:24px;border-radius:12px;max-width:380px;text-align:center">
      <div style="font-size:44px">✅</div>
      <h2 style="margin:8px 0 12px;color:#0d5c55">Kopiert!</h2>
      <div style="background:#0d5c55;color:#fff;padding:8px 16px;border-radius:6px;font-family:monospace;font-size:15px;margin-bottom:16px">${ticketId}</div>
      <div style="background:#f5f5f5;border-radius:8px;padding:12px;margin-bottom:16px;text-align:left;font-size:13px;line-height:1.6">
        <div style="color:#666;font-size:11px;margin-bottom:6px">EXTRAHIERTE DATEN:</div>
        <div><b>Patient-ID:</b> ${pid}</div>
        <div><b>Untersuchung:</b> ${prz}</div>
        <div><b>Accession-Nr:</b> ${acc}</div>
      </div>
      <p style="margin:0 0 16px;color:#555;font-size:14px">Jetzt zu <b>Outlook in Citrix</b> →<br>Neue Mail → <b>Strg+V</b></p>
      <button style="background:#0d5c55;color:#fff;border:none;padding:12px 28px;border-radius:6px;cursor:pointer;font-size:14px">OK</button>
    </div>`;
    d.querySelector("button")!.onclick = () => d.remove();
    document.body.appendChild(d);
  });
})();
