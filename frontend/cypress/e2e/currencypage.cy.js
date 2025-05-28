/// <reference types="cypress"/>

describe('Страница обмена валют', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
    cy.getByData('username-input').type('developer');
    cy.getByData('password-input').type('skillbox');
    cy.getByData('auth-button').click();
    cy.getByData('currency').should('exist').click();
  });

  context('Верняя часть страницы', () => {
    it('На странице отображается хедер с логотипом и 4 ссылками(ссылка валюта неактивная)', () => {
      cy.get('header').should('exist');
      cy.get('.logo').should('exist').should('have.text', 'Coin.');
      cy.get('.header-button').should('exist').should('have.length', 4);
      cy.getByData('currency').should('exist').should('have.class', 'active');
    });

    it('На странице есть заголовок с верным текстом', () => {
      cy.get('.main-title')
        .should('exist')
        .should('have.text', 'Валютный обмен');
    });
  });

  context('Контент страницы', () => {
    it.only('На странице отображаются список валют, форма обмена, блок с курсами валют', () => {
      cy.getByData('current-currency').should('exist');
      cy.getByData('current-currency')
        .children()
        .children('h2')
        .should('exist')
        .should('have.text', 'Ваши валюты');
      cy.wait(1000);
      cy.get('dl.current-currency-list').should('have.length.greaterThan', 0);
    });
  });
});
