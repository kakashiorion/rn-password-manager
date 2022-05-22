import { Appearance } from "react-native";

export const IconRevertDuration = 2000;

const colorScheme = Appearance.getColorScheme();
export const myColors = {
  primaryColor: "#58A4B0",
  darkColor: colorScheme == "dark" ? "#F9F8F8" : "#1B1B1E",
  lightColor: colorScheme == "dark" ? "#1B1B1E" : "#F9F8F8",
  tertiaryColor: colorScheme == "dark" ? "#373F51" : "#F3DE8A",
  lightGrayColor: colorScheme == "dark" ? "#373F51" : "#D8DBE2",
  darkGrayColor: colorScheme == "dark" ? "#D8DBE2" : "#373F51",
  redColor: "#FB3640",
  pureWhiteColor: "#FFFFFF",
  pureBlackColor: "#000000",
};
const random = "c98af3";
export const myFontFamilies = {
  regular: "NotoRegular",
  bold: "NotoBold",
};

export const myFontSizes = {
  xxs: 10,
  xs: 12,
  small: 14,
  regular: 16,
  large: 20,
  xl: 24,
  xxl: 32,
};

export const myLogos = {
  amazon: "logo-amazon",
  apple: "logo-apple",
  bitcoin: "logo-bitcoin",
  bank: "logo-usd",
  chrome: "logo-chrome",
  dribbble: "logo-dribbble",
  dropbox: "logo-dropbox",
  facebook: "logo-facebook",
  firefox: "logo-firefox",
  flickr: "logo-flickr",
  github: "logo-github",
  google: "logo-google",
  gmail: "logo-google",
  html: "logo-html5",
  instagram: "logo-instagram",
  javascript: "logo-javascript",
  linkedin: "logo-linkedin",
  microsoft: "logo-windows",
  pinterest: "logo-pinterest",
  playstation: "logo-playstation",
  reddit: "logo-reddit",
  skype: "logo-skype",
  slack: "logo-slack",
  snapchat: "logo-snapchat",
  stackoverflow: "logo-stackoverflow",
  steam: "logo-steam",
  tumblr: "logo-tumblr",
  twitch: "logo-twitch",
  twitter: "logo-twitter",
  vimeo: "logo-vimeo",
  whatsapp: "logo-whatsapp",
  wifi: "wifi-logo",
  windows: "logo-windows",
  wordpress: "logo-wordpress",
  xbox: "logo-xbox",
  yahoo: "logo-yahoo",
  youtube: "logo-youtube",
};
