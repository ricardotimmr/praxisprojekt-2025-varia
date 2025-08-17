import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, FileText } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "sonner";

const Kontakt = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Nachricht wurde erfolgreich gesendet!');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      message: ''
    });
  };

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
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-site-text mb-6 animate-fade-in">
              Kontakt
            </h1>
            <p className="text-lg text-site-text-light max-w-2xl mx-auto animate-fade-in">
              Hast du Fragen zu Varia oder benötigst du Unterstützung? Wir sind hier, um dir zu helfen.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Contact Form */}
            <Card style={{ backgroundColor: 'rgba(216, 195, 165, 0.35)' }} className="border-none">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-site-text">
                  <Send className="w-5 h-5 text-site-accent" />
                  <span>Nachricht senden</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-site-text">Vorname</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Dein Vorname"
                        className="mt-2 border-site-neutral focus:border-site-accent"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-site-text">Nachname</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Dein Nachname"
                        className="mt-2 border-site-neutral focus:border-site-accent"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-site-text">E-Mail</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="deine@email.com"
                      className="mt-2 border-site-neutral focus:border-site-accent"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="subject" className="text-site-text">Betreff</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Worum geht es?"
                      className="mt-2 border-site-neutral focus:border-site-accent"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="text-site-text">Nachricht</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Deine Nachricht..."
                      className="mt-2 border-site-neutral focus:border-site-accent h-32 resize-none"
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    className="w-full bg-site-accent text-white hover:bg-site-accent/90"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Nachricht senden
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info and FAQ */}
            <div className="space-y-8">
              {/* Contact Information */}
              <Card style={{ backgroundColor: 'rgba(216, 195, 165, 0.35)' }} className="border-none">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-site-text">
                    <Phone className="w-5 h-5 text-site-accent" />
                    <span>Kontaktinformationen</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-site-accent mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-site-text mb-1">E-Mail</h3>
                      <p className="text-site-text-light">info@varia.com</p>
                      <p className="text-site-text-light">support@varia.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-site-accent mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-site-text mb-1">Telefon</h3>
                      <p className="text-site-text-light">+49 (0) 221 123 456</p>
                      <p className="text-site-text-light text-sm">Mo-Fr 9:00 - 17:00 Uhr</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-site-accent mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-site-text mb-1">Adresse</h3>
                      <p className="text-site-text-light">TH Köln</p>
                      <p className="text-site-text-light">Claudiusstraße 1</p>
                      <p className="text-site-text-light">50678 Köln</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ */}
              <Card style={{ backgroundColor: 'rgba(216, 195, 165, 0.35)' }} className="border-none">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-site-text">
                    <FileText className="w-5 h-5 text-site-accent" />
                    <span>Häufige Fragen</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-site-text-light mb-4">
                    Bevor du uns kontaktierst, schau gerne in unsere Dokumentation oder in den FAQ-Bereich. 
                    Dort findest du Antworten auf die häufigsten Fragen.
                  </p>
                  <Button 
                    asChild 
                    variant="outline" 
                    className="w-full border-site-accent text-site-accent hover:bg-site-accent hover:text-white"
                  >
                    <Link to="/dokumentation">
                      <FileText className="w-4 h-4 mr-2" />
                      Zur Dokumentation
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
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

export default Kontakt;