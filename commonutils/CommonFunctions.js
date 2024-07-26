const { expect } = require('@playwright/test');
const path = require ("path")
const createData = require('../testdata/CreateOppy.json');
class CommonFunctions {


    constructor(page,testInfo) {
        this.page = page;
        this.testInfo=testInfo;
      

    }
    async generateWPName(wpPrefix) {
        var tempwpname = wpPrefix;
        var wpname = tempwpname + await this.currentDateAndTime();
        return wpname;
    };
    async currentDateAndTime() {
        var datetime = new Date();
        var month = ("0" + (await datetime.getMonth() + 1)).slice(-2);
        var day = ("0" + await datetime.getDate()).slice(-2);
        var year = await datetime.getFullYear();
        var Hour = await datetime.getHours();
        var Mins = await datetime.getMinutes();
        var Secs = await datetime.getSeconds();
        var MSecs = await datetime.getMilliseconds();
        return month + day + year + Hour + Mins + Secs + MSecs;
       //return Hour + Mins + Secs;
    }
    async wpNameGenerator(){
        const today = new Date();
        const year = today.getFullYear();
        const month = new Intl.DateTimeFormat('en', {month: 'short'}).format(today);
        const day = today.getDate().toString().padStart(2, '0');
        const hours = today.getHours().toString().padStart(2, '0');
        const minutes = today.getMinutes().toString().padStart(2, '0');
        const seconds = today.getSeconds().toString().padStart(2, '0');
        const wpName = `VA_TSMTE_${day}-${month}-${year}_${hours}:${minutes}:${seconds}`
        console.log(`The wpName is ${wpName}`);
        return wpName;
    }

    async listboxItemsSelect(page,listboxLocator,selectItem){
        await listboxLocator.click();
        await page.getByRole('option', { name: selectItem }).click();

    }
   async setDropDownValue (dropdownList, name) {
        console.log(name)
        this.dropdownList.waitFor({ state: "visible" })
            //WaitFunctions.waitForPresence(dropdownList);
            await dropdownList.then(async function (rawelements) {
                for (var i = 0; i < rawelements.length; i++) {
                    await rawelements[i].getText().then(async function (text) {
                        var tex = text.toString();
                        if (tex.includes(name)) {
                            this.rawelements[i].waitFor({ state: "visible" })
                            //WaitFunctions.waitForPresence(rawelements[i]);
                            await rawelements[i].click();
                            i = rawelements.length
                        }
                    })
                }
            });
            
        }
        async jsClick(locator){
          
            //var locator = page.Locator("some_selector");
        await locator.EvaluateAsync("element => element.click()");
        }  
        async pressEnter(locator){
            await locator.press('Enter')
        }
        async clickOnElement(locator){
            await locator.click();
        }
        async fillElement(locator,value){
            await locator.fill(value);
        }
        
        async comboBoxSelectByTitle(locator,titleValue){
            await locator.click();
        await this.page.getByTitle(titleValue).click();

        }
        async comboBoxSelectByTitlefirst(locator,titleValue){
            await locator.click();
        await this.page.getByTitle(titleValue).nth(1).click();

        }
        async comboBoxSelectByRole(locator,role){
            await locator.click();
            await this.page.getByRole('option', { name: role }).click();
        }
      
        async comboBoxSelectByRoleExact(locator,role){
            await locator.click();
            await this.page.getByRole('option', { name: role,exact: true }).click();
        }
        async comboBoxSelectByRoleMatch(element,role){
            await element.click();
            await this.page.getByRole('option', { name: role }).locator('span').nth(1).click();
        }
        async newTab(locator){
           // const page1Promise = this.page.waitForEvent('popup');
            await locator.click();
            // const page1 = await page1Promise;
            // await page1.waitForLoadState('networkidle');
            // return page1
        }
        async embedScreenshot(description) {
            const screenshot = await this.page.screenshot({fullPage: true });
            await this.testInfo.attach(description, { body: screenshot, contentType: 'image/png' });  
          }
        async verifyVisible(locator,description) {
            await locator.waitFor({ state: "visible" });
               await this.embedScreenshot(description + " is Visible as Expected - Screenshot");
               await this.testInfo.attach(description + " is Visible as Expected", { body: description + " is Visible as Expected" , contentType: 'text/plain' });
             await expect(locator).toBeVisible(true);
           }
           async verifyTransmitVisible(locator,description) {
            await locator.waitFor({ state: "visible",timeout: 200000 });
               await this.embedScreenshot(description + " is Visible as Expected - Screenshot");
               await this.testInfo.attach(description + " is Visible as Expected", { body: description + " is Visible as Expected" , contentType: 'text/plain' });
             await expect(locator).toBeVisible(true,({ timeout: 200000 }));
           }
           
    async verifyText(locator, expectedValue, description) {
        await this.embedScreenshot(description + " VERIFY TEXT - VALIDATION SCREENSHOT");
        expect((await locator.textContent()).trim()).toEqual(expectedValue);
    }
           async uploadFile (elementName, path) {
            await elementName.sendKeys(path)
        }
        async kendoDropdownSelector(locator, option){
            await locator.click();
            await this.page.locator('ul li').filter({hasText: option}).first().click();
        }
        //
        async newTab(locator){
            const tab1Promise = this.page.waitForEvent('popup');
            await locator.click();
            const tab1 = await tab1Promise;
            // await tab1.waitForLoadState('networkidle');
            await tab1.waitForLoadState();
            return tab1;
        }
        async uploadSingleFile(locator, fileLocation){
            await locator.setInputFiles(path.join(__dirname, fileLocation));
        }

        async kendoDropdownOptionSelector(webElement, option){
            await webElement.click();
            // await webElement.pressSequentially(option, {delay: 50});
            await this.fillWithDelay(webElement, option, 50);
            await this.page.locator('ul li').filter({hasText: option}).first().click();
        }
        async selectingAnOption(locator, optionText){
            await locator.selectOption({label: optionText});
        }
        async scrollToElement(locator){
            await locator.scrollIntoViewIfNeeded();
        }
        async fillWithDelay(locator, text, delayInMs){
            await locator.pressSequentially(text, {delay: delayInMs});
        }
        async kendoDropdownSelector(locator, option){
            await locator.click();
            await this.page.locator('ul li').filter({hasText: option}).first().click();
        }
        async checkBoxSelect(locator){
            await locator.check({force: true});
        }
        async currentDateAndTime1(){
            const today = new Date();
            const year = today.getFullYear();
            const month = new Intl.DateTimeFormat('en', {month: 'short'}).format(today);
            const day = today.getDate().toString().padStart(2, '0');
            const hours = today.getHours().toString().padStart(2, '0');
            const minutes = today.getMinutes().toString().padStart(2, '0');
            const seconds = today.getSeconds().toString().padStart(2, '0');
           // const wpName = `${tempwpname}-${day}-${month}-${year}_${hours}:${minutes}:${seconds}`
           // console.log(`The wpName is ${wpName}`);
          //  return wpName;
          return today+year+month+day+hours+minutes+seconds
        }
        async getCount(locator){
            return await locator.count();
        }
        async getText(locator){
            return await locator.textContent();
        }
        async selectRadioBtn(locator){
            await locator.check({force: true});
        }
        async clearField(locator){
            await locator.clear();
        }
       
}

module.exports = { CommonFunctions };