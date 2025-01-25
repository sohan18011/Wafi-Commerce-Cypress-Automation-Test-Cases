import LoginPage from '../../support/Page_Objects/LoginPage';
import SalePage from '../../support/Page_Objects/SalePage';

describe('Edit an Existing Sale', () => {
    const loginPage = new LoginPage();
    const salePage = new SalePage();

    before(() => {
        // Load tenant credentials from the fixture file and log in once before all tests
        cy.fixture('lastTenant.json').then((tenantData) => {
            cy.login(tenantData.tenantName, tenantData.username, tenantData.password);
        });
    });

    it('should edit an existing sale successfully', () => {
        // Step 1: Navigate to the sales page
        salePage.navigateToSalesPage();
        cy.wait(1000);

        // Step 2: Open the dropdown for sale actions
        cy.get('.d-inline-block > .dropdown-toggle').click();
        cy.wait(1000);

        // Step 3: Select the "Edit" option from the dropdown
        cy.get('[data-popper-placement="bottom-start"] > .dropdown-menu > :nth-child(1)').click();

        // Step 4: Edit the sale description
        cy.get('#sale-description').clear().type("Edited the sale");  // Clear and edit the sale description
        cy.wait(1000);

        // Step 5: Save the changes
        cy.get('.btn-success').click();

        // Step 6: Add assertions if needed to verify the sale has been updated
         // Adjust the selector for the success message as needed
    });
});
