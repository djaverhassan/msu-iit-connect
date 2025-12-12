import { ArrowLeft, Users, ExternalLink, Link2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const CouncilDashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<{ college: string | null } | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      const { data } = await supabase
        .from('profiles')
        .select('college')
        .eq('user_id', user.id)
        .maybeSingle();
      setProfile(data);
    };
    fetchProfile();
  }, [user]);

  const councilLinks = [
    { 
      label: "USC Official Portal", 
      url: "https://usc.msuiit.edu.ph", 
      description: "University Student Council official website" 
    },
    { 
      label: "Council Documents", 
      url: "https://drive.google.com", 
      description: "Access shared council documents and files" 
    },
    { 
      label: "Meeting Schedules", 
      url: "https://calendar.google.com", 
      description: "View upcoming council meetings and events" 
    },
    { 
      label: "Council Communications", 
      url: "https://mail.google.com", 
      description: "Official council email and communications" 
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground px-4 pt-8 pb-6 rounded-b-3xl">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/home" className="p-2 hover:bg-primary-foreground/10 rounded-full transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Student Council Dashboard</h1>
              {profile?.college && (
                <p className="text-primary-foreground/80 text-sm">{profile.college}</p>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Council Links */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link2 className="h-5 w-5 text-primary" />
              Council Resources
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {councilLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border border-border hover:bg-muted/50 transition-colors"
              >
                <div className="p-2 rounded-lg bg-primary/10">
                  <ExternalLink className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">{link.label}</h3>
                  <p className="text-sm text-muted-foreground">{link.description}</p>
                </div>
              </a>
            ))}
          </CardContent>
        </Card>

        {/* Coming Soon Notice */}
        <Card className="border-dashed">
          <CardContent className="p-6 text-center">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-2">More Features Coming Soon</h3>
            <p className="text-sm text-muted-foreground">
              Additional student council features including polls, surveys, and college-specific announcements are in development.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CouncilDashboard;
