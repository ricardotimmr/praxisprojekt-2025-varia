# Praxisprojekt 2025 – Modulares Webtool zur Produktdarstellung

Dieses Repository dokumentiert die Entwicklung eines modularen Webtools zur Erstellung interaktiver Produktdarstellungen für Corporate Websites. Es entsteht im Rahmen des Praxisprojekts im Bachelorstudiengang Medieninformatik an der TH Köln im Sommersemester 2025.

---

## Zielsetzung

Ziel des Projekts ist die Konzeption und prototypische Umsetzung einer webbasierten Anwendung, mit der UX-/UI-Designer:innen, Entwickler:innen und Content-Teams interaktive, CI-konforme Produktmodule gestalten und für den Einsatz in Unternehmenswebsites exportieren können.

Das Tool ermöglicht die visuelle Konfiguration von Modultypen wie Feature-Slider, 360°-Viewer oder Hotspot-Grafiken und exportiert diese als Web Components oder Snippets, die in bestehende Systeme integrierbar sind. Es fördert die Wiederverwendbarkeit, Modularität und Markenkonformität in der digitalen Produktkommunikation.

Die Proof-of-Concepts wurden zunächst mit **JavaScript, React, Vite und TailwindCSS** umgesetzt, um die Kernfunktionalität prototypisch zu evaluieren. Für das finale Projekt erfolgt die Umsetzung in **TypeScript** mit **React, Vite und TailwindCSS**, um Robustheit, bessere Wartbarkeit und Skalierbarkeit sicherzustellen.

Der Fokus im Praxisprojekt liegt auf der Frontend-Entwicklung und der Umsetzung zentraler UX/UI-Funktionen. Das Projekt bildet die Grundlage für eine anschließende Bachelorarbeit, in der die Backend-Architektur und Produktivsetzung weiterentwickelt werden.

---

## Inhalte

- Konzeption eines modularen Komponenten-Systems zur Produktdarstellung  
- UI/UX-Design für ein intuitives Konfigurationstool  
- Entwicklung funktionaler Proof of Concepts (Export, CI-Anpassung, Responsivität etc.)  
- Implementierung eines responsiven, barrierearmen Interfaces mit React, Vite und TailwindCSS  
- Erstellung eines wissenschaftlichen Exposés und begleitender Dokumentation  

---

## Technologie-Stack

| Phase                | Technologien                                                                 |
|----------------------|-------------------------------------------------------------------------------|
| **Proof of Concepts** | JavaScript, React, Vite, TailwindCSS                                         |
| **Finales Projekt**   | **TypeScript, React, Vite, TailwindCSS**, Zustand, Atomic Design, Design Tokens |

- **Backend**: Wird im Rahmen der Bachelorarbeit implementiert (API, Authentifizierung, Speicherung von Konfigurationen)  
- **Datenbank**: Noch offen / abhängig vom späteren Backend-Konzept (z. B. PostgreSQL, MongoDB, Supabase)  
- **Sicherheit**:  
  - Clientseitig: Input-Validierung, barrierearme UI (WAI-ARIA, Kontrast, Tastaturbedienung)  
  - Serverseitig: Wird im Backend-Kontext behandelt  
- **Deployment**: Geplant via Vercel oder Netlify (für Frontend), später ggf. Docker (für Produktion & Backend)  

**Der Tech-Stack ist noch nicht final entschieden.**

---

## Projektdokumentation und Ressourcen

Die technische und inhaltliche Dokumentation wird im zugehörigen GitHub-Wiki gepflegt:

- 📄 **Wiki**: [Detaillierte technische Dokumentation](https://github.com/ricardotimmr/praxisprojekt-2025/wiki)  
- 📄 **Kanban Board**: [Projektmanagement via GitHub Projects](https://github.com/users/ricardotimmr/projects/5)  
- 📄 **Miro-Board**: [Visuelle Projektstruktur](https://miro.com/app/board/uXjVLCCKknk=)  
- 📄 **Weekly Documentation**: [Fortlaufende Projektdokumentation](https://github.com/ricardotimmr/praxisprojekt-2025/wiki/Weekly-Documentation)  

---

## Lizenz

Dieses Projekt unterliegt keiner öffentlichen Lizenz, da es sich um ein akademisches Studienprojekt handelt. Eine Veröffentlichung oder Weiterverwendung der Inhalte ist nur nach Rücksprache mit dem Autor gestattet.
