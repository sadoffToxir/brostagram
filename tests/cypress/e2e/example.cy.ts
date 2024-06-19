/// <reference types="cypress" />

describe('Example e2e', () => {
  it('test', () => {
    cy.visit('/')

    cy.getBySelector('example')
      .should('exist')
  })
})
