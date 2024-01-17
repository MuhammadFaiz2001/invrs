const { By, until } = require('selenium-webdriver');
const { LOGIN_USERNAME, LOGIN_PASSWORD, LOGIN_USERNAME_2, LOGIN_PASSWORD_2, ELEMENT_WAIT_MS, logger } = require('../../conf/base.conf');
const TestHelper = require('./TestHelper');

module.exports = {

  /**
   * Clicks the login link on the public website and then logs into the application.
   * Assumes the driver has already loaded the public index.html page.
   * 
   * @param {the webdriver} driver 
   * @param {boolean} secondAccount 
   */
  login: async function (driver, secondAccount) {

    const loginLinkElements = await driver.findElements(By.linkText('Login'));
    if (loginLinkElements.length > 0) {
      await driver.findElement(By.linkText('Login')).click();
    }

    await driver.wait(until.elementLocated(By.id('username')), ELEMENT_WAIT_MS);

    if (secondAccount) {
      await driver.findElement(By.id('username')).sendKeys(LOGIN_USERNAME_2);
      await driver.findElement(By.id('password')).sendKeys(LOGIN_PASSWORD_2);
    } else {
      await driver.findElement(By.id('username')).sendKeys(LOGIN_USERNAME);
      await driver.findElement(By.id('password')).sendKeys(LOGIN_PASSWORD);
    }

    await driver.findElement(By.css('.sign-in-button > .p-button-label')).click();

    logger.debug('Login clicked');

  },

  logout: async function (driver) {

    // find user bar container and click avatar
    await driver.wait(until.elementLocated(By.className('user-bar-container')), ELEMENT_WAIT_MS);
    const userBarContainer = await driver.findElement(By.className('user-bar-container'));
    const avatarBtn = await userBarContainer.findElement(By.css('.user-bar-container ul:nth-child(3)'));
    await avatarBtn.click();

    // find profile menu and click power-off icon
    await driver.wait(until.elementLocated(By.css('.profile-menu')), ELEMENT_WAIT_MS);
    const profileMenu = await userBarContainer.findElement(By.css('.profile-menu'));
    const logoutBtn = await profileMenu.findElement(By.className('pi-power-off'));
    await logoutBtn.click();

    await TestHelper.safeWaitUntilStalenessOf(driver, userBarContainer);

    logger.debug('Logout clicked');

  },

  getUsername: async function (driver) {

    // find user bar container and click avatar
    await driver.wait(until.elementLocated(By.className('user-bar-container')), ELEMENT_WAIT_MS);
    const userBarContainer = await driver.findElement(By.className('user-bar-container'));
    const avatarBtn = await userBarContainer.findElement(By.css('.user-bar-container ul:nth-child(3)'));
    await avatarBtn.click();

    // find profile menu and click power-off icon
    await driver.wait(until.elementLocated(By.className('profile-menu')), ELEMENT_WAIT_MS);
    const profileMenu = await userBarContainer.findElement(By.className('profile-menu'));
    const usernameLabel = await profileMenu.findElement(By.className('username'));
    const username = await usernameLabel.getText();

    await avatarBtn.click();

    await TestHelper.safeWaitUntilStalenessOf(driver, userBarContainer);

    logger.debug('Current username: ' + username);

    return username;

  },

};