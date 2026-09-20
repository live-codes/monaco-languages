import type * as Monaco from "monaco-editor";

const config = {
  comments: {
    blockComment: ["<!--", "-->"],
  },
  brackets: [
    ["---", "---"],
    ["<!--", "-->"],
    ["<", ">"],
    ["{", "}"],
    ["(", ")"],
  ],
  autoClosingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: "'", close: "'" },
    { open: '"', close: '"' },
    { open: "<!--", close: "-->", notIn: ["comment", "string"] },
    { open: "/**", close: " */", notIn: ["string"] },
    { open: "<", close: ">", notIn: ["string"] },
  ],
  autoCloseBefore: ";:.,=}])>` \n\t",
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
      start: /^\\s*<!--\\s*#region\\b.*-->/,
      end: /^\\s*<!--\\s*#endregion\\b.*-->/,
    },
  },
};

const tokens = {
  defaultToken: "",
  tokenPostfix: ".astro",
  ignoreCase: false,

  // non matched elements
  empty: [
    "area",
    "base",
    "basefont",
    "br",
    "col",
    "frame",
    "hr",
    "img",
    "input",
    "isindex",
    "link",
    "meta",
    "param",
  ],

  // The main tokenizer for our languages
  tokenizer: {
    root: [
      [/<!DOCTYPE/, "metatag", "@doctype"],
      [/<!--/, "comment", "@comment"],
      [/^---/, "comment", "@frontmatter"],
      [/{/, "", "@expression"],
      [
        /(<)((?:[\w\-]+:)?[\w\-]+)(\s*)(\/>)/,
        ["delimiter", "tag", "", "delimiter"],
      ],
      [/(<)(script)/, ["delimiter", { token: "tag", next: "@script" }]],
      [/(<)(style)/, ["delimiter", { token: "tag", next: "@style" }]],
      [
        /(<)((?:[\w\-]+:)?[\w\-]+)/,
        ["delimiter", { token: "tag", next: "@otherTag" }],
      ],
      [
        /(<\/)((?:[\w\-]+:)?[\w\-]+)/,
        ["delimiter", { token: "tag", next: "@otherTag" }],
      ],
      [/</, "delimiter"],
      [/[^<{]+/], // text
    ],

    doctype: [
      [/[^>]+/, "metatag.content"],
      [/>/, "metatag", "@pop"],
    ],

    frontmatter: [
      [/^---/, { token: "comment", next: "@pop", nextEmbedded: "@pop" }],
      [
        /./,
        {
          token: "@rematch",
          next: "@frontmatterEmbedded",
          nextEmbedded: "text/javascript",
        },
      ],
    ],

    frontmatterEmbedded: [
      [/[^-]+|-[^-][^-]+/, { token: "@rematch", next: "@pop" }],
      [/^---/, { token: "comment", next: "@root", nextEmbedded: "@pop" }],
    ],

    expression: [
      [
        /[^<{}]/,
        {
          token: "@rematch",
          next: "@expressionEmbedded",
          nextEmbedded: "text/javascript",
        },
      ],
      [/</, { token: "@rematch", next: "@pop" }],
      [/}/, { token: "", next: "@pop" }],
    ],

    expressionEmbedded: [
      [/{/, "@rematch", "@push"],
      [/</, { token: "@rematch", next: "@pop", nextEmbedded: "@pop" }],
      [/}/, { token: "@rematch", next: "@pop", nextEmbedded: "@pop" }],
    ],

    comment: [
      [/-->/, "comment", "@pop"],
      [/[^-]+/, "comment.content"],
      [/./, "comment.content"],
    ],

    otherTag: [
      [/\/?>/, "delimiter", "@pop"],
      [/"([^"]*)"/, "attribute.value"],
      [/'([^']*)'/, "attribute.value"],
      [/[\w\-]+/, "attribute.name"],
      [/=/, "delimiter"],
      [/[ \t\r\n]+/], // whitespace
    ],

    // -- BEGIN <script> tags handling

    // After <script
    script: [
      [/type/, "attribute.name", "@scriptAfterType"],
      [/"([^"]*)"/, "attribute.value"],
      [/'([^']*)'/, "attribute.value"],
      [/[\w\-]+/, "attribute.name"],
      [/=/, "delimiter"],
      [
        />/,
        {
          token: "delimiter",
          next: "@scriptEmbedded",
          nextEmbedded: "text/javascript",
        },
      ],
      [/[ \t\r\n]+/], // whitespace
      [
        /(<\/)(script\s*)(>)/,
        ["delimiter", "tag", { token: "delimiter", next: "@pop" }],
      ],
    ],

    // After <script ... type
    scriptAfterType: [
      [/=/, "delimiter", "@scriptAfterTypeEquals"],
      [
        />/,
        {
          token: "delimiter",
          next: "@scriptEmbedded",
          nextEmbedded: "text/javascript",
        },
      ], // cover invalid e.g. <script type>
      [/[ \t\r\n]+/], // whitespace
      [/<\/script\s*>/, { token: "@rematch", next: "@pop" }],
    ],

    // After <script ... type =
    scriptAfterTypeEquals: [
      [
        /"([^"]*)"/,
        { token: "attribute.value", switchTo: "@scriptWithCustomType.$1" },
      ],
      [
        /'([^']*)'/,
        { token: "attribute.value", switchTo: "@scriptWithCustomType.$1" },
      ],
      [
        />/,
        {
          token: "delimiter",
          next: "@scriptEmbedded",
          nextEmbedded: "text/javascript",
        },
      ], // cover invalid e.g. <script type=>
      [/[ \t\r\n]+/], // whitespace
      [/<\/script\s*>/, { token: "@rematch", next: "@pop" }],
    ],

    // After <script ... type = $S2
    scriptWithCustomType: [
      [
        />/,
        {
          token: "delimiter",
          next: "@scriptEmbedded.$S2",
          nextEmbedded: "$S2",
        },
      ],
      [/"([^"]*)"/, "attribute.value"],
      [/'([^']*)'/, "attribute.value"],
      [/[\w\-]+/, "attribute.name"],
      [/=/, "delimiter"],
      [/[ \t\r\n]+/], // whitespace
      [/<\/script\s*>/, { token: "@rematch", next: "@pop" }],
    ],

    scriptEmbedded: [
      [/<\/script/, { token: "@rematch", next: "@pop", nextEmbedded: "@pop" }],
      [/[^<]+/, ""],
    ],

    // -- END <script> tags handling

    // -- BEGIN <style> tags handling

    // After <style
    style: [
      [/type/, "attribute.name", "@styleAfterType"],
      [/"([^"]*)"/, "attribute.value"],
      [/'([^']*)'/, "attribute.value"],
      [/[\w\-]+/, "attribute.name"],
      [/=/, "delimiter"],
      [
        />/,
        {
          token: "delimiter",
          next: "@styleEmbedded",
          nextEmbedded: "text/css",
        },
      ],
      [/[ \t\r\n]+/], // whitespace
      [
        /(<\/)(style\s*)(>)/,
        ["delimiter", "tag", { token: "delimiter", next: "@pop" }],
      ],
    ],

    // After <style ... type
    styleAfterType: [
      [/=/, "delimiter", "@styleAfterTypeEquals"],
      [
        />/,
        {
          token: "delimiter",
          next: "@styleEmbedded",
          nextEmbedded: "text/css",
        },
      ], // cover invalid e.g. <style type>
      [/[ \t\r\n]+/], // whitespace
      [/<\/style\s*>/, { token: "@rematch", next: "@pop" }],
    ],

    // After <style ... type =
    styleAfterTypeEquals: [
      [
        /"([^"]*)"/,
        { token: "attribute.value", switchTo: "@styleWithCustomType.$1" },
      ],
      [
        /'([^']*)'/,
        { token: "attribute.value", switchTo: "@styleWithCustomType.$1" },
      ],
      [
        />/,
        {
          token: "delimiter",
          next: "@styleEmbedded",
          nextEmbedded: "text/css",
        },
      ], // cover invalid e.g. <style type=>
      [/[ \t\r\n]+/], // whitespace
      [/<\/style\s*>/, { token: "@rematch", next: "@pop" }],
    ],

    // After <style ... type = $S2
    styleWithCustomType: [
      [
        />/,
        { token: "delimiter", next: "@styleEmbedded.$S2", nextEmbedded: "$S2" },
      ],
      [/"([^"]*)"/, "attribute.value"],
      [/'([^']*)'/, "attribute.value"],
      [/[\w\-]+/, "attribute.name"],
      [/=/, "delimiter"],
      [/[ \t\r\n]+/], // whitespace
      [/<\/style\s*>/, { token: "@rematch", next: "@pop" }],
    ],

    styleEmbedded: [
      [/<\/style/, { token: "@rematch", next: "@pop", nextEmbedded: "@pop" }],
      [/[^<]+/, ""],
    ],

    // -- END <style> tags handling
  },
};

export { config, tokens };

export default (monaco = (window as any).monaco) => {
  const lang = "astro";
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
      let total = 0;
      for (let i = 0; i < lines.length; i++) {
        lineStart.push(total);
        total += lines[i].length + 1;
      }
      const at = (line: number, col: number) => lineStart[line] + col;
      const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      // A brace opening a type body: names declared directly inside are members,
      // not locals, so they keep document-wide rename behaviour.
      const isTypeBody = (prefix: string) =>
        /\b(class|interface|enum|struct|record|trait|protocol|extension|impl|actor|namespace|module|union|opaque)\b/.test(
          prefix,
        );

      type Scope = {
        start: number;
        end: number;
        type: boolean;
        names: Set<string>;
      };
      const scopes: Scope[] = [];
      const open: Scope[] = [];
      for (let i = 0; i < lines.length; i++) {
        for (let c = 0; c < lines[i].length; c++) {
          if (lines[i][c] === "{") {
            const scope: Scope = {
              start: at(i, c),
              end: Infinity,
              type: isTypeBody(lines[i].slice(0, c)),
              names: new Set<string>(),
            };
            scopes.push(scope);
            open.push(scope);
          } else if (lines[i][c] === "}") {
            const scope = open.pop();
            if (scope) scope.end = at(i, c);
          }
        }
      }
      const eof = at(lines.length - 1, lines[lines.length - 1].length);
      for (const scope of open) scope.end = eof;

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
      // First scope opening at or after `offset` (a signature's body). A call
      // like `f(x)` is not a signature: anything past a statement boundary is
      // rejected so it cannot be mistaken for a parameter list.
      const nextScope = (offset: number) => {
        let found: Scope | undefined;
        for (const scope of scopes) {
          if (scope.start >= offset && (!found || scope.start < found.start))
            found = scope;
        }
        if (found && /[;}]/.test(lines.join("\n").slice(offset, found.start)))
          return undefined;
        return found;
      };

      // Local declarations: const/let/var bindings and parameters.
      const declaration = new RegExp(
        "\\b(?:const|let|var)\\s+" +
          esc(name) +
          "\\b|(?:[(,]\\s*)" +
          esc(name) +
          "\\s*[,:)]",
        "g",
      );
      const declarations: { start: number; end: number; scope?: Scope }[] = [];
      for (let i = 0; i < lines.length; i++) {
        declaration.lastIndex = 0;
        let m;
        while ((m = declaration.exec(lines[i])) !== null) {
          // A name in a parameter list binds to the body that follows it, not
          // to the scope the signature text sits in.
          const before = lines[i].slice(0, m.index).replace(/\s+$/, "");
          const isParam =
            /^[(,|[{[]/.test(m[0]) || before.endsWith("(") || before.endsWith(",");
          const owner = isParam
            ? nextScope(at(i, m.index))
            : enclosing(at(i, m.index));
          // A parameter list must bind to a body; otherwise this is a call, not
          // a declaration, and must not shadow the real binding.
          if (isParam && !owner) continue;
          const scope = owner && !owner.type ? owner : undefined;
          if (scope) scope.names.add(name);
          declarations.push({
            start: at(i, m.index),
            end: at(i, m.index) + m[0].length,
            scope,
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
            if (
              before.endsWith(".") ||
              before.endsWith("->") ||
              before.endsWith("::")
            )
              continue;
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
