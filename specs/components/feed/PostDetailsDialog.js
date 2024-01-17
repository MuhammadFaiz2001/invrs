const { By, until, Key } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../../conf/base.conf');
const TestHelper = require('../TestHelper');
const { ImageHelper } = require('./ImageHelper');
const { MentionHelper } = require('./MentionHelper');

const PostDetailsDialog = {

  likeComment: async function (driver) {

    const postDetailsDialog = await findPostDetailsDialog(driver);

    await driver.wait(until.elementsLocated(By.className('comment-activity-bar')), ELEMENT_WAIT_MS);
    const commentActivityBar = await postDetailsDialog.findElement(By.className('comment-activity-bar'));
    await driver.executeScript("arguments[0].scrollIntoView();", commentActivityBar);

    const likesContainer = await commentActivityBar.findElement(By.className('likes-container'));
    const likeCommentBtn = await likesContainer.findElement(By.className('pi-thumbs-up'));
    await likeCommentBtn.click();

    await driver.wait(until.elementTextIs(likesContainer, '1'), ELEMENT_WAIT_MS);

    logger.debug('Liked comment and confirmed like count is: 1');

  },

  postComment: async function (driver, comment, browserName) {

    const postDetailsDialog = await findPostDetailsDialog(driver);

    await driver.wait(until.elementsLocated(By.className('comment-editor-bar')), ELEMENT_WAIT_MS);
    const commentEditorBar = await postDetailsDialog.findElement(By.className('comment-editor-bar'));

    const commentContentDescription = await addCommentContent(driver, commentEditorBar, comment, browserName);

    const postCommentBtn = await commentEditorBar.findElement(By.className('post-comment-button'));
    await postCommentBtn.click();

    logger.debug('Posted comment with: ' + commentContentDescription);

    await confirmPostDetailsDialogCommentsAmountIs(driver, postDetailsDialog, 1);

    await confirmPostDetailsDialogCommentTextContains(driver, postDetailsDialog, comment.text);

    await waitUntilToastWithTextIsNotShown(driver);

  },

  postReplyToComment: async function (driver, replyToComment, browserName) {

    const postDetailsDialog = await findPostDetailsDialog(driver);

    const commentContent = await postDetailsDialog.findElement(By.className('comment-content'));

    const commentActivityBar = await commentContent.findElement(By.className('comment-activity-bar'));
    await driver.executeScript("arguments[0].scrollIntoView();", commentActivityBar);

    const replyToCommentBtn = await commentActivityBar.findElement(By.className('pi-comment'));
    await replyToCommentBtn.click();

    const subCommentBar = await commentContent.findElement(By.className('sub-comment-bar'));

    const replyToCommentContentDescription = await addCommentContent(driver, commentContent, replyToComment, browserName);

    const postCommentBtn = await subCommentBar.findElement(By.className('post-comment-button'));
    await driver.executeScript("arguments[0].click();", postCommentBtn);

    logger.debug('Posted reply to comment with: ' + replyToCommentContentDescription);

    await confirmPostDetailsDialogCommentsAmountIs(driver, postDetailsDialog, 1, true);

    await confirmPostDetailsDialogCommentTextContains(driver, postDetailsDialog, replyToComment.text, true);

  },

  closePostDetailsDialog: async function (driver) {

    const postDetailsDialog = await findPostDetailsDialog(driver);

    await waitUntilToastWithTextIsNotShown(driver);

    await driver.actions().sendKeys(Key.ESCAPE).perform();

    await TestHelper.safeWaitUntilStalenessOf(driver, postDetailsDialog);

    logger.debug('Closed post details dialog');

  }

}

module.exports = { PostDetailsDialog };

const findPostDetailsDialog = async function (driver) {
  await driver.wait(until.elementsLocated(By.className('post-details-modal')), ELEMENT_WAIT_MS);
  return await driver.findElement(By.className('post-details-modal'));
}

const addCommentContent = async function (driver, commentEditorBar, comment, browserName) {

  let commentContentDescription = [];

  const commentInput = await commentEditorBar.findElement(By.css('.ck-editor__editable p'));

  if (comment.text) {
    await enterCommentText(driver, commentInput, comment.text);
    commentContentDescription.push('text');
  }

  if (comment.mentions) {
    const mentionsDescription = await MentionHelper.addMentions(driver, commentInput, comment.mentions);
    commentContentDescription.push(`mentions:[ ${mentionsDescription.toString()} ]`);
  }

  if (comment.imageUrl) {
    await ImageHelper.addImage(driver, commentInput, comment.imageUrl, browserName);
    commentContentDescription.push('image');
  }

  return commentContentDescription;

}

const enterCommentText = async function (driver, commentInput, text) {

  await commentInput.sendKeys(text);
  await driver.sleep(500);
  await driver.wait(until.elementTextIs(commentInput, text), ELEMENT_WAIT_MS);

}

const waitUntilToastWithTextIsNotShown = async function (driver) {

  await driver.wait(until.elementLocated(
    By.className('p-toast p-component p-toast-center p-ripple-disabled')), ELEMENT_WAIT_MS);
  const toast = await driver.findElement(
    By.className('p-toast p-component p-toast-center p-ripple-disabled'));
  await driver.wait(until.elementTextIs(toast, ''), ELEMENT_WAIT_MS);

}

const confirmPostDetailsDialogCommentsAmountIs = async function (driver, postDetailsDialog, amount, isReply) {

  const commentLevel = isReply ? 'level-2' : 'level-1';
  await driver.wait(until.elementsLocated(By.className('comment-card ' + commentLevel)), ELEMENT_WAIT_MS);

  await driver.wait(until.elementsLocated(By.className('comments-container')), ELEMENT_WAIT_MS);
  const commentsCount = await postDetailsDialog.findElement(By.className('comments-container'));
  await driver.executeScript("arguments[0].scrollIntoView();", commentsCount);
  await driver.wait(until.elementTextIs(commentsCount, `${amount}`), ELEMENT_WAIT_MS);

  logger.debug(`Confirmed post details dialog comment ${isReply ? 'replies ' : ''}amount: ` + amount);

}

const confirmPostDetailsDialogCommentTextContains = async function (driver, postDetailsDialog, text, isReply) {

  const commentLevel = isReply ? 'level-2' : 'level-1';
  await driver.wait(until.elementsLocated(By.className('comment-card ' + commentLevel)), ELEMENT_WAIT_MS);

  const commentReply = await postDetailsDialog.findElement(By.className('comment-card ' + commentLevel));
  const commentReplyText = await commentReply.findElement(By.className('comment-text'));
  await driver.executeScript("arguments[0].scrollIntoView();", commentReplyText);
  await driver.wait(until.elementTextContains(commentReplyText, text), ELEMENT_WAIT_MS);

  logger.debug(`Confirmed post details dialog comment ${isReply ? 'reply ' : ''}text: ` + text);

}