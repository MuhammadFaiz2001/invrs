const { Builder } = require('selenium-webdriver');
const { LT_USERNAME, LT_ACCESS_KEY } = require('../../conf/base.conf');
const confFile = process.argv[3] || '../../conf/single.conf.js';
const capabilities = require(confFile).capabilities;
const { until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../conf/base.conf');

module.exports = {

  getCapabilities: function () {
    return capabilities;
  },

  buildDriver: function (caps) {

    const driver = new Builder()
      .usingServer(
        'http://' +
        LT_USERNAME +
        ':' +
        LT_ACCESS_KEY +
        '@hub.lambdatest.com/wd/hub'
      ).withCapabilities(caps)
      .build();

    driver.manage().window().maximize();

    return driver;
  },

  safeWaitUntilStalenessOf: async function (driver, webElement) {
    try {
      await driver.wait(until.stalenessOf(webElement), ELEMENT_WAIT_MS);
    } catch (e) {
      // Do nothing
    }
  },

};