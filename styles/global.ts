import { DocumentData } from "firebase/firestore";
import { Appearance } from "react-native";

export const IconRevertDuration = 2000;

const colorScheme = Appearance.getColorScheme();
export const myColors = {
  primaryColor: "#407E87",
  tintPrimaryColor: colorScheme=="dark"? "#93BACC":"#345C6F",
  shadePrimaryColor: colorScheme=="dark"? "#345C6F":"#93BACC",
  secondaryColor:  "#8E7510",
  tintSecondaryColor: colorScheme == "dark" ?  "#F3DE8A":"#6A570C",
  shadeSecondaryColor: colorScheme == "dark" ?  "#6A570C":"#F3DE8A",
  textColor: colorScheme == "dark" ? "#F8F8F8" : "#1B1B1B",
  tintTextColor: colorScheme == "dark" ? "#D8DBE2" : "#313649",
  backgroundColor: colorScheme == "dark" ? "#1B1B1B" : "#F8F8F8",
  tintBackgroundColor: colorScheme == "dark" ? "#313649" : "#D8DBE2",
  redColor: "#EB0510",
  greenColor: "#47A94D",
};

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
  xxxl: 40,
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
  microsoft: "logo-microsoft",
  pinterest: "logo-pinterest",
  playstation: "logo-playstation",
  paypal: "logo-paypal",
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

export type RootStackParamList={
  Onboarding:undefined,
  Login:undefined,
  Signup:undefined,
  Home:undefined,
  ResetPin:{
    username:string,
    email:string,
    code:string
  },
  SetPin:{
    username:string,
    email:string,
  },
  RetrievePin:{
    username:string,
  },
}

export type HomeStackParamList ={
  Home:undefined,
  Settings:undefined,
  AddAccount:undefined,
  ViewAccount:{
    account:DocumentData,
    email:string,
  },
}

