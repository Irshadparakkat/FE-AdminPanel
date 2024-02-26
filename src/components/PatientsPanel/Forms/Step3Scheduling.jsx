import React, { useState, useEffect, useRef } from 'react';
import { DatePicker } from '@/components/CustomAntd';
import dayjs from 'dayjs';
import api from '@/request/services';
import { Form, Input, InputNumber, Button, Select, Divider, Row, Col, Upload, Checkbox, Table, Typography, Menu, Dropdown, Modal, TimePicker } from 'antd';
import { EllipsisOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import AutoCompleteAsync from '@/components/AutoCompleteAsync';
import TextDetailEditor from '@/components/TextDetailEditor';
import { erp } from '@/redux/erp/actions';
import { useDispatch, useSelector } from 'react-redux';
import { selectCreatedProcessItem } from '@/redux/erp/selectors';
import {
  S3_BASE_URL
} from '@/config/serverApiConfig';

import Parser from 'html-react-parser';

import { useMoney } from '@/settings';
import BOQTableModal from '../BoqModal';
import { SET_STATE } from '@/redux/settings/types';

const { Option } = Select;
const { Title } = Typography;

export default function Scheduling({
  setFormFeild,
  patientData }) {
  const [tableData, setTableData] = useState([]);
  const [arrTestList, setTestList] = useState([]);
  const [arrACCList, setAccountList] = useState([]);

  const [type, setType] = useState('')

  const [isCreateResultModalVisible, setCreateResultModalVisible] = useState(false);


  const [myform] = Form.useForm();

  const [formValues, setFormValues] = useState({
    id: null, // Initialize with null or the schedule ID if available
    type: '', // Automatically filled based on recorded data
    objResult: {}, // Initialize with an empty object
  });

  // Form reference
  const createResultFormRef = useRef(null);


  // Initialize an empty array to store form values for each schedule
  const [scheduleFormValues, setScheduleFormValues] = useState([]);


  const openCreateResultModal = (record, index) => {
    if (record.id) {
      let typ = '';

      if (record.strTestName === 'Ecg Test') {
        typ = 'ECG';
        setType(typ)
      } else if (record.strTestName === 'BP') {
        typ = 'BP';
        setType(typ)

      } else if (record.strTestName === 'SpO2 Test') {
        typ = 'Pulse_Oxymeter';
        setType(typ)

      } else if (record.strTestName === 'Glucometer Test') {
        typ = 'Glucometer';
        setType(typ)

      } else {
        typ = 'Thermometer';
        setType(typ)

      }


      // Create a new formValues object for this schedule
      const newFormValues = {
        fkScheduleId: record.id || null,
        strUnique: record.strUnique,
        type: typ || '',
      };

      // Use form.setFieldsValue to set form values
      myform.setFieldsValue(newFormValues);


      setFormValues(newFormValues);

      // Update the scheduleFormValues array with the new formValues
      setScheduleFormValues((prevValues) => [...prevValues, newFormValues]);

      setCreateResultModalVisible(true);
    }
  };


  const closeCreateResultModal = () => {
    setCreateResultModalVisible(false);
    // Reset the form fields
    myform.resetFields();
  };

  // Function to handle form submission
  const handleCreateResultSubmit = async (values) => {
    try {
      // Log the form values to the console

      let objResult = {};

      if (type == 'ECG') {
        objResult = {
          strURL: values.strURL,
        };
      } else if (type == 'BP') {
        objResult = {
          strDiastole: values.strDiastole,
          strPulse: values.strPulse,
          strSystole: values.strSystole,
        };
      } else if (type == 'Pulse_Oxymeter') {
        objResult = {
          strSo2: values.strSo2,
          strHeartRate: values.strHeartRate,
        };
      } else if (type == 'Thermometer') {
        objResult = {
          strTemperature: values.strTemperature,
        };
      } else if (type == 'Glucometer') {
        objResult = {
          strGlucose: values.strGlucose,
        };
      }

      if (Object.keys(objResult).length === 0) {
        console.error('objResult is empty. Please fill in the required fields.');

        return null; // Return early to prevent further processing
      }


      let Create = await api.create({
        createURL: 'create_test_result',
        jsonData: {
          ...values,
          objResult,
          fkPatientId: patientData?.id,
        },
      });

      if (Create.success) {
        closeCreateResultModal();
        objResult = {}
      }

    } catch (error) {
      console.error('Error handling form submission:', error);
    }
  };



  const [state, setMystate] = useState(0)

  const [form] = Form.useForm();


  const dispatch = useDispatch();

  const { isLoading, isSuccess, result } = useSelector(selectCreatedProcessItem);


  useEffect(() => {

    console.log(patientData, "there we are");

    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          api.list({
            listURL: 'get_current_tests',
            options: {
              isNoFilterList: true,
              filters: {
                fkPatientId: patientData?.id,
              },
            },
          }),
        ]);

        const [responseScheduleList] = responses;

        setTableData(responseScheduleList?.arrList || []);

        console.log(responseScheduleList?.arrList);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [state]);




  useEffect(() => {
    let listRequestBody = {
      "type": "allMasterList",
      "strListType": "test"
    }
    const fetchData = async () => {
      const responseTests = await api.list({
        listURL: 'common_controller', options: { ...listRequestBody }
      })

      setTestList(responseTests?.arrList || []);

    };

    fetchData();
  }, []);


  const onSubmit = async (fieldsValue) => {

    // Format the startTime and endTime to the desired format
    const formattedStartTime = fieldsValue.startTime.format('HH:mm:ss');
    const formattedEndTime = fieldsValue.endTime.format('HH:mm:ss');

    // Create the autoCompleteSplit object
    const autoCompleteSplit = {
      startTime: formattedStartTime,
      endTime: formattedEndTime,
    };

    // Send the formatted values to the API
    let objRes = await api.create({
      createURL: 'patient_schedule_create',
      jsonData: {
        ...fieldsValue,
        ...autoCompleteSplit,
        fkPatientId: patientData?.id,
      },
    });

    if (objRes) {
      setMystate(state + 1);
      let updatedTableData = [...tableData, { ...fieldsValue }];
      setTableData(updatedTableData);
      setFormFeild('arrSchedules', updatedTableData);
      form.resetFields();
    }
  };




  const handleAddItemClick = () => {
    form.submit();
  };

  const removeRow = (record, index) => {
    if (record.id) {
      dispatch(erp.delete({ deleteURL: 'patient_schedule_cancel', jsonData: { ...record } }));
    }
    const updatedTableData = [...tableData];
    updatedTableData.splice(index, 1);
    setTableData(updatedTableData);
    if (!record.id)
      setFormFeild('arrSchedules', updatedTableData);
  };








  const getActionMenu = (record, index) => {
    return (
      <Menu>
        <Menu.Item key="remove" onClick={() => removeRow(record, index)}>
          Remove
        </Menu.Item>
        <Menu.Item key="edit">
          Edit
        </Menu.Item>
        <Menu.Item key="edit" onClick={() => openCreateResultModal(record, index)} >
          Create Result
        </Menu.Item>
      </Menu>

    )
  };


  const handleTestSelect = (value) => {

    let selectedTest = arrTestList.find((item) => item.id === value);


    if (selectedTest) {

      const { strTestName } = selectedTest;
      form.setFields([
        {
          name: 'strTestName',
          value: strTestName
        },

      ]);
    }
  };

  const disabledDate = (current) => {
    return current && current < dayjs().startOf('day');
  };



  return (
    <>
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Row gutter={[12, 0]}>
          <Col className="gutter-row" span={6}>
            <Form.Item
              name="fkTestId"
              label="Test Name"
              rules={[
                {
                  required: true,
                  message: 'Please Select a Test!',
                },
              ]}
            >
              <Select onChange={handleTestSelect}  >
                {arrTestList?.length ? (
                  arrTestList.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {item.strTestName}
                    </Option>
                  ))
                ) : (
                  <Option value={null}>No Data</Option>
                )}
              </Select>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={6}>
            <Form.Item valuePropName='time'
              name="startTime"
              label="Test Time"
              rules={[
                {
                  required: true,
                  message: 'Please enter test time',
                },
              ]}
            >
              <TimePicker style={{ width: '100%' }} use12Hours format="hh:mm A" />
            </Form.Item>

          </Col>

          <Col className="gutter-row" span={4} style={{ display: 'none' }} >
            <Form.Item name="strTestName" >
              <Input
                readOnly
              />
            </Form.Item>
          </Col>

          <Col className="gutter-row" span={6} >
            <Form.Item valuePropName='time'
              name="endTime"
              label="Test Due Time"
              rules={[
                {
                  required: true,
                  message: 'Please enter test due time',
                },
              ]}
            >
              <TimePicker style={{ width: '100%' }} use12Hours format="hh:mm A" />
            </Form.Item>
          </Col>

          <Col className="gutter-row" span={6}>
            <Form.Item
              valuePropName={'date'}
              name="strTestDate"
              label="Test Date"
              rules={[
                {
                  type: 'object',
                  required: true,
                  message: 'Please Choose Date',
                },
              ]}
            >
              <DatePicker style={{ width: '100%' }} format={'DD/MM/YYYY'} disabledDate={disabledDate} />
            </Form.Item>

          </Col>

          <Col className="gutter-row" span={6}>
            <Form.Item name="strDescription" label="Description Of Work">
              <Input.TextArea rows={4} />
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
            Add field
          </Button>
        </Form.Item>

      </Form>
      <Divider dashed />
      <Divider dashed />
      <div style={{ margin: 'auto', width: '100%', marginTop: '10px' }}>
        <Table
          dataSource={tableData}
          columns={[
            { title: 'Sl.No', dataIndex: 'slNo', width: 50, render: (value, record, index) => (`${value || index + 1}`) },
            { title: 'Test Name', dataIndex: 'strTestName' },
            {
              title: 'Test Time',
              dataIndex: 'startTime',
              render: (startTime) => {
                const formattedStartTime = startTime ? dayjs(`1970-01-01T${startTime}`).format('hh:mm A') : '';
                return (
                  <span>
                    {formattedStartTime}
                  </span>
                );
              },
            },
            {
              title: 'Due Time',
              dataIndex: 'endTime',
              render: (endTime) => {
                const formattedEndTime = endTime ? dayjs(`1970-01-01T${endTime}`).format('hh:mm A') : '';
                return (
                  <span>
                    {formattedEndTime}
                  </span>
                );
              },
            },
            {
              title: 'Test date',
              dataIndex: 'strTestDate',
              render: (date) => {
                const endDate = dayjs(date);
                return endDate.format('DD/MM/YYYY');
              },
            },
            { title: 'Description', dataIndex: 'strDescription' },
            {
              title: 'Test Status',
              dataIndex: 'intTestStatus',
              render: (intTestStatus) => {
                let statusText = '';
                let textColor = '';

                if (intTestStatus === 1) {
                  statusText = 'Pending';
                  textColor = 'blue';
                } else if (intTestStatus === -1) {
                  statusText = 'Completed';
                  textColor = 'green';
                } else {
                  statusText = 'Cancelled';
                  textColor = 'red';
                }
                const textStyle = { color: textColor };
                return <span style={textStyle}>{statusText}</span>;
              },
            },
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
          pagination={true}
        />


      </div>

      <Modal
        title="Create Result"
        visible={isCreateResultModalVisible}
        onCancel={closeCreateResultModal}
        footer={null}
      >
        <Form
          form={myform}
          onFinish={handleCreateResultSubmit} // Correct attribute for handling form submission
          initialValues={formValues}
        >
          <Form.Item name="fkScheduleId" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="strUnique" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="type" label="Type">
            <Input readOnly />
          </Form.Item>

          {type == 'ECG' &&
            <Form.Item name='strURL' label="Image Url">
              <Input />
            </Form.Item>
          }
          {type == 'BP' &&
            <>
              <Form.Item name='strSystole' label="Systole">
                <InputNumber />
              </Form.Item>

              <Form.Item name='strDiastole' label="Diastole">
                <InputNumber />
              </Form.Item>
              <Form.Item name='strPulse' label="Pulse">
                <InputNumber />
              </Form.Item>
            </>
          }

          {type == 'Pulse_Oxymeter' &&
            <>
              <Form.Item name='strSo2' label="So2">
                <InputNumber />
              </Form.Item>
              <Form.Item name='strHeartRate' label="Heart Rate">
                <InputNumber />
              </Form.Item>
            </>
          }


          {type == 'Thermometer' &&
            <>
              <Form.Item name='strTemperature' label="Temperature">
                <InputNumber />
              </Form.Item>
            </>
          }

          {type == 'Glucometer' &&
            <>
              <Form.Item name='strGlucose' label="Glucose">
                <InputNumber />
              </Form.Item>
            </>
          }
          <Form.Item>
            <Button type="primary" onClick={() => myform.submit()}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
