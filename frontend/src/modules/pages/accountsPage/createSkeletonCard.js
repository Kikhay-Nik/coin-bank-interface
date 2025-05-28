import { el, setChildren } from 'redom';

export default () => {
  const card = el('div.flex.card.skeleton-card');
  const number = el('div.skeleton.skeleton-card-number');
  const balance = el('div.skeleton.skeleton-card-balance');
  const botomInner = el('div.flex.card-inner.skeleton-card-inner');
  const transactionWrapper = el(
    'div.flex.card-transaction.skeleton-card-transaction',
  );
  const transactionDescription = el(
    'div.skeleton.skeleton-card-transaction-description',
  );
  const transactionDate = el('div.skeleton.skeleton-card-transaction-date');
  const button = el('div.btn-reset.skeleton.skeleton-card-button');

  setChildren(transactionWrapper, [transactionDescription, transactionDate]);
  setChildren(botomInner, [transactionWrapper, button]);
  setChildren(card, [number, balance, botomInner]);

  return card;
};
