var cleanupPkg = require("../cleanup-pkg")

var postCssPkg = require("./postcss-package")

describe("package.json fix", () => {
  it("Returns package.json with only allowed fields", () => {
    const folder = [
      "package.json",
      ".eslintrc",
      ".babelrc",
      "src",
      "index.js",
      "index.test.js"
    ]
    expect(cleanupPkg(postCssPkg)).toEqual(cleanPkg)
  })
})

var cleanPkg = {
  name: "postcss",
  version: "6.0.23",
  description: "Tool for transforming styles with JS plugins",
  engines: {
    node: ">=4.0.0"
  },
  keywords: [
    "css",
    "postcss",
    "rework",
    "preprocessor",
    "parser",
    "source map",
    "transform",
    "manipulation",
    "transpiler"
  ],
  author: "Andrey Sitnik <andrey@sitnik.ru>",
  license: "MIT",
  homepage: "https://postcss.org/",
  repository: "postcss/postcss",
  dependencies: {
    chalk: "^2.4.1",
    "source-map": "^0.6.1",
    "supports-color": "^5.4.0"
  },
  browser: {
    "supports-color": false,
    chalk: false,
    fs: false
  },
  scripts: {
    "lint-staged": "lint-staged",
    spell: "yarn docs && yaspeller-ci api/*.html *.md docs/{**/,}*.md",
    docs: "jsdoc -c .jsdocrc lib/*.es6",
    lint: "eslint-ci *.js lib/*.es6 test/*.js",
    test: "gulp && jest && yarn lint && yarn spell && size-limit"
  },
  main: "lib/postcss",
  types: "lib/postcss.d.ts"
}
