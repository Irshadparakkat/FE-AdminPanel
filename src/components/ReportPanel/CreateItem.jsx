import React, { useState, useEffect } from 'react';
import { Form, Divider } from 'antd';

import { Button, PageHeader, Row, Statistic, Tag } from 'antd';

import { useSelector, useDispatch } from 'react-redux';
import { erp } from '@/redux/erp/actions';
import { selectCreatedItem } from '@/redux/erp/selectors';

import { useErpContext } from '@/context/erp';
import uniqueId from '@/utils/uinqueId';

import Loading from '@/components/Loading';
import { CloseCircleOutlined, PlusOutlined } from '@ant-design/icons';

function SaveForm({ form, config }) {
  let { CREATE_ENTITY } = config;
  const handelClick = () => {
    form.submit();
  };

  return (
    <Button onClick={handelClick} type="primary">
      Sumbit
    </Button>
  
  );
}

export default function CreateItem({ config, CreateForm ,BoqForm=null  }) {
  let { entity, CREATE_ENTITY ,createURL,listURL} = config;
  const { erpContextAction } = useErpContext();
  const { createPanel } = erpContextAction;
  const dispatch = useDispatch();
  const { isLoading, isSuccess } = useSelector(selectCreatedItem);
  const [form] = Form.useForm();
  const [subTotal, setSubTotal] = useState(0);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      setTableData([]);
      dispatch(erp.resetAction({ actionType: 'create' }));
      setSubTotal(0);
      createPanel.close();
      dispatch(erp.list({ listURL }));
    }
  }, [isSuccess]);

  let objExtras = {}
  const onSubmit = (fieldsValue) => {
    console.log("sssssssssssssssssssss",fieldsValue);
    dispatch(erp.create({ createURL, jsonData: {...fieldsValue,...objExtras} }));
  };

const setFormFeild = (key,value)=>{
  objExtras[key] = value;
}


  
  return (
    <>
      {/* <PageHeader
        onBack={() => createPanel.close()}
        title={CREATE_ENTITY}
        ghost={false}
        // subTitle="This is create page"
        extra={[
          <Button
            key={`${uniqueId()}`}
            onClick={() => createPanel.close()}
            icon={<CloseCircleOutlined />}
          >
            Cancel
          </Button>,
          <SaveForm form={form} config={config} key={`${uniqueId()}`} />,
        ]}
        style={{
          padding: '20px 0px',
        }}
      ></PageHeader> */}
      <Divider dashed />
      <Loading isLoading={isLoading}>
        <Form form={form} layout="vertical" onFinish={onSubmit} >
          {CreateForm}
          <SaveForm form={form} config={config} key={`${uniqueId()}`} />,
        </Form>
        
      </Loading>
    </>
  );
}
