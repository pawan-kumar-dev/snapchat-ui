import { Button } from "@material-ui/core";
import React from "react";
import "./Login.css";

const Login = () => {
  const signIn = () => {};
  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://pbs.twimg.com/profile_images/1324384358418042880/A-ENfuMC_400x400.jpg"
          alt="logo"
        />
        <Button variant="outlined" onClick={signIn}>
          Sing In
        </Button>
      </div>
    </div>
  );
};

export default Login;
