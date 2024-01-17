const Auth = require('../components/Auth.js');
const { logger } = require('../../conf/base.conf');
const { GroupsLibrary } = require('../components/groups/GroupsLibrary.js');
const Navigation = require('../components/Navigation.js');
const { GroupProfile } = require('../components/groups/GroupProfile.js');
const { GroupProfileUserPanel } = require('../components/groups/GroupProfileUserPanel.js');
const { GroupInvitesDialog } = require('../components/groups/GroupInvitesDialog.js');

const name = 'Groups Clean Up';
const summary = "This is not a test, it cleans up after the group test";
const runTests = async function (driver) {

  await Auth.login(driver);

  await Navigation.goToGroups(driver);

  await GroupInvitesDialog.declineAllInvites(driver);

  await GroupsLibrary.selectMyGroups(driver);

  await deleteOrLeaveAllGroups(driver);

  await Auth.logout(driver);

  await Auth.login(driver, true);

  await Navigation.goToGroups(driver);

  await GroupInvitesDialog.declineAllInvites(driver);

  await GroupsLibrary.selectMyGroups(driver);

  await deleteOrLeaveAllGroups(driver);

};

module.exports = {
  name, runTests, summary
};

const deleteOrLeaveAllGroups = async function (driver) {

  let countDeletedGroups = 0;
  let countLeftGroups = 0;

  try {

    let isFirstGroupExists;

    do {
      isFirstGroupExists = await GroupsLibrary.selectFirstGroupIfExists(driver);

      if (isFirstGroupExists) {

        const isAdmin = await GroupProfileUserPanel.isAdmin(driver);

        if (isAdmin) {

          await GroupProfile.deleteGroup(driver);
          countDeletedGroups++;

        } else {

          await GroupProfile.leaveGroup(driver);
          countLeftGroups++;

        }
      }

    } while (isFirstGroupExists);

  } catch (e) {
    // do nothing
  }

  logger.debug(`Cleaned groups by deleting ${countDeletedGroups} groups and leaving ${countLeftGroups} groups`);

}