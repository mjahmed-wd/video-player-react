import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Lottie from "react-lottie";
import { useEffect, useRef, useState } from "react";
import video from "./files/video.mp4";
// import thumbnail from "./files/thumbnail.jpg";
import thumbnail from "./files/Big_Buck_Bunny_loves_Creative_Commons.png";
import useVideoPlayer from "./hooks/useVideoPlayer";
import {
  backwordOptions,
  forwardOptions,
  playOptions,
  speakerOptions,
  playBigOptions,
} from "./common/lottieOptions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo, faRedo } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const videoElement = useRef(null);

  const [btnShow, setBtnShow] = useState({
    mainBtn: false,
    forwards: false,
    backword: false,
  });

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
            setBtnShow({ ...btnShow, mainBtn: true });
          }}
          style={{
            zIndex: 2,
            height: "100%",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          {(btnShow?.backword ||
            btnShow?.forwards ||
            btnShow?.mainBtn ||
            !playerState.isPlaying) && (
            <div className="">
              <Lottie
                options={
                  btnShow?.backword
                    ? backwordOptions
                    : btnShow?.forwards
                    ? forwardOptions
                    : playBigOptions
                }
                height={200}
                width={200}
                // isPaused={isPaused}
                direction={playerState.isPlaying ? 1 : -1}
                eventListeners={[
                  {
                    eventName: "complete",
                    callback: () =>
                      setBtnShow({
                        backword: false,
                        mainBtn: false,
                        forwards: false,
                      }),
                  },
                ]}
              />
              <span
                style={{
                  display:
                    btnShow?.backword || btnShow?.forwards ? "block" : "none",
                  height: "100%",
                  position: "absolute",
                  top: "90%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                  color: "white",
                }}
              >
                10 second
              </span>
            </div>
          )}
        </div>
        <video
          src="https://player.vimeo.com/external/194837908.sd.mp4?s=c350076905b78c67f74d7ee39fdb4fef01d12420&profile_id=164"
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
                // isPaused={isPaused}
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
          <span>{ playerState?.currentTime+ "/"+ playerState?.duration}</span>
          <div className="mute__btn">
            <button className="mute-btn" onClick={toggleMute}>
              <Lottie
                options={speakerOptions}
                height={25}
                width={25}
                // isPaused={isPaused}
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
              <FontAwesomeIcon icon={faUndo} color="white" />
            </button>
            <button
              onClick={() => {
                console.log(`forward`);
                skipVideo(10);
                setBtnShow({ ...btnShow, forwards: true });
              }}
            >
              <FontAwesomeIcon icon={faRedo} color="white" />
            </button>
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
        </div>
      </div>
    </div>
  );
};

export default App;
