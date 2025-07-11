// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    'no-console': ['error', { allow: ['warn', 'error'] }],

    // Enforces no unused variables, with exceptions for emit, props, and variables starting with _
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'none',
        caughtErrors: 'none',
        varsIgnorePattern: '(emit|props|_*)',
      },
    ],

    '@typescript-eslint/no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
      },
    ],

    // Enforces string templates over string concatenation
    'prefer-template': 'error',

    // Enforces consistent order of blocks in Vue components (template, script, style)
    'vue/block-order': 'error',
    'vue/attribute-hyphenation': 'error',
    'vue/v-on-event-hyphenation': 'error',
    'vue/attributes-order': 'error',
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: {
          max: 3,
        },
        multiline: {
          max: 1,
        },
      },
    ],

    // Enforces newlines between content in multiline elements, except for pre and textarea
    'vue/multiline-html-element-content-newline': [
      'error',
      {
        allowEmptyLines: true,
        ignores: ['pre', 'textarea'],
      },
    ],

    // Enforces newlines between content in single-line elements, with exceptions for empty elements
    'vue/singleline-html-element-content-newline': [
      'error',
      {
        ignoreWhenNoAttributes: true,
        ignoreWhenEmpty: true,
      },
    ],
  },
})
