const { getCapabilities, buildDriver } = require('./components/TestHelper.js');
const { describe, beforeEach, afterEach, it } = require('mocha');
const { BASE_URL, TARGET_ENV } = require('../conf/base.conf.js');
const singleTestPath = process.argv[4].replace('specs', '.');
const singleTest = require(singleTestPath);
const {  logger } = require('../conf/base.conf');


// Loops through all the configured browsers
getCapabilities().forEach(function (caps) {

  describe('Single test, ' + TARGET_ENV + ' environment, browser ' + caps.browserName, function () {
    let driver;
    this.timeout(0);

    beforeEach(async function () {
      caps.name = this.currentTest.title;
      driver = buildDriver(caps);
      await driver.get(BASE_URL);
      logger.log(caps.name);
      logger.log(singleTest.summary);
    });

    it(singleTest.name + ' using ' + caps.browserName, async function () {
      await singleTest.runTests(driver, caps.browserName);
    });

    afterEach(async function () {
      if (this.currentTest.isPassed()) {
        await driver.executeScript('lambda-status=passed');
      } else {
        await driver.executeScript('lambda-status=failed');
      }
      driver.quit();
    });

  });

});