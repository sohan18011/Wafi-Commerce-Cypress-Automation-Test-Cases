describe('Product Transaction Page Elements Test', () => {
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

            // Navigate to the Product Transaction Page (update selector if necessary)
            cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(4) > :nth-child(1) > :nth-child(1) > .lpx-menu-item-text').click();
            cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(4) > :nth-child(1) > :nth-child(2) > :nth-child(8) > :nth-child(1) > :nth-child(1) > .lpx-menu-item-text').click(); 
            cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(4) > :nth-child(1) > :nth-child(2) > :nth-child(8) > :nth-child(1) > .lpx-inner-menu > :nth-child(1) > lpx-sub-navbar > .lpx-menu-item-link > .lpx-menu-item-text').click();// Example navigation path
        });
    });

    it('should verify visibility of essential elements on the Product Transaction Page', () => {
        // Verify visibility of various elements on the Product Transaction Page
       
        cy.get('.py-1').contains('Product Transactions').should('be.visible'); // Page title
        cy.get(':nth-child(1) > .form-control').should('be.visible'); // Search input
        cy.get(':nth-child(2) > .form-control').should('be.visible');
        cy.get(':nth-child(3) > .singleselect > .ng-select-container').should('be.visible');
        cy.get(':nth-child(5) > .form-control').should('be.visible');
        cy.get('#dropdownBasic1').should('be.visible');
        
        cy.get('.page-count').should('be.visible'); // Page count display
        cy.get(':nth-child(3) > .singleselect > .ng-select-container').click()
      
       
        // Verify elements within Create Transaction form if applicable
       
    });
});
