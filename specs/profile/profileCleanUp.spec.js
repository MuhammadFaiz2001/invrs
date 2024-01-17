const Auth = require('../components/Auth.js');
const Actions = require('../components/Actions.js');
const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../conf/base.conf');
const { ProfileNav } = require('../components/profile/ProfileNav')
const { ProfileGeneralCheck } = require('../components/profile/ProfileCheck')
const { ProfileEdit } = require('../components/profile/ProfileEdit');
const { ProfileFollowing } = require('../components/profile/ProfileFollowing');

const name = "Profile Clean Up";
const summary = "Test Summary";
const runTests = async function (driver) {
    await Auth.login(driver);
    await ProfileNav.clickOnProfile(driver);
    await ProfileFollowing.clickOnFollow(driver);
    await ProfileFollowing.followUser(driver);
    await Actions.searchForStockBySymbol('A', driver);
    await ProfileNav.followSecurity(driver);
    await Actions.searchForStockBySymbol('G', driver);
    await ProfileNav.followSecurity(driver);
    await Actions.searchForStockBySymbol('H', driver);
    await ProfileNav.followSecurity(driver);


}
module.exports = {
    name , runTests, summary
};

