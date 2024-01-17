const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../../conf/base.conf');
const assert = require('assert');
const TestHelper = require('../TestHelper');

const FeedHeader = {

  openStatusEditorDialog: async function (driver, doNotWaitForActivityContent) {

    if (doNotWaitForActivityContent) {
      await driver.wait(until.elementLocated(By.className('make-post-button')), ELEMENT_WAIT_MS);
    } else {
      await driver.wait(until.elementLocated(By.className('activity-content')), ELEMENT_WAIT_MS);
    }

    const feedHeader = await findFeedHeader(driver);

    // Click make a post button
    await driver.wait(until.elementLocated(By.className('make-post-button')), ELEMENT_WAIT_MS);
    const makePostButton = await feedHeader.findElement(By.className('make-post-button'));
    await driver.wait(until.elementIsVisible(makePostButton), ELEMENT_WAIT_MS);
    await makePostButton.click();

    // Check is dialog opened
    await driver.wait(until.elementLocated(By.id('statusEditorDialog')), ELEMENT_WAIT_MS);

    logger.debug('Opened status editor dialog');

  },

  openNoteEditorPage: async function (driver) {

    await driver.wait(until.elementLocated(By.className('activity-content')), ELEMENT_WAIT_MS);

    const feedHeader = await findFeedHeader(driver);

    // Click create a note button
    await driver.wait(until.elementLocated(By.className('create-note-button')), ELEMENT_WAIT_MS);
    const createNoteButton = await feedHeader.findElement(By.className('create-note-button'));
    await driver.wait(until.elementIsVisible(createNoteButton), ELEMENT_WAIT_MS);
    try {
      await createNoteButton.click();
      await driver.wait(until.stalenessOf(createNoteButton), ELEMENT_WAIT_MS);
    } catch (e) {
      // Do nothing
    }

    // Check is page opened
    try {
      await driver.wait(until.elementLocated(By.id('noteFormContainer')), ELEMENT_WAIT_MS);
    } catch (e) {
      await driver.sleep(500);

      await driver.wait(until.elementLocated(By.id('noteFormContainer')), ELEMENT_WAIT_MS);
    }

    logger.debug('Opened note editor page');

  },

  selectYourFeed: async function (driver) {

    await driver.wait(until.elementLocated(By.className('p-dropdown latestFeed')), ELEMENT_WAIT_MS);
    const dropdownFeedOptions = await driver.findElement(By.className('p-dropdown latestFeed'));
    await dropdownFeedOptions.click();

    const dropdownItems = await driver.findElements(By.className('p-dropdown-item'));
    assert(dropdownItems.length >= 2);
    await dropdownItems[1].click();
    
    await TestHelper.safeWaitUntilStalenessOf(driver, dropdownItems[1]);

    logger.debug('Selected your feed option');

  },

};

module.exports = { FeedHeader };

const locFeedHeader = By.id('statusFormContainer');

const findFeedHeader = async function (driver) {
  await driver.wait(until.elementLocated(locFeedHeader), ELEMENT_WAIT_MS);
  return await driver.findElement(locFeedHeader);
};