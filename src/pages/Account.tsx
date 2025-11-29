import { User, Settings, Bell, Shield, HelpCircle, LogOut, ChevronRight } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const { user, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<{ display_name: string | null } | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    const fetchProfile = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('display_name')
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

  const menuItems = [
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
                {isAdmin && (
                  <p className="text-primary-foreground/70 text-xs font-semibold">Admin Account</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 -mt-6">
        {/* Menu Items */}
        <div className="bg-card rounded-2xl overflow-hidden border border-border" style={{ boxShadow: "var(--shadow-elevated)" }}>
          {menuItems.map((item, index) => (
            <button
              key={item.href}
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
