import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  // Ignoriere build-Ordner
  { ignores: ['dist'] },

  // NODE: Lint für config files erlauben (Node.js Umgebung)
  {
    files: [
      'tailwind.config.js',
      'postcss.config.js',
      'vite.config.js',
      '*.cjs',
      '*.mjs',
    ],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'script',
      globals: globals.node, // <--- Hier werden node-globals (module, require, etc.) gesetzt!
    },
    rules: {
      // Optional: nur sehr grobe Regeln hier erlauben, falls du willst
    },
  },

  // React und Frontend-JS (wie gehabt)
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
]
