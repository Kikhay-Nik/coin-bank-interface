import Navigo from 'navigo';
import createLoginPage from '../pages/loginPage/createLoginPage';
import createAccountsPage from '../pages/accountsPage/createAccountsPage';
import createDetailsPage from '../pages/detailsPage/createDetailsPage';

const router = new Navigo('/');

router.on('/', () => {
  localStorage.removeItem('token');
  createLoginPage(router);
});

router.on('/accounts', () => {
  createAccountsPage(router);
});

router.on('/details:id', (data) => {
  const pageId = data.data.id.split(':').pop();
  createDetailsPage(pageId);
});

router.on('/account-history', () => {
  console.log('account-history');
});

router.resolve();
