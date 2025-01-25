describe('Create Multiple Warehouses', () => {
    before(() => {
        // Load credentials from the fixture file
        cy.fixture('lastTenant.json').then((credentials) => {
            // Visit the login page
            cy.visit('/');
            
            // Perform login
            cy.get('.px-4').click(); // Click the login button
            cy.wait(2000);
            cy.get('#AbpTenantSwitchLink').click(); // Open the tenant switch modal
            cy.wait(2000);
            cy.get('#Input_Name').type(credentials.tenantName); // Type the tenant name from the fixture
            cy.get('.modal-footer > .btn-primary').click(); // Click the submit button
            cy.wait(2000);
            cy.get('#LoginInput_UserNameOrEmailAddress').type(credentials.username); // Enter username from the fixture
            cy.get('#LoginInput_Password').type(credentials.password); // Enter password from the fixture
            cy.get('.btn-lg').click(); // Submit login form
            cy.wait(5000); // Wait for login to complete
        });
    });

    it('should create multiple warehouses', () => {
        const warehouses = [
            { name: 'Central Distribution Hub', address: '123 Main St, Dhaka, Bangladesh', description: 'Main distribution center for central Dhaka area.' },
            { name: 'North Zone Warehouse', address: '456 North Ave, Chattogram, Bangladesh', description: 'Warehouse serving the northern region.' },
            { name: 'South Coast Depot', address: '789 Coastal Rd, Cox\'s Bazar, Bangladesh', description: 'Storage and shipping center near the coast.' },
            { name: 'East Regional Warehouse', address: '321 Eastern Blvd, Sylhet, Bangladesh', description: 'Primary warehouse for eastern operations.' },
            { name: 'West City Storage', address: '654 Western St, Rajshahi, Bangladesh', description: 'Storage facility for western city deliveries.' }
        ];
        cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(4) > :nth-child(1) > :nth-child(1) > .lpx-menu-item-text').click();
        cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(4) > :nth-child(1) > :nth-child(2) > :nth-child(6) > lpx-sub-navbar > .lpx-menu-item-link > .lpx-menu-item-text').click();
        warehouses.forEach((warehouse, index) => {
            // Navigate to warehouses page
            
            
            // Click the button to create a new warehouse
            cy.get('.lpx-content > app-warehouse > .card > .card-header > .row > .text-end > .text-lg-end > #create').click();
            cy.wait(2000);

            // Fill in the details for the warehouse
            cy.get('#warehouse-name').type(warehouse.name); // Enter the warehouse name
            cy.get('#warehouse-address').type(warehouse.address); // Enter the warehouse address
            cy.get('#warehouse-comment').type(warehouse.description); // Enter the warehouse description
            
            // Save the warehouse
            cy.get('#abp-modal-footer > .btn-primary').click(); // Click the "Save" button
            cy.wait(5000); // Wait for the warehouse to be created

            // Verify the warehouse is created
            cy.contains(warehouse.name).should('be.visible'); // Verify the warehouse was created by checking for the warehouse name

            // Wait for 60 seconds before creating the next warehouse
            if (index < warehouses.length - 1) {
                cy.wait(10000); // Wait for 60 seconds before creating the next warehouse
            }
        });
    });
});
