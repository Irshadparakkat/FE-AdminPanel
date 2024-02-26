import React, { useEffect, useState } from 'react';
import { Modal, Select } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { erp } from '@/redux/erp/actions';
import { useErpContext } from '@/context/erp';
import { selectDeletedItem } from '@/redux/erp/selectors';
import { valueByString } from '@/utils/helpers';

const { Option } = Select;

export default function UpdateKeyModal({ config }) {
    let {
        deleteURL,
        entityDisplayLabels,
        Message = 'Do you Want to Change Status of ',
        modalTitle = 'Change Status',
        listURL,
        updatURL,
        deleteRequest
    } = config;
    const dispatch = useDispatch();
    const { current, isLoading, isSuccess } = useSelector(selectDeletedItem);
    const { state, erpContextAction } = useErpContext();
    const { statusModal } = state;
    const { statusModals } = erpContextAction;
    const [displayItem, setDisplayItem] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');

    useEffect(() => {
        if (isSuccess) {
            statusModals.close();
            dispatch(erp.list({ listURL }));
        }
        if (current) {
            let labels = entityDisplayLabels.map((x) => valueByString(current, x)).join(' ');

            setDisplayItem(labels);
        }
    }, [isSuccess, current]);


    const handleOk = () => {
        if (selectedStatus) {
            statusModals.close();
            dispatch(
                erp.create({
                    createURL: updatURL,
                    jsonData: {
                        _id: current._id,
                        strStatus: selectedStatus,
                    },
                })
            );
        }
    };
    const handleCancel = () => {
        if (!isLoading) statusModals.close();
    };
    const handleStatusChange = (value) => {
        setSelectedStatus(value);
    };

    return (
        <Modal
            okButtonProps={{ className: 'primaryBtn' }}
            title={modalTitle}
            visible={statusModals.isOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            confirmLoading={isLoading}
        >
            <p>
                {`${Message} ${current?.strName}`}
                {displayItem}
            </p>
            <Select
                style={{ width: '100%', marginTop: '16px' }}
                placeholder="Select Status"
                onChange={handleStatusChange}
            >
                <Option value="Active">Cancelled</Option>
                <Option value="Blocked">Completed</Option>
            </Select>
        </Modal>
    );
}
