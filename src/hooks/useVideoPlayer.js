import { useState, useEffect } from "react";
// import { useKeyPress } from "./useKeyPress";

const useVideoPlayer = (videoElement) => {
  // const happyPress = useKeyPress("h");
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    progress: 0,
    soundProgress: 1,
    speed: 1,
    isMuted: false,
    currentTime: 0,
    duration: 0,
  });

  const togglePlay = () => {
    setPlayerState({
      ...playerState,
      isPlaying: !playerState.isPlaying,
    });
  };

  useEffect(() => {
    playerState.isPlaying
      ? videoElement.current.play()
      : videoElement.current.pause();
  }, [playerState.isPlaying, videoElement]);

  const handleOnTimeUpdate = () => {
    const progress =
      (videoElement.current.currentTime / videoElement.current.duration) * 100;
    setPlayerState({
      ...playerState,
      progress,
      currentTime: secondsToTime(videoElement.current.currentTime),
      duration: secondsToTime(videoElement.current.duration),
    });
  };

  const handleVideoProgress = (event) => {
    const manualChange = Number(event.target.value);
    videoElement.current.currentTime =
      (videoElement.current.duration / 100) * manualChange;
    setPlayerState({
      ...playerState,
      progress: manualChange,
    });
  };

  const handleSoundProgress = (event) => {
    const soundChange = Number(event.target.value);
    videoElement.current.volume = soundChange;
    console.log(soundChange);
    if (soundChange === 0) {
      setPlayerState({
        ...playerState,
        isMuted: true,
        soundProgress: soundChange,
      });
    } else {
      setPlayerState({
        ...playerState,
        isMuted: false,
        soundProgress: soundChange,
      });
    }
  };

  const handleVideoSpeed = (event) => {
    const speed = Number(event.target.value);
    videoElement.current.playbackRate = speed;
    setPlayerState({
      ...playerState,
      speed,
    });
  };

  const toggleMute = () => {
    setPlayerState({
      ...playerState,
      isMuted: !playerState.isMuted,
      // soundProgress: !playerState.isMuted ? 0 : videoElement.current.volume,
    });
  };

  const skipVideo = (time = 10) => {
    videoElement.current.currentTime += time;
  };

  function secondsToTime(e) {
    var h = Math.floor(e / 3600)
        .toString()
        .padStart(2, "0"),
      m = Math.floor((e % 3600) / 60)
        .toString()
        .padStart(2, "0"),
      s = Math.floor(e % 60)
        .toString()
        .padStart(2, "0");

    return h === "00" ? m + ":" + s : h + ":" + m + ":" + s;
    //return `${h}:${m}:${s}`;
  }

  const handleKeyPress = (event) => {
    if (event.code === "Space") {
      setPlayerState({
        ...playerState,
        isPlaying: videoElement.current.paused,
        currentTime: secondsToTime(videoElement.current.currentTime),
        duration: secondsToTime(videoElement.current.duration),
      });
    } else if (event.code === "ArrowRight") {
      videoElement.current.currentTime += 10;
    } else if (event.code === "ArrowLeft") {
      videoElement.current.currentTime -= 10;
    } else if (event.code === "KeyM") {
      setPlayerState({
        ...playerState,
        isMuted: videoElement.current.isMuted,
        // isPlaying: videoElement.current.paused,
        soundProgress: videoElement.current.isMuted
          ? 0
          : videoElement.current.volume,
        currentTime: secondsToTime(videoElement.current.currentTime),
        duration: secondsToTime(videoElement.current.duration),
      });
    // } else if (event.code === "ArrowDown") {
    //   videoElement.current.volume >= 0.1
    //     ? (videoElement.current.volume -= 0.1)
    //     : (videoElement.current.volume = 0);
    //   setPlayerState({
    //     soundProgress: videoElement.current.isMuted
    //       ? 0
    //       : videoElement.current.volume,
    //     currentTime: secondsToTime(videoElement.current.currentTime),
    //     duration: secondsToTime(videoElement.current.duration),
    //   });
    } else {
      console.log("other key pressed", event.code);
    }
  };

  // console.log(secondsToTime(7735));

  useEffect(() => {
    playerState.isMuted
      ? (videoElement.current.muted = true)
      : (videoElement.current.muted = false);
  }, [playerState.isMuted, videoElement]);

  return {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleSoundProgress,
    handleVideoSpeed,
    toggleMute,
    skipVideo,
    handleKeyPress,
  };
};

export default useVideoPlayer;
