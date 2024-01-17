const { By, until } = require('selenium-webdriver');
const assert = require('assert');
const Auth = require('../components/Auth.js');
const Navigation = require('../components/Navigation.js');
const Actions = require('../components/Actions.js');
const { EquityNav } = require('../components/equities/EquityNav.js');
const { ELEMENT_WAIT_MS, logger } = require('../../conf/base.conf.js');

const name = "Test: Equities Overview";
const summary = "Test Summary";
const runTests = async function (driver) {
    await Auth.login(driver);
    //Overview
    await Actions.searchForStockBySymbol('aapl', driver);

    await EquityNav.clickOverview(driver);

    await confirmCanSeeChart(driver);

    await confirmCanSeeAnalystRating(driver);

    await confirmCanSeeDescription(driver);

    await confirmCanSeeOverview(driver);

    await confirmCanSeeEps(driver);

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
   
}

module.exports = {
    name , runTests, summary
};
/**
 * Confirms the chart is visible 
 * 
 * @param {the webdriver} driver 
 */
const confirmCanSeeChart = async function(driver){
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

const confirmCanSeeOverview = async function (driver) {

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

const confirmCanSeeEps = async function (driver) {

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