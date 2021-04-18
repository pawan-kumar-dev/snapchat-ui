import { IconButton, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { resetCameraImage, selectCameraImage } from "./reducers/cameraSlice";
import CloseIcon from "@material-ui/icons/Close";
import "./Preview.css";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import NoteIcon from "@material-ui/icons/Note";
import CreateIcon from "@material-ui/icons/Create";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import CropIcon from "@material-ui/icons/Crop";
import TimerIcon from "@material-ui/icons/Timer";
import SidebarIcon from "./SidebarIcon";
import SendIcon from "@material-ui/icons/Send";
import { v4 as uuid } from "uuid";
import { db, storage } from "./firebase";
import firebase from "firebase";

const useStyles = makeStyles({
  closeIcon: {
    position: "absolute",
    top: "0",
    margin: "5px",
    color: "white",
  },
});

const Preview = () => {
  const cameraImage = useSelector(selectCameraImage);
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  useEffect(() => {
    if (!cameraImage) {
      history.replace("/");
    }
  }, [cameraImage, history]);
  const closePreview = () => {
    dispatch(resetCameraImage());
  };
  const sendPost = () => {
    const id = uuid();
    const uploadTask = storage
      .ref(`posts/${id}`)
      .putString(cameraImage, "data_url");
    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("posts")
          .child(id)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              imageUrl: url,
              username: "Pawan",
              read: false,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
            history.push("/chats");
          });
      }
    );
  };
  return (
    <div className="preview">
      <IconButton onClick={closePreview} className={classes.closeIcon}>
        <CloseIcon />
      </IconButton>
      <div className="preview__toolbarIcons">
        <SidebarIcon Icon={TextFieldsIcon} />
        <SidebarIcon Icon={NoteIcon} />
        <SidebarIcon Icon={CreateIcon} />
        <SidebarIcon Icon={MusicNoteIcon} />
        <SidebarIcon Icon={AttachFileIcon} />
        <SidebarIcon Icon={CropIcon} />
        <SidebarIcon Icon={TimerIcon} />
      </div>
      <img src={cameraImage} alt="snapchat" />
      <div className="preview__footer" onClick={sendPost}>
        <h2>Send Now</h2>
        <SendIcon />
      </div>
    </div>
  );
};

export default Preview;
