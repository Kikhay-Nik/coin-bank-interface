/* eslint-disable import/prefer-default-export */
import Navigo from 'navigo';
import { mount, text } from 'redom';
import createLoginPage from '../loginPage/createLoginPage';
import { createPage } from '../DOMUtils/createPageUtils';
import createHeader from '../DOMUtils/createHeader';

const router = new Navigo('/');

const pagelinks = document.querySelectorAll('a');
pagelinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    router.navigate(e.currentTarget.pathname);
  });
});

router.on('/', () => {
  createLoginPage(router);
});

router.on('/account', () => {
  const { app, mainEl } = createPage();
  const headerPageEl = createHeader(true);
  mount(app, headerPageEl, mainEl);
  mount(mainEl, text('account page'));
});

router.resolve();
