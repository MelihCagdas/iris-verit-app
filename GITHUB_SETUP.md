# GitHub Setup Guide - Step by Step

## Option 1: Create Repository on GitHub First (Recommended)

### Step 1: Create Repository on GitHub
1. Go to https://github.com/new
2. Repository name: `iris-verit-app` (or any name you prefer)
3. Description: "AI-powered resume tailoring system"
4. Choose **Public** or **Private**
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click **Create repository**

### Step 2: Copy the Repository URL
After creating, GitHub will show you a URL like:
- HTTPS: `https://github.com/yourusername/iris-verit-app.git`
- SSH: `git@github.com:yourusername/iris-verit-app.git`

### Step 3: Connect and Push
Run these commands in your terminal (replace with your actual URL):

```bash
git remote add origin https://github.com/yourusername/iris-verit-app.git
git push -u origin main
```

If you get authentication errors, see "Authentication Issues" below.

---

## Option 2: Push First, Create Later

If you've already run the git commands, you can:

1. Create the repository on GitHub (same as Step 1 above)
2. Then run:
```bash
git remote add origin https://github.com/yourusername/iris-verit-app.git
git push -u origin main
```

---

## Common Issues & Solutions

### Issue 1: "Repository not found" or "Permission denied"

**Solution:** You need to authenticate with GitHub

**Option A: Use Personal Access Token (Recommended)**
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name like "iris-verit-app"
4. Select scopes: Check `repo` (full control of private repositories)
5. Click "Generate token"
6. **Copy the token immediately** (you won't see it again!)
7. When pushing, use the token as password:
   ```bash
   git push -u origin main
   # Username: your-github-username
   # Password: paste-your-token-here
   ```

**Option B: Use GitHub CLI**
```bash
# Install GitHub CLI (if not installed)
brew install gh  # macOS
# or download from https://cli.github.com

# Login
gh auth login

# Then push
git push -u origin main
```

**Option C: Use SSH (More Secure)**
1. Generate SSH key (if you don't have one):
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```
2. Add to SSH agent:
   ```bash
   eval "$(ssh-agent -s)"
   ssh-add ~/.ssh/id_ed25519
   ```
3. Copy public key:
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```
4. Add to GitHub: Settings → SSH and GPG keys → New SSH key
5. Use SSH URL instead:
   ```bash
   git remote set-url origin git@github.com:yourusername/iris-verit-app.git
   git push -u origin main
   ```

### Issue 2: "Remote origin already exists"

**Solution:** Remove and re-add:
```bash
git remote remove origin
git remote add origin https://github.com/yourusername/iris-verit-app.git
```

### Issue 3: "Failed to push some refs"

**Solution:** If the GitHub repo has files (like README), pull first:
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### Issue 4: "Large file" errors

**Solution:** Make sure large files are in .gitignore:
- Check that `node_modules/`, `uploads/`, `.next/`, `generated/` are ignored
- If you accidentally added large files:
  ```bash
  git rm --cached large-file
  git commit -m "Remove large file"
  ```

---

## Quick Command Reference

```bash
# Check status
git status

# Add all files
git add .

# Commit
git commit -m "Your commit message"

# Add remote (replace with your URL)
git remote add origin https://github.com/yourusername/iris-verit-app.git

# Push to GitHub
git push -u origin main

# If you need to update remote URL
git remote set-url origin https://github.com/yourusername/iris-verit-app.git

# Check remote
git remote -v
```

---

## After Successful Push

1. Go to your GitHub repository
2. Verify all files are there
3. You can now deploy to Vercel by connecting your GitHub repo!

---

## Need More Help?

- GitHub Docs: https://docs.github.com/en/get-started
- Git Basics: https://git-scm.com/book/en/v2/Getting-Started-Git-Basics

