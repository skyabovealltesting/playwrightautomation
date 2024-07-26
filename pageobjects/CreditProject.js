
const { expect } = require('@playwright/test');
var { CommonFunctions } = require('../commonUtils/CommonFunctions');
var { WaitFunctions } = require('../commonUtils/WaitFunctions');
var { Assertions } = require('../commonutils/Assertions');
const { JobConfigurePage } = require('../pageobjects/JobConfigurePage');
const cpData = require('../testdata/CreditProject.json');
const { log } = require('console');
class CreditProject {
     /**
     * @param {import('@playwright/test').Page} page 
     * @param {import('@playwright/test').TestInfo} testInfo 
     */
    constructor(page, testInfo) {
        this.expectCondition = new Assertions(page, testInfo);
        this.waitFunction = new WaitFunctions(page)
        this.jobConfigureScreen = new JobConfigurePage(page, testInfo);
        this.page = page;
        this.testInfo = testInfo;
        //**BIDS PAGE */
        this.loader = page.locator('span.k-i-loading');
        this.officeSelectorDropDown = page.locator('[valuefield="drAddressId"]');
        this.untransmitted = page.locator('xpath=//*[text()="Untransmitted"]');
        this.projectsTab = page.locator('xpath=//span[text()="Projects"]');
        this.projectSearch = page.locator('xpath=//span[@class="t-icon t-icon-white fas fa-search"]');
        this.projectNumbLink = page.locator('xpath=//a[@class="t-link"]');
        this.baseBidCheckBox = page.locator('xpath=//*[contains(@id,"headerCheckbox")]');
        this.productCheckBox = page.locator('xpath=//*[contains(@id,"checkbox")]').nth(2);
        this.bidsTab = page.getByText('Bids').first()
        this.bidsSection = page.locator('xpath=//kendo-panelbar-item/span');
        this.addCreditProjectIcon = page.locator('xpath=//span[contains(@class,"fa fa-plus-circle")]').first();
        this.backGroundRules = page.getByText('System is running prevalidation rules in the background')
        this.rulesSuccessful = page.getByText('System has completed running prevalidation rules. Please review Errors/Warnings ')
        this.distToProj = page.locator('xpath=//kendo-numerictextbox[@formcontrolname="distanceToProject"]//input')
        //**PURCHASING DOCUMENT */
        this.creditProjectNo = page.locator('kendo-combobox').getByRole('combobox')
        this.creditPrjList = page.locator('xpath=//kendo-popup//li[2][contains(@id,"J1")]')
        this.customerPONo = page.locator('xpath=//input[@formcontrolname="customerPONumber"]');
        this.accountName = page.locator('kendo-autocomplete').getByRole('combobox')
        this.freightTermDP = page.locator('xpath=//select[@formcontrolname="freightTerm"]');
        this.taxable = page.locator('tsmt-customer-purchasing-document').getByText('YES')
        this.nextButton = page.getByRole('button', { name: 'NEXT' })
        this.revenueStreamTypeDP = page.locator('xpath=//select[@formcontrolname="revenueStreamType"]')
        //**OFFICE & PEOPLE */
        this.jobContactDropDown=page.locator('xpath=//select[@formcontrolname="jobContactName"]');
        this.jobContactValue=page.locator('xpath=//option[@value="ts12f57"]');
        this.jobContact = page.locator('tsmt-office-people select').nth(2)
        this.salesMngr=page.locator('xpath=//*[@formcontrolname="salesMgrName"]//input');
       // this.projectManager = page.getByLabel('NO DATA FOUND').nth(2)
       this.projectManagerEqp=page.locator('xpath=//*[@formcontrolname="activeDirectory"]//input').nth(0)
       this.jobRoleProjectManager=page.locator('xpath=//*[@formcontrolname="activeDirectory"]//input').nth(0)
       this.jobRoleSalesManager=page.locator('xpath=//*[@formcontrolname="activeDirectory"]//input').nth(1)
        this.projectManager=page.locator('xpath=//*[@formcontrolname="activeDirectory"]//input').nth(4)
        this.projectManagerSelect = page.getByText('TEST ACCL ACCL.TEST@tranetechnologies.com Taicang')
        this.projectManager2=page.locator('xpath=(//*[@formcontrolname="projectManager"]//input)');
        //**SHIP TO ADDRESS */
        this.addressTab = page.locator('xpath=//*[@class="ship-to-addresses"]//li[1]/span')
        //this.addressName = page.locator('#shipToAddress div').filter({ hasText: 'ID: * Shipping Address Name: * Type: *United StatesCanadaInternational Country: ' }).getByRole('textbox').nth(1)
        this.addressName=page.locator('xpath=//input[@formcontrolname="shippingInstructionDescription"]')
        this.partyName = page.locator('#shipToAddress div').filter({ hasText: 'Name: * Address Line 1: *' }).getByRole('textbox').first()
        this.shippingAddressName = page.locator('xpath=//input[@formcontrolname="shippingInstructionDescription"]');
        this.streetAddress1 = page.locator('#shipToAddress div').filter({ hasText: 'Name: * Address Line 1: *' }).getByRole('textbox').nth(1)
        this.streetAdress2 = page.locator('#shipToAddress div').filter({ hasText: 'Address Line 2: Zip Code: * City: *SPRINGFIELD' }).getByRole('textbox')
        this.clearZipcode = page.getByRole('button', { name: '' })
        this.zipcode = page.getByRole('combobox', { name: 'NO DATA FOUND' })
        //this.sameAsSoldTo = page.locator('xpath=//div//button[contains(@class,"t-btn t-btn-outline-primary update-job")]')
        this.markPackagesTab = page.getByRole('button', { name: 'Mark Packages' })
        this.billofLading = page.locator('textarea[type="text"]').nth(1)
        this.deliveryTab = page.getByRole('button', { name: 'Delivery' })
        this.deliveryName = page.locator('div:nth-child(3) > div > div > .form-control').first()
        this.deliveryPhone = page.getByPlaceholder('(___) ___-____').first()
        this.email = page.locator('input[type="email"]').first()
        this.staSameAsSoldTo = page.locator('xpath=//tsmt-ship-to-addresses//*[contains(text(), "AS SOLD")]')
        //this.sameasSoldTo = page.locator('xpath=//div[@class="ship-to-addresses"]//button[contains(text(),"SAME AS SOLD TO")]')
        //**JOB INFO */
        this.addressline1 = page.locator('#jobInformationForm').getByRole('textbox').nth(1)
        this.addressline2 = page.locator('#jobInformationForm').getByRole('textbox').nth(2)
        this.jobinfopage = page.locator('xpath=//div[contains(@class,"EditJobSubTitle ")]')
        this.jobInfoSameAsSoldTo = page.locator('xpath=//button[contains(text(),"SAME AS SOLD TO")]')
        //**BILLINGS */
        this.billingsInfo = page.locator('xpath=//div[contains(@class,"billing-details")]')
        //**CLASSIFICATION */
        this.purClass = page.locator('xpath=//select[@name="data"]').first();
        this.appClass = page.locator('xpath=//select[@name="data"]').nth(1);
        this.buildClass = page.locator('xpath=//select[@name="data"]').nth(2);
        this.bidClass = page.locator('xpath=//select[@name="data"]').nth(3);
        this.accountClass = page.locator('xpath=//select[@name="data"]').nth(4);
        this.equipment = page.locator('xpath=//select[@name="data"]').nth(5);
        this.strategy = page.locator('xpath=//select[@name="data"]').nth(9);
        this.controlsClass = page.locator('xpath=//select[@name="data"]').nth(7);
        //**COMMISSION SPLITS */
        this.commissionPerson = page.locator('xpath=//*[@formcontrolname="salesPersonId"]//*[@class="k-dropdown-wrap"]//input').nth(0)
        this.commissionPercent = page.locator('xpath=//*[@formcontrolname="commissionPercent"]//*[@class="k-numeric-wrap"]//input').first();
       // this.commissionPercent = page.locator('xpath=//span//input[@class="k-input k-formatted-value"]').nth(0)
        this.commissionPercent1 = page.locator('xpath=//*[@formcontrolname="commissionPercent"]//*[@class="k-numeric-wrap"]//input').nth(5)
        this.commissionPercent2 = page.locator('xpath=//*[@formcontrolname="commissionPercent"]//*[@class="k-numeric-wrap"]//input').nth(10)
        //**LITERATURE */
        this.literaturedate = page.locator('xpath=//*[@formcontrolname="defaultDateToEmailLiterature"]//span[@class="k-icon k-i-calendar"]')
        //**VIEW CREDIT PROJECT */
        this.creditProjectInput = page.locator('kendo-combobox').getByRole('combobox').first()
        this.viewCP = page.getByRole('button', { name: 'View / Edit Credit Project' })
        this.deleteButton = page.locator('xpath=//*[contains(text(),"DELETE")]')
        this.jobcontactdp = page.locator('xpath=//select[@formcontrolname="jobContactName"]')
        this.officeSave = page.locator('xpath=//a//span[contains(text(),"Billing")]')
        this.saveToaster = page.locator('xpath=//*[contains(text(),"Office & People section data has been saved.")]')
        this.transmitButton = page.locator('xpath=//button[contains(text(),"TRANSMIT")]')
        this.yesButton = page.locator('xpath=//kendo-dialog-actions//button[contains(text(),"YES")]')
        this.transmitSuccessMsg = page.locator('xpath=//*[contains(text(),"Transmission is successfully completed")]')
        this.transmitGearIcon = page.locator("xpath=//em[contains(@class, '-cog')]");
        this.transmitGearTooltip = page.locator("xpath=//li[@class='message-list']");
        this.countBadge = page.locator('xpath=//span[@id="countBadge"]//kendo-badge')
        this.systemValidationMsg = page.locator('xpath=//*[contains(text(),"Please review Errors/Warnings panel")]')
        this.pdSaveMsg = page.locator('xpath=//*[contains(text(),"Purchasing Document section data has been saved.")]')
        this.loadingWait = page.locator('css=.k-loading-image');

        this.toasterClose = page.locator('kendo-notification span.k-i-close').first();
        this.createdCpLink = page.locator('td a.highlight');
        this.phoneIcon = page.locator('xpath=//i[contains(@class, "-phone")]');
        this.creditProject = page.locator('xpath=//span[contains(@class,"k-link k-menu-link")  and contains(text()," Credit Project ")]');
        this.assignSalesOrdersMenu = page.locator('xpath=//span[contains(@class,"k-link k-menu-link")  and contains(text()," Assign Sales Orders ")]')
        this.expandAll = page.locator('xpath=//span[@class="t-icon t-icon-primary"]').nth(0);
        this.selectOrder = page.locator('kendo-combobox').getByRole('combobox');
        this.selectOrderInput = page.locator('xpath=//kendo-searchbar/input')
        this.orderList = page.locator('xpath=//kendo-popup//li[2][contains(@id,"J1")]')
        this.shipStatus = page.locator('xpath=//td[@data-kendo-grid-column-index="9"]//select[contains(@class,"form-control")]')
        this.selectShipStatus = page.locator('xpath=//option[@value="RLSD"]')
        this.customerDeliveryWindow = page.locator('xpath=//span[@title="Toggle calendar"]/span');
        this.traneInstallCheckBox = page.locator('xpath=//*[contains(@id,"traneInstall")]');
        this.partialShipCheckBox = page.locator('xpath=//*[contains(@id,"partialShipOk")]');
        this.headerCheckBox = page.locator('#item-header');
        this.validateButton = page.getByRole('button', { name: 'VALIDATE ' })
        this.jobPage = page.locator('xpath=//span[contains(@class,"menu-text k-item k-menu-item") and contains(text(),"Job")]')
        this.detailsTab = page.locator('xpath=//span[text()=" Details "]')
        this.noSystemCheckBox = page.locator('#earthwisecheckbox-0');
        //sign in
        this.menuCloseIcon = page.locator('xpath=//i[@class="fa fa-times close-icon"]');
        this.preferencesLink = page.locator('.preferences-link');
        this.signOutLink = page.getByRole('link', { name: ' Sign out' });
        this.workSightAzureLogin = page.getByRole('link', { name: 'Sign in here' })
        //edit credit project
        this.editButton = page.locator('//button/em[@class="fas fa-edit t-icon"]')
        this.commonmethods = new CommonFunctions(page, testInfo)
        this.waitmethods = new WaitFunctions(page)
    }
    async searchAndNavigateToTransmittedCP(CPNumber){
        await this.waitFunction.invisibilityOfBlackLoader();
        await this.waitFunction.waitForVisible(this.jobConfigureScreen.firstJob);
        await this.commonmethods.clickOnElement(this.projectsTab);
        await this.page.waitForTimeout(2000);
        await this.commonmethods.fillElement(this.jobConfigureScreen.searchBox,CPNumber);
        await this.commonmethods.clickOnElement(this.projectSearch);
        await this.waitmethods.invisibilityOfRedLoader();
      }
   
    async navigateToBids() {
        await this.commonmethods.clickOnElement(this.bidsTab)
        await this.page.waitForURL('**/bids')
        await this.commonmethods.clickOnElement(this.bidsSection)
        await this.page.waitForLoadState(); 
    };
    async selectParticularBid() {
        await this.commonmethods.checkBoxSelect(this.baseBidCheckBox)
        await this.commonmethods.checkBoxSelect(this.productCheckBox)
    };
    async addCreditProject() {
        await this.commonmethods.clickOnElement(this.addCreditProjectIcon)
        await this.page.waitForURL('**/create-credit-project')
        await this.page.waitForLoadState('networkidle')
    }
    async updatepurchasingDocumentSection(creditProjectNo, custPONum, account, accountSelect, freightTerms) {
        await this.page.waitForTimeout(10000);
        await this.page.waitForLoadState('networkidle')
        await this.commonmethods.clickOnElement(this.creditProjectNo)
       // await this.waitmethods.waitForVisible(this.creditPrjList)
        await this.commonmethods.clearField(this.creditProjectNo)
        await this.commonmethods.fillElement(this.creditProjectNo, creditProjectNo)
        await this.commonmethods.clickOnElement(this.creditPrjList)
        await this.commonmethods.clickOnElement(this.customerPONo)
        await this.commonmethods.fillElement(this.customerPONo, custPONum)
        await this.commonmethods.clickOnElement(this.accountName)
        await this.commonmethods.fillWithDelay(this.accountName, account)
        await this.page.getByRole('option', { name: accountSelect }).first().click()
        await this.freightTermDP.selectOption(freightTerms);
        await this.commonmethods.clickOnElement(this.nextButton)
    };
    async updateOfficeandPeople(index,projectMngr2) {
        var projectManager2= this.page.locator("xpath=(//*[@formcontrolname='projectManager']//input)["+ index +"]");
        await this.page.waitForLoadState('networkidle')
        await this.commonmethods.kendoDropdownOptionSelector(this.jobRoleProjectManager, cpData.projectMngr);
        await this.commonmethods.clickOnElement(this.phoneIcon);
        await this.commonmethods.kendoDropdownOptionSelector(this.jobRoleSalesManager, cpData.projectMngr);
        await this.commonmethods.clickOnElement(this.phoneIcon);
        await this.commonmethods.clickOnElement(this.jobContactDropDown);
        await this.jobcontactdp.selectOption(cpData.purchasingDocument.jobContact);
        await this.commonmethods.clickOnElement(this.phoneIcon);
        await this.page.waitForTimeout(3000)
        await this.commonmethods.scrollToElement(projectManager2);
        await this.commonmethods.kendoDropdownOptionSelector(this.projectManager, cpData.projectMngr);
        await this.commonmethods.clickOnElement(this.projectManagerSelect)
        await this.page.waitForTimeout(3000)
        await this.commonmethods.scrollToElement(projectManager2);
        await this.commonmethods.kendoDropdownOptionSelector(projectManager2, projectMngr2);
        await this.commonmethods.clickOnElement(this.nextButton)
    }
    async updateOfficeAndPeople() {
       // await this.page.waitForLoadState('networkidle')
        //await this.page.waitForTimeout(3000)
       // await this.commonmethods.clickOnElement(this.jobContactDropDown);
      //  await this.commonmethods.clickOnElement(this.jobContactValue);
    //    await this.commonmethods.clickOnElement(this.jobContactDropDown);
        await this.jobcontactdp.selectOption(cpData.purchasingDocument.jobContact);
       // await this.commonmethods.selectingAnOption(this.jobContactDropDown,cpData.purchasingDocument.jobContact);
      //  await this.commonmethods.clickOnElement(this.phoneIcon);
        await this.page.waitForTimeout(3000)
        await this.jobRoleProjectManager.clear();
        await this.commonmethods.kendoDropdownOptionSelector(this.jobRoleProjectManager, cpData.projectMngr);
        await this.commonmethods.clickOnElement(this.phoneIcon);
        await this.jobRoleSalesManager.clear();
        await this.commonmethods.kendoDropdownOptionSelector(this.jobRoleSalesManager, cpData.projectMngr);
        await this.commonmethods.clickOnElement(this.phoneIcon);
        await this.commonmethods.kendoDropdownOptionSelector(this.projectManager, cpData.projectMngr);
    }
    async updateProjectMangers(index,projectMngr2) {
        var projectManager2= this.page.locator("xpath=(//*[@formcontrolname='projectManager']//input)["+ index +"]");
    //   /  await this.commonmethods.scrollToElement(projectManager2);
        await this.commonmethods.kendoDropdownOptionSelector(projectManager2, projectMngr2);
    }
    async updateOfficeandPeopleEQP() {
        await this.page.waitForLoadState('networkidle');
        await this.commonmethods.clickOnElement(this.jobContactDropDown);
        await this.jobcontactdp.selectOption(cpData.purchasingDocument.jobContact);
        await this.commonmethods.clickOnElement(this.phoneIcon);
        await this.page.waitForTimeout(3000)
        await this.jobRoleProjectManager.clear();
        await this.commonmethods.kendoDropdownOptionSelector(this.jobRoleProjectManager, cpData.projectMngr);
        await this.commonmethods.clickOnElement(this.phoneIcon);
        await this.jobRoleSalesManager.clear();
        await this.commonmethods.kendoDropdownOptionSelector(this.jobRoleSalesManager, cpData.projectMngr);
    }
    async updateShipToAddress(addrName, name, addrLine1, addrLine2, zipCode, billOfLading, delName, delPhone) {
        await this.commonmethods.clickOnElement(this.nextButton)
        await this.page.waitForLoadState('networkidle')
        await this.page.waitForTimeout(5000);
        await this.commonmethods.fillElement(this.shippingAddressName, addrName);
        await this.commonmethods.clickOnElement(this.jobInfoSameAsSoldTo)
        await this.commonmethods.clickOnElement(this.markPackagesTab)
        await this.commonmethods.fillElement(this.billofLading,billOfLading)
        await this.commonmethods.clickOnElement(this.deliveryTab)
        await this.commonmethods.fillElement(this.deliveryName, delName)
        await this.commonmethods.fillElement(this.email, 'test@trane.com')
        await this.commonmethods.clickOnElement(this.addressTab)
        await this.commonmethods.fillElement(this.addressName, '')
        await this.commonmethods.fillElement(this.addressName, addrName)
        await this.page.waitForTimeout(3000)
        await this.commonmethods.clickOnElement(this.addressName)
        await this.commonmethods.clickOnElement(this.deliveryTab)
        await this.commonmethods.clickOnElement(this.nextButton)
    }
    async updateJobInformation() {
        await this.commonmethods.clickOnElement(this.jobInfoSameAsSoldTo)
        await this.commonmethods.clickOnElement(this.nextButton)
    }
    async updateBilling() {
        await this.waitmethods.waitForVisible(this.billingsInfo)
        await this.commonmethods.clickOnElement(this.nextButton)
    }
    async clickOnNextButton() {
        await this.commonmethods.clickOnElement(this.nextButton)
    }
    async updateClassification(purOption, appOption, buildOption, bidOption, actOption, equipOption, jobOption, ctrlOption) {
        await this.purClass.selectOption(purOption);
        await this.appClass.selectOption(appOption);
        await this.buildClass.selectOption(buildOption);
        await this.bidClass.selectOption(bidOption);
        await this.accountClass.selectOption(actOption);
        await this.equipment.selectOption(equipOption);
        await this.strategy.selectOption(jobOption);
        await this.controlsClass.selectOption(ctrlOption);
        await this.commonmethods.clickOnElement(this.nextButton)
    };
    async updateComissionSplit(commSalesPerson, commPercent) {
        await this.page.waitForLoadState();
       // await this.page.waitForTimeout(10000);
        await this.waitmethods.waitForVisible(this.commissionPercent)
        await this.commonmethods.clickOnElement(this.commissionPercent)
        await this.commonmethods.fillElement(this.commissionPercent, '')
        await this.commonmethods.fillElement(this.commissionPercent, commPercent)
        await this.page.waitForTimeout(3000)
        await this.commonmethods.scrollToElement(this.commissionPercent1)
        await this.commonmethods.clickOnElement(this.commissionPercent1)
        await this.commonmethods.fillElement(this.commissionPercent1, commPercent)
        await this.commonmethods.scrollToElement(this.commissionPercent2)
        await this.commonmethods.clickOnElement(this.commissionPercent2)
        await this.commonmethods.fillElement(this.commissionPercent2, commPercent)
        await this.commonmethods.clickOnElement(this.nextButton)
    }
    async updateComissionSplitForEQP(commSalesPerson, commPercent) {
        await this.page.waitForLoadState();
       // await this.page.waitForTimeout(10000);
        await this.waitmethods.waitForVisible(this.commissionPercent)
        await this.commonmethods.clickOnElement(this.commissionPercent)
        await this.commonmethods.fillElement(this.commissionPercent, '')
        await this.commonmethods.fillElement(this.commissionPercent, commPercent)
        await this.commonmethods.clickOnElement(this.nextButton)
    }
    async updateCreditSupplement() {
        await this.waitmethods.waitForVisible(this.nextButton)
        await this.commonmethods.clickOnElement(this.nextButton)
    }
    async updateLiterature() {
        await this.commonmethods.clickOnElement(this.literaturedate)
        await this.commonmethods.pressEnter(this.literaturedate)
    }
    async viewCreditProjectandTransmit() {
        await this.commonmethods.clickOnElement(this.viewCP)
        await this.waitmethods.waitForVisible(this.deleteButton)
        await this.expectCondition.verifyEnabled(this.transmitButton, 'Transmit Btn Enabled');
        await this.commonmethods.clickOnElement(this.transmitButton)
        await this.commonmethods.clickOnElement(this.yesButton)
        await this.waitFunction.invisibilityOfRedLoader();
    }
    async transmitCreditProject() {
        await this.expectCondition.verifyEnabled(this.transmitButton, 'Transmit Btn Enabled');
        await this.commonmethods.clickOnElement(this.transmitButton)
        await this.commonmethods.clickOnElement(this.yesButton)
        await this.waitFunction.invisibilityOfRedLoader();
    }
    async transmitCreditProjectAfterASO() {
        await this.commonmethods.clickOnElement(this.creditProject)
        await this.expectCondition.verifyEnabled(this.transmitButton, 'Transmit Btn Enabled');
        await this.commonmethods.clickOnElement(this.transmitButton)
        await this.commonmethods.clickOnElement(this.yesButton)
        await this.waitFunction.invisibilityOfRedLoader();
    }
    async signOut() {
        await this.page.bringToFront()
        await this.commonmethods.clickOnElement(this.menuCloseIcon);
        await this.commonmethods.clickOnElement(this.preferencesLink);
        await this.commonmethods.clickOnElement(this.signOutLink);
        await this.waitmethods.waitForVisible(this.workSightAzureLogin);
      }
    async viewCreditProjectandTransmitForASO() {
        await this.commonmethods.clickOnElement(this.viewCP)
        await this.waitmethods.waitForVisible(this.deleteButton)
        await this.commonmethods.clickOnElement(this.toasterClose);
        await this.commonmethods.clickOnElement(this.toasterClose);
        await expect(this.toasterClose).toHaveCount(0);
       // await this.expectCondition.verifyEnabled(this.transmitButton, 'Transmit Btn Enabled');
    }
    async waitForTransmit() {
        await this.commonmethods.verifyTransmitVisible(this.transmitSuccessMsg,"TrasnmitSucess")
    }
    async afterTransmitValidation(){
        await this.waitmethods.waitForVisible(this.transmitGearIcon);
        await this.transmitGearIcon.hover();
        await this.expectCondition.verifyText(this.transmitGearTooltip, 'Transmit in progress', 'Transmit in-progress Icon');
    }
    async navigateToDetailsTab() {
        await this.commonmethods.clickOnElement(this.jobPage)
        await this.commonmethods.clickOnElement(this.detailsTab)
        await this.strategy.selectOption(jobOption);
        await this.commonmethods.checkBoxSelect(this.noSystemCheckBox);
    }
    async editCreditProject() {
        await this.commonmethods.clickOnElement(this.editButton)
        await this.commonmethods.clickOnElement(this.yesButton)
        // await this.waitmethods.invisibilityOfRedLoader();
        // console.log("invisibilityOfRedLoader")
        await this.commonmethods.clickOnElement(this.toasterClose);
        console.log("toasterClosed")
        await this.commonmethods.clickOnElement(this.toasterClose);
        console.log("toasterClosed")
        await this.waitmethods.invisibilityOfRedLoader();
        console.log("invisibilityOfRedLoader")
    }
    async navigateToAssignSalesOrder() {
        await this.page.waitForLoadState('networkidle');
        console.log("assignSalesOrdersMenu")
        await this.expectCondition.verifyEnabled(this.assignSalesOrdersMenu, 'assignSalesOrdersMenu Enabled');
      //await this.commonmethods.clickOnElement(this.toasterClose);
        await this.commonmethods.clickOnElement(this.assignSalesOrdersMenu);
        console.log("assignSalesOrdersMenuClicked")
        await this.commonmethods.clickOnElement(this.toasterClose);
        await this.commonmethods.clickOnElement(this.toasterClose);
        await this.waitmethods.invisibilityOfRedLoader();
        await expect(this.toasterClose).toHaveCount(0);
    }
    async updateFieldsToAssignSalesOrder() { 
        await expect(this.toasterClose).toHaveCount(0);
        var orderFieldsCount = await this.selectOrderInput.count();
        await this.commonmethods.clickOnElement(this.expandAll);
        await this.page.waitForTimeout(3000);
     
            for ( let i =0 ; i < orderFieldsCount; i++){
               await this.page.waitForTimeout(5000);
               await this.commonmethods.clearField(this.selectOrderInput.nth(i));
               await this.commonmethods.fillWithDelay(this.selectOrderInput.nth(i),"J1");
               await this.waitmethods.waitForVisible(this.orderList);
               await this.commonmethods.clickOnElement(this.orderList);
                console.log("selectOrder")
                await this.commonmethods.selectingAnOption(this.shipStatus.nth(i), cpData.shipStatus);
                console.log("shipStatus")
             }
    }
    async updateCustomerDeliveryWindowForNonTrane(){
        console.log("updateCustomerDeliveryWindowForNonTrane")
        let kendoDatePickerWindow = this.page.locator('xpath=//span[@title="Toggle calendar"]/span');
        await this.commonmethods.clickOnElement(kendoDatePickerWindow.nth(0));
        await this.commonmethods.pressEnter(kendoDatePickerWindow.nth(0));
        let kendoDatePickerWindowCount = await kendoDatePickerWindow.count();
        console.log("kendoDatePickerWindowCount"+kendoDatePickerWindowCount);
        for ( let i =0 ; i < kendoDatePickerWindowCount; i++){
                console.log("kendoDatePicker")
                await this.commonmethods.clickOnElement(kendoDatePickerWindow.nth(i));
                await this.commonmethods.pressEnter(kendoDatePickerWindow.nth(i));
        }        
    }
    async validateAso(){
            await this.commonmethods.checkBoxSelect(this.headerCheckBox);
            await this.commonmethods.clickOnElement(this.phoneIcon);
            await this.commonmethods.clickOnElement(this.validateButton);
            await this.waitmethods.invisibilityOfRedLoader();
            await this.commonmethods.clickOnElement(this.toasterClose)
    }


    // async assignSalesOrder() {
    //     //
    //     let salesOrders = this.page.locator("xpath=//td[@aria-colindex='1']//em/ancestor::td/parent::tr");
    //     let selectOrder = this.page.locator('kendo-combobox').getByRole('combobox');
    //     let selectOrderInput = this.page.locator('xpath=//kendo-searchbar/input')
    //     let orderList = this.page.locator('xpath=//kendo-popup//li[2][contains(@id,"F1")]')
    //     let shipStatus = this.page.locator('xpath=//div//select[contains(@class,"form-control")]');
    //     let shippingAddressName = this.page.locator('xpath=//input[contains(@class,"form-control shipping-address")]');
    //     let okButton = this.page.locator('#ok-button')
    //     let customerDeliveryWindow = this.page.locator('xpath=//span[@title="Toggle calendar"]/span');
    //     let customerDeliveryWindowInput = this.page.locator('xpath=//div[@class="ml-2 mr-1 d-flex flex-grow-1 justify-content-end mw-0"]');
    //     let traneInstallCheckBox = this.page.locator('xpath=//*[contains(@id,"traneInstall")]');
    //     let asoGrid = this.page.locator("xpath=//tbody[@role='presentation']");
    //     //
    //     await this.waitFunction.waitForVisible(asoGrid);
    //     await this.waitmethods.waitForVisible(customerDeliveryWindowInput.nth(0));
    //     let salesOrderCount = await this.commonmethods.getCount(salesOrders);//2
    //     let rowsToPerform = []
       
    //     for(let i=0; i < salesOrderCount; i++) {
    //         let actionRow =  parseInt(await salesOrders.nth(i).getAttribute("aria-rowindex")); //2
    //         rowsToPerform.push(actionRow-2); //0
    //     }
    //     // console.log(rowsToPerform)
    //      rowsToPerform.forEach(async (rowIndex) => {
    //          console.log(rowIndex);
           
    //        // await this.page.waitForLoadState('networkidle')
    //        if (rowIndex== 0){
    //        // let selectOrderInput = this.page.locator("xpath=(//kendo-searchbar/input)["+rowsToPerform[0]+"]")
    //         console.log(selectOrderInput)
    //         await this.commonmethods.clickOnElement(selectOrderInput.nth(rowsToPerform[0]));
    //         await this.waitmethods.waitForVisible(orderList);
    //         await this.commonmethods.clickOnElement(orderList);
    //         await this.page.keyboard.press('Tab');
    //         console.log("selectOrder")
    //         await this.commonmethods.selectingAnOption(shipStatus.nth(rowsToPerform[0]), cpData.shipStatus);
    //         await this.page.keyboard.press('Tab');
    //         console.log("shipStatus")
    //      //   await this.commonmethods.checkBoxSelect(traneInstallCheckBox.nth(i));
    //        // console.log("traneInstallCheckBox")
    //        // await this.commonmethods.clickOnElement(shippingAddressName.nth(i));
    //       //  await this.commonmethods.clickOnElement(okButton);
    //        // console.log("shippingAddressName")
    //        }
    //        if (rowIndex== 3){
    //        // let selectOrderInput = this.page.locator("xpath=(//kendo-searchbar/input)["+rowsToPerform[1]+"]")
    //         console.log(selectOrderInput)
    //         await this.commonmethods.clickOnElement(selectOrderInput.nth(rowsToPerform[1]));
    //         await this.waitmethods.waitForVisible(orderList);
    //         await this.commonmethods.clickOnElement(orderList);
    //         await this.page.keyboard.press('Tab');
    //         console.log("selectOrder")
    //         await this.commonmethods.selectingAnOption(shipStatus.nth(rowsToPerform[1]), cpData.shipStatus);
    //         await this.page.keyboard.press('Tab');
    //         console.log("shipStatus")
    //      //   await this.commonmethods.checkBoxSelect(traneInstallCheckBox.nth(i));
    //       //  console.log("traneInstallCheckBox")
    //         await this.commonmethods.clickOnElement(customerDeliveryWindow.nth(0));
    //         await this.commonmethods.pressEnter(customerDeliveryWindow.nth(0));
    //        }
      
    // })
    //        // await this.page.waitForTimeout(1000);
    //        // await this.commonmethods.clickOnElement(shippingAddressName.nth(rowIndex));
    //        // await this.commonmethods.clickOnElement(okButton);
    //        // await this.page.keyboard.press('Tab');
    //        // console.log("shippingAddressName")
            
    //         //await this.waitmethods.invisibilityOfRedLoader();
    //         //await expect(this.loader).toHaveCount(0);
    //        // await this.page.waitForTimeout(10000);
    //        // await this.page.waitForTimeout(1000);
    //         //await this.page.waitForTimeout(1000);
    //         //await expect(this.loader).toHaveCount(0);
    //     // })
    //         // await this.commonmethods.clickOnElement(customerDeliveryWindow.nth(0));
    //         // await this.commonmethods.pressEnter(customerDeliveryWindow.nth(0));
    //         // await this.commonmethods.clickOnElement(this.phoneIcon);
    //         // console.log("customerDeliveryWindow")
    //    // await this.commonmethods.checkBoxSelect(this.headerCheckBox);
    //     // await this.commonmethods.clickOnElement(this.phoneIcon);
    //     // console.log("phoneIcon")
    //    // await this.commonmethods.clickOnElement(this.validateButton);
    //    // await this.waitmethods.invisibilityOfRedLoader();
    //    // await this.commonmethods.clickOnElement(this.toasterClose);
    // }
        
    async searchAndNavigateToCP(CPNumber){
        await this.waitFunction.invisibilityOfBlackLoader();
        await this.waitFunction.waitForVisible(this.jobConfigureScreen.firstJob);
        await this.commonmethods.clickOnElement(this.jobConfigureScreen.projectsTab);
        await this.page.waitForTimeout(5000);
       // await this.waitmethods.invisibilityOfRedLoader();
        await this.commonmethods.clickOnElement(this.untransmitted);
        await this.commonmethods.kendoDropdownSelector(this.officeSelectorDropDown, "Charlotte");
        await this.page.waitForTimeout(3000);
        await this.commonmethods.fillElement(this.jobConfigureScreen.searchBox,CPNumber);
        await this.commonmethods.clickOnElement(this.jobConfigureScreen.projectSearch);
        await this.waitmethods.invisibilityOfRedLoader();
    }
    //23-05
    async getCurrentUrl  () {
        var title;
        await this.page.getCurrentUrl().then(function (URL) {
            title = URL
        });
        return title
    }
    async creditJobId (){

        var currentURL,creditJobId, currentURL, temp;
    
      //  currentURL = await this.getCurrentUrl();
       currentURL = await this.page.url();
    
        console.log("Current URL is "+currentURL);
    
        temp = currentURL.split("/", 9);
    
        // console.log("Temporary array is "+temp);
    
        creditJobId = parseInt(temp[8]);
    
        console.log("Current credit job id is "+ creditJobId);
        return creditJobId
    }
   

}
module.exports = { CreditProject };