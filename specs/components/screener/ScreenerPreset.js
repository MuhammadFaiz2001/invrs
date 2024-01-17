const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../../conf/base.conf');

const ScreenerPreset = {
      clickOnPresetScreens: async function(driver){
        const screenBtns = await driver.findElement(By.className('qmod-fixed-fixedFilters'));
        const presetScreensDiv = await screenBtns.findElement(By.className('qmod-side-btns'));
        const presetScreenBtn = await presetScreensDiv.findElement(By.className('v-btn'));
        await presetScreenBtn.click();

        //wait for preset screens
        const presetScreens = await driver.wait(until.elementLocated(By.className('v-expansion-panel')), ELEMENT_WAIT_MS);
        await driver.wait(until.elementIsVisible(presetScreens), ELEMENT_WAIT_MS);

        //click on A screen
        const screen = await presetScreens.findElement(By.xpath("//*[text()='Mid Cap Momentum']"));
        await screen.click();

        //select screener
        const button = await presetScreens.findElement(By.className('v-btn'));
        await driver.wait(until.elementIsVisible(button), ELEMENT_WAIT_MS);
        await driver.wait(until.elementIsEnabled(button),ELEMENT_WAIT_MS);
        await button.click();
        
        const loadingDiv = await driver.wait(until.elementLocated(By.xpath("//*[text()='Loading...']")), ELEMENT_WAIT_MS);
        await driver.wait(until.elementIsNotVisible(loadingDiv));
        

        //check if screen was loaded
        const criteriaDiv = await driver.wait(until.elementLocated(By.className('qmod-selectedcriteria')), ELEMENT_WAIT_MS);
        await driver.wait(until.elementIsVisible(criteriaDiv), ELEMENT_WAIT_MS);
        await criteriaDiv.findElement(By.className('qmod-criera-title'));
        await driver.wait(until.elementLocated(By.className('screener-row')));
        
        logger.debug('Clicked on a screen');
      }
}   

module.exports = { ScreenerPreset };