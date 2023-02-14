import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
export const theme = {
  colors: {
    primary: "#1AB845", //green
    secondary: "#272727", //black
    textPrimary: "#1AB845", //green
    textSecondary: "#272727", //black
    filler: "#F3F3F3", // whitish gray
    success: "#1AB845", //green45BE51 44AC5C 20BF55  27B246
    error: "#EB5757", //red
    warning: "#F2C94C", //yellow
    info: "#2F80ED", //blue
    greyLineOutline: "#C4C4C4", //
    greyIconsDark: "#727272", //
    greyIcons: "#828282", //
    greytext: "#929292", //
    icons: "#FFFFFF", //
    background: "#ffffff",
    backgroundSecondary: "#f8f8f8",
    backgroundEmpty: "#f0f0f0",
    skeletonFlasher: "#fcfcfc",
    whiteIcons: "#FFFFFF", //
    whiteText: "#FFFFFF",
  },
};

export const skeleton = {
  backgroundColor: "#f8f8f8",
  highlightColor: "#ffffff",
  speed: 800,
  direction: "right",
};

export const homeskeleton = {
  backgroundColor: "#f0f0f0",
  highlightColor: "#ffffff",
  speed: 800,
  direction: "right",
};

export const shadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.23,
  shadowRadius: 2.62,

  elevation: 4,
};

export const shadow2 = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.27,
  shadowRadius: 4.65,

  elevation: 6,
};

export const cardWidth = {
  width: wp(84.02), //81.02
};

export const shadowFooterMenu = {
  shadowColor: "#000",
  shadowOffset: {
    width: -10,
    height: -50,
  },
  shadowOpacity: 0.34,
  shadowRadius: 6.27,
  elevation: 10,
};

export const verticalBlankSpace = {
  marginVertical: hp(1),
};
