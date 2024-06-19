/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    getBySelector(selector: string, ...args: any): Chainable<JQuery<HTMLElement>>
    getBySelectorLike(selector: string, ...args: any): Chainable<JQuery<HTMLElement>>,
  }
}