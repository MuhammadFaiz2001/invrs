const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../../conf/base.conf');
const TestHelper = require('../TestHelper');
const assert = require('assert');

const GroupsLibrary = {

  selectMyGroups: async function (driver) {
    await selectHeaderOptionIfItIsNotSelected(driver, 1);

    logger.debug('Selected "My Groups" header option');
  },

  selectDiscover: async function (driver) {
    await selectHeaderOptionIfItIsNotSelected(driver, 2);

    logger.debug('Selected "Discover" header option');
  },

  searchAndSelectGroupByName: async function (driver, name) {

    const groupItem = await findGroupByName(driver, name);
    await groupItem.click();

    await TestHelper.safeWaitUntilStalenessOf(driver, groupItem);

    logger.debug('Selected group by name: ' + name);

  },

  selectFirstGroupIfExists: async function (driver) {

    await driver.wait(until.elementLocated(By.className('group-sub-feed-container')), ELEMENT_WAIT_MS);
    const groupSubFeedContainer = await driver.findElement(By.className('group-sub-feed-container'));

    try {

      await driver.wait(until.elementLocated(By.css('.p-scrollpanel-content div.list-item-container:nth-child(1)')), ELEMENT_WAIT_MS);
      const firstItem = await groupSubFeedContainer.findElement(By.css('.p-scrollpanel-content div.list-item-container:nth-child(1)'));
      await firstItem.click();

      logger.debug('Selected first group');

      return true;

    } catch (e) {
      logger.debug('Group is not found');

      return false;
    }

  },

  searchAndJoinPublicGroupByName: async function (driver, name) {

    const groupItem = await findGroupByName(driver, name);
    const joinGroupBtn = await groupItem.findElement(By.className('join-group-button'));
    await joinGroupBtn.click();

    await TestHelper.safeWaitUntilStalenessOf(driver, groupItem);

    logger.debug('Joined group by name: ' + name);

  },

  searchAndSendRequestToJoinPrivateGroupByName: async function (driver, name) {

    const groupItem = await findGroupByName(driver, name);
    const joinGroupBtn = await groupItem.findElement(By.className('join-group-button'));
    await joinGroupBtn.click();

    await driver.wait(until.elementTextIs(joinGroupBtn, 'Pending'), ELEMENT_WAIT_MS);

    await waitUntilToastAboutPrivateGroupRequestIsNotShown(driver);

    logger.debug('Sent request to join private group by name: ' + name);

  },

  confirmGroupLibraryIsShowingGroupByName: async function (driver, name) {

    const groupItem = await findGroupByName(driver, name);

    assert(groupItem);

    logger.debug('Confirmed group library is showing group by name: ' + name);

  },

  confirmGroupLibraryIsNotShowingGroupByName: async function (driver, name) {

    const groupItem = await findGroupByName(driver, name);

    assert(!groupItem);

    logger.debug('Confirmed group library is not showing group by name: ' + name);

  },

}

module.exports = { GroupsLibrary };

const selectHeaderOptionIfItIsNotSelected = async function (driver, option) {

  await driver.sleep(500);
  await driver.wait(until.elementLocated(By.css(`.my-groups-discover-header-menu div.navigation button.p-button:nth-child(${option})`)), ELEMENT_WAIT_MS);
  const myGroupsHeaderBtn = await driver.findElement(By.css(`.my-groups-discover-header-menu div.navigation button.p-button:nth-child(${option})`));
  const myGroupsHeaderBtnClass = await myGroupsHeaderBtn.getAttribute("class");
  if (!myGroupsHeaderBtnClass.includes('active')) {
    await myGroupsHeaderBtn.click();
  }

}

const findGroupByName = async function (driver, name) {

  await driver.wait(until.elementLocated(By.className('group-sub-feed-container')), ELEMENT_WAIT_MS);
  const groupSubFeedContainer = await driver.findElement(By.className('group-sub-feed-container'));

  await driver.sleep(3000);
  const searchInput = await groupSubFeedContainer.findElement(By.className('p-inputtext p-component search-bar search-bar'));
  await searchInput.sendKeys(name);
  await driver.sleep(1000);

  try {

    await driver.wait(until.elementLocated(By.css('.p-scrollpanel-content div.list-item-container:nth-child(1)')), ELEMENT_WAIT_MS);
    const firstItem = await groupSubFeedContainer.findElement(By.css('.p-scrollpanel-content div.list-item-container:nth-child(1)'));
    const firstItemHeader = await firstItem.findElement(By.className('header-text'));
    const firstItemHeaderText = await firstItemHeader.getText();

    assert(firstItemHeaderText == name);

    return firstItem;

  } catch (e) {
    return undefined;
  }

}

const waitUntilToastAboutPrivateGroupRequestIsNotShown = async function (driver) {

  await driver.wait(until.elementLocated(
    By.className('p-toast p-component p-toast-top-right p-ripple-disabled')), ELEMENT_WAIT_MS);
  const toast = await driver.findElement(
    By.className('p-toast p-component p-toast-top-right p-ripple-disabled'));
  await driver.wait(until.elementTextIs(toast, ''), ELEMENT_WAIT_MS);

}