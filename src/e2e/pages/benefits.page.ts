import { expect, type Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Page Object: Paylocity Benefits Dashboard (Employees table)
 */
export default class BenefitsPage extends BasePage {
    readonly logOutLink: Locator;       // "Log Out" link in header

    // ── Employees table ──────────────────────────────────────────────────────────
    readonly employeesTable: Locator;   // main grid
    readonly tableBody: Locator;        // <tbody> inside the grid
    readonly noEmployeesCell: Locator;  // "No employees found." cell (empty state)
    readonly addEmployeeToolbarBtn: Locator;  // "Add Employee" toolbar button

    // ── Employee modal (Add / Update) ────────────────────────────────────────────
    readonly employeeDialog: Locator;      // dialog container
    readonly employeeDialogTitle: Locator; // "Add Employee" or "Delete Employee" etc.

    // Form fields (use label-first strategy)
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly dependentsInput: Locator;

    // Action buttons inside employee modal (role-first; ids used as a stable fallback)
    readonly addBtnInDialog: Locator;      // "Add"
    readonly updateBtnInDialog: Locator;   // "Update"
    readonly cancelBtnInDialog: Locator;   // "Cancel"

    // ── Delete modal ─────────────────────────────────────────────────────────────
    readonly deleteDialog: Locator;
    readonly deleteDialogTitle: Locator;    // "Delete Employee"
    readonly confirmDeleteBtn: Locator;     // "Delete"
    readonly cancelDeleteBtn: Locator;      // "Cancel"

    constructor(page: Page) {
        super(page);

        // Header
        this.logOutLink = this.page.getByRole('link', { name: 'Log Out' });

        // Table
        this.employeesTable = this.page.getByRole('table', { name: /employees/i }).or(this.page.locator('#employeesTable'));
        this.tableBody = this.employeesTable.locator('tbody');
        this.noEmployeesCell = this.tableBody.getByText('No employees found.', { exact: true });

        // Toolbar
        this.addEmployeeToolbarBtn = this.page.getByRole('button', { name: 'Add Employee' }).or(this.page.locator('#add'));

        // Employee modal
        this.employeeDialog = this.page.getByRole('dialog').filter({ has: this.page.getByRole('heading', { name: /Add Employee|Update Employee/i }) })
            .or(this.page.locator('#employeeModal'));
        this.employeeDialogTitle = this.employeeDialog.getByRole('heading');

        // Form fields (prefer getByLabel → these labels exist in markup)
        this.firstNameInput = this.employeeDialog.getByLabel('First Name:');
        this.lastNameInput = this.employeeDialog.getByLabel('Last Name:');
        this.dependentsInput = this.employeeDialog.getByLabel('Dependents:');

        // Modal action buttons (role-first; ids as stable fallback)
        this.addBtnInDialog = this.employeeDialog.getByRole('button', { name: /^Add$/ }).or(this.employeeDialog.locator('#addEmployee'));
        this.updateBtnInDialog = this.employeeDialog.getByRole('button', { name: /^Update$/ }).or(this.employeeDialog.locator('#updateEmployee'));
        this.cancelBtnInDialog = this.employeeDialog.getByRole('button', { name: /^Cancel$/ });

        // Delete modal
        this.deleteDialog = this.page.getByRole('dialog').filter({ has: this.page.getByRole('heading', { name: 'Delete Employee' }) })
            .or(this.page.locator('#deleteModal'));
        this.deleteDialogTitle = this.deleteDialog.getByRole('heading', { name: 'Delete Employee' });
        this.confirmDeleteBtn = this.deleteDialog.getByRole('button', { name: /^Delete$/ }).or(this.deleteDialog.locator('#deleteEmployee'));
        this.cancelDeleteBtn = this.deleteDialog.getByRole('button', { name: /^Cancel$/ });
    }

    async assertBenefitsPageLoaded() {
        await expect(this.logOutLink).toBeVisible();
        await expect(this.employeesTable).toBeVisible();
    }

}