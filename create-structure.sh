#!/bin/bash
# folder-hopper/create-structure.sh
#
# This script creates the directory structure for the Folder Hopper VS Code extension.
# Run this script to create empty directories and files (without content).
#
# Usage: chmod +x create-structure.sh && ./create-structure.sh

set -e

echo "Creating Folder Hopper extension structure..."

# Create directories
mkdir -p folder-hopper/.vscode
mkdir -p folder-hopper/.github/workflows
mkdir -p folder-hopper/.github/ISSUE_TEMPLATE
mkdir -p folder-hopper/src
mkdir -p folder-hopper/images
mkdir -p folder-hopper/dist

# Create main files (empty)
touch folder-hopper/package.json
touch folder-hopper/tsconfig.json
touch folder-hopper/eslint.config.mjs
touch folder-hopper/.gitignore
touch folder-hopper/.vscodeignore
touch folder-hopper/.editorconfig
touch folder-hopper/.prettierrc
touch folder-hopper/README.md
touch folder-hopper/CHANGELOG.md
touch folder-hopper/CONTRIBUTING.md
touch folder-hopper/CODE_OF_CONDUCT.md
touch folder-hopper/SECURITY.md
touch folder-hopper/LICENSE

# Source files
touch folder-hopper/src/extension.ts

# VS Code config files
touch folder-hopper/.vscode/launch.json
touch folder-hopper/.vscode/tasks.json
touch folder-hopper/.vscode/extensions.json

# GitHub files
touch folder-hopper/.github/workflows/ci.yml
touch folder-hopper/.github/workflows/release.yml
touch folder-hopper/.github/ISSUE_TEMPLATE/bug_report.md
touch folder-hopper/.github/ISSUE_TEMPLATE/feature_request.md

# Images placeholder
touch folder-hopper/images/.gitkeep

echo "✅ Directory structure created successfully!"
echo ""
echo "Structure:"
echo "folder-hopper/"
echo "├── .github/"
echo "│   ├── ISSUE_TEMPLATE/"
echo "│   │   ├── bug_report.md"
echo "│   │   └── feature_request.md"
echo "│   └── workflows/"
echo "│       ├── ci.yml"
echo "│       └── release.yml"
echo "├── .vscode/"
echo "│   ├── extensions.json"
echo "│   ├── launch.json"
echo "│   └── tasks.json"
echo "├── images/"
echo "│   └── .gitkeep"
echo "├── src/"
echo "│   └── extension.ts"
echo "├── .editorconfig"
echo "├── .gitignore"
echo "├── .prettierrc"
echo "├── .vscodeignore"
echo "├── CHANGELOG.md"
echo "├── CODE_OF_CONDUCT.md"
echo "├── CONTRIBUTING.md"
echo "├── LICENSE"
echo "├── package.json"
echo "├── README.md"
echo "├── SECURITY.md"
echo "└── tsconfig.json"
echo ""
echo "Next steps:"
echo "  1. cd folder-hopper"
echo "  2. Copy the file contents from the provided files"
echo "  3. npm install"
echo "  4. npm run compile"
echo "  5. Press F5 in VS Code to test the extension"
