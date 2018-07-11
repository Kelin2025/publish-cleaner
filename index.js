#!/usr/bin/env node

var fs = require("fs")
var os = require("os")
var tmp = require("tmp")
var fse = require("fs-extra")
var path = require("path")
var childProcess = require("child_process")

var cleanupPkg = require("./cleanup-pkg")
var cleanupFiles = require("./cleanup-files")
;(function() {
  // Create temp dir
  var tmpObj = tmp.dirSync({
    mode: 0777,
    prefix: "npm-publish",
    unsafeCleanup: true
  })

  // Read folder
  var files = fs.readdirSync("./")

  // Copy all files
  var copies = cleanupFiles(files)
    .filter(file => file !== "package.json")
    .map(function(file) {
      return fse.copy(file, path.join(tmpObj.name, file))
    })

  // Add clean package.json
  var dirtyPkg = JSON.parse(fs.readFileSync("./package.json").toString())
  var cleanPkg = cleanupPkg(dirtyPkg)

  copies.push(
    fse.writeFile(
      path.join(tmpObj.name, "package.json"),
      JSON.stringify(cleanPkg)
    )
  )

  Promise.all(copies).then(function() {
    // TODO: fix publish

    var isWindows = os.type().indexOf("Windows") !== -1

    var script = isWindows ? "npm.cmd" : "npm"

    var publish = childProcess.spawn(script, ["publish"], {
      stdio: "inherit",
      workingDirectory: tmpObj.name
    })
  })
})()
