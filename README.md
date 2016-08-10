# Bubbleup Rollup Build Plugin

> 0 configuration rollup builds

## Usage

```sh
npm install bubbleup-plugin-build-rollup

bubbleup build src/index.js 

# optionally provide destination

bubbleup build src/index.js -d dist/bundle.js
```

That's it!

## Plugin API

This Bubbleup plugin exposes a plugin API to further configure how rollup 
manages your builds. A plugin looks like 

```js
module.exports = {
  exec: function (rollupOptions, writeOptions) {
    // mutate rollupOptions and writeOptions
  }
}
```

**rollupOptions**

An object passed to [`rollup.rollup( options )`](https://github.com/rollup/rollup/wiki/JavaScript-API#rolluprollup-options-).

**writeOptions**

An object passed to [`bundle.write`](https://github.com/rollup/rollup/wiki/JavaScript-API#bundlewrite-options-).
