import LoginPage from '../../support/Page_Objects/LoginPage'; // Ensure this path is correct
import BrandPage from '../../support/Page_Objects/BrandPage'; // 

import { generateUniqueBrandName } from '../../support/utils';

describe('Create New Brand', () => {
    const loginPage = new LoginPage();
    const brandPage = new BrandPage();

    before(() => {
        // Load tenant data from fixture
        cy.fixture('lastTenant.json').then((data) => {
            cy.wrap(data).as('tenantData'); // Save fixture data as an alias
        });
    });

    beforeEach(function() {
        // Ensure login before each test using tenant data
        cy.get('@tenantData').then((tenantData) => {
            cy.visit('/');
            cy.get('.px-4').should('be.visible').click(); // Click login button
            cy.wait(2000);
            cy.get('#AbpTenantSwitchLink').click(); // Open tenant switch modal
            cy.wait(2000);
            cy.get('#Input_Name').type(tenantData.tenantName); // Type the tenant name
            cy.get('.modal-footer > .btn-primary').click(); // Click the submit button
            cy.wait(2000);
            cy.get('#LoginInput_UserNameOrEmailAddress').type(tenantData.username); // Enter username
            cy.get('#LoginInput_Password').type(tenantData.password); // Enter password
            cy.get('.btn-lg').click(); // Submit login form
            cy.wait(5000); // Wait for login to complete
        });
    });

    it('should create a new brand', () => {
        brandPage.navigateToBrandsPage();
        
   // Reload the page if necessary

        brandPage.clickNewBrandButton();

        const uniqueBrandName = generateUniqueBrandName('Brand');
        brandPage.enterBrandName(uniqueBrandName);
        brandPage.selectCountry('Bangladesh'); // Adjust as needed
        brandPage.enterLogoURL('https://example.com/logo.png'); // Replace with an actual URL
        brandPage.enterRemarks('Test remark for brand creation.');
        brandPage.enterDescription('This is a test brand created for automation purposes.');
        brandPage.saveBrand();

        // Verify that the brand is created
        brandPage.verifyBrandCreated(uniqueBrandName);
    });
});
