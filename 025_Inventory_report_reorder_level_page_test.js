describe('Reorder Level Page Elements Test', () => {
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

            // Navigate to the Reorder Level Page
            cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(4) > :nth-child(1) > :nth-child(1) > .lpx-menu-item-text').click(); // Main menu
            cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(4) > :nth-child(1) > :nth-child(2) > :nth-child(8) > :nth-child(1) > :nth-child(1) > .lpx-menu-item-text').click(); // Navigate to Report Stock
            cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(4) > :nth-child(1) > :nth-child(2) > :nth-child(8) > :nth-child(1) > .lpx-inner-menu > :nth-child(3) > lpx-sub-navbar > .lpx-menu-item-link > .lpx-menu-item-text').click();
        });
    });

    it('should verify visibility of essential elements on the Reorder Level page', () => {
        // Verify presence of Reorder Level header
        cy.get('.card-title').contains('Re-order Level Report').should('be.visible'); // Page header

        // Verify input fields for reorder level
        cy.get('[title="Product Code"]').should('be.visible'); // Product Name input
        cy.get('[title="Current Quantity"]').should('be.visible'); // Reorder Level input
        cy.get('[title="Reorder Level"]').should('be.visible'); // Current Stock input
        cy.get('[title="Shortage"]').should('be.visible'); // Reorder Quantity input

    
        cy.get('.page-count').should('be.visible'); // Reorder Quantity input
    });
});
