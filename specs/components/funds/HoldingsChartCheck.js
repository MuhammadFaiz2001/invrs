const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../../conf/base.conf');

const HoldingsChartCheck = {
    checkChart : async function(driver){
        await waitUntilVisible(driver);
        await driver.findElement(By.className('highcharts-legend-item highcharts-bubble-series'));
        logger.debug('Holding Chart is drawn');
    },
    checkChartReturn : async function(driver){
        await driver.findElement(By.className('highcharts-legend-item highcharts-line-series'));
        logger.debug('Return Chart is drawn');
    },
    checkTop10Holding : async function(driver){
        await driver.wait(until.elementLocated(By.id('DataTables_Table_0')), ELEMENT_WAIT_MS);
        logger.debug('Holding Top 10 table is drawn');
    },
    checkTop10Return : async function(driver){
        await driver.wait(until.elementLocated(By.id('DataTables_Table_1')), ELEMENT_WAIT_MS);
        logger.debug('Return Top 10 table is drawn');
    }

}

module.exports = { HoldingsChartCheck };

const waitUntilVisible = async function (driver) {
    // const chartDiv = await driver.wait(until.elementLocated(By.className('qmod-per-chart-canvas')), ELEMENT_WAIT_MS);

    // const legendsDiv = await chartDiv.wait(until.elementLocated(chartDiv.findElement(By.className('highcharts-container'))), ELEMENT_WAIT_MS);
    // await driver.wait(until.elementIsVisible(chartDiv.findElement(By.className('highcharts-container'))), ELEMENT_WAIT_MS);

    // const legends = await driver.wait(until.elementLocated(legendsDiv.findElement(By.className('highcharts-legend'))), ELEMENT_WAIT_MS);
    // await driver.wait(until.elementIsEnabled(legendsDiv.findElement(By.className('highcharts-legend'))),ELEMENT_WAIT_MS);

    // const legendApple = await legends.wait(until.elementLocated(By.xpath('./svg/g[6]/g/g/g[1]')));
    await driver.wait(until.elementLocated(By.className('highcharts-legend-item highcharts-bubble-series')), ELEMENT_WAIT_MS);
    await driver.wait(until.elementIsVisible(driver.findElement(By.className('highcharts-legend-item highcharts-bubble-series'))), ELEMENT_WAIT_MS);


    logger.debug('Charts are shown');
};