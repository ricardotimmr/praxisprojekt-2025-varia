import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Download, Code, Settings, Eye, Edit, Smartphone, Zap, Package } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Index = () => {
  const location = useLocation();

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features-section');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features = [
    {
      icon: Code,
      title: "Modulare Bausteine",
      description: "Wähle aus einer Bibliothek interaktiver Module: Feature Slider, 360° Viewer, Hotspot Graphics und vieles mehr."
    },
    {
      icon: Settings,
      title: "CI-Konformität auf Knopfdruck",
      description: "Passe Farben, Typografie und Branding ganz einfach an deine Corporate Identity an."
    },
    {
      icon: Eye,
      title: "Echtzeit-Vorschau",
      description: "Sieh sofort, wie deine Änderungen aussehen, bevor du sie exportierst."
    },
    {
      icon: Download,
      title: "Code-freier Export",
      description: "Exportiere Module als saubere HTML-Snippets, die du direkt kopierst und einfügst kannst."
    },
    {
      icon: Smartphone,
      title: "Framework-unabhängig",
      description: "Integriere deine Module in jedes System - egal ob React, Vue, Angular oder Vanilla JS."
    },
    {
      icon: Edit,
      title: "Inhaltliche Bearbeitung ohne Code",
      description: "Ändere Texte, Bilder und animierte Elemente direkt in der UI, ohne technisches Können."
    }
  ];

  const steps = [
    {
      number: "1",
      icon: Package,
      title: "Modul auswählen",
      description: "Wähle den passenden Modultyp aus der Varia-Bibliothek."
    },
    {
      number: "2",
      icon: Settings,
      title: "Konfigurieren & Anpassen",
      description: "Gestalte das Modul im intuitiven Editor, füge Inhalte hinzu und passe das Design an."
    },
    {
      number: "3",
      icon: Download,
      title: "Exportieren & Einbinden",
      description: "Kopiere den generierten Code und füge ihn in deine Website ein."
    }
  ];

  return (
    <div className="min-h-screen bg-site-background font-inter">
      {/* Header */}
      <header className="border-b border-site-accent bg-site-background/95 backdrop-blur-sm sticky top-0 z-50 transition-all duration-300">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-comfortaa text-4xl font-bold text-site-accent lowercase tracking-wider">varia.</span>
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

      {/* Hero Section */}
      <section className="py-8 lg:py-12">
        <div className="container mx-auto px-6">
          <div className="bg-site-accent-secondary-75 rounded-3xl p-12 lg:p-20 text-center transform hover:scale-[1.02] transition-transform duration-300">
            <h1 className="text-4xl lg:text-6xl font-bold text-site-text mb-6 animate-fade-in">
              Visual Assets for Reusable<br />
              Interface Applications
            </h1>
            <p className="text-lg text-site-text mb-4 animate-fade-in">
              Erstelle interaktive Produktmodule, so einfach wie nie zuvor.
            </p>
            <p className="text-base text-site-text-light mb-8 max-w-2xl mx-auto animate-fade-in">
              Gestalte, konfiguriere und exportiere CI-konforme Web Components für deine<br />
              Unternehmenswebsite - schnell, modular und framework-unabhängig.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Link to="/werkstatt">
                <Button className="bg-white text-site-accent hover:bg-gray-100 px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300">
                  jetzt loslegen
                </Button>
              </Link>
              <Button 
                onClick={scrollToFeatures}
                className="border border-site-background bg-site-accent-secondary-75 text-white hover:bg-site-accent-secondary/90 px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                erfahre mehr
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Wow Effect Section */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-site-text mb-4 animate-fade-in">
              Revolutioniere deine Produktpräsentation
            </h2>
            <p className="text-lg text-site-text-light max-w-3xl mx-auto animate-fade-in">
              Mit Varia erstellst du in wenigen Minuten professionelle, interaktive Module, die deine Besucher begeistern
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center animate-fade-in group">
              <div className="w-20 h-20 bg-site-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse-glow transition-all duration-300">
                <Zap className="w-10 h-10 text-site-accent animate-float" />
              </div>
              <h3 className="text-xl font-semibold text-site-text mb-2">Blitzschnell</h3>
              <p className="text-site-text-light">Von der Idee zum fertigen Modul in unter 5 Minuten</p>
            </div>
            
            <div className="text-center animate-fade-in group">
              <div className="w-20 h-20 bg-site-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse-glow transition-all duration-300">
                <Eye className="w-10 h-10 text-site-accent animate-float" style={{ animationDelay: '1s' }} />
              </div>
              <h3 className="text-xl font-semibold text-site-text mb-2">Visuell</h3>
              <p className="text-site-text-light">Keine Programmierung - alles per Drag & Drop</p>
            </div>
            
            <div className="text-center animate-fade-in group">
              <div className="w-20 h-20 bg-site-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse-glow transition-all duration-300">
                <ArrowRight className="w-10 h-10 text-site-accent animate-float" style={{ animationDelay: '2s' }} />
              </div>
              <h3 className="text-xl font-semibold text-site-text mb-2">Direkt einsetzbar</h3>
              <p className="text-site-text-light">Copy & Paste - mehr brauchst du nicht</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features-section" className="py-8">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-site-text mb-8 animate-fade-in">
              Was varia bietet
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-site-card-bg border-none p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in group">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-site-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-site-accent/20 transition-colors duration-300">
                    <feature.icon className="w-8 h-8 text-site-accent group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-site-text mb-3">{feature.title}</h3>
                  <p className="text-site-text-light text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="py-8 bg-site-accent-secondary-75">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-site-text mb-8 animate-fade-in">
              So funktioniert's
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <Card key={index} className="bg-white/90 border-none p-8 text-center hover:bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-2 animate-fade-in group">
                <CardContent className="p-0">
                  <div className="text-4xl font-bold text-site-accent mb-2 group-hover:scale-110 transition-transform duration-300">{step.number}</div>
                  <div className="w-12 h-12 bg-site-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-site-accent/20 transition-colors duration-300">
                    <step.icon className="w-6 h-6 text-site-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-site-text mb-3">{step.title}</h3>
                  <p className="text-site-text-light text-sm leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 bg-gradient-to-b from-site-accent-secondary-75 to-site-accent">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 animate-fade-in">
            Bereit, deine Produktpräsentationen<br />
            zu revolutionieren?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in">
            Starte noch heute mit Varia und gestalte interaktive Module in Minuten.
          </p>
          <Link to="/werkstatt">
            <Button className="bg-white text-site-accent hover:bg-gray-100 px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in">
              dein erstes Modul erstellen
            </Button>
          </Link>
        </div>
      </section>

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
            <div className="ml-auto">
              <Link to="/" className="text-site-text font-semibold mb-4 block hover:text-site-accent transition-colors">varia.</Link>
              <ul className="space-y-2 text-site-text text-xs opacity-70">
                <li><a href="#features-section" className="hover:text-site-accent transition-colors">features</a></li>
                <li><a href="#" className="hover:text-site-accent transition-colors">preise</a></li>
                <li><a href="#" className="hover:text-site-accent transition-colors">about</a></li>
              </ul>
            </div>
            <div className="ml-auto">
              <Link to="/kontakt" className="text-site-text font-semibold mb-4 block hover:text-site-accent transition-colors">kontakt</Link>
              <ul className="space-y-2 text-site-text text-xs opacity-70">
                <li><Link to="/kontakt" className="hover:text-site-accent transition-colors">kontakt seite</Link></li>
                <li><a href="mailto:info@varia.com" className="hover:text-site-accent transition-colors">e-mail</a></li>
                <li><a href="#impressum" className="hover:text-site-accent transition-colors">impressum</a></li>
              </ul>
            </div>
            <div className="ml-auto">
              <Link to="/dokumentation" className="text-site-text font-semibold mb-4 block hover:text-site-accent transition-colors">dokumentation</Link>
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

export default Index;