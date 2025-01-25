
import LoginPage from '../../support/Page_Objects/LoginPage';
import TenantManagementPage from '../../support/Page_Objects/TenantManagementPage';



const loginPage = new LoginPage();
const tenantManagementPage = new TenantManagementPage();

describe('Create New Tenant', () => {
    const tenantName = 'testing tenant';
    const adminEmail = Cypress.env('ADMIN_EMAIL') || 'defaultadmin@example.com';
    const adminPassword = Cypress.env('ADMIN_PASSWORD') || '1q2w3E*';
    const username = 'admin';
    const password = '1q2w3E*';

    before(() => {
        cy.log('Visiting the login page');
        loginPage.visit();

        cy.log('Clicking the login button');
        loginPage.clickLoginButton();

        cy.log('Selecting tenant');
        loginPage.selectTenant(' ');

        cy.log('Entering username');
        loginPage.enterUsername(Cypress.env('LOGIN_USERNAME') || username);

        cy.log('Entering password');
        loginPage.enterPassword(Cypress.env('LOGIN_PASSWORD') || password);

        cy.log('Submitting login form');
        loginPage.submit();
    });

    it('should create a new tenant successfully', () => {
        cy.log('Visiting the Tenant Management page');

        cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(10) > :nth-child(1) > :nth-child(1) > .lpx-menu-item-text').click();
        cy.wait(2000);
        cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(10) > :nth-child(1) > :nth-child(2) > :nth-child(2) > :nth-child(1) > :nth-child(1) > .lpx-menu-item-text').click();
        cy.wait(2000);
        cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(10) > :nth-child(1) > :nth-child(2) > :nth-child(2) > :nth-child(1) > .lpx-inner-menu > .lpx-inner-menu-item > lpx-sub-navbar > .lpx-menu-item-link > .lpx-menu-item-text').click();
        cy.wait(2000);

        cy.log('Clicking the new tenant button');
        tenantManagementPage.clickNewTenantButton();

        cy.log(`Entering tenant name: ${tenantName}`);
        tenantManagementPage.enterTenantName(tenantName);

        cy.log(`Entering admin email: ${adminEmail}`);
        tenantManagementPage.enterAdminEmail(adminEmail);

        cy.log('Entering admin password');
        tenantManagementPage.enterAdminPassword(adminPassword);

        cy.log('Submitting new tenant form');
        tenantManagementPage.submit();

        cy.log(`Verifying tenant creation for: ${tenantName}`);
        tenantManagementPage.verifyTenantCreation(tenantName);

        // Save tenant details for later use
        cy.writeFile('cypress/fixtures/lastTenant.json', {
            tenantName,
            username,
            password
        });
        cy.get('.user-full-name').click();
        cy.wait(2000);
        cy.get('lpx-user-profile > .dropdown > .dropdown-menu > :nth-child(2)').click();
        cy.wait(2000);
    });
});

// Additional test suite to use the created tenant

describe('Use Created Tenant', () => {
    beforeEach(() => {
        // Read the tenant details from the fixture file
        cy.readFile('cypress/fixtures/lastTenant.json').then((data) => {
            // Use the tenant details for login
            cy.log('Visiting the login page');
            loginPage.visit();

            cy.log('Clicking the login button');
            loginPage.clickLoginButton();

            cy.log('Selecting tenant');
            loginPage.selectTenant(data.tenantName);

            cy.log('Entering username');
            loginPage.enterUsername(data.username);

            cy.log('Entering password');
            loginPage.enterPassword(data.password);

            cy.log('Submitting login form');
            loginPage.submit();
        });
    });

    it('should access the dashboard after login', () => {
        cy.log('Visiting the dashboard page');
        cy.visit('/');
        // Add assertions or further steps as needed
    });

    // Additional tests using the created tenant
    it('should perform additional actions as needed', () => {
        // Implement other test cases here
    });
});
