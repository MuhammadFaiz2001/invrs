const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../../conf/base.conf');
const assert = require('assert');

const StatusFeed = {

  confirmPostCardWithPieceOfTextContentDoesNotExist: async function (driver, pieceOfTextContent) {

    let isCardNotFound = false;
    try {
      await this.findPostCardByPieceOfTextContent(driver, pieceOfTextContent);
    } catch (e) {
      isCardNotFound = true;
    }

    assert(isCardNotFound);

    logger.debug('Confirmed feed is not showing post card: ' + pieceOfTextContent);

  },

  findPostCardByPieceOfTextContent: async function (driver, pieceOfTextContent) {
    try {
      await waitUntilBodyClassIsNotPOverflowHidden(driver);

      await waitUntilToastWithTextIsNotShown(driver);
    } catch (e) {
      await waitUntilBodyClassIsNotPOverflowHidden(driver);

      await waitUntilToastWithTextIsNotShown(driver);
    }

    // Find all visible activity contents
    await driver.wait(until.elementLocated(By.className('activity-content')), ELEMENT_WAIT_MS);
    let activityContents;
    for (let i = 0; i < 100; i++) {
      activityContents = await driver.findElements(By.className('activity-content'));

      if (activityContents.length > 0) break;
    }

    // Check is there more than 0 activity contents
    assert(activityContents.length > 0);

    let postCard = null;

    // Loop through all activity contents to find one with matching peace of text
    for (let activityContent of activityContents) {

      const activityContentText = await activityContent.getAttribute("innerText");

      if (activityContentText.includes(pieceOfTextContent)) {

        postCard = await activityContent.findElement(By.xpath("./../../.."));

        // Check is the postCard class name includes "card"
        const postCardCssClass = await postCard.getAttribute("class");
        assert(postCardCssClass.includes('card'));

        logger.debug('Found post card containing: ' + pieceOfTextContent);

        return postCard;
      }

    }

    // Assertion to show error in case postCard is not found
    assert(postCard != null);
  },

  findPostCardByUsername: async function (driver, username) {
    try {
      await waitUntilBodyClassIsNotPOverflowHidden(driver);

      await waitUntilToastWithTextIsNotShown(driver);
    } catch (e) {
      await waitUntilBodyClassIsNotPOverflowHidden(driver);

      await waitUntilToastWithTextIsNotShown(driver);
    }

    // Find all visible activity contents
    await driver.wait(until.elementLocated(By.className('names-container')), ELEMENT_WAIT_MS);
    let namesContainers;
    for (let i = 0; i < 100; i++) {
      namesContainers = await driver.findElements(By.className('names-container'));

      if (namesContainers.length > 0) break;
    }

    // Check is there more than 0 activity contents
    assert(namesContainers.length > 0);

    let postCard = null;

    // Loop through all activity contents to find one with matching peace of text
    for (let namesContainer of namesContainers) {

      const activityContentText = await namesContainer.getAttribute("innerText");

      if (activityContentText.includes(username)) {

        postCard = await namesContainer.findElement(By.xpath("./../../../.."));

        // Check is the postCard class name includes "card"
        const postCardCssClass = await postCard.getAttribute("class");
        assert(postCardCssClass.includes('card'));

        logger.debug('Found post card with username: ' + username);

        return postCard;
      }

    }

    // Assertion to show error in case postCard is not found
    assert(postCard != null);
  },

  findPostCardByTitle: async function (driver, title) {
    try {
      await waitUntilBodyClassIsNotPOverflowHidden(driver);

      await waitUntilToastWithTextIsNotShown(driver);
    } catch (e) {
      await waitUntilBodyClassIsNotPOverflowHidden(driver);

      await waitUntilToastWithTextIsNotShown(driver);
    }

    // Find all visible activity titles
    await driver.wait(until.elementLocated(By.className('activity-title')), ELEMENT_WAIT_MS);
    let activityTitles;
    for (let i = 0; i < 100; i++) {
      activityTitles = await driver.findElements(By.className('activity-title'));

      if (activityTitles.length > 0) break;
    }

    // Check is there more than 0 activity titles
    assert(activityTitles.length > 0);

    let postCard = null;

    // Loop through all activity titles to find one with matching peace of text
    for (let activityTitle of activityTitles) {

      const activityTitleText = await activityTitle.getAttribute("innerText");

      if (activityTitleText.includes(title)) {

        postCard = await activityTitle.findElement(By.xpath("./../../.."));

        // Check is the postCard class name includes "card"
        const postCardCssClass = await postCard.getAttribute("class");
        assert(postCardCssClass.includes('card'));

        logger.debug('Found post card with title: ' + title);

        return postCard;
      }

    }

    // Assertion to show error in case postCard is not found
    assert(postCard != null);
  },

  findLastPostCardRepostedByCurrentUser: async function (driver) {
    try {
      await waitUntilBodyClassIsNotPOverflowHidden(driver);

      await waitUntilToastWithTextIsNotShown(driver);
    } catch (e) {
      await waitUntilBodyClassIsNotPOverflowHidden(driver);

      await waitUntilToastWithTextIsNotShown(driver);
    }

    // Find all visible repost infos
    await driver.wait(until.elementLocated(By.className('repost-info')), ELEMENT_WAIT_MS);
    let repostInfos;
    for (let i = 0; i < 100; i++) {
      repostInfos = await driver.findElements(By.className('repost-info'));

      if (repostInfos.length > 0) break;
    }

    // Check is there more than 0 repost infos
    assert(repostInfos.length > 0);

    let postCard = null;

    // Loop through all repost infos to find one with matching peace of text
    for (let repostInfo of repostInfos) {

      const repostInfoText = await repostInfo.getAttribute("innerText");

      if (repostInfoText.includes('Reposted by You')) {

        postCard = await repostInfo.findElement(By.xpath("./../.."));

        // Check is the postCard class name includes "card"
        const postCardCssClass = await postCard.getAttribute("class");
        assert(postCardCssClass.includes('card'));

        logger.debug('Found last post card reposted by current user');

        return postCard;
      }

    }

    // Assertion to show error in case postCard is not found
    assert(postCard != null);
  },

};

module.exports = { StatusFeed };

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