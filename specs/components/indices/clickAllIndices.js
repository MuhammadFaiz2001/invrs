const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../../conf/base.conf');
const Navigation = require('../../components/Navigation');
var assert = require('assert');

const clickAllIndices = {
    
    clickAllIndex: async function (driver) {
        const indicesDiv = await driver.wait(until.elementLocated(By.className('indices-container')), ELEMENT_WAIT_MS);
        for(let i = 1; i <= 4; i++){
            const index = await indicesDiv.findElement(By.xpath('//div['+i+']'));
            const companyName = await index.findElement(By.className('display-name'));
            let name = await companyName.getText();
            await companyName.click();
            const loadingDiv = By.className('highcharts-color-undefined highcharts-series-0');
            await driver.wait(until.elementLocated(loadingDiv), ELEMENT_WAIT_MS);
            await checkIndicesClicked(driver, name);
            logger.debug('Clicked ' + name);
            await Navigation.goHome(driver);
        }

        logger.debug('Clicked all Indexes');
    },  
   
}

module.exports = { clickAllIndices };

const checkIndicesClicked = async function (driver, name) {
    const companyName = await driver.wait(until.elementLocated(By.className('company-name')), ELEMENT_WAIT_MS);
    await driver.wait(until.elementIsVisible(companyName), ELEMENT_WAIT_MS);
    let cName = await companyName.getText();
    assert(cName.includes(name));
};




