import { Globe, GraduationCap, MapPin, Wrench, Users, Calendar, BookOpen, Phone } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { ServiceCard } from "@/components/ServiceCard";

const Services = () => {
  const eServices = [
    { icon: Globe, label: "e-Services Portal", href: "/e-services" },
    { icon: GraduationCap, label: "Core Values", href: "/core-values" },
    { icon: BookOpen, label: "News & Updates", href: "/news" },
  ];

  const campusServices = [
    { icon: MapPin, label: "Campus Map", href: "/map" },
    { icon: Wrench, label: "Report Issue", href: "/report-issue" },
    { icon: Phone, label: "Emergency", href: "/emergency" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground px-4 pt-8 pb-6 rounded-b-3xl" style={{ boxShadow: "var(--shadow-elevated)" }}>
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-1">Campus Services</h1>
          <p className="text-primary-foreground/80 text-sm">Access all university services in one place</p>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6">
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Digital Services</h2>
          <div className="grid grid-cols-2 gap-4">
            {eServices.map((service) => (
              <ServiceCard key={service.href} {...service} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4">Campus Resources</h2>
          <div className="grid grid-cols-2 gap-4">
            {campusServices.map((service) => (
              <ServiceCard key={service.href} {...service} />
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default Services;
