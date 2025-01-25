import LoginPage from '../../support/Page_Objects/LoginPage';
import PurchasePage from '../../support/Page_Objects/PurchasePage';

describe('Create Multiple Purchases', () => {
    const loginPage = new LoginPage();
    const purchasePage = new PurchasePage();

    const purchases = [
        {
            warehouseName: 'Central Distribution Hub',
            productName: 'Blender Pro',
            supplierName: 'Akhtar Trading',
            description: 'Purchase of electronics for project A',
            cashPayment: '100',
            bankPayment: '100',
        },
        {
            warehouseName: 'Central Distribution Hub',
            productName: 'Laptop Pro 15',
            supplierName: 'Akhtar Trading',
            description: 'Purchase of kitchen appliances for project B',
            cashPayment: '100',
            bankPayment: '100',
        },
        {
            warehouseName: 'Central Distribution Hub',
            productName: 'Table Fan',
            supplierName: 'Akhtar Trading',
            description: 'Purchase of smart TVs for project C',
            cashPayment: '100',
            bankPayment: '700',
        },
    ];

    beforeEach(() => {
        // Load tenant credentials from the fixture file and log in
        cy.fixture('lastTenant.json').then((tenantData) => {
            cy.login(tenantData.tenantName, tenantData.username, tenantData.password);
        });
    });

    purchases.forEach((purchase, index) => {
        it(`should create purchase ${index + 1} successfully`, () => {
            cy.wait(2000);
            // Navigate to the purchases page
            purchasePage.navigateToPurchasesPage();
            cy.wait(2000);

            // Start the new purchase process
            purchasePage.clickNewPurchaseButton();
            cy.wait(2000);

            // Fill in the purchase details
            // Generate a unique reference number for each purchase
            
            purchasePage.enterDescription(purchase.description);
            
            purchasePage.selectSupplier(purchase.supplierName);
            purchasePage.selectWarehouse(purchase.warehouseName);
            purchasePage.selectProduct(purchase.productName);
           
            
            // Fill in the payment details
            purchasePage.enterCashPayment(purchase.cashPayment);
            cy.wait(2000);
            purchasePage.enterBankPayment(purchase.bankPayment);
            cy.wait(2000);
            // Save the purchase
            purchasePage.savePurchase();
            cy.wait(2000);
            // Verify the purchase is created using the reference number
           
        });
       
    });
});
