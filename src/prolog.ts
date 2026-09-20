import type * as Monaco from "monaco-editor";

const config = {
  comments: {
    lineComment: "%",
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
    { open: "'", close: "'", notIn: ["string", "comment"] },
    { open: '"', close: '"', notIn: ["string", "comment"] },
  ],
  surroundingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: "'", close: "'" },
    { open: '"', close: '"' },
  ],
};

const tokens = {
  defaultToken: "",
  tokenPostfix: ".prolog",

  // Common regular expressions
  atom: /[a-z][a-zA-Z0-9_]*/,
  variable: /[A-Z_][a-zA-Z0-9_]*/,

  builtins: [
    "write",
    "writeln",
    "nl",
    "read",
    "get",
    "put",
    "assert",
    "retract",
    "consult",
    "fail",
    "true",
    "is",
    "mod",
    "rem",
    "not",
    "repeat",
    "!",
    "member",
    "append",
    "length",
    "findall",
    "bagof",
    "setof",
  ],

  tokenizer: {
    root: [
      // --- FIXED COMMENT LOGIC ---
      // Match % followed by anything that is NOT a newline
      [/%[^\n\r]*/, "comment"],

      // Block comments
      [/\/\*/, "comment", "@commentBlock"],

      // Strings (Double quotes)
      [/"/, "string", "@stringDouble"],

      // Quoted Atoms (Single quotes)
      [/'/, "string.atom", "@stringSingle"],

      // Cut operator
      [/!/, "keyword.cut"],

      // Comparison and Math Operators
      [/:-|-->/, "keyword.operator"],
      [/[=><\\+\-\*\/]+/, "operator"],

      // Variables
      [/@variable/, "variable"],

      // Built-in predicates vs Normal Atoms
      [
        /@atom/,
        {
          cases: {
            "@builtins": "predefined",
            "@default": "type.identifier",
          },
        },
      ],

      // Numbers
      [/\d+(\.\d+)?/, "number"],

      // Brackets and punctuation
      [/[[]\{\}\(\)\.,|]/, "delimiter"],

      // Whitespace
      [/\s+/, "white"],
    ],

    commentBlock: [
      [/[^\/*]+/, "comment"],
      [/\*\//, "comment", "@pop"],
      [/[\/*]/, "comment"],
    ],

    stringDouble: [
      [/[^\\"]+/, "string"],
      [/\\./, "string.escape"],
      [/"/, "string", "@pop"],
    ],

    stringSingle: [
      [/[^\\']+/, "string.atom"],
      [/\\./, "string.escape"],
      [/'/, "string.atom", "@pop"],
    ],
  },
};

export { config, tokens };

export default (monaco = (window as any).monaco) => {
  const lang = "prolog";
  monaco.languages.register({ id: lang });
  monaco.languages.setLanguageConfiguration(lang, config);
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

      // A Prolog clause ends with a period at bracket depth 0, and variables are
      // scoped to their clause.
      type Scope = { start: number; end: number; names: Set<string> };
      const scopes: Scope[] = [];
      let depth = 0;
      let start = 0;
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        for (let c = 0; c < line.length; c++) {
          const ch = line[c];
          if (ch === "%") break;
          if (ch === "(" || ch === "[" || ch === "{") depth++;
          else if (ch === ")" || ch === "]" || ch === "}") depth--;
          else if (
            depth === 0 &&
            ch === "." &&
            (c + 1 >= line.length || /\s/.test(line[c + 1]))
          ) {
            scopes.push({ start, end: at(i, c), names: new Set<string>() });
            start = at(i, c + 1);
          }
        }
      }
      scopes.push({
        start,
        end: at(lines.length - 1, lines[lines.length - 1].length),
        names: new Set<string>(),
      });

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

      // A variable (uppercase or `_`) is bound at its first occurrence in the
      // clause; predicate and atom names are global, so they are left alone.
      const declarations: { start: number; end: number; scope?: Scope }[] = [];
      const occurrence = new RegExp("\\b" + esc(name) + "\\b", "g");
      if (/^[A-Z_]/.test(name)) {
        const seen = new Set<Scope>();
        for (let i = 0; i < lines.length; i++) {
          occurrence.lastIndex = 0;
          let m;
          while ((m = occurrence.exec(lines[i])) !== null) {
            const pos = at(i, m.index);
            const scope = enclosing(pos);
            if (!scope || seen.has(scope)) continue;
            seen.add(scope);
            scope.names.add(name);
            declarations.push({ start: pos, end: pos + name.length, scope });
          }
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
      for (let i = 0; i < lines.length; i++) {
        occurrence.lastIndex = 0;
        let m;
        while ((m = occurrence.exec(lines[i])) !== null) {
          const pos = at(i, m.index);
          const scope = resolve(pos, pos + name.length);
          if ((scope ? scope.start : -1) !== targetStart) continue;
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
