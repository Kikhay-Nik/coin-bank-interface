/* eslint-disable no-new */
import { el, mount, setChildren } from 'redom';
import { createContainer } from '../../DOMUtils/createPageUtils';
import createCurrentCurrency from './createCurrentCurrency';
import createCurrencyTransferForm from './createCurrencyTransferForm';
import createExchangeList from './createExchangeList';

export default async (data) => {
  const section = el('section.currency');
  const container = createContainer('currency-container');
  const mainTitle = el('h1.currency-title.main-title', 'Валютный обмен');
  const leftInner = el('div.currency-left.flex');
  const rightinner = el('div.currency-right.flex');
  const contentWrapper = el('div.currency-content.flex');

  const currentCurrency = el('div.currency-current.wrapper.wrapper-light', {
    'data-test': 'current-currency',
  });
  const currentCurrencyinner = createCurrentCurrency(data);
  mount(currentCurrency, currentCurrencyinner);
  mount(leftInner, currentCurrency);

  const formWrapper = el('div.currency-transfer.wrapper.wrapper-light');
  const transferForm = await createCurrencyTransferForm(data);
  mount(formWrapper, transferForm);
  mount(leftInner, formWrapper);

  const currencyExchange = el('div.currency-exchange.wrapper.wrapper-dark');
  const exchangeList = createExchangeList();
  mount(currencyExchange, exchangeList);
  mount(rightinner, currencyExchange);

  setChildren(contentWrapper, [leftInner, rightinner]);
  setChildren(container, [mainTitle, contentWrapper]);
  mount(section, container);

  return section;
};
