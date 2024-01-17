const Auth = require('../components/Auth.js');
const { logger } = require('../../conf/base.conf');
const { StatusFeed } = require('../components/feed/Feed.js');
const { FeedHeader } = require('../components/feed/FeedHeader.js');
const { FeedPostCard } = require('../components/feed/FeedPostCard.js');
const { NoteEditorDialog } = require('../components/feed/NoteEditorDialog.js');
const { NoteEditorPage } = require('../components/feed/NoteEditorPage.js');
const { NoteLibrary } = require('../components/feed/NoteLibrary.js');
const { PostDetailsDialog } = require('../components/feed/PostDetailsDialog.js');
const Navigation = require('../components/Navigation.js');

const name = 'Test: Feed Note test suite';
const summary = "Test Summary";
const testDate = new Date();

const runTests = async function (driver, browserName) {

  logger.debug('___Task: Log in and open note editor___');

  await Auth.login(driver);

  await FeedHeader.openNoteEditorPage(driver);

  logger.debug('___Task: Note #1: save to library, click new note, update last saved, post, delete from library___');

  await NoteEditorPage.saveNote(driver, testNotes[0], browserName);

  await NoteEditorPage.clickCreateNewNoteButton(driver);

  let noteLibraryItem = await NoteLibrary.findFirstNoteItemAndCheckTitleMatch(driver, testNotes[0].title);

  await NoteLibrary.editNote(driver, noteLibraryItem);

  await NoteEditorPage.updateNote(driver, testNotes[1], browserName);

  await NoteEditorPage.postCurrentNote(driver);

  noteLibraryItem = await NoteLibrary.findFirstNoteItemAndCheckTitleMatch(driver, testNotes[1].title);

  await NoteLibrary.deleteNote(driver, noteLibraryItem);

  logger.debug('___Task: Go Home and update posted note #1___');

  await NoteEditorPage.clickGoBackButton(driver);

  let feedPostCardElement = await StatusFeed.findPostCardByTitle(driver, testNotes[1].title);

  await FeedPostCard.openPostEditorDialog(driver, feedPostCardElement);

  await NoteEditorDialog.updateNote(driver, testNotes[2], browserName);

  await PostDetailsDialog.closePostDetailsDialog(driver);

  logger.debug('___Task: Delete note #1___');

  feedPostCardElement = await StatusFeed.findPostCardByTitle(driver, testNotes[2].title);

  await FeedPostCard.deletePost(driver, feedPostCardElement);

  logger.debug('___Task: Open note editor, note #2: save to library, post, delete from library___');

  await FeedHeader.openNoteEditorPage(driver);

  await NoteEditorPage.saveNote(driver, testNotes[3], browserName);

  await NoteEditorPage.postCurrentNote(driver);

  noteLibraryItem = await NoteLibrary.findFirstNoteItemAndCheckTitleMatch(driver, testNotes[3].title);

  await NoteLibrary.deleteNote(driver, noteLibraryItem);

  logger.debug('___Task: Note #3: save to library, post, delete from library___');

  await NoteEditorPage.saveNote(driver, testNotes[4], browserName);

  await NoteEditorPage.postCurrentNote(driver);

  noteLibraryItem = await NoteLibrary.findFirstNoteItemAndCheckTitleMatch(driver, testNotes[4].title);

  await NoteLibrary.deleteNote(driver, noteLibraryItem);

  logger.debug('___Task: Note #4: save to library, post, delete from library___');

  await NoteEditorPage.saveNote(driver, testNotes[5], browserName);

  await NoteEditorPage.postCurrentNote(driver);

  noteLibraryItem = await NoteLibrary.findFirstNoteItemAndCheckTitleMatch(driver, testNotes[5].title);

  await NoteLibrary.deleteNote(driver, noteLibraryItem);

  logger.debug('___Task: Go Home and delete notes #4, #3, #2 from feed___');

  await Navigation.goHome(driver);

  feedPostCardElement = await StatusFeed.findPostCardByTitle(driver, testNotes[5].title);

  await FeedPostCard.deletePost(driver, feedPostCardElement);

  feedPostCardElement = await StatusFeed.findPostCardByTitle(driver, testNotes[4].title);

  await FeedPostCard.deletePost(driver, feedPostCardElement);

  feedPostCardElement = await StatusFeed.findPostCardByTitle(driver, testNotes[3].title);

  await FeedPostCard.deletePost(driver, feedPostCardElement);

};

module.exports = {
  name, runTests
};

const testNotes = [
  {
    title: 'Test note #1. ' + testDate,
    instagramUrl: 'https://www.instagram.com/reel/CRRxN0gJxbB/?utm_source=ig_web_copy_link'
  },
  {
    title: 'Test note #1 updated after saving. ' + testDate,
    text: `Why INVRS
    Built for DIY investors to:
    Save time

    Your entire research process just moved under one roof. Go ahead, close those extra tabs.
    Save money

    Keep your money. Earn premium data and tools for free by using the app.
    Collaborate

    The first research platform built for true collaboration. DIY doesn't mean do it alone.
    Invest smarter

    Join an intelligent community focused on building long-term wealth.`,
    mentions: {
      username: '@dfe',
      equity: '$AVCTF',
      fund: '$QQQA'
    },
    snapshotUrl: 'https://invrs.com/share/EE56408B5D03C6695EEF95D38DEA1482/X15hxtPK.png',
    imageUrl: 'https://invrs.com/img/invrs-logo-white-full.6cc6fcab.png'
  },
  {
    title: 'Test note #1 updated after posting. ' + testDate,
    youtubeUrl: 'https://www.youtube.com/watch?v=dLV3hE4IZWo'
  },
  {
    title: 'Test note #2. ' + testDate,
    youtubeUrl: 'https://www.youtube.com/watch?v=dLV3hE4IZWo'
  },
  {
    title: 'Test note #3. ' + testDate,
    tiktokUrl: 'https://www.tiktok.com/@canadiantaxenthusiast/video/7095133209263951109'
  },
  {
    title: 'Test note #4. ' + testDate,
    instagramUrl: 'https://www.instagram.com/reel/CRRxN0gJxbB/?utm_source=ig_web_copy_link'
  }
]