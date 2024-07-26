'use strict';

class ScopePage{
    /**
     * @param {import('@playwright/test').Page} page 
     * @param {import('@playwright/test').TestInfo} testInfo 
     */
    constructor(page, testInfo){
        this.page = page;
        this.testInfo = testInfo;
        this.scopeMenu = page.locator('tsmt-work-package-header a.nav-link span').nth(1);
        this.threeDots = page.locator('div.t-grid-menu');
        this.plcBadge = page.getByTitle('Project Level');

        /**
         * Scope page
         */
        this.wpHistory = page.getByTitle('Work Package History');
        this.wpHistoryStatus = page.locator("tsmt-work-package-history tbody td[aria-colindex='4'] div");
        this.wpHistoryClose = page.locator("tsmt-work-package-history [class*='-close']");
        this.review = page.locator('#review');
        this.requestValidation = page.locator('#requestValidation');
        this.validationReply = page.locator('#validationReply');
        this.transition = page.locator('#transition');
        this.transmit = page.locator('#transmit');
        this.exit = page.getByRole('button', {name: 'Exit'});
        
        /**
         * Price Adjustment
         */
        this.priceSummaryExpand = page.locator('.work-package-work-area .fa-angle-right');
        this.priceSummaryCollapse = page.locator('.work-package-work-area .fa-angle-left');
        this.priceSummaryHeader = page.locator('tsmt-summary-panel .t-section-title').first();
        this.priceSummaryEdit = page.getByTitle('Edit');
        this.marginRate = page.locator('#marginRate input');
        this.marginDollar = page.locator('#marginDollars input');
        this.totalPrice = page.locator('#totalPrice input');
        this.priceAdjustmentSave = page.locator('tsmt-price-adjustment #save');
        this.priceAdjustmentClose = page.locator("tsmt-price-adjustment [class*='-i-close']");

        /**
         * Add container page
         */
        this.addContainer = page.getByText('Add Container');
        this.addContainerHeader = page.locator('tsmt-work-package-header span span').first();
        this.addFolderHeader = page.locator('tsmt-work-package-header span span').first();
        this.addFolder = page.getByText('Add Folder');
        this.containerSelect = page.locator('#containerType');
        this.category = page.locator("kendo-combobox[formcontrolname='category'] input");
        this.quantity = page.locator("[formcontrolname='quantity'] input");
        this.save = page.locator('#save');
        this.saveAndConfigure = page.locator('#configure');
        this.createContainer = page.locator('#create');
        this.saveAndAddAnother = page.locator('#saveAddAnother'); 
        this.containerDescription = page.locator('tbody span.description');
        this.createContainerHeader = page.locator('div .t-section-title');

        /**
         * Add Folder
         */
        this.folderBadge = page.getByTitle('Folder');
        this.containerTab = page.getByRole('button', {name: 'Container'});
        this.addFolderContainer = page.locator('#addContainer');

        /**
         * Configure container page
         */
        this.ccThreeDots = page.locator('span.t-grid-menu');
        this.searchBox = page.getByPlaceholder('Search...');
        this.searchIcon = page.getByTitle('Search');
        this.containers = page.locator('span.container-description');
        this.addCostItem = page.locator('#addCostItem');
        this.ciTypeExpand = page.locator('[formcontrolname = type] span .k-select');
        this.ciTypes = page.locator('kendo-list ul li');
        this.ciTypeInput = page.locator('span.k-input');
        this.ciType = page.locator("[formcontrolname='type'] span.k-input");
        this.cidropdownList = page.locator('kendo-list');
        this.ciSave = page.locator('#save');
        this.notesSection = page.locator('tsmt-add-cost-item .t-nav-link').nth(1);
        this.notes = page.locator("[formcontrolname='note']");
        this.expandContainer = page.locator("div.configure-container span[class*='fa-angle']");
        this.addedCiDescription = page.locator('tsmt-cost-item-grid span.description');
        this.addedCiCheckbox = page.locator("input[id*='costItem']");
        this.ciDelete = page.locator('tsmt-cost-item-grid').getByTitle('Delete').first();
        this.ciEdit = page.locator('tsmt-cost-item-grid tbody').getByTitle('Edit'); 
        this.delete = page.getByRole('button', {name:'DELETE'});
        this.traneMaterialSelectAll = page.locator('#traneMaterial');
        this.traneMaterialCheckboxes = page.locator('.trane-material-list input');

        /**
         * Add Cost Item
         */ 
        this.description = page.locator('#description');
        this.laborType = page.locator("[formcontrolname='laborType'] input");
        this.hours = page.locator('[formcontrolname="hours"] input');
        this.ooaCommute = page.getByLabel('Out of Area Commute');
        this.noOfTrips = page.locator("[formcontrolname='numberOfTrips'] input");
        this.vendor = page.locator('[formcontrolname="vendor"] input');
        this.partNumber = page.locator('#partNumber');
        this.materialMultiplier = page.locator('[formcontrolname="multiplier"] input');
        this.amount = page.locator('[formcontrolname="amount"] input');
        this.supplyInstall = page.locator('#supplyInstall');
        this.installType = page.locator('#device');
        this.includeDocuments = page.locator("[formcontrolname='isDocumentShow'] span[class*='off']");
        this.uploadSection = page.locator("[type='file']");
        this.documentNotes = page.locator('tsmt-documents-upload textarea');
        this.uploadButton = page.getByRole('button', {name: 'UPLOAD'});
        this.subContract = page.locator("[formcontrolname='subcontractor'] input");
        this.type = page.locator('#type');
        this.cost = page.locator("[formcontrolname='cost'] input");
        this.duration = page.locator("[formcontrolname='duration'] input");
        this.totalCost = page.locator("[formcontrolname='totalCost'] input");
        this.durationType = page.locator('#durationType');
        this.rate = page.locator("[formcontrolname='rate'] input");
        this.feeType = page.locator('#fee');
        this.amountPerUnit = page.locator("[formcontrolname='amountPerUnit'] input");
        this.productCode = page.locator('#productCode');
        this.back = page.locator("span:has-text('BACK')");
        this.yes = page.getByRole('button', {name: 'YES'});

        /**
         * Select parts screen 
         */
        this.selectParts = page.locator('#selectParts');
        this.selectPartsHeader = page.locator('.work-package-header-title-text span span').first();
        this.partDescription = page.locator("input[formcontrolname='partNumberOrDescription']");
        this.obsolete = page.locator('input#includeObsolete');
        this.local = page.locator('input#includeLocal');
        this.vendorSelect = page.locator("select[formcontrolname='vendorId']");
        this.search = page.getByRole('button', {name: 'SEARCH'});
        this.reset = page.getByRole('button', {name: 'RESET'});
        this.firstSelectPart = page.locator("tbody td[aria-colindex='4']").first();
        this.obsoleteEllipse = page.locator("th[aria-colindex='7'] [class*='-vertical']").first();
        this.filterOption = page.locator("[icon='filter'] div span");
        this.yesRadioButton = page.locator("[type='radio']").first();
        this.filterButton = page.locator("[type='submit']");
        this.partNoColumn = page.locator("tbody [aria-colindex='3']");
        this.obsoleteColumn = page.locator("tbody [aria-colindex='7'] div");
        this.selectPartsCheckbox = page.locator("input[id*='selectPartsCheckbox']");
        this.addToList = page.locator('#addToCart');
        this.viewList = page.locator('#viewList');

        /**
         * Parts list page
         */
        this.viewPartsCheckbox = page.locator("input[id*='viewPartsCheckbox']");
        this.saveViewPart = page.getByRole('button', {name: 'SAVE'});
        this.deleteViewPart = page.getByTitle('Delete');
        this.deleteButton = page.getByRole('button', {name: 'DELETE'});
        this.priceColumn = page.locator("tbody td[aria-colindex='4'] div");
        this.previous = page.getByRole('button', {name:'PREVIOUS'});
        this.selectAllViewParts = page.locator('#selectAllTraneParts');

        /**
         * Error Dialog box
         */
        this.dialogBoxTitle = page.locator('.k-window-title');
        this.errorIcon = page.locator("i[class*='circle']");
        this.dialogBoxText = page.locator('kendo-dialog span.ng-star-inserted');
        this.ok = page.getByRole('button', {name: 'OK'});
        this.closeDialogBox = page.locator("span[class*='i-x']");

        /**
         * Select standard items
         */
        this.selectStandardItems = page.locator('#selectStandardItems');
        this.selectStandardItemsHeader = page.locator('.work-package-header-title-text span span').first();
        this.ssiPartDescription = page.locator("input[formcontrolname='partNoOrDescription']");
        this.ssiCheckBox = page.locator("[id*='selectStandardItemsCheckbox']");
        this.allSelectStandardItems = page.locator('#selectAllStandardItem');
        this.ssiPartNoColumn = page.locator("tbody td[aria-colindex='6']");
        this.extendedPriceColumn = page.locator("tbody [aria-colindex='9'] span");

        /**
         * Standard Item list (View list page of select standard items)
         */
        this.selectAllStandardItems = page.locator('#selectAllStandardItems');

        /**
         * Review button
         */

        this.errorCount = page.locator('.t-icon-error + span');
        this.warningCount = page.locator('.t-icon-warning+ span');
        this.reviewClose = page.locator('tsmt-workpackage-review .k-i-close');

        /**
         * Request Validation
         */
        this.toRecipients = page.locator('[placeholder="Choose Recipients"] input').first();
        this.ccRecipients = page.locator('[placeholder="Choose Recipients"] input').nth(1);
        this.notes = page.locator('tsmt-request-validation textarea');
        this.reqValSend = page.getByRole('button', {name: 'Send'});

        /**
         * Validation Reply
         */
        this.validationReplyHeader = page.locator('tsmt-validation-transmit-reply .t-section-title');
        this.validationStatus = page.locator('#status');
        this.next = page.locator('#next');
        this.confirmationNotes = page.locator('tsmt-validation-transmit-reply textarea')
        this.reqReplySend = page.getByRole('button', {name: 'Send'});

        /**
         * Transition panel
         */
        this.transitionHeader = page.locator('tsmt-workpackage-review .t-section-title');
        this.requestTransmit = page.locator('#requestTransmit');
        this.transitionNotes = page.locator('tsmt-request-transmit textarea');
        this.transitionSend = page.getByRole('button', {name: 'Send'});

        /**
         * Transmit Error/Warnings Panel
         */
        this.transmitErrorWarningHeader = page.locator('tsmt-workpackage-review .t-section-title');

        /**
         * Transmit-Contracting Panel
         */
        this.transmitContractHeader = page.locator('tsmt-transmit-contracting .t-section-title');
        this.sendTransmit = page.locator('#send');
        this.transmitNotes = page.locator('tsmt-transmit-contracting textarea');
        this.transmitSend = page.getByRole('button', {name: 'Send'});
        this.transmitDialogBox = page.locator('kendo-dialog div.k-window-title');

        ///
        this.selectParts = page.locator('#selectParts');
        this.selectPartsHeader = page.locator('.work-package-header-title-text span span').first();
        this.partDescription = page.locator("input[formcontrolname='partNumberOrDescription']");
        this.obsolete = page.locator('input#includeObsolete');
        this.local = page.locator('input#includeLocal');
        this.vendorSelect = page.locator("select[formcontrolname='vendorId']");
        this.search = page.getByRole('button', {name: 'SEARCH'});
        this.reset = page.getByRole('button', {name: 'RESET'});
        this.firstSelectPart = page.locator("tbody td[aria-colindex='4']").first();
        this.obsoleteEllipse = page.locator("th[aria-colindex='7'] [class*='-vertical']").first();
        this.filterOption = page.locator("[icon='filter'] div span");
        this.yesRadioButton = page.locator("[type='radio']").first();
        this.filterButton = page.locator("[type='submit']");
        this.partNoColumn = page.locator("tbody [aria-colindex='3']");
        this.obsoleteColumn = page.locator("tbody [aria-colindex='7'] div");
        this.selectPartsCheckbox = page.locator("input[id*='selectPartsCheckbox']");
        this.addToList = page.locator('#addToCart');
        this.viewList = page.locator('#viewList');
        this.viewPartsCheckbox = page.locator("input[id*='viewPartsCheckbox']");
        this.saveViewPart = page.getByRole('button', {name: 'SAVE'});
        this.deleteViewPart = page.getByTitle('Delete');
        this.deleteButton = page.getByRole('button', {name: 'DELETE'});
        this.zeroPriceColumn = page.locator("xpath=//tbody//td[@aria-colindex='4']//div[contains(text(), '0')]");
        this.priceColumn = page.locator("tbody td[aria-colindex='4'] div");
        this.previous = page.getByRole('button', {name:'PREVIOUS'});
        this.selectAllViewParts = page.locator('#selectAllTraneParts');
        this.dialogBoxTitle = page.locator('.k-window-title');
        this.errorIcon = page.locator("i[class*='circle']");
        this.dialogBoxText = page.locator('kendo-dialog span.ng-star-inserted');
        this.ok = page.getByRole('button', {name: 'OK'});
        this.closeDialogBox = page.locator("span[class*='i-x']");
        this.selectStandardItems = page.locator('#selectStandardItems');
        this.selectStandardItemsHeader = page.locator('.work-package-header-title-text span span').first();
        this.ssiPartDescription = page.locator("input[formcontrolname='partNoOrDescription']");
        this.ssiCheckBox = page.locator("[id*='selectStandardItemsCheckbox']");
        this.allSelectStandardItems = page.locator('#selectAllStandardItem');
        this.ssiPartNoColumn = page.locator("tbody td[aria-colindex='6']");
        this.extendedPriceColumn = page.locator("tbody [aria-colindex='9'] span");
        this.selectAllStandardItems = page.locator('#selectAllStandardItems');
        this.greenCheckedToaster = page.locator("xpath=//*[contains(@class, '-check-circle')]/following-sibling::span[contains(@class, '-toaster-message')]").first();
        this.greenCheckedToasterClose = page.locator("xpath=//*[contains(@class, '-check-circle')]/following-sibling::span[contains(@class, '-close')]").first();
    }

    async ciTypeSelect(ciName){
        this.ciType.click();
        this.cidropdownList.locator('ul li').filter({hasText: ciName}).first().click();
    }
}

module.exports = { ScopePage }