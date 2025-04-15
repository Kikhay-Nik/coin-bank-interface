import { mount } from 'redom';
import { createPage } from '../../DOMUtils/createPageUtils';
import createHeader from '../../DOMUtils/createHeader';
import { getAtmsData } from '../../api/apiMethods';
import createAtmsSection from './createAtmsSection';

export default async () => {
  const atmsData = await getAtmsData();
  const { app, mainEl } = createPage();
  const headerPageEl = createHeader(true);
  const atmsSection = createAtmsSection(atmsData.payload);
  mount(app, headerPageEl, mainEl);
  mount(mainEl, atmsSection);
};
