import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { erp } from '@/redux/erp/actions';
import { useErpContext } from '@/context/erp';
import { selectDeletedItem } from '@/redux/erp/selectors';
import { valueByString } from '@/utils/helpers';

export default function Delete({ config }) {
  let {
    deleteURL,
    entityDisplayLabels,
    deleteMessage = 'Do you want to delete: ',
    modalTitle = 'Remove Item',
    listURL,
    deleteRequest,
    deletePayment,
    handelDataTable
  } = config;
  const dispatch = useDispatch();
  const { current, isLoading, isSuccess } = useSelector(selectDeletedItem);
  const { state, erpContextAction } = useErpContext();
  const { deleteModal } = state;
  const { modal } = erpContextAction;
  const [displayItem, setDisplayItem] = useState('');

  useEffect(() => {
    if (isSuccess) {
      //modal.close();
      dispatch(erp.list({ listURL }));
    }
    if (current) {
      let labels = entityDisplayLabels.map((x) => valueByString(current, x)).join(' ');
      setDisplayItem(labels);
    }
  }, [isSuccess, current]);

  const handleOk = async () => {  
      await dispatch(erp.delete({ deleteURL, jsonData: { ...current, ...deleteRequest } }))
      .then(() => {
     modal.close();
        dispatch(erp.list({ listURL }));
    });
     
  };

  const handleCancel = () => {
    if (!isLoading) modal.close();
  };

  return (
    <Modal
    okButtonProps={{style:{backgroundColor:' rgb(255, 160, 176) ',color:' rgb(255, 255, 255)',borderColor:' rgb(255, 160, 176) '}}}
    cancelButtonProps={{className:'outLineIcon'}}
    title={modalTitle}
      visible={deleteModal.isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={isLoading}
    >
      <p>
        {deleteMessage}
        {displayItem}
      </p>
    </Modal>
  );
}
