const Auth = require('../components/Auth.js');
const Actions = require('../components/Actions.js');
const { EquityNav } = require('../components/equities/EquityNav.js');
//const { Charts } = require('../components/Charts.js')
const { Snapshot } = require('../components/Snapshot.js')
const { FinancialNav } = require('../components/equities/FinancialNav.js')
const { FinancialChart } = require('../components/equities/FinancialChart.js')
const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../conf/base.conf');



const name = "Test: Equities Financial";
const summary = "Test Summary";
const runTests = async function (driver) {
    await Auth.login(driver);
    //Overview
    await Actions.searchForStockBySymbol('aapl', driver);

    await EquityNav.clickFinancials(driver);
    //check if yearly financial are charted
    await FinancialChart.checkChart(driver);
    //driver.executeScript("window.scrollBy(0,1000)");
    await waitUntilVisible(driver);
    await FinancialNav.switchToQuarterly(driver);
    

    //check if quarterly financial are charted
    await FinancialChart.checkChart(driver);

    await FinancialNav.clickMetrics(driver);
    await waitUntilVisible(driver);
    await FinancialNav.clickGrossMargin(driver);
    await FinancialNav.switchToAnnual(driver);
    await FinancialChart.checkGrossMargin(driver);
    await waitUntilVisible(driver);
    //click gross margin Income

    //check if click worked

   //switch to quarterly
   await waitUntilVisible(driver);
   await FinancialNav.switchToQuarterly(driver);

   //check chart
    await FinancialChart.checkGrossMargin(driver);
   //Take snapshot
   await Snapshot.takeSnapshot(driver);

   //Annotate lines


}

module.exports = {
    name , runTests, summary
};
const waitUntilVisible = async function (driver) {
    await driver.wait(until.elementLocated(By.xpath('//*[@id="finDataTable"]/div[1]/table/tbody/tr[10]/td[1]/div'), ELEMENT_WAIT_MS));
};