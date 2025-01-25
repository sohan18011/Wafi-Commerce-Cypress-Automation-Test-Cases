describe('Account Sub-Group CRUD Operations', () => {
    const username = 'admin'; // Replace with your actual username
    const password = '1q2w3E*'; // Replace with your actual password
    const tenantName = 'Demo3'; // Replace with your actual tenant name
    const accountGroupName = 'Test';  // Replace with an actual account group
    const accountType = 'Asset'; // Replace with actual account type if needed

    const generateUniqueSubGroupName = () => `SubGroup_${Date.now()}`;

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

    it('Login, Create Account Group, and Manage Sub-Group', () => {
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
        cy.wait(2000);
        
        cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(3) > :nth-child(1) > :nth-child(2) > :nth-child(2) > lpx-sub-navbar > .lpx-menu-item-link > .lpx-menu-item-text').click();
        cy.wait(2000);
        // Step 2: Create Account Group
        cy.get('.lpx-content > app-account-groups > .card > .card-header > .row > .text-lg-end > #create').click(); // Click new account group button
        cy.wait(2000);
        cy.get('#account-name').type(accountGroupName); // Fill in account name
        cy.get('#account-description').type(`This is the ${accountGroupName} group.`); // Fill in account description

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

        // Step 5: Read/Search for the sub-group
        cy.get('.form-control').type(uniqueSubGroupName); 
        cy.wait(2000); // Assuming there's a search input with this ID
        
        cy.get('.d-inline-block > .dropdown-toggle').click();
        cy.wait(2000);
        cy.get('[data-popper-placement="bottom-start"] > .dropdown-menu > :nth-child(1)').click(); // Select edit option
        cy.wait(2000);

        // Step 6: Verify and Update the sub-group's description
        cy.get('#account-name').invoke('val').should('equal', uniqueSubGroupName);
        cy.wait(2000);

        cy.get(':nth-child(1) > .ng-select-searchable > .ng-select-container').invoke('text').should('contain', accountGroupName); 
        cy.wait(2000);
        cy.get('#account-code').invoke('val').should('equal', '1101');
        cy.wait(2000);
        cy.get('#account-description').invoke('val').should('equal', 'Automated sub-group description'); 

        const newDescription = 'Updated automated sub-group description';
        cy.get('#account-description').clear().type(newDescription);  // Update description

        // Save the updated sub-group
        cy.get('.btn-primary').contains('Save').click();
        
        cy.wait(2000);

        // Step 7: Delete the sub-group
        cy.get('.d-inline-block > .dropdown-toggle').click();
        cy.wait(2000);
        cy.get('[data-popper-placement="bottom-start"] > .dropdown-menu > :nth-child(2)').click(); // Click delete option
        cy.wait(2000);
        cy.get('#confirm').click(); // Confirm deletion
        

         // Confirm deletion
        // Verify the sub-group was deleted successfully
        cy.get('.form-control').clear().type(uniqueSubGroupName); 
        cy.contains(uniqueSubGroupName).should('not.exist');
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
