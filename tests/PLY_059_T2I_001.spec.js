const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageobjects/LoginPage');
const TaxTestData = require('../testdata/TaxTestData.json');
const data = require('../testdata/LoginData.json');
const { TaxDeterminationPage } = require('../pageobjects/TaxDeterminationPage');
var  { WaitFunctions } = require('../commonUtils/WaitFunctions');
const { CommonFunctions } = require('../commonUtils/CommonFunctions');
const fs = require('fs');

//**TRANSMIT FLOW VALIDATION */
test.describe.configure({ mode: 'serial' });
let tab0//**To store first tab info */
let tab1//**To store second tab info */
let tab2//**To store third tab info */
test.beforeAll(async ({ browser }) => {
  tab0 = await browser.newPage();
});
test.afterAll(async () => {
  await tab0.close();
});
test('TC_01-Log in Salestools and navigate to Credit request page', async()=>{
  const TaxPage = new TaxDeterminationPage(tab0, test.info());
  const commonFunction = new CommonFunctions(tab0, test.info());
  const loginPage = new LoginPage(tab0, test.info());
  await loginPage.salesToolsLogin(data.login.url, data.login.userName, data.login.passWord);

  await TaxPage.navigateToCreditRequests();
  tab1 = await commonFunction.newTab(TaxPage.jobOrProjectsDashboard);
});
test('TC_02-Search for Credit Project ', async()=>{
    const TaxPage = new TaxDeterminationPage(tab1, test.info());
    const commonFunction = new CommonFunctions(tab1, test.info());
    await TaxPage.filterAndSelectProject();
    tab2 = await commonFunction.newTab(TaxPage.clickOnFirstResult);
  });
test('TC_03-Update reuqired for details for first work package ', async()=>{
    const TaxPage2 = new TaxDeterminationPage(tab2, test.info());
    const TaxPage1 = new TaxDeterminationPage(tab1, test.info());
    await TaxPage2.updateShipToAddress();
    await TaxPage2.updateWpLocAddress();
    await TaxPage2.selectRadioBtn();
    await TaxPage2.uploadFile();
    await TaxPage2.submitTaxForm();
    TaxPage2.closeTab();
    TaxPage1.closeTab();
  });
  test('TC_04-Log in Salestools with approver account and navigate to Credit request page', async()=>{
    const TaxPage = new TaxDeterminationPage(tab0, test.info());
    const commonFunction = new CommonFunctions(tab0, test.info());
    const loginPage = new LoginPage(tab0, test.info());
    await TaxPage.signOut();
    await loginPage.loginWsWithTestaccount17(data.login.url,data.login.userName17, data.login.passWord);
    await TaxPage.navigateToCreditRequests();
    tab1 = await commonFunction.newTab(TaxPage.jobOrProjectsDashboard);
  });
  test('TC_05-Search for credit request project ', async()=>{
    const TaxPage = new TaxDeterminationPage(tab1, test.info());
    const commonFunction = new CommonFunctions(tab1, test.info());
    await TaxPage.filterAndSelectRequestedProject();
    tab2 = await commonFunction.newTab(TaxPage.clickOnFirstResult);
  });
  test('TC_06-update the tax approver section for first work package  ', async()=>{
    const TaxPage2 = new TaxDeterminationPage(tab2, test.info());
    const TaxPage1 = new TaxDeterminationPage(tab1, test.info());
    await TaxPage2.updateTaxApproverSectionWp1();
    await TaxPage2.submitTaxForm();
    TaxPage2.closeTab();
    TaxPage1.closeTab();
  });
  test('TC_07-Log in Salestools with requested account and navigate to Credit request page', async()=>{
    const TaxPage = new TaxDeterminationPage(tab0, test.info());
    const commonFunction = new CommonFunctions(tab0, test.info());
    const loginPage = new LoginPage(tab0, test.info());
    await TaxPage.signOut();
    await loginPage.loginWsWithTestaccount13(data.login.url,data.login.userName, data.login.passWord);
    await TaxPage.searchAndNavigateToCP(TaxTestData.projectNumber);
    tab1 = await commonFunction.newTab(TaxPage.projectNumbLink);
});
test('TC_08-Navigate to Sov', async()=>{
    const TaxPage = new TaxDeterminationPage(tab1, test.info());
    await TaxPage.navigateToSov();
    await TaxPage.addSovLine1(TaxTestData.addSov.lineDescription1,TaxTestData.addSov.allocationPerc,TaxTestData.addSov.retentionPerc,TaxTestData.addSov.taxIdentifier);
    await TaxPage.addSovLine2(TaxTestData.addSov.lineDescription2,TaxTestData.addSov.allocationPerc,TaxTestData.addSov.retentionPerc,TaxTestData.addSov.taxIdentifier,TaxTestData.addSov.shiptTo);
  });
test('TC_09-Navigate to Invoice', async()=>{
    const TaxPage = new TaxDeterminationPage(tab1, test.info());
    await TaxPage.navigateToInvoice();
    await TaxPage.addInvoiceCategory();
    await TaxPage.addInvoice(TaxTestData.addInvoice.entryType[0],TaxTestData.addInvoice.status[1],TaxTestData.addInvoice.billAmount);
});






 
  //   const TaxPage = new TaxDeterminationPage(tab0, test.info());
  //   const commonFunction = new CommonFunctions(tab0, test.info());
  //   const loginPage = new LoginPage(tab0, test.info());
  //   await TaxPage.signOut();
  //   await loginPage.loginWsWithTestaccount13(data.login.url,data.login.userName, data.login.passWord);
  //   await TaxPage.navigateToCreditRequests();
  //   tab1 = await commonFunction.newTab(TaxPage.jobOrProjectsDashboard);
  // });
  // test('TC_08-Search for Project ', async()=>{
  //   const TaxPage = new TaxDeterminationPage(tab1, test.info());
  //   const commonFunction = new CommonFunctions(tab1, test.info());
  //   await TaxPage.verifyClosedRequest();
  //   tab2 = await commonFunction.newTab(TaxPage.clickOnFirstResult);
  // });
  

  
  // test('TC_05-Log in Salestools with approver account and navigate to Credit request page', async()=>{
  //   const TaxPage = new TaxDeterminationPage(tab0, test.info());
  //   const commonFunction = new CommonFunctions(tab0, test.info());
  //   const loginPage = new LoginPage(tab0, test.info());
  //   await loginPage.loginWsWithTestaccount17(data.login.url,data.login.userName17, data.login.passWord);
  //   await TaxPage.navigateToCreditRequests();
  //   tab1 = await commonFunction.newTab(TaxPage.jobOrProjectsDashboard);
  // });
  // test('TC_06-Search for credit request project ', async()=>{
  //   const TaxPage = new TaxDeterminationPage(tab1, test.info());
  //   const commonFunction = new CommonFunctions(tab1, test.info());
  //   await TaxPage.filterAndSelectRequestedProject();
  //   tab2 = await commonFunction.newTab(TaxPage.clickOnFirstResult);
  // });
  // test('TC_07-update the tax approver section for first work package  ', async()=>{
  //   const TaxPage = new TaxDeterminationPage(tab2, test.info());
  //   await TaxPage.updateTaxApproverSectionWp1();
  // });
  // test('TC_08-update the tax approver section for first work package  ', async()=>{
  //   const TaxPage = new TaxDeterminationPage(tab2, test.info());
  //  // await TaxPage.updateTaxApproverSectionWp2();
  //   await TaxPage.submitTaxForm();
  // });