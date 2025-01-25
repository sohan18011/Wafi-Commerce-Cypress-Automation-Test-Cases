describe('Sales Report Generation', () => {
    let formattedDate;
    let startDate;
    let endDate;

    let totalSales = 0;
    let totalAmount = 0;
    let totalCount = 0;
    let salesInfo = '';

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

    it('should generate sales report for the current month and write to a text file', () => {
        // Visit the sales report page
        cy.visit('https://app.waficommerce.com/sales');
        cy.wait(3000);

        // Filter the sales data for the current month
        cy.get(':nth-child(3) > .form-control').clear().type(startDate); // Start date field
        cy.get(':nth-child(4) > .form-control').clear().type(endDate); // End date field
        cy.get(':nth-child(5) > .form-control').click(); // Filter button

        // Wait for the page to load and data to appear
        cy.wait(5000);

        // Capture the total sales count, total amount, and other relevant sales information
        
        cy.get('report-page-selector > :nth-child(2)')
            .then($salesInfo => {
                const totalSalesText = $salesInfo.text();
                cy.log(`Total Sales Info: ${totalSalesText}`);
                totalSales = totalSalesText;  // Capture total sales value
            });

        // Extract sales data from the page and write all cards' information to the report
        cy.visit('https://app.waficommerce.com/');
        cy.get(':nth-child(6) > wafi-card > .card > .card-body > .row > .col-12')
            .invoke('text')
            .then((text) => {
                cy.log(`Info from first card: ${text}`);
                salesInfo += `Info from first card: ${text}\n`; // Append to sales info
            });

        cy.get(':nth-child(5) > wafi-card > .card > .card-body > .row > .col-12')
            .invoke('text')
            .then((text) => {
                cy.log(`Info from second card: ${text}`);
                salesInfo += `Info from second card: ${text}\n`; // Append to sales info
            });

        cy.get(':nth-child(4) > wafi-card > .card > .card-body > .row > .col-12 > :nth-child(1)')
            .invoke('text')
            .then((text) => {
                cy.log(`Info from third card: ${text}`);
                salesInfo += `Info from third card: ${text}\n`; // Append to sales info
            });

        cy.get(':nth-child(2) > wafi-card > .card > .card-body > .row > .col-12 > :nth-child(1)')
            .invoke('text')
            .then((text) => {
                cy.log(`Info from fourth card: ${text}`);
                salesInfo += `Info from fourth card: ${text}\n`; // Append to sales info
            });

        cy.get(':nth-child(1) > wafi-card > .blue-color > .card-body > .row > .col-12 > :nth-child(1)')
            .invoke('text')
            .then((text) => {
                cy.log(`Info from fifth card: ${text}`);
                salesInfo += `Info from fifth card: ${text}\n`; // Append to sales info
            });

        // Write the sales report data to a text file
        cy.writeFile('cypress/results/sales_reportssss.txt', 
            `Sales Report for Wafi Publication (${formattedDate})\n\n` +
            `Total Sales: ${totalSales}\n` +
            `Total Amount: ${totalAmount}\n` +
            `Total Sales Count: ${totalCount}\n` +
            `Sales Data:\n` +
            `${salesInfo}`
        );
    });
});
