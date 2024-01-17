/**
 * Tests searching for a stock and fund and ensuring the main components shows up for both
 * For Stocks:
 * - the overview chart
 * - the quote header
 * - the Analyst Ratings Chart
 * - the Description
 * - the Overview stats
 * - the EPS History Chart
 * - the Events
 * - the feed.
 * 
 * For Funds:
 * - the overview chart
 * - the quote header
 * - the Allocation component
 * - the Investement Objective
 * - the Overview stats
 * - the Relative Performance chart
 */
const { By, until } = require('selenium-webdriver');
const assert = require('assert');
const Auth = require('../components/Auth.js');
const Navigation = require('../components/Navigation.js');
const { ELEMENT_WAIT_MS, logger } = require('../../conf/base.conf.js');
const { SearchBar } = require('../components/SearchBar.js');

const name = 'Test: Login and search stocks and funds';
const summary = "Test Summary";
const runTests = async function (driver) {

  await Auth.login(driver);

  await confirmCanSeeFeed(driver);

  await SearchBar.searchForEquities(driver, 'aapl');

  await SearchBar.clickFirstMatchingItem(driver);

  await confirmCanSeeOverviewChart(driver);

  await confirmCanSeeAnalystRating(driver);

  await confirmCanSeeDescription(driver);

  await confirmCanSeeOverviewStats(driver);

  await confirmCanSeeEPSHistoryChart(driver);

  if (await isStockFeedButtonActive(driver)) {

    await Navigation.goToStockEvents(driver);

    await confirmCanSeeStockEvents(driver);

    await Navigation.goToStockFeed(driver);

    await confirmCanSeeStockFeed(driver);
  } else {

    await Navigation.goToStockFeed(driver);

    await confirmCanSeeStockFeed(driver);

    await Navigation.goToStockEvents(driver);

    await confirmCanSeeStockEvents(driver);
  }

  await Navigation.goHome(driver);

  await SearchBar.searchForFunds(driver, 'qqq');

  await SearchBar.clickFirstMatchingItem(driver);

  await confirmCanSeeOverviewChart(driver);

  await confirmCanSeeFundAllocation(driver);

  await confirmCanSeeFundInvestmentObjective(driver);

  await confirmCanSeeFundOverviewStats(driver);

  await confirmCanSeeFundPerfChart(driver);

  await confirmCanSeeFundFeed(driver);

};

module.exports = {
  name, runTests
};

/**
 * Confirms the status editor bar is visible.
 * 
 * @param {the webdriver} driver 
 */
// const confirmCanSeeStatusEditorBar = async function (driver) {

//   await driver.wait(until.elementLocated(By.id('statusFormContainer')), ELEMENT_WAIT_MS)
//   logger.debug('confirmed status editor bar visible')
// }

/**
 * Confirms the feed is visible with at least one post.
 * 
 * @param {the webdriver} driver 
 */
const confirmCanSeeFeed = async function (driver) {
  await driver.wait(until.elementLocated(By.css('.activity-block')), ELEMENT_WAIT_MS);

  const atLeastOnePost = await driver.findElement(By.css('.activity-block'));
  assert(atLeastOnePost != null);
  logger.debug('Confirmed feed visible');
};

const confirmCanSeeOverviewChart = async function (driver) {

  await driver.wait(until.elementLocated(By.css('.qmod-simplechart')), ELEMENT_WAIT_MS);
  logger.debug('Confirmed Overview chart visible');
};

const confirmCanSeeAnalystRating = async function (driver) {

  await driver.wait(until.elementLocated(By.css('.arChart')), ELEMENT_WAIT_MS);
  logger.debug('Confirmed Analyst Rating visible');
};

const confirmCanSeeDescription = async function (driver) {

  await driver.wait(until.elementLocated(By.css('.company-overview')), ELEMENT_WAIT_MS);
  const descSection = await driver.findElement(By.css('.company-overview'));
  const desc = await descSection.findElement(By.id('base_text'));
  const txt = await desc.getText();
  assert(txt != null && txt != '');
  logger.debug('Confirmed Description visible');
};

const confirmCanSeeOverviewStats = async function (driver) {

  await driver.wait(until.elementLocated(By.css('.company-overview-stats')), ELEMENT_WAIT_MS);
  const statsSection = await driver.findElement(By.css('.company-overview-stats'));
  const rows = await statsSection.findElements(By.css('tr'));
  const marketCapRow = rows[0];
  const rowCells = await marketCapRow.findElements(By.css('p'));
  const label = await rowCells[0].getText();
  const value = await rowCells[1].getText();
  assert(label == 'Market Cap:');
  assert(value != null && value != '');


  logger.debug('Confirmed Overview Stats visible');
};

const confirmCanSeeEPSHistoryChart = async function (driver) {

  await driver.wait(until.elementLocated(By.css('.ehChart')), ELEMENT_WAIT_MS);
  logger.debug('Confirmed EPS History Chart visible');
};

const isStockFeedButtonActive = async function (driver) {

  const buttonsDiv = await driver.findElement(By.css('.feed-header-menu'));
  const buttons = await buttonsDiv.findElements(By.css('.p-button'));

  for (let btn of buttons) {
    const buttonText = await btn.getText();

    if (buttonText == 'Feed') {
      const feedButtonClass = await btn.getAttribute('class');

      if (feedButtonClass.includes('active')) {
        logger.debug('Stock Feed Button is active');
        return true;
      } else {
        logger.debug('Stock Feed Button is not active');
        return false;
      }
    }
  }
  return false;
};

const confirmCanSeeStockEvents = async function (driver) {

  await driver.wait(until.elementLocated(By.css('.qmod-corpevents')), ELEMENT_WAIT_MS);
  logger.debug('Confirmed Events visible');
};

const confirmCanSeeStockFeed = async function (driver) {

  await driver.wait(until.elementLocated(By.css('.activity-block')), ELEMENT_WAIT_MS);
  logger.debug('Confirmed Stock Feed visible');
};

const confirmCanSeeFundAllocation = async function (driver) {

  await driver.wait(until.elementLocated(By.css('.qmod-funds-overview')), ELEMENT_WAIT_MS);
  logger.debug('Confirmed Fund Allocation visible');
};

const confirmCanSeeFundInvestmentObjective = async function (driver) {

  await driver.wait(until.elementLocated(By.css('.qmod-fund-strat')), ELEMENT_WAIT_MS);
  logger.debug('Confirmed Fund Investment Objective visible');
};

const confirmCanSeeFundOverviewStats = async function (driver) {

  await driver.wait(until.elementLocated(By.id('fund-overview-fund-stats')), ELEMENT_WAIT_MS);
  logger.debug('Confirmed Fund Overview Stats visible');
};

const confirmCanSeeFundPerfChart = async function (driver) {

  await driver.wait(until.elementLocated(By.css('.fundperformance-chart')), ELEMENT_WAIT_MS);
  logger.debug('Confirmed Fund Perf Chart visible');
};

const confirmCanSeeFundFeed = async function (driver) {

  await driver.wait(until.elementLocated(By.css('.activity-block')), ELEMENT_WAIT_MS);
  logger.debug('Confirmed Fund Feed visible');
};