describe('Product Deletion and Verification', () => {
    let tenantName;
    const productNameToDelete = 'AutoTestProduct7835'; // Replace with actual product name

    // Load tenant name from fixture before tests
    before(() => {
        cy.fixture('lastTenant.json').then((tenantData) => {
            tenantName = tenantData.tenantName;
            expect(tenantName).to.not.be.undefined;
        });
    });

    // Perform login before each test case
    beforeEach(() => {
        cy.wrap(tenantName).should('not.be.undefined').then((name) => {
            cy.visit('/');
            cy.login(name, Cypress.env('LOGIN_USERNAME'), Cypress.env('ADMIN_PASSWORD'));
            cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(4) > :nth-child(1) > :nth-child(1) > .lpx-menu-item-text').click(); // Navigate to Product Groups
            cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(4) > :nth-child(1) > :nth-child(2) > :nth-child(5) > lpx-sub-navbar > .lpx-menu-item-link > .lpx-menu-item-text').click(); // Navigate to Products
        });
    });


   
    it('should delete a product and verify its removal from the product list', () => {
        // Step 1: Search for the product
        cy.get('.form-control').clear().type('Auto');
        cy.wait(2000); // Wait for search results to load

        // Step 2: Open the product's dropdown menu and click on 'Delete'
        cy.get(':nth-child(1) > .datatable-body-row > .datatable-row-center > [style="width: 150px; max-width: 150px; height: auto;"] > .datatable-body-cell-label > .d-inline-block > .dropdown-toggle')
            .click();
        
        // Click on the 'Delete' option
        cy.get('[data-popper-placement="bottom-start"] > .dropdown-menu > :nth-child(2)').contains('Delete').click();

        // Confirm deletion in the popup modal (if applicable)
        cy.get('#confirm').click();
        // Step 3: Verify the product has been deleted
        cy.get('.form-control').clear().type(productNameToDelete);
        cy.wait(2000);

        // Check if the product list is empty or if the product is no longer present
        cy.get('.page-count').invoke('text').then((text) => {
            const productCount = parseInt(text.trim().split(' ')[0], 10);
            expect(productCount).to.equal(0);
        });
    });
});