const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../../conf/base.conf');
const TestHelper = require('../TestHelper');

const GroupInviteDialog = {

  inviteByNameAndReturnShareableInviteLink: async function (driver, name) {

    const friendSearchBar = await driver.findElement(By.id('friendSearchBar'));
    await friendSearchBar.sendKeys(name);

    await driver.wait(until.elementLocated(By.className('p-autocomplete-item')), ELEMENT_WAIT_MS);
    const autocompleteItem = await driver.findElement(By.className('p-autocomplete-item'));
    await autocompleteItem.click();

    const getShareableLink = await driver.findElement(By.className('external-invite-input'));
    const externalInviteLink = await getShareableLink.getAttribute('placeholder');

    const finishBtn = await driver.findElement(By.className('finish-button'));
    await finishBtn.click();

    await TestHelper.safeWaitUntilStalenessOf(driver, finishBtn);

    await waitUntilToastWithTextIsNotShown(driver);

    logger.debug('Invited user to the group and got shareable link: ' + externalInviteLink);

    return externalInviteLink;

  },

}

module.exports = { GroupInviteDialog };

const waitUntilToastWithTextIsNotShown = async function (driver) {

  await driver.wait(until.elementLocated(
    By.className('p-toast p-component p-toast-top-center p-ripple-disabled')), ELEMENT_WAIT_MS);
  const toast = await driver.findElement(
    By.className('p-toast p-component p-toast-top-center p-ripple-disabled'));
  await driver.wait(until.elementTextIs(toast, ''), ELEMENT_WAIT_MS);

}