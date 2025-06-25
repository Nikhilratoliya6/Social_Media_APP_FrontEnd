#!/bin/bash
# Update browserslist database
npx update-browserslist-db@latest

# Install missing babel plugin
npm install --save-dev @babel/plugin-proposal-private-property-in-object
