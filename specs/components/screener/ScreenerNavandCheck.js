const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger} = require('../../../conf/base.conf');

const ScreenerNavandCheck = {
        clickOnSandbox: async function(driver){
                await driver.wait(until.elementLocated(By.id('secQuickSearch')));
                await driver.wait(until.elementLocated(By.css('.search-container')));
                const navBar = await driver.wait(until.elementLocated(By.className('layout-menu')));
                const sandBoxBtn = await navBar.findElement(By.xpath('//a[@href="#/sandbox/screeners"]'));
                await sandBoxBtn.click();
                logger.debug('Clicked on Sandbox');
        },
        waitUntilVisible: async function(driver){
                try{
                        const criteria = await driver.wait(until.elementLocated(By.className('qmod-parencriteria')),ELEMENT_WAIT_MS);
                        await driver.wait(until.elementIsVisible(criteria),ELEMENT_WAIT_MS);
                }
                catch(e){
                        await driver.sleep(1000);
                }
                //await driver.wait(until.elementIsVisible(criteriaComponent));
                logger.debug('Screener is visible');
        } 
}   

module.exports = { ScreenerNavandCheck };