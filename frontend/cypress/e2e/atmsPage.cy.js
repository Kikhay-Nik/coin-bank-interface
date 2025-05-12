/// <reference types="cypress"/>

describe('Страница банкоматы', () => {
  it('при нажатии на ссылку Банкоматы происходит переход на страницу с картой', () => {
    cy.getByData('atms').should('exist').click();
    cy.location('pathname').should('eq', '/atms');
    cy.getByData('atms').should('exist').should('have.class', 'active');
  });

  beforeEach(() => {
    cy.visit('http://localhost:8080');
    cy.getByData('username-input').type('developer');
    cy.getByData('password-input').type('skillbox');
    cy.getByData('auth-button').click();
    cy.getByData('atms').should('exist').click();
  });

  it('На странице отображается заголовок и карта с точками банкоматов', () => {
    cy.get('.main-title').should('exist').contains('Карта банкоматов');
    cy.get('.atms-map').should('exist');
    cy.get('[class$=--marker]').should('exist');
  });

  context('проверка ссылок в хедере', () => {
    it('при нажатии на ссылку счета происходит переход на главную', () => {
      cy.getByData('accounts').should('exist').click();
      cy.location('pathname').should('eq', '/accounts');
    });

    it('при нажатии на ссылку валюта происходит переход на страницу обмена валют', () => {
      cy.getByData('currency').should('exist').click();
      cy.location('pathname').should('eq', '/currency');
    });

    it('при нажатии на ссылку выйти происходит переход на страницу авторизации', () => {
      cy.getByData('logout').should('exist').click();
      cy.location('pathname').should('eq', '/');
    });
  });
});
