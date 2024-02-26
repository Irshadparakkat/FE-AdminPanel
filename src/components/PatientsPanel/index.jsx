  import React, { useLayoutEffect } from 'react';

  import DataTable from './DataTable';
  import Delete from './DeleteItem';
  import Dashboard from './Dashboard';
  import Payment from './Payment';
  import Search from './SearchItem';
  import CreateStepsForm from './CreateStepsForm'

  import { useDispatch } from 'react-redux';
  import { erp } from '@/redux/erp/actions';

  import { useErpContext } from '@/context/erp';
import { useEffect } from 'react';

  const Visibility = ({ isVisible, children }) => {
    const show = isVisible ? { display: 'block', opacity: 1 } : { display: 'none', opacity: 0 };
    return <div style={show}>{children}</div>;
  };

  export default function PatientsPanel({ config,  DataTableDropMenu }) {
    const dispatch = useDispatch();
    const { state } = useErpContext();
    const { update,stepStatus,updatePanelPatient, read, create, recordPayment, dataTableList, deleteModal } = state;
    useLayoutEffect(() => {
      dispatch(erp.resetState());
    }, []);

    

    return (
      <>
        <Visibility isVisible={dataTableList.isOpen}>
          <DataTable config={config} DataTableDropMenu={DataTableDropMenu} />
        </Visibility>
        <Visibility isVisible={read.isOpen}>
          <Dashboard config={config} />
        </Visibility>
        <Visibility isVisible={recordPayment.isOpen}>
          <Payment config={config} />
        </Visibility>
        <Visibility isVisible={updatePanelPatient.isOpen}>
            <CreateStepsForm config={config} updateForm={updatePanelPatient.isOpen} stepStatus={stepStatus} />
        </Visibility>
        <Visibility isVisible={create.isOpen}>
          <CreateStepsForm config={config} />
        </Visibility>

        <Delete config={config} isVisible={deleteModal.isOpen} />
      </>
    );
  }
