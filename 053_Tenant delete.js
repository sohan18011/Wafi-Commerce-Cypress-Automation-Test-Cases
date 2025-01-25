
import LoginPage from '../../support/Page_Objects/LoginPage';
import TenantManagementPage from '../../support/Page_Objects/TenantManagementPage';



const loginPage = new LoginPage();
const tenantManagementPage = new TenantManagementPage();

describe('Delete the Tenant', () => {
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

    it('should Delete new tenant successfully', () => {
        cy.log('Visiting the Tenant Management page');

        cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(10) > :nth-child(1) > :nth-child(1) > .lpx-menu-item-text').click();
        cy.wait(2000);
        cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(10) > :nth-child(1) > :nth-child(2) > :nth-child(2) > :nth-child(1) > :nth-child(1) > .lpx-menu-item-text').click();
        cy.wait(2000);
        cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(10) > :nth-child(1) > :nth-child(2) > :nth-child(2) > :nth-child(1) > .lpx-inner-menu > .lpx-inner-menu-item > lpx-sub-navbar > .lpx-menu-item-link > .lpx-menu-item-text').click();
        cy.wait(2000);



        cy.log(`Entering tenant name: ${tenantName}`);
        cy.get('.form-control').type(tenantName);
        cy.wait(2000);
        cy.get('.d-inline-block > .dropdown-toggle').click();

        cy.wait(2000);
        cy.get(':nth-child(3) > .abp-ellipsis').click();
        cy.wait(2000);
        cy.get('#confirm').click();
        cy.wait(2000);
    });
});


