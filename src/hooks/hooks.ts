import {Before, After, BeforeAll, AfterAll, Status} from '@cucumber/cucumber';

import { chromium,Browser,BrowserContext, Page } from '@playwright/test';

import { pageFixture } from './pageFixture';


let browser: Browser;   
let context : BrowserContext;

BeforeAll(async function () {
    browser = await chromium.launch({headless:false});
}),

Before(async function () {
    
    context = await browser.newContext();
    const page = await context.newPage();
    pageFixture.page = page;
});

After(async function ( {pickle, result}) {
    //screenShot
    if (result?.status === Status.FAILED) {
        const img = await pageFixture.page.screenshot({path: `./test-result/screenshots/${pickle.name}.png`});
        await this.attach(img, 'image/png'); 
    }
    await pageFixture.page.close(); 
    await context.close()
});

AfterAll(async function () {
    await browser.close();
}); 