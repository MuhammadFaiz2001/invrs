const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../../conf/base.conf');
var assert = require('assert');


const ProfileFeed = {
    checkFeed: async function(driver){
        try{
        const postDiv = await driver.wait(until.elementLocated(By.className('status-post-owner-info')), ELEMENT_WAIT_MS);
        assert(postDiv != null);
        logger.debug('Feed Exists');
        }
        catch(e){
            logger.debug('No Feed');
        }
    },
    scrollToTop: async function(driver){
        //driver.executeScript("window.scrollBy(0,800)");
        
        let elementH = await driver.wait(until.elementIsVisible(By.css('.left-col')), ELEMENT_WAIT_MS)[-1];
        driver.executeScript("arguments[0].scrollIntoView(true);", elementH);

        const scrollTopBtn = await driver.wait(until.elementLocated(By.className('p-scrolltop-sticky')), ELEMENT_WAIT_MS);
        await scrollTopBtn.click();
        logger.debug('Scrolled to Top');
    }
}   

module.exports = { ProfileFeed };