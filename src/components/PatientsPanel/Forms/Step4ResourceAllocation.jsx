import React, { useState, useEffect, useRef } from 'react';
import api from '@/request/services';
import { Form, Input, Button, Select, Divider, Row, Col, Upload, InputNumber, Checkbox, Table, Typography, Menu, Dropdown, Tooltip } from 'antd';
import { EllipsisOutlined, PlusOutlined, UploadOutlined, DownloadOutlined } from '@ant-design/icons'; 
import TextDetailEditor from '@/components/TextDetailEditor';
import { erp } from '@/redux/erp/actions';

import * as XLSX from 'xlsx';
import Parser from 'html-react-parser';
import { useMoney } from '@/settings';
import { useDispatch, useSelector } from 'react-redux';
import { selectCreatedProcessItem } from '@/redux/erp/selectors';

const { Option } = Select;
const { Title } = Typography;



export default function ResouseAllocation({ current = null, setFormFeild,projectData}) { 
  
  const [form] = Form.useForm();

  const [arrResourceList, setResourceList] = useState([]);
  const money = useMoney(); 
  const fileInputRef = useRef(null);
  const [arrUnitType, setUnitType] = useState([]);
  const [arrModelList, setModelList] = useState([]);
  const [arrUsers, setUsers] = useState([]);

 
  const dispatch = useDispatch();


  useEffect(() => {
    const fetchData = async () => {
      const responseUser = await api.getAllTypeList({
        strListType: 'user',
        type: 'allMasterList'
      });
      setUsers(responseUser?.arrList || []);
   
    const responseBoqList = await api.list({
      listURL: 'resource_list',
      options: {
        isNoFilterList: true,
        filters: {
          fkProjectId: projectData?.id,
        },
      },
    });

    // Update the state with the response from the list API
    setResourceList(responseBoqList?.arrList || []);
  };

    fetchData();
  }, []);

  
  
  const handleAddItemClick = async () => {
    try {
      await form.validateFields(); 
      form.submit(); 
    } catch (error) {
      console.error('Form validation failed:', error);
    }
  };
  
  const removeRow = (record,index) => {
    if(record.id){
       dispatch(erp.delete({ deleteURL:'resource_cancel', jsonData: { ...record } }));
    }
    const updatedTableData = [...arrResourceList];
    updatedTableData.splice(index, 1);
    setFormFeild('arrResource', updatedTableData);
    setResourceList(updatedTableData);
  };
  
 
  const onSubmit = async (fieldsValue) => {
    try {

      const objRes = await api.create({
        createURL: 'resource_create',
        jsonData: { arrResource: [{ ...fieldsValue }], fkProjectId: projectData?.id },
      });
  
      if (objRes) {
        // If the create API is successful, update the BOQ list with the new item
        const updatedTableData = [...arrResourceList, { ...fieldsValue, ...objRes }];
     
        setFormFeild('arrResource', updatedTableData);
        // Reset the form fields after successful submission
        form.resetFields();
  
        // Call the list API to fetch the updated BOQ list
        const responseBoqList = await api.list({
          listURL: 'resource_list',
          options: {
            isNoFilterList: true,
            filters: {
              fkProjectId: projectData?.id,
            },
          },
        });
  
        // Update the state with the response from the list API
        setResourceList(responseBoqList?.arrList || []);
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle any error that occurred during the API call
    }
  };
  

  

  const handleUserSelect = (value) => {
   
    let selectedUser = arrUsers.find((item) => item.id === value);
    
    if (selectedUser) {
    const { strUserName} = selectedUser;
      setFormFeild('strUserName', strUserName);
  };
  }

  const getActionMenu = (record, index) => (
    <Menu>
      <Menu.Item key="remove" onClick={() => removeRow(record, index)}>
        Remove
      </Menu.Item>
    </Menu>
  );


  return (
    <>
     <Form form={form} layout="vertical" onFinish={onSubmit} > 
      <Row gutter={[12, 12]} style={{ position: 'relative' }}>
        <Col className="gutter-row" span={8}>
  
        <Form.Item
        name="fkUserId"
        label="User"
        rules={[
          {
            required: true,
            message: 'Please Select The User Type!',
          },
        ]}
      >
        <Select  onChange={handleUserSelect} >
          {arrUsers?.length ? (
            arrUsers.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.strUserName}
              </Option>
            ))
          ) : (
            <Option value={0}>No Data</Option>
          )}
        </Select>
      </Form.Item>
        </Col>
        <Col className="gutter-row" span={4}>
          <Form.Item name="intTotalAmt" label="Amount">
            <InputNumber
              className="moneyInput"
              controls={false}
              addonAfter={money.currencyPosition === 'after' ? '₹' : undefined}
              addonBefore={money.currencyPosition === 'before' ? '₹' : undefined}
              formatter={(value) => money.amountFormatter({ amount: value })}
            />
          </Form.Item>
        </Col>
       
        <Col className="gutter-row" span={12}>
          <Form.Item name="strRemarks" label="Remarks">
            <TextDetailEditor />
          </Form.Item>
        </Col>
      </Row>
      <Divider dashed />
     
      <Form.Item>
  <Button
    type="dashed"
    onClick={handleAddItemClick}
    block
    icon={<PlusOutlined />}
  >
    Add
  </Button>
</Form.Item>

     </Form>
      <Divider dashed />
      <Divider dashed />
      <div style={{ margin: 'auto', width: '100%', marginTop: '10px' }}>
        <Table
          dataSource={arrResourceList}
          columns={[
            
            { title: 'Sl.No', 
            dataIndex: 'slNo',
            width: 50,
            render: (value, record, index) => (`${value || index+1}`), },
            { title: 'Name', dataIndex: 'strUserName',
            width: 250,
           },
            {
              title: 'Description',
              dataIndex: 'strRemarks',
              width: 350,
              render: (text) => {
                if (typeof text === 'string') {
                  return Parser(text);
                }
                return null;
              },
            },
            { title: 'Amount', dataIndex: 'intTotalAmt',width: 200, },
            {
              title: 'Action',
              dataIndex: '',
              render: (_, record, index) => (
                <Dropdown overlay={getActionMenu(record, index)} placement="bottomRight" trigger={['click']}>
                  <Button type="link" onClick={(e) => e.preventDefault()}>
                  <EllipsisOutlined />
                  </Button>
                </Dropdown>
              ),
            },
          ]}
          pagination={false}
        />
      </div>
    </>
  );
}
