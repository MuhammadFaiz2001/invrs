const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../../conf/base.conf');


const ProfileSecurity= {
    clickOnSecurities: async function(driver){
        const navDiv = await driver.findElement(By.className('pill-menu-bar sub-header'));
        const nav = await navDiv.findElement(By.className('navigation'));
        const followButton = await nav.findElement(By.xpath('./button[4]/span'));
        await followButton.click();
        logger.debug('Clicked On Securities')
    },
    checkSecurities: async function(driver){
        await driver.wait(until.elementLocated(By.className('logo-wrapper')), ELEMENT_WAIT_MS);
        logger.debug('Securities are shown');
    },
    unfollowSecurity: async function(driver){
        const followBtn = await driver.wait(until.elementLocated(By.className('follow-button')), ELEMENT_WAIT_MS);
        await followBtn.click();
        await driver.wait(until.elementLocated(By.className('p-toast-message-content')), ELEMENT_WAIT_MS);

        logger.debug('Clicked Un follow Button')
    },
    searchForSecurity: async function(driver, userName){
        const searchBar = await driver.wait(until.elementLocated(By.className('p-inputtext p-component search-bar search-bar')), ELEMENT_WAIT_MS);
        await searchBar.clear();
        searchBar.sendKeys(userName);
        try{
            await driver.wait(until.elementLocated(By.className('security-list-item-container')), ELEMENT_WAIT_MS);
            logger.debug('Found ' + userName + ' in Security');
        }
        catch(e){
            logger.debug(userName + ' does not exist in list');
        }
        await searchBar.clear();
    },

}   

module.exports = { ProfileSecurity };