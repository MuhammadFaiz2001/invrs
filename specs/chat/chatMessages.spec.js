const Auth = require('../components/Auth.js');
const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../conf/base.conf');
const { Chat } = require('../components/chat/Chat');
const { ChatMessages } = require('../components/chat/ChatMessages');

const name = "Test: Chat Messages";
const summary = "Test Summary";

const runTests = async function (driver) {
    await Auth.login(driver);
    await Chat.confirmJoinedChannelExists(driver);
    await ChatMessages.openChat(driver, "test-chat");
    await ChatMessages.sendMessages(driver, "hello");
    await Chat.closeChat(driver);
    await Chat.confirmJoinedChannelExists(driver);
    await ChatMessages.openChat(driver, "to-join")
    await ChatMessages.checkMessagesAreShown(driver);
    await ChatMessages.clickOnFunds(driver);
    await ChatMessages.clickOnPeople(driver);
    await Chat.closeChat(driver);
}

module.exports = {
    name , runTests, summary
};

