describe('Project to Project Transfer Page Elements Test', () => {
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
            cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(4) > :nth-child(1) > :nth-child(1) > .lpx-menu-item-text').click(); // Navigate to Project Transfers
            cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(4) > :nth-child(1) > :nth-child(2) > :nth-child(3) > lpx-sub-navbar > .lpx-menu-item-link > .lpx-menu-item-text').click(); // Navigate to Sub-menu
        });
    });

    it('should verify visibility of essential elements on the P-P Transfer page', () => {
        // Verify the page title
        cy.get('.card-title').contains('Product Groups').should('be.visible');

        // Verify visibility of action button and other essential elements
        cy.get('[title="Actions"]').should('be.visible');
        cy.get('[title="Product Group Name"]').should('be.visible');
        cy.get('[title="Product Group Description"]').should('be.visible');
        cy.get('.page-count').invoke('text').should('not.be.empty'); // Ensure page count text is not empty

        // Click the create button and verify the visibility of the form fields
        cy.get('#create').should('be.visible').click();

        // Verify visibility of form controls for Product Group Code, Name, and Description
        cy.get(':nth-child(1) > #productGroup-name').should('be.visible'); // Product Group Code
        cy.get(':nth-child(2) > #productGroup-name').should('be.visible'); // Product Group Name
        cy.get('#productGroup-description').should('be.visible'); // Product Group Description
        cy.get('.btn-secondary').click();
        // Verify the visibility of the search input for Product Groups
        cy.get('.form-control').should('be.visible'); // Search input for Product Groups

        // Verify navigation link to Product Groups
        cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(4) > :nth-child(1) > :nth-child(2) > :nth-child(3) > lpx-sub-navbar > .lpx-menu-item-link > .lpx-menu-item-text')
          .should('be.visible'); // Navigation link to Product Groups
    });
});
