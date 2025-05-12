/// <reference types="cypress"/>

describe('Детальная страница счета', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
    cy.getByData('username-input').type('developer');
    cy.getByData('password-input').type('skillbox');
    cy.getByData('auth-button').click();
    cy.getByData('account-card-link')
      .then(($links) => {
        const items = $links.toArray();
        return Cypress._.sample(items);
      })
      .then(($link) => {
        expect(Cypress.dom.isJquery($link), 'jQuery element').to.be.true;
      })
      .click();
  });

  context('Верхняя часть страницы', () => {
    it('Все ссылки в хедере доступны для перехода', () => {
      cy.get('.header-button')
        .should('have.length', 4)
        .should('not.have.class', 'active');
    });

    it('Проверка заголовка', () => {
      cy.get('.main-title')
        .should('exist')
        .should('have.text', 'Просмотр счёта');
    });

    it('Нажатие кнопки Вернуться назад возвращает на предыдущую страницу', () => {
      cy.getByData('back-page-button')
        .should('exist')
        .should('have.length', 1)
        .click();
      cy.location('pathname').should('eq', '/accounts');
    });
  });

  context('Основная часть страницы', () => {
    it('На странице есть форма перевода, график динамики баланса и краткая таблица истории переводов', () => {
      cy.getByData('transfer-form').should('exist');
      cy.get('.balance-dinamic').should('exist');
      cy.get('.transactions-history').should('exist');
    });

    it('В форме переводов есть заголовок, 2 лейбла с полями ввода и кнопка', () => {
      cy.getByData('transfer-form').should('exist');
      cy.getByData('transfer-title')
        .should('exist')
        .should('have.text', 'Новый перевод');
      cy.get('.transfer-label')
        .should('have.length', 2)
        .eq(0)
        .should('have.text', 'Номер счёта получателя');
      cy.get('.transfer-label').eq(1).should('have.text', 'Сумма перевода');
      cy.getByData('transfer-account').should('exist');
      cy.getByData('transfer-amount').should('exist');
      cy.getByData('transfer-button').should('exist');
    });
  });
  context('Отправка перевода', () => {
    it('Если баланс 0 - кнопка неактивна', () => {
      cy.get('.account-info-balance-value').then(($balance) => {
        const balanceStr = $balance[0].textContent;
        const balanceValue = Number(
          balanceStr.slice(0, -1).trim().replace(/\D/g, ''),
        );
        if (!balanceValue > 0) {
          cy.getByData('transfer-button').should('exist').should('be.disabled');
        } else {
          cy.getByData('back-page-button').should('exist').click();
          cy.get('.card').then(($cards) => {
            const cards = $cards.toArray();
            cards.forEach((card) => {
              const balanceValue =
                card.querySelector('.card-balance').textContent;
              if (balanceValue === '0 ₽') {
                const cardButton = card.querySelector('.card-button');
                cardButton.click();
              }
            });
          });
          cy.getByData('transfer-button').should('exist').should('be.disabled');
        }
      });
    });

    it('Нельзя перевести больше чем есть на счету', () => {
      cy.get('.account-info-balance-value')
        .then(($balance) => {
          let balanceStr = $balance[0].textContent;
          let balanceValue = Number(
            balanceStr.slice(0, -1).trim().replace(/\D/g, ''),
          );
          if (!balanceValue > 0) {
            cy.getByData('back-page-button').should('exist').click();
            cy.get('.card-button').eq(0).click();
            cy.get('.account-info-balance-value').then(($balance) => {
              balanceStr = $balance[0].textContent;
              balanceValue = Number(
                balanceStr.slice(0, -1).trim().replace(/\D/g, ''),
              );
            });
          }
        })
        .then(($balance) => {
          let balanceStr = $balance[0].textContent;
          let balanceValue = Number(
            balanceStr.slice(0, -1).trim().replace(/\D/g, ''),
          );
          cy.getByData('transfer-account')
            .should('exist')
            .type('61253747452820828268825011');
          cy.getByData('transfer-amount')
            .should('exist')
            .type(balanceValue + 1);
          cy.getByData('transfer-button')
            .should('exist')
            .should('not.be.disabled')
            .click();
          cy.get('.warning-display')
            .should('exist')
            .should('have.text', 'Сумма перевода превышает остаток на счете');
          cy.get('.error-display')
            .eq(1)
            .should('exist')
            .should('have.text', 'Сумма превышает остаток');
        });
    });
  });

  context('Переход при клике по интерактивным элементам', () => {
    it('При нажатии на график динамики баланса или таблицу с историей происходит переход на страницу с подробной с историей баланса', () => {
      cy.get('.balance-dinamic').should('exist').click();
      cy.get('h1').contains('История баланса');
      cy.getByData('back-page-button').click();
      cy.get('.details-history').should('exist').click();
      cy.get('h1').contains('История баланса');
    });
  });
});
