var { CommonFunctions } = require('../commonUtils/CommonFunctions');
var { WaitFunctions } = require('../commonUtils/WaitFunctions');
class LoginPage {


    constructor(page, testInfo) {
        this.page = page;
        this.testInfo = testInfo;
        this.userName = page.locator('xpath=//input[@id="username"]')
        this.passWord = page.locator('xpath=//input[@id="password"]')
        this.signIn = page.locator('#Login')
        this.azureB2CAccount = page.getByRole('button', { name: 'Log in with Azure B2C Login Test' })
        this.workSightAzureLogin = page.getByRole('link', { name: 'Sign in here' })
        this.email = page.locator('xpath=//input[@type="email"]')
        this.nextButton = page.locator('input#idSIButton9')
        this.passWord = page.locator('xpath=//input[@type="password"]')
        this.yesButton = page.locator('xpath=//input[@type="submit"]')
        this.newOption = page.locator('xpath=//div[contains(@class,"forceListViewManagerHeader")]//div[@title="New"]')
        this.useAnotherAccount = page.getByLabel('Use another account')
        this.signInAnotherAccount = page.getByRole('button', { name: 'Sign in' })
        this.user13Account = page.locator('[data-test-id="ctxstg13\\@tranetechnologies\\.com"]')
        this.commonmethods = new CommonFunctions(page, testInfo)
        this.waitmethods = new WaitFunctions(page)
        this.signInhere = page.locator('#AzureADTraneExchange');
        this.emailInput = page.getByPlaceholder('someone@example.com');
        this.nextBtn = page.locator('[value="Next"]');
        this.passwordInput = page.getByPlaceholder('Password');
        this.signInButton = page.locator('[value="Sign in"]');
        this.staySignedIn = page.locator('[value="Yes"]');

    }
    async login(url, userName, passWord) {
        await this.page.goto(url, { waitUntil: 'domcontentloaded' });
        await this.commonmethods.clickOnElement(this.azureB2CAccount)
        await this.waitmethods.waitForVisible(this.workSightAzureLogin)
        await this.commonmethods.clickOnElement(this.workSightAzureLogin)
        await this.waitmethods.waitForVisible(this.email)
        await this.commonmethods.fillElement(this.email, userName)
        await this.commonmethods.clickOnElement(this.nextButton)
        await this.waitmethods.waitForVisible(this.passWord)
        await this.commonmethods.fillElement(this.passWord, passWord)
        await this.commonmethods.clickOnElement(this.nextButton)
        await this.waitmethods.waitForVisible(this.yesButton)
        await this.commonmethods.clickOnElement(this.yesButton)
        await this.page.waitForNavigation();
    };
    async workSightLogin(userName, passWord) {
        await this.waitmethods.waitForVisible(this.email)
        await this.commonmethods.fillElement(this.email, userName)
        await this.commonmethods.clickOnElement(this.nextButton)
        await this.waitmethods.waitForVisible(this.passWord)
        await this.commonmethods.fillElement(this.passWord, passWord)
        await this.commonmethods.clickOnElement(this.nextButton)
        await this.waitmethods.waitForVisible(this.yesButton)
        await this.commonmethods.clickOnElement(this.yesButton)
        await this.page.waitForNavigation();
    }
    async workSight20UserLogin(url, userName, passWord) {
        await this.page.goto(url, { waitUntil: 'domcontentloaded' });

        //**flow */
        await this.waitmethods.waitForVisible(this.workSightAzureLogin)
        await this.commonmethods.clickOnElement(this.workSightAzureLogin)
        await this.waitmethods.waitForVisible(this.useAnotherAccount)
        await this.commonmethods.clickOnElement(this.useAnotherAccount)
        await this.waitmethods.waitForVisible(this.email)
        await this.commonmethods.fillElement(this.email, userName)
        await this.commonmethods.clickOnElement(this.nextButton)
        await this.waitmethods.waitForVisible(this.passWord)
        await this.commonmethods.fillElement(this.passWord, passWord)
        await this.commonmethods.clickOnElement(this.signInAnotherAccount)
        await this.page.waitForNavigation();
        await this.page.waitForURL('**/jobs-list/142')
    }
    async worksight13UserLogin(passWord) {
        await this.waitmethods.waitForVisible(this.workSightAzureLogin)
        await this.commonmethods.clickOnElement(this.workSightAzureLogin)
        await this.commonmethods.clickOnElement(this.user13Account)
        await this.commonmethods.clickOnElement(this.nextButton)
        await this.waitmethods.waitForVisible(this.passWord)
        await this.commonmethods.fillElement(this.passWord, passWord)
        await this.commonmethods.clickOnElement(this.signInAnotherAccount)
        await this.page.waitForNavigation();
        await this.page.waitForURL('**/jobs-list/142')
    }

    async salesToolsLogin(url, userName, password){
        await this.page.goto(url, {timeout: 500000});
        await this.commonmethods.clickOnElement(this.signInhere);
        await this.commonmethods.fillElement(this.emailInput, userName);
        await this.commonmethods.clickOnElement(this.nextBtn);
        await this.commonmethods.fillElement(this.passwordInput, password);
        await this.commonmethods.clickOnElement(this.signInButton);
        await this.commonmethods.clickOnElement(this.staySignedIn);
    }
    async loginWsWithTestaccount17(url,userName, password){
        await this.page.goto(url, {timeout: 500000});
        await this.commonmethods.clickOnElement(this.signInhere);
        await this.commonmethods.clickOnElement(this.useAnotherAccount)
        await this.commonmethods.fillElement(this.emailInput, userName);
        await this.commonmethods.clickOnElement(this.nextBtn);
        await this.commonmethods.fillElement(this.passwordInput, password);
        await this.commonmethods.clickOnElement(this.signInButton);
       // await this.commonmethods.clickOnElement(this.staySignedIn);
    }
    async loginWsWithTestaccount13(url,userName, password){
         await this.page.goto(url, {timeout: 500000});
         await this.commonmethods.clickOnElement(this.signInhere);
         await this.commonmethods.clickOnElement(this.useAnotherAccount)
         await this.commonmethods.fillElement(this.emailInput, userName);
         await this.commonmethods.clickOnElement(this.nextBtn);
         await this.commonmethods.fillElement(this.passwordInput, password);
         await this.commonmethods.clickOnElement(this.signInButton);
        // await this.commonmethods.clickOnElement(this.staySignedIn);
     }
     async loginWsWithTestaccount14(url,userName, password){
        await this.page.goto(url, {timeout: 500000});
        await this.commonmethods.clickOnElement(this.signInhere);
       // await this.commonmethods.clickOnElement(this.useAnotherAccount)
        await this.commonmethods.fillElement(this.emailInput, userName);
        await this.commonmethods.clickOnElement(this.nextBtn);
        await this.commonmethods.fillElement(this.passwordInput, password);
        await this.commonmethods.clickOnElement(this.signInButton);
        await this.commonmethods.clickOnElement(this.staySignedIn);
    }
}
module.exports = { LoginPage };