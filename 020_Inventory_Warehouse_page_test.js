describe('Warehouse Page Elements Test', () => {
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
            cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(4) > :nth-child(1) > :nth-child(1) > .lpx-menu-item-text').click(); // Navigate to Warehouses
            cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(4) > :nth-child(1) > :nth-child(2) > :nth-child(6) > lpx-sub-navbar > .lpx-menu-item-link > .lpx-menu-item-text').click();
        });
    });

    it('should verify visibility of essential elements on the Warehouse Page', () => {
        // Verify visibility of various elements on the Warehouse Page
        cy.get('h3').should('be.visible'); // Header
        cy.get('.card-title').contains('Warehouses').should('be.visible'); // Warehouse Title
        cy.get('.form-control').should('be.visible'); // Search input for Warehouses
        cy.get('.page-count').should('be.visible'); // Page Count
        cy.get('#create').should('be.visible').click(); // Create Warehouse Button
        cy.get('#abp-modal-header').contains('Create Warehouse').should('be.visible');
        cy.get('#warehouse-name').should('be.visible'); // Warehouse Name
        cy.get('#warehouse-address').should('be.visible'); // Warehouse Location
        cy.get('#warehouse-comment').should('be.visible'); // Warehouse Code

        cy.get('.btn-secondary').should('be.visible').click(); // Specific Warehouse Field
        cy.get('[title="Actions"]').should('be.visible'); 
        cy.get('[title="Warehouse Name"]').should('be.visible'); 
        cy.get('[title="Warehouse Address"]').should('be.visible'); 
        cy.get('[title="Description"]').should('be.visible'); 
    });
});
