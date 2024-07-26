'use strict';
const { expect } = require('@playwright/test');
class WaitFunctions {


    constructor(page) {
        this.page = page;
      
        this.pulsingWait = page.locator('.k-loader-canvas');
        this.redLoader = page.locator('span.k-i-loading');
        this.blackLoader = page.locator('.k-loading-image');

    }

async waitForHidden(locator){
    await locator.waitFor({state: "hidden"})
}
async waitForVisible(locator){
//await locator.waitFor({state: "visible"})
await locator.waitFor({state: 'visible', timeout: 50 * 1000 });
}
    async waitTill(Secs){
    await browser.sleep(Secs);
}
async invisibilityOfBlackLoader(){
    await expect(this.blackLoader).toHaveCount(0, { timeout: 50 * 1000 });
}

async verifyVisible(locator, description) {
    await this.embedScreenshot(description + " VERIFY VISIBLE - VALIDATION SCREENSHOT");
    await expect(locator).toBeVisible();
}
async embedScreenshot(description) {
    await this.testInfo.attach(description, { 
        body: await this.page.screenshot({fullPage: true }), 
        contentType: 'image/png' 
    });  
}
async invisibilityOfBlackLoader(){
    await expect(this.blackLoader).toHaveCount(0, { timeout: 300 * 1000 });
}
async invisibilityOfRedLoader(){
    await expect(this.redLoader).toHaveCount(0, { timeout: 300 * 1000 });
}
async invisibilityOfPulsingWait(){
    await expect(this.pulsingWait).toHaveCount(0, { timeout: 300 * 1000 });
}
}
module.exports = { WaitFunctions };