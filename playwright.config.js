const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests',
  timeout: 2100000,
    expect:{
        timeout: 2100000
    },
    /* Run tests in files in parallel */
    fullyParallel: false,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    reporter: [
        ['html', {
            open: 'never', 
            outputFolder: 'test-results/playwright-html-report'
        }],
        // ['junit', {
        //     embedAnnotationsAsProperties: true, 
        //     embedAttachmentsAsProperty: 'testrun_evidence', 
        //     outputFile: 'test-results/results.xml'
        // }],
        // ['line'],
        // ['json', {
        //     outputFile: 'test-results/results.json'
        // }]
    ],
    use: {
        name: 'Google Chrome',
        channel: 'chrome',
        headless: false,
        launchOptions: {
            args: [
                '--start-maximized',
                '--force-device-scale-factor=0.75'
              
            ]
        },
        viewport: null,
        screenshot: 'on',
        trace:'on',
        video: 'on',
        actionTimeout: 2100000,
        navigationTimeout: 2100000
    },
    /* Folder for test artifacts such as screenshots, videos, traces, etc. */
    outputDir: 'test-results/artifacts'
})