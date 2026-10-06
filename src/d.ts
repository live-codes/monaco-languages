import type * as Monaco from "monaco-editor";

export default (monaco: typeof Monaco) => {
  const D_LANG_ID = "d";

  const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // ── Language knowledge ───────────────────────────────────────────

  const D_KEYWORDS = [
    "abstract",
    "alias",
    "align",
    "asm",
    "assert",
    "auto",
    "body",
    "break",
    "case",
    "cast",
    "catch",
    "class",
    "const",
    "continue",
    "debug",
    "default",
    "delegate",
    "delete",
    "deprecated",
    "do",
    "else",
    "enum",
    "export",
    "extern",
    "final",
    "finally",
    "for",
    "foreach",
    "foreach_reverse",
    "function",
    "goto",
    "if",
    "immutable",
    "import",
    "in",
    "inout",
    "interface",
    "invariant",
    "is",
    "lazy",
    "macro",
    "mixin",
    "module",
    "new",
    "nothrow",
    "null",
    "out",
    "override",
    "package",
    "pragma",
    "private",
    "protected",
    "public",
    "pure",
    "ref",
    "return",
    "scope",
    "shared",
    "static",
    "struct",
    "super",
    "switch",
    "synchronized",
    "template",
    "this",
    "throw",
    "try",
    "typeid",
    "typeof",
    "typedef",
    "union",
    "unittest",
    "version",
    "while",
    "with",
    "__gshared",
    "__traits",
    "__vector",
    "__parameters",
    "__DATE__",
    "__EOF__",
    "__FILE__",
    "__FILE_FULL_PATH__",
    "__FUNCTION__",
    "__LINE__",
    "__MODULE__",
    "__PRETTY_FUNCTION__",
    "__TIME__",
    "__TIMESTAMP__",
    "__VENDOR__",
    "__VERSION__",
  ];

  const D_TYPES = [
    "bool",
    "byte",
    "ubyte",
    "short",
    "ushort",
    "int",
    "uint",
    "long",
    "ulong",
    "cent",
    "ucent",
    "float",
    "double",
    "real",
    "ifloat",
    "idouble",
    "ireal",
    "cfloat",
    "cdouble",
    "creal",
    "char",
    "wchar",
    "dchar",
    "void",
    "string",
    "wstring",
    "dstring",
    "size_t",
    "ptrdiff_t",
    "intptr_t",
    "uintptr_t",
  ];

  const D_CONSTANTS = ["true", "false", "null"];

  const D_ATTRIBUTES = [
    "@safe",
    "@trusted",
    "@system",
    "@nogc",
    "@property",
    "@disable",
    "@override",
    "@final",
    "@const",
    "@immutable",
    "@shared",
    "@inout",
    "@live",
    "@generated",
    "@notnull",
    "@future",
    "@selector",
    "@__gshared",
  ];

  const KEYWORD_DOCS: Record<string, { sig: string; doc: string }> = {
    auto: {
      sig: "auto name = initializer;",
      doc: "Infers the type of a variable from its initializer.",
    },
    const: {
      sig: "const name = value;",
      doc: "A constant value or a read-only view. `const` can be applied to variables, types and functions.",
    },
    immutable: {
      sig: "immutable name = value;",
      doc: "A value that can never be modified. Immutable data is implicitly shared between threads.",
    },
    shared: {
      sig: "shared int counter;",
      doc: "Marks a variable as shared between threads. Access requires synchronization.",
    },
    static: {
      sig: "static int counter;",
      doc: "Static storage duration: the variable lives for the whole program. Inside a type it is per-type.",
    },
    struct: {
      sig: "struct Name { fields; }",
      doc: "Declares a value type with value semantics. Copying a struct copies its fields.",
    },
    class: {
      sig: "class Name : Base { members; }",
      doc: "Declares a reference type allocated on the GC heap. Classes support inheritance and interfaces.",
    },
    interface: {
      sig: "interface Name { methods; }",
      doc: "Declares an abstract interface that classes can implement.",
    },
    union: {
      sig: "union Name { fields; }",
      doc: "Declares a type whose fields share the same memory.",
    },
    enum: {
      sig: "enum Name { A, B, C }",
      doc: "Declares an enumeration. A manifest constant `enum x = 5;` is also supported.",
    },
    template: {
      sig: "template Name(T) { ... }",
      doc: "Declares a compile-time template. Templates are used for generic programming.",
    },
    mixin: {
      sig: "mixin(expression);",
      doc: "Textually inserts generated code at compile time, or applies a mixin template.",
    },
    alias: {
      sig: "alias NewName = OldType;",
      doc: "Creates a symbol alias for a type, function or value.",
    },
    typeof: {
      sig: "typeof(expression)",
      doc: "Yields the type of an expression at compile time.",
    },
    typeid: {
      sig: "typeid(type)",
      doc: "Returns a `TypeInfo` object describing a type at runtime.",
    },
    pragma: {
      sig: 'pragma(msg, "text")',
      doc: "Compile-time pragma. Common forms: `pragma(msg, ...)`, `pragma(inline, true)`, `pragma(lib, ...)`.",
    },
    unittest: {
      sig: "unittest { ... }",
      doc: "Declares a unit test block, run with `dmd -unittest`.",
    },
    version: {
      sig: "version(identifier) { ... }",
      doc: "Conditional compilation based on a predefined or user-supplied version identifier.",
    },
    debug: {
      sig: "debug { ... }",
      doc: "Conditional compilation enabled with `-debug`.",
    },
    scope: {
      sig: "scope(exit) statement;",
      doc: "Scope guard (`exit`, `success`, `failure`) or a storage class that limits a variable's lifetime.",
    },
    foreach: {
      sig: "foreach (element; range) { ... }",
      doc: "Iterates over arrays, ranges, associative arrays and other iterable types.",
    },
    foreach_reverse: {
      sig: "foreach_reverse (element; range) { ... }",
      doc: "Iterates over a range in reverse order.",
    },
    in: {
      sig: "in",
      doc: "Parameter storage class (read-only), a contract block, or the associative-array membership operator.",
    },
    out: {
      sig: "out (result) { assert(result); }",
      doc: "Function post-condition contract, or an output parameter storage class.",
    },
    ref: {
      sig: "void f(ref int x)",
      doc: "Passes a parameter by reference.",
    },
    lazy: {
      sig: "void f(lazy int x)",
      doc: "Passes a parameter lazily: the argument is evaluated only if and when it is used.",
    },
    pure: {
      sig: "pure int f(int x)",
      doc: "A function with no side effects other than through its parameters and return value.",
    },
    nothrow: {
      sig: "nothrow void f()",
      doc: "Guarantees the function never throws an exception.",
    },
    invariant: {
      sig: "invariant { assert(condition); }",
      doc: "Class/struct invariant, checked before and after public methods.",
    },
    synchronized: {
      sig: "synchronized (obj) { ... }",
      doc: "Mutual-exclusion block, or a method marked as automatically synchronized.",
    },
    with: {
      sig: "with (object) { ... }",
      doc: "Brings the members of an object or enum into scope for the enclosed block.",
    },
    is: {
      sig: "is(T == int)",
      doc: "Compile-time type comparison expression. Also the identity operator for class references.",
    },
    cast: {
      sig: "cast(int) value",
      doc: "Converts a value between types, including pointer and reference casts.",
    },
  };

  const BUILTIN_DOCS: Record<
    string,
    { sig: string; doc: string; module?: string }
  > = {
    writeln: {
      sig: "void writeln(T...)(T args)",
      doc: "Writes its arguments to `stdout`, followed by a newline.",
      module: "std.stdio",
    },
    write: {
      sig: "void write(T...)(T args)",
      doc: "Writes its arguments to `stdout` without a trailing newline.",
      module: "std.stdio",
    },
    writef: {
      sig: "void writef(Char, A...)(in Char[] fmt, A args)",
      doc: "Formatted write to `stdout`, without a trailing newline.",
      module: "std.stdio",
    },
    writefln: {
      sig: "void writefln(Char, A...)(in Char[] fmt, A args)",
      doc: "Formatted write to `stdout` followed by a newline.",
      module: "std.stdio",
    },
    readln: {
      sig: "S readln(S = string)(dchar terminator = '\\n')",
      doc: "Reads a line from `stdin` and returns it as a string.",
      module: "std.stdio",
    },
    readf: {
      sig: "uint readf(A...)(in char[] fmt, A args)",
      doc: "Formatted read from `stdin` into the given arguments.",
      module: "std.stdio",
    },
    format: {
      sig: "string format(Char, Args...)(in Char[] fmt, Args args)",
      doc: "Formats its arguments and returns the result as a string.",
      module: "std.format",
    },
    to: {
      sig: "T to(T, S)(S value)",
      doc: "Converts a value to type `T`. `to!string(42)` yields `\"42\"`.",
      module: "std.conv",
    },
    text: {
      sig: "string text(T...)(T args)",
      doc: "Converts its arguments to strings and concatenates them.",
      module: "std.conv",
    },
    parse: {
      sig: "T parse(T, S)(S s)",
      doc: "Parses a value of type `T` from a string, throwing `ConvException` on failure.",
      module: "std.conv",
    },
    map: {
      sig: "auto map(Range)(Range r)",
      doc: "Lazily applies a function to every element of a range (`std.algorithm.iteration`).",
      module: "std.algorithm",
    },
    filter: {
      sig: "auto filter(Range)(Range r)",
      doc: "Lazily keeps only the elements for which the predicate is true.",
      module: "std.algorithm",
    },
    reduce: {
      sig: "auto reduce(Range, E)(E seed, Range r)",
      doc: "Left-folds a range into a single value using a binary function.",
      module: "std.algorithm",
    },
    fold: {
      sig: "auto fold(Range, E)(E seed, Range r)",
      doc: "Like `reduce` but the initial seed comes first and is returned unchanged for empty ranges.",
      module: "std.algorithm",
    },
    sort: {
      sig: "void sort(Range)(Range r)",
      doc: "Sorts a range in place using `opCmp` (or a supplied predicate).",
      module: "std.algorithm",
    },
    joiner: {
      sig: "auto joiner(RoR, Separator)(RoR r, Separator sep)",
      doc: "Lazily flattens a range of ranges, inserting a separator between them.",
      module: "std.algorithm",
    },
    splitter: {
      sig: "auto splitter(Range, Separator)(Range r, Separator sep)",
      doc: "Lazily splits a range on a separator.",
      module: "std.algorithm",
    },
    find: {
      sig: "InputRange find(alias pred = \"a == b\")(InputRange haystack, Needle needle)",
      doc: "Returns the portion of a range starting at the first match.",
      module: "std.algorithm",
    },
    count: {
      sig: "size_t count(Range)(Range r)",
      doc: "Counts the elements of a range that satisfy a predicate.",
      module: "std.algorithm",
    },
    countUntil: {
      sig: "ptrdiff_t countUntil(Range, Needle)(Range haystack, Needle needle)",
      doc: "Returns the number of elements before the first match, or -1.",
      module: "std.algorithm",
    },
    any: {
      sig: "bool any(Range)(Range r)",
      doc: "Returns true if the predicate is true for any element of the range.",
      module: "std.algorithm",
    },
    all: {
      sig: "bool all(Range)(Range r)",
      doc: "Returns true if the predicate is true for every element of the range.",
      module: "std.algorithm",
    },
    sum: {
      sig: "auto sum(Range)(Range r)",
      doc: "Returns the sum of the elements of a range.",
      module: "std.algorithm",
    },
    min: {
      sig: "auto min(T...)(T args)",
      doc: "Returns the smallest of its arguments (or the minimum element with a range).",
      module: "std.algorithm",
    },
    max: {
      sig: "auto max(T...)(T args)",
      doc: "Returns the largest of its arguments (or the maximum element with a range).",
      module: "std.algorithm",
    },
    array: {
      sig: "auto array(Range)(Range r)",
      doc: "Eagerly copies a range into a newly allocated array.",
      module: "std.array",
    },
    filterMap: {
      sig: "auto filterMap(Range, MapFun)(Range r, MapFun mapFun)",
      doc: "Combines `filter` and `map` in a single lazy pass.",
      module: "std.algorithm",
    },
    join: {
      sig: "auto join(Range)(Range r, string sep = null)",
      doc: "Flattens a range, inserting an optional separator between elements.",
      module: "std.array",
    },
    replace: {
      sig: "string replace(string s, string from, string to)",
      doc: "Returns a copy of `s` with all occurrences of `from` replaced by `to`.",
      module: "std.string",
    },
    replaceFirst: {
      sig: "string replaceFirst(string s, string from, string to)",
      doc: "Replaces the first occurrence of `from` in `s`.",
      module: "std.string",
    },
    split: {
      sig: "string[] split(string s, char sep = ' ')",
      doc: "Eagerly splits a string into an array of substrings.",
      module: "std.string",
    },
    strip: {
      sig: "auto strip(Range)(Range str)",
      doc: "Removes leading and trailing whitespace.",
      module: "std.string",
    },
    stripLeft: {
      sig: "auto stripLeft(Range)(Range str)",
      doc: "Removes leading whitespace.",
      module: "std.string",
    },
    stripRight: {
      sig: "auto stripRight(Range)(Range str)",
      doc: "Removes trailing whitespace.",
      module: "std.string",
    },
    toUpper: {
      sig: "auto toUpper(Range)(Range s)",
      doc: "Converts a string or range to upper case.",
      module: "std.string",
    },
    toLower: {
      sig: "auto toLower(Range)(Range s)",
      doc: "Converts a string or range to lower case.",
      module: "std.string",
    },
    startsWith: {
      sig: "bool startsWith(Range)(Range r, Elem e)",
      doc: "Returns true if the range begins with the given element(s).",
      module: "std.algorithm",
    },
    endsWith: {
      sig: "bool endsWith(Range)(Range r, Elem e)",
      doc: "Returns true if the range ends with the given element(s).",
      module: "std.algorithm",
    },
    indexOf: {
      sig: "ptrdiff_t indexOf(Range)(Range s, Element e)",
      doc: "Returns the index of the first occurrence, or -1.",
      module: "std.algorithm",
    },
    iota: {
      sig: "auto iota(B, E)(B begin, E end)",
      doc: "Creates a lazy range of consecutive values.",
      module: "std.range",
    },
    repeat: {
      sig: "auto repeat(T)(T value, size_t n = size_t.max)",
      doc: "Creates a lazy range that repeats a value `n` times.",
      module: "std.range",
    },
    take: {
      sig: "auto take(R)(R r, size_t n)",
      doc: "Takes the first `n` elements of a range lazily.",
      module: "std.range",
    },
    drop: {
      sig: "auto drop(R)(R r, size_t n)",
      doc: "Skips the first `n` elements of a range lazily.",
      module: "std.range",
    },
    chain: {
      sig: "auto chain(Ranges...)(Ranges rs)",
      doc: "Concatenates ranges lazily.",
      module: "std.range",
    },
    zip: {
      sig: "auto zip(Ranges...)(Ranges ranges)",
      doc: "Iterates over multiple ranges in lockstep, yielding tuples.",
      module: "std.range",
    },
    enumerate: {
      sig: "auto enumerate(Range)(Range r)",
      doc: "Pairs each element with its index.",
      module: "std.range",
    },
    sqrt: {
      sig: "real sqrt(real x)",
      doc: "Returns the square root of `x`.",
      module: "std.math",
    },
    pow: {
      sig: "T pow(T)(T x, uint n)",
      doc: "Raises `x` to the integer power `n`.",
      module: "std.math",
    },
    abs: {
      sig: "auto abs(Num)(Num x)",
      doc: "Returns the absolute value of a number.",
      module: "std.math",
    },
    floor: {
      sig: "real floor(real x)",
      doc: "Rounds `x` down to the nearest integer.",
      module: "std.math",
    },
    ceil: {
      sig: "real ceil(real x)",
      doc: "Rounds `x` up to the nearest integer.",
      module: "std.math",
    },
    round: {
      sig: "real round(real x)",
      doc: "Rounds `x` to the nearest integer.",
      module: "std.math",
    },
    sin: {
      sig: "real sin(real x)",
      doc: "Returns the sine of `x` (radians).",
      module: "std.math",
    },
    cos: {
      sig: "real cos(real x)",
      doc: "Returns the cosine of `x` (radians).",
      module: "std.math",
    },
    log: {
      sig: "real log(real x)",
      doc: "Returns the natural logarithm of `x`.",
      module: "std.math",
    },
    isNaN: {
      sig: "bool isNaN(X)(X x)",
      doc: "Returns true if `x` is NaN.",
      module: "std.math",
    },
    dup: {
      sig: "auto dup(T)(T[] a)",
      doc: "Copies an array, allocating a fresh one (`.dup` property).",
    },
    idup: {
      sig: "immutable(T)[] idup(T)(T[] a)",
      doc: "Copies an array into an immutable array (`.idup` property).",
    },
    keys: {
      sig: "auto keys(T)(T aa)",
      doc: "Returns the keys of an associative array as a dynamic array.",
    },
    values: {
      sig: "auto values(T)(T aa)",
      doc: "Returns the values of an associative array as a dynamic array.",
    },
    byKey: {
      sig: "auto byKey(T)(T aa)",
      doc: "Returns a lazy range over the keys of an associative array.",
    },
    byValue: {
      sig: "auto byValue(T)(T aa)",
      doc: "Returns a lazy range over the values of an associative array.",
    },
    byPair: {
      sig: "auto byPair(T)(T aa)",
      doc: "Returns a lazy range of key/value tuples.",
    },
    enforce: {
      sig: "T enforce(T)(T value, lazy string msg = null)",
      doc: "Returns `value` if it is truthy, otherwise throws an `Exception`.",
      module: "std.exception",
    },
    assumeUnique: {
      sig: "immutable(T)[] assumeUnique(T)(T[] a)",
      doc: "Casts a mutable array to immutable without copying, trusting the caller.",
      module: "std.exception",
    },
    readText: {
      sig: "S readText(S = string)(in char[] name)",
      doc: "Reads the entire contents of a file into a string.",
      module: "std.file",
    },
    writeFile: {
      sig: "void write(in char[] name, const void[] data)",
      doc: "Writes data to a file, creating or truncating it (`std.file.write`).",
      module: "std.file",
    },
    exists: {
      sig: "bool exists(in char[] name)",
      doc: "Returns true if the file or directory exists.",
      module: "std.file",
    },
    dirEntries: {
      sig: "auto dirEntries(string path, SpanMode mode, bool followSymlink = true)",
      doc: "Returns a lazy range of directory entries.",
      module: "std.file",
    },
    spawn: {
      sig: "P spawn(ARGS...)(ARGS args)",
      doc: "Starts a child process (via `std.process`).",
      module: "std.process",
    },
    execute: {
      sig: "auto execute(const(char)[] command, ...)",
      doc: "Runs a shell command and returns its output and exit code.",
      module: "std.process",
    },
  };

  const MODULES: Record<
    string,
    { doc: string; members: string[] }
  > = {
    "std.stdio": {
      doc: "Core I/O: console, files and line reading.",
      members: [
        "writeln",
        "write",
        "writef",
        "writefln",
        "readln",
        "readf",
        "read",
        "File",
        "open",
        "lines",
        "stdin",
        "stdout",
        "stderr",
      ],
    },
    "std.algorithm": {
      doc: "Generic algorithms that operate on ranges.",
      members: [
        "map",
        "filter",
        "filterBidirectional",
        "reduce",
        "fold",
        "sort",
        "schwartzSort",
        "isSorted",
        "reverse",
        "find",
        "canFind",
        "count",
        "countUntil",
        "min",
        "max",
        "minElement",
        "maxElement",
        "sum",
        "any",
        "all",
        "each",
        "startsWith",
        "endsWith",
        "splitter",
        "joiner",
        "group",
        "uniq",
        "chunkBy",
        "cartesianProduct",
        "copy",
        "fill",
        "remove",
        "swapAt",
        "cmp",
        "equal",
        "clamp",
      ],
    },
    "std.array": {
      doc: "Utility functions for built-in arrays and associative arrays.",
      members: [
        "array",
        "appender",
        "insert",
        "insertAfter",
        "join",
        "replace",
        "replaceFirst",
        "replaceLast",
        "split",
        "staticArray",
        "replicate",
        "empty",
        "front",
        "back",
        "popFront",
        "popBack",
      ],
    },
    "std.string": {
      doc: "String manipulation functions.",
      members: [
        "toUpper",
        "toLower",
        "capitalize",
        "strip",
        "stripLeft",
        "stripRight",
        "chomp",
        "chompPrefix",
        "split",
        "splitLines",
        "join",
        "replace",
        "replaceFirst",
        "replaceLast",
        "indexOf",
        "lastIndexOf",
        "format",
        "toStringz",
        "fromStringz",
        "startsWith",
        "endsWith",
        "count",
        "translate",
        "isNumeric",
        "isAlpha",
        "isWhite",
      ],
    },
    "std.conv": {
      doc: "Conversions between values and their string representations.",
      members: [
        "to",
        "text",
        "parse",
        "toChars",
        "toString",
        "toWstring",
        "toDstring",
        "octal",
        "hexString",
        "bin",
        "format",
        "convException",
      ],
    },
    "std.math": {
      doc: "Mathematical functions and constants.",
      members: [
        "sqrt",
        "cbrt",
        "pow",
        "abs",
        "fabs",
        "sin",
        "cos",
        "tan",
        "asin",
        "acos",
        "atan",
        "atan2",
        "sinh",
        "cosh",
        "tanh",
        "exp",
        "log",
        "log2",
        "log10",
        "floor",
        "ceil",
        "round",
        "trunc",
        "fmod",
        "hypot",
        "isNaN",
        "isInfinity",
        "isFinite",
        "PI",
        "E",
        "LN2",
        "LN10",
        "LOG2",
        "LOG10",
        "SQRT2",
        "tgamma",
        "lgamma",
      ],
    },
    "std.range": {
      doc: "Building blocks for creating and composing lazy ranges.",
      members: [
        "iota",
        "repeat",
        "generate",
        "take",
        "takeExactly",
        "drop",
        "dropBack",
        "chain",
        "retro",
        "cycle",
        "zip",
        "chunks",
        "stride",
        "transposed",
        "tee",
        "padLeft",
        "padRight",
        "replicate",
        "empty",
        "front",
        "back",
        "popFront",
        "popBack",
        "isInputRange",
        "isForwardRange",
        "isRandomAccessRange",
      ],
    },
    "std.typecons": {
      doc: "Utility templates for creating new types.",
      members: [
        "Nullable",
        "tuple",
        "Tuple",
        "Rebindable",
        "Flag",
        "ScopeGuard",
        "Unique",
        "RefCounted",
        "scoped",
        "Unqual",
        "AliasSeq",
        "blackHole",
        "WhiteHole",
        "Typedef",
      ],
    },
    "std.exception": {
      doc: "Functions for working with exceptions.",
      members: [
        "enforce",
        "assumeUnique",
        "ErrnoException",
        "collectException",
        "assertThrown",
        "doesPointTo",
        "ifThrown",
        "handle",
      ],
    },
    "std.file": {
      doc: "File and directory operations.",
      members: [
        "readText",
        "read",
        "write",
        "append",
        "exists",
        "getSize",
        "getTimes",
        "remove",
        "rename",
        "copy",
        "mkdir",
        "mkdirRecurse",
        "rmdir",
        "rmdirRecurse",
        "dirEntries",
        "isFile",
        "isDir",
        "timeLastModified",
        "SpanMode",
        "setTimes",
        "getcwd",
        "chdir",
        "thisExePath",
      ],
    },
    "std.path": {
      doc: "Path manipulation routines.",
      members: [
        "buildPath",
        "buildNormalizedPath",
        "pathSplitter",
        "join",
        "baseName",
        "dirName",
        "extension",
        "stripExtension",
        "setExtension",
        "defaultExtension",
        "driveName",
        "rootName",
        "filename",
        "expandTilde",
        "absolutePath",
        "relativePath",
        "asNormalizedPath",
        "canonicalPath",
        "isAbsolute",
        "isRooted",
        "isValidPath",
        "globMatch",
        "pathSeparator",
        "dirSeparator",
      ],
    },
    "std.datetime": {
      doc: "Date and time types and functions.",
      members: [
        "SysTime",
        "Date",
        "DateTime",
        "TimeOfDay",
        "Duration",
        "Clock",
        "StopWatch",
        "weeks",
        "days",
        "hours",
        "minutes",
        "seconds",
        "msecs",
        "usecs",
        "nsecs",
        "hnsecs",
        "UTC",
        "LocalTime",
        "Month",
        "Weekday",
        "DateException",
      ],
    },
    "std.json": {
      doc: "JSON parsing and serialization.",
      members: [
        "parseJSON",
        "toJSON",
        "JSONValue",
        "JSON_TYPE",
        "JSONOptions",
        "JSONException",
      ],
    },
    "std.regex": {
      doc: "Regular expression matching.",
      members: [
        "regex",
        "ctRegex",
        "matchFirst",
        "matchAll",
        "replaceAll",
        "replaceFirst",
        "split",
        "Regex",
        "Captures",
        "Match",
        "RegexMatch",
      ],
    },
    "std.format": {
      doc: "String formatting.",
      members: [
        "format",
        "formattedWrite",
        "formatValue",
        "formatElement",
        "FormatSpec",
        "FormatException",
      ],
    },
    "std.traits": {
      doc: "Compile-time reflection over types and symbols.",
      members: [
        "isIntegral",
        "isFloatingPoint",
        "isArithmetic",
        "isSomeString",
        "isAssociativeArray",
        "isArray",
        "isPointer",
        "isDynamicArray",
        "isStaticArray",
        "isDelegate",
        "isFunction",
        "isClass",
        "isInterface",
        "isStruct",
        "isEnum",
        "isAggregateType",
        "isMutable",
        "isImmutable",
        "isConst",
        "isShared",
        "Unqual",
        "PointerTarget",
        "KeyType",
        "ValueType",
        "ElementType",
        "ForeachType",
        "ReturnType",
        "ParameterTypeTuple",
        "Parameters",
        "FieldTypeTuple",
        "Fields",
        "hasMember",
        "isCallable",
        "mangledName",
        "fullyQualifiedName",
        "packageName",
        "moduleName",
        "identifier",
      ],
    },
    "std.meta": {
      doc: "Compile-time metaprogramming helpers over type sequences.",
      members: [
        "AliasSeq",
        "Alias",
        "staticMap",
        "staticSort",
        "Filter",
        "Reverse",
        "Repeat",
        "Replace",
        "Erase",
        "EraseAll",
        "staticIndexOf",
        "IndexOf",
        "Map",
        "ApplyLeft",
        "ApplyRight",
        "templateAnd",
        "templateOr",
        "templateNot",
        "allSatisfy",
        "anySatisfy",
        "aliasSeqOf",
        "aliasTuple",
        "staticIsExpressions",
      ],
    },
    "std.parallelism": {
      doc: "Parallelism primitives built on tasks and thread pools.",
      members: [
        "taskPool",
        "TaskPool",
        "parallel",
        "amap",
        "map",
        "reduce",
        "Task",
        "totalCPUs",
        "defaultPoolThreads",
      ],
    },
    "std.random": {
      doc: "Pseudo-random number generation.",
      members: [
        "uniform",
        "uniform01",
        "randomSample",
        "randomShuffle",
        "choice",
        "dice",
        "rand",
        "rndGen",
        "Random",
        "RandomCover",
        "RandomSample",
        "unpredictableSeed",
        "Mt19937",
        "MinstdRand",
      ],
    },
    "std.functional": {
      doc: "Higher-order functions and function composition.",
      members: [
        "pipe",
        "compose",
        "partial",
        "curry",
        "reverseArgs",
        "toDelegate",
        "memoize",
        "unaryFun",
        "binaryFun",
        "not",
      ],
    },
    "std.uni": {
      doc: "Unicode algorithms and character classification.",
      members: [
        "toLower",
        "toUpper",
        "isAlpha",
        "isDigit",
        "isWhite",
        "isSpace",
        "isPunctuation",
        "Grapheme",
        "byGrapheme",
        "byCodePoint",
        "byCodeUnit",
        "normalize",
        "icmp",
        "sicmp",
        "toLowerInPlace",
        "toUpperInPlace",
      ],
    },
    "std.utf": {
      doc: "UTF-8/16/32 encoding and decoding.",
      members: [
        "toUTF8",
        "toUTF16",
        "toUTF32",
        "toUTF16z",
        "encode",
        "decode",
        "decodeFront",
        "count",
        "stride",
        "validate",
        "byCodeUnit",
        "byChar",
        "byWchar",
        "byDchar",
        "UTFException",
      ],
    },
    "std.bitmanip": {
      doc: "Bit-level manipulation utilities.",
      members: [
        "BitArray",
        "bitsSet",
        "read",
        "write",
        "peek",
        "append",
        "bitfields",
        "taggedClassRef",
        "nativeToBigEndian",
        "bigEndianToNative",
        "littleEndianToNative",
      ],
    },
    "std.complex": {
      doc: "Complex number type and functions.",
      members: ["Complex", "abs", "arg", "conj", "expi", "sin", "cos"],
    },
    "std.container": {
      doc: "Container data structures.",
      members: [
        "Array",
        "SList",
        "DList",
        "RedBlackTree",
        "BinaryHeap",
        "make",
        "singlyLinkedList",
        "doublyLinkedList",
        "insert",
        "remove",
      ],
    },
    "std.numeric": {
      doc: "Numeric algorithms.",
      members: ["gcd", "lcm", "Fft", "fft", "isFinite", "entropy", "dotProduct"],
    },
    "std.process": {
      doc: "Starting and managing external processes.",
      members: [
        "spawn",
        "spawnShell",
        "execute",
        "executeShell",
        "shell",
        "browse",
        "environment",
        "env",
        "getenv",
        "setenv",
        "thisProcessID",
        "pipeProcess",
        "ProcessPipes",
        "Process",
        "wait",
        "Config",
      ],
    },
    "std.getopt": {
      doc: "Command-line option parsing.",
      members: [
        "getopt",
        "GetOptException",
        "config",
        "Config",
        "arraySep",
        "option",
      ],
    },
    "std.base64": {
      doc: "Base64 encoding and decoding.",
      members: ["Base64", "Base64Impl", "encode", "decode"],
    },
    "std.csv": {
      doc: "Comma-separated-values parsing.",
      members: ["csvReader", "csvWrite", "CSVException"],
    },
    "std.digest": {
      doc: "Message digest framework.",
      members: ["toHexString", "Digest", "hexDigest", "isDigest"],
    },
    "std.zlib": {
      doc: "Compression with the zlib library.",
      members: ["compress", "uncompress", "Compress", "UnCompress", "crc32", "adler32"],
    },
    "std.uuid": {
      doc: "UUID generation and parsing.",
      members: [
        "UUID",
        "parseUUID",
        "randomUUID",
        "sha1UUID",
        "md5UUID",
        "isUUID",
        "UUIDException",
      ],
    },
    "std.variant": {
      doc: "A dynamically typed value (`Variant`).",
      members: ["Variant", "Algebraic", "VariantN", "visit", "this"],
    },
    "std.signals": {
      doc: "Signals and slots (observer pattern).",
      members: ["Signal"],
    },
    "std.socket": {
      doc: "Low-level networking and sockets.",
      members: [
        "Socket",
        "Address",
        "getAddress",
        "InternetAddress",
        "tcpSocket",
        "parseAddress",
        "SocketType",
        "ProtocolType",
        "AddressFamily",
      ],
    },
    "std.outbuffer": {
      doc: "An efficient output buffer for building strings.",
      members: ["OutBuffer"],
    },
    "std.mmfile": {
      doc: "Memory-mapped files.",
      members: ["MmFile", "Mode"],
    },
  };

  const STDLIB_TOP = [
    "std.stdio",
    "std.algorithm",
    "std.array",
    "std.string",
    "std.conv",
    "std.math",
    "std.range",
    "std.typecons",
    "std.exception",
    "std.file",
    "std.path",
    "std.datetime",
    "std.json",
    "std.regex",
    "std.format",
    "std.traits",
    "std.meta",
    "std.parallelism",
    "std.random",
    "std.functional",
    "std.uni",
    "std.utf",
    "std.bitmanip",
    "std.complex",
    "std.container",
    "std.numeric",
    "std.process",
    "std.getopt",
    "std.base64",
    "std.csv",
    "std.digest",
    "std.zlib",
    "std.uuid",
    "std.variant",
    "std.signals",
    "std.socket",
    "std.outbuffer",
    "std.mmfile",
    "object",
  ];

  const MEMBER_METHODS = [
    { l: "length", d: "size_t length", doc: "Number of elements." },
    { l: "ptr", d: "T* ptr", doc: "Pointer to the first element." },
    { l: "dup", d: "T[] dup()", doc: "Returns a mutable copy." },
    { l: "idup", d: "immutable(T)[] idup()", doc: "Returns an immutable copy." },
    { l: "capacity", d: "size_t capacity", doc: "Allocated capacity." },
    { l: "sizeof", d: "size_t sizeof", doc: "Size in bytes." },
    { l: "mangleof", d: "string mangleof", doc: "The mangled name of the symbol." },
    { l: "stringof", d: "string stringof", doc: "The source representation of the symbol." },
  ];

  const RANGE_METHODS = [
    { l: "front", d: "auto front", doc: "The first element of the range." },
    { l: "back", d: "auto back", doc: "The last element of the range." },
    { l: "empty", d: "bool empty", doc: "True when the range has no elements." },
    { l: "popFront", d: "void popFront()", doc: "Advances the range past its first element." },
    { l: "popBack", d: "void popBack()", doc: "Shrinks the range past its last element." },
    { l: "save", d: "auto save()", doc: "Returns a copy of a forward range." },
  ];

  const STRING_METHODS = [
    { l: "toUpper", d: "auto toUpper()", doc: "Returns the string uppercased." },
    { l: "toLower", d: "auto toLower()", doc: "Returns the string lowercased." },
    { l: "strip", d: "auto strip()", doc: "Removes surrounding whitespace." },
    { l: "split", d: "auto split(char sep)", doc: "Splits the string on a separator." },
    { l: "replace", d: "auto replace(from, to)", doc: "Replaces all occurrences." },
    { l: "startsWith", d: "bool startsWith(needle)", doc: "Checks a prefix." },
    { l: "endsWith", d: "bool endsWith(needle)", doc: "Checks a suffix." },
    { l: "join", d: "auto join(sep)", doc: "Joins range elements into a string." },
    { l: "format", d: "auto format(args...)", doc: "Formats into a string." },
    { l: "to", d: "auto to()", doc: "Converts to another type." },
    { l: "parse", d: "auto parse()", doc: "Parses the string into a value." },
  ];

  const SNIPPETS = [
    { label: "main", detail: "Main function", insert: "void main()\n{\n\t${0}\n}" },
    {
      label: "main-args",
      detail: "Main with arguments",
      insert: "void main(string[] args)\n{\n\t${0}\n}",
    },
    {
      label: "writeln",
      detail: "Print a line",
      insert: "writeln(${0});",
    },
    { label: "writefln", detail: "Formatted print", insert: 'writefln("${1:%s}", ${0});' },
    {
      label: "import",
      detail: "Selective import",
      insert: "import ${1:std.stdio} : ${2:writeln};",
    },
    {
      label: "import-all",
      detail: "Module import",
      insert: "import ${0:std.stdio};",
    },
    {
      label: "struct",
      detail: "Struct definition",
      insert: "struct ${1:Name}\n{\n\t${2:int field;}\n\t${0}\n}",
    },
    {
      label: "class",
      detail: "Class definition",
      insert:
        "class ${1:Name}${2: : Base}\n{\n\tthis(${3})\n\t{\n\t\t${4}\n\t}\n\t${0}\n}",
    },
    {
      label: "interface",
      detail: "Interface definition",
      insert: "interface ${1:Name}\n{\n\t${2:void method();}\n}",
    },
    {
      label: "enum",
      detail: "Enum definition",
      insert: "enum ${1:Name}\n{\n\t${2:A},\n\t${3:B},\n\t${0}\n}",
    },
    {
      label: "union",
      detail: "Union definition",
      insert: "union ${1:Name}\n{\n\t${2:int i;}\n\t${3:float f;}\n}",
    },
    {
      label: "function",
      detail: "Function definition",
      insert: "${1:void} ${2:name}(${3})\n{\n\t${0}\n}",
    },
    {
      label: "ctor",
      detail: "Constructor",
      insert: "this(${1})\n{\n\t${0}\n}",
    },
    {
      label: "unittest",
      detail: "Unit test block",
      insert: "unittest\n{\n\t${0}\n}",
    },
    {
      label: "for",
      detail: "For loop",
      insert:
        "for (${1:size_t i} = 0; ${1:i} < ${2:n}; ++${1:i})\n{\n\t${0}\n}",
    },
    {
      label: "foreach",
      detail: "Foreach loop",
      insert: "foreach (${1:element}; ${2:range})\n{\n\t${0}\n}",
    },
    {
      label: "foreach-index",
      detail: "Foreach with index",
      insert: "foreach (${1:i}, ${2:element}; ${3:range})\n{\n\t${0}\n}",
    },
    {
      label: "foreach-reverse",
      detail: "Reverse foreach",
      insert: "foreach_reverse (${1:element}; ${2:range})\n{\n\t${0}\n}",
    },
    { label: "while", detail: "While loop", insert: "while (${1:condition})\n{\n\t${0}\n}" },
    { label: "do", detail: "Do-while loop", insert: "do\n{\n\t${1}\n} while (${0:condition});" },
    { label: "if", detail: "If statement", insert: "if (${1:condition})\n{\n\t${0}\n}" },
    {
      label: "if-else",
      detail: "If-else statement",
      insert: "if (${1:condition})\n{\n\t${2}\n}\nelse\n{\n\t${0}\n}",
    },
    {
      label: "switch",
      detail: "Final switch",
      insert:
        "switch (${1:value})\n{\n\tcase ${2:value}:\n\t\t${3}\n\t\tbreak;\n\tdefault:\n\t\t${0}\n}",
    },
    {
      label: "final-switch",
      detail: "Final switch over an enum",
      insert:
        "final switch (${1:value})\n{\n\tcase ${2:Enum.member}:\n\t\t${3}\n\t\tbreak;\n}",
    },
    {
      label: "try-catch",
      detail: "Try-catch",
      insert: "try\n{\n\t${1}\n}\ncatch (${2:Exception} e)\n{\n\t${0}\n}",
    },
    {
      label: "scope-exit",
      detail: "Scope guard",
      insert: "scope(exit) ${0};",
    },
    {
      label: "template",
      detail: "Function template",
      insert: "${1:T} ${2:name}(${3:T})(T ${4:value})\n{\n\t${0}\n}",
    },
    {
      label: "cast",
      detail: "Cast expression",
      insert: "cast(${1:Type}) ${0}",
    },
    {
      label: "assert",
      detail: "Assertion",
      insert: "assert(${1:condition}${2:, \"message\"});",
    },
    {
      label: "is-expression",
      detail: "Compile-time type check",
      insert: "static if (is(${1:T} == ${2:int}))\n{\n\t${0}\n}",
    },
    {
      label: "immutable",
      detail: "Immutable declaration",
      insert: "immutable ${1:name} = ${0};",
    },
    {
      label: "const",
      detail: "Const declaration",
      insert: "const ${1:name} = ${0};",
    },
  ];

  // ── Register language ────────────────────────────────────────────

  monaco.languages.register({
    id: D_LANG_ID,
    extensions: [".d", ".di"],
    aliases: ["D", "dlang"],
    mimetypes: ["text/x-d"],
  });

  // ── Monarch tokenizer ────────────────────────────────────────────

  monaco.languages.setMonarchTokensProvider(D_LANG_ID, {
    defaultToken: "",
    tokenPostfix: ".d",

    keywords: D_KEYWORDS,
    typeKeywords: D_TYPES,
    constants: D_CONSTANTS,

    operators: [
      "+",
      "-",
      "*",
      "/",
      "%",
      "&",
      "|",
      "^",
      "~",
      "!",
      "=",
      "<",
      ">",
      "?",
      ":",
      "++",
      "--",
      "**",
      "^^",
      "==",
      "!=",
      "<=",
      ">=",
      "&&",
      "||",
      "<<",
      ">>",
      ">>>",
      "+=",
      "-=",
      "*=",
      "/=",
      "%=",
      "&=",
      "|=",
      "^=",
      "~=",
      "<<=",
      ">>=",
      ">>>=",
      "=>",
      "..",
      ".",
      "->",
    ],

    symbols: /[=><!~?&|+\-*\/\^%]+/,
    escapes:
      /\\(?:[abfnrtv\\'"0]|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8}|&[a-zA-Z_]\w*;)/,

    tokenizer: {
      root: [
        // Ddoc comments
        [/\/\/\/.*$/, "comment.doc"],
        [/\/\*\*.*$/, "comment.doc", "@comment"],
        [/\/\+\+.*$/, "comment.doc", "@comment"],

        // Regular comments
        [/\/\/.*$/, "comment"],
        [/\/\*/, "comment", "@comment"],
        [/\/\+/, "comment", "@comment"],

        // Attributes and UDAs
        [/@[a-zA-Z_]\w*/, "annotation"],

        // Identifiers and keywords
        [
          /[a-zA-Z_]\w*/,
          {
            cases: {
              "@keywords": "keyword",
              "@typeKeywords": "type",
              "@constants": "constant",
              "@default": "identifier",
            },
          },
        ],

        { include: "@whitespace" },

        // WYSIWYG string (backtick)
        [/`[^`]*`/, "string"],

        // Raw string r"..."
        [/r"[^"]*"/, "string"],

        // Hex string x"..."
        [/x"[0-9A-Fa-f\s]*"/, "string"],

        // Token string q"..."
        [/q"/, "string", "@token_string"],

        // Double-quoted string
        [/"/, "string", "@string_double"],

        // Character literal
        [/'[^\\']'/, "string.char"],
        [/'(\\.)'/, "string.char"],

        // Numbers
        [/\d[\d_]*\.\d[\d_]*([eE][\-+]?\d[\d_]*)?[fFLi]?/, "number.float"],
        [/\d[\d_]*[eE][\-+]?\d[\d_]*[fFLi]?/, "number.float"],
        [/0[xX][0-9a-fA-F][0-9a-fA-F_]*[uUlL]*/, "number.hex"],
        [/0[bB][01][01_]*[uUlL]*/, "number.binary"],
        [/0[0-7][0-7_]*[uUlL]*/, "number.octal"],
        [/\d[\d_]*[uUlL]*/, "number"],

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

        [/[;,]/, "delimiter"],
      ],

      whitespace: [[/[ \t\r\n]+/, "white"]],

      comment: [
        [/[^/*+]+/, "comment"],
        [/\*\//, "comment", "@pop"],
        [/\+/, "comment"],
        [/[/*]/, "comment"],
      ],

      token_string: [
        [/[^"]+/, "string"],
        [/"/, "string", "@pop"],
      ],

      string_double: [
        [/[^\\"]+/, "string"],
        [/@escapes/, "string.escape"],
        [/\\./, "string.escape.invalid"],
        [/"/, "string", "@pop"],
      ],
    },
  });

  // ── Language configuration ───────────────────────────────────────

  monaco.languages.setLanguageConfiguration(D_LANG_ID, {
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
      { open: "`", close: "`", notIn: ["string", "comment"] },
      { open: "/+", close: "+/" },
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
      increaseIndentPattern: /^.*\{[^}"']*$/,
      decreaseIndentPattern: /^\s*\}/,
    },
    folding: {
      markers: {
        start: /^\s*\/\/\s*#?region\b/,
        end: /^\s*\/\/\s*#?endregion\b/,
      },
    },
    wordPattern:
      /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
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
        beforeText: /^\s*\/\/\/.*$/,
        action: {
          indentAction: monaco.languages.IndentAction.None,
          appendText: "/// ",
        },
      },
    ],
  });

  // ── Symbol indexing ──────────────────────────────────────────────

  type DSymbol = {
    name: string;
    kind: string;
    line: number;
    col: number;
    detail: string;
    doc?: string;
    params?: string;
    returnType?: string;
  };

  function extractDocComment(lines: string[], lineIndex: number): string {
    const docs: string[] = [];
    let i = lineIndex - 1;
    while (i >= 0) {
      const trimmed = lines[i].trim();
      if (trimmed.startsWith("///") || trimmed.startsWith("*")) {
        docs.unshift(
          trimmed
            .replace(/^\/\/\//, "")
            .replace(/^\*/, "")
            .replace(/^\/\*\*/, "")
            .trim(),
        );
        i--;
      } else {
        break;
      }
    }
    return docs.filter(Boolean).join("\n");
  }

  function parseSymbols(model: Monaco.editor.ITextModel): DSymbol[] {
    const lines = model.getLinesContent();
    const symbols: DSymbol[] = [];

    const typeRe =
      /^\s*(?:@\w+(?:\([^)]*\))?\s+)*(?:export\s+|extern\s*\([^)]*\)\s+|deprecated\s+|private\s+|protected\s+|package\s+|public\s+|final\s+|abstract\s+|static\s+)*(#?\s*)(struct|class|interface|union|enum|template|mixin\s+template)\s+([A-Za-z_]\w*)/;
    const fnRe =
      /^\s*(?:@\w+(?:\([^)]*\))?\s+)*(?:export\s+|extern\s*\([^)]*\)\s+|deprecated\s+|private\s+|protected\s+|package\s+|public\s+|pure\s+|nothrow\s+|static\s+|final\s+|override\s+|abstract\s+|const\s+|immutable\s+|inout\s+|shared\s+|scope\s+)*(?:auto\s+)?([A-Za-z_][\w.!\][]*)\s+([A-Za-z_]\w*)\s*\(([^)]*)\)/;
    const varRe =
      /^\s*(?:@\w+\s+)*(?:export\s+|static\s+|const\s+|immutable\s+|shared\s+|__gshared\s+|final\s+|private\s+|package\s+|public\s+|protected\s+|enum\s+)?([A-Za-z_][\w.!\][]*)\s+([A-Za-z_]\w*)\s*(?:=[^=]|;)/;
    const aliasRe = /^\s*alias\s+([A-Za-z_]\w*)\s*=/;
    const enumRe = /^\s*enum\s+(?:[A-Za-z_]\w*\s*:\s*[A-Za-z_]\w*\s*)?([A-Za-z_]\w*)\s*=/;
    const unittestRe = /^\s*unittest\b/;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].replace(/\/\/.*$/, "");
      let m: RegExpMatchArray | null;

      if ((m = typeRe.exec(line))) {
        symbols.push({
          name: m[3],
          kind: m[2].startsWith("mixin") ? "template" : m[2],
          line: i + 1,
          col: line.indexOf(m[3]) + 1,
          detail: `${m[2]} ${m[3]}`,
          doc: extractDocComment(lines, i),
        });
        continue;
      }
      if ((m = fnRe.exec(line))) {
        symbols.push({
          name: m[2],
          kind: "function",
          line: i + 1,
          col: line.indexOf(m[2]) + 1,
          detail: `${m[1]} ${m[2]}(${m[3].trim()})`,
          params: m[3].trim(),
          returnType: m[1],
          doc: extractDocComment(lines, i),
        });
        continue;
      }
      if ((m = aliasRe.exec(line))) {
        symbols.push({
          name: m[1],
          kind: "alias",
          line: i + 1,
          col: line.indexOf(m[1]) + 1,
          detail: line.trim(),
          doc: extractDocComment(lines, i),
        });
        continue;
      }
      if ((m = enumRe.exec(line))) {
        symbols.push({
          name: m[1],
          kind: "constant",
          line: i + 1,
          col: line.indexOf(m[1]) + 1,
          detail: line.trim(),
          doc: extractDocComment(lines, i),
        });
        continue;
      }
      if (unittestRe.test(line)) {
        symbols.push({
          name: `unittest (line ${i + 1})`,
          kind: "unittest",
          line: i + 1,
          col: 1,
          detail: "unittest",
          doc: extractDocComment(lines, i),
        });
        continue;
      }
      if ((m = varRe.exec(line))) {
        symbols.push({
          name: m[2],
          kind: "variable",
          line: i + 1,
          col: line.indexOf(m[2]) + 1,
          detail: `${m[1]} ${m[2]}`,
          doc: extractDocComment(lines, i),
        });
      }
    }
    return symbols;
  }

  // Locals that are not part of the outline: foreach loop variables and
  // function parameters. Used for completion and hover only.
  function parseLocals(model: Monaco.editor.ITextModel) {
    const lines = model.getLinesContent();
    const out: { name: string; detail: string; line: number; col: number }[] =
      [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].replace(/\/\/.*$/, "");
      let m: RegExpExecArray | null;
      const feRe = /\bforeach(?:_reverse)?\s*\(([^;)]*);/g;
      while ((m = feRe.exec(line)) !== null) {
        for (const part of m[1].split(",")) {
          const nm = part.trim().match(/^([A-Za-z_]\w*)$/);
          if (nm)
            out.push({
              name: nm[1],
              detail: `foreach ${nm[1]}`,
              line: i + 1,
              col: line.indexOf(nm[1]) + 1,
            });
        }
      }
      const paramRe = /[(,]\s*(?:[A-Za-z_][\w.!\][]*\s+)+([A-Za-z_]\w*)\s*(?=[,)])/g;
      while ((m = paramRe.exec(line)) !== null) {
        out.push({
          name: m[1],
          detail: `${m[1]} (parameter)`,
          line: i + 1,
          col: line.indexOf(m[1]) + 1,
        });
      }
    }
    return out;
  }

  // ── Scope-aware binding resolution ───────────────────────────────

  const resolveBinding = (
    model: Monaco.editor.ITextModel,
    position: Monaco.Position,
  ) => {
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
    const isTypeBody = (prefix: string) =>
      /\b(class|struct|interface|union|enum|template|trait)\b/.test(prefix);

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

    const enclosing = (offset: number) => {
      let found: Scope | undefined;
      for (const scope of scopes) {
        if (scope.start <= offset && offset <= scope.end) {
          if (!found || scope.start > found.start) found = scope;
        }
      }
      return found;
    };
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
    const nextScope = (offset: number) => {
      let found: Scope | undefined;
      for (const scope of scopes) {
        if (scope.start >= offset && (!found || scope.start < found.start))
          found = scope;
      }
      return found;
    };

    // Local declarations: qualifier-prefixed and typed declarations, plus
    // foreach loop variables. Function parameters (`Type name`) are covered by
    // the typed forms.
    const declaration = new RegExp(
      "\\b(?:auto|const|immutable|shared|static|scope|ref|__gshared|final|enum|alias|typedef)\\s+" +
        esc(name) +
        "\\b|\\b(?:bool|byte|ubyte|short|ushort|int|uint|long|ulong|cent|ucent|float|double|real|ifloat|idouble|ireal|cfloat|cdouble|creal|char|wchar|dchar|void|string|wstring|dstring|size_t|ptrdiff_t|intptr_t|uintptr_t)(?:\\[\\s*\\])?\\s+" +
        esc(name) +
        "\\b|\\b[A-Z][A-Za-z0-9_]*(?:!\\s*\\([^)]*\\)|\\.\\w+)*(?:\\[\\s*\\])?\\*?\\s+" +
        esc(name) +
        "\\b|\\bforeach(?:_reverse)?\\s*\\([^;)]*\\b" +
        esc(name) +
        "\\b",
      "g",
    );
    const declarations: { start: number; end: number; scope?: Scope }[] = [];
    for (let i = 0; i < lines.length; i++) {
      declaration.lastIndex = 0;
      let m;
      while ((m = declaration.exec(lines[i])) !== null) {
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

    type Occurrence = { line: number; startColumn: number; endColumn: number };
    const occurrences: Occurrence[] = [];
    let declarationRange: Occurrence | null = null;
    const occurrence = new RegExp("\\b" + esc(name) + "\\b", "g");
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
          if (
            before.endsWith(".") ||
            before.endsWith("->") ||
            before.endsWith("::")
          )
            continue;
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

  // ── Completion provider ──────────────────────────────────────────

  monaco.languages.registerCompletionItemProvider(D_LANG_ID, {
    triggerCharacters: [".", "@", '"'],
    provideCompletionItems(model, position) {
      const textUntil = model.getValueInRange({
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
      const CIK = monaco.languages.CompletionItemKind;
      const suggestions: any[] = [];

      // UDA / attribute completion after @
      const atMatch = textUntil.match(/@(\w*)$/);
      if (atMatch) {
        const atRange = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: position.column - atMatch[0].length,
          endColumn: position.column,
        };
        D_ATTRIBUTES.forEach((attr) => {
          suggestions.push({
            label: attr,
            kind: CIK.Keyword,
            insertText: attr,
            detail: "D attribute",
            range: atRange,
            sortText: "0_" + attr,
          });
        });
        return { suggestions };
      }

      // import std.<...> and std.<...> member completion
      const importMatch = textUntil.match(/import\s+([\w.]*)$/);
      if (importMatch) {
        const partial = importMatch[1];
        const dot = partial.lastIndexOf(".");
        if (dot === -1) {
          STDLIB_TOP.forEach((mod) => {
            suggestions.push({
              label: mod,
              kind: CIK.Module,
              insertText: mod,
              detail: "D standard library module",
              documentation: MODULES[mod]?.doc,
              range,
              sortText: "0_" + mod,
            });
          });
          return { suggestions };
        }
        const prefix = partial.slice(0, dot);
        if (MODULES[prefix]) {
          const memberRange = {
            startLineNumber: position.lineNumber,
            startColumn: position.column - (partial.length - dot - 1),
            endLineNumber: position.lineNumber,
            endColumn: position.column,
          };
          MODULES[prefix].members.forEach((m) => {
            suggestions.push({
              label: m,
              kind: CIK.Function,
              insertText: m,
              detail: `${prefix}.${m}`,
              range: memberRange,
            });
          });
          return { suggestions };
        }
        // A submodule path: offer the next path segments
        STDLIB_TOP.filter(
          (mod) => mod.startsWith(partial) && mod !== partial,
        ).forEach((mod) => {
          suggestions.push({
            label: mod,
            kind: CIK.Module,
            insertText: mod,
            detail: "D standard library module",
            documentation: MODULES[mod]?.doc,
            range,
            sortText: "0_" + mod,
          });
        });
        return { suggestions };
      }

      // std.<module>.member access
      const stdMatch = textUntil.match(/\bstd\.([\w.]*)$/);
      if (stdMatch) {
        const parts = stdMatch[1].split(".");
        const last = parts[parts.length - 1] || "";
        const memberRange = {
          startLineNumber: position.lineNumber,
          startColumn: position.column - last.length,
          endLineNumber: position.lineNumber,
          endColumn: position.column,
        };
        if (parts.length === 1) {
          STDLIB_TOP.forEach((mod) => {
            suggestions.push({
              label: mod,
              kind: CIK.Module,
              insertText: mod,
              detail: "D standard library module",
              documentation: MODULES[mod]?.doc,
              range: memberRange,
            });
          });
        } else {
          const mod = "std." + parts.slice(0, -1).join(".");
          if (MODULES[mod]) {
            MODULES[mod].members.forEach((m) => {
              suggestions.push({
                label: m,
                kind: CIK.Function,
                insertText: m,
                detail: `${mod}.${m}`,
                range: memberRange,
              });
            });
          }
        }
        return { suggestions };
      }

      // Member access after a dot
      const dotMatch = textUntil.match(/(\w+)\.\s*(\w*)$/);
      if (dotMatch) {
        const obj = dotMatch[1];
        const typed = dotMatch[2] || "";
        const dotRange = {
          startLineNumber: position.lineNumber,
          startColumn: position.column - typed.length,
          endLineNumber: position.lineNumber,
          endColumn: position.column,
        };
        const pushMembers = (list: { l: string; d: string }[], kind: any) => {
          list.forEach((m) => {
            suggestions.push({
              label: m.l,
              kind,
              insertText: m.l,
              detail: m.d,
              range: dotRange,
            });
          });
        };
        // String receiver heuristic
        if (new RegExp(`${esc(obj)}\\s*[:=]\\s*["\`]`).test(fullText)) {
          pushMembers(STRING_METHODS, CIK.Method);
          pushMembers(MEMBER_METHODS, CIK.Property);
          return { suggestions };
        }
        // Array receiver heuristic
        if (
          new RegExp(`${esc(obj)}\\s*[:=]\\s*\\[`).test(fullText) ||
          new RegExp(`\\[\\]\\s+${esc(obj)}`).test(fullText)
        ) {
          pushMembers(RANGE_METHODS, CIK.Property);
          pushMembers(MEMBER_METHODS, CIK.Property);
          return { suggestions };
        }
        pushMembers(MEMBER_METHODS, CIK.Property);
        pushMembers(RANGE_METHODS, CIK.Method);
        return { suggestions };
      }

      // Snippets
      SNIPPETS.forEach((s) => {
        suggestions.push({
          label: s.label,
          kind: CIK.Snippet,
          insertText: s.insert,
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          detail: s.detail + " (snippet)",
          range,
          sortText: "1_" + s.label,
        });
      });

      // Keywords
      D_KEYWORDS.forEach((kw) => {
        const info = KEYWORD_DOCS[kw];
        suggestions.push({
          label: kw,
          kind: CIK.Keyword,
          insertText: kw,
          detail: info ? info.sig : "keyword",
          documentation: info ? { value: info.doc } : undefined,
          range,
          sortText: "3_" + kw,
        });
      });

      // Types
      D_TYPES.forEach((t) => {
        suggestions.push({
          label: t,
          kind: CIK.TypeParameter,
          insertText: t,
          detail: `type ${t}`,
          range,
          sortText: "4_" + t,
        });
      });

      // Constants
      D_CONSTANTS.forEach((c) => {
        suggestions.push({
          label: c,
          kind: CIK.Constant,
          insertText: c,
          range,
          sortText: "5_" + c,
        });
      });

      // Builtins
      Object.keys(BUILTIN_DOCS).forEach((name) => {
        const info = BUILTIN_DOCS[name];
        suggestions.push({
          label: name,
          kind: CIK.Function,
          insertText: name + "($0)",
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          detail: info.sig,
          documentation: {
            value:
              info.doc + (info.module ? `\n\n_From \`${info.module}\`_` : ""),
          },
          range,
          sortText: "2_" + name,
        });
      });

      // Foreach variables and parameters (not part of the outline)
      const seenLocal = new Set<string>();
      parseLocals(model).forEach((loc) => {
        if (seenLocal.has(loc.name)) return;
        seenLocal.add(loc.name);
        suggestions.push({
          label: loc.name,
          kind: CIK.Variable,
          insertText: loc.name,
          detail: loc.detail,
          documentation: { value: `_Defined at line ${loc.line}_` },
          range,
          sortText: "0_" + loc.name,
        });
      });

      // Local symbols
      parseSymbols(model).forEach((sym) => {
        let kind = CIK.Variable;
        if (sym.kind === "function") kind = CIK.Function;
        else if (sym.kind === "struct") kind = CIK.Struct;
        else if (sym.kind === "class") kind = CIK.Class;
        else if (sym.kind === "interface") kind = CIK.Interface;
        else if (sym.kind === "union") kind = CIK.Struct;
        else if (sym.kind === "enum") kind = CIK.Enum;
        else if (sym.kind === "template") kind = CIK.TypeParameter;
        else if (sym.kind === "alias") kind = CIK.Interface;
        else if (sym.kind === "constant") kind = CIK.Constant;
        suggestions.push({
          label: sym.name,
          kind,
          insertText:
            sym.kind === "function" ? sym.name + "(${1})" : sym.name,
          insertTextRules:
            sym.kind === "function"
              ? monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
              : undefined,
          detail: sym.detail,
          documentation: sym.doc ? { value: sym.doc } : undefined,
          range,
          sortText: "0_" + sym.name,
        });
      });

      return { suggestions };
    },
  });

  // ── Hover provider ───────────────────────────────────────────────

  monaco.languages.registerHoverProvider(D_LANG_ID, {
    provideHover(model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return null;
      const token = word.word;
      const lineContent = model.getLineContent(position.lineNumber);
      const hoverRange = new monaco.Range(
        position.lineNumber,
        word.startColumn,
        position.lineNumber,
        word.endColumn,
      );

      // Attribute
      const charBefore =
        word.startColumn > 1 ? lineContent[word.startColumn - 2] : "";
      if (charBefore === "@") {
        const attr = "@" + token;
        if (D_ATTRIBUTES.includes(attr)) {
          return {
            range: new monaco.Range(
              position.lineNumber,
              word.startColumn - 1,
              position.lineNumber,
              word.endColumn,
            ),
            contents: [
              { value: "```d\n" + attr + "\n```" },
              { value: "A built-in D attribute." },
            ],
          };
        }
      }

      // Package-qualified member: std.foo.bar
      const prefixMatch = lineContent
        .substring(0, word.endColumn - 1)
        .match(/\bstd\.([\w.]+)\.(\w+)$/);
      if (prefixMatch) {
        const mod = "std." + prefixMatch[1];
        if (MODULES[mod] && MODULES[mod].members.includes(token)) {
          return {
            range: hoverRange,
            contents: [
              { value: "```d\n" + mod + "." + token + "\n```" },
              { value: MODULES[mod].doc },
            ],
          };
        }
      }

      // std module
      const stdMod = lineContent
        .substring(0, word.endColumn)
        .match(/\b(std\.[\w.]+)$/);
      if (stdMod && MODULES[stdMod[1]]) {
        return {
          range: hoverRange,
          contents: [
            { value: "```d\nimport " + stdMod[1] + ";\n```" },
            { value: MODULES[stdMod[1]].doc },
          ],
        };
      }

      // Keyword
      if (KEYWORD_DOCS[token]) {
        const info = KEYWORD_DOCS[token];
        return {
          range: hoverRange,
          contents: [
            { value: "```d\n" + info.sig + "\n```" },
            { value: info.doc },
            { value: "_keyword_" },
          ],
        };
      }

      // Builtin
      if (BUILTIN_DOCS[token]) {
        const info = BUILTIN_DOCS[token];
        return {
          range: hoverRange,
          contents: [
            { value: "```d\n" + info.sig + "\n```" },
            { value: info.doc },
            info.module ? { value: `_From \`${info.module}\`_` } : { value: "" },
          ].filter((c) => c.value !== ""),
        };
      }

      // Type
      if (D_TYPES.includes(token)) {
        return {
          range: hoverRange,
          contents: [
            { value: "```d\n(type) " + token + "\n```" },
            { value: `Built-in type \`${token}\`` },
          ],
        };
      }

      // Foreach variables and parameters
      const loc = parseLocals(model).find((s) => s.name === token);
      if (loc) {
        return {
          range: hoverRange,
          contents: [
            { value: "```d\n" + loc.detail + "\n```" },
            { value: `_Defined at line ${loc.line}_` },
          ],
        };
      }

      // Local symbol
      const sym = parseSymbols(model).find((s) => s.name === token);
      if (sym) {
        const contents: { value: string }[] = [
          { value: "```d\n" + sym.detail + "\n```" },
        ];
        if (sym.doc) contents.push({ value: sym.doc });
        contents.push({ value: `_Defined at line ${sym.line}_` });
        return { range: hoverRange, contents };
      }

      return null;
    },
  });

  // ── Definition provider ──────────────────────────────────────────

  monaco.languages.registerDefinitionProvider(D_LANG_ID, {
    provideDefinition(model, position) {
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
      const sym = parseSymbols(model).find((s) => s.name === word.word);
      if (sym) {
        return {
          uri: model.uri,
          range: new monaco.Range(
            sym.line,
            sym.col,
            sym.line,
            sym.col + sym.name.length,
          ),
        };
      }
      return null;
    },
  });

  // ── Rename provider ──────────────────────────────────────────────

  monaco.languages.registerRenameProvider(D_LANG_ID, {
    provideRenameEdits(model, position, newName) {
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
    resolveRenameLocation(model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return { rejectReason: "Cannot rename this element." };
      if (D_KEYWORDS.includes(word.word))
        return { rejectReason: "Cannot rename a keyword." };
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

  // ── Document symbol provider (outline) ───────────────────────────

  monaco.languages.registerDocumentSymbolProvider(D_LANG_ID, {
    provideDocumentSymbols(model) {
      const SK = monaco.languages.SymbolKind;
      return parseSymbols(model).map((sym) => {
        let kind = SK.Variable;
        if (sym.kind === "function") kind = SK.Function;
        else if (sym.kind === "struct") kind = SK.Struct;
        else if (sym.kind === "class") kind = SK.Class;
        else if (sym.kind === "interface") kind = SK.Interface;
        else if (sym.kind === "union") kind = SK.Struct;
        else if (sym.kind === "enum") kind = SK.Enum;
        else if (sym.kind === "template") kind = SK.TypeParameter;
        else if (sym.kind === "alias") kind = SK.Interface;
        else if (sym.kind === "constant") kind = SK.Constant;
        else if (sym.kind === "unittest") kind = SK.Method;
        const selectionRange = new monaco.Range(
          sym.line,
          sym.col,
          sym.line,
          sym.col + sym.name.length,
        );
        return {
          name: sym.name,
          detail: sym.kind,
          kind,
          range: selectionRange,
          selectionRange,
        };
      });
    },
  });

  // ── Signature help provider ──────────────────────────────────────

  monaco.languages.registerSignatureHelpProvider(D_LANG_ID, {
    signatureHelpTriggerCharacters: ["(", ","],
    provideSignatureHelp(model, position) {
      const textUntil = model.getValueInRange({
        startLineNumber: 1,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });

      let depth = 0;
      let funcEnd = -1;
      let activeParam = 0;
      for (let i = textUntil.length - 1; i >= 0; i--) {
        const c = textUntil[i];
        if (c === ")") depth++;
        else if (c === "(") {
          if (depth === 0) {
            funcEnd = i;
            break;
          }
          depth--;
        } else if (c === "," && depth === 0) activeParam++;
      }
      if (funcEnd < 0) return null;

      const before = textUntil.substring(0, funcEnd);
      const match = before.match(/([A-Za-z_]\w*)\s*$/);
      if (!match) return null;
      const funcName = match[1];

      const sym = parseSymbols(model).find(
        (s) => s.name === funcName && s.kind === "function",
      );
      if (sym) {
        const params = (sym.params || "")
          .split(",")
          .map((p) => p.trim())
          .filter(Boolean);
        return {
          value: {
            signatures: [
              {
                label: `${sym.returnType || "auto"} ${sym.name}(${sym.params || ""})`,
                parameters: params.map((p) => ({ label: p })),
                documentation: sym.doc || `Defined at line ${sym.line}`,
              },
            ],
            activeSignature: 0,
            activeParameter: Math.min(activeParam, Math.max(0, params.length - 1)),
          },
          dispose() {},
        };
      }

      const info = BUILTIN_DOCS[funcName];
      if (info) {
        const inner = info.sig.match(/\(([^)]*)\)/)?.[1];
        const params = inner
          ? inner
              .split(",")
              .map((p) => p.trim())
              .filter(Boolean)
              .map((p) => ({ label: p }))
          : [];
        return {
          value: {
            signatures: [
              {
                label: info.sig,
                parameters: params,
                documentation: info.doc,
              },
            ],
            activeSignature: 0,
            activeParameter: Math.min(activeParam, Math.max(0, params.length - 1)),
          },
          dispose() {},
        };
      }

      return null;
    },
  });

  // ── Folding range provider ───────────────────────────────────────

  monaco.languages.registerFoldingRangeProvider(D_LANG_ID, {
    provideFoldingRanges(model) {
      const lines = model.getLinesContent();
      const ranges: any[] = [];
      const stack: number[] = [];
      let blockComment: number | null = null;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        for (let c = 0; c < line.length; c++) {
          const ch = line[c];
          if (ch === "{") stack.push(i);
          else if (ch === "}") {
            if (stack.length) {
              const start = stack.pop() as number;
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
        // Block comment folding
        if (blockComment === null && (line.includes("/*") || line.includes("/+"))) {
          if (!(line.includes("*/") || line.includes("+/"))) blockComment = i;
        } else if (blockComment !== null && (line.includes("*/") || line.includes("+/"))) {
          if (i > blockComment) {
            ranges.push({
              start: blockComment + 1,
              end: i + 1,
              kind: monaco.languages.FoldingRangeKind.Comment,
            });
          }
          blockComment = null;
        }
        // Doc-comment runs
        if (line.trimStart().startsWith("///")) {
          let end = i + 1;
          while (
            end < lines.length &&
            lines[end].trimStart().startsWith("///")
          )
            end++;
          if (end > i + 1) {
            ranges.push({
              start: i + 1,
              end,
              kind: monaco.languages.FoldingRangeKind.Comment,
            });
          }
          i = end - 1;
        }
      }

      return ranges;
    },
  });
};
