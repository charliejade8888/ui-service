#!/usr/bin/env node

var Executor = require('./test_util').Executor;
var executor = new Executor();

testSuccessfulFeatures();

executor.execute();

function testSuccessfulFeatures() {
  executor.addCommandlineTest('./node_modules/protractor/bin/protractor cucumber_configuration/cucumberConf.js')
    .alwaysEnableStdio()
    .expectExitCode(0);
}

