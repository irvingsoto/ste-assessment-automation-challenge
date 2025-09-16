import { expect, type Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Page Object: Benefits Dashboard (Employees table)
 */
export default class BenefitsPage extends BasePage {
    readonly logOutLink: Locator;

    // ── Employees table ──────────────────────────────────────────────────────────
    readonly employeesTable: Locator;
    readonly tableBody: Locator;
    readonly addEmployeeBtn: Locator;
    readonly deleteEmployeeBtn: Locator;
    readonly updateEmployeeBtn: Locator;

    // ── Employee modal (Add / Update) ────────────────────────────────────────────
    readonly employeeDialog: Locator;

    // Form fields (use label-first strategy)
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly dependentsInput: Locator;

    // Action buttons inside employee modal
    readonly addBtnInDialog: Locator;
    readonly updateBtnInDialog: Locator;

    // ── Delete modal ─────────────────────────────────────────────────────────────
    readonly deleteDialog: Locator;
    readonly confirmDeleteBtn: Locator;

    constructor(page: Page) {
        super(page);

        // Header
        this.logOutLink = this.page.getByText('Log Out');

        // Table
        this.employeesTable = this.page.locator('#employeesTable');
        this.tableBody = this.employeesTable.locator('tbody');
        this.deleteEmployeeBtn = this.page.locator('.fa-times').first();
        this.updateEmployeeBtn = this.page.locator('.fa-edit').first();        
        this.addEmployeeBtn = this.page.getByRole('button', { name: 'Add Employee' }).or(this.page.locator('#add'));

        // Employee modal
        this.employeeDialog = this.page.locator('#employeeModal');

        // Form fields (prefer getByLabel → these labels exist in markup)
        this.firstNameInput = this.employeeDialog.getByLabel('First Name:');
        this.lastNameInput = this.employeeDialog.getByLabel('Last Name:');
        this.dependentsInput = this.employeeDialog.getByLabel('Dependents:');

        // Modal action buttons
        this.addBtnInDialog = this.employeeDialog.getByRole('button', { name: /^Add$/ }).or(this.employeeDialog.locator('#addEmployee'));
        this.updateBtnInDialog = this.employeeDialog.locator('#updateEmployee');

        // Delete modal
        this.deleteDialog = this.page.locator('#deleteModal');
        this.confirmDeleteBtn = this.deleteDialog.getByRole('button', { name: /^Delete$/ }).or(this.deleteDialog.locator('#deleteEmployee'));
    }

    async assertBenefitsPageLoaded() {
        await expect(this.employeesTable).toBeVisible();
        await this.waitForEmployeesTable();
    }

    /**
  * Wait until the employees table is loaded
  */
    async waitForEmployeesTable(): Promise<void> {
        await expect(
            this.tableBody.locator('tr').first()).toBeVisible({ timeout: 50000 });
    }
}