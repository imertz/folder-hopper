<!-- folder-hopper/README.md -->

# Folder Hopper

[![CI](https://github.com/YOUR_USERNAME/folder-hopper/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR_USERNAME/folder-hopper/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![VS Code Marketplace](https://img.shields.io/visual-studio-marketplace/v/YOUR_PUBLISHER.folder-hopper?label=VS%20Code%20Marketplace)](https://marketplace.visualstudio.com/items?itemName=YOUR_PUBLISHER.folder-hopper)

Quickly navigate to any folder in your workspace using a searchable list. Open folders in the current window or a new window.

## Features

### 🔍 Quick Folder Navigation

Search and navigate to any folder in your workspace with a fast, fuzzy-searchable list.

![Go to Folder Demo](images/demo.gif)

### 📂 Multiple Access Methods

- **Command Palette**: `Ctrl+Shift+P` → "Folder Hopper: Go to Folder"
- **Context Menu**: Right-click any folder in the Explorer
- **Keyboard Shortcut**: Bind your own shortcut to the commands

### 🪟 Open in New Window

Open any folder in a new VS Code window without leaving your current workspace.

### ⬆️ Parent Folder Navigation

Quickly jump to the parent directory of your current workspace.

## Commands

| Command | Description |
|---------|-------------|
| `Folder Hopper: Go to Folder` | Open folder picker, navigate in current window |
| `Folder Hopper: Go to Folder (New Window)` | Open folder picker, navigate in new window |
| `Folder Hopper: Open Parent Folder` | Open parent of workspace root |
| `Folder Hopper: Open Parent Folder (New Window)` | Open parent in new window |

## Configuration

| Setting | Default | Description |
|---------|---------|-------------|
| `folderHopper.maxDepth` | `5` | Maximum depth to scan for subfolders (1-20) |
| `folderHopper.excludePatterns` | See below | Folder names to exclude from the list |
| `folderHopper.showHiddenFolders` | `false` | Show hidden folders (starting with `.`) |
| `folderHopper.sortAlphabetically` | `true` | Sort folders alphabetically |

### Default Exclude Patterns

```json
[
  "node_modules",
  ".git",
  ".svn",
  ".hg",
  "__pycache__",
  ".venv",
  "venv",
  ".idea",
  ".vscode",
  "dist",
  "build",
  "out",
  "target",
  ".next",
  ".nuxt"
]
```

## Installation

### From VS Code Marketplace

1. Open VS Code
2. Go to Extensions (`Ctrl+Shift+X`)
3. Search for "Folder Hopper"
4. Click Install

### From VSIX File

```bash
code --install-extension folder-hopper-1.0.0.vsix
```

### From Source

```bash
git clone https://github.com/YOUR_USERNAME/folder-hopper.git
cd folder-hopper
npm install
npm run compile
# Press F5 in VS Code to run the extension in debug mode
```

## Building

```bash
# Install dependencies
npm install

# Compile
npm run compile

# Watch mode (for development)
npm run watch

# Package as VSIX
npx vsce package
```

## Keyboard Shortcuts

You can bind keyboard shortcuts to any command. Add these to your `keybindings.json`:

```json
[
  {
    "key": "ctrl+shift+g",
    "command": "folderHopper.goToFolder"
  },
  {
    "key": "ctrl+shift+alt+g",
    "command": "folderHopper.goToFolderNewWindow"
  }
]
```

## Why Folder Hopper?

- **Fast**: Async folder scanning with cancellation support
- **Configurable**: Exclude patterns, depth limits, hidden folders
- **Lightweight**: Minimal dependencies, small bundle size
- **Secure**: No network access, no telemetry, fully open source
- **Open Source**: MIT licensed, fully transparent code

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Security

For security concerns, please see [SECURITY.md](SECURITY.md).

## License

MIT License - see [LICENSE](LICENSE) for details.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for release history.
