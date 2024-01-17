const Auth = require('../components/Auth.js');
const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../conf/base.conf');
const { Chat } = require('../components/chat/Chat');

const name = "Test: Chat My Channels";
const summary = "Test Summary";
const runTests = async function (driver) {
    await Auth.login(driver);
    await Chat.confirmJoinedChannelExists(driver);

}

module.exports = {
    name , runTests, summary
};

