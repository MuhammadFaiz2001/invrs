const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../../conf/base.conf');
const { SnapshotDialog } = require('../SnapshotDialog.js');

const HoldingsSnapshot = {
    openSnapshotDialog: async function(driver){
        waitUntilVisible(driver);
        const tabDiv = await driver.findElement(By.className('tab-div'));
        const tabContentDiv = await tabDiv.findElement(By.xpath('./div[3]'))
        const moreOptionsBtnIcon = await tabContentDiv.findElement(By.className('pi pi-ellipsis-h p-button-icon'));
        await moreOptionsBtnIcon.click();

        // Click take snapshot button icon
        await driver.wait(until.elementsLocated(By.className('p-menuitem-icon pi pi-camera')), ELEMENT_WAIT_MS);
        const takeSnapshotBtnIcon = await driver.findElement(By.className('p-menuitem-icon pi pi-camera'));
        await driver.wait(until.elementIsVisible(takeSnapshotBtnIcon), ELEMENT_WAIT_MS);
        await takeSnapshotBtnIcon.click();

        logger.debug('Opened snapshot dialog');
        const dialog = await findSnapshotDialog(driver);
        await SnapshotDialog.waitUntilSnapshotIsReady(driver, dialog);
        logger.debug('Image is Shown');

    },

}
module.exports = { HoldingsSnapshot };

const waitUntilVisible = async function (driver) {
    // const chartDiv = await driver.wait(until.elementLocated(By.className('qmod-per-chart-canvas')), ELEMENT_WAIT_MS);

    // const legendsDiv = await chartDiv.wait(until.elementLocated(chartDiv.findElement(By.className('highcharts-container'))), ELEMENT_WAIT_MS);
    // await driver.wait(until.elementIsVisible(chartDiv.findElement(By.className('highcharts-container'))), ELEMENT_WAIT_MS);

    // const legends = await driver.wait(until.elementLocated(legendsDiv.findElement(By.className('highcharts-legend'))), ELEMENT_WAIT_MS);
    // await driver.wait(until.elementIsEnabled(legendsDiv.findElement(By.className('highcharts-legend'))),ELEMENT_WAIT_MS);

    // const legendApple = await legends.wait(until.elementLocated(By.xpath('./svg/g[6]/g/g/g[1]')));
    await driver.wait(until.elementLocated(By.className('highcharts-legend-item highcharts-bubble-series')), ELEMENT_WAIT_MS);
    await driver.wait(until.elementIsVisible(driver.findElement(By.className('highcharts-legend-item highcharts-bubble-series'))), ELEMENT_WAIT_MS);


    logger.debug('Charts are shown');
};

const findSnapshotDialog = async function (driver) {
    await driver.wait(until.elementsLocated(By.className('snapshot-dialog')), ELEMENT_WAIT_MS);
    return await driver.findElement(By.className('snapshot-dialog'));
}