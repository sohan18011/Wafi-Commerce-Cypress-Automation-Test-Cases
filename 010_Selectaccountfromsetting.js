// Correct import path
import LoginPage from '../../support/Page_Objects/LoginPage'; // Adjust the import path if necessary

// Initialize loginPage before the test suite
const loginPage = new LoginPage();

describe('Select Dropdown Options on Settings Management Page', () => {
    before(() => {
        cy.fixture('lastTenant.json').then((tenantData) => {
            // Log in using the LoginPage class
            loginPage.visit();
            loginPage.clickLoginButton();
            loginPage.selectTenant(tenantData.tenantName);
            loginPage.enterUsername(tenantData.username);
            loginPage.enterPassword(tenantData.password);
            loginPage.submit();
        });
    });

    it('Visit Settings Management Page and Select Dropdown Options', () => {
        // Visit the settings management page after login
        cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(10) > :nth-child(1) > :nth-child(1) > .lpx-menu-item-text').click();

        cy.wait(1000); // Wait for the page to fully load
        cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(10) > :nth-child(1) > :nth-child(2) > :nth-child(2) > lpx-sub-navbar > .lpx-menu-item-link > .lpx-menu-item-text').click();
        cy.get('.lpx-content > abp-router-outlet > abp-replaceable-route-container > abp-setting-management > abp-page > #SettingManagementWrapper > .card > .card-body > :nth-child(1) > .col-md-9 > .tab-content > #Accounts-tab > app-account-settings > :nth-child(1) > .row > :nth-child(1) > #Voucher-Type > .ng-select-container > .ng-clear-wrapper').click();

        // Step 1: Click on the dropdown button to open the dropdown
        cy.get('.lpx-content > abp-router-outlet > abp-replaceable-route-container > abp-setting-management > abp-page > #SettingManagementWrapper > .card > .card-body > :nth-child(1) > .col-md-9 > .tab-content > #Accounts-tab > app-account-settings > :nth-child(1) > .row > :nth-child(2) > #Customer-Account-Sub-Group > .multiselect-dropdown > :nth-child(1) > .dropdown-btn')
            .click();  // Open the dropdown

        // Step 2: Ensure the dropdown list is visible
        cy.get('#Customer-Account-Sub-Group > div > div.dropdown-list')
            .should('be.visible');  // Wait until the dropdown list is visible

        // Step 3: Find and click the exact item
        cy.get('#Customer-Account-Sub-Group > div > div.dropdown-list > ul.item2 > li:nth-child(3) > div')
            .should('be.visible')  // Ensure the element is visible
            .click({ multiple: true, force: true });
        cy.wait(1000);  // Click on multiple elements if found

        cy.get('.lpx-content > abp-router-outlet > abp-replaceable-route-container > abp-setting-management > abp-page > #SettingManagementWrapper > .card > .card-body > :nth-child(1) > .col-md-9 > .tab-content > #Accounts-tab > app-account-settings > :nth-child(1) > .row > :nth-child(3) > #Author-Account-Sub-Group > .multiselect-dropdown > :nth-child(1) > .dropdown-btn').click();
        cy.get('#Author-Account-Sub-Group > div > div.dropdown-list')
            .should('be.visible');
        cy.get('#Author-Account-Sub-Group> div > div.dropdown-list > ul.item2 > li:nth-child(2) > div')
            .should('be.visible')  // Ensure the element is visible
            .click({ multiple: true, force: true });
        cy.wait(1000);


        cy.get('.lpx-content > abp-router-outlet > abp-replaceable-route-container > abp-setting-management > abp-page > #SettingManagementWrapper > .card > .card-body > :nth-child(1) > .col-md-9 > .tab-content > #Accounts-tab > app-account-settings > :nth-child(1) > .row > :nth-child(5) > #Stock-Account > .multiselect-dropdown > :nth-child(1) > .dropdown-btn').click();  // Open the dropdown

        cy.get('#Stock-Account > div > div.dropdown-list')
            .should('be.visible');
        cy.get('#Stock-Account > div > div.dropdown-list > ul.item2 > li:nth-child(3) > div')
            .should('be.visible')
            .click({ multiple: true, force: true });
        cy.wait(1000);


        cy.get('.lpx-content > abp-router-outlet > abp-replaceable-route-container > abp-setting-management > abp-page > #SettingManagementWrapper > .card > .card-body > :nth-child(1) > .col-md-9 > .tab-content > #Accounts-tab > app-account-settings > :nth-child(1) > .row > :nth-child(6) > #COGS-Account > .multiselect-dropdown > :nth-child(1) > .dropdown-btn').click();
        cy.get('#COGS-Account > div > div.dropdown-list')
            .should('be.visible');
        cy.get('#COGS-Account > div > div.dropdown-list > ul.item2 > li:nth-child(1) > div')
            .should('be.visible')
            .click({ multiple: true, force: true });
        cy.wait(1000);

        cy.get('.lpx-content > abp-router-outlet > abp-replaceable-route-container > abp-setting-management > abp-page > #SettingManagementWrapper > .card > .card-body > :nth-child(1) > .col-md-9 > .tab-content > #Accounts-tab > app-account-settings > :nth-child(1) > .row > :nth-child(7) > #Cash-Account > .multiselect-dropdown > :nth-child(1) > .dropdown-btn').click();
        cy.get('#Cash-Account > div > div.dropdown-list')
            .should('be.visible');
        cy.get('#Cash-Account > div > div.dropdown-list > ul.item2 > li:nth-child(1) > div')
            .should('be.visible')
            .click({ multiple: true, force: true });
        cy.wait(1000);


        cy.get('.lpx-content > abp-router-outlet > abp-replaceable-route-container > abp-setting-management > abp-page > #SettingManagementWrapper > .card > .card-body > :nth-child(1) > .col-md-9 > .tab-content > #Accounts-tab > app-account-settings > :nth-child(1) > .row > :nth-child(8) > #Bank-Account > .multiselect-dropdown > :nth-child(1) > .dropdown-btn').click();
        cy.get('#Bank-Account > div > div.dropdown-list')
            .should('be.visible');
        cy.get('#Bank-Account > div > div.dropdown-list > ul.item2 > li:nth-child(1) > div')
            .should('be.visible')
            .click({ multiple: true, force: true });
        cy.wait(1000);


        cy.get('.lpx-content > abp-router-outlet > abp-replaceable-route-container > abp-setting-management > abp-page > #SettingManagementWrapper > .card > .card-body > :nth-child(1) > .col-md-9 > .tab-content > #Accounts-tab > app-account-settings > :nth-child(1) > .row > :nth-child(9) > #Employee-Payable-Account > .multiselect-dropdown > :nth-child(1) > .dropdown-btn').click();
        cy.get('#Employee-Payable-Account > div > div.dropdown-list')
            .should('be.visible');
        cy.get('#Employee-Payable-Account > div > div.dropdown-list > ul.item2 > li:nth-child(1) > div')
            .should('be.visible')
            .click({ multiple: true, force: true });
        cy.wait(1000);


        cy.get('.lpx-content > abp-router-outlet > abp-replaceable-route-container > abp-setting-management > abp-page > #SettingManagementWrapper > .card > .card-body > :nth-child(1) > .col-md-9 > .tab-content > #Accounts-tab > app-account-settings > :nth-child(1) > .row > :nth-child(10) > #Expense-Account > .multiselect-dropdown > :nth-child(1) > .dropdown-btn').click();
        cy.get('#Expense-Account > div > div.dropdown-list')
            .should('be.visible');
        cy.get('#Expense-Account > div > div.dropdown-list > ul.item2 > li:nth-child(1) > div')
            .should('be.visible')
            .click({ multiple: true, force: true });
        cy.wait(1000);



        cy.get('.lpx-content > abp-router-outlet > abp-replaceable-route-container > abp-setting-management > abp-page > #SettingManagementWrapper > .card > .card-body > :nth-child(1) > .col-md-9 > .tab-content > #Accounts-tab > app-account-settings > :nth-child(1) > .row > :nth-child(11) > #Sales-Account > .multiselect-dropdown > :nth-child(1) > .dropdown-btn').click();
        cy.get('#Sales-Account > div > div.dropdown-list')
            .should('be.visible');
        cy.get('#Sales-Account > div > div.dropdown-list > ul.item2 > li:nth-child(1) > div')
            .should('be.visible')
            .click({ multiple: true, force: true });
        cy.wait(1000);


        cy.get('.lpx-content > abp-router-outlet > abp-replaceable-route-container > abp-setting-management > abp-page > #SettingManagementWrapper > .card > .card-body > :nth-child(1) > .col-md-9 > .tab-content > #Accounts-tab > app-account-settings > :nth-child(1) > .row > :nth-child(12) > #Purchase-Account > .multiselect-dropdown > :nth-child(1) > .dropdown-btn').click();
        cy.get('#Purchase-Account > div > div.dropdown-list')
            .should('be.visible');
        cy.get('#Purchase-Account > div > div.dropdown-list > ul.item2 > li:nth-child(3) > div')
            .should('be.visible')
            .click({ multiple: true, force: true });
        cy.wait(1000);

        cy.get('.lpx-content > abp-router-outlet > abp-replaceable-route-container > abp-setting-management > abp-page > #SettingManagementWrapper > .card > .card-body > :nth-child(1) > .col-md-9 > .tab-content > #Accounts-tab > app-account-settings > :nth-child(1) > .row > :nth-child(13) > #Conversion-Expense > .multiselect-dropdown > :nth-child(1) > .dropdown-btn').click();
        cy.get('#Conversion-Expense > div > div.dropdown-list')
            .should('be.visible');
        cy.get('#Conversion-Expense > div > div.dropdown-list > ul.item2 > li:nth-child(3) > div')
            .should('be.visible')
            .click({ multiple: true, force: true });
        cy.wait(1000);

        cy.get('.lpx-content > abp-router-outlet > abp-replaceable-route-container > abp-setting-management > abp-page > #SettingManagementWrapper > .card > .card-body > :nth-child(1) > .col-md-9 > .tab-content > #Accounts-tab > app-account-settings > :nth-child(1) > .row > :nth-child(14) > #Conversion-Gain-Loss > .multiselect-dropdown > :nth-child(1) > .dropdown-btn').click();
        cy.get('#Conversion-Gain-Loss > div > div.dropdown-list')
            .should('be.visible');
        cy.get('#Conversion-Gain-Loss > div > div.dropdown-list > ul.item2 > li:nth-child(3) > div')
            .should('be.visible')
            .click({ multiple: true, force: true });
        cy.wait(1000);

        cy.get('.lpx-content > abp-router-outlet > abp-replaceable-route-container > abp-setting-management > abp-page > #SettingManagementWrapper > .card > .card-body > :nth-child(1) > .col-md-9 > .tab-content > #Accounts-tab > app-account-settings > :nth-child(1) > .row > :nth-child(15) > #Royalty-Expense > .multiselect-dropdown > :nth-child(1) > .dropdown-btn').click();
        cy.get('#Royalty-Expense > div > div.dropdown-list')
            .should('be.visible');
        cy.get('#Royalty-Expense > div > div.dropdown-list > ul.item2 > li:nth-child(6) > div')
            .should('be.visible')
            .click({ multiple: true, force: true });
        cy.wait(1000);

        cy.get('.lpx-content > abp-router-outlet > abp-replaceable-route-container > abp-setting-management > abp-page > #SettingManagementWrapper > .card > .card-body > :nth-child(1) > .col-md-9 > .tab-content > #Accounts-tab > app-account-settings > :nth-child(1) > :nth-child(5) > .btn').click();
        cy.get('#confirm').click();
        cy.wait(1000);

    });
});
