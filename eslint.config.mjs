// folder-hopper/eslint.config.mjs

import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';

export default [
    eslint.configs.recommended,
    {
        files: ['src/**/*.ts'],
        languageOptions: {
            parser: tsparser,
            parserOptions: {
                ecmaVersion: 2021,
                sourceType: 'module',
            },
            globals: {
                console: 'readonly',
            },
        },
        plugins: {
            '@typescript-eslint': tseslint,
        },
        rules: {
            // TypeScript specific rules
            '@typescript-eslint/naming-convention': [
                'warn',
                {
                    selector: 'import',
                    format: ['camelCase', 'PascalCase'],
                },
            ],
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_',
                },
            ],
            
            // General rules
            'curly': ['warn', 'all'],
            'eqeqeq': ['warn', 'always'],
            'no-throw-literal': 'warn',
            'semi': ['warn', 'always'],
            'no-unused-vars': 'off', // Use TypeScript version instead
        },
    },
    {
        ignores: ['out/**', 'dist/**', 'node_modules/**', '**/*.d.ts'],
    },
];
