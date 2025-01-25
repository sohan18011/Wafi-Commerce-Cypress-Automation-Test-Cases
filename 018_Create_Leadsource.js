// cypress/e2e/TestCase_026.cy.js

import LoginPage from '../../support/Page_Objects/LoginPage';
import LeadSourcePage from '../../support/Page_Objects/LeadSourcePage'; // Ensure the path is correct

describe('Create Lead Source', () => {
    const loginPage = new LoginPage();
    const leadSourcePage = new LeadSourcePage(); // Instantiate LeadSourcePage

    beforeEach(() => {
        // Load tenant credentials from the fixture file and log in
        cy.fixture('lastTenant.json').then((tenantData) => {
            cy.login(tenantData.tenantName, tenantData.username, tenantData.password);
        });
    });

    it('should create a new lead source', () => {
        leadSourcePage.navigateToLeadSourcesPage();
        leadSourcePage.clickNewLeadSourceButton();
        leadSourcePage.enterSourceName('Automated Lead Source');
        leadSourcePage.saveLeadSource();
        leadSourcePage.verifyLeadSourceCreated('Automated Lead Source');
    });
});
