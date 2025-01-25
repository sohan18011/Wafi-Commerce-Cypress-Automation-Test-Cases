const fs = require('fs'); // Import Node.js file system module

describe('Monthly Entry Check', () => {
    let formattedDate;
    let startDate;
    let endDate;

    let salesCount = 0;
    let purchaseCount = 0;
    let voucherCount = 0;
    let totalEntries = 0;

    before(() => {
        // Get the current month and year
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1; // Month is zero-based, so add 1
        const lastDayOfMonth = new Date(year, month, 0).getDate(); // Get the last day of the month

        // Format the start and end dates for the current month
        const startOfMonth = `${year}-${month.toString().padStart(2, '0')}-01T00:00`;
        const endOfMonth = `${year}-${month.toString().padStart(2, '0')}-${lastDayOfMonth}T23:59`;
        formattedDate = `${year}-${month.toString().padStart(2, '0')}`;

        startDate = startOfMonth;
        endDate = endOfMonth;

        cy.log('Logging in to the application');
        cy.visit('https://app.waficommerce.com/');
        cy.wait(2000);
        cy.get('.px-4').click();

        // Wait and interact with the tenant switch link
        cy.get('#AbpTenantSwitchLink').click();
        cy.get('#Input_Name').type('Wafi Publication');
        cy.get('.modal-footer > .btn-primary').click();
        cy.wait(2000);

        // Enter credentials and submit
        cy.get('#LoginInput_UserNameOrEmailAddress').type(Cypress.env('LOGIN_USERNAME') || 'admin');
        cy.get('#LoginInput_Password').type(Cypress.env('ADMIN_PASSWORD') || '1q2w3E*');
        cy.get('button[type="submit"]').click();

        cy.wait(5000);
    });

    it('should check the number of sales, vouchers, and purchases ', () => {
        
});
});
