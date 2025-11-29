import { Link } from "react-router-dom";
import { Newspaper, BookOpen, GraduationCap, MapPin, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user, isAdmin, signOut } = useAuth();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/80 to-accent">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">MSU-IIT Publications</h1>
        <div className="flex gap-3">
          {user ? (
            <>
              {isAdmin && (
                <Link to="/admin">
                  <Button variant="secondary">
                    Admin Dashboard
                  </Button>
                </Link>
              )}
              <Button variant="secondary" onClick={signOut}>
                Logout
              </Button>
            </>
          ) : (
            <Link to="/auth">
              <Button variant="secondary">
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Button>
            </Link>
          )}
          <Link to="/home">
            <Button variant="default" size="lg">
              Enter Hub
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center text-white space-y-6 max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold">
            Welcome to MSU-IIT Publications Hub
          </h2>
          <p className="text-xl md:text-2xl opacity-90">
            Your gateway to campus news, student publications, and university services
          </p>
          <div className="flex justify-center gap-4 pt-8">
            <Link to="/home">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Explore Now
              </Button>
            </Link>
            {!user && (
              <Link to="/auth">
                <Button size="lg" variant="outline" className="text-lg px-8 text-white border-white hover:bg-white/20">
                  Get Started
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          <Link to="/news">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white hover:bg-white/20 transition-all cursor-pointer">
              <Newspaper className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Campus News</h3>
              <p className="opacity-90">Stay updated with the latest campus announcements</p>
            </div>
          </Link>
          <Link to="/publications">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white hover:bg-white/20 transition-all cursor-pointer">
              <BookOpen className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Publications</h3>
              <p className="opacity-90">Browse articles from student publications</p>
            </div>
          </Link>
          <Link to="/services">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white hover:bg-white/20 transition-all cursor-pointer">
              <GraduationCap className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Services</h3>
              <p className="opacity-90">Access university services and resources</p>
            </div>
          </Link>
          <Link to="/map">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white hover:bg-white/20 transition-all cursor-pointer">
              <MapPin className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Campus Map</h3>
              <p className="opacity-90">Navigate the campus with ease</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
