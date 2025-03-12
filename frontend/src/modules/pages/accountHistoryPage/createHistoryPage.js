import { mount } from 'redom';
import { getAccountById } from '../../api/apiMethods';
import { createPage } from '../../DOMUtils/createPageUtils';
import createHeader from '../../DOMUtils/createHeader';
import createHistorySection from './createHistorySection';

export default async (id) => {
  const accountsData = await getAccountById(id);
  const { app, mainEl } = createPage();
  const headerPageEl = createHeader(true);
  mount(app, headerPageEl, mainEl);
  const historySection = createHistorySection(accountsData.payload);
  mount(mainEl, historySection);
};
