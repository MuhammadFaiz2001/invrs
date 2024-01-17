const { By, until, Key } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../../conf/base.conf');
const TestHelper = require('../TestHelper');

const GroupEditProfileDialog = {

  addImageBioAndSave: async function (driver, bio) {

    await addProfileImage(driver, 'C:\\Users\\ltuser\\Downloads\\download.jpg');

    const bioInput = await driver.findElement(By.id('bio'));
    await bioInput.sendKeys(bio);

    await clickSave(driver);

    logger.debug('Added group profile image, bio and saved');

  },

  editImageNameBioAndSave: async function (driver, edit, browserName) {

    await addProfileImage(driver, 'C:\\Users\\ltuser\\Downloads\\invrs-logo.png');

    const nameInput = await driver.findElement(By.id('name'));
    await clearInputContent(nameInput, browserName);
    await nameInput.sendKeys(edit.name);

    const bioInput = await driver.findElement(By.id('bio'));
    await clearInputContent(bioInput, browserName);
    await bioInput.sendKeys(edit.bio);

    await clickSave(driver);

    logger.debug('Edited group profile image, name, bio and saved');

  }

}

module.exports = { GroupEditProfileDialog };

const clickSave = async function (driver) {

  const saveBtn = await driver.findElement(By.className('action-button accept'));
  await saveBtn.click();

  await TestHelper.safeWaitUntilStalenessOf(driver, saveBtn);

  await waitUntilToastWithTextIsNotShown(driver);

}

const clearInputContent = async function (editor, browserName) {

  const key = browserName == 'Safari' ? Key.COMMAND : Key.CONTROL;
  await editor.sendKeys(key + 'a');
  await editor.sendKeys(Key.BACK_SPACE);

};

const addProfileImage = async function (driver, src) {

  await driver.wait(until.elementLocated(By.xpath(".//input[@type='file']")), ELEMENT_WAIT_MS);
  const profileImageFile = await driver.findElement(By.xpath(".//input[@type='file']"));
  await profileImageFile.sendKeys(src);

  await driver.wait(until.elementLocated(By.id('userProfilePicture')), ELEMENT_WAIT_MS);
  const profileImageEl = await driver.findElement(By.id('userProfilePicture'));
  await driver.wait(until.elementIsVisible(profileImageEl), ELEMENT_WAIT_MS);

};

const waitUntilToastWithTextIsNotShown = async function (driver) {

  await driver.wait(until.elementLocated(
    By.className('p-toast p-component p-toast-center p-ripple-disabled')), ELEMENT_WAIT_MS);
  const toast = await driver.findElement(
    By.className('p-toast p-component p-toast-center p-ripple-disabled'));
  await driver.wait(until.elementTextIs(toast, ''), ELEMENT_WAIT_MS);

}