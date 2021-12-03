// import playBtn from "../files/playBtn.json";
import playBtnBig from "../files/playBtnBig.json";
import playBtn1 from "../files/playBtn1.json";
import forwardedTopAnimation from "../files/forwardedTopAnimation.json";
import backwordTopBtn from "../files/backwordTopBtn.json";
// import sound from "../files/speaker.json";
import sound1 from "../files/speaker1.json";

export const lottieOptions = {
  loop: false,
  autoplay: false,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export const playOptions = {
  ...lottieOptions,
  animationData: playBtn1,
};

export const playBigOptions = {
  ...lottieOptions,
  animationData: playBtnBig,
};

export const forwardOptions = {
  ...lottieOptions,
  animationData: forwardedTopAnimation,
};

export const backwordOptions = {
  ...lottieOptions,
  animationData: backwordTopBtn,
};

export  const speakerOptions = {
    loop: false,
    autoplay: false,
    animationData: sound1,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
