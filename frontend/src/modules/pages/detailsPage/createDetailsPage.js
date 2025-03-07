import { mount, el, setChildren } from 'redom';
import { getAccountById } from '../../api/apiMethods';
import createHeader from '../../DOMUtils/createHeader';
import {
  createContainer,
  createPage,
  createBackButton,
} from '../../DOMUtils/createPageUtils';
import createTransferForm from './createTransferForm';
import createBarChart from '../../DOMUtils/createBarChart';

const createDetailsSection = (data) => {
  const detailsSection = el('section.details');
  const container = createContainer('details-container.flex');
  const inner = el('div.details-inner.flex');
  const titleAndButtonWrapper = el('div.details-title-button-wrapper.flex');
  const pageTitle = el('h1.main-title.details-title', 'Просмотр счёта ');
  const backLink = createBackButton('details-back-button');
  const accountInfoWrapper = el('div.details-account-info-wrapper.flex');
  const accountTilte = el('h2.details-account-title', `№ ${data.account}`);
  const accountBalanceWrapper = el('div.details-account-balance-wrrapper.flex');
  const accountBalanceTitle = el(
    'h3.details-account-balance-title.second-title',
    'Баланс',
  );
  const accountBalanceValue = el(
    'span.details-account-balance-value',
    `${data.balance.toLocaleString()} ₽`,
  );

  const middleInner = el('div.details-middle.flex');

  const transferWrapper = el('div.details-transfer.wrapper.wrapper-grey');
  const transferBlock = createTransferForm(data.balance, data.account);

  const balanceDinamicWrapper = el(
    'div.details-balance-dinamic.balance-dinamic.wrapper.wrapper-light',
  );
  const balanceDinamicLink = el('a.balance-dinamic-link', {
    href: '/account-history',
  });
  const balanceDinamicInner = el('div.balance-dinamic-inner');
  const balanceDinamicTitle = el(
    'h2.second-title.balance-dinamic-title',
    'Динамика баланса',
  );
  const balanceDinamicCanvas = el(
    'canvas.balance-dinamic-canvas#detailsBalanceDinamic',
  );
  // eslint-disable-next-line no-unused-vars
  const barChart = createBarChart(balanceDinamicCanvas, data, 6);

  setChildren(accountBalanceWrapper, [
    accountBalanceTitle,
    accountBalanceValue,
  ]);
  setChildren(accountInfoWrapper, [accountTilte, accountBalanceWrapper]);
  setChildren(titleAndButtonWrapper, [pageTitle, backLink]);
  setChildren(inner, [titleAndButtonWrapper, accountInfoWrapper]);
  mount(container, inner);
  mount(transferWrapper, transferBlock);
  setChildren(balanceDinamicWrapper, [
    balanceDinamicTitle,
    balanceDinamicCanvas,
    balanceDinamicLink,
  ]);
  mount(balanceDinamicWrapper, balanceDinamicInner);
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
