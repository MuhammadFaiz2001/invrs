const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../../conf/base.conf');
const TestHelper = require('../TestHelper');
const assert = require('assert');

const GroupProfile = {

  clickFinishGroupSetup: async function (driver) {

    await driver.wait(until.elementLocated(By.className('p-button p-component green-button__primary')), ELEMENT_WAIT_MS);
    const finishGroupSetupBtn = await driver.findElement(By.className('p-button p-component green-button__primary'));
    await finishGroupSetupBtn.click();

    logger.debug('Clicked finish group setup');

  },

  confirmGroupProfileIsUpdated: async function (driver, name, bio) {

    await driver.wait(until.elementLocated(By.className('card group-profile')), ELEMENT_WAIT_MS);
    const groupProfile = await driver.findElement(By.className('card group-profile'));

    const groupNameHeader = await groupProfile.findElement(By.className('header-text'));
    const groupNameHeaderText = await groupNameHeader.getText();

    assert(groupNameHeaderText == name);

    const groupBioLabel = await groupProfile.findElement(By.className('bio-text'));
    const groupBioLabelText = await groupBioLabel.getText();

    assert(groupBioLabelText == bio);

    logger.debug('Confirmed group profile is updated');

  },

  openGroupEditProfileDialog: async function (driver) {

    await driver.wait(until.elementLocated(By.className('card group-profile')), ELEMENT_WAIT_MS);
    const groupProfile = await driver.findElement(By.className('card group-profile'));

    const optionsBtn = await groupProfile.findElement(By.className('pi-ellipsis-h p-button-icon'));
    await optionsBtn.click();

    const editIcon = await driver.findElement(By.className('p-menuitem-icon pi pi-pencil'));
    await editIcon.click();

    await TestHelper.safeWaitUntilStalenessOf(driver, editIcon);

    logger.debug('Opened group edit profile dialog');

  },

  deleteGroup: async function (driver) {

    await driver.wait(until.elementLocated(By.className('card group-profile')), ELEMENT_WAIT_MS);
    const groupProfile = await driver.findElement(By.className('card group-profile'));

    const optionsBtn = await groupProfile.findElement(By.className('pi-ellipsis-h p-button-icon'));
    await optionsBtn.click();

    const trashIcon = await driver.findElement(By.className('pi-trash'));
    await trashIcon.click();

    await TestHelper.safeWaitUntilStalenessOf(driver, trashIcon);

    const acceptBtn = await driver.findElement(By.className('p-button accept'));
    await acceptBtn.click();

    await TestHelper.safeWaitUntilStalenessOf(driver, acceptBtn);
    await TestHelper.safeWaitUntilStalenessOf(driver, groupProfile);

    logger.debug('Deleted group');

  },

  leaveGroup: async function (driver) {

    await driver.wait(until.elementLocated(By.className('card group-profile')), ELEMENT_WAIT_MS);
    const groupProfile = await driver.findElement(By.className('card group-profile'));

    const optionsBtn = await groupProfile.findElement(By.className('pi-ellipsis-h p-button-icon'));
    await optionsBtn.click();

    const leaveGroupIcon = await driver.findElement(By.className('p-menuitem-icon pi pi-sign-out'));
    await leaveGroupIcon.click();

    await TestHelper.safeWaitUntilStalenessOf(driver, leaveGroupIcon);

    const acceptBtn = await driver.findElement(By.className('p-button accept'));
    await acceptBtn.click();

    await TestHelper.safeWaitUntilStalenessOf(driver, acceptBtn);
    await TestHelper.safeWaitUntilStalenessOf(driver, groupProfile);

    const groupActionsContainer = await driver.findElement(By.className('group-actions-container'));
    assert(groupActionsContainer);

    logger.debug('Left group, redirected to the groups home page');

  },

  confirmLeaveGroupOptionDoesNotExist: async function (driver) {

    await driver.wait(until.elementLocated(By.className('card group-profile')), ELEMENT_WAIT_MS);
    const groupProfile = await driver.findElement(By.className('card group-profile'));

    const optionsBtn = await groupProfile.findElement(By.className('pi-ellipsis-h p-button-icon'));
    await optionsBtn.click();
    await driver.sleep(200);

    const leaveGroupIconElements = await driver.findElements(By.className('p-menuitem-icon pi pi-sign-out'));

    assert(leaveGroupIconElements.length == 0);

    await optionsBtn.click();

    logger.debug('Confirmed leave group option does not exist');

  },

  joinGroup: async function (driver) {

    await driver.wait(until.elementLocated(By.className('card group-profile')), ELEMENT_WAIT_MS);
    const groupProfile = await driver.findElement(By.className('card group-profile'));

    const joinBtn = await groupProfile.findElement(By.className('p-button p-component green-button__primary'));
    await joinBtn.click();

    await driver.wait(until.elementLocated(By.className('pi-plus p-button-icon p-button-icon-left')), ELEMENT_WAIT_MS);

    logger.debug('Joined group from group profile');

  },

  openGroupInviteDialog: async function (driver) {

    await driver.wait(until.elementLocated(By.className('card group-profile')), ELEMENT_WAIT_MS);
    const groupProfile = await driver.findElement(By.className('card group-profile'));

    const inviteBtn = await groupProfile.findElement(By.className('p-button p-component green-button__primary'));
    await inviteBtn.click();

    await driver.wait(until.elementLocated(By.className('invite-friends-modal')), ELEMENT_WAIT_MS);

    logger.debug('Opened group invite dialog');

  },

  waitForGroupProfile: async function (driver) {

    try {
      await driver.wait(until.elementLocated(By.className('card group-profile')), ELEMENT_WAIT_MS);
    } catch (e) {
      await driver.sleep(10000);
    }

    logger.debug('Waited for group profile');

  },

}

module.exports = { GroupProfile };