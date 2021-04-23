import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Preview, Chats, ChatView, Login, Webcapture } from "./Components";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./reducers/ImageSlice";
import { auth } from "./Configs";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            username: authUser.displayName,
            profilePic: authUser.photoURL,
            id: authUser.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);
  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <img
              src="https://pbs.twimg.com/profile_images/1324384358418042880/A-ENfuMC_400x400.jpg"
              alt="logo"
              className="app__logo"
            />
            <div className="app__bodyBackground">
              <Switch>
                <Route exact path="/preview" component={Preview} />
                <Route exact path="/chats/view" component={ChatView} />
                <Route exact path="/chats" component={Chats} />
                <Route exact path="/" component={Webcapture} />
              </Switch>
            </div>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
