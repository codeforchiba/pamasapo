module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended'
  ],
  rules: {
    'max-len': [2, { code: 120 }],
    'vue/max-attributes-per-line': [
      2,
      {
        'singleline': 20,
        'multiline': {
          'allowFirstLine': true,
          'max': 3
        }
      }
    ]
  }
}
