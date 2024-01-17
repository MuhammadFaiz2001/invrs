const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../../conf/base.conf');
const { SnapshotDialog } = require('../SnapshotDialog');



const Snapshot = {
    takeSnapshot: async function(driver){
        const moreOptionsBtn = await driver.findElement(By.className('more-options'));
        await moreOptionsBtn.click();

        const snapBtn = await driver.wait(until.elementLocated(By.className('p-menuitem-text')));
        await driver.wait(until.elementIsVisible(snapBtn));
        await snapBtn.click();

        const dialog = await findSnapshotDialog(driver);
        await SnapshotDialog.waitUntilSnapshotIsReady(driver, dialog);
        await SnapshotDialog.clickClose(driver);
        
        logger.debug('Took Snapshot');

    }
}   

module.exports = { Snapshot };

const findSnapshotDialog = async function (driver) {
    await driver.wait(until.elementsLocated(By.className('snapshot-dialog')), ELEMENT_WAIT_MS);
    return await driver.findElement(By.className('snapshot-dialog'));
}