import { mount, setChildren } from 'redom';
import { getAccountById } from '../../api/apiMethods';
import { createPage } from '../../DOMUtils/createPageUtils';
import createHeader from '../../DOMUtils/createHeader';
import createHistorySection from './createHistorySection';
import createSkeletonHistoryPage from './createSkeletonHistoryPage';

export default async (id) => {
  const { app, mainEl } = createPage();
  const headerPageEl = createHeader(true);
  mount(app, headerPageEl, mainEl);
  const skeleton = createSkeletonHistoryPage();
  mount(mainEl, skeleton);
  const accountsData = await getAccountById(id);
  const historySection = createHistorySection(accountsData.payload);
  setChildren(mainEl, [historySection]);
};
