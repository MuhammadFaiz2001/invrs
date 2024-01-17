const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../../conf/base.conf');

const MediaHelper = {

  addMedia: async function (driver, mediaUrl) {

    // Find insert media dialog
    await driver.wait(until.elementLocated(By.className('ck ck-media-form ck-responsive-form')), ELEMENT_WAIT_MS);
    const addMediaDialog = await driver.findElement(By.className('ck ck-media-form ck-responsive-form'));

    // Find input and enter media URL
    const mediaInput = await addMediaDialog.findElement(By.css('input'));
    await mediaInput.sendKeys(mediaUrl);

    // Click save button
    const saveBtn = await addMediaDialog.findElement(By.className('ck-button-save'));
    await saveBtn.click();

    // Wait for media to be added
    await driver.wait(until.elementLocated(By.className('ck-media__wrapper')), ELEMENT_WAIT_MS);

    await driver.sleep(500);

    logger.debug('Added media from URL: ' + mediaUrl);

  }

}

module.exports = { MediaHelper };