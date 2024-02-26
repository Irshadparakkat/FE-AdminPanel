import DataTable from "./DataTable";
import { useDispatch ,useSelector} from 'react-redux';
import { erp } from '@/redux/erp/actions';
import { useErpContext } from '@/context/erp';
import { useLayoutEffect } from "react";
import Visibility from "../Visibility";
import Delete from "./DeleteItem";
import StatusChangeModal from "./statusChange";


  export default function UserPanel({config,DataTableDropMenu}) {
    const dispatch = useDispatch();
    const { state } = useErpContext();
    const { update, read, create, recordPayment, dataTableList, deleteModal,statusModal,recordExpensePayment,recordPurchasePayment,recordClientPayment,recordSubContractPayment } = state;
    useLayoutEffect(() => {
      dispatch(erp.resetState());
    }, []);
    return (
      <>
      <Visibility isVisible={dataTableList.isOpen}>
          <DataTable config={config} DataTableDropMenu={DataTableDropMenu} />
          <Delete config={config} isVisible={deleteModal.isOpen} />
          <StatusChangeModal  config={config} isVisible={statusModal.isOpen} />
     </Visibility>
      </>
    );
  }