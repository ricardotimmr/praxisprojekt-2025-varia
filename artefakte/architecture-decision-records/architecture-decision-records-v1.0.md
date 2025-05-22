# Übersicht: Geplante ADRs – Modulares Webtool zur Produktdarstellung

| ADR-Nr. | Thema                         | Beschreibung                                                                 |
|---------|-------------------------------|------------------------------------------------------------------------------|
| ADR 001 | Frontend Framework            | React, Vue, Svelte im Vergleich (Komponentenmodell, Community, Ecosystem)   |
| ADR 002 | Styling & Designsystem        | TailwindCSS, CSS Modules, Styled Components, Vanilla Extract                |
| ADR 003 | Komponentenstruktur           | Atomic Design, Smart/Dumb Components, Design Tokens                         |
| ADR 004 | Export-Technologie            | Web Components, iFrame, JSON-Konfiguration, npm-Paket                       |
| ADR 005 | Preview-Technik               | Live DOM-Rendering, Sandbox-Iframe, Virtual DOM State                       |
| ADR 006 | Zustandsverwaltung (State)    | useState/Context API vs. Redux vs. Zustand vs. Signals                      |
| ADR 007 | CI-konforme Konfiguration     | Design Token-Management (intern oder via Tool), zentrale Farbsysteme        |
| ADR 008 | Build- und Tooling-Umgebung   | Vite, Next.js, Create React App, Astro, Parcel, Docker                      |
| ADR 009 | Accessibility & Testing       | a11y-Standards, Testmethoden, Lighthouse, axe-core, Unit-/E2E-Tests         |
| ADR 010 | Serverlaufzeit & Tooling-Basis       | Node.js, Deno, Bun         |

## ADR 001 – Frontend Framework

**Kontext / Problemstellung**

Die Wahl des geeigneten Frontend-Frameworks beeinflusst die gesamte Architektur, Komponentenstruktur und das Entwicklererlebnis des Projekts. Da es sich um ein komponentenbasiertes, interaktives Konfigurationstool handelt, sind Wiederverwendbarkeit, Community-Unterstützung und Integrationstiefe zentrale Auswahlkriterien.

**Optionen (Technologien oder Strategien)**

### React

**Beschreibung:** Weit verbreitetes Framework mit großer Community und starker Ökosystem-Integration (z.B. mit TailwindCSS, Storybook, Zustand, etc.). JSX-basiert.

**Vorteile:**
- Große Community und viele Ressourcen
- Weit verbreitet in Agenturen und Unternehmen
- Flexibel und bewährt für Komponentenarchitekturen

**Nachteile:**
- Teilweise komplexes State-Handling
- JSX erfordert Umdenken beim Styling
- Relativ viel Boilerplate bei komplexeren Setups

### Vue 3

**Beschreibung:** Modernes, komponentenbasiertes Framework mit Composition API. Klar strukturierter Aufbau, gute Lernkurve.

**Vorteile:**
- Einfachere Einstiegshürde
- Klare Trennung von HTML, CSS und JS
- Sehr gutes Ökosystem für kleinere bis mittlere Projekte

**Nachteile:**
- Weniger verbreitet in größeren Agenturen
- Weniger Ressourcen für B2B-Fokus-Projekte

### Svelte

**Beschreibung:** Compiler-basiertes Framework ohne Virtual DOM. Minimalistisch und performant, aber kleineres Ökosystem.

**Vorteile:**
- Sehr geringe Bundle-Größe
- Reaktivität direkt im Code
- Schnelle Ergebnisse

**Nachteile:**
- Kleinere Community
- Weniger etablierte Patterns
- Schlechtere Toolchain-Integration (noch)

**Anwendungsrelevanz fürs Projekt**

Da das Projekt auf modulare, wiederverwendbare UI-Komponenten mit starker CI-Anbindung setzt, sind React oder Vue 3 besonders relevant. React bietet dabei das breiteste Agentur-Ökosystem, Vue hingegen eine sauberere Einstiegssyntax. Svelte wäre eher für ein kleineres, performantes Sideprojekt geeignet.

---
## ADR 002 – Styling & Designsystem

**Kontext / Problemstellung**

Die Wahl des Styling-Ansatzes hat Einfluss auf Wartbarkeit, CI-Integration, Flexibilität und Developer Experience. Für das Projekt sind Wiederverwendbarkeit und konsistentes Design zentral.

**Optionen (Technologien oder Strategien)**

### TailwindCSS

**Beschreibung:** Utility-First CSS Framework mit starker Konfigurierbarkeit und Designsystem-Support.

**Vorteile:**
- Schnelle Entwicklung mit vordefinierten Klassen
- Hohe Konsistenz durch Design Tokens
- Große Community, gute Dokumentation

**Nachteile:**
- Ungewöhnliche Syntax
- Weniger Separation of Concerns
- Kann unübersichtlich werden bei komplexem Markup

### CSS Modules

**Beschreibung:** Scoped CSS in Komponenten-Dateien – einfache, aber robuste Lösung für kleinere Projekte.

**Vorteile:**
- Gute Lesbarkeit
- Kein globales CSS
- Einfache Integration

**Nachteile:**
- Kein Designsystem-Support out of the box
- Kein Utility-Ansatz
- Weniger dynamisch

### Styled Components

**Beschreibung:** CSS-in-JS-Lösung für React-Umgebungen, bei der Styles direkt in Komponenten definiert werden.

**Vorteile:**
- Dynamisches Styling möglich
- Gute Integration in React
- Theme-Unterstützung

**Nachteile:**
- Performance-Overhead
- Starke Kopplung an React
- Langsame Buildzeiten bei großen Projekten

### Vanilla Extract

**Beschreibung:** Design Token-basiertes CSS-in-TypeScript-Tool mit statischer Extraction für maximale Performance.

**Vorteile:**
- Designsystem-first
- Komplett typisiert
- Sehr gute Performance

**Nachteile:**
- Komplexere Einrichtung
- Kleinere Community
- Noch relativ jung

**Anwendungsrelevanz fürs Projekt**

TailwindCSS bietet für das Projekt den besten Mix aus Geschwindigkeit, Designsystem-Fähigkeit und Responsiveness. Styled Components wäre bei starkem React-Fokus interessant. Vanilla Extract hat theoretisch großes Potenzial, ist aber eher für erfahrene Teams geeignet.

---
## ADR 010 – Serverlaufzeit & Tooling-Basis

**Kontext / Problemstellung**

Für die Frontend-Toolchain und mögliche Erweiterungen (z.B. serverseitige Vorschau, Export-APIs oder ein zukünftiges SaaS-Backend) ist eine JavaScript-kompatible Serverlaufzeit notwendig. Auch Build-Werkzeuge wie Vite, Tailwind oder ESLint erfordern eine entsprechende Umgebung. Die Entscheidung betrifft primär die Entwicklungsinfrastruktur, perspektivisch aber auch die Architektur der Backend-Komponenten (z.B. API-Server).

**Optionen (Technologien oder Strategien)**

### Node.js

**Beschreibung:** De-facto-Standard für JavaScript-Serverumgebungen, riesiges Ökosystem, extrem viele Tools und Frameworks basieren darauf.

**Vorteile:**
- Weit verbreitet, stabil, gut dokumentiert
- Maximale Kompatibilität mit Tools wie Vite, Tailwind, React, Next.js
- Große Community und viele Bibliotheken
- Ermöglicht später einfachen Übergang zu Express, Fastify oder NestJS

**Nachteile:**
- Nicht die performanteste Laufzeit
- Manuelles Dependency-Management kann komplex werden
- Weniger moderne Sicherheitsfeatures im Vergleich zu Deno

### Deno

**Beschreibung:** Neue JavaScript-/TypeScript-Laufzeit vom ursprünglichen Node.js-Erfinder, mit integrierter Sicherheit, TypeScript-Support und modernem Modul-Handling.

**Vorteile:**
- Integrierte TypeScript-Unterstützung
- Standardmäßig sichere Laufzeit (Sandboxed by default)
- Kein `node_modules`, keine Paketmanager notwendig

**Nachteile:**
- Geringere Tool- und Framework-Unterstützung
- Kompatibilität mit Node-Ökosystem eingeschränkt
- Relevanz im Produktionsumfeld noch begrenzt

### Bun

**Beschreibung:** Neue, sehr schnelle JavaScript-Laufzeit und -Bundler mit hohem Performance-Ziel und integrierten Features (Testing, Bundling, Server).

**Vorteile:**
- Sehr hohe Performance
- Integriertes Testing & Bundling
- Kompatibel mit den meisten Node.js-Projekten

**Nachteile:**
- Noch in aktiver Entwicklung, potenziell instabil
- Geringere Community und Dokumentation
- Toolchain ist noch nicht breit akzeptiert

**Anwendungsrelevanz fürs Projekt**

Da das Projekt vollständig auf dem JavaScript-Frontend-Ökosystem basiert (React, Vite, TailwindCSS, ggf. Next.js), ist **Node.js aktuell alternativlos sinnvoll**. Es stellt die breiteste Kompatibilität für Entwicklungs- und Buildprozesse sicher. Deno oder Bun sind interessante Perspektiven für spätere Exploration oder Performance-Optimierung, aber im aktuellen Projektstatus mit Fokus auf Stabilität und Community-Support nicht sinnvoll einsetzbar.

---
## ADR 003 – Komponentenstruktur

**Kontext / Problemstellung**

Die interne Strukturierung von UI-Komponenten beeinflusst die Wartbarkeit, Wiederverwendbarkeit und Konsistenz des Tools. Für das geplante modulare System ist eine klare Komponentenstrategie erforderlich.

**Optionen (Technologien oder Strategien)**

### Atomic Design

**Beschreibung:** UI-Komponenten werden hierarchisch in Atoms, Molecules, Organisms usw. unterteilt.

**Vorteile:**
- Fördert Wiederverwendbarkeit
- Erleichtert Dokumentation
- Gut kombinierbar mit Design Tokens
**Nachteile:**
- Erfordert konsequente Benennung
- Einführungsaufwand
- Nicht jedes UI passt perfekt ins Modell

### Smart/Dumb Components

**Beschreibung:** Trennung in logikführende (smart) und darstellende (dumb) Komponenten.

**Vorteile:**
- Klares Verantwortlichkeitsprinzip
- Gute Testbarkeit
- Fördert Separation of Concerns
**Nachteile:**
- Zusätzliche Schichten
- Nicht immer eindeutig trennbar

### Design Tokens

**Beschreibung:** Zentrale Konfiguration für Farben, Schriftgrößen, Abstände etc. zur CI-Konsistenz.

**Vorteile:**
- Zentrale CI-Steuerung
- Erleichtert Theme-Support
- Maschinenlesbar
**Nachteile:**
- Erfordert Infrastruktur für Management
- Initialaufwand höher

**Anwendungsrelevanz fürs Projekt**

Atomic Design in Kombination mit Design Tokens ist besonders geeignet für modulare Webtools. Smart/Dumb-Ansätze helfen zusätzlich bei der Entkopplung von Logik und UI.

---

## ADR 004 – Export-Technologie

**Kontext / Problemstellung**

Die exportierten Produktmodule müssen in bestehende Websites integrierbar sein. Verschiedene Exportstrategien sind möglich und beeinflussen Wiederverwendbarkeit, Performance und CMS-Kompatibilität.

**Optionen (Technologien oder Strategien)**

### Web Components

**Beschreibung:** Standardisierte, frameworkunabhängige HTML-Komponenten.

**Vorteile:**
- Kompatibel mit den meisten Frameworks
- Eigenständig und kapselbar
- Zukunftssicher
**Nachteile:**
- Komplexere Einrichtung
- Polyfills nötig für ältere Browser

### iFrame

**Beschreibung:** Einbettung als eigenständige HTML-Seite in ein bestehendes Projekt.

**Vorteile:**
- Sehr einfach zu integrieren
- Komplett isoliert
- Gute Cross-Domain-Trennung
**Nachteile:**
- Keine direkte CSS-Vererbung
- Schlechtere UX bei dynamischen Inhalten

### JSON-Konfiguration

**Beschreibung:** Export von Konfiguration zur Interpretation durch externe Systeme.

**Vorteile:**
- Trennung von Daten und Darstellung
- Flexibel einsetzbar
- Maschinenlesbar
**Nachteile:**
- Benötigt eigenes Rendering-System
- Technische Einstiegshürde höher

### npm-Paket

**Beschreibung:** Veröffentlichung als installierbares Paket (z.B. React-Komponente).

**Vorteile:**
- Integration in Build-Prozesse
- Code-Versionierung
- Einsatz in Dev-Teams
**Nachteile:**
- Nur für Entwickler:innen geeignet
- Nicht CMS-freundlich

**Anwendungsrelevanz fürs Projekt**

Für breite Einsatzmöglichkeiten und CI-Anpassung ist der Export als Web Component am geeignetsten. iFrame kann als MVP-Ansatz sinnvoll sein. JSON und npm sind für spezifische Zielgruppen.

---

## ADR 005 – Preview-Technik

**Kontext / Problemstellung**

Nutzer:innen sollen Module während der Konfiguration in Echtzeit als Vorschau erleben. Die Preview-Technik beeinflusst Performance und Bedienbarkeit.

**Optionen (Technologien oder Strategien)**

### Live DOM-Rendering

**Beschreibung:** Das konfigurierte Modul wird direkt im DOM aktualisiert.

**Vorteile:**
- Sehr schnell
- Einfach zu implementieren
- Nahe am finalen Ergebnis
**Nachteile:**
- Kann mit komplexen Zuständen instabil werden
- Hoher Coupling-Faktor

### Sandbox-iFrame

**Beschreibung:** Konfiguration wird in ein eingebettetes iFrame geladen.

**Vorteile:**
- Isolation
- Nahe an realem Einsatz
- Keine CSS-Konflikte
**Nachteile:**
- Langsamer
- Komplexere Datenübergabe
- Schlechteres Test-Feedback

### Virtual DOM Snapshot

**Beschreibung:** Zustand wird in einem internen virtuellen DOM simuliert.

**Vorteile:**
- Kein Re-Renders nötig
- Performance-Vorteil bei vielen Änderungen
**Nachteile:**
- Komplexe Umsetzung
- Fehlende 1:1-Darstellung

**Anwendungsrelevanz fürs Projekt**

Live DOM-Rendering eignet sich für MVPs, Sandbox-iFrame für realitätsnahe Vorschau. Für komplexe Projekte ist langfristig ein Virtual DOM-Modell interessant.

---

## ADR 006 – Zustandsverwaltung (State)

**Kontext / Problemstellung**

Das Konfigurationstool muss komplexe Zustände verwalten: Eingaben, Vorschau, UI-Status, Modulvarianten. Die richtige State-Strategie beeinflusst Wartbarkeit und Performance.

**Optionen (Technologien oder Strategien)**

### useState/Context API

**Beschreibung:** Integrierter Ansatz in React für lokalen und globalen State.

**Vorteile:**
- Kein zusätzlicher Overhead
- Ideal für kleinere Tools
- Einfach zu erlernen
**Nachteile:**
- Weniger performant bei vielen verschachtelten Komponenten
- Keine Devtools

### Redux

**Beschreibung:** Zentralisierter State-Container mit Middleware und Devtools.

**Vorteile:**
- Sehr kontrollierter State
- Große Community
- Gute Debugging-Tools
**Nachteile:**
- Viel Boilerplate
- Komplexität steigt schnell

### Zustand

**Beschreibung:** Minimalistischer, reaktiver State-Manager für React.

**Vorteile:**
- Einfach zu integrieren
- Geringer Boilerplate
- Hooks-basiert
**Nachteile:**
- Weniger Features als Redux
- Noch in Entwicklung

### Signals (z.B. SolidJS, Preact Signals)

**Beschreibung:** Reaktive Primitive, die auf minimale Updates optimiert sind.

**Vorteile:**
- Extrem performant
- Fein granular
- Geeignet für Live-Anwendungen
**Nachteile:**
- Kaum Dokumentation
- Experimenteller Status

**Anwendungsrelevanz fürs Projekt**

Zustand bietet aktuell den besten Kompromiss für React-basierte MVPs. Für komplexere Anforderungen wäre Redux eine stabile Wahl. Signals könnten langfristig eine explorative Alternative sein.

---

## ADR 007 – CI-konforme Konfiguration

**Kontext / Problemstellung**

Produktmodule sollen flexibel gestaltbar und gleichzeitig markenkonform sein. Dazu braucht es eine Möglichkeit, CI-relevante Eigenschaften zentral zu verwalten.

**Optionen (Technologien oder Strategien)**

### Design Tokens (intern)

**Beschreibung:** Farb-, Typografie- und Spacing-Werte als JSON-konforme Token innerhalb der App.

**Vorteile:**
- Sehr flexibel
- Einfach in Tailwind o.ä. integrierbar
- Exportierbar
**Nachteile:**
- Selbstverwaltung notwendig
- Kein visuelles Interface

### Design Token Tooling (z.B. Style Dictionary)

**Beschreibung:** Tools zur zentralen Definition und Transformation von Design Tokens.

**Vorteile:**
- Mehrere Output-Formate
- Gute Integration in Build-Prozesse
**Nachteile:**
- Einrichtung aufwendiger
- Zusätzliche Tool-Abhängigkeit

### Inline-Konfiguration per UI

**Beschreibung:** Farben, Typografie etc. werden direkt per Oberfläche gesetzt.

**Vorteile:**
- Sehr zugänglich für Nicht-Entwickler:innen
- Sofort visuelles Feedback
**Nachteile:**
- Weniger Wiederverwendbarkeit
- Fehleranfälligkeit bei CI-Verstößen

**Anwendungsrelevanz fürs Projekt**

Für das Projekt sinnvoll: Kombination aus Design Tokens und UI-Interface. So lassen sich markenkonforme Komponenten sowohl technisch als auch visuell steuern.

---

## ADR 008 – Build- und Tooling-Umgebung

**Kontext / Problemstellung**

Die Build-Umgebung legt die Grundlage für Entwicklungsworkflow, Live-Vorschau, Exporte und Performance.

**Optionen (Technologien oder Strategien)**

### Vite

**Beschreibung:** Moderner Bundler mit extrem schneller Hot-Reload-Funktionalität.

**Vorteile:**
- Sehr schnelle Builds
- Optimiert für moderne Frameworks
- Einfach zu konfigurieren
**Nachteile:**
- Manche Plugins noch instabil
- Nicht ideal für SSR

### Next.js

**Beschreibung:** React-Framework mit eingebautem Routing, SSR und API-Routen.

**Vorteile:**
- Komplettes Toolset
- Gut dokumentiert
- Gute CMS-Anbindung
**Nachteile:**
- Größerer Overhead
- Unnötig komplex für reine Client-Apps

### Astro

**Beschreibung:** Multi-Framework Static Site Generator mit Optimierung für Performance.

**Vorteile:**
- Schnelle Seiten
- Teilweise Serverless
- Support für viele Komponentenarten
**Nachteile:**
- Weniger etabliert
- Plugin-Ökosystem kleiner

### Create React App

**Beschreibung:** React-Startprojekt mit vorkonfigurierter Build-Umgebung.

**Vorteile:**
- Einfacher Einstieg
- Breite Unterstützung
**Nachteile:**
- Veraltet im Vergleich zu Vite
- Langsame Builds

### Docker

**Beschreibung:** Containerisierung für reproduzierbare Entwicklungs- und Deployment-Umgebungen.

**Vorteile:**
- Konstant zwischen Teammitgliedern
- Geeignet für Deployment
**Nachteile:**
- Erfordert DevOps-Kenntnisse
- Mehr Setup-Aufwand im MVP

**Anwendungsrelevanz fürs Projekt**

Vite ist für das Frontend-MVP ideal. Docker kann perspektivisch für Deployment und Teamkonstanz eingesetzt werden.

---

