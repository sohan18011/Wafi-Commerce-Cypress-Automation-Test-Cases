describe('Supplier Due Page Elements Test', () => {
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
            cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(6) > :nth-child(1) > :nth-child(1) > .lpx-menu-item-text').click(); // Main menu for Purchases
            cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(6) > :nth-child(1) > .lpx-inner-menu > :nth-child(3) > lpx-sub-navbar > .lpx-menu-item-link > .lpx-menu-item-text').click(); // Sub-menu for Purchase List
        });
    });
    it('should verify visibility of essential elements on the Supplier Due page', () => {
        // Verify presence of Supplier page header
        cy.get('.card-title').contains('Supplier Dues').should('be.visible'); // Page header

        // Verify input fields and search controls
    
        cy.get('.form-control').should('be.visible'); 
        cy.get('.page-count').should('be.visible'); 
        cy.get('.totalDue').should('be.visible'); 
        cy.get('[title="Code"]').should('be.visible'); 
        cy.get('[title="Name"]').should('be.visible'); 
        cy.get('[title="Account Name"]').should('be.visible'); 
        cy.get('.debit-amount-header').should('be.visible'); 



    });
});
