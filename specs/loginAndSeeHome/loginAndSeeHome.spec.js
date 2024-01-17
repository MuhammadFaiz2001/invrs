/**
 * Tests logging in and checking that all home components are visible.
 * - The feed
 * - The Sector Performance table
 * - The Factor Performance table.
 * - The indices
 * - Who to Follow
 * - Trending Notes
 * - Trending Assets
 */
const { By, until } = require('selenium-webdriver');
const assert = require('assert');
const Auth = require('../components/Auth.js');
const Navigation = require('../components/Navigation.js');
const { ELEMENT_WAIT_MS, logger } = require('../../conf/base.conf.js');

const name = 'Test: Login and see Home';
const summary = "Test Summary";
const runTests = async function (driver) {

  await Auth.login(driver);

  await confirmCanSeeFeed(driver);

  await confirmCanSeeSectorPerformance(driver);

  await confirmCanSeeFactorPerformance(driver);

  await confirmCanSeeIndices(driver);

  await Navigation.goToDiscover(driver);

  await confirmCanSeeInvestorsToFollow(driver);

  await confirmCanSeeTrendingNotes(driver);

  // IN-752 Comment out Trending assets test for now until IN-751 fixed
  // await confirmCanSeeTrendingAssets(driver);

};

module.exports = {
  name, runTests
};

/**
 * Confirms the status editor bar is visible.
 * 
 * @param {the webdriver} driver 
 */
// const confirmCanSeeStatusEditorBar = async function (driver) {

//   await driver.wait(until.elementLocated(By.id('statusFormContainer')), ELEMENT_WAIT_MS)
//   logger.debug('confirmed status editor bar visible')
// }

/**
 * Confirms the feed is visible with at least one post showing.
 */
const confirmCanSeeFeed = async function (driver) {
  await driver.wait(until.elementLocated(By.css('.activity-block')), ELEMENT_WAIT_MS);

  const atLeastOnePost = await driver.findElement(By.css('.activity-block'));
  assert(atLeastOnePost != null);
  logger.debug('confirmed feed visible');
};

/**
 * Confirms the sector performance table is visible
 */
const confirmCanSeeSectorPerformance = async function (driver) {
  const SECTOR_COUNT = 11;
  await driver.wait(until.elementLocated(By.css('.sector-performance')), ELEMENT_WAIT_MS);

  const sectorPerfDiv = await driver.findElement(By.css('.sector-performance'));
  const sectors = await sectorPerfDiv.findElements(By.css('.type-card'));

  assert(sectors.length == SECTOR_COUNT);
  logger.debug('confirmed Sector Perf visible');
};

/**
 * Confirms the factor performance table is visible.
 */
const confirmCanSeeFactorPerformance = async function (driver) {
  const FACTOR_COUNT = 8;

  await driver.wait(until.elementLocated(By.css('.factor-performance')), ELEMENT_WAIT_MS);

  const factorPerfDiv = await driver.findElement(By.css('.factor-performance'));
  const factors = await factorPerfDiv.findElements(By.css('.type-card'));

  assert(factors.length == FACTOR_COUNT);
  logger.debug('confirmed Factor Perf visible');
};

/**
 * Confirms the indices are display and not empty
 */
const confirmCanSeeIndices = async function (driver) {
  const NUM_INDICES = 4;

  await driver.wait(until.elementLocated(By.css('.indices-container')), ELEMENT_WAIT_MS);

  const indicesDiv = await driver.findElement(By.css('.indices-container'));
  const indexChangePercents = await indicesDiv.findElements(By.css('.qmod-change-percent'));

  assert(indexChangePercents.length == NUM_INDICES);
  for (const pctChange of indexChangePercents) {
    const txt = await pctChange.getText();
    assert(txt != null && txt != '');
  }

  logger.debug('confirmed Indices visible');
};

/** 
 * Confirms the Investors to Follow section is visible
 * 
 */
const confirmCanSeeInvestorsToFollow = async function (driver) {
  await driver.wait(until.elementLocated(By.css('.who-to-follow-content')), ELEMENT_WAIT_MS);
  logger.debug('confirmed Investors To Follow visible');
};

/** 
 * Confirms the Trending Notes section is visible
 * 
 */
const confirmCanSeeTrendingNotes = async function (driver) {
  await driver.wait(until.elementLocated(By.css('.pop-notes-title')), ELEMENT_WAIT_MS);
  const sections = await driver.findElements(By.css('.pop-notes-title'));
  const txt = await sections[0].getText();
  assert(txt == 'Trending Notes');

  logger.debug('confirmed Trending Notes visible');
};

/** 
 * Confirms the Trending Assets section is visible
 * 
 */
// const confirmCanSeeTrendingAssets = async function (driver) {
//   await driver.wait(until.elementLocated(By.css('.pop-notes-title')), ELEMENT_WAIT_MS);
//   const sections = await driver.findElements(By.css('.pop-notes-title'));
//   const txt = await sections[1].getText();
//   assert(txt == 'Trending Assets');

//   logger.debug('confirmed Trending Assets visible');
// };