module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    "no-console": "off",
    quotes: "off",
    "class-methods-use-this": "off",
    "import/first": "off",
    strict: "off",
    "no-param-reassign": "off",
    camelcase: "off",
    "object-curly-newline": "off",
  },
};
