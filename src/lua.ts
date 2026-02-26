import type * as Monaco from "monaco-editor";

export default (monaco: typeof Monaco) => {
  // ─── Register Lua Language ────────────────────────────────────────
  monaco.languages.register({
    id: "lua",
    extensions: [".lua"],
    aliases: ["Lua", "lua"],
  });

  // ─── Lua Language Configuration ───────────────────────────────────
  monaco.languages.setLanguageConfiguration("lua", {
    comments: { lineComment: "--", blockComment: ["--[[", "]]"] },
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
      { open: "[[", close: "]]" },
    ],
    surroundingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: '"', close: '"' },
      { open: "'", close: "'" },
    ],
    folding: {
      markers: {
        start: /^\s*--\s*#?region\b/,
        end: /^\s*--\s*#?endregion\b/,
      },
      offSide: false,
    },
    indentationRules: {
      increaseIndentPattern:
        /^\s*(else|elseif|for|(local\s+)?function|if|repeat|while|do)\b.*$|{\s*$/,
      decreaseIndentPattern: /^\s*(end|else|elseif|until|\})\s*$/,
    },
    wordPattern:
      /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
  });

  // ─── Monarch Tokenizer for Syntax Highlighting ────────────────────
  monaco.languages.setMonarchTokensProvider("lua", {
    defaultToken: "",
    tokenPostfix: ".lua",

    keywords: [
      "and",
      "break",
      "do",
      "else",
      "elseif",
      "end",
      "false",
      "for",
      "function",
      "goto",
      "if",
      "in",
      "local",
      "nil",
      "not",
      "or",
      "repeat",
      "return",
      "then",
      "true",
      "until",
      "while",
    ],

    builtins: [
      "print",
      "type",
      "tostring",
      "tonumber",
      "pairs",
      "ipairs",
      "next",
      "select",
      "unpack",
      "require",
      "pcall",
      "xpcall",
      "error",
      "assert",
      "collectgarbage",
      "dofile",
      "getmetatable",
      "setmetatable",
      "rawget",
      "rawset",
      "rawequal",
      "rawlen",
      "load",
      "loadfile",
      "setfenv",
      "getfenv",
      "module",
      "table",
      "string",
      "math",
      "io",
      "os",
      "coroutine",
      "debug",
      "package",
    ],

    brackets: [
      { token: "delimiter.bracket", open: "{", close: "}" },
      { token: "delimiter.array", open: "[", close: "]" },
      { token: "delimiter.parenthesis", open: "(", close: ")" },
    ],

    operators: [
      "+",
      "-",
      "*",
      "/",
      "%",
      "^",
      "#",
      "==",
      "~=",
      "<=",
      ">=",
      "<",
      ">",
      "=",
      ";",
      ":",
      ",",
      ".",
      "..",
      "...",
    ],

    symbols: /[=><!~?:&|+\-*\/\^%#\.]+/,
    escapes:
      /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8}|[0-9]{1,3})/,

    tokenizer: {
      root: [
        // long comments
        [/--\[([=]*)\[/, { token: "comment", next: "@longcomment.$1" }],
        // line comments
        [/--.*$/, "comment"],

        // whitespace
        [/\s+/, "white"],

        // long strings
        [/\[([=]*)\[/, { token: "string.longstring", next: "@longstring.$1" }],

        // numbers
        [/0[xX][0-9a-fA-F]*(\.[0-9a-fA-F]*)?([pP][\-+]?\d+)?/, "number.hex"],
        [/\d*\.\d+([eE][\-+]?\d+)?/, "number.float"],
        [/\d+([eE][\-+]?\d+)?/, "number"],

        // strings
        [/"([^"\\]|\\.)*$/, "string.invalid"],
        [/'([^'\\]|\\.)*$/, "string.invalid"],
        [/"/, "string", "@string_double"],
        [/'/, "string", "@string_single"],

        // self / identifiers / keywords
        [/self\b/, "variable.language"],
        [/_[A-Z]\w*/, "variable.predefined"],
        [
          /[a-zA-Z_]\w*(?=\s*[({"\['])/,
          {
            cases: {
              "@builtins": "support.function",
              "@default": "identifier.call",
            },
          },
        ],
        [
          /(?:\.)([a-zA-Z_]\w*)(?=\s*[({"\['])/,
          {
            cases: {
              "@builtins": "support.function",
              "@default": "identifier.method",
            },
          },
        ],
        [
          /[a-zA-Z_]\w*/,
          {
            cases: {
              "@keywords": "keyword",
              "@builtins": "support.function",
              "@default": "identifier",
            },
          },
        ],

        // delimiters and operators
        [/[{}()\[\]]/, "@brackets"],
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

      longcomment: [
        [/[^\]]+/, "comment"],
        [
          /\]([=]*)\]/,
          {
            cases: {
              "$1==$S2": { token: "comment", next: "@pop" },
              "@default": "comment",
            },
          },
        ],
        [/./, "comment"],
      ],

      longstring: [
        [/[^\]]+/, "string.longstring"],
        [
          /\]([=]*)\]/,
          {
            cases: {
              "$1==$S2": { token: "string.longstring", next: "@pop" },
              "@default": "string.longstring",
            },
          },
        ],
        [/./, "string.longstring"],
      ],

      string_double: [
        [/[^\\"]+/, "string"],
        [/@escapes/, "string.escape"],
        [/\\./, "string.escape.invalid"],
        [/"/, "string", "@pop"],
      ],

      string_single: [
        [/[^\\']+/, "string"],
        [/@escapes/, "string.escape"],
        [/\\./, "string.escape.invalid"],
        [/'/, "string", "@pop"],
      ],
    },
  });

  // ─── Built-in Documentation Database ──────────────────────────────
  const luaDocs = {
    // Global functions
    print: {
      detail: "function print(...)",
      documentation:
        "Receives any number of arguments and prints their values to stdout, converting each to a string. Not intended for formatted output — use string.format for that.",
    },
    type: {
      detail: "function type(v) -> string",
      documentation:
        'Returns the type of its only argument as a string. Possible results: "nil", "number", "string", "boolean", "table", "function", "thread", "userdata".',
    },
    tostring: {
      detail: "function tostring(v) -> string",
      documentation:
        "Converts any value to a string in a human-readable format. If the metatable of v has a __tostring metamethod, calls it with v as argument.",
    },
    tonumber: {
      detail: "function tonumber(e [, base]) -> number|nil",
      documentation:
        "Tries to convert its argument to a number. If the argument is already a number or a convertible string, returns the number; otherwise returns nil. Optional base (2-36) specifies the base for interpretation.",
    },
    pairs: {
      detail: "function pairs(t) -> iterator",
      documentation:
        "Returns an iterator function (next), the table t, and nil, so that the construction\n  for k, v in pairs(t) do ... end\nwill iterate over all key-value pairs of table t.",
    },
    ipairs: {
      detail: "function ipairs(t) -> iterator",
      documentation:
        "Returns three values: an iterator function, the table t, and 0, so that the construction\n  for i, v in ipairs(t) do ... end\nwill iterate over (1, t[1]), (2, t[2]), ..., up to the first absent index.",
    },
    next: {
      detail: "function next(table [, index]) -> key, value",
      documentation:
        "Allows a program to traverse all fields of a table. Its first argument is a table and its second argument is an index in this table. Returns the next index and its associated value.",
    },
    select: {
      detail: "function select(index, ...) -> values",
      documentation:
        'If index is a number, returns all arguments after argument number index. If index is the string "#", returns the total number of extra arguments.',
    },
    unpack: {
      detail: "function unpack(list [, i [, j]]) -> values",
      documentation:
        "Returns the elements from the given table. Equivalent to: return list[i], list[i+1], ..., list[j]",
    },
    require: {
      detail: "function require(modname) -> module",
      documentation:
        "Loads the given module. Checks package.loaded first; if not loaded, searches using package.searchers. Caches the result in package.loaded.",
    },
    pcall: {
      detail: "function pcall(f, ...) -> status, result...",
      documentation:
        "Calls function f with the given arguments in protected mode. Returns true plus all results if no error; otherwise returns false plus the error object.",
    },
    xpcall: {
      detail: "function xpcall(f, msgh, ...) -> status, result...",
      documentation:
        "Similar to pcall, except that it sets msgh as the message handler. Any error inside f is caught, and msgh is called with the error object.",
    },
    error: {
      detail: "function error(message [, level])",
      documentation:
        "Terminates the last protected function called and returns message as the error object. Level specifies how to get the error position (1=current function, 2=caller, 0=no position info).",
    },
    assert: {
      detail: "function assert(v [, message]) -> v",
      documentation:
        'Calls error if its argument v is false (nil or false); otherwise returns all its arguments. message is an error message; default is "assertion failed!"',
    },
    collectgarbage: {
      detail: "function collectgarbage([opt [, arg]])",
      documentation:
        'Generic interface to the garbage collector. Operations: "collect", "stop", "restart", "count", "step", "setpause", "setstepmul", "isrunning".',
    },
    dofile: {
      detail: "function dofile([filename])",
      documentation:
        "Opens the named file and executes its contents as a Lua chunk. Returns all values returned by the chunk. In case of errors, propagates the error to its caller.",
    },
    getmetatable: {
      detail: "function getmetatable(object) -> table|nil",
      documentation:
        "If object does not have a metatable, returns nil. If the metatable has a __metatable field, returns that value. Otherwise returns the metatable of the given object.",
    },
    setmetatable: {
      detail: "function setmetatable(table, metatable) -> table",
      documentation:
        "Sets the metatable for the given table. If metatable is nil, removes the metatable. If the original metatable has __metatable, raises an error. Returns the table.",
    },
    rawget: {
      detail: "function rawget(table, index) -> value",
      documentation:
        "Gets the real value of table[index], without invoking any metamethod.",
    },
    rawset: {
      detail: "function rawset(table, index, value) -> table",
      documentation:
        "Sets the real value of table[index] to value, without invoking any metamethod. Returns the table.",
    },
    rawequal: {
      detail: "function rawequal(v1, v2) -> boolean",
      documentation:
        "Checks whether v1 is equal to v2, without invoking any metamethod.",
    },
    rawlen: {
      detail: "function rawlen(v) -> number",
      documentation:
        "Returns the length of the object v, which must be a table or a string, without invoking the __len metamethod.",
    },
    load: {
      detail:
        "function load(chunk [, chunkname [, mode [, env]]]) -> function|nil, err",
      documentation:
        "Loads a chunk. If chunk is a string, loads it. If chunk is a function, calls it repeatedly to get the pieces. Returns compiled chunk as a function; on error returns nil plus the message.",
    },
    loadfile: {
      detail:
        "function loadfile([filename [, mode [, env]]]) -> function|nil, err",
      documentation:
        "Similar to load, but gets the chunk from file filename or from stdin if no file name is given.",
    },

    // string library
    "string.byte": {
      detail: "string.byte(s [, i [, j]]) -> int...",
      documentation:
        "Returns the internal numeric codes of the characters s[i], s[i+1], ..., s[j]. Default value for i is 1; default value for j is i.",
    },
    "string.char": {
      detail: "string.char(...) -> string",
      documentation:
        "Receives zero or more integers. Returns a string with length equal to the number of arguments, where each character has the internal code equal to its corresponding argument.",
    },
    "string.find": {
      detail:
        "string.find(s, pattern [, init [, plain]]) -> start, end, captures...",
      documentation:
        "Looks for the first match of pattern in string s. Returns start and end indices of the match, plus any captures. Returns nil if no match.",
    },
    "string.format": {
      detail: "string.format(formatstring, ...) -> string",
      documentation:
        "Returns a formatted version of its variable number of arguments following the format string. Similar to sprintf in C. Directives: %d, %i, %u, %f, %e, %g, %x, %o, %s, %q, %c, %%.",
    },
    "string.gmatch": {
      detail: "string.gmatch(s, pattern) -> iterator",
      documentation:
        "Returns an iterator function that, each time it is called, returns the next captures from pattern over the string s.",
    },
    "string.gsub": {
      detail: "string.gsub(s, pattern, repl [, n]) -> string, count",
      documentation:
        "Returns a copy of s in which all (or the first n) occurrences of the pattern are replaced. repl can be a string, table, or function.",
    },
    "string.len": {
      detail: "string.len(s) -> number",
      documentation:
        'Returns the length of the string s. The empty string "" has length 0. Embedded zeros are counted.',
    },
    "string.lower": {
      detail: "string.lower(s) -> string",
      documentation:
        "Returns a copy of the string with all uppercase letters changed to lowercase according to the current locale.",
    },
    "string.upper": {
      detail: "string.upper(s) -> string",
      documentation:
        "Returns a copy of the string with all lowercase letters changed to uppercase according to the current locale.",
    },
    "string.match": {
      detail: "string.match(s, pattern [, init]) -> captures...",
      documentation:
        "Looks for the first match of pattern in the string s. If found, returns the captures; otherwise returns nil. If pattern has no captures, returns the whole match.",
    },
    "string.rep": {
      detail: "string.rep(s, n [, sep]) -> string",
      documentation:
        "Returns a string that is the concatenation of n copies of the string s separated by the string sep (default is empty string).",
    },
    "string.reverse": {
      detail: "string.reverse(s) -> string",
      documentation: "Returns a string that is the reverse of string s.",
    },
    "string.sub": {
      detail: "string.sub(s, i [, j]) -> string",
      documentation:
        "Returns the substring from i to j. Negative indices count from the end. Default value for j is -1 (end of string).",
    },

    // table library
    "table.insert": {
      detail: "table.insert(list, [pos,] value)",
      documentation:
        "Inserts element value at position pos in list, shifting up other elements. Default value for pos is #list+1 (appends to end).",
    },
    "table.remove": {
      detail: "table.remove(list [, pos]) -> value",
      documentation:
        "Removes from list the element at position pos, returning the removed value. Default value for pos is #list (removes last element).",
    },
    "table.sort": {
      detail: "table.sort(list [, comp])",
      documentation:
        "Sorts list elements in place, from list[1] to list[#list]. comp is an optional comparison function that receives two elements and returns true when the first is less than the second.",
    },
    "table.concat": {
      detail: "table.concat(list [, sep [, i [, j]]]) -> string",
      documentation:
        "Given a list where all elements are strings or numbers, returns list[i]..sep..list[i+1]...sep..list[j]. Default sep is empty, i is 1, j is #list.",
    },
    "table.move": {
      detail: "table.move(a1, f, e, t [, a2]) -> a2",
      documentation:
        "Moves elements from table a1 into table a2 (or a1 itself). Equivalent to a2[t+k]=a1[f+k] for k=0,...,e-f. Returns the destination table a2.",
    },
    "table.pack": {
      detail: "table.pack(...) -> table",
      documentation:
        'Returns a new table with all arguments stored into keys 1, 2, etc. and with a field "n" set to the total number of arguments.',
    },
    "table.unpack": {
      detail: "table.unpack(list [, i [, j]]) -> values",
      documentation:
        "Returns the elements from the given list. By default i is 1 and j is #list.",
    },

    // math library
    "math.abs": {
      detail: "math.abs(x) -> number",
      documentation: "Returns the absolute value of x.",
    },
    "math.ceil": {
      detail: "math.ceil(x) -> integer",
      documentation: "Returns the smallest integer larger than or equal to x.",
    },
    "math.floor": {
      detail: "math.floor(x) -> integer",
      documentation: "Returns the largest integer smaller than or equal to x.",
    },
    "math.max": {
      detail: "math.max(x, ...) -> number",
      documentation: "Returns the maximum value among its arguments.",
    },
    "math.min": {
      detail: "math.min(x, ...) -> number",
      documentation: "Returns the minimum value among its arguments.",
    },
    "math.sqrt": {
      detail: "math.sqrt(x) -> number",
      documentation: "Returns the square root of x. Equivalent to x^0.5.",
    },
    "math.sin": {
      detail: "math.sin(x) -> number",
      documentation: "Returns the sine of x (assumed to be in radians).",
    },
    "math.cos": {
      detail: "math.cos(x) -> number",
      documentation: "Returns the cosine of x (assumed to be in radians).",
    },
    "math.tan": {
      detail: "math.tan(x) -> number",
      documentation: "Returns the tangent of x (assumed to be in radians).",
    },
    "math.random": {
      detail: "math.random([m [, n]]) -> number",
      documentation:
        "With no arguments, returns a uniform pseudo-random real in [0,1). With m, returns integer in [1,m]. With m,n returns integer in [m,n].",
    },
    "math.randomseed": {
      detail: "math.randomseed(x)",
      documentation: "Sets x as the seed for the pseudo-random generator.",
    },
    "math.pi": {
      detail: "math.pi = 3.14159265358979...",
      documentation: "The value of π.",
    },
    "math.huge": {
      detail: "math.huge = inf",
      documentation:
        "The float value HUGE_VAL, a value larger than any other numeric value.",
    },
    "math.log": {
      detail: "math.log(x [, base]) -> number",
      documentation:
        "Returns the logarithm of x in the given base. Default base is e (natural logarithm).",
    },
    "math.exp": {
      detail: "math.exp(x) -> number",
      documentation:
        "Returns the value e^x (where e is the base of natural logarithms).",
    },
    "math.fmod": {
      detail: "math.fmod(x, y) -> number",
      documentation:
        "Returns the remainder of the division of x by y that rounds the quotient towards zero.",
    },
    "math.integer": {
      detail: "math.tointeger(x) -> integer|nil",
      documentation:
        "If the value x is representable as a Lua integer, returns an integer with that value; otherwise returns nil.",
    },

    // io library
    "io.open": {
      detail: "io.open(filename [, mode]) -> file|nil, err",
      documentation:
        'Opens a file in the specified mode ("r", "w", "a", "r+", "w+", "a+", optionally "b" for binary). Returns a new file handle, or nil plus error message.',
    },
    "io.close": {
      detail: "io.close([file])",
      documentation: "Closes the given file. Default is stdout.",
    },
    "io.read": {
      detail: "io.read(...) -> values",
      documentation:
        'Reads the default input file according to the given formats: "*n" (number), "*a" (all), "*l" (line, default), "*L" (line with newline).',
    },
    "io.write": {
      detail: "io.write(...) -> file|nil, err",
      documentation:
        "Writes the value of each of its arguments to the default output file.",
    },
    "io.lines": {
      detail: "io.lines([filename, ...]) -> iterator",
      documentation:
        "Opens the file in read mode and returns an iterator function that reads lines from the file.",
    },

    // os library
    "os.clock": {
      detail: "os.clock() -> number",
      documentation:
        "Returns an approximation of the amount of CPU time used by the program, in seconds.",
    },
    "os.date": {
      detail: "os.date([format [, time]]) -> string|table",
      documentation:
        "Returns a string or table containing date and time, formatted according to the given format string.",
    },
    "os.time": {
      detail: "os.time([table]) -> number",
      documentation:
        "Returns the current time when called without arguments, or a time representing the local date and time specified by the given table.",
    },
    "os.execute": {
      detail: "os.execute([command]) -> bool, string, number",
      documentation:
        "Passes command to be executed by an operating system shell.",
    },
    "os.remove": {
      detail: "os.remove(filename) -> true|nil, err",
      documentation: "Deletes the file with the given name.",
    },
    "os.rename": {
      detail: "os.rename(oldname, newname) -> true|nil, err",
      documentation: "Renames a file or directory.",
    },
    "os.exit": {
      detail: "os.exit([code [, close]])",
      documentation:
        "Calls the ISO C function exit to terminate the host program. Default code is true (success).",
    },

    // coroutine library
    "coroutine.create": {
      detail: "coroutine.create(f) -> coroutine",
      documentation:
        'Creates a new coroutine, with body f. f must be a function. Returns the new coroutine (a value of type "thread").',
    },
    "coroutine.resume": {
      detail: "coroutine.resume(co [, val1, ...]) -> bool, values...",
      documentation:
        "Starts or continues the execution of coroutine co. Returns true plus values passed to yield, or false plus error message.",
    },
    "coroutine.yield": {
      detail: "coroutine.yield(...) -> values",
      documentation:
        "Suspends the execution of the calling coroutine. Any arguments to yield are passed as extra results to resume.",
    },
    "coroutine.status": {
      detail: "coroutine.status(co) -> string",
      documentation:
        'Returns the status of coroutine co: "running", "suspended", "normal", or "dead".',
    },
    "coroutine.wrap": {
      detail: "coroutine.wrap(f) -> function",
      documentation:
        "Creates a new coroutine with body f. Returns a function that resumes the coroutine each time it is called.",
    },
    "coroutine.isyieldable": {
      detail: "coroutine.isyieldable() -> boolean",
      documentation: "Returns true when the running coroutine can yield.",
    },

    // keywords
    local: {
      detail: "keyword",
      documentation:
        "Declares a local variable. Local variables have their scope limited to the block where they are declared.",
    },
    function: {
      detail: "keyword",
      documentation:
        "Declares a function. Syntax: function name(args) body end",
    },
    if: {
      detail: "keyword",
      documentation:
        "Conditional statement. Syntax: if condition then block {elseif condition then block} [else block] end",
    },
    for: {
      detail: "keyword",
      documentation:
        "Numeric: for var = start, stop [, step] do block end\nGeneric: for vars in iterator do block end",
    },
    while: {
      detail: "keyword",
      documentation: "Loop statement. Syntax: while condition do block end",
    },
    repeat: {
      detail: "keyword",
      documentation: "Loop statement. Syntax: repeat block until condition",
    },
    return: {
      detail: "keyword",
      documentation: "Returns values from a function or chunk.",
    },
    do: {
      detail: "keyword",
      documentation: "Begins a block of code. Syntax: do block end",
    },
    end: {
      detail: "keyword",
      documentation:
        "Closes a block started by function, if, for, while, do, or repeat.",
    },
    then: {
      detail: "keyword",
      documentation: "Used in if statements after the condition.",
    },
    else: {
      detail: "keyword",
      documentation: "Used in if statements for the alternative branch.",
    },
    elseif: {
      detail: "keyword",
      documentation: "Used in if statements for additional conditions.",
    },
    and: {
      detail: "keyword (logical operator)",
      documentation:
        "Logical AND. Returns its first argument if false/nil, otherwise returns its second argument.",
    },
    or: {
      detail: "keyword (logical operator)",
      documentation:
        "Logical OR. Returns its first argument if it is not false/nil, otherwise returns its second argument.",
    },
    not: {
      detail: "keyword (logical operator)",
      documentation:
        "Logical NOT. Returns true if argument is false or nil, otherwise returns false.",
    },
    nil: {
      detail: "keyword (value)",
      documentation:
        "The nil type has one single value, nil, whose main property is to be different from any other value. Represents the absence of a useful value.",
    },
    true: { detail: "keyword (boolean)", documentation: "Boolean true value." },
    false: {
      detail: "keyword (boolean)",
      documentation:
        "Boolean false value. Together with nil, makes a condition false; any other value makes it true.",
    },
    break: {
      detail: "keyword",
      documentation:
        "Terminates the execution of a while, repeat, or for loop, skipping to the next statement after the loop.",
    },
    goto: {
      detail: "keyword",
      documentation:
        "Jumps to a label. Syntax: goto labelname. Label syntax: ::labelname::",
    },
    in: {
      detail: "keyword",
      documentation:
        "Used in generic for loops. Syntax: for vars in iterator do block end",
    },
    self: {
      detail: "variable",
      documentation:
        "Implicit first parameter when using the colon method syntax. obj:method(args) is equivalent to obj.method(obj, args).",
    },
  };

  // ─── Helper: Parse symbols from source code ───────────────────────
  function parseSymbols(model) {
    const text = model.getValue();
    const lines = text.split("\n");
    const symbols = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      let m;

      // function name(...)
      m = line.match(/^\s*function\s+([a-zA-Z_][\w.:]*)\s*\(/);
      if (m) {
        const argsMatch = line.match(/\(([^)]*)\)/);
        symbols.push({
          name: m[1],
          kind: "function",
          line: i + 1,
          column: line.indexOf(m[1]) + 1,
          args: argsMatch ? argsMatch[1].trim() : "",
          fullLine: line.trim(),
        });
        continue;
      }

      // local function name(...)
      m = line.match(/^\s*local\s+function\s+([a-zA-Z_]\w*)\s*\(/);
      if (m) {
        const argsMatch = line.match(/\(([^)]*)\)/);
        symbols.push({
          name: m[1],
          kind: "function",
          line: i + 1,
          column: line.indexOf(m[1]) + 1,
          args: argsMatch ? argsMatch[1].trim() : "",
          fullLine: line.trim(),
          isLocal: true,
        });
        continue;
      }

      // name = function(...)
      m = line.match(/^\s*(local\s+)?([a-zA-Z_][\w.]*)\s*=\s*function\s*\(/);
      if (m) {
        const argsMatch = line.match(/function\s*\(([^)]*)\)/);
        symbols.push({
          name: m[2],
          kind: "function",
          line: i + 1,
          column: line.indexOf(m[2]) + 1,
          args: argsMatch ? argsMatch[1].trim() : "",
          fullLine: line.trim(),
          isLocal: !!m[1],
        });
        continue;
      }

      // local name = value (non-function)
      m = line.match(/^\s*local\s+([a-zA-Z_]\w*)\s*=\s*(.+)/);
      if (m) {
        symbols.push({
          name: m[1],
          kind: "variable",
          line: i + 1,
          column: line.indexOf(m[1]) + 1,
          value: m[2].trim(),
          fullLine: line.trim(),
          isLocal: true,
        });
        continue;
      }

      // name = value (global assignment, top level)
      m = line.match(/^([a-zA-Z_][\w.]*)\s*=\s*(.+)/);
      if (m && !m[0].match(/^(return|if|elseif|while|until|and|or|not)\b/)) {
        symbols.push({
          name: m[1],
          kind: "variable",
          line: i + 1,
          column: 1,
          value: m[2].trim(),
          fullLine: line.trim(),
        });
      }

      // :: label ::
      m = line.match(/::([a-zA-Z_]\w*)::/);
      if (m) {
        symbols.push({
          name: m[1],
          kind: "label",
          line: i + 1,
          column: line.indexOf(m[1]) + 1,
          fullLine: line.trim(),
        });
      }
    }
    return symbols;
  }

  // ─── Completion Item Provider ─────────────────────────────────────
  monaco.languages.registerCompletionItemProvider("lua", {
    triggerCharacters: [".", ":"],
    provideCompletionItems: function (model, position) {
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
      const CK = monaco.languages.CompletionItemKind;

      // Check if we're after a dot (library member access)
      const dotMatch = textUntilPosition.match(/(\w+)\.\w*$/);
      const colonMatch = textUntilPosition.match(/(\w+):\w*$/);
      const lib = dotMatch ? dotMatch[1] : colonMatch ? colonMatch[1] : null;

      if (lib) {
        const libMembers = {
          string: [
            "byte",
            "char",
            "find",
            "format",
            "gmatch",
            "gsub",
            "len",
            "lower",
            "match",
            "rep",
            "reverse",
            "sub",
            "upper",
            "dump",
          ],
          table: [
            "concat",
            "insert",
            "move",
            "pack",
            "remove",
            "sort",
            "unpack",
          ],
          math: [
            "abs",
            "acos",
            "asin",
            "atan",
            "ceil",
            "cos",
            "deg",
            "exp",
            "floor",
            "fmod",
            "huge",
            "log",
            "max",
            "maxinteger",
            "min",
            "mininteger",
            "modf",
            "pi",
            "rad",
            "random",
            "randomseed",
            "sin",
            "sqrt",
            "tan",
            "tointeger",
            "type",
          ],
          io: [
            "close",
            "flush",
            "input",
            "lines",
            "open",
            "output",
            "popen",
            "read",
            "stderr",
            "stdin",
            "stdout",
            "tmpfile",
            "type",
            "write",
          ],
          os: [
            "clock",
            "date",
            "difftime",
            "execute",
            "exit",
            "getenv",
            "remove",
            "rename",
            "setlocale",
            "time",
            "tmpname",
          ],
          coroutine: [
            "create",
            "isyieldable",
            "resume",
            "running",
            "status",
            "wrap",
            "yield",
          ],
          debug: [
            "debug",
            "gethook",
            "getinfo",
            "getlocal",
            "getmetatable",
            "getregistry",
            "getupvalue",
            "getuservalue",
            "sethook",
            "setlocal",
            "setmetatable",
            "setupvalue",
            "setuservalue",
            "traceback",
            "upvalueid",
            "upvaluejoin",
          ],
          package: [
            "config",
            "cpath",
            "loaded",
            "loadlib",
            "path",
            "preload",
            "searchers",
            "searchpath",
          ],
        };

        const members = libMembers[lib];
        if (members) {
          for (const m of members) {
            const key = lib + "." + m;
            const doc = luaDocs[key];
            suggestions.push({
              label: m,
              kind: CK.Function,
              insertText: m,
              detail: doc ? doc.detail : lib + "." + m,
              documentation: doc ? { value: doc.documentation } : undefined,
              range: range,
            });
          }
        }

        // Also check user-defined symbols on that table
        const symbols = parseSymbols(model);
        for (const sym of symbols) {
          if (sym.name.startsWith(lib + ".")) {
            const memberName = sym.name.substring(lib.length + 1);
            suggestions.push({
              label: memberName,
              kind: sym.kind === "function" ? CK.Function : CK.Variable,
              insertText:
                sym.kind === "function" ? memberName + "($0)" : memberName,
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              detail: sym.fullLine,
              range: range,
            });
          }
        }

        return { suggestions };
      }

      // ── Keywords ──
      const keywords = [
        "and",
        "break",
        "do",
        "else",
        "elseif",
        "end",
        "false",
        "for",
        "function",
        "goto",
        "if",
        "in",
        "local",
        "nil",
        "not",
        "or",
        "repeat",
        "return",
        "then",
        "true",
        "until",
        "while",
      ];
      for (const kw of keywords) {
        suggestions.push({
          label: kw,
          kind: CK.Keyword,
          insertText: kw,
          detail: "keyword",
          range: range,
        });
      }

      // ── Built-in functions ──
      const builtinFuncs = [
        "print",
        "type",
        "tostring",
        "tonumber",
        "pairs",
        "ipairs",
        "next",
        "select",
        "unpack",
        "require",
        "pcall",
        "xpcall",
        "error",
        "assert",
        "collectgarbage",
        "dofile",
        "getmetatable",
        "setmetatable",
        "rawget",
        "rawset",
        "rawequal",
        "rawlen",
        "load",
        "loadfile",
      ];
      for (const fn of builtinFuncs) {
        const doc = luaDocs[fn];
        suggestions.push({
          label: fn,
          kind: CK.Function,
          insertText: fn + "($0)",
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          detail: doc ? doc.detail : fn,
          documentation: doc ? { value: doc.documentation } : undefined,
          range: range,
        });
      }

      // ── Libraries ──
      const libs = [
        "string",
        "table",
        "math",
        "io",
        "os",
        "coroutine",
        "debug",
        "package",
      ];
      for (const lib of libs) {
        suggestions.push({
          label: lib,
          kind: CK.Module,
          insertText: lib,
          detail: lib + " library",
          documentation: { value: "The Lua `" + lib + "` standard library." },
          range: range,
        });
      }

      // ── Snippets ──
      const snippets = [
        {
          label: "func",
          detail: "function definition",
          insertText: "function ${1:name}(${2:args})\n\t${0}\nend",
        },
        {
          label: "lfunc",
          detail: "local function definition",
          insertText: "local function ${1:name}(${2:args})\n\t${0}\nend",
        },
        {
          label: "if",
          detail: "if then end",
          insertText: "if ${1:condition} then\n\t${0}\nend",
        },
        {
          label: "ife",
          detail: "if then else end",
          insertText: "if ${1:condition} then\n\t${2}\nelse\n\t${0}\nend",
        },
        {
          label: "ifeif",
          detail: "if/elseif/else",
          insertText:
            "if ${1:condition} then\n\t${2}\nelseif ${3:condition} then\n\t${4}\nelse\n\t${0}\nend",
        },
        {
          label: "fori",
          detail: "numeric for loop",
          insertText: "for ${1:i} = ${2:1}, ${3:10} do\n\t${0}\nend",
        },
        {
          label: "forp",
          detail: "pairs for loop",
          insertText: "for ${1:k}, ${2:v} in pairs(${3:t}) do\n\t${0}\nend",
        },
        {
          label: "forip",
          detail: "ipairs for loop",
          insertText: "for ${1:i}, ${2:v} in ipairs(${3:t}) do\n\t${0}\nend",
        },
        {
          label: "while",
          detail: "while loop",
          insertText: "while ${1:condition} do\n\t${0}\nend",
        },
        {
          label: "repeat",
          detail: "repeat until loop",
          insertText: "repeat\n\t${0}\nuntil ${1:condition}",
        },
        { label: "do", detail: "do block", insertText: "do\n\t${0}\nend" },
        { label: "ret", detail: "return statement", insertText: "return ${0}" },
        {
          label: "req",
          detail: "require module",
          insertText: 'local ${1:mod} = require("${2:$1}")',
        },
        {
          label: "local",
          detail: "local variable",
          insertText: "local ${1:name} = ${0}",
        },
        {
          label: "tbl",
          detail: "table definition",
          insertText: "local ${1:name} = {\n\t${0}\n}",
        },
        {
          label: "meth",
          detail: "method definition (colon syntax)",
          insertText: "function ${1:Class}:${2:method}(${3:args})\n\t${0}\nend",
        },
        {
          label: "class",
          detail: "OOP class pattern",
          insertText:
            "local ${1:ClassName} = {}\n${1:ClassName}.__index = ${1:ClassName}\n\nfunction ${1:ClassName}.new(${2:args})\n\tlocal self = setmetatable({}, ${1:ClassName})\n\t${0}\n\treturn self\nend",
        },
        {
          label: "pcall",
          detail: "protected call",
          insertText:
            "local ${1:ok}, ${2:err} = pcall(function()\n\t${0}\nend)",
        },
        {
          label: "xpcall",
          detail: "extended protected call",
          insertText:
            "local ${1:ok}, ${2:err} = xpcall(function()\n\t${0}\nend, debug.traceback)",
        },
        {
          label: "coro",
          detail: "coroutine pattern",
          insertText:
            "local ${1:co} = coroutine.create(function()\n\t${0}\nend)",
        },
        {
          label: "tern",
          detail: "ternary idiom",
          insertText: "${1:condition} and ${2:true_value} or ${3:false_value}",
        },
        {
          label: "switch",
          detail: "switch-case table pattern",
          insertText:
            "local ${1:actions} = {\n\t[${2:case1}] = function() ${3} end,\n\t[${4:case2}] = function() ${5} end,\n}\nlocal ${6:action} = ${1:actions}[${7:value}]\nif ${6:action} then ${6:action}() end",
        },
        {
          label: "module",
          detail: "module pattern",
          insertText:
            "local ${1:M} = {}\n\nfunction ${1:M}.${2:func}(${3})\n\t${0}\nend\n\nreturn ${1:M}",
        },
      ];

      for (const snip of snippets) {
        suggestions.push({
          label: snip.label,
          kind: CK.Snippet,
          insertText: snip.insertText,
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          detail: "✦ Snippet: " + snip.detail,
          documentation: {
            value:
              "```lua\n" +
              snip.insertText
                .replace(/\$\{\d+:?([^}]*)\}/g, "$1")
                .replace(/\$\d+/g, "") +
              "\n```",
          },
          range: range,
          sortText: "~" + snip.label, // push snippets to end
        });
      }

      // ── User-defined symbols ──
      const symbols = parseSymbols(model);
      const seen = new Set(builtinFuncs.concat(keywords, libs));
      for (const sym of symbols) {
        if (
          !seen.has(sym.name) &&
          !sym.name.includes(".") &&
          !sym.name.includes(":")
        ) {
          seen.add(sym.name);
          suggestions.push({
            label: sym.name,
            kind: sym.kind === "function" ? CK.Function : CK.Variable,
            insertText: sym.kind === "function" ? sym.name + "($0)" : sym.name,
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail:
              (sym.isLocal ? "local " : "") + sym.kind + " — line " + sym.line,
            documentation: { value: "```lua\n" + sym.fullLine + "\n```" },
            range: range,
          });
        }
      }

      return { suggestions };
    },
  });

  // ─── Hover Provider ───────────────────────────────────────────────
  monaco.languages.registerHoverProvider("lua", {
    provideHover: function (model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return null;

      const lineContent = model.getLineContent(position.lineNumber);
      const wordText = word.word;

      // Check if it's a library member (e.g., string.format)
      const before = lineContent.substring(0, word.startColumn - 1);
      const dotMatch = before.match(/(\w+)\.$/);
      let lookupKey = wordText;
      if (dotMatch) {
        lookupKey = dotMatch[1] + "." + wordText;
      }

      // Check built-in docs
      const doc = luaDocs[lookupKey];
      if (doc) {
        return {
          range: new monaco.Range(
            position.lineNumber,
            word.startColumn,
            position.lineNumber,
            word.endColumn,
          ),
          contents: [
            { value: "```lua\n" + doc.detail + "\n```" },
            { value: doc.documentation },
          ],
        };
      }

      // Check user-defined symbols
      const symbols = parseSymbols(model);
      for (const sym of symbols) {
        const symShort = sym.name.includes(".")
          ? sym.name.split(".").pop()
          : sym.name;
        if (sym.name === wordText || symShort === wordText) {
          const hoverLines = [];
          if (sym.kind === "function") {
            hoverLines.push({
              value:
                "```lua\n" +
                (sym.isLocal ? "local " : "") +
                "function " +
                sym.name +
                "(" +
                sym.args +
                ")\n```",
            });
          } else if (sym.kind === "variable") {
            hoverLines.push({ value: "```lua\n" + sym.fullLine + "\n```" });
          } else {
            hoverLines.push({ value: "```lua\n" + sym.fullLine + "\n```" });
          }
          hoverLines.push({ value: "*Defined at line " + sym.line + "*" });
          return {
            range: new monaco.Range(
              position.lineNumber,
              word.startColumn,
              position.lineNumber,
              word.endColumn,
            ),
            contents: hoverLines,
          };
        }
      }

      return null;
    },
  });

  // ─── Definition Provider ──────────────────────────────────────────
  monaco.languages.registerDefinitionProvider("lua", {
    provideDefinition: function (model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return null;

      const wordText = word.word;
      const symbols = parseSymbols(model);

      for (const sym of symbols) {
        const symShort = sym.name.includes(".")
          ? sym.name.split(".").pop()
          : sym.name;
        if (sym.name === wordText || symShort === wordText) {
          return {
            uri: model.uri,
            range: new monaco.Range(
              sym.line,
              sym.column,
              sym.line,
              sym.column + sym.name.length,
            ),
          };
        }
      }

      // Also look for "goto" labels  ::label::
      const text = model.getValue();
      const lines = text.split("\n");
      for (let i = 0; i < lines.length; i++) {
        const m = lines[i].match(new RegExp("::\\s*" + wordText + "\\s*::"));
        if (m) {
          const col = lines[i].indexOf(wordText) + 1;
          return {
            uri: model.uri,
            range: new monaco.Range(i + 1, col, i + 1, col + wordText.length),
          };
        }
      }

      return null;
    },
  });

  // ─── Signature Help Provider ──────────────────────────────────────
  monaco.languages.registerSignatureHelpProvider("lua", {
    signatureHelpTriggerCharacters: ["(", ","],
    provideSignatureHelp: function (model, position) {
      const textUntil = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });

      // Find the function name before the opening paren
      let depth = 0;
      let parenPos = -1;
      let paramCount = 0;
      for (let i = textUntil.length - 1; i >= 0; i--) {
        const ch = textUntil[i];
        if (ch === ")") depth++;
        else if (ch === "(") {
          if (depth === 0) {
            parenPos = i;
            break;
          }
          depth--;
        } else if (ch === "," && depth === 0) {
          paramCount++;
        }
      }

      if (parenPos <= 0) return null;

      const beforeParen = textUntil.substring(0, parenPos).trim();
      const funcMatch = beforeParen.match(/([a-zA-Z_][\w.:]*)\s*$/);
      if (!funcMatch) return null;

      const funcName = funcMatch[1].replace(":", ".");
      const doc = luaDocs[funcName];
      if (!doc) return null;

      const sigLabel = doc.detail;
      const argsMatch = sigLabel.match(/\(([^)]*)\)/);
      if (!argsMatch) return null;

      const params = argsMatch[1]
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean);
      const parameters = params.map((p) => ({
        label: p,
        documentation: "",
      }));

      return {
        value: {
          signatures: [
            {
              label: sigLabel,
              documentation: doc.documentation,
              parameters: parameters,
            },
          ],
          activeSignature: 0,
          activeParameter: Math.min(paramCount, parameters.length - 1),
        },
        dispose: function () {},
      };
    },
  });

  // ─── Document Symbol Provider ─────────────────────────────────────
  monaco.languages.registerDocumentSymbolProvider("lua", {
    provideDocumentSymbols: function (model) {
      const symbols = parseSymbols(model);
      return symbols.map(function (sym) {
        const SK = monaco.languages.SymbolKind;
        return {
          name: sym.name,
          detail: sym.fullLine,
          kind:
            sym.kind === "function"
              ? SK.Function
              : sym.kind === "label"
                ? SK.Key
                : SK.Variable,
          range: new monaco.Range(
            sym.line,
            1,
            sym.line,
            model.getLineLength(sym.line) + 1,
          ),
          selectionRange: new monaco.Range(
            sym.line,
            sym.column,
            sym.line,
            sym.column + sym.name.length,
          ),
        };
      });
    },
  });

  // ─── Document Formatting Provider ─────────────────────────────────
  monaco.languages.registerDocumentFormattingEditProvider("lua", {
    provideDocumentFormattingEdits: function (model) {
      const text = model.getValue();
      const lines = text.split("\n");
      let indent = 0;
      const tabStr = "  ";
      const result = [];
      const increaseKw =
        /^\s*(function|local\s+function|if|for|while|repeat|do|else|elseif)\b/;
      const decreaseKw = /^\s*(end|else|elseif|until)\b/;

      for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        if (!line) {
          result.push("");
          continue;
        }

        if (decreaseKw.test(line)) indent = Math.max(0, indent - 1);
        result.push(tabStr.repeat(indent) + line);
        if (increaseKw.test(line) && !line.match(/\bend\s*[,;)]*\s*$/))
          indent++;
      }

      const fullRange = model.getFullModelRange();
      return [{ range: fullRange, text: result.join("\n") }];
    },
  });
};
