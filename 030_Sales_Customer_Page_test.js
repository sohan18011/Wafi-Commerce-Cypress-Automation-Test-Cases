describe('Customer Page Elements Test', () => {
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

            // Navigate to the Customer Page
            cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(5) > :nth-child(1) > :nth-child(1) > .lpx-menu-item-text').click(); // Main menu
            cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(5) > :nth-child(1) > :nth-child(2) > :nth-child(3) > lpx-sub-navbar > .lpx-menu-item-link > .lpx-menu-item-text').click(); // Navigate to Customer
        });
    });

    it('should verify Customer header is visible', () => {
        cy.get('.py-1').contains('Customers').should('be.visible'); // Page header
    });

    it('should select a customer checkbox and open Send Email modal', () => {
        cy.get(':nth-child(1) > .datatable-body-row > .datatable-row-center > [style="width: 30px; height: auto;"] > .datatable-body-cell-label > .datatable-checkbox > input').click();
        cy.wait(2000);
        cy.get('#createsend-email').should('be.visible').click();
        cy.get('.modal-header').contains('Send Email').should('be.visible');
        cy.get('.border').should('be.visible');
        cy.get('#emailSubject').should('be.visible');
        cy.get('#text').should('be.visible');
        cy.get('.btn-secondary').should('be.visible').click();
    });

    it('should open and verify Send SMS modal', () => {
        cy.get(':nth-child(1) > .datatable-body-row > .datatable-row-center > [style="width: 30px; height: auto;"] > .datatable-body-cell-label > .datatable-checkbox > input').click();
        cy.wait(2000);
        cy.get('#createsend-sms').should('be.visible').click();
        cy.get('.modal-header').contains('Send SMS').should('be.visible');
        cy.get('.border').should('be.visible');
        cy.get('#text').should('be.visible');
        cy.get('.btn-secondary').should('be.visible').click();
    });

    it('should verify Customer search field is visible', () => {
        cy.get('.form-control').should('be.visible');
    });

    it('should verify visibility of New Customer button and form fields', () => {
        cy.get('#create').should('be.visible').click();
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
    });
});
