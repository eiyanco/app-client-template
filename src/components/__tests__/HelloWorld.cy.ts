import HelloWorld from '../HelloWorld.vue';

describe('HelloWorld', () => {
  it('playground', () => {
    cy.mount(HelloWorld, { props: { name: 'Cypress' } });
  });

  it('renders properly', () => {
    cy.mount(HelloWorld, { props: { name: 'Cypress' } });
    cy.get('h1').should('contain', 'Hello Cypress');
  });

  it('renders without props', () => {
    cy.mount(HelloWorld);
    cy.get('h1').should('contain', 'Hello Ismail Omodara');
  });
});
