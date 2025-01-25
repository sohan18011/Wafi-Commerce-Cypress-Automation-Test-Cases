import LoginPage from '../../support/Page_Objects/LoginPage';

describe('Edit an Existing Voucher', () => {
    const loginPage = new LoginPage();

    beforeEach(() => {
        // Load tenant credentials from the fixture file and log in
        cy.fixture('lastTenant.json').then((tenantData) => {
            cy.login(tenantData.tenantName, tenantData.username, tenantData.password);
        });
    });

    it('should edit an existing voucher successfully', () => {
        // Step 1: Navigate to the vouchers page
        cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(3) > :nth-child(1) > :nth-child(1) > .lpx-menu-item-text').click();
        cy.wait(2000);
        cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(3) > :nth-child(1) > :nth-child(2) > :nth-child(1) > lpx-sub-navbar > .lpx-menu-item-link > .lpx-menu-item-text').click();
        cy.wait(2000);

        // Step 2: Click on the options dropdown of the first voucher in the list
        cy.get(':nth-child(1) > .datatable-body-row > .datatable-row-center > [style="width: 150px; max-width: 150px; height: auto;"] > .datatable-body-cell-label > .d-inline-block > .dropdown-toggle').click();
        cy.wait(2000);

        // Step 3: Click on the 'Edit' option from the dropdown menu
        cy.get('[data-popper-placement="bottom-start"] > .dropdown-menu > :nth-child(1)').click();
        cy.wait(2000);

        // Step 4: Update the voucher description
        const updatedDescription = 'Edit voucher description';  // Define updated description
        cy.get('#voucher-description').clear().type(updatedDescription);
        cy.wait(2000);

        // Step 5: Optionally, update the note in the voucher details (if required)
        const updatedNote = 'Edit voucher note';  // Define updated note
        cy.get(':nth-child(1) > :nth-child(5) > .details-note').clear().type(updatedNote);
        cy.wait(2000);

        // Step 6: Save the changes
        cy.get('#abp-modal-footer > .btn-primary').click();

        // Step 7: Verify that the changes have been saved (optional verification)
   
        



    });
});
