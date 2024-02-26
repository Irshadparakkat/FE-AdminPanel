import React, { useState, useEffect, useRef } from 'react';
import { DatePicker } from '@/components/CustomAntd';

import dayjs from 'dayjs';
import api from '@/request/services';
import { Form, Input, InputNumber, Button, Select, Divider, Row, Col, Radio, Upload, Typography } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import AutoCompleteAsync from '@/components/AutoCompleteAsync';


const { Title } = Typography;

  

const { Option } = Select;
export default function PatientFrom({setFormFeild}) {
  const [arrCountry, setCountry] = useState([]);
  const [arrLanguages, setLanguages] = useState([]);

  const [form] = Form.useForm();


const [arrProcedures, setProcedure] = useState([]);
const [arrRma, setRma] = useState([]);

const [arrHospitals, setHospital] = useState([]);

const [arrDoctors, setDoctors] = useState([]);

const [arrPackages, setPackages] = useState([]);
const [base64,setFileBase64]=useState(null)

const [uploadedFileName, setUploadedFileName] = useState('');

const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);




useEffect(async () => { 
 let listRequestBody= {
    "type": "allMasterList",
    "strListType": "package"
  }
  Promise.all([
    api.list({ 
      listURL: 'rma_list'
    }),


    api.list({ 
      listURL: 'list_hospital'
    }),

    api.list({ 
      listURL: 'doctor_entry_list'
    }),


    api.list({ 
      listURL: 'common_controller',options:{...listRequestBody,where:'package'}
    }),

    api.getAllTypeList({ strType: 'language' }),
    api.getAllTypeList({ strType: 'country' }),
    api.getAllTypeList({ strType: 'procedure' }),

])
.then(responses => {
  const[objRma,objHospital,objDoctors,objPackages,objLanguages,objContrys,objProcedure] = responses;
Promise.all([
  setRma(objRma?.arrList),
  setHospital(objHospital?.arrList),
  setDoctors(objDoctors?.arrList),
  setPackages(objPackages?.arrList),
  setLanguages(objLanguages?.arrList),
  setCountry(objContrys?.arrList),
  setProcedure(objProcedure?.arrList),
])
})
.catch(error => {
  console.error('Error:', error);
});
}, []);


const handleFileUpload = (file) => {
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFileBase64(reader.result.split(',')[1]);
    };
    
    setUploadedFileName(file.name);
  } else {
    setFileBase64(null);
    setUploadedFileName('');
  }
};



useEffect(() => {
  if (base64) {
    setFormFeild('base64', base64);

    setFormFeild('strDocumentUrl',uploadedFileName)
  }
}, [base64]);

useEffect(()=>{
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 600);
  };
  window.addEventListener('resize', handleResize);
  return () => {
    window.removeEventListener('resize', handleResize);
  };
})

if(isMobile){
  return(
    <>
      <Title level={4}>Register Patient</Title>
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={24}>
          <Form.Item
            label="Patient Name"
            name="strFullName"
            rules={[
              {
                required: true,
                message: 'Please input Patient Name!',
              },
            ]}
          >
                <Input />
          </Form.Item>
        </Col>


        <Col className="gutter-row" span={24}>
          <Form.Item
            label="Op Number"
            name="strOpNumber"
            rules={[
              {
                required: true,
                message: 'Please Enter Op Number!',
                type:'number',
              },
            ]}
          >
            <InputNumber
            controls={false}
            style={{ width: '100%' }}/>
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={24}>
          <Form.Item
            label="Mobile Number"
            name="strMobile"
            rules={[
              {
                required: true,
                message: 'Please Enter Phone Number!',
                type:'number',
              },
            ]}
          >
            <InputNumber
            controls={false}
            style={{ width: '100%' }}/>
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={24}>
          <Form.Item
            label="Email Id"
            name="strEmail"
            rules={[
              {
                required: true,
                message: 'Please input Email Id!',
                type:'email'
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        
      </Row>
      <Row gutter={[12, 0]}>
       
        <Col className="gutter-row" span={24}>
          <Form.Item
            label="Password"
            name="strPassword"
            rules={[
              {
                required: true,
                message: 'Please Enter Password !',
              },
            ]}
          >
            <Input type='password' />
          </Form.Item>
        </Col>
       

        <Col className="gutter-row" span={24}>

<Form.Item valuePropName={'date'}
    name="strDob"
    label="Date of Birth "
    rules={[
      {
        required: true,
        type: 'object',
        message: 'Please input Date Of Birth',
      },
    ]}
    initialValue={dayjs()}
  >
    <DatePicker style={{ width: '100%' }} format={'DD/MM/YYYY'} />
  </Form.Item>
</Col>


        <Col className="gutter-row" span={24}>
          <Form.Item
            label="Gender"
            name="strGender"
            rules={[
              {
                required: true,
                message: 'Please Select Gender',
              },
            ]}
          >
             <Radio.Group>
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[12, 0]}>

      <Col className="gutter-row" span={24}>
          <Form.Item
            label="Country"
            name="strCountry"
            rules={[
              {
                required: true,
                message: 'Please Select Your Country!',
              },
            ]}
          >

             <Select>
              {arrCountry?.length ? (arrCountry.map(item => (
                <Option key={item.id} value={item.strName}>{item.strName}</Option>
              ))) : (
                <Option value="nodata">No Data</Option>
              )}
            </Select>
          </Form.Item>
        </Col>
      
        <Col className="gutter-row" span={24}>
  <Form.Item 
    name="strAddress"
    label="Address"
    rules={[
      {
        required: true,
        message: 'Please input Address',
      },
    ]}
  >
    <Input.TextArea rows={6} style={{ resize: 'vertical' }} />
  </Form.Item>
</Col>

      </Row>


      <Row gutter={[12, 0]}>
      <Title level={4}>Medical Profile</Title>
      </Row>
      
      <Row gutter={[12, 0]}>
      <Col className="gutter-row" span={24}>
          <Form.Item name="fkRmaId" label="Rma"
rules={[
  {
    required: true,
    message: 'Please Select Rma',
  },
]}
          >
            <Select>
          {arrRma?.length ? (
            arrRma.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.strFullName}
              </Option>
            ))
          ) : (
            <Option value={0}>No Data</Option>
          )}
        </Select>
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={24}>
          <Form.Item name="fkDoctorId" label="Doctor"
rules={[
  {
    required: true,
    message: 'Please Select Doctor',
  },
]}
          >
            <Select>
          {arrDoctors?.length ? (
            arrDoctors.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.strFullName}
              </Option>
            ))
          ) : (
            <Option value={0}>No Data</Option>
          )}
        </Select>
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={24}>
          <Form.Item name="strLanguage" label="Preferred Language"

rules={[
  {
    required: true,
    message: 'Please Select Preferred Language',
  },
]}
          >
            <Select>
          {arrLanguages?.length ? (
            arrLanguages.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.strName}
              </Option>
            ))
          ) : (
            <Option value={0}>No Data</Option>
          )}
        </Select>
          </Form.Item>
        </Col>


        <Col className="gutter-row" span={24}>
          <Form.Item name="strProcedureUndergo" label="Procedure Undergone"
          >
            <Select>
          {arrProcedures?.length ? (
            arrProcedures.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.strName}
              </Option>
            ))
          ) : (
            <Option value={null}>No Data</Option>
          )}
        </Select>
          </Form.Item>
        </Col>
        </Row>

      <Row gutter={[12, 0]}>

        <Col className="gutter-row" span={24}>
          <Form.Item name="fkHospitalId" label="Hospital"

          
rules={[
  {
    required: true,
    message: 'Please Select Hospital',
  },
]}
          >
            <Select>
          {arrHospitals?.length ? (
            arrHospitals.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.strHospitalName}
              </Option>
            ))
          ) : (
            <Option value={null}>No Data</Option>
          )}
        </Select>
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={24}>
          <Form.Item name="fkPackageId" label="Package"
          >
            <Select>
          {arrPackages?.length ? (
            arrPackages.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.strPckName}
              </Option>
            ))
          ) : (
            <Option value={null}>No Data</Option>
          )}
        </Select>
          </Form.Item>
        </Col> 

        <Col className="gutter-row" span={24}>
          <Form.Item
            label="Is Diabetic ? "
            name="isDiabetic"
            rules={[
              {
                required: true,
                message: 'Please Select Diabetic Status',
              },
            ]}
          >
             <Radio.Group>
              <Radio value="1">Yes</Radio>
              <Radio value="2">No</Radio>
              <Radio value="0">Unknown</Radio>

            </Radio.Group>
          </Form.Item>
        </Col>

        
<Col className="gutter-row" span={24}>
          <Form.Item
            label="Emergency Contact Number"
            name="strEmergencyMobNo1"
            rules={[
              {
                required: true,
                message: 'Please Enter Emergency contact Number!',
                type:'number',
              },
            ]}
          >
            <InputNumber
            controls={false}
            style={{ width: '100%' }}/>
          </Form.Item>
        </Col>

      
      </Row>


      <Row gutter={[12, 12]}>
      <Col className="gutter-row" span={24}>
      <Form.Item
  name="strImgUrl" 
  label="Attach Files"
  valuePropName="fileList"
  getValueFromEvent={(e) => {
    handleFileUpload(e.file); 
    return [e.file];
  }}
>
  <Upload
    beforeUpload={() => false}
    listType="text" 
    onRemove={() => {
      setFileBase64(null);
      setUploadedFileName('');
    }}
  >
    <Button icon={<UploadOutlined />} style={{ width: '100%' }}>
      {uploadedFileName || 'Choose File'} 
    </Button>
  </Upload>
</Form.Item>

</Col>
      </Row>
    </>
  )
}

  return (
    <>
      <Title level={4}>Register Patient</Title>
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={6}>
          <Form.Item
            label="Patient Name"
            name="strFullName"
            rules={[
              {
                required: true,
                message: 'Please input Patient Name!',
              },
            ]}
          >
                <Input />
          </Form.Item>
        </Col>

        
        <Col className="gutter-row" span={6}>
          <Form.Item
            label="Op Number"
            name="strOpNumber"
            rules={[
              {
                required: true,
                message: 'Please Enter Op Number!',
                type:'number',
              },
            ]}
          >
            <InputNumber
            controls={false}
            style={{ width: '100%' }}/>
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={6}>
          <Form.Item
            label="Mobile Number"
            name="strMobile"
            rules={[
              {
                required: true,
                message: 'Please Enter Phone Number!',
                type:'number',
              },
            ]}
          >
            <InputNumber
            controls={false}
            style={{ width: '100%' }}/>
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={6}>
          <Form.Item
            label="Email Id"
            name="strEmail"
            rules={[
              {
                required: true,
                message: 'Please input Email Id!',
                type:'email'
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        
      </Row>
      <Row gutter={[12, 0]}>
       
        <Col className="gutter-row" span={8}>
          <Form.Item
            label="Password"
            name="strPassword"
            rules={[
              {
                required: true,
                message: 'Please Enter Password !',
              },
            ]}
          >
            <Input type='password' />
          </Form.Item>
        </Col>
       

        <Col className="gutter-row" span={8}>

<Form.Item valuePropName={'date'}
    name="strDob"
    label="Date of Birth "
    rules={[
      {
        required: true,
        type: 'object',
        message: 'Please input Date Of Birth',
      },
    ]}
    initialValue={dayjs()}
  >
    <DatePicker style={{ width: '100%' }} format={'DD/MM/YYYY'} />
  </Form.Item>
</Col>


        <Col className="gutter-row" span={8}>
          <Form.Item
            label="Gender"
            name="strGender"
            rules={[
              {
                required: true,
                message: 'Please Select Gender',
              },
            ]}
          >
             <Radio.Group>
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[12, 0]}>

      <Col className="gutter-row" span={8}>
          <Form.Item
            label="Country"
            name="strCountry"
            rules={[
              {
                required: true,
                message: 'Please Select Your Country!',
              },
            ]}
          >

             <Select>
              {arrCountry?.length ? (arrCountry.map(item => (
                <Option key={item.id} value={item.strName}>{item.strName}</Option>
              ))) : (
                <Option value="nodata">No Data</Option>
              )}
            </Select>
          </Form.Item>
        </Col>
      
        <Col className="gutter-row" span={8}>
  <Form.Item 
    name="strAddress"
    label="Address"
    rules={[
      {
        required: true,
        message: 'Please input Address',
      },
    ]}
  >
    <Input.TextArea rows={4} style={{ resize: 'vertical' }} />
  </Form.Item>
</Col>

      </Row>


      <Row gutter={[12, 0]}>
      <Title level={4}>Medical Profile</Title>
      </Row>
      
      <Row gutter={[12, 0]}>
      <Col className="gutter-row" span={6}>
          <Form.Item name="fkRmaId" label="Rma"
rules={[
  {
    required: true,
    message: 'Please Select Rma',
  },
]}
          >
            <Select>
          {arrRma?.length ? (
            arrRma.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.strFullName}
              </Option>
            ))
          ) : (
            <Option value={0}>No Data</Option>
          )}
        </Select>
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={6}>
          <Form.Item name="fkDoctorId" label="Doctor"
rules={[
  {
    required: true,
    message: 'Please Select Doctor',
  },
]}
          >
            <Select>
          {arrDoctors?.length ? (
            arrDoctors.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.strFullName}
              </Option>
            ))
          ) : (
            <Option value={0}>No Data</Option>
          )}
        </Select>
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={6}>
          <Form.Item name="strLanguage" label="Preferred Language"

rules={[
  {
    required: true,
    message: 'Please Select Preferred Language',
  },
]}
          >
            <Select>
          {arrLanguages?.length ? (
            arrLanguages.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.strName}
              </Option>
            ))
          ) : (
            <Option value={0}>No Data</Option>
          )}
        </Select>
          </Form.Item>
        </Col>


        <Col className="gutter-row" span={6}>
          <Form.Item name="strProcedureUndergo" label="Procedure Undergone"
          >
            <Select>
          {arrProcedures?.length ? (
            arrProcedures.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.strName}
              </Option>
            ))
          ) : (
            <Option value={null}>No Data</Option>
          )}
        </Select>
          </Form.Item>
        </Col>
        </Row>

      <Row gutter={[12, 0]}>

        <Col className="gutter-row" span={6}>
          <Form.Item name="fkHospitalId" label="Hospital"

          
rules={[
  {
    required: true,
    message: 'Please Select Hospital',
  },
]}
          >
            <Select>
          {arrHospitals?.length ? (
            arrHospitals.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.strHospitalName}
              </Option>
            ))
          ) : (
            <Option value={null}>No Data</Option>
          )}
        </Select>
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={6}>
          <Form.Item name="fkPackageId" label="Package"
          >
            <Select>
          {arrPackages?.length ? (
            arrPackages.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.strPckName}
              </Option>
            ))
          ) : (
            <Option value={null}>No Data</Option>
          )}
        </Select>
          </Form.Item>
        </Col> 

        <Col className="gutter-row" span={6}>
          <Form.Item
            label="Is Diabetic ? "
            name="isDiabetic"
            rules={[
              {
                required: true,
                message: 'Please Select Diabetic Status',
              },
            ]}
          >
             <Radio.Group>
              <Radio value="1">Yes</Radio>
              <Radio value="2">No</Radio>
              <Radio value="0">Unknown</Radio>

            </Radio.Group>
          </Form.Item>
        </Col>

        
<Col className="gutter-row" span={6}>
          <Form.Item
            label="Emergency Contact Number"
            name="strEmergencyMobNo1"
            rules={[
              {
                required: true,
                message: 'Please Enter Emergency contact Number!',
                type:'number',
              },
            ]}
          >
            <InputNumber
            controls={false}
            style={{ width: '100%' }}/>
          </Form.Item>
        </Col>

      
      </Row>


      <Row gutter={[12, 12]}>
      <Col className="gutter-row" span={8}>
      <Form.Item
  name="strImgUrl" 
  label="Attach Files"
  valuePropName="fileList"
  getValueFromEvent={(e) => {
    handleFileUpload(e.file); 
    return [e.file];
  }}
>
  <Upload
    beforeUpload={() => false}
    listType="text" 
    onRemove={() => {
      setFileBase64(null);
      setUploadedFileName('');
    }}
  >
    <Button icon={<UploadOutlined />} style={{ width: '100%' }}>
      {uploadedFileName || 'Choose File'} 
    </Button>
  </Upload>
</Form.Item>

</Col>
      </Row>
    </>
  );
}
