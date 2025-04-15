/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable object-curly-newline */
import { el, mount, setChildren, text } from 'redom';
import Choices from 'choices.js';
import {
  createPage,
  createContainer,
  createOptionsToSelect,
  createAccountCards,
} from '../../DOMUtils/createPageUtils';
import createHeader from '../../DOMUtils/createHeader';
import sortCategory from '../../constants/sortCategory';
import { createAccount, getAccountsData } from '../../api/apiMethods';
import { ACCOUNTS_URL, CREATE_ACCOUNT_URL } from '../../constants/api';
import compare from '../../utils/compareFunc';
import { plusIcon } from '../../DOMUtils/createIcons';

const createAccountsSection = (data) => {
  let accounstData = data;
  const accountSection = el('section.account');
  const container = createContainer('account-container');
  const accountWrapper = el('div.account-wrapper.flex');
  const accountTitle = el('h1.main-title.account-title', 'Ваши счета');
  const sortSelect = el('select');
  const selectOptions = Object.entries(sortCategory).map((value) =>
    createOptionsToSelect(
      value[1],
      value[0],
      'account-sort-option.select-option',
    ),
  );
  const newAccountButton = el(
    'button.btn-reset.fill-button.account-button.flex',
  );
  const plusIconEl = plusIcon();
  const iconWrapper = el('span.account-icon-wrapper.flex');

  const accountList = el('div.account-card-wrapper.grid');
  createAccountCards(accounstData, accountList);

  newAccountButton.addEventListener('click', () => {
    createAccount(CREATE_ACCOUNT_URL).then(async () => {
      accounstData = await getAccountsData(ACCOUNTS_URL);
      createAccountCards(accounstData.payload, accountList);
    });
  });

  mount(iconWrapper, plusIconEl);
  mount(newAccountButton, iconWrapper);
  mount(newAccountButton, text('Создать новый счёт'));
  setChildren(sortSelect, selectOptions);
  setChildren(accountWrapper, [accountTitle, sortSelect, newAccountButton]);
  mount(container, accountWrapper);
  mount(container, accountList);
  mount(accountSection, container);

  const choices = new Choices(sortSelect, {
    allowHTML: false,
    searchEnabled: false,
    itemSelectText: '',
    renderSelectedChoices: 'auto',
    shouldSort: false,
    placeholderValue: 'Сортировка',
    classNames: {
      containerOuter: ['choices', 'input-long', 'account-sort'],
    },
  });

  choices.passedElement.element.addEventListener('choice', (event) => {
    const sortedArr = accounstData.slice().sort(compare(event.detail.value));
    console.log(
      '🚀 ~ choices.passedElement.element.addEventListener ~ sortedArr:',
      sortedArr,
    );
    createAccountCards(sortedArr, accountList);
  });

  return accountSection;
};

export default async () => {
  const accountsData = await getAccountsData(ACCOUNTS_URL);
  const { app, mainEl } = createPage();
  const headerPageEl = createHeader(true);
  mount(app, headerPageEl, mainEl);
  const accountSection = createAccountsSection(accountsData?.payload);
  mount(mainEl, accountSection);
};
