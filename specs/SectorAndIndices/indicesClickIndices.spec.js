const Auth = require('../components/Auth.js');
const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../conf/base.conf');
const { clickAllIndices } = require('../components/indices/clickAllIndices')

const name = "Test: Click Indices";
const summary = "The following test click all the indices on the home page";
const runTests = async function (driver) {
    await Auth.login(driver);
    await clickAllIndices.clickAllIndex(driver);
}

module.exports = {
    name , runTests, summary
};
