// cypress/e2e/CreateMultipleAuthors.cy.js

import LoginPage from '../../support/Page_Objects/LoginPage';
import AuthorPage from '../../support/Page_Objects/AuthorPage';
import { generateUniqueName } from '../../support/utils'; // Assuming you have a utility to generate unique names

const loginPage = new LoginPage();
const authorPage = new AuthorPage();

describe('Create Multiple Authors', () => {
    before(() => {
        cy.fixture('lastTenant.json').then((tenantData) => {
            // Log in using the data from the fixture file
            cy.login(tenantData.tenantName, tenantData.username, tenantData.password);
        });
    });

    it('should create multiple authors', () => {
        const authors = [
            { namePrefix: 'Author A', address: '123 Author St, Booktown', phone: '1234567890', email: 'author.a@example.com', bio: 'Bio for Author A' },
            { namePrefix: 'Author B', address: '456 Writer Ave, Storyville', phone: '0987654321', email: 'author.b@example.com', bio: 'Bio for Author B' },
            { namePrefix: 'Author C', address: '789 Tale Rd, Novelcity', phone: '5678901234', email: 'author.c@example.com', bio: 'Bio for Author C' },
            // Add more author details as needed
        ];

        authors.forEach(author => {
            authorPage.navigateToAuthorsPage();
            authorPage.clickNewAuthorButton();

            const uniqueName = generateUniqueName(author.namePrefix);
            authorPage.enterName(uniqueName);
            authorPage.enterAddress(author.address);
            authorPage.enterPhoneNumber(author.phone);
            authorPage.enterEmail(author.email);
            authorPage.enterBio(author.bio);

            authorPage.saveAuthor();

            // Verify that the author is created
         

            // Wait for a short period to avoid rate limits or performance issues
            cy.wait(1000);
        });
    });
});
