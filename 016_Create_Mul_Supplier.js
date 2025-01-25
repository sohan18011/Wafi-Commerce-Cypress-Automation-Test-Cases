describe('Supplier Creation Automation', () => {
    before(() => {
        cy.fixture('lastTenant.json').then((tenantData) => {
            cy.visit('/');

            // Login
            cy.get('.px-4').click(); // Click the login button
            cy.wait(2000);
            cy.get('#AbpTenantSwitchLink').click(); // Open tenant switch modal
            cy.wait(2000);
            cy.get('#Input_Name').type(tenantData.tenantName); // Type tenant name
            cy.get('.modal-footer > .btn-primary').click(); // Confirm tenant
            cy.wait(2000);
            cy.get('#LoginInput_UserNameOrEmailAddress').type(tenantData.username);
            cy.get('#LoginInput_Password').type(tenantData.password);
            cy.get('.btn-lg').click(); // Submit login form
        });
    });

    it('Create Multiple Suppliers', () => {
        const suppliers = [
            {
                code: 'SUP/2024/08/0001',
                name: 'Akhtar Trading',
                address: '34 Motijheel, Dhaka',
                phoneNumber: '01810000001',
                email: 'akhtar.trading@gmail.com',
                account: 'Payables - Akhtar Trading - 2102002',
                comment: 'N/A'
            },
            {
                code: 'SUP/2024/08/0002',
                name: 'Rahman Suppliers',
                address: '56 Chittagong Road, Dhaka',
                phoneNumber: '01810000002',
                email: 'rahman.suppliers@gmail.com',
                account: 'Payables - Rahman Suppliers - 2102003',
                comment: 'N/A'
            },
            {
                code: 'SUP/2024/08/0003',
                name: 'Farid Enterprise',
                address: '22 Karwan Bazar, Dhaka',
                phoneNumber: '01810000003',
                email: 'farid.enterprise@gmail.com',
                account: 'Payables - Farid Enterprise - 2102004',
                comment: 'N/A'
            },
            {
                code: 'SUP/2024/08/0004',
                name: 'Nahar Distributors',
                address: '78 Gulshan, Dhaka',
                phoneNumber: '01810000004',
                email: 'nahar.distributors@gmail.com',
                account: 'Payables - Nahar Distributors - 2102005',
                comment: 'N/A'
            },
            {
                code: 'SUP/2024/08/0005',
                name: 'Islam Brothers',
                address: '45 Tejgaon, Dhaka',
                phoneNumber: '01810000005',
                email: 'islam.brothers@gmail.com',
                account: 'Payables - Islam Brothers - 2102006',
                comment: 'N/A'
            },
            {
                code: 'SUP/2024/08/0006',
                name: 'Karim & Sons',
                address: '10 Dhanmondi, Dhaka',
                phoneNumber: '01810000006',
                email: 'karim.sons@gmail.com',
                account: 'Payables - Karim & Sons - 2102007',
                comment: 'N/A'
            },
            {
                code: 'SUP/2024/08/0007',
                name: 'Ali Corporation',
                address: '36 Mirpur, Dhaka',
                phoneNumber: '01810000007',
                email: 'ali.corporation@gmail.com',
                account: 'Payables - Ali Corporation - 2102008',
                comment: 'N/A'
            },
            {
                code: 'SUP/2024/08/0008',
                name: 'Kabir Trading',
                address: '66 Banani, Dhaka',
                phoneNumber: '01810000008',
                email: 'kabir.trading@gmail.com',
                account: 'Payables - Kabir Trading - 2102009',
                comment: 'N/A'
            },
            {
                code: 'SUP/2024/08/0009',
                name: 'Zaman Suppliers',
                address: '12 Uttara, Dhaka',
                phoneNumber: '01810000009',
                email: 'zaman.suppliers@gmail.com',
                account: 'Payables - Zaman Suppliers - 2102010',
                comment: 'N/A'
            },
            {
                code: 'SUP/2024/08/0010',
                name: 'Hossain Enterprises',
                address: '29 Shyamoli, Dhaka',
                phoneNumber: '01810000010',
                email: 'hossain.enterprises@gmail.com',
                account: 'Payables - Hossain Enterprises - 2102011',
                comment: 'N/A'
            }
        ];

        // Visit supplier creation page
        cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(6) > :nth-child(1) > :nth-child(1) > .lpx-menu-item-text').click();
        cy.wait(2000);
        cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(6) > :nth-child(1) > .lpx-inner-menu > :nth-child(2) > lpx-sub-navbar > .lpx-menu-item-link > .lpx-menu-item-text').click();
        cy.wait(2000);
        cy.get('.lpx-content > app-supplier > .pb-3 > .card-header > .justify-content-between > .col-lg-2 > :nth-child(1) > #create').click();

        suppliers.forEach((supplier) => {
            cy.get('#supplier-name').type(supplier.name).wait(500);
            cy.get('#supplier-address').type(supplier.address).wait(500);
            cy.get('#supplier-phone').type(supplier.phoneNumber).wait(500);
            cy.get('#supplier-email').type(supplier.email).wait(500);
            cy.get('#AccoutGroupDropdown').select(supplier.account).wait(500); // Use select() instead of click()
            cy.get('#supplier-comment').type(supplier.comment).wait(500);

            cy.get('#abp-modal-footer > .btn-primary').click();
            cy.wait(10000); // Wait for the submission to complete before moving to the next supplier

            // Refresh the page or navigate back to the supplier creation page
            cy.visit('/suppliers');
            cy.get('.lpx-content > app-supplier > .pb-3 > .card-header > .justify-content-between > .col-lg-2 > :nth-child(1) > #create').click();
        });
    });
});
