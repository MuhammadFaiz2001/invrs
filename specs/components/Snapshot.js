const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../conf/base.conf');

const Snapshot = {

  takeSnapshot: async function (driver) {
    // Wait until high charts group is visible
    await driver.wait(until.elementsLocated(By.className('highcharts-series-group')), ELEMENT_WAIT_MS);
    const highChartsGroup = await driver.findElement(By.className('highcharts-series-group'));
    await driver.wait(until.elementIsVisible(highChartsGroup), ELEMENT_WAIT_MS);

    // Click options button icon
    await driver.wait(until.elementsLocated(By.className('pi pi-ellipsis-h p-button-icon')), ELEMENT_WAIT_MS);
    const moreOptionsBtnIcon = await driver.findElement(By.className('pi pi-ellipsis-h p-button-icon'));
    await driver.wait(until.elementIsVisible(moreOptionsBtnIcon), ELEMENT_WAIT_MS);
    await moreOptionsBtnIcon.click();

    // Click take snapshot button icon
    await driver.wait(until.elementsLocated(By.className('p-menuitem-icon pi pi-camera')), ELEMENT_WAIT_MS);
    const takeSnapshotBtnIcon = await driver.findElement(By.className('p-menuitem-icon pi pi-camera'));
    await driver.wait(until.elementIsVisible(takeSnapshotBtnIcon), ELEMENT_WAIT_MS);
    await takeSnapshotBtnIcon.click();

    const snapshotDialog = await findSnapshotDialog(driver);

    // Find image and wait until it is visible
    const image = await snapshotDialog.findElement(By.css('.p-image-preview-container img'));
    await driver.wait(until.elementIsVisible(image), ELEMENT_WAIT_MS);

    logger.debug('Took snapshot');
  },

  clickCopyToClipboard: async function (driver) {
    const snapshotDialog = await findSnapshotDialog(driver);

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

  closeSnapshotDialog: async function (driver) {
    const snapshotDialog = await findSnapshotDialog(driver);

    // Click close dialog button icon
    const closeBtnIcon = await snapshotDialog.findElement(By.className('p-dialog-header-close-icon pi-times'));
    await closeBtnIcon.click();

    logger.debug('Closed snapshot dialog');
  }

}

module.exports = { Snapshot };

const findSnapshotDialog = async function (driver) {
  await driver.wait(until.elementsLocated(By.className('snapshot-dialog')), ELEMENT_WAIT_MS);
  return await driver.findElement(By.className('snapshot-dialog'));
}
