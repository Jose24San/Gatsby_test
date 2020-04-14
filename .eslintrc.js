module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'plugin:react/recommended',
    'standard'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    'react',
    'react-hooks',
  ],
  rules: {
    'arrow-parens': [ 'error', 'as-needed' ],
    'space-in-parens': [ 'error', 'always' ],
    'array-bracket-spacing': [ 'error', 'always' ],
    'computed-property-spacing': [ 'error', 'always' ],
    'spaced-comment': 'off',
    'no-trailing-spaces': 'off',
    'object-curly-newline': 'off',
    'key-spacing': 'off',
    'max-len': 'off',
    'padded-blocks': 'off',
    'brace-style': 'off',
    'new-cap': 'off',
    'template-curly-spacing': 'off',
    'arrow-body-style': 'off',
    'jsx-quotes': 'off',
    'quote-props': 'off',
    'no-floating-decimal': 'off',
    'comma-dangle': 'off',
    'function-paren-newline': 'off',
    'no-multiple-empty-lines': 'off',
    'no-confusing-arrow': 'off',
    'no-param-reassign': 'off',
    'no-return-assign': 'off',
    'array-callback-return': 'off',
    'consistent-return': 'off',
    'keyword-spacing': 'off',
    'no-shadow': 'warn',
    'lines-between-class-members': 'off',
    'no-underscore-dangle': 'off',


    // react specific rules
    'react/jsx-filename-extension': [ 1, { 'extensions': [ '.js', '.jsx', '.tsx' ] } ],
    'react/jsx-curly-spacing': [ 2, { 'when': 'always' } ],
    'react/jsx-one-expression-per-line': 'off',
    'react/forbid-prop-types': 'off',
    'react/require-default-props': 'off',
    'react/destructuring-assignment': 'off',
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",

    // import
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'import/no-cycle': 'off',
  }
}
