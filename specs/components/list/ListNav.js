const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../../conf/base.conf');


const ListNav = {
    
    clickOnList: async function (driver) {
        const listBtnDiv= await driver.findElement(By.className('p-button p-component p-button-raised p-button-rounded'));
        const listBtn = await listBtnDiv.findElement(By.xpath('//a[@href="#/sandbox/lists"]'));
        await listBtn.click();
        logger.debug('clicked on Lists');
    },
    waitUntilVisible: async function(driver){
        const tableDiv = await driver.wait(until.elementLocated(By.className('p-paginator p-component p-paginator-bottom')), ELEMENT_WAIT_MS);
        await driver.wait(until.elementIsVisible(tableDiv), ELEMENT_WAIT_MS);
    },
    changeToDifferentMetric: async function(driver, nameOfMetric){
        //driver.executeScript("window.scrollBy(0,800)");
        const input = await driver.findElement(By.id('listMetricSearchBar'));
        await input.click();

        const autoCompleteDiv = await driver.wait(until.elementLocated(By.className('p-autocomplete-panel p-component p-ripple-disabled')), ELEMENT_WAIT_MS);
        await driver.wait(until.elementIsVisible(autoCompleteDiv), ELEMENT_WAIT_MS);
        
        const metric = await autoCompleteDiv.findElement(By.xpath("//*[text()='" + nameOfMetric + "']"));
        await metric.click();

        logger.debug('Changed to ' + nameOfMetric);
    }

}   

module.exports = { ListNav };