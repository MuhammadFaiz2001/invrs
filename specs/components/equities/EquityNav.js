const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../../conf/base.conf');

const EquityNav = {
    
    clickOverview: async function (driver) {
        await clickNavButton(driver, "Overview");
    },

    clickFinancials: async function (driver) {
        await clickNavButton(driver, "Financials");
    },

    clickCompare: async function (driver) {
        await clickNavButton(driver, "Compare");
    },

    clickInsiders: async function (driver) {
        await clickNavButton(driver, "Insiders");
    },

    clickCharting: async function (driver) {
        await clickNavButton(driver, "Charting");
    },
    
    clickDividends: async function (driver) {
        await clickNavButton(driver, "Dividends");
    },

    clickNotes: async function (driver) {
        await clickNavButton(driver, "Notes");
    }

}

module.exports = { EquityNav };

const waitUntilVisible = async function (driver) {
    await driver.wait(until.elementLocated(By.css('.logo-minquote-container')), ELEMENT_WAIT_MS);
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

