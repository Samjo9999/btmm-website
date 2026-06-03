---
name: session-log
description: Dokumentiert die aktuelle Session thematisch ins zentrale Memory-System. Claude kann sich in allen zukuenftigen Sessions projektweit daran erinnern.
user_invocable: true
---

# Session-Dokumentation ins Memory

Du dokumentierst die aktuelle Arbeitssession **ins zentrale Memory-System**, damit du dich in allen zukuenftigen Sessions — egal in welchem Projekt — daran erinnern kannst.

## Ablauf

1. **Zeitstempel holen**: `date +"%Y-%m-%d %H:%M"` (24h-Format, z.B. 14:30)

2. **Projekt erkennen**: Bestimme anhand des aktuellen Arbeitsverzeichnisses, welches Projekt bearbeitet wurde:
   - `BtB Webseite` → sessions_webseite.md
   - `btb-app` → sessions_app.md
   - `einfach-kasse-POS` → sessions_pos.md
   - `btb-pos-launcher` oder `btb-universe-launcher` → sessions_launcher.md
   - `heilpraktiker-tool` → sessions_heilpraktiker.md
   - `StimmungstagebuchApp` → sessions_stimmungstagebuch.md
   - `well-track-plan` → sessions_welltrack.md
   - `Claude Code MCP BtB Supabase` → sessions_supabase_mcp.md
   - `backtobalance-office` → sessions_office.md
   - Alles andere / projektuebergreifend → sessions_allgemein.md

3. **Session analysieren** — identifiziere:
   - Hauptthemen und Anlass der Session
   - Groessere Schritte und Entscheidungen (mit Begruendung)
   - Ergebnisse, offene Punkte, naechste Schritte
   - Wichtige Erkenntnisse die fuer zukuenftige Arbeit relevant sind

4. **Memory-Dateien schreiben oder aktualisieren**:
   **Zentraler Pfad**: `C:\Users\fence\.claude\projects\C--Users-fence-Projekte-mit-Claude-Code-Calaude-Code-Dokumentiert\memory\`

   **Wenn die Datei noch nicht existiert**, erstelle sie mit Frontmatter:
   ```markdown
   ---
   name: Session-Chronik {Projektname}
   description: Chronologische Dokumentation aller Sessions fuer {Projektname} — Themen, Entscheidungen, Ergebnisse
   type: project
   ---
   ```

   **Wenn die Datei schon existiert**, lies sie zuerst und haenge den neuen Eintrag unten an.

5. **Eintragsformat**:
   ```markdown

   ### {YYYY-MM-DD} | {HH:MM}

   **Thema:** {Kurzbeschreibung}

   - {Wichtiger Schritt / Entscheidung / Ergebnis}
   - {Weiterer Punkt}
   - **Status:** {Abgeschlossen / WIP / Blockiert durch X}
   - **Naechste Schritte:** {Falls relevant}
   ```

6. **MEMORY.md aktualisieren**: Stelle sicher, dass jede Session-Datei im Index `MEMORY.md` (im selben Verzeichnis) gelistet ist (einmalig beim ersten Erstellen):
   ```markdown
   - [Session-Chronik {Projekt}](sessions_{projekt}.md) — Alle Sessions zu {Projekt}
   ```

## Regeln

- **Nur Themen und groessere Schritte** — keine Mikro-Aktionen ("Datei gelesen", "grep")
- **Entscheidungen mit Begruendung** — damit du spaeter nachvollziehen kannst WARUM
- **Zeitformat**: 24h, `14:30` nicht `2:30 PM`
- **Sprache**: Deutsch
- **Erkenntnisse hervorheben**: Wenn etwas Ueberraschendes oder fuer die Zukunft Wichtiges passiert ist, explizit notieren
- **Bei mehreren Projekten in einer Session**: Separate Eintraege in den jeweiligen Dateien
- Offene Punkte und WIP klar markieren
