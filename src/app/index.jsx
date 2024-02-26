import React, { useEffect } from 'react';

import Router from '@/router';

import useNetwork from '@/hooks/useNetwork';

import { Layout, notification } from 'antd';

import Navigation from '@/app/Navigation';

import { useSelector } from 'react-redux';
import { selectAuth } from '@/redux/auth/selectors';
import HeaderContent from '@/app/HeaderContent';
// import { useNetworkState } from "react-use";

function App() {
 

  const { isLoggedIn } = useSelector(selectAuth);

  if (!isLoggedIn) return <Router />;
  else {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Navigation />
        <Layout style={{ minHeight: '100vh' }}>
          <HeaderContent />
          <Router isLoggedIn={true} />
        </Layout>
      </Layout>
    );
  }
}

export default App;
