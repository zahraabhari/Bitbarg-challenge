import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";

// Client-side cache, shared for the whole session of the user in the browser.
// Create rtl cache

const createEmotionCache = createCache({
  key: "muiltr",
});
const createEmotionRTLCache = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});
const createEmotionCachePerLang = (isRtl = true) => {
  return isRtl ? createEmotionRTLCache : createEmotionCache;
};
export default createEmotionCachePerLang;
