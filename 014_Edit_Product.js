import LoginPage from '../../support/Page_Objects/LoginPage';

describe('Edit an Existing Product', () => {
    const loginPage = new LoginPage();

    beforeEach(() => {
        // Load tenant credentials from the fixture file and log in
        cy.fixture('lastTenant.json').then((tenantData) => {
            cy.login(tenantData.tenantName, tenantData.username, tenantData.password);
        });
    });

    it('should edit an existing product successfully', () => {
        // Step 1: Navigate to the products page
        cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(4) > :nth-child(1) > :nth-child(1) > .lpx-menu-item-text').click();
        
        cy.wait(2000);
        cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(4) > :nth-child(1) > :nth-child(2) > :nth-child(5) > lpx-sub-navbar > .lpx-menu-item-link > .lpx-menu-item-text').click();
        cy.wait(2000);

        // Step 2: Click on the dropdown to edit the first product in the list
        cy.get(':nth-child(1) > .datatable-body-row > .datatable-row-center > [style="width: 150px; max-width: 150px; height: auto;"] > .datatable-body-cell-label > .d-inline-block > .dropdown-toggle').click();
        cy.wait(2000);

        // Step 3: Click on the 'Edit' option from the dropdown menu
        cy.get('[data-popper-placement="bottom-start"] > .dropdown-menu > :nth-child(1)').click();
        cy.wait(2000);

        // Step 4: Edit the product description
        const updatedDescription = 'Editing product description';  // Updated product description
        cy.get('#product-description').clear().type(updatedDescription);  // Clear existing text and type the new description
        cy.wait(2000);

        // Step 5: Save the changes
        cy.get('#abp-modal-footer > .btn-primary').click();
        cy.wait(2000);

        // Optional: Verify the success of the edit (depends on how the app displays success messages)
        // Adjust this line as per the app's success message
    });
});
