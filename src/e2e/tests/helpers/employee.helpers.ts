import { expect, Page } from '@playwright/test';
import BenefitsPage from '../../pages/benefits.page';

export default class EmployeeHelpers {
  private benefitsPage: BenefitsPage;

  constructor(page: Page) {
    this.benefitsPage = new BenefitsPage(page);
  }

  /**
   * Add a new employee.
   * @param firstName - Employee first name
   * @param lastName - Employee last name
   * @param dependents - Number of dependents
   */
  async addEmployee(firstName: string, lastName: string, dependents: string) {
    await this.benefitsPage.addEmployeeBtn.click();
    await expect(this.benefitsPage.employeeDialog).toBeVisible();
    await this.benefitsPage.firstNameInput.fill(firstName);
    await this.benefitsPage.lastNameInput.fill(lastName);
    await this.benefitsPage.dependentsInput.fill(dependents);
    await this.benefitsPage.addBtnInDialog.click();
    await expect(this.benefitsPage.employeeDialog).toBeHidden();
    // Wait for table refresh
    await this.benefitsPage.waitForEmployeesTable();
  }

  /**
   * Delete the first employee in the table.
   * Assumes that at least one employee exists.
   */
  async deleteEmployee() {
    await this.benefitsPage.waitForEmployeesTable();
    await this.benefitsPage.deleteEmployeeBtn.first().click();
    await expect(this.benefitsPage.deleteDialog).toBeVisible();
    await this.benefitsPage.confirmDeleteBtn.click();
    await expect(this.benefitsPage.deleteDialog).toBeHidden();
  }
}