const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../../conf/base.conf');

const FundNav = {
    
    clickOverview: async function (driver) {
        await clickNavButton(driver, "Overview");
    },

    clickHolding: async function (driver) {
        await clickNavButton(driver, "Holdings");
    },

    clickDividends: async function (driver) {
        await clickNavButton(driver, "Dividends");
    },

    clickCharting: async function (driver) {
        await clickNavButton(driver, "Charting");
    },

    clickNotes: async function (driver) {
        await clickNavButton(driver, "Notes");
    }

}

module.exports = { FundNav };

const waitUntilVisible = async function (driver) {
    const waiter = await driver.wait(until.elementLocated(By.css('.logo-minquote-container')));
    await driver.wait(until.elementIsVisible(waiter), ELEMENT_WAIT_MS);
};

const clickNavButton = async function (driver, navButtontext) {

    await waitUntilVisible(driver);
    //Find Nav div
    const navigationDiv = await driver.findElement(By.css('.navigation'));
    //Check if button is active
    const link = await navigationDiv.findElement(By.linkText(navButtontext));
    const button = await link.findElement(By.xpath("./.."));
    const buttonClassName = await button.getAttribute("class");
    const isButtonActive = buttonClassName.includes('active');

    if(isButtonActive){
        //if active display already clicked
        logger.debug(navButtontext + ' Already Selected' );
    }
    else{
        //Click Button if not clicked
        const button = await navigationDiv.findElement(By.linkText(navButtontext));
        await button.click();
        logger.debug('Clicked on ' + navButtontext);
    }

};

