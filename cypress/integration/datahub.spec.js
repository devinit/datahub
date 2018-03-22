describe('myApp', () => {
   it('display the page', () => {
       cy.visit('http://localhost:4444/country/albania')
       cy.focused()
       .should('have.class'. 'css-glamorous-input--146umv7')
   })   
})