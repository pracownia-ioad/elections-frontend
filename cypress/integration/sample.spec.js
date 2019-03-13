describe('Login Page', () => {
  it('Go to main page and check if login modal appear', () => {
    cy.visit('localhost:3000');

    cy.get('#index-number').type('admin');
    cy.get('#password').type('admin');
    cy.get('#login-button').click();

    cy.url().should('include', 'dashboard');
  });
});
