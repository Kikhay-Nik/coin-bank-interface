import { el, mount, setAttr, setChildren } from 'redom';
import randomNumber from '../../utils/randomNumber';
import { downArrow, topArrow } from '../../DOMUtils/createIcons';

const createSkeletonCurrencyItem = (exchange = false) => {
  const item = el('div.skeleton-currency-item.flex');
  const name = el('div.skeleton.skeleton-currency-name');
  const line = el('div.skeleton.skeleton-currency-line');
  const amount = el('div.skeleton.skeleton-currency-amount');

  setChildren(item, [name, line, amount]);

  if (exchange) {
    setAttr(name, {
      className: 'skeleton skeleton-currency-name-exchange',
    });
    const changeIcon = randomNumber(-1, 1) < 0 ? downArrow() : topArrow();
    mount(item, changeIcon);
  }

  return item;
};

const createSkeletonCurrencyInput = () => {
  const input = el('div.flex.center-between.skeleton-currency-form-input');
  const currencyName = el('div.skeleton.skeleton-currency-form-currency-name');
  const icon = downArrow();
  setAttr(icon, { width: '10px', height: '5px' });
  setChildren(input, [currencyName, icon]);
  return input;
};

export default () => {
  const wrapper = el('div.container.currency-container.skeleton-currency');
  const title = el('div.skeleton.skeleton-currency-title');
  const inner = el('div.flex.skeleton-currency-inner');

  //часть с валютами и формой обмена
  const currencyFormWrapper = el('div.flex.skeleton-currency-form-wrapper');
  const currentCurrency = el(
    'div.skeleton-currency-current.wrapper.wrapper-light.flex',
  );
  const currentTitle = el('div.skeleton.skeleton-currency-current-title');

  mount(currentCurrency, currentTitle);

  for (let i = 0; i < 6; i++) {
    const currentItem = createSkeletonCurrencyItem();
    mount(currentCurrency, currentItem);
  }

  // форма обмена
  const form = el('div.flex.skeleton-currency-form.wrapper.wrapper-light');
  const formInner = el('div.flex.skeleton-currency-form-inner');
  const button = el('div.skeleton.skeleton-currency-form-button');
  const formTitle = el('div.skeleton.skeleton-currency-form-title');

  const currencyInputsWrapper = el(
    'div.flex.center-between.skeleton-currency-form-inputs',
  );
  const fromLabel = el('div.skeleton.skeleton-currency-form-from');
  const fromInput = createSkeletonCurrencyInput();
  const toLabel = el('div.skeleton.skeleton-currency-form-to');
  const toInput = createSkeletonCurrencyInput();

  const amountInputsWrapper = el(
    'div.flex.skeleton-currency-form-amount-wrapper',
  );
  const amountLabel = el('div.skeleton.skeleton-currency-form-amount-label');
  const amountInput = el(
    'div.flex.skeleton-currency-form-amount-input.input-long',
  );
  const amountPlaceholder = el(
    'div.skeleton.skeleton-currency-form-amount-placeholder',
  );

  //блок с курсами обмена
  const exchange = el(
    'div.flex.skeleton-currency-exchange-rate.wrapper.wrapper-dark.currency-exchange',
  );
  const exchangeTitle = el('div.skeleton.skeleton-currency-exchange-title');
  mount(exchange, exchangeTitle);

  for (let i = 0; i < 12; i++) {
    const exchangeItem = createSkeletonCurrencyItem(true);
    mount(exchange, exchangeItem);
  }

  mount(amountInput, amountPlaceholder);
  setChildren(amountInputsWrapper, [amountLabel, amountInput]);

  setChildren(currencyInputsWrapper, [fromLabel, fromInput, toLabel, toInput]);
  setChildren(formInner, [
    formTitle,
    currencyInputsWrapper,
    amountInputsWrapper,
  ]);
  setChildren(form, [formInner, button]);
  setChildren(currencyFormWrapper, [currentCurrency, form]);
  setChildren(inner, [currencyFormWrapper, exchange]);
  setChildren(wrapper, [title, inner]);
  return wrapper;
};
