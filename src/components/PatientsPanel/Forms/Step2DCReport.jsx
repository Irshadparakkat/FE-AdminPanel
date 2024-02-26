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
import AutoCompleteAsync from '@/components/AutoCompleteAsync';
import { selectCreatedProcessItem } from '@/redux/erp/selectors';

const { Option } = Select;
const { Title } = Typography;



export default function BoqForm({ current = null, setFormFeild,projectData}) { 
  
  const [form] = Form.useForm();

  const [arrBOQList, setBOQList] = useState([]);
  const money = useMoney(); 
  const fileInputRef = useRef(null);
  const [arrUnitType, setUnitType] = useState([]);
  const [arrModelList, setModelList] = useState([]);

 
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      Promise.all([api.getAllTypeList({
            strListType: 'unit',
            type: 'allMasterList'
          }),
          api.list({
            listURL: 'model_list',
            options:{
              isNoFilterList:true,
              filters:{
            }}
          }),
          api.list({
            listURL: 'boq_list',
            options:{
              isNoFilterList:true,
              filters:{
              fkProjectId: projectData?.id
            }}
          })
        ])
        .then(responses => {
          const [responseUnit, responseModelList,responseBoqList] = responses;
          setUnitType(responseUnit ?.arrList || []);
          setModelList(responseModelList ?.arrList || [])
          setBOQList(responseBoqList ?.arrList || []);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    };
    fetchData();
  }, []);

  const handleValueChange = (value) => {
    console.log(value, "form.getFieldsValue()", form.getFieldsValue());
    let {
      intQty,
      intUnitPrice
    } = form.getFieldsValue();
    form.setFields([{
      name: 'intTotalAmt',
      value: Number(intQty || 1) * Number(intUnitPrice || 0) || 0,
    }, ]);
  };
  
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
       dispatch(erp.delete({ deleteURL:'boq_cancel', jsonData: { ...record } }));
    }
    const updatedTableData = [...arrBOQList];
    updatedTableData.splice(index, 1);
    setFormFeild('arrBoq', updatedTableData);
    setBOQList(updatedTableData);
  };
  
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, {
        type: 'array'
      });
  
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        range: 1
      });
  
      const updatedTableData = jsonData.map((row) => ({
        strWorkTypeName: row[0],
        strDescription: row[1],
        strUnitName: row[2],
        intQty: row[3],
        intTotalAmt: row[4],
      }));
      if (arrBOQList.length > 0) {
        // Append the updatedTableData to the existing arrBOQList
        //api.create({createURL:'boq_create',jsonData:{arrBoq:arrBOQList, fkProjectId:projectData?.id}});
        setFormFeild('arrBoq', [...arrBOQList, ...updatedTableData]);
        setBOQList([...arrBOQList, ...updatedTableData]);
      } else {
        // Set the updatedTableData as the new arrBOQList
        setFormFeild('arrBoq', updatedTableData);
        setBOQList(updatedTableData);
      }
    };
    reader.readAsArrayBuffer(file);
  };
  const onSubmit = async (fieldsValue) => {
    try {
      // Call the create API to add a new BOQ item
      const objRes = await api.create({
        createURL: 'boq_create',
        jsonData: { arrBoq: [{ ...fieldsValue }], fkProjectId: projectData?.id },
      });
  
      if (objRes) {
        // If the create API is successful, update the BOQ list with the new item
        const updatedTableData = [...arrBOQList, { ...fieldsValue, ...objRes }];
     
        setFormFeild('arrBoq', updatedTableData);
        // Reset the form fields after successful submission
        form.resetFields();
  
        // Call the list API to fetch the updated BOQ list
        const responseBoqList = await api.list({
          listURL: 'boq_list',
          options: {
            isNoFilterList: true,
            filters: {
              fkProjectId: projectData?.id,
            },
          },
        });
  
        // Update the state with the response from the list API
        setBOQList(responseBoqList?.arrList || []);
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle any error that occurred during the API call
    }
  };
  

  
  // const handleModelSelect =async (value)=>{
  
  //   let model = arrModelList.find((item) => item.id === value);
    
  //   let arrFiltersReq = [{col:'strProjectName',index:2}]
    
  //   let filters = {
  //     strProjectName: [project.strProjectName]
  //   }
    
  //       const responseMaterial = await api.list({
  //         listURL: 'stock_list', options:{filters,arrFiltersReq}
  //       });
    
  //       setMaterial(responseMaterial?.arrList||[])
    
  //     }

  const handleModelSelect = (value) => {
   
    let selectedModel = arrModelList.find((item) => item.id === value);
    
   
    console.log(selectedModel,"then you go ");
    if (selectedModel) {
    
      const { strModelName,intPricePerUnitModel,strUnit} = selectedModel;
      form.setFields([
        {
          name: 'strWorkTypeName',
          value: strModelName},
          {
            name: 'intUnitPrice',
            value: intPricePerUnitModel},
            {
              name: 'strUnitName',
              value: strUnit}

      ]);
    }
  };


  const getActionMenu = (record, index) => (
    <Menu>
      <Menu.Item key="remove" onClick={() => removeRow(record, index)}>
        Remove
      </Menu.Item>
      <Menu.Item key="edit">
        Edit
      </Menu.Item>
    </Menu>
  );
const tooltip = <div onClick={()=>{ window.open(
  `https://apisys.s3.me-south-1.amazonaws.com/api/Untitled+spreadsheet.xlsx`,
  '_blank'
);}}><DownloadOutlined />{'  Click Here to Download Excel template '}</div>
  return (
    <>
     <Form form={form} layout="vertical" onFinish={onSubmit} > 

<Row gutter={[12, 0]}>
        <Col className="gutter-row" span={3}>
          <Form.Item label="Excel Import">
            <Tooltip placement="top" title={tooltip}>
              
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
              ref={fileInputRef}
            /> 
            <Button
              icon={<UploadOutlined />}
              style={{ width: '100%' }}
              onClick={() => fileInputRef.current.click()}
            >
              Upload 
            </Button>
            </Tooltip>
          </Form.Item>
        </Col>
      </Row>
      <Divider dashed />


    
      <Row gutter={[12, 12]} style={{ position: 'relative' }}>
        <Col className="gutter-row" span={8}>
          <Form.Item name="fkModelId" label="Modal Name" >
            
          <Select onChange={handleModelSelect} >
                    {arrModelList?.length ? (
                      arrModelList.map((item) => (
                        <Option key={item.id} value={item.id}>
                          {item.strModelName}
                        </Option>
                      ))
                    ) : (
                      <Option value={0}>No Data</Option>
                    )}
                  </Select>
            {/* <AutoCompleteAsync
              entity={'model'}
              displayLabels={['strModelName']}
              onChangedAction={(selectedModel) => handleModelSelect(selectedModel,form)}
            /> */}
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={4}>
          <Form.Item
            label="Unit"
            name="strUnitName"
       
          >
            {/* <Select>
              {arrUnitType?.length ? (
                arrUnitType.map((item) => (
                  <Option key={item.id} value={item.strUnitName}>
                    {item.strUnitName}
                  </Option>
                ))
              ) : (
                <Option value="nodata">No Data</Option>
              )}
            </Select> */}
            <Input
            readOnly 
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={4}>
          <Form.Item
            name="intUnitPrice"
            label="Unit Price"
       
          >
            <Input type="number"
            readOnly 
              defaultValue={0}
              min={0}
              onChange={(e) => handleValueChange(e.target.value)} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={4}>
          <Form.Item name="intQty" label="Quantity" >
            <InputNumber
              type="number"
              style={{ width: '100%' }}
              min={1}
              onChange={handleValueChange}
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={4}>
          <Form.Item name="intTotalAmt" label="Total Amount">
            <InputNumber
              className="moneyInput"
              readOnly
              controls={false}
              addonAfter={money.currencyPosition === 'after' ? '₹' : undefined}
              addonBefore={money.currencyPosition === 'before' ? '₹' : undefined}
              formatter={(value) => money.amountFormatter({ amount: value })}
            />
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={4}style={{display:'none'}} >
          <Form.Item name="strWorkTypeName" >
            <Input
              readOnly
            />
          </Form.Item>
        </Col>
        
      </Row>
      <Divider dashed />
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={12}>
          <Form.Item name="strDescription" label="Description Of Work">
            <TextDetailEditor />
          </Form.Item>
        </Col>
        
        <Col className="gutter-row" span={10} offset={1} >
  <Form.Item
    name="checkTask"
    valuePropName="checked"
    labelCol={{ span: 12 }}
    wrapperCol={{ span: 12 }}
  >
    <Checkbox>Do you Want to create Tasks </Checkbox>

  </Form.Item>
</Col>
      </Row>

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
          dataSource={arrBOQList}
          columns={[
            
            { title: 'Sl.No', 
            dataIndex: 'slNo',
            width: 50,
            render: (value, record, index) => (`${value || index+1}`), },
            { title: 'Name', dataIndex: 'strWorkTypeName',
            width: 250,
           },
            {
              title: 'Description',
              dataIndex: 'strDescription',
              width: 350,
              render: (text) => {
                if (typeof text === 'string') {
                  return Parser(text);
                }
                return null;
              },
            },

            { title: 'Unit', dataIndex: 'strUnitName',
            width: 100,},
            { title: 'Qty', dataIndex: 'intQty',width: 100, },
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
