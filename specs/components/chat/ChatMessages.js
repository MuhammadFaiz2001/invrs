const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger} = require('../../../conf/base.conf');
const assert = require('assert');

const ChatMessages = {
    openChat: async function(driver, chatName){
        const channel = await driver.wait(until.elementLocated(By.xpath("//*[text()='"+ chatName +"']")), ELEMENT_WAIT_MS);
        await channel.click();

        const chatEditor = await driver.wait(until.elementLocated(By.className('chat-messenger-container')), ELEMENT_WAIT_MS);
        await driver.wait(until.elementIsVisible(chatEditor), ELEMENT_WAIT_MS);

        logger.debug('Opened ' + chatName);
    },
    sendMessages: async function(driver, message){
        const messageInput = await driver.findElement(By.className('ck-blurred ck ck-content ck-editor__editable ck-rounded-corners ck-editor__editable_inline'));
        const sendBtn = await driver.findElement(By.className('send-message-button'));
        //chat editor buttons
        const picture = await driver.findElement(By.className('ck-file-dialog-button'));
        const urlLink = await driver.findElement(By.className('ck ck-dropdown'));
        const emojiBtn = await driver.wait(until.elementLocated(By.xpath('//*[@class="ck ck-dropdown"][2]')), ELEMENT_WAIT_MS);

        //Send Message
        await messageInput.sendKeys(message);
        //If you type too fast website doesnt register the whole word
        await driver.sleep(1000);
        await sendBtn.click();
        logger.debug('Sent message');

        //Send Message with Pics
        await driver.sleep(500);
        const uploadInput = await picture.findElement(By.xpath("//input[@type='file']"));
        await driver.wait(until.elementIsEnabled(uploadInput), ELEMENT_WAIT_MS);
        await uploadInput.sendKeys('C:\\Users\\ltuser\\Downloads\\download.jpg');
       // await driver.wait(until.elementIsEnabled(sendBtn), ELEMENT_WAIT_MS);
        await sendBtn.click();
        logger.debug('Sent message with Pic');

        //send message with emoji
        await emojiBtn.click();
        const emojiList = await driver.wait(until.elementLocated(By.className('ck ck-character-grid__tiles')), ELEMENT_WAIT_MS);
        const emoji = await emojiList.findElement(By.xpath("//*[text()='👏']"))
        await emoji.click();
        await messageInput.sendKeys(message);
        await driver.sleep(1000);
        await sendBtn.click();
        logger.debug('Sent message with emoji');

        //send message with youtube link
        await urlLink.click();
        const urlInput = await driver.wait(until.elementLocated(By.className('ck-input-text')), ELEMENT_WAIT_MS);
        await urlInput.sendKeys('https://www.youtube.com/watch?v=ldX-ab758l8&ab_channel=Apple');
        const confirmBtn = await driver.findElement(By.className('ck-button-save'));
        await confirmBtn.click();
        await sendBtn.click();
        logger.debug('Sent message with youtube link');

        //send message with mention
        await messageInput.sendKeys('@tester');
        const suggestion = await driver.wait(until.elementLocated(By.className('item-row')), ELEMENT_WAIT_MS);
        await driver.wait(until.elementIsVisible(suggestion), ELEMENT_WAIT_MS);
        await suggestion.click();
        await sendBtn.click();
        logger.debug('Sent message with mention');
    },
    checkMessagesAreShown: async function(driver){
        const otherMessage = await driver.wait(until.elementLocated(By.className('other-message')), ELEMENT_WAIT_MS);
        assert(otherMessage != null);
        logger.debug('Other peoples messages are shown');
    },
    clickOnFunds: async function(driver){
        const fundsLink = await driver.wait(until.elementLocated(By.className('mention security-mention')), ELEMENT_WAIT_MS);
        await fundsLink.click();

        await driver.wait(until.elementLocated(By.className('card security-overview-chart-card no-bottom-padding')), ELEMENT_WAIT_MS);

        logger.debug('Clicked on Funds/Overview');
    },
    clickOnPeople: async function(driver){
        const fundsLink = await driver.wait(until.elementLocated(By.className('mention analyst-mention')), ELEMENT_WAIT_MS);
        await fundsLink.click();

        await driver.wait(until.elementLocated(By.className('p-avatar-circle xl')), ELEMENT_WAIT_MS);

        logger.debug('Clicked on User');
    },
    expandImages: async function(driver){
        const image = await driver.findElement(By.className('wide-image'));
        await image.click();
        logger.debug('Images is expanded');

        //close image
        const closeBtn = await driver.wait(until.elementLocated(By.className('p-dialog-header-close')), ELEMENT_WAIT_MS);
        await closeBtn.click();
        const exitChatBtn = await driver.wait(until.elementLocated(By.className('p-sidebar-close-icon pi pi-times')), ELEMENT_WAIT_MS);
        await driver.wait(until.elementIsVisible(exitChatBtn), ELEMENT_WAIT_MS);
    }
}

module.exports = { ChatMessages };

