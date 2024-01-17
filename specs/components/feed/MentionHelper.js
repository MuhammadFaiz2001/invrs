const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../../conf/base.conf');
const assert = require('assert');
const TestHelper = require('../TestHelper');

const MentionHelper = {

  types: {
    username: 'username',
    equity: 'equity',
    fund: 'fund',
    tag: 'tag'
  },

  /**
   * Adds mentions to editor.
   * 
   * @param {WebDriver} driver 
   * @param {WebElement} editor 
   * @param {{username: '@username', equity: '$equity_name', fund: '$fund_name', tag: '#tag_name'}} mentions
   * @returns {string[]}
   */
  addMentions: async function (driver, editor, mentions) {

    let mentionsDescription = [];

    for (const type of Object.values(this.types)) {

      if (mentions[type]) {
        await this.addMention(driver, editor, mentions[type], type);
        mentionsDescription.push(type);
      }

    }

    return mentionsDescription;

  },

  /**
  * Adds mention to editor.
  * 
  * @param {WebDriver} driver 
  * @param {WebElement} editor 
  * @param {string} mention
  * @param {string} mentionType
  */
  addMention: async function (driver, editor, mention, mentionType) {

    const mentionCssClass = mentionCssClasses[mentionType];

    // Focus on editor
    await editor.sendKeys('');

    // Enter mention with space in front
    await editor.sendKeys(' ' + mention[0]);
    await driver.sleep(500);

    await editor.sendKeys(mention[1]);

    await driver.wait(until.elementLocated(By.css('.ck-mentions li:nth-child(1)')), ELEMENT_WAIT_MS);
    const mentionMatchesListItem = await driver.findElement(By.css('.ck-mentions li:nth-child(1)'));
    await driver.wait(until.elementIsVisible(mentionMatchesListItem), ELEMENT_WAIT_MS);

    await editor.sendKeys(mention.slice(2));
    await TestHelper.safeWaitUntilStalenessOf(driver, mentionMatchesListItem);

    await findAndClickExactMentionMatch(driver, mention, mentionCssClass);

    // Find the mention by link text
    const mentionLink = await editor.findElement(By.linkText(mention));

    // Check mention css class
    const mentionLinkClass = await mentionLink.getAttribute('class');
    assert(mentionLinkClass.includes(mentionCssClass));

    logger.debug(`Added ${mentionType} mention: ${mention}`);

  }

}

module.exports = { MentionHelper };

const mentionCssClasses = {
  username: 'analyst-mention',
  equity: 'security-mention',
  fund: 'security-mention',
  tag: 'tag-mention',
}

const findMentionMatchesList = async function (driver) {

  await driver.wait(until.elementLocated(By.css('.ck-mentions')), ELEMENT_WAIT_MS);
  const mentionMatchesList = await driver.findElement(By.css('.ck-mentions'));
  await driver.wait(until.elementIsVisible(mentionMatchesList), ELEMENT_WAIT_MS);
  return mentionMatchesList;

}

const findAndClickExactMentionMatch = async function (driver, mention, mentionCssClass) {

  const mentionMatchesList = await findMentionMatchesList(driver);

  // Find all mention matches items
  await driver.wait(until.elementLocated(By.className('ck-list__item')), ELEMENT_WAIT_MS);
  const mentionMatchesItems = await mentionMatchesList.findElements(By.className('ck-list__item'));

  let match = null;

  if (mentionCssClass == mentionCssClasses.tag) {
    match = await findTagMentionMatch(mentionMatchesItems, mention);
  } else if (mentionCssClass == mentionCssClasses.username) {
    match = await findUserMentionMatch(driver, mentionMatchesItems, mention);
  } else {
    match = await findFundAndEquityMentionMatch(driver, mentionMatchesItems, mention);
  }

  // Assertion to show error in case match is not found
  assert(match != null);

  // Click match
  await match.click();
  await TestHelper.safeWaitUntilStalenessOf(driver, match);

}

const findTagMentionMatch = async function (mentionMatchesItems, mention) {

  for (const item of mentionMatchesItems) {

    const itemText = await item.getText();
    // Remove '#'
    const mentionText = mention.substring(1);

    if (itemText == mentionText) {
      return item;
    }
  }

  return null;
}

const findUserMentionMatch = async function (driver, mentionMatchesItems, mention) {

  for (const item of mentionMatchesItems) {

    // Find username and get text
    await driver.wait(until.elementLocated(By.className('username')), ELEMENT_WAIT_MS);
    const username = await item.findElement(By.className('username'));
    const usernameText = await username.getText();

    if (usernameText == mention) {
      return item;
    }
  }

  return null;
}

const findFundAndEquityMentionMatch = async function (driver, mentionMatchesItems, mention) {

  for (const item of mentionMatchesItems) {

    // Check is item containing a header
    await driver.wait(until.elementLocated(By.className('item-header')), ELEMENT_WAIT_MS);
    const itemHeaders = await item.findElements(By.className('item-header'));
    const isItemContainingHeader = itemHeaders.length > 0;

    if (!isItemContainingHeader) {
      // Find label and get text
      await driver.wait(until.elementLocated(By.className('item-symbol')), ELEMENT_WAIT_MS);
      const itemLabel = await item.findElement(By.className('item-symbol'));
      const itemLabelText = await itemLabel.getText();
      // Remove '$'
      const mentionText = mention.substring(1);

      if (itemLabelText == mentionText) {
        return item;
      }
    }

  }

  return null;
}