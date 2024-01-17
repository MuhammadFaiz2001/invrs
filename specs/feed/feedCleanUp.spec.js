const Auth = require('../components/Auth.js');
const { logger } = require('../../conf/base.conf');
const { StatusFeed } = require('../components/feed/Feed.js');
const { FeedPostCard } = require('../components/feed/FeedPostCard.js');
const Navigation = require('../components/Navigation.js');

const name = 'Feed Clean Up';
const summary = "Test Summary";
const runTests = async function (driver) {

  await Auth.login(driver);

  await Navigation.goToProfile(driver);

  await deleteAllPosts(driver);

  // await Navigation.goToGroups(driver, true);

  // await deleteAllPosts(driver);

  await Auth.logout(driver);

  await Auth.login(driver, true);

  await Navigation.goToProfile(driver);

  await deleteAllPosts(driver);

  // await Navigation.goToGroups(driver, true);

  // await deleteAllPosts(driver);

};

module.exports = {
  name, runTests
};

const deleteAllPosts = async function (driver) {

  let countRemovedPosts = 0;

  const username = await Auth.getUsername(driver);

  try {
    let feedPostCardElement;

    const maxAttempts = 15;

    do {
      feedPostCardElement = await StatusFeed.findPostCardByUsername(driver, username);

      await FeedPostCard.deletePost(driver, feedPostCardElement);

      countRemovedPosts++;
    } while (feedPostCardElement != undefined && countRemovedPosts < maxAttempts);

  } catch (e) {
    // do nothing
  }

  logger.debug(`Cleaned feed by deleting ${countRemovedPosts} posts`);

}