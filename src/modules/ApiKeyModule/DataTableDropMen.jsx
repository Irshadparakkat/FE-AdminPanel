import { Menu } from 'antd';

import {
  EditOutlined,
  ControlOutlined,
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { erp } from '@/redux/erp/actions';
import { useErpContext } from '@/context/erp';

import uniqueId from '@/utils/uinqueId';


export default function DataTableDropMenu({ row, entity }) {
  const dispatch = useDispatch();
  const { erpContextAction } = useErpContext();
  const { readPanel, updatePanel, recordPanel, statusModals,modal,recordClientPayment } = erpContextAction;
  const item = row;
 
 
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
      <Menu.Item key={`${uniqueId()}`} icon={<EditOutlined />} onClick={Delete}>
      Update Weather Key
      </Menu.Item>
      <Menu.Item key={`${uniqueId()}`} icon={<ControlOutlined />}  onClick={Status} >
      Update Bot key
      </Menu.Item>
    </Menu>
  );
}
