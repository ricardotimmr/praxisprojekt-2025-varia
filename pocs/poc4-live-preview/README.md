# PoC 4: Live-Preview

## Ziel
Änderungen in Konfiguration werden sofort in einer Vorschau angezeigt – responsive und performant.

## Beschreibung
- Vorschau simuliert das Endmodul
- Responsiv (verschiedene Viewports)
- Sofortige Aktualisierung (<500ms)

## Exit-Kriterien
- Text, Farbe, Layout sofort sichtbar (<500ms)
- Dynamisch für verschiedene Viewports
- Kein Flackern oder doppelte Ladezyklen

## Fail-Kriterien
- Verzögerte/unvollständige Updates
- Instabilität bei schnellen Änderungen

## Fallbacks
- Vorschau nur auf Klick neu laden
- Preview als separates Fenster
