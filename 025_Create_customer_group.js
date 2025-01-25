// cypress/integration/createCustomerGroup.spec.js
import LoginPage from '../../support/Page_Objects/LoginPage';
import CustomerGroupsPage from '../../support/Page_Objects/customerGroupsPage';


describe('Create New Customer Group', () => {
  const loginPage = new LoginPage();
  const customerGroupsPage = new CustomerGroupsPage();

  beforeEach(() => {
    // Load tenant credentials from the fixture file and log in
    cy.fixture('lastTenant.json').then((tenantData) => {
        cy.login(tenantData.tenantName, tenantData.username, tenantData.password);
    });
});

  it('should create a new customer group', () => {
    customerGroupsPage.visit();
    
    // Click the button to create a new customer group
    customerGroupsPage.clickNewCustomerGroupButton();

    // Fill out the form
    customerGroupsPage.fillForm('Test Customer Group', 'This is a test description.');

    // Submit the form
    customerGroupsPage.submitForm();

    // Verify the customer group was created
   

    // Optionally, you can also verify the new customer group appears in the list
    customerGroupsPage.verifyCustomerGroupInList('Test Customer Group');
  });
});
