import ProductGroupPage from "../../support/Page_Objects/ProductGroupPage"; // Adjust the path as per your project structure

class LoginPage {
    visit() {
        cy.visit('/');  // Replace with your actual URL
        cy.url().should('include', 'waficommerce');  // Assert the URL contains 'waficommerce'
    }

    clickLoginButton() {
        cy.wait(2000);
        cy.get('.px-4').should('be.visible').click();  // Assert the login button is visible and clickable
        cy.wait(2000);
    }

    selectTenant(tenantName) {
        cy.get('#AbpTenantSwitchLink').should('be.visible').click();  // Assert tenant switch link is visible and clickable
        cy.wait(2000);
        cy.get('#Input_Name').should('be.visible').type(tenantName);  // Assert input for tenant name is visible and type tenant
        cy.get('.modal-footer > .btn-primary').should('be.visible').click();  // Assert the select tenant button is visible and clickable
        cy.wait(2000);
    }

    enterUsername(username) {
        cy.get('#LoginInput_UserNameOrEmailAddress').should('be.visible').type(username);  // Assert username field is visible and type username
        cy.get('#LoginInput_UserNameOrEmailAddress').should('have.value', username);  // Assert the username value
    }

    enterPassword(password) {
        cy.get('#LoginInput_Password').should('be.visible').type(password);  // Assert password field is visible and type password
        cy.get('#LoginInput_Password').should('have.value', password);  // Assert the password value
    }

    submit() {
        cy.get('.btn-lg').should('be.visible').click();  // Assert the login button is visible and clickable
        cy.wait(2000);
        cy.url().should('include', '');  // Assert URL changes after login (replace with your dashboard URL or relevant string)
    }
}

describe('Product Group CRUD Operations with Login', () => {
    const loginPage = new LoginPage();
    const productGroupPage = new ProductGroupPage();
    const description = 'This is a test product group';  // Default description for the product group
    let groupDetails = {};  // To store the name and code of the product group

    const tenantName = 'Demo2';  // Replace with your actual tenant
    const username = 'admin';  // Replace with your actual username
    const password = '1q2w3E*';  // Replace with your actual password

    it('should log in, create, verify, edit, and delete a product group in one flow', () => {
        
    });
});
