const Auth = require('../components/Auth.js');
const Actions = require('../components/Actions.js');
const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../conf/base.conf');
const { ScreenerNavandCheck } = require('../components/screener/ScreenerNavandCheck');
const { ScreenerPreset } = require('../components/screener/ScreenerPreset');



const name = "Test: Screener Preset";
const summary = "The following test tries to use preset screens";
const runTests = async function (driver) {
    await Auth.login(driver);
    await ScreenerNavandCheck.clickOnSandbox(driver);
    await ScreenerNavandCheck.waitUntilVisible(driver);
    await ScreenerPreset.clickOnPresetScreens(driver);
}

module.exports = {
    name , runTests, summary
};

