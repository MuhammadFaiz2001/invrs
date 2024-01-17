const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../../conf/base.conf');
var assert = require('assert');
let stockName;
const CompareChart = {
    checkChart: async function(driver) {
        //check if chart is displayed
        const loadingDiv = By.className('highcharts-color-undefined highcharts-series-0');
        await driver.wait(until.elementLocated(loadingDiv), 10000);
        //assert(chartBackground != null);
        logger.debug('Chart is displayed')
       },
       ExistInLegend: async function(driver, nameInLegend){
        //Gets the name of stock
        const stocksDiv = await driver.findElement(By.id('compDataTable'));
        const tableDiv = await stocksDiv.findElement(By.className('p-datatable-wrapper'));
        const table = await tableDiv.findElement(By.className('p-datatable-table'));
        const tableBody = await table.findElement(By.className('p-datatable-tbody'));
        const rowToClick = await tableBody.findElement(By.xpath("./tr[2]"));
        const filterText = await rowToClick.findElement(By.xpath('./td[1]'));
        await filterText.getText().then((text)=>{  stockName = text;});
    
        //checks if stock is drawn
        const textDiv = await driver.findElement(By.className('highcharts-legend-item highcharts-column-series highcharts-color-undefined highcharts-series-1'));
        const text = await textDiv.findElement(By.xpath("//*[text()='" + nameInLegend + "']"));
        const value = await text.getText();
        //logger.debug(stockName);
        assert(value == nameInLegend);
       
        logger.debug(nameInLegend + ' is drawn');
       }
}

module.exports = { CompareChart };