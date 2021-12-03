import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Lottie from "react-lottie";
import playBtn from "./files/playBtn.json";
import sound from "./files/speaker.json";
import { useEffect, useRef, useState } from "react";
import video from "./files/video.mp4";
import thumbnail from "./files/thumbnail.jpg";
import useVideoPlayer from "./hooks/useVideoPlayer";

const App = () => {
  const videoElement = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [btnShow, setBtnShow] = useState({
    mainBtn: true,
    forwards: false,
    backword: false,
  });
  const [direction, setDirection] = useState(1);
  const playOptions = {
    loop: false,
    autoplay: false,
    animationData: playBtn,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const speakerOptions = {
    loop: false,
    autoplay: false,
    animationData: sound,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleVideoSpeed,
    toggleMute,
    skipVideo,
  } = useVideoPlayer(videoElement);
  return (
    <div className="container">
      <div className="video-wrapper">
        <div
          className="center__play__btn"
          onClick={() => {
            togglePlay();
            setBtnShow({...btnShow, mainBtn: true});
          }}
          style={{
            zIndex: 2,
            height:"100%",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          {(btnShow?.mainBtn || !playerState.isPlaying) && (
            <Lottie
              options={playOptions}
              height={200}
              width={200}
              // isPaused={isPaused}
              direction={playerState.isPlaying ? 1 : -1}
              eventListeners={[
                {
                  eventName: "complete",
                  callback: () => setBtnShow({ ...btnShow, mainBtn: false }),
                },
              ]}
            />
          )}
        </div>
        <video
          src={video}
          poster={thumbnail}
          ref={videoElement}
          onTimeUpdate={handleOnTimeUpdate}
          onClick={togglePlay}
        />
        <div
          className="controls"
          // style={
          //   !playerState.isPlaying ? { transform: "translateY(150%)" } : {}
          // }
        >
          <div className="actions">
            <button onClick={togglePlay}>
              <Lottie
                options={playOptions}
                height={25}
                width={25}
                isPaused={isPaused}
                direction={playerState.isPlaying ? 1 : -1}
              />
            </button>
          </div>
          <div style={{ position: "relative" }}>
            <input
              type="range"
              min="0"
              max="100"
              value={playerState.progress}
              onChange={(e) => handleVideoProgress(e)}
              style={{ cursor: "pointer" }}
            />
            <div
              style={{
                width: `${playerState.progress}%`,
                height: "4px",
                position: "absolute",
                top: "50%",
                backgroundColor: "white",
                transform: "translateY(50%)",
                zIndex: "-1",
              }}
            ></div>
          </div>

          <select
            className="velocity"
            value={playerState.speed}
            onChange={(e) => handleVideoSpeed(e)}
          >
            <option value="0.50">0.50x</option>
            <option value="1">1x</option>
            <option value="1.25">1.25x</option>
            <option value="2">2x</option>
          </select>
          <div className="mute__btn">
            <button className="mute-btn" onClick={toggleMute}>
              <Lottie
                options={speakerOptions}
                height={25}
                width={25}
                isPaused={isPaused}
                direction={playerState.isMuted ? 1 : -1}
              />
            </button>
          </div>
          <div className="skip__10s d-flex">
            <button
              onClick={() => {
                setBtnShow({ ...btnShow, backword: true });
                skipVideo(-10);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-skip-backward-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M11.729 5.055a.5.5 0 0 0-.52.038L8.5 7.028V5.5a.5.5 0 0 0-.79-.407L5 7.028V5.5a.5.5 0 0 0-1 0v5a.5.5 0 0 0 1 0V8.972l2.71 1.935a.5.5 0 0 0 .79-.407V8.972l2.71 1.935A.5.5 0 0 0 12 10.5v-5a.5.5 0 0 0-.271-.445z" />
              </svg>
            </button>
            <button
              onClick={() => {
                console.log(`forward`);
                skipVideo(10);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-skip-forward-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M4.271 5.055a.5.5 0 0 1 .52.038L7.5 7.028V5.5a.5.5 0 0 1 .79-.407L11 7.028V5.5a.5.5 0 0 1 1 0v5a.5.5 0 0 1-1 0V8.972l-2.71 1.935a.5.5 0 0 1-.79-.407V8.972l-2.71 1.935A.5.5 0 0 1 4 10.5v-5a.5.5 0 0 1 .271-.445z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
