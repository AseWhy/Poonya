@echo off

echo "Building jsdoc..."

echo | jsdoc poonya.js

echo "Removing old docs...";

rmdir /q /s "docs"

echo "Move docs for docs folder..."

ren "out" "docs"

node build/build-default.js

pause