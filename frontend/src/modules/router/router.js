/* eslint-disable import/prefer-default-export */
import Navigo from 'navigo';
// import { mount, text } from 'redom';
import createLoginPage from '../pages/loginPage/createLoginPage';
// import { createPage } from '../DOMUtils/createPageUtils';
// import createHeader from '../DOMUtils/createHeader';
// import { getAccountsData } from '../api/apiMethods';
// import { ACCOUNTS_URL } from '../constants/api';
import createAccountPage from '../pages/accountPage/createAccountPage';

const router = new Navigo('/');

router.on('/', () => {
  createLoginPage(router);
});

router.on('/account', () => {
  createAccountPage();
});

router.resolve();

const pagelinks = document.querySelectorAll('a');
pagelinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    router.navigate(e.currentTarget.pathname);
  });
});
