import type * as Monaco from "monaco-editor";

export default (monaco: typeof Monaco) => {
  // ===== 1. REGISTER LANGUAGE =====
  monaco.languages.register({
    id: "dart",
    extensions: [".dart"],
    aliases: ["Dart", "dart"],
    mimetypes: ["application/dart"],
  });

  // ===== 2. LANGUAGE CONFIGURATION =====
  monaco.languages.setLanguageConfiguration("dart", {
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
      { open: "'", close: "'", notIn: ["string", "comment"] },
      { open: '"', close: '"', notIn: ["string"] },
      { open: "/**", close: " */", notIn: ["string"] },
    ],
    surroundingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: "<", close: ">" },
      { open: "'", close: "'" },
      { open: '"', close: '"' },
    ],
    folding: {
      markers: {
        start: /^\s*\/\/\s*#?region\b/,
        end: /^\s*\/\/\s*#?endregion\b/,
      },
    },
    indentationRules: {
      increaseIndentPattern: /^((?!\/\/).)*(\{[^}"']*|\([^)"']*|\[[^\]"']*)$/,
      decreaseIndentPattern: /^((?!.*?\/\*).*\*\/)?\s*[}\])]/,
    },
    onEnterRules: [
      {
        beforeText: /^\s*\/\/\/.*$/,
        action: {
          indentAction: monaco.languages.IndentAction.None,
          appendText: "/// ",
        },
      },
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
    ],
    wordPattern:
      /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
  });

  // ===== 3. MONARCH TOKENIZER (Syntax Highlighting) =====
  monaco.languages.setMonarchTokensProvider("dart", {
    defaultToken: "",
    tokenPostfix: ".dart",
    keywords: [
      "abstract",
      "as",
      "assert",
      "async",
      "await",
      "base",
      "break",
      "case",
      "catch",
      "class",
      "const",
      "continue",
      "covariant",
      "default",
      "deferred",
      "do",
      "dynamic",
      "else",
      "enum",
      "export",
      "extends",
      "extension",
      "external",
      "factory",
      "false",
      "final",
      "finally",
      "for",
      "Function",
      "get",
      "hide",
      "if",
      "implements",
      "import",
      "in",
      "interface",
      "is",
      "late",
      "library",
      "mixin",
      "new",
      "null",
      "of",
      "on",
      "operator",
      "part",
      "required",
      "rethrow",
      "return",
      "sealed",
      "set",
      "show",
      "static",
      "super",
      "switch",
      "sync",
      "this",
      "throw",
      "true",
      "try",
      "typedef",
      "var",
      "void",
      "when",
      "while",
      "with",
      "yield",
    ],
    typeKeywords: [
      "int",
      "double",
      "num",
      "String",
      "bool",
      "List",
      "Map",
      "Set",
      "Future",
      "Stream",
      "Iterable",
      "Object",
      "Null",
      "Never",
      "Type",
      "Symbol",
      "BigInt",
      "DateTime",
      "Duration",
      "RegExp",
      "Uri",
      "Comparable",
      "Pattern",
      "Match",
      "Record",
      "dynamic",
      "FutureOr",
      "Completer",
      "StreamController",
      "StreamSubscription",
      "Timer",
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
      "??",
      "?.",
      "..",
      "...",
      "=>",
      "~/",
    ],
    symbols: /[=><!~?:&|+\-*\/\^%\.]+/,
    escapes:
      /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
    digits: /\d+(_+\d+)*/,

    tokenizer: {
      root: [
        [/\/\/\/.*$/, "comment.doc"],
        [/@[a-zA-Z_$][\w$]*/, "annotation"],
        [
          /[a-z_$][\w$]*/,
          {
            cases: {
              "@keywords": "keyword",
              "@typeKeywords": "type.identifier",
              "@default": "identifier",
            },
          },
        ],
        [
          /[A-Z][\w$]*/,
          {
            cases: {
              "@typeKeywords": "type.identifier",
              "@keywords": "keyword",
              "@default": "type.identifier",
            },
          },
        ],
        { include: "@whitespace" },
        [/[{}()\[\]]/, "@brackets"],
        [/[<>](?!@symbols)/, "@brackets"],
        [/@symbols/, { cases: { "@operators": "operator", "@default": "" } }],
        [/(@digits)[eE]([\-+]?(@digits))?/, "number.float"],
        [/(@digits)\.(@digits)([eE][\-+]?(@digits))?/, "number.float"],
        [/0[xX][0-9a-fA-F_]+/, "number.hex"],
        [/0[bB][01_]+/, "number.binary"],
        [/(@digits)/, "number"],
        [/[;,.]/, "delimiter"],
        [/r"""/, "string", "@rawTripleDQ"],
        [/r'''/, "string", "@rawTripleSQ"],
        [/r"/, "string", "@rawDQ"],
        [/r'/, "string", "@rawSQ"],
        [/"""/, "string", "@tripleDQ"],
        [/'''/, "string", "@tripleSQ"],
        [/"/, "string", "@dq"],
        [/'/, "string", "@sq"],
      ],
      whitespace: [
        [/[ \t\r\n]+/, ""],
        [/\/\*\*(?!\/)/, "comment.doc", "@commentDoc"],
        [/\/\*/, "comment", "@comment"],
        [/\/\/.*$/, "comment"],
      ],
      comment: [
        [/[^\/*]+/, "comment"],
        [/\/\*/, "comment", "@push"],
        [/\*\//, "comment", "@pop"],
        [/[\/*]/, "comment"],
      ],
      commentDoc: [
        [/[^\/*]+/, "comment.doc"],
        [/\/\*/, "comment.doc", "@push"],
        [/\*\//, "comment.doc", "@pop"],
        [/[\/*]/, "comment.doc"],
      ],
      dq: [
        [/[^\\"$]+/, "string"],
        [/\$\{/, "string.interpolation", "@interp"],
        [/\$[a-zA-Z_]\w*/, "string.interpolation"],
        [/@escapes/, "string.escape"],
        [/\\./, "string.escape.invalid"],
        [/"/, "string", "@pop"],
      ],
      sq: [
        [/[^\\'$]+/, "string"],
        [/\$\{/, "string.interpolation", "@interp"],
        [/\$[a-zA-Z_]\w*/, "string.interpolation"],
        [/@escapes/, "string.escape"],
        [/\\./, "string.escape.invalid"],
        [/'/, "string", "@pop"],
      ],
      tripleDQ: [
        [/"""/, "string", "@pop"],
        [/[^\\"$]+/, "string"],
        [/\$\{/, "string.interpolation", "@interp"],
        [/\$[a-zA-Z_]\w*/, "string.interpolation"],
        [/@escapes/, "string.escape"],
        [/\\./, "string.escape.invalid"],
        [/./, "string"],
      ],
      tripleSQ: [
        [/'''/, "string", "@pop"],
        [/[^\\'$]+/, "string"],
        [/\$\{/, "string.interpolation", "@interp"],
        [/\$[a-zA-Z_]\w*/, "string.interpolation"],
        [/@escapes/, "string.escape"],
        [/\\./, "string.escape.invalid"],
        [/./, "string"],
      ],
      rawDQ: [
        [/[^"]+/, "string"],
        [/"/, "string", "@pop"],
      ],
      rawSQ: [
        [/[^']+/, "string"],
        [/'/, "string", "@pop"],
      ],
      rawTripleDQ: [
        [/"""/, "string", "@pop"],
        [/./, "string"],
      ],
      rawTripleSQ: [
        [/'''/, "string", "@pop"],
        [/./, "string"],
      ],
      interp: [
        [/\{/, "string.interpolation", "@push"],
        [/\}/, "string.interpolation", "@pop"],
        { include: "root" },
      ],
    },
  });

  // ===== 4. DOCS DATABASE =====
  const D = {
    int: {
      sig: "abstract class int extends num",
      doc: "An integer number. The default implementation is 64-bit two's complement integers.",
    },
    double: {
      sig: "abstract class double extends num",
      doc: "An IEEE 754 double-precision floating-point number.",
    },
    num: {
      sig: "abstract class num implements Comparable<num>",
      doc: "An integer or floating-point number.",
    },
    String: {
      sig: "abstract class String implements Comparable<String>, Pattern",
      doc: "A sequence of UTF-16 code units. Strings are immutable.",
    },
    bool: {
      sig: "class bool",
      doc: "The reserved words `true` and `false` denote the two objects that are the only instances of this class.",
    },
    List: {
      sig: "abstract class List<E> implements Iterable<E>",
      doc: "An indexable collection of objects with a length. Also known as an array.",
    },
    Map: {
      sig: "abstract class Map<K, V>",
      doc: "A collection of key/value pairs, from which you retrieve a value using its associated key.",
    },
    Set: {
      sig: "abstract class Set<E> implements Iterable<E>",
      doc: "A collection of objects in which each object can occur only once.",
    },
    Future: {
      sig: "abstract class Future<T>",
      doc: "The result of an asynchronous computation. Used to represent a potential value or error available in the future.",
    },
    Stream: {
      sig: "abstract class Stream<T>",
      doc: "A source of asynchronous data events. Provides a way to receive a sequence of events.",
    },
    Iterable: {
      sig: "abstract class Iterable<E>",
      doc: 'A collection of values, or "elements", that can be accessed sequentially.',
    },
    Object: {
      sig: "class Object",
      doc: "The base class for all Dart objects except `null`.",
    },
    DateTime: {
      sig: "class DateTime implements Comparable<DateTime>",
      doc: "An instant in time, such as July 20, 1969, 8:18pm GMT.",
    },
    Duration: {
      sig: "class Duration implements Comparable<Duration>",
      doc: "A span of time, such as 27 days, 4 hours, 12 minutes, and 3 seconds.",
    },
    RegExp: {
      sig: "abstract class RegExp implements Pattern",
      doc: "A regular expression pattern used to match strings or parts of strings.",
    },
    Uri: { sig: "abstract class Uri", doc: "A parsed URI, such as a URL." },
    dynamic: {
      sig: "dynamic",
      doc: "A special type that disables static type checking. Every expression is assignable to `dynamic`.",
    },
    void: {
      sig: "void",
      doc: "Indicates that a function does not return a useful value.",
    },
    Never: {
      sig: "class Never",
      doc: "The bottom type — a subtype of all types. No value can have type `Never`.",
    },
    Null: { sig: "class Null", doc: "The class of the `null` object." },
    Record: {
      sig: "abstract class Record",
      doc: "Records are anonymous immutable aggregate types.",
    },
    FutureOr: {
      sig: "typedef FutureOr<T> = T | Future<T>",
      doc: "A type representing values that are either `Future<T>` or `T`.",
    },
    Completer: {
      sig: "abstract class Completer<T>",
      doc: "A way to produce Future objects and to complete them later with a value or error.",
    },
    StreamController: {
      sig: "abstract class StreamController<T> implements StreamSink<T>",
      doc: "A controller with the stream it controls.",
    },
    Timer: {
      sig: "abstract class Timer",
      doc: "A count-down timer that can be configured to fire once or repeatedly.",
    },
    print: {
      sig: "void print(Object? object)",
      doc: "Prints a string representation of the object to the console.",
    },
    identical: {
      sig: "bool identical(Object? a, Object? b)",
      doc: "Check whether two references are to the same object.",
    },
    abstract: {
      sig: "keyword",
      doc: "Declares an abstract class that cannot be instantiated directly.",
    },
    async: {
      sig: "keyword",
      doc: "Marks a function body as asynchronous. The function returns a `Future`.",
    },
    await: {
      sig: "keyword",
      doc: "Suspends execution until the `Future` completes and unwraps the result.",
    },
    class: { sig: "keyword", doc: "Declares a class definition." },
    const: { sig: "keyword", doc: "Declares a compile-time constant." },
    enum: { sig: "keyword", doc: "Declares an enumerated type." },
    extends: { sig: "keyword", doc: "Creates a subclass (inheritance)." },
    factory: {
      sig: "keyword",
      doc: "A constructor that does not always create a new instance of its class.",
    },
    final: {
      sig: "keyword",
      doc: "Declares a variable that can be set only once.",
    },
    implements: {
      sig: "keyword",
      doc: "Declares that a class implements an interface.",
    },
    import: { sig: "keyword", doc: "Imports a library." },
    late: {
      sig: "keyword",
      doc: "Declares a non-nullable variable initialized after its declaration, or lazily.",
    },
    mixin: {
      sig: "keyword",
      doc: "Declares a mixin for adding functionality to classes.",
    },
    required: { sig: "keyword", doc: "Marks a named parameter as required." },
    sealed: {
      sig: "keyword",
      doc: "A sealed class can't be extended or implemented outside its own library.",
    },
    static: {
      sig: "keyword",
      doc: "Declares a class-level variable or method.",
    },
    typedef: { sig: "keyword", doc: "Creates a type alias." },
    var: {
      sig: "keyword",
      doc: "Declares a variable without specifying its type (type is inferred).",
    },
    with: { sig: "keyword", doc: "Applies one or more mixins to a class." },
    yield: {
      sig: "keyword",
      doc: "Produces a value from a generator function (`sync*` or `async*`).",
    },
    switch: {
      sig: "keyword",
      doc: "Evaluates an expression and matches against case clauses. Supports patterns in Dart 3.",
    },
    is: {
      sig: "keyword",
      doc: "Type test operator. Checks if an object is of a given type.",
    },
    as: {
      sig: "keyword",
      doc: "Type cast operator. Casts an expression to a given type.",
    },

    toString: {
      sig: "String toString()",
      doc: "Returns a string representation of this object.",
    },
    hashCode: {
      sig: "int get hashCode",
      doc: "The hash code for this object.",
    },
    runtimeType: {
      sig: "Type get runtimeType",
      doc: "A representation of the runtime type of the object.",
    },
    length: {
      sig: "int get length",
      doc: "The number of elements / code units.",
    },
    isEmpty: {
      sig: "bool get isEmpty",
      doc: "Whether this collection has no elements.",
    },
    isNotEmpty: {
      sig: "bool get isNotEmpty",
      doc: "Whether this collection has at least one element.",
    },
    map: {
      sig: "Iterable<T> map<T>(T Function(E) toElement)",
      doc: "Returns a new lazy `Iterable` with elements created by calling `toElement` on each element.",
    },
    where: {
      sig: "Iterable<E> where(bool Function(E) test)",
      doc: "Returns a lazy `Iterable` with all elements that satisfy the predicate.",
    },
    forEach: {
      sig: "void forEach(void Function(E) action)",
      doc: "Applies `action` to each element in iteration order.",
    },
    reduce: {
      sig: "E reduce(E Function(E, E) combine)",
      doc: "Reduces a collection to a single value by iteratively combining elements.",
    },
    fold: {
      sig: "T fold<T>(T init, T Function(T, E) combine)",
      doc: "Reduces a collection starting with `init`.",
    },
    any: {
      sig: "bool any(bool Function(E) test)",
      doc: "Checks whether any element satisfies `test`.",
    },
    every: {
      sig: "bool every(bool Function(E) test)",
      doc: "Checks whether every element satisfies `test`.",
    },
    contains: {
      sig: "bool contains(Object? element)",
      doc: "Whether the collection contains an element equal to `element`.",
    },
    add: {
      sig: "void add(E value)",
      doc: "Adds `value` to the end of this list/set.",
    },
    remove: {
      sig: "bool remove(Object? value)",
      doc: "Removes the first occurrence of `value`.",
    },
    sort: {
      sig: "void sort([int Function(E, E)? compare])",
      doc: "Sorts this list according to the `compare` function.",
    },
    join: {
      sig: 'String join([String separator = ""])',
      doc: "Converts each element to a `String` and concatenates them.",
    },
    toList: {
      sig: "List<E> toList({bool growable = true})",
      doc: "Creates a `List` containing the elements of this `Iterable`.",
    },
    toSet: {
      sig: "Set<E> toSet()",
      doc: "Creates a `Set` with the same elements as this iterable.",
    },
    first: { sig: "E get first", doc: "Returns the first element." },
    last: { sig: "E get last", doc: "Returns the last element." },
    reversed: {
      sig: "Iterable<E> get reversed",
      doc: "The elements of this list in reverse order.",
    },
    sublist: {
      sig: "List<E> sublist(int start, [int? end])",
      doc: "Returns a new list from `start` (inclusive) to `end` (exclusive).",
    },
    split: {
      sig: "List<String> split(Pattern pattern)",
      doc: "Splits the string at matches of `pattern`.",
    },
    trim: {
      sig: "String trim()",
      doc: "Removes leading and trailing whitespace.",
    },
    replaceAll: {
      sig: "String replaceAll(Pattern from, String replace)",
      doc: "Replaces all substrings matching `from` with `replace`.",
    },
    startsWith: {
      sig: "bool startsWith(Pattern pattern, [int index = 0])",
      doc: "Whether this string starts with a match of `pattern`.",
    },
    endsWith: {
      sig: "bool endsWith(String other)",
      doc: "Whether this string ends with `other`.",
    },
    substring: {
      sig: "String substring(int start, [int? end])",
      doc: "The substring from `start` inclusive to `end` exclusive.",
    },
    toLowerCase: {
      sig: "String toLowerCase()",
      doc: "Converts all characters to lower case.",
    },
    toUpperCase: {
      sig: "String toUpperCase()",
      doc: "Converts all characters to upper case.",
    },
    then: {
      sig: "Future<R> then<R>(FutureOr<R> Function(T) onValue, {Function? onError})",
      doc: "Registers callbacks for when this future completes.",
    },
    catchError: {
      sig: "Future<T> catchError(Function onError, {bool Function(Object)? test})",
      doc: "Handles errors emitted by this `Future`.",
    },
    whenComplete: {
      sig: "Future<T> whenComplete(FutureOr<void> Function() action)",
      doc: "Registers a function called when this future completes.",
    },
    listen: {
      sig: "StreamSubscription<T> listen(void Function(T)? onData, ...)",
      doc: "Adds a subscription to this stream.",
    },
    keys: { sig: "Iterable<K> get keys", doc: "The keys of this map." },
    values: { sig: "Iterable<V> get values", doc: "The values of this map." },
    entries: {
      sig: "Iterable<MapEntry<K,V>> get entries",
      doc: "The map entries of this map.",
    },
    containsKey: {
      sig: "bool containsKey(Object? key)",
      doc: "Whether this map contains the given `key`.",
    },
    containsValue: {
      sig: "bool containsValue(Object? value)",
      doc: "Whether this map contains the given `value`.",
    },
    putIfAbsent: {
      sig: "V putIfAbsent(K key, V Function() ifAbsent)",
      doc: "Look up the value of `key`, or add a new entry if it isn't there.",
    },
    indexOf: {
      sig: "int indexOf(E element, [int start = 0])",
      doc: "The first index of `element` in this list.",
    },
    clear: {
      sig: "void clear()",
      doc: "Removes all elements from this collection.",
    },
    addAll: {
      sig: "void addAll(Iterable<E> iterable)",
      doc: "Appends all objects of `iterable` to the end of this list.",
    },
    insert: {
      sig: "void insert(int index, E element)",
      doc: "Inserts `element` at position `index`.",
    },
    removeAt: {
      sig: "E removeAt(int index)",
      doc: "Removes the object at position `index`.",
    },
    asMap: {
      sig: "Map<int, E> asMap()",
      doc: "An unmodifiable `Map` view of this list.",
    },
    take: {
      sig: "Iterable<E> take(int count)",
      doc: "Returns a lazy iterable of the first `count` elements.",
    },
    skip: {
      sig: "Iterable<E> skip(int count)",
      doc: "Returns an iterable that skips the first `count` elements.",
    },
    expand: {
      sig: "Iterable<T> expand<T>(Iterable<T> Function(E) f)",
      doc: "Expands each element into zero or more elements.",
    },
    fillRange: {
      sig: "void fillRange(int start, int end, [E? fillValue])",
      doc: "Overwrites a range of elements with `fillValue`.",
    },
  };

  // ===== 5. HELPER: Find local symbols =====
  function findLocalSymbols(text) {
    const syms = [];
    const lines = text.split("\n");
    const pats = [
      {
        r: /(?:abstract\s+)?(?:sealed\s+)?(?:base\s+)?class\s+(\w+)/,
        k: "class",
      },
      { r: /mixin\s+(\w+)/, k: "mixin" },
      { r: /enum\s+(\w+)/, k: "enum" },
      { r: /extension\s+(\w+)\s+on/, k: "extension" },
      { r: /typedef\s+(\w+)/, k: "typedef" },
    ];
    const funcPat =
      /(?:(?:Future|Stream|void|int|double|String|bool|num|dynamic|List|Map|Set|Iterable|Object)(?:<[^>]*>)?\??\s+)(\w+)\s*[\(<]/;
    const varPat = /(?:var|final|const|late)\s+(\w+)/;

    lines.forEach((line, i) => {
      for (const p of pats) {
        const m = line.match(p.r);
        if (m)
          syms.push({
            name: m[1],
            line: i,
            col: line.indexOf(m[1]),
            kind: p.k,
            decl: line.trim(),
          });
      }
      const fm = line.match(funcPat);
      if (fm && !line.trim().startsWith("//"))
        syms.push({
          name: fm[1],
          line: i,
          col: line.indexOf(fm[1]),
          kind: "function",
          decl: line.trim(),
        });
      const vm = line.match(varPat);
      if (vm && !line.trim().startsWith("//"))
        syms.push({
          name: vm[1],
          line: i,
          col: line.indexOf(vm[1]),
          kind: "variable",
          decl: line.trim(),
        });
    });
    return syms;
  }

  function getDocComment(lines, lineIndex) {
    let doc = "";
    for (let j = lineIndex - 1; j >= 0; j--) {
      const t = lines[j].trim();
      if (t.startsWith("///")) {
        doc = t.replace(/^\/\/\/\s?/, "") + "\n" + doc;
      } else if (t === "" || t.startsWith("@")) continue;
      else break;
    }
    return doc.trim();
  }

  // ===== 6. COMPLETION PROVIDER =====
  monaco.languages.registerCompletionItemProvider("dart", {
    triggerCharacters: [".", "@", "$"],
    provideCompletionItems(model, position) {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };
      const line = model.getLineContent(position.lineNumber);
      const before = line.substring(0, position.column - 1);
      const CK = monaco.languages.CompletionItemKind;
      const SNIPPET =
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet;
      const S = [];

      // ---- DOT COMPLETIONS ----
      if (/\w+\.\s*$/.test(before)) {
        const members = [
          {
            l: "toString",
            i: "toString()",
            k: CK.Method,
            d: "String toString()",
          },
          {
            l: "hashCode",
            i: "hashCode",
            k: CK.Property,
            d: "int get hashCode",
          },
          {
            l: "runtimeType",
            i: "runtimeType",
            k: CK.Property,
            d: "Type get runtimeType",
          },
          { l: "length", i: "length", k: CK.Property, d: "int get length" },
          { l: "isEmpty", i: "isEmpty", k: CK.Property, d: "bool get isEmpty" },
          {
            l: "isNotEmpty",
            i: "isNotEmpty",
            k: CK.Property,
            d: "bool get isNotEmpty",
          },
          { l: "first", i: "first", k: CK.Property, d: "E get first" },
          { l: "last", i: "last", k: CK.Property, d: "E get last" },
          {
            l: "reversed",
            i: "reversed",
            k: CK.Property,
            d: "Iterable<E> get reversed",
          },
          { l: "keys", i: "keys", k: CK.Property, d: "Iterable<K> get keys" },
          {
            l: "values",
            i: "values",
            k: CK.Property,
            d: "Iterable<V> get values",
          },
          {
            l: "entries",
            i: "entries",
            k: CK.Property,
            d: "Iterable<MapEntry<K,V>> get entries",
          },
          {
            l: "add",
            i: "add(${1:value})",
            k: CK.Method,
            d: "void add(E value)",
          },
          {
            l: "addAll",
            i: "addAll(${1:iterable})",
            k: CK.Method,
            d: "void addAll(Iterable<E>)",
          },
          {
            l: "insert",
            i: "insert(${1:index}, ${2:element})",
            k: CK.Method,
            d: "void insert(int, E)",
          },
          {
            l: "remove",
            i: "remove(${1:value})",
            k: CK.Method,
            d: "bool remove(Object?)",
          },
          {
            l: "removeAt",
            i: "removeAt(${1:index})",
            k: CK.Method,
            d: "E removeAt(int index)",
          },
          {
            l: "removeLast",
            i: "removeLast()",
            k: CK.Method,
            d: "E removeLast()",
          },
          {
            l: "removeWhere",
            i: "removeWhere((${1:e}) => ${2})",
            k: CK.Method,
            d: "void removeWhere(bool Function(E))",
          },
          { l: "clear", i: "clear()", k: CK.Method, d: "void clear()" },
          {
            l: "contains",
            i: "contains(${1:element})",
            k: CK.Method,
            d: "bool contains(Object?)",
          },
          {
            l: "containsKey",
            i: "containsKey(${1:key})",
            k: CK.Method,
            d: "bool containsKey(Object?)",
          },
          {
            l: "containsValue",
            i: "containsValue(${1:value})",
            k: CK.Method,
            d: "bool containsValue(Object?)",
          },
          {
            l: "indexOf",
            i: "indexOf(${1:element})",
            k: CK.Method,
            d: "int indexOf(E)",
          },
          {
            l: "lastIndexOf",
            i: "lastIndexOf(${1:element})",
            k: CK.Method,
            d: "int lastIndexOf(E)",
          },
          {
            l: "map",
            i: "map((${1:e}) => ${2})",
            k: CK.Method,
            d: "Iterable<T> map<T>(T Function(E))",
          },
          {
            l: "where",
            i: "where((${1:e}) => ${2})",
            k: CK.Method,
            d: "Iterable<E> where(bool Function(E))",
          },
          {
            l: "forEach",
            i: "forEach((${1:e}) {\n\t$0\n})",
            k: CK.Method,
            d: "void forEach(void Function(E))",
          },
          {
            l: "any",
            i: "any((${1:e}) => ${2})",
            k: CK.Method,
            d: "bool any(bool Function(E))",
          },
          {
            l: "every",
            i: "every((${1:e}) => ${2})",
            k: CK.Method,
            d: "bool every(bool Function(E))",
          },
          {
            l: "reduce",
            i: "reduce((${1:a}, ${2:b}) => ${3})",
            k: CK.Method,
            d: "E reduce(E Function(E,E))",
          },
          {
            l: "fold",
            i: "fold(${1:init}, (${2:prev}, ${3:e}) => ${4})",
            k: CK.Method,
            d: "T fold<T>(T, T Function(T,E))",
          },
          {
            l: "join",
            i: "join('${1:, }')",
            k: CK.Method,
            d: "String join([String separator])",
          },
          {
            l: "sort",
            i: "sort(${1})",
            k: CK.Method,
            d: "void sort([int Function(E,E)?])",
          },
          {
            l: "sublist",
            i: "sublist(${1:start})",
            k: CK.Method,
            d: "List<E> sublist(int, [int?])",
          },
          { l: "toList", i: "toList()", k: CK.Method, d: "List<E> toList()" },
          { l: "toSet", i: "toSet()", k: CK.Method, d: "Set<E> toSet()" },
          {
            l: "take",
            i: "take(${1:count})",
            k: CK.Method,
            d: "Iterable<E> take(int)",
          },
          {
            l: "skip",
            i: "skip(${1:count})",
            k: CK.Method,
            d: "Iterable<E> skip(int)",
          },
          {
            l: "expand",
            i: "expand((${1:e}) => ${2})",
            k: CK.Method,
            d: "Iterable<T> expand<T>(...)",
          },
          { l: "asMap", i: "asMap()", k: CK.Method, d: "Map<int,E> asMap()" },
          {
            l: "split",
            i: "split('${1}')",
            k: CK.Method,
            d: "List<String> split(Pattern)",
          },
          { l: "trim", i: "trim()", k: CK.Method, d: "String trim()" },
          {
            l: "trimLeft",
            i: "trimLeft()",
            k: CK.Method,
            d: "String trimLeft()",
          },
          {
            l: "trimRight",
            i: "trimRight()",
            k: CK.Method,
            d: "String trimRight()",
          },
          {
            l: "replaceAll",
            i: "replaceAll('${1:from}', '${2:to}')",
            k: CK.Method,
            d: "String replaceAll(Pattern, String)",
          },
          {
            l: "replaceFirst",
            i: "replaceFirst('${1:from}', '${2:to}')",
            k: CK.Method,
            d: "String replaceFirst(Pattern, String)",
          },
          {
            l: "startsWith",
            i: "startsWith('${1}')",
            k: CK.Method,
            d: "bool startsWith(Pattern)",
          },
          {
            l: "endsWith",
            i: "endsWith('${1}')",
            k: CK.Method,
            d: "bool endsWith(String)",
          },
          {
            l: "substring",
            i: "substring(${1:start})",
            k: CK.Method,
            d: "String substring(int, [int?])",
          },
          {
            l: "toLowerCase",
            i: "toLowerCase()",
            k: CK.Method,
            d: "String toLowerCase()",
          },
          {
            l: "toUpperCase",
            i: "toUpperCase()",
            k: CK.Method,
            d: "String toUpperCase()",
          },
          {
            l: "padLeft",
            i: "padLeft(${1:width})",
            k: CK.Method,
            d: "String padLeft(int, [String])",
          },
          {
            l: "padRight",
            i: "padRight(${1:width})",
            k: CK.Method,
            d: "String padRight(int, [String])",
          },
          {
            l: "compareTo",
            i: "compareTo(${1:other})",
            k: CK.Method,
            d: "int compareTo(...)",
          },
          {
            l: "codeUnits",
            i: "codeUnits",
            k: CK.Property,
            d: "List<int> get codeUnits",
          },
          {
            l: "then",
            i: "then((${1:value}) {\n\t$0\n})",
            k: CK.Method,
            d: "Future<R> then<R>(...)",
          },
          {
            l: "catchError",
            i: "catchError((${1:e}) {\n\t$0\n})",
            k: CK.Method,
            d: "Future<T> catchError(...)",
          },
          {
            l: "whenComplete",
            i: "whenComplete(() {\n\t$0\n})",
            k: CK.Method,
            d: "Future<T> whenComplete(...)",
          },
          {
            l: "timeout",
            i: "timeout(Duration(${1:seconds: 5}))",
            k: CK.Method,
            d: "Future<T> timeout(Duration)",
          },
          {
            l: "asStream",
            i: "asStream()",
            k: CK.Method,
            d: "Stream<T> asStream()",
          },
          {
            l: "listen",
            i: "listen((${1:event}) {\n\t$0\n})",
            k: CK.Method,
            d: "StreamSubscription<T> listen(...)",
          },
          {
            l: "putIfAbsent",
            i: "putIfAbsent(${1:key}, () => ${2:value})",
            k: CK.Method,
            d: "V putIfAbsent(K, V Function())",
          },
          {
            l: "update",
            i: "update(${1:key}, (${2:v}) => ${3})",
            k: CK.Method,
            d: "V update(K, V Function(V))",
          },
          {
            l: "writeln",
            i: "writeln('${1}')",
            k: CK.Method,
            d: "void writeln([Object?])",
          },
          {
            l: "write",
            i: "write('${1}')",
            k: CK.Method,
            d: "void write(Object?)",
          },
          { l: "close", i: "close()", k: CK.Method, d: "Future close()" },
          { l: "abs", i: "abs()", k: CK.Method, d: "num abs()" },
          { l: "round", i: "round()", k: CK.Method, d: "int round()" },
          { l: "ceil", i: "ceil()", k: CK.Method, d: "int ceil()" },
          { l: "floor", i: "floor()", k: CK.Method, d: "int floor()" },
          { l: "toInt", i: "toInt()", k: CK.Method, d: "int toInt()" },
          {
            l: "toDouble",
            i: "toDouble()",
            k: CK.Method,
            d: "double toDouble()",
          },
          {
            l: "toStringAsFixed",
            i: "toStringAsFixed(${1:fractionDigits})",
            k: CK.Method,
            d: "String toStringAsFixed(int)",
          },
          {
            l: "clamp",
            i: "clamp(${1:lowerLimit}, ${2:upperLimit})",
            k: CK.Method,
            d: "num clamp(num, num)",
          },
          { l: "isNaN", i: "isNaN", k: CK.Property, d: "bool get isNaN" },
          {
            l: "isFinite",
            i: "isFinite",
            k: CK.Property,
            d: "bool get isFinite",
          },
          {
            l: "isNegative",
            i: "isNegative",
            k: CK.Property,
            d: "bool get isNegative",
          },
          { l: "sign", i: "sign", k: CK.Property, d: "num get sign" },
        ];
        const seen = new Set();
        members.forEach((m) => {
          if (!seen.has(m.l)) {
            seen.add(m.l);
            S.push({
              label: m.l,
              kind: m.k,
              insertText: m.i,
              insertTextRules: m.i.includes("$") ? SNIPPET : undefined,
              detail: m.d,
              documentation: D[m.l] ? D[m.l].doc : "",
              range,
            });
          }
        });
        return { suggestions: S };
      }

      // ---- KEYWORDS ----
      [
        "abstract",
        "as",
        "assert",
        "async",
        "await",
        "base",
        "break",
        "case",
        "catch",
        "class",
        "const",
        "continue",
        "covariant",
        "default",
        "deferred",
        "do",
        "dynamic",
        "else",
        "enum",
        "export",
        "extends",
        "extension",
        "external",
        "factory",
        "false",
        "final",
        "finally",
        "for",
        "get",
        "hide",
        "if",
        "implements",
        "import",
        "in",
        "interface",
        "is",
        "late",
        "library",
        "mixin",
        "new",
        "null",
        "of",
        "on",
        "operator",
        "part",
        "required",
        "rethrow",
        "return",
        "sealed",
        "set",
        "show",
        "static",
        "super",
        "switch",
        "sync",
        "this",
        "throw",
        "true",
        "try",
        "typedef",
        "var",
        "void",
        "when",
        "while",
        "with",
        "yield",
      ].forEach((kw) =>
        S.push({
          label: kw,
          kind: CK.Keyword,
          insertText: kw,
          detail: "keyword",
          range,
        }),
      );

      // ---- TYPES ----
      [
        ["int", "dart:core"],
        ["double", "dart:core"],
        ["num", "dart:core"],
        ["String", "dart:core"],
        ["bool", "dart:core"],
        ["List", "dart:core"],
        ["Map", "dart:core"],
        ["Set", "dart:core"],
        ["Future", "dart:async"],
        ["Stream", "dart:async"],
        ["Iterable", "dart:core"],
        ["Object", "dart:core"],
        ["Function", "dart:core"],
        ["Null", "dart:core"],
        ["Never", "dart:core"],
        ["Type", "dart:core"],
        ["Symbol", "dart:core"],
        ["BigInt", "dart:core"],
        ["DateTime", "dart:core"],
        ["Duration", "dart:core"],
        ["RegExp", "dart:core"],
        ["Uri", "dart:core"],
        ["Record", "dart:core"],
        ["Enum", "dart:core"],
        ["Error", "dart:core"],
        ["Exception", "dart:core"],
        ["FormatException", "dart:core"],
        ["StateError", "dart:core"],
        ["ArgumentError", "dart:core"],
        ["RangeError", "dart:core"],
        ["UnsupportedError", "dart:core"],
        ["UnimplementedError", "dart:core"],
        ["TypeError", "dart:core"],
        ["StackTrace", "dart:core"],
        ["Stopwatch", "dart:core"],
        ["StringBuffer", "dart:core"],
        ["StringSink", "dart:core"],
        ["MapEntry", "dart:core"],
        ["FutureOr", "dart:async"],
        ["Completer", "dart:async"],
        ["StreamController", "dart:async"],
        ["StreamSubscription", "dart:async"],
        ["StreamTransformer", "dart:async"],
        ["Timer", "dart:async"],
        ["Zone", "dart:async"],
      ].forEach(([n, lib]) =>
        S.push({
          label: n,
          kind: CK.Class,
          insertText: n,
          detail: lib,
          documentation: D[n] ? D[n].doc : "",
          range,
        }),
      );

      // ---- GLOBAL FUNCTIONS ----
      [
        {
          l: "print",
          i: "print(${1:object})",
          d: "void print(Object?)",
          dc: "Prints to the console.",
        },
        {
          l: "identical",
          i: "identical(${1:a}, ${2:b})",
          d: "bool identical(Object?, Object?)",
          dc: "Checks reference equality.",
        },
      ].forEach((f) =>
        S.push({
          label: f.l,
          kind: CK.Function,
          insertText: f.i,
          insertTextRules: SNIPPET,
          detail: f.d,
          documentation: f.dc,
          range,
        }),
      );

      // ---- ANNOTATIONS ----
      [
        {
          l: "@override",
          doc: "Marks a member as overriding a superclass member.",
        },
        { l: "@deprecated", doc: "Marks a declaration as deprecated." },
        {
          l: "@Deprecated",
          i: "@Deprecated('${1:message}')",
          doc: "Marks as deprecated with a message.",
        },
        { l: "@pragma", i: "@pragma('${1:name}')", doc: "A hint to tools." },
        {
          l: "@protected",
          doc: "Only usable within defining class and subclasses.",
        },
        { l: "@visibleForTesting", doc: "Visible only for testing." },
        { l: "@immutable", doc: "Marks a class as immutable." },
        { l: "@nonVirtual", doc: "Marks an instance member as non-virtual." },
      ].forEach((a) =>
        S.push({
          label: a.l,
          kind: CK.Property,
          insertText: a.i || a.l,
          insertTextRules: a.i ? SNIPPET : undefined,
          detail: "annotation",
          documentation: a.doc,
          range,
        }),
      );

      // ---- SNIPPETS ----
      const snips = [
        {
          l: "main",
          d: "Main function",
          t: "void main(${1:List<String> args}) {\n\t$0\n}",
        },
        {
          l: "mainAsync",
          d: "Async main",
          t: "Future<void> main(${1:List<String> args}) async {\n\t$0\n}",
        },
        {
          l: "class",
          d: "Class definition",
          t: "class ${1:Name} {\n\t${1:Name}(${2});\n\n\t$0\n}",
        },
        {
          l: "classExtends",
          d: "Class extends",
          t: "class ${1:Name} extends ${2:Super} {\n\t${1:Name}(${3}) : super(${4});\n\n\t$0\n}",
        },
        {
          l: "classImpl",
          d: "Class implements",
          t: "class ${1:Name} implements ${2:Interface} {\n\t$0\n}",
        },
        {
          l: "abstractClass",
          d: "Abstract class",
          t: "abstract class ${1:Name} {\n\t$0\n}",
        },
        {
          l: "sealedClass",
          d: "Sealed class",
          t: "sealed class ${1:Name} {\n\t$0\n}",
        },
        {
          l: "enum",
          d: "Enum definition",
          t: "enum ${1:Name} {\n\t${2:value1},\n\t${3:value2},\n}",
        },
        {
          l: "enhancedEnum",
          d: "Enhanced enum",
          t: "enum ${1:Name} {\n\t${2:val1}(${3}),\n\t${4:val2}(${5});\n\n\tconst ${1:Name}(${6:this.field});\n\n\tfinal ${7:String} ${8:field};\n}",
        },
        {
          l: "mixin",
          d: "Mixin definition",
          t: "mixin ${1:Name} on ${2:Class} {\n\t$0\n}",
        },
        {
          l: "extension",
          d: "Extension",
          t: "extension ${1:Name} on ${2:Type} {\n\t$0\n}",
        },
        { l: "fun", d: "Function", t: "${1:void} ${2:name}(${3}) {\n\t$0\n}" },
        {
          l: "asyncFun",
          d: "Async function",
          t: "Future<${1:void}> ${2:name}(${3}) async {\n\t$0\n}",
        },
        {
          l: "arrowFun",
          d: "Arrow function",
          t: "${1:void} ${2:name}(${3}) => ${4:expression};",
        },
        {
          l: "getter",
          d: "Getter",
          t: "${1:Type} get ${2:name} => ${3:value};",
        },
        {
          l: "setter",
          d: "Setter",
          t: "set ${1:name}(${2:Type} ${3:value}) {\n\t_${1:name} = ${3:value};\n}",
        },
        { l: "ifStmt", d: "If statement", t: "if (${1:condition}) {\n\t$0\n}" },
        {
          l: "ifElse",
          d: "If-else",
          t: "if (${1:condition}) {\n\t$2\n} else {\n\t$0\n}",
        },
        {
          l: "forLoop",
          d: "For loop",
          t: "for (var ${1:i} = 0; ${1:i} < ${2:length}; ${1:i}++) {\n\t$0\n}",
        },
        {
          l: "forIn",
          d: "For-in loop",
          t: "for (final ${1:item} in ${2:items}) {\n\t$0\n}",
        },
        {
          l: "whileLoop",
          d: "While loop",
          t: "while (${1:condition}) {\n\t$0\n}",
        },
        {
          l: "doWhile",
          d: "Do-while loop",
          t: "do {\n\t$0\n} while (${1:condition});",
        },
        {
          l: "switchStmt",
          d: "Switch statement",
          t: "switch (${1:value}) {\n\tcase ${2:pattern}:\n\t\t$0\n\t\tbreak;\n\tdefault:\n\t\tbreak;\n}",
        },
        {
          l: "switchExpr",
          d: "Switch expression (Dart 3)",
          t: "final ${1:result} = switch (${2:value}) {\n\t${3:pattern} => ${4:expr},\n\t_ => ${5:default},\n};",
        },
        {
          l: "tryCatch",
          d: "Try-catch",
          t: "try {\n\t$0\n} catch (e) {\n\tprint(e);\n}",
        },
        {
          l: "tryOnCatch",
          d: "Try-on-catch",
          t: "try {\n\t$0\n} on ${1:Exception} catch (e, s) {\n\tprint('\\$e\\n\\$s');\n}",
        },
        {
          l: "tryCatchFinally",
          d: "Try-catch-finally",
          t: "try {\n\t$0\n} catch (e) {\n\tprint(e);\n} finally {\n\t\n}",
        },
        {
          l: "importPkg",
          d: "Import statement",
          t: "import '${1:package}';$0",
        },
        {
          l: "importAs",
          d: "Import with alias",
          t: "import '${1:package}' as ${2:alias};$0",
        },
        {
          l: "importShow",
          d: "Import with show",
          t: "import '${1:package}' show ${2:Symbol};$0",
        },
        {
          l: "importHide",
          d: "Import with hide",
          t: "import '${1:package}' hide ${2:Symbol};$0",
        },
        { l: "typedef", d: "Type alias", t: "typedef ${1:Name} = ${2:Type};" },
        {
          l: "typedefFn",
          d: "Function type alias",
          t: "typedef ${1:Name} = ${2:void} Function(${3});",
        },
        {
          l: "singleton",
          d: "Singleton pattern",
          t: "class ${1:Name} {\n\tstatic final ${1:Name} _instance = ${1:Name}._internal();\n\n\tfactory ${1:Name}() => _instance;\n\n\t${1:Name}._internal();\n\n\t$0\n}",
        },
        {
          l: "factory",
          d: "Factory constructor",
          t: "factory ${1:Class}.${2:name}(${3}) {\n\t$0\n}",
        },
        {
          l: "test",
          d: "Test function",
          t: "test('${1:description}', () {\n\t$0\n});",
        },
        {
          l: "testAsync",
          d: "Async test",
          t: "test('${1:description}', () async {\n\t$0\n});",
        },
        {
          l: "group",
          d: "Test group",
          t: "group('${1:description}', () {\n\t$0\n});",
        },
        {
          l: "streamCtrl",
          d: "StreamController",
          t: "final ${1:controller} = StreamController<${2:String}>.broadcast();\n$0",
        },
        {
          l: "futureDelayed",
          d: "Future.delayed",
          t: "await Future.delayed(Duration(${1:milliseconds: 500}));$0",
        },
        {
          l: "copyWith",
          d: "copyWith method",
          t: "${1:ClassName} copyWith({\n\t${2:String}? ${3:field},\n}) {\n\treturn ${1:ClassName}(\n\t\t${3:field}: ${3:field} ?? this.${3:field},\n\t);\n}",
        },
      ];
      snips.forEach((s) =>
        S.push({
          label: s.l,
          kind: CK.Snippet,
          insertText: s.t,
          insertTextRules: SNIPPET,
          detail: "Snippet: " + s.d,
          documentation: { value: s.d },
          range,
          sortText: "0" + s.l,
        }),
      );

      // ---- LOCAL SYMBOLS ----
      const localSyms = findLocalSymbols(model.getValue());
      const added = new Set(S.map((s) => s.label));
      localSyms.forEach((sym) => {
        if (!added.has(sym.name)) {
          added.add(sym.name);
          const kindMap = {
            class: CK.Class,
            mixin: CK.Class,
            enum: CK.Enum,
            extension: CK.Class,
            typedef: CK.Interface,
            function: CK.Function,
            variable: CK.Variable,
          };
          S.push({
            label: sym.name,
            kind: kindMap[sym.kind] || CK.Variable,
            insertText: sym.name,
            detail: "(local " + sym.kind + ")",
            range,
          });
        }
      });

      return { suggestions: S };
    },
  });

  // ===== 7. HOVER PROVIDER =====
  monaco.languages.registerHoverProvider("dart", {
    provideHover(model, position) {
      const w = model.getWordAtPosition(position);
      if (!w) return null;
      const txt = w.word;
      const rng = new monaco.Range(
        position.lineNumber,
        w.startColumn,
        position.lineNumber,
        w.endColumn,
      );

      if (D[txt]) {
        return {
          range: rng,
          contents: [
            { value: "```dart\n" + D[txt].sig + "\n```" },
            { value: D[txt].doc },
          ],
        };
      }

      const lines = model.getLinesContent();
      const pats = [
        {
          r: new RegExp(
            "(?:abstract\\s+)?(?:sealed\\s+)?(?:base\\s+)?class\\s+" +
              txt +
              "(?:\\s|[<{]|extends|implements|with)",
          ),
          t: "class",
        },
        { r: new RegExp("mixin\\s+" + txt + "(?:\\s|[<{]|on)"), t: "mixin" },
        { r: new RegExp("enum\\s+" + txt + "(?:\\s|[<{])"), t: "enum" },
        { r: new RegExp("extension\\s+" + txt + "\\s+on"), t: "extension" },
        { r: new RegExp("typedef\\s+" + txt + "\\s*[=<]"), t: "typedef" },
        {
          r: new RegExp(
            "(?:void|int|double|String|bool|num|dynamic|Future|Stream|List|Map|Set|Iterable|Object)(?:<[^>]*>)?\\??\\s+" +
              txt +
              "\\s*[(<]",
          ),
          t: "function/method",
        },
        {
          r: new RegExp("(?:var|final|const|late)\\s+" + txt + "\\b"),
          t: "variable",
        },
      ];

      for (let i = 0; i < lines.length; i++) {
        for (const p of pats) {
          if (p.r.test(lines[i])) {
            const doc = getDocComment(lines, i);
            return {
              range: rng,
              contents: [
                { value: "```dart\n" + lines[i].trim() + "\n```" },
                ...(doc ? [{ value: doc }] : []),
                { value: "*Defined at line " + (i + 1) + "*" },
              ],
            };
          }
        }
      }
      return null;
    },
  });

  // ===== 8. DEFINITION PROVIDER =====
  monaco.languages.registerDefinitionProvider("dart", {
    provideDefinition(model, position) {
      const w = model.getWordAtPosition(position);
      if (!w) return null;
      const txt = w.word;
      const lines = model.getLinesContent();
      const pats = [
        new RegExp(
          "(?:abstract\\s+)?(?:sealed\\s+)?(?:base\\s+)?class\\s+" +
            txt +
            "(?:\\s|[<{]|extends|implements|with)",
        ),
        new RegExp("mixin\\s+" + txt + "(?:\\s|[<{]|on)"),
        new RegExp("enum\\s+" + txt + "(?:\\s|[<{])"),
        new RegExp("extension\\s+" + txt + "\\s+on"),
        new RegExp("typedef\\s+" + txt + "\\s*[=<]"),
        new RegExp(
          "(?:void|int|double|String|bool|num|dynamic|var|final|const|late|Future|Stream|List|Map|Set|Iterable|Object)(?:<[^>]*>)?\\??\\s+" +
            txt +
            "\\s*[\\(;=,]",
        ),
        new RegExp("\\b" + txt + "\\s*\\([^)]*\\)\\s*\\{"),
      ];
      for (let i = 0; i < lines.length; i++) {
        for (const p of pats) {
          if (p.test(lines[i])) {
            const col = lines[i].indexOf(txt) + 1;
            return {
              uri: model.uri,
              range: new monaco.Range(i + 1, col, i + 1, col + txt.length),
            };
          }
        }
      }
      return null;
    },
  });

  // ===== 9. SIGNATURE HELP PROVIDER =====
  monaco.languages.registerSignatureHelpProvider("dart", {
    signatureHelpTriggerCharacters: ["(", ","],
    provideSignatureHelp(model, position) {
      const line = model.getLineContent(position.lineNumber);
      const before = line.substring(0, position.column - 1);
      const m = before.match(/(\w+)\s*\([^)]*$/);
      if (!m) return null;
      const fn = m[1];
      const afterParen = before.substring(before.lastIndexOf("(") + 1);
      const activeParam = (afterParen.match(/,/g) || []).length;

      const sigs = {
        print: {
          l: "void print(Object? object)",
          d: "Prints a string representation to the console.",
          p: [
            { label: "Object? object", documentation: "The object to print." },
          ],
        },
        Duration: {
          l: "Duration({int days, int hours, int minutes, int seconds, int milliseconds, int microseconds})",
          d: "Creates a Duration.",
          p: [
            { label: "int days", documentation: "Days." },
            { label: "int hours", documentation: "Hours." },
            { label: "int minutes", documentation: "Minutes." },
            { label: "int seconds", documentation: "Seconds." },
            { label: "int milliseconds", documentation: "Milliseconds." },
            { label: "int microseconds", documentation: "Microseconds." },
          ],
        },
        RegExp: {
          l: "RegExp(String source, {bool multiLine, bool caseSensitive})",
          d: "Creates a regular expression.",
          p: [
            { label: "String source", documentation: "The pattern." },
            { label: "bool multiLine", documentation: "Match across lines." },
            { label: "bool caseSensitive", documentation: "Case sensitive." },
          ],
        },
        identical: {
          l: "bool identical(Object? a, Object? b)",
          d: "Check reference equality.",
          p: [
            { label: "Object? a", documentation: "First object." },
            { label: "Object? b", documentation: "Second object." },
          ],
        },
        "Future.delayed": {
          l: "Future.delayed(Duration duration, [FutureOr<T> Function()? computation])",
          d: "Creates a future that completes after a delay.",
          p: [
            { label: "Duration duration", documentation: "The delay." },
            {
              label: "FutureOr<T> Function()? computation",
              documentation: "Computation after delay.",
            },
          ],
        },
      };

      let sig = sigs[fn];
      if (!sig) {
        const text = model.getValue();
        const fp = new RegExp(
          "(?:\\w+(?:<[^>]*>)?\\??\\s+)?" + fn + "\\s*\\(([^)]*)\\)",
          "m",
        );
        const fm = text.match(fp);
        if (fm) {
          const params = fm[1]
            .split(",")
            .map((p) => p.trim())
            .filter(Boolean);
          sig = {
            l: fm[0].trim(),
            d: "",
            p: params.map((p) => ({ label: p, documentation: "" })),
          };
        }
      }
      if (!sig) return null;

      return {
        value: {
          signatures: [
            { label: sig.l, documentation: sig.d, parameters: sig.p },
          ],
          activeSignature: 0,
          activeParameter: activeParam,
        },
        dispose() {},
      };
    },
  });

  // ===== 10. DOCUMENT SYMBOL PROVIDER =====
  monaco.languages.registerDocumentSymbolProvider("dart", {
    provideDocumentSymbols(model) {
      const syms = [];
      const SK = monaco.languages.SymbolKind;
      const lines = model.getLinesContent();
      const pats = [
        {
          r: /(?:abstract\s+)?(?:sealed\s+)?(?:base\s+)?class\s+(\w+)/,
          k: SK.Class,
        },
        { r: /mixin\s+(\w+)/, k: SK.Class },
        { r: /enum\s+(\w+)/, k: SK.Enum },
        { r: /extension\s+(\w+)/, k: SK.Class },
        { r: /typedef\s+(\w+)/, k: SK.Interface },
        {
          r: /(?:void|int|double|String|bool|num|Future|Stream|dynamic|List|Map|Set)\S*\s+(\w+)\s*\(/,
          k: SK.Function,
        },
        { r: /(?:get|set)\s+(\w+)/, k: SK.Property },
      ];
      lines.forEach((line, i) => {
        if (line.trim().startsWith("//")) return;
        pats.forEach((p) => {
          const m = line.match(p.r);
          if (m) {
            const c = line.indexOf(m[1]) + 1;
            syms.push({
              name: m[1],
              kind: p.k,
              range: new monaco.Range(i + 1, 1, i + 1, line.length + 1),
              selectionRange: new monaco.Range(
                i + 1,
                c,
                i + 1,
                c + m[1].length,
              ),
              detail: "",
              tags: [],
            });
          }
        });
      });
      return syms;
    },
  });

  // ===== 11. FOLDING RANGE PROVIDER =====
  monaco.languages.registerFoldingRangeProvider("dart", {
    provideFoldingRanges(model) {
      const ranges = [];
      const lines = model.getLinesContent();
      const braceStack = [];
      const commentStarts = [];

      lines.forEach((line, i) => {
        const t = line.trim();
        if (t.startsWith("/*") || t.startsWith("/**")) commentStarts.push(i);
        if (t.endsWith("*/") && commentStarts.length) {
          const s = commentStarts.pop();
          if (s !== i)
            ranges.push({
              start: s + 1,
              end: i + 1,
              kind: monaco.languages.FoldingRangeKind.Comment,
            });
        }
        for (const ch of line) {
          if (ch === "{") braceStack.push(i);
          else if (ch === "}" && braceStack.length) {
            const s = braceStack.pop();
            if (s !== i)
              ranges.push({
                start: s + 1,
                end: i + 1,
                kind: monaco.languages.FoldingRangeKind.Region,
              });
          }
        }
        if (
          t.startsWith("import ") &&
          (i === 0 || !lines[i - 1].trim().startsWith("import "))
        ) {
          let e = i;
          while (
            e + 1 < lines.length &&
            lines[e + 1].trim().startsWith("import ")
          )
            e++;
          if (e > i)
            ranges.push({
              start: i + 1,
              end: e + 1,
              kind: monaco.languages.FoldingRangeKind.Imports,
            });
        }
      });
      return ranges;
    },
  });
};
