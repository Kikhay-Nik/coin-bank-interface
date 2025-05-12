/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable object-curly-newline */
import { el, mount, setAttr, setChildren } from 'redom';
import {
  createErrorDisplayEl,
  createLabelWithInput,
  createOptionsToSelect,
  createWarningDisplayEl,
} from '../../DOMUtils/createPageUtils';
import { envelopeIcon } from '../../DOMUtils/createIcons';
import { postTransferFunds } from '../../api/apiMethods';
import { API_TRANSFER_ERRORS } from '../../constants/api';
import { createDetailsSection } from './createDetailsPage';

export default (maxValue, account) => {
  const localAccountList = localStorage.getItem('accounts');
  let accList;
  if (!localAccountList) {
    accList = ['61253747452820828268825011'];
  } else {
    accList = JSON.parse(localAccountList);
  }
  const transferForm = el('form.transfer-form.flex', {
    'data-test': 'transfer-form',
  });
  const formTitle = el('h2.transfer-title.second-title', 'Новый перевод', {
    'data-test': 'transfer-title',
  });
  const transferFormInner = el('div.transfer-form-inner.flex');

  const { label: accountLabel, input: accountInput } = createLabelWithInput(
    'transfer',
    'Номер счёта получателя',
    'Введите счет',
    true,
  );

  mount(accountLabel, createErrorDisplayEl());
  setAttr(accountInput, {
    id: 'accountNumber',
    type: 'number',
    name: 'accountNumber',
    list: 'accounts',
    required: true,
    'data-test': 'transfer-account',
  });
  const { label: amountLabel, input: amountInput } = createLabelWithInput(
    'transfer',
    'Сумма перевода',
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
    'data-test': 'transfer-amount',
  });

  const buttonWrapper = el('div.transfer-button-wrapper.flex');
  const buttonIcon = envelopeIcon();
  const button = el(
    'button.btn-reset.fill-button.transfer-button.flex',
    [buttonIcon, 'Отправить'],
    {
      type: 'submit',
      'data-test': 'transfer-button',
    },
  );

  button.addEventListener('click', () => {
    const form = button.closest('form');

    const inputs = form.querySelectorAll('input');
    inputs.forEach((input) => {
      const parentLabel = input.closest('label');
      const errorDisplay = parentLabel.querySelector('.error-display');
      if (!input.value.trim()) {
        parentLabel.classList.add('error');
        errorDisplay.textContent = 'Обязательное поле';
      }
    });
  });

  if (maxValue === 0) button.disabled = true;

  mount(buttonWrapper, button);

  setChildren(transferFormInner, [accountLabel, amountLabel]);
  setChildren(transferForm, [formTitle, transferFormInner, buttonWrapper]);
  if (accList.length > 0) {
    const dataList = el('datalist', { id: 'accounts' });
    const dataOptions = accList.map((acc) => createOptionsToSelect('', acc));
    setChildren(dataList, dataOptions);
    mount(transferForm, dataList);
  }

  const transferInputs = transferForm.querySelectorAll('input');
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
      if (amountInput.value < 1) {
        amountLabel.classList.add('error');
        errorDisplay.textContent = 'Минимум 1';
      } else if (amountInput.value > maxValue) {
        amountLabel.classList.add('error');
        errorDisplay.textContent = 'Сумма превышает остаток';
      }
    });
  });
  transferForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const successInputs = e.currentTarget.querySelectorAll('input.success');

    if (transferInputs.length === successInputs.length) {
      const transferResult = await postTransferFunds(
        account,
        accountInput.value,
        amountInput.value,
      );
      if (!transferResult.error) {
        if (!accList.find((acc) => acc === accountInput.value)) {
          accList.push(accountInput.value);
        }
        localStorage.setItem('accounts', JSON.stringify(accList));
        transferForm.reset();
        successInputs.forEach((input) => {
          input.classList.remove('success');
          input.closest('.label').classList.remove('success');
        });
        const balanceEl = document.querySelector('.account-info-balance-value');
        balanceEl.textContent = `${transferResult.payload.balance} ₽`;
        const mainElem = document.querySelector('main');
        const detailsSection = createDetailsSection(transferResult.payload);
        setChildren(mainElem, detailsSection);
      } else {
        createWarningDisplayEl(
          API_TRANSFER_ERRORS[transferResult.error],
          transferForm,
        );
      }
    }
  });
  return transferForm;
};
