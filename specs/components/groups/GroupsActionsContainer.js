const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../../conf/base.conf');
const TestHelper = require('../TestHelper');

const GroupsActionsContainer = {

  createNewGroup: async function (driver, group) {

    await driver.wait(until.elementLocated(By.className('group-actions-container')), ELEMENT_WAIT_MS);
    const groupActions = await driver.findElement(By.className('group-actions-container'));

    await driver.wait(until.elementLocated(By.className('green-button__primary')), ELEMENT_WAIT_MS);
    const createNewGroupBtn = await groupActions.findElement(By.className('green-button__primary'));
    await createNewGroupBtn.click();

    await enterNameAndClickNext(driver, group.name);

    await chooseGroupTypeAndClickNext(driver);

    await chooseCommunityPrivacyAndClickNext(driver, group.isPrivate);

    await waitUntilToastWithTextIsNotShown(driver);

    logger.debug(`Created ${group.isPrivate ? 'private' : 'public'} group: ${group.name}`);

  },

}

module.exports = { GroupsActionsContainer };

const enterNameAndClickNext = async function (driver, name) {

  await driver.wait(until.elementLocated(By.className('group-signup-process-modal-0')), ELEMENT_WAIT_MS);
  const dialog = await driver.findElement(By.className('group-signup-process-modal-0'));

  await driver.wait(until.elementLocated(By.className('name-group-input')), ELEMENT_WAIT_MS);
  const nameGroupInput = await dialog.findElement(By.className('name-group-input'));
  await nameGroupInput.sendKeys(name);

  await driver.wait(until.elementLocated(By.className('next-button')), ELEMENT_WAIT_MS);
  const nextBtn = await dialog.findElement(By.className('next-button'));
  await nextBtn.click();

  await driver.sleep(300);

}

const chooseGroupTypeAndClickNext = async function (driver) {

  await driver.wait(until.elementLocated(By.className('group-signup-process-modal-1')), ELEMENT_WAIT_MS);
  const dialog = await driver.findElement(By.className('group-signup-process-modal-1'));

  const groupTypeCommunity = await dialog.findElement(By.css('.content-row div:nth-child(1)'));
  await groupTypeCommunity.click();

  await driver.wait(until.elementLocated(By.className('next-button')), ELEMENT_WAIT_MS);
  const nextBtn = await dialog.findElement(By.className('next-button'));
  await nextBtn.click();

  await driver.sleep(300);

}

const chooseCommunityPrivacyAndClickNext = async function (driver, isPrivate) {

  await driver.wait(until.elementLocated(By.className('group-signup-process-modal-2')), ELEMENT_WAIT_MS);
  const dialog = await driver.findElement(By.className('group-signup-process-modal-2'));

  const communityPrivacyOption = isPrivate ? 2 : 1;
  const option = await dialog.findElement(By.css(`.content-row div:nth-child(${communityPrivacyOption})`));
  await option.click();

  await driver.wait(until.elementLocated(By.className('next-button')), ELEMENT_WAIT_MS);
  const nextBtn = await dialog.findElement(By.className('next-button'));
  await nextBtn.click();

  await TestHelper.safeWaitUntilStalenessOf(driver, dialog);

}

const waitUntilToastWithTextIsNotShown = async function (driver) {

  await driver.wait(until.elementLocated(
    By.className('p-toast p-component p-toast-center p-ripple-disabled')), ELEMENT_WAIT_MS);
  const toast = await driver.findElement(
    By.className('p-toast p-component p-toast-center p-ripple-disabled'));
  await driver.wait(until.elementTextIs(toast, ''), ELEMENT_WAIT_MS);

}