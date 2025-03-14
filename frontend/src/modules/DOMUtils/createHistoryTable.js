/* eslint-disable function-paren-newline */
import { el, mount, setChildren } from 'redom';
import dateStringFormated from '../utils/dateStringFormated';

const headerRowsText = ['Счёт отправителя', 'Счёт получателя', 'Сумма', 'Дата'];

export default (data, title, transactionsCount, pages = false) => {
  const { transactions } = data;
  const transactionsLength = transactions.length;
  let startIndex = 0;
  let endIndex = transactionsCount;

  const paginationCount = Math.ceil(transactionsLength / transactionsCount);
  let startPagination = 1;
  const endPagination = paginationCount;

  const wrapper = el('div.transactions-history');
  const titleEl = el('h2.transactions-history-title.second-title', title);
  const inner = el('div.transactions-history-inner');
  const table = el('table.transactions-table');
  const tableHeader = el('thead');
  const tableHeaderRow = el('tr');
  const tbody = el('tbody');

  const headerRowCeils = headerRowsText.map((rowText) => {
    const th = el('th.table-header');
    const headerTitle = el('h3.table-header-text', rowText);
    mount(th, headerTitle);
    return th;
  });

  transactions.reverse();

  const renderTransactions = (start, end) => {
    if (start < 0 || end < 0) return;

    const transactionsForRender = transactions.slice(start, end);

    const trTransaction = transactionsForRender.map((trans) => {
      const incometrans = trans.to === data.account;
      const additionalClass = incometrans ? 'income' : 'outcome';
      const formatAmount = incometrans
        ? `+${trans.amount} ₽`
        : `-${trans.amount} ₽`;

      const transaction = el('tr.transactions-table-transaction');
      const fromTd = el(
        'td.transactions-table-transaction-info.transaction-from',
        trans.from,
      );
      const toTd = el(
        'td.transactions-table-transaction-info.transaction-to',
        trans.to,
      );
      const amountTd = el(
        `td.transactions-table-transaction-info.transaction-amount.${additionalClass}`,
        formatAmount,
      );
      const dateTd = el(
        'td.transactions-table-transaction-info.transaction-amount',
        dateStringFormated(trans.date, 'numeric'),
      );
      setChildren(transaction, [fromTd, toTd, amountTd, dateTd]);
      return transaction;
    });
    setChildren(tbody, [trTransaction]);
  };

  renderTransactions(startIndex, endIndex);

  setChildren(tableHeaderRow, headerRowCeils);
  mount(tableHeader, tableHeaderRow);
  setChildren(table, [tableHeader, tbody]);
  mount(inner, table);
  setChildren(wrapper, [titleEl, inner]);

  if (pages && transactionsLength > transactionsCount) {
    const btnWrapper = el('div.transactions-history-buttons.flex');
    const previousBtn = el(
      'button.transactions-history-previous.btn-reset.stroke-button',
      'Пред.',
      { disabled: true },
    );

    const nextBtn = el(
      'button.transactions-history-next.btn-reset.stroke-button',
      'След.',
    );
    const paginationElem = el(
      'span.transactions-history-pagination',
      `${startPagination} / ${endPagination}`,
    );

    setChildren(btnWrapper, [previousBtn, paginationElem, nextBtn]);
    mount(wrapper, btnWrapper);

    previousBtn.addEventListener('click', (e) => {
      if (startIndex === 0 || startPagination === 1) return;

      startIndex -= transactionsCount;
      endIndex -= transactionsCount;
      startPagination--;

      if (startPagination === 1) {
        e.currentTarget.disabled = true;
      }

      if (startPagination < endPagination) {
        e.currentTarget.disabled = false;
      }

      renderTransactions(startIndex, endIndex);
      paginationElem.textContent = `${startPagination} / ${endPagination}`;
    });

    nextBtn.addEventListener('click', (e) => {
      if (endIndex > transactions.length || startPagination === endPagination) {
        return;
      }

      startIndex += transactionsCount;
      endIndex += transactionsCount;
      startPagination++;

      if (startPagination > 1) {
        previousBtn.disabled = false;
      }

      if (startPagination === endPagination) {
        e.currentTarget.disabled = true;
      }

      renderTransactions(startIndex, endIndex);
      paginationElem.textContent = `${startPagination} / ${endPagination}`;
    });
  }

  return wrapper;
};
