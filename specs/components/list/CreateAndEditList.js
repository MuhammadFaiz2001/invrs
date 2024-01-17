const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../../conf/base.conf');
const { ListNav } = require('./ListNav');

const CreateAndEditList = {
    
    createList: async function(driver){
        const createListBtn = await driver.findElement(By.className('create-list-button'));
        await createListBtn.click();

        const listInput = await driver.findElement(By.className('create-new-list-input'));
        listInput.sendKeys(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));

        const saveBtn = await driver.findElement(By.className('accept'));
        await saveBtn.click();

        logger.debug('Created List');

    },
    addCompanies: async function(driver, stockName){
        const inputComp = await driver.findElement(By.id('listCompSecSearch'));
        inputComp.sendKeys(stockName);

        const autoCompleteDiv = await driver.wait(until.elementLocated(By.className('p-autocomplete-items')), ELEMENT_WAIT_MS);
        await driver.wait(until.elementIsVisible(autoCompleteDiv), ELEMENT_WAIT_MS);
        const firstChoice = await autoCompleteDiv.findElement(By.className('p-autocomplete-item'));
        await firstChoice.click();

        await ListNav.waitUntilVisible(driver);

        logger.debug('Added ' + stockName);
    },
    removeCompanies: async function(driver){
        const removeBtn = await driver.findElement(By.className('pi-trash'));
        removeBtn.click();
        
        logger.debug('Removed the first company');
    },
    addToChart: async function(driver, noOfComp){
        const tableDiv = await driver.wait(until.elementLocated(By.className('p-datatable-tbody')), ELEMENT_WAIT_MS);
        await driver.wait(until.elementIsVisible(tableDiv), ELEMENT_WAIT_MS);
        for(let i = 1; i <= noOfComp; i++)
        await driver.findElement(By.css('.p-datatable-tbody>tr:nth-child(' + i + ')')).click();

        logger.debug('All companies added to chart');
    },
    waitUntilVisible: async function(driver){
        const legend  = await driver.wait(until.elementLocated(By.className('highcharts-legend-item')), 20000);
        await driver.wait(until.elementIsVisible(legend));

        logger.debug('Chart is visible');
    }

}   

module.exports = { CreateAndEditList };