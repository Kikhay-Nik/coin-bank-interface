import { mount, setChildren } from 'redom';
import { createPage } from '../../DOMUtils/createPageUtils';
import createHeader from '../../DOMUtils/createHeader';
import createCurrencySection from './createCurrencySection';
import { getAccountCurrency } from '../../api/apiMethods';
import createSkeletonCurrencyPage from './createSkeletonCurrencyPage';

export default async () => {
  const { app, mainEl } = createPage();
  const headerPageEl = createHeader(true);
  mount(app, headerPageEl, mainEl);
  const skeleton = createSkeletonCurrencyPage();
  mount(mainEl, skeleton);
  const data = await getAccountCurrency();
  const currencySection = await createCurrencySection(data);
  setChildren(mainEl, [currencySection]);
};
