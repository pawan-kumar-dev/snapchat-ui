import { Avatar, IconButton, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import "./Chats.css";
import { auth, db } from "../../Configs";
import { Chat } from "../index";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../reducers/ImageSlice";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import { useHistory } from "react-router";
import { resetCameraImage } from "../../reducers/cameraSlice";

const useStyles = makeStyles({
  avatar: {
    height: "25px",
    width: "25px",
    cursor: "pointer",
  },
  takeSnap: {
    position: "absolute",
    backgroundColor: "white",
    borderRadius: "200px",
    color: "gray",
    fontSize: "40px",
    bottom: 0,
    left: "50%",
    padding: "0",
    transform: "translate(-50%, -50%)",
    "&:hover": {
      opacity: "0.5",
    },
  },
});

const Chats = () => {
  const classes = useStyles();
  const user = useSelector(selectUser);
  const [post, setPost] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const [friend, setFriend] = useState("");
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
  const takeSnap = () => {
    dispatch(resetCameraImage());
    history.push("/");
  };
  const filteredChat = post.filter((p) =>
    p.data.username.toLowerCase().includes(friend.toLowerCase())
  );
  return (
    <div className="chats">
      <div className="chats__header">
        <Avatar
          src={user.profilePic}
          onClick={() => auth.signOut()}
          className={classes.avatar}
        />
        <div className="chats__search">
          <SearchIcon />
          <input
            type="text"
            placeholder="Friends"
            value={friend}
            onChange={(e) => setFriend(e.target.value)}
          />
        </div>
        <ChatBubbleIcon />
      </div>
      <div className="chats__post">
        {filteredChat.map(
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
      <IconButton className={classes.takeSnap} onClick={takeSnap}>
        <RadioButtonCheckedIcon fontSize="large" />
      </IconButton>
    </div>
  );
};

export default Chats;
