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

    it('should verify user is on the projects page after login', () => {
        // Navigate to the projects page
        projectPage.navigateToProjectsPage();
        
        // Verify the page title and elements
        cy.get('.card-title').should('contain', 'Projects');
        cy.get('.page-count').should('be.visible');
        cy.get('[title="Actions"]').should('be.visible');
        cy.get('.form-control').should('be.visible');
    });

    it('should open the "Create Project" modal and verify its elements', () => {
        projectPage.navigateToProjectsPage();

        // Click the "New Project" button
        cy.get('#create').click();
        
        // Verify modal opens and contains expected elements
        cy.get('#abp-modal-header').should('contain', 'Create Project');
        cy.get('#ngb-nav-1').should('contain', 'BOQ');
        cy.get('#ngb-nav-2').should('contain', 'Additional Information');
        cy.get('.btn-secondary').should('contain', 'Close');
        cy.get('#project-name').should('be.visible');
        cy.get('#project-code').should('be.visible');
        cy.get('#project-status').should('be.visible');
        cy.get(':nth-child(4) > #EmployeeLeadDropdown').should('be.visible');
        cy.get('#project-description').should('be.visible');
    });

    it('should verify Bill of Quantity section is displayed correctly', () => {
        projectPage.navigateToProjectsPage();
        cy.get('#create').click();
        
        // Navigate to the "BOQ" tab
        cy.get('#ngb-nav-1').click();
        cy.wait(200);
        
        // Verify Bill of Quantity section
        cy.get('h3.col-6').should('contain', 'Bill of Quantity');
        cy.get('#project-total-amount').should('be.visible');
        cy.get('#project-total-discount').should('be.visible');
        cy.get('#project-payable-amount').should('be.visible');
        cy.get('#ngb-nav-1-panel > .row > :nth-child(3)').should('be.visible');
    });

    it('should verify Additional Information section is displayed correctly', () => {
        projectPage.navigateToProjectsPage();
        cy.get('#create').click();
        
        // Navigate to the "Additional Information" tab
        cy.get('#ngb-nav-2').click();
        
        // Verify Additional Information section
        cy.get('#project-tender-details').should('be.visible');
        cy.get('#project-comments').should('be.visible');
        cy.get('.btn-secondary').should('be.visible').click();
    });

});
