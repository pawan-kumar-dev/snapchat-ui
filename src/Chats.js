import { Avatar, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import "./Chats.css";
import { db } from "./firebase";
import Chat from "./Chat";

const useStyles = makeStyles({
  avatar: {
    height: "25px",
    width: "25px",
  },
});

const Chats = () => {
  const classes = useStyles();
  const [post, setPost] = useState([]);
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snap) => {
        setPost(
          snap.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, []);
  return (
    <div className="chats">
      <div className="chats__header">
        <Avatar className={classes.avatar} />
        <div className="chats__search">
          <SearchIcon />
          <input type="text" placeholder="Friends" />
        </div>
        <ChatBubbleIcon />
      </div>
      <div className="chats__post">
        {post.map(
          ({
            id,
            data: { profilePic, username, timestamp, imageUrl, read },
          }) => (
            <Chat
              key={id}
              id={id}
              username={username}
              timestamp={timestamp}
              imageUrl={imageUrl}
              read={read}
              profilePic={profilePic}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Chats;
