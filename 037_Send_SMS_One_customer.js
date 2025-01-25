import LoginPage from '../../support/Page_Objects/LoginPage';

const path = require('path');

// Define your SMS content
const smsContent = "This is test purpose message";

describe('Send SMS to Multiple Customers', () => {
    const loginPage = new LoginPage();

    beforeEach(() => {
        // Load tenant credentials from the fixture file and log in
        cy.fixture('lastTenant.json').then((tenantData) => {
            cy.login(tenantData.tenantName, tenantData.username, tenantData.password);
        });
    });

    it('Send SMS to Multiple Customers', () => {
        
        cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(5) > :nth-child(1) > :nth-child(1) > .lpx-menu-item-text').click();
        cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(5) > :nth-child(1) > :nth-child(2) > :nth-child(3) > lpx-sub-navbar > .lpx-menu-item-link > .lpx-menu-item-text').click();
        // Wait for the page to load completely
        cy.wait(5000); // Adjust wait time as needed

        // Click the button to open the SMS interface (Assuming there's a specific button for SMS)
        cy.get('.visible > .datatable-body > datatable-selection > .datatable-scroll > :nth-child(1) > .datatable-body-row > .datatable-row-center > [style="width: 30px; height: auto;"] > .datatable-body-cell-label > .datatable-checkbox > input').click(); // Adjust selector as needed

        // Wait for the SMS interface to open
        cy.wait(3000); // Adjust wait time as needed

        // Click the button to start sending SMS (Assuming there's a button to initiate SMS sending)
        cy.get('.lpx-content > app-customer > .card.p-2 > .justify-content-between > .d-flex > :nth-child(2) > #createsend-sms').click(); // Adjust selector as needed

        // Wait for the SMS form to load
        cy.wait(2000); // Adjust wait time as needed

        // Type the SMS message into the message field
        cy.get('#text').type(smsContent); // Adjust selector as needed

        // Submit the SMS form
        cy.get('.modal-footer > .btn-primary').click(); // Adjust selector as needed

        // Add assertion to verify successful submission if possible
         // Adjust message as needed
    });
});
