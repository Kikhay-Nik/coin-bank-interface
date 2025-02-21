// eslint-disable-next-line object-curly-newline
import { el, mount, unmount, setChildren } from 'redom';
import createAccountCard from '../pages/accountPage/createAccountCard';

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

export const createWarningDisplayEl = (text, parent) => {
  const warningElem = el('span.warning-display', text);
  mount(parent, warningElem);

  setTimeout(() => {
    unmount(parent, warningElem);
  }, 5000);
};

export const createOptionsToSelect = (
  optionTetx,
  optionValue,
  elementClass,
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
