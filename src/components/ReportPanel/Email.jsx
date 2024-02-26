import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { erp } from '@/redux/erp/actions';
import { useErpContext } from '@/context/erp';
import { selectDeletedItem } from '@/redux/erp/selectors';
import { valueByString } from '@/utils/helpers';

export default function EmailSend({ config }) {
  let {
    deleteURL,
    entityDisplayLabels,
    Message = 'Do you want to Send Patient Details to  : ',
    modalTitle = 'Send Email',
    listURL,
    deleteRequest
  } = config;
  const dispatch = useDispatch();
  const { current, isLoading, isSuccess } = useSelector(selectDeletedItem);
  const { state, erpContextAction } = useErpContext();
  const { statusModal } = state;
  const { statusModals } = erpContextAction;
  const [displayItem, setDisplayItem] = useState('');

  useEffect(() => {
    if (isSuccess) {
      statusModals.close();
      dispatch(erp.list({ listURL}));
    }
    if (current) {
      let labels = entityDisplayLabels.map((x) => valueByString(current, x)).join(' ');

      setDisplayItem(labels);
    }
  }, [isSuccess, current]);

  const handleOk = () => {
    statusModals.close();
    dispatch(erp.create({ createURL:'create_mail_send',jsonData:{ ...current} }));
  };
  const handleCancel = () => {
    if (!isLoading) statusModals.close();
  };
  return (
    <Modal
      title={modalTitle}
      visible={statusModal.isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={isLoading}
    >
      <p>
        {`${Message} ${current?.strDoctorName}`}
        {displayItem}
      </p>
    </Modal>
  );
}
