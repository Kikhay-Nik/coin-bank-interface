/// <reference types="cypress"/>

describe('Страница входа', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  });

  it('при пустых полях появляется сообщение об ошибке', () => {
    cy.getByData('auth-button').click();
    cy.get('.error-display').eq(0).contains('Заполните поле.');
    cy.get('.error-display').eq(1).contains('Заполните поле.');
    cy.getByData('auth-button').should('be.disabled');
  });

  it('если ввести данные меньше 6 символов появляется сообщение об ошибке', () => {
    cy.getByData('username-input').type('devel').blur();
    cy.get('.error-display').eq(0).contains('Минимальная длина 6 символов.');
    cy.getByData('auth-button').should('be.disabled');

    cy.getByData('password-input').type('devel').blur();
    cy.get('.error-display').eq(1).contains('Минимальная длина 6 символов.');
    cy.getByData('auth-button').should('be.disabled');
  });

  it('если ввести данные с пробелами появляется сообщение об ошибке', () => {
    cy.getByData('username-input').type('us er_admin').blur();
    cy.get('.error-display').eq(0).contains('Пробелы недопустимы.');
    cy.getByData('auth-button').should('be.disabled');

    cy.getByData('password-input').type('pass word').blur();
    cy.get('.error-display').eq(1).contains('Пробелы недопустимы.');
    cy.getByData('auth-button').should('be.disabled');
  });

  it('при вводе корректных данный происходит авторизация', () => {
    cy.getByData('username-input').type('developer');
    cy.getByData('password-input').type('skillbox');
    cy.getByData('auth-button').click();
    cy.location('pathname').should('eq', '/accounts');
  });
});
