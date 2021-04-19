import { Avatar, IconButton, makeStyles } from "@material-ui/core";
import React from "react";
import StopRoundedIcon from "@material-ui/icons/StopRounded";
import "./Chat.css";
import ReactTimeago from "react-timeago";
import { useDispatch } from "react-redux";
import { selectImage } from "./reducers/ImageSlice";
import { db } from "./firebase";
import { useHistory } from "react-router";

const useStyles = makeStyles({
  avatar: {
    height: "30px",
    width: "30px",
  },
  redIcon: {
    color: "red",
  },
});

const Chat = ({ profilePic, username, timestamp, imageUrl, read, id }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const open = () => {
    if (!read) {
      dispatch(selectImage(imageUrl));
      db.collection("posts").doc(id).set(
        {
          read: true,
        },
        { merge: true }
      );
      history.push("/chats/view");
    }
  };
  return (
    <div className="chat" onClick={open}>
      <Avatar src={profilePic} className={classes.avatar} />
      <div className="chat__info">
        <h4>{username}</h4>
        <p>
          {!read && "Tap to view -"}
          <ReactTimeago date={new Date(timestamp?.toDate())} />
        </p>
      </div>
      {!read && (
        <IconButton className={classes.redIcon}>
          <StopRoundedIcon />
        </IconButton>
      )}
    </div>
  );
};

export default Chat;
