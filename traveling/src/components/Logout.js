import React from "react";
import './Logout.css';
import { Button } from 'antd';
import { useAuth0 } from "@auth0/auth0-react";

const Logout = () => {
  const { logout, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <div className="logout_container">
        <Button onClick={() => logout()}>Logout</Button>
      </div>
    )
  );
};

export default Logout;
