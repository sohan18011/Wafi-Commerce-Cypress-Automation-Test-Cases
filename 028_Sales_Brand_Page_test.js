describe('Brand Page Elements Test', () => {
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

            // Navigate to the Brand Page
            cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(5) > :nth-child(1) > :nth-child(1) > .lpx-menu-item-text').click(); // Main menu
            cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(5) > :nth-child(1) > :nth-child(2) > :nth-child(2) > lpx-sub-navbar > .lpx-menu-item-link > .lpx-menu-item-text').click(); // Navigate to Brand
        });
    });

    it('should verify visibility of essential elements on the Brand page', () => {
        // Verify presence of Brand header
        cy.get('.card-title').contains('Brands').should('be.visible'); // Page header

        // Verify table presence and structure
        cy.get('.form-control').should('be.visible'); // Brand table
        cy.get('.page-count').should('be.visible');
        cy.get('#create').should('be.visible').click(); // Table header
        cy.get('#brand-name').should('be.visible');
        cy.get('#brand-country').should('be.visible');
        cy.get('#brand-logo-url').should('be.visible');
        cy.get('#brand-remarks').should('be.visible');
        cy.get('#brand-description').should('be.visible');
        cy.get('.btn-secondary').should('be.visible').click();
        cy.get('.card-title').contains('Brands').should('be.visible'); // Page header


    });
});
