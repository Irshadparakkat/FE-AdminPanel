import { createSelector } from 'reselect';

const selectErp = (state) => state.erp;

export const selectCurrentItem = createSelector([selectErp], (erp) => erp.current);

export const selectListItems = createSelector([selectErp], (erp) => erp.list);

export const selectPayListItems = createSelector([selectErp], (erp) => erp.listPayment);

export const selectItemById = (itemId) =>
  createSelector(selectListItems, (list) => list.result.items.find((item) => item.id === itemId));


  export const selectPaymentItemById = (itemId) =>
  createSelector(selectPayListItems, (list) => list.result.items.find((item) => item.id === itemId));

export const selectCreatedItem = createSelector([selectErp], (erp) => erp.create);

export const selectCreatedProcessItem = createSelector([selectErp], (erp) => erp.createProcess);

export const selectUpdatedItem = createSelector([selectErp], (erp) => erp.update);

export const selectRecordPaymentItem = createSelector([selectErp], (erp) => erp.recordPayment);

export const selectExpenseRecordPaymentItem = createSelector([selectErp], (erp) => erp.recordExpensePayment);

export const selectPurchaseOrderItem = createSelector([selectErp], (erp) => erp.recordPurchasePayment);


export const selectClientPaymentItem = createSelector([selectErp], (erp) => erp.recordClientPayment);

export const selectSubContractPaymentItem = createSelector([selectErp], (erp) => erp.recordSubContractPayment);

export const selectReadItem = createSelector([selectErp], (erp) => erp.read);

export const selectDeletedItem = createSelector([selectErp], (erp) => erp.delete);

export const selectSearchedItems = createSelector([selectErp], (erp) => erp.search);
