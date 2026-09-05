import type * as Monaco from "monaco-editor";

export default (monaco: typeof Monaco) => {
  // ═══════════════════════════════════════════════════════
  // 1. REGISTER LANGUAGE
  // ═══════════════════════════════════════════════════════

  monaco.languages.register({
    id: "swift",
    extensions: [".swift"],
    aliases: ["Swift", "swift"],
    mimetypes: ["text/swift"],
  });

  // ═══════════════════════════════════════════════════════
  // 2. LANGUAGE CONFIGURATION
  // ═══════════════════════════════════════════════════════

  monaco.languages.setLanguageConfiguration("swift", {
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
      { open: "`", close: "`", notIn: ["string", "comment"] },
      { open: "/**", close: " */", notIn: ["string"] },
    ],
    surroundingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: '"', close: '"' },
      { open: "<", close: ">" },
      { open: "`", close: "`" },
    ],
    folding: {
      markers: { start: /^\s*\/\/\s*MARK:\s*-/, end: /^\s*$/ },
    },
    wordPattern:
      /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
    indentationRules: {
      increaseIndentPattern:
        /^((?!\/\/).)*(\{[^}"'`]*|\([^)"'`]*|\[[^\]"'`]*)$/,
      decreaseIndentPattern: /^\s*[\}\]\)]/,
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
        beforeText: /^\s*\/\*\*(?!\/)([^\*]|\*(?!\/))*$/,
        action: {
          indentAction: monaco.languages.IndentAction.IndentOutdent,
          appendText: " * ",
        },
      },
      {
        beforeText: /^\s*\/\*\*\/\s*$/,
        action: {
          indentAction: monaco.languages.IndentAction.None,
          removeText: 1,
        },
      },
    ],
  });

  // ═══════════════════════════════════════════════════════
  // 3. MONARCH TOKENIZER — Syntax Highlighting
  // ═══════════════════════════════════════════════════════

  monaco.languages.setMonarchTokensProvider("swift", {
    defaultToken: "",
    tokenPostfix: ".swift",

    keywords: [
      "actor",
      "as",
      "associatedtype",
      "async",
      "await",
      "break",
      "case",
      "catch",
      "class",
      "continue",
      "default",
      "defer",
      "deinit",
      "do",
      "else",
      "enum",
      "extension",
      "fallthrough",
      "fileprivate",
      "final",
      "for",
      "func",
      "get",
      "guard",
      "if",
      "import",
      "in",
      "indirect",
      "infix",
      "init",
      "inout",
      "internal",
      "is",
      "isolated",
      "lazy",
      "let",
      "mutating",
      "nonisolated",
      "nonmutating",
      "open",
      "operator",
      "optional",
      "override",
      "package",
      "postfix",
      "precedencegroup",
      "prefix",
      "private",
      "protocol",
      "public",
      "repeat",
      "required",
      "rethrows",
      "return",
      "set",
      "some",
      "static",
      "struct",
      "subscript",
      "super",
      "switch",
      "throw",
      "throws",
      "try",
      "typealias",
      "unowned",
      "var",
      "weak",
      "where",
      "while",
      "willSet",
      "didSet",
      "convenience",
      "dynamic",
      "consuming",
      "borrowing",
      "sending",
      "any",
    ],

    typeKeywords: [
      "Int",
      "Int8",
      "Int16",
      "Int32",
      "Int64",
      "UInt",
      "UInt8",
      "UInt16",
      "UInt32",
      "UInt64",
      "Float",
      "Double",
      "Float16",
      "Float80",
      "Bool",
      "String",
      "Character",
      "Array",
      "Dictionary",
      "Set",
      "Optional",
      "Any",
      "AnyObject",
      "AnyHashable",
      "Void",
      "Never",
      "Result",
      "Error",
      "Codable",
      "Decodable",
      "Encodable",
      "Equatable",
      "Hashable",
      "Comparable",
      "Identifiable",
      "CustomStringConvertible",
      "CustomDebugStringConvertible",
      "Sequence",
      "Collection",
      "IteratorProtocol",
      "Sendable",
      "MainActor",
      "ObservableObject",
      "View",
      "Text",
      "Image",
      "Button",
      "NavigationView",
      "NavigationStack",
      "List",
      "VStack",
      "HStack",
      "ZStack",
      "LazyVStack",
      "LazyHStack",
      "ScrollView",
      "TabView",
      "Form",
      "Section",
      "Group",
      "Data",
      "Date",
      "URL",
      "URLRequest",
      "URLSession",
      "UUID",
      "Locale",
      "Calendar",
      "TimeZone",
      "DispatchQueue",
      "Task",
      "TaskGroup",
      "Range",
      "ClosedRange",
      "Published",
      "State",
      "Binding",
      "ObservedObject",
      "StateObject",
      "EnvironmentObject",
      "Environment",
    ],

    constants: ["true", "false", "nil", "self", "Self"],

    escapes: /\\(?:[0\\tnr"']|u\{[0-9a-fA-F]{1,8}\})/,

    tokenizer: {
      root: [
        [/@[a-zA-Z_]\w*/, "annotation"],
        [
          /#(?:if|else|elseif|endif|available|unavailable|sourceLocation|warning|error|selector|keyPath|colorLiteral|fileLiteral|imageLiteral|line|file|function|column|dsohandle)\b/,
          "keyword.control",
        ],

        [/\/\/\/.*$/, "comment.doc"],

        [
          /[A-Z][\w]*(?=\s*[<({\.:])/,
          {
            cases: {
              "@typeKeywords": "type.identifier",
              "@constants": "keyword.constant",
              "@keywords": "keyword",
              "@default": "type.identifier",
            },
          },
        ],
        [
          /[A-Z][\w]*/,
          {
            cases: {
              "@typeKeywords": "type.identifier",
              "@constants": "keyword.constant",
              "@keywords": "keyword",
              "@default": "type.identifier",
            },
          },
        ],
        [
          /[a-z_]\w*/,
          {
            cases: {
              "@keywords": "keyword",
              "@constants": "keyword.constant",
              "@typeKeywords": "type.identifier",
              "@default": "identifier",
            },
          },
        ],
        [/\$[0-9]+/, "variable"],
        [/`[^`]+`/, "identifier"],

        { include: "@whitespace" },

        [/[{}()\[\]]/, "@brackets"],

        [
          /0[xX][0-9a-fA-F][0-9a-fA-F_]*(\.[0-9a-fA-F][0-9a-fA-F_]*)?([pP][\-+]?[0-9][0-9_]*)?/,
          "number.hex",
        ],
        [/0[oO][0-7][0-7_]*/, "number.octal"],
        [/0[bB][01][01_]*/, "number.binary"],
        [/[0-9][0-9_]*\.[0-9][0-9_]*([eE][\-+]?[0-9][0-9_]*)?/, "number.float"],
        [/[0-9][0-9_]*[eE][\-+]?[0-9][0-9_]*/, "number.float"],
        [/[0-9][0-9_]*/, "number"],

        [/"""/, { token: "string.quote", next: "@mlstring" }],
        [/"/, { token: "string.quote", next: "@string" }],

        [/\.\.\./, "operator"],
        [/\.\.</, "operator"],
        [/->/, "keyword"],
        [/[+\-*\/%&|^~<>=!?:]+/, "operator"],

        [/[;,.]/, "delimiter"],
      ],

      whitespace: [
        [/\s+/, "white"],
        [/\/\*/, "comment", "@comment"],
        [/\/\/.*$/, "comment"],
      ],

      comment: [
        [/\/\*/, "comment", "@push"],
        [/\*\//, "comment", "@pop"],
        [/./, "comment"],
      ],

      string: [
        [/\\\(/, { token: "delimiter", next: "@interpolated" }],
        [/@escapes/, "string.escape"],
        [/[^\\"\n]+/, "string"],
        [/"/, { token: "string.quote", next: "@pop" }],
        [/\\/, "string.escape.invalid"],
      ],

      mlstring: [
        [/\\\(/, { token: "delimiter", next: "@interpolated" }],
        [/@escapes/, "string.escape"],
        [/"""/, { token: "string.quote", next: "@pop" }],
        [/[^\\"]+/, "string"],
        [/\\/, "string.escape"],
        [/"/, "string"],
      ],

      interpolated: [
        [/\)/, { token: "delimiter", next: "@pop" }],
        [/\(/, "delimiter", "@push"],
        { include: "root" },
      ],
    },
  });

  // ═══════════════════════════════════════════════════════
  // 4. SWIFT KNOWLEDGE BASE
  // ═══════════════════════════════════════════════════════

  const KW = {
    class: {
      d: "Declaration",
      t: "Declares a reference type supporting inheritance, reference semantics, and deinitializers.\n\n```swift\nclass Vehicle: Codable {\n    var speed: Double = 0\n}\n```",
    },
    struct: {
      d: "Declaration",
      t: "Declares a value type. Copied on assignment. Cannot inherit, but can conform to protocols.\n\n```swift\nstruct Point {\n    var x: Double\n    var y: Double\n}\n```",
    },
    enum: {
      d: "Declaration",
      t: "Declares an enumeration with associated values, raw values, and protocol conformance.\n\n```swift\nenum Direction {\n    case north, south, east, west\n}\n```",
    },
    protocol: {
      d: "Declaration",
      t: "Blueprint of methods, properties, and requirements for conforming types.\n\n```swift\nprotocol Drawable {\n    func draw()\n}\n```",
    },
    extension: {
      d: "Declaration",
      t: "Adds functionality to an existing type.\n\n```swift\nextension Int {\n    var isEven: Bool { self % 2 == 0 }\n}\n```",
    },
    func: {
      d: "Declaration",
      t: 'Declares a function or method.\n\n```swift\nfunc greet(name: String) -> String {\n    "Hello, \\(name)!"\n}\n```',
    },
    var: {
      d: "Declaration",
      t: 'Declares a mutable variable — stored, computed, or local.\n\n```swift\nvar count = 0\nvar label: String { "Count: \\(count)" }\n```',
    },
    let: {
      d: "Declaration",
      t: "Declares an immutable constant.\n\n```swift\nlet pi = 3.14159\n```",
    },
    typealias: {
      d: "Declaration",
      t: "Creates a named alias for an existing type.\n\n```swift\ntypealias JSON = [String: Any]\n```",
    },
    init: {
      d: "Declaration",
      t: "Initializer for a type.\n\n```swift\ninit(name: String) {\n    self.name = name\n}\n```",
    },
    deinit: {
      d: "Declaration",
      t: 'Called when a class instance is deallocated.\n\n```swift\ndeinit { print("freed") }\n```',
    },
    subscript: {
      d: "Declaration",
      t: "Enables subscript access to elements.\n\n```swift\nsubscript(i: Int) -> T { items[i] }\n```",
    },
    actor: {
      d: "Declaration",
      t: "Reference type protecting mutable state from data races.\n\n```swift\nactor Counter {\n    var value = 0\n    func increment() { value += 1 }\n}\n```",
    },
    import: {
      d: "Declaration",
      t: "Imports a module.\n\n```swift\nimport Foundation\n```",
    },
    associatedtype: {
      d: "Declaration",
      t: "Placeholder type in a protocol.\n\n```swift\nprotocol Container {\n    associatedtype Item\n}\n```",
    },
    if: {
      d: "Statement",
      t: "Conditional execution. Supports optional binding.\n\n```swift\nif let v = optional {\n    print(v)\n}\n```",
    },
    else: { d: "Statement", t: "Alternative branch of an `if` statement." },
    guard: {
      d: "Statement",
      t: "Early exit when a condition is not met.\n\n```swift\nguard let v = opt else { return }\n```",
    },
    switch: {
      d: "Statement",
      t: "Exhaustive pattern matching.\n\n```swift\nswitch val {\ncase .a: break\ndefault: break\n}\n```",
    },
    case: {
      d: "Statement",
      t: "Pattern in a `switch`, enum declaration, or `if case`.",
    },
    default: { d: "Statement", t: "Default branch in a `switch`." },
    for: {
      d: "Statement",
      t: "Iterates over a sequence.\n\n```swift\nfor item in list { }\n```",
    },
    while: { d: "Statement", t: "Loops while condition is true." },
    repeat: {
      d: "Statement",
      t: "Executes body at least once.\n\n```swift\nrepeat { } while cond\n```",
    },
    return: { d: "Statement", t: "Returns a value or exits early." },
    break: { d: "Statement", t: "Exits the current loop or switch case." },
    continue: { d: "Statement", t: "Skips to the next loop iteration." },
    fallthrough: {
      d: "Statement",
      t: "Falls through to the next switch case.",
    },
    throw: {
      d: "Statement",
      t: "Throws an error.\n\n```swift\nthrow MyError.notFound\n```",
    },
    throws: { d: "Modifier", t: "Marks a function that can throw errors." },
    rethrows: {
      d: "Modifier",
      t: "Throws only if a closure parameter throws.",
    },
    try: {
      d: "Expression",
      t: "Calls a throwing function. `try?` returns nil on error, `try!` force-unwraps.",
    },
    catch: { d: "Statement", t: "Handles errors from a `do` block." },
    do: {
      d: "Statement",
      t: "Scope block, typically paired with `catch`.\n\n```swift\ndo { try op() } catch { print(error) }\n```",
    },
    defer: {
      d: "Statement",
      t: "Executes code when the current scope exits.\n\n```swift\ndefer { file.close() }\n```",
    },
    where: {
      d: "Clause",
      t: "Adds constraints to generics, extensions, and pattern matching.",
    },
    in: {
      d: "Keyword",
      t: "Used in `for-in` and closures to separate parameters from body.",
    },
    static: {
      d: "Modifier",
      t: "Type-level member. Cannot be overridden (use `class` for overridable).",
    },
    final: {
      d: "Modifier",
      t: "Prevents overriding of a class, method, or property.",
    },
    override: { d: "Modifier", t: "Overrides a superclass member." },
    mutating: {
      d: "Modifier",
      t: "Allows a value-type method to modify `self`.",
    },
    lazy: {
      d: "Modifier",
      t: "Defers initialization until first access.\n\n```swift\nlazy var data = loadData()\n```",
    },
    weak: {
      d: "Modifier",
      t: "Weak reference (no retain). Must be optional.\n\n```swift\nweak var delegate: Delegate?\n```",
    },
    unowned: {
      d: "Modifier",
      t: "Non-retaining, non-optional reference. Crashes if accessed after deallocation.",
    },
    async: {
      d: "Concurrency",
      t: "Marks asynchronous function. Called with `await`.\n\n```swift\nfunc fetch() async -> Data { }\n```",
    },
    await: { d: "Concurrency", t: "Suspends until async operation completes." },
    public: { d: "Access Control", t: "Accessible from any module." },
    private: {
      d: "Access Control",
      t: "Accessible only within the enclosing declaration.",
    },
    fileprivate: {
      d: "Access Control",
      t: "Accessible within the current file.",
    },
    internal: {
      d: "Access Control",
      t: "Default. Accessible within the same module.",
    },
    open: {
      d: "Access Control",
      t: "Public + allows subclassing/overriding externally.",
    },
    some: {
      d: "Type",
      t: 'Opaque return type preserving type identity.\n\n```swift\nvar body: some View { Text("Hi") }\n```',
    },
    any: {
      d: "Type",
      t: "Existential type allowing any conforming type.\n\n```swift\nvar items: [any Equatable]\n```",
    },
    is: { d: "Expression", t: "Type check. Returns Bool." },
    as: { d: "Expression", t: "Type cast. `as?` conditional, `as!` forced." },
    self: { d: "Expression", t: "Current instance." },
    Self: { d: "Expression", t: "Current type." },
    super: { d: "Expression", t: "Superclass reference." },
    nil: { d: "Literal", t: "Absence of a value." },
    true: { d: "Literal", t: "Boolean true." },
    false: { d: "Literal", t: "Boolean false." },
    willSet: {
      d: "Observer",
      t: "Called before property value changes. `newValue` available.",
    },
    didSet: {
      d: "Observer",
      t: "Called after property value changes. `oldValue` available.",
    },
    get: { d: "Accessor", t: "Getter for computed property." },
    set: {
      d: "Accessor",
      t: "Setter for computed property. `newValue` available.",
    },
    indirect: {
      d: "Modifier",
      t: "Allows recursive enum cases.\n\n```swift\nindirect enum Tree {\n    case node(Tree, Tree)\n}\n```",
    },
    convenience: {
      d: "Modifier",
      t: "Secondary initializer delegating to a designated init.",
    },
    required: {
      d: "Modifier",
      t: "Requires subclasses to implement this initializer.",
    },
    inout: {
      d: "Modifier",
      t: "Pass-by-reference parameter.\n\n```swift\nfunc swap(_ a: inout Int, _ b: inout Int)\n```",
    },
  };

  const TY = {
    Int: {
      d: "Standard Library",
      t: "Signed integer (64-bit on modern platforms).",
    },
    String: {
      d: "Standard Library",
      t: 'Unicode string with interpolation support.\n\n```swift\n"Hello, \\(name)!"\n```',
    },
    Bool: { d: "Standard Library", t: "Boolean — `true` or `false`." },
    Double: {
      d: "Standard Library",
      t: "64-bit floating-point. Default for float literals.",
    },
    Float: { d: "Standard Library", t: "32-bit floating-point." },
    Array: {
      d: "Collection",
      t: "Ordered collection.\n\n```swift\nvar a: [Int] = [1, 2, 3]\n```",
    },
    Dictionary: {
      d: "Collection",
      t: 'Key-value pairs.\n\n```swift\nvar d: [String: Int] = ["a": 1]\n```',
    },
    Set: {
      d: "Collection",
      t: "Unordered unique elements.\n\n```swift\nvar s: Set<Int> = [1, 2, 3]\n```",
    },
    Optional: {
      d: "Standard Library",
      t: "A value or `nil`.\n\n```swift\nvar x: String? = nil\n```",
    },
    Result: {
      d: "Standard Library",
      t: "Success or failure value.\n\n```swift\nResult<Data, Error>\n```",
    },
    Void: {
      d: "Standard Library",
      t: "Empty tuple `()`. Return type for void functions.",
    },
    Never: {
      d: "Standard Library",
      t: "Uninhabited type — function never returns.",
    },
    Any: { d: "Standard Library", t: "All types implicitly conform." },
    AnyObject: { d: "Protocol", t: "All class types implicitly conform." },
    Error: {
      d: "Protocol",
      t: "Throwable error type.\n\n```swift\nenum E: Error { case fail }\n```",
    },
    Codable: {
      d: "Protocol",
      t: "`Encodable & Decodable` — automatic JSON coding.",
    },
    Equatable: { d: "Protocol", t: "Supports `==` and `!=` comparison." },
    Hashable: {
      d: "Protocol",
      t: "Hashable for `Set` elements / `Dictionary` keys.",
    },
    Comparable: { d: "Protocol", t: "Supports `<`, `<=`, `>=`, `>`." },
    Identifiable: { d: "Protocol", t: "Has a stable `id` property." },
    Sendable: { d: "Protocol", t: "Safe to share across concurrency domains." },
    View: {
      d: "SwiftUI",
      t: 'UI component protocol. Requires `body`.\n\n```swift\nstruct V: View {\n    var body: some View { Text("Hi") }\n}\n```',
    },
    ObservableObject: {
      d: "Combine",
      t: "Publishes changes via `@Published` properties.",
    },
    Task: {
      d: "Concurrency",
      t: "Unit of async work.\n\n```swift\nTask { await fetch() }\n```",
    },
    URL: { d: "Foundation", t: "Resource location identifier." },
    Data: { d: "Foundation", t: "Byte buffer." },
    UUID: { d: "Foundation", t: "Universally unique identifier." },
    Date: { d: "Foundation", t: "Point in time." },
    URLSession: {
      d: "Foundation",
      t: "API for URL loading — downloads, uploads, etc.",
    },
    DispatchQueue: {
      d: "Foundation",
      t: "Serial/concurrent work queue (GCD).",
    },
  };

  const FN = {
    print: {
      s: 'func print(_ items: Any..., separator: String = " ", terminator: String = "\\n")',
      t: "Prints to standard output.",
    },
    debugPrint: {
      s: 'func debugPrint(_ items: Any..., separator: String = " ", terminator: String = "\\n")',
      t: "Debug-prints to standard output.",
    },
    dump: {
      s: "func dump<T>(_ value: T) -> T",
      t: "Dumps object contents using its mirror.",
    },
    fatalError: {
      s: 'func fatalError(_ message: String = "") -> Never',
      t: "Prints message and stops execution.",
    },
    precondition: {
      s: 'func precondition(_ condition: Bool, _ message: String = "")',
      t: "Checks a forward-progress condition.",
    },
    assert: {
      s: 'func assert(_ condition: Bool, _ message: String = "")',
      t: "Debug-only assertion.",
    },
    min: {
      s: "func min<T: Comparable>(_ x: T, _ y: T) -> T",
      t: "Returns the lesser of two values.",
    },
    max: {
      s: "func max<T: Comparable>(_ x: T, _ y: T) -> T",
      t: "Returns the greater of two values.",
    },
    abs: {
      s: "func abs<T: SignedNumeric>(_ x: T) -> T",
      t: "Returns the absolute value.",
    },
    zip: {
      s: "func zip<S1, S2>(_ s1: S1, _ s2: S2) -> Zip2Sequence<S1, S2>",
      t: "Pairs elements from two sequences.",
    },
    stride: {
      s: "func stride<T>(from: T, to: T, by: T.Stride) -> StrideTo<T>",
      t: "Creates a strided sequence.",
    },
    type: {
      s: "func type<T>(of value: T) -> T.Type",
      t: "Returns the dynamic metatype.",
    },
    withAnimation: {
      s: "func withAnimation<Result>(_ animation: Animation?, _ body: () throws -> Result) rethrows -> Result",
      t: "Animates changes made in the body closure (SwiftUI).",
    },
  };

  // ═══════════════════════════════════════════════════════
  // 5. DOCUMENT SYMBOL PARSER
  // ═══════════════════════════════════════════════════════

  function parseSymbols(model) {
    const lines = model.getValue().split("\n");
    const syms = [];
    const pats = [
      {
        r: /\b(class)\s+([A-Za-z_]\w*)/,
        k: monaco.languages.CompletionItemKind.Class,
      },
      {
        r: /\b(struct)\s+([A-Za-z_]\w*)/,
        k: monaco.languages.CompletionItemKind.Struct,
      },
      {
        r: /\b(enum)\s+([A-Za-z_]\w*)/,
        k: monaco.languages.CompletionItemKind.Enum,
      },
      {
        r: /\b(protocol)\s+([A-Za-z_]\w*)/,
        k: monaco.languages.CompletionItemKind.Interface,
      },
      {
        r: /\b(func)\s+([A-Za-z_]\w*)/,
        k: monaco.languages.CompletionItemKind.Function,
      },
      {
        r: /\b(var)\s+([A-Za-z_]\w*)/,
        k: monaco.languages.CompletionItemKind.Variable,
      },
      {
        r: /\b(let)\s+([A-Za-z_]\w*)/,
        k: monaco.languages.CompletionItemKind.Constant,
      },
      {
        r: /\b(typealias)\s+([A-Za-z_]\w*)/,
        k: monaco.languages.CompletionItemKind.TypeParameter,
      },
      {
        r: /\b(actor)\s+([A-Za-z_]\w*)/,
        k: monaco.languages.CompletionItemKind.Class,
      },
      {
        r: /\bcase\s+([A-Za-z_]\w*)/,
        k: monaco.languages.CompletionItemKind.EnumMember,
        g: 1,
        kw: "case",
      },
    ];
    for (let i = 0; i < lines.length; i++) {
      for (const p of pats) {
        const m = lines[i].match(p.r);
        if (m) {
          const name = m[p.g || 2];
          const col = lines[i].indexOf(name) + 1;
          syms.push({
            name,
            kind: p.k,
            kw: p.kw || m[1],
            ln: i + 1,
            col,
            ecol: col + name.length,
            full: lines[i].trim(),
          });
        }
      }
    }
    return syms;
  }

  // ═══════════════════════════════════════════════════════
  // 6. COMPLETION PROVIDER
  // ═══════════════════════════════════════════════════════

  monaco.languages.registerCompletionItemProvider("swift", {
    triggerCharacters: [".", "@", "#"],
    provideCompletionItems(model, position) {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };
      const lineContent = model.getLineContent(position.lineNumber);
      const chBefore = lineContent[position.column - 2];
      const suggestions = [];

      // Attributes
      if (chBefore === "@") {
        const attrs = [
          "@available",
          "@objc",
          "@objcMembers",
          "@nonobjc",
          "@IBAction",
          "@IBOutlet",
          "@IBDesignable",
          "@IBInspectable",
          "@discardableResult",
          "@escaping",
          "@autoclosure",
          "@propertyWrapper",
          "@resultBuilder",
          "@main",
          "@frozen",
          "@inlinable",
          "@usableFromInline",
          "@testable",
          "@dynamicCallable",
          "@dynamicMemberLookup",
          "@Sendable",
          "@preconcurrency",
          "@State",
          "@Binding",
          "@Published",
          "@ObservedObject",
          "@StateObject",
          "@EnvironmentObject",
          "@Environment",
          "@AppStorage",
          "@SceneStorage",
          "@FocusState",
          "@ViewBuilder",
          "@MainActor",
        ];
        attrs.forEach((a) =>
          suggestions.push({
            label: a,
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: a.substring(1),
            range,
            detail: "Attribute",
          }),
        );
        return { suggestions };
      }

      // Directives
      if (chBefore === "#") {
        [
          {
            l: "#if",
            i: "if ${1:condition}\n$0\n#endif",
            d: "Conditional compilation",
          },
          { l: "#else", i: "else", d: "Else branch" },
          { l: "#elseif", i: "elseif ${1:condition}", d: "Else-if branch" },
          { l: "#endif", i: "endif", d: "End conditional" },
          {
            l: "#available",
            i: "available(${1:iOS 15.0}, *)",
            d: "Availability check",
          },
          { l: "#selector", i: "selector(${1:method})", d: "ObjC selector" },
          {
            l: "#warning",
            i: 'warning("${1:msg}")',
            d: "Compile-time warning",
          },
          { l: "#error", i: 'error("${1:msg}")', d: "Compile-time error" },
          { l: "#file", i: "file", d: "Current filename" },
          { l: "#line", i: "line", d: "Current line number" },
          { l: "#function", i: "function", d: "Current function name" },
        ].forEach((x) =>
          suggestions.push({
            label: x.l,
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: x.i,
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range,
            detail: "Directive",
            documentation: x.d,
          }),
        );
        return { suggestions };
      }

      // — Keywords —
      Object.keys(KW).forEach((k) => {
        suggestions.push({
          label: k,
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: k,
          range,
          detail: KW[k].d,
          documentation: { value: KW[k].t },
        });
      });

      // — Types —
      Object.keys(TY).forEach((t) => {
        suggestions.push({
          label: t,
          kind: monaco.languages.CompletionItemKind.Class,
          insertText: t,
          range,
          detail: TY[t].d,
          documentation: { value: TY[t].t },
        });
      });

      // — Functions —
      Object.keys(FN).forEach((f) => {
        suggestions.push({
          label: f,
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: f + "($0)",
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range,
          detail: FN[f].s,
          documentation: { value: FN[f].t },
        });
      });

      // — Document symbols —
      const seen = new Set();
      parseSymbols(model).forEach((s) => {
        if (!seen.has(s.name)) {
          seen.add(s.name);
          suggestions.push({
            label: s.name,
            kind: s.kind,
            insertText: s.name,
            range,
            detail: `${s.kw} ${s.name}`,
            documentation: {
              value: `Defined at line ${s.ln}:\n\`\`\`swift\n${s.full}\n\`\`\``,
            },
          });
        }
      });

      // ── SNIPPETS ──
      const snippets = [
        {
          l: "ifelse",
          d: "if-else statement",
          i: "if ${1:condition} {\n\t$2\n} else {\n\t$0\n}",
        },
        {
          l: "iflet",
          d: "if let optional binding",
          i: "if let ${1:value} = ${2:optional} {\n\t$0\n}",
        },
        {
          l: "guardlet",
          d: "guard let",
          i: "guard let ${1:value} = ${2:optional} else {\n\t${3:return}\n}\n$0",
        },
        {
          l: "guardelse",
          d: "guard statement",
          i: "guard ${1:condition} else {\n\t${2:return}\n}\n$0",
        },
        {
          l: "forin",
          d: "for-in loop",
          i: "for ${1:item} in ${2:collection} {\n\t$0\n}",
        },
        {
          l: "forrange",
          d: "for range loop",
          i: "for ${1:i} in ${2:0}..<${3:count} {\n\t$0\n}",
        },
        {
          l: "whileloop",
          d: "while loop",
          i: "while ${1:condition} {\n\t$0\n}",
        },
        {
          l: "repeatwhile",
          d: "repeat-while loop",
          i: "repeat {\n\t$0\n} while ${1:condition}",
        },
        {
          l: "switchcase",
          d: "switch statement",
          i: "switch ${1:value} {\ncase ${2:.first}:\n\t${3:break}\ncase ${4:.second}:\n\t${5:break}\ndefault:\n\t$0\n}",
        },
        {
          l: "funcdef",
          d: "function declaration",
          i: "func ${1:name}(${2:params}) -> ${3:ReturnType} {\n\t$0\n}",
        },
        {
          l: "funcvoid",
          d: "void function",
          i: "func ${1:name}(${2:params}) {\n\t$0\n}",
        },
        {
          l: "funcasync",
          d: "async throwing function",
          i: "func ${1:name}(${2}) async throws -> ${3:ReturnType} {\n\t$0\n}",
        },
        {
          l: "classdef",
          d: "class declaration",
          i: "class ${1:Name}${2:: SuperClass} {\n\tinit(${3}) {\n\t\t$0\n\t}\n}",
        },
        {
          l: "structdef",
          d: "struct declaration",
          i: "struct ${1:Name}${2:: Protocol} {\n\t${3:var prop: Type}\n\t$0\n}",
        },
        {
          l: "enumdef",
          d: "enum declaration",
          i: "enum ${1:Name} {\n\tcase ${2:first}\n\tcase ${3:second}\n\t$0\n}",
        },
        {
          l: "protocoldef",
          d: "protocol declaration",
          i: "protocol ${1:Name} {\n\t${2:func method()}\n\t$0\n}",
        },
        {
          l: "extensiondef",
          d: "extension",
          i: "extension ${1:Type}${2:: Protocol} {\n\t$0\n}",
        },
        { l: "initdef", d: "initializer", i: "init(${1:params}) {\n\t$0\n}" },
        {
          l: "closure",
          d: "closure expression",
          i: "{ (${1:params}) -> ${2:ReturnType} in\n\t$0\n}",
        },
        {
          l: "docatch",
          d: "do-catch block",
          i: "do {\n\t${1:try expression}\n} catch {\n\t${2:print(error)}\n}$0",
        },
        { l: "deferblock", d: "defer block", i: "defer {\n\t$0\n}" },
        {
          l: "computed",
          d: "computed property",
          i: "var ${1:name}: ${2:Type} {\n\tget {\n\t\t${3:return value}\n\t}\n\tset {\n\t\t$0\n\t}\n}",
        },
        {
          l: "observer",
          d: "property with observers",
          i: "var ${1:name}: ${2:Type} = ${3:initial} {\n\twillSet {\n\t\t$4\n\t}\n\tdidSet {\n\t\t$0\n\t}\n}",
        },
        {
          l: "singleton",
          d: "singleton pattern",
          i: "static let shared = ${1:ClassName}()\nprivate init() { $0 }",
        },
        {
          l: "swiftuiview",
          d: "SwiftUI View",
          i: 'struct ${1:MyView}: View {\n\tvar body: some View {\n\t\t${2:Text("Hello")}\n\t}\n}$0',
        },
        {
          l: "taskblock",
          d: "Task block",
          i: "Task {\n\t${1:await expression}\n}$0",
        },
        {
          l: "taskdetached",
          d: "detached Task",
          i: "Task.detached(priority: .${1:userInitiated}) {\n\t$0\n}",
        },
        { l: "mark", d: "MARK comment", i: "// MARK: - ${1:Section}\n$0" },
        { l: "todo", d: "TODO comment", i: "// TODO: ${1:Description}\n$0" },
        { l: "fixme", d: "FIXME comment", i: "// FIXME: ${1:Description}\n$0" },
        { l: "importmod", d: "import module", i: "import ${1:Foundation}" },
        {
          l: "testfunc",
          d: "test function (Given/When/Then)",
          i: "func test${1:Name}() throws {\n\t// Given\n\t${2}\n\t\n\t// When\n\t${3}\n\t\n\t// Then\n\t${4:XCTAssertEqual(result, expected)}\n}$0",
        },
        {
          l: "mainactor",
          d: "@MainActor ObservableObject",
          i: "@MainActor\nclass ${1:ViewModel}: ObservableObject {\n\t@Published var ${2:prop}: ${3:Type} = ${4:value}\n\t$0\n}",
        },
        {
          l: "enumcodable",
          d: "Codable String enum",
          i: 'enum ${1:Name}: String, Codable, CaseIterable {\n\tcase ${2:first} = "${3:first}"\n\tcase ${4:second} = "${5:second}"\n\t$0\n}',
        },
        {
          l: "asynclet",
          d: "async let binding",
          i: "async let ${1:result} = ${2:asyncCall()}\nlet ${3:value} = try await ${1:result}$0",
        },
      ];

      snippets.forEach((s) =>
        suggestions.push({
          label: s.l,
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: s.i,
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range,
          detail: "⬡ Snippet — " + s.d,
          sortText: "0_" + s.l,
        }),
      );

      return { suggestions };
    },
  });

  // ═══════════════════════════════════════════════════════
  // 7. HOVER PROVIDER
  // ═══════════════════════════════════════════════════════

  monaco.languages.registerHoverProvider("swift", {
    provideHover(model, position) {
      const w = model.getWordAtPosition(position);
      if (!w) return null;
      const tok = w.word;
      const rng = new monaco.Range(
        position.lineNumber,
        w.startColumn,
        position.lineNumber,
        w.endColumn,
      );

      if (KW[tok])
        return {
          range: rng,
          contents: [
            { value: `**${tok}** — *${KW[tok].d}*` },
            { value: KW[tok].t },
          ],
        };
      if (TY[tok])
        return {
          range: rng,
          contents: [
            { value: `**${tok}** — *${TY[tok].d}*` },
            { value: TY[tok].t },
          ],
        };
      if (FN[tok])
        return {
          range: rng,
          contents: [
            { value: "```swift\n" + FN[tok].s + "\n```" },
            { value: FN[tok].t },
          ],
        };

      const sym = parseSymbols(model).find((s) => s.name === tok);
      if (sym)
        return {
          range: rng,
          contents: [
            { value: `**${sym.kw} ${sym.name}**` },
            { value: "```swift\n" + sym.full + "\n```" },
            { value: `*Defined at line ${sym.ln}*` },
          ],
        };

      return null;
    },
  });

  // ═══════════════════════════════════════════════════════
  // 8. DEFINITION PROVIDER
  // ═══════════════════════════════════════════════════════

  monaco.languages.registerDefinitionProvider("swift", {
    provideDefinition(model, position) {
      const w = model.getWordAtPosition(position);
      if (!w) return null;
      const defs = parseSymbols(model)
        .filter((s) => s.name === w.word)
        .map((s) => ({
          uri: model.uri,
          range: new monaco.Range(s.ln, s.col, s.ln, s.ecol),
        }));
      return defs.length ? defs : null;
    },
  });

  // ═══════════════════════════════════════════════════════
  // 9. DOCUMENT SYMBOL PROVIDER (Outline)
  // ═══════════════════════════════════════════════════════

  const kindMap = {};
  kindMap[monaco.languages.CompletionItemKind.Class] =
    monaco.languages.SymbolKind.Class;
  kindMap[monaco.languages.CompletionItemKind.Struct] =
    monaco.languages.SymbolKind.Struct;
  kindMap[monaco.languages.CompletionItemKind.Enum] =
    monaco.languages.SymbolKind.Enum;
  kindMap[monaco.languages.CompletionItemKind.Interface] =
    monaco.languages.SymbolKind.Interface;
  kindMap[monaco.languages.CompletionItemKind.Function] =
    monaco.languages.SymbolKind.Function;
  kindMap[monaco.languages.CompletionItemKind.Variable] =
    monaco.languages.SymbolKind.Variable;
  kindMap[monaco.languages.CompletionItemKind.Constant] =
    monaco.languages.SymbolKind.Constant;
  kindMap[monaco.languages.CompletionItemKind.TypeParameter] =
    monaco.languages.SymbolKind.TypeParameter;
  kindMap[monaco.languages.CompletionItemKind.EnumMember] =
    monaco.languages.SymbolKind.EnumMember;

  monaco.languages.registerDocumentSymbolProvider("swift", {
    provideDocumentSymbols(model) {
      return parseSymbols(model).map((s) => ({
        name: s.name,
        detail: s.kw,
        kind: kindMap[s.kind] || monaco.languages.SymbolKind.Variable,
        range: new monaco.Range(s.ln, 1, s.ln, s.full.length + 1),
        selectionRange: new monaco.Range(s.ln, s.col, s.ln, s.ecol),
        tags: [],
      }));
    },
  });

  // ═══════════════════════════════════════════════════════
  // 10. SIGNATURE HELP PROVIDER
  // ═══════════════════════════════════════════════════════

  monaco.languages.registerSignatureHelpProvider("swift", {
    signatureHelpTriggerCharacters: ["(", ","],
    provideSignatureHelp(model, position) {
      const line = model.getLineContent(position.lineNumber);
      const before = line.substring(0, position.column - 1);
      const m = before.match(/(\w+)\s*\([^)]*$/);
      if (!m) return null;
      const fn = FN[m[1]];
      if (!fn) return null;
      const commas = (
        before.substring(before.lastIndexOf("(")).match(/,/g) || []
      ).length;
      return {
        value: {
          signatures: [{ label: fn.s, documentation: fn.t, parameters: [] }],
          activeSignature: 0,
          activeParameter: commas,
        },
        dispose() {},
      };
    },
  });
};
