module.exports = config => {
  config.set({
    frameworks: ['mocha', 'chai', 'sinon'],
    basePath: '../',
    files: [
      { pattern: 'HTMLPanda.js', type: 'module', included: false },
      { pattern: 'test/**/*.js', type: 'module' },
    ],
  })
}