import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Form, Input, Button, Space, Layout, Row, Col, Divider } from 'antd';
import { Typography } from 'antd';

import { login } from '@/redux/auth/actions';
import { selectAuth } from '@/redux/auth/selectors';
import LoginForm from '@/forms/LoginForm';
import AuthLayout from '@/layout/AuthLayout';

import logo from '@/style/images/logo.png';
import logo1 from '@/style/images/logo1.png';
import logo2 from '@/style/images/logo2.png';
import logo3 from '@/style/images/logo3.png';
import logo4 from '@/style/images/logo4.png';

const { Content } = Layout;
const { Title, Text } = Typography;

const SideContent = () => {
  return (
    <Content
      style={{
        // padding: '150px 30px 30px',
        width: '100%',
        height:'100%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        maxWidth: '400px',
        margin: '0 auto',
      }}
      className="sideContent"
    >
      <div style={{ width: '100%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center' }}>

      </div>
    </Content>
  );
};

const LoginPage = () => {
  const { loading: isLoading } = useSelector(selectAuth);

  const dispatch = useDispatch();
  const onFinish = (values) => {
    console.log('values........', values);
    dispatch(login({ loginData: values }));
  };
  return (
    <>
      <AuthLayout sideContent={<SideContent />}>
        <Content
          style={{
            padding: '200px 30px 30px',
            maxWidth: '440px',
            margin: '0 auto',
          }}
        >
          <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 0 }} span={0}>
           
            <div className="space50"></div>
          </Col>
          <Title style={{fontSize:22}} level={1}>Sign in</Title>

          <Divider />
          <div className="site-layout-content">
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <LoginForm />
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button loginBtn"
                  loading={isLoading}
                  size="large"
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Content>
      </AuthLayout>
    </>
  );
};

export default LoginPage;
