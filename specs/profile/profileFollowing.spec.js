const Auth = require('../components/Auth.js');
const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../conf/base.conf');
const { ProfileNav } = require('../components/profile/ProfileNav')
const { ProfileGeneralCheck } = require('../components/profile/ProfileCheck')
const { ProfileFeed } = require('../components/profile/ProfileFeeds');
const { ProfileFollowing } = require('../components/profile/ProfileFollowing');


const name = "Test: Profile Following";
const summary = "THe following test, tests following on the profile page";
const runTests = async function (driver) {
    await Auth.login(driver);
    await ProfileNav.clickOnProfile(driver);
    await ProfileGeneralCheck.checkAvatar(driver);
    await ProfileFeed.checkFeed(driver);
    await ProfileFollowing.clickOnFollow(driver);
    await ProfileFollowing.checkFollowers(driver);
    await ProfileFollowing.clickOnFollowing(driver);
    await ProfileFollowing.checkFollowing(driver);
    await ProfileFollowing.clickOnFollowing(driver);

    await ProfileFollowing.goToProfile(driver);
    await ProfileGeneralCheck.checkAvatar(driver);
    await ProfileNav.clickOnProfile(driver);
    await ProfileFollowing.clickOnFollow(driver);
    await ProfileFollowing.clickOnFollowing(driver);
    await ProfileFollowing.searchForUser(driver, 'sdsd322');
    await ProfileFollowing.clickOnFollower(driver);
    await ProfileFollowing.searchForUser(driver, 'tester');

    await driver.navigate().refresh();
    await ProfileFollowing.clickOnFollow(driver);
    await ProfileFollowing.clickOnFollower(driver);
    await ProfileFollowing.unfollowUsers(driver);

    await ProfileFollowing.clickOnFollowing(driver);
    await ProfileFollowing.unfollowUsers(driver);
    
}

module.exports = {
    name , runTests, summary
};

