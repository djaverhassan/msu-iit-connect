import { ArrowLeft, MessageCircle, Mail, FileText, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Support = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      question: "How do I request my student ID?",
      answer: "Go to Services > e-Services > Request ID. Fill out the form with your details and submit. You will receive updates via email about your request status.",
    },
    {
      question: "How do I report a campus issue?",
      answer: "Navigate to Services > Report Issue. Describe the issue you're experiencing, select a category, and submit. The administration will review and respond via email.",
    },
    {
      question: "How can I view my grades?",
      answer: "You can request grade viewing access through the e-Services section. Alternatively, you can access the MYIIT Portal directly for real-time grade information.",
    },
    {
      question: "How do I change my password?",
      answer: "Go to Account > Privacy & Security > Change Password. Enter your new password and confirm it to update.",
    },
    {
      question: "Who can I contact for emergencies?",
      answer: "Visit the Emergency page from the Services menu for quick access to emergency hotlines including University Security, Medical Services, Fire Department, and Police.",
    },
  ];

  const contactOptions = [
    {
      icon: MessageCircle,
      title: "Report an Issue",
      description: "Submit a report about campus concerns",
      action: () => navigate("/report-issue"),
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "osa@g.msuiit.edu.ph",
      action: () => window.open("mailto:osa@g.msuiit.edu.ph", "_blank"),
    },
    {
      icon: ExternalLink,
      title: "MSU-IIT Website",
      description: "Visit the official university website",
      action: () => window.open("https://www.msuiit.edu.ph", "_blank"),
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
          <h1 className="text-2xl font-bold mb-1">Help & Support</h1>
          <p className="text-primary-foreground/80 text-sm">Get help and contact support</p>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-4">
        {/* Contact Options */}
        <Card className="p-4">
          <h2 className="font-semibold text-foreground mb-4">Contact Us</h2>
          <div className="space-y-2">
            {contactOptions.map((option) => (
              <button
                key={option.title}
                className="w-full flex items-center gap-3 py-3 hover:bg-muted/50 rounded-lg transition-colors"
                onClick={option.action}
              >
                <div className="p-2 rounded-lg bg-primary/10">
                  <option.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-foreground">{option.title}</p>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* FAQs */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-foreground">Frequently Asked Questions</h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-sm">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>

        {/* App Info */}
        <Card className="p-4">
          <h2 className="font-semibold text-foreground mb-2">App Information</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Version</span>
              <span className="text-foreground">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Developer</span>
              <span className="text-foreground">MSU-IIT OSA</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Updated</span>
              <span className="text-foreground">December 2024</span>
            </div>
          </div>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default Support;
