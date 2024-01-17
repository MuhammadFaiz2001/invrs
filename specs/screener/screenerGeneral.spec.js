const Auth = require('../components/Auth.js');
const Actions = require('../components/Actions.js');
const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../conf/base.conf');
const { ScreenerNavandCheck } = require('../components/screener/ScreenerNavandCheck');



const name = "Test: Screener General";
const summary = "The following test Checks if the screener Page works";
const runTests = async function (driver) {
    await Auth.login(driver);
    await ScreenerNavandCheck.clickOnSandbox(driver);
    await ScreenerNavandCheck.waitUntilVisible(driver);

}

module.exports = {
    name , runTests, summary
};

