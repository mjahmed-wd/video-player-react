import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Lottie from "react-lottie";
import { useEffect, useRef, useState } from "react";
import video from "./files/video.mp4";
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
    handleSoundProgress,
    handleVideoSpeed,
    toggleMute,
    skipVideo,
    handleKeyPress,
  } = useVideoPlayer(videoElement);

  useEffect(() => {
    window.addEventListener("keydown", (e) => handleKeyPress(e));
    return () => {
      window.removeEventListener("keydown", (e) => handleKeyPress(e));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <div className="video-wrapper">
        <div
          className="center__play__btn"
          onClick={() => {
            togglePlay();
            setBtnShow({ ...btnShow, mainBtn: true });
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
                className="timer__text"
                style={{
                  display:
                    btnShow?.backword || btnShow?.forwards ? "block" : "none",
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
        <div className="controls">
          <div className="actions">
            <button onClick={togglePlay}>
              <Lottie
                options={playOptions}
                height={25}
                width={25}
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
          <span>{playerState?.currentTime + "/" + playerState?.duration}</span>
          <div className="mute__wrapper">
            <button className="mute-btn" onClick={toggleMute}>
              <Lottie
                options={speakerOptions}
                height={25}
                width={25}
                direction={playerState.isMuted ? 1 : -1}
              />
            </button>
            <div style={{ position: "relative" }}>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={playerState.soundProgress}
                onChange={(e) => handleSoundProgress(e)}
                style={{ cursor: "pointer", width: "50px" }}
              />
              <div
                className="sound__progress"
                style={{
                  width: `${playerState.soundProgress * 100}%`,
                }}
              ></div>
            </div>
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
                skipVideo(10);
                setBtnShow({ ...btnShow, forwards: true });
              }}
            >
              <FontAwesomeIcon icon={faRedo} color="white" />
            </button>
          </div>
          <select
            value={playerState.speed}
            onChange={(e) => handleVideoSpeed(e)}
            className="velocity"
            style={{ top: "auto", bottom: "100%" }}
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
