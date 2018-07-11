var pkgJsonFields = require("./lists/package-json-fields")

module.exports = function cleanupPkg(json) {
  var cleanPkg = {}

  for (var k in json) {
    if (pkgJsonFields.indexOf(k) !== -1) {
      cleanPkg[k] = json[k]
    }
  }

  return cleanPkg
}
