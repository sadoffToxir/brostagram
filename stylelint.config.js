module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-standard-vue/scss'
  ],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    'scss/comment-no-empty': null,
    'scss/at-import-no-partial-leading-underscore': null,
    'string-quotes': 'single',
    'font-family-name-quotes': null,
    'function-url-quotes': null,
    'scss/dollar-variable-empty-line-before': null,
    'selector-class-pattern': null,
    'value-keyword-case': null
  }
}
