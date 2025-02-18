import stringValidate from './validateLoginForm';

export default function inputValidate(input, button) {
  const parentLabel = input.closest('label');
  const currentValue = input.value.trim();
  const { valid, error } = stringValidate(currentValue);
  const errorDisplay = parentLabel.querySelector('.error-display');
  errorDisplay.textContent = error;
  if (!valid) {
    parentLabel.classList.add('error');
    button.disabled = true;
  }
  if (valid) {
    parentLabel.classList.add('success');
    button.disabled = false;
  }
}
