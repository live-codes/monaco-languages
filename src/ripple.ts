import { config, tokens, definitions } from "./ripple/ripple-tokens";
import { initializeRippleIntelliSense as initializeIntelliSense } from "./ripple/ripple-intellisense";

export { config, tokens, definitions };

export default (monaco = (window as any).monaco) => {
  const lang = "ripple";
  monaco.languages.register({ id: lang });
  monaco.languages.setLanguageConfiguration(lang, config);
  monaco.languages.setMonarchTokensProvider(lang, tokens);
  monaco.languages.registerDefinitionProvider(lang, definitions);
  return initializeIntelliSense(monaco);
};
