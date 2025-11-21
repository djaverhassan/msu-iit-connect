import { BottomNav } from "@/components/BottomNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Newspaper } from "lucide-react";
import { Link } from "react-router-dom";

const publications = [
  {
    id: "silahis",
    name: "SILAHIS",
    description: "Official Student Publication of MSU-IIT",
    college: "MSU-IIT",
    path: "/publications/silahis",
  },
  {
    id: "sidlak",
    name: "SIDLAK",
    description: "The Official Student Publication",
    college: "College of Education",
    path: "/publications/sidlak",
  },
  {
    id: "cassayuran",
    name: "CASSAYURAN",
    description: "The Official Student Publication",
    college: "College of Arts and Social Sciences",
    path: "/publications/cassayuran",
  },
  {
    id: "motherboard",
    name: "THE MOTHERBOARD",
    description: "The Official Student Publication",
    college: "College of Computer Studies",
    path: "/publications/motherboard",
  },
  {
    id: "sindaw",
    name: "SINDAW",
    description: "The Official Student Publication",
    college: "College of Economics, Business and Accountancy",
    path: "/publications/sindaw",
  },
  {
    id: "adinfinitum",
    name: "AD INFINITUM",
    description: "The Official Student Publication",
    college: "College of Science and Mathematics",
    path: "/publications/adinfinitum",
  },
  {
    id: "caduceus",
    name: "THE CADUCEUS",
    description: "The Official Student Publication",
    college: "College of Health Sciences",
    path: "/publications/caduceus",
  },
  {
    id: "thuum",
    name: "THE THU'UM",
    description: "The Official Student Publication",
    college: "College of Engineering",
    path: "/publications/thuum",
  },
];

const Publications = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Publications</h1>
          <p className="text-muted-foreground">
            Stay updated with news and articles from MSU-IIT's student publications
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {publications.map((pub) => (
            <Link key={pub.id} to={pub.path}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Newspaper className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl">{pub.name}</CardTitle>
                      <CardDescription className="mt-1">{pub.college}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{pub.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Publications;
