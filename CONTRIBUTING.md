<!-- folder-hopper/CONTRIBUTING.md -->

# Contributing to Folder Hopper

Thank you for your interest in contributing to Folder Hopper! This document provides guidelines and instructions for contributing.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [VS Code](https://code.visualstudio.com/)
- [Git](https://git-scm.com/)

### Setup

1. Fork the repository on GitHub
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/folder-hopper.git
   cd folder-hopper
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a branch for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

### Development Workflow

1. **Compile the extension:**
   ```bash
   npm run compile
   ```

2. **Watch mode (auto-recompile on changes):**
   ```bash
   npm run watch
   ```

3. **Run the extension in debug mode:**
   - Open the project in VS Code
   - Press `F5` to launch the Extension Development Host
   - Test your changes in the new VS Code window

4. **Lint your code:**
   ```bash
   npm run lint
   ```

## Code Style

- We use TypeScript with strict mode enabled
- Code is formatted with Prettier (config in `.prettierrc`)
- ESLint is configured for TypeScript (config in `eslint.config.mjs`)
- Use meaningful variable and function names
- Add JSDoc comments for public functions

## Submitting Changes

### Pull Request Process

1. Ensure your code compiles without errors
2. Run the linter and fix any issues
3. Test your changes thoroughly
4. Update documentation if needed
5. Update `CHANGELOG.md` with your changes
6. Submit a pull request with a clear description

### Commit Messages

Follow conventional commit format:

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
```
feat(commands): add keyboard shortcut support
fix(scanner): handle permission errors gracefully
docs(readme): update installation instructions
```

## Reporting Issues

### Bug Reports

When reporting bugs, please include:

- VS Code version
- Extension version
- Operating system
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

### Feature Requests

When requesting features, please include:

- Clear description of the feature
- Use case / problem it solves
- Any implementation ideas (optional)

## Questions?

Feel free to open an issue for any questions about contributing.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
