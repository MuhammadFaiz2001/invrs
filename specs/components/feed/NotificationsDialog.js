const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../../conf/base.conf');
const assert = require('assert');
const TestHelper = require('../TestHelper');

const NotificationsDialog = {

  confirmNotificationBadgeAmountIsBiggerThan: async function (driver, amount) {

    await driver.wait(until.elementsLocated(By.className('p-badge p-component p-badge-info')), ELEMENT_WAIT_MS);
    const notificationBadge = await driver.findElement(By.className('p-badge p-component p-badge-info'));
    const notificationBadgeText = await notificationBadge.getText();

    assert(parseInt(notificationBadgeText) > amount);

    logger.debug('Confirmed notification badge amount is bigger than: ' + amount);

  },

  acceptGroupInvitation: async function (driver, groupName) {

    await driver.wait(until.elementsLocated(By.className('pi pi-bell')), ELEMENT_WAIT_MS);
    const notificationsBtn = await driver.findElement(By.className('pi pi-bell'));
    await notificationsBtn.click();

    await driver.wait(until.elementsLocated(By.className('notification-row unread')), ELEMENT_WAIT_MS);
    const rows = await driver.findElements(By.className('notification-row unread'));
    let rowWithGroup;
    for (let i=0; i<rows.length; i++) {
      const rowText = await rows[i].getText();
      if (rowText.includes(groupName)) {
        rowWithGroup = rows[i];
        break;
      }
    }

    assert(rowWithGroup);

    const acceptBtn = await rowWithGroup.findElement(By.className('accept-button'));
    await acceptBtn.click();

    await driver.wait(until.elementsLocated(By.className('accepted-button')), ELEMENT_WAIT_MS);

    await notificationsBtn.click();

    await TestHelper.safeWaitUntilStalenessOf(driver, acceptBtn);

    logger.debug('Accepted group invitation');

  },

  confirmLastThreeNotificationsContainLikeCommentRepost: async function (driver) {

    const notificationTypesCheck = {
      liked: { text: 'Liked your post', isFound: false },
      commented: { text: 'Commented on your post', isFound: false },
      reposted: { text: 'Reposted your post', isFound: false },
    };

    await driver.wait(until.elementsLocated(By.className('pi pi-bell')), ELEMENT_WAIT_MS);
    const notificationsBtn = await driver.findElement(By.className('pi pi-bell'));
    await notificationsBtn.click();

    await driver.wait(until.elementsLocated(By.id('infiniteScrollingForNotifications')), ELEMENT_WAIT_MS);
    const infiniteScrollingForNotifications = await driver.findElement(By.id('infiniteScrollingForNotifications'));
    const notificationUserInfos = await infiniteScrollingForNotifications.findElements(By.className('notification-user-info'));

    assert(notificationUserInfos.length >= 3);

    for (let i = 0; i < 3; i++) {
      const notificationText = await notificationUserInfos[i].findElement(By.className('notification-text')).getText();

      if (notificationText.includes(notificationTypesCheck.liked.text)) {
        notificationTypesCheck.liked.isFound = true;
      } else if (notificationText.includes(notificationTypesCheck.commented.text)) {
        notificationTypesCheck.commented.isFound = true;
      } else if (notificationText.includes(notificationTypesCheck.reposted.text)) {
        notificationTypesCheck.reposted.isFound = true;
      }
    }

    assert(notificationTypesCheck.liked.isFound);
    assert(notificationTypesCheck.commented.isFound);
    assert(notificationTypesCheck.reposted.isFound);

    // Close dialog
    await notificationsBtn.click();

    await TestHelper.safeWaitUntilStalenessOf(driver, infiniteScrollingForNotifications);

    logger.debug('Confirmed last three notifications contain like, comment, and repost notifications');

  },

}

module.exports = { NotificationsDialog };