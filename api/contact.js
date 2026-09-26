/**
 * Vercel Serverless Function: /api/contact
 * Handles customer inquiries, contact briefs, growth audit requests, and newsletter leads.
 * Securely delivers notifications via Resend API to the business owner.
 */

// Helper: Sanitize string inputs (strip HTML tags, control chars, and enforce length limits)
function sanitize(input, maxLength = 500) {
  if (typeof input !== 'string') return '';
  return input
    .replace(/<[^>]*>?/gm, '') // Strip HTML tags
    .trim()
    .slice(0, maxLength);
}

// Helper: Validate email format using standard RFC 5322 regex
function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email) && email.length <= 150;
}

export default async function handler(req, res) {
  // CORS & Security Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Accept POST requests only
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Only POST requests are accepted.'
    });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        return res.status(400).json({
          success: false,
          error: 'Invalid JSON payload received.'
        });
      }
    }

    if (!body || typeof body !== 'object') {
      return res.status(400).json({
        success: false,
        error: 'Request body cannot be empty.'
      });
    }

    // 1. Anti-Spam Honeypot Protection
    // Hidden fields that legitimate human users never fill out
    if (body._hp || body.website || body.honeypot) {
      // Silently accept without sending an email to fool automated scrapers/bots
      return res.status(200).json({
        success: true,
        message: 'Thank you! Your enquiry has been submitted successfully. We will contact you soon.'
      });
    }

    // 2. Extract and Sanitize Fields
    const rawEmail = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const rawName = typeof body.name === 'string' ? body.name.trim() : '';
    const rawPhone = typeof body.phone === 'string' ? body.phone.trim() : '';
    const rawCompany = typeof (body.company || body.hotelName) === 'string' 
      ? (body.company || body.hotelName).trim() 
      : '';
    const rawService = typeof (body.service || body.propertyType) === 'string' 
      ? (body.service || body.propertyType).trim() 
      : '';
    const rawBudget = typeof body.budget === 'string' ? body.budget.trim() : '';
    const rawMessage = typeof body.message === 'string' ? body.message.trim() : '';
    const rawFormType = typeof body.formType === 'string' ? body.formType.trim() : 'Website Contact Form';
    const rawSourceUrl = typeof body.sourceUrl === 'string' ? body.sourceUrl.trim() : 'https://www.jjelevate.com/';

    // Sanitize with field-appropriate length limits
    const email = sanitize(rawEmail, 150);
    const name = sanitize(rawName, 100);
    const phone = sanitize(rawPhone, 35);
    const company = sanitize(rawCompany, 150);
    const service = sanitize(rawService, 150);
    const budget = sanitize(rawBudget, 100);
    const message = sanitize(rawMessage, 3000);
    const formType = sanitize(rawFormType, 80);
    const sourceUrl = sanitize(rawSourceUrl, 250);

    // 3. Server-side Validation
    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email address is required.'
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.'
      });
    }

    // Name is required for general inquiries, brief submissions, and strategy audits
    if (!name && formType !== 'Newsletter Subscription') {
      return res.status(400).json({
        success: false,
        error: 'Full name is required.'
      });
    }

    // For general brief, require message; for strategy audit, require phone
    if (formType === 'Contact Brief' && !message) {
      return res.status(400).json({
        success: false,
        error: 'Please include a message describing your goals.'
      });
    }

    // 4. Submission Metadata
    const submissionDate = new Date();
    const formattedDateIST = submissionDate.toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium'
    }) + ' (IST)';
    const formattedDateUTC = submissionDate.toUTCString();

    // 5. Environment Variables & Fallbacks
    const resendApiKey = process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY.trim() : '';
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL 
      ? process.env.CONTACT_RECEIVER_EMAIL.trim() 
      : 'info@jjelevate.com';
    const fromEmail = process.env.CONTACT_FROM_EMAIL 
      ? process.env.CONTACT_FROM_EMAIL.trim() 
      : 'JJ Elevate <onboarding@resend.dev>';

    if (!resendApiKey) {
      console.error('[JJ Elevate API Error]: RESEND_API_KEY environment variable is not configured.');
      return res.status(500).json({
        success: false,
        error: 'Server email configuration is missing. Please contact us directly at info@jjelevate.com or +91 78500 27373.'
      });
    }

    // 6. Build Email Content
    const subject = `New Customer Enquiry — JJ Elevate`;

    // Clean Plain Text Body as requested
    const textBody = [
      `New Customer Enquiry — JJ Elevate`,
      `Form Type: ${formType}`,
      ``,
      `Name: ${name || 'N/A'}`,
      `Email: ${email}`,
      `Phone: ${phone || 'N/A'}`,
      `Company / Property: ${company || 'N/A'}`,
      `Service / Requirement: ${service || 'N/A'}`,
      budget ? `Budget: ${budget}` : null,
      ``,
      `Message:`,
      `${message || '(No message provided)'}`,
      ``,
      `----------------------------------------`,
      `Submitted from:`,
      `${sourceUrl}`,
      `Date & Time: ${formattedDateIST}`,
      `UTC Timestamp: ${formattedDateUTC}`,
      `----------------------------------------`
    ].filter(line => line !== null).join('\n');

    // Rich Branded HTML Body
    const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F4F4F6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0B0C10;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #F4F4F6; padding: 30px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.06); border: 1px solid #E5E5E9;">
          
          <!-- Header Bar -->
          <tr>
            <td style="background-color: #0B0C10; padding: 28px 32px; border-bottom: 4px solid #FF1E56;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="font-size: 20px; font-weight: 900; letter-spacing: 2px; color: #FFFFFF; text-transform: uppercase;">
                      JJ ELEVATE
                    </span>
                    <span style="display: block; font-size: 11px; font-weight: 700; color: #FFDE00; letter-spacing: 1.5px; text-transform: uppercase; margin-top: 4px;">
                      Hospitality Growth Agency
                    </span>
                  </td>
                  <td align="right">
                    <span style="display: inline-block; background-color: rgba(255, 30, 86, 0.2); color: #FF1E56; border: 1px solid #FF1E56; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; padding: 4px 10px; rounded-radius: 20px;">
                      ${formType}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Body -->
          <tr>
            <td style="padding: 32px 32px 24px 32px;">
              <h1 style="margin: 0 0 8px 0; font-size: 22px; font-weight: 800; color: #0B0C10; letter-spacing: -0.5px;">
                New Customer Enquiry
              </h1>
              <p style="margin: 0 0 24px 0; font-size: 13px; color: #555560; line-height: 1.5;">
                A new inquiry was just received on <a href="https://www.jjelevate.com/" style="color: #FF1E56; text-decoration: none; font-weight: 600;">jjelevate.com</a>. Details are outlined below:
              </p>

              <!-- Customer Details Table -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-bottom: 24px;">
                
                <tr>
                  <td style="padding: 10px 14px; background-color: #F8F8FA; border-top: 1px solid #EDEDF2; font-size: 12px; font-weight: 700; color: #6E6E7A; text-transform: uppercase; letter-spacing: 0.5px; width: 35%;">
                    Customer Name
                  </td>
                  <td style="padding: 10px 14px; background-color: #FFFFFF; border-top: 1px solid #EDEDF2; font-size: 14px; font-weight: 700; color: #0B0C10;">
                    ${name || 'N/A'}
                  </td>
                </tr>

                <tr>
                  <td style="padding: 10px 14px; background-color: #F8F8FA; border-top: 1px solid #EDEDF2; font-size: 12px; font-weight: 700; color: #6E6E7A; text-transform: uppercase; letter-spacing: 0.5px;">
                    Work Email
                  </td>
                  <td style="padding: 10px 14px; background-color: #FFFFFF; border-top: 1px solid #EDEDF2; font-size: 14px; font-weight: 600; color: #FF1E56;">
                    <a href="mailto:${email}" style="color: #FF1E56; text-decoration: none;">${email}</a>
                  </td>
                </tr>

                ${phone ? `
                <tr>
                  <td style="padding: 10px 14px; background-color: #F8F8FA; border-top: 1px solid #EDEDF2; font-size: 12px; font-weight: 700; color: #6E6E7A; text-transform: uppercase; letter-spacing: 0.5px;">
                    Phone / WhatsApp
                  </td>
                  <td style="padding: 10px 14px; background-color: #FFFFFF; border-top: 1px solid #EDEDF2; font-size: 14px; font-weight: 600; color: #0B0C10;">
                    <a href="tel:${phone}" style="color: #0B0C10; text-decoration: none;">${phone}</a>
                  </td>
                </tr>` : ''}

                ${company ? `
                <tr>
                  <td style="padding: 10px 14px; background-color: #F8F8FA; border-top: 1px solid #EDEDF2; font-size: 12px; font-weight: 700; color: #6E6E7A; text-transform: uppercase; letter-spacing: 0.5px;">
                    Company / Hotel
                  </td>
                  <td style="padding: 10px 14px; background-color: #FFFFFF; border-top: 1px solid #EDEDF2; font-size: 14px; font-weight: 600; color: #0B0C10;">
                    ${company}
                  </td>
                </tr>` : ''}

                ${service ? `
                <tr>
                  <td style="padding: 10px 14px; background-color: #F8F8FA; border-top: 1px solid #EDEDF2; font-size: 12px; font-weight: 700; color: #6E6E7A; text-transform: uppercase; letter-spacing: 0.5px;">
                    Service / Property Type
                  </td>
                  <td style="padding: 10px 14px; background-color: #FFFFFF; border-top: 1px solid #EDEDF2; font-size: 14px; font-weight: 600; color: #0B0C10;">
                    ${service}
                  </td>
                </tr>` : ''}

                ${budget ? `
                <tr>
                  <td style="padding: 10px 14px; background-color: #F8F8FA; border-top: 1px solid #EDEDF2; border-bottom: 1px solid #EDEDF2; font-size: 12px; font-weight: 700; color: #6E6E7A; text-transform: uppercase; letter-spacing: 0.5px;">
                    Monthly Budget
                  </td>
                  <td style="padding: 10px 14px; background-color: #FFFFFF; border-top: 1px solid #EDEDF2; border-bottom: 1px solid #EDEDF2; font-size: 14px; font-weight: 600; color: #0B0C10;">
                    ${budget}
                  </td>
                </tr>` : ''}
              </table>

              <!-- Message Block -->
              <div style="background-color: #FAF9F6; border: 1px solid #E8E7E3; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                <span style="display: block; font-size: 11px; font-weight: 800; color: #0B0C10; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">
                  Customer Message / Project Goals:
                </span>
                <p style="margin: 0; font-size: 14px; color: #282A2C; line-height: 1.6; white-space: pre-wrap;">${message || '(No detailed message provided)'}</p>
              </div>

              <!-- Quick Reply Action -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                <tr>
                  <td align="center">
                    <a href="mailto:${email}?subject=${encodeURIComponent('Re: ' + subject + ' — JJ Elevate')}" 
                       style="display: inline-block; background-color: #FF1E56; color: #FFFFFF; font-size: 13px; font-weight: 800; text-decoration: none; padding: 13px 28px; border-radius: 50px; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 4px 14px rgba(255, 30, 86, 0.35);">
                      Reply Directly to Customer &rarr;
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer Metadata -->
          <tr>
            <td style="background-color: #F8F8FA; padding: 20px 32px; border-top: 1px solid #EDEDF2; font-size: 11px; color: #888894; line-height: 1.5;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <strong>Submitted from:</strong> <a href="${sourceUrl}" style="color: #6E6E7A; text-decoration: underline;">${sourceUrl}</a><br>
                    <strong>Timestamp (IST):</strong> ${formattedDateIST}
                  </td>
                  <td align="right" style="vertical-align: top;">
                    <strong>JJ Elevate</strong> &bull; Jodhpur, India
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    // 7. Dispatch Email via Resend API
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [receiverEmail],
        reply_to: email,
        subject: subject,
        text: textBody,
        html: htmlBody
      })
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error('[JJ Elevate API Error]: Resend API responded with error:', {
        status: resendResponse.status,
        message: resendData?.message || 'Unknown Resend error'
      });

      return res.status(500).json({
        success: false,
        error: 'Something went wrong. Please try again or contact us directly.'
      });
    }

    // 8. Return Success Response
    return res.status(200).json({
      success: true,
      message: 'Thank you! Your enquiry has been submitted successfully. We will contact you soon.'
    });

  } catch (error) {
    console.error('[JJ Elevate API Error]: Unexpected server error:', error.message);
    return res.status(500).json({
      success: false,
      error: 'Something went wrong. Please try again or contact us directly.'
    });
  }
}
