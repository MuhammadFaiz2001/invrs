const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../../conf/base.conf');

const OverviewChartCheck = {
     confirmCanSeeOverviewChart : async function (driver) {

        await driver.wait(until.elementLocated(By.css('.qmod-simplechart')), ELEMENT_WAIT_MS);
        logger.debug('Confirmed Overview chart visible');
    },
    
     confirmCanSeeFundInvestmentObjective : async function (driver) {
    
        await driver.wait(until.elementLocated(By.css('.qmod-fund-strat')), ELEMENT_WAIT_MS);
        logger.debug('Confirmed Fund Investment Objective visible');
    },
    
     confirmCanSeeFundOverviewStats : async function (driver) {
    
        await driver.wait(until.elementLocated(By.id('fund-overview-fund-stats')), ELEMENT_WAIT_MS);
        logger.debug('Confirmed Fund Overview Stats visible');
    },
      
       confirmCanSeeFundPerfChart : async function (driver) {
      
        await driver.wait(until.elementLocated(By.css('.fundperformance-chart')), ELEMENT_WAIT_MS);
        logger.debug('Confirmed Fund Perf Chart visible');
    },
      
       confirmCanSeeFundFeed : async function (driver) {
      
        await driver.wait(until.elementLocated(By.css('.activity-block')), ELEMENT_WAIT_MS);
        logger.debug('Confirmed Fund Feed visible');
    },
    
       confirmCanSeeAllocations : async function (driver) {
        await driver.wait(until.elementLocated(By.id('fund-sector-allocation-chart')));
        logger.debug('Confirmed Sector/Country/Asset Allocation');
    }
      
}

module.exports = { OverviewChartCheck };