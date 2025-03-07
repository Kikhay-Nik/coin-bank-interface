import { el, setChildren } from 'redom';
import dateStringFormated from '../../utils/dateStringFormated';

export default (accountObj) => {
  const wrapper = el('div.card.flex');
  const title = el('h3.card-title', accountObj.account);
  const balance = el('span.card-balance', `${accountObj.balance} ₽`);
  const inner = el('div.card-inner.flex');

  const button = el('a.btn-reset.fill-button.card-button', 'Открыть', {
    href: `/details:${accountObj.account}`,
  });
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

  return wrapper;
};
