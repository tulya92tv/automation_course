import Chance from "chance"
import {isSuperset, difference, intersection, union} from "../../utils/helper";
import currencyData from "../../fixtures/currencyData.json"

const chance = Chance()

describe('12 task', () => {

    it('12.1 Set', () => {

        cy.log('Задание 1')
        let set1 = new Set(['EUR', 'USD', 'RUB', 'GBR']);
        let set2 = new Set();
        set2.add('USD');
        set2.add('EUR');
        let set3 = new Set(['EUR', 'RUB', 'CHF', 'SEK', 'CZK'])

        cy.log('Задание 2')
        set1.forEach(currency => {
            cy.log(`Currency: ${currency}`)
        })

        cy.log('Задание 3')
        set1.add('CAD').add('NOK');

        cy.log('Задание 4')
        cy.log('Set has EUR value ' + set1.has('EUR'))
        set1.delete('NOK')
        cy.log('Check NOK value ' + set1.has('NOK'))
        cy.log('Check value ' + set1.has('AAA'))

        cy.log('Задание 5')
        cy.log(`One element from set1: ${chance.pickone([...set1])}`)
        cy.log(`Two elements from set1: ${chance.pickset([...set1], 2)}`)
        cy.log(`Random count of elements from set1: ${chance.pickset([...set1], chance.integer({min: 1, max: set1.size}))}`)

        cy.log('Задание 6')
        cy.log(`Call isSuperset function: ${isSuperset(set1, set2)}`)
        cy.log('Call union function: ' + [...union(set1, set3)])
        cy.log('Call intersection function: ' + [...intersection(set1, set3)])
        cy.log('Call difference function: ' + [...difference(set1, set3)])
    })

    it('12.2 Array', () => {

        cy.log('Задание 1')
        let planets = [
            {planet: "Mercury", radius: 2440, density: 5.43, distance: 0.395},
            {planet: "Venus", radius: 6052, density: 5.24, distance: 0.723},
            {planet: "Earth", radius: 6378, density: 5.52, distance: 1},
            {planet: "Mars", radius: 3396, density: 3.93, distance: 1.53},
            {planet: "Jupiter", radius: 71492, density: 1.33, distance: 5.21},
            {planet: "Saturn", radius: 60268, density: 0.69, distance: 9.551},
            {planet: "Uranus", radius: 25559, density: 1.27, distance: 19.213},
            {planet: "Neptune", radius: 24764, density: 1.64, distance: 30.07}
        ]

        const showArray = (array) => {
            array.forEach(element => {
                cy.log(`planet: ${element.planet}, radius: ${element.radius}, density: ${element.density}, distance:  ${element.distance}`)
            })
        }
        showArray(planets);

        const showArray2 = (array) => {
            array.forEach(element => {
                cy.log(JSON.stringify(element));
            })
        }
        //showArray2(planets);

        const showArray3 = (array) => {
            array.forEach(element => {
                cy.log(Object.keys(element).map(key => key + ':' + element[key]).join(', '));
            })
        }
        //showArray3(planets);

        cy.log('Задание 2')

        let planetsWithSolarSystem = planets.map(element => {
            element.solarSystem = false
            return element
        })

        let planetsWithSolarSystem1 = planets.map(e => ({...e, solarSystem: false}))

        showArray3(planetsWithSolarSystem)

        //showArray3(planetsWithSolarSystem1)

        cy.log('Задание 3')

        let newObject = {planet: "SomeNewPlanet", radius: 24764, density: 1.64, distance: 30.07, solarSystem: false}

        planets.push(newObject)

        showArray3(planets)

        cy.log('Задание 4')

        let initialValue = 0
        let total = planets.reduce((accumulator, currentValue) =>
            accumulator + currentValue.radius,
            initialValue
        )

        cy.log(`${total} - radii sum`)

        cy.log('Задание 5')
        cy.log('Planets with a distance greater than 5')

        const getPlanetsWithDistance = (array, distance) => {
            return array.filter(e => e.distance > distance)
        }

        const printPlanets = (array) => {
            array.forEach(e => {
                cy.log(e.planet)
            })
        }

        printPlanets(getPlanetsWithDistance(planets, 5))

        cy.log('Задание 6')

        let planetsName = []
        planets.forEach(e => {
            planetsName.push(e.planet)
        })
        let indexOfPlanet = planetsName.indexOf("SomeNewPlanet")
        let array = planets.splice(indexOfPlanet, 1)

        showArray3(planets)

        cy.log('Задание 7')

        let planetsRadius = []
        let planetsSortByRadius = []

        planets.forEach(e => {
            planetsRadius.push(e.radius)
        })
        let planetRadiusSort = planetsRadius.sort(function(a, b) {return b - a})

        planetRadiusSort.forEach(el => {
            for (let i = 0; i < planets.length; i++) {
                if (el === planets[i]['radius']) {
                    planetsSortByRadius.push(planets[i]['planet'])
                }
            }
        })

        cy.log(`Planets: ${planetsSortByRadius}`)
        cy.log(`Radii: ${planetRadiusSort}`)

        cy.log('Задание 8')

        let sortingPlanetsName = []
        planets.forEach(e => {
            sortingPlanetsName.push(e.planet)
        })

        cy.log(`${sortingPlanetsName.sort()}`)

        cy.log('Задание 9')

        cy.log(`${planets.length}`)

    })

    it('12.2. Subtask 10', () => {

        let rate = chance.pickone(currencyData.rates)
        cy.visit('https://www.xe.com/currencyconverter')
        cy.get('form > div:nth-child(4) > div').click()
        cy.get('input#to').type(rate.shortName).type('{enter}')
        cy.get("button[class='OldButton-sc-1wdh3eu-5 SubmitButton-sc-6euey0-0 dRSeAz submitButton']").click({force: true})
        cy.get("span[class='converterresult-toAmount']").then(element => {
            cy.wrap(element).invoke('text').then(text =>{
                assert.equal(Number.parseFloat(text), rate.rate)
            })
        })
    })

    it('12.3 Map vs Object', () => {

        cy.log('Задание 1')

        let planetsArray = [
            {planet: "Mercury", radius: 2440, density: 5.43, distance: 0.395},
            {planet: "Venus", radius: 6052, density: 5.24, distance: 0.723},
            {planet: "Earth", radius: 6378, density: 5.52, distance: 1},
            {planet: "Mars", radius: 3396, density: 3.93, distance: 1.53},
            {planet: "Jupiter", radius: 71492, density: 1.33, distance: 5.21},
            {planet: "Saturn", radius: 60268, density: 0.69, distance: 9.551},
            {planet: "Uranus", radius: 25559, density: 1.27, distance: 19.213},
            {planet: "Neptune", radius: 24764, density: 1.64, distance: 30.07}
        ]

        let planetsMapByHands = new Map()
        planetsMapByHands
            .set('Mercury', {radius: 2440, density: 5.43, distance: 0.395})
            .set('Venus', {radius: 6052, density: 5.24, distance: 0.723})
            .set('Earth', {radius: 6378, density: 5.52, distance: 1})
            .set('Mars', {radius: 3396, density: 3.93, distance: 1.53})
            .set('Jupiter', {radius: 71492, density: 1.33, distance: 5.21})
            .set('Saturn', {radius: 60268, density: 0.69, distance: 9.551})
            .set('Uranus', {radius: 25559, density: 1.27, distance: 19.213})
            .set('Neptune', {radius: 24764, density: 1.64, distance: 30.07})

        let planetsMap = new Map()
        const planetsObj = planetsArray.map(planet => {
            return {radius: planet.radius, density: planet.density, distance: planet.distance}
        })

        for (let i = 0; i < planetsObj.length; i++) {
            planetsMap.set(planetsArray[i]['planet'], planetsObj[i])
        }

        cy.log('Задание 2')

        const showMap = (map) => {
            map.forEach((value, key) => {
                cy.log(key + ': ' + Object.keys(value).map(objKey => objKey + ':' + value[objKey]).join(', '));
            })
        }
        showMap(planetsMap)

        cy.log('Задание 3')

        cy.log(Object.keys(planetsMap.get('Saturn')).map(objKey => objKey + ':' + planetsMap.get('Saturn')[objKey]).join(', '))

        cy.log('Задание 4')

        cy.log(planetsMap.size)

        cy.log('Задание 5')

        let planetsSet = new Set()
        planetsSet
            .add('Mercury')
            .add('Not Mercury')

        planetsSet.forEach(element => {
            if (planetsMap.has(element)) {
                return cy.log(element + ': ' + Object.keys(planetsMap.get(element)).map(objKey => objKey + ':' + planetsMap.get(element)[objKey]).join(', '))
            } else {
                return cy.log(`'${element}' key does not exist`)
            }
        })

        cy.log('Задание 6')

        planetsMap.delete('Uranus')
        showMap(planetsMap)

        cy.log('Задание 7')

        let planetsMapClone = planetsMap
        let resultMap = new Map([...planetsMap, ...planetsMapClone])
        showMap(resultMap)

        cy.log('Задание 8')

        let planet = {planet: "Mercury", radius: 2440, density: 5.43, distance: 0.395}
        for (let key in planet) {
            cy.log(`${key}: ${planet[key]}`)
        }

    })

})