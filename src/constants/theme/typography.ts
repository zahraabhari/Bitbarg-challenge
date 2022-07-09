import {
  TypographyOptions,
  TypographyStyleOptions,
} from "@mui/material/styles/createTypography";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    label: TypographyStyleOptions;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    label?: TypographyStyleOptions;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    label: true;
  }
}

export const fontFamily = {
  fa: "IRANSans",
  en: "Arial",
};
export const typography: TypographyOptions = {
  fontFamily: [
    fontFamily.fa,
    fontFamily.en,
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "-apple-system",
    "sans-serif",
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
  ].join(","),
  h1: {
    fontWeight: 500,
    fontSize: "1.71rem",
    lineHeight: "4rem",
    letterSpacing: -1.5,
    "@media(max-width:768px)": {
      fontWeight: 500,
      fontSize: "1.87rem",
      lineHeight: "2.81rem",
      letterSpacing: -1.5,
    },
  },
  h2: {
    fontWeight: 500,
    fontSize: "1.57rem",
    lineHeight: "3.6rem",
    letterSpacing: -0.5,
    "@media(max-width:768px)": {
      fontWeight: 500,
      fontSize: "1.75rem",
      lineHeight: "2.62rem",
      letterSpacing: -1.5,
    },
  },
  h3: {
    fontWeight: 400,
    fontSize: "1.42rem",
    lineHeight: "3.2rem",
    letterSpacing: 0,
    "@media(max-width:768px)": {
      fontWeight: 400,
      fontSize: "1.62rem",
      lineHeight: "2.43rem",
      letterSpacing: 0,
    },
  },
  h4: {
    fontWeight: 400,
    fontSize: "1.28rem",
    lineHeight: "2.8rem",
    letterSpacing: 0.25,
    "@media(max-width:768px)": {
      fontWeight: 400,
      fontSize: "1.5rem",
      lineHeight: "2.25rem",
      letterSpacing: 0.25,
    },
  },
  h5: {
    fontWeight: 400,
    fontSize: "1.14rem",
    lineHeight: "2.4rem",
    letterSpacing: 0,
    "@media(max-width:768px)": {
      fontWeight: 400,
      fontSize: "1.37rem",
      lineHeight: "2.06rem",
      letterSpacing: 0,
    },
  },
  h6: {
    fontWeight: 500,
    fontSize: "1rem",
    lineHeight: "2rem",
    letterSpacing: 0.15,
    "@media(max-width:768px)": {
      fontWeight: 500,
      fontSize: "1.25rem",
      lineHeight: "1.87rem",
      letterSpacing: 0.15,
    },
  },

  body1: {
    fontWeight: 400,
    fontSize: "0.85rem",
    lineHeight: "1.75rem",
    letterSpacing: 0.5,
    "@media(max-width:768px)": {
      fontWeight: 400,
      fontSize: "1.115rem",
      lineHeight: "1.68rem",
      letterSpacing: 0.5,
    },
  },
  body2: {
    fontWeight: 400,
    fontSize: "0.785rem",
    letterSpacing: 0.5,
    "@media(max-width:768px)": {
      fontWeight: 400,
      fontSize: "1rem",
      letterSpacing: 0.5,
    },
  },

  caption: {
    fontWeight: 400,
    fontSize: "0.71rem",
    lineHeight: "1.2rem",
    letterSpacing: 0.4,
    "@media(max-width:768px)": {
      fontWeight: 400,
      fontSize: "0.87rem",
      lineHeight: "1.31rem",
      letterSpacing: 0.4,
    },
  },
  overline: {
    fontWeight: 400,
    fontSize: "0.64rem",
    lineHeight: "1.2rem",
    letterSpacing: 1.5,
    "@media(max-width:768px)": {
      fontWeight: 400,
      fontSize: "0.87rem",
      lineHeight: "1.31rem",
      letterSpacing: 1.5,
    },
  },
  label: {
    fontWeight: 500,
    fontSize: "0.625rem",
    letterSpacing: 0,
    "@media(max-width:768px)": {
      fontWeight: 500,
      fontSize: "0.75rem",
      letterSpacing: 0,
    },
  },
};
