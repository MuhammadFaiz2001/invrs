const Auth = require('../components/Auth.js');
const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../conf/base.conf');
const { ScreenerNavandCheck } = require('../components/screener/ScreenerNavandCheck');
const { ScreenerPreset } = require('../components/screener/ScreenerPreset');
const { ScreenerList } = require('../components/screener/ScreenerList');


const name = "Test: Screener List";
const summary = "THe following test creates a list and saves it";
const runTests = async function (driver) {
    await Auth.login(driver);
    try{
    await ScreenerNavandCheck.clickOnSandbox(driver);
    }
    catch(e){
        //nothing
    }
    await ScreenerNavandCheck.waitUntilVisible(driver);
    await ScreenerPreset.clickOnPresetScreens(driver);
    await ScreenerList.saveInList(driver);
    
}

module.exports = {
    name , runTests, summary
};

