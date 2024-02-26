import { Menu } from 'antd';

import {
  DeleteOutlined,
  ControlOutlined,
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { erp } from '@/redux/erp/actions';
import { selectListItems, selectItemById } from '@/redux/erp/selectors';
import { useErpContext } from '@/context/erp';

import uniqueId from '@/utils/uinqueId';


export default function DataTableDropMenu({ row, entity }) {
  const dispatch = useDispatch();
  const { erpContextAction } = useErpContext();
  const { readPanel, updatePanel, recordPanel, statusModals,modal,recordClientPayment } = erpContextAction;
  const item = row;
  function Read() {
    dispatch(erp.currentItem({ data: item }));
    readPanel.open();
  }

  function RecordPayment() {
    dispatch(erp.currentAction({ actionType: 'recordClientPayment', data: item }));
    recordClientPayment.open();
    dispatch(erp.currentItem({ data: item }));
  }
 
  function Delete() {
    dispatch(erp.currentAction({ actionType: 'delete', data: item }));
    modal.open();
  }

  function Status() {
    dispatch(erp.currentAction({ actionType: 'delete', data: item }));
    statusModals.open();
  }


  return (
    <Menu style={{ minWidth: 130 }}>
      <Menu.Item key={`${uniqueId()}`} icon={<DeleteOutlined />} onClick={Delete}>
        Delete
      </Menu.Item>
      <Menu.Item key={`${uniqueId()}`} icon={<ControlOutlined />}  onClick={Status} >
      Change Status
      </Menu.Item>
    </Menu>
  );
}
