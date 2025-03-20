/* eslint-disable no-new */
import { el, mount, setChildren } from 'redom';
import SimpleBar from 'simplebar';
import { createWarningDisplayEl } from '../../DOMUtils/createPageUtils';

export default (data) => {
  const wrapper = el('div.current-currency.flex');
  const title = el('h2.current-currency-title.second-title', 'Ваши валюты');
  const inner = el('div.current-currency-inner');
  if (!data.error) {
    const currency = data.payload;
    const list = el('dl.current-currency-list.flex');
    for (const cur in currency) {
      if (Object.hasOwn(currency, cur)) {
        const { amount, code } = currency[cur];
        if (amount) {
          const currencyLine = el('div.current-currency-line.flex');
          const currencyCodeEl = el('dt.current-currency-code', code);
          const currencyAmountEl = el('dd.current-currency-amount', amount);
          setChildren(currencyLine, [currencyCodeEl, currencyAmountEl]);
          mount(list, currencyLine);
        }
      }
    }
    mount(inner, list);
    setChildren(wrapper, [title, inner]);
  } else {
    createWarningDisplayEl(data.error, wrapper);
  }
  new SimpleBar(inner, {
    autoHide: false,
  });

  return wrapper;
};
