const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../../conf/base.conf');

const OverviewChart = {

  openSnapshotDialog: async function (driver) {

    const securityOverviewChartCard = await findSecurityOverviewChartCard(driver);

    await waitUntilChartIsReady(driver, securityOverviewChartCard);

    await clickOptionsButton(driver, securityOverviewChartCard);

    try {
      await clickTakeSnapshotButton(driver);
    } catch (e) {
      // Do nothing
    }

    const snapshotDialogElements = await driver.findElements(By.className('snapshot-dialog'));

    if (snapshotDialogElements.length == 0) {

      await clickOptionsButton(driver, securityOverviewChartCard);

      await clickTakeSnapshotButton(driver);

    }

    logger.debug('Opened snapshot dialog');

  }

}

module.exports = { OverviewChart };

const findSecurityOverviewChartCard = async function (driver) {
  try {
    await driver.wait(until.elementsLocated(By.className('security-overview-chart-card')), ELEMENT_WAIT_MS);
  } catch (e) {
    await driver.wait(until.elementsLocated(By.className('security-overview-chart-card')), ELEMENT_WAIT_MS);
  }
  return await driver.findElement(By.className('security-overview-chart-card'));
}

const waitUntilChartIsReady = async function (driver, securityOverviewChartCard) {

  // Wait until loader-container is not visible
  await driver.wait(until.elementsLocated(By.className('loader-container')), ELEMENT_WAIT_MS);
  const loaderContainer = await securityOverviewChartCard.findElement(By.className('loader-container'));
  await driver.wait(until.elementIsNotVisible(loaderContainer), ELEMENT_WAIT_MS);

  // Wait until high charts group is visible
  await driver.wait(until.elementsLocated(By.className('highcharts-series-group')), ELEMENT_WAIT_MS);
  const highChartsGroup = await securityOverviewChartCard.findElement(By.className('highcharts-series-group'));
  await driver.wait(until.elementIsVisible(highChartsGroup), ELEMENT_WAIT_MS);

}

const clickOptionsButton = async function (driver, card) {

  await driver.wait(until.elementsLocated(By.className('pi pi-ellipsis-h p-button-icon')), ELEMENT_WAIT_MS);
  const moreOptionsBtnIcon = await card.findElement(By.className('pi pi-ellipsis-h p-button-icon'));
  await driver.wait(until.elementIsVisible(moreOptionsBtnIcon), ELEMENT_WAIT_MS);
  await moreOptionsBtnIcon.click();

}

const clickTakeSnapshotButton = async function (driver) {

  await driver.wait(until.elementsLocated(By.className('p-menuitem-icon pi pi-camera')), ELEMENT_WAIT_MS);
  const takeSnapshotBtnIcon = await driver.findElement(By.className('p-menuitem-icon pi pi-camera'));
  await driver.wait(until.elementIsVisible(takeSnapshotBtnIcon), ELEMENT_WAIT_MS);
  await takeSnapshotBtnIcon.click();

}