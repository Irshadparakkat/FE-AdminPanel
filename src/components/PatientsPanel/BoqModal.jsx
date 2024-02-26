import React from 'react';
import { Modal, Table } from 'antd';

const BOQTableModal = ({ showBOQModal, setShowBOQModal, arrSubBOQ }) => {
  const columns = [
    {
      title: 'Sl No',
      render: (text, record, index) => index + 1,
    },
    { title: 'Work Name', dataIndex: 'strWorkTypeName' },
    { title: 'Description', dataIndex: 'strDescription' },
    { title: 'Unit', dataIndex: 'strUnitName' },
    { title: 'Qty', dataIndex: 'intQty' },
    { title: 'Total Amount', dataIndex: 'intTotalAmt' },
  ];

  return (
    <Modal
      title="BOQ Details"
      visible={showBOQModal}
      onCancel={() => setShowBOQModal(false)}
      footer={null}
      width="80%"
    >
      <Table dataSource={arrSubBOQ} columns={columns} pagination={false} />
    </Modal>
  );
};

export default BOQTableModal;
