const { By, until } = require('selenium-webdriver');
//const { selenium } = require('selenium-webdriver');
//const { Executor } = require('selenium-webdriver/lib/command');
const { ELEMENT_WAIT_MS, logger } = require('../../conf/base.conf');
//var assert = require('assert');

const EquitySearch = {
    searchAndClickItem: async function(driver, searchText) {
        let exception = false;
        const searchBar = await driver.findElement(By.id('compSecSearch'));
        searchBar.sendKeys(searchText);
   
        const resultsDiv = await driver.wait(until.elementLocated(By.className('p-autocomplete-panel p-component p-ripple-disabled')), ELEMENT_WAIT_MS);
        const listDiv = await resultsDiv.findElement(By.className('p-autocomplete-items'));
        const result = await listDiv.findElement(By.className('p-autocomplete-item'));
        
        result.click();
        //await driver.wait(until.ele(By.className('loader-container')));
        const loadingDiv = await driver.wait(until.elementLocated(By.className('loader-container')));
        try{

            await driver.wait(until.elementIsNotVisible(loadingDiv));
            
        }
        catch(StaleElementReferenceError){
            logger.debug('Searched And Clicked On item');
            exception = true;
        }
        if(exception === false){
            logger.debug('Searched And Clicked On item');
        }
        

    }
    
};
module.exports = { EquitySearch };