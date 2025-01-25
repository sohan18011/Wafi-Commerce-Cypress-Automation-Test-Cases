// cypress/e2e/CreateMultipleUnitsOfMeasurement.cy.js

describe('Create Multiple Units of Measurement', () => {
    before(() => {
        // Load tenant data from fixture
        cy.fixture('lastTenant.json').then((data) => {
            cy.wrap(data).as('tenantData'); // Save fixture data as an alias
        });
    });

    beforeEach(function () {
        cy.get('@tenantData').then((tenantData) => {
            cy.visit('/');

            // Login
            cy.get('.px-4').should('be.visible').click(); // Click the login button
            cy.wait(2000);
            cy.get('#AbpTenantSwitchLink').click(); // Open tenant switch modal
            cy.wait(2000);
            cy.get('#Input_Name').type(tenantData.tenantName); // Type tenant name from fixture
            cy.get('.modal-footer > .btn-primary').click(); // Confirm tenant
            cy.wait(2000);
            cy.get('#LoginInput_UserNameOrEmailAddress').type(tenantData.username); // Enter username from fixture
            cy.get('#LoginInput_Password').type(tenantData.password); // Enter password from fixture
            cy.get('.btn-lg').click(); // Submit login form
            cy.wait(5000); // Wait for login to complete
        });
    });

    it('should create multiple units of measurement', () => {
        const unitsOfMeasurement = [
            { name: 'Piece', description: 'Individual item or unit' },
            { name: 'Kilogram (kg)', description: 'Metric unit of mass equal to 1,000 grams' },
            { name: 'Liter (L)', description: 'Metric unit of volume equal to 1,000 cubic centimeters' },
            { name: 'Meter (m)', description: 'Metric unit of length equal to 100 centimeters' },
            { name: 'Gram (g)', description: 'Metric unit of mass equal to 1/1,000 kilogram' },
            { name: 'Milliliter (mL)', description: 'Metric unit of volume equal to 1/1,000 liter' },
            { name: 'Box', description: 'Container holding multiple items' },
            { name: 'Roll', description: 'Unit of measurement for rolled materials like paper or fabric' },
            { name: 'Packet', description: 'Small pack of items, usually in bulk' },
            { name: 'Dozen', description: 'A set of twelve items' }
        ];
        cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(8) > :nth-child(1) > :nth-child(1) > .lpx-menu-item-text').click();
        cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(8) > :nth-child(1) > .lpx-inner-menu > :nth-child(1) > lpx-sub-navbar > .lpx-menu-item-link > .lpx-menu-item-text').click();
        unitsOfMeasurement.forEach(unit => {


            // Click the "Create New Unit" button
            cy.get('.lpx-content > app-unit-of-measurement > :nth-child(2) > .card-body > .row > .text-end > #filter-button').click();

            // Fill in the details
            cy.get(':nth-child(1) > .form-control').type(unit.name);
            cy.get(':nth-child(2) > .form-control').type(unit.description);

            // Save the unit
            cy.get('.btn-primary').contains('Save').click();

            // Verify the unit is created
            cy.contains(unit.name).should('be.visible');

            // Wait for a short period to avoid rate limits or performance issues
            cy.wait(1000);
        });
    });
});
