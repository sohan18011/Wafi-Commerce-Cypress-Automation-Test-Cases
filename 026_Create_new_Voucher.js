import LoginPage from '../../support/Page_Objects/LoginPage';
import VoucherPage from '../../support/Page_Objects/VoucherPage';

describe('Create Various Vouchers Sequentially', () => {
    const loginPage = new LoginPage();
    const voucherPage = new VoucherPage();

    beforeEach(() => {
        // Load tenant credentials from the fixture file and log in
        cy.fixture('lastTenant.json').then((tenantData) => {
            cy.login(tenantData.tenantName, tenantData.username, tenantData.password);
        });
    });


    it('should create different types of vouchers one after another', () => {
        // Define the voucher details for each type
        const vouchers = [
            { category: 'Cash Payment', refNumber: 'CPV/2024/09/0001', description: 'Cash Payment Voucher', amount: '200' },
            { category: 'Bank Payment', refNumber: 'BPV/2024/09/0001', description: 'Bank Payment Voucher', amount: '300' },
            { category: 'Cash Receive', refNumber: 'CRV/2024/09/0001', description: 'Cash Receive Voucher', amount: '40000' },
            { category: 'Bank Receive', refNumber: 'BRV/2024/09/0001', description: 'Bank Receive Voucher', amount: '500000' },
            
        ];

        // Loop through the voucher details and create each one
        vouchers.forEach((voucher, index) => {
            voucherPage.navigateToVouchersPage();
            voucherPage.createVoucher(voucher.category, voucher.refNumber, voucher.description, voucher.amount);
            if (index < vouchers.length - 1) {
                cy.wait(5000); // Wait for 5 seconds before creating the next voucher
            }
        });
    });
});
