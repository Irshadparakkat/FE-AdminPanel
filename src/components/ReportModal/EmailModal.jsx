import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { erp } from '@/redux/erp/actions';
import { useErpContext } from '@/context/erp';
import { selectDeletedItem } from '@/redux/erp/selectors';
import { valueByString } from '@/utils/helpers';
import CreateItem from '../ReportPanel/CreateItem';

export default function EmailModal({ config }) {
  let {
    deleteURL,
    entityDisplayLabels,
    listURL,
    deleteRequest
  } = config;
  const dispatch = useDispatch();
  const { current, isLoading, isSuccess } = useSelector(selectDeletedItem);
  const { state, erpContextAction } = useErpContext();
  const { deleteModal } = state;
  const { modal } = erpContextAction;
  const [displayItem, setDisplayItem] = useState('');

  useEffect(() => {
    if (isSuccess) {
      modal.close();
      dispatch(erp.list({ listURL}));
    }
    if (current) {
      let labels = entityDisplayLabels.map((x) => valueByString(current, x)).join(' ');

      setDisplayItem(labels);
    }
  }, []);


  const handleCancel = () => {
    if (!isLoading) modal.close();
  };
  return (

    <Modal bodyStyle={{padding:'30px 60px'}}
      visible={deleteModal.isOpen}
      onCancel={handleCancel}
      confirmLoading={isLoading}
    >
      
      <h1>Email</h1>
    </Modal>
  );
}
