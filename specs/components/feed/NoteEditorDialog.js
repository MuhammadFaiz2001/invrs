const { By, until, Key } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../../conf/base.conf');
const assert = require('assert');
const { NoteEditor } = require('./NoteEditor');
const TestHelper = require('../TestHelper');

const NoteEditorDialog = {

  /**
   * Update note.
   * 
   * @param {WebDriver} driver
   * @param {{
   * title: 'title', 
   * text: 'text', 
   * mentions: {
   *  username:'@username', 
   *  equity:'$equity_name', 
   *  fund:'$fund_name'
   * }
   * snapshotUrl,
   * imageUrl,
   * instagramUrl,
   * tiktokUrl,
   * youtubeUrl
   * }} note
   * @param {string} browserName
   */
  updateNote: async function (driver, note, browserName) {

    assert(note.title);

    const noteEditorDialog = await findNoteEditorDialog(driver);

    await enterTitle(driver, noteEditorDialog, note.title, browserName);

    const noteContentDescription = await NoteEditor.updateNoteContent(driver, note, noteEditorDialog, browserName);

    await clickUpdateButton(driver, noteEditorDialog);

    logger.debug('Updated note with: title, '
      + noteContentDescription.toString().replace(/,/g, ', '));

  },

};

module.exports = { NoteEditorDialog };

const findNoteEditorDialog = async function (driver) {

  await driver.wait(until.elementLocated(By.className('post-details-modal')), ELEMENT_WAIT_MS);
  return await driver.findElement(By.className('post-details-modal'));

};

const enterTitle = async function (driver, noteEditorDialog, noteText, browserName) {

  await driver.wait(until.elementLocated(By.id('postTitleInput')), ELEMENT_WAIT_MS);
  const noteTitleInput = await noteEditorDialog.findElement(By.id('postTitleInput'));
  await driver.wait(until.elementTextIs(noteTitleInput, ''), ELEMENT_WAIT_MS);

  // Clear title
  const key = browserName == 'Safari' ? Key.COMMAND : Key.CONTROL;
  await noteTitleInput.sendKeys(key + 'a');
  await noteTitleInput.sendKeys(Key.BACK_SPACE);

  // Enter text
  await noteTitleInput.sendKeys(noteText);

};

const clickUpdateButton = async function (driver, noteEditorDialog) {

  const updateBtn = await noteEditorDialog.findElement(By.className('update-post-button'));
  await updateBtn.click();

  await TestHelper.safeWaitUntilStalenessOf(driver, updateBtn);

};