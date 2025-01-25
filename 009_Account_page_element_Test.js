describe('Test the Account Page Elements', () => {
    let tenantName;

    before(() => {
        // Load tenant data from fixture file
        cy.fixture('lastTenant.json').then((tenantData) => {
            tenantName = tenantData.tenantName;
            expect(tenantName).to.not.be.undefined; // Ensure tenantName is defined
        });
    });

    beforeEach(() => {
        // Ensure tenantName is defined before each test and perform login
        cy.wrap(tenantName).should('not.be.undefined').then((name) => {
            cy.visit('/');
            cy.login(name, Cypress.env('LOGIN_USERNAME'), Cypress.env('ADMIN_PASSWORD')); // Custom login command
        });
    });

    it('should verify all key elements and create a new account', () => {
        // Navigate to the Account page
        cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(3) > :nth-child(1) > :nth-child(1) > .lpx-menu-item-text')
            .should('exist')
            .click();
            cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(3) > :nth-child(1) > :nth-child(2) > :nth-child(4) > lpx-sub-navbar > .lpx-menu-item-link > .lpx-menu-item-text')
            .should('exist')
            .click();

        // Verify the main page elements load correctly
        cy.get('.card-title').should('be.visible').and('contain.text', 'Accounts'); // Verify page title
        cy.get('.page-count').should('exist'); // Verify page count element exists
        cy.get(':nth-child(1) > .form-control').should('exist');
        cy.get('#Account-Type-Id').should('exist');
        cy.get(':nth-child(4) > .singleselect > .multiselect-dropdown > :nth-child(1) > .dropdown-btn').should('exist');
        cy.get('.account-sub-group-dropdown > .singleselect > .multiselect-dropdown > :nth-child(1) > .dropdown-btn').should('exist'); // Verify search input field exists
        // Verify dropdown is visible
        cy.get('#dropdownBasic1').should('exist');
        // Click to create a new account
        cy.get('#create').should('exist').click();
        cy.wait(2000); // Consider changing this to a dynamic wait if needed

        // Verify new account creation form elements
        cy.get('h3').should('contain.text', 'New Account'); // Verify form header text
        cy.get('.ng-select-container').should('be.visible'); // Verify ng-select dropdown for account type is visible
        cy.get('#account-code').should('be.visible').type('ACC123'); // Enter account code
        cy.get('#account-name').should('be.visible').type('Test Account'); // Enter account name
        cy.get('#account-description').should('be.visible').type('Description for Test Account'); // Enter account description
        cy.get('#account-isbank').should('be.visible').click();
        cy.get('#account-iscash').should('be.visible').click();
        // Save the new account
        cy.get('.btn-secondary').should('be.visible').click(); 
     
        cy.wait(2000); // Wait for the page to update

        // Verify that the new account was created
        cy.get('.page-count').should('be.visible'); // Verify that page count is visible (can be enhanced to check specific increment)
        cy.get('.card-title').should('contain.text', 'Accounts'); // Verify title is still accurate
    });
});
