import { el, mount, setChildren } from 'redom';
import {
  createAccountInfoBlock,
  createBlockWithCanvas,
  createContainer,
} from '../../DOMUtils/createPageUtils';
import createBarChart from '../../DOMUtils/createBarChart';
import balanceDinamicByMonths from '../../utils/balanceDinamicByMonths';
import transactionsSum from '../../utils/transactionsSum';
import createHistoryTable from '../../DOMUtils/createHistoryTable';

export default (data) => {
  const monthCount = 12;
  const historySection = el('section.history');
  const historyContainer = createContainer('.history-container');
  const topWrapper = createAccountInfoBlock(data, 'История баланса');

  // eslint-disable-next-line operator-linebreak
  const { canvas: balanceDinamicCanvas, wrapper: balanceDinamicWrapper } =
    createBlockWithCanvas(
      'balance-dinamic',
      'Динамика баланса',
      '#historyBalanceDinamic',
    );

  // eslint-disable-next-line operator-linebreak
  const { canvas: inOutTransactionCanvas, wrapper: inOutTransactionWrapper } =
    createBlockWithCanvas(
      'in-out-transactions',
      'Соотношение входящих исходящих транзакций',
      '#inOutTransactions',
    );

  const transactionsByperiod = balanceDinamicByMonths(data, monthCount);
  createBarChart(
    balanceDinamicCanvas,
    {
      labels: transactionsByperiod.map((row) => row.month),
      datasets: [
        {
          label: '',
          data: transactionsByperiod.map((row) => row.balance),
        },
      ],
    },
    monthCount,
  );

  const transactionSummary = transactionsSum(data, monthCount);
  createBarChart(
    inOutTransactionCanvas,
    {
      labels: transactionSummary.map((row) => row.month),
      datasets: [
        {
          label: 'outcome',
          data: transactionSummary.map((row) => row.outcome),
          backgroundColor: '#fd4e5d',
        },
        {
          label: 'income',
          data: transactionSummary.map((row) => row.income),
          backgroundColor: '#76ca66',
        },
      ],
    },
    monthCount,
  );

  const historyWrapper = el('div.history-transactions.wrapper.wrapper-grey');
  const historyBlock = createHistoryTable(data, 'История переводов', 25, true);

  mount(historyWrapper, historyBlock);
  setChildren(historyContainer, [
    topWrapper,
    balanceDinamicWrapper,
    inOutTransactionWrapper,
    historyWrapper,
  ]);

  mount(historySection, historyContainer);
  return historySection;
};
