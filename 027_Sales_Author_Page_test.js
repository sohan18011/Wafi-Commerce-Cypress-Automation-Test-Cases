describe('Sales Author Page Elements Test', () => {
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

            // Navigate to the Sales Author Page
            cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(5) > :nth-child(1) > :nth-child(1) > .lpx-menu-item-text').click(); // Main menu
            cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(5) > :nth-child(1) > :nth-child(2) > :nth-child(5) > lpx-sub-navbar > .lpx-menu-item-link > .lpx-menu-item-text').click(); // Navigate to Sales Author
        });
    });

    it('should verify visibility of essential elements on the Sales Author page', () => {
        // Verify presence of Sales Author header
        cy.get('.card-title').contains('Authors').should('be.visible'); // Page header

        // Verify table presence and structure
        // Replace with the actual selector for the Sales Author table
        cy.get('.form-control').should('be.visible'); // Table header
        cy.get('.page-count').should('be.visible');
        cy.get('[title="Actions"]').should('be.visible');// Table body
        cy.get('[title="Code"]').should('be.visible');
        cy.get('[title="Name"]').should('be.visible');
        cy.get('[title="Address"]').should('be.visible');
        cy.get('[title="Phone Number"]').should('be.visible');
        cy.get('[title="Email"]').should('be.visible');
        cy.get('[title="Account Name"]').should('be.visible');
        cy.get('[title="Bio"]').should('be.visible');
     
        // Verify input fields for sales entry
        cy.get('#create').should('be.visible').click();
     
        cy.get('h3').contains('New Author').should('be.visible');
        cy.get('#customer-code').should('be.visible');

        cy.get('#customer-code').should('be.visible'); // Author Name input
        cy.get('#customer-name').should('be.visible'); // Author Code input
        cy.get('#customer-address').should('be.visible'); // Date input
        cy.get('#customer-phone').should('be.visible'); // Description input
        cy.get('#customer-email').should('be.visible');
        cy.get('#AccoutGroupDropdown').should('be.visible');
        cy.get('#enable-table').should('be.visible');
        cy.get('#customer-comment').should('be.visible');

        // Fill in the author entry details if necessary
        cy.get('.btn-secondary').should('be.visible').click(); 
        cy.get('.card-title').contains('Authors').should('be.visible'); // Page header
        // Confirm author creation
    });
});
