import { Avatar, IconButton, makeStyles } from "@material-ui/core";
import React from "react";
import StopRoundedIcon from "@material-ui/icons/StopRounded";
import "./Chat.css";
import ReactTimeago from "react-timeago";

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
  return (
    <div className="chat">
      <Avatar src={profilePic} className={classes.avatar} />
      <div className="chat__info">
        <h4>{username}</h4>
        <p>
          Tap to view -
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
