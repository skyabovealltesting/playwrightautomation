'use strict';

class CreateWorkPackagePage{
    
    /**
     * @param {import('@playwright/test').Page} page 
     * @param {import('@playwright/test').TestInfo} testInfo 
     */
    constructor(page, testInfo){
        this.page = page;
        this.testInfo = testInfo;
        this.workPackageTab = page.getByText('Work Packages');
        this.searchBox = page.getByPlaceholder('Search...');
       // this.searchIcon = page.getByTitle('Search')
       this.searchIcon = page.locator('xpath=//i[@class="fa fa-search"]');
       // this.firstWp = page.locator('td span.highlight').first();
       this.firstWp = page.locator('td div.highlight').first();

        this.officeSelectorDropDown = page.locator('[valuefield="drAddressId"]');
        this.firstWorkPackage = page.locator('xpath=//td[@aria-colindex="4"]/span').first();
        this.loader = page.locator('span.k-i-loading');
        this.blackLoader = page.locator('.k-loading-image');
        this.create = page.locator('xpath=//button[text()="CREATE "]');
        this.jobName = page.locator('kendo-searchbar input');
        this.workPackageName = page.locator('input#workPackage');
        this.salesStage = page.locator('select#salesStageName');
        this.revenueStream = page.locator("[formcontrolname='revenueStreamId']");
        this.controlsContracting = page.getByLabel('Controls-Contracting');
        this.ccExpand = page.locator('kendo-treeview span.k-i-expand');
        this.bidName = page.locator('#bid');
        this.salesOffice = page.locator('#salesOffice');
        this.estimator = page.locator('#estimator');
        this.officePreference = page.locator('#officePreference');
        this.save = page.getByRole('button', {name:'Save'});

        /**
         * Workpackage List page
         */
        this.workPackageStatusHeader = page.locator("th[aria-colindex='24'] span span span").first();
        this.workPackageStatusColumn = page.locator("td[aria-colindex='24']");
    }

    /**
     * This method is to generate Work package's name with current date and time.
     * @returns Work package name.
     */
    async wpNameGenerator(wpPrefix){
        var tempwpname = wpPrefix;
        const today = new Date();
        const year = today.getFullYear();
        const month = new Intl.DateTimeFormat('en', {month: 'short'}).format(today);
        const day = today.getDate().toString().padStart(2, '0');
        const hours = today.getHours().toString().padStart(2, '0');
        const minutes = today.getMinutes().toString().padStart(2, '0');
        const seconds = today.getSeconds().toString().padStart(2, '0');
        const wpName = `${tempwpname}-${day}-${month}-${year}_${hours}:${minutes}:${seconds}`
        console.log(`The wpName is ${wpName}`);
        return wpName;
    }
    async kendoDropdownSelector(locator, option){
        await locator.click();
        await this.page.locator('ul li').filter({hasText: option}).first().click();
    }
    async kendoDropdownOptionSelector(webElement, option){
        await webElement.click();
        // await webElement.pressSequentially(option, {delay: 50});
        await this.fillWithDelay(webElement, option, 50);
        await this.page.locator('ul li').filter({hasText: option}).first().click();
    }
    async fillWithDelay(locator, text, delayInMs){
        await locator.pressSequentially(text, {delay: delayInMs});
    }
    
}

module.exports = { CreateWorkPackagePage }