module.exports = {
    'env': {
        'browser': true,
        'commonjs': true,
        'es2021': true,
        'jest': true,
        'node': true,
    },
    'extends': 'eslint:recommended',
    'parserOptions': {
        'ecmaVersion': 'latest'
    },
    'rules': {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'windows'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ],
        'arrow-spacing': [
            'error', { 'before': true, 'after': true }
        ],
        'no-trailing-spaces': 'error',
        'eqeqeq': 'error',
        'no-console': 0
    }
}
