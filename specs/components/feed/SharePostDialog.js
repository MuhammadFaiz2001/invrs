const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../../conf/base.conf');
const TestHelper = require('../TestHelper');

const SharePostDialog = {

  copyLinkAndCloseDialog: async function (driver) {

    await driver.wait(until.elementLocated(By.className('copy-link-button')), ELEMENT_WAIT_MS);
    const copyLinkBtn = await driver.findElement(By.className('copy-link-button'));
    await copyLinkBtn.click();

    await TestHelper.safeWaitUntilStalenessOf(driver, copyLinkBtn);

    await waitUntilToastWithTextIsNotShown(driver);

    logger.debug('Copied link and closed share post dialog');

  },

}

module.exports = { SharePostDialog };

const waitUntilToastWithTextIsNotShown = async function (driver) {

  await driver.wait(until.elementLocated(
    By.className('p-toast p-component p-toast-center p-ripple-disabled')), ELEMENT_WAIT_MS);
  const toast = await driver.findElement(
    By.className('p-toast p-component p-toast-center p-ripple-disabled'));
  await driver.wait(until.elementTextIs(toast, ''), ELEMENT_WAIT_MS);

}