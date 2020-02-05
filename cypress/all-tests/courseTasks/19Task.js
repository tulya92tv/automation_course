describe('19 task', () => {

    describe('First implementation. All is in "it" block', () => {
        it('19.1', () => {
            cy.request('GET', 'https://storage.googleapis.com/mannequin/2018/data/productwall/accessories/en_us.json?c=1578306751').then(response => {
                cy.wrap(response.body).as("products")
            })
            cy.get("@products").then(productsList => {
                cy.log(`Number of products: ${productsList.products.length}`)
                cy.log(`1st product data: ${Object.keys(productsList.products[0]).map(key => key + ':' + productsList.products[0][key]).join(', ')}`)
            })
        })
    })

    describe('Second implementation. Request is in "before" block. Output is in "it" block', () => {

        before(() => {
            cy.request('GET', 'https://storage.googleapis.com/mannequin/2018/data/productwall/accessories/en_us.json?c=1578306751').its('body').as("products")
        })

        it('19.2', () => {
            cy.get('@products').then(pr => {
                console.log(pr)
                cy.log(`Number of products: ${pr.products.length}`)
                cy.log(`1st product data: ${Object.keys(pr.products[0]).map(key => key + ':' + pr.products[0][key]).join(', ')}`)
            })
        })
    })

})