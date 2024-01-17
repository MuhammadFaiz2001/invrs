const Auth = require('../components/Auth.js');
const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../conf/base.conf');
const { Chat } = require('../components/chat/Chat');
const { ChatMessages } = require('../components/chat/ChatMessages');

const name = "Test: Chat Images";
const summary = "Test Summary";

const runTests = async function (driver) {
    await Auth.login(driver);
    await Chat.confirmJoinedChannelExists(driver);
    await ChatMessages.openChat(driver, "to-join")
    await ChatMessages.checkMessagesAreShown(driver);
    await ChatMessages.expandImages(driver);
    await Chat.closeChat(driver);

}

module.exports = {
    name , runTests, summary
};

