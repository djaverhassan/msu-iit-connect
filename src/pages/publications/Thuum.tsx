import { BottomNav } from "@/components/BottomNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Facebook } from "lucide-react";
import { Link } from "react-router-dom";
import { usePosts } from "@/hooks/usePosts";
import { format } from "date-fns";
import thuumLogo from "@/assets/publications/thuum-logo.png";

const Thuum = () => {
  const { data: posts, isLoading } = usePosts({ publicationId: "thuum", recentDays: 30 });

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <Link to="/publications" className="flex items-center gap-2 text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" />
          Back to Publications
        </Link>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <img src={thuumLogo} alt="Thu'um logo" className="w-16 h-16 rounded-lg object-cover" />
            <div className="space-y-1">
              <h1 className="text-3xl font-bold text-foreground">THE THU'UM</h1>
              <p className="text-muted-foreground">College of Engineering</p>
            </div>
          </div>
          <a 
            href="https://www.facebook.com/thethuumpublication" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button variant="outline" className="gap-2">
              <Facebook className="h-4 w-4" />
              Visit our Facebook Page
            </Button>
          </a>
        </div>

        <div className="space-y-4">
          {isLoading ? (
            <p className="text-center text-muted-foreground">Loading posts...</p>
          ) : posts && posts.length > 0 ? (
            posts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  {post.category && (
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{post.category}</Badge>
                    </div>
                  )}
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                  {post.excerpt && (
                    <CardDescription className="mt-2">{post.excerpt}</CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground gap-4">
                    <span>By {post.author}</span>
                    <span>{format(new Date(post.created_at), "MMM d, yyyy")}</span>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-center text-muted-foreground">No posts yet. Check back later!</p>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Thuum;