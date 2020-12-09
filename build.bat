echo off

echo "Building jsdoc..."

echo | jsdoc poonya.js > ./logs/build.log

echo "Removing old docs...";

rmdir /q /s "docs"

echo "Move docs for docs folder..."

ren "out" "docs"

set /p commit="Commit changes? (Y/N) "

if /i "%commit%" == "Y" (
    set /p message="Commit message: "

    git commit "%message%"

    git push
)

pause