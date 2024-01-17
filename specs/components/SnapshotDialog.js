const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../conf/base.conf');

const SnapshotDialog = {

  waitUntilSnapshotIsReady: async function (driver, snapshotDialog) {
    // Find image and wait until it is visible
    const image = await snapshotDialog.findElement(By.css('.p-image-preview-container img'));
    await driver.wait(until.elementIsVisible(image), ELEMENT_WAIT_MS);
  },

  clickCopyToClipboard: async function (driver) {
    const snapshotDialog = await findSnapshotDialog(driver);

    await this.waitUntilSnapshotIsReady(driver, snapshotDialog);

    // Click copy button icon
    const copyBtnIcon = await snapshotDialog.findElement(By.className('pi-copy'));
    await copyBtnIcon.click();

    // Click file button icon in dropdown menu
    await driver.wait(until.elementsLocated(By.className('p-menu filter-dropdown')), ELEMENT_WAIT_MS);
    const menuDropdown = await driver.findElement(By.className('p-menu filter-dropdown'));
    const fileBtnIcon = await menuDropdown.findElement(By.className('pi-file'));
    await fileBtnIcon.click();

    logger.debug('Copied snapshot URL to clipboard');
  },

  clickClose: async function (driver) {
    const snapshotDialog = await findSnapshotDialog(driver);

    // Click close dialog button icon
    const closeBtnIcon = await snapshotDialog.findElement(By.className('p-dialog-header-close-icon pi-times'));
    await closeBtnIcon.click();

    logger.debug('Closed snapshot dialog');
  }

}

module.exports = { SnapshotDialog };

const findSnapshotDialog = async function (driver) {
  await driver.wait(until.elementsLocated(By.className('snapshot-dialog')), ELEMENT_WAIT_MS);
  return await driver.findElement(By.className('snapshot-dialog'));
}