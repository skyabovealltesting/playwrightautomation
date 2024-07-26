
const { expect } = require('@playwright/test');
var { CommonFunctions } = require('../commonUtils/CommonFunctions');
var { WaitFunctions } = require('../commonUtils/WaitFunctions');
var { Assertions } = require('../commonutils/Assertions');
const { CreateWorkPackagePage } = require('../pageobjects/CreateWpPage.js');
const { JobConfigurePage } = require('../pageobjects/JobConfigurePage.js');
const { PropertiesPage } = require('../pageobjects/PropertiesPage.js');
const { ScopePage } = require('../pageobjects/ScopePage.js');
const scopePageData = require('../testdata/TestData_ScopePage.json');
const jobsData = require('../testdata/JobsData.json');
const path = require('path');
const Excel = require('exceljs');
const wpData = require('../testdata/WorkPackage.json');
const wb = new Excel.Workbook();
let currentWorkpackageName;
let projectName;
const directJobExpense = scopePageData.configureContainer.directJobExpense;

class WorkPackage {


    constructor(page, testInfo) {
      this.expectCondition = new Assertions(page, testInfo);
      this.createWpScreen = new CreateWorkPackagePage(page, testInfo);
      this.jobConfigureScreen = new JobConfigurePage(page, testInfo);
      this.propertiesScreen = new PropertiesPage(page, testInfo);
      this.scopeScreen = new ScopePage(page, testInfo);
      this.commonmethods = new CommonFunctions(page, testInfo)
      this.waitmethods = new WaitFunctions(page)
      this.commonFunction = new CommonFunctions(page, testInfo)
      this.waitFunction = new WaitFunctions(page)
      this.firstJobInList = this.jobConfigureScreen.firstJob;
        this.page = page;
        this.testInfo = testInfo;
        this.searchBox = page.getByPlaceholder('Search...');
        this.loader = page.locator('span.k-i-loading');
        this.searchJobIcon = page.locator('xpath=//i[@class="fa fa-search"]');
        this.firstJob = page.locator('td div.highlight').first();
        this.wpTab = page.locator('xpath= //span[contains(text(),"Work Packages ")]')
        this.configureTab = page.locator('xpath=//span[text()=" Configure "]')
        this.wpLink = page.locator('xpath=//li[@id="k-tabstrip-tab-3"]');
        this.searchResultlink = page.locator('xpath=//td[@data-kendo-grid-column-index="3"]//span').nth(1)
        this.wpsearchResultlink = page.locator('xpath=//td[@data-kendo-grid-column-index="3"]//span').nth(0)
        this.navigateToProperties = page.locator('xpath=//a//span[contains(text(),"Properties")]')
        this.distToProj = page.locator('xpath=//kendo-numerictextbox[@formcontrolname="distanceToProject"]//input')
        this.phoneIcon = page.locator('xpath=//i[contains(@class, "-phone")]');
        //**CREATE WP */
        this.createButton = page.getByRole('button', { name: ' CREATE' })
        this.wpNameText = page.locator('#workPackage')
        this.controlsContracting = page.getByRole('treeitem', { name: ' Controls-Contracting' }).locator('span').first();
        this.csRevenueStreamType = page.locator('xpath=//kendo-treeview//span[contains(text(), "HVAC: Controls to Owner - Direct")]');
        this.energyServices = page.getByRole('treeitem', { name: ' Energy Services' }).locator('span').first();
        this.esRevenueStreamType = page.locator('xpath=//kendo-treeview//span[contains(text(), "Large Turnkey")]');
        this.ifRevenueStreamType = page.locator('xpath=//kendo-treeview//span[contains(text(), "REF: Industrial Refrigeration")]');

        this.revenueStreamDropDown = page.getByRole('listbox').locator('span').nth(2);
        this.saveButton = page.getByRole('button', { name: ' Save' })
        this.projectManager = page.getByPlaceholder('Project Manager')
        this.projectManagerResult = page.locator('xpath=(//*[@role="listbox"])[2]//li').first();
        //**WPLIST PAGE */
        this.officeSelectorDropdown = page.locator('tsmt-office-selector span').nth(4);
        this.searchBar = page.getByPlaceholder('Search...')
        this.searchIcon = page.getByTitle('Search')
        this.officeSelectorText = page.locator('xpath=//span[@class="k-input"]').first();
        this.wpcolumn = page.locator('xpath=//span[text()="Work Package Name"]')
        this.workPackageTab = page.getByText('Work Packages');
        this.firstWorkPackage = page.locator('xpath=//td[@aria-colindex="4"]/span').first();
          //**Properties PAGE */
        this.navigateToProperties = page.locator('xpath=//a//span[contains(text(),"Properties")]');
        this.siteNameDrpDwn = page.locator('#siteName');
        this.partsCenter = page.locator('#partsCenter');
        this.toasterClose=page.locator('xpath=//kendo-notification//span[contains(@class, "-i-close")]')


        //**SCOPE PAGE */
        this.navigateToScopeLink = page.locator('xpath=//span[contains(text(),"Scope")]');
        this.navigateToPlcLink = page.getByText('Project Level Cost Items')
        //**PLC CONTAINER */
        this.addButton = page.getByRole('button', { name: ' ADD' })
        this.CostItemTypeDropdown = page.locator('xpath=//kendo-dropdownlist[@formcontrolname="type"]')
        this.description = page.locator('#description')
        this.laborType = page.locator('kendo-combobox span').nth(2)
        this.hours = page.locator('xpath=//kendo-numerictextbox[@formcontrolname="hours"]//input')
        this.save = page.getByRole('button', { name: ' SAVE', exact: true })
        this.traneMaterialCheckbox = page.locator('xpath=//input[@type="checkbox"]').last();
        this.amount = page.locator('xpath=//kendo-numerictextbox[@formcontrolname="amount"]//input')
        this.cost = page.locator('xpath=//kendo-numerictextbox[@formcontrolname="cost"]//input')
        this.vendor = page.locator('xpath=//kendo-combobox[@formcontrolname="vendor"]//input')
        this.partNumber = page.locator('#partNumber')
        this.vendorType = page.locator('kendo-combobox span').nth(2)
        this.subcontractorType = page.locator('xpath=//kendo-combobox[@formcontrolname="subcontractor"]//input')
        this.feeType = page.locator('#fee');
        this.rate = page.locator('xpath="//kendo-numerictextbox[@formcontrolname="rate"]//input')
        this.duration = page.locator('xpath=//kendo-numerictextbox[@formcontrolname="duration"]//input')
        this.firstTraneMaterialExpand = page.locator("xpath=(//tsmt-add-trane-material//span[contains(@class, '-expand')])[1]");
        this.traneMaterialDescription = page.locator("xpath=//span[@class='product-description']");
        //
        this.containers = page.locator('span.container-description');
        this.addCostItem = page.locator('#addCostItem');
        this.ciTypeExpand = page.locator('[formcontrolname = type] span .k-select');
        this.ciTypes = page.locator('kendo-list ul li');
        this.ciTypeInput = page.locator('span.k-input');
        this.ciType = page.locator("[formcontrolname='type'] span.k-input");
        this.cidropdownList = page.locator('kendo-list');
        this.ciSave = page.locator('#save');
        this.notesSection = page.locator('tsmt-add-cost-item .t-nav-link').nth(1);
        this.notes = page.locator("[formcontrolname='note']");
        this.expandContainer = page.locator("div.configure-container span[class*='fa-angle']");
        this.addedCiDescription = page.locator('tsmt-cost-item-grid span.description');
        this.addedCiCheckbox = page.locator("input[id*='costItem']");
        this.ciDelete = page.locator('tsmt-cost-item-grid').getByTitle('Delete').first();
        this.ciEdit = page.locator('tsmt-cost-item-grid tbody').getByTitle('Edit'); 
        this.delete = page.getByRole('button', {name:'DELETE'});
        this.traneMaterialSelectAll = page.locator('#traneMaterial');
        this.traneMaterialCheckboxes = page.locator('.trane-material-list input');
        //**REQUEST VALIDATION */
        this.backButton = page.getByText('BACK')
        this.wpName = page.locator('xpath=//span[@class="work-package-name"]')
        this.requestValidationButton = page.locator('#requestValidation');
        this.requestTo = page.getByRole('listbox', { name: 'Choose Recipients' })
        this.requestToSelect = page.getByText('CtxStg20@tranetechnologies.com')
        this.requestTofill = page.locator('textarea')
        this.sendButton = page.getByRole('button', { name: ' Send' })
        this.sendBtn = page.locator('xpath=//button[contains(text(), "Send")]')
        this.preferencesLink = page.locator('.preferences-link')
        this.signOutLink = page.getByRole('link', { name: ' Sign out' })
        this.transmitButton = page.locator('#transmit')
        this.validationReplyButton = page.locator('#validationReply')
        this.status = page.locator('#status');
        this.validationReplySend = page.locator('xpath=//button[@id="next"]//span')
        this.nextButton = page.getByRole('button', { name: ' NEXT' })
        this.transitionButton = page.locator('#transition')
        this.transitionNextButton = page.locator('#requestTransmit')
        this.send = page.locator('#send')
        this.requestToSelect13 = page.getByText('CtxStg13@tranetechnologies.com')
        this.YesButton = page.getByRole('button', { name: 'YES' })
        this.transmitButton = page.locator('#transmit')
        this.rvToaster = page.locator('xpath=//*[text()="Request Validation sent successfully to the User"]')
        this.vrToaster = page.locator('xpath=//*[text()="Validation Reply sent successfully to the Requestor"]');
        this.tsToaster = page.locator('xpath=//*[text()="Work Package transitioned successfully"]')
        this.submitToaster=page.locator('xpath=//*[text()="Work Package submitted successfully"]')
        this.loadingWait = page.locator('css=.k-loading-image');
        this.sflogOut = page.locator('xpath=//div[@data-message-id="loginAsSystemMessage"]//a')
        this.sfLogoutPage = page.locator('xpath=//div[@id="api"]')
        this.workSightAzureLogin = page.getByRole('link', { name: 'Sign in here' })
        this.officeSelectorDP = page.getByText('Business Transformation Test')
        this.phoneIcon=page.locator('xpath=//i[contains(@class, "fas fa-phone")]')
      
    }
    async navigateToWP() {
        await this.commonmethods.clickOnElement(this.wpTab)
        await this.page.waitForURL('**/work-packages')
        await this.page.waitForLoadState();
    };
    async navigateToWorkpackageTab(){
        await this.commonmethods.clickOnElement(this.wpTab); 
  }
    async navigateToWPFromLandingPage() {
        await this.waitmethods.waitForVisible(this.wpLink)
        await this.commonmethods.clickOnElement(this.wpLink)
        await this.page.waitForURL('**/work-packages')
        await this.page.waitForLoadState();
        await this.commonmethods.verifyVisible(this.wpcolumn,"WorkPackageNavigation")
    };
    async setOfficeSelector(officeName) {
        await this.commonmethods.comboBoxSelectByRoleExact(this.officeSelectorDP, officeName)
        await this.waitmethods.invisibilityOfBlackLoader();
    }
    async jobSearch(jobName){
        this.commonmethods.fillElement(this.searchBox, jobName);
        this.commonmethods.clickOnElement(this.searchJobIcon);
        await this.waitmethods.invisibilityOfBlackLoader();
        this.waitmethods.waitForVisible(this.firstJob);
        await this.expectCondition.verifyVisible(this.firstJob, 'Searched Job')
        await this.commonmethods.clickOnElement(this.firstJob);
    }
    async searchWP(estimateid) {
        await this.commonmethods.clickOnElement(this.searchBar)
        await this.commonmethods.fillElement(this.searchBar, estimateid)
        await this.commonmethods.clickOnElement(this.searchIcon)
        await this.waitmethods.waitForVisible(this.wpsearchResultlink)
        const page1Promise = this.page.waitForEvent('popup');
        await this.wpsearchResultlink.click();
        var page1 = await page1Promise;
        await page1.waitForLoadState();
        await page1.waitForURL('**/scope')
        return page1;
    }
    async navigateToProp() {
        await this.page.waitForLoadState();
        await this.waitmethods.waitForVisible(this.navigateToPlc)
        await this.commonmethods.clickOnElement(this.navigateToPlc)
    }
    async createPageNavigation() {
        const page2Promise = this.page.waitForEvent('popup');
        await this.waitmethods.waitForVisible(this.createButton)
        await this.commonmethods.clickOnElement(this.createButton)
        const page2 = await page2Promise;
        await page2.waitForURL('**/create')
        await page2.waitForLoadState('networkidle');
        return page2;
    }
    async createWp(revenueStreamSelect) {
        await this.commonmethods.clickOnElement(this.revenueStreamDropDown)
        await this.commonmethods.clickOnElement(this.energyServices)
        await this.page.getByRole('treeitem', { name: revenueStreamSelect }).locator('span').click();
        await this.commonmethods.clickOnElement(this.saveButton)
        await this.waitFunction.invisibilityOfRedLoader();
        await this.waitFunction.waitForVisible(this.propertiesScreen.navigation.first());
        await this.expectCondition.verifyVisible(this.propertiesScreen.navigation.first(), 'Workpackage created.');
    }
    async navigateToPLC() {
        await this.commonmethods.clickOnElement(this.navigateToPlcLink)
    }
    async navigateToScope() {
        await this.page.reload();
        await this.waitmethods.waitForVisible(this.navigateToScopeLink)
        await this.commonmethods.clickOnElement(this.navigateToScopeLink)
        await this.page.waitForURL('**/scope')
        await this.page.waitForLoadState();
    };
    async addTraneMaterialInCostItem() {
      await this.commonmethods.clickOnElement(this.scopeScreen.addCostItem)
      await this.scopeScreen.ciTypeSelect(scopePageData.configureContainer.traneMaterial.selectTraneMaterial);
      await this.waitmethods.waitForHidden(this.createWpScreen.loader)
      await this.commonmethods.checkBoxSelect(this.traneMaterialSelectAll)
      await this.commonmethods.clickOnElement(this.scopeScreen.ciSave)
      await expect(this.propertiesScreen.toaster).toHaveText(scopePageData.configureContainer.traneMaterial.toasterMessage);
      await this.commonmethods.clickOnElement(this.propertiesScreen.toasterClose);
      await this.waitmethods.waitForHidden(this.createWpScreen.loader)
    }
    async addTraneMaterial(materialName) {
        await this.waitmethods.waitForVisible(this.addButton)
        await this.commonmethods.clickOnElement(this.addButton)
        await this.commonmethods.clickOnElement(this.CostItemTypeDropdown)
        await this.page.getByRole('option', { name: 'Trane Material' }).first().click();
        await this.commonmethods.clickOnElement(this.firstTraneMaterialExpand);
        await this.waitmethods.waitForVisible(this.traneMaterialDescription.first());
        let totalTraneMaterialCount = await this.commonmethods.getCount(this.traneMaterialDescription);
      for(let i=0; i< totalTraneMaterialCount; i++){
        let currentElementText = await this.commonmethods.getText(this.traneMaterialDescription.nth(i));
        let checkBoxElement = await this.page.locator(
          "xpath=//span[@class='product-description' and text()='"+materialName+"']/ancestor::span/preceding-sibling::kendo-checkbox/input"
        );
        if(currentElementText === materialName){
          await this.commonmethods.scrollToElement(checkBoxElement);
          await this.waitmethods.waitForVisible(checkBoxElement);
          await this.commonmethods.checkBoxSelect(checkBoxElement);
          await this.scopeScreen.ciSave.click();
          await expect(this.propertiesScreen.toaster).toHaveText("Trane Material item added successfully");
          await this.propertiesScreen.toasterClose.click();
          await expect(this.createWpScreen.loader).toHaveCount(0);
          break;
        } else {
          console.log(` trane material named ${materialName} added`);
        }
      }
    }
    async getContainerID(drAddress,wpID){
        return "https://uatservices.trane.com/workpackage/api/v1/"+drAddress+"/WorkPackages/"+wpID+"/Containers";  
    }
    async postLaboururl(drAddress,wpID){
        return "https://uatservices.trane.com/workpackage/api/v1/"+drAddress+"/WorkPackages/"+wpID+"/Labors"
    }
    async postNTMurl(drAddress,wpID){
       return "https://uatservices.trane.com/workpackage/api/v1/"+drAddress+"/WorkPackages/"+wpID+"/CostItems"
    }
    async postTPurl(drAddress,wpID){
        return "https://uatservices.trane.com/workpackage/api/v1/"+drAddress+"/WorkPackages/"+wpID+"/CostItems"
     }
     async postSubContracturl(drAddress,wpID){
        return "https://uatservices.trane.com/workpackage/api/v1/"+drAddress+"/WorkPackages/"+wpID+"/CostItems"
     }
     async postDJEurl(drAddress,wpID){
        return "https://uatservices.trane.com/workpackage/api/v1/"+drAddress+"/WorkPackages/"+wpID+"/DirectJobExpenses"
     }
     postLabor(workpackageID,containerID){
        var postLabor=[{
            "laborItem": {
              "laborItemId": 0,
              "workPackageId": workpackageID,
              "containerId": containerID,
              "description": "Labor",
              "laborTypeId": 1043,
              "laborRate": 102.71,
              "calculationMethod": 1,
              "hours": 2,
              "tripCount": 0,
              "isUserEntered": false,
              "noteId": null,
              "noteText": null
            }
          }]
          return postLabor;
    }
     postNTM(workpackageID,containerID){
        var postNTM=[{
            "bulkAddCostItemViewModel": {
              "workPackageId": workpackageID,
              "containerId": containerID,
              "nonTraneMaterialItems": [
                {
                  "workPackageId": workpackageID,
                  "containerId": containerID,
                  "description": "NTM",
                  "vendorId": 2219,
                  "partNumber": "2",
                  "materialAvailabilityType": "Install",
                  "deviceTypeId": null,
                  "materialMultiplier": 1,
                  "quantity": 1,
                  "amount": 100,
                  "documentIds": null,
                  "noteId": null,
                  "materialSource": "MANUAL",
                  "noteText": null
                }
              ],
              "traneMaterialItems": [],
              "tranePartItems": []
            }
          }]
          return postNTM;
    }
     postTP(workpackageID,containerID){
        var postTP=[{
            "bulkAddCostItemViewModel": {
              "workPackageId": workpackageID,
              "containerId": containerID,
              "nonTraneMaterialItems": [],
              "traneMaterialItems": [],
              "tranePartItems": [
                {
                  "workPackageId": workpackageID,
                  "containerId": containerID,
                  "description": "TraneParts",
                  "vendorId": null,
                  "partNumber": "2",
                  "materialAvailabilityType": "Install",
                  "deviceTypeId": null,
                  "materialMultiplier": 1,
                  "quantity": 1,
                  "amount": 100,
                  "documentIds": null,
                  "noteId": null,
                  "materialSource": "MANUAL",
                  "noteText": null
                }
              ]
            }
          }]
          return postTP;
    }
     postSubContract(workpackageID,containerID){
        var postSubContract=[{
            "bulkAddCostItemViewModel": {
              "workPackageId": workpackageID,
              "containerId": containerID,
              "subcontractItems": [
                {
                  "workPackageId": workpackageID,
                  "containerId": containerID,
                  "description": "SubContract",
                  "subcontractorType": "OTH",
                  "subcontractorId": 2325,
                  "amount": 100,
                  "documentIds": null,
                  "documentIdsToAdd": null,
                  "documentIdsToRemove": null,
                  "subcontractId": 0,
                  "drAddressId": 30,
                  "noteId": null,
                  "noteText": null
                }
              ]
            }
          }]
          return postSubContract;
    }
     postDJELicense(workpackageID,containerID){
        var postDJELicense=[{
            "directJobExpenseItem": {
              "workPackageId": workpackageID,
              "containerId": containerID,
              "directJobExpenseId": 0,
              "description": "DJELicense",
              "feeType": "LICENSE",
              "rate": 100,
              "materialMultiplier": 1,
              "duration": 2,
              "quantity": 1,
              "durationType": "hours",
              "productCode": null,
              "noteId": null,
              "documentIds": null,
              "noteText": null
            }
          }]
return postDJELicense
    }
    async clickOnBack() {
        await this.commonmethods.clickOnElement(this.backButton)
        await this.page.waitForURL('**/scope')
    }
    async getEstimateid() {
        var rawelements = await this.wpName.innerText()
        console.log(rawelements)
        var splitted = rawelements.split(" ");
        console.log("sp" + splitted)
        console.log("Work Package Name is " + splitted[1]);
        return splitted[1]
    }
    async requestValidation() {
        await this.waitmethods.waitForVisible(this.requestValidationButton)
        await this.commonmethods.clickOnElement(this.requestValidationButton)
        await this.waitmethods.waitForVisible(this.requestTo)
        await this.commonmethods.clickOnElement(this.requestTo)
        await this.commonmethods.fillElement(this.requestTo, 'CtxStg20@tranetechnologies.com')
        await this.commonmethods.clickOnElement(this.requestToSelect)
        await this.waitmethods.waitForVisible(this.sendBtn)
        await this.commonmethods.clickOnElement(this.sendBtn)
        await this.commonmethods.verifyVisible(this.rvToaster,"RequestValidation")
        await this.page.close();
    }
    async signOut() {
        await this.page.bringToFront()
        await this.commonmethods.clickOnElement(this.preferencesLink)
        await this.commonmethods.clickOnElement(this.signOutLink)
        await this.waitmethods.waitForVisible(this.workSightAzureLogin)
    }
    async closeTab() {
        await this.page.bringToFront();
        await this.page.close();
    }
    async signOutSF() {
        await this.page.bringToFront();
        await this.commonmethods.clickOnElement(this.sflogOut)
        await this.waitmethods.waitForVisible(this.sfLogoutPage)
    }
    async approveValidation() {
        await this.waitmethods.waitForVisible(this.validationReplyButton)
        await this.commonmethods.clickOnElement(this.validationReplyButton)
        await this.waitmethods.waitForVisible(this.transitionNextButton)
        await this.commonmethods.clickOnElement(this.transitionNextButton)
        await this.page.waitForLoadState('networkidle')
        await this.status.selectOption('Approve');
        await this.commonmethods.clickOnElement(this.validationReplySend)
        await this.waitmethods.waitForVisible(this.sendBtn)
        await this.commonmethods.clickOnElement(this.sendBtn)
        await this.commonmethods.verifyVisible(this.vrToaster,"ApproveValidation")
        await this.page.close();
    }
    async transitionWP(){
        await this.commonmethods.clickOnElement(this.transitionButton)
        await this.commonmethods.clickOnElement(this.transitionNextButton)
        await this.waitmethods.waitForVisible(this.requestTo)
        await this.commonmethods.clickOnElement(this.requestTo)
        await this.commonmethods.fillElement(this.requestTo, 'CtxStg13@tranetechnologies.com')
        await this.commonmethods.clickOnElement(this.requestToSelect13)
        await this.waitmethods.waitForVisible(this.sendBtn)
        await this.commonmethods.clickOnElement(this.sendBtn)
        await this.waitmethods.waitForVisible(this.YesButton)
        await this.commonmethods.clickOnElement(this.YesButton)
        await this.commonmethods.verifyVisible(this.tsToaster,"TransitionWorkPackage")
    }
    async submitWP() {
        await this.waitmethods.waitForVisible(this.transmitButton)
        await this.commonmethods.clickOnElement(this.transmitButton)
        await this.waitmethods.waitForVisible(this.transitionNextButton)
        await this.commonmethods.clickOnElement(this.transitionNextButton)
        await this.waitmethods.waitForVisible(this.send)
        await this.commonmethods.clickOnElement(this.send)
        await this.waitmethods.waitForVisible(this.sendBtn)
        await this.commonmethods.clickOnElement(this.sendBtn)
        await this.commonmethods.clickOnElement(this.YesButton)
        await this.commonmethods.verifyVisible(this.submitToaster,"SubmitWorkpackage")
    }
    async ciTypeSelect(ciName){
        this.ciType.click();
        this.cidropdownList.locator('ul li').filter({hasText: ciName}).first().click();
    }
    async officeSelector(office){
        await this.waitFunction.invisibilityOfBlackLoader();
        await this.waitFunction.waitForVisible(this.jobConfigureScreen.firstJob);
        await this.commonFunction.kendoDropdownSelector(this.createWpScreen.officeSelectorDropDown, office);
        await this.waitFunction.invisibilityOfBlackLoader();
        await this.waitFunction.waitForVisible(this.jobConfigureScreen.firstJob);
    }
    async searchAndNavigateToJob(jobName){
        await this.commonmethods.fillElement(this.jobConfigureScreen.searchBox,jobName);
        await this.commonmethods.clickOnElement(this.jobConfigureScreen.searchIcon);
        await this.waitmethods.invisibilityOfBlackLoader();
        await this.waitmethods.waitForVisible(this.jobConfigureScreen.firstJob);
    }
    async navigateToConfigureTab(){
      await this.commonFunction.clickOnElement(this.jobConfigureScreen.configureTab);
      await this.waitFunction.waitForVisible(this.jobConfigureScreen.configure);
    }
    async appendPSDtoJob(path){
        await this.commonFunction.clickOnElement(this.jobConfigureScreen.configureTab);
        await this.waitFunction.waitForVisible(this.jobConfigureScreen.configure);
        await this.commonFunction.clickOnElement(this.jobConfigureScreen.configure);
        await this.waitFunction.invisibilityOfRedLoader();
        await this.waitFunction.waitForVisible(this.jobConfigureScreen.loading);
        await this.waitFunction.waitForHidden(this.jobConfigureScreen.loading);
        await this.commonFunction.clickOnElement(this.jobConfigureScreen.moreMenu);
        await this.commonFunction.clickOnElement(this.jobConfigureScreen.appendPSD);
        await this.waitFunction.waitForVisible(this.jobConfigureScreen.importFile);
        await this.commonFunction.uploadSingleFile(this.jobConfigureScreen.importFile, path);
        await this.commonFunction.clickOnElement(this.jobConfigureScreen.saveConfiguration);
        await this.waitFunction.invisibilityOfRedLoader();
        await this.waitFunction.invisibilityOfRedLoader();
    }
    async generateWPName (wpPrefix) {
        var tempwpname = wpPrefix;
        var wpname = tempwpname + await this.commonFunction.currentDateAndTime();
        return wpname
    }
    async createESWorkPackage(wpPrefix){
        var tempwpname = wpPrefix;
        var currentWorkpackageName = tempwpname + await this.commonFunction.currentDateAndTime();
        await this.waitFunction.waitForVisible(this.createWpScreen.jobName);
        await this.expectCondition.verifyVisible(this.createWpScreen.jobName, 'Create WP page.');
        await this.commonFunction.clickOnElement(this.createWpScreen.revenueStream);
        await this.commonFunction.clickOnElement(this.createWpScreen.ccExpand.nth(1));
        await this.commonFunction.scrollToElement(this.esRevenueStreamType);
        await this.commonFunction.clickOnElement(this.esRevenueStreamType);
        await this.page.waitForTimeout(5000);
        await this.commonFunction.fillElement(this.createWpScreen.workPackageName, currentWorkpackageName);
        await this.waitFunction.invisibilityOfRedLoader();
        await this.commonFunction.clickOnElement(this.createWpScreen.save);
        await this.waitFunction.invisibilityOfRedLoader();
        await this.waitFunction.waitForVisible(this.propertiesScreen.navigation.first());
        await this.expectCondition.verifyVisible(this.propertiesScreen.navigation.first(), 'Workpackage created.');
    }
    async createControlsWorkPackage(wpPrefix){
      var tempwpname = wpPrefix;
      var currentWorkpackageName = tempwpname + await this.commonFunction.currentDateAndTime();
      await this.waitFunction.waitForVisible(this.createWpScreen.jobName);
      await this.expectCondition.verifyVisible(this.createWpScreen.jobName, 'Create WP page.');
      await this.commonFunction.clickOnElement(this.createWpScreen.revenueStream);
      await this.commonFunction.clickOnElement(this.createWpScreen.ccExpand.nth(0));
      await this.commonFunction.scrollToElement(this.csRevenueStreamType);
      await this.commonFunction.clickOnElement(this.csRevenueStreamType);
      await this.page.waitForTimeout(5000);
      await this.commonFunction.fillElement(this.createWpScreen.workPackageName, currentWorkpackageName);
      await this.waitFunction.invisibilityOfRedLoader();
      await this.commonFunction.clickOnElement(this.createWpScreen.save);
      await this.waitFunction.invisibilityOfRedLoader();
      await this.waitFunction.waitForVisible(this.propertiesScreen.navigation.first());
      await this.expectCondition.verifyVisible(this.propertiesScreen.navigation.first(), 'Workpackage created.');
    }
    async createIndustrialRefrigerationWorkPackage(wpPrefix){
      var tempwpname = wpPrefix;
      var currentWorkpackageName = tempwpname + await this.commonFunction.currentDateAndTime();
      await this.waitFunction.waitForVisible(this.createWpScreen.jobName);
      await this.expectCondition.verifyVisible(this.createWpScreen.jobName, 'Create WP page.');
      await this.commonFunction.clickOnElement(this.createWpScreen.revenueStream);
      await this.commonFunction.clickOnElement(this.createWpScreen.ccExpand.nth(2));
      await this.commonFunction.scrollToElement(this.ifRevenueStreamType);
      await this.commonFunction.clickOnElement(this.ifRevenueStreamType);
      await this.page.waitForTimeout(5000);
      await this.commonFunction.fillElement(this.createWpScreen.workPackageName, currentWorkpackageName);
      await this.waitFunction.invisibilityOfRedLoader();
      await this.commonFunction.clickOnElement(this.createWpScreen.save);
      await this.waitFunction.invisibilityOfRedLoader();
      await this.waitFunction.waitForVisible(this.propertiesScreen.navigation.first());
      await this.expectCondition.verifyVisible(this.propertiesScreen.navigation.first(), 'Workpackage created.');
      await this.waitFunction.invisibilityOfRedLoader();
      await this.waitFunction.invisibilityOfRedLoader();
    }
    async selectSiteName(siteAddress){
      await expect(this.createWpScreen.loader).toHaveCount(0);
      await this.commonFunction.selectingAnOption(this.siteNameDrpDwn,siteAddress);
      //await this.partsCenter.selectOption({label: wpData.partsCenter.partCenter});
    }
    async updatePartsCenter(partsCenter){
      await expect(this.createWpScreen.loader).toHaveCount(0);
      await this.commonFunction.selectingAnOption(this.partsCenter,partsCenter);
      //await this.partsCenter.selectOption({label: partsCenter});
    }
    async navigateToScopePage(){
        await this.commonFunction.clickOnElement(this.scopeScreen.scopeMenu);
        await this.waitFunction.waitForVisible(this.scopeScreen.plcBadge);
        await this.waitFunction.invisibilityOfRedLoader();
        await this.waitFunction.invisibilityOfPulsingWait();
        this.expectCondition.verifyVisible(this.scopeScreen.plcBadge, 'Navigated to Scope Page.') //22
        this.expectCondition.verifyVisible(this.scopeScreen.plcBadge, 'Project Level cost item container.') //23
    }
    async addLabor(){
        await this.scopeScreen.addCostItem.click();
        await this.scopeScreen.ciTypeSelect('Labor');
        await expect(this.createWpScreen.loader).toHaveCount(0);
        await this.scopeScreen.description.fill(scopePageData.configureContainer.labor.description[0]);
        await this.createWpScreen.kendoDropdownSelector(this.laborType, scopePageData.configureContainer.labor.laborType);
        await expect(this.createWpScreen.loader).toHaveCount(0);
        await this.scopeScreen.hours.scrollIntoViewIfNeeded();
        await this.scopeScreen.hours.fill(scopePageData.configureContainer.labor.hours);
        await this.scopeScreen.ciSave.click();
        await expect(this.propertiesScreen.toaster).toHaveText(scopePageData.configureContainer.labor.toasterMessage);
        await this.propertiesScreen.toasterClose.click();
        await expect(this.createWpScreen.loader).toHaveCount(0);
    }
    async addNTM(){
        await this.scopeScreen.addCostItem.click();
        await this.scopeScreen.ciTypeSelect('Non-Trane Material');
        await this.createWpScreen.loader.waitFor({state: 'hidden'});
        await this.scopeScreen.description.fill(scopePageData.configureContainer.nonTraneMaterial.description);
        await this.createWpScreen.kendoDropdownOptionSelector(this.scopeScreen.vendor, scopePageData.configureContainer.nonTraneMaterial.vendor);
       
        await this.scopeScreen.partNumber.fill(scopePageData.configureContainer.nonTraneMaterial.partNumber);
        await this.scopeScreen.supplyInstall.selectOption({label: scopePageData.configureContainer.nonTraneMaterial.supplyInstall});
        await this.scopeScreen.includeDocuments.scrollIntoViewIfNeeded();
        await this.scopeScreen.installType.selectOption({label: scopePageData.configureContainer.nonTraneMaterial.installType});
        await this.scopeScreen.materialMultiplier.fill(scopePageData.configureContainer.nonTraneMaterial.materialMultiplier)
        await this.scopeScreen.quantity.fill(scopePageData.configureContainer.nonTraneMaterial.quantity);
        await this.scopeScreen.amount.fill(scopePageData.configureContainer.nonTraneMaterial.amount);
        await this.scopeScreen.ciSave.click();
        await expect(this.propertiesScreen.toaster).toHaveText(scopePageData.configureContainer.nonTraneMaterial.toasterMessage);
        await this.propertiesScreen.toasterClose.click();
        await this.createWpScreen.loader.waitFor({state: 'hidden'});
    }
    async addTraneParts(){
        await this.scopeScreen.addCostItem.click();
        await this.scopeScreen.ciTypeSelect('Trane Parts');
        await this.createWpScreen.loader.waitFor({state: 'hidden'});
        await this.scopeScreen.description.fill(scopePageData.configureContainer.traneParts.description);
        await this.scopeScreen.partNumber.fill(scopePageData.configureContainer.traneParts.partNumber);
        await this.scopeScreen.supplyInstall.selectOption({label: scopePageData.configureContainer.traneParts.supplyInstall});
        await this.scopeScreen.installType.selectOption({label: scopePageData.configureContainer.traneParts.installType});
        await this.scopeScreen.materialMultiplier.fill(scopePageData.configureContainer.traneParts.materialMultiplier)
        await this.scopeScreen.includeDocuments.scrollIntoViewIfNeeded();
        await this.scopeScreen.quantity.fill(scopePageData.configureContainer.traneParts.quantity);
        await this.scopeScreen.amount.fill(scopePageData.configureContainer.traneParts.amount);
        await this.scopeScreen.ciSave.click();
        await expect(this.propertiesScreen.toaster).toHaveText(scopePageData.configureContainer.traneParts.toasterMessage);
        await this.propertiesScreen.toasterClose.click();
        await this.createWpScreen.loader.waitFor({state: 'hidden'});
    }
    async addSubContract(){
        await this.scopeScreen.addCostItem.click();
        await this.scopeScreen.ciTypeSelect('Subcontract');
        await this.createWpScreen.loader.waitFor({state: 'hidden'});
        await this.scopeScreen.description.fill(scopePageData.configureContainer.subContract.description[0]);
        await this.createWpScreen.kendoDropdownOptionSelector(this.scopeScreen.subContract, scopePageData.configureContainer.subContract.subContracter[0]);
        await this.scopeScreen.type.selectOption({label: scopePageData.configureContainer.subContract.type[0]});
        await this.scopeScreen.cost.fill(scopePageData.configureContainer.subContract.cost[0]);
        await this.scopeScreen.ciSave.click();
        await expect(this.propertiesScreen.toaster).toHaveText(scopePageData.configureContainer.subContract.toasterMessage);
        await this.propertiesScreen.toasterClose.click();
        await this.createWpScreen.loader.waitFor({state: 'hidden'});
    }
    async addDJE(){
        await this.scopeScreen.addCostItem.click();
        await this.scopeScreen.ciTypeSelect('Direct Job Expense');
        await  this.createWpScreen.loader.waitFor({state: 'hidden'});
        await this.scopeScreen.feeType.selectOption({label: directJobExpense.license.feeType});
        await this.scopeScreen.description.fill(directJobExpense.license.description);
        await this.scopeScreen.quantity.fill(directJobExpense.license.quantity);
        await this.scopeScreen.materialMultiplier.fill(directJobExpense.license.materialMultiplier);
        await this.scopeScreen.duration.fill(directJobExpense.license.duration);
        await this.scopeScreen.durationType.selectOption({label: directJobExpense.license.type});
        await this.scopeScreen.rate.scrollIntoViewIfNeeded();
        await this.scopeScreen.rate.fill(directJobExpense.license.rate);
        await this.scopeScreen.ciSave.click();
        await expect(this.propertiesScreen.toaster).toHaveText(directJobExpense.toasterMessage);
        await this.propertiesScreen.toasterClose.click();
        await  this.createWpScreen.loader.waitFor({state: 'hidden'});
      }
      async navigateToSelectParts(){
        await this.commonFunction.clickOnElement(this.scopeScreen.selectParts);
        await this.waitFunction.waitForVisible(this.scopeScreen.selectPartsHeader);
        await this.expectCondition.verifyVisible(this.scopeScreen.selectPartsHeader, 'Select parts screen.')
      }
    async addSelectParts(PartDescription,Vendor){
      await this.commonFunction.fillElement(this.scopeScreen.partDescription, PartDescription);
      await this.commonFunction.selectingAnOption(this.scopeScreen.vendorSelect,Vendor);
      await this.commonFunction.clickOnElement(this.scopeScreen.search);
      await this.waitFunction.invisibilityOfBlackLoader();
      await this.waitFunction.waitForVisible(this.scopeScreen.selectPartsCheckbox.first());
      await this.commonFunction.checkBoxSelect(this.scopeScreen.selectPartsCheckbox.first());
      await this.commonFunction.clickOnElement(this.scopeScreen.addToList);
    }
    async addNonTranePart(PartDescription,Vendor){
      await this.commonFunction.fillElement(this.scopeScreen.partDescription, PartDescription);
      await this.commonFunction.selectingAnOption(this.scopeScreen.vendorSelect,Vendor)
      await this.commonFunction.checkBoxSelect(this.scopeScreen.local);
      await this.commonFunction.clickOnElement(this.scopeScreen.search);
      await this.waitFunction.invisibilityOfBlackLoader();
      await this.waitFunction.waitForVisible(this.scopeScreen.selectPartsCheckbox.first());
      await this.commonFunction.checkBoxSelect(this.scopeScreen.selectPartsCheckbox.first());
      await this.commonFunction.clickOnElement(this.scopeScreen.addToList);
    }
    async savingAllSelectParts(ToasterText){
      await this.commonFunction.clickOnElement(this.scopeScreen.viewList);
      await this.waitFunction.invisibilityOfRedLoader();
      await this.expectCondition.verifyVisible(this.scopeScreen.selectAllViewParts, 'Select parts - View list.')
      await this.commonFunction.checkBoxSelect(this.scopeScreen.selectAllViewParts);
      await this.waitFunction.waitForVisible(this.scopeScreen.priceColumn);
      await this.commonFunction.clickOnElement(this.scopeScreen.saveViewPart);
      await this.waitFunction.invisibilityOfRedLoader();
      await this.waitFunction.waitForVisible(this.scopeScreen.containerDescription.last());
    }
    async navigateToSelectStandardItems(){
      await this.commonFunction.clickOnElement(this.scopeScreen.selectStandardItems);
      await this.waitFunction.invisibilityOfRedLoader();
      await this.waitFunction.waitForVisible(this.scopeScreen.selectStandardItemsHeader);
      await this.expectCondition.verifyVisible(this.scopeScreen.selectStandardItemsHeader, 'Select standard items page.')
    }
    async addSelectStandardItem(PartNumber){
      await this.commonFunction.fillElement(this.scopeScreen.ssiPartDescription, PartNumber);
      await this.commonFunction.clickOnElement(this.scopeScreen.search);
      await this.waitFunction.invisibilityOfBlackLoader();
      await this.commonFunction.checkBoxSelect(this.scopeScreen.ssiCheckBox.first());
      await this.commonFunction.clickOnElement(this.scopeScreen.addToList)
    }
    async savingAllStandardItem(ToasterText){
      await this.commonFunction.clickOnElement(this.scopeScreen.viewList);
      await this.waitFunction.invisibilityOfRedLoader();
      await this.expectCondition.verifyVisible(this.scopeScreen.selectAllStandardItems, 'Select parts - View list.')
      await this.commonFunction.checkBoxSelect(this.scopeScreen.selectAllStandardItems);
      await this.commonFunction.clickOnElement(this.scopeScreen.saveViewPart);
      await this.waitFunction.invisibilityOfRedLoader();
      await this.waitFunction.waitForVisible(this.scopeScreen.containerDescription.last()); 
    }
    async validationReply(path, sheetName, row, columns){
      await wb.xlsx.readFile(path);
      const sh = wb.getWorksheet(sheetName);
      await this.commonFunction.clickOnElement(this.scopeScreen.validationReply);
      await this.waitFunction.invisibilityOfRedLoader();
      await this.expectCondition.verifyVisible(this.scopeScreen.validationReplyHeader, 'Validation Reply panel.');
      await this.commonFunction.selectingAnOption(this.scopeScreen.validationStatus, sh.getRow(row).getCell(columns[0]).toString());
      await this.commonFunction.clickOnElement(this.scopeScreen.next);
      await this.waitFunction.invisibilityOfRedLoader();
      await this.commonFunction.fillWithDelay(this.scopeScreen.confirmationNotes, sh.getRow(row).getCell(columns[2]).toString());
      await this.commonFunction.clickOnElement(this.scopeScreen.reqReplySend);
      await this.expectCondition.verifyText(this.propertiesScreen.toaster, sh.getRow(row).getCell(columns[3]).toString(), 'Request approved toaster.');
      await this.waitFunction.invisibilityOfRedLoader();
      await this.commonFunction.clickOnElement(this.scopeScreen.exit);
  }
   

}
module.exports = { WorkPackage };