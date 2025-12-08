import { useState, useEffect } from "react";
import { ArrowLeft, Bell, Newspaper, AlertTriangle, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface NotificationPreferences {
  campusNews: boolean;
  publications: boolean;
  emergencyAlerts: boolean;
  serviceUpdates: boolean;
}

const Notifications = () => {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState<NotificationPreferences>(() => {
    const saved = localStorage.getItem("notificationPreferences");
    return saved ? JSON.parse(saved) : {
      campusNews: true,
      publications: true,
      emergencyAlerts: true,
      serviceUpdates: true,
    };
  });

  useEffect(() => {
    localStorage.setItem("notificationPreferences", JSON.stringify(preferences));
  }, [preferences]);

  const handleToggle = (key: keyof NotificationPreferences) => {
    const newValue = !preferences[key];
    setPreferences(prev => ({ ...prev, [key]: newValue }));
    toast.success(`${key === "campusNews" ? "Campus news" : key === "publications" ? "Publications" : key === "emergencyAlerts" ? "Emergency alerts" : "Service updates"} notifications ${newValue ? "enabled" : "disabled"}`);
  };

  const notificationItems = [
    {
      key: "campusNews" as const,
      icon: Newspaper,
      title: "Campus News",
      description: "Updates and announcements from the administration",
    },
    {
      key: "publications" as const,
      icon: MessageSquare,
      title: "Publications",
      description: "New posts from student publications",
    },
    {
      key: "emergencyAlerts" as const,
      icon: AlertTriangle,
      title: "Emergency Alerts",
      description: "Critical safety and emergency notifications",
    },
    {
      key: "serviceUpdates" as const,
      icon: Bell,
      title: "Service Updates",
      description: "Updates on your service requests",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground px-4 pt-8 pb-6 rounded-b-3xl">
        <div className="max-w-md mx-auto">
          <Button
            variant="ghost"
            size="sm"
            className="text-primary-foreground mb-4 -ml-2 hover:bg-primary-foreground/10"
            onClick={() => navigate("/account")}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h1 className="text-2xl font-bold mb-1">Notifications</h1>
          <p className="text-primary-foreground/80 text-sm">Manage notification preferences</p>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-4">
        <Card className="p-4">
          <h2 className="font-semibold text-foreground mb-4">Push Notifications</h2>
          <div className="space-y-4">
            {notificationItems.map((item) => (
              <div key={item.key} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
                <Switch
                  checked={preferences[item.key]}
                  onCheckedChange={() => handleToggle(item.key)}
                />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <h2 className="font-semibold text-foreground mb-2">Email Notifications</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Email notifications are sent to your registered email address for important updates like service request status changes.
          </p>
          <p className="text-xs text-muted-foreground">
            Email: {localStorage.getItem("userEmail") || "Your registered email"}
          </p>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default Notifications;
