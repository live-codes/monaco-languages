import type * as Monaco from "monaco-editor";

export default (monaco: typeof Monaco) => {
  // ──────────────────────────────────────────────
  // Haskell Knowledge Base
  // ──────────────────────────────────────────────
  const haskellKeywords = [
    "module",
    "where",
    "import",
    "qualified",
    "as",
    "hiding",
    "data",
    "type",
    "newtype",
    "class",
    "instance",
    "deriving",
    "if",
    "then",
    "else",
    "case",
    "of",
    "let",
    "in",
    "do",
    "where",
    "infixl",
    "infixr",
    "infix",
    "forall",
    "foreign",
    "default",
    "mdo",
    "rec",
    "proc",
    "family",
    "pattern",
    "stock",
    "anyclass",
    "via",
    "role",
    "phantom",
    "representational",
    "nominal",
  ];

  const haskellPragmas = [
    "LANGUAGE",
    "OPTIONS_GHC",
    "INLINE",
    "NOINLINE",
    "SPECIALIZE",
    "RULES",
    "WARNING",
    "DEPRECATED",
    "ANN",
    "MINIMAL",
    "OVERLAPPING",
    "OVERLAPPABLE",
    "OVERLAPS",
    "INCOHERENT",
    "UNPACK",
    "NOUNPACK",
    "SOURCE",
    "COMPLETE",
    "SCC",
  ];

  const ghcExtensions = [
    "OverloadedStrings",
    "GADTs",
    "TypeFamilies",
    "DataKinds",
    "TypeOperators",
    "FlexibleContexts",
    "FlexibleInstances",
    "MultiParamTypeClasses",
    "ScopedTypeVariables",
    "RankNTypes",
    "ExistentialQuantification",
    "KindSignatures",
    "ConstraintKinds",
    "DeriveFunctor",
    "DeriveGeneric",
    "DerivingStrategies",
    "DerivingVia",
    "GeneralizedNewtypeDeriving",
    "StandaloneDeriving",
    "RecordWildCards",
    "NamedFieldPuns",
    "LambdaCase",
    "BlockArguments",
    "TupleSections",
    "PatternSynonyms",
    "ViewPatterns",
    "BangPatterns",
    "StrictData",
    "OverloadedLists",
    "OverloadedLabels",
    "TemplateHaskell",
    "QuasiQuotes",
    "TypeApplications",
    "AllowAmbiguousTypes",
    "FunctionalDependencies",
    "UndecidableInstances",
    "MonoLocalBinds",
    "NoImplicitPrelude",
    "ImportQualifiedPost",
    "LinearTypes",
    "QualifiedDo",
    "QuantifiedConstraints",
  ];

  const preludeFunctions = {
    // Basic
    id: {
      sig: "a -> a",
      desc: "Identity function. Returns its argument unchanged.",
    },
    const: {
      sig: "a -> b -> a",
      desc: "Constant function. Returns the first argument, ignoring the second.",
    },
    flip: {
      sig: "(a -> b -> c) -> b -> a -> c",
      desc: "Flips the order of arguments to a function.",
    },
    apply: {
      sig: "(a -> b) -> a -> b",
      desc: "Function application operator.",
    },
    undefined: {
      sig: "a",
      desc: "A special value that throws an error when evaluated. Used as a placeholder.",
    },
    error: {
      sig: "String -> a",
      desc: "Stops execution and displays an error message.",
    },
    seq: {
      sig: "a -> b -> b",
      desc: "Evaluates the first argument to WHNF, then returns the second.",
    },

    // Numeric
    abs: { sig: "Num a => a -> a", desc: "Absolute value." },
    signum: { sig: "Num a => a -> a", desc: "Sign of a number (-1, 0, or 1)." },
    negate: { sig: "Num a => a -> a", desc: "Unary negation." },
    fromIntegral: {
      sig: "(Integral a, Num b) => a -> b",
      desc: "General coercion from integral types.",
    },
    toInteger: {
      sig: "Integral a => a -> Integer",
      desc: "Converts to Integer.",
    },
    div: {
      sig: "Integral a => a -> a -> a",
      desc: "Integer division truncated toward negative infinity.",
    },
    mod: { sig: "Integral a => a -> a -> a", desc: "Integer modulus." },
    quot: {
      sig: "Integral a => a -> a -> a",
      desc: "Integer division truncated toward zero.",
    },
    rem: { sig: "Integral a => a -> a -> a", desc: "Integer remainder." },
    max: {
      sig: "Ord a => a -> a -> a",
      desc: "Returns the larger of two values.",
    },
    min: {
      sig: "Ord a => a -> a -> a",
      desc: "Returns the smaller of two values.",
    },
    succ: { sig: "Enum a => a -> a", desc: "Successor of a value." },
    pred: { sig: "Enum a => a -> a", desc: "Predecessor of a value." },
    even: {
      sig: "Integral a => a -> Bool",
      desc: "Returns True if the argument is even.",
    },
    odd: {
      sig: "Integral a => a -> Bool",
      desc: "Returns True if the argument is odd.",
    },
    ceiling: {
      sig: "(RealFrac a, Integral b) => a -> b",
      desc: "Rounds up to the nearest integer.",
    },
    floor: {
      sig: "(RealFrac a, Integral b) => a -> b",
      desc: "Rounds down to the nearest integer.",
    },
    round: {
      sig: "(RealFrac a, Integral b) => a -> b",
      desc: "Rounds to the nearest integer.",
    },
    truncate: {
      sig: "(RealFrac a, Integral b) => a -> b",
      desc: "Rounds toward zero.",
    },
    sqrt: { sig: "Floating a => a -> a", desc: "Square root." },

    // Bool
    not: { sig: "Bool -> Bool", desc: "Boolean negation." },
    otherwise: {
      sig: "Bool",
      desc: "Defined as True. Used in guards for the default case.",
    },
    bool: {
      sig: "a -> a -> Bool -> a",
      desc: "Case analysis for Bool. bool x y b returns x if b is False, y if True.",
    },

    // Tuples
    fst: {
      sig: "(a, b) -> a",
      desc: "Extracts the first component of a pair.",
    },
    snd: {
      sig: "(a, b) -> b",
      desc: "Extracts the second component of a pair.",
    },
    curry: {
      sig: "((a, b) -> c) -> a -> b -> c",
      desc: "Converts an uncurried function to a curried function.",
    },
    uncurry: {
      sig: "(a -> b -> c) -> (a, b) -> c",
      desc: "Converts a curried function to an uncurried function.",
    },
    swap: { sig: "(a, b) -> (b, a)", desc: "Swaps the components of a pair." },

    // Maybe
    maybe: {
      sig: "b -> (a -> b) -> Maybe a -> b",
      desc: "Takes a default, a function, and a Maybe. Applies the function if Just, otherwise returns the default.",
    },
    fromMaybe: {
      sig: "a -> Maybe a -> a",
      desc: "Extracts the value from a Maybe, or returns the default.",
    },
    isJust: {
      sig: "Maybe a -> Bool",
      desc: "Returns True if the argument is Just.",
    },
    isNothing: {
      sig: "Maybe a -> Bool",
      desc: "Returns True if the argument is Nothing.",
    },
    fromJust: {
      sig: "Maybe a -> a",
      desc: "Extracts the value from Just. Throws error on Nothing. Partial function!",
    },
    catMaybes: {
      sig: "[Maybe a] -> [a]",
      desc: "Extracts all Just values from a list.",
    },
    mapMaybe: {
      sig: "(a -> Maybe b) -> [a] -> [b]",
      desc: "Maps a function and collects Just results.",
    },
    listToMaybe: {
      sig: "[a] -> Maybe a",
      desc: "Returns Nothing on empty list, or Just the head.",
    },

    // Either
    either: {
      sig: "(a -> c) -> (b -> c) -> Either a b -> c",
      desc: "Case analysis for Either.",
    },
    fromLeft: {
      sig: "a -> Either a b -> a",
      desc: "Extracts from Left, or returns default.",
    },
    fromRight: {
      sig: "b -> Either a b -> b",
      desc: "Extracts from Right, or returns default.",
    },
    isLeft: { sig: "Either a b -> Bool", desc: "Returns True if Left." },
    isRight: { sig: "Either a b -> Bool", desc: "Returns True if Right." },

    // List
    map: {
      sig: "(a -> b) -> [a] -> [b]",
      desc: "Applies a function to every element of a list.",
    },
    filter: {
      sig: "(a -> Bool) -> [a] -> [a]",
      desc: "Returns list elements that satisfy the predicate.",
    },
    head: {
      sig: "[a] -> a",
      desc: "First element of a list. Partial: throws error on empty list!",
    },
    tail: {
      sig: "[a] -> [a]",
      desc: "All elements except the first. Partial!",
    },
    last: { sig: "[a] -> a", desc: "Last element. Partial!" },
    init: { sig: "[a] -> [a]", desc: "All elements except the last. Partial!" },
    null: {
      sig: "Foldable t => t a -> Bool",
      desc: "Tests whether a structure is empty.",
    },
    length: {
      sig: "Foldable t => t a -> Int",
      desc: "Returns the number of elements.",
    },
    reverse: { sig: "[a] -> [a]", desc: "Reverses a list." },
    concat: { sig: "[[a]] -> [a]", desc: "Concatenates a list of lists." },
    concatMap: { sig: "(a -> [b]) -> [a] -> [b]", desc: "Map then concat." },
    zip: {
      sig: "[a] -> [b] -> [(a, b)]",
      desc: "Zips two lists into a list of pairs.",
    },
    zipWith: {
      sig: "(a -> b -> c) -> [a] -> [b] -> [c]",
      desc: "Generalised zip with a combining function.",
    },
    unzip: {
      sig: "[(a, b)] -> ([a], [b])",
      desc: "Transforms a list of pairs into a pair of lists.",
    },
    take: { sig: "Int -> [a] -> [a]", desc: "Takes the first n elements." },
    drop: { sig: "Int -> [a] -> [a]", desc: "Drops the first n elements." },
    splitAt: {
      sig: "Int -> [a] -> ([a], [a])",
      desc: "Splits a list at position n.",
    },
    takeWhile: {
      sig: "(a -> Bool) -> [a] -> [a]",
      desc: "Takes elements while predicate holds.",
    },
    dropWhile: {
      sig: "(a -> Bool) -> [a] -> [a]",
      desc: "Drops elements while predicate holds.",
    },
    span: {
      sig: "(a -> Bool) -> [a] -> ([a], [a])",
      desc: "Splits at the point where predicate first fails.",
    },
    break: {
      sig: "(a -> Bool) -> [a] -> ([a], [a])",
      desc: "Splits at the point where predicate first succeeds.",
    },
    elem: {
      sig: "(Eq a, Foldable t) => a -> t a -> Bool",
      desc: "Tests if element is in the structure.",
    },
    notElem: {
      sig: "(Eq a, Foldable t) => a -> t a -> Bool",
      desc: "Negation of elem.",
    },
    lookup: {
      sig: "Eq a => a -> [(a, b)] -> Maybe b",
      desc: "Looks up a key in an association list.",
    },
    iterate: {
      sig: "(a -> a) -> a -> [a]",
      desc: "Produces infinite list: [x, f x, f (f x), ...].",
    },
    repeat: { sig: "a -> [a]", desc: "Infinite list of a single value." },
    replicate: { sig: "Int -> a -> [a]", desc: "List of n copies of a value." },
    cycle: { sig: "[a] -> [a]", desc: "Infinite repetition of a list." },
    sort: {
      sig: "Ord a => [a] -> [a]",
      desc: "Sorts a list (from Data.List).",
    },
    nub: {
      sig: "Eq a => [a] -> [a]",
      desc: "Removes duplicate elements (from Data.List).",
    },
    group: {
      sig: "Eq a => [a] -> [[a]]",
      desc: "Groups adjacent equal elements (from Data.List).",
    },
    intercalate: {
      sig: "[a] -> [[a]] -> [a]",
      desc: "Inserts a list between elements of a list of lists (from Data.List).",
    },
    intersperse: {
      sig: "a -> [a] -> [a]",
      desc: "Inserts element between all elements of a list (from Data.List).",
    },
    transpose: {
      sig: "[[a]] -> [[a]]",
      desc: "Transposes rows and columns (from Data.List).",
    },
    subsequences: {
      sig: "[a] -> [[a]]",
      desc: "All subsequences (from Data.List).",
    },
    permutations: {
      sig: "[a] -> [[a]]",
      desc: "All permutations (from Data.List).",
    },
    words: { sig: "String -> [String]", desc: "Breaks a string into words." },
    unwords: { sig: "[String] -> String", desc: "Joins words with spaces." },
    lines: { sig: "String -> [String]", desc: "Breaks a string into lines." },
    unlines: { sig: "[String] -> String", desc: "Joins lines with newlines." },

    // Folds
    foldl: {
      sig: "Foldable t => (b -> a -> b) -> b -> t a -> b",
      desc: "Left fold.",
    },
    "foldl'": {
      sig: "Foldable t => (b -> a -> b) -> b -> t a -> b",
      desc: "Strict left fold. Preferred over foldl for most cases.",
    },
    foldr: {
      sig: "Foldable t => (a -> b -> b) -> b -> t a -> b",
      desc: "Right fold.",
    },
    foldl1: {
      sig: "Foldable t => (a -> a -> a) -> t a -> a",
      desc: "Left fold without starting value. Partial!",
    },
    foldr1: {
      sig: "Foldable t => (a -> a -> a) -> t a -> a",
      desc: "Right fold without starting value. Partial!",
    },
    foldMap: {
      sig: "(Foldable t, Monoid m) => (a -> m) -> t a -> m",
      desc: "Maps each element to a monoid and combines.",
    },
    sum: { sig: "(Foldable t, Num a) => t a -> a", desc: "Sum of elements." },
    product: {
      sig: "(Foldable t, Num a) => t a -> a",
      desc: "Product of elements.",
    },
    maximum: {
      sig: "(Foldable t, Ord a) => t a -> a",
      desc: "Largest element. Partial!",
    },
    minimum: {
      sig: "(Foldable t, Ord a) => t a -> a",
      desc: "Smallest element. Partial!",
    },
    and: {
      sig: "Foldable t => t Bool -> Bool",
      desc: "Conjunction of a container of Bools.",
    },
    or: {
      sig: "Foldable t => t Bool -> Bool",
      desc: "Disjunction of a container of Bools.",
    },
    any: {
      sig: "Foldable t => (a -> Bool) -> t a -> Bool",
      desc: "Does any element satisfy the predicate?",
    },
    all: {
      sig: "Foldable t => (a -> Bool) -> t a -> Bool",
      desc: "Do all elements satisfy the predicate?",
    },

    // Functor / Applicative / Monad
    fmap: {
      sig: "Functor f => (a -> b) -> f a -> f b",
      desc: "Maps a function over a functor.",
    },
    pure: {
      sig: "Applicative f => a -> f a",
      desc: "Lifts a value into an applicative functor.",
    },
    return: {
      sig: "Monad m => a -> m a",
      desc: "Injects a value into a monadic type.",
    },
    sequence: {
      sig: "(Traversable t, Monad m) => t (m a) -> m (t a)",
      desc: "Evaluates each action in a structure and collects the results.",
    },
    sequence_: {
      sig: "(Foldable t, Monad m) => t (m a) -> m ()",
      desc: "Like sequence but discards results.",
    },
    mapM: {
      sig: "(Traversable t, Monad m) => (a -> m b) -> t a -> m (t b)",
      desc: "Maps a monadic function over a structure.",
    },
    mapM_: {
      sig: "(Foldable t, Monad m) => (a -> m b) -> t a -> m ()",
      desc: "Like mapM but discards results.",
    },
    forM: {
      sig: "(Traversable t, Monad m) => t a -> (a -> m b) -> m (t b)",
      desc: "Flipped mapM.",
    },
    forM_: {
      sig: "(Foldable t, Monad m) => t a -> (a -> m b) -> m ()",
      desc: "Flipped mapM_.",
    },
    when: {
      sig: "Applicative f => Bool -> f () -> f ()",
      desc: "Conditional execution of an applicative action.",
    },
    unless: {
      sig: "Applicative f => Bool -> f () -> f ()",
      desc: "Negated when.",
    },
    guard: {
      sig: "Alternative f => Bool -> f ()",
      desc: "Conditional failure in Alternative/MonadPlus.",
    },
    void: {
      sig: "Functor f => f a -> f ()",
      desc: "Discards the result of a functor computation.",
    },
    join: {
      sig: "Monad m => m (m a) -> m a",
      desc: "Removes one level of monadic structure.",
    },
    liftA2: {
      sig: "Applicative f => (a -> b -> c) -> f a -> f b -> f c",
      desc: "Lifts a binary function into an applicative.",
    },
    traverse: {
      sig: "(Traversable t, Applicative f) => (a -> f b) -> t a -> f (t b)",
      desc: "Maps each element to an action and collects results.",
    },

    // IO
    putStr: { sig: "String -> IO ()", desc: "Writes a string to stdout." },
    putStrLn: {
      sig: "String -> IO ()",
      desc: "Writes a string to stdout, followed by a newline.",
    },
    print: {
      sig: "Show a => a -> IO ()",
      desc: "Outputs a showable value to stdout.",
    },
    getLine: { sig: "IO String", desc: "Reads a line from stdin." },
    getContents: {
      sig: "IO String",
      desc: "Returns all of stdin as a lazy string.",
    },
    interact: {
      sig: "(String -> String) -> IO ()",
      desc: "Takes a function from String to String and applies it to stdin/stdout.",
    },
    readFile: {
      sig: "FilePath -> IO String",
      desc: "Reads a file as a string.",
    },
    writeFile: {
      sig: "FilePath -> String -> IO ()",
      desc: "Writes a string to a file.",
    },
    appendFile: {
      sig: "FilePath -> String -> IO ()",
      desc: "Appends a string to a file.",
    },
    readLn: { sig: "Read a => IO a", desc: "Reads a line and parses it." },

    // Conversion
    show: {
      sig: "Show a => a -> String",
      desc: "Converts a value to its String representation.",
    },
    read: {
      sig: "Read a => String -> a",
      desc: "Parses a string to a value. Partial!",
    },
    reads: {
      sig: "Read a => String -> [(a, String)]",
      desc: "Parse attempts returning remaining string.",
    },
    readMaybe: {
      sig: "Read a => String -> Maybe a",
      desc: "Safe version of read (from Text.Read).",
    },

    // Data.Map
    "Map.empty": { sig: "Map k v", desc: "The empty map." },
    "Map.singleton": {
      sig: "k -> v -> Map k v",
      desc: "A map with a single element.",
    },
    "Map.insert": {
      sig: "Ord k => k -> v -> Map k v -> Map k v",
      desc: "Inserts a key-value pair.",
    },
    "Map.delete": {
      sig: "Ord k => k -> Map k v -> Map k v",
      desc: "Deletes a key.",
    },
    "Map.lookup": {
      sig: "Ord k => k -> Map k v -> Maybe v",
      desc: "Looks up a key.",
    },
    "Map.member": {
      sig: "Ord k => k -> Map k v -> Bool",
      desc: "Is the key a member?",
    },
    "Map.fromList": {
      sig: "Ord k => [(k, v)] -> Map k v",
      desc: "Creates a map from a list of pairs.",
    },
    "Map.toList": {
      sig: "Map k v -> [(k, v)]",
      desc: "Converts to a list of pairs.",
    },
    "Map.map": {
      sig: "(a -> b) -> Map k a -> Map k b",
      desc: "Maps a function over values.",
    },
    "Map.filter": {
      sig: "(a -> Bool) -> Map k a -> Map k a",
      desc: "Filters values by predicate.",
    },
    "Map.unionWith": {
      sig: "Ord k => (a -> a -> a) -> Map k a -> Map k a -> Map k a",
      desc: "Union with a combining function.",
    },
  };

  const haskellTypes = [
    "Int",
    "Integer",
    "Float",
    "Double",
    "Char",
    "String",
    "Bool",
    "IO",
    "Maybe",
    "Either",
    "Ordering",
    "FilePath",
    "IOError",
    "ReadS",
    "ShowS",
    "Rational",
    "Word",
    "Map",
    "Set",
    "Text",
    "ByteString",
    "Vector",
    "Array",
    "IORef",
    "MVar",
    "TVar",
    "STM",
    "Seq",
    "IntMap",
    "IntSet",
    "HashMap",
    "HashSet",
    "Proxy",
    "Void",
    "Natural",
  ];

  const haskellTypeClasses = [
    "Eq",
    "Ord",
    "Show",
    "Read",
    "Enum",
    "Bounded",
    "Num",
    "Integral",
    "Fractional",
    "Floating",
    "RealFrac",
    "Real",
    "RealFloat",
    "Functor",
    "Applicative",
    "Monad",
    "MonadIO",
    "MonadFail",
    "Foldable",
    "Traversable",
    "Semigroup",
    "Monoid",
    "Alternative",
    "MonadPlus",
    "Category",
    "Arrow",
    "Comonad",
    "Bifunctor",
    "Contravariant",
    "MonadTrans",
    "MonadReader",
    "MonadWriter",
    "MonadState",
    "MonadError",
    "IsString",
    "IsList",
    "Generic",
    "Typeable",
    "Data",
    "NFData",
    "Hashable",
    "Binary",
    "ToJSON",
    "FromJSON",
  ];

  // ──────────────────────────────────────────────
  // Code Snippets
  // ──────────────────────────────────────────────
  const codeSnippets = [
    {
      label: "module",
      detail: "Module declaration",
      insertText: "module ${1:ModuleName} where\n\n$0",
    },
    {
      label: "import",
      detail: "Import statement",
      insertText: "import ${1:Module.Name} (${2:items})",
    },
    {
      label: "importq",
      detail: "Qualified import",
      insertText: "import qualified ${1:Module.Name} as ${2:Alias}",
    },
    {
      label: "main",
      detail: "Main function",
      insertText: 'main :: IO ()\nmain = do\n    ${1:putStrLn "Hello, World!"}',
    },
    {
      label: "func",
      detail: "Function with signature",
      insertText:
        "${1:name} :: ${2:a} -> ${3:b}\n${1:name} ${4:x} = ${0:undefined}",
    },
    {
      label: "funcg",
      detail: "Function with guards",
      insertText:
        "${1:name} :: ${2:a} -> ${3:b}\n${1:name} ${4:x}\n    | ${5:condition} = ${6:result}\n    | otherwise     = ${0:undefined}",
    },
    {
      label: "funcp",
      detail: "Function with pattern matching",
      insertText:
        "${1:name} :: ${2:a} -> ${3:b}\n${1:name} ${4:pattern1} = ${5:result1}\n${1:name} ${6:pattern2} = ${0:result2}",
    },
    {
      label: "data",
      detail: "Data type declaration",
      insertText:
        "data ${1:TypeName}\n    = ${2:Constructor1}\n    | ${3:Constructor2}\n    deriving (${4:Show, Eq})",
    },
    {
      label: "datarec",
      detail: "Record data type",
      insertText:
        "data ${1:TypeName} = ${1:TypeName}\n    { ${2:field1} :: ${3:Type1}\n    , ${4:field2} :: ${5:Type2}\n    } deriving (${6:Show, Eq})",
    },
    {
      label: "newtype",
      detail: "Newtype declaration",
      insertText:
        "newtype ${1:TypeName} = ${1:TypeName}\n    { un${1:TypeName} :: ${2:WrappedType}\n    } deriving (${3:Show, Eq})",
    },
    {
      label: "type",
      detail: "Type alias",
      insertText: "type ${1:AliasName} = ${0:ExistingType}",
    },
    {
      label: "class",
      detail: "Typeclass declaration",
      insertText:
        "class ${1:ClassName} ${2:a} where\n    ${3:methodName} :: ${0:a -> a}",
    },
    {
      label: "instance",
      detail: "Typeclass instance",
      insertText:
        "instance ${1:ClassName} ${2:TypeName} where\n    ${3:methodName} = ${0:undefined}",
    },
    {
      label: "if",
      detail: "If-then-else",
      insertText:
        "if ${1:condition}\n    then ${2:trueExpr}\n    else ${0:falseExpr}",
    },
    {
      label: "case",
      detail: "Case expression",
      insertText:
        "case ${1:expr} of\n    ${2:pattern1} -> ${3:result1}\n    ${4:pattern2} -> ${0:result2}",
    },
    {
      label: "let",
      detail: "Let binding",
      insertText: "let ${1:x} = ${2:expr}\nin  ${0:body}",
    },
    {
      label: "letin",
      detail: "Let-in expression",
      insertText:
        "let\n    ${1:x} = ${2:expr}\n    ${3:y} = ${4:expr2}\nin  ${0:body}",
    },
    {
      label: "where",
      detail: "Where clause",
      insertText: "  where\n    ${1:name} = ${0:expr}",
    },
    {
      label: "do",
      detail: "Do block",
      insertText: "do\n    ${1:action1}\n    ${2:action2}\n    ${0:return ()}",
    },
    {
      label: "lambda",
      detail: "Lambda expression",
      insertText: "\\\\${1:x} -> ${0:expr}",
    },
    {
      label: "pragma",
      detail: "Language pragma",
      insertText: "{-# LANGUAGE ${1:Extension} #-}",
    },
    {
      label: "deriving",
      detail: "Deriving clause",
      insertText: "deriving (${1:Show}, ${2:Eq}, ${0:Ord})",
    },
    {
      label: "derivingvia",
      detail: "Deriving via",
      insertText: "deriving ${1:ClassName} via ${0:ViaType}",
    },
    {
      label: "gadt",
      detail: "GADT declaration",
      insertText:
        "data ${1:TypeName} ${2:a} where\n    ${3:Constructor1} :: ${4:Type1} -> ${1:TypeName} ${5:a}\n    ${6:Constructor2} :: ${7:Type2} -> ${1:TypeName} ${0:b}",
    },
    {
      label: "typefam",
      detail: "Type family",
      insertText:
        "type family ${1:FamilyName} (${2:a} :: ${3:*}) :: ${4:*} where\n    ${1:FamilyName} ${5:Type1} = ${0:Result1}",
    },
    {
      label: "forall",
      detail: "Explicit forall",
      insertText:
        "forall ${1:a} ${2:b}. ${3:(${4:Constraint} ${1:a})} => ${0:type}",
    },
    {
      label: "spec",
      detail: "Hspec test spec",
      insertText:
        'describe "${1:module}" $ do\n    it "${2:should do something}" $ do\n        ${0:result} \\`shouldBe\\` ${3:expected}',
    },
    {
      label: "prop",
      detail: "QuickCheck property",
      insertText: 'prop "${1:description}" $ \\\\${2:x} ->\n    ${0:property}',
    },
  ];

  // ── Register language ──
  monaco.languages.register({
    id: "haskell",
    extensions: [".hs", ".lhs"],
    aliases: ["Haskell", "haskell"],
  });

  // ── Monarch Tokenizer ──
  monaco.languages.setMonarchTokensProvider("haskell", {
    keywords: haskellKeywords,
    typeKeywords: haskellTypes.concat(haskellTypeClasses),
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
      "/=",
      "&&",
      "||",
      "++",
      "--",
      "+",
      "-",
      "*",
      "/",
      "\\\\",
      "^",
      "**",
      ">>",
      ">>=",
      "<<",
      "<-",
      "->",
      "=>",
      "..",
      "::",
      "|",
      "<$>",
      "<*>",
      "<$",
      "$>",
      "<|>",
      "<>",
      ">>>",
      "<<<",
      "***",
      "&&&",
      ".",
      "$",
      "@",
      "#",
    ],
    symbols: /[=><!~?:&|+\-*\/\^%@#\\]+/,
    escapes:
      /\\(?:[abfnrtv\\"'&]|x[0-9a-fA-F]+|o[0-7]+|[0-9]+|NUL|SOH|STX|ETX|EOT|ENQ|ACK|BEL|BS|HT|LF|VT|FF|CR|SO|SI|DLE|DC1|DC2|DC3|DC4|NAK|SYN|ETB|CAN|EM|SUB|ESC|FS|GS|RS|US|SP|DEL)/,

    tokenizer: {
      root: [
        // Pragmas
        [/\{-#/, "comment.pragma", "@pragma"],

        // Block comments
        [/\{-/, "comment", "@comment"],

        // Line comments  / Haddock
        [/---.*$/, "comment"],
        [/-- \|.*$/, "comment.doc"],
        [/-- \^.*$/, "comment.doc"],
        [/--.*$/, "comment"],

        // Strings
        [/"/, "string", "@string"],

        // Characters
        [/'[^\\']'/, "string.char"],
        [/'(\\.)+'/, "string.char"],

        // Numbers
        [/0[xX][0-9a-fA-F](_?[0-9a-fA-F])*/, "number.hex"],
        [/0[oO][0-7](_?[0-7])*/, "number.octal"],
        [/0[bB][01](_?[01])*/, "number.binary"],
        [
          /[0-9](_?[0-9])*\.[0-9](_?[0-9])*([eE][\-+]?[0-9](_?[0-9])*)?/,
          "number.float",
        ],
        [/[0-9](_?[0-9])*[eE][\-+]?[0-9](_?[0-9])*/, "number.float"],
        [/[0-9](_?[0-9])*/, "number"],

        // Type / Constructor (starts uppercase)
        [
          /[A-Z][\w']*(\.[A-Z][\w']*)*/,
          {
            cases: {
              "@typeKeywords": "type",
              "@default": "type.identifier",
            },
          },
        ],

        // Identifiers / keywords
        [
          /[a-z_][\w']*/,
          {
            cases: {
              "@keywords": "keyword",
              "@default": "identifier",
            },
          },
        ],

        // Operators
        [
          /@symbols/,
          {
            cases: {
              "@operators": "operator",
              "@default": "operator",
            },
          },
        ],

        // Infix operators in backticks
        [/`[a-zA-Z][\w']*`/, "operator.infix"],

        // Delimiters
        [/[{}()\[\]]/, "@brackets"],
        [/[,;]/, "delimiter"],
      ],

      comment: [
        [/[^{}\-]+/, "comment"],
        [/\{-/, "comment", "@push"],
        [/-\}/, "comment", "@pop"],
        [/[{}\-]/, "comment"],
      ],

      pragma: [
        [/#-\}/, "comment.pragma", "@pop"],
        [
          /LANGUAGE|OPTIONS_GHC|INLINE|NOINLINE|SPECIALIZE|RULES|WARNING|DEPRECATED|UNPACK|SOURCE|COMPLETE|MINIMAL|OVERLAPPING|OVERLAPPABLE|OVERLAPS|INCOHERENT/,
          "keyword.pragma",
        ],
        [/[A-Z][a-zA-Z]*/, "type.pragma"],
        [/[^#\}]+/, "comment.pragma"],
        [/./, "comment.pragma"],
      ],

      string: [
        [/[^\\"]+/, "string"],
        [/@escapes/, "string.escape"],
        [/\\./, "string.escape.invalid"],
        [/"/, "string", "@pop"],
      ],
    },
  });

  // ── Language Configuration ──
  monaco.languages.setLanguageConfiguration("haskell", {
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
      { open: '"', close: '"' },
      { open: "'", close: "'" },
      { open: "{-", close: "-}" },
    ],
    surroundingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: '"', close: '"' },
    ],
    indentationRules: {
      increaseIndentPattern: /^\s*(where|do|of|let|in|\{)\s*$/,
      decreaseIndentPattern: /^\s*(in|\})\s*$/,
    },
    onEnterRules: [
      {
        beforeText: /^\s*--.*$/,
        action: {
          indentAction: monaco.languages.IndentAction.None,
          appendText: "-- ",
        },
      },
      {
        beforeText: /.*=\s*$/,
        action: { indentAction: monaco.languages.IndentAction.Indent },
      },
      {
        beforeText: /.*do\s*$/,
        action: { indentAction: monaco.languages.IndentAction.Indent },
      },
      {
        beforeText: /.*where\s*$/,
        action: { indentAction: monaco.languages.IndentAction.Indent },
      },
      {
        beforeText: /.*of\s*$/,
        action: { indentAction: monaco.languages.IndentAction.Indent },
      },
      {
        beforeText: /.*let\s*$/,
        action: { indentAction: monaco.languages.IndentAction.Indent },
      },
      {
        beforeText: /.*then\s*$/,
        action: { indentAction: monaco.languages.IndentAction.Indent },
      },
      {
        beforeText: /.*else\s*$/,
        action: { indentAction: monaco.languages.IndentAction.Indent },
      },
    ],
    folding: {
      markers: { start: /^\s*\{-/, end: /^\s*-\}/ },
    },
    wordPattern:
      /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
  });

  // ──────────────────────────────────────────────
  // Completion Provider
  // ──────────────────────────────────────────────
  monaco.languages.registerCompletionItemProvider("haskell", {
    triggerCharacters: [".", ":", " ", "{"],
    provideCompletionItems: function (model, position) {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };
      const lineContent = model.getLineContent(position.lineNumber);
      const textBefore = lineContent.substring(0, position.column - 1);
      const suggestions = [];

      // Pragma completions inside {-# LANGUAGE ... #-}
      if (/\{-#\s*LANGUAGE\s+\w*$/.test(textBefore)) {
        ghcExtensions.forEach((ext) => {
          suggestions.push({
            label: ext,
            kind: monaco.languages.CompletionItemKind.EnumMember,
            detail: "GHC Extension",
            insertText: ext,
            range: range,
          });
        });
        return { suggestions };
      }

      // Pragma keyword completions
      if (/\{-#\s*\w*$/.test(textBefore)) {
        haskellPragmas.forEach((p) => {
          suggestions.push({
            label: p,
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: "Pragma",
            insertText: p + " ",
            range: range,
          });
        });
        return { suggestions };
      }

      // After "import" — suggest common modules
      if (/^\s*import\s+(qualified\s+)?[\w.]*$/.test(textBefore)) {
        const modules = [
          "Data.List",
          "Data.Map",
          "Data.Map.Strict",
          "Data.Set",
          "Data.Maybe",
          "Data.Either",
          "Data.Char",
          "Data.String",
          "Data.Text",
          "Data.Text.IO",
          "Data.ByteString",
          "Data.ByteString.Lazy",
          "Data.IORef",
          "Data.Typeable",
          "Data.Foldable",
          "Data.Traversable",
          "Data.Functor",
          "Data.Proxy",
          "Data.Void",
          "Data.Ord",
          "Data.Function",
          "Data.Tuple",
          "Data.Monoid",
          "Data.Semigroup",
          "Data.Coerce",
          "Data.Kind",
          "Data.Int",
          "Data.Word",
          "Data.Bits",
          "Data.Complex",
          "Control.Monad",
          "Control.Monad.IO.Class",
          "Control.Monad.Trans.Class",
          "Control.Monad.Trans.State",
          "Control.Monad.Trans.Reader",
          "Control.Monad.Trans.Writer",
          "Control.Monad.Trans.Except",
          "Control.Monad.Trans.Maybe",
          "Control.Applicative",
          "Control.Exception",
          "Control.Concurrent",
          "Control.Concurrent.MVar",
          "Control.Concurrent.STM",
          "Control.Arrow",
          "System.IO",
          "System.Exit",
          "System.Environment",
          "System.Directory",
          "System.FilePath",
          "Text.Read",
          "Text.Show",
          "Text.Printf",
          "Text.Parsec",
          "GHC.Generics",
          "GHC.TypeLits",
          "GHC.Exts",
        ];
        modules.forEach((m) => {
          suggestions.push({
            label: m,
            kind: monaco.languages.CompletionItemKind.Module,
            detail: "Module",
            insertText: m,
            range: range,
          });
        });
        return { suggestions };
      }

      // After "deriving" — suggest type classes
      if (/deriving\s*\(?\s*[\w,\s]*$/.test(textBefore)) {
        haskellTypeClasses.forEach((tc) => {
          suggestions.push({
            label: tc,
            kind: monaco.languages.CompletionItemKind.Interface,
            detail: "Typeclass",
            insertText: tc,
            range: range,
          });
        });
        return { suggestions };
      }

      // Code snippets
      codeSnippets.forEach((s) => {
        suggestions.push({
          label: s.label,
          kind: monaco.languages.CompletionItemKind.Snippet,
          detail: s.detail,
          documentation: {
            value:
              "```haskell\n" +
              s.insertText
                .replace(/\$\{\d+:?([^}]*)}/g, "$1")
                .replace(/\$0/g, "") +
              "\n```",
          },
          insertText: s.insertText,
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range: range,
          sortText: "1_" + s.label,
        });
      });

      // Keywords
      haskellKeywords.forEach((kw) => {
        suggestions.push({
          label: kw,
          kind: monaco.languages.CompletionItemKind.Keyword,
          detail: "keyword",
          insertText: kw,
          range: range,
          sortText: "3_" + kw,
        });
      });

      // Prelude functions
      Object.keys(preludeFunctions).forEach((fn) => {
        const info = preludeFunctions[fn];
        suggestions.push({
          label: fn,
          kind: monaco.languages.CompletionItemKind.Function,
          detail: fn + " :: " + info.sig,
          documentation: {
            value:
              "```haskell\n" + fn + " :: " + info.sig + "\n```\n\n" + info.desc,
          },
          insertText: fn,
          range: range,
          sortText: "2_" + fn,
        });
      });

      // Types
      haskellTypes.forEach((t) => {
        suggestions.push({
          label: t,
          kind: monaco.languages.CompletionItemKind.Class,
          detail: "Type",
          insertText: t,
          range: range,
          sortText: "4_" + t,
        });
      });

      // Type classes
      haskellTypeClasses.forEach((tc) => {
        suggestions.push({
          label: tc,
          kind: monaco.languages.CompletionItemKind.Interface,
          detail: "Typeclass",
          insertText: tc,
          range: range,
          sortText: "4_" + tc,
        });
      });

      // Local identifiers from current file
      const text = model.getValue();
      const localDefs = extractDefinitions(text);
      localDefs.forEach((def) => {
        suggestions.push({
          label: def.name,
          kind:
            def.kind === "function"
              ? monaco.languages.CompletionItemKind.Function
              : def.kind === "type"
                ? monaco.languages.CompletionItemKind.Class
                : monaco.languages.CompletionItemKind.Variable,
          detail: def.signature || "(local) " + def.kind,
          documentation: def.signature
            ? {
                value:
                  "```haskell\n" +
                  def.name +
                  " :: " +
                  def.signature +
                  "\n```\n\nDefined at line " +
                  def.line,
              }
            : undefined,
          insertText: def.name,
          range: range,
          sortText: "0_" + def.name,
        });
      });

      return { suggestions };
    },
  });

  // ──────────────────────────────────────────────
  // Hover Provider
  // ──────────────────────────────────────────────
  monaco.languages.registerHoverProvider("haskell", {
    provideHover: function (model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return null;
      const text = word.word;

      // Check Prelude
      if (preludeFunctions[text]) {
        const info = preludeFunctions[text];
        return {
          range: new monaco.Range(
            position.lineNumber,
            word.startColumn,
            position.lineNumber,
            word.endColumn,
          ),
          contents: [
            { value: "```haskell\n" + text + " :: " + info.sig + "\n```" },
            { value: info.desc },
            { value: "_Defined in Prelude_" },
          ],
        };
      }

      // Check keywords
      if (haskellKeywords.includes(text)) {
        const kwDocs = {
          module: "Declares a Haskell module.",
          where:
            "Introduces definitions scoped to a declaration, module, or expression.",
          import: "Imports definitions from another module.",
          qualified:
            "Makes imports accessible only with a qualified name (e.g. `Map.lookup`).",
          data: "Declares a new algebraic data type.",
          type: "Declares a type synonym (alias).",
          newtype:
            "Declares a new type with exactly one constructor and one field. Zero runtime cost.",
          class:
            "Declares a typeclass — a set of functions that types can implement.",
          instance: "Provides a typeclass implementation for a specific type.",
          deriving:
            "Automatically generates typeclass instances for a data type.",
          if: "Conditional expression: `if cond then expr1 else expr2`.",
          then: "The branch taken when an `if` condition is True.",
          else: "The branch taken when an `if` condition is False.",
          case: "Pattern matching expression: `case expr of { pat -> result; ... }`.",
          of: "Introduces pattern alternatives in a `case` expression.",
          let: "Introduces local bindings: `let x = expr in body`.",
          in: "Marks the body expression of a `let` binding.",
          do: "Syntactic sugar for monadic sequencing.",
          forall: "Explicit universal quantification of type variables.",
          infixl:
            "Declares a left-associative operator with a given precedence.",
          infixr:
            "Declares a right-associative operator with a given precedence.",
          infix: "Declares a non-associative operator with a given precedence.",
        };
        if (kwDocs[text]) {
          return {
            range: new monaco.Range(
              position.lineNumber,
              word.startColumn,
              position.lineNumber,
              word.endColumn,
            ),
            contents: [
              { value: "```haskell\n-- keyword\n" + text + "\n```" },
              { value: kwDocs[text] },
            ],
          };
        }
      }

      // Check types
      if (haskellTypes.includes(text)) {
        const typeDocs = {
          Int: "Fixed-precision integer. At least [-2^29 .. 2^29-1].",
          Integer: "Arbitrary-precision integer. No overflow.",
          Float: "Single-precision floating point.",
          Double: "Double-precision floating point.",
          Char: "A Unicode character.",
          String: "Type alias for [Char]. A list of characters.",
          Bool: "Boolean type with values True and False.",
          IO: "The I/O monad. Represents computations with side effects.",
          Maybe: "Optional value. Either `Nothing` or `Just a`.",
          Either:
            "Sum type. Either `Left a` (typically error) or `Right b` (typically success).",
          Ordering: "Result of comparison: LT, EQ, or GT.",
          Map: "Ordered map from keys to values (from Data.Map).",
          Set: "Ordered set of unique values (from Data.Set).",
          Text: "Efficient packed Unicode text (from Data.Text).",
          ByteString: "Efficient packed byte sequences (from Data.ByteString).",
          IORef: "Mutable reference in the IO monad.",
          Void: "Uninhabited type. Has no values.",
        };
        return {
          range: new monaco.Range(
            position.lineNumber,
            word.startColumn,
            position.lineNumber,
            word.endColumn,
          ),
          contents: [
            { value: "```haskell\ntype " + text + "\n```" },
            { value: typeDocs[text] || "A Haskell type." },
          ],
        };
      }

      // Check typeclasses
      if (haskellTypeClasses.includes(text)) {
        const tcDocs = {
          Eq: "Types with equality: (==), (/=)",
          Ord: "Totally ordered types: compare, (<), (>), (<=), (>=)",
          Show: "Types that can be converted to String: show",
          Read: "Types that can be parsed from String: read, readMaybe",
          Enum: "Sequentially ordered types: succ, pred, [a..b]",
          Bounded: "Types with a minimum and maximum: minBound, maxBound",
          Num: "Numeric types: (+), (-), (*), abs, signum, fromInteger",
          Integral: "Whole-number types: div, mod, quot, rem, toInteger",
          Fractional: "Fractional types: (/), recip, fromRational",
          Floating: "Floating-point types: pi, exp, log, sin, cos, sqrt",
          Functor: "Types that can be mapped over: fmap, (<$>)",
          Applicative: "Functors with application: pure, (<*>), liftA2",
          Monad: "Types supporting sequential composition: (>>=), return, join",
          Foldable:
            "Structures that can be folded: foldr, foldl, foldMap, sum, length",
          Traversable:
            "Structures that can be traversed: traverse, sequenceA, mapM",
          Semigroup: "Types with an associative binary operation: (<>)",
          Monoid: "Semigroup with identity element: mempty, mappend, mconcat",
          Alternative: "Applicative with choice: empty, (<|>), many, some",
          MonadIO: "Monads with IO capability: liftIO",
          Generic: "Generics support for deriving (from GHC.Generics)",
        };
        return {
          range: new monaco.Range(
            position.lineNumber,
            word.startColumn,
            position.lineNumber,
            word.endColumn,
          ),
          contents: [
            { value: "```haskell\nclass " + text + "\n```" },
            { value: tcDocs[text] || "A Haskell typeclass." },
          ],
        };
      }

      // GHC extensions
      if (ghcExtensions.includes(text)) {
        return {
          range: new monaco.Range(
            position.lineNumber,
            word.startColumn,
            position.lineNumber,
            word.endColumn,
          ),
          contents: [
            { value: "```haskell\n{-# LANGUAGE " + text + " #-}\n```" },
            { value: "GHC language extension." },
          ],
        };
      }

      // Local definitions
      const defs = extractDefinitions(model.getValue());
      const localDef = defs.find((d) => d.name === text);
      if (localDef) {
        const parts = [
          {
            value:
              "```haskell\n" +
              (localDef.signature ? text + " :: " + localDef.signature : text) +
              "\n```",
          },
        ];
        parts.push({
          value: "_Defined at line " + localDef.line + "_ — " + localDef.kind,
        });
        if (localDef.doc) parts.push({ value: localDef.doc });
        return {
          range: new monaco.Range(
            position.lineNumber,
            word.startColumn,
            position.lineNumber,
            word.endColumn,
          ),
          contents: parts,
        };
      }

      return null;
    },
  });

  // ──────────────────────────────────────────────
  // Definition Provider (Go to Definition)
  // ──────────────────────────────────────────────
  monaco.languages.registerDefinitionProvider("haskell", {
    provideDefinition: function (model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return null;
      const text = word.word;
      const defs = extractDefinitions(model.getValue());
      const def = defs.find((d) => d.name === text);
      if (def) {
        return {
          uri: model.uri,
          range: new monaco.Range(def.line, 1, def.line, 1 + text.length),
        };
      }
      return null;
    },
  });

  // ──────────────────────────────────────────────
  // Signature Help Provider
  // ──────────────────────────────────────────────
  monaco.languages.registerSignatureHelpProvider("haskell", {
    signatureHelpTriggerCharacters: ["(", " "],
    provideSignatureHelp: function (model, position) {
      const lineContent = model.getLineContent(position.lineNumber);
      const textBefore = lineContent.substring(0, position.column - 1).trim();

      // Find the function name before the current position
      const match = textBefore.match(/([a-z_][\w']*)\s*$/);
      if (!match) return null;
      const fnName = match[1];

      if (preludeFunctions[fnName]) {
        const info = preludeFunctions[fnName];
        return {
          value: {
            signatures: [
              {
                label: fnName + " :: " + info.sig,
                documentation: { value: info.desc },
                parameters: info.sig
                  .split("->")
                  .map((p) => ({ label: p.trim() })),
              },
            ],
            activeSignature: 0,
            activeParameter: 0,
          },
          dispose: () => {},
        };
      }

      // Check local definitions
      const defs = extractDefinitions(model.getValue());
      const localDef = defs.find((d) => d.name === fnName && d.signature);
      if (localDef) {
        return {
          value: {
            signatures: [
              {
                label: localDef.name + " :: " + localDef.signature,
                parameters: localDef.signature
                  .split("->")
                  .map((p) => ({ label: p.trim() })),
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

  // ──────────────────────────────────────────────
  // Document Symbol Provider (Outline)
  // ──────────────────────────────────────────────
  monaco.languages.registerDocumentSymbolProvider("haskell", {
    provideDocumentSymbols: function (model) {
      const defs = extractDefinitions(model.getValue());
      return defs.map((d) => ({
        name: d.name + (d.signature ? " :: " + d.signature : ""),
        kind:
          d.kind === "type"
            ? monaco.languages.SymbolKind.Class
            : d.kind === "data"
              ? monaco.languages.SymbolKind.Enum
              : d.kind === "class"
                ? monaco.languages.SymbolKind.Interface
                : d.kind === "module"
                  ? monaco.languages.SymbolKind.Module
                  : monaco.languages.SymbolKind.Function,
        range: new monaco.Range(d.line, 1, d.line, 1),
        selectionRange: new monaco.Range(d.line, 1, d.line, 1 + d.name.length),
      }));
    },
  });

  // ──────────────────────────────────────────────
  // Folding Range Provider
  // ──────────────────────────────────────────────
  monaco.languages.registerFoldingRangeProvider("haskell", {
    provideFoldingRanges: function (model) {
      const lines = model.getLinesContent();
      const ranges = [];

      // Block comments
      let commentStart = null;
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes("{-") && !lines[i].includes("-}")) {
          commentStart = i + 1;
        } else if (lines[i].includes("-}") && commentStart !== null) {
          ranges.push({
            start: commentStart,
            end: i + 1,
            kind: monaco.languages.FoldingRangeKind.Comment,
          });
          commentStart = null;
        }
      }

      // where / do / let blocks & top-level definitions
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trimStart();

        // Top-level definitions: non-indented lines that look like function defs or data decls
        if (
          /^[a-z_][\w']*\s/.test(trimmed) ||
          /^(data|newtype|type|class|instance)\s/.test(trimmed)
        ) {
          // Find the end (next top-level def or blank-then-toplevel)
          let end = i;
          for (let j = i + 1; j < lines.length; j++) {
            if (lines[j].length === 0) continue;
            if (/^\S/.test(lines[j]) && j > i + 1) {
              end = j - 1;
              break;
            }
            end = j;
          }
          if (end > i) {
            ranges.push({ start: i + 1, end: end + 1 });
          }
        }
      }

      return ranges;
    },
  });

  // ──────────────────────────────────────────────
  // Extract definitions from Haskell source
  // ──────────────────────────────────────────────
  function extractDefinitions(text) {
    const lines = text.split("\n");
    const defs = [];
    const signatures = {};
    const seen = new Set();

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const ln = i + 1;

      // Get doc comment from preceding lines
      let doc = "";
      if (i > 0 && /^\s*-- \|/.test(lines[i - 1])) {
        doc = lines[i - 1].replace(/^\s*-- \|?\s*/, "");
        for (let j = i - 2; j >= 0; j--) {
          if (/^\s*-- /.test(lines[j]) && !/^\s*-- \|/.test(lines[j])) {
            doc = lines[j].replace(/^\s*--\s*/, "") + " " + doc;
          } else break;
        }
      }

      // Module
      const modMatch = line.match(/^module\s+([\w.]+)/);
      if (modMatch && !seen.has(modMatch[1])) {
        seen.add(modMatch[1]);
        defs.push({ name: modMatch[1], kind: "module", line: ln, doc });
      }

      // Type signatures
      const sigMatch = line.match(/^([a-z_][\w']*)\s*::\s*(.+)$/);
      if (sigMatch) {
        signatures[sigMatch[1]] = sigMatch[2].trim();
      }

      // Function definitions
      const funcMatch = line.match(/^([a-z_][\w']*)\s+(?!::)(.*)=\s*/);
      if (
        funcMatch &&
        !seen.has(funcMatch[1]) &&
        !haskellKeywords.includes(funcMatch[1])
      ) {
        seen.add(funcMatch[1]);
        defs.push({
          name: funcMatch[1],
          kind: "function",
          line: ln,
          signature: signatures[funcMatch[1]] || null,
          doc,
        });
      }

      // Also catch `name = expr`
      const simpleMatch = line.match(/^([a-z_][\w']*)\s*=\s*/);
      if (
        simpleMatch &&
        !seen.has(simpleMatch[1]) &&
        !haskellKeywords.includes(simpleMatch[1])
      ) {
        seen.add(simpleMatch[1]);
        defs.push({
          name: simpleMatch[1],
          kind: "function",
          line: ln,
          signature: signatures[simpleMatch[1]] || null,
          doc,
        });
      }

      // Data types
      const dataMatch = line.match(/^(data|newtype)\s+([A-Z][\w']*)/);
      if (dataMatch && !seen.has(dataMatch[2])) {
        seen.add(dataMatch[2]);
        defs.push({ name: dataMatch[2], kind: "data", line: ln, doc });
      }

      // Type aliases
      const typeMatch = line.match(/^type\s+([A-Z][\w']*)/);
      if (typeMatch && !seen.has(typeMatch[1])) {
        seen.add(typeMatch[1]);
        defs.push({ name: typeMatch[1], kind: "type", line: ln, doc });
      }

      // Classes
      const classMatch = line.match(/^class\s+(?:.*=>\s*)?([A-Z][\w']*)/);
      if (classMatch && !seen.has(classMatch[1])) {
        seen.add(classMatch[1]);
        defs.push({ name: classMatch[1], kind: "class", line: ln, doc });
      }
    }

    return defs;
  }
};
