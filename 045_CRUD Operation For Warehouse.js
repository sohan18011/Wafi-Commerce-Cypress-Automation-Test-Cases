describe('Warehouse CRUD Operations', () => {
    let tenantName, username, password;

    // Load credentials from the fixture file before running the tests
    before(() => {
        cy.fixture('lastTenant.json').then((credentials) => {
            tenantName = credentials.tenantName;
            username = credentials.username;
            password = credentials.password;
        });
    });

    // Login before each test case
    beforeEach(() => {
        cy.visit('/');
        cy.get('.px-4').click();
        cy.wait(2000);
        cy.get('#AbpTenantSwitchLink').click();
        cy.wait(2000);
        cy.get('#Input_Name').type(tenantName);
        cy.get('.modal-footer > .btn-primary').click();
        cy.wait(2000);
        cy.get('#LoginInput_UserNameOrEmailAddress').type(username);
        cy.get('#LoginInput_Password').type(password);
        cy.get('.btn-lg').click();
        cy.wait(5000); // Wait for the dashboard to load

        // Navigate to the Warehouse page
        cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(4) > :nth-child(1) > :nth-child(1) > .lpx-menu-item-text').click();
        cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(4) > :nth-child(1) > :nth-child(2) > :nth-child(6) > lpx-sub-navbar > .lpx-menu-item-link > .lpx-menu-item-text').click();
        cy.wait(3000);
    });

    const warehouseData = {
        name: 'Test1 Warehouse',
        address: '123 Cypress St, Dhaka, Bangladesh',
        description: 'Test description for warehouse',
    };

    const updatedWarehouseData = {
        name: 'Updated Warehouse',
        address: '456 Updated St, Dhaka, Bangladesh',
        description: 'Updated description for warehouse',
    };

    // CREATE Warehouse
    it('should create a new warehouse', () => {
        cy.get('#create').click();
        cy.wait(2000);

        // Fill in warehouse details
        cy.get('#warehouse-name').type(warehouseData.name);
        cy.get('#warehouse-address').type(warehouseData.address);
        cy.get('#warehouse-comment').type(warehouseData.description);

        // Save the new warehouse
        cy.get('#abp-modal-footer > .btn-primary').click();
        cy.wait(3000);

        // Verify that the warehouse was created successfully
        cy.contains(warehouseData.name).should('be.visible');
        cy.contains(warehouseData.address).should('be.visible');
    });

    // READ (VERIFY) Warehouse
    it('should verify the created warehouse', () => {
       
    });

    // UPDATE Warehouse
    it('should update an existing warehouse', () => {
        
    });

    // DELETE Warehouse
    it('should delete the updated warehouse', () => {
        
    });
});
