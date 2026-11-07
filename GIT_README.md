# Git & GitHub Step-by-Step Guide (Windows)

## 1. Install Git
1. Download Git for Windows: https://git-scm.com/download/win
2. Run the installer and accept the defaults (keep "Git from the command line" selected).
3. Open a new PowerShell / VS Code terminal and verify:
   ```powershell
   git --version
   ```

## 2. Create a GitHub account
1. Go to https://github.com and click **Sign up** (skip if you already have one).
2. Verify your email address.

## 3. Link Git to your GitHub account
Use the same name/email as your GitHub account:
```powershell
git config --global user.name "Your Name"
git config --global user.email "your-github-email@example.com"
git config --global init.defaultBranch main
git config --global --list      # verify
```

### Authenticate (pick one)
**Option A – Browser login (easiest):** The first `git push` opens a Git Credential Manager window. Choose **Sign in with your browser** and authorize.

**Option B – Personal Access Token (PAT):**
1. GitHub → Settings → Developer settings → Personal access tokens → *Tokens (classic)* → **Generate new token**.
2. Tick the `repo` scope, copy the token.
3. When Git asks for a password on push, paste the token (not your GitHub password).

**Option C – GitHub CLI:**
```powershell
winget install --id GitHub.cli
gh auth login
```

## 4. Create the repository on GitHub
1. GitHub → **+** (top right) → **New repository**.
2. Name it, e.g. `AnnaPlaywrightProj2`. Choose Public/Private.
3. Do **NOT** tick "Add README/.gitignore" (the project already has them). Click **Create repository**.
4. Copy the repo URL: `https://github.com/<your-username>/AnnaPlaywrightProj2.git`

## 5. Initial push of the local project
Run from the project folder:
```powershell
cd C:\Playwright\AnnaPlaywrightProj2

git init                                   # create local repository
git status                                 # see untracked files
git add .                                  # stage all files (.gitignore skips node_modules etc.)
git commit -m "Initial commit"             # save snapshot locally
git branch -M main                         # name the branch main
git remote add origin https://github.com/<your-username>/AnnaPlaywrightProj2.git   # link to GitHub
git push -u origin main                    # upload; -u remembers origin/main
```
Refresh the GitHub page – your files are there.

> Make sure `.gitignore` contains `node_modules/` (and optionally `reports/`) so they are not uploaded.

## 6. Make changes locally and push
```powershell
git status                                 # list modified files
git diff                                   # review changes
git add .                                  # stage changes (or: git add path\to\file)
git commit -m "Describe what you changed"  # commit
git push                                   # upload to GitHub
```

## 7. Changes made on GitHub – pull them down
1. On GitHub, open a file → pencil icon (Edit) → **Commit changes**.
2. Locally, fetch and merge them:
   ```powershell
   git pull                                # same as git fetch + git merge
   git log --oneline -5                    # confirm the new commit
   ```
If you have local uncommitted changes, commit them first (step 6) and then pull.

## 8. Clone the project on another machine
```powershell
git clone https://github.com/<your-username>/AnnaPlaywrightProj2.git
cd AnnaPlaywrightProj2
npm install
```

## 9. Handling conflicts
If `git pull` reports a conflict:
1. Open the file and look for `<<<<<<<`, `=======`, `>>>>>>>` markers; keep the correct content and delete the markers.
2. ```powershell
   git add <file>
   git commit -m "Resolve merge conflict"
   git push
   ```

## 10. Quick reference
| Command | Purpose |
|---|---|
| `git status` | Show changed files |
| `git add .` | Stage everything |
| `git commit -m "msg"` | Commit staged changes |
| `git push` | Send commits to GitHub |
| `git pull` | Get commits from GitHub |
| `git log --oneline` | Show history |
| `git branch new-branch` / `git checkout new-branch` | Create / switch branch |
| `git remote -v` | Show linked remote |

## Common errors
- **"remote origin already exists"** → `git remote set-url origin <url>`
- **"rejected – fetch first"** → run `git pull` and then `git push`
- **Authentication failed** → use browser login or a PAT, not your account password




#####

create a new repository on the command line
echo "# AnnaPlaywrightProj2" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/ANREMS/AnnaPlaywrightProj2.git
git push -u origin main
…or push an existing repository from the command line
git remote add origin https://github.com/ANREMS/AnnaPlaywrightProj2.git
git branch -M main
git push -u origin main

https://github.com/ANREMS/AnnaPlaywrightProj2.git