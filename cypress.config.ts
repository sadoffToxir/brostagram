/* eslint-disable @typescript-eslint/no-var-requires */
import { defineConfig } from 'cypress'
require('dotenv').config()

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5400',
    excludeSpecPattern: '**/examples/**',
    video: false,
    screenshotOnRunFailure: true,
    downloadsFolder: 'tests/cypress/downloads',
    fixturesFolder: 'tests/cypress/fixtures',
    screenshotsFolder: 'tests/cypress/screenshots',
    videosFolder: 'tests/cypress/videos',
    supportFile: 'tests/cypress/support/e2e.{js,jsx,ts,tsx}',
    specPattern: 'tests/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    setupNodeEvents (on, config) {
      require('cypress-localstorage-commands/plugin')(on, config)

      config.env = { ...process.env, ...config.env }

      return config
    }
  }
})
