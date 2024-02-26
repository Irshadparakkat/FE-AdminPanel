import { Form, Input, Upload, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { DeleteOutlined } from '@ant-design/icons';

export default function ItemRow({ field, remove}) {
  return (
    <Row gutter={[12, 12]} style={{ position: 'relative'  ,marginLeft:'30px',paddingTop:'15px'}}>
      <Col className="gutter-row" span={12}>
        <Form.Item
          name={[field.name, 'strDocumentName']}
          fieldKey={[field.fieldKey, 'strDocumentName']}
          rules={[{ required: false, message: 'Missing Document Name' }]}
        >
          <Input placeholder="Document Name" />
        </Form.Item>
      </Col>
      <Col className="gutter-row" span={6}>
        <Form.Item
          name={[field.name, 'description']}
          fieldKey={[field.fieldKey, 'description']}
          valuePropName="fileList"
          getValueFromEvent={(e) => e && e.fileList}
        >
          <Upload beforeUpload={() => false} maxCount={1}>
            <Input placeholder="Document Upload" suffix={<UploadOutlined />} />
          </Upload>
        </Form.Item>
      </Col>
<Col  className="gutter-row" span={3} >
      <div style={{ position: 'absolute' ,top:'5px' }}>
        <DeleteOutlined onClick={() => remove(field.name)} />
      </div>
      </Col>
    </Row>
  );
}
