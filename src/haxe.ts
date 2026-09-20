import type * as Monaco from "monaco-editor";

export default (monaco: typeof Monaco) => {
  /* ------------------------------------------------------------------ */
  /*  1. LANGUAGE REGISTRATION                                          */
  /* ------------------------------------------------------------------ */
  monaco.languages.register({
    id: "haxe",
    extensions: [".hx", ".hxml"],
    aliases: ["Haxe", "haxe"],
  });

  /* ------------------------------------------------------------------ */
  /*  2. LANGUAGE CONFIGURATION (brackets, comments, auto-closing etc.) */
  /* ------------------------------------------------------------------ */
  monaco.languages.setLanguageConfiguration("haxe", {
    comments: { lineComment: "//", blockComment: ["/*", "*/"] },
    brackets: [
      ["{", "}"],
      ["[", "]"],
      ["(", ")"],
      ["<", ">"],
    ],
    autoClosingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: "<", close: ">" },
      { open: '"', close: '"', notIn: ["string"] },
      { open: "'", close: "'", notIn: ["string", "comment"] },
    ],
    surroundingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: "<", close: ">" },
      { open: '"', close: '"' },
      { open: "'", close: "'" },
    ],
    folding: {
      markers: {
        start: /^\s*\/\/\s*#?region\b/,
        end: /^\s*\/\/\s*#?endregion\b/,
      },
    },
    indentationRules: {
      increaseIndentPattern: /^.*\{[^}"']*$|^.*\([^)"']*$/,
      decreaseIndentPattern: /^\s*[}\)]/,
    },
    onEnterRules: [
      {
        beforeText: /^\s*\/\*\*(?!\/)([^*]|\*(?!\/))*$/,
        afterText: /^\s*\*\/$/,
        action: {
          indentAction: monaco.languages.IndentAction.IndentOutdent,
          appendText: " * ",
        },
      },
      {
        beforeText: /^\s*\/\*\*(?!\/)([^*]|\*(?!\/))*$/,
        action: {
          indentAction: monaco.languages.IndentAction.None,
          appendText: " * ",
        },
      },
      {
        beforeText: /^(\t|[ ])*[ ]\*([ ]([^*]|\*(?!\/))*)?$/,
        action: {
          indentAction: monaco.languages.IndentAction.None,
          appendText: "* ",
        },
      },
    ],
    wordPattern: /(-?\d*\.\d\w*)|([^`~!@#%^&*()\-=+\[{\]}\\|;:'",.<>\/?\s]+)/g,
  });

  /* ------------------------------------------------------------------ */
  /*  3. MONARCH SYNTAX HIGHLIGHTING                                    */
  /* ------------------------------------------------------------------ */
  monaco.languages.setMonarchTokensProvider("haxe", {
    defaultToken: "",
    tokenPostfix: ".hx",

    keywords: [
      "abstract",
      "break",
      "case",
      "cast",
      "catch",
      "class",
      "continue",
      "default",
      "do",
      "dynamic",
      "else",
      "enum",
      "extends",
      "extern",
      "false",
      "final",
      "for",
      "function",
      "if",
      "implements",
      "import",
      "in",
      "inline",
      "interface",
      "macro",
      "new",
      "null",
      "operator",
      "overload",
      "override",
      "package",
      "private",
      "public",
      "return",
      "static",
      "switch",
      "this",
      "throw",
      "true",
      "try",
      "typedef",
      "untyped",
      "using",
      "var",
      "while",
    ],

    typeKeywords: [
      "Void",
      "Bool",
      "Int",
      "Float",
      "String",
      "Dynamic",
      "Array",
      "Map",
      "Null",
      "Any",
      "Class",
      "Enum",
      "EnumValue",
      "Iterator",
      "Iterable",
      "Bytes",
      "EReg",
      "Date",
      "DateTools",
      "Hash",
      "IntHash",
      "IntIterator",
      "Lambda",
      "List",
      "Math",
      "Reflect",
      "Std",
      "StringBuf",
      "StringTools",
      "Sys",
      "Type",
      "Xml",
      "haxe",
      "sys",
      "io",
      "net",
    ],

    accessModifiers: [
      "public",
      "private",
      "static",
      "inline",
      "dynamic",
      "override",
      "extern",
      "final",
      "macro",
      "abstract",
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
      "=>",
      "->",
      "...",
      "??",
    ],

    symbols: /[=><!~?:&|+\-*\/\^%]+/,
    escapes:
      /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
    digits: /\d+(_+\d+)*/,

    tokenizer: {
      root: [
        // Metadata / annotations
        [/@:?\w+/, "annotation"],

        // Identifiers & keywords
        [
          /[a-z_$][\w$]*/,
          {
            cases: {
              "@keywords": "keyword",
              "@accessModifiers": "keyword.modifier",
              "@default": "identifier",
            },
          },
        ],
        [
          /[A-Z][\w$]*/,
          {
            cases: {
              "@typeKeywords": "type.identifier",
              "@default": "type.identifier",
            },
          },
        ],

        // Whitespace & comments
        { include: "@whitespace" },

        // Brackets
        [/[{}()\[\]]/, "@brackets"],

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

        // Numbers
        [/0[xX][0-9a-fA-F_]+/, "number.hex"],
        [/0[oO][0-7_]+/, "number.octal"],
        [/0[bB][01_]+/, "number.binary"],
        [/(@digits)\.(@digits)([eE][\-+]?(@digits))?/, "number.float"],
        [/(@digits)[eE][\-+]?(@digits)/, "number.float"],
        [/(@digits)/, "number"],

        // Strings
        [/"([^"\\]|\\.)*$/, "string.invalid"],
        [/"/, "string", "@string_double"],
        [/'([^'\\]|\\.)*$/, "string.invalid"],
        [/'/, "string", "@string_single"],

        // Delimiters
        [/[;,.]/, "delimiter"],
      ],

      whitespace: [
        [/[ \t\r\n]+/, ""],
        [/\/\*\*(?!\/)/, "comment.doc", "@doccomment"],
        [/\/\*/, "comment", "@comment"],
        [/\/\/.*$/, "comment"],
      ],

      comment: [
        [/[^\/*]+/, "comment"],
        [/\*\//, "comment", "@pop"],
        [/[\/*]/, "comment"],
      ],

      doccomment: [
        [/[^\/*]+/, "comment.doc"],
        [/\*\//, "comment.doc", "@pop"],
        [/[\/*]/, "comment.doc"],
      ],

      string_double: [
        [/[^\\"$]+/, "string"],
        [/\$\{/, { token: "string.interpolation", next: "@interpolation" }],
        [/\$[a-zA-Z_]\w*/, "string.interpolation"],
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

      interpolation: [
        [/\}/, { token: "string.interpolation", next: "@pop" }],
        { include: "root" },
      ],
    },
  });

  /* ------------------------------------------------------------------ */
  /*  4. HAXE STANDARD LIBRARY DATA  (used by intellisense providers)   */
  /* ------------------------------------------------------------------ */
  const haxeStdLib = {
    // -------- Classes --------
    Array: {
      kind: "class",
      detail: "class Array<T>",
      documentation:
        "An Array is a sequential collection of elements of type T.\nProvides random access via index and various utility methods.",
      fields: {
        length: {
          kind: "property",
          detail: "(property) length: Int",
          documentation: "The number of elements in the array.",
        },
        concat: {
          kind: "method",
          detail: "(method) concat(a: Array<T>): Array<T>",
          documentation:
            "Returns a new array containing all elements of this array followed by all elements of `a`.",
          insert: "concat(${1:a})",
        },
        copy: {
          kind: "method",
          detail: "(method) copy(): Array<T>",
          documentation: "Returns a shallow copy of this array.",
          insert: "copy()",
        },
        filter: {
          kind: "method",
          detail: "(method) filter(f: T->Bool): Array<T>",
          documentation:
            "Returns an array with all elements that satisfy the predicate `f`.",
          insert: "filter(${1:f})",
        },
        indexOf: {
          kind: "method",
          detail: "(method) indexOf(x: T, ?fromIndex: Int): Int",
          documentation:
            "Returns the first index of element `x`, or -1 if not found.",
          insert: "indexOf(${1:x})",
        },
        insert: {
          kind: "method",
          detail: "(method) insert(pos: Int, x: T): Void",
          documentation:
            "Inserts `x` at position `pos`, shifting subsequent elements.",
          insert: "insert(${1:pos}, ${2:x})",
        },
        iterator: {
          kind: "method",
          detail: "(method) iterator(): Iterator<T>",
          documentation: "Returns an iterator over the elements.",
          insert: "iterator()",
        },
        join: {
          kind: "method",
          detail: "(method) join(sep: String): String",
          documentation:
            "Joins all elements into a single string separated by `sep`.",
          insert: "join(${1:sep})",
        },
        keyValueIterator: {
          kind: "method",
          detail: "(method) keyValueIterator(): KeyValueIterator<Int, T>",
          documentation: "Returns a key-value iterator.",
          insert: "keyValueIterator()",
        },
        lastIndexOf: {
          kind: "method",
          detail: "(method) lastIndexOf(x: T, ?fromIndex: Int): Int",
          documentation: "Returns the last index of `x`, or -1 if not found.",
          insert: "lastIndexOf(${1:x})",
        },
        map: {
          kind: "method",
          detail: "(method) map<S>(f: T->S): Array<S>",
          documentation: "Returns a new array by applying `f` to each element.",
          insert: "map(${1:f})",
        },
        pop: {
          kind: "method",
          detail: "(method) pop(): Null<T>",
          documentation:
            "Removes and returns the last element, or null if empty.",
          insert: "pop()",
        },
        push: {
          kind: "method",
          detail: "(method) push(x: T): Int",
          documentation:
            "Adds element `x` at the end and returns the new length.",
          insert: "push(${1:x})",
        },
        remove: {
          kind: "method",
          detail: "(method) remove(x: T): Bool",
          documentation:
            "Removes the first occurrence of `x`. Returns true if found.",
          insert: "remove(${1:x})",
        },
        resize: {
          kind: "method",
          detail: "(method) resize(len: Int): Void",
          documentation: "Resizes the array to `len` elements.",
          insert: "resize(${1:len})",
        },
        reverse: {
          kind: "method",
          detail: "(method) reverse(): Void",
          documentation: "Reverses the array in place.",
          insert: "reverse()",
        },
        shift: {
          kind: "method",
          detail: "(method) shift(): Null<T>",
          documentation:
            "Removes and returns the first element, or null if empty.",
          insert: "shift()",
        },
        slice: {
          kind: "method",
          detail: "(method) slice(pos: Int, ?end: Int): Array<T>",
          documentation: "Returns a sub-array from `pos` to `end`.",
          insert: "slice(${1:pos}, ${2:end})",
        },
        sort: {
          kind: "method",
          detail: "(method) sort(f: T->T->Int): Void",
          documentation: "Sorts the array in-place using comparator `f`.",
          insert: "sort(${1:f})",
        },
        splice: {
          kind: "method",
          detail: "(method) splice(pos: Int, len: Int): Array<T>",
          documentation:
            "Removes `len` elements starting at `pos` and returns them.",
          insert: "splice(${1:pos}, ${2:len})",
        },
        toString: {
          kind: "method",
          detail: "(method) toString(): String",
          documentation: "Returns a string representation of the array.",
          insert: "toString()",
        },
        unshift: {
          kind: "method",
          detail: "(method) unshift(x: T): Void",
          documentation: "Inserts `x` at the beginning.",
          insert: "unshift(${1:x})",
        },
        contains: {
          kind: "method",
          detail: "(method) contains(x: T): Bool",
          documentation: "Returns true if `x` is in the array.",
          insert: "contains(${1:x})",
        },
      },
    },
    String: {
      kind: "class",
      detail: "class String",
      documentation: "An immutable sequence of UTF-16 characters.",
      fields: {
        length: {
          kind: "property",
          detail: "(property) length: Int",
          documentation: "The number of characters in the string.",
        },
        charAt: {
          kind: "method",
          detail: "(method) charAt(index: Int): String",
          documentation: "Returns the character at the given index.",
          insert: "charAt(${1:index})",
        },
        charCodeAt: {
          kind: "method",
          detail: "(method) charCodeAt(index: Int): Null<Int>",
          documentation: "Returns the character code at the given index.",
          insert: "charCodeAt(${1:index})",
        },
        indexOf: {
          kind: "method",
          detail: "(method) indexOf(str: String, ?startIndex: Int): Int",
          documentation: "Returns the first index of `str`, or -1.",
          insert: "indexOf(${1:str})",
        },
        lastIndexOf: {
          kind: "method",
          detail: "(method) lastIndexOf(str: String, ?startIndex: Int): Int",
          documentation: "Returns the last index of `str`, or -1.",
          insert: "lastIndexOf(${1:str})",
        },
        split: {
          kind: "method",
          detail: "(method) split(delimiter: String): Array<String>",
          documentation: "Splits the string by `delimiter`.",
          insert: "split(${1:delimiter})",
        },
        substr: {
          kind: "method",
          detail: "(method) substr(pos: Int, ?len: Int): String",
          documentation: "Returns `len` characters starting at `pos`.",
          insert: "substr(${1:pos}, ${2:len})",
        },
        substring: {
          kind: "method",
          detail: "(method) substring(startIndex: Int, ?endIndex: Int): String",
          documentation: "Returns the substring between the two indices.",
          insert: "substring(${1:start}, ${2:end})",
        },
        toLowerCase: {
          kind: "method",
          detail: "(method) toLowerCase(): String",
          documentation: "Returns the string in lower case.",
          insert: "toLowerCase()",
        },
        toUpperCase: {
          kind: "method",
          detail: "(method) toUpperCase(): String",
          documentation: "Returns the string in upper case.",
          insert: "toUpperCase()",
        },
        toString: {
          kind: "method",
          detail: "(method) toString(): String",
          documentation: "Returns the string itself.",
          insert: "toString()",
        },
        trim: {
          kind: "method",
          detail: "(method) trim(): String",
          documentation:
            "Returns a copy with leading and trailing whitespace removed.",
          insert: "trim()",
        },
      },
    },
    Math: {
      kind: "class",
      detail: "class Math",
      documentation: "Standard mathematical functions and constants.",
      fields: {
        PI: {
          kind: "property",
          detail: "(constant) PI: Float = 3.14159265…",
          documentation: "The ratio of circumference to diameter.",
        },
        NEGATIVE_INFINITY: {
          kind: "property",
          detail: "(constant) NEGATIVE_INFINITY: Float",
          documentation: "Negative infinity.",
        },
        POSITIVE_INFINITY: {
          kind: "property",
          detail: "(constant) POSITIVE_INFINITY: Float",
          documentation: "Positive infinity.",
        },
        NaN: {
          kind: "property",
          detail: "(constant) NaN: Float",
          documentation: "Not a Number.",
        },
        abs: {
          kind: "method",
          detail: "(method) abs(v: Float): Float",
          documentation: "Returns the absolute value of `v`.",
          insert: "abs(${1:v})",
        },
        sin: {
          kind: "method",
          detail: "(method) sin(v: Float): Float",
          documentation: "Returns the sine of `v` (radians).",
          insert: "sin(${1:v})",
        },
        cos: {
          kind: "method",
          detail: "(method) cos(v: Float): Float",
          documentation: "Returns the cosine of `v` (radians).",
          insert: "cos(${1:v})",
        },
        tan: {
          kind: "method",
          detail: "(method) tan(v: Float): Float",
          documentation: "Returns the tangent of `v`.",
          insert: "tan(${1:v})",
        },
        asin: {
          kind: "method",
          detail: "(method) asin(v: Float): Float",
          documentation: "Returns the arc sine of `v`.",
          insert: "asin(${1:v})",
        },
        acos: {
          kind: "method",
          detail: "(method) acos(v: Float): Float",
          documentation: "Returns the arc cosine of `v`.",
          insert: "acos(${1:v})",
        },
        atan: {
          kind: "method",
          detail: "(method) atan(v: Float): Float",
          documentation: "Returns the arc tangent of `v`.",
          insert: "atan(${1:v})",
        },
        atan2: {
          kind: "method",
          detail: "(method) atan2(y: Float, x: Float): Float",
          documentation:
            "Returns the angle between the positive x-axis and the point (x, y).",
          insert: "atan2(${1:y}, ${2:x})",
        },
        exp: {
          kind: "method",
          detail: "(method) exp(v: Float): Float",
          documentation: "Returns e raised to the power of `v`.",
          insert: "exp(${1:v})",
        },
        log: {
          kind: "method",
          detail: "(method) log(v: Float): Float",
          documentation: "Returns the natural logarithm of `v`.",
          insert: "log(${1:v})",
        },
        pow: {
          kind: "method",
          detail: "(method) pow(v: Float, exp: Float): Float",
          documentation: "Returns `v` raised to the power of `exp`.",
          insert: "pow(${1:v}, ${2:exp})",
        },
        sqrt: {
          kind: "method",
          detail: "(method) sqrt(v: Float): Float",
          documentation: "Returns the square root of `v`.",
          insert: "sqrt(${1:v})",
        },
        ceil: {
          kind: "method",
          detail: "(method) ceil(v: Float): Int",
          documentation: "Returns the smallest integer >= `v`.",
          insert: "ceil(${1:v})",
        },
        floor: {
          kind: "method",
          detail: "(method) floor(v: Float): Int",
          documentation: "Returns the largest integer <= `v`.",
          insert: "floor(${1:v})",
        },
        round: {
          kind: "method",
          detail: "(method) round(v: Float): Int",
          documentation: "Returns the nearest integer to `v`.",
          insert: "round(${1:v})",
        },
        random: {
          kind: "method",
          detail: "(method) random(): Float",
          documentation: "Returns a random Float in [0, 1).",
          insert: "random()",
        },
        min: {
          kind: "method",
          detail: "(method) min(a: Float, b: Float): Float",
          documentation: "Returns the smaller of `a` and `b`.",
          insert: "min(${1:a}, ${2:b})",
        },
        max: {
          kind: "method",
          detail: "(method) max(a: Float, b: Float): Float",
          documentation: "Returns the larger of `a` and `b`.",
          insert: "max(${1:a}, ${2:b})",
        },
        isNaN: {
          kind: "method",
          detail: "(method) isNaN(f: Float): Bool",
          documentation: "Returns true if `f` is NaN.",
          insert: "isNaN(${1:f})",
        },
        isFinite: {
          kind: "method",
          detail: "(method) isFinite(f: Float): Bool",
          documentation: "Returns true if `f` is finite.",
          insert: "isFinite(${1:f})",
        },
      },
    },
    Std: {
      kind: "class",
      detail: "class Std",
      documentation: "Standard runtime utility functions.",
      fields: {
        is: {
          kind: "method",
          detail: "(method) is(v: Dynamic, t: Dynamic): Bool",
          documentation: "Checks if value `v` is of type `t`.",
          insert: "is(${1:v}, ${2:t})",
        },
        int: {
          kind: "method",
          detail: "(method) int(x: Float): Int",
          documentation: "Converts a Float to Int by truncation.",
          insert: "int(${1:x})",
        },
        string: {
          kind: "method",
          detail: "(method) string(s: Dynamic): String",
          documentation: "Converts any value to its String representation.",
          insert: "string(${1:s})",
        },
        parseInt: {
          kind: "method",
          detail: "(method) parseInt(x: String): Null<Int>",
          documentation: "Parses an integer from a string.",
          insert: "parseInt(${1:x})",
        },
        parseFloat: {
          kind: "method",
          detail: "(method) parseFloat(x: String): Float",
          documentation: "Parses a float from a string.",
          insert: "parseFloat(${1:x})",
        },
        random: {
          kind: "method",
          detail: "(method) random(x: Int): Int",
          documentation: "Returns a random integer in [0, x).",
          insert: "random(${1:x})",
        },
        downcast: {
          kind: "method",
          detail: "(method) downcast<T>(value: Dynamic): T",
          documentation: "Safely casts `value` to type T.",
          insert: "downcast(${1:value})",
        },
        instance: {
          kind: "method",
          detail: "(method) instance<T>(value: Dynamic, c: Class<T>): T",
          documentation: "Attempts to cast `value` to class `c`.",
          insert: "instance(${1:value}, ${2:c})",
        },
      },
    },
    StringTools: {
      kind: "class",
      detail: "class StringTools",
      documentation: "Additional utility functions for working with strings.",
      fields: {
        urlEncode: {
          kind: "method",
          detail: "(method) urlEncode(s: String): String",
          documentation: "URL-encodes the given string.",
          insert: "urlEncode(${1:s})",
        },
        urlDecode: {
          kind: "method",
          detail: "(method) urlDecode(s: String): String",
          documentation: "URL-decodes the given string.",
          insert: "urlDecode(${1:s})",
        },
        htmlEscape: {
          kind: "method",
          detail: "(method) htmlEscape(s: String, ?quotes: Bool): String",
          documentation: "Escapes HTML special characters.",
          insert: "htmlEscape(${1:s})",
        },
        startsWith: {
          kind: "method",
          detail: "(method) startsWith(s: String, start: String): Bool",
          documentation: "Returns true if `s` starts with `start`.",
          insert: "startsWith(${1:s}, ${2:start})",
        },
        endsWith: {
          kind: "method",
          detail: "(method) endsWith(s: String, end: String): Bool",
          documentation: "Returns true if `s` ends with `end`.",
          insert: "endsWith(${1:s}, ${2:end})",
        },
        contains: {
          kind: "method",
          detail: "(method) contains(s: String, value: String): Bool",
          documentation: "Returns true if `s` contains `value`.",
          insert: "contains(${1:s}, ${2:value})",
        },
        replace: {
          kind: "method",
          detail:
            "(method) replace(s: String, sub: String, by: String): String",
          documentation: "Replaces all `sub` with `by`.",
          insert: "replace(${1:s}, ${2:sub}, ${3:by})",
        },
        trim: {
          kind: "method",
          detail: "(method) trim(s: String): String",
          documentation: "Trims whitespace.",
          insert: "trim(${1:s})",
        },
        lpad: {
          kind: "method",
          detail: "(method) lpad(s: String, c: String, l: Int): String",
          documentation: "Left-pads the string.",
          insert: "lpad(${1:s}, ${2:c}, ${3:l})",
        },
        rpad: {
          kind: "method",
          detail: "(method) rpad(s: String, c: String, l: Int): String",
          documentation: "Right-pads the string.",
          insert: "rpad(${1:s}, ${2:c}, ${3:l})",
        },
        isSpace: {
          kind: "method",
          detail: "(method) isSpace(s: String, pos: Int): Bool",
          documentation: "Returns true if char at `pos` is whitespace.",
          insert: "isSpace(${1:s}, ${2:pos})",
        },
      },
    },
    Map: {
      kind: "class",
      detail: "class Map<K, V>",
      documentation:
        "A collection of key-value pairs that maps keys of type K to values of type V.",
      fields: {
        get: {
          kind: "method",
          detail: "(method) get(key: K): Null<V>",
          documentation: "Returns the value mapped to `key`, or null.",
          insert: "get(${1:key})",
        },
        set: {
          kind: "method",
          detail: "(method) set(key: K, value: V): Void",
          documentation: "Maps `key` to `value`.",
          insert: "set(${1:key}, ${2:value})",
        },
        exists: {
          kind: "method",
          detail: "(method) exists(key: K): Bool",
          documentation: "Returns true if `key` exists.",
          insert: "exists(${1:key})",
        },
        remove: {
          kind: "method",
          detail: "(method) remove(key: K): Bool",
          documentation: "Removes the mapping for `key`.",
          insert: "remove(${1:key})",
        },
        keys: {
          kind: "method",
          detail: "(method) keys(): Iterator<K>",
          documentation: "Returns an iterator of keys.",
          insert: "keys()",
        },
        iterator: {
          kind: "method",
          detail: "(method) iterator(): Iterator<V>",
          documentation: "Returns an iterator of values.",
          insert: "iterator()",
        },
        keyValueIterator: {
          kind: "method",
          detail: "(method) keyValueIterator(): KeyValueIterator<K,V>",
          documentation: "Returns a key-value iterator.",
          insert: "keyValueIterator()",
        },
        copy: {
          kind: "method",
          detail: "(method) copy(): Map<K,V>",
          documentation: "Returns a shallow copy.",
          insert: "copy()",
        },
        toString: {
          kind: "method",
          detail: "(method) toString(): String",
          documentation: "Returns a string representation.",
          insert: "toString()",
        },
        clear: {
          kind: "method",
          detail: "(method) clear(): Void",
          documentation: "Removes all entries.",
          insert: "clear()",
        },
      },
    },
    Sys: {
      kind: "class",
      detail: "class Sys",
      documentation: "System-level operations (available on sys targets).",
      fields: {
        args: {
          kind: "method",
          detail: "(method) args(): Array<String>",
          documentation: "Returns command-line arguments.",
          insert: "args()",
        },
        command: {
          kind: "method",
          detail: "(method) command(cmd: String, ?args: Array<String>): Int",
          documentation: "Executes a system command.",
          insert: "command(${1:cmd})",
        },
        cpuTime: {
          kind: "method",
          detail: "(method) cpuTime(): Float",
          documentation: "Returns the CPU time.",
          insert: "cpuTime()",
        },
        environment: {
          kind: "method",
          detail: "(method) environment(): Map<String,String>",
          documentation: "Returns environment variables.",
          insert: "environment()",
        },
        exit: {
          kind: "method",
          detail: "(method) exit(code: Int): Void",
          documentation: "Exits the process with the given code.",
          insert: "exit(${1:code})",
        },
        getChar: {
          kind: "method",
          detail: "(method) getChar(echo: Bool): Int",
          documentation: "Reads a single character from stdin.",
          insert: "getChar(${1:echo})",
        },
        getCwd: {
          kind: "method",
          detail: "(method) getCwd(): String",
          documentation: "Returns the current working directory.",
          insert: "getCwd()",
        },
        getEnv: {
          kind: "method",
          detail: "(method) getEnv(s: String): String",
          documentation: "Returns the value of environment variable `s`.",
          insert: "getEnv(${1:s})",
        },
        print: {
          kind: "method",
          detail: "(method) print(v: Dynamic): Void",
          documentation: "Prints a value to stdout without newline.",
          insert: "print(${1:v})",
        },
        println: {
          kind: "method",
          detail: "(method) println(v: Dynamic): Void",
          documentation: "Prints a value to stdout with a trailing newline.",
          insert: "println(${1:v})",
        },
        putChar: {
          kind: "method",
          detail: "(method) putChar(c: Int): Void",
          documentation: "Writes a single character to stdout.",
          insert: "putChar(${1:c})",
        },
        putEnv: {
          kind: "method",
          detail: "(method) putEnv(s: String, v: String): Void",
          documentation: "Sets an environment variable.",
          insert: "putEnv(${1:s}, ${2:v})",
        },
        setCwd: {
          kind: "method",
          detail: "(method) setCwd(s: String): Void",
          documentation: "Sets the current working directory.",
          insert: "setCwd(${1:s})",
        },
        sleep: {
          kind: "method",
          detail: "(method) sleep(seconds: Float): Void",
          documentation: "Pauses execution for the given number of seconds.",
          insert: "sleep(${1:seconds})",
        },
        stderr: {
          kind: "method",
          detail: "(method) stderr(): haxe.io.Output",
          documentation: "Returns the stderr stream.",
          insert: "stderr()",
        },
        stdin: {
          kind: "method",
          detail: "(method) stdin(): haxe.io.Input",
          documentation: "Returns the stdin stream.",
          insert: "stdin()",
        },
        stdout: {
          kind: "method",
          detail: "(method) stdout(): haxe.io.Output",
          documentation: "Returns the stdout stream.",
          insert: "stdout()",
        },
        time: {
          kind: "method",
          detail: "(method) time(): Float",
          documentation: "Returns the current system time as a Unix timestamp.",
          insert: "time()",
        },
      },
    },
    Reflect: {
      kind: "class",
      detail: "class Reflect",
      documentation: "Runtime reflection operations.",
      fields: {
        field: {
          kind: "method",
          detail: "(method) field(o: Dynamic, field: String): Dynamic",
          documentation: "Returns the value of `field` on object `o`.",
          insert: "field(${1:o}, ${2:field})",
        },
        setField: {
          kind: "method",
          detail:
            "(method) setField(o: Dynamic, field: String, value: Dynamic): Void",
          documentation: "Sets `field` on object `o`.",
          insert: "setField(${1:o}, ${2:field}, ${3:value})",
        },
        fields: {
          kind: "method",
          detail: "(method) fields(o: Dynamic): Array<String>",
          documentation: "Returns all instance fields of `o`.",
          insert: "fields(${1:o})",
        },
        hasField: {
          kind: "method",
          detail: "(method) hasField(o: Dynamic, field: String): Bool",
          documentation: "Returns true if `o` has `field`.",
          insert: "hasField(${1:o}, ${2:field})",
        },
        deleteField: {
          kind: "method",
          detail: "(method) deleteField(o: Dynamic, field: String): Bool",
          documentation: "Deletes `field` from `o`.",
          insert: "deleteField(${1:o}, ${2:field})",
        },
        copy: {
          kind: "method",
          detail: "(method) copy(o: Dynamic): Dynamic",
          documentation: "Returns a shallow copy of `o`.",
          insert: "copy(${1:o})",
        },
        callMethod: {
          kind: "method",
          detail:
            "(method) callMethod(o: Dynamic, func: Dynamic, args: Array<Dynamic>): Dynamic",
          documentation: "Calls `func` on `o` with `args`.",
          insert: "callMethod(${1:o}, ${2:func}, ${3:args})",
        },
        isFunction: {
          kind: "method",
          detail: "(method) isFunction(f: Dynamic): Bool",
          documentation: "Returns true if `f` is a function.",
          insert: "isFunction(${1:f})",
        },
        compareMethods: {
          kind: "method",
          detail: "(method) compareMethods(f: Dynamic, g: Dynamic): Bool",
          documentation: "Compares two method values.",
          insert: "compareMethods(${1:f}, ${2:g})",
        },
        isObject: {
          kind: "method",
          detail: "(method) isObject(v: Dynamic): Bool",
          documentation: "Returns true if `v` is an object.",
          insert: "isObject(${1:v})",
        },
        isEnumValue: {
          kind: "method",
          detail: "(method) isEnumValue(v: Dynamic): Bool",
          documentation: "Returns true if `v` is an enum value.",
          insert: "isEnumValue(${1:v})",
        },
        makeVarArgs: {
          kind: "method",
          detail: "(method) makeVarArgs(f: Array<Dynamic>->Dynamic): Dynamic",
          documentation: "Wraps `f` so it accepts variable arguments.",
          insert: "makeVarArgs(${1:f})",
        },
      },
    },
    Type: {
      kind: "class",
      detail: "class Type",
      documentation: "Runtime type information utilities.",
      fields: {
        getClass: {
          kind: "method",
          detail: "(method) getClass<T>(o: T): Class<T>",
          documentation: "Returns the class of object `o`.",
          insert: "getClass(${1:o})",
        },
        getEnum: {
          kind: "method",
          detail: "(method) getEnum(o: EnumValue): Enum<Dynamic>",
          documentation: "Returns the enum of value `o`.",
          insert: "getEnum(${1:o})",
        },
        getSuperClass: {
          kind: "method",
          detail: "(method) getSuperClass<T>(c: Class<T>): Class<Dynamic>",
          documentation: "Returns the parent class.",
          insert: "getSuperClass(${1:c})",
        },
        getClassName: {
          kind: "method",
          detail: "(method) getClassName<T>(c: Class<T>): String",
          documentation: "Returns the fully-qualified class name.",
          insert: "getClassName(${1:c})",
        },
        getEnumName: {
          kind: "method",
          detail: "(method) getEnumName(e: Enum<Dynamic>): String",
          documentation: "Returns the fully-qualified enum name.",
          insert: "getEnumName(${1:e})",
        },
        resolveClass: {
          kind: "method",
          detail: "(method) resolveClass(name: String): Class<Dynamic>",
          documentation: "Resolves a class by name.",
          insert: "resolveClass(${1:name})",
        },
        resolveEnum: {
          kind: "method",
          detail: "(method) resolveEnum(name: String): Enum<Dynamic>",
          documentation: "Resolves an enum by name.",
          insert: "resolveEnum(${1:name})",
        },
        createInstance: {
          kind: "method",
          detail:
            "(method) createInstance<T>(cl: Class<T>, args: Array<Dynamic>): T",
          documentation: "Creates an instance of the class.",
          insert: "createInstance(${1:cl}, ${2:args})",
        },
        createEmptyInstance: {
          kind: "method",
          detail: "(method) createEmptyInstance<T>(cl: Class<T>): T",
          documentation: "Creates an instance without calling the constructor.",
          insert: "createEmptyInstance(${1:cl})",
        },
        createEnum: {
          kind: "method",
          detail:
            "(method) createEnum<T>(e: Enum<T>, constr: String, ?params: Array<Dynamic>): T",
          documentation: "Creates an enum value.",
          insert: "createEnum(${1:e}, ${2:constr})",
        },
        enumConstructor: {
          kind: "method",
          detail: "(method) enumConstructor(e: EnumValue): String",
          documentation: "Returns the constructor name of an enum value.",
          insert: "enumConstructor(${1:e})",
        },
        enumParameters: {
          kind: "method",
          detail: "(method) enumParameters(e: EnumValue): Array<Dynamic>",
          documentation: "Returns the parameters of an enum value.",
          insert: "enumParameters(${1:e})",
        },
        enumIndex: {
          kind: "method",
          detail: "(method) enumIndex(e: EnumValue): Int",
          documentation: "Returns the index of an enum constructor.",
          insert: "enumIndex(${1:e})",
        },
        allEnums: {
          kind: "method",
          detail: "(method) allEnums<T>(e: Enum<T>): Array<T>",
          documentation:
            "Returns all enum values (no-argument constructors only).",
          insert: "allEnums(${1:e})",
        },
        enumEq: {
          kind: "method",
          detail: "(method) enumEq<T>(a: T, b: T): Bool",
          documentation: "Deep-equality comparison of enum values.",
          insert: "enumEq(${1:a}, ${2:b})",
        },
        typeof: {
          kind: "method",
          detail: "(method) typeof(v: Dynamic): ValueType",
          documentation: "Returns the runtime type of `v`.",
          insert: "typeof(${1:v})",
        },
      },
    },
    trace: {
      kind: "function",
      detail: "(function) trace(v: Dynamic, ?infos: PosInfos): Void",
      documentation:
        "Prints a value along with source position information (file, line). The standard debugging output function in Haxe.",
    },
  };

  // ---- Collect symbols declared in the editor for go-to-definition ----
  function collectDocumentSymbols(model) {
    const text = model.getValue();
    const lines = text.split("\n");
    const symbols = {};

    const patterns = [
      { regex: /\b(?:var|final)\s+(\w+)\s*(?::|\s*=)/, kind: "variable" },
      { regex: /\bfunction\s+(\w+)\s*[\(<]/, kind: "function" },
      { regex: /\bclass\s+(\w+)/, kind: "class" },
      { regex: /\binterface\s+(\w+)/, kind: "interface" },
      { regex: /\benum\s+(\w+)/, kind: "enum" },
      { regex: /\btypedef\s+(\w+)/, kind: "typedef" },
      { regex: /\babstract\s+(\w+)/, kind: "abstract" },
    ];

    lines.forEach((line, i) => {
      for (const p of patterns) {
        const m = line.match(p.regex);
        if (m) {
          symbols[m[1]] = {
            line: i + 1,
            col: line.indexOf(m[1]) + 1,
            kind: p.kind,
            source: line.trim(),
          };
        }
      }
    });
    return symbols;
  }

  /* ------------------------------------------------------------------ */
  /*  5. COMPLETION PROVIDER (autocomplete + snippets)                   */
  /* ------------------------------------------------------------------ */
  monaco.languages.registerCompletionItemProvider("haxe", {
    triggerCharacters: [".", ":", "@"],
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
      const CK = monaco.languages.CompletionItemKind;

      // ---- Dot completion: e.g. "Math.", "myArray." ----
      const dotMatch = textUntilPosition.match(/(\w+)\.\s*$/);
      if (dotMatch) {
        const typeName = dotMatch[1];
        const cls = haxeStdLib[typeName];
        if (cls && cls.fields) {
          for (const [name, info] of Object.entries(cls.fields)) {
            suggestions.push({
              label: name,
              kind: info.kind === "method" ? CK.Method : CK.Property,
              detail: info.detail,
              documentation: { value: info.documentation },
              insertText: info.insert || name,
              insertTextRules: info.insert
                ? monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                : undefined,
              range,
            });
          }
          return { suggestions };
        }
      }

      // ---- Metadata completion ----
      if (textUntilPosition.match(/@:?\w*$/)) {
        const metadatas = [
          {
            label: "@:allow",
            detail: "@:allow(pack)",
            doc: "Allows access to private fields from the specified package.",
          },
          { label: "@:bind", detail: "@:bind", doc: "Binds a function." },
          {
            label: "@:bitmap",
            detail: "@:bitmap(path)",
            doc: "Embeds a bitmap resource.",
          },
          { label: "@:build", detail: "@:build", doc: "Runs a build macro." },
          {
            label: "@:coreApi",
            detail: "@:coreApi",
            doc: "Marks a class as a core API type.",
          },
          {
            label: "@:dce",
            detail: "@:dce",
            doc: "Forces dead-code elimination.",
          },
          { label: "@:debug", detail: "@:debug", doc: "Enables debug info." },
          {
            label: "@:deprecated",
            detail: "@:deprecated",
            doc: "Marks as deprecated.",
          },
          {
            label: "@:enum",
            detail: "@:enum",
            doc: "Treats abstract as enum.",
          },
          {
            label: "@:final",
            detail: "@:final",
            doc: "Prevents overriding or extending.",
          },
          {
            label: "@:forward",
            detail: "@:forward(field1, field2)",
            doc: "Forwards field access to the underlying type.",
          },
          {
            label: "@:generic",
            detail: "@:generic",
            doc: "Marks a class/method as generic (generates specialized code).",
          },
          { label: "@:hack", detail: "@:hack", doc: "Internal hack marker." },
          {
            label: "@:ifFeature",
            detail: "@:ifFeature(name)",
            doc: "Compiles only if the feature is used.",
          },
          {
            label: "@:include",
            detail: "@:include",
            doc: "Includes header files (C++).",
          },
          {
            label: "@:keep",
            detail: "@:keep",
            doc: "Prevents DCE from removing this symbol.",
          },
          { label: "@:meta", detail: "@:meta", doc: "Internal metadata." },
          {
            label: "@:native",
            detail: "@:native(name)",
            doc: "Overrides the native name in the target.",
          },
          {
            label: "@:noCompletion",
            detail: "@:noCompletion",
            doc: "Hides from completion.",
          },
          {
            label: "@:noDebug",
            detail: "@:noDebug",
            doc: "Disables debug info for this field.",
          },
          {
            label: "@:noClosure",
            detail: "@:noClosure",
            doc: "Prevents closure creation.",
          },
          {
            label: "@:noDoc",
            detail: "@:noDoc",
            doc: "Excludes from documentation.",
          },
          {
            label: "@:noUsing",
            detail: "@:noUsing",
            doc: "Prevents the method from being used via `using`.",
          },
          {
            label: "@:op",
            detail: "@:op(A + B)",
            doc: "Defines operator overloading for abstract types.",
          },
          {
            label: "@:optional",
            detail: "@:optional",
            doc: "Marks a field as optional in a typedef.",
          },
          {
            label: "@:overload",
            detail: "@:overload",
            doc: "Allows overloaded extern methods.",
          },
          {
            label: "@:pos",
            detail: "@:pos(pos)",
            doc: "Sets source position for macros.",
          },
          {
            label: "@:privateAccess",
            detail: "@:privateAccess",
            doc: "Allows access to private members.",
          },
          {
            label: "@:pure",
            detail: "@:pure",
            doc: "Marks a function as pure (no side effects).",
          },
          {
            label: "@:require",
            detail: "@:require(cond)",
            doc: "Only compiles if condition is met.",
          },
          {
            label: "@:resolve",
            detail: "@:resolve",
            doc: "Called when field access is not found.",
          },
          {
            label: "@:rtti",
            detail: "@:rtti",
            doc: "Generates runtime type info.",
          },
          {
            label: "@:selfCall",
            detail: "@:selfCall",
            doc: "Treats abstract method call as self-invocation.",
          },
          {
            label: "@:struct",
            detail: "@:struct",
            doc: "Marks as value type (C#).",
          },
          {
            label: "@:transient",
            detail: "@:transient",
            doc: "Skips serialization for this field.",
          },
          {
            label: "@:unreflective",
            detail: "@:unreflective",
            doc: "Prevents reflection on this field.",
          },
          {
            label: "@:value",
            detail: "@:value",
            doc: "Stores the compile-time value of a const.",
          },
          {
            label: "@author",
            detail: "@author name",
            doc: "Documentation: specifies the author.",
          },
          {
            label: "@deprecated",
            detail: "@deprecated message",
            doc: "Marks as deprecated with message.",
          },
          {
            label: "@param",
            detail: "@param name description",
            doc: "Documents a function parameter.",
          },
          {
            label: "@return",
            detail: "@return description",
            doc: "Documents the return value.",
          },
          {
            label: "@see",
            detail: "@see reference",
            doc: "Cross-reference link.",
          },
          {
            label: "@since",
            detail: "@since version",
            doc: "Specifies when the API was introduced.",
          },
          {
            label: "@throws",
            detail: "@throws Type description",
            doc: "Documents thrown exceptions.",
          },
        ];
        for (const m of metadatas) {
          suggestions.push({
            label: m.label,
            kind: CK.Keyword,
            detail: m.detail,
            documentation: { value: m.doc },
            insertText: m.label.replace("@", ""),
            range,
          });
        }
      }

      // ---- Keyword completions ----
      const keywords = [
        "abstract",
        "break",
        "case",
        "cast",
        "catch",
        "class",
        "continue",
        "default",
        "do",
        "dynamic",
        "else",
        "enum",
        "extends",
        "extern",
        "false",
        "final",
        "for",
        "function",
        "if",
        "implements",
        "import",
        "in",
        "inline",
        "interface",
        "macro",
        "new",
        "null",
        "operator",
        "overload",
        "override",
        "package",
        "private",
        "public",
        "return",
        "static",
        "switch",
        "this",
        "throw",
        "true",
        "try",
        "typedef",
        "untyped",
        "using",
        "var",
        "while",
        "trace",
      ];
      for (const kw of keywords) {
        suggestions.push({
          label: kw,
          kind: CK.Keyword,
          insertText: kw,
          range,
        });
      }

      // ---- Type / class completions ----
      for (const [name, info] of Object.entries(haxeStdLib)) {
        if (info.kind === "class") {
          suggestions.push({
            label: name,
            kind: CK.Class,
            detail: info.detail,
            documentation: { value: info.documentation },
            insertText: name,
            range,
          });
        }
      }
      const types = [
        "Void",
        "Bool",
        "Int",
        "Float",
        "String",
        "Dynamic",
        "Array",
        "Map",
        "Null",
        "Any",
        "Iterator",
        "Iterable",
        "Date",
        "EReg",
        "Bytes",
        "List",
        "Lambda",
        "Xml",
      ];
      for (const t of types) {
        if (!haxeStdLib[t]) {
          suggestions.push({ label: t, kind: CK.Class, insertText: t, range });
        }
      }

      // ---- Document symbols ----
      const docSymbols = collectDocumentSymbols(model);
      for (const [name, info] of Object.entries(docSymbols)) {
        let kind = CK.Variable;
        if (info.kind === "function") kind = CK.Function;
        else if (info.kind === "class") kind = CK.Class;
        else if (info.kind === "interface") kind = CK.Interface;
        else if (info.kind === "enum") kind = CK.Enum;
        else if (info.kind === "typedef") kind = CK.TypeParameter;
        suggestions.push({
          label: name,
          kind,
          detail: `(${info.kind}) — line ${info.line}`,
          documentation: { value: "```haxe\n" + info.source + "\n```" },
          insertText: name,
          range,
        });
      }

      // ---- Snippets ----
      const snippets = [
        {
          label: "class",
          detail: "Class declaration",
          text: "class ${1:ClassName} {\n\tpublic function new() {\n\t\t${2}\n\t}\n}",
        },
        {
          label: "interface",
          detail: "Interface declaration",
          text: "interface ${1:IName} {\n\tpublic function ${2:method}():${3:Void};\n}",
        },
        {
          label: "enum",
          detail: "Enum declaration",
          text: "enum ${1:EnumName} {\n\t${2:Value1};\n\t${3:Value2};\n}",
        },
        {
          label: "typedef",
          detail: "Typedef declaration",
          text: "typedef ${1:TypeName} = {\n\tvar ${2:field}:${3:Type};\n}",
        },
        {
          label: "abstract",
          detail: "Abstract type declaration",
          text: "abstract ${1:AbstractName}(${2:BaseType}) {\n\t${3}\n}",
        },
        {
          label: "function",
          detail: "Function declaration",
          text: "function ${1:name}(${2:args}):${3:Void} {\n\t${4}\n}",
        },
        {
          label: "public function",
          detail: "Public method",
          text: "public function ${1:name}(${2:args}):${3:Void} {\n\t${4}\n}",
        },
        {
          label: "static function",
          detail: "Static function",
          text: "public static function ${1:name}(${2:args}):${3:Void} {\n\t${4}\n}",
        },
        {
          label: "main",
          detail: "Static main entry point",
          text: "public static function main():Void {\n\t${1}\n}",
        },
        {
          label: "if",
          detail: "If statement",
          text: "if (${1:condition}) {\n\t${2}\n}",
        },
        {
          label: "ifelse",
          detail: "If-Else statement",
          text: "if (${1:condition}) {\n\t${2}\n} else {\n\t${3}\n}",
        },
        {
          label: "switch",
          detail: "Switch-case statement",
          text: "switch (${1:value}) {\n\tcase ${2:pattern}:\n\t\t${3}\n\tdefault:\n\t\t${4}\n}",
        },
        {
          label: "for",
          detail: "For loop",
          text: "for (${1:i} in ${2:0}...${3:10}) {\n\t${4}\n}",
        },
        {
          label: "foreach",
          detail: "For-each loop over iterable",
          text: "for (${1:item} in ${2:collection}) {\n\t${3}\n}",
        },
        {
          label: "while",
          detail: "While loop",
          text: "while (${1:condition}) {\n\t${2}\n}",
        },
        {
          label: "dowhile",
          detail: "Do-while loop",
          text: "do {\n\t${1}\n} while (${2:condition});",
        },
        {
          label: "try",
          detail: "Try-catch block",
          text: "try {\n\t${1}\n} catch (${2:e}:${3:Dynamic}) {\n\t${4}\n}",
        },
        {
          label: "trycatchfinally",
          detail: "Try-catch-finally block",
          text: "try {\n\t${1}\n} catch (${2:e}:${3:Dynamic}) {\n\t${4}\n}",
        },
        { label: "trace", detail: "trace() call", text: "trace(${1:value});" },
        {
          label: "var",
          detail: "Variable declaration",
          text: "var ${1:name}:${2:Type} = ${3:value};",
        },
        {
          label: "final",
          detail: "Final variable",
          text: "final ${1:name}:${2:Type} = ${3:value};",
        },
        {
          label: "lambda",
          detail: "Lambda / anonymous function",
          text: "(${1:args}) -> ${2:expr}",
        },
        {
          label: "import",
          detail: "Import statement",
          text: "import ${1:pack.Module};",
        },
        {
          label: "using",
          detail: "Using statement",
          text: "using ${1:pack.Module};",
        },
        {
          label: "package",
          detail: "Package declaration",
          text: "package ${1:name};",
        },
        {
          label: "array comprehension",
          detail: "Array comprehension",
          text: "[for (${1:i} in ${2:0}...${3:10}) ${4:expr}]",
        },
        {
          label: "map literal",
          detail: "Map initialization",
          text: "var ${1:map} = new Map<${2:String}, ${3:Int}>();",
        },
        {
          label: "override",
          detail: "Override method",
          text: "override public function ${1:name}(${2:args}):${3:Void} {\n\t${4}\n}",
        },
        {
          label: "getter/setter",
          detail: "Property with getter/setter",
          text: "public var ${1:prop}(get, set):${2:Type};\n\nfunction get_${1:prop}():${2:Type} {\n\treturn ${3:value};\n}\n\nfunction set_${1:prop}(value:${2:Type}):${2:Type} {\n\t${1:prop} = value;\n\treturn ${1:prop};\n}",
        },
        {
          label: "singleton",
          detail: "Singleton pattern",
          text: "class ${1:Singleton} {\n\tprivate static var _instance:${1:Singleton};\n\n\tprivate function new() {\n\t\t${2}\n\t}\n\n\tpublic static function getInstance():${1:Singleton} {\n\t\tif (_instance == null)\n\t\t\t_instance = new ${1:Singleton}();\n\t\treturn _instance;\n\t}\n}",
        },
      ];
      for (const s of snippets) {
        suggestions.push({
          label: s.label,
          kind: CK.Snippet,
          detail: s.detail,
          insertText: s.text,
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: { value: "Snippet: " + s.detail },
          range,
        });
      }

      return { suggestions };
    },
  });

  /* ------------------------------------------------------------------ */
  /*  6. HOVER PROVIDER                                                 */
  /* ------------------------------------------------------------------ */
  monaco.languages.registerHoverProvider("haxe", {
    provideHover: function (model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return null;
      const token = word.word;

      // Check stdlib classes
      if (haxeStdLib[token]) {
        const entry = haxeStdLib[token];
        return {
          range: new monaco.Range(
            position.lineNumber,
            word.startColumn,
            position.lineNumber,
            word.endColumn,
          ),
          contents: [
            { value: "```haxe\n" + (entry.detail || token) + "\n```" },
            { value: entry.documentation || "" },
          ],
        };
      }

      // Check dot access: "X.field" — hover on field
      const lineContent = model.getLineContent(position.lineNumber);
      const beforeWord = lineContent.substring(0, word.startColumn - 1);
      const dotMatch = beforeWord.match(/(\w+)\.\s*$/);
      if (dotMatch && haxeStdLib[dotMatch[1]]) {
        const cls = haxeStdLib[dotMatch[1]];
        const field = cls.fields && cls.fields[token];
        if (field) {
          return {
            range: new monaco.Range(
              position.lineNumber,
              word.startColumn,
              position.lineNumber,
              word.endColumn,
            ),
            contents: [
              { value: "```haxe\n" + field.detail + "\n```" },
              { value: field.documentation || "" },
            ],
          };
        }
      }

      // Check document symbols
      const docSymbols = collectDocumentSymbols(model);
      if (docSymbols[token]) {
        const sym = docSymbols[token];
        return {
          range: new monaco.Range(
            position.lineNumber,
            word.startColumn,
            position.lineNumber,
            word.endColumn,
          ),
          contents: [
            { value: "```haxe\n" + sym.source + "\n```" },
            { value: `*(${sym.kind})* — defined at line ${sym.line}` },
          ],
        };
      }

      // Keyword hover
      const kwDocs = {
        abstract:
          "Defines an abstract type — a compile-time wrapper around an existing type with custom semantics.",
        break: "Exits the innermost loop.",
        case: "A branch in a switch expression or pattern match.",
        cast: "Converts a value to a different type. `cast(expr, Type)` for safe casts or `cast expr` for unsafe.",
        catch: "Handles exceptions thrown in the preceding try block.",
        class: "Declares a new class type.",
        continue: "Skips to the next iteration of the innermost loop.",
        default: "The fallback branch in a switch expression.",
        do: "Begins a do-while loop.",
        dynamic: "Marks a field/class as dynamic — bypasses the type system.",
        else: "The alternative branch of an if expression.",
        enum: "Declares an enum (algebraic data type) with constructors.",
        extends: "Specifies the parent class or constrains a type parameter.",
        extern: "Declares an external type not implemented in Haxe.",
        false: "Boolean literal `false`.",
        final:
          "Declares a variable or field that cannot be reassigned after initialization.",
        for: "Iterates over an Iterator or IntIterator.",
        function: "Declares a function or method.",
        if: "Conditional branching expression.",
        implements: "Declares that a class implements an interface.",
        import: "Imports a module, type, or field into the current scope.",
        in: "Used in for loops (`for x in iter`) and with `@:op(A in B)` operator overloading.",
        inline: "Requests the compiler to inline the function at call sites.",
        interface:
          "Declares an interface — a contract that classes may implement.",
        macro: "Invokes or declares a compile-time macro.",
        new: "Constructs a new class instance.",
        null: "The absence of a value. Only valid for nullable types.",
        operator: "Used in abstract operator overloading.",
        overload:
          "Allows multiple extern functions with the same name but different signatures.",
        override: "Overrides a method inherited from a superclass.",
        package: "Declares the package (namespace) for this module.",
        private: "Restricts access to the declaring class and its subclasses.",
        public: "Makes a field accessible from anywhere.",
        return: "Returns a value from a function.",
        static: "Belongs to the class rather than to instances.",
        switch: "Pattern-matching expression over a value.",
        this: "Reference to the current object instance.",
        throw: "Throws an exception value.",
        true: "Boolean literal `true`.",
        try: "Begins a try-catch block for exception handling.",
        typedef: "Declares a type alias or structural type.",
        untyped: "Disables type checking for the enclosed expression.",
        using: "Enables static extension methods from the specified module.",
        var: "Declares a variable.",
        while: "Loop that repeats while a condition holds.",
        trace:
          "Built-in function for debug output. Prints value and source position.",
      };
      if (kwDocs[token]) {
        return {
          range: new monaco.Range(
            position.lineNumber,
            word.startColumn,
            position.lineNumber,
            word.endColumn,
          ),
          contents: [
            { value: "```haxe\n(keyword) " + token + "\n```" },
            { value: kwDocs[token] },
          ],
        };
      }

      return null;
    },
  });

  /* ------------------------------------------------------------------ */
  /*  7. DEFINITION PROVIDER (go-to-definition)                         */
  /* ------------------------------------------------------------------ */
  monaco.languages.registerDefinitionProvider("haxe", {
    provideDefinition: function (model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return null;
      const token = word.word;

      const docSymbols = collectDocumentSymbols(model);
      if (docSymbols[token]) {
        const sym = docSymbols[token];
        return {
          uri: model.uri,
          range: new monaco.Range(
            sym.line,
            sym.col,
            sym.line,
            sym.col + token.length,
          ),
        };
      }
      return null;
    },
  });

  /* ------------------------------------------------------------------ */
  /*  8. SIGNATURE HELP PROVIDER                                        */
  /* ------------------------------------------------------------------ */
  monaco.languages.registerSignatureHelpProvider("haxe", {
    signatureHelpTriggerCharacters: ["(", ","],
    provideSignatureHelp: function (model, position) {
      const textUntilPos = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });

      // Match  SomeClass.method( or trace(
      const callMatch =
        textUntilPos.match(/(\w+)\.(\w+)\s*\(([^)]*)$/) ||
        textUntilPos.match(/\b()(trace)\s*\(([^)]*)$/);
      if (!callMatch) return null;

      const className = callMatch[1];
      const methodName = callMatch[2];
      const argsPart = callMatch[3] || "";
      const activeParam = (argsPart.match(/,/g) || []).length;

      let sigLabel = null;
      let params = [];
      let doc = "";

      if (methodName === "trace" && className === "") {
        sigLabel = "trace(v: Dynamic, ?infos: PosInfos): Void";
        params = [
          { label: "v: Dynamic", documentation: "The value to print." },
          {
            label: "?infos: PosInfos",
            documentation: "Automatic position info (usually omitted).",
          },
        ];
        doc = "Prints a value along with source position.";
      } else if (
        haxeStdLib[className] &&
        haxeStdLib[className].fields &&
        haxeStdLib[className].fields[methodName]
      ) {
        const f = haxeStdLib[className].fields[methodName];
        sigLabel = f.detail.replace(/^\(method\)\s*/, "");
        doc = f.documentation;
        const paramMatch = sigLabel.match(/\(([^)]*)\)/);
        if (paramMatch) {
          params = paramMatch[1]
            .split(",")
            .map((p) => ({ label: p.trim(), documentation: "" }));
        }
      }

      if (!sigLabel) return null;

      return {
        value: {
          signatures: [
            {
              label: sigLabel,
              documentation: { value: doc },
              parameters: params,
            },
          ],
          activeSignature: 0,
          activeParameter: activeParam,
        },
        dispose: function () {},
      };
    },
  });

  /* ------------------------------------------------------------------ */
  /*  9. DOCUMENT SYMBOL PROVIDER (outline)                             */
  /* ------------------------------------------------------------------ */
  monaco.languages.registerDocumentSymbolProvider("haxe", {
    provideDocumentSymbols: function (model) {
      const symbols = collectDocumentSymbols(model);
      const SK = monaco.languages.SymbolKind;
      const kindMap = {
        variable: SK.Variable,
        function: SK.Function,
        class: SK.Class,
        interface: SK.Interface,
        enum: SK.Enum,
        typedef: SK.TypeParameter,
        abstract: SK.Class,
      };
      return Object.entries(symbols).map(([name, s]) => ({
        name,
        kind: kindMap[s.kind] || SK.Variable,
        range: new monaco.Range(s.line, s.col, s.line, s.col + name.length),
        selectionRange: new monaco.Range(
          s.line,
          s.col,
          s.line,
          s.col + name.length,
        ),
      }));
    },
  });

  /* ------------------------------------------------------------------ */
  /*  10. DOCUMENT FORMATTING PROVIDER                                  */
  /* ------------------------------------------------------------------ */
  monaco.languages.registerDocumentFormattingEditProvider("haxe", {
    provideDocumentFormattingEdits: function (model) {
      const text = model.getValue();
      const lines = text.split("\n");
      let indent = 0;
      const tab = "\t";
      const formatted = [];

      for (let rawLine of lines) {
        let line = rawLine.trim();
        if (line === "") {
          formatted.push("");
          continue;
        }
        const closeBefore = (line.match(/^[}\])]/) || []).length;
        if (closeBefore > 0 && indent > 0) indent--;
        formatted.push(tab.repeat(indent) + line);
        const opens = (line.match(/[{(\[]/g) || []).length;
        const closes = (line.match(/[})\]]/g) || []).length;
        indent += opens - closes;
        if (indent < 0) indent = 0;
      }

      return [
        {
          range: model.getFullModelRange(),
          text: formatted.join("\n"),
        },
      ];
    },
  });

  // ─── Rename Provider (scope-aware) ──────────────────────────────────
  monaco.languages.registerRenameProvider("haxe", {
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
      // First scope opening at or after `offset` (a signature's body).
      const nextScope = (offset: number) => {
        let found: Scope | undefined;
        for (const scope of scopes) {
          if (scope.start >= offset && (!found || scope.start < found.start))
            found = scope;
        }
        return found;
      };

      // Local declarations: var/final bindings and parameters.
      const declaration = new RegExp(
        "\\b(?:var|final)\\s+" +
          esc(name) +
          "\\b|(?:[(,]\\s*)" +
          esc(name) +
          "\\s*:",
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
