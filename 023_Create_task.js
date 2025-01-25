// cypress/e2e/CreateNewTask.cy.js

import LoginPage from '../../support/Page_Objects/LoginPage';
import TaskPage from '../../support/Page_Objects/TaskPage';
import { generateUniqueTitle } from '../../support/utils'; // Assuming you have a utility to generate unique titles

describe('Create New Task', () => {
    const loginPage = new LoginPage();
    const taskPage = new TaskPage();

    beforeEach(() => {
        // Load tenant credentials from the fixture file and log in
        cy.fixture('lastTenant.json').then((tenantData) => {
            cy.login(tenantData.tenantName, tenantData.username, tenantData.password);
        });
    });

    it('should create a new task', () => {
        taskPage.navigateToTasksPage();

        taskPage.clickNewTaskButton();

        const uniqueTitle = generateUniqueTitle('Task');
        taskPage.selectProject('Project A'); // Adjust as needed
        taskPage.enterTitle(uniqueTitle);
        taskPage.enterDescription('This is a test task description.');
    
        taskPage.selectEmployee(); // Adjust as needed

        taskPage.saveTask();

        // Verify that the task is created
        taskPage.verifyTaskCreated(uniqueTitle);
    });
});
