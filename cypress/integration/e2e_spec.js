describe('ACE empty index', () => {
	beforeEach(() => {
		cy.visit('/')
	});

	it('tem o título da tabela correto', () => {
		cy.contains('th', 'Linha'),
		cy.contains('th', 'Tipo'),
		cy.contains('th', 'Hora'),
		cy.contains('th', 'Excluir')
	});

	// it('adiciona uma vistoria normal', () => {
	// 	cy.get('nav a').contains('about').click();
	// 	cy.url().should('include', '/about');
	// });

	// it('navigates to /blog', () => {
	// 	cy.get('nav a').contains('blog').click();
	// 	cy.url().should('include', '/blog');
	// });
});