import React, { useCallback, useRef } from "react";
import Webcam from "react-webcam";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import {
  IconButton,
  makeStyles,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setCameraImage } from "../../reducers/cameraSlice";
import { useHistory } from "react-router";
import "./Webcapture.css";

const useStyles = makeStyles({
  captureBtn: {
    position: "absolute",
    bottom: "0",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "white",
  },
});

const Webcapture = () => {
  const theme = useTheme();
  const media = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles();
  const webcamRef = useRef(null);
  const history = useHistory();
  const videoConstraints = {
    width: media ? window.innerWidth : 620,
    height: media ? window.innerHeight : 720,
    facingMode: "user",
  };
  const dispatch = useDispatch();
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    dispatch(setCameraImage(imageSrc));
    history.push("/preview");
  }, [webcamRef, dispatch, history]);
  return (
    <div className="webcapture">
      <Webcam
        audio={false}
        height={videoConstraints.height}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={videoConstraints.width}
        videoConstraints={videoConstraints}
      />
      <IconButton onClick={capture} className={classes.captureBtn}>
        <RadioButtonUncheckedIcon fontSize="large" />
      </IconButton>
    </div>
  );
};

export default Webcapture;
