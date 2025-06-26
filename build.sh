#!/bin/bash
echo "Installing dependencies..."
npm install

echo "Installing emoji-picker-react..."
npm install emoji-picker-react --save

echo "Installing missing babel plugin..."
npm install --save-dev @babel/plugin-proposal-private-property-in-object

echo "Updating browserslist..."
npx update-browserslist-db@latest

echo "Installing and configuring Tailwind CSS..."
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
npx tailwindcss init -p

echo "Building production bundle..."
GENERATE_SOURCEMAP=false npm run build
