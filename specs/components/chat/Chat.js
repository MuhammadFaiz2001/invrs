const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger} = require('../../../conf/base.conf');
const TestHelper = require('../TestHelper');
const assert = require('assert');

const Chat = {

  confirmChannelExistsAndIsNotSearchable: async function (driver, name) {

    await openChatDrawer(driver);

    assert(await isChatChannelExist(driver, name));

    logger.debug('Confirmed chat channel exists: ' + name);

    await confirmChannelIsNotSearchable(driver, name);

    const closeBtn = await driver.findElement(By.className('p-sidebar-close-icon'));
    await closeBtn.click();

    await TestHelper.safeWaitUntilStalenessOf(driver, closeBtn);

  },

  confirmChannelDoesNotExists: async function (driver, name) {

    await openChatDrawer(driver);

    assert(!(await isChatChannelExist(driver, name)));

    logger.debug('Confirmed chat channel does not exist: ' + name);

    const closeBtn = await driver.findElement(By.className('p-sidebar-close-icon'));
    await closeBtn.click();

    await TestHelper.safeWaitUntilStalenessOf(driver, closeBtn);

  },

  confirmJoinedChannelExists: async function(driver){
    await openChatDrawer(driver);
    await driver.wait(until.elementLocated(By.className('channel-title')), ELEMENT_WAIT_MS);

    logger.debug('Joined Channels Exist')

  },
  confirmRecommendedChannelExist: async function(driver){
      const chatNav = await driver.findElement(By.className('p-tabview-nav-content'));
      const reccomChannel = await chatNav.findElement(By.xpath('./ul/li[2]'))
      await reccomChannel.click();

      await driver.wait(until.elementLocated(By.className('channel-title')), ELEMENT_WAIT_MS);
      
      logger.debug('Recommended Channels Exist')
  },
  joinChannel: async function(driver){
    const channel = await driver.wait(until.elementLocated(By.className('channel-title')), ELEMENT_WAIT_MS);
    await channel.click();

    const joinBtn = await driver.wait(until.elementLocated(By.className('send-message-button')), ELEMENT_WAIT_MS);
    await joinBtn.click();

    const joinedNotification = await driver.wait(until.elementLocated(By.className('p-toast-summary')), ELEMENT_WAIT_MS);
    await driver.wait(until.elementIsVisible(joinedNotification), ELEMENT_WAIT_MS);

    logger.debug('Joined Channel');
  },
  closeChat: async function(driver){
    await driver.sleep(500);
    const closeBtn = await driver.wait(until.elementLocated(By.className('p-sidebar-close-icon')), ELEMENT_WAIT_MS);
    await driver.wait(until.elementIsVisible(closeBtn), ELEMENT_WAIT_MS);
    await driver.wait(until.elementIsEnabled(closeBtn), ELEMENT_WAIT_MS);
    await closeBtn.click();

    await TestHelper.safeWaitUntilStalenessOf(driver, closeBtn);
  },
  createChannel: async function(driver, channelName){
    const createChannelBtn = await driver.findElement(By.className('create-channel-icon'));
    await createChannelBtn.click();

    const channelNameInput = await driver.wait(until.elementLocated(By.id('channelNameInput')), ELEMENT_WAIT_MS);
    await channelNameInput.sendKeys(channelName);

    const createBtn = await driver.findElement(By.className('create-channel-button'));
    await createBtn.click();
  },
  deleteChannel: async function(driver){
    const moreOptionBtn = await driver.findElement(By.className('channel-options-icon'));
    await moreOptionBtn.click();

    const deleteBtn = await driver.wait(until.elementLocated(By.className('p-menuitem-icon pi pi-trash')), ELEMENT_WAIT_MS);
    await deleteBtn.click();

    const confirmBtn = await driver.wait(until.elementLocated(By.className('accept p-button-raised p-button-rounded')), ELEMENT_WAIT_MS);
    await confirmBtn.click();


    //Wait for the deleted or leave channel notification 
    try{
      const joinedNotication = await driver.wait(until.elementLocated('p-toast-message-icon pi pi-check'), ELEMENT_WAIT_MS);
      await driver.wait(until.elementIsNotVisible(joinedNotication), ELEMENT_WAIT_MS);
    }
    catch(e){
      //
    }
    logger.debug('Deleted channel');
  },
  leaveChannel: async function(driver){
    const moreOptionBtn = await driver.findElement(By.className('channel-options-icon'));
    await moreOptionBtn.click();

    const leaveBtn = await driver.wait(until.elementLocated(By.className('p-menuitem-icon pi pi-sign-out')), ELEMENT_WAIT_MS);
    await leaveBtn.click();

    const confirmBtn = await driver.wait(until.elementLocated(By.className('accept p-button-raised p-button-rounded')), ELEMENT_WAIT_MS);
    await confirmBtn.click();
    //Wait for the deleted or leave channel notification 
    try{
      const joinedNotication = await driver.wait(until.elementLocated('p-toast-message-icon pi pi-check'), ELEMENT_WAIT_MS);
      await driver.wait(until.elementIsNotVisible(joinedNotication), ELEMENT_WAIT_MS);
    }
    catch(e){
      //
    }
    this.confirmJoinedChannelExists(driver);
    logger.debug('Left channel');
  }

}

module.exports = { Chat };

const confirmChannelIsNotSearchable = async function (driver, name) {

  await driver.wait(until.elementLocated(By.id('appChatDrawer')), ELEMENT_WAIT_MS);
  const appChatDrawer = await driver.findElement(By.id('appChatDrawer'));

  const searchInput = await appChatDrawer.findElement(By.className('p-inputtext p-component search-bar'));
  await searchInput.sendKeys(name);
  await driver.sleep(500);

  const scrollPanel = await appChatDrawer.findElement(By.className('p-scrollpanel-content'));
  const scrollPanelText = await scrollPanel.getText();
  assert(scrollPanelText == '');

  logger.debug('Confirmed chat channel is not searchable: ' + name);

}

const openChatDrawer = async function (driver) {

  await driver.sleep(10000);
  await driver.wait(until.elementLocated(By.className('chat-floating-button')), ELEMENT_WAIT_MS);
  const chatBtn = await driver.findElement(By.className('chat-floating-button'));
  await driver.wait(until.elementIsVisible(chatBtn), ELEMENT_WAIT_MS);
  await chatBtn.click();
  await driver.sleep(500);

}

const isChatChannelExist = async function (driver, name) {

  await driver.wait(until.elementLocated(By.id('appChatDrawer')), ELEMENT_WAIT_MS);
  const appChatDrawer = await driver.findElement(By.id('appChatDrawer'));
  const loaderContainer = await appChatDrawer.findElement(By.className('loader-container'));
  await driver.wait(until.elementIsNotVisible(loaderContainer), ELEMENT_WAIT_MS);

  try {
    await driver.wait(until.elementLocated(By.className('channel-item')), ELEMENT_WAIT_MS);
  } catch (e) {
    // do nothing
  }
  const channelItems = await appChatDrawer.findElements(By.className('channel-item'));
  let isChatChannelExist = false;

  for (let channelItem of channelItems) {
    const channelItemText = await channelItem.getText();
    if (channelItemText.includes(name)) {
      isChatChannelExist = true;
      break;
    }
  }

  return isChatChannelExist;

}