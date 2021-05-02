import React from "react";
import './Login.css';
import { Button } from 'antd';
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <div className="login_container">
        <Button onClick={() => loginWithRedirect()}>Login</Button>
      </div>
    )
  );
};

export default Login;
