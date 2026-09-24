import type { languages } from "monaco-editor";
import { csharpKeywords, csharpTypeKeywords } from "./razor-csharp";

// ─── Language Configuration ────────────────────────────────────────────────

export const config: languages.LanguageConfiguration = {
  comments: {
    blockComment: ["@*", "*@"],
  },
  brackets: [
    ["<!--", "-->"],
    ["<", ">"],
    ["{", "}"],
    ["[", "]"],
    ["(", ")"],
  ],
  autoClosingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: "'", close: "'" },
    { open: '"', close: '"' },
    { open: "<!--", close: "-->" },
    { open: "@*", close: "*@" },
    { open: "/**", close: " */", notIn: ["string"] },
    { open: "<", close: ">", notIn: ["string"] },
  ],
  autoCloseBefore: ";:.,=}])>@ \n\t",
  surroundingPairs: [
    { open: "'", close: "'" },
    { open: '"', close: '"' },
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: "<", close: ">" },
  ],
  folding: {
    markers: {
      start: /^\s*<!--\s*#?region\b/,
      end: /^\s*<!--\s*#?endregion\b/,
    },
  },
  indentationRules: {
    increaseIndentPattern:
      /<([_:\w][_:\w-.\d]*)(?:(?!\/>|>).)*>\s*$|@\*|\{\s*$/,
    decreaseIndentPattern: /^\s*(<\/|\}|\*@)/,
  },
  wordPattern:
    /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
  onEnterRules: [
    {
      beforeText:
        /<(?!(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr))([_:\w][_:\w-.\d]*)[^/>]*>\s*$/i,
      afterText: /^<\/([_:\w][_:\w-.\d]*)\s*>$/i,
      action: { indentAction: 2 },
    },
    {
      beforeText:
        /<(?!(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr))([_:\w][_:\w-.\d]*)[^/>]*>\s*$/i,
      action: { indentAction: 1 },
    },
    {
      beforeText: /\{\s*$/,
      action: { indentAction: 1 },
    },
  ],
};

// ─── Monarch Tokenizer ─────────────────────────────────────────────────────

const razorDirectiveKeywords =
  /@(?:model|namespace|inject|inherits|implements|layout|page|attribute|typeparam|section|addTagHelper|removeTagHelper|tagHelperPrefix|preservewhitespace|functions|code)\b/;

const razorControlKeywords =
  /@(?:if|else|for|foreach|while|switch|case|default|do|try|catch|finally|lock|await|return|break|continue|using|goto|yield)\b/;

// HTML element names, matched when markup appears inside a C# code block.
// Restricting to real elements keeps C# generics (e.g. List<int>) from being
// mistaken for tags.
const razorInlineTags =
  /<\/?(?:a|abbr|area|article|aside|audio|b|base|blockquote|body|br|button|canvas|caption|code|col|colgroup|dd|del|details|dialog|div|dl|dt|em|embed|fieldset|figcaption|figure|footer|form|h[1-6]|head|header|hr|html|i|iframe|img|input|label|legend|li|link|main|meta|nav|ol|optgroup|option|output|p|picture|pre|progress|script|section|select|slot|small|source|span|strong|style|summary|table|tbody|td|template|textarea|tfoot|th|thead|title|tr|track|u|ul|video|wbr)\b/;

export const tokens: languages.IMonarchLanguage = {
  defaultToken: "",
  tokenPostfix: ".razor",
  ignoreCase: false,
  // Razor directives and implicit expressions are line-scoped; `includeLF`
  // lets their tokenizer states pop on the newline character.
  includeLF: true,

  keywords: csharpKeywords,
  typeKeywords: csharpTypeKeywords,

  operators: [
    "=",
    "==",
    "!=",
    "===",
    "!==",
    "<=",
    ">=",
    "&&",
    "||",
    "??",
    "??=",
    "=>",
    "->",
    "++",
    "--",
    "+=",
    "-=",
    "*=",
    "/=",
    "%=",
    "&=",
    "|=",
    "^=",
    "<<",
    ">>",
    "<<=",
    ">>=",
    "+",
    "-",
    "*",
    "/",
    "%",
    "&",
    "|",
    "^",
    "!",
    "~",
    "?",
    ":",
    ".",
    "<",
    ">",
  ],

  symbols: /[=><!~?:&|+\-*\/^%]+/,
  escapes:
    /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
  digits: /\d+(_+\d+)*/,

  tokenizer: {
    // ── Markup (HTML + Razor transitions) ──────────────────────────────────
    root: [
      // Razor comment
      [/@\*/, "comment", "@razorComment"],
      // Escaped @ (renders a literal @)
      [/@@@@/, "delimiter.razor"],
      // Explicit expression: @( … )
      [/@\(/, { token: "delimiter.razor", next: "@parenExpression" }],
      // Code block: @{ … }
      [/@\{/, { token: "delimiter.razor", next: "@code" }],
      // Control-flow / statement transitions: @if (…) { … }
      [
        razorControlKeywords,
        { token: "keyword.control.razor", next: "@codeHead" },
      ],
      // Directives: @model, @using, @namespace, …
      [
        razorDirectiveKeywords,
        { token: "keyword.directive.razor", next: "@directive" },
      ],
      // Implicit expression: @Model.Name
      [
        /@[A-Za-z_]\w*/,
        { token: "identifier.razor", next: "@implicitExpression" },
      ],

      // A bare brace opens a C# block: the body of a multi-line @if/@foreach/…
      [/^\s*\{/, { token: "delimiter", next: "@code" }],
      [/\{\s*$/, { token: "delimiter", next: "@code" }],

      // HTML
      [/<!DOCTYPE/, "metatag", "@doctype"],
      [/<!--/, "comment", "@htmlComment"],
      [/(<)(script)/, ["delimiter", { token: "tag", next: "@script" }]],
      [/(<)(style)/, ["delimiter", { token: "tag", next: "@style" }]],
      [
        /(<)((?:[\w\-]+:)?[\w\-]+)(\s*)(\/>)/,
        ["delimiter", "tag", "", "delimiter"],
      ],
      [
        /(<\/)((?:[\w\-]+:)?[\w\-]+)/,
        ["delimiter", { token: "tag", next: "@otherTag" }],
      ],
      [
        /(<)((?:[\w\-]+:)?[\w\-]+)/,
        ["delimiter", { token: "tag", next: "@otherTag" }],
      ],
      [/</, "delimiter"],
      [/[^<@{]+/, ""],
      [/\{/, "delimiter"],
      [/@/, "delimiter.razor"],
    ],

    // ── C# code (shared inner rules) ───────────────────────────────────────
    code: [
      [/@\*/, "comment", "@razorComment"],
      [/@@@@/, "delimiter.razor"],
      [/@\(/, { token: "delimiter.razor", next: "@parenExpression" }],
      [
        razorControlKeywords,
        { token: "keyword.control.razor", next: "@codeHead" },
      ],
      [
        razorDirectiveKeywords,
        { token: "keyword.directive.razor", next: "@directive" },
      ],
      [
        /@[A-Za-z_]\w*/,
        { token: "identifier.razor", next: "@implicitExpression" },
      ],
      [/\{/, { token: "delimiter", next: "@nestedBrace" }],
      [/\}/, { token: "delimiter", next: "@pop" }],
      { include: "@codeInner" },
    ],

    nestedBrace: [
      [/@\*/, "comment", "@razorComment"],
      [/@\(/, { token: "delimiter.razor", next: "@parenExpression" }],
      [
        razorControlKeywords,
        { token: "keyword.control.razor", next: "@codeHead" },
      ],
      [
        /@[A-Za-z_]\w*/,
        { token: "identifier.razor", next: "@implicitExpression" },
      ],
      [/\{/, { token: "delimiter", next: "@nestedBrace" }],
      [/\}/, { token: "delimiter", next: "@pop" }],
      { include: "@codeInner" },
    ],

    // Markup that can appear inside a C# code block.
    codeInner: [
      // Inline markup elements: <li>@item</li>. Only real HTML element names
      // are treated as tags so C# generics (List<int>) stay plain code.
      [razorInlineTags, { token: "tag", next: "@otherTag" }],
      { include: "@csharp" },
    ],

    // ── @if (…) { — C# up to the opening brace ─────────────────────────────
    codeHead: [
      [/\{/, { token: "delimiter", next: "@code" }],
      [/\n/, "", "@pop"],
      { include: "@csharp" },
    ],

    // ── Directives: @model Type, @using Namespace, … ───────────────────────
    directive: [
      [/\{/, { token: "delimiter", next: "@code" }],
      [/\(/, { token: "delimiter", next: "@codeHead" }],
      [/\n/, "", "@pop"],
      { include: "@csharp" },
    ],

    // ── @( … ) explicit expression ─────────────────────────────────────────
    parenExpression: [
      [/\(/, { token: "delimiter", next: "@parenNested" }],
      [/\)/, { token: "delimiter", next: "@pop" }],
      { include: "@csharp" },
    ],

    parenNested: [
      [/\(/, { token: "delimiter", next: "@parenNested" }],
      [/\)/, { token: "delimiter", next: "@pop" }],
      { include: "@csharp" },
    ],

    // ── @Model.Name implicit expression ────────────────────────────────────
    implicitExpression: [
      [/[A-Za-z_]\w*/, "identifier.razor"],
      [/\(/, { token: "delimiter", next: "@parenNested" }],
      [/[?.]/, "delimiter.razor"],
      [/\n/, "", "@pop"],
      [/\s/, "", "@pop"],
      [/./, { token: "@rematch", next: "@pop" }],
    ],

    // ── C# tokens ──────────────────────────────────────────────────────────
    csharp: [
      { include: "@whitespace" },
      [/(@digits)[eE]([\-+]?(@digits))?/, "number.float"],
      [/(@digits)\.(@digits)([eE][\-+]?(@digits))?/, "number.float"],
      [/0[xX][0-9a-fA-F]+/, "number.hex"],
      [/0[bB][01]+/, "number.binary"],
      [/@digits/, "number"],
      [/@?"/, "string", "@string_double"],
      [/\$@?"/, "string", "@string_double"],
      [/@\$?"/, "string", "@string_double"],
      [/'/, "string", "@string_single"],
      [/\b[A-Za-z_]\w*\b/, { cases: { "@keywords": "keyword", "@typeKeywords": "type", "@default": "identifier" } }],
      [/[{}()\[\]]/, "@brackets"],
      [/@symbols/, { cases: { "@operators": "operator", "@default": "delimiter" } }],
      [/[;,.]/, "delimiter"],
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

    // ── Comments / markup helpers ──────────────────────────────────────────
    razorComment: [
      [/[^\*]+/, "comment"],
      [/\*@/, "comment", "@pop"],
      [/\*/, "comment"],
    ],

    htmlComment: [
      [/-->/, "comment", "@pop"],
      [/[^-]+/, "comment"],
      [/./, "comment"],
    ],

    doctype: [
      [/[^>]+/, "metatag.content"],
      [/>/, "metatag", "@pop"],
    ],

    otherTag: [
      [/@\*/, "comment", "@razorComment"],
      [/@\(/, { token: "delimiter.razor", next: "@parenExpression" }],
      [
        /@[A-Za-z_]\w*/,
        { token: "identifier.razor", next: "@implicitExpression" },
      ],
      [/\/?>/, "delimiter", "@pop"],
      [/"([^"]*)"/, "attribute.value"],
      [/'([^']*)'/, "attribute.value"],
      [/[\w\-]+/, "attribute.name"],
      [/=/, "delimiter"],
      [/[ \t\r\n]+/],
    ],

    // ── <script> / <style> ─────────────────────────────────────────────────
    script: [
      [/>/, { token: "delimiter", next: "@scriptEmbedded", nextEmbedded: "text/javascript" }],
      [/"([^"]*)"/, "attribute.value"],
      [/'([^']*)'/, "attribute.value"],
      [/[\w\-]+/, "attribute.name"],
      [/=/, "delimiter"],
      [/[ \t\r\n]+/],
    ],

    scriptEmbedded: [
      [/<\/script/, { token: "@rematch", next: "@pop", nextEmbedded: "@pop" }],
      [/[^<]+/, ""],
    ],

    style: [
      [/>/, { token: "delimiter", next: "@styleEmbedded", nextEmbedded: "text/css" }],
      [/"([^"]*)"/, "attribute.value"],
      [/'([^']*)'/, "attribute.value"],
      [/[\w\-]+/, "attribute.name"],
      [/=/, "delimiter"],
      [/[ \t\r\n]+/],
    ],

    styleEmbedded: [
      [/<\/style/, { token: "@rematch", next: "@pop", nextEmbedded: "@pop" }],
      [/[^<]+/, ""],
    ],
  },
};
