/* eslint-disable object-curly-newline */
import { el, setChildren, mount, text } from 'redom';
import { createErrorDisplayEl } from '../../DOMUtils/createPageUtils';
import inputValidate from '../../DOMUtils/inputValidate';
import verification from './verification';

export default function createLoginForm(submitHandler, router) {
  const authForm = el('form.auth-form.flex');
  const authFormInner = el('div.auth-form-inner.flex');
  const loginLabel = el('label.auth-label.label');
  const passwordLabel = el('label.auth-label.label');

  const loginInput = el('input.auth-input.input.input-long', {
    placeholder: 'Введите логин',
    id: 'username',
    type: 'text',
    name: 'username',
    autocomplete: 'username',
    required: '',
    'data-test': 'username-input',
  });
  const passwordInput = el('input.auth-input.input.input-long', {
    placeholder: 'Введите пароль',
    id: 'password',
    type: 'password',
    name: 'password',
    autocomplete: 'current-password',
    required: '',
    'data-test': 'password-input',
  });

  const buttonWrapper = el('div.auth-button-wrapper');
  const button = el('button.btn-reset.fill-button.auth-button', 'Войти', {
    type: 'submit',
    'data-test': 'auth-button',
  });

  mount(buttonWrapper, button);
  setChildren(loginLabel, [text('Логин'), loginInput], createErrorDisplayEl());
  setChildren(passwordLabel, [
    text('Пароль'),
    passwordInput,
    createErrorDisplayEl(),
  ]);
  setChildren(authFormInner, [loginLabel, passwordLabel]);
  setChildren(authForm, [authFormInner, buttonWrapper]);

  const authInputs = authForm.querySelectorAll('input');
  authInputs.forEach((input) => {
    const parentLabel = input.closest('label');
    input.addEventListener('blur', () => {
      inputValidate(input, button);
    });
    input.addEventListener('input', () => {
      const errorDisplay = parentLabel.querySelector('.error-display');
      errorDisplay.textContent = '';
      if (parentLabel.classList.contains('error')) {
        parentLabel.classList.remove('error');
      }
      if (parentLabel.classList.contains('success')) {
        parentLabel.classList.remove('success');
      }
    });
  });
  authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const validInputs = authForm.querySelectorAll('.success');
    authInputs.forEach((input) => {
      inputValidate(input, button);
    });
    if (validInputs.length === authInputs.length) {
      const login = loginInput.value;
      const password = passwordInput.value;
      const response = await submitHandler(login, password);
      if (verification(response, authForm)) {
        router.navigate('/accounts');
      }
    }
  });
  return authForm;
}
