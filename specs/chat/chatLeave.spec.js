const Auth = require('../components/Auth.js');
const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../conf/base.conf');
const { Chat } = require('../components/chat/Chat');
const { ChatMessages } = require('../components/chat/ChatMessages');

const name = "Test: Chat Leave";
const summary = "Test Summary";

const runTests = async function (driver) {
    await Auth.login(driver);
    //await driver.sleep(10000);
    await Chat.confirmJoinedChannelExists(driver);
    await Chat.confirmRecommendedChannelExist(driver);
    await Chat.joinChannel(driver);
    await Chat.leaveChannel(driver);
    await Chat.closeChat(driver);

}

module.exports = {
    name , runTests, summary
};

