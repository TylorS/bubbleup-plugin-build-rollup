'use strict'

const bubbleup = require('bubbleup')
const rollup = require('rollup')
const path = require('path')

const ROLLUP_PREFIX = `${bubbleup.BUILD_PREFIX}-rollup`

module.exports = {
  base: true,
  exec: function (entryFile, options, cwd) {
    const rollupOptions = {
      entry: entryFile,
      plugins: [],
      external: [],
      paths: {}
    }

    // defaults
    const destination = options.distBuild
      ? options.distBuild
      : path.join(cwd, 'dist', path.basename(path.join(cwd, entryFile)))

    const destinationName = toCamelCase(path.basename(cwd))

    const writeOptions = {
      dest: destination,
      format: 'es',
      moduleName: destinationName,
      moduleId: destinationName,
      sourceMap: true,
      sourceMapFile: path.join(destination, '.map')
    }

    // use custom plugins path if specified
    const pluginsPath = options.parent.pluginsPath
      ? path.join(cwd, options.parent.pluginsPath)
      : bubbleup.getNodeModulesPath(cwd)

    const pluginNames = bubbleup.findPluginsByPrefix(pluginsPath, ROLLUP_PREFIX)

    const plugins = bubbleup.requirePlugins(pluginsPath, pluginNames)

    plugins.forEach(function (plugin) {
      if (!bubbleup.isBasePlugin(plugin)) {
        // plugins mutate objects to get desired outcome
        plugin.exec(rollupOptions, writeOptions)
      }
    })

    rollup.rollup(rollupOptions).then(function (bundle) {
      bundle.write(writeOptions)
    })
  }
}

function toCamelCase (str) {
  // Lower cases the string
  return str.toLowerCase()
    // Replaces any - or _ characters with a space
    .replace(/[-_]+/g, ' ')
    // Removes any non alphanumeric characters
    .replace(/[^\w\s]/g, '')
    // Uppercases the first character in each group immediately following a space
    // (delimited by spaces)
    .replace(/ (.)/g, function ($1) { return $1.toUpperCase() })
    // Removes spaces
    .replace(/ /g, '')
}
