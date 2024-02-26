import React from 'react';

import ErpContextLayout from '../ErpContextLayout';

import { Layout } from 'antd';

const { Content } = Layout;

export default function ErpLayout({ children, config }) {
  return (
    <ErpContextLayout>
      <Layout className="site-layout">
        <Content
          className="whiteBox shadow"
          style={{
            padding: '50px 40px',
            margin: '50px auto',
            width: '100%',
            maxWidth: '90%',
          }}
        >
          {children}
        </Content>
      </Layout>
    </ErpContextLayout>
  );
}
