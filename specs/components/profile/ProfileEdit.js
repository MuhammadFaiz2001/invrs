const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../../conf/base.conf');


const ProfileEdit = {
    changingAvatar: async function(driver){
        await clickOnEdit(driver);
        try{
            const deleteBtn = await driver.wait(until.elementLocated(By.className('p-button p-component delete action-button')), ELEMENT_WAIT_MS);
            await deleteBtn.click();
        }
        catch(e){
            logger.debug('Profile Pic does not exist, adding a new one');
        }
        const uploadDiv = await driver.wait(until.elementLocated(By.className('p-button p-component action-button')), ELEMENT_WAIT_MS);
        const uploadInput = await uploadDiv.findElement(By.xpath("//input[@type='file']"));
        await uploadInput.sendKeys('C:\\Users\\ltuser\\Downloads\\download.jpg');
        logger.debug('Added a Profile Picture');
    },
    editName: async function(driver){
        const nameField = await driver.wait(until.elementLocated(By.id('name')), ELEMENT_WAIT_MS);
        await nameField.clear();
        await nameField.sendKeys('tester');
        logger.debug('Edit name');
    },
    editUsername: async function(driver){
        const usernameField = await driver.wait(until.elementLocated(By.id('username')), ELEMENT_WAIT_MS);
        await usernameField.clear();
        await usernameField.sendKeys('tester1');
        logger.debug('Edit Username');
    },
    editBio: async function(driver){
        const bioField = await driver.wait(until.elementLocated(By.id('bio')), ELEMENT_WAIT_MS);
        await bioField.clear();
        await bioField.sendKeys('tester testing for test using test profile');
        logger.debug('Edit Bio');
    },
    updateInterests: async function(driver){
        const updateButton = await driver.findElement(By.className('update-interests-button'));
        await updateButton.click();
        const tagsDiv = await driver.wait(until.elementLocated(By.className('investment-tags')), ELEMENT_WAIT_MS);
        await driver.wait(until.elementIsVisible(tagsDiv), ELEMENT_WAIT_MS);

        const tag = await tagsDiv.findElement(By.className('p-button p-component tag-button tag'))
        await tag.click();

        const doneDiv = await driver.findElement(By.className('p-dialog-footer'));
        const doneBtn = await doneDiv.findElement(By.className('p-button p-component action-button'));
        await doneBtn.click();

        logger.debug('Updated Interests');
    },
    saveProfile: async function(driver){
        const saveBtn = await driver.wait(until.elementLocated(By.className('p-button p-component action-button accept')), ELEMENT_WAIT_MS);
        await saveBtn.click();
        await driver.wait(until.elementLocated(By.className('p-toast-message-text')), ELEMENT_WAIT_MS);

    }


}   

module.exports = { ProfileEdit };

const clickOnEdit= async function(driver){
    const editButton = await driver.wait(until.elementLocated(By.className('edit-profile-button')), ELEMENT_WAIT_MS);
    await driver.wait(until.elementIsVisible(editButton), ELEMENT_WAIT_MS);
    await editButton.click();
}