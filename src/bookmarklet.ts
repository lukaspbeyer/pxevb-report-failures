(() => {
  const g = (l: string) =>
    [...document.querySelectorAll("dt")].find((e) => e.textContent?.includes(l))
      ?.nextElementSibling?.textContent?.trim() ?? "";

  const pid = document.querySelector("#ph p")?.textContent?.match(/ID:\s*(\d+)/)?.[1] ?? "";

  const body = `RIS - Einzelfallmeldung

Patient-ID:
 ${pid}

Untersuchungsnummer:
 ${g("Untersuchungs-Nr")}

Accession-Nummer:
 ${g("Accession-Nr")}

Prozedurenname:
 ${g("Untersuchung")}

Involvierte MTRA:


Involvierte Aerztin / Arzt:


Problembeschreibung (detailliert):


OPL Punkt Nr.:
---`;

  location.href = `mailto:steffen.burghardt@klinikumevb.de,kristin.frohberg-grzyl@klinikumevb.de?subject=${encodeURIComponent("RIS - Einzelfallmeldung")}&body=${encodeURIComponent(body)}`;
})();
