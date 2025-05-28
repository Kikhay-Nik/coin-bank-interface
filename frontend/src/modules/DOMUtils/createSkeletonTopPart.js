import { el, setChildren } from 'redom';

export default (elemClass) => {
  const wrrapper = el('div.account-info-inner.flex');
  const titleWrapper = el('div.center-between.flex');
  const title = el(
    `div.skeleton.skeleton-${elemClass}-title.skeleton-top-title`,
  );
  const button = el(
    `div.btn-reset.skeleton.skeleton-${elemClass}-button.skeleton-top-button`,
  );
  const accountWrapper = el('div.center-between.flex');
  const account = el(
    `div.skeleton.skeleton-${elemClass}-account.skeleton-top-account`,
  );
  const balance = el(
    `div.skeleton.skeleton-${elemClass}-balance.skeleton-top-balance`,
  );

  setChildren(titleWrapper, [title, button]);
  setChildren(accountWrapper, [account, balance]);
  setChildren(wrrapper, [titleWrapper, accountWrapper]);

  return wrrapper;
};
