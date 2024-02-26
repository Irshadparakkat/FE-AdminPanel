import React, { useEffect, useState } from 'react';
import { Input, Modal, Select } from 'antd';

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
        Message = 'Do you Want to Change Bot key ',
        modalTitle = 'Change Bot Key',
        listURL,
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
            dispatch(erp.list({ listURL }));
        }
        if (current) {
            let labels = entityDisplayLabels.map((x) => valueByString(current, x)).join(' ');

            setDisplayItem(labels);
        }
    }, [isSuccess, current]);


    const handleOk = () => {
        if (selectedStatus !='') {
            statusModals.close();
            dispatch(
                erp.create({
                    createURL: `update_apikey`,
                    jsonData: {
                        _id: current._id,
                        strBotKey: selectedStatus,
                    },
                })
            ).then(() => {
                setSelectedStatus('')
                statusModals.close();
                dispatch(erp.list({ listURL }));
            })
        }
    };
    const handleCancel = () => {
        if (!isLoading) statusModals.close();
    };
   
    const handleInputChange = (e) => {
        setSelectedStatus(e.target.value);
    };

    return (
        <Modal
            okButtonProps={{ className: 'primaryBtn' }}
            title={modalTitle}
            visible={statusModal.isOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            confirmLoading={isLoading}
        >
            <p>
                {`${Message}`}
             
            </p>
            <Input
                type="text"
                value={selectedStatus}
                onChange={handleInputChange}
                placeholder="Enter new Bot key"
                style={{ width: '100%', marginTop: '16px' }}
            />
            
        </Modal>
    );
}
