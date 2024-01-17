const Auth = require('../components/Auth.js');
const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../conf/base.conf');
const { sectors } = require('../components/sectorandFactor/sectors')

const name = "Test: Click Sector Performances";
const summary = "The following test Clicks all the sector performers on the home page";
const runTests = async function (driver) {
    await Auth.login(driver);
    await sectors.clickAllSectors(driver);
}

module.exports = {
    name , runTests, summary
};
