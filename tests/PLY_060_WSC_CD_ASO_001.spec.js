// @ts-check
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageobjects/LoginPage');
const { CreateOppy } = require('../pageobjects/CreateOppy');
const { PropertiesPage } = require('../pageobjects/PropertiesPage');
const { ScopePage } = require('../pageobjects/ScopePage');
const data = require('../testdata/LoginData.json');
const createData = require('../testdata/CreateOppy.json');
const { Jobs } = require('../pageobjects/Jobs');
const jobsData = require('../testdata/JobsData.json');
const { CreateWorkPackagePage } = require('../pageobjects/CreateWpPage');
const { WorkPackage } = require('../pageobjects/WorkPackage');
const { CreditProject } = require('../pageobjects/CreditProject');
const wpData = require('../testdata/WorkPackage.json');
const cpData = require('../testdata/CreditProject.json');
const scopePageData = require('../testdata/TestData_ScopePage.json');
var  { WaitFunctions } = require('../commonUtils/WaitFunctions');
const { CommonFunctions } = require('../commonUtils/CommonFunctions');
const fs = require('fs');
var dataProvider = require('../testdata/locationsData.json');
var dataProviderForWP = require('../testdata/MultipleWpTestData.json');
var WpProjectMngrData = require('../testdata/MultipleWpTestData.json');
let traneMaterialName = 'EQ-I Testing '; /** Name of the trane material added. */
let currentCount = 1; /** For identifying iteration */
//**TRANSMIT FLOW VALIDATION */
test.describe.configure({ mode: 'serial' });
let tab0//**To store first tab info */
let tab1//**To store second tab info */
let tab2//**To store third tab info */
var workPackage;//**To store workpackage id */
test.beforeAll(async ({ browser }) => {
  tab0 = await browser.newPage();
  });
  test.afterAll(async () => {
    await tab0.close();
  });
test('TC_01-Searching for Credit Project', async()=>{
  const cpPage = new CreditProject(tab0, test.info());
  const commonFunction = new CommonFunctions(tab0, test.info());
  const loginPage = new LoginPage(tab0, test.info());
  await loginPage.salesToolsLogin(data.login.url, data.login.userName, data.login.passWord);

  await cpPage.searchAndNavigateToTransmittedCP(cpData.projectNumber);
  tab1 = await commonFunction.newTab(cpPage.projectNumbLink);
});
test('TC_02-ASO', async()=>{
  const cpPage = new CreditProject(tab1, test.info());
  await cpPage.editCreditProject();
  await cpPage.navigateToAssignSalesOrder();
  await cpPage.updateFieldsToAssignSalesOrder();
  //await cpPage.updateCustomerDeliveryWindowForNonTrane();
  await cpPage.validateAso();
  await cpPage.transmitCreditProjectAfterASO();
});