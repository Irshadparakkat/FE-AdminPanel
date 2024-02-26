import DataTable from "./DataTable";
import { useDispatch ,useSelector} from 'react-redux';
import { erp } from '@/redux/erp/actions';
import { useErpContext } from '@/context/erp';
import { useLayoutEffect } from "react";
import Visibility from "../Visibility";
import ChangeFrequancyModal from "./FreequancyChange";


  export default function FreequancyPanel({config,DataTableDropMenu}) {
    const dispatch = useDispatch();
    const { state } = useErpContext();
    const { dataTableList,statusModal } = state;
    useLayoutEffect(() => {
      dispatch(erp.resetState());
    }, []);
    return (
      <>
      <Visibility isVisible={dataTableList.isOpen}>
          <DataTable config={config} DataTableDropMenu={DataTableDropMenu} />
          <ChangeFrequancyModal  config={config} isVisible={statusModal.isOpen} />
     </Visibility>
      </>
    );
  }