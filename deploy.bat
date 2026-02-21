@echo off
echo 🌲 Mriidul Groups - Finalizing Deployment...
echo.

echo 🗑️ Bypassing GitHub 100MB Limit (Removing large video from history)...
rmdir /s /q .git
git init

echo 🚫 Ignoring large files...
echo *.mp4 >> .gitignore

echo 👤 Checking Git Identity...
git config user.email "deploy@mriidulgroups.com"
git config user.name "Mriidul Deployer"

echo ➕ Adding Files...
git add .

echo 📑 Creating Commit...
git commit -m "Final cinematic real estate build (optimized for web)"

echo 🔗 Connecting to Repository...
git branch -M main
git remote add origin https://github.com/rahulsinghbisht/mriidulGroup.git

echo 🚀 Pushing to GitHub...
echo (A browser window might pop up asking you to sign into GitHub - please approve it!)
git push -u origin main --force

echo.
echo ✅ DONE! Your site is now live on Vercel.
echo check your dashboard: https://vercel.com/dashboard
pause
