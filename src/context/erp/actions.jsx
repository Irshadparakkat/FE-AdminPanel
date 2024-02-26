import * as actionTypes from './types';

const contextActions = (dispatch) => {
  return {
    modal: {
      open: () => {
        dispatch({ type: actionTypes.OPEN_MODAL });
      },
      close: () => {
        dispatch({ type: actionTypes.CLOSE_MODAL });
      },
    },
    statusModals: {
      open: () => {
        dispatch({ type: actionTypes.OPEN_MODAL_EMAIL });
      },
      close: () => {
        dispatch({ type: actionTypes.CLOSE_MODAL_EMAIL });
      },
    },
    readPanel: {
      open: () => {
        dispatch({ type: actionTypes.OPEN_PANEL, keyState: 'read' });
      },
      close: () => {
        dispatch({ type: actionTypes.CLOSE_PANEL });
      },
    },
    updatePanel: {
      open: () => {
        dispatch({ type: actionTypes.OPEN_PANEL, keyState: 'update' });
      },
      close: () => {
        dispatch({ type: actionTypes.CLOSE_PANEL });
      },
    },
    updatePanelPatient: {
      open: (stepStatus) => {
        dispatch({ type: actionTypes.OPEN_PANEL_PATIENT, keyState: 'updatePanelPatient', stepStatus });
      },
      close: () => {
        dispatch({ type: actionTypes.CLOSE_PANEL_PATIENT });
      },
    },
    updatePanelRma: {
      open: (stepStatus) => {
        dispatch({ type: actionTypes.OPEN_PANEL_RMA, keyState: 'updatePanelRma', stepStatus });
      },
      close: () => {
        dispatch({ type: actionTypes.CLOSE_PANEL_RMA });
      },
    },
    
    createPanel: {
      open: () => {
        dispatch({ type: actionTypes.OPEN_PANEL, keyState: 'create' });
      },
      close: () => {
        dispatch({ type: actionTypes.CLOSE_PANEL });
      },
    },
    recordPanel: {
      open: () => {
        dispatch({
          type: actionTypes.OPEN_PANEL,
          keyState: 'recordPayment',
        });
      },
      close: () => {
        dispatch({ type: actionTypes.CLOSE_PANEL });
      },
    },
    recordExpensePanel: {
      open: () => {
        dispatch({
          type: actionTypes.OPEN_EXPENSE_PANEL,
          keyState: 'recordExpensePayment',
        });
      },
      close: () => {
        dispatch({ type: actionTypes.CLOSE_EXPENSE_PANEL });
      },
    },
    recordPurchasePayment: {
      open: () => {
        dispatch({
          type: actionTypes.OPEN_PURCHASE_PANEL,
          keyState: 'recordPurchasePayment',
        });
      },
      close: () => {
        dispatch({ type: actionTypes.CLOSE_PURCHASE_PANEL });
      },
    },
    recordClientPayment: {
      open: () => {
        dispatch({
          type: actionTypes.OPEN_CLIENT_PANEL,
          keyState: 'recordClientPayment',
        });
      },
      close: () => {
        dispatch({ type: actionTypes.CLOSE_CLIENT_PANEL });
      },
    },
    recordSubContractPayment: {
      open: () => {
        dispatch({
          type: actionTypes.OPEN_SUBCONTRACT_PANEL,
          keyState: 'recordSubContractPayment',
        });
      },
      close: () => {
        dispatch({ type: actionTypes.CLOSE_SUBCONTRACT_PANEL });
      },
    },
  };
};

export default contextActions;
