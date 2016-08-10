module.exports = {
  base: false,
  exec: function (rollupOptions, writeOptions) {
    Object.assign(writeOptions, {
      format: 'umd'
    }) 
  }
}
