const { expect } = require('@playwright/test');
/**
 * @author Suganya Rajasekaran
 */
class Assertions {
    /**
     * @param {import('@playwright/test').Page} page 
     * @param {import('@playwright/test').TestInfo} testInfo 
     */
    constructor(page,testInfo) {
        this.page = page;
        this.testInfo = testInfo;
    }

/*###################     VERIFICATION COMPONENETS     ####################*/

    async embedScreenshot(description) {
        await this.testInfo.attach(description, { 
            body: await this.page.screenshot({fullPage: true }), 
            contentType: 'image/png' 
        });  
    }
    async verifyVisible(locator, description) {
        await this.embedScreenshot(description + " VERIFY VISIBLE - VALIDATION SCREENSHOT");
        await expect(locator).toBeVisible();
    }
    
    async verifyHidden(locator, description) {
        await this.embedScreenshot(description + " VERIFY HIDDEN - VALIDATION SCREENSHOT");
        await expect(locator).toBeHidden();    
    }

    async verifyValue(actualValue, strExpectedValue, description) {
        await this.embedScreenshot(description + " VERIFY VALUE - VALIDATION SCREENSHOT");
        expect(actualValue).toEqual(strExpectedValue);
    }
    
    async verifyDisabled(locator, description) {
        await this.embedScreenshot(description + " VERIFY DISABLED - VALIDATION SCREENSHOT");
        await expect(locator).not.toBeEditable();
    }
     
    async verifyEnabled(locator, description) {
        await this.embedScreenshot(description + " VERIFY ENABLED - VALIDATION SCREENSHOT");
        await expect(locator).toBeEditable();
    }
     
    // Vibin Abishek Vijayakumar //
    async verifyChecked(locator, description) {
        await this.embedScreenshot(description + " VERIFY CHECKED - VALIDATION SCREENSHOT");
        await expect(locator).toBeChecked();
    }

    async verifyText(locator, expectedValue, description) {
        await this.embedScreenshot(description + " VERIFY TEXT - VALIDATION SCREENSHOT");
        expect((await locator.textContent()).trim()).toEqual(expectedValue);
    }

    async verifyInputText(locator, expectedValue, description) {
        await this.embedScreenshot(description + " VERIFY INPUT TEXT - VALIDATION SCREENSHOT");
        await expect(locator).toHaveValue(expectedValue);
    }

    async verifyValueProperty(locator, expectedValue, description) {
        const valueText = await locator.evaluate(el=>el.value);
        await this.embedScreenshot(description + " VERIFY PROPERTY VALUE - VALIDATION SCREENSHOT");
        expect(valueText).toEqual(expectedValue)
    }
    async verifyArray(locator, expectedArray, description){
        let textArray = await locator.allTextContents();
        let trimmedArray = textArray.map(string=>string.trim());
        expect(trimmedArray).toEqual(expect.arrayContaining(expectedArray));
        await this.embedScreenshot(description + " VERIFY ARRAY - VALIDATION SCREENSHOT");
    }
}

module.exports = { Assertions };