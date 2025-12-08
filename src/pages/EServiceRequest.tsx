import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const serviceTypes = [
  { value: "request_id", label: "Request ID", description: "Apply for your student ID card" },
  { value: "request_cor", label: "Request COR", description: "Certificate of Registration request" },
  { value: "request_transcript", label: "Request Transcript", description: "Official transcript of records" },
  { value: "enrollment_services", label: "Enrollment Services", description: "Online enrollment and registration" },
  { value: "grade_viewing", label: "Grade Viewing", description: "View your academic grades" },
];

const EServiceRequest = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  
  const serviceParam = searchParams.get("service") || "request_id";
  const currentService = serviceTypes.find(s => s.value === serviceParam) || serviceTypes[0];

  const [formData, setFormData] = useState({
    name: "",
    email: user?.email || "",
    studentId: "",
    purpose: "",
    additionalNotes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!user) {
      toast.error("You must be logged in to submit a request");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("service_requests").insert({
        user_id: user.id,
        name: formData.name.trim(),
        email: formData.email.trim(),
        student_id: formData.studentId.trim() || null,
        service_type: currentService.value,
        purpose: formData.purpose.trim() || null,
        additional_notes: formData.additionalNotes.trim() || null,
      });

      if (error) throw error;

      toast.success("Service request submitted successfully!");
      setFormData({
        name: "",
        email: user?.email || "",
        studentId: "",
        purpose: "",
        additionalNotes: "",
      });
      navigate("/e-services");
    } catch (error: any) {
      console.error("Error submitting request:", error);
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground px-4 pt-8 pb-6 rounded-b-3xl" style={{ boxShadow: "var(--shadow-elevated)" }}>
        <div className="max-w-md mx-auto">
          <Button
            variant="ghost"
            size="sm"
            className="text-primary-foreground mb-4 -ml-2 hover:bg-primary-foreground/10"
            onClick={() => navigate("/e-services")}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h1 className="text-2xl font-bold mb-1">{currentService.label}</h1>
          <p className="text-primary-foreground/80 text-sm">{currentService.description}</p>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6">
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="studentId">Student ID</Label>
              <Input
                id="studentId"
                placeholder="Enter your student ID"
                value={formData.studentId}
                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="purpose">Purpose of Request</Label>
              <Input
                id="purpose"
                placeholder="e.g., For scholarship application"
                value={formData.purpose}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalNotes">Additional Notes</Label>
              <Textarea
                id="additionalNotes"
                placeholder="Any additional information..."
                value={formData.additionalNotes}
                onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                rows={4}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </form>

          <p className="text-xs text-muted-foreground mt-4 text-center">
            Your request will be processed by the administration. You will receive updates via email.
          </p>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default EServiceRequest;
