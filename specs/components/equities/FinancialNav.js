const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../../conf/base.conf');

const FinancialNav = {
    switchToQuarterly: async function (driver) {
        waitUntilVisible(driver);
        //const button = await driver.findElement(By.xpath('//*[@id="app"]/div/div[2]/div[2]/div[3]/div[1]/div/div/div[1]/div[3]/div[1]/div/div[2]'));
                                                            //*[@id="app"]/div/div[2]/div[2]/div[3]/div[1]/div/div/div[1]/div[1]/div[1]/div/div
                                                            //*[@id="app"]/div/div[2]/div[2]/div[3]/div[1]/div/div/div[1]/div[1]/div[1]/div/div/div[2]
        const NavDiv = await driver.findElement(By.className('p-selectbutton p-buttonset p-component period-toggle'));
        const quarterlyButton = await NavDiv.findElement(By.xpath('./div[2]'));
        await quarterlyButton.click();
        //logger.debug(NavDiv);
        //await button.click();
         logger.debug('Switched to Quarter');
         //await driver.sleep(10000);
    },

    switchToAnnual: async function (driver) {
        waitUntilVisible(driver);
        //const button = await driver.findElement(By.xpath('//*[@id="app"]/div/div[2]/div[2]/div[3]/div[1]/div/div/div[1]/div[3]/div[1]/div/div[1]'));
        const NavDiv = await driver.findElement(By.className('p-selectbutton p-buttonset p-component period-toggle'));
        const annualButton = await NavDiv.findElement(By.xpath('./div[1]'));
        await annualButton.click();
        //await button.click();
        logger.debug('Switched to Annual');
        //await driver.sleep(10000);
   },
   clickMetrics: async function (driver) {
    await clickNavButton(driver, "Metrics");
     //await driver.sleep(10000);
   },
   clickIncomeStatement: async function (driver) {
    //await driver.sleep(10000);
    await clickNavButton(driver, "Income Statement");
   },
   clickBalanceSheet: async function (driver) {
    await clickNavButton(driver, "Balance Sheet");
     //await driver.sleep(0000);
   },
   clickCashFlowStatement: async function (driver) {
    //await driver.sleep(10000);
    await clickNavButton(driver, "Cash Flow Statement");
   
   },
   clickGrossMargin: async function(driver) {
    const grossMargin = await driver.findElement(By.xpath('//*[@id="finDataTable"]/div[1]/table/tbody/tr[9]'));
    await grossMargin.click();
    logger.debug('Selected gross income margin');
    },
    clickGrossMarginCompare: async function(driver){
        const searchButton =  await driver.findElement(By.id("metricSearchBar"));
        await searchButton.click();
        const listDiv = await driver.findElement(By.className("p-autocomplete-panel p-component p-ripple-disabled"));
        //await driver.sleep('500');
        const ULDiv = await listDiv.findElement(By.className("p-autocomplete-items"));
        const grossMargin = await ULDiv.findElement(By.xpath("//*[text()='Gross Income Margin']"))
        grossMargin.click();
        logger.debug("Selected gross income margin");
    },

   waitUntilVisible : async function (driver) {
    await waitUntilVisible(driver);
    },
   

}

module.exports = { FinancialNav };
const waitUntilVisible = async function (driver) {
    
    //const table = await driver.wait(until.elementLocated(By.className('data-point-table')), ELEMENT_WAIT_MS);
    await driver.sleep(5000);
    await driver.wait(until.elementLocated((By.className('p-frozen-column')), 10000));
    
    //await driver.sleep(10000);
    //await driver.wait(until.ExpectedConditions.invisibilityOfElementLocated(table.findElement(By.className('p-datatable-emptymessage'))), ELEMENT_WAIT_MS);
    //await driver.wait.until(ExpectedConditions.visibilityOfElementLocated(table.findElement(By.className('p-selectable-row'))));
    //logger.debug('waited ');
};
const clickNavButton = async function (driver, navButtontext) {

    // await waitUntilVisible(driver);
     //await driver.wait(1000);
     //Find Nav div
     const tabDiv = await driver.findElement(By.className('tab-div'));
     const navigationDiv = await tabDiv.findElement(By.className('navigation'));
     //const navigationDiv = await driver.findElement(By.xpath('//*[@id="app"]/div/div[2]/div[2]/div[3]/div[1]/div/div/div[1]/div[2]/div'));
     //Check if button is active
     const button = await navigationDiv.findElement(By.xpath("//*[text()='" + navButtontext + "']"));
     //await button.click();
     const buttonClassName = await button.getAttribute("class");
     const isButtonActive = buttonClassName.includes('active');
 
     if(isButtonActive){
         //if active display already clicked
         logger.debug(navButtontext + ' Already Selected' );
     }
     else{
         //Click Button if not clicked
         const button = await navigationDiv.findElement(By.xpath("//*[text()='" + navButtontext + "']"));
         await button.click();
         logger.debug('Clicked on ' + navButtontext);
     } 
 
 };
