describe('Create Multiple Account Groups', () => {
    let tenantName;

    before(() => {
        // Load the tenant name from the fixture file
        cy.fixture('lastTenant.json').then((tenantData) => {
            tenantName = tenantData.tenantName; // Load the tenant name
            expect(tenantName).to.not.be.undefined; // Ensure tenantName is defined
        });
    });

    beforeEach(() => {
        // Ensure tenantName is defined before proceeding
        cy.wrap(tenantName).should('not.be.undefined').then((name) => {
            // Use the custom login function and pass the tenant name
            cy.visit('/');
            cy.login(name, Cypress.env('LOGIN_USERNAME'), Cypress.env('ADMIN_PASSWORD')); // Custom login command
        });
    });

    it('should create multiple account groups', () => {
        const accountGroups = [
            { name: 'Fixed Asset', type: 'Asset' },
            { name: 'Current Asset', type: 'Asset' },
            { name: 'Short Term Liability', type: 'Liability' },
            { name: 'Long Term Liability', type: 'Liability' },
            { name: 'Direct Income', type: 'Revenue' },
            { name: 'Indirect Income', type: 'Revenue' },
            { name: 'Direct Expense', type: 'Expense' },
            { name: 'Indirect Expense', type: 'Expense' }
        ];

        // Navigate to the account groups page (run this only once)
        cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(3) > :nth-child(1) > :nth-child(1) > .lpx-menu-item-text').click();
        cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(3) > :nth-child(1) > :nth-child(2) > :nth-child(2) > lpx-sub-navbar > .lpx-menu-item-link > .lpx-menu-item-text').click();

        // Iterate over the account groups to create each one
        accountGroups.forEach((group) => {
            cy.log(`Creating account group: ${group.name}`); // Log the action to report

            // Click 'Create New' for the account group
            cy.get('#create').should('be.visible').click();

            // Fill the form for account group creation
            cy.get('#account-name').type(group.name);
            cy.get('#account-description').type(`This is the ${group.name} group.`);

            // Open the account type dropdown and select the appropriate option
            cy.get('.ng-select-container').click();
            cy.contains('.ng-option', group.type).click();

            // Save the form
            cy.get('.btn-primary').contains('Save').click();

            // Assert the group creation process
            cy.contains(group.name).should('exist').then(() => {
                cy.log(`Account group ${group.name} created successfully`);  // Log success
            });
        });
        cy.wait(2000); // Wait for page to load/update
        cy.get('.page-count')  // Assuming '.page-count' holds the total count
            .invoke('text')
            .then((text) => {
                const totalCount = parseInt(text.trim(), 10);  // Parse the text to an integer
                expect(totalCount).to.equal(8);  // Assert that the total is equal to 8
                cy.log(`Total number of account groups: ${totalCount}`);
            });
    });
});
