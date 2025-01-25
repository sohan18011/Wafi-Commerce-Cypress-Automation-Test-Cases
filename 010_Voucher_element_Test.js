import LoginPage from '../../support/Page_Objects/LoginPage';
import VoucherPage from '../../support/Page_Objects/VoucherPage';

describe('Create Voucher with Assertions', () => {
    const loginPage = new LoginPage();
    const voucherPage = new VoucherPage();

    beforeEach(() => {
        // Load tenant credentials and login
        cy.fixture('lastTenant.json').then((tenantData) => {
            cy.login(tenantData.tenantName, tenantData.username, tenantData.password);
        });
    });

    it('should ensure the voucher page loads with all elements visible', () => {
        voucherPage.navigateToVouchersPage();

        // Assertions for various elements on the Voucher Page

        // 1. Assert card title
        cy.get('.card-title').should('be.visible').and('contain.text', 'Vouchers');

        // 2. Assert first input field
        cy.get(':nth-child(1) > .form-control').should('be.visible').and('have.attr', 'placeholder', 'Search with keyword...');
        
        // 3. Assert dropdown for project selection
        cy.get('.dropdown-btn').should('be.visible').and('contain.text', 'Select Project');
        
        // 4-6. Assert visibility of other form controls
        cy.get(':nth-child(3) > .form-control').should('be.visible');
        cy.get(':nth-child(4) > .form-control').should('be.visible');
        cy.get(':nth-child(5) > .form-control').should('be.visible');
        
        // 7. Assert dropdown button content (text might change, adjust accordingly)
        cy.get('#dropdownBasic1').should('be.visible').and('contain.text', 'Export');
        
        // 8. Assert page count is visible and not empty
        cy.get('.page-count').should('be.visible').and('not.be.empty');
        
        // 9-12. Assert radio button labels for voucher types
        cy.get('[for="hbtn-radio1"]').should('be.visible').and('contain.text', '10');
        cy.get('[for="hbtn-radio2"]').should('be.visible').and('contain.text', '25');
        cy.get('[for="hbtn-radio3"]').should('be.visible').and('contain.text', '50');
        cy.get('[for="hbtn-radio4"]').should('be.visible').and('contain.text', '100');

        // 13. Create new voucher
        cy.wait(2000);
        cy.get('#create').click();
        cy.wait(2000);

        // 14. Assert new voucher modal header
        

        // 15. Assert voucher type dropdown
      

        // 16. Assert voucher number field visibility
        cy.get('#vouchar-number').should('be.visible');

        // 17. Assert reference number field visibility
        cy.get('#reference-number').should('be.visible');

        // 18. Assert invalid form control visibility
        cy.get('.ng-dirty.ng-invalid > .row > :nth-child(4) > .form-control').should('be.visible');

        // 19-20. Assert multiple dropdowns for account selection
        cy.get(':nth-child(5) > .singleselect > .multiselect-dropdown > :nth-child(1) > .dropdown-btn').should('be.visible');
        cy.get(':nth-child(6) > .singleselect > .multiselect-dropdown > :nth-child(1) > .dropdown-btn').should('be.visible');

        // 21. Assert account title dropdown visibility
        cy.get('#Account-Title-Container > .singleselect > .multiselect-dropdown > :nth-child(1) > .dropdown-btn').should('be.visible');

        // 22. Assert voucher description field
        cy.get('#voucher-description').should('be.visible').and('have.attr', 'placeholder', 'Enter voucher description');

        // 23. Assert ng-select container visibility
        cy.get('.ng-select-container').should('be.visible');

        // 24. Assert button group for adding rows or items
        cy.get('#btnGroupAddon').should('be.visible').click();
        
        // 25-26. Assert debit/credit amount columns
        cy.get(':nth-child(3) > .narrow-amount-columns').should('be.visible').and('have.value', '0');
        cy.get(':nth-child(4) > .narrow-amount-columns').should('be.visible').and('have.value', '0');

        // 27. Assert details/note section visibility
        cy.get('.details-note').should('be.visible');

        // 28. Assert save button
        cy.get(':nth-child(2) > :nth-child(6) > .btn').should('be.visible');

        // 29. Assert total debit/credit fields visibility
        cy.get('.total-debit').should('be.visible');
        cy.get('.total-credit').should('be.visible');
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
