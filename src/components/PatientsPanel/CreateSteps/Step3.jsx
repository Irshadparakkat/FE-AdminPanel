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
import Step3Scheduling from '../Forms/Step3Scheduling'
function SaveForm({ form, }) { 
  const handelClick = () => {
    form.submit();
  };

  return (
    <Button onClick={handelClick} type="primary" icon={<PlusOutlined />} className='primaryBtn'>
      Save & Next
    </Button>
  );
}

export default function CreateItem({ config,
  subTitle,
  stepStatus,
  stepUpdate,
  updatePatientData,
  patientData }) {
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
      stepUpdate(3);
      dispatch(erp.list({ listURL }));
    }
  }, [isSuccess]);

  let objExtras = {
    'strModule' :'Patient',
    'strType' :'Schedule'
  };
  const setFormFeild = (key,value)=>{
    objExtras[key] = value;
  }

  const onSubmit = (fieldsValue) => {
    dispatch(erp.create({ createURL:'patient_schedule_create', jsonData: {...fieldsValue,...objExtras,fkPatient:patientData?.id} }));
  };

  const onClose = ()=>{
    if(isCreatedFlag){
     form.resetFields();
    }
    stepUpdate(0);
    updatePatientData({});
     createPanel.close();
   }
   
  return (
    <>
      <PageHeader
        onBack={() => createPanel.close()}
        title={'Add Schedules'}
        ghost={false} 
        tags={<Tag color="green">{"Step "+stepStatus}</Tag>}
        subTitle={subTitle || ''}
        extra={[
          <Button
            key={`${uniqueId()}`}
            onClick={onClose}
            icon={<CloseCircleOutlined />}
            className='outLineIcon'
          >
            Cancel
          </Button>,
          <Button
            key={`${uniqueId()}`}
            onClick={() => stepUpdate(1)}
            icon={<LeftCircleOutlined />}
            className='outLineIcon'
          >
            Previous
          </Button>,
          <Button
            key={`${uniqueId()}`}
            onClick={() => stepUpdate(3)}
            icon={<RightCircleOutlined />}
            className='outLineIcon'
          >
            Skip
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
          <Step3Scheduling patientData={patientData} 
                          setFormFeild={setFormFeild} 
                          />
        </Form>
      </Loading>
    </>
  );
}
