'use strict';

class PropertiesPage {
    /**
     * @param {import('@playwright/test').Page} page 
     * @param {import('@playwright/test').TestInfo} testInfo 
     */
    constructor(page, testInfo){
        this.page = page
        this.testInfo = testInfo;
        this.toaster = page.locator("span[class*='toaster-message']").first();
        this.toasterClose = page.locator('kendo-notification span.k-i-close').first();
        this.pulsingWait = page.locator('.k-loader-canvas');
        this.phoneIcon = page.locator('i.fa-phone');
        this.wpHeader = page.locator('tsmt-work-package-header');
        this.propertiesMenu = page.locator('tsmt-work-package-header a.nav-link span').first();
        this.plcBadge = page.getByTitle('Project Level');
        this.navigation = page.locator('div.t-nav-items  .t-nav-link');
        
        // General Section
        this.projectManager = page.locator("kendo-combobox[formcontrolname='projectManager'] input");
        this.jobName = page.locator('.general-properties kendo-autocomplete input');
        this.wpName = page.locator('#workPackage');
        this.bidName = page.locator('select#bid');
        this.siteName = page.locator('select#siteName');
        this.company = page.locator('select#company');
        this.salesEngineer = page.locator('select#salesEngineer');
        this.partsCenter = page.locator('select#partsCenter');
        this.salesOffice = page.locator('select#salesOffice');
        this.estimator = page.locator('select#estimator');
        this.editorDate = page.locator('#editorDate');
        this.officePreference = page.locator('select#officePreference');
        this.bidDate = page.locator("[formcontrolname='bidDate'] input");
        this.startDate = page.locator("kendo-datepicker[formcontrolname='startDate'] input");
        this.lengthYears = page.locator("[formcontrolname='years'] input");
        this.lengthMonths = page.locator("[formcontrolname='months'] input");
        this.endDate = page.locator("kendo-dateinput.k-state-disabled input");

        this.dialogTitle = page.locator('kendo-dialog .k-dialog-title');
        this.dialogClose = page.locator('kendo-dialog span').first();
        this.dialogContent = page.locator('kendo-dialog span').nth(1);
        this.dialogYes = page.getByRole('button', {name: 'YES'});
        this.dialogNo = page.getByRole('button', {name: 'NO'});


        // Travel Section
        this.distanceToProject = page.locator("[formcontrolname='distanceToProject'] input");
        this.travelCharges = page.locator("[formcontrolname='travelRateCharge'] input");
        this.averageSpeedToJob = page.locator("[formcontrolname='averageSpeedToJob'] input");
        this.inServiceArea = page.locator("[formcontrolname='inServiceArea'] input");
        this.setupCleanHours = page.locator("[formcontrolname='setupCleanupHours'] input");
        this.siteAccessHours = page.locator("[formcontrolname='siteAccessHours'] input");
        this.totalIEHours = page.locator("[formcontrolname='totalIEHours'] input");
        this.dailyAppliedHours = page.locator("[formcontrolname='dailyAppliedHours'] input");
        this.addTravel = page.getByRole('button', {name: 'ADD'});
        this.addTravelHeaders = page.locator('tsmt-travel-cost-item a');
        this.addTravelItem = page.locator('kendo-grid#travelGridList td div').nth(1);
        this.addTravelItems = page.locator('kendo-grid#travelGridList td div');

        this.description = page.locator('input#description');
        this.noOfTrips = page.locator("kendo-numerictextbox[formcontrolname='noOfVehicleTrips'] input");
        this.roundTripDistance = page.locator("[formcontrolname='roundTripDistance'] input");
        this.tripRate = page.locator("[formcontrolname='tripRate'] input");
        this.vechicleMaintenanceCost = page.locator("[formcontrolname='vehicleMaintenanceCost'] input");
        
        this.perDiem = page.locator('input#perDiem');

        this.noOfPeople = page.locator("kendo-numerictextbox[formcontrolname='perDiemNoOfPeople'] input");
        this.noOfDays = page.locator("kendo-numerictextbox[formcontrolname='noOfDays'] input");
        this.dailyRate = page.locator("kendo-numerictextbox[formcontrolname='dailyRate'] input");
        this.perDiemCost = page.locator("[formcontrolname='perDiemCost'] input");

        this.travelFare = page.locator('input#travelFare');

        this.tfNoOfPeople = page.locator("kendo-numerictextbox[formcontrolname='travelFareNoOfPeople'] input");
        this.tfNoOfTrips = page.locator("kendo-numerictextbox[formcontrolname='travelFareNoOfTrips'] input");
        this.tfTripFareRate = page.locator("kendo-numerictextbox[formcontrolname='tripFareRate'] input");
        this.travelFareCost = page.locator("[formcontrolname='travelFareCost'] input");

        this.totalCost = page.locator("[formcontrolname='totalCost'] input");

        this.increaseMonth = page.getByTitle('Increase value').nth(1);
        this.addTravelDuplicate = page.getByTitle('Duplicate');
        this.addSave = page.locator('button#save');

        // Document Section
        this.documentUpload = page.locator("input[name='files']");
        this.uploadButton = page.locator('#upload');

        // Contigency Section
        this.overAll = page.getByLabel('Overall');
        this.costCategory = page.getByLabel('Cost Category');
        // this.overAll = page.locator("input#overall");
        // this.costCategory = page.locator('input#costCategory');

        this.overAllPercentage = page.locator("kendo-numerictextbox[formcontrolname='overallPercentage'] input");
        this.costCategoryInputs = page.locator("tsmt-contingency td[aria-colindex='2'] input");

        // Warranty Section
        this.warrantyYears = page.locator("kendo-numerictextbox[formcontrolname='warrantyYears'] input");
        this.laborOnTm = page.locator('#annualWarranty input');

        // Escalation Section
        this.annualEscalationRate = page.locator("[formcontrolname='annualEscalationRate'] input");
        this.escalationRate = page.locator('tsmt-escalation input').nth(2);

        // Notes Section
        this.materialEstimate = page.locator("[formcontrolname='materialTax'] input");
        this.taxTemplate = page.locator('#taxTemplate');

        // Notes Section
        this.scopeOfService = page.locator('tsmt-work-package-notes .t-nav-link').nth(0);
        this.dispatcherPmNotes = page.locator('tsmt-work-package-notes .t-nav-link').nth(1);
        this.technicianNotes = page.locator('tsmt-work-package-notes .t-nav-link').nth(2);
        this.scopeOfServiceNote = page.locator('tsmt-work-package-notes .t-tab-pane').first().locator('textarea');
        this.dispatchNote = page.locator('tsmt-work-package-notes .t-tab-pane').nth(1).locator('textarea');
        this.technicianNote = page.locator('tsmt-work-package-notes .t-tab-pane').last().locator('textarea');
    }
}

module.exports = { PropertiesPage };