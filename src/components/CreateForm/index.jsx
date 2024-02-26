import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { crud } from '@/redux/crud/actions';
import { useCrudContext } from '@/context/crud';
import { selectCreatedItem } from '@/redux/crud/selectors';

import { Button, Form } from 'antd';
import Loading from '@/components/Loading';
import dayjs from 'dayjs';

export default function CreateForm({ config, formElements }) {
  let { createURL,extraBody,listURL,listRequestBody } = config;
  const dispatch = useDispatch();
  const { isLoading, isSuccess,result } = useSelector(selectCreatedItem);
  const { crudContextAction } = useCrudContext();
  const { panel, collapsedBox, readBox } = crudContextAction;
  const [form] = Form.useForm();

  const onSubmit = (fieldsValue) => {

    let autoCompleteSplit={}
    
    if(fieldsValue.startTime){

      const formattedStartTime = dayjs(fieldsValue.startTime).format('HH:mm:ss');
      const formattedEndTime = dayjs(fieldsValue.endTime).format('HH:mm:ss');

      autoCompleteSplit = {
        startTime: formattedStartTime,
        endTime: formattedEndTime,
      };
    
    }
    dispatch(crud.create({ createURL, jsonData: {...fieldsValue,...extraBody,...autoCompleteSplit} }));

 
  };

  useEffect(() => {
    if (isSuccess) {
      panel.close();
      collapsedBox.close();
      readBox.close();
      form.resetFields();
      dispatch(crud.resetAction({ actionType: 'create' }));
      dispatch(crud.list({ listURL,options:listRequestBody }));
    }
  }, [isSuccess]);
  let objExtras = {}

  const setFormFeild = (key,value)=>{
    objExtras[key] = value;
  }

  return (
    <Loading isLoading={isLoading}>
      <Form form={form} layout="vertical"   setFormFeild={setFormFeild} onFinish={onSubmit}>
        {formElements}
        <Form.Item>
          <Button type="primary" htmlType="submit" className='primaryBtn'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Loading>
  );
}
