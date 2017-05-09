var env = require('./environment.js');

// A small suite to make sure the cucumber framework works.
exports.config = {
  seleniumAddress: env.seleniumAddress,

  framework: 'custom',
  frameworkPath: './index.js',

  // Spec patterns are relative to this directory.
  specs: [
    '../src/cucumber/*.feature'
  ],

  capabilities: env.capabilities,

  baseUrl: env.baseUrl,

    allScriptsTimeout: 50000, //This is the overall Timeout
    getPageTimeout: 50000, //This is the Page timeout

  cucumberOpts: {
 	keepAlive: false,
    require: ['../src/cucumber/**/stepDefinitions_mockserver.js', '../src/cucumber/**/hooks.js'],
    tags: '@dev',
    format: undefined,
    profile: false,
    'no-source': true
  }
};
