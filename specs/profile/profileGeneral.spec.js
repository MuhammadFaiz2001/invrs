const Auth = require('../components/Auth.js');
const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../conf/base.conf');
const { ProfileNav } = require('../components/profile/ProfileNav');
const { ProfileGeneralCheck } = require('../components/profile/ProfileCheck.js')


const name = "Test: Profile General";
const summary = "Test Summary";
const runTests = async function (driver) {
    await Auth.login(driver);
    await ProfileNav.clickOnProfile(driver);
    await ProfileGeneralCheck.checkAvatar(driver);
    await ProfileGeneralCheck.checkBio(driver);
    await ProfileGeneralCheck.checkNotes(driver);
    await ProfileGeneralCheck.checkLikes(driver);
    await ProfileGeneralCheck.checkFollowers(driver); 
    await ProfileGeneralCheck.checkFollowing(driver); 
    await ProfileGeneralCheck.checkInterest(driver); 
}

module.exports = {
    name , runTests, summary
};

