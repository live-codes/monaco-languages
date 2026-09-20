import type * as Monaco from "monaco-editor";

export default (monaco: typeof Monaco) => {
  const LANG_ID = "lean";

  // ────────────────────────────────────────────────────────────────────
  //  1. REGISTER LANGUAGE
  // ────────────────────────────────────────────────────────────────────
  monaco.languages.register({
    id: LANG_ID,
    extensions: [".lean"],
    aliases: ["Lean", "lean", "Lean4", "Lean 4"],
    mimetypes: ["text/x-lean"],
  });

  // ────────────────────────────────────────────────────────────────────
  //  2. MONARCH TOKENIZER (SYNTAX HIGHLIGHTING)
  // ────────────────────────────────────────────────────────────────────
  monaco.languages.setMonarchTokensProvider(LANG_ID, {
    defaultToken: "",
    unicode: true,

    keywords: [
      "abbrev",
      "attribute",
      "axiom",
      "builtin_initialize",
      "by",
      "calc",
      "class",
      "constant",
      "declare_syntax_cat",
      "decreasing_by",
      "def",
      "deriving",
      "do",
      "elab",
      "elab_rules",
      "else",
      "end",
      "example",
      "export",
      "extends",
      "for",
      "from",
      "fun",
      "have",
      "if",
      "import",
      "in",
      "include",
      "inductive",
      "init",
      "initialize",
      "instance",
      "lemma",
      "let",
      "local",
      "macro",
      "macro_rules",
      "match",
      "mut",
      "mutual",
      "namespace",
      "noncomputable",
      "nonrec",
      "notation",
      "omit",
      "opaque",
      "open",
      "partial",
      "postfix",
      "prefix",
      "private",
      "protected",
      "renaming",
      "run_cmd",
      "scoped",
      "section",
      "set_option",
      "show",
      "structure",
      "suffices",
      "syntax",
      "termination_by",
      "theorem",
      "then",
      "universe",
      "unsafe",
      "unused",
      "variable",
      "where",
      "with",
    ],

    tactics: [
      "ac_rfl",
      "aesop",
      "all_goals",
      "any_goals",
      "apply",
      "assumption",
      "bound",
      "by_cases",
      "by_contra",
      "cases",
      "change",
      "clear",
      "congr",
      "constructor",
      "contradiction",
      "contrapose",
      "conv",
      "convert",
      "decide",
      "disjoint",
      "exact",
      "exact_mod_cast",
      "exfalso",
      "exists",
      "ext",
      "fail_if_success",
      "field_simp",
      "fin_cases",
      "first",
      "focus",
      "fun_prop",
      "generalize",
      "guard_target",
      "induction",
      "infer_instance",
      "injection",
      "intro",
      "intros",
      "left",
      "linear_combination",
      "linarith",
      "measurability",
      "native_decide",
      "nlinarith",
      "norm_cast",
      "norm_num",
      "omega",
      "polyrith",
      "positivity",
      "push_cast",
      "push_neg",
      "rcases",
      "refine",
      "rename_i",
      "repeat",
      "revert",
      "rewrite",
      "rfl",
      "right",
      "ring",
      "ring1",
      "ring_nf",
      "rintro",
      "rw",
      "set",
      "simp",
      "simp_all",
      "simp_arith",
      "specialize",
      "split",
      "subst",
      "symm",
      "tauto",
      "trans",
      "trivial",
      "try",
      "unfold",
      "use",
      "with_unfolding_all",
      "zify",
    ],

    typeKeywords: [
      "And",
      "Array",
      "Bool",
      "Char",
      "Char.ofNat",
      "Complex",
      "Decidable",
      "EIO",
      "Empty",
      "Eq",
      "Except",
      "ExceptT",
      "Exists",
      "Fin",
      "Finset",
      "Float",
      "Float32",
      "Function",
      "HEq",
      "IO",
      "Id",
      "Iff",
      "Inhabited",
      "Int",
      "Int8",
      "Int16",
      "Int32",
      "Int64",
      "ISize",
      "List",
      "Multiset",
      "Nat",
      "Nonempty",
      "Not",
      "Option",
      "Or",
      "PEmpty",
      "PUnit",
      "Prod",
      "Prop",
      "Rat",
      "ReaderT",
      "Real",
      "Set",
      "Sigma",
      "Sort",
      "StateM",
      "StateT",
      "String",
      "Subtype",
      "Sum",
      "Type",
      "UInt8",
      "UInt16",
      "UInt32",
      "UInt64",
      "ULift",
      "Unit",
      "USize",
      "Vector",
      "WriterT",
      "false",
      "true",
    ],

    predefined: [
      "absurd",
      "add",
      "admit",
      "and",
      "append",
      "bdepend",
      "bit0",
      "bit1",
      "cast",
      "coe",
      "congrArg",
      "congrFun",
      "decide",
      "div",
      "dite",
      "elim",
      "false",
      "forall",
      "id",
      "if_pos",
      "inferInstance",
      "ite",
      "length",
      "map",
      "max",
      "min",
      "mod",
      "mul",
      "not",
      "of_eq_true",
      "or",
      "propext",
      "snd",
      "fst",
      "sorry",
      "sub",
      "succ",
      "zero",
    ],

    operators: [
      ":=",
      "=>",
      "->",
      "<-",
      "<->",
      "|>",
      "<|",
      ">>=",
      "&&",
      "||",
      "=",
      "<",
      ">",
      "<=",
      ">=",
      "<>",
      "+",
      "-",
      "*",
      "/",
      "^",
      "++",
      "::",
      "@",
      "$",
      "~",
      "%",
      "!",
      "?",
      "·",
      "→",
      "←",
      "↔",
      "↦",
      "⇒",
      "⇔",
      "∀",
      "∃",
      "∧",
      "∨",
      "¬",
      "≠",
      "≤",
      "≥",
      "⊆",
      "⊂",
      "∈",
      "∉",
      "∪",
      "∩",
      "∅",
      "⟨",
      "⟩",
      "⦃",
      "⦄",
      "⊢",
      "∘",
      "⁻¹",
      "∑",
      "∏",
      "√",
      "≈",
      "≡",
      "⊕",
      "⊗",
      "⊥",
      "⊤",
      "×",
      "÷",
    ],

    symbols:
      /[=><!~?:&|+\-*\/\\^%@#$~·\u00ac\u00b1\u00b7\u00b9\u00d7\u00f7\u207b\u2190-\u21ff\u2200-\u22ff\u27e8\u27e9\u2983\u2984]+/,

    brackets: [
      { open: "{", close: "}", token: "delimiter.curly" },
      { open: "[", close: "]", token: "delimiter.square" },
      { open: "(", close: ")", token: "delimiter.parenthesis" },
    ],

    tokenizer: {
      root: [
        // Documentation comments (/-- and /-!)
        [/\/-!/, "comment.doc", "@docComment"],
        [/\/--/, "comment.doc", "@docComment"],
        // Block comments (nestable)
        [/\/-/, "comment", "@blockComment"],
        // Line comments
        [/--.*$/, "comment"],

        // Commands beginning with #
        [/#[a-zA-Z_]\w*/, "keyword.command"],

        // Attributes @[simp, ...]
        [/@\[/, "annotation", "@attribute"],

        // Strings
        [/[smf]!"/, "string", "@interpolatedString"],
        [/r#+".*?"#+/, "string"],
        [/r#*"/, "string", "@rawString"],
        [/"/, "string", "@string"],

        // Character literals
        [/'[^'\\]'/, "string.char"],
        [/'\\[^']*'/, "string.char"],
        [/'/, "string.char", "@char"],

        // Escaped identifiers
        [/«[^»]*»/, "identifier"],

        // Numbers
        [/0[xX][0-9a-fA-F_]+/, "number.hex"],
        [/0[bB][01_]+/, "number.binary"],
        [/0[oO][0-7_]+/, "number.octal"],
        [/\d[\d_]*\.[\d_]+([eE][-+]?[\d_]+)?/, "number.float"],
        [/\d[\d_]*[eE][-+]?[\d_]+/, "number.float"],
        [/\d[\d_]*/, "number"],

        // Identifiers, keywords, tactics and types
        [
          /[^\W\d][\w']*/,
          {
            cases: {
              "@keywords": "keyword",
              "@tactics": "keyword.tactic",
              "@typeKeywords": "type",
              "@predefined": "constant",
              "@default": "identifier",
            },
          },
        ],

        // Brackets
        [/[{}()\[\]]/, "@brackets"],

        // Operators & delimiters
        [
          /@symbols/,
          {
            cases: {
              "@operators": "operator",
              "@default": "delimiter",
            },
          },
        ],

        [/[;,.]/, "delimiter"],

        // Whitespace
        [/\s+/, "white"],
      ],

      docComment: [
        [/\/-/, "comment.doc", "@push"],
        [/-\//, "comment.doc", "@pop"],
        [/./, "comment.doc"],
      ],

      blockComment: [
        [/\/-/, "comment", "@push"],
        [/-\//, "comment", "@pop"],
        [/./, "comment"],
      ],

      string: [
        [/@escapes/, "string.escape"],
        [/\\./, "string.escape.invalid"],
        [/[^\\"]+/, "string"],
        [/"/, "string", "@pop"],
      ],

      rawString: [
        [/"#*/, "string", "@pop"],
        [/[^"]+/, "string"],
        [/"/, "string"],
      ],

      interpolatedString: [
        [/\{/, "delimiter.curly", "@interpolation"],
        [/@escapes/, "string.escape"],
        [/\\./, "string.escape.invalid"],
        [/[^\\"{}]+/, "string"],
        [/"/, "string", "@pop"],
      ],

      interpolation: [
        [/\}/, "delimiter.curly", "@pop"],
        [/\{/, "delimiter.curly", "@push"],
        [/[smf]?"/, "string", "@string"],
        [/'[^'\\]'/, "string.char"],
        [/0[xX][0-9a-fA-F_]+/, "number.hex"],
        [/\d[\d_]*\.[\d_]*([eE][-+]?[\d_]+)?/, "number.float"],
        [/\d[\d_]*/, "number"],
        [/[{}()\[\]]/, "@brackets"],
        [
          /[^\W\d][\w']*/,
          {
            cases: {
              "@keywords": "keyword",
              "@tactics": "keyword.tactic",
              "@typeKeywords": "type",
              "@predefined": "constant",
              "@default": "identifier",
            },
          },
        ],
        [/@symbols/, "operator"],
        [/[;,.]/, "delimiter"],
        [/\s+/, "white"],
      ],

      char: [
        [/@escapes/, "string.escape"],
        [/[^'\\]/, "string.char"],
        [/'/, "string.char", "@pop"],
        [/./, "string.char", "@pop"],
      ],

      attribute: [
        [/\]/, "annotation", "@pop"],
        [/[^\W\d][\w'.]*/, "annotation"],
        [/\d+/, "annotation.number"],
        [/\s+/, "white"],
        [/@symbols/, "annotation"],
        [/[;,.]/, "annotation"],
        [/./, "annotation"],
      ],
    },

    escapes: /\\(?:[nrtbfv"'\\]|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|U[0-9a-fA-F]{8})/,
  });

  // ────────────────────────────────────────────────────────────────────
  //  3. LANGUAGE CONFIGURATION
  // ────────────────────────────────────────────────────────────────────
  monaco.languages.setLanguageConfiguration(LANG_ID, {
    comments: {
      lineComment: "--",
      blockComment: ["/-", "-/"],
    },
    brackets: [
      ["{", "}"],
      ["[", "]"],
      ["(", ")"],
      ["⟨", "⟩"],
      ["⦃", "⦄"],
      ["«", "»"],
    ],
    autoClosingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: "⟨", close: "⟩" },
      { open: "⦃", close: "⦄" },
      { open: "«", close: "»" },
      { open: '"', close: '"', notIn: ["string"] },
      { open: "'", close: "'", notIn: ["string", "comment"] },
    ],
    surroundingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: "⟨", close: "⟩" },
      { open: "⦃", close: "⦄" },
      { open: "«", close: "»" },
      { open: '"', close: '"' },
      { open: "'", close: "'" },
    ],
    wordPattern:
      /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\"\,\.\<\>\/\?\s\u2190-\u21ff\u2200-\u22ff]+)/g,
    indentationRules: {
      increaseIndentPattern:
        /(?:[:=]|\b(?:by|do|where|then|else|match|with|fun|have|show|suffices|calc|namespace|section|structure|class|inductive|instance|mutual|deriving)|[\[{(\u27e8\u2983])\s*$/,
      decreaseIndentPattern: /^\s*(?:end\b|else\b|[\]})\u27e9]|\u2984|,)/,
    },
    onEnterRules: [
      {
        beforeText: /(?:[:=]|=>|->|←|→|\bby|\bdo|\bwhere)\s*$/,
        action: { indentAction: monaco.languages.IndentAction.Indent },
      },
      {
        beforeText: /^\s*(?:else|end)\s*$/,
        action: { indentAction: monaco.languages.IndentAction.Outdent },
      },
    ],
    folding: {
      markers: {
        start: /^\s*\/-\s*region\b/,
        end: /^\s*-\/\s*endregion\b/,
      },
    },
  });

  // ────────────────────────────────────────────────────────────────────
  //  4. DOCUMENTATION KNOWLEDGE BASE
  // ────────────────────────────────────────────────────────────────────
  const leanDocs: Record<string, { detail: string; doc: string }> = {
    // ── Declaration keywords ──────────────────────────────────────
    def: {
      detail: "(keyword) Definition",
      doc: "Defines a (possibly computable) function or value.\n\n```lean\ndef double (n : Nat) : Nat :=\n  2 * n\n```",
    },
    theorem: {
      detail: "(keyword) Theorem declaration",
      doc: "Declares a theorem whose proof is checked by the kernel.\n\n```lean\ntheorem add_zero (n : Nat) : n + 0 = n :=\n  rfl\n```",
    },
    lemma: {
      detail: "(keyword) Lemma declaration",
      doc: "A synonym for `theorem`, typically used for auxiliary results.\n\n```lean\nlemma two_le_sq (n : Nat) (h : 2 ≤ n) : 2 ≤ n ^ 2 := by omega\n```",
    },
    example: {
      detail: "(keyword) Anonymous example",
      doc: "States and proves an anonymous theorem. Useful for tests and experiments.\n\n```lean\nexample (n : Nat) : n + 0 = n := rfl\n```",
    },
    abbrev: {
      detail: "(keyword) Abbreviation",
      doc: "Defines a reducible, transparent abbreviation that is unfolded eagerly.\n\n```lean\nabbrev Point := Nat × Nat\n```",
    },
    axiom: {
      detail: "(keyword) Axiom declaration",
      doc: "Declares a postulate accepted without proof. Use with care — axioms enlarge the trusted base.\n\n```lean\naxiom propext : ∀ (a b : Prop), (a ↔ b) → a = b\n```",
    },
    opaque: {
      detail: "(keyword) Opaque definition",
      doc: "Defines a value whose body is hidden from reduction.\n\n```lean\nopaque secret : Nat := 42\n```",
    },
    constant: {
      detail: "(keyword) Constant declaration",
      doc: "Declares an opaque constant of a given type.\n\n```lean\nconstant c : Nat\n```",
    },
    variable: {
      detail: "(keyword) Variable declaration",
      doc: "Declares variables that are automatically generalized in subsequent declarations.\n\n```lean\nvariable (α : Type) (x : α)\n```",
    },
    universe: {
      detail: "(keyword) Universe declaration",
      doc: "Declares universe level variables.\n\n```lean\nuniverse u v\n```",
    },
    structure: {
      detail: "(keyword) Structure declaration",
      doc: "Declares a record type with named fields.\n\n```lean\nstructure Point where\n  x : Float\n  y : Float\n  deriving Repr\n```",
    },
    class: {
      detail: "(keyword) Type class declaration",
      doc: "Declares a type class, a structure used for ad-hoc polymorphism.\n\n```lean\nclass Add (α : Type) where\n  add : α → α → α\n```",
    },
    inductive: {
      detail: "(keyword) Inductive type declaration",
      doc: "Declares an inductive type with its constructors.\n\n```lean\ninductive Color where\n  | red\n  | green\n  | blue\n```",
    },
    instance: {
      detail: "(keyword) Type class instance",
      doc: "Registers a type class instance so it can be found by type class resolution.\n\n```lean\ninstance : Add Nat where\n  add := Nat.add\n```",
    },
    namespace: {
      detail: "(keyword) Namespace",
      doc: "Opens a namespace; declarations inside are placed under that prefix. Closed with `end`.\n\n```lean\nnamespace MyProject\n\ndef helper := 1\n\nend MyProject\n```",
    },
    section: {
      detail: "(keyword) Section",
      doc: "Groups declarations and scopes `variable` declarations. Sections are not part of names.\n\n```lean\nsection\nvariable (α : Type)\n\ntheorem id_id (x : α) : x = x := rfl\n\nend\n```",
    },
    end: {
      detail: "(keyword) End of namespace/section",
      doc: "Closes a `namespace`, `section`, `mutual`, `structure`, `class` or `inductive` block.",
    },
    mutual: {
      detail: "(keyword) Mutual definitions",
      doc: "Allows mutually recursive definitions.\n\n```lean\nmutual\n  def isEven : Nat → Bool\n    | 0 => true\n    | n + 1 => isOdd n\n  def isOdd : Nat → Bool\n    | 0 => false\n    | n + 1 => isEven n\nend\n```",
    },
    import: {
      detail: "(keyword) Module import",
      doc: "Imports a module. Must appear at the top of a file, before other commands.\n\n```lean\nimport Mathlib.Data.Nat.Basic\nimport Mathlib.Tactic\n```",
    },
    open: {
      detail: "(keyword) Open namespace",
      doc: "Brings the contents of a namespace or section into scope.\n\n```lean\nopen Nat List\nopen scoped BigOperators\n```",
    },
    export: {
      detail: "(keyword) Export namespace",
      doc: "Re-exports the names of a namespace so importers can use them unqualified.\n\n```lean\nexport List (map filter)\n```",
    },
    attribute: {
      detail: "(keyword) Attribute command",
      doc: "Applies attributes to existing declarations or declares new ones.\n\n```lean\nattribute [simp] my_lemma\n```",
    },
    notation: {
      detail: "(keyword) Notation declaration",
      doc: "Declares new parser notation.\n\n```lean\nnotation x \"!\" => factorial x\n```",
    },
    syntax: {
      detail: "(keyword) Syntax declaration",
      doc: "Declares a new syntax category production for the custom parser.\n\n```lean\nsyntax \"my_tac\" : tactic\n```",
    },
    macro: {
      detail: "(keyword) Macro declaration",
      doc: "Declares a macro that expands syntax into existing syntax before elaboration.\n\n```lean\nmacro \"my_tac\" : tactic => `(tactic| simp)\n```",
    },
    elab: {
      detail: "(keyword) Elaborator declaration",
      doc: "Declares a term/command/tactic elaborator that builds expressions.\n\n```lean\nelab \"my_term\" : term => `(1 + 1)\n```",
    },
    deriving: {
      detail: "(keyword) Deriving clause",
      doc: "Automatically derives type class instances such as `Repr`, `BEq`, `DecidableEq`, `Inhabited`.\n\n```lean\nstructure P where\n  x : Nat\n  deriving Repr, BEq, Inhabited\n```",
    },
    where: {
      detail: "(keyword) Where clause",
      doc: "Introduces local definitions/auxiliary declarations attached to a definition.\n\n```lean\ndef f (n : Nat) : Nat := g n\nwhere\n  g (n : Nat) := n + 1\n```",
    },
    private: {
      detail: "(modifier) Private declaration",
      doc: "Marks a declaration as private; it is only visible within the current file/module.",
    },
    protected: {
      detail: "(modifier) Protected declaration",
      doc: "Adds the declaration to the current namespace even when declared outside of it.",
    },
    noncomputable: {
      detail: "(modifier) Noncomputable definition",
      doc: "Exempts a definition from compilation (e.g. when it uses `Classical.choice`).",
    },
    partial: {
      detail: "(modifier) Partial definition",
      doc: "Allows a definition that is not provably terminating (compiled with the partial fixed-point combinator).",
    },
    unsafe: {
      detail: "(modifier) Unsafe definition",
      doc: "Marks a definition as unsafe; it can only be used in unsafe contexts.",
    },
    set_option: {
      detail: "(command) Set option",
      doc: "Sets an elaborator/compiler option, scoped to the current section or file.\n\n```lean\nset_option maxHeartbeats 400000\nset_option pp.all true\n```",
    },
    init: {
      detail: "(keyword) Initializer",
      doc: "Declares a function to be run at module initialization time with `initialize`.",
    },
    initialize: {
      detail: "(command) Initialize",
      doc: "Registers a computation to run when the module is loaded.\n\n```lean\ninitialize registerOption ...\n```",
    },
    include: {
      detail: "(keyword) Include",
      doc: "Includes a file's declarations inline (compile-time include).",
    },
    local: {
      detail: "(modifier) Local",
      doc: "Restricts an `attribute`, `notation`, `instance` or `macro` to the current section.",
    },
    scoped: {
      detail: "(modifier) Scoped",
      doc: "Makes an instance/notation available only after `open scoped`.",
    },

    // ── Tactics ───────────────────────────────────────────────────
    rfl: {
      detail: "(tactic) reflexivity",
      doc: "Closes goals of the form `a = a` by reflexivity.\n\n```lean\ntheorem t : 1 + 1 = 2 := by rfl\n```",
    },
    simp: {
      detail: "(tactic) simplifier",
      doc: "Rewrites the goal and hypotheses using the `simp` set of lemmas. Use `simp only [...]` to be explicit and robust.\n\n```lean\nexample (n : Nat) : n + 0 = n := by simp\n```",
    },
    simp_all: {
      detail: "(tactic) simplify everywhere",
      doc: "Runs the simplifier on the goal and all hypotheses, closing simple goals.\n\n```lean\nexample (h : n + 0 = 5) : n = 5 := by simp_all\n```",
    },
    rw: {
      detail: "(tactic) rewrite",
      doc: "Rewrites using hypotheses or lemmas. `rw [h]` rewrites left-to-right; `rw [← h]` right-to-left; `rw [h] at hx` targets a hypothesis.\n\n```lean\nexample (h : a = b) : f a = f b := by rw [h]\n```",
    },
    rewrite: {
      detail: "(tactic) rewrite (alternative)",
      doc: "Alternative spelling of `rw`.",
    },
    exact: {
      detail: "(tactic) exact",
      doc: "Closes the goal with a term of exactly the goal's type.\n\n```lean\nexample (h : p) : p := by exact h\n```",
    },
    apply: {
      detail: "(tactic) apply",
      doc: "Applies a lemma to the goal, generating new subgoals for its premises.\n\n```lean\nexample (h : p → q) (hp : p) : q := by apply h; exact hp\n```",
    },
    assumption: {
      detail: "(tactic) assumption",
      doc: "Closes the goal using a matching hypothesis in the local context.",
    },
    intro: {
      detail: "(tactic) intro",
      doc: "Introduces one variable or hypothesis from a `∀`/`→` goal.\n\n```lean\nexample : ∀ n : Nat, n = n := by intro n; rfl\n```",
    },
    intros: {
      detail: "(tactic) intros",
      doc: "Introduces all leading variables/hypotheses, optionally naming them.\n\n```lean\nexample : ∀ n m : Nat, n + m = m + n := by intros; omega\n```",
    },
    cases: {
      detail: "(tactic) case analysis",
      doc: "Performs case analysis on a term, splitting into one goal per constructor.\n\n```lean\nexample (n : Nat) : n = 0 ∨ n ≠ 0 := by\n  cases n with\n  | zero => left; rfl\n  | succ k => right; simp\n```",
    },
    induction: {
      detail: "(tactic) induction",
      doc: "Performs induction on a term using the constructors of its type.\n\n```lean\ntheorem add_zero (n : Nat) : n + 0 = n := by\n  induction n with\n  | zero => rfl\n  | succ k ih => simp [Nat.add_succ, ih]\n```",
    },
    rcases: {
      detail: "(tactic) recursive cases",
      doc: "Destructs hypotheses with pattern matching.\n\n```lean\nexample (h : p ∧ q) : q := by rcases h with ⟨hp, hq⟩; exact hq\n```",
    },
    obtain: {
      detail: "(tactic) obtain",
      doc: "Destructs a hypothesis or term using a pattern, like `rcases` but supports `:=` for members.\n\n```lean\nobtain ⟨x, hx⟩ := exists_witness\n```",
    },
    rintro: {
      detail: "(tactic) rintro",
      doc: "Combines `intro` and `rcases` with patterns.\n\n```lean\nexample : p → q → p ∧ q := by rintro hp hq; exact ⟨hp, hq⟩\n```",
    },
    constructor: {
      detail: "(tactic) constructor",
      doc: "Applies the first matching constructor of the goal's inductive type.\n\n```lean\nexample : p ∧ q := by constructor\n```",
    },
    left: {
      detail: "(tactic) left",
      doc: "Proves a disjunction `p ∨ q` by proving `p`.",
    },
    right: {
      detail: "(tactic) right",
      doc: "Proves a disjunction `p ∨ q` by proving `q`.",
    },
    use: {
      detail: "(tactic) use",
      doc: "Provides a witness for an existential goal.\n\n```lean\nexample : ∃ n : Nat, n = 3 := by use 3\n```",
    },
    exists: {
      detail: "(tactic) exists",
      doc: "Provides witnesses for an existential goal; a variant of `use`.",
    },
    refine: {
      detail: "(tactic) refine",
      doc: "Applies a term with `_`/`?_` placeholders, creating goals for the holes.\n\n```lean\nexample : p ∧ q := by refine ⟨?_, ?_⟩\n```",
    },
    convert: {
      detail: "(tactic) convert",
      doc: "Applies a lemma up to definitional equality, generating equality goals.\n\n```lean\nexample : f (2 + 2) = g 4 := by convert h using 1\n```",
    },
    have: {
      detail: "(tactic) have",
      doc: "Introduces an intermediate fact, generating a proof obligation for it.\n\n```lean\nhave h : x = y := by rfl\n```",
    },
    show: {
      detail: "(tactic) show",
      doc: "Changes the goal to a definitionally equal statement.\n\n```lean\nshow a = b\n```",
    },
    suffices: {
      detail: "(tactic) suffices",
      doc: "Replaces the goal with a sufficient condition, adding a goal to derive the original from it.\n\n```lean\nsuffices h : p by exact h\n```",
    },
    contradiction: {
      detail: "(tactic) contradiction",
      doc: "Closes the goal using contradictory hypotheses in the context.",
    },
    exfalso: {
      detail: "(tactic) exfalso",
      doc: "Replaces the goal with `False`; useful for proofs by contradiction.\n\n```lean\nexample (h : ¬p) (hp : p) : q := by exfalso; exact h hp\n```",
    },
    by_contra: {
      detail: "(tactic) proof by contradiction",
      doc: "Assumes the negation of the goal and derives `False`.\n\n```lean\nexample (h : ¬p) (hp : p) : q := by by_contra; exact h hp\n```",
    },
    by_cases: {
      detail: "(tactic) split on a proposition",
      doc: "Performs case analysis on a decidable proposition.\n\n```lean\nby_cases h : p\n· exact h\n· exact absurd h hp\n```",
    },
    contrapose: {
      detail: "(tactic) contrapose",
      doc: "Transforms the goal into its contrapositive.",
    },
    push_neg: {
      detail: "(tactic) push_neg",
      doc: "Pushes negations inward (e.g. `¬∀` becomes `∃¬`).",
    },
    specialize: {
      detail: "(tactic) specialize",
      doc: "Applies arguments to a hypothesis in place.\n\n```lean\nspecialize h 3\n```",
    },
    subst: {
      detail: "(tactic) subst",
      doc: "Substitutes a variable using an equality hypothesis and removes it.\n\n```lean\nsubst h\n```",
    },
    unfold: {
      detail: "(tactic) unfold",
      doc: "Unfolds definitions in the goal or hypotheses.\n\n```lean\nunfold myDef\nunfold f at h\n```",
    },
    change: {
      detail: "(tactic) change",
      doc: "Changes the goal to a definitionally equal form.\n\n```lean\nchange a + b = c\n```",
    },
    clear: {
      detail: "(tactic) clear",
      doc: "Removes hypotheses from the context.\n\n```lean\nclear h1 h2\n```",
    },
    revert: {
      detail: "(tactic) revert",
      doc: "Moves hypotheses back into the goal.\n\n```lean\nrevert h\n```",
    },
    generalize: {
      detail: "(tactic) generalize",
      doc: "Replaces a term with a fresh variable in the goal.\n\n```lean\ngeneralize h : n = m\n```",
    },
    rename_i: {
      detail: "(tactic) rename_i",
      doc: "Renames inaccessible (`✝`) hypotheses.\n\n```lean\nrename_i h\n```",
    },
    omega: {
      detail: "(tactic) omega",
      doc: "Decides linear integer and natural number arithmetic goals automatically.",
    },
    linarith: {
      detail: "(tactic) linarith",
      doc: "Proves linear arithmetic goals over ordered (semi)rings, using hypotheses.",
    },
    nlinarith: {
      detail: "(tactic) nlinarith",
      doc: "Extends `linarith` with nonlinear monomial reasoning.",
    },
    norm_num: {
      detail: "(tactic) norm_num",
      doc: "Normalizes numeric expressions and proves concrete arithmetic goals.\n\n```lean\nexample : (2 : ℚ) + 2 = 4 := by norm_num\n```",
    },
    decide: {
      detail: "(tactic) decide",
      doc: "Closes decidable propositions by evaluation.\n\n```lean\nexample : (3 < 5) = True := by decide\n```",
    },
    native_decide: {
      detail: "(tactic) native_decide",
      doc: "Closes decidable propositions by compiled evaluation. Trusts the compiler.",
    },
    ring: {
      detail: "(tactic) ring",
      doc: "Proves equalities in commutative (semi)rings by normalizing polynomials.\n\n```lean\nexample (x y : ℤ) : (x + y)^2 = x^2 + 2*x*y + y^2 := by ring\n```",
    },
    ring_nf: {
      detail: "(tactic) ring_nf",
      doc: "Normalizes expressions in a commutative (semi)ring without closing the goal.",
    },
    field_simp: {
      detail: "(tactic) field_simp",
      doc: "Clears denominators in a field, turning a goal into a polynomial statement.",
    },
    positivity: {
      detail: "(tactic) positivity",
      doc: "Proves positivity (or nonnegativity) of numeric expressions.",
    },
    norm_cast: {
      detail: "(tactic) norm_cast",
      doc: "Normalizes casts between numeric types (`ℕ`, `ℤ`, `ℚ`, `ℝ`).",
    },
    push_cast: {
      detail: "(tactic) push_cast",
      doc: "Pushes casts inward through arithmetic operations.",
    },
    exact_mod_cast: {
      detail: "(tactic) exact_mod_cast",
      doc: "Like `exact`, but casts are normalized first.",
    },
    ext: {
      detail: "(tactic) extensionality",
      doc: "Applies the appropriate extensionality lemma.\n\n```lean\nexample (f : Nat → Nat) : (fun x => f x) = f := by ext x; rfl\n```",
    },
    fun_prop: {
      detail: "(tactic) fun_prop",
      doc: "Discharges goals about function properties (continuity, differentiability, measurability, ...).",
    },
    aesop: {
      detail: "(tactic) aesop",
      doc: "Best-first proof search using rules registered with `@[aesop]`.",
    },
    tauto: {
      detail: "(tactic) tauto",
      doc: "Decides propositional tautologies (intuitionistic).",
    },
    ac_rfl: {
      detail: "(tactic) ac_rfl",
      doc: "Proves equalities up to associativity and commutativity.",
    },
    trivial: {
      detail: "(tactic) trivial",
      doc: "Closes trivial goals such as `True` or `a = a`.",
    },
    split: {
      detail: "(tactic) split",
      doc: "Splits `if`/`match`/`match` goals into cases.",
    },
    injection: {
      detail: "(tactic) injection",
      doc: "Extracts equalities from an equality of constructor applications.\n\n```lean\ninjection h with h1 h2\n```",
    },
    congr: {
      detail: "(tactic) congr",
      doc: "Reduces an equality of applications to equalities of the arguments.",
    },
    convert_to: {
      detail: "(tactic) convert_to",
      doc: "Changes the goal, generating an equality subgoal with the original.",
    },
    first: {
      detail: "(tactic combinator) first",
      doc: "Runs the first tactic that succeeds: `first | tac1 | tac2`.",
    },
    try: {
      detail: "(tactic combinator) try",
      doc: "Runs a tactic, ignoring failure: `try tac`.",
    },
    repeat: {
      detail: "(tactic combinator) repeat",
      doc: "Repeats a tactic until it fails: `repeat tac`.",
    },
    all_goals: {
      detail: "(tactic combinator) all_goals",
      doc: "Applies a tactic to every current goal: `all_goals tac`.",
    },
    any_goals: {
      detail: "(tactic combinator) any_goals",
      doc: "Applies a tactic to each goal, succeeding if at least one succeeds.",
    },
    focus: {
      detail: "(tactic combinator) focus",
      doc: "Runs a tactic on the first goal, failing if other goals remain.",
    },
    conv: {
      detail: "(tactic) conv",
      doc: "Enters a goal-directed rewriting mode, navigating to subterms.\n\n```lean\nconv =>\n  lhs\n  rw [h]\n```",
    },
    calc: {
      detail: "(term/tactic) calc",
      doc: "Structured calculational proofs.\n\n```lean\nexample (a b c : Nat) (h1 : a = b) (h2 : b = c) : a = c := by\n  calc a = b := h1\n    _ = c := h2\n```",
    },

    // ── Types & constants ─────────────────────────────────────────
    Prop: {
      detail: "(type) Prop",
      doc: "The type of propositions. Proof-irrelevant: any two proofs of the same `p : Prop` are definitionally equal.",
    },
    Type: {
      detail: "(type) Type u",
      doc: "The type of types. `Type` is shorthand for `Type 0`; `Type : Type 1 : Type 2 : ...`",
    },
    Sort: {
      detail: "(type) Sort u",
      doc: "The most general universe: `Prop` is `Sort 0`, `Type u` is `Sort (u + 1)`.",
    },
    Nat: {
      detail: "(type) Nat",
      doc: "Arbitrary-precision natural numbers (`0`, `succ`, ...).\n\n```lean\ndef n : Nat := 42\n```",
    },
    Int: {
      detail: "(type) Int",
      doc: "Arbitrary-precision integers (`ofNat`/`negSucc`).",
    },
    Bool: {
      detail: "(type) Bool",
      doc: "Two-element boolean type: `true` and `false`. Distinct from `Prop`.",
    },
    String: {
      detail: "(type) String",
      doc: "UTF-8 encoded string type, with `s!\"...\"` interpolation syntax.",
    },
    Char: {
      detail: "(type) Char",
      doc: "Unicode scalar value, written with single quotes, e.g. `'a'`, `'\\n'`.",
    },
    Unit: {
      detail: "(type) Unit",
      doc: "The type with a single element `()`.",
    },
    Empty: {
      detail: "(type) Empty",
      doc: "The empty (uninhabited) type.",
    },
    List: {
      detail: "(type) List α",
      doc: "Singly-linked list. Build with `[a, b, c]` or `a :: rest`.\n\n```lean\ndef xs : List Nat := [1, 2, 3]\n```",
    },
    Array: {
      detail: "(type) Array α",
      doc: "Imperative, amortized O(1) array with efficient functional operations.\n\n```lean\ndef xs : Array Nat := #[1, 2, 3]\n```",
    },
    Option: {
      detail: "(type) Option α",
      doc: "Optional value: `some a` or `none`.",
    },
    Sum: {
      detail: "(type) Sum α β",
      doc: "Disjoint sum type: `Sum.inl a` or `Sum.inr b` (`α ⊕ β`).",
    },
    Prod: {
      detail: "(type) Prod α β",
      doc: "Product (pair) type `α × β`, constructed with `(a, b)` or `⟨a, b⟩`; projections `fst`/`snd`.",
    },
    Sigma: {
      detail: "(type) Sigma β",
      doc: "Dependent pair type `Σ a, β a` (also `Subtype` for a predicate).",
    },
    Subtype: {
      detail: "(type) Subtype p",
      doc: "Elements of a type satisfying a predicate: `{ x // p x }`.",
    },
    Fin: {
      detail: "(type) Fin n",
      doc: "Bounded natural numbers `{ k // k < n }`.",
    },
    Vector: {
      detail: "(type) Vector α n",
      doc: "Lists of fixed length `n`.",
    },
    Set: {
      detail: "(type) Set α",
      doc: "Predicate-based set `α → Prop` (note: Mathlib also provides `Set` operations).",
    },
    Finset: {
      detail: "(type) Finset α",
      doc: "Finite set with decidable membership (Mathlib).\n\n```lean\nopen Finset\ndef s : Finset Nat := {1, 2, 3}\n```",
    },
    IO: {
      detail: "(type) IO α",
      doc: "Imperative computations producing an `α` or an error.\n\n```lean\ndef main : IO Unit := IO.println \"Hello\"\n```",
    },
    Except: {
      detail: "(type) Except ε α",
      doc: "The result of a computation that either fails with `ε` or succeeds with `α`.",
    },
    Decidable: {
      detail: "(type) Decidable p",
      doc: "Decision procedure for a proposition: `isTrue h` or `isFalse h`.\n\n```lean\nif h : p then ... else ...\n```",
    },
    Inhabited: {
      detail: "(class) Inhabited α",
      doc: "Type class providing a default element `default : α`.",
    },
    Nonempty: {
      detail: "(prop) Nonempty α",
      doc: "Prop-valued existence of an element of `α` (proof-irrelevant, noncomputable elimination).",
    },
    Eq: {
      detail: "(type) Eq a b",
      doc: "Equality type (`a = b`), with `rfl` as its only constructor.",
    },
    Iff: {
      detail: "(type) Iff p q",
      doc: "Logical equivalence `p ↔ q`, a pair of implications.",
    },
    true: { detail: "(prop) True", doc: "The proposition that is trivially true." },
    false: { detail: "(prop) False", doc: "The uninhabited proposition." },
    True: { detail: "(prop) True", doc: "The proposition that is trivially true." },
    False: { detail: "(prop) False", doc: "The uninhabited proposition." },

    // ── Common functions (dotted names for hover/completion) ─────
    "List.map": {
      detail: "List.map (f : α → β) : List α → List β",
      doc: "Applies `f` to every element of a list.\n\n```lean\n#[1, 2, 3].toList.map (· * 2) = [2, 4, 6]\n```",
    },
    "List.filter": {
      detail: "List.filter (p : α → Bool) : List α → List α",
      doc: "Keeps the elements satisfying the boolean predicate `p`.",
    },
    "List.foldl": {
      detail: "List.foldl (f : β → α → β) (init : β) : List α → β",
      doc: "Left fold over a list.",
    },
    "List.foldr": {
      detail: "List.foldr (f : α → β → β) (init : β) : List α → β",
      doc: "Right fold over a list.",
    },
    "List.length": {
      detail: "List.length : List α → Nat",
      doc: "Returns the number of elements of a list.",
    },
    "List.reverse": {
      detail: "List.reverse : List α → List α",
      doc: "Reverses a list.",
    },
    "List.append": {
      detail: "List.append : List α → List α → List α",
      doc: "Concatenates two lists (`xs ++ ys`).",
    },
    "List.head?": {
      detail: "List.head? : List α → Option α",
      doc: "Returns the first element, or `none` for the empty list.",
    },
    "List.get?": {
      detail: "List.get? : List α → Nat → Option α",
      doc: "Returns the element at an index, or `none` if out of bounds.",
    },
    "List.sum": {
      detail: "List.sum [AddMonoid α] : List α → α",
      doc: "Sums the elements of a list of an additive monoid.",
    },
    "Array.push": {
      detail: "Array.push : Array α → α → Array α",
      doc: "Returns a new array with the element appended.",
    },
    "Array.get?": {
      detail: "Array.get? : Array α → Nat → Option α",
      doc: "Returns the element at an index, or `none` if out of bounds.",
    },
    "Array.size": {
      detail: "Array.size : Array α → Nat",
      doc: "The number of elements in an array.",
    },
    "Option.getD": {
      detail: "Option.getD : Option α → α → α",
      doc: "Returns the contained value, or the provided default.",
    },
    "Option.map": {
      detail: "Option.map (f : α → β) : Option α → Option β",
      doc: "Applies `f` inside a `some`, leaves `none` unchanged.",
    },
    "Option.get?": {
      detail: "Option.get? : Option α → Option α",
      doc: "Identity on options; useful to fit into `get?` notation.",
    },
    "Nat.succ": {
      detail: "Nat.succ : Nat → Nat",
      doc: "Successor of a natural number (`n + 1`).",
    },
    "Nat.add": {
      detail: "Nat.add : Nat → Nat → Nat",
      doc: "Addition of natural numbers (`+`).",
    },
    "Nat.sub": {
      detail: "Nat.sub : Nat → Nat → Nat",
      doc: "Truncated subtraction on naturals (`-`), saturating at zero.",
    },
    "Nat.mul": {
      detail: "Nat.mul : Nat → Nat → Nat",
      doc: "Multiplication of natural numbers (`*`).",
    },
    "Nat.pow": {
      detail: "Nat.pow : Nat → Nat → Nat",
      doc: "Exponentiation of natural numbers (`^`).",
    },
    "Nat.gcd": {
      detail: "Nat.gcd : Nat → Nat → Nat",
      doc: "Greatest common divisor.",
    },
    "Nat.toInt": {
      detail: "Nat.toInt : Nat → Int",
      doc: "Coerces a natural number to an integer.",
    },
    "Int.ofNat": {
      detail: "Int.ofNat : Nat → Int",
      doc: "Coerces a natural number to an integer (also written `(n : ℤ)`).",
    },
    "Int.natAbs": {
      detail: "Int.natAbs : Int → Nat",
      doc: "Absolute value of an integer as a natural number.",
    },
    "String.append": {
      detail: "String.append : String → String → String",
      doc: "Concatenation of strings (`++`).",
    },
    "String.length": {
      detail: "String.length : String → Nat",
      doc: "Number of Unicode characters in a string.",
    },
    "String.intercalate": {
      detail: "String.intercalate (sep : String) : List String → String",
      doc: "Joins a list of strings, inserting `sep` between elements.",
    },
    "IO.println": {
      detail: "IO.println : String → IO Unit",
      doc: "Prints a string followed by a newline to standard output.",
    },
    "IO.print": {
      detail: "IO.print : String → IO Unit",
      doc: "Prints a string to standard output without a newline.",
    },
    "IO.eprintln": {
      detail: "IO.eprintln : String → IO Unit",
      doc: "Prints a string followed by a newline to standard error.",
    },
    "IO.getLine": {
      detail: "IO.getLine : IO String",
      doc: "Reads a line from standard input.",
    },
    "IO.FS.readFile": {
      detail: "IO.FS.readFile : System.FilePath → IO String",
      doc: "Reads a file into a string.",
    },
    "IO.FS.writeFile": {
      detail: "IO.FS.writeFile : System.FilePath → String → IO Unit",
      doc: "Writes a string to a file, overwriting it.",
    },
    "Finset.sum": {
      detail: "Finset.sum : Finset α → (α → β) → β",
      doc: "Sum of a function over a finite set (`∑ x ∈ s, f x`).",
    },
    "Finset.prod": {
      detail: "Finset.prod : Finset α → (α → β) → β",
      doc: "Product of a function over a finite set (`∏ x ∈ s, f x`).",
    },
    "Finset.card": {
      detail: "Finset.card : Finset α → Nat",
      doc: "The number of elements of a finite set.",
    },
    "Function.comp": {
      detail: "Function.comp : (β → γ) → (α → β) → α → γ",
      doc: "Function composition (`g ∘ f`).",
    },
    "Prod.fst": {
      detail: "Prod.fst : α × β → α",
      doc: "First projection of a pair.",
    },
    "Prod.snd": {
      detail: "Prod.snd : α × β → β",
      doc: "Second projection of a pair.",
    },
  };

  // ────────────────────────────────────────────────────────────────────
  //  5. CODE SNIPPETS
  // ────────────────────────────────────────────────────────────────────
  const snippets = [
    {
      label: "def",
      detail: "Definition",
      insertText: "def ${1:name} (${2:x} : ${3:α}) : ${4:β} :=\n  ${0:sorry}",
      doc: "Define a function with an explicit signature.",
    },
    {
      label: "def-simple",
      detail: "Simple definition",
      insertText: "def ${1:name} := ${0:value}",
      doc: "Define a value with an inferred type.",
    },
    {
      label: "theorem",
      detail: "Theorem",
      insertText: "theorem ${1:name} (${2:x} : ${3:α}) : ${4:proposition} := by\n  ${0:sorry}",
      doc: "Declare and prove a theorem using tactic mode.",
    },
    {
      label: "theorem-term",
      detail: "Theorem (term mode)",
      insertText: "theorem ${1:name} : ${2:proposition} :=\n  ${0:sorry}",
      doc: "Declare a theorem with a term-mode proof.",
    },
    {
      label: "lemma",
      detail: "Lemma",
      insertText: "lemma ${1:name} (${2:x} : ${3:α}) : ${4:proposition} := by\n  ${0:sorry}",
      doc: "Declare an auxiliary lemma.",
    },
    {
      label: "example",
      detail: "Example",
      insertText: "example (${1:x} : ${2:α}) : ${3:proposition} := by\n  ${0:sorry}",
      doc: "An anonymous example.",
    },
    {
      label: "structure",
      detail: "Structure",
      insertText:
        "structure ${1:Name} where\n  ${2:field} : ${3:Type}\n  ${0}",
      doc: "Declare a record type with named fields.",
    },
    {
      label: "structure-deriving",
      detail: "Structure with deriving",
      insertText:
        "structure ${1:Name} where\n  ${2:field} : ${3:Type}\n  deriving ${0:Repr, BEq}",
      doc: "Declare a record type and derive instances.",
    },
    {
      label: "inductive",
      detail: "Inductive type",
      insertText:
        "inductive ${1:Name} where\n  | ${2:ctor} : ${1:Name}\n  ${0}",
      doc: "Declare an inductive type.",
    },
    {
      label: "inductive-params",
      detail: "Inductive type with parameters",
      insertText:
        "inductive ${1:Name} (${2:α} : Type) where\n  | ${3:mk} : ${2:α} → ${1:Name} ${2:α}\n  ${0}",
      doc: "Declare a parameterized inductive type.",
    },
    {
      label: "class",
      detail: "Type class",
      insertText: "class ${1:Name} (${2:α} : Type) where\n  ${3:op} : ${2:α} → ${2:α}\n  ${0}",
      doc: "Declare a type class.",
    },
    {
      label: "instance",
      detail: "Type class instance",
      insertText: "instance ${1:name} : ${2:ClassName} ${3:Type} where\n  ${0:op := sorry}",
      doc: "Provide a type class instance.",
    },
    {
      label: "namespace",
      detail: "Namespace block",
      insertText: "namespace ${1:Name}\n\n${0}\n\nend ${1:Name}",
      doc: "Open a namespace and close it with `end`.",
    },
    {
      label: "section",
      detail: "Section block",
      insertText: "section ${1:Name}\n\n${0}\n\nend ${1:Name}",
      doc: "Open a section and close it with `end`.",
    },
    {
      label: "variable",
      detail: "Variable declaration",
      insertText: "variable (${1:α} : ${2:Type}) (${0:x : α})",
      doc: "Declare variables generalized over subsequent declarations.",
    },
    {
      label: "universe",
      detail: "Universe declaration",
      insertText: "universe ${0:u v}",
      doc: "Declare universe level variables.",
    },
    {
      label: "import",
      detail: "Import module",
      insertText: "import ${0:Mathlib}",
      doc: "Import a module (top of file only).",
    },
    {
      label: "open",
      detail: "Open namespaces",
      insertText: "open ${0:Nat}",
      doc: "Open namespaces or scoped notation.",
    },
    {
      label: "match",
      detail: "Match expression",
      insertText: "match ${1:scrutinee} with\n  | ${2:pattern} => ${0:sorry}\n",
      doc: "Pattern-match on a value.",
    },
    {
      label: "match-nat",
      detail: "Match on Nat",
      insertText: "match ${1:n} with\n  | 0 => ${2:sorry}\n  | n + 1 => ${0:sorry}",
      doc: "Pattern-match on a natural number.",
    },
    {
      label: "if-then-else",
      detail: "If-then-else",
      insertText: "if ${1:condition} then\n  ${2:sorry}\nelse\n  ${0:sorry}",
      doc: "Conditional expression.",
    },
    {
      label: "let-in",
      detail: "Let expression",
      insertText: "let ${1:x} := ${2:value}\n${0}",
      doc: "Introduce a local definition.",
    },
    {
      label: "fun",
      detail: "Anonymous function",
      insertText: "fun ${1:x} => ${0:body}",
      doc: "Anonymous function (`λ x => body`).",
    },
    {
      label: "have",
      detail: "Intermediate fact",
      insertText: "have ${1:h} : ${2:proposition} := by\n  ${3:sorry}\n${0}",
      doc: "Introduce an intermediate fact in tactic mode.",
    },
    {
      label: "suffices",
      detail: "Suffices",
      insertText: "suffices ${1:h} : ${2:proposition} by\n  ${3:sorry}\n${0}",
      doc: "Replace the goal with a sufficient statement.",
    },
    {
      label: "calc",
      detail: "Calculational proof",
      insertText:
        "calc\n  ${1:a} = ${2:b} := by ${3:sorry}\n  _ = ${4:c} := by ${0:sorry}",
      doc: "Chained equational reasoning.",
    },
    {
      label: "induction",
      detail: "Induction",
      insertText:
        "induction ${1:n} with\n  | zero => ${2:sorry}\n  | succ ${3:k} ${4:ih} => ${0:sorry}",
      doc: "Induction on a natural number.",
    },
    {
      label: "cases",
      detail: "Case analysis",
      insertText: "cases ${1:x} with\n  | ${2:ctor} => ${0:sorry}",
      doc: "Split into cases on a value.",
    },
    {
      label: "rcases",
      detail: "Destruct with patterns",
      insertText: "rcases ${1:h} with ⟨${2:hl}, ${3:hr}⟩\n${0}",
      doc: "Destruct a hypothesis using patterns.",
    },
    {
      label: "obtain",
      detail: "Obtain witness",
      insertText: "obtain ⟨${1:x}, ${2:hx}⟩ := ${3:h}\n${0}",
      doc: "Destruct an existential or conjunction.",
    },
    {
      label: "by-cases",
      detail: "Case split on proposition",
      insertText: "by_cases ${1:h} : ${2:p}\n· ${3:sorry}\n· ${0:sorry}",
      doc: "Split on a decidable proposition.",
    },
    {
      label: "rw",
      detail: "Rewrite",
      insertText: "rw [${0:h}]",
      doc: "Rewrite using a hypothesis or lemma.",
    },
    {
      label: "simp",
      detail: "Simplify",
      insertText: "simp only [${0:lemmas}]",
      doc: "Simplify using an explicit lemma set.",
    },
    {
      label: "instance-deriving",
      detail: "Deriving instance",
      insertText: "deriving instance ${1:Repr} for ${0:Type}",
      doc: "Derive an instance for an existing type.",
    },
    {
      label: "notation",
      detail: "Notation",
      insertText: "notation ${1:x} \" ${2:sym} \" ${3:y} => ${0:op x y}",
      doc: "Declare new notation.",
    },
    {
      label: "syntax",
      detail: "Syntax declaration",
      insertText: "syntax \"${1:keyword}\" : ${2:tactic}",
      doc: "Declare new syntax.",
    },
    {
      label: "macro",
      detail: "Macro",
      insertText: "macro \"${1:keyword}\" : ${2:tactic} => `(tactic| ${0:simp})",
      doc: "Declare a syntax macro.",
    },
    {
      label: "main",
      detail: "Main function",
      insertText: "def main : IO Unit := do\n  IO.println \"${0:Hello, Lean!}\"",
      doc: "Executable entry point.",
    },
    {
      label: "do-block",
      detail: "Do block",
      insertText: "do\n  let ${1:x} ← ${2:action}\n  ${0:return x}",
      doc: "Imperative `do` block.",
    },
    {
      label: "check",
      detail: "#check command",
      insertText: "#check ${0:Nat}",
      doc: "Ask the elaborator for a term's type.",
    },
    {
      label: "eval",
      detail: "#eval command",
      insertText: "#eval ${0:1 + 1}",
      doc: "Evaluate a term at elaboration time.",
    },
    {
      label: "partial-def",
      detail: "Partial definition",
      insertText: "partial def ${1:name} (${2:n} : Nat) : ${3:β} :=\n  ${0:sorry}",
      doc: "Define a non-terminating (partial) function.",
    },
    {
      label: "termination",
      detail: "Termination clause",
      insertText: "termination_by ${1:measure}\ndecreasing_by ${0:sorry}",
      doc: "Specify a termination measure for a recursive definition.",
    },
    {
      label: "calc-tactic",
      detail: "Calc block in tactic mode",
      insertText: "calc\n  ${1:a} = ${2:b} := by ${3:sorry}\n  _ = ${4:c} := by ${0:sorry}",
      doc: "Calculational proof inside `by`.",
    },
  ];

  // ────────────────────────────────────────────────────────────────────
  //  6. NAMESPACE MEMBERS (for dot completion)
  // ────────────────────────────────────────────────────────────────────
  const namespaceMembers: Record<string, string[]> = {
    List: [
      "map",
      "filter",
      "foldl",
      "foldr",
      "length",
      "reverse",
      "append",
      "concat",
      "join",
      "head",
      "head?",
      "tail",
      "tail?",
      "get",
      "get?",
      "getLast",
      "getLast?",
      "set",
      "zip",
      "zipWith",
      "unzip",
      "range",
      "replicate",
      "enumFrom",
      "sum",
      "prod",
      "max",
      "min",
      "take",
      "drop",
      "takeWhile",
      "dropWhile",
      "partition",
      "find?",
      "any",
      "all",
      "erase",
      "insert",
      "contains",
      "countP",
      "mem",
      "toArray",
      "toVector",
    ],
    Array: [
      "push",
      "pop",
      "get",
      "get?",
      "set",
      "size",
      "toList",
      "foldl",
      "foldr",
      "map",
      "filter",
      "reverse",
      "append",
      "mkArray",
      "range",
      "zip",
      "zipWith",
      "qsort",
      "insertionSort",
      "singleton",
      "empty",
    ],
    Option: [
      "get",
      "getD",
      "isSome",
      "isNone",
      "map",
      "bind",
      "join",
      "filter",
      "guard",
      "orElse",
      "or",
      "elim",
      "toList",
      "some",
      "none",
      "seq",
    ],
    Nat: [
      "succ",
      "pred",
      "add",
      "sub",
      "mul",
      "div",
      "mod",
      "pow",
      "gcd",
      "lcm",
      "log2",
      "sqrt",
      "min",
      "max",
      "abs",
      "toInt",
      "toFloat",
      "zero",
      "one",
      "two",
      "factorial",
      "fib",
      "choose",
      "range",
    ],
    Int: [
      "ofNat",
      "negSucc",
      "add",
      "sub",
      "mul",
      "div",
      "mod",
      "pow",
      "gcd",
      "lcm",
      "abs",
      "toNat",
      "toFloat",
      "natAbs",
      "ediv",
      "emod",
      "sign",
      "min",
      "max",
    ],
    String: [
      "append",
      "length",
      "push",
      "pop",
      "get",
      "get?",
      "toList",
      "toArray",
      "toNat",
      "isPrefixOf",
      "isSuffixOf",
      "contains",
      "startsWith",
      "endsWith",
      "replace",
      "split",
      "join",
      "trim",
      "trimLeft",
      "trimRight",
      "toUpper",
      "toLower",
      "capitalize",
      "intercalate",
      "take",
      "drop",
      "reverse",
      "map",
      "filter",
      "foldl",
      "foldr",
    ],
    IO: [
      "println",
      "print",
      "eprintln",
      "eprint",
      "getLine",
      "readLine",
      "Process.run",
      "Process.spawn",
    ],
    Finset: [
      "sum",
      "prod",
      "max",
      "min",
      "card",
      "insert",
      "erase",
      "union",
      "inter",
      "filter",
      "map",
      "image",
      "range",
      "univ",
      "empty",
      "singleton",
      "powerset",
      "sup",
      "inf",
      "biUnion",
      "disjUnion",
    ],
    Function: [
      "comp",
      "const",
      "id",
      "flip",
      "on",
      "uncurry",
      "curry",
      "swap",
      "Injective",
      "Surjective",
      "Bijective",
      "LeftInverse",
      "RightInverse",
    ],
    Set: [
      "union",
      "inter",
      "diff",
      "compl",
      "subset",
      "insert",
      "erase",
      "mem",
      "range",
      "univ",
      "empty",
      "singleton",
      "image",
      "preimage",
      "iUnion",
      "iInter",
      "prod",
      "powerset",
    ],
    Sum: ["inl", "inr", "elim", "map", "swap", "getLeft?", "getRight?"],
    Prod: ["fst", "snd", "swap", "map", "mk"],
    Decidable: ["decide", "isFalse", "isTrue"],
  };

  // ────────────────────────────────────────────────────────────────────
  //  7. SYMBOL PARSER
  // ────────────────────────────────────────────────────────────────────
  interface LeanSymbol {
    name: string;
    kind: string;
    line: number;
    column: number;
    endColumn: number;
    detail: string;
  }

  const MODIFIERS =
    "(?:(?:private|protected|noncomputable|unsafe|partial|nonrec|scoped|local)\\s+)*";
  const ATTRIBUTES = "(?:@\\[[^\\]]*\\]\\s*)*";
  const DECLARATION_PATTERNS: {
    re: RegExp;
    kind: string;
    group: number;
  }[] = [
    {
      re: new RegExp(
        "^\\s*" +
          ATTRIBUTES +
          MODIFIERS +
          "(theorem|lemma)\\s+([^\\s\\[\\](){},:;=]+)",
      ),
      kind: "theorem",
      group: 2,
    },
    {
      re: new RegExp(
        "^\\s*" +
          ATTRIBUTES +
          MODIFIERS +
          "(def|abbrev|opaque|axiom|constant)\\s+([^\\s\\[\\](){},:;=]+)",
      ),
      kind: "def",
      group: 2,
    },
    {
      re: new RegExp(
        "^\\s*" +
          ATTRIBUTES +
          MODIFIERS +
          "(structure|class|inductive)\\s+([^\\s\\[\\](){},:;=]+)",
      ),
      kind: "structure",
      group: 2,
    },
    {
      re: new RegExp(
        "^\\s*" +
          ATTRIBUTES +
          MODIFIERS +
          "instance\\s+([^\\s\\[\\](){},:;=]+)",
      ),
      kind: "instance",
      group: 1,
    },
    {
      re: /^\s*(?:@\[[^\]]*\]\s*)*(?:private\s+|protected\s+)?(namespace|section)\s+([^\s\[(){},:;=]+)/,
      kind: "namespace",
      group: 2,
    },
    {
      re: /^\s*(?:@\[[^\]]*\]\s*)*(?:private\s+|protected\s+)?(syntax|macro|macro_rules|elab|elab_rules)\s+(?:"([^"]*)"|([^\s\[(){},:;=]+))/,
      kind: "syntax",
      group: 2,
    },
    {
      re: /^\s*(?:@\[[^\]]*\]\s*)*(?:private\s+|protected\s+)?(notation|infixl|infixr|infix|prefix|postfix)\s+/,
      kind: "notation",
      group: 0,
    },
    {
      re: /^\s*(universe)\s+(.+)$/,
      kind: "universe",
      group: 2,
    },
    {
      re: /^\s*(variable)\s+\(([^)]*)\)/,
      kind: "variable",
      group: 2,
    },
  ];

  function parseSymbols(model: Monaco.editor.ITextModel): LeanSymbol[] {
    const symbols: LeanSymbol[] = [];
    const lines = model.getLinesContent();

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (!line.trim() || /^\s*(--|\/-)/.test(line)) continue;

      for (const pattern of DECLARATION_PATTERNS) {
        const m = line.match(pattern.re);
        if (!m) continue;

        const rawName = (m[pattern.group] || m[1] || "").trim();
        if (!rawName) continue;

        if (pattern.kind === "universe") {
          for (const name of rawName.split(/\s+/)) {
            if (name) pushSymbol(symbols, name, "universe", line, i);
          }
          break;
        }

        if (pattern.kind === "variable") {
          // (x y : Nat) → x, y
          for (const group of rawName.split(")")) {
            const names = group.split(":")[0].trim();
            if (!names) continue;
            for (const name of names.split(/\s+/)) {
              if (name && !name.startsWith("(")) {
                pushSymbol(symbols, name.replace(/^\(/, ""), "variable", line, i);
              }
            }
          }
          break;
        }

        if (pattern.kind === "notation") {
          const quoted = line.match(/"([^"]*)"/);
          const name = quoted ? `"${quoted[1]}"` : m[1];
          if (name) pushSymbol(symbols, name, "notation", line, i);
          break;
        }

        pushSymbol(symbols, rawName, pattern.kind, line, i);
        break;
      }
    }

    return symbols;
  }

  function pushSymbol(
    symbols: LeanSymbol[],
    name: string,
    kind: string,
    line: string,
    lineIndex: number,
  ) {
    const column = line.indexOf(name) + 1;
    if (column <= 0) return;
    symbols.push({
      name,
      kind,
      line: lineIndex + 1,
      column,
      endColumn: column + name.length,
      detail: line.trim(),
    });
  }

  function symbolKind(kind: string) {
    switch (kind) {
      case "theorem":
        return monaco.languages.SymbolKind.Function;
      case "def":
        return monaco.languages.SymbolKind.Function;
      case "structure":
        return monaco.languages.SymbolKind.Struct;
      case "class":
        return monaco.languages.SymbolKind.Class;
      case "inductive":
        return monaco.languages.SymbolKind.Enum;
      case "instance":
        return monaco.languages.SymbolKind.Object;
      case "namespace":
        return monaco.languages.SymbolKind.Namespace;
      case "syntax":
        return monaco.languages.SymbolKind.Function;
      case "notation":
        return monaco.languages.SymbolKind.Operator;
      case "universe":
        return monaco.languages.SymbolKind.TypeParameter;
      case "variable":
        return monaco.languages.SymbolKind.Variable;
      default:
        return monaco.languages.SymbolKind.Variable;
    }
  }

  function completionKind(kind: string) {
    switch (kind) {
      case "theorem":
        return monaco.languages.CompletionItemKind.Method;
      case "def":
        return monaco.languages.CompletionItemKind.Function;
      case "structure":
        return monaco.languages.CompletionItemKind.Struct;
      case "class":
        return monaco.languages.CompletionItemKind.Interface;
      case "inductive":
        return monaco.languages.CompletionItemKind.Enum;
      case "instance":
        return monaco.languages.CompletionItemKind.Value;
      case "namespace":
        return monaco.languages.CompletionItemKind.Module;
      case "syntax":
        return monaco.languages.CompletionItemKind.Function;
      case "notation":
        return monaco.languages.CompletionItemKind.Operator;
      case "universe":
        return monaco.languages.CompletionItemKind.TypeParameter;
      case "variable":
        return monaco.languages.CompletionItemKind.Variable;
      default:
        return monaco.languages.CompletionItemKind.Text;
    }
  }

  // ────────────────────────────────────────────────────────────────────
  //  8. COMPLETION PROVIDER (auto-complete + snippets)
  // ────────────────────────────────────────────────────────────────────
  const keywordItems = [
    "def",
    "theorem",
    "lemma",
    "example",
    "abbrev",
    "axiom",
    "opaque",
    "constant",
    "structure",
    "class",
    "inductive",
    "instance",
    "namespace",
    "section",
    "end",
    "import",
    "open",
    "export",
    "attribute",
    "notation",
    "syntax",
    "macro",
    "elab",
    "deriving",
    "where",
    "mutual",
    "variable",
    "universe",
    "private",
    "protected",
    "noncomputable",
    "partial",
    "unsafe",
    "set_option",
    "initialize",
  ];

  const tacticItems = [
    "exact",
    "apply",
    "intro",
    "intros",
    "rfl",
    "simp",
    "simp_all",
    "rw",
    "rewrite",
    "induction",
    "cases",
    "rcases",
    "obtain",
    "rintro",
    "constructor",
    "left",
    "right",
    "use",
    "refine",
    "have",
    "show",
    "suffices",
    "by_contra",
    "by_cases",
    "contradiction",
    "exfalso",
    "contrapose",
    "push_neg",
    "omega",
    "linarith",
    "nlinarith",
    "norm_num",
    "decide",
    "native_decide",
    "ring",
    "ring_nf",
    "field_simp",
    "positivity",
    "norm_cast",
    "push_cast",
    "exact_mod_cast",
    "ext",
    "fun_prop",
    "aesop",
    "tauto",
    "ac_rfl",
    "trivial",
    "split",
    "injection",
    "subst",
    "clear",
    "revert",
    "unfold",
    "change",
    "generalize",
    "specialize",
    "rename_i",
    "assumption",
    "repeat",
    "try",
    "first",
    "all_goals",
    "any_goals",
    "focus",
    "conv",
    "calc",
  ];

  const typeItems = [
    "Prop",
    "Type",
    "Sort",
    "Nat",
    "Int",
    "Bool",
    "String",
    "Char",
    "Float",
    "Rat",
    "Real",
    "Complex",
    "Unit",
    "Empty",
    "List",
    "Array",
    "Vector",
    "Option",
    "Sum",
    "Prod",
    "Sigma",
    "Subtype",
    "Set",
    "Finset",
    "Multiset",
    "Fin",
    "IO",
    "Except",
    "Decidable",
    "Inhabited",
    "Nonempty",
    "UInt8",
    "UInt16",
    "UInt32",
    "UInt64",
    "USize",
    "Int8",
    "Int16",
    "Int32",
    "Int64",
    "ISize",
  ];

  const functionItems = [
    "sorry",
    "admit",
    "id",
    "Function.comp",
    "List.map",
    "List.filter",
    "List.foldl",
    "List.foldr",
    "List.length",
    "List.reverse",
    "List.append",
    "List.sum",
    "Array.push",
    "Array.get?",
    "Array.size",
    "Option.getD",
    "Option.map",
    "Nat.succ",
    "Nat.add",
    "Nat.sub",
    "Nat.mul",
    "Nat.pow",
    "Nat.gcd",
    "Int.ofNat",
    "Int.natAbs",
    "String.append",
    "String.length",
    "String.intercalate",
    "IO.println",
    "IO.print",
    "IO.eprintln",
    "IO.getLine",
    "IO.FS.readFile",
    "IO.FS.writeFile",
    "Finset.sum",
    "Finset.prod",
    "Finset.card",
    "Prod.fst",
    "Prod.snd",
    "Sum.inl",
    "Sum.inr",
  ];

  monaco.languages.registerCompletionItemProvider(LANG_ID, {
    triggerCharacters: [".", " "],
    provideCompletionItems: function (model, position) {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };

      const suggestions: Monaco.languages.CompletionItem[] = [];

      // Namespace member completion after a dot (e.g. `List.ma`)
      const lineContent = model.getLineContent(position.lineNumber);
      const before = lineContent.substring(0, position.column - 1);
      const dotMatch = before.match(/([A-Z][\w']*)\.(\w*)$/);
      if (dotMatch && namespaceMembers[dotMatch[1]]) {
        const namespace = dotMatch[1];
        for (const member of namespaceMembers[namespace]) {
          const info = leanDocs[namespace + "." + member];
          suggestions.push({
            label: member,
            kind: monaco.languages.CompletionItemKind.Method,
            insertText: member,
            detail: info ? info.detail : namespace + "." + member,
            documentation: info ? { value: info.doc } : undefined,
            range: range,
            sortText: "0_" + member,
          });
        }
        return { suggestions };
      }

      // Snippets (highest priority)
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
          sortText: "0_" + snippet.label,
        });
      }

      // Tactics
      for (const tactic of tacticItems) {
        const info = leanDocs[tactic];
        suggestions.push({
          label: tactic,
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: tactic,
          detail: info ? info.detail : "(tactic) " + tactic,
          documentation: info ? { value: info.doc } : undefined,
          range: range,
          sortText: "1_" + tactic,
        });
      }

      // Declaration keywords
      for (const keyword of keywordItems) {
        const info = leanDocs[keyword];
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

      // Types
      for (const type of typeItems) {
        const info = leanDocs[type];
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

      // Functions / common definitions
      for (const fn of functionItems) {
        const info = leanDocs[fn];
        suggestions.push({
          label: fn,
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: fn,
          detail: info ? info.detail : "(definition) " + fn,
          documentation: info ? { value: info.doc } : undefined,
          range: range,
          sortText: "4_" + fn,
        });
      }

      // User-defined symbols
      const symbols = parseSymbols(model);
      const seen = new Set<string>();
      for (const symbol of symbols) {
        if (seen.has(symbol.name)) continue;
        seen.add(symbol.name);
        suggestions.push({
          label: symbol.name,
          kind: completionKind(symbol.kind),
          insertText: symbol.name,
          detail: symbol.kind + " (defined in this file)",
          documentation: {
            value: "```lean\n" + symbol.detail + "\n```",
          },
          range: range,
          sortText: "1_" + symbol.name,
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

      // Try the full dotted name (e.g. `List.map` or `IO.FS.readFile`)
      const lineContent = model.getLineContent(position.lineNumber);
      const upToWord = lineContent.substring(0, word.endColumn - 1);
      const dottedMatch = upToWord.match(
        /([A-Za-z_][\w']*(?:\.[\w']+)+)$/,
      );
      if (dottedMatch) {
        const fullInfo = leanDocs[dottedMatch[1]];
        if (fullInfo) {
          return {
            range: range,
            contents: [
              { value: "**" + fullInfo.detail + "**" },
              { value: fullInfo.doc },
            ],
          };
        }
      }

      // Built-in documentation
      const info = leanDocs[word.word];
      if (info) {
        return {
          range: range,
          contents: [
            { value: "**" + info.detail + "**" },
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
            { value: "```lean\n" + symbol.detail + "\n```" },
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

      const symbols = parseSymbols(model);
      const matches = symbols.filter((s) => s.name === word.word);

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
  const signatureDb: Record<
    string,
    {
      label: string;
      documentation: string;
      parameters: { label: string; documentation: string }[];
    }
  > = {
    simp: {
      label: "simp [lemmas] (config)",
      documentation: "Simplifies the goal using the simp set.",
      parameters: [
        {
          label: "lemmas",
          documentation: "Extra lemmas to rewrite with.",
        },
      ],
    },
    rw: {
      label: "rw [lemmas] (at locations)",
      documentation: "Rewrites the goal or hypotheses with the given lemmas.",
      parameters: [
        { label: "lemmas", documentation: "Lemmas used for rewriting." },
        { label: "at locations", documentation: "Optional `at h` or `at *`." },
      ],
    },
    apply: {
      label: "apply term",
      documentation:
        "Applies a term to the goal, creating subgoals for its arguments.",
      parameters: [
        { label: "term", documentation: "The lemma or function to apply." },
      ],
    },
    exact: {
      label: "exact term",
      documentation: "Closes the goal with a term of the exact expected type.",
      parameters: [{ label: "term", documentation: "The proof term." }],
    },
    induction: {
      label: "induction term (with cases)",
      documentation: "Performs induction on a term.",
      parameters: [
        { label: "term", documentation: "The term to induct on." },
        {
          label: "with cases",
          documentation: "Optional named cases `| ctor ih => …`.",
        },
      ],
    },
    cases: {
      label: "cases term (with cases)",
      documentation: "Performs case analysis on a term.",
      parameters: [
        { label: "term", documentation: "The term to split on." },
      ],
    },
    rcases: {
      label: "rcases h with pattern",
      documentation: "Destructs hypotheses using patterns.",
      parameters: [
        { label: "h", documentation: "The hypothesis or term to destruct." },
        {
          label: "pattern",
          documentation: "A pattern such as `⟨h1, h2⟩` or `h | h`.",
        },
      ],
    },
    obtain: {
      label: "obtain pattern := term",
      documentation: "Destructs a term using a pattern.",
      parameters: [
        { label: "pattern", documentation: "The pattern to match." },
        { label: "term", documentation: "The term being destructed." },
      ],
    },
    have: {
      label: "have h : type := proof",
      documentation: "Introduces an intermediate fact.",
      parameters: [
        { label: "h : type", documentation: "Name and type of the new fact." },
        { label: "proof", documentation: "Optional proof term or `by` block." },
      ],
    },
    use: {
      label: "use witnesses",
      documentation: "Provides witnesses for an existential goal.",
      parameters: [{ label: "witnesses", documentation: "The witness terms." }],
    },
    refine: {
      label: "refine term",
      documentation:
        "Applies a term with placeholders, creating goals for the holes.",
      parameters: [
        { label: "term", documentation: "Term with `_` or `?_` holes." },
      ],
    },
    "List.map": {
      label: "List.map (f : α → β) : List α → List β",
      documentation: "Maps a function over a list.",
      parameters: [
        { label: "f : α → β", documentation: "The function to apply." },
        { label: "xs : List α", documentation: "The list to map over." },
      ],
    },
    "List.foldl": {
      label: "List.foldl (f : β → α → β) (init : β) : List α → β",
      documentation: "Left fold over a list.",
      parameters: [
        { label: "f : β → α → β", documentation: "The combining function." },
        { label: "init : β", documentation: "The initial accumulator." },
        { label: "xs : List α", documentation: "The list to fold." },
      ],
    },
    "List.filter": {
      label: "List.filter (p : α → Bool) : List α → List α",
      documentation: "Keeps elements satisfying a boolean predicate.",
      parameters: [
        { label: "p : α → Bool", documentation: "The predicate." },
        { label: "xs : List α", documentation: "The list to filter." },
      ],
    },
    "IO.println": {
      label: "IO.println (s : String) : IO Unit",
      documentation: "Prints a string followed by a newline.",
      parameters: [
        { label: "s : String", documentation: "The string to print." },
      ],
    },
    "Nat.add": {
      label: "Nat.add (m n : Nat) : Nat",
      documentation: "Adds two natural numbers.",
      parameters: [
        { label: "m : Nat", documentation: "First addend." },
        { label: "n : Nat", documentation: "Second addend." },
      ],
    },
    "Nat.succ": {
      label: "Nat.succ (n : Nat) : Nat",
      documentation: "Returns the successor of a natural number.",
      parameters: [{ label: "n : Nat", documentation: "The number." }],
    },
    "String.append": {
      label: "String.append (s t : String) : String",
      documentation: "Concatenates two strings.",
      parameters: [
        { label: "s : String", documentation: "First string." },
        { label: "t : String", documentation: "Second string." },
      ],
    },
    "Option.getD": {
      label: "Option.getD (o : Option α) (default : α) : α",
      documentation: "Returns the contained value or the default.",
      parameters: [
        { label: "o : Option α", documentation: "The optional value." },
        { label: "default : α", documentation: "Fallback when `none`." },
      ],
    },
    "Array.push": {
      label: "Array.push (xs : Array α) (x : α) : Array α",
      documentation: "Appends an element, returning a new array.",
      parameters: [
        { label: "xs : Array α", documentation: "The array." },
        { label: "x : α", documentation: "The element to append." },
      ],
    },
    "Finset.sum": {
      label: "Finset.sum (s : Finset α) (f : α → β) : β",
      documentation: "Sums a function over a finite set.",
      parameters: [
        { label: "s : Finset α", documentation: "The finite set." },
        { label: "f : α → β", documentation: "The summand function." },
      ],
    },
    "Function.comp": {
      label: "Function.comp (g : β → γ) (f : α → β) : α → γ",
      documentation: "Composes two functions.",
      parameters: [
        { label: "g : β → γ", documentation: "The outer function." },
        { label: "f : α → β", documentation: "The inner function." },
      ],
    },
  };

  monaco.languages.registerSignatureHelpProvider(LANG_ID, {
    signatureHelpTriggerCharacters: ["(", ",", " "],
    signatureHelpRetriggerCharacters: [",", " "],
    provideSignatureHelp: function (model, position) {
      const textUntil = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });

      // Inside parentheses: use the function name before the opening paren.
      if (/\([^()]*$/.test(textUntil)) {
        const before = textUntil.substring(0, textUntil.lastIndexOf("("));
        const match = before.match(/((?:[A-Z][\w']*\.)*[\w']+|[\w']+\.[\w']+)\s*$/);
        if (match && signatureDb[match[1]]) {
          const info = signatureDb[match[1]];
          const afterParen = textUntil.substring(textUntil.lastIndexOf("(") + 1);
          let depth = 0;
          let commaCount = 0;
          for (const ch of afterParen) {
            if (ch === "(") depth++;
            else if (ch === ")") depth--;
            else if (ch === "," && depth === 0) commaCount++;
          }
          return {
            value: {
              signatures: [
                {
                  label: info.label,
                  documentation: info.documentation,
                  parameters: info.parameters.map((p) => ({
                    label: p.label,
                    documentation: p.documentation,
                  })),
                },
              ],
              activeSignature: 0,
              activeParameter: Math.min(
                commaCount,
                Math.max(info.parameters.length - 1, 0),
              ),
            },
            dispose: () => {},
          };
        }
      }

      // Tactic mode: show the signature of the tactic before the cursor.
      const tacticMatch = textUntil.match(/([\w']+)\s+$/);
      if (tacticMatch && signatureDb[tacticMatch[1]]) {
        const info = signatureDb[tacticMatch[1]];
        return {
          value: {
            signatures: [
              {
                label: info.label,
                documentation: info.documentation,
                parameters: info.parameters.map((p) => ({
                  label: p.label,
                  documentation: p.documentation,
                })),
              },
            ],
            activeSignature: 0,
            activeParameter: 0,
          },
          dispose: () => {},
        };
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

      // Multi-line comments: /- … -/ and /-- … -/
      let commentStart = -1;
      for (let i = 0; i < lines.length; i++) {
        const opens = lines[i].split("/-").length - 1;
        const closes = lines[i].split("-/").length - 1;
        if (commentStart < 0 && opens > closes) {
          commentStart = i;
        } else if (commentStart >= 0 && closes > opens) {
          if (i > commentStart) {
            ranges.push({
              start: commentStart + 1,
              end: i + 1,
              kind: monaco.languages.FoldingRangeKind.Comment,
            });
          }
          commentStart = -1;
        }
      }

      // Leading import / open block
      let importEnd = -1;
      for (let i = 0; i < lines.length; i++) {
        if (/^\s*(import|open|export|universe|variable|set_option)\b/.test(lines[i])) {
          importEnd = i;
        } else if (lines[i].trim() !== "" && !/^\s*--/.test(lines[i])) {
          break;
        }
      }
      if (importEnd > 0) {
        ranges.push({
          start: 1,
          end: importEnd + 1,
          kind: monaco.languages.FoldingRangeKind.Imports,
        });
      }

      // Indentation-based folding
      const stack: { line: number; indent: number }[] = [];
      const isBlockStart = (line: string) =>
        /[:=]\s*$/.test(line) ||
        /(?:=>|->|←|→)\s*$/.test(line) ||
        /\b(?:by|do|where|match|with|calc|namespace|section|structure|class|inductive|instance|mutual|deriving)\b\s*$/.test(
          line,
        ) ||
        /^\s*\|/.test(line);

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const indent = line.search(/\S/);
        if (indent < 0) continue;

        while (stack.length > 0 && stack[stack.length - 1].indent >= indent) {
          const top = stack.pop()!;
          if (i - 1 > top.line) {
            ranges.push({
              start: top.line + 1,
              end: i,
              kind: monaco.languages.FoldingRangeKind.Region,
            });
          }
        }

        if (isBlockStart(line)) {
          stack.push({ line: i, indent });
        }
      }

      while (stack.length > 0) {
        const top = stack.pop()!;
        if (lines.length - 1 > top.line) {
          ranges.push({
            start: top.line + 1,
            end: lines.length,
            kind: monaco.languages.FoldingRangeKind.Region,
          });
        }
      }

      return ranges;
    },
  });

  // ────────────────────────────────────────────────────────────────────
  //  14. REFERENCE PROVIDER (find all references)
  // ────────────────────────────────────────────────────────────────────
  function escapeRegex(value: string) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

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

      const edits = [];
      const lines = model.getLinesContent();
      const regex = new RegExp("\\b" + escapeRegex(word.word) + "\\b", "g");

      lines.forEach((line, index) => {
        let match;
        while ((match = regex.exec(line)) !== null) {
          edits.push({
            resource: model.uri,
            versionId: model.getVersionId(),
            textEdit: {
              range: new monaco.Range(
                index + 1,
                match.index + 1,
                index + 1,
                match.index + word.word.length + 1,
              ),
              text: newName,
            },
          });
        }
      });

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
