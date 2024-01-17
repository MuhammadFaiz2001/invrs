const Auth = require('../components/Auth.js');
const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../conf/base.conf');
const { ProfileNav } = require('../components/profile/ProfileNav');
const { ProfileGeneralCheck } = require('../components/profile/ProfileCheck.js')
const { ProfileSecurity } = require('../components/profile/ProfileSecurity.js')


const name = "Test: Profile Securities";
const summary = "Test Summary";
const runTests = async function (driver) {
    await Auth.login(driver);
    await ProfileNav.clickOnProfile(driver);
    await ProfileGeneralCheck.checkAvatar(driver);
    await ProfileGeneralCheck.checkBio(driver);
    await ProfileSecurity.clickOnSecurities(driver);
    await ProfileSecurity.checkSecurities(driver);
    await ProfileSecurity.unfollowSecurity(driver);
    await ProfileSecurity.unfollowSecurity(driver);
    await ProfileSecurity.searchForSecurity(driver, 'A');
}

module.exports = {
    name , runTests, summary
};

