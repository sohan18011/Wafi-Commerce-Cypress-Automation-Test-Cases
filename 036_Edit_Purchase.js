import LoginPage from '../../support/Page_Objects/LoginPage';

describe('Edit an Existing Purchase', () => {
    const loginPage = new LoginPage();

    beforeEach(() => {
        // Load tenant credentials from the fixture file and log in
        cy.fixture('lastTenant.json').then((tenantData) => {
            cy.login(tenantData.tenantName, tenantData.username, tenantData.password);
        });
    });

    it('should edit an existing purchase successfully', () => {
        // Step 1: Navigate to the purchases page
        cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(6) > :nth-child(1) > :nth-child(1) > .lpx-menu-item-text').click();
        cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(6) > :nth-child(1) > .lpx-inner-menu > :nth-child(1) > lpx-sub-navbar > .lpx-menu-item-link > .lpx-menu-item-text').click();

        // Wait for the purchases page to load
        cy.wait(2000);
        cy.get(':nth-child(1) > .datatable-body-row > .datatable-row-center > [style="width: 150px; max-width: 150px; height: auto;"] > .datatable-body-cell-label > .d-inline-block > .dropdown-toggle').click();
        cy.wait(2000);
        cy.get('[data-popper-placement="bottom-start"] > .dropdown-menu > :nth-child(1)').click();
        cy.wait(2000);
        cy.get('#purchase-description').type('Editing Purpose');
        cy.wait(2000);

       cy.get('#abp-modal-footer > .btn-primary').click();
    });
});
