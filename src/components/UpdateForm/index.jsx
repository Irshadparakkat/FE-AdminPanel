import React, { useEffect } from 'react';
import dayjs from 'dayjs';

import { useDispatch, useSelector } from 'react-redux';
import { crud } from '@/redux/crud/actions';
import { useCrudContext } from '@/context/crud';
import { selectUpdatedItem } from '@/redux/crud/selectors';

import { isDate } from '@/utils/helpers';
import { selectCurrentItem } from '@/redux/crud/selectors';

import { Button, Form } from 'antd';
import Loading from '@/components/Loading';

export default function UpdateForm({ config, formElements }) {
  let { readColumns,updateURL,updateRequest ,listRequestBody,listURL} = config;

  const dispatch = useDispatch();
  const { current, isLoading, isSuccess } = useSelector(selectUpdatedItem);

  const { state, crudContextAction } = useCrudContext();

  /////

  const { panel, collapsedBox, readBox } = crudContextAction;

  const showCurrentRecord = () => {
    readBox.open();
  };

  /////
  const [form] = Form.useForm();

  const onSubmit = (fieldsValue) => {
    console.log(fieldsValue,'🚀 ~ file: index.jsx ~ line 34 ~ onSubmit ~  current.id', current);
    const _id = current._id;
    if(current.fkAccountId){
      const fkAccountId = current.fkAccountId
      dispatch(crud.update({ updateURL, jsonData: {_id,fkAccountId,...updateRequest,...fieldsValue} }));
    }
    else{
      dispatch(crud.update({ updateURL, jsonData: {_id,...updateRequest,...fieldsValue} }));
    }
  };

  useEffect(() => {
    if (current) {
      let newValues = { ...current };

      const timeFields = ['startTime', 'endTime'];

      timeFields.forEach((fieldName) => {
        if (newValues[fieldName]) {
          newValues[fieldName] = dayjs(`1970-01-01T${newValues[fieldName]}`).format('hh:mm A');
        }
      });

      if (newValues.birthday) {
        newValues = {
          ...newValues,
          birthday: dayjs(newValues['birthday']),
        };
      }
      if (newValues.date) {
        newValues = {
          ...newValues,
          date: dayjs(newValues['date']),
        };
      }
      if (newValues.expiredDate) {
        newValues = {
          ...newValues,
          expiredDate: dayjs(newValues['expiredDate']),
        };
      }
      if (newValues.created) {
        newValues = {
          ...newValues,
          created: dayjs(newValues['created']),
        };
      }
      if (newValues.updated) {
        newValues = {
          ...newValues,
          updated: dayjs(newValues['updated']),
        };
      }

      console.log('🚀 ~ file: index.jsx ~ line 40 ~ useEffect ~ obj', newValues);
      form.setFieldsValue(newValues);
    }
  }, [current]);

  useEffect(() => {
    if (isSuccess) {
      panel.close();
      collapsedBox.close();
      readBox.close();
      form.resetFields();;
      dispatch(crud.resetAction({ actionType: 'update' }));
      dispatch(crud.list({ listURL,options:listRequestBody }));
    }
  }, [isSuccess]);

  const { isEditBoxOpen } = state;

  const show = isEditBoxOpen ? { display: 'block', opacity: 1 } : { display: 'none', opacity: 0 };
  return (
    <div style={show}>
      <Loading isLoading={isLoading}>
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          {formElements}
          <Form.Item
            style={{
              display: 'inline-block',
              paddingRight: '5px',
            }}
          >
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
          <Form.Item
            style={{
              display: 'inline-block',
              paddingLeft: '5px',
            }}
          >
            <Button onClick={showCurrentRecord}>Cancel</Button>
          </Form.Item>
        </Form>
      </Loading>
    </div>
  );
}
