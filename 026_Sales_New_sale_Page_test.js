describe('Sales Page Elements Test', () => {
    let tenantName;

    // Load the tenant name from the fixture file before tests
    before(() => {
        cy.fixture('lastTenant.json').then((tenantData) => {
            tenantName = tenantData.tenantName;
            expect(tenantName).to.not.be.undefined; // Ensure tenantName is defined
        });
    });

    // Ensure tenantName is defined before each test and perform login
    beforeEach(() => {
        cy.wrap(tenantName).should('not.be.undefined').then((name) => {
            cy.visit('/');
            cy.login(name, Cypress.env('LOGIN_USERNAME'), Cypress.env('ADMIN_PASSWORD'));

            // Navigate to the Sales Page
            cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(5) > :nth-child(1) > :nth-child(1) > .lpx-menu-item-text').click(); // Main menu
            cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(5) > :nth-child(1) > :nth-child(2) > :nth-child(1) > lpx-sub-navbar > .lpx-menu-item-link > .lpx-menu-item-text').click(); // Navigate to Sales
        });
    });

    it('should verify visibility of essential elements on the Sales page', () => {
        // Verify presence of Sales header
        cy.get('.card-title').contains('Sales').should('be.visible'); // Page header

        // Verify table presence and structure
        cy.get(':nth-child(1) > .form-control').should('be.visible'); // Sales table
        cy.get(':nth-child(1) > .form-control').should('be.visible'); // Table header
        cy.get('.dropdown-btn').should('be.visible');
        cy.get(':nth-child(3) > .form-control').should('be.visible'); 
        cy.get(':nth-child(4) > .form-control').should('be.visible'); 
        cy.get(':nth-child(5) > .form-control').should('be.visible'); 
        cy.get('#dropdownBasic1').should('be.visible'); 
        // Table body

        // Verify input fields for sales entry
        cy.get('[title="Actions"]').should('be.visible'); // Customer Name input
        cy.get('[title="Date Time"]').should('be.visible'); // Product Name input
        cy.get('[title="Sale Code"]').should('be.visible'); // Sale Amount input
        cy.get('[title="Customer Name"]').should('be.visible'); // Sale Date input
        cy.get('[title="Payable Amount"]').should('be.visible');
        cy.get('[title="Paid Amount"]').should('be.visible');
        cy.get('[title="Due Amount"]').should('be.visible');
        cy.get('[title="Cash Payment"]').should('be.visible');
        cy.get('[title="Bank Payment"]').should('be.visible');
        cy.get('[title="Reference Number"]').should('be.visible');
        // Fill in the sales entry details
        cy.get('#create').should('be.visible').click();
        cy.get('h3').contains('New Sale').should('be.visible'); 
        cy.get('#sale-number').should('be.visible');
        cy.get('#reference-number').should('be.visible');
        cy.get('.row.mt-2 > :nth-child(3) > .form-control').should('be.visible');
        cy.get('.input-group > .singleselect > .multiselect-dropdown > :nth-child(1) > .dropdown-btn').should('be.visible');
        cy.get('#btnGroupAddon').should('be.visible').click();
        cy.get('app-create-update-customer > .modal-header').contains('Create Customer').should('be.visible'); 
        cy.get('#customer-code').should('be.visible');
        cy.get('#customer-name').should('be.visible');
        cy.get('#customer-address').should('be.visible');
        cy.get('#customer-phone').should('be.visible');
        cy.get('#customer-email').should('be.visible');
        cy.get('#discount').should('be.visible');
        cy.get('#creditLimit').should('be.visible');
        cy.get('form.ng-untouched > :nth-child(8)').should('be.visible');
        cy.get('#enable-table').should('be.visible').click().click();
        cy.get('#customer-comment').should('be.visible');
        cy.get('app-create-update-customer > .modal-footer > .btn-secondary').should('be.visible').click();
        cy.get('#SaleProjectId').should('be.visible');
        cy.get(':nth-child(6) > .form-control').should('be.visible');
        cy.get('#sale-description').should('be.visible');
        cy.get('tr > :nth-child(2) > .singleselect > .multiselect-dropdown > :nth-child(1) > .dropdown-btn').should('be.visible');
        cy.get('thead > tr > :nth-child(10) > .btn').should('be.visible').click();
        cy.get(':nth-child(2) > .serial-index').should('be.visible');
        cy.get('#sale-total-amount').should('be.visible');
        cy.get('#sale-total-discount').should('be.visible');
        cy.get('#sale-payable-amount').should('be.visible');
        cy.get('#purchase-input-cash').should('be.visible');
        cy.get('#purchase-input-bank').should('be.visible');
        cy.get('#sale-due-amount').should('be.visible');
        cy.get(':nth-child(2) > :nth-child(10) > .btn').should('be.visible').click();
        cy.wait(2000);
        
        cy.get('.btn-success').should('be.visible');
        cy.get('#abp-modal-footer > :nth-child(3)').should('be.visible');
        cy.get('#abp-modal-footer > :nth-child(4)').should('be.visible');
        cy.get('.btn-secondary').should('be.visible').click();
        cy.get('#cancel').should('be.visible');
        cy.get('#confirm').should('be.visible').click();
        cy.get('.card-title').contains('Sales').should('be.visible'); // Page header
    });
});
