const Auth = require('../components/Auth.js');
const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../conf/base.conf');
const { ScreenerNavandCheck } = require('../components/screener/ScreenerNavandCheck');
const { ScreenerPreset } = require('../components/screener/ScreenerPreset');
const { ScreenerCustom } = require('../components/screener/ScreenerCustom');


const name = "Test: Screener Custom";
const summary = "The following Test checks if users can create custom screeners";
const runTests = async function (driver) {
    await Auth.login(driver);
    await ScreenerNavandCheck.clickOnSandbox(driver);
    await ScreenerNavandCheck.waitUntilVisible(driver);
    await ScreenerPreset.clickOnPresetScreens(driver);
    await ScreenerCustom.createCustomScreener(driver);
    await ScreenerPreset.clickOnPresetScreens(driver);
    await ScreenerCustom.useSavedScreener(driver);
}

module.exports = {
    name , runTests, summary
};

