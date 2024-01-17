const { By, until, Key } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../../conf/base.conf');
const assert = require('assert');
const { MentionHelper } = require('./MentionHelper');
const { ImageHelper } = require('./ImageHelper');
const { MediaHelper } = require('./MediaHelper');

const NoteEditor = {

  addNoteContent: async function (driver, note, noteForm, browserName) {
    return await addContent(driver, note, noteForm, browserName);
  },

  updateNoteContent: async function (driver, note, noteForm, browserName) {
    return await addContent(driver, note, noteForm, browserName, true);
  }

};

module.exports = { NoteEditor };

const addContent = async function (driver, note, noteForm, browserName, isUpdateNote) {

  let noteContentDescription = [];

  const contentEditor = await findEditorContent(driver, noteForm);

  if (isUpdateNote) {
    await clearPostContent(contentEditor, browserName);
  }

  if (note.text) {
    await enterText(contentEditor, note.text);
    noteContentDescription.push('text');
  }

  if (note.mentions) {
    const mentionsDescription = await MentionHelper.addMentions(driver, contentEditor, note.mentions);
    noteContentDescription.push(`mentions:[ ${mentionsDescription.toString()} ]`);
  }

  if (note.snapshotOfEquityUrl || note.imageUrl) {

    if (note.snapshotUrl) {
      await ImageHelper.addImage(driver, contentEditor, note.snapshotUrl, browserName);
      noteContentDescription.push('snapshot');
    }

    if (note.imageUrl) {
      await ImageHelper.addImage(driver, contentEditor, note.imageUrl, browserName);
      noteContentDescription.push('image');
    }

  } else if (note.youtubeUrl) {

    await openInsertMediaDialog(driver, noteForm, isUpdateNote);
    await MediaHelper.addMedia(driver, note.youtubeUrl);
    noteContentDescription.push('youtube');

  } else if (note.tiktokUrl) {

    await openInsertMediaDialog(driver, noteForm, isUpdateNote);
    await MediaHelper.addMedia(driver, note.tiktokUrl);
    noteContentDescription.push('tiktok');

  } else if (note.instagramUrl) {

    await openInsertMediaDialog(driver, noteForm, isUpdateNote);
    await MediaHelper.addMedia(driver, note.instagramUrl);
    noteContentDescription.push('instagram');

  }

  return noteContentDescription;

}

const findEditorContent = async function (driver, noteForm) {

  await driver.wait(until.elementLocated(By.className('ck-editor__editable')), ELEMENT_WAIT_MS);
  return await noteForm.findElement(By.className('ck-editor__editable'));

};

const clearPostContent = async function (editor, browserName) {

  const key = browserName == 'Safari' ? Key.COMMAND : Key.CONTROL;
  await editor.sendKeys(key + 'a');
  await editor.sendKeys(Key.BACK_SPACE);

};

const enterText = async function (editor, noteText) {

  // Focus on editor
  await editor.sendKeys('');

  // Enter text
  await editor.sendKeys(noteText);

  // Get text from field
  const editorText = await editor.getText();

  // Check is text entered
  assert(editorText.includes(noteText));

};

const openInsertMediaDialog = async function (driver, noteForm, isUpdateNote) {

  if (isUpdateNote) {

    // Find "Insert media" button and click it
    const mediaBtn = await noteForm.findElement(
      By.css('.ck-toolbar__items div:nth-child(15) button'));
    await mediaBtn.click();

  } else {

    const moreBtn = await noteForm.findElement(
      By.className('ck ck-dropdown ck-toolbar__grouped-dropdown ck-toolbar-dropdown'));
    await moreBtn.click();

    // Find "Insert media" button and click it
    const mediaBtn = await noteForm.findElement(
      By.css('.ck-dropdown__panel_sw.ck-dropdown__panel-visible div:nth-child(4)'));
    await mediaBtn.click();

  }

};