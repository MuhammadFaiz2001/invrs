const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../conf/base.conf');
const Navigation = require('./Navigation');

const SearchBar = {

  navigate: async function (driver) {
    await Navigation.goHome(driver);

    return waitUntilVisible(driver);
  },

  searchForUsers: async function (driver, searchText) {
    await searchFor(driver, searchText, 2);
  },

  searchForEquities: async function (driver, searchText) {
    await searchFor(driver, searchText, 3);
  },

  searchForFunds: async function (driver, searchText) {
    await searchFor(driver, searchText, 4);
  },

  searchForIndices: async function (driver, searchText) {
    await searchFor(driver, searchText, 5);
  },

  searchForMarketAndUsers: async function (driver, searchText) {
    await searchFor(driver, searchText, 6);
  },

  clickFirstMatchingItem: async function (driver) {
    // find the first match item and click it
    await driver.wait(until.elementLocated(By.css('.p-autocomplete-item')), ELEMENT_WAIT_MS);
    const autocompleteItem = await driver.findElement(By.css('.p-autocomplete-item'));
    const searchMatchText = await autocompleteItem.findElement(By.css('.search-match-highlight')).getText();
    await autocompleteItem.click();

    logger.debug('Clicked the first match item of search result: ' + searchMatchText);
  }

};

module.exports = { SearchBar };

const waitUntilVisible = async function (driver) {
  await driver.wait(until.elementLocated(By.id('secQuickSearch')), ELEMENT_WAIT_MS);
};

const searchFor = async function (driver, searchText, filterOptionNumber) {

  await waitUntilVisible(driver);

  const searchContainer = await driver.findElement(By.css('.search-container'));

  // select search filter option    
  await driver.wait(until.elementLocated(By.className('pi pi-angle-down p-button-icon')), ELEMENT_WAIT_MS);
  const filterOptionDropDown = await searchContainer.findElement(By.css('button'));
  await filterOptionDropDown.click();
  await driver.wait(until.elementLocated(
    By.css(`.p-menuitem:nth-child(${filterOptionNumber}) .p-menuitem-text`)), ELEMENT_WAIT_MS);
  const filterOption = await driver.findElement(By.css(`.p-menuitem:nth-child(${filterOptionNumber}) .p-menuitem-text`));
  const filterOptionText = await filterOption.getText();
  await filterOption.click();

  // enter the text into the search bar
  const searchInput = await searchContainer.findElement(By.id('secQuickSearch'));
  await searchInput.sendKeys(searchText);

  logger.debug(`Searched for ${searchText}, filter option: ${filterOptionText}`);
};
