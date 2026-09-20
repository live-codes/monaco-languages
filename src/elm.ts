import type * as Monaco from "monaco-editor";

export default (monaco: typeof Monaco) => {
  /* =========================================
   DOCS DATABASE
   ========================================= */

  var elmDocs = {};

  function addDoc(name, kind, sig, doc) {
    elmDocs[name] = { kind: kind, detail: sig, doc: doc };
  }

  // -- Keywords --
  addDoc(
    "module",
    "Keyword",
    "Module declaration",
    "Declares the module name and its exposed API.",
  );
  addDoc("import", "Keyword", "Import declaration", "Imports another module.");
  addDoc(
    "exposing",
    "Keyword",
    "Exposing clause",
    "Specifies which values to expose from a module.",
  );
  addDoc(
    "as",
    "Keyword",
    "Module alias",
    "Creates an alias for an imported module.",
  );
  addDoc(
    "type",
    "Keyword",
    "Type definition",
    "Defines a custom type (union type).",
  );
  addDoc("alias", "Keyword", "Type alias", "Creates an alias for a type.");
  addDoc("let", "Keyword", "Let expression", "Defines local bindings.");
  addDoc(
    "in",
    "Keyword",
    "In expression",
    "Ends a let block and begins the body expression.",
  );
  addDoc("case", "Keyword", "Case expression", "Pattern matching expression.");
  addDoc(
    "of",
    "Keyword",
    "Of clause",
    "Used with case to introduce pattern branches.",
  );
  addDoc(
    "if",
    "Keyword",
    "If expression",
    "Conditional expression. Must always have an else branch.",
  );
  addDoc(
    "then",
    "Keyword",
    "Then clause",
    "Branch taken when if condition is True.",
  );
  addDoc(
    "else",
    "Keyword",
    "Else clause",
    "Branch taken when if condition is False. Required in Elm.",
  );
  addDoc(
    "port",
    "Keyword",
    "Port declaration",
    "Declares a port for JavaScript interop.",
  );
  addDoc("where", "Keyword", "Where clause", "Used in where clauses.");

  // -- Core Types --
  addDoc("Int", "Type", "Type", "A 32-bit signed integer.");
  addDoc("Float", "Type", "Type", "A 64-bit floating point number.");
  addDoc("String", "Type", "Type", "A sequence of Unicode characters.");
  addDoc("Bool", "Type", "Type", "A Boolean value: True or False.");
  addDoc("Char", "Type", "Type", "A single Unicode character.");
  addDoc(
    "List",
    "Type",
    "Type",
    "An ordered collection of values of the same type.",
  );
  addDoc(
    "Maybe",
    "Type",
    "Type",
    "Represents values that may or may not exist.\n\ntype Maybe a = Just a | Nothing",
  );
  addDoc(
    "Result",
    "Type",
    "Type",
    "Result of a computation that can fail.\n\ntype Result error value = Ok value | Err error",
  );
  addDoc(
    "Cmd",
    "Type",
    "Type",
    "A command describing something to do (HTTP, random, etc.).",
  );
  addDoc(
    "Sub",
    "Type",
    "Type",
    "A subscription to listen to external input (time, ports, etc.).",
  );
  addDoc(
    "Html",
    "Type",
    "Html.Html",
    "A chunk of HTML that can produce messages of type msg.",
  );
  addDoc("Program", "Type", "Platform.Program", "A full Elm program.");

  // -- Constructors --
  addDoc("Just", "Constructor", "a -> Maybe a", "Wraps a value in a Maybe.");
  addDoc(
    "Nothing",
    "Constructor",
    "Maybe a",
    "Represents the absence of a value.",
  );
  addDoc(
    "Ok",
    "Constructor",
    "value -> Result error value",
    "Represents a successful result.",
  );
  addDoc(
    "Err",
    "Constructor",
    "error -> Result error value",
    "Represents a failed result.",
  );
  addDoc("True", "Constructor", "Bool", "Boolean true value.");
  addDoc("False", "Constructor", "Bool", "Boolean false value.");

  // -- Basics --
  addDoc("identity", "Function", "a -> a", "Returns its argument unchanged.");
  addDoc(
    "always",
    "Function",
    "a -> b -> a",
    "Creates a function that always returns the same value.",
  );
  addDoc("not", "Function", "Bool -> Bool", "Negates a boolean value.");
  addDoc("negate", "Function", "number -> number", "Negates a number.");
  addDoc("abs", "Function", "number -> number", "Returns the absolute value.");
  addDoc("sqrt", "Function", "Float -> Float", "Returns the square root.");
  addDoc(
    "clamp",
    "Function",
    "number -> number -> number -> number",
    "Clamps a number within a range.",
  );
  addDoc(
    "toString",
    "Function",
    "a -> String",
    "Converts any value to a human-readable string.",
  );
  addDoc("toFloat", "Function", "Int -> Float", "Converts an Int to a Float.");
  addDoc("round", "Function", "Float -> Int", "Round to the nearest integer.");
  addDoc(
    "floor",
    "Function",
    "Float -> Int",
    "Round down to the nearest integer.",
  );
  addDoc(
    "ceiling",
    "Function",
    "Float -> Int",
    "Round up to the nearest integer.",
  );
  addDoc("truncate", "Function", "Float -> Int", "Truncate the decimal part.");
  addDoc(
    "modBy",
    "Function",
    "Int -> Int -> Int",
    "Perform modular arithmetic.",
  );
  addDoc(
    "max",
    "Function",
    "comparable -> comparable -> comparable",
    "Returns the larger of two values.",
  );
  addDoc(
    "min",
    "Function",
    "comparable -> comparable -> comparable",
    "Returns the smaller of two values.",
  );
  addDoc(
    "compare",
    "Function",
    "comparable -> comparable -> Order",
    "Compare two values, returning LT, EQ, or GT.",
  );

  // -- List --
  addDoc(
    "List.map",
    "Function",
    "(a -> b) -> List a -> List b",
    "Applies a function to every element.",
  );
  addDoc(
    "List.filter",
    "Function",
    "(a -> Bool) -> List a -> List a",
    "Keeps only elements that satisfy the predicate.",
  );
  addDoc(
    "List.foldl",
    "Function",
    "(a -> b -> b) -> b -> List a -> b",
    "Reduces a list from the left.",
  );
  addDoc(
    "List.foldr",
    "Function",
    "(a -> b -> b) -> b -> List a -> b",
    "Reduces a list from the right.",
  );
  addDoc(
    "List.length",
    "Function",
    "List a -> Int",
    "Returns the number of elements.",
  );
  addDoc("List.reverse", "Function", "List a -> List a", "Reverses a list.");
  addDoc(
    "List.member",
    "Function",
    "a -> List a -> Bool",
    "Checks if a value is in a list.",
  );
  addDoc(
    "List.head",
    "Function",
    "List a -> Maybe a",
    "Returns the first element.",
  );
  addDoc(
    "List.tail",
    "Function",
    "List a -> Maybe (List a)",
    "Returns everything after the first element.",
  );
  addDoc(
    "List.append",
    "Function",
    "List a -> List a -> List a",
    "Appends two lists together.",
  );
  addDoc(
    "List.concat",
    "Function",
    "List (List a) -> List a",
    "Flattens a list of lists.",
  );
  addDoc(
    "List.concatMap",
    "Function",
    "(a -> List b) -> List a -> List b",
    "Map then flatten.",
  );
  addDoc(
    "List.take",
    "Function",
    "Int -> List a -> List a",
    "Takes the first n elements.",
  );
  addDoc(
    "List.drop",
    "Function",
    "Int -> List a -> List a",
    "Drops the first n elements.",
  );
  addDoc(
    "List.isEmpty",
    "Function",
    "List a -> Bool",
    "Checks if a list is empty.",
  );
  addDoc(
    "List.sort",
    "Function",
    "List comparable -> List comparable",
    "Sorts in ascending order.",
  );
  addDoc(
    "List.sortBy",
    "Function",
    "(a -> comparable) -> List a -> List a",
    "Sorts by a derived comparable.",
  );
  addDoc(
    "List.range",
    "Function",
    "Int -> Int -> List Int",
    "Creates a range of integers.",
  );
  addDoc(
    "List.repeat",
    "Function",
    "Int -> a -> List a",
    "Repeats a value n times.",
  );
  addDoc(
    "List.indexedMap",
    "Function",
    "(Int -> a -> b) -> List a -> List b",
    "Like map but with index.",
  );
  addDoc(
    "List.any",
    "Function",
    "(a -> Bool) -> List a -> Bool",
    "Checks if any element satisfies predicate.",
  );
  addDoc(
    "List.all",
    "Function",
    "(a -> Bool) -> List a -> Bool",
    "Checks if all elements satisfy predicate.",
  );
  addDoc("List.sum", "Function", "List number -> number", "Gets the sum.");
  addDoc(
    "List.product",
    "Function",
    "List number -> number",
    "Gets the product.",
  );
  addDoc(
    "List.maximum",
    "Function",
    "List comparable -> Maybe comparable",
    "Returns the maximum.",
  );
  addDoc(
    "List.minimum",
    "Function",
    "List comparable -> Maybe comparable",
    "Returns the minimum.",
  );
  addDoc(
    "List.partition",
    "Function",
    "(a -> Bool) -> List a -> (List a, List a)",
    "Splits based on predicate.",
  );
  addDoc(
    "List.filterMap",
    "Function",
    "(a -> Maybe b) -> List a -> List b",
    "Filter and map in one pass.",
  );
  addDoc(
    "List.map2",
    "Function",
    "(a -> b -> c) -> List a -> List b -> List c",
    "Combines two lists.",
  );

  // -- String --
  addDoc("String.isEmpty", "Function", "String -> Bool", "Checks if empty.");
  addDoc("String.length", "Function", "String -> Int", "Returns the length.");
  addDoc(
    "String.reverse",
    "Function",
    "String -> String",
    "Reverses a string.",
  );
  addDoc(
    "String.repeat",
    "Function",
    "Int -> String -> String",
    "Repeats n times.",
  );
  addDoc(
    "String.replace",
    "Function",
    "String -> String -> String -> String",
    "Replaces all occurrences.",
  );
  addDoc(
    "String.append",
    "Function",
    "String -> String -> String",
    "Appends two strings.",
  );
  addDoc(
    "String.concat",
    "Function",
    "List String -> String",
    "Concatenates a list of strings.",
  );
  addDoc(
    "String.split",
    "Function",
    "String -> String -> List String",
    "Splits by separator.",
  );
  addDoc(
    "String.join",
    "Function",
    "String -> List String -> String",
    "Joins with separator.",
  );
  addDoc(
    "String.trim",
    "Function",
    "String -> String",
    "Removes whitespace from both ends.",
  );
  addDoc(
    "String.toUpper",
    "Function",
    "String -> String",
    "Converts to upper case.",
  );
  addDoc(
    "String.toLower",
    "Function",
    "String -> String",
    "Converts to lower case.",
  );
  addDoc(
    "String.contains",
    "Function",
    "String -> String -> Bool",
    "Checks if string contains substring.",
  );
  addDoc(
    "String.startsWith",
    "Function",
    "String -> String -> Bool",
    "Checks prefix.",
  );
  addDoc(
    "String.endsWith",
    "Function",
    "String -> String -> Bool",
    "Checks suffix.",
  );
  addDoc(
    "String.toInt",
    "Function",
    "String -> Maybe Int",
    "Tries to parse as integer.",
  );
  addDoc(
    "String.toFloat",
    "Function",
    "String -> Maybe Float",
    "Tries to parse as float.",
  );
  addDoc(
    "String.fromInt",
    "Function",
    "Int -> String",
    "Converts int to string.",
  );
  addDoc(
    "String.fromFloat",
    "Function",
    "Float -> String",
    "Converts float to string.",
  );
  addDoc(
    "String.fromChar",
    "Function",
    "Char -> String",
    "Converts char to string.",
  );
  addDoc(
    "String.slice",
    "Function",
    "Int -> Int -> String -> String",
    "Takes a substring.",
  );
  addDoc(
    "String.left",
    "Function",
    "Int -> String -> String",
    "Takes left n characters.",
  );
  addDoc(
    "String.right",
    "Function",
    "Int -> String -> String",
    "Takes right n characters.",
  );
  addDoc(
    "String.map",
    "Function",
    "(Char -> Char) -> String -> String",
    "Maps over characters.",
  );
  addDoc(
    "String.filter",
    "Function",
    "(Char -> Bool) -> String -> String",
    "Keeps matching characters.",
  );
  addDoc(
    "String.toList",
    "Function",
    "String -> List Char",
    "Converts to char list.",
  );
  addDoc(
    "String.fromList",
    "Function",
    "List Char -> String",
    "Converts from char list.",
  );

  // -- Maybe --
  addDoc(
    "Maybe.withDefault",
    "Function",
    "a -> Maybe a -> a",
    "Extracts value or returns default.",
  );
  addDoc(
    "Maybe.map",
    "Function",
    "(a -> b) -> Maybe a -> Maybe b",
    "Transforms value inside Maybe.",
  );
  addDoc(
    "Maybe.andThen",
    "Function",
    "(a -> Maybe b) -> Maybe a -> Maybe b",
    "Chains Maybe-returning functions.",
  );
  addDoc(
    "Maybe.map2",
    "Function",
    "(a -> b -> c) -> Maybe a -> Maybe b -> Maybe c",
    "Combine two Maybes.",
  );

  // -- Dict --
  addDoc("Dict.empty", "Function", "Dict k v", "An empty dictionary.");
  addDoc(
    "Dict.singleton",
    "Function",
    "comparable -> v -> Dict comparable v",
    "Dictionary with one pair.",
  );
  addDoc(
    "Dict.insert",
    "Function",
    "comparable -> v -> Dict comparable v -> Dict comparable v",
    "Inserts a pair.",
  );
  addDoc(
    "Dict.get",
    "Function",
    "comparable -> Dict comparable v -> Maybe v",
    "Gets value for key.",
  );
  addDoc(
    "Dict.remove",
    "Function",
    "comparable -> Dict comparable v -> Dict comparable v",
    "Removes a pair.",
  );
  addDoc(
    "Dict.member",
    "Function",
    "comparable -> Dict comparable v -> Bool",
    "Checks if key exists.",
  );
  addDoc("Dict.size", "Function", "Dict k v -> Int", "Number of entries.");
  addDoc("Dict.keys", "Function", "Dict k v -> List k", "Gets all keys.");
  addDoc("Dict.values", "Function", "Dict k v -> List v", "Gets all values.");
  addDoc(
    "Dict.toList",
    "Function",
    "Dict k v -> List (k, v)",
    "Converts to list of pairs.",
  );
  addDoc(
    "Dict.fromList",
    "Function",
    "List (comparable, v) -> Dict comparable v",
    "Creates from list of pairs.",
  );
  addDoc(
    "Dict.map",
    "Function",
    "(k -> a -> b) -> Dict k a -> Dict k b",
    "Maps over values.",
  );
  addDoc(
    "Dict.filter",
    "Function",
    "(k -> v -> Bool) -> Dict k v -> Dict k v",
    "Filters entries.",
  );

  // -- Set --
  addDoc("Set.empty", "Function", "Set comparable", "An empty set.");
  addDoc(
    "Set.insert",
    "Function",
    "comparable -> Set comparable -> Set comparable",
    "Inserts element.",
  );
  addDoc(
    "Set.remove",
    "Function",
    "comparable -> Set comparable -> Set comparable",
    "Removes element.",
  );
  addDoc(
    "Set.member",
    "Function",
    "comparable -> Set comparable -> Bool",
    "Checks membership.",
  );
  addDoc("Set.size", "Function", "Set a -> Int", "Number of elements.");
  addDoc(
    "Set.toList",
    "Function",
    "Set comparable -> List comparable",
    "Converts to sorted list.",
  );
  addDoc(
    "Set.fromList",
    "Function",
    "List comparable -> Set comparable",
    "Creates from list.",
  );
  addDoc(
    "Set.union",
    "Function",
    "Set comparable -> Set comparable -> Set comparable",
    "Union of two sets.",
  );
  addDoc(
    "Set.intersect",
    "Function",
    "Set comparable -> Set comparable -> Set comparable",
    "Intersection.",
  );
  addDoc(
    "Set.diff",
    "Function",
    "Set comparable -> Set comparable -> Set comparable",
    "Difference.",
  );

  // -- Browser --
  addDoc(
    "Browser.sandbox",
    "Function",
    "{ init, update, view } -> Program () model msg",
    "Simplest Elm program: no commands or subscriptions.",
  );
  addDoc(
    "Browser.element",
    "Function",
    "{ init, update, subscriptions, view } -> Program flags model msg",
    "Program that can issue commands and subscribe.",
  );
  addDoc(
    "Browser.document",
    "Function",
    "... -> Program flags model msg",
    "Controls the entire HTML document.",
  );
  addDoc(
    "Browser.application",
    "Function",
    "... -> Program flags model msg",
    "Full single-page app with URL management.",
  );

  // -- Html --
  addDoc("Html.text", "Function", "String -> Html msg", "Creates a text node.");
  addDoc(
    "Html.div",
    "Function",
    "List (Attribute msg) -> List (Html msg) -> Html msg",
    "Creates a div element.",
  );
  addDoc(
    "Html.span",
    "Function",
    "List (Attribute msg) -> List (Html msg) -> Html msg",
    "Creates a span element.",
  );
  addDoc(
    "Html.p",
    "Function",
    "List (Attribute msg) -> List (Html msg) -> Html msg",
    "Creates a p element.",
  );
  addDoc(
    "Html.h1",
    "Function",
    "List (Attribute msg) -> List (Html msg) -> Html msg",
    "Creates an h1 element.",
  );
  addDoc(
    "Html.h2",
    "Function",
    "List (Attribute msg) -> List (Html msg) -> Html msg",
    "Creates an h2 element.",
  );
  addDoc(
    "Html.button",
    "Function",
    "List (Attribute msg) -> List (Html msg) -> Html msg",
    "Creates a button element.",
  );
  addDoc(
    "Html.input",
    "Function",
    "List (Attribute msg) -> List (Html msg) -> Html msg",
    "Creates an input element.",
  );
  addDoc(
    "Html.ul",
    "Function",
    "List (Attribute msg) -> List (Html msg) -> Html msg",
    "Creates a ul element.",
  );
  addDoc(
    "Html.li",
    "Function",
    "List (Attribute msg) -> List (Html msg) -> Html msg",
    "Creates an li element.",
  );
  addDoc(
    "Html.img",
    "Function",
    "List (Attribute msg) -> List (Html msg) -> Html msg",
    "Creates an img element.",
  );
  addDoc(
    "Html.a",
    "Function",
    "List (Attribute msg) -> List (Html msg) -> Html msg",
    "Creates an anchor element.",
  );
  addDoc(
    "Html.form",
    "Function",
    "List (Attribute msg) -> List (Html msg) -> Html msg",
    "Creates a form element.",
  );
  addDoc(
    "Html.map",
    "Function",
    "(a -> msg) -> Html a -> Html msg",
    "Transforms messages produced by HTML.",
  );

  // -- Html.Attributes --
  addDoc(
    "Html.Attributes.class",
    "Function",
    "String -> Attribute msg",
    "Sets the class attribute.",
  );
  addDoc(
    "Html.Attributes.id",
    "Function",
    "String -> Attribute msg",
    "Sets the id attribute.",
  );
  addDoc(
    "Html.Attributes.style",
    "Function",
    "String -> String -> Attribute msg",
    "Sets an inline style.",
  );
  addDoc(
    "Html.Attributes.src",
    "Function",
    "String -> Attribute msg",
    "Sets the src attribute.",
  );
  addDoc(
    "Html.Attributes.href",
    "Function",
    "String -> Attribute msg",
    "Sets the href attribute.",
  );
  addDoc(
    "Html.Attributes.value",
    "Function",
    "String -> Attribute msg",
    "Sets the value attribute.",
  );
  addDoc(
    "Html.Attributes.placeholder",
    "Function",
    "String -> Attribute msg",
    "Sets placeholder text.",
  );
  addDoc(
    "Html.Attributes.checked",
    "Function",
    "Bool -> Attribute msg",
    "Sets checked attribute.",
  );
  addDoc(
    "Html.Attributes.disabled",
    "Function",
    "Bool -> Attribute msg",
    "Sets disabled attribute.",
  );

  // -- Html.Events --
  addDoc(
    "Html.Events.onClick",
    "Function",
    "msg -> Attribute msg",
    "Fires on click.",
  );
  addDoc(
    "Html.Events.onInput",
    "Function",
    "(String -> msg) -> Attribute msg",
    "Fires on input change.",
  );
  addDoc(
    "Html.Events.onSubmit",
    "Function",
    "msg -> Attribute msg",
    "Fires on form submit.",
  );
  addDoc(
    "Html.Events.onBlur",
    "Function",
    "msg -> Attribute msg",
    "Fires on blur.",
  );
  addDoc(
    "Html.Events.onFocus",
    "Function",
    "msg -> Attribute msg",
    "Fires on focus.",
  );
  addDoc(
    "Html.Events.onCheck",
    "Function",
    "(Bool -> msg) -> Attribute msg",
    "Fires on checkbox change.",
  );
  addDoc(
    "Html.Events.onDoubleClick",
    "Function",
    "msg -> Attribute msg",
    "Fires on double click.",
  );

  // -- Json.Decode --
  addDoc(
    "Json.Decode.string",
    "Function",
    "Decoder String",
    "Decodes a JSON string.",
  );
  addDoc(
    "Json.Decode.int",
    "Function",
    "Decoder Int",
    "Decodes a JSON integer.",
  );
  addDoc(
    "Json.Decode.float",
    "Function",
    "Decoder Float",
    "Decodes a JSON float.",
  );
  addDoc(
    "Json.Decode.bool",
    "Function",
    "Decoder Bool",
    "Decodes a JSON boolean.",
  );
  addDoc(
    "Json.Decode.list",
    "Function",
    "Decoder a -> Decoder (List a)",
    "Decodes a JSON array.",
  );
  addDoc(
    "Json.Decode.field",
    "Function",
    "String -> Decoder a -> Decoder a",
    "Decodes a specific field.",
  );
  addDoc(
    "Json.Decode.map",
    "Function",
    "(a -> value) -> Decoder a -> Decoder value",
    "Transforms decoded value.",
  );
  addDoc(
    "Json.Decode.map2",
    "Function",
    "(a -> b -> value) -> Decoder a -> Decoder b -> Decoder value",
    "Combines two decoders.",
  );
  addDoc(
    "Json.Decode.map3",
    "Function",
    "(a -> b -> c -> value) -> ... -> Decoder value",
    "Combines three decoders.",
  );
  addDoc(
    "Json.Decode.andThen",
    "Function",
    "(a -> Decoder b) -> Decoder a -> Decoder b",
    "Chains decoders.",
  );
  addDoc(
    "Json.Decode.succeed",
    "Function",
    "a -> Decoder a",
    "Decoder that always succeeds.",
  );
  addDoc(
    "Json.Decode.fail",
    "Function",
    "String -> Decoder a",
    "Decoder that always fails.",
  );
  addDoc(
    "Json.Decode.nullable",
    "Function",
    "Decoder a -> Decoder (Maybe a)",
    "Decodes nullable JSON value.",
  );

  // -- Http --
  addDoc(
    "Http.get",
    "Function",
    "{ url, expect } -> Cmd msg",
    "Makes a GET request.",
  );
  addDoc(
    "Http.post",
    "Function",
    "{ url, body, expect } -> Cmd msg",
    "Makes a POST request.",
  );
  addDoc(
    "Http.expectJson",
    "Function",
    "(Result Error a -> msg) -> Decoder a -> Expect msg",
    "Expects a JSON response.",
  );
  addDoc(
    "Http.expectString",
    "Function",
    "(Result Error String -> msg) -> Expect msg",
    "Expects a text response.",
  );
  addDoc(
    "Http.jsonBody",
    "Function",
    "Value -> Body",
    "Creates a JSON request body.",
  );
  addDoc("Http.emptyBody", "Function", "Body", "An empty request body.");

  // -- Debug --
  addDoc(
    "Debug.log",
    "Function",
    "String -> a -> a",
    "Logs a tagged value to console and returns it.",
  );
  addDoc(
    "Debug.toString",
    "Function",
    "a -> String",
    "Converts any value to string for debugging.",
  );
  addDoc(
    "Debug.todo",
    "Function",
    "String -> a",
    "Placeholder that crashes at runtime.",
  );

  // -- Operators --
  addDoc(
    "|>",
    "Operator",
    "a -> (a -> b) -> b",
    "Pipe operator: passes value to function on the right.",
  );
  addDoc(
    "<|",
    "Operator",
    "(a -> b) -> a -> b",
    "Backward pipe: applies function on the left.",
  );
  addDoc(
    ">>",
    "Operator",
    "(a -> b) -> (b -> c) -> (a -> c)",
    "Forward function composition.",
  );
  addDoc(
    "<<",
    "Operator",
    "(b -> c) -> (a -> b) -> (a -> c)",
    "Backward function composition.",
  );
  addDoc(
    "++",
    "Operator",
    "appendable -> appendable -> appendable",
    "Appends strings or lists.",
  );
  addDoc(
    "::",
    "Operator",
    "a -> List a -> List a",
    "Cons: adds element to front of list.",
  );

  /* =========================================
   SNIPPETS
   ========================================= */

  var elmSnippets = [];

  function addSnippet(label, detail, body) {
    elmSnippets.push({ label: label, detail: detail, body: body });
  }

  addSnippet(
    "module",
    "Module declaration",
    "module ${1:Main} exposing (${2:..})\n\n$0",
  );
  addSnippet(
    "import",
    "Import statement",
    "import ${1:Module} exposing (${2:..})",
  );
  addSnippet(
    "import as",
    "Import with alias",
    "import ${1:Module} as ${2:Alias}",
  );
  addSnippet(
    "type alias record",
    "Type alias (record)",
    "type alias ${1:Model} =\n    { ${2:field} : ${3:String}\n    }",
  );
  addSnippet(
    "type custom",
    "Custom type",
    "type ${1:Msg}\n    = ${2:FirstVariant}\n    | ${3:SecondVariant}",
  );
  addSnippet(
    "case of",
    "Case expression",
    "case ${1:value} of\n    ${2:pattern} ->\n        ${3:result}",
  );
  addSnippet(
    "if then else",
    "Conditional",
    "if ${1:condition} then\n    ${2:trueExpr}\nelse\n    ${3:falseExpr}",
  );
  addSnippet(
    "let in",
    "Let expression",
    "let\n    ${1:name} =\n        ${2:value}\nin\n${3:expression}",
  );
  addSnippet(
    "function",
    "Function with annotation",
    "${1:name} : ${2:Type}\n${1:name} ${3:args} =\n    ${4:body}",
  );
  addSnippet("anonymous", "Lambda function", "\\\\${1:arg} -> ${2:body}");
  addSnippet(
    "sandbox",
    "Browser.sandbox program",
    "main : Program () Model Msg\nmain =\n    Browser.sandbox\n        { init = init\n        , update = update\n        , view = view\n        }",
  );
  addSnippet(
    "element",
    "Browser.element program",
    "main : Program () Model Msg\nmain =\n    Browser.element\n        { init = init\n        , update = update\n        , subscriptions = subscriptions\n        , view = view\n        }",
  );
  addSnippet(
    "update function",
    "Update function pattern",
    "update : Msg -> Model -> Model\nupdate msg model =\n    case msg of\n        ${1:SomeMsg} ->\n            ${2:model}",
  );
  addSnippet(
    "update cmd",
    "Update with Cmd",
    "update : Msg -> Model -> ( Model, Cmd Msg )\nupdate msg model =\n    case msg of\n        ${1:SomeMsg} ->\n            ( ${2:model}, Cmd.none )",
  );
  addSnippet(
    "view function",
    "View function",
    'view : Model -> Html Msg\nview model =\n    div []\n        [ ${1:text "Hello"}\n        ]',
  );
  addSnippet(
    "subscriptions",
    "Subscriptions",
    "subscriptions : Model -> Sub Msg\nsubscriptions model =\n    Sub.none",
  );
  addSnippet(
    "port outgoing",
    "Outgoing port",
    "port ${1:sendData} : ${2:String} -> Cmd msg",
  );
  addSnippet(
    "port incoming",
    "Incoming port",
    "port ${1:receiveData} : (${2:String} -> msg) -> Sub msg",
  );
  addSnippet(
    "record update",
    "Record update syntax",
    "{ ${1:model} | ${2:field} = ${3:value} }",
  );
  addSnippet(
    "Maybe case",
    "Maybe case pattern",
    "case ${1:maybeValue} of\n    Just ${2:value} ->\n        ${3:value}\n\n    Nothing ->\n        ${4:default}",
  );
  addSnippet(
    "Result case",
    "Result case pattern",
    "case ${1:result} of\n    Ok ${2:value} ->\n        ${3:value}\n\n    Err ${4:error} ->\n        ${5:default}",
  );
  addSnippet(
    "pipe chain",
    "Pipe operator chain",
    "${1:value}\n    |> ${2:firstFn}\n    |> ${3:secondFn}",
  );

  /* =========================================
   MODULE LIST
   ========================================= */

  var elmModules = [
    "Browser",
    "Browser.Dom",
    "Browser.Events",
    "Browser.Navigation",
    "Html",
    "Html.Attributes",
    "Html.Events",
    "Html.Keyed",
    "Html.Lazy",
    "Http",
    "Json.Decode",
    "Json.Encode",
    "Task",
    "Process",
    "Platform",
    "Platform.Cmd",
    "Platform.Sub",
    "Dict",
    "Set",
    "Array",
    "Tuple",
    "Maybe",
    "Result",
    "String",
    "Char",
    "List",
    "Bitwise",
    "Basics",
    "Debug",
    "Regex",
    "Parser",
    "Random",
    "Time",
    "Url",
    "Url.Parser",
    "Url.Builder",
    "File",
    "File.Select",
    "Bytes",
  ];

  // -----------------------------------------
  // Register language
  // -----------------------------------------
  monaco.languages.register({
    id: "elm",
    extensions: [".elm"],
    aliases: ["Elm", "elm"],
    mimetypes: ["text/x-elm"],
  });

  // -----------------------------------------
  // Monarch Tokenizer
  // -----------------------------------------
  monaco.languages.setMonarchTokensProvider("elm", {
    defaultToken: "",
    keywords: [
      "module",
      "exposing",
      "import",
      "as",
      "port",
      "type",
      "alias",
      "let",
      "in",
      "case",
      "of",
      "if",
      "then",
      "else",
      "where",
    ],
    builtinTypes: [
      "Int",
      "Float",
      "String",
      "Bool",
      "Char",
      "List",
      "Maybe",
      "Result",
      "Cmd",
      "Sub",
      "Html",
      "Msg",
      "Model",
      "Program",
      "Just",
      "Nothing",
      "Ok",
      "Err",
      "True",
      "False",
      "Order",
      "LT",
      "EQ",
      "GT",
      "Never",
    ],
    builtinFunctions: [
      "map",
      "filter",
      "foldl",
      "foldr",
      "length",
      "reverse",
      "append",
      "concat",
      "head",
      "tail",
      "take",
      "drop",
      "member",
      "range",
      "repeat",
      "isEmpty",
      "any",
      "all",
      "sum",
      "product",
      "maximum",
      "minimum",
      "sort",
      "sortBy",
      "not",
      "negate",
      "abs",
      "sqrt",
      "clamp",
      "toString",
      "toFloat",
      "round",
      "floor",
      "ceiling",
      "truncate",
      "identity",
      "always",
      "andThen",
      "withDefault",
      "map2",
      "map3",
      "map4",
      "map5",
    ],
    symbols: /[=><!~?:&|+\-*\/\^%\.]+/,
    escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4})/,
    tokenizer: {
      root: [
        [/\{-/, "comment", "@comment"],
        [/--.*$/, "comment"],
        [/\b(module|import|exposing|as|port)\b/, "keyword"],
        [/\b(type|alias)\b/, "keyword"],
        [/\b(if|then|else|case|of|let|in|where)\b/, "keyword"],
        [
          /\b[A-Z][a-zA-Z0-9_]*/,
          {
            cases: {
              "@builtinTypes": "type.identifier",
              "@default": "type.identifier",
            },
          },
        ],
        [/0[xX][0-9a-fA-F]+/, "number.hex"],
        [/0[oO][0-7]+/, "number.octal"],
        [/0[bB][01]+/, "number.binary"],
        [/\d+\.\d+([eE][\-+]?\d+)?/, "number.float"],
        [/\d+([eE][\-+]?\d+)?/, "number"],
        [/"""/, "string", "@mlstring"],
        [/"([^"\\]|\\.)*$/, "string.invalid"],
        [/"/, "string", "@string"],
        [/'[^\\']'/, "string"],
        [/'(\\.)+'/, "string"],
        [/\|>/, "operator"],
        [/<\|/, "operator"],
        [/>>/, "operator"],
        [/<</, "operator"],
        [/\+\+/, "operator"],
        [/::/, "operator"],
        [/->/, "operator"],
        [/<-/, "operator"],
        [/\/=/, "operator"],
        [/==/, "operator"],
        [/&&/, "operator"],
        [/\|\|/, "operator"],
        [/<=/, "operator"],
        [/>=/, "operator"],
        [/\/\//, "operator"],
        [/@symbols/, "operator"],
        [
          /[a-z_][a-zA-Z0-9_']*/,
          {
            cases: {
              "@builtinFunctions": "support.function",
              "@default": "identifier",
            },
          },
        ],
        [/[{}()\[\]]/, "@brackets"],
        [/[,;]/, "delimiter"],
        [/\s+/, "white"],
      ],
      comment: [
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
      mlstring: [
        [/[^"]+/, "string"],
        [/"""/, "string", "@pop"],
        [/"/, "string"],
      ],
    },
  });

  // -----------------------------------------
  // Language Configuration
  // -----------------------------------------
  monaco.languages.setLanguageConfiguration("elm", {
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
      { open: "{-", close: "-}" },
    ],
    surroundingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: '"', close: '"' },
    ],
    indentationRules: {
      increaseIndentPattern: /^\s*(type|let|case|if|else|of)\b.*$/,
      decreaseIndentPattern: /^\s*(in|else)\b/,
    },
    folding: {
      offSide: true,
      markers: { start: /^\s*\{-/, end: /^\s*-\}/ },
    },
  });

  // -----------------------------------------
  // Helper: kind string to Monaco kind
  // -----------------------------------------
  function kindToMonaco(k) {
    var map = {
      Keyword: monaco.languages.CompletionItemKind.Keyword,
      Type: monaco.languages.CompletionItemKind.Class,
      Constructor: monaco.languages.CompletionItemKind.EnumMember,
      Function: monaco.languages.CompletionItemKind.Function,
      Module: monaco.languages.CompletionItemKind.Module,
      Snippet: monaco.languages.CompletionItemKind.Snippet,
      Operator: monaco.languages.CompletionItemKind.Operator,
    };
    return map[k] || monaco.languages.CompletionItemKind.Text;
  }

  // -----------------------------------------
  // Completion Provider
  // -----------------------------------------
  monaco.languages.registerCompletionItemProvider("elm", {
    triggerCharacters: [".", " "],
    provideCompletionItems: function (model, position) {
      var textUntilPos = model.getValueInRange({
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

      // --- Import module completions ---
      var importMatch = textUntilPos.match(/^import\s+(\S*)$/);
      if (importMatch) {
        var pfx = importMatch[1].toLowerCase();
        for (var mi = 0; mi < elmModules.length; mi++) {
          if (elmModules[mi].toLowerCase().indexOf(pfx) === 0) {
            suggestions.push({
              label: elmModules[mi],
              kind: monaco.languages.CompletionItemKind.Module,
              insertText: elmModules[mi],
              detail: "Module",
              range: range,
            });
          }
        }
        return { suggestions: suggestions };
      }

      // --- Module-qualified completions (e.g. List.) ---
      var dotMatch = textUntilPos.match(
        /([A-Z][a-zA-Z0-9_]*(?:\.[A-Z][a-zA-Z0-9_]*)*)\.([a-zA-Z]*)$/,
      );
      if (dotMatch) {
        var modName = dotMatch[1];
        var memPrefix = dotMatch[2].toLowerCase();
        var dotRange = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: position.column - dotMatch[2].length,
          endColumn: position.column,
        };
        var prefix2 = modName + ".";
        var keys = Object.keys(elmDocs);
        for (var di = 0; di < keys.length; di++) {
          var key = keys[di];
          if (key.indexOf(prefix2) === 0) {
            var memberName = key.substring(prefix2.length);
            if (memberName.toLowerCase().indexOf(memPrefix) === 0) {
              var info = elmDocs[key];
              suggestions.push({
                label: memberName,
                kind: kindToMonaco(info.kind),
                insertText: memberName,
                detail: info.detail,
                documentation: { value: info.doc },
                range: dotRange,
              });
            }
          }
        }
        return { suggestions: suggestions };
      }

      // --- User-defined symbols ---
      var fullText = model.getValue();
      var userDefs = {};
      var rm;

      // Type definitions
      var typeRe = /^type\s+(alias\s+)?([A-Z][a-zA-Z0-9_]*)/gm;
      while ((rm = typeRe.exec(fullText)) !== null) {
        var tn = rm[2];
        var isAlias = !!rm[1];
        userDefs[tn] = {
          kind: "Type",
          detail: isAlias ? "Type Alias" : "Custom Type",
          doc:
            (isAlias ? "Type alias " : "Custom type ") +
            tn +
            " defined in this file.",
        };
      }

      // Type annotations
      var sigRe = /^([a-z_][a-zA-Z0-9_']*)\s*:\s*(.+)$/gm;
      while ((rm = sigRe.exec(fullText)) !== null) {
        userDefs[rm[1]] = {
          kind: "Function",
          detail: rm[2].trim(),
          doc: rm[1] + " : " + rm[2].trim(),
        };
      }

      // Top-level bindings
      var skipWords = [
        "module",
        "import",
        "type",
        "port",
        "exposing",
        "as",
        "if",
        "then",
        "else",
        "case",
        "of",
        "let",
        "in",
        "where",
      ];
      var defRe = /^([a-z_][a-zA-Z0-9_']*)\s+(?!:).*=/gm;
      while ((rm = defRe.exec(fullText)) !== null) {
        if (!userDefs[rm[1]] && skipWords.indexOf(rm[1]) === -1) {
          userDefs[rm[1]] = {
            kind: "Function",
            detail: "defined in file",
            doc: rm[1] + " defined in this file.",
          };
        }
      }

      // Constructors from type defs
      var varRe = /^\s+[|=]\s+([A-Z][a-zA-Z0-9_]*)/gm;
      while ((rm = varRe.exec(fullText)) !== null) {
        if (!userDefs[rm[1]]) {
          userDefs[rm[1]] = {
            kind: "Constructor",
            detail: "Constructor",
            doc: "Constructor " + rm[1] + " defined in this file.",
          };
        }
      }

      // Add user-defined
      var udKeys = Object.keys(userDefs);
      for (var ui = 0; ui < udKeys.length; ui++) {
        var uname = udKeys[ui];
        var uinfo = userDefs[uname];
        suggestions.push({
          label: uname,
          kind: kindToMonaco(uinfo.kind),
          insertText: uname,
          detail: uinfo.detail,
          documentation: { value: uinfo.doc },
          range: range,
          sortText: "0_" + uname,
        });
      }

      // Add snippets
      for (var si = 0; si < elmSnippets.length; si++) {
        var sn = elmSnippets[si];
        suggestions.push({
          label: sn.label,
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: sn.body,
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          detail: "[snippet] " + sn.detail,
          range: range,
          sortText: "2_" + sn.label,
        });
      }

      // Add all non-qualified doc entries
      var allKeys = Object.keys(elmDocs);
      for (var ai = 0; ai < allKeys.length; ai++) {
        var akey = allKeys[ai];
        if (akey.indexOf(".") !== -1) {
          continue;
        }
        var ainfo = elmDocs[akey];
        suggestions.push({
          label: akey,
          kind: kindToMonaco(ainfo.kind),
          insertText: akey,
          detail: ainfo.detail,
          documentation: { value: ainfo.doc },
          range: range,
          sortText: "1_" + akey,
        });
      }

      // Add module names
      var moduleNames = {};
      for (var mk = 0; mk < allKeys.length; mk++) {
        var parts = allKeys[mk].split(".");
        if (parts.length > 1) {
          var acc = parts[0];
          moduleNames[acc] = true;
          for (var pi = 1; pi < parts.length - 1; pi++) {
            acc = acc + "." + parts[pi];
            moduleNames[acc] = true;
          }
        }
      }
      var mnKeys = Object.keys(moduleNames);
      for (var mni = 0; mni < mnKeys.length; mni++) {
        suggestions.push({
          label: mnKeys[mni],
          kind: monaco.languages.CompletionItemKind.Module,
          insertText: mnKeys[mni],
          detail: "Module",
          range: range,
          sortText: "1_" + mnKeys[mni],
        });
      }

      return { suggestions: suggestions };
    },
  });

  // -----------------------------------------
  // Hover Provider
  // -----------------------------------------
  monaco.languages.registerHoverProvider("elm", {
    provideHover: function (model, position) {
      var word = model.getWordAtPosition(position);
      if (!word) {
        return null;
      }
      var token = word.word;
      var lineContent = model.getLineContent(position.lineNumber);
      var hoverRange = new monaco.Range(
        position.lineNumber,
        word.startColumn,
        position.lineNumber,
        word.endColumn,
      );

      // Direct match
      if (elmDocs[token]) {
        var d = elmDocs[token];
        return {
          range: hoverRange,
          contents: [
            { value: "**" + token + "** - *" + d.kind + "*" },
            { value: "```elm\n" + token + " : " + d.detail + "\n```" },
            { value: d.doc },
          ],
        };
      }

      // Module-qualified match
      var beforeWord = lineContent.substring(0, word.startColumn - 1);
      var modMatch = beforeWord.match(
        /([A-Z][a-zA-Z0-9_]*(?:\.[A-Z][a-zA-Z0-9_]*)*)\.$/,
      );
      if (modMatch) {
        var qualified = modMatch[1] + "." + token;
        if (elmDocs[qualified]) {
          var qd = elmDocs[qualified];
          return {
            range: hoverRange,
            contents: [
              { value: "**" + qualified + "** - *" + qd.kind + "*" },
              { value: "```elm\n" + qualified + " : " + qd.detail + "\n```" },
              { value: qd.doc },
            ],
          };
        }
      }

      // User-defined hover
      var fullText = model.getValue();
      var esc = token.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
      var sigMatch = fullText.match(
        new RegExp("^" + esc + "\\s*:\\s*(.+)$", "m"),
      );
      if (sigMatch) {
        return {
          range: hoverRange,
          contents: [
            { value: "**" + token + "** - *User-defined*" },
            {
              value: "```elm\n" + token + " : " + sigMatch[1].trim() + "\n```",
            },
          ],
        };
      }

      var typeMatch = fullText.match(
        new RegExp("^type\\s+(alias\\s+)?" + esc + "\\b", "m"),
      );
      if (typeMatch) {
        var ta = !!typeMatch[1];
        return {
          range: hoverRange,
          contents: [
            {
              value:
                "**" +
                token +
                "** - *" +
                (ta ? "Type Alias" : "Custom Type") +
                "*",
            },
            { value: "Defined in this file." },
          ],
        };
      }

      return null;
    },
  });

  // -----------------------------------------
  // Definition Provider (Go-to-definition)
  // -----------------------------------------
  // ─── Binding resolution (shared by the definition and rename providers) ───
  // Resolves the name under the cursor to its block-local binding: every
  // occurrence bound to it, plus the occurrence that declares it. Names with no
  // block-local binding (fields, globals) report `local: false` so callers can
  // keep their document-wide behaviour.
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

    // Layout scopes: a line whose next line is indented further heads a block
    // that runs until the indentation drops back. The block starts on the
    // body's first line, so a top-level definition stays at document level.
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

    // Local declarations: `let` bindings.
    const declaration = new RegExp("\\blet\\s+" + esc(name) + "\\b", "g");
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
    const occurrence = new RegExp("\\b" + esc(name) + "\\b", "g");
    for (let i = 0; i < lines.length; i++) {
      occurrence.lastIndex = 0;
      let m;
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

  monaco.languages.registerDefinitionProvider("elm", {
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
      var word = model.getWordAtPosition(position);
      if (!word) {
        return null;
      }
      var token = word.word;
      var lines = model.getLinesContent();
      var esc = token.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");

      var patterns = [
        new RegExp("^" + esc + "\\s*:"),
        new RegExp("^" + esc + "\\s+[^:].*="),
        new RegExp("^type\\s+(alias\\s+)?" + esc + "\\b"),
        new RegExp("^\\s+[|=]\\s+" + esc + "\\b"),
      ];

      for (var i = 0; i < lines.length; i++) {
        for (var p = 0; p < patterns.length; p++) {
          if (patterns[p].test(lines[i])) {
            if (i + 1 === position.lineNumber) {
              continue;
            }
            var col = lines[i].indexOf(token);
            return {
              uri: model.uri,
              range: new monaco.Range(
                i + 1,
                col + 1,
                i + 1,
                col + 1 + token.length,
              ),
            };
          }
        }
      }
      return null;
    },
  });

  // -----------------------------------------
  // Document Symbol Provider (Outline)
  // -----------------------------------------
  monaco.languages.registerDocumentSymbolProvider("elm", {
    provideDocumentSymbols: function (model) {
      var symbols = [];
      var lines = model.getLinesContent();
      var sm;

      for (var i = 0; i < lines.length; i++) {
        var line = lines[i];

        sm = line.match(/^module\s+([A-Za-z0-9_.]+)/);
        if (sm) {
          symbols.push({
            name: sm[1],
            kind: monaco.languages.SymbolKind.Module,
            range: new monaco.Range(i + 1, 1, i + 1, line.length + 1),
            selectionRange: new monaco.Range(i + 1, 1, i + 1, line.length + 1),
          });
          continue;
        }

        sm = line.match(/^type\s+alias\s+([A-Z][a-zA-Z0-9_]*)/);
        if (sm) {
          symbols.push({
            name: sm[1],
            kind: monaco.languages.SymbolKind.Struct,
            range: new monaco.Range(i + 1, 1, i + 1, line.length + 1),
            selectionRange: new monaco.Range(i + 1, 1, i + 1, line.length + 1),
          });
          continue;
        }

        sm = line.match(/^type\s+([A-Z][a-zA-Z0-9_]*)/);
        if (sm) {
          symbols.push({
            name: sm[1],
            kind: monaco.languages.SymbolKind.Enum,
            range: new monaco.Range(i + 1, 1, i + 1, line.length + 1),
            selectionRange: new monaco.Range(i + 1, 1, i + 1, line.length + 1),
          });
          continue;
        }

        sm = line.match(/^port\s+([a-z_][a-zA-Z0-9_']*)/);
        if (sm) {
          symbols.push({
            name: sm[1],
            kind: monaco.languages.SymbolKind.Interface,
            range: new monaco.Range(i + 1, 1, i + 1, line.length + 1),
            selectionRange: new monaco.Range(i + 1, 1, i + 1, line.length + 1),
          });
          continue;
        }

        sm = line.match(/^([a-z_][a-zA-Z0-9_']*)\s*:/);
        if (sm) {
          symbols.push({
            name: sm[1],
            kind: monaco.languages.SymbolKind.Function,
            range: new monaco.Range(i + 1, 1, i + 1, line.length + 1),
            selectionRange: new monaco.Range(i + 1, 1, i + 1, line.length + 1),
          });
          continue;
        }
      }
      return symbols;
    },
  });

  // -----------------------------------------
  // Signature Help Provider
  // -----------------------------------------
  monaco.languages.registerSignatureHelpProvider("elm", {
    signatureHelpTriggerCharacters: [" ", "("],
    provideSignatureHelp: function (model, position) {
      var lineContent = model.getLineContent(position.lineNumber);
      var textBefore = lineContent.substring(0, position.column - 1).trim();
      var allKeys = Object.keys(elmDocs);

      for (var k = 0; k < allKeys.length; k++) {
        var key = allKeys[k];
        var info = elmDocs[key];
        if (info.kind !== "Function") {
          continue;
        }
        var dotIdx = key.lastIndexOf(".");
        var shortName = dotIdx !== -1 ? key.substring(dotIdx + 1) : key;
        if (textBefore.indexOf(shortName) !== -1) {
          var params = info.detail.split("->");
          params.pop();
          if (params.length === 0) {
            continue;
          }
          var paramLabels = [];
          for (var pi = 0; pi < params.length; pi++) {
            paramLabels.push({ label: params[pi].trim(), documentation: "" });
          }
          return {
            value: {
              signatures: [
                {
                  label: key + " : " + info.detail,
                  documentation: { value: info.doc },
                  parameters: paramLabels,
                },
              ],
              activeSignature: 0,
              activeParameter: 0,
            },
            dispose: function () {},
          };
        }
      }
      return null;
    },
  });

  // -----------------------------------------
  // Folding Range Provider
  // -----------------------------------------
  monaco.languages.registerFoldingRangeProvider("elm", {
    provideFoldingRanges: function (model) {
      var lines = model.getLinesContent();
      var ranges = [];
      var commentStack = [];
      var lastDefStart = -1;

      for (var i = 0; i < lines.length; i++) {
        var trimmed = lines[i].replace(/^\s+/, "");

        // Block comments
        if (trimmed.indexOf("{-") === 0) {
          commentStack.push(i + 1);
        }
        if (trimmed.indexOf("-}") !== -1 && commentStack.length > 0) {
          var cs = commentStack.pop();
          if (i + 1 > cs) {
            ranges.push({
              start: cs,
              end: i + 1,
              kind: monaco.languages.FoldingRangeKind.Comment,
            });
          }
        }

        // Top-level definitions
        var isTopDef =
          /^[a-z_][a-zA-Z0-9_']*\s*:/.test(lines[i]) ||
          /^type\s/.test(lines[i]) ||
          /^port\s/.test(lines[i]);

        if (isTopDef) {
          if (lastDefStart > 0 && i > lastDefStart) {
            ranges.push({
              start: lastDefStart,
              end: i,
              kind: monaco.languages.FoldingRangeKind.Region,
            });
          }
          lastDefStart = i + 1;
        }
      }

      if (lastDefStart > 0 && lines.length >= lastDefStart) {
        ranges.push({
          start: lastDefStart,
          end: lines.length,
          kind: monaco.languages.FoldingRangeKind.Region,
        });
      }

      return ranges;
    },
  });

  // ─── Rename Provider (scope-aware) ──────────────────────────────────
  monaco.languages.registerRenameProvider("elm", {
    provideRenameEdits: function (model, position, newName) {
      const binding = resolveBinding(model, position);
      if (!binding) return null;
      return {
        edits: binding.occurrences.map((r) => ({
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
