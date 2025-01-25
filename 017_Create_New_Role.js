// cypress/e2e/CreateNewRole.cy.js

import LoginPage from '../../support/Page_Objects/LoginPage';
import RolePage from '../../support/Page_Objects/RolePage';
import { generateUniqueRoleName } from '../../support/utils';

describe('Create New Role', () => {
    const loginPage = new LoginPage();
    const rolePage = new RolePage();

    before(() => {
        // Load tenant credentials from the fixture file and log in
        cy.fixture('lastTenant.json').then((tenantData) => {
            cy.login(tenantData.tenantName, tenantData.username, tenantData.password);
        });
    });

    it('should create a new role with a unique name', () => {
        rolePage.navigateToRolesPage();

        // Generate a unique role name
        const uniqueRoleName = generateUniqueRoleName();

        // Wait for the "New Role" button to be visible and then click
        cy.get('.lpx-content > abp-router-outlet > abp-replaceable-route-container > abp-roles > abp-page > .entry-row > .col > abp-page-toolbar > #AbpContentToolbar > .col-auto > .d-inline-flex')
            .should('be.visible')
            .click();

        rolePage.enterRoleName(uniqueRoleName);

        // Save the role and verify the creation
        rolePage.saveRole();
        rolePage.verifyRoleCreated(uniqueRoleName);
    });
});
