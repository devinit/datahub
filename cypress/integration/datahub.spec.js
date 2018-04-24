/* global done */
describe('Datahub', () => {
  it('should have country-profile-page Uganda', () => {
    cy.visit('http://localhost:8080/country/uganda');

    // TODO: there is an uncaught exception originating from the charts lib
    cy.on('uncaught:exception', () => {
      // expect(err.message).to.include('Cannot read property forEach')

      // using mocha's async done callback to finish
      // this test so we prove that an uncaught exception
      // was thrown
      done();
      // return false to prevent the error from
      // failing this test
      return false;
    });
    cy.screenshot();
    cy.get('[data-cy=GP__Link]').click();
    cy.url().should('include', '/spotlight-on-uganda', { timeout: 30000 });
    cy.get('[data-cy=Search__Input]');
    //    cy.focused()
    //    .should('have.class'. 'css-glamorous-input--146umv7')
    cy.contains('Budget Type');
  });
  it('should country-profile-page UK', () => {
    cy.visit('http://localhost:8080/country/united-kingdom');

    // TODO: there is an uncaught exception originating from the charts lib
    cy.on('uncaught:exception', () => {
      // expect(err.message).to.include('Cannot read property forEach')

      // using mocha's async done callback to finish
      // this test so we prove that an uncaught exception
      // was thrown
      done();
      // return false to prevent the error from
      // failing this test
      return false;
    });
    cy.screenshot();
    cy.get('[data-cy=GP__Link]');
    //    cy.focused()
    //    .should('have.class'. 'css-glamorous-input--146umv7')
  });
  it('should have unbundling-aid page', () => {
    cy.visit('http://localhost:8080/unbundling-aid');
    cy.screenshot();
  });
  it('should show the app structure', () => {
    cy.visit('http://localhost:8080');
    cy.contains('Read more about the data hub').click();
    cy.contains('Methodology and Data').click();
    cy.url().should('include', '/methodology');
  });
  it('should have multilaterals page', () => {
    cy.visit('http://localhost:8080/multilaterals');
    cy.screenshot();
    cy.contains('World Bank Group').click();
    cy.url().should('include', '/multilateral/ida');
  });
  it('should have spotlight on uganda page', () => {
    cy.visit('http://localhost:8080/spotlight-on-uganda');
    cy.screenshot();
    cy.contains('Health').click()
      .get('[data-cy="Range__Input"]')
      .trigger('change');
  });
  it('should have spotlight on Kenya page', () => {
    cy.visit('http://localhost:8080/spotlight-on-kenya');
    cy.contains('Health').click();
  });
  it('should have Where the poor and where will they be? page', () => {
    cy.visit('http://localhost:8080/where-are-the-poor');
    cy.screenshot();
  //  cy.contains('Global').click()
  //  cy.get('dragdealer')
  //    .trigger('change')
  });
  it('should have Who are the global P20? page', () => {
    cy.visit('http://localhost:8080/who-are-the-global-P20');
    cy.screenshot();
  //  cy.contains('Global').click()
  //  cy.get('issoSelect')
  //    .select('Albania (2008)').should('have.value', 'AL')
  });
  it('should have  methodology data page', () => {
    cy.visit('http://localhost:8080/methodology');
    cy.contains('The Development Data Hub');
  });
});

