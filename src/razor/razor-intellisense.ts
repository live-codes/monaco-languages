import type * as Monaco from "monaco-editor";
import {
  csharpAttributes,
  csharpKeywords,
  csharpNamespaces,
  csharpSnippets,
  csharpTypes,
  keywordDocs,
  membersForObject,
  razorDirectiveDocs,
  razorDirectives,
  resolveBinding,
  scanDocument,
  signatures,
} from "./razor-csharp";

// ─── HTML DATA ─────────────────────────────────────────────────────────────

const htmlTags = [
  "a",
  "abbr",
  "article",
  "aside",
  "audio",
  "b",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "code",
  "col",
  "colgroup",
  "dd",
  "del",
  "details",
  "div",
  "dl",
  "dt",
  "em",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "meta",
  "nav",
  "ol",
  "option",
  "p",
  "pre",
  "script",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "summary",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "title",
  "tr",
  "ul",
  "video",
];

const voidTags = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

const htmlAttributes = [
  "class",
  "id",
  "style",
  "title",
  "name",
  "value",
  "type",
  "href",
  "src",
  "alt",
  "width",
  "height",
  "placeholder",
  "disabled",
  "readonly",
  "checked",
  "selected",
  "required",
  "multiple",
  "for",
  "action",
  "method",
  "target",
  "rel",
  "role",
  "data-",
  "aria-label",
  "aria-hidden",
  "tabindex",
  "colspan",
  "rowspan",
  "lang",
  "charset",
  "content",
];

const htmlTagDocs: Record<string, string> = {
  a: "Defines a hyperlink.",
  div: "A generic block-level container.",
  span: "A generic inline container.",
  p: "Defines a paragraph.",
  img: "Embeds an image. (void element)",
  input: "Defines an input control. (void element)",
  form: "Defines an HTML form for user input.",
  button: "Defines a clickable button.",
  table: "Defines a table.",
  ul: "Defines an unordered list.",
  ol: "Defines an ordered list.",
  li: "Defines a list item.",
  h1: "Defines a top-level heading.",
  script: "Embeds client-side script.",
  style: "Embeds style information (CSS).",
  label: "Defines a label for an input element.",
  select: "Defines a drop-down list.",
  textarea: "Defines a multi-line text input control.",
};

const htmlAttributeDocs: Record<string, string> = {
  class: "Specifies one or more class names for an element.",
  id: "Specifies a unique id for an element.",
  style: "Specifies an inline CSS style for an element.",
  title: "Specifies extra information about an element (tooltip).",
  href: "Specifies the URL of the page the link goes to.",
  src: "Specifies the URL of the media resource.",
  alt: "Specifies an alternate text for an image.",
  placeholder: "Specifies a short hint that describes the expected value.",
  disabled: "Specifies that the element should be disabled.",
  readonly: "Specifies that the element is read-only.",
  required: "Specifies that the element is required before submitting the form.",
  for: "Specifies which form element a label is bound to.",
  name: "Specifies a name for the element.",
  value: "Specifies the value of the element.",
  type: "Specifies the type of the element.",
};

// ─── RAZOR SNIPPETS ────────────────────────────────────────────────────────

const razorSnippets = [
  {
    label: "@if",
    body: "@if (${1:condition})\n{\n\t$0\n}",
    doc: "Razor conditional block",
  },
  {
    label: "@if else",
    body: "@if (${1:condition})\n{\n\t$2\n}\nelse\n{\n\t$0\n}",
    doc: "Razor if/else block",
  },
  {
    label: "@foreach",
    body: "@foreach (var ${1:item} in ${2:collection})\n{\n\t$0\n}",
    doc: "Razor foreach loop",
  },
  {
    label: "@for",
    body: "@for (var ${1:i} = 0; ${1:i} < ${2:count}; ${1:i}++)\n{\n\t$0\n}",
    doc: "Razor for loop",
  },
  {
    label: "@while",
    body: "@while (${1:condition})\n{\n\t$0\n}",
    doc: "Razor while loop",
  },
  {
    label: "@switch",
    body: "@switch (${1:expression})\n{\n\tcase ${2:value}:\n\t\t$0\n\t\tbreak;\n\tdefault:\n\t\tbreak;\n}",
    doc: "Razor switch statement",
  },
  {
    label: "@code",
    body: "@code {\n\t$0\n}",
    doc: "C# members block (Blazor component)",
  },
  {
    label: "@functions",
    body: "@functions {\n\t$0\n}",
    doc: "C# members block (MVC view)",
  },
  {
    label: "@model",
    body: "@model ${1:Namespace.Type}",
    doc: "Declares the view model type",
  },
  {
    label: "@using",
    body: "@using ${1:Namespace}",
    doc: "Imports a namespace",
  },
  {
    label: "@inject",
    body: "@inject ${1:IService} ${2:Service}",
    doc: "Injects a service into the view",
  },
  {
    label: "@section",
    body: "@section ${1:Name} {\n\t$0\n}",
    doc: "Defines a named layout section",
  },
  {
    label: "@{}",
    body: "@{\n\t$0\n}",
    doc: "Razor code block",
  },
  {
    label: "@()",
    body: "@(${1:expression})",
    doc: "Explicit Razor expression",
  },
  {
    label: "@* *@",
    body: "@* ${1:comment} *@",
    doc: "Razor comment",
  },
];

// ─── CONTEXT DETECTION ─────────────────────────────────────────────────────

/**
 * Scans the document up to `offset` and reports whether the cursor sits inside
 * a C# code region (`@{ … }`, `@code { … }`, `@( … )`, `@if ( … ) { … }`, …)
 * rather than in HTML markup.
 */
function inCSharp(text: string, offset: number): boolean {
  let i = 0;
  let code = false;
  let depth = 0;
  let paren = false;
  let parenDepth = 0;

  const skipString = (quote: string, verbatim: boolean) => {
    i++; // opening quote
    while (i < text.length) {
      const ch = text[i];
      if (verbatim) {
        if (ch === '"') {
          if (text[i + 1] === '"') {
            i += 2;
            continue;
          }
          i++;
          return;
        }
        i++;
        continue;
      }
      if (ch === "\\") {
        i += 2;
        continue;
      }
      if (ch === quote) {
        i++;
        return;
      }
      i++;
    }
  };

  while (i < offset) {
    const c = text[i];
    const c2 = text[i + 1];

    if (code) {
      if (c === "/" && c2 === "/") {
        while (i < text.length && text[i] !== "\n") i++;
        continue;
      }
      if (c === "/" && c2 === "*") {
        i += 2;
        while (i < text.length && !(text[i] === "*" && text[i + 1] === "/")) i++;
        i = Math.min(i + 2, text.length);
        continue;
      }
      if (c === "@" && c2 === '"') {
        i++;
        skipString('"', true);
        continue;
      }
      if (c === '"') {
        skipString('"', false);
        continue;
      }
      if (c === "'") {
        skipString("'", false);
        continue;
      }
      if (paren) {
        if (c === "(") parenDepth++;
        else if (c === ")") {
          parenDepth--;
          if (parenDepth <= 0) {
            paren = false;
            code = false;
          }
        }
        i++;
        continue;
      }
      if (c === "{") {
        depth++;
        i++;
        continue;
      }
      if (c === "}") {
        depth--;
        i++;
        if (depth <= 0) code = false;
        continue;
      }
      i++;
      continue;
    }

    // Markup
    if (c === "@") {
      if (c2 === "*") {
        i += 2;
        while (i < text.length && !(text[i] === "*" && text[i + 1] === "@")) i++;
        i = Math.min(i + 2, text.length);
        continue;
      }
      if (c2 === "@") {
        i += 2;
        continue;
      }
      if (c2 === "{") {
        code = true;
        depth = 1;
        i += 2;
        continue;
      }
      if (c2 === "(") {
        code = true;
        paren = true;
        parenDepth = 1;
        i += 2;
        continue;
      }
      const rest = text.slice(i, i + 24);
      if (
        /^@(code|functions)\b/.test(rest) ||
        /^@(if|for|foreach|while|switch|using|lock|try|do)\b/.test(rest)
      ) {
        const brace = text.indexOf("{", i);
        const nl = text.indexOf("\n", i);
        if (brace !== -1 && (nl === -1 || brace < nl)) {
          code = true;
          depth = 1;
          i = brace + 1;
          continue;
        }
        i++;
        continue;
      }
      const expression = /^@[A-Za-z_]\w*(?:\??\.[A-Za-z_]\w*)*/.exec(
        text.slice(i),
      );
      if (expression) {
        i += expression[0].length;
        continue;
      }
      i++;
      continue;
    }

    if (c === "<") {
      const scriptTag = /^<(script|style)\b/i.exec(text.slice(i, i + 10));
      if (scriptTag) {
        const close = text
          .toLowerCase()
          .indexOf(`</${scriptTag[1].toLowerCase()}`, i);
        i = close === -1 ? text.length : close;
        continue;
      }
      if (text.slice(i, i + 4) === "<!--") {
        const end = text.indexOf("-->", i);
        i = end === -1 ? text.length : end + 3;
        continue;
      }
    }
    i++;
  }

  return code;
}

// ─── PROVIDER REGISTRATION ─────────────────────────────────────────────────

export function initializeRazorIntelliSense(monaco: typeof Monaco): void {
  const CK = monaco.languages.CompletionItemKind;
  const Snippet = monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet;

  // ── Completion ──────────────────────────────────────────────────────────
  monaco.languages.registerCompletionItemProvider("razor", {
    triggerCharacters: [".", "@", "<", " ", "(", '"'],

    provideCompletionItems(model, position) {
      const word = model.getWordUntilPosition(position);
      const range: Monaco.IRange = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };

      const before = model
        .getLineContent(position.lineNumber)
        .substring(0, position.column - 1);
      const isCode = inCSharp(
        model.getValue(),
        model.getOffsetAt(position),
      );

      const suggestions: Monaco.languages.CompletionItem[] = [];

      const afterAt = /@[A-Za-z_]*$/.test(before);
      const member =
        /(?:@)?([A-Za-z_]\w*)\.\s*([A-Za-z_]\w*)?$/.exec(before);
      const memberInExpression = !!member && (isCode || before.includes("@"));

      // ── Member access (after a dot) ──
      if (member && memberInExpression) {
        const objectName = member[1];
        // Unknown receivers fall back to the members shared by most values.
        const methods = membersForObject(objectName) ?? [
          ...(membersForObject("string") ?? []),
          ...(membersForObject("list") ?? []),
        ];
        const seen = new Set<string>();
        for (const m of methods) {
          if (seen.has(m.label)) continue;
          seen.add(m.label);
          const isMethod = m.detail.includes("(");
          suggestions.push({
            label: m.label,
            kind: isMethod ? CK.Method : CK.Property,
            insertText: m.label + (isMethod ? "($1)" : ""),
            insertTextRules: isMethod ? Snippet : undefined,
            detail: m.detail,
            documentation: { value: m.doc },
            range,
            sortText: "0_" + m.label,
          });
        }
        return { suggestions };
      }

      // ── After '@' (directive or expression) ──
      if (afterAt && !isCode) {
        for (const d of razorDirectives) {
          suggestions.push({
            label: "@" + d,
            kind: CK.Keyword,
            insertText: "@" + d,
            detail: "Razor directive",
            documentation: razorDirectiveDocs[d]
              ? { value: razorDirectiveDocs[d] }
              : undefined,
            range,
            sortText: "0_" + d,
          });
        }
        pushCSharpBasics(suggestions, range, CK, Snippet, model);
        return { suggestions };
      }

      // ── Inside a C# region ──
      if (isCode) {
        pushCSharpBasics(suggestions, range, CK, Snippet, model);
        return { suggestions };
      }

      // ── Markup ──
      const insideTag = /<[A-Za-z][^>]*$/.test(before);
      if (insideTag) {
        for (const attr of htmlAttributes) {
          suggestions.push({
            label: attr,
            kind: CK.Property,
            insertText: attr.endsWith("-") ? attr : attr + '="${1}"',
            insertTextRules: Snippet,
            detail: "HTML attribute",
            documentation: htmlAttributeDocs[attr]
              ? { value: htmlAttributeDocs[attr] }
              : undefined,
            range,
            sortText: "0_" + attr,
          });
        }
      } else {
        for (const tag of htmlTags) {
          suggestions.push({
            label: "<" + tag + ">",
            kind: CK.Class,
            insertText: voidTags.has(tag)
              ? `<${tag} \${1} />`
              : `<${tag}>\n\t$0\n</${tag}>`,
            insertTextRules: Snippet,
            detail: "HTML element",
            documentation: htmlTagDocs[tag]
              ? { value: htmlTagDocs[tag] }
              : undefined,
            range,
            sortText: "1_" + tag,
          });
        }
      }

      for (const s of razorSnippets) {
        suggestions.push({
          label: s.label,
          kind: CK.Snippet,
          insertText: s.body,
          insertTextRules: Snippet,
          detail: "Razor snippet",
          documentation: { value: "```razor\n" + s.body + "\n```" },
          range,
          sortText: "0_" + s.label,
        });
      }

      return { suggestions };
    },
  });

  // ── Hover ─────────────────────────────────────────────────────────────
  monaco.languages.registerHoverProvider("razor", {
    provideHover(model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return null;
      const range = new monaco.Range(
        position.lineNumber,
        word.startColumn,
        position.lineNumber,
        word.endColumn,
      );
      const name = word.word;

      // Razor directive: `@word`
      const before = model
        .getLineContent(position.lineNumber)
        .substring(0, word.startColumn - 1);
      if (before.endsWith("@") && razorDirectiveDocs[name]) {
        return {
          range,
          contents: [
            { value: "```razor\n@" + name + "\n```" },
            { value: razorDirectiveDocs[name] },
          ],
        };
      }

      const isCode = inCSharp(model.getValue(), model.getOffsetAt(position));

      if (isCode) {
        if (keywordDocs[name]) {
          return {
            range,
            contents: [
              { value: "```csharp\n(keyword) " + name + "\n```" },
              { value: keywordDocs[name] },
            ],
          };
        }
        if (csharpTypes[name]) {
          return {
            range,
            contents: [
              { value: "```csharp\n" + csharpTypes[name].detail + "\n```" },
              { value: csharpTypes[name].doc },
            ],
          };
        }
        const member = /([A-Za-z_]\w*)\.\s*$/.exec(before);
        if (member) {
          const found = membersForObject(member[1])?.find(
            (m) => m.label === name,
          );
          if (found) {
            return {
              range,
              contents: [
                { value: "```csharp\n" + found.detail + "\n```" },
                { value: found.doc },
              ],
            };
          }
        }
        const symbol = scanDocument(model).find((s) => s.name === name);
        if (symbol) {
          const lineContent = model.getLineContent(symbol.line).trim();
          return {
            range,
            contents: [
              { value: "```csharp\n" + lineContent + "\n```" },
              { value: `*${symbol.kind}* — defined at **line ${symbol.line}**` },
            ],
          };
        }
        return null;
      }

      // Markup: HTML tags and attributes
      if (htmlTagDocs[name.toLowerCase()]) {
        return {
          range,
          contents: [
            { value: "```html\n<" + name + ">\n```" },
            { value: htmlTagDocs[name.toLowerCase()] },
          ],
        };
      }
      if (htmlAttributeDocs[name.toLowerCase()]) {
        return {
          range,
          contents: [
            { value: "```html\n" + name + "\n```" },
            { value: htmlAttributeDocs[name.toLowerCase()] },
          ],
        };
      }
      return null;
    },
  });

  // ── Signature help ──────────────────────────────────────────────────────
  monaco.languages.registerSignatureHelpProvider("razor", {
    signatureHelpTriggerCharacters: ["(", ","],
    provideSignatureHelp(model, position) {
      const isCode = inCSharp(model.getValue(), model.getOffsetAt(position));
      if (!isCode) return null;

      const textBefore = model
        .getLineContent(position.lineNumber)
        .substring(0, position.column - 1);

      const parenIndex = textBefore.lastIndexOf("(");
      if (parenIndex < 0) return null;

      const beforeParen = textBefore.substring(0, parenIndex).trim();
      const dotIndex = beforeParen.lastIndexOf(".");
      const methodName =
        dotIndex >= 0
          ? beforeParen.substring(dotIndex + 1).trim()
          : beforeParen.split(/\s+/).pop();

      if (!methodName) return null;

      const activeParam = (textBefore.substring(parenIndex + 1).match(/,/g) || [])
        .length;

      const signature = signatures[methodName];
      if (!signature) return null;

      return {
        value: {
          signatures: [
            {
              label: signature.label,
              documentation: { value: signature.doc },
              parameters: signature.params.map((p) => ({
                label: p.label,
                documentation: { value: p.doc },
              })),
            },
          ],
          activeSignature: 0,
          activeParameter: Math.min(
            activeParam,
            signature.params.length - 1,
          ),
        },
        dispose: () => {},
      };
    },
  });

  // ── Definition ──────────────────────────────────────────────────────────
  monaco.languages.registerDefinitionProvider("razor", {
    provideDefinition(model, position) {
      if (!inCSharp(model.getValue(), model.getOffsetAt(position))) return null;

      const binding = resolveBinding(model, position);
      if (binding && binding.local) {
        if (!binding.declaration) return null;
        const d = binding.declaration;
        return {
          uri: model.uri,
          range: new monaco.Range(d.line, d.startColumn, d.line, d.endColumn),
        };
      }

      const word = model.getWordAtPosition(position);
      if (!word) return null;
      const symbol = scanDocument(model).find((s) => s.name === word.word);
      if (!symbol) return null;
      return {
        uri: model.uri,
        range: new monaco.Range(
          symbol.line,
          symbol.col,
          symbol.line,
          symbol.col + symbol.name.length,
        ),
      };
    },
  });

  // ── Document symbols ────────────────────────────────────────────────────
  monaco.languages.registerDocumentSymbolProvider("razor", {
    provideDocumentSymbols(model) {
      const SK = monaco.languages.SymbolKind;
      return scanDocument(model).map((s) => ({
        name: s.name,
        kind:
          s.kind === "class"
            ? SK.Class
            : s.kind === "method"
              ? SK.Method
              : s.kind === "property"
                ? SK.Property
                : SK.Variable,
        range: new monaco.Range(
          s.line,
          1,
          s.line,
          model.getLineContent(s.line).length + 1,
        ),
        selectionRange: new monaco.Range(
          s.line,
          s.col,
          s.line,
          s.col + s.name.length,
        ),
      }));
    },
  });

  // ── Rename (C# locals) ──────────────────────────────────────────────────
  monaco.languages.registerRenameProvider("razor", {
    provideRenameEdits(model, position, newName) {
      if (!inCSharp(model.getValue(), model.getOffsetAt(position))) return null;
      const binding = resolveBinding(model, position);
      if (!binding || !binding.local) return null;
      return {
        edits: binding.occurrences.map((r) => ({
          resource: model.uri,
          versionId: model.getVersionId(),
          textEdit: {
            range: new monaco.Range(r.line, r.startColumn, r.line, r.endColumn),
            text: newName,
          },
        })),
      };
    },
    resolveRenameLocation(model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return { rejectReason: "Cannot rename this element." };
      if (!inCSharp(model.getValue(), model.getOffsetAt(position)))
        return { rejectReason: "Cannot rename this element." };
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
}

// ─── C# COMPLETION HELPERS ─────────────────────────────────────────────────

function pushCSharpBasics(
  suggestions: Monaco.languages.CompletionItem[],
  range: Monaco.IRange,
  CK: typeof Monaco.languages.CompletionItemKind,
  snippetRule: Monaco.languages.CompletionItemInsertTextRule,
  model: Monaco.editor.ITextModel,
): void {
  for (const s of csharpSnippets) {
    suggestions.push({
      label: s.label,
      kind: CK.Snippet,
      insertText: s.body,
      insertTextRules: snippetRule,
      detail: "Snippet: " + s.doc,
      documentation: {
        value:
          "```csharp\n" +
          s.body.replace(/\$\{\d+:?([^}]*)}/g, "$1").replace(/\$\d+/g, "") +
          "\n```",
      },
      range,
      sortText: "1_" + s.label,
    });
  }

  for (const kw of csharpKeywords) {
    suggestions.push({
      label: kw,
      kind: CK.Keyword,
      insertText: kw,
      detail: "keyword",
      documentation: keywordDocs[kw] ? { value: keywordDocs[kw] } : undefined,
      range,
      sortText: "2_" + kw,
    });
  }

  for (const type of Object.keys(csharpTypes)) {
    suggestions.push({
      label: type,
      kind: CK.Class,
      insertText: type,
      detail: csharpTypes[type].detail,
      documentation: { value: csharpTypes[type].doc },
      range,
      sortText: "3_" + type,
    });
  }

  for (const symbol of scanDocument(model)) {
    const kind =
      symbol.kind === "class"
        ? CK.Class
        : symbol.kind === "method"
          ? CK.Method
          : symbol.kind === "property"
            ? CK.Property
            : CK.Variable;
    suggestions.push({
      label: symbol.name,
      kind,
      insertText: symbol.name + (symbol.kind === "method" ? "($1)" : ""),
      insertTextRules: symbol.kind === "method" ? snippetRule : undefined,
      detail: `${symbol.kind} (defined at line ${symbol.line})`,
      range,
      sortText: "0_" + symbol.name,
    });
  }

  for (const attr of csharpAttributes) {
    suggestions.push({
      label: attr,
      kind: CK.Class,
      insertText: attr,
      detail: "attribute",
      range,
      sortText: "4_" + attr,
    });
  }

  for (const ns of csharpNamespaces) {
    suggestions.push({
      label: ns,
      kind: CK.Module,
      insertText: ns,
      detail: "namespace",
      range,
      sortText: "5_" + ns,
    });
  }
}
