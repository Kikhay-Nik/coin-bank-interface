import { el, mount, setChildren } from 'redom';
import { EXCHANGE_FEED_URL } from '../../constants/api';
import { downArrow, topArrow } from '../../DOMUtils/createIcons';

export default () => {
  const wrapper = el('div.exchange-currency');
  const title = el(
    'h2.exchange-currency-title.second-title',
    'Изменение курсов в реальном времени',
  );

  const inner = el('div.exchange-currency-inner');
  const list = el('dl.exchange-currency-list.flex');
  mount(inner, list);
  const lineArray = [];

  const exchangeSocket = new WebSocket(EXCHANGE_FEED_URL);

  exchangeSocket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.type === 'EXCHANGE_RATE_CHANGE') {
      const additionalClass = message.change < 0 ? 'warning' : 'success';
      const changeIcon = message.change < 0 ? downArrow() : topArrow();
      const line = el(`div.exchange-currency-line.flex.${additionalClass}`);
      const curruncyCodes = el(
        'dt.exchange-currency-code',
        `${message.from}/${message.to}`,
      );
      const currencyRate = el('dd.exchange-currency-rate', message.rate);

      setChildren(line, [curruncyCodes, currencyRate, changeIcon]);

      lineArray.unshift(line);
      if (lineArray.length === 13) lineArray.pop();
    }
    setChildren(list, lineArray);
  };

  setChildren(wrapper, [title, inner]);

  return wrapper;
};
