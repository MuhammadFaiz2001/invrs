const Auth = require('../components/Auth.js');
 const Actions = require('../components/Actions.js');
 const { EquityNav } = require('../components/equities/EquityNav.js');
 //const { Charts } = require('../components/Charts.js');
 const { Snapshot } = require('../components/Snapshot.js');
 const { FinancialNav } = require('../components/equities/FinancialNav.js');
 const { EquitySearch } = require('../components/EquitiesSearch.js');
 const { TableNav } = require('../components/equities/TableNav.js');
 const { CompareChart } = require('../components/equities/CompareChart.js');
 
 
 
 const name = "Test: Equities Compare";
 const summary = "Test Summary";
 const runTests = async function (driver) {
     await Auth.login(driver);
     //Overview
     await Actions.searchForStockBySymbol('aapl', driver);
     await EquityNav.clickCompare(driver);
     await CompareChart.checkChart(driver);
     await FinancialNav.clickGrossMarginCompare(driver);
     await FinancialNav.switchToQuarterly(driver);
     await CompareChart.checkChart(driver);
     await FinancialNav.switchToAnnual(driver);
     await CompareChart.checkChart(driver);
     driver.executeScript("window.scrollBy(0,1000)");
     await EquitySearch.searchAndClickItem(driver, 'sam');
     await TableNav.clickOnStocks(driver);
     await CompareChart.checkChart(driver);
     await CompareChart.ExistInLegend(driver, 'SAM');
     await FinancialNav.switchToQuarterly(driver);
     await CompareChart.checkChart(driver);
     await CompareChart.ExistInLegend(driver, 'SAM');
     await FinancialNav.switchToAnnual(driver);
     await CompareChart.checkChart(driver);
     await CompareChart.ExistInLegend(driver, 'SAM');
     await TableNav.removeCompany(driver);
     await Snapshot.takeSnapshot(driver);
     await Snapshot.closeSnapshotDialog(driver);
 }
 
 module.exports = {
     name , runTests
};