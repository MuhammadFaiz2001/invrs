const { By, until, Key } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../../conf/base.conf');
const assert = require('assert');
const { MentionHelper } = require('./MentionHelper');
const { ImageHelper } = require('./ImageHelper');
const { MediaHelper } = require('./MediaHelper');
const TestHelper = require('../TestHelper');

const StatusEditorDialog = {

  /**
   * Creates new post.
   * 
   * @param {WebDriver} driver
   * @param {{
   * text: 'post_text', 
   * mentions: {
   *  username:'@username', 
   *  equity:'$equity_name', 
   *  fund:'$fund_name', 
   *  tag:'#tag_name'
   * }
   * imageUrl,
   * instagramUrl,
   * tiktokUrl,
   * youtubeUrl
   * }} post
   * @param {string} browserName
   * @param {boolean} isSnapshotUrlCopiedToClipboard
   */
  createPost: async function (driver, post, browserName, isSnapshotUrlCopiedToClipboard) {

    const statusEditorDialog = await findStatusEditorDialog(driver);

    const postContentDescription = await addPostContent(driver, post, browserName, isSnapshotUrlCopiedToClipboard, statusEditorDialog);

    await clickPostButton(driver, statusEditorDialog);

    logger.debug('Created post with: '
      + postContentDescription.toString().replace(/,/g, ', '));

  },

  /**
   * Updates post.
   * 
   * @param {WebDriver} driver
   * @param {{
   * text: 'post_text', 
   * mentions: {
   *  username:'@username', 
   *  equity:'$equity_name', 
   *  fund:'$fund_name', 
   *  tag:'#tag_name'
   * }
   * imageUrl,
   * instagramUrl,
   * tiktokUrl,
   * youtubeUrl
   * }} post
   * @param {string} browserName
   * @param {boolean} isSnapshotUrlCopiedToClipboard
   */
  updatePost: async function (driver, post, browserName, isSnapshotUrlCopiedToClipboard) {

    const statusUpdateDialog = await findStatusUpdateDialog(driver);

    const postContentDescription = await addPostContent(driver, post, browserName, isSnapshotUrlCopiedToClipboard, statusUpdateDialog, true);

    await clickUpdateButton(driver, statusUpdateDialog);

    logger.debug('Updated post with: '
      + postContentDescription.toString().replace(/,/g, ', '));

  },

};

module.exports = { StatusEditorDialog };

const addPostContent = async function (driver, post, browserName, isSnapshotUrlCopiedToClipboard, dialog, clearContent) {

  const editor = await findEditorContent(driver, dialog);

  if (clearContent) {
    await clearPostContent(editor, browserName);
  }

  let postContentDescription = [];

  if (post.text) {
    await enterText(driver, editor, post.text);
    postContentDescription.push('text');
  }

  if (post.mentions) {
    const mentionsDescription = await MentionHelper.addMentions(driver, editor, post.mentions);
    postContentDescription.push(`mentions:[ ${mentionsDescription.toString()} ]`);
  }

  if (post.imageUrl || isSnapshotUrlCopiedToClipboard) {

    if (isSnapshotUrlCopiedToClipboard) {
      await ImageHelper.addSnapshotFromClipboard(driver, editor, browserName);
      postContentDescription.push('snapshot');
    }

    if (post.imageUrl) {
      await ImageHelper.addImage(driver, editor, post.imageUrl, browserName);
      postContentDescription.push('image');
    }

  } else if (post.youtubeUrl) {

    await openInsertMediaDialog(driver, dialog);
    await MediaHelper.addMedia(driver, post.youtubeUrl);
    postContentDescription.push('youtube');

  } else if (post.tiktokUrl) {

    await openInsertMediaDialog(driver, dialog);
    await MediaHelper.addMedia(driver, post.tiktokUrl);
    postContentDescription.push('tiktok');

  } else if (post.instagramUrl) {

    await openInsertMediaDialog(driver, dialog);
    await MediaHelper.addMedia(driver, post.instagramUrl);
    postContentDescription.push('instagram');

  }

  return postContentDescription;

};

const clearPostContent = async function (editor, browserName) {

  const key = browserName == 'Safari' ? Key.COMMAND : Key.CONTROL;
  await editor.sendKeys(key + 'a');
  await editor.sendKeys(Key.BACK_SPACE);

};

const findStatusEditorDialog = async function (driver) {

  await driver.wait(until.elementLocated(By.id('statusEditorDialog')), ELEMENT_WAIT_MS);
  return await driver.findElement(By.id('statusEditorDialog'));

};

const findStatusUpdateDialog = async function (driver) {

  await driver.wait(until.elementLocated(By.className('post-details-modal')), ELEMENT_WAIT_MS);
  return await driver.findElement(By.className('post-details-modal'));

};

const findEditorContent = async function (driver, dialog) {

  await driver.wait(until.elementLocated(By.css('.ck-editor__editable')), ELEMENT_WAIT_MS);
  return await dialog.findElement(By.css('.ck-editor__editable'));

};

const enterText = async function (driver, editor, postText) {

  // Focus on editor
  await editor.sendKeys('');

  // Enter text
  await editor.sendKeys(postText);

  // Get text from field
  const editorText = await editor.getText();

  // Check is text entered
  assert(editorText.includes(postText));

};

const openInsertMediaDialog = async function (driver, dialog) {

  // Find "Insert media" button and click it
  const mediaBtn = await dialog.findElement(By.css('.ck-toolbar__items :nth-child(7)'));
  await mediaBtn.click();

};

const clickPostButton = async function (driver, dialog) {

  let postBtn;

  try {
    postBtn = await dialog.findElement(By.className('post-status-button'));
    await postBtn.click();
  } catch (e) {
    await driver.sleep(500);

    if (await dialog.findElements(By.className('post-status-button')).length > 0) {
      postBtn = await dialog.findElement(By.className('post-status-button'));
      await postBtn.click();
    }
  }

  await TestHelper.safeWaitUntilStalenessOf(driver, postBtn);

};

const clickUpdateButton = async function (driver, dialog) {

  const updateBtn = await dialog.findElement(By.className('update-post-button'));
  await updateBtn.click();

  await TestHelper.safeWaitUntilStalenessOf(driver, updateBtn);

};