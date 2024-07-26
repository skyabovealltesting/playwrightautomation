var { CommonFunctions } = require('../commonUtils/CommonFunctions');
var { WaitFunctions } = require('../commonUtils/WaitFunctions');
class CreateOppy {


    constructor(page, testInfo) {
        this.page = page;
        this.testInfo = testInfo;
        this.openedOppy = page.locator('xpath=//div[contains(@class,"tabsetHeader")]//div[@role="tablist"]//button[contains(@title,"Close")]')
        this.oppurtunitiesTab = page.getByRole('link', { name: 'Opportunities' })
        this.newOption = page.locator('xpath=//div[contains(@class,"forceListViewManagerHeader")]//div[@title="New"]')
        this.nextButton = page.getByRole('button', { name: 'Next' })
        this.oppyName = page.locator('xpath=//input[@name="Name"]')
        this.accountName = page.getByPlaceholder('Search Accounts...')
        this.accountResult = page.locator('xpath=//lightning-base-combobox-formatted-text').nth(0)
       // this.accountResult1 = page.locator('xpath=//div[contains(@class,"forceSearchResultsRegion")]//a').nth(7)
        this.accountResult1 = page.locator('xpath=//span[@class="slds-radio"]').nth(0)
        this.selectResult = page.locator('xpath=//button[@class="slds-button slds-button_brand" and text()="Select"]')

        this.accountowner= page.locator('label').filter({ hasText: 'Account Owner' }).locator('span').first()
        this.nextBtn= page.getByRole('button', { name: 'Next' })
       // this.stage = page.getByLabel('Stage - Current Selection: --None--');
        this.stage = page.locator('xpath=//button[@aria-label="Stage"]');
        this.bidDate = page.getByLabel('Bid Date');
        this.closedate = page.getByLabel('*Close Date')
       // this.worksightDB = page.getByLabel('Worksight Database - Current Selection: --None--');
        this.worksightDB = page.locator('//button[@aria-label="Worksight Database"]');
       // this.salesRegion = page.getByLabel('Sales Region - Current Selection: --None--');
        this.salesRegion = page.locator('//button[@aria-label="Sales Region"]');
       // this.salesOffice = page.getByLabel('Sales Office - Current Selection: --None--')
        this.salesOffice = page.locator('//button[@aria-label="Sales Office"]');
       // this.revenueStreamType = page.getByLabel('Revenue Stream Type - Current Selection: --None--');
        this.revenueStreamType = page.locator('//button[@aria-label="Revenue Stream Type"]');
       // this.revenueStream = page.getByLabel('Revenue Stream - Current Selection: --None--');
        this.revenueStream = page.locator('//button[@aria-label="Revenue Stream"]');
       // this.verticalMarket = page.getByLabel('Vertical Market - Current Selection: --None--');
        this.verticalMarket = page.locator('//button[@aria-label="Vertical Market"]');
        this.save = page.getByRole('button', { name: 'Save', exact: true })
        this.locationsTab = page.locator('xpath=//button[@name="Opportunity.Add_Locations"]');
        this.locationInput = page.locator('xpath=//div[@part="input-container"]//input').nth(1);
        this.locationNextBtn = page.locator('xpath=//lightning-button[@class="slds-button flow-button__NEXT"]')
        this.firstLocation = page.locator('xpath=(//div[contains(@class,"flowruntime")]//span[@class="slds-checkbox_faux"])').nth(0);
        this.primaryLocation = page.locator('xpath=(//div[contains(@class,"flowruntime")]//span[@class="slds-radio_faux"])');
        this.addLocationButton = page.getByRole('button', { name: 'Add Locations' })
        this.addContactRoleButton = page.locator('xpath=//button[@name="Opportunity.Add_Contact_Roles"]');
        this.contactLoader = page.locator('xpath=//lightning-spinner//div[contains(@class,"spinner")]');
        this.searchContactBar = page.getByPlaceholder('Search for Contacts...');
        this.searchIcon = page.getByRole('button', { name: 'Search' });
        this.selectContactname = page.locator('xpath=//div[contains(@class,"contact-modal")]//span[@class="slds-radio_faux"]').first();
      // this.selectRole = page.getByLabel('Select Role')
        this.selectRole = page.locator('//button/span[@class="slds-truncate"]');
        this.primaryCheckbox = page.locator('xpath=//div[contains(@class,"contact-modal")]//span[@class="slds-checkbox_faux"]').last();
        this.billToCheckbox = page.locator('xpath=//div[contains(@class,"contact-modal")]//span[@class="slds-checkbox_faux"]').first();
        this.discoveryTab = page.locator('xpath=//a[@data-tab-name="Discovery & Qualify"]')
        this.solutionDevelopmentTab = page.locator('xpath=//a[@data-tab-name="Solution Development"]');
        this.stageComplete = page.getByText('Mark Stage as Complete')
        this.markCurrentStage = page.getByText('Mark as Current Stage')
        this.systeminfoTab = page.getByText('System Information').first();
        this.stageCompleteMessage = page.getByText('Stage changed successfully')
        this.worksightJob = page.locator('xpath=//*[@title="Worksight Job"]')
        this.commonmethods = new CommonFunctions(page, testInfo)
        this.waitmethods = new WaitFunctions(page)

    }
    async closeExistingOppy() {
        var openedOppyVisible = await this.page.locator('xpath=//div[contains(@class,"tabsetHeader")]//div[@role="tablist"]//button[contains(@title,"Close")]').nth(0).isVisible();
        var openedOppyCount = await this.page.locator('xpath=//div[contains(@class,"tabsetHeader")]//div[@role="tablist"]//button[contains(@title,"Close")]')
        if (openedOppyVisible) {
            this.systeminfoTab.waitFor({ state: "visible" });
            var existingOppyCount = await openedOppyCount.count();
            console.log("existingOppyCount"+existingOppyCount)
            if (existingOppyCount > 0) {
                do {
                    await openedOppyCount.nth(existingOppyCount - 1).click();
                    await this.page.waitForTimeout(3000)
                    await existingOppyCount--;
                    console.log("existingOppyCount" + existingOppyCount)
                } while (existingOppyCount > 0)
            }
        }
    }
    async selectAccount(accountName){
        await this.commonmethods.clickOnElement(this.accountName)
        await this.commonmethods.fillElement(this.accountName, accountName)
        await this.waitmethods.waitForVisible(this.accountResult)
        await this.commonmethods.pressEnter(this.accountName)
        await this.waitmethods.waitForVisible(this.accountResult1)
        await this.commonmethods.clickOnElement(this.accountResult1)
        await this.commonmethods.clickOnElement(this.accountowner);
        await this.commonmethods.clickOnElement(this.nextBtn);
    }
    async createOppy(OppyName,accountName, stage, bidDate, closeDate, worksightDB, salesRegion, salesOffice, revenueStreamType, revenueStream, verticalMarket) {
        await this.page.waitForLoadState();
        await this.page.waitForLoadState('networkidle')
        await this.closeExistingOppy();
        await this.waitmethods.waitForHidden(this.openedOppy)
        await this.waitmethods.waitForVisible(this.newOption)
        await this.commonmethods.clickOnElement(this.newOption)
        await this.commonmethods.clickOnElement(this.nextButton)
        //await this.selectAccount(accountName);
        var oppyName = await this.commonmethods.generateWPName(OppyName);
        console.log("Oppy Name - " + oppyName)
        await this.commonmethods.fillElement(this.oppyName, oppyName);
        await this.commonmethods.clickOnElement(this.accountName);
        await this.commonmethods.fillElement(this.accountName, accountName);
        await this.waitmethods.waitForVisible(this.accountResult)
        await this.commonmethods.pressEnter(this.accountName)
        await this.waitmethods.waitForVisible(this.accountResult1)
        await this.commonmethods.clickOnElement(this.accountResult1)
        await this.commonmethods.clickOnElement(this.selectResult)
       // await this.page.keyboard.press('Tab');
        await this.commonmethods.comboBoxSelectByTitle(this.stage, stage);
        await this.commonmethods.comboBoxSelectByTitle(this.salesRegion, salesRegion);
        await this.commonmethods.comboBoxSelectByRole(this.salesOffice, salesOffice)
        await this.commonmethods.comboBoxSelectByTitle(this.revenueStreamType, revenueStreamType);
        await this.commonmethods.comboBoxSelectByTitlefirst(this.worksightDB, worksightDB);
        await this.commonmethods.comboBoxSelectByTitle(this.revenueStream, revenueStream);
        await this.commonmethods.comboBoxSelectByTitle(this.verticalMarket, verticalMarket);
        await this.commonmethods.clickOnElement(this.bidDate)
        await this.commonmethods.fillElement(this.bidDate, bidDate)
        await this.commonmethods.clickOnElement(this.closedate)
        await this.commonmethods.fillElement(this.closedate, closeDate)
        await this.commonmethods.clickOnElement(this.save);
    };

    async addLocation(location) {
       // await this.page.waitForLoadState('networkidle');
       // await this.waitmethods.waitForVisible(this.locationsTab);
        await this.page.waitForTimeout(10*1000);
        await this.commonmethods.clickOnElement(this.locationsTab)
        //await this.waitmethods.waitForVisible(this.locationInput)
        await this.page.waitForTimeout(5*1000);
        await this.commonmethods.fillElement(this.locationInput, location)
        await this.commonmethods.clickOnElement(this.locationNextBtn)
        await this.page.waitForTimeout(5*1000);
        //await this.waitmethods.waitForVisible(this.firstLocation)
        await this.commonmethods.clickOnElement(this.firstLocation)
        await this.commonmethods.clickOnElement(this.nextButton)
        await this.page.waitForTimeout(10*1000);
       // await this.waitmethods.waitForVisible(this.primaryLocation)
        await this.commonmethods.clickOnElement(this.primaryLocation)
        await this.commonmethods.clickOnElement(this.addLocationButton)
    }
    async addContactRole(contactRole, role) {
        await this.waitmethods.waitForVisible(this.addContactRoleButton);
        await this.commonmethods.clickOnElement(this.addContactRoleButton)
        await this.waitmethods.waitForVisible(this.searchContactBar)
        await this.commonmethods.clickOnElement(this.searchContactBar)
        await this.commonmethods.fillElement(this.searchContactBar, contactRole)
        await this.commonmethods.clickOnElement(this.searchIcon)
        await this.waitmethods.waitForVisible(this.selectContactname)
        await this.commonmethods.clickOnElement(this.selectContactname)
        await this.commonmethods.clickOnElement(this.nextButton)
        await this.waitmethods.waitForVisible(this.selectRole)
        await this.commonmethods.comboBoxSelectByRoleMatch(this.selectRole, role)
        await this.commonmethods.clickOnElement(this.primaryCheckbox)
        await this.commonmethods.clickOnElement(this.billToCheckbox)
        await this.commonmethods.clickOnElement(this.save)
    }
    async markCurrentAsStage() {
        
       // await this.waitmethods.waitForHidden(this.primaryCheckbox)
       await this.waitmethods.waitForVisible(this.solutionDevelopmentTab);
       // await this.commonmethods.clickOnElement(this.discoveryTab);
       await this.commonmethods.clickOnElement(this.solutionDevelopmentTab);
        //await this.commonmethods.clickOnElement(this.stageComplete);
        await this.commonmethods.clickOnElement(this.markCurrentStage);
       // await this.commonmethods.verifyVisible(this.stageCompleteMessage,"StageCompletedMessage");

        var page1 = await this.commonmethods.newTab(this.worksightJob)
        return page1
    }

    async markStageComplete() {
        await this.waitmethods.waitForHidden(this.primaryCheckbox)
        await this.commonmethods.clickOnElement(this.discoveryTab)
         await this.commonmethods.clickOnElement(this.stageComplete)
        await this.commonmethods.verifyVisible(this.stageCompleteMessage,"StageCompletedMessage")
 
         var page1 = await this.commonmethods.newTab(this.worksightJob)
         return page1
     }



};

module.exports = { CreateOppy };