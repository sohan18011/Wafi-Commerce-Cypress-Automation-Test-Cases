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

    it('should verify task-title field is present and visible', () => {
        taskPage.navigateToTasksPage();

        // Verify the Tasks header
        cy.get('.card-title').contains('Tasks').should('be.visible');
        
        // Check visibility of form control elements
        cy.get('.form-control').should('be.visible');

        // Click the create button
        cy.get('#create').should('be.visible').click();

        // Verify the modal header
        cy.get('h3').contains('New Task')

        // Fill in the form fields
        cy.get(':nth-child(1) > .form-control').should('be.visible') // Assuming this is the project name field
        cy.get('#task-id').should('be.visible'); // Task ID field
        cy.get('#task-title').should('be.visible') // Generate and type unique title
        cy.get('#task-type').should('be.visible') // Task Status field
        cy.get(':nth-child(6) > .form-control').should('be.visible') // Select employee
        cy.get('.btn-secondary').should('be.visible') 
        // Optionally, you can submit the form here if needed
        // cy.get('#submit').click(); // Adjust if there is a submit button

        // Additional assertions can go here, such as verifying the task was created
    });
});
