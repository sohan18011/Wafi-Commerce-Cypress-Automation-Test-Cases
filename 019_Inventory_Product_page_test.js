describe('Product Page Elements Test', () => {
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
            cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(4) > :nth-child(1) > :nth-child(1) > .lpx-menu-item-text').click(); // Navigate to Product Groups
            cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(4) > :nth-child(1) > :nth-child(2) > :nth-child(5) > lpx-sub-navbar > .lpx-menu-item-link > .lpx-menu-item-text').click(); // Navigate to Products
        });
    });

    
    it('should verify visibility of essential elements on the Product Page', () => {
        cy.get('.card-title').contains('Products').should('be.visible');
        cy.get('.form-control').should('be.visible');
        cy.get('#dropdownBasic1').should('be.visible');
        cy.get('#create').should('be.visible').click();
        // Verify visibility of various elements on the Product Page
        cy.get('#abp-modal-header').contains('New Product').should('be.visible'); // Header
        cy.get('#product-group').should('be.visible'); // Product Group
        cy.get('#product-subgroup').should('be.visible'); // Product Subgroup
        cy.get('#product-name').should('be.visible'); // Product Name
        cy.get('#product-code').should('be.visible'); // Product Code
        cy.get('#customer-item-code').should('be.visible'); // Customer Item Code
        cy.get('#product-description').should('be.visible'); // Product Description
        cy.get('#retail-price').should('be.visible'); // Retail Price
        cy.get('.row > :nth-child(8) > .form-control').should('be.visible'); // Retail Field
        cy.get(':nth-child(11) > #retail-discount').should('be.visible'); // Retail Discount
        cy.get('#product-reOrderLevel').should('be.visible'); // Reorder Level
        cy.get('#wholesale-sale').should('be.visible'); // Wholesale Sale
        cy.get('.row > #Is-Service-Type > .form-check-input').should('be.visible').click(); // Service Type Checkbox
        cy.get('.col-4 > :nth-child(1) > #Is-Service-Type > .form-check-input').should('be.visible').click(); // Service Type Checkbox
        cy.get('.ng-select-container').should('be.visible'); // Select Container
        cy.get('#isbn').should('be.visible'); // ISBN
        cy.get('#gsm').should('be.visible'); // GSM
        cy.get(':nth-child(5) > .mt-2 > #publicationDate').should('be.visible'); // Publication Date
        cy.get(':nth-child(6) > .mt-2 > #publicationDate').should('be.visible'); // Publication Date
        cy.get(':nth-child(7) > #medium').should('be.visible'); // Medium
        cy.get(':nth-child(8) > #product-purchase').should('be.visible'); // Product Purchase
        cy.get('#printLength').should('be.visible'); // Print Length
        cy.get(':nth-child(10) > .mt-2 > #medium').should('be.visible'); // Medium
        cy.get(':nth-child(11) > .mt-2 > #medium').should('be.visible'); 
        cy.get('.btn-secondary').should('be.visible').click();// Medium
        cy.get('#confirm').should('be.visible')
        cy.get('#cancel').should('be.visible')
        cy.get('#confirm').should('be.visible').click();
        cy.get('.card-title').contains('Products').should('be.visible');
    });
});