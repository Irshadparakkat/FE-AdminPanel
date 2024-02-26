import { Menu } from 'antd';

import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  FilePdfOutlined,
  CreditCardOutlined,
  ControlOutlined,
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { erp } from '@/redux/erp/actions';
import { selectListItems, selectItemById } from '@/redux/erp/selectors';
import { useErpContext } from '@/context/erp';

import { DOWNLOAD_BASE_URL } from '@/config/serverApiConfig';
import uniqueId from '@/utils/uinqueId';

import {
  S3_BASE_URL
} from '@/config/serverApiConfig';
import { EmailOutlined } from '@material-ui/icons';


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
      <Menu.Item key={`${uniqueId()}`} icon={<DeleteOutlined />} onClick={Status}>
      Update Frequency
      </Menu.Item>
    </Menu>
  );
}
