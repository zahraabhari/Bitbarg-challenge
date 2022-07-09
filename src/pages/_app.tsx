import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { theme } from "../constants/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CacheProvider
      value={createCache({
        key: "muirtl",
        stylisPlugins: [rtlPlugin],
      })}
    >
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
