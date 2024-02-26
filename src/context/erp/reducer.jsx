import * as actionTypes from './types';

export const initialState = {
  create: {
    isOpen: false,
  },
  update: {
    isOpen: false,
  },
  updatePanelPatient: {
    isOpen: false,
    stepStatus:'1/4'
  },
  updatePanelRma: {
    isOpen: false,
    stepStatus:'1/4'
  },
  read: {
    isOpen: false,
  },
  recordPayment: {
    isOpen: false,
  },
  recordExpensePayment: {
    isOpen: false,
  },
  recordPurchasePayment: {
    isOpen: false,
  },
  recordClientPayment: {
    isOpen: false,
  },
  recordSubContractPayment: {
    isOpen: false,
  },
  deleteModal: {
    isOpen: false,
  },
  statusModal: {
    isOpen: false,
  },
  dataTableList: {
    isOpen: true,
  },
  last: null,
};

export function contextReducer(state, action) {
  const { keyState = null } = action;
  switch (action.type) {
    case actionTypes.OPEN_MODAL:
      return {
        ...state,
        deleteModal: { isOpen: true },
      };
    case actionTypes.CLOSE_MODAL:
      return {
        ...state,
        deleteModal: { isOpen: false },
      };
   case actionTypes.OPEN_MODAL_EMAIL:
        return {
          ...state,
          statusModal: { isOpen: true },
        };
      case actionTypes.CLOSE_MODAL_EMAIL:
        return {
          ...state,
          statusModal: { isOpen: false },
        };



    case actionTypes.OPEN_PANEL:
      return {
        ...initialState,
        dataTableList: {
          isOpen: false,
        },
        [keyState]: { isOpen: true },
      };
  
      case actionTypes.OPEN_PANEL_PATIENT:
        return {
          ...initialState,
          dataTableList: {
            isOpen: false,
          },
          [keyState]: { isOpen: true },
          stepStatus: action.stepStatus, // Update step status
      };
      

      case actionTypes.OPEN_PANEL_RMA:
        return {
          ...initialState,
          dataTableList: {
            isOpen: false,
          },
          [keyState]: { isOpen: true },
          stepStatus: action.stepStatus, // Update step status
      };
      
      
      case actionTypes.OPEN_EXPENSE_PANEL:
        return {
          ...initialState,
          dataTableList: {
            isOpen: false,
          },
          [keyState]: { isOpen: true },
        };
        case actionTypes.OPEN_PURCHASE_PANEL:
        return {
          ...initialState,
          dataTableList: {
            isOpen: false,
          },
          [keyState]: { isOpen: true },
        };
        case actionTypes.OPEN_CLIENT_PANEL:
        return {
          ...initialState,
          dataTableList: {
            isOpen: false,
          },
          [keyState]: { isOpen: true },
        };
        case actionTypes.OPEN_SUBCONTRACT_PANEL:
          return {
            ...initialState,
            dataTableList: {
              isOpen: false,
            },
            [keyState]: { isOpen: true },
          };
    case actionTypes.CLOSE_PANEL:
      return {
        ...initialState,
      };

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
