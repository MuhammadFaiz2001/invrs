const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../../conf/base.conf');
const assert = require('assert');
const TestHelper = require('../TestHelper');

const NoteLibrary = {

  findFirstNoteItemAndCheckTitleMatch: async function (driver, title) {

    await waitUntilBodyClassIsNotPOverflowHidden(driver);

    await driver.wait(until.elementLocated(By.className('right-col')), ELEMENT_WAIT_MS);
    const noteLibrary = await driver.findElement(By.className('right-col'));

    await waitUntilToastWithTextIsNotShown(driver);

    await driver.wait(until.elementLocated(By.css('.p-datatable-tbody tr:nth-child(1)')), ELEMENT_WAIT_MS);
    const dataTableFirstItem = await noteLibrary.findElement(By.css('.p-datatable-tbody tr:nth-child(1)'));

    const itemTitle = await noteLibrary.findElement(By.className('note-title'));
    const itemTitleText = await itemTitle.getText();

    assert(itemTitleText == title);

    logger.debug('Found note in library with title: ' + itemTitleText);

    return dataTableFirstItem;

  },

  deleteNote: async function (driver, noteLibraryItem) {

    await driver.wait(until.elementLocated(By.className('delete-note-button')), ELEMENT_WAIT_MS);
    const trashBtn = await noteLibraryItem.findElement(By.className('delete-note-button'));
    await driver.wait(until.elementIsVisible(trashBtn), ELEMENT_WAIT_MS);
    await trashBtn.click();

    const confirmBtn = await driver.findElement(By.className('p-button p-component accept'));
    await driver.wait(until.elementIsVisible(confirmBtn), ELEMENT_WAIT_MS);
    await confirmBtn.click();

    await TestHelper.safeWaitUntilStalenessOf(driver, confirmBtn);

    await waitUntilBodyClassIsNotPOverflowHidden(driver);

    await waitUntilToastWithTextIsNotShown(driver);

    logger.debug('Deleted note from library');

  },

  editNote: async function (driver, noteLibraryItem) {

    const editNoteBtn = await noteLibraryItem.findElement(By.className('edit-note-button'));
    await driver.wait(until.elementIsVisible(editNoteBtn), ELEMENT_WAIT_MS);
    await editNoteBtn.click();

    await driver.wait(until.elementLocated(By.className('p-inputtext p-component p-filled')), ELEMENT_WAIT_MS);

    logger.debug('Selected note to edit from library');

  },

};

module.exports = { NoteLibrary };

const waitUntilBodyClassIsNotPOverflowHidden = async function (driver) {

  for (let i = 0; i < 50; i++) {
    await driver.wait(until.elementLocated(By.css('body')), ELEMENT_WAIT_MS);

    const body = await driver.findElement(By.css('body'));

    const bodyClass = await body.getAttribute('class');

    if (bodyClass != 'p-overflow-hidden') break;
  }

};

const waitUntilToastWithTextIsNotShown = async function (driver) {

  await driver.wait(until.elementLocated(
    By.className('p-toast p-component p-toast-center p-ripple-disabled')), ELEMENT_WAIT_MS);
  const toast = await driver.findElement(
    By.className('p-toast p-component p-toast-center p-ripple-disabled'));
  await driver.wait(until.elementTextIs(toast, ''), ELEMENT_WAIT_MS);

}