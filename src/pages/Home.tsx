import { Search, Globe, AlertCircle, GraduationCap, FileText, Plus, ChevronDown, Shield, Users, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ServiceCard } from "@/components/ServiceCard";
import { BottomNav } from "@/components/BottomNav";
import { FeedPost } from "@/components/FeedPost";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { usePosts } from "@/hooks/usePosts";
import { format } from "date-fns";
import { useState, useMemo } from "react";

import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  // Fetch posts from last 30 days with real-time updates
  const { data: posts, isLoading } = usePosts({ recentDays: 30 });
  const { isAdmin, isStudentCouncil, isFaculty } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  
  const services = [
    { icon: Globe, label: "e-Services", href: "/e-services" },
    { icon: AlertCircle, label: "Emergency", href: "/emergency" },
    { icon: GraduationCap, label: "Core Values", href: "/core-values" },
    { icon: FileText, label: "Campus Updates", href: "/news" },
  ];

  // Filter posts based on search query
  const filteredPosts = useMemo(() => {
    if (!posts || !searchQuery.trim()) return posts;
    const query = searchQuery.toLowerCase();
    return posts.filter(post => 
      post.title?.toLowerCase().includes(query) ||
      post.content?.toLowerCase().includes(query) ||
      post.author?.toLowerCase().includes(query)
    );
  }, [posts, searchQuery]);

  // Filter services based on search query
  const filteredServices = useMemo(() => {
    if (!searchQuery.trim()) return services;
    const query = searchQuery.toLowerCase();
    return services.filter(service => 
      service.label.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground px-4 pt-8 pb-6 rounded-b-3xl" style={{ boxShadow: "var(--shadow-elevated)" }}>
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-1">MSU-IIT CampusLink</h1>
              <p className="text-primary-foreground/80 text-sm">Mobile Application for Student Service & Engagement</p>
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card border-0 h-12 rounded-xl text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6">

        {/* Role-Based Panel Buttons */}
        {(isAdmin || isStudentCouncil || isFaculty) && (
          <section className="mb-6 space-y-3">
            {isAdmin && (
              <Button
                onClick={() => navigate("/admin")}
                className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground h-14 rounded-xl font-semibold border-2 border-primary-foreground/20"
                style={{ boxShadow: "var(--shadow-elevated)" }}
              >
                <Shield className="h-5 w-5 mr-2" />
                Admin Panel
              </Button>
            )}

            {isStudentCouncil && (
              <Button
                onClick={() => navigate("/council")}
                className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground h-14 rounded-xl font-semibold border-2 border-primary-foreground/20"
                style={{ boxShadow: "var(--shadow-elevated)" }}
              >
                <Users className="h-5 w-5 mr-2" />
                Student Council Panel
              </Button>
            )}

            {isFaculty && (
              <Button
                onClick={() => navigate("/faculty")}
                className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground h-14 rounded-xl font-semibold"
                style={{ boxShadow: "var(--shadow-elevated)" }}
              >
                <Briefcase className="h-5 w-5 mr-2" />
                Faculty Panel
              </Button>
            )}
          </section>
        )}

        {/* Quick Actions */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">What would you like to do?</h2>
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {filteredServices.map((service) => (
                <ServiceCard key={service.href} {...service} />
              ))}
            </div>
          ) : searchQuery && (
            <p className="text-center text-muted-foreground py-4">No services match "{searchQuery}"</p>
          )}
        </section>

        {/* SDG Focus Banner */}
        <section className="mb-6">
          <Accordion type="single" collapsible className="bg-secondary/10 border border-secondary/20 rounded-2xl overflow-hidden">
            <AccordionItem value="sdg" className="border-0">
              <AccordionTrigger className="px-4 py-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-secondary/20">
                    <GraduationCap className="h-5 w-5 text-secondary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-foreground">This app promotes advocacy for SDG 4 and SDG 16</h3>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-0">
                <div className="pl-11 space-y-3">
                  <div>
                    <h4 className="font-medium text-foreground mb-1">SDG 4: Quality Education</h4>
                    <p className="text-sm text-muted-foreground">Ensuring inclusive and equitable quality education through accessible campus services and resources.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">SDG 16: Peace, Justice and Strong Institutions</h4>
                    <p className="text-sm text-muted-foreground">Promoting transparent governance, accountability, and effective platforms for student voices to be heard.</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
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
              onClick={() => navigate("/report-issue")}
            >
              View Reports
            </Button>
            <Button
              className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground border-0"
              onClick={() => navigate("/report-issue")}
            >
              <Plus className="h-4 w-4 mr-2" />
              Report Issue
            </Button>
          </div>
        </section>

        {/* Campus Feed */}
        <section className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Campus Feed</h3>
            <Button variant="ghost" size="sm" className="text-primary">View All</Button>
          </div>
          <div className="space-y-4">
            {isLoading ? (
              <p className="text-center text-muted-foreground">Loading posts...</p>
            ) : filteredPosts && filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <FeedPost
                  key={post.id}
                  id={post.id}
                  author={post.author}
                  authorType={post.author_type}
                  avatar={undefined}
                  timestamp={format(new Date(post.created_at), "MMM d, yyyy")}
                  content={post.content}
                  image={post.image_url || undefined}
                  likes={post.likes}
                  comments={post.comments_count}
                  facebookUrl={post.facebook_url || undefined}
                  publicationId={post.publication_id}
                />
              ))
            ) : searchQuery ? (
              <p className="text-center text-muted-foreground">No posts match "{searchQuery}"</p>
            ) : (
              <p className="text-center text-muted-foreground">No posts yet. Check back later!</p>
            )}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default Home;
