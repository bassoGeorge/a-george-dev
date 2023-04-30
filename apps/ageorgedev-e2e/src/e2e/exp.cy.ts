describe('Blog page', () => {
  beforeEach(() => cy.visit('/exp'));

  it('should show the blog titles', () => {
    cy.findByRole('heading', { name: 'First Testing Post' });
    cy.findByRole('heading', { name: 'Second Testing Post' });
    cy.findByRole('heading', { name: 'Draft Testing Post' });
  });
});
