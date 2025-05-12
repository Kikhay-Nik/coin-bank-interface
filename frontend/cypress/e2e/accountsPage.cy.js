/// <reference types="cypress"/>

describe('Страница со списком счетов', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
    cy.getByData('username-input').type('developer');
    cy.getByData('password-input').type('skillbox');
    cy.getByData('auth-button').click();
  });

  context('Хедер', () => {
    it('В хедере отображаются 4 ссылки и ссылка Счета имеет активный класс', () => {
      cy.get('.header-button').should('have.length', '4');
      cy.getByData('atms').should('have.text', 'Банкоматы');
      cy.getByData('accounts')
        .should('have.text', 'Счета')
        .should('have.class', 'active');
      cy.getByData('currency').should('have.text', 'Валюта');
      cy.getByData('logout').should('have.text', 'Выйти');
    });
  });

  context('Верхняя-часть', () => {
    it('Проверка заголовка', () => {
      cy.get('.main-title').should('have.text', 'Ваши счета');
    });

    it('При нажатии на кнопку Создать новый счет добавляется новая карточка', () => {
      cy.getByData('account-card').then(($cards) => {
        cy.getByData('new-account-button').click();
        cy.getByData('account-card').should('have.length', $cards.length + 1);
      });
    });

    it('Проверка сортировки по номеру', () => {
      cy.get('.card-title')
        .eq(0)
        .then(($account) => {
          const accountNumber = $account[0].innerText;
          cy.get('.choices').click();
          cy.get('.choices__list')
            .should('exist')
            .should('have.class', 'is-active');
          cy.get('.choices__item--choice').eq(0).click();
          cy.get('.card-title')
            .eq(0)
            .then(($newAccount) => {
              const newAccountNumber = $newAccount[0].innerText;
              cy.log(newAccountNumber < accountNumber);
            });
        });
    });

    it('При нажатии на кнопку открыть -переход на страницу счета', () => {
      cy.getByData('account-card-link')
        .should('have.length.gt', 3)
        .its('length')
        .then((n) => Cypress._.random(0, n - 1))
        .then((k) => {
          cy.log(`picked random index ${k}`);
          cy.getByData('account-card-link')
            .eq(k)
            .then(($link) => {
              const linkHref = $link[0].href;
              console.log('🚀 ~ cy.getByData ~ linkHref:', linkHref);
              cy.getByData('account-card-link').eq(k).click();
              cy.location('href').should('eq', linkHref);
            });
        });
    });
  });
});
