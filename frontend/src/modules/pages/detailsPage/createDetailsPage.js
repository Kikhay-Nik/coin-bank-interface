import { mount, el, setChildren } from 'redom';
import { getAccountById } from '../../api/apiMethods';
import createHeader from '../../DOMUtils/createHeader';
import {
  createContainer,
  createPage,
  createBackButton,
} from '../../DOMUtils/createPageUtils';
import createTransferForm from './createTransferForm';

const createDetailsSection = (data, router) => {
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
    `${data.balance} ₽`,
  );

  const middleInner = el('div.details-middle.flex');

  const transferWrapper = el('div.details-transfer.wrapper.wrapper-grey');
  const transferBlock = createTransferForm(data.balance, data.account);

  setChildren(accountBalanceWrapper, [
    accountBalanceTitle,
    accountBalanceValue,
  ]);
  setChildren(accountInfoWrapper, [accountTilte, accountBalanceWrapper]);
  setChildren(titleAndButtonWrapper, [pageTitle, backLink]);
  setChildren(inner, [titleAndButtonWrapper, accountInfoWrapper]);
  mount(container, inner);
  mount(transferWrapper, transferBlock);
  mount(middleInner, transferWrapper);
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
