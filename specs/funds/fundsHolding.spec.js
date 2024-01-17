const Auth = require('../components/Auth.js');
const Actions = require('../components/Actions.js');
const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../conf/base.conf');
const { FundNav } = require('../components/funds/FundNav.js');
const { HoldingsNav } = require('../components/funds/HoldingsNav.js');
const { Snapshot } = require('../components/Snapshot.js')
const { HoldingsSnapshot } = require('../components/funds/HoldingsSnapshot.js');
const { HoldingsChartCheck } = require('../components/funds/HoldingsChartCheck.js');


const name = "Test: Funds Holding";
const summary = "The following test checks the holding page for funds and makes sure the charts are working";
const runTests = async function (driver) {
    await Auth.login(driver);
    await Actions.searchForFundBySymbol('qqq', driver);
    await FundNav.clickHolding(driver);
    await HoldingsChartCheck.checkChart(driver);
    await HoldingsChartCheck.checkTop10Holding(driver);
    await HoldingsNav.switchToReturns(driver);
    await HoldingsChartCheck.checkChartReturn(driver);
    await HoldingsChartCheck.checkTop10Return(driver);
    await HoldingsNav.switchToHoldings(driver);
    await HoldingsChartCheck.checkChart(driver);
    await HoldingsChartCheck.checkTop10Return(driver);
    await HoldingsNav.switchToHoldings(driver);
    await HoldingsSnapshot.openSnapshotDialog(driver);

}

module.exports = {
    name , runTests, summary
};

