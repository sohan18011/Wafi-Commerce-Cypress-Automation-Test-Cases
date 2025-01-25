// cypress/integration/createFiscalYear.spec.js
import LoginPage from "../../support/Page_Objects/LoginPage";
import FiscalYearsPage from "../../support/Page_Objects/fiscalYearsPage";
describe('Create New Fiscal Year', () => {
  const loginPage = new LoginPage();
  const fiscalYearsPage = new FiscalYearsPage();

  beforeEach(() => {
    // Load tenant credentials from the fixture file and log in
    cy.fixture('lastTenant.json').then((tenantData) => {
        cy.login(tenantData.tenantName, tenantData.username, tenantData.password);
    });
});


  it('should create a new fiscal year', () => {
    fiscalYearsPage.visit();

    // Click the button to create a new fiscal year
    fiscalYearsPage.clickNewFiscalYearButton();

    // Fill out the form
    const name = 'FY 2024';
    const fromDate = '01/01/2024';
    const toDate = '12/31/2024';
    const comment = 'Fiscal Year for 2024';
    fiscalYearsPage.fillForm(name, fromDate, toDate, comment);

    // Submit the form
    fiscalYearsPage.submitForm();
    cy.get('#confirm').click();
    // Verify the fiscal year was created
   
    // Optionally, you can also verify the new fiscal year appears in the list
    fiscalYearsPage.verifyFiscalYearInList(name);
  });
});
