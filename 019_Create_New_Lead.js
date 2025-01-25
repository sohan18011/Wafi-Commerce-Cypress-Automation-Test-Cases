// cypress/e2e/CreateNewLead.cy.js
import LoginPage from '../../support/Page_Objects/LoginPage';
import LeadPage from '../../support/Page_Objects/LeadPage';

describe('Create New Lead', () => {
    const loginPage = new LoginPage();
    const leadPage = new LeadPage();

    beforeEach(() => {
        // Load tenant credentials from the fixture file and log in
        cy.fixture('lastTenant.json').then((tenantData) => {
            cy.login(tenantData.tenantName, tenantData.username, tenantData.password);
        });
    });

    it('should create a new lead', () => {
        leadPage.navigateToLeadsPage();

        // Wait for the #create button to appear to ensure the page is fully loaded
        cy.get('#create').should('be.visible').click();

        leadPage.selectStatus('1: 1'); // Replace with the actual value for the status
        leadPage.enterEmail('test@example.com');
        leadPage.enterWebsite('https://example.com');
        leadPage.enterFirstName('John');
        leadPage.enterMobileNumber('01521380282');
        leadPage.enterLastName('Doe');
        leadPage.selectLeadSource('Automated Lead Source'); // Replace with the actual lead source value
       
        // Replace with the actual employee name
        
        leadPage.saveLead();
        leadPage.verifyLeadCreated('John Doe'); // Replace with the expected lead code
    });
});