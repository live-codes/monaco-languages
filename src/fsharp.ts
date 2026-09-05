import type * as Monaco from "monaco-editor";

export default (monaco: typeof Monaco) => {
  // ─── Register F# Language ──────────────────────────────────────
  monaco.languages.register({
    id: "fsharp",
    extensions: [".fs", ".fsx", ".fsi"],
    aliases: ["F#", "FSharp", "fsharp"],
    mimetypes: ["text/x-fsharp"],
  });

  // ─── Monarch Tokenizer ────────────────────────────────────────
  monaco.languages.setMonarchTokensProvider("fsharp", {
    keywords: [
      "abstract",
      "and",
      "as",
      "assert",
      "base",
      "begin",
      "class",
      "default",
      "delegate",
      "do",
      "done",
      "downcast",
      "downto",
      "elif",
      "else",
      "end",
      "exception",
      "extern",
      "false",
      "finally",
      "fixed",
      "for",
      "fun",
      "function",
      "global",
      "if",
      "in",
      "inherit",
      "inline",
      "interface",
      "internal",
      "lazy",
      "let",
      "let!",
      "match",
      "match!",
      "member",
      "module",
      "mutable",
      "namespace",
      "new",
      "not",
      "null",
      "of",
      "open",
      "or",
      "override",
      "private",
      "public",
      "rec",
      "return",
      "return!",
      "select",
      "static",
      "struct",
      "then",
      "to",
      "true",
      "try",
      "type",
      "upcast",
      "use",
      "use!",
      "val",
      "void",
      "when",
      "while",
      "with",
      "yield",
      "yield!",
      "async",
      "atomic",
      "break",
      "checked",
      "component",
      "const",
      "constraint",
      "constructor",
      "continue",
      "eager",
      "event",
      "external",
      "functor",
      "include",
      "method",
      "mixin",
      "object",
      "parallel",
      "process",
      "protected",
      "pure",
      "sealed",
      "tailcall",
      "trait",
      "virtual",
      "volatile",
      "asr",
      "land",
      "lor",
      "lsl",
      "lsr",
      "lxor",
      "mod",
      "sig",
      "do!",
      "task",
    ],
    typeKeywords: [
      "int",
      "float",
      "bool",
      "string",
      "char",
      "byte",
      "sbyte",
      "int16",
      "uint16",
      "int32",
      "uint32",
      "int64",
      "uint64",
      "nativeint",
      "unativeint",
      "float32",
      "double",
      "decimal",
      "unit",
      "void",
      "option",
      "list",
      "array",
      "seq",
      "map",
      "set",
      "async",
      "task",
      "Result",
      "Choice",
      "Lazy",
      "ref",
      "exn",
      "obj",
      "bigint",
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
      /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,

    tokenizer: {
      root: [
        // Computation expressions
        [/(async|task|seq)\s*\{/, { token: "keyword", bracket: "@open" }],
        // Attributes
        [/\[\</, { token: "annotation", bracket: "@open", next: "@attribute" }],
        // Type annotations after colon
        [/(:)\s*([A-Z][\w']*)/, ["delimiter", "type.identifier"]],
        // Module/namespace qualified
        [/[A-Z][\w']*(?=\.)/, "type.identifier"],
        // Type identifiers (PascalCase)
        [
          /[A-Z][\w']*/,
          {
            cases: {
              "@typeKeywords": "type.identifier",
              "@keywords": "keyword",
              "@default": "type.identifier",
            },
          },
        ],
        // Identifiers and keywords
        [
          /[a-z_][\w']*/,
          {
            cases: {
              "@keywords": "keyword",
              "@typeKeywords": "type.identifier",
              "@default": "identifier",
            },
          },
        ],
        // Preprocessor
        [/^#\w+/, "keyword.preprocessor"],
        // Whitespace
        { include: "@whitespace" },
        // Delimiters
        [/[{}()\[\]]/, "@brackets"],
        [/[<>](?!@symbols)/, "@brackets"],
        // Pipe operator highlight
        [/\|>/, "keyword.operator.pipe"],
        [/<\|/, "keyword.operator.pipe"],
        [/>>/, "keyword.operator.pipe"],
        [/<</, "keyword.operator.pipe"],
        // Operators
        [
          /@symbols/,
          {
            cases: {
              "@operators": "operator",
              "@default": "",
            },
          },
        ],
        [/->/, "keyword.operator.arrow"],
        [/<-/, "keyword.operator.arrow"],
        // Numbers
        [/\d*\.\d+([eE][\-+]?\d+)?[fFmM]?/, "number.float"],
        [/0[xX][0-9a-fA-F]+[uUlLnN]*/, "number.hex"],
        [/0[oO][0-7]+[uUlLnN]*/, "number.octal"],
        [/0[bB][01]+[uUlLnN]*/, "number.binary"],
        [/\d+[uUlLnN]*/, "number"],
        // Strings
        [/"""/, "string", "@tripleQuotedString"],
        [/@"/, "string", "@verbatimString"],
        [/"/, "string", "@string"],
        // Characters
        [/'[^\\']'/, "string.char"],
        [/(')(@escapes)(')/, ["string.char", "string.escape", "string.char"]],
        // Delimiter
        [/[;,.]/, "delimiter"],
      ],

      attribute: [
        [/[a-zA-Z_][\w'.]*/, "annotation"],
        [/\(/, { token: "annotation", bracket: "@open" }],
        [/\)/, { token: "annotation", bracket: "@close" }],
        [/>\]/, { token: "annotation", bracket: "@close", next: "@pop" }],
        [/"/, "string", "@string"],
        [/=/, "delimiter"],
        [/,/, "delimiter"],
        [/\s+/, "white"],
        [/./, "annotation"],
      ],

      whitespace: [
        [/\s+/, "white"],
        [/\(\*/, "comment", "@blockComment"],
        [/\/\/.*$/, "comment"],
      ],

      blockComment: [
        [/[^\(\*]+/, "comment"],
        [/\(\*/, "comment", "@push"],
        [/\*\)/, "comment", "@pop"],
        [/[\(\*]/, "comment"],
      ],

      string: [
        [/[^\\"]+/, "string"],
        [/@escapes/, "string.escape"],
        [/\\./, "string.escape.invalid"],
        [/"/, "string", "@pop"],
      ],

      verbatimString: [
        [/[^"]+/, "string"],
        [/""/, "string.escape"],
        [/"/, "string", "@pop"],
      ],

      tripleQuotedString: [
        [/[^"]+/, "string"],
        [/"""/, "string", "@pop"],
        [/"/, "string"],
      ],
    },
  });

  // ─── Language Configuration ────────────────────────────────────
  monaco.languages.setLanguageConfiguration("fsharp", {
    comments: {
      lineComment: "//",
      blockComment: ["(*", "*)"],
    },
    brackets: [
      ["{", "}"],
      ["[", "]"],
      ["(", ")"],
      ["[|", "|]"],
      ["[<", ">]"],
    ],
    autoClosingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: '"', close: '"', notIn: ["string"] },
      { open: "(*", close: "*)" },
    ],
    surroundingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: '"', close: '"' },
      { open: "<", close: ">" },
    ],
    folding: {
      markers: {
        start:
          /^\s*(\/\/\s*#region|module|type|let|member|if|match|for|while|try)/,
        end: /^\s*(\/\/\s*#endregion)/,
      },
    },
    indentationRules: {
      increaseIndentPattern:
        /^\s*(module|type|let|member|if|elif|else|match|for|while|try|with|finally|fun|function|do|begin|class|struct|interface|->|=)\b.*\s*$/,
      decreaseIndentPattern: /^\s*(end|done|\||\)|\}|\])\s*$/,
    },
    onEnterRules: [
      {
        beforeText:
          /^\s*(let|type|module|member|if|elif|else|match|for|while|try|with|finally|do|begin|fun|function)\b.*=\s*$/,
        action: { indentAction: monaco.languages.IndentAction.Indent },
      },
      {
        beforeText: /^\s*\|.*->\s*$/,
        action: { indentAction: monaco.languages.IndentAction.Indent },
      },
    ],
  });

  // ─── F# Standard Library Definitions ──────────────────────────
  const fsharpStdLib = {
    modules: {
      List: {
        doc: "Contains operations for working with values of type list.",
        members: {
          map: {
            sig: "('a -> 'b) -> 'a list -> 'b list",
            doc: "Creates a new collection whose elements are the results of applying the given function to each element.",
          },
          filter: {
            sig: "('a -> bool) -> 'a list -> 'a list",
            doc: "Returns a new collection containing only the elements for which the given predicate returns true.",
          },
          fold: {
            sig: "('State -> 'T -> 'State) -> 'State -> 'T list -> 'State",
            doc: "Applies a function to each element, threading an accumulator argument through the computation.",
          },
          foldBack: {
            sig: "('T -> 'State -> 'State) -> 'T list -> 'State -> 'State",
            doc: "Applies a function to each element, threading an accumulator from right to left.",
          },
          head: {
            sig: "'a list -> 'a",
            doc: "Returns the first element of a non-empty list.",
          },
          tail: {
            sig: "'a list -> 'a list",
            doc: "Returns the list without the first element.",
          },
          length: {
            sig: "'a list -> int",
            doc: "Returns the number of elements in the list.",
          },
          rev: {
            sig: "'a list -> 'a list",
            doc: "Returns a new list with the elements in reverse order.",
          },
          sort: {
            sig: "'a list -> 'a list",
            doc: "Sorts the given list using Operators.compare.",
          },
          sortBy: {
            sig: "('a -> 'Key) -> 'a list -> 'a list",
            doc: "Sorts the given list using the given projection for the keys.",
          },
          iter: {
            sig: "('a -> unit) -> 'a list -> unit",
            doc: "Applies the given function to each element of the list.",
          },
          isEmpty: {
            sig: "'a list -> bool",
            doc: "Returns true if the list contains no elements.",
          },
          contains: {
            sig: "'a -> 'a list -> bool",
            doc: "Tests if the list contains the specified element.",
          },
          exists: {
            sig: "('a -> bool) -> 'a list -> bool",
            doc: "Tests if any element satisfies the predicate.",
          },
          forall: {
            sig: "('a -> bool) -> 'a list -> bool",
            doc: "Tests if all elements satisfy the predicate.",
          },
          find: {
            sig: "('a -> bool) -> 'a list -> 'a",
            doc: "Returns the first element for which the predicate returns true.",
          },
          tryFind: {
            sig: "('a -> bool) -> 'a list -> 'a option",
            doc: "Returns the first element for which the predicate returns true, or None.",
          },
          zip: {
            sig: "'a list -> 'b list -> ('a * 'b) list",
            doc: "Combines two lists into a list of pairs.",
          },
          unzip: {
            sig: "('a * 'b) list -> 'a list * 'b list",
            doc: "Splits a list of pairs into two lists.",
          },
          collect: {
            sig: "('a -> 'b list) -> 'a list -> 'b list",
            doc: "Applies the function to each element and concatenates all results.",
          },
          append: {
            sig: "'a list -> 'a list -> 'a list",
            doc: "Returns a new list that contains the elements of the first list followed by the second.",
          },
          choose: {
            sig: "('a -> 'b option) -> 'a list -> 'b list",
            doc: "Applies the function to each element. Returns a list of results where the function returns Some.",
          },
          reduce: {
            sig: "('a -> 'a -> 'a) -> 'a list -> 'a",
            doc: "Applies a function to each element, threading an accumulator. Uses the first element as initial state.",
          },
          sum: {
            sig: "int list -> int",
            doc: "Returns the sum of the elements in the list.",
          },
          sumBy: {
            sig: "('a -> int) -> 'a list -> int",
            doc: "Returns the sum of the results generated by applying the function to each element.",
          },
          average: {
            sig: "float list -> float",
            doc: "Returns the average of the elements in the list.",
          },
          min: {
            sig: "'a list -> 'a",
            doc: "Returns the lowest element in the list.",
          },
          max: {
            sig: "'a list -> 'a",
            doc: "Returns the greatest element in the list.",
          },
          distinct: {
            sig: "'a list -> 'a list",
            doc: "Returns a list that contains no duplicate entries.",
          },
          groupBy: {
            sig: "('a -> 'Key) -> 'a list -> ('Key * 'a list) list",
            doc: "Applies a key-generating function and groups adjacent elements with the same key.",
          },
          item: {
            sig: "int -> 'a list -> 'a",
            doc: "Indexes into the list. The first element has index 0.",
          },
          take: {
            sig: "int -> 'a list -> 'a list",
            doc: "Returns the first N elements of the list.",
          },
          skip: {
            sig: "int -> 'a list -> 'a list",
            doc: "Bypasses the first N elements and returns the remaining.",
          },
          mapi: {
            sig: "(int -> 'a -> 'b) -> 'a list -> 'b list",
            doc: "Like map, but also passes the index to the function.",
          },
          iteri: {
            sig: "(int -> 'a -> unit) -> 'a list -> unit",
            doc: "Like iter, but also passes the index to the function.",
          },
        },
      },
      Array: {
        doc: "Contains operations for working with arrays.",
        members: {
          map: {
            sig: "('a -> 'b) -> 'a[] -> 'b[]",
            doc: "Builds a new array whose elements are the results of applying the given function.",
          },
          filter: {
            sig: "('a -> bool) -> 'a[] -> 'a[]",
            doc: "Returns a new array containing only elements where the predicate is true.",
          },
          fold: {
            sig: "('State -> 'T -> 'State) -> 'State -> 'T[] -> 'State",
            doc: "Applies a function to each element, threading an accumulator.",
          },
          iter: {
            sig: "('a -> unit) -> 'a[] -> unit",
            doc: "Applies the given function to each element of the array.",
          },
          length: {
            sig: "'a[] -> int",
            doc: "Returns the number of elements in the array.",
          },
          sort: { sig: "'a[] -> 'a[]", doc: "Sorts the elements of an array." },
          create: {
            sig: "int -> 'a -> 'a[]",
            doc: "Creates an array of a specified length with every element set to the given value.",
          },
          init: {
            sig: "int -> (int -> 'a) -> 'a[]",
            doc: "Creates an array using the supplied generator function.",
          },
          zeroCreate: {
            sig: "int -> 'a[]",
            doc: "Creates an array with all elements set to the default value.",
          },
          append: {
            sig: "'a[] -> 'a[] -> 'a[]",
            doc: "Builds a new array that contains the elements of both arrays.",
          },
          choose: {
            sig: "('a -> 'b option) -> 'a[] -> 'b[]",
            doc: "Applies the function and returns results where Some is returned.",
          },
          collect: {
            sig: "('a -> 'b[]) -> 'a[] -> 'b[]",
            doc: "Applies the function to each element and concatenates all results.",
          },
          exists: {
            sig: "('a -> bool) -> 'a[] -> bool",
            doc: "Tests if any element of the array satisfies the predicate.",
          },
          find: {
            sig: "('a -> bool) -> 'a[] -> 'a",
            doc: "Returns the first element for which the predicate returns true.",
          },
          tryFind: {
            sig: "('a -> bool) -> 'a[] -> 'a option",
            doc: "Returns the first element for which the predicate returns true, or None.",
          },
          rev: {
            sig: "'a[] -> 'a[]",
            doc: "Returns a new array with the elements in reverse order.",
          },
          zip: {
            sig: "'a[] -> 'b[] -> ('a * 'b)[]",
            doc: "Combines two arrays into an array of pairs.",
          },
          reduce: {
            sig: "('a -> 'a -> 'a) -> 'a[] -> 'a",
            doc: "Applies a function to each element, using the first element as initial state.",
          },
          sum: { sig: "int[] -> int", doc: "Returns the sum of all elements." },
          average: {
            sig: "float[] -> float",
            doc: "Returns the average of all elements.",
          },
          distinct: {
            sig: "'a[] -> 'a[]",
            doc: "Returns an array with no duplicate entries.",
          },
          groupBy: {
            sig: "('a -> 'Key) -> 'a[] -> ('Key * 'a[])[]",
            doc: "Groups elements by the given key-generating function.",
          },
        },
      },
      Seq: {
        doc: "Contains operations for working with sequences (IEnumerable<T>).",
        members: {
          map: {
            sig: "('a -> 'b) -> seq<'a> -> seq<'b>",
            doc: "Creates a new sequence whose elements are the results of applying the given function.",
          },
          filter: {
            sig: "('a -> bool) -> seq<'a> -> seq<'a>",
            doc: "Returns a new sequence containing only elements where the predicate returns true.",
          },
          fold: {
            sig: "('State -> 'T -> 'State) -> 'State -> seq<'T> -> 'State",
            doc: "Applies a function to each element, threading an accumulator.",
          },
          iter: {
            sig: "('a -> unit) -> seq<'a> -> unit",
            doc: "Applies the given function to each element of the sequence.",
          },
          length: {
            sig: "seq<'a> -> int",
            doc: "Returns the number of elements in the sequence.",
          },
          head: {
            sig: "seq<'a> -> 'a",
            doc: "Returns the first element of the sequence.",
          },
          isEmpty: {
            sig: "seq<'a> -> bool",
            doc: "Returns true if the sequence is empty.",
          },
          toList: {
            sig: "seq<'a> -> 'a list",
            doc: "Creates a list from the sequence.",
          },
          toArray: {
            sig: "seq<'a> -> 'a[]",
            doc: "Creates an array from the sequence.",
          },
          ofList: {
            sig: "'a list -> seq<'a>",
            doc: "Views the given list as a sequence.",
          },
          ofArray: {
            sig: "'a[] -> seq<'a>",
            doc: "Views the given array as a sequence.",
          },
          collect: {
            sig: "('a -> seq<'b>) -> seq<'a> -> seq<'b>",
            doc: "Applies the function to each element and concatenates all results.",
          },
          choose: {
            sig: "('a -> 'b option) -> seq<'a> -> seq<'b>",
            doc: "Applies the function and returns results where Some is returned.",
          },
          exists: {
            sig: "('a -> bool) -> seq<'a> -> bool",
            doc: "Tests if any element satisfies the predicate.",
          },
          find: {
            sig: "('a -> bool) -> seq<'a> -> 'a",
            doc: "Returns the first element for which the predicate returns true.",
          },
          distinct: {
            sig: "seq<'a> -> seq<'a>",
            doc: "Returns a sequence with no duplicate entries.",
          },
          groupBy: {
            sig: "('a -> 'Key) -> seq<'a> -> seq<'Key * seq<'a>>",
            doc: "Groups elements by a key-generating function.",
          },
          take: {
            sig: "int -> seq<'a> -> seq<'a>",
            doc: "Returns the first N elements.",
          },
          skip: {
            sig: "int -> seq<'a> -> seq<'a>",
            doc: "Bypasses the first N elements and returns the remaining.",
          },
          cache: {
            sig: "seq<'a> -> seq<'a>",
            doc: "Returns a sequence that corresponds to a cached version of the input sequence.",
          },
          delay: {
            sig: "(unit -> seq<'a>) -> seq<'a>",
            doc: "Returns a sequence that is built from the given delayed specification.",
          },
          unfold: {
            sig: "('State -> ('T * 'State) option) -> 'State -> seq<'T>",
            doc: "Returns a sequence that contains the elements generated by the given computation.",
          },
          zip: {
            sig: "seq<'a> -> seq<'b> -> seq<'a * 'b>",
            doc: "Combines two sequences into a sequence of pairs.",
          },
          sort: {
            sig: "seq<'a> -> seq<'a>",
            doc: "Yields an ordered sequence of elements.",
          },
          sortBy: {
            sig: "('a -> 'Key) -> seq<'a> -> seq<'a>",
            doc: "Applies a key-generating function and yields an ordered sequence.",
          },
          reduce: {
            sig: "('a -> 'a -> 'a) -> seq<'a> -> 'a",
            doc: "Applies a function to each element, using the first element as initial.",
          },
          sum: {
            sig: "seq<int> -> int",
            doc: "Returns the sum of the elements.",
          },
          average: {
            sig: "seq<float> -> float",
            doc: "Returns the average of the elements.",
          },
          min: { sig: "seq<'a> -> 'a", doc: "Returns the lowest element." },
          max: { sig: "seq<'a> -> 'a", doc: "Returns the greatest element." },
        },
      },
      Map: {
        doc: "Contains operations for working with immutable maps.",
        members: {
          add: {
            sig: "'Key -> 'Value -> Map<'Key,'Value> -> Map<'Key,'Value>",
            doc: "Returns a new map with the binding added.",
          },
          find: {
            sig: "'Key -> Map<'Key,'Value> -> 'Value",
            doc: "Lookup an element in the map, raising KeyNotFoundException if absent.",
          },
          tryFind: {
            sig: "'Key -> Map<'Key,'Value> -> 'Value option",
            doc: "Lookup an element, returning Some value or None.",
          },
          remove: {
            sig: "'Key -> Map<'Key,'Value> -> Map<'Key,'Value>",
            doc: "Removes an element from the domain of the map.",
          },
          containsKey: {
            sig: "'Key -> Map<'Key,'Value> -> bool",
            doc: "Tests if an element is in the domain of the map.",
          },
          empty: { sig: "Map<'Key,'Value>", doc: "The empty map." },
          ofList: {
            sig: "('Key * 'Value) list -> Map<'Key,'Value>",
            doc: "Returns a new map made from the given bindings.",
          },
          ofSeq: {
            sig: "seq<'Key * 'Value> -> Map<'Key,'Value>",
            doc: "Returns a new map made from the given key/value pairs.",
          },
          ofArray: {
            sig: "('Key * 'Value)[] -> Map<'Key,'Value>",
            doc: "Returns a new map made from the given bindings.",
          },
          toList: {
            sig: "Map<'Key,'Value> -> ('Key * 'Value) list",
            doc: "Returns a list of all key-value pairs.",
          },
          toSeq: {
            sig: "Map<'Key,'Value> -> seq<'Key * 'Value>",
            doc: "Views the collection as an enumerable sequence of pairs.",
          },
          map: {
            sig: "('Key -> 'a -> 'b) -> Map<'Key,'a> -> Map<'Key,'b>",
            doc: "Creates a new collection whose elements are the results of applying the given function.",
          },
          filter: {
            sig: "('Key -> 'Value -> bool) -> Map<'Key,'Value> -> Map<'Key,'Value>",
            doc: "Creates a new map containing only the bindings for which the predicate returns true.",
          },
          fold: {
            sig: "('State -> 'Key -> 'Value -> 'State) -> 'State -> Map<'Key,'Value> -> 'State",
            doc: "Folds over the bindings in the map.",
          },
          iter: {
            sig: "('Key -> 'Value -> unit) -> Map<'Key,'Value> -> unit",
            doc: "Applies the given function to each binding in the map.",
          },
          exists: {
            sig: "('Key -> 'Value -> bool) -> Map<'Key,'Value> -> bool",
            doc: "Returns true if a binding in the map satisfies the predicate.",
          },
          count: {
            sig: "Map<'Key,'Value> -> int",
            doc: "Returns the number of bindings in the map.",
          },
          isEmpty: {
            sig: "Map<'Key,'Value> -> bool",
            doc: "Is the map empty?",
          },
        },
      },
      Set: {
        doc: "Contains operations for working with immutable sets.",
        members: {
          add: {
            sig: "'a -> Set<'a> -> Set<'a>",
            doc: "Returns a new set with an element added.",
          },
          remove: {
            sig: "'a -> Set<'a> -> Set<'a>",
            doc: "Returns a new set with the given element removed.",
          },
          contains: {
            sig: "'a -> Set<'a> -> bool",
            doc: "Evaluates to true if the given element is in the set.",
          },
          count: {
            sig: "Set<'a> -> int",
            doc: "Returns the number of elements in the set.",
          },
          isEmpty: {
            sig: "Set<'a> -> bool",
            doc: "Returns true if the set is empty.",
          },
          empty: { sig: "Set<'a>", doc: "The empty set." },
          ofList: {
            sig: "'a list -> Set<'a>",
            doc: "Creates a set from the given list.",
          },
          ofSeq: {
            sig: "seq<'a> -> Set<'a>",
            doc: "Creates a set from the given enumerable.",
          },
          ofArray: {
            sig: "'a[] -> Set<'a>",
            doc: "Creates a set from the given array.",
          },
          toList: {
            sig: "Set<'a> -> 'a list",
            doc: "Returns an ordered list of the elements in the set.",
          },
          toSeq: {
            sig: "Set<'a> -> seq<'a>",
            doc: "Returns an ordered view of the set as an enumerable.",
          },
          union: {
            sig: "Set<'a> -> Set<'a> -> Set<'a>",
            doc: "Computes the union of the two sets.",
          },
          intersect: {
            sig: "Set<'a> -> Set<'a> -> Set<'a>",
            doc: "Computes the intersection of the two sets.",
          },
          difference: {
            sig: "Set<'a> -> Set<'a> -> Set<'a>",
            doc: "Returns a new set with the elements of the second set removed from the first.",
          },
          map: {
            sig: "('a -> 'b) -> Set<'a> -> Set<'b>",
            doc: "Returns a new set containing the results of applying the function.",
          },
          filter: {
            sig: "('a -> bool) -> Set<'a> -> Set<'a>",
            doc: "Returns a new set with only elements satisfying the predicate.",
          },
          fold: {
            sig: "('State -> 'a -> 'State) -> 'State -> Set<'a> -> 'State",
            doc: "Applies the function to each element, threading an accumulator.",
          },
          iter: {
            sig: "('a -> unit) -> Set<'a> -> unit",
            doc: "Applies the function to each element of the set.",
          },
          exists: {
            sig: "('a -> bool) -> Set<'a> -> bool",
            doc: "Tests if any element satisfies the predicate.",
          },
          forall: {
            sig: "('a -> bool) -> Set<'a> -> bool",
            doc: "Tests if all elements satisfy the predicate.",
          },
          minElement: {
            sig: "Set<'a> -> 'a",
            doc: "Returns the lowest element in the set.",
          },
          maxElement: {
            sig: "Set<'a> -> 'a",
            doc: "Returns the highest element in the set.",
          },
          isSubset: {
            sig: "Set<'a> -> Set<'a> -> bool",
            doc: "Evaluates to true if all elements of the first set are in the second.",
          },
          isSuperset: {
            sig: "Set<'a> -> Set<'a> -> bool",
            doc: "Evaluates to true if all elements of the second set are in the first.",
          },
        },
      },
      Option: {
        doc: "Contains operations for working with option values.",
        members: {
          map: {
            sig: "('a -> 'b) -> 'a option -> 'b option",
            doc: "Transforms the option value by applying the function, or returns None.",
          },
          bind: {
            sig: "('a -> 'b option) -> 'a option -> 'b option",
            doc: "Invokes the function on Some, returning None if the input is None.",
          },
          filter: {
            sig: "('a -> bool) -> 'a option -> 'a option",
            doc: "Invokes the predicate on Some, returning None if it returns false.",
          },
          defaultValue: {
            sig: "'a -> 'a option -> 'a",
            doc: "Gets the value of the option if it is Some, otherwise returns the specified default value.",
          },
          defaultWith: {
            sig: "(unit -> 'a) -> 'a option -> 'a",
            doc: "Gets the value of the option if it is Some, otherwise calls the function for the default.",
          },
          get: {
            sig: "'a option -> 'a",
            doc: "Gets the value of a Some option. Throws if None.",
          },
          isSome: {
            sig: "'a option -> bool",
            doc: "Returns true if the option is Some.",
          },
          isNone: {
            sig: "'a option -> bool",
            doc: "Returns true if the option is None.",
          },
          toList: {
            sig: "'a option -> 'a list",
            doc: "Convert to a list of zero or one elements.",
          },
          toArray: {
            sig: "'a option -> 'a[]",
            doc: "Convert to an array of zero or one elements.",
          },
          count: {
            sig: "'a option -> int",
            doc: "Returns 0 for None, 1 for Some.",
          },
          iter: {
            sig: "('a -> unit) -> 'a option -> unit",
            doc: "Applies the function to the value if Some.",
          },
          exists: {
            sig: "('a -> bool) -> 'a option -> bool",
            doc: "Returns true if Some and the predicate returns true.",
          },
          forall: {
            sig: "('a -> bool) -> 'a option -> bool",
            doc: "Returns true if None or the predicate returns true.",
          },
          flatten: {
            sig: "'a option option -> 'a option",
            doc: "Flattens a nested option.",
          },
          ofNullable: {
            sig: "System.Nullable<'a> -> 'a option",
            doc: "Convert a Nullable to an option.",
          },
          ofObj: {
            sig: "'a -> 'a option",
            doc: "Convert a potentially null value to an option. Returns None for null.",
          },
          toNullable: {
            sig: "'a option -> System.Nullable<'a>",
            doc: "Convert an option to a Nullable value.",
          },
          toObj: {
            sig: "'a option -> 'a",
            doc: "Convert an option to a potentially null value.",
          },
        },
      },
      Result: {
        doc: "Contains operations for working with Result values.",
        members: {
          map: {
            sig: "('a -> 'b) -> Result<'a,'Error> -> Result<'b,'Error>",
            doc: "Maps the Ok value using the given function.",
          },
          mapError: {
            sig: "('a -> 'b) -> Result<'T,'a> -> Result<'T,'b>",
            doc: "Maps the Error value using the given function.",
          },
          bind: {
            sig: "('a -> Result<'b,'Error>) -> Result<'a,'Error> -> Result<'b,'Error>",
            doc: "Applies the function to the Ok value, or propagates Error.",
          },
          isOk: {
            sig: "Result<'T,'Error> -> bool",
            doc: "Returns true if the result is Ok.",
          },
          isError: {
            sig: "Result<'T,'Error> -> bool",
            doc: "Returns true if the result is Error.",
          },
          defaultValue: {
            sig: "'T -> Result<'T,'Error> -> 'T",
            doc: "Gets the Ok value or the default.",
          },
          defaultWith: {
            sig: "('Error -> 'T) -> Result<'T,'Error> -> 'T",
            doc: "Gets the Ok value or computes a default from the error.",
          },
          toOption: {
            sig: "Result<'T,'Error> -> 'T option",
            doc: "Converts to Some if Ok, or None if Error.",
          },
        },
      },
      String: {
        doc: "Contains operations for working with strings.",
        members: {
          concat: {
            sig: "string -> seq<string> -> string",
            doc: "Returns a new string by concatenating the strings with a separator.",
          },
          length: {
            sig: "string -> int",
            doc: "Returns the number of characters in the string.",
          },
          replicate: {
            sig: "int -> string -> string",
            doc: "Returns a string by concatenating a specified number of copies.",
          },
          exists: {
            sig: "(char -> bool) -> string -> bool",
            doc: "Tests if any character satisfies the predicate.",
          },
          forall: {
            sig: "(char -> bool) -> string -> bool",
            doc: "Tests if all characters satisfy the predicate.",
          },
          init: {
            sig: "int -> (int -> string) -> string",
            doc: "Creates a new string whose characters are the results of applying a function.",
          },
          collect: {
            sig: "(char -> string) -> string -> string",
            doc: "Builds a new string by applying a function to each character and concatenating results.",
          },
          iter: {
            sig: "(char -> unit) -> string -> unit",
            doc: "Applies the function to each character in the string.",
          },
          map: {
            sig: "(char -> char) -> string -> string",
            doc: "Builds a new string by applying the function to each character.",
          },
          filter: {
            sig: "(char -> bool) -> string -> string",
            doc: "Builds a new string containing only characters satisfying the predicate.",
          },
        },
      },
      Async: {
        doc: "Contains operations for composing asynchronous computations.",
        members: {
          RunSynchronously: {
            sig: "Async<'T> -> 'T",
            doc: "Runs an asynchronous computation and awaits its result synchronously.",
          },
          Start: {
            sig: "Async<unit> -> unit",
            doc: "Starts the asynchronous computation in the background.",
          },
          StartAsTask: {
            sig: "Async<'T> -> System.Threading.Tasks.Task<'T>",
            doc: "Executes the computation and returns the result as a Task.",
          },
          AwaitTask: {
            sig: "System.Threading.Tasks.Task<'T> -> Async<'T>",
            doc: "Returns an asynchronous computation that waits for the task to complete.",
          },
          Sleep: {
            sig: "int -> Async<unit>",
            doc: "Creates an asynchronous computation that sleeps for the given milliseconds.",
          },
          Parallel: {
            sig: "seq<Async<'T>> -> Async<'T[]>",
            doc: "Creates a computation that runs all computations in parallel.",
          },
          Sequential: {
            sig: "seq<Async<'T>> -> Async<'T[]>",
            doc: "Creates a computation that runs all computations sequentially.",
          },
          Catch: {
            sig: "Async<'T> -> Async<Choice<'T, exn>>",
            doc: "Creates an async that catches exceptions.",
          },
          Ignore: {
            sig: "Async<'T> -> Async<unit>",
            doc: "Creates an async computation that runs the given one and ignores its result.",
          },
          StartChild: {
            sig: "Async<'T> -> Async<Async<'T>>",
            doc: "Starts a child computation as a detached async.",
          },
          CancellationToken: {
            sig: "Async<System.Threading.CancellationToken>",
            doc: "Creates an async that returns the cancellation token.",
          },
        },
      },
      printfn: {
        doc: "Prints formatted output to stdout, followed by a newline.",
        sig: "Printf.TextWriterFormat<'T> -> 'T",
      },
      printf: {
        doc: "Prints formatted output to stdout.",
        sig: "Printf.TextWriterFormat<'T> -> 'T",
      },
      sprintf: {
        doc: "Returns a formatted string.",
        sig: "Printf.StringFormat<'T> -> 'T",
      },
      failwith: {
        doc: "Throw a System.Exception with the given message.",
        sig: "string -> 'T",
      },
      raise: {
        doc: "Throw the given exception.",
        sig: "exn -> 'T",
      },
      invalidArg: {
        doc: "Throw a System.ArgumentException.",
        sig: "string -> string -> 'T",
      },
      ignore: {
        doc: "Ignore the value. Used to discard results.",
        sig: "'T -> unit",
      },
      id: {
        doc: "The identity function.",
        sig: "'T -> 'T",
      },
      fst: {
        doc: "Return the first element of a tuple.",
        sig: "'T1 * 'T2 -> 'T1",
      },
      snd: {
        doc: "Return the second element of a tuple.",
        sig: "'T1 * 'T2 -> 'T2",
      },
      not: {
        doc: "Boolean negation.",
        sig: "bool -> bool",
      },
      typeof: {
        doc: "Returns the System.Type of the given type argument.",
        sig: "Type",
      },
      box: {
        doc: "Boxes a strongly typed value.",
        sig: "'T -> obj",
      },
      unbox: {
        doc: "Unboxes a strongly typed value.",
        sig: "obj -> 'T",
      },
      ref: {
        doc: "Creates a mutable reference cell.",
        sig: "'T -> 'T ref",
      },
      stdin: {
        doc: "Reads a value from the standard input stream.",
        sig: "System.IO.TextReader",
      },
      stdout: {
        doc: "The standard output stream.",
        sig: "System.IO.TextWriter",
      },
      stderr: {
        doc: "The standard error stream.",
        sig: "System.IO.TextWriter",
      },
    },
  };

  // ─── Track definitions in the current file ─────────────────────
  function parseDefinitions(model) {
    const defs = {};
    const lines = model.getLinesContent();
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      let m;
      // let bindings
      m = line.match(/^\s*let\s+(rec\s+)?(\w+)/);
      if (m) {
        const name = m[2];
        defs[name] = {
          line: i + 1,
          col: line.indexOf(name) + 1,
          kind: "let",
          fullLine: line.trim(),
        };
      }
      // type definitions
      m = line.match(/^\s*type\s+(\w+)/);
      if (m) {
        const name = m[1];
        defs[name] = {
          line: i + 1,
          col: line.indexOf(name) + 1,
          kind: "type",
          fullLine: line.trim(),
        };
      }
      // module definitions
      m = line.match(/^\s*module\s+(\w+)/);
      if (m) {
        const name = m[1];
        defs[name] = {
          line: i + 1,
          col: line.indexOf(name) + 1,
          kind: "module",
          fullLine: line.trim(),
        };
      }
      // member definitions
      m = line.match(/^\s*member\s+\w+\.(\w+)/);
      if (m) {
        const name = m[1];
        defs[name] = {
          line: i + 1,
          col: line.indexOf(name) + 1,
          kind: "member",
          fullLine: line.trim(),
        };
      }
    }
    return defs;
  }

  // ─── Completion Provider ───────────────────────────────────────
  monaco.languages.registerCompletionItemProvider("fsharp", {
    triggerCharacters: [".", " "],
    provideCompletionItems: function (model, position) {
      const textUntilPosition = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };
      const suggestions = [];

      // Dot completion for module members
      const dotMatch = textUntilPosition.match(/(\w+)\.\s*$/);
      if (dotMatch) {
        const modName = dotMatch[1];
        const modDef = fsharpStdLib.modules[modName];
        if (modDef && modDef.members) {
          for (const [name, info] of Object.entries(modDef.members)) {
            suggestions.push({
              label: name,
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: name,
              detail: `${modName}.${name}: ${info.sig}`,
              documentation: {
                value: `**${modName}.${name}**\n\n\`${info.sig}\`\n\n${info.doc}`,
              },
              range: range,
            });
          }
          return { suggestions };
        }
      }

      // Keywords
      const keywords = [
        "abstract",
        "and",
        "as",
        "assert",
        "base",
        "begin",
        "class",
        "default",
        "delegate",
        "do",
        "done",
        "downcast",
        "downto",
        "elif",
        "else",
        "end",
        "exception",
        "extern",
        "false",
        "finally",
        "fixed",
        "for",
        "fun",
        "function",
        "global",
        "if",
        "in",
        "inherit",
        "inline",
        "interface",
        "internal",
        "lazy",
        "let",
        "match",
        "member",
        "module",
        "mutable",
        "namespace",
        "new",
        "not",
        "null",
        "of",
        "open",
        "or",
        "override",
        "private",
        "public",
        "rec",
        "return",
        "select",
        "static",
        "struct",
        "then",
        "to",
        "true",
        "try",
        "type",
        "upcast",
        "use",
        "val",
        "void",
        "when",
        "while",
        "with",
        "yield",
        "async",
        "task",
        "do!",
      ];
      keywords.forEach((kw) => {
        suggestions.push({
          label: kw,
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: kw,
          range: range,
        });
      });

      // Standard modules
      Object.keys(fsharpStdLib.modules).forEach((mod) => {
        const info = fsharpStdLib.modules[mod];
        if (info.members) {
          suggestions.push({
            label: mod,
            kind: monaco.languages.CompletionItemKind.Module,
            insertText: mod,
            detail: `module ${mod}`,
            documentation: { value: `**${mod}**\n\n${info.doc}` },
            range: range,
          });
        } else {
          suggestions.push({
            label: mod,
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: mod,
            detail: info.sig || "",
            documentation: { value: `**${mod}**\n\n${info.doc}` },
            range: range,
          });
        }
      });

      // Built-in types
      const types = [
        { label: "int", detail: "System.Int32", doc: "32-bit signed integer" },
        {
          label: "float",
          detail: "System.Double",
          doc: "64-bit double-precision floating-point number",
        },
        {
          label: "bool",
          detail: "System.Boolean",
          doc: "Boolean type (true/false)",
        },
        {
          label: "string",
          detail: "System.String",
          doc: "Unicode text string",
        },
        { label: "char", detail: "System.Char", doc: "Unicode character" },
        { label: "byte", detail: "System.Byte", doc: "8-bit unsigned integer" },
        {
          label: "unit",
          detail: "unit",
          doc: "Indicates the absence of a value",
        },
        {
          label: "decimal",
          detail: "System.Decimal",
          doc: "128-bit decimal number",
        },
        {
          label: "int64",
          detail: "System.Int64",
          doc: "64-bit signed integer",
        },
        {
          label: "uint32",
          detail: "System.UInt32",
          doc: "32-bit unsigned integer",
        },
        {
          label: "float32",
          detail: "System.Single",
          doc: "32-bit single-precision floating-point",
        },
        {
          label: "bigint",
          detail: "System.Numerics.BigInteger",
          doc: "Arbitrary precision integer",
        },
        {
          label: "option",
          detail: "'T option",
          doc: "Represents a value that may or may not exist",
        },
        {
          label: "list",
          detail: "'T list",
          doc: "Immutable singly-linked list",
        },
        {
          label: "array",
          detail: "'T array",
          doc: "Mutable fixed-size collection",
        },
        {
          label: "seq",
          detail: "seq<'T>",
          doc: "Lazily evaluated sequence (IEnumerable<T>)",
        },
        {
          label: "Map",
          detail: "Map<'Key,'Value>",
          doc: "Immutable key-value lookup",
        },
        {
          label: "Set",
          detail: "Set<'T>",
          doc: "Immutable set of distinct values",
        },
        {
          label: "Result",
          detail: "Result<'T,'TError>",
          doc: "Represents either a success (Ok) or failure (Error) value",
        },
        {
          label: "Lazy",
          detail: "Lazy<'T>",
          doc: "A value computed on first access",
        },
        {
          label: "Async",
          detail: "Async<'T>",
          doc: "An asynchronous computation",
        },
        {
          label: "Task",
          detail: "Task<'T>",
          doc: "A .NET Task representing an asynchronous operation",
        },
        {
          label: "exn",
          detail: "System.Exception",
          doc: "Base exception type",
        },
        {
          label: "obj",
          detail: "System.Object",
          doc: "Base type of all .NET objects",
        },
        {
          label: "nativeint",
          detail: "System.IntPtr",
          doc: "Native-sized signed integer",
        },
        {
          label: "unativeint",
          detail: "System.UIntPtr",
          doc: "Native-sized unsigned integer",
        },
      ];
      types.forEach((t) => {
        suggestions.push({
          label: t.label,
          kind: monaco.languages.CompletionItemKind.TypeParameter,
          insertText: t.label,
          detail: t.detail,
          documentation: t.doc,
          range: range,
        });
      });

      // Symbols from current file
      const defs = parseDefinitions(model);
      for (const [name, info] of Object.entries(defs)) {
        let k = monaco.languages.CompletionItemKind.Variable;
        if (info.kind === "type") k = monaco.languages.CompletionItemKind.Class;
        if (info.kind === "module")
          k = monaco.languages.CompletionItemKind.Module;
        if (info.kind === "member")
          k = monaco.languages.CompletionItemKind.Method;
        suggestions.push({
          label: name,
          kind: k,
          insertText: name,
          detail: info.fullLine,
          documentation: `Defined at line ${info.line}`,
          range: range,
        });
      }

      return { suggestions };
    },
  });

  // ─── Snippets Provider ─────────────────────────────────────────
  monaco.languages.registerCompletionItemProvider("fsharp", {
    triggerCharacters: [],
    provideCompletionItems: function (model, position) {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };
      const snippets = [
        {
          label: "let",
          detail: "let binding",
          insertText: "let ${1:name} = ${2:value}",
          doc: "Declares an immutable value binding.",
        },
        {
          label: "let mutable",
          detail: "mutable let binding",
          insertText: "let mutable ${1:name} = ${2:value}",
          doc: "Declares a mutable variable.",
        },
        {
          label: "let rec",
          detail: "recursive let binding",
          insertText: "let rec ${1:name} ${2:args} =\n    ${3:body}",
          doc: "Declares a recursive function.",
        },
        {
          label: "let fun",
          detail: "function binding",
          insertText: "let ${1:name} (${2:param}: ${3:type}) =\n    ${4:body}",
          doc: "Declares a function with typed parameter.",
        },
        {
          label: "if",
          detail: "if expression",
          insertText:
            "if ${1:condition} then\n    ${2:trueExpr}\nelse\n    ${3:falseExpr}",
          doc: "Conditional expression.",
        },
        {
          label: "if then",
          detail: "if-then (no else)",
          insertText: "if ${1:condition} then\n    ${2:body}",
          doc: "Conditional without else branch.",
        },
        {
          label: "match",
          detail: "match expression",
          insertText:
            "match ${1:value} with\n| ${2:pattern} -> ${3:result}\n| _ -> ${4:defaultResult}",
          doc: "Pattern matching expression.",
        },
        {
          label: "for",
          detail: "for loop",
          insertText: "for ${1:i} in ${2:range} do\n    ${3:body}",
          doc: "For loop over a range or collection.",
        },
        {
          label: "for to",
          detail: "for..to loop",
          insertText: "for ${1:i} = ${2:start} to ${3:end} do\n    ${4:body}",
          doc: "For loop with integer range.",
        },
        {
          label: "while",
          detail: "while loop",
          insertText: "while ${1:condition} do\n    ${2:body}",
          doc: "While loop.",
        },
        {
          label: "try with",
          detail: "try-with",
          insertText:
            "try\n    ${1:body}\nwith\n| :? ${2:System.Exception} as ex ->\n    ${3:handler}",
          doc: "Exception handling with try-with.",
        },
        {
          label: "try finally",
          detail: "try-finally",
          insertText: "try\n    ${1:body}\nfinally\n    ${2:cleanup}",
          doc: "Try-finally block for cleanup.",
        },
        {
          label: "type record",
          detail: "record type",
          insertText:
            "type ${1:Name} =\n    { ${2:Field1}: ${3:Type1}\n      ${4:Field2}: ${5:Type2} }",
          doc: "Defines a record type.",
        },
        {
          label: "type du",
          detail: "discriminated union",
          insertText:
            "type ${1:Name} =\n    | ${2:Case1} of ${3:Type1}\n    | ${4:Case2} of ${5:Type2}",
          doc: "Defines a discriminated union type.",
        },
        {
          label: "type class",
          detail: "class type",
          insertText:
            "type ${1:Name}(${2:param}: ${3:type}) =\n    member this.${4:Property} = ${5:value}\n    member this.${6:Method}() = ${7:body}",
          doc: "Defines a class type with constructor.",
        },
        {
          label: "type interface",
          detail: "interface",
          insertText:
            "type ${1:IName} =\n    abstract member ${2:Method}: ${3:signature}",
          doc: "Defines an interface type.",
        },
        {
          label: "type enum",
          detail: "enum type",
          insertText:
            "type ${1:Name} =\n    | ${2:Value1} = ${3:0}\n    | ${4:Value2} = ${5:1}",
          doc: "Defines an enum type.",
        },
        {
          label: "module",
          detail: "module declaration",
          insertText: "module ${1:Name} =\n\n    ${2:// module contents}",
          doc: "Declares a module.",
        },
        {
          label: "open",
          detail: "open module",
          insertText: "open ${1:ModuleName}",
          doc: "Opens a module or namespace.",
        },
        {
          label: "printfn",
          detail: "print with newline",
          insertText: 'printfn "${1:%s}" ${2:value}',
          doc: "Prints formatted text to stdout followed by a newline.",
        },
        {
          label: "async block",
          detail: "async computation",
          insertText:
            "async {\n    let! ${1:result} = ${2:asyncOp}\n    return ${3:result}\n}",
          doc: "Creates an async computation expression.",
        },
        {
          label: "task block",
          detail: "task computation",
          insertText:
            "task {\n    let! ${1:result} = ${2:taskOp}\n    return ${3:result}\n}",
          doc: "Creates a task computation expression.",
        },
        {
          label: "seq block",
          detail: "seq computation",
          insertText:
            "seq {\n    for ${1:x} in ${2:collection} do\n        yield ${3:x}\n}",
          doc: "Creates a sequence computation expression.",
        },
        {
          label: "pipe",
          detail: "pipe chain",
          insertText: "|> ${1:List}.${2:map} (fun ${3:x} -> ${4:x})",
          doc: "Pipe operator with function application.",
        },
        {
          label: "lambda",
          detail: "lambda expression",
          insertText: "fun ${1:x} -> ${2:body}",
          doc: "Anonymous function (lambda).",
        },
        {
          label: "list comp",
          detail: "list comprehension",
          insertText:
            "[ for ${1:x} in ${2:collection} do\n      yield ${3:x} ]",
          doc: "List comprehension expression.",
        },
        {
          label: "array comp",
          detail: "array comprehension",
          insertText:
            "[| for ${1:x} in ${2:collection} do\n       yield ${3:x} |]",
          doc: "Array comprehension expression.",
        },
        {
          label: "member",
          detail: "member declaration",
          insertText: "member this.${1:Name}(${2:args}) =\n    ${3:body}",
          doc: "Declares a member in a type.",
        },
        {
          label: "member prop",
          detail: "property member",
          insertText:
            "member this.${1:Name}\n    with get() = ${2:getter}\n    and set(value) = ${3:setter}",
          doc: "Declares a property with getter and setter.",
        },
        {
          label: "static member",
          detail: "static member",
          insertText: "static member ${1:Name}(${2:args}) =\n    ${3:body}",
          doc: "Declares a static member.",
        },
        {
          label: "override",
          detail: "override member",
          insertText: "override this.${1:Name}(${2:args}) =\n    ${3:body}",
          doc: "Overrides a virtual member.",
        },
        {
          label: "use",
          detail: "use binding",
          insertText: "use ${1:name} = ${2:disposable}",
          doc: "Binds a disposable value that will be disposed at the end of scope.",
        },
        {
          label: "EntryPoint",
          detail: "[<EntryPoint>] main",
          insertText:
            '[<EntryPoint>]\nlet main argv =\n    ${1:// main function body}\n    printfn "Hello, World!"\n    0',
          doc: "Application entry point.",
        },
        {
          label: "test",
          detail: "unit test stub",
          insertText:
            "[<Test>]\nlet ``${1:test name}`` () =\n    // Arrange\n    let ${2:expected} = ${3:value}\n    // Act\n    let ${4:actual} = ${5:expression}\n    // Assert\n    Assert.AreEqual(${2:expected}, ${4:actual})",
          doc: "Unit test function stub.",
        },
        {
          label: "pattern active",
          detail: "active pattern",
          insertText:
            "let (|${1:Pattern1}|${2:Pattern2}|) ${3:input} =\n    if ${4:condition} then ${1:Pattern1}\n    else ${2:Pattern2}",
          doc: "Defines an active pattern.",
        },
        {
          label: "comp expr",
          detail: "computation expression builder",
          insertText:
            "type ${1:Name}Builder() =\n    member _.Bind(x, f) = ${2:bind x f}\n    member _.Return(x) = ${3:return x}\n    member _.Zero() = ${4:zero}\n\nlet ${5:name} = ${1:Name}Builder()",
          doc: "Defines a computation expression builder.",
        },
        {
          label: "result",
          detail: "Result pattern",
          insertText:
            "match ${1:result} with\n| Ok ${2:value} -> ${3:successHandler}\n| Error ${4:err} -> ${5:errorHandler}",
          doc: "Pattern match on Result type.",
        },
        {
          label: "option match",
          detail: "Option pattern",
          insertText:
            "match ${1:opt} with\n| Some ${2:value} -> ${3:handler}\n| None -> ${4:default}",
          doc: "Pattern match on Option type.",
        },
        {
          label: "measure",
          detail: "unit of measure",
          insertText:
            "[<Measure>] type ${1:unit}\nlet ${2:value} = ${3:1.0}<${1:unit}>",
          doc: "Defines a unit of measure type.",
        },
      ];
      return {
        suggestions: snippets.map((s) => ({
          label: s.label,
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: s.insertText,
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          detail: "⬡ " + s.detail,
          documentation: { value: s.doc },
          range: range,
          sortText: "0" + s.label, // sort snippets to the top
        })),
      };
    },
  });

  // ─── Hover Provider ────────────────────────────────────────────
  monaco.languages.registerHoverProvider("fsharp", {
    provideHover: function (model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return null;
      const token = word.word;

      // Check current file definitions
      const defs = parseDefinitions(model);
      if (defs[token]) {
        const d = defs[token];
        return {
          range: new monaco.Range(
            position.lineNumber,
            word.startColumn,
            position.lineNumber,
            word.endColumn,
          ),
          contents: [
            { value: `**${d.kind}** \`${token}\`` },
            { value: "```fsharp\n" + d.fullLine + "\n```" },
            { value: `*Defined at line ${d.line}*` },
          ],
        };
      }

      // Check line for Module.member pattern
      const lineContent = model.getLineContent(position.lineNumber);
      const beforeWord = lineContent.substring(0, word.startColumn - 1);
      const modMatch = beforeWord.match(/(\w+)\.$/);
      if (modMatch) {
        const modName = modMatch[1];
        const modDef = fsharpStdLib.modules[modName];
        if (modDef && modDef.members && modDef.members[token]) {
          const info = modDef.members[token];
          return {
            range: new monaco.Range(
              position.lineNumber,
              word.startColumn,
              position.lineNumber,
              word.endColumn,
            ),
            contents: [
              { value: `**${modName}.${token}**` },
              { value: "```fsharp\nval " + token + ": " + info.sig + "\n```" },
              { value: info.doc },
            ],
          };
        }
      }

      // Check standard library modules
      const modDef = fsharpStdLib.modules[token];
      if (modDef) {
        if (modDef.members) {
          const memberList = Object.keys(modDef.members)
            .slice(0, 10)
            .join(", ");
          return {
            range: new monaco.Range(
              position.lineNumber,
              word.startColumn,
              position.lineNumber,
              word.endColumn,
            ),
            contents: [
              { value: `**module ${token}**` },
              { value: modDef.doc },
              { value: `*Members:* ${memberList}, ...` },
            ],
          };
        } else {
          return {
            range: new monaco.Range(
              position.lineNumber,
              word.startColumn,
              position.lineNumber,
              word.endColumn,
            ),
            contents: [
              { value: `**${token}**` },
              {
                value: "```fsharp\nval " + token + ": " + modDef.sig + "\n```",
              },
              { value: modDef.doc },
            ],
          };
        }
      }

      // Check keywords
      const keywordDocs = {
        let: "Associates a name with a value or function.\n```fsharp\nlet x = 42\nlet add a b = a + b\n```",
        "let!":
          "Binds the result of an asynchronous expression within a computation expression.\n```fsharp\nlet! result = asyncOperation()\n```",
        match:
          'Pattern matching expression.\n```fsharp\nmatch x with\n| 0 -> "zero"\n| _ -> "other"\n```',
        "match!":
          "Combines match with let! for pattern matching on async results.\n```fsharp\nmatch! asyncExpr with\n| Some x -> ...\n| None -> ...\n```",
        type: "Declares a type (class, record, DU, enum, interface, struct).\n```fsharp\ntype Person = { Name: string; Age: int }\n```",
        module:
          "Declares a module to organize related code.\n```fsharp\nmodule MyModule =\n    let x = 42\n```",
        open: "Imports a namespace or module into the current scope.\n```fsharp\nopen System.IO\n```",
        if: 'Conditional branching expression.\n```fsharp\nif x > 0 then "positive" else "non-positive"\n```',
        for: 'Looping construct.\n```fsharp\nfor i in 1..10 do printfn "%d" i\n```',
        while:
          "Looping construct that repeats while a condition is true.\n```fsharp\nwhile condition do body\n```",
        fun: "Lambda (anonymous function) expression.\n```fsharp\nfun x -> x + 1\n```",
        function:
          'Shorthand for a lambda with pattern matching.\n```fsharp\nfunction | 0 -> "zero" | _ -> "other"\n```',
        rec: "Indicates a recursive function.\n```fsharp\nlet rec factorial n = if n <= 1 then 1 else n * factorial (n-1)\n```",
        mutable:
          "Declares a mutable variable (can be changed with `<-`).\n```fsharp\nlet mutable x = 0\nx <- 42\n```",
        async:
          "Async computation expression for asynchronous programming.\n```fsharp\nasync { let! data = fetchAsync() return data }\n```",
        task: "Task computation expression (hot-start async).\n```fsharp\ntask { let! data = httpClient.GetAsync(url) return data }\n```",
        yield:
          "Produces a value in a sequence or computation expression.\n```fsharp\nseq { yield 1; yield 2 }\n```",
        "yield!":
          "Produces all values from a sub-sequence.\n```fsharp\nseq { yield! [1;2;3] }\n```",
        return:
          "Returns a value from a computation expression.\n```fsharp\nasync { return 42 }\n```",
        "return!":
          "Returns the result of a computation expression.\n```fsharp\nasync { return! otherAsync }\n```",
        use: 'Like let but calls Dispose on the value when it goes out of scope.\n```fsharp\nuse stream = File.OpenRead("file.txt")\n```',
        "use!":
          "Like let! but calls Dispose when it goes out of scope.\n```fsharp\nuse! conn = openConnectionAsync()\n```",
        try: "Begins an exception handling block.\n```fsharp\ntry riskyOp() with | ex -> handleError ex\n```",
        with: "Used with match, try, and type expressions.",
        do: 'Executes an expression for its side effects.\n```fsharp\ndo printfn "Hello"\n```',
        "do!":
          "Executes an async expression for its side effects within a computation expression.",
        new: "Creates a new instance of a type.\n```fsharp\nlet obj = new System.Object()\n```",
        namespace:
          "Declares a namespace.\n```fsharp\nnamespace MyApp.Models\n```",
        member:
          "Declares a method or property on a type.\n```fsharp\nmember this.Name = name\n```",
        override:
          'Overrides a virtual or abstract member.\n```fsharp\noverride this.ToString() = sprintf "%s" name\n```',
        abstract:
          "Declares an abstract member.\n```fsharp\nabstract member Draw: unit -> unit\n```",
        interface:
          "Declares or implements an interface.\n```fsharp\ntype IDrawable = abstract member Draw: unit -> unit\n```",
        class: "Used in type declarations for class types.",
        struct:
          "Declares a value type (struct).\n```fsharp\n[<Struct>] type Point = { X: float; Y: float }\n```",
        inherit:
          "Specifies a base class.\n```fsharp\ntype Dog() = inherit Animal()\n```",
        inline:
          "Indicates a function should be inlined at call sites.\n```fsharp\nlet inline add x y = x + y\n```",
        lazy: "Specifies a computation that is deferred until its result is needed.\n```fsharp\nlet x = lazy (expensiveComputation())\n```",
        true: "Boolean literal `true`.",
        false: "Boolean literal `false`.",
        null: "Represents a null reference. Use with caution in F#.",
        of: "Used in discriminated unions and exception declarations.",
        val: "Used in signatures or type declarations to declare a value.",
        static: "Indicates a static member.",
        private: "Restricts access to the enclosing type.",
        public: "Allows access from anywhere.",
        internal: "Restricts access to the same assembly.",
        and: "Used for mutually recursive definitions or multiple type constraints.",
        or: "Boolean or operator (also `||`).",
        begin: "Marks the beginning of a code block (verbose syntax).",
        end: "Marks the end of a code block (verbose syntax).",
        done: "Marks the end of a loop body (verbose syntax).",
        in: "Used in for loops and sequence expressions.",
        then: "Used in conditional expressions after if/elif.",
        else: "Alternative branch in an if expression.",
        elif: "Else-if branch in a conditional.",
        finally: "Used with try for code that runs regardless of exceptions.",
        downto: "Used in for loops to count downward.",
        upcast:
          "Casts to a base type.\n```fsharp\nlet obj = upcast myDog : Animal\n```",
        downcast:
          "Casts to a derived type (may fail at runtime).\n```fsharp\nlet dog = downcast animal : Dog\n```",
        assert:
          "Runtime assertion that a condition is true.\n```fsharp\nassert (x > 0)\n```",
        exception:
          "Declares a custom exception type.\n```fsharp\nexception MyError of string\n```",
        delegate: "Declares a delegate type.",
        select: "Used in query expressions.",
        when: 'Adds a guard condition to a pattern.\n```fsharp\nmatch x with | n when n > 0 -> "positive"\n```',
        default: "Provides a default implementation for an abstract member.",
        void: "The .NET void type.",
        extern: "Declares an external function (P/Invoke).",
        global: "Refers to the top-level .NET namespace.",
        base: "Refers to the base class.\n```fsharp\nbase.ToString()\n```",
        as: "Gives a name to the current object in a type definition, or names a matched pattern.",
        fixed: "Pins a pointer to prevent garbage collection from moving it.",
        sig: "Begins a signature block (used in .fsi files).",
        constraint: "Used to specify type constraints.",
      };
      if (keywordDocs[token]) {
        return {
          range: new monaco.Range(
            position.lineNumber,
            word.startColumn,
            position.lineNumber,
            word.endColumn,
          ),
          contents: [
            { value: `**keyword** \`${token}\`` },
            { value: keywordDocs[token] },
          ],
        };
      }

      return null;
    },
  });

  // ─── Definition Provider ───────────────────────────────────────
  monaco.languages.registerDefinitionProvider("fsharp", {
    provideDefinition: function (model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return null;
      const token = word.word;

      const defs = parseDefinitions(model);
      if (defs[token]) {
        return {
          uri: model.uri,
          range: new monaco.Range(
            defs[token].line,
            defs[token].col,
            defs[token].line,
            defs[token].col + token.length,
          ),
        };
      }
      return null;
    },
  });

  // ─── Signature Help Provider ───────────────────────────────────
  monaco.languages.registerSignatureHelpProvider("fsharp", {
    signatureHelpTriggerCharacters: ["(", " "],
    signatureHelpRetriggerCharacters: [","],
    provideSignatureHelp: function (model, position) {
      const textUntilPosition = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });
      // Look for Module.function pattern
      const m = textUntilPosition.match(/(\w+)\.(\w+)\s*$/);
      if (m) {
        const modName = m[1];
        const funcName = m[2];
        const modDef = fsharpStdLib.modules[modName];
        if (modDef && modDef.members && modDef.members[funcName]) {
          const info = modDef.members[funcName];
          return {
            value: {
              signatures: [
                {
                  label: `${modName}.${funcName}: ${info.sig}`,
                  documentation: { value: info.doc },
                  parameters: [],
                },
              ],
              activeSignature: 0,
              activeParameter: 0,
            },
            dispose: function () {},
          };
        }
      }
      // Check standalone functions
      const fm = textUntilPosition.match(/(\w+)\s+$/);
      if (fm) {
        const fn = fm[1];
        const fnDef = fsharpStdLib.modules[fn];
        if (fnDef && fnDef.sig) {
          return {
            value: {
              signatures: [
                {
                  label: `${fn}: ${fnDef.sig}`,
                  documentation: { value: fnDef.doc },
                  parameters: [],
                },
              ],
              activeSignature: 0,
              activeParameter: 0,
            },
            dispose: function () {},
          };
        }
      }
      return null;
    },
  });

  // ─── Document Symbol Provider ──────────────────────────────────
  monaco.languages.registerDocumentSymbolProvider("fsharp", {
    provideDocumentSymbols: function (model) {
      const symbols = [];
      const defs = parseDefinitions(model);
      for (const [name, info] of Object.entries(defs)) {
        let kind;
        switch (info.kind) {
          case "type":
            kind = monaco.languages.SymbolKind.Class;
            break;
          case "module":
            kind = monaco.languages.SymbolKind.Module;
            break;
          case "member":
            kind = monaco.languages.SymbolKind.Method;
            break;
          default:
            kind = monaco.languages.SymbolKind.Variable;
            break;
        }
        symbols.push({
          name: name,
          detail: info.fullLine,
          kind: kind,
          range: new monaco.Range(
            info.line,
            1,
            info.line,
            info.fullLine.length + 1,
          ),
          selectionRange: new monaco.Range(
            info.line,
            info.col,
            info.line,
            info.col + name.length,
          ),
        });
      }
      return symbols;
    },
  });

  // ─── Folding Range Provider ────────────────────────────────────
  monaco.languages.registerFoldingRangeProvider("fsharp", {
    provideFoldingRanges: function (model) {
      const ranges = [];
      const lines = model.getLinesContent();
      const stack = [];
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();
        const indent = line.search(/\S/);
        if (indent < 0) continue;

        // Block comments
        if (trimmed.startsWith("(*") && !trimmed.includes("*)")) {
          stack.push({
            start: i + 1,
            kind: monaco.languages.FoldingRangeKind.Comment,
          });
        }
        if (
          trimmed.includes("*)") &&
          stack.length &&
          stack[stack.length - 1].kind ===
            monaco.languages.FoldingRangeKind.Comment
        ) {
          const s = stack.pop();
          ranges.push({ start: s.start, end: i + 1, kind: s.kind });
        }

        // Regions
        if (trimmed.match(/^\/\/\s*#region/i)) {
          stack.push({
            start: i + 1,
            kind: monaco.languages.FoldingRangeKind.Region,
          });
        }
        if (
          trimmed.match(/^\/\/\s*#endregion/i) &&
          stack.length &&
          stack[stack.length - 1].kind ===
            monaco.languages.FoldingRangeKind.Region
        ) {
          const s = stack.pop();
          ranges.push({ start: s.start, end: i + 1, kind: s.kind });
        }

        // Simple indent-based folding for let, type, module, match, if, for, while
        if (
          trimmed.match(/^(let|type|module|member|match|if|for|while|try)\b/) &&
          i + 1 < lines.length
        ) {
          const nextNonEmpty = lines
            .slice(i + 1)
            .findIndex((l) => l.trim().length > 0);
          if (nextNonEmpty >= 0) {
            const nextLine = lines[i + 1 + nextNonEmpty];
            const nextIndent = nextLine.search(/\S/);
            if (nextIndent > indent) {
              // Find the end of this block
              let endLine = i + 1;
              for (let j = i + 1; j < lines.length; j++) {
                const jTrimmed = lines[j].trim();
                if (jTrimmed.length === 0) continue;
                const jIndent = lines[j].search(/\S/);
                if (jIndent <= indent) break;
                endLine = j;
              }
              if (endLine > i) {
                ranges.push({ start: i + 1, end: endLine + 1 });
              }
            }
          }
        }
      }
      return ranges;
    },
  });

  // ─── Diagnostic Markers (basic linting) ────────────────────────
  function validateFSharp(model) {
    const markers = [];
    const lines = model.getLinesContent();
    const openModules = new Set();

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      // Check for unused open declarations (very basic)
      const openMatch = trimmed.match(/^open\s+([\w.]+)/);
      if (openMatch) {
        openModules.add({
          name: openMatch[1],
          line: i + 1,
          col: line.indexOf(openMatch[1]) + 1,
        });
      }

      // Check for incomplete let bindings
      if (trimmed.match(/^let\s+$/) || trimmed.match(/^let\s+=\s*$/)) {
        markers.push({
          severity: monaco.MarkerSeverity.Error,
          message: "Incomplete let binding: missing identifier and/or value.",
          startLineNumber: i + 1,
          startColumn: 1,
          endLineNumber: i + 1,
          endColumn: line.length + 1,
          source: "F# Lint",
        });
      }

      // Check for tab characters (F# uses spaces for indentation)
      if (line.includes("\t")) {
        markers.push({
          severity: monaco.MarkerSeverity.Warning,
          message:
            "F# uses whitespace-sensitive syntax. Prefer spaces over tabs for indentation.",
          startLineNumber: i + 1,
          startColumn: line.indexOf("\t") + 1,
          endLineNumber: i + 1,
          endColumn: line.indexOf("\t") + 2,
          source: "F# Lint",
        });
      }

      // Warn about mutable in closures hint
      if (trimmed.match(/let mutable/) && i + 3 < lines.length) {
        const varMatch = trimmed.match(/let mutable\s+(\w+)/);
        if (varMatch) {
          const varName = varMatch[1];
          for (let j = i + 1; j < Math.min(i + 20, lines.length); j++) {
            if (
              lines[j].match(new RegExp("fun.*" + varName)) ||
              lines[j].match(new RegExp("async.*" + varName))
            ) {
              markers.push({
                severity: monaco.MarkerSeverity.Info,
                message: `Hint: Mutable variable '${varName}' may be captured in a closure. Consider using a ref cell instead.`,
                startLineNumber: i + 1,
                startColumn: line.indexOf("mutable") + 1,
                endLineNumber: i + 1,
                endColumn: line.indexOf("mutable") + 8,
                source: "F# Lint",
              });
              break;
            }
          }
        }
      }

      // Check for potential missing | in match
      if (trimmed === "match" || trimmed.match(/^match\s+\S+\s+with\s*$/)) {
        const nextLine = i + 1 < lines.length ? lines[i + 1].trim() : "";
        if (
          nextLine &&
          !nextLine.startsWith("|") &&
          !nextLine.startsWith("//") &&
          nextLine.length > 0
        ) {
          markers.push({
            severity: monaco.MarkerSeverity.Warning,
            message: 'Match expression cases should start with "|".',
            startLineNumber: i + 2,
            startColumn: 1,
            endLineNumber: i + 2,
            endColumn: lines[i + 1].length + 1,
            source: "F# Lint",
          });
        }
      }

      // Unclosed string literal (basic check)
      const stringCount = (trimmed.match(/(?<!\\)"/g) || []).length;
      if (
        stringCount % 2 !== 0 &&
        !trimmed.startsWith("//") &&
        !trimmed.includes("(*") &&
        !trimmed.match(/"""/) &&
        !trimmed.match(/@"/)
      ) {
        markers.push({
          severity: monaco.MarkerSeverity.Error,
          message: "Possible unclosed string literal.",
          startLineNumber: i + 1,
          startColumn: line.lastIndexOf('"') + 1,
          endLineNumber: i + 1,
          endColumn: line.length + 1,
          source: "F# Lint",
        });
      }
    }

    monaco.editor.setModelMarkers(model, "fsharp-lint", markers);
  }
};
