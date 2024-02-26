import React, { useState, useEffect } from 'react';
import { Form, Divider } from 'antd';
import dayjs from 'dayjs';
import { Button, PageHeader, Row, Statistic, Tag } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { erp } from '@/redux/erp/actions';
import { selectCreatedItem,selectUpdatedItem } from '@/redux/erp/selectors';
import { useErpContext } from '@/context/erp';
import uniqueId from '@/utils/uinqueId';
import Loading from '@/components/Loading';
import { CloseCircleOutlined, PlusOutlined, RightCircleOutlined  } from '@ant-design/icons';
import Step1patientData from '../Forms/Step1patientData';

function SaveForm({ form, isFromLater}) { 
  const handelClick = () => {
    form.submit();
  };

  return (
    <Button onClick={handelClick} type="primary" icon={<PlusOutlined />} className='primaryBtn' >
      {isFromLater?'Update & Next':'Save & Next'}
    </Button>
  );
}

export default function CreateItem({ config,subTitle,stepStatus,stepUpdate,updatePatientData,isFromLater,patientData }) {
  let {   CREATE_ENTITY ,createURL,listURL, updateURL} = config;
  const { erpContextAction } = useErpContext();
  const { createPanel } = erpContextAction;
  const dispatch = useDispatch();
  const { isLoading, isSuccess,result } = useSelector(selectCreatedItem);
  const updateState = useSelector(selectUpdatedItem);
  const [form] = Form.useForm();
  let isCreatedFlag = false;
  
  useEffect(() => {
    if (isSuccess) {
      dispatch(erp.resetAction({ actionType: 'create' }));
      updatePatientData(result?.arrList);
      stepUpdate(1);
      dispatch(erp.list({ listURL }));
    }
  }, [isSuccess]);

  let objExtras = {};
  const setFormFeild = (key,value)=>{
    objExtras[key] = value;
  }

  useEffect(() => {
    if (updateState?.isSuccess) {
      dispatch(erp.resetAction({ actionType: 'update' }));
      updatePatientData(updateState?.result);
      stepUpdate(1);
      dispatch(erp.list({ listURL }));
    }else if(updateState?.current?.id){
      let current=updateState?.current;
      // if (current?.strStartDate) {
      //   current.strStartDate = dayjs(current?.strStartDate);
      // }
      // if (current?.strEndDate) {
      //   current.strEndDate = dayjs(current?.strEndDate);
      // }
      form.setFieldsValue({...current
                        });
                        
      updatePatientData(updateState?.current);
    }
  }, [updateState]);

  const onSubmit = (fieldsValue) => {
    if(patientData && patientData?.id){
      let autoCompleteSplit = {};
      if (fieldsValue) {  
       autoCompleteSplit = {fkClientId: fieldsValue?.fkClientId?.id || fieldsValue?.fkClientId,
         fkJuniorSupervisorId:fieldsValue?.fkJuniorSupervisorId?.id || fieldsValue?.fkJuniorSupervisorId,
         fkSeniorSupervisorId:fieldsValue?.fkSeniorSupervisorId?.id || fieldsValue?.fkSeniorSupervisorId,
         fkManagerId:fieldsValue?.fkManagerId?.id || fieldsValue?.fkManagerId,
      };
      }
      dispatch(erp.update({ updateURL, jsonData: {id:patientData?.id,...objExtras,...fieldsValue,...autoCompleteSplit} }));  
    }else{
    dispatch(erp.create({ createURL, jsonData:{...fieldsValue,...objExtras}  }));
  }
  };

const onClose = ()=>{
 if(isCreatedFlag){
  form.resetFields();
  dispatch(erp.list({ listURL }));
 }  
  stepUpdate(0);
  updatePatientData({});
  createPanel.close();
}

useEffect(() => {
  if (patientData && patientData?.id) {  
    if (patientData?.strStartDate) {
      patientData.strStartDate = dayjs(patientData?.strStartDate);
    }
    if (patientData?.strEndDate) {
      patientData.strEndDate = dayjs(patientData?.strEndDate);
    }
    form.setFieldsValue({...patientData });
  }
}, []);

  return (
    <>
      <PageHeader
        onBack={() => createPanel.close()}
        title={CREATE_ENTITY}
        ghost={false} 
        tags={<Tag color="green">{"Step "+stepStatus}</Tag>}
        extra={[
          <Button
            key={`${uniqueId()}`}
            onClick={onClose}
            icon={<CloseCircleOutlined />}
            className='outLineIcon'
          >
            Cancel
          </Button>,<>
          {(patientData?.id && 
            (<Button
              key={`${uniqueId()}`}
              onClick={() => stepUpdate(1)}
              icon={<RightCircleOutlined />}
            >
              Skip
            </Button>))}
          </>,
          <SaveForm form={form} isFromLater={patientData?.id} config={config} key={`${uniqueId()}`} />,
        ]}
        style={{
          padding: '20px 0px',
        }}
      ></PageHeader>
      <Divider dashed />
      <Loading isLoading={isLoading}>
        <Form form={form} layout="vertical" onFinish={onSubmit} >
          <Step1patientData  setFormFeild={setFormFeild} />
        </Form>
      </Loading>
    </>
  );
}
