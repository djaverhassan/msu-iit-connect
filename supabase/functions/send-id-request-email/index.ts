import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface IDRequestEmailRequest {
  name: string;
  email: string;
  studentId: string;
  idType: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, studentId, idType }: IDRequestEmailRequest = await req.json();

    console.log("Sending ID request requirements email to:", email);

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    // Determine if this is a replacement ID (requires affidavit of loss)
    const isReplacement = idType === "replacement";

    const emailHtml = isReplacement
      ? `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #800000, #a52a2a); padding: 20px; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">MSU-IIT CampusLink</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0 0;">Student ID Replacement Request</p>
          </div>
          
          <div style="background: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-top: none;">
            <p>Dear <strong>${name}</strong>,</p>
            
            <p>Thank you for submitting your Student ID replacement request. Your request has been received and is now being processed.</p>
            
            <div style="background: #fff3cd; border: 1px solid #ffc107; border-radius: 8px; padding: 15px; margin: 20px 0;">
              <h3 style="color: #856404; margin: 0 0 10px 0;">⚠️ Important: Required Documents</h3>
              <p style="margin: 0; color: #856404;">Since you are requesting a <strong>replacement ID</strong>, you must submit the following document:</p>
            </div>
            
            <div style="background: white; border: 2px solid #800000; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h3 style="color: #800000; margin: 0 0 15px 0;">📋 Required Document:</h3>
              <ul style="margin: 0; padding-left: 20px;">
                <li style="margin-bottom: 10px;">
                  <strong>Affidavit of Loss</strong>
                  <ul style="margin-top: 5px;">
                    <li>Must be notarized with a <strong>lawyer's signature</strong></li>
                    <li>Must contain details of how and when your ID was lost</li>
                    <li>Must include your complete name and student ID number</li>
                  </ul>
                </li>
              </ul>
            </div>
            
            <div style="background: #d4edda; border: 1px solid #28a745; border-radius: 8px; padding: 15px; margin: 20px 0;">
              <h3 style="color: #155724; margin: 0 0 10px 0;">📍 Submission Instructions</h3>
              <p style="margin: 0; color: #155724;">Please submit the Affidavit of Loss <strong>in person</strong> at the Office of Student Affairs (OSA) during office hours (Monday-Friday, 8:00 AM - 5:00 PM).</p>
            </div>
            
            <p><strong>Request Details:</strong></p>
            <ul>
              <li><strong>Student ID:</strong> ${studentId}</li>
              <li><strong>Request Type:</strong> ID Replacement</li>
            </ul>
            
            <p>Once we receive and verify your Affidavit of Loss, your new ID will be processed. You will be notified when it is ready for pickup.</p>
            
            <p>If you have any questions, please contact the Office of Student Affairs.</p>
            
            <p style="margin-top: 30px;">Best regards,<br><strong>MSU-IIT Administration</strong></p>
          </div>
          
          <div style="background: #800000; padding: 15px; border-radius: 0 0 10px 10px; text-align: center;">
            <p style="color: rgba(255,255,255,0.8); margin: 0; font-size: 12px;">This is an automated message from MSU-IIT CampusLink. Please do not reply to this email.</p>
          </div>
        </body>
        </html>
      `
      : `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #800000, #a52a2a); padding: 20px; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">MSU-IIT CampusLink</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0 0;">Student ID Request Confirmation</p>
          </div>
          
          <div style="background: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-top: none;">
            <p>Dear <strong>${name}</strong>,</p>
            
            <p>Thank you for submitting your Student ID request. Your request has been received and is now being processed.</p>
            
            <p><strong>Request Details:</strong></p>
            <ul>
              <li><strong>Student ID:</strong> ${studentId}</li>
              <li><strong>Request Type:</strong> ${idType === "new" ? "New ID (First Time)" : "ID Renewal"}</li>
            </ul>
            
            <div style="background: #d4edda; border: 1px solid #28a745; border-radius: 8px; padding: 15px; margin: 20px 0;">
              <h3 style="color: #155724; margin: 0 0 10px 0;">📍 Next Steps</h3>
              <p style="margin: 0; color: #155724;">Please proceed to the Office of Student Affairs (OSA) during office hours (Monday-Friday, 8:00 AM - 5:00 PM) for ID processing and photo capture.</p>
            </div>
            
            <p>You will be notified when your ID is ready for pickup.</p>
            
            <p>If you have any questions, please contact the Office of Student Affairs.</p>
            
            <p style="margin-top: 30px;">Best regards,<br><strong>MSU-IIT Administration</strong></p>
          </div>
          
          <div style="background: #800000; padding: 15px; border-radius: 0 0 10px 10px; text-align: center;">
            <p style="color: rgba(255,255,255,0.8); margin: 0; font-size: 12px;">This is an automated message from MSU-IIT CampusLink. Please do not reply to this email.</p>
          </div>
        </body>
        </html>
      `;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "MSU-IIT CampusLink <noreply@updates.g.msuiit.edu.ph>",
        to: [email],
        subject: isReplacement 
          ? "Student ID Replacement - Required Documents" 
          : "Student ID Request Confirmation",
        html: emailHtml,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Resend API error:", errorData);
      throw new Error(`Failed to send email: ${JSON.stringify(errorData)}`);
    }

    const emailResponse = await response.json();
    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-id-request-email function:", error);
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
