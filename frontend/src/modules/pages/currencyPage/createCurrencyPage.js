import { mount } from 'redom';
import { createPage } from '../../DOMUtils/createPageUtils';
import createHeader from '../../DOMUtils/createHeader';
import createCurrencySection from './createCurrencySection';
import { getAccountCurrency } from '../../api/apiMethods';

export default async () => {
  const data = await getAccountCurrency();
  const { app, mainEl } = createPage();
  const headerPageEl = createHeader(true);
  const currencySection = await createCurrencySection(data);
  mount(app, headerPageEl, mainEl);
  mount(mainEl, currencySection);
};
