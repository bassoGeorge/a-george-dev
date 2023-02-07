import { getGreeting } from '../support/app.po';

describe('ageorgedev', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    console.log('blahhh');
    // Custom command example, see `../support/commands.ts` file
    // cy.login('my-email@something.com', 'myPassword');

    // Function helper example, see `../support/app.po.ts` file
    // getGreeting().contains('Welcome ageorgedev');
    cy.findByText('Dummy Remix App for testing things out');
  });
});
