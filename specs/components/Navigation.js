const { By, until } = require('selenium-webdriver');
var assert = require('assert');
const { ELEMENT_WAIT_MS, logger } = require('../../conf/base.conf');
const TestHelper = require('./TestHelper');

module.exports = {

  /**
   * Clicks the Home menu button and waits until the feed is displaying at least one post.
   * 
   *  @param {the webdriver} driver 
   */
  goHome: async function (driver) {

    const sidebar = await driver.findElement(By.className('layout-sidebar'));

    const homeButton = await sidebar.findElement(By.className('pi-home'));
    await homeButton.click();
    logger.debug('Home button clicked');

    await driver.wait(until.elementLocated(By.css('.activity-block')), ELEMENT_WAIT_MS);
    logger.debug('Home feed loaded');

  },

  goToGroups: async function (driver, notFromHomePage) {

    if (!notFromHomePage) {
      await driver.wait(until.elementLocated(By.className('activity-block')), ELEMENT_WAIT_MS);
    }

    await driver.wait(until.elementLocated(By.className('layout-sidebar')), ELEMENT_WAIT_MS);
    const sidebar = await driver.findElement(By.className('layout-sidebar'));

    const groupsBtn = await sidebar.findElement(By.className('pi-users'));
    await groupsBtn.click();
    logger.debug('Groups button clicked');

    await TestHelper.safeWaitUntilStalenessOf(driver, groupsBtn);

    await driver.wait(until.elementLocated(By.className('group-actions-container')), ELEMENT_WAIT_MS);
    logger.debug('Groups loaded');

  },

  /**
   * Clicks the Discover link on the Home screen.
   * Assumes we are already on the Home screen.
   * @param {the webdriver} driver 
   */
  goToDiscover: async function (driver) {

    const buttonDiv = await driver.findElement(By.css('.markets-discover-header-menu'));
    const buttonTexts = await buttonDiv.findElements(By.css('.pill-menuitem-text'));
    let discoverButton = null;
    for (let b of buttonTexts) {
      const txt = await b.getText();

      if (txt == 'Discover') {
        discoverButton = b;
        break;
      }
    }
    assert(discoverButton != null);
    await discoverButton.click();
    logger.debug('Discover button clicked');

  },

  goToStockEvents: async function (driver) {

    const buttonDiv = await driver.findElement(By.css('.feed-header-menu'));
    const buttonTexts = await buttonDiv.findElements(By.css('.pill-menuitem-text'));
    let eventsButton = null;
    for (let b of buttonTexts) {
      const txt = await b.getText();

      if (txt == 'Events') {
        eventsButton = b;
        break;
      }
    }
    assert(eventsButton != null);
    await eventsButton.click();
    logger.debug('Stock Events button clicked');

  },

  goToStockFeed: async function (driver) {

    const buttonDiv = await driver.findElement(By.css('.feed-header-menu'));
    const buttonTexts = await buttonDiv.findElements(By.css('.pill-menuitem-text'));
    let feedButton = null;
    for (let b of buttonTexts) {
      const txt = await b.getText();

      if (txt == 'Feed') {
        feedButton = b;
        break;
      }
    }
    assert(feedButton != null);
    await feedButton.click();
    logger.debug('Stock Feed button clicked');

  },

  goToProfile: async function (driver) {

    // find user bar container and click avatar
    await driver.wait(until.elementLocated(By.className('user-bar-container')), ELEMENT_WAIT_MS);
    const userBarContainer = await driver.findElement(By.className('user-bar-container'));
    const avatarBtn = await userBarContainer.findElement(By.css('.user-bar-container ul:nth-child(3)'));
    await avatarBtn.click();

    // find profile menu and click pi-user icon
    await driver.wait(until.elementLocated(By.css('.profile-menu')), ELEMENT_WAIT_MS);
    const profileMenu = await userBarContainer.findElement(By.css('.profile-menu'));
    const profileBtn = await profileMenu.findElement(By.className('pi-user'));
    await profileBtn.click();

    await TestHelper.safeWaitUntilStalenessOf(driver, userBarContainer);

    logger.debug('Profile button clicked');

  },

};
