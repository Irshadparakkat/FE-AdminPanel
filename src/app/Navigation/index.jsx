import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Drawer, Layout, Menu } from 'antd';

import { useAppContext } from '@/context/appContext';
import logoIcon from '@/style/images/logo-icon.png';
import logoText from '@/style/images/logo-text.png';
import AcuteLogo from '@/style/images/Acute-Logo.png';
import Acute from '@/style/images/acute.png';

import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';

import {
  MenuOutlined,
  SettingOutlined,
  DashboardOutlined,
  BankOutlined,
  ReadOutlined,
  ProjectFilled,
  ProjectOutlined,
  DoctorOutline,
  MonitorOutlined,
  NotificationOutlined,
  UsergroupAddOutlined,
  UserSwitchOutlined,
  ApiOutlined,
} from '@ant-design/icons';
import { ReportOutlined, WavesOutlined } from '@material-ui/icons';
import { motion } from 'framer-motion';

const { Sider } = Layout;
const { SubMenu } = Menu;

export default function Navigation() {
  return (
    <>
      <div className="sidebar-wraper">
        <Sidebar collapsible={true} />
      </div>
      <MobileSidebar />
    </>
  );
}

function Sidebar({ collapsible }) {
  const { state: stateApp, appContextAction } = useAppContext();
  const { isNavMenuClose } = stateApp;
  const { navMenu } = appContextAction;
  const [showLogoApp, setLogoApp] = useState(isNavMenuClose);

  useEffect(() => {
    if (isNavMenuClose) {
      setLogoApp(isNavMenuClose);
    }
    const timer = setTimeout(() => {
      if (!isNavMenuClose) {
        setLogoApp(isNavMenuClose);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [isNavMenuClose]);

  const onCollapse = () => {
    navMenu.collapse();
  };
  const [userType, setUserType] = useState('');

  useEffect(() => {
    // Retrieve user type from local storage
    const storedUserType = window.localStorage.getItem('strUserType');

    setUserType(storedUserType);
  }, []);
  return (
    <>

      <Sider
        collapsible={collapsible}
        collapsed={collapsible ? isNavMenuClose : collapsible}
        onCollapse={onCollapse}
        className="navigation"
      >
        <motion.div className="logo" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

        
        </motion.div>

        <Menu mode="inline">
          <Menu.Item key={'Users'} icon={<UserSwitchOutlined />} >
            <Link to={'/'} />
            Users
          </Menu.Item>

          <Menu.Item key={'apiKeys'} icon={<ApiOutlined />} >
            <Link to={'/apikeys'} />
            Api keys
          </Menu.Item>

          <Menu.Item key={'Freequancy'}  icon={<WavesOutlined />} >
            <Link to={'/freequency'} />
            Messaging frequency's
          </Menu.Item>

        </Menu>
      </Sider>
    </>
  );
}

function MobileSidebar() {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
      <Button type="text" size="large" onClick={showDrawer} className="mobile-sidebar-btn">
        <MenuOutlined />
      </Button>
      <Drawer
        width={200}
        placement="left"
        closable={false}
        onClose={onClose}
        visible={visible}
        className="mobile-sidebar-wraper"
      >
        <Sidebar collapsible={false} />
      </Drawer>
    </>
  );
}
