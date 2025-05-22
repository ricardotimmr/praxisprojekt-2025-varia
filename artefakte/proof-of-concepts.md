# Proof of Concepts – Modulares Webtool zur Produktdarstellung

| Nr.     | Titel                                        | Ziel / Fragestellung                                                                                         | Bezug zu Anforderungen       |
|---------|----------------------------------------------|--------------------------------------------------------------------------------------------------------------|------------------------------|
| **PoC 1** | Feature-Slider Modul entwickeln             | Wie kann ein interaktives, konfigurierbares Feature-Slider-Modul technisch und visuell umgesetzt werden?     | F1, F4, F5, N1, N2           |
| **PoC 2** | 360°-Viewer Modul entwickeln                | Lässt sich ein 360°-Viewer technisch performant einbinden und visuell konfigurierbar gestalten?              | F1, F4, F8, N1, N3           |
| **PoC 3** | Live-Preview implementieren                | Wie lässt sich eine sofortige visuelle Vorschau der konfigurierten Komponente umsetzen?                      | F4, N6, N7                   |
| **PoC 4** | Modul-Bibliothek mit auswählbaren Komponenten | Können Nutzer:innen zwischen verschiedenen Modultypen (z. B. Slider, Viewer, Hotspot-Grafik) wählen?        | F5, F1, N1                   |
| **PoC 5** | CI-Anpassung ermöglichen                   | Lässt sich ein konfigurierbares Designsystem (Farben, Typografie) integrieren, das CI-Vorgaben unterstützt?  | F3, N5                       |
| **PoC 6** | Export als Web Component / Snippet         | Ist ein modularer Export der konfigurierten Komponente z. B. als Web Component oder iFrame realisierbar?     | F2, F8, N3, N4               |
| **PoC 7** | Responsives Verhalten der Module           | Funktionieren die konfigurierten Module konsistent auf unterschiedlichen Bildschirmgrößen?                   | N1, N3, N7                   |
| **PoC 8** | Inhaltliche Bearbeitung ohne Code          | Können Inhalte (Texte, Bilder) innerhalb der Module über die UI verändert werden, ohne technische Hürden?    | F6, N2                       |
| **PoC 9** | Modul-Presets / Vorlagenfunktion           | Können vorkonfigurierte Modul-Layouts als Presets gespeichert, geladen und wiederverwendet werden?           | F5, F7, N4                   |

## Technische Zugänglichkeit & Niederschwellige Integration

### 1. Wie kriege ich das Produkt niederschwellig an den Entwickler?

Ziel ist es, das Tool so zu gestalten, dass Entwickler:innen es ohne großen technischen oder organisatorischen Aufwand einsetzen können – auch ohne Anmeldung oder Build-System.

**Geplante Maßnahmen:**
- Bereitstellung der Module als **Web Components** oder alternativ als **iFrame-Snippets**
- Online-Konfiguration mit sofortigem **Export-Link** ohne Login-Zwang
- **CDN-Hosting** für alle erzeugten Komponenten (per `<script src="...">`)
- Automatisch generierter **Copy-Paste-Exportcode** pro Modul
- Kurze technische Einbindung via HTML (z. B. `<my-slider ...></my-slider>`)

### 2. Wie halte ich die Hürde für den Entwickler möglichst gering?

Um eine möglichst einfache Integration in bestehende Systeme zu ermöglichen, sollen die exportierten Module:

- **Framework-unabhängig** funktionieren (z. B. in React, Vue, Angular oder Vanilla JS)
- **keine zusätzlichen Abhängigkeiten** benötigen
- **responsive und barrierearm** gestaltet sein (inkl. Default Styles)
- **dokumentiert** sein (kurze README je Modultyp, inkl. Properties und Beispiel)
- **optional auch als npm-Paket** bereitgestellt werden (für CI/CD-Setups)

### Zusammenfassung

Durch die Kombination aus Web Components, Direkt-Export über das UI und einer automatisierten Snippet-Dokumentation wird die technische Einstiegshürde für Entwickler:innen so gering wie möglich gehalten. Ziel ist es, das Tool auch ohne technisches Vorwissen nutzbar zu machen – gleichzeitig aber eine saubere Einbindung in moderne Webprojekte zu ermöglichen.