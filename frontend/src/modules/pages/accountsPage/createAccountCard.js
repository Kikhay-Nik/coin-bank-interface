import { el, setAttr, setChildren } from 'redom';
import dateStringFormated from '../../utils/dateStringFormated';

export default (accountObj, router) => {
  const wrapper = el('div.card.flex');
  const title = el('h3.card-title', accountObj.account);
  const balance = el('span.card-balance', `${accountObj.balance} ₽`);
  const inner = el('div.card-inner.flex');

  const button = el('button.btn-reset.fill-button.card-button', 'Открыть');
  setAttr(button, { 'data-id': accountObj.account });
  if (accountObj.transactions.length) {
    const currentDate = dateStringFormated(accountObj.transactions[0].date);
    const transactionWrapper = el('div.card-transaction');
    const transactionTitle = el(
      'h4.card-transaction-title',
      'Последняя транзакция:',
    );
    const transactionDate = el('span.card-transaction-date', currentDate);
    setChildren(transactionWrapper, [transactionTitle, transactionDate]);
    setChildren(inner, [transactionWrapper, button]);
  } else {
    setChildren(inner, [button]);
  }

  setChildren(wrapper, [title, balance, inner]);

  button.addEventListener('click', (e) => {
    const accountId = e.currentTarget.dataset.id;
    router.navigate(`details:${accountId}`);
  });

  return wrapper;
};
