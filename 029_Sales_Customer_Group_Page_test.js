describe('Customer Group Page Elements Test', () => {
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

            // Navigate to the Customer Group Page
            cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(5) > :nth-child(1) > :nth-child(1) > .lpx-menu-item-text').click(); // Main menu
            cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(5) > :nth-child(1) > :nth-child(2) > :nth-child(4) > lpx-sub-navbar > .lpx-menu-item-link > .lpx-menu-item-text').click(); // Navigate to Customer Group
        });
    });

    it('should verify visibility of essential elements on the Customer Group page', () => {
        // Verify presence of Customer Group header
        cy.get('.card-title').contains('Customer Groups').should('be.visible'); // Page header

        // Verify table presence and structure
        cy.get('.form-control').should('be.visible'); // Customer Group table
        cy.get('.page-count').should('be.visible'); // Table header
        cy.get('#create').should('be.visible').click(); // Table body
        cy.get('#customer-code').should('be.visible');
        cy.get('#customer-name').should('be.visible');
        cy.get('.btn-secondary').click();
        cy.get('.card-title').contains('Customer Groups').should('be.visible'); // Page header
        // Verify input fields for customer group entry
        
    });
});
