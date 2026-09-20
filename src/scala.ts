import type * as Monaco from "monaco-editor";

export default (monaco: typeof Monaco) => {
  // ── Register Language ───────────────────────────────────────────
  monaco.languages.register({
    id: "scala",
    extensions: [".scala", ".sc"],
    aliases: ["Scala", "scala"],
  });

  // ── Monarch Tokenizer ──────────────────────────────────────────
  monaco.languages.setMonarchTokensProvider("scala", {
    keywords: [
      "abstract",
      "case",
      "catch",
      "class",
      "def",
      "do",
      "else",
      "enum",
      "export",
      "extends",
      "extension",
      "false",
      "final",
      "finally",
      "for",
      "forSome",
      "given",
      "if",
      "implicit",
      "import",
      "lazy",
      "match",
      "new",
      "null",
      "object",
      "override",
      "package",
      "private",
      "protected",
      "return",
      "sealed",
      "super",
      "then",
      "this",
      "throw",
      "trait",
      "true",
      "try",
      "type",
      "using",
      "val",
      "var",
      "while",
      "with",
      "yield",
      "end",
      "derives",
      "inline",
      "opaque",
      "open",
      "transparent",
      "infix",
    ],
    typeKeywords: [
      "Int",
      "Long",
      "Short",
      "Byte",
      "Float",
      "Double",
      "Char",
      "Boolean",
      "String",
      "Unit",
      "Null",
      "Nothing",
      "Any",
      "AnyRef",
      "AnyVal",
      "Array",
      "List",
      "Seq",
      "Set",
      "Map",
      "Option",
      "Some",
      "None",
      "Either",
      "Left",
      "Right",
      "Future",
      "Promise",
      "Try",
      "Success",
      "Failure",
      "Vector",
      "LazyList",
      "Stream",
      "Tuple",
      "BigInt",
      "BigDecimal",
      "Iterable",
      "Iterator",
      "Range",
      "IndexedSeq",
      "LinearSeq",
      "Ordering",
      "Numeric",
      "PartialFunction",
      "Function0",
      "Function1",
      "Function2",
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
      "->",
      "=>",
      "<-",
      "#",
      "@",
    ],
    symbols: /[=><!~?:&|+\-*\/\^%]+/,
    escapes:
      /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
    tokenizer: {
      root: [
        [/@[A-Za-z_][\w$]*/, "annotation"],
        [
          /[A-Z][\w$]*/,
          {
            cases: {
              "@typeKeywords": "type.identifier",
              "@default": "type.identifier",
            },
          },
        ],
        [
          /[a-z_][\w$]*/,
          { cases: { "@keywords": "keyword", "@default": "identifier" } },
        ],
        { include: "@whitespace" },
        [/[{}()\[\]]/, "@brackets"],
        [/[<>](?!@symbols)/, "@brackets"],
        [
          /@symbols/,
          {
            cases: {
              "=>": "keyword",
              "->": "keyword",
              "<-": "keyword",
              "@operators": "operator",
              "@default": "",
            },
          },
        ],
        [/\d*\.\d+([eE][\-+]?\d+)?[fFdD]?/, "number.float"],
        [/0[xX][0-9a-fA-F]+[Ll]?/, "number.hex"],
        [/\d+[lLfFdD]?/, "number"],
        [/[;,.]/, "delimiter"],
        [/"""/, "string", "@string_triple"],
        [/s"/, "string.interpolated", "@string_interpolated_s"],
        [/f"/, "string.interpolated", "@string_interpolated_f"],
        [/raw"/, "string.interpolated", "@string_raw"],
        [/"([^"\\]|\\.)*$/, "string.invalid"],
        [/"/, "string", "@string_double"],
        [/'[^\\']'/, "string"],
        [/(')(@escapes)(')/, ["string", "string.escape", "string"]],
        [/'/, "string.invalid"],
      ],
      whitespace: [
        [/[ \t\r\n]+/, "white"],
        [/\/\*\*(?!\/)/, "comment.doc", "@scaladoc"],
        [/\/\*/, "comment", "@comment"],
        [/\/\/.*$/, "comment"],
      ],
      comment: [
        [/[^\/*]+/, "comment"],
        [/\/\*/, "comment", "@push"],
        [/\*\//, "comment", "@pop"],
        [/[\/*]/, "comment"],
      ],
      scaladoc: [
        [/[^\/*@]+/, "comment.doc"],
        [/@\w+/, "comment.doc.tag"],
        [/\/\*/, "comment.doc", "@push"],
        [/\*\//, "comment.doc", "@pop"],
        [/[\/*]/, "comment.doc"],
      ],
      string_triple: [
        [/[^"\\]+/, "string"],
        [/@escapes/, "string.escape"],
        [/"""/, "string", "@pop"],
        [/"/, "string"],
      ],
      string_double: [
        [/[^\\"]+/, "string"],
        [/@escapes/, "string.escape"],
        [/\\./, "string.escape.invalid"],
        [/"/, "string", "@pop"],
      ],
      string_interpolated_s: [
        [/\$\{/, { token: "delimiter.bracket", next: "@interpolated_expr" }],
        [/\$[a-zA-Z_]\w*/, "variable"],
        [/[^"\\$]+/, "string.interpolated"],
        [/@escapes/, "string.escape"],
        [/\\./, "string.escape.invalid"],
        [/"/, "string.interpolated", "@pop"],
      ],
      string_interpolated_f: [
        [/\$\{/, { token: "delimiter.bracket", next: "@interpolated_expr" }],
        [/\$[a-zA-Z_]\w*(%[\w.]+)?/, "variable"],
        [/[^"\\$]+/, "string.interpolated"],
        [/@escapes/, "string.escape"],
        [/\\./, "string.escape.invalid"],
        [/"/, "string.interpolated", "@pop"],
      ],
      string_raw: [
        [/\$\{/, { token: "delimiter.bracket", next: "@interpolated_expr" }],
        [/\$[a-zA-Z_]\w*/, "variable"],
        [/[^"$]+/, "string.interpolated"],
        [/"/, "string.interpolated", "@pop"],
      ],
      interpolated_expr: [
        [/\{/, "delimiter.bracket", "@push"],
        [/\}/, "delimiter.bracket", "@pop"],
        { include: "root" },
      ],
    },
  });

  // ── Language Configuration ─────────────────────────────────────
  monaco.languages.setLanguageConfiguration("scala", {
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
      { open: "'", close: "'", notIn: ["string", "comment"] },
    ],
    surroundingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: '"', close: '"' },
    ],
    folding: {
      markers: { start: /^\s*\/\/\s*region\b/, end: /^\s*\/\/\s*endregion\b/ },
    },
    indentationRules: {
      increaseIndentPattern: /^.*(\{[^}"']*|\([^)"']*)$/,
      decreaseIndentPattern: /^\s*[}\)]/,
    },
    onEnterRules: [
      {
        beforeText: /^\s*\/\*\*(?!\/)([^\*]|\*(?!\/))*$/,
        afterText: /^\s*\*\/$/,
        action: {
          indentAction: monaco.languages.IndentAction.IndentOutdent,
          appendText: " * ",
        },
      },
      {
        beforeText: /^\s*\/\*\*(?!\/)([^\*]|\*(?!\/))*$/,
        action: {
          indentAction: monaco.languages.IndentAction.None,
          appendText: " * ",
        },
      },
      {
        beforeText: /^(\t|[ ])*[ ]\*([ ]([^\*]|\*(?!\/))*)?$/,
        action: {
          indentAction: monaco.languages.IndentAction.None,
          appendText: " * ",
        },
      },
      {
        beforeText: /^(\t|[ ])*[ ]\*\/\s*$/,
        action: {
          indentAction: monaco.languages.IndentAction.None,
          removeText: 1,
        },
      },
    ],
  });

  // ── Scala Standard Library Knowledge Base ──────────────────────
  const scalaStdLib = {
    // --- Types ---
    Int: {
      detail: "type Int = scala.Int",
      doc: "32-bit signed integer. Range: -2³¹ to 2³¹−1.",
      kind: "Class",
      members: [
        "toDouble",
        "toLong",
        "toFloat",
        "toString",
        "abs",
        "max",
        "min",
        "toByte",
        "toShort",
        "toChar",
        "unary_-",
        "unary_~",
        "+",
        "-",
        "*",
        "/",
        "%",
        "&",
        "|",
        "^",
        ">>",
        "<<",
        ">>>",
        "==",
        "!=",
        "<",
        ">",
        "<=",
        ">=",
        "compareTo",
        "intValue",
      ],
    },
    Long: {
      detail: "type Long = scala.Long",
      doc: "64-bit signed integer.",
      kind: "Class",
      members: [
        "toDouble",
        "toInt",
        "toFloat",
        "toString",
        "abs",
        "max",
        "min",
      ],
    },
    Double: {
      detail: "type Double = scala.Double",
      doc: "64-bit IEEE 754 floating point.",
      kind: "Class",
      members: [
        "toInt",
        "toLong",
        "toFloat",
        "toString",
        "abs",
        "max",
        "min",
        "isNaN",
        "isInfinity",
        "round",
        "ceil",
        "floor",
      ],
    },
    Float: {
      detail: "type Float = scala.Float",
      doc: "32-bit IEEE 754 floating point.",
      kind: "Class",
      members: [
        "toInt",
        "toLong",
        "toDouble",
        "toString",
        "isNaN",
        "isInfinity",
      ],
    },
    Boolean: {
      detail: "type Boolean = scala.Boolean",
      doc: "Boolean value: true or false.",
      kind: "Class",
      members: ["unary_!", "&&", "||", "&", "|", "^", "toString"],
    },
    Char: {
      detail: "type Char = scala.Char",
      doc: "16-bit unsigned Unicode character.",
      kind: "Class",
      members: [
        "toInt",
        "toLong",
        "toString",
        "isDigit",
        "isLetter",
        "isWhitespace",
        "toUpper",
        "toLower",
        "isUpper",
        "isLower",
      ],
    },
    String: {
      detail: "class String",
      doc: "An immutable sequence of characters (java.lang.String).",
      kind: "Class",
      members: [
        "length",
        "charAt",
        "substring",
        "indexOf",
        "lastIndexOf",
        "contains",
        "startsWith",
        "endsWith",
        "replace",
        "replaceAll",
        "replaceFirst",
        "split",
        "trim",
        "strip",
        "stripLeading",
        "stripTrailing",
        "toUpperCase",
        "toLowerCase",
        "toInt",
        "toDouble",
        "toLong",
        "toFloat",
        "toBoolean",
        "isEmpty",
        "nonEmpty",
        "head",
        "tail",
        "take",
        "drop",
        "reverse",
        "map",
        "flatMap",
        "filter",
        "foreach",
        "foldLeft",
        "foldRight",
        "mkString",
        "toList",
        "toArray",
        "matches",
        "r",
        "format",
        "padTo",
        "capitalize",
        "distinct",
        "sorted",
        "zip",
        "sliding",
        "grouped",
      ],
    },
    Unit: {
      detail: "type Unit = scala.Unit",
      doc: "The Unit type has only one value: (). Equivalent to Java's void.",
      kind: "Class",
      members: [],
    },
    Null: {
      detail: "type Null",
      doc: "A subtype of all reference types; its only value is null.",
      kind: "Class",
      members: [],
    },
    Nothing: {
      detail: "type Nothing",
      doc: "A subtype of every other type; has no instances. Used for expressions that never return.",
      kind: "Class",
      members: [],
    },
    Any: {
      detail: "type Any",
      doc: "The root of the Scala type hierarchy. Every class inherits from Any.",
      kind: "Class",
      members: [
        "equals",
        "hashCode",
        "toString",
        "isInstanceOf",
        "asInstanceOf",
        "getClass",
        "##",
        "!=",
        "==",
      ],
    },
    AnyRef: {
      detail: "type AnyRef = java.lang.Object",
      doc: "The root of the reference type hierarchy.",
      kind: "Class",
      members: [
        "eq",
        "ne",
        "synchronized",
        "wait",
        "notify",
        "notifyAll",
        "clone",
      ],
    },
    AnyVal: {
      detail: "type AnyVal",
      doc: "The root of the value type hierarchy (Int, Double, etc.).",
      kind: "Class",
      members: [],
    },

    // --- Collections ---
    List: {
      detail: "sealed abstract class List[+A]",
      doc: "An immutable singly-linked list. Pattern matchable with :: and Nil.",
      kind: "Class",
      members: [
        "head",
        "tail",
        "isEmpty",
        "nonEmpty",
        "length",
        "size",
        "map",
        "flatMap",
        "filter",
        "filterNot",
        "find",
        "exists",
        "forall",
        "foreach",
        "foldLeft",
        "foldRight",
        "reduce",
        "reduceLeft",
        "reduceRight",
        "scan",
        "scanLeft",
        "scanRight",
        "take",
        "takeWhile",
        "takeRight",
        "drop",
        "dropWhile",
        "dropRight",
        "slice",
        "contains",
        "indexOf",
        "lastIndexOf",
        "reverse",
        "sorted",
        "sortBy",
        "sortWith",
        "distinct",
        "zip",
        "zipWithIndex",
        "unzip",
        "mkString",
        "toArray",
        "toVector",
        "toSet",
        "toMap",
        "grouped",
        "sliding",
        "patch",
        "updated",
        "prepended",
        "appended",
        "::",
        ":::",
        "+:",
        ":+",
        "collect",
        "partition",
        "span",
        "splitAt",
        "groupBy",
        "count",
        "sum",
        "min",
        "max",
        "product",
        "corresponds",
        "diff",
        "intersect",
        "union",
        "combinations",
        "permutations",
        "flatten",
        "transpose",
      ],
    },
    Seq: {
      detail: "trait Seq[+A]",
      doc: "An ordered sequence of elements. The base trait for List, Vector, etc.",
      kind: "Interface",
      members: [
        "head",
        "tail",
        "isEmpty",
        "nonEmpty",
        "length",
        "size",
        "map",
        "flatMap",
        "filter",
        "find",
        "exists",
        "forall",
        "foreach",
        "foldLeft",
        "foldRight",
        "take",
        "drop",
        "contains",
        "indexOf",
        "reverse",
        "sorted",
        "sortBy",
        "distinct",
        "zip",
        "zipWithIndex",
        "mkString",
        "toList",
        "toVector",
        "toSet",
        "toArray",
        "apply",
        "updated",
        "patch",
        "segmentLength",
        "indexWhere",
        "lastIndexWhere",
        "prefixLength",
        "containsSlice",
        "corresponds",
        "startsWith",
        "endsWith",
      ],
    },
    Vector: {
      detail: "class Vector[+A]",
      doc: "An immutable indexed sequence with effectively constant-time random access and updates.",
      kind: "Class",
      members: [
        "head",
        "tail",
        "isEmpty",
        "length",
        "map",
        "flatMap",
        "filter",
        "find",
        "foreach",
        "foldLeft",
        "take",
        "drop",
        "contains",
        "indexOf",
        "reverse",
        "sorted",
        "distinct",
        "zip",
        "zipWithIndex",
        "mkString",
        "updated",
        "appended",
        "prepended",
        ":+",
        "+:",
        "toList",
        "toArray",
        "toSet",
      ],
    },
    Set: {
      detail: "trait Set[A]",
      doc: "An immutable collection of unique elements.",
      kind: "Interface",
      members: [
        "contains",
        "size",
        "isEmpty",
        "nonEmpty",
        "head",
        "tail",
        "map",
        "flatMap",
        "filter",
        "find",
        "exists",
        "forall",
        "foreach",
        "foldLeft",
        "+",
        "-",
        "++",
        "--",
        "union",
        "intersect",
        "diff",
        "subsetOf",
        "mkString",
        "toList",
        "toArray",
        "toSeq",
      ],
    },
    Map: {
      detail: "trait Map[K, +V]",
      doc: "An immutable key-value store.",
      kind: "Interface",
      members: [
        "apply",
        "get",
        "getOrElse",
        "contains",
        "keys",
        "values",
        "size",
        "isEmpty",
        "nonEmpty",
        "map",
        "flatMap",
        "filter",
        "find",
        "exists",
        "forall",
        "foreach",
        "foldLeft",
        "+",
        "-",
        "++",
        "--",
        "updated",
        "removed",
        "keySet",
        "toList",
        "toArray",
        "toSeq",
        "mkString",
        "mapValues",
        "filterKeys",
        "transform",
        "view",
      ],
    },
    Option: {
      detail: "sealed abstract class Option[+A]",
      doc: "Represents an optional value. Either Some(value) or None.",
      kind: "Class",
      members: [
        "get",
        "getOrElse",
        "isEmpty",
        "nonEmpty",
        "isDefined",
        "map",
        "flatMap",
        "filter",
        "exists",
        "forall",
        "foreach",
        "fold",
        "orElse",
        "contains",
        "toList",
        "toRight",
        "toLeft",
        "zip",
        "unzip",
      ],
    },
    Some: {
      detail: "final case class Some[+A](value: A) extends Option[A]",
      doc: "Contains a value. Constructor for a present Option.",
      kind: "Class",
      members: ["get", "value"],
    },
    None: {
      detail: "object None extends Option[Nothing]",
      doc: "Represents the absence of a value. The empty Option.",
      kind: "Value",
      members: [],
    },
    Either: {
      detail: "sealed abstract class Either[+A, +B]",
      doc: "Represents a value of one of two types: Left[A] or Right[B].",
      kind: "Class",
      members: [
        "isLeft",
        "isRight",
        "left",
        "right",
        "fold",
        "map",
        "flatMap",
        "getOrElse",
        "orElse",
        "swap",
        "toOption",
        "toSeq",
        "toTry",
        "contains",
        "exists",
        "forall",
        "foreach",
        "filterOrElse",
      ],
    },
    Future: {
      detail: "class Future[+T]",
      doc: "A placeholder for a value that may not yet exist. Computations run asynchronously.",
      kind: "Class",
      members: [
        "map",
        "flatMap",
        "filter",
        "foreach",
        "onComplete",
        "isCompleted",
        "value",
        "failed",
        "recover",
        "recoverWith",
        "transform",
        "transformWith",
        "andThen",
        "zip",
        "zipWith",
        "fallbackTo",
        "mapTo",
        "ready",
        "result",
      ],
    },
    Try: {
      detail: "sealed abstract class Try[+T]",
      doc: "Represents a computation that may either succeed (Success) or fail (Failure).",
      kind: "Class",
      members: [
        "get",
        "getOrElse",
        "isSuccess",
        "isFailure",
        "map",
        "flatMap",
        "filter",
        "foreach",
        "fold",
        "recover",
        "recoverWith",
        "toOption",
        "toEither",
        "failed",
        "transform",
      ],
    },
    Array: {
      detail: "class Array[T]",
      doc: "A mutable, indexed, fixed-size sequence backed by a Java array.",
      kind: "Class",
      members: [
        "length",
        "apply",
        "update",
        "head",
        "tail",
        "isEmpty",
        "map",
        "flatMap",
        "filter",
        "find",
        "foreach",
        "foldLeft",
        "take",
        "drop",
        "contains",
        "indexOf",
        "reverse",
        "sorted",
        "distinct",
        "zip",
        "zipWithIndex",
        "mkString",
        "toList",
        "toVector",
        "toSet",
        "clone",
        "copyToArray",
        "slice",
      ],
    },
    Range: {
      detail: "class Range(start: Int, end: Int, step: Int)",
      doc: "A range of ordered integers: (1 to 10), (0 until 5).",
      kind: "Class",
      members: [
        "start",
        "end",
        "step",
        "length",
        "size",
        "isEmpty",
        "map",
        "flatMap",
        "filter",
        "foreach",
        "foldLeft",
        "take",
        "drop",
        "contains",
        "toList",
        "toArray",
        "toVector",
        "by",
        "inclusive",
      ],
    },
    LazyList: {
      detail: "class LazyList[+A]",
      doc: "A lazy immutable linked list. Elements are evaluated only when accessed.",
      kind: "Class",
      members: [
        "head",
        "tail",
        "isEmpty",
        "map",
        "flatMap",
        "filter",
        "take",
        "drop",
        "force",
        "foreach",
        "mkString",
        "toList",
      ],
    },
    Iterator: {
      detail: "trait Iterator[+A]",
      doc: "An iterator over a sequence of elements. Traversable only once.",
      kind: "Interface",
      members: [
        "hasNext",
        "next",
        "map",
        "flatMap",
        "filter",
        "take",
        "drop",
        "foreach",
        "foldLeft",
        "mkString",
        "toList",
        "toArray",
        "toVector",
        "toSet",
        "buffered",
        "grouped",
        "sliding",
        "zip",
        "zipWithIndex",
        "duplicate",
        "span",
        "indexWhere",
        "indexOf",
        "contains",
        "exists",
        "forall",
        "find",
        "count",
        "length",
        "sum",
        "min",
        "max",
        "reduce",
      ],
    },

    // --- Objects / Companions ---
    Predef: {
      detail: "object Predef",
      doc: "Provides definitions automatically imported into every Scala program.",
      kind: "Module",
      members: [
        "println",
        "print",
        "printf",
        "assert",
        "require",
        "identity",
        "implicitly",
        "locally",
        "???",
        "classOf",
        "valueOf",
        "summon",
      ],
    },
    Console: {
      detail: "object Console",
      doc: "Standard console I/O operations.",
      kind: "Module",
      members: [
        "println",
        "print",
        "printf",
        "readLine",
        "in",
        "out",
        "err",
        "withOut",
        "withErr",
        "withIn",
        "flush",
      ],
    },
    Math: {
      detail: "object Math",
      doc: "Contains mathematical methods and constants.",
      kind: "Module",
      members: [
        "abs",
        "max",
        "min",
        "pow",
        "sqrt",
        "cbrt",
        "exp",
        "log",
        "log10",
        "sin",
        "cos",
        "tan",
        "asin",
        "acos",
        "atan",
        "atan2",
        "ceil",
        "floor",
        "round",
        "random",
        "toRadians",
        "toDegrees",
        "PI",
        "E",
        "signum",
        "hypot",
      ],
    },
    Ordering: {
      detail: "trait Ordering[T]",
      doc: "A type class that provides comparison for values of type T.",
      kind: "Interface",
      members: [
        "compare",
        "lt",
        "gt",
        "lteq",
        "gteq",
        "equiv",
        "max",
        "min",
        "on",
        "reverse",
      ],
    },
    Numeric: {
      detail: "trait Numeric[T]",
      doc: "A type class for numeric types.",
      kind: "Interface",
      members: [
        "plus",
        "minus",
        "times",
        "negate",
        "fromInt",
        "toInt",
        "toLong",
        "toFloat",
        "toDouble",
        "zero",
        "one",
        "abs",
        "sign",
        "compare",
      ],
    },
  };

  // ── Method Documentation ───────────────────────────────────────
  const methodDocs = {
    map: {
      sig: "def map[B](f: A => B): C[B]",
      doc: "Builds a new collection by applying a function to all elements.",
    },
    flatMap: {
      sig: "def flatMap[B](f: A => IterableOnce[B]): C[B]",
      doc: "Builds a new collection by applying a function to all elements and flattening the results.",
    },
    filter: {
      sig: "def filter(p: A => Boolean): C[A]",
      doc: "Selects all elements that satisfy the predicate.",
    },
    filterNot: {
      sig: "def filterNot(p: A => Boolean): C[A]",
      doc: "Selects all elements that do NOT satisfy the predicate.",
    },
    find: {
      sig: "def find(p: A => Boolean): Option[A]",
      doc: "Finds the first element satisfying the predicate, if any.",
    },
    exists: {
      sig: "def exists(p: A => Boolean): Boolean",
      doc: "Tests whether any element satisfies the predicate.",
    },
    forall: {
      sig: "def forall(p: A => Boolean): Boolean",
      doc: "Tests whether all elements satisfy the predicate.",
    },
    foreach: {
      sig: "def foreach(f: A => Unit): Unit",
      doc: "Applies a function to each element for its side effects.",
    },
    foldLeft: {
      sig: "def foldLeft[B](z: B)(op: (B, A) => B): B",
      doc: "Applies a binary operator to a start value and all elements, going left to right.",
    },
    foldRight: {
      sig: "def foldRight[B](z: B)(op: (A, B) => B): B",
      doc: "Applies a binary operator to all elements and a start value, going right to left.",
    },
    reduce: {
      sig: "def reduce(op: (A, A) => A): A",
      doc: "Reduces the elements using the specified binary operator.",
    },
    head: {
      sig: "def head: A",
      doc: "Selects the first element. Throws NoSuchElementException if empty.",
    },
    tail: { sig: "def tail: C[A]", doc: "All elements except the first." },
    take: { sig: "def take(n: Int): C[A]", doc: "Takes the first n elements." },
    drop: { sig: "def drop(n: Int): C[A]", doc: "Drops the first n elements." },
    takeWhile: {
      sig: "def takeWhile(p: A => Boolean): C[A]",
      doc: "Takes the longest prefix of elements satisfying the predicate.",
    },
    dropWhile: {
      sig: "def dropWhile(p: A => Boolean): C[A]",
      doc: "Drops the longest prefix of elements satisfying the predicate.",
    },
    sorted: {
      sig: "def sorted[B >: A](implicit ord: Ordering[B]): C[A]",
      doc: "Sorts this collection according to an Ordering.",
    },
    sortBy: {
      sig: "def sortBy[B](f: A => B)(implicit ord: Ordering[B]): C[A]",
      doc: "Sorts by a transformation function.",
    },
    reverse: {
      sig: "def reverse: C[A]",
      doc: "Returns a new collection with elements in reversed order.",
    },
    distinct: { sig: "def distinct: C[A]", doc: "Selects distinct elements." },
    zip: {
      sig: "def zip[B](that: Iterable[B]): C[(A, B)]",
      doc: "Zips this collection with another, returning pairs.",
    },
    zipWithIndex: {
      sig: "def zipWithIndex: C[(A, Int)]",
      doc: "Zips each element with its index.",
    },
    mkString: {
      sig: "def mkString(sep: String): String",
      doc: "Displays all elements separated by a string.",
    },
    contains: {
      sig: "def contains(elem: A): Boolean",
      doc: "Tests whether this collection contains a given value.",
    },
    isEmpty: {
      sig: "def isEmpty: Boolean",
      doc: "Tests whether the collection is empty.",
    },
    nonEmpty: {
      sig: "def nonEmpty: Boolean",
      doc: "Tests whether the collection is not empty.",
    },
    size: { sig: "def size: Int", doc: "The number of elements." },
    length: {
      sig: "def length: Int",
      doc: "The number of elements (alias for size).",
    },
    toList: {
      sig: "def toList: List[A]",
      doc: "Converts this collection to a List.",
    },
    toArray: {
      sig: "def toArray: Array[A]",
      doc: "Converts this collection to an Array.",
    },
    toVector: {
      sig: "def toVector: Vector[A]",
      doc: "Converts this collection to a Vector.",
    },
    toSet: {
      sig: "def toSet: Set[A]",
      doc: "Converts this collection to a Set.",
    },
    toMap: {
      sig: "def toMap: Map[K, V]",
      doc: "Converts this collection of pairs to a Map.",
    },
    groupBy: {
      sig: "def groupBy[K](f: A => K): Map[K, C[A]]",
      doc: "Partitions elements into a map according to a discriminator function.",
    },
    partition: {
      sig: "def partition(p: A => Boolean): (C[A], C[A])",
      doc: "Splits elements into those satisfying / not satisfying a predicate.",
    },
    collect: {
      sig: "def collect[B](pf: PartialFunction[A, B]): C[B]",
      doc: "Builds a new collection by applying a partial function to all elements on which it is defined.",
    },
    flatten: {
      sig: "def flatten: C[A]",
      doc: "Converts a collection of collections into a flat collection.",
    },
    sum: { sig: "def sum: A", doc: "Sums all elements (requires Numeric)." },
    min: {
      sig: "def min: A",
      doc: "Finds the smallest element (requires Ordering).",
    },
    max: {
      sig: "def max: A",
      doc: "Finds the largest element (requires Ordering).",
    },
    product: {
      sig: "def product: A",
      doc: "Multiplies all elements (requires Numeric).",
    },
    count: {
      sig: "def count(p: A => Boolean): Int",
      doc: "Counts elements satisfying the predicate.",
    },
    slice: {
      sig: "def slice(from: Int, until: Int): C[A]",
      doc: "Selects an interval of elements.",
    },
    sliding: {
      sig: "def sliding(size: Int): Iterator[C[A]]",
      doc: "Groups elements in fixed size sliding windows.",
    },
    grouped: {
      sig: "def grouped(size: Int): Iterator[C[A]]",
      doc: "Partitions elements into fixed size groups.",
    },
    span: {
      sig: "def span(p: A => Boolean): (C[A], C[A])",
      doc: "Splits at the first element not satisfying the predicate.",
    },
    updated: {
      sig: "def updated(index: Int, elem: A): C[A]",
      doc: "A copy of this collection with one element replaced.",
    },
    patch: {
      sig: "def patch(from: Int, other: C[A], replaced: Int): C[A]",
      doc: "Produces a new collection with a patch applied.",
    },
    get: {
      sig: "def get: A",
      doc: "Returns the contained value. Throws if empty.",
    },
    getOrElse: {
      sig: "def getOrElse[B >: A](default: => B): B",
      doc: "Returns the value if present, otherwise the default.",
    },
    orElse: {
      sig: "def orElse[B >: A](alternative: => Option[B]): Option[B]",
      doc: "Returns this Option if non-empty, otherwise the alternative.",
    },
    fold: {
      sig: "def fold[B](ifEmpty: => B)(f: A => B): B",
      doc: "Returns the result of applying f to this value if non-empty, or ifEmpty.",
    },
    println: {
      sig: "def println(x: Any): Unit",
      doc: "Prints a value followed by a newline to standard output.",
    },
    print: {
      sig: "def print(x: Any): Unit",
      doc: "Prints a value to standard output.",
    },
    assert: {
      sig: "def assert(assertion: Boolean): Unit",
      doc: "Tests an expression, throwing AssertionError on failure.",
    },
    require: {
      sig: "def require(requirement: Boolean): Unit",
      doc: "Tests an expression, throwing IllegalArgumentException on failure.",
    },
  };

  // ── Code Snippets ──────────────────────────────────────────────
  const scalaSnippets = [
    {
      label: "main",
      detail: "Main method (Scala 3)",
      insert:
        '@main def ${1:main}(${2:args: String*}): Unit =\n  ${3:println("Hello, Scala!")}\n',
      doc: "Scala 3 @main entry point.",
    },
    {
      label: "object-main",
      detail: "Main object with App",
      insert:
        'object ${1:Main} extends App {\n  ${2:println("Hello, Scala!")}\n}\n',
      doc: "Singleton object extending App trait.",
    },
    {
      label: "object-def-main",
      detail: "Object with def main",
      insert:
        'object ${1:Main} {\n  def main(args: Array[String]): Unit = {\n    ${2:println("Hello, Scala!")}\n  }\n}\n',
      doc: "Object with explicit main method.",
    },
    {
      label: "class",
      detail: "Class definition",
      insert:
        "class ${1:MyClass}(${2:val name: String}) {\n  ${3:// body}\n}\n",
      doc: "A Scala class with constructor parameters.",
    },
    {
      label: "case-class",
      detail: "Case class",
      insert: "case class ${1:Person}(${2:name: String, age: Int})\n",
      doc: "An immutable data class with auto-generated equals, hashCode, toString, copy.",
    },
    {
      label: "trait",
      detail: "Trait definition",
      insert: "trait ${1:MyTrait} {\n  def ${2:method}: ${3:Unit}\n}\n",
      doc: "A trait (interface with optional implementations).",
    },
    {
      label: "sealed-trait",
      detail: "Sealed trait + case classes",
      insert:
        "sealed trait ${1:Shape}\ncase class ${2:Circle}(radius: Double) extends ${1:Shape}\ncase class ${3:Rectangle}(width: Double, height: Double) extends ${1:Shape}\n",
      doc: "ADT pattern: sealed trait with case class variants.",
    },
    {
      label: "enum",
      detail: "Enum (Scala 3)",
      insert: "enum ${1:Color} {\n  case ${2:Red, Green, Blue}\n}\n",
      doc: "Scala 3 enum type.",
    },
    {
      label: "enum-param",
      detail: "Enum with parameters (Scala 3)",
      insert:
        "enum ${1:Planet}(val mass: Double, val radius: Double) {\n  case ${2:Mercury} extends ${1:Planet}(3.303e+23, 2.4397e6)\n  case ${3:Earth} extends ${1:Planet}(5.976e+24, 6.37814e6)\n}\n",
      doc: "Scala 3 parametric enum.",
    },
    {
      label: "object",
      detail: "Singleton object",
      insert: "object ${1:MyObject} {\n  ${2:// body}\n}\n",
      doc: "A singleton object.",
    },
    {
      label: "companion",
      detail: "Companion object",
      insert:
        "object ${1:MyClass} {\n  def apply(${2:args}): ${1:MyClass} = new ${1:MyClass}(${3:args})\n}\n",
      doc: "Companion object with factory method.",
    },
    {
      label: "def",
      detail: "Method definition",
      insert:
        "def ${1:method}(${2:params}): ${3:ReturnType} = {\n  ${4:???}\n}\n",
      doc: "Define a method.",
    },
    {
      label: "defv",
      detail: "Value method (short)",
      insert: "def ${1:name}: ${2:String} = ${3:???}\n",
      doc: "Short method definition (no parens, expression body).",
    },
    {
      label: "val",
      detail: "Immutable value",
      insert: "val ${1:name}: ${2:Type} = ${3:value}\n",
      doc: "An immutable value binding.",
    },
    {
      label: "var",
      detail: "Mutable variable",
      insert: "var ${1:name}: ${2:Type} = ${3:value}\n",
      doc: "A mutable variable binding.",
    },
    {
      label: "lazy",
      detail: "Lazy val",
      insert: "lazy val ${1:name}: ${2:Type} = {\n  ${3:???}\n}\n",
      doc: "A lazily evaluated value.",
    },
    {
      label: "for-yield",
      detail: "For comprehension (yield)",
      insert:
        "for {\n  ${1:x} <- ${2:collection}\n  ${3:if ${4:condition}}\n} yield ${5:x}\n",
      doc: "For comprehension with yield.",
    },
    {
      label: "for-each",
      detail: "For comprehension (side effect)",
      insert: "for {\n  ${1:x} <- ${2:collection}\n} {\n  ${3:println(x)}\n}\n",
      doc: "For comprehension for side effects.",
    },
    {
      label: "match",
      detail: "Pattern match",
      insert:
        "${1:value} match {\n  case ${2:pattern} => ${3:result}\n  case _ => ${4:default}\n}\n",
      doc: "Match expression with pattern matching.",
    },
    {
      label: "match-option",
      detail: "Match on Option",
      insert:
        "${1:opt} match {\n  case Some(${2:value}) => ${3:???}\n  case None => ${4:???}\n}\n",
      doc: "Pattern match on an Option.",
    },
    {
      label: "match-either",
      detail: "Match on Either",
      insert:
        "${1:either} match {\n  case Right(${2:value}) => ${3:???}\n  case Left(${4:error}) => ${5:???}\n}\n",
      doc: "Pattern match on an Either.",
    },
    {
      label: "match-try",
      detail: "Match on Try",
      insert:
        "${1:result} match {\n  case Success(${2:value}) => ${3:???}\n  case Failure(${4:exception}) => ${5:???}\n}\n",
      doc: "Pattern match on a Try.",
    },
    {
      label: "try-catch",
      detail: "Try-catch-finally",
      insert:
        "try {\n  ${1:???}\n} catch {\n  case e: ${2:Exception} => ${3:???}\n} finally {\n  ${4:// cleanup}\n}\n",
      doc: "Exception handling.",
    },
    {
      label: "if-else",
      detail: "If-else expression",
      insert: "if (${1:condition}) {\n  ${2:???}\n} else {\n  ${3:???}\n}\n",
      doc: "Conditional expression.",
    },
    {
      label: "while",
      detail: "While loop",
      insert: "while (${1:condition}) {\n  ${2:???}\n}\n",
      doc: "While loop.",
    },
    {
      label: "implicit-class",
      detail: "Implicit (extension) class",
      insert:
        "implicit class ${1:RichType}(val ${2:self}: ${3:Type}) extends AnyVal {\n  def ${4:method}: ${5:ReturnType} = ${6:???}\n}\n",
      doc: "Implicit class for extension methods (Scala 2 style).",
    },
    {
      label: "extension",
      detail: "Extension method (Scala 3)",
      insert:
        "extension (${1:self}: ${2:Type})\n  def ${3:method}: ${4:ReturnType} = ${5:???}\n",
      doc: "Scala 3 extension method.",
    },
    {
      label: "given",
      detail: "Given instance (Scala 3)",
      insert:
        "given ${1:name}: ${2:Type} with {\n  ${3:// implementation}\n}\n",
      doc: "Scala 3 given instance (replaces implicits).",
    },
    {
      label: "using",
      detail: "Using clause (Scala 3)",
      insert:
        "def ${1:method}(${2:params})(using ${3:ctx}: ${4:Type}): ${5:ReturnType} = {\n  ${6:???}\n}\n",
      doc: "Scala 3 context parameter.",
    },
    {
      label: "type-alias",
      detail: "Type alias",
      insert: "type ${1:Name} = ${2:Type}\n",
      doc: "A type alias definition.",
    },
    {
      label: "opaque",
      detail: "Opaque type (Scala 3)",
      insert:
        "opaque type ${1:Name} = ${2:Type}\nobject ${1:Name} {\n  def apply(value: ${2:Type}): ${1:Name} = value\n}\n",
      doc: "Scala 3 opaque type alias.",
    },
    {
      label: "package",
      detail: "Package declaration",
      insert: "package ${1:com.example}\n",
      doc: "Package declaration.",
    },
    {
      label: "import",
      detail: "Import statement",
      insert: "import ${1:scala.collection.mutable}\n",
      doc: "Import statement.",
    },
    {
      label: "import-given",
      detail: "Import given (Scala 3)",
      insert: "import ${1:module}.{given, *}\n",
      doc: "Scala 3 given import.",
    },
    {
      label: "future",
      detail: "Future computation",
      insert:
        "import scala.concurrent.{Future, ExecutionContext}\nimport ExecutionContext.Implicits.global\n\nval ${1:result}: Future[${2:String}] = Future {\n  ${3:// async computation}\n  ${4:???}\n}\n",
      doc: "Create an async Future.",
    },
    {
      label: "test-suite",
      detail: "Test suite (scalatest-like)",
      insert:
        'class ${1:MySpec} extends AnyFlatSpec with Matchers {\n  "${2:A thing}" should "${3:do something}" in {\n    ${4:1 + 1} shouldBe ${5:2}\n  }\n}\n',
      doc: "A test suite skeleton.",
    },
    {
      label: "sbt-build",
      detail: "build.sbt skeleton",
      insert:
        'ThisBuild / scalaVersion := "${1:3.3.1}"\nThisBuild / version := "${2:0.1.0}"\n\nlazy val root = (project in file("."))\n  .settings(\n    name := "${3:my-project}",\n    libraryDependencies ++= Seq(\n      ${4:// dependencies}\n    )\n  )\n',
      doc: "Basic sbt build file.",
    },
    {
      label: "println",
      detail: "Print line",
      insert: 'println(${1:s"${2:message}"})\n',
      doc: "Print to standard output.",
    },
    {
      label: "require",
      detail: "Require precondition",
      insert: 'require(${1:condition}, ${2:"error message"})\n',
      doc: "Precondition check.",
    },
    {
      label: "assert",
      detail: "Assert expression",
      insert: 'assert(${1:condition}, ${2:"assertion message"})\n',
      doc: "Assertion check.",
    },
    {
      label: "???",
      detail: "Not implemented",
      insert: "???",
      doc: "Throws NotImplementedError. Placeholder for unimplemented code.",
    },
  ];

  // ── Completion Provider ────────────────────────────────────────
  monaco.languages.registerCompletionItemProvider("scala", {
    triggerCharacters: [".", " ", "(", "@"],
    provideCompletionItems: function (model, position) {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };
      const textUntilPos = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });
      const suggestions = [];

      // Dot completion: show members
      const dotMatch = textUntilPos.match(/(\w+)\.\s*(\w*)$/);
      if (dotMatch) {
        const objName = dotMatch[1];
        const prefix = dotMatch[2] || "";
        const r = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: position.column - prefix.length,
          endColumn: position.column,
        };

        // find type from variable declarations in the document
        let resolvedType = null;
        const fullText = model.getValue();
        const varDecl = new RegExp(
          "(?:val|var|def)\\s+" + objName + "\\s*:\\s*(\\w+)",
          "m",
        );
        const varMatch = fullText.match(varDecl);
        if (varMatch) resolvedType = varMatch[1];

        // Check if objName is directly a known type / object
        const targetType =
          scalaStdLib[objName] || (resolvedType && scalaStdLib[resolvedType]);
        if (targetType && targetType.members) {
          targetType.members.forEach((m) => {
            const md = methodDocs[m];
            suggestions.push({
              label: m,
              kind: md
                ? monaco.languages.CompletionItemKind.Method
                : monaco.languages.CompletionItemKind.Property,
              detail: md ? md.sig : `member of ${objName}`,
              documentation: md ? md.doc : "",
              insertText: m,
              range: r,
              sortText: "0" + m,
            });
          });
        }
        return { suggestions };
      }

      // Annotation completion
      if (textUntilPos.match(/@\w*$/)) {
        const annotations = [
          { label: "@main", doc: "Scala 3 main entry point annotation." },
          { label: "@tailrec", doc: "Verifies the method is tail-recursive." },
          { label: "@deprecated", doc: "Marks a definition as deprecated." },
          { label: "@inline", doc: "Requests the compiler inline the method." },
          { label: "@noinline", doc: "Prevents the compiler from inlining." },
          {
            label: "@throws",
            doc: "Declares checked exceptions for Java interop.",
          },
          { label: "@unchecked", doc: "Suppresses exhaustiveness warnings." },
          { label: "@volatile", doc: "Marks a field as volatile." },
          {
            label: "@transient",
            doc: "Marks a field as transient (not serialized).",
          },
          {
            label: "@specialized",
            doc: "Generates specialized versions for primitive types.",
          },
          {
            label: "@targetName",
            doc: "Scala 3: sets the name used in bytecode.",
          },
          {
            label: "@experimental",
            doc: "Scala 3: marks a definition as experimental.",
          },
        ];
        annotations.forEach((a) => {
          suggestions.push({
            label: a.label,
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "annotation",
            documentation: a.doc,
            insertText: a.label.substring(1),
            range,
            sortText: "0" + a.label,
          });
        });
        return { suggestions };
      }

      // Snippets
      scalaSnippets.forEach((s) => {
        suggestions.push({
          label: s.label,
          kind: monaco.languages.CompletionItemKind.Snippet,
          detail: s.detail,
          documentation: { value: s.doc },
          insertText: s.insert,
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range,
          sortText: "2" + s.label,
        });
      });

      // Keywords
      const kws = [
        "abstract",
        "case",
        "catch",
        "class",
        "def",
        "do",
        "else",
        "enum",
        "export",
        "extends",
        "extension",
        "false",
        "final",
        "finally",
        "for",
        "forSome",
        "given",
        "if",
        "implicit",
        "import",
        "lazy",
        "match",
        "new",
        "null",
        "object",
        "override",
        "package",
        "private",
        "protected",
        "return",
        "sealed",
        "super",
        "then",
        "this",
        "throw",
        "trait",
        "true",
        "try",
        "type",
        "using",
        "val",
        "var",
        "while",
        "with",
        "yield",
        "end",
        "derives",
        "inline",
        "opaque",
        "open",
        "transparent",
        "infix",
      ];
      kws.forEach((k) => {
        suggestions.push({
          label: k,
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: k,
          range,
          sortText: "3" + k,
        });
      });

      // Types
      Object.entries(scalaStdLib).forEach(([name, info]) => {
        const kindMap = {
          Class: monaco.languages.CompletionItemKind.Class,
          Interface: monaco.languages.CompletionItemKind.Interface,
          Module: monaco.languages.CompletionItemKind.Module,
          Value: monaco.languages.CompletionItemKind.Value,
        };
        suggestions.push({
          label: name,
          kind: kindMap[info.kind] || monaco.languages.CompletionItemKind.Class,
          detail: info.detail,
          documentation: { value: info.doc },
          insertText: name,
          range,
          sortText: "1" + name,
        });
      });

      // Common top-level functions
      [
        "println",
        "print",
        "printf",
        "assert",
        "require",
        "identity",
        "implicitly",
        "locally",
        "classOf",
        "summon",
      ].forEach((f) => {
        const md = methodDocs[f];
        suggestions.push({
          label: f,
          kind: monaco.languages.CompletionItemKind.Function,
          detail: md ? md.sig : "Predef." + f,
          documentation: md ? md.doc : "",
          insertText: f,
          range,
          sortText: "1" + f,
        });
      });

      return { suggestions };
    },
  });

  // ── Hover Provider ─────────────────────────────────────────────
  monaco.languages.registerHoverProvider("scala", {
    provideHover: function (model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return null;
      const token = word.word;
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };

      // Check stdlib
      if (scalaStdLib[token]) {
        const info = scalaStdLib[token];
        let md = `**${info.detail}**\n\n${info.doc}`;
        if (info.members && info.members.length > 0) {
          md += `\n\n**Key members:** \`${info.members.slice(0, 15).join("`, `")}\`${info.members.length > 15 ? ", …" : ""}`;
        }
        return { range, contents: [{ value: md }] };
      }

      // Check method docs
      if (methodDocs[token]) {
        const info = methodDocs[token];
        return {
          range,
          contents: [
            { value: `\`\`\`scala\n${info.sig}\n\`\`\`\n${info.doc}` },
          ],
        };
      }

      // Check keyword docs
      const kwDocs = {
        val: "Declares an immutable value binding.",
        var: "Declares a mutable variable.",
        def: "Declares a method.",
        class: "Declares a class.",
        object: "Declares a singleton object.",
        trait: "Declares a trait (interface).",
        case: "Used in case classes, case objects, and pattern matching.",
        sealed:
          "Restricts subclassing to the same file. Enables exhaustive matching.",
        abstract: "Declares an abstract class or member.",
        override: "Overrides a superclass member.",
        extends: "Inherits from a class or trait.",
        with: "Mixes in a trait.",
        import: "Imports definitions from a package or object.",
        package: "Declares the package.",
        if: "Conditional expression.",
        else: "Alternative branch of if.",
        while: "While loop.",
        for: "For comprehension / loop.",
        yield: "Produces a value from a for comprehension.",
        match: "Pattern matching expression.",
        try: "Begin exception handling block.",
        catch: "Handle exceptions.",
        finally: "Cleanup after try block.",
        throw: "Throw an exception.",
        return: "Return a value from a method (discouraged).",
        new: "Create a new instance.",
        this: "Reference to the current object.",
        super: "Reference to the parent class.",
        true: "Boolean literal true.",
        false: "Boolean literal false.",
        null: "Null reference (discouraged).",
        type: "Type alias or abstract type member.",
        lazy: "Defers evaluation until first access.",
        implicit:
          "Declares an implicit value, conversion, or parameter (Scala 2).",
        given: "Declares a given instance (Scala 3 – replaces implicit).",
        using:
          "Context parameter clause (Scala 3 – replaces implicit parameter).",
        enum: "Declares an enumeration (Scala 3).",
        extension: "Declares extension methods (Scala 3).",
        inline: "Requests compile-time inlining (Scala 3).",
        opaque: "Declares an opaque type alias (Scala 3).",
        derives: "Auto-derives type class instances (Scala 3).",
        export: "Re-exports selected members of an object (Scala 3).",
        end: "End marker for long definitions (Scala 3).",
        open: "Allows a class to be extended in other files (Scala 3).",
        transparent: "Transparent trait or inline (Scala 3).",
        infix: "Marks a method for infix notation (Scala 3).",
        private: "Restricts access to the enclosing class/object.",
        protected: "Restricts access to the class and its subclasses.",
        final: "Prevents overriding or subclassing.",
      };
      if (kwDocs[token]) {
        return {
          range,
          contents: [
            { value: `**\`${token}\`** *(keyword)*\n\n${kwDocs[token]}` },
          ],
        };
      }

      // Local definitions – search in file
      const fullText = model.getValue();
      const localPatterns = [
        new RegExp(
          `(val|var|lazy val)\\s+${token}\\s*:\\s*([\\w\\[\\], ]+)\\s*=`,
          "m",
        ),
        new RegExp(`(val|var|lazy val)\\s+${token}\\s*=\\s*(.+)`, "m"),
        new RegExp(
          `def\\s+${token}\\s*(\\([^)]*\\))*\\s*(?::\\s*([\\w\\[\\], ]+))?`,
          "m",
        ),
        new RegExp(
          `class\\s+${token}\\s*(\\([^)]*\\))?\\s*(extends\\s+\\S+)?`,
          "m",
        ),
        new RegExp(`case\\s+class\\s+${token}\\s*(\\([^)]*\\))`, "m"),
        new RegExp(`object\\s+${token}`, "m"),
        new RegExp(`trait\\s+${token}`, "m"),
        new RegExp(`type\\s+${token}\\s*=\\s*(.+)`, "m"),
        new RegExp(`enum\\s+${token}`, "m"),
      ];
      for (const pat of localPatterns) {
        const m = fullText.match(pat);
        if (m) {
          return {
            range,
            contents: [
              {
                value:
                  "```scala\n" +
                  m[0].trim() +
                  "\n```\n*(defined in this file)*",
              },
            ],
          };
        }
      }

      return null;
    },
  });

  // ── Definition Provider ────────────────────────────────────────
  monaco.languages.registerDefinitionProvider("scala", {
    provideDefinition: function (model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return null;
      const token = word.word;
      const lines = model.getLinesContent();
      const patterns = [
        new RegExp(`^\\s*(?:val|var|lazy\\s+val)\\s+${token}\\b`),
        new RegExp(`^\\s*(?:private|protected)?\\s*def\\s+${token}\\b`),
        new RegExp(`^\\s*(?:case\\s+)?class\\s+${token}\\b`),
        new RegExp(`^\\s*(?:case\\s+)?object\\s+${token}\\b`),
        new RegExp(`^\\s*trait\\s+${token}\\b`),
        new RegExp(`^\\s*type\\s+${token}\\b`),
        new RegExp(`^\\s*enum\\s+${token}\\b`),
        new RegExp(`^\\s*(?:given)\\s+${token}\\b`),
      ];
      for (let i = 0; i < lines.length; i++) {
        for (const pat of patterns) {
          if (pat.test(lines[i])) {
            const col = lines[i].indexOf(token) + 1;
            return {
              uri: model.uri,
              range: {
                startLineNumber: i + 1,
                endLineNumber: i + 1,
                startColumn: col,
                endColumn: col + token.length,
              },
            };
          }
        }
      }
      return null;
    },
  });

  // ── Signature Help Provider ────────────────────────────────────
  monaco.languages.registerSignatureHelpProvider("scala", {
    signatureHelpTriggerCharacters: ["(", ","],
    provideSignatureHelp: function (model, position) {
      const textUntilPos = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });
      const fnMatch = textUntilPos.match(/(\w+)\s*\(([^)]*)$/);
      if (!fnMatch) return null;
      const fnName = fnMatch[1];
      const argsSoFar = fnMatch[2];
      const activeParam = (argsSoFar.match(/,/g) || []).length;

      const sigs = {
        println: {
          label: "println(x: Any): Unit",
          params: [{ label: "x: Any", doc: "The value to print." }],
        },
        print: {
          label: "print(x: Any): Unit",
          params: [{ label: "x: Any", doc: "The value to print." }],
        },
        printf: {
          label: "printf(fmt: String, args: Any*): Unit",
          params: [
            { label: "fmt: String", doc: "Format string." },
            { label: "args: Any*", doc: "Format arguments." },
          ],
        },
        assert: {
          label: "assert(assertion: Boolean, message: => Any): Unit",
          params: [
            { label: "assertion: Boolean", doc: "The condition to test." },
            { label: "message: => Any", doc: "Error message on failure." },
          ],
        },
        require: {
          label: "require(requirement: Boolean, message: => Any): Unit",
          params: [
            { label: "requirement: Boolean", doc: "The precondition." },
            { label: "message: => Any", doc: "Error message on failure." },
          ],
        },
        map: {
          label: "map[B](f: A => B): C[B]",
          params: [{ label: "f: A => B", doc: "The transformation function." }],
        },
        flatMap: {
          label: "flatMap[B](f: A => IterableOnce[B]): C[B]",
          params: [
            {
              label: "f: A => IterableOnce[B]",
              doc: "Function returning a collection.",
            },
          ],
        },
        filter: {
          label: "filter(p: A => Boolean): C[A]",
          params: [
            { label: "p: A => Boolean", doc: "The predicate to satisfy." },
          ],
        },
        foldLeft: {
          label: "foldLeft[B](z: B)(op: (B, A) => B): B",
          params: [
            { label: "z: B", doc: "The initial accumulator value." },
            { label: "op: (B, A) => B", doc: "The combining function." },
          ],
        },
        find: {
          label: "find(p: A => Boolean): Option[A]",
          params: [
            { label: "p: A => Boolean", doc: "The predicate to match." },
          ],
        },
        mkString: {
          label: "mkString(sep: String): String",
          params: [{ label: "sep: String", doc: "The separator string." }],
        },
        getOrElse: {
          label: "getOrElse[B >: A](default: => B): B",
          params: [{ label: "default: => B", doc: "The default value." }],
        },
        sortBy: {
          label: "sortBy[B](f: A => B)(implicit ord: Ordering[B]): C[A]",
          params: [{ label: "f: A => B", doc: "Key extraction function." }],
        },
        take: {
          label: "take(n: Int): C[A]",
          params: [{ label: "n: Int", doc: "The number of elements to take." }],
        },
        drop: {
          label: "drop(n: Int): C[A]",
          params: [{ label: "n: Int", doc: "The number of elements to drop." }],
        },
        slice: {
          label: "slice(from: Int, until: Int): C[A]",
          params: [
            { label: "from: Int", doc: "Start index (inclusive)." },
            { label: "until: Int", doc: "End index (exclusive)." },
          ],
        },
        exists: {
          label: "exists(p: A => Boolean): Boolean",
          params: [{ label: "p: A => Boolean", doc: "The predicate." }],
        },
        forall: {
          label: "forall(p: A => Boolean): Boolean",
          params: [{ label: "p: A => Boolean", doc: "The predicate." }],
        },
        foreach: {
          label: "foreach(f: A => Unit): Unit",
          params: [
            { label: "f: A => Unit", doc: "The side-effecting function." },
          ],
        },
        count: {
          label: "count(p: A => Boolean): Int",
          params: [{ label: "p: A => Boolean", doc: "The predicate." }],
        },
        zip: {
          label: "zip[B](that: Iterable[B]): C[(A, B)]",
          params: [
            { label: "that: Iterable[B]", doc: "The other collection." },
          ],
        },
        contains: {
          label: "contains(elem: A): Boolean",
          params: [{ label: "elem: A", doc: "The element to look for." }],
        },
        indexOf: {
          label: "indexOf(elem: A): Int",
          params: [{ label: "elem: A", doc: "The element to find." }],
        },
        groupBy: {
          label: "groupBy[K](f: A => K): Map[K, C[A]]",
          params: [{ label: "f: A => K", doc: "The discriminator function." }],
        },
        collect: {
          label: "collect[B](pf: PartialFunction[A, B]): C[B]",
          params: [
            {
              label: "pf: PartialFunction[A, B]",
              doc: "The partial function.",
            },
          ],
        },
        updated: {
          label: "updated(index: Int, elem: A): C[A]",
          params: [
            { label: "index: Int", doc: "The index to replace." },
            { label: "elem: A", doc: "The new element." },
          ],
        },
        patch: {
          label: "patch(from: Int, other: C[A], replaced: Int): C[A]",
          params: [
            { label: "from: Int", doc: "Start index." },
            { label: "other: C[A]", doc: "The patch elements." },
            { label: "replaced: Int", doc: "Number of elements to replace." },
          ],
        },
      };

      const sig = sigs[fnName];
      if (!sig) return null;
      return {
        value: {
          signatures: [
            {
              label: sig.label,
              parameters: sig.params.map((p) => ({
                label: p.label,
                documentation: p.doc,
              })),
            },
          ],
          activeSignature: 0,
          activeParameter: Math.min(activeParam, sig.params.length - 1),
        },
        dispose: function () {},
      };
    },
  });

  // ── Document Formatting Provider ───────────────────────────────
  monaco.languages.registerDocumentFormattingEditProvider("scala", {
    provideDocumentFormattingEdits: function (model) {
      const text = model.getValue();
      let formatted = text;
      // Normalize trailing whitespace and ensure final newline
      formatted = formatted.replace(/[ \t]+$/gm, "");
      if (!formatted.endsWith("\n")) formatted += "\n";
      // Normalize spaces around = in assignments (simple heuristic)
      formatted = formatted.replace(/(\w)\s*=\s*(?!=)/g, "$1 = ");
      formatted = formatted.replace(/\s*=>\s*/g, " => ");
      formatted = formatted.replace(/\s*<-\s*/g, " <- ");
      const range = model.getFullModelRange();
      return [{ range, text: formatted }];
    },
  });

  // ── Diagnostics (simple linting) ───────────────────────────────
  function validateScala(model) {
    const markers = [];
    const lines = model.getLinesContent();
    lines.forEach((line, i) => {
      // Unmatched brackets per line (very simple)
      const open = (line.match(/\(/g) || []).length;
      const close = (line.match(/\)/g) || []).length;
      if (open > close + 2) {
        markers.push({
          severity: monaco.MarkerSeverity.Warning,
          message: "Possible unmatched parenthesis.",
          startLineNumber: i + 1,
          endLineNumber: i + 1,
          startColumn: 1,
          endColumn: line.length + 1,
        });
      }
      // var usage hint
      if (/^\s*var\s+/.test(line)) {
        markers.push({
          severity: monaco.MarkerSeverity.Hint,
          message: "Consider using `val` for immutability.",
          startLineNumber: i + 1,
          endLineNumber: i + 1,
          startColumn: line.indexOf("var") + 1,
          endColumn: line.indexOf("var") + 4,
        });
      }
      // return usage hint
      if (/\breturn\b/.test(line) && !/\/\//.test(line.split("return")[0])) {
        const col = line.indexOf("return");
        markers.push({
          severity: monaco.MarkerSeverity.Info,
          message:
            "Explicit `return` is discouraged in Scala. The last expression is the return value.",
          startLineNumber: i + 1,
          endLineNumber: i + 1,
          startColumn: col + 1,
          endColumn: col + 7,
        });
      }
      // null usage warning
      if (/\bnull\b/.test(line) && !/\/\//.test(line.split("null")[0])) {
        const col = line.indexOf("null");
        markers.push({
          severity: monaco.MarkerSeverity.Warning,
          message: "Avoid `null`. Use `Option` instead.",
          startLineNumber: i + 1,
          endLineNumber: i + 1,
          startColumn: col + 1,
          endColumn: col + 5,
        });
      }
      // ??? reminder
      if (/\?\?\?/.test(line) && !/\/\//.test(line.split("???")[0])) {
        const col = line.indexOf("???");
        markers.push({
          severity: monaco.MarkerSeverity.Warning,
          message:
            "Unimplemented code (???). Will throw NotImplementedError at runtime.",
          startLineNumber: i + 1,
          endLineNumber: i + 1,
          startColumn: col + 1,
          endColumn: col + 4,
        });
      }
    });
    monaco.editor.setModelMarkers(model, "scala-lint", markers);
  }

  // ─── Rename Provider (scope-aware) ──────────────────────────────────
  monaco.languages.registerRenameProvider("scala", {
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
        /\b(class|object|trait|enum|given|package)\b/.test(prefix);

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

      // Local declarations: val/var bindings and parameters.
      const declaration = new RegExp(
        "\\b(?:val|var)\\s+" +
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
