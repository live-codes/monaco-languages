import type * as Monaco from "monaco-editor";

export default (monaco: typeof Monaco) => {
  // ========== 1. Register language ==========
  monaco.languages.register({
    id: "rune",
    extensions: [".rn"],
    aliases: ["Rune", "rune"],
  });

  // ========== 2. Monarch tokenizer (syntax highlighting) ==========
  monaco.languages.setMonarchTokensProvider("rune", {
    keywords: [
      "as",
      "async",
      "await",
      "break",
      "const",
      "continue",
      "crate",
      "else",
      "enum",
      "false",
      "fn",
      "for",
      "if",
      "impl",
      "in",
      "is",
      "let",
      "loop",
      "match",
      "mod",
      "move",
      "mut",
      "not",
      "pub",
      "ref",
      "return",
      "self",
      "Self",
      "static",
      "struct",
      "super",
      "true",
      "use",
      "while",
      "yield",
      "select",
      "abstract",
      "become",
      "box",
      "do",
      "final",
      "macro",
      "override",
      "priv",
      "typeof",
      "unsized",
      "virtual",
      "where",
      "nil",
    ],
    typeKeywords: [
      "bool",
      "int",
      "float",
      "char",
      "String",
      "Vec",
      "Object",
      "Option",
      "Result",
      "Some",
      "None",
      "Ok",
      "Err",
      "Future",
      "Stream",
      "Bytes",
      "Unit",
      "Tuple",
      "Type",
      "Hash",
    ],
    operators: [
      "=",
      ">",
      "<",
      "!",
      "~",
      "?",
      ":",
      "==",
      "<=",
      ">=",
      "!=",
      "&&",
      "||",
      "++",
      "--",
      "+",
      "-",
      "*",
      "/",
      "&",
      "|",
      "^",
      "%",
      "<<",
      ">>",
      ">>>",
      "+=",
      "-=",
      "*=",
      "/=",
      "&=",
      "|=",
      "^=",
      "%=",
      "<<=",
      ">>=",
      ">>>=",
    ],
    symbols: /[=><!~?:&|+\-*\/\^%]+/,
    escapes:
      /\\(?:[abfnrtv\\"'`]|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,

    tokenizer: {
      root: [
        // template strings
        [/`/, "string.template", "@templateString"],
        // identifiers & keywords
        [
          /[a-zA-Z_]\w*/,
          {
            cases: {
              "@keywords": "keyword",
              "@typeKeywords": "type.identifier",
              "@default": "identifier",
            },
          },
        ],
        // whitespace & comments
        { include: "@whitespace" },
        // delimiters
        [/[{}()\[\]]/, "@brackets"],
        [/[<>](?!@symbols)/, "@brackets"],
        // operators
        [
          /@symbols/,
          {
            cases: {
              "@operators": "operator",
              "@default": "",
            },
          },
        ],
        // numbers
        [/0[xX][0-9a-fA-F]+/, "number.hex"],
        [/0[oO][0-7]+/, "number.octal"],
        [/0[bB][01]+/, "number.binary"],
        [/\d*\.\d+([eE][\-+]?\d+)?/, "number.float"],
        [/\d+/, "number"],
        // delimiter
        [/[;,.]/, "delimiter"],
        // strings
        [/"([^"\\]|\\.)*$/, "string.invalid"],
        [/"/, "string", "@string"],
        // characters
        [/'[^\\']'/, "string"],
        [/(')(@escapes)(')/, ["string", "string.escape", "string"]],
        [/'/, "string.invalid"],
      ],
      templateString: [
        [
          /\$\{/,
          { token: "delimiter.bracket", next: "@templateStringExpression" },
        ],
        [/`/, "string.template", "@pop"],
        [/[^`$]+/, "string.template"],
        [/./, "string.template"],
      ],
      templateStringExpression: [
        [/\}/, { token: "delimiter.bracket", next: "@pop" }],
        { include: "root" },
      ],
      string: [
        [/[^\\"]+/, "string"],
        [/@escapes/, "string.escape"],
        [/\\./, "string.escape.invalid"],
        [/"/, "string", "@pop"],
      ],
      whitespace: [
        [/[ \t\r\n]+/, "white"],
        [/\/\/.*$/, "comment"],
        [/\/\*/, "comment", "@comment"],
      ],
      comment: [
        [/[^\/*]+/, "comment"],
        [/\/\*/, "comment", "@push"],
        [/\*\//, "comment", "@pop"],
        [/[\/*]/, "comment"],
      ],
    },
  });

  // ========== 3. Language configuration (brackets, comments, auto-closing) ==========
  monaco.languages.setLanguageConfiguration("rune", {
    comments: { lineComment: "//", blockComment: ["/*", "*/"] },
    brackets: [
      ["{", "}"],
      ["[", "]"],
      ["(", ")"],
    ],
    autoClosingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: '"', close: '"', notIn: ["string"] },
      { open: "`", close: "`", notIn: ["string"] },
      { open: "'", close: "'", notIn: ["string", "comment"] },
    ],
    surroundingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: '"', close: '"' },
      { open: "`", close: "`" },
      { open: "'", close: "'" },
    ],
    folding: {
      markers: {
        start: /^\s*\/\/\s*#?region\b/,
        end: /^\s*\/\/\s*#?endregion\b/,
      },
    },
    indentationRules: {
      increaseIndentPattern: /.*\{\s*$/,
      decreaseIndentPattern: /^\s*\}/,
    },
  });

  // ========== 4. Completions (autocomplete + snippets) ==========
  const keywordItems = [
    "fn",
    "pub",
    "async",
    "await",
    "let",
    "const",
    "struct",
    "enum",
    "impl",
    "use",
    "if",
    "else",
    "for",
    "while",
    "loop",
    "match",
    "return",
    "break",
    "continue",
    "yield",
    "select",
    "mod",
    "move",
    "mut",
    "ref",
    "self",
    "Self",
    "super",
    "true",
    "false",
    "nil",
    "in",
    "is",
    "as",
    "not",
    "crate",
    "where",
  ].map((k) => ({
    label: k,
    kind: monaco.languages.CompletionItemKind.Keyword,
    insertText: k,
    detail: "keyword",
  }));

  const builtinFunctions = [
    {
      label: "dbg",
      detail: "fn dbg(..args)",
      doc: "Debug-print values to output.",
      insert: "dbg(${1:value})",
    },
    {
      label: "print",
      detail: "fn print(..args)",
      doc: "Print values to stdout.",
      insert: "print(${1:value})",
    },
    {
      label: "println",
      detail: "fn println(..args)",
      doc: "Print values to stdout with newline.",
      insert: "println(${1:value})",
    },
    {
      label: "panic",
      detail: "fn panic(msg)",
      doc: "Abort execution with a panic message.",
      insert: 'panic("${1:message}")',
    },
    {
      label: "assert",
      detail: "fn assert(condition)",
      doc: "Assert that condition is true.",
      insert: "assert(${1:condition})",
    },
    {
      label: "assert_eq",
      detail: "fn assert_eq(a, b)",
      doc: "Assert two values are equal.",
      insert: "assert_eq(${1:a}, ${2:b})",
    },
    {
      label: "is_readable",
      detail: "fn is_readable(value) -> bool",
      doc: "Check if a value is readable.",
      insert: "is_readable(${1:value})",
    },
    {
      label: "is_writable",
      detail: "fn is_writable(value) -> bool",
      doc: "Check if a value is writable.",
      insert: "is_writable(${1:value})",
    },
    {
      label: "Ok",
      detail: "Ok(value) -> Result",
      doc: "Wrap a value in a successful Result.",
      insert: "Ok(${1:value})",
    },
    {
      label: "Err",
      detail: "Err(value) -> Result",
      doc: "Wrap a value in an error Result.",
      insert: "Err(${1:value})",
    },
    {
      label: "Some",
      detail: "Some(value) -> Option",
      doc: "Wrap a value in Some.",
      insert: "Some(${1:value})",
    },
    {
      label: "None",
      detail: "None -> Option",
      doc: "The None variant of Option.",
      insert: "None",
    },
  ];

  const moduleItems = [
    {
      label: "std::future",
      doc: "Asynchronous future utilities. Includes join, select helpers.",
    },
    { label: "std::io", doc: "I/O utilities for reading and writing." },
    { label: "std::string", doc: "String manipulation utilities." },
    { label: "std::vec", doc: "Dynamic array / vector utilities." },
    { label: "std::object", doc: "Anonymous object type utilities." },
    { label: "std::option", doc: "Option<T> type and helpers." },
    { label: "std::result", doc: "Result<T,E> type and helpers." },
    { label: "std::iter", doc: "Iterator utilities." },
    {
      label: "http",
      doc: "HTTP client module. Use http::get(), http::post(), etc.",
    },
    {
      label: "time",
      doc: "Time utilities. Includes Duration, sleep, Instant.",
    },
    {
      label: "time::Duration",
      doc: "A duration of time. Constructed via from_secs, from_millis.",
    },
    { label: "time::sleep", doc: "Async sleep for a given Duration." },
    { label: "json", doc: "JSON serialization and deserialization." },
    {
      label: "json::from_string",
      doc: "Parse a JSON string into a Rune value.",
    },
    {
      label: "json::to_string",
      doc: "Serialize a Rune value into a JSON string.",
    },
    {
      label: "future::join",
      doc: "Join multiple futures, running them concurrently.",
    },
    { label: "http::get", doc: "Perform an async HTTP GET request." },
    { label: "http::post", doc: "Perform an async HTTP POST request." },
  ];

  const snippetItems = [
    {
      label: "fn main",
      detail: "Main entry point",
      insert: "pub fn main() {\n    $0\n}",
    },
    {
      label: "async fn main",
      detail: "Async main entry point",
      insert: "pub async fn main() {\n    $0\n}",
    },
    {
      label: "async fn",
      detail: "Async function",
      insert: "async fn ${1:name}(${2:params}) {\n    $0\n}",
    },
    {
      label: "struct",
      detail: "Struct declaration",
      insert: "struct ${1:Name} {\n    ${2:field},\n}",
    },
    {
      label: "enum",
      detail: "Enum declaration",
      insert: "enum ${1:Name} {\n    ${2:Variant},\n}",
    },
    {
      label: "impl",
      detail: "Impl block",
      insert:
        "impl ${1:Name} {\n    fn ${2:method}(self) {\n        $0\n    }\n}",
    },
    {
      label: "match",
      detail: "Match expression",
      insert: "match ${1:value} {\n    ${2:pattern} => $0,\n}",
    },
    {
      label: "select",
      detail: "Async select block",
      insert:
        "select {\n    ${1:val} = ${2:future} => ${1:val},\n    _ = ${3:timeout} => Err(${4:Timeout}),\n}",
    },
    {
      label: "for loop",
      detail: "For-in loop",
      insert: "for ${1:item} in ${2:iter} {\n    $0\n}",
    },
    {
      label: "while loop",
      detail: "While loop",
      insert: "while ${1:condition} {\n    $0\n}",
    },
    { label: "loop", detail: "Infinite loop", insert: "loop {\n    $0\n}" },
    {
      label: "if let",
      detail: "If let binding",
      insert: "if let ${1:Some(val)} = ${2:expr} {\n    $0\n}",
    },
    {
      label: "closure",
      detail: "Closure expression",
      insert: "|${1:args}| {\n    $0\n}",
    },
    {
      label: "const block",
      detail: "Const evaluation block",
      insert: "const ${1:NAME} = {\n    $0\n};",
    },
    {
      label: "use",
      detail: "Use / import statement",
      insert: "use ${1:std::future};",
    },
    {
      label: "test fn",
      detail: "Test function",
      insert: "#[test]\nfn ${1:test_name}() {\n    $0\n}",
    },
  ];

  monaco.languages.registerCompletionItemProvider("rune", {
    triggerCharacters: [".", ":", "$"],
    provideCompletionItems: (model, position) => {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };
      const textBefore = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });
      let suggestions = [];

      // Module path completions after ::
      if (textBefore.match(/::\s*$/)) {
        const prefix = textBefore
          .replace(/::(\w*)$/, "")
          .trim()
          .split(/\s+/)
          .pop();
        const matches = moduleItems.filter((m) =>
          m.label.startsWith(prefix + "::"),
        );
        matches.forEach((m) => {
          const part = m.label.substring(m.label.lastIndexOf("::") + 2);
          suggestions.push({
            label: part,
            kind: monaco.languages.CompletionItemKind.Module,
            insertText: part,
            detail: m.label,
            documentation: { value: m.doc },
            range,
          });
        });
      }

      // Keywords
      keywordItems.forEach((k) => suggestions.push({ ...k, range }));

      // Built-in functions
      builtinFunctions.forEach((b) =>
        suggestions.push({
          label: b.label,
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: b.insert,
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          detail: b.detail,
          documentation: { value: b.doc },
          range,
        }),
      );

      // Modules
      moduleItems.forEach((m) =>
        suggestions.push({
          label: m.label,
          kind: monaco.languages.CompletionItemKind.Module,
          insertText: m.label,
          detail: "module",
          documentation: { value: m.doc },
          range,
        }),
      );

      // Snippets
      snippetItems.forEach((s) =>
        suggestions.push({
          label: s.label,
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: s.insert,
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          detail: s.detail,
          documentation: { value: "Snippet: " + s.detail },
          range,
        }),
      );

      return { suggestions };
    },
  });

  // ========== 5. Hover provider ==========
  const hoverData = {
    fn: {
      contents: [
        "**fn** — Declare a function.",
        "```rune\nfn name(params) { body }\n```",
      ],
    },
    async: {
      contents: [
        "**async** — Mark a function, block, or closure as asynchronous.",
        "Rune is async-first: async functions return a `Future`.",
      ],
    },
    await: {
      contents: [
        "**.await** — Await the result of an async operation.",
        "```rune\nlet text = result.text().await?;\n```",
      ],
    },
    let: {
      contents: [
        "**let** — Bind a value to a variable.",
        "```rune\nlet x = 42;\n```",
      ],
    },
    const: {
      contents: [
        "**const** — Compile-time constant evaluation.",
        "Rune supports const blocks for complex compile-time work.",
        "```rune\nconst LIMIT = 0b1 << 10;\n```",
      ],
    },
    struct: {
      contents: [
        "**struct** — Define a named struct type.",
        "```rune\nstruct Timeout;\nstruct Point { x, y }\n```",
      ],
    },
    enum: {
      contents: [
        "**enum** — Define an enumeration type.",
        "```rune\nenum Color { Red, Green, Blue }\n```",
      ],
    },
    impl: {
      contents: [
        "**impl** — Implement methods for a type.",
        "```rune\nimpl Point {\n    fn distance(self) { ... }\n}\n```",
      ],
    },
    pub: {
      contents: [
        "**pub** — Make an item publicly visible.",
        "The `main` function must be `pub` to be callable.",
      ],
    },
    use: {
      contents: [
        "**use** — Import a module or item into scope.",
        "```rune\nuse std::future;\n```",
      ],
    },
    select: {
      contents: [
        "**select** — Async control flow mechanism.",
        "Races multiple futures and returns the first to complete.",
        "```rune\nselect {\n    res = request => res,\n    _ = timeout => Err(Timeout),\n}\n```",
      ],
    },
    match: {
      contents: [
        "**match** — Pattern matching expression.",
        "```rune\nmatch value {\n    Some(x) => x,\n    None => 0,\n}\n```",
      ],
    },
    yield: {
      contents: [
        "**yield** — Yield a value from a generator.",
        "Used inside generator functions / closures.",
      ],
    },
    dbg: {
      contents: [
        "**dbg(..args)** — Debug-print one or more values.",
        "Outputs the debug representation to stdout.",
      ],
    },
    Ok: { contents: ["**Ok(value)** — Construct a successful `Result`."] },
    Err: { contents: ["**Err(value)** — Construct an error `Result`."] },
    Some: {
      contents: ["**Some(value)** — Construct an `Option` with a value."],
    },
    None: { contents: ["**None** — The empty `Option` variant."] },
    true: { contents: ["**true** — Boolean literal `true`."] },
    false: { contents: ["**false** — Boolean literal `false`."] },
    nil: { contents: ["**nil** — The unit / nil value in Rune."] },
    self: {
      contents: [
        "**self** — Reference to the current instance in an impl block.",
      ],
    },
    for: {
      contents: [
        "**for** — Iterate over a collection.",
        "```rune\nfor item in collection { ... }\n```",
      ],
    },
    while: {
      contents: [
        "**while** — Loop while condition is true.",
        "```rune\nwhile x < 10 { x = x + 1; }\n```",
      ],
    },
    loop: { contents: ["**loop** — Loop indefinitely until `break`."] },
    if: {
      contents: [
        "**if** — Conditional branching.",
        "```rune\nif condition { ... } else { ... }\n```",
      ],
    },
    return: { contents: ["**return** — Return a value from a function."] },
    break: { contents: ["**break** — Break out of a loop."] },
    continue: { contents: ["**continue** — Skip to the next loop iteration."] },
    mod: {
      contents: [
        "**mod** — Declare a module.",
        "```rune\nmod my_module { ... }\n```",
      ],
    },
  };

  // Module / API hovers
  const moduleHovers = {
    future: {
      contents: [
        "**std::future** module",
        "Utilities for working with async futures.",
        "`future::join(tuple)` — join multiple futures concurrently.",
      ],
    },
    http: {
      contents: [
        "**http** module",
        "HTTP client for making requests.",
        "`http::get(url)` — async GET request",
        "`http::post(url)` — async POST request",
      ],
    },
    time: {
      contents: [
        "**time** module",
        "Time utilities.",
        "`time::sleep(duration)` — async sleep",
        "`time::Duration::from_secs(n)` — create duration",
      ],
    },
    json: {
      contents: [
        "**json** module",
        "JSON serialization.",
        "`json::from_string(s)` — parse JSON",
        "`json::to_string(v)` — serialize to JSON",
      ],
    },
    Duration: {
      contents: [
        "**time::Duration**",
        "Represents a span of time.",
        "`Duration::from_secs(n)` / `Duration::from_millis(n)`",
      ],
    },
  };

  monaco.languages.registerHoverProvider("rune", {
    provideHover: (model, position) => {
      const word = model.getWordAtPosition(position);
      if (!word) return null;
      const w = word.word;
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };
      if (hoverData[w])
        return {
          range,
          contents: hoverData[w].contents.map((v) => ({ value: v })),
        };
      if (moduleHovers[w])
        return {
          range,
          contents: moduleHovers[w].contents.map((v) => ({ value: v })),
        };

      // Hover user-defined symbols
      const text = model.getValue();
      const fnMatch = new RegExp(
        `(pub\\s+)?(async\\s+)?fn\\s+${w}\\s*\\(([^)]*)\\)`,
      );
      const m = text.match(fnMatch);
      if (m) {
        return {
          range,
          contents: [
            { value: `**fn ${w}**(${m[3]})` },
            { value: `User-defined ${m[2] ? "async " : ""}function` },
          ],
        };
      }
      const structMatch = new RegExp(`struct\\s+${w}`);
      if (structMatch.test(text)) {
        return {
          range,
          contents: [
            { value: `**struct ${w}**` },
            { value: "User-defined struct" },
          ],
        };
      }
      const constMatch = new RegExp(`const\\s+${w}\\s*=`);
      if (constMatch.test(text)) {
        return {
          range,
          contents: [
            { value: `**const ${w}**` },
            { value: "Compile-time constant" },
          ],
        };
      }
      return null;
    },
  });

  // ========== 6. Go-to-definition ==========
  monaco.languages.registerDefinitionProvider("rune", {
    provideDefinition: (model, position) => {
      const word = model.getWordAtPosition(position);
      if (!word) return null;
      const w = word.word;
      const lines = model.getLinesContent();
      const defs = [];
      const patterns = [
        new RegExp(`(pub\\s+)?(async\\s+)?fn\\s+${w}\\b`),
        new RegExp(`struct\\s+${w}\\b`),
        new RegExp(`enum\\s+${w}\\b`),
        new RegExp(`const\\s+${w}\\s*=`),
        new RegExp(`let\\s+${w}\\s*=`),
        new RegExp(`mod\\s+${w}\\b`),
      ];
      lines.forEach((line, idx) => {
        for (const p of patterns) {
          const m = line.match(p);
          if (m) {
            defs.push({
              uri: model.uri,
              range: {
                startLineNumber: idx + 1,
                endLineNumber: idx + 1,
                startColumn: m.index + 1,
                endColumn: m.index + m[0].length + 1,
              },
            });
          }
        }
      });
      return defs;
    },
  });

  // ========== 7. Signature help ==========
  const signatureData = {
    dbg: {
      label: "dbg(..values)",
      doc: "Debug-print one or more values.",
      params: [{ label: "..values", doc: "Values to debug-print" }],
    },
    print: {
      label: "print(..values)",
      doc: "Print values to stdout.",
      params: [{ label: "..values", doc: "Values to print" }],
    },
    println: {
      label: "println(..values)",
      doc: "Print values with newline.",
      params: [{ label: "..values", doc: "Values to print" }],
    },
    assert: {
      label: "assert(condition)",
      doc: "Assert that condition is true.",
      params: [{ label: "condition", doc: "Boolean expression" }],
    },
    assert_eq: {
      label: "assert_eq(a, b)",
      doc: "Assert two values are equal.",
      params: [
        { label: "a", doc: "Left value" },
        { label: "b", doc: "Right value" },
      ],
    },
    Ok: {
      label: "Ok(value)",
      doc: "Wrap value in Ok Result.",
      params: [{ label: "value", doc: "Success value" }],
    },
    Err: {
      label: "Err(value)",
      doc: "Wrap value in Err Result.",
      params: [{ label: "value", doc: "Error value" }],
    },
    Some: {
      label: "Some(value)",
      doc: "Wrap value in Some Option.",
      params: [{ label: "value", doc: "Inner value" }],
    },
    panic: {
      label: "panic(msg)",
      doc: "Abort with panic message.",
      params: [{ label: "msg", doc: "Panic message string" }],
    },
  };

  monaco.languages.registerSignatureHelpProvider("rune", {
    signatureHelpTriggerCharacters: ["(", ","],
    provideSignatureHelp: (model, position) => {
      const textBefore = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });
      const match = textBefore.match(/(\w+)\s*\([^)]*$/);
      if (!match) return null;
      const fn = match[1];
      const sd = signatureData[fn];
      if (!sd) return null;
      const commas = (match[0].match(/,/g) || []).length;
      return {
        value: {
          signatures: [
            {
              label: sd.label,
              documentation: sd.doc,
              parameters: sd.params.map((p) => ({
                label: p.label,
                documentation: p.doc,
              })),
            },
          ],
          activeSignature: 0,
          activeParameter: Math.min(commas, sd.params.length - 1),
        },
        dispose: () => {},
      };
    },
  });

  // ========== 8. Document symbols (outline) ==========
  monaco.languages.registerDocumentSymbolProvider("rune", {
    provideDocumentSymbols: (model) => {
      const symbols = [];
      const lines = model.getLinesContent();
      lines.forEach((line, idx) => {
        let m;
        if ((m = line.match(/(pub\s+)?(async\s+)?fn\s+(\w+)/))) {
          symbols.push({
            name: m[3],
            kind: monaco.languages.SymbolKind.Function,
            range: {
              startLineNumber: idx + 1,
              startColumn: 1,
              endLineNumber: idx + 1,
              endColumn: line.length + 1,
            },
            selectionRange: {
              startLineNumber: idx + 1,
              startColumn: m.index + 1,
              endLineNumber: idx + 1,
              endColumn: m.index + m[0].length + 1,
            },
          });
        }
        if ((m = line.match(/struct\s+(\w+)/))) {
          symbols.push({
            name: m[1],
            kind: monaco.languages.SymbolKind.Struct,
            range: {
              startLineNumber: idx + 1,
              startColumn: 1,
              endLineNumber: idx + 1,
              endColumn: line.length + 1,
            },
            selectionRange: {
              startLineNumber: idx + 1,
              startColumn: m.index + 1,
              endLineNumber: idx + 1,
              endColumn: m.index + m[0].length + 1,
            },
          });
        }
        if ((m = line.match(/enum\s+(\w+)/))) {
          symbols.push({
            name: m[1],
            kind: monaco.languages.SymbolKind.Enum,
            range: {
              startLineNumber: idx + 1,
              startColumn: 1,
              endLineNumber: idx + 1,
              endColumn: line.length + 1,
            },
            selectionRange: {
              startLineNumber: idx + 1,
              startColumn: m.index + 1,
              endLineNumber: idx + 1,
              endColumn: m.index + m[0].length + 1,
            },
          });
        }
        if ((m = line.match(/const\s+(\w+)\s*=/))) {
          symbols.push({
            name: m[1],
            kind: monaco.languages.SymbolKind.Constant,
            range: {
              startLineNumber: idx + 1,
              startColumn: 1,
              endLineNumber: idx + 1,
              endColumn: line.length + 1,
            },
            selectionRange: {
              startLineNumber: idx + 1,
              startColumn: m.index + 1,
              endLineNumber: idx + 1,
              endColumn: m.index + m[0].length + 1,
            },
          });
        }
      });
      return symbols;
    },
  });

  // ========== 9. Diagnostics (basic lint) ==========
  function validateRuneCode(model) {
    const markers = [];
    const lines = model.getLinesContent();
    lines.forEach((line, idx) => {
      // Warn on potential issues
      if (/\bvar\b/.test(line)) {
        const col = line.indexOf("var") + 1;
        markers.push({
          severity: monaco.MarkerSeverity.Error,
          message: "Rune uses `let`, not `var`, for variable bindings.",
          startLineNumber: idx + 1,
          startColumn: col,
          endLineNumber: idx + 1,
          endColumn: col + 3,
        });
      }
      if (/\bfunction\b/.test(line)) {
        const col = line.indexOf("function") + 1;
        markers.push({
          severity: monaco.MarkerSeverity.Error,
          message: "Rune uses `fn`, not `function`, for function declarations.",
          startLineNumber: idx + 1,
          startColumn: col,
          endLineNumber: idx + 1,
          endColumn: col + 8,
        });
      }
      if (/\bconsole\s*\.\s*log\b/.test(line)) {
        const col = line.search(/console\s*\.\s*log/) + 1;
        markers.push({
          severity: monaco.MarkerSeverity.Warning,
          message:
            "Use `dbg()` or `println()` instead of `console.log` in Rune.",
          startLineNumber: idx + 1,
          startColumn: col,
          endLineNumber: idx + 1,
          endColumn: col + 11,
        });
      }
    });
    monaco.editor.setModelMarkers(model, "rune-lint", markers);
  }
};
