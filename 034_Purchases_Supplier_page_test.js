describe('Supplier Page Elements Test', () => {
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
            cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(6) > :nth-child(1) > .lpx-inner-menu > :nth-child(2) > lpx-sub-navbar > .lpx-menu-item-link > .lpx-menu-item-text').click(); // Sub-menu for Purchase List
        });
    });
    it('should verify visibility of essential elements on the Supplier page', () => {
        // Verify presence of Supplier page header
        cy.get('.card-title').contains('Suppliers').should('be.visible'); // Page header

        // Verify input fields and search controls
        cy.get('.form-control').should('be.visible'); // Search or filter input field
        cy.get(':nth-child(2) > .btn').should('be.visible'); 
        cy.get('[title="Comment"]').should('be.visible'); // Supplier name field
        cy.get('[title="Account"]').should('be.visible'); // Supplier code field
        cy.get('[title="Email"]').should('be.visible'); // Supplier contact field
        cy.get('[title="Phone"]').should('be.visible'); // Supplier address field
        cy.get('[title="Address"]').should('be.visible'); // Supplier email field
        cy.get('[title="Name"]').should('be.visible'); // Supplier phone field

       
        cy.get('#create').should('be.visible').click();
        cy.get('#supplier-code').should('be.visible'); // Modal for creating/editing supplier
        cy.get('#supplier-name').should('be.visible').click(); // Confirm in modal
        cy.get('#supplier-address').should('be.visible').click(); // Close or cancel modal
        cy.get('#supplier-phone').should('be.visible'); 
        cy.get('#supplier-email').should('be.visible'); 
        cy.get('#AccoutGroupDropdown').should('be.visible'); 
        cy.get('#supplier-comment').should('be.visible'); 
        cy.get('.btn-secondary').should('be.visible').click(); 



    });
});


