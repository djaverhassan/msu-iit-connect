import { Heart, Award, Users, Lightbulb } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { Card } from "@/components/ui/card";

const CoreValues = () => {
  const values = [
    {
      icon: Award,
      title: "Honor and Excellence",
      description: "We are conscientious, and we take pride in the amount of care, skill, and heart we put into our work to produce excellent outcomes—ones that add value to the people and places around us. We uphold high standards of performance in all the things that we do because we are passionate about making the world a better place.",
      details: "We value integrity and thus, strive to stand up for what is morally right. We make sure we fulfill commitments as a gesture of respect. We believe that honesty and trustworthiness are important tenets of good character.",
    },
    {
      icon: Heart,
      title: "Service and Compassion",
      description: "We have faith in our shared humanity. We fully recognize that in a world of volatility, uncertainty, complexity, and ambiguity, we need to be people for others. We open ourselves up to a world of needs, and we endeavor to be conduits of inclusivity and equity in access to services and opportunities.",
    },
    {
      icon: Lightbulb,
      title: "Resilience and Innovation",
      description: "We have the grit to overcome obstacles and challenges in our pursuit of relevance and excellence. We expose ourselves to new experiences and knowledge, and we believe that there are no limitations to the mind. As such, we are aware that problems can be solved through imagination, research, experimentation, and play.",
      details: "We value curiosity and embrace generous inquiries. We constantly ask questions and challenge mental models to bring about new and out-of-the-box ideas. We embrace the diversity of expertise and break boundaries between fields.",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground px-4 pt-8 pb-6 rounded-b-3xl" style={{ boxShadow: "var(--shadow-elevated)" }}>
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-1">Vision, Mission & Core Values</h1>
          <p className="text-primary-foreground/80 text-sm">MSU-IIT Guiding Principles</p>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6">
        {/* Vision */}
        <section className="mb-6">
          <Card className="p-5 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <h2 className="text-xl font-bold text-foreground mb-3">Vision</h2>
            <p className="text-foreground/90 leading-relaxed">
              A research university committed to the holistic development of the individual and society.
            </p>
          </Card>
        </section>

        {/* Mission */}
        <section className="mb-6">
          <Card className="p-5 bg-gradient-to-br from-secondary/5 to-secondary/10 border-secondary/20">
            <h2 className="text-xl font-bold text-foreground mb-3">Mission</h2>
            <p className="text-foreground/90 leading-relaxed">
              To provide quality education for the sustainable development of the nation and the global community.
            </p>
          </Card>
        </section>

        {/* Core Values */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">Our Core Values</h2>
          <p className="text-muted-foreground mb-6 text-sm">
            To realize our vision and mission, we dedicate ourselves to the following code of conduct:
          </p>
          
          <div className="space-y-4">
            {values.map((value) => (
              <Card key={value.title} className="p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4 mb-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground flex-1">{value.title}</h3>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed mb-3">
                  {value.description}
                </p>
                {value.details && (
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.details}
                  </p>
                )}
              </Card>
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default CoreValues;
