import type * as Monaco from "monaco-editor";

export default (monaco: typeof Monaco) => {
  // ─── Register Kotlin Language ───────────────────────────────────────────────
  monaco.languages.register({
    id: "kotlin",
    extensions: [".kt", ".kts"],
    aliases: ["Kotlin", "kotlin"],
  });

  // ─── Monarch Tokenizer ──────────────────────────────────────────────────────
  monaco.languages.setMonarchTokensProvider("kotlin", {
    defaultToken: "",
    tokenPostfix: ".kotlin",

    keywords: [
      "abstract",
      "actual",
      "annotation",
      "as",
      "break",
      "by",
      "catch",
      "class",
      "companion",
      "const",
      "constructor",
      "continue",
      "crossinline",
      "data",
      "delegate",
      "do",
      "dynamic",
      "else",
      "enum",
      "expect",
      "external",
      "field",
      "file",
      "final",
      "finally",
      "for",
      "fun",
      "get",
      "if",
      "import",
      "in",
      "infix",
      "init",
      "inline",
      "inner",
      "interface",
      "internal",
      "is",
      "it",
      "lateinit",
      "noinline",
      "null",
      "object",
      "open",
      "operator",
      "out",
      "override",
      "package",
      "param",
      "private",
      "property",
      "protected",
      "public",
      "receiver",
      "reified",
      "return",
      "sealed",
      "set",
      "setparam",
      "super",
      "suspend",
      "tailrec",
      "this",
      "throw",
      "try",
      "typealias",
      "typeof",
      "val",
      "var",
      "vararg",
      "when",
      "where",
      "while",
      "yield",
      "value",
    ],

    typeKeywords: [
      "Boolean",
      "Byte",
      "Char",
      "Double",
      "Float",
      "Int",
      "Long",
      "Short",
      "String",
      "Unit",
      "Nothing",
      "Any",
      "Array",
      "List",
      "Map",
      "Set",
      "MutableList",
      "MutableMap",
      "MutableSet",
      "Pair",
      "Triple",
      "Comparable",
      "Iterable",
      "Sequence",
      "Regex",
      "Result",
      "Lazy",
      "UByte",
      "UShort",
      "UInt",
      "ULong",
      "IntArray",
      "ByteArray",
      "CharArray",
      "FloatArray",
      "DoubleArray",
      "LongArray",
      "ShortArray",
      "BooleanArray",
      "HashMap",
      "HashSet",
      "LinkedHashMap",
      "LinkedHashSet",
      "ArrayList",
      "Number",
      "Throwable",
      "Exception",
      "RuntimeException",
      "IllegalArgumentException",
      "IllegalStateException",
      "IndexOutOfBoundsException",
      "NullPointerException",
      "ClassCastException",
      "UnsupportedOperationException",
      "Enum",
      "Annotation",
      "Cloneable",
      "Comparable",
      "CharSequence",
      "Collection",
      "AbstractList",
      "AbstractMap",
      "AbstractSet",
    ],

    constants: ["true", "false", "null"],

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
      "..",
      "::",
      "?.",
      "?:",
      "!!",
      "===",
      "!==",
    ],

    symbols: /[=><!~?:&|+\-*\/\^%]+/,
    escapes:
      /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
    digits: /\d+(_+\d+)*/,
    octaldigits: /[0-7]+(_+[0-7]+)*/,
    binarydigits: /[0-1]+(_+[0-1]+)*/,
    hexdigits: /[[0-9a-fA-F]+(_+[0-9a-fA-F]+)*/,

    tokenizer: {
      root: [
        // annotations
        [/@[a-zA-Z_]\w*/, "annotation"],

        // identifiers & keywords
        [
          /[a-z_$][\w$]*/,
          {
            cases: {
              "@keywords": "keyword",
              "@constants": "constant",
              "@default": "identifier",
            },
          },
        ],

        // types
        [
          /[A-Z][\w$]*/,
          {
            cases: {
              "@typeKeywords": "type.identifier",
              "@default": "type.identifier",
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

        // numbers
        [/(@digits)[eE]([\-+]?(@digits))?[fFdD]?/, "number.float"],
        [/(@digits)\.(@digits)([eE][\-+]?(@digits))?[fFdD]?/, "number.float"],
        [/0[xX](@hexdigits)[Ll]?/, "number.hex"],
        [/0[bB](@binarydigits)[Ll]?/, "number.binary"],
        [/(@digits)[fFdD]/, "number.float"],
        [/(@digits)[lL]?/, "number"],

        // delimiter
        [/[;,.]/, "delimiter"],

        // strings
        [/"""/, "string", "@multistring"],
        [/"([^"\\]|\\.)*$/, "string.invalid"],
        [/"/, "string", "@string"],

        // characters
        [/'[^\\']'/, "string"],
        [/(')(@escapes)(')/, ["string", "string.escape", "string"]],
        [/'/, "string.invalid"],
      ],

      whitespace: [
        [/[ \t\r\n]+/, ""],
        [/\/\*\*(?!\/)/, "comment.doc", "@kdoc"],
        [/\/\*/, "comment", "@comment"],
        [/\/\/.*$/, "comment"],
      ],

      comment: [
        [/[^\/*]+/, "comment"],
        [/\/\*/, "comment", "@push"],
        [/\*\//, "comment", "@pop"],
        [/[\/*]/, "comment"],
      ],

      kdoc: [
        [/[^\/*]+/, "comment.doc"],
        [/@\w+/, "comment.doc.tag"],
        [/\/\*/, "comment.doc", "@push"],
        [/\*\//, "comment.doc", "@pop"],
        [/[\/*]/, "comment.doc"],
      ],

      string: [
        [/\$\{/, { token: "delimiter.bracket", next: "@stringInterp" }],
        [/\$\w+/, "string.interpolated"],
        [/[^\\"$]+/, "string"],
        [/@escapes/, "string.escape"],
        [/\\./, "string.escape.invalid"],
        [/"/, "string", "@pop"],
      ],

      multistring: [
        [/\$\{/, { token: "delimiter.bracket", next: "@stringInterp" }],
        [/\$\w+/, "string.interpolated"],
        [/"""/, "string", "@pop"],
        [/./, "string"],
      ],

      stringInterp: [
        [/\{/, "delimiter.bracket", "@push"],
        [/\}/, "delimiter.bracket", "@pop"],
        { include: "root" },
      ],
    },
  });

  // ─── Language Configuration ─────────────────────────────────────────────────
  monaco.languages.setLanguageConfiguration("kotlin", {
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
      { open: '"', close: '"', notIn: ["string"] },
      { open: "'", close: "'", notIn: ["string", "comment"] },
      { open: "<", close: ">", notIn: ["string"] },
    ],
    surroundingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: '"', close: '"' },
      { open: "'", close: "'" },
      { open: "<", close: ">" },
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
          appendText: "* ",
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
    wordPattern:
      /(-?\d*\.\d\w*)|([^\`\~\!\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
  });

  // ─── Kotlin Standard Library Knowledge Base ─────────────────────────────────
  const KOTLIN_STDLIB = {
    // Top-level functions
    println: {
      signature: "fun println(message: Any?): Unit",
      doc: "Prints the given message and a newline to the standard output.",
    },
    print: {
      signature: "fun print(message: Any?): Unit",
      doc: "Prints the given message to the standard output.",
    },
    readLine: {
      signature: "fun readLine(): String?",
      doc: "Reads a line of input from stdin. Returns null if EOF reached.",
    },
    readln: {
      signature: "fun readln(): String",
      doc: "Reads a line of input from stdin. Throws if EOF reached.",
    },
    listOf: {
      signature: "fun <T> listOf(vararg elements: T): List<T>",
      doc: "Returns a new read-only list of given elements.",
    },
    mutableListOf: {
      signature: "fun <T> mutableListOf(vararg elements: T): MutableList<T>",
      doc: "Returns a new MutableList with the given elements.",
    },
    mapOf: {
      signature: "fun <K, V> mapOf(vararg pairs: Pair<K, V>): Map<K, V>",
      doc: "Returns a new read-only map with the specified key-value pairs.",
    },
    mutableMapOf: {
      signature:
        "fun <K, V> mutableMapOf(vararg pairs: Pair<K, V>): MutableMap<K, V>",
      doc: "Returns a new MutableMap with the specified contents.",
    },
    setOf: {
      signature: "fun <T> setOf(vararg elements: T): Set<T>",
      doc: "Returns a new read-only set with the given elements.",
    },
    mutableSetOf: {
      signature: "fun <T> mutableSetOf(vararg elements: T): MutableSet<T>",
      doc: "Returns a new MutableSet with the given elements.",
    },
    arrayOf: {
      signature: "fun <T> arrayOf(vararg elements: T): Array<T>",
      doc: "Returns an array of the specified elements.",
    },
    intArrayOf: {
      signature: "fun intArrayOf(vararg elements: Int): IntArray",
      doc: "Returns an IntArray of the specified elements.",
    },
    emptyList: {
      signature: "fun <T> emptyList(): List<T>",
      doc: "Returns an empty read-only list.",
    },
    emptyMap: {
      signature: "fun <K, V> emptyMap(): Map<K, V>",
      doc: "Returns an empty read-only map.",
    },
    emptySet: {
      signature: "fun <T> emptySet(): Set<T>",
      doc: "Returns an empty read-only set.",
    },
    buildString: {
      signature:
        "fun buildString(builderAction: StringBuilder.() -> Unit): String",
      doc: "Builds a new string by populating a StringBuilder.",
    },
    buildList: {
      signature:
        "fun <E> buildList(builderAction: MutableList<E>.() -> Unit): List<E>",
      doc: "Builds a new read-only List by populating a MutableList.",
    },
    require: {
      signature:
        "fun require(value: Boolean, lazyMessage: () -> Any = ...): Unit",
      doc: "Throws IllegalArgumentException if the value is false.",
    },
    check: {
      signature:
        "fun check(value: Boolean, lazyMessage: () -> Any = ...): Unit",
      doc: "Throws IllegalStateException if the value is false.",
    },
    error: {
      signature: "fun error(message: Any): Nothing",
      doc: "Throws an IllegalStateException with the given message.",
    },
    TODO: {
      signature: "fun TODO(reason: String = ...): Nothing",
      doc: "Always throws NotImplementedError with an optional reason.",
    },
    repeat: {
      signature: "fun repeat(times: Int, action: (Int) -> Unit): Unit",
      doc: "Executes the given action the specified number of times.",
    },
    lazy: {
      signature: "fun <T> lazy(initializer: () -> T): Lazy<T>",
      doc: "Creates a Lazy instance that uses the specified initializer.",
    },
    run: {
      signature: "fun <R> run(block: () -> R): R",
      doc: "Calls the specified function block and returns its result.",
    },
    with: {
      signature: "fun <T, R> with(receiver: T, block: T.() -> R): R",
      doc: "Calls the specified function block with the given receiver as its receiver.",
    },
    also: {
      signature: "fun <T> T.also(block: (T) -> Unit): T",
      doc: "Calls the specified function block with this value as its argument and returns this value.",
    },
    apply: {
      signature: "fun <T> T.apply(block: T.() -> Unit): T",
      doc: "Calls the specified function block with this value as its receiver and returns this value.",
    },
    let: {
      signature: "fun <T, R> T.let(block: (T) -> R): R",
      doc: "Calls the specified function block with this value as its argument and returns its result.",
    },
    takeIf: {
      signature: "fun <T> T.takeIf(predicate: (T) -> Boolean): T?",
      doc: "Returns this value if it satisfies the given predicate or null if it doesn't.",
    },
    takeUnless: {
      signature: "fun <T> T.takeUnless(predicate: (T) -> Boolean): T?",
      doc: "Returns this value if it does not satisfy the given predicate or null if it does.",
    },
    to: {
      signature: "infix fun <A, B> A.to(that: B): Pair<A, B>",
      doc: "Creates a Pair of this and that.",
    },
    maxOf: {
      signature: "fun maxOf(a: Int, b: Int): Int",
      doc: "Returns the greater of two values.",
    },
    minOf: {
      signature: "fun minOf(a: Int, b: Int): Int",
      doc: "Returns the smaller of two values.",
    },
    sortedBy: {
      signature:
        "fun <T, R : Comparable<R>> Iterable<T>.sortedBy(selector: (T) -> R?): List<T>",
      doc: "Returns a list of all elements sorted according to the specified selector.",
    },
    filter: {
      signature:
        "fun <T> Iterable<T>.filter(predicate: (T) -> Boolean): List<T>",
      doc: "Returns a list containing only elements matching the given predicate.",
    },
    map: {
      signature: "fun <T, R> Iterable<T>.map(transform: (T) -> R): List<R>",
      doc: "Returns a list containing the results of applying the transform function.",
    },
    forEach: {
      signature: "fun <T> Iterable<T>.forEach(action: (T) -> Unit): Unit",
      doc: "Performs the given action on each element.",
    },
    flatMap: {
      signature:
        "fun <T, R> Iterable<T>.flatMap(transform: (T) -> Iterable<R>): List<R>",
      doc: "Returns a single list of all elements yielded from results of transform on each element.",
    },
    reduce: {
      signature: "fun <S, T : S> Iterable<T>.reduce(operation: (S, T) -> S): S",
      doc: "Accumulates value starting with the first element and applying operation.",
    },
    fold: {
      signature:
        "fun <T, R> Iterable<T>.fold(initial: R, operation: (R, T) -> R): R",
      doc: "Accumulates value starting with initial value and applying operation.",
    },
    any: {
      signature: "fun <T> Iterable<T>.any(predicate: (T) -> Boolean): Boolean",
      doc: "Returns true if at least one element matches the given predicate.",
    },
    all: {
      signature: "fun <T> Iterable<T>.all(predicate: (T) -> Boolean): Boolean",
      doc: "Returns true if all elements match the given predicate.",
    },
    none: {
      signature: "fun <T> Iterable<T>.none(predicate: (T) -> Boolean): Boolean",
      doc: "Returns true if no elements match the given predicate.",
    },
    first: {
      signature: "fun <T> Iterable<T>.first(): T",
      doc: "Returns the first element. Throws NoSuchElementException if empty.",
    },
    last: {
      signature: "fun <T> Iterable<T>.last(): T",
      doc: "Returns the last element. Throws NoSuchElementException if empty.",
    },
    firstOrNull: {
      signature: "fun <T> Iterable<T>.firstOrNull(): T?",
      doc: "Returns the first element, or null if the collection is empty.",
    },
    lastOrNull: {
      signature: "fun <T> Iterable<T>.lastOrNull(): T?",
      doc: "Returns the last element, or null if the collection is empty.",
    },
    count: {
      signature: "fun <T> Iterable<T>.count(): Int",
      doc: "Returns the number of elements in the collection.",
    },
    sum: {
      signature: "fun Iterable<Int>.sum(): Int",
      doc: "Returns the sum of all elements in the collection.",
    },
    average: {
      signature: "fun Iterable<Int>.average(): Double",
      doc: "Returns the average of all elements in the collection.",
    },
    distinct: {
      signature: "fun <T> Iterable<T>.distinct(): List<T>",
      doc: "Returns a list containing only distinct elements.",
    },
    groupBy: {
      signature:
        "fun <T, K> Iterable<T>.groupBy(keySelector: (T) -> K): Map<K, List<T>>",
      doc: "Groups elements by the key returned by the given keySelector.",
    },
    associate: {
      signature:
        "fun <T, K, V> Iterable<T>.associate(transform: (T) -> Pair<K, V>): Map<K, V>",
      doc: "Returns a Map containing key-value pairs provided by the transform function.",
    },
    zip: {
      signature:
        "fun <T, R> Iterable<T>.zip(other: Iterable<R>): List<Pair<T, R>>",
      doc: "Returns a list of pairs built from elements of both collections.",
    },
    joinToString: {
      signature:
        'fun <T> Iterable<T>.joinToString(separator: CharSequence = ", "): String',
      doc: "Creates a string from all elements using the separator.",
    },
    toList: {
      signature: "fun <T> Iterable<T>.toList(): List<T>",
      doc: "Returns a List containing all elements.",
    },
    toSet: {
      signature: "fun <T> Iterable<T>.toSet(): Set<T>",
      doc: "Returns a Set containing all elements.",
    },
    toMutableList: {
      signature: "fun <T> Iterable<T>.toMutableList(): MutableList<T>",
      doc: "Returns a MutableList containing all elements.",
    },
    toMap: {
      signature: "fun <K, V> Iterable<Pair<K, V>>.toMap(): Map<K, V>",
      doc: "Returns a new map containing all key-value pairs.",
    },
    sorted: {
      signature: "fun <T : Comparable<T>> Iterable<T>.sorted(): List<T>",
      doc: "Returns a list of all elements sorted in natural order.",
    },
    reversed: {
      signature: "fun <T> Iterable<T>.reversed(): List<T>",
      doc: "Returns a list with elements in reversed order.",
    },
    take: {
      signature: "fun <T> Iterable<T>.take(n: Int): List<T>",
      doc: "Returns a list containing the first n elements.",
    },
    drop: {
      signature: "fun <T> Iterable<T>.drop(n: Int): List<T>",
      doc: "Returns a list containing all elements except the first n.",
    },
    contains: {
      signature: "fun <T> Iterable<T>.contains(element: T): Boolean",
      doc: "Returns true if the element is found in the collection.",
    },
    indexOf: {
      signature: "fun <T> Iterable<T>.indexOf(element: T): Int",
      doc: "Returns the index of the first occurrence of the element, or -1.",
    },
    chunked: {
      signature: "fun <T> Iterable<T>.chunked(size: Int): List<List<T>>",
      doc: "Splits this collection into a list of lists each not exceeding the given size.",
    },
    windowed: {
      signature:
        "fun <T> Iterable<T>.windowed(size: Int, step: Int = 1): List<List<T>>",
      doc: "Returns a list of snapshots of the window of the given size.",
    },
    onEach: {
      signature: "fun <T> Iterable<T>.onEach(action: (T) -> Unit): Iterable<T>",
      doc: "Performs the given action on each element and returns the collection.",
    },
    sumOf: {
      signature: "fun <T> Iterable<T>.sumOf(selector: (T) -> Int): Int",
      doc: "Returns the sum of all values produced by the selector.",
    },
    associateBy: {
      signature:
        "fun <T, K> Iterable<T>.associateBy(keySelector: (T) -> K): Map<K, T>",
      doc: "Returns a Map with keys produced by keySelector and values being the elements.",
    },
    partition: {
      signature:
        "fun <T> Iterable<T>.partition(predicate: (T) -> Boolean): Pair<List<T>, List<T>>",
      doc: "Splits the collection into a pair of lists: matching and non-matching.",
    },
    flatten: {
      signature: "fun <T> Iterable<Iterable<T>>.flatten(): List<T>",
      doc: "Returns a single list of all elements from all collections.",
    },
    mapNotNull: {
      signature:
        "fun <T, R : Any> Iterable<T>.mapNotNull(transform: (T) -> R?): List<R>",
      doc: "Returns a list containing only the non-null results of applying transform.",
    },
    filterNotNull: {
      signature: "fun <T : Any> Iterable<T?>.filterNotNull(): List<T>",
      doc: "Returns a list containing only non-null elements.",
    },
  };

  const KOTLIN_TYPES_INFO = {
    Int: {
      doc: "Represents a 32-bit signed integer. Range: -2,147,483,648 to 2,147,483,647.",
      members: [
        "plus",
        "minus",
        "times",
        "div",
        "rem",
        "rangeTo",
        "compareTo",
        "toDouble",
        "toFloat",
        "toLong",
        "toShort",
        "toByte",
        "toChar",
        "toString",
        "coerceIn",
        "coerceAtLeast",
        "coerceAtMost",
      ],
    },
    String: {
      doc: "Represents a string of characters. Strings are immutable in Kotlin.",
      members: [
        "length",
        "get",
        "substring",
        "contains",
        "startsWith",
        "endsWith",
        "indexOf",
        "lastIndexOf",
        "replace",
        "trim",
        "trimStart",
        "trimEnd",
        "split",
        "toUpperCase",
        "toLowerCase",
        "uppercase",
        "lowercase",
        "toInt",
        "toIntOrNull",
        "toDouble",
        "toDoubleOrNull",
        "toBoolean",
        "reversed",
        "repeat",
        "padStart",
        "padEnd",
        "isEmpty",
        "isNotEmpty",
        "isBlank",
        "isNotBlank",
        "lines",
        "drop",
        "take",
        "first",
        "last",
        "toList",
        "toCharArray",
        "compareTo",
        "plus",
        "matches",
        "format",
        "encodeToByteArray",
      ],
    },
    Boolean: {
      doc: "Represents a Boolean value: true or false.",
      members: ["and", "or", "xor", "not", "compareTo", "toString"],
    },
    Double: {
      doc: "Represents a 64-bit double-precision floating point number.",
      members: [
        "plus",
        "minus",
        "times",
        "div",
        "rem",
        "compareTo",
        "toInt",
        "toFloat",
        "toLong",
        "toString",
        "isNaN",
        "isInfinite",
        "isFinite",
      ],
    },
    Float: {
      doc: "Represents a 32-bit single-precision floating point number.",
      members: [
        "plus",
        "minus",
        "times",
        "div",
        "rem",
        "compareTo",
        "toInt",
        "toDouble",
        "toLong",
        "toString",
        "isNaN",
        "isInfinite",
      ],
    },
    Long: {
      doc: "Represents a 64-bit signed integer.",
      members: [
        "plus",
        "minus",
        "times",
        "div",
        "rem",
        "compareTo",
        "toInt",
        "toDouble",
        "toFloat",
        "toString",
      ],
    },
    Char: {
      doc: "Represents a 16-bit Unicode character.",
      members: [
        "plus",
        "minus",
        "compareTo",
        "toInt",
        "toString",
        "isDigit",
        "isLetter",
        "isLetterOrDigit",
        "isUpperCase",
        "isLowerCase",
        "uppercaseChar",
        "lowercaseChar",
        "code",
      ],
    },
    List: {
      doc: "A generic ordered collection of elements. List is covariant and read-only.",
      members: [
        "size",
        "isEmpty",
        "contains",
        "containsAll",
        "get",
        "indexOf",
        "lastIndexOf",
        "iterator",
        "listIterator",
        "subList",
        "first",
        "last",
        "firstOrNull",
        "lastOrNull",
        "filter",
        "map",
        "flatMap",
        "forEach",
        "any",
        "all",
        "none",
        "count",
        "find",
        "sorted",
        "reversed",
        "distinct",
        "take",
        "drop",
        "zip",
        "groupBy",
        "associate",
        "joinToString",
        "toMutableList",
        "toSet",
        "toTypedArray",
      ],
    },
    MutableList: {
      doc: "A generic ordered mutable collection of elements.",
      members: [
        "add",
        "addAll",
        "remove",
        "removeAt",
        "removeAll",
        "set",
        "clear",
        "size",
        "isEmpty",
        "contains",
        "indexOf",
        "iterator",
        "sort",
        "sortBy",
        "sortWith",
        "first",
        "last",
        "filter",
        "map",
      ],
    },
    Map: {
      doc: "A collection that holds pairs of objects (keys and values). Keys are unique.",
      members: [
        "size",
        "isEmpty",
        "containsKey",
        "containsValue",
        "get",
        "keys",
        "values",
        "entries",
        "getOrDefault",
        "forEach",
        "map",
        "filter",
        "any",
        "all",
        "none",
        "count",
        "toMutableMap",
        "plus",
        "toList",
      ],
    },
    MutableMap: {
      doc: "A modifiable collection that holds pairs of objects (keys and values).",
      members: [
        "put",
        "putAll",
        "remove",
        "clear",
        "getOrPut",
        "set",
        "size",
        "isEmpty",
        "containsKey",
        "containsValue",
        "get",
        "keys",
        "values",
        "entries",
      ],
    },
    Set: {
      doc: "A generic unordered collection of elements that does not support duplicates.",
      members: [
        "size",
        "isEmpty",
        "contains",
        "containsAll",
        "iterator",
        "first",
        "last",
        "filter",
        "map",
        "forEach",
        "any",
        "all",
        "none",
        "count",
        "toMutableSet",
        "toList",
        "plus",
        "minus",
        "union",
        "intersect",
        "subtract",
      ],
    },
    MutableSet: {
      doc: "A modifiable collection with no duplicate elements.",
      members: [
        "add",
        "addAll",
        "remove",
        "removeAll",
        "retainAll",
        "clear",
        "size",
        "isEmpty",
        "contains",
        "iterator",
      ],
    },
    Array: {
      doc: "Represents an array. Array instances can be created using arrayOf, arrayOfNulls, and Array constructor.",
      members: [
        "size",
        "get",
        "set",
        "iterator",
        "clone",
        "toList",
        "toMutableList",
        "toSet",
        "first",
        "last",
        "filter",
        "map",
        "forEach",
        "indexOf",
        "contains",
        "sort",
        "sorted",
        "reversed",
        "joinToString",
        "isEmpty",
        "isNotEmpty",
        "contentEquals",
        "contentToString",
      ],
    },
    Pair: {
      doc: "Represents a generic pair of two values. Created using the `to` infix function.",
      members: [
        "first",
        "second",
        "toList",
        "toString",
        "component1",
        "component2",
      ],
    },
    Triple: {
      doc: "Represents a generic triple of three values.",
      members: [
        "first",
        "second",
        "third",
        "toList",
        "toString",
        "component1",
        "component2",
        "component3",
      ],
    },
    Regex: {
      doc: "Represents a compiled regular expression.",
      members: [
        "matches",
        "containsMatchIn",
        "find",
        "findAll",
        "matchEntire",
        "replace",
        "replaceFirst",
        "split",
        "pattern",
        "options",
        "toPattern",
      ],
    },
    Sequence: {
      doc: "A sequence that returns values lazily through its iterator.",
      members: [
        "iterator",
        "filter",
        "map",
        "flatMap",
        "take",
        "drop",
        "forEach",
        "toList",
        "toSet",
        "first",
        "firstOrNull",
        "any",
        "all",
        "none",
        "count",
        "sorted",
        "distinct",
        "chunked",
        "windowed",
        "zip",
        "joinToString",
      ],
    },
    Any: {
      doc: "The root of the Kotlin class hierarchy. Every class has Any as a superclass.",
      members: ["equals", "hashCode", "toString"],
    },
    Unit: {
      doc: "The type with only one value: the Unit object. Corresponds to void in Java.",
    },
    Nothing: {
      doc: "Nothing has no instances. Used to represent a value that never exists (e.g., a function that always throws).",
    },
    Comparable: {
      doc: "Classes which inherit from this interface have a defined total ordering.",
      members: ["compareTo"],
    },
    Iterable: {
      doc: "Classes that inherit from this interface can be iterated using a for-loop.",
      members: ["iterator"],
    },
    Result: {
      doc: "A discriminated union that encapsulates a successful outcome with a value or a failure with an exception.",
      members: [
        "isSuccess",
        "isFailure",
        "getOrNull",
        "exceptionOrNull",
        "getOrThrow",
        "getOrDefault",
        "getOrElse",
        "fold",
        "map",
        "onSuccess",
        "onFailure",
      ],
    },
    StringBuilder: {
      doc: "A mutable sequence of characters for building strings efficiently.",
      members: [
        "append",
        "appendLine",
        "insert",
        "delete",
        "replace",
        "toString",
        "length",
        "clear",
        "setLength",
        "capacity",
        "indexOf",
      ],
    },
    Lazy: {
      doc: "Represents a value with lazy initialization.",
      members: ["value", "isInitialized"],
    },
  };

  // ─── Snippets ───────────────────────────────────────────────────────────────
  const KOTLIN_SNIPPETS = [
    {
      label: "fun",
      detail: "Function declaration",
      insertText: "fun ${1:name}(${2:params}): ${3:Unit} {\n\t$0\n}",
      documentation: "Declare a new function.",
    },
    {
      label: "main",
      detail: "Main function",
      insertText: "fun main(args: Array<String>) {\n\t$0\n}",
      documentation: "Entry point for a Kotlin program.",
    },
    {
      label: "main0",
      detail: "Main function (no args)",
      insertText: "fun main() {\n\t$0\n}",
      documentation: "Entry point for a Kotlin program without arguments.",
    },
    {
      label: "class",
      detail: "Class declaration",
      insertText: "class ${1:Name}(${2:params}) {\n\t$0\n}",
      documentation: "Declare a new class.",
    },
    {
      label: "dclass",
      detail: "Data class",
      insertText: "data class ${1:Name}(\n\tval ${2:property}: ${3:Type}\n)",
      documentation: "Declare a new data class.",
    },
    {
      label: "sclass",
      detail: "Sealed class",
      insertText: "sealed class ${1:Name} {\n\t$0\n}",
      documentation: "Declare a new sealed class.",
    },
    {
      label: "sinterface",
      detail: "Sealed interface",
      insertText: "sealed interface ${1:Name} {\n\t$0\n}",
      documentation: "Declare a new sealed interface.",
    },
    {
      label: "interface",
      detail: "Interface declaration",
      insertText: "interface ${1:Name} {\n\t$0\n}",
      documentation: "Declare a new interface.",
    },
    {
      label: "object",
      detail: "Object declaration",
      insertText: "object ${1:Name} {\n\t$0\n}",
      documentation: "Declare a singleton object.",
    },
    {
      label: "companion",
      detail: "Companion object",
      insertText: "companion object {\n\t$0\n}",
      documentation: "Declare a companion object.",
    },
    {
      label: "enum",
      detail: "Enum class",
      insertText: "enum class ${1:Name} {\n\t${2:VALUE1},\n\t${3:VALUE2}\n}",
      documentation: "Declare a new enum class.",
    },
    {
      label: "if",
      detail: "If statement",
      insertText: "if (${1:condition}) {\n\t$0\n}",
      documentation: "If conditional statement.",
    },
    {
      label: "ifelse",
      detail: "If-else statement",
      insertText: "if (${1:condition}) {\n\t$2\n} else {\n\t$0\n}",
      documentation: "If-else conditional statement.",
    },
    {
      label: "ifelif",
      detail: "If-else if-else",
      insertText:
        "if (${1:condition}) {\n\t$2\n} else if (${3:condition}) {\n\t$4\n} else {\n\t$0\n}",
      documentation: "If with else-if and else.",
    },
    {
      label: "when",
      detail: "When expression",
      insertText:
        "when (${1:value}) {\n\t${2:condition} -> ${3:result}\n\telse -> ${0:default}\n}",
      documentation: "When expression (Kotlin switch).",
    },
    {
      label: "whenx",
      detail: "When expression (no arg)",
      insertText:
        "when {\n\t${1:condition} -> ${2:result}\n\telse -> ${0:default}\n}",
      documentation: "When expression without argument.",
    },
    {
      label: "for",
      detail: "For loop",
      insertText: "for (${1:item} in ${2:collection}) {\n\t$0\n}",
      documentation: "For-in loop.",
    },
    {
      label: "fori",
      detail: "For loop with index",
      insertText: "for (${1:i} in ${2:0} until ${3:n}) {\n\t$0\n}",
      documentation: "For loop with range (exclusive end).",
    },
    {
      label: "forr",
      detail: "For loop with range",
      insertText: "for (${1:i} in ${2:0}..${3:n}) {\n\t$0\n}",
      documentation: "For loop with range (inclusive end).",
    },
    {
      label: "ford",
      detail: "For loop downTo",
      insertText: "for (${1:i} in ${2:n} downTo ${3:0}) {\n\t$0\n}",
      documentation: "For loop counting down.",
    },
    {
      label: "fors",
      detail: "For loop with step",
      insertText: "for (${1:i} in ${2:0}..${3:n} step ${4:2}) {\n\t$0\n}",
      documentation: "For loop with step.",
    },
    {
      label: "forx",
      detail: "For with index (withIndex)",
      insertText:
        "for ((${1:index}, ${2:value}) in ${3:collection}.withIndex()) {\n\t$0\n}",
      documentation: "For loop with index using withIndex().",
    },
    {
      label: "while",
      detail: "While loop",
      insertText: "while (${1:condition}) {\n\t$0\n}",
      documentation: "While loop.",
    },
    {
      label: "dowhile",
      detail: "Do-while loop",
      insertText: "do {\n\t$0\n} while (${1:condition})",
      documentation: "Do-while loop.",
    },
    {
      label: "try",
      detail: "Try-catch",
      insertText: "try {\n\t$1\n} catch (e: ${2:Exception}) {\n\t$0\n}",
      documentation: "Try-catch block.",
    },
    {
      label: "tryf",
      detail: "Try-catch-finally",
      insertText:
        "try {\n\t$1\n} catch (e: ${2:Exception}) {\n\t$3\n} finally {\n\t$0\n}",
      documentation: "Try-catch-finally block.",
    },
    {
      label: "lambda",
      detail: "Lambda expression",
      insertText: "{ ${1:params} -> $0 }",
      documentation: "Lambda expression.",
    },
    {
      label: "init",
      detail: "Init block",
      insertText: "init {\n\t$0\n}",
      documentation: "Initializer block.",
    },
    {
      label: "singleton",
      detail: "Singleton pattern",
      insertText: "object ${1:Name} {\n\t$0\n}",
      documentation: "Singleton object declaration.",
    },
    {
      label: "suspend",
      detail: "Suspend function",
      insertText: "suspend fun ${1:name}(${2:params}): ${3:Unit} {\n\t$0\n}",
      documentation: "Declare a suspend (coroutine) function.",
    },
    {
      label: "ext",
      detail: "Extension function",
      insertText: "fun ${1:Type}.${2:name}(${3:params}): ${4:Unit} {\n\t$0\n}",
      documentation: "Declare an extension function.",
    },
    {
      label: "inline",
      detail: "Inline function",
      insertText: "inline fun ${1:name}(${2:params}): ${3:Unit} {\n\t$0\n}",
      documentation: "Declare an inline function.",
    },
    {
      label: "infix",
      detail: "Infix function",
      insertText:
        "infix fun ${1:Type}.${2:name}(${3:other}: ${4:Type}): ${5:Unit} {\n\t$0\n}",
      documentation: "Declare an infix function.",
    },
    {
      label: "operator",
      detail: "Operator overload",
      insertText:
        "operator fun ${1:name}(${2:other}: ${3:Type}): ${4:Type} {\n\t$0\n}",
      documentation: "Declare an operator function.",
    },
    {
      label: "prop",
      detail: "Property with getter/setter",
      insertText:
        "var ${1:name}: ${2:Type}\n\tget() = ${3:field}\n\tset(value) {\n\t\tfield = value\n\t}",
      documentation: "Property with custom getter and setter.",
    },
    {
      label: "lazy",
      detail: "Lazy property",
      insertText: "val ${1:name}: ${2:Type} by lazy {\n\t$0\n}",
      documentation: "Property with lazy initialization.",
    },
    {
      label: "observable",
      detail: "Observable property",
      insertText:
        "var ${1:name}: ${2:Type} by Delegates.observable(${3:initial}) { _, old, new ->\n\t$0\n}",
      documentation: "Property with observable delegate.",
    },
    {
      label: "coroutine",
      detail: "Launch coroutine",
      insertText: "launch {\n\t$0\n}",
      documentation: "Launch a new coroutine.",
    },
    {
      label: "async",
      detail: "Async coroutine",
      insertText: "async {\n\t$0\n}",
      documentation: "Create an async coroutine.",
    },
    {
      label: "flow",
      detail: "Flow builder",
      insertText: "flow {\n\temit($0)\n}",
      documentation: "Create a cold asynchronous flow.",
    },
    {
      label: "runBlocking",
      detail: "runBlocking",
      insertText: "runBlocking {\n\t$0\n}",
      documentation: "Runs a new coroutine and blocks the current thread.",
    },
    {
      label: "withContext",
      detail: "withContext",
      insertText: "withContext(${1:Dispatchers.IO}) {\n\t$0\n}",
      documentation: "Calls the block with a given coroutine context.",
    },
    {
      label: "require",
      detail: "Require precondition",
      insertText: 'require(${1:condition}) { "${2:message}" }',
      documentation: "Throws IllegalArgumentException if condition is false.",
    },
    {
      label: "check",
      detail: "Check state",
      insertText: 'check(${1:condition}) { "${2:message}" }',
      documentation: "Throws IllegalStateException if condition is false.",
    },
  ];

  // ─── Build Definitions Map (simulated from default code) ─────────────────
  let definitionsMap = {};

  function parseDefinitions(code) {
    const defs = {};
    const lines = code.split("\n");
    lines.forEach((line, idx) => {
      let m;
      // fun declarations
      m = line.match(/\bfun\s+(?:<[^>]+>\s+)?(?:\w+\.)?(\w+)\s*\(/);
      if (m) {
        defs[m[1]] = {
          line: idx + 1,
          col: line.indexOf(m[1]) + 1,
          kind: "function",
        };
      }
      // class/interface/object
      m = line.match(
        /\b(?:class|data\s+class|sealed\s+class|enum\s+class|interface|object)\s+(\w+)/,
      );
      if (m) {
        defs[m[1]] = {
          line: idx + 1,
          col: line.indexOf(m[1]) + 1,
          kind: "class",
        };
      }
      // val/var
      m = line.match(/\b(?:val|var)\s+(\w+)/);
      if (m) {
        defs[m[1]] = {
          line: idx + 1,
          col: line.indexOf(m[1]) + 1,
          kind: "variable",
        };
      }
      // typealias
      m = line.match(/\btypealias\s+(\w+)/);
      if (m) {
        defs[m[1]] = {
          line: idx + 1,
          col: line.indexOf(m[1]) + 1,
          kind: "type",
        };
      }
    });
    return defs;
  }

  // ─── Completion Provider ────────────────────────────────────────────────────
  monaco.languages.registerCompletionItemProvider("kotlin", {
    triggerCharacters: [".", ":", "@"],
    provideCompletionItems: function (model, position) {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };

      const lineContent = model.getLineContent(position.lineNumber);
      const textBefore = lineContent.substring(0, position.column - 1);
      const suggestions = [];

      // Dot-triggered member completions
      const dotMatch = textBefore.match(/(\w+)\.\s*$/);
      if (dotMatch) {
        const varName = dotMatch[1];
        // Try to find variable type from code
        const allText = model.getValue();
        let typeName = null;
        const typePatterns = [
          new RegExp(`(?:val|var)\\s+${varName}\\s*:\\s*(\\w+)`),
          new RegExp(`(?:val|var)\\s+${varName}\\s*=\\s*(?:mutable)?(\\w+)Of`),
          new RegExp(`(?:val|var)\\s+${varName}\\s*=\\s*"`, ""),
        ];
        for (const pat of typePatterns) {
          const m = allText.match(pat);
          if (m) {
            typeName = m[1] || (pat === typePatterns[2] ? "String" : null);
            break;
          }
        }
        if (!typeName && KOTLIN_TYPES_INFO[varName]) typeName = varName;

        if (typeName) {
          const capType = typeName.charAt(0).toUpperCase() + typeName.slice(1);
          const info =
            KOTLIN_TYPES_INFO[capType] || KOTLIN_TYPES_INFO[typeName];
          if (info && info.members) {
            info.members.forEach((member) => {
              const stdlibInfo = KOTLIN_STDLIB[member];
              suggestions.push({
                label: member,
                kind: monaco.languages.CompletionItemKind.Method,
                insertText:
                  member +
                  (stdlibInfo && stdlibInfo.signature.includes("(")
                    ? "($1)"
                    : ""),
                insertTextRules:
                  monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                detail: stdlibInfo
                  ? stdlibInfo.signature
                  : `${capType}.${member}`,
                documentation: stdlibInfo
                  ? stdlibInfo.doc
                  : `Member of ${capType}`,
                range: range,
              });
            });
          }
        }
        // If we provided dot completions, return early
        if (suggestions.length > 0) return { suggestions };
      }

      // Annotation completions
      if (textBefore.match(/@\w*$/)) {
        const annotations = [
          "JvmStatic",
          "JvmOverloads",
          "JvmField",
          "JvmName",
          "JvmSuppressWildcards",
          "Throws",
          "Volatile",
          "Synchronized",
          "Transient",
          "Strictfp",
          "Deprecated",
          "Suppress",
          "OptIn",
          "RequiresOptIn",
          "Target",
          "Retention",
          "Repeatable",
          "MustBeDocumented",
          "Serializable",
          "Contextual",
          "Transient",
          "Test",
          "BeforeEach",
          "AfterEach",
          "BeforeAll",
          "AfterAll",
          "Composable",
          "Preview",
        ];
        annotations.forEach((a) => {
          suggestions.push({
            label: "@" + a,
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: a,
            detail: "Annotation",
            documentation: `@${a} annotation`,
            range: range,
          });
        });
        return { suggestions };
      }

      // Snippets
      KOTLIN_SNIPPETS.forEach((s) => {
        suggestions.push({
          label: s.label,
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: s.insertText,
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          detail: "⚡ " + s.detail,
          documentation: { value: s.documentation },
          range: range,
          sortText: "0_" + s.label,
        });
      });

      // Keywords
      const keywords = [
        "abstract",
        "actual",
        "annotation",
        "as",
        "break",
        "by",
        "catch",
        "class",
        "companion",
        "const",
        "constructor",
        "continue",
        "crossinline",
        "data",
        "delegate",
        "do",
        "dynamic",
        "else",
        "enum",
        "expect",
        "external",
        "field",
        "file",
        "final",
        "finally",
        "for",
        "fun",
        "get",
        "if",
        "import",
        "in",
        "infix",
        "init",
        "inline",
        "inner",
        "interface",
        "internal",
        "is",
        "lateinit",
        "noinline",
        "null",
        "object",
        "open",
        "operator",
        "out",
        "override",
        "package",
        "param",
        "private",
        "property",
        "protected",
        "public",
        "receiver",
        "reified",
        "return",
        "sealed",
        "set",
        "setparam",
        "super",
        "suspend",
        "tailrec",
        "this",
        "throw",
        "try",
        "typealias",
        "typeof",
        "val",
        "var",
        "vararg",
        "when",
        "where",
        "while",
        "true",
        "false",
        "value",
      ];
      keywords.forEach((kw) => {
        suggestions.push({
          label: kw,
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: kw,
          detail: "keyword",
          range: range,
          sortText: "2_" + kw,
        });
      });

      // Stdlib functions
      Object.keys(KOTLIN_STDLIB).forEach((fn) => {
        const info = KOTLIN_STDLIB[fn];
        suggestions.push({
          label: fn,
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: fn + (info.signature.includes("()") ? "()" : "($1)"),
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          detail: info.signature,
          documentation: { value: info.doc },
          range: range,
          sortText: "1_" + fn,
        });
      });

      // Types
      Object.keys(KOTLIN_TYPES_INFO).forEach((tp) => {
        suggestions.push({
          label: tp,
          kind: monaco.languages.CompletionItemKind.Class,
          insertText: tp,
          detail: "type " + tp,
          documentation: { value: KOTLIN_TYPES_INFO[tp].doc },
          range: range,
          sortText: "1_" + tp,
        });
      });

      // User-defined symbols from code
      const allDefs = parseDefinitions(model.getValue());
      Object.keys(allDefs).forEach((name) => {
        const d = allDefs[name];
        suggestions.push({
          label: name,
          kind:
            d.kind === "function"
              ? monaco.languages.CompletionItemKind.Function
              : d.kind === "class"
                ? monaco.languages.CompletionItemKind.Class
                : monaco.languages.CompletionItemKind.Variable,
          insertText: name + (d.kind === "function" ? "($1)" : ""),
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          detail: `(user) ${d.kind} — line ${d.line}`,
          documentation: `Defined at line ${d.line}`,
          range: range,
          sortText: "0b_" + name,
        });
      });

      return { suggestions };
    },
  });

  // ─── Hover Provider ─────────────────────────────────────────────────────────
  monaco.languages.registerHoverProvider("kotlin", {
    provideHover: function (model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return null;
      const token = word.word;

      // Check stdlib
      if (KOTLIN_STDLIB[token]) {
        const info = KOTLIN_STDLIB[token];
        return {
          range: new monaco.Range(
            position.lineNumber,
            word.startColumn,
            position.lineNumber,
            word.endColumn,
          ),
          contents: [
            { value: "```kotlin\n" + info.signature + "\n```" },
            { value: info.doc },
          ],
        };
      }

      // Check types
      if (KOTLIN_TYPES_INFO[token]) {
        const info = KOTLIN_TYPES_INFO[token];
        const membersStr = info.members
          ? "\n\n**Members:** " +
            info.members.slice(0, 15).join(", ") +
            (info.members.length > 15 ? ", ..." : "")
          : "";
        return {
          range: new monaco.Range(
            position.lineNumber,
            word.startColumn,
            position.lineNumber,
            word.endColumn,
          ),
          contents: [
            { value: "```kotlin\n" + token + "\n```" },
            { value: info.doc + membersStr },
          ],
        };
      }

      // Check user-defined symbols
      const defs = parseDefinitions(model.getValue());
      if (defs[token]) {
        const d = defs[token];
        const defLine = model.getLineContent(d.line).trim();
        return {
          range: new monaco.Range(
            position.lineNumber,
            word.startColumn,
            position.lineNumber,
            word.endColumn,
          ),
          contents: [
            { value: "```kotlin\n" + defLine + "\n```" },
            { value: `*${d.kind}* — defined at line ${d.line}` },
          ],
        };
      }

      // Keywords hover
      const kwDocs = {
        val: "Declares a read-only (immutable) property or local variable.",
        var: "Declares a mutable property or local variable.",
        fun: "Declares a function.",
        class: "Declares a class.",
        object: "Declares an object (singleton) or object expression.",
        interface: "Declares an interface.",
        data: "Marks a class as a data class, generating equals(), hashCode(), toString(), copy(), and componentN().",
        sealed:
          "Marks a class or interface as sealed, restricting its subclasses to the same file.",
        enum: "Declares an enum class.",
        when: "A conditional expression similar to switch. Can be used as a statement or expression.",
        if: "Conditional expression. In Kotlin, if can be used as an expression that returns a value.",
        for: "Iterates through anything that provides an iterator.",
        while: "Executes the body while the condition is true.",
        do: "Used with while to create a do-while loop that executes at least once.",
        return:
          "Returns from the nearest enclosing function or anonymous function.",
        break: "Terminates the nearest enclosing loop.",
        continue: "Proceeds to the next step of the nearest enclosing loop.",
        try: "Begins a try-catch-finally exception handling block.",
        catch: "Catches an exception thrown in a try block.",
        finally: "A block that is always executed after try and catch.",
        throw: "Throws an exception.",
        is: "Type check operator. Also used for smart casts.",
        as: "Type cast operator. Use `as?` for safe casting.",
        in: "Checks if a value is in a range or collection. Also used in for loops.",
        null: "Represents a null reference. Kotlin's type system distinguishes nullable (T?) and non-null (T) types.",
        this: "Refers to the current receiver or class instance.",
        super: "Refers to the superclass implementation.",
        import: "Imports a class, function, or property from another package.",
        package: "Specifies the package for the current file.",
        suspend:
          "Marks a function or lambda as a suspending function (for coroutines).",
        inline:
          "Tells the compiler to inline the function and its lambda parameters at call sites.",
        crossinline:
          "Forbids non-local returns in a lambda passed to an inline function.",
        noinline:
          "Prevents inlining of a lambda parameter of an inline function.",
        reified:
          "Makes a type parameter of an inline function accessible at runtime.",
        typealias: "Creates an alternative name for an existing type.",
        companion:
          "Declares a companion object inside a class (similar to static members).",
        lateinit:
          "Allows non-null properties to be initialized after construction.",
        const: "Marks a property as a compile-time constant.",
        open: "Allows a class to be subclassed or a member to be overridden.",
        override: "Marks a member as an override of a superclass member.",
        abstract: "Marks a class or member as abstract (must be overridden).",
        internal: "Visibility modifier: visible within the same module.",
        private:
          "Visibility modifier: visible only within the declaring scope.",
        protected:
          "Visibility modifier: visible in the class and its subclasses.",
        public: "Visibility modifier: visible everywhere. This is the default.",
        vararg:
          "Allows a function parameter to accept a variable number of arguments.",
        tailrec:
          "Marks a function as tail-recursive, allowing the compiler to optimize it into a loop.",
        infix:
          "Allows a function to be called using infix notation (without dot and parentheses).",
        operator: "Marks a function as an operator overload.",
        by: "Used for delegation: class delegation or delegated properties.",
        init: "Declares an initializer block in a class.",
        constructor: "Declares a secondary constructor for a class.",
        true: "Boolean literal representing true.",
        false: "Boolean literal representing false.",
        it: "Implicit name of a single parameter in a lambda expression.",
        value: "Used with class to declare a value class (inline class).",
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
            { value: "```kotlin\n" + token + "\n```" },
            { value: kwDocs[token] },
          ],
        };
      }

      return null;
    },
  });

  // ─── Signature Help Provider ────────────────────────────────────────────────
  monaco.languages.registerSignatureHelpProvider("kotlin", {
    signatureHelpTriggerCharacters: ["(", ","],
    provideSignatureHelp: function (model, position) {
      const textBefore = model
        .getLineContent(position.lineNumber)
        .substring(0, position.column - 1);
      // Find the function name before the opening paren
      const match = textBefore.match(/(\w+)\s*\([^)]*$/);
      if (!match) return null;
      const fnName = match[1];
      const info = KOTLIN_STDLIB[fnName];
      if (!info) return null;

      // Count commas to determine active parameter
      const afterParen = textBefore.substring(textBefore.lastIndexOf("(") + 1);
      const activeParam = (afterParen.match(/,/g) || []).length;

      // Parse parameters from signature
      const paramMatch = info.signature.match(/\(([^)]*)\)/);
      const params = paramMatch
        ? paramMatch[1].split(",").map((p) => ({ label: p.trim() }))
        : [];

      return {
        value: {
          signatures: [
            {
              label: info.signature,
              documentation: info.doc,
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

  // ─── Go To Definition Provider ──────────────────────────────────────────────
  monaco.languages.registerDefinitionProvider("kotlin", {
    provideDefinition: function (model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return null;
      const defs = parseDefinitions(model.getValue());
      const def = defs[word.word];
      if (def) {
        return {
          uri: model.uri,
          range: new monaco.Range(
            def.line,
            def.col,
            def.line,
            def.col + word.word.length,
          ),
        };
      }
      return null;
    },
  });

  // ─── Document Symbol Provider ───────────────────────────────────────────────
  monaco.languages.registerDocumentSymbolProvider("kotlin", {
    provideDocumentSymbols: function (model) {
      const symbols = [];
      const lines = model.getValue().split("\n");
      lines.forEach((line, idx) => {
        let m;
        m = line.match(/\bfun\s+(?:<[^>]+>\s+)?(?:\w+\.)?(\w+)\s*\(/);
        if (m) {
          symbols.push({
            name: m[1],
            kind: monaco.languages.SymbolKind.Function,
            range: new monaco.Range(idx + 1, 1, idx + 1, line.length + 1),
            selectionRange: new monaco.Range(
              idx + 1,
              line.indexOf(m[1]) + 1,
              idx + 1,
              line.indexOf(m[1]) + m[1].length + 1,
            ),
            detail: "function",
          });
        }
        m = line.match(/\b(?:data\s+)?(?:sealed\s+)?(?:enum\s+)?class\s+(\w+)/);
        if (m) {
          symbols.push({
            name: m[1],
            kind: monaco.languages.SymbolKind.Class,
            range: new monaco.Range(idx + 1, 1, idx + 1, line.length + 1),
            selectionRange: new monaco.Range(
              idx + 1,
              line.indexOf(m[1]) + 1,
              idx + 1,
              line.indexOf(m[1]) + m[1].length + 1,
            ),
            detail: "class",
          });
        }
        m = line.match(/\binterface\s+(\w+)/);
        if (m) {
          symbols.push({
            name: m[1],
            kind: monaco.languages.SymbolKind.Interface,
            range: new monaco.Range(idx + 1, 1, idx + 1, line.length + 1),
            selectionRange: new monaco.Range(
              idx + 1,
              line.indexOf(m[1]) + 1,
              idx + 1,
              line.indexOf(m[1]) + m[1].length + 1,
            ),
            detail: "interface",
          });
        }
        m = line.match(/\bobject\s+(\w+)/);
        if (m) {
          symbols.push({
            name: m[1],
            kind: monaco.languages.SymbolKind.Object,
            range: new monaco.Range(idx + 1, 1, idx + 1, line.length + 1),
            selectionRange: new monaco.Range(
              idx + 1,
              line.indexOf(m[1]) + 1,
              idx + 1,
              line.indexOf(m[1]) + m[1].length + 1,
            ),
            detail: "object",
          });
        }
        m = line.match(/\b(?:val|var)\s+(\w+)/);
        if (m) {
          symbols.push({
            name: m[1],
            kind: line.includes("val")
              ? monaco.languages.SymbolKind.Constant
              : monaco.languages.SymbolKind.Variable,
            range: new monaco.Range(idx + 1, 1, idx + 1, line.length + 1),
            selectionRange: new monaco.Range(
              idx + 1,
              line.indexOf(m[1]) + 1,
              idx + 1,
              line.indexOf(m[1]) + m[1].length + 1,
            ),
            detail: line.includes("val") ? "val" : "var",
          });
        }
      });
      return symbols;
    },
  });

  // ─── Folding Range Provider ─────────────────────────────────────────────────
  monaco.languages.registerFoldingRangeProvider("kotlin", {
    provideFoldingRanges: function (model) {
      const ranges = [];
      const lines = model.getValue().split("\n");
      const stack = [];
      lines.forEach((line, idx) => {
        const trimmed = line.trim();
        if (trimmed.endsWith("{")) {
          stack.push(idx);
        }
        if (trimmed.startsWith("}") || trimmed === "}") {
          if (stack.length > 0) {
            const start = stack.pop();
            ranges.push({
              start: start + 1,
              end: idx + 1,
              kind: monaco.languages.FoldingRangeKind.Region,
            });
          }
        }
        // Multiline comments
        if (trimmed.startsWith("/*") && !trimmed.endsWith("*/")) {
          stack.push(idx);
        }
        if (trimmed.endsWith("*/") && !trimmed.startsWith("/*")) {
          if (stack.length > 0) {
            const start = stack.pop();
            ranges.push({
              start: start + 1,
              end: idx + 1,
              kind: monaco.languages.FoldingRangeKind.Comment,
            });
          }
        }
      });
      return ranges;
    },
  });

  // ─── Reference Provider ─────────────────────────────────────────────────────
  monaco.languages.registerReferenceProvider("kotlin", {
    provideReferences: function (model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return [];
      const references = [];
      const text = model.getValue();
      const lines = text.split("\n");
      const regex = new RegExp("\\b" + word.word + "\\b", "g");
      lines.forEach((line, idx) => {
        let m;
        while ((m = regex.exec(line)) !== null) {
          references.push({
            uri: model.uri,
            range: new monaco.Range(
              idx + 1,
              m.index + 1,
              idx + 1,
              m.index + word.word.length + 1,
            ),
          });
        }
      });
      return references;
    },
  });

  // ─── Rename Provider ────────────────────────────────────────────────────────
  monaco.languages.registerRenameProvider("kotlin", {
    provideRenameEdits: function (model, position, newName) {
      const word = model.getWordAtPosition(position);
      if (!word) return null;
      const edits = [];
      const lines = model.getValue().split("\n");
      const regex = new RegExp("\\b" + word.word + "\\b", "g");
      lines.forEach((line, idx) => {
        let m;
        while ((m = regex.exec(line)) !== null) {
          edits.push({
            resource: model.uri,
            versionId: model.getVersionId(),
            textEdit: {
              range: new monaco.Range(
                idx + 1,
                m.index + 1,
                idx + 1,
                m.index + word.word.length + 1,
              ),
              text: newName,
            },
          });
        }
      });
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

  // ─── Code Action Provider (Quick Fixes) ─────────────────────────────────────
  monaco.languages.registerCodeActionProvider("kotlin", {
    provideCodeActions: function (model, range, context) {
      const actions = [];
      context.markers.forEach((marker) => {
        if (marker.message.includes("might be unused")) {
          actions.push({
            title: "Prefix with underscore",
            kind: "quickfix",
            edit: {
              edits: [
                {
                  resource: model.uri,
                  textEdit: {
                    range: marker,
                    text: "_" + model.getValueInRange(marker),
                  },
                },
              ],
            },
          });
        }
      });
      return { actions, dispose: function () {} };
    },
  });
};
