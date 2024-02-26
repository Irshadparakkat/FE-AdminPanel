import React, { useEffect, useState } from 'react';
import { Menu, Modal, Form, Input, Button,Select } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { erp } from '@/redux/erp/actions';
import { useErpContext } from '@/context/erp';
import { selectDeletedItem } from '@/redux/erp/selectors';
import { valueByString } from '@/utils/helpers';
import api from '@/request/services';


const { Option } = Select;


export default function Comment({ config }) {
  let {
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

  const [commentForm] = Form.useForm();
  
  useEffect(() => {
    if (isSuccess) {
      modal.close();
      commentForm.resetFields(); // Clear the form fields
      dispatch(erp.list({ listURL}));
    }
    if (current) {
      let labels = entityDisplayLabels.map((x) => valueByString(current, x)).join(' ');

      setDisplayItem(labels);
    }
  }, [isSuccess, current]);

  
  const [userType, setUserType] = useState('');
  const [status, setStatus] = useState([]);


  useEffect(() => {
    const fetchPurchaseStatus = async () => {
    const statusResult = await api.getAllTypeList({ strType: 'result_status' });
      setStatus(statusResult?.arrList || []);
  
    }
    fetchPurchaseStatus();

    const storedUserType = window.localStorage.getItem('strUserType');

    setUserType(storedUserType);
  }, []);



  const handleCommentFormSubmit = () => {
    commentForm
      .validateFields()
      .then((formValues) => {
       
        modal.close();
        dispatch(erp.create({ createURL: 'create_test_comments', jsonData: { ...current, ...formValues } }));
      })
      .catch((errorInfo) => {
        console.error('Validation failed:', errorInfo);
      });
  };
  
  const handleCancel = () => {
    if (!isLoading) {
      modal.close();
      commentForm.resetFields(); // Clear the form fields
    }
  };
  return (

    <Modal
    title="Create Comment"
    visible={deleteModal.isOpen}
    confirmLoading={isLoading}
    onCancel={handleCancel}
    footer={[
      <Button key="submit" type="primary" onClick={handleCommentFormSubmit} className='primaryBtn'>
        Create
      </Button>,
    ]}
  >
    <Form form={commentForm} name="comment_form">
      <Form.Item
        name="strComment"
        label="Comment"
        rules={[
          {
            required: true,
            message: 'Please enter your comment!',
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        name="strStatus"
        label="Status"
      >
        <Select>
          {status?.length ? (
            status.map((item) => (
              <Option key={item.id} value={item.strName}>
                {item.strName}
              </Option>
            ))
          ) : (
            <Option disabled value="nodata">No Data</Option>
          )}
        </Select>
      </Form.Item>
    </Form>
  </Modal> 
  );
}
