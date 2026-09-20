import type * as Monaco from "monaco-editor";

export default (monaco: typeof Monaco) => {
  // ═══════════════════════════════════════════════
  // 1. REGISTER LANGUAGE
  // ═══════════════════════════════════════════════
  monaco.languages.register({
    id: "purescript",
    extensions: [".purs"],
    aliases: ["PureScript", "purescript", "purs"],
    mimetypes: ["text/x-purescript"],
  });

  // ═══════════════════════════════════════════════
  // 2. LANGUAGE CONFIGURATION
  // ═══════════════════════════════════════════════
  monaco.languages.setLanguageConfiguration("purescript", {
    comments: { lineComment: "--", blockComment: ["{-", "-}"] },
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
      { open: "'", close: "'", notIn: ["string", "comment"] },
      { open: "{-", close: "-}" },
    ],
    surroundingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: '"', close: '"' },
      { open: "'", close: "'" },
    ],
    folding: {
      offSide: true,
      markers: { start: /^\s*--\s*#?region\b/, end: /^\s*--\s*#?endregion\b/ },
    },
    indentationRules: {
      increaseIndentPattern: /^\s*(where|do|ado|let|of|then|else|\{)\s*$/,
      decreaseIndentPattern: /^\s*(in|else)\b/,
    },
    onEnterRules: [
      {
        beforeText: /^\s*(where|do|ado|let|of|then|else)\s*$/,
        action: { indentAction: monaco.languages.IndentAction.Indent },
      },
      {
        beforeText: /=\s*$/,
        action: { indentAction: monaco.languages.IndentAction.Indent },
      },
    ],
    wordPattern:
      /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
  });

  // ═══════════════════════════════════════════════
  // 3. MONARCH TOKENIZER
  // ═══════════════════════════════════════════════
  monaco.languages.setMonarchTokensProvider("purescript", {
    defaultToken: "",
    keywords: [
      "module",
      "where",
      "import",
      "data",
      "type",
      "newtype",
      "class",
      "instance",
      "derive",
      "foreign",
      "infixl",
      "infixr",
      "infix",
      "do",
      "ado",
      "let",
      "in",
      "if",
      "then",
      "else",
      "case",
      "of",
      "forall",
      "as",
      "hiding",
      "qualified",
      "true",
      "false",
      "otherwise",
    ],
    builtinTypes: [
      "Int",
      "Number",
      "String",
      "Char",
      "Boolean",
      "Array",
      "Record",
      "Effect",
      "Aff",
      "Maybe",
      "Either",
      "Tuple",
      "Unit",
      "Void",
      "Ordering",
      "List",
      "Map",
      "Set",
      "NonEmpty",
      "Identity",
      "Nothing",
      "Just",
      "Left",
      "Right",
      "LT",
      "GT",
      "EQ",
      "Semiring",
      "Ring",
      "EuclideanRing",
      "CommutativeRing",
      "Functor",
      "Apply",
      "Applicative",
      "Bind",
      "Monad",
      "Semigroup",
      "Monoid",
      "Eq",
      "Ord",
      "Show",
      "BooleanAlgebra",
      "HeytingAlgebra",
      "Bounded",
      "Foldable",
      "Traversable",
    ],
    escapes: /\\(?:[abfnrtv\\"'0]|x[0-9A-Fa-f]{1,6}|u\{?[0-9A-Fa-f]{1,6}\}?)/,
    operators: [
      "->",
      "<-",
      "=>",
      "::",
      "..",
      "|",
      "\\",
      "@",
      "=",
      "~",
      "<>",
      "<$>",
      "<*>",
      "<#>",
      ">>=",
      "=<<",
      "<<<",
      ">>>",
      "&&",
      "||",
      "++",
      "==",
      "/=",
      "<=",
      ">=",
      "<",
      ">",
      "+",
      "-",
      "*",
      "/",
      "$",
      "#",
      "^",
      "?",
    ],
    symbols: /[=><!~?:&|+\-*\/\^%\$#@\\\.]+/,

    tokenizer: {
      root: [
        [/\{-/, "comment", "@blockComment"],
        [/--\|.*$/, "comment.doc"],
        [/--.*$/, "comment"],

        [/"""/, "string", "@tripleString"],
        [/"/, "string", "@string"],
        [/'[^\\']'/, "string"],
        [/'(\\.)'/, "string"],

        [/0[xX][0-9a-fA-F_]+/, "number.hex"],
        [/0[oO][0-7_]+/, "number.octal"],
        [/0[bB][01_]+/, "number.binary"],
        [/\d+\.\d+([eE][+-]?\d+)?/, "number.float"],
        [/\d+[eE][+-]?\d+/, "number.float"],
        [/\d+/, "number"],

        [/\?[a-zA-Z_]\w*/, "variable"],

        [
          /[A-Z][\w']*(\.[A-Z][\w']*)*/,
          {
            cases: {
              "@builtinTypes": "type.identifier",
              "@default": "type.identifier",
            },
          },
        ],

        [
          /[a-z_][\w']*/,
          {
            cases: {
              "@keywords": "keyword",
              "@default": "identifier",
            },
          },
        ],

        [/`[a-zA-Z][\w']*`/, "operator"],

        [
          /@symbols/,
          {
            cases: {
              "@operators": "keyword.operator",
              "@default": "operator",
            },
          },
        ],

        [/[{}()\[\]]/, "delimiter.bracket"],
        [/[,;]/, "delimiter"],
        { include: "@whitespace" },
      ],

      blockComment: [
        [/[^{-]+/, "comment"],
        [/\{-/, "comment", "@push"],
        [/-\}/, "comment", "@pop"],
        [/[{-]/, "comment"],
      ],

      string: [
        [/[^\\"]+/, "string"],
        [/@escapes/, "string.escape"],
        [/\\./, "string.escape.invalid"],
        [/"/, "string", "@pop"],
      ],

      tripleString: [
        [/"""/, "string", "@pop"],
        [/[^"]+/, "string"],
        [/"/, "string"],
      ],

      whitespace: [[/\s+/, "white"]],
    },
  });

  // ═══════════════════════════════════════════════
  // 4. KNOWLEDGE BASE
  // ═══════════════════════════════════════════════
  const KB = {
    // --- Core Types ---
    Int: { k: "Type", t: "Int", m: "Prim", d: "A 32-bit signed integer type." },
    Number: {
      k: "Type",
      t: "Number",
      m: "Prim",
      d: "A double-precision floating point number (IEEE 754).",
    },
    String: {
      k: "Type",
      t: "String",
      m: "Prim",
      d: "A sequence of characters (UTF-16).",
    },
    Char: { k: "Type", t: "Char", m: "Prim", d: "A single Unicode character." },
    Boolean: {
      k: "Type",
      t: "Boolean",
      m: "Prim",
      d: "A boolean value (`true` or `false`).",
    },
    Unit: {
      k: "Type",
      t: "Unit",
      m: "Data.Unit",
      d: "The unit type with a single inhabitant `unit`. Used where no meaningful value is returned.",
    },
    Void: {
      k: "Type",
      t: "Void",
      m: "Data.Void",
      d: "An uninhabited type — has no values. Useful for proving something is impossible.",
    },
    Array: {
      k: "Type",
      t: "Array a",
      m: "Prim",
      d: "An immutable array. PureScript arrays are backed by JavaScript arrays.",
    },
    Record: {
      k: "Type",
      t: "Record row",
      m: "Prim",
      d: "A record type built from a row of types.",
    },
    Ordering: {
      k: "Type",
      t: "Ordering",
      m: "Data.Ordering",
      d: "Represents the result of a comparison: `LT`, `EQ`, or `GT`.",
    },

    // --- Data Structures ---
    Maybe: {
      k: "Type",
      t: "Maybe a = Nothing | Just a",
      m: "Data.Maybe",
      d: "Represents an optional value. `Nothing` for absence, `Just a` for presence.",
    },
    Either: {
      k: "Type",
      t: "Either a b = Left a | Right b",
      m: "Data.Either",
      d: "Represents a value of one of two types. Conventionally `Left` is error, `Right` is success.",
    },
    Tuple: {
      k: "Type",
      t: "Tuple a b",
      m: "Data.Tuple",
      d: "A pair of values of (potentially) different types.",
    },
    List: {
      k: "Type",
      t: "List a = Nil | Cons a (List a)",
      m: "Data.List",
      d: "A strict singly-linked list.",
    },
    Map: {
      k: "Type",
      t: "Map k v",
      m: "Data.Map",
      d: "An immutable ordered map from keys `k` to values `v`.",
    },
    Set: {
      k: "Type",
      t: "Set a",
      m: "Data.Set",
      d: "An immutable ordered set of unique values.",
    },
    NonEmpty: {
      k: "Type",
      t: "NonEmpty f a",
      m: "Data.NonEmpty",
      d: "A non-empty container. Guarantees at least one element.",
    },
    Effect: {
      k: "Type",
      t: "Effect a",
      m: "Effect",
      d: "A synchronous side-effectful computation that produces a value of type `a`.",
    },
    Aff: {
      k: "Type",
      t: "Aff a",
      m: "Effect.Aff",
      d: "An asynchronous, error-handling effect monad. The primary monad for async PureScript code.",
    },
    Identity: {
      k: "Type",
      t: "Identity a",
      m: "Data.Identity",
      d: "The identity functor and monad. Wraps a pure value.",
    },

    // --- Constructors ---
    Nothing: {
      k: "Constructor",
      t: "forall a. Maybe a",
      m: "Data.Maybe",
      d: "The empty case of `Maybe`. Represents the absence of a value.",
    },
    Just: {
      k: "Constructor",
      t: "forall a. a -> Maybe a",
      m: "Data.Maybe",
      d: "Wraps a value in `Maybe`. Represents a present value.",
    },
    Left: {
      k: "Constructor",
      t: "forall a b. a -> Either a b",
      m: "Data.Either",
      d: "The left case of `Either`. Conventionally used for errors.",
    },
    Right: {
      k: "Constructor",
      t: "forall a b. b -> Either a b",
      m: "Data.Either",
      d: "The right case of `Either`. Conventionally used for success values.",
    },

    // --- Type Classes ---
    Functor: {
      k: "Class",
      t: "class Functor f where\n  map :: forall a b. (a -> b) -> f a -> f b",
      m: "Data.Functor",
      d: "Types that can be mapped over. The `map` function applies a function to every element in a structure.",
    },
    Apply: {
      k: "Class",
      t: "class (Functor f) <= Apply f where\n  apply :: forall a b. f (a -> b) -> f a -> f b",
      m: "Control.Apply",
      d: "Extends `Functor` with the ability to apply a wrapped function to a wrapped value.",
    },
    Applicative: {
      k: "Class",
      t: "class (Apply f) <= Applicative f where\n  pure :: forall a. a -> f a",
      m: "Control.Applicative",
      d: "Extends `Apply` with the ability to lift a value into the functor.",
    },
    Bind: {
      k: "Class",
      t: "class (Apply m) <= Bind m where\n  bind :: forall a b. m a -> (a -> m b) -> m b",
      m: "Control.Bind",
      d: "Extends `Apply` with the ability to sequence computations that depend on previous results.",
    },
    Monad: {
      k: "Class",
      t: "class (Applicative m, Bind m) <= Monad m",
      m: "Control.Monad",
      d: "A type class combining `Applicative` and `Bind`. Enables `do` notation.",
    },
    Semigroup: {
      k: "Class",
      t: "class Semigroup a where\n  append :: a -> a -> a",
      m: "Data.Semigroup",
      d: "Types with an associative binary operation `append` (also available as `<>`).",
    },
    Monoid: {
      k: "Class",
      t: "class (Semigroup m) <= Monoid m where\n  mempty :: m",
      m: "Data.Monoid",
      d: "Extends `Semigroup` with an identity element `mempty`.",
    },
    Eq: {
      k: "Class",
      t: "class Eq a where\n  eq :: a -> a -> Boolean",
      m: "Data.Eq",
      d: "Types with equality. `eq` is also available as `==`. Negation is `/=`.",
    },
    Ord: {
      k: "Class",
      t: "class (Eq a) <= Ord a where\n  compare :: a -> a -> Ordering",
      m: "Data.Ord",
      d: "Types with a total ordering. Enables `<`, `>`, `<=`, `>=`, `compare`, `min`, `max`.",
    },
    Show: {
      k: "Class",
      t: "class Show a where\n  show :: a -> String",
      m: "Data.Show",
      d: "Types that can be converted to a human-readable `String` representation.",
    },
    Semiring: {
      k: "Class",
      t: "class Semiring a where\n  add :: a -> a -> a\n  zero :: a\n  mul :: a -> a -> a\n  one :: a",
      m: "Data.Semiring",
      d: "Types that support addition and multiplication with identities.",
    },
    Ring: {
      k: "Class",
      t: "class (Semiring a) <= Ring a where\n  sub :: a -> a -> a",
      m: "Data.Ring",
      d: "Extends `Semiring` with subtraction and `negate`.",
    },
    Foldable: {
      k: "Class",
      t: "class Foldable f where\n  foldl :: forall a b. (b -> a -> b) -> b -> f a -> b\n  foldr :: forall a b. (a -> b -> b) -> b -> f a -> b\n  foldMap :: forall a m. Monoid m => (a -> m) -> f a -> m",
      m: "Data.Foldable",
      d: "Data structures that can be folded (reduced) to a summary value.",
    },
    Traversable: {
      k: "Class",
      t: "class (Functor t, Foldable t) <= Traversable t where\n  traverse :: forall a b m. Applicative m => (a -> m b) -> t a -> m (t b)\n  sequence :: forall a m. Applicative m => t (m a) -> m (t a)",
      m: "Data.Traversable",
      d: "Functors that can be traversed, performing an action for each element and collecting results.",
    },

    // --- Prelude Functions ---
    show: {
      k: "Function",
      t: "forall a. Show a => a -> String",
      m: "Data.Show",
      d: "Convert a value to its `String` representation.",
    },
    map: {
      k: "Function",
      t: "forall f a b. Functor f => (a -> b) -> f a -> f b",
      m: "Data.Functor",
      d: "Apply a function to every element of a functor. Also available as `<$>`.",
    },
    bind: {
      k: "Function",
      t: "forall m a b. Bind m => m a -> (a -> m b) -> m b",
      m: "Control.Bind",
      d: "Sequentially compose two computations. Also available as `>>=`. Powers `do` notation.",
    },
    pure: {
      k: "Function",
      t: "forall f a. Applicative f => a -> f a",
      m: "Control.Applicative",
      d: "Lift a value into an applicative functor.",
    },
    apply: {
      k: "Function",
      t: "forall f a b. Apply f => f (a -> b) -> f a -> f b",
      m: "Control.Apply",
      d: "Apply a wrapped function to a wrapped argument. Also available as `<*>`.",
    },
    append: {
      k: "Function",
      t: "forall a. Semigroup a => a -> a -> a",
      m: "Data.Semigroup",
      d: "An associative binary operation. Also available as `<>`.",
    },
    mempty: {
      k: "Function",
      t: "forall m. Monoid m => m",
      m: "Data.Monoid",
      d: "The identity value for a `Monoid`.",
    },
    identity: {
      k: "Function",
      t: "forall a. a -> a",
      m: "Data.Function",
      d: "Returns its argument unchanged.",
    },
    const: {
      k: "Function",
      t: "forall a b. a -> b -> a",
      m: "Data.Function",
      d: "Returns its first argument, ignoring the second.",
    },
    flip: {
      k: "Function",
      t: "forall a b c. (a -> b -> c) -> b -> a -> c",
      m: "Data.Function",
      d: "Flips the order of the first two arguments of a function.",
    },
    compose: {
      k: "Function",
      t: "forall b c a. (b -> c) -> (a -> b) -> a -> c",
      m: "Control.Semigroupoid",
      d: "Right-to-left function composition. Also available as `<<<`.",
    },
    not: {
      k: "Function",
      t: "Boolean -> Boolean",
      m: "Data.HeytingAlgebra",
      d: "Boolean negation.",
    },
    eq: {
      k: "Function",
      t: "forall a. Eq a => a -> a -> Boolean",
      m: "Data.Eq",
      d: "Test equality. Also available as `==`.",
    },
    compare: {
      k: "Function",
      t: "forall a. Ord a => a -> a -> Ordering",
      m: "Data.Ord",
      d: "Compare two values and return their ordering.",
    },
    negate: {
      k: "Function",
      t: "forall a. Ring a => a -> a",
      m: "Data.Ring",
      d: "Negate a value. `negate x = zero - x`.",
    },
    unit: {
      k: "Constant",
      t: "Unit",
      m: "Data.Unit",
      d: "The single value of type `Unit`.",
    },
    void: {
      k: "Function",
      t: "forall f a. Functor f => f a -> f Unit",
      m: "Data.Functor",
      d: "Replace all values in a functor with `Unit`.",
    },
    when: {
      k: "Function",
      t: "forall m. Applicative m => Boolean -> m Unit -> m Unit",
      m: "Control.Applicative",
      d: "Perform an action when a condition is `true`.",
    },
    unless: {
      k: "Function",
      t: "forall m. Applicative m => Boolean -> m Unit -> m Unit",
      m: "Control.Applicative",
      d: "Perform an action when a condition is `false`.",
    },
    discard: {
      k: "Function",
      t: "forall f a. Functor f => f a -> f Unit",
      m: "Data.Functor",
      d: "Discard the result, replacing it with `Unit`.",
    },

    // --- Data.Maybe ---
    maybe: {
      k: "Function",
      t: "forall a b. b -> (a -> b) -> Maybe a -> b",
      m: "Data.Maybe",
      d: "Eliminates a `Maybe`. Takes a default value, a function, and a `Maybe`.",
    },
    fromMaybe: {
      k: "Function",
      t: "forall a. a -> Maybe a -> a",
      m: "Data.Maybe",
      d: "Unwrap a `Maybe`, using a default value if `Nothing`.",
    },
    isJust: {
      k: "Function",
      t: "forall a. Maybe a -> Boolean",
      m: "Data.Maybe",
      d: "Returns `true` if the value is `Just`.",
    },
    isNothing: {
      k: "Function",
      t: "forall a. Maybe a -> Boolean",
      m: "Data.Maybe",
      d: "Returns `true` if the value is `Nothing`.",
    },

    // --- Data.Either ---
    either: {
      k: "Function",
      t: "forall a b c. (a -> c) -> (b -> c) -> Either a b -> c",
      m: "Data.Either",
      d: "Eliminates an `Either`. Takes a handler for each case.",
    },
    isLeft: {
      k: "Function",
      t: "forall a b. Either a b -> Boolean",
      m: "Data.Either",
      d: "Returns `true` if the value is `Left`.",
    },
    isRight: {
      k: "Function",
      t: "forall a b. Either a b -> Boolean",
      m: "Data.Either",
      d: "Returns `true` if the value is `Right`.",
    },

    // --- Data.Array ---
    length: {
      k: "Function",
      t: "forall a. Array a -> Int",
      m: "Data.Array",
      d: "Get the number of elements in an array.",
    },
    head: {
      k: "Function",
      t: "forall a. Array a -> Maybe a",
      m: "Data.Array",
      d: "Get the first element of an array, or `Nothing` if empty.",
    },
    tail: {
      k: "Function",
      t: "forall a. Array a -> Maybe (Array a)",
      m: "Data.Array",
      d: "Get all elements except the first, or `Nothing` if empty.",
    },
    last: {
      k: "Function",
      t: "forall a. Array a -> Maybe a",
      m: "Data.Array",
      d: "Get the last element of an array, or `Nothing` if empty.",
    },
    init: {
      k: "Function",
      t: "forall a. Array a -> Maybe (Array a)",
      m: "Data.Array",
      d: "Get all elements except the last, or `Nothing` if empty.",
    },
    filter: {
      k: "Function",
      t: "forall a. (a -> Boolean) -> Array a -> Array a",
      m: "Data.Array",
      d: "Filter an array, keeping only elements that satisfy the predicate.",
    },
    sort: {
      k: "Function",
      t: "forall a. Ord a => Array a -> Array a",
      m: "Data.Array",
      d: "Sort an array in ascending order.",
    },
    sortBy: {
      k: "Function",
      t: "forall a. (a -> a -> Ordering) -> Array a -> Array a",
      m: "Data.Array",
      d: "Sort an array using a custom comparison function.",
    },
    reverse: {
      k: "Function",
      t: "forall a. Array a -> Array a",
      m: "Data.Array",
      d: "Reverse an array.",
    },
    cons: {
      k: "Function",
      t: "forall a. a -> Array a -> Array a",
      m: "Data.Array",
      d: "Prepend an element to an array.",
    },
    snoc: {
      k: "Function",
      t: "forall a. Array a -> a -> Array a",
      m: "Data.Array",
      d: "Append an element to the end of an array.",
    },
    concat: {
      k: "Function",
      t: "forall a. Array (Array a) -> Array a",
      m: "Data.Array",
      d: "Flatten an array of arrays into a single array.",
    },
    concatMap: {
      k: "Function",
      t: "forall a b. (a -> Array b) -> Array a -> Array b",
      m: "Data.Array",
      d: "Map a function over an array and flatten the results.",
    },
    zip: {
      k: "Function",
      t: "forall a b. Array a -> Array b -> Array (Tuple a b)",
      m: "Data.Array",
      d: "Combine two arrays pairwise into an array of tuples.",
    },
    elem: {
      k: "Function",
      t: "forall a. Eq a => a -> Array a -> Boolean",
      m: "Data.Array",
      d: "Check if an element is in an array.",
    },
    index: {
      k: "Function",
      t: "forall a. Array a -> Int -> Maybe a",
      m: "Data.Array",
      d: "Get the element at an index, or `Nothing` if out of bounds. Also available as `!!`.",
    },
    foldl: {
      k: "Function",
      t: "forall a b. (b -> a -> b) -> b -> Array a -> b",
      m: "Data.Foldable",
      d: "Left-associative fold over an array.",
    },
    foldr: {
      k: "Function",
      t: "forall a b. (a -> b -> b) -> b -> Array a -> b",
      m: "Data.Foldable",
      d: "Right-associative fold over an array.",
    },
    traverse_: {
      k: "Function",
      t: "forall a b f t. Applicative f => Foldable t => (a -> f b) -> t a -> f Unit",
      m: "Data.Foldable",
      d: "Traverse a foldable for effects, discarding results.",
    },
    for_: {
      k: "Function",
      t: "forall a b f t. Applicative f => Foldable t => t a -> (a -> f b) -> f Unit",
      m: "Data.Foldable",
      d: "`traverse_` with its arguments flipped.",
    },

    // --- Data.String ---
    joinWith: {
      k: "Function",
      t: "String -> Array String -> String",
      m: "Data.String.Common",
      d: "Join an array of strings with a separator.",
    },
    split: {
      k: "Function",
      t: "Pattern -> String -> Array String",
      m: "Data.String.Common",
      d: "Split a string by a pattern.",
    },
    trim: {
      k: "Function",
      t: "String -> String",
      m: "Data.String.Common",
      d: "Remove leading and trailing whitespace.",
    },
    toLower: {
      k: "Function",
      t: "String -> String",
      m: "Data.String.Common",
      d: "Convert a string to lowercase.",
    },
    toUpper: {
      k: "Function",
      t: "String -> String",
      m: "Data.String.Common",
      d: "Convert a string to uppercase.",
    },

    // --- Effect.Console ---
    log: {
      k: "Function",
      t: "String -> Effect Unit",
      m: "Effect.Console",
      d: "Write a message to the console.",
    },
    logShow: {
      k: "Function",
      t: "forall a. Show a => a -> Effect Unit",
      m: "Effect.Console",
      d: "`show` a value and write it to the console.",
    },
    warn: {
      k: "Function",
      t: "String -> Effect Unit",
      m: "Effect.Console",
      d: "Write a warning to the console.",
    },
    error: {
      k: "Function",
      t: "String -> Effect Unit",
      m: "Effect.Console",
      d: "Write an error to the console.",
    },
    info: {
      k: "Function",
      t: "String -> Effect Unit",
      m: "Effect.Console",
      d: "Write an info message to the console.",
    },
  };

  // ═══════════════════════════════════════════════
  // 5. SNIPPETS
  // ═══════════════════════════════════════════════
  const SNIPPETS = [
    {
      label: "module",
      detail: "Module declaration",
      doc: "Declare a new PureScript module.",
      body: "module ${1:Main} where\n\nimport Prelude\n\n$0",
    },
    {
      label: "import",
      detail: "Import statement",
      doc: "Import a module.",
      body: "import ${1:Data.Maybe} (${2:Maybe(..)})\n$0",
    },
    {
      label: "import as",
      detail: "Qualified import",
      doc: "Import a module with a qualified alias.",
      body: "import ${1:Data.Array} as ${2:Array}\n$0",
    },
    {
      label: "data",
      detail: "Data type declaration",
      doc: "Declare a new algebraic data type.",
      body: "data ${1:TypeName}\n  = ${2:Constructor1}\n  | ${3:Constructor2}\n$0",
    },
    {
      label: "newtype",
      detail: "Newtype declaration",
      doc: "Declare a newtype wrapper.",
      body: "newtype ${1:Name} = ${1:Name} ${2:WrappedType}\n$0",
    },
    {
      label: "type",
      detail: "Type alias",
      doc: "Declare a type alias.",
      body: "type ${1:Name} =\n  { ${2:field} :: ${3:Type}\n  }\n$0",
    },
    {
      label: "type row",
      detail: "Open row type alias",
      doc: "Declare an open row type alias for extensible records.",
      body: "type ${1:Name} r =\n  { ${2:field} :: ${3:Type}\n  | r\n  }\n$0",
    },
    {
      label: "class",
      detail: "Type class declaration",
      doc: "Declare a new type class.",
      body: "class ${1:ClassName} ${2:a} where\n  ${3:method} :: ${4:a -> a}\n$0",
    },
    {
      label: "instance",
      detail: "Type class instance",
      doc: "Define a type class instance.",
      body: "instance ${1:instanceName} :: ${2:ClassName} ${3:Type} where\n  ${4:method} = ${5:implementation}\n$0",
    },
    {
      label: "derive instance",
      detail: "Derived instance",
      doc: "Derive a type class instance automatically.",
      body: "derive instance ${1:instanceName} :: ${2:Eq} ${3:MyType}\n$0",
    },
    {
      label: "derive newtype instance",
      detail: "Derived newtype instance",
      doc: "Derive a type class instance via the underlying newtype.",
      body: "derive newtype instance ${1:instanceName} :: ${2:Show} ${3:MyNewtype}\n$0",
    },
    {
      label: "func",
      detail: "Function with type signature",
      doc: "Define a function with its type annotation.",
      body: "${1:name} :: ${2:Type}\n${1:name} ${3:args} = ${4:body}\n$0",
    },
    {
      label: "effunc",
      detail: "Effectful function",
      doc: "Define a function returning Effect.",
      body: "${1:name} :: ${2:String} -> Effect Unit\n${1:name} ${3:arg} = do\n  ${4:pure unit}\n$0",
    },
    {
      label: "case",
      detail: "Case expression",
      doc: "Pattern match on a value.",
      body: "case ${1:expr} of\n  ${2:pattern1} -> ${3:result1}\n  ${4:pattern2} -> ${5:result2}\n$0",
    },
    {
      label: "caseof",
      detail: "Case lambda (point-free)",
      doc: "Anonymous case expression (\\case style).",
      body: "case _ of\n  ${1:pattern1} -> ${2:result1}\n  ${3:pattern2} -> ${4:result2}\n$0",
    },
    {
      label: "do",
      detail: "Do block",
      doc: "A monadic do block.",
      body: "do\n  ${1:result} <- ${2:action}\n  ${3:pure result}\n$0",
    },
    {
      label: "ado",
      detail: "Ado block (applicative do)",
      doc: "An applicative do block.",
      body: "ado\n  ${1:x} <- ${2:action1}\n  ${3:y} <- ${4:action2}\n  in ${5:x}\n$0",
    },
    {
      label: "let",
      detail: "Let expression",
      doc: "Bind a local variable.",
      body: "let\n  ${1:name} = ${2:value}\nin\n  ${3:body}\n$0",
    },
    {
      label: "ifthenelse",
      detail: "If-then-else",
      doc: "Conditional expression.",
      body: "if ${1:condition}\n  then ${2:trueValue}\n  else ${3:falseValue}\n$0",
    },
    {
      label: "where",
      detail: "Where clause",
      doc: "Define local bindings after an expression.",
      body: "${1:expr}\n  where\n  ${2:name} = ${3:value}\n$0",
    },
    {
      label: "foreign import",
      detail: "Foreign import",
      doc: "Import a JavaScript function via FFI.",
      body: "foreign import ${1:name} :: ${2:Type}\n$0",
    },
    {
      label: "main",
      detail: "Main entry point",
      doc: "The standard main function for a PureScript application.",
      body: 'main :: Effect Unit\nmain = do\n  ${1:log "Hello, PureScript!"}\n$0',
    },
    {
      label: "guard",
      detail: "Guards",
      doc: "Function with guard clauses.",
      body: "${1:name} ${2:x}\n  | ${3:condition1} = ${4:result1}\n  | ${5:condition2} = ${6:result2}\n  | otherwise = ${7:default}\n$0",
    },
  ];

  // ═══════════════════════════════════════════════
  // 6. HELPER FUNCTIONS
  // ═══════════════════════════════════════════════

  function findDefinitionsInDoc(model, word) {
    const results = [];
    const lc = model.getLineCount();
    const esc = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    for (let i = 1; i <= lc; i++) {
      const ln = model.getLineContent(i);
      const trimmed = ln.trimStart();
      // Type signature
      if (new RegExp("^" + esc + "\\s*::").test(trimmed)) {
        const col = ln.indexOf(word) + 1;
        results.push({
          uri: model.uri,
          range: {
            startLineNumber: i,
            startColumn: col,
            endLineNumber: i,
            endColumn: col + word.length,
          },
        });
      }
      // Data / newtype / type declaration
      const dm = trimmed.match(/^(data|newtype|type)\s+(\w+)/);
      if (dm && dm[2] === word) {
        const col = ln.indexOf(word) + 1;
        results.push({
          uri: model.uri,
          range: {
            startLineNumber: i,
            startColumn: col,
            endLineNumber: i,
            endColumn: col + word.length,
          },
        });
      }
      // Class declaration
      const cm = trimmed.match(/^class\s+(?:.*=>\s*)?(\w+)/);
      if (cm && cm[1] === word) {
        const col = ln.indexOf(word) + 1;
        results.push({
          uri: model.uri,
          range: {
            startLineNumber: i,
            startColumn: col,
            endLineNumber: i,
            endColumn: col + word.length,
          },
        });
      }
      // Function def (word = ...) or (word args =)
      if (
        new RegExp("^" + esc + "\\s+[^:].*=").test(trimmed) ||
        new RegExp("^" + esc + "\\s*=").test(trimmed)
      ) {
        const col = ln.indexOf(word) + 1;
        results.push({
          uri: model.uri,
          range: {
            startLineNumber: i,
            startColumn: col,
            endLineNumber: i,
            endColumn: col + word.length,
          },
        });
      }
      // Constructor in data decl
      const conMatch = trimmed.match(/[=|]\s+([A-Z]\w+)/g);
      if (conMatch) {
        for (const c of conMatch) {
          const name = c.replace(/^[=|]\s+/, "");
          if (name === word) {
            const col = ln.indexOf(name) + 1;
            results.push({
              uri: model.uri,
              range: {
                startLineNumber: i,
                startColumn: col,
                endLineNumber: i,
                endColumn: col + name.length,
              },
            });
          }
        }
      }
    }
    // Deduplicate by line number
    const seen = new Set();
    return results.filter((r) => {
      const key = r.range.startLineNumber;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function findTypeSignatureInDoc(model, word) {
    const lc = model.getLineCount();
    const esc = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    for (let i = 1; i <= lc; i++) {
      const ln = model.getLineContent(i).trimStart();
      const m = ln.match(new RegExp("^" + esc + "\\s*::\\s*(.+)$"));
      if (m) return m[1].trim();
    }
    return null;
  }

  function findDocCommentAbove(model, lineNumber) {
    const comments = [];
    for (let i = lineNumber - 1; i >= 1; i--) {
      const ln = model.getLineContent(i).trim();
      if (ln.startsWith("-- |")) {
        comments.unshift(ln.replace(/^--\s*\|?\s*/, ""));
      } else if (ln.startsWith("--")) {
        comments.unshift(ln.replace(/^--\s*/, ""));
      } else {
        break;
      }
    }
    return comments.length ? comments.join(" ") : null;
  }

  function getLocalSymbols(model) {
    const syms = [];
    const seen = new Set();
    const lc = model.getLineCount();
    for (let i = 1; i <= lc; i++) {
      const ln = model.getLineContent(i);
      const trimmed = ln.trimStart();
      // type signatures
      const tsm = trimmed.match(/^([a-z_]\w*'?)\s*::\s*(.+)$/);
      if (tsm && !seen.has(tsm[1])) {
        seen.add(tsm[1]);
        const doc = findDocCommentAbove(model, i);
        syms.push({
          name: tsm[1],
          kind: "Function",
          type: tsm[2].trim(),
          doc: doc,
          line: i,
        });
      }
      // data / newtype / type
      const dm = trimmed.match(/^(data|newtype|type)\s+([A-Z]\w*)/);
      if (dm && !seen.has(dm[2])) {
        seen.add(dm[2]);
        const doc = findDocCommentAbove(model, i);
        syms.push({
          name: dm[2],
          kind: dm[1] === "type" ? "TypeAlias" : "Type",
          type: ln.trim(),
          doc: doc,
          line: i,
        });
      }
      // class
      const cm = trimmed.match(/^class\s+(?:.*=>\s*)?([A-Z]\w*)/);
      if (cm && !seen.has(cm[1])) {
        seen.add(cm[1]);
        const doc = findDocCommentAbove(model, i);
        syms.push({
          name: cm[1],
          kind: "Class",
          type: trimmed,
          doc: doc,
          line: i,
        });
      }
    }
    return syms;
  }

  function kindToMonaco(k) {
    switch (k) {
      case "Type":
      case "TypeAlias":
        return monaco.languages.CompletionItemKind.Class;
      case "Class":
        return monaco.languages.CompletionItemKind.Interface;
      case "Constructor":
        return monaco.languages.CompletionItemKind.EnumMember;
      case "Function":
        return monaco.languages.CompletionItemKind.Function;
      case "Constant":
        return monaco.languages.CompletionItemKind.Constant;
      default:
        return monaco.languages.CompletionItemKind.Variable;
    }
  }

  function symbolKindToMonaco(k) {
    switch (k) {
      case "Type":
        return monaco.languages.SymbolKind.Class;
      case "TypeAlias":
        return monaco.languages.SymbolKind.TypeParameter;
      case "Class":
        return monaco.languages.SymbolKind.Interface;
      case "Function":
        return monaco.languages.SymbolKind.Function;
      default:
        return monaco.languages.SymbolKind.Variable;
    }
  }

  // ═══════════════════════════════════════════════
  // 7. COMPLETION PROVIDER
  // ═══════════════════════════════════════════════
  monaco.languages.registerCompletionItemProvider("purescript", {
    triggerCharacters: ["."],
    provideCompletionItems: function (model, position) {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };
      const suggestions = [];

      // Keywords
      const keywords = [
        "module",
        "where",
        "import",
        "data",
        "type",
        "newtype",
        "class",
        "instance",
        "derive",
        "foreign",
        "infixl",
        "infixr",
        "infix",
        "do",
        "ado",
        "let",
        "in",
        "if",
        "then",
        "else",
        "case",
        "of",
        "forall",
        "as",
        "hiding",
        "qualified",
        "true",
        "false",
        "otherwise",
      ];
      for (const kw of keywords) {
        suggestions.push({
          label: kw,
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: kw,
          detail: "keyword",
          sortText: "3_" + kw,
          range,
        });
      }

      // Knowledge base entries
      for (const [name, info] of Object.entries(KB)) {
        suggestions.push({
          label: name,
          kind: kindToMonaco(info.k),
          detail: info.t,
          documentation: { value: "**" + info.m + "**\n\n" + info.d },
          insertText: name,
          sortText: "2_" + name,
          range,
        });
      }

      // Snippets
      for (const sn of SNIPPETS) {
        suggestions.push({
          label: sn.label,
          kind: monaco.languages.CompletionItemKind.Snippet,
          detail: sn.detail,
          documentation: { value: sn.doc },
          insertText: sn.body,
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          sortText: "4_" + sn.label,
          range,
        });
      }

      // Local symbols from current document
      const locals = getLocalSymbols(model);
      for (const s of locals) {
        suggestions.push({
          label: s.name,
          kind: kindToMonaco(s.kind),
          detail: s.type || s.kind,
          documentation: s.doc ? { value: s.doc } : undefined,
          insertText: s.name,
          sortText: "0_" + s.name,
          range,
        });
      }

      return { suggestions };
    },
  });

  // ═══════════════════════════════════════════════
  // 8. HOVER PROVIDER
  // ═══════════════════════════════════════════════
  monaco.languages.registerHoverProvider("purescript", {
    provideHover: function (model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return null;
      const name = word.word;
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };

      // Check knowledge base
      if (KB[name]) {
        const info = KB[name];
        const contents = [
          { value: "```purescript\n" + info.t + "\n```" },
          { value: "**" + info.k + "** — *" + info.m + "*\n\n" + info.d },
        ];
        return { range, contents };
      }

      // Check local type signature
      const localType = findTypeSignatureInDoc(model, name);
      if (localType) {
        const lineNum = findLineOfSignature(model, name);
        const doc = lineNum ? findDocCommentAbove(model, lineNum) : null;
        const contents = [
          { value: "```purescript\n" + name + " :: " + localType + "\n```" },
        ];
        if (doc) contents.push({ value: doc });
        return { range, contents };
      }

      return null;
    },
  });

  function findLineOfSignature(model, word) {
    const lc = model.getLineCount();
    const esc = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    for (let i = 1; i <= lc; i++) {
      const ln = model.getLineContent(i).trimStart();
      if (new RegExp("^" + esc + "\\s*::").test(ln)) return i;
    }
    return null;
  }

  // ═══════════════════════════════════════════════
  // 9. DEFINITION PROVIDER
  // ═══════════════════════════════════════════════
  monaco.languages.registerDefinitionProvider("purescript", {
    provideDefinition: function (model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return null;
      return findDefinitionsInDoc(model, word.word);
    },
  });

  // ═══════════════════════════════════════════════
  // 10. SIGNATURE HELP PROVIDER
  // ═══════════════════════════════════════════════
  monaco.languages.registerSignatureHelpProvider("purescript", {
    signatureHelpTriggerCharacters: ["("],
    signatureHelpRetriggerCharacters: [",", " "],
    provideSignatureHelp: function (model, position) {
      const lineContent = model.getLineContent(position.lineNumber);
      const textBefore = lineContent.substring(0, position.column - 1);
      // Find the function name before the paren
      const match = textBefore.match(/(\w+)\s*\(\s*[^)]*$/);
      if (!match) return null;
      const fnName = match[1];
      let sig = null;
      let doc = "";
      if (KB[fnName]) {
        sig = fnName + " :: " + KB[fnName].t;
        doc = KB[fnName].d;
      } else {
        const localSig = findTypeSignatureInDoc(model, fnName);
        if (localSig) {
          sig = fnName + " :: " + localSig;
          const lineNum = findLineOfSignature(model, fnName);
          if (lineNum) doc = findDocCommentAbove(model, lineNum) || "";
        }
      }
      if (!sig) return null;
      return {
        value: {
          activeSignature: 0,
          activeParameter: 0,
          signatures: [
            {
              label: sig,
              documentation: { value: doc },
              parameters: [],
            },
          ],
        },
        dispose: function () {},
      };
    },
  });

  // ═══════════════════════════════════════════════
  // 11. DOCUMENT SYMBOL PROVIDER
  // ═══════════════════════════════════════════════
  monaco.languages.registerDocumentSymbolProvider("purescript", {
    provideDocumentSymbols: function (model) {
      const symbols = [];
      const lc = model.getLineCount();
      for (let i = 1; i <= lc; i++) {
        const ln = model.getLineContent(i);
        const trimmed = ln.trimStart();

        // Module
        const mm = trimmed.match(/^module\s+([\w.]+)/);
        if (mm) {
          symbols.push({
            name: mm[1],
            kind: monaco.languages.SymbolKind.Module,
            range: {
              startLineNumber: i,
              startColumn: 1,
              endLineNumber: i,
              endColumn: ln.length + 1,
            },
            selectionRange: {
              startLineNumber: i,
              startColumn: ln.indexOf(mm[1]) + 1,
              endLineNumber: i,
              endColumn: ln.indexOf(mm[1]) + mm[1].length + 1,
            },
            tags: [],
          });
        }

        // data / newtype / type
        const dm = trimmed.match(/^(data|newtype|type)\s+([A-Z]\w*)/);
        if (dm) {
          const k =
            dm[1] === "type"
              ? monaco.languages.SymbolKind.TypeParameter
              : dm[1] === "newtype"
                ? monaco.languages.SymbolKind.Struct
                : monaco.languages.SymbolKind.Class;
          symbols.push({
            name: dm[2],
            kind: k,
            detail: dm[1],
            range: {
              startLineNumber: i,
              startColumn: 1,
              endLineNumber: i,
              endColumn: ln.length + 1,
            },
            selectionRange: {
              startLineNumber: i,
              startColumn: ln.indexOf(dm[2]) + 1,
              endLineNumber: i,
              endColumn: ln.indexOf(dm[2]) + dm[2].length + 1,
            },
            tags: [],
          });
        }

        // class
        const cm = trimmed.match(/^class\s+(?:.*=>\s*)?([A-Z]\w*)/);
        if (cm) {
          symbols.push({
            name: cm[1],
            kind: monaco.languages.SymbolKind.Interface,
            detail: "class",
            range: {
              startLineNumber: i,
              startColumn: 1,
              endLineNumber: i,
              endColumn: ln.length + 1,
            },
            selectionRange: {
              startLineNumber: i,
              startColumn: ln.indexOf(cm[1]) + 1,
              endLineNumber: i,
              endColumn: ln.indexOf(cm[1]) + cm[1].length + 1,
            },
            tags: [],
          });
        }

        // instance
        const im = trimmed.match(
          /^(?:derive\s+(?:newtype\s+)?)?instance\s+(\w+)/,
        );
        if (im) {
          symbols.push({
            name: im[1],
            kind: monaco.languages.SymbolKind.Object,
            detail: "instance",
            range: {
              startLineNumber: i,
              startColumn: 1,
              endLineNumber: i,
              endColumn: ln.length + 1,
            },
            selectionRange: {
              startLineNumber: i,
              startColumn: ln.indexOf(im[1]) + 1,
              endLineNumber: i,
              endColumn: ln.indexOf(im[1]) + im[1].length + 1,
            },
            tags: [],
          });
        }

        // Top-level type signatures => function
        if (ln === trimmed) {
          const fm = trimmed.match(/^([a-z_]\w*'?)\s*::/);
          if (fm) {
            symbols.push({
              name: fm[1],
              kind: monaco.languages.SymbolKind.Function,
              detail: trimmed
                .substring(fm[1].length)
                .replace(/^\s*::\s*/, "")
                .trim(),
              range: {
                startLineNumber: i,
                startColumn: 1,
                endLineNumber: i,
                endColumn: ln.length + 1,
              },
              selectionRange: {
                startLineNumber: i,
                startColumn: 1,
                endLineNumber: i,
                endColumn: fm[1].length + 1,
              },
              tags: [],
            });
          }
        }

        // foreign import
        const fi = trimmed.match(/^foreign\s+import\s+(\w+)/);
        if (fi) {
          symbols.push({
            name: fi[1],
            kind: monaco.languages.SymbolKind.Function,
            detail: "foreign import",
            range: {
              startLineNumber: i,
              startColumn: 1,
              endLineNumber: i,
              endColumn: ln.length + 1,
            },
            selectionRange: {
              startLineNumber: i,
              startColumn: ln.indexOf(fi[1]) + 1,
              endLineNumber: i,
              endColumn: ln.indexOf(fi[1]) + fi[1].length + 1,
            },
            tags: [],
          });
        }
      }
      return symbols;
    },
  });

  // ═══════════════════════════════════════════════
  // 12. REFERENCE HIGHLIGHT PROVIDER
  // ═══════════════════════════════════════════════
  monaco.languages.registerDocumentHighlightProvider("purescript", {
    provideDocumentHighlights: function (model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return [];
      const matches = model.findMatches(
        "\\b" + word.word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b",
        true,
        true,
        true,
        null,
        false,
      );
      return matches.map(function (m) {
        return {
          range: m.range,
          kind: monaco.languages.DocumentHighlightKind.Read,
        };
      });
    },
  });

  // ─── Rename Provider (scope-aware) ──────────────────────────────────
  monaco.languages.registerRenameProvider("purescript", {
    provideRenameEdits: function (model, position, newName) {
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

      // Layout scopes: a line whose next line is indented further heads a block
      // that runs until the indentation drops back. The block starts on the
      // body's first line, so a binding on the header line stays at the outer
      // (document) level.
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
      const blank = (i: number) => lines[i] === undefined || lines[i].trim() === "";
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

      // Local declarations: `let` bindings and do-notation `<-` bindings.
      const declaration = new RegExp(
        "\\blet\\s+" +
          esc(name) +
          "\\b|\\b" +
          esc(name) +
          "\\s*<-(?!=)",
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
