const { By } = require('selenium-webdriver');
 //const { ELEMENT_WAIT_MS, logger } = require('../../conf/base.conf');
 var assert = require('assert');
const { until } = require('selenium-webdriver');
const { logger } = require('../../../conf/base.conf');

 let stockName;
 const TableNav = {
     //stockName: String,
 
     clickOnStocks: async function(driver) {
        await driver.wait(until.elementsLocated(By.id('compDataTable')));
         const stocksDiv = await driver.findElement(By.id('compDataTable'));
         const tableDiv = await stocksDiv.findElement(By.className('p-datatable-wrapper'));
         const table = await tableDiv.findElement(By.className('p-datatable-table'));
         const tableBody = await table.findElement(By.className('p-datatable-tbody'));
         await driver.wait(until.elementIsVisible(tableBody));
         const rowToClick = await tableBody.findElement(By.xpath("./tr[2]"));
        await driver.wait(until.elementIsVisible(rowToClick));
         const filterText = await rowToClick.findElement(By.xpath('./td[1]'));
         await filterText.getText().then((text)=>{  stockName = text;});
         await rowToClick.click(); 
         logger.debug('Clicked on ' + stockName);
        
     },
        removeCompany: async function(driver) {
         const stocksDiv = await driver.findElement(By.id('compDataTable'));
         const tableDiv = await stocksDiv.findElement(By.className('p-datatable-wrapper'));
         const table = await tableDiv.findElement(By.className('p-datatable-table'));
         const tableBody = await table.findElement(By.className('p-datatable-tbody'));
         const rowToClick = await tableBody.findElement(By.xpath("./tr[2]"));
         const filterText = await rowToClick.findElement(By.xpath('./td[1]'));
         let stockRemoveName;
         await filterText.getText().then((text)=>{ stockRemoveName = text;});
         await rowToClick.click();
         assert(stockRemoveName == stockName);
         logger.debug( stockRemoveName + ' removed from chart');
     }
 };
 module.exports = { TableNav};