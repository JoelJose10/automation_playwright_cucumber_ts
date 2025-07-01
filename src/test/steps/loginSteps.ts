import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';

import { expect } from '@playwright/test';

import { pageFixture } from '../../hooks/pageFixture';

setDefaultTimeout(60 * 1000 * 2);

Given('User navigates to the application', async function () {
    await pageFixture.page.goto('https://bookcart.azurewebsites.net/');
});


Given('User click on the login link', async function () {
    await pageFixture.page.locator("//span[normalize-space(text())='Login']").click();
});

Given('User enter the username as {string}', async function (username) {
    await pageFixture.page.locator("input[formcontrolname='username']").type(username);
});


Given('User enter the password as {string}', async function (password) {
    await pageFixture.page.locator("input[formcontrolname='password']").type(password);
});


When('User click on the login button', async function () {
    await pageFixture.page.locator("//span[text()='Login']").click();
});


Then('Login should be success', async function () {
    const text = await pageFixture.page.locator("(//a[contains(@class,'mat-mdc-menu-trigger mdc-button')]//span)[2]").textContent();
    console.log("Username " + text);
});

When('Login should fail', async function () {
    const failureMesssage = pageFixture.page.locator("mat-error[role='alert']");
    await expect(failureMesssage).not.toBeVisible();
    console.log("Login failed as expected");
});
