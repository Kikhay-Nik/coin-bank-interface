// eslint-disable-next-line object-curly-newline
import { el, mount, unmount, setChildren, text } from 'redom';
import createAccountCard from '../pages/accountsPage/createAccountCard';
import { arrowIcon } from './createIcons';

export const createPage = () => {
  document.body.innerHTML = '';
  const app = el('div.app');
  const mainEl = el('main');
  mount(document.body, app);
  mount(app, mainEl);

  return { app, mainEl };
};

export const createContainer = (optionalClass = '') => {
  const containerEl = el(`div.container.${optionalClass}`);
  return containerEl;
};

export const createLink = (url, elemText, elemClass) => {
  const linkEl = el(`a.${elemClass}`, elemText, { href: url });

  return linkEl;
};

export const createErrorDisplayEl = () => {
  const errorElem = el('span.error-display');
  return errorElem;
};

export const createLabelWithInput = (
  elemClass,
  labelText,
  inputPlaceholder,
  long = true,
  inputType = 'input',
) => {
  let additionalInputClass;
  if (long) {
    additionalInputClass = '.input-long';
  } else {
    additionalInputClass = '.input-short';
  }
  const label = el(`label.label.${elemClass}-label.flex`, labelText);
  const input = el(
    `${inputType}.input.${elemClass}-input${additionalInputClass}`,
    {
      placeholder: inputPlaceholder,
    },
  );

  mount(label, input);
  return { label, input };
};

export const createWarningDisplayEl = (message, parent) => {
  const warningElem = el('span.warning-display', message);
  mount(parent, warningElem);

  setTimeout(() => {
    unmount(parent, warningElem);
  }, 5000);
};

export const createOptionsToSelect = (
  optionTetx = '',
  optionValue = '',
  elementClass = '',
) => {
  const option = el(`option.${elementClass}`, optionTetx, {
    value: optionValue,
  });
  return option;
};

export const createAccountCards = (data, parent) => {
  const accounts = data.map((obj) => createAccountCard(obj));
  setChildren(parent, accounts);
};

export const createBackButton = (elemClass = '') => {
  const backButton = el(
    `button.btn-reset.fill-button.back-button.${elemClass}.flex`,
  );
  const buttonText = text('Вернуться назад');
  const arrowIconEl = arrowIcon();
  mount(backButton, arrowIconEl);
  mount(backButton, buttonText);
  backButton.addEventListener('click', () => {
    window.history.back();
  });
  return backButton;
};

export const createAccountInfoBlock = (data, title) => {
  const inner = el('div.account-info-inner.flex');
  const pageTitle = el('h1.main-title.page-title', title);
  const backLink = createBackButton('account-info-back-button');
  const titleAndButtonWrapper = el(
    'div.account-info-title-button-wrapper.flex',
  );
  const accountInfoWrapper = el('div.account-info-wrapper.flex');
  const accountTilte = el('h2.account-info-title', `№ ${data.account}`);
  const accountBalanceWrapper = el('div.account-info-balance-wrrapper.flex');
  const accountBalanceTitle = el(
    'h3.account-info-balance-title.second-title',
    'Баланс',
  );
  const accountBalanceValue = el(
    'span.account-info-balance-value',
    `${data.balance.toLocaleString()} ₽`,
  );
  setChildren(titleAndButtonWrapper, [pageTitle, backLink]);
  setChildren(inner, [titleAndButtonWrapper, accountInfoWrapper]);
  setChildren(accountBalanceWrapper, [
    accountBalanceTitle,
    accountBalanceValue,
  ]);
  setChildren(accountInfoWrapper, [accountTilte, accountBalanceWrapper]);

  return inner;
};

export const createBlockWithCanvas = (elemClass, title, canvasId) => {
  const wrapper = el(`div.${elemClass}.wrapper.wrapper-light`);
  const titleEl = el(`h2.second-title.${elemClass}-title`, title);
  const canvasWrapper = el(`div.${elemClass}-canvas-wrapper.canvas-wrapper`);
  const canvas = el(`canvas.${elemClass}-canvas#${canvasId}`);

  setChildren(wrapper, [titleEl, canvasWrapper]);
  mount(canvasWrapper, canvas);

  return { wrapper, canvas };
};
