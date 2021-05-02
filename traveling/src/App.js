import React from 'react';
import { Typography } from 'antd';
import './App.css';
import Footer from './components/Footer';
import Login from './components/Login';
import Logout from './components/Logout';
import Profile from './components/Profile';
import { useAuth0 } from '@auth0/auth0-react';
import { Menu } from 'antd';

function App() {
  const { isLoading } = useAuth0();
  const { Title } = Typography;
  // const { SubMenu } = Menu;

  if (isLoading) return <div>Loading...</div>
  
  return (
      <Menu className="app_container">
        <Title level={1}>Travel Fun</Title>
        <Login />
        <Logout />
        <Profile />
        <Footer />
      </Menu>
  );
}

export default App;
