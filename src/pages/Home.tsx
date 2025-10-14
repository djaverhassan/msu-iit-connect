import { Search, Globe, AlertCircle, GraduationCap, FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ServiceCard } from "@/components/ServiceCard";
import { BottomNav } from "@/components/BottomNav";
import campusLogo from "@/assets/campus-logo.png";

const Home = () => {
  const services = [
    { icon: Globe, label: "e-Services", href: "/services/e-services" },
    { icon: AlertCircle, label: "Emergency", href: "/emergency" },
    { icon: GraduationCap, label: "Student Guide", href: "/services/student-guide" },
    { icon: FileText, label: "Campus Updates", href: "/news" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground px-4 pt-8 pb-6 rounded-b-3xl" style={{ boxShadow: "var(--shadow-elevated)" }}>
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-1">MSU-IIT Campus</h1>
              <p className="text-primary-foreground/80 text-sm">Student Engagement Platform</p>
            </div>
            <div className="relative">
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse"></div>
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <span className="text-lg font-semibold">1</span>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search services, updates..."
              className="pl-10 bg-card border-0 h-12 rounded-xl"
            />
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6">
        {/* Logo Section */}
        <div className="flex justify-center mb-8">
          <img src={campusLogo} alt="Campus Logo" className="h-24 w-auto" />
        </div>

        {/* Quick Actions */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">What would you like to do?</h2>
          <div className="grid grid-cols-2 gap-4">
            {services.map((service) => (
              <ServiceCard key={service.href} {...service} />
            ))}
          </div>
        </section>

        {/* SDG Focus Banner */}
        <section className="mb-6 p-4 rounded-2xl bg-secondary/10 border border-secondary/20">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-secondary/20">
              <GraduationCap className="h-5 w-5 text-secondary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">Quality Education & Justice</h3>
              <p className="text-sm text-muted-foreground">Supporting SDG 4 & 16 through transparent campus governance and accessible education services.</p>
            </div>
          </div>
        </section>

        {/* Report Issue CTA */}
        <section className="bg-gradient-to-br from-primary to-primary/90 rounded-2xl p-6 text-primary-foreground" style={{ boxShadow: "var(--shadow-elevated)" }}>
          <h3 className="text-xl font-bold mb-2">Help us improve our campus</h3>
          <p className="text-primary-foreground/90 mb-4 text-sm">
            Spotted an issue or have a concern? Report it so we can address it together.
          </p>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              className="flex-1 bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground border-0"
            >
              View Reports
            </Button>
            <Button
              className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground border-0"
            >
              <Plus className="h-4 w-4 mr-2" />
              Report Issue
            </Button>
          </div>
        </section>

        {/* Latest Updates Preview */}
        <section className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Latest Updates</h3>
            <Button variant="ghost" size="sm" className="text-primary">View All</Button>
          </div>
          <div className="space-y-3">
            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-accent/10">
                  <FileText className="h-4 w-4 text-accent" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground mb-1">New Academic Calendar Released</h4>
                  <p className="text-xs text-muted-foreground">Posted 2 hours ago</p>
                </div>
              </div>
            </div>
            <div className="bg-card p-4 rounded-xl border border-border">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-secondary/10">
                  <AlertCircle className="h-4 w-4 text-secondary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground mb-1">Campus Maintenance Notice</h4>
                  <p className="text-xs text-muted-foreground">Posted 5 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default Home;
