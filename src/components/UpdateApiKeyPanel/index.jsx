import DataTable from "./DataTable";
import { useDispatch ,useSelector} from 'react-redux';
import { erp } from '@/redux/erp/actions';
import { useErpContext } from '@/context/erp';
import { useLayoutEffect } from "react";
import Visibility from "../Visibility";
import Delete from "./DeleteItem";
import StatusChangeModal from "./UpdatePanel";
import UpdateKeyModal from "./UpdatePanel";
import WeatherKey from "./DeleteItem";


  export default function UpdateApiKeyPanel({config,DataTableDropMenu}) {
    const dispatch = useDispatch();
    const { state } = useErpContext();
    const { dataTableList,statusModal,deleteModal } = state;
    useLayoutEffect(() => {
      dispatch(erp.resetState());
    }, []);
    return (
      <>
      <Visibility isVisible={dataTableList.isOpen}>
          <DataTable config={config} DataTableDropMenu={DataTableDropMenu} />
          <UpdateKeyModal  config={config} isVisible={statusModal.isOpen} />
          <WeatherKey config={config} isVisible={deleteModal.isOpen} />

     </Visibility>
      </>
    );
  }