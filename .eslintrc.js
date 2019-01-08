module.exports = {
  "env": {
    "es6": true,
    "node": true,
    "browser": true
    },
  "parser": "babel-eslint",
  "parserOptions": {
    "sourceType": "module"
  },    
    
  "settings": {
    "import/resolver": {
      "node": {
        "paths": ["src"]
      }
    }
  }

};