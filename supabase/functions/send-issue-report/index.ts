import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface IssueReportRequest {
  name: string;
  email: string;
  studentId?: string;
  category?: string;
  message: string;
  adminEmails: string[];
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, studentId, category, message, adminEmails }: IssueReportRequest = await req.json();

    console.log("Sending issue report email to admins:", adminEmails);

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    // Send email to all admin emails using Resend API directly
    const emailPromises = adminEmails.map(adminEmail => 
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "MSU-IIT CampusLink <onboarding@resend.dev>",
          to: [adminEmail],
          subject: `New Issue Report: ${category || 'General'}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #800000;">New Issue Report Submitted</h2>
              <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>From:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                ${studentId ? `<p><strong>Student ID:</strong> ${studentId}</p>` : ''}
                ${category ? `<p><strong>Category:</strong> ${category}</p>` : ''}
              </div>
              <div style="background: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                <h3>Message:</h3>
                <p style="white-space: pre-wrap;">${message}</p>
              </div>
              <p style="color: #666; font-size: 12px; margin-top: 20px;">
                This report was submitted through MSU-IIT CampusLink. Please review and respond as soon as possible.
              </p>
            </div>
          `,
        }),
      })
    );

    const responses = await Promise.all(emailPromises);
    
    for (const response of responses) {
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Resend API error:", errorData);
        throw new Error(`Failed to send email: ${JSON.stringify(errorData)}`);
      }
    }

    console.log("Issue report emails sent successfully");

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending issue report email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
