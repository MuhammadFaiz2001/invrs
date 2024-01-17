const Auth = require('../components/Auth.js');
const Actions = require('../components/Actions.js');
const { EquityNav } = require('../components/equities/EquityNav.js');
const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../conf/base.conf');



const name = "Test: Equities Notes";
const summary = "Test Summary";
const runTests = async function (driver) {
    await Auth.login(driver);
    //Overview
    await Actions.searchForStockBySymbol('aapl', driver);
    await EquityNav.clickNotes(driver);
    await checkPosts(driver);

}

module.exports = {
    name , runTests, summary
};

const checkPosts = async function (driver) {
    const rightColumn = await driver.wait(until.elementLocated(By.className('left-col p-col-12 p-md-6'), ELEMENT_WAIT_MS));
    await rightColumn.findElement(By.className('card'));
    logger.debug('Notes Located');
};