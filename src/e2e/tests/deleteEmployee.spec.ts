import { test, expect } from '@playwright/test';
import PaylocityLoginPage from '../pages/login.page';
import BenefitsPage from '../pages/benefits.page';
import { userName, userPassword } from '../../config/prod.env';
import EmployeeHelpers from './helpers/employee.helpers';
import { employeeFirstName, employeeLastName } from '../../test-data/employees';


test('Delete Employee', async ({ page }) => {
    // Initialize page objects
    const loginPage = new PaylocityLoginPage(page);
    const benefitsPage = new BenefitsPage(page);

    const employeeHelpers = new EmployeeHelpers(page);

    // 1) Login App
    await loginPage.login(userName, userPassword);
    await benefitsPage.assertBenefitsPageLoaded();

    //Make sure thre is at least one employee in table
    await employeeHelpers.addEmployee(employeeFirstName, employeeLastName, "0");

    // 2) click delete employee icon
    await benefitsPage.deleteEmployeeBtn.click();
    
    // 3) confirm delete in dialog
    await benefitsPage.confirmDeleteBtn.click();

    // Assert employee row is gone
    await expect(
        benefitsPage.tableBody.getByText(employeeFirstName )
    ).toHaveCount(0);

});
