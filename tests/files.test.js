var cleanupFiles = require("../cleanup-files")

describe("Files ignore", () => {
  it("Returns array of filenames except ignored", () => {
    const folder = [
      "package.json",
      ".eslintrc",
      ".babelrc",
      "src",
      "index.js",
      "index.test.js"
    ]
    expect(cleanupFiles(folder)).toEqual(["package.json", "src", "index.js"])
  })
})
