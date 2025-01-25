describe('Sales Report Page Elements Test', () => {
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

            // Navigate to the Sales Report Page
            cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(5) > :nth-child(1) > :nth-child(1) > .lpx-menu-item-text').click(); // Main menu
            cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(5) > :nth-child(1) > :nth-child(2) > :nth-child(6) > :nth-child(1) > :nth-child(1) > .lpx-menu-item-text').click(); // Navigate to Sales Report
            cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(5) > :nth-child(1) > :nth-child(2) > :nth-child(6) > :nth-child(1) > .lpx-inner-menu > :nth-child(2) > lpx-sub-navbar > .lpx-menu-item-link > .lpx-menu-item-text').click();
        });
    });

    it('should verify visibility of essential elements on the Sales Report page', () => {
        // Verify presence of Sales Report header
        cy.get('.card-title').contains('Royalty Details').should('be.visible'); // Page header
        cy.get(':nth-child(1) > .form-control').should('be.visible'); 
        cy.get(':nth-child(2) > .form-control').should('be.visible'); 
        cy.get(':nth-child(3) > .ng-select-searchable > .ng-select-container').should('be.visible'); 
        cy.get('.ng-select-multiple > .ng-select-container').should('be.visible'); 
        cy.get('#filter-button').should('be.visible').click(); 
        cy.get('.page-count').should('be.visible'); 
        cy.get('[title="Date & Time"]').should('be.visible'); 
        cy.get('[title="Product Name"]').should('be.visible'); 
        cy.get('[title="Reference"]').should('be.visible'); 
        cy.get('[title="MRP"]').should('be.visible'); 
        cy.get('[title="Sales Amount"]').should('be.visible'); 
        cy.get('[title="Royalty Percentage"]').should('be.visible'); 
        cy.get('[title="Royalty Amount"]').should('be.visible'); 

       
    });
});

