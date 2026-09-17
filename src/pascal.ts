import type * as Monaco from "monaco-editor";

export default (monaco: typeof Monaco) => {
  // ──────────────────────────────────────────
  // 1. REGISTER LANGUAGE
  // ──────────────────────────────────────────
  monaco.languages.register({
    id: "pascal",
    extensions: [".pas", ".pp", ".p", ".dpr", ".dpk", ".lpr"],
    aliases: ["Pascal", "pascal", "Delphi", "ObjectPascal"],
    mimetypes: ["text/x-pascal"],
  });

  // ──────────────────────────────────────────
  // 2. MONARCH SYNTAX HIGHLIGHTING
  // ──────────────────────────────────────────
  monaco.languages.setMonarchTokensProvider("pascal", {
    defaultToken: "",
    ignoreCase: true,

    keywords: [
      "program",
      "unit",
      "library",
      "uses",
      "interface",
      "implementation",
      "initialization",
      "finalization",
      "begin",
      "end",
      "var",
      "const",
      "type",
      "array",
      "of",
      "record",
      "class",
      "object",
      "interface",
      "set",
      "file",
      "packed",
      "procedure",
      "function",
      "constructor",
      "destructor",
      "property",
      "read",
      "write",
      "default",
      "stored",
      "nodefault",
      "if",
      "then",
      "else",
      "case",
      "for",
      "to",
      "downto",
      "do",
      "while",
      "repeat",
      "until",
      "with",
      "try",
      "except",
      "finally",
      "raise",
      "on",
      "goto",
      "label",
      "break",
      "continue",
      "exit",
      "and",
      "or",
      "not",
      "xor",
      "shl",
      "shr",
      "div",
      "mod",
      "in",
      "is",
      "as",
      "nil",
      "true",
      "false",
      "self",
      "result",
      "inherited",
      "override",
      "virtual",
      "abstract",
      "dynamic",
      "overload",
      "reintroduce",
      "message",
      "private",
      "protected",
      "public",
      "published",
      "forward",
      "external",
      "cdecl",
      "stdcall",
      "register",
      "pascal",
      "safecall",
      "out",
      "threadvar",
      "resourcestring",
      "inline",
      "static",
    ],

    typeKeywords: [
      "integer",
      "longint",
      "shortint",
      "smallint",
      "int64",
      "byte",
      "word",
      "cardinal",
      "longword",
      "qword",
      "nativeint",
      "nativeuint",
      "real",
      "single",
      "double",
      "extended",
      "comp",
      "currency",
      "boolean",
      "bytebool",
      "wordbool",
      "longbool",
      "char",
      "widechar",
      "ansichar",
      "string",
      "shortstring",
      "ansistring",
      "widestring",
      "unicodestring",
      "pchar",
      "pansichar",
      "pwidechar",
      "pointer",
      "variant",
      "olevariant",
      "tobject",
      "tclass",
      "tcomponent",
      "tpersistent",
      "tstream",
      "tlist",
      "tstringlist",
      "tstrings",
      "texception",
    ],

    builtinFunctions: [
      "write",
      "writeln",
      "read",
      "readln",
      "inc",
      "dec",
      "succ",
      "pred",
      "ord",
      "chr",
      "abs",
      "sqr",
      "sqrt",
      "sin",
      "cos",
      "arctan",
      "ln",
      "exp",
      "trunc",
      "round",
      "frac",
      "int",
      "length",
      "setlength",
      "copy",
      "delete",
      "insert",
      "pos",
      "concat",
      "upcase",
      "lowercase",
      "trim",
      "trimleft",
      "trimright",
      "inttostr",
      "strtoint",
      "strtointdef",
      "floattostr",
      "strtofloat",
      "format",
      "formatfloat",
      "sizeof",
      "high",
      "low",
      "assigned",
      "addr",
      "new",
      "dispose",
      "getmem",
      "freemem",
      "reallocmem",
      "fillchar",
      "move",
      "include",
      "exclude",
      "assign",
      "reset",
      "rewrite",
      "append",
      "close",
      "eof",
      "eoln",
      "random",
      "randomize",
      "halt",
      "sleep",
    ],

    operators: [
      ":=",
      "+=",
      "-=",
      "*=",
      "/=",
      "<>",
      "<=",
      ">=",
      "<",
      ">",
      "=",
      "+",
      "-",
      "*",
      "/",
      "@",
      "^",
      ".",
    ],

    symbols: /[=><!~?:&|+\-*\/\^%@]+/,

    tokenizer: {
      root: [
        // Compiler directives
        [/\{\$[^}]*\}/, "annotation"],
        [/\(\*\$.*?\*\)/, "annotation"],

        // Comments
        [/\{/, "comment", "@braceComment"],
        [/\(\*/, "comment", "@parenComment"],
        [/\/\/.*$/, "comment"],

        // Strings
        [/'([^'\\]|\\.)*$/, "string.invalid"],
        [/'/, "string", "@string"],
        [/#\d+/, "string"],
        [/#\$[0-9a-fA-F]+/, "string"],

        // Numbers
        [/\$[0-9a-fA-F]+/, "number.hex"],
        [/\d+\.\d+([eE][\-+]?\d+)?/, "number.float"],
        [/\d+[eE][\-+]?\d+/, "number.float"],
        [/\d+/, "number"],

        // Identifiers & keywords
        [
          /[a-zA-Z_]\w*/,
          {
            cases: {
              "@keywords": "keyword",
              "@typeKeywords": "type",
              "@builtinFunctions": "predefined",
              "@default": "identifier",
            },
          },
        ],

        // Operators & delimiters
        [/[{}()\[\]]/, "@brackets"],
        [/:=/, "delimiter"],
        [
          /@symbols/,
          {
            cases: {
              "@operators": "operator",
              "@default": "delimiter",
            },
          },
        ],

        // Delimiters
        [/[;,.:()]/, "delimiter"],

        // Whitespace
        [/\s+/, "white"],
      ],

      braceComment: [
        [/[^}]+/, "comment"],
        [/\}/, "comment", "@pop"],
      ],

      parenComment: [
        [/[^*]+/, "comment"],
        [/\*\)/, "comment", "@pop"],
        [/./, "comment"],
      ],

      string: [
        [/[^']+/, "string"],
        [/''/, "string.escape"],
        [/'/, "string", "@pop"],
      ],
    },
  });

  // ──────────────────────────────────────────
  // 3. LANGUAGE CONFIGURATION (brackets, auto-closing, etc.)
  // ──────────────────────────────────────────
  monaco.languages.setLanguageConfiguration("pascal", {
    comments: {
      lineComment: "//",
      blockComment: ["{", "}"],
    },
    brackets: [
      ["(", ")"],
      ["[", "]"],
      ["begin", "end"],
    ],
    autoClosingPairs: [
      { open: "(", close: ")" },
      { open: "[", close: "]" },
      { open: "{", close: "}" },
      { open: "'", close: "'", notIn: ["string"] },
    ],
    surroundingPairs: [
      { open: "(", close: ")" },
      { open: "[", close: "]" },
      { open: "'", close: "'" },
    ],
    folding: {
      markers: {
        start: /\b(begin|record|class|try|case|repeat)\b/i,
        end: /\bend\b/i,
      },
    },
    indentationRules: {
      increaseIndentPattern:
        /\b(begin|then|else|do|of|try|except|finally|record|class|case|repeat)\s*$/i,
      decreaseIndentPattern: /^\s*(end|until)\b/i,
    },
    wordPattern:
      /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
    onEnterRules: [
      {
        beforeText: /\b(begin|then|else|do|repeat|of|try|except|finally)\s*$/i,
        action: { indentAction: monaco.languages.IndentAction.Indent },
      },
    ],
  });

  // ──────────────────────────────────────────
  // 4. DOCUMENTATION DATABASE
  // ──────────────────────────────────────────
  const pascalDocs = {
    // Keywords
    program: {
      detail: "keyword",
      doc: "Declares the name of the program. Must be the first statement in the main source file.\n\n```pascal\nprogram MyApp;\n```",
    },
    unit: {
      detail: "keyword",
      doc: "Declares a Pascal unit (module). Units allow code to be organized into reusable modules with interface and implementation sections.",
    },
    uses: {
      detail: "keyword",
      doc: "Imports other units into the current scope. Multiple units are separated by commas.\n\n```pascal\nuses SysUtils, Classes, Math;\n```",
    },
    interface: {
      detail: "keyword",
      doc: "Begins the public (interface) section of a unit. Declarations here are visible to other units that use this unit.",
    },
    implementation: {
      detail: "keyword",
      doc: "Begins the private (implementation) section of a unit. Code here is only accessible within the unit itself.",
    },
    begin: {
      detail: "keyword",
      doc: "Marks the start of a compound statement (block). Must be paired with `end`.\n\n```pascal\nbegin\n  WriteLn('Hello');\nend;\n```",
    },
    end: {
      detail: "keyword",
      doc: "Marks the end of a compound statement, record, class, case, or unit. Paired with `begin`, `record`, `class`, `case`, etc.",
    },
    var: {
      detail: "keyword",
      doc: "Declares one or more variables.\n\n```pascal\nvar\n  x: Integer;\n  name: string;\n```",
    },
    const: {
      detail: "keyword",
      doc: "Declares constants or typed constants.\n\n```pascal\nconst\n  Pi = 3.14159;\n  MaxSize: Integer = 100;\n```",
    },
    type: {
      detail: "keyword",
      doc: "Begins a type declaration section for defining custom types, records, classes, enumerations, and more.",
    },
    array: {
      detail: "keyword",
      doc: "Declares an array type.\n\n```pascal\nvar\n  a: array[1..10] of Integer;\n  d: array of string; // dynamic\n```",
    },
    record: {
      detail: "keyword",
      doc: "Defines a record type (similar to struct in C).\n\n```pascal\ntype\n  TPoint = record\n    X, Y: Integer;\n  end;\n```",
    },
    class: {
      detail: "keyword",
      doc: "Defines an Object Pascal class.\n\n```pascal\ntype\n  TAnimal = class(TObject)\n    Name: string;\n    procedure Speak; virtual;\n  end;\n```",
    },
    procedure: {
      detail: "keyword",
      doc: "Declares a procedure (subroutine that does not return a value).\n\n```pascal\nprocedure SayHello(name: string);\nbegin\n  WriteLn('Hello, ', name);\nend;\n```",
    },
    function: {
      detail: "keyword",
      doc: "Declares a function (subroutine that returns a value).\n\n```pascal\nfunction Add(a, b: Integer): Integer;\nbegin\n  Result := a + b;\nend;\n```",
    },
    if: {
      detail: "keyword",
      doc: "Conditional statement.\n\n```pascal\nif x > 0 then\n  WriteLn('Positive')\nelse\n  WriteLn('Non-positive');\n```",
    },
    for: {
      detail: "keyword",
      doc: "Counted loop.\n\n```pascal\nfor i := 1 to 10 do\n  WriteLn(i);\n```",
    },
    while: {
      detail: "keyword",
      doc: "Pre-condition loop.\n\n```pascal\nwhile x > 0 do\nbegin\n  x := x - 1;\nend;\n```",
    },
    repeat: {
      detail: "keyword",
      doc: "Post-condition loop (runs at least once).\n\n```pascal\nrepeat\n  ReadLn(input);\nuntil input = 'quit';\n```",
    },
    case: {
      detail: "keyword",
      doc: "Multi-way branch statement.\n\n```pascal\ncase day of\n  1: WriteLn('Monday');\n  2: WriteLn('Tuesday');\nelse\n  WriteLn('Other');\nend;\n```",
    },
    try: {
      detail: "keyword",
      doc: "Begins a try block for exception handling.\n\n```pascal\ntry\n  x := StrToInt(s);\nexcept\n  on E: Exception do\n    WriteLn(E.Message);\nend;\n```",
    },
    with: {
      detail: "keyword",
      doc: "Allows accessing members of a record or object without qualifying them.\n\n```pascal\nwith MyPoint do\nbegin\n  X := 10;\n  Y := 20;\nend;\n```",
    },
    nil: {
      detail: "keyword",
      doc: "Represents a null/empty pointer value. Used to indicate that a pointer or object reference does not point to anything.",
    },
    self: {
      detail: "keyword",
      doc: "Refers to the current object instance within a method. Equivalent to `this` in C++ or Java.",
    },
    result: {
      detail: "keyword",
      doc: "Implicit variable in functions that holds the return value. Assigning to `Result` sets the function's return value.",
    },
    inherited: {
      detail: "keyword",
      doc: "Calls the parent class's implementation of the current method.\n\n```pascal\nprocedure TChild.DoSomething;\nbegin\n  inherited; // calls TParent.DoSomething\nend;\n```",
    },

    // Types
    integer: {
      detail: "type",
      doc: "Signed integer type, typically 32-bit (-2,147,483,648 to 2,147,483,647). The most commonly used integer type in Pascal.",
    },
    longint: {
      detail: "type",
      doc: "Signed 32-bit integer (-2,147,483,648 to 2,147,483,647).",
    },
    shortint: { detail: "type", doc: "Signed 8-bit integer (-128 to 127)." },
    smallint: {
      detail: "type",
      doc: "Signed 16-bit integer (-32,768 to 32,767).",
    },
    int64: {
      detail: "type",
      doc: "Signed 64-bit integer (-9,223,372,036,854,775,808 to 9,223,372,036,854,775,807).",
    },
    byte: { detail: "type", doc: "Unsigned 8-bit integer (0 to 255)." },
    word: { detail: "type", doc: "Unsigned 16-bit integer (0 to 65,535)." },
    cardinal: {
      detail: "type",
      doc: "Unsigned 32-bit integer (0 to 4,294,967,295).",
    },
    boolean: {
      detail: "type",
      doc: "Boolean type. Can be `True` or `False`. Uses 1 byte of storage.",
    },
    real: {
      detail: "type",
      doc: "Floating-point type. Platform-dependent, typically maps to `Double` (64-bit IEEE 754).",
    },
    single: {
      detail: "type",
      doc: "Single-precision 32-bit floating-point type (IEEE 754). ~7 significant digits.",
    },
    double: {
      detail: "type",
      doc: "Double-precision 64-bit floating-point type (IEEE 754). ~15-16 significant digits.",
    },
    extended: {
      detail: "type",
      doc: "Extended-precision 80-bit floating-point type. ~19-20 significant digits. x86 only.",
    },
    char: {
      detail: "type",
      doc: "Single character type. In modern Delphi, this is `WideChar` (2 bytes, Unicode). In Free Pascal, typically `AnsiChar` (1 byte).",
    },
    string: {
      detail: "type",
      doc: "String type. In modern Pascal compilers, this is typically a reference-counted, dynamically allocated string. Compatible with Unicode in Delphi.",
    },
    pchar: {
      detail: "type",
      doc: "Pointer to a null-terminated character array. Used for C-compatible string interop.",
    },
    pointer: {
      detail: "type",
      doc: "Untyped pointer. Can point to any data. Use typed pointers (^Type) when possible for type safety.",
    },
    variant: {
      detail: "type",
      doc: "Can hold values of various types at runtime. Useful for COM interop and dynamic typing, but slower than static types.",
    },
    tobject: {
      detail: "type (class)",
      doc: "`TObject` is the root class of all Object Pascal classes. Provides fundamental methods like `Create`, `Free`, `ClassName`, `ClassType`, and `InheritsFrom`.",
    },
    texception: {
      detail: "type (class)",
      doc: "`TException` is the base class for all exception types. Has a `Message` property describing the error.",
    },
    tstringlist: {
      detail: "type (class)",
      doc: "`TStringList` manages a list of strings with sorting, searching, name-value pair support, and file I/O.\n\n```pascal\nvar sl: TStringList;\nsl := TStringList.Create;\nsl.Add('Hello');\nsl.Free;\n```",
    },

    // Built-in Functions
    write: {
      detail: "procedure Write(args...)",
      doc: "Writes one or more values to standard output (or a file) without appending a newline.",
    },
    writeln: {
      detail: "procedure WriteLn(args...)",
      doc: "Writes one or more values to standard output followed by a newline.\n\n```pascal\nWriteLn('x = ', x);\n```",
    },
    read: {
      detail: "procedure Read(var args...)",
      doc: "Reads values from standard input (or a file) into one or more variables.",
    },
    readln: {
      detail: "procedure ReadLn(var args...)",
      doc: "Reads a line of input from standard input into variables and consumes the newline.",
    },
    inc: {
      detail: "procedure Inc(var X [; N: Integer])",
      doc: "Increments variable X by 1 or by N. More efficient than `X := X + 1`.\n\n```pascal\nInc(counter);    // counter += 1\nInc(counter, 5); // counter += 5\n```",
    },
    dec: {
      detail: "procedure Dec(var X [; N: Integer])",
      doc: "Decrements variable X by 1 or by N.\n\n```pascal\nDec(counter);    // counter -= 1\nDec(counter, 3); // counter -= 3\n```",
    },
    length: {
      detail: "function Length(S): Integer",
      doc: "Returns the number of characters in a string or the number of elements in a dynamic array.\n\n```pascal\nn := Length('Hello'); // 5\n```",
    },
    setlength: {
      detail: "procedure SetLength(var S; NewLength: Integer)",
      doc: "Sets the length of a dynamic array or string.\n\n```pascal\nSetLength(arr, 10); // resize to 10 elements\n```",
    },
    copy: {
      detail: "function Copy(S: string; Index, Count: Integer): string",
      doc: "Returns a substring of S starting at Index with Count characters.\n\n```pascal\ns := Copy('Hello World', 1, 5); // 'Hello'\n```",
    },
    pos: {
      detail: "function Pos(Substr, S: string): Integer",
      doc: "Returns the position of the first occurrence of Substr in S, or 0 if not found.\n\n```pascal\ni := Pos('World', 'Hello World'); // 7\n```",
    },
    ord: {
      detail: "function Ord(X): Integer",
      doc: "Returns the ordinal value of a character, boolean, or enumeration value.\n\n```pascal\nn := Ord('A'); // 65\n```",
    },
    chr: {
      detail: "function Chr(X: Byte): Char",
      doc: "Returns the character corresponding to ASCII/Unicode value X.\n\n```pascal\nc := Chr(65); // 'A'\n```",
    },
    abs: {
      detail: "function Abs(X): (same type)",
      doc: "Returns the absolute value of X.\n\n```pascal\nn := Abs(-42); // 42\n```",
    },
    sqrt: {
      detail: "function Sqrt(X: Real): Real",
      doc: "Returns the square root of X. X must be non-negative.",
    },
    sqr: {
      detail: "function Sqr(X): (same type)",
      doc: "Returns X squared (X * X).\n\n```pascal\nn := Sqr(5); // 25\n```",
    },
    round: {
      detail: "function Round(X: Real): Int64",
      doc: "Rounds a floating-point number to the nearest integer using Banker's rounding.",
    },
    trunc: {
      detail: "function Trunc(X: Real): Int64",
      doc: "Truncates a floating-point number toward zero (removes the decimal part).",
    },
    sizeof: {
      detail: "function SizeOf(X): Integer",
      doc: "Returns the size in bytes of a type or variable.\n\n```pascal\nn := SizeOf(Integer); // 4\n```",
    },
    high: {
      detail: "function High(X): (ordinal)",
      doc: "Returns the highest value in the range of a type, or the highest valid index of an array.\n\n```pascal\nh := High(Byte);    // 255\nh := High(myArray); // last index\n```",
    },
    low: {
      detail: "function Low(X): (ordinal)",
      doc: "Returns the lowest value in the range of a type, or the lowest valid index of an array.",
    },
    assigned: {
      detail: "function Assigned(P): Boolean",
      doc: "Returns True if pointer P is not nil. Safer than comparing directly to nil for procedural variables.",
    },
    random: {
      detail: "function Random [(Range: Integer)]: Integer/Extended",
      doc: "Returns a random number. Without argument, returns a real in [0,1). With Range, returns an integer in [0, Range).",
    },
    randomize: {
      detail: "procedure Randomize",
      doc: "Initializes the random number generator with a random seed (typically based on the system clock).",
    },
    inttostr: {
      detail: "function IntToStr(Value: Integer): string",
      doc: "Converts an integer value to its string representation.\n\n```pascal\ns := IntToStr(42); // '42'\n```",
    },
    strtoint: {
      detail: "function StrToInt(S: string): Integer",
      doc: "Converts a string to an integer. Raises `EConvertError` if the string is not a valid integer.",
    },
    format: {
      detail: "function Format(Fmt: string; Args: array of const): string",
      doc: "Returns a formatted string (like printf in C).\n\n```pascal\ns := Format('%s is %d', ['Age', 25]);\n```",
    },
    halt: {
      detail: "procedure Halt [(ExitCode: Integer)]",
      doc: "Immediately terminates the program with an optional exit code.",
    },
    sleep: {
      detail: "procedure Sleep(Milliseconds: Cardinal)",
      doc: "Suspends execution of the current thread for the specified number of milliseconds.",
    },
    new: {
      detail: "procedure New(var P: Pointer)",
      doc: "Allocates memory for a dynamically allocated typed pointer variable.\n\n```pascal\nvar p: ^Integer;\nNew(p);\np^ := 42;\nDispose(p);\n```",
    },
    dispose: {
      detail: "procedure Dispose(var P: Pointer)",
      doc: "Frees memory allocated by `New` for a typed pointer variable.",
    },
    fillchar: {
      detail: "procedure FillChar(var X; Count: Integer; Value: Byte)",
      doc: "Fills Count bytes of memory starting at X with the specified Value.\n\n```pascal\nFillChar(buffer, SizeOf(buffer), 0);\n```",
    },
    concat: {
      detail: "function Concat(S1, S2, ...): string",
      doc: "Concatenates two or more strings. Equivalent to using the `+` operator.\n\n```pascal\ns := Concat('Hello', ' ', 'World');\n```",
    },
    delete: {
      detail: "procedure Delete(var S: string; Index, Count: Integer)",
      doc: "Removes Count characters from string S starting at position Index.\n\n```pascal\nDelete(s, 3, 2); // remove 2 chars starting at pos 3\n```",
    },
    insert: {
      detail: "procedure Insert(Source: string; var S: string; Index: Integer)",
      doc: "Inserts Source into string S at position Index.\n\n```pascal\nInsert('beautiful ', s, 7);\n```",
    },
    upcase: {
      detail: "function UpCase(Ch: Char): Char",
      doc: "Converts a character to uppercase. Only works for ASCII letters a-z.",
    },
    trim: {
      detail: "function Trim(S: string): string",
      doc: "Removes leading and trailing whitespace from a string.",
    },
    eof: {
      detail: "function Eof [(F: file)]: Boolean",
      doc: "Returns True if the file position is at the end of the file, or at the end of standard input.",
    },
    succ: {
      detail: "function Succ(X): (same type)",
      doc: "Returns the successor of an ordinal value.\n\n```pascal\nSucc(5)    // 6\nSucc('A')  // 'B'\n```",
    },
    pred: {
      detail: "function Pred(X): (same type)",
      doc: "Returns the predecessor of an ordinal value.\n\n```pascal\nPred(5)    // 4\nPred('B')  // 'A'\n```",
    },
    sin: {
      detail: "function Sin(X: Real): Real",
      doc: "Returns the sine of angle X (in radians).",
    },
    cos: {
      detail: "function Cos(X: Real): Real",
      doc: "Returns the cosine of angle X (in radians).",
    },
    ln: {
      detail: "function Ln(X: Real): Real",
      doc: "Returns the natural logarithm of X. X must be positive.",
    },
    exp: {
      detail: "function Exp(X: Real): Real",
      doc: "Returns e raised to the power of X.",
    },
    move: {
      detail: "procedure Move(const Source; var Dest; Count: Integer)",
      doc: "Copies Count bytes from Source to Dest. Handles overlapping memory correctly.",
    },
    getmem: {
      detail: "procedure GetMem(var P: Pointer; Size: Integer)",
      doc: "Allocates Size bytes of memory and stores the pointer in P. Use FreeMem to release.",
    },
    freemem: {
      detail: "procedure FreeMem(var P: Pointer [; Size: Integer])",
      doc: "Frees memory allocated by GetMem.",
    },
    include: {
      detail: "procedure Include(var S: set; Element)",
      doc: "Adds an element to a set variable.\n\n```pascal\nInclude(mySet, someValue);\n```",
    },
    exclude: {
      detail: "procedure Exclude(var S: set; Element)",
      doc: "Removes an element from a set variable.\n\n```pascal\nExclude(mySet, someValue);\n```",
    },
  };

  // ──────────────────────────────────────────
  // 5. SNIPPET DEFINITIONS
  // ──────────────────────────────────────────
  const pascalSnippets = [
    {
      label: "program",
      detail: "Program skeleton",
      insertText:
        "program ${1:MyProgram};\n\nuses\n  ${2:SysUtils};\n\nvar\n  ${3:i: Integer};\n\nbegin\n  ${0:// your code here}\nend.",
      doc: "Creates a complete Pascal program skeleton with uses clause and main block.",
    },
    {
      label: "unit",
      detail: "Unit skeleton",
      insertText:
        "unit ${1:MyUnit};\n\ninterface\n\nuses\n  ${2:SysUtils};\n\n${3:// public declarations}\n\nimplementation\n\n${0:// implementation}\n\nend.",
      doc: "Creates a complete unit skeleton with interface and implementation sections.",
    },
    {
      label: "proc",
      detail: "Procedure declaration",
      insertText:
        "procedure ${1:Name}(${2:params});\n${3:var\n  ${4:// local vars}}\nbegin\n  ${0}\nend;",
      doc: "Creates a procedure with parameters and local variables.",
    },
    {
      label: "func",
      detail: "Function declaration",
      insertText:
        "function ${1:Name}(${2:params}): ${3:Integer};\n${4:var\n  ${5:// local vars}}\nbegin\n  Result := ${0};\nend;",
      doc: "Creates a function with parameters, return type, and local variables.",
    },
    {
      label: "ifthen",
      detail: "If-Then-Else statement",
      insertText:
        "if ${1:condition} then\nbegin\n  ${2}\nend\nelse\nbegin\n  ${0}\nend;",
      doc: "Creates an if-then-else block statement.",
    },
    {
      label: "ifshort",
      detail: "If-Then (single line)",
      insertText: "if ${1:condition} then\n  ${0};",
      doc: "Creates a simple if-then statement.",
    },
    {
      label: "fordo",
      detail: "For-Do loop",
      insertText:
        "for ${1:i} := ${2:0} to ${3:count} - 1 do\nbegin\n  ${0}\nend;",
      doc: "Creates a for loop with begin-end block.",
    },
    {
      label: "fordown",
      detail: "For-DownTo loop",
      insertText:
        "for ${1:i} := ${2:count} - 1 downto ${3:0} do\nbegin\n  ${0}\nend;",
      doc: "Creates a downward-counting for loop.",
    },
    {
      label: "whiledo",
      detail: "While-Do loop",
      insertText: "while ${1:condition} do\nbegin\n  ${0}\nend;",
      doc: "Creates a while loop with begin-end block.",
    },
    {
      label: "repeatuntil",
      detail: "Repeat-Until loop",
      insertText: "repeat\n  ${0}\nuntil ${1:condition};",
      doc: "Creates a repeat-until loop (executes at least once).",
    },
    {
      label: "case",
      detail: "Case statement",
      insertText:
        "case ${1:expression} of\n  ${2:value1}: ${3:// action1};\n  ${4:value2}: ${5:// action2};\nelse\n  ${0:// default action}\nend;",
      doc: "Creates a case (switch) statement with else clause.",
    },
    {
      label: "tryexcept",
      detail: "Try-Except block",
      insertText:
        "try\n  ${1}\nexcept\n  on E: ${2:Exception} do\n  begin\n    ${0:WriteLn(E.Message);}\n  end;\nend;",
      doc: "Creates a try-except block for exception handling.",
    },
    {
      label: "tryfinally",
      detail: "Try-Finally block",
      insertText: "try\n  ${1}\nfinally\n  ${0}\nend;",
      doc: "Creates a try-finally block for guaranteed cleanup.",
    },
    {
      label: "classdef",
      detail: "Class definition",
      insertText:
        "type\n  ${1:TMyClass} = class(${2:TObject})\n  private\n    ${3:FField: Integer;}\n  public\n    constructor Create;${4: override;}\n    destructor Destroy; override;\n    ${0}\n  end;",
      doc: "Creates a class type definition with constructor/destructor.",
    },
    {
      label: "recorddef",
      detail: "Record definition",
      insertText:
        "type\n  ${1:TMyRecord} = record\n    ${2:Field1}: ${3:Integer};\n    ${0}\n  end;",
      doc: "Creates a record type definition.",
    },
    {
      label: "enumdef",
      detail: "Enumeration definition",
      insertText:
        "type\n  ${1:TMyEnum} = (${2:meFirst}, ${3:meSecond}, ${0:meThird});",
      doc: "Creates an enumeration type definition.",
    },
    {
      label: "writeln",
      detail: "WriteLn statement",
      insertText: "WriteLn(${1:'${0}'});",
      doc: "Writes a line to standard output.",
    },
    {
      label: "readln",
      detail: "ReadLn statement",
      insertText: "ReadLn(${0:variable});",
      doc: "Reads a line from standard input.",
    },
    {
      label: "createfree",
      detail: "Create-Try-Finally-Free pattern",
      insertText:
        "${1:obj} := ${2:TStringList}.Create;\ntry\n  ${0}\nfinally\n  ${1:obj}.Free;\nend;",
      doc: "Standard pattern for creating and safely freeing an object.",
    },
    {
      label: "property",
      detail: "Property declaration",
      insertText:
        "property ${1:Name}: ${2:Integer} read ${3:FName} write ${4:SetName};",
      doc: "Creates a property with getter and setter.",
    },
    {
      label: "beginend",
      detail: "Begin-End block",
      insertText: "begin\n  ${0}\nend;",
      doc: "Inserts a begin-end block.",
    },
  ];

  // ──────────────────────────────────────────
  // 6. SYMBOL TRACKER (for Go to Definition)
  // ──────────────────────────────────────────
  function parseSymbols(model) {
    const symbols = [];
    const text = model.getValue();
    const lines = text.split("\n");

    const patterns = [
      { regex: /\b(program)\s+(\w+)/i, kind: "program" },
      { regex: /\b(unit)\s+(\w+)/i, kind: "unit" },
      { regex: /\b(procedure)\s+(\w[\w.]*)\s*[\(;]/i, kind: "procedure" },
      { regex: /\b(function)\s+(\w[\w.]*)\s*[\(:]/i, kind: "function" },
      { regex: /\b(constructor)\s+(\w[\w.]*)\s*[\(;]/i, kind: "constructor" },
      { regex: /\b(destructor)\s+(\w[\w.]*)\s*[\(;]/i, kind: "destructor" },
      { regex: /^\s*(\w+)\s*=\s*class\b/i, kind: "class" },
      { regex: /^\s*(\w+)\s*=\s*record\b/i, kind: "record" },
      { regex: /^\s*(\w+)\s*=\s*\(/i, kind: "enum" },
      { regex: /^\s*(\w+)\s*=\s*interface\b/i, kind: "interface" },
      { regex: /^\s*(\w+)\s*:\s*\w/i, kind: "variable" },
    ];

    const declBlockRegex = /^\s*(type|var|const)\s*$/i;
    let inBlock = "";

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNum = i + 1;

      if (declBlockRegex.test(line)) {
        inBlock = line.trim().toLowerCase();
        continue;
      }

      if (
        /^\s*(begin|procedure|function|constructor|destructor)\b/i.test(line)
      ) {
        inBlock = "";
      }

      // Procedure/Function
      for (const pat of patterns.slice(0, 6)) {
        const m = line.match(pat.regex);
        if (m) {
          const name = m[2] || m[1];
          const col = line.indexOf(name) + 1;
          symbols.push({
            name: name,
            kind: pat.kind,
            line: lineNum,
            column: col,
            endColumn: col + name.length,
            detail: line.trim(),
          });
        }
      }

      // In type block
      if (inBlock === "type") {
        for (const pat of patterns.slice(6, 10)) {
          const m = line.match(pat.regex);
          if (m) {
            const name = m[1];
            const col = line.indexOf(name) + 1;
            symbols.push({
              name: name,
              kind: pat.kind,
              line: lineNum,
              column: col,
              endColumn: col + name.length,
              detail: line.trim(),
            });
          }
        }
      }

      // In var block
      if (inBlock === "var") {
        const vm = line.match(/^\s*(\w+)\s*:\s*(.+?)\s*[;=]/);
        if (vm) {
          const name = vm[1];
          if (
            ![
              "begin",
              "end",
              "var",
              "const",
              "type",
              "procedure",
              "function",
            ].includes(name.toLowerCase())
          ) {
            const col = line.indexOf(name) + 1;
            symbols.push({
              name: name,
              kind: "variable",
              line: lineNum,
              column: col,
              endColumn: col + name.length,
              detail: line.trim().replace(/;$/, ""),
            });
          }
        }
        // Multiple vars: a, b, c: Integer;
        const mvm = line.match(/^\s*((?:\w+\s*,\s*)*\w+)\s*:\s*(.+?)\s*;/);
        if (mvm) {
          const names = mvm[1].split(",").map((n) => n.trim());
          names.forEach((name) => {
            if (
              !["begin", "end", "var", "const", "type"].includes(
                name.toLowerCase(),
              )
            ) {
              const col = line.indexOf(name) + 1;
              const existing = symbols.find(
                (s) => s.name === name && s.line === lineNum,
              );
              if (!existing) {
                symbols.push({
                  name: name,
                  kind: "variable",
                  line: lineNum,
                  column: col,
                  endColumn: col + name.length,
                  detail: name + ": " + mvm[2].trim(),
                });
              }
            }
          });
        }
      }

      // In const block
      if (inBlock === "const") {
        const cm = line.match(/^\s*(\w+)\s*[:=]/);
        if (cm) {
          const name = cm[1];
          if (
            ![
              "begin",
              "end",
              "var",
              "const",
              "type",
              "procedure",
              "function",
            ].includes(name.toLowerCase())
          ) {
            const col = line.indexOf(name) + 1;
            symbols.push({
              name: name,
              kind: "constant",
              line: lineNum,
              column: col,
              endColumn: col + name.length,
              detail: line.trim().replace(/;$/, ""),
            });
          }
        }
      }
    }
    return symbols;
  }

  // ──────────────────────────────────────────
  // 7. COMPLETION PROVIDER
  // ──────────────────────────────────────────
  monaco.languages.registerCompletionItemProvider("pascal", {
    triggerCharacters: [".", "("],
    provideCompletionItems: function (model, position) {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };

      const suggestions = [];

      // Snippets
      pascalSnippets.forEach((s) => {
        suggestions.push({
          label: s.label,
          kind: monaco.languages.CompletionItemKind.Snippet,
          detail: "✦ Snippet: " + s.detail,
          documentation: { value: s.doc },
          insertText: s.insertText,
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range: range,
          sortText: "0_" + s.label,
        });
      });

      // Keywords
      const keywords = [
        "program",
        "unit",
        "library",
        "uses",
        "interface",
        "implementation",
        "initialization",
        "finalization",
        "begin",
        "end",
        "var",
        "const",
        "type",
        "array",
        "of",
        "record",
        "class",
        "object",
        "set",
        "file",
        "packed",
        "procedure",
        "function",
        "constructor",
        "destructor",
        "property",
        "read",
        "write",
        "default",
        "stored",
        "if",
        "then",
        "else",
        "case",
        "for",
        "to",
        "downto",
        "do",
        "while",
        "repeat",
        "until",
        "with",
        "try",
        "except",
        "finally",
        "raise",
        "on",
        "goto",
        "label",
        "break",
        "continue",
        "exit",
        "and",
        "or",
        "not",
        "xor",
        "shl",
        "shr",
        "div",
        "mod",
        "in",
        "is",
        "as",
        "nil",
        "true",
        "false",
        "self",
        "result",
        "inherited",
        "override",
        "virtual",
        "abstract",
        "dynamic",
        "overload",
        "reintroduce",
        "message",
        "private",
        "protected",
        "public",
        "published",
        "forward",
        "external",
        "inline",
        "static",
      ];
      keywords.forEach((kw) => {
        const info = pascalDocs[kw.toLowerCase()];
        suggestions.push({
          label: kw,
          kind: monaco.languages.CompletionItemKind.Keyword,
          detail: info ? info.detail : "keyword",
          documentation: info ? { value: info.doc } : undefined,
          insertText: kw,
          range: range,
          sortText: "2_" + kw,
        });
      });

      // Types
      const types = [
        "Integer",
        "LongInt",
        "ShortInt",
        "SmallInt",
        "Int64",
        "Byte",
        "Word",
        "Cardinal",
        "LongWord",
        "QWord",
        "NativeInt",
        "NativeUInt",
        "Real",
        "Single",
        "Double",
        "Extended",
        "Comp",
        "Currency",
        "Boolean",
        "ByteBool",
        "WordBool",
        "LongBool",
        "Char",
        "WideChar",
        "AnsiChar",
        "String",
        "ShortString",
        "AnsiString",
        "WideString",
        "UnicodeString",
        "PChar",
        "PAnsiChar",
        "PWideChar",
        "Pointer",
        "Variant",
        "OleVariant",
        "TObject",
        "TClass",
        "TComponent",
        "TPersistent",
        "TStream",
        "TList",
        "TStringList",
        "TStrings",
        "TException",
      ];
      types.forEach((t) => {
        const info = pascalDocs[t.toLowerCase()];
        suggestions.push({
          label: t,
          kind: monaco.languages.CompletionItemKind.Class,
          detail: info ? info.detail : "type",
          documentation: info ? { value: info.doc } : undefined,
          insertText: t,
          range: range,
          sortText: "3_" + t,
        });
      });

      // Built-in functions
      const builtins = [
        "Write",
        "WriteLn",
        "Read",
        "ReadLn",
        "Inc",
        "Dec",
        "Succ",
        "Pred",
        "Ord",
        "Chr",
        "Abs",
        "Sqr",
        "Sqrt",
        "Sin",
        "Cos",
        "ArcTan",
        "Ln",
        "Exp",
        "Trunc",
        "Round",
        "Frac",
        "Int",
        "Length",
        "SetLength",
        "Copy",
        "Delete",
        "Insert",
        "Pos",
        "Concat",
        "UpCase",
        "LowerCase",
        "Trim",
        "TrimLeft",
        "TrimRight",
        "IntToStr",
        "StrToInt",
        "StrToIntDef",
        "FloatToStr",
        "StrToFloat",
        "Format",
        "FormatFloat",
        "SizeOf",
        "High",
        "Low",
        "Assigned",
        "Addr",
        "New",
        "Dispose",
        "GetMem",
        "FreeMem",
        "ReallocMem",
        "FillChar",
        "Move",
        "Include",
        "Exclude",
        "Assign",
        "Reset",
        "Rewrite",
        "Append",
        "Close",
        "Eof",
        "Eoln",
        "Random",
        "Randomize",
        "Halt",
        "Sleep",
      ];
      builtins.forEach((fn) => {
        const info = pascalDocs[fn.toLowerCase()];
        suggestions.push({
          label: fn,
          kind: monaco.languages.CompletionItemKind.Function,
          detail: info ? info.detail : "built-in function",
          documentation: info ? { value: info.doc } : undefined,
          insertText: fn,
          range: range,
          sortText: "1_" + fn,
        });
      });

      // User-defined symbols
      const symbols = parseSymbols(model);
      const seen = new Set();
      symbols.forEach((sym) => {
        if (seen.has(sym.name.toLowerCase())) return;
        seen.add(sym.name.toLowerCase());
        let kind;
        switch (sym.kind) {
          case "procedure":
            kind = monaco.languages.CompletionItemKind.Method;
            break;
          case "function":
            kind = monaco.languages.CompletionItemKind.Function;
            break;
          case "class":
            kind = monaco.languages.CompletionItemKind.Class;
            break;
          case "record":
            kind = monaco.languages.CompletionItemKind.Struct;
            break;
          case "enum":
            kind = monaco.languages.CompletionItemKind.Enum;
            break;
          case "constant":
            kind = monaco.languages.CompletionItemKind.Constant;
            break;
          case "variable":
            kind = monaco.languages.CompletionItemKind.Variable;
            break;
          default:
            kind = monaco.languages.CompletionItemKind.Text;
        }
        suggestions.push({
          label: sym.name,
          kind: kind,
          detail: sym.kind + " (user-defined)",
          documentation: {
            value:
              "```pascal\n" + sym.detail + "\n```\nDefined at line " + sym.line,
          },
          insertText: sym.name,
          range: range,
          sortText: "1_" + sym.name,
        });
      });

      return { suggestions };
    },
  });

  // ──────────────────────────────────────────
  // 8. HOVER PROVIDER
  // ──────────────────────────────────────────
  monaco.languages.registerHoverProvider("pascal", {
    provideHover: function (model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return null;

      const key = word.word.toLowerCase();
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };

      // Check built-in docs
      if (pascalDocs[key]) {
        const info = pascalDocs[key];
        return {
          range: range,
          contents: [{ value: "**" + info.detail + "**" }, { value: info.doc }],
        };
      }

      // Check user-defined symbols
      const symbols = parseSymbols(model);
      const sym = symbols.find((s) => s.name.toLowerCase() === key);
      if (sym) {
        return {
          range: range,
          contents: [
            { value: "**" + sym.kind + "** `" + sym.name + "`" },
            { value: "```pascal\n" + sym.detail + "\n```" },
            { value: "_Defined at line " + sym.line + "_" },
          ],
        };
      }

      return null;
    },
  });

  // ──────────────────────────────────────────
  // 9. DEFINITION PROVIDER
  // ──────────────────────────────────────────
  monaco.languages.registerDefinitionProvider("pascal", {
    provideDefinition: function (model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return null;

      const key = word.word.toLowerCase();
      const symbols = parseSymbols(model);
      const matches = symbols.filter((s) => s.name.toLowerCase() === key);

      if (matches.length === 0) return null;

      return matches.map((sym) => ({
        uri: model.uri,
        range: {
          startLineNumber: sym.line,
          endLineNumber: sym.line,
          startColumn: sym.column,
          endColumn: sym.endColumn,
        },
      }));
    },
  });

  // ──────────────────────────────────────────
  // 10. SIGNATURE HELP PROVIDER
  // ──────────────────────────────────────────
  const signatureDb = {
    writeln: {
      label: "WriteLn(args: ...)",
      documentation: "Writes values followed by a newline to standard output.",
      parameters: [
        {
          label: "args",
          documentation: "One or more values of any type to write.",
        },
      ],
    },
    write: {
      label: "Write(args: ...)",
      documentation:
        "Writes values to standard output without a trailing newline.",
      parameters: [
        {
          label: "args",
          documentation: "One or more values of any type to write.",
        },
      ],
    },
    readln: {
      label: "ReadLn(var V: ...)",
      documentation: "Reads a line from standard input.",
      parameters: [
        {
          label: "var V",
          documentation: "Variable(s) to receive the input values.",
        },
      ],
    },
    inc: {
      label: "Inc(var X: Ordinal; N: Integer = 1)",
      documentation: "Increments X by N (default 1).",
      parameters: [
        { label: "var X", documentation: "The variable to increment." },
        {
          label: "N",
          documentation: "Amount to increment by (optional, default 1).",
        },
      ],
    },
    dec: {
      label: "Dec(var X: Ordinal; N: Integer = 1)",
      documentation: "Decrements X by N (default 1).",
      parameters: [
        { label: "var X", documentation: "The variable to decrement." },
        {
          label: "N",
          documentation: "Amount to decrement by (optional, default 1).",
        },
      ],
    },
    copy: {
      label: "Copy(S: string; Index: Integer; Count: Integer): string",
      documentation: "Returns a substring of S.",
      parameters: [
        { label: "S: string", documentation: "The source string." },
        {
          label: "Index: Integer",
          documentation: "Starting position (1-based).",
        },
        {
          label: "Count: Integer",
          documentation: "Number of characters to copy.",
        },
      ],
    },
    pos: {
      label: "Pos(Substr: string; S: string): Integer",
      documentation: "Finds the first occurrence of Substr in S.",
      parameters: [
        { label: "Substr: string", documentation: "The substring to find." },
        { label: "S: string", documentation: "The string to search in." },
      ],
    },
    length: {
      label: "Length(S): Integer",
      documentation: "Returns the length of a string or dynamic array.",
      parameters: [{ label: "S", documentation: "A string or dynamic array." }],
    },
    setlength: {
      label: "SetLength(var S; NewLength: Integer)",
      documentation: "Sets the dynamic length of a string or dynamic array.",
      parameters: [
        { label: "var S", documentation: "String or dynamic array variable." },
        { label: "NewLength", documentation: "The new length." },
      ],
    },
    format: {
      label: "Format(Fmt: string; Args: array of const): string",
      documentation: "Returns a formatted string.",
      parameters: [
        {
          label: "Fmt: string",
          documentation: "Format string with % specifiers.",
        },
        { label: "Args: array of const", documentation: "Values to format." },
      ],
    },
    inttostr: {
      label: "IntToStr(Value: Integer): string",
      documentation: "Converts an integer to a string.",
      parameters: [
        { label: "Value: Integer", documentation: "Integer value to convert." },
      ],
    },
    strtoint: {
      label: "StrToInt(S: string): Integer",
      documentation:
        "Converts a string to an integer. Raises EConvertError on failure.",
      parameters: [
        {
          label: "S: string",
          documentation: "String representation of an integer.",
        },
      ],
    },
    fillchar: {
      label: "FillChar(var X; Count: Integer; Value: Byte)",
      documentation: "Fills memory with a byte value.",
      parameters: [
        { label: "var X", documentation: "Starting address." },
        { label: "Count: Integer", documentation: "Number of bytes to fill." },
        { label: "Value: Byte", documentation: "Byte value to fill with." },
      ],
    },
    sizeof: {
      label: "SizeOf(X): Integer",
      documentation: "Returns the size in bytes of a variable or type.",
      parameters: [
        { label: "X", documentation: "A variable or type identifier." },
      ],
    },
    high: {
      label: "High(X): Ordinal",
      documentation: "Returns the highest value of a type or array index.",
      parameters: [{ label: "X", documentation: "A type, ordinal, or array." }],
    },
    low: {
      label: "Low(X): Ordinal",
      documentation: "Returns the lowest value of a type or array index.",
      parameters: [{ label: "X", documentation: "A type, ordinal, or array." }],
    },
    random: {
      label: "Random(Range: Integer): Integer",
      documentation: "Returns a random number in [0, Range).",
      parameters: [
        {
          label: "Range: Integer",
          documentation: "Upper bound (exclusive). Omit for a float in [0,1).",
        },
      ],
    },
    delete: {
      label: "Delete(var S: string; Index: Integer; Count: Integer)",
      documentation: "Deletes characters from a string.",
      parameters: [
        { label: "var S: string", documentation: "The string to modify." },
        { label: "Index: Integer", documentation: "Start position (1-based)." },
        {
          label: "Count: Integer",
          documentation: "Number of characters to delete.",
        },
      ],
    },
    insert: {
      label: "Insert(Source: string; var S: string; Index: Integer)",
      documentation: "Inserts a substring into a string.",
      parameters: [
        { label: "Source: string", documentation: "String to insert." },
        { label: "var S: string", documentation: "Target string." },
        {
          label: "Index: Integer",
          documentation: "Position to insert at (1-based).",
        },
      ],
    },
  };

  monaco.languages.registerSignatureHelpProvider("pascal", {
    signatureHelpTriggerCharacters: ["(", ","],
    provideSignatureHelp: function (model, position) {
      // Walk backwards to find the function name before the opening paren
      const textUntil = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });

      let depth = 0;
      let commaCount = 0;
      let parenPos = -1;

      for (let i = textUntil.length - 1; i >= 0; i--) {
        const ch = textUntil[i];
        if (ch === ")") depth++;
        else if (ch === "(") {
          if (depth > 0) depth--;
          else {
            parenPos = i;
            break;
          }
        } else if (ch === "," && depth === 0) {
          commaCount++;
        }
      }

      if (parenPos < 0) return null;

      const before = textUntil.substring(0, parenPos).trimEnd();
      const match = before.match(/(\w+)\s*$/);
      if (!match) return null;

      const funcName = match[1].toLowerCase();
      const sigInfo = signatureDb[funcName];
      if (!sigInfo) return null;

      return {
        value: {
          signatures: [
            {
              label: sigInfo.label,
              documentation: sigInfo.documentation,
              parameters: sigInfo.parameters,
            },
          ],
          activeSignature: 0,
          activeParameter: Math.min(commaCount, sigInfo.parameters.length - 1),
        },
        dispose: () => {},
      };
    },
  });

  // ──────────────────────────────────────────
  // 11. DOCUMENT SYMBOL PROVIDER (Outline)
  // ──────────────────────────────────────────
  monaco.languages.registerDocumentSymbolProvider("pascal", {
    provideDocumentSymbols: function (model) {
      const symbols = parseSymbols(model);
      return symbols.map((sym) => {
        let kind;
        switch (sym.kind) {
          case "program":
            kind = monaco.languages.SymbolKind.Module;
            break;
          case "unit":
            kind = monaco.languages.SymbolKind.Module;
            break;
          case "procedure":
            kind = monaco.languages.SymbolKind.Method;
            break;
          case "function":
            kind = monaco.languages.SymbolKind.Function;
            break;
          case "constructor":
            kind = monaco.languages.SymbolKind.Constructor;
            break;
          case "destructor":
            kind = monaco.languages.SymbolKind.Method;
            break;
          case "class":
            kind = monaco.languages.SymbolKind.Class;
            break;
          case "record":
            kind = monaco.languages.SymbolKind.Struct;
            break;
          case "enum":
            kind = monaco.languages.SymbolKind.Enum;
            break;
          case "constant":
            kind = monaco.languages.SymbolKind.Constant;
            break;
          case "variable":
            kind = monaco.languages.SymbolKind.Variable;
            break;
          default:
            kind = monaco.languages.SymbolKind.Variable;
        }
        return {
          name: sym.name,
          detail: sym.detail,
          kind: kind,
          range: {
            startLineNumber: sym.line,
            startColumn: sym.column,
            endLineNumber: sym.line,
            endColumn: sym.endColumn,
          },
          selectionRange: {
            startLineNumber: sym.line,
            startColumn: sym.column,
            endLineNumber: sym.line,
            endColumn: sym.endColumn,
          },
        };
      });
    },
  });
};
