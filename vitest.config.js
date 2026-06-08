const { defineConfig } = require('vitest/config');

/** @type {import('vitest/config').UserConfig} */
module.exports = defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: ['tests/**/*.test.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      all: true,
      include: ['lib/**/*.js'],
      exclude: ['tests/**', 'node_modules/**']
    }
  }
});
