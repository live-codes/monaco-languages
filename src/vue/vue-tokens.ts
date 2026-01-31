import type * as Monaco from "monaco-editor";
import type { languages } from "monaco-editor";

const monaco = (window as any).monaco;

export const config: languages.LanguageConfiguration = {
  comments: {
    lineComment: "//",
    blockComment: ["/*", "*/"],
  },
  brackets: [
    ["{", "}"],
    ["[", "]"],
    ["(", ")"],
    // ["<", ">"],
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
  ],
};

export const tokens: languages.IMonarchLanguage = {
  defaultToken: "",
  tokenPostfix: ".vue",

  // Vue-specific keywords
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

  // Vue Composition API
  vueCompositionApi: [
    "ref",
    "reactive",
    "readonly",
    "computed",
    "watch",
    "watchEffect",
    "watchPostEffect",
    "watchSyncEffect",
    "shallowRef",
    "shallowReactive",
    "shallowReadonly",
    "toRef",
    "toRefs",
    "toRaw",
    "markRaw",
    "toValue",
    "unref",
    "isRef",
    "isReactive",
    "isReadonly",
    "isProxy",
    "triggerRef",
    "customRef",
    "effectScope",
    "getCurrentScope",
    "onScopeDispose",
  ],

  // Vue Lifecycle Hooks
  vueLifecycle: [
    "onBeforeMount",
    "onMounted",
    "onBeforeUpdate",
    "onUpdated",
    "onBeforeUnmount",
    "onUnmounted",
    "onErrorCaptured",
    "onRenderTracked",
    "onRenderTriggered",
    "onActivated",
    "onDeactivated",
    "onServerPrefetch",
  ],

  // Vue Script Setup Macros
  vueMacros: [
    "defineProps",
    "defineEmits",
    "defineExpose",
    "defineOptions",
    "defineSlots",
    "defineModel",
    "withDefaults",
  ],

  // Vue Dependency Injection
  vueDI: ["provide", "inject", "hasInjectionContext"],

  // Vue Utilities
  vueUtils: [
    "nextTick",
    "getCurrentInstance",
    "h",
    "createVNode",
    "cloneVNode",
    "mergeProps",
    "isVNode",
    "resolveComponent",
    "resolveDirective",
    "withDirectives",
    "useSlots",
    "useAttrs",
    "useModel",
    "useTemplateRef",
    "useId",
  ],

  // Vue Built-in Components
  vueComponents: [
    "Transition",
    "TransitionGroup",
    "KeepAlive",
    "Teleport",
    "Suspense",
    "component",
    "slot",
    "template",
  ],

  // Vue Directives
  vueDirectives: [
    "v-if",
    "v-else",
    "v-else-if",
    "v-for",
    "v-show",
    "v-bind",
    "v-on",
    "v-model",
    "v-slot",
    "v-pre",
    "v-once",
    "v-memo",
    "v-cloak",
    "v-text",
    "v-html",
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
    "Ref",
    "ComputedRef",
    "Reactive",
    "Component",
    "PropType",
    "EmitsOptions",
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
    root: [
      // SFC blocks
      [
        /<template(\s[^>]*)?>/,
        { token: "tag", next: "@template", nextEmbedded: "text/html" },
      ],
      [/<script\s+setup(\s[^>]*)?>/, { token: "tag", next: "@scriptSetup" }],
      [/<script(\s[^>]*)?>/, { token: "tag", next: "@script" }],
      [
        /<style(\s[^>]*)?>/,
        { token: "tag", next: "@style", nextEmbedded: "text/css" },
      ],
      { include: "@whitespace" },
    ],

    template: [
      [/<\/template\s*>/, { token: "tag", next: "@pop", nextEmbedded: "@pop" }],
      { include: "@templateContent" },
    ],

    templateContent: [
      // Vue directives
      [/v-[\w-]+/, "keyword"],
      [/@[\w-]+/, "keyword"], // Shorthand for v-on
      [/:[\w-]+/, "keyword"], // Shorthand for v-bind
      [/#[\w-]+/, "keyword"], // Shorthand for v-slot

      // Interpolation
      [/\{\{/, { token: "delimiter.bracket", next: "@interpolation" }],

      // HTML comments
      [/<!--/, "comment", "@htmlComment"],

      // HTML tags with Vue components
      [/<\/?([A-Z][\w-]*)/, "type.identifier"], // PascalCase components
      [/<\/?[\w-]+/, "tag"],

      // Attributes
      [/[\w-]+(?==)/, "attribute.name"],
      [/"[^"]*"/, "string"],
      [/'[^']*'/, "string"],

      // Default
      [/[^<{]+/, ""],
    ],

    interpolation: [
      [/\}\}/, { token: "delimiter.bracket", next: "@pop" }],
      { include: "@expression" },
    ],

    expression: [
      { include: "@whitespace" },
      [
        /[a-z_$][\w$]*/,
        {
          cases: {
            "@keywords": "keyword",
            "@vueCompositionApi": "type",
            "@vueLifecycle": "type",
            "@vueMacros": "type",
            "@vueDI": "type",
            "@vueUtils": "type",
            "@constants": "keyword",
            "@default": "identifier",
          },
        },
      ],
      [
        /[A-Z][\w$]*/,
        {
          cases: {
            "@typeKeywords": "type",
            "@vueComponents": "type",
            "@default": "type.identifier",
          },
        },
      ],
      [/@digits/, "number"],
      [/"([^"\\]|\\.)*"/, "string"],
      [/'([^'\\]|\\.)*'/, "string"],
      [/`/, "string", "@templateString"],
      [/[+\-*/%&|^~!=<>?:]+/, "operator"],
      [/[{}()\[\],.]/, "delimiter"],
    ],

    scriptSetup: [
      [/<\/script\s*>/, { token: "tag", next: "@pop" }],
      { include: "@scriptContent" },
    ],

    script: [
      [/<\/script\s*>/, { token: "tag", next: "@pop" }],
      { include: "@scriptContent" },
    ],

    scriptContent: [
      { include: "@whitespace" },

      // Identifiers and keywords
      [
        /[a-z_$][\w$]*/,
        {
          cases: {
            "@keywords": "keyword",
            "@vueCompositionApi": "type",
            "@vueLifecycle": "type",
            "@vueMacros": "type",
            "@vueDI": "type",
            "@vueUtils": "type",
            "@constants": "keyword",
            "@default": "identifier",
          },
        },
      ],

      // Type identifiers
      [
        /[A-Z][\w$]*/,
        {
          cases: {
            "@typeKeywords": "type",
            "@vueComponents": "type",
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

      // Delimiters and operators
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

    style: [
      [/<\/style\s*>/, { token: "tag", next: "@pop", nextEmbedded: "@pop" }],
    ],

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
      { include: "@expression" },
    ],
  },
};

// Completions for Vue
export const completionItemProvider: languages.CompletionItemProvider = {
  triggerCharacters: [".", "<", "@", ":", "#", '"', "'", "/", " ", "v"],

  provideCompletionItems(model, position, context, token) {
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

    // Check context
    const inScriptSetup = isInBlock(model, position, "script", "setup");
    const inScript = isInBlock(model, position, "script");
    const inTemplate = isInBlock(model, position, "template");

    // Vue Composition API suggestions
    if (inScriptSetup || inScript) {
      suggestions.push(...getCompositionApiSuggestions(range));
      suggestions.push(...getLifecycleHookSuggestions(range));
      suggestions.push(...getMacroSuggestions(range));
    }

    // Template directive suggestions
    if (inTemplate) {
      suggestions.push(...getDirectiveSuggestions(range, textBeforeCursor));
      suggestions.push(...getBuiltInComponentSuggestions(range));
    }

    // Snippet suggestions
    suggestions.push(
      ...getSnippetSuggestions(range, inScriptSetup, inTemplate),
    );

    return { suggestions };
  },
};

function isInBlock(
  model: Monaco.editor.ITextModel,
  position: Monaco.Position,
  blockType: string,
  attr?: string,
): boolean {
  const text = model.getValue();
  const offset = model.getOffsetAt(position);

  const blockPattern = attr
    ? new RegExp(`<${blockType}\\s+${attr}[^>]*>`, "gi")
    : new RegExp(`<${blockType}[^>]*>`, "gi");

  const closePattern = new RegExp(`</${blockType}\\s*>`, "gi");

  let lastOpen = -1;
  let lastClose = -1;
  let match: RegExpExecArray | null;

  while ((match = blockPattern.exec(text)) !== null) {
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

function getCompositionApiSuggestions(
  range: Monaco.IRange,
): Monaco.languages.CompletionItem[] {
  return [
    {
      label: "ref",
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: "ref(${1:initialValue})",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Creates a reactive reference",
      detail: "Vue Reactivity",
      range,
    },
    {
      label: "reactive",
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: "reactive(${1:object})",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Creates a reactive object",
      detail: "Vue Reactivity",
      range,
    },
    {
      label: "computed",
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: "computed(() => ${1:expression})",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Creates a computed property",
      detail: "Vue Reactivity",
      range,
    },
    {
      label: "watch",
      kind: monaco.languages.CompletionItemKind.Function,
      insertText:
        "watch(${1:source}, (${2:newValue}, ${3:oldValue}) => {\n\t$0\n})",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Watches a reactive source",
      detail: "Vue Reactivity",
      range,
    },
    {
      label: "watchEffect",
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: "watchEffect(() => {\n\t$0\n})",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation:
        "Immediately runs a function while tracking its dependencies",
      detail: "Vue Reactivity",
      range,
    },
    {
      label: "toRef",
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: "toRef(${1:object}, '${2:key}')",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Creates a ref for a property on a reactive object",
      detail: "Vue Reactivity",
      range,
    },
    {
      label: "toRefs",
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: "toRefs(${1:object})",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Converts a reactive object to plain refs",
      detail: "Vue Reactivity",
      range,
    },
    {
      label: "provide",
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: "provide('${1:key}', ${2:value})",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Provides a value for injection by descendant components",
      detail: "Vue Dependency Injection",
      range,
    },
    {
      label: "inject",
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: "inject('${1:key}'${2:, defaultValue})",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Injects a value provided by an ancestor component",
      detail: "Vue Dependency Injection",
      range,
    },
  ];
}

function getLifecycleHookSuggestions(
  range: Monaco.IRange,
): Monaco.languages.CompletionItem[] {
  const monaco = (window as any).monaco;
  const hooks = [
    { name: "onMounted", doc: "Called when component is mounted" },
    { name: "onUnmounted", doc: "Called when component is unmounted" },
    { name: "onBeforeMount", doc: "Called before component is mounted" },
    { name: "onBeforeUnmount", doc: "Called before component is unmounted" },
    { name: "onUpdated", doc: "Called after component updates" },
    { name: "onBeforeUpdate", doc: "Called before component updates" },
    {
      name: "onErrorCaptured",
      doc: "Called when error is captured from descendant",
    },
    {
      name: "onActivated",
      doc: "Called when kept-alive component is activated",
    },
    {
      name: "onDeactivated",
      doc: "Called when kept-alive component is deactivated",
    },
  ];

  return hooks.map((hook) => ({
    label: hook.name,
    kind: monaco.languages.CompletionItemKind.Function,
    insertText: `${hook.name}(() => {\n\t$0\n})`,
    insertTextRules:
      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: hook.doc,
    detail: "Vue Lifecycle Hook",
    range,
  }));
}

function getMacroSuggestions(
  range: Monaco.IRange,
): Monaco.languages.CompletionItem[] {
  const monaco = (window as any).monaco;
  return [
    {
      label: "defineProps",
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: "defineProps<{\n\t${1:propName}: ${2:string}\n}>()",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Declares component props with TypeScript",
      detail: "Vue Macro",
      range,
    },
    {
      label: "defineEmits",
      kind: monaco.languages.CompletionItemKind.Function,
      insertText:
        "defineEmits<{\n\t${1:eventName}: [${2:payload}: ${3:string}]\n}>()",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Declares component emits with TypeScript",
      detail: "Vue Macro",
      range,
    },
    {
      label: "defineExpose",
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: "defineExpose({\n\t$0\n})",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Exposes public properties on the component instance",
      detail: "Vue Macro",
      range,
    },
    {
      label: "defineModel",
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: "defineModel<${1:string}>(${2})",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Declares a two-way binding prop",
      detail: "Vue Macro (3.4+)",
      range,
    },
    {
      label: "defineOptions",
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: "defineOptions({\n\t${1:name}: '${2:ComponentName}'\n})",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Declares component options",
      detail: "Vue Macro (3.3+)",
      range,
    },
    {
      label: "defineSlots",
      kind: monaco.languages.CompletionItemKind.Function,
      insertText:
        "defineSlots<{\n\t${1:default}(props: { ${2:item}: ${3:any} }): any\n}>()",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Declares slot types",
      detail: "Vue Macro (3.3+)",
      range,
    },
    {
      label: "withDefaults",
      kind: monaco.languages.CompletionItemKind.Function,
      insertText:
        "withDefaults(defineProps<{\n\t${1:propName}?: ${2:string}\n}>(), {\n\t${1:propName}: ${3:'default'}\n})",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Provides default values for props",
      detail: "Vue Macro",
      range,
    },
  ];
}

function getDirectiveSuggestions(
  range: Monaco.IRange,
  textBeforeCursor: string,
): Monaco.languages.CompletionItem[] {
  const monaco = (window as any).monaco;

  // Check if we're typing a directive
  if (!textBeforeCursor.match(/\sv-?$|@$|:$|#$/)) {
    return [];
  }

  return [
    {
      label: "v-if",
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: 'v-if="${1:condition}"',
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Conditionally render element",
      range,
    },
    {
      label: "v-else-if",
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: 'v-else-if="${1:condition}"',
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Else-if block for v-if",
      range,
    },
    {
      label: "v-else",
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: "v-else",
      documentation: "Else block for v-if",
      range,
    },
    {
      label: "v-for",
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: 'v-for="${1:item} in ${2:items}" :key="${1:item}.${3:id}"',
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "List rendering",
      range,
    },
    {
      label: "v-show",
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: 'v-show="${1:condition}"',
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Toggle visibility (uses CSS display)",
      range,
    },
    {
      label: "v-model",
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: 'v-model="${1:value}"',
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Two-way data binding",
      range,
    },
    {
      label: "v-bind",
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: 'v-bind:${1:attr}="${2:value}"',
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Dynamically bind attribute",
      range,
    },
    {
      label: "v-on",
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: 'v-on:${1:event}="${2:handler}"',
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Attach event listener",
      range,
    },
    {
      label: "v-slot",
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: 'v-slot:${1:name}="${2:slotProps}"',
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Named/scoped slot",
      range,
    },
    {
      label: "@click",
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: '@click="${1:handler}"',
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Click event handler",
      range,
    },
    {
      label: "@input",
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: '@input="${1:handler}"',
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Input event handler",
      range,
    },
    {
      label: ":class",
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: ":class=\"{ '${1:class-name}': ${2:condition} }\"",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Dynamic class binding",
      range,
    },
    {
      label: ":style",
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: ':style="{ ${1:property}: ${2:value} }"',
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Dynamic style binding",
      range,
    },
    {
      label: "ref",
      kind: monaco.languages.CompletionItemKind.Keyword,
      insertText: 'ref="${1:refName}"',
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Template reference",
      range,
    },
  ];
}

function getBuiltInComponentSuggestions(
  range: Monaco.IRange,
): Monaco.languages.CompletionItem[] {
  const monaco = (window as any).monaco;
  return [
    {
      label: "Transition",
      kind: monaco.languages.CompletionItemKind.Class,
      insertText: '<Transition name="${1:fade}">\n\t$0\n</Transition>',
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Transition wrapper for single element/component",
      range,
    },
    {
      label: "TransitionGroup",
      kind: monaco.languages.CompletionItemKind.Class,
      insertText:
        '<TransitionGroup name="${1:list}" tag="${2:div}">\n\t$0\n</TransitionGroup>',
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Transition wrapper for list items",
      range,
    },
    {
      label: "KeepAlive",
      kind: monaco.languages.CompletionItemKind.Class,
      insertText: "<KeepAlive>\n\t$0\n</KeepAlive>",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Cache component instance",
      range,
    },
    {
      label: "Teleport",
      kind: monaco.languages.CompletionItemKind.Class,
      insertText: '<Teleport to="${1:body}">\n\t$0\n</Teleport>',
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Render content in another DOM location",
      range,
    },
    {
      label: "Suspense",
      kind: monaco.languages.CompletionItemKind.Class,
      insertText:
        "<Suspense>\n\t<template #default>\n\t\t$0\n\t</template>\n\t<template #fallback>\n\t\tLoading...\n\t</template>\n</Suspense>",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Async component loading state",
      range,
    },
    {
      label: "component",
      kind: monaco.languages.CompletionItemKind.Class,
      insertText: '<component :is="${1:componentName}" />',
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Dynamic component",
      range,
    },
    {
      label: "slot",
      kind: monaco.languages.CompletionItemKind.Class,
      insertText: '<slot${1: name="${2:default}"}>${3}</slot>',
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Content distribution outlet",
      range,
    },
  ];
}

function getSnippetSuggestions(
  range: Monaco.IRange,
  inScriptSetup: boolean,
  inTemplate: boolean,
): Monaco.languages.CompletionItem[] {
  const monaco = (window as any).monaco;
  const suggestions: Monaco.languages.CompletionItem[] = [];

  if (inScriptSetup) {
    suggestions.push(
      {
        label: "vue-ref",
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: "const ${1:name} = ref<${2:string}>(${3:initialValue})",
        insertTextRules:
          monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: "Create a typed ref",
        detail: "Vue Snippet",
        range,
      },
      {
        label: "vue-reactive",
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText:
          "const ${1:state} = reactive({\n\t${2:property}: ${3:value}\n})",
        insertTextRules:
          monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: "Create a reactive object",
        detail: "Vue Snippet",
        range,
      },
      {
        label: "vue-computed",
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText:
          "const ${1:computedName} = computed(() => {\n\treturn ${2:value}\n})",
        insertTextRules:
          monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: "Create a computed property",
        detail: "Vue Snippet",
        range,
      },
      {
        label: "vue-watch",
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText:
          "watch(\n\t() => ${1:source},\n\t(newValue, oldValue) => {\n\t\t$0\n\t}\n)",
        insertTextRules:
          monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: "Create a watcher",
        detail: "Vue Snippet",
        range,
      },
      {
        label: "vue-watcheffect",
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: "watchEffect(() => {\n\t$0\n})",
        insertTextRules:
          monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: "Create a watchEffect",
        detail: "Vue Snippet",
        range,
      },
      {
        label: "vue-props-typed",
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText:
          "interface Props {\n\t${1:propName}: ${2:string}\n}\n\nconst props = defineProps<Props>()",
        insertTextRules:
          monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: "Define typed props with interface",
        detail: "Vue Snippet",
        range,
      },
      {
        label: "vue-emits-typed",
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText:
          "const emit = defineEmits<{\n\t${1:eventName}: [${2:payload}: ${3:string}]\n}>()",
        insertTextRules:
          monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: "Define typed emits",
        detail: "Vue Snippet",
        range,
      },
    );
  }

  // General Vue SFC snippets (work anywhere)
  suggestions.push(
    {
      label: "vue-sfc",
      kind: monaco.languages.CompletionItemKind.Snippet,
      insertText:
        '<script setup lang="ts">\n$0\n</script>\n\n<template>\n\t<div>\n\t\t\n\t</div>\n</template>\n\n<style scoped>\n\n</style>',
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Vue 3 SFC with script setup",
      detail: "Vue Snippet",
      range,
    },
    {
      label: "vue-sfc-ts",
      kind: monaco.languages.CompletionItemKind.Snippet,
      insertText:
        "<script setup lang=\"ts\">\nimport { ref, computed } from 'vue'\n\n$0\n</script>\n\n<template>\n\t<div>\n\t\t\n\t</div>\n</template>\n\n<style scoped>\n\n</style>",
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: "Vue 3 SFC with TypeScript and imports",
      detail: "Vue Snippet",
      range,
    },
  );

  return suggestions;
}

// Definition provider
export const definitionProvider: languages.DefinitionProvider = {
  provideDefinition(model, position) {
    const monaco = (window as any).monaco;
    const definitions: Monaco.languages.Location[] = [];
    const wordAtPosition = model.getWordAtPosition(position);

    if (!wordAtPosition) return null;

    const word = wordAtPosition.word;
    const text = model.getValue();
    const lines = text.split("\n");

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      const line = lines[lineIndex];

      // Match: const/let/var identifier = ref/reactive/computed
      const reactiveMatch = line.match(
        new RegExp(
          `\\b(const|let|var)\\s+(${word})\\s*=\\s*(ref|reactive|computed|shallowRef)`,
        ),
      );
      if (reactiveMatch) {
        const startCol = line.indexOf(reactiveMatch[2]) + 1;
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

      // Match: defineProps/defineEmits result
      const macroMatch = line.match(
        new RegExp(
          `\\b(const)\\s+(${word})\\s*=\\s*(defineProps|defineEmits|defineModel)`,
        ),
      );
      if (macroMatch) {
        const startCol = line.indexOf(macroMatch[2]) + 1;
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

      // Match: function declarations
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

      // Match: arrow function const name = () =>
      const arrowMatch = line.match(
        new RegExp(`\\b(const|let|var)\\s+(${word})\\s*=\\s*(?:async\\s*)?\\(`),
      );
      if (arrowMatch && !reactiveMatch && !macroMatch) {
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

      // Match: interface/type definitions
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

      // Match: import statements
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
    }

    // Remove duplicates
    const uniqueDefinitions = definitions.filter(
      (def, index, self) =>
        index ===
        self.findIndex(
          (d) =>
            d.uri.toString() === def.uri.toString() &&
            d.range.startLineNumber === def.range.startLineNumber &&
            d.range.startColumn === def.range.startColumn,
        ),
    );

    return uniqueDefinitions.length > 0 ? uniqueDefinitions : null;
  },
};

export default {
  config,
  tokens,
  completionItemProvider,
  definitionProvider,
};
