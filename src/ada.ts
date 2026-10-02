import type * as Monaco from "monaco-editor";

export default (monaco: typeof Monaco) => {
  // ──────────────────────────────────────────
  // 1. REGISTER LANGUAGE
  // ──────────────────────────────────────────
  monaco.languages.register({
    id: "ada",
    extensions: [".adb", ".ads", ".ada"],
    aliases: ["Ada", "ada"],
    mimetypes: ["text/x-ada"],
  });

  // ──────────────────────────────────────────
  // 2. MONARCH SYNTAX HIGHLIGHTING
  // Ada is case-insensitive: `Begin`, `BEGIN` and `begin` are the same token.
  // ──────────────────────────────────────────
  const ADA_KEYWORDS = [
    "abort",
    "abs",
    "abstract",
    "accept",
    "access",
    "aliased",
    "all",
    "and",
    "array",
    "at",
    "begin",
    "body",
    "case",
    "constant",
    "declare",
    "delay",
    "delta",
    "digits",
    "do",
    "else",
    "elsif",
    "end",
    "entry",
    "exception",
    "exit",
    "for",
    "function",
    "generic",
    "goto",
    "if",
    "in",
    "interface",
    "is",
    "limited",
    "loop",
    "mod",
    "new",
    "not",
    "null",
    "of",
    "or",
    "others",
    "out",
    "overriding",
    "package",
    "parallel",
    "pragma",
    "private",
    "procedure",
    "protected",
    "raise",
    "range",
    "record",
    "rem",
    "renames",
    "requeue",
    "return",
    "reverse",
    "select",
    "separate",
    "some",
    "subtype",
    "synchronized",
    "tagged",
    "task",
    "terminate",
    "then",
    "type",
    "until",
    "use",
    "when",
    "while",
    "with",
    "xor",
  ];

  const ADA_TYPES = [
    "Boolean",
    "Integer",
    "Natural",
    "Positive",
    "Float",
    "Long_Float",
    "Short_Float",
    "Long_Integer",
    "Short_Integer",
    "Short_Short_Integer",
    "Long_Long_Integer",
    "Long_Long_Float",
    "Duration",
    "Character",
    "Wide_Character",
    "Wide_Wide_Character",
    "String",
    "Wide_String",
    "Wide_Wide_String",
    "Address",
    "Storage_Offset",
    "Storage_Count",
    "Bit_Order",
    "System",
  ];

  const ADA_ATTRIBUTE_NAMES = [
    "Access",
    "Address",
    "Adjacent",
    "Aft",
    "Alignment",
    "Base",
    "Bit_Order",
    "Body_Version",
    "Callable",
    "Ceiling",
    "Class",
    "Component_Size",
    "Compose",
    "Constrained",
    "Copy_Sign",
    "Definite",
    "Delta",
    "Denorm",
    "Digits",
    "Enum_Rep",
    "Enum_Val",
    "Exponent",
    "External_Tag",
    "First",
    "First_Bit",
    "Floor",
    "Fore",
    "Fraction",
    "Image",
    "Img",
    "Input",
    "Last",
    "Last_Bit",
    "Leading_Part",
    "Length",
    "Machine",
    "Machine_Emax",
    "Machine_Emin",
    "Machine_Mantissa",
    "Machine_Overflows",
    "Machine_Radix",
    "Machine_Rounds",
    "Max",
    "Max_Size_In_Storage_Elements",
    "Maximum_Alignment",
    "Min",
    "Mod",
    "Model",
    "Modulus",
    "Object_Size",
    "Output",
    "Partition_ID",
    "Pos",
    "Position",
    "Pred",
    "Range",
    "Read",
    "Remainder",
    "Round",
    "Rounding",
    "Safe_First",
    "Safe_Last",
    "Scale",
    "Scaling",
    "Signed_Zeros",
    "Size",
    "Small",
    "Storage_Pool",
    "Storage_Size",
    "Stream_Size",
    "Succ",
    "Tag",
    "Terminated",
    "Truncation",
    "Type_Class",
    "Unbiased_Rounding",
    "Unchecked_Access",
    "Unconstrained_Array",
    "Universal_Literal_String",
    "Val",
    "Valid",
    "Value",
    "Value_Size",
    "Version",
    "Wide_Image",
    "Wide_Value",
    "Wide_Width",
    "Width",
    "Word_Size",
    "Write",
  ];

  monaco.languages.setMonarchTokensProvider("ada", {
    defaultToken: "",
    ignoreCase: true,

    keywords: ADA_KEYWORDS,
    typeKeywords: ADA_TYPES,
    attributes: ADA_ATTRIBUTE_NAMES,

    operators: [
      "=>",
      ":=",
      "..",
      "**",
      "/=",
      "<=",
      ">=",
      "<>",
      "&",
      "+",
      "-",
      "*",
      "/",
      "=",
      "<",
      ">",
    ],

    symbols: /[=><!~?:&|+\-*\/\^%\.]+/,

    tokenizer: {
      root: [
        // Comments run to end of line
        [/--.*$/, "comment"],

        // Strings: doubled quotes escape a quote
        [/"/, "string", "@string"],

        // Character literals ('A') and attributes (X'Image)
        [/'[^']'/, "string"],
        [/'[a-zA-Z_]\w*/, "keyword"],

        // Numeric literals
        [
          /\d[\d_]*#[\da-fA-F_]+(?:\.[\da-fA-F_]+)?#(?:[eE][+-]?\d+)?/,
          "number.hex",
        ],
        [/\d[\d_]*(?:\.[\d_]+)?(?:[eE][+-]?\d+)?/, "number"],

        // Identifiers & keywords
        [
          /[a-zA-Z_]\w*/,
          {
            cases: {
              "@keywords": "keyword",
              "@typeKeywords": "type",
              "@default": "identifier",
            },
          },
        ],

        // Brackets & delimiters
        [/[()\[\]{}]/, "@brackets"],
        [/[;,]/, "delimiter"],
        [/'/, "delimiter"],

        // Operators & symbols
        [
          /@symbols/,
          {
            cases: {
              "@operators": "operator",
              "@default": "delimiter",
            },
          },
        ],

        // Whitespace
        [/[ \t\r\n]+/, "white"],
      ],

      string: [
        [/[^"]+/, "string"],
        [/""/, "string.escape"],
        [/"/, "string", "@pop"],
      ],
    },
  });

  // ──────────────────────────────────────────
  // 3. LANGUAGE CONFIGURATION
  // ──────────────────────────────────────────
  monaco.languages.setLanguageConfiguration("ada", {
    comments: {
      lineComment: "--",
    },
    brackets: [
      ["(", ")"],
      ["[", "]"],
    ],
    autoClosingPairs: [
      { open: "(", close: ")" },
      { open: "[", close: "]" },
      { open: '"', close: '"', notIn: ["string"] },
      { open: "'", close: "'", notIn: ["string", "comment"] },
    ],
    surroundingPairs: [
      { open: "(", close: ")" },
      { open: "[", close: "]" },
      { open: '"', close: '"' },
      { open: "'", close: "'" },
    ],
    wordPattern:
      /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
    indentationRules: {
      increaseIndentPattern:
        /\b(begin|declare|is|then|else|elsif|loop|record|case|select|accept|do)\s*$/i,
      decreaseIndentPattern: /^\s*(end|elsif|else|when|exception)\b/i,
    },
    onEnterRules: [
      {
        beforeText:
          /\b(begin|declare|is|then|else|elsif|loop|record|case|select|do)\s*$/i,
        action: { indentAction: monaco.languages.IndentAction.Indent },
      },
    ],
  });

  // ──────────────────────────────────────────
  // 4. DOCUMENTATION DATABASE
  // ──────────────────────────────────────────
  const ADA_KEYWORD_DOCS: Record<string, { detail: string; doc: string }> = {
    begin: {
      detail: "keyword",
      doc: "Starts the sequence of statements of a block. Paired with `end`.\n\n```ada\nbegin\n   Put_Line (\"Hello\");\nend;\n```",
    },
    end: {
      detail: "keyword",
      doc: "Closes a construct: `end` for a block, `end if`, `end loop`, `end case`, `end record`, `end package`, `end P;` for a subprogram.",
    },
    procedure: {
      detail: "keyword",
      doc: "Declares a subprogram that does not return a value.\n\n```ada\nprocedure Greet (Name : String) is\nbegin\n   Put_Line (\"Hello, \" & Name);\nend Greet;\n```",
    },
    function: {
      detail: "keyword",
      doc: "Declares a subprogram that returns a value.\n\n```ada\nfunction Add (A, B : Integer) return Integer is\nbegin\n   return A + B;\nend Add;\n```",
    },
    package: {
      detail: "keyword",
      doc: "Declares a package (module) or package body. Packages group declarations and their implementations.",
    },
    is: {
      detail: "keyword",
      doc: "Introduces the definition of a declaration: `X : Integer := 0;` uses `:=`, while `procedure P is` and `type T is ...` use `is`.",
    },
    declare: {
      detail: "keyword",
      doc: "Opens a block with its own declarative part.\n\n```ada\ndeclare\n   N : constant Integer := 3;\nbegin\n   Put_Line (Integer'Image (N));\nend;\n```",
    },
    type: {
      detail: "keyword",
      doc: "Introduces a type declaration.\n\n```ada\ntype Color is (Red, Green, Blue);\n```",
    },
    subtype: {
      detail: "keyword",
      doc: "Declares a subtype that constrains or renames an existing type.\n\n```ada\nsubtype Digit is Integer range 0 .. 9;\n```",
    },
    task: {
      detail: "keyword",
      doc: "Declares a task (a concurrent unit of execution) or task type.",
    },
    protected: {
      detail: "keyword",
      doc: "Declares a protected unit providing mutually exclusive access to data.",
    },
    entry: {
      detail: "keyword",
      doc: "Declares a task or protected entry that can be called and can block on a `when` barrier.",
    },
    accept: {
      detail: "keyword",
      doc: "Accepts an entry call inside a task body.\n\n```ada\naccept Start;\n```",
    },
    select: {
      detail: "keyword",
      doc: "Selects among several entry calls, delays, or a `terminate` alternative.",
    },
    if: {
      detail: "keyword",
      doc: "Conditional statement.\n\n```ada\nif X > 0 then\n   Put_Line (\"positive\");\nelsif X < 0 then\n   Put_Line (\"negative\");\nelse\n   Put_Line (\"zero\");\nend if;\n```",
    },
    elsif: {
      detail: "keyword",
      doc: "An additional condition in an `if` statement (note the spelling: `elsif`, not `elseif`).",
    },
    else: {
      detail: "keyword",
      doc: "The alternative branch of an `if` or `case` statement.",
    },
    then: {
      detail: "keyword",
      doc: "Separates the condition of an `if`/`elsif` from its statements.",
    },
    case: {
      detail: "keyword",
      doc: "Multi-way branch statement.\n\n```ada\ncase Day is\n   when 1 => Put_Line (\"Mon\");\n   when others => Put_Line (\"Other\");\nend case;\n```",
    },
    when: {
      detail: "keyword",
      doc: "Introduces a choice in a `case` statement, an exception handler, or an entry barrier.",
    },
    others: {
      detail: "keyword",
      doc: "The catch-all choice in a `case` statement or aggregate for values not explicitly covered.",
    },
    loop: {
      detail: "keyword",
      doc: "Opens a loop. Paired with `end loop`.\n\n```ada\nloop\n   exit when Done;\nend loop;\n```",
    },
    for: {
      detail: "keyword",
      doc: "Counted loop.\n\n```ada\nfor I in 1 .. 10 loop\n   Put_Line (Integer'Image (I));\nend loop;\n```",
    },
    while: {
      detail: "keyword",
      doc: "Pre-condition loop.\n\n```ada\nwhile not Done loop\n   Step;\nend loop;\n```",
    },
    exit: {
      detail: "keyword",
      doc: "Leaves a loop immediately, optionally guarded: `exit when Condition;`. Can name a loop label.",
    },
    record: {
      detail: "keyword",
      doc: "Defines a record (composite) type.\n\n```ada\ntype Point is record\n   X, Y : Integer;\nend record;\n```",
    },
    array: {
      detail: "keyword",
      doc: "Defines an array type.\n\n```ada\ntype Vector is array (1 .. 10) of Float;\n```",
    },
    range: {
      detail: "keyword",
      doc: "Specifies a range constraint: `Integer range 1 .. 10`, or an iteration range: `for I in A'Range loop`.",
    },
    constant: {
      detail: "keyword",
      doc: "Marks an object as a constant. Written after the colon: `N : constant Integer := 3;`.",
    },
    return: {
      detail: "keyword",
      doc: "Returns from a function with a value, or exits a procedure: `return;`.",
    },
    in: {
      detail: "keyword",
      doc: "Marks a parameter mode (read-only), a membership test (`X in 1 .. 10`), or an iteration domain.",
    },
    out: {
      detail: "keyword",
      doc: "Marks a parameter mode that the subprogram may only assign to.",
    },
    with: {
      detail: "keyword",
      doc: "Context clause importing a library unit, or a `with` clause on a subprogram.\n\n```ada\nwith Ada.Text_IO;\n```",
    },
    use: {
      detail: "keyword",
      doc: "Makes the visible declarations of a package directly accessible without a prefix.",
    },
    raise: {
      detail: "keyword",
      doc: "Raises an exception, optionally with a message: `raise Constraint_Error with \"bad input\";`.",
    },
    exception: {
      detail: "keyword",
      doc: "Introduces the exception handlers of a block.",
    },
    new: {
      detail: "keyword",
      doc: "Allocates an object with an access type: `Ptr := new Integer'(0);`.",
    },
    access: {
      detail: "keyword",
      doc: "Defines an access (pointer) type: `type Int_Ptr is access all Integer;`.",
    },
    tagged: {
      detail: "keyword",
      doc: "Marks a record type as extensible, enabling inheritance and dynamic dispatch.",
    },
    abstract: {
      detail: "keyword",
      doc: "Marks a tagged type or subprogram as abstract (must be overridden).",
    },
    overriding: {
      detail: "keyword",
      doc: "Declares that a subprogram overrides an inherited primitive operation.",
    },
    renames: {
      detail: "keyword",
      doc: "Introduces a renaming declaration: `Put : ... renames Ada.Text_IO.Put;`.",
    },
    generic: {
      detail: "keyword",
      doc: "Introduces a generic unit, parameterized by types, subprograms, or objects.",
    },
    pragma: {
      detail: "keyword",
      doc: "Compiler directive giving implementation advice, e.g. `pragma Inline (F);`.",
    },
    null: {
      detail: "keyword",
      doc: "A null statement (does nothing) or the null access value.",
    },
    all: {
      detail: "keyword",
      doc: "Dereferences an access value (`Ptr.all`) or denotes a general access type (`access all T`).",
    },
    aliased: {
      detail: "keyword",
      doc: "Declares that an object may be designated by an access value.",
    },
    limited: {
      detail: "keyword",
      doc: "Defines a limited type whose values cannot be assigned or compared with `=`.",
    },
    delay: {
      detail: "keyword",
      doc: "Suspends execution: `delay 1.0;` or `delay until Next_Time;`.",
    },
    abort: {
      detail: "keyword",
      doc: "Aborts a task or tasks: `abort Worker;`.",
    },
    goto: {
      detail: "keyword",
      doc: "Transfers control to a statement label (rarely used).",
    },
    mod: {
      detail: "operator",
      doc: "Modulus operator: `A mod B` yields a result with the sign of B.",
    },
    rem: {
      detail: "operator",
      doc: "Remainder operator: `A rem B` yields a result with the sign of A.",
    },
    abs: {
      detail: "operator",
      doc: "Absolute value operator: `abs X`.",
    },
    and: { detail: "operator", doc: "Boolean or bitwise AND, short-circuit for Booleans." },
    or: { detail: "operator", doc: "Boolean or bitwise OR, short-circuit for Booleans." },
    xor: { detail: "operator", doc: "Boolean or bitwise exclusive OR." },
    not: { detail: "operator", doc: "Boolean or bitwise negation." },
  };

  const ADA_TYPE_DOCS: Record<string, string> = {
    Boolean: "The enumeration type `(False, True)`. Relational and equality operators return Boolean.",
    Integer: "The implementation-defined signed integer type; at least 16 bits.",
    Natural: "Subtype of `Integer` with values from 0 to `Integer'Last`.",
    Positive: "Subtype of `Integer` with values from 1 to `Integer'Last`.",
    Float: "The implementation-defined floating-point type.",
    Long_Float: "A floating-point type with at least 6 decimal digits of precision (usually more).",
    Short_Float: "A floating-point type with at least 6 decimal digits of precision.",
    Long_Integer: "A signed integer type with a range at least that of `Integer` (usually 64-bit).",
    Short_Integer: "A signed integer type with at least 16 bits.",
    Duration: "A fixed-point type representing a length of time in seconds.",
    Character: "A character type corresponding to a 256-value character set.",
    Wide_Character: "A 16-bit-wide character type.",
    Wide_Wide_Character: "A 32-bit-wide character type.",
    String: "An unconstrained array of `Character`, indexed by `Positive`.",
    Wide_String: "An unconstrained array of `Wide_Character`.",
    Wide_Wide_String: "An unconstrained array of `Wide_Wide_Character`.",
  };

  const ADA_ATTRIBUTE_DOCS: Record<string, string> = {
    Access: "`X'Access` yields an access value designating X.",
    Address: "`X'Address` is the address of the object X.",
    Aft: "`X'Aft` is the number of decimal digits needed after the point to represent X exactly.",
    Alignment: "`X'Alignment` is the address alignment, in storage elements, of X.",
    Base: "`T'Base` is the base type of T, without any constraint.",
    Bit_Order: "`T'Bit_Order` is the bit ordering within a storage element.",
    Ceiling: "`X'Ceiling` rounds X towards positive infinity to an integral value.",
    Class: "`T'Class` is the class-wide type rooted at tagged type T.",
    Component_Size: "`T'Component_Size` is the size in bits of each component of array type T.",
    Constrained: "`X'Constrained` is True if X is constrained.",
    Digits: "`T'Digits` is the number of decimal digits of precision of floating-point type T.",
    Enum_Rep: "`X'Enum_Rep` is the internal integer representation of enumeration value X.",
    Exponent: "`X'Exponent` is the exponent of the normalized floating-point value X.",
    First: "`A'First` is the lower bound of array A (or `T'First` for a scalar type).",
    First_Bit: "`X'First_Bit` is the offset of the first bit of a record component.",
    Floor: "`X'Floor` rounds X towards negative infinity to an integral value.",
    Fore: "`X'Fore` is the number of characters needed before the decimal point for X.",
    Fraction: "`X'Fraction` is the fractional part of X.",
    Image: "`X'Image` returns the string representation of the value X.",
    Input: "`T'Input` reads a value of type T using the default input format.",
    Last: "`A'Last` is the upper bound of array A (or `T'Last` for a scalar type).",
    Last_Bit: "`X'Last_Bit` is the offset of the last bit of a record component.",
    Length: "`A'Length` is the number of components in the array A.",
    Machine_Emax: "`T'Machine_Emax` is the largest exponent of the machine model of T.",
    Machine_Emin: "`T'Machine_Emin` is the smallest exponent of the machine model of T.",
    Machine_Mantissa: "`T'Machine_Mantissa` is the number of bits of mantissa of T.",
    Max: "`T'Max` is the largest value of the scalar type T.",
    Min: "`T'Min` is the smallest value of the scalar type T.",
    Mod: "`X'Mod` is the modulus (a positive remainder) of X.",
    Modulus: "`T'Modulus` is the modulus of a modular integer type T.",
    Object_Size: "`T'Object_Size` is the size in bits of an object of type T.",
    Output: "`T'Output` writes a value of type T using the default output format.",
    Pos: "`X'Pos` is the position number of the scalar value X.",
    Position: "`X'Position` is the offset of a record component within the record.",
    Pred: "`X'Pred` is the value preceding X in the scalar type's order.",
    Range: "`A'Range` is the range of index values of array A (`A'First .. A'Last`).",
    Read: "`T'Read` reads a value of type T in binary form from a stream.",
    Remainder: "`X'Remainder (Y)` is the remainder of X / Y, rounded to the nearest integer quotient.",
    Round: "`X'Round` rounds X to the nearest integral value (ties away from zero).",
    Rounding: "`T'Rounding` describes the rounding mode of floating-point type T.",
    Scale: "`X'Scale (N)` multiplies X by the radix raised to the power N.",
    Signed_Zeros: "`T'Signed_Zeros` is True if T distinguishes signed zeros.",
    Size: "`T'Size` is the size in bits of type T (`X'Size` for an object).",
    Small: "`T'Small` is the smallest positive value of fixed-point type T.",
    Storage_Size: "`T'Storage_Size` is the number of storage elements reserved for an access type.",
    Succ: "`X'Succ` is the value following X in the scalar type's order.",
    Tag: "`X'Tag` is the tag of the tagged object or type X.",
    Terminated: "`T'Terminated` is True if the task or task type T is terminated.",
    Truncation: "`T'Truncation` is the maximum number of consecutive decimal digits for T.",
    Type_Class: "`T'Type_Class` is the type class of T (e.g. an enumeration or signed integer).",
    Unchecked_Access: "`X'Unchecked_Access` yields an access value without accessibility checks.",
    Val: "`T'Val (N)` returns the scalar value whose position number is N.",
    Valid: "`X'Valid` is True if the object X holds a value that is valid for its subtype.",
    Value: "`T'Value (S)` parses the string S and returns the value of type T it represents.",
    Value_Size: "`T'Value_Size` is the size in bits needed to represent a value of type T.",
    Width: "`T'Width` is the maximum length of an `Image` of a value of type T.",
    Word_Size: "`T'Word_Size` is the size in bits of the largest machine word of the compiler.",
    Write: "`T'Write` writes a value of type T in binary form to a stream.",
  };

  const ADA_PACKAGES: Record<
    string,
    { name: string; doc: string; members: Record<string, string> }
  > = {
    "ada.text_io": {
      name: "Ada.Text_IO",
      doc: "Input and output of characters, strings and lines to text files, including standard input/output.",
      members: {
        Put: "Writes a string (no newline): `Put (File, Item)`.",
        Put_Line: "Writes a string followed by a line terminator.",
        Get: "Reads a single character, skipping control characters.",
        Get_Line: "Reads a line and returns it as a `String`.",
        New_Line: "Writes a line terminator, optionally repeated N times.",
        Skip_Line: "Skips a line (or N lines) of input.",
        End_Of_Line: "True when the current input line is exhausted.",
        End_Of_File: "True when the current input file is exhausted.",
        Look_Ahead: "Looks at the next character without consuming it.",
        Flush: "Forces buffered output to be written.",
        Set_Output: "Selects the current default output file.",
        Set_Input: "Selects the current default input file.",
        Standard_Output: "The standard output text file.",
        Standard_Input: "The standard input text file.",
        Standard_Error: "The standard error text file.",
        Current_Output: "The file currently used by `Put`, `Put_Line` and `New_Line`.",
        Current_Input: "The file currently used by `Get`, `Get_Line` and `Skip_Line`.",
        File_Type: "The type of a text file object.",
      },
    },
    "ada.integer_text_io": {
      name: "Ada.Integer_Text_IO",
      doc: "Input and output of `Integer` values using text formatting.",
      members: {
        Put: "Writes an integer: `Put (Item, Width, Base)`.",
        Get: "Reads an integer, optionally with a width or error parameter.",
        Put_Line: "Writes an integer followed by a line terminator.",
        Default_Width: "The default field width used by `Put`.",
      },
    },
    "ada.float_text_io": {
      name: "Ada.Float_Text_IO",
      doc: "Input and output of floating-point values using text formatting.",
      members: {
        Put: "Writes a float: `Put (Item, Fore, Aft, Exp)`.",
        Get: "Reads a floating-point value.",
        Put_Line: "Writes a float followed by a line terminator.",
        Default_Fore: "Default number of characters before the decimal point.",
        Default_Aft: "Default number of characters after the decimal point.",
        Default_Exp: "Default width of the exponent.",
      },
    },
    "ada.characters.handling": {
      name: "Ada.Characters.Handling",
      doc: "Character classification and case-conversion functions.",
      members: {
        To_Upper: "Converts a character or string to upper case.",
        To_Lower: "Converts a character or string to lower case.",
        Is_Letter: "True if the character is a letter.",
        Is_Digit: "True if the character is a decimal digit.",
        Is_Control: "True if the character is a control character.",
        Is_Space: "True if the character is a space.",
        Is_Upper: "True if the character is an upper-case letter.",
        Is_Lower: "True if the character is a lower-case letter.",
        Is_Alphanumeric: "True if the character is a letter or a digit.",
      },
    },
    "ada.strings": {
      name: "Ada.Strings",
      doc: "Root package of the string-handling hierarchy; defines common types and exceptions.",
      members: {
        Length_Error: "Exception raised when a string is shorter than requested.",
        Pattern_Error: "Exception raised for malformed patterns.",
        Index_Error: "Exception raised for an out-of-range index.",
        Translation_Error: "Exception raised by a translation function.",
        Trim_End: "Enumeration controlling which ends `Trim` removes.",
        Direction: "Enumeration controlling search direction (`Forward`, `Backward`).",
        Alignment: "Enumeration controlling padding alignment (`Left`, `Right`, `Center`).",
        Space: "Subtype of `Character` comprising the space character.",
      },
    },
    "ada.strings.fixed": {
      name: "Ada.Strings.Fixed",
      doc: "Fixed-length string operations on `String` and `Character`.",
      members: {
        Index: "Finds a pattern inside a string, returning its position.",
        Index_Non_Blank: "Finds the first non-blank character.",
        Count: "Counts occurrences of a pattern in a string.",
        Replace_Slice: "Replaces a slice of a string with another string.",
        Insert: "Inserts a string into another string.",
        Delete: "Deletes a slice from a string.",
        Trim: "Removes leading and/or trailing characters.",
        Head: "Returns the first N characters, padded if necessary.",
        Tail: "Returns the last N characters, padded if necessary.",
        Move: "Copies a source string into a target with padding and direction.",
        Translate: "Maps characters using a translation table.",
      },
    },
    "ada.strings.unbounded": {
      name: "Ada.Strings.Unbounded",
      doc: "Dynamically sized strings that can grow and shrink at run time.",
      members: {
        Unbounded_String: "The dynamically sized string type.",
        To_Unbounded_String: "Converts a `String` (or other value) to an `Unbounded_String`.",
        To_String: "Converts an `Unbounded_String` to a `String`.",
        Length: "Returns the length of an `Unbounded_String`.",
        Append: "Appends to an `Unbounded_String`.",
        Insert: "Inserts a string at a given position.",
        Delete: "Deletes a slice of an `Unbounded_String`.",
        Replace_Slice: "Replaces a slice of an `Unbounded_String`.",
        Slice: "Returns a slice of an `Unbounded_String` as a `String`.",
        Index: "Searches for a pattern within an `Unbounded_String`.",
        Trim: "Removes leading and/or trailing characters.",
        Null_Unbounded_String: "The empty unbounded string.",
      },
    },
    "ada.numerics": {
      name: "Ada.Numerics",
      doc: "Root package of the numeric hierarchy; defines `Pi` and other constants.",
      members: {
        Pi: "The ratio of a circle's circumference to its diameter.",
        e: "The base of natural logarithms.",
      },
    },
    "ada.numerics.elementary_functions": {
      name: "Ada.Numerics.Elementary_Functions",
      doc: "Common mathematical functions for `Float`.",
      members: {
        Sqrt: "Square root.",
        Log: "Natural logarithm.",
        Log_Base_2: "Base-2 logarithm.",
        Log_Base_10: "Base-10 logarithm.",
        Exp: "Exponential (e raised to a power).",
        "**": "Exponentiation operator.",
        Sin: "Sine (radians).",
        Cos: "Cosine (radians).",
        Tan: "Tangent (radians).",
        Arcsin: "Inverse sine.",
        Arccos: "Inverse cosine.",
        Arctan: "Inverse tangent.",
        Arctan2: "Inverse tangent of a ratio of two arguments.",
        Sinh: "Hyperbolic sine.",
        Cosh: "Hyperbolic cosine.",
        Tanh: "Hyperbolic tangent.",
      },
    },
    "ada.calendar": {
      name: "Ada.Calendar",
      doc: "Calendar time, split into year, month, day and seconds.",
      members: {
        Time: "An absolute point in calendar time.",
        Clock: "Returns the current calendar time.",
        Year: "Returns the year component of a `Time`.",
        Month: "Returns the month component of a `Time`.",
        Day: "Returns the day component of a `Time`.",
        Seconds: "Returns the seconds component of a `Time` (a `Duration`).",
        "+": "Adds a `Duration` to a `Time`.",
        "-": "Subtracts a `Duration` from a `Time`, or two `Time`s.",
        ">": "Compares two calendar times.",
      },
    },
    "ada.real_time": {
      name: "Ada.Real_Time",
      doc: "Monotonic clock and real-time scheduling facilities.",
      members: {
        Time: "A point on the monotonic real-time clock.",
        Time_Span: "A difference between two real-time values.",
        Clock: "Returns the current real-time clock value.",
        Milliseconds: "Converts a number of milliseconds to a `Time_Span`.",
        Seconds: "Converts a number of seconds to a `Time_Span`.",
        To_Duration: "Converts a `Time_Span` to a `Duration`.",
        Delay_Until: "Suspends until an absolute real-time value.",
      },
    },
    "ada.exceptions": {
      name: "Ada.Exceptions",
      doc: "Operations on exceptions: raising, reraise, message and information.",
      members: {
        Exception_Id: "The type of an exception identifier.",
        Exception_Occurrence: "Information about a raised exception.",
        Raise_Exception: "Raises an exception with a message.",
        Reraise_Occurrence: "Reraises a saved exception occurrence.",
        Exception_Message: "Returns the message of an exception occurrence.",
        Exception_Information: "Returns detailed information about an occurrence.",
        Exception_Name: "Returns the name of an exception.",
        Save_Occurrence: "Copies an occurrence into a local variable.",
      },
    },
    "ada.command_line": {
      name: "Ada.Command_Line",
      doc: "Access to the command-line arguments of the program.",
      members: {
        Argument_Count: "The number of command-line arguments.",
        Argument: "Returns the Nth command-line argument.",
        Command_Name: "Returns the name of the program.",
        Set_Exit_Status: "Sets the program's exit status.",
        Exit_Status: "The current exit status.",
        Success: "Exit status indicating success.",
        Failure: "Exit status indicating failure.",
      },
    },
    "ada.unchecked_deallocation": {
      name: "Ada.Unchecked_Deallocation",
      doc: "Generic procedure that frees the storage of an allocated object.",
      members: {
        Free: "The generic procedure that deallocates an object and sets the access value to null.",
      },
    },
    "ada.unchecked_conversion": {
      name: "Ada.Unchecked_Conversion",
      doc: "Generic function that reinterprets the bit pattern of one type as another type.",
      members: {},
    },
    "ada.directories": {
      name: "Ada.Directories",
      doc: "Operations on directories, files and path names.",
      members: {
        Create_Directory: "Creates a new directory.",
        Delete_Directory: "Deletes a directory.",
        Delete_File: "Deletes a file.",
        Rename: "Renames a file or directory.",
        Exists: "True if the named file or directory exists.",
        Current_Directory: "Returns the current working directory.",
        Set_Directory: "Changes the current working directory.",
        Full_Name: "Returns the absolute path for a name.",
        Simple_Name: "Returns the simple (base) name of a path.",
        Containing_Directory: "Returns the directory containing a path.",
        Extension: "Returns the file extension of a path.",
        Base_Name: "Returns the name without its extension.",
      },
    },
    "ada.containers.vectors": {
      name: "Ada.Containers.Vectors",
      doc: "Generic vector (resizable array) container.",
      members: {
        Vector: "The generic vector type.",
        Append: "Appends an element to the vector.",
        Insert: "Inserts an element at a given index.",
        Delete: "Deletes an element at a given index.",
        Element: "Returns the element at a given index.",
        Length: "Returns the number of elements in the vector.",
        First_Index: "Returns the index of the first element.",
        Last_Index: "Returns the index of the last element.",
        Iterate: "Calls a procedure for each element.",
        Clear: "Removes all elements from the vector.",
      },
    },
    "ada.tags": {
      name: "Ada.Tags",
      doc: "Operations on the tags of tagged types.",
      members: {
        Tag: "The type of a tag.",
        Expanded_Name: "Returns the fully qualified name of a tag.",
      },
    },
    "ada.io_exceptions": {
      name: "Ada.IO_Exceptions",
      doc: "Exceptions raised by input/output operations.",
      members: {
        Status_Error: "Raised when the file is not in the required mode.",
        Mode_Error: "Raised when a file does not support the requested mode.",
        Name_Error: "Raised when a file name cannot be mapped to a file.",
        Use_Error: "Raised when the operation is not possible for the device.",
        Device_Error: "Raised when an I/O device error occurs.",
        End_Error: "Raised by an attempt to read past the end of a file.",
        Data_Error: "Raised when the data read is not valid for the type.",
        Layout_Error: "Raised when a field width is insufficient.",
      },
    },
  };

  // Flat index of standard-library subprograms/members by simple name, so that
  // `Put_Line` (used directly after `use`) can be completed and hovered.
  const ADA_LIBRARY_MEMBERS: Record<
    string,
    { name: string; pkg: string; doc: string }
  > = {};
  for (const pkg of Object.values(ADA_PACKAGES)) {
    for (const [member, doc] of Object.entries(pkg.members || {})) {
      if (!/^[A-Za-z_]/.test(member)) continue;
      const key = member.toLowerCase();
      if (!ADA_LIBRARY_MEMBERS[key]) {
        ADA_LIBRARY_MEMBERS[key] = { name: member, pkg: pkg.name, doc };
      }
    }
  }

  const ADA_CHILD_PACKAGES = [
    "Text_IO",
    "Integer_Text_IO",
    "Float_Text_IO",
    "Characters",
    "Strings",
    "Numerics",
    "Calendar",
    "Real_Time",
    "Exceptions",
    "Command_Line",
    "Directories",
    "Unchecked_Deallocation",
    "Unchecked_Conversion",
    "Containers",
    "Finalization",
    "Tags",
    "Task_Attributes",
    "IO_Exceptions",
    "Sequential_IO",
    "Direct_IO",
    "Streams",
  ];

  // ──────────────────────────────────────────
  // 5. SNIPPET DEFINITIONS
  // ──────────────────────────────────────────
  const adaSnippets = [
    {
      label: "procedure",
      detail: "Procedure body",
      insertText:
        "procedure ${1:Name} (${2:Params}) is\nbegin\n   ${0}\nend ${1:Name};",
      doc: "Creates a procedure with a body.",
    },
    {
      label: "function",
      detail: "Function body",
      insertText:
        "function ${1:Name} (${2:Params}) return ${3:Integer} is\nbegin\n   return ${0};\nend ${1:Name};",
      doc: "Creates a function with a return type.",
    },
    {
      label: "package",
      detail: "Package spec and body",
      insertText:
        "package ${1:Name} is\n   ${0}\nend ${1:Name};",
      doc: "Creates a package specification.",
    },
    {
      label: "packagebody",
      detail: "Package body",
      insertText: "package body ${1:Name} is\n   ${0}\nend ${1:Name};",
      doc: "Creates a package body.",
    },
    {
      label: "main",
      detail: "Main procedure with Text_IO",
      insertText:
        'with Ada.Text_IO; use Ada.Text_IO;\n\nprocedure ${1:Main} is\nbegin\n   Put_Line ("${2:Hello, Ada!}");\n   ${0}\nend ${1:Main};',
      doc: "Creates a complete main procedure that uses Ada.Text_IO.",
    },
    {
      label: "if",
      detail: "If statement",
      insertText: "if ${1:Condition} then\n   ${2:null;}\nend if;",
      doc: "Creates an if statement.",
    },
    {
      label: "ifelse",
      detail: "If/else statement",
      insertText:
        "if ${1:Condition} then\n   ${2:null;}\nelse\n   ${0:null;}\nend if;",
      doc: "Creates an if/else statement.",
    },
    {
      label: "ifelsif",
      detail: "If/elsif/else statement",
      insertText:
        "if ${1:Condition} then\n   ${2:null;}\nelsif ${3:Other} then\n   ${4:null;}\nelse\n   ${0:null;}\nend if;",
      doc: "Creates an if/elsif/else statement.",
    },
    {
      label: "case",
      detail: "Case statement",
      insertText:
        "case ${1:Expression} is\n   when ${2:Choice} =>\n      ${3:null;}\n   when others =>\n      ${0:null;}\nend case;",
      doc: "Creates a case statement with an `others` choice.",
    },
    {
      label: "loop",
      detail: "Plain loop",
      insertText: "loop\n   ${1:exit when ${2:Condition};}\n   ${0}\nend loop;",
      doc: "Creates a plain loop with an exit condition.",
    },
    {
      label: "for",
      detail: "For loop",
      insertText:
        "for ${1:I} in ${2:1 .. 10} loop\n   ${0:null;}\nend loop;",
      doc: "Creates a counted for loop.",
    },
    {
      label: "while",
      detail: "While loop",
      insertText: "while ${1:Condition} loop\n   ${0:null;}\nend loop;",
      doc: "Creates a while loop.",
    },
    {
      label: "declare",
      detail: "Declare block",
      insertText:
        "declare\n   ${1:N : constant Integer := 0;}\nbegin\n   ${0:null;}\nend;",
      doc: "Creates a block with a declarative part.",
    },
    {
      label: "type",
      detail: "Enumerated type",
      insertText: "type ${1:Name} is (${2:First}, ${3:Second}, ${0:Third});",
      doc: "Creates an enumeration type.",
    },
    {
      label: "record",
      detail: "Record type",
      insertText:
        "type ${1:Name} is record\n   ${2:Field} : ${3:Integer};\n   ${0}\nend record;",
      doc: "Creates a record type.",
    },
    {
      label: "array",
      detail: "Array type",
      insertText: "type ${1:Name} is array (${2:1 .. 10}) of ${0:Integer};",
      doc: "Creates an array type.",
    },
    {
      label: "subtype",
      detail: "Subtype declaration",
      insertText: "subtype ${1:Name} is ${2:Integer} range ${3:0 .. 9};",
      doc: "Creates a constrained subtype.",
    },
    {
      label: "task",
      detail: "Task body",
      insertText: "task body ${1:Name} is\nbegin\n   loop\n      ${2:null;}\n   end loop;\nend ${1:Name};",
      doc: "Creates a task body with a loop.",
    },
    {
      label: "protected",
      detail: "Protected object",
      insertText:
        "protected ${1:Name} is\n   procedure ${2:Op};\nprivate\n   ${3:Data} : ${4:Integer} := 0;\nend ${1:Name};",
      doc: "Creates a protected object with an operation.",
    },
    {
      label: "exception",
      detail: "Exception handler",
      insertText:
        "exception\n   when ${1:others} =>\n      ${0:Put_Line (\"error\");}",
      doc: "Creates an exception handler section.",
    },
    {
      label: "try",
      detail: "Block with exception handler",
      insertText:
        'begin\n   ${1:null;}\nexception\n   when ${2:others} =>\n      Put_Line ("${0:error}");\nend;',
      doc: "Creates a begin/exception/end block.",
    },
    {
      label: "withuse",
      detail: "With and use clause",
      insertText: "with ${1:Ada.Text_IO}; use ${1:Ada.Text_IO};",
      doc: "Creates a context clause importing and using a package.",
    },
    {
      label: "putline",
      detail: "Put_Line call",
      insertText: 'Put_Line ("${0}");',
      doc: "Writes a line of text to standard output.",
    },
    {
      label: "put",
      detail: "Put call",
      insertText: "Put (${0:Item});",
      doc: "Writes a value to standard output without a newline.",
    },
    {
      label: "getline",
      detail: "Get_Line call",
      insertText: "Get_Line (${0:Buffer}, Last);",
      doc: "Reads a line of input into a buffer.",
    },
  ];

  // ──────────────────────────────────────────
  // 6. SYMBOL TRACKER (for Go to Definition / Outline)
  // ──────────────────────────────────────────
  function parseSymbols(model: Monaco.editor.ITextModel) {
    const symbols: {
      name: string;
      kind: string;
      line: number;
      column: number;
      endColumn: number;
      detail: string;
    }[] = [];
    const lines = model.getValue().split("\n");

    const excluded = new Set([
      ...ADA_KEYWORDS.map((k) => k.toLowerCase()),
      "body",
      "constant",
      "renames",
      "all",
      "access",
    ]);

    const subprogram =
      /\b(procedure|function|package|task|protected|entry)\s+(?:body\s+)?([A-Za-z_]\w*)/i;
    const typeDecl = /^\s*(?:type|subtype)\s+([A-Za-z_]\w*)/i;
    const varDecl =
      /^\s*([A-Za-z_]\w*(?:\s*,\s*[A-Za-z_]\w*)*)\s*:\s*(constant\s+)?([A-Za-z_]\w*(?:\.\w+)*)/i;

    let parenDepth = 0;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNum = i + 1;
      const trimmed = line.trim();
      const depthAtStart = parenDepth;
      for (const ch of line) {
        if (ch === "(") parenDepth++;
        else if (ch === ")") parenDepth = Math.max(0, parenDepth - 1);
      }

      if (trimmed === "" || trimmed.startsWith("--")) continue;

      let m = subprogram.exec(line);
      if (m) {
        const name = m[2];
        if (!excluded.has(name.toLowerCase())) {
          const column = m.index + m[0].indexOf(name) + 1;
          symbols.push({
            name,
            kind: m[1].toLowerCase(),
            line: lineNum,
            column,
            endColumn: column + name.length,
            detail: line.trim(),
          });
        }
      }

      m = typeDecl.exec(line);
      if (m) {
        const name = m[1];
        if (!excluded.has(name.toLowerCase())) {
          const column = line.indexOf(name) + 1;
          symbols.push({
            name,
            kind: "type",
            line: lineNum,
            column,
            endColumn: column + name.length,
            detail: line.trim(),
          });
        }
      }

      const vm = varDecl.exec(line);
      if (vm && depthAtStart === 0 && !subprogram.test(line)) {
        const typeName = vm[3];
        const isConstant = !!vm[2];
        vm[1].split(",").forEach((raw) => {
          const name = raw.trim();
          if (!name || excluded.has(name.toLowerCase())) return;
          const column = line.indexOf(name) + 1;
          symbols.push({
            name,
            kind: isConstant ? "constant" : "variable",
            line: lineNum,
            column,
            endColumn: column + name.length,
            detail: `${name} : ${typeName}`,
          });
        });
      }
    }
    return symbols;
  }

  function computeOccurrences(model: Monaco.editor.ITextModel, name: string) {
    const lines = model.getLinesContent();
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp("\\b" + escaped + "\\b", "gi");
    const out: { line: number; startColumn: number; endColumn: number }[] = [];
    for (let i = 0; i < lines.length; i++) {
      regex.lastIndex = 0;
      let m: RegExpExecArray | null;
      while ((m = regex.exec(lines[i])) !== null) {
        out.push({
          line: i + 1,
          startColumn: m.index + 1,
          endColumn: m.index + 1 + name.length,
        });
      }
    }
    return out;
  }

  // ──────────────────────────────────────────
  // 7. COMPLETION PROVIDER
  // ──────────────────────────────────────────
  monaco.languages.registerCompletionItemProvider("ada", {
    triggerCharacters: ["'", ".", "("],
    provideCompletionItems: function (model, position) {
      const textUntil = model.getValueInRange({
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

      const suggestions: Monaco.languages.CompletionItem[] = [];
      const CIK = monaco.languages.CompletionItemKind;
      const InsertAsSnippet =
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet;

      // ── Attribute completion after a tick: X'Image ──
      const attrMatch = textUntil.match(/'(\w*)$/);
      if (attrMatch) {
        const attrRange = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: position.column - attrMatch[1].length,
          endColumn: position.column,
        };
        ADA_ATTRIBUTE_NAMES.forEach((name) => {
          suggestions.push({
            label: name,
            kind: CIK.Property,
            detail: "attribute",
            documentation: {
              value: ADA_ATTRIBUTE_DOCS[name] || `Ada attribute \`${name}\`.`,
            },
            insertText: name,
            range: attrRange,
            sortText: "0_" + name,
          });
        });
        return { suggestions };
      }

      // ── Dotted / package member completion ──
      const dotMatch = textUntil.match(/([A-Za-z_][\w.]*)\.(\w*)$/);
      if (dotMatch) {
        const qualifier = dotMatch[1].toLowerCase();
        const dotRange = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: position.column - dotMatch[2].length,
          endColumn: position.column,
        };

        if (qualifier === "ada") {
          ADA_CHILD_PACKAGES.forEach((name) => {
            suggestions.push({
              label: name,
              kind: CIK.Module,
              detail: `Ada.${name}`,
              documentation: {
                value:
                  ADA_PACKAGES[("ada." + name).toLowerCase()]?.doc ||
                  `Child package Ada.${name}.`,
              },
              insertText: name,
              range: dotRange,
            });
          });
          return { suggestions };
        }

        const pkg = ADA_PACKAGES[qualifier];
        if (pkg) {
          Object.entries(pkg.members).forEach(([member, doc]) => {
            suggestions.push({
              label: member,
              kind: CIK.Method,
              detail: `${pkg.name}.${member}`,
              documentation: { value: doc },
              insertText: /^[A-Za-z]/.test(member) ? member + " ($0)" : member,
              insertTextRules: /^[A-Za-z]/.test(member)
                ? InsertAsSnippet
                : undefined,
              range: dotRange,
            });
          });
          return { suggestions };
        }
      }

      // ── Snippets ──
      adaSnippets.forEach((s) => {
        suggestions.push({
          label: s.label,
          kind: CIK.Snippet,
          detail: "Snippet: " + s.detail,
          documentation: { value: s.doc },
          insertText: s.insertText,
          insertTextRules: InsertAsSnippet,
          range,
          sortText: "0_" + s.label,
        });
      });

      // ── Keywords ──
      ADA_KEYWORDS.forEach((kw) => {
        const info = ADA_KEYWORD_DOCS[kw];
        suggestions.push({
          label: kw,
          kind: CIK.Keyword,
          detail: info ? info.detail : "keyword",
          documentation: info ? { value: info.doc } : undefined,
          insertText: kw,
          range,
          sortText: "2_" + kw,
        });
      });

      // ── Types ──
      ADA_TYPES.forEach((t) => {
        suggestions.push({
          label: t,
          kind: CIK.Class,
          detail: "type",
          documentation: { value: `Predefined type \`${t}\`.` },
          insertText: t,
          range,
          sortText: "3_" + t,
        });
      });

      // ── Packages ──
      Object.values(ADA_PACKAGES).forEach((pkg) => {
        suggestions.push({
          label: pkg.name,
          kind: CIK.Module,
          detail: "package",
          documentation: { value: pkg.doc },
          insertText: pkg.name,
          range,
          sortText: "4_" + pkg.name,
        });
      });

      // ── Standard library subprograms (available after `use`) ──
      Object.values(ADA_LIBRARY_MEMBERS).forEach((info) => {
        suggestions.push({
          label: info.name,
          kind: CIK.Method,
          detail: info.pkg + "." + info.name,
          documentation: { value: info.doc },
          insertText: info.name + " ($0)",
          insertTextRules: InsertAsSnippet,
          range,
          sortText: "5_" + info.name,
        });
      });

      // ── User-defined symbols ──
      const symbols = parseSymbols(model);
      const seen = new Set<string>();
      symbols.forEach((sym) => {
        const key = sym.name.toLowerCase();
        if (seen.has(key)) return;
        seen.add(key);
        let kind = CIK.Variable;
        switch (sym.kind) {
          case "procedure":
          case "entry":
            kind = CIK.Method;
            break;
          case "function":
            kind = CIK.Function;
            break;
          case "package":
            kind = CIK.Module;
            break;
          case "task":
          case "protected":
            kind = CIK.Class;
            break;
          case "type":
            kind = CIK.Struct;
            break;
          case "constant":
            kind = CIK.Constant;
            break;
          default:
            kind = CIK.Variable;
        }
        const callable =
          sym.kind === "procedure" ||
          sym.kind === "function" ||
          sym.kind === "entry";
        suggestions.push({
          label: sym.name,
          kind,
          detail: sym.kind + " (user-defined)",
          documentation: {
            value: "```ada\n" + sym.detail + "\n```\nDefined at line " + sym.line,
          },
          insertText: callable ? sym.name + " ($0)" : sym.name,
          insertTextRules: callable ? InsertAsSnippet : undefined,
          range,
          sortText: "1_" + sym.name,
        });
      });

      return { suggestions };
    },
  });

  // ──────────────────────────────────────────
  // 8. HOVER PROVIDER
  // ──────────────────────────────────────────
  monaco.languages.registerHoverProvider("ada", {
    provideHover: function (model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return null;

      const name = word.word;
      const key = name.toLowerCase();
      const line = model.getLineContent(position.lineNumber);
      const charBefore = line[word.startColumn - 2];
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };

      // Attribute: X'Image
      if (charBefore === "'") {
        const normalized =
          ADA_ATTRIBUTE_NAMES.find((a) => a.toLowerCase() === key) || name;
        const doc = ADA_ATTRIBUTE_DOCS[normalized];
        return {
          range,
          contents: [
            { value: "```ada\nX'" + normalized + "\n```" },
            { value: doc || `Ada attribute \`${normalized}\`.` },
          ],
        };
      }

      // Keywords / operators
      if (ADA_KEYWORD_DOCS[key]) {
        const info = ADA_KEYWORD_DOCS[key];
        return {
          range,
          contents: [
            { value: "**" + info.detail + "** `" + name + "`" },
            { value: info.doc },
          ],
        };
      }

      // Predefined types
      const typeName = ADA_TYPES.find((t) => t.toLowerCase() === key);
      if (typeName) {
        return {
          range,
          contents: [
            { value: "```ada\n" + typeName + "\n```" },
            {
              value:
                ADA_TYPE_DOCS[typeName] || `Predefined type \`${typeName}\`.`,
            },
          ],
        };
      }

      // Packages
      const pkg = ADA_PACKAGES[key];
      if (pkg) {
        return {
          range,
          contents: [
            { value: "```ada\nwith " + pkg.name + ";\n```" },
            { value: pkg.doc },
            { value: "Members: `" + Object.keys(pkg.members).join("`, `") + "`" },
          ],
        };
      }

      // User-defined symbols
      const symbols = parseSymbols(model);
      const matches = symbols.filter((s) => s.name.toLowerCase() === key);
      if (matches.length > 0) {
        const sym = matches[0];
        return {
          range,
          contents: [
            { value: "**" + sym.kind + "** `" + sym.name + "`" },
            { value: "```ada\n" + sym.detail + "\n```" },
            { value: "_Defined at line " + sym.line + "_" },
          ],
        };
      }

      // Standard library subprograms (available after `use`)
      const lib = ADA_LIBRARY_MEMBERS[key];
      if (lib) {
        return {
          range,
          contents: [
            { value: "```ada\n" + lib.pkg + "." + lib.name + "\n```" },
            { value: lib.doc },
            { value: "_Ada standard library_" },
          ],
        };
      }

      return null;
    },
  });

  // ──────────────────────────────────────────
  // 9. DEFINITION PROVIDER (with block-local binding resolution)
  // ──────────────────────────────────────────
  // Resolves the name under the cursor to its block-local binding: every
  // occurrence bound to it, plus the occurrence that declares it. Names with no
  // block-local binding report `local: false` so callers can fall back to the
  // document-wide symbol table.
  const resolveBinding = (
    model: Monaco.editor.ITextModel,
    position: Monaco.Position,
  ) => {
    const word = model.getWordAtPosition(position);
    if (!word) return null;
    const name = word.word;

    const lines = model.getLinesContent();
    const lineStart: number[] = [];
    let size = 0;
    for (let i = 0; i < lines.length; i++) {
      lineStart.push(size);
      size += lines[i].length + 1;
    }
    const at = (line: number, col: number) => lineStart[line] + col;
    const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // Ada blocks: procedure/function/package/task/protected/declare/if/loop/
    // case/record/select/accept open a scope that `end` closes.
    type Scope = { start: number; end: number; line: number; names: Set<string> };
    const isOpener = (code: string) =>
      /^(?:procedure|function|package|task|protected|entry|declare|if|loop|case|record|select|accept)\b/i.test(
        code,
      ) || /\brecord\s*;?\s*$/i.test(code);
    const isCloser = (code: string) => /^end\b/i.test(code);
    const scopes: Scope[] = [];
    const open: Scope[] = [];
    for (let i = 0; i < lines.length; i++) {
      const code = lines[i].trim();
      if (isCloser(code)) {
        const scope = open.pop();
        if (scope) scope.end = at(i, 0);
      }
      if (isOpener(code)) {
        const scope: Scope = {
          start: at(i, 0),
          end: Infinity,
          line: i,
          names: new Set<string>(),
        };
        scopes.push(scope);
        open.push(scope);
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

    // Local declarations: object declarations at statement start
    // (`N : Integer;`, `A, B : constant Float := ...`) and parameters
    // (Ada is case-insensitive, so keywords are matched case-insensitively).
    const declaration = new RegExp(
      "(?:^|;)\\s*" +
        esc(name) +
        "\\s*(?:,\\s*\\w+\\s*)*:" +
        "|(?:[(,]\\s*)" +
        esc(name) +
        "\\s*[,:)]",
      "gi",
    );
    const declarations: { start: number; end: number; scope?: Scope }[] = [];
    for (let i = 0; i < lines.length; i++) {
      declaration.lastIndex = 0;
      let m: RegExpExecArray | null;
      while ((m = declaration.exec(lines[i])) !== null) {
        const before = lines[i].slice(0, m.index).replace(/\s+$/, "");
        const isParam = /^[(,]/.test(m[0]) || /[(,]$/.test(before);
        const owner = enclosing(at(i, m.index));
        // A parameter list only declares inside the block it heads, so a call
        // such as `Area (Shapes (I))` is not mistaken for a declaration.
        if (
          isParam &&
          (!owner || owner.line !== i || owner.start > at(i, m.index))
        )
          continue;
        if (owner) owner.names.add(name);
        declarations.push({
          start: at(i, m.index),
          end: at(i, m.index) + m[0].length,
          scope: owner,
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

    // Every occurrence bound to the same binding, and the one declaring it.
    type Occurrence = { line: number; startColumn: number; endColumn: number };
    const occurrences: Occurrence[] = [];
    let declarationRange: Occurrence | null = null;
    const occurrence = new RegExp("\\b" + esc(name) + "\\b", "gi");
    for (let i = 0; i < lines.length; i++) {
      occurrence.lastIndex = 0;
      let m: RegExpExecArray | null;
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

  monaco.languages.registerDefinitionProvider("ada", {
    provideDefinition: function (model, position) {
      // A block-local resolves to its own declaration, not the first match.
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
  const adaSignatures: Record<
    string,
    {
      label: string;
      documentation: string;
      parameters: { label: string; documentation: string }[];
    }
  > = {
    put_line: {
      label: "Put_Line (Item : String)",
      documentation: "Writes Item followed by a line terminator.",
      parameters: [
        { label: "Item : String", documentation: "The string to write." },
      ],
    },
    put: {
      label: "Put (Item; Width : Field := 0; Base : Number_Base := 10)",
      documentation: "Writes Item without a trailing line terminator.",
      parameters: [
        { label: "Item", documentation: "The value to write." },
        { label: "Width", documentation: "Minimum field width." },
        { label: "Base", documentation: "Numeric base for integer output." },
      ],
    },
    get_line: {
      label: "Get_Line (Item : out String; Last : out Natural)",
      documentation: "Reads a line of input into Item.",
      parameters: [
        { label: "Item", documentation: "Buffer receiving the line." },
        { label: "Last", documentation: "Index of the last character read." },
      ],
    },
    new_line: {
      label: "New_Line (Spacing : Positive := 1)",
      documentation: "Writes Spacing line terminators.",
      parameters: [
        { label: "Spacing", documentation: "Number of new lines to write." },
      ],
    },
    get: {
      label: "Get (Item : out Character)",
      documentation: "Reads the next character, skipping control characters.",
      parameters: [
        { label: "Item", documentation: "Variable receiving the character." },
      ],
    },
  };

  monaco.languages.registerSignatureHelpProvider("ada", {
    signatureHelpTriggerCharacters: ["(", ","],
    provideSignatureHelp: function (model, position) {
      const textUntil = model.getValueInRange({
        startLineNumber: 1,
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
        } else if (ch === "," && depth === 0) commaCount++;
      }
      if (parenPos < 0) return null;

      const before = textUntil.substring(0, parenPos).trimEnd();
      const match = before.match(/([A-Za-z_]\w*)\s*$/);
      if (!match) return null;
      const funcName = match[1].toLowerCase();

      let signature = adaSignatures[funcName];

      // Fall back to a user-defined subprogram's parameter profile.
      if (!signature) {
        const lines = model.getLinesContent();
        const spec = new RegExp(
          "\\b(?:procedure|function)\\s+" +
            match[1] +
            "\\s*\\(([^)]*)\\)",
          "i",
        );
        for (const line of lines) {
          const sm = spec.exec(line);
          if (sm) {
            const params = sm[1]
              .split(";")
              .map((p) => p.trim())
              .filter(Boolean);
            signature = {
              label:
                match[1] + " (" + (params.join("; ") || "") + ")",
              documentation: "User-defined subprogram.",
              parameters: params.map((p) => ({ label: p, documentation: "" })),
            };
            break;
          }
        }
      }

      if (!signature) return null;

      return {
        value: {
          signatures: [
            {
              label: signature.label,
              documentation: signature.documentation,
              parameters: signature.parameters,
            },
          ],
          activeSignature: 0,
          activeParameter: Math.min(
            commaCount,
            signature.parameters.length - 1,
          ),
        },
        dispose: () => {},
      };
    },
  });

  // ──────────────────────────────────────────
  // 11. DOCUMENT SYMBOL PROVIDER (Outline)
  // ──────────────────────────────────────────
  monaco.languages.registerDocumentSymbolProvider("ada", {
    provideDocumentSymbols: function (model) {
      const symbols = parseSymbols(model);
      const SK = monaco.languages.SymbolKind;
      return symbols.map((sym) => {
        let kind;
        switch (sym.kind) {
          case "procedure":
            kind = SK.Method;
            break;
          case "function":
            kind = SK.Function;
            break;
          case "package":
            kind = SK.Package;
            break;
          case "task":
          case "protected":
            kind = SK.Class;
            break;
          case "type":
            kind = SK.Struct;
            break;
          case "constant":
            kind = SK.Constant;
            break;
          default:
            kind = SK.Variable;
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

  // ──────────────────────────────────────────
  // 12. FOLDING RANGE PROVIDER
  // ──────────────────────────────────────────
  monaco.languages.registerFoldingRangeProvider("ada", {
    provideFoldingRanges: function (model) {
      const lines = model.getLinesContent();
      const ranges: {
        start: number;
        end: number;
        kind: Monaco.languages.FoldingRangeKind;
      }[] = [];

      const blockKeywords = [
        "procedure",
        "function",
        "package",
        "task",
        "protected",
        "entry",
        "declare",
        "loop",
        "case",
        "if",
        "select",
        "accept",
        "record",
      ];
      const strip = (s: string) =>
        s
          .replace(/--.*$/, "")
          .replace(/"(?:[^"]|"")*"/g, '""')
          .replace(/'[^']'/g, "''");

      const stack: number[] = [];
      for (let i = 0; i < lines.length; i++) {
        const words = (strip(lines[i]).toLowerCase().match(/[a-z_]\w*/g) ||
          []) as string[];
        let skipNext = false;
        for (const word of words) {
          if (skipNext) {
            skipNext = false;
            continue;
          }
          if (word === "end") {
            const start = stack.pop();
            if (start != null && start < i + 1) {
              ranges.push({
                start,
                end: i + 1,
                kind: monaco.languages.FoldingRangeKind.Region,
              });
            }
            skipNext = true;
          } else if (blockKeywords.includes(word)) {
            stack.push(i + 1);
          }
        }
      }

      // Consecutive line comments fold as a comment block.
      let commentStart = -1;
      for (let i = 0; i < lines.length; i++) {
        const isComment = lines[i].trim().startsWith("--");
        if (isComment && commentStart === -1) commentStart = i + 1;
        else if (!isComment && commentStart !== -1) {
          if (i + 1 - commentStart >= 2) {
            ranges.push({
              start: commentStart,
              end: i,
              kind: monaco.languages.FoldingRangeKind.Comment,
            });
          }
          commentStart = -1;
        }
      }
      if (commentStart !== -1 && lines.length + 1 - commentStart >= 2) {
        ranges.push({
          start: commentStart,
          end: lines.length,
          kind: monaco.languages.FoldingRangeKind.Comment,
        });
      }

      return ranges;
    },
  });

  // ──────────────────────────────────────────
  // 13. REFERENCE & DOCUMENT HIGHLIGHT PROVIDERS
  // ──────────────────────────────────────────
  monaco.languages.registerReferenceProvider("ada", {
    provideReferences: function (model, position) {
      const binding = resolveBinding(model, position);
      if (binding && binding.local) {
        return binding.occurrences.map((r) => ({
          uri: model.uri,
          range: new monaco.Range(r.line, r.startColumn, r.line, r.endColumn),
        }));
      }
      const word = model.getWordAtPosition(position);
      if (!word) return [];
      return computeOccurrences(model, word.word).map((r) => ({
        uri: model.uri,
        range: new monaco.Range(r.line, r.startColumn, r.line, r.endColumn),
      }));
    },
  });

  monaco.languages.registerDocumentHighlightProvider("ada", {
    provideDocumentHighlights: function (model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return [];
      return computeOccurrences(model, word.word).map((r) => ({
        range: new monaco.Range(r.line, r.startColumn, r.line, r.endColumn),
        kind: monaco.languages.DocumentHighlightKind.Text,
      }));
    },
  });

  // ──────────────────────────────────────────
  // 14. RENAME PROVIDER
  // ──────────────────────────────────────────
  monaco.languages.registerRenameProvider("ada", {
    provideRenameEdits: function (model, position, newName) {
      const word = model.getWordAtPosition(position);
      if (!word) return null;
      if (
        ADA_KEYWORDS.includes(word.word.toLowerCase()) ||
        ADA_TYPES.some((t) => t.toLowerCase() === word.word.toLowerCase())
      ) {
        return null;
      }

      const binding = resolveBinding(model, position);
      if (!binding) return null;
      const occurrences =
        binding.occurrences.length > 0
          ? binding.occurrences
          : computeOccurrences(model, binding.name);

      return {
        edits: occurrences.map((r) => ({
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
      const word = model.getWordAtPosition(position);
      if (!word) return { rejectReason: "Cannot rename this element." };
      if (ADA_KEYWORDS.includes(word.word.toLowerCase())) {
        return { rejectReason: "Cannot rename a keyword." };
      }
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
