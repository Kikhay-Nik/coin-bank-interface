import { mount, el, setChildren } from 'redom';
import { getAccountById } from '../../api/apiMethods';
import createHeader from '../../DOMUtils/createHeader';
import {
  createAccountInfoBlock,
  createBlockWithCanvas,
  createContainer,
  createPage,
} from '../../DOMUtils/createPageUtils';
import createTransferForm from './createTransferForm';
import createBarChart from '../../DOMUtils/createBarChart';
import balanceDinamicByMonths from '../../utils/balanceDinamicByMonths';
import createHistoryTable from '../../DOMUtils/createHistoryTable';

export const createDetailsSection = (data) => {
  const monthCount = 6;
  const detailsSection = el('section.details');
  const container = createContainer('details-container.flex');
  const topWrapper = createAccountInfoBlock(data, 'Просмотр счёта ');
  const middleInner = el('div.details-middle.flex');

  const transferWrapper = el('div.details-transfer.wrapper.wrapper-grey');
  const transferBlock = createTransferForm(data.balance, data.account);

  // eslint-disable-next-line operator-linebreak
  const { canvas: balanceDinamicCanvas, wrapper: balanceDinamicWrapper } =
    createBlockWithCanvas(
      'details-balance-dinamic.balance-dinamic',
      'Динамика баланса',
      '#detailsBalanceDinamic',
    );
  const balanceDinamicLink = el('a.balance-dinamic-link', {
    href: `/account-history:${data.account}`,
  });

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

  const historyWrapper = el('div.details-history.wrapper.wrapper-grey');
  const historyBlock = createHistoryTable(data, 'История переводов', 10);
  const historyTableLink = el('a.details-history-link', {
    href: `/account-history:${data.account}`,
  });

  mount(container, topWrapper);
  mount(transferWrapper, transferBlock);
  mount(balanceDinamicWrapper, balanceDinamicLink);
  setChildren(middleInner, [transferWrapper, balanceDinamicWrapper]);
  mount(container, middleInner);
  setChildren(historyWrapper, [historyBlock, historyTableLink]);
  mount(container, historyWrapper);
  mount(detailsSection, container);
  return detailsSection;
};

export default async (id) => {
  const accountsData = await getAccountById(id);
  const { app, mainEl } = createPage();
  const headerPageEl = createHeader(true);
  mount(app, headerPageEl, mainEl);
  const detailsSection = createDetailsSection(accountsData.payload);
  mount(mainEl, detailsSection);
};
