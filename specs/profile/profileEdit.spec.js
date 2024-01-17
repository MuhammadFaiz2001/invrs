const Auth = require('../components/Auth.js');
const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../conf/base.conf');
const { ProfileNav } = require('../components/profile/ProfileNav')
const { ProfileGeneralCheck } = require('../components/profile/ProfileCheck')
const { ProfileEdit } = require('../components/profile/ProfileEdit');



const name = "Test: Profile Edit";
const summary = "Test Summary";
const runTests = async function (driver) {
    await Auth.login(driver);
    await ProfileNav.clickOnProfile(driver);
    await ProfileGeneralCheck.checkAvatar(driver);
    await ProfileEdit.changingAvatar(driver);
    await ProfileEdit.editName(driver);
    await ProfileEdit.editUsername(driver);
    await ProfileEdit.editBio(driver);
    await ProfileEdit.updateInterests(driver);
    await ProfileEdit.saveProfile(driver);
}

module.exports = {
    name , runTests, summary
};

