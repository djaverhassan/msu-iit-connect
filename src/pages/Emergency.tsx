import { Phone, AlertTriangle, Shield, MapPin, Heart, Flame } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";

const Emergency = () => {
  const emergencyContacts = [
    {
      title: "Campus Security",
      number: "(063) 223-xxxx",
      icon: Shield,
      description: "24/7 Campus Safety and Security",
      color: "primary",
    },
    {
      title: "Medical Services",
      number: "(063) 223-yyyy",
      icon: Heart,
      description: "Campus Health Center",
      color: "accent",
    },
    {
      title: "Fire Emergency",
      number: "911",
      icon: Flame,
      description: "Fire Department Hotline",
      color: "destructive",
    },
    {
      title: "Local Police",
      number: "117",
      icon: AlertTriangle,
      description: "Philippine National Police",
      color: "secondary",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-gradient-to-br from-accent to-accent/90 text-accent-foreground px-4 pt-8 pb-6 rounded-b-3xl" style={{ boxShadow: "var(--shadow-elevated)" }}>
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Emergency Contacts</h1>
          </div>
          <p className="text-accent-foreground/90 text-sm">Quick access to emergency services</p>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6">
        {/* Emergency Banner */}
        <div className="bg-accent/10 border border-accent/20 rounded-2xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-accent mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground mb-1">In case of emergency</h3>
              <p className="text-sm text-muted-foreground">
                Stay calm and contact the appropriate emergency service. Your safety is our priority.
              </p>
            </div>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="space-y-4 mb-6">
          {emergencyContacts.map((contact, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-4"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg bg-${contact.color}/10`}>
                    <contact.icon className={`h-5 w-5 text-${contact.color}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{contact.title}</h3>
                    <p className="text-sm text-muted-foreground">{contact.description}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-foreground">{contact.number}</span>
                <Button className="bg-accent hover:bg-accent/90">
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Campus Map */}
        <div className="bg-card border border-border rounded-xl p-4" style={{ boxShadow: "var(--shadow-soft)" }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-secondary/10">
              <MapPin className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Emergency Assembly Points</h3>
              <p className="text-sm text-muted-foreground">View campus evacuation map</p>
            </div>
          </div>
          <Button variant="outline" className="w-full" onClick={() => window.location.href = "/map"}>
            View Campus Map
          </Button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Emergency;
