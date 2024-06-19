import { getBaxterAuthCookies } from '../../../plugins/auth/helper'

const { BAXTER_AUTH_ID_COOKIE } = getBaxterAuthCookies(Cypress.env('NUXT_PUBLIC_ENVIRONMENT'))

describe('Handle browser cookie', () => {
  it('should get browser cookies', () => {
    cy.getCookies().should('have.length', 2)
  })

  it('should get browser cookie by name', () => {
    cy.getCookie(BAXTER_AUTH_ID_COOKIE).should('not.be.empty')
  })
})
