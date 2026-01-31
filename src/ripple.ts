import { config, tokens, definitions } from "./ripple/ripple-tokens";
import { initializeRippleIntelliSense } from "./ripple/ripple-intellisense";

export default {
  config,
  tokens,
  definitions,
  init: initializeRippleIntelliSense,
};
