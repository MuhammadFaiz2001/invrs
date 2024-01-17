const Auth = require('../components/Auth.js');
const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../conf/base.conf');
const { ScreenerNavandCheck } = require('../components/screener/ScreenerNavandCheck');
const { ListNav } = require('../components/list/ListNav');
const { CreateAndEditList } = require('../components/list/CreateAndEditList');



const name = "Create List";
const summary = "Test Summary";
const runTests = async function (driver) {
    await Auth.login(driver);
    await ScreenerNavandCheck.clickOnSandbox(driver);
    await ScreenerNavandCheck.waitUntilVisible(driver);
    await ListNav.clickOnList(driver);
    await ListNav.waitUntilVisible(driver);
    await CreateAndEditList.createList(driver);
    await ListNav.waitUntilVisible(driver);
    await CreateAndEditList.addCompanies(driver, 'A');
    await ListNav.waitUntilVisible(driver);
    await CreateAndEditList.addCompanies(driver, 'AAPL');
    await ListNav.waitUntilVisible(driver);
    await CreateAndEditList.addCompanies(driver, 'D');
    await ListNav.waitUntilVisible(driver);
    await CreateAndEditList.addCompanies(driver, 'J');
    await ListNav.waitUntilVisible(driver);
    //driver.executeScript("window.scrollBy(0,800)");
    await CreateAndEditList.addToChart(driver, 4);
    await CreateAndEditList.waitUntilVisible(driver);
    await CreateAndEditList.removeCompanies(driver);
}

module.exports = {
    name , runTests, summary
};


