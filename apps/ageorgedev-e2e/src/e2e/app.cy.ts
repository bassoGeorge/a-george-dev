describe('ageorgedev', () => {
  beforeEach(() => cy.visit('/'));

  it('should display under construction site', () => {
    cy.findByRole('heading', { name: 'Anish George' });
    cy.findByText('🚧 Site under construction 🚧');
    cy.findByRole('heading', { name: 'Web Developer' });
  });
});
