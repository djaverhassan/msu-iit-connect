import { BottomNav } from "@/components/BottomNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

import thuumLogo from "@/assets/publications/thuum-logo.png";
import sidlakLogo from "@/assets/publications/sidlak-logo.png";
import caduceusLogo from "@/assets/publications/caduceus-logo.png";
import adinfinitumLogo from "@/assets/publications/adinfinitum-logo.png";
import sindawLogo from "@/assets/publications/sindaw-logo.png";
import motherboardLogo from "@/assets/publications/motherboard-logo.png";
import cassayuranLogo from "@/assets/publications/cassayuran-logo.png";
import silahisLogo from "@/assets/publications/silahis-logo.png";

const publications = [
  {
    id: "silahis",
    name: "SILAHIS",
    description: "Official Student Publication of MSU-IIT",
    college: "MSU-IIT",
    path: "/publications/silahis",
    logo: silahisLogo,
  },
  {
    id: "sidlak",
    name: "SIDLAK",
    description: "The Official Student Publication",
    college: "College of Education",
    path: "/publications/sidlak",
    logo: sidlakLogo,
  },
  {
    id: "cassayuran",
    name: "CASSAYURAN",
    description: "The Official Student Publication",
    college: "College of Arts and Social Sciences",
    path: "/publications/cassayuran",
    logo: cassayuranLogo,
  },
  {
    id: "motherboard",
    name: "THE MOTHERBOARD",
    description: "The Official Student Publication",
    college: "College of Computer Studies",
    path: "/publications/motherboard",
    logo: motherboardLogo,
  },
  {
    id: "sindaw",
    name: "SINDAW",
    description: "The Official Student Publication",
    college: "College of Economics, Business and Accountancy",
    path: "/publications/sindaw",
    logo: sindawLogo,
  },
  {
    id: "adinfinitum",
    name: "AD INFINITUM",
    description: "The Official Student Publication",
    college: "College of Science and Mathematics",
    path: "/publications/adinfinitum",
    logo: adinfinitumLogo,
  },
  {
    id: "caduceus",
    name: "THE CADUCEUS",
    description: "The Official Student Publication",
    college: "College of Health Sciences",
    path: "/publications/caduceus",
    logo: caduceusLogo,
  },
  {
    id: "thuum",
    name: "THE THU'UM",
    description: "The Official Student Publication",
    college: "College of Engineering",
    path: "/publications/thuum",
    logo: thuumLogo,
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
                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={pub.logo} 
                        alt={`${pub.name} logo`} 
                        className="w-full h-full object-cover"
                      />
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