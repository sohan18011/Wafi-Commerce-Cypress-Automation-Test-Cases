import LoginPage from '../../support/Page_Objects/LoginPage';
import EmployeePage from '../../support/Page_Objects/EmployeePage';

describe('Create New Employee', () => {
    const loginPage = new LoginPage();
    const employeePage = new EmployeePage();

    beforeEach(() => {
        // Load tenant credentials from the fixture file and log in
        cy.fixture('lastTenant.json').then((tenantData) => {
            cy.login(tenantData.tenantName, tenantData.username, tenantData.password);
        });
    });


    it('should create a new employee', () => {
        employeePage.navigateToEmployeesPage();

        // Wait for the "New Employee" button to be visible and then click
        employeePage.clickNewEmployeeButton();

        // Generate unique username and email
        const uniqueId = Date.now();
        const uniqueUsername = `user${uniqueId}`;
        const uniqueEmail = `user${uniqueId}@example.com`;

        employeePage.enterName('Sohan Mahmud');
        employeePage.enterUserName(uniqueUsername);
        employeePage.enterEmail(uniqueEmail);
        employeePage.enterPassword('1q2w3E*'); // Replace with actual password
        employeePage.enterDesignation('QA Engineer');
        employeePage.enterPhone('015xxxxxxxx');
        employeePage.enterAddress('Dhaka, Bangladesh');
        employeePage.enterComment('New employee added for testing purposes.');

        // Save the employee and verify the creation
        employeePage.saveEmployee();
        employeePage.verifyEmployeeCreated('Sohan Mahmud');
    });
});
