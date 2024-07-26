class JobConfigurePage{

    /**
     * @param {import('@playwright/test').Page} page 
     * @param {import('@playwright/test').TestInfo} testInfo 
     */
    constructor(page, testInfo){
        this.page = page;
        this.testInfo = testInfo;

        /**
         * Landing page
         */
        this.firstJob = page.locator("tbody td[aria-colindex='4'] div").first();
        this.searchBox = page.getByPlaceholder('Search...');
        this.searchIcon = page.locator('i.fa-search');
        this.projectsTab = page.locator('xpath=//span[text()="Projects"]');
        this.projectSearch = page.locator('xpath=//span[@class="t-icon t-icon-white fas fa-search"]');
        this.projectNumbLink = page.locator('xpath=//a[@class="t-link"]');


        /**
         * Job - Configure section
         */
        this.configure = page.locator('span.t-section-title+span');
        this.configureTab = page.locator('xpath=//span[text()=" Configure "]')
        this.exit = page.getByRole('button', {name: 'Exit'});

        /**
         * TSA Page
         */
        this.traneLogo = page.locator('.header-image img');
        this.loading = page.locator("xpath=//small[contains(text(), 'is loaded')]");
       // this.jobMenu = page.locator('#job-menu');//#moreButton
        this.moreMenu = page.locator('#moreButton');
        this.appendExpand = page.locator("//li[@class='li-accordion']/a").nth(1);
       // this.psdOption = page.locator("xpath=//a[contains(text(), 'PSD')]").nth(1);
        this.appendPSD = page.locator('#appendPsdButtonLynxJobEditor');
        this.importFile = page.locator('#importpsdfileselect');
        this.saveConfiguration = page.locator('#li-saveToLynx a');
        this.saveToaster = page.locator('.notify-child');
        this.saveMessage = page.locator("xpath=//small[contains(text(), 've Completion')]");
        
    }
}

module.exports = { JobConfigurePage }