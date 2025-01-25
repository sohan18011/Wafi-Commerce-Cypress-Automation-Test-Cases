describe('Roles Page Test', () => {
    let tenantName;

    // Load the tenant name from the fixture file before tests
    before(() => {
        cy.fixture('lastTenant.json').then((tenantData) => {
            tenantName = tenantData.tenantName;
            expect(tenantName).to.not.be.undefined; // Ensure tenantName is defined
        });
    });

    // Ensure tenantName is defined before each test and perform login
    beforeEach(() => {
        cy.wrap(tenantName).should('not.be.undefined').then((name) => {
            cy.visit('/');
            cy.login(name, Cypress.env('LOGIN_USERNAME'), Cypress.env('ADMIN_PASSWORD'));

            // Navigate .lpx-nav-menu > :nth-child(9) > :nth-child(1) > .lpx-inner-menu > :nth-child(2) > lpx-sub-navbar > .lpx-menu-item-link > .lpx-menu-item-text').click(); // Sub-menu for Purchase List
            cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(10) > :nth-child(1) > :nth-child(1) > .lpx-menu-item-text').click();
            cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(10) > :nth-child(1) > :nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(1) > .lpx-menu-item-text').click();
            cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(10) > :nth-child(1) > :nth-child(2) > :nth-child(1) > :nth-child(1) > .lpx-inner-menu > :nth-child(1) > lpx-sub-navbar > .lpx-menu-item-link > .lpx-menu-item-text').click();

        
        });
    });


    it('should verify visibility of essential elements on the Roles page', () => {
        // Verify presence of Supplier page header
        cy.get('.entry-row > :nth-child(1)').contains('Roles').should('be.visible'); // Page header
        cy.get('.d-inline-flex').should('be.visible').click();
        // Verify input fields and search controls
        cy.get('#role-name').should('be.visible').type('abc');
        cy.get('#role-is-public').should('be.visible').click();
        cy.get('#role-is-default').should('be.visible').click();
        cy.get('.btn-secondary').should('be.visible').click();
        cy.get('#cancel').should('be.visible');
        cy.get('#confirm').should('be.visible').click();
        cy.get('.page-count').should('be.visible');
    });
});
