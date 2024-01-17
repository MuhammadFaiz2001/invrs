const { By, until } = require('selenium-webdriver');
const { ELEMENT_WAIT_MS, logger } = require('../../../conf/base.conf');
const { SnapshotDialog } = require('../SnapshotDialog.js');
var assert = require('assert');

const InsidersNavandCheck = {
    clickInsiderName: async function (driver, name) {
        const transactionsDiv = await driver.findElement(By.className('qmod-block-wrapper qmod-section-insiders card'));
        const InsiderNameDiv = await transactionsDiv.findElement(By.className('qmod-dropdown-group'));
        const InsiderNameButton = await InsiderNameDiv.findElement(By.className('qmod-dropdown'));
        await InsiderNameButton.click();

        const ListDiv = await InsiderNameButton.findElement(By.className('qmod-dropdown-menu qmod-dropdown-type'));
        const InsiderName = await driver.wait(until.elementIsEnabled(ListDiv.findElement(By.xpath("//*[text()='" + name + "']"))));
        await driver.sleep(500);
        await InsiderName.click();
        logger.debug('clicked On ' + name );
    },

    clickTransactionType: async function (driver, name) {
        const transactionsDiv = await driver.findElement(By.className('qmod-block-wrapper qmod-section-insiders card'));
        const InsiderNameDiv = await transactionsDiv.findElement(By.className('qmod-modifiers'));
        //const InsiderNameButton = await InsiderNameDiv.findElement(By.className('qmod-dropdown'));
        const someDiv = await InsiderNameDiv.findElement(By.xpath('./div[1]/div[2]'));
        const button = await someDiv.findElement(By.className('qmod-dropdown'));
        await button.click();

        const ListDiv = await button.findElement(By.className('qmod-dropdown-menu qmod-dropdown-type'));
        const InsiderName = await ListDiv.findElement(By.xpath("//*[text()='" + name + "']"));
        await driver.wait(until.elementIsEnabled(InsiderName),ELEMENT_WAIT_MS);
        await InsiderName.click();
        logger.debug('clicked On ' + name );
    },
    clickTransactionYear: async function (driver, name) {
        const transactionsDiv = await driver.findElement(By.className('qmod-block-wrapper qmod-section-insiders card'));
        const InsiderNameDiv = await transactionsDiv.findElement(By.className('qmod-modifiers'));
        //const InsiderNameButton = await InsiderNameDiv.findElement(By.className('qmod-dropdown'));
        const someDiv = await InsiderNameDiv.findElement(By.xpath('./div[1]/div[3]'));
        const button = await someDiv.findElement(By.className('qmod-dropdown'));
        await button.click();

        const ListDiv = await button.findElement(By.className('qmod-dropdown-menu qmod-dropdown-type'));
        const InsiderName = await ListDiv.findElement(By.xpath("//*[text()='" + name + "']"));
        await InsiderName.click();
        logger.debug('clicked On ' + name );
    },
    openSnapshotDialog: async function(driver){
        const tabDiv = await driver.findElement(By.className('tab-div'));
        const tabContentDiv = await tabDiv.findElement(By.xpath('./div[5]'))
        const moreOptionsBtnIcon = await tabContentDiv.findElement(By.xpath('./div[2]/button'));
        // const loader = await driver.wait(until.elementLocated(By.className('qmod-news-loader anim-spin fa fa-spinner')), ELEMENT_WAIT_MS);
        // await driver.wait(until.elementIsNotVisible(loader), ELEMENT_WAIT_MS);
        // await driver.wait(until.elementIsEnabled(moreOptionsBtnIcon));
        //await driver.sleep(10000);
        await moreOptionsBtnIcon.click();

        // Click take snapshot button icon
        await driver.wait(until.elementsLocated(By.className('p-menuitem-icon pi pi-camera')), ELEMENT_WAIT_MS);
        const takeSnapshotBtnIcon = await driver.findElement(By.className('p-menuitem-icon pi pi-camera'));
        await driver.wait(until.elementIsVisible(takeSnapshotBtnIcon), ELEMENT_WAIT_MS);
        await takeSnapshotBtnIcon.click();

        logger.debug('Opened snapshot dialog');
        const dialog = await findSnapshotDialog(driver);
        await SnapshotDialog.waitUntilSnapshotIsReady(driver, dialog);
        logger.debug('Image is Shown');

    },
    goToNextPage: async function(driver){
        const tableDiv = await driver.findElement(By.className('qmod-table-con qmod-insiders-table-con'));
        const buttonsDiv = await tableDiv.findElement(By.className('dataTables_paginate paging_simple_numbers'));
        const nextButton = await buttonsDiv.findElement(By.className('paginate_button next'));
        const attributes = await nextButton.getAttribute('class');
        if(attributes.includes('disabled')){
            logger.debug('Cant go next, On last Page!!!');
        }
        else{
            nextButton.click();
            logger.debug('Went to next Page');
        }
    },
    goToPage: async function(driver, PageNumber){
        const tableDiv = await driver.findElement(By.className('qmod-table-con qmod-insiders-table-con'));
        const buttonsDiv = await tableDiv.findElement(By.className('dataTables_paginate paging_simple_numbers'));
        try{
        const nextButton = await buttonsDiv.findElement(By.xpath("./span/a["+ PageNumber + "]"));
        nextButton.click();
        logger.debug('Went to page ' + PageNumber);
        }
        catch(NoSuchElementError){
            logger.debug('Page #' + PageNumber + ' dose not exist!!!');
        }
    },
    goToPreviousPage: async function(driver){
        const tableDiv = await driver.findElement(By.className('qmod-table-con qmod-insiders-table-con'));
        const buttonsDiv = await tableDiv.findElement(By.className('dataTables_paginate paging_simple_numbers'));
        const prevButton = await buttonsDiv.findElement(By.className('paginate_button previous'));
        const attributes = await prevButton.getAttribute('class');
        if(attributes.includes('disabled')){
            logger.debug('Cant go previous Page, On First Page!!!');
        }
        else{
            prevButton.click();
            logger.debug('Went to previous Page');
        }
    },
    checkTransactions: async function(driver, transactionType, textToCheck){
        let type = transactionType;
        let text;
       const loader = driver.findElement(By.className('qmod-news-loader anim-spin fa fa-spinner'), ELEMENT_WAIT_MS);
        await driver.wait(until.elementIsNotVisible(loader));
        const tableContentDiv = await driver.findElement(By.className('qmod-table-con qmod-insiders-table-con'));
        const tableDiv = await tableContentDiv.findElement(By.className('dataTables_wrapper no-footer'));
        const div = await tableDiv.findElement(By.id('DataTables_Table_0'));
        const tableBodyDiv = await div.findElement(By.xpath('./tbody'))
        for(let i=1; i < 2; i++){
            const rowLists = await tableBodyDiv.findElement(By.xpath('./tr['+ i +']'));
            const textToMatch = await rowLists.findElement(By.className("qmod-insider-"+ type +""));
            if(type == 'name'){
                text = await textToMatch.findElement(By.className("qmod-tooltip"));
            }
            else if(type == 'type'){
                text = await textToMatch.findElement(By.xpath("//*[text()='" + textToCheck + "']"));
            }
            else if(type == 'date'){
                text = textToMatch;
            }
            const textAttribute = await text.getText();
            //logger.debug(textAttribute + " " + textToCheck);
            assert(textAttribute.includes(textToCheck));
        }    
        logger.debug('Transaction Matches the filter')
    }
}

module.exports = { InsidersNavandCheck };

const findSnapshotDialog = async function (driver) {
    await driver.wait(until.elementsLocated(By.className('snapshot-dialog')), ELEMENT_WAIT_MS);
    return await driver.findElement(By.className('snapshot-dialog'));
}