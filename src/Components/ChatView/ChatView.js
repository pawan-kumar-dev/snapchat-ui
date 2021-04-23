import React, { useCallback, useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { selectSelectedImage } from "../../reducers/ImageSlice";
import "./ChatView.css";

const ChatView = () => {
  const selectedImage = useSelector(selectSelectedImage);
  const history = useHistory();
  const exit = useCallback(() => {
    history.replace("/chats");
  }, [history]);
  useEffect(() => {
    if (!selectedImage) {
      exit();
    }
  }, [selectedImage, exit]);

  return (
    <div className="chatView">
      <img src={selectedImage} onClick={exit} alt="picsImages" />
      <div className="chatView__timer">
        <CountdownCircleTimer
          isPlaying
          duration={10}
          strokeWidth={6}
          size={50}
          colors={[
            ["#004777", 0.33],
            ["#F78801", 0.33],
            ["#A30000", 0.33],
          ]}
        >
          {({ remainingTime }) => {
            if (remainingTime === 0) {
              exit();
            }
            return remainingTime;
          }}
        </CountdownCircleTimer>
      </div>
    </div>
  );
};

export default ChatView;
