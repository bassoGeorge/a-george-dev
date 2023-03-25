describe('ageorgedev', () => {
  beforeEach(() => cy.visit('/'));

  it('should display under construction site', () => {
    cy.findByRole('heading', { name: 'Anish' });
    cy.findByRole('heading', { name: 'George' });
    cy.findByText('Site under construction');
    cy.findByRole('heading', { name: 'Web Developer' });
  });
});
