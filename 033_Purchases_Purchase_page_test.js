describe('Purchase Page Elements Test', () => {
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

            // Navigate to the Purchase Page
            cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(6) > :nth-child(1) > :nth-child(1) > .lpx-menu-item-text').click(); // Main menu for Purchases
            cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(6) > :nth-child(1) > .lpx-inner-menu > :nth-child(1) > lpx-sub-navbar > .lpx-menu-item-link > .lpx-menu-item-text').click(); // Sub-menu for Purchase List
        });
    });

    it('should verify visibility of essential elements on the Purchase page', () => {
        // Verify presence of Purchase page header
        cy.get('.card-title').contains('Purchases').should('be.visible'); // Page header

        // Verify input fields and search controls
        cy.get('.form-control').should('be.visible'); // Search or filter input field
        cy.get(':nth-child(4) > .form-control').should('be.visible'); 

        cy.get(':nth-child(1) > .form-control').should('be.visible'); 
        cy.get('.dropdown-btn').should('be.visible'); 
        cy.get(':nth-child(3) > .form-control').should('be.visible'); 
        cy.get(':nth-child(4) > .form-control').should('be.visible'); 
        cy.get(':nth-child(5) > .form-control').should('be.visible').click();
        cy.get('#create').should('be.visible').click(); 
        cy.get('#purchase-number').should('be.visible');
        cy.get('#reference-number').should('be.visible');
        cy.get('form.ng-untouched > .row > :nth-child(3) > .form-control').should('be.visible');
        cy.get('form.ng-untouched > .row > :nth-child(5) > .form-control').should('be.visible');
        cy.get(':nth-child(6) > .form-control').should('be.visible');
        cy.get('#purchase-description').should('be.visible');
        cy.get(':nth-child(2) > .singleselect > .multiselect-dropdown > :nth-child(1) > .dropdown-btn').should('be.visible');
        cy.get('.col-12 > .btn').should('be.visible');
        cy.get('thead > tr > :nth-child(8) > .btn').should('be.visible').click();
        cy.wait(2000);
        cy.get(':nth-child(2) > .serial-index').should('be.visible');
       
        cy.get(':nth-child(2) > :nth-child(2) > .singleselect > .multiselect-dropdown > :nth-child(1) > .dropdown-btn').should('be.visible');
        cy.get('.col-12 > .btn').should('be.visible');
        
        cy.get('#purchase-total-amount').should('be.visible');
        cy.get('#purchase-total-discount').should('be.visible');
        cy.get('#purchase-payable-amount').should('be.visible');
        cy.get('#purchase-input-cash').should('be.visible');
        cy.get('#purchase-input-bank').should('be.visible');
        cy.get('#purchase-due-amount').should('be.visible');
        cy.get('.btn-secondary').should('be.visible').click();
        cy.get('#cancel').should('be.visible');
        cy.get('#confirm').should('be.visible').click();
    });
});
