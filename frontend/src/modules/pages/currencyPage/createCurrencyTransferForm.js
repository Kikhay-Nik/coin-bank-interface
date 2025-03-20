/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable object-curly-newline */
import { el, mount, setAttr, setChildren } from 'redom';
import Choices from 'choices.js';
import {
  createErrorDisplayEl,
  createLabelWithInput,
  createOptionsToSelect,
  createWarningDisplayEl,
} from '../../DOMUtils/createPageUtils';
import { getAllCurrency, postTransferCurrency } from '../../api/apiMethods';
import createCurrentCurrency from './createCurrentCurrency';

export default async (account) => {
  const responseAllCurrency = await getAllCurrency();
  const allCurrency = responseAllCurrency.payload;
  const currentCurrency = Object.keys(account.payload);

  const fromOptions = currentCurrency.map((cur) =>
    createOptionsToSelect(cur, cur, 'transfer-currency'),
  );

  const toOptions = allCurrency.map((cur) =>
    createOptionsToSelect(cur, cur, 'transfer-currency'),
  );

  let fromValue = '';
  let toValue = '';
  let maxValue = 0;

  const form = el('form.transfer-currency.flex');
  const formTitle = el(
    'h2.transfer-currency-title.second-title',
    'Обмен валюты',
  );
  const formInner = el('div.transfer-currency-inner.flex');
  const fromToWrapper = el('div.transfer-currency-from-to-wrapper.flex');
  const labelsWrapper = el('div.transfer-currency-labels.flex');

  const { label: fromLabel, input: fromSelect } = createLabelWithInput(
    'transfer-currency',
    'Из',
    'Выберите валюту',
    false,
    'select',
  );

  setChildren(fromSelect, fromOptions);

  mount(fromLabel, createErrorDisplayEl());

  const { label: toLabel, input: toSelect } = createLabelWithInput(
    'transfer-currency',
    'в',
    'Выберите валюту',
    false,
    'select',
  );

  setChildren(toSelect, toOptions);

  mount(toLabel, createErrorDisplayEl());

  setChildren(fromToWrapper, [fromLabel, toLabel]);

  const { label: amountLabel, input: amountInput } = createLabelWithInput(
    'amount-currency.transfer-currency',
    'Сумма',
    'Введите сумму',
    true,
  );
  mount(amountLabel, createErrorDisplayEl());
  setAttr(amountInput, {
    id: 'transferAmount',
    type: 'number',
    name: 'transferAmount',
    required: true,
    step: 0.01,
  });

  setChildren(labelsWrapper, [fromToWrapper, amountLabel]);

  const buttonWrapper = el('div.transfer-currency-button-wrapper.flex');
  const button = el(
    'button.btn-reset.fill-button.transfer-currency-button.flex',
    'Обменять',
    {
      type: 'submit',
    },
  );

  mount(buttonWrapper, button);
  setChildren(formInner, [labelsWrapper, buttonWrapper]);
  setChildren(form, [formTitle, formInner]);

  const transferInputs = form.querySelectorAll('input');
  transferInputs.forEach((input) => {
    const parentLabel = input.closest('label');
    const errorDisplay = parentLabel.querySelector('.error-display');
    input.addEventListener('blur', () => {
      if (!input.value.trim()) {
        parentLabel.classList.add('error');
        errorDisplay.textContent = 'Обязательное поле';
      } else {
        parentLabel.classList.add('success');
        input.classList.add('success');
      }
    });

    input.addEventListener('input', () => {
      errorDisplay.textContent = '';
      if (parentLabel.classList.contains('error')) {
        parentLabel.classList.remove('error');
      }
      if (parentLabel.classList.contains('success')) {
        parentLabel.classList.remove('success');
        input.classList.remove('success');
      }
    });
    amountInput.addEventListener('blur', () => {
      if (amountInput.value < 0) {
        amountLabel.classList.add('error');
        errorDisplay.textContent = 'Минимум 0.01';
      } else if (amountInput.value > maxValue) {
        amountLabel.classList.add('error');
        errorDisplay.textContent = 'Сумма превышает остаток';
      }
    });
  });

  const fromChoices = new Choices(fromSelect, {
    allowHTML: false,
    searchEnabled: false,
    itemSelectText: '',
    placeholderValue: 'Валюта',
    shouldSort: false,
    classNames: {
      containerOuter: ['choices', 'input-short', 'transfer-currency'],
    },
  });

  fromChoices.passedElement.element.addEventListener('choice', (event) => {
    fromValue = event.detail.value;
    for (const cur in account.payload) {
      if (fromValue === cur) maxValue = account.payload[cur].amount;
    }
  });

  const toChoices = new Choices(toSelect, {
    allowHTML: false,
    searchEnabled: false,
    itemSelectText: '',
    placeholderValue: 'Валюта',
    shouldSort: false,
    classNames: {
      containerOuter: ['choices', 'input-short', 'transfer-currency'],
    },
  });

  toChoices.passedElement.element.addEventListener('choice', (event) => {
    toValue = event.detail.value;
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!fromValue || !toValue || !maxValue) {
      createWarningDisplayEl('Не все поля заполнены', form);
      return;
    }
    if (fromValue === toValue) {
      createWarningDisplayEl('Счета долны быть разные', form);
      return;
    }
    if (fromValue && toValue && maxValue) {
      let currencyAmount = amountInput.value;
      const transferResult = await postTransferCurrency(
        fromValue,
        toValue,
        currencyAmount,
      );

      if (!transferResult.error) {
        const wrapper = document.querySelector('.currency-current');
        const currencyList = createCurrentCurrency(transferResult);
        setChildren(wrapper, [currencyList]);

        e.target.reset();
        fromChoices.removeActiveItems();
        toChoices.removeActiveItems();
        fromValue = '';
        toValue = '';
        currencyAmount = 0;
        maxValue = 0;
        const successInputs = e.target.querySelectorAll('input.success');

        successInputs.forEach((input) => {
          input.classList.remove('success');
          input.closest('.label').classList.remove('success');
        });
      }
    }
  });

  return form;
};
