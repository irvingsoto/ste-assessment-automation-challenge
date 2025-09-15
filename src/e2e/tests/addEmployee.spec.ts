// tests/paylocity-login.spec.ts
import { test, expect } from '@playwright/test';
import PaylocityLoginPage from '../pages/login.page';
import BenefitsPage from '../pages/benefits.page';

test('Benefits Dashboard Login with valid credentials', async ({ page }) => {
    // Initialize page object
    const loginPage = new PaylocityLoginPage(page);
    const benefitsPage = new BenefitsPage(page);

    // Step 1: Navigate to login URL
    await loginPage.goto('https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Account/Login');

    // Step 2: Fill username and password
    await loginPage.usernameInput.fill('TestUser801');
    await loginPage.passwordInput.fill('9}U53e)=3}V;');

    // Step 3: Click login button
    await loginPage.loginButton.click();

    // Assert Benefits page is loaded
    await expect(benefitsPage.logOutLink).toBeVisible();
    await expect(benefitsPage.employeesTable).toBeVisible();

});
