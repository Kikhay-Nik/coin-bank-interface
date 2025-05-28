import { el, setChildren } from 'redom';
import createSkeletonTransferForm from './createSkeletonTransferForm';
import createSkeletonDinamicBalance from '../../DOMUtils/createSkeletonDinamicBalance';
import createSkeletonHistoryTable from '../../DOMUtils/createSkeletonHistoryTable';
import createSkeletonTopPart from '../../DOMUtils/createSkeletonTopPart';

export default () => {
  const container = el('div.container.details-container.flex.skeleton-details');
  const topWrrapper = createSkeletonTopPart('details');

  const middleWrapper = el('div.cetner-between.flex.details-middle');
  const transferForm = createSkeletonTransferForm();
  const dinamicBalance = createSkeletonDinamicBalance('details', 6);
  const historTable = createSkeletonHistoryTable();

  setChildren(middleWrapper, [transferForm, dinamicBalance]);
  setChildren(container, [topWrrapper, middleWrapper, historTable]);

  return container;
};
