import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';

import { expect } from '@playwright/test';

import { pageFixture } from '../../hooks/pageFixture';

setDefaultTimeout(60 * 1000 * 2);

Given('user search for a {string}', async function (book) {
    await pageFixture.page.locator("input[type='search']").type(book);
    await pageFixture.page.locator("(//mat-option[contains(@class,'mat-mdc-option mdc-list-item')]//span)[1]").click();
});

When('user add the book to the cart', async function () {
    await pageFixture.page.locator("(//button[contains(@class,'mdc-button mdc-button--raised')]//span)[3]").click();
    await pageFixture.page.waitForTimeout(1000);
});

Then('the cart badge should get updated', async function () {
    const badgeCount = await pageFixture.page.locator("#mat-badge-content-0").textContent();
    console.log("Badge Count: " + badgeCount);
    expect(Number(badgeCount)).toBeGreaterThan(0);
});