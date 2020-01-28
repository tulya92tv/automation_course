import SearchResultsPage from "../page-object/searchResultsPage.js"
import AccessoriesPage from "../page-object/accessoriesPage.js"

describe('test fors reqres', () => {
    before(() => {
        cy.fixture('product').then(data => {
            cy.wrap(data).as('productData')
        })
    })
    it('Positive: Create user', () => {
        cy.get('@productData').then((productData) => {

            cy.log("GIVEN User is at Accessories Page")
            AccessoriesPage.open()

            cy.log("When User performs search product by name")
            AccessoriesPage.performSearch(productData.name)

            cy.log("Then Product is presented on the page")
            SearchResultsPage.getProductByDocId(productData.url)
                .should('exist')
        })
    })
})