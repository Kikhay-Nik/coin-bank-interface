import { el, mount, setChildren } from 'redom';

const createHistoryItem = () => {
  const item = el('div.flex.skeleton-history-table-history-item');
  const fromAccount = el(
    'div.skeleton.skeleton-history-table-from.skeleton-history-table-text',
  );
  const toAccount = el(
    'div.skeleton.skeleton-history-table-to.skeleton-history-table-text',
  );
  const amount = el(
    'div.skeleton.skeleton-history-table-amount.skeleton-history-table-text',
  );
  const date = el(
    'div.skeleton.skeleton-history-table-date.skeleton-history-table-text',
  );

  setChildren(item, [fromAccount, toAccount, amount, date]);

  return item;
};

export default () => {
  const wrapper = el('div.skeleton-history-table.wrapper.wrapper-grey');
  const title = el('div.skeleton.skeleton-history-table-title');
  const headerWrapper = el('div.flex.skeleton-history-table-header');
  const historyWrapper = el('div.flex.skeleton-history-table-history');

  for (let i = 0; i < 4; i++) {
    const headerTitle = el(
      `div.skeleton.skeleton-history-table-header-title.skeleton-history-table-header-title-${i + 1}`,
    );
    mount(headerWrapper, headerTitle);
    const historyItem = createHistoryItem();
    mount(historyWrapper, historyItem);
  }

  setChildren(wrapper, [title, headerWrapper, historyWrapper]);

  return wrapper;
};
