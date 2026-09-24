import { config, tokens } from "./razor/razor-tokens";
import { initializeRazorIntelliSense as initializeIntelliSense } from "./razor/razor-intellisense";

export { config, tokens };

export default (monaco = (window as any).monaco) => {
  const lang = "razor";
  monaco.languages.register({
    id: lang,
    extensions: [".cshtml", ".razor"],
    aliases: ["Razor", "razor", "cshtml"],
  });
  monaco.languages.setLanguageConfiguration(lang, config);
  monaco.languages.setMonarchTokensProvider(lang, tokens);
  return initializeIntelliSense(monaco);
};
