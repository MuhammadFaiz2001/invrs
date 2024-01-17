const { By, until, Key } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../../conf/base.conf');
const assert = require('assert');
const TestHelper = require('../TestHelper');
const { NoteEditor } = require('./NoteEditor');

const NoteEditorPage = {

  /**
   * Saves new note.
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
  saveNote: async function (driver, note, browserName) {

    const noteContentDescription = await enterTitleAndContent(driver, note, browserName);

    logger.debug('Created note with: title, '
      + noteContentDescription.toString().replace(/,/g, ', '));

  },

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

    const noteContentDescription = await enterTitleAndContent(driver, note, browserName, true);

    logger.debug('Updated note with: title, '
      + noteContentDescription.toString().replace(/,/g, ', '));

  },

  postCurrentNote: async function (driver) {

    await waitUntilBodyClassIsNotPOverflowHidden(driver);

    await waitUntilToastWithTextIsNotShown(driver);

    // Click post
    const noteEditorForm = await findNoteForm(driver);
    const postBtn = await noteEditorForm.findElement(By.className('p-button p-component action-button'));
    await postBtn.click();
    // Click a tag
    await driver.wait(until.elementLocated(By.className('p-button p-component tag-button tag')), ELEMENT_WAIT_MS);
    const tagBtn = await driver.findElement(By.className('p-button p-component tag-button tag'));
    await driver.wait(until.elementIsVisible(tagBtn), ELEMENT_WAIT_MS);
    await tagBtn.click();

    let dialogFooter = await driver.findElement(By.className('p-dialog-footer'));
    // Click next
    await driver.wait(until.elementLocated(By.className('p-button p-component action-button')), ELEMENT_WAIT_MS);
    const dialogNextBtn = await dialogFooter.findElement(By.className('p-button p-component action-button'));
    await driver.wait(until.elementIsVisible(dialogNextBtn), ELEMENT_WAIT_MS);
    const dialogNextBtnText = await dialogNextBtn.getText();
    if (dialogNextBtnText == 'Next') {
      await dialogNextBtn.click();
      await TestHelper.safeWaitUntilStalenessOf(driver, dialogNextBtn);
    }

    await driver.wait(until.elementLocated(By.className('p-dialog-footer')), ELEMENT_WAIT_MS);
    dialogFooter = await driver.findElement(By.className('p-dialog-footer'));
    // Click post
    await driver.wait(until.elementLocated(By.className('p-button p-component action-button')), ELEMENT_WAIT_MS);
    const dialogPostBtn = await dialogFooter.findElement(By.className('p-button p-component action-button'));
    await driver.wait(until.elementIsVisible(dialogPostBtn), ELEMENT_WAIT_MS);
    await dialogPostBtn.click();
    await TestHelper.safeWaitUntilStalenessOf(driver, dialogPostBtn);

    await waitUntilStalenessOfNoteProgressModalIfExists(driver);

    await waitUntilBodyClassIsNotPOverflowHidden(driver);

    await waitUntilToastWithTextIsNotShown(driver);

  },

  clickGoBackButton: async function (driver) {

    const goBackBtn = await driver.findElement(By.className('go-back-button'));
    await goBackBtn.click();

    await TestHelper.safeWaitUntilStalenessOf(driver, goBackBtn);

    logger.debug('Clicked button to go back from note editor page');

  },

  clickCreateNewNoteButton: async function (driver) {

    const createNewBtn = await driver.findElement(By.className('create-new-button'));
    await createNewBtn.click();

    logger.debug('Clicked create new note button');

  },

};

module.exports = { NoteEditorPage };

const findNoteForm = async function (driver) {

  await driver.wait(until.elementLocated(By.className('left-col')), ELEMENT_WAIT_MS);
  return await driver.findElement(By.className('left-col'));

};

const enterTitleAndContent = async function (driver, note, browserName, isUpdateNote) {

  await waitUntilBodyClassIsNotPOverflowHidden(driver);

  await waitUntilToastWithTextIsNotShown(driver);

  assert(note.title);

  const noteEditorForm = await findNoteForm(driver);

  await enterTitle(driver, noteEditorForm, note.title, browserName);

  const noteContentDescription = await NoteEditor.addNoteContent(driver, note, noteEditorForm, browserName, isUpdateNote);

  await clickSaveButton(driver, noteEditorForm);

  return noteContentDescription;

}

const enterTitle = async function (driver, noteEditorForm, noteText, browserName) {

  await driver.wait(until.elementLocated(By.id('noteTitleInput')), ELEMENT_WAIT_MS);
  const noteTitleInput = await noteEditorForm.findElement(By.id('noteTitleInput'));
  await driver.wait(until.elementTextIs(noteTitleInput, ''), ELEMENT_WAIT_MS);

  // Clear title
  const key = browserName == 'Safari' ? Key.COMMAND : Key.CONTROL;
  await noteTitleInput.sendKeys(key + 'a');
  await noteTitleInput.sendKeys(Key.BACK_SPACE);

  // Enter text
  await noteTitleInput.sendKeys(noteText);

};

const clickSaveButton = async function (driver, noteEditorForm) {

  const saveBtn = await noteEditorForm.findElement(By.className('save-note-button'));
  await saveBtn.click();

  await waitUntilBodyClassIsNotPOverflowHidden(driver);

  await waitUntilToastWithTextIsNotShown(driver);

};

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

const waitUntilStalenessOfNoteProgressModalIfExists = async function (driver) {

  try {
    const noteProgressModal = await driver.findElement(By.id('note-progress-modal'));
    await driver.wait(until.stalenessOf(noteProgressModal), ELEMENT_WAIT_MS);
  } catch (e) {
    // Do nothing
  }

};