describe('Account Management CRUD Operations', () => {
    const username = 'admin'; // Replace with your actual username
    const password = '1q2w3E*'; // Replace with your actual password
    const tenantName = 'Demo3'; // Replace with your actual tenant name
    const accountGroupName = 'Test'; // Replace with an actual account group
    const accountType = 'Asset'; // Replace with actual account type if needed

    const generateUniqueSubGroupName = () => `SubGroup_${Date.now()}`;
    const generateUniqueAccountName = () => `Account_${Date.now()}`;

    // Step 1: Log in to the application
    class LoginPage {
        visit() {
            cy.visit('/');
        }

        clickLoginButton() {
            cy.wait(2000);
            cy.get('.px-4').click(); // Adjust this selector based on your actual login button
            cy.wait(2000);
        }

        selectTenant(tenantName) {
            cy.get('#AbpTenantSwitchLink').click();
            cy.wait(2000);
            cy.get('#Input_Name').type(tenantName);
            cy.get('.modal-footer > .btn-primary').click(); // Adjust this selector based on your actual tenant selection button
            cy.wait(2000);
        }

        enterUsername(username) {
            cy.get('#LoginInput_UserNameOrEmailAddress').type(username);
        }

        enterPassword(password) {
            cy.get('#LoginInput_Password').type(password);
        }

        submit() {
            cy.get('.btn-lg').click(); // Adjust this selector based on your actual submit button
        }
    }

    it('Login, Create Account Group, Manage Sub-Group, and Create/Edit/Delete Account', () => {
        const loginPage = new LoginPage();

        // Step 1: Visit the login page and perform login
        loginPage.visit();
        loginPage.clickLoginButton();
        loginPage.selectTenant(tenantName);
        loginPage.enterUsername(username);
        loginPage.enterPassword(password);
        loginPage.submit();

        cy.wait(2000);
        cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(3) > :nth-child(1) > :nth-child(1) > .lpx-menu-item-text').click();
         // Adjust the URL as necessary
         cy.wait(2000);
         cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(3) > :nth-child(1) > :nth-child(2) > :nth-child(2) > lpx-sub-navbar > .lpx-menu-item-link > .lpx-menu-item-text').click();
         cy.wait(2000);
        // Step 2: Create Account Group
        cy.get('#create').click(); // Click new account group button
        cy.wait(2000);
        cy.get('#account-name').type(accountGroupName); // Fill in account name
        cy.get('#account-description').type(`This is the ${accountGroupName} group.`); // Fill in account description

        // Open the account type dropdown and select the appropriate option
        cy.get('.ng-select-container').click();
        cy.contains('.ng-option', accountType).should('be.visible').click(); // Select account type
        cy.get('.btn-primary').contains('Save').click(); // Save the account group
        // Verify the account group was created
        cy.contains(accountGroupName).should('be.visible');

        cy.wait(2000);

        // Step 3: Navigate to account sub-groups page
        cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(3) > :nth-child(1) > :nth-child(2) > :nth-child(3) > lpx-sub-navbar > .lpx-menu-item-link > .lpx-menu-item-text').click();
        cy.wait(2000);

        // Step 4: Create a new sub-group
        cy.get('#create').click();  // Click "New Sub-Group" button
        const uniqueSubGroupName = generateUniqueSubGroupName();  // Generate unique sub-group name

        // Fill in sub-group details
        cy.get('#account-name').type(uniqueSubGroupName);
        cy.get('#account-description').type('Automated sub-group description');

        // Select account group from dropdown
        cy.get(':nth-child(1) > .ng-select-searchable > .ng-select-container').first().click({ force: true });
        cy.get('.ng-option').should('be.visible').contains(accountGroupName).click();

        // Save the new sub-group
        cy.get('.btn-primary').contains('Save').click();

        // Verify the sub-group was created successfully
        cy.contains(uniqueSubGroupName).should('be.visible');
        cy.wait(2000);
        // Step 8: Create a new account
        cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(3) > :nth-child(1) > :nth-child(2) > :nth-child(4) > lpx-sub-navbar > .lpx-menu-item-link > .lpx-menu-item-text').click();
        cy.wait(2000); // Adjust the URL as necessary
        const uniqueAccountName = generateUniqueAccountName(); // Generate unique account name

        cy.get('#create').click(); // Click "New Account" button
        cy.get('#account-name').type(uniqueAccountName); // Fill in account name
        cy.get('#account-description').type('Automated account description'); // Fill in account description

        // Select account group from dropdown
        cy.get(':nth-child(1) > .ng-select-searchable > .ng-select-container').first().click({ force: true });
        cy.get('.ng-option').should('be.visible').contains(uniqueSubGroupName).click();

        // Save the new account
        cy.get('.btn-primary').contains('Save').click();
        
        // Verify the account was created successfully
        cy.contains(uniqueAccountName).should('be.visible');

        // Step 9: Edit the account
       // Search for the account
        cy.wait(2000);
        cy.get('.d-inline-block > .dropdown-toggle').click();
        cy.wait(2000);
        cy.get('[data-popper-placement="bottom-start"] > .dropdown-menu > :nth-child(1)').click(); // Select edit option
        cy.wait(2000);
        cy.get('.ng-select-container').invoke('text').should('contain',uniqueSubGroupName); 
        cy.get('#account-code').invoke('val').should('eq','1101001');
        cy.get('#account-name').invoke('val').should('eq', uniqueAccountName);
        cy.get('#account-description').invoke('val').should('eq', 'Automated account description');
        cy.wait(2000);
        cy.get('#account-isbank').click();
        cy.get('.modal-footer > .btn-primary').click();
        cy.wait(2000);
        // Step 10: Delete the account
        cy.get('.d-inline-block > .dropdown-toggle').click();
        cy.wait(2000);
        cy.get('[data-popper-placement="bottom-start"] > .dropdown-menu > :nth-child(2)').click(); // Click delete option
        cy.wait(2000);
        cy.get('#confirm').click(); // Confirm deletion
        cy.wait(2000);
        // Verify the account was deleted successfully
        cy.get(':nth-child(1) > .form-control').clear().type(uniqueAccountName); 
        cy.contains(uniqueAccountName).should('not.exist');


        cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(3) > :nth-child(1) > :nth-child(2) > :nth-child(3) > lpx-sub-navbar > .lpx-menu-item-link > .lpx-menu-item-text').click();
        cy.wait(2000);
        cy.get('.d-inline-block > .dropdown-toggle').click();
        cy.wait(2000);
        cy.get('[data-popper-placement="bottom-start"] > .dropdown-menu > :nth-child(2)').click(); // Click delete option
        cy.wait(2000);
        cy.get('#confirm').click(); 
        cy.wait(10000);

        cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(3) > :nth-child(1) > :nth-child(2) > :nth-child(2) > lpx-sub-navbar > .lpx-menu-item-link > .lpx-menu-item-text').click();
        cy.wait(2000);
        cy.get('.d-inline-block > .dropdown-toggle').click();
        cy.get('[data-popper-placement="bottom-start"] > .dropdown-menu > :nth-child(2)').click();
        cy.wait(2000);
        cy.get('#confirm').click();
        cy.wait(10000);

    });
});
