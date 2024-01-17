const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../../conf/base.conf');


const ProfileNav = {
    clickOnProfile: async function(driver) {
        await driver.wait(until.elementLocated(By.id('secQuickSearch')));
        await driver.wait(until.elementLocated(By.css('.search-container')));

        const topBarDiv = await driver.findElement(By.className("user-bar-container"));
        const profileDiv = await topBarDiv.findElement(By.xpath('//ul[2]'));
        const profile = await profileDiv.findElement(By.className('p-avatar p-component p-avatar-image p-avatar-circle md'));
        await profile.click();
        
        const profileMenuDiv = await driver.findElement(By.className('profile-menu fade-in-up'));
        const menuProfile = await profileMenuDiv.findElement(By.className('pi pi-user'));
        await menuProfile.click();
        logger.debug('Clicked on Profile');
    },
    followSecurity: async function(driver){
        try{
            const followButton = await driver.wait(until.elementLocated(By.className('p-button p-component follow-button green-button__secondary')), ELEMENT_WAIT_MS);
            await followButton.click();
        }
        catch(e){
            //
        }
        try{
            const noti = await driver.wait(until.elementsLocated(By.className('p-toast-summary')), ELEMENT_WAIT_MS);
            await driver.wait(until.elementIsNotVisible(noti), ELEMENT_WAIT_MS);
            await driver.wait(until.elementIsDisabled(noti), ELEMENT_WAIT_MS);
        }
        catch(e){
            //
        }
        await driver.sleep(10000);
    }

}   

module.exports = { ProfileNav };