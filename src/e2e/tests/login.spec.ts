import { test, expect } from '@playwright/test';
import PaylocityLoginPage from '../pages/login.page';
import BenefitsPage from '../pages/benefits.page';
import { userName, userPassword } from '../../config/prod.env';

test('Benefits Dashboard Login with valid credentials', async ({ page }) => {
    // Initialize page objects
    const loginPage = new PaylocityLoginPage(page);
    const benefitsPage = new BenefitsPage(page);
    // Navigate to login page fill form and click in login button
    await loginPage.login(userName, userPassword);
    // Assert login
    await benefitsPage.assertBenefitsPageLoaded();
});
