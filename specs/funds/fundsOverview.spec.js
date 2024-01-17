const Auth = require('../components/Auth.js');
const Actions = require('../components/Actions.js');
const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../conf/base.conf');
const { FundNav } = require('../components/funds/FundNav.js');
const { OverviewChartCheck } = require('../components/funds/OverviewChartCheck.js');




const name = "Test: Funds Overview";
const summary = "Test Summary";
const runTests = async function (driver) {
    await Auth.login(driver);
    await Actions.searchForFundBySymbol('qqq', driver);
    await FundNav.clickOverview(driver);
    await OverviewChartCheck.confirmCanSeeOverviewChart(driver);
    await OverviewChartCheck.confirmCanSeeFundInvestmentObjective(driver);
    await OverviewChartCheck.confirmCanSeeFundOverviewStats(driver);
    await OverviewChartCheck.confirmCanSeeFundPerfChart(driver);
    await OverviewChartCheck.confirmCanSeeFundFeed(driver);
    await OverviewChartCheck.confirmCanSeeAllocations(driver);
}

module.exports = {
    name , runTests, summary
};

