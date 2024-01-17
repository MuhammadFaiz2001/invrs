const Auth = require('../components/Auth.js');
const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../conf/base.conf');
const { Chat } = require('../components/chat/Chat');
const { ChatMessages } = require('../components/chat/ChatMessages');
const { elementLocated } = require('selenium-webdriver/lib/until.js');

const name = "Chat Clean Up";
const summary = "Test Summary";

const runTests = async function (driver) {
    await Auth.login(driver);
    //await driver.sleep(10000);
    await Chat.confirmJoinedChannelExists(driver);
    try{
        await ChatMessages.openChat(driver, "test-DeleteChannel");
        await Chat.deleteChannel(driver);
    }
    catch(e){
        //
    }
    await openChannel(driver);
    try{
        await Chat.leaveChannel(driver);
    }
    catch(e){
        const goBack = await driver.findElement(By.className('material-icons-outlined go-back-icon'), ELEMENT_WAIT_MS);
        await goBack.click();
    }
    await openChannel(driver);
    try{
        await Chat.leaveChannel(driver);
    }
    catch(e){
        const goBack = await driver.findElement(By.className('material-icons-outlined go-back-icon'), ELEMENT_WAIT_MS);
        await goBack.click();
    }
    await Chat.closeChat(driver);

}

module.exports = {
    name , runTests, summary
};

const openChannel = async function(driver){
    await driver.sleep(500);
    const channel = await driver.wait(until.elementLocated(By.className('channel-item')), ELEMENT_WAIT_MS);
    await driver.wait(until.elementIsVisible(channel), ELEMENT_WAIT_MS);
    await driver.wait(until.elementIsEnabled(channel), ELEMENT_WAIT_MS);
    await channel.click();
    try{
        await driver.wait(until.elementLocated(By.className('p-toast-message-content')), ELEMENT_WAIT_MS);
        await driver.wait(until.elementIsNotVisible(By.className('p-toast-message-content')), ELEMENT_WAIT_MS);
    }
    catch(e){
        //
    }
}

