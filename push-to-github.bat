@echo off
cd /d "%~dp0"

echo === SanCity Frontend - Git Push ===

if not exist .git (
    echo Initializing git...
    git init
    git branch -M main
)

git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo Adding remote origin...
    git remote add origin https://github.com/Suhas-l6361/san-city.git
) else (
    git remote set-url origin https://github.com/Suhas-l6361/san-city.git
)

echo Excluding large video files (GitHub 100MB limit)...
git rm --cached -r --ignore-unmatch videos\*.mp4 2>nul

git add -A
git status

git diff --cached --quiet
if errorlevel 1 (
    git commit -m "Initial commit: SanCity frontend"
) else (
    echo Nothing new to commit.
)

echo Pushing to GitHub...
git push -u origin main

if errorlevel 1 (
    echo.
    echo PUSH FAILED. If auth error, run: gh auth login
    echo Or use GitHub Personal Access Token as password.
    pause
    exit /b 1
)

echo.
echo SUCCESS! Code pushed to https://github.com/Suhas-l6361/san-city
pause
