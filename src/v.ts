import type * as Monaco from "monaco-editor";

export default (monaco: typeof Monaco) => {
  const V_LANG_ID = "v";

  const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // ── Language knowledge ───────────────────────────────────────────

  const V_KEYWORDS = [
    "as",
    "asm",
    "assert",
    "atomic",
    "break",
    "const",
    "continue",
    "defer",
    "else",
    "enum",
    "false",
    "fn",
    "for",
    "go",
    "goto",
    "if",
    "import",
    "in",
    "interface",
    "is",
    "isreftype",
    "lock",
    "match",
    "module",
    "mut",
    "none",
    "or",
    "pub",
    "return",
    "rlock",
    "select",
    "shared",
    "sizeof",
    "spawn",
    "static",
    "struct",
    "true",
    "type",
    "typeof",
    "union",
    "unsafe",
    "volatile",
    "__global",
    "__offsetof",
  ];

  const V_TYPES = [
    "bool",
    "string",
    "rune",
    "i8",
    "i16",
    "i32",
    "i64",
    "int",
    "isize",
    "u8",
    "u16",
    "u32",
    "u64",
    "byte",
    "ubyte",
    "usize",
    "f32",
    "f64",
    "voidptr",
    "charptr",
    "byteptr",
    "any",
    "map",
    "array",
    "chan",
    "thread",
    "IError",
  ];

  const V_CONSTANTS = ["true", "false", "none", "nil"];

  const V_ATTRIBUTES = [
    "[unsafe]",
    "[inline]",
    "[direct_array_access]",
    "[manualfree]",
    "[noinit]",
    "[heap]",
    "[typedef]",
    "[deprecated]",
    "[export]",
    "[if debug]",
    "[if linux]",
    "[if windows]",
    "[if macos]",
  ];

  const KEYWORD_DOCS: Record<string, { sig: string; doc: string }> = {
    fn: {
      sig: "fn name(param Type) ReturnType { }",
      doc: "Declares a function. Functions are the primary building block of V programs.",
    },
    mut: {
      sig: "mut name := value",
      doc: "Declares a mutable variable. In V, variables are immutable by default.",
    },
    const: {
      sig: "const name = value",
      doc: "Declares a compile-time constant. Constants may only be declared at module level.",
    },
    struct: {
      sig: "struct Name {\n\tfield Type\n}",
      doc: "Declares a struct: a value type that groups named fields.",
    },
    enum: {
      sig: "enum Name {\n\tvariant\n}",
      doc: "Declares an enumeration. Enum values are `Name.variant`.",
    },
    interface: {
      sig: "interface Name {\n\tmethod() Type\n}",
      doc: "Declares an interface: a set of method signatures that types implement implicitly.",
    },
    union: {
      sig: "union Name {\n\tfield Type\n}",
      doc: "Declares a union whose fields share memory. Only one field is active at a time.",
    },
    match: {
      sig: "match expr {\n\tpattern { }\n\telse { }\n}",
      doc: "Pattern matching, most commonly over sum types and optionals.",
    },
    defer: {
      sig: "defer { }",
      doc: "Schedules a block to run when the enclosing function returns.",
    },
    go: {
      sig: "go fn_name(args)",
      doc: "Starts a new thread of execution (a coroutine).",
    },
    spawn: {
      sig: "spawn fn_name(args)",
      doc: "Starts a function on a new thread, returning a thread handle.",
    },
    lock: {
      sig: "lock a, b { }",
      doc: "Acquires the given mutexes for the enclosed block.",
    },
    rlock: {
      sig: "rlock a { }",
      doc: "Acquires a read lock on the given mutex(es) for the enclosed block.",
    },
    shared: {
      sig: "shared x := value",
      doc: "Marks a variable as shared between threads.",
    },
    atomic: {
      sig: "atomic x += 1",
      doc: "Performs an atomic operation on a shared variable.",
    },
    unsafe: {
      sig: "unsafe { }",
      doc: "Enables memory-unsafe operations (pointer arithmetic, casts) inside the block.",
    },
    or: {
      sig: "value := fallible() or { return err }",
      doc: "Handles an error returned by a fallible call. `or { }` propagates or provides a fallback.",
    },
    in: {
      sig: "for key in map { }",
      doc: "Iterates a collection, or tests membership in arrays, maps and strings.",
    },
    is: {
      sig: "expr is Type",
      doc: "Compile-time type check or smartcast condition.",
    },
    as: {
      sig: "expr as Type",
      doc: "Casts a value to another type (checked at compile time for compatible types).",
    },
    isreftype: {
      sig: "isreftype(T)",
      doc: "Returns true if `T` is a reference type (map, array, string, etc.).",
    },
    typeof: {
      sig: "typeof(expr)",
      doc: "Yields the type of an expression at compile time.",
    },
    sizeof: {
      sig: "sizeof(T)",
      doc: "Returns the size of a type or value in bytes.",
    },
    module: {
      sig: "module name",
      doc: "Declares the module name of the current file. Optional for `main`.",
    },
    import: {
      sig: "import module_name",
      doc: "Imports a module, making its public declarations available.",
    },
    pub: {
      sig: "pub fn name() { }",
      doc: "Marks a declaration as public.",
    },
    return: {
      sig: "return value",
      doc: "Returns from the current function, optionally with a value.",
    },
    if: {
      sig: "if condition { } else if { } else { }",
      doc: "Conditional branching.",
    },
    for: {
      sig: "for x := 0; x < n; x++ { }",
      doc: "The single looping construct: C-style, condition-only, or range-based (`for x in collection`).",
    },
    goto: {
      sig: "goto label",
      doc: "Jumps to a labeled statement. Use sparingly.",
    },
    static: {
      sig: "static name := value",
      doc: "Declares a variable with static (function-local, persistent) storage.",
    },
    __global: {
      sig: "__global name = value",
      doc: "Declares a global variable (module-level `__global` constants are the default).",
    },
    __offsetof: {
      sig: "__offsetof(Struct, field)",
      doc: "Returns the byte offset of a struct field.",
    },
    asm: {
      sig: "asm amd64 { }",
      doc: "Inline assembly block.",
    },
  };

  const BUILTIN_DOCS: Record<
    string,
    { sig: string; doc: string; module?: string }
  > = {
    println: {
      sig: "fn println(s string)",
      doc: "Prints a string to `stdout`, followed by a newline.",
      module: "builtin",
    },
    print: {
      sig: "fn print(s string)",
      doc: "Prints a string to `stdout` without a trailing newline.",
      module: "builtin",
    },
    eprintln: {
      sig: "fn eprintln(s string)",
      doc: "Prints a string to `stderr`, followed by a newline.",
      module: "builtin",
    },
    eprint: {
      sig: "fn eprint(s string)",
      doc: "Prints a string to `stderr` without a trailing newline.",
      module: "builtin",
    },
    panic: {
      sig: "fn panic(s string)",
      doc: "Aborts the program with the given message.",
      module: "builtin",
    },
    exit: {
      sig: "fn exit(code int)",
      doc: "Terminates the program with the given exit code.",
      module: "builtin",
    },
    error: {
      sig: "fn error(message string) IError",
      doc: "Creates a new error with the given message.",
      module: "builtin",
    },
    dump: {
      sig: "fn dump(expr)",
      doc: "Prints the source text and value of an expression for debugging, returning it.",
      module: "builtin",
    },
    len: {
      sig: "fn len(container) int",
      doc: "Returns the length of a string, array, map or other container.",
      module: "builtin",
    },
    cap: {
      sig: "fn cap(array) int",
      doc: "Returns the capacity of an array.",
      module: "builtin",
    },
    append: {
      sig: "fn append(array, value) array",
      doc: "Returns a new array with `value` appended.",
      module: "builtin",
    },
    prepend: {
      sig: "fn prepend(array, value) array",
      doc: "Returns a new array with `value` inserted at the front.",
      module: "builtin",
    },
    copy: {
      sig: "fn copy(dst, src) int",
      doc: "Copies elements from `src` into `dst`, returning the number copied.",
      module: "builtin",
    },
    delete: {
      sig: "fn delete(map, key)",
      doc: "Removes a key from a map.",
      module: "builtin",
    },
    insert: {
      sig: "fn insert(array, index, value) array",
      doc: "Returns a new array with `value` inserted at `index`.",
      module: "builtin",
    },
    isnil: {
      sig: "fn isnil(expr) bool",
      doc: "Returns true if the reference value is nil.",
      module: "builtin",
    },
    typeof: {
      sig: "fn typeof(expr) Type",
      doc: "Yields the type of an expression.",
      module: "builtin",
    },
    sizeof: {
      sig: "fn sizeof(T)",
      doc: "Returns the size of a type or value in bytes.",
      module: "builtin",
    },
    isreftype: {
      sig: "fn isreftype(T) bool",
      doc: "Returns true if `T` is a reference type.",
      module: "builtin",
    },
    min: {
      sig: "fn min(a, b) T",
      doc: "Returns the smaller of two values.",
      module: "builtin",
    },
    max: {
      sig: "fn max(a, b) T",
      doc: "Returns the larger of two values.",
      module: "builtin",
    },
    abs: {
      sig: "fn abs(a) T",
      doc: "Returns the absolute value of a number.",
      module: "builtin",
    },
    malloc: {
      sig: "fn malloc(n isize) &u8",
      doc: "Allocates `n` bytes and returns a pointer. Requires `unsafe`.",
      module: "builtin",
    },
    free: {
      sig: "fn free(ptr voidptr)",
      doc: "Frees a pointer previously returned by `malloc`. Requires `unsafe`.",
      module: "builtin",
    },
    memcpy: {
      sig: "fn memcpy(dest voidptr, src &u8, n isize) voidptr",
      doc: "Copies `n` bytes from `src` to `dest`. Requires `unsafe`.",
      module: "builtin",
    },
    memset: {
      sig: "fn memset(dest voidptr, value u8, n isize)",
      doc: "Fills `n` bytes of memory with `value`. Requires `unsafe`.",
      module: "builtin",
    },
    vcalloc: {
      sig: "fn vcalloc(n isize) &u8",
      doc: "Allocates zeroed memory. Requires `unsafe`.",
      module: "builtin",
    },
    realloc: {
      sig: "fn realloc(ptr voidptr, n isize) voidptr",
      doc: "Resizes a previously allocated block. Requires `unsafe`.",
      module: "builtin",
    },
    cmp_lt: {
      sig: "fn cmp_lt(a, b) bool",
      doc: "Comparison helper; used for sorting.",
      module: "builtin",
    },
    cmp_gt: {
      sig: "fn cmp_gt(a, b) bool",
      doc: "Comparison helper; used for sorting.",
      module: "builtin",
    },
    fields: {
      sig: "fn fields(struct) []string",
      doc: "Returns the field names of a struct as strings.",
      module: "builtin",
    },
    offsetof: {
      sig: "fn offsetof(T, field) int",
      doc: "Returns the byte offset of a struct field.",
      module: "builtin",
    },
    eprint_backtrace: {
      sig: "fn eprint_backtrace()",
      doc: "Prints the current call stack to `stderr`.",
      module: "builtin",
    },
    print_backtrace: {
      sig: "fn print_backtrace()",
      doc: "Prints the current call stack to `stdout`.",
      module: "builtin",
    },
  };

  const MODULES: Record<string, { doc: string; members: string[] }> = {
    builtin: {
      doc: "V functions and types available in every module without an import.",
      members: [
        "println",
        "print",
        "eprintln",
        "eprint",
        "panic",
        "exit",
        "error",
        "dump",
        "len",
        "cap",
        "append",
        "prepend",
        "copy",
        "delete",
        "insert",
        "isnil",
        "typeof",
        "sizeof",
        "isreftype",
        "min",
        "max",
        "abs",
        "malloc",
        "free",
        "memcpy",
        "memmove",
        "memset",
        "realloc",
        "vcalloc",
        "fields",
        "offsetof",
        "print_backtrace",
        "eprint_backtrace",
        "cmp_lt",
        "cmp_le",
        "cmp_gt",
        "cmp_ge",
        "cmp_eq",
        "cmp_ne",
      ],
    },
    os: {
      doc: "Operating-system interfaces: files, directories and processes.",
      members: [
        "args",
        "getenv",
        "setenv",
        "unsetenv",
        "environ",
        "exists",
        "is_file",
        "is_dir",
        "is_link",
        "read_file",
        "write_file",
        "read_lines",
        "read_bytes",
        "write_bytes",
        "mkdir",
        "mkdir_all",
        "rm",
        "rmdir",
        "rmdir_all",
        "ls",
        "cp",
        "mv",
        "join_path",
        "dir",
        "base",
        "file_name",
        "file_ext",
        "file_size",
        "executable",
        "getwd",
        "chdir",
        "open",
        "open_file",
        "create",
        "temp_dir",
        "user_home_dir",
        "home_dir",
        "hostname",
        "command",
        "execute",
        "exec",
        "system",
        "File",
        "Signal",
        "process_exists",
        "symlink",
        "is_abs_path",
      ],
    },
    time: {
      doc: "Date and time handling.",
      members: [
        "now",
        "unix",
        "since",
        "sleep",
        "new_time",
        "parse",
        "utc",
        "local",
        "from_unix",
        "Time",
        "Duration",
        "StopWatch",
        "new_stopwatch",
        "sys_mono_now",
        "weekday",
        "month",
        "days_from_civil",
        "is_leap_year",
        "days_in_month",
        "Format",
        "parse_format",
        "UnixTime",
      ],
    },
    math: {
      doc: "Mathematical functions and constants.",
      members: [
        "sqrt",
        "cbrt",
        "pow",
        "mod",
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
        "asinh",
        "acosh",
        "atanh",
        "exp",
        "log",
        "log2",
        "log10",
        "log_n",
        "floor",
        "ceil",
        "round",
        "trunc",
        "abs",
        "fabs",
        "max",
        "min",
        "is_nan",
        "is_inf",
        "is_finite",
        "gcd",
        "lcm",
        "factorial",
        "hypot",
        "sum",
        "degrees",
        "radians",
        "pi",
        "e",
        "tau",
        "rand",
        "seed",
        "max_i64",
        "min_i64",
        "max_u64",
        "div_euclid",
      ],
    },
    strings: {
      doc: "String manipulation functions.",
      members: [
        "split",
        "split_n",
        "split_into_lines",
        "split_by_whitespace",
        "split_any",
        "join",
        "trim_space",
        "trim",
        "trim_left",
        "trim_right",
        "trim_prefix",
        "trim_suffix",
        "to_upper",
        "to_lower",
        "capitalize",
        "contains",
        "contains_any",
        "index",
        "last_index",
        "index_after",
        "replace",
        "replace_once",
        "replace_each",
        "starts_with",
        "ends_with",
        "repeat",
        "reverse",
        "compare",
        "builder",
        "new_builder",
        "is_letter",
        "is_digit",
        "is_space",
        "is_hex_digit",
        "count",
        "fields",
        "all_after",
        "all_before",
        "clone",
        "bytes_to_string",
        "parse_int",
        "parse_uint",
        "parse_float",
        "contains_only",
        "strip_margin",
        "is_title",
        "is_lower",
        "is_upper",
        "Builder",
        "levenshtein_distance",
      ],
    },
    arrays: {
      doc: "Functions for working with arrays.",
      members: [
        "sort",
        "sort_by",
        "sort_with_compare",
        "sorted",
        "reverse",
        "reverse_in_place",
        "filter",
        "filter_indexed",
        "map",
        "map_indexed",
        "reduce",
        "reduce_indexed",
        "fold",
        "fold_indexed",
        "sum",
        "min",
        "max",
        "contains",
        "index",
        "last_index",
        "find_first",
        "find_last",
        "any",
        "all",
        "count",
        "first",
        "last",
        "clone",
        "copy",
        "insert",
        "prepend",
        "prepend_many",
        "join",
        "group",
        "chunk",
        "chunks",
        "window",
        "rotate_left",
        "rotate_right",
        "binary_search",
        "merge",
        "distinct",
        "uniq",
        "flatten",
        "trim",
        "shuffle",
        "get",
        "delete",
        "clear",
        "repeat",
      ],
    },
    maps: {
      doc: "Functions for working with maps.",
      members: ["keys", "values", "clone", "merge", "from_keys"],
    },
    json: {
      doc: "JSON encoding and decoding.",
      members: [
        "encode",
        "decode",
        "encode_pretty",
        "decode_any",
        "encode_opt",
        "decode_opt",
      ],
    },
    strconv: {
      doc: "Conversions between strings and numeric types.",
      members: [
        "atoi",
        "atof",
        "itoa",
        "utoa",
        "f32_to_str",
        "f64_to_str",
        "format_int",
        "format_uint",
        "format_float",
        "format_bool",
        "vint",
        "vstring",
        "v_escape",
        "v_unescape",
        "parse_int",
        "parse_uint",
        "parse_float",
        "parse_bool",
        "quote",
        "frog",
        "custom_format",
      ],
    },
    rand: {
      doc: "Pseudo-random number generation.",
      members: [
        "intn",
        "int63",
        "u32",
        "u64",
        "u32n",
        "u64n",
        "f32",
        "f64",
        "f64n",
        "string",
        "hex",
        "shuffle",
        "seed",
        "default",
        "ascii",
        "choices",
        "element",
        "wstring",
        "PRNG",
        "mt19937",
        "WyRand",
      ],
    },
    sync: {
      doc: "Synchronization primitives for concurrent code.",
      members: [
        "Mutex",
        "RwMutex",
        "WaitGroup",
        "Once",
        "new_waitgroup",
        "new_mutex",
        "new_rwmutex",
        "new_once",
        "PoolProcessor",
        "new_pool_processor",
        "Channel",
        "Thread",
      ],
    },
    log: {
      doc: "Logging utilities.",
      members: [
        "info",
        "warn",
        "error",
        "debug",
        "fatal",
        "set_level",
        "Log",
        "new_log",
        "Level",
        "Level.debug",
        "Level.info",
        "Level.warn",
        "Level.error",
        "Level.fatal",
      ],
    },
    flag: {
      doc: "Command-line flag parsing.",
      members: [
        "Flag",
        "new_flag",
        "parse",
        "free",
        "ARG",
        "FlagParser",
        "new_flag_parser",
      ],
    },
    benchmark: {
      doc: "Micro-benchmarking helpers.",
      members: ["measure", "measure_optional", "step", "StepTimer"],
    },
    datatypes: {
      doc: "Common data structures.",
      members: [
        "Stack",
        "Queue",
        "LinkedList",
        "DoublyLinkedList",
        "BSTree",
        "MinHeap",
        "MaxHeap",
        "Set",
        "new_stack",
        "new_queue",
        "new_linked_list",
        "new_doubly_linked_list",
        "new_bstree",
        "new_min_heap",
        "new_max_heap",
        "new_set",
      ],
    },
    net: {
      doc: "Low-level TCP/UDP networking.",
      members: [
        "dial_tcp",
        "dial_udp",
        "listen_tcp",
        "listen_udp",
        "new_udp_socket",
        "new_tcp_socket",
        "ListenSocket",
        "Connection",
        "TcpConn",
        "UdpConn",
        "Socket",
        "Address",
        "ip",
        "resolve_ip",
      ],
    },
    http: {
      doc: "HTTP client and server.",
      members: [
        "get",
        "post",
        "put",
        "patch",
        "delete",
        "head",
        "get_text",
        "download",
        "new_client",
        "Client",
        "new_server",
        "Server",
        "new_request",
        "Request",
        "Response",
        "Header",
        "Cookie",
        "FetchConfig",
        "FetchResult",
        "Params",
        "Status",
        "new_cookie",
      ],
    },
    term: {
      doc: "Terminal control and coloring.",
      members: [
        "header",
        "bold",
        "dim",
        "underline",
        "blink",
        "reverse",
        "hidden",
        "red",
        "green",
        "blue",
        "yellow",
        "magenta",
        "cyan",
        "white",
        "black",
        "gray",
        "bright_red",
        "bright_green",
        "bright_blue",
        "reset",
        "color",
        "clear",
        "cursor",
        "get_terminal_size",
        "set_cursor_position",
        "Cursor",
        "TermColor",
        "bg_red",
        "bg_green",
        "bg_blue",
      ],
    },
    encoding: {
      doc: "Base64, hex, binary and CSV encoders and decoders.",
      members: [
        "base64",
        "hex",
        "binary",
        "csv",
        "utf8",
        "Decoder",
        "Encoder",
      ],
    },
    crypto: {
      doc: "Cryptographic primitives.",
      members: [
        "md5",
        "sha1",
        "sha224",
        "sha256",
        "sha384",
        "sha512",
        "rand",
        "bcrypt",
        "blake2b",
        "blake2s",
        "rc4",
      ],
    },
    hash: {
      doc: "Non-cryptographic hashing.",
      members: [
        "sum",
        "sum64",
        "crc32",
        "adler32",
        "fnv1",
        "fnv1a",
        "fnv1_32",
        "fnv1a_32",
        "md5",
        "sha1",
      ],
    },
    io: {
      doc: "Stream reading and writing utilities.",
      members: [
        "read_all",
        "read_all_opt",
        "write_all",
        "copy",
        "BufferedReader",
        "BufferedWriter",
        "new_buffered_reader",
        "new_buffered_writer",
        "Reader",
        "Writer",
        "read_any",
        "write_any",
      ],
    },
    regex: {
      doc: "Regular expression matching.",
      members: [
        "Regex",
        "new_regex",
        "regex_opt",
        "match_string",
        "match_string_opt",
        "capture_group",
        "Match",
        "replace_by_fn",
      ],
    },
    cli: {
      doc: "Command-line application scaffolding.",
      members: [
        "Command",
        "CommandLineOption",
        "parse_args",
        "new_command",
        "new_command_line_option",
        "flag",
        "option",
      ],
    },
    readline: {
      doc: "Interactive line editing.",
      members: ["Readline", "new_readline"],
    },
    semver: {
      doc: "Semantic version parsing and comparison.",
      members: ["Version", "parse", "None", "is_valid"],
    },
    runtime: {
      doc: "Runtime introspection helpers.",
      members: ["nr_jobs", "set_nr_jobs", "GC", "is_comptime", "trim_memory"],
    },
    orm: {
      doc: "An object-relational mapping layer over SQL databases.",
      members: [
        "Connection",
        "connect",
        "Model",
        "SelectConfig",
        "InsertConfig",
        "UpdateConfig",
        "OrderType",
        "SqlType",
      ],
    },
    gg: {
      doc: "A minimal 2D graphics library on top of SDL.",
      members: [
        "new_context",
        "Context",
        "DrawImageConfig",
        "TextConfig",
        "Color",
        "MouseButton",
        "KeyCode",
        "Event",
        "Config",
        "create_image",
        "draw_text",
        "clear",
        "begin",
        "end",
      ],
    },
  };

  const STDLIB_TOP = Object.keys(MODULES);

  // Array / collection methods available through V's method-call syntax.
  const ARRAY_METHODS = [
    { l: "filter", d: "fn (a []T) filter(fn (x T) bool) []T", doc: "Returns the elements matching the predicate." },
    { l: "map", d: "fn (a []T) map(fn (x T) U) []U", doc: "Transforms every element with the given function." },
    { l: "reduce", d: "fn (a []T) reduce(fn (acc T, x T) T) T", doc: "Folds the array into a single value." },
    { l: "fold", d: "fn (a []T) fold(init U, fn (acc U, x T) U) U", doc: "Folds the array starting from an initial value." },
    { l: "sort", d: "fn (mut a []T) sort()", doc: "Sorts the array in place." },
    { l: "sort_by", d: "fn (mut a []T) sort_by(fn (a T, b T) int)", doc: "Sorts the array in place with a comparator." },
    { l: "sorted", d: "fn (a []T) sorted(fn (a T, b T) int) []T", doc: "Returns a sorted copy." },
    { l: "reverse", d: "fn (a []T) reverse() []T", doc: "Returns a reversed copy." },
    { l: "contains", d: "fn (a []T) contains(x T) bool", doc: "Reports whether the array contains a value." },
    { l: "index", d: "fn (a []T) index(x T) int", doc: "Returns the index of a value, or -1." },
    { l: "last_index", d: "fn (a []T) last_index(x T) int", doc: "Returns the last index of a value, or -1." },
    { l: "any", d: "fn (a []T) any(fn (x T) bool) bool", doc: "True if any element matches." },
    { l: "all", d: "fn (a []T) all(fn (x T) bool) bool", doc: "True if all elements match." },
    { l: "sum", d: "fn (a []T) sum() T", doc: "Returns the sum of the elements." },
    { l: "min", d: "fn (a []T) min() T", doc: "Returns the smallest element." },
    { l: "max", d: "fn (a []T) max() T", doc: "Returns the largest element." },
    { l: "first", d: "fn (a []T) first() T", doc: "Returns the first element." },
    { l: "last", d: "fn (a []T) last() T", doc: "Returns the last element." },
    { l: "clone", d: "fn (a []T) clone() []T", doc: "Returns a shallow copy." },
    { l: "join", d: "fn (a []string) join(sep string) string", doc: "Joins string elements with a separator." },
    { l: "chunk", d: "fn (a []T) chunk(size int) [][]T", doc: "Splits the array into chunks." },
    { l: "window", d: "fn (a []T) window(size int) [][]T", doc: "Returns overlapping windows of a given size." },
    { l: "insert", d: "fn (a []T) insert(i int, x T) []T", doc: "Returns a copy with a value inserted." },
    { l: "prepend", d: "fn (a []T) prepend(x T) []T", doc: "Returns a copy with a value prepended." },
    { l: "distinct", d: "fn (a []T) distinct() []T", doc: "Returns the unique elements." },
    { l: "uniq", d: "fn (a []T) uniq() []T", doc: "Removes consecutive duplicates." },
    { l: "trim", d: "fn (a []T) trim(fn (x T) bool) []T", doc: "Removes matching elements from both ends." },
    { l: "shuffle", d: "fn (a []T) shuffle() []T", doc: "Returns a randomly shuffled copy." },
    { l: "copy", d: "fn (dst []T) copy(src []T) int", doc: "Copies elements into the receiver." },
  ];

  const STRING_METHODS = [
    { l: "len", d: "string.len -> int", doc: "Length of the string in bytes." },
    { l: "to_upper", d: "fn (s string) to_upper() string", doc: "Returns the string uppercased." },
    { l: "to_lower", d: "fn (s string) to_lower() string", doc: "Returns the string lowercased." },
    { l: "trim_space", d: "fn (s string) trim_space() string", doc: "Trims surrounding whitespace." },
    { l: "trim", d: "fn (s string) trim(cutset string) string", doc: "Trims characters from both ends." },
    { l: "split", d: "fn (s string) split(delim string) []string", doc: "Splits the string on a delimiter." },
    { l: "split_n", d: "fn (s string) split_n(delim string, n int) []string", doc: "Splits into at most `n` parts." },
    { l: "contains", d: "fn (s string) contains(substr string) bool", doc: "Reports whether the substring occurs." },
    { l: "starts_with", d: "fn (s string) starts_with(prefix string) bool", doc: "Checks a prefix." },
    { l: "ends_with", d: "fn (s string) ends_with(suffix string) bool", doc: "Checks a suffix." },
    { l: "index", d: "fn (s string) index(substr string) int", doc: "Index of the first occurrence, or -1." },
    { l: "last_index", d: "fn (s string) last_index(substr string) int", doc: "Index of the last occurrence, or -1." },
    { l: "replace", d: "fn (s string) replace(old string, new string) string", doc: "Replaces all occurrences." },
    { l: "replace_once", d: "fn (s string) replace_once(old string, new string) string", doc: "Replaces the first occurrence." },
    { l: "repeat", d: "fn (s string) repeat(count int) string", doc: "Repeats the string." },
    { l: "reverse", d: "fn (s string) reverse() string", doc: "Reverses the string." },
    { l: "int", d: "fn (s string) int() int", doc: "Parses the string as an int." },
    { l: "i64", d: "fn (s string) i64() i64", doc: "Parses the string as an i64." },
    { l: "f32", d: "fn (s string) f32() f32", doc: "Parses the string as an f32." },
    { l: "f64", d: "fn (s string) f64() f64", doc: "Parses the string as an f64." },
    { l: "bytes", d: "fn (s string) bytes() []u8", doc: "Returns the string's bytes." },
    { l: "runes", d: "fn (s string) runes() []rune", doc: "Returns the string's runes." },
    { l: "clone", d: "fn (s string) clone() string", doc: "Returns a copy of the string." },
    { l: "capitalize", d: "fn (s string) capitalize() string", doc: "Capitalizes the first letter." },
    { l: "count", d: "fn (s string) count(substr string) int", doc: "Counts non-overlapping occurrences." },
  ];

  const MAP_METHODS = [
    { l: "keys", d: "fn (m map[K]V) keys() []K", doc: "Returns the keys of the map." },
    { l: "values", d: "fn (m map[K]V) values() []V", doc: "Returns the values of the map." },
    { l: "clone", d: "fn (m map[K]V) clone() map[K]V", doc: "Returns a shallow copy of the map." },
    { l: "delete", d: "fn (mut m map[K]V) delete(key K)", doc: "Removes a key from the map." },
  ];

  const SNIPPETS = [
    { label: "main", detail: "Main function", insert: "fn main() {\n\t${0}\n}" },
    {
      label: "println",
      detail: "Print a line",
      insert: "println(${0})",
    },
    {
      label: "function",
      detail: "Function definition",
      insert: "fn ${1:name}(${2}) ${3:ReturnType} {\n\t${0}\n}",
    },
    {
      label: "pub-fn",
      detail: "Public function",
      insert: "pub fn ${1:name}(${2}) ${3:ReturnType} {\n\t${0}\n}",
    },
    {
      label: "method",
      detail: "Method with receiver",
      insert:
        "fn (${1:r} ${2:Type}) ${3:name}(${4}) ${5:ReturnType} {\n\t${0}\n}",
    },
    {
      label: "struct",
      detail: "Struct definition",
      insert: "struct ${1:Name} {\n\t${2:field} ${3:Type}\n\t${0}\n}",
    },
    {
      label: "enum",
      detail: "Enum definition",
      insert: "enum ${1:Name} {\n\t${2:variant}\n\t${0}\n}",
    },
    {
      label: "sum-type",
      detail: "Sum type",
      insert:
        "type ${1:Name} = ${2:Variant1} | ${3:Variant2}\n\nfn (s ${1:Name}) str() string {\n\treturn match s {\n\t\t${2:Variant1} { '${2:Variant1}' }\n\t\t${3:Variant2} { '${3:Variant2}' }\n\t}\n}",
    },
    {
      label: "interface",
      detail: "Interface definition",
      insert: "interface ${1:Name} {\n\t${2:method}(${3}) ${4:ReturnType}\n}",
    },
    {
      label: "import",
      detail: "Import statement",
      insert: "import ${0:os}",
    },
    {
      label: "for",
      detail: "C-style for loop",
      insert: "for ${1:i} := 0; ${1:i} < ${2:n}; ${1:i}++ {\n\t${0}\n}",
    },
    {
      label: "for-in",
      detail: "For-in loop",
      insert: "for ${1:item} in ${2:collection} {\n\t${0}\n}",
    },
    {
      label: "for-in-index",
      detail: "For-in with index",
      insert: "for ${1:i}, ${2:item} in ${3:collection} {\n\t${0}\n}",
    },
    {
      label: "if",
      detail: "If statement",
      insert: "if ${1:condition} {\n\t${0}\n}",
    },
    {
      label: "if-else",
      detail: "If-else statement",
      insert: "if ${1:condition} {\n\t${2}\n} else {\n\t${0}\n}",
    },
    {
      label: "match",
      detail: "Match expression",
      insert: "match ${1:expr} {\n\t${2:pattern} {\n\t\t${3}\n\t}\n\telse {\n\t\t${0}\n\t}\n}",
    },
    {
      label: "or-block",
      detail: "Error handling block",
      insert: "${1:value} := ${2:fallible()} or {\n\t${0:return err}\n}",
    },
    {
      label: "defer",
      detail: "Defer block",
      insert: "defer {\n\t${0}\n}",
    },
    {
      label: "unsafe",
      detail: "Unsafe block",
      insert: "unsafe {\n\t${0}\n}",
    },
    {
      label: "if-guard",
      detail: "Optional guard",
      insert: "if ${1:opt} := ${2:expr} {\n\t${0}\n}",
    },
    {
      label: "struct-array",
      detail: "Struct with array field",
      insert: "struct ${1:Name} {\n\tmut:\n\t${2:items} []${3:int}\n}",
    },
    {
      label: "selector",
      detail: "Option/Result pattern",
      insert: "if ${1:result} := ${2:expr} {\n\t${3}\n} else {\n\t${0}\n}",
    },
    {
      label: "spawn",
      detail: "Spawn a thread",
      insert: "spawn ${1:fn_name}(${0})",
    },
    {
      label: "go",
      detail: "Start a coroutine",
      insert: "go ${1:fn_name}(${0})",
    },
    {
      label: "const",
      detail: "Constant declaration",
      insert: "const ${1:name} = ${0}",
    },
    {
      label: "mut",
      detail: "Mutable variable",
      insert: "mut ${1:name} := ${0}",
    },
    {
      label: "test",
      detail: "Test function",
      insert: "fn test_${1:name}() {\n\tassert ${2:condition}\n\t${0}\n}",
    },
  ];

  // ── Register language ────────────────────────────────────────────

  monaco.languages.register({
    id: V_LANG_ID,
    extensions: [".v", ".vsh", ".vv"],
    aliases: ["V", "vlang"],
    mimetypes: ["text/x-v"],
  });

  // ── Monarch tokenizer ────────────────────────────────────────────

  monaco.languages.setMonarchTokensProvider(V_LANG_ID, {
    defaultToken: "",
    tokenPostfix: ".v",

    keywords: V_KEYWORDS,
    typeKeywords: V_TYPES,
    constants: V_CONSTANTS,

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
      "++",
      "--",
      "==",
      "!=",
      "<=",
      ">=",
      "&&",
      "||",
      "<<",
      ">>",
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
      ":=",
      "...",
      "..",
      ".",
      "->",
      "=>",
    ],

    symbols: /[=><!~?&|+\-*\/\^%:]+/,
    escapes:
      /\\(?:[abefnrtv\\'"0]|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,

    tokenizer: {
      root: [
        // Attributes: [unsafe], [if linux], @[attr]
        [/@\[[^\]]*\]/, "annotation"],

        // Comments
        [/\/\/.*$/, "comment"],
        [/\/\*/, "comment", "@comment"],

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

        // Strings
        [/r['"]/, "string", "@string_raw"],
        [/'/, "string", "@string_single"],
        [/"/, "string", "@string_double"],
        [/`/, "string", "@string_backtick"],

        // Numbers
        [/0[xX][0-9a-fA-F][0-9a-fA-F_]*/, "number.hex"],
        [/0[bB][01][01_]*/, "number.binary"],
        [/0[oO][0-7][0-7_]*/, "number.octal"],
        [/\d[\d_]*\.\d[\d_]*([eE][\-+]?\d+)?/, "number.float"],
        [/\d[\d_]*[eE][\-+]?\d+/, "number.float"],
        [/\d[\d_]*/, "number"],

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
        [/[^/*]+/, "comment"],
        [/\*\//, "comment", "@pop"],
        [/[/*]/, "comment"],
      ],

      string_raw: [
        [/[^'"]+/, "string"],
        [/'|"/, "string", "@pop"],
      ],

      string_single: [
        [/\$\{/, { token: "delimiter", next: "@interpolation" }],
        [/[^\\'$]+/, "string"],
        [/@escapes/, "string.escape"],
        [/\\./, "string.escape.invalid"],
        [/'/, "string", "@pop"],
      ],

      string_double: [
        [/\$\{/, { token: "delimiter", next: "@interpolation" }],
        [/[^\\"$]+/, "string"],
        [/@escapes/, "string.escape"],
        [/\\./, "string.escape.invalid"],
        [/"/, "string", "@pop"],
      ],

      string_backtick: [
        [/[^`]+/, "string"],
        [/`/, "string", "@pop"],
      ],

      interpolation: [
        [/\}/, "delimiter", "@pop"],
        { include: "@root" },
      ],
    },
  });

  // ── Language configuration ───────────────────────────────────────

  monaco.languages.setLanguageConfiguration(V_LANG_ID, {
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
  });

  // ── Symbol indexing ──────────────────────────────────────────────

  type VSymbol = {
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
      if (trimmed.startsWith("//")) {
        docs.unshift(trimmed.replace(/^\/\/\/?/, "").trim());
        i--;
      } else {
        break;
      }
    }
    if (docs.length) return docs.join("\n");
    // Doc comment immediately above (not necessarily touching a declaration).
    return "";
  }

  function parseSymbols(model: Monaco.editor.ITextModel): VSymbol[] {
    const lines = model.getLinesContent();
    const symbols: VSymbol[] = [];

    const structRe =
      /^\s*(?:pub\s+)?(?:mut\s+)?(struct|enum|interface|union|type)\s+([A-Za-z_]\w*)/;
    const fnRe =
      /^\s*(?:pub\s+)?(?:@\[[^\]]*\]\s*)?(?:fn\s+)(?:\(([^)]*)\)\s*)?([A-Za-z_]\w*)\s*\(([^)]*)\)\s*([^{]*)/;
    const constRe = /^\s*(?:pub\s+)?const\s+([A-Za-z_]\w*)/;
    const typeDeclRe = /^\s*(?:pub\s+)?type\s+([A-Za-z_]\w*)\s*=/;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].replace(/\/\/.*$/, "");
      let m: RegExpMatchArray | null;

      if ((m = fnRe.exec(line))) {
        const receiver = m[1];
        const params = m[3].trim();
        const retType = (m[4] || "").trim().replace(/[{\s]+$/, "");
        const kind = receiver ? "method" : "function";
        symbols.push({
          name: m[2],
          kind,
          line: i + 1,
          col: line.indexOf(m[2]) + 1,
          detail: `fn ${receiver ? `(${receiver.trim()}) ` : ""}${m[2]}(${params})${retType ? " " + retType : ""}`,
          params,
          returnType: retType || "void",
          doc: extractDocComment(lines, i),
        });
        continue;
      }
      if ((m = structRe.exec(line))) {
        const lbl =
          m[1] === "type" ? "sum type" : m[1];
        symbols.push({
          name: m[2],
          kind: m[1] === "type" ? "sumtype" : m[1],
          line: i + 1,
          col: line.indexOf(m[2]) + 1,
          detail: `${lbl} ${m[2]}`,
          doc: extractDocComment(lines, i),
        });
        continue;
      }
      if ((m = typeDeclRe.exec(line))) {
        // `type X = A | B` (sum type) is handled by structRe already, but a
        // plain alias may slip through.
        if (!/^\s*(?:pub\s+)?type\s+\w+\s*=\s*$/.test(line)) {
          symbols.push({
            name: m[1],
            kind: "sumtype",
            line: i + 1,
            col: line.indexOf(m[1]) + 1,
            detail: line.trim(),
            doc: extractDocComment(lines, i),
          });
        }
        continue;
      }
      if ((m = constRe.exec(line))) {
        symbols.push({
          name: m[1],
          kind: "constant",
          line: i + 1,
          col: line.indexOf(m[1]) + 1,
          detail: line.trim(),
          doc: extractDocComment(lines, i),
        });
      }
    }
    return symbols;
  }

  // Locals that are not part of the outline: `:=` declarations, loop
  // variables and function parameters. Used for completion and hover only.
  function parseLocals(model: Monaco.editor.ITextModel) {
    const lines = model.getLinesContent();
    const out: { name: string; detail: string; line: number; col: number }[] =
      [];
    const seen = new Set<string>();
    const add = (name: string, detail: string, line: number, col: number) => {
      const key = name + ":" + line;
      if (seen.has(key)) return;
      seen.add(key);
      out.push({ name, detail, line, col });
    };
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].replace(/\/\/.*$/, "");
      let m: RegExpExecArray | null;
      const declRe =
        /\b(?:mut\s+|__global\s+|shared\s+|static\s+)?([A-Za-z_]\w*)\s*:=/g;
      while ((m = declRe.exec(line)) !== null) {
        add(m[1], `${m[1]} := ...`, i + 1, line.indexOf(m[1]) + 1);
      }
      const forRe =
        /\bfor\s+([A-Za-z_]\w*)(?:\s*,\s*([A-Za-z_]\w*))?\s*(?:in\b|:=)/g;
      while ((m = forRe.exec(line)) !== null) {
        add(m[1], `for ${m[1]}`, i + 1, line.indexOf(m[1]) + 1);
        if (m[2]) add(m[2], `for ${m[2]}`, i + 1, line.indexOf(m[2]) + 1);
      }
      const paramRe = /[(,]\s*([A-Za-z_]\w*)\s+[A-Za-z_\[&!?]/g;
      while ((m = paramRe.exec(line)) !== null) {
        add(m[1], `${m[1]} (parameter)`, i + 1, line.indexOf(m[1]) + 1);
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
      /\b(struct|enum|interface|union|type)\b/.test(prefix);

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

    // Local declarations: `mut`/`shared` bindings, `name := value`, `for name`,
    // and parameters (`name Type`, name preceded by `(` or `,`).
    const declaration = new RegExp(
      "\\b(?:mut|const|__global|shared|static)\\s+" +
        esc(name) +
        "\\b|\\b" +
        esc(name) +
        "\\s*:=" +
        "|\\bfor\\s+" +
        esc(name) +
        "\\b|(?:[(,]\\s*)" +
        esc(name) +
        "\\s+[A-Za-z_\\[&!?]",
      "g",
    );
    const declarations: { start: number; end: number; scope?: Scope }[] = [];
    for (let i = 0; i < lines.length; i++) {
      declaration.lastIndex = 0;
      let m;
      while ((m = declaration.exec(lines[i])) !== null) {
        const before = lines[i].slice(0, m.index).replace(/\s+$/, "");
        const isParam =
          /^[(,]/.test(m[0]) || before.endsWith("(") || before.endsWith(",");
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

  // ── Completion provider ──────────────────────────────────────────

  monaco.languages.registerCompletionItemProvider(V_LANG_ID, {
    triggerCharacters: [".", '"', "@"],
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

      // import module completion
      const importMatch = textUntil.match(/\bimport\s+([\w.]*)$/);
      if (importMatch) {
        STDLIB_TOP.forEach((mod) => {
          suggestions.push({
            label: mod,
            kind: CIK.Module,
            insertText: mod,
            detail: "V standard library module",
            documentation: MODULES[mod].doc,
            range,
            sortText: "0_" + mod,
          });
        });
        return { suggestions };
      }

      // module.member access (e.g. os.args)
      const modMatch = textUntil.match(/\b(\w+)\.(\w*)$/);
      if (modMatch && MODULES[modMatch[1]]) {
        const mod = modMatch[1];
        const typed = modMatch[2] || "";
        const modRange = {
          startLineNumber: position.lineNumber,
          startColumn: position.column - typed.length,
          endLineNumber: position.lineNumber,
          endColumn: position.column,
        };
        MODULES[mod].members.forEach((m) => {
          suggestions.push({
            label: m,
            kind: CIK.Function,
            insertText: m,
            detail: `${mod}.${m}`,
            documentation: MODULES[mod].doc,
            range: modRange,
            sortText: "0_" + m,
          });
        });
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
        const pushMembers = (list: { l: string; d: string; doc: string }[], kind: any) => {
          list.forEach((m) => {
            suggestions.push({
              label: m.l,
              kind,
              insertText: m.l,
              detail: m.d,
              documentation: m.doc,
              range: dotRange,
            });
          });
        };
        if (new RegExp(`${esc(obj)}\\s*:?=\\s*["\`']`).test(fullText)) {
          pushMembers(STRING_METHODS, CIK.Method);
          return { suggestions };
        }
        if (new RegExp(`${esc(obj)}\\s*:?=\\s*\\[`).test(fullText)) {
          pushMembers(ARRAY_METHODS, CIK.Method);
          return { suggestions };
        }
        if (new RegExp(`${esc(obj)}\\s*:?=\\s*(?:map\\[|\\{)`).test(fullText)) {
          pushMembers(MAP_METHODS, CIK.Method);
          return { suggestions };
        }
        // V method-call syntax makes array and string methods broadly useful.
        pushMembers(ARRAY_METHODS, CIK.Method);
        pushMembers(STRING_METHODS, CIK.Method);
        pushMembers(MAP_METHODS, CIK.Method);
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
      V_KEYWORDS.forEach((kw) => {
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
      V_TYPES.forEach((t) => {
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
      V_CONSTANTS.forEach((c) => {
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
          documentation: { value: info.doc },
          range,
          sortText: "2_" + name,
        });
      });

      // Modules
      STDLIB_TOP.forEach((mod) => {
        suggestions.push({
          label: mod,
          kind: CIK.Module,
          insertText: mod,
          detail: "V standard library module",
          documentation: MODULES[mod].doc,
          range,
          sortText: "6_" + mod,
        });
      });

      // Local variables, loop variables and parameters
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
        if (sym.kind === "function" || sym.kind === "method")
          kind = sym.kind === "method" ? CIK.Method : CIK.Function;
        else if (sym.kind === "struct") kind = CIK.Struct;
        else if (sym.kind === "enum") kind = CIK.Enum;
        else if (sym.kind === "interface") kind = CIK.Interface;
        else if (sym.kind === "union") kind = CIK.Struct;
        else if (sym.kind === "sumtype") kind = CIK.TypeParameter;
        else if (sym.kind === "constant") kind = CIK.Constant;
        suggestions.push({
          label: sym.name,
          kind,
          insertText:
            sym.kind === "function" || sym.kind === "method"
              ? sym.name + "(${1})"
              : sym.name,
          insertTextRules:
            sym.kind === "function" || sym.kind === "method"
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

  monaco.languages.registerHoverProvider(V_LANG_ID, {
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

      // module.member hover
      const modPrefix = lineContent
        .substring(0, word.endColumn - 1)
        .match(/\b(\w+)\.$/);
      if (modPrefix && MODULES[modPrefix[1]]) {
        const mod = modPrefix[1];
        if (MODULES[mod].members.includes(token)) {
          return {
            range: hoverRange,
            contents: [
              { value: "```v\n" + mod + "." + token + "\n```" },
              { value: MODULES[mod].doc },
            ],
          };
        }
      }

      // Keyword
      if (KEYWORD_DOCS[token]) {
        const info = KEYWORD_DOCS[token];
        return {
          range: hoverRange,
          contents: [
            { value: "```v\n" + info.sig + "\n```" },
            { value: info.doc },
            { value: "_keyword_" },
          ],
        };
      }

      // Builtin / module function
      if (BUILTIN_DOCS[token]) {
        const info = BUILTIN_DOCS[token];
        return {
          range: hoverRange,
          contents: [
            { value: "```v\n" + info.sig + "\n```" },
            { value: info.doc },
          ],
        };
      }

      // Module name
      if (MODULES[token]) {
        return {
          range: hoverRange,
          contents: [
            { value: "```v\nimport " + token + "\n```" },
            { value: MODULES[token].doc },
          ],
        };
      }

      // Type
      if (V_TYPES.includes(token)) {
        return {
          range: hoverRange,
          contents: [
            { value: "```v\n(type) " + token + "\n```" },
            { value: `Built-in type \`${token}\`` },
          ],
        };
      }

      // Local variables, loop variables and parameters
      const loc = parseLocals(model).find((s) => s.name === token);
      if (loc) {
        return {
          range: hoverRange,
          contents: [
            { value: "```v\n" + loc.detail + "\n```" },
            { value: `_Defined at line ${loc.line}_` },
          ],
        };
      }

      // Local symbol
      const sym = parseSymbols(model).find((s) => s.name === token);
      if (sym) {
        const contents: { value: string }[] = [
          { value: "```v\n" + sym.detail + "\n```" },
        ];
        if (sym.doc) contents.push({ value: sym.doc });
        contents.push({ value: `_Defined at line ${sym.line}_` });
        return { range: hoverRange, contents };
      }

      return null;
    },
  });

  // ── Definition provider ──────────────────────────────────────────

  monaco.languages.registerDefinitionProvider(V_LANG_ID, {
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

  monaco.languages.registerRenameProvider(V_LANG_ID, {
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
      if (V_KEYWORDS.includes(word.word))
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

  monaco.languages.registerDocumentSymbolProvider(V_LANG_ID, {
    provideDocumentSymbols(model) {
      const SK = monaco.languages.SymbolKind;
      return parseSymbols(model).map((sym) => {
        let kind = SK.Variable;
        if (sym.kind === "function") kind = SK.Function;
        else if (sym.kind === "method") kind = SK.Method;
        else if (sym.kind === "struct") kind = SK.Struct;
        else if (sym.kind === "enum") kind = SK.Enum;
        else if (sym.kind === "interface") kind = SK.Interface;
        else if (sym.kind === "union") kind = SK.Struct;
        else if (sym.kind === "sumtype") kind = SK.TypeParameter;
        else if (sym.kind === "constant") kind = SK.Constant;
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

  monaco.languages.registerSignatureHelpProvider(V_LANG_ID, {
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
        (s) =>
          s.name === funcName &&
          (s.kind === "function" || s.kind === "method"),
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
                label: `${sym.name}(${sym.params || ""}) ${sym.returnType || ""}`.trim(),
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

  monaco.languages.registerFoldingRangeProvider(V_LANG_ID, {
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
        if (blockComment === null && line.includes("/*") && !line.includes("*/")) {
          blockComment = i;
        } else if (blockComment !== null && line.includes("*/")) {
          if (i > blockComment) {
            ranges.push({
              start: blockComment + 1,
              end: i + 1,
              kind: monaco.languages.FoldingRangeKind.Comment,
            });
          }
          blockComment = null;
        }
        if (line.trimStart().startsWith("//")) {
          let end = i + 1;
          while (
            end < lines.length &&
            lines[end].trimStart().startsWith("//")
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
