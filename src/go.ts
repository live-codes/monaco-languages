import type * as Monaco from "monaco-editor";

export default (monaco: typeof Monaco) => {
  // ── Register Go Language ──────────────────────────────────────────
  monaco.languages.register({
    id: "go",
    extensions: [".go"],
    aliases: ["Go", "golang"],
  });

  // ── Monarch Syntax Highlighting ───────────────────────────────────
  monaco.languages.setMonarchTokensProvider("go", {
    defaultToken: "",
    tokenPostfix: ".go",

    keywords: [
      "break",
      "case",
      "chan",
      "const",
      "continue",
      "default",
      "defer",
      "else",
      "fallthrough",
      "for",
      "func",
      "go",
      "goto",
      "if",
      "import",
      "interface",
      "map",
      "package",
      "range",
      "return",
      "select",
      "struct",
      "switch",
      "type",
      "var",
    ],

    builtins: [
      "append",
      "cap",
      "close",
      "complex",
      "copy",
      "delete",
      "imag",
      "len",
      "make",
      "new",
      "panic",
      "print",
      "println",
      "real",
      "recover",
      "clear",
      "min",
      "max",
    ],

    typeKeywords: [
      "bool",
      "byte",
      "complex64",
      "complex128",
      "error",
      "float32",
      "float64",
      "int",
      "int8",
      "int16",
      "int32",
      "int64",
      "rune",
      "string",
      "uint",
      "uint8",
      "uint16",
      "uint32",
      "uint64",
      "uintptr",
      "any",
      "comparable",
    ],

    constants: ["true", "false", "nil", "iota"],

    operators: [
      "+",
      "-",
      "*",
      "/",
      "%",
      "&",
      "|",
      "^",
      "<<",
      ">>",
      "&^",
      "+=",
      "-=",
      "*=",
      "/=",
      "%=",
      "&=",
      "|=",
      "^=",
      "<<=",
      ">>=",
      "&^=",
      "&&",
      "||",
      "<-",
      "++",
      "--",
      "==",
      "<",
      ">",
      "=",
      "!",
      "!=",
      "<=",
      ">=",
      ":=",
      "...",
      "(",
      ")",
      "[",
      "]",
      "{",
      "}",
      ",",
      ";",
      ".",
      ":",
    ],

    symbols: /[=><!~?:&|+\-*\/\^%]+/,
    escapes:
      /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8}|[0-7]{1,3})/,

    tokenizer: {
      root: [
        // Comments
        [/\/\/.*$/, "comment"],
        [/\/\*/, "comment", "@comment"],

        // Package/import
        [/\b(package)\b/, "keyword", "@package_name"],
        [/\b(import)\b/, "keyword", "@import_block"],

        // Identifiers and keywords
        [
          /[a-zA-Z_]\w*/,
          {
            cases: {
              "@keywords": "keyword",
              "@builtins": "predefined",
              "@typeKeywords": "type",
              "@constants": "constant",
              "@default": "identifier",
            },
          },
        ],

        // Whitespace
        { include: "@whitespace" },

        // Strings
        [/"/, "string", "@string_double"],
        [/`/, "string", "@string_backtick"],
        [/'/, "string", "@string_single"],

        // Numbers
        [/0[xX][0-9a-fA-F][0-9a-fA-F_]*/, "number.hex"],
        [/0[oO][0-7][0-7_]*/, "number.octal"],
        [/0[bB][01][01_]*/, "number.binary"],
        [/[0-9][0-9_]*\.[0-9][0-9_]*([eE][\-+]?\d+)?/, "number.float"],
        [/[0-9][0-9_]*[eE][\-+]?\d+/, "number.float"],
        [/[0-9][0-9_]*/, "number"],

        // Delimiters
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

        [/[;,.]/, "delimiter"],
      ],

      comment: [
        [/[^\/*]+/, "comment"],
        [/\*\//, "comment", "@pop"],
        [/[\/*]/, "comment"],
      ],

      package_name: [
        [/\s+/, ""],
        [/[a-zA-Z_]\w*/, "namespace", "@pop"],
        ["", "", "@pop"],
      ],

      import_block: [
        [/\s+/, ""],
        [/"[^"]*"/, "string", "@pop"],
        [/\(/, "@brackets", "@import_list"],
        ["", "", "@pop"],
      ],

      import_list: [
        [/\s+/, ""],
        [/"[^"]*"/, "string"],
        [/[a-zA-Z_]\w*/, "namespace"],
        [/\./, "delimiter"],
        [/\)/, "@brackets", "@popall"],
        [/\/\/.*$/, "comment"],
      ],

      string_double: [
        [/[^\\"]+/, "string"],
        [/@escapes/, "string.escape"],
        [/\\./, "string.escape.invalid"],
        [/"/, "string", "@pop"],
      ],

      string_backtick: [
        [/[^`]+/, "string"],
        [/`/, "string", "@pop"],
      ],

      string_single: [
        [/[^\\']+/, "string"],
        [/@escapes/, "string.escape"],
        [/\\./, "string.escape.invalid"],
        [/'/, "string", "@pop"],
      ],

      whitespace: [[/\s+/, "white"]],
    },
  });

  // ── Language Configuration ────────────────────────────────────────
  monaco.languages.setLanguageConfiguration("go", {
    comments: {
      lineComment: "//",
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
      { open: '"', close: '"' },
      { open: "'", close: "'" },
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
      increaseIndentPattern: /^.*\{[^}"']*$|^.*\([^)"']*$/,
      decreaseIndentPattern: /^\s*(\}|\))/,
    },
    folding: {
      markers: {
        start: /^\s*\/\/\s*#?region\b/,
        end: /^\s*\/\/\s*#?endregion\b/,
      },
    },
    wordPattern:
      /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
  });

  // ── Hover Documentation Database ─────────────────────────────────
  const hoverDocs = {
    // Keywords
    package: {
      detail: "keyword",
      doc: "Declares the package name for the current file. Every Go file must begin with a package declaration.",
    },
    import: {
      detail: "keyword",
      doc: "Imports packages for use in the current file. Can import single or multiple packages.",
    },
    func: {
      detail: "keyword",
      doc: "Declares a function. Syntax: `func name(params) returnType { body }`",
    },
    var: {
      detail: "keyword",
      doc: "Declares one or more variables. Variables can be declared with a type, an initializer, or both.",
    },
    const: {
      detail: "keyword",
      doc: "Declares a constant value. Constants can be character, string, boolean, or numeric values.",
    },
    type: {
      detail: "keyword",
      doc: "Declares a new named type. Can define structs, interfaces, type aliases, and more.",
    },
    struct: {
      detail: "keyword",
      doc: "Defines a composite type that groups together fields. Syntax: `type Name struct { fields }`",
    },
    interface: {
      detail: "keyword",
      doc: "Defines a set of method signatures. Types implicitly implement interfaces by implementing all methods.",
    },
    map: {
      detail: "keyword",
      doc: "A built-in associative data type (hash table). Syntax: `map[KeyType]ValueType`",
    },
    chan: {
      detail: "keyword",
      doc: "Declares a channel type for goroutine communication. Syntax: `chan Type`, `<-chan Type`, `chan<- Type`",
    },
    go: {
      detail: "keyword",
      doc: "Starts a new goroutine. The function call that follows is executed concurrently.",
    },
    defer: {
      detail: "keyword",
      doc: "Defers execution of a function until the surrounding function returns. Deferred calls are executed in LIFO order.",
    },
    select: {
      detail: "keyword",
      doc: "Lets a goroutine wait on multiple communication operations. Blocks until one case can proceed.",
    },
    range: {
      detail: "keyword",
      doc: "Iterates over elements in arrays, slices, strings, maps, or channels.",
    },
    return: {
      detail: "keyword",
      doc: "Terminates execution of the current function and optionally returns values to the caller.",
    },
    if: {
      detail: "keyword",
      doc: "Conditional branch. Syntax: `if condition { } else if condition { } else { }`",
    },
    else: {
      detail: "keyword",
      doc: "Specifies an alternative branch in an if statement.",
    },
    for: {
      detail: "keyword",
      doc: "The only looping construct in Go. Supports C-style, while-style, and range-based iteration.",
    },
    switch: {
      detail: "keyword",
      doc: "Multi-way branch statement. Cases do not fall through by default (use `fallthrough` if needed).",
    },
    case: {
      detail: "keyword",
      doc: "Defines a branch in a switch or select statement.",
    },
    default: {
      detail: "keyword",
      doc: "The default case in a switch or select statement.",
    },
    break: {
      detail: "keyword",
      doc: "Terminates execution of the innermost for, switch, or select statement.",
    },
    continue: {
      detail: "keyword",
      doc: "Begins the next iteration of the innermost for loop.",
    },
    fallthrough: {
      detail: "keyword",
      doc: "Transfers control to the next case clause in a switch statement.",
    },
    goto: {
      detail: "keyword",
      doc: "Transfers control to the statement with the corresponding label.",
    },
    // Builtins
    append: {
      detail: "func append(slice []T, elems ...T) []T",
      doc: "Appends elements to the end of a slice and returns the updated slice.",
    },
    cap: {
      detail: "func cap(v Type) int",
      doc: "Returns the capacity of v: the number of elements the slice can hold, the buffer size of a channel, or array length.",
    },
    close: {
      detail: "func close(c chan<- Type)",
      doc: "Closes a channel. No more values can be sent to it. Receives will return zero values after the channel is drained.",
    },
    complex: {
      detail: "func complex(r, i FloatType) ComplexType",
      doc: "Constructs a complex value from two floating-point values.",
    },
    copy: {
      detail: "func copy(dst, src []T) int",
      doc: "Copies elements from a source slice to a destination slice and returns the number of elements copied.",
    },
    delete: {
      detail: "func delete(m map[K]V, key K)",
      doc: "Deletes the element with the specified key from the map. No-op if key is not present.",
    },
    imag: {
      detail: "func imag(c ComplexType) FloatType",
      doc: "Returns the imaginary part of a complex number.",
    },
    len: {
      detail: "func len(v Type) int",
      doc: "Returns the length of v: number of elements in array/slice/map, bytes in string, or items in channel buffer.",
    },
    make: {
      detail: "func make(t Type, size ...int) Type",
      doc: "Allocates and initializes slices, maps, and channels. Returns an initialized (not zeroed) value of type T.",
    },
    new: {
      detail: "func new(Type) *Type",
      doc: "Allocates memory for a new zero value of type T and returns a pointer to it.",
    },
    panic: {
      detail: "func panic(v any)",
      doc: "Stops normal execution of the current goroutine. Deferred functions are still run. Panics propagate up the call stack.",
    },
    print: {
      detail: "func print(args ...Type)",
      doc: "Formats using default formats and writes to standard error. Useful for bootstrapping and debugging.",
    },
    println: {
      detail: "func println(args ...Type)",
      doc: "Like print but adds spaces between arguments and a newline at the end.",
    },
    real: {
      detail: "func real(c ComplexType) FloatType",
      doc: "Returns the real part of a complex number.",
    },
    recover: {
      detail: "func recover() any",
      doc: "Regains control of a panicking goroutine. Only useful inside deferred functions.",
    },
    clear: {
      detail: "func clear(t T)",
      doc: "Clears maps and slices. For maps, deletes all entries. For slices, sets all elements to zero value. (Go 1.21+)",
    },
    min: {
      detail: "func min(x T, y ...T) T",
      doc: "Returns the smallest value among the arguments. Works with ordered types. (Go 1.21+)",
    },
    max: {
      detail: "func max(x T, y ...T) T",
      doc: "Returns the largest value among the arguments. Works with ordered types. (Go 1.21+)",
    },
    // Types
    bool: {
      detail: "type bool",
      doc: "Boolean type. Possible values: `true` and `false`.",
    },
    byte: {
      detail: "type byte = uint8",
      doc: "Alias for uint8. Represents a single byte.",
    },
    int: {
      detail: "type int",
      doc: "Signed integer type, at least 32 bits. Size is platform-dependent (32 or 64 bits).",
    },
    int8: { detail: "type int8", doc: "Signed 8-bit integer (-128 to 127)." },
    int16: {
      detail: "type int16",
      doc: "Signed 16-bit integer (-32768 to 32767).",
    },
    int32: {
      detail: "type int32",
      doc: "Signed 32-bit integer (-2147483648 to 2147483647).",
    },
    int64: { detail: "type int64", doc: "Signed 64-bit integer." },
    uint: {
      detail: "type uint",
      doc: "Unsigned integer type. Size is platform-dependent (32 or 64 bits).",
    },
    uint8: { detail: "type uint8", doc: "Unsigned 8-bit integer (0 to 255)." },
    uint16: {
      detail: "type uint16",
      doc: "Unsigned 16-bit integer (0 to 65535).",
    },
    uint32: {
      detail: "type uint32",
      doc: "Unsigned 32-bit integer (0 to 4294967295).",
    },
    uint64: { detail: "type uint64", doc: "Unsigned 64-bit integer." },
    uintptr: {
      detail: "type uintptr",
      doc: "An integer type large enough to hold the bit pattern of any pointer.",
    },
    float32: {
      detail: "type float32",
      doc: "IEEE-754 32-bit floating-point number.",
    },
    float64: {
      detail: "type float64",
      doc: "IEEE-754 64-bit floating-point number.",
    },
    complex64: {
      detail: "type complex64",
      doc: "Complex number with float32 real and imaginary parts.",
    },
    complex128: {
      detail: "type complex128",
      doc: "Complex number with float64 real and imaginary parts.",
    },
    string: {
      detail: "type string",
      doc: "Immutable sequence of bytes. Conventionally represents UTF-8-encoded text.",
    },
    rune: {
      detail: "type rune = int32",
      doc: "Alias for int32. Represents a Unicode code point.",
    },
    error: {
      detail: "type error interface { Error() string }",
      doc: "Built-in interface for representing error conditions. The nil value means no error.",
    },
    any: {
      detail: "type any = interface{}",
      doc: "Alias for interface{}. Represents any type. (Go 1.18+)",
    },
    comparable: {
      detail: "type comparable interface",
      doc: "Constraint satisfied by all comparable types. Used in generics. (Go 1.18+)",
    },
    // Constants
    true: { detail: "const true = 0 == 0", doc: "Boolean true constant." },
    false: { detail: "const false = 0 != 0", doc: "Boolean false constant." },
    nil: {
      detail: "var nil",
      doc: "Zero value for pointers, interfaces, maps, slices, channels, and function types.",
    },
    iota: {
      detail: "const iota",
      doc: "Predeclared identifier representing the untyped integer ordinal of the current const spec in a const block, starting at 0.",
    },
    // fmt functions
    Println: {
      detail: "func fmt.Println(a ...any) (n int, err error)",
      doc: "Formats using default formats, writes to standard output, adds a newline. Returns number of bytes written and any write error.",
    },
    Printf: {
      detail: "func fmt.Printf(format string, a ...any) (n int, err error)",
      doc: "Formats according to a format specifier and writes to standard output.",
    },
    Sprintf: {
      detail: "func fmt.Sprintf(format string, a ...any) string",
      doc: "Formats according to a format specifier and returns the resulting string.",
    },
    Fprintf: {
      detail:
        "func fmt.Fprintf(w io.Writer, format string, a ...any) (n int, err error)",
      doc: "Formats according to a format specifier and writes to w.",
    },
    Errorf: {
      detail: "func fmt.Errorf(format string, a ...any) error",
      doc: "Formats according to a format specifier and returns an error with that string.",
    },
    Scanf: {
      detail: "func fmt.Scanf(format string, a ...any) (n int, err error)",
      doc: "Scans text read from standard input, storing space-separated values into successive arguments as determined by the format.",
    },
    Sscanf: {
      detail:
        "func fmt.Sscanf(str string, format string, a ...any) (n int, err error)",
      doc: "Scans the argument string, storing values into successive arguments as determined by the format.",
    },
    // Standard library references
    Atoi: {
      detail: "func strconv.Atoi(s string) (int, error)",
      doc: "Converts a string to an int.",
    },
    Itoa: {
      detail: "func strconv.Itoa(i int) string",
      doc: "Converts an int to a string.",
    },
    Contains: {
      detail: "func strings.Contains(s, substr string) bool",
      doc: "Reports whether substr is within s.",
    },
    Split: {
      detail: "func strings.Split(s, sep string) []string",
      doc: "Slices s into all substrings separated by sep.",
    },
    Replace: {
      detail: "func strings.Replace(s, old, new string, n int) string",
      doc: "Returns a copy of s with the first n non-overlapping instances of old replaced by new.",
    },
    Join: {
      detail: "func strings.Join(elems []string, sep string) string",
      doc: "Concatenates the elements of its first argument to create a single string, placing sep between them.",
    },
    HasPrefix: {
      detail: "func strings.HasPrefix(s, prefix string) bool",
      doc: "Reports whether the string s begins with prefix.",
    },
    HasSuffix: {
      detail: "func strings.HasSuffix(s, suffix string) bool",
      doc: "Reports whether the string s ends with suffix.",
    },
    TrimSpace: {
      detail: "func strings.TrimSpace(s string) string",
      doc: "Returns a slice of string s with all leading and trailing white space removed.",
    },
  };

  // ── Standard Library Packages ─────────────────────────────────────
  const stdPackages = [
    {
      name: "fmt",
      doc: "Package fmt implements formatted I/O with functions analogous to C's printf and scanf.",
    },
    {
      name: "os",
      doc: "Package os provides a platform-independent interface to operating system functionality.",
    },
    {
      name: "io",
      doc: "Package io provides basic interfaces to I/O primitives.",
    },
    {
      name: "net",
      doc: "Package net provides a portable interface for network I/O.",
    },
    {
      name: "net/http",
      doc: "Package http provides HTTP client and server implementations.",
    },
    {
      name: "strings",
      doc: "Package strings implements simple functions to manipulate UTF-8 encoded strings.",
    },
    {
      name: "strconv",
      doc: "Package strconv implements conversions to and from string representations of basic data types.",
    },
    {
      name: "math",
      doc: "Package math provides basic constants and mathematical functions.",
    },
    {
      name: "math/rand",
      doc: "Package rand implements pseudo-random number generators.",
    },
    {
      name: "time",
      doc: "Package time provides functionality for measuring and displaying time.",
    },
    {
      name: "sync",
      doc: "Package sync provides basic synchronization primitives such as mutual exclusion locks.",
    },
    {
      name: "context",
      doc: "Package context defines the Context type, which carries deadlines, cancellation signals, and request-scoped values.",
    },
    {
      name: "encoding/json",
      doc: "Package json implements encoding and decoding of JSON.",
    },
    {
      name: "encoding/xml",
      doc: "Package xml implements a simple XML 1.0 parser.",
    },
    { name: "log", doc: "Package log implements a simple logging package." },
    {
      name: "errors",
      doc: "Package errors implements functions to manipulate errors.",
    },
    {
      name: "sort",
      doc: "Package sort provides primitives for sorting slices and user-defined collections.",
    },
    {
      name: "regexp",
      doc: "Package regexp implements regular expression search.",
    },
    {
      name: "path",
      doc: "Package path implements utility routines for manipulating slash-separated paths.",
    },
    {
      name: "path/filepath",
      doc: "Package filepath implements utility routines for manipulating filename paths.",
    },
    { name: "bufio", doc: "Package bufio implements buffered I/O." },
    {
      name: "bytes",
      doc: "Package bytes implements functions for the manipulation of byte slices.",
    },
    {
      name: "testing",
      doc: "Package testing provides support for automated testing of Go packages.",
    },
    { name: "reflect", doc: "Package reflect implements run-time reflection." },
    {
      name: "unsafe",
      doc: "Package unsafe contains operations that step around the type safety of Go programs.",
    },
  ];

  // ── Completion Provider ───────────────────────────────────────────
  monaco.languages.registerCompletionItemProvider("go", {
    triggerCharacters: [".", '"'],
    provideCompletionItems: function (model, position) {
      const textUntilPosition = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });
      const fullText = model.getValue();
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };

      const suggestions = [];

      // Import path completion
      if (
        /import\s*\(\s*$/.test(textUntilPosition) ||
        /^\s*"/.test(textUntilPosition)
      ) {
        const lineText = model.getLineContent(position.lineNumber);
        if (lineText.includes('"')) {
          stdPackages.forEach((pkg) => {
            suggestions.push({
              label: pkg.name,
              kind: monaco.languages.CompletionItemKind.Module,
              insertText: pkg.name,
              detail: "Standard Library",
              documentation: pkg.doc,
              range: range,
            });
          });
          return { suggestions };
        }
      }

      // Dot completions for known packages
      const dotMatch = textUntilPosition.match(/(\w+)\.\s*$/);
      if (dotMatch) {
        const pkg = dotMatch[1];
        const pkgMembers = {
          fmt: [
            {
              n: "Println",
              k: "Function",
              i: "fmt.Println(a ...any) (n int, err error)",
              d: "Formats using default formats, writes to stdout, adds newline.",
              s: "Println(${1})",
            },
            {
              n: "Printf",
              k: "Function",
              i: "fmt.Printf(format string, a ...any) (n int, err error)",
              d: "Formats according to format specifier and writes to stdout.",
              s: 'Printf("${1}\\n"${2})',
            },
            {
              n: "Sprintf",
              k: "Function",
              i: "fmt.Sprintf(format string, a ...any) string",
              d: "Formats and returns the resulting string.",
              s: 'Sprintf("${1}"${2})',
            },
            {
              n: "Fprintf",
              k: "Function",
              i: "fmt.Fprintf(w io.Writer, format string, a ...any) (n int, err error)",
              d: "Writes formatted output to w.",
              s: 'Fprintf(${1}, "${2}"${3})',
            },
            {
              n: "Errorf",
              k: "Function",
              i: "fmt.Errorf(format string, a ...any) error",
              d: "Formats string and returns as error value.",
              s: 'Errorf("${1}"${2})',
            },
            {
              n: "Scan",
              k: "Function",
              i: "fmt.Scan(a ...any) (n int, err error)",
              d: "Scans text read from stdin, storing values.",
              s: "Scan(&${1})",
            },
            {
              n: "Scanf",
              k: "Function",
              i: "fmt.Scanf(format string, a ...any) (n int, err error)",
              d: "Scans stdin, storing values as determined by format.",
              s: 'Scanf("${1}", &${2})',
            },
            {
              n: "Scanln",
              k: "Function",
              i: "fmt.Scanln(a ...any) (n int, err error)",
              d: "Like Scan but stops scanning at newline.",
              s: "Scanln(&${1})",
            },
            {
              n: "Sscan",
              k: "Function",
              i: "fmt.Sscan(str string, a ...any) (n int, err error)",
              d: "Scans argument string.",
              s: "Sscan(${1}, &${2})",
            },
            {
              n: "Sscanf",
              k: "Function",
              i: "fmt.Sscanf(str string, format string, a ...any) (n int, err error)",
              d: "Scans the argument string using format.",
              s: 'Sscanf(${1}, "${2}", &${3})',
            },
            {
              n: "Sprint",
              k: "Function",
              i: "fmt.Sprint(a ...any) string",
              d: "Formats and returns resulting string.",
              s: "Sprint(${1})",
            },
            {
              n: "Sprintln",
              k: "Function",
              i: "fmt.Sprintln(a ...any) string",
              d: "Formats and returns resulting string with newline.",
              s: "Sprintln(${1})",
            },
            {
              n: "Stringer",
              k: "Interface",
              i: "type Stringer interface { String() string }",
              d: "Implemented by any value that has a String method.",
              s: "Stringer",
            },
          ],
          strings: [
            {
              n: "Contains",
              k: "Function",
              i: "strings.Contains(s, substr string) bool",
              d: "Reports whether substr is within s.",
              s: 'Contains(${1}, "${2}")',
            },
            {
              n: "HasPrefix",
              k: "Function",
              i: "strings.HasPrefix(s, prefix string) bool",
              d: "Reports whether s begins with prefix.",
              s: 'HasPrefix(${1}, "${2}")',
            },
            {
              n: "HasSuffix",
              k: "Function",
              i: "strings.HasSuffix(s, suffix string) bool",
              d: "Reports whether s ends with suffix.",
              s: 'HasSuffix(${1}, "${2}")',
            },
            {
              n: "Index",
              k: "Function",
              i: "strings.Index(s, substr string) int",
              d: "Returns the index of the first instance of substr.",
              s: 'Index(${1}, "${2}")',
            },
            {
              n: "Join",
              k: "Function",
              i: "strings.Join(elems []string, sep string) string",
              d: "Concatenates slice elements with separator.",
              s: 'Join(${1}, "${2}")',
            },
            {
              n: "Replace",
              k: "Function",
              i: "strings.Replace(s, old, new string, n int) string",
              d: "Returns copy with replacements.",
              s: 'Replace(${1}, "${2}", "${3}", ${4:-1})',
            },
            {
              n: "ReplaceAll",
              k: "Function",
              i: "strings.ReplaceAll(s, old, new string) string",
              d: "Returns copy with all replacements.",
              s: 'ReplaceAll(${1}, "${2}", "${3}")',
            },
            {
              n: "Split",
              k: "Function",
              i: "strings.Split(s, sep string) []string",
              d: "Slices s into all substrings separated by sep.",
              s: 'Split(${1}, "${2}")',
            },
            {
              n: "ToLower",
              k: "Function",
              i: "strings.ToLower(s string) string",
              d: "Returns s with all Unicode letters lowercased.",
              s: "ToLower(${1})",
            },
            {
              n: "ToUpper",
              k: "Function",
              i: "strings.ToUpper(s string) string",
              d: "Returns s with all Unicode letters uppercased.",
              s: "ToUpper(${1})",
            },
            {
              n: "Trim",
              k: "Function",
              i: "strings.Trim(s, cutset string) string",
              d: "Returns s with leading and trailing cutset removed.",
              s: 'Trim(${1}, "${2}")',
            },
            {
              n: "TrimSpace",
              k: "Function",
              i: "strings.TrimSpace(s string) string",
              d: "Returns s without leading and trailing whitespace.",
              s: "TrimSpace(${1})",
            },
            {
              n: "NewReader",
              k: "Function",
              i: "strings.NewReader(s string) *strings.Reader",
              d: "Returns a new Reader reading from s.",
              s: "NewReader(${1})",
            },
            {
              n: "Builder",
              k: "Struct",
              i: "type strings.Builder struct",
              d: "A Builder is used to efficiently build a string using Write methods.",
              s: "Builder{}",
            },
            {
              n: "Repeat",
              k: "Function",
              i: "strings.Repeat(s string, count int) string",
              d: "Returns a new string consisting of count copies of s.",
              s: "Repeat(${1}, ${2})",
            },
          ],
          os: [
            {
              n: "Args",
              k: "Variable",
              i: "var os.Args []string",
              d: "Args hold the command-line arguments, starting with the program name.",
              s: "Args",
            },
            {
              n: "Stdin",
              k: "Variable",
              i: "var os.Stdin *os.File",
              d: "Standard input file descriptor.",
              s: "Stdin",
            },
            {
              n: "Stdout",
              k: "Variable",
              i: "var os.Stdout *os.File",
              d: "Standard output file descriptor.",
              s: "Stdout",
            },
            {
              n: "Stderr",
              k: "Variable",
              i: "var os.Stderr *os.File",
              d: "Standard error file descriptor.",
              s: "Stderr",
            },
            {
              n: "Exit",
              k: "Function",
              i: "func os.Exit(code int)",
              d: "Causes the current program to exit with the given status code.",
              s: "Exit(${1:0})",
            },
            {
              n: "Getenv",
              k: "Function",
              i: "func os.Getenv(key string) string",
              d: "Retrieves the value of the environment variable.",
              s: 'Getenv("${1}")',
            },
            {
              n: "Setenv",
              k: "Function",
              i: "func os.Setenv(key, value string) error",
              d: "Sets the value of the environment variable.",
              s: 'Setenv("${1}", "${2}")',
            },
            {
              n: "Open",
              k: "Function",
              i: "func os.Open(name string) (*os.File, error)",
              d: "Opens a file for reading.",
              s: 'Open("${1}")',
            },
            {
              n: "Create",
              k: "Function",
              i: "func os.Create(name string) (*os.File, error)",
              d: "Creates or truncates a file.",
              s: 'Create("${1}")',
            },
            {
              n: "ReadFile",
              k: "Function",
              i: "func os.ReadFile(name string) ([]byte, error)",
              d: "Reads the named file and returns the contents.",
              s: 'ReadFile("${1}")',
            },
            {
              n: "WriteFile",
              k: "Function",
              i: "func os.WriteFile(name string, data []byte, perm os.FileMode) error",
              d: "Writes data to a file.",
              s: 'WriteFile("${1}", ${2}, 0644)',
            },
            {
              n: "Mkdir",
              k: "Function",
              i: "func os.Mkdir(name string, perm os.FileMode) error",
              d: "Creates a new directory.",
              s: 'Mkdir("${1}", 0755)',
            },
            {
              n: "MkdirAll",
              k: "Function",
              i: "func os.MkdirAll(path string, perm os.FileMode) error",
              d: "Creates a directory path and all parents.",
              s: 'MkdirAll("${1}", 0755)',
            },
            {
              n: "Remove",
              k: "Function",
              i: "func os.Remove(name string) error",
              d: "Removes the named file or empty directory.",
              s: 'Remove("${1}")',
            },
          ],
          errors: [
            {
              n: "New",
              k: "Function",
              i: "func errors.New(text string) error",
              d: "Returns an error that formats as the given text.",
              s: 'New("${1}")',
            },
            {
              n: "Is",
              k: "Function",
              i: "func errors.Is(err, target error) bool",
              d: "Reports whether any error in err's tree matches target.",
              s: "Is(${1}, ${2})",
            },
            {
              n: "As",
              k: "Function",
              i: "func errors.As(err error, target any) bool",
              d: "Finds the first error in err's tree that matches target.",
              s: "As(${1}, &${2})",
            },
            {
              n: "Unwrap",
              k: "Function",
              i: "func errors.Unwrap(err error) error",
              d: "Returns the result of calling the Unwrap method on err.",
              s: "Unwrap(${1})",
            },
            {
              n: "Join",
              k: "Function",
              i: "func errors.Join(errs ...error) error",
              d: "Returns an error that wraps the given errors. (Go 1.20+)",
              s: "Join(${1})",
            },
          ],
          strconv: [
            {
              n: "Atoi",
              k: "Function",
              i: "func strconv.Atoi(s string) (int, error)",
              d: "Converts a string to an int.",
              s: "Atoi(${1})",
            },
            {
              n: "Itoa",
              k: "Function",
              i: "func strconv.Itoa(i int) string",
              d: "Converts an int to a decimal string.",
              s: "Itoa(${1})",
            },
            {
              n: "ParseFloat",
              k: "Function",
              i: "func strconv.ParseFloat(s string, bitSize int) (float64, error)",
              d: "Converts a string to a float64.",
              s: "ParseFloat(${1}, 64)",
            },
            {
              n: "ParseInt",
              k: "Function",
              i: "func strconv.ParseInt(s string, base int, bitSize int) (int64, error)",
              d: "Converts a string to an int64.",
              s: "ParseInt(${1}, 10, 64)",
            },
            {
              n: "ParseBool",
              k: "Function",
              i: "func strconv.ParseBool(str string) (bool, error)",
              d: "Returns the boolean value represented by the string.",
              s: "ParseBool(${1})",
            },
            {
              n: "FormatFloat",
              k: "Function",
              i: "func strconv.FormatFloat(f float64, fmt byte, prec, bitSize int) string",
              d: "Converts a float64 to a string.",
              s: "FormatFloat(${1}, 'f', -1, 64)",
            },
            {
              n: "FormatInt",
              k: "Function",
              i: "func strconv.FormatInt(i int64, base int) string",
              d: "Returns the string representation of i in the given base.",
              s: "FormatInt(${1}, 10)",
            },
          ],
          time: [
            {
              n: "Now",
              k: "Function",
              i: "func time.Now() time.Time",
              d: "Returns the current local time.",
              s: "Now()",
            },
            {
              n: "Sleep",
              k: "Function",
              i: "func time.Sleep(d time.Duration)",
              d: "Pauses the current goroutine for the duration.",
              s: "Sleep(${1:time.Second})",
            },
            {
              n: "After",
              k: "Function",
              i: "func time.After(d time.Duration) <-chan time.Time",
              d: "Waits for duration, then sends current time on the returned channel.",
              s: "After(${1})",
            },
            {
              n: "Since",
              k: "Function",
              i: "func time.Since(t time.Time) time.Duration",
              d: "Returns the time elapsed since t.",
              s: "Since(${1})",
            },
            {
              n: "NewTimer",
              k: "Function",
              i: "func time.NewTimer(d time.Duration) *time.Timer",
              d: "Creates a new Timer that will send on its channel after duration d.",
              s: "NewTimer(${1})",
            },
            {
              n: "NewTicker",
              k: "Function",
              i: "func time.NewTicker(d time.Duration) *time.Ticker",
              d: "Returns a new Ticker with a channel that sends at intervals.",
              s: "NewTicker(${1})",
            },
            {
              n: "Second",
              k: "Constant",
              i: "const time.Second time.Duration",
              d: "One second duration.",
              s: "Second",
            },
            {
              n: "Millisecond",
              k: "Constant",
              i: "const time.Millisecond time.Duration",
              d: "One millisecond duration.",
              s: "Millisecond",
            },
            {
              n: "Minute",
              k: "Constant",
              i: "const time.Minute time.Duration",
              d: "One minute duration.",
              s: "Minute",
            },
            {
              n: "Hour",
              k: "Constant",
              i: "const time.Hour time.Duration",
              d: "One hour duration.",
              s: "Hour",
            },
            {
              n: "Parse",
              k: "Function",
              i: "func time.Parse(layout, value string) (time.Time, error)",
              d: "Parses a formatted string and returns the time value.",
              s: 'Parse("${1:2006-01-02}", "${2}")',
            },
            {
              n: "Duration",
              k: "Type",
              i: "type time.Duration int64",
              d: "A Duration represents the elapsed time between two instants.",
              s: "Duration",
            },
          ],
          sync: [
            {
              n: "Mutex",
              k: "Struct",
              i: "type sync.Mutex struct",
              d: "A Mutex is a mutual exclusion lock.",
              s: "Mutex{}",
            },
            {
              n: "RWMutex",
              k: "Struct",
              i: "type sync.RWMutex struct",
              d: "A RWMutex is a reader/writer mutual exclusion lock.",
              s: "RWMutex{}",
            },
            {
              n: "WaitGroup",
              k: "Struct",
              i: "type sync.WaitGroup struct",
              d: "A WaitGroup waits for a collection of goroutines to finish.",
              s: "WaitGroup{}",
            },
            {
              n: "Once",
              k: "Struct",
              i: "type sync.Once struct",
              d: "Once is an object that will perform exactly one action.",
              s: "Once{}",
            },
            {
              n: "Map",
              k: "Struct",
              i: "type sync.Map struct",
              d: "Map is a concurrent-safe map.",
              s: "Map{}",
            },
          ],
          context: [
            {
              n: "Background",
              k: "Function",
              i: "func context.Background() context.Context",
              d: "Returns a non-nil, empty Context. Never canceled, no values, no deadline.",
              s: "Background()",
            },
            {
              n: "TODO",
              k: "Function",
              i: "func context.TODO() context.Context",
              d: "Returns a non-nil, empty Context for when unclear which Context to use.",
              s: "TODO()",
            },
            {
              n: "WithCancel",
              k: "Function",
              i: "func context.WithCancel(parent Context) (Context, CancelFunc)",
              d: "Returns a copy of parent with a new Done channel.",
              s: "WithCancel(${1})",
            },
            {
              n: "WithTimeout",
              k: "Function",
              i: "func context.WithTimeout(parent Context, timeout time.Duration) (Context, CancelFunc)",
              d: "Returns WithDeadline(parent, time.Now().Add(timeout)).",
              s: "WithTimeout(${1}, ${2})",
            },
            {
              n: "WithValue",
              k: "Function",
              i: "func context.WithValue(parent Context, key, val any) Context",
              d: "Returns a copy of parent with key associated with val.",
              s: "WithValue(${1}, ${2}, ${3})",
            },
          ],
          http: [
            {
              n: "ListenAndServe",
              k: "Function",
              i: "func http.ListenAndServe(addr string, handler http.Handler) error",
              d: "Listens on the TCP address and serves HTTP requests.",
              s: 'ListenAndServe("${1::8080}", ${2:nil})',
            },
            {
              n: "HandleFunc",
              k: "Function",
              i: "func http.HandleFunc(pattern string, handler func(http.ResponseWriter, *http.Request))",
              d: "Registers handler function for the given pattern.",
              s: 'HandleFunc("${1:/}", func(w http.ResponseWriter, r *http.Request) {\n\t${2}\n})',
            },
            {
              n: "Get",
              k: "Function",
              i: "func http.Get(url string) (*http.Response, error)",
              d: "Issues a GET to the specified URL.",
              s: 'Get("${1}")',
            },
            {
              n: "Post",
              k: "Function",
              i: "func http.Post(url, contentType string, body io.Reader) (*http.Response, error)",
              d: "Issues a POST to the specified URL.",
              s: 'Post("${1}", "${2:application/json}", ${3})',
            },
            {
              n: "NewRequest",
              k: "Function",
              i: "func http.NewRequest(method, url string, body io.Reader) (*http.Request, error)",
              d: "Returns a new Request given a method, URL, and optional body.",
              s: 'NewRequest("${1:GET}", "${2}", ${3:nil})',
            },
            {
              n: "StatusOK",
              k: "Constant",
              i: "const http.StatusOK = 200",
              d: "HTTP 200 OK status code.",
              s: "StatusOK",
            },
            {
              n: "StatusNotFound",
              k: "Constant",
              i: "const http.StatusNotFound = 404",
              d: "HTTP 404 Not Found status code.",
              s: "StatusNotFound",
            },
            {
              n: "Error",
              k: "Function",
              i: "func http.Error(w http.ResponseWriter, error string, code int)",
              d: "Replies to the request with an error message and HTTP code.",
              s: 'Error(${1:w}, "${2}", ${3:http.StatusInternalServerError})',
            },
            {
              n: "ServeMux",
              k: "Struct",
              i: "type http.ServeMux struct",
              d: "HTTP request multiplexer.",
              s: "ServeMux{}",
            },
            {
              n: "NewServeMux",
              k: "Function",
              i: "func http.NewServeMux() *http.ServeMux",
              d: "Allocates and returns a new ServeMux.",
              s: "NewServeMux()",
            },
          ],
          json: [
            {
              n: "Marshal",
              k: "Function",
              i: "func json.Marshal(v any) ([]byte, error)",
              d: "Returns the JSON encoding of v.",
              s: "Marshal(${1})",
            },
            {
              n: "Unmarshal",
              k: "Function",
              i: "func json.Unmarshal(data []byte, v any) error",
              d: "Parses JSON-encoded data and stores the result.",
              s: "Unmarshal(${1}, &${2})",
            },
            {
              n: "NewDecoder",
              k: "Function",
              i: "func json.NewDecoder(r io.Reader) *json.Decoder",
              d: "Returns a new decoder that reads from r.",
              s: "NewDecoder(${1})",
            },
            {
              n: "NewEncoder",
              k: "Function",
              i: "func json.NewEncoder(w io.Writer) *json.Encoder",
              d: "Returns a new encoder that writes to w.",
              s: "NewEncoder(${1})",
            },
            {
              n: "MarshalIndent",
              k: "Function",
              i: "func json.MarshalIndent(v any, prefix, indent string) ([]byte, error)",
              d: "Like Marshal but applies indentation.",
              s: 'MarshalIndent(${1}, "", "  ")',
            },
          ],
          log: [
            {
              n: "Println",
              k: "Function",
              i: "func log.Println(v ...any)",
              d: "Prints to the standard logger with newline.",
              s: "Println(${1})",
            },
            {
              n: "Printf",
              k: "Function",
              i: "func log.Printf(format string, v ...any)",
              d: "Prints formatted output to the standard logger.",
              s: 'Printf("${1}"${2})',
            },
            {
              n: "Fatal",
              k: "Function",
              i: "func log.Fatal(v ...any)",
              d: "Equivalent to Print followed by os.Exit(1).",
              s: "Fatal(${1})",
            },
            {
              n: "Fatalf",
              k: "Function",
              i: "func log.Fatalf(format string, v ...any)",
              d: "Equivalent to Printf followed by os.Exit(1).",
              s: 'Fatalf("${1}"${2})',
            },
            {
              n: "Panic",
              k: "Function",
              i: "func log.Panic(v ...any)",
              d: "Equivalent to Print followed by panic.",
              s: "Panic(${1})",
            },
          ],
          sort: [
            {
              n: "Ints",
              k: "Function",
              i: "func sort.Ints(x []int)",
              d: "Sorts a slice of ints in increasing order.",
              s: "Ints(${1})",
            },
            {
              n: "Strings",
              k: "Function",
              i: "func sort.Strings(x []string)",
              d: "Sorts a slice of strings in increasing order.",
              s: "Strings(${1})",
            },
            {
              n: "Float64s",
              k: "Function",
              i: "func sort.Float64s(x []float64)",
              d: "Sorts a slice of float64s in increasing order.",
              s: "Float64s(${1})",
            },
            {
              n: "Slice",
              k: "Function",
              i: "func sort.Slice(x any, less func(i, j int) bool)",
              d: "Sorts the slice x using a provided less function.",
              s: "Slice(${1}, func(i, j int) bool {\n\treturn ${2}\n})",
            },
            {
              n: "Search",
              k: "Function",
              i: "func sort.Search(n int, f func(int) bool) int",
              d: "Uses binary search to find the smallest index.",
              s: "Search(${1}, func(i int) bool {\n\treturn ${2}\n})",
            },
          ],
          math: [
            {
              n: "Abs",
              k: "Function",
              i: "func math.Abs(x float64) float64",
              d: "Returns the absolute value of x.",
              s: "Abs(${1})",
            },
            {
              n: "Max",
              k: "Function",
              i: "func math.Max(x, y float64) float64",
              d: "Returns the larger of x or y.",
              s: "Max(${1}, ${2})",
            },
            {
              n: "Min",
              k: "Function",
              i: "func math.Min(x, y float64) float64",
              d: "Returns the smaller of x or y.",
              s: "Min(${1}, ${2})",
            },
            {
              n: "Sqrt",
              k: "Function",
              i: "func math.Sqrt(x float64) float64",
              d: "Returns the square root of x.",
              s: "Sqrt(${1})",
            },
            {
              n: "Pow",
              k: "Function",
              i: "func math.Pow(x, y float64) float64",
              d: "Returns x**y.",
              s: "Pow(${1}, ${2})",
            },
            {
              n: "Floor",
              k: "Function",
              i: "func math.Floor(x float64) float64",
              d: "Returns the greatest integer value <= x.",
              s: "Floor(${1})",
            },
            {
              n: "Ceil",
              k: "Function",
              i: "func math.Ceil(x float64) float64",
              d: "Returns the smallest integer value >= x.",
              s: "Ceil(${1})",
            },
            {
              n: "Round",
              k: "Function",
              i: "func math.Round(x float64) float64",
              d: "Returns the nearest integer, rounding half away from zero.",
              s: "Round(${1})",
            },
            {
              n: "Pi",
              k: "Constant",
              i: "const math.Pi float64",
              d: "Pi mathematical constant (π ≈ 3.14159265...).",
              s: "Pi",
            },
            {
              n: "E",
              k: "Constant",
              i: "const math.E float64",
              d: "Euler's number (e ≈ 2.71828182...).",
              s: "E",
            },
            {
              n: "Log",
              k: "Function",
              i: "func math.Log(x float64) float64",
              d: "Returns the natural logarithm of x.",
              s: "Log(${1})",
            },
            {
              n: "Log2",
              k: "Function",
              i: "func math.Log2(x float64) float64",
              d: "Returns the binary logarithm of x.",
              s: "Log2(${1})",
            },
          ],
          io: [
            {
              n: "ReadAll",
              k: "Function",
              i: "func io.ReadAll(r io.Reader) ([]byte, error)",
              d: "Reads from r until an error or EOF.",
              s: "ReadAll(${1})",
            },
            {
              n: "Copy",
              k: "Function",
              i: "func io.Copy(dst io.Writer, src io.Reader) (int64, error)",
              d: "Copies from src to dst until EOF.",
              s: "Copy(${1}, ${2})",
            },
            {
              n: "EOF",
              k: "Variable",
              i: "var io.EOF error",
              d: "EOF is the error returned by Read when no more input is available.",
              s: "EOF",
            },
            {
              n: "Reader",
              k: "Interface",
              i: "type io.Reader interface { Read(p []byte) (n int, err error) }",
              d: "The interface that wraps the basic Read method.",
              s: "Reader",
            },
            {
              n: "Writer",
              k: "Interface",
              i: "type io.Writer interface { Write(p []byte) (n int, err error) }",
              d: "The interface that wraps the basic Write method.",
              s: "Writer",
            },
            {
              n: "NopCloser",
              k: "Function",
              i: "func io.NopCloser(r io.Reader) io.ReadCloser",
              d: "Returns a ReadCloser with a no-op Close method wrapping r.",
              s: "NopCloser(${1})",
            },
          ],
          bufio: [
            {
              n: "NewReader",
              k: "Function",
              i: "func bufio.NewReader(rd io.Reader) *bufio.Reader",
              d: "Returns a new Reader with default buffer size.",
              s: "NewReader(${1})",
            },
            {
              n: "NewWriter",
              k: "Function",
              i: "func bufio.NewWriter(w io.Writer) *bufio.Writer",
              d: "Returns a new Writer with default buffer size.",
              s: "NewWriter(${1})",
            },
            {
              n: "NewScanner",
              k: "Function",
              i: "func bufio.NewScanner(r io.Reader) *bufio.Scanner",
              d: "Returns a new Scanner to read from r.",
              s: "NewScanner(${1})",
            },
            {
              n: "Scanner",
              k: "Struct",
              i: "type bufio.Scanner struct",
              d: "Scanner reads input by tokens (default: lines).",
              s: "Scanner",
            },
          ],
          regexp: [
            {
              n: "Compile",
              k: "Function",
              i: "func regexp.Compile(expr string) (*regexp.Regexp, error)",
              d: "Parses a regular expression.",
              s: 'Compile("${1}")',
            },
            {
              n: "MustCompile",
              k: "Function",
              i: "func regexp.MustCompile(str string) *regexp.Regexp",
              d: "Like Compile but panics on error.",
              s: 'MustCompile("${1}")',
            },
            {
              n: "MatchString",
              k: "Function",
              i: "func regexp.MatchString(pattern string, s string) (bool, error)",
              d: "Reports whether string s matches pattern.",
              s: 'MatchString("${1}", ${2})',
            },
          ],
          reflect: [
            {
              n: "TypeOf",
              k: "Function",
              i: "func reflect.TypeOf(i any) reflect.Type",
              d: "Returns the reflection Type of the value.",
              s: "TypeOf(${1})",
            },
            {
              n: "ValueOf",
              k: "Function",
              i: "func reflect.ValueOf(i any) reflect.Value",
              d: "Returns a new Value initialized to the concrete value.",
              s: "ValueOf(${1})",
            },
          ],
          bytes: [
            {
              n: "NewBuffer",
              k: "Function",
              i: "func bytes.NewBuffer(buf []byte) *bytes.Buffer",
              d: "Creates and initializes a new Buffer.",
              s: "NewBuffer(${1})",
            },
            {
              n: "Contains",
              k: "Function",
              i: "func bytes.Contains(b, subslice []byte) bool",
              d: "Reports whether subslice is within b.",
              s: "Contains(${1}, ${2})",
            },
            {
              n: "Join",
              k: "Function",
              i: "func bytes.Join(s [][]byte, sep []byte) []byte",
              d: "Concatenates slices of s with separator.",
              s: "Join(${1}, ${2})",
            },
            {
              n: "Split",
              k: "Function",
              i: "func bytes.Split(s, sep []byte) [][]byte",
              d: "Slices s into subslices separated by sep.",
              s: "Split(${1}, ${2})",
            },
          ],
        };
        const members = pkgMembers[pkg];
        if (members) {
          members.forEach((m) => {
            const kindMap = {
              Function: monaco.languages.CompletionItemKind.Function,
              Variable: monaco.languages.CompletionItemKind.Variable,
              Constant: monaco.languages.CompletionItemKind.Constant,
              Struct: monaco.languages.CompletionItemKind.Struct,
              Interface: monaco.languages.CompletionItemKind.Interface,
              Type: monaco.languages.CompletionItemKind.Class,
            };
            suggestions.push({
              label: m.n,
              kind:
                kindMap[m.k] || monaco.languages.CompletionItemKind.Function,
              insertText: m.s,
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              detail: m.i,
              documentation: { value: m.d },
              range: range,
            });
          });
          return { suggestions };
        }

        // Try to find user-defined struct methods/fields in current file
        const structRegex = new RegExp(
          `type\\s+${pkg}\\s+struct\\s*\\{([^}]*)\\}`,
          "s",
        );
        const structMatch = fullText.match(structRegex);
        if (structMatch) {
          const fields = structMatch[1]
            .split("\n")
            .filter((l) => l.trim() && !l.trim().startsWith("//"));
          fields.forEach((f) => {
            const parts = f.trim().split(/\s+/);
            if (parts.length >= 2) {
              suggestions.push({
                label: parts[0],
                kind: monaco.languages.CompletionItemKind.Field,
                insertText: parts[0],
                detail: `field ${parts.join(" ")}`,
                documentation: { value: `Field of ${pkg}` },
                range: range,
              });
            }
          });
        }
        // Methods on this type
        const methodRegex = new RegExp(
          `func\\s*\\(\\w+\\s+\\*?${pkg}\\)\\s+(\\w+)\\(([^)]*)\\)\\s*([^{]*)`,
          "g",
        );
        let methodMatch;
        while ((methodMatch = methodRegex.exec(fullText)) !== null) {
          suggestions.push({
            label: methodMatch[1],
            kind: monaco.languages.CompletionItemKind.Method,
            insertText: methodMatch[1] + "($0)",
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: `func (${pkg}) ${methodMatch[1]}(${methodMatch[2]}) ${methodMatch[3].trim()}`,
            range: range,
          });
        }

        return { suggestions };
      }

      // ── Code Snippets ───────────────────────────────────────────
      const snippets = [
        {
          label: "package main",
          insertText:
            'package main\n\nimport "fmt"\n\nfunc main() {\n\t${1:fmt.Println("Hello, World!")}\n}\n',
          doc: "Main package boilerplate",
        },
        {
          label: "func",
          insertText:
            "func ${1:name}(${2:params}) ${3:returnType} {\n\t${4}\n}",
          doc: "Function declaration",
        },
        {
          label: "func main",
          insertText: "func main() {\n\t${1}\n}",
          doc: "Main function",
        },
        {
          label: "func init",
          insertText: "func init() {\n\t${1}\n}",
          doc: "Init function – runs before main",
        },
        {
          label: "func method",
          insertText:
            "func (${1:r} *${2:Receiver}) ${3:Name}(${4}) ${5:error} {\n\t${6}\n}",
          doc: "Method with receiver",
        },
        {
          label: "func test",
          insertText: "func Test${1:Name}(t *testing.T) {\n\t${2}\n}",
          doc: "Test function",
        },
        {
          label: "func benchmark",
          insertText:
            "func Benchmark${1:Name}(b *testing.B) {\n\tfor i := 0; i < b.N; i++ {\n\t\t${2}\n\t}\n}",
          doc: "Benchmark function",
        },
        {
          label: "func closure",
          insertText: "func() {\n\t${1}\n}()",
          doc: "Immediately invoked function (closure)",
        },
        {
          label: "func handler",
          insertText:
            "func ${1:handler}(w http.ResponseWriter, r *http.Request) {\n\t${2}\n}",
          doc: "HTTP handler function",
        },
        {
          label: "if",
          insertText: "if ${1:condition} {\n\t${2}\n}",
          doc: "If statement",
        },
        {
          label: "ife",
          insertText: "if ${1:condition} {\n\t${2}\n} else {\n\t${3}\n}",
          doc: "If-else statement",
        },
        {
          label: "iferr",
          insertText: "if err != nil {\n\t${1:return err}\n}",
          doc: "If error check – idiomatic Go error handling",
        },
        {
          label: "iferr return",
          insertText: "if err != nil {\n\treturn ${1:nil, }err\n}",
          doc: "If error check with return",
        },
        {
          label: "iferr log.Fatal",
          insertText: "if err != nil {\n\tlog.Fatal(err)\n}",
          doc: "If error check with log.Fatal",
        },
        {
          label: "iferr panic",
          insertText: "if err != nil {\n\tpanic(err)\n}",
          doc: "If error check with panic",
        },
        {
          label: "iferr wrap",
          insertText:
            'if err != nil {\n\treturn fmt.Errorf("${1:failed to do something}: %w", err)\n}',
          doc: "If error check with error wrapping",
        },
        {
          label: "for",
          insertText:
            "for ${1:i} := ${2:0}; ${1:i} < ${3:n}; ${1:i}++ {\n\t${4}\n}",
          doc: "C-style for loop",
        },
        {
          label: "forr",
          insertText:
            "for ${1:i}, ${2:v} := range ${3:collection} {\n\t${4}\n}",
          doc: "For range loop",
        },
        {
          label: "for range",
          insertText:
            "for ${1:_}, ${2:v} := range ${3:collection} {\n\t${4}\n}",
          doc: "For range with underscore",
        },
        {
          label: "for infinite",
          insertText: "for {\n\t${1}\n}",
          doc: "Infinite loop",
        },
        {
          label: "for while",
          insertText: "for ${1:condition} {\n\t${2}\n}",
          doc: "While-style loop",
        },
        {
          label: "for select",
          insertText:
            "for {\n\tselect {\n\tcase ${1}:\n\t\t${2}\n\tdefault:\n\t\t${3}\n\t}\n}",
          doc: "For-select loop (event loop pattern)",
        },
        {
          label: "switch",
          insertText:
            "switch ${1:expression} {\ncase ${2:value}:\n\t${3}\ndefault:\n\t${4}\n}",
          doc: "Switch statement",
        },
        {
          label: "switch type",
          insertText:
            "switch ${1:v} := ${2:i}.(type) {\ncase ${3:string}:\n\t${4}\ndefault:\n\t${5}\n}",
          doc: "Type switch",
        },
        {
          label: "select",
          insertText: "select {\ncase ${1}:\n\t${2}\ndefault:\n\t${3}\n}",
          doc: "Select statement",
        },
        {
          label: "struct",
          insertText: "type ${1:Name} struct {\n\t${2:Field} ${3:Type}\n}",
          doc: "Struct type declaration",
        },
        {
          label: "interface",
          insertText:
            "type ${1:Name} interface {\n\t${2:Method}(${3}) ${4:error}\n}",
          doc: "Interface type declaration",
        },
        {
          label: "map",
          insertText: "map[${1:string}]${2:interface{}}{\n\t${3}\n}",
          doc: "Map literal",
        },
        {
          label: "make map",
          insertText: "make(map[${1:string}]${2:int})",
          doc: "Make map",
        },
        {
          label: "make slice",
          insertText: "make([]${1:int}, ${2:0}, ${3:10})",
          doc: "Make slice with length and capacity",
        },
        {
          label: "make chan",
          insertText: "make(chan ${1:int}${2:, ${3:1}})",
          doc: "Make channel (optionally buffered)",
        },
        {
          label: "goroutine",
          insertText: "go func() {\n\t${1}\n}()",
          doc: "Launch goroutine with anonymous function",
        },
        {
          label: "defer",
          insertText: "defer ${1:func() {\n\t${2}\n}()}",
          doc: "Defer statement",
        },
        {
          label: "defer close",
          insertText: "defer ${1:f}.Close()",
          doc: "Defer close (files, connections, etc.)",
        },
        {
          label: "defer unlock",
          insertText: "defer ${1:mu}.Unlock()",
          doc: "Defer mutex unlock",
        },
        {
          label: "var",
          insertText: "var ${1:name} ${2:Type}",
          doc: "Variable declaration",
        },
        {
          label: "var block",
          insertText: "var (\n\t${1:name} ${2:Type}\n)",
          doc: "Variable block declaration",
        },
        {
          label: "const",
          insertText: "const ${1:name} = ${2:value}",
          doc: "Constant declaration",
        },
        {
          label: "const block",
          insertText: "const (\n\t${1:name} = ${2:value}\n)",
          doc: "Constant block declaration",
        },
        {
          label: "const iota",
          insertText: "const (\n\t${1:Name} = iota\n\t${2}\n)",
          doc: "Const block with iota",
        },
        {
          label: "type alias",
          insertText: "type ${1:Name} = ${2:Type}",
          doc: "Type alias",
        },
        {
          label: "type def",
          insertText: "type ${1:Name} ${2:Type}",
          doc: "Type definition",
        },
        {
          label: "import",
          insertText: 'import (\n\t"${1:fmt}"\n)',
          doc: "Import block",
        },
        {
          label: "json tag",
          insertText: '`json:"${1:field_name}${2:,omitempty}"`',
          doc: "JSON struct tag",
        },
        {
          label: "http server",
          insertText:
            'http.HandleFunc("/${1}", func(w http.ResponseWriter, r *http.Request) {\n\t${2:fmt.Fprintf(w, "Hello!")}\n})\nlog.Fatal(http.ListenAndServe(":${3:8080}", nil))',
          doc: "Simple HTTP server",
        },
        {
          label: "error type",
          insertText:
            "type ${1:MyError} struct {\n\t${2:Msg string}\n}\n\nfunc (e *${1:MyError}) Error() string {\n\treturn e.${3:Msg}\n}",
          doc: "Custom error type implementing error interface",
        },
        {
          label: "stringer",
          insertText:
            'func (${1:r} ${2:Type}) String() string {\n\treturn ${3:fmt.Sprintf("%v", *${1:r})}\n}',
          doc: "Implement the Stringer interface",
        },
        {
          label: "table test",
          insertText:
            'tests := []struct {\n\tname string\n\t${1:input}  ${2:string}\n\t${3:want}   ${4:string}\n}{\n\t{name: "${5}", ${1}: ${6}, ${3}: ${7}},\n}\nfor _, tt := range tests {\n\tt.Run(tt.name, func(t *testing.T) {\n\t\t${8:got} := ${9}\n\t\tif ${8:got} != tt.${3:want} {\n\t\t\tt.Errorf("got %v, want %v", ${8:got}, tt.${3:want})\n\t\t}\n\t})\n}',
          doc: "Table-driven test pattern",
        },
        {
          label: "ctx timeout",
          insertText:
            "ctx, cancel := context.WithTimeout(context.Background(), ${1:5*time.Second})\ndefer cancel()\n${2}",
          doc: "Context with timeout",
        },
        {
          label: "waitgroup",
          insertText:
            "var wg sync.WaitGroup\nfor ${1:i} := 0; ${1:i} < ${2:n}; ${1:i}++ {\n\twg.Add(1)\n\tgo func() {\n\t\tdefer wg.Done()\n\t\t${3}\n\t}()\n}\nwg.Wait()",
          doc: "WaitGroup pattern for concurrent goroutines",
        },
        {
          label: "mutex",
          insertText:
            "var ${1:mu} sync.Mutex\n${1:mu}.Lock()\n${2}\n${1:mu}.Unlock()",
          doc: "Mutex lock/unlock pattern",
        },
        {
          label: "channel worker",
          insertText:
            "jobs := make(chan ${1:int}, ${2:100})\nresults := make(chan ${3:int}, ${2:100})\n\nfor w := 0; w < ${4:3}; w++ {\n\tgo func() {\n\t\tfor j := range jobs {\n\t\t\tresults <- ${5:j * 2}\n\t\t}\n\t}()\n}\n\nfor j := 0; j < ${2:100}; j++ {\n\tjobs <- j\n}\nclose(jobs)\n\nfor r := 0; r < ${2:100}; r++ {\n\t<-results\n}",
          doc: "Worker pool pattern with channels",
        },
      ];

      snippets.forEach((s) => {
        suggestions.push({
          label: s.label,
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: s.insertText,
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          detail: "Snippet",
          documentation: { value: s.doc },
          range: range,
          sortText: "1_" + s.label,
        });
      });

      // ── Keywords ────────────────────────────────────────────────
      const keywords = [
        "break",
        "case",
        "chan",
        "const",
        "continue",
        "default",
        "defer",
        "else",
        "fallthrough",
        "for",
        "func",
        "go",
        "goto",
        "if",
        "import",
        "interface",
        "map",
        "package",
        "range",
        "return",
        "select",
        "struct",
        "switch",
        "type",
        "var",
      ];
      keywords.forEach((k) => {
        suggestions.push({
          label: k,
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: k,
          detail: "keyword",
          range: range,
          sortText: "3_" + k,
        });
      });

      // ── Builtins ────────────────────────────────────────────────
      const builtins = [
        "append",
        "cap",
        "close",
        "complex",
        "copy",
        "delete",
        "imag",
        "len",
        "make",
        "new",
        "panic",
        "print",
        "println",
        "real",
        "recover",
        "clear",
        "min",
        "max",
      ];
      builtins.forEach((b) => {
        const info = hoverDocs[b];
        suggestions.push({
          label: b,
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: b + "(${1})",
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          detail: info ? info.detail : "builtin",
          documentation: info ? { value: info.doc } : undefined,
          range: range,
          sortText: "2_" + b,
        });
      });

      // ── Types ───────────────────────────────────────────────────
      const types = [
        "bool",
        "byte",
        "complex64",
        "complex128",
        "error",
        "float32",
        "float64",
        "int",
        "int8",
        "int16",
        "int32",
        "int64",
        "rune",
        "string",
        "uint",
        "uint8",
        "uint16",
        "uint32",
        "uint64",
        "uintptr",
        "any",
        "comparable",
      ];
      types.forEach((t) => {
        suggestions.push({
          label: t,
          kind: monaco.languages.CompletionItemKind.TypeParameter,
          insertText: t,
          detail: "type",
          range: range,
          sortText: "3_" + t,
        });
      });

      // ── Constants ───────────────────────────────────────────────
      ["true", "false", "nil", "iota"].forEach((c) => {
        suggestions.push({
          label: c,
          kind: monaco.languages.CompletionItemKind.Constant,
          insertText: c,
          detail: "constant",
          range: range,
          sortText: "3_" + c,
        });
      });

      // ── Symbols from current file ───────────────────────────────
      // Functions
      const funcRegex = /func\s+(\w+)\s*\(([^)]*)\)\s*([^{]*)/g;
      let match;
      while ((match = funcRegex.exec(fullText)) !== null) {
        if (match[1] !== "main" && match[1] !== "init") {
          suggestions.push({
            label: match[1],
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: match[1] + "(${1})",
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: `func ${match[1]}(${match[2]}) ${match[3].trim()}`,
            documentation: { value: "Defined in current file" },
            range: range,
            sortText: "0_" + match[1],
          });
        }
      }
      // Types
      const typeRegex = /type\s+(\w+)\s+(struct|interface)/g;
      while ((match = typeRegex.exec(fullText)) !== null) {
        suggestions.push({
          label: match[1],
          kind:
            match[2] === "struct"
              ? monaco.languages.CompletionItemKind.Struct
              : monaco.languages.CompletionItemKind.Interface,
          insertText: match[1],
          detail: `${match[2]} ${match[1]}`,
          documentation: { value: "Defined in current file" },
          range: range,
          sortText: "0_" + match[1],
        });
      }
      // Variables & constants
      const varRegex = /(?:var|const)\s+(\w+)\s+/g;
      while ((match = varRegex.exec(fullText)) !== null) {
        suggestions.push({
          label: match[1],
          kind: monaco.languages.CompletionItemKind.Variable,
          insertText: match[1],
          detail: "variable/constant",
          documentation: { value: "Defined in current file" },
          range: range,
          sortText: "0_" + match[1],
        });
      }
      // Short var declarations
      const shortVarRegex = /(\w+)\s*:=/g;
      while ((match = shortVarRegex.exec(fullText)) !== null) {
        if (!["err"].includes(match[1])) {
          suggestions.push({
            label: match[1],
            kind: monaco.languages.CompletionItemKind.Variable,
            insertText: match[1],
            detail: "local variable",
            range: range,
            sortText: "0_" + match[1],
          });
        }
      }

      // Deduplicate
      const seen = new Set();
      const unique = suggestions.filter((s) => {
        const key = s.label + s.kind;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      return { suggestions: unique };
    },
  });

  // ── Hover Provider ────────────────────────────────────────────────
  monaco.languages.registerHoverProvider("go", {
    provideHover: function (model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return null;
      const text = word.word;
      const fullText = model.getValue();

      // Check hover docs database
      if (hoverDocs[text]) {
        const info = hoverDocs[text];
        return {
          range: new monaco.Range(
            position.lineNumber,
            word.startColumn,
            position.lineNumber,
            word.endColumn,
          ),
          contents: [
            { value: "```go\n" + info.detail + "\n```" },
            { value: info.doc },
          ],
        };
      }

      // Check user-defined functions
      const funcRegex = new RegExp(
        `func\\s+(${text})\\s*\\(([^)]*)\\)\\s*([^{]*)\\{`,
      );
      const funcMatch = fullText.match(funcRegex);
      if (funcMatch) {
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
                "```go\nfunc " +
                funcMatch[1] +
                "(" +
                funcMatch[2] +
                ") " +
                funcMatch[3].trim() +
                "\n```",
            },
            { value: "Defined in current file" },
          ],
        };
      }

      // Check user-defined types
      const typeRegex = new RegExp(
        `type\\s+(${text})\\s+(struct|interface)\\s*\\{([^}]*)\\}`,
        "s",
      );
      const typeMatch = fullText.match(typeRegex);
      if (typeMatch) {
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
                "```go\ntype " +
                typeMatch[1] +
                " " +
                typeMatch[2] +
                " {\n" +
                typeMatch[3]
                  .split("\n")
                  .map((l) => "  " + l.trim())
                  .filter((l) => l.trim())
                  .join("\n") +
                "\n}\n```",
            },
            { value: "Defined in current file" },
          ],
        };
      }

      // Check user-defined variables
      const varRegex = new RegExp(
        `(?:var|const)\\s+(${text})\\s+([\\w\\[\\]\\*\\.]+)`,
      );
      const varMatch = fullText.match(varRegex);
      if (varMatch) {
        return {
          range: new monaco.Range(
            position.lineNumber,
            word.startColumn,
            position.lineNumber,
            word.endColumn,
          ),
          contents: [
            {
              value: "```go\nvar " + varMatch[1] + " " + varMatch[2] + "\n```",
            },
            { value: "Defined in current file" },
          ],
        };
      }

      // Check short variable declarations
      const shortVarRegex = new RegExp(`(${text})\\s*:=\\s*(.+)`);
      const shortVarMatch = fullText.match(shortVarRegex);
      if (shortVarMatch) {
        const assigned = shortVarMatch[2].trim().substring(0, 60);
        return {
          range: new monaco.Range(
            position.lineNumber,
            word.startColumn,
            position.lineNumber,
            word.endColumn,
          ),
          contents: [
            { value: "```go\n" + text + " := " + assigned + "\n```" },
            { value: "Local variable (inferred type)" },
          ],
        };
      }

      // Package hover
      const pkgInfo = stdPackages.find(
        (p) => p.name === text || p.name.split("/").pop() === text,
      );
      if (pkgInfo) {
        return {
          range: new monaco.Range(
            position.lineNumber,
            word.startColumn,
            position.lineNumber,
            word.endColumn,
          ),
          contents: [
            { value: "```go\npackage " + pkgInfo.name + "\n```" },
            { value: pkgInfo.doc },
          ],
        };
      }

      return null;
    },
  });

  // ── Definition Provider ───────────────────────────────────────────
  monaco.languages.registerDefinitionProvider("go", {
    provideDefinition: function (model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return null;
      const text = word.word;
      const fullText = model.getValue();
      const lines = fullText.split("\n");

      // Search for function definition
      for (let i = 0; i < lines.length; i++) {
        const funcMatch = lines[i].match(
          new RegExp(`func\\s+(${text})\\s*\\(`),
        );
        if (funcMatch) {
          return {
            uri: model.uri,
            range: new monaco.Range(
              i + 1,
              lines[i].indexOf(text) + 1,
              i + 1,
              lines[i].indexOf(text) + text.length + 1,
            ),
          };
        }
        // Method definition
        const methodMatch = lines[i].match(
          new RegExp(`func\\s*\\([^)]+\\)\\s+(${text})\\s*\\(`),
        );
        if (methodMatch) {
          const col = lines[i].indexOf(text, lines[i].indexOf(")"));
          return {
            uri: model.uri,
            range: new monaco.Range(
              i + 1,
              col + 1,
              i + 1,
              col + text.length + 1,
            ),
          };
        }
      }

      // Search for type definition
      for (let i = 0; i < lines.length; i++) {
        const typeMatch = lines[i].match(new RegExp(`type\\s+(${text})\\s+`));
        if (typeMatch) {
          const col = lines[i].indexOf(text, 4);
          return {
            uri: model.uri,
            range: new monaco.Range(
              i + 1,
              col + 1,
              i + 1,
              col + text.length + 1,
            ),
          };
        }
      }

      // Search for variable/const definition
      for (let i = 0; i < lines.length; i++) {
        const varMatch = lines[i].match(
          new RegExp(`(?:var|const)\\s+(${text})\\b`),
        );
        if (varMatch) {
          const col = lines[i].indexOf(text);
          return {
            uri: model.uri,
            range: new monaco.Range(
              i + 1,
              col + 1,
              i + 1,
              col + text.length + 1,
            ),
          };
        }
        // Short var declaration
        const shortMatch = lines[i].match(new RegExp(`(${text})\\s*:=`));
        if (shortMatch) {
          const col = lines[i].indexOf(text);
          return {
            uri: model.uri,
            range: new monaco.Range(
              i + 1,
              col + 1,
              i + 1,
              col + text.length + 1,
            ),
          };
        }
      }

      return null;
    },
  });

  // ── Signature Help Provider ───────────────────────────────────────
  monaco.languages.registerSignatureHelpProvider("go", {
    signatureHelpTriggerCharacters: ["(", ","],
    provideSignatureHelp: function (model, position) {
      const textUntilPosition = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });

      // Find the function call
      const callMatch = textUntilPosition.match(/(\w+)\s*\(([^)]*)$/);
      if (!callMatch) return null;

      const funcName = callMatch[1];
      const argsText = callMatch[2];
      const activeParam = (argsText.match(/,/g) || []).length;

      const sigDb = {
        append: {
          label: "func append(slice []T, elems ...T) []T",
          params: [
            { label: "slice []T", doc: "The slice to append to" },
            { label: "elems ...T", doc: "Elements to append" },
          ],
          doc: "Appends elements to a slice",
        },
        make: {
          label: "func make(t Type, size ...int) Type",
          params: [
            { label: "t Type", doc: "Type to make (slice, map, or chan)" },
            { label: "size ...int", doc: "Length and optional capacity" },
          ],
          doc: "Allocates and initializes slices, maps, and channels",
        },
        len: {
          label: "func len(v Type) int",
          params: [
            { label: "v Type", doc: "Array, slice, string, map, or channel" },
          ],
          doc: "Returns the length of v",
        },
        cap: {
          label: "func cap(v Type) int",
          params: [{ label: "v Type", doc: "Array, slice, or channel" }],
          doc: "Returns the capacity of v",
        },
        copy: {
          label: "func copy(dst, src []T) int",
          params: [
            { label: "dst []T", doc: "Destination slice" },
            { label: "src []T", doc: "Source slice" },
          ],
          doc: "Copies elements from src to dst",
        },
        delete: {
          label: "func delete(m map[K]V, key K)",
          params: [
            { label: "m map[K]V", doc: "The map" },
            { label: "key K", doc: "Key to delete" },
          ],
          doc: "Deletes element from map",
        },
        close: {
          label: "func close(c chan<- Type)",
          params: [{ label: "c chan<- Type", doc: "Channel to close" }],
          doc: "Closes a channel",
        },
        panic: {
          label: "func panic(v any)",
          params: [{ label: "v any", doc: "Value to panic with" }],
          doc: "Stops normal execution",
        },
        recover: {
          label: "func recover() any",
          params: [],
          doc: "Regains control of panicking goroutine",
        },
        new: {
          label: "func new(Type) *Type",
          params: [{ label: "Type", doc: "Type to allocate" }],
          doc: "Allocates zero value and returns pointer",
        },
        complex: {
          label: "func complex(r, i FloatType) ComplexType",
          params: [
            { label: "r FloatType", doc: "Real part" },
            { label: "i FloatType", doc: "Imaginary part" },
          ],
          doc: "Constructs a complex value",
        },
        real: {
          label: "func real(c ComplexType) FloatType",
          params: [{ label: "c ComplexType", doc: "Complex number" }],
          doc: "Returns real part",
        },
        imag: {
          label: "func imag(c ComplexType) FloatType",
          params: [{ label: "c ComplexType", doc: "Complex number" }],
          doc: "Returns imaginary part",
        },
        print: {
          label: "func print(args ...Type)",
          params: [{ label: "args ...Type", doc: "Values to print" }],
          doc: "Prints to stderr",
        },
        println: {
          label: "func println(args ...Type)",
          params: [{ label: "args ...Type", doc: "Values to print" }],
          doc: "Prints to stderr with newline",
        },
        Println: {
          label: "func fmt.Println(a ...any) (n int, err error)",
          params: [{ label: "a ...any", doc: "Values to print" }],
          doc: "Prints to stdout with newline",
        },
        Printf: {
          label: "func fmt.Printf(format string, a ...any) (n int, err error)",
          params: [
            { label: "format string", doc: "Format string" },
            { label: "a ...any", doc: "Values" },
          ],
          doc: "Prints formatted output to stdout",
        },
        Sprintf: {
          label: "func fmt.Sprintf(format string, a ...any) string",
          params: [
            { label: "format string", doc: "Format string" },
            { label: "a ...any", doc: "Values" },
          ],
          doc: "Returns formatted string",
        },
        Errorf: {
          label: "func fmt.Errorf(format string, a ...any) error",
          params: [
            { label: "format string", doc: "Format string" },
            { label: "a ...any", doc: "Values" },
          ],
          doc: "Returns formatted error",
        },
      };

      const sig = sigDb[funcName];
      if (!sig) return null;

      return {
        value: {
          signatures: [
            {
              label: sig.label,
              documentation: sig.doc,
              parameters: sig.params,
            },
          ],
          activeSignature: 0,
          activeParameter: Math.min(activeParam, sig.params.length - 1),
        },
        dispose: () => {},
      };
    },
  });

  // ── Document Symbol Provider ──────────────────────────────────────
  monaco.languages.registerDocumentSymbolProvider("go", {
    provideDocumentSymbols: function (model) {
      const symbols = [];
      const lines = model.getValue().split("\n");

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Functions
        let match = line.match(/func\s+(\w+)\s*\(/);
        if (match) {
          symbols.push({
            name: match[1],
            kind: monaco.languages.SymbolKind.Function,
            range: new monaco.Range(i + 1, 1, i + 1, line.length + 1),
            selectionRange: new monaco.Range(
              i + 1,
              line.indexOf(match[1]) + 1,
              i + 1,
              line.indexOf(match[1]) + match[1].length + 1,
            ),
          });
        }

        // Methods
        match = line.match(/func\s*\([^)]+\)\s+(\w+)\s*\(/);
        if (match) {
          symbols.push({
            name: match[1],
            kind: monaco.languages.SymbolKind.Method,
            range: new monaco.Range(i + 1, 1, i + 1, line.length + 1),
            selectionRange: new monaco.Range(
              i + 1,
              line.indexOf(match[1]) + 1,
              i + 1,
              line.indexOf(match[1]) + match[1].length + 1,
            ),
          });
        }

        // Types
        match = line.match(/type\s+(\w+)\s+(struct|interface)/);
        if (match) {
          symbols.push({
            name: match[1],
            kind:
              match[2] === "struct"
                ? monaco.languages.SymbolKind.Struct
                : monaco.languages.SymbolKind.Interface,
            range: new monaco.Range(i + 1, 1, i + 1, line.length + 1),
            selectionRange: new monaco.Range(
              i + 1,
              line.indexOf(match[1]) + 1,
              i + 1,
              line.indexOf(match[1]) + match[1].length + 1,
            ),
          });
        }

        // Variables
        match = line.match(/var\s+(\w+)\s+/);
        if (match) {
          symbols.push({
            name: match[1],
            kind: monaco.languages.SymbolKind.Variable,
            range: new monaco.Range(i + 1, 1, i + 1, line.length + 1),
            selectionRange: new monaco.Range(
              i + 1,
              line.indexOf(match[1]) + 1,
              i + 1,
              line.indexOf(match[1]) + match[1].length + 1,
            ),
          });
        }

        // Constants
        match = line.match(/const\s+(\w+)\s*/);
        if (match) {
          symbols.push({
            name: match[1],
            kind: monaco.languages.SymbolKind.Constant,
            range: new monaco.Range(i + 1, 1, i + 1, line.length + 1),
            selectionRange: new monaco.Range(
              i + 1,
              line.indexOf(match[1]) + 1,
              i + 1,
              line.indexOf(match[1]) + match[1].length + 1,
            ),
          });
        }
      }

      return symbols;
    },
  });

  // ── Folding Range Provider ────────────────────────────────────────
  monaco.languages.registerFoldingRangeProvider("go", {
    provideFoldingRanges: function (model) {
      const ranges = [];
      const lines = model.getValue().split("\n");
      const stack = [];

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        for (let j = 0; j < line.length; j++) {
          if (line[j] === "{") {
            stack.push(i);
          } else if (line[j] === "}") {
            if (stack.length > 0) {
              const start = stack.pop();
              if (i > start) {
                ranges.push({
                  start: start + 1,
                  end: i + 1,
                  kind: monaco.languages.FoldingRangeKind.Region,
                });
              }
            }
          }
        }
        // Block comments
        if (line.includes("/*") && !line.includes("*/")) {
          stack.push({ type: "comment", line: i });
        }
        if (
          line.includes("*/") &&
          stack.length > 0 &&
          stack[stack.length - 1].type === "comment"
        ) {
          const start = stack.pop();
          ranges.push({
            start: start.line + 1,
            end: i + 1,
            kind: monaco.languages.FoldingRangeKind.Comment,
          });
        }
        // Import blocks
        if (/^import\s*\(/.test(line.trim())) {
          for (let k = i + 1; k < lines.length; k++) {
            if (lines[k].includes(")")) {
              ranges.push({
                start: i + 1,
                end: k + 1,
                kind: monaco.languages.FoldingRangeKind.Imports,
              });
              break;
            }
          }
        }
      }

      return ranges;
    },
  });
};
