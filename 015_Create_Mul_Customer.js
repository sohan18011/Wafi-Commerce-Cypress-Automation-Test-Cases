// cypress/e2e/createMultipleCustomers.cy.js

import CustomerPage from '../../support/Page_Objects/customerPage';
import LoginPage from '../../support/Page_Objects/LoginPage'; // Adjust import as needed

const loginPage = new LoginPage();
const customerPage = new CustomerPage();

describe('Create Multiple Customers', () => {
    before(() => {
        cy.fixture('lastTenant.json').then((tenantData) => {
            // Log in using the LoginPage class
            loginPage.visit();
            loginPage.clickLoginButton();
            loginPage.selectTenant(tenantData.tenantName);
            loginPage.enterUsername(tenantData.username);
            loginPage.enterPassword(tenantData.password);
            loginPage.submit();
        });
    });

    it('should create multiple customers', () => {
        const customers = [
            { code: 'CUS/2024/08/0001', name: 'Md. Ahsan Ullah', address: '123 Banani, Dhaka', phone: '01792941074', email: 'ahsan.ullah@gmail.com', discount: 0, creditLimit: 50000 },
            { code: 'CUS/2024/08/0002', name: 'Rahima Khatun', address: '45 Gulshan, Dhaka', phone: '01710000002', email: 'rahima.khatun@gmail.com', discount: 0, creditLimit: 60000 },
            { code: 'CUS/2024/08/0003', name: 'Jahangir Hossain', address: '78 Uttara, Dhaka', phone: '01710000003', email: 'jahangir.hossain@gmail.com', discount: 0, creditLimit: 70000 },
            { code: 'CUS/2024/08/0004', name: 'Farzana Sultana', address: '10 Dhanmondi, Dhaka', phone: '01710000004', email: 'farzana.sultana@gmail.com', discount: 0, creditLimit: 40000 },
            { code: 'CUS/2024/08/0005', name: 'Sharif Ahmed', address: '36 Mirpur, Dhaka', phone: '01710000005', email: 'sharif.ahmed@gmail.com', discount: 0, creditLimit: 80000 },
            { code: 'CUS/2024/08/0006', name: 'Laila Begum', address: '22 Badda, Dhaka', phone: '01710000006', email: 'laila.begum@gmail.com', discount: 0, creditLimit: 30000 },
            { code: 'CUS/2024/08/0007', name: 'Tanvir Rahman', address: '55 Baridhara, Dhaka', phone: '01710000007', email: 'tanvir.rahman@gmail.com', discount: 0, creditLimit: 75000 },
            { code: 'CUS/2024/08/0008', name: 'Nusrat Jahan', address: '12 Tejgaon, Dhaka', phone: '01710000008', email: 'nusrat.jahan@gmail.com', discount: 0, creditLimit: 55000 },
            { code: 'CUS/2024/08/0009', name: 'Abul Kalam Azad', address: '44 Mohakhali, Dhaka', phone: '01710000009', email: 'abul.kalam@gmail.com', discount: 0, creditLimit: 65000 },
            { code: 'CUS/2024/08/0010', name: 'Fatema Akter', address: '19 Shyamoli, Dhaka', phone: '01710000010', email: 'fatema.akter@gmail.com', discount: 0, creditLimit: 45000 }
        ];

        customers.forEach(customer => {
            customerPage.navigateTo();
            customerPage.openCreateCustomerModal();
            customerPage.fillCustomerDetails(customer);
            customerPage.saveCustomer();
          

            // Wait for a short period to avoid rate limits or performance issues
            cy.wait(1000);
        });
    });
});
