// cypress/e2e/login_and_create_project.cy.js

import LoginPage from '../../support/Page_Objects/LoginPage';
import ProjectPage from '../../support/Page_Objects/ProjectPage';
import { generateUniqueProjectName } from '../../support/utils';

describe('User Login and Create Project', () => {
    const loginPage = new LoginPage();
    const projectPage = new ProjectPage();

    beforeEach(() => {
        // Load tenant credentials from the fixture file and log in
        cy.fixture('lastTenant.json').then((tenantData) => {
            cy.login(tenantData.tenantName, tenantData.username, tenantData.password);
        });
    });


    it('should allow creation of a new project', () => {
        // Navigate to the projects page
        projectPage.navigateToProjectsPage();

        // Click the "New Project" button
        projectPage.clickNewProjectButton();

        // Generate a unique project name starting with "Automated"
        const uniqueProjectName = generateUniqueProjectName();

        // Fill out project details
        const projectStatus = 'New';
        const projectLeadEmployee = 'John Doe';
        const projectDescription = 'This is a test project';

        projectPage.fillProjectDetails(uniqueProjectName, projectStatus, projectLeadEmployee, projectDescription);

        // Save the project
        projectPage.saveProject();

        // Verify the project is created
        projectPage.verifyProjectCreated(uniqueProjectName);
    });
});
