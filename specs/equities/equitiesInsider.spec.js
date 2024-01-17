const Auth = require('../components/Auth.js');
const Actions = require('../components/Actions.js');
const { EquityNav } = require('../components/equities/EquityNav.js');
//const { Charts } = require('../components/Charts.js')
const { SnapshotDialog } = require('../components/SnapshotDialog.js')
const { InsidersNavandCheck } = require('../components/equities/InsidersNavAndCheck.js')
const { By, until } = require('selenium-webdriver');



const name = "Test: Equities Insider";
const summary = "Test Summary";
const runTests = async function (driver) {
    await Auth.login(driver);
    //Overview
    await Actions.searchForStockBySymbol('aapl', driver);

    await EquityNav.clickInsiders(driver);
    //check summary and transactions
    await driver.wait(until.elementLocated(By.className('qmod-section-insidersummary card')));
    await driver.wait(until.elementLocated(By.id('DataTables_Table_0_wrapper')));
    
    //CheckTransactions
    await InsidersNavandCheck.checkTransactions(driver, "name", "Luca Maestri");
    await InsidersNavandCheck.clickTransactionType(driver, "None");
    await InsidersNavandCheck.checkTransactions(driver, "type", "None");
    await InsidersNavandCheck.checkTransactions(driver, "date", 2022);
    await InsidersNavandCheck.clickTransactionType(driver, "Sell");

    driver.executeScript("window.scrollBy(0,1000)");

    //can page transactions
    await InsidersNavandCheck.goToNextPage(driver);
    await InsidersNavandCheck.goToPreviousPage(driver);
    await InsidersNavandCheck.goToPage(driver,4);

    //filter transactions
    await InsidersNavandCheck.clickInsiderName(driver, "Chris Kondo");
    await InsidersNavandCheck.checkTransactions(driver, "name", "Chris Kondo");

    await InsidersNavandCheck.clickTransactionType(driver, "Disposition");
    await InsidersNavandCheck.checkTransactions(driver, "type", "Disposition");

    await InsidersNavandCheck.clickTransactionYear(driver, 2017);
    await InsidersNavandCheck.checkTransactions(driver, "date", 2017);
    
    //can page transactions
    await InsidersNavandCheck.goToNextPage(driver);
    await InsidersNavandCheck.goToPage(driver,4);
    await InsidersNavandCheck.goToPreviousPage(driver);

    //can take snapshot
    await InsidersNavandCheck.openSnapshotDialog(driver);
    
    await SnapshotDialog.clickClose(driver);
}

module.exports = {
    name , runTests
};