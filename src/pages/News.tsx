import { Calendar, FileText, Bell, TrendingUp } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { Badge } from "@/components/ui/badge";

const News = () => {
  const newsItems = [
    {
      id: 1,
      category: "Academic",
      title: "New Academic Calendar for Second Semester Released",
      excerpt: "The registrar's office has published the official academic calendar for the upcoming semester...",
      date: "2 hours ago",
      icon: Calendar,
      urgent: false,
    },
    {
      id: 2,
      category: "Facility",
      title: "Campus Maintenance: Library Wing Renovation",
      excerpt: "Scheduled maintenance work will begin next week. The east wing will be temporarily closed...",
      date: "5 hours ago",
      icon: FileText,
      urgent: true,
    },
    {
      id: 3,
      category: "Event",
      title: "Student Leadership Summit 2024 Registration Open",
      excerpt: "Join us for this year's leadership summit featuring workshops and networking opportunities...",
      date: "1 day ago",
      icon: TrendingUp,
      urgent: false,
    },
    {
      id: 4,
      category: "Announcement",
      title: "Updated Campus Health and Safety Guidelines",
      excerpt: "Please review the updated health protocols effective immediately for all campus activities...",
      date: "2 days ago",
      icon: Bell,
      urgent: true,
    },
    {
      id: 5,
      category: "Academic",
      title: "Scholarship Applications Now Open for Next Term",
      excerpt: "Various scholarship programs are accepting applications. Deadline is end of the month...",
      date: "3 days ago",
      icon: FileText,
      urgent: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground px-4 pt-8 pb-6 rounded-b-3xl" style={{ boxShadow: "var(--shadow-elevated)" }}>
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-1">Campus News</h1>
          <p className="text-primary-foreground/80 text-sm">Stay updated with the latest announcements</p>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6">
        <div className="space-y-4">
          {newsItems.map((item) => (
            <article
              key={item.id}
              className="bg-card p-4 rounded-xl border border-border hover:border-primary/30 transition-colors cursor-pointer"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${item.urgent ? "bg-accent/10" : "bg-primary/10"}`}>
                  <item.icon className={`h-5 w-5 ${item.urgent ? "text-accent" : "text-primary"}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {item.category}
                    </Badge>
                    {item.urgent && (
                      <Badge className="text-xs bg-accent text-accent-foreground">
                        Urgent
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-semibold text-foreground mb-1 leading-snug">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{item.excerpt}</p>
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default News;
