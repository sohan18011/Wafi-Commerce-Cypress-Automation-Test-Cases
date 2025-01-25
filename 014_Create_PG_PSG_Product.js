import LoginPage from '../../support/Page_Objects/LoginPage';
import ProductGroupPage from '../../support/Page_Objects/ProductGroupPage';
import ProductSubGroupPage from '../../support/Page_Objects/ProductSubGroupPage';
import ProductPage from '../../support/Page_Objects/ProductPage';

describe('Product Creation Flow', () => {
    const loginPage = new LoginPage();
    const productGroupPage = new ProductGroupPage();
    const productSubGroupPage = new ProductSubGroupPage();
    const productPage = new ProductPage();

    beforeEach(() => {
        cy.fixture('lastTenant.json').then((tenantData) => {
            cy.login(tenantData.tenantName, tenantData.username, tenantData.password);
        });
    });

    it('should create a product group, sub-group, and product', () => {
        // Create Product Group
        productGroupPage.navigateToProductGroupsPage();
        productGroupPage.clickNewProductGroupButton();
        cy.wait(1000);
        const { name: productGroupName } = productGroupPage.fillProductGroupDetails('Product group description');
        productGroupPage.saveProductGroup();
        productGroupPage.verifyProductGroupCreated(productGroupName);
        cy.wait(1000);

        // Create Product Sub-Group using the created Product Group
        productSubGroupPage.navigateToProductSubGroupsPage();
        productSubGroupPage.clickNewProductSubGroupButton();
        const { uniqueSubGroupName } = productSubGroupPage.fillProductSubGroupDetails(productGroupName);
        productSubGroupPage.saveProductSubGroup();
        productSubGroupPage.verifyProductSubGroupCreated(uniqueSubGroupName);

        // Create Product using the created Sub-Group
        productPage.navigateToProductsPage();
        productPage.clickNewProductButton();
        const { productName } = productPage.fillProductDetails(productGroupName, uniqueSubGroupName);
        productPage.saveProduct();
        productPage.verifyProductCreated(productName);
    });
});