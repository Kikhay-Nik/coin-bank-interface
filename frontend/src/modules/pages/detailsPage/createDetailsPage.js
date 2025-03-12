import { mount, el } from 'redom';
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

const createDetailsSection = (data) => {
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

  mount(container, topWrapper);
  mount(transferWrapper, transferBlock);
  mount(balanceDinamicWrapper, balanceDinamicLink);
  mount(middleInner, transferWrapper);
  mount(middleInner, balanceDinamicWrapper);
  mount(container, middleInner);

  mount(detailsSection, container);
  return detailsSection;
};

export default async (id, router) => {
  const accountsData = await getAccountById(id);
  const { app, mainEl } = createPage();
  const headerPageEl = createHeader(true);
  mount(app, headerPageEl, mainEl);
  const detailsSection = createDetailsSection(accountsData.payload, router);
  mount(mainEl, detailsSection);
};
