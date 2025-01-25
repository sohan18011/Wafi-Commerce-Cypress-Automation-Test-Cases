describe('Quick Access Page Elements Test', () => {
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

            // Navigate to the Quick Access Page
            cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(10) > :nth-child(1) > :nth-child(1) > .lpx-menu-item-text').click(); // Main menu
            cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(10) > :nth-child(1) > :nth-child(2) > :nth-child(2) > lpx-sub-navbar > .lpx-menu-item-link > .lpx-menu-item-text').click();
            cy.get("[id='Quick Access-tab']", { timeout: 10000 }).should('be.visible').click(); // Submenu Quick Access
        });
    });

    it('should verify visibility of essential elements on the Quick Access page', () => {
        // Verify presence of Quick Access tab and header
        cy.get(':nth-child(2) > #Quick\\ Access-tab').should('be.visible'); // Quick Access tab
        cy.get('h2').contains('Quick Access').should('be.visible'); // Page header

        // Verify buttons and form elements
        cy.get(':nth-child(1) > .form-group > [placeholder="Title"]').clear().type('Google'); // Title for Link 1
        cy.get(':nth-child(1) > .form-group > .mt-2').clear().type('https://www.google.com'); // Link for Link 1

        // Set title and link for Link 2: YouTube
        cy.get(':nth-child(2) > .form-group > [placeholder="Title"]').clear().type('YouTube'); // Title for Link 2
        cy.get(':nth-child(2) > .form-group > .mt-2').clear().type('https://www.youtube.com'); // Link for Link 2

        // Set title and link for Link 3: Facebook
        cy.get(':nth-child(3) > .form-group > [placeholder="Title"]').clear().type('Facebook'); // Title for Link 3
        cy.get(':nth-child(3) > .form-group > .mt-2').clear().type('https://www.facebook.com'); // Link for Link 3

        // Set title and link for Link 4: ChatGPT
        cy.get(':nth-child(4) > .form-group > [placeholder="Title"]').clear().type('ChatGPT'); // Title for Link 4
        cy.get(':nth-child(4) > .form-group > .mt-2').clear().type('https://chat.openai.com'); // Link for Link 4
        cy.get('.btn').click();
        cy.get('#cancel').should('be.visible');
        cy.get('#confirm').should('be.visible').click();
        cy.wait(2000);

        // Verify settings sections (like Accounts, Quick Access, Products, etc.)
        cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(1) > lpx-sub-navbar > .lpx-menu-item-link > .lpx-menu-item-text').click();
        cy.wait(2000);
        cy.get('.text-start > div > :nth-child(1)').should('contain', 'Google');
        cy.get('.text-start > div > :nth-child(2)').should('contain', 'YouTube');
        cy.get('.text-start > div > :nth-child(3)').should('contain', 'Facebook');
        cy.get('.text-start > div > :nth-child(4)').should('contain', 'ChatGPT');
       
    });
});
