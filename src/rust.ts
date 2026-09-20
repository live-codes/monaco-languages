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
        [/#!\[/, "annotation", "@attribute"],
        [/#\[/, "annotation", "@attribute"],
        [/'[a-zA-Z_]\w*/, "type.lifetime"],
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
        { include: "@whitespace" },
        [/[{}()\[\]]/, "@brackets"],
        [/[<>](?!@symbols)/, "@brackets"],
        [/@symbols/, { cases: { "@operators": "operator", "@default": "" } }],
        [/\d*\.\d+(?:[eE][\-+]?\d+)?(@floatSuffixes)?/, "number.float"],
        [/0[xX][0-9a-fA-F_]+(@intSuffixes)?/, "number.hex"],
        [/0[oO][0-7_]+(@intSuffixes)?/, "number.octal"],
        [/0[bB][01_]+(@intSuffixes)?/, "number.binary"],
        [/\d[0-9_]*(@intSuffixes)?/, "number"],
        [/b?"/, "string", "@string"],
        [/b?r(#*)"/, "string.raw", "@rawstring.$1"],
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
  const DOCS: Record<string, { detail: string; doc: string }> = {
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
     5. STD LIBRARY DATABASE
  ───────────────────────────────────────────── */

  // ── 5a. Type-specific associated functions (for :: completions) ──
  type AssocEntry = { l: string; i: string; d: string; doc?: string };

  const TYPE_ASSOC_FNS: Record<string, AssocEntry[]> = {
    String: [
      {
        l: "new()",
        i: "new()",
        d: "String::new()",
        doc: "Creates a new empty `String`.",
      },
      {
        l: "from()",
        i: "from(${0:s})",
        d: "String::from(&str)",
        doc: "Creates a `String` from a string slice.",
      },
      {
        l: "with_capacity()",
        i: "with_capacity(${0:cap})",
        d: "String::with_capacity(usize)",
        doc: "Creates a new empty `String` with at least the specified capacity.",
      },
      {
        l: "from_utf8()",
        i: "from_utf8(${0:vec})",
        d: "String::from_utf8(Vec<u8>) -> Result<String, FromUtf8Error>",
        doc: "Converts a vector of bytes to a `String`.",
      },
      {
        l: "from_utf8_lossy()",
        i: "from_utf8_lossy(${0:bytes})",
        d: "String::from_utf8_lossy(&[u8]) -> Cow<str>",
        doc: "Converts bytes to a string, replacing invalid UTF-8 sequences.",
      },
      {
        l: "from_utf16()",
        i: "from_utf16(${0:v})",
        d: "String::from_utf16(&[u16]) -> Result<String, FromUtf16Error>",
        doc: "Decode a UTF-16 encoded vector into a `String`.",
      },
    ],
    Vec: [
      {
        l: "new()",
        i: "new()",
        d: "Vec::new()",
        doc: "Creates a new empty `Vec<T>`.",
      },
      {
        l: "with_capacity()",
        i: "with_capacity(${0:cap})",
        d: "Vec::with_capacity(usize)",
        doc: "Creates a `Vec` with the given capacity.",
      },
      {
        l: "from_elem()",
        i: "from_elem(${1:val}, ${0:n})",
        d: "vec![val; n]",
        doc: "Creates a `Vec` containing n copies of a value (use `vec![val; n]`).",
      },
      {
        l: "from_raw_parts()",
        i: "from_raw_parts(${1:ptr}, ${2:len}, ${0:cap})",
        d: "Vec::from_raw_parts(*mut T, usize, usize)",
        doc: "Creates a `Vec` from a raw pointer, length, and capacity. Unsafe.",
      },
    ],
    HashMap: [
      {
        l: "new()",
        i: "new()",
        d: "HashMap::new()",
        doc: "Creates an empty `HashMap`.",
      },
      {
        l: "with_capacity()",
        i: "with_capacity(${0:cap})",
        d: "HashMap::with_capacity(usize)",
        doc: "Creates a `HashMap` with at least the specified capacity.",
      },
      {
        l: "with_hasher()",
        i: "with_hasher(${0:hasher})",
        d: "HashMap::with_hasher(S)",
        doc: "Creates an empty `HashMap` using the given hash builder.",
      },
      {
        l: "with_capacity_and_hasher()",
        i: "with_capacity_and_hasher(${1:cap}, ${0:hasher})",
        d: "HashMap::with_capacity_and_hasher(usize, S)",
        doc: "Creates with capacity and a custom hasher.",
      },
    ],
    HashSet: [
      {
        l: "new()",
        i: "new()",
        d: "HashSet::new()",
        doc: "Creates an empty `HashSet`.",
      },
      {
        l: "with_capacity()",
        i: "with_capacity(${0:cap})",
        d: "HashSet::with_capacity(usize)",
        doc: "Creates a `HashSet` with at least the specified capacity.",
      },
      {
        l: "with_hasher()",
        i: "with_hasher(${0:hasher})",
        d: "HashSet::with_hasher(S)",
        doc: "Creates an empty `HashSet` using the given hash builder.",
      },
    ],
    BTreeMap: [
      {
        l: "new()",
        i: "new()",
        d: "BTreeMap::new()",
        doc: "Creates an empty `BTreeMap`.",
      },
    ],
    BTreeSet: [
      {
        l: "new()",
        i: "new()",
        d: "BTreeSet::new()",
        doc: "Creates an empty `BTreeSet`.",
      },
    ],
    VecDeque: [
      {
        l: "new()",
        i: "new()",
        d: "VecDeque::new()",
        doc: "Creates an empty `VecDeque`.",
      },
      {
        l: "with_capacity()",
        i: "with_capacity(${0:cap})",
        d: "VecDeque::with_capacity(usize)",
        doc: "Creates a `VecDeque` with capacity.",
      },
    ],
    LinkedList: [
      {
        l: "new()",
        i: "new()",
        d: "LinkedList::new()",
        doc: "Creates an empty `LinkedList`.",
      },
    ],
    BinaryHeap: [
      {
        l: "new()",
        i: "new()",
        d: "BinaryHeap::new()",
        doc: "Creates an empty `BinaryHeap`.",
      },
      {
        l: "with_capacity()",
        i: "with_capacity(${0:cap})",
        d: "BinaryHeap::with_capacity(usize)",
        doc: "Creates a `BinaryHeap` with capacity.",
      },
    ],
    Box: [
      {
        l: "new()",
        i: "new(${0:val})",
        d: "Box::new(T) -> Box<T>",
        doc: "Allocates memory on the heap and places `val` into it.",
      },
      {
        l: "pin()",
        i: "pin(${0:val})",
        d: "Box::pin(T) -> Pin<Box<T>>",
        doc: "Constructs a new `Pin<Box<T>>`.",
      },
      {
        l: "from_raw()",
        i: "from_raw(${0:ptr})",
        d: "Box::from_raw(*mut T) -> Box<T>",
        doc: "Constructs a Box from a raw pointer. Unsafe.",
      },
      {
        l: "into_raw()",
        i: "into_raw(${0:b})",
        d: "Box::into_raw(Box<T>) -> *mut T",
        doc: "Consumes the Box, returning a raw pointer.",
      },
      {
        l: "leak()",
        i: "leak(${0:b})",
        d: "Box::leak(Box<T>) -> &'static mut T",
        doc: "Consumes and leaks the Box, returning a mutable reference.",
      },
    ],
    Rc: [
      {
        l: "new()",
        i: "new(${0:val})",
        d: "Rc::new(T) -> Rc<T>",
        doc: "Constructs a new `Rc<T>`.",
      },
      {
        l: "clone()",
        i: "clone(&${0:this})",
        d: "Rc::clone(&Rc<T>) -> Rc<T>",
        doc: "Creates another pointer to the same allocation.",
      },
      {
        l: "strong_count()",
        i: "strong_count(&${0:this})",
        d: "Rc::strong_count(&Rc<T>) -> usize",
        doc: "Gets the number of strong pointers.",
      },
      {
        l: "weak_count()",
        i: "weak_count(&${0:this})",
        d: "Rc::weak_count(&Rc<T>) -> usize",
        doc: "Gets the number of weak pointers.",
      },
      {
        l: "try_unwrap()",
        i: "try_unwrap(${0:this})",
        d: "Rc::try_unwrap(Rc<T>) -> Result<T, Rc<T>>",
        doc: "Returns the inner value if the `Rc` has exactly one strong reference.",
      },
      {
        l: "downgrade()",
        i: "downgrade(&${0:this})",
        d: "Rc::downgrade(&Rc<T>) -> Weak<T>",
        doc: "Creates a Weak pointer.",
      },
    ],
    Arc: [
      {
        l: "new()",
        i: "new(${0:val})",
        d: "Arc::new(T) -> Arc<T>",
        doc: "Constructs a new `Arc<T>`.",
      },
      {
        l: "clone()",
        i: "clone(&${0:this})",
        d: "Arc::clone(&Arc<T>) -> Arc<T>",
        doc: "Creates another pointer to the same allocation.",
      },
      {
        l: "strong_count()",
        i: "strong_count(&${0:this})",
        d: "Arc::strong_count(&Arc<T>) -> usize",
        doc: "Gets the number of strong pointers.",
      },
      {
        l: "weak_count()",
        i: "weak_count(&${0:this})",
        d: "Arc::weak_count(&Arc<T>) -> usize",
        doc: "Gets the number of weak pointers.",
      },
      {
        l: "try_unwrap()",
        i: "try_unwrap(${0:this})",
        d: "Arc::try_unwrap(Arc<T>) -> Result<T, Arc<T>>",
        doc: "Returns the inner value if the `Arc` has exactly one strong reference.",
      },
      {
        l: "downgrade()",
        i: "downgrade(&${0:this})",
        d: "Arc::downgrade(&Arc<T>) -> Weak<T>",
        doc: "Creates a Weak pointer.",
      },
    ],
    Mutex: [
      {
        l: "new()",
        i: "new(${0:val})",
        d: "Mutex::new(T) -> Mutex<T>",
        doc: "Creates a new mutex in an unlocked state.",
      },
    ],
    RwLock: [
      {
        l: "new()",
        i: "new(${0:val})",
        d: "RwLock::new(T) -> RwLock<T>",
        doc: "Creates a new RwLock.",
      },
    ],
    Cell: [
      {
        l: "new()",
        i: "new(${0:val})",
        d: "Cell::new(T) -> Cell<T>",
        doc: "Creates a new `Cell` containing the given value.",
      },
    ],
    RefCell: [
      {
        l: "new()",
        i: "new(${0:val})",
        d: "RefCell::new(T) -> RefCell<T>",
        doc: "Creates a new `RefCell` containing value.",
      },
    ],
    File: [
      {
        l: "open()",
        i: "open(${0:path})",
        d: "File::open(P) -> io::Result<File>",
        doc: "Opens a file in read-only mode.",
      },
      {
        l: "create()",
        i: "create(${0:path})",
        d: "File::create(P) -> io::Result<File>",
        doc: "Opens a file in write-only mode, creating or truncating it.",
      },
      {
        l: "options()",
        i: "options()",
        d: "File::options() -> OpenOptions",
        doc: "Returns a new `OpenOptions` for configuring file open behavior.",
      },
    ],
    OpenOptions: [
      {
        l: "new()",
        i: "new()",
        d: "OpenOptions::new()",
        doc: "Creates a blank set of options.",
      },
    ],
    PathBuf: [
      {
        l: "new()",
        i: "new()",
        d: "PathBuf::new()",
        doc: "Creates a new empty `PathBuf`.",
      },
      {
        l: "from()",
        i: "from(${0:s})",
        d: "PathBuf::from(S)",
        doc: "Creates a `PathBuf` from a string.",
      },
      {
        l: "with_capacity()",
        i: "with_capacity(${0:cap})",
        d: "PathBuf::with_capacity(usize)",
        doc: "Creates a new `PathBuf` with capacity.",
      },
    ],
    Path: [
      {
        l: "new()",
        i: "new(${0:s})",
        d: "Path::new(&OsStr) -> &Path",
        doc: "Wraps a string slice as a `Path` slice.",
      },
    ],
    Duration: [
      {
        l: "new()",
        i: "new(${1:secs}, ${0:nanos})",
        d: "Duration::new(u64, u32)",
        doc: "Creates a new `Duration` from seconds and nanoseconds.",
      },
      {
        l: "from_secs()",
        i: "from_secs(${0:secs})",
        d: "Duration::from_secs(u64)",
        doc: "Creates a `Duration` from whole seconds.",
      },
      {
        l: "from_millis()",
        i: "from_millis(${0:millis})",
        d: "Duration::from_millis(u64)",
        doc: "Creates a `Duration` from milliseconds.",
      },
      {
        l: "from_micros()",
        i: "from_micros(${0:micros})",
        d: "Duration::from_micros(u64)",
        doc: "Creates a `Duration` from microseconds.",
      },
      {
        l: "from_nanos()",
        i: "from_nanos(${0:nanos})",
        d: "Duration::from_nanos(u64)",
        doc: "Creates a `Duration` from nanoseconds.",
      },
      {
        l: "from_secs_f64()",
        i: "from_secs_f64(${0:secs})",
        d: "Duration::from_secs_f64(f64)",
        doc: "Creates a `Duration` from a floating-point number of seconds.",
      },
      {
        l: "from_secs_f32()",
        i: "from_secs_f32(${0:secs})",
        d: "Duration::from_secs_f32(f32)",
        doc: "Creates a `Duration` from f32 seconds.",
      },
      {
        l: "ZERO",
        i: "ZERO",
        d: "Duration::ZERO",
        doc: "A duration of zero time.",
      },
      { l: "MAX", i: "MAX", d: "Duration::MAX", doc: "The maximum duration." },
      { l: "SECOND", i: "SECOND", d: "Duration::SECOND", doc: "One second." },
    ],
    Instant: [
      {
        l: "now()",
        i: "now()",
        d: "Instant::now()",
        doc: 'Returns an instant corresponding to "now".',
      },
      {
        l: "elapsed()",
        i: "elapsed()",
        d: "Instant::elapsed(&self) -> Duration",
        doc: "Returns the elapsed time since this instant.",
      },
    ],
    SystemTime: [
      {
        l: "now()",
        i: "now()",
        d: "SystemTime::now()",
        doc: 'Returns the system time corresponding to "now".',
      },
      {
        l: "UNIX_EPOCH",
        i: "UNIX_EPOCH",
        d: "SystemTime::UNIX_EPOCH",
        doc: "An anchor in time for the Unix epoch (1970-01-01).",
      },
    ],
    Command: [
      {
        l: "new()",
        i: "new(${0:program})",
        d: "Command::new(S)",
        doc: "Constructs a new `Command` for launching the given program.",
      },
    ],
    Ordering: [
      {
        l: "Less",
        i: "Less",
        d: "Ordering::Less",
        doc: "An ordering where a compared value is less than another.",
      },
      {
        l: "Equal",
        i: "Equal",
        d: "Ordering::Equal",
        doc: "An ordering where a compared value is equal to another.",
      },
      {
        l: "Greater",
        i: "Greater",
        d: "Ordering::Greater",
        doc: "An ordering where a compared value is greater than another.",
      },
    ],
    // Numeric types share these associated items
    i8: [
      {
        l: "MIN",
        i: "MIN",
        d: "i8::MIN = -128",
        doc: "The smallest value for this integer type.",
      },
      {
        l: "MAX",
        i: "MAX",
        d: "i8::MAX = 127",
        doc: "The largest value for this integer type.",
      },
      {
        l: "BITS",
        i: "BITS",
        d: "i8::BITS = 8",
        doc: "The size of this integer type in bits.",
      },
      {
        l: "from_str_radix()",
        i: "from_str_radix(${1:src}, ${0:radix})",
        d: "from_str_radix(&str, u32) -> Result<Self, ParseIntError>",
        doc: "Converts a string slice in a given base to an integer.",
      },
      {
        l: "checked_add()",
        i: "checked_add(${0:rhs})",
        d: "checked_add(Self) -> Option<Self>",
        doc: "Checked integer addition. Returns None on overflow.",
      },
      {
        l: "checked_sub()",
        i: "checked_sub(${0:rhs})",
        d: "checked_sub(Self) -> Option<Self>",
        doc: "Checked integer subtraction. Returns None on overflow.",
      },
      {
        l: "checked_mul()",
        i: "checked_mul(${0:rhs})",
        d: "checked_mul(Self) -> Option<Self>",
        doc: "Checked integer multiplication. Returns None on overflow.",
      },
      {
        l: "checked_div()",
        i: "checked_div(${0:rhs})",
        d: "checked_div(Self) -> Option<Self>",
        doc: "Checked integer division. Returns None on division by zero.",
      },
      {
        l: "saturating_add()",
        i: "saturating_add(${0:rhs})",
        d: "saturating_add(Self) -> Self",
        doc: "Saturating integer addition. Clamps on overflow.",
      },
      {
        l: "saturating_sub()",
        i: "saturating_sub(${0:rhs})",
        d: "saturating_sub(Self) -> Self",
        doc: "Saturating integer subtraction.",
      },
      {
        l: "wrapping_add()",
        i: "wrapping_add(${0:rhs})",
        d: "wrapping_add(Self) -> Self",
        doc: "Wrapping integer addition.",
      },
      {
        l: "wrapping_sub()",
        i: "wrapping_sub(${0:rhs})",
        d: "wrapping_sub(Self) -> Self",
        doc: "Wrapping integer subtraction.",
      },
      {
        l: "pow()",
        i: "pow(${0:exp})",
        d: "pow(u32) -> Self",
        doc: "Raises self to the power of exp.",
      },
      {
        l: "abs()",
        i: "abs()",
        d: "abs() -> Self",
        doc: "Computes the absolute value of self.",
      },
      {
        l: "signum()",
        i: "signum()",
        d: "signum() -> Self",
        doc: "Returns -1, 0, or 1 depending on sign.",
      },
      {
        l: "count_ones()",
        i: "count_ones()",
        d: "count_ones() -> u32",
        doc: "Returns the number of ones in the binary representation.",
      },
      {
        l: "count_zeros()",
        i: "count_zeros()",
        d: "count_zeros() -> u32",
        doc: "Returns the number of zeros in the binary representation.",
      },
      {
        l: "leading_zeros()",
        i: "leading_zeros()",
        d: "leading_zeros() -> u32",
        doc: "Returns the number of leading zeros.",
      },
      {
        l: "trailing_zeros()",
        i: "trailing_zeros()",
        d: "trailing_zeros() -> u32",
        doc: "Returns the number of trailing zeros.",
      },
      {
        l: "to_be_bytes()",
        i: "to_be_bytes()",
        d: "to_be_bytes() -> [u8; N]",
        doc: "Returns the memory representation as a byte array in big-endian order.",
      },
      {
        l: "to_le_bytes()",
        i: "to_le_bytes()",
        d: "to_le_bytes() -> [u8; N]",
        doc: "Returns the memory representation as a byte array in little-endian order.",
      },
      {
        l: "to_ne_bytes()",
        i: "to_ne_bytes()",
        d: "to_ne_bytes() -> [u8; N]",
        doc: "Returns the memory representation as a byte array in native byte order.",
      },
      {
        l: "from_be_bytes()",
        i: "from_be_bytes(${0:bytes})",
        d: "from_be_bytes([u8; N]) -> Self",
        doc: "Creates an integer from its big-endian byte representation.",
      },
      {
        l: "from_le_bytes()",
        i: "from_le_bytes(${0:bytes})",
        d: "from_le_bytes([u8; N]) -> Self",
        doc: "Creates an integer from its little-endian byte representation.",
      },
      {
        l: "swap_bytes()",
        i: "swap_bytes()",
        d: "swap_bytes() -> Self",
        doc: "Reverses the byte order.",
      },
      {
        l: "reverse_bits()",
        i: "reverse_bits()",
        d: "reverse_bits() -> Self",
        doc: "Reverses the bit pattern.",
      },
      {
        l: "rotate_left()",
        i: "rotate_left(${0:n})",
        d: "rotate_left(u32) -> Self",
        doc: "Shifts bits to the left by n, wrapping around.",
      },
      {
        l: "rotate_right()",
        i: "rotate_right(${0:n})",
        d: "rotate_right(u32) -> Self",
        doc: "Shifts bits to the right by n, wrapping around.",
      },
    ],
    f64: [
      {
        l: "INFINITY",
        i: "INFINITY",
        d: "f64::INFINITY",
        doc: "Positive infinity.",
      },
      {
        l: "NEG_INFINITY",
        i: "NEG_INFINITY",
        d: "f64::NEG_INFINITY",
        doc: "Negative infinity.",
      },
      { l: "NAN", i: "NAN", d: "f64::NAN", doc: "Not a Number (NaN)." },
      {
        l: "EPSILON",
        i: "EPSILON",
        d: "f64::EPSILON",
        doc: "Machine epsilon for f64.",
      },
      { l: "MIN", i: "MIN", d: "f64::MIN", doc: "Smallest finite f64 value." },
      { l: "MAX", i: "MAX", d: "f64::MAX", doc: "Largest finite f64 value." },
      {
        l: "MIN_POSITIVE",
        i: "MIN_POSITIVE",
        d: "f64::MIN_POSITIVE",
        doc: "Smallest positive normal f64 value.",
      },
      {
        l: "floor()",
        i: "floor()",
        d: "floor() -> f64",
        doc: "Returns the largest integer ≤ self.",
      },
      {
        l: "ceil()",
        i: "ceil()",
        d: "ceil() -> f64",
        doc: "Returns the smallest integer ≥ self.",
      },
      {
        l: "round()",
        i: "round()",
        d: "round() -> f64",
        doc: "Returns the nearest integer, rounding half-way from 0.0.",
      },
      {
        l: "trunc()",
        i: "trunc()",
        d: "trunc() -> f64",
        doc: "Returns the integer part.",
      },
      {
        l: "fract()",
        i: "fract()",
        d: "fract() -> f64",
        doc: "Returns the fractional part.",
      },
      {
        l: "abs()",
        i: "abs()",
        d: "abs() -> f64",
        doc: "Computes the absolute value.",
      },
      {
        l: "signum()",
        i: "signum()",
        d: "signum() -> f64",
        doc: "Returns a value representing the sign.",
      },
      {
        l: "sqrt()",
        i: "sqrt()",
        d: "sqrt() -> f64",
        doc: "Returns the square root.",
      },
      {
        l: "cbrt()",
        i: "cbrt()",
        d: "cbrt() -> f64",
        doc: "Returns the cube root.",
      },
      {
        l: "powf()",
        i: "powf(${0:n})",
        d: "powf(f64) -> f64",
        doc: "Raises to a floating point power.",
      },
      {
        l: "powi()",
        i: "powi(${0:n})",
        d: "powi(i32) -> f64",
        doc: "Raises to an integer power.",
      },
      { l: "exp()", i: "exp()", d: "exp() -> f64", doc: "Returns e^self." },
      { l: "exp2()", i: "exp2()", d: "exp2() -> f64", doc: "Returns 2^self." },
      {
        l: "ln()",
        i: "ln()",
        d: "ln() -> f64",
        doc: "Returns the natural logarithm.",
      },
      {
        l: "log2()",
        i: "log2()",
        d: "log2() -> f64",
        doc: "Returns the base-2 logarithm.",
      },
      {
        l: "log10()",
        i: "log10()",
        d: "log10() -> f64",
        doc: "Returns the base-10 logarithm.",
      },
      {
        l: "log()",
        i: "log(${0:base})",
        d: "log(f64) -> f64",
        doc: "Returns the logarithm with a given base.",
      },
      { l: "sin()", i: "sin()", d: "sin() -> f64", doc: "Computes the sine." },
      {
        l: "cos()",
        i: "cos()",
        d: "cos() -> f64",
        doc: "Computes the cosine.",
      },
      {
        l: "tan()",
        i: "tan()",
        d: "tan() -> f64",
        doc: "Computes the tangent.",
      },
      {
        l: "asin()",
        i: "asin()",
        d: "asin() -> f64",
        doc: "Computes the arcsine.",
      },
      {
        l: "acos()",
        i: "acos()",
        d: "acos() -> f64",
        doc: "Computes the arccosine.",
      },
      {
        l: "atan()",
        i: "atan()",
        d: "atan() -> f64",
        doc: "Computes the arctangent.",
      },
      {
        l: "atan2()",
        i: "atan2(${0:other})",
        d: "atan2(f64) -> f64",
        doc: "Four-quadrant arctangent (atan(self/other)).",
      },
      {
        l: "hypot()",
        i: "hypot(${0:other})",
        d: "hypot(f64) -> f64",
        doc: "Computes the hypotenuse: sqrt(self² + other²).",
      },
      {
        l: "sin_cos()",
        i: "sin_cos()",
        d: "sin_cos() -> (f64, f64)",
        doc: "Simultaneously computes sine and cosine.",
      },
      {
        l: "to_radians()",
        i: "to_radians()",
        d: "to_radians() -> f64",
        doc: "Converts degrees to radians.",
      },
      {
        l: "to_degrees()",
        i: "to_degrees()",
        d: "to_degrees() -> f64",
        doc: "Converts radians to degrees.",
      },
      {
        l: "is_nan()",
        i: "is_nan()",
        d: "is_nan() -> bool",
        doc: "Returns true if this value is NaN.",
      },
      {
        l: "is_infinite()",
        i: "is_infinite()",
        d: "is_infinite() -> bool",
        doc: "Returns true if this value is positive or negative infinity.",
      },
      {
        l: "is_finite()",
        i: "is_finite()",
        d: "is_finite() -> bool",
        doc: "Returns true if this number is neither infinite nor NaN.",
      },
      {
        l: "is_sign_positive()",
        i: "is_sign_positive()",
        d: "is_sign_positive() -> bool",
        doc: "Returns true if self has a positive sign.",
      },
      {
        l: "is_sign_negative()",
        i: "is_sign_negative()",
        d: "is_sign_negative() -> bool",
        doc: "Returns true if self has a negative sign.",
      },
      {
        l: "max()",
        i: "max(${0:other})",
        d: "max(f64) -> f64",
        doc: "Returns the maximum of self and other.",
      },
      {
        l: "min()",
        i: "min(${0:other})",
        d: "min(f64) -> f64",
        doc: "Returns the minimum of self and other.",
      },
      {
        l: "clamp()",
        i: "clamp(${1:min}, ${0:max})",
        d: "clamp(f64, f64) -> f64",
        doc: "Restricts to a certain interval.",
      },
      {
        l: "to_bits()",
        i: "to_bits()",
        d: "to_bits() -> u64",
        doc: "Raw transmutation to u64.",
      },
      {
        l: "from_bits()",
        i: "from_bits(${0:v})",
        d: "from_bits(u64) -> f64",
        doc: "Raw transmutation from u64.",
      },
    ],
  };

  // Alias integer types to share the same associated functions
  const intTypes = [
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
  ];
  for (const t of intTypes) {
    TYPE_ASSOC_FNS[t] = TYPE_ASSOC_FNS["i8"].map((e) => ({
      ...e,
      d: e.d.replace(/i8::/g, `${t}::`),
    }));
  }
  // f32 shares f64 entries
  TYPE_ASSOC_FNS["f32"] = TYPE_ASSOC_FNS["f64"].map((e) => ({
    ...e,
    l: e.l,
    i: e.i,
    d: e.d.replace(/f64/g, "f32"),
  }));

  // ── 5b. Module path completions (for std:: paths) ──
  type ModuleEntry = {
    l: string;
    i: string;
    k: "mod" | "type" | "fn" | "const" | "trait" | "macro";
    d: string;
  };

  const MODULE_ITEMS: Record<string, ModuleEntry[]> = {
    std: [
      {
        l: "collections",
        i: "collections",
        k: "mod",
        d: "Collection types: HashMap, Vec, etc.",
      },
      { l: "io", i: "io", k: "mod", d: "I/O traits and types." },
      { l: "fs", i: "fs", k: "mod", d: "Filesystem operations." },
      {
        l: "path",
        i: "path",
        k: "mod",
        d: "Cross-platform path manipulation.",
      },
      {
        l: "env",
        i: "env",
        k: "mod",
        d: "Inspection of the process environment.",
      },
      { l: "process", i: "process", k: "mod", d: "Process management." },
      { l: "thread", i: "thread", k: "mod", d: "Native OS threads." },
      { l: "sync", i: "sync", k: "mod", d: "Synchronization primitives." },
      { l: "time", i: "time", k: "mod", d: "Temporal quantification." },
      { l: "fmt", i: "fmt", k: "mod", d: "Formatting and display utilities." },
      { l: "mem", i: "mem", k: "mod", d: "Memory manipulation utilities." },
      { l: "ptr", i: "ptr", k: "mod", d: "Raw pointer operations." },
      { l: "cmp", i: "cmp", k: "mod", d: "Ordering and comparison utilities." },
      { l: "ops", i: "ops", k: "mod", d: "Overloadable operators." },
      {
        l: "convert",
        i: "convert",
        k: "mod",
        d: "Conversion traits: From, Into, etc.",
      },
      { l: "iter", i: "iter", k: "mod", d: "Iterator composability." },
      { l: "str", i: "str", k: "mod", d: "String slice utilities." },
      { l: "string", i: "string", k: "mod", d: "The String type." },
      { l: "vec", i: "vec", k: "mod", d: "The Vec type." },
      { l: "boxed", i: "boxed", k: "mod", d: "The Box type." },
      {
        l: "rc",
        i: "rc",
        k: "mod",
        d: "Single-threaded reference counting: Rc.",
      },
      {
        l: "cell",
        i: "cell",
        k: "mod",
        d: "Interior mutability: Cell, RefCell.",
      },
      {
        l: "marker",
        i: "marker",
        k: "mod",
        d: "Marker traits: Copy, Send, Sync, Sized.",
      },
      { l: "net", i: "net", k: "mod", d: "Networking primitives: TCP, UDP." },
      { l: "error", i: "error", k: "mod", d: "The Error trait." },
      { l: "num", i: "num", k: "mod", d: "Numeric traits and functions." },
      { l: "any", i: "any", k: "mod", d: "Runtime type reflection." },
      { l: "hash", i: "hash", k: "mod", d: "Hashing traits." },
      { l: "result", i: "result", k: "mod", d: "Error handling with Result." },
      { l: "option", i: "option", k: "mod", d: "Optional values: Option<T>." },
      { l: "clone", i: "clone", k: "mod", d: "The Clone trait." },
      { l: "default", i: "default", k: "mod", d: "The Default trait." },
      { l: "borrow", i: "borrow", k: "mod", d: "Borrowing traits." },
      { l: "panic", i: "panic", k: "mod", d: "Panic support." },
      { l: "hint", i: "hint", k: "mod", d: "Compiler hints." },
    ],
    "std::collections": [
      { l: "HashMap", i: "HashMap", k: "type", d: "A hash map." },
      { l: "HashSet", i: "HashSet", k: "type", d: "A hash set." },
      {
        l: "BTreeMap",
        i: "BTreeMap",
        k: "type",
        d: "An ordered map based on a B-Tree.",
      },
      {
        l: "BTreeSet",
        i: "BTreeSet",
        k: "type",
        d: "An ordered set based on a B-Tree.",
      },
      { l: "VecDeque", i: "VecDeque", k: "type", d: "A double-ended queue." },
      {
        l: "LinkedList",
        i: "LinkedList",
        k: "type",
        d: "A doubly-linked list.",
      },
      {
        l: "BinaryHeap",
        i: "BinaryHeap",
        k: "type",
        d: "A priority queue (max-heap).",
      },
      {
        l: "hash_map",
        i: "hash_map",
        k: "mod",
        d: "HashMap and related types.",
      },
      {
        l: "hash_set",
        i: "hash_set",
        k: "mod",
        d: "HashSet and related types.",
      },
      {
        l: "btree_map",
        i: "btree_map",
        k: "mod",
        d: "BTreeMap and related types.",
      },
      {
        l: "btree_set",
        i: "btree_set",
        k: "mod",
        d: "BTreeSet and related types.",
      },
    ],
    "std::io": [
      {
        l: "stdin",
        i: "stdin()",
        k: "fn",
        d: "Returns a handle to the standard input.",
      },
      {
        l: "stdout",
        i: "stdout()",
        k: "fn",
        d: "Returns a handle to the standard output.",
      },
      {
        l: "stderr",
        i: "stderr()",
        k: "fn",
        d: "Returns a handle to the standard error.",
      },
      { l: "Read", i: "Read", k: "trait", d: "Trait for reading bytes." },
      { l: "Write", i: "Write", k: "trait", d: "Trait for writing bytes." },
      {
        l: "BufRead",
        i: "BufRead",
        k: "trait",
        d: "Trait for buffered reading.",
      },
      {
        l: "BufReader",
        i: "BufReader",
        k: "type",
        d: "Wraps a reader with buffering.",
      },
      {
        l: "BufWriter",
        i: "BufWriter",
        k: "type",
        d: "Wraps a writer with buffering.",
      },
      {
        l: "Cursor",
        i: "Cursor",
        k: "type",
        d: "A cursor over in-memory bytes.",
      },
      { l: "Error", i: "Error", k: "type", d: "The I/O error type." },
      {
        l: "ErrorKind",
        i: "ErrorKind",
        k: "type",
        d: "A list of general categories of I/O error.",
      },
      {
        l: "Result",
        i: "Result",
        k: "type",
        d: "io::Result<T> = Result<T, io::Error>.",
      },
      {
        l: "Seek",
        i: "Seek",
        k: "trait",
        d: "Trait for seeking within a stream.",
      },
      {
        l: "SeekFrom",
        i: "SeekFrom",
        k: "type",
        d: "Enumeration of possible ways to seek.",
      },
      {
        l: "copy",
        i: "copy(${1:reader}, ${0:writer})",
        k: "fn",
        d: "Copies the entire contents of a reader into a writer.",
      },
      {
        l: "empty",
        i: "empty()",
        k: "fn",
        d: "Constructs a reader that reads nothing.",
      },
      {
        l: "repeat",
        i: "repeat(${0:byte})",
        k: "fn",
        d: "Creates a reader that infinitely repeats one byte.",
      },
      {
        l: "sink",
        i: "sink()",
        k: "fn",
        d: "Creates a writer that consumes and discards all data.",
      },
    ],
    "std::fs": [
      {
        l: "read_to_string",
        i: "read_to_string(${0:path})",
        k: "fn",
        d: "Read the entire contents of a file into a String.",
      },
      {
        l: "write",
        i: "write(${1:path}, ${0:contents})",
        k: "fn",
        d: "Write a slice of bytes as the entire contents of a file.",
      },
      {
        l: "read",
        i: "read(${0:path})",
        k: "fn",
        d: "Read the entire contents of a file into a Vec<u8>.",
      },
      {
        l: "create_dir",
        i: "create_dir(${0:path})",
        k: "fn",
        d: "Creates a new directory.",
      },
      {
        l: "create_dir_all",
        i: "create_dir_all(${0:path})",
        k: "fn",
        d: "Recursively creates a directory and all its parents.",
      },
      {
        l: "remove_file",
        i: "remove_file(${0:path})",
        k: "fn",
        d: "Removes a file.",
      },
      {
        l: "remove_dir",
        i: "remove_dir(${0:path})",
        k: "fn",
        d: "Removes an empty directory.",
      },
      {
        l: "remove_dir_all",
        i: "remove_dir_all(${0:path})",
        k: "fn",
        d: "Removes a directory and all its contents.",
      },
      {
        l: "rename",
        i: "rename(${1:from}, ${0:to})",
        k: "fn",
        d: "Renames a file or directory.",
      },
      {
        l: "copy",
        i: "copy(${1:from}, ${0:to})",
        k: "fn",
        d: "Copies the contents of one file to another.",
      },
      {
        l: "metadata",
        i: "metadata(${0:path})",
        k: "fn",
        d: "Returns metadata for a path.",
      },
      {
        l: "read_dir",
        i: "read_dir(${0:path})",
        k: "fn",
        d: "Returns an iterator over directory entries.",
      },
      {
        l: "canonicalize",
        i: "canonicalize(${0:path})",
        k: "fn",
        d: "Returns the canonical path.",
      },
      {
        l: "symlink_metadata",
        i: "symlink_metadata(${0:path})",
        k: "fn",
        d: "Returns metadata without following symlinks.",
      },
      {
        l: "hard_link",
        i: "hard_link(${1:original}, ${0:link})",
        k: "fn",
        d: "Creates a hard link.",
      },
      { l: "File", i: "File", k: "type", d: "A reference to an open file." },
      {
        l: "OpenOptions",
        i: "OpenOptions",
        k: "type",
        d: "Options for opening a file.",
      },
      {
        l: "DirEntry",
        i: "DirEntry",
        k: "type",
        d: "Entry inside a directory.",
      },
      { l: "Metadata", i: "Metadata", k: "type", d: "Metadata for a file." },
      { l: "Permissions", i: "Permissions", k: "type", d: "File permissions." },
      {
        l: "FileType",
        i: "FileType",
        k: "type",
        d: "A file's type (file, dir, symlink).",
      },
    ],
    "std::path": [
      { l: "Path", i: "Path", k: "type", d: "A slice of a path." },
      { l: "PathBuf", i: "PathBuf", k: "type", d: "An owned, mutable path." },
      {
        l: "MAIN_SEPARATOR",
        i: "MAIN_SEPARATOR",
        k: "const",
        d: "The primary separator for the current platform.",
      },
    ],
    "std::env": [
      {
        l: "args",
        i: "args()",
        k: "fn",
        d: "Returns the arguments the program was started with.",
      },
      {
        l: "args_os",
        i: "args_os()",
        k: "fn",
        d: "Returns arguments as OsString.",
      },
      {
        l: "var",
        i: "var(${0:key})",
        k: "fn",
        d: "Fetches the environment variable `key`.",
      },
      {
        l: "var_os",
        i: "var_os(${0:key})",
        k: "fn",
        d: "Fetches the environment variable as OsString.",
      },
      {
        l: "vars",
        i: "vars()",
        k: "fn",
        d: "Returns an iterator of (key, value) env variable pairs.",
      },
      {
        l: "set_var",
        i: "set_var(${1:key}, ${0:value})",
        k: "fn",
        d: "Sets an environment variable.",
      },
      {
        l: "remove_var",
        i: "remove_var(${0:key})",
        k: "fn",
        d: "Removes an environment variable.",
      },
      {
        l: "current_dir",
        i: "current_dir()",
        k: "fn",
        d: "Returns the current working directory.",
      },
      {
        l: "set_current_dir",
        i: "set_current_dir(${0:path})",
        k: "fn",
        d: "Changes the current working directory.",
      },
      {
        l: "current_exe",
        i: "current_exe()",
        k: "fn",
        d: "Returns the path of the current executable.",
      },
      {
        l: "temp_dir",
        i: "temp_dir()",
        k: "fn",
        d: "Returns the path to a temporary directory.",
      },
    ],
    "std::process": [
      {
        l: "exit",
        i: "exit(${0:code})",
        k: "fn",
        d: "Terminates the current process with the specified exit code.",
      },
      {
        l: "abort",
        i: "abort()",
        k: "fn",
        d: "Terminates the process abnormally.",
      },
      {
        l: "id",
        i: "id()",
        k: "fn",
        d: "Returns the OS-assigned process identifier (PID).",
      },
      { l: "Command", i: "Command", k: "type", d: "A process builder." },
      {
        l: "Output",
        i: "Output",
        k: "type",
        d: "The output of a finished process.",
      },
      {
        l: "Stdio",
        i: "Stdio",
        k: "type",
        d: "Describes what to do with a standard I/O stream.",
      },
      {
        l: "Child",
        i: "Child",
        k: "type",
        d: "Representation of a running child process.",
      },
      {
        l: "ExitStatus",
        i: "ExitStatus",
        k: "type",
        d: "The status of a terminated process.",
      },
      {
        l: "ExitCode",
        i: "ExitCode",
        k: "type",
        d: "Process termination code.",
      },
    ],
    "std::thread": [
      {
        l: "spawn",
        i: "spawn(|| {\n\t$0\n})",
        k: "fn",
        d: "Spawns a new thread.",
      },
      {
        l: "sleep",
        i: "sleep(${0:dur})",
        k: "fn",
        d: "Puts the current thread to sleep for the specified duration.",
      },
      {
        l: "current",
        i: "current()",
        k: "fn",
        d: "Gets a handle to the calling thread.",
      },
      {
        l: "park",
        i: "park()",
        k: "fn",
        d: "Blocks the current thread until unparked.",
      },
      {
        l: "yield_now",
        i: "yield_now()",
        k: "fn",
        d: "Cooperatively gives up a timeslice to the OS scheduler.",
      },
      {
        l: "panicking",
        i: "panicking()",
        k: "fn",
        d: "Determines whether the current thread is unwinding due to panic.",
      },
      {
        l: "available_parallelism",
        i: "available_parallelism()",
        k: "fn",
        d: "Returns an estimate of the default amount of parallelism.",
      },
      {
        l: "Builder",
        i: "Builder",
        k: "type",
        d: "Thread factory, for configuring new threads.",
      },
      {
        l: "JoinHandle",
        i: "JoinHandle",
        k: "type",
        d: "An owned handle to a thread.",
      },
      { l: "Thread", i: "Thread", k: "type", d: "A handle to a thread." },
      {
        l: "ThreadId",
        i: "ThreadId",
        k: "type",
        d: "A unique identifier for a running thread.",
      },
    ],
    "std::sync": [
      {
        l: "Arc",
        i: "Arc",
        k: "type",
        d: "Atomically reference-counted shared pointer.",
      },
      { l: "Mutex", i: "Mutex", k: "type", d: "A mutual exclusion primitive." },
      { l: "RwLock", i: "RwLock", k: "type", d: "A reader-writer lock." },
      {
        l: "Barrier",
        i: "Barrier",
        k: "type",
        d: "A synchronization barrier.",
      },
      { l: "Condvar", i: "Condvar", k: "type", d: "A condition variable." },
      {
        l: "Once",
        i: "Once",
        k: "type",
        d: "A synchronization primitive for one-time initialization.",
      },
      {
        l: "OnceLock",
        i: "OnceLock",
        k: "type",
        d: "A cell which can be written to only once.",
      },
      {
        l: "Weak",
        i: "Weak",
        k: "type",
        d: "A weak reference to an Arc-managed allocation.",
      },
      {
        l: "mpsc",
        i: "mpsc",
        k: "mod",
        d: "Multi-producer, single-consumer FIFO queue.",
      },
      { l: "atomic", i: "atomic", k: "mod", d: "Atomic types." },
    ],
    "std::sync::mpsc": [
      {
        l: "channel",
        i: "channel()",
        k: "fn",
        d: "Creates a new asynchronous channel, returning (Sender, Receiver).",
      },
      {
        l: "sync_channel",
        i: "sync_channel(${0:bound})",
        k: "fn",
        d: "Creates a synchronous, bounded channel.",
      },
      {
        l: "Sender",
        i: "Sender",
        k: "type",
        d: "The sending side of a channel.",
      },
      {
        l: "Receiver",
        i: "Receiver",
        k: "type",
        d: "The receiving side of a channel.",
      },
      {
        l: "SyncSender",
        i: "SyncSender",
        k: "type",
        d: "The sending side of a synchronous channel.",
      },
      {
        l: "RecvError",
        i: "RecvError",
        k: "type",
        d: "Error returned from Receiver::recv().",
      },
    ],
    "std::time": [
      { l: "Duration", i: "Duration", k: "type", d: "A span of time." },
      {
        l: "Instant",
        i: "Instant",
        k: "type",
        d: "A monotonically non-decreasing clock measurement.",
      },
      {
        l: "SystemTime",
        i: "SystemTime",
        k: "type",
        d: "A measurement of the system clock.",
      },
      {
        l: "UNIX_EPOCH",
        i: "UNIX_EPOCH",
        k: "const",
        d: "An anchor in time for the Unix epoch (1970-01-01).",
      },
    ],
    "std::fmt": [
      {
        l: "Display",
        i: "Display",
        k: "trait",
        d: "User-facing output format ({}).",
      },
      {
        l: "Debug",
        i: "Debug",
        k: "trait",
        d: "Programmer-facing output format ({:?}).",
      },
      {
        l: "Formatter",
        i: "Formatter",
        k: "type",
        d: "Configuration for formatting.",
      },
      {
        l: "Result",
        i: "Result",
        k: "type",
        d: "fmt::Result = Result<(), fmt::Error>.",
      },
      {
        l: "Error",
        i: "Error",
        k: "type",
        d: "The error type returned by formatter methods.",
      },
      {
        l: "Write",
        i: "Write",
        k: "trait",
        d: "Trait for writing formatted strings.",
      },
      {
        l: "Arguments",
        i: "Arguments",
        k: "type",
        d: "Represents a safely precompiled version of a format string.",
      },
      {
        l: "format",
        i: "format(${0:args})",
        k: "fn",
        d: "The format function takes an Arguments struct and returns String.",
      },
    ],
    "std::mem": [
      {
        l: "size_of",
        i: "size_of::<${0:T}>()",
        k: "fn",
        d: "Returns the size of a type in bytes.",
      },
      {
        l: "size_of_val",
        i: "size_of_val(${0:val})",
        k: "fn",
        d: "Returns the size of the pointed-to value in bytes.",
      },
      {
        l: "align_of",
        i: "align_of::<${0:T}>()",
        k: "fn",
        d: "Returns the ABI-required minimum alignment of a type.",
      },
      {
        l: "swap",
        i: "swap(${1:x}, ${0:y})",
        k: "fn",
        d: "Swaps the values at two mutable locations.",
      },
      {
        l: "replace",
        i: "replace(${1:dest}, ${0:src})",
        k: "fn",
        d: "Moves src into dest, returning the old dest value.",
      },
      {
        l: "take",
        i: "take(${0:dest})",
        k: "fn",
        d: "Replaces dest with Default::default(), returning the old value.",
      },
      { l: "drop", i: "drop(${0:val})", k: "fn", d: "Disposes of a value." },
      {
        l: "forget",
        i: "forget(${0:val})",
        k: "fn",
        d: "Takes ownership and forgets about the value without running its destructor.",
      },
      {
        l: "transmute",
        i: "transmute::<${1:Src}, ${0:Dst}>(${2:val})",
        k: "fn",
        d: "Reinterprets the bits of one type as another. Unsafe.",
      },
      {
        l: "zeroed",
        i: "zeroed::<${0:T}>()",
        k: "fn",
        d: "Creates a value whose bytes are all zero. Unsafe.",
      },
      {
        l: "MaybeUninit",
        i: "MaybeUninit",
        k: "type",
        d: "A wrapper type to construct uninitialized instances of T.",
      },
      {
        l: "ManuallyDrop",
        i: "ManuallyDrop",
        k: "type",
        d: "A wrapper preventing drop from being run.",
      },
      {
        l: "needs_drop",
        i: "needs_drop::<${0:T}>()",
        k: "fn",
        d: "Returns true if dropping T matters.",
      },
      {
        l: "discriminant",
        i: "discriminant(${0:v})",
        k: "fn",
        d: "Returns a value uniquely identifying the enum variant.",
      },
    ],
    "std::ptr": [
      {
        l: "null",
        i: "null::<${0:T}>()",
        k: "fn",
        d: "Creates a null raw pointer.",
      },
      {
        l: "null_mut",
        i: "null_mut::<${0:T}>()",
        k: "fn",
        d: "Creates a null mutable raw pointer.",
      },
      {
        l: "read",
        i: "read(${0:src})",
        k: "fn",
        d: "Reads the value from src. Unsafe.",
      },
      {
        l: "write",
        i: "write(${1:dst}, ${0:src})",
        k: "fn",
        d: "Overwrites a memory location. Unsafe.",
      },
      {
        l: "copy",
        i: "copy(${1:src}, ${2:dst}, ${0:count})",
        k: "fn",
        d: "Copies count * size_of::<T>() bytes. Unsafe.",
      },
      {
        l: "copy_nonoverlapping",
        i: "copy_nonoverlapping(${1:src}, ${2:dst}, ${0:count})",
        k: "fn",
        d: "Copies memory (non-overlapping). Unsafe.",
      },
      {
        l: "drop_in_place",
        i: "drop_in_place(${0:ptr})",
        k: "fn",
        d: "Executes the destructor of the pointed-to value. Unsafe.",
      },
      {
        l: "swap",
        i: "swap(${1:x}, ${0:y})",
        k: "fn",
        d: "Swaps the values at two mutable locations. Unsafe.",
      },
      {
        l: "eq",
        i: "eq(${1:a}, ${0:b})",
        k: "fn",
        d: "Compares raw pointers for equality.",
      },
      {
        l: "addr_of",
        i: "addr_of!(${0:place})",
        k: "macro",
        d: "Creates a const raw pointer to a place without creating an intermediate reference.",
      },
      {
        l: "addr_of_mut",
        i: "addr_of_mut!(${0:place})",
        k: "macro",
        d: "Creates a mut raw pointer to a place without creating an intermediate reference.",
      },
    ],
    "std::cmp": [
      {
        l: "min",
        i: "min(${1:v1}, ${0:v2})",
        k: "fn",
        d: "Returns the minimum of two values.",
      },
      {
        l: "max",
        i: "max(${1:v1}, ${0:v2})",
        k: "fn",
        d: "Returns the maximum of two values.",
      },
      {
        l: "min_by",
        i: "min_by(${1:v1}, ${2:v2}, ${0:compare})",
        k: "fn",
        d: "Returns the minimum using a comparator function.",
      },
      {
        l: "max_by",
        i: "max_by(${1:v1}, ${2:v2}, ${0:compare})",
        k: "fn",
        d: "Returns the maximum using a comparator function.",
      },
      {
        l: "min_by_key",
        i: "min_by_key(${1:v1}, ${2:v2}, ${0:f})",
        k: "fn",
        d: "Returns the minimum using a key extraction function.",
      },
      {
        l: "max_by_key",
        i: "max_by_key(${1:v1}, ${2:v2}, ${0:f})",
        k: "fn",
        d: "Returns the maximum using a key extraction function.",
      },
      {
        l: "Ordering",
        i: "Ordering",
        k: "type",
        d: "An enum of comparison results: Less, Equal, Greater.",
      },
      {
        l: "PartialEq",
        i: "PartialEq",
        k: "trait",
        d: "Trait for partial equality comparisons.",
      },
      { l: "Eq", i: "Eq", k: "trait", d: "Trait for total equality." },
      {
        l: "PartialOrd",
        i: "PartialOrd",
        k: "trait",
        d: "Trait for partial ordering.",
      },
      { l: "Ord", i: "Ord", k: "trait", d: "Trait for total ordering." },
      {
        l: "Reverse",
        i: "Reverse",
        k: "type",
        d: "A helper struct for reverse ordering.",
      },
    ],
    "std::iter": [
      {
        l: "Iterator",
        i: "Iterator",
        k: "trait",
        d: "The core iterator trait.",
      },
      {
        l: "IntoIterator",
        i: "IntoIterator",
        k: "trait",
        d: "Conversion into an Iterator.",
      },
      {
        l: "FromIterator",
        i: "FromIterator",
        k: "trait",
        d: "Conversion from an Iterator.",
      },
      {
        l: "once",
        i: "once(${0:val})",
        k: "fn",
        d: "Creates an iterator that yields an element exactly once.",
      },
      {
        l: "once_with",
        i: "once_with(|| ${0:val})",
        k: "fn",
        d: "Creates an iterator that lazily generates a value exactly once.",
      },
      {
        l: "empty",
        i: "empty::<${0:T}>()",
        k: "fn",
        d: "Creates an iterator that yields nothing.",
      },
      {
        l: "repeat",
        i: "repeat(${0:val})",
        k: "fn",
        d: "Creates an iterator that endlessly repeats a value.",
      },
      {
        l: "repeat_with",
        i: "repeat_with(|| ${0:val})",
        k: "fn",
        d: "Creates an iterator that endlessly repeats a value from a closure.",
      },
      {
        l: "from_fn",
        i: "from_fn(|| ${0:expr})",
        k: "fn",
        d: "Creates an iterator where each call to next() calls a closure.",
      },
      {
        l: "successors",
        i: "successors(${1:first}, |${2:prev}| ${0:expr})",
        k: "fn",
        d: "Creates an iterator from a seed value and a successor function.",
      },
      {
        l: "zip",
        i: "zip(${1:a}, ${0:b})",
        k: "fn",
        d: "Converts the arguments to iterators and zips them.",
      },
    ],
    "std::convert": [
      {
        l: "From",
        i: "From",
        k: "trait",
        d: "Simple value-to-value conversion.",
      },
      {
        l: "Into",
        i: "Into",
        k: "trait",
        d: "Value-to-value conversion consuming the input.",
      },
      { l: "TryFrom", i: "TryFrom", k: "trait", d: "Fallible conversion." },
      { l: "TryInto", i: "TryInto", k: "trait", d: "Fallible conversion." },
      {
        l: "AsRef",
        i: "AsRef",
        k: "trait",
        d: "Cheap reference-to-reference conversion.",
      },
      {
        l: "AsMut",
        i: "AsMut",
        k: "trait",
        d: "Cheap mutable reference-to-reference conversion.",
      },
      {
        l: "identity",
        i: "identity(${0:x})",
        k: "fn",
        d: "The identity function: returns its argument.",
      },
      {
        l: "Infallible",
        i: "Infallible",
        k: "type",
        d: "The error type for infallible conversions.",
      },
    ],
    "std::net": [
      {
        l: "TcpListener",
        i: "TcpListener",
        k: "type",
        d: "A TCP socket server, listening for connections.",
      },
      {
        l: "TcpStream",
        i: "TcpStream",
        k: "type",
        d: "A TCP stream between a local and a remote socket.",
      },
      { l: "UdpSocket", i: "UdpSocket", k: "type", d: "A UDP socket." },
      {
        l: "IpAddr",
        i: "IpAddr",
        k: "type",
        d: "An IP address, either IPv4 or IPv6.",
      },
      { l: "Ipv4Addr", i: "Ipv4Addr", k: "type", d: "An IPv4 address." },
      { l: "Ipv6Addr", i: "Ipv6Addr", k: "type", d: "An IPv6 address." },
      {
        l: "SocketAddr",
        i: "SocketAddr",
        k: "type",
        d: "An internet socket address (IP + port).",
      },
      {
        l: "SocketAddrV4",
        i: "SocketAddrV4",
        k: "type",
        d: "An IPv4 socket address.",
      },
      {
        l: "SocketAddrV6",
        i: "SocketAddrV6",
        k: "type",
        d: "An IPv6 socket address.",
      },
      {
        l: "ToSocketAddrs",
        i: "ToSocketAddrs",
        k: "trait",
        d: "Converts to socket addresses.",
      },
      {
        l: "Shutdown",
        i: "Shutdown",
        k: "type",
        d: "How to shut down a stream.",
      },
    ],
    "std::ops": [
      {
        l: "Range",
        i: "Range",
        k: "type",
        d: "A (half-open) range bounded inclusively below and exclusively above.",
      },
      {
        l: "RangeInclusive",
        i: "RangeInclusive",
        k: "type",
        d: "A range bounded inclusively below and above.",
      },
      {
        l: "RangeFrom",
        i: "RangeFrom",
        k: "type",
        d: "A range only bounded inclusively below.",
      },
      {
        l: "RangeTo",
        i: "RangeTo",
        k: "type",
        d: "A range only bounded exclusively above.",
      },
      {
        l: "RangeFull",
        i: "RangeFull",
        k: "type",
        d: "An unbounded range (..).",
      },
      {
        l: "Deref",
        i: "Deref",
        k: "trait",
        d: "Used for immutable dereferencing operations.",
      },
      {
        l: "DerefMut",
        i: "DerefMut",
        k: "trait",
        d: "Used for mutable dereferencing operations.",
      },
      { l: "Index", i: "Index", k: "trait", d: "The indexing operator []." },
      {
        l: "IndexMut",
        i: "IndexMut",
        k: "trait",
        d: "The mutable indexing operator [].",
      },
      {
        l: "Fn",
        i: "Fn",
        k: "trait",
        d: "Closures that can be called by shared reference.",
      },
      {
        l: "FnMut",
        i: "FnMut",
        k: "trait",
        d: "Closures that can be called by mutable reference.",
      },
      {
        l: "FnOnce",
        i: "FnOnce",
        k: "trait",
        d: "Closures that can be called once.",
      },
      { l: "Add", i: "Add", k: "trait", d: "The addition operator +." },
      { l: "Sub", i: "Sub", k: "trait", d: "The subtraction operator -." },
      { l: "Mul", i: "Mul", k: "trait", d: "The multiplication operator *." },
      { l: "Div", i: "Div", k: "trait", d: "The division operator /." },
      { l: "Rem", i: "Rem", k: "trait", d: "The remainder operator %." },
      { l: "Neg", i: "Neg", k: "trait", d: "The unary negation operator -." },
      {
        l: "Not",
        i: "Not",
        k: "trait",
        d: "The unary logical negation operator !.",
      },
      {
        l: "Drop",
        i: "Drop",
        k: "trait",
        d: "Custom code run when a value is dropped.",
      },
    ],
    "std::marker": [
      { l: "Copy", i: "Copy", k: "trait", d: "Types that can be bit-copied." },
      {
        l: "Send",
        i: "Send",
        k: "trait",
        d: "Types that can be transferred across thread boundaries.",
      },
      {
        l: "Sync",
        i: "Sync",
        k: "trait",
        d: "Types safe to share between threads.",
      },
      {
        l: "Sized",
        i: "Sized",
        k: "trait",
        d: "Types with a known size at compile time.",
      },
      {
        l: "Unpin",
        i: "Unpin",
        k: "trait",
        d: "Types safe to move after being pinned.",
      },
      {
        l: "PhantomData",
        i: "PhantomData",
        k: "type",
        d: "Zero-sized phantom type marker.",
      },
      {
        l: "PhantomPinned",
        i: "PhantomPinned",
        k: "type",
        d: "A marker type not implementing Unpin.",
      },
    ],
    "std::sync::atomic": [
      {
        l: "AtomicBool",
        i: "AtomicBool",
        k: "type",
        d: "A boolean type which can be safely shared between threads.",
      },
      { l: "AtomicI8", i: "AtomicI8", k: "type", d: "An atomic i8." },
      { l: "AtomicI16", i: "AtomicI16", k: "type", d: "An atomic i16." },
      { l: "AtomicI32", i: "AtomicI32", k: "type", d: "An atomic i32." },
      { l: "AtomicI64", i: "AtomicI64", k: "type", d: "An atomic i64." },
      { l: "AtomicU8", i: "AtomicU8", k: "type", d: "An atomic u8." },
      { l: "AtomicU16", i: "AtomicU16", k: "type", d: "An atomic u16." },
      { l: "AtomicU32", i: "AtomicU32", k: "type", d: "An atomic u32." },
      { l: "AtomicU64", i: "AtomicU64", k: "type", d: "An atomic u64." },
      { l: "AtomicUsize", i: "AtomicUsize", k: "type", d: "An atomic usize." },
      { l: "AtomicIsize", i: "AtomicIsize", k: "type", d: "An atomic isize." },
      {
        l: "AtomicPtr",
        i: "AtomicPtr",
        k: "type",
        d: "An atomic raw pointer.",
      },
      { l: "Ordering", i: "Ordering", k: "type", d: "Atomic memory ordering." },
      { l: "fence", i: "fence(${0:order})", k: "fn", d: "An atomic fence." },
      {
        l: "compiler_fence",
        i: "compiler_fence(${0:order})",
        k: "fn",
        d: "A compiler-only memory fence.",
      },
    ],
    "std::hash": [
      { l: "Hash", i: "Hash", k: "trait", d: "A hashable type." },
      { l: "Hasher", i: "Hasher", k: "trait", d: "A trait for hashing." },
      {
        l: "BuildHasher",
        i: "BuildHasher",
        k: "trait",
        d: "A trait for creating Hasher instances.",
      },
      {
        l: "RandomState",
        i: "RandomState",
        k: "type",
        d: "The default state for HashMap/HashSet.",
      },
    ],
    "std::error": [
      {
        l: "Error",
        i: "Error",
        k: "trait",
        d: "The base trait for all error types.",
      },
    ],
    "std::f64::consts": [
      { l: "PI", i: "PI", k: "const", d: "Archimedes' constant (π)." },
      { l: "E", i: "E", k: "const", d: "Euler's number (e)." },
      {
        l: "TAU",
        i: "TAU",
        k: "const",
        d: "The full circle constant (τ = 2π).",
      },
      { l: "FRAC_PI_2", i: "FRAC_PI_2", k: "const", d: "π/2" },
      { l: "FRAC_PI_3", i: "FRAC_PI_3", k: "const", d: "π/3" },
      { l: "FRAC_PI_4", i: "FRAC_PI_4", k: "const", d: "π/4" },
      { l: "FRAC_PI_6", i: "FRAC_PI_6", k: "const", d: "π/6" },
      { l: "FRAC_PI_8", i: "FRAC_PI_8", k: "const", d: "π/8" },
      { l: "FRAC_1_PI", i: "FRAC_1_PI", k: "const", d: "1/π" },
      { l: "FRAC_2_PI", i: "FRAC_2_PI", k: "const", d: "2/π" },
      { l: "FRAC_1_SQRT_2", i: "FRAC_1_SQRT_2", k: "const", d: "1/√2" },
      { l: "SQRT_2", i: "SQRT_2", k: "const", d: "√2" },
      { l: "LN_2", i: "LN_2", k: "const", d: "ln(2)" },
      { l: "LN_10", i: "LN_10", k: "const", d: "ln(10)" },
      { l: "LOG2_E", i: "LOG2_E", k: "const", d: "log₂(e)" },
      { l: "LOG10_E", i: "LOG10_E", k: "const", d: "log₁₀(e)" },
      { l: "LOG2_10", i: "LOG2_10", k: "const", d: "log₂(10)" },
      { l: "LOG10_2", i: "LOG10_2", k: "const", d: "log₁₀(2)" },
    ],
  };
  // Alias f32 consts
  MODULE_ITEMS["std::f32::consts"] = MODULE_ITEMS["std::f64::consts"];

  // ── 5c. Type-specific method completions (for . completions) ──
  type MethodEntry = { l: string; i: string; d: string };

  const TYPE_METHODS: Record<string, MethodEntry[]> = {
    // ── String & str ──
    String: [
      { l: ".len()", i: "len()", d: "Returns the length in bytes." },
      {
        l: ".is_empty()",
        i: "is_empty()",
        d: "Returns true if the string is empty.",
      },
      {
        l: ".capacity()",
        i: "capacity()",
        d: "Returns the current capacity in bytes.",
      },
      {
        l: ".push_str()",
        i: "push_str(${0:s})",
        d: "Appends a string slice to the end.",
      },
      { l: ".push()", i: "push(${0:ch})", d: "Appends a char to the end." },
      {
        l: ".reserve()",
        i: "reserve(${0:additional})",
        d: "Reserves capacity for at least `additional` bytes.",
      },
      {
        l: ".shrink_to_fit()",
        i: "shrink_to_fit()",
        d: "Shrinks the capacity to match the length.",
      },
      {
        l: ".shrink_to()",
        i: "shrink_to(${0:min_capacity})",
        d: "Shrinks the capacity to the given bound.",
      },
      {
        l: ".truncate()",
        i: "truncate(${0:new_len})",
        d: "Shortens the string to the specified length.",
      },
      {
        l: ".clear()",
        i: "clear()",
        d: "Truncates the string, removing all contents.",
      },
      {
        l: ".insert()",
        i: "insert(${1:idx}, ${0:ch})",
        d: "Inserts a character at a byte position.",
      },
      {
        l: ".insert_str()",
        i: "insert_str(${1:idx}, ${0:string})",
        d: "Inserts a string slice at a byte position.",
      },
      {
        l: ".remove()",
        i: "remove(${0:idx})",
        d: "Removes and returns the char at a byte position.",
      },
      {
        l: ".retain()",
        i: "retain(|${1:c}| ${0:predicate})",
        d: "Retains only the characters matching a predicate.",
      },
      {
        l: ".as_str()",
        i: "as_str()",
        d: "Extracts a string slice containing the entire String.",
      },
      {
        l: ".as_bytes()",
        i: "as_bytes()",
        d: "Returns a byte slice of this String's contents.",
      },
      {
        l: ".as_ptr()",
        i: "as_ptr()",
        d: "Returns a raw pointer to the string's buffer.",
      },
      {
        l: ".into_bytes()",
        i: "into_bytes()",
        d: "Converts the String into a byte vector.",
      },
      {
        l: ".into_boxed_str()",
        i: "into_boxed_str()",
        d: "Converts into a Box<str>.",
      },
      {
        l: ".contains()",
        i: "contains(${0:pat})",
        d: "Returns true if the string contains a pattern.",
      },
      {
        l: ".starts_with()",
        i: "starts_with(${0:pat})",
        d: "Returns true if the string starts with a pattern.",
      },
      {
        l: ".ends_with()",
        i: "ends_with(${0:pat})",
        d: "Returns true if the string ends with a pattern.",
      },
      {
        l: ".find()",
        i: "find(${0:pat})",
        d: "Returns the byte index of the first match.",
      },
      {
        l: ".rfind()",
        i: "rfind(${0:pat})",
        d: "Returns the byte index of the last match.",
      },
      {
        l: ".replace()",
        i: "replace(${1:from}, ${0:to})",
        d: "Replaces all matches of a pattern with another string.",
      },
      {
        l: ".replacen()",
        i: "replacen(${1:pat}, ${2:to}, ${0:count})",
        d: "Replaces first N matches.",
      },
      {
        l: ".trim()",
        i: "trim()",
        d: "Returns a string slice with leading and trailing whitespace removed.",
      },
      {
        l: ".trim_start()",
        i: "trim_start()",
        d: "Returns a string slice with leading whitespace removed.",
      },
      {
        l: ".trim_end()",
        i: "trim_end()",
        d: "Returns a string slice with trailing whitespace removed.",
      },
      {
        l: ".trim_matches()",
        i: "trim_matches(${0:pat})",
        d: "Trims characters matching a pattern from both ends.",
      },
      {
        l: ".trim_start_matches()",
        i: "trim_start_matches(${0:pat})",
        d: "Trims characters matching a pattern from the start.",
      },
      {
        l: ".trim_end_matches()",
        i: "trim_end_matches(${0:pat})",
        d: "Trims characters matching a pattern from the end.",
      },
      {
        l: ".strip_prefix()",
        i: "strip_prefix(${0:prefix})",
        d: "Returns the string with the prefix removed, if present.",
      },
      {
        l: ".strip_suffix()",
        i: "strip_suffix(${0:suffix})",
        d: "Returns the string with the suffix removed, if present.",
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
      {
        l: ".to_ascii_uppercase()",
        i: "to_ascii_uppercase()",
        d: "Returns ASCII uppercase copy.",
      },
      {
        l: ".to_ascii_lowercase()",
        i: "to_ascii_lowercase()",
        d: "Returns ASCII lowercase copy.",
      },
      {
        l: ".eq_ignore_ascii_case()",
        i: "eq_ignore_ascii_case(${0:other})",
        d: "Checks ASCII case-insensitive equality.",
      },
      {
        l: ".is_ascii()",
        i: "is_ascii()",
        d: "Returns true if all characters are ASCII.",
      },
      {
        l: ".repeat()",
        i: "repeat(${0:n})",
        d: "Creates a new String by repeating the string n times.",
      },
      {
        l: ".split()",
        i: "split(${0:pat})",
        d: "Splits the string by a pattern.",
      },
      {
        l: ".splitn()",
        i: "splitn(${1:n}, ${0:pat})",
        d: "Splits into at most n substrings.",
      },
      {
        l: ".rsplit()",
        i: "rsplit(${0:pat})",
        d: "Splits by a pattern, starting from the right.",
      },
      {
        l: ".rsplitn()",
        i: "rsplitn(${1:n}, ${0:pat})",
        d: "Splits into at most n substrings from the right.",
      },
      {
        l: ".split_whitespace()",
        i: "split_whitespace()",
        d: "Splits by whitespace.",
      },
      {
        l: ".split_ascii_whitespace()",
        i: "split_ascii_whitespace()",
        d: "Splits by ASCII whitespace.",
      },
      {
        l: ".split_at()",
        i: "split_at(${0:mid})",
        d: "Divides the string into two at an index.",
      },
      {
        l: ".split_once()",
        i: "split_once(${0:delimiter})",
        d: "Splits the string on the first occurrence of the delimiter.",
      },
      {
        l: ".rsplit_once()",
        i: "rsplit_once(${0:delimiter})",
        d: "Splits on the last occurrence of the delimiter.",
      },
      { l: ".chars()", i: "chars()", d: "Returns an iterator over chars." },
      {
        l: ".char_indices()",
        i: "char_indices()",
        d: "Returns an iterator over chars and their byte indices.",
      },
      { l: ".bytes()", i: "bytes()", d: "Returns an iterator over bytes." },
      { l: ".lines()", i: "lines()", d: "Returns an iterator over the lines." },
      {
        l: ".encode_utf16()",
        i: "encode_utf16()",
        d: "Returns an iterator of u16 (UTF-16 encoded).",
      },
      {
        l: ".parse()",
        i: "parse::<${0:Type}>()",
        d: "Parses the string into another type.",
      },
      { l: ".to_string()", i: "to_string()", d: "Converts to a String." },
      {
        l: ".to_owned()",
        i: "to_owned()",
        d: "Creates an owned String from a &str.",
      },
      { l: ".as_ref()", i: "as_ref()", d: "Borrows as a reference." },
      { l: ".clone()", i: "clone()", d: "Creates a clone of this String." },
      {
        l: ".drain()",
        i: "drain(${0:range})",
        d: "Removes the specified range and returns a draining iterator.",
      },
      {
        l: ".split_off()",
        i: "split_off(${0:at})",
        d: "Splits the String into two at the given byte index.",
      },
      {
        l: ".join()",
        i: 'join("${0:sep}")',
        d: "Joins a slice of strings with a separator.",
      },
      {
        l: ".is_char_boundary()",
        i: "is_char_boundary(${0:index})",
        d: "Checks if a byte index is a UTF-8 char boundary.",
      },
    ],
    // ── Vec & slice ──
    Vec: [
      { l: ".len()", i: "len()", d: "Returns the number of elements." },
      {
        l: ".is_empty()",
        i: "is_empty()",
        d: "Returns true if the vector is empty.",
      },
      { l: ".capacity()", i: "capacity()", d: "Returns the current capacity." },
      {
        l: ".push()",
        i: "push(${0:value})",
        d: "Appends an element to the back.",
      },
      {
        l: ".pop()",
        i: "pop()",
        d: "Removes and returns the last element, or None.",
      },
      {
        l: ".insert()",
        i: "insert(${1:index}, ${0:element})",
        d: "Inserts an element at a position.",
      },
      {
        l: ".remove()",
        i: "remove(${0:index})",
        d: "Removes and returns the element at a position.",
      },
      {
        l: ".swap_remove()",
        i: "swap_remove(${0:index})",
        d: "Removes an element, replacing it with the last element (O(1)).",
      },
      { l: ".clear()", i: "clear()", d: "Clears the vector." },
      {
        l: ".truncate()",
        i: "truncate(${0:len})",
        d: "Shortens the vector to the given length.",
      },
      {
        l: ".reserve()",
        i: "reserve(${0:additional})",
        d: "Reserves capacity for at least additional more elements.",
      },
      {
        l: ".shrink_to_fit()",
        i: "shrink_to_fit()",
        d: "Shrinks the capacity as much as possible.",
      },
      {
        l: ".shrink_to()",
        i: "shrink_to(${0:min_capacity})",
        d: "Shrinks capacity to the lower bound.",
      },
      {
        l: ".resize()",
        i: "resize(${1:new_len}, ${0:value})",
        d: "Resizes the Vec, filling new slots with value.",
      },
      {
        l: ".resize_with()",
        i: "resize_with(${1:new_len}, || ${0:expr})",
        d: "Resizes using a closure to produce new values.",
      },
      {
        l: ".extend_from_slice()",
        i: "extend_from_slice(${0:other})",
        d: "Clones and appends all elements from a slice.",
      },
      {
        l: ".extend_from_within()",
        i: "extend_from_within(${0:range})",
        d: "Copies elements from within the Vec and appends them.",
      },
      {
        l: ".append()",
        i: "append(&mut ${0:other})",
        d: "Moves all elements from other into self.",
      },
      {
        l: ".drain()",
        i: "drain(${0:range})",
        d: "Removes the specified range and returns a draining iterator.",
      },
      {
        l: ".retain()",
        i: "retain(|${1:x}| ${0:predicate})",
        d: "Retains only elements matching a predicate.",
      },
      {
        l: ".retain_mut()",
        i: "retain_mut(|${1:x}| ${0:predicate})",
        d: "Retains only elements matching a predicate, giving mutable access.",
      },
      { l: ".dedup()", i: "dedup()", d: "Removes consecutive duplicates." },
      {
        l: ".dedup_by()",
        i: "dedup_by(|${1:a}, ${2:b}| ${0:expr})",
        d: "Removes consecutive duplicates using a comparator.",
      },
      {
        l: ".dedup_by_key()",
        i: "dedup_by_key(|${1:x}| ${0:key})",
        d: "Removes consecutive duplicates by key.",
      },
      {
        l: ".split_off()",
        i: "split_off(${0:at})",
        d: "Splits the Vec into two at the given index.",
      },
      {
        l: ".first()",
        i: "first()",
        d: "Returns a reference to the first element, or None.",
      },
      {
        l: ".first_mut()",
        i: "first_mut()",
        d: "Returns a mutable reference to the first element.",
      },
      {
        l: ".last()",
        i: "last()",
        d: "Returns a reference to the last element, or None.",
      },
      {
        l: ".last_mut()",
        i: "last_mut()",
        d: "Returns a mutable reference to the last element.",
      },
      {
        l: ".get()",
        i: "get(${0:index})",
        d: "Returns a reference to an element, or None if out of bounds.",
      },
      {
        l: ".get_mut()",
        i: "get_mut(${0:index})",
        d: "Returns a mutable reference to an element.",
      },
      {
        l: ".contains()",
        i: "contains(&${0:value})",
        d: "Returns true if the slice contains the element.",
      },
      {
        l: ".binary_search()",
        i: "binary_search(&${0:value})",
        d: "Binary searches a sorted slice for a value.",
      },
      {
        l: ".binary_search_by()",
        i: "binary_search_by(|${1:x}| ${0:x.cmp(&target)})",
        d: "Binary searches with a comparator.",
      },
      {
        l: ".binary_search_by_key()",
        i: "binary_search_by_key(&${1:key}, |${2:x}| ${0:x.field})",
        d: "Binary searches with a key extraction function.",
      },
      { l: ".sort()", i: "sort()", d: "Sorts the slice (stable, O(n log n))." },
      {
        l: ".sort_by()",
        i: "sort_by(|${1:a}, ${2:b}| ${0:a.cmp(b)})",
        d: "Sorts with a comparator function.",
      },
      {
        l: ".sort_by_key()",
        i: "sort_by_key(|${1:x}| ${0:x.field})",
        d: "Sorts by a key extraction function.",
      },
      {
        l: ".sort_unstable()",
        i: "sort_unstable()",
        d: "Sorts the slice (unstable, may be faster).",
      },
      {
        l: ".sort_unstable_by()",
        i: "sort_unstable_by(|${1:a}, ${2:b}| ${0:a.cmp(b)})",
        d: "Unstable sort with a comparator.",
      },
      { l: ".reverse()", i: "reverse()", d: "Reverses the order of elements." },
      { l: ".iter()", i: "iter()", d: "Returns an iterator over the slice." },
      { l: ".iter_mut()", i: "iter_mut()", d: "Returns a mutable iterator." },
      {
        l: ".into_iter()",
        i: "into_iter()",
        d: "Consumes the Vec into an iterator.",
      },
      {
        l: ".windows()",
        i: "windows(${0:size})",
        d: "Returns overlapping windows of a given size.",
      },
      {
        l: ".chunks()",
        i: "chunks(${0:chunk_size})",
        d: "Returns non-overlapping chunks.",
      },
      {
        l: ".chunks_exact()",
        i: "chunks_exact(${0:chunk_size})",
        d: "Returns exact-size non-overlapping chunks.",
      },
      {
        l: ".rchunks()",
        i: "rchunks(${0:chunk_size})",
        d: "Returns non-overlapping chunks from the end.",
      },
      {
        l: ".split()",
        i: "split(|${1:x}| ${0:predicate})",
        d: "Returns an iterator of subslices separated by matching elements.",
      },
      {
        l: ".split_at()",
        i: "split_at(${0:mid})",
        d: "Divides the slice into two at an index.",
      },
      {
        l: ".split_at_mut()",
        i: "split_at_mut(${0:mid})",
        d: "Divides the mutable slice into two.",
      },
      {
        l: ".split_first()",
        i: "split_first()",
        d: "Returns the first element and the rest of the slice.",
      },
      {
        l: ".split_last()",
        i: "split_last()",
        d: "Returns the last element and the rest of the slice.",
      },
      {
        l: ".swap()",
        i: "swap(${1:a}, ${0:b})",
        d: "Swaps two elements in the slice.",
      },
      {
        l: ".rotate_left()",
        i: "rotate_left(${0:mid})",
        d: "Rotates the slice left by mid positions.",
      },
      {
        l: ".rotate_right()",
        i: "rotate_right(${0:k})",
        d: "Rotates the slice right by k positions.",
      },
      {
        l: ".fill()",
        i: "fill(${0:value})",
        d: "Fills the slice with a given value.",
      },
      {
        l: ".fill_with()",
        i: "fill_with(|| ${0:expr})",
        d: "Fills the slice with values produced by a closure.",
      },
      {
        l: ".copy_from_slice()",
        i: "copy_from_slice(${0:src})",
        d: "Copies elements from a src slice (same length).",
      },
      {
        l: ".clone_from_slice()",
        i: "clone_from_slice(${0:src})",
        d: "Clones elements from a src slice.",
      },
      {
        l: ".concat()",
        i: "concat()",
        d: "Flattens a slice of T into a single value.",
      },
      {
        l: ".join()",
        i: "join(${0:sep})",
        d: "Flattens a slice with a separator.",
      },
      {
        l: ".as_slice()",
        i: "as_slice()",
        d: "Extracts a slice containing the entire vector.",
      },
      {
        l: ".as_mut_slice()",
        i: "as_mut_slice()",
        d: "Extracts a mutable slice.",
      },
      {
        l: ".as_ptr()",
        i: "as_ptr()",
        d: "Returns a raw pointer to the slice's buffer.",
      },
      {
        l: ".into_boxed_slice()",
        i: "into_boxed_slice()",
        d: "Converts the vector into a Box<[T]>.",
      },
      { l: ".clone()", i: "clone()", d: "Creates a clone of this Vec." },
      { l: ".to_vec()", i: "to_vec()", d: "Copies the slice into a new Vec." },
      {
        l: ".starts_with()",
        i: "starts_with(${0:needle})",
        d: "Returns true if the slice starts with needle.",
      },
      {
        l: ".ends_with()",
        i: "ends_with(${0:needle})",
        d: "Returns true if the slice ends with needle.",
      },
      {
        l: ".flatten()",
        i: "flatten()",
        d: "Flattens a slice of slices into a single slice.",
      },
      {
        l: ".repeat()",
        i: "repeat(${0:n})",
        d: "Creates a new Vec by repeating the slice n times.",
      },
      {
        l: ".select_nth_unstable()",
        i: "select_nth_unstable(${0:index})",
        d: "Partially sorts so the element at index is at its sorted position.",
      },
    ],
    // ── HashMap ──
    HashMap: [
      {
        l: ".insert()",
        i: "insert(${1:key}, ${0:value})",
        d: "Inserts a key-value pair, returning the old value if key was present.",
      },
      {
        l: ".get()",
        i: "get(${0:key})",
        d: "Returns a reference to the value for a key.",
      },
      {
        l: ".get_mut()",
        i: "get_mut(${0:key})",
        d: "Returns a mutable reference to the value for a key.",
      },
      {
        l: ".get_key_value()",
        i: "get_key_value(${0:key})",
        d: "Returns the key-value pair for a key.",
      },
      {
        l: ".contains_key()",
        i: "contains_key(${0:key})",
        d: "Returns true if the map contains a value for the key.",
      },
      {
        l: ".remove()",
        i: "remove(${0:key})",
        d: "Removes a key, returning its value if it was present.",
      },
      {
        l: ".remove_entry()",
        i: "remove_entry(${0:key})",
        d: "Removes a key, returning the key-value pair.",
      },
      {
        l: ".entry()",
        i: "entry(${0:key})",
        d: "Gets the entry for in-place manipulation.",
      },
      { l: ".len()", i: "len()", d: "Returns the number of elements." },
      {
        l: ".is_empty()",
        i: "is_empty()",
        d: "Returns true if the map is empty.",
      },
      {
        l: ".capacity()",
        i: "capacity()",
        d: "Returns the number of elements the map can hold.",
      },
      { l: ".clear()", i: "clear()", d: "Clears the map." },
      { l: ".keys()", i: "keys()", d: "Returns an iterator over the keys." },
      {
        l: ".values()",
        i: "values()",
        d: "Returns an iterator over the values.",
      },
      {
        l: ".values_mut()",
        i: "values_mut()",
        d: "Returns a mutable iterator over the values.",
      },
      {
        l: ".iter()",
        i: "iter()",
        d: "Returns an iterator over (&key, &value) pairs.",
      },
      {
        l: ".iter_mut()",
        i: "iter_mut()",
        d: "Returns a mutable iterator over (&key, &mut value) pairs.",
      },
      {
        l: ".into_iter()",
        i: "into_iter()",
        d: "Consumes the map into an iterator of (key, value) pairs.",
      },
      {
        l: ".drain()",
        i: "drain()",
        d: "Clears the map, returning all key-value pairs as an iterator.",
      },
      {
        l: ".retain()",
        i: "retain(|${1:k}, ${2:v}| ${0:predicate})",
        d: "Retains only elements matching a predicate.",
      },
      {
        l: ".reserve()",
        i: "reserve(${0:additional})",
        d: "Reserves capacity for at least additional more elements.",
      },
      {
        l: ".shrink_to_fit()",
        i: "shrink_to_fit()",
        d: "Shrinks the capacity as much as possible.",
      },
      {
        l: ".shrink_to()",
        i: "shrink_to(${0:min_capacity})",
        d: "Shrinks capacity to the lower bound.",
      },
      { l: ".clone()", i: "clone()", d: "Creates a clone of this HashMap." },
      {
        l: ".extend()",
        i: "extend(${0:iter})",
        d: "Extends the map with the contents of an iterator.",
      },
    ],
    // ── HashSet ──
    HashSet: [
      {
        l: ".insert()",
        i: "insert(${0:value})",
        d: "Adds a value. Returns true if it was new.",
      },
      {
        l: ".remove()",
        i: "remove(${0:value})",
        d: "Removes a value. Returns true if it was present.",
      },
      {
        l: ".contains()",
        i: "contains(${0:value})",
        d: "Returns true if the set contains a value.",
      },
      {
        l: ".get()",
        i: "get(${0:value})",
        d: "Returns a reference to the value in the set, if any.",
      },
      {
        l: ".take()",
        i: "take(${0:value})",
        d: "Removes and returns the value equal to the given one.",
      },
      {
        l: ".replace()",
        i: "replace(${0:value})",
        d: "Adds a value, replacing and returning the existing value if present.",
      },
      { l: ".len()", i: "len()", d: "Returns the number of elements." },
      {
        l: ".is_empty()",
        i: "is_empty()",
        d: "Returns true if the set is empty.",
      },
      { l: ".clear()", i: "clear()", d: "Clears the set." },
      { l: ".iter()", i: "iter()", d: "Returns an iterator over the values." },
      {
        l: ".into_iter()",
        i: "into_iter()",
        d: "Consumes the set into an iterator.",
      },
      {
        l: ".drain()",
        i: "drain()",
        d: "Clears the set, returning all values as an iterator.",
      },
      {
        l: ".retain()",
        i: "retain(|${1:x}| ${0:predicate})",
        d: "Retains only elements matching a predicate.",
      },
      {
        l: ".union()",
        i: "union(&${0:other})",
        d: "Returns an iterator of values in self or other.",
      },
      {
        l: ".intersection()",
        i: "intersection(&${0:other})",
        d: "Returns an iterator of values in both self and other.",
      },
      {
        l: ".difference()",
        i: "difference(&${0:other})",
        d: "Returns an iterator of values in self but not in other.",
      },
      {
        l: ".symmetric_difference()",
        i: "symmetric_difference(&${0:other})",
        d: "Returns values in self or other but not both.",
      },
      {
        l: ".is_subset()",
        i: "is_subset(&${0:other})",
        d: "Returns true if self is a subset of other.",
      },
      {
        l: ".is_superset()",
        i: "is_superset(&${0:other})",
        d: "Returns true if self is a superset of other.",
      },
      {
        l: ".is_disjoint()",
        i: "is_disjoint(&${0:other})",
        d: "Returns true if self and other have no common elements.",
      },
      { l: ".clone()", i: "clone()", d: "Creates a clone of this HashSet." },
    ],
    // ── BTreeMap ──
    BTreeMap: [
      {
        l: ".insert()",
        i: "insert(${1:key}, ${0:value})",
        d: "Inserts a key-value pair.",
      },
      {
        l: ".get()",
        i: "get(${0:key})",
        d: "Returns a reference to the value for a key.",
      },
      {
        l: ".get_mut()",
        i: "get_mut(${0:key})",
        d: "Returns a mutable reference to the value.",
      },
      {
        l: ".contains_key()",
        i: "contains_key(${0:key})",
        d: "Returns true if the map contains a value for the key.",
      },
      {
        l: ".remove()",
        i: "remove(${0:key})",
        d: "Removes a key, returning its value.",
      },
      {
        l: ".entry()",
        i: "entry(${0:key})",
        d: "Gets the entry for in-place manipulation.",
      },
      { l: ".len()", i: "len()", d: "Returns the number of elements." },
      {
        l: ".is_empty()",
        i: "is_empty()",
        d: "Returns true if the map is empty.",
      },
      { l: ".clear()", i: "clear()", d: "Clears the map." },
      {
        l: ".keys()",
        i: "keys()",
        d: "Returns an iterator over the keys in sorted order.",
      },
      {
        l: ".values()",
        i: "values()",
        d: "Returns an iterator over the values.",
      },
      {
        l: ".iter()",
        i: "iter()",
        d: "Returns an iterator over (&key, &value) pairs.",
      },
      {
        l: ".range()",
        i: "range(${0:range})",
        d: "Returns an iterator over a sub-range of entries.",
      },
      {
        l: ".first_key_value()",
        i: "first_key_value()",
        d: "Returns the first (smallest) key-value pair.",
      },
      {
        l: ".last_key_value()",
        i: "last_key_value()",
        d: "Returns the last (largest) key-value pair.",
      },
      {
        l: ".pop_first()",
        i: "pop_first()",
        d: "Removes and returns the first entry.",
      },
      {
        l: ".pop_last()",
        i: "pop_last()",
        d: "Removes and returns the last entry.",
      },
    ],
    // ── Option ──
    Option: [
      {
        l: ".unwrap()",
        i: "unwrap()",
        d: "Returns the contained value, panicking if None.",
      },
      {
        l: ".unwrap_or()",
        i: "unwrap_or(${0:default})",
        d: "Returns the contained value or a provided default.",
      },
      {
        l: ".unwrap_or_else()",
        i: "unwrap_or_else(|| ${0:default})",
        d: "Returns the contained value or computes from a closure.",
      },
      {
        l: ".unwrap_or_default()",
        i: "unwrap_or_default()",
        d: "Returns the contained value or the default for the type.",
      },
      {
        l: ".expect()",
        i: 'expect("${0:msg}")',
        d: "Returns the contained value, panicking with the given message if None.",
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
      {
        l: ".is_some_and()",
        i: "is_some_and(|${1:x}| ${0:predicate})",
        d: "Returns true if Some and the predicate returns true.",
      },
      {
        l: ".map()",
        i: "map(|${1:x}| ${0:expr})",
        d: "Maps the Some value by applying a function.",
      },
      {
        l: ".map_or()",
        i: "map_or(${1:default}, |${2:x}| ${0:expr})",
        d: "Returns the provided default or applies a function to the value.",
      },
      {
        l: ".map_or_else()",
        i: "map_or_else(|| ${1:default}, |${2:x}| ${0:expr})",
        d: "Computes a default or applies a function.",
      },
      {
        l: ".and()",
        i: "and(${0:optb})",
        d: "Returns None if self is None, otherwise returns optb.",
      },
      {
        l: ".and_then()",
        i: "and_then(|${1:x}| ${0:expr})",
        d: "Returns None if self is None, otherwise calls f.",
      },
      {
        l: ".or()",
        i: "or(${0:optb})",
        d: "Returns self if Some, otherwise returns optb.",
      },
      {
        l: ".or_else()",
        i: "or_else(|| ${0:expr})",
        d: "Returns self if Some, otherwise calls f.",
      },
      {
        l: ".filter()",
        i: "filter(|${1:x}| ${0:predicate})",
        d: "Returns None if None, or if the predicate returns false.",
      },
      {
        l: ".xor()",
        i: "xor(${0:optb})",
        d: "Returns Some if exactly one of self and optb is Some.",
      },
      {
        l: ".zip()",
        i: "zip(${0:other})",
        d: "Zips self with another Option.",
      },
      {
        l: ".unzip()",
        i: "unzip()",
        d: "Unzips an Option of a pair into two Options.",
      },
      {
        l: ".flatten()",
        i: "flatten()",
        d: "Converts from Option<Option<T>> to Option<T>.",
      },
      {
        l: ".ok_or()",
        i: "ok_or(${0:err})",
        d: "Transforms Option into Result, mapping Some(v) to Ok(v) and None to Err(err).",
      },
      {
        l: ".ok_or_else()",
        i: "ok_or_else(|| ${0:err})",
        d: "Transforms Option into Result with a lazily-evaluated error.",
      },
      {
        l: ".transpose()",
        i: "transpose()",
        d: "Transposes an Option of a Result into a Result of an Option.",
      },
      {
        l: ".as_ref()",
        i: "as_ref()",
        d: "Converts from &Option<T> to Option<&T>.",
      },
      {
        l: ".as_mut()",
        i: "as_mut()",
        d: "Converts from &mut Option<T> to Option<&mut T>.",
      },
      {
        l: ".as_deref()",
        i: "as_deref()",
        d: "Converts from Option<T> to Option<&T::Target>.",
      },
      {
        l: ".take()",
        i: "take()",
        d: "Takes the value out, leaving None in its place.",
      },
      {
        l: ".replace()",
        i: "replace(${0:value})",
        d: "Replaces the value, returning the old one.",
      },
      {
        l: ".get_or_insert()",
        i: "get_or_insert(${0:value})",
        d: "Inserts a value if None, returns a mutable reference.",
      },
      {
        l: ".get_or_insert_with()",
        i: "get_or_insert_with(|| ${0:value})",
        d: "Inserts a value computed by a closure if None.",
      },
      {
        l: ".cloned()",
        i: "cloned()",
        d: "Maps Option<&T> to Option<T> by cloning.",
      },
      {
        l: ".copied()",
        i: "copied()",
        d: "Maps Option<&T> to Option<T> by copying.",
      },
      {
        l: ".inspect()",
        i: "inspect(|${1:x}| ${0:expr})",
        d: "Calls a closure if Some, then returns self.",
      },
      {
        l: ".iter()",
        i: "iter()",
        d: "Returns an iterator over the contained value.",
      },
    ],
    // ── Result ──
    Result: [
      {
        l: ".unwrap()",
        i: "unwrap()",
        d: "Returns the Ok value, panicking on Err.",
      },
      {
        l: ".unwrap_or()",
        i: "unwrap_or(${0:default})",
        d: "Returns the Ok value or a provided default.",
      },
      {
        l: ".unwrap_or_else()",
        i: "unwrap_or_else(|${1:e}| ${0:default})",
        d: "Returns the Ok value or computes from a closure.",
      },
      {
        l: ".unwrap_or_default()",
        i: "unwrap_or_default()",
        d: "Returns the Ok value or the type's default.",
      },
      {
        l: ".unwrap_err()",
        i: "unwrap_err()",
        d: "Returns the Err value, panicking on Ok.",
      },
      {
        l: ".expect()",
        i: 'expect("${0:msg}")',
        d: "Returns the Ok value, panicking with the message on Err.",
      },
      {
        l: ".expect_err()",
        i: 'expect_err("${0:msg}")',
        d: "Returns the Err value, panicking with the message on Ok.",
      },
      { l: ".is_ok()", i: "is_ok()", d: "Returns true if the result is Ok." },
      {
        l: ".is_err()",
        i: "is_err()",
        d: "Returns true if the result is Err.",
      },
      {
        l: ".is_ok_and()",
        i: "is_ok_and(|${1:x}| ${0:predicate})",
        d: "Returns true if Ok and the predicate returns true.",
      },
      {
        l: ".is_err_and()",
        i: "is_err_and(|${1:e}| ${0:predicate})",
        d: "Returns true if Err and the predicate returns true.",
      },
      { l: ".ok()", i: "ok()", d: "Converts Result<T, E> to Option<T>." },
      { l: ".err()", i: "err()", d: "Converts Result<T, E> to Option<E>." },
      {
        l: ".map()",
        i: "map(|${1:x}| ${0:expr})",
        d: "Maps the Ok value by applying a function.",
      },
      {
        l: ".map_err()",
        i: "map_err(|${1:e}| ${0:expr})",
        d: "Maps the Err value by applying a function.",
      },
      {
        l: ".map_or()",
        i: "map_or(${1:default}, |${2:x}| ${0:expr})",
        d: "Returns the default or applies a function to the Ok value.",
      },
      {
        l: ".map_or_else()",
        i: "map_or_else(|${1:e}| ${2:default}, |${3:x}| ${0:expr})",
        d: "Maps both Ok and Err with separate functions.",
      },
      {
        l: ".and()",
        i: "and(${0:res})",
        d: "Returns res if self is Ok, otherwise returns the Err.",
      },
      {
        l: ".and_then()",
        i: "and_then(|${1:x}| ${0:expr})",
        d: "Calls f if Ok, otherwise returns the Err.",
      },
      {
        l: ".or()",
        i: "or(${0:res})",
        d: "Returns self if Ok, otherwise returns res.",
      },
      {
        l: ".or_else()",
        i: "or_else(|${1:e}| ${0:expr})",
        d: "Calls f if Err, otherwise returns the Ok.",
      },
      {
        l: ".transpose()",
        i: "transpose()",
        d: "Transposes a Result of an Option into an Option of a Result.",
      },
      {
        l: ".as_ref()",
        i: "as_ref()",
        d: "Converts &Result<T,E> to Result<&T, &E>.",
      },
      {
        l: ".as_mut()",
        i: "as_mut()",
        d: "Converts &mut Result<T,E> to Result<&mut T, &mut E>.",
      },
      {
        l: ".as_deref()",
        i: "as_deref()",
        d: "Converts Result<T, E> to Result<&T::Target, &E>.",
      },
      {
        l: ".iter()",
        i: "iter()",
        d: "Returns an iterator over the Ok value.",
      },
      {
        l: ".flatten()",
        i: "flatten()",
        d: "Converts from Result<Result<T, E>, E> to Result<T, E>.",
      },
      {
        l: ".inspect()",
        i: "inspect(|${1:x}| ${0:expr})",
        d: "Calls a closure if Ok, then returns self.",
      },
      {
        l: ".inspect_err()",
        i: "inspect_err(|${1:e}| ${0:expr})",
        d: "Calls a closure if Err, then returns self.",
      },
      {
        l: ".cloned()",
        i: "cloned()",
        d: "Maps Result<&T, E> to Result<T, E> by cloning.",
      },
      {
        l: ".copied()",
        i: "copied()",
        d: "Maps Result<&T, E> to Result<T, E> by copying.",
      },
    ],
    // ── Iterator ──
    Iterator: [
      {
        l: ".next()",
        i: "next()",
        d: "Advances the iterator and returns the next value.",
      },
      {
        l: ".map()",
        i: "map(|${1:x}| ${0:expr})",
        d: "Transforms each element by applying a function.",
      },
      {
        l: ".filter()",
        i: "filter(|${1:x}| ${0:predicate})",
        d: "Creates an iterator that only yields matching elements.",
      },
      {
        l: ".filter_map()",
        i: "filter_map(|${1:x}| ${0:expr})",
        d: "Filters and maps simultaneously, keeping only Some results.",
      },
      {
        l: ".flat_map()",
        i: "flat_map(|${1:x}| ${0:expr})",
        d: "Maps then flattens the result.",
      },
      { l: ".flatten()", i: "flatten()", d: "Flattens nested iterators." },
      {
        l: ".collect()",
        i: "collect::<${0:Vec<_>>()}",
        d: "Transforms an iterator into a collection.",
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
        d: "Calls a closure on each element.",
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
        d: "Returns the first element matching a predicate.",
      },
      {
        l: ".find_map()",
        i: "find_map(|${1:x}| ${0:expr})",
        d: "Applies a function and returns the first Some result.",
      },
      {
        l: ".position()",
        i: "position(|${1:x}| ${0:predicate})",
        d: "Returns the index of the first match.",
      },
      {
        l: ".rposition()",
        i: "rposition(|${1:x}| ${0:predicate})",
        d: "Returns the index of the last match (requires DoubleEndedIterator + ExactSizeIterator).",
      },
      { l: ".count()", i: "count()", d: "Counts the number of elements." },
      { l: ".sum()", i: "sum::<${0:i32}>()", d: "Sums all elements." },
      {
        l: ".product()",
        i: "product::<${0:i32}>()",
        d: "Computes the product of all elements.",
      },
      { l: ".min()", i: "min()", d: "Returns the minimum element." },
      { l: ".max()", i: "max()", d: "Returns the maximum element." },
      {
        l: ".min_by()",
        i: "min_by(|${1:a}, ${2:b}| ${0:a.cmp(b)})",
        d: "Returns the minimum by a comparator.",
      },
      {
        l: ".max_by()",
        i: "max_by(|${1:a}, ${2:b}| ${0:a.cmp(b)})",
        d: "Returns the maximum by a comparator.",
      },
      {
        l: ".min_by_key()",
        i: "min_by_key(|${1:x}| ${0:key})",
        d: "Returns the minimum by a key function.",
      },
      {
        l: ".max_by_key()",
        i: "max_by_key(|${1:x}| ${0:key})",
        d: "Returns the maximum by a key function.",
      },
      {
        l: ".enumerate()",
        i: "enumerate()",
        d: "Creates an iterator that yields (index, element) pairs.",
      },
      {
        l: ".zip()",
        i: "zip(${0:other})",
        d: "Zips two iterators into an iterator of pairs.",
      },
      {
        l: ".unzip()",
        i: "unzip::<${1:Vec<_>}, ${0:Vec<_>>()}",
        d: "Converts an iterator of pairs into two collections.",
      },
      {
        l: ".chain()",
        i: "chain(${0:other})",
        d: "Creates an iterator that chains two iterators.",
      },
      { l: ".take()", i: "take(${0:n})", d: "Takes the first n elements." },
      {
        l: ".take_while()",
        i: "take_while(|${1:x}| ${0:predicate})",
        d: "Yields while the predicate is true.",
      },
      { l: ".skip()", i: "skip(${0:n})", d: "Skips the first n elements." },
      {
        l: ".skip_while()",
        i: "skip_while(|${1:x}| ${0:predicate})",
        d: "Skips while the predicate is true.",
      },
      {
        l: ".step_by()",
        i: "step_by(${0:step})",
        d: "Creates an iterator stepping by a given amount.",
      },
      {
        l: ".peekable()",
        i: "peekable()",
        d: "Creates a peekable iterator (allows looking at the next element).",
      },
      { l: ".rev()", i: "rev()", d: "Reverses a DoubleEndedIterator." },
      { l: ".cloned()", i: "cloned()", d: "Clones each element." },
      {
        l: ".copied()",
        i: "copied()",
        d: "Copies each element (requires Copy).",
      },
      { l: ".cycle()", i: "cycle()", d: "Repeats the iterator endlessly." },
      {
        l: ".inspect()",
        i: "inspect(|${1:x}| ${0:expr})",
        d: "Does something with each element, passing it through.",
      },
      {
        l: ".by_ref()",
        i: "by_ref()",
        d: "Borrows the iterator, allowing reuse after a method chain.",
      },
      {
        l: ".nth()",
        i: "nth(${0:n})",
        d: "Returns the nth element (0-indexed), consuming preceding elements.",
      },
      {
        l: ".last()",
        i: "last()",
        d: "Consumes the iterator, returning the last element.",
      },
      {
        l: ".scan()",
        i: "scan(${1:state}, |${2:st}, ${3:x}| ${0:expr})",
        d: "An iterator adapter with state that yields values.",
      },
      {
        l: ".map_while()",
        i: "map_while(|${1:x}| ${0:expr})",
        d: "Yields mapped values while the closure returns Some.",
      },
      {
        l: ".partition()",
        i: "partition::<${1:Vec<_>}, _>(|${2:x}| ${0:predicate})",
        d: "Partitions elements into two collections.",
      },
      {
        l: ".is_sorted()",
        i: "is_sorted()",
        d: "Checks if the elements are sorted.",
      },
      {
        l: ".is_sorted_by()",
        i: "is_sorted_by(|${1:a}, ${2:b}| ${0:expr})",
        d: "Checks if the elements are sorted using a comparator.",
      },
      {
        l: ".size_hint()",
        i: "size_hint()",
        d: "Returns bounds on remaining length: (lower, Option<upper>).",
      },
      {
        l: ".eq()",
        i: "eq(${0:other})",
        d: "Determines if two iterators produce equal sequences.",
      },
      {
        l: ".ne()",
        i: "ne(${0:other})",
        d: "Determines if two iterators produce different sequences.",
      },
      {
        l: ".lt()",
        i: "lt(${0:other})",
        d: "Determines if self is lexicographically less than other.",
      },
      {
        l: ".le()",
        i: "le(${0:other})",
        d: "Determines if self is lexicographically less than or equal to other.",
      },
      {
        l: ".gt()",
        i: "gt(${0:other})",
        d: "Determines if self is lexicographically greater than other.",
      },
      {
        l: ".ge()",
        i: "ge(${0:other})",
        d: "Determines if self is lexicographically greater than or equal to other.",
      },
      {
        l: ".cmp()",
        i: "cmp(${0:other})",
        d: "Lexicographically compares the elements of this iterator with another.",
      },
    ],
    // ── Path / PathBuf ──
    Path: [
      {
        l: ".display()",
        i: "display()",
        d: "Returns an object that implements Display for printing paths.",
      },
      {
        l: ".exists()",
        i: "exists()",
        d: "Returns true if the path points to an existing entity.",
      },
      {
        l: ".is_file()",
        i: "is_file()",
        d: "Returns true if the path is a regular file.",
      },
      {
        l: ".is_dir()",
        i: "is_dir()",
        d: "Returns true if the path is a directory.",
      },
      {
        l: ".is_symlink()",
        i: "is_symlink()",
        d: "Returns true if the path is a symbolic link.",
      },
      {
        l: ".is_absolute()",
        i: "is_absolute()",
        d: "Returns true if the path is absolute.",
      },
      {
        l: ".is_relative()",
        i: "is_relative()",
        d: "Returns true if the path is relative.",
      },
      {
        l: ".parent()",
        i: "parent()",
        d: "Returns the path without the final component, if there is one.",
      },
      {
        l: ".file_name()",
        i: "file_name()",
        d: "Returns the final component of the path.",
      },
      {
        l: ".file_stem()",
        i: "file_stem()",
        d: "Extracts the file stem (name without extension).",
      },
      { l: ".extension()", i: "extension()", d: "Extracts the extension." },
      {
        l: ".with_file_name()",
        i: "with_file_name(${0:file_name})",
        d: "Creates a path with a different final component.",
      },
      {
        l: ".with_extension()",
        i: "with_extension(${0:extension})",
        d: "Creates a path with a different extension.",
      },
      {
        l: ".join()",
        i: "join(${0:path})",
        d: "Joins a path onto the end of self.",
      },
      {
        l: ".components()",
        i: "components()",
        d: "Returns an iterator over the path's components.",
      },
      {
        l: ".ancestors()",
        i: "ancestors()",
        d: "Returns an iterator over the path and its ancestors.",
      },
      {
        l: ".strip_prefix()",
        i: "strip_prefix(${0:base})",
        d: "Returns a path that, when joined to base, yields self.",
      },
      {
        l: ".starts_with()",
        i: "starts_with(${0:base})",
        d: "Determines if self begins with a given path.",
      },
      {
        l: ".ends_with()",
        i: "ends_with(${0:child})",
        d: "Determines if self ends with a given path.",
      },
      {
        l: ".to_str()",
        i: "to_str()",
        d: "Yields a &str if the path is valid unicode.",
      },
      {
        l: ".to_string_lossy()",
        i: "to_string_lossy()",
        d: "Converts to a Cow<str>, replacing invalid unicode.",
      },
      { l: ".to_path_buf()", i: "to_path_buf()", d: "Converts to a PathBuf." },
      {
        l: ".metadata()",
        i: "metadata()",
        d: "Returns metadata for the file/directory.",
      },
      {
        l: ".read_dir()",
        i: "read_dir()",
        d: "Returns an iterator over the directory entries.",
      },
      {
        l: ".canonicalize()",
        i: "canonicalize()",
        d: "Returns the canonical, absolute path.",
      },
      {
        l: ".read_link()",
        i: "read_link()",
        d: "Reads the symbolic link, returning the target path.",
      },
      {
        l: ".has_root()",
        i: "has_root()",
        d: "Returns true if the path has a root.",
      },
    ],
    // ── Smart Pointers ──
    Box: [
      { l: ".as_ref()", i: "as_ref()", d: "Borrows the inner value." },
      { l: ".as_mut()", i: "as_mut()", d: "Mutably borrows the inner value." },
      {
        l: ".into_inner()",
        i: "into_inner()",
        d: "Unwraps the Box, returning the contained value.",
      },
      { l: ".clone()", i: "clone()", d: "Clones the Box and its contents." },
    ],
    Rc: [
      { l: ".as_ref()", i: "as_ref()", d: "Borrows the inner value." },
      {
        l: ".clone()",
        i: "clone()",
        d: "Clones the Rc pointer (increments strong count).",
      },
    ],
    Arc: [
      { l: ".as_ref()", i: "as_ref()", d: "Borrows the inner value." },
      {
        l: ".clone()",
        i: "clone()",
        d: "Clones the Arc pointer (increments strong count).",
      },
    ],
    // ── Mutex / RwLock ──
    Mutex: [
      {
        l: ".lock()",
        i: "lock().unwrap()",
        d: "Acquires the mutex, blocking the current thread until it's available.",
      },
      {
        l: ".try_lock()",
        i: "try_lock()",
        d: "Attempts to acquire the mutex without blocking.",
      },
      {
        l: ".is_poisoned()",
        i: "is_poisoned()",
        d: "Determines whether the mutex is poisoned.",
      },
      {
        l: ".into_inner()",
        i: "into_inner().unwrap()",
        d: "Consumes the mutex, returning the underlying data.",
      },
      {
        l: ".get_mut()",
        i: "get_mut().unwrap()",
        d: "Returns a mutable reference to the underlying data.",
      },
    ],
    RwLock: [
      { l: ".read()", i: "read().unwrap()", d: "Acquires a read lock." },
      { l: ".write()", i: "write().unwrap()", d: "Acquires a write lock." },
      {
        l: ".try_read()",
        i: "try_read()",
        d: "Attempts to acquire a read lock without blocking.",
      },
      {
        l: ".try_write()",
        i: "try_write()",
        d: "Attempts to acquire a write lock without blocking.",
      },
      {
        l: ".is_poisoned()",
        i: "is_poisoned()",
        d: "Determines whether the RwLock is poisoned.",
      },
      {
        l: ".into_inner()",
        i: "into_inner().unwrap()",
        d: "Consumes the RwLock, returning the underlying data.",
      },
    ],
    // ── Cell / RefCell ──
    Cell: [
      { l: ".get()", i: "get()", d: "Returns a copy of the contained value." },
      { l: ".set()", i: "set(${0:val})", d: "Sets the contained value." },
      {
        l: ".replace()",
        i: "replace(${0:val})",
        d: "Replaces the contained value and returns the old one.",
      },
      { l: ".into_inner()", i: "into_inner()", d: "Unwraps the value." },
      {
        l: ".take()",
        i: "take()",
        d: "Takes the value, leaving Default::default() in its place.",
      },
      {
        l: ".swap()",
        i: "swap(&${0:other})",
        d: "Swaps the values of two Cells.",
      },
    ],
    RefCell: [
      {
        l: ".borrow()",
        i: "borrow()",
        d: "Immutably borrows the wrapped value.",
      },
      {
        l: ".borrow_mut()",
        i: "borrow_mut()",
        d: "Mutably borrows the wrapped value.",
      },
      {
        l: ".try_borrow()",
        i: "try_borrow()",
        d: "Attempts to immutably borrow (returns Result).",
      },
      {
        l: ".try_borrow_mut()",
        i: "try_borrow_mut()",
        d: "Attempts to mutably borrow (returns Result).",
      },
      {
        l: ".replace()",
        i: "replace(${0:t})",
        d: "Replaces the wrapped value and returns the old one.",
      },
      {
        l: ".replace_with()",
        i: "replace_with(|${1:old}| ${0:new})",
        d: "Replaces the wrapped value using a closure.",
      },
      {
        l: ".swap()",
        i: "swap(&${0:other})",
        d: "Swaps the wrapped values of two RefCells.",
      },
      {
        l: ".into_inner()",
        i: "into_inner()",
        d: "Consumes the RefCell, returning the wrapped value.",
      },
      {
        l: ".take()",
        i: "take()",
        d: "Takes the wrapped value, leaving Default::default() in its place.",
      },
    ],
    // ── Duration ──
    Duration: [
      {
        l: ".as_secs()",
        i: "as_secs()",
        d: "Returns the number of whole seconds.",
      },
      {
        l: ".as_millis()",
        i: "as_millis()",
        d: "Returns the total number of milliseconds.",
      },
      {
        l: ".as_micros()",
        i: "as_micros()",
        d: "Returns the total number of microseconds.",
      },
      {
        l: ".as_nanos()",
        i: "as_nanos()",
        d: "Returns the total number of nanoseconds.",
      },
      {
        l: ".as_secs_f64()",
        i: "as_secs_f64()",
        d: "Returns the duration as a floating-point number of seconds (f64).",
      },
      {
        l: ".as_secs_f32()",
        i: "as_secs_f32()",
        d: "Returns the duration as f32 seconds.",
      },
      {
        l: ".subsec_millis()",
        i: "subsec_millis()",
        d: "Returns the fractional part in milliseconds.",
      },
      {
        l: ".subsec_micros()",
        i: "subsec_micros()",
        d: "Returns the fractional part in microseconds.",
      },
      {
        l: ".subsec_nanos()",
        i: "subsec_nanos()",
        d: "Returns the fractional part in nanoseconds.",
      },
      {
        l: ".checked_add()",
        i: "checked_add(${0:rhs})",
        d: "Checked addition. Returns None on overflow.",
      },
      {
        l: ".checked_sub()",
        i: "checked_sub(${0:rhs})",
        d: "Checked subtraction. Returns None on overflow.",
      },
      {
        l: ".checked_mul()",
        i: "checked_mul(${0:rhs})",
        d: "Checked multiplication. Returns None on overflow.",
      },
      {
        l: ".checked_div()",
        i: "checked_div(${0:rhs})",
        d: "Checked division. Returns None on division by zero.",
      },
      {
        l: ".saturating_add()",
        i: "saturating_add(${0:rhs})",
        d: "Saturating addition.",
      },
      {
        l: ".saturating_sub()",
        i: "saturating_sub(${0:rhs})",
        d: "Saturating subtraction.",
      },
      {
        l: ".saturating_mul()",
        i: "saturating_mul(${0:rhs})",
        d: "Saturating multiplication.",
      },
      {
        l: ".mul_f64()",
        i: "mul_f64(${0:rhs})",
        d: "Multiplies the Duration by an f64.",
      },
      {
        l: ".div_f64()",
        i: "div_f64(${0:rhs})",
        d: "Divides the Duration by an f64.",
      },
      {
        l: ".is_zero()",
        i: "is_zero()",
        d: "Returns true if the duration is zero.",
      },
    ],
    // ── Instant ──
    Instant: [
      {
        l: ".elapsed()",
        i: "elapsed()",
        d: "Returns the time elapsed since this instant.",
      },
      {
        l: ".duration_since()",
        i: "duration_since(${0:earlier})",
        d: "Returns the duration since the given earlier instant.",
      },
      {
        l: ".checked_add()",
        i: "checked_add(${0:duration})",
        d: "Returns Some(self + duration) or None on overflow.",
      },
      {
        l: ".checked_sub()",
        i: "checked_sub(${0:duration})",
        d: "Returns Some(self - duration) or None on overflow.",
      },
      {
        l: ".checked_duration_since()",
        i: "checked_duration_since(${0:earlier})",
        d: "Returns the duration since earlier, or None if earlier is later.",
      },
      {
        l: ".saturating_duration_since()",
        i: "saturating_duration_since(${0:earlier})",
        d: "Returns the duration since earlier, saturating at zero.",
      },
    ],
    // ── Entry (HashMap/BTreeMap) ──
    Entry: [
      {
        l: ".or_insert()",
        i: "or_insert(${0:default})",
        d: "Inserts the default value if the entry is vacant.",
      },
      {
        l: ".or_insert_with()",
        i: "or_insert_with(|| ${0:default})",
        d: "Inserts a value computed from a closure if vacant.",
      },
      {
        l: ".or_insert_with_key()",
        i: "or_insert_with_key(|${1:k}| ${0:default})",
        d: "Inserts a value computed from the key if vacant.",
      },
      {
        l: ".or_default()",
        i: "or_default()",
        d: "Inserts Default::default() if vacant.",
      },
      {
        l: ".and_modify()",
        i: "and_modify(|${1:v}| ${0:expr})",
        d: "Provides mutable access to an occupied entry.",
      },
      { l: ".key()", i: "key()", d: "Returns a reference to the entry's key." },
    ],
    // ── VecDeque ──
    VecDeque: [
      {
        l: ".push_back()",
        i: "push_back(${0:value})",
        d: "Appends to the back.",
      },
      {
        l: ".push_front()",
        i: "push_front(${0:value})",
        d: "Prepends to the front.",
      },
      { l: ".pop_back()", i: "pop_back()", d: "Removes from the back." },
      { l: ".pop_front()", i: "pop_front()", d: "Removes from the front." },
      {
        l: ".front()",
        i: "front()",
        d: "Returns a reference to the front element.",
      },
      {
        l: ".back()",
        i: "back()",
        d: "Returns a reference to the back element.",
      },
      { l: ".len()", i: "len()", d: "Returns the number of elements." },
      {
        l: ".is_empty()",
        i: "is_empty()",
        d: "Returns true if the deque is empty.",
      },
      { l: ".clear()", i: "clear()", d: "Clears the deque." },
      {
        l: ".contains()",
        i: "contains(&${0:value})",
        d: "Returns true if the deque contains the value.",
      },
      {
        l: ".get()",
        i: "get(${0:index})",
        d: "Returns a reference to the element at index.",
      },
      { l: ".iter()", i: "iter()", d: "Returns an iterator." },
      {
        l: ".drain()",
        i: "drain(${0:range})",
        d: "Removes a range and returns a draining iterator.",
      },
      {
        l: ".rotate_left()",
        i: "rotate_left(${0:n})",
        d: "Rotates the deque left by n.",
      },
      {
        l: ".rotate_right()",
        i: "rotate_right(${0:n})",
        d: "Rotates the deque right by n.",
      },
      {
        l: ".make_contiguous()",
        i: "make_contiguous()",
        d: "Makes the deque contiguous in memory.",
      },
      {
        l: ".as_slices()",
        i: "as_slices()",
        d: "Returns a pair of slices covering the deque's elements.",
      },
      {
        l: ".binary_search()",
        i: "binary_search(&${0:value})",
        d: "Binary search on a sorted deque.",
      },
      {
        l: ".swap()",
        i: "swap(${1:i}, ${0:j})",
        d: "Swaps elements at indices i and j.",
      },
    ],
    // ── File / IO ──
    File: [
      {
        l: ".read_to_string()",
        i: "read_to_string(&mut ${0:buf})",
        d: "Reads the entire file into a string.",
      },
      {
        l: ".read_to_end()",
        i: "read_to_end(&mut ${0:buf})",
        d: "Reads all bytes until EOF.",
      },
      {
        l: ".read()",
        i: "read(&mut ${0:buf})",
        d: "Reads some bytes into the buffer.",
      },
      {
        l: ".write()",
        i: "write(${0:buf})",
        d: "Writes a buffer into the file.",
      },
      {
        l: ".write_all()",
        i: "write_all(${0:buf})",
        d: "Writes an entire buffer into the file.",
      },
      { l: ".flush()", i: "flush()", d: "Flushes the output stream." },
      {
        l: ".seek()",
        i: "seek(${0:pos})",
        d: "Seek to an offset in the file.",
      },
      { l: ".metadata()", i: "metadata()", d: "Returns the file metadata." },
      {
        l: ".set_len()",
        i: "set_len(${0:size})",
        d: "Truncates or extends the file to the specified size.",
      },
      {
        l: ".set_permissions()",
        i: "set_permissions(${0:perm})",
        d: "Changes the permissions of the file.",
      },
      {
        l: ".try_clone()",
        i: "try_clone()",
        d: "Creates a new File instance that refers to the same file.",
      },
      {
        l: ".sync_all()",
        i: "sync_all()",
        d: "Synchronizes all OS-internal metadata to disk.",
      },
      {
        l: ".sync_data()",
        i: "sync_data()",
        d: "Synchronizes content data to disk.",
      },
    ],
    // ── Numeric (shared instance methods) ──
    numeric: [
      { l: ".abs()", i: "abs()", d: "Returns the absolute value." },
      { l: ".signum()", i: "signum()", d: "Returns the sign of the number." },
      {
        l: ".pow()",
        i: "pow(${0:exp})",
        d: "Raises self to the power of exp.",
      },
      {
        l: ".min()",
        i: "min(${0:other})",
        d: "Returns the minimum of self and other.",
      },
      {
        l: ".max()",
        i: "max(${0:other})",
        d: "Returns the maximum of self and other.",
      },
      {
        l: ".clamp()",
        i: "clamp(${1:min}, ${0:max})",
        d: "Restricts self to a range.",
      },
      {
        l: ".checked_add()",
        i: "checked_add(${0:rhs})",
        d: "Checked addition. Returns None on overflow.",
      },
      {
        l: ".checked_sub()",
        i: "checked_sub(${0:rhs})",
        d: "Checked subtraction.",
      },
      {
        l: ".checked_mul()",
        i: "checked_mul(${0:rhs})",
        d: "Checked multiplication.",
      },
      {
        l: ".checked_div()",
        i: "checked_div(${0:rhs})",
        d: "Checked division.",
      },
      {
        l: ".saturating_add()",
        i: "saturating_add(${0:rhs})",
        d: "Saturating addition.",
      },
      {
        l: ".saturating_sub()",
        i: "saturating_sub(${0:rhs})",
        d: "Saturating subtraction.",
      },
      {
        l: ".wrapping_add()",
        i: "wrapping_add(${0:rhs})",
        d: "Wrapping addition.",
      },
      {
        l: ".wrapping_sub()",
        i: "wrapping_sub(${0:rhs})",
        d: "Wrapping subtraction.",
      },
      {
        l: ".count_ones()",
        i: "count_ones()",
        d: "Returns the number of ones in the binary representation.",
      },
      {
        l: ".count_zeros()",
        i: "count_zeros()",
        d: "Returns the number of zeros.",
      },
      {
        l: ".leading_zeros()",
        i: "leading_zeros()",
        d: "Returns the number of leading zeros.",
      },
      {
        l: ".trailing_zeros()",
        i: "trailing_zeros()",
        d: "Returns the number of trailing zeros.",
      },
      {
        l: ".to_be_bytes()",
        i: "to_be_bytes()",
        d: "Returns big-endian byte representation.",
      },
      {
        l: ".to_le_bytes()",
        i: "to_le_bytes()",
        d: "Returns little-endian byte representation.",
      },
      {
        l: ".to_ne_bytes()",
        i: "to_ne_bytes()",
        d: "Returns native-endian byte representation.",
      },
      { l: ".swap_bytes()", i: "swap_bytes()", d: "Reverses the byte order." },
      {
        l: ".reverse_bits()",
        i: "reverse_bits()",
        d: "Reverses the bit pattern.",
      },
      {
        l: ".rotate_left()",
        i: "rotate_left(${0:n})",
        d: "Rotates bits left.",
      },
      {
        l: ".rotate_right()",
        i: "rotate_right(${0:n})",
        d: "Rotates bits right.",
      },
      // float-specific
      {
        l: ".floor()",
        i: "floor()",
        d: "Returns the largest integer ≤ self (float).",
      },
      {
        l: ".ceil()",
        i: "ceil()",
        d: "Returns the smallest integer ≥ self (float).",
      },
      {
        l: ".round()",
        i: "round()",
        d: "Rounds to the nearest integer (float).",
      },
      { l: ".trunc()", i: "trunc()", d: "Returns the integer part (float)." },
      {
        l: ".fract()",
        i: "fract()",
        d: "Returns the fractional part (float).",
      },
      { l: ".sqrt()", i: "sqrt()", d: "Returns the square root (float)." },
      { l: ".cbrt()", i: "cbrt()", d: "Returns the cube root (float)." },
      {
        l: ".powf()",
        i: "powf(${0:n})",
        d: "Raises to a floating-point power.",
      },
      { l: ".powi()", i: "powi(${0:n})", d: "Raises to an integer power." },
      { l: ".exp()", i: "exp()", d: "Returns e^self." },
      { l: ".ln()", i: "ln()", d: "Returns the natural logarithm." },
      { l: ".log2()", i: "log2()", d: "Returns the base-2 logarithm." },
      { l: ".log10()", i: "log10()", d: "Returns the base-10 logarithm." },
      { l: ".sin()", i: "sin()", d: "Computes the sine (float)." },
      { l: ".cos()", i: "cos()", d: "Computes the cosine (float)." },
      { l: ".tan()", i: "tan()", d: "Computes the tangent (float)." },
      { l: ".is_nan()", i: "is_nan()", d: "Returns true if NaN (float)." },
      {
        l: ".is_finite()",
        i: "is_finite()",
        d: "Returns true if finite (float).",
      },
      {
        l: ".is_infinite()",
        i: "is_infinite()",
        d: "Returns true if infinite (float).",
      },
      {
        l: ".to_radians()",
        i: "to_radians()",
        d: "Converts degrees to radians (float).",
      },
      {
        l: ".to_degrees()",
        i: "to_degrees()",
        d: "Converts radians to degrees (float).",
      },
    ],
    // ── Commonly shared trait methods ──
    shared: [
      { l: ".clone()", i: "clone()", d: "Creates a deep copy (Clone trait)." },
      {
        l: ".to_string()",
        i: "to_string()",
        d: "Converts to a String (Display/ToString trait).",
      },
      {
        l: ".to_owned()",
        i: "to_owned()",
        d: "Creates owned data from borrowed data (ToOwned).",
      },
      { l: ".as_ref()", i: "as_ref()", d: "Borrows as a reference (AsRef)." },
      {
        l: ".as_mut()",
        i: "as_mut()",
        d: "Borrows as a mutable reference (AsMut).",
      },
      {
        l: ".into()",
        i: "into()",
        d: "Converts into another type (Into trait).",
      },
      {
        l: ".try_into()",
        i: "try_into()",
        d: "Attempts conversion, may fail (TryInto trait).",
      },
      {
        l: ".eq()",
        i: "eq(&${0:other})",
        d: "Tests for equality (PartialEq).",
      },
      {
        l: ".ne()",
        i: "ne(&${0:other})",
        d: "Tests for inequality (PartialEq).",
      },
      { l: ".cmp()", i: "cmp(&${0:other})", d: "Returns an Ordering (Ord)." },
      {
        l: ".partial_cmp()",
        i: "partial_cmp(&${0:other})",
        d: "Returns an Option<Ordering> (PartialOrd).",
      },
      {
        l: ".hash()",
        i: "hash(&mut ${0:state})",
        d: "Feeds this value into a Hasher.",
      },
      {
        l: ".fmt()",
        i: "fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result",
        d: "Formats the value (Display/Debug).",
      },
      {
        l: ".default()",
        i: "default()",
        d: "Returns the default value (Default).",
      },
    ],
  };

  // Alias str → String methods and PathBuf → Path methods
  TYPE_METHODS["str"] = TYPE_METHODS["String"];
  TYPE_METHODS["PathBuf"] = TYPE_METHODS["Path"];
  TYPE_METHODS["BTreeSet"] = TYPE_METHODS["HashSet"]; // close enough for completion
  TYPE_METHODS["BinaryHeap"] = TYPE_METHODS["VecDeque"];

  // ── 5d. Build flat "all methods" list (deduplicated by label) ──
  function buildAllMethods(): MethodEntry[] {
    const seen = new Set<string>();
    const all: MethodEntry[] = [];
    // Priority order: common types first
    const order = [
      "shared",
      "String",
      "Vec",
      "HashMap",
      "HashSet",
      "BTreeMap",
      "Option",
      "Result",
      "Iterator",
      "Path",
      "Duration",
      "Instant",
      "Mutex",
      "RwLock",
      "Cell",
      "RefCell",
      "Box",
      "Rc",
      "Arc",
      "VecDeque",
      "Entry",
      "File",
      "numeric",
    ];
    for (const typeName of order) {
      const methods = TYPE_METHODS[typeName];
      if (!methods) continue;
      for (const m of methods) {
        if (!seen.has(m.l)) {
          seen.add(m.l);
          all.push(m);
        }
      }
    }
    return all;
  }
  const ALL_METHODS = buildAllMethods();

  // ── 5e. Simple type inference for dot completions ──
  function inferType(
    model: Monaco.editor.ITextModel,
    position: Monaco.Position,
  ): string | null {
    const lineContent = model.getLineContent(position.lineNumber);
    const before = lineContent.substring(0, position.column - 1);

    // Chain detection: if the expression before the dot ends with a known iterator adapter
    if (
      /\.\s*(?:iter|into_iter|iter_mut|chars|char_indices|bytes|lines|keys|values|enumerate|zip|chain|filter|map|flat_map|flatten|take|skip|rev|peekable|cloned|copied|cycle|step_by|inspect|take_while|skip_while|scan|filter_map|map_while)\s*\([^)]*\)\s*\.?\s*$/.test(
        before,
      )
    ) {
      return "Iterator";
    }
    // Entry chain: .entry(key).
    if (/\.entry\s*\([^)]*\)\s*\.\s*$/.test(before)) {
      return "Entry";
    }

    // Extract the variable/expression before the dot
    const varMatch = before.match(/\b(\w+)\s*\.$/);
    if (!varMatch) return null;
    const varName = varMatch[1];

    // Don't try to match common method names as types
    if (["self", "super", "crate"].includes(varName)) return null;

    const text = model.getValue();

    // Type annotation: let varName: Type or let varName: &Type or let varName: &mut Type
    const annoMatch = text.match(
      new RegExp(
        `let\\s+(?:mut\\s+)?${varName}\\s*:\\s*(?:&(?:'\\w+\\s*)?(?:mut\\s+)?)?(\\w+)`,
      ),
    );
    if (annoMatch && TYPE_METHODS[annoMatch[1]]) return annoMatch[1];

    // Constructor: let varName = Type::
    const ctorMatch = text.match(
      new RegExp(`let\\s+(?:mut\\s+)?${varName}\\s*=\\s*(\\w+)::`),
    );
    if (ctorMatch && TYPE_METHODS[ctorMatch[1]]) return ctorMatch[1];

    // vec! macro
    if (new RegExp(`let\\s+(?:mut\\s+)?${varName}\\s*=\\s*vec!`).test(text))
      return "Vec";

    // String from string literal methods
    if (
      new RegExp(`let\\s+(?:mut\\s+)?${varName}\\s*=.*\\.to_string\\(\\)`).test(
        text,
      )
    )
      return "String";
    if (
      new RegExp(`let\\s+(?:mut\\s+)?${varName}\\s*=.*\\.to_owned\\(\\)`).test(
        text,
      )
    )
      return "String";
    if (new RegExp(`let\\s+(?:mut\\s+)?${varName}\\s*=\\s*String::`).test(text))
      return "String";
    if (new RegExp(`let\\s+(?:mut\\s+)?${varName}\\s*=\\s*format!`).test(text))
      return "String";

    // &str from string literal
    if (new RegExp(`let\\s+(?:mut\\s+)?${varName}\\s*=\\s*"`).test(text))
      return "str";

    // Option/Result
    if (new RegExp(`let\\s+(?:mut\\s+)?${varName}\\s*=\\s*Some\\(`).test(text))
      return "Option";
    if (new RegExp(`let\\s+(?:mut\\s+)?${varName}\\s*=\\s*None\\b`).test(text))
      return "Option";
    if (new RegExp(`let\\s+(?:mut\\s+)?${varName}\\s*=\\s*Ok\\(`).test(text))
      return "Result";
    if (new RegExp(`let\\s+(?:mut\\s+)?${varName}\\s*=\\s*Err\\(`).test(text))
      return "Result";

    // Duration/Instant
    if (
      new RegExp(`let\\s+(?:mut\\s+)?${varName}\\s*=\\s*Duration::`).test(text)
    )
      return "Duration";
    if (
      new RegExp(`let\\s+(?:mut\\s+)?${varName}\\s*=\\s*Instant::`).test(text)
    )
      return "Instant";

    // HashMap/HashSet/etc.
    if (
      new RegExp(`let\\s+(?:mut\\s+)?${varName}\\s*=\\s*HashMap::`).test(text)
    )
      return "HashMap";
    if (
      new RegExp(`let\\s+(?:mut\\s+)?${varName}\\s*=\\s*HashSet::`).test(text)
    )
      return "HashSet";
    if (
      new RegExp(`let\\s+(?:mut\\s+)?${varName}\\s*=\\s*BTreeMap::`).test(text)
    )
      return "BTreeMap";
    if (
      new RegExp(`let\\s+(?:mut\\s+)?${varName}\\s*=\\s*BTreeSet::`).test(text)
    )
      return "BTreeSet";
    if (
      new RegExp(`let\\s+(?:mut\\s+)?${varName}\\s*=\\s*VecDeque::`).test(text)
    )
      return "VecDeque";

    // Smart pointers
    if (new RegExp(`let\\s+(?:mut\\s+)?${varName}\\s*=\\s*Box::`).test(text))
      return "Box";
    if (new RegExp(`let\\s+(?:mut\\s+)?${varName}\\s*=\\s*Rc::`).test(text))
      return "Rc";
    if (new RegExp(`let\\s+(?:mut\\s+)?${varName}\\s*=\\s*Arc::`).test(text))
      return "Arc";
    if (new RegExp(`let\\s+(?:mut\\s+)?${varName}\\s*=\\s*Mutex::`).test(text))
      return "Mutex";
    if (new RegExp(`let\\s+(?:mut\\s+)?${varName}\\s*=\\s*RwLock::`).test(text))
      return "RwLock";
    if (new RegExp(`let\\s+(?:mut\\s+)?${varName}\\s*=\\s*Cell::`).test(text))
      return "Cell";
    if (
      new RegExp(`let\\s+(?:mut\\s+)?${varName}\\s*=\\s*RefCell::`).test(text)
    )
      return "RefCell";

    // File
    if (new RegExp(`let\\s+(?:mut\\s+)?${varName}\\s*=\\s*File::`).test(text))
      return "File";

    // Path
    if (new RegExp(`let\\s+(?:mut\\s+)?${varName}\\s*=\\s*Path::`).test(text))
      return "Path";
    if (
      new RegExp(`let\\s+(?:mut\\s+)?${varName}\\s*=\\s*PathBuf::`).test(text)
    )
      return "PathBuf";

    return null;
  }

  /* ─────────────────────────────────────────────
     6. COMPLETIONS  (autocomplete + snippets)
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

  function mkKeywordItems(range: Monaco.IRange) {
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

  function mkTypeItems(range: Monaco.IRange) {
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

  function mkTraitItems(range: Monaco.IRange) {
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

  function mkMacroItems(range: Monaco.IRange) {
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

  function mkMethodSuggestions(methods: MethodEntry[], range: Monaco.IRange) {
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

  const MODULE_KIND_MAP: Record<string, Monaco.languages.CompletionItemKind> = {
    mod: CK.Module,
    type: CK.Class,
    fn: CK.Function,
    const: CK.Constant,
    trait: CK.Interface,
    macro: CK.Function,
  };

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

      // ── After a dot → suggest methods (type-aware) ──
      if (textBefore.endsWith(".") || /\.\w*$/.test(textBefore)) {
        const inferredType = inferType(model, position);
        if (inferredType && TYPE_METHODS[inferredType]) {
          // Show type-specific methods first, then shared, then all remaining
          const primary = TYPE_METHODS[inferredType];
          const shared = TYPE_METHODS["shared"] || [];
          const seen = new Set(primary.map((m) => m.l));
          const extra: MethodEntry[] = [];
          for (const m of shared) {
            if (!seen.has(m.l)) {
              seen.add(m.l);
              extra.push(m);
            }
          }
          // Also add a few more from ALL_METHODS not yet seen, with lower sort priority
          const overflow: MethodEntry[] = [];
          for (const m of ALL_METHODS) {
            if (!seen.has(m.l)) {
              seen.add(m.l);
              overflow.push(m);
            }
          }
          return {
            suggestions: [
              ...mkMethodSuggestions(primary, range).map((s, i) => ({
                ...s,
                sortText: `0_${String(i).padStart(3, "0")}`,
              })),
              ...mkMethodSuggestions(extra, range).map((s, i) => ({
                ...s,
                sortText: `1_${String(i).padStart(3, "0")}`,
              })),
              ...mkMethodSuggestions(overflow, range).map((s, i) => ({
                ...s,
                sortText: `2_${String(i).padStart(3, "0")}`,
              })),
            ],
          };
        }
        return { suggestions: mkMethodSuggestions(ALL_METHODS, range) };
      }

      // ── After :: → suggest associated items / module paths ──
      if (textBefore.endsWith("::") || /::\w*$/.test(textBefore)) {
        const pathMatch = textBefore.match(/\b([\w:]+)::\w*$/);
        if (pathMatch) {
          const fullPath = pathMatch[1];

          // Check module paths (e.g., std, std::collections, std::io)
          if (MODULE_ITEMS[fullPath]) {
            return {
              suggestions: MODULE_ITEMS[fullPath].map((m) => ({
                label: m.l,
                kind: MODULE_KIND_MAP[m.k] || CK.Text,
                insertText: m.i,
                insertTextRules: CIR.InsertAsSnippet,
                detail: m.k,
                documentation: m.d,
                range,
              })),
            };
          }

          // Check type associated functions (last segment of path)
          const segments = fullPath.split("::");
          const typeName = segments[segments.length - 1];
          if (TYPE_ASSOC_FNS[typeName]) {
            return {
              suggestions: TYPE_ASSOC_FNS[typeName].map((m) => ({
                label: m.l,
                kind: CK.Function,
                insertText: m.i,
                insertTextRules: CIR.InsertAsSnippet,
                detail: m.d,
                documentation: m.doc || m.d,
                range,
              })),
            };
          }
        }

        // Generic fallback associated functions
        const genericAssocFns = [
          { l: "new()", i: "new(${0})", d: "Constructor" },
          { l: "default()", i: "default()", d: "Default constructor" },
          { l: "from()", i: "from(${0:val})", d: "From conversion" },
          {
            l: "with_capacity()",
            i: "with_capacity(${0:cap})",
            d: "Creates with preallocated capacity",
          },
          { l: "builder()", i: "builder()", d: "Creates a builder" },
          {
            l: "try_from()",
            i: "try_from(${0:val})",
            d: "Fallible conversion",
          },
        ];
        return {
          suggestions: genericAssocFns.map((m) => ({
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

      // ── After # → attribute completions ──
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

      // ── Default: keywords, types, traits, macros, snippets, local symbols ──
      const text = model.getValue();
      const localItems: Monaco.languages.CompletionItem[] = [];
      const seen = new Set<string>();

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
          } as Monaco.languages.CompletionItem);
        }
      }
      for (const m of text.matchAll(/\bstruct\s+(\w+)/g)) {
        if (!seen.has(m[1])) {
          seen.add(m[1]);
          localItems.push({
            label: m[1],
            kind: CK.Struct,
            insertText: m[1],
            detail: "struct (local)",
            range,
          } as Monaco.languages.CompletionItem);
        }
      }
      for (const m of text.matchAll(/\benum\s+(\w+)/g)) {
        if (!seen.has(m[1])) {
          seen.add(m[1]);
          localItems.push({
            label: m[1],
            kind: CK.Enum,
            insertText: m[1],
            detail: "enum (local)",
            range,
          } as Monaco.languages.CompletionItem);
        }
      }
      for (const m of text.matchAll(/\btrait\s+(\w+)/g)) {
        if (!seen.has(m[1])) {
          seen.add(m[1]);
          localItems.push({
            label: m[1],
            kind: CK.Interface,
            insertText: m[1],
            detail: "trait (local)",
            range,
          } as Monaco.languages.CompletionItem);
        }
      }
      for (const m of text.matchAll(/\blet\s+(?:mut\s+)?(\w+)/g)) {
        if (!seen.has(m[1]) && m[1] !== "_") {
          seen.add(m[1]);
          localItems.push({
            label: m[1],
            kind: CK.Variable,
            insertText: m[1],
            detail: "variable (local)",
            range,
          } as Monaco.languages.CompletionItem);
        }
      }
      for (const m of text.matchAll(/\b(?:const|static)\s+(?:mut\s+)?(\w+)/g)) {
        if (!seen.has(m[1])) {
          seen.add(m[1]);
          localItems.push({
            label: m[1],
            kind: CK.Constant,
            insertText: m[1],
            detail: "constant (local)",
            range,
          } as Monaco.languages.CompletionItem);
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
     7. HOVER PROVIDER
  ───────────────────────────────────────────── */
  monaco.languages.registerHoverProvider("rust", {
    provideHover(model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return null;
      let token = word.word;

      const line = model.getLineContent(position.lineNumber);
      if (line[word.endColumn - 1] === "!") token += "!";

      const info = DOCS[token];
      if (!info) {
        const text = model.getValue();
        let match: RegExpExecArray | null;
        const escaped = token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const fnRegex = new RegExp(
          "(?:pub\\s+)?(?:async\\s+)?fn\\s+" +
            escaped +
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
        const structRegex = new RegExp(
          "(?:pub\\s+)?struct\\s+" + escaped + "[^{;]*",
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
        const enumRegex = new RegExp(
          "(?:pub\\s+)?enum\\s+" + escaped + "[^{]*",
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
        const traitRegex = new RegExp(
          "(?:pub\\s+)?trait\\s+" + escaped + "[^{]*",
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
     8. GO TO DEFINITION
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
     9. SIGNATURE HELP
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

      const match = textBefore.match(/(\w+)\s*\(([^)]*)$/);
      if (!match) return null;
      const fnName = match[1];
      const argsText = match[2];
      const paramIndex = (argsText.match(/,/g) || []).length;

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
     10. DOCUMENT SYMBOLS  (outline)
  ───────────────────────────────────────────── */
  monaco.languages.registerDocumentSymbolProvider("rust", {
    provideDocumentSymbols(model) {
      const symbols: Monaco.languages.DocumentSymbol[] = [];
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
              detail: "",
              tags: [],
            });
          }
        }
      });
      return symbols;
    },
  });

  // ─── Rename Provider (scope-aware) ──────────────────────────────────
  monaco.languages.registerRenameProvider("rust", {
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

      // Local declarations: let/mut, for-loop bindings, and parameters.
      const declaration = new RegExp(
        "\\blet\\s+(?:mut\\s+)?" +
          esc(name) +
          "\\b|\\bfor\\s+" +
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
            /^[(,|]/.test(m[0]) || before.endsWith("(") || before.endsWith(",");
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
