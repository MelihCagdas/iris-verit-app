# 📧 How to Set Up Tailor AI Email Templates

## ⚠️ Important: Email templates are NOT visible on localhost

Email templates are stored in **Supabase's dashboard**, not in your code. You need to configure them in Supabase first, then test by signing up with a real email address.

---

## Step-by-Step Guide

### Step 1: Open Supabase Dashboard

1. Go to: https://supabase.com/dashboard
2. Sign in to your account
3. Select your project (the one with URL: `edpbwdvkmazrmvfgdrtb.supabase.co`)

### Step 2: Navigate to Email Templates

1. In the left sidebar, click **Authentication**
2. Click **Email Templates** (under Authentication section)
3. You'll see 4 template types:
   - **Confirm signup**
   - **Magic Link**
   - **Change Email Address**
   - **Reset Password**

### Step 3: Configure Each Template

For each template, follow these steps:

#### A. Confirm Signup Template

1. Click on **"Confirm signup"** template
2. **Subject Line:** Copy this:
   ```
   Welcome to Tailor AI — Let's get you that job!
   ```
3. **Body:** Open the file `supabase-email-templates.md` in this project
4. Find the section **"🎯 Confirm Signup Email Template"**
5. Copy the entire HTML code (everything between the ```html tags)
6. Paste it into the **Body** field in Supabase
7. Click **Save**

#### B. Magic Link Template

1. Click on **"Magic Link"** template
2. **Subject Line:**
   ```
   Your Tailor AI login link — secure & instant
   ```
3. **Body:** Copy the HTML from **"🔄 Magic Link Email Template"** section
4. Paste and click **Save**

#### C. Change Email Address Template

1. Click on **"Change Email Address"** template
2. **Subject Line:**
   ```
   Confirm your new email address for Tailor AI
   ```
3. **Body:** Copy the HTML from **"🔐 Change Email Address Template"** section
4. Paste and click **Save**

#### D. Reset Password Template

1. Click on **"Reset Password"** template
2. **Subject Line:**
   ```
   Reset your Tailor AI password — secure & quick
   ```
3. **Body:** Copy the HTML from **"🔑 Reset Password Template"** section
4. Paste and click **Save**

---

## 🧪 How to Test on Localhost

### Step 1: Make sure your dev server is running

```bash
npm run dev
```

### Step 2: Test the signup flow

1. Open http://localhost:3000 in your browser
2. Click **"Sign Up"** or go to `/login`
3. Fill in:
   - Email: Use a **real email address** you can access
   - Password: Any password (8+ characters)
   - Name: Your name
4. Click **"Sign Up"**

### Step 3: Check your email

1. Go to your email inbox (the one you used to sign up)
2. Look for an email from **Supabase Auth** (or your configured sender)
3. **Subject should be:** "Welcome to Tailor AI — Let's get you that job!"
4. The email should have:
   - Tailor AI logo (tailor needle on job board)
   - Dark theme with indigo/purple gradient
   - Professional copy about beating ATS filters
   - A button to confirm your email

### Step 4: Verify the email

1. Click the **"Confirm Your Email & Get Started →"** button in the email
2. You should be redirected to: `http://localhost:3000/verify-email`
3. You'll see a success message
4. Then you'll be redirected to the login page

---

## ✅ Checklist

- [ ] All 4 templates configured in Supabase dashboard
- [ ] Subject lines updated
- [ ] HTML templates pasted and saved
- [ ] Tested signup with real email
- [ ] Received branded email with Tailor AI logo
- [ ] Email verification link works

---

## 🐛 Troubleshooting

### "I don't see the email templates in Supabase"

- Make sure you're in the correct project
- Check that you're in **Authentication → Email Templates** (not Settings)

### "I'm not receiving emails"

1. Check your spam folder
2. Verify your email address is correct
3. Check Supabase logs: **Authentication → Logs**
4. Make sure email provider is enabled: **Authentication → Providers → Email**

### "The email looks plain/default"

- Make sure you **saved** the template after pasting the HTML
- Check that you copied the **entire HTML** (including `<html>`, `<head>`, `<body>` tags)
- Try signing up again after saving

### "The logo doesn't show"

- The logo is an inline SVG, so it should work in most email clients
- Some email clients (like Outlook) may not support SVG - this is normal
- The email will still look professional without the logo

---

## 📝 Quick Reference

**File to open:** `supabase-email-templates.md`  
**Supabase Dashboard:** https://supabase.com/dashboard  
**Local Test URL:** http://localhost:3000/login

---

## 🎨 What You Should See

After configuring, your emails will have:

✅ **Dark theme** (matches Tailor AI branding)  
✅ **Gradient header** (indigo/purple)  
✅ **Tailor needle logo** (on job board)  
✅ **Professional copy** ("beat ATS, get that job" style)  
✅ **Modern buttons** with gradients  
✅ **Mobile-responsive** design

---

**Need help?** Check the `supabase-email-templates.md` file for all the HTML code ready to copy-paste!

