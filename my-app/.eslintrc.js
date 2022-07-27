module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jest/globals": true 
    },
    "extends": [ 
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react", "jest"
    ],
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        "eqeqeq": "error",
        "no-trailing-spaces": "error",
        "arrow-spacing": [
            "error", { "before": true, "after": true }
        ],
        "no-console": 0,
        "react/prop-types": 0,
        "react/react-in-jsx-scope": "off",

        "no-use-before-define": ["error", { "variables": false }],
        "no-dupe-else-if": 0,
        "no-import-asign": 0,
        "no-loss-of-precision": 0,
        "no-nonoctal-decimal-escape": 0,
        "no-useless-backreference": 0,
        "no-useless-catch": 0,
        "no-import-assign": 0,
        "no-setter-return": 0,
        "no-unsafe-optional-chaining": 0
    },
    "settings": {
      "react": {
        "version": "detect"
      }
    }
  }