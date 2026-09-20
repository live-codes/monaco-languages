import type * as Monaco from "monaco-editor";

export default (monaco: typeof Monaco) => {
  const LANG_ID = "ocaml";

  // ────────────────────────────────────────────────────────────────────
  //  1. REGISTER LANGUAGE
  // ────────────────────────────────────────────────────────────────────
  monaco.languages.register({
    id: LANG_ID,
    extensions: [".ml", ".mli", ".mll", ".mly"],
    aliases: ["OCaml", "ocaml", "Objective Caml", "Caml"],
    mimetypes: ["text/x-ocaml"],
  });

  // ────────────────────────────────────────────────────────────────────
  //  2. MONARCH TOKENIZER (SYNTAX HIGHLIGHTING)
  // ────────────────────────────────────────────────────────────────────
  monaco.languages.setMonarchTokensProvider(LANG_ID, {
    defaultToken: "",
    tokenPostfix: ".ocaml",

    keywords: [
      "and",
      "as",
      "assert",
      "asr",
      "begin",
      "class",
      "constraint",
      "continue",
      "do",
      "done",
      "downto",
      "effect",
      "else",
      "end",
      "exception",
      "external",
      "for",
      "fun",
      "function",
      "functor",
      "if",
      "in",
      "include",
      "inherit",
      "initializer",
      "land",
      "lazy",
      "let",
      "lor",
      "lsl",
      "lsr",
      "lxor",
      "match",
      "method",
      "mod",
      "module",
      "mutable",
      "new",
      "nonrec",
      "object",
      "of",
      "open",
      "or",
      "perform",
      "private",
      "rec",
      "sig",
      "struct",
      "then",
      "to",
      "try",
      "type",
      "val",
      "virtual",
      "when",
      "while",
      "with",
    ],

    constants: ["true", "false"],

    typeKeywords: [
      "array",
      "bool",
      "bytes",
      "char",
      "exn",
      "float",
      "floatarray",
      "format",
      "int",
      "int32",
      "int64",
      "list",
      "nativeint",
      "option",
      "ref",
      "result",
      "string",
      "unit",
    ],

    // Unqualified values from Stdlib / Printf / Pervasives that OCaml
    // programmers write every day.
    builtins: [
      "abs",
      "at_exit",
      "close_in",
      "close_out",
      "compare",
      "decr",
      "eprintf",
      "exit",
      "failwith",
      "float_of_int",
      "float_of_string",
      "flush",
      "fprintf",
      "fst",
      "ignore",
      "incr",
      "input_line",
      "int_of_float",
      "int_of_string",
      "invalid_arg",
      "max",
      "min",
      "not",
      "open_in",
      "open_out",
      "pred",
      "print_char",
      "print_endline",
      "print_float",
      "print_int",
      "print_newline",
      "print_string",
      "printf",
      "raise",
      "read_line",
      "ref",
      "snd",
      "sprintf",
      "stderr",
      "stdin",
      "stdout",
      "string_of_bool",
      "string_of_float",
      "string_of_int",
      "succ",
    ],

    symbols: /[=><!~?:&|+\-*\/\^%@#]+/,
    escapes:
      /\\(?:[\\"'ntbr ]|[0-9]{3}|x[0-9a-fA-F]{2}|o[0-3]?[0-7]{1,2}|u\{[0-9a-fA-F]+\})/,

    tokenizer: {
      root: [
        // Toplevel directives: #use "topfind";;
        [/^\s*#[a-z_]+/, "keyword.directive"],

        // Attributes and extension nodes: [@inline], [@@deriving], [%ext]
        [/\[@@@/, "annotation", "@attribute"],
        [/\[@@/, "annotation", "@attribute"],
        [/\[@/, "annotation", "@attribute"],
        [/\[%%/, "annotation", "@attribute"],
        [/\[%/, "annotation", "@attribute"],

        // Comments (nestable, ocamldoc aware)
        [/\(\*\*\)/, "comment.doc"],
        [/\(\*\*/, "comment.doc", "@docComment"],
        [/\(\*/, "comment", "@comment"],

        // Quoted strings: {|raw|} and {id|raw|id}
        [/\{[a-z_]*\|/, "string", "@quotedString"],

        // Strings
        [/"/, "string", "@string"],

        // Character literals
        [/'[^\\']'/, "string.char"],
        [/'\\[^']*'/, "string.char"],

        // Numbers
        [/0[xX][0-9a-fA-F][0-9a-fA-F_]*[lLn]?/, "number.hex"],
        [/0[oO][0-7][0-7_]*[lLn]?/, "number.octal"],
        [/0[bB][01][01_]*[lLn]?/, "number.binary"],
        [/\d[\d_]*\.[\d_]*([eE][-+]?[\d_]+)?/, "number.float"],
        [/\d[\d_]*[eE][-+]?[\d_]+/, "number.float"],
        [/\d[\d_]*[lLn]?/, "number"],

        // Type variables: 'a, 'key
        [/'[a-z_][\w']*/, "type.identifier"],

        // Polymorphic variants: `Circle, `ok
        [/`[A-Za-z_][\w']*/, "type"],

        // Labelled arguments and optional arguments
        [/[~?][a-z_][\w']*/, "variable.parameter"],

        // Identifiers, keywords, builtins
        [
          /[a-z_][\w']*/,
          {
            cases: {
              "@keywords": "keyword",
              "@constants": "constant",
              "@typeKeywords": "type",
              "@builtins": "predefined",
              "@default": "identifier",
            },
          },
        ],

        // Constructors and module paths
        [/[A-Z][\w']*/, "type.identifier"],

        // Array literals [| ... |]
        [/\[\|/, "delimiter.square"],
        [/\|\]/, "delimiter.square"],
        [/[{}()\[\]]/, "@brackets"],

        [/@symbols/, "operator"],
        [/[;,.]/, "delimiter"],

        [/\s+/, "white"],
      ],

      comment: [
        [/[^(*]+/, "comment"],
        [/\(\*/, "comment", "@push"],
        [/\*\)/, "comment", "@pop"],
        [/[(*]/, "comment"],
      ],

      docComment: [
        [/[^(*]+/, "comment.doc"],
        [/\(\*/, "comment.doc", "@push"],
        [/\*\)/, "comment.doc", "@pop"],
        [/[(*]/, "comment.doc"],
      ],

      string: [
        [/@escapes/, "string.escape"],
        [/\\./, "string.escape.invalid"],
        [/[^\\"]+/, "string"],
        [/"/, "string", "@pop"],
      ],

      quotedString: [
        [/\|[a-z_]*\}/, "string", "@pop"],
        [/[^|]+/, "string"],
        [/\|/, "string"],
      ],

      attribute: [
        [/[a-z_][\w']*/, "annotation"],
        [/[A-Z][\w']*/, "annotation"],
        [/\d[\d_]*/, "annotation"],
        [/"/, "string", "@string"],
        [/\s+/, "white"],
        [/\]/, "annotation", "@pop"],
        [/./, "annotation"],
      ],
    },
  });

  // ────────────────────────────────────────────────────────────────────
  //  3. LANGUAGE CONFIGURATION
  // ────────────────────────────────────────────────────────────────────
  monaco.languages.setLanguageConfiguration(LANG_ID, {
    comments: { blockComment: ["(*", "*)"] },
    brackets: [
      ["{", "}"],
      ["[", "]"],
      ["(", ")"],
      ["[|", "|]"],
    ],
    autoClosingPairs: [
      { open: "(*", close: "*)" },
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: '"', close: '"', notIn: ["string"] },
    ],
    surroundingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: '"', close: '"' },
    ],
    wordPattern: /[A-Za-z_][A-Za-z0-9_']*/g,
    indentationRules: {
      increaseIndentPattern:
        /(?:=|->|\||\b(?:struct|sig|begin|object|match|function|fun|try|then|else|in|do))\s*$/,
      decreaseIndentPattern: /^\s*(?:end\b|in\b|done\b|else\b|\|\s)/,
    },
    onEnterRules: [
      {
        // Keep a block comment aligned, continuing with a leading " * ".
        beforeText: /^\s*\(\*+(?!\)).*$/,
        afterText: /^\s*\*+\)/,
        action: {
          indentAction: monaco.languages.IndentAction.IndentOutdent,
          appendText: " * ",
        },
      },
    ],
    folding: {
      markers: {
        start: /^\s*\(\*\s*#?region\b/,
        end: /^\s*#?endregion\s*\*\)/,
      },
    },
  });

  // ────────────────────────────────────────────────────────────────────
  //  4. DOCUMENTATION DATABASE
  // ────────────────────────────────────────────────────────────────────
  const DOCS: Record<string, { detail: string; doc: string }> = {
    // ── Keywords ──────────────────────────────────────────────────
    let: {
      detail: "(keyword) Local binding",
      doc: "Binds a value or function. Use `rec` for recursion and `in` for local bindings.\n\n```ocaml\nlet x = 42\nlet add a b = a + b\nlet rec fact n = if n <= 1 then 1 else n * fact (n - 1)\n```",
    },
    and: {
      detail: "(keyword) Mutually recursive binding",
      doc: "Continues a `let rec`, `type` or `module rec` group with another binding that can refer to the previous ones.\n\n```ocaml\nlet rec even n = n = 0 || odd (n - 1)\nand odd n = n <> 0 && even (n - 1)\n```",
    },
    rec: {
      detail: "(keyword) Recursive",
      doc: "Marks a binding as recursive. Also used for `module rec`.\n\n```ocaml\nlet rec loop i = if i > 0 then loop (i - 1)\n```",
    },
    in: {
      detail: "(keyword) Local binding scope",
      doc: "Ends a local `let` and starts the expression the binding is visible in.\n\n```ocaml\nlet area r =\n  let pi = 3.14159 in\n  pi *. r *. r\n```",
    },
    fun: {
      detail: "(keyword) Anonymous function",
      doc: "A single pattern-matching anonymous function (exactly one argument).\n\n```ocaml\nList.map (fun x -> x * 2) [1; 2; 3]\n```",
    },
    function: {
      detail: "(keyword) Pattern-matching function",
      doc: "An anonymous function that matches its argument against several patterns.\n\n```ocaml\nlet describe = function\n  | 0 -> \"zero\"\n  | _ -> \"other\"\n```",
    },
    match: {
      detail: "(keyword) Pattern matching",
      doc: "Matches a value against a list of patterns. Note that OCaml checks exhaustiveness.\n\n```ocaml\nmatch shape with\n| Circle r -> 3.14 *. r *. r\n| Rectangle (w, h) -> w *. h\n```",
    },
    with: {
      detail: "(keyword) Introduce cases / handle exceptions",
      doc: "Introduces the cases of a `match`, or the handlers of a `try`.\n\n```ocaml\ntry input_line stdin with\n| End_of_file -> \"\"\n```",
    },
    type: {
      detail: "(keyword) Type declaration",
      doc: "Declares an alias, variant or record type.\n\n```ocaml\ntype point = { x : float; y : float }\ntype shape = Circle of float | Rectangle of float * float\n```",
    },
    module: {
      detail: "(keyword) Module declaration",
      doc: "Declares a module, module type or functor.\n\n```ocaml\nmodule M = struct let x = 1 end\nmodule Make (X : Sig) = struct end\n```",
    },
    struct: {
      detail: "(keyword) Structure",
      doc: "Starts a module implementation; closed with `end`.\n\n```ocaml\nmodule M = struct\n  let x = 1\nend\n```",
    },
    sig: {
      detail: "(keyword) Signature",
      doc: "Starts a module signature; closed with `end`. Only the declarations listed here are visible.\n\n```ocaml\nmodule type S = sig\n  val x : int\nend\n```",
    },
    end: {
      detail: "(keyword) End of block",
      doc: "Closes `struct`, `sig`, `begin`, `object` and `match … with` style blocks.",
    },
    begin: {
      detail: "(keyword) Begin block",
      doc: "Groups an expression sequence; closed with `end`. Usually simply a pair of parentheses.\n\n```ocaml\nif cond then begin\n  f ();\n  g ()\nend\n```",
    },
    open: {
      detail: "(keyword) Open a module",
      doc: "Brings the contents of a module into scope.\n\n```ocaml\nopen Printf\nopen List\n```",
    },
    include: {
      detail: "(keyword) Include",
      doc: "Re-exports everything from a module (or signature) into the current one.",
    },
    exception: {
      detail: "(keyword) Exception declaration",
      doc: "Declares an exception constructor.\n\n```ocaml\nexception Parse_error of string\n```",
    },
    try: {
      detail: "(keyword) Exception handling",
      doc: "Evaluates an expression and matches raised exceptions against the handlers.\n\n```ocaml\ntry int_of_string s with\n| Failure msg -> 0\n```",
    },
    if: {
      detail: "(keyword) Conditional",
      doc: "`if cond then expr else expr`. Both branches must have the same type.\n\n```ocaml\nif n > 0 then \"positive\" else \"non-positive\"\n```",
    },
    then: {
      detail: "(keyword) Then branch",
      doc: "Introduces the expression evaluated when an `if` condition holds.",
    },
    else: {
      detail: "(keyword) Else branch",
      doc: "Introduces the expression evaluated when an `if` condition is false.",
    },
    for: {
      detail: "(keyword) For loop",
      doc: "Iterates over an integer range. The body must have type `unit`.\n\n```ocaml\nfor i = 1 to 10 do\n  Printf.printf \"%d\\n\" i\ndone\n```",
    },
    to: {
      detail: "(keyword) Ascending range",
      doc: "Inclusive upper bound of a `for` loop (see also `downto`).",
    },
    downto: {
      detail: "(keyword) Descending range",
      doc: "Upper bound of a descending `for` loop.\n\n```ocaml\nfor i = 10 downto 1 do print_int i done\n```",
    },
    while: {
      detail: "(keyword) While loop",
      doc: "Repeats a `unit`-typed body while the condition holds.\n\n```ocaml\nwhile !i < 10 do incr i done\n```",
    },
    do: {
      detail: "(keyword) Loop body",
      doc: "Introduces the body of a `for` or `while` loop; closed with `done`.",
    },
    done: {
      detail: "(keyword) End of loop",
      doc: "Closes the body of a `for` or `while` loop.",
    },
    of: {
      detail: "(keyword) Constructor argument",
      doc: "Introduces the argument type(s) of a variant constructor.\n\n```ocaml\ntype t = Foo of int | Bar of int * string\n```",
    },
    as: {
      detail: "(keyword) Pattern alias",
      doc: "Binds the whole matched value while still destructuring it.\n\n```ocaml\nmatch p with\n| (x, y) as pair -> pair\n```",
    },
    when: {
      detail: "(keyword) Pattern guard",
      doc: "Adds a boolean condition to a pattern; the case only applies when it holds.\n\n```ocaml\nmatch n with\n| x when x mod 2 = 0 -> \"even\"\n| _ -> \"odd\"\n```",
    },
    mutable: {
      detail: "(keyword) Mutable field",
      doc: "Makes a record field assignable, or a field of an `object` modifiable.\n\n```ocaml\ntype counter = { mutable count : int }\n```",
    },
    ref: {
      detail: "(keyword) Reference type",
      doc: "`'a ref` is a mutable cell. Create with `ref`, read with `!`, assign with `:=`.\n\n```ocaml\nlet n = ref 0 in\nincr n;\nPrintf.printf \"%d\\n\" !n\n```",
    },
    lazy: {
      detail: "(keyword) Lazy value",
      doc: "Suspends a computation until it is forced.\n\n```ocaml\nlet x = lazy (1 + 1) in\nLazy.force x\n```",
    },
    object: {
      detail: "(keyword) Object",
      doc: "Starts an object literal; closed with `end`.\n\n```ocaml\nlet o = object\n  method id x = x\nend\n```",
    },
    class: {
      detail: "(keyword) Class declaration",
      doc: "Declares a class of objects.\n\n```ocaml\nclass counter = object\n  val mutable n = 0\n  method incr = n <- n + 1\n  method value = n\nend\n```",
    },
    method: {
      detail: "(keyword) Object method",
      doc: "Declares a method inside a class or object; can be `private`.",
    },
    val: {
      detail: "(keyword) Value declaration",
      doc: "Declares a value in a signature (.mli) or as an object field.\n\n```ocaml\nval map : ('a -> 'b) -> 'a list -> 'b list\n```",
    },
    external: {
      detail: "(keyword) External function",
      doc: "Binds a primitive C function to an OCaml value.\n\n```ocaml\nexternal raise : exn -> 'a = \"caml_raise_exn\"\n```",
    },
    virtual: {
      detail: "(keyword) Virtual member",
      doc: "Declares a class member or class that must be defined by a subclass.",
    },
    inherit: {
      detail: "(keyword) Inherit",
      doc: "Includes the members of another class in the current one.",
    },
    initializer: {
      detail: "(keyword) Initializer",
      doc: "A block of expression run when an object is created.",
    },
    constraint: {
      detail: "(keyword) Type constraint",
      doc: "Constrains the type parameters of a class or object.",
    },
    private: {
      detail: "(keyword) Private",
      doc: "Hides a type abbreviation or an object method outside the module set.",
    },
    functor: {
      detail: "(keyword) Functor",
      doc: "A module parameterized by other modules.\n\n```ocaml\nmodule Make (X : S) = struct end\n```",
    },
    nonrec: {
      detail: "(keyword) Non-recursive",
      doc: "`type nonrec t = …` declares a type that does not refer to its own definition.",
    },
    assert: {
      detail: "(keyword) Assertion",
      doc: "Raises `Assert_failure` if the condition is false.\n\n```ocaml\nassert (n > 0)\n```",
    },
    land: {
      detail: "(keyword) Bitwise and",
      doc: "Bitwise AND on `int` (`land`), `lor` OR, `lxor` XOR, `lsl`/`lsr`/`asr` shifts.\n\n```ocaml\n0b1100 land 0b1010 (* 0b1000 *)\n```",
    },
    lor: {
      detail: "(keyword) Bitwise or",
      doc: "Bitwise OR on `int`.\n\n```ocaml\n0b1100 lor 0b1010 (* 0b1110 *)\n```",
    },
    lxor: {
      detail: "(keyword) Bitwise exclusive or",
      doc: "Bitwise XOR on `int`.",
    },
    lsl: { detail: "(keyword) Shift left", doc: "`n lsl k` shifts `n` left by `k` bits." },
    lsr: { detail: "(keyword) Shift right", doc: "`n lsr k` shifts `n` right by `k` bits." },
    asr: {
      detail: "(keyword) Arithmetic shift right",
      doc: "`n asr k` shifts `n` right by `k` bits, preserving the sign bit.",
    },
    mod: {
      detail: "(keyword) Integer remainder",
      doc: "`a mod b` is the remainder of the integer division; the result has the sign of `a`.",
    },
    effect: {
      detail: "(keyword) Effect declaration",
      doc: "OCaml 5 effect: declares an effect that handlers can interpret.\n\n```ocaml\neffect Ask : int\n```",
    },
    perform: {
      detail: "(keyword) Perform an effect",
      doc: "OCaml 5 effect: triggers an effect, to be handled by an enclosing handler.\n\n```ocaml\nlet x = perform (Ask)\n```",
    },
    new: {
      detail: "(keyword) Instantiate a class",
      doc: "Creates an object of a class or class type.\n\n```ocaml\nlet c = new counter\n```",
    },

    // ── Types ─────────────────────────────────────────────────────
    int: {
      detail: "(type) int",
      doc: "Fixed-size integer, 63 bits wide on 64-bit platforms (31 on 32-bit).\n\n```ocaml\nlet n : int = 42\n```",
    },
    float: {
      detail: "(type) float",
      doc: "Double-precision (64-bit) floating point number.\n\n```ocaml\nlet pi = 3.14159\nlet x = 2.0 *. pi\n```",
    },
    bool: {
      detail: "(type) bool",
      doc: "Boolean: `true` or `false`. Short-circuit with `&&` and `||`.",
    },
    char: {
      detail: "(type) char",
      doc: "A single byte.\n\n```ocaml\nlet c = 'a'\nlet newline = '\\n'\n```",
    },
    string: {
      detail: "(type) string",
      doc: "An immutable byte sequence (not Unicode-aware). Build with `^`, inspect with `String.*`.\n\n```ocaml\nlet s = \"hello \" ^ \"world\"\n```",
    },
    bytes: {
      detail: "(type) bytes",
      doc: "A mutable byte sequence; the mutable counterpart of `string`.\n\n```ocaml\nlet b = Bytes.of_string \"abc\" in\nBytes.set b 0 'A'\n```",
    },
    unit: {
      detail: "(type) unit",
      doc: "The type with a single value `()`. The result type of side-effecting expressions.",
    },
    list: {
      detail: "(type) 'a list",
      doc: "Immutable singly-linked list. Built with `[]`, `::` and the literal syntax.\n\n```ocaml\nlet xs = [1; 2; 3]\nlet ys = 0 :: xs\n```",
    },
    array: {
      detail: "(type) 'a array",
      doc: "Fixed-size, mutable sequence with O(1) indexing.\n\n```ocaml\nlet a = [| 1; 2; 3 |]\na.(0) <- 42\n```",
    },
    option: {
      detail: "(type) 'a option",
      doc: "`None` or `Some x`. Prefer it to exceptions for expected absence.\n\n```ocaml\nmatch List.find_opt (( = ) 1) xs with\n| Some x -> x\n| None -> 0\n```",
    },
    result: {
      detail: "(type) ('a, 'e) result",
      doc: "`Ok x` or `Error e`, for computations that can fail.\n\n```ocaml\nlet div a b =\n  if b = 0 then Error \"division by zero\" else Ok (a / b)\n```",
    },
    exn: {
      detail: "(type) exn",
      doc: "The type of exceptions. Extensible: add constructors with `exception`.",
    },
    floatarray: {
      detail: "(type) floatarray",
      doc: "A mutable array of unboxed `float`s, useful for numeric code.",
    },
    int32: { detail: "(type) int32", doc: "Signed 32-bit integer; see `Int32`." },
    int64: { detail: "(type) int64", doc: "Signed 64-bit integer; see `Int64`." },
    nativeint: { detail: "(type) nativeint", doc: "Signed integer of the platform's word size; see `Nativeint`." },
    format: {
      detail: "(type) format6",
      doc: "The type of format strings used by `Printf` and `Format`; its type parameters are inferred from the literal.",
    },

    // ── Stdlib values and functions ───────────────────────────────
    print_endline: {
      detail: "val print_endline : string -> unit",
      doc: "Prints a string followed by a newline to standard output.\n\n```ocaml\nprint_endline \"hello\"\n```",
    },
    print_string: {
      detail: "val print_string : string -> unit",
      doc: "Prints a string to standard output without a trailing newline.",
    },
    print_char: {
      detail: "val print_char : char -> unit",
      doc: "Prints one character to standard output.",
    },
    print_int: {
      detail: "val print_int : int -> unit",
      doc: "Prints an integer to standard output.",
    },
    print_float: {
      detail: "val print_float : float -> unit",
      doc: "Prints a float to standard output.",
    },
    print_newline: {
      detail: "val print_newline : unit -> unit",
      doc: "Writes a newline to standard output and flushes it.",
    },
    printf: {
      detail: "val printf : ('a, out_channel, unit) format -> 'a",
      doc: "Formatted output to standard output.\n\n```ocaml\nprintf \"%s is %d\\n\" name age\n```",
    },
    sprintf: {
      detail: "val sprintf : ('a, unit, string) format -> 'a",
      doc: "Like `printf` but returns the formatted string instead of printing it.",
    },
    eprintf: {
      detail: "val eprintf : ('a, out_channel, unit) format -> 'a",
      doc: "Formatted output to standard error.",
    },
    fprintf: {
      detail: "val fprintf : out_channel -> ('a, out_channel, unit) format -> 'a",
      doc: "Formatted output to the given channel.",
    },
    failwith: {
      detail: "val failwith : string -> 'a",
      doc: "Raises `Failure msg`.\n\n```ocaml\nif n < 0 then failwith \"negative\"\n```",
    },
    invalid_arg: {
      detail: "val invalid_arg : string -> 'a",
      doc: "Raises `Invalid_argument msg`; conventionally for bad arguments.",
    },
    raise: {
      detail: "val raise : exn -> 'a",
      doc: "Raises the given exception.\n\n```ocaml\nraise (Failure \"boom\")\n```",
    },
    ignore: {
      detail: "val ignore : 'a -> unit",
      doc: "Discards a value, silencing the unused-result warning.\n\n```ocaml\nignore (Sys.command \"ls\")\n```",
    },
    incr: {
      detail: "val incr : int ref -> unit",
      doc: "Increments a reference in place.\n\n```ocaml\nlet n = ref 0 in incr n\n```",
    },
    decr: {
      detail: "val decr : int ref -> unit",
      doc: "Decrements a reference in place.",
    },
    succ: { detail: "val succ : int -> int", doc: "Returns `n + 1`." },
    pred: { detail: "val pred : int -> int", doc: "Returns `n - 1`." },
    abs: { detail: "val abs : int -> int", doc: "Absolute value of an integer." },
    max: {
      detail: "val max : 'a -> 'a -> 'a",
      doc: "Returns the greater of two values using the polymorphic `compare`.",
    },
    min: {
      detail: "val min : 'a -> 'a -> 'a",
      doc: "Returns the smaller of two values using the polymorphic `compare`.",
    },
    not: { detail: "val not : bool -> bool", doc: "Boolean negation." },
    fst: {
      detail: "val fst : 'a * 'b -> 'a",
      doc: "First component of a pair.\n\n```ocaml\nfst (1, \"one\") = 1\n```",
    },
    snd: {
      detail: "val snd : 'a * 'b -> 'b",
      doc: "Second component of a pair.",
    },
    compare: {
      detail: "val compare : 'a -> 'a -> int",
      doc: "Polymorphic structural comparison: negative, zero or positive.",
    },
    exit: { detail: "val exit : int -> 'a", doc: "Terminates the program with the given status." },
    at_exit: {
      detail: "val at_exit : (unit -> unit) -> unit",
      doc: "Registers a function to run when the program exits.",
    },
    read_line: {
      detail: "val read_line : unit -> string",
      doc: "Flushes standard output and reads a line from standard input.",
    },
    input_line: {
      detail: "val input_line : in_channel -> string",
      doc: "Reads a line from the channel, raising `End_of_file` at the end.",
    },
    open_in: {
      detail: "val open_in : string -> in_channel",
      doc: "Opens a file for reading.\n\n```ocaml\nlet ic = open_in \"data.txt\"\n```",
    },
    open_out: {
      detail: "val open_out : string -> out_channel",
      doc: "Opens (or creates) a file for writing, truncating it.",
    },
    close_in: { detail: "val close_in : in_channel -> unit", doc: "Closes an input channel." },
    close_out: { detail: "val close_out : out_channel -> unit", doc: "Closes an output channel, flushing it." },
    string_of_int: {
      detail: "val string_of_int : int -> string",
      doc: "Converts an integer to its decimal representation.",
    },
    int_of_string: {
      detail: "val int_of_string : string -> int",
      doc: "Parses an integer (decimal, `0x`, `0o` or `0b`), raising `Failure` on bad input.",
    },
    float_of_int: { detail: "val float_of_int : int -> float", doc: "Converts an integer to a float." },
    int_of_float: {
      detail: "val int_of_float : float -> int",
      doc: "Truncates a float towards zero.",
    },
    string_of_float: { detail: "val string_of_float : float -> string", doc: "Converts a float to a string." },
    float_of_string: { detail: "val float_of_string : string -> float", doc: "Parses a float." },
    string_of_bool: { detail: "val string_of_bool : bool -> string", doc: "`true` or `false` as a string." },

    // ── Stdlib modules ────────────────────────────────────────────
    "List.length": { detail: "val length : 'a list -> int", doc: "Length of a list in O(n)." },
    "List.rev": { detail: "val rev : 'a list -> 'a list", doc: "Reverses a list in O(n)." },
    "List.map": {
      detail: "val map : ('a -> 'b) -> 'a list -> 'b list",
      doc: "Applies a function to every element.\n\n```ocaml\nList.map (fun x -> x * x) [1; 2; 3] (* [1; 4; 9] *)\n```",
    },
    "List.mapi": { detail: "val mapi : (int -> 'a -> 'b) -> 'a list -> 'b list", doc: "Like `map`, passing the index as well." },
    "List.filter": {
      detail: "val filter : ('a -> bool) -> 'a list -> 'a list",
      doc: "Keeps the elements that satisfy the predicate.",
    },
    "List.filter_map": {
      detail: "val filter_map : ('a -> 'b option) -> 'a list -> 'b list",
      doc: "Maps and keeps only the `Some` results.\n\n```ocaml\nfilter_map int_of_string_opt [\"1\"; \"x\"; \"3\"] (* [1; 3] *)\n```",
    },
    "List.fold_left": {
      detail: "val fold_left : ('acc -> 'a -> 'acc) -> 'acc -> 'a list -> 'acc",
      doc: "Left fold: `fold_left f init [a; b] = f (f init a) b`.",
    },
    "List.fold_right": {
      detail: "val fold_right : ('a -> 'acc -> 'acc) -> 'a list -> 'acc -> 'acc",
      doc: "Right fold: `fold_right f [a; b] init = f a (f b init)`.",
    },
    "List.iter": { detail: "val iter : ('a -> unit) -> 'a list -> unit", doc: "Applies a unit-returning function to every element." },
    "List.iteri": { detail: "val iteri : (int -> 'a -> unit) -> 'a list -> unit", doc: "Like `iter`, passing the index as well." },
    "List.for_all": { detail: "val for_all : ('a -> bool) -> 'a list -> bool", doc: "True when the predicate holds for every element." },
    "List.exists": { detail: "val exists : ('a -> bool) -> 'a list -> bool", doc: "True when the predicate holds for at least one element." },
    "List.mem": { detail: "val mem : 'a -> 'a list -> bool", doc: "Membership using structural equality." },
    "List.find": {
      detail: "val find : ('a -> bool) -> 'a list -> 'a",
      doc: "First element satisfying the predicate, raising `Not_found` if there is none.",
    },
    "List.find_opt": { detail: "val find_opt : ('a -> bool) -> 'a list -> 'a option", doc: "Like `find` but returns an option." },
    "List.find_map": { detail: "val find_map : ('a -> 'b option) -> 'a list -> 'b option", doc: "First `Some` returned by the function." },
    "List.assoc": { detail: "val assoc : 'a -> ('a * 'b) list -> 'b", doc: "Looks up a key in an association list; raises `Not_found`." },
    "List.assoc_opt": { detail: "val assoc_opt : 'a -> ('a * 'b) list -> 'b option", doc: "Option-returning `assoc`." },
    "List.sort": {
      detail: "val sort : ('a -> 'a -> int) -> 'a list -> 'a list",
      doc: "Sorts using the comparator (stable since OCaml 4.02).\n\n```ocaml\nList.sort compare [3; 1; 2] (* [1; 2; 3] *)\n```",
    },
    "List.concat": { detail: "val concat : 'a list list -> 'a list", doc: "Concatenates a list of lists." },
    "List.flatten": { detail: "val flatten : 'a list list -> 'a list", doc: "Deprecated alias of `concat`." },
    "List.append": { detail: "val append : 'a list -> 'a list -> 'a list", doc: "Concatenates two lists (`@`)." },
    "List.hd": { detail: "val hd : 'a list -> 'a", doc: "First element; raises `Failure \"hd\"` on the empty list." },
    "List.tl": { detail: "val tl : 'a list -> 'a list", doc: "All but the first element; raises on the empty list." },
    "List.nth": { detail: "val nth : 'a list -> int -> 'a", doc: "Element at an index; raises `Failure \"nth\"` out of bounds." },
    "List.nth_opt": { detail: "val nth_opt : 'a list -> int -> 'a option", doc: "Option-returning `nth`." },
    "List.take": { detail: "val take : int -> 'a list -> 'a list", doc: "The first `n` elements (raises if the list is too short)." },
    "List.drop": { detail: "val drop : int -> 'a list -> 'a list", doc: "The list without its first `n` elements." },
    "List.partition": { detail: "val partition : ('a -> bool) -> 'a list -> 'a list * 'a list", doc: "Splits into elements satisfying the predicate and the rest." },
    "List.split": { detail: "val split : ('a * 'b) list -> 'a list * 'b list", doc: "Turns a list of pairs into a pair of lists." },
    "List.combine": { detail: "val combine : 'a list -> 'b list -> ('a * 'b) list", doc: "Zips two lists, raising `Invalid_argument` on different lengths." },
    "List.init": { detail: "val init : int -> (int -> 'a) -> 'a list", doc: "Builds a list from a function of the index." },
    "List.rev_map": { detail: "val rev_map : ('a -> 'b) -> 'a list -> 'b list", doc: "Maps and reverses, without building an intermediate list." },
    "List.sort_uniq": { detail: "val sort_uniq : ('a -> 'a -> int) -> 'a list -> 'a list", doc: "Sorts and removes duplicates." },
    "List.to_seq": { detail: "val to_seq : 'a list -> 'a Seq.t", doc: "Lazy sequence view of a list." },
    "List.of_seq": { detail: "val of_seq : 'a Seq.t -> 'a list", doc: "Builds a list from a sequence." },

    "Array.length": { detail: "val length : 'a array -> int", doc: "Number of elements." },
    "Array.get": { detail: "val get : 'a array -> int -> 'a", doc: "Element at an index (`a.(i)`); raises out of bounds." },
    "Array.set": { detail: "val set : 'a array -> int -> 'a -> unit", doc: "Sets an element in place (`a.(i) <- v`)." },
    "Array.make": { detail: "val make : int -> 'a -> 'a array", doc: "Creates an array filled with a value." },
    "Array.init": { detail: "val init : int -> (int -> 'a) -> 'a array", doc: "Creates an array from a function of the index." },
    "Array.of_list": { detail: "val of_list : 'a list -> 'a array", doc: "Converts a list to an array." },
    "Array.to_list": { detail: "val to_list : 'a array -> 'a list", doc: "Converts an array to a list." },
    "Array.map": { detail: "val map : ('a -> 'b) -> 'a array -> 'b array", doc: "Applies a function to every element, returning a new array." },
    "Array.mapi": { detail: "val mapi : (int -> 'a -> 'b) -> 'a array -> 'b array", doc: "Like `map`, passing the index." },
    "Array.iter": { detail: "val iter : ('a -> unit) -> 'a array -> unit", doc: "Applies a unit-returning function to every element." },
    "Array.iteri": { detail: "val iteri : (int -> 'a -> unit) -> 'a array -> unit", doc: "Like `iter`, passing the index." },
    "Array.fold_left": { detail: "val fold_left : ('acc -> 'a -> 'acc) -> 'acc -> 'a array -> 'acc", doc: "Left fold over an array." },
    "Array.fold_right": { detail: "val fold_right : ('a -> 'acc -> 'acc) -> 'a array -> 'acc -> 'acc", doc: "Right fold over an array." },
    "Array.append": { detail: "val append : 'a array -> 'a array -> 'a array", doc: "Concatenates two arrays." },
    "Array.concat": { detail: "val concat : 'a array list -> 'a array", doc: "Concatenates a list of arrays." },
    "Array.sub": { detail: "val sub : 'a array -> int -> int -> 'a array", doc: "Copies a slice of an array." },
    "Array.copy": { detail: "val copy : 'a array -> 'a array", doc: "Shallow copy." },
    "Array.blit": { detail: "val blit : 'a array -> int -> 'a array -> int -> int -> unit", doc: "Copies a slice from one array into another." },
    "Array.fill": { detail: "val fill : 'a array -> int -> int -> 'a -> unit", doc: "Fills a slice with a value." },
    "Array.sort": { detail: "val sort : ('a -> 'a -> int) -> 'a array -> unit", doc: "Sorts an array in place." },
    "Array.mem": { detail: "val mem : 'a -> 'a array -> bool", doc: "Membership using structural equality." },
    "Array.for_all": { detail: "val for_all : ('a -> bool) -> 'a array -> bool", doc: "True when the predicate holds for every element." },
    "Array.exists": { detail: "val exists : ('a -> bool) -> 'a array -> bool", doc: "True when the predicate holds for some element." },
    "Array.find_opt": { detail: "val find_opt : ('a -> bool) -> 'a array -> 'a option", doc: "First element satisfying the predicate." },

    "String.length": { detail: "val length : string -> int", doc: "Number of bytes (not characters)." },
    "String.get": { detail: "val get : string -> int -> char", doc: "Byte at an index (`s.[i]`)." },
    "String.make": { detail: "val make : int -> char -> string", doc: "Creates a string made of `n` copies of a character." },
    "String.sub": { detail: "val sub : string -> int -> int -> string", doc: "Substring of the given length." },
    "String.concat": { detail: "val concat : string -> string list -> string", doc: "Joins a list of strings with a separator." },
    "String.split_on_char": { detail: "val split_on_char : char -> string -> string list", doc: "Splits a string on a character.\n\n```ocaml\nString.split_on_char ',' \"a,b,c\" (* [\"a\"; \"b\"; \"c\"] *)\n```" },
    "String.trim": { detail: "val trim : string -> string", doc: "Removes leading and trailing whitespace." },
    "String.uppercase_ascii": { detail: "val uppercase_ascii : string -> string", doc: "ASCII-only uppercasing." },
    "String.lowercase_ascii": { detail: "val lowercase_ascii : string -> string", doc: "ASCII-only lowercasing." },
    "String.capitalize_ascii": { detail: "val capitalize_ascii : string -> string", doc: "Uppercases the first character only." },
    "String.contains": { detail: "val contains : string -> char -> bool", doc: "Whether a byte occurs in the string." },
    "String.index": { detail: "val index : string -> char -> int", doc: "Index of the first occurrence; raises `Not_found`." },
    "String.index_opt": { detail: "val index_opt : string -> char -> int option", doc: "Option-returning `index`." },
    "String.rindex_opt": { detail: "val rindex_opt : string -> char -> int option", doc: "Index of the last occurrence." },
    "String.starts_with": { detail: "val starts_with : prefix:string -> string -> bool", doc: "Whether the string has the given prefix." },
    "String.ends_with": { detail: "val ends_with : suffix:string -> string -> bool", doc: "Whether the string has the given suffix." },
    "String.iter": { detail: "val iter : (char -> unit) -> string -> unit", doc: "Applies a function to every byte." },
    "String.iteri": { detail: "val iteri : (int -> char -> unit) -> string -> unit", doc: "Like `iter`, passing the index." },
    "String.map": { detail: "val map : (char -> char) -> string -> string", doc: "Builds a new string by mapping every byte." },
    "String.fold_left": { detail: "val fold_left : ('acc -> char -> 'acc) -> 'acc -> string -> 'acc", doc: "Left fold over the bytes of a string." },
    "String.mem": { detail: "val mem : string -> char -> bool", doc: "Alias-ish predicate for byte membership." },
    "String.to_seq": { detail: "val to_seq : string -> char Seq.t", doc: "Sequence of the bytes of a string." },
    "String.equal": { detail: "val equal : string -> string -> bool", doc: "Byte-wise equality." },
    "String.compare": { detail: "val compare : string -> string -> int", doc: "Byte-wise ordering." },

    "Bytes.create": { detail: "val create : int -> bytes", doc: "Allocates an uninitialized byte sequence." },
    "Bytes.of_string": { detail: "val of_string : string -> bytes", doc: "Copies a string into a mutable buffer." },
    "Bytes.to_string": { detail: "val to_string : bytes -> string", doc: "Copies the buffer into an immutable string." },
    "Bytes.length": { detail: "val length : bytes -> int", doc: "Number of bytes." },
    "Bytes.get": { detail: "val get : bytes -> int -> char", doc: "Byte at an index." },
    "Bytes.set": { detail: "val set : bytes -> int -> char -> unit", doc: "Writes a byte in place." },
    "Bytes.blit": { detail: "val blit : bytes -> int -> bytes -> int -> int -> unit", doc: "Copies a slice between buffers." },
    "Bytes.fill": { detail: "val fill : bytes -> int -> int -> char -> unit", doc: "Fills a slice with a byte." },
    "Bytes.sub": { detail: "val sub : bytes -> int -> int -> bytes", doc: "Copies a slice of a buffer." },
    "Bytes.concat": { detail: "val concat : string -> bytes list -> bytes", doc: "Joins buffers with a separator." },
    "Bytes.iter": { detail: "val iter : (char -> unit) -> bytes -> unit", doc: "Applies a function to every byte." },
    "Bytes.map": { detail: "val map : (char -> char) -> bytes -> bytes", doc: "Maps every byte of a buffer." },
    "Bytes.uppercase_ascii": { detail: "val uppercase_ascii : bytes -> bytes", doc: "ASCII uppercasing in place." },
    "Bytes.lowercase_ascii": { detail: "val lowercase_ascii : bytes -> bytes", doc: "ASCII lowercasing in place." },
    "Bytes.equal": { detail: "val equal : bytes -> bytes -> bool", doc: "Byte-wise equality." },

    "Char.code": { detail: "val code : char -> int", doc: "Code point of a character." },
    "Char.chr": { detail: "val chr : int -> char", doc: "Character of a code point; raises `Invalid_argument` out of range." },
    "Char.escaped": { detail: "val escaped : char -> string", doc: "OCaml escape sequence for a character." },
    "Char.lowercase_ascii": { detail: "val lowercase_ascii : char -> char", doc: "ASCII lowercase." },
    "Char.uppercase_ascii": { detail: "val uppercase_ascii : char -> char", doc: "ASCII uppercase." },
    "Char.compare": { detail: "val compare : char -> char -> int", doc: "Ordering of two characters." },
    "Char.equal": { detail: "val equal : char -> char -> bool", doc: "Equality of two characters." },

    "Int.abs": { detail: "val abs : int -> int", doc: "Absolute value, without overflow checks." },
    "Int.max_int": { detail: "val max_int : int", doc: "Largest representable integer." },
    "Int.min_int": { detail: "val min_int : int", doc: "Smallest representable integer." },
    "Int.to_string": { detail: "val to_string : int -> string", doc: "Decimal representation." },
    "Int.of_string": { detail: "val of_string : string -> int", doc: "Parses an integer; raises `Failure` on bad input." },
    "Int.compare": { detail: "val compare : int -> int -> int", doc: "Ordering of two integers." },
    "Int.equal": { detail: "val equal : int -> int -> bool", doc: "Equality of two integers." },

    "Float.pi": { detail: "val pi : float", doc: "The constant π." },
    "Float.infinity": { detail: "val infinity : float", doc: "Positive infinity." },
    "Float.nan": { detail: "val nan : float", doc: "Not-a-number. Test with `Float.is_nan`, never with `=`." },
    "Float.max_float": { detail: "val max_float : float", doc: "Largest finite representable float." },
    "Float.min_float": { detail: "val min_float : float", doc: "Smallest positive normal float." },
    "Float.epsilon": { detail: "val epsilon : float", doc: "Difference between 1.0 and the next representable float." },
    "Float.abs": { detail: "val abs : float -> float", doc: "Absolute value." },
    "Float.sqrt": { detail: "val sqrt : float -> float", doc: "Square root." },
    "Float.pow": { detail: "val pow : float -> float -> float", doc: "`pow x y` is x to the power y." },
    "Float.exp": { detail: "val exp : float -> float", doc: "Exponential function." },
    "Float.log": { detail: "val log : float -> float", doc: "Natural logarithm." },
    "Float.log10": { detail: "val log10 : float -> float", doc: "Base-10 logarithm." },
    "Float.sin": { detail: "val sin : float -> float", doc: "Sine." },
    "Float.cos": { detail: "val cos : float -> float", doc: "Cosine." },
    "Float.tan": { detail: "val tan : float -> float", doc: "Tangent." },
    "Float.atan2": { detail: "val atan2 : float -> float -> float", doc: "Four-quadrant arctangent." },
    "Float.hypot": { detail: "val hypot : float -> float -> float", doc: "`sqrt (x *. x +. y *. y)` without intermediate overflow." },
    "Float.ceil": { detail: "val ceil : float -> float", doc: "Rounds up." },
    "Float.floor": { detail: "val floor : float -> float", doc: "Rounds down." },
    "Float.round": { detail: "val round : float -> float", doc: "Rounds to the nearest integer, halfway away from zero." },
    "Float.trunc": { detail: "val trunc : float -> float", doc: "Integer part, towards zero." },
    "Float.of_int": { detail: "val of_int : int -> float", doc: "Converts an integer to a float." },
    "Float.to_int": { detail: "val to_int : float -> int", doc: "Truncates towards zero." },
    "Float.of_string": { detail: "val of_string : string -> float", doc: "Parses a float." },
    "Float.to_string": { detail: "val to_string : float -> string", doc: "Shortest round-tripping representation." },
    "Float.is_nan": { detail: "val is_nan : float -> bool", doc: "Whether the value is NaN." },
    "Float.is_infinite": { detail: "val is_infinite : float -> bool", doc: "Whether the value is an infinity." },
    "Float.is_integer": { detail: "val is_integer : float -> bool", doc: "Whether the value has no fractional part." },
    "Float.compare": { detail: "val compare : float -> float -> int", doc: "Total ordering of floats (`nan` compares equal to itself)." },
    "Float.equal": { detail: "val equal : float -> float -> bool", doc: "Bit-wise equality." },

    "Option.some": { detail: "val some : 'a -> 'a option", doc: "`some x` is `Some x`." },
    "Option.none": { detail: "val none : 'a option", doc: "`none` is `None`." },
    "Option.value": { detail: "val value : 'a option -> default:'a -> 'a", doc: "Contents of an option, or a default.\n\n```ocaml\nOption.value opt ~default:0\n```" },
    "Option.get": { detail: "val get : 'a option -> 'a", doc: "Contents of a `Some`; raises `Invalid_argument` on `None`." },
    "Option.map": { detail: "val map : ('a -> 'b) -> 'a option -> 'b option", doc: "Applies a function inside an option." },
    "Option.bind": { detail: "val bind : 'a option -> ('a -> 'b option) -> 'b option", doc: "Monadic bind for options." },
    "Option.join": { detail: "val join : 'a option option -> 'a option", doc: "Flattens a nested option." },
    "Option.fold": { detail: "val fold : none:'b -> some:('a -> 'b) -> 'a option -> 'b", doc: "Case analysis on an option." },
    "Option.iter": { detail: "val iter : ('a -> unit) -> 'a option -> unit", doc: "Runs a function on the contents, if any." },
    "Option.is_some": { detail: "val is_some : 'a option -> bool", doc: "True for `Some _`." },
    "Option.is_none": { detail: "val is_none : 'a option -> bool", doc: "True for `None`." },
    "Option.to_list": { detail: "val to_list : 'a option -> 'a list", doc: "`None` becomes `[]`, `Some x` becomes `[x]`." },
    "Option.to_result": { detail: "val to_result : none:'e -> 'a option -> ('a, 'e) result", doc: "Converts an option to a result." },
    "Option.compare": { detail: "val compare : ('a -> 'a -> int) -> 'a option -> 'a option -> int", doc: "Ordering, with `None` before `Some`." },
    "Option.equal": { detail: "val equal : ('a -> 'a -> bool) -> 'a option -> 'a option -> bool", doc: "Equality of two options." },

    "Result.ok": { detail: "val ok : 'a -> ('a, 'e) result", doc: "`ok x` is `Ok x`." },
    "Result.error": { detail: "val error : 'e -> ('a, 'e) result", doc: "`error e` is `Error e`." },
    "Result.map": { detail: "val map : ('a -> 'b) -> ('a, 'e) result -> ('b, 'e) result", doc: "Maps the success value." },
    "Result.map_error": { detail: "val map_error : ('e -> 'f) -> ('a, 'e) result -> ('a, 'f) result", doc: "Maps the error value." },
    "Result.bind": { detail: "val bind : ('a, 'e) result -> ('a -> ('b, 'e) result) -> ('b, 'e) result", doc: "Monadic bind for results." },
    "Result.join": { detail: "val join : (('a, 'e) result, 'e) result -> ('a, 'e) result", doc: "Flattens a nested result." },
    "Result.fold": { detail: "val fold : ok:('a -> 'c) -> error:('e -> 'c) -> ('a, 'e) result -> 'c", doc: "Case analysis on a result." },
    "Result.get_ok": { detail: "val get_ok : ('a, 'e) result -> 'a", doc: "Success value; raises `Invalid_argument` on `Error`." },
    "Result.is_ok": { detail: "val is_ok : ('a, 'e) result -> bool", doc: "True for `Ok _`." },
    "Result.is_error": { detail: "val is_error : ('a, 'e) result -> bool", doc: "True for `Error _`." },
    "Result.to_option": { detail: "val to_option : ('a, 'e) result -> 'a option", doc: "`Ok x` becomes `Some x`, `Error _` becomes `None`." },
    "Result.equal": { detail: "val equal : ('a -> 'a -> bool) -> ('e -> 'e -> bool) -> ('a, 'e) result -> ('a, 'e) result -> bool", doc: "Equality of two results." },

    "Printf.printf": { detail: "val printf : ('a, out_channel, unit) format -> 'a", doc: "Formatted output to standard output." },
    "Printf.eprintf": { detail: "val eprintf : ('a, out_channel, unit) format -> 'a", doc: "Formatted output to standard error." },
    "Printf.sprintf": { detail: "val sprintf : ('a, unit, string) format -> 'a", doc: "Formats into a string." },
    "Printf.fprintf": { detail: "val fprintf : out_channel -> ('a, out_channel, unit) format -> 'a", doc: "Formats into a channel." },
    "Printf.bprintf": { detail: "val bprintf : Buffer.t -> ('a, Buffer.t, unit) format -> 'a", doc: "Formats into a buffer." },
    "Printf.ksprintf": { detail: "val ksprintf : (string -> 'a) -> ('b, unit, string, 'a) format4 -> 'b", doc: "Like `sprintf` but passes the result to a continuation." },
    "Printf.scanf": { detail: "val scanf : ('a, Scanf.Scanning.in_channel, 'b, 'c, 'd, 'a) format6 -> 'd", doc: "Reads formatted input from standard input." },
    "Printf.sscanf": { detail: "val sscanf : string -> ('a, Scanf.Scanning.in_channel, 'b, 'c, 'd, 'a) format6 -> 'd", doc: "Reads formatted input from a string.\n\n```ocaml\nScanf.sscanf \"1 2\" \"%d %d\" (fun a b -> a + b)\n```" },

    "Format.printf": { detail: "val printf : ('a, Format.formatter, unit) format -> 'a", doc: "Pretty-prints with the Format engine." },
    "Format.sprintf": { detail: "val sprintf : ('a, unit, string) format -> 'a", doc: "Pretty-prints into a string." },
    "Format.asprintf": { detail: "val asprintf : ('a, Format.formatter, unit, string) format4 -> 'a", doc: "Pretty-prints into a `%a`-style string." },
    "Format.eprintf": { detail: "val eprintf : ('a, Format.formatter, unit) format -> 'a", doc: "Pretty-prints to standard error." },
    "Format.fprintf": { detail: "val fprintf : Format.formatter -> ('a, Format.formatter, unit) format -> 'a", doc: "Pretty-prints to a formatter." },
    "Format.pp_print_string": { detail: "val pp_print_string : Format.formatter -> string -> unit", doc: "Writes a string; use as a `%a` printer." },
    "Format.pp_print_int": { detail: "val pp_print_int : Format.formatter -> int -> unit", doc: "Writes an integer." },
    "Format.pp_print_float": { detail: "val pp_print_float : Format.formatter -> float -> unit", doc: "Writes a float." },
    "Format.pp_print_bool": { detail: "val pp_print_bool : Format.formatter -> bool -> unit", doc: "Writes a boolean." },
    "Format.pp_print_char": { detail: "val pp_print_char : Format.formatter -> char -> unit", doc: "Writes a character." },
    "Format.pp_print_newline": { detail: "val pp_print_newline : Format.formatter -> unit -> unit", doc: "Flushes the formatter and writes a newline." },
    "Format.pp_print_space": { detail: "val pp_print_space : Format.formatter -> unit -> unit", doc: "Emits a breakable space." },
    "Format.pp_print_list": { detail: "val pp_print_list : ?pp_sep:(Format.formatter -> unit -> unit) -> (Format.formatter -> 'a -> unit) -> Format.formatter -> 'a list -> unit", doc: "Prints a list of items." },
    "Format.pp_print_option": { detail: "val pp_print_option : ?none:(Format.formatter -> unit -> unit) -> (Format.formatter -> 'a -> unit) -> Format.formatter -> 'a option -> unit", doc: "Prints an option." },
    "Format.pp_print_text": { detail: "val pp_print_text : Format.formatter -> string -> unit", doc: "Prints text, breaking long lines." },

    "Hashtbl.create": { detail: "val create : ?random:bool -> int -> ('a, 'b) Hashtbl.t", doc: "Creates a hash table with the given initial size." },
    "Hashtbl.add": { detail: "val add : ('a, 'b) Hashtbl.t -> 'a -> 'b -> unit", doc: "Binds a key; an existing binding is shadowed, not replaced." },
    "Hashtbl.replace": { detail: "val replace : ('a, 'b) Hashtbl.t -> 'a -> 'b -> unit", doc: "Binds a key, removing any previous binding." },
    "Hashtbl.remove": { detail: "val remove : ('a, 'b) Hashtbl.t -> 'a -> unit", doc: "Removes the most recent binding of a key." },
    "Hashtbl.find": { detail: "val find : ('a, 'b) Hashtbl.t -> 'a -> 'b", doc: "Looks up a key; raises `Not_found`." },
    "Hashtbl.find_opt": { detail: "val find_opt : ('a, 'b) Hashtbl.t -> 'a -> 'b option", doc: "Option-returning lookup." },
    "Hashtbl.mem": { detail: "val mem : ('a, 'b) Hashtbl.t -> 'a -> bool", doc: "Whether the key is bound." },
    "Hashtbl.length": { detail: "val length : ('a, 'b) Hashtbl.t -> int", doc: "Number of bindings." },
    "Hashtbl.iter": { detail: "val iter : ('a -> 'b -> unit) -> ('a, 'b) Hashtbl.t -> unit", doc: "Iterates over the bindings in unspecified order." },
    "Hashtbl.fold": { detail: "val fold : ('a -> 'b -> 'acc -> 'acc) -> ('a, 'b) Hashtbl.t -> 'acc -> 'acc", doc: "Folds over the bindings." },
    "Hashtbl.reset": { detail: "val reset : ('a, 'b) Hashtbl.t -> unit", doc: "Empties the table." },
    "Hashtbl.clear": { detail: "val clear : ('a, 'b) Hashtbl.t -> unit", doc: "Empties the table (alias of `reset`)." },
    "Hashtbl.copy": { detail: "val copy : ('a, 'b) Hashtbl.t -> ('a, 'b) Hashtbl.t", doc: "Shallow copy of a table." },
    "Hashtbl.to_seq": { detail: "val to_seq : ('a, 'b) Hashtbl.t -> ('a * 'b) Seq.t", doc: "Sequence of the bindings." },
    "Hashtbl.of_seq": { detail: "val of_seq : ('a * 'b) Seq.t -> ('a, 'b) Hashtbl.t", doc: "Builds a table from a sequence of pairs." },

    "Map.empty": { detail: "val empty : 'k t", doc: "The empty map." },
    "Map.add": { detail: "val add : 'k -> 'v -> 'v t -> 'v t", doc: "Returns a map with the key bound to the value." },
    "Map.remove": { detail: "val remove : 'k -> 'v t -> 'v t", doc: "Returns a map without the key." },
    "Map.find": { detail: "val find : 'k -> 'v t -> 'v", doc: "Value bound to a key; raises `Not_found`." },
    "Map.find_opt": { detail: "val find_opt : 'k -> 'v t -> 'v option", doc: "Option-returning lookup." },
    "Map.mem": { detail: "val mem : 'k -> 'v t -> bool", doc: "Whether the key is bound." },
    "Map.update": { detail: "val update : 'k -> ('v option -> 'v option) -> 'v t -> 'v t", doc: "Replaces the binding of a key through a function." },
    "Map.cardinal": { detail: "val cardinal : 'v t -> int", doc: "Number of bindings." },
    "Map.bindings": { detail: "val bindings : 'v t -> ('k * 'v) list", doc: "All bindings, sorted by key." },
    "Map.keys": { detail: "val keys : 'v t -> 'k list", doc: "All keys in increasing order." },
    "Map.values": { detail: "val values : 'v t -> 'v list", doc: "All values, ordered by key." },
    "Map.iter": { detail: "val iter : ('k -> 'v -> unit) -> 'v t -> unit", doc: "Iterates in increasing key order." },
    "Map.fold": { detail: "val fold : ('k -> 'v -> 'acc -> 'acc) -> 'v t -> 'acc -> 'acc", doc: "Folds in increasing key order." },
    "Map.map": { detail: "val map : ('v -> 'w) -> 'v t -> 'w t", doc: "Maps the values, keeping the keys." },
    "Map.filter": { detail: "val filter : ('k -> 'v -> bool) -> 'v t -> 'v t", doc: "Keeps the bindings that satisfy the predicate." },
    "Map.merge": { detail: "val merge : ('k -> 'v option -> 'w option -> 'x option) -> 'v t -> 'w t -> 'x t", doc: "General merge of two maps." },
    "Map.union": { detail: "val union : ('k -> 'v -> 'v -> 'v option) -> 'v t -> 'v t -> 'v t", doc: "Combines two maps." },
    "Map.for_all": { detail: "val for_all : ('k -> 'v -> bool) -> 'v t -> bool", doc: "True when the predicate holds for every binding." },
    "Map.exists": { detail: "val exists : ('k -> 'v -> bool) -> 'v t -> bool", doc: "True when the predicate holds for some binding." },
    "Map.compare": { detail: "val compare : ('v -> 'v -> int) -> 'v t -> 'v t -> int", doc: "Total ordering of maps." },
    "Map.equal": { detail: "val equal : ('v -> 'v -> bool) -> 'v t -> 'v t -> bool", doc: "Equality of maps." },
    "Map.to_seq": { detail: "val to_seq : 'v t -> ('k * 'v) Seq.t", doc: "Sequence of the bindings in key order." },

    "Set.empty": { detail: "val empty : t", doc: "The empty set." },
    "Set.add": { detail: "val add : 'a -> t -> t", doc: "Returns a set with the element added." },
    "Set.remove": { detail: "val remove : 'a -> t -> t", doc: "Returns a set without the element." },
    "Set.mem": { detail: "val mem : 'a -> t -> bool", doc: "Membership." },
    "Set.union": { detail: "val union : t -> t -> t", doc: "Set union." },
    "Set.inter": { detail: "val inter : t -> t -> t", doc: "Set intersection." },
    "Set.diff": { detail: "val diff : t -> t -> t", doc: "Set difference." },
    "Set.subset": { detail: "val subset : t -> t -> bool", doc: "Whether the first set is a subset of the second." },
    "Set.disjoint": { detail: "val disjoint : t -> t -> bool", doc: "Whether two sets share no element." },
    "Set.cardinal": { detail: "val cardinal : t -> int", doc: "Number of elements." },
    "Set.elements": { detail: "val elements : t -> 'a list", doc: "All elements, in increasing order." },
    "Set.iter": { detail: "val iter : ('a -> unit) -> t -> unit", doc: "Iterates in increasing order." },
    "Set.fold": { detail: "val fold : ('a -> 'acc -> 'acc) -> t -> 'acc -> 'acc", doc: "Folds in increasing order." },
    "Set.map": { detail: "val map : ('a -> 'b) -> t -> 'b t", doc: "Maps the elements (the function must be injective)." },
    "Set.filter": { detail: "val filter : ('a -> bool) -> t -> t", doc: "Keeps the elements satisfying the predicate." },
    "Set.partition": { detail: "val partition : ('a -> bool) -> t -> t * t", doc: "Splits a set by a predicate." },
    "Set.min_elt": { detail: "val min_elt : t -> 'a", doc: "Smallest element; raises `Not_found` when empty." },
    "Set.max_elt": { detail: "val max_elt : t -> 'a", doc: "Largest element; raises `Not_found` when empty." },
    "Set.to_seq": { detail: "val to_seq : t -> 'a Seq.t", doc: "Sequence of the elements in increasing order." },
    "Set.of_list": { detail: "val of_list : 'a list -> t", doc: "Builds a set from a list." },
    "Set.equal": { detail: "val equal : t -> t -> bool", doc: "Equality of sets." },

    "Seq.empty": { detail: "val empty : 'a Seq.t", doc: "The empty sequence." },
    "Seq.return": { detail: "val return : 'a -> 'a Seq.t", doc: "A one-element sequence." },
    "Seq.cons": { detail: "val cons : 'a -> 'a Seq.t -> 'a Seq.t", doc: "Prepends an element, lazily." },
    "Seq.map": { detail: "val map : ('a -> 'b) -> 'a Seq.t -> 'b Seq.t", doc: "Lazy map." },
    "Seq.mapi": { detail: "val mapi : (int -> 'a -> 'b) -> 'a Seq.t -> 'b Seq.t", doc: "Lazy map with the index." },
    "Seq.filter": { detail: "val filter : ('a -> bool) -> 'a Seq.t -> 'a Seq.t", doc: "Lazy filter." },
    "Seq.filter_map": { detail: "val filter_map : ('a -> 'b option) -> 'a Seq.t -> 'b Seq.t", doc: "Lazy map + filter." },
    "Seq.flat_map": { detail: "val flat_map : ('a -> 'b Seq.t) -> 'a Seq.t -> 'b Seq.t", doc: "Lazy bind." },
    "Seq.fold_left": { detail: "val fold_left : ('acc -> 'a -> 'acc) -> 'acc -> 'a Seq.t -> 'acc", doc: "Left fold, forcing the sequence." },
    "Seq.iter": { detail: "val iter : ('a -> unit) -> 'a Seq.t -> unit", doc: "Forces the sequence, applying a function to each element." },
    "Seq.for_all": { detail: "val for_all : ('a -> bool) -> 'a Seq.t -> bool", doc: "Short-circuiting universal predicate." },
    "Seq.exists": { detail: "val exists : ('a -> bool) -> 'a Seq.t -> bool", doc: "Short-circuiting existential predicate." },
    "Seq.find": { detail: "val find : ('a -> bool) -> 'a Seq.t -> 'a", doc: "First matching element; raises `Not_found`." },
    "Seq.find_map": { detail: "val find_map : ('a -> 'b option) -> 'a Seq.t -> 'b option", doc: "First `Some` returned by the function." },
    "Seq.take": { detail: "val take : int -> 'a Seq.t -> 'a Seq.t", doc: "The first `n` elements." },
    "Seq.drop": { detail: "val drop : int -> 'a Seq.t -> 'a Seq.t", doc: "The sequence without its first `n` elements." },
    "Seq.take_while": { detail: "val take_while : ('a -> bool) -> 'a Seq.t -> 'a Seq.t", doc: "Longest prefix satisfying the predicate." },
    "Seq.drop_while": { detail: "val drop_while : ('a -> bool) -> 'a Seq.t -> 'a Seq.t", doc: "Removes the longest prefix satisfying the predicate." },
    "Seq.concat": { detail: "val concat : 'a Seq.t Seq.t -> 'a Seq.t", doc: "Flattens a sequence of sequences." },
    "Seq.of_list": { detail: "val of_list : 'a list -> 'a Seq.t", doc: "Sequence view of a list." },
    "Seq.to_list": { detail: "val to_list : 'a Seq.t -> 'a list", doc: "Forces a sequence into a list." },
    "Seq.of_array": { detail: "val of_array : 'a array -> 'a Seq.t", doc: "Sequence view of an array." },
    "Seq.to_array": { detail: "val to_array : 'a Seq.t -> 'a array", doc: "Forces a sequence into an array." },
    "Seq.unfold": { detail: "val unfold : ('b -> ('a * 'b) option) -> 'b -> 'a Seq.t", doc: "Builds a sequence from a step function." },
    "Seq.repeat": { detail: "val repeat : 'a -> 'a Seq.t", doc: "An infinite sequence of one value." },
    "Seq.cycle": { detail: "val cycle : 'a Seq.t -> 'a Seq.t", doc: "Repeats a non-empty sequence forever." },
    "Seq.memoize": { detail: "val memoize : 'a Seq.t -> 'a Seq.t", doc: "Caches the elements as they are produced." },
    "Seq.length": { detail: "val length : 'a Seq.t -> int", doc: "Number of elements (forces the sequence)." },
    "Seq.nth": { detail: "val nth : int -> 'a Seq.t -> 'a option", doc: "Element at an index, if any." },
    "Seq.zip": { detail: "val zip : 'a Seq.t -> 'b Seq.t -> ('a * 'b) Seq.t", doc: "Pairs up two sequences." },
    "Seq.unzip": { detail: "val unzip : ('a * 'b) Seq.t -> 'a Seq.t * 'b Seq.t", doc: "Splits a sequence of pairs." },
    "Seq.init": { detail: "val init : int -> (int -> 'a) -> 'a Seq.t", doc: "Builds a sequence from a function of the index." },

    "Buffer.create": { detail: "val create : int -> Buffer.t", doc: "Creates a buffer with the given initial size." },
    "Buffer.contents": { detail: "val contents : Buffer.t -> string", doc: "Copies the buffer's contents into a string." },
    "Buffer.add_string": { detail: "val add_string : Buffer.t -> string -> unit", doc: "Appends a string." },
    "Buffer.add_char": { detail: "val add_char : Buffer.t -> char -> unit", doc: "Appends a character." },
    "Buffer.add_bytes": { detail: "val add_bytes : Buffer.t -> bytes -> unit", doc: "Appends a byte sequence." },
    "Buffer.add_buffer": { detail: "val add_buffer : Buffer.t -> Buffer.t -> unit", doc: "Appends another buffer." },
    "Buffer.length": { detail: "val length : Buffer.t -> int", doc: "Number of bytes currently stored." },
    "Buffer.clear": { detail: "val clear : Buffer.t -> unit", doc: "Empties the buffer." },
    "Buffer.reset": { detail: "val reset : Buffer.t -> unit", doc: "Empties the buffer (alias of `clear`)." },
    "Buffer.sub": { detail: "val sub : Buffer.t -> int -> int -> string", doc: "Copies a substring out of the buffer." },
    "Buffer.nth": { detail: "val nth : Buffer.t -> int -> char", doc: "Byte at an index." },
    "Buffer.blit": { detail: "val blit : Buffer.t -> int -> bytes -> int -> int -> unit", doc: "Copies a slice of the buffer into bytes." },
    "Buffer.to_bytes": { detail: "val to_bytes : Buffer.t -> bytes", doc: "Copies the contents into a byte sequence." },

    "Filename.concat": { detail: "val concat : string -> string -> string", doc: "Joins two path components with the platform separator." },
    "Filename.basename": { detail: "val basename : string -> string", doc: "Final component of a path." },
    "Filename.dirname": { detail: "val dirname : string -> string", doc: "Directory part of a path." },
    "Filename.extension": { detail: "val extension : string -> string", doc: "Extension of a file name, including the dot (or empty)." },
    "Filename.remove_extension": { detail: "val remove_extension : string -> string", doc: "File name without its extension." },
    "Filename.chop_extension": { detail: "val chop_extension : string -> string", doc: "Deprecated alias of `remove_extension`." },
    "Filename.temp_file": { detail: "val temp_file : ?temp_dir:string -> string -> string -> string", doc: "Creates and returns a fresh temporary file name." },
    "Filename.current_dir_name": { detail: "val current_dir_name : string", doc: "The current directory, `\".\"`." },
    "Filename.parent_dir_name": { detail: "val parent_dir_name : string", doc: "The parent directory, `\"..\"`." },
    "Filename.dir_sep": { detail: "val dir_sep : string", doc: "The directory separator (`\"/\"` on Unix)." },
    "Filename.is_relative": { detail: "val is_relative : string -> bool", doc: "Whether a path is relative." },
    "Filename.quote": { detail: "val quote : string -> string", doc: "Shell-quotes a string." },
    "Filename.check_suffix": { detail: "val check_suffix : string -> string -> bool", doc: "Whether a file name ends with the suffix." },
    "Filename.open_temp_file": { detail: "val open_temp_file : ?temp_dir:string -> string -> string -> string * out_channel", doc: "Creates a temporary file and opens it for writing." },

    "Sys.argv": { detail: "val argv : string array", doc: "The command-line arguments; `argv.(0)` is the program name." },
    "Sys.getenv": { detail: "val getenv : string -> string", doc: "Value of an environment variable; raises `Not_found`." },
    "Sys.getenv_opt": { detail: "val getenv_opt : string -> string option", doc: "Option-returning `getenv`." },
    "Sys.putenv": { detail: "val putenv : string -> string -> unit", doc: "Sets an environment variable." },
    "Sys.file_exists": { detail: "val file_exists : string -> bool", doc: "Whether the file exists." },
    "Sys.is_directory": { detail: "val is_directory : string -> bool", doc: "Whether the path is a directory." },
    "Sys.readdir": { detail: "val readdir : string -> string array", doc: "Entries of a directory (unsorted, `.` and `..` included)." },
    "Sys.remove": { detail: "val remove : string -> unit", doc: "Deletes a file." },
    "Sys.rename": { detail: "val rename : string -> string -> unit", doc: "Renames a file." },
    "Sys.getcwd": { detail: "val getcwd : unit -> string", doc: "The current working directory." },
    "Sys.chdir": { detail: "val chdir : string -> unit", doc: "Changes the current working directory." },
    "Sys.mkdir": { detail: "val mkdir : string -> int -> unit", doc: "Creates a directory with the given permissions." },
    "Sys.time": { detail: "val time : unit -> float", doc: "Processor time used so far, in seconds." },
    "Sys.command": { detail: "val command : string -> int", doc: "Runs a shell command and returns its exit status." },
    "Sys.interactive": { detail: "val interactive : bool ref", doc: "Whether the program runs in the toplevel." },
    "Sys.word_size": { detail: "val word_size : int", doc: "Size of one word in bits (32 or 64)." },
    "Sys.max_string_length": { detail: "val max_string_length : int", doc: "Longest possible string." },
    "Sys.os_type": { detail: "val os_type : string", doc: "`\"Unix\"`, `\"Win32\"` or `\"Cygwin\"`." },
    "Sys.executable_name": { detail: "val executable_name : string", doc: "Name of the running executable." },
    "Sys.sigint": { detail: "val sigint : int", doc: "Signal number for SIGINT." },
    "Sys.sigterm": { detail: "val sigterm : int", doc: "Signal number for SIGTERM." },
    "Sys.set_signal": { detail: "val set_signal : int -> Sys.signal_behavior -> unit", doc: "Sets the behaviour for a signal." },

    "Random.int": { detail: "val int : int -> int", doc: "A random integer in `[0, bound)`." },
    "Random.float": { detail: "val float : float -> float", doc: "A random float in `[0, bound)`." },
    "Random.bool": { detail: "val bool : unit -> bool", doc: "A random boolean." },
    "Random.init": { detail: "val init : int -> unit", doc: "Seeds the PRNG deterministically." },
    "Random.self_init": { detail: "val self_init : unit -> unit", doc: "Seeds the PRNG from the system entropy." },
    "Random.bits": { detail: "val bits : unit -> int", doc: "30 random bits as an integer." },
    "Random.list": { detail: "val list : (unit -> 'a) -> int -> 'a list", doc: "Builds a random list from a generator." },

    "Lazy.force": { detail: "val force : 'a Lazy.t -> 'a", doc: "Evaluates a lazy value (once) and returns its result." },
    "Lazy.from_val": { detail: "val from_val : 'a -> 'a Lazy.t", doc: "An already-computed lazy value." },
    "Lazy.from_fun": { detail: "val from_fun : (unit -> 'a) -> 'a Lazy.t", doc: "A lazy value computed on demand." },
    "Lazy.is_val": { detail: "val is_val : 'a Lazy.t -> bool", doc: "Whether the lazy value has already been forced." },

    "Queue.create": { detail: "val create : unit -> 'a Queue.t", doc: "Creates an empty FIFO queue." },
    "Queue.add": { detail: "val add : 'a -> 'a Queue.t -> unit", doc: "Enqueues an element." },
    "Queue.push": { detail: "val push : 'a -> 'a Queue.t -> unit", doc: "Enqueues an element (alias of `add`)." },
    "Queue.pop": { detail: "val pop : 'a Queue.t -> 'a", doc: "Dequeues the front element; raises `Queue.Empty`." },
    "Queue.pop_opt": { detail: "val pop_opt : 'a Queue.t -> 'a option", doc: "Option-returning `pop`." },
    "Queue.peek": { detail: "val peek : 'a Queue.t -> 'a", doc: "Front element without removing it." },
    "Queue.peek_opt": { detail: "val peek_opt : 'a Queue.t -> 'a option", doc: "Option-returning `peek`." },
    "Queue.is_empty": { detail: "val is_empty : 'a Queue.t -> bool", doc: "Whether the queue is empty." },
    "Queue.length": { detail: "val length : 'a Queue.t -> int", doc: "Number of elements." },
    "Queue.iter": { detail: "val iter : ('a -> unit) -> 'a Queue.t -> unit", doc: "Iterates from front to back." },
    "Queue.fold": { detail: "val fold : ('acc -> 'a -> 'acc) -> 'acc -> 'a Queue.t -> 'acc", doc: "Folds from front to back." },
    "Queue.transfer": { detail: "val transfer : 'a Queue.t -> 'a Queue.t -> unit", doc: "Moves all elements to another queue." },
    "Queue.to_seq": { detail: "val to_seq : 'a Queue.t -> 'a Seq.t", doc: "Breadth-first sequence view." },

    "Stack.create": { detail: "val create : unit -> 'a Stack.t", doc: "Creates an empty LIFO stack." },
    "Stack.push": { detail: "val push : 'a -> 'a Stack.t -> unit", doc: "Pushes an element onto the top." },
    "Stack.pop": { detail: "val pop : 'a Stack.t -> 'a", doc: "Removes and returns the top element; raises `Stack.Empty`." },
    "Stack.pop_opt": { detail: "val pop_opt : 'a Stack.t -> 'a option", doc: "Option-returning `pop`." },
    "Stack.top": { detail: "val top : 'a Stack.t -> 'a", doc: "Top element without removing it." },
    "Stack.top_opt": { detail: "val top_opt : 'a Stack.t -> 'a option", doc: "Option-returning `top`." },
    "Stack.is_empty": { detail: "val is_empty : 'a Stack.t -> bool", doc: "Whether the stack is empty." },
    "Stack.length": { detail: "val length : 'a Stack.t -> int", doc: "Number of elements." },
    "Stack.iter": { detail: "val iter : ('a -> unit) -> 'a Stack.t -> unit", doc: "Iterates from top to bottom." },
    "Stack.fold": { detail: "val fold : ('acc -> 'a -> 'acc) -> 'acc -> 'a Stack.t -> 'acc", doc: "Folds from top to bottom." },
    "Stack.to_seq": { detail: "val to_seq : 'a Stack.t -> 'a Seq.t", doc: "Sequence view from top to bottom." },

    "Fun.id": { detail: "val id : 'a -> 'a", doc: "The identity function." },
    "Fun.const": { detail: "val const : 'a -> 'b -> 'a", doc: "`const x` is the function that always returns `x`." },
    "Fun.flip": { detail: "val flip : ('a -> 'b -> 'c) -> 'b -> 'a -> 'c", doc: "Swaps the arguments of a two-argument function." },
    "Fun.negate": { detail: "val negate : ('a -> bool) -> 'a -> bool", doc: "Negates a boolean predicate." },

    "Either.left": { detail: "val left : 'a -> ('a, 'b) Either.t", doc: "`Either.Left x`." },
    "Either.right": { detail: "val right : 'b -> ('a, 'b) Either.t", doc: "`Either.Right x`." },
    "Either.map": { detail: "val map : ('a -> 'b) -> ('a, 'c) Either.t -> ('b, 'c) Either.t", doc: "Maps a `Right` value." },
    "Either.map_left": { detail: "val map_left : ('a -> 'b) -> ('a, 'c) Either.t -> ('b, 'c) Either.t", doc: "Maps a `Left` value." },
    "Either.is_left": { detail: "val is_left : ('a, 'b) Either.t -> bool", doc: "True for `Left _`." },
    "Either.is_right": { detail: "val is_right : ('a, 'b) Either.t -> bool", doc: "True for `Right _`." },
    "Either.to_option": { detail: "val to_option : ('a, 'b) Either.t -> 'b option", doc: "`Right x` becomes `Some x`." },
    "Either.bind": { detail: "val bind : ('a, 'b) Either.t -> ('a -> ('c, 'b) Either.t) -> ('c, 'b) Either.t", doc: "Monadic bind for either." },

    "Printexc.to_string": { detail: "val to_string : exn -> string", doc: "Printable representation of an exception." },
    "Printexc.print": { detail: "val print : ('a -> 'b) -> 'a -> 'b", doc: "Applies a function, printing an exception if it raises." },
    "Printexc.record_backtrace": { detail: "val record_backtrace : bool -> unit", doc: "Enables or disables backtrace recording." },
    "Printexc.get_backtrace": { detail: "val get_backtrace : unit -> string", doc: "The backtrace recorded for the current exception." },
    "Printexc.print_backtrace": { detail: "val print_backtrace : out_channel -> unit", doc: "Prints the recorded backtrace." },
    "Printexc.register_printer": { detail: "val register_printer : (exn -> string option) -> unit", doc: "Registers a custom printer for exceptions." },

    "In_channel.input_line": { detail: "val input_line : t -> string option", doc: "Reads a line, returning `None` at the end of input." },
    "In_channel.input_all": { detail: "val input_all : t -> string", doc: "Reads the whole channel." },
    "In_channel.with_open_text": { detail: "val with_open_text : string -> (t -> 'a) -> 'a", doc: "Runs a function with a text channel, closing it afterwards." },
    "In_channel.with_open_bin": { detail: "val with_open_bin : string -> (t -> 'a) -> 'a", doc: "Runs a function with a binary channel, closing it afterwards." },
    "In_channel.fold_lines": { detail: "val fold_lines : ('acc -> string -> 'acc) -> 'acc -> t -> 'acc", doc: "Folds a function over the lines of a channel." },
    "In_channel.length": { detail: "val length : t -> int", doc: "Length of the channel, in bytes." },
    "In_channel.close": { detail: "val close : t -> unit", doc: "Closes the channel." },

    "Out_channel.output_string": { detail: "val output_string : t -> string -> unit", doc: "Writes a string to the channel." },
    "Out_channel.output_char": { detail: "val output_char : t -> char -> unit", doc: "Writes a character." },
    "Out_channel.output_byte": { detail: "val output_byte : t -> int -> unit", doc: "Writes a byte." },
    "Out_channel.newline": { detail: "val newline : t -> unit", doc: "Writes a newline." },
    "Out_channel.flush": { detail: "val flush : t -> unit", doc: "Flushes any buffered output." },
    "Out_channel.with_open_text": { detail: "val with_open_text : string -> (t -> 'a) -> 'a", doc: "Runs a function with a text channel, closing it afterwards." },
    "Out_channel.with_open_bin": { detail: "val with_open_bin : string -> (t -> 'a) -> 'a", doc: "Runs a function with a binary channel, closing it afterwards." },
    "Out_channel.close": { detail: "val close : t -> unit", doc: "Flushes and closes the channel." },

    "Marshal.to_string": { detail: "val to_string : 'a -> Marshal.extern_flags list -> string", doc: "Serializes a value into a string." },
    "Marshal.to_bytes": { detail: "val to_bytes : 'a -> Marshal.extern_flags list -> bytes", doc: "Serializes a value into a byte sequence." },
    "Marshal.from_string": { detail: "val from_string : string -> int -> 'a", doc: "Deserializes a value from a string at the given offset." },
    "Marshal.from_bytes": { detail: "val from_bytes : bytes -> int -> 'a", doc: "Deserializes a value from bytes." },
    "Marshal.to_channel": { detail: "val to_channel : out_channel -> 'a -> Marshal.extern_flags list -> unit", doc: "Serializes a value into a channel." },
    "Marshal.from_channel": { detail: "val from_channel : in_channel -> 'a", doc: "Deserializes a value from a channel." },

    "Arg.parse": { detail: "val parse : (string * Arg.spec * string) list -> (string -> unit) -> string -> unit", doc: "Parses the command line according to a specification." },
    "Arg.usage": { detail: "val usage : (string * Arg.spec * string) list -> string -> unit", doc: "Prints the usage message." },
    "Arg.align": { detail: "val align : (string * Arg.spec * string) list -> (string * Arg.spec * string) list", doc: "Aligns the documentation column of a spec list." },
    "Arg.Int": { detail: "val int : (int -> unit) -> Arg.spec", doc: "An `-flag` option taking an integer." },
    "Arg.String": { detail: "val string : (string -> unit) -> Arg.spec", doc: "An `-flag` option taking a string." },
    "Arg.Float": { detail: "val float : (float -> unit) -> Arg.spec", doc: "An `-flag` option taking a float." },
    "Arg.Bool": { detail: "val bool : (bool -> unit) -> Arg.spec", doc: "An option taking an explicit boolean argument." },
    "Arg.Unit": { detail: "val unit : (unit -> unit) -> Arg.spec", doc: "An option taking no argument." },
    "Arg.Set": { detail: "val set : bool ref -> Arg.spec", doc: "An option that sets a reference to `true`." },
    "Arg.Clear": { detail: "val clear : bool ref -> Arg.spec", doc: "An option that sets a reference to `false`." },
    "Arg.Rest": { detail: "val rest : (string -> unit) -> Arg.spec", doc: "Collects the remaining arguments one by one." },
    "Arg.Symbol": { detail: "val symbol : string list -> (string -> unit) -> Arg.spec", doc: "An option restricted to a list of symbols." },
    "Arg.bad": { detail: "val bad : string -> unit", doc: "Prints an error message and exits with status 2." },

    "Uchar.of_int": { detail: "val of_int : int -> Uchar.t", doc: "Unicode scalar value from a code point." },
    "Uchar.to_int": { detail: "val to_int : Uchar.t -> int", doc: "Code point of a Unicode scalar value." },
    "Uchar.utf_8_byte_length": { detail: "val utf_8_byte_length : Uchar.t -> int", doc: "Length of the value encoded as UTF-8, in bytes." },
  };

  // Members offered after a `Module.` prefix.
  const MODULE_MEMBERS: Record<string, string[]> = {
    List: [
      "length", "rev", "map", "mapi", "rev_map", "filter", "filteri", "filter_map",
      "fold_left", "fold_right", "iter", "iteri", "for_all", "exists", "mem",
      "find", "find_opt", "find_map", "assoc", "assoc_opt", "mem_assoc", "remove_assoc",
      "sort", "stable_sort", "sort_uniq", "concat", "concat_map", "flatten", "append",
      "hd", "tl", "nth", "nth_opt", "take", "drop", "partition", "split", "combine",
      "init", "rev_append", "compare_lengths", "compare_length_with", "to_seq", "of_seq",
    ],
    Array: [
      "length", "get", "set", "make", "create_float", "init", "append", "concat", "sub",
      "copy", "blit", "fill", "of_list", "to_list", "iter", "iteri", "map", "mapi",
      "fold_left", "fold_right", "for_all", "exists", "mem", "find_opt", "sort",
      "stable_sort", "to_seq", "of_seq", "get_float", "set_float",
    ],
    String: [
      "length", "get", "make", "copy", "sub", "concat", "iter", "iteri", "map", "mapi",
      "fold_left", "fold_right", "for_all", "exists", "contains", "index", "index_opt",
      "rindex", "rindex_opt", "split_on_char", "trim", "uppercase_ascii",
      "lowercase_ascii", "capitalize_ascii", "uncapitalize_ascii", "compare", "equal",
      "starts_with", "ends_with", "escape", "escaped", "to_seq", "of_seq", "blit", "fill",
      "mem", "cat", "iteri", "get_utf_8_uchar",
    ],
    Bytes: [
      "length", "get", "set", "make", "create", "of_string", "to_string", "sub", "blit",
      "fill", "copy", "concat", "iter", "iteri", "map", "mapi", "fold_left", "fold_right",
      "for_all", "exists", "trim", "uppercase_ascii", "lowercase_ascii",
      "capitalize_ascii", "get_uint8", "set_uint8", "get_int8", "set_int8", "compare",
      "equal", "to_seq", "of_seq", "index", "contains",
    ],
    Char: [
      "code", "chr", "escaped", "lowercase_ascii", "uppercase_ascii", "compare", "equal",
    ],
    Int: [
      "abs", "max_int", "min_int", "zero", "one", "minus_one", "neg", "add", "sub", "mul",
      "div", "rem", "succ", "pred", "compare", "equal", "min", "max", "to_string",
      "of_string", "to_float", "of_float", "logor", "logand", "logxor", "shift_left",
      "shift_right", "popcount", "unsigned_to_int",
    ],
    Float: [
      "pi", "infinity", "neg_infinity", "nan", "max_float", "min_float", "epsilon",
      "zero", "one", "neg", "abs", "sqrt", "pow", "exp", "log", "log10", "log2",
      "sin", "cos", "tan", "asin", "acos", "atan", "atan2", "hypot", "ceil", "floor",
      "round", "trunc", "of_int", "to_int", "of_string", "to_string", "is_nan",
      "is_infinite", "is_integer", "compare", "equal", "min", "max", "classify_float",
      "frexp", "ldexp",
    ],
    Option: [
      "some", "none", "value", "get", "map", "bind", "join", "fold", "iter", "is_some",
      "is_none", "to_list", "to_result", "compare", "equal",
    ],
    Result: [
      "ok", "error", "value", "get_ok", "get_error", "map", "map_error", "bind", "join",
      "fold", "iter", "iter_error", "is_ok", "is_error", "to_option", "compare", "equal",
    ],
    Printf: [
      "printf", "eprintf", "sprintf", "fprintf", "bprintf", "ifprintf", "ksprintf",
      "kfprintf", "kbprintf", "scanf", "sscanf", "fscanf", "bscanf", "scanf_opt",
    ],
    Scanf: ["scanf", "sscanf", "fscanf", "bscanf", "kscanf", "Scanning"],
    Format: [
      "printf", "eprintf", "sprintf", "asprintf", "fprintf", "kprintf", "kasprintf",
      "pp_print_string", "pp_print_int", "pp_print_float", "pp_print_bool",
      "pp_print_char", "pp_print_newline", "pp_print_space", "pp_print_cut",
      "pp_print_break", "pp_print_list", "pp_print_option", "pp_print_text",
      "pp_print_flush", "pp_open_box", "pp_close_box", "pp_open_hvbox", "pp_open_hovbox",
      "pp_open_vbox", "formatter_of_out_channel", "get_std_formatter",
      "get_err_formatter", "str_formatter", "flush_str_formatter",
    ],
    Hashtbl: [
      "create", "of_seq", "clear", "reset", "copy", "add", "remove", "find", "find_opt",
      "find_all", "mem", "length", "iter", "fold", "replace", "to_seq", "to_seq_keys",
      "to_seq_values", "randomize", "stats", "hash", "rebuild", "add_seq", "replace_seq",
    ],
    Map: [
      "empty", "is_empty", "mem", "add", "remove", "find", "find_opt", "find_first",
      "find_first_opt", "find_last", "find_last_opt", "update", "cardinal", "bindings",
      "keys", "values", "min_binding", "min_binding_opt", "max_binding", "max_binding_opt",
      "choose", "choose_opt", "iter", "fold", "for_all", "exists", "filter", "partition",
      "merge", "union", "compare", "equal", "map", "mapi", "to_seq", "of_seq", "add_to_list",
      "singleton", "of_list", "hash",
    ],
    Set: [
      "empty", "is_empty", "mem", "add", "remove", "singleton", "union", "inter", "diff",
      "cardinal", "elements", "min_elt", "min_elt_opt", "max_elt", "max_elt_opt", "choose",
      "choose_opt", "find_first", "find_first_opt", "find_last", "find_last_opt", "iter",
      "fold", "for_all", "exists", "filter", "partition", "split", "subset", "disjoint",
      "equal", "compare", "map", "of_list", "to_seq", "of_seq", "to_list", "union_",
    ],
    Seq: [
      "empty", "return", "cons", "append", "map", "mapi", "filter", "filter_map",
      "flat_map", "fold_left", "iter", "for_all", "exists", "find", "find_map", "find_index",
      "take", "drop", "take_while", "drop_while", "concat", "of_list", "to_list",
      "of_array", "to_array", "unfold", "repeat", "forever", "cycle", "memoize", "length",
      "nth", "nth_opt", "get", "zip", "unzip", "init", "of_seq", "add_seq", "partition",
      "group", "once", "interval",
    ],
    Buffer: [
      "create", "contents", "length", "clear", "reset", "add_char", "add_string",
      "add_bytes", "add_substring", "add_buffer", "add_channel", "nth", "sub", "blit",
      "to_bytes", "output_buffer", "add_utf_8_uchar", "add_int8", "add_int16", "add_int32",
      "add_int64", "add_uint8",
    ],
    Filename: [
      "concat", "basename", "dirname", "chop_suffix", "chop_suffix_opt",
      "chop_extension", "extension", "remove_extension", "quote", "quote_command",
      "temp_file", "open_temp_file", "current_dir_name", "parent_dir_name", "dir_sep",
      "is_relative", "is_implicit", "check_suffix", "extension_safe",
    ],
    Sys: [
      "argv", "executable_name", "command", "file_exists", "is_directory", "getenv",
      "getenv_opt", "putenv", "remove", "rename", "getcwd", "chdir", "mkdir", "rmdir",
      "readdir", "time", "word_size", "max_string_length", "os_type", "interactive",
      "set_signal", "sigint", "sigterm", "exit", "catch_break", "ocaml_version",
      "int_size", "max_array_length",
    ],
    Random: [
      "init", "self_init", "bits", "int", "int32", "int64", "float", "bool", "list",
      "full_init", "state", "get_state", "set_state", "split", "nativeint",
    ],
    Lazy: ["force", "from_val", "from_fun", "is_val", "map"],
    Queue: [
      "create", "add", "push", "push_back", "pop", "pop_opt", "peek", "peek_opt", "top",
      "top_opt", "is_empty", "length", "iter", "fold", "transfer", "clear", "copy",
      "to_seq", "of_seq", "add_seq", "get", "get_opt", "take", "take_opt", "drop",
    ],
    Stack: [
      "create", "push", "pop", "pop_opt", "top", "top_opt", "is_empty", "length", "iter",
      "fold", "clear", "copy", "to_seq", "of_seq", "add_seq",
    ],
    Fun: ["id", "const", "flip", "negate"],
    Either: ["left", "right", "bind", "join", "map", "map_left", "to_option", "equal", "compare", "fold", "is_left", "is_right"],
    Printexc: [
      "to_string", "print", "catch", "print_backtrace", "get_backtrace",
      "record_backtrace", "raise_with_backtrace", "register_printer", "exn_slot_name",
      "raw_backtrace_to_string", "backtrace_slots",
    ],
    In_channel: [
      "input_char", "input_line", "input_byte", "input", "really_input_string",
      "input_all", "length", "close", "with_open_bin", "with_open_text", "seek", "pos",
      "fold_lines",
    ],
    Out_channel: [
      "output_char", "output_string", "output_byte", "output", "flush", "close",
      "with_open_bin", "with_open_text", "newline", "seek", "pos", "length", "output_substring",
    ],
    Marshal: ["to_string", "to_bytes", "to_channel", "from_string", "from_bytes", "from_channel", "header_size", "data_size"],
    Arg: [
      "parse", "parse_argv", "parse_argv_dynamic", "parse_dynamic", "usage", "usage_string",
      "align", "current", "read_arg", "Int", "String", "Float", "Bool", "Unit", "Set",
      "Clear", "Rest", "Rest_all", "Tuple", "Symbol", "Expand", "bad", "usage_msg",
    ],
    Uchar: ["of_int", "to_int", "utf_8_byte_length", "utf_16_byte_length", "utf_decode", "utf_8_decode"],
  };

  // ────────────────────────────────────────────────────────────────────
  //  5. CODE SNIPPETS
  // ────────────────────────────────────────────────────────────────────
  const snippets = [
    {
      label: "let",
      detail: "Value binding",
      insertText: "let ${1:name} = ${0:value}",
      doc: "Binds a value.",
    },
    {
      label: "letf",
      detail: "Function binding",
      insertText: "let ${1:name} ${2:args} =\n  ${0:body}",
      doc: "Binds a function.",
    },
    {
      label: "letrec",
      detail: "Recursive function",
      insertText: "let rec ${1:name} ${2:args} =\n  ${0:body}",
      doc: "Binds a recursive function.",
    },
    {
      label: "letin",
      detail: "Local binding",
      insertText: "let ${1:name} = ${2:value} in\n${0:body}",
      doc: "A local binding used in an expression.",
    },
    {
      label: "letmain",
      detail: "Program entry point",
      insertText: 'let () =\n  ${0:print_endline "Hello, world!"}',
      doc: "The conventional entry point of an OCaml program.",
    },
    {
      label: "and",
      detail: "Mutually recursive binding",
      insertText: "and ${1:name} ${2:args} =\n  ${0:body}",
      doc: "Continues a mutually recursive group.",
    },
    {
      label: "type",
      detail: "Type alias",
      insertText: "type ${1:name} = ${0:int}",
      doc: "Declares a type abbreviation.",
    },
    {
      label: "variant",
      detail: "Variant type",
      insertText: "type ${1:name} =\n  | ${2:Constructor} of ${3:int}\n  | ${0:Empty}",
      doc: "Declares a variant type with constructors.",
    },
    {
      label: "record",
      detail: "Record type",
      insertText: "type ${1:name} = {\n  ${2:field} : ${3:int};\n  ${0:other} : ${4:string};\n}",
      doc: "Declares a record type.",
    },
    {
      label: "mutablerecord",
      detail: "Record with a mutable field",
      insertText: "type ${1:name} = {\n  mutable ${2:count} : ${3:int};\n}",
      doc: "Declares a record with an assignable field.",
    },
    {
      label: "module",
      detail: "Module definition",
      insertText: "module ${1:Name} = struct\n  ${0}\nend",
      doc: "Declares a module.",
    },
    {
      label: "moduletype",
      detail: "Module signature",
      insertText: "module type ${1:S} = sig\n  ${0}\nend",
      doc: "Declares a module signature.",
    },
    {
      label: "functor",
      detail: "Functor",
      insertText: "module ${1:Make} (${2:X} : ${3:S}) = struct\n  ${0}\nend",
      doc: "A module parameterised by another module.",
    },
    {
      label: "val",
      detail: "Signature value",
      insertText: "val ${1:name} : ${0:type}",
      doc: "Declares a value in a signature (.mli).",
    },
    {
      label: "match",
      detail: "Match expression",
      insertText: "match ${1:expr} with\n| ${2:pattern} -> ${3:result}\n| _ -> ${0:default}",
      doc: "Pattern matches on a value.",
    },
    {
      label: "function",
      detail: "Match on the argument",
      insertText: "function\n| ${1:pattern} -> ${2:result}\n| _ -> ${0:default}",
      doc: "An anonymous function defined by cases.",
    },
    {
      label: "lambda",
      detail: "Anonymous function",
      insertText: "fun ${1:x} -> ${0:body}",
      doc: "A single-argument anonymous function.",
    },
    {
      label: "if",
      detail: "Conditional",
      insertText: "if ${1:cond} then ${2:value} else ${0:other}",
      doc: "A conditional expression; the branches must agree in type.",
    },
    {
      label: "ifelse",
      detail: "Multi-line conditional",
      insertText: "if ${1:cond} then\n  ${2:value}\nelse\n  ${0:other}",
      doc: "A conditional spread over several lines.",
    },
    {
      label: "try",
      detail: "Exception handler",
      insertText: "try ${1:expr} with\n| ${2:Not_found} -> ${0:default}",
      doc: "Handles exceptions raised while evaluating an expression.",
    },
    {
      label: "for",
      detail: "For loop",
      insertText: "for ${1:i} = ${2:0} to ${3:n} do\n  ${0:()}\ndone",
      doc: "Iterates over an inclusive integer range.",
    },
    {
      label: "while",
      detail: "While loop",
      insertText: "while ${1:cond} do\n  ${0:()}\ndone",
      doc: "Repeats a unit expression while the condition holds.",
    },
    {
      label: "exception",
      detail: "Exception declaration",
      insertText: "exception ${1:Error} of ${0:string}",
      doc: "Declares an exception constructor.",
    },
    {
      label: "printf",
      detail: "Formatted print",
      insertText: 'Printf.printf "${1:%s}\\n" ${0:value}',
      doc: "Prints with a format string.",
    },
    {
      label: "sprintf",
      detail: "Format into a string",
      insertText: 'Printf.sprintf "${1:%d}" ${0:value}',
      doc: "Builds a string from a format.",
    },
    {
      label: "listmap",
      detail: "List.map pipeline",
      insertText: "List.map (fun ${1:x} -> ${0:x + 1}) ${2:xs}",
      doc: "Applies a function to every element of a list.",
    },
    {
      label: "listiter",
      detail: "List.iter pipeline",
      insertText: "List.iter (fun ${1:x} -> ${0:print_endline x}) ${2:xs}",
      doc: "Runs a function on every element for its side effect.",
    },
    {
      label: "fold",
      detail: "Fold over a list",
      insertText: "List.fold_left (fun ${1:acc} ${2:x} -> ${3:acc + x}) ${4:0} ${0:xs}",
      doc: "Reduces a list to a single value.",
    },
    {
      label: "pipe",
      detail: "Pipeline",
      insertText: "${1:value}\n|> ${2:List.map} ${3:f}\n|> ${0:List.iter print_endline}",
      doc: "Chains computations with the `|>` operator.",
    },
    {
      label: "option",
      detail: "Option handling",
      insertText: "match ${1:opt} with\n| Some ${2:x} -> ${3:x}\n| None -> ${0:default}",
      doc: "Pattern matches on an option.",
    },
    {
      label: "result",
      detail: "Result handling",
      insertText: "match ${1:res} with\n| Ok ${2:v} -> ${3:v}\n| Error ${4:e} -> ${0:0}",
      doc: "Pattern matches on a result.",
    },
    {
      label: "open",
      detail: "Open a module",
      insertText: "open ${0:Printf}",
      doc: "Brings a module's contents into scope.",
    },
    {
      label: "include",
      detail: "Include a module",
      insertText: "include ${0:Module}",
      doc: "Re-exports the contents of a module.",
    },
    {
      label: "mli",
      detail: "Module interface",
      insertText: "(* ${1:Module} interface *)\n\ntype ${2:t}\n\nval ${3:create} : unit -> ${2:t}\nval ${4:run} : ${2:t} -> ${0:unit}\n",
      doc: "A typical .mli skeleton.",
    },
    {
      label: "deriving",
      detail: "ppx deriving attribute",
      insertText: "[@@deriving ${0:show, eq, ord}]",
      doc: "Asks a ppx to derive instances for a type.",
    },
    {
      label: "attribute",
      detail: "Attribute",
      insertText: "[@${0:warning \"-27\"}]",
      doc: "Attaches an attribute to an expression or declaration.",
    },
    {
      label: "assert",
      detail: "Assertion",
      insertText: "assert (${0:cond})",
      doc: "Raises `Assert_failure` when the condition is false.",
    },
    {
      label: "hashtbl",
      detail: "Hash table",
      insertText: "let ${1:tbl} = Hashtbl.create ${2:16} in\nHashtbl.replace ${1:tbl} ${3:key} ${4:value};\n${0:()}",
      doc: "Creates and fills a hash table.",
    },
    {
      label: "class",
      detail: "Class definition",
      insertText: "class ${1:counter} = object\n  val mutable ${2:n} = ${3:0}\n  method ${4:incr} = ${2:n} <- ${2:n} + 1\n  method ${5:value} = ${0:${2:n}}\nend",
      doc: "Declares a class of objects.",
    },
  ];

  // ────────────────────────────────────────────────────────────────────
  //  6. SYMBOL PARSER
  // ────────────────────────────────────────────────────────────────────
  interface OcamlSymbol {
    name: string;
    kind: string;
    line: number;
    column: number;
    endColumn: number;
    detail: string;
    params: string;
  }

  const ATTRIBUTES = "(?:\\[@@?[^\\]]*\\]\\s*)*";

  // Modifiers are written after their keyword in OCaml (`let rec`, `type
  // nonrec`, `class virtual`), so each of them belongs in its own pattern.
  const DECLARATION_PATTERNS: { re: RegExp; kind: string; group: number }[] = [
    {
      re: new RegExp(
        "^\\s*" + ATTRIBUTES + "module\\s+type\\s+([A-Z][\\w']*)",
      ),
      kind: "module-type",
      group: 1,
    },
    {
      re: new RegExp(
        "^\\s*" + ATTRIBUTES + "module\\s+(?:rec\\s+)?([A-Z][\\w']*)",
      ),
      kind: "module",
      group: 1,
    },
    {
      re: new RegExp(
        "^\\s*" +
          ATTRIBUTES +
          "type\\s+(?:nonrec\\s+)?(?:\\([^)]*\\)\\s*)?(?:'[\\w']+\\s+)*([a-z_][\\w']*)",
      ),
      kind: "type",
      group: 1,
    },
    {
      re: new RegExp("^\\s*" + ATTRIBUTES + "exception\\s+([A-Z][\\w']*)"),
      kind: "exception",
      group: 1,
    },
    {
      re: new RegExp("^\\s*" + ATTRIBUTES + "external\\s+([a-z_][\\w']*)"),
      kind: "external",
      group: 1,
    },
    {
      re: new RegExp(
        "^\\s*" + ATTRIBUTES + "val\\s+mutable\\s+([a-z_][\\w']*)",
      ),
      kind: "field",
      group: 1,
    },
    {
      re: new RegExp("^\\s*" + ATTRIBUTES + "val\\s+([a-z_][\\w']*)"),
      kind: "value",
      group: 1,
    },
    {
      re: new RegExp(
        "^\\s*" +
          ATTRIBUTES +
          "class\\s+(?!type\\b)(?:virtual\\s+)?(?:\\[[^\\]]*\\]\\s+)?([a-z_][\\w']*)",
      ),
      kind: "class",
      group: 1,
    },
    {
      re: new RegExp("^\\s*method\\s+(?:private\\s+)?([a-z_][\\w']*)"),
      kind: "method",
      group: 1,
    },
    {
      re: new RegExp(
        "^\\s*" + ATTRIBUTES + "let\\s+(?:rec\\s+)?([a-z_][\\w']*)",
      ),
      kind: "let",
      group: 1,
    },
    {
      re: new RegExp("^\\s*" + ATTRIBUTES + "and\\s+([a-z_][\\w']*)"),
      kind: "let",
      group: 1,
    },
  ];

  function parseSymbols(model: Monaco.editor.ITextModel): OcamlSymbol[] {
    const symbols: OcamlSymbol[] = [];
    const lines = model.getLinesContent();

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (!line.trim() || /^\s*\(\*/.test(line)) continue;

      // `let x = e in body` is a local binding, not a declaration. Strings and
      // inline comments are stripped first so an `in` inside them is ignored.
      const code = line
        .replace(/"(?:\\.|[^"\\])*"/g, '""')
        .replace(/\(\*.*?\*\)/g, " ");
      if (/\bin\b/.test(code.slice(code.indexOf("=") + 1))) continue;

      for (const pattern of DECLARATION_PATTERNS) {
        const m = line.match(pattern.re);
        if (!m) continue;

        const name = m[pattern.group];
        if (!name) continue;

        // The whole match starts at column 1 because of the leading `^\s*`,
        // so the offset inside the match is already the absolute column.
        const column = m[0].lastIndexOf(name) + 1;
        if (column <= 0) continue;

        let kind = pattern.kind;
        let params = "";

        if (kind === "let") {
          // `let f a b = …`, `let f = fun x -> …` and `let f = function …`
          // are functions; `let x = …` is a value.
          const afterName = line.slice(column - 1 + name.length);
          const beforeEq = afterName.split(/=|:/)[0].trim();
          const afterEq = afterName.replace(/^[^=]*=/, "").trim();
          params = beforeEq;
          kind =
            beforeEq.length > 0 || /^(?:fun|function)\b/.test(afterEq)
              ? "function"
              : "value";
        }

        symbols.push({
          name,
          kind,
          line: i + 1,
          column,
          endColumn: column + name.length,
          detail: line.trim(),
          params,
        });
        break;
      }
    }

    return symbols;
  }

  function symbolKind(kind: string) {
    switch (kind) {
      case "let":
      case "function":
        return monaco.languages.SymbolKind.Function;
      case "value":
        return monaco.languages.SymbolKind.Constant;
      case "field":
        return monaco.languages.SymbolKind.Field;
      case "type":
        return monaco.languages.SymbolKind.Struct;
      case "module":
        return monaco.languages.SymbolKind.Module;
      case "module-type":
        return monaco.languages.SymbolKind.Interface;
      case "exception":
        return monaco.languages.SymbolKind.Enum;
      case "external":
        return monaco.languages.SymbolKind.Function;
      case "class":
        return monaco.languages.SymbolKind.Class;
      case "method":
        return monaco.languages.SymbolKind.Method;
      default:
        return monaco.languages.SymbolKind.Variable;
    }
  }

  function completionKind(kind: string) {
    switch (kind) {
      case "let":
      case "function":
      case "external":
        return monaco.languages.CompletionItemKind.Function;
      case "value":
        return monaco.languages.CompletionItemKind.Constant;
      case "field":
        return monaco.languages.CompletionItemKind.Field;
      case "type":
        return monaco.languages.CompletionItemKind.Struct;
      case "module":
        return monaco.languages.CompletionItemKind.Module;
      case "module-type":
        return monaco.languages.CompletionItemKind.Interface;
      case "exception":
        return monaco.languages.CompletionItemKind.Enum;
      case "class":
        return monaco.languages.CompletionItemKind.Class;
      case "method":
        return monaco.languages.CompletionItemKind.Method;
      default:
        return monaco.languages.CompletionItemKind.Variable;
    }
  }

  // ────────────────────────────────────────────────────────────────────
  //  7. HELPERS
  // ────────────────────────────────────────────────────────────────────
  function escapeRegex(value: string) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  // Keywords and type constructors that must not be renamed.
  const RESERVED_WORDS = new Set([
    "and", "as", "assert", "asr", "begin", "class", "constraint", "continue",
    "do", "done", "downto", "effect", "else", "end", "exception", "external",
    "false", "for", "fun", "function", "functor", "if", "in", "include",
    "inherit", "initializer", "land", "lazy", "let", "lor", "lsl", "lsr",
    "lxor", "match", "method", "mod", "module", "mutable", "new", "nonrec",
    "object", "of", "open", "or", "perform", "private", "rec", "sig", "struct",
    "then", "to", "true", "try", "type", "val", "virtual", "when", "while",
    "with",
    "int", "float", "bool", "char", "string", "unit", "bytes", "list", "array",
    "option", "result", "ref", "exn", "format", "int32", "int64", "nativeint",
    "floatarray",
  ]);

  /** Splits `val f : int -> string -> unit` into its parameter types. */
  function parameterTypes(signature: string): string[] {
    const colon = signature.indexOf(":");
    if (colon < 0) return [];
    const text = signature.slice(colon + 1);
    const parts: string[] = [];
    let depth = 0;
    let start = 0;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (ch === "(" || ch === "[" || ch === "{") depth++;
      else if (ch === ")" || ch === "]" || ch === "}") depth--;
      else if (ch === "-" && text[i + 1] === ">" && depth === 0) {
        parts.push(text.slice(start, i).trim());
        start = i + 2;
        i++;
      }
    }
    parts.push(text.slice(start).trim());
    const cleaned = parts.filter((part) => part.length > 0);
    // The last component is the result type, not an argument.
    return cleaned.length > 1 ? cleaned.slice(0, -1) : cleaned;
  }

  /**
   * Index of the argument being typed. OCaml applies functions by juxtaposition,
   * so a change of token (whitespace or comma at depth 0) starts a new argument.
   */
  function countArguments(text: string): number {
    let depth = 0;
    let count = 0;
    let inToken = false;
    for (const ch of text) {
      if (ch === "(" || ch === "[" || ch === "{") {
        if (!inToken) {
          count++;
          inToken = true;
        }
        depth++;
      } else if (ch === ")" || ch === "]" || ch === "}") {
        depth--;
      } else if (depth === 0 && (ch === "," || /\s/.test(ch))) {
        inToken = false;
      } else if (!inToken) {
        count++;
        inToken = true;
      }
    }
    // Mid-token means the current argument is the one being edited.
    return inToken ? Math.max(count - 1, 0) : count;
  }

  /**
   * The function being applied at the cursor, if it can be identified reliably:
   * either the callee of an unclosed `(`, or a qualified `Module.fn` followed
   * by arguments. Unqualified `f a b` is deliberately ignored — with currying
   * there is no way to tell the callee from its arguments.
   */
  function callContext(
    model: Monaco.editor.ITextModel,
    position: Monaco.Position,
  ): { name: string; args: string } | null {
    const textUntil = model.getValueInRange({
      startLineNumber: position.lineNumber,
      startColumn: 1,
      endLineNumber: position.lineNumber,
      endColumn: position.column,
    });

    const parenIndex = textUntil.lastIndexOf("(");
    if (parenIndex >= 0 && !textUntil.slice(parenIndex).includes(")")) {
      const match = textUntil
        .slice(0, parenIndex)
        .match(/([A-Za-z_][\w']*(?:\.[A-Za-z_][\w']*)*)\s*$/);
      if (match) {
        return { name: match[1], args: textUntil.slice(parenIndex + 1) };
      }
    }

    const qualified = textUntil.match(
      /((?:[A-Z][\w']*\.)+[a-z_][\w']*)\s+([^;=]*)$/,
    );
    if (qualified) {
      return { name: qualified[1], args: qualified[2] };
    }

    return null;
  }

  // ────────────────────────────────────────────────────────────────────
  //  8. COMPLETION PROVIDER (auto-complete + snippets)
  // ────────────────────────────────────────────────────────────────────
  const keywordItems = [
    "and", "as", "assert", "begin", "class", "do", "done", "downto", "else", "end",
    "exception", "external", "for", "fun", "function", "functor", "if", "in", "include",
    "inherit", "lazy", "let", "match", "method", "module", "mutable", "new", "object",
    "of", "open", "private", "rec", "sig", "struct", "then", "to", "try", "type", "val",
    "virtual", "when", "while", "with",
  ];

  const typeItems = [
    "array", "bool", "bytes", "char", "exn", "float", "floatarray", "format", "int",
    "int32", "int64", "list", "nativeint", "option", "ref", "result", "string", "unit",
  ];

  const builtinItems = [
    "abs", "compare", "decr", "eprintf", "failwith", "fst", "ignore", "incr",
    "input_line", "invalid_arg", "max", "min", "not", "pred", "print_char",
    "print_endline", "print_float", "print_int", "print_newline", "print_string",
    "printf", "raise", "read_line", "ref", "snd", "sprintf", "string_of_bool",
    "string_of_float", "string_of_int", "succ",
  ];

  monaco.languages.registerCompletionItemProvider(LANG_ID, {
    triggerCharacters: [".", "~", "?", "`", " "],
    provideCompletionItems: function (model, position) {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };

      const suggestions: Monaco.languages.CompletionItem[] = [];
      const lineContent = model.getLineContent(position.lineNumber);
      const before = lineContent.substring(0, position.column - 1);

      // ── Module members: `List.ma` ──
      const dotMatch = before.match(/([A-Z][\w']*)\.(\w*)$/);
      if (dotMatch && MODULE_MEMBERS[dotMatch[1]]) {
        const moduleName = dotMatch[1];
        const dotRange = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: position.column - dotMatch[2].length,
          endColumn: position.column,
        };
        for (const member of MODULE_MEMBERS[moduleName]) {
          const info = DOCS[moduleName + "." + member];
          suggestions.push({
            label: member,
            kind: /^[A-Z]/.test(member)
              ? monaco.languages.CompletionItemKind.EnumMember
              : monaco.languages.CompletionItemKind.Function,
            insertText: member,
            detail: info ? info.detail : moduleName + "." + member,
            documentation: info ? { value: info.doc } : undefined,
            range: dotRange,
            sortText: "0_" + member,
          });
        }
        return { suggestions };
      }

      // ── Module names after `open` / `module` / `include` ──
      if (/\b(?:open|module|include)\s+[A-Z][\w']*$/.test(before)) {
        for (const moduleName of Object.keys(MODULE_MEMBERS)) {
          suggestions.push({
            label: moduleName,
            kind: monaco.languages.CompletionItemKind.Module,
            insertText: moduleName,
            detail: "Stdlib module",
            range: range,
            sortText: "0_" + moduleName,
          });
        }
        return { suggestions };
      }

      // ── Snippets ──
      for (const snippet of snippets) {
        suggestions.push({
          label: snippet.label,
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: snippet.insertText,
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: { value: snippet.doc },
          detail: "Snippet: " + snippet.detail,
          range: range,
          sortText: "1_" + snippet.label,
        });
      }

      // ── User-defined symbols ──
      const symbols = parseSymbols(model);
      const seen = new Set<string>();
      for (const symbol of symbols) {
        if (seen.has(symbol.name) || symbol.name === word.word) continue;
        seen.add(symbol.name);
        suggestions.push({
          label: symbol.name,
          kind: completionKind(symbol.kind),
          insertText: symbol.name,
          detail: symbol.kind + " (defined in this file)",
          documentation: { value: "```ocaml\n" + symbol.detail + "\n```" },
          range: range,
          sortText: "1_" + symbol.name,
        });
      }

      // ── Keywords ──
      for (const keyword of keywordItems) {
        const info = DOCS[keyword];
        suggestions.push({
          label: keyword,
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: keyword,
          detail: info ? info.detail : "(keyword) " + keyword,
          documentation: info ? { value: info.doc } : undefined,
          range: range,
          sortText: "2_" + keyword,
        });
      }

      // ── Types ──
      for (const type of typeItems) {
        const info = DOCS[type];
        suggestions.push({
          label: type,
          kind: monaco.languages.CompletionItemKind.Class,
          insertText: type,
          detail: info ? info.detail : "(type) " + type,
          documentation: info ? { value: info.doc } : undefined,
          range: range,
          sortText: "3_" + type,
        });
      }

      // ── Stdlib values ──
      for (const builtin of builtinItems) {
        const info = DOCS[builtin];
        suggestions.push({
          label: builtin,
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: builtin,
          detail: info ? info.detail : "(value) " + builtin,
          documentation: info ? { value: info.doc } : undefined,
          range: range,
          sortText: "4_" + builtin,
        });
      }

      // ── Modules ──
      for (const moduleName of Object.keys(MODULE_MEMBERS)) {
        if (moduleName === "Stdlib") continue;
        suggestions.push({
          label: moduleName,
          kind: monaco.languages.CompletionItemKind.Module,
          insertText: moduleName,
          detail: "Stdlib module",
          documentation: {
            value: "Members: `" + MODULE_MEMBERS[moduleName].slice(0, 8).join("`, `") + "` …",
          },
          range: range,
          sortText: "5_" + moduleName,
        });
      }

      return { suggestions };
    },
  });

  // ────────────────────────────────────────────────────────────────────
  //  9. HOVER PROVIDER
  // ────────────────────────────────────────────────────────────────────
  monaco.languages.registerHoverProvider(LANG_ID, {
    provideHover: function (model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return null;

      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };

      // Dotted name: `List.map`, `Printf.sprintf`
      const lineContent = model.getLineContent(position.lineNumber);
      const upToWord = lineContent.substring(0, word.endColumn - 1);
      const dottedMatch = upToWord.match(/([A-Z][\w']*\.[a-z_][\w']*)$/);
      if (dottedMatch) {
        const info = DOCS[dottedMatch[1]];
        if (info) {
          return {
            range: range,
            contents: [
              { value: "```ocaml\n" + info.detail + "\n```" },
              { value: info.doc },
            ],
          };
        }
      }

      // Keywords, types, stdlib values
      const info = DOCS[word.word];
      if (info) {
        return {
          range: range,
          contents: [
            { value: "```ocaml\n" + info.detail + "\n```" },
            { value: info.doc },
          ],
        };
      }

      // User-defined symbol
      const symbols = parseSymbols(model);
      const symbol = symbols.find((s) => s.name === word.word);
      if (symbol) {
        return {
          range: range,
          contents: [
            { value: "**(`" + symbol.kind + "`) " + symbol.name + "**" },
            { value: "```ocaml\n" + symbol.detail + "\n```" },
            { value: "_Defined at line " + symbol.line + "_" },
          ],
        };
      }

      return null;
    },
  });

  // ────────────────────────────────────────────────────────────────────
  //  10. DEFINITION PROVIDER (GO TO DEFINITION)
  // ────────────────────────────────────────────────────────────────────
  monaco.languages.registerDefinitionProvider(LANG_ID, {
    provideDefinition: function (model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return null;

      const matches = parseSymbols(model).filter((s) => s.name === word.word);
      if (matches.length === 0) return null;

      return matches.map((symbol) => ({
        uri: model.uri,
        range: new monaco.Range(
          symbol.line,
          symbol.column,
          symbol.line,
          symbol.endColumn,
        ),
      }));
    },
  });

  // ────────────────────────────────────────────────────────────────────
  //  11. SIGNATURE HELP PROVIDER
  // ────────────────────────────────────────────────────────────────────
  monaco.languages.registerSignatureHelpProvider(LANG_ID, {
    signatureHelpTriggerCharacters: [" ", "(", ","],
    signatureHelpRetriggerCharacters: [" ", ","],
    provideSignatureHelp: function (model, position) {
      const found = callContext(model, position);
      if (!found) return null;

      const { name, args } = found;
      const activeParameter = countArguments(args);

      // A function defined in the current file.
      const symbol = parseSymbols(model).find(
        (s) => s.name === name && s.kind === "function",
      );

      if (symbol) {
        const params = symbol.params
          .split(/\s+/)
          .map((param) => param.trim())
          .filter(Boolean);
        if (params.length > 0) {
          return {
            value: {
              signatures: [
                {
                  label: symbol.name + " " + params.join(" "),
                  documentation: {
                    value: "```ocaml\n" + symbol.detail + "\n```",
                  },
                  parameters: params.map((param) => ({
                    label: param,
                    documentation: "Argument of `" + symbol.name + "`",
                  })),
                },
              ],
              activeSignature: 0,
              activeParameter: Math.min(
                activeParameter,
                Math.max(params.length - 1, 0),
              ),
            },
            dispose: () => {},
          };
        }
      }

      // A documented stdlib function.
      const info = DOCS[name];
      if (info && info.detail.includes("->")) {
        const params = parameterTypes(info.detail);
        if (params.length > 0) {
          return {
            value: {
              signatures: [
                {
                  label: info.detail,
                  documentation: { value: info.doc },
                  parameters: params.map((param) => ({
                    label: param,
                    documentation: "",
                  })),
                },
              ],
              activeSignature: 0,
              activeParameter: Math.min(
                activeParameter,
                Math.max(params.length - 1, 0),
              ),
            },
            dispose: () => {},
          };
        }
      }

      return null;
    },
  });

  // ────────────────────────────────────────────────────────────────────
  //  12. DOCUMENT SYMBOL PROVIDER (outline)
  // ────────────────────────────────────────────────────────────────────
  monaco.languages.registerDocumentSymbolProvider(LANG_ID, {
    provideDocumentSymbols: function (model) {
      return parseSymbols(model).map((symbol) => ({
        name: symbol.name,
        detail: symbol.detail,
        kind: symbolKind(symbol.kind),
        range: new monaco.Range(
          symbol.line,
          symbol.column,
          symbol.line,
          symbol.endColumn,
        ),
        selectionRange: new monaco.Range(
          symbol.line,
          symbol.column,
          symbol.line,
          symbol.endColumn,
        ),
        tags: [],
      }));
    },
  });

  // ────────────────────────────────────────────────────────────────────
  //  13. FOLDING RANGE PROVIDER
  // ────────────────────────────────────────────────────────────────────
  monaco.languages.registerFoldingRangeProvider(LANG_ID, {
    provideFoldingRanges: function (model) {
      const lines = model.getLinesContent();
      const ranges: Monaco.languages.FoldingRange[] = [];

      // Comments, including nested ones.
      let commentDepth = 0;
      let commentStart = -1;
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        for (let j = 0; j < line.length - 1; j++) {
          const pair = line.slice(j, j + 2);
          if (pair === "(*") {
            if (commentDepth === 0) commentStart = i;
            commentDepth++;
            j++;
          } else if (pair === "*)" && commentDepth > 0) {
            commentDepth--;
            j++;
            if (commentDepth === 0 && i > commentStart) {
              ranges.push({
                start: commentStart + 1,
                end: i + 1,
                kind: monaco.languages.FoldingRangeKind.Comment,
              });
            }
          }
        }
      }

      // `struct` / `sig` / `begin` / `object` … `end`
      const blockStack: number[] = [];
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].replace(/\(\*.*?\*\)/g, " ");
        const opens = (line.match(/\b(?:struct|sig|begin|object)\b/g) || []).length;
        const closes = (line.match(/\bend\b/g) || []).length;
        let net = opens - closes;
        while (net > 0) {
          blockStack.push(i);
          net--;
        }
        while (net < 0) {
          const start = blockStack.pop();
          if (start !== undefined && i > start) {
            ranges.push({
              start: start + 1,
              end: i + 1,
              kind: monaco.languages.FoldingRangeKind.Region,
            });
          }
          net++;
        }
      }
      while (blockStack.length > 0) {
        const start = blockStack.pop()!;
        if (lines.length - 1 > start) {
          ranges.push({
            start: start + 1,
            end: lines.length,
            kind: monaco.languages.FoldingRangeKind.Region,
          });
        }
      }

      // Leading `open` / `include` block.
      let importEnd = -1;
      for (let i = 0; i < lines.length; i++) {
        if (/^\s*(?:open|include)\b/.test(lines[i])) importEnd = i;
        else if (lines[i].trim() !== "" && !/^\s*\(\*/.test(lines[i])) break;
      }
      if (importEnd > 0) {
        ranges.push({
          start: 1,
          end: importEnd + 1,
          kind: monaco.languages.FoldingRangeKind.Imports,
        });
      }

      return ranges;
    },
  });

  // ────────────────────────────────────────────────────────────────────
  //  14. REFERENCE PROVIDER (find all references)
  // ────────────────────────────────────────────────────────────────────
  monaco.languages.registerReferenceProvider(LANG_ID, {
    provideReferences: function (model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return [];

      const references: Monaco.languages.Location[] = [];
      const lines = model.getLinesContent();
      const regex = new RegExp("\\b" + escapeRegex(word.word) + "\\b", "g");

      lines.forEach((line, index) => {
        let match;
        while ((match = regex.exec(line)) !== null) {
          references.push({
            uri: model.uri,
            range: new monaco.Range(
              index + 1,
              match.index + 1,
              index + 1,
              match.index + word.word.length + 1,
            ),
          });
        }
      });

      return references;
    },
  });

  // ────────────────────────────────────────────────────────────────────
  //  15. RENAME PROVIDER
  // ────────────────────────────────────────────────────────────────────
  monaco.languages.registerRenameProvider(LANG_ID, {
    provideRenameEdits: function (model, position, newName) {
      const word = model.getWordAtPosition(position);
      if (!word) return null;
      const name = word.word;
      if (RESERVED_WORDS.has(name)) return null;

      const lines = model.getLinesContent();
      const lineStart: number[] = [];
      let size = 0;
      for (let i = 0; i < lines.length; i++) {
        lineStart.push(size);
        size += lines[i].length + 1;
      }
      const at = (line: number, col: number) => lineStart[line] + col;

      // OCaml's `let … in` bodies are laid out by indentation, so a line whose
      // next line is indented further heads a block. The block starts on the
      // body's first line, so a top-level `let` stays at document level.
      type Scope = {
        start: number;
        end: number;
        line: number;
        names: Set<string>;
      };
      const indentOf = (line: string) => {
        let n = 0;
        while (n < line.length && (line[n] === " " || line[n] === "\t")) n++;
        return n;
      };
      const blank = (i: number) =>
        lines[i] === undefined || lines[i].trim() === "";
      const scopes: Scope[] = [];
      for (let i = 0; i < lines.length; i++) {
        if (blank(i)) continue;
        const indent = indentOf(lines[i]);
        let j = i + 1;
        while (j < lines.length && blank(j)) j++;
        if (j >= lines.length || indentOf(lines[j]) <= indent) continue;
        let k = j;
        for (let m = j + 1; m < lines.length; m++) {
          if (blank(m)) continue;
          if (indentOf(lines[m]) > indent) k = m;
          else break;
        }
        scopes.push({
          start: at(j, 0),
          end: at(k, lines[k].length),
          line: j,
          names: new Set<string>(),
        });
      }

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

      // Local declarations: `let`/`and` bindings.
      const declaration = new RegExp(
        "\\b(?:let|and)\\s+(?:rec\\s+)?" + escapeRegex(name) + "\\b",
        "g",
      );
      const declarations: { start: number; end: number; scope?: Scope }[] = [];
      for (let i = 0; i < lines.length; i++) {
        declaration.lastIndex = 0;
        let m;
        while ((m = declaration.exec(lines[i])) !== null) {
          const owner = enclosing(at(i, m.index));
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

      // Only rename occurrences resolving to the same binding as the cursor.
      const cursorLine = position.lineNumber - 1;
      const cursorScope = resolve(
        at(cursorLine, word.startColumn - 1),
        at(cursorLine, word.endColumn - 1),
      );
      const targetStart = cursorScope ? cursorScope.start : -1;
      const edits: Monaco.editor.IWorkspaceTextEdit[] = [];
      const occurrence = new RegExp("\\b" + escapeRegex(name) + "\\b", "g");
      for (let i = 0; i < lines.length; i++) {
        occurrence.lastIndex = 0;
        let m;
        while ((m = occurrence.exec(lines[i])) !== null) {
          const start = at(i, m.index);
          const scope = resolve(start, start + name.length);
          if ((scope ? scope.start : -1) !== targetStart) continue;
          if (targetStart !== -1) {
            const before = lines[i].slice(0, m.index).replace(/\s+$/, "");
            if (before.endsWith(".")) continue;
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
      if (RESERVED_WORDS.has(word.word)) {
        return { rejectReason: "Renaming keywords is not supported." };
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
