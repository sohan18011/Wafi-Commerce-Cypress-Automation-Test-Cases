describe('Test The Account sub group page elemnet', () => {
    let tenantName;

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


    it('should test account sub-groups elements and creation', () => {
        // Navigate to the Account Groups page
        cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(3) > :nth-child(1) > :nth-child(1) > .lpx-menu-item-text')
            .should('exist')
            .click();
        cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(3) > :nth-child(1) > :nth-child(2) > :nth-child(3) > lpx-sub-navbar > .lpx-menu-item-link > .lpx-menu-item-text')
            .should('exist')
            .click();

        // Verify page elements load correctly
        cy.get('.py-1').should('be.visible').and('contain.text', 'Account Subgroups'); // Verify the card title
        cy.get('.page-count').should('exist'); // Verify page count element exists
        cy.get('.form-control').should('exist'); // Verify form control element
        cy.get('.ng-value-container').should('be.visible'); // Verify dropdown is visible

        // Click to create a new account group
        cy.get('#create').should('exist').click();
        cy.wait(2000); // Consider changing this to a dynamic wait if needed

        // Verify account group creation form elements are available
        cy.get('h3').should('contain.text', 'New Account Subgroup'); // Verify form header text
        cy.get(':nth-child(1) > .ng-select-searchable > .ng-select-container').should('be.visible'); // Verify ng-select dropdown is visible
        cy.get('#account-code').should('be.visible').type('12345'); // Enter account code
        cy.get('#account-name').should('be.visible').type('Test Account sub Group'); // Enter account name
        cy.get('#account-description').should('be.visible').type('Description for Test Account sub Group'); // Enter description

        // Save the account group
        cy.get('.btn-secondary').should('be.visible').click(); 
        cy.get('#confirm').should('be.visible').click(); // Click confirm to save
        cy.wait(2000); // Wait for the page to update

        // Assertions to verify the new account group was created
        cy.get('.page-count').should('be.visible'); // Verify page count is visible (may need more specific verification)
        cy.get('.py-1').should('contain.text', 'Account Subgroups'); // Verify card title is accurate
    });
});
