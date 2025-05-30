/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import { el, mount, setChildren } from 'redom';
import { createContainer, createLink } from './createPageUtils';
import headerlinkList from '../constants/headerlinkList';

export default function createHeader(buttons = true) {
  let buttonsWrapperEl;
  const headerEl = el('header.header');
  const headerContainerEl = createContainer('header-container.flex');
  const headerLogoEl = el('div.logo', 'Coin.');
  const headerLinksEl = headerlinkList.map((link) =>
    createLink(
      link.link,
      link.name,
      '.btn-reset.header-button.stroke-button',
      link.testAttr,
    ),
  );

  if (buttons) {
    buttonsWrapperEl = el('div.header-buttons-wrapper.flex');
    setChildren(buttonsWrapperEl, headerLinksEl);

    setTimeout(() => {
      const currentPath = window.location.pathname;
      headerLinksEl.forEach((link) => {
        if (link.pathname === currentPath) {
          link.classList.add('active');
          link.addEventListener('click', (e) => {
            e.preventDefault();
          });
        }
      }, 0);
    });
  }
  setChildren(headerContainerEl, [headerLogoEl, buttonsWrapperEl]);
  mount(headerEl, headerContainerEl);

  return headerEl;
}
