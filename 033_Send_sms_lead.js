import LoginPage from '../../support/Page_Objects/LoginPage';

describe('Send SMS to Multiple Leads', () => {
    const loginPage = new LoginPage();
    beforeEach(() => {
      // Load tenant credentials from the fixture file and log in
      cy.fixture('lastTenant.json').then((tenantData) => {
          cy.login(tenantData.tenantName, tenantData.username, tenantData.password);
      });
  });


    it('Visit Leads page and send SMS', () => {
      // Visit the leads page
      cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(9) > :nth-child(1) > :nth-child(1) > .lpx-menu-item-text').click();
      cy.get('.lpx-nav > lpx-navbar-routes > .lpx-nav-menu > :nth-child(9) > :nth-child(1) > .lpx-inner-menu > :nth-child(2) > lpx-sub-navbar > .lpx-menu-item-link > .lpx-menu-item-text').click();
      cy.wait(6000); // Wait for the page to load

    
     
      cy.get('.visible > .datatable-body > datatable-selection > .datatable-scroll > :nth-child(1) > .datatable-body-row > .datatable-row-center > [style="width: 30px; height: auto;"] > .datatable-body-cell-label > .datatable-checkbox > input').click();
      cy.wait(6000);
      
      cy.get('.lpx-content > app-lead > .card.p-2 > .justify-content-between > .d-flex > :nth-child(2) > #createsend-sms').click();
      cy.wait(2000);
      cy.get('#text').type("This is a test message for sending SMS to multiple leads")
      cy.wait(2000);
      // Step 4: Click the Send button to send the message
      cy.get('.modal-footer > .btn-primary').click();

      // Optional: Validate that the message was sent successfully
      
    });
});
