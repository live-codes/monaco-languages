import type * as Monaco from "monaco-editor";

export default (monaco: typeof Monaco) => {
  // ── 1. Register ────────────────────────────────────────────────────────
  monaco.languages.register({
    id: "elixir",
    extensions: [".ex", ".exs"],
    aliases: ["Elixir", "elixir"],
  });

  // ── 2. Language Configuration ──────────────────────────────────────────
  monaco.languages.setLanguageConfiguration("elixir", {
    comments: { lineComment: "#" },
    brackets: [
      ["(", ")"],
      ["[", "]"],
      ["{", "}"],
      ["do", "end"],
    ],
    autoClosingPairs: [
      { open: "(", close: ")" },
      { open: "[", close: "]" },
      { open: "{", close: "}" },
      { open: '"', close: '"' },
      { open: "'", close: "'" },
    ],
    surroundingPairs: [
      { open: "(", close: ")" },
      { open: "[", close: "]" },
      { open: "{", close: "}" },
      { open: '"', close: '"' },
      { open: "'", close: "'" },
    ],
    indentationRules: {
      increaseIndentPattern:
        /^\s*(def|defp|defmodule|defprotocol|defimpl|defmacro|defmacrop|defguard|defguardp|defdelegate|defstruct|defexception|if|unless|case|cond|with|for|fn|receive|try|quote|do|else|->)\b.*$/,
      decreaseIndentPattern: /^\s*(end|else|catch|rescue|after)\b/,
    },
    folding: {
      markers: {
        start:
          /^\s*(def|defp|defmodule|do|fn|case|cond|if|unless|try|receive|with)\b/,
        end: /^\s*end\b/,
      },
    },
    onEnterRules: [
      {
        beforeText:
          /^\s*(def|defp|defmodule|defprotocol|defimpl|defmacro|if|unless|case|cond|for|fn|receive|try|with|quote|do)\b.*do\s*$/,
        action: { indentAction: monaco.languages.IndentAction.Indent },
      },
      {
        beforeText: /->$/,
        action: { indentAction: monaco.languages.IndentAction.Indent },
      },
    ],
  });

  // ── 3. Monarch Tokenizer ───────────────────────────────────────────────
  monaco.languages.setMonarchTokensProvider("elixir", {
    defaultToken: "",
    tokenPostfix: ".elixir",

    keywords: [
      "def",
      "defp",
      "defmodule",
      "defprotocol",
      "defimpl",
      "defmacro",
      "defmacrop",
      "defguard",
      "defguardp",
      "defdelegate",
      "defstruct",
      "defexception",
      "defoverridable",
      "do",
      "end",
      "fn",
      "case",
      "cond",
      "with",
      "if",
      "unless",
      "else",
      "when",
      "in",
      "and",
      "or",
      "not",
      "for",
      "receive",
      "after",
      "try",
      "catch",
      "rescue",
      "raise",
      "throw",
      "import",
      "require",
      "alias",
      "use",
      "quote",
      "unquote",
      "unquote_splicing",
      "super",
      "spawn",
      "spawn_link",
      "send",
      "self",
    ],

    constants: [
      "true",
      "false",
      "nil",
      "__MODULE__",
      "__DIR__",
      "__ENV__",
      "__CALLER__",
      "__STACKTRACE__",
    ],

    builtinModules: [
      "Kernel",
      "Enum",
      "Map",
      "List",
      "String",
      "IO",
      "File",
      "Path",
      "Agent",
      "Task",
      "GenServer",
      "Supervisor",
      "Application",
      "Process",
      "Node",
      "Tuple",
      "Keyword",
      "MapSet",
      "Range",
      "Regex",
      "Stream",
      "System",
      "Code",
      "Macro",
      "Module",
      "Protocol",
      "Access",
      "Inspect",
      "Logger",
      "Integer",
      "Float",
      "Atom",
      "Base",
      "Bitwise",
      "DateTime",
      "Date",
      "Time",
      "NaiveDateTime",
      "Calendar",
      "URI",
      "Version",
      "OptionParser",
      "Port",
      "Registry",
      "StringIO",
      "DynamicSupervisor",
      "ETS",
      "Collectable",
      "Enumerable",
      "Exception",
    ],

    escapes: /\\(?:[abdefnrstv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4})/,

    tokenizer: {
      root: [
        // Heredoc strings
        [/"""/, "string.heredoc", "@heredocDouble"],
        [/'''/, "string.heredoc", "@heredocSingle"],

        // Comments
        [/#.*$/, "comment"],

        // Module attributes
        [/@[a-z_]\w*/, "tag"],

        // Sigils
        [/~[a-zA-Z]"""/, "regexp", "@sigilHeredoc"],
        [/~[a-zA-Z]\//, "regexp", "@sigilSlash"],
        [/~[a-zA-Z]\{/, "regexp", "@sigilBrace"],
        [/~[a-zA-Z]\[/, "regexp", "@sigilBracket"],
        [/~[a-zA-Z]\(/, "regexp", "@sigilParen"],
        [/~[a-zA-Z]</, "regexp", "@sigilAngle"],
        [/~[a-zA-Z]\|/, "regexp", "@sigilPipe"],
        [/~[a-zA-Z]"/, "regexp", "@sigilDoubleQuote"],

        // Quoted atoms
        [/:"/, "string.atom", "@atomQuoted"],

        // Unquoted atoms
        [/:[a-zA-Z_]\w*[?!]?/, "string.atom"],

        // Module names
        [
          /[A-Z]\w*/,
          {
            cases: {
              "@builtinModules": "type.identifier",
              "@default": "type.identifier",
            },
          },
        ],

        // Numbers
        [/0[xX][0-9a-fA-F](_?[0-9a-fA-F])*/, "number.hex"],
        [/0[oO][0-7](_?[0-7])*/, "number.octal"],
        [/0[bB][01](_?[01])*/, "number.binary"],
        [/\d(_?\d)*\.\d(_?\d)*([eE][-+]?\d(_?\d)*)?/, "number.float"],
        [/\d(_?\d)*/, "number"],
        [/\?\\./, "number"],
        [/\?./, "number"],

        // Strings
        [/"/, "string", "@stringDouble"],
        [/'/, "string", "@stringSingle"],

        // Identifiers and keywords
        [
          /[a-z_]\w*[?!]?/,
          {
            cases: {
              "@keywords": "keyword",
              "@constants": "constant",
              "@default": "identifier",
            },
          },
        ],

        // Pipe operator (special)
        [/\|>/, "operator"],

        // Arrow operators
        [/->/, "operator"],
        [/<-/, "operator"],

        // Comparison / other operators
        [/===|!==|==|!=|<=|>=/, "operator"],
        [/\+\+|--/, "operator"],
        [/<>/, "operator"],
        [/=~/, "operator"],
        [/&&|\|\|/, "operator"],
        [/::/, "operator"],
        [/\.\./, "operator"],
        [/[+\-*\/%&|^~<>=!]/, "operator"],
        [/\\\\/, "operator"],

        // Delimiters
        [/[{}()\[\]]/, "@brackets"],
        [/[,;]/, "delimiter"],
      ],

      heredocDouble: [
        [/[^"#\\]+/, "string.heredoc"],
        [/#\{/, { token: "string.interpolation", next: "@interpolation" }],
        [/@escapes/, "string.escape"],
        [/"""/, "string.heredoc", "@pop"],
        [/"/, "string.heredoc"],
        [/#/, "string.heredoc"],
      ],

      heredocSingle: [
        [/[^'\\]+/, "string.heredoc"],
        [/@escapes/, "string.escape"],
        [/'''/, "string.heredoc", "@pop"],
        [/'/, "string.heredoc"],
      ],

      stringDouble: [
        [/[^"#\\]+/, "string"],
        [/#\{/, { token: "string.interpolation", next: "@interpolation" }],
        [/@escapes/, "string.escape"],
        [/\\./, "string.escape.invalid"],
        [/"/, "string", "@pop"],
      ],

      stringSingle: [
        [/[^'\\]+/, "string"],
        [/@escapes/, "string.escape"],
        [/\\./, "string.escape.invalid"],
        [/'/, "string", "@pop"],
      ],

      interpolation: [
        [/[^}]+/, "string.interpolation"],
        [/\}/, { token: "string.interpolation", next: "@pop" }],
      ],

      atomQuoted: [
        [/[^"\\]+/, "string.atom"],
        [/@escapes/, "string.escape"],
        [/"/, "string.atom", "@pop"],
      ],

      sigilHeredoc: [
        [/[^"]+/, "regexp"],
        [/"""[a-zA-Z]*/, "regexp", "@pop"],
        [/"/, "regexp"],
      ],
      sigilSlash: [
        [/[^\/\\]+/, "regexp"],
        [/\\./, "regexp"],
        [/\/[a-zA-Z]*/, "regexp", "@pop"],
      ],
      sigilBrace: [
        [/[^}\\]+/, "regexp"],
        [/\\./, "regexp"],
        [/\}[a-zA-Z]*/, "regexp", "@pop"],
      ],
      sigilBracket: [
        [/[^\]\\]+/, "regexp"],
        [/\\./, "regexp"],
        [/\][a-zA-Z]*/, "regexp", "@pop"],
      ],
      sigilParen: [
        [/[^)\\]+/, "regexp"],
        [/\\./, "regexp"],
        [/\)[a-zA-Z]*/, "regexp", "@pop"],
      ],
      sigilAngle: [
        [/[^>\\]+/, "regexp"],
        [/\\./, "regexp"],
        [/>[a-zA-Z]*/, "regexp", "@pop"],
      ],
      sigilPipe: [
        [/[^|\\]+/, "regexp"],
        [/\\./, "regexp"],
        [/\|[a-zA-Z]*/, "regexp", "@pop"],
      ],
      sigilDoubleQuote: [
        [/[^"\\]+/, "regexp"],
        [/\\./, "regexp"],
        [/"[a-zA-Z]*/, "regexp", "@pop"],
      ],
    },
  });

  // ── 4. Knowledge Base ──────────────────────────────────────────────────
  var DOCS = {};
  function addDoc(name, sig, detail, doc) {
    DOCS[name] = { signature: sig, detail: detail, doc: doc };
  }

  // Keywords
  addDoc(
    "defmodule",
    "defmodule ModuleName do ... end",
    "Defines a new module.",
    "Defines a module with the given name. The module body is wrapped between do and end.\n\nModules are the primary unit of code organisation in Elixir.",
  );
  addDoc(
    "def",
    "def name(args) do ... end",
    "Defines a public function.",
    "Defines a public function with the given name and args. Public functions can be called from outside the module.",
  );
  addDoc(
    "defp",
    "defp name(args) do ... end",
    "Defines a private function.",
    "Defines a private function. Private functions can only be called from within the module where they are defined.",
  );
  addDoc(
    "defmacro",
    "defmacro name(args) do ... end",
    "Defines a public macro.",
    "Macros receive AST nodes as arguments and return AST nodes. They are expanded at compile time.",
  );
  addDoc(
    "defmacrop",
    "defmacrop name(args) do ... end",
    "Defines a private macro.",
    "Like defmacro but defines a private macro.",
  );
  addDoc(
    "defprotocol",
    "defprotocol ProtocolName do ... end",
    "Defines a protocol.",
    "Protocols provide polymorphism in Elixir. A protocol specifies a contract that implementations must fulfill.",
  );
  addDoc(
    "defimpl",
    "defimpl Protocol, for: Type do ... end",
    "Defines a protocol implementation.",
    "Implements a protocol for a specific data type.",
  );
  addDoc(
    "defstruct",
    "defstruct fields",
    "Defines a struct.",
    "Defines a struct in the current module. A struct is a tagged map with a fixed set of fields and default values.\n\nExample: defstruct name: nil, age: 0",
  );
  addDoc(
    "defguard",
    "defguard name(args) when expr",
    "Defines a public guard.",
    "Defines a guard expression that can be used in when clauses.",
  );
  addDoc(
    "defdelegate",
    "defdelegate name(args), to: Module",
    "Defines a delegate function.",
    "Delegates a function call to another module.",
  );
  addDoc(
    "defexception",
    "defexception fields",
    "Defines an exception.",
    "Defines an exception struct. Automatically implements the Exception behaviour.",
  );
  addDoc(
    "if",
    "if condition do ... else ... end",
    "Conditional expression.",
    "Evaluates the expression and executes the do block if truthy, otherwise the else block.",
  );
  addDoc(
    "unless",
    "unless condition do ... end",
    "Negated conditional.",
    "The inverse of if. Executes the body if the condition is falsy (nil or false).",
  );
  addDoc(
    "case",
    "case expr do pattern -> ... end",
    "Pattern matching control flow.",
    "Matches the given expression against multiple patterns and executes the first matching clause.",
  );
  addDoc(
    "cond",
    "cond do condition -> ... end",
    "Multi-branch conditional.",
    "Evaluates multiple conditions and executes the block for the first truthy condition.",
  );
  addDoc(
    "with",
    "with pattern <- expr, ... do ... end",
    "Chains pattern matches.",
    "Chains multiple match clauses. If all patterns match, the do block is executed.",
  );
  addDoc(
    "for",
    "for pattern <- enumerable, do: expr",
    "List comprehension.",
    "Comprehensions allow generating, filtering, and transforming collections.",
  );
  addDoc(
    "fn",
    "fn args -> body end",
    "Anonymous function.",
    "Creates an anonymous function (lambda). Can have multiple clauses.",
  );
  addDoc(
    "receive",
    "receive do pattern -> ... after timeout -> ... end",
    "Receives messages.",
    "Waits for a message matching the given patterns from the process mailbox.",
  );
  addDoc(
    "try",
    "try do ... rescue ... catch ... after ... end",
    "Exception handling.",
    "Wraps code for exception handling. rescue handles exceptions, catch handles thrown values.",
  );
  addDoc(
    "raise",
    "raise message | ExceptionModule",
    "Raises an exception.",
    "Raises a RuntimeError with the given message, or raises a specific exception module.",
  );
  addDoc(
    "import",
    "import Module, opts",
    "Imports functions from a module.",
    "Imports functions and/or macros from the given module. Options: only:, except:.",
  );
  addDoc(
    "require",
    "require Module",
    "Requires a module for macros.",
    "Requires a module to use its macros. Compiled and loaded before the current module.",
  );
  addDoc(
    "alias",
    "alias Module.Name, as: ShortName",
    "Creates a module alias.",
    "Sets up an alias so you can reference Module.Name as ShortName.",
  );
  addDoc(
    "use",
    "use Module, opts",
    "Invokes __using__ macro.",
    "Calls the __using__/1 macro defined in Module. Common for injecting functionality.",
  );
  addDoc(
    "quote",
    "quote do ... end",
    "Quotes an expression into AST.",
    "Returns the AST representation of the given code block. Used in metaprogramming.",
  );
  addDoc(
    "unquote",
    "unquote(expr)",
    "Unquotes inside a quote block.",
    "Injects a value into a quoted expression. Can only be used inside quote blocks.",
  );
  addDoc(
    "spawn",
    "spawn(fn)",
    "Spawns a new process.",
    "Creates a new process that executes the given function. Returns the PID.",
  );
  addDoc(
    "send",
    "send(dest, message)",
    "Sends a message to a process.",
    "Sends message to dest (a PID or registered name).",
  );
  addDoc(
    "self",
    "self()",
    "Returns current process PID.",
    "Returns the PID (process identifier) of the calling process.",
  );

  // Modules
  addDoc(
    "Enum",
    "Enum",
    "Functions for working with enumerables.",
    "Provides a huge set of algorithms to enumerate over enumerables: map, reduce, filter, sort, find, any?, all?, count, chunk_every, flat_map, zip, group_by, and many more.",
  );
  addDoc(
    "Map",
    "Map",
    "Functions for working with maps.",
    "A map is a key-value data structure. Functions include get/3, put/3, delete/2, merge/2, keys/1, values/1, update/4, has_key?/2.",
  );
  addDoc(
    "List",
    "List",
    "Functions for working with lists.",
    "Linked lists in Elixir. Functions include first/1, last/1, flatten/1, foldl/3, foldr/3, zip/1, delete/2, insert_at/3.",
  );
  addDoc(
    "String",
    "String",
    "Functions for UTF-8 strings.",
    "Functions for working with UTF-8 encoded binaries: split/2, trim/1, upcase/1, downcase/1, replace/3, contains?/2, length/1.",
  );
  addDoc(
    "IO",
    "IO",
    "Functions for I/O operations.",
    "Functions for handling input/output. Key functions: puts/1, inspect/2, gets/1, write/1, read/2.",
  );
  addDoc(
    "File",
    "File",
    "Functions for file system operations.",
    "Functions for interacting with the file system: read/1, write/2, exists?/1, rm/1, mkdir_p/1, ls/1.",
  );
  addDoc(
    "GenServer",
    "GenServer",
    "Generic server behaviour.",
    "A behaviour module for implementing client-server processes (OTP). Callbacks: init/1, handle_call/3, handle_cast/2, handle_info/2.",
  );
  addDoc(
    "Supervisor",
    "Supervisor",
    "Supervisor behaviour.",
    "A behaviour for implementing supervisors (OTP). Strategies: :one_for_one, :one_for_all, :rest_for_one.",
  );
  addDoc(
    "Task",
    "Task",
    "Conveniences for async tasks.",
    "Conveniences for spawning and awaiting tasks: async/1, await/2, async_stream/3, yield/2.",
  );
  addDoc(
    "Agent",
    "Agent",
    "Simple state management.",
    "A simple abstraction around state: start_link/1, get/2, update/2, get_and_update/2, stop/1.",
  );
  addDoc(
    "Kernel",
    "Kernel",
    "Default functions and macros.",
    "The default environment. Functions: is_atom/1, is_binary/1, is_list/1, is_map/1, hd/1, tl/1, length/1, elem/2, inspect/1.",
  );
  addDoc(
    "Process",
    "Process",
    "Functions for working with processes.",
    "Low-level process management: alive?/1, exit/2, flag/2, info/1, link/1, monitor/1, register/2, sleep/1.",
  );
  addDoc(
    "Regex",
    "Regex",
    "Regular expressions.",
    "Regular expression support built on PCRE. Created with the ~r sigil. Functions: run/2, scan/2, match?/2.",
  );
  addDoc(
    "Stream",
    "Stream",
    "Lazy enumerables.",
    "Streams are composable, lazy enumerables. Functions mirror Enum but compute lazily.",
  );
  addDoc(
    "Keyword",
    "Keyword",
    "Functions for keyword lists.",
    "Keyword lists are lists of {atom, value} tuples: get/3, put/3, delete/2, merge/2, keys/1, values/1.",
  );
  addDoc(
    "DateTime",
    "DateTime",
    "Date and time with timezone.",
    "Functions for date-time with timezone: utc_now/0, now/1, from_iso8601/1, to_iso8601/1, add/3, diff/3.",
  );
  addDoc(
    "Integer",
    "Integer",
    "Integer helper functions.",
    "Functions for working with integers: parse/1, digits/1, to_string/1, gcd/2, pow/2.",
  );
  addDoc(
    "Float",
    "Float",
    "Float helper functions.",
    "Functions for working with floats: parse/1, ceil/1, floor/1, round/1, to_string/1.",
  );

  // Module attributes
  addDoc(
    "@moduledoc",
    '@moduledoc """\n...\n"""',
    "Module documentation.",
    "Documents the current module. Accepts a heredoc string or false to hide from docs.",
  );
  addDoc(
    "@doc",
    '@doc """\n...\n"""',
    "Function documentation.",
    "Documents the function or macro defined immediately after this attribute.",
  );
  addDoc(
    "@spec",
    "@spec function_name(arg_types) :: return_type",
    "Type specification.",
    "Defines a typespec for a function. Used by Dialyzer for static analysis.",
  );
  addDoc(
    "@type",
    "@type type_name :: type_definition",
    "Defines a public type.",
    "Defines a custom public type for use in @spec annotations.",
  );
  addDoc(
    "@typep",
    "@typep type_name :: type_definition",
    "Defines a private type.",
    "Defines a custom private type only visible within the module.",
  );
  addDoc(
    "@callback",
    "@callback function_name(arg_types) :: return_type",
    "Defines a behaviour callback.",
    "Specifies a function that must be implemented by modules adopting this behaviour.",
  );
  addDoc(
    "@behaviour",
    "@behaviour ModuleName",
    "Declares a behaviour.",
    "Declares that the current module implements the given behaviour.",
  );
  addDoc(
    "@impl",
    "@impl true",
    "Marks a callback implementation.",
    "Marks the following function as a callback implementation.",
  );
  addDoc(
    "@enforce_keys",
    "@enforce_keys [:key1, :key2]",
    "Enforces struct keys.",
    "Specifies which keys must be provided when creating a struct.",
  );
  addDoc(
    "@derive",
    "@derive [Protocol1, Protocol2]",
    "Derives protocol implementations.",
    "Automatically derives protocol implementations for the struct.",
  );

  // Built-in functions
  var FUNCS = {};
  function addFunc(name, sig, detail, doc) {
    FUNCS[name] = { signature: sig, detail: detail, doc: doc };
  }

  addFunc(
    "Enum.map",
    "Enum.map(enumerable, fun)",
    "Maps a function over an enumerable.",
    "Returns a list where each element is the result of invoking fun on each element.\n\n```elixir\nEnum.map([1, 2, 3], &(&1 * 2))\n#=> [2, 4, 6]\n```",
  );
  addFunc(
    "Enum.filter",
    "Enum.filter(enumerable, fun)",
    "Filters elements by a predicate.",
    "Returns elements for which fun returns a truthy value.\n\n```elixir\nEnum.filter([1,2,3,4], &(rem(&1,2)==0))\n#=> [2, 4]\n```",
  );
  addFunc(
    "Enum.reduce",
    "Enum.reduce(enumerable, acc, fun)",
    "Reduces an enumerable.",
    "Invokes fun for each element with the accumulator.\n\n```elixir\nEnum.reduce([1,2,3], 0, &(&1+&2))\n#=> 6\n```",
  );
  addFunc(
    "Enum.each",
    "Enum.each(enumerable, fun)",
    "Iterates over an enumerable.",
    "Invokes fun for each element. Returns :ok. Used for side effects.",
  );
  addFunc(
    "Enum.find",
    "Enum.find(enumerable, default, fun)",
    "Finds the first matching element.",
    "Returns the first element for which fun returns a truthy value.",
  );
  addFunc(
    "Enum.sort",
    "Enum.sort(enumerable, sorter)",
    "Sorts an enumerable.",
    "Sorts the enumerable according to Erlang term ordering or a custom sorter.",
  );
  addFunc(
    "Enum.count",
    "Enum.count(enumerable)",
    "Returns the count of elements.",
    "Returns the number of elements in the enumerable.",
  );
  addFunc(
    "Enum.any?",
    "Enum.any?(enumerable, fun)",
    "Checks if any element matches.",
    "Returns true if fun returns truthy for at least one element.",
  );
  addFunc(
    "Enum.all?",
    "Enum.all?(enumerable, fun)",
    "Checks if all elements match.",
    "Returns true if fun returns truthy for every element.",
  );
  addFunc(
    "Enum.flat_map",
    "Enum.flat_map(enumerable, fun)",
    "Maps and flattens.",
    "Maps the given fun over enumerable and flattens the result.",
  );
  addFunc(
    "Enum.group_by",
    "Enum.group_by(enumerable, key_fun)",
    "Groups elements by key.",
    "Splits the enumerable into groups based on key_fun.",
  );
  addFunc(
    "Enum.zip",
    "Enum.zip(enumerables)",
    "Zips enumerables together.",
    "Zips corresponding elements from multiple enumerables into tuples.",
  );
  addFunc(
    "Enum.chunk_every",
    "Enum.chunk_every(enumerable, count)",
    "Chunks an enumerable.",
    "Returns a list of lists each containing count elements.",
  );
  addFunc(
    "Enum.into",
    "Enum.into(enumerable, collectable)",
    "Inserts into a collectable.",
    "Inserts the given enumerable into a collectable (e.g. a map).",
  );
  addFunc(
    "Enum.uniq",
    "Enum.uniq(enumerable)",
    "Removes duplicates.",
    "Returns a list with unique elements, preserving order.",
  );
  addFunc(
    "Enum.join",
    "Enum.join(enumerable, joiner)",
    "Joins into a string.",
    "Joins the given enumerable into a string with the given joiner.",
  );
  addFunc(
    "Enum.take",
    "Enum.take(enumerable, amount)",
    "Takes elements.",
    "Takes the first amount elements from the enumerable.",
  );
  addFunc(
    "Enum.reverse",
    "Enum.reverse(enumerable)",
    "Reverses an enumerable.",
    "Returns a list of elements in reverse order.",
  );
  addFunc(
    "Enum.reject",
    "Enum.reject(enumerable, fun)",
    "Rejects elements.",
    "Returns elements for which fun returns a falsy value.",
  );
  addFunc(
    "Enum.sum",
    "Enum.sum(enumerable)",
    "Sums elements.",
    "Returns the sum of all elements.",
  );
  addFunc(
    "Enum.min",
    "Enum.min(enumerable)",
    "Returns minimum.",
    "Returns the minimum element.",
  );
  addFunc(
    "Enum.max",
    "Enum.max(enumerable)",
    "Returns maximum.",
    "Returns the maximum element.",
  );
  addFunc(
    "Map.get",
    "Map.get(map, key, default)",
    "Gets a value from a map.",
    "Returns the value for key in map, or default if not found.",
  );
  addFunc(
    "Map.put",
    "Map.put(map, key, value)",
    "Puts a value in a map.",
    "Returns a new map with the given key-value pair.",
  );
  addFunc(
    "Map.delete",
    "Map.delete(map, key)",
    "Deletes a key from a map.",
    "Deletes the entry for key from map.",
  );
  addFunc(
    "Map.merge",
    "Map.merge(map1, map2)",
    "Merges two maps.",
    "Merges two maps. Keys in map2 override keys in map1.",
  );
  addFunc(
    "Map.keys",
    "Map.keys(map)",
    "Returns all keys.",
    "Returns all keys from the map as a list.",
  );
  addFunc(
    "Map.values",
    "Map.values(map)",
    "Returns all values.",
    "Returns all values from the map as a list.",
  );
  addFunc(
    "Map.update",
    "Map.update(map, key, initial, fun)",
    "Updates a value.",
    "Updates key with the given function. If key is not present, initial is inserted.",
  );
  addFunc(
    "Map.has_key?",
    "Map.has_key?(map, key)",
    "Checks if a key exists.",
    "Returns true if the map has the given key.",
  );
  addFunc(
    "Map.new",
    "Map.new(enumerable)",
    "Creates a new map.",
    "Creates a map from an enumerable of key-value pairs.",
  );
  addFunc(
    "String.split",
    "String.split(string, pattern)",
    "Splits a string.",
    "Divides a string into substrings based on a pattern.",
  );
  addFunc(
    "String.trim",
    "String.trim(string)",
    "Trims whitespace.",
    "Returns string with leading and trailing whitespace removed.",
  );
  addFunc(
    "String.upcase",
    "String.upcase(string)",
    "Converts to uppercase.",
    "Converts all characters to uppercase.",
  );
  addFunc(
    "String.downcase",
    "String.downcase(string)",
    "Converts to lowercase.",
    "Converts all characters to lowercase.",
  );
  addFunc(
    "String.replace",
    "String.replace(subject, pattern, replacement)",
    "Replaces occurrences.",
    "Returns a new string with all occurrences of pattern replaced.",
  );
  addFunc(
    "String.contains?",
    "String.contains?(string, contents)",
    "Checks for substring.",
    "Returns true if string contains the given contents.",
  );
  addFunc(
    "String.starts_with?",
    "String.starts_with?(string, prefix)",
    "Checks prefix.",
    "Returns true if string starts with the given prefix.",
  );
  addFunc(
    "String.length",
    "String.length(string)",
    "Returns grapheme count.",
    "Returns the number of Unicode graphemes in the string.",
  );
  addFunc(
    "String.to_integer",
    "String.to_integer(string)",
    "Parses an integer.",
    "Converts a string to an integer.",
  );
  addFunc(
    "IO.puts",
    "IO.puts(item)",
    "Writes to stdout with newline.",
    "Writes item to standard output followed by a newline. Returns :ok.",
  );
  addFunc(
    "IO.inspect",
    "IO.inspect(item, opts)",
    "Inspects and returns the item.",
    "Inspects item, writes it to stdout, and returns item. Great for debugging in pipelines.",
  );
  addFunc(
    "List.first",
    "List.first(list)",
    "Returns the first element.",
    "Returns the first element, or nil if empty.",
  );
  addFunc(
    "List.last",
    "List.last(list)",
    "Returns the last element.",
    "Returns the last element, or nil if empty.",
  );
  addFunc(
    "List.flatten",
    "List.flatten(list)",
    "Flattens nested lists.",
    "Flattens the given list of nested lists.",
  );
  addFunc(
    "GenServer.start_link",
    "GenServer.start_link(module, init_arg, opts)",
    "Starts a GenServer.",
    "Starts a GenServer process linked to the current process.",
  );
  addFunc(
    "GenServer.call",
    "GenServer.call(server, request, timeout)",
    "Makes a synchronous call.",
    "Makes a synchronous call to server and waits for a reply.",
  );
  addFunc(
    "GenServer.cast",
    "GenServer.cast(server, request)",
    "Sends an async request.",
    "Sends an asynchronous request to server. Returns :ok immediately.",
  );
  addFunc(
    "Task.async",
    "Task.async(fun)",
    "Starts an async task.",
    "Starts a task that must be awaited on.",
  );
  addFunc(
    "Task.await",
    "Task.await(task, timeout)",
    "Awaits a task result.",
    "Awaits a task reply and returns it.",
  );
  addFunc(
    "Agent.start_link",
    "Agent.start_link(fun, opts)",
    "Starts an Agent.",
    "Starts an agent linked to the current process.",
  );
  addFunc(
    "Agent.get",
    "Agent.get(agent, fun, timeout)",
    "Gets the agent state.",
    "Gets a value from the agent by the given function.",
  );
  addFunc(
    "Agent.update",
    "Agent.update(agent, fun, timeout)",
    "Updates the agent state.",
    "Updates the agent state with the given function.",
  );
  addFunc(
    "Kernel.inspect",
    "inspect(term, opts)",
    "Inspects a data structure.",
    "Returns a string representation of the given term.",
  );
  addFunc(
    "Kernel.is_nil",
    "is_nil(term)",
    "Checks if nil.",
    "Returns true if term is nil. Allowed in guard clauses.",
  );
  addFunc(
    "Kernel.is_atom",
    "is_atom(term)",
    "Checks if an atom.",
    "Returns true if term is an atom. Allowed in guard clauses.",
  );
  addFunc(
    "Kernel.is_binary",
    "is_binary(term)",
    "Checks if a binary/string.",
    "Returns true if term is a binary (string). Allowed in guard clauses.",
  );
  addFunc(
    "Kernel.is_list",
    "is_list(term)",
    "Checks if a list.",
    "Returns true if term is a list. Allowed in guard clauses.",
  );
  addFunc(
    "Kernel.is_map",
    "is_map(term)",
    "Checks if a map.",
    "Returns true if term is a map. Allowed in guard clauses.",
  );
  addFunc(
    "Kernel.is_integer",
    "is_integer(term)",
    "Checks if an integer.",
    "Returns true if term is an integer. Allowed in guard clauses.",
  );
  addFunc(
    "Kernel.is_float",
    "is_float(term)",
    "Checks if a float.",
    "Returns true if term is a float. Allowed in guard clauses.",
  );
  addFunc(
    "Kernel.is_number",
    "is_number(term)",
    "Checks if a number.",
    "Returns true if term is a number (integer or float). Allowed in guard clauses.",
  );
  addFunc(
    "Kernel.is_tuple",
    "is_tuple(term)",
    "Checks if a tuple.",
    "Returns true if term is a tuple. Allowed in guard clauses.",
  );
  addFunc(
    "Kernel.is_boolean",
    "is_boolean(term)",
    "Checks if a boolean.",
    "Returns true if term is true or false. Allowed in guard clauses.",
  );
  addFunc(
    "Kernel.hd",
    "hd(list)",
    "Returns the head of a list.",
    "Returns the first element (head) of a non-empty list. Allowed in guards.",
  );
  addFunc(
    "Kernel.tl",
    "tl(list)",
    "Returns the tail of a list.",
    "Returns the list without its first element. Allowed in guards.",
  );
  addFunc(
    "Kernel.length",
    "length(list)",
    "Returns the length of a list.",
    "Returns the length of the list. O(n) time. Allowed in guards.",
  );
  addFunc(
    "Kernel.elem",
    "elem(tuple, index)",
    "Gets a tuple element.",
    "Returns the element at index in the tuple (zero-indexed). Allowed in guards.",
  );
  addFunc(
    "Kernel.put_elem",
    "put_elem(tuple, index, value)",
    "Sets a tuple element.",
    "Returns a new tuple with the element at index replaced.",
  );
  addFunc(
    "Kernel.to_string",
    "to_string(term)",
    "Converts to string.",
    "Converts the given term to a string via the String.Chars protocol.",
  );

  // ── 5. Module Function Lists ───────────────────────────────────────────
  var moduleFunctions = {
    Enum: [
      "map",
      "filter",
      "reduce",
      "each",
      "find",
      "sort",
      "sort_by",
      "count",
      "any?",
      "all?",
      "empty?",
      "member?",
      "flat_map",
      "group_by",
      "zip",
      "unzip",
      "chunk_every",
      "chunk_by",
      "into",
      "uniq",
      "uniq_by",
      "join",
      "take",
      "take_while",
      "drop",
      "drop_while",
      "reverse",
      "min",
      "max",
      "min_by",
      "max_by",
      "sum",
      "product",
      "frequencies",
      "at",
      "fetch",
      "fetch!",
      "random",
      "shuffle",
      "slice",
      "split",
      "with_index",
      "concat",
      "dedup",
      "reject",
      "scan",
      "map_join",
      "map_reduce",
      "intersperse",
      "to_list",
    ],
    Map: [
      "new",
      "get",
      "get_lazy",
      "fetch",
      "fetch!",
      "put",
      "put_new",
      "put_new_lazy",
      "delete",
      "drop",
      "take",
      "merge",
      "update",
      "update!",
      "replace",
      "replace!",
      "keys",
      "values",
      "to_list",
      "from_struct",
      "has_key?",
      "equal?",
      "pop",
      "pop!",
      "split",
    ],
    List: [
      "first",
      "last",
      "flatten",
      "foldl",
      "foldr",
      "zip",
      "wrap",
      "delete",
      "delete_at",
      "insert_at",
      "update_at",
      "replace_at",
      "pop_at",
      "starts_with?",
      "to_tuple",
      "to_string",
      "duplicate",
      "keyfind",
      "keymember?",
      "keyreplace",
      "keystore",
      "keytake",
    ],
    String: [
      "split",
      "trim",
      "trim_leading",
      "trim_trailing",
      "upcase",
      "downcase",
      "capitalize",
      "replace",
      "replace_prefix",
      "replace_suffix",
      "contains?",
      "starts_with?",
      "ends_with?",
      "length",
      "slice",
      "at",
      "reverse",
      "pad_leading",
      "pad_trailing",
      "duplicate",
      "graphemes",
      "codepoints",
      "to_integer",
      "to_float",
      "to_atom",
      "to_existing_atom",
      "to_charlist",
      "valid?",
      "match?",
    ],
    IO: [
      "puts",
      "inspect",
      "gets",
      "write",
      "read",
      "binread",
      "binwrite",
      "iodata_length",
      "iodata_to_binary",
      "warn",
    ],
    File: [
      "read",
      "read!",
      "write",
      "write!",
      "exists?",
      "rm",
      "rm!",
      "rm_rf",
      "mkdir",
      "mkdir!",
      "mkdir_p",
      "mkdir_p!",
      "ls",
      "ls!",
      "stat",
      "stat!",
      "cp",
      "cp!",
      "rename",
      "rename!",
      "open",
      "open!",
      "close",
      "stream!",
      "cwd",
      "cwd!",
      "dir?",
      "regular?",
    ],
    Keyword: [
      "get",
      "fetch",
      "fetch!",
      "put",
      "put_new",
      "delete",
      "drop",
      "take",
      "merge",
      "keys",
      "values",
      "has_key?",
      "pop",
      "split",
      "keyword?",
      "new",
      "to_list",
      "replace",
      "update",
    ],
    GenServer: [
      "start_link",
      "start",
      "call",
      "cast",
      "reply",
      "stop",
      "whereis",
    ],
    Supervisor: [
      "start_link",
      "start_child",
      "terminate_child",
      "restart_child",
      "delete_child",
      "stop",
      "count_children",
      "which_children",
      "init",
    ],
    Task: [
      "async",
      "await",
      "async_stream",
      "yield",
      "yield_many",
      "shutdown",
      "start",
      "start_link",
      "completed",
    ],
    Agent: [
      "start_link",
      "start",
      "get",
      "get_and_update",
      "update",
      "stop",
      "cast",
    ],
    Process: [
      "alive?",
      "exit",
      "flag",
      "info",
      "link",
      "unlink",
      "monitor",
      "demonitor",
      "register",
      "unregister",
      "registered",
      "whereis",
      "send_after",
      "sleep",
      "list",
      "get",
      "put",
      "delete",
    ],
    Stream: [
      "map",
      "filter",
      "reject",
      "take",
      "take_while",
      "take_every",
      "drop",
      "drop_while",
      "chunk_every",
      "chunk_by",
      "flat_map",
      "concat",
      "cycle",
      "dedup",
      "each",
      "intersperse",
      "interval",
      "iterate",
      "map_every",
      "repeatedly",
      "resource",
      "run",
      "scan",
      "timer",
      "transform",
      "unfold",
      "uniq",
      "with_index",
      "zip",
    ],
    Regex: [
      "run",
      "scan",
      "match?",
      "replace",
      "split",
      "compile",
      "compile!",
      "named_captures",
      "names",
      "source",
    ],
    Integer: [
      "to_string",
      "to_charlist",
      "parse",
      "digits",
      "undigits",
      "gcd",
      "pow",
      "mod",
      "floor_div",
      "is_odd",
      "is_even",
    ],
    Float: [
      "to_string",
      "to_charlist",
      "parse",
      "ceil",
      "floor",
      "round",
      "ratio",
      "pow",
    ],
    Atom: ["to_string", "to_charlist"],
    Tuple: [
      "to_list",
      "append",
      "delete_at",
      "duplicate",
      "insert_at",
      "product",
      "sum",
    ],
    MapSet: [
      "new",
      "put",
      "delete",
      "member?",
      "size",
      "to_list",
      "union",
      "intersection",
      "difference",
      "disjoint?",
      "subset?",
      "equal?",
      "filter",
      "reject",
    ],
    DateTime: [
      "utc_now",
      "now",
      "now!",
      "new",
      "new!",
      "from_unix",
      "from_unix!",
      "from_iso8601",
      "to_iso8601",
      "to_unix",
      "to_date",
      "to_time",
      "add",
      "diff",
      "compare",
      "truncate",
    ],
    Date: [
      "utc_today",
      "new",
      "new!",
      "from_iso8601",
      "to_iso8601",
      "to_string",
      "add",
      "diff",
      "compare",
      "range",
      "day_of_week",
      "day_of_year",
      "days_in_month",
      "leap_year?",
    ],
    Time: [
      "utc_now",
      "new",
      "new!",
      "from_iso8601",
      "to_iso8601",
      "to_string",
      "add",
      "diff",
      "compare",
      "truncate",
    ],
    URI: [
      "parse",
      "new",
      "to_string",
      "merge",
      "encode",
      "decode",
      "encode_query",
      "decode_query",
    ],
    Path: [
      "join",
      "expand",
      "relative_to",
      "absname",
      "basename",
      "dirname",
      "extname",
      "rootname",
      "split",
      "type",
      "wildcard",
    ],
    System: [
      "argv",
      "cmd",
      "get_env",
      "put_env",
      "delete_env",
      "halt",
      "monotonic_time",
      "system_time",
      "unique_integer",
      "version",
      "tmp_dir",
      "user_home",
    ],
    Logger: [
      "debug",
      "info",
      "notice",
      "warning",
      "error",
      "critical",
      "alert",
      "emergency",
      "configure",
      "level",
      "metadata",
    ],
  };

  // ── 6. Snippets ────────────────────────────────────────────────────────
  var CIK = monaco.languages.CompletionItemKind;
  var CITR = monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet;

  function snip(label, text, detail, doc) {
    return {
      label: label,
      kind: CIK.Snippet,
      insertText: text,
      insertTextRules: CITR,
      detail: detail,
      documentation: doc,
    };
  }

  var snippets = [
    snip(
      "defmodule",
      "defmodule ${1:ModuleName} do\n\t$0\nend",
      "Module definition",
      "Defines a new module",
    ),
    snip(
      "def",
      "def ${1:function_name}(${2:args}) do\n\t$0\nend",
      "Public function",
      "Defines a public function",
    ),
    snip(
      "defp",
      "defp ${1:function_name}(${2:args}) do\n\t$0\nend",
      "Private function",
      "Defines a private function",
    ),
    snip(
      "defstruct",
      "defstruct [${1:fields}]",
      "Struct definition",
      "Defines a struct",
    ),
    snip(
      "defprotocol",
      "defprotocol ${1:ProtocolName} do\n\tdef ${2:function_name}(${3:args})\nend",
      "Protocol definition",
      "Defines a protocol",
    ),
    snip(
      "defimpl",
      "defimpl ${1:Protocol}, for: ${2:Type} do\n\tdef ${3:function_name}(${4:args}) do\n\t\t$0\n\tend\nend",
      "Protocol implementation",
      "Implements a protocol",
    ),
    snip(
      "defmacro",
      "defmacro ${1:macro_name}(${2:args}) do\n\tquote do\n\t\t$0\n\tend\nend",
      "Macro definition",
      "Defines a macro",
    ),
    snip(
      "defguard",
      "defguard ${1:guard_name}(${2:args}) when ${3:expression}",
      "Guard definition",
      "Defines a custom guard",
    ),
    snip(
      "defdelegate",
      "defdelegate ${1:function_name}(${2:args}), to: ${3:Module}",
      "Delegate definition",
      "Delegates to another module",
    ),
    snip(
      "if",
      "if ${1:condition} do\n\t$0\nend",
      "if block",
      "Conditional if expression",
    ),
    snip(
      "ifelse",
      "if ${1:condition} do\n\t${2}\nelse\n\t$0\nend",
      "if/else block",
      "Conditional if/else expression",
    ),
    snip(
      "unless",
      "unless ${1:condition} do\n\t$0\nend",
      "unless block",
      "Negated conditional",
    ),
    snip(
      "case",
      "case ${1:expression} do\n\t${2:pattern} ->\n\t\t${3}\n\n\t_ ->\n\t\t$0\nend",
      "case expression",
      "Pattern matching case",
    ),
    snip(
      "cond",
      "cond do\n\t${1:condition} ->\n\t\t${2}\n\n\ttrue ->\n\t\t$0\nend",
      "cond expression",
      "Multi-way conditional",
    ),
    snip(
      "with",
      "with ${1:pattern} <- ${2:expression} do\n\t$0\nend",
      "with expression",
      "Chain pattern matches",
    ),
    snip(
      "for",
      "for ${1:item} <- ${2:enumerable} do\n\t$0\nend",
      "for comprehension",
      "List comprehension",
    ),
    snip(
      "forinto",
      "for ${1:item} <- ${2:enumerable}, into: ${3:collectable} do\n\t$0\nend",
      "for with into",
      "Comprehension into collectable",
    ),
    snip(
      "fn",
      "fn ${1:args} -> ${0:body} end",
      "Anonymous function",
      "Creates an anonymous function",
    ),
    snip(
      "receive",
      "receive do\n\t${1:pattern} ->\n\t\t$0\nafter\n\t${2:5000} ->\n\t\t:timeout\nend",
      "receive block",
      "Receives messages from the mailbox",
    ),
    snip(
      "tryrescue",
      "try do\n\t${1}\nrescue\n\t${2:e} in ${3:RuntimeError} ->\n\t\t$0\nend",
      "try/rescue block",
      "Exception handling",
    ),
    snip(
      "trycatch",
      "try do\n\t${1}\ncatch\n\t${2:kind}, ${3:value} ->\n\t\t$0\nend",
      "try/catch block",
      "Catch thrown values",
    ),
    snip(
      "genserver",
      [
        "defmodule ${1:MyServer} do",
        "\tuse GenServer",
        "",
        "\t# Client API",
        "",
        "\tdef start_link(init_arg) do",
        "\t\tGenServer.start_link(__MODULE__, init_arg, name: __MODULE__)",
        "\tend",
        "",
        "\t# Server Callbacks",
        "",
        "\t@impl true",
        "\tdef init(init_arg) do",
        "\t\t{:ok, init_arg}",
        "\tend",
        "",
        "\t@impl true",
        "\tdef handle_call(${2:request}, _from, state) do",
        "\t\t{:reply, state, state}",
        "\tend",
        "",
        "\t@impl true",
        "\tdef handle_cast(${3:request}, state) do",
        "\t\t{:noreply, state}",
        "\tend",
        "end",
      ].join("\n"),
      "GenServer module",
      "Complete GenServer boilerplate",
    ),
    snip(
      "supervisor",
      [
        "defmodule ${1:MySupervisor} do",
        "\tuse Supervisor",
        "",
        "\tdef start_link(init_arg) do",
        "\t\tSupervisor.start_link(__MODULE__, init_arg, name: __MODULE__)",
        "\tend",
        "",
        "\t@impl true",
        "\tdef init(_init_arg) do",
        "\t\tchildren = [",
        "\t\t\t${2:child_spec}",
        "\t\t]",
        "",
        "\t\tSupervisor.init(children, strategy: :one_for_one)",
        "\tend",
        "end",
      ].join("\n"),
      "Supervisor module",
      "Complete Supervisor boilerplate",
    ),
    snip(
      "handle_call",
      "@impl true\ndef handle_call(${1:request}, _from, state) do\n\t${0:reply} = state\n\t{:reply, reply, state}\nend",
      "handle_call callback",
      "GenServer handle_call/3",
    ),
    snip(
      "handle_cast",
      "@impl true\ndef handle_cast(${1:request}, state) do\n\t$0\n\t{:noreply, state}\nend",
      "handle_cast callback",
      "GenServer handle_cast/2",
    ),
    snip(
      "handle_info",
      "@impl true\ndef handle_info(${1:msg}, state) do\n\t$0\n\t{:noreply, state}\nend",
      "handle_info callback",
      "GenServer handle_info/2",
    ),
    snip(
      "test",
      'test "${1:description}" do\n\t$0\nend',
      "ExUnit test",
      "Defines a test case",
    ),
    snip(
      "describe",
      'describe "${1:context}" do\n\t$0\nend',
      "ExUnit describe",
      "Groups related tests",
    ),
    snip(
      "setup",
      "setup do\n\t$0\n\t:ok\nend",
      "ExUnit setup",
      "Runs before each test",
    ),
    snip(
      "doc",
      '@doc """\n${1:Documentation}\n"""',
      "Function documentation",
      "Adds @doc attribute",
    ),
    snip(
      "moduledoc",
      '@moduledoc """\n${1:Module documentation}\n"""',
      "Module documentation",
      "Adds @moduledoc attribute",
    ),
    snip(
      "spec",
      "@spec ${1:function_name}(${2:arg_type}) :: ${3:return_type}",
      "Type specification",
      "Adds a type spec",
    ),
    snip(
      "typet",
      "@type ${1:type_name} :: ${2:type_definition}",
      "Type definition",
      "Defines a custom type",
    ),
    snip(
      "callback",
      "@callback ${1:function_name}(${2:arg_type}) :: ${3:return_type}",
      "Callback definition",
      "Defines a behaviour callback",
    ),
    snip(
      "behaviour",
      "@behaviour ${1:ModuleName}",
      "Behaviour declaration",
      "Declares a behaviour",
    ),
    snip(
      "pipe",
      "|> ${1:function}(${2})",
      "Pipe operator",
      "Pipes into a function",
    ),
    snip(
      "pry",
      "require IEx; IEx.pry()",
      "IEx debugger",
      "Insert a pry breakpoint",
    ),
    snip("dbg", "dbg(${1})", "Debug macro", "Debug expression (Elixir 1.14+)"),
  ];

  // ── 7. Completion Item Provider ────────────────────────────────────────
  monaco.languages.registerCompletionItemProvider("elixir", {
    triggerCharacters: [".", ":", "@", "&", "%", "|"],
    provideCompletionItems: function (model, position) {
      var textUntil = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });
      var word = model.getWordUntilPosition(position);
      var range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };
      var suggestions = [];

      // After Module. (e.g. Enum.)
      var modDotMatch = textUntil.match(/([A-Z]\w*)\.(\w*)$/);
      if (modDotMatch) {
        var modName = modDotMatch[1];
        var fns = moduleFunctions[modName];
        if (fns) {
          for (var i = 0; i < fns.length; i++) {
            var fn = fns[i];
            var key = modName + "." + fn;
            var fd = FUNCS[key];
            suggestions.push({
              label: fn,
              kind: CIK.Function,
              insertText: fn,
              range: range,
              detail: fd ? fd.detail : modName + "." + fn,
              documentation: fd ? { value: fd.doc } : undefined,
              sortText: "0" + fn,
            });
          }
          return { suggestions: suggestions };
        }
      }

      // After @ (module attributes)
      var atMatch = textUntil.match(/@(\w*)$/);
      if (atMatch) {
        var attrs = [
          "moduledoc",
          "doc",
          "spec",
          "type",
          "typep",
          "opaque",
          "callback",
          "macrocallback",
          "behaviour",
          "impl",
          "derive",
          "enforce_keys",
          "deprecated",
          "dialyzer",
          "compile",
          "external_resource",
          "on_load",
          "vsn",
          "optional_callbacks",
          "before_compile",
          "after_compile",
        ];
        for (var i = 0; i < attrs.length; i++) {
          var attr = attrs[i];
          var ad = DOCS["@" + attr];
          suggestions.push({
            label: attr,
            kind: CIK.Property,
            insertText: attr,
            range: range,
            detail: ad ? ad.detail : "Module attribute @" + attr,
            documentation: ad ? { value: ad.doc } : undefined,
            sortText: "0" + attr,
          });
        }
        return { suggestions: suggestions };
      }

      // Snippets
      for (var i = 0; i < snippets.length; i++) {
        var s = snippets[i];
        suggestions.push({
          label: s.label,
          kind: s.kind,
          insertText: s.insertText,
          insertTextRules: s.insertTextRules,
          range: range,
          detail: s.detail,
          documentation: s.documentation,
          sortText: "1" + s.label,
        });
      }

      // Keywords
      var keywords = [
        "def",
        "defp",
        "defmodule",
        "defprotocol",
        "defimpl",
        "defmacro",
        "defmacrop",
        "defguard",
        "defguardp",
        "defdelegate",
        "defstruct",
        "defexception",
        "defoverridable",
        "do",
        "end",
        "fn",
        "case",
        "cond",
        "with",
        "if",
        "unless",
        "else",
        "when",
        "in",
        "and",
        "or",
        "not",
        "for",
        "receive",
        "after",
        "try",
        "catch",
        "rescue",
        "raise",
        "throw",
        "import",
        "require",
        "alias",
        "use",
        "quote",
        "unquote",
        "unquote_splicing",
        "super",
        "spawn",
        "spawn_link",
        "send",
        "self",
      ];
      for (var i = 0; i < keywords.length; i++) {
        var kw = keywords[i];
        var kd = DOCS[kw];
        suggestions.push({
          label: kw,
          kind: CIK.Keyword,
          insertText: kw,
          range: range,
          detail: kd ? kd.detail : "keyword",
          documentation: kd ? { value: kd.doc } : undefined,
          sortText: "2" + kw,
        });
      }

      // Constants
      var constants = [
        "true",
        "false",
        "nil",
        "__MODULE__",
        "__DIR__",
        "__ENV__",
        "__CALLER__",
        "__STACKTRACE__",
      ];
      for (var i = 0; i < constants.length; i++) {
        suggestions.push({
          label: constants[i],
          kind: CIK.Constant,
          insertText: constants[i],
          range: range,
          sortText: "2" + constants[i],
        });
      }

      // Module names
      var modNames = Object.keys(moduleFunctions);
      for (var i = 0; i < modNames.length; i++) {
        var mn = modNames[i];
        var md = DOCS[mn];
        suggestions.push({
          label: mn,
          kind: CIK.Module,
          insertText: mn,
          range: range,
          detail: md ? md.detail : "Module",
          documentation: md ? { value: md.doc } : undefined,
          sortText: "3" + mn,
        });
      }

      // Kernel functions
      var kernelFuncs = [
        "inspect",
        "to_string",
        "is_nil",
        "is_atom",
        "is_binary",
        "is_list",
        "is_map",
        "is_integer",
        "is_float",
        "is_number",
        "is_tuple",
        "is_boolean",
        "is_pid",
        "is_reference",
        "is_function",
        "is_struct",
        "hd",
        "tl",
        "length",
        "elem",
        "put_elem",
        "tuple_size",
        "map_size",
        "node",
        "abs",
        "ceil",
        "floor",
        "round",
        "trunc",
        "div",
        "rem",
        "max",
        "min",
        "byte_size",
        "bit_size",
        "dbg",
        "tap",
        "then",
      ];
      for (var i = 0; i < kernelFuncs.length; i++) {
        var kf = kernelFuncs[i];
        var kfd = FUNCS["Kernel." + kf];
        suggestions.push({
          label: kf,
          kind: CIK.Function,
          insertText: kf,
          range: range,
          detail: kfd ? kfd.detail : "Kernel." + kf,
          documentation: kfd ? { value: kfd.doc } : undefined,
          sortText: "4" + kf,
        });
      }

      return { suggestions: suggestions };
    },
  });

  // ── 8. Hover Provider ──────────────────────────────────────────────────
  monaco.languages.registerHoverProvider("elixir", {
    provideHover: function (model, position) {
      var wordInfo = model.getWordAtPosition(position);
      if (!wordInfo) return null;
      var text = wordInfo.word;
      var line = model.getLineContent(position.lineNumber);
      var hoverRange = new monaco.Range(
        position.lineNumber,
        wordInfo.startColumn,
        position.lineNumber,
        wordInfo.endColumn,
      );

      // Module.function hover (e.g. Enum.map)
      var before = line.substring(0, wordInfo.startColumn - 1);
      var modMatch = before.match(/([A-Z]\w*)\.$/);
      if (modMatch) {
        var key = modMatch[1] + "." + text;
        var d = FUNCS[key];
        if (d) {
          return {
            range: hoverRange,
            contents: [
              { value: "```elixir\n" + d.signature + "\n```" },
              { value: "**" + d.detail + "**\n\n" + d.doc },
            ],
          };
        }
      }

      // @attribute hover
      if (before.length > 0 && before.charAt(before.length - 1) === "@") {
        var atDoc = DOCS["@" + text];
        if (atDoc) {
          return {
            range: new monaco.Range(
              position.lineNumber,
              wordInfo.startColumn - 1,
              position.lineNumber,
              wordInfo.endColumn,
            ),
            contents: [
              { value: "```elixir\n" + atDoc.signature + "\n```" },
              { value: "**" + atDoc.detail + "**\n\n" + atDoc.doc },
            ],
          };
        }
      }

      // Keyword / module hover
      var docEntry = DOCS[text];
      if (docEntry) {
        return {
          range: hoverRange,
          contents: [
            { value: "```elixir\n" + docEntry.signature + "\n```" },
            { value: "**" + docEntry.detail + "**\n\n" + docEntry.doc },
          ],
        };
      }

      // Kernel function hover
      var kDoc = FUNCS["Kernel." + text];
      if (kDoc) {
        return {
          range: hoverRange,
          contents: [
            { value: "```elixir\n" + kDoc.signature + "\n```" },
            { value: "**" + kDoc.detail + "**\n\n" + kDoc.doc },
          ],
        };
      }

      // User-defined symbols in current file
      var allText = model.getValue();
      var escaped = text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      var defRe = new RegExp(
        "(?:def|defp|defmodule|defmacro|defmacrop|defprotocol|defstruct|defguard|defdelegate|defexception)\\s+" +
          escaped +
          "\\b[^\\n]*",
        "m",
      );
      var m = defRe.exec(allText);
      if (m) {
        return {
          range: hoverRange,
          contents: [
            { value: "```elixir\n" + m[0].trim() + "\n```" },
            { value: "*Defined in this file*" },
          ],
        };
      }

      return null;
    },
  });

  // ── 9. Definition Provider ─────────────────────────────────────────────
  monaco.languages.registerDefinitionProvider("elixir", {
    provideDefinition: function (model, position) {
      var wordInfo = model.getWordAtPosition(position);
      if (!wordInfo) return null;
      var text = wordInfo.word;
      var escaped = text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      var lines = model.getValue().split("\n");

      var patterns = [
        new RegExp("^\\s*(?:def|defp)\\s+" + escaped + "\\s*[\\(]"),
        new RegExp("^\\s*(?:def|defp)\\s+" + escaped + "\\s+do\\b"),
        new RegExp("^\\s*(?:def|defp)\\s+" + escaped + "\\s*,"),
        new RegExp("^\\s*defmodule\\s+" + escaped + "\\b"),
        new RegExp("^\\s*defmacrop?\\s+" + escaped + "\\b"),
        new RegExp("^\\s*defprotocol\\s+" + escaped + "\\b"),
        new RegExp("^\\s*defguardp?\\s+" + escaped + "\\b"),
        new RegExp("^\\s*defdelegate\\s+" + escaped + "\\b"),
        new RegExp("^\\s*@type\\s+" + escaped + "\\b"),
        new RegExp("^\\s*" + escaped + "\\s*="),
      ];

      var results = [];
      for (var i = 0; i < lines.length; i++) {
        for (var p = 0; p < patterns.length; p++) {
          if (patterns[p].test(lines[i])) {
            var col = lines[i].indexOf(text);
            if (col >= 0) {
              results.push({
                uri: model.uri,
                range: new monaco.Range(
                  i + 1,
                  col + 1,
                  i + 1,
                  col + 1 + text.length,
                ),
              });
            }
            break;
          }
        }
      }
      return results.length > 0 ? results : null;
    },
  });

  // ── 10. Signature Help Provider ────────────────────────────────────────
  monaco.languages.registerSignatureHelpProvider("elixir", {
    signatureHelpTriggerCharacters: ["(", ","],
    provideSignatureHelp: function (model, position) {
      var textUntil = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });

      var match = textUntil.match(
        /(?:([A-Z]\w*)\.)?([a-z_]\w*[!?]?)\s*\(([^)]*)$/,
      );
      if (!match) return null;

      var moduleName = match[1];
      var funcName = match[2];
      var argsStr = match[3];
      var commaCount = (argsStr.match(/,/g) || []).length;

      var key = moduleName ? moduleName + "." + funcName : "Kernel." + funcName;
      var d = FUNCS[key];
      if (!d) return null;

      var sigMatch = d.signature.match(/\(([^)]*)\)/);
      var params = [];
      if (sigMatch) {
        var parts = sigMatch[1].split(",");
        for (var i = 0; i < parts.length; i++) {
          params.push({ label: parts[i].trim() });
        }
      }

      return {
        value: {
          signatures: [
            {
              label: d.signature,
              documentation: { value: d.doc },
              parameters: params,
            },
          ],
          activeSignature: 0,
          activeParameter: Math.min(commaCount, params.length - 1),
        },
        dispose: function () {},
      };
    },
  });

  // ── 11. Document Symbol Provider ───────────────────────────────────────
  monaco.languages.registerDocumentSymbolProvider("elixir", {
    provideDocumentSymbols: function (model) {
      var symbols = [];
      var lines = model.getValue().split("\n");
      var defRe =
        /^\s*(defmodule|def|defp|defmacro|defmacrop|defprotocol|defimpl|defguard|defguardp|defdelegate|defstruct|defexception)\s+([^\s(,]+)/;

      for (var i = 0; i < lines.length; i++) {
        var m = lines[i].match(defRe);
        if (m) {
          var kind;
          switch (m[1]) {
            case "defmodule":
              kind = monaco.languages.SymbolKind.Module;
              break;
            case "defprotocol":
              kind = monaco.languages.SymbolKind.Interface;
              break;
            case "defstruct":
              kind = monaco.languages.SymbolKind.Struct;
              break;
            default:
              kind = monaco.languages.SymbolKind.Function;
          }
          symbols.push({
            name: m[2],
            detail: m[1],
            kind: kind,
            range: new monaco.Range(i + 1, 1, i + 1, lines[i].length + 1),
            selectionRange: new monaco.Range(
              i + 1,
              m.index + m[1].length + 2,
              i + 1,
              m.index + m[1].length + 2 + m[2].length,
            ),
          });
        }
      }
      return symbols;
    },
  });

  // ── 12. Folding Range Provider ─────────────────────────────────────────
  monaco.languages.registerFoldingRangeProvider("elixir", {
    provideFoldingRanges: function (model) {
      var lines = model.getValue().split("\n");
      var ranges = [];
      var stack = [];

      for (var i = 0; i < lines.length; i++) {
        var trimmed = lines[i].trim();
        if (
          /\bdo\s*$/.test(trimmed) ||
          /^(defmodule|def|defp|defmacro|defprotocol|defimpl)\b/.test(trimmed)
        ) {
          stack.push(i);
        }
        if (/^end\b/.test(trimmed) && stack.length > 0) {
          var start = stack.pop();
          ranges.push({
            start: start + 1,
            end: i + 1,
            kind: monaco.languages.FoldingRangeKind.Region,
          });
        }
      }
      return ranges;
    },
  });
};
