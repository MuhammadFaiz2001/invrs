const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../../conf/base.conf');
var assert = require('assert');

const FinancialChart = {
    checkChart: async function(driver) {
        //check if chart is displayed
        const loadingDiv = By.className('highcharts-color-undefined highcharts-series-0');
        await driver.wait(until.elementLocated(loadingDiv), 10000);
        //assert(chartBackground != null);
        logger.debug('Chart is displayed')
       },
       
   checkGrossMargin: async function(driver) {
    const textDiv = await driver.findElement(By.className('highcharts-legend-item highcharts-line-series highcharts-color-undefined highcharts-series-2'));
    const text = await textDiv.findElement(By.xpath("//*[text()='Gross Income Margin']"));
    //logger.debug(text.getText());

    const value = await text.getText();
    assert(value == 'Gross Income Margin');
    logger.debug('Gross Margin Income is drawn');
   },
}
module.exports = { FinancialChart };

