import LoginPage from '../../support/Page_Objects/LoginPage';
import RolePage from '../../support/Page_Objects/RolePage';
import UserPage from '../../support/Page_Objects/UserPage';
import { generateUniqueRoleName, generateUniqueUsername } from '../../support/utils';

describe('Create Role and User', () => {
    const loginPage = new LoginPage();
    const rolePage = new RolePage();
    const userPage = new UserPage();

    beforeEach(() => {
        // Load tenant credentials from the fixture file and log in
        cy.fixture('lastTenant.json').then((tenantData) => {
            cy.login(tenantData.tenantName, tenantData.username, tenantData.password);
        });
    });


    it('should create a new role and assign it to a new user', () => {
        // Create Role
        rolePage.navigateToRolesPage();

        const uniqueRoleName = generateUniqueRoleName();
        rolePage.clickNewRoleButton();
        rolePage.enterRoleName(uniqueRoleName);
        rolePage.saveRole();
        rolePage.verifyRoleCreated(uniqueRoleName);

        // Create User and Assign Role
        userPage.navigateToUsersPage();
        userPage.clickNewUserButton();
        
        const baseUserName = 'Sohan';
        const uniqueUserName = generateUniqueUsername(baseUserName);
        const userEmail = `${uniqueUserName}@gmail.com`;
        const userPassword = 'Test@123'; // Update as needed
        
        userPage.fillUserDetails(uniqueUserName, uniqueUserName, userEmail, userPassword);
        userPage.saveUser();
        userPage.verifyUserCreated(uniqueUserName);
    });
});
