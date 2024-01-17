const Auth = require('../components/Auth.js');
const { FeedHeader } = require('../components/feed/FeedHeader.js');
const { StatusEditorDialog } = require('../components/feed/StatusEditorDialog.js');
const { StatusFeed } = require('../components/feed/Feed.js');
const { FeedPostCard } = require('../components/feed/FeedPostCard.js');
const { SearchBar } = require('../components/SearchBar.js');
const { SnapshotDialog } = require('../components/SnapshotDialog.js');
const Navigation = require('../components/Navigation.js');
const { OverviewChart } = require('../components/equities/OverviewChart.js');
const { PostDetailsDialog } = require('../components/feed/PostDetailsDialog.js');
const { NotificationsDialog } = require('../components/feed/NotificationsDialog.js');
const { LikedByDialog } = require('../components/feed/LikedByDialog.js');
const { SharePostDialog } = require('../components/feed/SharePostDialog.js');
const { logger } = require('../../conf/base.conf');

const name = 'Test: Feed Status Post test suite';
const summary = "Test Summary";
const testDate = new Date();

const runTests = async function (driver, browserName) {

  await Auth.login(driver);

  logger.debug('___Task: Create snapshot of equity and copy to clipboard___');

  await SearchBar.searchForEquities(driver, testPosts[0].snapshotOfEquity);

  await SearchBar.clickFirstMatchingItem(driver);

  await OverviewChart.openSnapshotDialog(driver);

  await SnapshotDialog.clickCopyToClipboard(driver);

  await SnapshotDialog.clickClose(driver);

  logger.debug('___Task: Go to Home and create post #1___');

  await Navigation.goHome(driver);

  await FeedHeader.openStatusEditorDialog(driver);

  await StatusEditorDialog.createPost(driver, testPosts[0], browserName, true);

  logger.debug('___Task: Log out and log in using second account___');

  await Auth.logout(driver);

  await Auth.login(driver, true);

  logger.debug('___Task: Post #1: like, comment, repost, delete reposted post___');

  let feedPostCardElement = await StatusFeed.findPostCardByPieceOfTextContent(driver, testPosts[0].text);

  await FeedPostCard.likePost(driver, feedPostCardElement);

  await FeedPostCard.openPostDetailsDialog(driver, feedPostCardElement);

  await PostDetailsDialog.postComment(driver, testPosts[0].comment, browserName);

  await PostDetailsDialog.closePostDetailsDialog(driver);

  await FeedPostCard.confirmPostCommentsAmountIs(driver, feedPostCardElement, 1);

  await FeedPostCard.confirmPostCommentTextIs(driver, feedPostCardElement, testPosts[0].comment.text);

  await FeedPostCard.repostPost(driver, feedPostCardElement);

  await FeedHeader.selectYourFeed(driver);

  feedPostCardElement = await StatusFeed.findLastPostCardRepostedByCurrentUser(driver);

  await FeedPostCard.deletePost(driver, feedPostCardElement);

  logger.debug('___Task: Log out and log in using first account___');

  await Auth.logout(driver);

  await Auth.login(driver);

  logger.debug('___Task: Check notifications___');

  await NotificationsDialog.confirmNotificationBadgeAmountIsBiggerThan(driver, 2);

  await NotificationsDialog.confirmLastThreeNotificationsContainLikeCommentRepost(driver);

  logger.debug('___Task: Check post #1 "liked by"___');

  feedPostCardElement = await StatusFeed.findPostCardByPieceOfTextContent(driver, testPosts[0].text);

  await FeedPostCard.openLikedByDialog(driver, feedPostCardElement);

  await LikedByDialog.confirmOnePersonLiked(driver);

  await LikedByDialog.closeLikedByDialog(driver);

  logger.debug('___Task: Like comment, reply to comment and delete post #1___');

  await FeedPostCard.openPostDetailsDialog(driver, feedPostCardElement);

  await PostDetailsDialog.likeComment(driver);

  await PostDetailsDialog.postReplyToComment(driver, testPosts[0].replyToComment, browserName);

  await PostDetailsDialog.closePostDetailsDialog(driver);

  await FeedPostCard.deletePost(driver, feedPostCardElement);

  logger.debug('___Task: Create post #2___');

  await FeedHeader.openStatusEditorDialog(driver);

  await StatusEditorDialog.createPost(driver, testPosts[1], browserName);

  logger.debug('___Task: Find and copy share post #2 link___');

  feedPostCardElement = await StatusFeed.findPostCardByPieceOfTextContent(driver, testPosts[1].text);

  await FeedPostCard.openSharePostDialog(driver, feedPostCardElement);

  await SharePostDialog.copyLinkAndCloseDialog(driver);

  logger.debug('___Task: Find and update post #2___');

  feedPostCardElement = await StatusFeed.findPostCardByPieceOfTextContent(driver, testPosts[1].text);

  await FeedPostCard.openPostEditorDialog(driver, feedPostCardElement);

  await StatusEditorDialog.updatePost(driver, testPosts[2], browserName);

  await PostDetailsDialog.closePostDetailsDialog(driver);

  logger.debug('___Task: Find and delete post #2___');

  feedPostCardElement = await StatusFeed.findPostCardByPieceOfTextContent(driver, testPosts[2].text);

  await FeedPostCard.deletePost(driver, feedPostCardElement);

  logger.debug('___Task: Create post #3___');

  await FeedHeader.openStatusEditorDialog(driver);

  await StatusEditorDialog.createPost(driver, testPosts[3], browserName);

  logger.debug('___Task: Find and delete post #3___');

  feedPostCardElement = await StatusFeed.findPostCardByPieceOfTextContent(driver, testPosts[3].text);

  await FeedPostCard.deletePost(driver, feedPostCardElement);

  logger.debug('___Task: Create post #4___');

  await FeedHeader.openStatusEditorDialog(driver);

  await StatusEditorDialog.createPost(driver, testPosts[4], browserName);

  logger.debug('___Task: Find and delete post #4___');

  feedPostCardElement = await StatusFeed.findPostCardByPieceOfTextContent(driver, testPosts[4].text);

  await FeedPostCard.deletePost(driver, feedPostCardElement);

};

module.exports = {
  name, runTests
};

const testPosts = [
  {
    text: 'Test post #1. ' + testDate,
    mentions: {
      username: '@dfe',
      equity: '$AVCTF',
      fund: '$QQQA',
      tag: '#Software',
    },
    snapshotOfEquity: 'AVCTF',
    imageUrl: 'https://invrs.com/img/invrs-logo-white-full.6cc6fcab.png',
    comment: {
      text: 'Test comment #1. ' + testDate,
      mentions: {
        username: '@dfe',
        equity: '$AVCTF',
        fund: '$QQQA',
        tag: '#Software',
      },
      imageUrl: 'https://invrs.com/img/invrs-logo-white-full.6cc6fcab.png',
    },
    replyToComment: {
      text: 'Test comment reply #1. ' + testDate,
      mentions: {
        username: '@dfe',
        equity: '$AVCTF',
        fund: '$QQQA',
        tag: '#Software',
      },
      imageUrl: 'https://invrs.com/img/invrs-logo-white-full.6cc6fcab.png',
    },
  },
  {
    text: 'Test post #2. ' + testDate,
    youtubeUrl: 'https://www.youtube.com/watch?v=dLV3hE4IZWo'
  },
  {
    text: 'Test post #2 updated. ' + testDate,
    instagramUrl: 'https://www.instagram.com/reel/CRRxN0gJxbB/?utm_source=ig_web_copy_link'
  },
  {
    text: 'Test post #3. ' + testDate,
    tiktokUrl: 'https://www.tiktok.com/@canadiantaxenthusiast/video/7095133209263951109'
  },
  {
    text: 'Test post #4. ' + testDate,
    instagramUrl: 'https://www.instagram.com/reel/CRRxN0gJxbB/?utm_source=ig_web_copy_link'
  }
]