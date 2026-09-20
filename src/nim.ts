import type * as Monaco from "monaco-editor";

export default (monaco: typeof Monaco) => {
  // ─── 1. REGISTER NIM LANGUAGE ────────────────────────────────────
  monaco.languages.register({
    id: "nim",
    extensions: [".nim", ".nims", ".nimble"],
    aliases: ["Nim", "nim"],
    mimetypes: ["text/x-nim"],
  });

  // ─── 2. MONARCH TOKENIZER (SYNTAX HIGHLIGHTING) ────────────────
  monaco.languages.setMonarchTokensProvider("nim", {
    defaultToken: "",
    ignoreCase: false,

    keywords: [
      "addr",
      "and",
      "as",
      "asm",
      "bind",
      "block",
      "break",
      "case",
      "cast",
      "concept",
      "const",
      "continue",
      "converter",
      "defer",
      "discard",
      "distinct",
      "div",
      "do",
      "elif",
      "else",
      "end",
      "enum",
      "except",
      "export",
      "finally",
      "for",
      "from",
      "func",
      "if",
      "import",
      "in",
      "include",
      "interface",
      "is",
      "isnot",
      "iterator",
      "let",
      "macro",
      "method",
      "mixin",
      "mod",
      "nil",
      "not",
      "notin",
      "object",
      "of",
      "or",
      "out",
      "proc",
      "ptr",
      "raise",
      "ref",
      "return",
      "shl",
      "shr",
      "static",
      "template",
      "try",
      "tuple",
      "type",
      "using",
      "var",
      "when",
      "while",
      "xor",
      "yield",
    ],

    builtinTypes: [
      "int",
      "int8",
      "int16",
      "int32",
      "int64",
      "uint",
      "uint8",
      "uint16",
      "uint32",
      "uint64",
      "float",
      "float32",
      "float64",
      "float128",
      "bool",
      "char",
      "string",
      "cstring",
      "pointer",
      "typedesc",
      "void",
      "auto",
      "any",
      "untyped",
      "typed",
      "owned",
      "seq",
      "array",
      "openArray",
      "varargs",
      "set",
      "HashSet",
      "Table",
      "OrderedTable",
      "CountTable",
      "ref",
      "ptr",
      "range",
      "Natural",
      "Positive",
      "Slice",
      "HSlice",
      "BiggestInt",
      "BiggestFloat",
      "byte",
      "cint",
      "clong",
      "cfloat",
      "cdouble",
      "csize_t",
    ],

    builtinFuncs: [
      "echo",
      "debugEcho",
      "assert",
      "doAssert",
      "len",
      "high",
      "low",
      "sizeof",
      "typeof",
      "repr",
      "add",
      "delete",
      "insert",
      "pop",
      "contains",
      "find",
      "pairs",
      "items",
      "mitems",
      "mpairs",
      "fields",
      "fieldPairs",
      "inc",
      "dec",
      "succ",
      "pred",
      "ord",
      "chr",
      "toInt",
      "toFloat",
      "toBool",
      "parseInt",
      "parseFloat",
      "parseBool",
      "split",
      "join",
      "strip",
      "replace",
      "contains",
      "startsWith",
      "endsWith",
      "toLowerAscii",
      "toUpperAscii",
      "repeat",
      "align",
      "indent",
      "dedent",
      "format",
      "intToStr",
      "formatFloat",
      "newSeq",
      "newString",
      "newStringOfCap",
      "setLen",
      "reset",
      "swap",
      "cmp",
      "max",
      "min",
      "clamp",
      "abs",
      "quit",
      "system",
      "os",
      "io",
      "strutils",
      "sequtils",
      "tables",
      "sets",
      "algorithm",
      "math",
      "random",
      "json",
      "times",
      "options",
      "asyncdispatch",
      "httpclient",
      "os",
      "osproc",
      "streams",
      "re",
      "nre",
      "pegs",
      "parseopt",
      "isNil",
      "deepCopy",
      "shallowCopy",
      "move",
      "wasMoved",
      "sink",
      "lent",
      "spawn",
      "parallel",
      "compiles",
      "declared",
      "defined",
      "gorge",
      "staticRead",
      "staticExec",
      "slurp",
      "readFile",
      "writeFile",
      "readLine",
      "writeLine",
      "open",
      "close",
      "readAll",
      "readLines",
      "write",
      "getLine",
      "getChar",
      "readChar",
      "peekChar",
      "endOfFile",
      "flushFile",
      "getFileSize",
      "getCurrentDir",
      "setCurrentDir",
      "existsFile",
      "existsDir",
      "removeFile",
      "removeDir",
      "createDir",
      "moveFile",
      "copyFile",
      "walkDir",
      "walkFiles",
      "walkDirRec",
      "sleep",
      "getTime",
      "epochTime",
      "cpuTime",
      "commandLineParams",
      "getEnv",
      "putEnv",
      "existsEnv",
      "paramCount",
      "paramStr",
      "execShellCmd",
      "newException",
      "getCurrentException",
      "getCurrentExceptionMsg",
      "newTable",
      "toTable",
      "hasKey",
      "getOrDefault",
      "toSeq",
      "map",
      "filter",
      "foldl",
      "foldr",
      "any",
      "all",
      "zip",
      "unzip",
      "sorted",
      "reversed",
      "deduplicate",
      "distribute",
      "count",
      "mapIt",
      "filterIt",
      "keepIf",
      "apply",
      "allIt",
      "anyIt",
      "toHashSet",
      "toOrderedSet",
      "isNone",
      "isSome",
      "get",
      "some",
      "none",
      "Option",
      "Result",
      "ok",
      "err",
    ],

    pragmas: [
      "push",
      "pop",
      "hint",
      "warning",
      "error",
      "fatal",
      "deprecated",
      "experimental",
      "used",
      "noSideEffect",
      "compileTime",
      "noReturn",
      "raises",
      "tags",
      "effects",
      "inline",
      "noinline",
      "closure",
      "nimcall",
      "cdecl",
      "stdcall",
      "safecall",
      "dynlib",
      "importc",
      "importcpp",
      "importobjc",
      "exportc",
      "extern",
      "bycopy",
      "byref",
      "varargs",
      "union",
      "packed",
      "unchecked",
      "pure",
      "dirty",
      "asmNoStackFrame",
      "header",
      "emit",
      "threadvar",
      "global",
      "guard",
      "locks",
      "gcSafe",
      "gcsafe",
      "inject",
      "gensym",
      "discardable",
      "noInit",
      "requiresInit",
      "final",
      "acyclic",
      "shallow",
      "inheritable",
      "borrow",
      "sideEffect",
      "base",
      "size",
      "align",
      "bitsize",
      "volatile",
      "register",
      "nodecl",
      "magic",
      "compile",
      "link",
      "passC",
      "passL",
      "localPassC",
      "used",
      "deadCodeElim",
      "boundChecks",
      "overflowChecks",
      "nanChecks",
      "infChecks",
      "assertions",
      "patterns",
      "optimization",
      "checks",
      "floatChecks",
      "booldefine",
      "intdefine",
      "strdefine",
    ],

    operators: [
      "=",
      "+",
      "-",
      "*",
      "/",
      "<",
      ">",
      "@",
      "&",
      "~",
      ".",
      "%",
      "|",
      "!",
      "?",
      "^",
      ":",
      "\\",
      "$",
      "#",
    ],

    symbols: /[=+\-*\/<>@&~.%|!?^:\\$#]+/,

    escapes:
      /\\(?:[abceflnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8}|[0-9]{1,3})/,

    tokenizer: {
      root: [
        // Doc comments
        [/##\[/, "comment.doc", "@docBlockComment"],
        [/##.*$/, "comment.doc"],
        // Block comments
        [/#\[/, "comment", "@blockComment"],
        // Line comments
        [/#(?!\[).*$/, "comment"],

        // Pragmas
        [/\{\.\s*/, "annotation", "@pragma"],

        // Strings
        [/"""/, "string", "@tripleString"],
        [/r"/, "string", "@rawString"],
        [/"/, "string", "@string"],

        // Characters
        [/'[^\\']'/, "string.char"],
        [/'/, "string.char", "@charLit"],

        // Numbers
        [
          /0[xX][0-9a-fA-F][0-9a-fA-F_]*('?[iIuUfF](8|16|32|64|128))?/,
          "number.hex",
        ],
        [/0[oO][0-7][0-7_]*('?[iIuUfF](8|16|32|64|128))?/, "number.octal"],
        [/0[bB][01][01_]*('?[iIuUfF](8|16|32|64|128))?/, "number.binary"],
        [
          /[0-9][0-9_]*\.[0-9][0-9_]*([eE][\-+]?[0-9][0-9_]*)?('?[fFdD](32|64|128))?/,
          "number.float",
        ],
        [
          /[0-9][0-9_]*([eE][\-+]?[0-9][0-9_]*)?('?[iIuUfF](8|16|32|64|128))?/,
          "number",
        ],

        // Identifiers & keywords
        [
          /[a-zA-Z_]\w*/,
          {
            cases: {
              true: "keyword.constant",
              false: "keyword.constant",
              nil: "keyword.constant",
              result: "variable.predefined",
              "@keywords": "keyword",
              "@builtinTypes": "type",
              "@builtinFuncs": "support.function",
              "@default": "identifier",
            },
          },
        ],

        // Operators
        [
          /@symbols/,
          {
            cases: {
              "@operators": "operator",
              "@default": "delimiter",
            },
          },
        ],

        // Delimiters
        [/[{}()\[\]]/, "delimiter.bracket"],
        [/[;,]/, "delimiter"],
      ],

      string: [
        [/[^\\"]+/, "string"],
        [/@escapes/, "string.escape"],
        [/\\./, "string.escape.invalid"],
        [/"/, "string", "@pop"],
      ],

      rawString: [
        [/[^"]+/, "string"],
        [/""/, "string"],
        [/"/, "string", "@pop"],
      ],

      tripleString: [
        [/[^"]+/, "string"],
        [/"""/, "string", "@pop"],
        [/"/, "string"],
      ],

      charLit: [
        [/@escapes/, "string.char"],
        [/[^'\\]/, "string.char"],
        [/'/, "string.char", "@pop"],
      ],

      blockComment: [
        [/#\[/, "comment", "@push"],
        [/\]#/, "comment", "@pop"],
        [/./, "comment"],
      ],

      docBlockComment: [
        [/##\[/, "comment.doc", "@push"],
        [/\]##/, "comment.doc", "@pop"],
        [/./, "comment.doc"],
      ],

      pragma: [
        [/\.\}/, "annotation", "@pop"],
        [
          /[a-zA-Z_]\w*/,
          {
            cases: {
              "@pragmas": "annotation.keyword",
              "@default": "annotation",
            },
          },
        ],
        [/[:,=]/, "annotation"],
        [/"[^"]*"/, "annotation.string"],
        [/\s+/, "annotation"],
        [/./, "annotation"],
      ],
    },
  });

  // ─── 3. LANGUAGE CONFIGURATION ──────────────────────────────────
  monaco.languages.setLanguageConfiguration("nim", {
    comments: {
      lineComment: "#",
      blockComment: ["#[", "]#"],
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
      { open: '"', close: '"', notIn: ["string"] },
      { open: "'", close: "'", notIn: ["string", "comment"] },
      { open: "`", close: "`" },
    ],
    surroundingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: '"', close: '"' },
      { open: "'", close: "'" },
      { open: "`", close: "`" },
    ],
    indentationRules: {
      increaseIndentPattern:
        /^\s*(proc|func|method|iterator|template|macro|converter|type|var|let|const|if|elif|else|when|case|of|for|while|block|try|except|finally|object|enum|tuple)\b.*(?::| =)\s*$/,
      decreaseIndentPattern: /^\s*(elif|else|except|finally|of)\b/,
    },
    onEnterRules: [
      {
        beforeText: /:\s*$/,
        action: { indentAction: monaco.languages.IndentAction.Indent },
      },
      {
        beforeText: /=\s*$/,
        action: { indentAction: monaco.languages.IndentAction.Indent },
      },
    ],
    folding: {
      offSide: true,
    },
    wordPattern:
      /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
  });

  // ─── 4. COMPLETION PROVIDER (AUTOCOMPLETE + SNIPPETS) ──────────
  const nimDocs = {
    // Keywords
    proc: {
      detail: "(keyword) Procedure declaration",
      doc: 'Declares a procedure. Procs can have side effects.\n\n```nim\nproc greet(name: string): string =\n  return "Hello, " & name\n```',
    },
    func: {
      detail: "(keyword) Function declaration",
      doc: "Declares a function (a proc with `{.noSideEffect.}`).\n\n```nim\nfunc add(a, b: int): int =\n  a + b\n```",
    },
    method: {
      detail: "(keyword) Method declaration",
      doc: 'Declares a method for dynamic dispatch.\n\n```nim\nmethod speak(a: Animal): string {.base.} =\n  "..."\n```',
    },
    template: {
      detail: "(keyword) Template declaration",
      doc: "Declares a template (hygienic macro via substitution).\n\n```nim\ntemplate `!=`(a, b: untyped): bool =\n  not (a == b)\n```",
    },
    macro: {
      detail: "(keyword) Macro declaration",
      doc: "Declares a macro for AST manipulation at compile time.\n\n```nim\nmacro myAssert(arg: untyped): untyped =\n  ...\n```",
    },
    iterator: {
      detail: "(keyword) Iterator declaration",
      doc: "Declares an iterator (inline or closure).\n\n```nim\niterator countUp(a, b: int): int =\n  var i = a\n  while i <= b:\n    yield i\n    inc i\n```",
    },
    type: {
      detail: "(keyword) Type section",
      doc: "Begins a type definition section.\n\n```nim\ntype\n  Person = object\n    name: string\n    age: int\n```",
    },
    var: {
      detail: "(keyword) Mutable variable",
      doc: "Declares a mutable variable.\n\n```nim\nvar x = 10\nx = 20  # OK\n```",
    },
    let: {
      detail: "(keyword) Immutable binding",
      doc: "Declares an immutable variable (single assignment).\n\n```nim\nlet x = 10\n# x = 20  ← compile error\n```",
    },
    const: {
      detail: "(keyword) Compile-time constant",
      doc: "Declares a compile-time constant.\n\n```nim\nconst Pi = 3.14159265\n```",
    },
    import: {
      detail: "(keyword) Module import",
      doc: "Imports symbols from a module.\n\n```nim\nimport std/strutils\nimport std/[os, times]\n```",
    },
    from: {
      detail: "(keyword) Selective import",
      doc: "Imports specific symbols from a module.\n\n```nim\nfrom std/strutils import toLowerAscii\n```",
    },
    include: {
      detail: "(keyword) File include",
      doc: 'Includes the contents of another file.\n\n```nim\ninclude "helpers.nim"\n```',
    },
    if: {
      detail: "(keyword) Conditional",
      doc: 'Conditional branch.\n\n```nim\nif x > 0:\n  echo "positive"\nelif x == 0:\n  echo "zero"\nelse:\n  echo "negative"\n```',
    },
    when: {
      detail: "(keyword) Compile-time conditional",
      doc: 'Compile-time conditional (like `#ifdef`).\n\n```nim\nwhen defined(windows):\n  echo "Windows"\nelse:\n  echo "Other OS"\n```',
    },
    case: {
      detail: "(keyword) Case statement",
      doc: 'Pattern matching on values.\n\n```nim\ncase fruit\nof "apple": echo "red"\nof "banana": echo "yellow"\nelse: echo "unknown"\n```',
    },
    for: {
      detail: "(keyword) For loop",
      doc: 'Iterates over an iterator.\n\n```nim\nfor i in 0..9:\n  echo i\n\nfor key, val in myTable:\n  echo key, ": ", val\n```',
    },
    while: {
      detail: "(keyword) While loop",
      doc: "Loops while condition is true.\n\n```nim\nwhile x > 0:\n  dec x\n```",
    },
    try: {
      detail: "(keyword) Exception handling",
      doc: 'Begin a try/except/finally block.\n\n```nim\ntry:\n  riskyOp()\nexcept IOError:\n  echo "IO error"\nfinally:\n  cleanup()\n```',
    },
    return: {
      detail: "(keyword) Return from proc",
      doc: "Returns a value from a procedure.\n\n```nim\nproc double(x: int): int =\n  return x * 2\n```",
    },
    yield: {
      detail: "(keyword) Yield from iterator",
      doc: "Yields a value from an iterator.\n\n```nim\niterator items(a: seq[int]): int =\n  for x in a: yield x\n```",
    },
    discard: {
      detail: "(keyword) Discard result",
      doc: "Discards the return value of a call.\n\n```nim\ndiscard someFunc()\n```",
    },
    defer: {
      detail: "(keyword) Defer statement",
      doc: 'Defers execution until scope exit.\n\n```nim\nlet f = open("file.txt")\ndefer: close(f)\n```',
    },
    block: {
      detail: "(keyword) Named block",
      doc: 'Creates a named or anonymous block.\n\n```nim\nblock myBlock:\n  if cond: break myBlock\n  echo "after condition"\n```',
    },
    object: {
      detail: "(keyword) Object type",
      doc: "Declares an object type.\n\n```nim\ntype Point = object\n  x, y: float\n```",
    },
    enum: {
      detail: "(keyword) Enumeration",
      doc: "Declares an enum type.\n\n```nim\ntype Color = enum\n  Red, Green, Blue\n```",
    },
    tuple: {
      detail: "(keyword) Tuple type",
      doc: "Declares a named or anonymous tuple.\n\n```nim\ntype Point = tuple[x, y: float]\nlet p: Point = (x: 1.0, y: 2.0)\n```",
    },
    ref: {
      detail: "(keyword) Reference type",
      doc: "Creates a garbage-collected reference.\n\n```nim\ntype Node = ref object\n  value: int\n  next: Node\n```",
    },
    ptr: {
      detail: "(keyword) Pointer type",
      doc: "Creates an untraced (unsafe) pointer.\n\n```nim\nvar x = 42\nlet p: ptr int = addr(x)\n```",
    },

    // Builtin functions
    echo: {
      detail: "(proc) echo(args: varargs[string, `$`])",
      doc: 'Writes and flushes the args to stdout, followed by a newline.\n\n```nim\necho "Hello, ", name, "!"\necho 42\n```',
    },
    len: {
      detail: "(proc) len[T](x: T): int",
      doc: 'Returns the length of a container: string, seq, array, etc.\n\n```nim\nlet s = "hello"\necho len(s)  # 5\n```',
    },
    add: {
      detail: "(proc) add[T](x: var seq[T], y: T)",
      doc: "Appends an element to a seq or string.\n\n```nim\nvar s: seq[int]\ns.add(1)\ns.add(2)\n```",
    },
    high: {
      detail: "(proc) high[T](x: T): int",
      doc: "Returns the highest valid index of an array/seq/string.\n\n```nim\nlet a = [10, 20, 30]\necho high(a)  # 2\n```",
    },
    low: {
      detail: "(proc) low[T](x: T): int",
      doc: "Returns the lowest valid index of an array/seq/string.",
    },
    sizeof: {
      detail: "(proc) sizeof(T): int",
      doc: "Returns the size in bytes of a type or value.",
    },
    newSeq: {
      detail: "(proc) newSeq[T](s: var seq[T], len: int)",
      doc: "Creates a new sequence of the given length.\n\n```nim\nvar s: seq[int]\nnewSeq(s, 10)\n```",
    },
    assert: {
      detail: '(template) assert(cond: bool, msg = "")',
      doc: 'Asserts that `cond` is true, raises AssertionDefect otherwise.\n\n```nim\nassert x > 0, "x must be positive"\n```',
    },
    inc: {
      detail: "(proc) inc(x: var int, y = 1)",
      doc: "Increments `x` by `y` (default 1).\n\n```nim\nvar i = 0\ninc i      # i == 1\ninc i, 5   # i == 6\n```",
    },
    dec: {
      detail: "(proc) dec(x: var int, y = 1)",
      doc: "Decrements `x` by `y` (default 1).",
    },
    ord: {
      detail: "(proc) ord(x: T): int",
      doc: "Returns the ordinal value of an enum or char.\n\n```nim\necho ord('A')  # 65\n```",
    },
    chr: {
      detail: "(proc) chr(x: int): char",
      doc: "Returns the character for the given ASCII code.\n\n```nim\necho chr(65)  # A\n```",
    },
    repr: {
      detail: "(proc) repr(x: T): string",
      doc: "Returns a string representation useful for debugging.",
    },
    parseInt: {
      detail: "(proc) parseInt(s: string): int",
      doc: 'Parses a string as an integer. Raises ValueError on failure.\n\n```nim\nlet n = parseInt("42")\n```',
    },
    parseFloat: {
      detail: "(proc) parseFloat(s: string): float",
      doc: "Parses a string as a float.",
    },
    split: {
      detail: "(proc) split(s: string, sep: char|string): seq[string]",
      doc: "Splits a string by the separator.\n\n```nim\nimport std/strutils\nlet parts = \"a,b,c\".split(',')\n```",
    },
    join: {
      detail: '(proc) join(a: openArray[string], sep = ""): string',
      doc: 'Joins strings with a separator.\n\n```nim\nlet s = @["a","b","c"].join(", ")\n```',
    },
    strip: {
      detail: "(proc) strip(s: string): string",
      doc: "Strips leading/trailing whitespace.",
    },
    replace: {
      detail: "(proc) replace(s, sub, by: string): string",
      doc: "Replaces all occurrences of `sub` with `by`.",
    },
    contains: {
      detail: "(proc) contains(s, sub: string): bool",
      doc: "Returns true if `s` contains `sub`. Also usable with `in` operator.",
    },
    startsWith: {
      detail: "(proc) startsWith(s, prefix: string): bool",
      doc: "Checks if a string starts with the given prefix.",
    },
    endsWith: {
      detail: "(proc) endsWith(s, suffix: string): bool",
      doc: "Checks if a string ends with the given suffix.",
    },
    toSeq: {
      detail: "(template) toSeq(iter): seq[T]",
      doc: "Converts any iterator to a seq.\n\n```nim\nimport std/sequtils\nlet s = toSeq(1..10)\n```",
    },
    map: {
      detail: "(proc) map[T,U](s: openArray[T], op: proc(x:T):U): seq[U]",
      doc: "Applies `op` to each element and returns results.\n\n```nim\nlet doubled = @[1,2,3].map(proc(x:int):int = x*2)\n```",
    },
    filter: {
      detail: "(proc) filter[T](s: openArray[T], pred: proc(x:T):bool): seq[T]",
      doc: "Returns elements for which `pred` is true.",
    },
    sorted: {
      detail: "(proc) sorted[T](a: openArray[T]): seq[T]",
      doc: "Returns a sorted copy of the sequence.",
    },
    readFile: {
      detail: "(proc) readFile(filename: string): string",
      doc: "Reads an entire file into a string.",
    },
    writeFile: {
      detail: "(proc) writeFile(filename, content: string)",
      doc: "Writes `content` to a file, overwriting it.",
    },
    newTable: {
      detail: "(proc) newTable[K,V](): TableRef[K,V]",
      doc: "Creates a new table reference.",
    },
    some: {
      detail: "(proc) some[T](val: T): Option[T]",
      doc: "Wraps a value in an Option.\n\n```nim\nimport std/options\nlet x = some(42)\n```",
    },
    none: {
      detail: "(proc) none(T: typedesc): Option[T]",
      doc: "Returns an empty Option.\n\n```nim\nlet x = none(int)\n```",
    },

    // Types
    int: {
      detail: "(type) int",
      doc: "Default signed integer type (platform word size).",
    },
    int8: { detail: "(type) int8", doc: "Signed 8-bit integer (-128..127)." },
    int16: { detail: "(type) int16", doc: "Signed 16-bit integer." },
    int32: { detail: "(type) int32", doc: "Signed 32-bit integer." },
    int64: { detail: "(type) int64", doc: "Signed 64-bit integer." },
    uint: { detail: "(type) uint", doc: "Default unsigned integer type." },
    float: {
      detail: "(type) float",
      doc: "Default floating point type (float64).",
    },
    float32: {
      detail: "(type) float32",
      doc: "32-bit floating point (single precision).",
    },
    float64: {
      detail: "(type) float64",
      doc: "64-bit floating point (double precision).",
    },
    bool: { detail: "(type) bool", doc: "Boolean type: `true` or `false`." },
    char: { detail: "(type) char", doc: "A single ASCII character." },
    string: {
      detail: "(type) string",
      doc: "Nim string type (mutable, GC-managed, UTF-8).",
    },
    cstring: {
      detail: "(type) cstring",
      doc: "Compatible C string (pointer to char).",
    },
    seq: {
      detail: "(type) seq[T]",
      doc: "Dynamic array / growable sequence type.\n\n```nim\nvar s: seq[int] = @[1, 2, 3]\ns.add(4)\n```",
    },
    array: {
      detail: "(type) array[N, T]",
      doc: "Fixed-size array.\n\n```nim\nvar a: array[3, int] = [1, 2, 3]\n```",
    },
    Table: {
      detail: "(type) Table[K, V]",
      doc: 'Hash table (value type).\n\n```nim\nimport std/tables\nvar t = initTable[string, int]()\nt["x"] = 1\n```',
    },
    Option: {
      detail: "(type) Option[T]",
      doc: "Optional value type from `std/options`.\n\n```nim\nimport std/options\nlet x = some(42)\nif x.isSome: echo x.get\n```",
    },
    void: { detail: "(type) void", doc: "Denotes absence of a return type." },
    auto: { detail: "(type) auto", doc: "Compiler-inferred type." },
    openArray: {
      detail: "(type) openArray[T]",
      doc: "Open array parameter type – accepts arrays and seqs.",
    },
  };

  // Snippets
  const snippets = [
    {
      label: "proc",
      insertText:
        "proc ${1:name}(${2:params}): ${3:returnType} =\n  ${0:discard}",
      doc: "Procedure declaration",
    },
    {
      label: "func",
      insertText:
        "func ${1:name}(${2:params}): ${3:returnType} =\n  ${0:discard}",
      doc: "Pure function declaration",
    },
    {
      label: "method",
      insertText:
        "method ${1:name}(${2:self: MyType}): ${3:returnType} {.base.} =\n  ${0:discard}",
      doc: "Method declaration (dynamic dispatch)",
    },
    {
      label: "template",
      insertText:
        "template ${1:name}(${2:params}): ${3:untyped} =\n  ${0:discard}",
      doc: "Template declaration",
    },
    {
      label: "macro",
      insertText: "macro ${1:name}(${2:params}): untyped =\n  ${0:discard}",
      doc: "Macro declaration",
    },
    {
      label: "iterator",
      insertText: "iterator ${1:name}(${2:params}): ${3:T} =\n  ${0:yield}",
      doc: "Iterator declaration",
    },
    {
      label: "ifelse",
      insertText: "if ${1:cond}:\n  ${2:discard}\nelse:\n  ${0:discard}",
      doc: "If-else block",
    },
    {
      label: "ifelif",
      insertText:
        "if ${1:cond1}:\n  ${2:discard}\nelif ${3:cond2}:\n  ${4:discard}\nelse:\n  ${0:discard}",
      doc: "If-elif-else block",
    },
    {
      label: "case",
      insertText:
        "case ${1:expr}\nof ${2:value1}:\n  ${3:discard}\nof ${4:value2}:\n  ${5:discard}\nelse:\n  ${0:discard}",
      doc: "Case statement",
    },
    {
      label: "forloop",
      insertText: "for ${1:i} in ${2:0..9}:\n  ${0:echo i}",
      doc: "For loop with range",
    },
    {
      label: "foritems",
      insertText: "for ${1:item} in ${2:collection}:\n  ${0:echo item}",
      doc: "For loop over items",
    },
    {
      label: "forpairs",
      insertText:
        'for ${1:key}, ${2:val} in ${3:collection}:\n  ${0:echo key, ": ", val}',
      doc: "For loop over pairs",
    },
    {
      label: "while",
      insertText: "while ${1:true}:\n  ${0:discard}",
      doc: "While loop",
    },
    {
      label: "tryexcept",
      insertText:
        "try:\n  ${1:discard}\nexcept ${2:Exception} as e:\n  ${3:echo e.msg}\nfinally:\n  ${0:discard}",
      doc: "Try/except/finally block",
    },
    {
      label: "typeobj",
      insertText: "type\n  ${1:MyType} = object\n    ${0:field: int}",
      doc: "Object type definition",
    },
    {
      label: "typeref",
      insertText: "type\n  ${1:MyType} = ref object\n    ${0:field: int}",
      doc: "Ref object type definition",
    },
    {
      label: "typeenum",
      insertText: "type\n  ${1:MyEnum} = enum\n    ${0:Value1, Value2, Value3}",
      doc: "Enum type definition",
    },
    {
      label: "typetuple",
      insertText:
        "type\n  ${1:MyTuple} = tuple\n    ${2:x}: ${3:int}\n    ${0:y}: ${4:int}",
      doc: "Named tuple type",
    },
    {
      label: "typedist",
      insertText: "type ${1:MyType} = distinct ${0:int}",
      doc: "Distinct type definition",
    },
    {
      label: "block",
      insertText: "block ${1:name}:\n  ${0:discard}",
      doc: "Named block",
    },
    {
      label: "defer",
      insertText: "defer: ${0:cleanup()}",
      doc: "Defer statement",
    },
    {
      label: "whenDef",
      insertText:
        "when defined(${1:windows}):\n  ${2:discard}\nelse:\n  ${0:discard}",
      doc: "Compile-time `when defined()` check",
    },
    {
      label: "import",
      insertText: "import std/${0:module}",
      doc: "Import standard library module",
    },
    {
      label: "importFrom",
      insertText: "from std/${1:module} import ${0:symbol}",
      doc: "Selective import",
    },
    {
      label: "converter",
      insertText:
        "converter ${1:name}(x: ${2:Source}): ${3:Dest} =\n  ${0:discard}",
      doc: "Converter declaration",
    },
    {
      label: "main",
      insertText: 'when isMainModule:\n  ${0:echo "Hello, Nim!"}',
      doc: "Main module guard",
    },
    {
      label: "test",
      insertText:
        'import std/unittest\n\nsuite "${1:MySuite}":\n  test "${2:my test}":\n    ${0:check 1 + 1 == 2}',
      doc: "Unit test suite",
    },
    { label: "pragmaInline", insertText: "{.inline.}", doc: "Inline pragma" },
    {
      label: "pragmaExportc",
      insertText: "{.exportc.}",
      doc: "Export to C pragma",
    },
  ];

  monaco.languages.registerCompletionItemProvider("nim", {
    triggerCharacters: [".", "/", " "],
    provideCompletionItems: function (model, position) {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };

      const suggestions = [];

      // Snippets (highest priority)
      for (const s of snippets) {
        suggestions.push({
          label: s.label,
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: s.insertText,
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: { value: s.doc },
          detail: "Snippet",
          range: range,
          sortText: "0_" + s.label,
        });
      }

      // Keywords
      const keywords = [
        "addr",
        "and",
        "as",
        "asm",
        "bind",
        "block",
        "break",
        "case",
        "cast",
        "concept",
        "const",
        "continue",
        "converter",
        "defer",
        "discard",
        "distinct",
        "div",
        "do",
        "elif",
        "else",
        "end",
        "enum",
        "except",
        "export",
        "finally",
        "for",
        "from",
        "func",
        "if",
        "import",
        "in",
        "include",
        "interface",
        "is",
        "isnot",
        "iterator",
        "let",
        "macro",
        "method",
        "mixin",
        "mod",
        "nil",
        "not",
        "notin",
        "object",
        "of",
        "or",
        "out",
        "proc",
        "ptr",
        "raise",
        "ref",
        "return",
        "shl",
        "shr",
        "static",
        "template",
        "try",
        "tuple",
        "type",
        "using",
        "var",
        "when",
        "while",
        "xor",
        "yield",
      ];
      for (const kw of keywords) {
        const info = nimDocs[kw];
        suggestions.push({
          label: kw,
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: kw,
          detail: info ? info.detail : "keyword",
          documentation: info ? { value: info.doc } : undefined,
          range: range,
          sortText: "1_" + kw,
        });
      }

      // Builtin types
      const types = [
        "int",
        "int8",
        "int16",
        "int32",
        "int64",
        "uint",
        "uint8",
        "uint16",
        "uint32",
        "uint64",
        "float",
        "float32",
        "float64",
        "bool",
        "char",
        "string",
        "cstring",
        "pointer",
        "void",
        "auto",
        "any",
        "untyped",
        "typed",
        "seq",
        "array",
        "openArray",
        "varargs",
        "set",
        "HashSet",
        "Table",
        "OrderedTable",
        "CountTable",
        "Option",
        "Natural",
        "Positive",
        "byte",
      ];
      for (const t of types) {
        const info = nimDocs[t];
        suggestions.push({
          label: t,
          kind: monaco.languages.CompletionItemKind.Class,
          insertText: t,
          detail: info ? info.detail : "(type) " + t,
          documentation: info ? { value: info.doc } : undefined,
          range: range,
          sortText: "2_" + t,
        });
      }

      // Builtin functions
      const funcs = [
        "echo",
        "debugEcho",
        "assert",
        "doAssert",
        "len",
        "high",
        "low",
        "sizeof",
        "typeof",
        "repr",
        "add",
        "delete",
        "insert",
        "pop",
        "contains",
        "find",
        "pairs",
        "items",
        "inc",
        "dec",
        "succ",
        "pred",
        "ord",
        "chr",
        "parseInt",
        "parseFloat",
        "parseBool",
        "split",
        "join",
        "strip",
        "replace",
        "startsWith",
        "endsWith",
        "toLowerAscii",
        "toUpperAscii",
        "repeat",
        "align",
        "indent",
        "newSeq",
        "newString",
        "setLen",
        "swap",
        "cmp",
        "max",
        "min",
        "clamp",
        "abs",
        "quit",
        "toSeq",
        "map",
        "filter",
        "foldl",
        "foldr",
        "any",
        "all",
        "zip",
        "sorted",
        "reversed",
        "deduplicate",
        "count",
        "mapIt",
        "filterIt",
        "keepIf",
        "apply",
        "readFile",
        "writeFile",
        "readLine",
        "writeLine",
        "open",
        "close",
        "readAll",
        "getCurrentDir",
        "setCurrentDir",
        "existsFile",
        "existsDir",
        "removeFile",
        "createDir",
        "moveFile",
        "copyFile",
        "walkDir",
        "walkFiles",
        "sleep",
        "getTime",
        "epochTime",
        "cpuTime",
        "commandLineParams",
        "getEnv",
        "putEnv",
        "newTable",
        "toTable",
        "hasKey",
        "getOrDefault",
        "some",
        "none",
        "isNone",
        "isSome",
        "get",
        "newException",
        "getCurrentException",
        "getCurrentExceptionMsg",
      ];
      for (const f of funcs) {
        const info = nimDocs[f];
        suggestions.push({
          label: f,
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: f,
          detail: info ? info.detail : "(proc) " + f,
          documentation: info ? { value: info.doc } : undefined,
          range: range,
          sortText: "3_" + f,
        });
      }

      // Std library modules
      const modules = [
        "strutils",
        "sequtils",
        "tables",
        "sets",
        "algorithm",
        "math",
        "random",
        "json",
        "times",
        "options",
        "os",
        "osproc",
        "streams",
        "re",
        "nre",
        "pegs",
        "parseopt",
        "strformat",
        "sugar",
        "unittest",
        "macros",
        "typetraits",
        "enumerate",
        "threadpool",
        "asyncdispatch",
        "asynchttpserver",
        "httpclient",
        "net",
        "uri",
        "cgi",
        "cookies",
        "mimetypes",
        "htmlparser",
        "xmlparser",
        "xmltree",
        "parsecfg",
        "parsecsv",
        "parsesql",
        "logging",
        "terminal",
        "colors",
        "complex",
        "rationals",
        "stats",
        "fenv",
        "bitops",
        "hashes",
        "base64",
        "encodings",
        "md5",
        "sha1",
        "marshal",
        "memfiles",
        "posix",
        "winlean",
        "distros",
        "dynlib",
        "browsers",
      ];
      for (const m of modules) {
        suggestions.push({
          label: m,
          kind: monaco.languages.CompletionItemKind.Module,
          insertText: m,
          detail: "(module) std/" + m,
          documentation: { value: "Standard library module `std/" + m + "`." },
          range: range,
          sortText: "4_" + m,
        });
      }

      // Common pragmas as suggestions
      const pragmaList = [
        "inline",
        "noinline",
        "noSideEffect",
        "closure",
        "cdecl",
        "dynlib",
        "importc",
        "exportc",
        "header",
        "emit",
        "deprecated",
        "used",
        "discardable",
        "raises",
        "tags",
        "gcSafe",
        "threadvar",
        "pure",
        "inheritable",
        "base",
        "compileTime",
        "experimental",
        "push",
        "pop",
      ];
      for (const p of pragmaList) {
        suggestions.push({
          label: p,
          kind: monaco.languages.CompletionItemKind.Property,
          insertText: p,
          detail: "(pragma) {." + p + ".}",
          range: range,
          sortText: "5_" + p,
        });
      }

      return { suggestions };
    },
  });

  // ─── 5. HOVER PROVIDER ─────────────────────────────────────────
  monaco.languages.registerHoverProvider("nim", {
    provideHover: function (model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return null;
      const token = word.word;

      const info = nimDocs[token];
      if (info) {
        return {
          range: new monaco.Range(
            position.lineNumber,
            word.startColumn,
            position.lineNumber,
            word.endColumn,
          ),
          contents: [{ value: "**" + info.detail + "**" }, { value: info.doc }],
        };
      }

      // Show type info for common literals
      const lineContent = model.getLineContent(position.lineNumber);
      const charBefore = lineContent.substring(
        word.startColumn - 2,
        word.startColumn - 1,
      );

      // Check for user-defined procs in the file
      const allText = model.getValue();
      const procRegex = new RegExp(
        "(?:proc|func|method|iterator|template|macro|converter)\\s+" +
          escapeRegex(token) +
          "\\s*(?:\\*\\s*)?\\(([^)]*)\\)(?:\\s*:\\s*(\\w+))?",
        "m",
      );
      const procMatch = allText.match(procRegex);
      if (procMatch) {
        const params = procMatch[1] || "";
        const retType = procMatch[2] || "void";
        return {
          range: new monaco.Range(
            position.lineNumber,
            word.startColumn,
            position.lineNumber,
            word.endColumn,
          ),
          contents: [
            { value: "**" + token + "(" + params + "): " + retType + "**" },
            { value: "Defined in this file." },
          ],
        };
      }

      // Check for type definitions
      const typeRegex = new RegExp(
        "^\\s*" +
          escapeRegex(token) +
          "\\s*(?:\\*\\s*)?=\\s*(ref\\s+)?(?:object|enum|tuple|distinct|concept)",
        "m",
      );
      const typeMatch = allText.match(typeRegex);
      if (typeMatch) {
        const kind = typeMatch[0].includes("object")
          ? "object"
          : typeMatch[0].includes("enum")
            ? "enum"
            : typeMatch[0].includes("tuple")
              ? "tuple"
              : typeMatch[0].includes("distinct")
                ? "distinct"
                : "type";
        return {
          range: new monaco.Range(
            position.lineNumber,
            word.startColumn,
            position.lineNumber,
            word.endColumn,
          ),
          contents: [
            {
              value:
                "**(type) " +
                token +
                " = " +
                (typeMatch[1] || "") +
                kind +
                "**",
            },
            { value: "Defined in this file." },
          ],
        };
      }

      // Check for var/let/const
      const varRegex = new RegExp(
        "(?:var|let|const)\\s+" +
          escapeRegex(token) +
          "(?:\\s*:\\s*(\\w+))?\\s*=",
        "m",
      );
      const varMatch = allText.match(varRegex);
      if (varMatch) {
        const declType = varMatch[1] || "auto";
        const keyword = allText.match(
          new RegExp("(var|let|const)\\s+" + escapeRegex(token)),
        )[1];
        return {
          range: new monaco.Range(
            position.lineNumber,
            word.startColumn,
            position.lineNumber,
            word.endColumn,
          ),
          contents: [
            { value: "**(" + keyword + ") " + token + ": " + declType + "**" },
            { value: "Defined in this file." },
          ],
        };
      }

      return null;
    },
  });

  function escapeRegex(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  // ─── 6. DEFINITION PROVIDER (GO TO DEFINITION) ─────────────────
  // ─── Binding resolution (shared by the definition and rename providers) ───
  // Resolves the name under the cursor to its block-local binding: every
  // occurrence bound to it, plus the occurrence that declares it. Names with no
  // block-local binding (fields, globals) report `local: false` so callers can
  // keep their document-wide behaviour.
  const resolveBinding = (
    model: Monaco.editor.ITextModel,
    position: Monaco.Position,
  ) => {
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

    // Nim blocks are indentation based: a line whose next line is indented
    // further heads a block that runs until the indentation drops back. The
    // block starts on the body's first line, so a top-level declaration stays at
    // document level.
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
    const blank = (i: number) =>
      lines[i] === undefined || lines[i].trim() === "";
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
    // The body that opens at or after `offset` (a routine's parameters).
    const nextScope = (offset: number) => {
      let found: Scope | undefined;
      for (const scope of scopes) {
        if (scope.start >= offset && (!found || scope.start < found.start))
          found = scope;
      }
      return found;
    };

    // Local declarations: let/var/const, routine and type names, for-loop
    // variables and parameters.
    const declaration = new RegExp(
      "\\b(?:let|var|const)\\s+" +
        escapeRegex(name) +
        "\\b|\\b(?:proc|func|method|iterator|template|macro|converter|type)\\s+" +
        escapeRegex(name) +
        "\\b|\\bfor\\s+" +
        escapeRegex(name) +
        "\\b|(?:[(,]\\s*)" +
        escapeRegex(name) +
        "\\s*:",
      "g",
    );
    const declarations: { start: number; end: number; scope?: Scope }[] = [];
    for (let i = 0; i < lines.length; i++) {
      declaration.lastIndex = 0;
      let m;
      while ((m = declaration.exec(lines[i])) !== null) {
        // A name in a parameter list binds to the body that follows it, not to
        // the scope the signature text sits in.
        if (/^[(,]/.test(m[0])) {
          const owner = nextScope(at(i, m.index));
          if (!owner) continue;
          owner.names.add(name);
          declarations.push({
            start: at(i, m.index),
            end: at(i, m.index) + m[0].length,
            scope: owner,
          });
          continue;
        }
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

    const cursorLine = position.lineNumber - 1;
    const cursor = resolve(
      at(cursorLine, word.startColumn - 1),
      at(cursorLine, word.endColumn - 1),
    );
    const targetStart = cursor ? cursor.start : -1;
    const decl =
      targetStart === -1
        ? undefined
        : declarations.find((d) => d.scope && d.scope.start === targetStart);

    // Every occurrence bound to the same binding, and the one declaring it.
    type Occurrence = { line: number; startColumn: number; endColumn: number };
    const occurrences: Occurrence[] = [];
    let declarationRange: Occurrence | null = null;
    const occurrence = new RegExp("\\b" + escapeRegex(name) + "\\b", "g");
    for (let i = 0; i < lines.length; i++) {
      occurrence.lastIndex = 0;
      let m;
      while ((m = occurrence.exec(lines[i])) !== null) {
        const start = at(i, m.index);
        const end = start + name.length;
        const scope = resolve(start, end);
        if ((scope ? scope.start : -1) !== targetStart) continue;
        if (targetStart !== -1) {
          const before = lines[i].slice(0, m.index).replace(/\s+$/, "");
          if (before.endsWith(".")) continue;
        }
        const range: Occurrence = {
          line: i + 1,
          startColumn: m.index + 1,
          endColumn: m.index + 1 + name.length,
        };
        occurrences.push(range);
        if (decl && decl.start <= start && end <= decl.end)
          declarationRange = range;
      }
    }

    return {
      name,
      local: targetStart !== -1,
      declaration: declarationRange,
      occurrences,
    };
  };

  monaco.languages.registerDefinitionProvider("nim", {
    provideDefinition: function (model, position) {
      // A block-local resolves to its own declaration, not the first match.
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
      const token = word.word;
      const allText = model.getValue();
      const lines = allText.split("\n");

      // Search patterns for definitions
      const patterns = [
        new RegExp(
          "^\\s*(?:proc|func|method|iterator|template|macro|converter)\\s+" +
            escapeRegex(token) +
            "\\s*(?:\\*\\s*)?[\\(\\[]",
        ),
        new RegExp(
          "^\\s*(?:proc|func|method|iterator|template|macro|converter)\\s+" +
            escapeRegex(token) +
            "\\s*(?:\\*\\s*)?=",
        ),
        new RegExp(
          "^\\s*" +
            escapeRegex(token) +
            "\\s*(?:\\*\\s*)?\\s*=\\s*(?:ref\\s+)?(?:object|enum|tuple|distinct|concept)",
        ),
        new RegExp("^\\s*(?:var|let|const)\\s+" + escapeRegex(token) + "\\b"),
        new RegExp("^\\s*" + escapeRegex(token) + "\\s*(?:\\*\\s*)?\\s*:\\s*"),
        new RegExp("^\\s*type\\s*$"),
      ];

      // Find the best match
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        for (let p = 0; p < patterns.length - 1; p++) {
          if (patterns[p].test(line)) {
            const col = line.indexOf(token);
            return {
              uri: model.uri,
              range: new monaco.Range(
                i + 1,
                col + 1,
                i + 1,
                col + 1 + token.length,
              ),
            };
          }
        }
      }

      // Search in type sections
      let inTypeSection = false;
      for (let i = 0; i < lines.length; i++) {
        if (/^\s*type\s*$/.test(lines[i]) || /^\s*type\s/.test(lines[i])) {
          inTypeSection = true;
          continue;
        }
        if (inTypeSection) {
          if (
            /^\S/.test(lines[i]) &&
            !/^\s/.test(lines[i]) &&
            lines[i].trim() !== ""
          ) {
            inTypeSection = false;
          }
          const typeDefRegex = new RegExp(
            "^\\s+" + escapeRegex(token) + "\\s*(?:\\*\\s*)?\\s*=",
          );
          if (typeDefRegex.test(lines[i])) {
            const col = lines[i].indexOf(token);
            return {
              uri: model.uri,
              range: new monaco.Range(
                i + 1,
                col + 1,
                i + 1,
                col + 1 + token.length,
              ),
            };
          }
        }
      }

      return null;
    },
  });

  // ─── 7. SIGNATURE HELP PROVIDER ────────────────────────────────
  monaco.languages.registerSignatureHelpProvider("nim", {
    signatureHelpTriggerCharacters: ["(", ","],
    provideSignatureHelp: function (model, position) {
      const textUntilPosition = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });

      // Find the function name before the opening paren
      const match = textUntilPosition.match(/(\w+)\s*\([^)]*$/);
      if (!match) return null;
      const funcName = match[1];

      const sigs = {
        echo: {
          label: "echo(args: varargs[string, `$`])",
          doc: "Writes args to stdout.",
          params: [
            {
              label: "args: varargs[string, `$`]",
              doc: "Values to print (auto-stringified via `$`)",
            },
          ],
        },
        len: {
          label: "len(x: string|seq|array): int",
          doc: "Returns the length.",
          params: [
            { label: "x: string|seq|array", doc: "Container to measure" },
          ],
        },
        add: {
          label: "add(x: var seq[T], y: T)",
          doc: "Appends y to x.",
          params: [
            { label: "x: var seq[T]", doc: "Target sequence" },
            { label: "y: T", doc: "Element to append" },
          ],
        },
        inc: {
          label: "inc(x: var int, y: int = 1)",
          doc: "Increments x by y.",
          params: [
            { label: "x: var int", doc: "Variable to increment" },
            { label: "y: int = 1", doc: "Amount (default 1)" },
          ],
        },
        dec: {
          label: "dec(x: var int, y: int = 1)",
          doc: "Decrements x by y.",
          params: [
            { label: "x: var int", doc: "Variable to decrement" },
            { label: "y: int = 1", doc: "Amount (default 1)" },
          ],
        },
        newSeq: {
          label: "newSeq(s: var seq[T], len: Natural)",
          doc: "Creates a new seq.",
          params: [
            { label: "s: var seq[T]", doc: "Sequence variable" },
            { label: "len: Natural", doc: "Initial length" },
          ],
        },
        parseInt: {
          label: "parseInt(s: string): int",
          doc: "Parses string as integer.",
          params: [{ label: "s: string", doc: "String to parse" }],
        },
        parseFloat: {
          label: "parseFloat(s: string): float",
          doc: "Parses string as float.",
          params: [{ label: "s: string", doc: "String to parse" }],
        },
        split: {
          label: "split(s: string, sep: char|string): seq[string]",
          doc: "Splits string.",
          params: [
            { label: "s: string", doc: "String to split" },
            { label: "sep: char|string", doc: "Separator" },
          ],
        },
        join: {
          label: 'join(a: openArray[string], sep: string = ""): string',
          doc: "Joins strings.",
          params: [
            { label: "a: openArray[string]", doc: "Strings to join" },
            { label: 'sep: string = ""', doc: "Separator" },
          ],
        },
        max: {
          label: "max(x, y: int|float): int|float",
          doc: "Returns the maximum.",
          params: [
            { label: "x: T", doc: "First value" },
            { label: "y: T", doc: "Second value" },
          ],
        },
        min: {
          label: "min(x, y: int|float): int|float",
          doc: "Returns the minimum.",
          params: [
            { label: "x: T", doc: "First value" },
            { label: "y: T", doc: "Second value" },
          ],
        },
        open: {
          label:
            "open(f: var File, filename: string, mode: FileMode = fmRead): bool",
          doc: "Opens a file.",
          params: [
            { label: "f: var File", doc: "File variable" },
            { label: "filename: string", doc: "Path" },
            { label: "mode: FileMode = fmRead", doc: "File mode" },
          ],
        },
        assert: {
          label: 'assert(cond: bool, msg: string = "")',
          doc: "Asserts condition.",
          params: [
            { label: "cond: bool", doc: "Condition to check" },
            { label: 'msg: string = ""', doc: "Error message" },
          ],
        },
        map: {
          label: "map[T, U](s: openArray[T], op: proc(x: T): U): seq[U]",
          doc: "Maps a function over items.",
          params: [
            { label: "s: openArray[T]", doc: "Input sequence" },
            { label: "op: proc(x: T): U", doc: "Mapping function" },
          ],
        },
        filter: {
          label: "filter[T](s: openArray[T], pred: proc(x: T): bool): seq[T]",
          doc: "Filters items by predicate.",
          params: [
            { label: "s: openArray[T]", doc: "Input sequence" },
            { label: "pred: proc(x: T): bool", doc: "Predicate function" },
          ],
        },
      };

      const sigInfo = sigs[funcName];
      if (!sigInfo) return null;

      // Count commas to determine active parameter
      const afterParen = textUntilPosition.substring(
        textUntilPosition.lastIndexOf("(") + 1,
      );
      let depth = 0,
        commaCount = 0;
      for (const ch of afterParen) {
        if (ch === "(") depth++;
        else if (ch === ")") depth--;
        else if (ch === "," && depth === 0) commaCount++;
      }

      return {
        value: {
          signatures: [
            {
              label: sigInfo.label,
              documentation: { value: sigInfo.doc },
              parameters: sigInfo.params.map((p) => ({
                label: p.label,
                documentation: { value: p.doc },
              })),
            },
          ],
          activeSignature: 0,
          activeParameter: Math.min(commaCount, sigInfo.params.length - 1),
        },
        dispose: () => {},
      };
    },
  });

  // ─── 8. DOCUMENT SYMBOL PROVIDER (Outline) ─────────────────────
  monaco.languages.registerDocumentSymbolProvider("nim", {
    provideDocumentSymbols: function (model) {
      const symbols = [];
      const lines = model.getLinesContent();

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        let match;

        // Procs / funcs / methods etc.
        match = line.match(
          /^\s*(proc|func|method|iterator|template|macro|converter)\s+(\w+\`?[^(]*`?)/,
        );
        if (match) {
          const kindMap = {
            proc: monaco.languages.SymbolKind.Function,
            func: monaco.languages.SymbolKind.Function,
            method: monaco.languages.SymbolKind.Method,
            iterator: monaco.languages.SymbolKind.Function,
            template: monaco.languages.SymbolKind.Function,
            macro: monaco.languages.SymbolKind.Function,
            converter: monaco.languages.SymbolKind.Function,
          };
          symbols.push({
            name: match[2].trim(),
            detail: match[1],
            kind: kindMap[match[1]] || monaco.languages.SymbolKind.Function,
            range: new monaco.Range(i + 1, 1, i + 1, line.length + 1),
            selectionRange: new monaco.Range(
              i + 1,
              match.index + match[1].length + 2,
              i + 1,
              match.index + match[0].length + 1,
            ),
            tags: [],
          });
          continue;
        }

        // Type definitions
        match = line.match(
          /^\s+(\w+)\s*\*?\s*=\s*(ref\s+)?(object|enum|tuple|distinct|concept)/,
        );
        if (match) {
          symbols.push({
            name: match[1],
            detail: (match[2] || "") + match[3],
            kind:
              match[3] === "enum"
                ? monaco.languages.SymbolKind.Enum
                : monaco.languages.SymbolKind.Class,
            range: new monaco.Range(i + 1, 1, i + 1, line.length + 1),
            selectionRange: new monaco.Range(
              i + 1,
              line.indexOf(match[1]) + 1,
              i + 1,
              line.indexOf(match[1]) + match[1].length + 1,
            ),
            tags: [],
          });
          continue;
        }

        // Top-level var/let/const
        match = line.match(/^(var|let|const)\s+(\w+)/);
        if (match) {
          const kindMap2 = {
            var: monaco.languages.SymbolKind.Variable,
            let: monaco.languages.SymbolKind.Constant,
            const: monaco.languages.SymbolKind.Constant,
          };
          symbols.push({
            name: match[2],
            detail: match[1],
            kind: kindMap2[match[1]],
            range: new monaco.Range(i + 1, 1, i + 1, line.length + 1),
            selectionRange: new monaco.Range(
              i + 1,
              match[1].length + 2,
              i + 1,
              match[1].length + 2 + match[2].length,
            ),
            tags: [],
          });
        }
      }
      return symbols;
    },
  });

  // ─── 9. FOLDING RANGE PROVIDER ─────────────────────────────────
  monaco.languages.registerFoldingRangeProvider("nim", {
    provideFoldingRanges: function (model) {
      const lines = model.getLinesContent();
      const ranges = [];
      const stack = [];

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const indent = line.search(/\S/);
        if (indent < 0) continue; // blank line

        while (stack.length > 0 && stack[stack.length - 1].indent >= indent) {
          const top = stack.pop();
          if (i - 1 > top.line) {
            ranges.push({
              start: top.line + 1,
              end: i,
              kind: monaco.languages.FoldingRangeKind.Region,
            });
          }
        }

        if (
          line.trimEnd().endsWith(":") ||
          line.trimEnd().endsWith("=") ||
          /^\s*(proc|func|method|iterator|template|macro|type|var|let|const|if|elif|else|when|case|of|for|while|try|except|finally|block|object|enum)\b/.test(
            line,
          )
        ) {
          stack.push({ line: i, indent });
        }
      }

      while (stack.length > 0) {
        const top = stack.pop();
        if (lines.length - 1 > top.line) {
          ranges.push({
            start: top.line + 1,
            end: lines.length,
            kind: monaco.languages.FoldingRangeKind.Region,
          });
        }
      }

      // Also fold block comments
      let bcStart = -1;
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes("#[") && bcStart < 0) bcStart = i;
        if (lines[i].includes("]#") && bcStart >= 0) {
          ranges.push({
            start: bcStart + 1,
            end: i + 1,
            kind: monaco.languages.FoldingRangeKind.Comment,
          });
          bcStart = -1;
        }
      }

      return ranges;
    },
  });

  // ─── 10. RENAME PROVIDER ───────────────────────────────────────
  monaco.languages.registerRenameProvider("nim", {
    provideRenameEdits: function (model, position, newName) {
      const binding = resolveBinding(model, position);
      if (!binding) return null;
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
