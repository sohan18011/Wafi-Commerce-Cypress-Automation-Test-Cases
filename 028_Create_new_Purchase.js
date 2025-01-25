import LoginPage from '../../support/Page_Objects/LoginPage';
import PurchasePage from '../../support/Page_Objects/PurchasePage';

describe('Create New Purchase', () => {
    const loginPage = new LoginPage();
    const purchasePage = new PurchasePage();

    beforeEach(() => {
        // Load tenant credentials from the fixture file and log in
        cy.fixture('lastTenant.json').then((tenantData) => {
            cy.login(tenantData.tenantName, tenantData.username, tenantData.password);
        });
    });

    it('should create a new purchase successfully', () => {
        // Define the names for dropdown selection
        const warehouseName = 'Central Distribution Hub'; // Existing warehouse name
        const productName = 'Blender Pro'; // Existing product name
        const supplierName = 'Akhtar Trading'; // Existing supplier name

        // Navigate to the purchases page
        purchasePage.navigateToPurchasesPage();
        cy.wait(20000);
        // Start the new purchase process
        purchasePage.clickNewPurchaseButton();
        cy.wait(20000);
        // Fill in the purchase details
       
       
        // Fill in the date
        purchasePage.enterDescription('Purchase of electronics for project A');
        purchasePage.selectSupplier(supplierName); // Select the supplier
        purchasePage.selectWarehouse(warehouseName); 
        cy.wait(2000);// Select the warehouse
        purchasePage.selectProduct(productName); // Select the product

        // Fill in the payment details
        purchasePage.enterCashPayment('500');
        cy.wait(2000);
        purchasePage.enterBankPayment('500');
        cy.wait(2000);
        // Save the purchase
        purchasePage.savePurchase();
        cy.wait(2000);
        // Verify the purchase is created using the reference number
  
    });
});
