import { PaletteOptions } from "@mui/material";

// declare  module (override MUi types)
declare module "@mui/material/styles" {
  interface Palette {
    neutral: Palette["primary"];
  }
  interface PaletteOptions {
    neutral: PaletteOptions["primary"];
  }
  interface PaletteColor {
    lighter?: string;
    min?: string;
    max?: string;
    background?: string;
    darker?: string;
    "900"?: string;
    "800"?: string;
    "700"?: string;
    "600"?: string;
    "500"?: string;
    "400"?: string;
    "300"?: string;
    "200"?: string;
    "100"?: string;
    "50"?: string;
  }
  interface SimplePaletteColorOptions {
    lighter?: string;
    min?: string;
    max?: string;
    background?: string;
    darker?: string;
    "900"?: string;
    "800"?: string;
    "700"?: string;
    "600"?: string;
    "500"?: string;
    "400"?: string;
    "300"?: string;
    "200"?: string;
    "100"?: string;
    "50"?: string;
  }
}

export const palette: PaletteOptions = {
  primary: {
    main: "#4285f2",
    light: "#4285f24d",
    lighter: "#4285f21a",
    contrastText: "#fff",
  },
  secondary: {
    main: "#8b9098",
    light: "#ebedf1",
    contrastText: "#fff",
  },
  neutral: {
    "900": "#212121",
    "800": "#424242",
    "700": "#616161",
    "600": "#757575",
    "500": "#9e9e9e",
    "400": "#bdbdbd",
    "300": "#e0e0e0",
    "200": "#eee",
    "100": "#fafafa",
    "50": "#fafafa",
  },
  success: {
    main: "#30be81",
    light: "#a0d6aeb2",
    lighter: "#a0d6ae1a",
  },
  warning: {
    main: "#fbbd06",
    light: "#fdde82b2",
    lighter: "#fdde821a",
  },
  error: {
    main: "#eb4137",
    light: "#f5a09bb2",
    lighter: "#f5a09b1a",
  },
  info: {
    main: "#4a7f9c",
    light: "#60abd547",
    lighter: "#60abd51a",
  },
  divider: "#e0e0e0",
  background: {
    paper: "#fff",
  },
  text: {
    primary: "#212121",
    secondary: "rgba(0,0,0,.6)",
  },
};
