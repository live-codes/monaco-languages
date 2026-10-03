import type * as Monaco from "monaco-editor";

/**
 * Fortran support (free and fixed source forms).
 *
 * Free-form `!` comments are recognized anywhere. A `*` in column 1 is also
 * treated as a fixed-form comment, since no valid statement may begin with it;
 * a leading `c`/`C` is left alone because it is indistinguishable from a
 * free-form identifier or keyword (`call`, `counter`, ...). Both `end if` and
 * `endif` spellings are accepted throughout.
 */
export default (monaco: typeof Monaco) => {
  const FORTRAN_LANG_ID = "fortran";

  // ──────────────────────────────────────────
  // 1. VOCABULARY
  // ──────────────────────────────────────────
  const FORTRAN_KEYWORDS = [
    "abstract",
    "allocatable",
    "allocate",
    "asynchronous",
    "backspace",
    "bind",
    "block",
    "byte",
    "call",
    "case",
    "class",
    "close",
    "codimension",
    "common",
    "concurrent",
    "contains",
    "continue",
    "critical",
    "cycle",
    "data",
    "deallocate",
    "decimal",
    "deferred",
    "dimension",
    "do",
    "else",
    "elseif",
    "elsewhere",
    "end",
    "endassociate",
    "endblock",
    "endcritical",
    "enddo",
    "endenum",
    "endfile",
    "endforall",
    "endfunction",
    "endif",
    "endinterface",
    "endmodule",
    "endprogram",
    "endselect",
    "endsubmodule",
    "endsubroutine",
    "endtype",
    "endwhere",
    "enum",
    "enumerator",
    "equivalence",
    "error",
    "exit",
    "extends",
    "external",
    "final",
    "flush",
    "forall",
    "format",
    "formatted",
    "function",
    "generic",
    "go",
    "goto",
    "if",
    "implicit",
    "import",
    "in",
    "inout",
    "inquire",
    "intent",
    "interface",
    "intrinsic",
    "lock",
    "module",
    "namelist",
    "none",
    "non_overridable",
    "nullify",
    "open",
    "optional",
    "out",
    "parameter",
    "pass",
    "pause",
    "pointer",
    "print",
    "private",
    "procedure",
    "program",
    "protected",
    "public",
    "pure",
    "read",
    "readonly",
    "recursive",
    "result",
    "return",
    "rewind",
    "save",
    "select",
    "selectcase",
    "selectrank",
    "selecttype",
    "sequence",
    "stop",
    "submodule",
    "subroutine",
    "sync",
    "target",
    "then",
    "type",
    "unformatted",
    "unlock",
    "use",
    "value",
    "volatile",
    "wait",
    "where",
    "while",
    "write",
  ];

  const FORTRAN_TYPES = [
    "character",
    "complex",
    "double",
    "doubleprecision",
    "doublecomplex",
    "integer",
    "logical",
    "precision",
    "real",
  ];

  // Intrinsic procedures and inquiry functions, highlighted as predefined.
  const FORTRAN_INTRINSICS = [
    "abs",
    "achar",
    "acos",
    "acosh",
    "adjustl",
    "adjustr",
    "aimag",
    "aint",
    "all",
    "allocated",
    "anint",
    "any",
    "asin",
    "asinh",
    "associated",
    "atan",
    "atan2",
    "atanh",
    "atomic_add",
    "atomic_and",
    "atomic_cas",
    "atomic_define",
    "atomic_fetch_add",
    "atomic_fetch_and",
    "atomic_fetch_or",
    "atomic_fetch_xor",
    "atomic_or",
    "atomic_ref",
    "atomic_xor",
    "bessel_j0",
    "bessel_j1",
    "bessel_jn",
    "bessel_y0",
    "bessel_y1",
    "bessel_yn",
    "bge",
    "bgt",
    "bit_size",
    "ble",
    "blt",
    "btest",
    "c_associated",
    "c_f_pointer",
    "c_f_procpointer",
    "c_funloc",
    "c_loc",
    "c_sizeof",
    "ceiling",
    "char",
    "cmplx",
    "co_broadcast",
    "co_max",
    "co_min",
    "co_reduce",
    "co_sum",
    "command_argument_count",
    "compiler_options",
    "compiler_version",
    "conjg",
    "cos",
    "cosh",
    "coshape",
    "count",
    "cpu_time",
    "cshift",
    "date_and_time",
    "dble",
    "digits",
    "dim",
    "dot_product",
    "dprod",
    "dshiftl",
    "dshiftr",
    "eoshift",
    "epsilon",
    "erf",
    "erfc",
    "erfc_scaled",
    "execute_command_line",
    "exp",
    "exponent",
    "extends_type_of",
    "failed_images",
    "findloc",
    "floor",
    "fraction",
    "gamma",
    "get_command",
    "get_command_argument",
    "get_environment_variable",
    "huge",
    "hypot",
    "iachar",
    "iand",
    "ibclr",
    "ibits",
    "ibset",
    "ichar",
    "ieor",
    "image_index",
    "index",
    "int",
    "ior",
    "iparity",
    "is_contiguous",
    "is_iostat_end",
    "is_iostat_eor",
    "ishft",
    "ishftc",
    "kind",
    "lbound",
    "lcobound",
    "leadz",
    "len",
    "len_trim",
    "lge",
    "lgt",
    "lle",
    "llt",
    "log",
    "log10",
    "log_gamma",
    "maskl",
    "maskr",
    "matmul",
    "max",
    "maxexponent",
    "maxloc",
    "maxval",
    "merge",
    "merge_bits",
    "minexponent",
    "min",
    "minloc",
    "minval",
    "mod",
    "modulo",
    "move_alloc",
    "mvbits",
    "nearest",
    "new_line",
    "nint",
    "norm2",
    "not",
    "null",
    "num_images",
    "pack",
    "parity",
    "popcnt",
    "poppar",
    "precision",
    "present",
    "product",
    "radix",
    "random_number",
    "random_seed",
    "range",
    "rank",
    "real",
    "repeat",
    "reshape",
    "rrspacing",
    "same_type_as",
    "scale",
    "scan",
    "selected_char_kind",
    "selected_int_kind",
    "selected_real_kind",
    "set_exponent",
    "shape",
    "shifta",
    "shiftl",
    "shiftr",
    "sign",
    "sin",
    "sinh",
    "size",
    "spacing",
    "spread",
    "sqrt",
    "storage_size",
    "stopped_images",
    "sum",
    "system_clock",
    "tan",
    "tanh",
    "this_image",
    "tiny",
    "trailz",
    "transfer",
    "transpose",
    "trim",
    "ubound",
    "ucobound",
    "unpack",
    "verify",
  ];

  const FORTRAN_OPERATORS = [
    "**",
    "//",
    "=>",
    "::",
    "==",
    "/=",
    "<=",
    ">=",
    "=",
    "+",
    "-",
    "*",
    "/",
    "<",
    ">",
  ];

  const LOGICAL_LITERALS = [".true.", ".false."];

  // ──────────────────────────────────────────
  // 2. REGISTER LANGUAGE
  // ──────────────────────────────────────────
  monaco.languages.register({
    id: FORTRAN_LANG_ID,
    extensions: [
      ".f",
      ".for",
      ".f77",
      ".f90",
      ".f95",
      ".f03",
      ".f08",
      ".f18",
      ".fpp",
      ".ftn",
      ".fpm",
    ],
    aliases: ["Fortran", "fortran", "f90", "f95", "f03", "f08", "f77"],
    mimetypes: ["text/x-fortran", "text/fortran"],
  });

  // ──────────────────────────────────────────
  // 3. MONARCH SYNTAX HIGHLIGHTING
  // ──────────────────────────────────────────
  monaco.languages.setMonarchTokensProvider(FORTRAN_LANG_ID, {
    defaultToken: "",
    ignoreCase: true,

    keywords: FORTRAN_KEYWORDS,
    typeKeywords: FORTRAN_TYPES,
    intrinsics: FORTRAN_INTRINSICS,
    operators: FORTRAN_OPERATORS,
    logicalLiterals: LOGICAL_LITERALS,

    symbols: /[=><!~?:&|+\-*\/\\^%]+/,

    tokenizer: {
      root: [
        // Preprocessor lines (`#include`, `#define`, `#ifdef`, ...)
        [
          /^\s*#\s*(?:include|define|undef|ifdef|ifndef|if|elif|else|endif|error|warning|line|pragma|region|endregion)\b.*$/,
          "keyword.directive",
        ],

        // Fixed-form comments: a `*` in column 1 cannot start a statement.
        [/^\*.*$/, "comment"],

        // Free-form comments (and trailing comments).
        [/!.*$/, "comment"],

        // Strings (doubled delimiters escape a quote).
        [/'/, "string", "@singleString"],
        [/"/, "string", "@doubleString"],

        // Dot-delimited logical operators and literals.
        [
          /\.(?:and|or|not|eqv|neqv|eq|ne|lt|le|gt|ge)\./,
          "keyword.operator",
        ],
        [/\.(?:true|false)\./, "constant"],

        // Binary/octal/hex literals with a kind suffix, e.g. b'1010', z'1f'.
        [/[bBoOzZ]'[0-9a-fA-F]+'/, "number.hex"],

        // Numbers, real literals with optional kind suffix.
        [
          /\d+\.\d*(?:[eEdDqQ][-+]?\d+)?(?:_\w+)?/,
          "number.float",
        ],
        [/\.\d+(?:[eEdDqQ][-+]?\d+)?(?:_\w+)?/, "number.float"],
        [/\d+(?:\.\d*)?[eEdDqQ][-+]?\d+(?:_\w+)?/, "number.float"],
        [/\d+_\w+/, "number"],
        [/\d+/, "number"],

        // Identifiers, keywords, types and intrinsics.
        [
          /[a-zA-Z_]\w*/,
          {
            cases: {
              "@keywords": "keyword",
              "@typeKeywords": "type",
              "@intrinsics": "variable.predefined",
              "@default": "identifier",
            },
          },
        ],

        // Brackets and delimiters.
        [/[()[\]{}]/, "@brackets"],
        [/[,;]/, "delimiter"],
        [/%/, "delimiter"],
        [/&/, "delimiter"],

        // Operators and remaining symbols.
        [
          /@symbols/,
          {
            cases: {
              "@operators": "operator",
              "@default": "delimiter",
            },
          },
        ],

        [/[ \t\r\n]+/, "white"],
      ],

      singleString: [
        [/[^']+/, "string"],
        [/''/, "string.escape"],
        [/'/, "string", "@pop"],
      ],

      doubleString: [
        [/[^"]+/, "string"],
        [/""/, "string.escape"],
        [/"/, "string", "@pop"],
      ],
    },
  });

  // ──────────────────────────────────────────
  // 4. LANGUAGE CONFIGURATION
  // ──────────────────────────────────────────
  const OPEN_KEYWORDS =
    "(?:program|module|submodule|subroutine|function|interface|block|associate|select|enum|critical|do)";

  monaco.languages.setLanguageConfiguration(FORTRAN_LANG_ID, {
    comments: {
      lineComment: "!",
    },
    brackets: [
      ["(", ")"],
      ["[", "]"],
    ],
    autoClosingPairs: [
      { open: "(", close: ")" },
      { open: "[", close: "]" },
      { open: "'", close: "'", notIn: ["string", "comment"] },
      { open: '"', close: '"', notIn: ["string", "comment"] },
    ],
    surroundingPairs: [
      { open: "(", close: ")" },
      { open: "[", close: "]" },
      { open: "'", close: "'" },
      { open: '"', close: '"' },
    ],
    wordPattern:
      /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
    indentationRules: {
      increaseIndentPattern: new RegExp(
        "^\\s*(?:" +
          OPEN_KEYWORDS +
          ")\\b|\\bthen\\s*$|^\\s*type\\b(?!\\s*\\()|^\\s*else\\b|^\\s*case\\b|^\\s*contains\\b",
        "i",
      ),
      decreaseIndentPattern: new RegExp(
        "^\\s*(?:end(?:\\s|$)|else\\b|elseif\\b|case\\b|contains\\b|elsewhere\\b)",
        "i",
      ),
    },
    onEnterRules: [
      {
        beforeText: new RegExp("^\\s*(?:" + OPEN_KEYWORDS + ")\\b|\\bthen\\s*$", "i"),
        action: { indentAction: monaco.languages.IndentAction.Indent },
      },
      {
        beforeText: /^\s*type\b(?!\s*\()/i,
        action: { indentAction: monaco.languages.IndentAction.Indent },
      },
      {
        beforeText: /^\s*(?:else|elseif\b.*then|case\b.*|contains)\s*$/i,
        action: {
          indentAction: monaco.languages.IndentAction.IndentOutdent,
          outdentCurrentLine: false,
        },
      },
      {
        beforeText: /^\s*end(?:\s|$)/i,
        action: { indentAction: monaco.languages.IndentAction.Outdent },
      },
    ],
  });

  // ──────────────────────────────────────────
  // 5. DOCUMENTATION DATABASE
  // ──────────────────────────────────────────
  const KEYWORD_DOCS: Record<string, { detail: string; doc: string }> = {
    program: {
      detail: "keyword",
      doc: "Declares the main program unit.\n\n```fortran\nprogram main\n  implicit none\nend program main\n```",
    },
    end: {
      detail: "keyword",
      doc: "Closes any construct. The form with a keyword (`end if`, `end do`, `end program name`) is preferred, but a bare `end` is allowed.",
    },
    module: {
      detail: "keyword",
      doc: "Declares a module: a collection of declarations, types and procedures.\n\n```fortran\nmodule geometry\n  implicit none\ncontains\nend module geometry\n```",
    },
    submodule: {
      detail: "keyword",
      doc: "Declares a submodule that implements the module procedures of a parent module: `submodule (parent) name`.",
    },
    subroutine: {
      detail: "keyword",
      doc: "Declares a subroutine (a procedure without a return value).\n\n```fortran\nsubroutine greet(name)\n  character(len=*), intent(in) :: name\n  print *, \"Hello, \", name\nend subroutine greet\n```",
    },
    function: {
      detail: "keyword",
      doc: "Declares a function, optionally with a result variable.\n\n```fortran\nfunction square(x) result(y)\n  real, intent(in) :: x\n  real :: y\n  y = x * x\nend function square\n```",
    },
    result: {
      detail: "keyword",
      doc: "Names the variable that holds a function's return value: `function f(x) result(res)`.",
    },
    interface: {
      detail: "keyword",
      doc: "Declares an explicit interface for an external or generic procedure.",
    },
    contains: {
      detail: "keyword",
      doc: "Separates the specification part of a module or procedure from its contained procedures.",
    },
    use: {
      detail: "keyword",
      doc: "Makes the public entities of a module accessible.\n\n```fortran\nuse iso_fortran_env, only: real64\n```",
    },
    only: {
      detail: "keyword",
      doc: "Restricts an `use` clause to the listed names: `use mod, only: a, b`.",
    },
    implicit: {
      detail: "keyword",
      doc: "`implicit none` disables implicit typing and is strongly recommended in every program unit.",
    },
    procedure: {
      detail: "keyword",
      doc: "Declares a dummy procedure argument, a type-bound procedure, or a module procedure in an interface.",
    },
    call: {
      detail: "keyword",
      doc: "Invokes a subroutine: `call greet(\"world\")`.",
    },
    if: {
      detail: "keyword",
      doc: "Conditional construct. Block form ends with `end if`.\n\n```fortran\nif (x > 0) then\n  print *, 'positive'\nelse if (x < 0) then\n  print *, 'negative'\nelse\n  print *, 'zero'\nend if\n```",
    },
    then: {
      detail: "keyword",
      doc: "Ends the condition of a block `if` or `else if` statement.",
    },
    else: { detail: "keyword", doc: "Alternative branch of an `if` construct." },
    elseif: {
      detail: "keyword",
      doc: "Additional condition in an `if` construct (also written `else if`).",
    },
    do: {
      detail: "keyword",
      doc: "Loop construct. Counted, `while`, and infinite forms all end with `end do`.\n\n```fortran\ndo i = 1, n\n  print *, i\nend do\n```",
    },
    while: {
      detail: "keyword",
      doc: "Pre-condition loop: `do while (condition) ... end do`.",
    },
    concurrent: {
      detail: "keyword",
      doc: "`do concurrent` marks a loop whose iterations are independent and may be parallelized.",
    },
    select: {
      detail: "keyword",
      doc: "Multi-way branch: `select case (expr)`, `select type (x)` or `select rank (a)`.",
    },
    case: {
      detail: "keyword",
      doc: "A choice inside `select case`. Use `case default` for the fall-through branch.",
    },
    type: {
      detail: "keyword",
      doc: "Declares a derived type, or introduces a type specifier in a declaration.\n\n```fortran\ntype :: point\n  real :: x, y\nend type point\n```",
    },
    class: {
      detail: "keyword",
      doc: "Declares a polymorphic variable (`class(t)`), or introduces a `select type` branch (`class is (t)`).",
    },
    enum: {
      detail: "keyword",
      doc: "Declares an enumeration interoperable with C: `enum, bind(c)`.",
    },
    intent: {
      detail: "keyword",
      doc: "Declares a dummy argument's direction: `intent(in)`, `intent(out)` or `intent(inout)`.",
    },
    parameter: {
      detail: "keyword",
      doc: "Declares a named constant: `integer, parameter :: n = 10`.",
    },
    dimension: {
      detail: "keyword",
      doc: "Declares an array's bounds, either as an attribute (`real, dimension(3) :: v`) or a statement (`dimension a(10)`).",
    },
    allocatable: {
      detail: "keyword",
      doc: "Marks an array or scalar that can be allocated and deallocated at run time.",
    },
    allocate: {
      detail: "keyword",
      doc: "Allocates an allocatable array or pointer: `allocate(a(n))`.",
    },
    deallocate: {
      detail: "keyword",
      doc: "Frees storage previously obtained with `allocate`.",
    },
    pointer: {
      detail: "keyword",
      doc: "Declares a pointer that can be associated with a target.",
    },
    target: {
      detail: "keyword",
      doc: "Marks an object that may be pointed to by a pointer.",
    },
    associate: {
      detail: "keyword",
      doc: "Introduces a name alias for an expression: `associate (x => a % field) ... end associate`.",
    },
    allocate_error: { detail: "keyword", doc: "Fortran statement." },
    write: {
      detail: "keyword",
      doc: "Formatted or unformatted output: `write (*, *) x` or `write (unit, fmt) list`.",
    },
    read: {
      detail: "keyword",
      doc: "Formatted or unformatted input: `read (*, *) x`.",
    },
    print: {
      detail: "keyword",
      doc: "List-directed output to standard output: `print *, x`.",
    },
    format: {
      detail: "keyword",
      doc: "Defines an edit descriptor used by `write`/`read`, usually with a statement label.",
    },
    open: {
      detail: "keyword",
      doc: "Connects a unit to a file: `open (newunit=u, file='data.txt', status='old')`.",
    },
    close: {
      detail: "keyword",
      doc: "Disconnects a unit from its file.",
    },
    inquire: {
      detail: "keyword",
      doc: "Queries the properties of a unit or file.",
    },
    stop: {
      detail: "keyword",
      doc: "Terminates the program, optionally with a message: `stop 'done'`.",
    },
    return: {
      detail: "keyword",
      doc: "Returns control from a procedure to its caller.",
    },
    cycle: {
      detail: "keyword",
      doc: "Skips to the next iteration of the enclosing loop, optionally naming it: `cycle outer`.",
    },
    exit: {
      detail: "keyword",
      doc: "Leaves the enclosing loop, optionally naming it: `exit outer`.",
    },
    external: {
      detail: "keyword",
      doc: "Declares an external procedure or a dummy procedure argument.",
    },
    intrinsic: {
      detail: "keyword",
      doc: "Declares that a name is one of the intrinsic procedures, e.g. `intrinsic sin`.",
    },
    save: {
      detail: "keyword",
      doc: "Preserves a local variable's value between calls (`save` or `integer, save :: count`).",
    },
    public: {
      detail: "keyword",
      doc: "Marks entities as accessible outside their module.",
    },
    private: {
      detail: "keyword",
      doc: "Marks entities as accessible only within their module.",
    },
    bind: {
      detail: "keyword",
      doc: "The `bind(c)` attribute/statement enables C interoperability for a type, variable or procedure.",
    },
  };

  const TYPE_DOCS: Record<string, string> = {
    integer: "The default signed integer type. Kinds include `int8`, `int16`, `int32` and `int64` from `iso_fortran_env`.",
    real: "The default floating-point type. Use `real(real64)` for a 64-bit kind.",
    complex: "A complex number with real and imaginary parts of the same real kind.",
    logical: "The boolean type whose only values are `.true.` and `.false.`.",
    character: "A character string; `character(len=n)` fixes its length.",
    double: "Start of `double precision` (a real with more precision) or `double complex`.",
    precision: "Part of the `double precision` type specifier.",
    doubleprecision: "`double precision`: a real kind with greater precision than default `real`.",
    doublecomplex: "`double complex`: a complex kind built from the double-precision real kind.",
    byte: "A non-standard kind of integer, often equivalent to `integer(int8)`.",
  };

  const MODULE_DOCS: Record<
    string,
    { doc: string; members: Record<string, string> }
  > = {
    iso_fortran_env: {
      doc: "Intrinsic module defining portable kind parameters, I/O units and error codes.",
      members: {
        int8: "Integer kind parameter for an 8-bit signed integer.",
        int16: "Integer kind parameter for a 16-bit signed integer.",
        int32: "Integer kind parameter for a 32-bit signed integer.",
        int64: "Integer kind parameter for a 64-bit signed integer.",
        real32: "Real kind parameter for a 32-bit floating-point number.",
        real64: "Real kind parameter for a 64-bit floating-point number.",
        real128: "Real kind parameter for a 128-bit floating-point number.",
        input_unit: "The unit number of standard input (usually 5).",
        output_unit: "The unit number of standard output (usually 6).",
        error_unit: "The unit number of standard error (usually 0).",
        int_kinds: "An array of the supported integer kind values.",
        real_kinds: "An array of the supported real kind values.",
        character_kinds: "An array of the supported character kind values.",
        logical_kinds: "An array of the supported logical kind values.",
        iostat_end: "I/O status value indicating end-of-file.",
        iostat_eor: "I/O status value indicating end-of-record.",
        iostat_inquire_internal_unit: "I/O status value for an invalid internal-unit inquiry.",
        file_storage_size: "The size in bits of a file storage unit, usually 8.",
        atomic_int_kind: "Integer kind of the largest atomic integer.",
        atomic_logical_kind: "Kind of the largest atomic logical.",
        compiler_version: "A function returning the compiler version string.",
        compiler_options: "A function returning the compiler options string.",
      },
    },
    iso_c_binding: {
      doc: "Intrinsic module for interoperability with C (types, constants and procedures).",
      members: {
        c_int: "The C `int` type.",
        c_short: "The C `short` type.",
        c_long: "The C `long` type.",
        c_long_long: "The C `long long` type.",
        c_signed_char: "The C `signed char` type.",
        c_size_t: "The C `size_t` type.",
        c_int8_t: "The C `int8_t` type.",
        c_int16_t: "The C `int16_t` type.",
        c_int32_t: "The C `int32_t` type.",
        c_int64_t: "The C `int64_t` type.",
        c_float: "The C `float` type.",
        c_double: "The C `double` type.",
        c_long_double: "The C `long double` type.",
        c_float_complex: "The C `float _Complex` type.",
        c_double_complex: "The C `double _Complex` type.",
        c_char: "The C `char` type.",
        c_bool: "The C `_Bool` type.",
        c_ptr: "A type that can hold a C pointer.",
        c_funptr: "A type that can hold a C function pointer.",
        c_null_ptr: "The C null pointer value.",
        c_null_funptr: "The C null function pointer value.",
        c_null_char: "The C null character `achar(0)`.",
        c_associated: "Tests whether a C pointer is associated with a target.",
        c_loc: "Returns the C address of an interoperable object.",
        c_funloc: "Returns the C address of an interoperable procedure.",
        c_f_pointer: "Converts a C pointer to a Fortran pointer.",
        c_f_procpointer: "Converts a C function pointer to a Fortran procedure pointer.",
        c_sizeof: "Returns the size in bytes of an interoperable object.",
      },
    },
    ieee_arithmetic: {
      doc: "Intrinsic module providing IEEE arithmetic facilities and inquiry functions.",
      members: {
        ieee_value: "Returns an IEEE value such as a quiet NaN or infinity.",
        ieee_is_nan: "True if the argument is a NaN.",
        ieee_is_finite: "True if the argument is finite.",
        ieee_is_normal: "True if the argument is a normalized number.",
        ieee_is_negative: "True if the sign bit of the argument is set.",
        ieee_class: "Classifies the argument (a NaN, infinity, normal, ...).",
        ieee_copy_sign: "Copies the sign of one value onto another.",
        ieee_next_after: "Returns the next representable value in a direction.",
        ieee_rem: "Returns the IEEE remainder of x / y.",
        ieee_logb: "Returns the unbiased exponent of the argument.",
        ieee_rint: "Rounds to an integral value using the current rounding mode.",
        ieee_scalb: "Multiplies the argument by a radix raised to a power.",
        ieee_selected_real_kind: "Selects a real kind satisfying precision and range.",
        ieee_support_datatype: "True if IEEE arithmetic is supported for the type.",
        ieee_support_denormal: "True if denormalized numbers are supported.",
        ieee_support_nan: "True if NaNs are supported.",
        ieee_support_inf: "True if infinities are supported.",
        ieee_support_rounding: "True if the requested rounding mode is supported.",
        ieee_get_rounding_mode: "Returns the current IEEE rounding mode.",
        ieee_set_rounding_mode: "Sets the IEEE rounding mode.",
        ieee_get_flag: "Returns an IEEE exception flag.",
        ieee_set_flag: "Sets an IEEE exception flag.",
        ieee_get_halting_mode: "Returns the IEEE halting mode.",
        ieee_set_halting_mode: "Sets the IEEE halting mode.",
      },
    },
    ieee_exceptions: {
      doc: "Intrinsic module with IEEE exception flag and halting-mode facilities.",
      members: {
        ieee_invalid: "The invalid-operation exception flag.",
        ieee_divide_by_zero: "The divide-by-zero exception flag.",
        ieee_overflow: "The overflow exception flag.",
        ieee_underflow: "The underflow exception flag.",
        ieee_inexact: "The inexact-result exception flag.",
        ieee_all: "All IEEE exception flags together.",
        ieee_get_flag: "Returns the status of an exception flag.",
        ieee_set_flag: "Raises or clears an exception flag.",
        ieee_get_halting_mode: "Returns the halting mode for an exception.",
        ieee_set_halting_mode: "Sets the halting mode for an exception.",
      },
    },
    ieee_features: {
      doc: "Intrinsic module naming IEEE features for use with `ieee_support_*` inquiries.",
      members: {
        ieee_datatype: "The base datatype feature.",
        ieee_denormal: "The denormalized-number feature.",
        ieee_divide: "The divide-by-zero feature.",
        ieee_inf: "The infinity feature.",
        ieee_invalid: "The invalid-operation feature.",
        ieee_nan: "The NaN feature.",
        ieee_rounding: "The rounding-mode feature.",
        ieee_sqrt: "The square-root feature.",
        ieee_underflow: "The underflow feature.",
      },
    },
    omp_lib: {
      doc: "OpenMP runtime library (available when the compiler supports it).",
      members: {
        omp_get_thread_num: "Returns the calling thread's id.",
        omp_get_num_threads: "Returns the number of threads in the current team.",
        omp_get_max_threads: "Returns the maximum number of threads.",
        omp_get_num_procs: "Returns the number of processors available.",
        omp_in_parallel: "True if executing inside a parallel region.",
        omp_set_num_threads: "Sets the number of threads for subsequent regions.",
        omp_get_wtime: "Returns elapsed wall-clock time in seconds.",
        omp_get_wtick: "Returns the resolution of `omp_get_wtime`.",
      },
    },
    openacc: {
      doc: "OpenACC runtime library (available when the compiler supports it).",
      members: {
        acc_get_num_devices: "Returns the number of accelerator devices of a type.",
        acc_set_device_num: "Selects the device of a type for the calling thread.",
        acc_get_device_num: "Returns the device number of a type.",
        acc_async_test: "Tests whether an asynchronous operation has completed.",
        acc_wait: "Waits for asynchronous operations to complete.",
        acc_wait_all: "Waits for all asynchronous operations to complete.",
        acc_get_property: "Returns a device property.",
      },
    },
  };

  const INTRINSIC_DOCS: Record<
    string,
    {
      sig: string;
      doc: string;
      params?: { label: string; doc: string }[];
    }
  > = {
    abs: {
      sig: "RESULT = ABS(A)",
      doc: "Absolute value of an integer, real or complex value.",
      params: [{ label: "A", doc: "The value whose magnitude is returned." }],
    },
    sqrt: {
      sig: "RESULT = SQRT(X)",
      doc: "Square root of a non-negative real or complex value.",
      params: [{ label: "X", doc: "The value to take the square root of." }],
    },
    exp: {
      sig: "RESULT = EXP(X)",
      doc: "Exponential function: e raised to the power X.",
      params: [{ label: "X", doc: "The exponent." }],
    },
    log: {
      sig: "RESULT = LOG(X)",
      doc: "Natural logarithm of a positive real or complex value.",
      params: [{ label: "X", doc: "The value, which must be positive for a real result." }],
    },
    log10: {
      sig: "RESULT = LOG10(X)",
      doc: "Base-10 logarithm of a positive real value.",
      params: [{ label: "X", doc: "The value, which must be positive." }],
    },
    sin: {
      sig: "RESULT = SIN(X)",
      doc: "Sine of an angle in radians.",
      params: [{ label: "X", doc: "The angle in radians." }],
    },
    cos: {
      sig: "RESULT = COS(X)",
      doc: "Cosine of an angle in radians.",
      params: [{ label: "X", doc: "The angle in radians." }],
    },
    tan: {
      sig: "RESULT = TAN(X)",
      doc: "Tangent of an angle in radians.",
      params: [{ label: "X", doc: "The angle in radians." }],
    },
    asin: {
      sig: "RESULT = ASIN(X)",
      doc: "Inverse sine, returning an angle in radians.",
      params: [{ label: "X", doc: "A value in [-1, 1]." }],
    },
    acos: {
      sig: "RESULT = ACOS(X)",
      doc: "Inverse cosine, returning an angle in radians.",
      params: [{ label: "X", doc: "A value in [-1, 1]." }],
    },
    atan: {
      sig: "RESULT = ATAN(X)  |  ATAN(Y, X)",
      doc: "Inverse tangent, or the four-quadrant inverse tangent when given two arguments.",
      params: [
        { label: "Y", doc: "The numerator (two-argument form)." },
        { label: "X", doc: "The argument or denominator." },
      ],
    },
    atan2: {
      sig: "RESULT = ATAN2(Y, X)",
      doc: "Four-quadrant inverse tangent of Y/X, returning an angle in radians.",
      params: [
        { label: "Y", doc: "The numerator." },
        { label: "X", doc: "The denominator." },
      ],
    },
    sinh: {
      sig: "RESULT = SINH(X)",
      doc: "Hyperbolic sine.",
      params: [{ label: "X", doc: "The argument." }],
    },
    cosh: {
      sig: "RESULT = COSH(X)",
      doc: "Hyperbolic cosine.",
      params: [{ label: "X", doc: "The argument." }],
    },
    tanh: {
      sig: "RESULT = TANH(X)",
      doc: "Hyperbolic tangent.",
      params: [{ label: "X", doc: "The argument." }],
    },
    mod: {
      sig: "RESULT = MOD(A, P)",
      doc: "Remainder of A modulo P, with the sign of A.",
      params: [
        { label: "A", doc: "The dividend." },
        { label: "P", doc: "The divisor." },
      ],
    },
    modulo: {
      sig: "RESULT = MODULO(A, P)",
      doc: "Modulo A with respect to P, with the sign of P.",
      params: [
        { label: "A", doc: "The dividend." },
        { label: "P", doc: "The divisor." },
      ],
    },
    max: {
      sig: "RESULT = MAX(A1, A2 [, ...])",
      doc: "Largest of its arguments.",
      params: [{ label: "A1, A2, ...", doc: "The values to compare." }],
    },
    min: {
      sig: "RESULT = MIN(A1, A2 [, ...])",
      doc: "Smallest of its arguments.",
      params: [{ label: "A1, A2, ...", doc: "The values to compare." }],
    },
    real: {
      sig: "RESULT = REAL(A [, KIND])",
      doc: "Converts to a real (or the given real kind).",
      params: [
        { label: "A", doc: "The value to convert." },
        { label: "KIND", doc: "Optional result kind." },
      ],
    },
    int: {
      sig: "RESULT = INT(A [, KIND])",
      doc: "Converts to an integer, truncating towards zero.",
      params: [
        { label: "A", doc: "The value to convert." },
        { label: "KIND", doc: "Optional result kind." },
      ],
    },
    nint: {
      sig: "RESULT = NINT(A [, KIND])",
      doc: "Rounds to the nearest integer.",
      params: [
        { label: "A", doc: "The value to round." },
        { label: "KIND", doc: "Optional result kind." },
      ],
    },
    aint: {
      sig: "RESULT = AINT(A [, KIND])",
      doc: "Truncates a real value to a whole number (towards zero).",
      params: [{ label: "A", doc: "The value to truncate." }],
    },
    anint: {
      sig: "RESULT = ANINT(A [, KIND])",
      doc: "Rounds a real value to the nearest whole number.",
      params: [{ label: "A", doc: "The value to round." }],
    },
    ceiling: {
      sig: "RESULT = CEILING(A [, KIND])",
      doc: "Smallest integer greater than or equal to A.",
      params: [{ label: "A", doc: "The real value." }],
    },
    floor: {
      sig: "RESULT = FLOOR(A [, KIND])",
      doc: "Largest integer less than or equal to A.",
      params: [{ label: "A", doc: "The real value." }],
    },
    cmplx: {
      sig: "RESULT = CMPLX(X [, Y [, KIND]])",
      doc: "Builds a complex value from real and imaginary parts.",
      params: [
        { label: "X", doc: "The real part." },
        { label: "Y", doc: "The imaginary part (default 0)." },
      ],
    },
    aimag: {
      sig: "RESULT = AIMAG(Z)",
      doc: "Imaginary part of a complex value.",
      params: [{ label: "Z", doc: "The complex value." }],
    },
    conjg: {
      sig: "RESULT = CONJG(Z)",
      doc: "Complex conjugate of Z.",
      params: [{ label: "Z", doc: "The complex value." }],
    },
    dble: {
      sig: "RESULT = DBLE(A)",
      doc: "Converts to double precision.",
      params: [{ label: "A", doc: "The value to convert." }],
    },
    sign: {
      sig: "RESULT = SIGN(A, B)",
      doc: "Magnitude of A with the sign of B.",
      params: [
        { label: "A", doc: "The magnitude." },
        { label: "B", doc: "The value whose sign is used." },
      ],
    },
    dim: {
      sig: "RESULT = DIM(X, Y)",
      doc: "Positive difference X - Y when X > Y, otherwise zero.",
      params: [
        { label: "X", doc: "The first value." },
        { label: "Y", doc: "The second value." },
      ],
    },
    hypot: {
      sig: "RESULT = HYPOT(X, Y)",
      doc: "Euclidean distance sqrt(X**2 + Y**2) computed without overflow.",
      params: [
        { label: "X", doc: "The first leg." },
        { label: "Y", doc: "The second leg." },
      ],
    },
    sum: {
      sig: "RESULT = SUM(ARRAY [, MASK])",
      doc: "Sum of all, or of the masked, elements of an array.",
      params: [
        { label: "ARRAY", doc: "The array to reduce." },
        { label: "MASK", doc: "Optional logical mask selecting elements." },
      ],
    },
    product: {
      sig: "RESULT = PRODUCT(ARRAY [, MASK])",
      doc: "Product of all, or of the masked, elements of an array.",
      params: [
        { label: "ARRAY", doc: "The array to reduce." },
        { label: "MASK", doc: "Optional logical mask selecting elements." },
      ],
    },
    maxval: {
      sig: "RESULT = MAXVAL(ARRAY [, MASK])",
      doc: "Maximum value in an array, optionally restricted by a mask.",
      params: [{ label: "ARRAY", doc: "The array to scan." }],
    },
    minval: {
      sig: "RESULT = MINVAL(ARRAY [, MASK])",
      doc: "Minimum value in an array, optionally restricted by a mask.",
      params: [{ label: "ARRAY", doc: "The array to scan." }],
    },
    size: {
      sig: "RESULT = SIZE(ARRAY [, DIM, KIND])",
      doc: "Number of elements in an array, or its extent along one dimension.",
      params: [
        { label: "ARRAY", doc: "The array to measure." },
        { label: "DIM", doc: "Optional dimension whose extent is returned." },
      ],
    },
    shape: {
      sig: "RESULT = SHAPE(SOURCE [, KIND])",
      doc: "The shape of an array as a rank-one integer array.",
      params: [{ label: "SOURCE", doc: "The array whose shape is returned." }],
    },
    lbound: {
      sig: "RESULT = LBOUND(ARRAY [, DIM])",
      doc: "Lower bounds of an array, or of one dimension.",
      params: [{ label: "ARRAY", doc: "The array." }],
    },
    ubound: {
      sig: "RESULT = UBOUND(ARRAY [, DIM])",
      doc: "Upper bounds of an array, or of one dimension.",
      params: [{ label: "ARRAY", doc: "The array." }],
    },
    allocated: {
      sig: "RESULT = ALLOCATED(ARRAY)",
      doc: "True if an allocatable array is allocated.",
      params: [{ label: "ARRAY", doc: "The allocatable array." }],
    },
    present: {
      sig: "RESULT = PRESENT(A)",
      doc: "True if an optional dummy argument is present.",
      params: [{ label: "A", doc: "The optional dummy argument." }],
    },
    associated: {
      sig: "RESULT = ASSOCIATED(POINTER [, TARGET])",
      doc: "True if a pointer is associated, optionally with a specific target.",
      params: [{ label: "POINTER", doc: "The pointer to test." }],
    },
    matmul: {
      sig: "RESULT = MATMUL(MATRIX_A, MATRIX_B)",
      doc: "Matrix product of two arrays.",
      params: [
        { label: "MATRIX_A", doc: "The left matrix." },
        { label: "MATRIX_B", doc: "The right matrix or vector." },
      ],
    },
    dot_product: {
      sig: "RESULT = DOT_PRODUCT(VECTOR_A, VECTOR_B)",
      doc: "Dot product of two rank-one arrays.",
      params: [
        { label: "VECTOR_A", doc: "The first vector." },
        { label: "VECTOR_B", doc: "The second vector." },
      ],
    },
    transpose: {
      sig: "RESULT = TRANSPOSE(MATRIX)",
      doc: "Transpose of a rank-two array.",
      params: [{ label: "MATRIX", doc: "The matrix to transpose." }],
    },
    reshape: {
      sig: "RESULT = RESHAPE(SOURCE, SHAPE [, PAD, ORDER])",
      doc: "Reshapes an array to the given shape.",
      params: [
        { label: "SOURCE", doc: "The source array." },
        { label: "SHAPE", doc: "The desired shape." },
      ],
    },
    all: {
      sig: "RESULT = ALL(MASK [, DIM])",
      doc: "True if all elements of a logical mask are true.",
      params: [{ label: "MASK", doc: "The logical array." }],
    },
    any: {
      sig: "RESULT = ANY(MASK [, DIM])",
      doc: "True if any element of a logical mask is true.",
      params: [{ label: "MASK", doc: "The logical array." }],
    },
    count: {
      sig: "RESULT = COUNT(MASK [, DIM, KIND])",
      doc: "Number of true elements in a logical mask.",
      params: [{ label: "MASK", doc: "The logical array." }],
    },
    maxloc: {
      sig: "RESULT = MAXLOC(ARRAY [, DIM, MASK])",
      doc: "Index of the maximum element of an array.",
      params: [{ label: "ARRAY", doc: "The array to scan." }],
    },
    minloc: {
      sig: "RESULT = MINLOC(ARRAY [, DIM, MASK])",
      doc: "Index of the minimum element of an array.",
      params: [{ label: "ARRAY", doc: "The array to scan." }],
    },
    trim: {
      sig: "RESULT = TRIM(STRING)",
      doc: "Removes trailing blanks from a string.",
      params: [{ label: "STRING", doc: "The string to trim." }],
    },
    len: {
      sig: "RESULT = LEN(STRING [, KIND])",
      doc: "Declared length of a character string.",
      params: [{ label: "STRING", doc: "The string." }],
    },
    len_trim: {
      sig: "RESULT = LEN_TRIM(STRING [, KIND])",
      doc: "Length of a string without trailing blanks.",
      params: [{ label: "STRING", doc: "The string." }],
    },
    index: {
      sig: "RESULT = INDEX(STRING, SUBSTRING [, BACK, KIND])",
      doc: "Position of a substring within a string, or zero if absent.",
      params: [
        { label: "STRING", doc: "The string to search." },
        { label: "SUBSTRING", doc: "The substring to find." },
      ],
    },
    scan: {
      sig: "RESULT = SCAN(STRING, SET [, BACK, KIND])",
      doc: "Position of the first character of STRING that is in SET.",
      params: [
        { label: "STRING", doc: "The string to scan." },
        { label: "SET", doc: "The set of characters to look for." },
      ],
    },
    verify: {
      sig: "RESULT = VERIFY(STRING, SET [, BACK, KIND])",
      doc: "Position of the first character of STRING that is not in SET.",
      params: [
        { label: "STRING", doc: "The string to check." },
        { label: "SET", doc: "The set of allowed characters." },
      ],
    },
    repeat: {
      sig: "RESULT = REPEAT(STRING, NCOPIES)",
      doc: "Concatenates NCOPIES copies of a string.",
      params: [
        { label: "STRING", doc: "The string to repeat." },
        { label: "NCOPIES", doc: "The number of copies." },
      ],
    },
    adjustl: {
      sig: "RESULT = ADJUSTL(STRING)",
      doc: "Left-justifies a string by removing leading blanks.",
      params: [{ label: "STRING", doc: "The string to adjust." }],
    },
    adjustr: {
      sig: "RESULT = ADJUSTR(STRING)",
      doc: "Right-justifies a string by removing trailing blanks.",
      params: [{ label: "STRING", doc: "The string to adjust." }],
    },
    char: {
      sig: "RESULT = CHAR(I [, KIND])",
      doc: "Character in the processor's collating sequence with code I.",
      params: [{ label: "I", doc: "The character code." }],
    },
    achar: {
      sig: "RESULT = ACHAR(I [, KIND])",
      doc: "Character in the ASCII collating sequence with code I.",
      params: [{ label: "I", doc: "The ASCII code." }],
    },
    ichar: {
      sig: "RESULT = ICHAR(C [, KIND])",
      doc: "Code of a character in the processor's collating sequence.",
      params: [{ label: "C", doc: "The character." }],
    },
    iachar: {
      sig: "RESULT = IACHAR(C [, KIND])",
      doc: "ASCII code of a character.",
      params: [{ label: "C", doc: "The character." }],
    },
    kind: {
      sig: "RESULT = KIND(X)",
      doc: "Kind parameter of the argument.",
      params: [{ label: "X", doc: "The value whose kind is returned." }],
    },
    huge: {
      sig: "RESULT = HUGE(X)",
      doc: "Largest value of the kind of X.",
      params: [{ label: "X", doc: "A value of the type of interest." }],
    },
    tiny: {
      sig: "RESULT = TINY(X)",
      doc: "Smallest positive normalized value of the kind of X.",
      params: [{ label: "X", doc: "A value of the type of interest." }],
    },
    epsilon: {
      sig: "RESULT = EPSILON(X)",
      doc: "Machine epsilon: the smallest number that, added to 1, changes it.",
      params: [{ label: "X", doc: "A real value of the kind of interest." }],
    },
    precision: {
      sig: "RESULT = PRECISION(X)",
      doc: "Decimal precision of a real or complex kind.",
      params: [{ label: "X", doc: "A value of the type of interest." }],
    },
    range: {
      sig: "RESULT = RANGE(X)",
      doc: "Decimal exponent range of an integer, real or complex kind.",
      params: [{ label: "X", doc: "A value of the type of interest." }],
    },
    digits: {
      sig: "RESULT = DIGITS(X)",
      doc: "Number of significant digits in the model of the type of X.",
      params: [{ label: "X", doc: "A value of the type of interest." }],
    },
    transfer: {
      sig: "RESULT = TRANSFER(SOURCE, MOLD [, SIZE])",
      doc: "Reinterprets the bit pattern of SOURCE as the type of MOLD.",
      params: [
        { label: "SOURCE", doc: "The value whose bits are transferred." },
        { label: "MOLD", doc: "A value providing the result type." },
      ],
    },
    null: {
      sig: "RESULT = NULL([MOLD])",
      doc: "A disassociated pointer or an unallocated allocatable.",
      params: [{ label: "MOLD", doc: "Optional value providing the result type." }],
    },
    present_optional: { sig: "", doc: "" },
    selected_real_kind: {
      sig: "RESULT = SELECTED_REAL_KIND([P, R, RADIX])",
      doc: "Kind parameter for a real type with at least P digits and exponent range R.",
      params: [
        { label: "P", doc: "Minimum decimal precision." },
        { label: "R", doc: "Minimum decimal exponent range." },
      ],
    },
    selected_int_kind: {
      sig: "RESULT = SELECTED_INT_KIND(R)",
      doc: "Kind parameter for an integer type able to represent values up to 10**R.",
      params: [{ label: "R", doc: "Decimal exponent range required." }],
    },
    selected_char_kind: {
      sig: "RESULT = SELECTED_CHAR_KIND(NAME)",
      doc: "Kind parameter for the named character set, e.g. \"ascii\" or \"iso_10646\".",
      params: [{ label: "NAME", doc: "The character-set name." }],
    },
    random_number: {
      sig: "CALL RANDOM_NUMBER(HARVEST)",
      doc: "Fills an array with pseudo-random real values in [0, 1).",
      params: [{ label: "HARVEST", doc: "The real array to fill." }],
    },
    random_seed: {
      sig: "CALL RANDOM_SEED([SIZE, PUT, GET])",
      doc: "Initializes or queries the pseudo-random number generator.",
      params: [],
    },
    system_clock: {
      sig: "CALL SYSTEM_CLOCK([COUNT, COUNT_RATE, COUNT_MAX])",
      doc: "Returns the processor clock count and its rate.",
      params: [],
    },
    cpu_time: {
      sig: "CALL CPU_TIME(TIME)",
      doc: "Returns processor time in seconds.",
      params: [{ label: "TIME", doc: "The real variable receiving the time." }],
    },
    date_and_time: {
      sig: "CALL DATE_AND_TIME([DATE, TIME, ZONE, VALUES])",
      doc: "Returns the current date and time.",
      params: [],
    },
    move_alloc: {
      sig: "CALL MOVE_ALLOC(FROM, TO)",
      doc: "Moves an allocation from one allocatable variable to another.",
      params: [
        { label: "FROM", doc: "The allocatable source (deallocated on return)." },
        { label: "TO", doc: "The allocatable destination." },
      ],
    },
    command_argument_count: {
      sig: "RESULT = COMMAND_ARGUMENT_COUNT()",
      doc: "Number of command-line arguments passed to the program.",
      params: [],
    },
    get_command_argument: {
      sig: "CALL GET_COMMAND_ARGUMENT(NUMBER [, VALUE, LENGTH, STATUS])",
      doc: "Retrieves a command-line argument.",
      params: [
        { label: "NUMBER", doc: "The argument number (0 is the command name)." },
        { label: "VALUE", doc: "The variable receiving the argument." },
      ],
    },
    get_environment_variable: {
      sig: "CALL GET_ENVIRONMENT_VARIABLE(NAME [, VALUE, LENGTH, STATUS, TRIM_NAME])",
      doc: "Retrieves the value of an environment variable.",
      params: [{ label: "NAME", doc: "The environment variable name." }],
    },
    execute_command_line: {
      sig: "CALL EXECUTE_COMMAND_LINE(COMMAND [, WAIT, EXITSTAT, CMDSTAT, CMDMSG])",
      doc: "Runs a shell command.",
      params: [{ label: "COMMAND", doc: "The command line to execute." }],
    },
    is_iostat_end: {
      sig: "RESULT = IS_IOSTAT_END(I)",
      doc: "True if the I/O status value I indicates end-of-file.",
      params: [{ label: "I", doc: "The I/O status value." }],
    },
    is_iostat_eor: {
      sig: "RESULT = IS_IOSTAT_EOR(I)",
      doc: "True if the I/O status value I indicates end-of-record.",
      params: [{ label: "I", doc: "The I/O status value." }],
    },
    storage_size: {
      sig: "RESULT = STORAGE_SIZE(A [, KIND])",
      doc: "Number of bits used to store the argument.",
      params: [{ label: "A", doc: "The object whose size is returned." }],
    },
    merge: {
      sig: "RESULT = MERGE(TSOURCE, FSOURCE, MASK)",
      doc: "Chooses between two values according to a mask.",
      params: [
        { label: "TSOURCE", doc: "The value used where MASK is true." },
        { label: "FSOURCE", doc: "The value used where MASK is false." },
        { label: "MASK", doc: "The logical selector." },
      ],
    },
    pack: {
      sig: "RESULT = PACK(ARRAY, MASK [, VECTOR])",
      doc: "Packs the elements selected by a mask into a rank-one array.",
      params: [
        { label: "ARRAY", doc: "The source array." },
        { label: "MASK", doc: "The logical mask." },
      ],
    },
    unpack: {
      sig: "RESULT = UNPACK(VECTOR, MASK, FIELD)",
      doc: "Unpacks a rank-one array into a masked array.",
      params: [
        { label: "VECTOR", doc: "The values to place." },
        { label: "MASK", doc: "The logical mask." },
        { label: "FIELD", doc: "The values used where the mask is false." },
      ],
    },
    spread: {
      sig: "RESULT = SPREAD(SOURCE, DIM, NCOPIES)",
      doc: "Replicates an array along a new dimension.",
      params: [
        { label: "SOURCE", doc: "The array to replicate." },
        { label: "DIM", doc: "The dimension along which to replicate." },
        { label: "NCOPIES", doc: "The number of copies." },
      ],
    },
    cshift: {
      sig: "RESULT = CSHIFT(ARRAY, SHIFT [, DIM])",
      doc: "Circularly shifts an array along a dimension.",
      params: [
        { label: "ARRAY", doc: "The array to shift." },
        { label: "SHIFT", doc: "The number of positions to shift." },
      ],
    },
    eoshift: {
      sig: "RESULT = EOSHIFT(ARRAY, SHIFT [, BOUNDARY, DIM])",
      doc: "End-off shifts an array along a dimension.",
      params: [
        { label: "ARRAY", doc: "The array to shift." },
        { label: "SHIFT", doc: "The number of positions to shift." },
      ],
    },
  };

  // ──────────────────────────────────────────
  // 6. SNIPPETS
  // ──────────────────────────────────────────
  const fortranSnippets = [
    {
      label: "program",
      detail: "Main program",
      insertText:
        "program ${1:main}\n  implicit none\n  ${0}\nend program ${1:main}",
      doc: "Creates a main program unit with `implicit none`.",
    },
    {
      label: "module",
      detail: "Module with contains",
      insertText:
        "module ${1:name}\n  implicit none\n  private\n  public :: ${2}\n\ncontains\n\n  ${0}\nend module ${1:name}",
      doc: "Creates a module with default private visibility.",
    },
    {
      label: "submodule",
      detail: "Submodule",
      insertText:
        "submodule (${1:parent}) ${2:name}\n  implicit none\ncontains\n  ${0}\nend submodule ${2:name}",
      doc: "Creates a submodule implementing a parent module's procedures.",
    },
    {
      label: "subroutine",
      detail: "Subroutine",
      insertText:
        "subroutine ${1:name}(${2:args})\n  implicit none\n  ${3:! declarations}\n  ${0}\nend subroutine ${1:name}",
      doc: "Creates a subroutine with an argument list.",
    },
    {
      label: "function",
      detail: "Function with result",
      insertText:
        "function ${1:name}(${2:args}) result(${3:res})\n  implicit none\n  ${4:real} :: ${3:res}\n  ${0}\nend function ${1:name}",
      doc: "Creates a function with a named result variable.",
    },
    {
      label: "program-full",
      detail: "Program with contains",
      insertText:
        "program ${1:main}\n  implicit none\n  ${0}\n\ncontains\n\nend program ${1:main}",
      doc: "Creates a program unit with an empty `contains` section.",
    },
    {
      label: "if",
      detail: "If statement",
      insertText: "if (${1:condition}) then\n  ${0}\nend if",
      doc: "Creates a block `if` statement.",
    },
    {
      label: "ifelse",
      detail: "If / else statement",
      insertText:
        "if (${1:condition}) then\n  ${2}\nelse\n  ${0}\nend if",
      doc: "Creates an `if`/`else` block.",
    },
    {
      label: "ifelseif",
      detail: "If / else if / else statement",
      insertText:
        "if (${1:condition}) then\n  ${2}\nelse if (${3:other}) then\n  ${4}\nelse\n  ${0}\nend if",
      doc: "Creates a multi-branch `if` construct.",
    },
    {
      label: "do",
      detail: "Counted do loop",
      insertText: "do ${1:i} = ${2:1}, ${3:n}\n  ${0}\nend do",
      doc: "Creates a counted `do` loop.",
    },
    {
      label: "dowhile",
      detail: "Do while loop",
      insertText: "do while (${1:condition})\n  ${0}\nend do",
      doc: "Creates a `do while` loop.",
    },
    {
      label: "doconcurrent",
      detail: "Do concurrent loop",
      insertText: "do concurrent (${1:i} = ${2:1}:${3:n})\n  ${0}\nend do",
      doc: "Creates a `do concurrent` loop.",
    },
    {
      label: "select",
      detail: "Select case",
      insertText:
        "select case (${1:expression})\ncase (${2:value})\n  ${3}\ncase default\n  ${0}\nend select",
      doc: "Creates a `select case` construct.",
    },
    {
      label: "type",
      detail: "Derived type",
      insertText:
        "type :: ${1:name}\n  ${2:real} :: ${3:field}\n  ${0}\nend type ${1:name}",
      doc: "Creates a derived type definition.",
    },
    {
      label: "type-bind",
      detail: "Derived type with type-bound procedures",
      insertText:
        "type, public :: ${1:name}\n  ${2:real} :: ${3:field}\ncontains\n  procedure :: ${4:method}\nend type ${1:name}",
      doc: "Creates a derived type with a type-bound procedure binding.",
    },
    {
      label: "interface",
      detail: "Explicit interface",
      insertText:
        "interface\n  subroutine ${1:name}(${2:args})\n    ${0}\n  end subroutine ${1:name}\nend interface",
      doc: "Creates an explicit interface block.",
    },
    {
      label: "abstract-interface",
      detail: "Abstract interface",
      insertText:
        "abstract interface\n  function ${1:name}(${2:args}) result(${3:res})\n    ${4}\n  end function ${1:name}\nend interface",
      doc: "Creates an abstract interface for a procedure dummy argument.",
    },
    {
      label: "allocate",
      detail: "Allocate an array",
      insertText: "allocate(${1:array}(${2:n}))",
      doc: "Allocates an allocatable array.",
    },
    {
      label: "print",
      detail: "Print statement",
      insertText: "print *, ${0}",
      doc: "List-directed output to standard output.",
    },
    {
      label: "write",
      detail: "Write statement",
      insertText: "write (*, '(${1:A})') ${0}",
      doc: "Formatted output using an inline format.",
    },
    {
      label: "read",
      detail: "Read statement",
      insertText: "read (*, *) ${0}",
      doc: "List-directed input from standard input.",
    },
    {
      label: "format",
      detail: "Format statement",
      insertText: "${1:100} format(${2:*(A,I0)})",
      doc: "Defines a labeled format for formatted I/O.",
    },
    {
      label: "intent",
      detail: "Dummy argument declaration",
      insertText: "${1:real}, intent(${2:in}) :: ${0:arg}",
      doc: "Declares a dummy argument with an intent.",
    },
    {
      label: "program-template",
      detail: "Hello world program",
      insertText:
        'program ${1:main}\n  implicit none\n\n  print *, "${0:Hello, Fortran!}"\nend program ${1:main}',
      doc: "A complete Fortran program that prints a greeting.",
    },
    {
      label: "use",
      detail: "Use an intrinsic module",
      insertText: "use ${1:iso_fortran_env}, only: ${0:real64}",
      doc: "Imports selected names from an intrinsic module.",
    },
    {
      label: "implicit-none",
      detail: "Implicit none",
      insertText: "implicit none",
      doc: "Disables implicit typing for the current program unit.",
    },
    {
      label: "region",
      detail: "Foldable region",
      insertText: "! region ${1:name}\n${0}\n! endregion",
      doc: "A comment-delimited region that can be folded.",
    },
  ];

  // ──────────────────────────────────────────
  // 7. DECLARATION PARSING
  // ──────────────────────────────────────────
  type Decl = {
    names: string[];
    spec: string;
    typeName: string | null;
    isParam: boolean;
    line: number;
  };

  const INTRINSIC_TYPE =
    /(double\s+precision|double\s+complex|integer|real|complex|logical|character|byte)/i;

  const DECL_RE =
    /^(?:(double\s+precision|double\s+complex|integer|real|complex|logical|character|byte)(\s*(?:\([^)]*\)|\*\s*\d+))?|type\s*\(([^)]*)\)|class\s*\(([^)]*)\)|procedure\s*\(([^)]*)\))\s*(?:,\s*([^:]*?))?\s*(::)?\s*(.*)$/i;

  const splitTopLevel = (text: string): string[] => {
    const parts: string[] = [];
    let depth = 0;
    let inString: string | null = null;
    let current = "";
    for (const ch of text) {
      if (inString) {
        current += ch;
        if (ch === inString) inString = null;
        continue;
      }
      if (ch === "'" || ch === '"') {
        inString = ch;
        current += ch;
      } else if ("([".includes(ch)) {
        depth++;
        current += ch;
      } else if (")]".includes(ch)) {
        depth = Math.max(0, depth - 1);
        current += ch;
      } else if (ch === "," && depth === 0) {
        parts.push(current);
        current = "";
      } else {
        current += ch;
      }
    }
    if (current.trim() !== "") parts.push(current);
    return parts;
  };

  const namesFromList = (list: string): string[] => {
    const names: string[] = [];
    splitTopLevel(list).forEach((raw) => {
      const item = raw.trim();
      if (!item || item.startsWith("/")) return;
      const m = /^([A-Za-z_]\w*)/.exec(item);
      if (m) names.push(m[1]);
    });
    return names;
  };

  const stripLabel = (line: string) => line.replace(/^\s*\d+\s+/, "");

  const extractDecl = (rawLine: string): Decl | null => {
    const code = stripLabel(rawLine.replace(/!.*$/, "").trim());
    if (!code) return null;

    const m = DECL_RE.exec(code);
    if (m) {
      const intrin = m[1];
      const typeName = m[3] || m[4] || null;
      const attrs = m[6] || "";
      const hasScope = !!m[7];
      const rest = (m[8] || "").trim();

      if (/^(?:function|subroutine|module|program|interface)\b/i.test(rest)) {
        return null;
      }

      let spec = "";
      if (intrin) spec = `${intrin}${m[2] || ""}`;
      else if (typeName !== null) spec = `${m[3] ? "type" : m[4] ? "class" : "procedure"}(${typeName})`;

      const names = namesFromList(rest);
      if (names.length === 0 && !hasScope) return null;
      if (names.length === 0) return null;

      return {
        names,
        spec: spec.trim(),
        typeName: typeName ? typeName.toLowerCase() : null,
        isParam: /\bparameter\b/i.test(attrs),
        line: 0,
      };
    }

    // Attribute-only declaration statements.
    let am = /^dimension\s+(.*)$/i.exec(code);
    if (am) {
      return {
        names: namesFromList(am[1]),
        spec: "dimension",
        typeName: null,
        isParam: false,
        line: 0,
      };
    }
    am = /^parameter\s*\((.*)\)\s*$/i.exec(code);
    if (am) {
      const names = splitTopLevel(am[1])
        .map((p) => (/^\s*([A-Za-z_]\w*)\s*=/.exec(p) || [])[1])
        .filter((n): n is string => !!n);
      return { names, spec: "parameter", typeName: null, isParam: true, line: 0 };
    }
    am = /^(?:external|intrinsic)\s+(.*)$/i.exec(code);
    if (am) {
      return {
        names: namesFromList(am[1]),
        spec: "procedure",
        typeName: null,
        isParam: false,
        line: 0,
      };
    }

    return null;
  };

  // ──────────────────────────────────────────
  // 8. SYMBOL INDEX & DERIVED TYPES
  // ──────────────────────────────────────────
  type FortranSymbol = {
    name: string;
    kind:
      | "program"
      | "module"
      | "submodule"
      | "subroutine"
      | "function"
      | "interface"
      | "type"
      | "enum"
      | "variable"
      | "parameter"
      | "component";
    line: number;
    column: number;
    endColumn: number;
    detail: string;
  };

  const parseSymbols = (model: Monaco.editor.ITextModel): FortranSymbol[] => {
    const lines = model.getLinesContent();
    const symbols: FortranSymbol[] = [];
    const seen = new Set<string>();

    const add = (
      name: string,
      kind: FortranSymbol["kind"],
      i: number,
      column: number,
      detail: string,
    ) => {
      if (!name) return;
      symbols.push({
        name,
        kind,
        line: i + 1,
        column,
        endColumn: column + name.length,
        detail,
      });
    };

    for (let i = 0; i < lines.length; i++) {
      const code = stripLabel(lines[i].replace(/!.*$/, "")).trim();
      if (!code) continue;

      let m: RegExpExecArray | null;

      m = /^program\s+([A-Za-z_]\w*)/i.exec(code);
      if (m) {
        add(m[1], "program", i, lines[i].indexOf(m[1]) + 1, code);
        continue;
      }

      m = /^submodule\s*\(([^)]*)\)\s*([A-Za-z_]\w*)/i.exec(code);
      if (m) {
        add(m[2], "submodule", i, lines[i].indexOf(m[2]) + 1, code);
        continue;
      }

      m = /^module\s+(?!procedure\b|function\b|subroutine\b)([A-Za-z_]\w*)/i.exec(code);
      if (m) {
        add(m[1], "module", i, lines[i].indexOf(m[1]) + 1, code);
        continue;
      }

      m = /\b(subroutine|function)\s+([A-Za-z_]\w*)/i.exec(code);
      if (m && !/^\s*end\b/i.test(code)) {
        const kind = m[1].toLowerCase() === "function" ? "function" : "subroutine";
        add(m[2], kind as FortranSymbol["kind"], i, lines[i].indexOf(m[2]) + 1, code);
      }

      m = /^(?:abstract\s+)?interface\b\s*([A-Za-z_]\w*)?/i.exec(code);
      if (m) {
        const name = m[1] || "(interface)";
        add(name, "interface", i, lines[i].indexOf(name) + 1 || 1, code);
        continue;
      }

      m = /^enum\b/i.exec(code);
      if (m) {
        add("(enum)", "enum", i, lines[i].indexOf("enum") + 1, code);
        continue;
      }

      const tm =
        /^(?:type|class)\s*(?:,\s*[^:]*)?::\s*([A-Za-z_]\w*)/i.exec(code) ||
        /^type\s+([A-Za-z_]\w*)\s*$/i.exec(code);
      if (tm) {
        add(tm[1], "type", i, lines[i].indexOf(tm[1]) + 1, code);
        continue;
      }

      const decl = extractDecl(lines[i]);
      if (decl) {
        decl.names.forEach((name) => {
          const key = `var:${name.toLowerCase()}`;
          if (seen.has(key)) return;
          seen.add(key);
          add(
            name,
            decl.isParam ? "parameter" : "variable",
            i,
            lines[i].indexOf(name) + 1,
            `${name} :: ${decl.spec}`,
          );
        });
      }
    }

    return symbols;
  };

  type DerivedType = {
    name: string;
    line: number;
    components: { name: string; spec: string; line: number }[];
  };

  const parseDerivedTypes = (
    model: Monaco.editor.ITextModel,
  ): Record<string, DerivedType> => {
    const lines = model.getLinesContent();
    const types: Record<string, DerivedType> = {};
    let current: DerivedType | null = null;

    for (let i = 0; i < lines.length; i++) {
      const code = stripLabel(lines[i].replace(/!.*$/, "")).trim();
      if (!code) continue;

      const tm =
        /^(?:type|class)\s*(?:,\s*[^:]*)?::\s*([A-Za-z_]\w*)/i.exec(code) ||
        /^type\s+([A-Za-z_]\w*)\s*$/i.exec(code);
      if (tm && !/^end\b/i.test(code)) {
        current = { name: tm[1], line: i + 1, components: [] };
        types[tm[1].toLowerCase()] = current;
        continue;
      }

      if (!current) continue;

      if (/^end\s*(?:type)?\b/i.test(code) || /^end\b/i.test(code)) {
        current = null;
        continue;
      }

      // Type-bound procedure bindings.
      const bm = /^procedure\b[^:]*::\s*([A-Za-z_]\w*)/i.exec(code);
      if (bm) {
        current.components.push({
          name: bm[1],
          spec: "type-bound procedure",
          line: i + 1,
        });
        continue;
      }

      const decl = extractDecl(lines[i]);
      if (decl) {
        decl.names.forEach((name) =>
          current!.components.push({ name, spec: decl.spec, line: i + 1 }),
        );
      }
    }

    return types;
  };

  const buildVariableTypes = (
    model: Monaco.editor.ITextModel,
  ): Record<string, string> => {
    const lines = model.getLinesContent();
    const map: Record<string, string> = {};
    for (let i = 0; i < lines.length; i++) {
      const decl = extractDecl(lines[i]);
      if (!decl || !decl.typeName) continue;
      decl.names.forEach((name) => {
        const key = name.toLowerCase();
        if (!map[key]) map[key] = decl.typeName!;
      });
    }
    return map;
  };

  // ──────────────────────────────────────────
  // 9. SCOPE RESOLUTION
  // ──────────────────────────────────────────
  // Fortran scopes: program units and constructs opened by keywords and closed
  // by `end [keyword]`. Object declarations bind a name to the innermost
  // enclosing scope; parameters and result variables bind to their subprogram.
  const resolveBinding = (
    model: Monaco.editor.ITextModel,
    position: Monaco.Position,
  ) => {
    const word = model.getWordAtPosition(position);
    if (!word) return null;
    const name = word.word;
    const lower = name.toLowerCase();

    const lines = model.getLinesContent();
    const lineStart: number[] = [];
    let size = 0;
    for (let i = 0; i < lines.length; i++) {
      lineStart.push(size);
      size += lines[i].length + 1;
    }
    const at = (line: number, col: number) => lineStart[line] + col;
    const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const strip = (l: string) => stripLabel(l.replace(/!.*$/, "")).trim();

    const isCloser = (code: string) =>
      /^end\b/i.test(code) ||
      /^end(?:if|do|select|where|forall|type|interface|module|submodule|program|subroutine|function|block|associate|critical|enum)\b/i.test(
        code,
      );

    const isOpener = (code: string) => {
      if (
        /^(?:program|module|submodule|subroutine|interface|block|associate|select|enum|critical)\b/i.test(
          code,
        ) &&
        !/^module\s+(?:procedure\b|function\b|subroutine\b)/i.test(code)
      )
        return true;
      if (/\bsubroutine\s+[A-Za-z_]\w*/i.test(code)) return true;
      if (/\bfunction\s+[A-Za-z_]\w*/i.test(code)) return true;
      if (/^(?:abstract\s+)?interface\b/i.test(code)) return true;
      if (/^type\b(?!\s*(?:is\b|\())/i.test(code)) return true;
      if (/^do\b/i.test(code)) return true;
      if (/\bthen\s*$/i.test(code)) return true;
      if (/^where\s*\([^)]*\)\s*$/i.test(code)) return true;
      if (/^forall\s*\([^)]*\)\s*$/i.test(code)) return true;
      return false;
    };

    type Scope = { start: number; end: number; line: number; names: Set<string> };
    const scopes: Scope[] = [];
    const open: Scope[] = [];

    for (let i = 0; i < lines.length; i++) {
      const code = strip(lines[i]);
      if (!code) continue;
      if (isCloser(code)) {
        const scope = open.pop();
        if (scope) scope.end = at(i, 0);
      }
      if (!isCloser(code) && isOpener(code)) {
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
          scope.names.has(lower)
        ) {
          if (!found || scope.start > found.start) found = scope;
        }
      }
      return found;
    };

    // Declarations from object statements.
    for (let i = 0; i < lines.length; i++) {
      const decl = extractDecl(lines[i]);
      if (!decl) continue;
      const match = new RegExp("\\b" + esc(name) + "\\b", "i");
      if (!match.test(lines[i])) continue;
      const owner = enclosing(at(i, 0));
      if (owner) owner.names.add(lower);
    }

    // Subprogram parameters and result variables.
    for (let i = 0; i < lines.length; i++) {
      const code = strip(lines[i]);
      const sm = /\b(subroutine|function)\s+([A-Za-z_]\w*)\s*\(([^)]*)\)/i.exec(code);
      if (!sm) continue;
      const header = lines[i];
      const scope = enclosing(at(i, header.search(new RegExp("\\b" + sm[1], "i"))));
      if (!scope) continue;
      const params = splitTopLevel(sm[3])
        .map((p) => (/^\s*([A-Za-z_]\w*)/.exec(p) || [])[1])
        .filter((n): n is string => !!n && n.toLowerCase() === lower);
      if (params.length > 0) scope.names.add(lower);
      const rm = /result\s*\(\s*([A-Za-z_]\w*)\s*\)/i.exec(code);
      if (rm && rm[1].toLowerCase() === lower) scope.names.add(lower);
    }

    // Loop variables, associate names and select-type associates.
    for (let i = 0; i < lines.length; i++) {
      const code = strip(lines[i]);
      const lm =
        /^do\s+(?:concurrent\s*\(\s*)?([A-Za-z_]\w*)\s*=/i.exec(code) ||
        /^do\s+\d+\s+([A-Za-z_]\w*)\s*=/i.exec(code);
      if (lm && lm[1].toLowerCase() === lower) {
        const scope = enclosing(at(i, 0));
        if (scope) scope.names.add(lower);
      }
      const am = /^associate\s*\(([^)]*)\)/i.exec(code);
      if (am) {
        const scope = enclosing(at(i, 0));
        splitTopLevel(am[1]).forEach((p) => {
          const n = (/^\s*([A-Za-z_]\w*)/.exec(p) || [])[1];
          if (n && n.toLowerCase() === lower && scope) scope.names.add(lower);
        });
      }
    }

    type Occurrence = { line: number; startColumn: number; endColumn: number };
    const occurrence = new RegExp("\\b" + esc(name) + "\\b", "gi");
    const occurrences: Occurrence[] = [];
    let declarationRange: Occurrence | null = null;

    // The declaration occurrence is the first occurrence inside a scope that
    // has a declaration statement for the name.
    let declaredAt: { line: number; start: number; end: number } | null = null;
    for (let i = 0; i < lines.length && !declaredAt; i++) {
      const decl = extractDecl(lines[i]);
      if (!decl) continue;
      occurrence.lastIndex = 0;
      let dm: RegExpExecArray | null;
      while ((dm = occurrence.exec(lines[i])) !== null) {
        const start = at(i, dm.index);
        const scope = enclosing(start);
        if (!scope || !scope.names.has(lower)) continue;
        declaredAt = { line: i + 1, start, end: start + name.length };
        break;
      }
    }
    occurrence.lastIndex = 0;

    const cursorLine = position.lineNumber - 1;
    const cursorScope = declaring(at(cursorLine, word.startColumn - 1));
    const targetStart = cursorScope ? cursorScope.start : -1;

    if (targetStart !== -1) {
      for (let i = 0; i < lines.length; i++) {
        occurrence.lastIndex = 0;
        let m: RegExpExecArray | null;
        while ((m = occurrence.exec(lines[i])) !== null) {
          const start = at(i, m.index);
          const end = start + name.length;
          const scope = enclosing(start);
          if ((scope ? scope.start : -1) !== targetStart) continue;
          // Skip component access (`obj%name`) and imported module members.
          const before = lines[i].slice(0, m.index).replace(/\s+$/, "");
          if (before.endsWith("%") || before.endsWith(".")) continue;
          const range: Occurrence = {
            line: i + 1,
            startColumn: m.index + 1,
            endColumn: m.index + 1 + name.length,
          };
          occurrences.push(range);
          if (
            declaredAt &&
            i + 1 === declaredAt.line &&
            m.index === declaredAt.start - (lineStart[i] || 0)
          ) {
            declarationRange = range;
          }
        }
      }
    }

    return {
      name,
      local: targetStart !== -1,
      declaration: declarationRange,
      occurrences,
    };
  };

  const computeOccurrences = (
    model: Monaco.editor.ITextModel,
    name: string,
  ): { line: number; startColumn: number; endColumn: number }[] => {
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
  };

  const isReserved = (word: string) => {
    const key = word.toLowerCase();
    return (
      FORTRAN_KEYWORDS.includes(key) ||
      FORTRAN_TYPES.includes(key) ||
      FORTRAN_INTRINSICS.includes(key)
    );
  };

  // ──────────────────────────────────────────
  // 10. COMPLETION PROVIDER
  // ──────────────────────────────────────────
  const CIK = monaco.languages.CompletionItemKind;
  const InsertAsSnippet =
    monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet;

  const ATTRIBUTES: { label: string; doc: string }[] = [
    { label: "intent(in)", doc: "The dummy argument is read-only." },
    { label: "intent(out)", doc: "The dummy argument is write-only." },
    { label: "intent(inout)", doc: "The dummy argument is read and written." },
    { label: "parameter", doc: "Declares a named constant." },
    { label: "dimension", doc: "Declares array bounds." },
    { label: "allocatable", doc: "The object is allocatable." },
    { label: "pointer", doc: "The object is a pointer." },
    { label: "target", doc: "The object may be pointed to." },
    { label: "optional", doc: "The dummy argument may be omitted." },
    { label: "save", doc: "Preserves the value between calls." },
    { label: "public", doc: "Accessible outside the module." },
    { label: "private", doc: "Accessible only inside the module." },
    { label: "protected", doc: "Readable but not writable outside the module." },
    { label: "value", doc: "The dummy argument is passed by value." },
    { label: "contiguous", doc: "The array is contiguous in memory." },
    { label: "codimension", doc: "Declares coarray codimensions." },
    { label: "bind(c)", doc: "Enables C interoperability." },
    { label: "volatile", doc: "The value may change asynchronously." },
    { label: "asynchronous", doc: "The variable may be used asynchronously." },
    { label: "external", doc: "Declares an external procedure." },
    { label: "intrinsic", doc: "Declares an intrinsic procedure." },
  ];

  monaco.languages.registerCompletionItemProvider(FORTRAN_LANG_ID, {
    triggerCharacters: ["%", ".", "(", ","],
    provideCompletionItems: (model, position) => {
      const textUntil = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });
      const trimmed = textUntil.trimStart();
      if (
        trimmed.startsWith("!") ||
        /^\*/.test(textUntil)
      ) {
        return { suggestions: [] };
      }

      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };
      const suggestions: Monaco.languages.CompletionItem[] = [];

      // ── Derived-type component access: obj%component ──
      const componentMatch = /([A-Za-z_]\w*)\s*%\s*(\w*)$/.exec(textUntil);
      if (componentMatch) {
        const compRange = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: position.column - componentMatch[2].length,
          endColumn: position.column,
        };
        const varTypes = buildVariableTypes(model);
        const types = parseDerivedTypes(model);
        const typeName = varTypes[componentMatch[1].toLowerCase()];
        const components = typeName
          ? types[typeName]?.components || []
          : Object.values(types).flatMap((t) => t.components);
        components.forEach((c) => {
          suggestions.push({
            label: c.name,
            kind: CIK.Property,
            detail: c.spec,
            documentation: {
              value: `\`${componentMatch[1]}%${c.name}\` — ${c.spec}`,
            },
            insertText: c.name,
            range: compRange,
            sortText: "0_" + c.name,
          });
        });
        return { suggestions };
      }

      // ── intent(...) completion ──
      const intentMatch = /intent\s*\(\s*(\w*)$/i.exec(textUntil);
      if (intentMatch) {
        const iRange = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: position.column - intentMatch[1].length,
          endColumn: position.column,
        };
        ["in", "out", "inout"].forEach((it) => {
          suggestions.push({
            label: it,
            kind: CIK.Keyword,
            detail: "intent",
            insertText: it,
            range: iRange,
            sortText: "0_" + it,
          });
        });
        return { suggestions };
      }

      // ── Attribute completion in a declaration (before `::`) ──
      if (
        /^\s*(?:integer|real|complex|logical|character|byte|double\s+precision|type\s*\([^)]*\)|class\s*\([^)]*\)|procedure\s*\([^)]*\))\s*,[^:]*$/i.test(
          textUntil,
        )
      ) {
        const afterComma = /,\s*([\w()=]*)$/.exec(textUntil);
        const aRange = afterComma
          ? {
              startLineNumber: position.lineNumber,
              endLineNumber: position.lineNumber,
              startColumn: position.column - afterComma[1].length,
              endColumn: position.column,
            }
          : range;
        ATTRIBUTES.forEach((a) => {
          suggestions.push({
            label: a.label,
            kind: CIK.Property,
            detail: "attribute",
            documentation: { value: a.doc },
            insertText: a.label,
            range: aRange,
            sortText: "0_" + a.label,
          });
        });
        return { suggestions };
      }

      // ── `use module, only: members` completion ──
      const useOnly = /^\s*use\s+([A-Za-z_]\w*)\s*,\s*only\s*:\s*([\w\s,]*)$/i.exec(
        textUntil,
      );
      if (useOnly) {
        const mod = MODULE_DOCS[useOnly[1].toLowerCase()];
        if (mod) {
          const partial = (useOnly[2].split(",").pop() || "").trim();
          const mRange = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: position.column - partial.length,
            endColumn: position.column,
          };
          Object.entries(mod.members).forEach(([member, doc]) => {
            suggestions.push({
              label: member,
              kind: CIK.Property,
              detail: useOnly[1] + " member",
              documentation: { value: doc },
              insertText: member,
              range: mRange,
              sortText: "0_" + member,
            });
          });
        }
        return { suggestions };
      }

      // ── `use ` completion for intrinsic modules ──
      const useMatch = /^\s*use\s+([\w]*)$/i.exec(textUntil);
      if (useMatch) {
        const uRange = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: position.column - useMatch[1].length,
          endColumn: position.column,
        };
        Object.entries(MODULE_DOCS).forEach(([name, info]) => {
          suggestions.push({
            label: name,
            kind: CIK.Module,
            detail: "intrinsic module",
            documentation: { value: info.doc },
            insertText: name,
            range: uRange,
            sortText: "0_" + name,
          });
        });
        return { suggestions };
      }

      // ── User-defined symbols ──
      const symbols = parseSymbols(model);
      const seen = new Set<string>();
      const callContext = /^\s*(?:call\s+)?\w*$/i.test(trimmed)
        ? /\bcall\s+\w*$/i.test(textUntil)
        : false;
      symbols.forEach((sym) => {
        const key = sym.name.toLowerCase();
        if (seen.has(key)) return;
        seen.add(key);
        let kind: Monaco.languages.CompletionItemKind = CIK.Variable;
        switch (sym.kind) {
          case "program":
            kind = CIK.Module;
            break;
          case "module":
          case "submodule":
            kind = CIK.Module;
            break;
          case "subroutine":
            kind = CIK.Method;
            break;
          case "function":
            kind = CIK.Function;
            break;
          case "interface":
            kind = CIK.Interface;
            break;
          case "type":
            kind = CIK.Struct;
            break;
          case "enum":
            kind = CIK.Enum;
            break;
          case "parameter":
            kind = CIK.Constant;
            break;
          case "component":
            kind = CIK.Property;
            break;
          default:
            kind = CIK.Variable;
        }
        const callable =
          sym.kind === "subroutine" || sym.kind === "function";
        suggestions.push({
          label: sym.name,
          kind,
          detail: sym.kind + " (user-defined)",
          documentation: {
            value: "```fortran\n" + sym.detail + "\n```\n_Defined at line " + sym.line + "_",
          },
          insertText: callable
            ? sym.kind === "subroutine" && callContext
              ? sym.name + " ($0)"
              : sym.name + "($0)"
            : sym.name,
          insertTextRules: callable ? InsertAsSnippet : undefined,
          range,
          sortText: "1_" + sym.name,
        });
      });

      // ── Snippets ──
      fortranSnippets.forEach((s) => {
        suggestions.push({
          label: s.label,
          kind: CIK.Snippet,
          detail: "Snippet: " + s.detail,
          documentation: { value: s.doc },
          insertText: s.insertText,
          insertTextRules: InsertAsSnippet,
          range,
          sortText: "2_" + s.label,
        });
      });

      // ── Keywords ──
      FORTRAN_KEYWORDS.forEach((kw) => {
        const info = KEYWORD_DOCS[kw];
        suggestions.push({
          label: kw,
          kind: CIK.Keyword,
          detail: info ? info.detail : "keyword",
          documentation: info ? { value: info.doc } : undefined,
          insertText: kw,
          range,
          sortText: "3_" + kw,
        });
      });

      // ── Types ──
      FORTRAN_TYPES.forEach((t) => {
        suggestions.push({
          label: t,
          kind: CIK.Class,
          detail: "type",
          documentation: { value: TYPE_DOCS[t] || `Fortran type \`${t}\`.` },
          insertText: t,
          range,
          sortText: "4_" + t,
        });
      });

      // ── Intrinsics ──
      FORTRAN_INTRINSICS.forEach((fn) => {
        const info = INTRINSIC_DOCS[fn];
        suggestions.push({
          label: fn,
          kind: CIK.Function,
          detail: info ? info.sig : "intrinsic procedure",
          documentation: info ? { value: info.doc } : undefined,
          insertText: info ? fn + "($0)" : fn,
          insertTextRules: info ? InsertAsSnippet : undefined,
          range,
          sortText: "5_" + fn,
        });
      });

      // ── Intrinsic modules ──
      Object.entries(MODULE_DOCS).forEach(([mod, info]) => {
        suggestions.push({
          label: mod,
          kind: CIK.Module,
          detail: "intrinsic module",
          documentation: { value: info.doc },
          insertText: mod,
          range,
          sortText: "6_" + mod,
        });
      });

      return { suggestions };
    },
  });

  // ──────────────────────────────────────────
  // 11. HOVER PROVIDER
  // ──────────────────────────────────────────
  monaco.languages.registerHoverProvider(FORTRAN_LANG_ID, {
    provideHover: (model, position) => {
      const word = model.getWordAtPosition(position);
      if (!word) return null;

      const name = word.word;
      const key = name.toLowerCase();
      const line = model.getLineContent(position.lineNumber);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };

      // Logical operator/literal hover (e.g. `.and.`, `.true.`).
      const before = line[word.startColumn - 2];
      const after = line[word.endColumn - 1];
      if (before === "." && after === ".") {
        const op = "." + key + ".";
        const OPS: Record<string, string> = {
          ".and.": "Logical conjunction (both operands must be `.true.`).",
          ".or.": "Logical disjunction (either operand may be `.true.`).",
          ".not.": "Logical negation.",
          ".eqv.": "Logical equivalence (true when the operands agree).",
          ".neqv.": "Logical non-equivalence (exclusive or).",
          ".eq.": "Equality relational operator (equivalent to `==`).",
          ".ne.": "Inequality relational operator (equivalent to `/=`).",
          ".lt.": "Less-than relational operator (equivalent to `<`).",
          ".le.": "Less-than-or-equal relational operator (equivalent to `<=`).",
          ".gt.": "Greater-than relational operator (equivalent to `>`).",
          ".ge.": "Greater-than-or-equal relational operator (equivalent to `>=`).",
          ".true.": "The true value of type `logical`.",
          ".false.": "The false value of type `logical`.",
        };
        if (OPS[op]) {
          return {
            range,
            contents: [
              { value: "```fortran\n" + op + "\n```" },
              { value: OPS[op] },
            ],
          };
        }
      }

      // Intrinsics.
      const intr = INTRINSIC_DOCS[key];
      if (intr) {
        return {
          range,
          contents: [
            { value: "```fortran\n" + intr.sig + "\n```" },
            { value: intr.doc },
            { value: "_Intrinsic procedure_" },
          ],
        };
      }
      if (FORTRAN_INTRINSICS.includes(key)) {
        return {
          range,
          contents: [
            { value: "```fortran\n" + name.toUpperCase() + "\n```" },
            { value: "Fortran intrinsic procedure." },
          ],
        };
      }

      // Keywords.
      if (KEYWORD_DOCS[key]) {
        const info = KEYWORD_DOCS[key];
        return {
          range,
          contents: [
            { value: "**" + info.detail + "** `" + name + "`" },
            { value: info.doc },
          ],
        };
      }

      // Types.
      if (FORTRAN_TYPES.includes(key)) {
        return {
          range,
          contents: [
            { value: "```fortran\n" + key + "\n```" },
            { value: TYPE_DOCS[key] || `Fortran type \`${key}\`.` },
          ],
        };
      }

      // Intrinsic modules.
      if (MODULE_DOCS[key]) {
        const info = MODULE_DOCS[key];
        return {
          range,
          contents: [
            { value: "```fortran\nuse " + key + "\n```" },
            { value: info.doc },
            { value: "Members: `" + Object.keys(info.members).join("`, `") + "`" },
          ],
        };
      }

      // User-defined symbols.
      const symbols = parseSymbols(model);
      const matches = symbols.filter((s) => s.name.toLowerCase() === key);
      if (matches.length > 0) {
        const sym = matches[0];
        return {
          range,
          contents: [
            { value: "**" + sym.kind + "** `" + sym.name + "`" },
            { value: "```fortran\n" + sym.detail + "\n```" },
            { value: "_Defined at line " + sym.line + "_" },
          ],
        };
      }

      // Derived-type components.
      if (before === "%") {
        const types = parseDerivedTypes(model);
        for (const t of Object.values(types)) {
          const comp = t.components.find((c) => c.name.toLowerCase() === key);
          if (comp) {
            return {
              range,
              contents: [
                { value: "**component** `" + comp.name + "`" },
                { value: "```fortran\n" + comp.name + " :: " + comp.spec + "\n```" },
                { value: "Component of derived type `" + t.name + "`." },
              ],
            };
          }
        }
      }

      return null;
    },
  });

  // ──────────────────────────────────────────
  // 12. DEFINITION PROVIDER
  // ──────────────────────────────────────────
  monaco.languages.registerDefinitionProvider(FORTRAN_LANG_ID, {
    provideDefinition: (model, position) => {
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
      if (!word || isReserved(word.word)) return null;
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
  // 13. SIGNATURE HELP PROVIDER
  // ──────────────────────────────────────────
  monaco.languages.registerSignatureHelpProvider(FORTRAN_LANG_ID, {
    signatureHelpTriggerCharacters: ["(", ","],
    provideSignatureHelp: (model, position) => {
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
      const match = /([A-Za-z_]\w*)\s*$/.exec(before);
      if (!match) return null;
      const funcName = match[1].toLowerCase();

      let sig:
        | {
            label: string;
            doc: string;
            params: { label: string; doc: string }[];
          }
        | undefined;

      const intr = INTRINSIC_DOCS[funcName];
      if (intr) {
        sig = {
          label: intr.sig,
          doc: intr.doc,
          params: intr.params || [],
        };
      }

      if (!sig) {
        const lines = model.getLinesContent();
        const spec = new RegExp(
          "\\b(subroutine|function)\\s+" + match[1] + "\\s*\\(([^)]*)\\)",
          "i",
        );
        for (const line of lines) {
          const sm = spec.exec(line);
          if (sm) {
            const params = splitTopLevel(sm[2]).map((p) => p.trim());
            sig = {
              label: match[1] + " (" + params.join(", ") + ")",
              doc: "User-defined subprogram.",
              params: params.map((p) => ({ label: p, doc: "" })),
            };
            break;
          }
        }
      }

      if (!sig) return null;

      return {
        value: {
          signatures: [
            {
              label: sig.label,
              documentation: sig.doc,
              parameters: sig.params,
            },
          ],
          activeSignature: 0,
          activeParameter: sig.params.length
            ? Math.min(commaCount, sig.params.length - 1)
            : 0,
        },
        dispose: () => {},
      };
    },
  });

  // ──────────────────────────────────────────
  // 14. DOCUMENT SYMBOL PROVIDER (Outline)
  // ──────────────────────────────────────────
  monaco.languages.registerDocumentSymbolProvider(FORTRAN_LANG_ID, {
    provideDocumentSymbols: (model) => {
      const symbols = parseSymbols(model);
      const SK = monaco.languages.SymbolKind;
      return symbols.map((sym) => {
        let kind: Monaco.languages.SymbolKind;
        switch (sym.kind) {
          case "program":
            kind = SK.Module;
            break;
          case "module":
          case "submodule":
            kind = SK.Namespace;
            break;
          case "subroutine":
            kind = SK.Method;
            break;
          case "function":
            kind = SK.Function;
            break;
          case "interface":
            kind = SK.Interface;
            break;
          case "type":
            kind = SK.Struct;
            break;
          case "enum":
            kind = SK.Enum;
            break;
          case "parameter":
            kind = SK.Constant;
            break;
          case "component":
            kind = SK.Field;
            break;
          default:
            kind = SK.Variable;
        }
        return {
          name: sym.name,
          detail: sym.detail,
          kind,
          range: {
            startLineNumber: sym.line,
            startColumn: 1,
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
  // 15. FOLDING RANGE PROVIDER
  // ──────────────────────────────────────────
  monaco.languages.registerFoldingRangeProvider(FORTRAN_LANG_ID, {
    provideFoldingRanges: (model) => {
      const lines = model.getLinesContent();
      const ranges: {
        start: number;
        end: number;
        kind: Monaco.languages.FoldingRangeKind;
      }[] = [];

      const OPENERS: RegExp[] = [
        /^\s*program\b/i,
        /^\s*(?!module\s+(?:procedure|function|subroutine)\b)module\b/i,
        /^\s*submodule\b/i,
        /\bsubroutine\s+[A-Za-z_]\w*/i,
        /\bfunction\s+[A-Za-z_]\w*/i,
        /^\s*(?:abstract\s+)?interface\b/i,
        /^\s*type\b(?!\s*(?:is\b|\())/i,
        /^\s*block\b/i,
        /^\s*associate\b/i,
        /^\s*select(?:case|type|rank)?\b/i,
        /^\s*do\b/i,
        /^\s*enum\b/i,
        /^\s*critical\b/i,
        /\bthen\s*$/i,
        /^\s*where\s*\([^)]*\)\s*$/i,
        /^\s*forall\s*\([^)]*\)\s*$/i,
      ];

      const isCloser = (code: string) =>
        /^\s*end\b/i.test(code) ||
        /^\s*end(?:if|do|select|where|forall|type|interface|module|submodule|program|subroutine|function|block|associate|critical|enum)\b/i.test(
          code,
        );

      const stack: number[] = [];
      for (let i = 0; i < lines.length; i++) {
        const code = stripLabel(lines[i].replace(/!.*$/, "")).trim();
        if (!code) continue;

        if (isCloser(code)) {
          const start = stack.pop();
          if (start != null && start < i + 1) {
            ranges.push({
              start,
              end: i + 1,
              kind: monaco.languages.FoldingRangeKind.Region,
            });
          }
          continue;
        }

        // A labeled counted `do` is closed by its label, not by `end do`.
        if (/^\s*do\s+\d+/i.test(code)) continue;

        for (const op of OPENERS) {
          if (op.test(code)) {
            stack.push(i + 1);
            break;
          }
        }
      }

      // Region markers (`! region` / `! endregion`, also `!#region`).
      let regionStart = -1;
      for (let i = 0; i < lines.length; i++) {
        if (/^\s*!\s*#?\s*region\b/i.test(lines[i])) {
          regionStart = i + 1;
        } else if (
          /^\s*!\s*#?\s*endregion\b/i.test(lines[i]) &&
          regionStart !== -1
        ) {
          if (i + 1 - regionStart >= 1) {
            ranges.push({
              start: regionStart,
              end: i + 1,
              kind: monaco.languages.FoldingRangeKind.Region,
            });
          }
          regionStart = -1;
        }
      }

      // Consecutive comment blocks.
      let commentStart = -1;
      for (let i = 0; i < lines.length; i++) {
        const isComment = lines[i].trimStart().startsWith("!");
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
  // 16. REFERENCE & DOCUMENT HIGHLIGHT PROVIDERS
  // ──────────────────────────────────────────
  monaco.languages.registerReferenceProvider(FORTRAN_LANG_ID, {
    provideReferences: (model, position) => {
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

  monaco.languages.registerDocumentHighlightProvider(FORTRAN_LANG_ID, {
    provideDocumentHighlights: (model, position) => {
      const word = model.getWordAtPosition(position);
      if (!word) return [];
      const binding = resolveBinding(model, position);
      const occurrences =
        binding && binding.local
          ? binding.occurrences
          : computeOccurrences(model, word.word);
      return occurrences.map((r) => ({
        range: new monaco.Range(r.line, r.startColumn, r.line, r.endColumn),
        kind: monaco.languages.DocumentHighlightKind.Text,
      }));
    },
  });

  // ──────────────────────────────────────────
  // 17. RENAME PROVIDER
  // ──────────────────────────────────────────
  monaco.languages.registerRenameProvider(FORTRAN_LANG_ID, {
    provideRenameEdits: (model, position, newName) => {
      const word = model.getWordAtPosition(position);
      if (!word || isReserved(word.word)) return null;

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
    resolveRenameLocation: (model, position) => {
      const word = model.getWordAtPosition(position);
      if (!word) return { rejectReason: "Cannot rename this element." };
      if (isReserved(word.word)) {
        return { rejectReason: "Cannot rename a keyword or intrinsic." };
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
