import {
  config,
  tokens,
  completionItemProvider,
  definitionProvider,
} from "./vue/vue-tokens";
import { initializeVueIntelliSense as initializeIntelliSense } from "./vue/vue-intellisense";

export default (monaco = (window as any).monaco) => {
  const lang = "vue";
  monaco.languages.register({ id: lang });
  monaco.languages.setLanguageConfiguration(lang, config);
  monaco.languages.setMonarchTokensProvider(lang, tokens);
  monaco.languages.registerCompletionItemProvider(lang, completionItemProvider);
  monaco.languages.registerDefinitionProvider(lang, definitionProvider);
  return initializeIntelliSense(monaco);
};
