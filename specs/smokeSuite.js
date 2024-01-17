const { getCapabilities, buildDriver } = require('./components/TestHelper.js');
const { describe, beforeEach, afterEach, it } = require('mocha');
const { BASE_URL, TARGET_ENV } = require('../conf/base.conf.js');
const {  logger } = require('../conf/base.conf');
const loginAndSeeHome = require('./loginAndSeeHome/loginAndSeeHome.spec.js');
const searchStocksAndFunds = require('./searchStocksAndFunds/searchStocksAndFunds.spec.js');
const equitiesOverview = require('./equities/equitiesOverview.spec')
const groupsTestSuite = require('./groups/groupsTestSuite.spec.js');
const groupsCleanUp = require('./groups/groupsCleanUp.spec.js');
const feedStatusPostTestSuite = require('./feed/feedStatusPostTestSuite.spec.js');
const feedNoteTestSuite = require('./feed/feedNoteTestSuite.spec.js');
const feedCleanUp = require('./feed/feedCleanUp.spec.js');
const equitiesCompare = require('./equities/equitiesCompare.spec');
const equitiesFinancial = require('./equities/equitiesFinancial.spec');
const equitiesInsider = require('./equities/equitiesInsider.spec');
const equitiesNotes = require('./equities/equitiesNotes.spec');
const equitiesDividends = require('./equities/equitiesDividends.spec');
const fundsOverview = require('./funds/fundsOverview.spec');
const fundsHolding = require('./funds/fundsHolding.spec');
const fundsDividends = require('./funds/fundsDividends.spec');
const fundsNotes = require('./funds/fundsNotes.spec');
const ScreenerCustom = require('./screener/ScreenerCustom.spec');
const screenerGeneral = require('./screener/screenerGeneral.spec');
const screenerList = require('./screener/ScreenerList.spec');
const ScreenerPreset = require('./screener/screenerPreset.spec');
const listCreateList = require('./List/listCreateList.spec');
const listComparasionChart = require('./List/listComparasionChart.spec');
const profileCleanUp = require('./profile/profileCleanUp.spec');
const profileGeneral = require('./profile/profileGeneral.spec');
const profileEdit = require('./profile/profileEdit.spec');
const profileFeed = require('./profile/profileFeed.spec');
const profileFollowing = require('./profile/profileFollowing.spec');
const profileSecurities = require('./profile/profileSecurities.spec');
const chatMyChannels = require('./chat/chatMyChannels.spec');
const chatReccomended = require('./chat/chatReccomended.spec');
const chatJoin = require('./chat/chatJoin.spec');
const ChatMessages = require('./chat/chatMessages.spec');
const chatImages = require('./chat/chatImages.spec');
const chatDelete = require('./chat/chatDelete.spec');
const chatLeave = require('./chat/chatLeave.spec');
const chatCleanUp = require('./chat/chatCleanUp.spec');





// Loops through all the configured browsers
getCapabilities().forEach(function (caps) {

  describe('Smoke suite, ' + TARGET_ENV + ' environment, browser ' + caps.browserName, function () {
    let driver;
    this.timeout(0);

    beforeEach(async function () {
      caps.name = this.currentTest.title;
      driver = buildDriver(caps);
      await driver.get(BASE_URL);
      logger.info(caps.name);
      //logger.debug(this.currentTest.summary);
    });
    
    // it(groupsTestSuite.name + ' using ' + caps.browserName, async function () {
    //   logger.info(groupsTestSuite.summary);
    //   await groupsTestSuite.runTests(driver, caps.browserName);
    // });

    // it(groupsCleanUp.name + ' using ' + caps.browserName, async function () {
    //   logger.info(groupsCleanUp.summary);
    //   await groupsCleanUp.runTests(driver);
    // });

    // it(feedNoteTestSuite.name + ' using ' + caps.browserName, async function () {
    //   logger.info(feedNoteTestSuite.summary);
    //   await feedNoteTestSuite.runTests(driver, caps.browserName);
    // });

    // it(feedStatusPostTestSuite.name + ' using ' + caps.browserName, async function () {
    //   logger.info(feedStatusPostTestSuite.summary);
    //   await feedStatusPostTestSuite.runTests(driver, caps.browserName);
    // });

    // it(feedCleanUp.name + ' using ' + caps.browserName, async function () {
    //   logger.info(feedCleanUp.summary);
    //   await feedCleanUp.runTests(driver);
    // });

    // it(loginAndSeeHome.name + ' using ' + caps.browserName, async function () {
    //   logger.info(loginAndSeeHome.summary);
    //   await loginAndSeeHome.runTests(driver);
    // });

    it(searchStocksAndFunds.name + ' using ' + caps.browserName, async function () {
      logger.info(searchStocksAndFunds.summary);
      await searchStocksAndFunds.runTests(driver);
    });

    it(equitiesOverview.name + ' using ' + caps.browserName, async function () {
      logger.info(equitiesOverview.summary);
      await equitiesOverview.runTests(driver);
    });

    //Equities Test
    it(equitiesCompare.name + ' using ' + caps.browserName, async function () {
      logger.info(equitiesCompare.summary);
      await equitiesCompare.runTests(driver);
    });

    it(equitiesFinancial.name + ' using ' + caps.browserName, async function () {
      logger.info(equitiesFinancial.summary);
      await equitiesFinancial.runTests(driver);
    });

    it(equitiesInsider.name + ' using ' + caps.browserName, async function () {
      logger.info(equitiesInsider.summary);
      await equitiesInsider.runTests(driver);
    });

    it(equitiesNotes.name + ' using ' + caps.browserName, async function () {
      logger.info(equitiesNotes.summary);
      await equitiesNotes.runTests(driver);
    });

    it(equitiesDividends.name + ' using ' + caps.browserName, async function () {
      logger.info(equitiesDividends.summary);
      await equitiesDividends.runTests(driver);
    });

    it(fundsOverview.name + ' using ' + caps.browserName, async function () {
      logger.info(fundsOverview.summary);
      await fundsOverview.runTests(driver);
    });
    //funds Test 
    it(fundsHolding.name + ' using ' + caps.browserName, async function () {
      logger.info(fundsHolding.summary);
      await fundsHolding.runTests(driver);
    });

    it(fundsDividends.name + ' using ' + caps.browserName, async function () {
      logger.info(fundsDividends.summary);
      await fundsDividends.runTests(driver);
    });

    it(fundsNotes.name + ' using ' + caps.browserName, async function () {
      logger.info(fundsNotes.summary);
      await fundsNotes.runTests(driver);
    });
    //Screener
    it(ScreenerCustom.name + ' using ' + caps.browserName, async function () {
      logger.info(ScreenerCustom.summary);
      await ScreenerCustom.runTests(driver);
    });

    it(screenerGeneral.name + ' using ' + caps.browserName, async function () {
      logger.info(screenerGeneral.summary);
      await screenerGeneral.runTests(driver);
    });

    it(screenerList.name + ' using ' + caps.browserName, async function () {
      logger.info(screenerList.summary);
      await screenerList.runTests(driver);
    });

    it(ScreenerPreset.name + ' using ' + caps.browserName, async function () {
      logger.info(ScreenerPreset.summary);
      await ScreenerPreset.runTests(driver);
    });
    //List
    it(listCreateList.name + ' using ' + caps.browserName, async function () {
      logger.info(listCreateList.summary);
      await listCreateList.runTests(driver);
    });

    it(listComparasionChart.name + ' using ' + caps.browserName, async function () {
      logger.info(listComparasionChart.summary);
      await listComparasionChart.runTests(driver);
    });
    //Profile
    it(profileCleanUp.name + ' using ' + caps.browserName, async function () {
      logger.info(profileCleanUp.summary);
      await profileCleanUp.runTests(driver);
    });
    it(profileGeneral.name + ' using ' + caps.browserName, async function () {
      logger.info(profileGeneral.summary);
      await profileGeneral.runTests(driver);
    });
    it(profileEdit.name + ' using ' + caps.browserName, async function () {
      logger.info(profileEdit.summary);
      await profileEdit.runTests(driver);
    });
    it(profileFeed.name + ' using ' + caps.browserName, async function () {
      logger.info(profileFeed.summary);
      await profileFeed.runTests(driver);
    });
    it(profileFollowing.name + ' using ' + caps.browserName, async function () {
      logger.info(profileFollowing.summary);
      await profileFollowing.runTests(driver);
    });
    it(profileSecurities.name + ' using ' + caps.browserName, async function () {
      logger.info(profileSecurities.summary);
      await profileSecurities.runTests(driver);
    });
    //Chat
    it(chatCleanUp.name + ' using ' + caps.browserName, async function () {
      logger.info(chatCleanUp.summary);
      await chatCleanUp.runTests(driver);
    });
    it(chatMyChannels.name + ' using ' + caps.browserName, async function () {
      logger.info(chatMyChannels.summary);
      await chatMyChannels.runTests(driver);
    });
    it(chatReccomended.name + ' using ' + caps.browserName, async function () {
      logger.info(chatReccomended.summary);
      await chatReccomended.runTests(driver);
    });
    it(chatJoin.name + ' using ' + caps.browserName, async function () {
      logger.info(chatJoin.summary);
      await chatJoin.runTests(driver);
    });
    it(ChatMessages.name + ' using ' + caps.browserName, async function () {
      logger.info(ChatMessages.summary);
      await ChatMessages.runTests(driver);
    });
    it(chatImages.name + ' using ' + caps.browserName, async function () {
      logger.info(chatImages.summary);
      await chatImages.runTests(driver);
    });
    it(chatDelete.name + ' using ' + caps.browserName, async function () {
      logger.info(chatDelete.summary);
      await chatDelete.runTests(driver);
    });
    it(chatLeave.name + ' using ' + caps.browserName, async function () {
      logger.info(chatLeave.summary);
      await chatLeave.runTests(driver);
    });

    afterEach(async function () {
      if (this.currentTest.isPassed()) {
        await driver.executeScript('lambda-status=passed');
      } else {
        await driver.executeScript('lambda-status=failed');
      }
      driver.quit();
    });

  });

});