const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../../conf/base.conf');

const ScreenerList = {
    saveInList: async function(driver){
        //Click on symbols
        driver.executeScript("window.scrollBy(0,800)");
        const tableDiv = await driver.wait(until.elementLocated(By.className('qmod-table qmod-screener-results-table')), ELEMENT_WAIT_MS);
        const boxDiv = await tableDiv.findElement(By.className("v-input--selection-controls__input"));
        //const input = boxDiv.findElement(By.css('input'));
        //await driver.wait(until.elementIsVisible(input));
        // const actions = driver.actions({async: true});
        // await actions.moveToElement(input).click().perform();
        await boxDiv.click();

        //Save symbols to list
        const saveButtonDiv = await driver.findElement(By.className('v-tabs__div save-list-tab'));
        const saveBtn = await saveButtonDiv.findElement(By.className('v-btn v-btn--small theme--light primary'));
        await saveBtn.click();

        const searchList = await driver.wait(until.elementLocated(By.id('saveToListSearchBar')));
        await searchList.sendKeys('testing');

        const suggestion = await driver.wait(until.elementLocated(By.className('p-autocomplete-item')), ELEMENT_WAIT_MS);
        await suggestion.click();

        const saveButtonDiv1 = await driver.findElement(By.className('p-dialog-footer'));
        const saveButton = await saveButtonDiv1.findElement(By.className('p-button p-component action p-button-raised p-button-rounded'));
        try{
            await saveButton.click();
        }
        catch(e){
            await saveButton.click();
        }
        await driver.wait(until.elementLocated(By.className('p-toast-summary')), ELEMENT_WAIT_MS);
        logger.debug('Saved in list');
    }
}   

module.exports = { ScreenerList };