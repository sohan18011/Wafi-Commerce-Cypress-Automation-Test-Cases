describe('UOM Page Test', () => {
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

            // Navigate to the Purchase Page
            cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(8) > :nth-child(1) > :nth-child(1) > .lpx-menu-item-text').click(); // Main menu for Purchases
            cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(8) > :nth-child(1) > .lpx-inner-menu > :nth-child(1) > lpx-sub-navbar > .lpx-menu-item-link > .lpx-menu-item-text').click(); // Sub-menu for Purchase List
        });
    });
    it('should verify visibility of essential elements on the Unit of measurements page', () => {
        // Verify presence of Supplier page header
        cy.get('h3').contains('Unit of measurements').should('be.visible'); // Page header

        // Verify input fields and search controls

        cy.get('.page-count').should('be.visible'); 
    
        cy.get('#filter-button').should('be.visible').click(); 
        cy.get('#abp-modal-header > h3').contains('Create New Unit Of Measurement.').should('be.visible'); // Page header
        cy.get(':nth-child(1) > .form-control').should('be.visible'); 
        cy.get(':nth-child(2) > .form-control').should('be.visible'); 
        cy.get('.btn-secondary').should('be.visible').click(); 
       
        cy.get('h3').contains('Unit of measurements').should('be.visible'); // Page header

    });
});
