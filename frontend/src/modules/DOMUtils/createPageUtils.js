import { el, mount, unmount } from 'redom';

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
