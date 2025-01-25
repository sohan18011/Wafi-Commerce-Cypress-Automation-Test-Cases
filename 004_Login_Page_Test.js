// cypress/integration/loginScreen.spec.js
describe('WafiCommerce Login Screen Tests', () => {
    beforeEach(() => {
        cy.visit('/'); // Visit the login page before each test
    });

    it('TC_Login_001: Verify Welcome Message', () => {
        cy.get('.d-inline-block') // Selector for the welcome message
            .should('be.visible')
            .and('contain.text', 'Welcome to WafiCommerce !!');
    });

    it('TC_Login_002: Verify Greeting Message', () => {
        cy.get('h1') // Selector for the greeting message
            .should('be.visible')
            .and('contain.text', 'Welcome');
    });

    it('TC_Login_003: Verify Tagline', () => {
        cy.get('.lead') // Selector for the tagline
            .should('be.visible')
            .and('contain.text', 'With WafiCommerce, Do More Business with Less Headache!');
    });

    it('TC_Login_004: Verify Account Invitation Message', () => {
        cy.get('.lead') // Selector for the account invitation message
            .should('be.visible')
            .and('contain.text', "Don't have account? Knock us for one to start for FREE!!");
    });

    it('TC_Login_005: Verify Login Button', () => {
        cy.get('.px-4') // Selector for the login button
            .should('be.visible')
            .and('contain.text', 'Login'); // Adjust expected text as necessary
    });

    it('TC_Login_006: Verify Redirection After Clicking Login Button', () => {
        cy.get('.px-4').click(); // Click the login button

        // Wait for the new page to load
        cy.wait(2000); // You may adjust this time as necessary

        // Check if the new page is loaded
        cy.get('.card.mb-3 > .card-body') // Selector for an element on the new page
            .should('be.visible'); // Ensure it is visible
    });

    it('TC_Login_007: Verify Username Input Field', () => {
        cy.get('.px-4').click(); 
        cy.wait(2000);
        cy.get('#LoginInput_UserNameOrEmailAddress') // Selector for username input
            .should('be.visible'); // Check for placeholder text
    });

    it('TC_Login_008: Verify Password Input Field', () => {
        cy.get('.px-4').click(); 
        cy.wait(2000);
        cy.get('#LoginInput_Password') // Selector for password input
            .should('be.visible');// Check for placeholder text
    });

    it('TC_Login_009: Verify Remember Me Checkbox', () => {
        cy.get('.px-4').click(); 
        cy.wait(2000);
        cy.get('#LoginInput_RememberMe') // Selector for "Remember Me" checkbox
            .should('be.visible')
            .and('not.be.checked'); // Initially unchecked
    });

    it('TC_Login_010: Verify Forgot Password Link', () => {
        cy.get('.px-4').click(); 
        cy.wait(2000);
        cy.get('.text-end > a') // Selector for "Forgot password?" link
            .should('be.visible')
            .and('contain.text', 'Forgot password?'); // Adjust expected text as necessary
    });

    it('TC_Login_011: Verify New User Registration Link', () => {
        cy.get('.px-4').click(); 
        cy.wait(2000);
        cy.get('strong') // Selector for "Are you a new user? Register" link
            .should('be.visible')
            .and('contain.text', 'Are you a new user?') // Check the first part of the text
            .and('contain.text', 'Register'); // Check the second part of the text
    });
});
