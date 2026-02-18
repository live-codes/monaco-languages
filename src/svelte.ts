import {
  config,
  tokens,
  completionItemProvider,
  definitionProvider,
} from "./svelte/svelte-tokens";
import { initializeSvelteIntelliSense } from "./svelte/svelte-intellisense";

// Main export
export default {
  config,
  tokens,
  completions: completionItemProvider,
  definitions: definitionProvider,
  init: initializeSvelteIntelliSense,
};
