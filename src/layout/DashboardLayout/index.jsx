import React from 'react';

import { Layout } from 'antd';

const { Content } = Layout;

export default function DashboardLayout({ children }) {
  return (
    <Layout className="site-layout">
      <Content
        style={{
          padding: '30px 40px',
          margin: '40px auto',
          width: '100%',
          maxWidth: '100%',
        }}
      >
        {children}
      </Content>
    </Layout>
  );
}
