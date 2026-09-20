import type * as Monaco from "monaco-editor";

const config = {
  comments: {
    lineComment: "//",
    blockComment: ["/*", "*/"],
  },
  brackets: [
    ["{", "}"],
    ["[", "]"],
  ],
  autoClosingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: '"', close: '"' },
    { open: "'", close: "'" },
  ],
  surroundingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: '"', close: '"' },
    { open: "'", close: "'" },
  ],
  folding: {
    markers: {
      start: /^\s*\/\*\s*#region\b/,
      end: /^\s*\/\*\s*#endregion\b/,
    },
  },
};

const tokens = {
  defaultToken: "",
  tokenPostfix: ".json5",

  keywords: ["true", "false", "null", "Infinity", "NaN"],

  symbols: /[=><!~?:&|+\-*\/\^%]+/,

  escapes:
    /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,

  tokenizer: {
    root: [
      // Comments
      [/\/\/.*$/, "comment"],
      [/\/\*/, "comment", "@comment"],

      // Whitespace
      { include: "@whitespace" },

      // Numbers
      [/[+-]?0[xX][0-9a-fA-F]+/, "number.hex"],
      [/[+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?/, "number"],
      [/[+-]?Infinity/, "number"],
      [/NaN/, "number"],

      // Strings
      [/"([^"\\]|\\.)*$/, "string.invalid"],
      [/'([^'\\]|\\.)*$/, "string.invalid"],
      [/"/, "string", "@stringDouble"],
      [/'/, "string", "@stringSingle"],

      // Keywords/booleans
      [/true|false|null/, "keyword"],

      // Unquoted keys (identifier followed by colon)
      [/[a-zA-Z_$][\w$]*(?=\s*:)/, "key"],

      // Delimiters
      [/[{}()\[\]]/, "@brackets"],
      [/[,:]/, "delimiter"],
    ],

    comment: [
      [/[^\/*]+/, "comment"],
      [/\*\//, "comment", "@pop"],
      [/[\/*]/, "comment"],
    ],

    whitespace: [[/[ \t\r\n]+/, ""]],

    stringDouble: [
      [/[^\\"]+/, "string"],
      [/@escapes/, "string.escape"],
      [/\\./, "string.escape.invalid"],
      [/"/, "string", "@pop"],
    ],

    stringSingle: [
      [/[^\\']+/, "string"],
      [/@escapes/, "string.escape"],
      [/\\./, "string.escape.invalid"],
      [/'/, "string", "@pop"],
    ],
  },
};

const completions = {
  provideCompletionItems() {
    const suggestions = [
      {
        label: "true",
        kind: 17, // monaco.languages.CompletionItemKind.Keyword,
        insertText: "true",
      },
      {
        label: "false",
        kind: 17, // monaco.languages.CompletionItemKind.Keyword,
        insertText: "false",
      },
      {
        label: "null",
        kind: 17, // monaco.languages.CompletionItemKind.Keyword,
        insertText: "null",
      },
      {
        label: "Infinity",
        kind: 17, // monaco.languages.CompletionItemKind.Keyword,
        insertText: "Infinity",
      },
      {
        label: "NaN",
        kind: 17, // monaco.languages.CompletionItemKind.Keyword,
        insertText: "NaN",
      },
    ];
    return { suggestions };
  },
};

export { config, tokens, completions };

export default (monaco = (window as any).monaco) => {
  const lang = "json5";
  monaco.languages.register({ id: lang });
  monaco.languages.setLanguageConfiguration(lang, config);
  monaco.languages.setMonarchTokensProvider(lang, tokens);
  monaco.languages.registerCompletionItemProvider(lang, completions);

  // ─── Rename Provider ────────────────────────────────────────────────
  // JSON5 has no lexical scopes, so every occurrence of the key is renamed.
  monaco.languages.registerRenameProvider(lang, {
    provideRenameEdits: function (model, position, newName) {
      const word = model.getWordAtPosition(position);
      if (!word) return null;
      const name = word.word;
      const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const edits: Monaco.editor.IWorkspaceTextEdit[] = [];
      const regex = new RegExp("\\b" + esc(name) + "\\b", "g");
      model.getLinesContent().forEach((line, i) => {
        regex.lastIndex = 0;
        let m;
        while ((m = regex.exec(line)) !== null) {
          edits.push({
            resource: model.uri,
            versionId: model.getVersionId(),
            textEdit: {
              range: new monaco.Range(
                i + 1,
                m.index + 1,
                i + 1,
                m.index + 1 + name.length,
              ),
              text: newName,
            },
          });
        }
      });
      return { edits };
    },
    resolveRenameLocation: function (model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return { rejectReason: "Cannot rename this element." };
      return {
        range: new monaco.Range(
          position.lineNumber,
          word.startColumn,
          position.lineNumber,
          word.endColumn,
        ),
        text: word.word,
      };
    },
  });
};
