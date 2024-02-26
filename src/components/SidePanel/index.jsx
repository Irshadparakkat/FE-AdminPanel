import React, { useState, useEffect } from 'react';
import { useCrudContext } from '@/context/crud';
import { useAppContext } from '@/context/appContext';
import { Layout } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import CollapseBox from '../CollapseBox';

const { Sider } = Layout;

export default function SidePanel({ config, topContent, bottomContent, fixHeaderPanel }) {
  const { ADD_NEW_ENTITY } = config;
  const { state, crudContextAction } = useCrudContext();
  const { isPanelClose, isBoxCollapsed } = state;
  const { panel, collapsedBox } = crudContextAction;
  const [isSidePanelClose, setSidePanel] = useState(isPanelClose);
  const [leftSider, setLeftSider] = useState('-1px');
  const [opacitySider, setOpacitySider] = useState(0);
  const [paddingTopSider, setPaddingTopSider] = useState('20px');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  const { state: stateApp, appContextAction } = useAppContext();
  const { isNavMenuClose } = stateApp;
  const { navMenu } = appContextAction;

  useEffect(() => {
    let timer = [];
    if (isPanelClose) {
      setOpacitySider(0);
      setPaddingTopSider('20px');

      timer = setTimeout(() => {
        setLeftSider('-1px');
        setSidePanel(isPanelClose);
      }, 200);
    } else {
      setSidePanel(isPanelClose);
      setLeftSider(0);
      timer = setTimeout(() => {
        setOpacitySider(1);
        setPaddingTopSider(0);
      }, 200);
      if (!isNavMenuClose) {
        navMenu.close();
      }
    }

    return () => clearTimeout(timer);
  }, [isPanelClose]);

  const collapsePanel = () => {
    panel.collapse();
  };

  const collapsePanelBox = () => {
    collapsedBox.collapse();
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if(isMobile){
    return(
      <Sider
      trigger={<MenuOutlined className="trigger" />}
      width={'100%'}
      collapsible
      collapsed={isSidePanelClose}
      collapsedWidth={'0px'}
      onCollapse={collapsePanel}
      className="sidePanel"
      zeroWidthTriggerStyle={{
        right: '-50px',
        top: '65px',
        backgroundColor:'red',
        display:'none'
      }}
      style={{
        left: leftSider,
        position:'fixed',
        zIndex:'2',
        top:'5px',
        right:'0',
        bottom:'0',
      }}
    >
      <div
        className="sidePanelContent"
        style={{
          opacity: opacitySider,
          paddingTop: paddingTopSider,
        }}
      >
        {fixHeaderPanel}
        <CollapseBox
          buttonTitle={ADD_NEW_ENTITY}
          isCollapsed={isBoxCollapsed}
          onCollapse={collapsePanelBox}
          topContent={topContent}
          bottomContent={bottomContent}
        ></CollapseBox>
      </div>
    </Sider>
    )
  }

  return (
    <Sider
      trigger={<MenuOutlined className="trigger" />}
      width={400}
      collapsible
      collapsed={isSidePanelClose}
      collapsedWidth={'0px'}
      onCollapse={collapsePanel}
      className="sidePanel"
      zeroWidthTriggerStyle={{
        right: '-50px',
        top: '15px',
      }}
      style={{
        left: leftSider,
      }}
    >
      <div
        className="sidePanelContent"
        style={{
          opacity: opacitySider,
          paddingTop: paddingTopSider,
        }}
      >
        {fixHeaderPanel}
        <CollapseBox
          buttonTitle={ADD_NEW_ENTITY}
          isCollapsed={isBoxCollapsed}
          onCollapse={collapsePanelBox}
          topContent={topContent}
          bottomContent={bottomContent}
        ></CollapseBox>
      </div>
    </Sider>
  );
}
