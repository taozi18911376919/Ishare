module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  rules: {
    'arrow-parens': ['error', 'as-needed'],
    'import/no-unresolved': 0,
    'import/no-cycle': 'off',
    'max-len': ['error', { code: 140 }],
    'function-paren-newline': ['error', 'consistent'],
    'class-methods-use-this': 'off',
    'no-nested-ternary': 'off',
    'no-confusing-arrow': 'off',
    'react/forbid-prop-types': 'error',
    'no-underscore-dangle': 'off',
    'no-param-reassign': ['error', { props: false }],
    'react/require-default-props': 'off',
    'jsx-quotes': ['error', 'prefer-single'],
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/no-absolute-path': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/anchor-is-valid': ['error', {
      components: ['Link'],
      specialLink: ['hrefLeft', 'hrefRight'],
      aspects: ['invalidHref'],
    }],
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/label-has-for': 'off',
    'react/no-did-update-set-state': 'off',
    'react/destructuring-assignment': [
      'off',
      'always',
      {
        ignoreClassFields: true,
      },
    ],
    'global-require': 0,
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
};
