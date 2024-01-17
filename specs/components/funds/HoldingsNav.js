const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../../conf/base.conf');

const HoldingsNav = {
    switchToReturns: async function(driver){
        waitUntilVisible(driver);
        const tabDiv = await driver.wait(until.elementLocated(By.className('qmod-tab-list')), ELEMENT_WAIT_MS);
        const returnsButton = await tabDiv.findElement(By.xpath('./li'));
        const clicked = await returnsButton.getAttribute("class");
        if(clicked.includes('active')){
            logger.debug('Returns alreday clicked');
        }
        else{
            await returnsButton.click();
            logger.debug('Switched to Returns');
        }
    },
    switchToHoldings: async function(driver){
        waitUntilVisible(driver);
        const tabDiv = await driver.wait(until.elementLocated(By.className('qmod-tab-list')), ELEMENT_WAIT_MS);
        const returnsButton = await tabDiv.findElement(By.xpath('./li[2]'));
        const clicked = await returnsButton.getAttribute("class");
        if(clicked.includes('active')){
            logger.debug('Holdings alreday clicked');
        }
        else{
            await returnsButton.click();
            logger.debug('Switched to Holdings');
        }
    }

}

module.exports = { HoldingsNav };

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