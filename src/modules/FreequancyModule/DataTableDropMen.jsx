import { Menu } from 'antd';

import {
  EditOutlined,
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { erp } from '@/redux/erp/actions';
import { selectListItems, selectItemById } from '@/redux/erp/selectors';
import { useErpContext } from '@/context/erp';

import uniqueId from '@/utils/uinqueId';



export default function DataTableDropMenu({ row, entity }) {
  const dispatch = useDispatch();
  const { erpContextAction } = useErpContext();
  const { statusModals } = erpContextAction;
  const item = row;
 

  function Status() {
    dispatch(erp.currentAction({ actionType: 'delete', data: item }));
    statusModals.open();
  }


  return (
    <Menu style={{ minWidth: 130 }}>
      <Menu.Item key={`${uniqueId()}`} icon={<EditOutlined />} onClick={Status}>
      Update Frequency
      </Menu.Item>
    </Menu>
  );
}
