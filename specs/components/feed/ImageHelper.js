const { By, until, Key } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../../conf/base.conf');
const assert = require('assert');

const ImageHelper = {

  addImage: async function (driver, editor, imageUrl, browserName) {

    await copyToClipboard(driver, imageUrl);

    await addImageFromClipBoard(driver, editor, imageUrl, browserName);

    logger.debug(`Added image: ${imageUrl}`);

  },

  addSnapshotFromClipboard: async function (driver, editor, browserName) {

    const commonSnapshotUrlPart = 'https://test.invrs.com/share/';

    await addImageFromClipBoard(driver, editor, commonSnapshotUrlPart, browserName);

    logger.debug('Added snapshot from clipboard');

  }

}

module.exports = { ImageHelper };

const addImageFromClipBoard = async function (driver, editor, imageUrl, browserName) {

  await focusEditorAndPressArrowRight(editor);

  await pasteFromClipboard(driver, browserName);

  // Wait until image located and visible
  await driver.wait(until.elementLocated(
    By.className('image-inline ck-widget ck-widget_with-resizer ck-widget_selected')), ELEMENT_WAIT_MS);

  assert(await isImagePresentByUrl(editor, imageUrl));

}

const focusEditorAndPressArrowRight = async function (editor) {
  await editor.sendKeys('', Key.ARROW_RIGHT);
}

const pasteFromClipboard = async function (driver, browserName) {
  const key = browserName == 'Safari' ? Key.COMMAND : Key.CONTROL;

  await driver.actions().keyDown(key).sendKeys('v').perform();
  await driver.actions().keyUp(key).perform();
}

const copyToClipboard = async function (driver, text) {
  await driver.executeScript("navigator.clipboard.writeText(arguments[0]);", text);
}

const isImagePresentByUrl = async function (editor, imageUrl) {
  // Find all images inside editor
  let images = await editor.findElements(By.css('img'));

  let isImageFoundInsideEditor = false;

  for (const img of images) {
    // Get current image URL
    const imgSrc = await img.getAttribute('src');

    if (imgSrc.includes(imageUrl)) {
      isImageFoundInsideEditor = true;
      break;
    }
  }

  return isImageFoundInsideEditor;
}