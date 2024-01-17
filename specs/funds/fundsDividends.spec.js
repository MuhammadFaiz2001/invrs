const Auth = require('../components/Auth.js');
 const Actions = require('../components/Actions.js');
 const { FundNav } = require('../components/funds/FundNav.js');
 const { By, until } = require('selenium-webdriver');
 var assert = require('assert');
 const { ELEMENT_WAIT_MS, logger } = require('../../conf/base.conf');
 
 
 
 const name = "Test: Funds Dividends";
 const summary = "The following test checks the dividends section for funds";
 const runTests = async function (driver) {
     await Auth.login(driver);
     await Actions.searchForFundBySymbol('qqq', driver);
     await FundNav.clickDividends(driver);
     await checkDividendsHistory(driver);
     await checkUpcomingDivdends(driver);
}
 
module.exports = {
    name , runTests, summary
};

const checkDividendsHistory = async function (driver) {
    const dividendHistoryDiv = await driver.wait(until.elementLocated(By.className('qmod-table qmod-dividends-table qmod-dividends-history-table')), ELEMENT_WAIT_MS);
    assert(dividendHistoryDiv != null);
    logger.debug('Dividends History Exists');
};

const checkUpcomingDivdends = async function (driver) {
     await driver.wait(until.elementLocated(By.className("qmod-panel qmod-dividends-no-data")), ELEMENT_WAIT_MS);
    logger.debug('Upcoming Dividends Are shown');
};