describe('Account Group Management with Login', () => {
    const accountGroupName = 'Test Account Group';
    const updatedAccountGroupName = 'Updated Account Group';
    const accountType = 'Asset'; // Replace with actual account type
    const username = 'admin'; // Replace with your actual username
    const password = '1q2w3E*'; // Replace with your actual password
    const tenantName = 'Demo3'; // Replace with your actual tenant name

    class LoginPage {
        visit() {
            cy.visit('/');
        }

        clickLoginButton() {
            cy.get('.px-4').click(); // Adjust this selector based on your actual login button
            
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

    it('Login and Manage Account Group', () => {
        const loginPage = new LoginPage();

        // Step 1: Visit the login page and perform login
        loginPage.visit();
        loginPage.clickLoginButton();
        loginPage.selectTenant(tenantName);
        loginPage.enterUsername(username);
        loginPage.enterPassword(password);
        loginPage.submit();

        cy.wait(2000);

        // Step 2: Navigate to the account groups page
        cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(3) > :nth-child(1) > :nth-child(1) > .lpx-menu-item-text').click(); // Adjust the URL as necessary
        cy.wait(2000);
        cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(3) > :nth-child(1) > :nth-child(2) > :nth-child(2) > lpx-sub-navbar > .lpx-menu-item-link > .lpx-menu-item-text').click();
        cy.wait(2000);
        // Step 3: Create Account Group
        cy.get('.lpx-content > app-account-groups > .card > .card-header > .row > .text-lg-end > #create').click(); // Click new account group button
        cy.wait(2000);
        cy.get('#account-name').type(accountGroupName); // Fill in account name
        cy.get('#account-description').type(`This is the ${accountGroupName} group.`); // Fill in account description

        // Open the account type dropdown and select the appropriate option
        cy.get('.ng-select-container').click();
        cy.contains('.ng-option', accountType).should('be.visible').click(); // Select account type
        cy.get('.btn-primary').contains('Save').click(); // Save the account group

        // Verify the account group was created
        cy.contains(accountGroupName).should('be.visible');

        cy.wait(200);

        // Step 4: Update Account Group
        // Adjust selector for edit button
        cy.get('.d-inline-block > .dropdown-toggle').click();
        cy.wait(2000);
        cy.get('[data-popper-placement="bottom-start"] > .dropdown-menu > :nth-child(1)').click();
        cy.wait(2000);
        // Verify the input fields have the correct values before editing
        cy.get('.ng-select-container').contains(accountType).should('exist');

        cy.get('#account-code').invoke('val').should('eq', '11');
        cy.wait(2000);
        cy.get('#account-name').invoke('val').should('eq', accountGroupName); // Verify account name
        cy.get('#account-description').invoke('val').should('eq', `This is the ${accountGroupName} group.`); // Verify account description

        // Update the account group name
        cy.get('#account-name').clear().type(updatedAccountGroupName); // Update account name
        cy.get('.btn-primary').contains('Save').click(); // Save the updated account group

        // Verify that the account group name was updated successfully
         // Ensure the old name no longer exists

        // Step 5: Delete Account Group
        cy.get('.d-inline-block > .dropdown-toggle').click();
        cy.get('[data-popper-placement="bottom-start"] > .dropdown-menu > :nth-child(2)').click();
        cy.wait(2000);
        cy.get('#confirm').click(); // Confirm deletion

        // Assert that the account group was deleted
        cy.contains(updatedAccountGroupName).should('not.exist'); // Ensure the updated name no longer exists
    });
});
