console.log("Here be babel!")

module.exports = {
  "presets": [
    // modules false, because Babel will convert our modules to CommonJS before Webpack
    ["@babel/env", {"modules": false}],
    "@babel/preset-react"
  ],
  "plugins": []
}