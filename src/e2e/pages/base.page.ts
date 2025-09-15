import { Page } from '@playwright/test';

/**
 * BasePage is an abstract class that encapsulates
 * common functionality and helpers shared across all page objects.
 *
 * Usage:
 * - Extend this class when creating a new Page Object (e.g., LoginPage).
 * - Provides access to Playwright's Page instance. 
 */

export abstract class BasePage {
    /** Reference to Playwright Page instance */
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Navigate to a given path relative to the configured baseURL.
     * @param path
     * @example
     * await this.goto('/Benefits');
     */
    async goto(path: string): Promise<void> {
        await this.page.goto(path);
    }
}