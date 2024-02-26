import React, { useLayoutEffect ,useEffect,useState } from 'react';

import DataTable from './DataTable';
import CreateItem from './CreateItem';

import UpdateItem from './UpdateItem';
import Delete from './DeleteItem';
import ReadItem from './ReadItem';
import Payment from './Payment';
import Search from './SearchItem';
import { selectListItems } from '@/redux/erp/selectors';

import { useDispatch ,useSelector} from 'react-redux';
import { erp } from '@/redux/erp/actions';

import { useErpContext } from '@/context/erp';
import { useSetState, useStateList } from 'react-use';
// import PurchaseOrderPayment from './PurchaseOrder';
// import ClientPayment from './ClientPayment';
// import ClientPaymentRecord from './ClientPayment';
// import SubContractPayment from './SubContract';

const Visibility = ({ isVisible, children }) => {
  const show = isVisible ? { display: 'block', opacity: 1 } : { display: 'none', opacity: 0 };
  return <div style={show}>{children}</div>;
};

export default function ErpPanel({ config, CreateForm, UpdateForm, DataTableDropMenu }) {
  const dispatch = useDispatch();
  const { state } = useErpContext();
  const { update, read, create, recordPayment, dataTableList, deleteModal,recordExpensePayment,recordPurchasePayment,recordClientPayment,recordSubContractPayment } = state;
  useLayoutEffect(() => {
    dispatch(erp.resetState());
  }, []);

  return (
    <>
      <Visibility isVisible={dataTableList.isOpen}>
        <DataTable config={config} DataTableDropMenu={DataTableDropMenu} />
      </Visibility>
      <Visibility isVisible={read.isOpen}>
        <ReadItem config={config} />
      </Visibility>
      {/* <Visibility isVisible={recordExpensePayment.isOpen}>
        <ExpenseEntryPayment config={config}/>
      </Visibility> */}
      {/* <Visibility isVisible={recordPurchasePayment.isOpen}>
        <PurchaseOrderPayment config={config}/>
      </Visibility> */}
      {/* <Visibility isVisible={recordClientPayment.isOpen}>
        <ClientPaymentRecord config={config}/>
      </Visibility> */}
      {/* <Visibility isVisible={recordSubContractPayment.isOpen}>
        <SubContractPayment config={config}/>
      </Visibility> */}
      <Visibility isVisible={recordPayment.isOpen}>
        <Payment config={config} />
      </Visibility>
      <Visibility isVisible={update.isOpen}>
        <UpdateItem config={config} UpdateForm={UpdateForm} />
      </Visibility>
      <Visibility isVisible={create.isOpen}>
        <CreateItem config={config} CreateForm={CreateForm} />
      </Visibility>

      <Delete config={config} isVisible={deleteModal.isOpen} />
    </>
  );
}
