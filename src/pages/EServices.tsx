import { FileText, CreditCard, Calendar, BookOpen, GraduationCap, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const EServices = () => {
  const navigate = useNavigate();
  
  const services = [
    {
      icon: FileText,
      label: "Request ID",
      description: "Apply for your student ID card",
      action: "Request Now",
      serviceType: "request_id",
    },
    {
      icon: CreditCard,
      label: "Request COR",
      description: "Certificate of Registration request",
      action: "Request Now",
      serviceType: "request_cor",
    },
    {
      icon: BookOpen,
      label: "Request Transcript",
      description: "Official transcript of records",
      action: "Request Now",
      serviceType: "request_transcript",
    },
    {
      icon: GraduationCap,
      label: "Enrollment Services",
      description: "Online enrollment and registration",
      action: "Request",
      serviceType: "enrollment_services",
    },
    {
      icon: Calendar,
      label: "Grade Viewing",
      description: "View your academic grades",
      action: "Request",
      serviceType: "grade_viewing",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground px-4 pt-8 pb-6 rounded-b-3xl" style={{ boxShadow: "var(--shadow-elevated)" }}>
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-1">e-Services</h1>
          <p className="text-primary-foreground/80 text-sm">Digital services for students</p>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6">
        {/* MYIIT Portal Link */}
        <a 
          href="https://myiitportal.msuiit.edu.ph/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block mb-6"
        >
          <Card className="bg-gradient-to-br from-secondary to-secondary/90 text-secondary-foreground p-5 border-0 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold mb-1">MYIIT PORTAL</h2>
                <p className="text-secondary-foreground/80 text-sm">Access your student portal</p>
              </div>
              <ExternalLink className="h-6 w-6" />
            </div>
          </Card>
        </a>

        {/* Services Grid */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4">Available Services</h2>
          <div className="space-y-3">
            {services.map((service) => (
              <Card key={service.label} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{service.label}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
                    <Button 
                      size="sm" 
                      className="w-full"
                      onClick={() => navigate(`/e-services/request?service=${service.serviceType}`)}
                    >
                      {service.action}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default EServices;
