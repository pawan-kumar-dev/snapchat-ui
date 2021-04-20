import { Button } from "@material-ui/core";
import React from "react";
import "./Login.css";
import { auth, provider } from "./firebase";
import { useDispatch } from "react-redux";
import { login } from "./reducers/ImageSlice";

const Login = () => {
  const dispatch = useDispatch();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch(
          login({
            username: result.user.displayName,
            profilePic: result.user.photoURL,
            id: result.user.uid,
          })
        );
      })
      .catch((err) => alert(err.message));
  };
  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://pbs.twimg.com/profile_images/1324384358418042880/A-ENfuMC_400x400.jpg"
          alt="logo"
        />
        <Button variant="outlined" fullWidth onClick={signIn}>
          Sing In
        </Button>
      </div>
    </div>
  );
};

export default Login;
