import type * as Monaco from "monaco-editor";

export default (monaco: typeof Monaco) => {
  /* ─────────────────────────────────────────────
     1. REGISTER LANGUAGE
  ───────────────────────────────────────────── */
  monaco.languages.register({
    id: "rust",
    extensions: [".rs"],
    aliases: ["Rust", "rust"],
  });

  /* ─────────────────────────────────────────────
     2. MONARCH TOKENIZER  (syntax highlighting)
  ───────────────────────────────────────────── */
  monaco.languages.setMonarchTokensProvider("rust", {
    defaultToken: "",
    tokenPostfix: ".rust",

    keywords: [
      "as",
      "async",
      "await",
      "break",
      "const",
      "continue",
      "crate",
      "dyn",
      "else",
      "enum",
      "extern",
      "false",
      "fn",
      "for",
      "if",
      "impl",
      "in",
      "let",
      "loop",
      "match",
      "mod",
      "move",
      "mut",
      "pub",
      "ref",
      "return",
      "self",
      "Self",
      "static",
      "struct",
      "super",
      "trait",
      "true",
      "type",
      "unsafe",
      "use",
      "where",
      "while",
      "yield",
      "macro_rules",
      "union",
      "abstract",
      "become",
      "box",
      "do",
      "final",
      "macro",
      "override",
      "priv",
      "typeof",
      "unsized",
      "virtual",
      "try",
    ],
    typeKeywords: [
      "i8",
      "i16",
      "i32",
      "i64",
      "i128",
      "isize",
      "u8",
      "u16",
      "u32",
      "u64",
      "u128",
      "usize",
      "f32",
      "f64",
      "bool",
      "char",
      "str",
      "String",
      "Vec",
      "Option",
      "Result",
      "Box",
      "Rc",
      "Arc",
      "HashMap",
      "HashSet",
      "BTreeMap",
      "BTreeSet",
      "Cell",
      "RefCell",
      "Mutex",
      "RwLock",
      "Pin",
      "Future",
      "Stream",
      "Iterator",
      "Fn",
      "FnMut",
      "FnOnce",
      "Send",
      "Sync",
      "Sized",
      "Copy",
      "Clone",
      "Debug",
      "Display",
      "Default",
      "PartialEq",
      "Eq",
      "PartialOrd",
      "Ord",
      "Hash",
      "Drop",
      "From",
      "Into",
      "TryFrom",
      "TryInto",
      "AsRef",
      "AsMut",
      "Deref",
      "DerefMut",
      "Index",
      "IndexMut",
      "Add",
      "Sub",
      "Mul",
      "Div",
      "Rem",
      "Neg",
      "Not",
      "BitAnd",
      "BitOr",
      "BitXor",
      "Shl",
      "Shr",
      "ToString",
      "ToOwned",
      "Borrow",
      "BorrowMut",
      "Read",
      "Write",
      "Seek",
      "BufRead",
      "Some",
      "None",
      "Ok",
      "Err",
    ],
    macros: [
      "println",
      "print",
      "eprintln",
      "eprint",
      "format",
      "write",
      "writeln",
      "vec",
      "todo",
      "unimplemented",
      "unreachable",
      "panic",
      "assert",
      "assert_eq",
      "assert_ne",
      "debug_assert",
      "debug_assert_eq",
      "debug_assert_ne",
      "cfg",
      "env",
      "file",
      "line",
      "column",
      "stringify",
      "concat",
      "include",
      "include_str",
      "include_bytes",
      "compile_error",
      "dbg",
      "matches",
      "format_args",
    ],
    attributes: [
      "derive",
      "cfg",
      "test",
      "allow",
      "warn",
      "deny",
      "forbid",
      "deprecated",
      "must_use",
      "inline",
      "repr",
      "feature",
      "macro_use",
      "macro_export",
      "no_mangle",
      "link",
      "path",
      "recursion_limit",
      "global_allocator",
      "non_exhaustive",
      "doc",
      "ignore",
      "should_panic",
      "bench",
      "proc_macro",
      "proc_macro_derive",
      "proc_macro_attribute",
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
      "..",
      "..=",
      "->",
      "=>",
      "::",
    ],
    symbols: /[=><!~?:&|+\-*\/\^%]+/,
    escapes:
      /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{2}|u\{[0-9A-Fa-f]{1,6}\}|[0-7]{1,3})/,
    intSuffixes: /[iu](?:8|16|32|64|128|size)/,
    floatSuffixes: /f(?:32|64)/,

    tokenizer: {
      root: [
        // Attributes
        [/#!\[/, "annotation", "@attribute"],
        [/#\[/, "annotation", "@attribute"],

        // Lifetimes
        [/'[a-zA-Z_]\w*/, "type.lifetime"],

        // Identifiers & keywords
        [
          /[a-z_]\w*!/,
          {
            cases: {
              "@macros": "keyword.macro",
              "@default": "identifier.macro",
            },
          },
        ],
        [
          /[a-z_]\w*/,
          {
            cases: {
              "@keywords": "keyword",
              "@typeKeywords": "type",
              true: "keyword.constant",
              false: "keyword.constant",
              "@default": "identifier",
            },
          },
        ],
        [/[A-Z][\w]*/, "type.identifier"],

        // Whitespace
        { include: "@whitespace" },

        // Delimiters
        [/[{}()\[\]]/, "@brackets"],
        [/[<>](?!@symbols)/, "@brackets"],

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
        [/\d*\.\d+(?:[eE][\-+]?\d+)?(@floatSuffixes)?/, "number.float"],
        [/0[xX][0-9a-fA-F_]+(@intSuffixes)?/, "number.hex"],
        [/0[oO][0-7_]+(@intSuffixes)?/, "number.octal"],
        [/0[bB][01_]+(@intSuffixes)?/, "number.binary"],
        [/\d[0-9_]*(@intSuffixes)?/, "number"],

        // Strings
        [/b?"/, "string", "@string"],
        [/b?r(#*)"/, "string.raw", "@rawstring.$1"],

        // Characters
        [/'[^\\']'/, "string.char"],
        [
          /'(\\(?:[nrt\\'"0]|x[0-9a-fA-F]{2}|u\{[0-9a-fA-F]{1,6}\}))'/,
          "string.char",
        ],
        [/b'[^\\']'/, "string.char"],
        [/b'(\\(?:[nrt\\'"0]|x[0-9a-fA-F]{2}))'/, "string.char"],

        [/[;,.]/, "delimiter"],
      ],

      attribute: [
        [/[a-z_]\w*/, "annotation.identifier"],
        [/[A-Z]\w*/, "annotation.identifier"],
        [/[(,=]/, "annotation"],
        [/"/, "string", "@string"],
        [/\]/, "annotation", "@pop"],
        [/./, "annotation"],
      ],

      whitespace: [
        [/[ \t\r\n]+/, ""],
        [/\/\*/, "comment", "@comment"],
        [/\/\/.*$/, "comment"],
      ],

      comment: [
        [/[^\/*]+/, "comment"],
        [/\/\*/, "comment", "@push"],
        [/\*\//, "comment", "@pop"],
        [/[\/*]/, "comment"],
      ],

      string: [
        [/[^\\"]+/, "string"],
        [/@escapes/, "string.escape"],
        [/\\./, "string.escape.invalid"],
        [/"/, "string", "@pop"],
      ],

      rawstring: [
        [/[^"#]+/, "string.raw"],
        [
          /"(#*)/,
          {
            cases: {
              "$1==$S2": { token: "string.raw", next: "@pop" },
              "@default": { token: "string.raw" },
            },
          },
        ],
        [/["#]/, "string.raw"],
      ],
    },
  });

  /* ─────────────────────────────────────────────
     3. LANGUAGE CONFIGURATION
  ───────────────────────────────────────────── */
  monaco.languages.setLanguageConfiguration("rust", {
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
      { open: "<", close: ">", notIn: ["string"] },
      { open: "'", close: "'", notIn: ["string", "comment"] },
    ],
    surroundingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: '"', close: '"' },
      { open: "<", close: ">" },
      { open: "'", close: "'" },
    ],
    indentationRules: {
      increaseIndentPattern:
        /^\s*(pub\s+)?(fn|struct|enum|impl|trait|mod|if|else|while|for|loop|match|unsafe)\b.*\{[^}]*$/,
      decreaseIndentPattern: /^\s*\}/,
    },
    folding: {
      markers: {
        start: /^\s*\/\/\s*#?region\b/,
        end: /^\s*\/\/\s*#?endregion\b/,
      },
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
        beforeText: /^\s*\/\/!.*$/,
        action: {
          indentAction: monaco.languages.IndentAction.None,
          appendText: "//! ",
        },
      },
    ],
  });

  /* ─────────────────────────────────────────────
     4. DOCUMENTATION DATABASE
  ───────────────────────────────────────────── */
  const DOCS = {
    // Keywords
    fn: {
      detail: "keyword",
      doc: "Declares a function.\n\n```rust\nfn name(param: Type) -> ReturnType { ... }\n```",
    },
    let: {
      detail: "keyword",
      doc: "Declares a variable binding.\n\n```rust\nlet x = 5;\nlet mut y: i32 = 10;\n```",
    },
    mut: {
      detail: "keyword",
      doc: "Declares a mutable binding or reference.\n\n```rust\nlet mut x = 5;\nfn foo(v: &mut Vec<i32>) { ... }\n```",
    },
    struct: {
      detail: "keyword",
      doc: "Defines a structure type.\n\n```rust\nstruct Point { x: f64, y: f64 }\n```",
    },
    enum: {
      detail: "keyword",
      doc: "Defines an enumeration type.\n\n```rust\nenum Color { Red, Green, Blue }\n```",
    },
    impl: {
      detail: "keyword",
      doc: "Implements functionality for a type or trait.\n\n```rust\nimpl MyStruct {\n    fn new() -> Self { ... }\n}\n```",
    },
    trait: {
      detail: "keyword",
      doc: "Defines a trait (interface).\n\n```rust\ntrait Summary {\n    fn summarize(&self) -> String;\n}\n```",
    },
    match: {
      detail: "keyword",
      doc: 'Pattern matching expression.\n\n```rust\nmatch value {\n    1 => println!("one"),\n    2..=5 => println!("few"),\n    _ => println!("other"),\n}\n```',
    },
    if: {
      detail: "keyword",
      doc: "Conditional branching.\n\n```rust\nif condition {\n    ...\n} else if other {\n    ...\n} else {\n    ...\n}\n```",
    },
    for: {
      detail: "keyword",
      doc: 'Iterator loop.\n\n```rust\nfor item in collection.iter() {\n    println!("{}", item);\n}\n```',
    },
    while: {
      detail: "keyword",
      doc: "Conditional loop.\n\n```rust\nwhile condition {\n    ...\n}\n```",
    },
    loop: {
      detail: "keyword",
      doc: "Infinite loop (exit with `break`).\n\n```rust\nloop {\n    if done { break; }\n}\n```",
    },
    return: {
      detail: "keyword",
      doc: "Returns a value from a function.\n\n```rust\nfn add(a: i32, b: i32) -> i32 {\n    return a + b;\n}\n```",
    },
    use: {
      detail: "keyword",
      doc: "Brings items into scope.\n\n```rust\nuse std::collections::HashMap;\nuse std::io::{self, Read, Write};\n```",
    },
    mod: {
      detail: "keyword",
      doc: "Declares a module.\n\n```rust\nmod my_module {\n    pub fn hello() { ... }\n}\n```",
    },
    pub: {
      detail: "keyword",
      doc: "Makes an item publicly visible.\n\n```rust\npub fn public_function() { ... }\npub(crate) fn crate_visible() { ... }\n```",
    },
    async: {
      detail: "keyword",
      doc: "Marks a function or block as asynchronous.\n\n```rust\nasync fn fetch_data() -> Result<String, Error> { ... }\n```",
    },
    await: {
      detail: "keyword",
      doc: "Awaits the result of an async operation.\n\n```rust\nlet data = fetch_data().await?;\n```",
    },
    move: {
      detail: "keyword",
      doc: 'Forces a closure to take ownership of captured values.\n\n```rust\nlet name = String::from("Rust");\nlet closure = move || println!("{}", name);\n```',
    },
    unsafe: {
      detail: "keyword",
      doc: 'Enables unsafe operations within a block.\n\n```rust\nunsafe {\n    let ptr = &x as *const i32;\n    println!("{}", *ptr);\n}\n```',
    },
    where: {
      detail: "keyword",
      doc: "Adds constraints on generic types.\n\n```rust\nfn process<T>(item: T) where T: Display + Clone { ... }\n```",
    },
    type: {
      detail: "keyword",
      doc: "Defines a type alias.\n\n```rust\ntype Result<T> = std::result::Result<T, MyError>;\n```",
    },
    const: {
      detail: "keyword",
      doc: "Defines a compile-time constant.\n\n```rust\nconst MAX_SIZE: usize = 1024;\n```",
    },
    static: {
      detail: "keyword",
      doc: 'Defines a global static variable.\n\n```rust\nstatic GREETING: &str = "Hello";\nstatic mut COUNTER: u32 = 0;\n```',
    },
    ref: {
      detail: "keyword",
      doc: "Binds by reference during pattern matching.\n\n```rust\nlet ref x = 5; // x is &i32\n```",
    },
    dyn: {
      detail: "keyword",
      doc: "Dynamic dispatch for trait objects.\n\n```rust\nfn draw(shape: &dyn Shape) { ... }\n```",
    },
    self: {
      detail: "keyword",
      doc: "Refers to the current module or receiver in methods.\n\n```rust\nimpl Foo {\n    fn bar(&self) { ... }\n    fn baz(self) { ... }\n}\n```",
    },
    Self: {
      detail: "keyword",
      doc: "Refers to the implementing type within `impl` or `trait` blocks.\n\n```rust\nimpl MyStruct {\n    fn new() -> Self { Self { field: 0 } }\n}\n```",
    },
    crate: {
      detail: "keyword",
      doc: "Refers to the root of the current crate.\n\n```rust\nuse crate::module::Item;\n```",
    },
    super: {
      detail: "keyword",
      doc: "Refers to the parent module.\n\n```rust\nuse super::parent_function;\n```",
    },
    extern: {
      detail: "keyword",
      doc: 'Declares external functions or crates.\n\n```rust\nextern "C" {\n    fn abs(input: i32) -> i32;\n}\n```',
    },
    break: {
      detail: "keyword",
      doc: "Exits a loop, optionally with a value.\n\n```rust\nlet result = loop {\n    if done { break 42; }\n};\n```",
    },
    continue: {
      detail: "keyword",
      doc: 'Skips to the next loop iteration.\n\n```rust\nfor i in 0..10 {\n    if i % 2 == 0 { continue; }\n    println!("{}", i);\n}\n```',
    },
    as: {
      detail: "keyword",
      doc: "Type casting or renaming imports.\n\n```rust\nlet x = 65u8 as char;\nuse std::io::Result as IoResult;\n```",
    },

    // Types
    i8: {
      detail: "primitive type",
      doc: "8-bit signed integer. Range: -128 to 127.",
    },
    i16: {
      detail: "primitive type",
      doc: "16-bit signed integer. Range: -32,768 to 32,767.",
    },
    i32: {
      detail: "primitive type",
      doc: "32-bit signed integer. Range: -2^31 to 2^31 - 1. Default integer type.",
    },
    i64: {
      detail: "primitive type",
      doc: "64-bit signed integer. Range: -2^63 to 2^63 - 1.",
    },
    i128: { detail: "primitive type", doc: "128-bit signed integer." },
    isize: { detail: "primitive type", doc: "Pointer-sized signed integer." },
    u8: {
      detail: "primitive type",
      doc: "8-bit unsigned integer. Range: 0 to 255.",
    },
    u16: {
      detail: "primitive type",
      doc: "16-bit unsigned integer. Range: 0 to 65,535.",
    },
    u32: {
      detail: "primitive type",
      doc: "32-bit unsigned integer. Range: 0 to 2^32 - 1.",
    },
    u64: {
      detail: "primitive type",
      doc: "64-bit unsigned integer. Range: 0 to 2^64 - 1.",
    },
    u128: { detail: "primitive type", doc: "128-bit unsigned integer." },
    usize: {
      detail: "primitive type",
      doc: "Pointer-sized unsigned integer. Used for indexing.",
    },
    f32: {
      detail: "primitive type",
      doc: "32-bit floating-point number (IEEE 754 single precision).",
    },
    f64: {
      detail: "primitive type",
      doc: "64-bit floating-point number (IEEE 754 double precision). Default float type.",
    },
    bool: { detail: "primitive type", doc: "Boolean type: `true` or `false`." },
    char: {
      detail: "primitive type",
      doc: "A Unicode scalar value (4 bytes).\n\n```rust\nlet c: char = '🦀';\n```",
    },
    str: {
      detail: "primitive type",
      doc: "String slice, usually seen as `&str`. UTF-8 encoded.",
    },

    // Std types
    String: {
      detail: "std::string::String",
      doc: 'A growable, heap-allocated UTF-8 string.\n\n```rust\nlet s = String::from("hello");\nlet s = "hello".to_string();\n```',
    },
    Vec: {
      detail: "std::vec::Vec<T>",
      doc: "A growable, heap-allocated array.\n\n```rust\nlet v: Vec<i32> = vec![1, 2, 3];\nv.push(4);\n```",
    },
    Option: {
      detail: "std::option::Option<T>",
      doc: "Represents an optional value: `Some(T)` or `None`.\n\n```rust\nlet x: Option<i32> = Some(42);\nlet y: Option<i32> = None;\n```",
    },
    Result: {
      detail: "std::result::Result<T, E>",
      doc: 'Result of an operation: `Ok(T)` or `Err(E)`.\n\n```rust\nfn divide(a: f64, b: f64) -> Result<f64, String> {\n    if b == 0.0 { Err("division by zero".into()) }\n    else { Ok(a / b) }\n}\n```',
    },
    Box: {
      detail: "std::boxed::Box<T>",
      doc: "A heap-allocated smart pointer.\n\n```rust\nlet b = Box::new(5);\n```",
    },
    Rc: {
      detail: "std::rc::Rc<T>",
      doc: "Reference-counted smart pointer (single-threaded).\n\n```rust\nuse std::rc::Rc;\nlet a = Rc::new(5);\nlet b = Rc::clone(&a);\n```",
    },
    Arc: {
      detail: "std::sync::Arc<T>",
      doc: "Atomic reference-counted smart pointer (thread-safe).\n\n```rust\nuse std::sync::Arc;\nlet a = Arc::new(5);\n```",
    },
    HashMap: {
      detail: "std::collections::HashMap<K, V>",
      doc: 'A hash map (unordered key-value store).\n\n```rust\nuse std::collections::HashMap;\nlet mut map = HashMap::new();\nmap.insert("key", "value");\n```',
    },
    HashSet: {
      detail: "std::collections::HashSet<T>",
      doc: "A hash set (unordered unique values).\n\n```rust\nuse std::collections::HashSet;\nlet mut set = HashSet::new();\nset.insert(42);\n```",
    },
    Some: {
      detail: "Option::Some(T)",
      doc: "Contains a value in an `Option<T>`.\n\n```rust\nlet x: Option<i32> = Some(10);\n```",
    },
    None: {
      detail: "Option::None",
      doc: "Represents no value in an `Option<T>`.\n\n```rust\nlet x: Option<i32> = None;\n```",
    },
    Ok: {
      detail: "Result::Ok(T)",
      doc: "Represents a success value in `Result<T, E>`.\n\n```rust\nlet x: Result<i32, &str> = Ok(42);\n```",
    },
    Err: {
      detail: "Result::Err(E)",
      doc: 'Represents an error value in `Result<T, E>`.\n\n```rust\nlet x: Result<i32, &str> = Err("something went wrong");\n```',
    },
    Mutex: {
      detail: "std::sync::Mutex<T>",
      doc: "A mutual exclusion lock for thread-safe shared access.\n\n```rust\nuse std::sync::Mutex;\nlet m = Mutex::new(5);\nlet mut num = m.lock().unwrap();\n*num = 6;\n```",
    },
    Iterator: {
      detail: "std::iter::Iterator",
      doc: "Trait for types that produce a sequence of values.\n\n```rust\ntrait Iterator {\n    type Item;\n    fn next(&mut self) -> Option<Self::Item>;\n}\n```",
    },

    // Macros
    "println!": {
      detail: "macro",
      doc: 'Prints to stdout with a newline.\n\n```rust\nprintln!("Hello, {}!", name);\nprintln!("{:?}", debug_value);\n```',
    },
    "print!": {
      detail: "macro",
      doc: 'Prints to stdout without a newline.\n\n```rust\nprint!("Enter name: ");\n```',
    },
    "eprintln!": {
      detail: "macro",
      doc: 'Prints to stderr with a newline.\n\n```rust\neprintln!("Error: {}", msg);\n```',
    },
    "format!": {
      detail: "macro",
      doc: 'Creates a formatted `String`.\n\n```rust\nlet s = format!("{} is {} years old", name, age);\n```',
    },
    "vec!": {
      detail: "macro",
      doc: "Creates a `Vec` with given values.\n\n```rust\nlet v = vec![1, 2, 3];\nlet zeroes = vec![0; 10];\n```",
    },
    "panic!": {
      detail: "macro",
      doc: 'Causes the current thread to panic.\n\n```rust\npanic!("Something went terribly wrong: {}", reason);\n```',
    },
    "todo!": {
      detail: "macro",
      doc: "Marks unfinished code. Panics at runtime.\n\n```rust\nfn not_yet() -> i32 {\n    todo!()\n}\n```",
    },
    "unimplemented!": {
      detail: "macro",
      doc: "Marks intentionally unimplemented code. Panics at runtime.\n\n```rust\nfn maybe_later() { unimplemented!() }\n```",
    },
    "assert!": {
      detail: "macro",
      doc: 'Asserts a boolean condition is true.\n\n```rust\nassert!(x > 0);\nassert!(valid, "Expected valid state");\n```',
    },
    "assert_eq!": {
      detail: "macro",
      doc: "Asserts two values are equal.\n\n```rust\nassert_eq!(2 + 2, 4);\n```",
    },
    "assert_ne!": {
      detail: "macro",
      doc: "Asserts two values are not equal.\n\n```rust\nassert_ne!(result, 0);\n```",
    },
    "dbg!": {
      detail: "macro",
      doc: "Debug-prints an expression and its value to stderr, returning the value.\n\n```rust\nlet x = dbg!(2 + 3); // prints [src/main.rs:1] 2 + 3 = 5\n```",
    },
    "cfg!": {
      detail: "macro",
      doc: 'Evaluates configuration flags at compile time.\n\n```rust\nif cfg!(target_os = "linux") {\n    println!("Linux!");\n}\n```',
    },
    "matches!": {
      detail: "macro",
      doc: "Returns `true` if an expression matches a pattern.\n\n```rust\nlet is_vowel = matches!(c, 'a' | 'e' | 'i' | 'o' | 'u');\n```",
    },
    "write!": {
      detail: "macro",
      doc: 'Writes formatted data to a buffer.\n\n```rust\nuse std::fmt::Write;\nlet mut s = String::new();\nwrite!(s, "x = {}", 42).unwrap();\n```',
    },
    "writeln!": {
      detail: "macro",
      doc: 'Writes formatted data to a buffer with a newline.\n\n```rust\nwriteln!(buf, "line {}", n).unwrap();\n```',
    },
    "include_str!": {
      detail: "macro",
      doc: 'Includes a file as a string at compile time.\n\n```rust\nlet data = include_str!("data.txt");\n```',
    },
    "include_bytes!": {
      detail: "macro",
      doc: 'Includes a file as a byte array at compile time.\n\n```rust\nlet bytes = include_bytes!("image.png");\n```',
    },

    // Traits
    Display: {
      detail: "std::fmt::Display",
      doc: 'Trait for user-facing string formatting (`{}`).\n\n```rust\nimpl fmt::Display for Point {\n    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {\n        write!(f, "({}, {})", self.x, self.y)\n    }\n}\n```',
    },
    Debug: {
      detail: "std::fmt::Debug",
      doc: "Trait for debug formatting (`{:?}`). Usually `#[derive(Debug)]`.\n\n```rust\n#[derive(Debug)]\nstruct Point { x: f64, y: f64 }\n```",
    },
    Clone: {
      detail: "std::clone::Clone",
      doc: "Trait for explicitly duplicating a value.\n\n```rust\n#[derive(Clone)]\nstruct Foo { data: Vec<i32> }\nlet b = a.clone();\n```",
    },
    Copy: {
      detail: "std::marker::Copy",
      doc: "Trait for types that can be copied via simple bit-copy. Requires `Clone`.\n\n```rust\n#[derive(Copy, Clone)]\nstruct Point { x: f64, y: f64 }\n```",
    },
    Default: {
      detail: "std::default::Default",
      doc: "Trait for types with a default value.\n\n```rust\n#[derive(Default)]\nstruct Config { verbose: bool, retries: u32 }\nlet cfg = Config::default();\n```",
    },
    From: {
      detail: "std::convert::From<T>",
      doc: "Trait for value-to-value conversions.\n\n```rust\nimpl From<i32> for MyType {\n    fn from(val: i32) -> Self { ... }\n}\n```",
    },
    Into: {
      detail: "std::convert::Into<T>",
      doc: "Reciprocal of `From`. Usually auto-implemented.\n\n```rust\nlet x: MyType = 42.into();\n```",
    },
    Send: {
      detail: "std::marker::Send",
      doc: "Marker trait for types safe to transfer across thread boundaries.",
    },
    Sync: {
      detail: "std::marker::Sync",
      doc: "Marker trait for types safe to share references across threads.",
    },
    Drop: {
      detail: "std::ops::Drop",
      doc: 'Trait for custom destructor logic.\n\n```rust\nimpl Drop for MyResource {\n    fn drop(&mut self) {\n        println!("Cleaning up!");\n    }\n}\n```',
    },
  };

  /* ─────────────────────────────────────────────
     5. COMPLETIONS  (autocomplete + snippets)
  ───────────────────────────────────────────── */
  const CK = monaco.languages.CompletionItemKind;
  const CIR = monaco.languages.CompletionItemInsertTextRule;

  function mkSnippets() {
    return [
      {
        label: "fn",
        kind: CK.Snippet,
        insertText:
          "fn ${1:name}(${2:params}) ${3:-> ${4:ReturnType} }{\n\t$0\n}",
        insertTextRules: CIR.InsertAsSnippet,
        detail: "Function definition",
        documentation: "Define a new function",
      },
      {
        label: "fn main",
        kind: CK.Snippet,
        insertText: "fn main() {\n\t$0\n}",
        insertTextRules: CIR.InsertAsSnippet,
        detail: "Main function",
        documentation: "Entry point",
      },
      {
        label: "pfn",
        kind: CK.Snippet,
        insertText:
          "pub fn ${1:name}(${2:params}) ${3:-> ${4:ReturnType} }{\n\t$0\n}",
        insertTextRules: CIR.InsertAsSnippet,
        detail: "Public function",
        documentation: "Define a public function",
      },
      {
        label: "afn",
        kind: CK.Snippet,
        insertText:
          "async fn ${1:name}(${2:params}) ${3:-> ${4:ReturnType} }{\n\t$0\n}",
        insertTextRules: CIR.InsertAsSnippet,
        detail: "Async function",
        documentation: "Define an async function",
      },
      {
        label: "test",
        kind: CK.Snippet,
        insertText: "#[test]\nfn ${1:test_name}() {\n\t$0\n}",
        insertTextRules: CIR.InsertAsSnippet,
        detail: "#[test] function",
        documentation: "Unit test function",
      },
      {
        label: "testmod",
        kind: CK.Snippet,
        insertText:
          "#[cfg(test)]\nmod tests {\n\tuse super::*;\n\n\t#[test]\n\tfn ${1:test_name}() {\n\t\t$0\n\t}\n}",
        insertTextRules: CIR.InsertAsSnippet,
        detail: "Test module",
        documentation: "Test module with cfg(test)",
      },
      {
        label: "struct",
        kind: CK.Snippet,
        insertText: "struct ${1:Name} {\n\t${2:field}: ${3:Type},\n}",
        insertTextRules: CIR.InsertAsSnippet,
        detail: "Struct definition",
        documentation: "Define a struct",
      },
      {
        label: "enum",
        kind: CK.Snippet,
        insertText: "enum ${1:Name} {\n\t${2:Variant1},\n\t${3:Variant2},\n}",
        insertTextRules: CIR.InsertAsSnippet,
        detail: "Enum definition",
        documentation: "Define an enum",
      },
      {
        label: "impl",
        kind: CK.Snippet,
        insertText: "impl ${1:Type} {\n\t$0\n}",
        insertTextRules: CIR.InsertAsSnippet,
        detail: "Impl block",
        documentation: "Implement methods for a type",
      },
      {
        label: "impl trait",
        kind: CK.Snippet,
        insertText: "impl ${1:Trait} for ${2:Type} {\n\t$0\n}",
        insertTextRules: CIR.InsertAsSnippet,
        detail: "Trait implementation",
        documentation: "Implement a trait for a type",
      },
      {
        label: "trait",
        kind: CK.Snippet,
        insertText:
          "trait ${1:Name} {\n\tfn ${2:method}(&self)${3: -> ${4:ReturnType}};\n}",
        insertTextRules: CIR.InsertAsSnippet,
        detail: "Trait definition",
        documentation: "Define a trait",
      },
      {
        label: "match",
        kind: CK.Snippet,
        insertText:
          "match ${1:expr} {\n\t${2:pattern} => ${3:result},\n\t_ => ${0:default},\n}",
        insertTextRules: CIR.InsertAsSnippet,
        detail: "Match expression",
        documentation: "Pattern matching",
      },
      {
        label: "if let",
        kind: CK.Snippet,
        insertText: "if let ${1:Some(${2:val})} = ${3:expr} {\n\t$0\n}",
        insertTextRules: CIR.InsertAsSnippet,
        detail: "if let",
        documentation: "Conditional pattern match",
      },
      {
        label: "while let",
        kind: CK.Snippet,
        insertText: "while let ${1:Some(${2:val})} = ${3:expr} {\n\t$0\n}",
        insertTextRules: CIR.InsertAsSnippet,
        detail: "while let",
        documentation: "Loop with pattern matching",
      },
      {
        label: "for",
        kind: CK.Snippet,
        insertText: "for ${1:item} in ${2:iter} {\n\t$0\n}",
        insertTextRules: CIR.InsertAsSnippet,
        detail: "For loop",
        documentation: "Iterate over a collection",
      },
      {
        label: "loop",
        kind: CK.Snippet,
        insertText: "loop {\n\t$0\n}",
        insertTextRules: CIR.InsertAsSnippet,
        detail: "Infinite loop",
        documentation: "Loop forever (use break to exit)",
      },
      {
        label: "closure",
        kind: CK.Snippet,
        insertText: "|${1:args}| ${2:{\n\t$0\n}}",
        insertTextRules: CIR.InsertAsSnippet,
        detail: "Closure",
        documentation: "Anonymous function / closure",
      },
      {
        label: "println!",
        kind: CK.Snippet,
        insertText: 'println!("${1:{}}", ${0:expr});',
        insertTextRules: CIR.InsertAsSnippet,
        detail: "Print line macro",
        documentation: "Print to stdout with newline",
      },
      {
        label: "eprintln!",
        kind: CK.Snippet,
        insertText: 'eprintln!("${1:{}}", ${0:expr});',
        insertTextRules: CIR.InsertAsSnippet,
        detail: "Error print macro",
        documentation: "Print to stderr with newline",
      },
      {
        label: "format!",
        kind: CK.Snippet,
        insertText: 'format!("${1:{}}", ${0:expr})',
        insertTextRules: CIR.InsertAsSnippet,
        detail: "Format macro",
        documentation: "Create a formatted String",
      },
      {
        label: "vec!",
        kind: CK.Snippet,
        insertText: "vec![${0}]",
        insertTextRules: CIR.InsertAsSnippet,
        detail: "Vec macro",
        documentation: "Create a new Vec",
      },
      {
        label: "derive",
        kind: CK.Snippet,
        insertText: "#[derive(${1:Debug, Clone})]",
        insertTextRules: CIR.InsertAsSnippet,
        detail: "#[derive(...)]",
        documentation: "Derive trait implementations",
      },
      {
        label: "mod",
        kind: CK.Snippet,
        insertText: "mod ${1:name} {\n\t$0\n}",
        insertTextRules: CIR.InsertAsSnippet,
        detail: "Module",
        documentation: "Declare an inline module",
      },
      {
        label: "use",
        kind: CK.Snippet,
        insertText: "use ${1:std}::${0};",
        insertTextRules: CIR.InsertAsSnippet,
        detail: "Use statement",
        documentation: "Import items",
      },
      {
        label: "type",
        kind: CK.Snippet,
        insertText: "type ${1:Name} = ${0:Type};",
        insertTextRules: CIR.InsertAsSnippet,
        detail: "Type alias",
        documentation: "Define a type alias",
      },
      {
        label: "Result<>",
        kind: CK.Snippet,
        insertText: "Result<${1:T}, ${2:E}>",
        insertTextRules: CIR.InsertAsSnippet,
        detail: "Result type",
        documentation: "Result<T, E> type",
      },
      {
        label: "Option<>",
        kind: CK.Snippet,
        insertText: "Option<${1:T}>",
        insertTextRules: CIR.InsertAsSnippet,
        detail: "Option type",
        documentation: "Option<T> type",
      },
      {
        label: "impl Display",
        kind: CK.Snippet,
        insertText:
          'impl std::fmt::Display for ${1:Type} {\n\tfn fmt(&self, f: &mut std::fmt::Formatter<\'_>) -> std::fmt::Result {\n\t\twrite!(f, "${2:{}}"${3:, self.0})\n\t}\n}',
        insertTextRules: CIR.InsertAsSnippet,
        detail: "Display impl",
        documentation: "Implement Display trait",
      },
      {
        label: "impl From",
        kind: CK.Snippet,
        insertText:
          "impl From<${1:Source}> for ${2:Target} {\n\tfn from(val: ${1:Source}) -> Self {\n\t\t$0\n\t}\n}",
        insertTextRules: CIR.InsertAsSnippet,
        detail: "From impl",
        documentation: "Implement From trait",
      },
      {
        label: "impl Iterator",
        kind: CK.Snippet,
        insertText:
          "impl Iterator for ${1:Type} {\n\ttype Item = ${2:ItemType};\n\n\tfn next(&mut self) -> Option<Self::Item> {\n\t\t$0\n\t}\n}",
        insertTextRules: CIR.InsertAsSnippet,
        detail: "Iterator impl",
        documentation: "Implement Iterator trait",
      },
      {
        label: "impl Default",
        kind: CK.Snippet,
        insertText:
          "impl Default for ${1:Type} {\n\tfn default() -> Self {\n\t\tSelf {\n\t\t\t$0\n\t\t}\n\t}\n}",
        insertTextRules: CIR.InsertAsSnippet,
        detail: "Default impl",
        documentation: "Implement Default trait",
      },
      {
        label: "match Option",
        kind: CK.Snippet,
        insertText:
          "match ${1:option} {\n\tSome(${2:val}) => $3,\n\tNone => $0,\n}",
        insertTextRules: CIR.InsertAsSnippet,
        detail: "Match Option",
        documentation: "Pattern match on Option",
      },
      {
        label: "match Result",
        kind: CK.Snippet,
        insertText:
          "match ${1:result} {\n\tOk(${2:val}) => $3,\n\tErr(${4:e}) => $0,\n}",
        insertTextRules: CIR.InsertAsSnippet,
        detail: "Match Result",
        documentation: "Pattern match on Result",
      },
    ];
  }

  function mkKeywordItems(range) {
    const kws = [
      "as",
      "async",
      "await",
      "break",
      "const",
      "continue",
      "crate",
      "dyn",
      "else",
      "enum",
      "extern",
      "false",
      "fn",
      "for",
      "if",
      "impl",
      "in",
      "let",
      "loop",
      "match",
      "mod",
      "move",
      "mut",
      "pub",
      "ref",
      "return",
      "self",
      "Self",
      "static",
      "struct",
      "super",
      "trait",
      "true",
      "type",
      "unsafe",
      "use",
      "where",
      "while",
    ];
    return kws.map((k) => ({
      label: k,
      kind: CK.Keyword,
      insertText: k,
      detail: "keyword",
      documentation: DOCS[k] ? DOCS[k].doc : undefined,
      range,
    }));
  }

  function mkTypeItems(range) {
    const types = [
      "i8",
      "i16",
      "i32",
      "i64",
      "i128",
      "isize",
      "u8",
      "u16",
      "u32",
      "u64",
      "u128",
      "usize",
      "f32",
      "f64",
      "bool",
      "char",
      "str",
      "String",
      "Vec",
      "Option",
      "Result",
      "Box",
      "Rc",
      "Arc",
      "HashMap",
      "HashSet",
      "BTreeMap",
      "BTreeSet",
      "Mutex",
      "RwLock",
      "Cell",
      "RefCell",
      "Pin",
      "Future",
      "Iterator",
      "Some",
      "None",
      "Ok",
      "Err",
    ];
    return types.map((t) => ({
      label: t,
      kind: CK.Class,
      insertText: t,
      detail: DOCS[t] ? DOCS[t].detail : "type",
      documentation: DOCS[t] ? DOCS[t].doc : undefined,
      range,
    }));
  }

  function mkTraitItems(range) {
    const traits = [
      "Debug",
      "Display",
      "Default",
      "Clone",
      "Copy",
      "PartialEq",
      "Eq",
      "PartialOrd",
      "Ord",
      "Hash",
      "From",
      "Into",
      "TryFrom",
      "TryInto",
      "AsRef",
      "AsMut",
      "Deref",
      "DerefMut",
      "Drop",
      "Fn",
      "FnMut",
      "FnOnce",
      "Send",
      "Sync",
      "Sized",
      "Iterator",
      "Read",
      "Write",
      "Seek",
      "BufRead",
      "ToString",
      "ToOwned",
      "Borrow",
      "BorrowMut",
      "Add",
      "Sub",
      "Mul",
      "Div",
      "Rem",
      "Neg",
      "Not",
      "Index",
      "IndexMut",
    ];
    return traits.map((t) => ({
      label: t,
      kind: CK.Interface,
      insertText: t,
      detail: DOCS[t] ? DOCS[t].detail : "trait",
      documentation: DOCS[t] ? DOCS[t].doc : undefined,
      range,
    }));
  }

  function mkMacroItems(range) {
    const macros = [
      "println!",
      "print!",
      "eprintln!",
      "eprint!",
      "format!",
      "write!",
      "writeln!",
      "vec!",
      "todo!",
      "unimplemented!",
      "unreachable!",
      "panic!",
      "assert!",
      "assert_eq!",
      "assert_ne!",
      "dbg!",
      "cfg!",
      "matches!",
      "include_str!",
      "include_bytes!",
      "compile_error!",
      "concat!",
      "stringify!",
    ];
    return macros.map((m) => ({
      label: m,
      kind: CK.Function,
      insertText: m.replace("!", "") + "!($0)",
      insertTextRules: CIR.InsertAsSnippet,
      detail: DOCS[m] ? DOCS[m].detail : "macro",
      documentation: DOCS[m] ? DOCS[m].doc : undefined,
      range,
    }));
  }

  function mkMethodItems(range) {
    const methods = [
      {
        l: ".unwrap()",
        i: "unwrap()",
        d: "Unwraps an Option/Result, panicking on None/Err.",
      },
      {
        l: ".unwrap_or()",
        i: "unwrap_or(${0:default})",
        d: "Returns contained value or a provided default.",
      },
      {
        l: ".unwrap_or_else()",
        i: "unwrap_or_else(|| ${0:default})",
        d: "Returns contained value or computes from a closure.",
      },
      {
        l: ".unwrap_or_default()",
        i: "unwrap_or_default()",
        d: "Returns contained value or Default::default().",
      },
      {
        l: ".expect()",
        i: 'expect("${0:msg}")',
        d: "Unwraps, panicking with a message on failure.",
      },
      {
        l: ".is_some()",
        i: "is_some()",
        d: "Returns true if the Option is Some.",
      },
      {
        l: ".is_none()",
        i: "is_none()",
        d: "Returns true if the Option is None.",
      },
      { l: ".is_ok()", i: "is_ok()", d: "Returns true if the Result is Ok." },
      {
        l: ".is_err()",
        i: "is_err()",
        d: "Returns true if the Result is Err.",
      },
      {
        l: ".map()",
        i: "map(|${1:x}| ${0:expr})",
        d: "Maps a value by applying a function.",
      },
      {
        l: ".and_then()",
        i: "and_then(|${1:x}| ${0:expr})",
        d: "Chains a computation that returns Option/Result.",
      },
      {
        l: ".or_else()",
        i: "or_else(|| ${0:expr})",
        d: "Returns the Option/Result if it contains a value, otherwise calls f.",
      },
      {
        l: ".filter()",
        i: "filter(|${1:x}| ${0:predicate})",
        d: "Filters based on a predicate.",
      },
      { l: ".ok()", i: "ok()", d: "Converts Result<T,E> to Option<T>." },
      { l: ".err()", i: "err()", d: "Converts Result<T,E> to Option<E>." },
      {
        l: ".iter()",
        i: "iter()",
        d: "Returns an iterator over the collection.",
      },
      {
        l: ".into_iter()",
        i: "into_iter()",
        d: "Consumes the collection into an iterator.",
      },
      { l: ".iter_mut()", i: "iter_mut()", d: "Returns a mutable iterator." },
      {
        l: ".collect()",
        i: "collect::<${0:Vec<_>>()}",
        d: "Transforms an iterator into a collection.",
      },
      {
        l: ".enumerate()",
        i: "enumerate()",
        d: "Creates an iterator that yields (index, value) pairs.",
      },
      {
        l: ".zip()",
        i: "zip(${0:other})",
        d: "Zips two iterators into one of pairs.",
      },
      { l: ".take()", i: "take(${0:n})", d: "Takes the first n elements." },
      { l: ".skip()", i: "skip(${0:n})", d: "Skips the first n elements." },
      { l: ".chain()", i: "chain(${0:other})", d: "Chains two iterators." },
      { l: ".flatten()", i: "flatten()", d: "Flattens nested iterators." },
      {
        l: ".flat_map()",
        i: "flat_map(|${1:x}| ${0:expr})",
        d: "Maps then flattens.",
      },
      {
        l: ".fold()",
        i: "fold(${1:init}, |${2:acc}, ${3:x}| ${0:expr})",
        d: "Reduces to a single value with an accumulator.",
      },
      {
        l: ".reduce()",
        i: "reduce(|${1:acc}, ${2:x}| ${0:expr})",
        d: "Reduces without an initial value.",
      },
      {
        l: ".for_each()",
        i: "for_each(|${1:x}| ${0:expr})",
        d: "Applies a function to each element.",
      },
      {
        l: ".any()",
        i: "any(|${1:x}| ${0:predicate})",
        d: "Tests if any element matches a predicate.",
      },
      {
        l: ".all()",
        i: "all(|${1:x}| ${0:predicate})",
        d: "Tests if all elements match a predicate.",
      },
      {
        l: ".find()",
        i: "find(|${1:x}| ${0:predicate})",
        d: "Returns the first matching element.",
      },
      {
        l: ".position()",
        i: "position(|${1:x}| ${0:predicate})",
        d: "Returns the index of the first match.",
      },
      { l: ".count()", i: "count()", d: "Counts the number of elements." },
      { l: ".sum()", i: "sum::<${0:i32}>()", d: "Sums all elements." },
      { l: ".min()", i: "min()", d: "Returns the minimum element." },
      { l: ".max()", i: "max()", d: "Returns the maximum element." },
      {
        l: ".cloned()",
        i: "cloned()",
        d: "Clones each element of the iterator.",
      },
      {
        l: ".copied()",
        i: "copied()",
        d: "Copies each element (requires Copy).",
      },
      { l: ".rev()", i: "rev()", d: "Reverses the iterator." },
      { l: ".peekable()", i: "peekable()", d: "Creates a peekable iterator." },
      {
        l: ".push()",
        i: "push(${0:value})",
        d: "Appends an element to a Vec.",
      },
      { l: ".pop()", i: "pop()", d: "Removes and returns the last element." },
      { l: ".len()", i: "len()", d: "Returns the number of elements." },
      {
        l: ".is_empty()",
        i: "is_empty()",
        d: "Returns true if there are no elements.",
      },
      {
        l: ".contains()",
        i: "contains(${0:&value})",
        d: "Returns true if the collection contains the value.",
      },
      {
        l: ".insert()",
        i: "insert(${1:key}, ${0:value})",
        d: "Inserts a key-value pair.",
      },
      {
        l: ".remove()",
        i: "remove(${0:key})",
        d: "Removes a key from the map.",
      },
      {
        l: ".get()",
        i: "get(${0:key})",
        d: "Returns a reference to the value for a key.",
      },
      {
        l: ".entry()",
        i: "entry(${0:key})",
        d: "Gets the entry for in-place manipulation.",
      },
      {
        l: ".or_insert()",
        i: "or_insert(${0:default})",
        d: "Inserts a default if the entry is vacant.",
      },
      { l: ".clone()", i: "clone()", d: "Creates a deep copy (Clone trait)." },
      { l: ".to_string()", i: "to_string()", d: "Converts to a String." },
      {
        l: ".to_owned()",
        i: "to_owned()",
        d: "Creates owned data from borrowed data.",
      },
      { l: ".as_ref()", i: "as_ref()", d: "Borrows as a reference." },
      { l: ".as_mut()", i: "as_mut()", d: "Borrows as a mutable reference." },
      {
        l: ".into()",
        i: "into()",
        d: "Converts into another type (Into trait).",
      },
      {
        l: ".from()",
        i: "from(${0:value})",
        d: "Creates from another type (From trait).",
      },
      { l: ".sort()", i: "sort()", d: "Sorts the slice in place." },
      {
        l: ".sort_by()",
        i: "sort_by(|${1:a}, ${2:b}| ${0:a.cmp(b)})",
        d: "Sorts with a custom comparator.",
      },
      { l: ".dedup()", i: "dedup()", d: "Removes consecutive duplicates." },
      {
        l: ".retain()",
        i: "retain(|${1:x}| ${0:predicate})",
        d: "Retains only elements matching a predicate.",
      },
      {
        l: ".split_at()",
        i: "split_at(${0:mid})",
        d: "Splits the slice at an index.",
      },
      {
        l: ".windows()",
        i: "windows(${0:size})",
        d: "Returns overlapping windows of a given size.",
      },
      {
        l: ".chunks()",
        i: "chunks(${0:size})",
        d: "Returns non-overlapping chunks.",
      },
      {
        l: ".join()",
        i: 'join("${0:,}")',
        d: "Joins string slices with a separator.",
      },
      {
        l: ".trim()",
        i: "trim()",
        d: "Removes leading and trailing whitespace.",
      },
      {
        l: ".starts_with()",
        i: 'starts_with("${0:prefix}")',
        d: "Checks if the string starts with a pattern.",
      },
      {
        l: ".ends_with()",
        i: 'ends_with("${0:suffix}")',
        d: "Checks if the string ends with a pattern.",
      },
      {
        l: ".replace()",
        i: 'replace("${1:from}", "${0:to}")',
        d: "Replaces occurrences of a pattern.",
      },
      {
        l: ".split()",
        i: 'split("${0:pattern}")',
        d: "Splits a string by a pattern.",
      },
      {
        l: ".chars()",
        i: "chars()",
        d: "Returns an iterator over characters.",
      },
      { l: ".bytes()", i: "bytes()", d: "Returns an iterator over bytes." },
      { l: ".lines()", i: "lines()", d: "Returns an iterator over lines." },
      {
        l: ".parse()",
        i: "parse::<${0:Type}>()",
        d: "Parses a string into another type.",
      },
      {
        l: ".to_uppercase()",
        i: "to_uppercase()",
        d: "Returns the string in uppercase.",
      },
      {
        l: ".to_lowercase()",
        i: "to_lowercase()",
        d: "Returns the string in lowercase.",
      },
      { l: ".lock()", i: "lock().unwrap()", d: "Acquires the Mutex lock." },
      { l: ".read()", i: "read().unwrap()", d: "Acquires a RwLock read lock." },
      { l: ".borrow()", i: "borrow()", d: "Borrows the RefCell value." },
      {
        l: ".borrow_mut()",
        i: "borrow_mut()",
        d: "Mutably borrows the RefCell value.",
      },
    ];
    return methods.map((m) => ({
      label: m.l,
      kind: CK.Method,
      insertText: m.i,
      insertTextRules: CIR.InsertAsSnippet,
      detail: "method",
      documentation: m.d,
      range,
    }));
  }

  monaco.languages.registerCompletionItemProvider("rust", {
    triggerCharacters: [".", ":", "!", "#"],
    provideCompletionItems(model, position) {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };

      const lineContent = model.getLineContent(position.lineNumber);
      const textBefore = lineContent.substring(0, position.column - 1);

      // After a dot → suggest methods
      if (textBefore.endsWith(".") || /\.\w*$/.test(textBefore)) {
        return { suggestions: mkMethodItems(range) };
      }

      // After :: → suggest associated items
      if (textBefore.endsWith("::") || /::\w*$/.test(textBefore)) {
        const assocItems = [
          { l: "new()", i: "new(${0})", d: "Constructor" },
          { l: "default()", i: "default()", d: "Default constructor" },
          { l: "from()", i: "from(${0:val})", d: "From conversion" },
          {
            l: "with_capacity()",
            i: "with_capacity(${0:cap})",
            d: "Creates with preallocated capacity",
          },
          { l: "builder()", i: "builder()", d: "Creates a builder" },
        ];
        return {
          suggestions: assocItems.map((m) => ({
            label: m.l,
            kind: CK.Method,
            insertText: m.i,
            insertTextRules: CIR.InsertAsSnippet,
            detail: "associated fn",
            documentation: m.d,
            range,
          })),
        };
      }

      // After # → attribute completions
      if (
        textBefore.endsWith("#") ||
        textBefore.endsWith("#[") ||
        textBefore.endsWith("#![")
      ) {
        const attrs = [
          {
            l: "derive",
            i: "[derive(${0:Debug, Clone})]",
            d: "Derive trait implementations",
          },
          { l: "cfg", i: "[cfg(${0:test})]", d: "Conditional compilation" },
          {
            l: "allow",
            i: "[allow(${0:unused_variables})]",
            d: "Suppress a lint",
          },
          { l: "warn", i: "[warn(${0:missing_docs})]", d: "Warn on a lint" },
          { l: "deny", i: "[deny(${0:warnings})]", d: "Deny a lint" },
          { l: "test", i: "[test]", d: "Mark as test function" },
          { l: "inline", i: "[inline]", d: "Suggest inlining" },
          { l: "inline(always)", i: "[inline(always)]", d: "Force inlining" },
          {
            l: "must_use",
            i: "[must_use]",
            d: "Warn if return value is unused",
          },
          {
            l: "deprecated",
            i: '[deprecated(since = "${1:0.1.0}", note = "${0:reason}")]',
            d: "Mark as deprecated",
          },
          { l: "repr", i: "[repr(${0:C})]", d: "Control type layout" },
          {
            l: "doc",
            i: '[doc = "${0:Documentation}"]',
            d: "Documentation attribute",
          },
          { l: "no_mangle", i: "[no_mangle]", d: "Disable name mangling" },
          { l: "macro_export", i: "[macro_export]", d: "Export a macro" },
          {
            l: "non_exhaustive",
            i: "[non_exhaustive]",
            d: "Indicate type may grow",
          },
          {
            l: "feature",
            i: "![feature(${0:feature_name})]",
            d: "Enable a feature gate",
          },
          { l: "should_panic", i: "[should_panic]", d: "Test should panic" },
          { l: "ignore", i: "[ignore]", d: "Ignore this test" },
        ];
        return {
          suggestions: attrs.map((a) => ({
            label: "#[" + a.l + "]",
            kind: CK.Property,
            insertText: a.i,
            insertTextRules: CIR.InsertAsSnippet,
            detail: "attribute",
            documentation: a.d,
            range,
          })),
        };
      }

      // Collect symbols from current file for local completions
      const text = model.getValue();
      const localItems = [];
      const seen = new Set();

      // Functions
      for (const m of text.matchAll(/\b(?:pub\s+)?(?:async\s+)?fn\s+(\w+)/g)) {
        if (!seen.has(m[1])) {
          seen.add(m[1]);
          localItems.push({
            label: m[1],
            kind: CK.Function,
            insertText: m[1] + "($0)",
            insertTextRules: CIR.InsertAsSnippet,
            detail: "fn (local)",
            range,
          });
        }
      }
      // Structs
      for (const m of text.matchAll(/\bstruct\s+(\w+)/g)) {
        if (!seen.has(m[1])) {
          seen.add(m[1]);
          localItems.push({
            label: m[1],
            kind: CK.Struct,
            insertText: m[1],
            detail: "struct (local)",
            range,
          });
        }
      }
      // Enums
      for (const m of text.matchAll(/\benum\s+(\w+)/g)) {
        if (!seen.has(m[1])) {
          seen.add(m[1]);
          localItems.push({
            label: m[1],
            kind: CK.Enum,
            insertText: m[1],
            detail: "enum (local)",
            range,
          });
        }
      }
      // Traits
      for (const m of text.matchAll(/\btrait\s+(\w+)/g)) {
        if (!seen.has(m[1])) {
          seen.add(m[1]);
          localItems.push({
            label: m[1],
            kind: CK.Interface,
            insertText: m[1],
            detail: "trait (local)",
            range,
          });
        }
      }
      // let bindings
      for (const m of text.matchAll(/\blet\s+(?:mut\s+)?(\w+)/g)) {
        if (!seen.has(m[1]) && m[1] !== "_") {
          seen.add(m[1]);
          localItems.push({
            label: m[1],
            kind: CK.Variable,
            insertText: m[1],
            detail: "variable (local)",
            range,
          });
        }
      }
      // const / static
      for (const m of text.matchAll(/\b(?:const|static)\s+(?:mut\s+)?(\w+)/g)) {
        if (!seen.has(m[1])) {
          seen.add(m[1]);
          localItems.push({
            label: m[1],
            kind: CK.Constant,
            insertText: m[1],
            detail: "constant (local)",
            range,
          });
        }
      }

      const snippets = mkSnippets().map((s) => ({ ...s, range }));

      return {
        suggestions: [
          ...snippets,
          ...mkKeywordItems(range),
          ...mkTypeItems(range),
          ...mkTraitItems(range),
          ...mkMacroItems(range),
          ...localItems,
        ],
      };
    },
  });

  /* ─────────────────────────────────────────────
     6. HOVER PROVIDER
  ───────────────────────────────────────────── */
  monaco.languages.registerHoverProvider("rust", {
    provideHover(model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return null;
      let token = word.word;

      // check if macro (word followed by !)
      const line = model.getLineContent(position.lineNumber);
      if (line[word.endColumn - 1] === "!") token += "!";

      const info = DOCS[token];
      if (!info) {
        // Try to find definition in current file
        const text = model.getValue();
        let match;
        // Function signature
        const fnRegex = new RegExp(
          "(?:pub\\s+)?(?:async\\s+)?fn\\s+" +
            token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") +
            "\\s*(?:<[^>]*>)?\\s*\\([^)]*\\)(?:\\s*->\\s*[^{]+)?",
        );
        match = fnRegex.exec(text);
        if (match) {
          return {
            range: new monaco.Range(
              position.lineNumber,
              word.startColumn,
              position.lineNumber,
              word.endColumn,
            ),
            contents: [
              { value: "```rust\n" + match[0].trim() + "\n```" },
              { value: "_Defined in this file_" },
            ],
          };
        }
        // Struct
        const structRegex = new RegExp(
          "(?:pub\\s+)?struct\\s+" +
            token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") +
            "[^{;]*",
        );
        match = structRegex.exec(text);
        if (match) {
          return {
            range: new monaco.Range(
              position.lineNumber,
              word.startColumn,
              position.lineNumber,
              word.endColumn,
            ),
            contents: [
              { value: "```rust\n" + match[0].trim() + "\n```" },
              { value: "_Defined in this file_" },
            ],
          };
        }
        // Enum
        const enumRegex = new RegExp(
          "(?:pub\\s+)?enum\\s+" +
            token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") +
            "[^{]*",
        );
        match = enumRegex.exec(text);
        if (match) {
          return {
            range: new monaco.Range(
              position.lineNumber,
              word.startColumn,
              position.lineNumber,
              word.endColumn,
            ),
            contents: [
              { value: "```rust\n" + match[0].trim() + "\n```" },
              { value: "_Defined in this file_" },
            ],
          };
        }
        // Trait
        const traitRegex = new RegExp(
          "(?:pub\\s+)?trait\\s+" +
            token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") +
            "[^{]*",
        );
        match = traitRegex.exec(text);
        if (match) {
          return {
            range: new monaco.Range(
              position.lineNumber,
              word.startColumn,
              position.lineNumber,
              word.endColumn,
            ),
            contents: [
              { value: "```rust\n" + match[0].trim() + "\n```" },
              { value: "_Defined in this file_" },
            ],
          };
        }
        return null;
      }
      return {
        range: new monaco.Range(
          position.lineNumber,
          word.startColumn,
          position.lineNumber,
          word.endColumn,
        ),
        contents: [
          { value: "**" + token + "** — `" + info.detail + "`" },
          { value: info.doc },
        ],
      };
    },
  });

  /* ─────────────────────────────────────────────
     7. GO TO DEFINITION
  ───────────────────────────────────────────── */
  monaco.languages.registerDefinitionProvider("rust", {
    provideDefinition(model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return null;
      const token = word.word;
      const text = model.getValue();
      const lines = text.split("\n");

      const patterns = [
        new RegExp("^\\s*(?:pub\\s+)?(?:async\\s+)?fn\\s+" + token + "\\b"),
        new RegExp("^\\s*(?:pub\\s+)?struct\\s+" + token + "\\b"),
        new RegExp("^\\s*(?:pub\\s+)?enum\\s+" + token + "\\b"),
        new RegExp("^\\s*(?:pub\\s+)?trait\\s+" + token + "\\b"),
        new RegExp("^\\s*(?:pub\\s+)?type\\s+" + token + "\\b"),
        new RegExp("^\\s*(?:pub\\s+)?mod\\s+" + token + "\\b"),
        new RegExp(
          "^\\s*(?:pub\\s+)?(?:const|static)\\s+(?:mut\\s+)?" + token + "\\b",
        ),
        new RegExp("^\\s*(?:pub\\s+)?(?:union)\\s+" + token + "\\b"),
        new RegExp("^\\s*macro_rules!\\s+" + token + "\\b"),
      ];

      for (let i = 0; i < lines.length; i++) {
        for (const pat of patterns) {
          if (pat.test(lines[i])) {
            const col = lines[i].indexOf(token) + 1;
            return {
              uri: model.uri,
              range: new monaco.Range(i + 1, col, i + 1, col + token.length),
            };
          }
        }
      }
      // Also find let bindings
      for (let i = 0; i < lines.length; i++) {
        const letPat = new RegExp("\\blet\\s+(?:mut\\s+)?" + token + "\\b");
        if (letPat.test(lines[i])) {
          const col = lines[i].indexOf(token) + 1;
          return {
            uri: model.uri,
            range: new monaco.Range(i + 1, col, i + 1, col + token.length),
          };
        }
      }
      return null;
    },
  });

  /* ─────────────────────────────────────────────
     8. SIGNATURE HELP
  ───────────────────────────────────────────── */
  monaco.languages.registerSignatureHelpProvider("rust", {
    signatureHelpTriggerCharacters: ["(", ","],
    provideSignatureHelp(model, position) {
      const textBefore = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });

      // Find the function name before the opening paren
      const match = textBefore.match(/(\w+)\s*\(([^)]*)$/);
      if (!match) return null;
      const fnName = match[1];
      const argsText = match[2];
      const paramIndex = (argsText.match(/,/g) || []).length;

      // Search current file for the function signature
      const text = model.getValue();
      const fnRegex = new RegExp(
        "fn\\s+" +
          fnName +
          "\\s*(?:<[^>]*>)?\\s*\\(([^)]*)\\)(?:\\s*->\\s*([^{\\n]+))?",
      );
      const fnMatch = fnRegex.exec(text);
      if (!fnMatch) return null;

      const paramsStr = fnMatch[1].trim();
      const retType = fnMatch[2] ? fnMatch[2].trim() : "";
      const params = paramsStr
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean);

      const sig = {
        label:
          fnName + "(" + paramsStr + ")" + (retType ? " -> " + retType : ""),
        parameters: params.map((p) => ({ label: p })),
      };

      return {
        value: {
          signatures: [sig],
          activeSignature: 0,
          activeParameter: Math.min(paramIndex, params.length - 1),
        },
        dispose() {},
      };
    },
  });

  /* ─────────────────────────────────────────────
     9. DOCUMENT SYMBOLS  (outline)
  ───────────────────────────────────────────── */
  monaco.languages.registerDocumentSymbolProvider("rust", {
    provideDocumentSymbols(model) {
      const symbols = [];
      const lines = model.getValue().split("\n");
      const SK = monaco.languages.SymbolKind;

      const patterns = [
        { regex: /(?:pub\s+)?(?:async\s+)?fn\s+(\w+)/, kind: SK.Function },
        { regex: /(?:pub\s+)?struct\s+(\w+)/, kind: SK.Struct },
        { regex: /(?:pub\s+)?enum\s+(\w+)/, kind: SK.Enum },
        { regex: /(?:pub\s+)?trait\s+(\w+)/, kind: SK.Interface },
        { regex: /(?:pub\s+)?type\s+(\w+)/, kind: SK.TypeParameter },
        { regex: /(?:pub\s+)?mod\s+(\w+)/, kind: SK.Module },
        { regex: /(?:pub\s+)?const\s+(\w+)/, kind: SK.Constant },
        { regex: /(?:pub\s+)?static\s+(?:mut\s+)?(\w+)/, kind: SK.Constant },
        { regex: /macro_rules!\s+(\w+)/, kind: SK.Function },
        { regex: /impl(?:\s+<[^>]*>)?\s+(\w+)/, kind: SK.Class },
      ];

      lines.forEach((line, i) => {
        for (const p of patterns) {
          const m = p.regex.exec(line);
          if (m) {
            const col = line.indexOf(m[1]) + 1;
            symbols.push({
              name: m[1],
              kind: p.kind,
              range: new monaco.Range(i + 1, 1, i + 1, line.length + 1),
              selectionRange: new monaco.Range(
                i + 1,
                col,
                i + 1,
                col + m[1].length,
              ),
            });
          }
        }
      });
      return symbols;
    },
  });

  //   /* ─────────────────────────────────────────────
  //      10. DOCUMENT FORMATTING
  //   ───────────────────────────────────────────── */
  //   monaco.languages.registerDocumentFormattingEditProvider("rust", {
  //     provideDocumentFormattingEdits(model) {
  //       const text = model.getValue();
  //       let formatted = text;
  //       // Basic formatting: normalize spacing around braces, remove trailing whitespace
  //       formatted = formatted.replace(/[ \t]+$/gm, ""); // trailing spaces
  //       formatted = formatted.replace(/\n{3,}/g, "\n\n"); // max 2 blank lines
  //       formatted = formatted.replace(/\{\s*\n\n/g, "{\n"); // blank line after {
  //       formatted = formatted.replace(/\n\n\s*\}/g, "\n}"); // blank line before }
  //       if (formatted === text) return [];
  //       return [{ range: model.getFullModelRange(), text: formatted }];
  //     },
  //   });
};
