<!-- folder-hopper/SECURITY.md -->

# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in Folder Hopper, please report it responsibly:

1. **Do not** open a public GitHub issue for security vulnerabilities
2. Instead, please open a private security advisory through GitHub's Security tab
3. Or contact the maintainer directly

## What to Include

When reporting a vulnerability, please include:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

## Response Timeline

- Initial response: Within 48 hours
- Status update: Within 7 days
- Fix timeline: Depends on severity

## Security Design

Folder Hopper is designed with security in mind:

- **No network access**: The extension only reads local filesystem
- **No data collection**: No telemetry or analytics
- **Minimal permissions**: Only uses VS Code's standard file system APIs
- **Open source**: All code is publicly auditable

## Best Practices

When using this extension:

- Only install from official sources (VS Code Marketplace or GitHub releases)
- Verify the publisher name matches the official repository
- Review the changelog before updating
