import { User, Settings, Bell, Shield, HelpCircle, LogOut, ChevronRight, Users, Building2, GraduationCap, Briefcase, FileText } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface Profile {
  display_name: string | null;
  user_type: 'student' | 'faculty' | 'student_council' | null;
  college: string | null;
  student_id: string | null;
  employee_id: string | null;
  is_verified: boolean | null;
}

const Account = () => {
  const { user, signOut, isAdmin, isStudentCouncil, isFaculty } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    const fetchProfile = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('display_name, user_type, college, student_id, employee_id, is_verified')
        .eq('user_id', user.id)
        .maybeSingle();
      
      setProfile(data);
    };

    fetchProfile();
  }, [user, navigate]);

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const displayName = profile?.display_name || user?.email?.split('@')[0] || 'User';

  const getUserTypeLabel = (type: string | null) => {
    switch (type) {
      case 'student': return 'Student';
      case 'faculty': return 'Faculty';
      case 'student_council': return 'Student Council';
      default: return 'User';
    }
  };

  const getUserTypeIcon = (type: string | null) => {
    switch (type) {
      case 'student': return GraduationCap;
      case 'faculty': return Briefcase;
      case 'student_council': return Users;
      default: return User;
    }
  };

  const UserTypeIcon = getUserTypeIcon(profile?.user_type);

  const menuItems = [
    ...(isStudentCouncil ? [{
      icon: Users,
      label: "Council Dashboard",
      description: "Manage student council activities",
      href: "/council",
    }] : []),
    ...(isFaculty ? [{
      icon: Briefcase,
      label: "Faculty Dashboard",
      description: "Access faculty resources and tools",
      href: "/faculty",
    }] : []),
    {
      icon: FileText,
      label: "My Requests",
      description: "Track your service requests and issues",
      href: "/account/requests",
    },
    {
      icon: Settings,
      label: "Settings",
      description: "App preferences and configurations",
      href: "/account/settings",
    },
    {
      icon: Bell,
      label: "Notifications",
      description: "Manage notification preferences",
      href: "/account/notifications",
    },
    {
      icon: Shield,
      label: "Privacy & Security",
      description: "Control your data and privacy",
      href: "/account/privacy",
    },
    {
      icon: HelpCircle,
      label: "Help & Support",
      description: "Get help and contact support",
      href: "/account/support",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground px-4 pt-8 pb-16 rounded-b-3xl" style={{ boxShadow: "var(--shadow-elevated)" }}>
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-8">My Account</h1>
          
          {/* Profile Card */}
          <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-4 border border-primary-foreground/20">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-primary-foreground">
                <AvatarFallback className="bg-primary-foreground text-primary text-xl font-semibold">
                  {getInitials(displayName)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-primary-foreground mb-0.5">{displayName}</h2>
                <p className="text-primary-foreground/80 text-sm mb-1">{user?.email}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  {isAdmin && (
                    <Badge variant="secondary" className="text-xs">Admin</Badge>
                  )}
                  {isStudentCouncil && (
                    <Badge variant="secondary" className="text-xs">Student Council</Badge>
                  )}
                  {profile?.is_verified ? (
                    <Badge variant="outline" className="text-xs border-primary-foreground/30 text-primary-foreground/80">Verified</Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs border-destructive/50 text-destructive bg-destructive/10">Unverified</Badge>
                  )}
                </div>
              </div>
            </div>
            
            {/* User Details */}
            {profile && (
              <div className="mt-4 pt-4 border-t border-primary-foreground/20 space-y-2">
                <div className="flex items-center gap-2 text-primary-foreground/90 text-sm">
                  <UserTypeIcon className="h-4 w-4" />
                  <span>{getUserTypeLabel(profile.user_type)}</span>
                </div>
                {profile.college && (
                  <div className="flex items-center gap-2 text-primary-foreground/90 text-sm">
                    <Building2 className="h-4 w-4" />
                    <span className="truncate">{profile.college}</span>
                  </div>
                )}
                {profile.student_id && (
                  <div className="flex items-center gap-2 text-primary-foreground/80 text-sm">
                    <span className="text-primary-foreground/60">Student ID:</span>
                    <span>{profile.student_id}</span>
                  </div>
                )}
                {profile.employee_id && (
                  <div className="flex items-center gap-2 text-primary-foreground/80 text-sm">
                    <span className="text-primary-foreground/60">Employee ID:</span>
                    <span>{profile.employee_id}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 -mt-6">
        {/* Menu Items */}
        <div className="bg-card rounded-2xl overflow-hidden border border-border" style={{ boxShadow: "var(--shadow-elevated)" }}>
          {menuItems.map((item, index) => (
            <button
              key={item.href}
              onClick={() => navigate(item.href)}
              className={`w-full flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors ${
                index !== menuItems.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="p-2 rounded-lg bg-primary/10">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-medium text-foreground">{item.label}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
          ))}
        </div>

        {/* About Section */}
        <div className="mt-6 space-y-3">
          <div className="bg-card rounded-xl p-4 border border-border">
            <h3 className="font-semibold text-foreground mb-2">About MSU-IIT Campus App</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Supporting SDG 4 (Quality Education) and SDG 16 (Peace, Justice and Strong Institutions) through transparent campus governance and accessible education services.
            </p>
            <p className="text-xs text-muted-foreground">Version 1.0.0</p>
          </div>

          <Button variant="destructive" className="w-full" size="lg" onClick={signOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Account;
