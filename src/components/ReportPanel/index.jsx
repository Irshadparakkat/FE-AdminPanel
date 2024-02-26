import DataTable from "./DataTable";
import { useDispatch ,useSelector} from 'react-redux';
import { erp } from '@/redux/erp/actions';
import { useErpContext } from '@/context/erp';
import { useLayoutEffect } from "react";
import CreateItem from "./CreateItem";
import Visibility from "../Visibility";
import ReportModal from "../ReportModal";
import statusModal from "../ReportModal/EmailModal";
import Comment from "./comment";
import EmailSend from "./Email";


  export default function ListsPanel({config, DataTableDropMenu,CreateForm}) {
    const dispatch = useDispatch();
    const { state } = useErpContext();
    const { update, read, create,recordPayment, dataTableList,statusModal,deleteModal,recordExpensePayment,recordPurchasePayment,recordClientPayment,recordSubContractPayment } = state;
    useLayoutEffect(() => {
      dispatch(erp.resetState());
    }, []);
    return (
      <>
      <Visibility isVisible={dataTableList.isOpen}>
          <DataTable config={config}  DataTableDropMenu={DataTableDropMenu} />
     </Visibility>
     
      <Visibility isVisible={create.isOpen}>
          <ReportModal config={config}  CreateForm={CreateForm}/>
      </Visibility>
     <Comment  config={config} isVisible={deleteModal.isOpen} />
     <EmailSend  config={config} isVisible={statusModal.isOpen} />

      </>
    );
  }