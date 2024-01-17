const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../../conf/base.conf');
const TestHelper = require('../TestHelper');

const GroupProfileUserPanel = {

  isAdmin: async function (driver) {
    const adminMenuElements = await driver.findElements(By.className('admin-options-header-menu'));
    const finishGroupSetupMsgElements = await driver.findElements(By.className('finish-group-setup-message-container'));

    return adminMenuElements.length > 0 || finishGroupSetupMsgElements.length > 0 ? true : false;
  },

  selectAdmin: async function (driver) {
    await selectHeaderOptionIfItIsNotSelected(driver, 2);

    logger.debug('Selected "Admin" header option');
  },

  acceptLastPendingRequest: async function (driver) {

    await driver.wait(until.elementLocated(By.css('.p-scrollpanel-content div.list-item-container:nth-child(1)')), ELEMENT_WAIT_MS);
    const firstItem = await driver.findElement(By.css('.p-scrollpanel-content div.list-item-container:nth-child(1)'));
    const acceptBtn = await firstItem.findElement(By.className('accept-request-button'));
    await acceptBtn.click();

    await TestHelper.safeWaitUntilStalenessOf(driver, acceptBtn);

    await waitUntilToastWithTextIsNotShown(driver);

    logger.debug('Accepted last pending request');

  },

}

module.exports = { GroupProfileUserPanel };

const selectHeaderOptionIfItIsNotSelected = async function (driver, option) {

  await driver.sleep(500);
  await driver.wait(until.elementLocated(By.css(`.group-profile-user-panel div.navigation button.p-button:nth-child(${option})`)), ELEMENT_WAIT_MS);
  const myGroupsHeaderBtn = await driver.findElement(By.css(`.group-profile-user-panel div.navigation button.p-button:nth-child(${option})`));
  const myGroupsHeaderBtnClass = await myGroupsHeaderBtn.getAttribute("class");
  if (!myGroupsHeaderBtnClass.includes('active')) {
    await myGroupsHeaderBtn.click();
  }

}

const waitUntilToastWithTextIsNotShown = async function (driver) {

  await driver.wait(until.elementLocated(
    By.className('p-toast p-component p-toast-top-right p-ripple-disabled')), ELEMENT_WAIT_MS);
  const toast = await driver.findElement(
    By.className('p-toast p-component p-toast-top-right p-ripple-disabled'));
  await driver.wait(until.elementTextIs(toast, ''), ELEMENT_WAIT_MS);

}