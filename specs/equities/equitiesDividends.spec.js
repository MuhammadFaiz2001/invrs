const Auth = require('../components/Auth.js');
 const Actions = require('../components/Actions.js');
 const { EquityNav } = require('../components/equities/EquityNav.js');
 const { By, until } = require('selenium-webdriver');
 var assert = require('assert');
 const { ELEMENT_WAIT_MS, logger } = require('../../conf/base.conf');
 
 
 
 const name = "Test: Equities Dividends";
 const summary = "Test Summary";
 const runTests = async function (driver) {
     await Auth.login(driver);
     //Overview
     await Actions.searchForStockBySymbol('aapl', driver);
     await EquityNav.clickDividends(driver);
     await checkDividendsHistory(driver);
     await checkUpcomingDivdends(driver);
}
 
module.exports = {
    name , runTests, summary
};

const checkDividendsHistory = async function (driver) {
    const dividendHistoryDiv = await driver.wait(until.elementLocated(By.className('qmod-table qmod-dividends-table qmod-dividends-history-table')), ELEMENT_WAIT_MS);
    assert(dividendHistoryDiv != null);
    logger.debug('Dividends History Exists')
};

const checkUpcomingDivdends = async function (driver) {
    try{
     await driver.wait(until.elementLocated(By.className("qmod-panel qmod-dividends-no-data")), ELEMENT_WAIT_MS);
    }
    catch(e){
        await driver.wait(until.elementLocated(By.className("qmod-dividends-upcoming-table")), ELEMENT_WAIT_MS);
    }
    logger.debug('Upcoming Dividends Are shown');
};