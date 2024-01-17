const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../../conf/base.conf');


const ProfileFollowing = {
    clickOnFollow: async function(driver){
        const navDiv = await driver.wait(until.elementLocated(By.className('pill-menu-bar sub-header')), ELEMENT_WAIT_MS);
        const nav = await navDiv.findElement(By.className('navigation'));
        const followButton = await nav.findElement(By.xpath('./button[3]/span'));
        await followButton.click();
        logger.debug('Clicked On Followers/Following')
    },
    checkFollowers: async function(driver){
        await driver.findElement(By.className('p-scrollpanel-content'));
        try{
            await driver.wait(until.elementLocated(By.className('user-list-item-container')), ELEMENT_WAIT_MS);
            logger.debug('Followers Exist');
        }
        catch(e){
            logger.debug('No Followers Exist For this User');
        }
    },
    checkFollowing: async function(driver){
        await driver.findElement(By.className('p-scrollpanel-content'));
        try{
            await driver.wait(until.elementLocated(By.className('user-list-item-container')), ELEMENT_WAIT_MS);
            logger.debug('Following Exist');
        }
        catch(e){
            logger.debug('User follows no one');
        }
    },
    clickOnFollowing: async function(driver){
        await clearSearchBar(driver);
        const navDiv = await driver.wait(until.elementLocated(By.className('p-selectbutton')), ELEMENT_WAIT_MS);
        const followingBtn = await navDiv.findElement(By.xpath('./div[2]/span'));
        try{
            await followingBtn.click();
            logger.debug('Clicked on Following');
        }
        catch(e){
            logger.debug('Following is already Clicked')
        }
    },
    clickOnFollower: async function(driver){
        await clearSearchBar(driver);
        const navDiv = await driver.wait(until.elementLocated(By.className('p-selectbutton')), ELEMENT_WAIT_MS);
        const followingBtn = await navDiv.findElement(By.xpath('./div[1]'));
        try{
            await followingBtn.click();
            logger.debug('Clicked on Followers');
        }
        catch(e){
            logger.debug('Followers is already Clicked')
        }
    },
    searchForUser: async function(driver, userName){
        const searchBar = await driver.wait(until.elementLocated(By.className('p-inputtext p-component search-bar search-bar')), ELEMENT_WAIT_MS);
        await searchBar.clear();
        searchBar.sendKeys(userName);
        try{
            await driver.wait(until.elementLocated(By.className('user-list-item-container')), ELEMENT_WAIT_MS);
            logger.debug('Found ' + userName + ' in follow');
            await searchBar.clear();
        }
        catch(e){
            logger.debug(userName + ' does not exist in list');
            await searchBar.clear();
        }
        await searchBar.clear();
    },
    goToProfile: async function(driver){
        const profileDiv = await driver.wait(until.elementLocated(By.className('user-list-item-container')), ELEMENT_WAIT_MS);
        const avatar = profileDiv.findElement(By.className('p-avatar'));
        await avatar.click();
    },
    unfollowUsers: async function(driver){
        await clearSearchBar(driver);
        const followBtn = await driver.wait(until.elementLocated(By.className('follow-button')), ELEMENT_WAIT_MS);
        await driver.wait(until.elementIsVisible(followBtn), ELEMENT_WAIT_MS);
        await followBtn.click();
        await driver.wait(until.elementLocated(By.className('p-toast-message-content')), ELEMENT_WAIT_MS);

        logger.debug('Clicked following Button')
    },
    followUser: async function(driver){
        try{
            const followButton = await driver.findElement(By.className('p-button p-component follow-button green-button__secondary'));
            await followButton.click();
            const noti = await driver.wait(until.elementLocated(By.className('p-toast-message-content')), ELEMENT_WAIT_MS);
            await driver.wait(until.elementIsNotVisible(noti), ELEMENT_WAIT_MS);
        }
        catch(e){
            //
        }
    }
}   

module.exports = { ProfileFollowing };

const clearSearchBar = async function(driver){
    const searchBar = await driver.wait(until.elementLocated(By.className('p-inputtext p-component search-bar search-bar')), ELEMENT_WAIT_MS);
    await searchBar.clear();
}