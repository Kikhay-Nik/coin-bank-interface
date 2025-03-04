import { el, mount, setChildren } from 'redom';
import { createPage, createContainer } from '../../DOMUtils/createPageUtils';
import createHeader from '../../DOMUtils/createHeader';
import createLoginForm from './createLoginForm';
import authoriration from './authoriration';

const createAuthSection = (router) => {
  const authSection = el('section.auth');
  const container = createContainer('auth-container.flex');
  const authWrapper = el('div.auth-wrapper.wrapper.wrapper-grey');
  const authTitle = el('h2.auth-title.main-title', 'Вход в аккаунт');
  const authForm = createLoginForm(authoriration, router);
  setChildren(authWrapper, [authTitle, authForm]);
  mount(container, authWrapper);
  mount(authSection, container);

  return authSection;
};

export default (router) => {
  const { app, mainEl } = createPage();
  const headerPageEl = createHeader(false);
  const authSection = createAuthSection(router);
  mount(app, headerPageEl, mainEl);
  mount(mainEl, authSection);
};
