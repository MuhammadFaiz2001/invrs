const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../conf/base.conf');

module.exports = {

  /**
   * Searches for a stock by symbol
   * 
   * @param {the symbol} symbol 
   * @param {the webdriver} driver 
   */
  searchForStockBySymbol: async function (symbol, driver) {
    logger.debug('running search for ' + symbol);

    // wait till the search bar is loaded
    await driver.wait(until.elementLocated(By.id('secQuickSearch')), ELEMENT_WAIT_MS);
    await driver.wait(until.elementLocated(By.css('.search-container')), ELEMENT_WAIT_MS);

    const searchContainer = await driver.findElement(By.css('.search-container'));


    // select equity as the search type    
    const searchTypeDropDown = await searchContainer.findElement(By.css('button'));
    await searchTypeDropDown.click();
    await driver.wait(until.elementLocated(By.css('.p-menuitem:nth-child(3) .p-menuitem-text')), ELEMENT_WAIT_MS);
    await driver.findElement(By.css('.p-menuitem:nth-child(3) .p-menuitem-text')).click();

    // click into and enter the symbol into the search bar
    const searchInput = await searchContainer.findElement(By.id('secQuickSearch'));
    await searchInput.click();
    await searchInput.sendKeys(symbol);

    // select the first matching item and click it
    await driver.wait(until.elementLocated(By.css('.p-autocomplete-item')), ELEMENT_WAIT_MS);
    await driver.findElement(By.css('.p-autocomplete-item')).click();

    logger.debug('Clicked on first search result for ' + symbol);

  },

  /**
   * Searches for a fund by symbol.
   * 
   * @param {the symbol to search for} symbol 
   * @param {the web driver} driver 
   */
  searchForFundBySymbol: async function (symbol, driver) {
    logger.debug('running search for ' + symbol);

    // wait till the search bar is loaded
    await driver.wait(until.elementLocated(By.id('secQuickSearch')), ELEMENT_WAIT_MS);
    await driver.wait(until.elementLocated(By.css('.search-container')), ELEMENT_WAIT_MS);

    const searchContainer = await driver.findElement(By.css('.search-container'));


    // select equity as the search type    
    const searchTypeDropDown = await searchContainer.findElement(By.css('button'));
    await searchTypeDropDown.click();
    await driver.wait(until.elementLocated(By.css('.p-menuitem:nth-child(4) .p-menuitem-text')), ELEMENT_WAIT_MS);
    await driver.findElement(By.css('.p-menuitem:nth-child(4) .p-menuitem-text')).click();

    // click into and enter the symbol into the search bar
    const searchInput = await searchContainer.findElement(By.id('secQuickSearch'));
    await searchInput.click();
    await searchInput.sendKeys(symbol);

    // select the first matching item and click it
    await driver.wait(until.elementLocated(By.css('.p-autocomplete-item')), ELEMENT_WAIT_MS);
    await driver.findElement(By.css('.p-autocomplete-item')).click();

    logger.debug('Clicked on first search result for ' + symbol);

  },

};