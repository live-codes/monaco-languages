import type * as Monaco from "monaco-editor";
import type { languages } from "monaco-editor";

const monaco = (window as any).monaco;

// ─── Language Configuration ───────────────────────────────────────────────────

export const config: languages.LanguageConfiguration = {
  comments: {
    lineComment: "//",
    blockComment: ["/*", "*/"],
  },
  brackets: [
    ["{", "}"],
    ["[", "]"],
    ["(", ")"],
  ],
  autoClosingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: '"', close: '"' },
    { open: "'", close: "'" },
    { open: "`", close: "`" },
    { open: "<", close: ">" },
    { open: "<!--", close: "-->" },
  ],
  surroundingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: '"', close: '"' },
    { open: "'", close: "'" },
    { open: "`", close: "`" },
    { open: "<", close: ">" },
  ],
  folding: {
    markers: {
      start: /^\s*<!--\s*#?region\b/,
      end: /^\s*<!--\s*#?endregion\b/,
    },
  },
  wordPattern:
    /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
  onEnterRules: [
    {
      beforeText:
        /<(?!(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr))([_:\w][_:\w-.\d]*)[^/>]*>\s*$/i,
      afterText: /^<\/([_:\w][_:\w-.\d]*)\s*>$/i,
      action: { indentAction: 2 }, // IndentAction.IndentOutdent
    },
    {
      beforeText:
        /<(?!(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr))([_:\w][_:\w-.\d]*)[^/>]*>\s*$/i,
      action: { indentAction: 1 }, // IndentAction.Indent
    },
    {
      // Indent after Svelte block openers: {#if ...}, {#each ...}, etc.
      beforeText: /\{[#:@][^}]*\}\s*$/,
      action: { indentAction: 1 },
    },
  ],
};

// ─── Monarch Token Provider ───────────────────────────────────────────────────

export const tokens: languages.IMonarchLanguage = {
  defaultToken: "",
  tokenPostfix: ".svelte",

  keywords: [
    "break",
    "case",
    "catch",
    "class",
    "const",
    "continue",
    "debugger",
    "default",
    "delete",
    "do",
    "else",
    "export",
    "extends",
    "finally",
    "for",
    "from",
    "function",
    "if",
    "import",
    "in",
    "instanceof",
    "let",
    "new",
    "of",
    "return",
    "static",
    "super",
    "switch",
    "this",
    "throw",
    "try",
    "typeof",
    "var",
    "void",
    "while",
    "with",
    "yield",
    "async",
    "await",
    "as",
    "implements",
    "interface",
    "package",
    "private",
    "protected",
    "public",
    "type",
    "enum",
  ],

  // Svelte 5 runes (matched as $word tokens)
  svelteRunes: [
    "$state",
    "$derived",
    "$effect",
    "$props",
    "$bindable",
    "$inspect",
    "$host",
  ],

  // Svelte lifecycle functions
  svelteLifecycle: [
    "onMount",
    "onDestroy",
    "beforeUpdate",
    "afterUpdate",
    "tick",
    "mount",
    "unmount",
    "untrack",
    "flushSync",
  ],

  // Svelte store utilities
  svelteStoreUtils: ["writable", "readable", "derived", "get"],

  // Svelte motion utilities
  svelteMotion: ["tweened", "spring"],

  // Svelte transition functions
  svelteTransitions: [
    "fade",
    "blur",
    "fly",
    "slide",
    "scale",
    "draw",
    "crossfade",
  ],

  // Svelte animate functions
  svelteAnimations: ["flip"],

  // Svelte template block keywords (used inside {# }, {: }, {/ }, {@ })
  svelteBlockKeywords: [
    "if",
    "else",
    "each",
    "await",
    "then",
    "catch",
    "key",
    "snippet",
    "html",
    "debug",
    "const",
    "render",
  ],

  // Svelte directives (the part before the colon)
  svelteDirectives: [
    "bind",
    "on",
    "use",
    "transition",
    "in",
    "out",
    "animate",
    "class",
    "style",
    "let",
  ],

  typeKeywords: [
    "any",
    "boolean",
    "number",
    "object",
    "string",
    "undefined",
    "never",
    "unknown",
    "void",
    "null",
    "Snippet",
    "Component",
    "EventHandler",
    "Writable",
    "Readable",
    "Tweened",
    "Spring",
  ],

  constants: ["true", "false", "null", "undefined", "NaN", "Infinity"],

  operators: [
    "<=",
    ">=",
    "==",
    "!=",
    "===",
    "!==",
    "=>",
    "+",
    "-",
    "**",
    "*",
    "/",
    "%",
    "++",
    "--",
    "<<",
    "</",
    ">>",
    ">>>",
    "&",
    "|",
    "^",
    "!",
    "~",
    "&&",
    "||",
    "??",
    "?",
    ":",
    "=",
    "+=",
    "-=",
    "*=",
    "**=",
    "/=",
    "%=",
    "<<=",
    ">>=",
    ">>>=",
    "&=",
    "|=",
    "^=",
    "@",
    "...",
    "?.",
    "??=",
    "&&=",
    "||=",
  ],

  escapes:
    /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
  digits: /\d+(_+\d+)*/,

  tokenizer: {
    // ── Root state: the markup / template layer ──────────────────────────────
    root: [
      // Module-level script (Svelte 4: context="module", Svelte 5: module)
      [
        /<script\s+context\s*=\s*["']module["'][^>]*>/,
        { token: "tag", next: "@scriptModule" },
      ],
      [/<script\s+module[^>]*>/, { token: "tag", next: "@scriptModule" }],

      // Instance script
      [/<script(\s[^>]*)?>/, { token: "tag", next: "@script" }],

      // Style block — delegate to embedded CSS
      [
        /<style(\s[^>]*)?>/,
        { token: "tag", next: "@style", nextEmbedded: "text/css" },
      ],

      // Everything else is template / markup
      { include: "@templateContent" },
    ],

    // ── Template / markup ────────────────────────────────────────────────────
    templateContent: [
      // Svelte block openers: {#if …}, {#each …}, {#await …}, {#key …}, {#snippet …}
      [/\{#/, { token: "keyword.control", next: "@svelteBlockOpen" }],

      // Svelte block continuation: {:else}, {:else if …}, {:then …}, {:catch …}
      [/\{:/, { token: "keyword.control", next: "@svelteBlockContinue" }],

      // Svelte block closers: {/if}, {/each}, {/await}, {/key}, {/snippet}
      [/\{\//, { token: "keyword.control", next: "@svelteBlockClose" }],

      // Svelte special tags: {@html …}, {@debug …}, {@const …}, {@render …}
      [/\{@/, { token: "keyword", next: "@svelteSpecialTag" }],

      // Svelte interpolation: {expression}
      [/\{/, { token: "delimiter.bracket", next: "@svelteInterpolation" }],

      // HTML comments
      [/<!--/, "comment", "@htmlComment"],

      // svelte: special elements
      [/<\/?svelte:[\w-]+/, "type.identifier"],

      // PascalCase component tags
      [/<\/?([A-Z][\w]*)/, "type.identifier"],

      // Regular HTML tags
      [/<\/?[\w-]+/, "tag"],
      [/\/?>/, "tag"],

      // Svelte directives: bind:value, on:click|preventDefault, transition:fade, etc.
      [
        /(bind|on|use|transition|in|out|animate|class|style|let)(:)([\w|.-]*)/,
        ["keyword", "delimiter", "attribute.name"],
      ],

      // HTML attributes
      [/[\w-]+(?==)/, "attribute.name"],
      [/=/, "delimiter"],
      [/"[^"]*"/, "string"],
      [/'[^']*'/, "string"],

      // Whitespace & plain text
      [/\s+/, ""],
      [/[^<{}\s]+/, ""],
    ],

    // ── Svelte block open: {#keyword expr} ───────────────────────────────────
    svelteBlockOpen: [
      [/(if|each|await|key|snippet)\b/, "keyword.control"],
      [/as\b/, "keyword"],
      [/\}/, { token: "keyword.control", next: "@pop" }],
      [/\{/, { token: "delimiter.bracket", next: "@nestedBrace" }],
      { include: "@expressionContent" },
    ],

    // ── Svelte block continue: {:keyword expr} ──────────────────────────────
    svelteBlockContinue: [
      [/(else\s+if|else|then|catch)\b/, "keyword.control"],
      [/\}/, { token: "keyword.control", next: "@pop" }],
      [/\{/, { token: "delimiter.bracket", next: "@nestedBrace" }],
      { include: "@expressionContent" },
    ],

    // ── Svelte block close: {/keyword} ───────────────────────────────────────
    svelteBlockClose: [
      [/(if|each|await|key|snippet)\b/, "keyword.control"],
      [/\}/, { token: "keyword.control", next: "@pop" }],
    ],

    // ── Svelte special tag: {@keyword expr} ──────────────────────────────────
    svelteSpecialTag: [
      [/(html|debug|const|render)\b/, "keyword"],
      [/\}/, { token: "keyword", next: "@pop" }],
      [/\{/, { token: "delimiter.bracket", next: "@nestedBrace" }],
      { include: "@expressionContent" },
    ],

    // ── Svelte interpolation: {expr} ─────────────────────────────────────────
    svelteInterpolation: [
      [/\}/, { token: "delimiter.bracket", next: "@pop" }],
      [/\{/, { token: "delimiter.bracket", next: "@nestedBrace" }],
      { include: "@expressionContent" },
    ],

    // ── Nested braces inside expressions (handles { } nesting) ───────────────
    nestedBrace: [
      [/\}/, { token: "delimiter.bracket", next: "@pop" }],
      [/\{/, { token: "delimiter.bracket", next: "@nestedBrace" }],
      { include: "@expressionContent" },
    ],

    // ── Shared expression tokenization ───────────────────────────────────────
    expressionContent: [
      { include: "@whitespace" },

      // Svelte runes: $state, $derived, $effect, $props, $bindable, $inspect, $host
      [/\$(?:state|derived|effect|props|bindable|inspect|host)\b/, "type"],

      // Store auto-subscription ($storeName)
      [/\$[a-zA-Z_]\w*/, "variable"],

      // Identifiers & keywords
      [
        /[a-z_][\w$]*/,
        {
          cases: {
            "@keywords": "keyword",
            "@svelteLifecycle": "type",
            "@svelteStoreUtils": "type",
            "@svelteMotion": "type",
            "@svelteTransitions": "type",
            "@svelteAnimations": "type",
            "@constants": "keyword",
            "@default": "identifier",
          },
        },
      ],

      // PascalCase type / component identifiers
      [
        /[A-Z][\w$]*/,
        {
          cases: {
            "@typeKeywords": "type",
            "@default": "type.identifier",
          },
        },
      ],

      // Numbers
      [/@digits/, "number"],

      // Strings
      [/"([^"\\]|\\.)*"/, "string"],
      [/'([^'\\]|\\.)*'/, "string"],
      [/`/, "string", "@templateString"],

      // Operators & delimiters
      [/[+\-*/%&|^~!=<>?:]+/, "operator"],
      [/[,.()\[\]]/, "delimiter"],
    ],

    // ── Script states ────────────────────────────────────────────────────────
    script: [
      [/<\/script\s*>/, { token: "tag", next: "@pop" }],
      { include: "@scriptContent" },
    ],

    scriptModule: [
      [/<\/script\s*>/, { token: "tag", next: "@pop" }],
      { include: "@scriptContent" },
    ],

    scriptContent: [
      { include: "@whitespace" },

      // Svelte runes
      [/\$(?:state|derived|effect|props|bindable|inspect|host)\b/, "type"],

      // Reactive label  $: statement (Svelte 4)
      [/\$:/, "keyword"],

      // Store auto-subscription
      [/\$[a-zA-Z_]\w*/, "variable"],

      // Identifiers & keywords
      [
        /[a-z_][\w$]*/,
        {
          cases: {
            "@keywords": "keyword",
            "@svelteLifecycle": "type",
            "@svelteStoreUtils": "type",
            "@svelteMotion": "type",
            "@svelteTransitions": "type",
            "@svelteAnimations": "type",
            "@constants": "keyword",
            "@default": "identifier",
          },
        },
      ],

      // PascalCase type / component identifiers
      [
        /[A-Z][\w$]*/,
        {
          cases: {
            "@typeKeywords": "type",
            "@default": "type.identifier",
          },
        },
      ],

      // Numbers
      [/(@digits)[eE]([\-+]?(@digits))?/, "number.float"],
      [/(@digits)\.(@digits)([eE][\-+]?(@digits))?/, "number.float"],
      [/0[xX][0-9a-fA-F]+/, "number.hex"],
      [/0[oO][0-7]+/, "number.octal"],
      [/0[bB][01]+/, "number.binary"],
      [/@digits/, "number"],

      // Delimiters & brackets
      [/[{}()\[\]]/, "@brackets"],
      [/[;,.]/, "delimiter"],
      [/@/, "delimiter"],

      // Operators
      [/=>/, "keyword"],
      [/[<>]=?|[!=]=?=?|&&|\|\||\?\?|\?\.?|::?/, "operator"],
      [/[+\-*\/%&|^~!=]/, "operator"],

      // Strings
      [/"([^"\\]|\\.)*$/, "string.invalid"],
      [/'([^'\\]|\\.)*$/, "string.invalid"],
      [/"/, "string", "@string_double"],
      [/'/, "string", "@string_single"],
      [/`/, "string", "@templateString"],

      // Type annotations
      [/:/, "delimiter", "@typeAnnotation"],
    ],

    typeAnnotation: [
      [/[<>]/, "delimiter.bracket"],
      [/[\[\]]/, "delimiter.bracket"],
      [
        /[a-z_$][\w$]*/,
        {
          cases: {
            "@typeKeywords": "type",
            "@default": "type.identifier",
          },
        },
      ],
      [/[A-Z][\w$]*/, "type.identifier"],
      [/[,|&]/, "operator"],
      [/[=;{(]/, { token: "@rematch", next: "@pop" }],
      { include: "@whitespace" },
    ],

    // ── Style (embedded CSS) ─────────────────────────────────────────────────
    style: [
      [/<\/style\s*>/, { token: "tag", next: "@pop", nextEmbedded: "@pop" }],
    ],

    // ── Shared states ────────────────────────────────────────────────────────
    whitespace: [
      [/[ \t\r\n]+/, ""],
      [/\/\*/, "comment", "@comment"],
      [/\/\/.*$/, "comment"],
    ],

    comment: [
      [/[^\/*]+/, "comment"],
      [/\*\//, "comment", "@pop"],
      [/[\/*]/, "comment"],
    ],

    htmlComment: [
      [/-->/, "comment", "@pop"],
      [/[^-]+/, "comment"],
      [/./, "comment"],
    ],

    string_double: [
      [/[^\\"]+/, "string"],
      [/@escapes/, "string.escape"],
      [/\\./, "string.escape.invalid"],
      [/"/, "string", "@pop"],
    ],

    string_single: [
      [/[^\\']+/, "string"],
      [/@escapes/, "string.escape"],
      [/\\./, "string.escape.invalid"],
      [/'/, "string", "@pop"],
    ],

    templateString: [
      [
        /\$\{/,
        { token: "delimiter.bracket", next: "@templateStringExpression" },
      ],
      [/[^\\`$]+/, "string"],
      [/@escapes/, "string.escape"],
      [/\\./, "string.escape.invalid"],
      [/`/, "string", "@pop"],
    ],

    templateStringExpression: [
      [/\}/, { token: "delimiter.bracket", next: "@pop" }],
      [/\{/, { token: "delimiter.bracket", next: "@nestedBrace" }],
      { include: "@expressionContent" },
    ],
  },
};

// ─── Helper: detect if cursor is inside an import statement ───────────────────

function isInImportStatement(
  model: Monaco.editor.ITextModel,
  position: Monaco.Position,
): boolean {
  // Check current line (covers most single-line imports)
  const currentLine = model.getLineContent(position.lineNumber);
  const textBeforeCursorOnLine = currentLine.substring(0, position.column - 1);

  // If the current line starts with `import` and has no semicolon before the cursor
  if (
    /^\s*import\b/.test(currentLine) &&
    !textBeforeCursorOnLine.includes(";")
  ) {
    return true;
  }

  // For multi-line imports, walk backwards
  for (let lineNum = position.lineNumber - 1; lineNum >= 1; lineNum--) {
    const line = model.getLineContent(lineNum);

    if (/^\s*import\b/.test(line)) {
      // Found an import — check if a semicolon closes it before the cursor
      for (let l = lineNum; l <= position.lineNumber; l++) {
        const content =
          l === position.lineNumber
            ? model.getLineContent(l).substring(0, position.column - 1)
            : model.getLineContent(l);
        if (content.includes(";")) {
          return false;
        }
      }
      return true;
    }

    // Stop if we hit a line that can't be part of a multi-line import
    const trimmed = line.trim();
    if (
      trimmed.length > 0 &&
      !/^[{},*'"\s]/.test(trimmed) &&
      !/^}/.test(trimmed)
    ) {
      break;
    }
  }

  return false;
}

// ─── Completion Item Provider ─────────────────────────────────────────────────

export const completionItemProvider: languages.CompletionItemProvider = {
  triggerCharacters: [".", "<", ":", '"', "'", "/", " ", "{", "#", "@", "$"],

  provideCompletionItems(model, position, _context, _token) {
    const word = model.getWordUntilPosition(position);
    const range: Monaco.IRange = {
      startLineNumber: position.lineNumber,
      endLineNumber: position.lineNumber,
      startColumn: word.startColumn,
      endColumn: word.endColumn,
    };

    const lineContent = model.getLineContent(position.lineNumber);
    const textBeforeCursor = lineContent.substring(0, position.column - 1);

    const suggestions: Monaco.languages.CompletionItem[] = [];

    const inScript = isInBlock(model, position, "script");
    const inMarkup = !inScript && !isInBlock(model, position, "style");
    const inImport = inScript && isInImportStatement(model, position);

    if (inScript) {
      if (!inImport) {
        suggestions.push(...getRuneSuggestions(range));
      }
      suggestions.push(...getLifecycleSuggestions(range));
      suggestions.push(...getStoreUtilSuggestions(range));
    }

    if (inMarkup) {
      suggestions.push(...getBlockSyntaxSuggestions(range, textBeforeCursor));
      suggestions.push(...getDirectiveSuggestions(range, textBeforeCursor));
      suggestions.push(...getSpecialElementSuggestions(range));
    }

    suggestions.push(
      ...getSnippetSuggestions(range, inScript && !inImport, inMarkup),
    );

    return { suggestions };
  },
};

// ─── Helper: detect which SFC region the cursor is in ─────────────────────────

function isInBlock(
  model: Monaco.editor.ITextModel,
  position: Monaco.Position,
  blockType: string,
): boolean {
  const text = model.getValue();
  const offset = model.getOffsetAt(position);

  const openPattern = new RegExp(`<${blockType}[^>]*>`, "gi");
  const closePattern = new RegExp(`</${blockType}\\s*>`, "gi");

  let lastOpen = -1;
  let lastClose = -1;
  let match: RegExpExecArray | null;

  while ((match = openPattern.exec(text)) !== null) {
    if (match.index < offset) {
      lastOpen = match.index;
    }
  }

  while ((match = closePattern.exec(text)) !== null) {
    if (match.index < offset && match.index > lastOpen) {
      lastClose = match.index;
    }
  }

  return lastOpen !== -1 && (lastClose === -1 || lastOpen > lastClose);
}

// ─── Svelte 5 Rune Suggestions ───────────────────────────────────────────────

function getRuneSuggestions(
  range: Monaco.IRange,
): Monaco.languages.CompletionItem[] {
  return [
    {
      label: "$state",
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: "\\$state(${1:initialValue})",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Creates fine-grained reactive state (Svelte 5 rune)",
      detail: "Svelte Rune",
      range,
    },
    {
      label: "$state.raw",
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: "\\$state.raw(${1:initialValue})",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation:
        "Creates reactive state without deep proxy wrapping (Svelte 5 rune)",
      detail: "Svelte Rune",
      range,
    },
    {
      label: "$state.snapshot",
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: "\\$state.snapshot(${1:state})",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Takes a static snapshot of reactive state",
      detail: "Svelte Rune",
      range,
    },
    {
      label: "$derived",
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: "\\$derived(${1:expression})",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation:
        "Creates a derived value from an expression (Svelte 5 rune)",
      detail: "Svelte Rune",
      range,
    },
    {
      label: "$derived.by",
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: "\\$derived.by(() => {\n\treturn ${1:value};\n})",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation:
        "Creates a derived value using a function body (Svelte 5 rune)",
      detail: "Svelte Rune",
      range,
    },
    {
      label: "$effect",
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: "\\$effect(() => {\n\t$0\n});",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation:
        "Runs side effects when dependencies change (Svelte 5 rune)",
      detail: "Svelte Rune",
      range,
    },
    {
      label: "$effect.pre",
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: "\\$effect.pre(() => {\n\t$0\n});",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Runs before DOM updates (Svelte 5 rune)",
      detail: "Svelte Rune",
      range,
    },
    {
      label: "$effect.tracking",
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: "\\$effect.tracking()",
      documentation:
        "Returns whether code is running inside a tracking context",
      detail: "Svelte Rune",
      range,
    },
    {
      label: "$effect.root",
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: "\\$effect.root(() => {\n\t$0\n});",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Creates a non-tracked root effect scope (Svelte 5 rune)",
      detail: "Svelte Rune",
      range,
    },
    {
      label: "$props",
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: "\\$props<${1:Props}>()",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Declares component props (Svelte 5 rune)",
      detail: "Svelte Rune",
      range,
    },
    {
      label: "$bindable",
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: "\\$bindable(${1:fallback})",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation:
        "Marks a prop as bindable with an optional fallback (Svelte 5 rune)",
      detail: "Svelte Rune",
      range,
    },
    {
      label: "$inspect",
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: "\\$inspect(${1:value})",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation:
        "Logs reactive value changes during development (Svelte 5 rune)",
      detail: "Svelte Rune",
      range,
    },
    {
      label: "$host",
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: "\\$host()",
      documentation:
        "Retrieves the host element when compiling as a custom element (Svelte 5 rune)",
      detail: "Svelte Rune",
      range,
    },
  ];
}

// ─── Lifecycle Suggestions ────────────────────────────────────────────────────

function getLifecycleSuggestions(
  range: Monaco.IRange,
): Monaco.languages.CompletionItem[] {
  const hooks = [
    {
      name: "onMount",
      doc: "Runs after the component is first rendered to the DOM. May return a cleanup function.",
    },
    {
      name: "onDestroy",
      doc: "Runs when the component is unmounted from the DOM.",
    },
    {
      name: "beforeUpdate",
      doc: "Runs before the DOM is updated (Svelte 4; use $effect.pre in Svelte 5).",
    },
    {
      name: "afterUpdate",
      doc: "Runs after the DOM is updated (Svelte 4; use $effect in Svelte 5).",
    },
    {
      name: "tick",
      doc: "Returns a promise that resolves after pending state changes are applied.",
    },
  ];

  return hooks.map((hook) => ({
    label: hook.name,
    kind: monaco.languages.CompletionItemKind.Function,
    insertText:
      hook.name === "tick" ? "await tick()" : `${hook.name}(() => {\n\t$0\n});`,
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: hook.doc,
    detail: "Svelte Lifecycle",
    range,
  }));
}

// ─── Store Utility Suggestions ────────────────────────────────────────────────

function getStoreUtilSuggestions(
  range: Monaco.IRange,
): Monaco.languages.CompletionItem[] {
  return [
    {
      label: "writable",
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: "writable(${1:initialValue})",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Creates a writable store",
      detail: "svelte/store",
      range,
    },
    {
      label: "readable",
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: "readable(${1:initialValue}, (${2:set}) => {\n\t$0\n})",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Creates a readable store",
      detail: "svelte/store",
      range,
    },
    {
      label: "derived",
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: "derived(${1:store}, (\\$${2:value}) => ${3:expression})",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Creates a store derived from other store(s)",
      detail: "svelte/store",
      range,
    },
    {
      label: "get",
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: "get(${1:store})",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Reads the current value of a store without subscribing",
      detail: "svelte/store",
      range,
    },
  ];
}

// ─── Template Block Syntax Suggestions ────────────────────────────────────────

function getBlockSyntaxSuggestions(
  range: Monaco.IRange,
  textBeforeCursor: string,
): Monaco.languages.CompletionItem[] {
  // Only suggest after { or {# or {: or {@ or {/
  if (!textBeforeCursor.match(/\{[#:@/]?$/)) {
    return [];
  }

  return [
    {
      label: "{#if}",
      kind: monaco.languages.CompletionItemKind.Snippet,
      insertText: "#if ${1:condition}}\n\t$0\n{/if}",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Conditional rendering block",
      detail: "Svelte Block",
      range,
    },
    {
      label: "{#if} {:else}",
      kind: monaco.languages.CompletionItemKind.Snippet,
      insertText: "#if ${1:condition}}\n\t${2}\n{:else}\n\t$0\n{/if}",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Conditional rendering with else branch",
      detail: "Svelte Block",
      range,
    },
    {
      label: "{#each}",
      kind: monaco.languages.CompletionItemKind.Snippet,
      insertText:
        "#each ${1:items} as ${2:item}, ${3:index} (${2:item}.${4:id})}\n\t$0\n{/each}",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "List rendering block",
      detail: "Svelte Block",
      range,
    },
    {
      label: "{#await}",
      kind: monaco.languages.CompletionItemKind.Snippet,
      insertText:
        "#await ${1:promise}}\n\t<p>Loading...</p>\n{:then ${2:value}}\n\t$0\n{:catch ${3:error}}\n\t<p>{${3:error}.message}</p>\n{/await}",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation:
        "Async rendering block with loading, resolved, and rejected states",
      detail: "Svelte Block",
      range,
    },
    {
      label: "{#key}",
      kind: monaco.languages.CompletionItemKind.Snippet,
      insertText: "#key ${1:expression}}\n\t$0\n{/key}",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Destroys and recreates contents when expression changes",
      detail: "Svelte Block",
      range,
    },
    {
      label: "{#snippet}",
      kind: monaco.languages.CompletionItemKind.Snippet,
      insertText: "#snippet ${1:name}(${2:params})}\n\t$0\n{/snippet}",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Reusable template snippet (Svelte 5)",
      detail: "Svelte Block",
      range,
    },
    {
      label: "{@html}",
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: "@html ${1:expression}}",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Renders raw HTML (be cautious of XSS)",
      detail: "Svelte Tag",
      range,
    },
    {
      label: "{@debug}",
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: "@debug ${1:variable}}",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Pauses the debugger when variables change",
      detail: "Svelte Tag",
      range,
    },
    {
      label: "{@const}",
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: "@const ${1:name} = ${2:expression}}",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Declares a local constant in the template",
      detail: "Svelte Tag",
      range,
    },
    {
      label: "{@render}",
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: "@render ${1:snippet}(${2:args})}",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Renders a snippet (Svelte 5)",
      detail: "Svelte Tag",
      range,
    },
  ];
}

// ─── Directive Suggestions (inside HTML tags in markup) ───────────────────────

function getDirectiveSuggestions(
  range: Monaco.IRange,
  textBeforeCursor: string,
): Monaco.languages.CompletionItem[] {
  if (
    !textBeforeCursor.match(
      /\s(?:bind|on|use|transition|in|out|animate|class|style|let)?:?$/,
    )
  ) {
    return [];
  }

  return [
    {
      label: "bind:value",
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: "bind:${1:value}={${2:variable}}",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Two-way binding to a property",
      range,
    },
    {
      label: "bind:this",
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: "bind:this={${1:element}}",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Binds the DOM element reference to a variable",
      range,
    },
    {
      label: "bind:group",
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: "bind:group={${1:group}}",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Binds radio/checkbox inputs to a shared group value",
      range,
    },
    {
      label: "on:click",
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: "on:${1:click}={${2:handler}}",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Attaches an event listener (Svelte 4 syntax)",
      range,
    },
    {
      label: "on:click|preventDefault",
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: "on:${1:click}|${2:preventDefault}={${3:handler}}",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Event listener with modifier (Svelte 4 syntax)",
      range,
    },
    {
      label: "use:action",
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: "use:${1:action}={${2:params}}",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Attaches an action to an element",
      range,
    },
    {
      label: "transition:fade",
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: "transition:${1:fade}={${2:{ duration: 300 }}}",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Applies a bidirectional transition",
      range,
    },
    {
      label: "in:fly",
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: "in:${1:fly}={${2:{ y: -20, duration: 300 }}}",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Applies an intro-only transition",
      range,
    },
    {
      label: "out:fade",
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: "out:${1:fade}={${2:{ duration: 200 }}}",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Applies an outro-only transition",
      range,
    },
    {
      label: "animate:flip",
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: "animate:${1:flip}={${2:{ duration: 300 }}}",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Applies a FLIP animation when items are reordered",
      range,
    },
    {
      label: "class:active",
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: "class:${1:active}={${2:condition}}",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Toggles a class based on a condition",
      range,
    },
    {
      label: "style:color",
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: "style:${1:color}={${2:value}}",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Sets an inline style property",
      range,
    },
    {
      label: "let:item",
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: "let:${1:item}",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Receives a value from a slot",
      range,
    },
  ];
}

// ─── Special Element Suggestions ──────────────────────────────────────────────

function getSpecialElementSuggestions(
  range: Monaco.IRange,
): Monaco.languages.CompletionItem[] {
  return [
    {
      label: "<svelte:window>",
      kind: monaco.languages.CompletionItemKind.Class,
      insertText: "<svelte:window ${1:on:keydown={handler}} />",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Adds event listeners or bindings to the window object",
      range,
    },
    {
      label: "<svelte:document>",
      kind: monaco.languages.CompletionItemKind.Class,
      insertText: "<svelte:document ${1:on:visibilitychange={handler}} />",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Adds event listeners or bindings to the document object",
      range,
    },
    {
      label: "<svelte:body>",
      kind: monaco.languages.CompletionItemKind.Class,
      insertText: "<svelte:body ${1:on:mouseenter={handler}} />",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Adds event listeners to document.body",
      range,
    },
    {
      label: "<svelte:head>",
      kind: monaco.languages.CompletionItemKind.Class,
      insertText:
        "<svelte:head>\n\t<title>${1:Page Title}</title>\n</svelte:head>",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Inserts elements into the <head> of the document",
      range,
    },
    {
      label: "<svelte:element>",
      kind: monaco.languages.CompletionItemKind.Class,
      insertText:
        "<svelte:element this={${1:tagName}}>\n\t$0\n</svelte:element>",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Renders a dynamic HTML element",
      range,
    },
    {
      label: "<svelte:component>",
      kind: monaco.languages.CompletionItemKind.Class,
      insertText: "<svelte:component this={${1:Component}} />",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Renders a dynamic component",
      range,
    },
    {
      label: "<svelte:self>",
      kind: monaco.languages.CompletionItemKind.Class,
      insertText: "<svelte:self ${1:prop={value}} />",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Recursively renders the current component",
      range,
    },
    {
      label: "<svelte:fragment>",
      kind: monaco.languages.CompletionItemKind.Class,
      insertText:
        '<svelte:fragment${1: slot="${2:name}"}>\n\t$0\n</svelte:fragment>',
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Wraps slot content without creating an extra DOM node",
      range,
    },
    {
      label: "<svelte:options>",
      kind: monaco.languages.CompletionItemKind.Class,
      insertText: "<svelte:options ${1:immutable={true}} />",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Sets per-component compiler options",
      range,
    },
    {
      label: "<svelte:boundary>",
      kind: monaco.languages.CompletionItemKind.Class,
      insertText:
        "<svelte:boundary onerror={${1:handler}}>\n\t$0\n</svelte:boundary>",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation:
        "Error boundary for catching child component errors (Svelte 5)",
      range,
    },
  ];
}

// ─── Snippet Suggestions ──────────────────────────────────────────────────────

function getSnippetSuggestions(
  range: Monaco.IRange,
  inScript: boolean,
  inMarkup: boolean,
): Monaco.languages.CompletionItem[] {
  const suggestions: Monaco.languages.CompletionItem[] = [];

  if (inScript) {
    suggestions.push(
      {
        label: "svelte-state",
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: "let ${1:name} = \\$state(${2:initialValue});",
        insertTextRules:
          monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: "Create a reactive state variable",
        detail: "Svelte 5 Snippet",
        range,
      },
      {
        label: "svelte-derived",
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: "let ${1:name} = \\$derived(${2:expression});",
        insertTextRules:
          monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: "Create a derived reactive value",
        detail: "Svelte 5 Snippet",
        range,
      },
      {
        label: "svelte-effect",
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: "\\$effect(() => {\n\t$0\n});",
        insertTextRules:
          monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: "Create a reactive side-effect",
        detail: "Svelte 5 Snippet",
        range,
      },
      {
        label: "svelte-props-typed",
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText:
          "interface Props {\n\t${1:propName}: ${2:string};\n}\n\nlet { ${1:propName} }: Props = \\$props();",
        insertTextRules:
          monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: "Declare typed component props (Svelte 5)",
        detail: "Svelte 5 Snippet",
        range,
      },
      {
        label: "svelte-store-writable",
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText:
          "import { writable } from 'svelte/store';\n\nconst ${1:name} = writable(${2:initialValue});",
        insertTextRules:
          monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: "Create a writable store with import",
        detail: "Svelte Store Snippet",
        range,
      },
      {
        label: "svelte-reactive-label",
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: "\\$: ${1:derivedValue} = ${2:expression};",
        insertTextRules:
          monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: "Reactive declaration (Svelte 4 syntax)",
        detail: "Svelte 4 Snippet",
        range,
      },
      {
        label: "svelte-onmount",
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText:
          "onMount(() => {\n\t$0\n\n\treturn () => {\n\t\t// cleanup\n\t};\n});",
        insertTextRules:
          monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: "onMount with cleanup",
        detail: "Svelte Snippet",
        range,
      },
    );
  }

  // SFC scaffolding snippets (available everywhere)
  suggestions.push(
    {
      label: "svelte-component",
      kind: monaco.languages.CompletionItemKind.Snippet,
      insertText:
        '<script lang="ts">\n\t$0\n</script>\n\n<div>\n\t\n</div>\n\n<style>\n\n</style>',
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Svelte component scaffold with TypeScript",
      detail: "Svelte Snippet",
      range,
    },
    {
      label: "svelte-component-runes",
      kind: monaco.languages.CompletionItemKind.Snippet,
      insertText:
        '<script lang="ts">\n\tinterface Props {\n\t\t${1:name}: ${2:string};\n\t}\n\n\tlet { ${1:name} }: Props = \\$props();\n\tlet ${3:count} = \\$state(${4:0});\n</script>\n\n<div>\n\t<p>{${1:name}}: {${3:count}}</p>\n</div>\n\n<style>\n\n</style>',
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Svelte 5 component scaffold with runes and typed props",
      detail: "Svelte 5 Snippet",
      range,
    },
    {
      label: "svelte-module-script",
      kind: monaco.languages.CompletionItemKind.Snippet,
      insertText: '<script module lang="ts">\n\t$0\n</script>',
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Module-level script block (Svelte 5)",
      detail: "Svelte Snippet",
      range,
    },
  );

  return suggestions;
}

// ─── Definition Provider ──────────────────────────────────────────────────────

export const definitionProvider: languages.DefinitionProvider = {
  provideDefinition(model, position) {
    const definitions: Monaco.languages.Location[] = [];
    const wordAtPosition = model.getWordAtPosition(position);

    if (!wordAtPosition) return null;

    const word = wordAtPosition.word;
    const text = model.getValue();
    const lines = text.split("\n");

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      const line = lines[lineIndex];

      // Svelte 5 rune state: let name = $state(...)
      const stateMatch = line.match(
        new RegExp(
          `\\b(let|const|var)\\s+(${word})\\s*=\\s*\\$(?:state|derived|bindable)`,
        ),
      );
      if (stateMatch) {
        const startCol = line.indexOf(stateMatch[2]) + 1;
        definitions.push({
          uri: model.uri,
          range: new monaco.Range(
            lineIndex + 1,
            startCol,
            lineIndex + 1,
            startCol + word.length,
          ),
        });
      }

      // Svelte 4 export let: export let name
      const exportLetMatch = line.match(
        new RegExp(`\\bexport\\s+let\\s+(${word})\\b`),
      );
      if (exportLetMatch) {
        const startCol =
          line.indexOf(exportLetMatch[1], line.indexOf("let")) + 1;
        definitions.push({
          uri: model.uri,
          range: new monaco.Range(
            lineIndex + 1,
            startCol,
            lineIndex + 1,
            startCol + word.length,
          ),
        });
      }

      // Svelte 5 $props destructuring: let { name } = $props()
      const propsMatch = line.match(
        /let\s*\{([^}]*)\}\s*(?::\s*\w+)?\s*=\s*\$props/,
      );
      if (propsMatch) {
        const propsContent = propsMatch[1];
        const propNames = propsContent
          .split(",")
          .map((p) => p.trim().split(/[=:]/)[0].trim());
        if (propNames.includes(word)) {
          const startCol = line.indexOf(word, line.indexOf("{")) + 1;
          definitions.push({
            uri: model.uri,
            range: new monaco.Range(
              lineIndex + 1,
              startCol,
              lineIndex + 1,
              startCol + word.length,
            ),
          });
        }
      }

      // const/let/var name = expression
      const varMatch = line.match(
        new RegExp(`\\b(const|let|var)\\s+(${word})\\s*=`),
      );
      if (varMatch && !stateMatch) {
        const startCol = line.indexOf(varMatch[2]) + 1;
        definitions.push({
          uri: model.uri,
          range: new monaco.Range(
            lineIndex + 1,
            startCol,
            lineIndex + 1,
            startCol + word.length,
          ),
        });
      }

      // function declarations
      const functionMatch = line.match(
        new RegExp(`\\b(function)\\s+(${word})\\s*\\(`),
      );
      if (functionMatch) {
        const startCol = line.indexOf(functionMatch[2]) + 1;
        definitions.push({
          uri: model.uri,
          range: new monaco.Range(
            lineIndex + 1,
            startCol,
            lineIndex + 1,
            startCol + word.length,
          ),
        });
      }

      // Arrow functions: const name = () =>
      const arrowMatch = line.match(
        new RegExp(`\\b(const|let|var)\\s+(${word})\\s*=\\s*(?:async\\s*)?\\(`),
      );
      if (arrowMatch && !stateMatch && !varMatch) {
        const startCol = line.indexOf(arrowMatch[2]) + 1;
        definitions.push({
          uri: model.uri,
          range: new monaco.Range(
            lineIndex + 1,
            startCol,
            lineIndex + 1,
            startCol + word.length,
          ),
        });
      }

      // Interface / type definitions
      const typeMatch = line.match(
        new RegExp(`\\b(interface|type)\\s+(${word})\\b`),
      );
      if (typeMatch) {
        const startCol =
          line.indexOf(typeMatch[2], line.indexOf(typeMatch[1])) + 1;
        definitions.push({
          uri: model.uri,
          range: new monaco.Range(
            lineIndex + 1,
            startCol,
            lineIndex + 1,
            startCol + word.length,
          ),
        });
      }

      // Import statements
      const importMatch = line.match(
        new RegExp(`import\\s*\\{[^}]*\\b(${word})\\b[^}]*\\}\\s*from`),
      );
      if (importMatch) {
        const startCol = line.indexOf(word, line.indexOf("{")) + 1;
        definitions.push({
          uri: model.uri,
          range: new monaco.Range(
            lineIndex + 1,
            startCol,
            lineIndex + 1,
            startCol + word.length,
          ),
        });
      }

      // Svelte 4 reactive declaration: $: name = expression
      const reactiveMatch = line.match(new RegExp(`\\$:\\s+(${word})\\s*=`));
      if (reactiveMatch) {
        const startCol = line.indexOf(reactiveMatch[1], line.indexOf("$:")) + 1;
        definitions.push({
          uri: model.uri,
          range: new monaco.Range(
            lineIndex + 1,
            startCol,
            lineIndex + 1,
            startCol + word.length,
          ),
        });
      }
    }

    // Deduplicate
    const unique = definitions.filter(
      (def, index, self) =>
        index ===
        self.findIndex(
          (d) =>
            d.uri.toString() === def.uri.toString() &&
            d.range.startLineNumber === def.range.startLineNumber &&
            d.range.startColumn === def.range.startColumn,
        ),
    );

    return unique.length > 0 ? unique : null;
  },
};

export default {
  config,
  tokens,
  completionItemProvider,
  definitionProvider,
};
