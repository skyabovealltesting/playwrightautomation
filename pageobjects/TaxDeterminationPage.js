const { expect } = require('@playwright/test');
var { CommonFunctions } = require('../commonUtils/CommonFunctions');
var { WaitFunctions } = require('../commonUtils/WaitFunctions');
var { Assertions } = require('../commonutils/Assertions');
const { CreateWorkPackagePage } = require('../pageobjects/CreateWpPage');
const { JobConfigurePage } = require('../pageobjects/JobConfigurePage');
const { PropertiesPage } = require('../pageobjects/PropertiesPage');
const { ScopePage } = require('../pageobjects/ScopePage');
const TaxTestData = require('../testdata/TaxTestData.json');
const path = require('path');
const Excel = require('exceljs');
const wb = new Excel.Workbook();

class TaxDeterminationPage {


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

        this.menu = page.locator('xpath=//div[contains(@class,"con-container position-relative")]');
        this.expandProjects = page.locator('xpath=(//span[contains(@class,"k-i-expand")])[1]');
        this.jobOrProjectsDashboard = page.locator('xpath=//div//span/a[text()="Job/Project Requests Dashboard"]');
        this.newOrNotSubTaxReq = page.locator('xpath=//li[@aria-label="New / Not Submitted"]').nth(1);
        this.openRequest = page.locator('xpath=//li[@aria-label="Open"]');

        
        this.projectNameFilter = page.locator('xpath= (//a[@title="Page navigation, page {currentPage} of {totalPages}"])[10]');
        this.containsField = page.locator('xpath=//input[contains(@class,"k-textbox")]').first();
        this.projectNumFilter = page.locator('xpath= (//a[@title="Page navigation, page {currentPage} of {totalPages}"])[12]');
        this.filterButton = page.locator('xpath=//button[@class="k-button k-primary"]');
        this.clickOnFirstResult = page.locator('xpath=//tr/td[@aria-colindex="11"]');
        this.selectOneResult = page.locator('xpath=//tr/td[@aria-colindex="11"]').nth(0);
        this.projectNumResult = page.locator('xpath=//tr/td[@aria-colindex="13"]');

        this.projectAmount = page.locator('xpath=//kendo-numerictextbox[@formcontrolname="currentContractAmount"]/span/input');
        this.copyJobSiteLink = page.locator('xpath=//span/strong[@class="float-right t-text-sm text-primary"]');
        this.shipToAddressState = page.locator('xpath=//kendo-dropdownlist[@formcontrolname="state"]').nth(0);
        this.copyAddressDrpdown = page.locator('xpath=//kendo-dropdownlist[@class="t-kendo-control k-widget k-dropdown"]');
        this.wpLocationAddressState = page.locator('xpath=//kendo-dropdownlist[@formcontrolname="state"]').nth(1);
        this.shipToAddressCounty = page.locator('xpath=//input[@formcontrolname="county"]').nth(0);
        this.wpLocationAddressCounty = page.locator('xpath=//input[@formcontrolname="county"]').nth(1);

        this.exemptionProvidedNo = page.locator('#exemptionProvidedNo');
        this.constructionCapitalNo = page.locator('#constructionCapitalNo');
        this.repairOrReplacementConstructionNo = page.locator('#repairOrReplacementConstructionNo');
        this.rentalEquipmentProvidedOrInstalledNo = page.locator('#rentalEquipmentProvidedOrInstalledNo');

        this.signedProposalSwitch = page.locator('xpath=//span[@role="switch"]').nth(1);
        this.attachType = page.locator('xpath=//kendo-dropdownlist[@formcontrolname="attachmentType"]');
        this.uploadDoc = page.locator('xpath=//div[@class="k-button k-upload-button"]/input');


        this.plusIcon = page.locator('#k-tabstrip-tab-1');
        this.wpId = page.locator('#projectId');
        this.wpName = page.locator('#projectName');
        this.changeOrderType = page.locator('xpath=//kendo-dropdownlist[@formcontrolname="changeOrderType"]');
        this.billingDate = page.locator('xpath=//*[@formcontrolname="anticipatedBillingDate"]//span[@class="k-icon k-i-calendar"]');
        this.wpclassification = page.locator('xpath=//kendo-dropdownlist[@formcontrolname="projectClassification"]');
        this.wpAmount = page.locator('xpath=//kendo-numerictextbox[@formcontrolname="projectAmount"]//input[@class="k-input k-formatted-value"]');
        this.suppliedEquipmentValue = page.locator('xpath=//kendo-numerictextbox[@formcontrolname="suppliedEquipmentValue"]//input[@class="k-input k-formatted-value"]');
        this.installedEquipmentvalue = page.locator('xpath=//kendo-numerictextbox[@formcontrolname="installedEquipmentValue"]//input[@class="k-input k-formatted-value"]');
        this.laborValue = page.locator('xpath=//kendo-numerictextbox[@formcontrolname="laborValue"]//input[@class="k-input k-formatted-value"]');


        this.submitForm = page.locator('xpath=//button[@title="Click to submit the form and run workflows"]/i');
        this.toaster = page.locator('xpath=//*[@class="t-toaster-message"]');
        this.menuCloseIcon = page.locator('xpath=//i[@class="fa fa-times close-icon"]');
        this.preferencesLink = page.locator('.preferences-link');
        this.signOutLink = page.getByRole('link', { name: ' Sign out' });
        this.workSightAzureLogin = page.getByRole('link', { name: 'Sign in here' })
        this.projectNumFilter2 = page.locator('xpath= (//a[@title="Page navigation, page {currentPage} of {totalPages}"])[5]');

        this.taxDeterminationAction = page.locator('xpath=//kendo-dropdownlist[@formcontrolname="determinationAction"]');
        this.taxApprover = page.locator('xpath=//kendo-dropdownlist[@formcontrolname="taxApprover"]');
       // this.taxDeterminationPath = page.locator('xpath=//kendo-dropdownlist[@formcontrolname="determinationCode"]');
        this.addProduct = page.locator('xpath=//button[@title="Click to save current project and add new product"]');
        this.productCode = page.locator('xpath=//td//kendo-dropdownlist[contains(@class,"t-kendo-control k-widget k-dropdown ng-untouched ng-pristine")]');
        this.taxDeterminationPath = page.locator('xpath=//td//kendo-dropdownlist[contains(@class,"t-kendo-control k-widget k-dropdown ng-untouched ng-pristine")]/span/span');
        this.productCodeAmount = page.locator('xpath=//kendo-numerictextbox[contains(@class,"t-kendo-control t-kendo-text-right k-widget k-numerictextbox")]//input[@class="k-input k-formatted-value"]');
        this.selectWp1 = page.locator('#k-tabstrip-tab-0');
        this.selectWp2 = page.locator('#k-tabstrip-tab-1');


        this.closedTaxRequest = page.locator('xpath=//span[@class="k-item-text ng-star-inserted" and contains(text(),"Closed ")]')

        this.customerTypeDrpdwn = page.locator('#customerTypeDropdown');
        this.projectAdministrator = page.locator('xpath=//input[@placeholder="Last, First..."]').nth(0);
        this.projectTypeDrpdwn = page.locator('#creditJobTypeDropdown').first();
        this.submitterName = page.locator('xpath=//input[@placeholder="Last, First..."]').nth(1);
        this.customerTypeDrpdwn = page.locator('#customerTypeDropdown');


        //SovLine
        this.ellipsesMenu = page.locator('xpath=//div[contains(@class,"show-remaining")]').nth(1);
        this.sovLink = page.locator('xpath=//span[contains(text()," Sov ")]');
        this.addSovLineBtn = page.locator('xpath=//button[@class="t-btn t-btn-primary mr-3 my-2"]');
        this.projectRetPer = page.locator('xpath=//kendo-numerictextbox[@formcontrolname="projectRetentionPercentage"]/span/input');
        this.lineDescription = page.locator('xpath=//td[contains(@class,"k-touch-action-auto")]//input[@type="text"]');
        this.lineCheckbox = page.locator('xpath=//div[contains(@class,"t-custom-control t-custom-checkbox ng-star-inserted")]//input[@type="checkbox"]');
        this.allocationAmount = page.locator('xpath=//td[contains(@class,"k-touch-action-auto")]//input[@class="k-input k-formatted-value"]');
        this.allocationPerc = page.locator('xpath=//td[contains(@class,"k-touch-action-auto")]//input[@class="k-input k-formatted-value"]');
        this.retentionAmount = page.locator('xpath=//td[contains(@class,"k-touch-action-auto")]//input[@class="k-input k-formatted-value"]');
        this.retentionPerc = page.locator('xpath=//td[contains(@class,"k-touch-action-auto")]//input[@class="k-input k-formatted-value"]');
        this.taxIdentifier = page.locator('#taxIdentifier');
        this.sovShipToAddress = page.locator('xpath=//kendo-autocomplete[@id="shipToAddressId"]/kendo-searchbar/input');
        this.save = page.getByRole('button', {name:'Save'});
        this.closeSovToaster = page.locator('xpath=//span[contains(@class,"k-icon k-i-close t-icon-close")]');

         //Invoice Category
        this.expandCategoryPanel = page.locator('xpath=//kendo-panelbar[@class="t-panelbar k-widget k-panelbar"]');
        this.collapseCategoryPanel = page.locator('xpath=//span[contains(@class,"k-i-arrow-n k-panelbar-collapse")]');
        this.addEditCategories = page.locator('xpath=//button[@class="t-btn t-btn-outline-primary"]');
        this.addCategory = page.locator('xpath=//button[@class="t-btn t-btn-sm t-btn-outline-primary mr-3"]');
        this.inputCategory = page.locator('xpath=//input[@placeholder="Add Category Name"]');
        this.addBtn = page.locator('xpath=//button[@class="t-btn t-btn-link"]');
        this.dragSovLine = page.locator('xpath=//em[@title="Drag and Drop"]');
        this.dropSovLine = page.locator('xpath=//input[@value="name"]');
        this.closeAddCatPanel = page.locator('xpath=//span[@class="fas fa-times t-icon-close"]');
        this.saveInvoiceCategory = page.locator('xpath=//button[@class="t-btn t-btn-sm t-btn-primary t-btn-sm"]');
        this.saveInvoice = page.locator('xpath=//button[@class="t-btn t-btn-primary my-2"]')




        //Invoice
        this.expandInvoicesPanel = page.locator('xpath=//span[@class="fas fa-caret-right m-3 t-icon t-icon-1X t-icon-primary g-pointer-cursor"]');
        this.billingOption = page.locator('xpath=//span[contains(text()," Billing ")]');
        this.invoicingTab = page.locator('xpath=//span[contains(@class,"t-nav-link") and contains(text(),"Invoicing")]');
        this.applicationNum = page.locator('xpath=//kendo-numerictextbox[@formcontrolname="applicationNumber"]/span/input');
        this.invoicePlusIcon = page.locator('xpath=//span[@class="t-icon t-icon-1X fas fa-plus ml-3 t-icon-primary g-pointer-cursor"]');
        this.entryType = page.locator('#entryType');
        this.status = page.locator('#status');
        this.billAmount = page.locator('xpath=//input[contains(@class,"k-input k-formatted-value")]').nth(1);
       
        //
        this.projectsTab = page.locator('xpath=//span[text()="Projects"]');
        this.projectSearch = page.locator('xpath=//span[@class="t-icon t-icon-white fas fa-search"]');
        this.projectNumbLink = page.locator('xpath=//a[@class="t-link"]');


        }
        async navigateToCreditRequests() {
          await this.page.waitForLoadState();
          await this.page.waitForLoadState('networkidle')
          await this.commonmethods.clickOnElement(this.menu);
          await this.commonmethods.clickOnElement(this.expandProjects);
        }
        async filterAndSelectProject() {
          await this.page.waitForLoadState('networkidle')
          await this.waitFunction.invisibilityOfBlackLoader();
         // await this.commonmethods.clickOnElement(this.openRequest);
          await this.commonmethods.clickOnElement(this.newOrNotSubTaxReq);
          await this.waitFunction.invisibilityOfBlackLoader();
          await this.commonmethods.clickOnElement(this.projectNumFilter);
          await this.commonmethods.fillElement(this.containsField, TaxTestData.projectNumber);
          await this.commonmethods.clickOnElement(this.filterButton);
          await this.waitFunction.invisibilityOfBlackLoader();
        }
        async updateShipToAddress() {
          await this.waitFunction.invisibilityOfRedLoader();
          await this.page.waitForTimeout(3000);
          let totalProjectAmount = await this.projectAmount.getAttribute('aria-valuenow');
          console.log(totalProjectAmount)
          await this.commonmethods.clickOnElement(this.billingDate);
          await this.commonmethods.pressEnter(this.billingDate);
          await this.page.waitForTimeout(3000);
          await this.commonmethods.fillElement(this.laborValue, TaxTestData.updateShipToAddress.laborValue);
          await this.commonmethods.clickOnElement(this.copyJobSiteLink);
          await this.page.waitForTimeout(5000);
          await this.commonmethods.fillElement(this.shipToAddressCounty, TaxTestData.updateShipToAddress.shipToAddressCounty);
          await this.page.waitForTimeout(5000);
          await this.commonmethods.kendoDropdownOptionSelector(this.shipToAddressState,TaxTestData.shipToAddressState);
        }
        async updateWpLocAddress() {
          await this.commonmethods.kendoDropdownSelector(this.copyAddressDrpdown,TaxTestData.copyAddressDrpdown);
        }
        async selectRadioBtn() {
          await this.commonmethods.selectRadioBtn(this.exemptionProvidedNo);
          await this.commonmethods.selectRadioBtn(this.constructionCapitalNo);
          await this.commonmethods.selectRadioBtn(this.repairOrReplacementConstructionNo);
          await this.commonmethods.selectRadioBtn(this.rentalEquipmentProvidedOrInstalledNo);
          await this.commonmethods.clickOnElement(this.signedProposalSwitch);
        }
        async uploadFile(){
          await this.commonmethods.kendoDropdownOptionSelector(this.attachType,TaxTestData.attachType);
          await this.commonmethods.uploadSingleFile(this.uploadDoc, TaxTestData.taxDocPath);
        }
        async updateSecondWp(){
          await this.commonmethods.clickOnElement(this.plusIcon);
        // await this.commonmethods.clickOnElement(this.selectWp2);
          await this.page.waitForTimeout(3000);
          await this.commonmethods.fillElement(this.wpId, TaxTestData.updateSecondWp.workPackageId);
          await this.commonmethods.fillElement(this.wpName, TaxTestData.updateSecondWp.wpName);
          await this.commonmethods.kendoDropdownOptionSelector(this.changeOrderType, TaxTestData.updateSecondWp.changeOrderType);
          await this.page.waitForTimeout(3000);
          await this.commonmethods.clickOnElement(this.billingDate);
          await this.commonmethods.pressEnter(this.billingDate);
          await this.commonmethods.kendoDropdownOptionSelector(this.wpclassification, TaxTestData.updateSecondWp.wpclassification);
          await this.page.waitForTimeout(3000);
          await this.commonmethods.fillElement(this.wpAmount, TaxTestData.updateSecondWp.wpAmount);
          await this.commonmethods.fillElement(this.suppliedEquipmentValue, TaxTestData.updateSecondWp.suppliedEquipmentValue);
          await this.commonmethods.fillElement(this.installedEquipmentvalue, TaxTestData.updateSecondWp.installedEquipmentvalue);
          await this.commonmethods.fillElement(this.laborValue, TaxTestData.updateSecondWp.laborValue);
          await this.commonmethods.clickOnElement(this.copyJobSiteLink);
          await this.commonmethods.fillElement(this.shipToAddressCounty, TaxTestData.updateSecondWp.wpName);
          await this.commonmethods.kendoDropdownOptionSelector(this.shipToAddressState,TaxTestData.shipToAddressState);
          await this.commonmethods.kendoDropdownSelector(this.copyAddressDrpdown,TaxTestData.copyAddressDrpdown);
          await this.commonmethods.selectRadioBtn(this.exemptionProvidedNo);
          await this.commonmethods.selectRadioBtn(this.constructionCapitalNo);
          await this.commonmethods.selectRadioBtn(this.repairOrReplacementConstructionNo);
          await this.commonmethods.selectRadioBtn(this.rentalEquipmentProvidedOrInstalledNo);
        }
        async closeTab() {
          await this.page.bringToFront();
          await this.page.close();
        }
        async signOut() {
          await this.page.bringToFront()
          await this.commonmethods.clickOnElement(this.menuCloseIcon)
          await this.commonmethods.clickOnElement(this.preferencesLink)
          await this.commonmethods.clickOnElement(this.signOutLink)
          await this.waitmethods.waitForVisible(this.workSightAzureLogin)
        }
        async filterAndSelectRequestedProject() {
          await this.page.waitForLoadState('networkidle')
          await this.waitFunction.invisibilityOfBlackLoader();
          await this.commonmethods.clickOnElement(this.projectNumFilter2);
          await this.commonmethods.fillElement(this.containsField, TaxTestData.projectNumber);
          await this.commonmethods.clickOnElement(this.filterButton);
          await this.waitFunction.invisibilityOfBlackLoader();
        }
        async updateTaxApproverSectionWp1(){
          await this.page.waitForLoadState('networkidle')
          //await this.commonmethods.clickOnElement(this.selectWp1);
          let totalProjectAmount = await this.projectAmount.getAttribute('aria-valuenow');
          await this.commonmethods.kendoDropdownOptionSelector(this.taxDeterminationAction, TaxTestData.updateTaxApproverSectionWp1.taxDeterminationAction);
          await this.commonmethods.kendoDropdownOptionSelector(this.taxApprover, TaxTestData.updateTaxApproverSectionWp1.taxApprover);
        //  await this.commonmethods.kendoDropdownOptionSelector(this.taxDeterminationPath, TaxTestData.updateTaxApproverSectionWp1.taxDeterminationPath);
          await this.commonmethods.clickOnElement(this.addProduct);
          await this.commonmethods.kendoDropdownOptionSelector(this.productCode.nth(0), TaxTestData.updateTaxApproverSectionWp1.productCode);
          //await this.commonmethods.kendoDropdownOptionSelector(this.productCode.nth(0), TaxTestData.updateTaxApproverSectionWp1.taxDeterminationPath);
         // await this.commonmethods.fillElement(this.productCodeAmount.nth(5), TaxTestData.updateTaxApproverSectionWp1.productCodeAmount);
          await this.commonmethods.fillElement(this.productCodeAmount.nth(5), totalProjectAmount);
         // await this.commonmethods.kendoDropdownOptionSelector(this.taxDeterminationPath.nth(0), TaxTestData.updateTaxApproverSectionWp1.taxDeterminationPath);
         await this.commonmethods.clickOnElement(this.taxDeterminationPath.nth(0));
         await this.taxDeterminationPath.nth(0).press('ArrowDown');
         await this.taxDeterminationPath.nth(0).press('Enter');
        }
        async updateTaxApproverSectionWp2(){
          await this.page.waitForLoadState('networkidle')
          await this.commonmethods.clickOnElement(this.selectWp2);
          await this.commonmethods.kendoDropdownOptionSelector(this.taxDeterminationAction, TaxTestData.updateTaxApproverSectionWp2.taxDeterminationAction);
          await this.commonmethods.kendoDropdownOptionSelector(this.taxApprover, TaxTestData.updateTaxApproverSectionWp2.taxApprover);
          await this.commonmethods.kendoDropdownOptionSelector(this.taxDeterminationPath, TaxTestData.updateTaxApproverSectionWp2.taxDeterminationPath);
          await this.commonmethods.clickOnElement(this.addProduct);
         // await this.page.waitForTimeout(3000);
          await this.commonmethods.kendoDropdownOptionSelector(this.productCode, TaxTestData.updateTaxApproverSectionWp2.productCode1);
          await this.commonmethods.fillElement(this.productCodeAmount.nth(5), TaxTestData.updateTaxApproverSectionWp2.productCodeAmount1);
          await this.commonmethods.clickOnElement(this.addProduct);
         // await this.page.waitForTimeout(3000);
          await this.commonmethods.kendoDropdownOptionSelector(this.productCode, TaxTestData.updateTaxApproverSectionWp2.productCode2);
          await this.commonmethods.fillElement(this.productCodeAmount.nth(6), TaxTestData.updateTaxApproverSectionWp2.productCodeAmount2);
          await this.commonmethods.clickOnElement(this.addProduct);
          //await this.page.waitForTimeout(3000);
          await this.commonmethods.kendoDropdownOptionSelector(this.productCode, TaxTestData.updateTaxApproverSectionWp2.productCode3);
          await this.commonmethods.fillElement(this.productCodeAmount.nth(7), TaxTestData.updateTaxApproverSectionWp2.productCodeAmount3);
        }
        async submitTaxForm(){
          await this.page.waitForTimeout(3000);
          await this.commonmethods.clickOnElement(this.submitForm);
          await this.commonmethods.verifyText(this.toaster,TaxTestData.submitToasterMsg);
        }
        async verifyClosedRequest(){
          await this.page.waitForLoadState('networkidle')
          await this.waitmethods.invisibilityOfBlackLoader();
          await this.commonmethods.clickOnElement(this.closedTaxRequest.nth(1));
          await this.waitmethods.invisibilityOfBlackLoader();
          await this.commonmethods.clickOnElement(this.projectNumFilter);
          await this.commonmethods.fillElement(this.containsField, TaxTestData.projectNumber);
          await this.commonmethods.clickOnElement(this.filterButton);
          await this.waitFunction.invisibilityOfBlackLoader();
        }
        async searchAndNavigateToCP(CPNumber){
          await this.waitFunction.invisibilityOfBlackLoader();
          await this.waitFunction.waitForVisible(this.jobConfigureScreen.firstJob);
          await this.commonmethods.clickOnElement(this.projectsTab);
          await this.page.waitForTimeout(2000);
          await this.commonmethods.fillElement(this.jobConfigureScreen.searchBox,CPNumber);
          await this.commonmethods.clickOnElement(this.projectSearch);
          await this.waitmethods.invisibilityOfRedLoader();
        }
        async navigateToSov(){
          await this.page.waitForLoadState('networkidle')
          await this.commonmethods.clickOnElement(this.ellipsesMenu);
          await this.page.waitForTimeout(2000);
          await this.commonmethods.clickOnElement(this.sovLink);
          await this.waitmethods.invisibilityOfRedLoader();
        }
        async addSovLine1(Description,AllocPercen,RetentionPercen,TaxIdentifier){
          await this.page.waitForLoadState('networkidle')
          await this.commonmethods.clickOnElement(this.addSovLineBtn);
          await this.commonmethods.fillElement(this.lineDescription,Description);
          await this.commonmethods.fillElement(this.allocationPerc.nth(1),AllocPercen);
          await this.page.keyboard.press('Tab');
          await this.page.keyboard.press('Tab');
          await this.page.keyboard.press('Tab');
          await this.commonmethods.selectingAnOption(this.taxIdentifier,TaxIdentifier);
          await this.commonmethods.fillElement(this.retentionPerc.nth(3),RetentionPercen);
        // await this.commonmethods.clickOnElement(this.save);
        }
        async addSovLine2(Description,AllocPercen,RetentionPercen,TaxIdentifier,ShipTo){
          await this.commonmethods.clickOnElement(this.addSovLineBtn);
          await this.commonmethods.fillElement(this.lineDescription.nth(1),Description);
          await this.commonmethods.fillElement(this.allocationPerc.nth(5),AllocPercen);
          await this.page.keyboard.press('Tab');
          await this.page.keyboard.press('Tab');
          await this.page.keyboard.press('Tab');
          await this.commonmethods.selectingAnOption(this.taxIdentifier.nth(1),TaxIdentifier);
          await this.commonmethods.fillElement(this.retentionPerc.nth(7),RetentionPercen);
          await this.page.keyboard.press('Tab');
          await this.page.keyboard.press('Tab');
          await this.commonmethods.fillElement(this.sovShipToAddress.nth(1),ShipTo);
          await this.commonmethods.clickOnElement(this.save);
          await this.commonmethods.clickOnElement(this.closeSovToaster);
        }
        async addSovLine3(Description,AllocPercen,RetentionPercen,TaxIdentifier){
          await this.commonmethods.clickOnElement(this.addSovLineBtn);
          await this.commonmethods.fillElement(this.lineDescription.nth(2),Description);
          await this.commonmethods.fillElement(this.allocationPerc.nth(9),AllocPercen);
          await this.page.keyboard.press('Tab');
          await this.page.keyboard.press('Tab');
          await this.page.keyboard.press('Tab');
          await this.commonmethods.selectingAnOption(this.taxIdentifier.nth(2),TaxIdentifier);
          await this.commonmethods.fillElement(this.retentionPerc.nth(11),RetentionPercen);
          await this.commonmethods.clickOnElement(this.save);
        }
        async addSovLine4(Description,AllocPercen,RetentionPercen,TaxIdentifier,ShipTo){
          await this.commonmethods.clickOnElement(this.addSovLineBtn);
          await this.commonmethods.fillElement(this.lineDescription.nth(3),Description);
          await this.commonmethods.fillElement(this.allocationPerc.nth(13),AllocPercen);
          await this.page.keyboard.press('Tab');
          await this.page.keyboard.press('Tab');
          await this.page.keyboard.press('Tab');
          await this.commonmethods.selectingAnOption(this.taxIdentifier.nth(3),TaxIdentifier);
          await this.commonmethods.fillElement(this.retentionPerc.nth(15),RetentionPercen);
          await this.page.keyboard.press('Tab');
          await this.page.keyboard.press('Tab');
          await this.commonmethods.fillElement(this.sovShipToAddress.nth(1),ShipTo);
          await this.commonmethods.clickOnElement(this.save);
        }
        async navigateToInvoice(){
          await this.page.waitForLoadState('networkidle')
          await this.commonmethods.clickOnElement(this.ellipsesMenu);
          await this.page.waitForTimeout(2000);
          await this.commonmethods.clickOnElement(this.billingOption);
          await this.waitmethods.invisibilityOfRedLoader();
          await this.commonmethods.clickOnElement(this.invoicingTab);
        }
        async addInvoiceCategory(CategoryName1,CategoryName2){
          await this.waitmethods.invisibilityOfRedLoader();
          await this.commonmethods.clickOnElement(this.expandCategoryPanel);
          await this.commonmethods.clickOnElement(this.addEditCategories);
          await this.page.waitForTimeout(2000);
          await this.commonmethods.clickOnElement(this.addCategory);
          await this.page.waitForTimeout(2000);
          await this.commonmethods.fillElement(this.inputCategory,"CategoryName1");
          await this.commonmethods.clickOnElement(this.addBtn);
          await this.commonmethods.clickOnElement(this.addCategory);
          await this.page.waitForTimeout(2000);
          await this.commonmethods.fillElement(this.inputCategory,"CategoryName2");
          await this.commonmethods.clickOnElement(this.addBtn);
          await this.dragSovLine.nth(0).dragTo(this.dropSovLine.nth(0))
          await this.page.waitForTimeout(2000);
          await this.dragSovLine.nth(1).dragTo(this.dropSovLine.nth(1))
          // await this.expectCondition.verifyEnabled(this.save, 'Save Btn Enabled');
          // await this.commonmethods.clickOnElement(this.save);
          // await this.waitmethods.invisibilityOfRedLoader();
          // await this.commonmethods.clickOnElement(this.closeAddCatPanel);
          // await this.waitmethods.invisibilityOfRedLoader();
          // await this.commonmethods.clickOnElement(this.collapseCategoryPanel);
          await this.commonmethods.clickOnElement(this.saveInvoiceCategory);
          await this.waitmethods.invisibilityOfRedLoader();
          await this.commonmethods.clickOnElement(this.closeSovToaster);
        }
        async addInvoice(EntryType,Status,BillAmount){
          //await this.waitmethods.invisibilityOfRedLoader();
          await this.commonmethods.clickOnElement(this.expandInvoicesPanel);
          await this.page.waitForTimeout(2000);
          await this.commonmethods.clickOnElement(this.invoicePlusIcon);
          await this.waitmethods.invisibilityOfRedLoader();
          await this.commonmethods.selectingAnOption(this.entryType,EntryType);
          await this.commonmethods.selectingAnOption(this.status,Status);
          await this.commonmethods.fillElement(this.billAmount,BillAmount);
          await this.commonmethods.clickOnElement(this.saveInvoice);
          await this.commonmethods.clickOnElement(this.closeSovToaster);
        }
    }
    module.exports = { TaxDeterminationPage };