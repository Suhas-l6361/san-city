@echo off
cd /d "%~dp0"

echo === Fix large files and push to GitHub ===
echo.

echo Removing video files from git tracking (files stay on your PC)...
git rm --cached -r --ignore-unmatch videos\*.mp4 2>nul
git rm --cached -r --ignore-unmatch *.mp4 2>nul

git add .gitignore
git add -A

echo.
echo Updating commit without large videos...
git commit --amend -m "Initial commit: SanCity frontend"

echo.
echo Pushing to GitHub...
git push -u origin main

if errorlevel 1 (
    echo.
    echo PUSH FAILED. Copy the error above and share it for help.
    pause
    exit /b 1
)

echo.
echo SUCCESS! Code pushed to https://github.com/Suhas-l6361/san-city
echo Note: videos/*.mp4 are kept locally only — not on GitHub.
pause
