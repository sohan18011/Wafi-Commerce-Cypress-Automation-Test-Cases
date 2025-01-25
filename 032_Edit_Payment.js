import LoginPage from '../../support/Page_Objects/LoginPage';

describe('Edit an Existing Payment', () => {
    const loginPage = new LoginPage();

    beforeEach(() => {
        // Load tenant credentials from the fixture file and log in
        cy.fixture('lastTenant.json').then((tenantData) => {
            cy.login(tenantData.tenantName, tenantData.username, tenantData.password);
        });
    });

    it('should edit an existing payment successfully', () => {
       
       
    });
});
