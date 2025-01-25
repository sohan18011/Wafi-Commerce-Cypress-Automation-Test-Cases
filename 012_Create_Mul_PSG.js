// cypress/e2e/CreateMultipleProductSubGroups.cy.js

describe('Create Multiple Product Sub-Groups', () => {
    before(() => {
        // Load tenant data from fixture
        cy.fixture('lastTenant.json').then((data) => {
            cy.wrap(data).as('tenantData'); // Save fixture data as an alias
        });
    });

    beforeEach(function() {
        cy.get('@tenantData').then((tenantData) => {
            // Visit the login page
            cy.visit('https://app.waficommerce.com/');

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

    it('should create multiple product sub-groups', () => {
        const subGroups = [
            { productGroupName: 'Electronics', name: 'Mobile Phones', description: 'Smartphones and feature phones.' },
            { productGroupName: 'Electronics', name: 'Laptops', description: 'Personal and business laptops.' },
            { productGroupName: 'Electronics', name: 'Audio Devices', description: 'Headphones, speakers, and audio equipment.' },
            { productGroupName: 'Home Appliances', name: 'Kitchen Appliances', description: 'Microwaves, blenders, and other kitchen tools.' },
            { productGroupName: 'Home Appliances', name: 'Laundry Appliances', description: 'Washing machines, dryers, and related items.' },
            { productGroupName: 'Home Appliances', name: 'Air Conditioning', description: 'Air conditioners, fans, and coolers.' },
            { productGroupName: 'Groceries', name: 'Fresh Produce', description: 'Fruits, vegetables, and fresh groceries.' },
            { productGroupName: 'Groceries', name: 'Dairy Products', description: 'Milk, cheese, and other dairy items.' },
            { productGroupName: 'Groceries', name: 'Snacks', description: 'Chips, biscuits, and other snack items.' },
            { productGroupName: 'Clothing', name: 'Men\'s Clothing', description: 'Apparel items for men.' },
            { productGroupName: 'Clothing', name: 'Women\'s Clothing', description: 'Apparel items for women.' },
            { productGroupName: 'Clothing', name: 'Kids\' Clothing', description: 'Clothing for children and infants.' },
            { productGroupName: 'Office Supplies', name: 'Stationery', description: 'Pens, paper, and other office stationery.' },
            { productGroupName: 'Office Supplies', name: 'Office Furniture', description: 'Desks, chairs, and office furniture.' },
            { productGroupName: 'Office Supplies', name: 'Computer Accessories', description: 'Mice, keyboards, and other peripherals.' }
        ];

        subGroups.forEach(subGroup => {
            cy.visit('https://app.waficommerce.com/product/sub-groups');

            // Click the "Create New Product Sub-Group" button
            cy.get('.lpx-content > app-product-sub-group > .card > .card-header > .row > .text-end > .text-lg-end > #create').click();
            cy.wait(2000);

            // Fill in the details
            cy.get('#ProductGroupDropdown').select(subGroup.productGroupName);
            cy.get(':nth-child(3) > #productSubGroup-name').type(subGroup.name);
            cy.get('#productSubGroup-description').type(subGroup.description);

            // Save the product sub-group
            cy.get('#abp-modal-footer > .btn-primary').contains('Save').click();
            cy.wait(5000); // Wait for the product sub-group to be created

            // Verify the product sub-group is created
            cy.contains(subGroup.name).should('be.visible');

            // Wait for a short period to avoid rate limits or performance issues
            cy.wait(1000);
        });
    });
});
