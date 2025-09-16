import { test, expect } from '@playwright/test';
import PaylocityLoginPage from '../pages/login.page';
import BenefitsPage from '../pages/benefits.page';
import { userName, userPassword } from '../../config/prod.env';
import EmployeeHelpers from './helpers/employee.helpers';
import { employeeFirstName, employeeLastName } from '../../test-data/employees';


test('Update Employee', async ({ page }) => {
    // Initialize page objects
    const loginPage = new PaylocityLoginPage(page);
    const benefitsPage = new BenefitsPage(page);

    const employeeHelpers = new EmployeeHelpers(page);

    // 1) Login App
    await loginPage.login(userName, userPassword);
    await benefitsPage.assertBenefitsPageLoaded();

    //Make sure thre is at least one employee in table
    await employeeHelpers.addEmployee(employeeFirstName, employeeLastName, "0");

    // 2) click update employee icon
    await benefitsPage.updateEmployeeBtn.click();

    // 3) Fill the fields and click in update button
    await benefitsPage.firstNameInput.fill(employeeFirstName);
    await benefitsPage.lastNameInput.fill(employeeLastName);
    await benefitsPage.dependentsInput.fill("32");
    await benefitsPage.updateBtnInDialog.click();


    // 4) Assert all fields are updated
    benefitsPage.waitForEmployeesTable();
    await expect(
        benefitsPage.tableBody.locator('tr', { hasText: employeeFirstName, })
    ).toBeVisible();

    await expect(
        benefitsPage.tableBody.locator('tr', { hasText: employeeLastName, })
    ).toBeVisible();

    await expect(
        benefitsPage.tableBody.locator('tr', { hasText: "32", })
    ).toBeVisible();

    //clean the eployee adition
    await employeeHelpers.deleteEmployee();

});
