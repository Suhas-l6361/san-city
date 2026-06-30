@echo off
cd /d "%~dp0"
echo.
echo === San City — check images before Vercel deploy ===
echo.

where node >nul 2>&1
if errorlevel 1 (
  echo Node.js not found. Install Node, or manually confirm Frontend\images\ has all files.
  pause
  exit /b 1
)

node scripts/check-assets.mjs
set ERR=%ERRORLEVEL%

echo.
echo Deploy tip: upload THIS Frontend folder to Vercel Drop.
echo   index.html must be at the root — NOT inside another folder.
echo.

if %ERR% neq 0 (
  echo Fix missing files above, then run this check again.
  pause
  exit /b %ERR%
)

pause
