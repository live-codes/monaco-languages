import type * as Monaco from "monaco-editor";

const tokens = {
  // Set defaultToken to invalid to see what you do not tokenize yet
  // defaultToken: 'invalid',

  keywords: [
    "import",
    "export",
    "from",
    "as",
    "fn",
    "await",
    "[await]",
    "if",
    "else",
    "true",
    "false",
    "and",
    "or",
    "not",
    "type",
    "list",
  ],

  typeKeywords: ["Number", "String", "Function", "Array"],

  operators: [
    ">",
    "<",
    ":",
    "=",
    "<=",
    ">=",
    "!=",
    "+",
    "-",
    "*",
    "/",
    "//",
    "|",
    "**",
    "%",
  ],

  // we include these common regular expressions
  symbols: /[=><!~?:&|+\-*\/\^%]+/,

  // C# style strings
  escapes:
    /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,

  // The main tokenizer for our languages
  tokenizer: {
    root: [
      [/fn/, { token: "keyword", next: "@function" }],
      [/->/, { token: "operators", next: "@chain" }],

      // identifiers and keywords
      [
        /[a-zA-Z_$][\w$]*/i,
        {
          cases: {
            "@typeKeywords": "keyword",
            "@keywords": "keyword",
            "@default": "identifier",
          },
        },
      ],

      // whitespace
      { include: "@whitespace" },

      // delimiters and operators
      [/[{}()\[\]]/, "@brackets"],
      [/[<>](?!@symbols)/, "@brackets"],
      [
        /@symbols/,
        {
          cases: {
            "@operators": "operator",
            "@default": "",
          },
        },
      ],

      // @ annotations.
      // As an example, we emit a debugging log message on these tokens.
      // Note: message are suppressed during the first load -- change some lines to see them.
      [/@\s*[a-zA-Z_\$][\w\$]*/, { token: "annotation" }],

      // numbers
      [/\d*\.\d+([eE][\-+]?\d+)?/, "number.float"],
      [/0[xX][0-9a-fA-F]+/, "number.hex"],
      [/\d+/, "number"],

      // delimiter: after number because of .\d floats
      [/[;,.]/, "delimiter"],

      // strings
      [/"([^"\\]|\\.)*$/, "string.invalid"], // non-terminated string
      [/"/, { token: "string.quote", bracket: "@open", next: "@string" }],

      // single-quote strings
      [/"([^'\\]|\\.)*$/, "string.invalid"], // non-terminated string
      [/'/, { token: "string.quote", bracket: "@open", next: "@stringSingle" }],
    ],

    // eslint-disable-next-line id-blacklist
    string: [
      [/[^\\"]+/, "string"],
      [/@escapes/, "string.escape"],
      [/\\./, "string.escape.invalid"],
      [/"/, { token: "string.quote", bracket: "@close", next: "@pop" }],
    ],

    stringSingle: [
      [/[^\\']+/, "string"],
      [/@escapes/, "string.escape"],
      [/\\./, "string.escape.invalid"],
      [/'/, { token: "string.quote", bracket: "@close", next: "@pop" }],
    ],

    whitespace: [
      [/[ \t\r\n]+/, "white"],
      [/--.*$/, "comment"],
    ],

    function: [[/[a-zA-Z0-9_]+/, { token: "variable", next: "@pop" }]],

    chain: [
      [/\*/, "operators"],
      [/\[?await\]?/, "keyword"],
      [/[a-zA-Z]+/, { token: "variable", next: "@pop" }],
    ],
  },
};

export { tokens };

export default (monaco = (window as any).monaco) => {
  const lang = "clio";
  monaco.languages.register({ id: lang });
  monaco.languages.setMonarchTokensProvider(lang, tokens);

  // ─── Rename Provider (scope-aware) ──────────────────────────────────
  monaco.languages.registerRenameProvider(lang, {
    provideRenameEdits: function (model, position, newName) {
      const word = model.getWordAtPosition(position);
      if (!word) return null;
      const name = word.word;

      const lines = model.getLinesContent();
      const lineStart: number[] = [];
      let size = 0;
      for (let i = 0; i < lines.length; i++) {
        lineStart.push(size);
        size += lines[i].length + 1;
      }
      const at = (line: number, col: number) => lineStart[line] + col;
      const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      // Clio is indentation based: a line whose next line is indented further
      // heads a block that runs until the indentation drops back.
      type Scope = {
        start: number;
        end: number;
        line: number;
        names: Set<string>;
      };
      const indentOf = (line: string) => {
        let n = 0;
        while (n < line.length && (line[n] === " " || line[n] === "\t")) n++;
        return n;
      };
      const blank = (i: number) => lines[i] === undefined || lines[i].trim() === "";
      const scopes: Scope[] = [];
      for (let i = 0; i < lines.length; i++) {
        if (blank(i)) continue;
        const indent = indentOf(lines[i]);
        let j = i + 1;
        while (j < lines.length && blank(j)) j++;
        if (j >= lines.length || indentOf(lines[j]) <= indent) continue;
        let k = j;
        for (let m = j + 1; m < lines.length; m++) {
          if (blank(m)) continue;
          if (indentOf(lines[m]) > indent) k = m;
          else break;
        }
        scopes.push({
          start: at(j, 0),
          end: at(k, lines[k].length),
          line: j,
          names: new Set<string>(),
        });
      }

      // Innermost scope containing `offset` (geometry only).
      const enclosing = (offset: number) => {
        let found: Scope | undefined;
        for (const scope of scopes) {
          if (scope.start <= offset && offset <= scope.end) {
            if (!found || scope.start > found.start) found = scope;
          }
        }
        return found;
      };
      // Innermost enclosing scope that declares `name` — the name's binding.
      const declaring = (offset: number) => {
        let found: Scope | undefined;
        for (const scope of scopes) {
          if (
            scope.start <= offset &&
            offset <= scope.end &&
            scope.names.has(name)
          ) {
            if (!found || scope.start > found.start) found = scope;
          }
        }
        return found;
      };

      // Local declarations: let/var/const bindings.
      const declaration = new RegExp(
        "\\b(?:let|var|const)\\s+" + esc(name) + "\\b",
        "g",
      );
      const declarations: { start: number; end: number; scope?: Scope }[] = [];
      for (let i = 0; i < lines.length; i++) {
        declaration.lastIndex = 0;
        let m;
        while ((m = declaration.exec(lines[i])) !== null) {
          const owner = enclosing(at(i, m.index));
          if (owner) owner.names.add(name);
          declarations.push({
            start: at(i, m.index),
            end: at(i, m.index) + m[0].length,
            scope: owner,
          });
        }
      }

      // Resolve a name span to its binding: declarations use their own scope,
      // plain references the innermost enclosing declaration of the name.
      const resolve = (start: number, end: number) => {
        for (const decl of declarations) {
          if (decl.start <= start && end <= decl.end) return decl.scope;
        }
        return declaring(start);
      };

      // Only rename occurrences resolving to the same binding as the cursor.
      const cursorLine = position.lineNumber - 1;
      const cursorScope = resolve(
        at(cursorLine, word.startColumn - 1),
        at(cursorLine, word.endColumn - 1),
      );
      const targetStart = cursorScope ? cursorScope.start : -1;
      const edits: Monaco.editor.IWorkspaceTextEdit[] = [];
      const occurrence = new RegExp("\\b" + esc(name) + "\\b", "g");
      for (let i = 0; i < lines.length; i++) {
        occurrence.lastIndex = 0;
        let m;
        while ((m = occurrence.exec(lines[i])) !== null) {
          const start = at(i, m.index);
          const scope = resolve(start, start + name.length);
          if ((scope ? scope.start : -1) !== targetStart) continue;
          if (targetStart !== -1) {
            const before = lines[i].slice(0, m.index).replace(/\s+$/, "");
            if (before.endsWith(".")) continue;
          }
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
      }
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
