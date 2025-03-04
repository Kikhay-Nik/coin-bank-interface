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
) => {
  let additionalInputClass;
  if (long) {
    additionalInputClass = '.input-long';
  } else {
    additionalInputClass = '.input-short';
  }
  const label = el(`label.label.${elemClass}-label.flex`, labelText);
  const input = el(`input.input.${elemClass}-input${additionalInputClass}`, {
    placeholder: inputPlaceholder,
  });

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

export const createAccountCards = (data, parent, router) => {
  const accounts = data.map((obj) => createAccountCard(obj, router));
  setChildren(parent, accounts);
};

export const createBackButton = (elemClass = '') => {
  const backButton = el(
    `button.btn-reset.fill-button.back-button.${elemClass}.flex`,
  );
  const buttonText = text('Вернуться назад');
  const arrowIconEl = arrowIcon;
  setChildren(backButton, [arrowIconEl, buttonText]);
  backButton.addEventListener('click', () => {
    window.history.back();
  });
  return backButton;
};
