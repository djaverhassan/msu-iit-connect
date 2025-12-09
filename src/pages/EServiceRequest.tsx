import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Calendar, FileText, GraduationCap, CreditCard, ClipboardList } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface ServiceConfig {
  value: string;
  label: string;
  description: string;
  icon: React.ElementType;
  fields: {
    name: string;
    label: string;
    type: "text" | "email" | "select" | "textarea" | "date";
    placeholder?: string;
    required?: boolean;
    options?: { value: string; label: string }[];
  }[];
}

const serviceConfigs: ServiceConfig[] = [
  {
    value: "request_id",
    label: "Request Student ID",
    description: "Apply for your student ID card",
    icon: CreditCard,
    fields: [
      { name: "name", label: "Full Name", type: "text", placeholder: "Enter your full name", required: true },
      { name: "email", label: "Email Address", type: "email", placeholder: "Enter your email", required: true },
      { name: "studentId", label: "Student ID Number", type: "text", placeholder: "e.g., 2024-00001", required: true },
      { name: "college", label: "College/Department", type: "select", required: true, options: [
        { value: "ccs", label: "College of Computer Studies" },
        { value: "ced", label: "College of Education" },
        { value: "cass", label: "College of Arts and Social Sciences" },
        { value: "ceba", label: "College of Economics, Business and Accountancy" },
        { value: "csm", label: "College of Science and Mathematics" },
        { value: "chs", label: "College of Health Sciences" },
        { value: "coe", label: "College of Engineering" },
      ]},
      { name: "yearLevel", label: "Year Level", type: "select", required: true, options: [
        { value: "1", label: "1st Year" },
        { value: "2", label: "2nd Year" },
        { value: "3", label: "3rd Year" },
        { value: "4", label: "4th Year" },
        { value: "5", label: "5th Year" },
        { value: "graduate", label: "Graduate Student" },
      ]},
      { name: "idType", label: "ID Type", type: "select", required: true, options: [
        { value: "new", label: "New ID (First Time)" },
        { value: "replacement", label: "Replacement (Lost/Damaged)" },
        { value: "renewal", label: "Renewal (Expired)" },
      ]},
      { name: "additionalNotes", label: "Additional Notes", type: "textarea", placeholder: "Any additional information..." },
    ],
  },
  {
    value: "request_cor",
    label: "Request COR",
    description: "Certificate of Registration request",
    icon: FileText,
    fields: [
      { name: "name", label: "Full Name", type: "text", placeholder: "Enter your full name", required: true },
      { name: "email", label: "Email Address", type: "email", placeholder: "Enter your email", required: true },
      { name: "studentId", label: "Student ID Number", type: "text", placeholder: "e.g., 2024-00001", required: true },
      { name: "semester", label: "Semester", type: "select", required: true, options: [
        { value: "1st_2024", label: "1st Semester 2024-2025" },
        { value: "2nd_2024", label: "2nd Semester 2024-2025" },
        { value: "summer_2024", label: "Summer 2024" },
        { value: "1st_2023", label: "1st Semester 2023-2024" },
        { value: "2nd_2023", label: "2nd Semester 2023-2024" },
      ]},
      { name: "copies", label: "Number of Copies", type: "select", required: true, options: [
        { value: "1", label: "1 Copy" },
        { value: "2", label: "2 Copies" },
        { value: "3", label: "3 Copies" },
        { value: "5", label: "5 Copies" },
      ]},
      { name: "purpose", label: "Purpose of Request", type: "text", placeholder: "e.g., Scholarship application, Bank requirement", required: true },
      { name: "additionalNotes", label: "Additional Notes", type: "textarea", placeholder: "Any additional information..." },
    ],
  },
  {
    value: "request_transcript",
    label: "Request Transcript",
    description: "Official transcript of records",
    icon: ClipboardList,
    fields: [
      { name: "name", label: "Full Name", type: "text", placeholder: "Enter your full name", required: true },
      { name: "email", label: "Email Address", type: "email", placeholder: "Enter your email", required: true },
      { name: "studentId", label: "Student ID Number", type: "text", placeholder: "e.g., 2024-00001", required: true },
      { name: "transcriptType", label: "Transcript Type", type: "select", required: true, options: [
        { value: "official", label: "Official Transcript (Sealed)" },
        { value: "unofficial", label: "Unofficial Transcript" },
        { value: "partial", label: "Partial Transcript" },
      ]},
      { name: "copies", label: "Number of Copies", type: "select", required: true, options: [
        { value: "1", label: "1 Copy" },
        { value: "2", label: "2 Copies" },
        { value: "3", label: "3 Copies" },
        { value: "5", label: "5 Copies" },
      ]},
      { name: "purpose", label: "Purpose of Request", type: "text", placeholder: "e.g., Employment, Graduate school application", required: true },
      { name: "deliveryMethod", label: "Delivery Method", type: "select", required: true, options: [
        { value: "pickup", label: "Pick-up at Registrar" },
        { value: "mail", label: "Send via Mail" },
      ]},
      { name: "mailingAddress", label: "Mailing Address (if applicable)", type: "textarea", placeholder: "Enter complete mailing address if you chose mail delivery" },
      { name: "additionalNotes", label: "Additional Notes", type: "textarea", placeholder: "Any additional information..." },
    ],
  },
  {
    value: "enrollment_services",
    label: "Enrollment Services",
    description: "Online enrollment and registration",
    icon: GraduationCap,
    fields: [
      { name: "name", label: "Full Name", type: "text", placeholder: "Enter your full name", required: true },
      { name: "email", label: "Email Address", type: "email", placeholder: "Enter your email", required: true },
      { name: "studentId", label: "Student ID Number", type: "text", placeholder: "e.g., 2024-00001", required: true },
      { name: "enrollmentType", label: "Enrollment Type", type: "select", required: true, options: [
        { value: "regular", label: "Regular Enrollment" },
        { value: "late", label: "Late Enrollment" },
        { value: "cross", label: "Cross-Enrollment" },
        { value: "shifting", label: "Shifting/Transfer" },
        { value: "returning", label: "Returning Student" },
      ]},
      { name: "targetSemester", label: "Target Semester", type: "select", required: true, options: [
        { value: "1st_2025", label: "1st Semester 2025-2026" },
        { value: "2nd_2024", label: "2nd Semester 2024-2025" },
        { value: "summer_2025", label: "Summer 2025" },
      ]},
      { name: "program", label: "Program/Course", type: "text", placeholder: "e.g., BS Computer Science", required: true },
      { name: "concern", label: "Specific Concern", type: "textarea", placeholder: "Describe your enrollment concern or request in detail", required: true },
      { name: "additionalNotes", label: "Additional Notes", type: "textarea", placeholder: "Any additional information..." },
    ],
  },
  {
    value: "grade_viewing",
    label: "Grade Viewing",
    description: "View your academic grades",
    icon: Calendar,
    fields: [
      { name: "name", label: "Full Name", type: "text", placeholder: "Enter your full name", required: true },
      { name: "email", label: "Email Address", type: "email", placeholder: "Enter your email", required: true },
      { name: "studentId", label: "Student ID Number", type: "text", placeholder: "e.g., 2024-00001", required: true },
      { name: "issueType", label: "Issue Type", type: "select", required: true, options: [
        { value: "missing_grade", label: "Missing Grade" },
        { value: "incorrect_grade", label: "Incorrect Grade" },
        { value: "access_issue", label: "Cannot Access Grades" },
        { value: "grade_appeal", label: "Grade Appeal" },
      ]},
      { name: "semester", label: "Semester Concerned", type: "select", required: true, options: [
        { value: "1st_2024", label: "1st Semester 2024-2025" },
        { value: "2nd_2024", label: "2nd Semester 2024-2025" },
        { value: "summer_2024", label: "Summer 2024" },
        { value: "1st_2023", label: "1st Semester 2023-2024" },
      ]},
      { name: "subjectCode", label: "Subject Code (if applicable)", type: "text", placeholder: "e.g., CS 101" },
      { name: "instructorName", label: "Instructor Name (if known)", type: "text", placeholder: "Enter instructor's name" },
      { name: "concern", label: "Detailed Concern", type: "textarea", placeholder: "Describe your grade viewing issue in detail", required: true },
      { name: "additionalNotes", label: "Additional Notes", type: "textarea", placeholder: "Any additional information..." },
    ],
  },
];

const EServiceRequest = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  
  const serviceParam = searchParams.get("service") || "request_id";
  const currentService = serviceConfigs.find(s => s.value === serviceParam) || serviceConfigs[0];
  const ServiceIcon = currentService.icon;

  const [formData, setFormData] = useState<Record<string, string>>({
    email: user?.email || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFieldChange = (fieldName: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    const missingFields = currentService.fields
      .filter(f => f.required && !formData[f.name]?.trim())
      .map(f => f.label);

    if (missingFields.length > 0) {
      toast.error(`Please fill in: ${missingFields.join(", ")}`);
      return;
    }

    if (!user) {
      toast.error("You must be logged in to submit a request");
      return;
    }

    setIsSubmitting(true);

    try {
      // Build additional notes with all form data for service-specific fields
      const formDetails = currentService.fields
        .map(field => {
          const value = formData[field.name];
          if (value && field.name !== "name" && field.name !== "email" && field.name !== "studentId" && field.name !== "additionalNotes" && field.name !== "purpose") {
            const displayValue = field.options?.find(o => o.value === value)?.label || value;
            return `${field.label}: ${displayValue}`;
          }
          return null;
        })
        .filter(Boolean)
        .join("\n");

      const additionalNotes = [formDetails, formData.additionalNotes].filter(Boolean).join("\n\n");

      const { error } = await supabase.from("service_requests").insert({
        user_id: user.id,
        name: formData.name?.trim() || "",
        email: formData.email?.trim() || "",
        student_id: formData.studentId?.trim() || null,
        service_type: currentService.value,
        purpose: formData.purpose?.trim() || formData.concern?.trim() || null,
        additional_notes: additionalNotes || null,
      });

      if (error) throw error;

      toast.success("Service request submitted successfully!");
      setFormData({ email: user?.email || "" });
      navigate("/e-services");
    } catch (error: any) {
      console.error("Error submitting request:", error);
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field: ServiceConfig["fields"][0]) => {
    switch (field.type) {
      case "select":
        return (
          <Select
            value={formData[field.name] || ""}
            onValueChange={(value) => handleFieldChange(field.name, value)}
          >
            <SelectTrigger>
              <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "textarea":
        return (
          <Textarea
            id={field.name}
            placeholder={field.placeholder}
            value={formData[field.name] || ""}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            rows={3}
          />
        );
      default:
        return (
          <Input
            id={field.name}
            type={field.type}
            placeholder={field.placeholder}
            value={formData[field.name] || ""}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
          />
        );
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
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-foreground/10 rounded-lg">
              <ServiceIcon className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{currentService.label}</h1>
              <p className="text-primary-foreground/80 text-sm">{currentService.description}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6">
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {currentService.fields.map(field => (
              <div key={field.name} className="space-y-2">
                <Label htmlFor={field.name}>
                  {field.label} {field.required && <span className="text-destructive">*</span>}
                </Label>
                {renderField(field)}
              </div>
            ))}

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
