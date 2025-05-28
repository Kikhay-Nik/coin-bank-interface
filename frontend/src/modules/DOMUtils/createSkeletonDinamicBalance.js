import { el, mount, setChildren } from 'redom';
import randomNumber from '../utils/randomNumber';

export default (elemClass, monthsCount, middle = false) => {
  const wrapper = el(
    `div.wrapper.wrapper-light.balance-dinamic.${elemClass}-balance-dinamic`,
  );
  const title = el(
    `div.skeleton.skeleton-dinamic-title.skeleton-${elemClass}-title`,
  );
  const inner = el('div.flex.skeleton-dinamic-chart-wrapper');
  const chart = el(
    `div.flex.skeleton-dinamic-chart.${elemClass}-dinamic-chart`,
  );
  const amountWrapper = el('div.flex.skeleton-dinamic-amounts');
  const topAmount = el(
    'div.skeleton.skeleton-dinamic-top-amount.skeleton-dinamic-amount',
  );
  const bottomAmount = el(
    'div.skeleton.skeleton-dinamic-bottom-amount.skeleton-dinamic-amount',
  );
  const monthWrapper = el(
    'div.flex.center-between.skeleton-dinamic-months-wrapper',
  );

  for (let i = 0; i < monthsCount; i++) {
    const bar = el('div.skeleton.skeleton-dinamic-bar', {
      style: { height: `${randomNumber(20, 100)}%` },
    });
    mount(chart, bar);
    const month = el('div.skeleton.skeleton-dinamic-month');
    mount(monthWrapper, month);
  }

  mount(amountWrapper, topAmount);
  if (middle) {
    const middleAmount = el(
      'div.skeleton.skeleton-dinamic-middle-amount.skeleton-dinamic-amount',
    );
    mount(amountWrapper, middleAmount);
  }
  mount(amountWrapper, bottomAmount);

  setChildren(inner, [chart, amountWrapper]);
  setChildren(wrapper, [title, inner, monthWrapper]);

  return wrapper;
};
