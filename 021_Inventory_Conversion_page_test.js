describe('Conversion Page Elements Test', () => {
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
            cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(4) > :nth-child(1) > :nth-child(1) > .lpx-menu-item-text').click(); // Navigate to Conversions
            cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(4) > :nth-child(1) > :nth-child(2) > :nth-child(7) > lpx-sub-navbar > .lpx-menu-item-link > .lpx-menu-item-text').click();

        });
    });

    it('should verify visibility of essential elements on the Conversion Page', () => {
        // Verify visibility of various elements on the Conversion Page
        cy.get('h3').should('be.visible'); // Header
        cy.get('.card-title').contains('Conversions').should('be.visible'); // Conversion Title
        cy.get('.col-4 > .form-control').should('be.visible'); // Search input for Conversions
        cy.get(':nth-child(2) > .form-control').should('be.visible');
        cy.get(':nth-child(3) > .form-control').should('be.visible');
        cy.get('.page-count').should('be.visible');
        cy.get('#dropdownBasic1').should('be.visible');
        cy.get(':nth-child(4) > .form-control').should('be.visible'); // Page Count
        cy.get('#create').should('be.visible').click(); // Create Conversion Button
        cy.get('#conversion-number').should('be.visible')
        cy.get('form.ng-untouched > .row > :nth-child(2) > .form-control').should('be.visible');
        cy.wait(2000);
        cy.get('#remarks').should('be.visible');
        cy.get('.col-md-4.mt-2 > .ng-select-searchable > .ng-select-container').should('be.visible');
        cy.get(':nth-child(6) > strong').contains('Input Products').should('be.visible');
        cy.get('thead > tr > :nth-child(7) > .btn').click();

        cy.get(':nth-child(7) > strong').contains('Input Services').should('be.visible');
        cy.get('thead > tr > :nth-child(6) > .btn').click();
        cy.get(':nth-child(7) > .mt-2 > .table-container > .table > tbody > :nth-child(2) > :nth-child(2) > .ng-select-searchable > .ng-select-container').should('be.visible');
  
        cy.get(':nth-child(8) > strong').contains('Output').should('be.visible');
        cy.get(':nth-child(9) > .table-container > .table > tbody > tr > .serial-index').should('be.visible');
        cy.get(':nth-child(9) > .table-container > .table > thead > tr > :nth-child(1)').should('be.visible');
        cy.get(':nth-child(9) > .table-container > .table > thead > tr > :nth-child(2)').should('be.visible');
        cy.get(':nth-child(9) > .table-container > .table > thead > tr > :nth-child(3)').should('be.visible');
        cy.get(':nth-child(9) > .table-container > .table > thead > tr > :nth-child(4)').should('be.visible');
        cy.get(':nth-child(9) > .table-container > .table > thead > tr > :nth-child(5)').should('be.visible');
        cy.get(':nth-child(9) > .table-container > .table > thead > tr > :nth-child(6)').should('be.visible');

        cy.get('#gain-or-loss-number').should('be.visible');
        cy.get('.btn-secondary').should('be.visible').click();
        cy.get('.card-title').contains('Conversions').should('be.visible');

    });
});
