// src/pages/login/paylocity-login.page.ts
import { Page, type Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { baseUrl } from '../../config/prod.env';

export default class PaylocityLoginPage extends BasePage {

    // Header / branding
    readonly appBrandLink: Locator;
    readonly paylocityLogo: Locator;

    // Form controls
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        super(page);
        this.appBrandLink = this.page.getByRole('link', { name: 'Paylocity Benefits Dashboard' });
        this.paylocityLogo = this.page.getByRole('img', { name: 'Paylocity' });

        // Form fields (label-associated controls)
        this.usernameInput = this.page.getByLabel('Username');
        this.passwordInput = this.page.getByLabel('Password');

        // Submit button by role & name
        this.loginButton = this.page.getByRole('button', { name: 'Log In' });
    }

    //Reusable Login method
    async login(username: string, password: string) {
        await this.page.goto(baseUrl);
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
      }
}