const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../../conf/base.conf');
const TestHelper = require('../TestHelper');

const GroupInvitesDialog = {

  declineAllInvites: async function (driver) {

    // Open Dialog
    await driver.wait(until.elementLocated(By.className('group-invite-button')), ELEMENT_WAIT_MS);
    const groupInviteButton = await driver.findElement(By.className('group-invite-button'));

    const groupInviteButtonClass = await groupInviteButton.getAttribute('class');

    if (!groupInviteButtonClass.includes('p-disabled')) {
      await groupInviteButton.click();

      await driver.wait(until.elementLocated(By.className('group-invites-modal')), ELEMENT_WAIT_MS);
      const groupInvitesDialog = await driver.findElement(By.className('group-invites-modal'));

      const declineRequestBtns = await groupInvitesDialog.findElements(By.className('decline-request-button'));
      let count = 0;
      for (let i = 0; i < declineRequestBtns.length; i++) {

        count += await clickDeclineBtn(driver, groupInviteButton);

      }

      if (count > 0) {
        await TestHelper.safeWaitUntilStalenessOf(driver, declineRequestBtns[0]);
      }

      // Close Dialog
      const closeBtn = await driver.findElement(By.className('p-dialog-header-close'));
      await closeBtn.click();
      await TestHelper.safeWaitUntilStalenessOf(driver, closeBtn);

      logger.debug('Declined group invites: ' + count);

    } else {
      logger.debug('No group invites');
    }

  },

}

module.exports = { GroupInvitesDialog };

const clickDeclineBtn = async function (driver, groupInvitesDialog) {
  try {
    await driver.wait(until.elementLocated(By.className('decline-request-button')), ELEMENT_WAIT_MS);
    const declineRequestBtn = await groupInvitesDialog.findElement(By.className('decline-request-button'));
    await declineRequestBtn.click();
    await driver.sleep(500);
    return 1;
  } catch (e) {
    return 0;
  }
}