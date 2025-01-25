describe('Create Multiple Products', () => {
    before(() => {
        // Load credentials from fixtures
        cy.fixture('lastTenant').then((credentials) => {
            cy.visit('/');

            // Login
            cy.get('.px-4').click(); // Click the login button
            cy.wait(2000);
            cy.get('#AbpTenantSwitchLink').click(); // Open tenant switch modal
            cy.wait(2000);
            cy.get('#Input_Name').type(credentials.tenantName); // Type tenant name from JSON
            cy.get('.modal-footer > .btn-primary').click(); // Confirm tenant
            cy.wait(2000);
            cy.get('#LoginInput_UserNameOrEmailAddress').type(credentials.username); // Username from JSON
            cy.get('#LoginInput_Password').type(credentials.password); // Password from JSON
            cy.get('.btn-lg').click(); // Submit login form
        });
    });

    it('should create multiple products', () => {
        const products = [
            { group: 'Electronics', subGroup: 'Mobile Phones', name: 'Smartphone X1', code: 'AutoGen-001', customerCode: 'CUST-001', description: 'Latest smartphone with advanced features.', mrp: 50000, unit: 'Piece', wholesaleDiscount: 10, wholesalePrice: 45000, retailDiscount: 5, retailPrice: 47500, purchasePrice: 40000, reorderLevel: 50 },
            { group: 'Electronics', subGroup: 'Mobile Phones', name: 'Smartphone X2', code: 'AutoGen-002', customerCode: 'CUST-002', description: 'High-performance smartphone.', mrp: 60000, unit: 'Piece', wholesaleDiscount: 12, wholesalePrice: 52800, retailDiscount: 7, retailPrice: 55800, purchasePrice: 48000, reorderLevel: 30 },
            { group: 'Electronics', subGroup: 'Laptops', name: 'Laptop Pro 15', code: 'AutoGen-003', customerCode: 'CUST-003', description: 'Powerful laptop for professionals.', mrp: 80000, unit: 'Piece', wholesaleDiscount: 15, wholesalePrice: 68000, retailDiscount: 8, retailPrice: 73600, purchasePrice: 65000, reorderLevel: 20 },
            { group: 'Electronics', subGroup: 'Laptops', name: 'Laptop Air 13', code: 'AutoGen-004', customerCode: 'CUST-004', description: 'Lightweight and portable laptop.', mrp: 70000, unit: 'Piece', wholesaleDiscount: 10, wholesalePrice: 63000, retailDiscount: 5, retailPrice: 66500, purchasePrice: 60000, reorderLevel: 25 },
            { group: 'Electronics', subGroup: 'Audio Devices', name: 'Bluetooth Speaker Z1', code: 'AutoGen-005', customerCode: 'CUST-005', description: 'Portable Bluetooth speaker with clear sound.', mrp: 3000, unit: 'Piece', wholesaleDiscount: 8, wholesalePrice: 2760, retailDiscount: 5, retailPrice: 2850, purchasePrice: 2500, reorderLevel: 100 },
            { group: 'Electronics', subGroup: 'Audio Devices', name: 'Wireless Headphones Q1', code: 'AutoGen-006', customerCode: 'CUST-006', description: 'Noise-cancelling wireless headphones.', mrp: 7000, unit: 'Piece', wholesaleDiscount: 10, wholesalePrice: 6300, retailDiscount: 7, retailPrice: 6510, purchasePrice: 6000, reorderLevel: 50 },
            { group: 'Home Appliances', subGroup: 'Kitchen Appliances', name: 'Microwave Oven 20L', code: 'AutoGen-007', customerCode: 'CUST-007', description: '20-liter microwave with auto-cook features.', mrp: 8000, unit: 'Piece', wholesaleDiscount: 12, wholesalePrice: 7040, retailDiscount: 5, retailPrice: 7600, purchasePrice: 7000, reorderLevel: 40 },
            { group: 'Home Appliances', subGroup: 'Kitchen Appliances', name: 'Blender Pro', code: 'AutoGen-008', customerCode: 'CUST-008', description: 'High-power blender for quick blending.', mrp: 4000, unit: 'Piece', wholesaleDiscount: 10, wholesalePrice: 3600, retailDiscount: 5, retailPrice: 3800, purchasePrice: 3500, reorderLevel: 60 },
            { group: 'Home Appliances', subGroup: 'Laundry Appliances', name: 'Front Load Washer 7kg', code: 'AutoGen-009', customerCode: 'CUST-009', description: 'Efficient washing machine with 7kg capacity.', mrp: 20000, unit: 'Piece', wholesaleDiscount: 15, wholesalePrice: 17000, retailDiscount: 8, retailPrice: 18400, purchasePrice: 16000, reorderLevel: 15 },
            { group: 'Home Appliances', subGroup: 'Laundry Appliances', name: 'Dryer 6kg', code: 'AutoGen-010', customerCode: 'CUST-010', description: 'Compact dryer with 6kg capacity.', mrp: 15000, unit: 'Piece', wholesaleDiscount: 10, wholesalePrice: 13500, retailDiscount: 5, retailPrice: 14250, purchasePrice: 12500, reorderLevel: 20 },
            { group: 'Home Appliances', subGroup: 'Air Conditioning', name: 'Air Conditioner 1.5T', code: 'AutoGen-011', customerCode: 'CUST-011', description: '1.5-ton air conditioner with energy saving.', mrp: 25000, unit: 'Piece', wholesaleDiscount: 12, wholesalePrice: 22000, retailDiscount: 6, retailPrice: 23500, purchasePrice: 21000, reorderLevel: 10 },
            { group: 'Home Appliances', subGroup: 'Air Conditioning', name: 'Table Fan', code: 'AutoGen-012', customerCode: 'CUST-012', description: 'Adjustable table fan for cooling.', mrp: 1500, unit: 'Piece', wholesaleDiscount: 8, wholesalePrice: 1380, retailDiscount: 5, retailPrice: 1425, purchasePrice: 1300, reorderLevel: 100 },
            { group: 'Groceries', subGroup: 'Fresh Produce', name: 'Apple 1kg', code: 'AutoGen-013', customerCode: 'CUST-013', description: 'Fresh apples, 1kg pack.', mrp: 300, unit: 'kg', wholesaleDiscount: 5, wholesalePrice: 285, retailDiscount: 3, retailPrice: 291, purchasePrice: 270, reorderLevel: 200 },
            { group: 'Groceries', subGroup: 'Fresh Produce', name: 'Bananas 1kg', code: 'AutoGen-014', customerCode: 'CUST-014', description: 'Ripe bananas, 1kg pack.', mrp: 200, unit: 'kg', wholesaleDiscount: 4, wholesalePrice: 192, retailDiscount: 2, retailPrice: 196, purchasePrice: 180, reorderLevel: 150 },
            { group: 'Groceries', subGroup: 'Dairy Products', name: 'Cheddar Cheese 200g', code: 'AutoGen-015', customerCode: 'CUST-015', description: 'Premium quality cheddar cheese.', mrp: 500, unit: 'Piece', wholesaleDiscount: 8, wholesalePrice: 460, retailDiscount: 4, retailPrice: 480, purchasePrice: 450, reorderLevel: 50 },
            { group: 'Groceries', subGroup: 'Dairy Products', name: 'Milk 1L', code: 'AutoGen-016', customerCode: 'CUST-016', description: 'Fresh milk, 1-liter pack.', mrp: 80, unit: 'Liter', wholesaleDiscount: 5, wholesalePrice: 76, retailDiscount: 3, retailPrice: 77, purchasePrice: 70, reorderLevel: 100 },
            { group: 'Groceries', subGroup: 'Snacks', name: 'Potato Chips 100g', code: 'AutoGen-017', customerCode: 'CUST-017', description: 'Crispy potato chips, 100g pack.', mrp: 150, unit: 'Pack', wholesaleDiscount: 7, wholesalePrice: 140, retailDiscount: 5, retailPrice: 143, purchasePrice: 130, reorderLevel: 150 },
            { group: 'Groceries', subGroup: 'Snacks', name: 'Biscuits 200g', code: 'AutoGen-018', customerCode: 'CUST-018', description: 'Assorted biscuits, 200g pack.', mrp: 200, unit: 'Pack', wholesaleDiscount: 10, wholesalePrice: 180, retailDiscount: 6, retailPrice: 188, purchasePrice: 170, reorderLevel: 100 },
            
        ];
        cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(4) > :nth-child(1) > :nth-child(1) > .lpx-menu-item-text').click();
        cy.wait(2000);
        cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(4) > :nth-child(1) > :nth-child(2) > :nth-child(5) > lpx-sub-navbar > .lpx-menu-item-link > .lpx-menu-item-text').click();
        cy.wait(2000);
        products.forEach(product => {
            
            cy.wait(1000);

            // Click the "Create New Product" button
            cy.get('.lpx-content > app-product > .card > .card-header > :nth-child(1) > .text-lg-end > #create').click();

            // Fill in the details
            cy.get('#product-group').select(product.group);
            cy.get('#product-subgroup').select(product.subGroup);
            cy.get('#product-name').type(product.name);
            cy.get('#product-description').type(product.description);
             // Assuming there's an input for product code
            cy.get('#customer-item-code').type(product.customerCode);
            cy.get('#retail-price').type(product.mrp);
           
            cy.get(':nth-child(9) > #retail-discount').type(product.wholesaleDiscount);
           
            cy.get(':nth-child(11) > #retail-discount').type(product.retailDiscount);
          
            cy.get(':nth-child(13) > #product-purchase').type(product.purchasePrice);
            cy.get('#product-reOrderLevel').type(product.reorderLevel);

            // Save the product
            cy.get('.btn-primary').contains('Save').click();

            // Verify the product is created
            cy.contains(product.name).should('be.visible');

            // Wait for a short period to avoid rate limits or performance issues
            cy.wait(10000);
        });
    });
});
