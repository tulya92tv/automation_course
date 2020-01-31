import Chance from "chance"

const chance = Chance()

describe('13 task', () => {

    it('13. if else, switch and "?"', () => {

        let ageRandomIf = chance.age()
        let ageRandomSwitch = chance.age()
        let ageRandomTernary  = chance.age()

        cy.log(`if operator. Age: ${ageRandomIf}`)
        if (ageRandomIf <=12) {
            cy.log('A person is a child')
        }
        if (ageRandomIf >=13 && ageRandomIf <=19) {
            cy.log('A person is a teen')
        }
        if (ageRandomIf >=20 && ageRandomIf <=65) {
            cy.log('A person is an adult')
        }
        if (ageRandomIf >65) {
            cy.log('A person is a senior')
        }

        cy.log(`switch operator. Age: ${ageRandomSwitch}`)
        switch (true) {
            case ageRandomSwitch <= 12:
                cy.log('A person is a child')
                break
            case ageRandomSwitch >=13 && ageRandomSwitch <=19:
                cy.log('A person is a teen')
                break
            case ageRandomSwitch >=20 && ageRandomSwitch <=65:
                cy.log('A person is an adult')
                break
            case ageRandomSwitch >65:
                cy.log('A person is a senior')
                break
        }

        cy.log(`? operator. Age: ${ageRandomTernary}`)
        let age = ageRandomTernary <=12 ? 'A person is a child' :
            ageRandomTernary >=13 && ageRandomTernary <=19 ? 'A person is a teen' :
                ageRandomTernary >=20 && ageRandomTernary <=65 ? 'A person is an adult' :
                    'A person is a senior'
        cy.log(age)
    })

})