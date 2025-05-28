import { el, setChildren, mount } from 'redom';

export default () => {
  const wrapper = el('div.details-transfer.wrapper.wrapper-grey');
  const inner = el('div.transfer-form.flex');
  const title = el('div.skeleton.skeleton-transfer-title');
  const topRow = el('div.flex.skeleton-transfer-row-end');
  const topLabel = el('div.skeleton.skeleton-transfer-top-label');
  const topInput = el('div.skeleton-transfer-input.input-long.flex');
  const topInputplaceholder = el(
    'div.skeleton.skeleton-transfer-top-input-text',
  );
  const bottomRow = el('div.flex.skeleton-transfer-row-end');
  const bottomLabel = el('div.skeleton.skeleton-transfer-bottom-label');
  const bottomInput = el('div.skeleton-transfer-input.input-long.flex');
  const bottomInputplaceholder = el(
    'div.skeleton.skeleton-transfer-bottom-input-text',
  );
  const button = el('div.skeleton.skeleton-transfer-button.btn-reset');

  mount(topInput, topInputplaceholder);
  mount(bottomInput, bottomInputplaceholder);

  setChildren(topRow, [topLabel, topInput]);
  setChildren(bottomRow, [bottomLabel, bottomInput]);
  setChildren(inner, [title, topRow, bottomRow, button]);
  mount(wrapper, inner);

  return wrapper;
};
