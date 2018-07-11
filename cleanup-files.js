var ignoredFiles = require("./lists/ignore-files")

function isFileIgnored(file) {
  for (var i in ignoredFiles) {
    if (typeof ignoredFiles[i] === "string" && file === ignoredFiles[i]) {
      return true
    }

    if (ignoredFiles[i] instanceof RegExp && ignoredFiles[i].test(file)) {
      return true
    }
  }
  return false
}

module.exports = function cleanupFiles(files) {
  return files.filter(function(file) {
    return !isFileIgnored(file) && file !== "package.json"
  })
}
