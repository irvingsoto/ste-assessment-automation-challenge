import { test, expect } from '@playwright/test';
import PaylocityLoginPage from '../pages/login.page';
import BenefitsPage from '../pages/benefits.page';
import { userName, userPassword } from '../../config/prod.env';
import { employeeFirstName } from '../../test-data/employees';
import EmployeeHelpers from './helpers/employee.helpers';


test.skip('Add Employee (0 dependents)', async ({ page }) => {
    // Initialize page objects
    const loginPage = new PaylocityLoginPage(page);
    const benefitsPage = new BenefitsPage(page);
    const employeeHelpers = new EmployeeHelpers(page);
    // 1) Login App
    await loginPage.login(userName, userPassword);
    await benefitsPage.assertBenefitsPageLoaded();
    // 2) Open "Add Employee" dialog
    await benefitsPage.addEmployeeBtn.click();
    // 3) Fill the form
    await benefitsPage.firstNameInput.fill(employeeFirstName);
    await benefitsPage.lastNameInput.fill(employeeFirstName);
    await benefitsPage.dependentsInput.fill('0');
    // 4) Submit
    await benefitsPage.addBtnInDialog.click();
    // 5) Assert Add Employee dialog is closed
    // Assert the new employee appears in the table
    benefitsPage.waitForEmployeesTable();
    await expect(benefitsPage.employeeDialog).toBeHidden();
    
    await expect(
        benefitsPage.tableBody.locator('tr', { hasText: employeeFirstName, })
    ).toBeVisible();

    //clean the eployee adition
    await employeeHelpers.deleteEmployee();

});
