# Anforderungen – Modulares Webtool zur interaktiven Produktdarstellung

## 1. Funktionale Anforderungen

| Nr.  | Anforderung                                                                                          | Stakeholder                          |
|------|------------------------------------------------------------------------------------------------------|--------------------------------------|
| F1   | Benutzer:innen können interaktive Produktmodule visuell konfigurieren (Farben, Layout, Inhalte)     | UX-/UI-Designer:innen                |
| F2   | Module können als Web Components oder Snippets (z. B. iFrame) exportiert werden                     | Entwickler:innen                     |
| F3   | CI-relevante Gestaltungselemente (Farben, Schriften) sind anpassbar                                 | Marketing-/Content-Teams             |
| F4   | Vorschau der konfigurierten Module in Echtzeit                                                      | UX-/UI-Designer:innen, Entwickler:innen |
| F5   | Module sind in einer Bibliothek eingebettet und können wiederverwendet oder dupliziert werden       | Agenturen, Entwickler:innen          |
| F6   | Inhalte (z. B. Texte, Bilder) in Modulen sind ohne Programmierung bearbeitbar                       | Content-Teams                        |
| F7   | Projektmanager:innen können Konfigurationen speichern und teilen                                    | Projektmanager:innen                 |
| F8   | Exportierte Module sind in verschiedenen Frameworks/CMS integrierbar                                | Entwickler:innen                     |
| F9   | System unterstützt einfache Nutzerrollen (z. B. Editor vs. Entwickler:in)                           | Agenturen / potenzielle SaaS-Kunden  |

---

## 2. Nicht-funktionale Anforderungen

| Nr.  | Anforderung                                                                                         | Begründung / Ziel                                                   |
|------|-----------------------------------------------------------------------------------------------------|----------------------------------------------------------------------|
| N1   | Das Tool soll eine responsive und barrierearme Oberfläche bieten                                   | Usability auf allen Geräten; Zugänglichkeit für alle Nutzergruppen   |
| N2   | Die Oberfläche soll ohne technisches Vorwissen bedienbar sein                                      | UX-Fokus für Designer:innen und Content-Teams                        |
| N3   | Exportierte Module müssen performant und browserkompatibel sein                                    | Verlässlichkeit im Einsatz auf Kundenseiten                         |
| N4   | Der modulare Code soll dokumentiert, wartbar und erweiterbar sein                                  | Technische Skalierbarkeit und Übergabe an Entwickler:innen           |
| N5   | Designkonfigurationen sollen CI-konform und markenübergreifend nutzbar sein                        | Konsistenz in Corporate Webprojekten                                 |
| N6   | Änderungen im UI sollen direkt visuelles Feedback erzeugen                                         | Unterstützung von Lernkurven und sofortiger Kontrolle                |
| N7   | Das Tool soll als Single-Page Application (SPA) ohne lange Ladezeiten laufen                       | Schnelles, reaktives Nutzererlebnis                                  |
| N8   | Datenspeicherung (z. B. Konfigurationen) soll lokal oder serverbasiert möglich sein                | Flexibilität für MVP-Phase und spätere SaaS-Architektur              |
