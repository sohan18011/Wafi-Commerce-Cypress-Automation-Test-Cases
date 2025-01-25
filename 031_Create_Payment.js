import LoginPage from '../../support/Page_Objects/LoginPage';
import PaymentPage from '../../support/Page_Objects/PaymentPage';

describe('Create New Payment', () => {
    const loginPage = new LoginPage();
    const paymentPage = new PaymentPage();

    beforeEach(() => {
        // Load tenant credentials from the fixture file and log in
        cy.fixture('lastTenant.json').then((tenantData) => {
            cy.login(tenantData.tenantName, tenantData.username, tenantData.password);
        });
    });

    it('should create a new payment successfully', () => {
        // Navigate to the payments page
        paymentPage.navigateToPaymentsPage();
        paymentPage.clickNewPaymentButton(); // Ensure this method is now defined
        paymentPage.selectSupplier('Akhtar Trading');
        cy.wait(2000);
        // Start the new payment process
    
        paymentPage.enterCashPayment('500');
        cy.wait(2000);
        paymentPage.enterBankPayment('500');
        cy.wait(2000);
    // Replace with actual bank account name
        paymentPage.enterComment('Payment for the purchase of products.');
        cy.wait(2000);
        // Save the payment
        paymentPage.savePayment();

        // Verify the payment is created
        // You may need to define a specific way to verify if the payment was created, 
        // for example, using a reference code or some other identifier.
        // Replace 'PAYMENT_CODE' with actual expected payment code if needed.
        
    });
});
