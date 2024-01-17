const Auth = require('../components/Auth.js');
const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../conf/base.conf');
const { ProfileNav } = require('../components/profile/ProfileNav');
const { ProfileGeneralCheck } = require('../components/profile/ProfileCheck');
const { ProfileFeed } = require('../components/profile/ProfileFeeds');



const name = "Test: Profile Feed";
const summary = "The following test makes sure the feed shows up on the profile page";
const runTests = async function (driver) {
    await Auth.login(driver);
    await ProfileNav.clickOnProfile(driver);
    await ProfileGeneralCheck.checkAvatar(driver);
    await ProfileFeed.checkFeed(driver);
    //await ProfileFeed.scrollToTop(driver);
}

module.exports = {
    name , runTests, summary
};

