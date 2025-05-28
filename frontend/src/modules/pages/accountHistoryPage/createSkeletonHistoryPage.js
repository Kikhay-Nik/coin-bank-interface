import { el, setChildren } from 'redom';
import createSkeletonTopPart from '../../DOMUtils/createSkeletonTopPart';
import createSkeletonDinamicBalance from '../../DOMUtils/createSkeletonDinamicBalance';
import createSkeletonHistoryTable from '../../DOMUtils/createSkeletonHistoryTable';

export default () => {
  const wrapper = el(
    'div.container.history-container.skeleton-history.history',
  );
  const topPart = createSkeletonTopPart('history');
  const dinamicBalance = createSkeletonDinamicBalance('history', 12);
  const inOutTransactions = createSkeletonDinamicBalance(
    'in-out-transactions',
    12,
    true,
  );
  const table = createSkeletonHistoryTable();

  setChildren(wrapper, [topPart, dinamicBalance, inOutTransactions, table]);
  return wrapper;
};
