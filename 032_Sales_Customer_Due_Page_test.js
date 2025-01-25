describe('Customer Due Page Elements Test', () => {
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

            // Navigate to the Customer Due Page
            cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(5) > :nth-child(1) > :nth-child(1) > .lpx-menu-item-text').click(); // Main menu
            cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(5) > :nth-child(1) > :nth-child(2) > :nth-child(6) > :nth-child(1) > :nth-child(1) > .lpx-menu-item-text').click(); // Navigate to Reports
            cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(5) > :nth-child(1) > :nth-child(2) > :nth-child(6) > :nth-child(1) > .lpx-inner-menu > :nth-child(3) > lpx-sub-navbar > .lpx-menu-item-link > .lpx-menu-item-text').click(); // Open Customer Due section
        });
    });

    it('should verify visibility of essential elements on the Customer Due page', () => {
        // Verify presence of Customer Due header
        cy.get('.py-1').contains('Customer Due').should('be.visible'); // Page header

        // Verify input fields and search controls
        cy.get('.form-control').should('be.visible'); // Search or filter input

        // Verify table presence and structure
        cy.get('.page-count').should('be.visible'); // Table navigation or pagination control
        cy.get('[title="Code"]').should('be.visible'); // Code column header
        cy.get('[title="customer Name"]').should('be.visible'); // Customer Name column header
        cy.get('[title="Account Name"]').should('be.visible'); // Account Name column header
        cy.get('[title="Total Due"]').should('be.visible'); // Total Due column header
        cy.get('[title="Advanced Payment"]').should('be.visible'); // Advanced Payment column header
    });
});
