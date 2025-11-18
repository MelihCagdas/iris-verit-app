# 📧 Tailor AI Email Templates for Supabase

Copy these templates into your Supabase dashboard:
**Authentication → Email Templates → [Template Name]**

---

## 🎯 Confirm Signup Email Template

**Subject:** `Welcome to Tailor AI — Let's get you that job!`

**Body (HTML):**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0f172a; color: #e2e8f0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f172a; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #1e293b; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);">
          
          <!-- Header with Logo -->
          <tr>
            <td style="background: linear-gradient(135deg, #6366f1 0%, #4338ca 100%); padding: 40px 30px; text-align: center;">
              <div style="margin-bottom: 20px;">
                <!-- Logo: Tailor Needle on Job Board (SVG inline) -->
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin: 0 auto;">
                  <!-- Job Board Background -->
                  <rect x="8" y="12" width="48" height="40" rx="4" fill="#1e293b" stroke="#6366f1" stroke-width="2"/>
                  <!-- Job Board Lines -->
                  <line x1="16" y1="24" x2="48" y2="24" stroke="#475569" stroke-width="1.5"/>
                  <line x1="16" y1="32" x2="48" y2="32" stroke="#475569" stroke-width="1.5"/>
                  <line x1="16" y1="40" x2="48" y2="40" stroke="#475569" stroke-width="1.5"/>
                  <!-- Tailor Needle -->
                  <path d="M32 8 L32 20 M28 16 L32 20 L36 16" stroke="#6366f1" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                  <circle cx="32" cy="20" r="2" fill="#6366f1"/>
                </svg>
              </div>
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">Tailor AI</h1>
              <p style="margin: 8px 0 0 0; color: #cbd5e1; font-size: 14px; font-weight: 500;">Precision resume tailoring powered by AI</p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="margin: 0 0 16px 0; color: #f1f5f9; font-size: 24px; font-weight: 600;">Welcome! Let's beat those ATS filters together.</h2>
              
              <p style="margin: 0 0 24px 0; color: #cbd5e1; font-size: 16px; line-height: 1.6;">
                Hi there! 👋
              </p>
              
              <p style="margin: 0 0 24px 0; color: #cbd5e1; font-size: 16px; line-height: 1.6;">
                We're thrilled you're joining Tailor AI. You're one step away from creating resumes that actually get past AI filters and land you interviews.
              </p>

              <p style="margin: 0 0 32px 0; color: #cbd5e1; font-size: 16px; line-height: 1.6;">
                Please confirm your email address to get started:
              </p>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 0 0 32px 0;">
                    <a href="{{ .ConfirmationURL }}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #6366f1 0%, #4338ca 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.3);">
                      Confirm Your Email & Get Started →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 0; color: #94a3b8; font-size: 14px; line-height: 1.5;">
                This link will expire in 24 hours. If you didn't sign up for Tailor AI, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px; background-color: #0f172a; border-top: 1px solid #334155; text-align: center;">
              <p style="margin: 0 0 12px 0; color: #64748b; font-size: 14px; line-height: 1.5;">
                <strong style="color: #cbd5e1;">Ready to get that job?</strong><br>
                Start tailoring your resume in minutes.
              </p>
              <p style="margin: 16px 0 0 0; color: #64748b; font-size: 12px;">
                Tailor AI · Precision resume tailoring powered by AI<br>
                <a href="{{ .SiteURL }}" style="color: #6366f1; text-decoration: none;">Visit Tailor AI</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

---

## 🔄 Magic Link Email Template

**Subject:** `Your Tailor AI login link — secure & instant`

**Body (HTML):**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0f172a; color: #e2e8f0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f172a; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #1e293b; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #6366f1 0%, #4338ca 100%); padding: 40px 30px; text-align: center;">
              <div style="margin-bottom: 20px;">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin: 0 auto;">
                  <rect x="8" y="12" width="48" height="40" rx="4" fill="#1e293b" stroke="#6366f1" stroke-width="2"/>
                  <line x1="16" y1="24" x2="48" y2="24" stroke="#475569" stroke-width="1.5"/>
                  <line x1="16" y1="32" x2="48" y2="32" stroke="#475569" stroke-width="1.5"/>
                  <line x1="16" y1="40" x2="48" y2="40" stroke="#475569" stroke-width="1.5"/>
                  <path d="M32 8 L32 20 M28 16 L32 20 L36 16" stroke="#6366f1" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                  <circle cx="32" cy="20" r="2" fill="#6366f1"/>
                </svg>
              </div>
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">Tailor AI</h1>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="margin: 0 0 16px 0; color: #f1f5f9; font-size: 24px; font-weight: 600;">Your secure login link</h2>
              
              <p style="margin: 0 0 24px 0; color: #cbd5e1; font-size: 16px; line-height: 1.6;">
                Hi! 👋
              </p>
              
              <p style="margin: 0 0 24px 0; color: #cbd5e1; font-size: 16px; line-height: 1.6;">
                Click the button below to securely log in to your Tailor AI account. No password needed!
              </p>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 0 0 32px 0;">
                    <a href="{{ .ConfirmationURL }}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #6366f1 0%, #4338ca 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.3);">
                      Log In to Tailor AI →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 0; color: #94a3b8; font-size: 14px; line-height: 1.5;">
                This link will expire in 1 hour. If you didn't request this, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px; background-color: #0f172a; border-top: 1px solid #334155; text-align: center;">
              <p style="margin: 0; color: #64748b; font-size: 12px;">
                Tailor AI · Precision resume tailoring powered by AI
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

---

## 🔐 Change Email Address Template

**Subject:** `Confirm your new email address for Tailor AI`

**Body (HTML):**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0f172a; color: #e2e8f0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f172a; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #1e293b; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #6366f1 0%, #4338ca 100%); padding: 40px 30px; text-align: center;">
              <div style="margin-bottom: 20px;">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin: 0 auto;">
                  <rect x="8" y="12" width="48" height="40" rx="4" fill="#1e293b" stroke="#6366f1" stroke-width="2"/>
                  <line x1="16" y1="24" x2="48" y2="24" stroke="#475569" stroke-width="1.5"/>
                  <line x1="16" y1="32" x2="48" y2="32" stroke="#475569" stroke-width="1.5"/>
                  <line x1="16" y1="40" x2="48" y2="40" stroke="#475569" stroke-width="1.5"/>
                  <path d="M32 8 L32 20 M28 16 L32 20 L36 16" stroke="#6366f1" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                  <circle cx="32" cy="20" r="2" fill="#6366f1"/>
                </svg>
              </div>
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">Tailor AI</h1>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="margin: 0 0 16px 0; color: #f1f5f9; font-size: 24px; font-weight: 600;">Confirm your new email</h2>
              
              <p style="margin: 0 0 24px 0; color: #cbd5e1; font-size: 16px; line-height: 1.6;">
                Hi there!
              </p>
              
              <p style="margin: 0 0 24px 0; color: #cbd5e1; font-size: 16px; line-height: 1.6;">
                You requested to change your email address for your Tailor AI account. Click the button below to confirm this new email address.
              </p>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 0 0 32px 0;">
                    <a href="{{ .ConfirmationURL }}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #6366f1 0%, #4338ca 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.3);">
                      Confirm New Email →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 0; color: #94a3b8; font-size: 14px; line-height: 1.5;">
                If you didn't request this change, please contact our support team immediately.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px; background-color: #0f172a; border-top: 1px solid #334155; text-align: center;">
              <p style="margin: 0; color: #64748b; font-size: 12px;">
                Tailor AI · Precision resume tailoring powered by AI
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

---

## 🔑 Reset Password Template

**Subject:** `Reset your Tailor AI password — secure & quick`

**Body (HTML):**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0f172a; color: #e2e8f0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f172a; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #1e293b; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #6366f1 0%, #4338ca 100%); padding: 40px 30px; text-align: center;">
              <div style="margin-bottom: 20px;">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin: 0 auto;">
                  <rect x="8" y="12" width="48" height="40" rx="4" fill="#1e293b" stroke="#6366f1" stroke-width="2"/>
                  <line x1="16" y1="24" x2="48" y2="24" stroke="#475569" stroke-width="1.5"/>
                  <line x1="16" y1="32" x2="48" y2="32" stroke="#475569" stroke-width="1.5"/>
                  <line x1="16" y1="40" x2="48" y2="40" stroke="#475569" stroke-width="1.5"/>
                  <path d="M32 8 L32 20 M28 16 L32 20 L36 16" stroke="#6366f1" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                  <circle cx="32" cy="20" r="2" fill="#6366f1"/>
                </svg>
              </div>
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">Tailor AI</h1>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="margin: 0 0 16px 0; color: #f1f5f9; font-size: 24px; font-weight: 600;">Reset your password</h2>
              
              <p style="margin: 0 0 24px 0; color: #cbd5e1; font-size: 16px; line-height: 1.6;">
                Hi there!
              </p>
              
              <p style="margin: 0 0 24px 0; color: #cbd5e1; font-size: 16px; line-height: 1.6;">
                We received a request to reset your password for your Tailor AI account. Click the button below to create a new password.
              </p>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 0 0 32px 0;">
                    <a href="{{ .ConfirmationURL }}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #6366f1 0%, #4338ca 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.3);">
                      Reset Password →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 0; color: #94a3b8; font-size: 14px; line-height: 1.5;">
                This link will expire in 1 hour. If you didn't request a password reset, you can safely ignore this email — your account remains secure.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px; background-color: #0f172a; border-top: 1px solid #334155; text-align: center;">
              <p style="margin: 0; color: #64748b; font-size: 12px;">
                Tailor AI · Precision resume tailoring powered by AI
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

---

## 📝 How to Apply These Templates

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Navigate to **Authentication → Email Templates**
4. For each template type:
   - Click on the template (e.g., "Confirm signup")
   - Replace the **Subject** with the subject line provided above
   - Replace the **Body** with the HTML provided above
   - Click **Save**

## 🎨 Template Variables

Supabase uses these variables in templates:
- `{{ .ConfirmationURL }}` - The confirmation/action link
- `{{ .SiteURL }}` - Your site URL
- `{{ .Email }}` - User's email address
- `{{ .Token }}` - Verification token (if needed)

All templates are already configured to use these variables correctly.

## ✨ Design Features

- **Modern dark theme** matching Tailor AI branding
- **Gradient header** with indigo/purple colors (#6366f1 to #4338ca)
- **Inline SVG logo** (tailor needle on job board)
- **Mobile-responsive** table-based layout
- **Polite, friendly copy** with "beat ATS, get that job" messaging
- **Clear CTAs** with gradient buttons
- **Professional footer** with branding

