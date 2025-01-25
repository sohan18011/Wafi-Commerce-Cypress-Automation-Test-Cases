describe('Login and Create Multiple Accounts', () => {
    let tenantName;
    let username;
    let password;

    const accounts = [
        { name: 'Default Purchase Account', description: 'Default Purchase Account Description', subGroupName: 'Purchase' },
        { name: 'Default COGS Account', description: 'Default COGS Account Description', subGroupName: 'COGS' },
        { name: 'Default Conversion Expense', description: 'Default Conversion Expense Description', subGroupName: 'Indirect Expense' },
        { name: 'Default Conversion Gain/Loss', description: 'Default Conversion Gain/Loss Description', subGroupName: 'Conversion gain' },
        { name: 'Default Sales Account', description: 'Default Sales Account', subGroupName: 'Product Sales' },
        { name: 'Default Employee Payable Account', description: 'Default Employee Payable Account Description', subGroupName: 'Payables' },
        { name: 'Default Stock Account', description: 'Default Stock Account Description', subGroupName: 'Stock' },
        { name: 'Default Royalty Expense', description: 'Default Royalty Expense Description', subGroupName: 'Admin Salaries' },
        { name: 'Payables - Akhtar Trading', description: 'Payables - Akhtar Trading Description', subGroupName: 'Payables' },
        { name: 'Payables - Rahman Suppliers', description: 'Payables - Rahman Suppliers Description', subGroupName: 'Payables' },
        { name: 'Payables - Farid Enterprise', description: 'Payables - Farid Enterprise Description', subGroupName: 'Payables' },
        { name: 'Payables - Nahar Distributors', description: 'Payables - Nahar Distributors Description', subGroupName: 'Payables' },
        { name: 'Payables - Islam Brothers', description: 'Payables - Islam Brothers Description', subGroupName: 'Payables' },
        { name: 'Payables - Karim & Sons', description: 'Payables - Karim & Sons Description', subGroupName: 'Payables' },
        { name: 'Payables - Ali Corporation', description: 'Payables - Ali Corporation Description', subGroupName: 'Payables' },
        { name: 'Payables - Kabir Trading', description: 'Payables - Kabir Trading Description', subGroupName: 'Payables' },
        { name: 'Payables - Zaman Suppliers', description: 'Payables - Zaman Suppliers Description', subGroupName: 'Payables' },
        { name: 'Payables - Hossain Enterprises', description: 'Payables - Hossain Enterprises Description', subGroupName: 'Payables' },
        { name: 'Payables - Openning Supplier', description: 'Payables - Openning Supplier Description', subGroupName: 'Payables' },
        { name: 'Default Cash Account', description: 'Default Cash Account Description', subGroupName: 'Cash' },
        { name: 'Default Bank Account', description: 'Default Bank Account Description', subGroupName: 'Bank' }
    ];

    const login = (tenantName, username, password) => {
        cy.visit('/');
        cy.wait(2000);
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
        cy.wait(5000); // Wait for login to complete
    };

    const navigateToAccountsPage = () => {
        cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(3) > :nth-child(1) > :nth-child(1) > .lpx-menu-item-text').click();
        cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(3) > :nth-child(1) > :nth-child(2) > :nth-child(4) > lpx-sub-navbar > .lpx-menu-item-link > .lpx-menu-item-text').click();
        cy.wait(5000); // Increased wait time to ensure the page fully loads
    };

    const createAccount = (name, description, subGroupName) => {
        cy.get('.lpx-content > app-accounts > .card > .card-header > .row > .text-lg-end > #create').click();
        cy.get('#account-name').type(name);
        cy.get('#account-description').type(description);

        // Open the sub-group dropdown and select the provided sub-group name
        cy.get('.ng-select-container').click();
        cy.contains('.ng-option', subGroupName).click();

        // Check if the account is "Default Cash Account" and click the corresponding checkbox
        if (name.includes('Cash Account')) {
            cy.get('#account-iscash').check();  // Check the "Is Cash Account" checkbox
        }

        // Check if the account is "Default Bank Account" and click the corresponding checkbox
        if (name.includes('Bank Account')) {
            cy.get('#account-isbank').check();  // Check the "Is Bank Account" checkbox
        }

        cy.get('.btn-primary').contains('Save').click();
    };

    const verifyAccountCreated = (name) => {
        cy.get('.lpx-content > app-accounts > .card > .card-body') // Adjust this selector to match your application's structure
            .contains(name)
            .should('exist'); // Verify the account was created
    };

    before(() => {
        // Load the tenant details from the fixture file
        cy.fixture('lastTenant.json').then((tenantData) => {
            tenantName = tenantData.tenantName;
            username = tenantData.username;
            password = tenantData.password;
            expect(tenantName).to.not.be.undefined;
            expect(username).to.not.be.undefined;
            expect(password).to.not.be.undefined;
        }).then(() => {
            // Perform login with the loaded details
            login(tenantName, username, password);
        });
    });

    it('should create multiple accounts one after another', () => {
        navigateToAccountsPage();

        accounts.forEach(account => {
            createAccount(account.name, account.description, account.subGroupName);
            verifyAccountCreated(account.name);
            cy.wait(1000); // Wait for a short period to avoid performance issues or rate limits
        });
    });
});
