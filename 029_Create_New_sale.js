import LoginPage from '../../support/Page_Objects/LoginPage';
import SalePage from '../../support/Page_Objects/SalePage';

describe('Create New Sale with New Customer', () => {
    const loginPage = new LoginPage();
    const salePage = new SalePage();
    
    beforeEach(() => {
        // Load tenant credentials from the fixture file and log in
        cy.fixture('lastTenant.json').then((tenantData) => {
            cy.login(tenantData.tenantName, tenantData.username, tenantData.password);
        });
    });

    it('should create a new sale with a new customer successfully', () => {
        cy.wait(20000); // Navigate to the sales page
        salePage.navigateToSalesPage();
        cy.wait(20000);
        // Start the new sale process
        salePage.clickNewSaleButton();

        // Fill in the sale details
        const referenceNumber = 'REF' + Date.now(); // Unique reference number
        salePage.enterReferenceNumber(referenceNumber);

        // Add a new customer with a unique name
        const newCustomerName = 'Customer-' + Date.now(); // Unique customer name
        salePage.addNewCustomer(newCustomerName);

        // Select the first available options from the dropdowns
       // Select sale made by
        salePage.selectWarehouse(); // Select warehouse
        salePage.selectProduct(); // Select product
        cy.wait(2000);
        // Input cash and bank amounts
        salePage.inputCashAmount('500');
        cy.wait(2000); // Input the cash amount
        salePage.inputBankAmount('500'); // Input the bank amount
        cy.wait(2000);
        // Save the sale
        salePage.saveSale();
        cy.wait(2000);
        // Optional: Add verification if necessary
        // For example, you could verify the sale appears in a sales list with the reference number
        // Verify that the sale is listed with the reference number
    });
});
