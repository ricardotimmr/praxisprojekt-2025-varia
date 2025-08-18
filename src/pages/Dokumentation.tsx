import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, Code, Settings, Eye, Download, Github, ExternalLink, Star, GitFork } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Dokumentation = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  const sections = [
    {
      id: "getting-started",
      title: "Erste Schritte",
      icon: Eye,
      content: [
        {
          title: "Was ist Varia?",
          description: "Varia ist ein intuitives Tool zur Erstellung interaktiver Web-Module ohne Programmierkenntnisse."
        },
        {
          title: "Erste Schritte",
          description: "Beginne mit der Auswahl eines Moduls in der Werkstatt und konfiguriere es nach deinen Wünschen."
        },
        {
          title: "Grundlegende Konzepte",
          description: "Lerne die Grundlagen von Modulen, Layouts und Design-Konfigurationen kennen."
        }
      ]
    },
    {
      id: "modules",
      title: "Module",
      icon: Code,
      content: [
        {
          title: "Feature Slider",
          description: "Ein interaktiver Slider zur Präsentation von Produktfeatures mit Bildern und Beschreibungen."
        },
        {
          title: "360° Viewer",
          description: "Ein immersiver 360-Grad-Viewer für Produktansichten aus allen Winkeln."
        },
        {
          title: "Hotspot Graphics",
          description: "Interaktive Grafiken mit klickbaren Hotspots für detaillierte Produktinformationen."
        }
      ]
    },
    {
      id: "configuration",
      title: "Konfiguration",
      icon: Settings,
      content: [
        {
          title: "Layout-Einstellungen",
          description: "Passe Breite, Ausrichtung, Schatten und Rahmen deiner Module an."
        },
        {
          title: "Design-Anpassungen",
          description: "Konfiguriere Farben, Typografie und Branding entsprechend deiner CI."
        },
        {
          title: "Modul-spezifische Einstellungen",
          description: "Jedes Modul bietet eigene Konfigurationsmöglichkeiten für optimale Anpassung."
        }
      ]
    },
    {
      id: "export",
      title: "Export & Integration",
      icon: Download,
      content: [
        {
          title: "Code-Export",
          description: "Exportiere deine Module als saubere HTML/CSS/JS-Snippets."
        },
        {
          title: "Framework-Integration",
          description: "Integriere Module in React, Vue, Angular oder andere Frameworks."
        },
        {
          title: "Best Practices",
          description: "Tipps für die optimale Integration in bestehende Websites."
        }
      ]
    }
  ];

  const faqItems = [
    {
      question: "Wie erstelle ich mein erstes Modul?",
      answer: "Gehe zur Werkstatt, wähle einen Modultyp aus, konfiguriere es nach deinen Wünschen und exportiere den Code."
    },
    {
      question: "Kann ich eigene Bilder hochladen?",
      answer: "Ja, du kannst eigene Bilder für alle Module hochladen und verwenden."
    },
    {
      question: "Ist der exportierte Code framework-unabhängig?",
      answer: "Ja, der Code kann in jedes moderne Web-Framework oder in eine statische Website integriert werden."
    },
    {
      question: "Wie passe ich die Farben an meine CI an?",
      answer: "Im Design-Tab kannst du Akzentfarbe, Hintergrundfarbe, Textfarben und weitere Design-Elemente anpassen."
    },
    {
      question: "Gibt es Größenbeschränkungen für Bilder?",
      answer: "Wir empfehlen Bilder unter 5MB für optimale Performance. Unterstützte Formate: JPG, PNG, WebP."
    },
    {
      question: "Kann ich Module nachträglich bearbeiten?",
      answer: "Ja, du kannst Konfigurationen speichern und später wieder laden, um Module zu bearbeiten."
    },
    {
      question: "Funktionieren die Module auf mobilen Geräten?",
      answer: "Ja, alle Module sind responsive und funktionieren auf Desktop, Tablet und Smartphone."
    },
    {
      question: "Wie integriere ich ein Modul in meine Website?",
      answer: "Kopiere den exportierten Code und füge ihn an der gewünschten Stelle in deiner Website ein."
    }
  ];

  const filteredSections = sections.filter(section =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.content.some(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const filteredFaq = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-site-background font-inter animate-fade-in">
      {/* Header */}
      <header className="border-b border-site-accent bg-site-background/95 backdrop-blur-sm sticky top-0 z-50 transition-all duration-300">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-comfortaa text-3xl font-bold text-site-accent lowercase tracking-wider">varia.</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                to="/werkstatt" 
                className={`${location.pathname === '/werkstatt' ? 'text-site-text' : 'text-site-accent'} hover:text-site-text transition-colors font-inter text-base`}
              >
                werkstatt
              </Link>
              <Link 
                to="/dokumentation" 
                className={`${location.pathname === '/dokumentation' ? 'text-site-text' : 'text-site-accent'} hover:text-site-text transition-colors font-inter text-base`}
              >
                dokumentation
              </Link>
              <Link 
                to="/kontakt" 
                className={`${location.pathname === '/kontakt' ? 'text-site-text' : 'text-site-accent'} hover:text-site-text transition-colors font-inter text-base`}
              >
                kontakt
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-site-text mb-6 animate-fade-in">
              Dokumentation
            </h1>
            <p className="text-lg text-site-text-light max-w-2xl mx-auto animate-fade-in">
              Alles was du über Varia wissen musst - von den ersten Schritten bis zum Export deiner Module.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-12 animate-fade-in">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-site-text-light w-5 h-5" />
            <Input
              placeholder="Durchsuche die Dokumentation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-6 text-lg border-site-neutral focus:border-site-accent"
            />
          </div>

          {/* Documentation Sections */}
          <div className="space-y-8 mb-16">
            {filteredSections.map((section, index) => (
              <Card key={section.id} className="animate-fade-in bg-site-card-bg border-none">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-site-text">
                    <div className="w-10 h-10 bg-site-accent/10 rounded-lg flex items-center justify-center">
                      <section.icon className="w-5 h-5 text-site-accent" />
                    </div>
                    <span className="text-2xl">{section.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-1 gap-6">
                    {section.content.map((item, itemIndex) => (
                      <div key={itemIndex} className="border-l-2 border-site-accent/20 pl-4">
                        <h3 className="text-lg font-semibold text-site-text mb-2">{item.title}</h3>
                        <p className="text-site-text-light">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQ Section */}
          {(!searchTerm || filteredFaq.length > 0) && (
            <Card className="animate-fade-in bg-site-card-bg border-none mb-16">
              <CardHeader>
                <CardTitle className="text-site-text text-2xl">Häufig gestellte Fragen</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {(searchTerm ? filteredFaq : faqItems).map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-site-text text-left">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-site-text-light">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          )}

          {/* GitHub Project Section */}
          <Card className="animate-fade-in bg-site-card-bg border-none mb-16">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-site-text text-2xl">
                <Github className="w-8 h-8 text-site-accent" />
                <span>Open Source Projekt</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <p className="text-site-text-light text-lg">
                  Varia ist ein Open Source Projekt im Rahmen des Praxisprojekts der TH Köln. 
                  Entdecke den Quellcode, trage bei oder erstelle eigene Forks des Projekts.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-site-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Code className="w-6 h-6 text-site-accent" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-site-text mb-2">Quellcode ansehen</h3>
                      <p className="text-site-text-light">
                        Durchstöbere den vollständigen Quellcode und verstehe, wie Varia funktioniert.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-site-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <GitFork className="w-6 h-6 text-site-accent" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-site-text mb-2">Fork & Contribute</h3>
                      <p className="text-site-text-light">
                        Erstelle deinen eigenen Fork oder trage mit Pull Requests zum Projekt bei.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button 
                    asChild
                    className="bg-site-accent text-white hover:bg-site-accent/90 flex items-center space-x-2"
                  >
                    <a href="https://github.com/ricardotimmr/praxisprojekt-2025-varia" target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4" />
                      <span>Auf GitHub ansehen</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    asChild
                    className="border-site-accent text-site-accent hover:bg-site-accent hover:text-white flex items-center space-x-2"
                  >
                    <a href="https://github.com/ricardotimmr/praxisprojekt-2025-varia/fork" target="_blank" rel="noopener noreferrer">
                      <GitFork className="w-4 h-4" />
                      <span>Fork erstellen</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* No Results */}
          {searchTerm && filteredSections.length === 0 && filteredFaq.length === 0 && (
            <Card className="text-center py-12 animate-fade-in bg-site-card-bg border-none">
              <CardContent>
                <h3 className="text-xl font-semibold text-site-text mb-2">Keine Ergebnisse gefunden</h3>
                <p className="text-site-text-light mb-4">
                  Keine Inhalte gefunden für "{searchTerm}". Versuche es mit anderen Suchbegriffen.
                </p>
                <Button 
                  onClick={() => setSearchTerm("")}
                  variant="outline" 
                  className="border-site-accent text-site-accent hover:bg-site-accent hover:text-white"
                >
                  Suche zurücksetzen
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-site-background py-12 border-t border-site-accent">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <span className="font-comfortaa text-xl text-site-accent lowercase tracking-wider font-bold">varia.</span>
              <p className="text-site-text text-sm mt-2">
                Varia - Das intuitive Werkzeug zur Erstellung und zum Export innovativer, CI-konformer Web Components für dein Website.
              </p>
            </div>
            <div className="text-right ml-auto">
              <h4 className="text-site-text font-semibold mb-4">varia.</h4>
              <ul className="space-y-2 text-site-text text-xs opacity-70">
                <li><Link to="/" className="hover:text-site-accent transition-colors">home</Link></li>
                <li><Link to="/werkstatt" className="hover:text-site-accent transition-colors">werkstatt</Link></li>
                <li><Link to="/dokumentation" className="hover:text-site-accent transition-colors">dokumentation</Link></li>
              </ul>
            </div>
            <div className="text-right ml-auto">
              <h4 className="text-site-text font-semibold mb-4">kontakt</h4>
              <ul className="space-y-2 text-site-text text-xs opacity-70">
                <li><Link to="/kontakt" className="hover:text-site-accent transition-colors">kontakt seite</Link></li>
                <li><a href="mailto:info@varia.com" className="hover:text-site-accent transition-colors">e-mail</a></li>
                <li><a href="#impressum" className="hover:text-site-accent transition-colors">impressum</a></li>
              </ul>
            </div>
            <div className="text-right ml-auto">
              <h4 className="text-site-text font-semibold mb-4">dokumentation</h4>
              <ul className="space-y-2 text-site-text text-xs opacity-70">
                <li><Link to="/dokumentation#getting-started" className="hover:text-site-accent transition-colors">erste schritte</Link></li>
                <li><Link to="/dokumentation#modules" className="hover:text-site-accent transition-colors">module</Link></li>
                <li><Link to="/dokumentation#export" className="hover:text-site-accent transition-colors">export guide</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-site-accent pt-8 text-center">
            <p className="text-site-text text-sm">
              © 2025 Varia. Alle Rechte vorbehalten.
            </p>
            <p className="text-site-text text-sm mt-2">
              Ein Praxisprojekt der TH Köln.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dokumentation;