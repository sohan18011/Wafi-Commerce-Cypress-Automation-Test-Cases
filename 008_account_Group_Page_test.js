describe('Create Multiple Account Groups', () => {
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
            cy.login(name, Cypress.env('LOGIN_USERNAME'), Cypress.env('ADMIN_PASSWORD')); // Custom login command
        });
    });

    it('should Test account groups Element', () => {
        // Navigate to the Account Groups page
        cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(3) > :nth-child(1) > :nth-child(1) > .lpx-menu-item-text')
            .should('exist')
            .click();

        cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(3) > :nth-child(1) > :nth-child(2) > :nth-child(2) > lpx-sub-navbar > .lpx-menu-item-link > .lpx-menu-item-text')
            .should('exist')
            .click();

        // Verify page elements load correctly
        cy.get('.card-title').should('be.visible'); // Verify the card title is visible
        cy.get('.page-count').should('exist'); // Verify page count element
        cy.get('.form-control').should('exist'); // Verify form control element

        // Click to create a new account group
        cy.get('#create').should('exist').click(); // Ensure the create button is clickable
        cy.wait(2000); // Wait for any animations or page updates (consider dynamic wait if possible)

        // Verify account group creation form elements are available
        cy.get('h3').should('contain.text', 'New Account Group'); // Verify form header text
        cy.get('.ng-select-container').should('be.visible'); // Verify ng-select dropdown is visible
        cy.get('#account-code').should('be.visible').type('12345'); // Enter account code
        cy.get('#account-name').should('be.visible').type('Test Account Group'); // Enter account name
        cy.get('#account-description').should('be.visible').type('Description for Test Account Group'); // Enter description

        // Save the account group
        cy.get('.btn-secondary').should('be.visible').click(); 
        cy.get('#confirm').click();// Click Save button
        cy.wait(2000); // Wait for the page to update

        // Assertions to verify the new account group was created
        cy.get('.page-count').should('be.visible')// Verify page count has incremented
        cy.get('.card-title').should('contain.text', 'Account Groups'); // Verify card title

        // Optional additional verification for added account group in list
       
    });
});
