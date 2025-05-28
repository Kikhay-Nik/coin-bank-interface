import { el, setChildren, mount, setAttr } from 'redom';
import createSkeletonCard from './createSkeletonCard';
import { downArrow } from '../../DOMUtils/createIcons';

export default () => {
  const container = el('div.container');
  const topWrapper = el('div.account-wrapper.flex');
  const title = el('div.skeleton.skeleton-account-title');
  const input = el('div.flex.center-between.skeleton-account-input.input-long');
  const placeholder = el('div.skeleton.skeleton-account-input-placeholder');
  const icon = downArrow();
  setAttr(icon, { width: '10px', height: '5px' });
  const button = el('div.skeleton.skeleton-account-button.btn-reset');
  const cardsList = el('div.grid.account-card-wrapper');

  for (let i = 0; i < 9; i++) {
    const card = createSkeletonCard();
    mount(cardsList, card);
  }

  setChildren(input, [placeholder, icon]);
  setChildren(topWrapper, [title, input, button]);
  setChildren(container, [topWrapper, cardsList]);

  return container;
};
