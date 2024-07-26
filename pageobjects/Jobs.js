var { CommonFunctions } = require('../commonUtils/CommonFunctions');
var { WaitFunctions } = require('../commonUtils/WaitFunctions');
const wpData = require('../testdata/WorkPackage.json');
const jobsData = require('../testdata/JobsData.json');
const cpData = require('../testdata/CreditProject.json');

class Jobs {

   
    constructor(page,testInfo) {
        this.waitFunction = new WaitFunctions(page)
        //**EnableE  ERP */
        this.page = page;
        this.testInfo=testInfo;
       // this.searchBox = page.getByPlaceholder('Search...');
       // this.searchIcon = page.getByTitle('Search');
       // this.firstJob = page.locator('td div.highlight').first();
        this.projectsTab = page.locator('xpath=//span[text()="Projects"]');
        this.projectSearch = page.locator('xpath=//span[@class="t-icon t-icon-white fas fa-search"]');
        this.projectNumbLink = page.locator('xpath=//a[@class="t-link"]');
        this.detailsTab = page.locator('xpath=//span[text()=" Details "]')
        this.switchERP = page.locator('xpath=//button[@class="t-toggle-btn t-toggle-btn-sm"]')
        this.noSystemCheckBox = page.locator('#earthwisecheckbox-0');
        //  //CLASSIFICATION /
        this.purClass = page.locator('xpath=//select[@name="data"]').first();
        this.appClass = page.locator('xpath=//select[@name="data"]').nth(1);
        this.buildClass = page.locator('xpath=//select[@name="data"]').nth(2);
        this.bidClass = page.locator('xpath=//select[@name="data"]').nth(3);
        this.accountClass = page.locator('xpath=//select[@name="data"]').nth(4);
        this.equipment = page.locator('xpath=//select[@name="data"]').nth(5);
        this.projectType = page.locator('xpath=//select[@name="data"]').nth(6);
        this.strategy = page.locator('xpath=//select[@name="data"]').nth(9);
        this.controlsClass = page.locator('xpath=//select[@name="data"]').nth(7);
        this.configureTab = page.locator('xpath=//span[text()=" Configure "]')
        //**CONFIGURE TM */
        this.configureHyperlink = page.locator('xpath=//div//span[@class="config t-link"]')
        this.jobMenu = page.getByRole('button', { name: 'Job Menu ' });
        this.moreElements = page.locator('button#moreButton');
        this.appendPSD = page.locator('a#appendPsdButtonLynxJobEditor');
        this.uploadPSD = page.locator('xpath=//*[@id="importpsdfileselect"]')
        this.uploadPSDPopUp = page.locator('xpath=//div[@class="modal-content"]')
        this.saveConfiguration = page.getByText('Save Configuration')
        this.newOption = page.locator('xpath=//div[contains(@class,"forceListViewManagerHeader")]//div[@title="New"]')
        //**ADD NTM */
        //**ADD NTM */
        this.ntmCreateButton = page.locator('xpath=//button[contains(text(), "Create")]')
        this.ntmDescription = page.getByRole('textbox').first()
        this.providerComboBox = page.locator('kendo-combobox span').nth(2);
        this.providerSelect = page.getByRole('option', { name: 'AAF' });
        this.firstEquipment = page.locator('xpath=//select[@formcontrolname="equipmentName"]//option').nth(1);
        this.firstEquipmentSelect=page.locator('xpath=//select[@formcontrolname="equipmentName"]');
        this.cost = page.locator('xpath=//kendo-numerictextbox[@formcontrolname="cost"]//input')
        this.ntmSave = page.locator('xpath=//button[contains(text(), "Save")]')
        this.ntmSaveSuccessToaster = page.locator('xpath=//span[contains(text(), "added to selected / current bid")]')
        this.showMenu=page.locator('xpath=//div[contains(@class,"show-remaining")]')
        this.phoneIcon=page.locator('xpath=//i[contains(@class, "fas fa-phone")]');
        this.toasterClose=page.locator('xpath=//kendo-notification//span[contains(@class, "-i-close")]')
        this.ntmLaborOption = page.locator('#radio-labor');
        this.prodCode = page.locator("[formcontrolname='prodCode']");
        this.description = page.locator('[formcontrolname="description"]');
        this.jobcontactdp = page.locator('xpath=//select[@formcontrolname="jobContact"]')
        this.commonmethods = new CommonFunctions(page, testInfo)
        this.waitmethods = new WaitFunctions(page)
    }
    async navigateToJobs(){
        await this.page.waitForURL('**/configure')
    }
    async enableERP() {
        //await this.page.waitForLoadState('networkidle');
        await this.commonmethods.clickOnElement(this.detailsTab)
        await this.commonmethods.clickOnElement(this.switchERP);
        await this.commonmethods.clickOnElement(this.phoneIcon);
        await this.commonmethods.clickOnElement(this.toasterClose); 
        await this.commonmethods.selectingAnOption(this.jobcontactdp,cpData.purchasingDocument.jobContact);
        await this.commonmethods.checkBoxSelect(this.noSystemCheckBox);
    }
    async updateClassificationInJobs(purOption, appOption, buildOption, bidOption, actOption, equipOption, projectType,jobOption, ctrlOption) {
        await this.commonmethods.selectingAnOption(this.purClass,purOption);
        await this.commonmethods.selectingAnOption(this.appClass,appOption);
        await this.commonmethods.selectingAnOption(this.buildClass,buildOption);
        await this.commonmethods.selectingAnOption(this.bidClass,bidOption);
        await this.commonmethods.selectingAnOption(this.accountClass,actOption);
        await this.commonmethods.selectingAnOption(this.equipment,equipOption);
        await this.commonmethods.selectingAnOption(this.projectType,projectType);
        await this.commonmethods.selectingAnOption(this.strategy,jobOption);
        await this.commonmethods.selectingAnOption(this.controlsClass,ctrlOption);
      //  await this.commonmethods.checkBoxSelect(this.noSystemCheckBox);
    };
    async saveOracleSystem() {
        await this.commonmethods.clickOnElement(this.phoneIcon);
        await this.commonmethods.clickOnElement(this.toasterClose)
    }
    async addTM() {
        await this.commonmethods.clickOnElement(this.configureTab)
        await this.waitmethods.waitForVisible(this.configureHyperlink)
        await this.commonmethods.clickOnElement(this.configureHyperlink)
        await this.waitmethods.waitForVisible(this.moreElements)
        await this.commonmethods.clickOnElement(this.moreElements)
        await this.waitmethods.waitForVisible(this.appendPSD)
        await this.commonmethods.clickOnElement(this.appendPSD)
        await this.commonmethods.clickOnElement(this.uploadPSD)
        await this.uploadPSD.setFiles(path.join(__dirname, jobsData.addTM.path));
        await this.commonmethods.clickOnElement(this.saveConfiguration)
    }
    async addNonTraneItem(description,provider,cost) {
        await this.commonmethods.clickOnElement(this.ntmCreateButton)
        await this.waitmethods.waitForVisible(this.ntmDescription)
        await this.page.waitForTimeout(4*1000);
        await this.commonmethods.fillElement(this.ntmDescription, description);
        await this.commonmethods.kendoDropdownSelector(this.providerComboBox,provider);
        //await this.commonmethods.clickOnElement(this.phoneIcon)
        await this.commonmethods.clickOnElement(this.firstEquipmentSelect)
        await this.commonmethods.selectingAnOption(this.firstEquipmentSelect,"Controls")
        await this.commonmethods.fillElement(this.cost,cost);
        await this.page.waitForTimeout(4*1000);
        await this.commonmethods.clickOnElement(this.ntmSave)
        await this.waitmethods.waitForVisible(this.ntmSaveSuccessToaster)
    }
    async addNonTrane(prodCode,cost){
        await this.commonmethods.clickOnElement(this.ntmCreateButton);
        await this.waitmethods.waitForVisible(this.ntmLaborOption);
        await this.page.waitForTimeout(4*1000);
        await this.commonmethods.checkBoxSelect(this.ntmLaborOption);
        await this.commonmethods.selectingAnOption(this.prodCode, prodCode);
        await this.commonmethods.scrollToElement(this.cost);
        await this.commonmethods.fillElement(this.cost, cost);
        await this.page.waitForTimeout(4*1000);
        await this.commonmethods.clickOnElement(this.ntmSave);
    }

};

module.exports = { Jobs };