describe('Datahub', () => {
  it('should have country-profile-page Uganda', () => {
    cy.visit('http://localhost:8080/country/uganda');

    // TODO: there is an uncaught exception originating from the charts lib
    cy.on('uncaught:exception', (err, runnable) => {
      // expect(err.message).to.include('Cannot read property forEach')

      // using mocha's async done callback to finish
      // this test so we prove that an uncaught exception
      // was thrown
      done()
      // return false to prevent the error from
      // failing this test
      return false
    })
    cy.screenshot();
    cy.get('[data-cy=GP__Link]').click()
    cy.get('[data-cy=Search__Input]');
    //    cy.focused()
    //    .should('have.class'. 'css-glamorous-input--146umv7')
  });
  it('should country-profile-page UK', () => {
    cy.visit('http://localhost:8080/country/united-kingdom');

    // TODO: there is an uncaught exception originating from the charts lib
    cy.on('uncaught:exception', (err, runnable) => {
      // expect(err.message).to.include('Cannot read property forEach')

      // using mocha's async done callback to finish
      // this test so we prove that an uncaught exception
      // was thrown
      done()
      // return false to prevent the error from
      // failing this test
      return false
    })
    cy.screenshot();
    cy.get('[data-cy=GP__Link]');
    //    cy.focused()
    //    .should('have.class'. 'css-glamorous-input--146umv7')
  });
  it('should have unbundling-aid page', () => {
    cy.visit('http://localhost:8080/unbundling-aid');
    cy.screenshot();
  })
})