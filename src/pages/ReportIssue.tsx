import { AlertCircle, Send } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const ReportIssue = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    studentId: "",
    category: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // Insert issue into database
      const { error: insertError } = await supabase
        .from('issues')
        .insert({
          name: formData.name,
          email: formData.email,
          student_id: formData.studentId || null,
          category: formData.category || null,
          message: formData.message,
        });

      if (insertError) {
        throw insertError;
      }

      // Get admin emails from profiles joined with user_roles
      const { data: adminRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id')
        .eq('role', 'admin');

      if (rolesError) {
        console.error("Error fetching admin roles:", rolesError);
      }

      // Get admin emails from auth if we have admin user IDs
      let adminEmails: string[] = [];
      if (adminRoles && adminRoles.length > 0) {
        // For now, we'll use a default admin email since we can't query auth.users directly
        // In production, you'd store admin emails in profiles table
        adminEmails = ["admin@msuiit.edu.ph"]; // Placeholder - admins should update this
      }

      // Send email notification to admins (if adminEmails available)
      if (adminEmails.length > 0) {
        try {
          const { error: emailError } = await supabase.functions.invoke('send-issue-report', {
            body: {
              name: formData.name,
              email: formData.email,
              studentId: formData.studentId,
              category: formData.category,
              message: formData.message,
              adminEmails,
            },
          });

          if (emailError) {
            console.error("Email notification failed:", emailError);
            // Don't throw - the issue was still saved to database
          }
        } catch (emailErr) {
          console.error("Email notification error:", emailErr);
        }
      }

      toast.success("Report submitted successfully! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        studentId: "",
        category: "",
        message: "",
      });
    } catch (error: any) {
      console.error("Error submitting report:", error);
      toast.error("Failed to submit report. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground px-4 pt-8 pb-6 rounded-b-3xl" style={{ boxShadow: "var(--shadow-elevated)" }}>
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Report an Issue</h1>
          </div>
          <p className="text-primary-foreground/80 text-sm">Help us improve our campus together</p>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6">
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="name" className="text-foreground mb-2 block">
                Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your full name"
                required
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-foreground mb-2 block">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your.email@g.msuiit.edu.ph"
                required
              />
            </div>

            <div>
              <Label htmlFor="studentId" className="text-foreground mb-2 block">
                Student ID
              </Label>
              <Input
                id="studentId"
                value={formData.studentId}
                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                placeholder="2024-12345"
              />
            </div>

            <div>
              <Label htmlFor="category" className="text-foreground mb-2 block">
                Issue Category
              </Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g., Facilities, Services, Security"
              />
            </div>

            <div>
              <Label htmlFor="message" className="text-foreground mb-2 block">
                Message <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe the issue in detail..."
                className="min-h-[150px] resize-none"
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Submitting..."
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Submit Report
                </>
              )}
            </Button>
          </form>
        </Card>

        <div className="mt-4 bg-muted/50 rounded-xl p-4">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> All reports are reviewed by the administration. You will receive a response via email as soon as possible.
          </p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default ReportIssue;
