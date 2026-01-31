import {
  config,
  tokens,
  completionItemProvider,
  definitionProvider,
} from "./vue/vue-tokens";
import { initializeVueIntelliSense } from "./vue/vue-intellisense";

// Main export
export default {
  config,
  tokens,
  completions: completionItemProvider,
  definitions: definitionProvider,
  init: initializeVueIntelliSense,
};
