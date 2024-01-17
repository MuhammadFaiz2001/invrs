const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../../conf/base.conf');
const assert = require('assert');
const TestHelper = require('../TestHelper');

const LikedByDialog = {

  confirmOnePersonLiked: async function (driver) {

    await driver.wait(until.elementLocated(By.className('user-list-item-container')), ELEMENT_WAIT_MS);
    const items = await driver.findElements(By.className('user-list-item-container'));

    assert(items.length == 1);

    logger.debug('Confirmed one person liked');

  },

  closeLikedByDialog: async function (driver) {

    const closeBtn = await driver.findElement(By.className('p-dialog-header-close-icon'));
    await closeBtn.click();

    await TestHelper.safeWaitUntilStalenessOf(driver, closeBtn);

    logger.debug('Closed liked by dialog');

  }

}

module.exports = { LikedByDialog };