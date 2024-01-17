const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../../conf/base.conf');
const Navigation = require('../Navigation');
var assert = require('assert');

const sectors = {
    
    clickAllSectors: async function (driver) {
        const sectorDiv = await driver.wait(until.elementLocated(By.className('sector-performance')), ELEMENT_WAIT_MS);
        for(let i = 2; i <= 12; i++){
            const sector = await sectorDiv.findElement(By.xpath('//div['+i+']'));
            const companyName = await sector.findElement(By.className('display-name'));
            let name = await companyName.getText();
            await companyName.click();
            const loadingDiv = By.className('highcharts-color-undefined highcharts-series-0');
            await driver.wait(until.elementLocated(loadingDiv), ELEMENT_WAIT_MS);
            await checkSectorClicked(driver, name);
            logger.debug('Clicked ' + name);
            await Navigation.goHome(driver);
        }

        logger.debug('Clicked all Sectors');
    },  
   
}

module.exports = { sectors };

const checkSectorClicked = async function (driver, name) {
    const companyName = await driver.wait(until.elementLocated(By.className('company-name')), ELEMENT_WAIT_MS);
    await driver.wait(until.elementIsVisible(companyName), ELEMENT_WAIT_MS);
    let cName = await companyName.getText();
    assert(cName.includes(name));
};




