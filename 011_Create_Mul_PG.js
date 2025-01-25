describe('Create Multiple Product Groups', () => {
    before(() => {
        // Load tenant data from fixture
        cy.fixture('lastTenant.json').then((data) => {
            cy.wrap(data).as('tenantData'); // Save fixture data as an alias
        });
    });

    beforeEach(function () {
        cy.get('@tenantData').then((tenantData) => {
            // Visit the login page
            cy.visit('/');

            // Perform login
            cy.get('.px-4').should('be.visible').click(); // Click the login button
            cy.wait(2000);
            cy.get('#AbpTenantSwitchLink').click(); // Open the tenant switch modal
            cy.wait(2000);
            cy.get('#Input_Name').type(tenantData.tenantName); // Type the tenant name from fixture
            cy.get('.modal-footer > .btn-primary').click(); // Click the submit button
            cy.wait(2000);
            cy.get('#LoginInput_UserNameOrEmailAddress').type(tenantData.username); // Enter username from fixture
            cy.get('#LoginInput_Password').type(tenantData.password); // Enter password from fixture
            cy.get('.btn-lg').click(); // Submit login form
            cy.wait(5000); // Wait for login to complete
        });

    });

    it('should create multiple product groups', () => {
        const productGroups = [
            { code: '1001', name: 'Electronics', description: 'Group for all electronic devices and accessories.' },
            { code: '1002', name: 'Home Appliances', description: 'Includes all major and minor home appliances.' },
            { code: '1003', name: 'Groceries', description: 'Covers food, beverages, and everyday grocery items.' },
            { code: '1004', name: 'Clothing', description: 'Apparel and fashion items for men, women, and kids.' },
            { code: '1005', name: 'Office Supplies', description: 'Office stationery, furniture, and supplies.' }
        ];
        cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(4) > :nth-child(1) > :nth-child(1) > .lpx-menu-item-text').click();
        cy.wait(2000);
        cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(4) > :nth-child(1) > :nth-child(2) > :nth-child(3) > lpx-sub-navbar > .lpx-menu-item-link > .lpx-menu-item-text').click();

        productGroups.forEach((group, index) => {
            // Navigate to product groups page
            cy.visit('/product-groups');


            // Click the button to create a new product group
            cy.get('.lpx-content > app-product-group > .card > .card-header > .row > .text-end > .text-lg-end > #create').click();
            cy.wait(2000);

            // Fill in the details for the product group
            cy.get(':nth-child(1) > #productGroup-name').type(group.code); // Enter the product group code
            cy.get(':nth-child(2) > #productGroup-name').type(group.name); // Enter the product group name
            cy.get('#productGroup-description').type(group.description); // Enter the product group description

            // Save the product group
            cy.get('.btn-primary').contains('Save').click(); // Click the "Save" button
            cy.wait(5000); // Wait for the product group to be created

            // Verify the product group is created
            cy.contains(group.name).should('be.visible'); // Verify the product group was created by checking for the name

            // Wait for 60 seconds before creating the next product group
            if (index < productGroups.length - 1) {
                cy.wait(6000); // Wait for 60 seconds before creating the next product group
            }
        });
    });
});