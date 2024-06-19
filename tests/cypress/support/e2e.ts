// ***********************************************************
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import 'cypress-localstorage-commands'
import './commands'

before(() => {
  cy.getLoginToken()
})

beforeEach(() => {
  cy.setLoginCookie()
})
