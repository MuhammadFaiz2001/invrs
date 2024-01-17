const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../../conf/base.conf');
var assert = require('assert');

const ScreenerCustom = {
    createCustomScreener: async function(driver){
        const criteriaDiv = await driver.findElement(By.className('qmod-main-critera'));
        await criteriaDiv.findElement(By.xpath("//*[contains(text(),'Company Basics')]")).click();

        await driver.wait(until.elementLocated(By.id('exchangeGroups1'))).click();
        const addFilterDiv = await driver.findElement(By.className('qmod-cri-buttons'));
        await addFilterDiv.findElement(By.className('v-btn__content')).click();

        //click save
        const saveBtnDiv = await driver.findElement(By.className('qmod-side-btns'));
        const saveBtn = await saveBtnDiv.findElement(By.className('v-btn v-btn--small theme--light primary'));
        await saveBtn.click();
        try{
        const loadingDiv = await driver.wait(until.elementLocated(By.xpath("//*[text()='Loading...']")), ELEMENT_WAIT_MS);
        await driver.wait(until.elementIsNotVisible(loadingDiv));
        }
        catch(e){
            //
        }

        //enter Screen Name
        const labelDiv = await driver.wait(until.elementLocated(By.className('v-input v-text-field theme--light')));
        await driver.wait(until.elementIsVisible(labelDiv), ELEMENT_WAIT_MS);
        await driver.wait(until.elementIsEnabled(labelDiv), ELEMENT_WAIT_MS);
        const labelInput = await driver.findElement(By.className('v-text-field__slot'));
        const label = await labelInput.findElement(By.css('input'));
        await driver.wait(until.elementIsVisible(label), ELEMENT_WAIT_MS);
        
        await label.sendKeys(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));

        //save Button
        const saveDiv = await driver.wait(until.elementLocated(By.className('v-card__actions')), ELEMENT_WAIT_MS);
        await saveDiv.findElement(By.className('v-btn v-btn--small theme--light primary')).click();

        logger.debug('Created Screen');
    },
    useSavedScreener: async function(driver){

        const saveBtnDiv = await driver.findElement(By.className('qmod-side-btns'));
        await saveBtnDiv.findElement(By.xpath('./button[2]/div')).click();

        //click saved screener
        const screenerDiv = await driver.wait(until.elementLocated(By.className('v-list v-list--dense v-list--three-line theme--light')));
        const screener =await screenerDiv.findElement(By.className('v-list__tile__title'));
        await driver.wait(until.elementIsVisible(screener), ELEMENT_WAIT_MS);
        await screener.click();

        //check if clicked
        const criteriaDiv = await driver.wait(until.elementLocated(By.className('qmod-tr1')), ELEMENT_WAIT_MS);
        await driver.wait(until.elementIsVisible(criteriaDiv), ELEMENT_WAIT_MS);
        assert(criteriaDiv != null);

        logger.debug('Click on saved Screener');
    }
}   

module.exports = { ScreenerCustom };