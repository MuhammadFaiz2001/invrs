const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../../conf/base.conf');
const assert = require('assert');
const TestHelper = require('../TestHelper');

const FeedPostCard = {

  deletePost: async function (driver, statusPostCard) {

    await scrollIntoPostCard(driver, statusPostCard);

    await clickMoreOptions(driver, statusPostCard);

    // Click trash icon of the more options menu
    await driver.wait(until.elementLocated(By.css('.pi-trash')), ELEMENT_WAIT_MS);
    const trashBtn = await driver.findElement(By.css('.pi-trash'));
    await trashBtn.click();

    await confirmDelete(driver);

    await TestHelper.safeWaitUntilStalenessOf(driver, statusPostCard);

    logger.debug('Deleted the post');

  },

  likePost: async function (driver, statusPostCard) {

    await scrollIntoPostCard(driver, statusPostCard);

    await driver.wait(until.elementLocated(By.className('pi-thumbs-up')), ELEMENT_WAIT_MS);
    const likeBtn = await statusPostCard.findElement(By.className('pi-thumbs-up'));
    await likeBtn.click();

    await driver.wait(until.elementLocated(By.className('likes-amount')), ELEMENT_WAIT_MS);
    const likeAmount = await statusPostCard.findElement(By.className('likes-amount'));
    await driver.wait(until.elementTextIs(likeAmount, '1'), ELEMENT_WAIT_MS);

    logger.debug('Liked the post');

  },

  openSharePostDialog: async function (driver, statusPostCard) {

    await scrollIntoPostCard(driver, statusPostCard);

    await clickMoreOptions(driver, statusPostCard);

    await driver.wait(until.elementLocated(By.className('pi-share-alt')), ELEMENT_WAIT_MS);
    const shareBtn = await driver.findElement(By.className('pi-share-alt'));
    await shareBtn.click();

    logger.debug('Opened share post dialog');

  },

  openLikedByDialog: async function (driver, statusPostCard) {

    await scrollIntoPostCard(driver, statusPostCard);

    await driver.wait(until.elementLocated(By.className('likes-amount')), ELEMENT_WAIT_MS);
    const likesAmountBtn = await statusPostCard.findElement(By.className('likes-amount'));
    await likesAmountBtn.click();

    logger.debug('Opened liked by dialog');

  },

  openPostDetailsDialog: async function (driver, statusPostCard) {

    await scrollIntoPostCard(driver, statusPostCard);

    await driver.wait(until.elementLocated(By.className('pi pi-comment')), ELEMENT_WAIT_MS);
    const commentBtn = await statusPostCard.findElement(By.className('pi pi-comment'));
    await commentBtn.click();

    logger.debug('Opened post details dialog');

  },

  openPostEditorDialog: async function (driver, statusPostCard) {

    await scrollIntoPostCard(driver, statusPostCard);

    await clickMoreOptions(driver, statusPostCard);

    await driver.wait(until.elementLocated(By.className('p-menuitem-icon pi pi-pencil')), ELEMENT_WAIT_MS);
    const editBtn = await driver.findElement(By.className('p-menuitem-icon pi pi-pencil'));
    await editBtn.click();

    logger.debug('Opened post editor dialog');

  },

  /**
   * Clicks the name label of the group in which it was originally posted.
   * Only for posts posted in groups.
   * 
   * @param {the webdriver} driver 
   */
  openGroupProfile: async function (driver, statusPostCard) {

    await scrollIntoPostCard(driver, statusPostCard);

    await driver.wait(until.elementLocated(By.css('.username span:nth-child(2)')), ELEMENT_WAIT_MS);
    const groupNameLabel = await driver.findElement(By.css('.username span:nth-child(2)'));
    await groupNameLabel.click();

    await TestHelper.safeWaitUntilStalenessOf(driver, statusPostCard);

    await driver.wait(until.elementLocated(By.className('group-profile')), ELEMENT_WAIT_MS);

    logger.debug('Opened group profile by clicking group name in post card');

  },

  confirmPostCommentsAmountIs: async function (driver, statusPostCard, amount) {

    await scrollIntoPostCard(driver, statusPostCard);

    await driver.wait(until.elementLocated(By.className('comments-container')), ELEMENT_WAIT_MS);
    const commentsAmount = await statusPostCard.findElement(By.className('comments-container'));
    await driver.wait(until.elementTextIs(commentsAmount, `${amount}`), ELEMENT_WAIT_MS);

    logger.debug('Confirmed post card comments amount: ' + amount);

  },

  confirmPostCommentTextIs: async function (driver, statusPostCard, text) {

    await scrollIntoPostCard(driver, statusPostCard);

    const commentText = await statusPostCard.findElement(By.className('comment-text'));
    await driver.wait(until.elementTextContains(commentText, text), ELEMENT_WAIT_MS);

    logger.debug('Confirmed post card comment text: ' + text);

  },

  repostPost: async function (driver, statusPostCard) {

    await scrollIntoPostCard(driver, statusPostCard);

    await clickMoreOptions(driver, statusPostCard);

    // Click repost icon of the more options menu
    await driver.wait(until.elementLocated(By.className('pi-replay')), ELEMENT_WAIT_MS);
    const repostBtn = await driver.findElement(By.className('pi-replay'));
    await repostBtn.click();

    await driver.sleep(1000);
    const selectRepostLocationsDialog =
      await driver.findElements(By.className('p-dialog p-component p-ripple-disabled tag-dialog'));

    if (selectRepostLocationsDialog.length > 0) {
      const repostBtn = await selectRepostLocationsDialog[0].findElement(By.className('action-button'));
      await repostBtn.click();
    }

    await TestHelper.safeWaitUntilStalenessOf(driver, statusPostCard);

    await waitUntilToastWithTextIsNotShown(driver);

    logger.debug('Reposted the post');

  },

};

module.exports = { FeedPostCard };

const scrollIntoPostCard = async function (driver, statusPostCard) {
  await driver.executeScript("arguments[0].scrollIntoView();", statusPostCard);
};

const clickMoreOptions = async function (driver, statusPostCard) {

  await driver.wait(until.elementLocated(By.css('.more-options')), ELEMENT_WAIT_MS);
  const moreOptions = await statusPostCard.findElement(By.css('.more-options'));
  await moreOptions.click();

};

const confirmDelete = async function (driver) {

  await driver.wait(until.elementLocated(By.css('.p-dialog')), ELEMENT_WAIT_MS);
  const dialog = await driver.findElement(By.css('.p-dialog'));
  await driver.wait(until.elementIsVisible(dialog), ELEMENT_WAIT_MS);

  const deleteBtn = await dialog.findElement(By.css('.accept'));
  await driver.wait(until.elementIsVisible(deleteBtn), ELEMENT_WAIT_MS);
  const deleteBtnText = await deleteBtn.getText();

  assert(deleteBtnText == 'Delete');

  await deleteBtn.click();

};

const waitUntilToastWithTextIsNotShown = async function (driver) {

  await driver.wait(until.elementLocated(
    By.className('p-toast p-component p-toast-top-center p-ripple-disabled')), ELEMENT_WAIT_MS);
  const toast = await driver.findElement(
    By.className('p-toast p-component p-toast-top-center p-ripple-disabled'));
  await driver.wait(until.elementTextIs(toast, ''), ELEMENT_WAIT_MS);

}