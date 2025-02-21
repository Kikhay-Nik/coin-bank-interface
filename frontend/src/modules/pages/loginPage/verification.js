/* eslint-disable import/prefer-default-export */
import { createWarningDisplayEl } from '../../DOMUtils/createPageUtils';
import { API_ERRORS } from '../../constants/api';

export default (response, form) => {
  const formWarning = form.querySelector('.warning-display');
  if (!response.payload && !formWarning) {
    createWarningDisplayEl(API_ERRORS[response.error], form);
    return false;
  }
  if (!response.payload && formWarning) {
    formWarning.textContent = API_ERRORS[response.error];
    return false;
  }
  localStorage.setItem('token', response.payload.token);
  return true;
};
