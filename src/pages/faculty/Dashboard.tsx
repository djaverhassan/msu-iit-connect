import { ArrowLeft, Briefcase, ExternalLink, Link2, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const FacultyDashboard = () => {
  const { user, isVerified } = useAuth();
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

  // College-specific faculty resources
  const facultyResourcesByCollege: Record<string, Array<{ label: string; url: string; description: string }>> = {
    college_of_computer_studies: [
      { 
        label: "CCS Faculty Portal", 
        url: "#", 
        description: "Access the CCS faculty resources and management system" 
      },
    ],
    college_of_engineering_and_technology: [
      { 
        label: "CET Faculty Portal", 
        url: "#", 
        description: "College of Engineering and Technology faculty resources" 
      },
    ],
    college_of_science_and_mathematics: [
      { 
        label: "CSM Faculty Portal", 
        url: "#", 
        description: "College of Science and Mathematics faculty resources" 
      },
    ],
    college_of_education: [
      { 
        label: "CED Faculty Portal", 
        url: "#", 
        description: "College of Education faculty resources" 
      },
    ],
    college_of_arts_and_science: [
      { 
        label: "CAS Faculty Portal", 
        url: "#", 
        description: "College of Arts and Science faculty resources" 
      },
    ],
    college_of_business_administration_and_accountancy: [
      { 
        label: "CBAA Faculty Portal", 
        url: "#", 
        description: "College of Business Administration and Accountancy faculty resources" 
      },
    ],
    college_of_nursing: [
      { 
        label: "CON Faculty Portal", 
        url: "#", 
        description: "College of Nursing faculty resources" 
      },
    ],
  };

  const facultyLinks = profile?.college 
    ? facultyResourcesByCollege[profile.college] || []
    : [];

  const getCollegeDisplayName = (college: string | null) => {
    if (!college) return '';
    return college.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  // Show verification required message if not verified
  if (!isVerified) {
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground px-4 pt-8 pb-6 rounded-b-3xl">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <Link to="/home" className="p-2 hover:bg-primary-foreground/10 rounded-full transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold">Faculty Dashboard</h1>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-6">
          <Card className="border-destructive/50 bg-destructive/5">
            <CardContent className="p-6 text-center">
              <ShieldAlert className="h-12 w-12 text-destructive mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Verification Required</h3>
              <p className="text-sm text-muted-foreground">
                Your account must be verified by an administrator before you can access faculty resources. Please wait for verification or contact the administration.
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground px-4 pt-8 pb-6 rounded-b-3xl">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/home" className="p-2 hover:bg-primary-foreground/10 rounded-full transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Faculty Dashboard</h1>
              {profile?.college && (
                <p className="text-primary-foreground/80 text-sm">{getCollegeDisplayName(profile.college)}</p>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Faculty Links */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link2 className="h-5 w-5 text-primary" />
              Faculty Resources
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {facultyLinks.length > 0 ? (
              facultyLinks.map((link) => (
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
              ))
            ) : (
              <p className="text-muted-foreground text-center py-4">No resources available for your college yet.</p>
            )}
          </CardContent>
        </Card>

        {/* Coming Soon Notice */}
        <Card className="border-dashed">
          <CardContent className="p-6 text-center">
            <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-2">More Features Coming Soon</h3>
            <p className="text-sm text-muted-foreground">
              Additional faculty features including grade management, class schedules, and college-specific announcements are in development.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default FacultyDashboard;