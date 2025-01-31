

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
var dataProviderForWP = require('../testdata/WP_SiteNamesData.json');
var WpProjectMngrData = require('../testdata/WP_SiteNamesData.json')
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
  //**CREATING OPPY ID IN SALESFORCE*/
  test('TC_01_Create Oppy in SalesForce', async ({ }) => {
    const loginPage = new LoginPage(tab0, test.info());
    const createOppy = new CreateOppy(tab0, test.info());
    await loginPage.login(data.login.env, data.login.userName, data.login.passWord);
    await createOppy.createOppy(createData.createOppy.oppyName,createData.createOppy.accountName, createData.createOppy.stage, createData.createOppy.bidDate, createData.createOppy.closeDate, createData.createOppy.worksightDB, createData.createOppy.salesRegion, createData.createOppy.salesOffice, createData.createOppy.revenueStreamType, createData.createOppy.revenueStream, createData.createOppy.verticalMarket);
  });
  dataProvider.forEach(locationsData =>{
    test(`TC_02-Add Locations in Salesforce ${locationsData.location}`, async({ })=>{
      const createOppy = new CreateOppy(tab0, test.info());
      await createOppy.addLocation(locationsData.location);
      console.log(locationsData.workPackage)
    });
  });
  test('TC_03_Add Contact role and Mark current as stage', async ({ }) => {
    const createOppy = new CreateOppy(tab0, test.info());
    await createOppy.addContactRole(createData.createOppy.contactRole, createData.createOppy.role);
    tab1 = await createOppy.markCurrentAsStage();
  });
  test('TC_04-Enable Oracle and Assigning PSD to the job', async()=>{
    const jobsPage = new Jobs(tab1, test.info());
    await jobsPage.enableERP();
  });
  //**CREATION OF CREDIT PROJECT AND TRANSMIT*/
test.describe('TS_02-Creating Credit Project and Transmit', async()=>{
  test('TC_01_Navigate to Bids and update purchasing Document Section ,Update Office and People', async ({ }) => {
    const cpPage = new CreditProject(tab1, test.info());
    await cpPage.navigateToBids();
    await cpPage.addCreditProject();
    await cpPage.updatepurchasingDocumentSection(cpData.purchasingDocument.creditProjectNo, cpData.purchasingDocument.custPONum, cpData.purchasingDocument.account, cpData.purchasingDocument.accountSelect, cpData.purchasingDocument.freightTerms)
    await cpPage.updateOfficeandPeopleEQP();
  });
  test('TC_02_Update - ShipToAddress, JobInformation ,Billing, Classification, ComissionSplit, CreditSupplement , Literature , viewCreditProject and Transmit ', async ({ }) => {
    const cpPage = new CreditProject(tab1, test.info());
    await cpPage.updateShipToAddress(cpData.shipToAddr.addrName, cpData.shipToAddr.name, cpData.shipToAddr.addrLine1, cpData.shipToAddr.addrLine2, cpData.shipToAddr.zipCode, cpData.shipToAddr.billOfLading, cpData.shipToAddr.delName, cpData.shipToAddr.delPhone);
    await cpPage.updateJobInformation();
    await cpPage.updateBilling()
    await cpPage.updateClassification(cpData.purOption, cpData.appOption, cpData.buildOption, cpData.bidOption, cpData.actOption, cpData.equipOption, cpData.jobOption, cpData.ctrlOption);
    await cpPage.updateComissionSplitForEQP(cpData.commSplits[0].commSalesPerson, cpData.commSplits[0].commPercent);
    await cpPage.updateCreditSupplement();
    await cpPage.updateLiterature();
    await cpPage.viewCreditProjectandTransmit();
    //await cpPage.creditJobId();
    // await cpPage.afterTransmitValidation();
  });
});
  


    










