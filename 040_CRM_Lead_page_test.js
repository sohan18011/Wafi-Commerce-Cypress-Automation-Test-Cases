describe('Leads Page Test', () => {
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
            cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(9) > :nth-child(1) > :nth-child(1) > .lpx-menu-item-text').click(); // Main menu for Purchases
            cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(9) > :nth-child(1) > .lpx-inner-menu > :nth-child(2) > lpx-sub-navbar > .lpx-menu-item-link > .lpx-menu-item-text').click(); // Sub-menu for Purchase List
        });
    });


    it('should verify visibility of essential elements on the Leads page', () => {
        // Verify presence of Supplier page header
        cy.get('.py-1').contains('Leads').should('be.visible'); // Page header

        // Verify input fields and search controls

        cy.get('.form-control').should('be.visible'); 
        cy.get('.page-count').should('be.visible');
        cy.get('.datatable-body-cell-label > .datatable-checkbox > input').click();
        cy.wait(2000);
        cy.get('#createsend-sms').should('be.visible').click();
        cy.get('.modal-header').contains('Send SMS').should('be.visible');
        cy.get('.border').should('be.visible');
        cy.get('#text').should('be.visible');
        cy.get('.btn-secondary').should('be.visible').click();
        cy.get('#createsend-email').should('be.visible').click();
        cy.get('.modal-header').contains('Send Email').should('be.visible');
        cy.get('.border').should('be.visible');
        cy.get('#emailSubject').should('be.visible');
        cy.get('#text').should('be.visible');
        cy.get('.btn-secondary').should('be.visible').click();
        cy.get('form.ng-pristine > :nth-child(2) > .form-control').should('be.visible'); 
        cy.get('.btn-secondary').should('be.visible').click();
    

        cy.get('#create').should('be.visible').click();
        cy.get('#abp-modal-header').contains('Create New Lead').should('be.visible');
        cy.get('#series').should('be.visible');
        cy.get('#firstName').should('be.visible');
        cy.get('#lastName').should('be.visible');
        cy.get('#Status').should('be.visible');
        cy.get('#gender').should('be.visible');
        cy.get(':nth-child(2) > .singleselect > .multiselect-dropdown > :nth-child(1) > .dropdown-btn').should('be.visible');
        cy.get('#email').should('be.visible');
        cy.get('#mobile').should('be.visible');
        cy.get(':nth-child(2) > :nth-child(4) > .form-control').should('be.visible');
        cy.get('#whatsApp').should('be.visible');
        cy.get('#website').should('be.visible');
        cy.get(':nth-child(2) > :nth-child(4) > .form-control').should('be.visible');
        cy.get('#nextActicvityDateTime').should('be.visible');
        cy.get(':nth-child(2) > .mt-2 > .singleselect > .multiselect-dropdown > :nth-child(1) > .dropdown-btn').should('be.visible');
        cy.get('#nextConversationDescription').should('be.visible');
        cy.get('.btn-secondary').should('be.visible').click();

       
        cy.get('#cancel').should('be.visible');
        cy.get('#confirm').should('be.visible').click();
        cy.get('.py-1').contains('Leads').should('be.visible'); // Page header
    });
});
