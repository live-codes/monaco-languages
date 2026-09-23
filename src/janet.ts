import type * as Monaco from "monaco-editor";

export default (monaco: typeof Monaco) => {
  const LANG = "janet";

  /* ================================================================
   DATA
   ================================================================ */

  // The 13 special forms — the only forms the compiler treats specially.
  const SPECIAL_FORMS = [
    "def",
    "var",
    "fn",
    "do",
    "quote",
    "if",
    "splice",
    "while",
    "break",
    "set",
    "quasiquote",
    "unquote",
    "upscope",
  ];

  // Macros defined in the core library (boot.janet).
  const MACROS = [
    // definition
    "defn",
    "defn-",
    "defmacro",
    "defmacro-",
    "def-",
    "var-",
    "defdyn",
    "varfn",
    "as-macro",
    // control flow & binding
    "if-not",
    "when",
    "unless",
    "cond",
    "case",
    "and",
    "or",
    "try",
    "protect",
    "defer",
    "edefer",
    "with",
    "when-with",
    "if-with",
    "with-dyns",
    "with-env",
    "with-vars",
    "with-syms",
    "label",
    "prompt",
    "assert",
    "assertf",
    "default",
    "comment",
    "toggle",
    "chr",
    "tracev",
    "comptime",
    "compif",
    "compwhen",
    "short-fn",
    "match",
    // loops
    "loop",
    "seq",
    "catseq",
    "tabseq",
    "generate",
    "coro",
    "fiber-fn",
    "for",
    "forv",
    "each",
    "eachk",
    "eachp",
    "repeat",
    "forever",
    // threading
    "->",
    "->>",
    "-?>",
    "-?>>",
    "as->",
    "as?->",
    "as?->>",
    // imperative sugar
    "++",
    "--",
    "+=",
    "-=",
    "*=",
    "/=",
    "%=",
  ];

  // Core functions (defined in boot.janet and the C core library).
  const CORE = [
    // arithmetic & comparison
    "+",
    "-",
    "*",
    "/",
    "%",
    "mod",
    "div",
    "inc",
    "dec",
    "sum",
    "mean",
    "geomean",
    "product",
    "=",
    "not=",
    "<",
    ">",
    "<=",
    ">=",
    "compare",
    "compare=",
    "compare<",
    "compare<=",
    "compare>",
    "compare>=",
    "max",
    "min",
    "max-of",
    "min-of",
    "extreme",
    // predicates
    "nil?",
    "true?",
    "false?",
    "truthy?",
    "number?",
    "string?",
    "symbol?",
    "keyword?",
    "buffer?",
    "function?",
    "cfunction?",
    "table?",
    "struct?",
    "array?",
    "tuple?",
    "boolean?",
    "fiber?",
    "indexed?",
    "dictionary?",
    "bytes?",
    "abstract?",
    "pointer?",
    "nan?",
    "zero?",
    "pos?",
    "neg?",
    "one?",
    "even?",
    "odd?",
    "int?",
    "nat?",
    "empty?",
    "lengthable?",
    "idempotent?",
    "has-key?",
    "has-value?",
    "deep=",
    "deep-not=",
    // types & conversion
    "type",
    "describe",
    "freeze",
    "thaw",
    "thaw-keep-keys",
    "scan-number",
    "keyword",
    "symbol",
    "buffer",
    "table",
    "struct",
    "array",
    "tuple",
    "string",
    "number",
    "hash",
    // strings
    "string/from-bytes",
    "string/bytes",
    "string/format",
    "string/join",
    "string/slice",
    "string/find",
    "string/find-all",
    "string/has-prefix?",
    "string/has-suffix?",
    "string/replace",
    "string/replace-all",
    "string/repeat",
    "string/reverse",
    "string/split",
    "string/trim",
    "string/triml",
    "string/trimr",
    "string/ascii-lower",
    "string/ascii-upper",
    "string/check-set",
    "string/escape",
    // sequences
    "length",
    "first",
    "last",
    "get",
    "in",
    "put",
    "next",
    "keys",
    "values",
    "pairs",
    "kvs",
    "from-pairs",
    "map",
    "mapcat",
    "filter",
    "count",
    "keep",
    "find",
    "find-index",
    "index-of",
    "reduce",
    "reduce2",
    "accumulate",
    "accumulate2",
    "reverse",
    "reverse!",
    "sort",
    "sort-by",
    "sorted",
    "sorted-by",
    "distinct",
    "flatten",
    "flatten-into",
    "interleave",
    "interpose",
    "partition",
    "partition-by",
    "frequencies",
    "group-by",
    "take",
    "take-while",
    "take-until",
    "drop",
    "drop-while",
    "drop-until",
    "every?",
    "any?",
    "all",
    "some",
    "invert",
    "zipcoll",
    "merge",
    "merge-into",
    "update",
    "update-in",
    "put-in",
    "get-in",
    // arrays
    "array/new",
    "array/new-filled",
    "array/push",
    "array/pop",
    "array/peek",
    "array/concat",
    "array/slice",
    "array/insert",
    "array/remove",
    "array/clear",
    "array/ensure",
    "array/fill",
    "array/blit",
    "array/join",
    // tuples
    "tuple/slice",
    "tuple/brackets",
    "tuple/type",
    "tuple/sourcemap",
    "tuple/setmap",
    // tables & structs
    "table/new",
    "table/clone",
    "table/to-struct",
    "table/getproto",
    "table/setproto",
    "table/rawget",
    "table/proto-flatten",
    "table/keys",
    "table/values",
    "struct/to-table",
    "struct/getproto",
    "struct/rawget",
    "struct/proto-flatten",
    // buffers
    "buffer/new",
    "buffer/new-filled",
    "buffer/push",
    "buffer/push-string",
    "buffer/push-byte",
    "buffer/push-word",
    "buffer/popn",
    "buffer/clear",
    "buffer/format",
    "buffer/blit",
    "buffer/fill",
    "buffer/trim",
    // math
    "math/abs",
    "math/ceil",
    "math/floor",
    "math/round",
    "math/trunc",
    "math/sqrt",
    "math/cbrt",
    "math/pow",
    "math/exp",
    "math/log",
    "math/log2",
    "math/log10",
    "math/sin",
    "math/cos",
    "math/tan",
    "math/asin",
    "math/acos",
    "math/atan",
    "math/atan2",
    "math/hypot",
    "math/random",
    "math/seedrandom",
    "math/rng",
    "math/rng-int",
    "math/rng-uniform",
    "math/gamma",
    "math/lgamma",
    "math/erf",
    "math/erfc",
    "math/frexp",
    "math/ldexp",
    "math/modf",
    "math/next",
    "math/pi",
    "math/e",
    "math/inf",
    "math/nan",
    "math/int-min",
    "math/int-max",
    "math/int32-min",
    "math/int32-max",
    // io
    "print",
    "prin",
    "printf",
    "eprint",
    "eprin",
    "eprintf",
    "pp",
    "flush",
    "eflush",
    "getline",
    "slurp",
    "spit",
    "file/open",
    "file/close",
    "file/read",
    "file/write",
    "file/lines",
    "file/seek",
    "file/tell",
    "file/flush",
    // os
    "os/exit",
    "os/getenv",
    "os/setenv",
    "os/environ",
    "os/cwd",
    "os/dir",
    "os/stat",
    "os/lstat",
    "os/mkdir",
    "os/rmdir",
    "os/rename",
    "os/remove",
    "os/symlink",
    "os/readlink",
    "os/realpath",
    "os/cryptorand",
    "os/time",
    "os/mktime",
    "os/date",
    "os/clock",
    "os/sleep",
    "os/which",
    "os/arch",
    "os/perm-int",
    "os/perm-string",
    "os/execute",
    "os/spawn",
    "os/shell",
    "os/proc-wait",
    "os/proc-kill",
    "os/umask",
    // fibers
    "fiber/new",
    "fiber/resume",
    "fiber/status",
    "fiber/current",
    "fiber/root",
    "fiber/can-resume?",
    "fiber/setmaxstack",
    "fiber/getenv",
    "fiber/setenv",
    "fiber/maxstack",
    "fiber/last-value",
    "resume",
    "yield",
    "signal",
    "propagate",
    "cancel",
    // peg
    "peg/compile",
    "peg/match",
    "peg/replace",
    "peg/replace-all",
    "peg/find",
    "peg/find-all",
    // parser
    "parser/new",
    "parser/consume",
    "parser/produce",
    "parser/status",
    "parser/error",
    "parser/eof",
    "parser/has-more",
    "parser/byte",
    "parser/where",
    "parser/flush",
    "parser/state",
    // modules & evaluation
    "require",
    "import",
    "import*",
    "dofile",
    "module/find",
    "module/expand-path",
    "module/loaders",
    "module/paths",
    "module/cache",
    "module/loading",
    "module/add-paths",
    "module/add-file-extension",
    "module/add-syspath",
    "make-env",
    "curenv",
    "run-context",
    "eval",
    "eval-string",
    "parse",
    "parse-all",
    "make-image",
    "load-image",
    "quit",
    "doc",
    "all-bindings",
    "bad-parse",
    "bad-compile",
    "warn-compile",
    "macex",
    "macex1",
    "walk",
    "postwalk",
    "prewalk",
    "keep-syntax",
    "keep-syntax!",
    // int
    "int/s64",
    "int/u64",
    "int/s32",
    "int/u32",
    "int/s16",
    "int/u16",
    "int/s8",
    "int/u8",
    "int/to-bytes",
    "int/to-number",
    "int/from-bytes",
    "int/type",
    // net
    "net/connect",
    "net/read",
    "net/write",
    "net/close",
    "net/server",
    "net/flush",
    "net/chunk",
    "net/accept",
    // crypto
    "crypto/hash",
    "crypto/hmac",
    "crypto/random",
    "crypto/aes-encrypt",
    "crypto/aes-decrypt",
    // debug
    "debug/stacktrace",
    "debug/break",
    "debug/unbreak",
    "debug/step",
    "debug/arg-stack",
    "debug/stack",
    "debug/lineage",
    "debug/getinfo",
    "debug/getlocal",
    "debug/getupvalue",
    "debug/setlocal",
    "debug/setupvalue",
    "debug/function",
    // path & json
    "path/join",
    "path/dirname",
    "path/basename",
    "path/ext",
    "path/abspath",
    "path/normalize",
    "json/encode",
    "json/decode",
    // misc
    "gensym",
    "error",
    "errorf",
    "identity",
    "complement",
    "comp",
    "partial",
    "juxt",
    "juxt*",
    "disasm",
    "marshal",
    "unmarshal",
    "native?",
    "dyn",
    "setdyn",
    "return",
  ];

  // Literal constants.
  const CONSTANTS = ["nil", "true", "false"];

  const ALL_KEYWORDS = [...SPECIAL_FORMS, ...MACROS];

  /* ================================================================
   DOCUMENTATION
   ================================================================ */

  const DOCS = {
    // === Special forms ===
    def: {
      s: "(def name meta... value)",
      d: "Bind a value to a symbol in the current scope. Supports destructuring and, at the top level, metadata and a docstring.",
      e: "(def answer 42)\n(def [a b] (range 10))\n(def {:x x} @{:x 3})",
    },
    var: {
      s: "(var name meta... value)",
      d: "Like def, but the binding can be updated later with set.",
      e: "(var n 0)\n(set n (+ n 1))",
    },
    fn: {
      s: "(fn name? args body...)",
      d: "Create a function (closure). The argument tuple may be square or round brackets; use & for variadic arguments.",
      e: "(fn [x y] (+ x y))\n(fn [& args] (length args))\n(fn name [x] x)",
    },
    do: {
      s: "(do body...)",
      d: "Evaluate a series of forms for side effects in a new lexical scope, evaluating to the last form.",
      e: "(do (print 1) (print 2) 3)",
    },
    quote: {
      s: "(quote x)  or  'x",
      d: "Evaluate to the literal value of x without compiling or evaluating it.",
      e: "'(1 2 3)\n(quote hi)",
    },
    if: {
      s: "(if condition when-true when-false?)",
      d: "Branch on condition. Only nil and false are falsey; when-false defaults to nil.",
      e: '(if (> x 0) "positive" "non-positive")',
    },
    splice: {
      s: "(splice x)  or  ;x",
      d: "Insert the contents of an array or tuple inline into a call or literal constructor.",
      e: "(+ ;@[1 2 3])\n[;(range 3)]",
    },
    while: {
      s: "(while condition body...)",
      d: "Loop while condition is truthy. Introduces a new lexical scope and always evaluates to nil.",
      e: "(var i 0)\n(while (< i 10) (print i) (++ i))",
    },
    break: {
      s: "(break value?)",
      d: "Break out of the innermost while loop, or return early from a function with an optional value.",
      e: "(while true (if (> (math/random) 0.95) (break)))",
    },
    set: {
      s: "(set l-value r-value)",
      d: "Update a var, or a value at a key in a data structure. Evaluates to r-value.",
      e: "(set x 11)\n(set (tab :key) \"value\")",
    },
    quasiquote: {
      s: "(quasiquote x)  or  ~x",
      d: "Like quote, but unquote and splice forms inside x are evaluated. Useful for writing macros.",
      e: "~(def ,name ,value)",
    },
    unquote: {
      s: "(unquote x)  or  ,x",
      d: "Evaluate and insert x inside a quasiquote. Invalid outside of a quasiquote.",
      e: "~(print ,x)",
    },
    upscope: {
      s: "(upscope body...)",
      d: "Like do, but does not introduce a new lexical scope, so bindings escape into the surrounding scope.",
      e: "(upscope (def a 1) (def b 2))",
    },

    // === Definition macros ===
    defn: {
      s: "(defn name meta... args body...)",
      d: "Define a function. Equivalent to (def name (fn name [args] ...)).",
      e: '(defn greet\n  "Say hello."\n  [name]\n  (string "Hello, " name "!"))',
    },
    "defn-": {
      s: "(defn- name meta... args body...)",
      d: "Like defn, but marks the binding private so it is not exported.",
      e: "(defn- helper [x] (* x 2))",
    },
    defmacro: {
      s: "(defmacro name meta... args body...)",
      d: "Define a macro — a function run at compile time that returns a form to be compiled.",
      e: "(defmacro twice [x] ~(do ,x ,x))",
    },
    "defmacro-": {
      s: "(defmacro- name meta... args body...)",
      d: "Like defmacro, but marks the binding private.",
      e: "(defmacro- swap [a b] ~(let [t ,a] (set ,a ,b) (set ,b t)))",
    },
    "def-": {
      s: "(def- name meta... value)",
      d: "Like def, but marks the binding private.",
      e: "(def- secret 42)",
    },
    "var-": {
      s: "(var- name meta... value)",
      d: "Like var, but marks the binding private.",
      e: "(var- counter 0)",
    },
    defdyn: {
      s: "(defdyn alias meta... keyword)",
      d: "Define a lexically scoped alias for a keyword used as a dynamic binding. The alias must start and end with *.",
      e: "(defdyn *my-opt* \"doc\" :my-opt)",
    },
    varfn: {
      s: "(varfn name meta... args body...)",
      d: "Like defn, but defines the function as a var so it can be rebound.",
      e: "(varfn handler [x] (print x))",
    },
    "as-macro": {
      s: "(as-macro f args...)",
      d: "Use a function or macro value f as a macro, avoiding variable capture inside quasiquote.",
      e: "(as-macro ,my-macro arg1 arg2)",
    },
    defglobal: {
      s: "(defglobal name value)",
      d: "Dynamically create a global def from a symbol or string name.",
      e: '(defglobal "answer" 42)',
    },
    varglobal: {
      s: "(varglobal name init)",
      d: "Dynamically create a global var from a symbol or string name.",
      e: '(varglobal "counter" 0)',
    },

    // === Control flow & binding ===
    "if-not": {
      s: "(if-not condition then else?)",
      d: "Shorthand for (if (not condition) else then).",
      e: "(if-not (empty? xs) (print (first xs)))",
    },
    when: {
      s: "(when condition body...)",
      d: "Evaluate body when condition is truthy, otherwise return nil.",
      e: '(when (> x 0) (print "positive"))',
    },
    unless: {
      s: "(unless condition body...)",
      d: "Evaluate body when condition is falsey, otherwise return nil.",
      e: "(unless (empty? xs) (print (length xs)))",
    },
    cond: {
      s: "(cond clause...)",
      d: "Evaluate condition/expression pairs in order, returning the expression of the first truthy condition. An odd trailing form is the default.",
      e: '(cond\n  (< n 0) "negative"\n  (= n 0) "zero"\n  "positive")',
    },
    case: {
      s: "(case dispatch clause...)",
      d: "Select the body whose value equals dispatch. An odd trailing form is the default.",
      e: "(case n\n  1 :one\n  2 :two\n  :other)",
    },
    and: {
      s: "(and form...)",
      d: "Short-circuiting logical AND. Returns the first falsey value, or the last value.",
      e: "(and 1 2 3) # => 3",
    },
    or: {
      s: "(or form...)",
      d: "Short-circuiting logical OR. Returns the first truthy value, or the last value.",
      e: "(or nil false 3) # => 3",
    },
    try: {
      s: "(try body catch)",
      d: "Evaluate body, catching errors. catch is a form whose first element binds the error and optional fiber.",
      e: "(try\n  (error \"boom\")\n  ([err] (print err)))",
    },
    protect: {
      s: "(protect body...)",
      d: "Evaluate body, capturing errors. Returns a tuple [ok? result].",
      e: "(protect (error \"boom\")) # => [false \"boom\"]",
    },
    defer: {
      s: "(defer form body...)",
      d: "Run form unconditionally after body, even if body throws an error.",
      e: "(defer (file/close f) (file/write f data))",
    },
    edefer: {
      s: "(edefer form body...)",
      d: "Run form after body only if body terminates abnormally; otherwise return the last form of body.",
      e: "(edefer (print \"cleanup\") (do-work))",
    },
    with: {
      s: "(with [binding ctor dtor] body...)",
      d: "Bind binding to ctor and evaluate body, calling dtor (or :close) to clean up even on error.",
      e: "(with [f (file/open \"x\" :r)] (file/read f :all))",
    },
    "when-with": {
      s: "(when-with [binding ctor dtor] body...)",
      d: "Like with, but if the binding is falsey, return nil without evaluating body.",
      e: "(when-with [f (file/open \"x\" :r)] (file/read f :all))",
    },
    "if-with": {
      s: "(if-with [binding ctor dtor] truthy falsey?)",
      d: "Like with, but choose truthy or falsey path based on whether ctor produced a truthy binding.",
      e: "(if-with [f (file/open \"x\" :r)] (file/read f :all) \"missing\")",
    },
    "with-dyns": {
      s: "(with-dyns bindings body...)",
      d: "Run body in a new fiber with dynamic bindings set from key/value pairs.",
      e: "(with-dyns [:out buffer] (print \"captured\"))",
    },
    "with-env": {
      s: "(with-env env body...)",
      d: "Run body with a given environment table.",
      e: "(with-env (make-env) (def x 1))",
    },
    "with-vars": {
      s: "(with-vars vars body...)",
      d: "Evaluate body with each var in vars temporarily rebound, restoring the old values afterwards.",
      e: "(with-vars [*debug* true] (run))",
    },
    "with-syms": {
      s: "(with-syms syms body...)",
      d: "Evaluate body with each symbol in syms bound to a fresh generated symbol.",
      e: "(with-syms [tmp] ~(let [,tmp ,x] ,tmp))",
    },
    label: {
      s: "(label name body...)",
      d: "Set a lexically scoped label point that can be returned to with return.",
      e: "(label done (each x xs (if (bad? x) (return done nil))))",
    },
    prompt: {
      s: "(prompt tag body...)",
      d: "Set up a checkpoint that can be returned to with (return tag value).",
      e: "(prompt :outer (prompt :inner (return :outer 1)))",
    },
    assert: {
      s: "(assert x err?)",
      d: "Throw an error if x is falsey; err is only evaluated on failure.",
      e: "(assert (pos? n) \"n must be positive\")",
    },
    assertf: {
      s: "(assertf x fmt args...)",
      d: "Like assert, but formats the error message with string/format.",
      e: '(assertf (pos? n) "expected positive, got %d" n)',
    },
    default: {
      s: "(default sym val)",
      d: "Define a default value for an optional argument; expands to a def that keeps sym when it is not nil.",
      e: "(defn f [x &opt y] (default y 10) (+ x y))",
    },
    comment: {
      s: "(comment body...)",
      d: "Ignore the body entirely.",
      e: "(comment (this-is-not-evaluated))",
    },
    toggle: {
      s: "(toggle value)",
      d: "Set a value to its boolean inverse. Same as (set value (not value)).",
      e: "(toggle flag)",
    },
    chr: {
      s: "(chr c)",
      d: "Convert a compile-time string of length 1 to its byte value.",
      e: '(chr "a") # => 97',
    },
    tracev: {
      s: "(tracev x)",
      d: "Print a value and the source form that produced it to stderr, evaluating to x.",
      e: "(tracev (+ 1 2))",
    },
    comptime: {
      s: "(comptime x)",
      d: "Evaluate x at compile time and return the result.",
      e: "(def answer (comptime (+ 40 2)))",
    },
    compif: {
      s: "(compif cnd tru fals?)",
      d: "Check cnd at compile time; compile tru if truthy, else fals.",
      e: '(compif (= (os/which) :windows) "win" "other")',
    },
    compwhen: {
      s: "(compwhen cnd body...)",
      d: "Compile (upscope body...) when cnd is truthy at compile time, else compile nil.",
      e: "(compwhen (dyn 'os/stat) (def have-stat true))",
    },
    "short-fn": {
      s: "(short-fn body)  or  |(body)",
      d: "Shorthand for fn. Arguments are $ (first) and $0, $1, ...; $& makes the function variadic.",
      e: "|(* $ $)\n|(+ $0 $1)",
    },
    match: {
      s: "(match x pattern body ... default?)",
      d: "Pattern matching. Patterns may be symbols, arrays/tuples, tables/structs, tuples of predicates, or literals.",
      e: "(match x\n  {:name name} name\n  [a b] (+ a b)\n  _ :other)",
    },

    // === Loops ===
    loop: {
      s: "(loop head body...)",
      d: "General-purpose loop. head is a tuple of bindings and modifiers such as :range, :in, :keys, :pairs, :let, :when and :until.",
      e: "(loop [i :range [0 5]] (print i))\n(loop [x :in xs :when (even? x)] (print x))",
    },
    seq: {
      s: "(seq head body...)",
      d: "Like loop, but accumulates each body result into an array and returns it.",
      e: "(seq [x :range [0 5]] (* x x)) # => @[0 1 4 9 16]",
    },
    catseq: {
      s: "(catseq head body...)",
      d: "Like loop, but concatenates each body result into an array and returns it.",
      e: "(catseq [x :range [0 3]] [x x])",
    },
    tabseq: {
      s: "(tabseq head key-body value-body)",
      d: "Like loop, but accumulates key/value pairs into a table.",
      e: "(tabseq [x :range [0 3]] x (* x x))",
    },
    generate: {
      s: "(generate head body...)",
      d: "Create a generator fiber that yields each body value from the loop.",
      e: "(generate [x :range [0 5]] x)",
    },
    coro: {
      s: "(coro body...)",
      d: "Create a coroutine fiber that may yield multiple values.",
      e: "(coro (yield 1) (yield 2))",
    },
    "fiber-fn": {
      s: "(fiber-fn flags body...)",
      d: "Create a fiber with the given flags, running body.",
      e: "(fiber-fn :yi (yield 1))",
    },
    for: {
      s: "(for i start stop body...)",
      d: "C-style for-loop for side effects. Returns nil.",
      e: "(for i 0 10 (print i))",
    },
    forv: {
      s: "(forv i start stop body...)",
      d: "Like for, but the iteration variable can be mutated inside the loop.",
      e: "(forv i 0 10 (++ i) (print i))",
    },
    each: {
      s: "(each binding x body...)",
      d: "Loop over each value in x, binding it (with destructuring) and running body. Returns nil.",
      e: "(each v [1 2 3] (print v))",
    },
    eachk: {
      s: "(eachk binding x body...)",
      d: "Loop over each key in x, binding it and running body. Returns nil.",
      e: "(eachk k {:a 1} (print k))",
    },
    eachp: {
      s: "(eachp binding x body...)",
      d: "Loop over each key/value pair in x as a tuple, binding it and running body. Returns nil.",
      e: "(eachp [k v] {:a 1} (print k v))",
    },
    repeat: {
      s: "(repeat n body...)",
      d: "Evaluate body n times. Returns nil.",
      e: "(repeat 3 (print \"hi\"))",
    },
    forever: {
      s: "(forever body...)",
      d: "Evaluate body repeatedly until a break statement.",
      e: "(forever (print (getline)))",
    },

    // === Threading ===
    "->": {
      s: "(-> x forms...)",
      d: "Thread x as the second value in each successive form (thread-first).",
      e: "(-> x (+ 1) (* 2))",
    },
    "->>": {
      s: "(->> x forms...)",
      d: "Thread x as the last value in each successive form (thread-last).",
      e: "(->> xs (map inc) (reduce + 0))",
    },
    "-?>": {
      s: "(-?> x forms...)",
      d: "Like ->, but returns nil as soon as an intermediate value is nil.",
      e: "(-?> user (:name))",
    },
    "-?>>": {
      s: "(-?>> x forms...)",
      d: "Like ->>, but returns nil as soon as an intermediate value is nil.",
      e: "(-?>> xs (map inc))",
    },
    "as->": {
      s: "(as-> x as forms...)",
      d: "Thread forms together, replacing as with the previous value; as may appear anywhere in a form.",
      e: "(as-> 5 x (+ x 3) (* x 2))",
    },
    "as?->": {
      s: "(as?-> x as forms...)",
      d: "Like as->, but returns nil if any intermediate value is falsey.",
      e: "(as?-> 5 x (+ x 3))",
    },
    "as?->>": {
      s: "(as?->> x as forms...)",
      d: "Like as->, but returns nil if any intermediate value is falsey.",
      e: "(as?->> xs x (map inc x))",
    },
    "++": { s: "(++ x)", d: "Increment the var x by 1.", e: "(var i 0) (++ i)" },
    "--": { s: "(-- x)", d: "Decrement the var x by 1.", e: "(var i 5) (-- i)" },
    "+=": { s: "(+= x ns...)", d: "Shorthand for (set x (+ x ns)).", e: "(+= total 10)" },
    "-=": { s: "(-= x ns...)", d: "Shorthand for (set x (- x ns)).", e: "(-= total 10)" },
    "*=": { s: "(*= x ns...)", d: "Shorthand for (set x (* x ns)).", e: "(*= total 2)" },
    "/=": { s: "(/= x ns...)", d: "Shorthand for (set x (/ x ns)).", e: "(/= total 2)" },
    "%=": { s: "(%= x ns...)", d: "Shorthand for (set x (% x ns)).", e: "(%= total 3)" },

    // === Core functions ===
    "+": { s: "(+ & xs)", d: "Returns the sum of the numbers.", e: "(+ 1 2 3) # => 6" },
    "-": { s: "(- x & xs)", d: "Negates x, or subtracts the remaining numbers from x.", e: "(- 10 3) # => 7" },
    "*": { s: "(* & xs)", d: "Returns the product of the numbers.", e: "(* 2 3 4) # => 24" },
    "/": { s: "(/ x & xs)", d: "Returns the reciprocal of x, or divides x by the remaining numbers.", e: "(/ 10 2) # => 5" },
    "%": { s: "(% dividend divisor)", d: "Returns the remainder of dividend divided by divisor, with the sign of the dividend.", e: "(% -10 3) # => -1" },
    mod: { s: "(mod dividend divisor)", d: "Returns the modulo of dividend and divisor, with the sign of the divisor.", e: "(mod -10 3) # => 2" },
    div: { s: "(div dividend divisor)", d: "Returns the integer division of dividend by divisor.", e: "(div 10 3) # => 3" },
    inc: { s: "(inc x)", d: "Returns x + 1.", e: "(inc 41) # => 42" },
    dec: { s: "(dec x)", d: "Returns x - 1.", e: "(dec 43) # => 42" },
    sum: { s: "(sum x)", d: "Returns the sum of the values of x, or 0 when empty.", e: "(sum [1 2 3]) # => 6" },
    mean: { s: "(mean x)", d: "Returns the arithmetic mean of the values of x.", e: "(mean [1 2 3]) # => 2" },
    product: { s: "(product x)", d: "Returns the product of the values of x, or 1 when empty.", e: "(product [2 3 4]) # => 24" },
    "=": { s: "(= & xs)", d: "Returns true when all arguments are equal.", e: "(= 1 1 1) # => true" },
    "not=": { s: "(not= & xs)", d: "Returns true when not all arguments are equal.", e: "(not= 1 2) # => true" },
    "<": { s: "(< & xs)", d: "Returns true when the arguments are in strictly increasing order.", e: "(< 1 2 3) # => true" },
    ">": { s: "(> & xs)", d: "Returns true when the arguments are in strictly decreasing order.", e: "(> 3 2 1) # => true" },
    "<=": { s: "(<= & xs)", d: "Returns true when the arguments are non-decreasing.", e: "(<= 1 1 2) # => true" },
    ">=": { s: "(>= & xs)", d: "Returns true when the arguments are non-increasing.", e: "(>= 3 3 1) # => true" },
    compare: { s: "(compare x y)", d: "Polymorphic comparison returning -1, 0 or 1.", e: "(compare 1 2) # => -1" },
    max: { s: "(max & args)", d: "Returns the numeric maximum of the arguments.", e: "(max 1 3 2) # => 3" },
    min: { s: "(min & args)", d: "Returns the numeric minimum of the arguments.", e: "(min 1 3 2) # => 1" },
    "nil?": { s: "(nil? x)", d: "Check if x is nil.", e: "(nil? nil) # => true" },
    "true?": { s: "(true? x)", d: "Check if x is true.", e: "(true? true) # => true" },
    "false?": { s: "(false? x)", d: "Check if x is false.", e: "(false? false) # => true" },
    "truthy?": { s: "(truthy? x)", d: "Check if x is truthy (not nil and not false).", e: "(truthy? 0) # => true" },
    "number?": { s: "(number? x)", d: "Check if x is a number.", e: "(number? 42) # => true" },
    "string?": { s: "(string? x)", d: "Check if x is a string.", e: '(string? "hi") # => true' },
    "symbol?": { s: "(symbol? x)", d: "Check if x is a symbol.", e: "(symbol? 'hi) # => true" },
    "keyword?": { s: "(keyword? x)", d: "Check if x is a keyword.", e: "(keyword? :hi) # => true" },
    "buffer?": { s: "(buffer? x)", d: "Check if x is a buffer.", e: "(buffer? @\"\") # => true" },
    "function?": { s: "(function? x)", d: "Check if x is a function (not a cfunction).", e: "(function? (fn [] 1))" },
    "cfunction?": { s: "(cfunction? x)", d: "Check if x is a cfunction.", e: "(cfunction? +) # => true" },
    "table?": { s: "(table? x)", d: "Check if x is a table.", e: "(table? @{}) # => true" },
    "struct?": { s: "(struct? x)", d: "Check if x is a struct.", e: "(struct? {}) # => true" },
    "array?": { s: "(array? x)", d: "Check if x is an array.", e: "(array? @[]) # => true" },
    "tuple?": { s: "(tuple? x)", d: "Check if x is a tuple.", e: "(tuple? []) # => true" },
    "boolean?": { s: "(boolean? x)", d: "Check if x is a boolean.", e: "(boolean? true) # => true" },
    "fiber?": { s: "(fiber? x)", d: "Check if x is a fiber.", e: "(fiber? (fiber/new (fn [] 1)))" },
    "indexed?": { s: "(indexed? x)", d: "Check if x is an array or tuple.", e: "(indexed? @[1 2]) # => true" },
    "dictionary?": { s: "(dictionary? x)", d: "Check if x is a table or struct.", e: "(dictionary? {}) # => true" },
    "bytes?": { s: "(bytes? x)", d: "Check if x is a string or buffer.", e: '(bytes? "hi") # => true' },
    "abstract?": { s: "(abstract? x)", d: "Check if x is an abstract type.", e: "(abstract? (file/open \"x\" :r))" },
    "nan?": { s: "(nan? x)", d: "Check if x is NaN.", e: "(nan? math/nan) # => true" },
    "zero?": { s: "(zero? x)", d: "Check if x is zero.", e: "(zero? 0) # => true" },
    "pos?": { s: "(pos? x)", d: "Check if x is greater than 0.", e: "(pos? 5) # => true" },
    "neg?": { s: "(neg? x)", d: "Check if x is less than 0.", e: "(neg? -3) # => true" },
    "one?": { s: "(one? x)", d: "Check if x is equal to 1.", e: "(one? 1) # => true" },
    "even?": { s: "(even? x)", d: "Check if x is even.", e: "(even? 4) # => true" },
    "odd?": { s: "(odd? x)", d: "Check if x is odd.", e: "(odd? 3) # => true" },
    "int?": { s: "(int? x)", d: "Check if x can be represented as a 32 bit signed integer.", e: "(int? 42) # => true" },
    "nat?": { s: "(nat? x)", d: "Check if x is a non-negative integer.", e: "(nat? 3) # => true" },
    "empty?": { s: "(empty? iter)", d: "Check if an iterable is empty.", e: "(empty? []) # => true" },
    "lengthable?": { s: "(lengthable? x)", d: "Check if x has a length method.", e: "(lengthable? [1 2]) # => true" },
    "has-key?": { s: "(has-key? x key)", d: "Check if x maps key to a non-nil value.", e: "(has-key? {:a 1} :a) # => true" },
    "has-value?": { s: "(has-value? x value)", d: "Check if x contains value.", e: "(has-value? [1 2] 2) # => true" },
    "deep=": { s: "(deep= x y)", d: "Like =, but mutable types are compared structurally. Slower than =.", e: "(deep= @[1 2] @[1 2]) # => true" },
    "deep-not=": { s: "(deep-not= x y)", d: "The negation of deep=.", e: "(deep-not= @[1] @[2]) # => true" },
    type: { s: "(type x)", d: "Returns the type of x as a keyword.", e: "(type 42) # => :number" },
    describe: { s: "(describe x)", d: "Returns a string describing x.", e: "(describe [1 2]) # => \"<tuple 0x...>\"" },
    freeze: { s: "(freeze x)", d: "Deep-copy x into an immutable value.", e: "(freeze @[1 2]) # => (1 2)" },
    thaw: { s: "(thaw ds)", d: "Deep-copy ds into a mutable value.", e: "(thaw [1 2]) # => @[1 2]" },
    "scan-number": { s: "(scan-number str)", d: "Parse a number from a string, or nil on failure.", e: '(scan-number "0x10") # => 16' },
    keyword: { s: "(keyword & xs)", d: "Create a keyword from strings/symbols.", e: '(keyword "hello") # => :hello' },
    symbol: { s: "(symbol & xs)", d: "Create a symbol from strings/symbols.", e: '(symbol "hello") # => hello' },
    gensym: { s: "(gensym)", d: "Returns a unique symbol.", e: "(gensym) # => _0000xx" },
    error: { s: "(error msg)", d: "Throws a runtime error with the given value.", e: '(error "boom")' },
    errorf: { s: "(errorf fmt & args)", d: "Like error, formatting the message with string/format.", e: '(errorf "bad value %d" n)' },
    identity: { s: "(identity x)", d: "Returns x unchanged.", e: "(identity 42) # => 42" },
    complement: { s: "(complement f)", d: "Returns a function that returns the logical negation of f's result.", e: "((complement even?) 3) # => true" },
    comp: { s: "(comp & fns)", d: "Compose functions right-to-left.", e: "((comp inc *) 2 3) # => 7" },
    partial: { s: "(partial f & args)", d: "Partial function application.", e: "((partial + 5) 10) # => 15" },
    juxt: { s: "(juxt & fns)", d: "Returns a function producing a tuple of each function applied to the arguments.", e: "((juxt inc dec) 5) # => (6 4)" },
    "juxt*": { s: "(juxt* & funs)", d: "Function form of juxt.", e: "((juxt* inc dec) 5)" },
    length: { s: "(length ds)", d: "Returns the length of a string, buffer, array, tuple or dictionary.", e: "(length [1 2 3]) # => 3" },
    first: { s: "(first xs)", d: "Returns the first element of an indexed or bytes value, or nil.", e: "(first [1 2 3]) # => 1" },
    last: { s: "(last xs)", d: "Returns the final element of an indexed or bytes value.", e: "(last [1 2 3]) # => 3" },
    get: { s: "(get ds key &opt dflt)", d: "Look up key in a data structure, returning dflt or nil when missing.", e: "(get {:a 1} :a) # => 1" },
    in: { s: "(in ds key)", d: "Look up key, erroring when missing.", e: "(in [10 20] 1) # => 20" },
    put: { s: "(put ds key value)", d: "Mutate an array, table or buffer at key.", e: "(put @{} :a 1)" },
    next: { s: "(next ds &opt key)", d: "Get the next key after key in an iterable.", e: "(next [1 2] nil) # => 0" },
    keys: { s: "(keys ds)", d: "Get the keys of ds as an array.", e: "(keys {:a 1}) # => @[:a]" },
    values: { s: "(values ds)", d: "Get the values of ds as an array.", e: "(values {:a 1}) # => @[1]" },
    pairs: { s: "(pairs ds)", d: "Return an array of key/value tuples.", e: "(pairs {:a 1}) # => @[[:a 1]]" },
    kvs: { s: "(kvs dict)", d: "Return a flat array of alternating keys and values.", e: "(kvs {:a 1}) # => @[:a 1]" },
    "from-pairs": { s: "(from-pairs ps)", d: "Create a table from a sequence of pairs.", e: "(from-pairs [[:a 1]])" },
    map: { s: "(map f ind & inds)", d: "Map f over the values of ind, returning a new array.", e: "(map inc [1 2 3]) # => @[2 3 4]" },
    mapcat: { s: "(mapcat f ind & inds)", d: "Map f over ind and concatenate the results.", e: "(mapcat (fn [x] [x x]) [1 2]) # => @[1 1 2 2]" },
    filter: { s: "(filter pred ind)", d: "Return a new array of the values for which pred is truthy.", e: "(filter even? [1 2 3 4]) # => @[2 4]" },
    count: { s: "(count pred ind & inds)", d: "Count the values for which pred is truthy.", e: "(count even? [1 2 3 4]) # => 2" },
    keep: { s: "(keep pred ind & inds)", d: "Return a new array of the truthy results of pred.", e: "(keep (fn [x] (if (even? x) x)) [1 2 3 4]) # => @[2 4]" },
    find: { s: "(find pred ind &opt dflt)", d: "Find the first value satisfying pred.", e: "(find even? [1 3 4]) # => 4" },
    "find-index": { s: "(find-index pred ind &opt dflt)", d: "Find the index of the first value satisfying pred.", e: "(find-index even? [1 3 4]) # => 2" },
    "index-of": { s: "(index-of val ind &opt dflt)", d: "Find the first key whose value equals val.", e: "(index-of 3 [1 2 3]) # => 2" },
    reduce: { s: "(reduce f init ind)", d: "Left fold of ind using f, starting from init.", e: "(reduce + 0 [1 2 3]) # => 6" },
    reduce2: { s: "(reduce2 f ind)", d: "Left fold using the first element as the initial value.", e: "(reduce2 + [1 2 3]) # => 6" },
    accumulate: { s: "(accumulate f init ind)", d: "Like reduce, but accumulates each intermediate result into an array.", e: "(accumulate + 0 [1 2 3]) # => @[1 3 6]" },
    reverse: { s: "(reverse xs)", d: "Reverse the order of the values in xs.", e: "(reverse [1 2 3]) # => @[3 2 1]" },
    "reverse!": { s: "(reverse! xs)", d: "Reverse xs in place and return it.", e: "(reverse! @[1 2 3])" },
    sort: { s: "(sort ind &opt before?)", d: "Sort an array or buffer in place and return it.", e: "(sort @[3 1 2]) # => @[1 2 3]" },
    "sort-by": { s: "(sort-by f ind)", d: "Sort ind in place by comparing (f element).", e: "(sort-by length @[\"ccc\" \"a\" \"bb\"])" },
    sorted: { s: "(sorted ind &opt before?)", d: "Return a new sorted array based on ind.", e: "(sorted [3 1 2]) # => @[1 2 3]" },
    distinct: { s: "(distinct xs)", d: "Return an array of the deduplicated values in xs.", e: "(distinct [1 1 2]) # => @[1 2]" },
    flatten: { s: "(flatten ind)", d: "Return a depth-first traversal of an indexed value as an array.", e: "(flatten [1 [2 [3]]]) # => @[1 2 3]" },
    interleave: { s: "(interleave & xs)", d: "Return an array interleaving the values of each collection.", e: "(interleave [1 2] [3 4]) # => @[1 3 2 4]" },
    interpose: { s: "(interpose val x)", d: "Return an array of the values of x separated by val.", e: "(interpose :sep [1 2 3]) # => @[1 :sep 2 :sep 3]" },
    partition: { s: "(partition n ind)", d: "Partition the values of ind into tuples of size n.", e: "(partition 2 [1 2 3 4]) # => @[[1 2] [3 4]]" },
    "partition-by": { s: "(partition-by f ind)", d: "Partition values whenever (f value) changes.", e: "(partition-by even? [2 4 1 3])" },
    frequencies: { s: "(frequencies ind)", d: "Return a table of occurrence counts for each value.", e: "(frequencies [:a :b :a]) # => @{:a 2 :b 1}" },
    "group-by": { s: "(group-by f ind)", d: "Group values of ind into a table keyed by (f value).", e: "(group-by even? [1 2 3 4])" },
    take: { s: "(take n ind)", d: "Take the first n elements, or the last n when n is negative.", e: "(take 2 [1 2 3 4]) # => (1 2)" },
    "take-while": { s: "(take-while pred ind)", d: "Take elements while pred is truthy.", e: "(take-while pos? [1 2 -1 3]) # => (1 2)" },
    "take-until": { s: "(take-until pred ind)", d: "Take elements until pred is truthy.", e: "(take-until neg? [1 2 -1 3]) # => (1 2)" },
    drop: { s: "(drop n ind)", d: "Drop the first n elements, or the last n when n is negative.", e: "(drop 2 [1 2 3 4]) # => (3 4)" },
    "drop-while": { s: "(drop-while pred ind)", d: "Drop elements while pred is truthy.", e: "(drop-while pos? [1 2 -1 3]) # => (-1 3)" },
    "every?": { s: "(every? xs)", d: "Return the first falsey value, or the last value when all are truthy.", e: "(every? [1 2 3]) # => 3" },
    "any?": { s: "(any? xs)", d: "Return the first truthy value, or nil when all are falsey.", e: "(any? [nil 3]) # => 3" },
    all: { s: "(all pred ind & inds)", d: "Return true when pred is truthy for every value, else the first falsey result.", e: "(all even? [2 4]) # => true" },
    some: { s: "(some pred ind & inds)", d: "Return the first truthy result of pred, or nil.", e: "(some even? [1 3 4]) # => true" },
    invert: { s: "(invert ds)", d: "Return a table with keys and values swapped.", e: "(invert {:a 1}) # => @{1 :a}" },
    zipcoll: { s: "(zipcoll ks vs)", d: "Create a table pairing values at the same index.", e: "(zipcoll [:a :b] [1 2]) # => @{:a 1 :b 2}" },
    merge: { s: "(merge & dicts)", d: "Merge dictionaries into a new table; later values win.", e: "(merge {:a 1} {:b 2}) # => @{:a 1 :b 2}" },
    "merge-into": { s: "(merge-into tab & dicts)", d: "Merge dictionaries into tab; later values win.", e: "(merge-into @{} {:a 1})" },
    update: { s: "(update x key f & args)", d: "Replace the value at key with the result of applying f to it.", e: "(update @{:n 1} :n inc)" },
    "update-in": { s: "(update-in x ks f & args)", d: "Update a nested value at the key path ks.", e: "(update-in @{:a @{:n 1}} [:a :n] inc)" },
    "put-in": { s: "(put-in x ks val)", d: "Put val at a nested key path ks.", e: "(put-in @{} [:a :b] 1)" },
    "get-in": { s: "(get-in x ks &opt dflt)", d: "Look up a nested value at the key path ks.", e: "(get-in {:a {:b 1}} [:a :b]) # => 1" },
    "array/new": { s: "(array/new &opt capacity)", d: "Create a new empty array.", e: "(array/new 4)" },
    "array/new-filled": { s: "(array/new-filled count &opt value)", d: "Create an array of count copies of value.", e: "(array/new-filled 3 0) # => @[0 0 0]" },
    "array/push": { s: "(array/push arr & values)", d: "Push values onto the end of arr and return arr.", e: "(array/push @[] 1 2) # => @[1 2]" },
    "array/pop": { s: "(array/pop arr)", d: "Remove and return the last element of arr.", e: "(array/pop @[1 2]) # => 2" },
    "array/peek": { s: "(array/peek arr)", d: "Return the last element of arr without removing it.", e: "(array/peek @[1 2]) # => 2" },
    "array/concat": { s: "(array/concat arr & parts)", d: "Concatenate parts onto the end of arr and return arr.", e: "(array/concat @[1] [2 3]) # => @[1 2 3]" },
    "array/slice": { s: "(array/slice arrtup &opt start end)", d: "Return a new array from a slice of arrtup.", e: "(array/slice @[1 2 3] 1) # => @[2 3]" },
    "array/insert": { s: "(array/insert arr at & vals)", d: "Insert values into arr at index at.", e: "(array/insert @[1 3] 1 2) # => @[1 2 3]" },
    "array/remove": { s: "(array/remove arr at &opt n)", d: "Remove n values from arr starting at index at.", e: "(array/remove @[1 2 3] 1) # => @[1 3]" },
    "array/join": { s: "(array/join parts &opt sep)", d: "Join an array of parts into a buffer.", e: "(array/join @[1 2] \", \")" },
    "tuple/slice": { s: "(tuple/slice arrtup &opt start end)", d: "Return a new tuple from a slice of arrtup.", e: "(tuple/slice [1 2 3] 1) # => (2 3)" },
    "tuple/brackets": { s: "(tuple/brackets & args)", d: "Create a bracketed tuple from args.", e: "(tuple/brackets 1 2) # => [1 2]" },
    "table/new": { s: "(table/new &opt capacity)", d: "Create a new empty table.", e: "(table/new)" },
    "table/clone": { s: "(table/clone tab)", d: "Shallow-copy tab into a new table.", e: "(table/clone @{:a 1})" },
    "table/to-struct": { s: "(table/to-struct tab)", d: "Convert a table into a struct.", e: "(table/to-struct @{:a 1}) # => {:a 1}" },
    "table/getproto": { s: "(table/getproto tab)", d: "Get the prototype table of tab.", e: "(table/getproto @{})" },
    "table/setproto": { s: "(table/setproto tab proto)", d: "Set the prototype of tab.", e: "(table/setproto @{} @{})" },
    "struct/to-table": { s: "(struct/to-table st)", d: "Convert a struct into a table.", e: "(struct/to-table {:a 1}) # => @{:a 1}" },
    "struct/getproto": { s: "(struct/getproto st)", d: "Get the prototype of st.", e: "(struct/getproto {})" },
    "buffer/new": { s: "(buffer/new &opt capacity)", d: "Create a new empty buffer.", e: "(buffer/new 16)" },
    "buffer/push": { s: "(buffer/push buf & values)", d: "Push values onto buf and return buf.", e: '(buffer/push @"" 1 2)' },
    "buffer/push-string": { s: "(buffer/push-string buf & values)", d: "Push strings onto buf and return buf.", e: '(buffer/push-string @"" "hi")' },
    "buffer/format": { s: "(buffer/format buf fmt & args)", d: "Append a formatted string to buf.", e: '(buffer/format @"" "%d" 42)' },
    "buffer/clear": { s: "(buffer/clear buf)", d: "Set the length of buf to 0.", e: "(buffer/clear @\"abc\")" },
    print: { s: "(print & xs)", d: "Print values to (dyn :out) separated by spaces, followed by a newline.", e: '(print "hello" 42)' },
    prin: { s: "(prin & xs)", d: "Like print but without a trailing newline.", e: '(prin "hello")' },
    printf: { s: "(printf fmt & args)", d: "Print a formatted string to (dyn :out).", e: '(printf "%d items" n)' },
    eprint: { s: "(eprint & xs)", d: "Print values to (dyn :err) followed by a newline.", e: '(eprint "oops")' },
    eprintf: { s: "(eprintf fmt & args)", d: "Print a formatted string to (dyn :err).", e: '(eprintf "error: %s" msg)' },
    pp: { s: "(pp x)", d: "Pretty-print x to (dyn :out).", e: "(pp {:a 1})" },
    flush: { s: "(flush)", d: "Flush (dyn :out).", e: "(flush)" },
    eflush: { s: "(eflush)", d: "Flush (dyn :err).", e: "(eflush)" },
    getline: { s: "(getline &opt prompt buf env)", d: "Read a line of input from (dyn :in).", e: '(getline "> ")' },
    slurp: { s: "(slurp path)", d: "Read all data from a file and return it as a string.", e: '(slurp "data.txt")' },
    spit: { s: "(spit path contents &opt mode)", d: "Write contents to a file at path.", e: '(spit "out.txt" "hi")' },
    "string/format": { s: "(string/format fmt & args)", d: "Format a string with printf-style specifiers.", e: '(string/format "%d-%s" 1 "a") # => "1-a"' },
    "string/join": { s: "(string/join ind &opt sep)", d: "Join an array of values into a string.", e: '(string/join ["a" "b"] ", ") # => "a, b"' },
    "string/slice": { s: "(string/slice bytes &opt start end)", d: "Return a substring of bytes.", e: '(string/slice "hello" 1 3) # => "el"' },
    "string/find": { s: "(string/find patt bytes &opt start)", d: "Find the first match of patt in bytes.", e: '(string/find "ll" "hello")' },
    "string/find-all": { s: "(string/find-all patt bytes &opt start)", d: "Find all matches of patt in bytes.", e: '(string/find-all "l" "hello")' },
    "string/has-prefix?": { s: "(string/has-prefix? patt bytes)", d: "Check if bytes starts with patt.", e: '(string/has-prefix? "he" "hello") # => true' },
    "string/has-suffix?": { s: "(string/has-suffix? patt bytes)", d: "Check if bytes ends with patt.", e: '(string/has-suffix? "lo" "hello") # => true' },
    "string/replace": { s: "(string/replace patt subst bytes)", d: "Replace the first occurrence of patt in bytes.", e: '(string/replace "l" "L" "hello")' },
    "string/replace-all": { s: "(string/replace-all patt subst bytes)", d: "Replace all occurrences of patt in bytes.", e: '(string/replace-all "l" "L" "hello")' },
    "string/repeat": { s: "(string/repeat bytes n)", d: "Return bytes repeated n times.", e: '(string/repeat "ab" 2) # => "abab"' },
    "string/reverse": { s: "(string/reverse bytes)", d: "Reverse the bytes of a string.", e: '(string/reverse "abc") # => "cba"' },
    "string/split": { s: "(string/split delim str &opt start limit)", d: "Split a string on a delimiter into an array.", e: '(string/split "," "a,b,c")' },
    "string/trim": { s: "(string/trim str &opt set)", d: "Trim whitespace from both ends of a string.", e: '(string/trim "  hi  ") # => "hi"' },
    "string/triml": { s: "(string/triml str &opt set)", d: "Trim whitespace from the left of a string.", e: '(string/triml "  hi") # => "hi"' },
    "string/trimr": { s: "(string/trimr str &opt set)", d: "Trim whitespace from the right of a string.", e: '(string/trimr "hi  ") # => "hi"' },
    "string/ascii-lower": { s: "(string/ascii-lower str)", d: "Return an ASCII-lowercased copy of str.", e: '(string/ascii-lower "HELLO") # => "hello"' },
    "string/ascii-upper": { s: "(string/ascii-upper str)", d: "Return an ASCII-uppercased copy of str.", e: '(string/ascii-upper "hello") # => "HELLO"' },
    "string/bytes": { s: "(string/bytes str)", d: "Return an array of the byte values of a string.", e: '(string/bytes "abc") # => @[97 98 99]' },
    "string/from-bytes": { s: "(string/from-bytes & bytes)", d: "Create a string from byte values.", e: "(string/from-bytes 104 105) # => \"hi\"" },
    "string/check-set": { s: "(string/check-set set str)", d: "Check that all bytes of str are in set.", e: '(string/check-set "abc" "cab") # => true' },
    "string/escape": { s: "(string/escape str escape-table)", d: "Escape bytes in str using an escape table.", e: '(string/escape "hi" {104 "H"})' },
    "math/abs": { s: "(math/abs x)", d: "Return the absolute value of x.", e: "(math/abs -5) # => 5" },
    "math/ceil": { s: "(math/ceil x)", d: "Return the smallest integer >= x.", e: "(math/ceil 3.2) # => 4" },
    "math/floor": { s: "(math/floor x)", d: "Return the largest integer <= x.", e: "(math/floor 3.7) # => 3" },
    "math/round": { s: "(math/round x)", d: "Round x to the nearest integer.", e: "(math/round 3.5) # => 4" },
    "math/trunc": { s: "(math/trunc x)", d: "Truncate x toward zero.", e: "(math/trunc -3.7) # => -3" },
    "math/sqrt": { s: "(math/sqrt x)", d: "Return the square root of x.", e: "(math/sqrt 16) # => 4" },
    "math/pow": { s: "(math/pow a b)", d: "Return a raised to the power b.", e: "(math/pow 2 10) # => 1024" },
    "math/exp": { s: "(math/exp x)", d: "Return e raised to the power x.", e: "(math/exp 0) # => 1" },
    "math/log": { s: "(math/log x)", d: "Return the natural logarithm of x.", e: "(math/log math/e) # => 1" },
    "math/sin": { s: "(math/sin x)", d: "Return the sine of x (radians).", e: "(math/sin 0) # => 0" },
    "math/cos": { s: "(math/cos x)", d: "Return the cosine of x (radians).", e: "(math/cos 0) # => 1" },
    "math/random": { s: "(math/random)", d: "Return a uniformly random number in [0, 1).", e: "(math/random)" },
    "math/rng": { s: "(math/rng &opt seed)", d: "Create a new random number generator.", e: "(math/rng 42)" },
    "math/rng-int": { s: "(math/rng-int rng &opt max)", d: "Return a random integer from an rng.", e: "(math/rng-int (math/rng 1) 100)" },
    "math/pi": { s: "math/pi", d: "The constant pi.", e: "(* 2 math/pi)" },
    "math/e": { s: "math/e", d: "The constant e.", e: "math/e" },
    "math/inf": { s: "math/inf", d: "Positive infinity.", e: "math/inf" },
    "math/nan": { s: "math/nan", d: "Not-a-number.", e: "math/nan" },
    "file/open": { s: "(file/open path &opt mode)", d: "Open a file and return a file handle.", e: '(file/open "data.txt" :r)' },
    "file/close": { s: "(file/close file)", d: "Close a file handle.", e: "(file/close f)" },
    "file/read": { s: "(file/read file what &opt buf)", d: "Read from a file: :all, :line, or a number of bytes.", e: "(file/read f :all)" },
    "file/write": { s: "(file/write file & values)", d: "Write values to a file.", e: '(file/write f "hi")' },
    "file/lines": { s: "(file/lines file)", d: "Return an iterator over the lines of a file.", e: "(each line (file/lines f) (print line))" },
    "os/exit": { s: "(os/exit &opt code)", d: "Exit the program with the given status code.", e: "(os/exit 0)" },
    "os/getenv": { s: "(os/getenv &opt name)", d: "Get an environment variable, or all of them.", e: '(os/getenv "PATH")' },
    "os/setenv": { s: "(os/setenv name &opt value)", d: "Set an environment variable, or unset it.", e: '(os/setenv "FOO" "bar")' },
    "os/cwd": { s: "(os/cwd)", d: "Return the current working directory.", e: "(os/cwd)" },
    "os/dir": { s: "(os/dir path &opt array)", d: "List the contents of a directory.", e: '(os/dir ".")' },
    "os/stat": { s: "(os/stat path &opt tab)", d: "Get information about a file.", e: '(os/stat "x")' },
    "os/mkdir": { s: "(os/mkdir path)", d: "Create a directory.", e: '(os/mkdir "newdir")' },
    "os/remove": { s: "(os/remove path)", d: "Remove a file or empty directory.", e: '(os/remove "x")' },
    "os/time": { s: "(os/time)", d: "Return the current time in seconds since the epoch.", e: "(os/time)" },
    "os/clock": { s: "(os/clock)", d: "Return the processor time used so far, in seconds.", e: "(os/clock)" },
    "os/sleep": { s: "(os/sleep n)", d: "Sleep for n seconds.", e: "(os/sleep 1)" },
    "os/which": { s: "(os/which)", d: "Return the current operating system as a keyword.", e: "(os/which) # => :windows" },
    "os/arch": { s: "(os/arch)", d: "Return the current architecture as a keyword.", e: "(os/arch) # => :x64" },
    "os/execute": { s: "(os/execute args &opt flags env)", d: "Execute a program, waiting for it to finish.", e: '(os/execute ["ls" "-l"] :p)' },
    "os/shell": { s: "(os/shell cmd)", d: "Run a shell command, returning its output.", e: '(os/shell "ls -l")' },
    "fiber/new": { s: "(fiber/new func &opt sigmask env)", d: "Create a new fiber from a function.", e: "(fiber/new (fn [] 1))" },
    "fiber/resume": { s: "(fiber/resume fiber &opt value)", d: "Resume a fiber with an optional value.", e: "(fiber/resume f)" },
    "fiber/status": { s: "(fiber/status fib)", d: "Get the status of a fiber.", e: "(fiber/status f) # => :dead" },
    "fiber/current": { s: "(fiber/current)", d: "Return the current fiber.", e: "(fiber/current)" },
    "fiber/can-resume?": { s: "(fiber/can-resume? fiber)", d: "Check if a fiber can be resumed.", e: "(fiber/can-resume? f)" },
    resume: { s: "(resume fiber &opt x)", d: "Resume a fiber with an optional value.", e: "(resume f 42)" },
    yield: { s: "(yield &opt value)", d: "Yield a value from the current fiber.", e: "(yield 1)" },
    signal: { s: "(signal what &opt value)", d: "Raise a signal in the current fiber.", e: "(signal 0 :stop)" },
    propagate: { s: "(propagate x fiber)", d: "Propagate a signal from a child fiber to the current fiber.", e: "(propagate err f)" },
    cancel: { s: "(cancel fiber &opt value)", d: "Cancel a fiber, resuming it with a cancellation signal.", e: "(cancel f)" },
    require: { s: "(require path &opt args)", d: "Load a module and return its environment.", e: '(require "mymodule")' },
    import: { s: "(import path & args)", d: "Import a module, merging its exports into the current environment.", e: '(import "mymodule")' },
    dofile: { s: "(dofile path &opt env)", d: "Evaluate a file of Janet source in an environment.", e: '(dofile "script.janet")' },
    "make-env": { s: "(make-env &opt parent)", d: "Create a new environment table inheriting from parent.", e: "(make-env)" },
    curenv: { s: "(curenv &opt n)", d: "Get the current environment table.", e: "(curenv)" },
    "run-context": { s: "(run-context opts)", d: "Run a context, encapsulating parsing, compilation and evaluation.", e: "(run-context {:env (curenv)})" },
    eval: { s: "(eval form &opt env)", d: "Evaluate a form in the current environment.", e: "(eval '(+ 1 2)) # => 3" },
    "eval-string": { s: "(eval-string str &opt env)", d: "Evaluate all forms in a string.", e: '(eval-string "(+ 1 2)") # => 3' },
    parse: { s: "(parse str)", d: "Parse a string and return the first value.", e: '(parse "(+ 1 2)")' },
    "parse-all": { s: "(parse-all str)", d: "Parse a string and return all values as an array.", e: '(parse-all "1 2 3")' },
    quit: { s: "(quit &opt value)", d: "Exit the current repl or run-context.", e: "(quit 0)" },
    doc: { s: "(doc &opt sym)", d: "Show the docstring for a binding, or search for bindings by name.", e: "(doc defn)" },
    "all-bindings": { s: "(all-bindings &opt env)", d: "Return all bindings in an environment as a table.", e: "(all-bindings)" },
    macex: { s: "(macex x &opt on-binding)", d: "Fully expand macros in a form.", e: "(macex '(when true 1))" },
    "macex1": { s: "(macex1 x &opt on-binding)", d: "Expand macros in a form without recursively expanding macros.", e: "(macex1 '(when true 1))" },
    walk: { s: "(walk f form)", d: "Apply f to the direct children of form, collecting results.", e: "(walk inc [1 2 3])" },
    postwalk: { s: "(postwalk f form)", d: "Do a post-order traversal of a data structure, calling (f x).", e: "(postwalk inc [1 2])" },
    prewalk: { s: "(prewalk f form)", d: "Do a pre-order traversal of a data structure, calling (f x).", e: "(prewalk inc [1 2])" },
    "peg/match": { s: "(peg/match peg text &opt start & args)", d: "Match text against a PEG grammar.", e: '(peg/match ~(some "a") "aaa")' },
    "peg/compile": { s: "(peg/compile peg)", d: "Compile a PEG grammar into a reusable form.", e: "(peg/compile ~(some \"a\"))" },
    "peg/find": { s: "(peg/find patt text &opt start)", d: "Find the first match of a PEG pattern in text.", e: '(peg/find ~"a+" "baa")' },
    "peg/find-all": { s: "(peg/find-all patt text &opt start)", d: "Find all matches of a PEG pattern in text.", e: '(peg/find-all ~"a+" "baa")' },
    "peg/replace": { s: "(peg/replace patt subst text)", d: "Replace the first match of a PEG pattern in text.", e: '(peg/replace ~"a" "b" "aaa")' },
    "peg/replace-all": { s: "(peg/replace-all patt subst text)", d: "Replace all matches of a PEG pattern in text.", e: '(peg/replace-all ~"a" "b" "aaa")' },
    "parser/new": { s: "(parser/new &opt capacity)", d: "Create a new parser.", e: "(parser/new)" },
    "parser/consume": { s: "(parser/consume parser bytes &opt index)", d: "Feed bytes into a parser.", e: "(parser/consume p str)" },
    "parser/produce": { s: "(parser/produce parser &opt wrap)", d: "Get the next parsed value from a parser.", e: "(parser/produce p)" },
    "parser/status": { s: "(parser/status parser)", d: "Get the status of a parser.", e: "(parser/status p)" },
    "json/encode": { s: "(json/encode x &opt buf)", d: "Encode a value as JSON.", e: '(json/encode {:a 1}) # => "{\\"a\\":1}"' },
    "json/decode": { s: "(json/decode str &opt keywords)", d: "Decode a JSON string into Janet data.", e: '(json/decode "{\\"a\\":1}")' },
    "path/join": { s: "(path/join & parts)", d: "Join path components into a single path.", e: '(path/join "a" "b") # => "a/b"' },
    "path/dirname": { s: "(path/dirname path)", d: "Get the directory part of a path.", e: '(path/dirname "a/b/c") # => "a/b"' },
    "path/basename": { s: "(path/basename path)", d: "Get the file name part of a path.", e: '(path/basename "a/b/c") # => "c"' },
    "path/ext": { s: "(path/ext path)", d: "Get the file extension of a path.", e: '(path/ext "a.janet") # => ".janet"' },
    "path/abspath": { s: "(path/abspath path &opt cwd)", d: "Convert a path to an absolute path.", e: '(path/abspath "a")' },
    "path/normalize": { s: "(path/normalize path)", d: "Normalize a path, removing . and .. segments.", e: '(path/normalize "a/../b")' },
    dyn: { s: "(dyn key &opt dflt)", d: "Get the value of a dynamic binding.", e: "(dyn :out)" },
    setdyn: { s: "(setdyn key value)", d: "Set the value of a dynamic binding in the current fiber.", e: "(setdyn :out b)" },
    return: { s: "(return to &opt value)", d: "Return to a label or prompt point created with label/prompt.", e: "(return done 42)" },
    disasm: { s: "(disasm func)", d: "Disassemble a function into a readable string.", e: "(disasm my-fn)" },
    marshal: { s: "(marshal x &opt dict)", d: "Serialize a value into bytes.", e: "(marshal {:a 1})" },
    unmarshal: { s: "(unmarshal bytes &opt dict)", d: "Deserialize bytes created with marshal.", e: "(unmarshal b)" },
    "native?": { s: "(native? x)", d: "Check if x is a native module.", e: "(native? x)" },
  };

  /* ================================================================
   REGISTER LANGUAGE
   ================================================================ */

  monaco.languages.register({
    id: LANG,
    extensions: [".janet"],
    aliases: ["Janet", "janet"],
  });

  /* ================================================================
   LANGUAGE CONFIGURATION
   ================================================================ */

  monaco.languages.setLanguageConfiguration(LANG, {
    comments: { lineComment: "#" },
    brackets: [
      ["(", ")"],
      ["[", "]"],
      ["{", "}"],
    ],
    autoClosingPairs: [
      { open: "(", close: ")" },
      { open: "[", close: "]" },
      { open: "{", close: "}" },
      { open: '"', close: '"', notIn: ["string", "comment"] },
    ],
    surroundingPairs: [
      { open: "(", close: ")" },
      { open: "[", close: "]" },
      { open: "{", close: "}" },
      { open: '"', close: '"' },
    ],
    wordPattern: /[a-zA-Z_!$%&*+\-.\/<?=>@^][0-9a-zA-Z_!$%&*+\-.\/:<?=>@^]*/,
    indentationRules: {
      increaseIndentPattern: /^\s*[([{].*[^)\]}\s]\s*$/,
      decreaseIndentPattern: /^\s*[)\]}]/,
    },
    onEnterRules: [
      {
        beforeText: /[([{][^)\]}]*$/,
        action: { indentAction: monaco.languages.IndentAction.Indent },
      },
    ],
  });

  /* ================================================================
   MONARCH TOKENIZER
   ================================================================ */

  monaco.languages.setMonarchTokensProvider(LANG, {
    specialForms: SPECIAL_FORMS,
    macros: MACROS,
    core: CORE,
    constants: CONSTANTS,

    tokenizer: {
      root: [
        [/\s+/, "white"],

        // Comments run from `#` to the end of the line.
        [/#.*$/, "comment"],

        // Long strings and long buffers are delimited by runs of backticks.
        [/@`+/, "string", "@longString"],
        [/`+/, "string", "@longString"],

        // Buffers use the same delimiters as strings, prefixed with `@`.
        [/@"/, "string", "@string"],
        [/"/, "string", "@string"],

        // Mutable array and table literals.
        [/@[([{]/, "delimiter.parenthesis"],
        [/[()\[\]{}]/, "delimiter.parenthesis"],

        // Keywords.
        [/::?[a-zA-Z0-9_!$%&*+\-.\/<?=>@^]*/, "constant"],

        // Numbers.
        [/[+-]?0x[0-9a-fA-F_]+/, "number"],
        [/[+-]?\d+[rR][0-9a-zA-Z_]+/, "number"],
        [/[+-]?\d[\d_]*\.\d[\d_]*(?:[eE][+-]?\d[\d_]*)?/, "number.float"],
        [/[+-]?\.\d[\d_]*(?:[eE][+-]?\d[\d_]*)?/, "number.float"],
        [/[+-]?\d[\d_]*[eE][+-]?\d[\d_]*/, "number.float"],
        [/[+-]?\d[\d_]*/, "number"],

        // Prefix forms (reader macros): quote, splice, quasiquote, unquote and
        // the short-fn `|`.
        [/[',;~|]/, "tag"],

        // Symbols.
        [
          /[a-zA-Z_!$%&*+\-.\/<?=>@^][0-9a-zA-Z_!$%&*+\-.\/:<?=>@^]*/,
          {
            cases: {
              "@specialForms": "keyword",
              "@macros": "keyword",
              "@core": "type.identifier",
              "@constants": "constant",
              "@default": "identifier",
            },
          },
        ],
      ],

      string: [
        [/[^\\"]+/, "string"],
        [/\\x[0-9a-fA-F]{2}/, "string.escape"],
        [/\\u[0-9a-fA-F]{4}/, "string.escape"],
        [/\\U[0-9a-fA-F]{6}/, "string.escape"],
        [/\\[0abefnrtvz"\\]/, "string.escape"],
        [/\\./, "string.escape"],
        [/"/, "string", "@pop"],
      ],

      longString: [
        [/[^`]+/, "string"],
        [/`+/, "string", "@pop"],
      ],
    },
  });

  /* ================================================================
   S-EXPRESSION SCANNER
   ================================================================ */

  const isSymStart = (c) => /[a-zA-Z_!$%&*+\-.\/<?=>@^]/.test(c);
  const isSymChar = (c) => /[a-zA-Z0-9_!$%&*+\-.\/:<?=>@^]/.test(c);
  const isOpenBracket = (c) => c === "(" || c === "[" || c === "{";

  // Builds a tree of the document's bracketed forms together with the symbol
  // tokens they contain. Every `(...)`, `[...]` and `{...}` group becomes a
  // scope that can hold local bindings, and every symbol token carries its own
  // source range. This is the basis for scope-aware navigation.
  function buildScopes(model) {
    const lines = model.getLinesContent();
    const eol = model.getEOL();
    const lineStart = [];
    let size = 0;
    for (let i = 0; i < lines.length; i++) {
      lineStart.push(size);
      size += lines[i].length + eol.length;
    }
    const at = (line, col) => lineStart[line] + col;

    const root = {
      isScope: true,
      open: "",
      start: 0,
      end: size,
      names: new Set(),
      items: [],
      anon: false,
      parent: null,
    };
    const scopes = [root];
    const stack = [root];
    const symbols = [];

    const current = () => stack[stack.length - 1];
    const addToken = (tok) => {
      current().items.push(tok);
      if (tok.t === "sym") symbols.push(tok);
    };
    const openScope = (open, offset, anon) => {
      const sc = {
        isScope: true,
        open,
        start: offset,
        end: size,
        names: new Set(),
        items: [],
        anon: !!anon,
        parent: current(),
      };
      scopes.push(sc);
      current().items.push(sc);
      stack.push(sc);
    };

    let inString = false;
    let longDelim = 0;
    let pendingAnon = false;

    for (let li = 0; li < lines.length; li++) {
      const line = lines[li];
      let ci = 0;

      // Continue a string or long string that spans lines.
      if (inString) {
        let closed = false;
        while (ci < line.length) {
          if (line[ci] === "\\") {
            ci += 2;
            continue;
          }
          if (line[ci] === '"') {
            ci++;
            closed = true;
            break;
          }
          ci++;
        }
        if (closed) inString = false;
        continue;
      }
      if (longDelim > 0) {
        let closed = false;
        while (ci < line.length) {
          if (line[ci] === "`") {
            let run = 0;
            while (ci + run < line.length && line[ci + run] === "`") run++;
            if (run >= longDelim) {
              ci += run;
              closed = true;
              break;
            }
            ci += run;
          } else ci++;
        }
        if (closed) longDelim = 0;
        continue;
      }

      while (ci < line.length) {
        const ch = line[ci];

        if (ch === "#") break;
        if (/\s/.test(ch)) {
          ci++;
          continue;
        }

        // Prefix forms that do not affect structure.
        if (ch === "'" || ch === "~" || ch === ";" || ch === ",") {
          ci++;
          continue;
        }
        if (ch === "|") {
          pendingAnon = true;
          ci++;
          continue;
        }

        // Strings and buffers.
        if (ch === '"' || (ch === "@" && line[ci + 1] === '"')) {
          if (ch === "@") ci++;
          ci++;
          let closed = false;
          while (ci < line.length) {
            if (line[ci] === "\\") {
              ci += 2;
              continue;
            }
            if (line[ci] === '"') {
              ci++;
              closed = true;
              break;
            }
            ci++;
          }
          if (!closed) inString = true;
          continue;
        }

        // Long strings and long buffers.
        if (ch === "`" || (ch === "@" && line[ci + 1] === "`")) {
          if (ch === "@") ci++;
          let run = 0;
          while (ci + run < line.length && line[ci + run] === "`") run++;
          let j = ci + run;
          let closed = false;
          while (j < line.length) {
            if (line[j] === "`") {
              let crun = 0;
              while (j + crun < line.length && line[j + crun] === "`") crun++;
              if (crun >= run) {
                closed = true;
                j += crun;
                break;
              }
              j += crun;
            } else j++;
          }
          if (!closed) longDelim = run;
          ci = closed ? j : line.length;
          continue;
        }

        if (ch === "@" && isOpenBracket(line[ci + 1])) {
          openScope(line[ci + 1], at(li, ci), pendingAnon);
          pendingAnon = false;
          ci += 2;
          continue;
        }

        if (isOpenBracket(ch)) {
          openScope(ch, at(li, ci), pendingAnon);
          pendingAnon = false;
          ci++;
          continue;
        }

        if (ch === ")" || ch === "]" || ch === "}") {
          if (stack.length > 1) {
            const sc = stack.pop();
            sc.end = at(li, ci);
            sc.closed = true;
          }
          ci++;
          continue;
        }

        // Keywords.
        if (ch === ":") {
          const s = ci;
          ci++;
          while (ci < line.length && isSymChar(line[ci])) ci++;
          addToken({
            t: "kw",
            s: at(li, s),
            e: at(li, ci),
            v: line.slice(s, ci),
            l: li + 1,
            c: s + 1,
          });
          continue;
        }

        // Numbers.
        if (/[0-9]/.test(ch)) {
          ci++;
          while (ci < line.length && /[0-9a-zA-Z_.+\-]/.test(line[ci])) ci++;
          continue;
        }

        // Symbols.
        if (isSymStart(ch)) {
          const s = ci;
          ci++;
          while (ci < line.length && isSymChar(line[ci])) ci++;
          addToken({
            t: "sym",
            s: at(li, s),
            e: at(li, ci),
            v: line.slice(s, ci),
            l: li + 1,
            c: s + 1,
          });
          continue;
        }

        ci++;
      }
    }

    for (const sc of stack) sc.end = size;

    return { root, scopes, symbols, lineStart, at, size };
  }

  const headOf = (scope) => {
    if (!scope.items.length) return null;
    const first = scope.items[0];
    if (first && !first.isScope && (first.t === "sym" || first.t === "kw")) {
      return first.v;
    }
    return null;
  };

  const firstTuple = (scope) => {
    for (const item of scope.items) {
      if (item.isScope && (item.open === "[" || item.open === "(")) return item;
    }
    return null;
  };

  // Binding forms whose first tuple alternates name/value pairs.
  const PAIR_BINDING_FORMS = new Set([
    "let",
    "with",
    "when-with",
    "if-with",
    "with-vars",
    "if-let",
    "when-let",
  ]);
  // Binding forms whose first tuple is a flat list of names.
  const SYM_LIST_FORMS = new Set(["with-syms"]);
  // Forms that introduce a new function scope.
  const FN_FORMS = new Set(["fn"]);
  // Forms that introduce `$`-prefixed arguments.
  const SHORT_FN_FORMS = new Set(["short-fn"]);
  // Forms that bind a name in the enclosing scope.
  const DEF_FORMS = new Set([
    "def",
    "var",
    "def-",
    "var-",
    "defglobal",
    "varglobal",
    "defn",
    "defn-",
    "defmacro",
    "defmacro-",
    "varfn",
    "defdyn",
  ]);
  // Definition forms whose name is followed by an argument tuple.
  const FN_DEF_FORMS = new Set([
    "defn",
    "defn-",
    "defmacro",
    "defmacro-",
    "varfn",
  ]);
  // Loop forms whose head tuple holds bindings and modifiers.
  const LOOP_HEAD_FORMS = new Set([
    "loop",
    "seq",
    "catseq",
    "tabseq",
    "generate",
  ]);
  // Iteration forms whose binding is the second element.
  const ITER_FORMS = new Set(["each", "eachk", "eachp", "for", "forv"]);
  const LABEL_FORMS = new Set(["label"]);
  const DEFAULT_FORMS = new Set(["default"]);

  // Collects every binding introduced by the scopes, mirroring Janet's lexical
  // scoping closely enough that rename/definition/references agree on which
  // occurrences share a binding.
  function collectDeclarations(scopes) {
    const decls = [];
    const addName = (scope, tok) => {
      if (!scope || !tok || tok.isScope || tok.t !== "sym") return;
      const name = tok.v;
      if (!name || name === "&") return;
      scope.names.add(name);
      decls.push({ start: tok.s, end: tok.e, scope, name, tok });
    };

    // Bind a destructuring pattern: a symbol binds directly, a tuple/struct
    // pattern binds every symbol it contains.
    function bindPattern(item, target) {
      if (!item) return;
      if (item.isScope) {
        if (
          item.open === "[" ||
          item.open === "(" ||
          item.open === "{"
        ) {
          collectAll(item, target);
        }
        return;
      }
      addName(target, item);
    }

    function collectAll(node, target) {
      for (const item of node.items) {
        if (item.isScope) {
          if (isOpenBracket(item.open)) collectAll(item, target);
        } else if (item.t === "sym" && item.v !== "&") {
          addName(target, item);
        }
      }
    }

    // Name/value pairs: positions 0, 2, 4, ... are binding patterns.
    function collectPairs(vec, target) {
      const items = vec.items;
      for (let i = 0; i < items.length; i += 2) {
        bindPattern(items[i], target);
      }
    }

    // loop head: `binding :verb object` groups plus `:modifier arg` forms.
    function collectLoopHead(head, target) {
      const items = head.items;
      let i = 0;
      while (i < items.length) {
        const item = items[i];
        if (!item) break;
        if (!item.isScope && item.t === "kw") {
          if (item.v === ":let") {
            const v = items[i + 1];
            if (v && v.isScope && (v.open === "[" || v.open === "(")) {
              collectPairs(v, target);
            }
          }
          i += 2;
          continue;
        }
        bindPattern(item, target);
        i += 3;
      }
    }

    // `$`, `$0`, `$1`, ... and `$&` inside a short-fn body.
    const walkAnon = (scope, target) => {
      for (const item of scope.items) {
        if (item.isScope) {
          if (!item.anon) walkAnon(item, target);
          continue;
        }
        if (item.t === "sym" && /^\$(&|\d*)$/.test(item.v)) addName(target, item);
      }
    };

    for (const sc of scopes) {
      if (sc.anon) {
        walkAnon(sc, sc);
        continue;
      }
      if (sc.open !== "(") continue;
      const head = headOf(sc);
      if (!head) continue;

      if (PAIR_BINDING_FORMS.has(head)) {
        const vec = firstTuple(sc);
        if (vec) collectPairs(vec, sc);
      } else if (SYM_LIST_FORMS.has(head)) {
        const vec = firstTuple(sc);
        if (vec) collectAll(vec, sc);
      } else if (FN_FORMS.has(head)) {
        const vec = firstTuple(sc);
        if (vec) collectAll(vec, sc);
      } else if (SHORT_FN_FORMS.has(head)) {
        walkAnon(sc, sc);
      } else if (DEF_FORMS.has(head)) {
        bindPattern(sc.items[1], sc.parent);
        if (FN_DEF_FORMS.has(head)) {
          const vec = firstTuple(sc);
          if (vec) collectAll(vec, sc);
        }
      } else if (LOOP_HEAD_FORMS.has(head)) {
        const head2 = sc.items[1];
        if (head2 && head2.isScope) collectLoopHead(head2, sc);
      } else if (ITER_FORMS.has(head)) {
        bindPattern(sc.items[1], sc);
      } else if (LABEL_FORMS.has(head)) {
        addName(sc, sc.items[1]);
      } else if (DEFAULT_FORMS.has(head)) {
        addName(sc.parent, sc.items[1]);
      }
    }

    return decls;
  }

  /* ================================================================
   HELPER: find user definitions
   ================================================================ */

  const SYM = "[a-zA-Z_!$%&*+\\-./<?=>@^][0-9a-zA-Z_!$%&*+\\-./:<?=>@^]*";
  const META = '(?::[a-zA-Z0-9_!$%&*+\\-./<?=>@^]*\\s+|"(?:[^"\\\\]|\\\\.)*"\\s+)*';

  function findUserDefs(model) {
    const defs = [];
    const lc = model.getLineCount();
    const fnRe = new RegExp(
      "\\(\\s*(defmacro-|defmacro|defn-|defn|varfn)\\s+" + META + "(" + SYM + ")",
    );
    const valueRe = new RegExp(
      "\\(\\s*(defglobal|varglobal|def-|var-|defdyn|def|var)\\s+" +
        META +
        "(" +
        SYM +
        ")",
    );

    for (let i = 1; i <= lc; i++) {
      const line = model.getLineContent(i);
      let m = line.match(fnRe);
      if (m) {
        const kind =
          m[1] === "defmacro" || m[1] === "defmacro-"
            ? "macro"
            : "function";
        const col = line.indexOf(m[2], m.index) + 1;
        defs.push({ name: m[2], line: i, col, kind, form: m[1] });
        continue;
      }
      m = line.match(valueRe);
      if (m) {
        const col = line.indexOf(m[2], m.index) + 1;
        defs.push({ name: m[2], line: i, col, kind: "variable", form: m[1] });
      }
    }
    return defs;
  }

  function getWordAt(model, position) {
    const wp = model.getWordAtPosition(position);
    if (wp) return wp.word;
    const line = model.getLineContent(position.lineNumber);
    const col = position.column - 1;
    const ch = line[col];
    if (!ch || !isSymChar(ch)) return null;
    let s = col;
    let e = col;
    while (s > 0 && isSymChar(line[s - 1])) s--;
    while (e < line.length - 1 && isSymChar(line[e + 1])) e++;
    return line.substring(s, e + 1);
  }

  /* ================================================================
   BINDING RESOLUTION (shared by definition / reference / rename)
   ================================================================ */

  // Resolves the symbol under the cursor to its binding: every occurrence bound
  // to it plus the occurrence that declares it. Symbols with no lexical binding
  // (core functions, macros) report `local: false` so callers fall back to
  // document-wide handling.
  function resolveBinding(model, position) {
    const built = buildScopes(model);

    const wordInfo = model.getWordAtPosition(position);
    let name;
    let cursorStart;
    let cursorEnd;
    if (wordInfo) {
      name = wordInfo.word;
      cursorStart = built.at(position.lineNumber - 1, wordInfo.startColumn - 1);
      cursorEnd = built.at(position.lineNumber - 1, wordInfo.endColumn - 1);
    } else {
      const line = model.getLineContent(position.lineNumber);
      const col = position.column - 1;
      const ch = line[col];
      if (!ch || !isSymChar(ch)) return null;
      let s = col;
      let e = col;
      while (s > 0 && isSymChar(line[s - 1])) s--;
      while (e < line.length - 1 && isSymChar(line[e + 1])) e++;
      name = line.substring(s, e + 1);
      cursorStart = built.at(position.lineNumber - 1, s);
      cursorEnd = built.at(position.lineNumber - 1, e + 1);
    }
    if (!name) return null;

    const scopes = built.scopes;
    const decls = collectDeclarations(scopes);

    const narrower = (a, b) => {
      if (!a) return b;
      if (!b) return a;
      if (b.start > a.start) return b;
      if (b.start === a.start && b.end < a.end) return b;
      return a;
    };

    const declaring = (offset) => {
      let found;
      for (const sc of scopes) {
        if (sc.start <= offset && offset <= sc.end && sc.names.has(name)) {
          found = narrower(found, sc);
        }
      }
      return found;
    };

    const resolve = (start, end) => {
      for (const d of decls) {
        if (d.start <= start && end <= d.end) return d.scope;
      }
      return declaring(start);
    };

    const cursorScope = resolve(cursorStart, cursorEnd);
    const targetStart = cursorScope ? cursorScope.start : -1;

    const occurrences = [];
    let declarationRange = null;
    const decl =
      targetStart === -1
        ? undefined
        : decls.find((d) => d.scope.start === targetStart && d.name === name);

    for (const tok of built.symbols) {
      if (tok.v !== name) continue;
      const scope = resolve(tok.s, tok.e);
      if ((scope ? scope.start : -1) !== targetStart) continue;
      const range = {
        line: tok.l,
        startColumn: tok.c,
        endColumn: tok.c + tok.v.length,
      };
      occurrences.push(range);
      if (decl && tok.s === decl.tok.s && tok.e === decl.tok.e) {
        declarationRange = range;
      }
    }

    return {
      name,
      local: targetStart !== -1,
      declaration: declarationRange,
      occurrences,
    };
  }

  /* ================================================================
   COMPLETION PROVIDER
   ================================================================ */

  monaco.languages.registerCompletionItemProvider(LANG, {
    triggerCharacters: ["(", "[", "{", "~", ","],
    provideCompletionItems: function (model, position) {
      const wordInfo = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: wordInfo.startColumn,
        endColumn: wordInfo.endColumn,
      };

      const S = monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet;
      const K = monaco.languages.CompletionItemKind;
      const suggestions = [];

      const snippets = [
        {
          label: "def",
          detail: "Define a value",
          insert: "(def ${1:name} ${2:value})",
          doc: "(def name value)",
        },
        {
          label: "defn",
          detail: "Define a function",
          insert: '(defn ${1:name}\n  "${2:docstring}"\n  [${3:args}]\n  ${4:body})',
          doc: "(defn name [args] body)",
        },
        {
          label: "defn-",
          detail: "Define a private function",
          insert: "(defn- ${1:name} [${2:args}]\n  ${3:body})",
          doc: "(defn- name [args] body)",
        },
        {
          label: "defmacro",
          detail: "Define a macro",
          insert: "(defmacro ${1:name} [${2:args}]\n  ~(${3:expansion}))",
          doc: "(defmacro name [args] ~(expansion))",
        },
        {
          label: "var",
          detail: "Define a mutable value",
          insert: "(var ${1:name} ${2:value})",
          doc: "(var name value)",
        },
        {
          label: "fn",
          detail: "Anonymous function",
          insert: "(fn [${1:args}]\n  ${2:body})",
          doc: "(fn [args] body)",
        },
        {
          label: "short-fn",
          detail: "Short anonymous function",
          insert: "|(${1:body})",
          doc: "|(body)",
        },
        {
          label: "let",
          detail: "Local bindings",
          insert: "(let [${1:name} ${2:value}]\n  ${3:body})",
          doc: "(let [name value] body)",
        },
        {
          label: "if",
          detail: "Conditional",
          insert: "(if ${1:condition}\n  ${2:then}\n  ${3:else})",
          doc: "(if condition then else)",
        },
        {
          label: "when",
          detail: "Conditional block",
          insert: "(when ${1:condition}\n  ${2:body})",
          doc: "(when condition body)",
        },
        {
          label: "unless",
          detail: "Negated conditional block",
          insert: "(unless ${1:condition}\n  ${2:body})",
          doc: "(unless condition body)",
        },
        {
          label: "cond",
          detail: "Multi-way conditional",
          insert: "(cond\n  ${1:condition1} ${2:body1}\n  ${3:default})",
          doc: "(cond condition1 body1 default)",
        },
        {
          label: "case",
          detail: "Value dispatch",
          insert: "(case ${1:dispatch}\n  ${2:value1} ${3:body1}\n  ${4:default})",
          doc: "(case dispatch value1 body1 default)",
        },
        {
          label: "match",
          detail: "Pattern matching",
          insert:
            "(match ${1:x}\n  ${2:pattern} ${3:body}\n  _ ${4:default})",
          doc: "(match x pattern body _ default)",
        },
        {
          label: "loop",
          detail: "General-purpose loop",
          insert: "(loop [${1:i} :range [${2:0} ${3:10}]]\n  ${4:body})",
          doc: "(loop [i :range [0 10]] body)",
        },
        {
          label: "each",
          detail: "Loop over values",
          insert: "(each ${1:value} ${2:xs}\n  ${3:body})",
          doc: "(each value xs body)",
        },
        {
          label: "eachp",
          detail: "Loop over key/value pairs",
          insert: "(eachp [${1:k} ${2:v}] ${3:dict}\n  ${4:body})",
          doc: "(eachp [k v] dict body)",
        },
        {
          label: "for",
          detail: "C-style for-loop",
          insert: "(for ${1:i} ${2:0} ${3:10}\n  ${4:body})",
          doc: "(for i 0 10 body)",
        },
        {
          label: "seq",
          detail: "Loop accumulating into an array",
          insert: "(seq [${1:x} :in ${2:xs}]\n  ${3:body})",
          doc: "(seq [x :in xs] body)",
        },
        {
          label: "try",
          detail: "Exception handling",
          insert: "(try\n  ${1:body}\n  ([${2:err}]\n    ${3:handler}))",
          doc: "(try body ([err] handler))",
        },
        {
          label: "with",
          detail: "Scoped resource",
          insert: "(with [${1:binding} ${2:ctor}]\n  ${3:body})",
          doc: "(with [binding ctor] body)",
        },
        {
          label: "defer",
          detail: "Cleanup on exit",
          insert: "(defer (${1:cleanup}) ${2:body})",
          doc: "(defer cleanup body)",
        },
        {
          label: "->",
          detail: "Thread-first",
          insert: "(-> ${1:x}\n    ${2:form})",
          doc: "(-> x form)",
        },
        {
          label: "->>",
          detail: "Thread-last",
          insert: "(->> ${1:x}\n     (${2:map} ${3:f}))",
          doc: "(->> x (map f))",
        },
        {
          label: "as->",
          detail: "Thread with a name",
          insert: "(as-> ${1:x} ${2:v}\n  (${3:f} ${2:v}))",
          doc: "(as-> x v (f v))",
        },
        {
          label: "if-let",
          detail: "Bind and test",
          insert: "(if-let [${1:name} ${2:value}]\n  ${3:then}\n  ${4:else})",
          doc: "(if-let [name value] then else)",
        },
        {
          label: "when-let",
          detail: "Bind and run when truthy",
          insert: "(when-let [${1:name} ${2:value}]\n  ${3:body})",
          doc: "(when-let [name value] body)",
        },
        {
          label: "assert",
          detail: "Assertion",
          insert: '(assert ${1:condition} "${2:message}")',
          doc: "(assert condition message)",
        },
        {
          label: "comment",
          detail: "Comment out forms",
          insert: "(comment\n  ${1:body})",
          doc: "(comment body)",
        },
        {
          label: "label / return",
          detail: "Early return point",
          insert: "(label ${1:done}\n  ${2:body}\n  (return ${1:done} ${3:value}))",
          doc: "(label done body (return done value))",
        },
      ];

      for (const sn of snippets) {
        suggestions.push({
          label: sn.label,
          kind: K.Snippet,
          insertText: sn.insert,
          insertTextRules: S,
          detail: "Snippet: " + sn.detail,
          documentation: { value: "```janet\n" + sn.doc + "\n```" },
          range: range,
          sortText: "0_" + sn.label,
        });
      }

      for (const kw of ALL_KEYWORDS) {
        const doc = DOCS[kw];
        suggestions.push({
          label: kw,
          kind: K.Keyword,
          insertText: kw,
          detail: kw.startsWith("def") || kw.startsWith("var")
            ? "definition"
            : "special form / macro",
          documentation: doc
            ? { value: "```janet\n" + doc.s + "\n```\n" + doc.d }
            : undefined,
          range: range,
          sortText: "1_" + kw,
        });
      }

      for (const fn of CORE) {
        if (ALL_KEYWORDS.includes(fn)) continue;
        const doc = DOCS[fn];
        suggestions.push({
          label: fn,
          kind: K.Function,
          insertText: fn,
          detail: "core",
          documentation: doc
            ? { value: "```janet\n" + doc.s + "\n```\n" + doc.d }
            : undefined,
          range: range,
          sortText: "2_" + fn,
        });
      }

      for (const c of CONSTANTS) {
        suggestions.push({
          label: c,
          kind: K.Constant,
          insertText: c,
          detail: "constant",
          range: range,
          sortText: "3_" + c,
        });
      }

      const userDefs = findUserDefs(model);
      const seen = new Set([...ALL_KEYWORDS, ...CORE, ...CONSTANTS]);
      for (const def of userDefs) {
        if (seen.has(def.name)) continue;
        seen.add(def.name);
        suggestions.push({
          label: def.name,
          kind: def.kind === "function" ? K.Function : K.Variable,
          insertText: def.name,
          detail: "user-defined " + def.kind,
          range: range,
          sortText: "4_" + def.name,
        });
      }

      return { suggestions: suggestions };
    },
  });

  /* ================================================================
   HOVER PROVIDER
   ================================================================ */

  monaco.languages.registerHoverProvider(LANG, {
    provideHover: function (model, position) {
      const word = getWordAt(model, position);
      if (!word) return null;

      const wp = model.getWordAtPosition(position);
      const hoverRange = wp
        ? new monaco.Range(
            position.lineNumber,
            wp.startColumn,
            position.lineNumber,
            wp.endColumn,
          )
        : undefined;

      const doc = DOCS[word];
      if (doc) {
        const parts = [
          { value: "```janet\n" + doc.s + "\n```" },
          { value: doc.d },
        ];
        if (doc.e)
          parts.push({ value: "**Example:**\n```janet\n" + doc.e + "\n```" });
        return { range: hoverRange, contents: parts };
      }

      const userDefs = findUserDefs(model);
      for (const def of userDefs) {
        if (def.name !== word) continue;
        const defLine = model.getLineContent(def.line).trim();
        return {
          range: hoverRange,
          contents: [
            { value: "```janet\n" + defLine + "\n```" },
            {
              value:
                "User-defined " + def.kind + " — *line " + def.line + "*",
            },
          ],
        };
      }

      return null;
    },
  });

  /* ================================================================
   DEFINITION PROVIDER
   ================================================================ */

  monaco.languages.registerDefinitionProvider(LANG, {
    provideDefinition: function (model, position) {
      // A lexically-bound local resolves to its own declaration rather than the
      // first same-named definition in the document.
      const binding = resolveBinding(model, position);
      if (binding && binding.local) {
        if (!binding.declaration) return null;
        const d = binding.declaration;
        return {
          uri: model.uri,
          range: new monaco.Range(d.line, d.startColumn, d.line, d.endColumn),
        };
      }

      const word = getWordAt(model, position);
      if (!word) return null;
      const results = [];
      for (const def of findUserDefs(model)) {
        if (def.name === word) {
          results.push({
            uri: model.uri,
            range: new monaco.Range(
              def.line,
              def.col,
              def.line,
              def.col + def.name.length,
            ),
          });
        }
      }
      return results.length ? results : null;
    },
  });

  /* ================================================================
   DOCUMENT SYMBOL PROVIDER  (Outline / Breadcrumbs)
   ================================================================ */

  monaco.languages.registerDocumentSymbolProvider(LANG, {
    provideDocumentSymbols: function (model) {
      const defs = findUserDefs(model);
      return defs.map(function (def, index) {
        // The symbol extends to the line before the next definition.
        const next = defs[index + 1];
        const endLine = next ? Math.max(def.line, next.line - 1) : def.line;
        return {
          name: def.name,
          detail: def.kind,
          kind:
            def.kind === "function"
              ? monaco.languages.SymbolKind.Function
              : def.kind === "macro"
                ? monaco.languages.SymbolKind.Module
                : monaco.languages.SymbolKind.Variable,
          range: new monaco.Range(
            def.line,
            1,
            endLine,
            model.getLineContent(endLine).length + 1,
          ),
          selectionRange: new monaco.Range(
            def.line,
            def.col,
            def.line,
            def.col + def.name.length,
          ),
        };
      });
    },
  });

  /* ================================================================
   REFERENCE PROVIDER  (Shift+F12)
   ================================================================ */

  monaco.languages.registerReferenceProvider(LANG, {
    provideReferences: function (model, position, context) {
      const binding = resolveBinding(model, position);
      if (!binding) return null;
      const includeDeclaration =
        !context || context.includeDeclaration !== false;
      const results = [];
      for (const r of binding.occurrences) {
        const isDeclaration =
          binding.declaration &&
          binding.declaration.line === r.line &&
          binding.declaration.startColumn === r.startColumn;
        if (isDeclaration && !includeDeclaration) continue;
        results.push({
          uri: model.uri,
          range: new monaco.Range(r.line, r.startColumn, r.line, r.endColumn),
        });
      }
      return results;
    },
  });

  /* ================================================================
   DOCUMENT HIGHLIGHT PROVIDER
   ================================================================ */

  monaco.languages.registerDocumentHighlightProvider(LANG, {
    provideDocumentHighlights: function (model, position) {
      const binding = resolveBinding(model, position);
      if (!binding || !binding.occurrences.length) return null;
      const K = monaco.languages.DocumentHighlightKind;
      return binding.occurrences.map((r) => {
        const isDeclaration =
          binding.declaration &&
          binding.declaration.line === r.line &&
          binding.declaration.startColumn === r.startColumn;
        return {
          range: new monaco.Range(r.line, r.startColumn, r.line, r.endColumn),
          kind: isDeclaration ? K.Write : K.Read,
        };
      });
    },
  });

  /* ================================================================
   SIGNATURE HELP PROVIDER
   ================================================================ */

  monaco.languages.registerSignatureHelpProvider(LANG, {
    signatureHelpTriggerCharacters: ["(", " "],
    provideSignatureHelp: function (model, position) {
      const textUntil = model.getValueInRange({
        startLineNumber: Math.max(1, position.lineNumber - 10),
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });

      // Find the innermost open paren and the symbol immediately after it.
      // Closing brackets on the way back belong to nested forms; an opening
      // bracket at depth zero is the enclosing form — only a `(` is a call.
      let depth = 0;
      let funcStart = -1;
      for (let i = textUntil.length - 1; i >= 0; i--) {
        const ch = textUntil[i];
        if (ch === ")" || ch === "]" || ch === "}") {
          depth++;
        } else if (ch === "(" || ch === "[" || ch === "{") {
          if (depth > 0) {
            depth--;
          } else if (ch === "(") {
            funcStart = i + 1;
            break;
          }
        }
      }
      if (funcStart < 0) return null;

      const rest = textUntil.substring(funcStart).trim();
      const funcMatch = rest.match(
        /^([a-zA-Z_!$%&*+\-.\/<?=>@^][0-9a-zA-Z_!$%&*+\-.\/:<?=>@^]*)/,
      );
      if (!funcMatch) return null;
      const funcName = funcMatch[1];

      let label;
      let documentation;
      const doc = DOCS[funcName];
      if (doc) {
        label = doc.s.split("\n")[0];
        documentation = { value: doc.d };
      } else {
        const def = findUserDefs(model).find((d) => d.name === funcName);
        if (!def) return null;
        const params = getDefParams(model, def);
        label = "(" + funcName + (params ? " " + params : "") + ")";
        documentation = { value: "User-defined " + def.kind };
      }

      const afterFunc = rest.substring(funcMatch[0].length);
      let argIdx = 0;
      let d = 0;
      for (let i = 0; i < afterFunc.length; i++) {
        const c = afterFunc[i];
        if (c === "(" || c === "[" || c === "{") d++;
        else if (c === ")" || c === "]" || c === "}") d--;
        else if (/\s/.test(c) && d === 0 && /\S/.test(afterFunc[i - 1] || ""))
          argIdx++;
      }

      return {
        value: {
          signatures: [
            {
              label: label,
              documentation: documentation,
              parameters: [],
            },
          ],
          activeSignature: 0,
          activeParameter: argIdx,
        },
        dispose: function () {},
      };
    },
  });

  // Extracts the parameter tuple text of a user definition, used for signature
  // help. Scans forward from the definition line for the first balanced `[...]`
  // argument tuple (Janet's conventional parameter syntax).
  function getDefParams(model, def) {
    const startLine = def.line;
    const endLine = Math.min(model.getLineCount(), startLine + 20);
    let depth = 0;
    let collected = "";
    let started = false;
    for (let i = startLine; i <= endLine; i++) {
      const line = model.getLineContent(i);
      for (let c = 0; c < line.length; c++) {
        const ch = line[c];
        if (!started) {
          if (ch === "[") {
            started = true;
            depth = 1;
            collected = "[";
          }
          continue;
        }
        collected += ch;
        if (ch === "[") depth++;
        else if (ch === "]") {
          depth--;
          if (depth === 0) return collected;
        }
      }
      if (started) collected += " ";
    }
    return started ? collected : "";
  }

  /* ================================================================
   FOLDING RANGE PROVIDER
   ================================================================ */

  monaco.languages.registerFoldingRangeProvider(LANG, {
    provideFoldingRanges: function (model) {
      const ranges = [];
      const built = buildScopes(model);

      // Fold every bracketed form that spans more than one line.
      for (const sc of built.scopes) {
        if (sc === built.root || !sc.open) continue;
        const start = model.getPositionAt(sc.start).lineNumber;
        const end = model.getPositionAt(Math.max(sc.start, sc.end)).lineNumber;
        if (end > start) {
          ranges.push({
            start: start,
            end: end,
            kind: monaco.languages.FoldingRangeKind.Region,
          });
        }
      }

      // Fold runs of consecutive `#` line comments.
      const lines = model.getLinesContent();
      let commentStart = -1;
      for (let i = 0; i <= lines.length; i++) {
        const isComment = i < lines.length && /^\s*#/.test(lines[i]);
        if (isComment && commentStart === -1) {
          commentStart = i;
        } else if (!isComment && commentStart !== -1) {
          if (i - 1 > commentStart) {
            ranges.push({
              start: commentStart + 1,
              end: i,
              kind: monaco.languages.FoldingRangeKind.Comment,
            });
          }
          commentStart = -1;
        }
      }

      return ranges;
    },
  });

  /* ================================================================
   RENAME PROVIDER
   ================================================================ */

  monaco.languages.registerRenameProvider(LANG, {
    provideRenameEdits: function (model, position, newName) {
      const binding = resolveBinding(model, position);
      if (!binding || !binding.occurrences.length) return null;
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
      const line = model.getLineContent(position.lineNumber);
      const ch = line[position.column - 1];
      if (ch === ":" || ch === '"') {
        return { rejectReason: "Cannot rename this element." };
      }
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
