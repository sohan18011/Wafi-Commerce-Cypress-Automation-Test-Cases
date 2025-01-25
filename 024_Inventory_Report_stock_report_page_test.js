describe('Report Stock Page Elements Test', () => {
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

            // Navigate to the Report Stock Page
            cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(4) > :nth-child(1) > :nth-child(1) > .lpx-menu-item-text').click(); // Main menu
            cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(4) > :nth-child(1) > :nth-child(2) > :nth-child(8) > :nth-child(1) > :nth-child(1) > .lpx-menu-item-text').click(); // Navigate to Report Stock
            cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(4) > :nth-child(1) > :nth-child(2) > :nth-child(8) > :nth-child(1) > .lpx-inner-menu > :nth-child(2) > lpx-sub-navbar > .lpx-menu-item-link > .lpx-menu-item-text').click();
        });
    });

    it('should verify visibility of essential elements on the Report Stock page', () => {
        // Verify presence of Report Stock header
        cy.get('.card-title').contains('Stock Report').should('be.visible'); // Page header

        // Verify filters and input fields
        cy.get(':nth-child(3) > .singleselect > .multiselect-dropdown > :nth-child(1) > .dropdown-btn').should('be.visible'); // Example filter for date range
        cy.get(':nth-child(5) > .singleselect > .multiselect-dropdown > :nth-child(1) > .dropdown-btn').should('be.visible'); // Example filter for product selection
        cy.get(':nth-child(5) > .singleselect > .multiselect-dropdown > :nth-child(1) > .dropdown-btn').should('be.visible'); // Button to generate report
        cy.get('#filter-button').should('be.visible').click();
        cy.get('.form-control').should('be.visible');
        cy.get('.col-2 > .singleselect > .multiselect-dropdown > :nth-child(1) > .dropdown-btn').should('be.visible');

        // Enter filter criteria (Example: select date range)
        
    });
});

