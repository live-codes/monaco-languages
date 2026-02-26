import type * as Monaco from "monaco-editor";

export default (monaco: typeof Monaco) => {
  // ================================================================
  //  1. ENHANCED TOKENIZER / MONARCH LANGUAGE (richer than default)
  // ================================================================
  monaco.languages.register({ id: "cpp" });

  monaco.languages.setMonarchTokensProvider("cpp", {
    defaultToken: "",
    tokenPostfix: ".cpp",

    keywords: [
      "alignas",
      "alignof",
      "and",
      "and_eq",
      "asm",
      "auto",
      "bitand",
      "bitor",
      "break",
      "case",
      "catch",
      "class",
      "compl",
      "concept",
      "const",
      "consteval",
      "constexpr",
      "constinit",
      "const_cast",
      "continue",
      "co_await",
      "co_return",
      "co_yield",
      "decltype",
      "default",
      "delete",
      "do",
      "dynamic_cast",
      "else",
      "enum",
      "explicit",
      "export",
      "extern",
      "final",
      "for",
      "friend",
      "goto",
      "if",
      "import",
      "inline",
      "module",
      "mutable",
      "namespace",
      "new",
      "noexcept",
      "not",
      "not_eq",
      "operator",
      "or",
      "or_eq",
      "override",
      "private",
      "protected",
      "public",
      "register",
      "reinterpret_cast",
      "requires",
      "return",
      "sizeof",
      "static",
      "static_assert",
      "static_cast",
      "struct",
      "switch",
      "template",
      "this",
      "thread_local",
      "throw",
      "try",
      "typedef",
      "typeid",
      "typename",
      "union",
      "using",
      "virtual",
      "volatile",
      "while",
      "xor",
      "xor_eq",
    ],

    typeKeywords: [
      "bool",
      "char",
      "char8_t",
      "char16_t",
      "char32_t",
      "double",
      "float",
      "int",
      "long",
      "short",
      "signed",
      "unsigned",
      "void",
      "wchar_t",
      "int8_t",
      "int16_t",
      "int32_t",
      "int64_t",
      "uint8_t",
      "uint16_t",
      "uint32_t",
      "uint64_t",
      "size_t",
      "ptrdiff_t",
      "nullptr_t",
      "string",
      "wstring",
      "string_view",
      "vector",
      "map",
      "unordered_map",
      "set",
      "unordered_set",
      "list",
      "deque",
      "array",
      "queue",
      "stack",
      "priority_queue",
      "pair",
      "tuple",
      "optional",
      "variant",
      "any",
      "shared_ptr",
      "unique_ptr",
      "weak_ptr",
      "atomic",
      "mutex",
      "thread",
      "future",
      "promise",
    ],

    constants: [
      "true",
      "false",
      "nullptr",
      "NULL",
      "EOF",
      "INFINITY",
      "NAN",
      "INT_MAX",
      "INT_MIN",
      "UINT_MAX",
      "LONG_MAX",
      "LONG_MIN",
      "SIZE_MAX",
      "__cplusplus",
      "__LINE__",
      "__FILE__",
      "__func__",
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
      "->",
      "->*",
      "::",
      ".*",
      "...",
    ],

    symbols: /[=><!~?:&|+\-*\/\^%]+/,
    escapes:
      /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8}|[0-7]{1,3})/,
    integersuffix: /(ll|LL|u|U|l|L)?(ll|LL|u|U|l|L)?/,
    floatsuffix: /[fFlL]?/,

    tokenizer: {
      root: [
        // Preprocessor
        [/^\s*#\s*\w+/, "keyword.directive"],

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
        [/\d*\.\d+([eE][\-+]?\d+)?@floatsuffix/, "number.float"],
        [/0[xX][0-9a-fA-F]+@integersuffix/, "number.hex"],
        [/0[bB][01]+@integersuffix/, "number.binary"],
        [/0[0-7]+@integersuffix/, "number.octal"],
        [/\d+@integersuffix/, "number"],

        // Strings
        [/"([^"\\]|\\.)*$/, "string.invalid"],
        [/"/, "string", "@string_double"],
        [/'[^\\']'/, "string"],
        [/(')(@escapes)(')/, ["string", "string.escape", "string"]],
        [/'/, "string.invalid"],
      ],

      whitespace: [
        [/[ \t\r\n]+/, "white"],
        [/\/\*/, "comment", "@comment"],
        [/\/\/.*$/, "comment"],
      ],

      comment: [
        [/[^\/*]+/, "comment"],
        [/\*\//, "comment", "@pop"],
        [/[\/*]/, "comment"],
      ],

      string_double: [
        [/[^\\"]+/, "string"],
        [/@escapes/, "string.escape"],
        [/\\./, "string.escape.invalid"],
        [/"/, "string", "@pop"],
      ],
    },
  });

  // ================================================================
  //  2. LANGUAGE CONFIGURATION (brackets, comments, auto-closing)
  // ================================================================
  monaco.languages.setLanguageConfiguration("cpp", {
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
      { open: "<", close: ">", notIn: ["string"] },
      { open: '"', close: '"', notIn: ["string"] },
      { open: "'", close: "'", notIn: ["string", "comment"] },
    ],
    surroundingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: "<", close: ">" },
      { open: '"', close: '"' },
      { open: "'", close: "'" },
    ],
    folding: {
      markers: {
        start: /^\s*#pragma\s+region\b/,
        end: /^\s*#pragma\s+endregion\b/,
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
    ],
  });

  // ================================================================
  //  3. C++ KNOWLEDGE BASE
  // ================================================================
  const CPP_DOCS = {
    // ── Keywords ──
    auto: {
      detail: "Keyword",
      doc: 'Automatically deduces the type of a variable from its initializer.\n\n```cpp\nauto x = 42;       // int\nauto s = "hello"s; // std::string\n```',
    },
    class: {
      detail: "Keyword",
      doc: "Declares a class type. Members are private by default.\n\n```cpp\nclass MyClass {\npublic:\n    int value;\n    void doSomething();\n};\n```",
    },
    struct: {
      detail: "Keyword",
      doc: "Declares a struct type. Members are public by default.\n\n```cpp\nstruct Point {\n    double x, y;\n};\n```",
    },
    template: {
      detail: "Keyword",
      doc: "Declares a template for generic programming.\n\n```cpp\ntemplate<typename T>\nT max(T a, T b) { return a > b ? a : b; }\n```",
    },
    namespace: {
      detail: "Keyword",
      doc: "Declares a namespace to organize code and prevent name collisions.\n\n```cpp\nnamespace MyLib {\n    void func();\n}\n```",
    },
    typename: {
      detail: "Keyword",
      doc: "Used in template declarations to specify a type parameter, or to disambiguate dependent types.\n\n```cpp\ntemplate<typename T>\nvoid foo(typename T::value_type val);\n```",
    },
    const: {
      detail: "Keyword",
      doc: "Specifies that an object or variable is not modifiable.\n\n```cpp\nconst int MAX = 100;\nvoid func(const std::string& s);\n```",
    },
    constexpr: {
      detail: "Keyword (C++11)",
      doc: "Specifies that a value or function can be evaluated at compile time.\n\n```cpp\nconstexpr int square(int n) { return n * n; }\nconstexpr int val = square(5); // 25 at compile time\n```",
    },
    virtual: {
      detail: "Keyword",
      doc: 'Declares a virtual function for runtime polymorphism.\n\n```cpp\nclass Base {\npublic:\n    virtual void speak() { std::cout << "Base"; }\n};\n```',
    },
    override: {
      detail: "Keyword (C++11)",
      doc: 'Indicates that a member function overrides a virtual function from a base class.\n\n```cpp\nvoid speak() override { std::cout << "Derived"; }\n```',
    },
    final: {
      detail: "Keyword (C++11)",
      doc: "Prevents a class from being inherited or a virtual function from being overridden.",
    },
    static: {
      detail: "Keyword",
      doc: "Declares a variable or function with static storage duration, or a class member shared across all instances.",
    },
    inline: {
      detail: "Keyword",
      doc: "Suggests the compiler to inline-expand a function. In C++17, also used for inline variables.",
    },
    extern: {
      detail: "Keyword",
      doc: "Declares a variable or function that is defined in another translation unit.",
    },
    mutable: {
      detail: "Keyword",
      doc: "Allows a member of a const object to be modified.",
    },
    volatile: {
      detail: "Keyword",
      doc: "Indicates that an object may be changed by something external to the program.",
    },
    explicit: {
      detail: "Keyword",
      doc: "Prevents implicit conversions or copy-initialization for constructors and conversion operators.",
    },
    noexcept: {
      detail: "Keyword (C++11)",
      doc: "Specifies that a function does not throw exceptions.\n\n```cpp\nvoid func() noexcept;\n```",
    },
    decltype: {
      detail: "Keyword (C++11)",
      doc: "Inspects the declared type of an expression.\n\n```cpp\nint x = 5;\ndecltype(x) y = 10; // y is int\n```",
    },
    nullptr: {
      detail: "Literal (C++11)",
      doc: "A null pointer literal of type std::nullptr_t. Preferred over NULL or 0.",
    },
    static_assert: {
      detail: "Keyword (C++11)",
      doc: 'Performs a compile-time assertion.\n\n```cpp\nstatic_assert(sizeof(int) == 4, "int must be 4 bytes");\n```',
    },
    static_cast: {
      detail: "Keyword",
      doc: "Performs a safe, compile-time checked cast.\n\n```cpp\ndouble d = 3.14;\nint i = static_cast<int>(d);\n```",
    },
    dynamic_cast: {
      detail: "Keyword",
      doc: "Performs a runtime checked downcast for polymorphic types.",
    },
    reinterpret_cast: {
      detail: "Keyword",
      doc: "Converts between unrelated pointer types. Use with caution.",
    },
    const_cast: {
      detail: "Keyword",
      doc: "Adds or removes const/volatile qualification.",
    },
    sizeof: {
      detail: "Keyword",
      doc: "Returns the size in bytes of a type or expression.\n\n```cpp\nsize_t s = sizeof(int); // typically 4\n```",
    },
    typeid: {
      detail: "Keyword",
      doc: "Returns type information about an expression or type (requires <typeinfo>).",
    },
    throw: {
      detail: "Keyword",
      doc: 'Throws an exception.\n\n```cpp\nthrow std::runtime_error("error");\n```',
    },
    try: {
      detail: "Keyword",
      doc: "Begins a try block for exception handling.",
    },
    catch: {
      detail: "Keyword",
      doc: "Handles an exception thrown by a try block.\n\n```cpp\ntry { ... }\ncatch (const std::exception& e) { ... }\n```",
    },
    if: {
      detail: "Keyword",
      doc: "Conditional statement.\n\n```cpp\nif (condition) { ... }\nelse if (other) { ... }\nelse { ... }\n```",
    },
    else: { detail: "Keyword", doc: "Alternative branch of an if statement." },
    for: {
      detail: "Keyword",
      doc: "Loop statement.\n\n```cpp\nfor (int i = 0; i < n; ++i) { ... }\nfor (auto& elem : container) { ... } // range-based\n```",
    },
    while: {
      detail: "Keyword",
      doc: "Loop that executes while a condition is true.\n\n```cpp\nwhile (condition) { ... }\n```",
    },
    do: {
      detail: "Keyword",
      doc: "Loop that executes at least once.\n\n```cpp\ndo { ... } while (condition);\n```",
    },
    switch: {
      detail: "Keyword",
      doc: "Multi-way branch statement.\n\n```cpp\nswitch (value) {\n    case 1: ... break;\n    default: ... break;\n}\n```",
    },
    case: { detail: "Keyword", doc: "A label in a switch statement." },
    default: {
      detail: "Keyword",
      doc: "Default label in switch, or default special member function (C++11).",
    },
    break: {
      detail: "Keyword",
      doc: "Exits the nearest enclosing loop or switch statement.",
    },
    continue: {
      detail: "Keyword",
      doc: "Skips to the next iteration of the nearest enclosing loop.",
    },
    return: {
      detail: "Keyword",
      doc: "Returns from a function, optionally with a value.",
    },
    goto: {
      detail: "Keyword",
      doc: "Transfers control to a labeled statement. Generally discouraged.",
    },
    enum: {
      detail: "Keyword",
      doc: "Declares an enumeration type.\n\n```cpp\nenum Color { Red, Green, Blue };\nenum class Fruit { Apple, Banana }; // scoped enum (C++11)\n```",
    },
    union: {
      detail: "Keyword",
      doc: "Declares a union type where all members share the same memory.",
    },
    typedef: {
      detail: "Keyword",
      doc: "Creates an alias for a type.\n\n```cpp\ntypedef unsigned long ulong;\n```\nPrefer `using` in modern C++.",
    },
    using: {
      detail: "Keyword",
      doc: "Introduces a name from a namespace, or creates a type alias (C++11).\n\n```cpp\nusing Vec = std::vector<int>;\nusing namespace std;\n```",
    },
    friend: {
      detail: "Keyword",
      doc: "Grants a function or class access to private/protected members.",
    },
    delete: {
      detail: "Keyword",
      doc: "Deallocates memory (delete expression), or explicitly deletes a function (C++11).\n\n```cpp\ndelete ptr;\nMyClass(const MyClass&) = delete;\n```",
    },
    new: {
      detail: "Keyword",
      doc: "Allocates memory dynamically.\n\n```cpp\nint* p = new int(42);\nint* arr = new int[10];\n```",
    },
    this: {
      detail: "Keyword",
      doc: "Pointer to the current object within a member function.",
    },
    concept: {
      detail: "Keyword (C++20)",
      doc: "Defines a named set of constraints for template arguments.\n\n```cpp\ntemplate<typename T>\nconcept Addable = requires(T a, T b) { a + b; };\n```",
    },
    requires: {
      detail: "Keyword (C++20)",
      doc: "Specifies constraints on template arguments or defines a requires expression.",
    },
    co_await: {
      detail: "Keyword (C++20)",
      doc: "Suspends a coroutine and waits for a result.",
    },
    co_return: {
      detail: "Keyword (C++20)",
      doc: "Returns a value from a coroutine.",
    },
    co_yield: {
      detail: "Keyword (C++20)",
      doc: "Yields a value from a coroutine.",
    },
    import: { detail: "Keyword (C++20)", doc: "Imports a module." },
    module: { detail: "Keyword (C++20)", doc: "Declares a module." },

    // ── Types ──
    int: {
      detail: "Fundamental type",
      doc: "Signed integer type, typically 32 bits.",
    },
    long: {
      detail: "Fundamental type",
      doc: "Signed integer type, at least 32 bits. `long long` is at least 64 bits.",
    },
    short: {
      detail: "Fundamental type",
      doc: "Signed integer type, at least 16 bits.",
    },
    char: {
      detail: "Fundamental type",
      doc: "Character type, exactly 1 byte.",
    },
    bool: {
      detail: "Fundamental type",
      doc: "Boolean type. Values: `true` or `false`.",
    },
    float: {
      detail: "Fundamental type",
      doc: "Single-precision floating point (typically 32-bit IEEE 754).",
    },
    double: {
      detail: "Fundamental type",
      doc: "Double-precision floating point (typically 64-bit IEEE 754).",
    },
    void: {
      detail: "Fundamental type",
      doc: "Incomplete type indicating no value. Used for functions returning nothing.",
    },
    wchar_t: { detail: "Fundamental type", doc: "Wide character type." },
    size_t: {
      detail: "Type alias (<cstddef>)",
      doc: "Unsigned integer type for sizes and counts. Result of `sizeof`.",
    },

    // ── STL Containers ──
    vector: {
      detail: "std::vector<T> (<vector>)",
      doc: "Dynamic array that can grow and shrink.\n\n```cpp\nstd::vector<int> v = {1, 2, 3};\nv.push_back(4);\nv.size(); // 4\n```\nComplexity: O(1) amortized push_back, O(1) random access.",
    },
    map: {
      detail: "std::map<K,V> (<map>)",
      doc: 'Sorted associative container (red-black tree).\n\n```cpp\nstd::map<std::string, int> m;\nm["hello"] = 1;\n```\nComplexity: O(log n) insert/find.',
    },
    unordered_map: {
      detail: "std::unordered_map<K,V> (<unordered_map>)",
      doc: 'Hash table based associative container.\n\n```cpp\nstd::unordered_map<std::string, int> m;\nm["hello"] = 1;\n```\nComplexity: O(1) average insert/find.',
    },
    set: {
      detail: "std::set<T> (<set>)",
      doc: "Sorted container of unique elements (red-black tree).\n\nComplexity: O(log n) insert/find.",
    },
    unordered_set: {
      detail: "std::unordered_set<T> (<unordered_set>)",
      doc: "Hash table based container of unique elements.\n\nComplexity: O(1) average insert/find.",
    },
    string: {
      detail: "std::string (<string>)",
      doc: 'Dynamic string of characters (alias for std::basic_string<char>).\n\n```cpp\nstd::string s = "Hello";\ns += " World";\ns.size(); // 11\n```',
    },
    array: {
      detail: "std::array<T,N> (<array>)",
      doc: "Fixed-size array container.\n\n```cpp\nstd::array<int, 3> a = {1, 2, 3};\n```",
    },
    deque: {
      detail: "std::deque<T> (<deque>)",
      doc: "Double-ended queue supporting O(1) push/pop at both ends.",
    },
    list: {
      detail: "std::list<T> (<list>)",
      doc: "Doubly-linked list. O(1) insert/erase with iterator.",
    },
    queue: {
      detail: "std::queue<T> (<queue>)",
      doc: "FIFO queue adapter (uses deque by default).",
    },
    stack: {
      detail: "std::stack<T> (<stack>)",
      doc: "LIFO stack adapter (uses deque by default).",
    },
    priority_queue: {
      detail: "std::priority_queue<T> (<queue>)",
      doc: "Max-heap based priority queue.\n\n```cpp\nstd::priority_queue<int> pq;\npq.push(3); pq.push(1); pq.push(2);\npq.top(); // 3\n```",
    },
    pair: {
      detail: "std::pair<T1,T2> (<utility>)",
      doc: 'Holds two values of possibly different types.\n\n```cpp\nauto p = std::make_pair(1, "hello");\np.first;  // 1\np.second; // "hello"\n```',
    },
    tuple: {
      detail: "std::tuple<Ts...> (<tuple>)",
      doc: 'Fixed-size collection of heterogeneous values.\n\n```cpp\nauto t = std::make_tuple(1, 2.0, "hi");\nstd::get<0>(t); // 1\n```',
    },
    optional: {
      detail: "std::optional<T> (<optional>) C++17",
      doc: "May or may not contain a value.\n\n```cpp\nstd::optional<int> opt = 42;\nif (opt) { use(*opt); }\n```",
    },
    variant: {
      detail: "std::variant<Ts...> (<variant>) C++17",
      doc: 'Type-safe union.\n\n```cpp\nstd::variant<int, std::string> v = "hello";\n```',
    },
    any: {
      detail: "std::any (<any>) C++17",
      doc: "Type-safe container for single values of any type.",
    },

    // ── Smart Pointers ──
    shared_ptr: {
      detail: "std::shared_ptr<T> (<memory>)",
      doc: "Reference-counted smart pointer. Multiple shared_ptrs can share ownership.\n\n```cpp\nauto sp = std::make_shared<MyClass>(args);\n```",
    },
    unique_ptr: {
      detail: "std::unique_ptr<T> (<memory>)",
      doc: "Exclusive-ownership smart pointer. Cannot be copied, only moved.\n\n```cpp\nauto up = std::make_unique<MyClass>(args);\n```",
    },
    weak_ptr: {
      detail: "std::weak_ptr<T> (<memory>)",
      doc: "Non-owning observer of a shared_ptr. Breaks circular references.",
    },

    // ── Common Functions ──
    cout: {
      detail: "std::cout (<iostream>)",
      doc: 'Standard output stream.\n\n```cpp\nstd::cout << "Hello, World!" << std::endl;\n```',
    },
    cin: {
      detail: "std::cin (<iostream>)",
      doc: "Standard input stream.\n\n```cpp\nint x;\nstd::cin >> x;\n```",
    },
    cerr: {
      detail: "std::cerr (<iostream>)",
      doc: "Standard error stream (unbuffered).",
    },
    endl: {
      detail: "std::endl (<iostream>)",
      doc: 'Inserts a newline and flushes the stream. Consider using "\\n" for better performance.',
    },
    printf: {
      detail: "int printf(const char* fmt, ...) (<cstdio>)",
      doc: "C-style formatted output. Consider using std::cout or std::format (C++20) instead.",
    },
    scanf: {
      detail: "int scanf(const char* fmt, ...) (<cstdio>)",
      doc: "C-style formatted input.",
    },
    sort: {
      detail: "std::sort (<algorithm>)",
      doc: "Sorts elements in a range.\n\n```cpp\nstd::sort(v.begin(), v.end());\nstd::sort(v.begin(), v.end(), std::greater<int>());\n```\nComplexity: O(n log n).",
    },
    find: {
      detail: "std::find (<algorithm>)",
      doc: "Finds the first element equal to a value.\n\n```cpp\nauto it = std::find(v.begin(), v.end(), target);\n```\nComplexity: O(n).",
    },
    count: {
      detail: "std::count (<algorithm>)",
      doc: "Counts elements equal to a value.\n\n```cpp\nint c = std::count(v.begin(), v.end(), target);\n```",
    },
    transform: {
      detail: "std::transform (<algorithm>)",
      doc: "Applies a function to a range and stores results.\n\n```cpp\nstd::transform(v.begin(), v.end(), out.begin(), [](int x){ return x*2; });\n```",
    },
    accumulate: {
      detail: "std::accumulate (<numeric>)",
      doc: "Computes the sum (or fold) of a range.\n\n```cpp\nint sum = std::accumulate(v.begin(), v.end(), 0);\n```",
    },
    max: {
      detail: "std::max (<algorithm>)",
      doc: "Returns the larger of two values or the largest in an initializer list.\n\n```cpp\nint m = std::max(a, b);\nint m2 = std::max({1,2,3});\n```",
    },
    min: {
      detail: "std::min (<algorithm>)",
      doc: "Returns the smaller of two values.",
    },
    swap: {
      detail: "std::swap (<utility>)",
      doc: "Exchanges values of two objects.\n\n```cpp\nstd::swap(a, b);\n```",
    },
    move: {
      detail: "std::move (<utility>)",
      doc: "Casts an expression to an rvalue reference, enabling move semantics.\n\n```cpp\nstd::string s2 = std::move(s1);\n```",
    },
    forward: {
      detail: "std::forward<T> (<utility>)",
      doc: "Perfectly forwards an argument, preserving its value category.",
    },
    make_shared: {
      detail: "std::make_shared<T>(args...) (<memory>)",
      doc: "Creates a shared_ptr with a single allocation.\n\n```cpp\nauto sp = std::make_shared<Widget>(42);\n```",
    },
    make_unique: {
      detail: "std::make_unique<T>(args...) (<memory>) C++14",
      doc: "Creates a unique_ptr.\n\n```cpp\nauto up = std::make_unique<Widget>(42);\n```",
    },
    make_pair: {
      detail: "std::make_pair(a, b) (<utility>)",
      doc: "Creates a std::pair, deducing types.",
    },
    make_tuple: {
      detail: "std::make_tuple(args...) (<tuple>)",
      doc: "Creates a std::tuple, deducing types.",
    },
    begin: {
      detail: "std::begin(container)",
      doc: "Returns an iterator to the beginning.",
    },
    end: {
      detail: "std::end(container)",
      doc: "Returns an iterator to the end.",
    },
    to_string: {
      detail: "std::to_string(val) (<string>)",
      doc: "Converts a numeric value to std::string.",
    },
    stoi: {
      detail: "std::stoi(str) (<string>)",
      doc: "Converts a string to int. Throws on failure.",
    },
    stol: {
      detail: "std::stol(str) (<string>)",
      doc: "Converts a string to long.",
    },
    stod: {
      detail: "std::stod(str) (<string>)",
      doc: "Converts a string to double.",
    },
    getline: {
      detail: "std::getline(stream, string) (<string>)",
      doc: "Reads a line from a stream.\n\n```cpp\nstd::string line;\nstd::getline(std::cin, line);\n```",
    },
    assert: {
      detail: "assert(expr) (<cassert>)",
      doc: "Runtime assertion macro. Aborts program if expression is false (disabled with NDEBUG).",
    },

    // ── Concurrency ──
    thread: {
      detail: "std::thread (<thread>) C++11",
      doc: "Represents a thread of execution.\n\n```cpp\nstd::thread t(func, arg1);\nt.join();\n```",
    },
    mutex: {
      detail: "std::mutex (<mutex>) C++11",
      doc: "Mutual exclusion primitive.\n\n```cpp\nstd::mutex mtx;\nstd::lock_guard<std::mutex> lock(mtx);\n```",
    },
    atomic: {
      detail: "std::atomic<T> (<atomic>) C++11",
      doc: "Provides atomic operations on a value.\n\n```cpp\nstd::atomic<int> counter{0};\ncounter.fetch_add(1);\n```",
    },
    future: {
      detail: "std::future<T> (<future>) C++11",
      doc: "Provides a mechanism to access the result of async operations.",
    },
    promise: {
      detail: "std::promise<T> (<future>) C++11",
      doc: "Provides a facility to store a value to be acquired asynchronously via a future.",
    },
    async: {
      detail: "std::async (<future>) C++11",
      doc: "Runs a function asynchronously and returns a future.\n\n```cpp\nauto f = std::async(std::launch::async, compute, arg);\nf.get();\n```",
    },
  };

  // ── Snippets ──
  const CPP_SNIPPETS = [
    {
      label: "main",
      detail: "Main function",
      insertText:
        "int main(int argc, char* argv[]) {\n\t${1:// code}\n\treturn 0;\n}",
      doc: "Standard C++ main function with arguments.",
    },
    {
      label: "main-simple",
      detail: "Simple main function",
      insertText: "int main() {\n\t${1:// code}\n\treturn 0;\n}",
      doc: "Simple C++ main function.",
    },
    {
      label: "#include",
      detail: "Include header",
      insertText: "#include <${1:iostream}>",
      doc: "Include a standard library header.",
    },
    {
      label: '#include""',
      detail: "Include local header",
      insertText: '#include "${1:header.h}"',
      doc: "Include a local/project header.",
    },
    {
      label: "class",
      detail: "Class declaration",
      insertText:
        "class ${1:ClassName} {\npublic:\n\t${1:ClassName}(${2:});\n\t~${1:ClassName}();\n\nprivate:\n\t${3:// members}\n};",
      doc: "Full class declaration with constructor and destructor.",
    },
    {
      label: "struct",
      detail: "Struct declaration",
      insertText: "struct ${1:Name} {\n\t${2:int value;}\n};",
      doc: "Struct declaration.",
    },
    {
      label: "for",
      detail: "For loop",
      insertText:
        "for (${1:int} ${2:i} = ${3:0}; ${2:i} < ${4:n}; ++${2:i}) {\n\t${5:// body}\n}",
      doc: "Standard for loop.",
    },
    {
      label: "forr",
      detail: "Range-based for loop",
      insertText:
        "for (${1:auto}& ${2:elem} : ${3:container}) {\n\t${4:// body}\n}",
      doc: "Range-based for loop (C++11).",
    },
    {
      label: "forc",
      detail: "Const range-based for loop",
      insertText:
        "for (const ${1:auto}& ${2:elem} : ${3:container}) {\n\t${4:// body}\n}",
      doc: "Const range-based for loop.",
    },
    {
      label: "while",
      detail: "While loop",
      insertText: "while (${1:condition}) {\n\t${2:// body}\n}",
      doc: "While loop.",
    },
    {
      label: "do-while",
      detail: "Do-while loop",
      insertText: "do {\n\t${1:// body}\n} while (${2:condition});",
      doc: "Do-while loop (executes at least once).",
    },
    {
      label: "if",
      detail: "If statement",
      insertText: "if (${1:condition}) {\n\t${2:// body}\n}",
      doc: "If statement.",
    },
    {
      label: "ife",
      detail: "If-else statement",
      insertText:
        "if (${1:condition}) {\n\t${2:// then}\n} else {\n\t${3:// else}\n}",
      doc: "If-else statement.",
    },
    {
      label: "switch",
      detail: "Switch statement",
      insertText:
        "switch (${1:expr}) {\n\tcase ${2:value}:\n\t\t${3:// code}\n\t\tbreak;\n\tdefault:\n\t\t${4:// default}\n\t\tbreak;\n}",
      doc: "Switch statement.",
    },
    {
      label: "try-catch",
      detail: "Try-catch block",
      insertText:
        "try {\n\t${1:// code}\n} catch (const ${2:std::exception}& ${3:e}) {\n\t${4:// handle}\n}",
      doc: "Try-catch exception handling.",
    },
    {
      label: "lambda",
      detail: "Lambda expression",
      insertText: "[${1:&}](${2:auto param}) {\n\t${3:return param;}\n}",
      doc: "Lambda expression (C++11).",
    },
    {
      label: "template-func",
      detail: "Template function",
      insertText:
        "template<typename ${1:T}>\n${2:T} ${3:func}(${4:T param}) {\n\t${5:return param;}\n}",
      doc: "Template function.",
    },
    {
      label: "template-class",
      detail: "Template class",
      insertText:
        "template<typename ${1:T}>\nclass ${2:ClassName} {\npublic:\n\t${2:ClassName}(${1:T} ${3:val}) : ${4:m_val}(${3:val}) {}\n\n\t${1:T} get() const { return ${4:m_val}; }\n\nprivate:\n\t${1:T} ${4:m_val};\n};",
      doc: "Template class with member.",
    },
    {
      label: "enum-class",
      detail: "Scoped enum",
      insertText:
        "enum class ${1:Name} {\n\t${2:Value1},\n\t${3:Value2},\n\t${4:Value3}\n};",
      doc: "Scoped enumeration (C++11).",
    },
    {
      label: "cout",
      detail: "std::cout statement",
      insertText: 'std::cout << ${1:"Hello"} << std::endl;',
      doc: "Output to standard out.",
    },
    {
      label: "cin",
      detail: "std::cin statement",
      insertText: "std::cin >> ${1:variable};",
      doc: "Read from standard input.",
    },
    {
      label: "cerr",
      detail: "std::cerr statement",
      insertText: 'std::cerr << ${1:"Error"} << std::endl;',
      doc: "Output to standard error.",
    },
    {
      label: "vector-init",
      detail: "Vector initialization",
      insertText: "std::vector<${1:int}> ${2:vec} = {${3:1, 2, 3}};",
      doc: "Initialize a vector with values.",
    },
    {
      label: "map-init",
      detail: "Map initialization",
      insertText:
        'std::map<${1:std::string}, ${2:int}> ${3:m} = {\n\t{${4:"key"}, ${5:0}}\n};',
      doc: "Initialize a map.",
    },
    {
      label: "unique-ptr",
      detail: "std::make_unique",
      insertText: "auto ${1:ptr} = std::make_unique<${2:Type}>(${3:args});",
      doc: "Create a unique pointer.",
    },
    {
      label: "shared-ptr",
      detail: "std::make_shared",
      insertText: "auto ${1:ptr} = std::make_shared<${2:Type}>(${3:args});",
      doc: "Create a shared pointer.",
    },
    {
      label: "guard",
      detail: "Include guard",
      insertText:
        "#ifndef ${1:HEADER_H}\n#define ${1:HEADER_H}\n\n${2:// declarations}\n\n#endif // ${1:HEADER_H}",
      doc: "Header include guard.",
    },
    {
      label: "pragma-once",
      detail: "#pragma once",
      insertText: "#pragma once\n\n${1:// declarations}",
      doc: "Pragma once include guard (non-standard but widely supported).",
    },
    {
      label: "namespace",
      detail: "Namespace declaration",
      insertText:
        "namespace ${1:name} {\n\n${2:// code}\n\n} // namespace ${1:name}",
      doc: "Namespace declaration.",
    },
    {
      label: "algo-sort",
      detail: "std::sort",
      insertText: "std::sort(${1:vec}.begin(), ${1:vec}.end()${2:});",
      doc: "Sort a container.",
    },
    {
      label: "algo-find",
      detail: "std::find",
      insertText:
        "auto ${1:it} = std::find(${2:vec}.begin(), ${2:vec}.end(), ${3:value});\nif (${1:it} != ${2:vec}.end()) {\n\t${4:// found}\n}",
      doc: "Find an element in a container.",
    },
    {
      label: "fstream-read",
      detail: "Read file",
      insertText:
        'std::ifstream ${1:file}(${2:"filename.txt"});\nif (${1:file}.is_open()) {\n\tstd::string ${3:line};\n\twhile (std::getline(${1:file}, ${3:line})) {\n\t\t${4:// process line}\n\t}\n\t${1:file}.close();\n}',
      doc: "Read from a file line by line.",
    },
    {
      label: "fstream-write",
      detail: "Write file",
      insertText:
        'std::ofstream ${1:file}(${2:"filename.txt"});\nif (${1:file}.is_open()) {\n\t${1:file} << ${3:"content"} << std::endl;\n\t${1:file}.close();\n}',
      doc: "Write to a file.",
    },
    {
      label: "operator<<",
      detail: "Stream insertion operator",
      insertText:
        "friend std::ostream& operator<<(std::ostream& ${1:os}, const ${2:ClassName}& ${3:obj}) {\n\t${1:os} << ${4:obj.value};\n\treturn ${1:os};\n}",
      doc: "Overload << for std::ostream.",
    },
    {
      label: "rule-of-five",
      detail: "Rule of Five",
      insertText:
        "${1:ClassName}(const ${1:ClassName}& other);                    // copy constructor\n${1:ClassName}(${1:ClassName}&& other) noexcept;                 // move constructor\n${1:ClassName}& operator=(const ${1:ClassName}& other);          // copy assignment\n${1:ClassName}& operator=(${1:ClassName}&& other) noexcept;     // move assignment\n~${1:ClassName}();                                             // destructor",
      doc: "The Rule of Five special member functions.",
    },
    {
      label: "constexpr-func",
      detail: "Constexpr function",
      insertText:
        "constexpr ${1:int} ${2:func}(${3:int n}) {\n\t${4:return n * n;}\n}",
      doc: "Compile-time evaluable function.",
    },
    {
      label: "static_assert",
      detail: "Static assertion",
      insertText: 'static_assert(${1:condition}, ${2:"message"});',
      doc: "Compile-time assertion.",
    },
    {
      label: "concept",
      detail: "Concept definition (C++20)",
      insertText:
        "template<typename ${1:T}>\nconcept ${2:ConceptName} = requires(${1:T} ${3:a}) {\n\t{ ${4:a.size()} } -> std::convertible_to<std::size_t>;\n};",
      doc: "C++20 concept definition.",
    },
  ];

  // Common preprocessor directives
  const PREPROCESSOR = [
    "#include",
    "#define",
    "#undef",
    "#ifdef",
    "#ifndef",
    "#if",
    "#elif",
    "#else",
    "#endif",
    "#pragma",
    "#error",
    "#warning",
    "#line",
  ];

  // ================================================================
  //  4. SYMBOL PARSER (for Go-To-Definition and reference counting)
  // ================================================================
  function parseSymbols(code) {
    const symbols = [];
    const lines = code.split("\n");

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNum = i + 1;

      // Strip strings and comments for matching
      let cleaned = line
        .replace(/\/\/.*$/, "")
        .replace(/"(?:[^"\\]|\\.)*"/g, '""')
        .replace(/'(?:[^'\\]|\\.)*'/g, "''");

      // Function definitions: type name(...) {  or  type name(...) const {
      let m = cleaned.match(
        /^\s*(?:(?:static|inline|virtual|constexpr|explicit|friend|const|volatile|unsigned|signed|long|short)\s+)*([a-zA-Z_][\w:*&<>, ]*?)\s+([a-zA-Z_]\w*)\s*\(([^)]*)\)\s*(?:const)?\s*(?:noexcept)?\s*(?:override)?\s*(?:final)?\s*\{?\s*$/,
      );
      if (
        m &&
        ![
          "if",
          "else",
          "for",
          "while",
          "do",
          "switch",
          "catch",
          "return",
          "case",
          "throw",
        ].includes(m[2])
      ) {
        const col = line.indexOf(m[2]) + 1;
        symbols.push({
          name: m[2],
          kind: "function",
          returnType: m[1].trim(),
          params: m[3].trim(),
          line: lineNum,
          col: col,
        });
        continue;
      }

      // Class / struct / enum
      m = cleaned.match(
        /^\s*(class|struct|enum\s+class|enum)\s+([a-zA-Z_]\w*)/,
      );
      if (m) {
        const col = line.indexOf(m[2]) + 1;
        symbols.push({
          name: m[2],
          kind: m[1].replace(/\s+/g, "_"),
          line: lineNum,
          col: col,
        });
        continue;
      }

      // Namespace
      m = cleaned.match(/^\s*namespace\s+([a-zA-Z_]\w*)/);
      if (m) {
        const col = line.indexOf(m[1]) + 1;
        symbols.push({
          name: m[1],
          kind: "namespace",
          line: lineNum,
          col: col,
        });
        continue;
      }

      // Typedef / using alias
      m = cleaned.match(
        /^\s*(?:typedef\s+.+\s+([a-zA-Z_]\w*)\s*;|using\s+([a-zA-Z_]\w*)\s*=)/,
      );
      if (m) {
        const name = m[1] || m[2];
        const col = line.indexOf(name) + 1;
        symbols.push({ name: name, kind: "typedef", line: lineNum, col: col });
        continue;
      }

      // #define
      m = cleaned.match(
        /^\s*#\s*define\s+([a-zA-Z_]\w*)(?:\(([^)]*)\))?\s*(.*)?/,
      );
      if (m) {
        const col = line.indexOf(m[1]) + 1;
        symbols.push({
          name: m[1],
          kind: "macro",
          params: m[2],
          value: m[3],
          line: lineNum,
          col: col,
        });
        continue;
      }

      // Variable declarations (simple heuristic)
      m = cleaned.match(
        /^\s*(?:(?:static|const|constexpr|inline|extern|thread_local|volatile|unsigned|signed|long|short|auto)\s+)*([a-zA-Z_][\w:*&<>, ]+?)\s+([a-zA-Z_]\w*)\s*[=;{(]/,
      );
      if (
        m &&
        ![
          "if",
          "else",
          "for",
          "while",
          "do",
          "switch",
          "catch",
          "return",
          "case",
          "throw",
          "class",
          "struct",
          "enum",
          "namespace",
          "template",
          "using",
          "typedef",
          "delete",
          "new",
        ].includes(m[2]) &&
        !["public", "private", "protected"].includes(m[2])
      ) {
        const col = line.indexOf(m[2]) + 1;
        symbols.push({
          name: m[2],
          kind: "variable",
          type: m[1].trim(),
          line: lineNum,
          col: col,
        });
      }
    }
    return symbols;
  }

  let currentSymbols = [];
  function updateSymbols(model) {
    currentSymbols = parseSymbols(model.getValue());
    const symbolCount = document.getElementById("symbolCount");
    if (symbolCount) {
      symbolCount.textContent = `Symbols: ${currentSymbols.length}`;
    }
  }

  // ================================================================
  //  5. COMPLETION PROVIDER
  // ================================================================
  monaco.languages.registerCompletionItemProvider("cpp", {
    triggerCharacters: [".", ":", "<", "#", '"'],
    provideCompletionItems: function (model, position, context) {
      const textUntilPosition = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };

      const suggestions = [];

      // Preprocessor
      if (textUntilPosition.match(/^\s*#/)) {
        PREPROCESSOR.forEach((p) => {
          suggestions.push({
            label: p,
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: p.replace("#", ""),
            range: range,
            detail: "Preprocessor directive",
          });
        });
        // Common includes
        const headers = [
          "iostream",
          "vector",
          "string",
          "map",
          "set",
          "unordered_map",
          "unordered_set",
          "algorithm",
          "numeric",
          "functional",
          "memory",
          "cassert",
          "cmath",
          "cstdio",
          "cstdlib",
          "cstring",
          "fstream",
          "sstream",
          "iomanip",
          "iterator",
          "stdexcept",
          "typeinfo",
          "type_traits",
          "utility",
          "tuple",
          "array",
          "deque",
          "list",
          "queue",
          "stack",
          "bitset",
          "regex",
          "chrono",
          "thread",
          "mutex",
          "atomic",
          "future",
          "condition_variable",
          "filesystem",
          "optional",
          "variant",
          "any",
          "span",
          "ranges",
          "format",
          "concepts",
          "coroutine",
          "numbers",
        ];
        if (textUntilPosition.match(/#\s*include\s*</)) {
          headers.forEach((h) => {
            suggestions.push({
              label: h,
              kind: monaco.languages.CompletionItemKind.File,
              insertText: h + ">",
              range: range,
              detail: `<${h}> — Standard library header`,
            });
          });
        }
        return { suggestions };
      }

      // After "std::" — provide STL suggestions
      if (textUntilPosition.match(/std\s*::\s*\w*$/)) {
        const stdItems = [
          "cout",
          "cin",
          "cerr",
          "clog",
          "endl",
          "string",
          "wstring",
          "string_view",
          "vector",
          "map",
          "multimap",
          "set",
          "multiset",
          "unordered_map",
          "unordered_multimap",
          "unordered_set",
          "unordered_multiset",
          "list",
          "deque",
          "array",
          "queue",
          "priority_queue",
          "stack",
          "pair",
          "tuple",
          "optional",
          "variant",
          "any",
          "shared_ptr",
          "unique_ptr",
          "weak_ptr",
          "make_shared",
          "make_unique",
          "make_pair",
          "make_tuple",
          "move",
          "forward",
          "swap",
          "begin",
          "end",
          "sort",
          "stable_sort",
          "find",
          "find_if",
          "count",
          "count_if",
          "for_each",
          "transform",
          "accumulate",
          "reduce",
          "copy",
          "fill",
          "reverse",
          "rotate",
          "unique",
          "remove",
          "remove_if",
          "replace",
          "max",
          "min",
          "max_element",
          "min_element",
          "clamp",
          "lower_bound",
          "upper_bound",
          "binary_search",
          "next_permutation",
          "prev_permutation",
          "iota",
          "gcd",
          "lcm",
          "distance",
          "advance",
          "next",
          "prev",
          "to_string",
          "stoi",
          "stol",
          "stoll",
          "stof",
          "stod",
          "getline",
          "get",
          "tie",
          "thread",
          "mutex",
          "lock_guard",
          "unique_lock",
          "scoped_lock",
          "atomic",
          "future",
          "promise",
          "async",
          "function",
          "bind",
          "ref",
          "cref",
          "numeric_limits",
          "type_traits",
          "runtime_error",
          "logic_error",
          "invalid_argument",
          "out_of_range",
          "overflow_error",
          "underflow_error",
          "exception",
          "ifstream",
          "ofstream",
          "fstream",
          "stringstream",
          "istringstream",
          "ostringstream",
          "setw",
          "setprecision",
          "fixed",
          "scientific",
          "hex",
          "dec",
          "oct",
          "bitset",
          "complex",
          "regex",
          "smatch",
          "regex_match",
          "regex_search",
          "chrono",
          "filesystem",
          "nullptr_t",
          "size_t",
          "ptrdiff_t",
          "initializer_list",
          "allocator",
          "hash",
          "equal_to",
          "less",
          "greater",
          "plus",
          "minus",
          "multiplies",
          "divides",
          "modulus",
          "negate",
          "format",
          "print",
          "println",
          "span",
          "ranges",
          "views",
        ];
        stdItems.forEach((item) => {
          const info = CPP_DOCS[item];
          suggestions.push({
            label: item,
            kind: info
              ? item[0] === item[0].toUpperCase() ||
                [
                  "vector",
                  "map",
                  "set",
                  "string",
                  "list",
                  "deque",
                  "array",
                  "queue",
                  "stack",
                  "pair",
                  "tuple",
                  "optional",
                  "variant",
                  "any",
                  "shared_ptr",
                  "unique_ptr",
                  "weak_ptr",
                  "atomic",
                  "mutex",
                  "thread",
                  "future",
                  "promise",
                  "bitset",
                  "complex",
                  "regex",
                  "function",
                ].includes(item)
                ? monaco.languages.CompletionItemKind.Class
                : monaco.languages.CompletionItemKind.Function
              : monaco.languages.CompletionItemKind.Text,
            insertText: item,
            range: range,
            detail: info ? info.detail : `std::${item}`,
            documentation: info ? { value: info.doc } : undefined,
            sortText: "0_" + item,
          });
        });
        return { suggestions };
      }

      // Member access after "." or "->"
      if (
        textUntilPosition.match(/\.\s*\w*$/) ||
        textUntilPosition.match(/->\s*\w*$/)
      ) {
        const memberMethods = [
          {
            label: "push_back",
            detail: "void push_back(const T& val)",
            doc: "Adds element to the end.",
          },
          {
            label: "pop_back",
            detail: "void pop_back()",
            doc: "Removes the last element.",
          },
          {
            label: "size",
            detail: "size_t size() const",
            doc: "Returns the number of elements.",
          },
          {
            label: "empty",
            detail: "bool empty() const",
            doc: "Checks if the container is empty.",
          },
          {
            label: "clear",
            detail: "void clear()",
            doc: "Removes all elements.",
          },
          {
            label: "begin",
            detail: "iterator begin()",
            doc: "Returns iterator to the beginning.",
          },
          {
            label: "end",
            detail: "iterator end()",
            doc: "Returns iterator to the end.",
          },
          {
            label: "rbegin",
            detail: "reverse_iterator rbegin()",
            doc: "Returns reverse iterator to the end.",
          },
          {
            label: "rend",
            detail: "reverse_iterator rend()",
            doc: "Returns reverse iterator to the beginning.",
          },
          {
            label: "front",
            detail: "T& front()",
            doc: "Returns reference to the first element.",
          },
          {
            label: "back",
            detail: "T& back()",
            doc: "Returns reference to the last element.",
          },
          {
            label: "at",
            detail: "T& at(size_t pos)",
            doc: "Returns element at position with bounds checking.",
          },
          {
            label: "data",
            detail: "T* data()",
            doc: "Returns pointer to the underlying array.",
          },
          {
            label: "reserve",
            detail: "void reserve(size_t n)",
            doc: "Reserves storage capacity.",
          },
          {
            label: "resize",
            detail: "void resize(size_t n)",
            doc: "Resizes the container.",
          },
          {
            label: "capacity",
            detail: "size_t capacity() const",
            doc: "Returns the allocated capacity.",
          },
          {
            label: "shrink_to_fit",
            detail: "void shrink_to_fit()",
            doc: "Reduces capacity to size.",
          },
          {
            label: "insert",
            detail: "iterator insert(pos, val)",
            doc: "Inserts element(s) at position.",
          },
          {
            label: "erase",
            detail: "iterator erase(pos)",
            doc: "Erases element(s) at position.",
          },
          {
            label: "emplace_back",
            detail: "void emplace_back(args...)",
            doc: "Constructs element in-place at the end.",
          },
          {
            label: "emplace",
            detail: "iterator emplace(pos, args...)",
            doc: "Constructs element in-place at position.",
          },
          {
            label: "find",
            detail: "iterator find(key)",
            doc: "Finds element with given key.",
          },
          {
            label: "count",
            detail: "size_t count(key)",
            doc: "Counts elements with given key.",
          },
          {
            label: "contains",
            detail: "bool contains(key) (C++20)",
            doc: "Checks if container has element.",
          },
          {
            label: "swap",
            detail: "void swap(other)",
            doc: "Swaps contents with another container.",
          },
          {
            label: "push",
            detail: "void push(const T& val)",
            doc: "Pushes element (stack/queue).",
          },
          {
            label: "pop",
            detail: "void pop()",
            doc: "Removes top/front element (stack/queue).",
          },
          {
            label: "top",
            detail: "T& top()",
            doc: "Access top element (stack/priority_queue).",
          },
          { label: "first", detail: "T1 first", doc: "First element of pair." },
          {
            label: "second",
            detail: "T2 second",
            doc: "Second element of pair.",
          },
          {
            label: "c_str",
            detail: "const char* c_str() const",
            doc: "Returns C-style string.",
          },
          {
            label: "length",
            detail: "size_t length() const",
            doc: "Returns string length.",
          },
          {
            label: "substr",
            detail: "string substr(pos, len)",
            doc: "Returns a substring.",
          },
          {
            label: "find",
            detail: "size_t find(str, pos)",
            doc: "Finds first occurrence of substring.",
          },
          {
            label: "rfind",
            detail: "size_t rfind(str, pos)",
            doc: "Finds last occurrence of substring.",
          },
          {
            label: "append",
            detail: "string& append(str)",
            doc: "Appends to the string.",
          },
          {
            label: "replace",
            detail: "string& replace(pos, len, str)",
            doc: "Replaces part of the string.",
          },
          {
            label: "compare",
            detail: "int compare(str)",
            doc: "Compares strings.",
          },
          {
            label: "starts_with",
            detail: "bool starts_with(sv) (C++20)",
            doc: "Checks if string starts with given prefix.",
          },
          {
            label: "ends_with",
            detail: "bool ends_with(sv) (C++20)",
            doc: "Checks if string ends with given suffix.",
          },
          {
            label: "get",
            detail: "T* get()",
            doc: "Returns the stored pointer (smart pointer).",
          },
          {
            label: "reset",
            detail: "void reset(ptr)",
            doc: "Replaces the managed object (smart pointer).",
          },
          {
            label: "release",
            detail: "T* release()",
            doc: "Releases ownership (unique_ptr).",
          },
          {
            label: "use_count",
            detail: "long use_count()",
            doc: "Returns the reference count (shared_ptr).",
          },
          {
            label: "lock",
            detail: "shared_ptr<T> lock()",
            doc: "Creates shared_ptr from weak_ptr.",
          },
          {
            label: "expired",
            detail: "bool expired()",
            doc: "Checks if managed object is deleted (weak_ptr).",
          },
          {
            label: "has_value",
            detail: "bool has_value() const",
            doc: "Checks if optional contains a value.",
          },
          {
            label: "value",
            detail: "T& value()",
            doc: "Returns the contained value or throws.",
          },
          {
            label: "value_or",
            detail: "T value_or(default)",
            doc: "Returns contained value or default.",
          },
          {
            label: "index",
            detail: "size_t index() const",
            doc: "Returns the index of the held type (variant).",
          },
          {
            label: "join",
            detail: "void join()",
            doc: "Waits for thread to finish.",
          },
          { label: "detach", detail: "void detach()", doc: "Detaches thread." },
          {
            label: "joinable",
            detail: "bool joinable()",
            doc: "Checks if thread is joinable.",
          },
          {
            label: "wait",
            detail: "void wait()",
            doc: "Waits for the result (future).",
          },
          {
            label: "is_open",
            detail: "bool is_open()",
            doc: "Checks if file stream is open.",
          },
          {
            label: "close",
            detail: "void close()",
            doc: "Closes the file stream.",
          },
          {
            label: "str",
            detail: "string str()",
            doc: "Returns string copy of stringstream content.",
          },
          {
            label: "operator[]",
            detail: "T& operator[](index)",
            doc: "Access element by index/key.",
          },
        ];
        memberMethods.forEach((m) => {
          suggestions.push({
            label: m.label,
            kind:
              m.label === "first" || m.label === "second"
                ? monaco.languages.CompletionItemKind.Field
                : monaco.languages.CompletionItemKind.Method,
            insertText: m.label,
            range: range,
            detail: m.detail,
            documentation: { value: m.doc },
          });
        });
        return { suggestions };
      }

      // ── Snippets ──
      CPP_SNIPPETS.forEach((s) => {
        suggestions.push({
          label: s.label,
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: s.insertText,
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range: range,
          detail: s.detail,
          documentation: { value: s.doc },
          sortText: "1_" + s.label,
        });
      });

      // ── Keywords ──
      const allKeywords = [
        "alignas",
        "alignof",
        "and",
        "and_eq",
        "asm",
        "auto",
        "bitand",
        "bitor",
        "break",
        "case",
        "catch",
        "class",
        "compl",
        "concept",
        "const",
        "consteval",
        "constexpr",
        "constinit",
        "const_cast",
        "continue",
        "co_await",
        "co_return",
        "co_yield",
        "decltype",
        "default",
        "delete",
        "do",
        "dynamic_cast",
        "else",
        "enum",
        "explicit",
        "export",
        "extern",
        "final",
        "for",
        "friend",
        "goto",
        "if",
        "import",
        "inline",
        "module",
        "mutable",
        "namespace",
        "new",
        "noexcept",
        "not",
        "not_eq",
        "operator",
        "or",
        "or_eq",
        "override",
        "private",
        "protected",
        "public",
        "register",
        "reinterpret_cast",
        "requires",
        "return",
        "sizeof",
        "static",
        "static_assert",
        "static_cast",
        "struct",
        "switch",
        "template",
        "this",
        "thread_local",
        "throw",
        "try",
        "typedef",
        "typeid",
        "typename",
        "union",
        "using",
        "virtual",
        "volatile",
        "while",
        "xor",
        "xor_eq",
      ];
      allKeywords.forEach((kw) => {
        const info = CPP_DOCS[kw];
        suggestions.push({
          label: kw,
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: kw,
          range: range,
          detail: info ? info.detail : "Keyword",
          documentation: info ? { value: info.doc } : undefined,
          sortText: "2_" + kw,
        });
      });

      // ── Type keywords ──
      const types = [
        "bool",
        "char",
        "char8_t",
        "char16_t",
        "char32_t",
        "double",
        "float",
        "int",
        "long",
        "short",
        "signed",
        "unsigned",
        "void",
        "wchar_t",
        "int8_t",
        "int16_t",
        "int32_t",
        "int64_t",
        "uint8_t",
        "uint16_t",
        "uint32_t",
        "uint64_t",
        "size_t",
        "ptrdiff_t",
        "nullptr_t",
      ];
      types.forEach((t) => {
        const info = CPP_DOCS[t];
        suggestions.push({
          label: t,
          kind: monaco.languages.CompletionItemKind.TypeParameter,
          insertText: t,
          range: range,
          detail: info ? info.detail : "Type",
          documentation: info ? { value: info.doc } : undefined,
          sortText: "3_" + t,
        });
      });

      // ── User-defined symbols ──
      currentSymbols.forEach((sym) => {
        let kind;
        switch (sym.kind) {
          case "function":
            kind = monaco.languages.CompletionItemKind.Function;
            break;
          case "class":
          case "struct":
            kind = monaco.languages.CompletionItemKind.Class;
            break;
          case "enum":
          case "enum_class":
            kind = monaco.languages.CompletionItemKind.Enum;
            break;
          case "namespace":
            kind = monaco.languages.CompletionItemKind.Module;
            break;
          case "macro":
            kind = monaco.languages.CompletionItemKind.Constant;
            break;
          case "typedef":
            kind = monaco.languages.CompletionItemKind.Interface;
            break;
          default:
            kind = monaco.languages.CompletionItemKind.Variable;
        }
        let detail = sym.kind;
        if (sym.returnType)
          detail = `${sym.returnType} ${sym.name}(${sym.params || ""})`;
        else if (sym.type) detail = `${sym.type} ${sym.name}`;

        suggestions.push({
          label: sym.name,
          kind: kind,
          insertText: sym.name,
          range: range,
          detail: detail,
          documentation: { value: `Defined at line ${sym.line}` },
          sortText: "0_" + sym.name,
        });
      });

      return { suggestions };
    },
  });

  // ================================================================
  //  6. HOVER PROVIDER
  // ================================================================
  monaco.languages.registerHoverProvider("cpp", {
    provideHover: function (model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return null;
      const token = word.word;

      // Check knowledge base
      const info = CPP_DOCS[token];
      if (info) {
        return {
          range: new monaco.Range(
            position.lineNumber,
            word.startColumn,
            position.lineNumber,
            word.endColumn,
          ),
          contents: [{ value: `**${info.detail}**` }, { value: info.doc }],
        };
      }

      // Check user symbols
      const sym = currentSymbols.find((s) => s.name === token);
      if (sym) {
        let sig = "";
        if (sym.kind === "function") {
          sig = `\`\`\`cpp\n${sym.returnType || ""} ${sym.name}(${sym.params || ""})\n\`\`\``;
        } else if (sym.kind === "class" || sym.kind === "struct") {
          sig = `\`\`\`cpp\n${sym.kind} ${sym.name}\n\`\`\``;
        } else if (sym.kind === "enum" || sym.kind === "enum_class") {
          sig = `\`\`\`cpp\nenum ${sym.kind === "enum_class" ? "class " : ""}${sym.name}\n\`\`\``;
        } else if (sym.kind === "namespace") {
          sig = `\`\`\`cpp\nnamespace ${sym.name}\n\`\`\``;
        } else if (sym.kind === "macro") {
          sig = `\`\`\`cpp\n#define ${sym.name}${sym.params !== undefined ? "(" + (sym.params || "") + ")" : ""}${sym.value ? " " + sym.value : ""}\n\`\`\``;
        } else if (sym.kind === "typedef") {
          sig = `\`\`\`cpp\ntypedef/using ${sym.name}\n\`\`\``;
        } else if (sym.kind === "variable") {
          sig = `\`\`\`cpp\n${sym.type || "auto"} ${sym.name}\n\`\`\``;
        }
        return {
          range: new monaco.Range(
            position.lineNumber,
            word.startColumn,
            position.lineNumber,
            word.endColumn,
          ),
          contents: [
            { value: sig },
            { value: `*Defined at line ${sym.line}*` },
          ],
        };
      }

      return null;
    },
  });

  // ================================================================
  //  7. DEFINITION PROVIDER (Go To Definition)
  // ================================================================
  monaco.languages.registerDefinitionProvider("cpp", {
    provideDefinition: function (model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return null;
      const token = word.word;

      const sym = currentSymbols.find((s) => s.name === token);
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

  // ================================================================
  //  8. SIGNATURE HELP PROVIDER
  // ================================================================
  monaco.languages.registerSignatureHelpProvider("cpp", {
    signatureHelpTriggerCharacters: ["(", ","],
    provideSignatureHelp: function (model, position) {
      const textUntil = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });

      // Find the function name before the opening paren
      const match = textUntil.match(/([a-zA-Z_]\w*)\s*\(([^)]*)$/);
      if (!match) return null;

      const funcName = match[1];
      const argsText = match[2];
      // Count commas to determine active parameter
      const activeParam = (argsText.match(/,/g) || []).length;

      // Check user symbols
      const sym = currentSymbols.find(
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
                label: `${sym.returnType || "void"} ${sym.name}(${sym.params || ""})`,
                parameters: params.map((p) => ({
                  label: p,
                  documentation: "",
                })),
                documentation: `Function defined at line ${sym.line}`,
              },
            ],
            activeSignature: 0,
            activeParameter: activeParam,
          },
          dispose: function () {},
        };
      }

      // Built-in signatures for common functions
      const builtinSigs = {
        sort: {
          label:
            "void std::sort(RandomIt first, RandomIt last, Compare comp = {})",
          params: [
            {
              label: "RandomIt first",
              documentation: "Iterator to the beginning of the range",
            },
            {
              label: "RandomIt last",
              documentation: "Iterator to the end of the range",
            },
            {
              label: "Compare comp",
              documentation: "Comparison function (optional)",
            },
          ],
          doc: "Sorts elements in ascending order. Complexity: O(n log n).",
        },
        find: {
          label:
            "InputIt std::find(InputIt first, InputIt last, const T& value)",
          params: [
            {
              label: "InputIt first",
              documentation: "Iterator to the beginning",
            },
            { label: "InputIt last", documentation: "Iterator to the end" },
            { label: "const T& value", documentation: "Value to search for" },
          ],
          doc: "Finds the first element equal to value.",
        },
        make_shared: {
          label: "std::shared_ptr<T> std::make_shared<T>(Args&&... args)",
          params: [
            {
              label: "Args&&... args",
              documentation: "Arguments forwarded to constructor of T",
            },
          ],
          doc: "Creates a shared_ptr managing a new object.",
        },
        make_unique: {
          label: "std::unique_ptr<T> std::make_unique<T>(Args&&... args)",
          params: [
            {
              label: "Args&&... args",
              documentation: "Arguments forwarded to constructor of T",
            },
          ],
          doc: "Creates a unique_ptr managing a new object.",
        },
        printf: {
          label: "int printf(const char* format, ...)",
          params: [
            { label: "const char* format", documentation: "Format string" },
            { label: "...", documentation: "Additional arguments" },
          ],
          doc: "Prints formatted output to stdout.",
        },
        scanf: {
          label: "int scanf(const char* format, ...)",
          params: [
            { label: "const char* format", documentation: "Format string" },
            { label: "...", documentation: "Pointers to receiving variables" },
          ],
          doc: "Reads formatted input from stdin.",
        },
        accumulate: {
          label: "T std::accumulate(InputIt first, InputIt last, T init)",
          params: [
            { label: "InputIt first", documentation: "Iterator to beginning" },
            { label: "InputIt last", documentation: "Iterator to end" },
            {
              label: "T init",
              documentation: "Initial value for accumulation",
            },
          ],
          doc: "Computes the sum of init and the elements in the range.",
        },
        getline: {
          label:
            "istream& std::getline(istream& is, string& str, char delim = '\\n')",
          params: [
            { label: "istream& is", documentation: "Input stream" },
            { label: "string& str", documentation: "String to store the line" },
            {
              label: "char delim",
              documentation: "Delimiter character (default: newline)",
            },
          ],
          doc: "Reads a line from the input stream.",
        },
        transform: {
          label:
            "OutputIt std::transform(InputIt first, InputIt last, OutputIt d_first, UnaryOp op)",
          params: [
            {
              label: "InputIt first",
              documentation: "Iterator to beginning of input",
            },
            {
              label: "InputIt last",
              documentation: "Iterator to end of input",
            },
            {
              label: "OutputIt d_first",
              documentation: "Iterator to beginning of output",
            },
            { label: "UnaryOp op", documentation: "Unary operation to apply" },
          ],
          doc: "Applies the given function to a range and stores the result.",
        },
      };

      const bsig = builtinSigs[funcName];
      if (bsig) {
        return {
          value: {
            signatures: [
              {
                label: bsig.label,
                parameters: bsig.params,
                documentation: bsig.doc,
              },
            ],
            activeSignature: 0,
            activeParameter: activeParam,
          },
          dispose: function () {},
        };
      }

      return null;
    },
  });

  // ================================================================
  //  9. DOCUMENT SYMBOL PROVIDER (Outline / Breadcrumbs)
  // ================================================================
  monaco.languages.registerDocumentSymbolProvider("cpp", {
    provideDocumentSymbols: function (model) {
      updateSymbols(model);
      return currentSymbols.map((sym) => {
        let kind;
        switch (sym.kind) {
          case "function":
            kind = monaco.languages.SymbolKind.Function;
            break;
          case "class":
            kind = monaco.languages.SymbolKind.Class;
            break;
          case "struct":
            kind = monaco.languages.SymbolKind.Struct;
            break;
          case "enum":
          case "enum_class":
            kind = monaco.languages.SymbolKind.Enum;
            break;
          case "namespace":
            kind = monaco.languages.SymbolKind.Namespace;
            break;
          case "macro":
            kind = monaco.languages.SymbolKind.Constant;
            break;
          case "typedef":
            kind = monaco.languages.SymbolKind.Interface;
            break;
          case "variable":
            kind = monaco.languages.SymbolKind.Variable;
            break;
          default:
            kind = monaco.languages.SymbolKind.Variable;
        }
        const r = new monaco.Range(
          sym.line,
          sym.col,
          sym.line,
          sym.col + sym.name.length,
        );
        return {
          name: sym.name,
          detail: sym.kind,
          kind: kind,
          range: r,
          selectionRange: r,
        };
      });
    },
  });

  // ================================================================
  //  10. CODE ACTION PROVIDER (quick fixes)
  // ================================================================
  monaco.languages.registerCodeActionProvider("cpp", {
    provideCodeActions: function (model, range, context) {
      const actions = [];
      const lineContent = model.getLineContent(range.startLineNumber);

      // Suggest adding semicolon
      if (
        lineContent.match(/[^;{}\s:\/]\s*$/) &&
        !lineContent.match(/^\s*#/) &&
        !lineContent.match(/^\s*(\/\/|\/\*|\*)/) &&
        !lineContent.match(/\{\s*$/) &&
        !lineContent.match(/^\s*(public|private|protected|case|default)\s*:/) &&
        !lineContent.match(/^\s*(if|else|for|while|do|switch|try|catch)\b/)
      ) {
        // Don't suggest too aggressively
      }

      // Suggest std:: prefix
      const word = model.getWordAtPosition({
        lineNumber: range.startLineNumber,
        column: range.startColumn,
      });
      if (word) {
        const stdTypes = [
          "vector",
          "map",
          "set",
          "string",
          "cout",
          "cin",
          "endl",
          "array",
          "deque",
          "list",
          "pair",
          "tuple",
          "optional",
          "variant",
          "shared_ptr",
          "unique_ptr",
          "sort",
          "find",
          "unordered_map",
          "unordered_set",
          "queue",
          "stack",
          "priority_queue",
        ];
        if (stdTypes.includes(word.word)) {
          const lineText = model.getLineContent(range.startLineNumber);
          const beforeWord = lineText.substring(0, word.startColumn - 1);
          if (!beforeWord.endsWith("std::") && !beforeWord.endsWith("::")) {
            actions.push({
              title: `Add std:: prefix → std::${word.word}`,
              kind: "quickfix",
              edit: {
                edits: [
                  {
                    resource: model.uri,
                    textEdit: {
                      range: new monaco.Range(
                        range.startLineNumber,
                        word.startColumn,
                        range.startLineNumber,
                        word.endColumn,
                      ),
                      text: `std::${word.word}`,
                    },
                    versionId: model.getVersionId(),
                  },
                ],
              },
            });
          }
        }
      }

      return { actions, dispose: function () {} };
    },
  });

  // ================================================================
  //  11. FOLDING RANGE PROVIDER
  // ================================================================
  monaco.languages.registerFoldingRangeProvider("cpp", {
    provideFoldingRanges: function (model) {
      const ranges = [];
      const lines = model.getLinesContent();
      const stack = [];

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        // #pragma region
        if (line.match(/^\s*#pragma\s+region/)) {
          stack.push({
            start: i + 1,
            kind: monaco.languages.FoldingRangeKind.Region,
          });
        }
        if (line.match(/^\s*#pragma\s+endregion/) && stack.length > 0) {
          const item = stack.pop();
          if (item.kind === monaco.languages.FoldingRangeKind.Region) {
            ranges.push({ start: item.start, end: i + 1, kind: item.kind });
          }
        }
        // Block comments
        if (line.match(/\/\*/) && !line.match(/\*\//)) {
          stack.push({
            start: i + 1,
            kind: monaco.languages.FoldingRangeKind.Comment,
          });
        }
        if (
          line.match(/\*\//) &&
          stack.length > 0 &&
          stack[stack.length - 1].kind ===
            monaco.languages.FoldingRangeKind.Comment
        ) {
          const item = stack.pop();
          ranges.push({ start: item.start, end: i + 1, kind: item.kind });
        }
      }
      return ranges;
    },
  });
};
