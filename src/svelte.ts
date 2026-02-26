import {
  config,
  tokens,
  completionItemProvider,
  definitionProvider,
} from "./svelte/svelte-tokens";
import { initializeSvelteIntelliSense as initializeIntelliSense } from "./svelte/svelte-intellisense";

export {
  config,
  tokens,
  completionItemProvider as completions,
  definitionProvider as definitions,
};

export default (monaco = (window as any).monaco) => {
  const lang = "svelte";
  monaco.languages.register({ id: lang });
  monaco.languages.setLanguageConfiguration(lang, config);
  monaco.languages.setMonarchTokensProvider(lang, tokens);
  monaco.languages.registerCompletionItemProvider(lang, completionItemProvider);
  monaco.languages.registerDefinitionProvider(lang, definitionProvider);
  return initializeIntelliSense(monaco);
};
