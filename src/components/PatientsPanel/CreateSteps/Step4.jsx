import React, { useState, useEffect } from 'react';
import { Form, Divider } from 'antd';

import { Button, PageHeader, Row, Statistic, Tag } from 'antd';

import { useSelector, useDispatch } from 'react-redux';
import { erp } from '@/redux/erp/actions';
import { selectCreatedItem } from '@/redux/erp/selectors';

import { useErpContext } from '@/context/erp';
import uniqueId from '@/utils/uinqueId';

import Loading from '@/components/Loading';
import { CloseCircleOutlined, PlusOutlined, LeftCircleOutlined ,RightCircleOutlined } from '@ant-design/icons';
import ResourceAllocation from '../Forms/Step4ResourceAllocation';
function SaveForm({ form, }) { 
  const handelClick = () => {
    form.submit();
  };

  return (
    <Button onClick={handelClick} type="primary" icon={<PlusOutlined />}>
      Save & Finish
    </Button>
  );
}

export default function CreateItem({ config,subTitle,stepStatus,stepUpdate,updateProjectData,projectData, }) {
  let {   CREATE_ENTITY ,listURL} = config;
  const { erpContextAction } = useErpContext();
  const { createPanel } = erpContextAction;
  const dispatch = useDispatch();
  const { isLoading, isSuccess,current,result } = useSelector(selectCreatedItem);
  const [form] = Form.useForm();
  let isCreatedFlag = false;

  useEffect(() => {
    if (isSuccess) {
      isCreatedFlag=true;
      dispatch(erp.resetAction({ actionType: 'create' }));
      form.resetFields();
      dispatch(erp.list({ listURL }));
      stepUpdate(0);
      updateProjectData({});
       createPanel.close();
    }
  }, [isSuccess]);

  let objExtras = {};
  const setFormFeild = (key,value)=>{
    objExtras[key] = value;
  }

  const onSubmit = (fieldsValue) => {

    console.log(fieldsValue,"tehrehe r");
    stepUpdate(4);
    //dispatch(erp.create({ createURL:'boq_create', jsonData: {...fieldsValue,...objExtras,fkProjectId:projectData?.id} }));
  };

  const onClose = ()=>{
    if(isCreatedFlag){
     form.resetFields();
    }
    stepUpdate(0);
    updateProjectData({});
     createPanel.close();
   }
   
  return (
    <>
      <PageHeader
        onBack={() => createPanel.close()}
        title={'Resourse Allocations'}
        ghost={false} 
        tags={<Tag color="green">{"Step "+stepStatus}</Tag>}
        subTitle={subTitle || ''}
        extra={[
          <Button
            key={`${uniqueId()}`}
            onClick={onClose}
            icon={<CloseCircleOutlined />}
          >
            Cancel
          </Button>,
          <Button
            key={`${uniqueId()}`}
            onClick={() => stepUpdate(2)}
            icon={<LeftCircleOutlined />}
          >
            Previous
          </Button>,
          <SaveForm form={form} config={config} key={`${uniqueId()}`} />,
        ]}
        style={{
          padding: '20px 0px',
        }}
      ></PageHeader>
      <Divider dashed />
      <Loading isLoading={isLoading}>
        <Form form={form} layout="vertical" onFinish={onSubmit} >
          <ResourceAllocation projectData={projectData} setFormFeild={setFormFeild}/>
        </Form>
      </Loading>
    </>
  );
}
