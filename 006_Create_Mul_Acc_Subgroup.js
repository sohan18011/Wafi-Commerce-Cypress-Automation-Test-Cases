describe('Create Multiple Account Sub-Groups', () => {
    let tenantName;
    let username;
    let password;

    before(() => {
        // Load the tenant details from the fixture file
        cy.fixture('lastTenant.json').then((tenantData) => {
            tenantName = tenantData.tenantName; // Load the tenant name
            username = tenantData.username; // Load the username
            password = tenantData.password; // Load the password
            expect(tenantName).to.not.be.undefined; // Ensure tenantName is defined
            expect(username).to.not.be.undefined; // Ensure username is defined
            expect(password).to.not.be.undefined; // Ensure password is defined
        });
    });

    beforeEach(() => {
        // Ensure tenantName, username, and password are defined before proceeding
        cy.wrap(tenantName).should('not.be.undefined');
        cy.wrap(username).should('not.be.undefined');
        cy.wrap(password).should('not.be.undefined');

        // Use the values to perform login
        cy.visit('/');
        
        // Click the login button and perform tenant switch
        cy.get('.px-4').click(); // Click the login button
        cy.wait(2000);
        cy.get('#AbpTenantSwitchLink').click(); // Open the tenant switch modal
        cy.wait(2000);
        cy.get('#Input_Name').type(tenantName); // Type the tenant name
        cy.get('.modal-footer > .btn-primary').click(); // Click the submit button
        cy.wait(2000);
        cy.get('#LoginInput_UserNameOrEmailAddress').type(username); // Enter username
        cy.get('#LoginInput_Password').type(password); // Enter password
        cy.get('.btn-lg').click(); // Submit login form
        cy.wait(5000); // Wait for login to complete
    });

    it('should create multiple account sub-groups', () => {
        const subGroups = [
            { name: 'Purchase', type: 'Direct Expense' },
            { name: 'Short Term Liability', type: 'Short Term Liability' },
            { name: 'Land & Building', type: 'Fixed Asset' },
            { name: 'Computer Equipment', type: 'Fixed Asset' },
            { name: 'Furnitures', type: 'Fixed Asset' },
            { name: 'Cash', type: 'Current Asset' },
            { name: 'Bank Account', type: 'Current Asset' },
            { name: 'Receivables', type: 'Current Asset' },
            { name: 'Stock', type: 'Current Asset' },
            { name: 'Conversion gain', type: 'Current Asset' },
            { name: 'Payables', type: 'Short Term Liability' },
            { name: 'Long Term Loan', type: 'Long Term Liability' },
            { name: 'Owners Equity', type: 'Long Term Liability' },
            { name: 'Product Sales', type: 'Direct Income' },
            { name: 'Service Sales', type: 'Direct Income' },
            { name: 'Other Indirect Income', type: 'Indirect Income' },
            { name: 'Salaries & Wages', type: 'Direct Expense' },
            { name: 'COGS', type: 'Direct Expense' },
            { name: 'Purchase Account', type: 'Direct Expense' },
            { name: 'Indirect Expense', type: 'Indirect Expense' },
            { name: 'Admin Salaries', type: 'Indirect Expense' },
            { name: 'Utilities', type: 'Indirect Expense' },
            { name: 'Direct Expense', type: 'Direct Expense' }
        ];

        subGroups.forEach((subGroup, index) => {
            // Navigate to account sub-groups page
            cy.visit('/account/sub-groups');
            
            // Click the button to create a new sub-group
            cy.get('#create').click();
            cy.wait(2000);

            // Fill in the details for the sub-group
            cy.get('#account-name').type(subGroup.name);
            cy.get('#account-description').type(`This is the ${subGroup.name} sub-group.`);
            
            // Open the account type dropdown and select the appropriate option
            cy.get(':nth-child(1) > .ng-select-searchable > .ng-select-container').click();
            cy.contains('.ng-option', subGroup.type).click();
            
            // Save the sub-group
            cy.get('.btn-primary').contains('Save').click();
            cy.wait(5000); // Wait for the sub-group to be created

            // Wait for 60 seconds before creating the next sub-group
            if (index < subGroups.length - 1) {
                cy.wait(10000); // Wait for 60 seconds before creating the next sub-group
            }
        });
    });
});
