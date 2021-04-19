import React from "react";
import "./App.css";
import Webcapture from "./Webcapture";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Preview from "./Preview";
import Chats from "./Chats";
import ChatView from "./ChatView";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "./reducers/ImageSlice";
import Login from "./Login";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <Switch>
            <Route exact path="/preview" component={Preview} />
            <Route exact path="/chats/view" component={ChatView} />
            <Route exact path="/chats" component={Chats} />
            <Route exact path="/" component={Webcapture} />
          </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
