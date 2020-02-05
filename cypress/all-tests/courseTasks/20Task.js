import Chance from "chance"
import googleProducts from "../../fixtures/googleProducts.json"

const chance = Chance()

describe('20 Tasks', () => {

    let productName = chance.pickone(googleProducts.products);

    const savePriceAndClickSelect= () => {
        cy.get("div[class='mqn-lobby__card__meta']").then(elements => {
            let element = chance.pickone(elements)
            cy.get(element).find("div[class='mqn-lobby__card__price mqn-animation-quick-fade-in ng-binding ng-scope'] > span > span").then(devicePrice => {
                cy.wrap(devicePrice).invoke('text').then(text => {
                    cy.writeFile('cypress/fixtures/priceAndColorOfProduct.json', `{\n\t"price": ${text.replace(/(\s)|(\$)/g, '')},`, {flag: 'a+'})
                })
            })
            cy.get(element).find("div[class='mqn-lobby__card__buttons'] > button").click()
        })
    }

    const saveColorAndClickAddToCart = () => {
        cy.get("div[class='mqn-lobby-swatch__card__meta']").then(elements => {
            let element = chance.pickone(elements)
            cy.get(element).find("div[class='mqn-lobby__card__header'] > div").then(deviceColor => {
                cy.wrap(deviceColor).invoke('text').then(text => {
                    cy.writeFile('cypress/fixtures/priceAndColorOfProduct.json', `\n\t"color": "${text.replace(/(\s)/g, '')}"\n}`, {flag: 'a+'})
                })
            })
            cy.get(element).find("div[class='mqn-lobby-swatch__card__buttons'] > button").click()
        })
    }

    const checkProductNameInCart = (productName) => {
        cy.get("div[class='roboto-header-text-9']").then(element => {
            cy.wrap(element).invoke('text').then(text => {
                expect(text).to.contain(productName)
            })
        })
    }

    const checkProductColorInCart = (color) => {
        cy.get("div[class='roboto-header-text-9']").then(element => {
            cy.wrap(element).invoke('text').then(text => {
                expect(text).to.contain(color)
            })
        })
    }

    const checkProductPriceInCart = (productPrice) => {
        cy.get("div[class='cart-price-bottom-padding text-right']").then(element => {
            cy.wrap(element).invoke('text').then(text => {
                expect(Number.parseFloat(text.replace(/(\s)|(\$)|(\.00)/g, ''))).to.equal(productPrice)
            })
        })
    }

    const checkProductsSubtotalPriceInCart = (price, quantity) => {
        cy.get("span[class='roboto-header-text-6 float-right']").then(element => {
            cy.wrap(element).invoke('text').then(text => {
                expect(Number.parseFloat(text.replace(/(\s)|(\$)|(\.00)/g, ''))).to.equal(price * quantity)
            })
        })
    }

    const checkNumberOfProductsInCart = (numberOfProductsInCart) => {
        cy.get("select[class='item-qty-selector'] > option[selected='true']").then(element => {
            cy.wrap(element).invoke('text').then(text => {
                expect(Number.parseInt(text)).to.equal(numberOfProductsInCart)
            })
        })
    }

    it('Task 1', () => {
        cy.log('GIVEN User is on Accessories page')
        cy.visit('https://store.google.com/us/collection/accessories_wall?compatibilityCategory=Phone&hl=en-US')
        cy.log('WHEN User clicks on search icon')
        cy.get("button[class='header-search-icon nav-link plain']").click()
        cy.log('AND Types the product name')
        cy.get("input[class='quantumWizAutocompleteInputText exportAutocompleteInput']").type(productName)
        cy.log('AND Selects the first matching product')
        cy.get("div[class='quantumWizAutocompleteAutocompleteDropdown exportAutocompleteDropdown'] > div > div:nth-child(1)").click()

        cy.get("div[class='bar-component price-and-button-container'] > div > div > span > span[class='is-price']").then(element => {
            cy.wrap(element).invoke('text').then(text => {
                let priceText = text.replace(/([0-9])|(\$)|(\s)/g, '')

                if ('From' === priceText) {
                    cy.log('AND Clicks on Buy button')
                    cy.get("div[class='bar-component price-and-button-container'] > div > div > button").click()
                    cy.log('AND Selects a price')
                    savePriceAndClickSelect()
                    cy.log('AND Selects a color')
                    saveColorAndClickAddToCart()
                    cy.fixture('priceAndColorOfProduct').then(properties => {
                        cy.log(`Then Data product is presented in the cart and the name of product is equal to the selected one (${productName})`)
                        checkProductNameInCart(productName)
                        cy.log(`AND the price of product is equal to the selected one ${properties.price}`)
                        checkProductPriceInCart(properties.price)
                        cy.log(`AND the subtotal price is equal to the price of product (${properties.price}) times the quantity (${googleProducts.numberOfDevicesInCart})`)
                        checkProductsSubtotalPriceInCart(properties.price, googleProducts.numberOfDevicesInCart)
                        cy.log(`AND the color of product is equal to the selected one ${properties.color}`)
                        checkProductColorInCart(properties.color)
                        cy.log(`AND the number of product is equal to the quantity ${googleProducts.numberOfDevicesInCart}`)
                        checkNumberOfProductsInCart(googleProducts.numberOfDevicesInCart)
                    })
                } else {
                    let price = Number.parseFloat(text.replace(/(\s)|(\$)/g, ''))
                    cy.get("div[class='bar-component price-and-button-container'] > div > div > button").click()
                    cy.log(`Then Data product is presented in the cart and the name of product is equal to the selected one (${productName})`)
                    checkProductNameInCart(productName)
                    cy.log(`AND the price of product is equal to the selected one ${price}`)
                    checkProductPriceInCart(price)
                    cy.log(`AND the subtotal price is equal to the price of product (${price}) times the quantity (${googleProducts.numberOfDevicesInCart})`)
                    checkProductsSubtotalPriceInCart(price, googleProducts.numberOfDevicesInCart)
                    cy.log(`AND the number of product is equal to the quantity ${googleProducts.numberOfDevicesInCart}`)
                    checkNumberOfProductsInCart(googleProducts.numberOfDevicesInCart)
                }
                cy.get("button[class='cart-remove-button pull-right']").click()
                cy.writeFile('cypress/fixtures/priceAndColorOfProduct.json', '')
            })
        })
    })

    describe('task 2', () => {

        before(() => {
            cy.visit('https://store.google.com/us/collection/accessories_wall?compatibilityCategory=Phone&hl=en-US')
            cy.get("button[class='header-search-icon nav-link plain']").click()
            cy.get("input[class='quantumWizAutocompleteInputText exportAutocompleteInput']").type(productName)
            cy.get("div[class='quantumWizAutocompleteAutocompleteDropdown exportAutocompleteDropdown'] > div > div:nth-child(1)").click()

            cy.get("div[class='bar-component price-and-button-container'] > div > div > span > span[class='is-price']").then(element => {
                cy.wrap(element).invoke('text').then(text => {
                    let priceText = text.replace(/([0-9])|(\$)|(\s)/g, '')

                    if ('From' === priceText) {
                        cy.get("div[class='bar-component price-and-button-container'] > div > div > button").click()
                        savePriceAndClickSelect()
                        saveColorAndClickAddToCart()
                    } else {
                        cy.writeFile('cypress/fixtures/priceAndColorOfProduct.json', `{\n\t"price": ${text.replace(/(\s)|(\$)/g, '')}\n}`)
                        cy.get("div[class='bar-component price-and-button-container'] > div > div > button").click()
                    }
                })
            })
            cy.wait(5000)
            Cypress.Cookies.defaults({
                whitelist: function(cookie) {
                    return true
                }
            })
        })

        it('Task 2', () => {
            cy.visit('https://store.google.com/us/cart?hl=en-US')
            cy.fixture('priceAndColorOfProduct').then(properties => {
                if (properties.hasOwnProperty('color')) {
                    cy.log(`Then Data product is presented in the cart and the name of product is equal to the selected one (${productName})`)
                    checkProductNameInCart(productName)
                    cy.log(`AND the price of product is equal to the selected one ${properties.price}`)
                    checkProductPriceInCart(properties.price)
                    cy.log(`AND the subtotal price is equal to the price of product (${properties.price}) times the quantity (${googleProducts.numberOfDevicesInCart})`)
                    checkProductsSubtotalPriceInCart(properties.price, googleProducts.numberOfDevicesInCart)
                    cy.log(`AND the color of product is equal to the selected one ${properties.color}`)
                    checkProductColorInCart(properties.color)
                    cy.log(`AND the number of product is equal to the quantity ${googleProducts.numberOfDevicesInCart}`)
                    checkNumberOfProductsInCart(googleProducts.numberOfDevicesInCart)
                }
                else {
                    cy.log(`Then Data product is presented in the cart and the name of product is equal to the selected one (${productName})`)
                    checkProductNameInCart(productName)
                    cy.log(`AND the price of product is equal to the selected one ${properties.price}`)
                    checkProductPriceInCart(properties.price)
                    cy.log(`AND the subtotal price is equal to the price of product (${properties.price}) times the quantity (${googleProducts.numberOfDevicesInCart})`)
                    checkProductsSubtotalPriceInCart(properties.price, googleProducts.numberOfDevicesInCart)
                    cy.log(`AND the number of product is equal to the quantity ${googleProducts.numberOfDevicesInCart}`)
                    checkNumberOfProductsInCart(googleProducts.numberOfDevicesInCart)
                }
                cy.get("select[class='item-qty-selector'] > option").then(options => {
                    let option = chance.pickone(options)
                    cy.wrap(option).invoke('text').then(text => {
                        let numberOfProduct = Number.parseInt(text)
                        cy.log(`When User select number of product ${numberOfProduct}`)
                        cy.get("select[class='item-qty-selector']").select(text)
                        cy.log(`THEN The subtotal price is equal to the price of product (${properties.price}) times the quantity (${numberOfProduct})`)
                        checkProductsSubtotalPriceInCart(properties.price, numberOfProduct)
                    })
                })
                cy.get("button[class='cart-remove-button pull-right']").click()
                cy.writeFile('cypress/fixtures/priceAndColorOfProduct.json', '')
            })
        })

    })

})