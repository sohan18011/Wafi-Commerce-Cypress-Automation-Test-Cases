describe('Product Sub Groups Page Elements Test', () => {
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
            cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(4) > :nth-child(1) > :nth-child(1) > .lpx-menu-item-text').click(); // Navigate to Product Groups
            cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(4) > :nth-child(1) > :nth-child(2) > :nth-child(4) > lpx-sub-navbar > .lpx-menu-item-link > .lpx-menu-item-text').click(); // Navigate to Product Sub Groups
        });
    });

    it('should verify visibility of essential elements on the Product Sub Groups page', () => {
        // Verify the page title
        cy.get('.card-title').contains('Product Sub Groups').should('be.visible');

        // Verify visibility of action buttons and table headers
        cy.get('.form-control').should('be.visible'); // Search input
        cy.get('.page-count').invoke('text').should('not.be.empty'); // Page count
        cy.get('#create').should('be.visible').click(); // Click on create button

        // Verify visibility of form controls for Product Sub Group creation
        cy.get('#ProductGroupDropdown').should('be.visible'); // Product Group selection
        cy.get(':nth-child(2) > #productSubGroup-name').should('be.visible'); // Product Sub Group Code
        cy.get(':nth-child(3) > #productSubGroup-name').should('be.visible'); // Product Sub Group Name
        cy.get('#productSubGroup-description').should('be.visible'); // Product Sub Group Description

        // Verify the visibility of the secondary button
        cy.get('.btn-secondary').should('be.visible').click(); 
        cy.get('.card-title').contains('Product Sub Groups').should('be.visible');
        // Secondary button
    });
});
