describe('Main Menu Visibility Check', () => {
    let tenantName;

    // Load the tenant name from the fixture file before tests
    before(() => {
        cy.fixture('lastTenant.json').then((tenantData) => {
            tenantName = tenantData.tenantName;
            expect(tenantName).to.not.be.undefined; // Ensure tenantName is defined
        });
    });

    // Perform login before each test case
    beforeEach(() => {
        cy.wrap(tenantName).should('not.be.undefined').then((name) => {
            cy.visit('/');
            cy.login(name, Cypress.env('LOGIN_USERNAME'), Cypress.env('ADMIN_PASSWORD'));
        });
    });

    it('should access the dashboard after login and verify all main menu items are visible', () => {
        // Verify Dashboard Cards Visibility
        cy.log('Verifying dashboard cards are visible');
        const dashboardCardsSelectors = [
            ':nth-child(1) > wafi-card > .blue-color > .card-body',
            ':nth-child(2) > wafi-card > .card > .card-body',
            ':nth-child(3) > wafi-card > .blue-color > .card-body',
            ':nth-child(4) > wafi-card > .card > .card-body',
            ':nth-child(5) > wafi-card > .card > .card-body',
            ':nth-child(6) > wafi-card > .card > .card-body',
            '[for="btnradio1"]',
            '[for="btnradio2"]',
            '[for="btnradio3"]',
            '[for="btnradio4"]'
        ];
        
        dashboardCardsSelectors.forEach(selector => {
            cy.get(selector).should('be.visible');
        });

        // Verify Main Menu Items Visibility
        cy.log('Verifying main menu items are visible and accessible');
        const mainMenuItems = [
            { index: 1, text: 'Home' },
            { index: 2, text: 'Project Management' },
            { index: 3, text: 'Accounting' },
            { index: 4, text: 'Inventory' },
            { index: 5, text: 'Sales' },
            { index: 6, text: 'Purchases' },
            { index: 7, text: 'Payment' },
            { index: 8, text: 'Setup' },
            { index: 9, text: 'CRM' },
            { index: 10, text: 'Administration' }
        ];

        mainMenuItems.forEach((menuItem) => {
            cy.get(`.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(${menuItem.index}) > :nth-child(1) > :nth-child(1) > .lpx-menu-item-text`)
                .should('contain', menuItem.text)
                .and('be.visible');
        });
    });
});
