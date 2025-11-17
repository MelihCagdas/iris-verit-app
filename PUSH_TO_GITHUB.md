# 🚀 Quick Guide: Push to GitHub

## ✅ Step 1: Create GitHub Repository

1. Go to: **https://github.com/new**
2. Repository name: `iris-verit-app` (or any name)
3. **IMPORTANT:** Leave all checkboxes **UNCHECKED** (no README, no .gitignore, no license)
4. Click **"Create repository"**

## ✅ Step 2: Copy Your Repository URL

After creating, you'll see a page with setup instructions. Copy the HTTPS URL:
- It will look like: `https://github.com/YOUR-USERNAME/iris-verit-app.git`
- Replace `YOUR-USERNAME` with your actual GitHub username

## ✅ Step 3: Run These Commands

**Replace `YOUR-REPO-URL` with the URL from Step 2:**

```bash
git remote add origin YOUR-REPO-URL
git push -u origin main
```

**Example:**
```bash
git remote add origin https://github.com/yourusername/iris-verit-app.git
git push -u origin main
```

---

## 🔐 If You Get Authentication Errors

### Option A: Use Personal Access Token (Easiest)

1. Go to: **https://github.com/settings/tokens**
2. Click **"Generate new token (classic)"**
3. Name it: `iris-verit-app`
4. Check the **`repo`** checkbox
5. Click **"Generate token"**
6. **COPY THE TOKEN** (you won't see it again!)

When you run `git push`, it will ask for:
- **Username:** Your GitHub username
- **Password:** Paste the token (not your GitHub password!)

### Option B: Use GitHub CLI

```bash
# Install GitHub CLI
brew install gh

# Login
gh auth login

# Then push
git push -u origin main
```

---

## ❌ Common Errors & Fixes

### Error: "remote origin already exists"
```bash
git remote remove origin
git remote add origin YOUR-REPO-URL
git push -u origin main
```

### Error: "Permission denied" or "Authentication failed"
- Use Personal Access Token (see Option A above)
- Or use GitHub CLI (see Option B above)

### Error: "Repository not found"
- Make sure you created the repository on GitHub first
- Check that the URL is correct
- Make sure you have access to the repository

---

## ✅ Success!

After successful push, you should see:
```
Enumerating objects: 47, done.
Counting objects: 100% (47/47), done.
Writing objects: 100% (47/47), done.
To https://github.com/yourusername/iris-verit-app.git
 * [new branch]      main -> main
```

Then you can:
1. Visit your repository on GitHub
2. Deploy to Vercel (connect your GitHub repo)

---

## 📝 Quick Reference

```bash
# Check if remote is set
git remote -v

# Remove remote (if needed)
git remote remove origin

# Add remote
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git

# Push to GitHub
git push -u origin main

# Check status
git status
```

