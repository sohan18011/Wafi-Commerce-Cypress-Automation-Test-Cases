describe('Payment Page Elements Test', () => {
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
            cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(7) > :nth-child(1) > :nth-child(1) > .lpx-menu-item-text').click(); // Main menu for Purchases
            cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(7) > :nth-child(1) > .lpx-inner-menu > .lpx-inner-menu-item > lpx-sub-navbar > .lpx-menu-item-link > .lpx-menu-item-text').click(); // Sub-menu for Purchase List
        });
    });

    it('should verify visibility of essential elements on the Payments page', () => {
        // Verify presence of Supplier page header
        cy.get('.card-title').contains('Payments').should('be.visible'); // Page header

        // Verify input fields and search controls
    
        cy.get('.form-control').should('be.visible'); 
        cy.get('.page-count').should('be.visible'); 
        cy.get('.col-md-3 > .form-control').should('be.visible'); 
        cy.get(':nth-child(1) > .form-control').should('be.visible'); 
        cy.get(':nth-child(2) > :nth-child(2) > .form-control').should('be.visible'); 
        cy.get('#payment-type').should('be.visible'); 
        cy.get('#party-type').should('be.visible'); 
        cy.get('.dropdown-btn').should('be.visible'); 
        cy.get('.col-1 > .form-control').should('be.visible'); 
        cy.get('#create').should('be.visible').click(); 


        cy.get('#abp-modal-header').contains('New Payment').should('be.visible');
        cy.get('form.ng-untouched > .row > :nth-child(1) > .form-control').should('be.visible');
        cy.get('#payment-code').should('be.visible');
        cy.get('#payment-reference').should('be.visible');
        cy.get(':nth-child(4) > #payment-type').should('be.visible');
        cy.get(':nth-child(5) > #party-type').should('be.visible');
        cy.get(':nth-child(6) > .outside-table > .multiselect-dropdown > :nth-child(1) > .dropdown-btn').should('be.visible');
        cy.get('#payment-purpose').should('be.visible');
        cy.get(':nth-child(8) > .outside-table > .multiselect-dropdown > :nth-child(1) > .dropdown-btn').should('be.visible');
        cy.get('#enable-table').should('be.visible');
        cy.get('.row > :nth-child(10)').should('be.visible');
        
        cy.get('#purchase-input-cash').should('be.visible');
        cy.get('#purchase-input-bank').should('be.visible');
        cy.get('#payment-total-amount').should('be.visible');
        cy.get(':nth-child(14) > .form-control').should('be.visible');
        cy.get('#payment-comment').should('be.visible');
        cy.get('.btn-secondary').should('be.visible').click();
       
        cy.get('#cancel').should('be.visible');
        cy.get('#confirm').should('be.visible').click();
        cy.get('.card-title').contains('Payments').should('be.visible'); // Page header

    });
});
