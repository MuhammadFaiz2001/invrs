const Auth = require('../components/Auth.js');
const { GroupsActionsContainer } = require('../components/groups/GroupsActionsContainer.js');
const { GroupsLibrary } = require('../components/groups/GroupsLibrary.js');
const { GroupEditProfileDialog } = require('../components/groups/GroupEditProfileDialog.js');
const Navigation = require('../components/Navigation.js');
const { GroupProfile } = require('../components/groups/GroupProfile.js');
const { GroupProfileUserPanel } = require('../components/groups/GroupProfileUserPanel.js');
const { FeedHeader } = require('../components/feed/FeedHeader.js');
const { StatusEditorDialog } = require('../components/feed/StatusEditorDialog.js');
const { StatusFeed } = require('../components/feed/Feed.js');
const { FeedPostCard } = require('../components/feed/FeedPostCard.js');
const { Chat } = require('../components/chat/Chat.js');
const { GroupInviteDialog } = require('../components/groups/GroupInviteDialog.js');
const { NotificationsDialog } = require('../components/feed/NotificationsDialog.js');
const { logger } = require('../../conf/base.conf');

const name = 'Test: Groups test suite';
const summary = "The following Test Runs through All the group Tests";
const testDate = new Date();

const runTests = async function (driver, browserName) {

  logger.debug('___Task: Log in using first account and open groups___');

  await Auth.login(driver);

  await Navigation.goToGroups(driver);

  logger.debug('___Task: Create group #1, finish group setup___');

  await GroupsActionsContainer.createNewGroup(driver, testGroups[0]);

  await GroupsLibrary.selectMyGroups(driver);

  await GroupsLibrary.searchAndSelectGroupByName(driver, testGroups[0].name);

  await GroupProfile.clickFinishGroupSetup(driver);

  await GroupEditProfileDialog.addImageBioAndSave(driver, testGroups[0].bio);

  await GroupProfile.confirmGroupProfileIsUpdated(driver, testGroups[0].name, testGroups[0].bio);

  await GroupProfile.confirmLeaveGroupOptionDoesNotExist(driver);

  logger.debug('___Task: Create post #1, confirm group #1 channel exists and log out___');

  await FeedHeader.openStatusEditorDialog(driver, true);

  await StatusEditorDialog.createPost(driver, testGroups[0].testPost, browserName);

  await Navigation.goToGroups(driver);

  let feedPostCardElement = await StatusFeed.findPostCardByPieceOfTextContent(driver, testGroups[0].testPost.text);

  await FeedPostCard.openGroupProfile(driver, feedPostCardElement);

  await Chat.confirmChannelExistsAndIsNotSearchable(driver, testGroups[0].name);

  logger.debug('___Task: Invite to group #1___');

  await GroupProfile.openGroupInviteDialog(driver);

  await GroupInviteDialog.inviteByNameAndReturnShareableInviteLink(driver, 'TestSecond');

  await Auth.logout(driver);

  logger.debug('___Task: Log in using second account and open groups___');

  await Auth.login(driver, true);

  logger.debug('___Task: Join group #1 from invitation___');

  await NotificationsDialog.acceptGroupInvitation(driver, testGroups[0].name);

  await Navigation.goToGroups(driver);

  await GroupsLibrary.selectMyGroups(driver);
  await GroupsLibrary.searchAndSelectGroupByName(driver, testGroups[0].name);

  await GroupProfile.leaveGroup(driver);

  logger.debug('___Task: Join group #1 from search and make sure everything is correct___');

  await GroupsLibrary.selectDiscover(driver);
  await GroupsLibrary.searchAndJoinPublicGroupByName(driver, testGroups[0].name);

  await GroupsLibrary.selectMyGroups(driver);
  await GroupsLibrary.confirmGroupLibraryIsShowingGroupByName(driver, testGroups[0].name);

  await GroupsLibrary.selectDiscover(driver);
  await GroupsLibrary.confirmGroupLibraryIsNotShowingGroupByName(driver, testGroups[0].name);

  await StatusFeed.findPostCardByPieceOfTextContent(driver, testGroups[0].testPost.text);

  logger.debug('___Task: Leave group #1___');

  await GroupsLibrary.selectMyGroups(driver);
  await GroupsLibrary.searchAndSelectGroupByName(driver, testGroups[0].name);

  await GroupProfile.leaveGroup(driver);

  await GroupsLibrary.selectMyGroups(driver);
  await GroupsLibrary.confirmGroupLibraryIsNotShowingGroupByName(driver, testGroups[0].name);

  await StatusFeed.confirmPostCardWithPieceOfTextContentDoesNotExist(driver, testGroups[0].testPost.text);

  logger.debug('___Task: Join group #1 from group profile___');

  await GroupsLibrary.selectDiscover(driver);
  await GroupsLibrary.searchAndSelectGroupByName(driver, testGroups[0].name);

  await GroupProfile.joinGroup(driver);

  await Auth.logout(driver);

  logger.debug('___Task: Log in using first account___');

  await Auth.login(driver);

  await Navigation.goToGroups(driver);

  logger.debug('___Task: Edit group #1 and delete___');

  await GroupsLibrary.searchAndSelectGroupByName(driver, testGroups[0].name);

  await GroupProfile.openGroupEditProfileDialog(driver);

  await GroupEditProfileDialog.editImageNameBioAndSave(driver, testGroups[0].edit, browserName);

  await GroupProfile.confirmGroupProfileIsUpdated(driver, testGroups[0].edit.name, testGroups[0].edit.bio);

  await GroupProfile.deleteGroup(driver);

  await Chat.confirmChannelDoesNotExists(driver, testGroups[0].name);

  logger.debug('___Task: Find and delete post #1___');

  feedPostCardElement = await StatusFeed.findPostCardByPieceOfTextContent(driver, testGroups[0].testPost.text);

  await FeedPostCard.deletePost(driver, feedPostCardElement);

  logger.debug('___Task: Create group #2, finish group setup___');

  await GroupsActionsContainer.createNewGroup(driver, testGroups[1]);

  await GroupsLibrary.selectMyGroups(driver);

  await GroupsLibrary.searchAndSelectGroupByName(driver, testGroups[1].name);

  await GroupProfile.clickFinishGroupSetup(driver);

  await GroupEditProfileDialog.addImageBioAndSave(driver, testGroups[1].bio);

  await GroupProfile.confirmGroupProfileIsUpdated(driver, testGroups[1].name, testGroups[1].bio);

  logger.debug('___Task: Create post #2, confirm group #2 channel exists and delete group #2___');

  await FeedHeader.openStatusEditorDialog(driver, true);

  await StatusEditorDialog.createPost(driver, testGroups[1].testPost, browserName);

  logger.debug('___Task: Invite to group #2, get external invite link and log out___');

  await GroupProfile.openGroupInviteDialog(driver);

  const externalInviteLink = await GroupInviteDialog.inviteByNameAndReturnShareableInviteLink(driver, 'TestSecond');

  await Auth.logout(driver);

  logger.debug('___Task: Log in using second account and join group #2 from invitation___');

  await Auth.login(driver, true);

  await NotificationsDialog.acceptGroupInvitation(driver, testGroups[1].name);

  logger.debug('___Task: Leave group #2___');

  await Navigation.goToGroups(driver);

  await GroupsLibrary.selectMyGroups(driver);
  await GroupsLibrary.searchAndSelectGroupByName(driver, testGroups[1].name);

  await GroupProfile.leaveGroup(driver);

  logger.debug('___Task: Open external link and go to login___');

  await Auth.logout(driver);

  await driver.get(externalInviteLink);

  await Auth.login(driver, true);

  logger.debug('___Task: Wait for group profile to automatically open and leave group #2___');

  await GroupProfile.waitForGroupProfile(driver);

  await GroupProfile.leaveGroup(driver);

  logger.debug('___Task: Send a request to join group #2___');

  await GroupsLibrary.selectDiscover(driver);
  await GroupsLibrary.searchAndSendRequestToJoinPrivateGroupByName(driver, testGroups[1].name)

  await Auth.logout(driver);

  logger.debug('___Task: Log in using first account, check chat and delete group #2___');

  await Auth.login(driver);

  await Navigation.goToGroups(driver);

  await GroupsLibrary.selectMyGroups(driver);
  await GroupsLibrary.searchAndSelectGroupByName(driver, testGroups[1].name);

  await GroupProfileUserPanel.selectAdmin(driver);
  await GroupProfileUserPanel.acceptLastPendingRequest(driver);

  await Chat.confirmChannelExistsAndIsNotSearchable(driver, testGroups[1].name);

  await GroupProfile.deleteGroup(driver);

  await Chat.confirmChannelDoesNotExists(driver, testGroups[1].name);

  logger.debug('___Task: Find and delete post #2___');

  feedPostCardElement = await StatusFeed.findPostCardByPieceOfTextContent(driver, testGroups[1].testPost.text);

  await FeedPostCard.deletePost(driver, feedPostCardElement);

};

module.exports = {
  name, runTests, summary
};

const testGroups = [
  {
    name: testDate.getTime() + ' TestGroup-1',
    bio: 'TestGroup-1-bio ' + testDate,
    isPrivate: false,
    testPost: {
      text: 'Test post #1. ' + testDate,
      youtubeUrl: 'https://www.youtube.com/watch?v=dLV3hE4IZWo'
    },
    edit: {
      name: testDate.getTime() + ' TestGroup-1-Edited',
      bio: 'TestGroup-1-bio-Edited ' + testDate,
    }
  },
  {
    name: testDate.getTime() + ' TestGroup-2',
    bio: 'TestGroup-2-bio ' + testDate,
    isPrivate: true,
    testPost: {
      text: 'Test post #2. ' + testDate,
      instagramUrl: 'https://www.instagram.com/reel/CRRxN0gJxbB/?utm_source=ig_web_copy_link'
    }
  },
]