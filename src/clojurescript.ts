import type * as Monaco from "monaco-editor";

export default (monaco: typeof Monaco) => {
  const LANG = "clojurescript";

  /* ================================================================
   DATA
   ================================================================ */

  const SPECIAL_FORMS = [
    "def",
    "if",
    "do",
    "let*",
    "letfn*",
    "quote",
    "var",
    "fn*",
    "loop*",
    "recur",
    "throw",
    "try",
    "catch",
    "finally",
    "monitor-enter",
    "monitor-exit",
    "new",
    "set!",
    "deftype*",
    "defrecord*",
    "reify*",
    "case*",
    "import*",
    ".",
  ];

  const MACROS = [
    "ns",
    "require",
    "import",
    "use",
    "refer",
    "refer-clojure",
    "defn",
    "defn-",
    "defmacro",
    "defmacro-",
    "defmulti",
    "defmethod",
    "defprotocol",
    "defrecord",
    "deftype",
    "definterface",
    "defstruct",
    "defonce",
    "definline",
    "declare",
    "gen-class",
    "gen-interface",
    "let",
    "letfn",
    "if-let",
    "if-some",
    "when-let",
    "when-some",
    "when",
    "when-not",
    "when-first",
    "cond",
    "condp",
    "cond->",
    "cond->>",
    "case",
    "and",
    "or",
    "->",
    "->>",
    "some->",
    "some->>",
    "as->",
    "doto",
    "..",
    "lazy-seq",
    "lazy-cat",
    "delay",
    "for",
    "doseq",
    "dotimes",
    "while",
    "binding",
    "with-open",
    "with-redefs",
    "with-out-str",
    "with-in-str",
    "with-precision",
    "with-local-vars",
    "with-bindings",
    "with-loading-context",
    "with-test",
    "comment",
    "time",
    "assert",
    "locking",
    "dosync",
    "sync",
    "io!",
    "memfn",
    "proxy",
    "reify",
    "extend-type",
    "extend-protocol",
    "specify!",
    "amap",
    "areduce",
    "this-as",
    "js-obj",
    "goog-define",
    "vswap!",
    "vreset!",
  ];

  const CORE = [
    // arithmetic & comparison
    "+",
    "-",
    "*",
    "/",
    "=",
    "not=",
    "<",
    "<=",
    ">",
    ">=",
    "compare",
    "inc",
    "dec",
    "max",
    "min",
    "abs",
    "quot",
    "rem",
    "mod",
    "bit-and",
    "bit-or",
    "bit-xor",
    "bit-not",
    "bit-and-not",
    "bit-set",
    "bit-clear",
    "bit-flip",
    "bit-test",
    "bit-shift-left",
    "bit-shift-right",
    "unsigned-bit-shift-right",
    "unchecked-add",
    "unchecked-subtract",
    "unchecked-multiply",
    "unchecked-divide",
    "unchecked-inc",
    "unchecked-dec",
    // predicates
    "zero?",
    "pos?",
    "neg?",
    "even?",
    "odd?",
    "number?",
    "integer?",
    "int?",
    "float?",
    "double?",
    "rational?",
    "decimal?",
    "ratio?",
    "nat-int?",
    "pos-int?",
    "neg-int?",
    "nil?",
    "some?",
    "any?",
    "true?",
    "false?",
    "boolean?",
    "string?",
    "char?",
    "keyword?",
    "symbol?",
    "ident?",
    "simple-keyword?",
    "simple-symbol?",
    "qualified-keyword?",
    "qualified-symbol?",
    "map?",
    "vector?",
    "set?",
    "seq?",
    "sequential?",
    "coll?",
    "associative?",
    "counted?",
    "indexed?",
    "sorted?",
    "reversible?",
    "collection?",
    "map-entry?",
    "record?",
    "fn?",
    "ifn?",
    "var?",
    "tagged-literal?",
    "reader-conditional?",
    "empty?",
    "not-empty",
    "not",
    "boolean",
    "same?",
    // type / identity / conversion
    "identity",
    "type",
    "instance?",
    "object?",
    "array?",
    "regexp?",
    "special-symbol?",
    "name",
    "namespace",
    "symbol",
    "keyword",
    "gensym",
    "int",
    "long",
    "float",
    "double",
    "char",
    "str",
    "subs",
    "format",
    "num",
    "js->clj",
    "clj->js",
    // functions
    "constantly",
    "complement",
    "fnil",
    "juxt",
    "partial",
    "comp",
    "memoize",
    "trampoline",
    "apply",
    "vary-meta",
    "meta",
    "with-meta",
    // sequences
    "seq",
    "first",
    "second",
    "third",
    "fourth",
    "fifth",
    "nth",
    "last",
    "butlast",
    "rest",
    "next",
    "fnext",
    "nnext",
    "nthnext",
    "nthrest",
    "count",
    "rseq",
    "subseq",
    "rsubseq",
    "map",
    "mapv",
    "mapcat",
    "map-indexed",
    "filter",
    "filterv",
    "remove",
    "keep",
    "keep-indexed",
    "reduce",
    "reduce-kv",
    "reductions",
    "reduced",
    "reduced?",
    "ensure-reduced",
    "unreduced",
    "every?",
    "not-every?",
    "some",
    "not-any?",
    "concat",
    "cons",
    "conj",
    "into",
    "list",
    "list*",
    "vector",
    "vec",
    "set",
    "hash-set",
    "hash-map",
    "array-map",
    "sorted-map",
    "sorted-map-by",
    "sorted-set",
    "sorted-set-by",
    "subvec",
    "disj",
    "peek",
    "pop",
    "flatten",
    "reverse",
    "distinct",
    "dedupe",
    "interpose",
    "interleave",
    "partition",
    "partition-all",
    "partition-by",
    "split-at",
    "split-with",
    "take",
    "take-while",
    "take-nth",
    "take-last",
    "drop",
    "drop-while",
    "drop-last",
    "repeat",
    "repeatedly",
    "iterate",
    "cycle",
    "range",
    "shuffle",
    "rand",
    "rand-int",
    "rand-nth",
    "group-by",
    "frequencies",
    "sort",
    "sort-by",
    // maps & sets
    "get",
    "get-in",
    "assoc",
    "assoc-in",
    "dissoc",
    "update",
    "update-in",
    "merge",
    "merge-with",
    "select-keys",
    "keys",
    "vals",
    "key",
    "val",
    "zipmap",
    "find",
    "contains?",
    "empty",
    "hash",
    // strings
    "re-find",
    "re-matches",
    "re-seq",
    "re-pattern",
    "re-groups",
    // output / io
    "pr",
    "prn",
    "print",
    "println",
    "pr-str",
    "prn-str",
    "print-str",
    "println-str",
    "newline",
    "flush",
    "read-string",
    // state
    "atom",
    "deref",
    "reset!",
    "swap!",
    "reset-vals!",
    "swap-vals!",
    "add-watch",
    "remove-watch",
    "set-validator!",
    "get-validator",
    "compare-and-set!",
    "volatile!",
    // metadata / mutation
    "alter-meta!",
    "reset-meta!",
    "vary-meta!",
    // transients
    "transient",
    "persistent!",
    "conj!",
    "assoc!",
    "dissoc!",
    "pop!",
    "disj!",
    // delays
    "force",
    "realized?",
    "delay?",
    // exceptions
    "ex-info",
    "ex-data",
    "ex-message",
    "ex-cause",
    // interop (cljs)
    "js-keys",
    "js-delete",
    "js-invoke",
    "js-mod",
    "aclone",
    "alength",
    "aget",
    "aset",
    "array",
    "make-array",
    "object-array",
    "into-array",
    "to-array",
    "to-array-2d",
    "array-seq",
    "uuid",
    "random-uuid",
    "parse-uuid",
    "uuid?",
    "enable-console-print!",
  ];

  const GLOBALS = [
    "js",
    "goog",
    "cljs",
    "clj",
    "nil",
    "true",
    "false",
    "undefined",
    "NaN",
    "Infinity",
    "*ns*",
    "*print-fn*",
    "*print-err-fn*",
    "*print-newline*",
    "*print-length*",
    "*print-level*",
    "*print-meta*",
    "*print-readably*",
    "*print-namespace-maps*",
    "*warn-on-infer*",
    "*unchecked-if*",
    "*unchecked-arrays*",
    "*assert*",
    "*flush-on-newline*",
  ];

  const ALL_KEYWORDS = [...SPECIAL_FORMS, ...MACROS];

  /* ================================================================
   DOCUMENTATION
   ================================================================ */

  const DOCS = {
    // === Special forms ===
    def: {
      s: "(def symbol doc-string? init?)",
      d: "Creates and interns a global var with the name of symbol, optionally bound to the value of init.",
      e: "(def answer 42)\n(def ^:dynamic *debug* false)",
    },
    if: {
      s: "(if test then else?)",
      d: "Evaluates test. If truthy, evaluates and returns then, otherwise evaluates else (defaults to nil).",
      e: '(if (> x 0) "positive" "non-positive")',
    },
    do: {
      s: "(do exprs*)",
      d: "Evaluates the expressions in order and returns the value of the last.",
      e: '(do (println "hi") 42)',
    },
    "let*": {
      s: "(let* [bindings*] exprs*)",
      d: "Special form underlying let — binds the values in bindings sequentially, then evaluates exprs.",
      e: "(let* [x 1 y (+ x 1)] y) ;=> 2",
    },
    recur: {
      s: "(recur exprs*)",
      d: "Rebinds the current function or loop's arguments and jumps back to its head. Must be in tail position.",
      e: "(loop [i 0]\n  (when (< i 3)\n    (println i)\n    (recur (inc i))))",
    },
    "fn*": {
      s: "(fn* name? [params*] exprs*)",
      d: "Special form underlying fn — creates an anonymous function.",
      e: "(fn* [x] (* x x))",
    },
    "loop*": {
      s: "(loop* [bindings*] exprs*)",
      d: "Special form underlying loop — a recursion point for recur.",
      e: "(loop* [i 0] (if (< i 3) (recur (inc i)) i))",
    },
    quote: {
      s: "(quote form)",
      d: "Returns form without evaluating it, resolving symbols as written.",
      e: "(quote (a b c)) ;=> (a b c)",
    },
    var: {
      s: "(var symbol)",
      d: "Returns the var named by symbol rather than its value.",
      e: "(var map) ;=> #'cljs.core/map",
    },
    throw: {
      s: "(throw expr)",
      d: "Throws the value of expr as an exception.",
      e: '(throw (js/Error. "boom"))',
    },
    try: {
      s: "(try exprs* catch-clause* finally-clause?)",
      d: "Evaluates exprs, catching exceptions with catch clauses and always running the finally clause.",
      e: "(try\n  (/ 1 0)\n  (catch :default e (println e)))",
    },
    catch: {
      s: "(catch classname name exprs*)",
      d: "Catches an exception of the given type (or :default) and binds it to name.",
      e: "(catch js/Error e (println (.-message e)))",
    },
    finally: {
      s: "(finally exprs*)",
      d: "Evaluates exprs for side effects, always running after the try body.",
      e: "(finally (println \"cleanup\"))",
    },
    new: {
      s: "(ClassName. args*)  or  (new ClassName args*)",
      d: "Creates a new instance of a JavaScript class.",
      e: "(js/Date. 2020 0 1)\n(new js/Error \"nope\")",
    },
    "set!": {
      s: "(set! target val)",
      d: "Assigns val to a mutable target — a JavaScript property, array slot, or dynamic var.",
      e: "(set! (.-title js/document) \"Hi\")\n(set! *print-newline* false)",
    },
    ".": {
      s: "(. obj method args*)  or  (. obj -field)",
      d: "JavaScript interop. Calls a method or accesses a property of an object.",
      e: "(.-length \"abc\")\n(.toUpperCase \"abc\")",
    },

    // === Namespace & definitions ===
    ns: {
      s: "(ns name doc-string? attr-map? references*)",
      d: "Defines the current namespace and its dependencies.",
      e: '(ns my.app\n  (:require [clojure.string :as str]\n            [cljs.core.async :refer [chan]]))',
    },
    require: {
      s: "(require libspec*)",
      d: "Loads ClojureScript namespaces. Usually used inside an ns form.",
      e: "(require '[clojure.string :as str])",
    },
    import: {
      s: "(import classname*)",
      d: "Imports JavaScript/Google Closure classes so they can be referenced unqualified.",
      e: "(import goog.Uri)",
    },
    use: {
      s: "(use libspec*)",
      d: "Like require, but also refers the namespace's public vars into the current namespace.",
      e: "(use '[clojure.string :only [join]])",
    },
    defn: {
      s: "(defn name doc-string? attr-map? [params*] prepost-map? body)",
      d: "Defines a function with the given name and parameter vector.",
      e: '(defn greet\n  "Say hello."\n  [name]\n  (str "Hello, " name "!"))',
    },
    "defn-": {
      s: "(defn- name doc-string? [params*] body)",
      d: "Like defn but marks the var private to the namespace.",
      e: "(defn- helper [x] (* x 2))",
    },
    defmacro: {
      s: "(defmacro name doc-string? [params*] body)",
      d: "Defines a macro — a function that runs at compile time and returns a form to be evaluated.",
      e: "(defmacro unless [test & body]\n  `(when-not ~test ~@body))",
    },
    defonce: {
      s: "(defonce name expr)",
      d: "Defines a var that is only bound if it is not already defined — useful with hot reloading.",
      e: "(defonce app-state (atom {}))",
    },
    declare: {
      s: "(declare names*)",
      d: "Defines vars with no value, allowing forward references.",
      e: "(declare render)",
    },
    defmulti: {
      s: "(defmulti name dispatch-fn)",
      d: "Creates a multimethod whose behaviour depends on the value of dispatch-fn.",
      e: "(defmulti area :shape)",
    },
    defmethod: {
      s: "(defmethod multifn dispatch-val [params*] body)",
      d: "Defines an implementation of a multimethod for a dispatch value.",
      e: "(defmethod area :circle [{:keys [r]}]\n  (* Math/PI r r))",
    },
    defprotocol: {
      s: "(defprotocol name doc-string? method-sigs*)",
      d: "Defines a protocol — a named set of method signatures implemented by types.",
      e: "(defprotocol Shape\n  (area [this])\n  (perimeter [this]))",
    },
    defrecord: {
      s: "(defrecord name [fields*] protocols-and-interfaces*)",
      d: "Defines a record type with the given fields, implementing the listed protocols/interfaces.",
      e: "(defrecord Point [x y]\n  Shape\n  (area [_] 0))",
    },
    deftype: {
      s: "(deftype name [fields*] protocols-and-interfaces*)",
      d: "Defines a low-level type with the given fields. Unlike defrecord it has no map-like behaviour.",
      e: "(deftype Pair [a b]\n  Object\n  (toString [_] (str a \",\" b)))",
    },
    definterface: {
      s: "(definterface name method-sigs*)",
      d: "Defines a Java/JavaScript interface.",
      e: "(definterface IGreeter (greet [name]))",
    },

    // === Binding & control ===
    let: {
      s: "(let [bindings*] body)",
      d: "Binds local names to values in a new scope, then evaluates body. Bindings are sequential within the vector, and may destructure.",
      e: "(let [x 1\n      {:keys [a b]} {:a 2 :b 3}]\n  (+ x a b))",
    },
    letfn: {
      s: "(letfn [fnspecs*] body)",
      d: "Binds local functions that can refer to each other.",
      e: "(letfn [(even? [n] (or (zero? n) (odd? (dec n))))\n        (odd? [n] (not (even? n)))]\n  (even? 10))",
    },
    "if-let": {
      s: "(if-let [binding expr] then else?)",
      d: "Binds the value of expr; if truthy evaluates then, otherwise else.",
      e: "(if-let [x (first xs)]\n  (str \"first: \" x)\n  \"empty\")",
    },
    "when-let": {
      s: "(when-let [binding expr] body*)",
      d: "Binds the value of expr and evaluates body when it is truthy.",
      e: "(when-let [user (find-user id)]\n  (println (:name user)))",
    },
    "if-some": {
      s: "(if-some [binding expr] then else?)",
      d: "Like if-let but tests for nil rather than falsey.",
      e: "(if-some [x (get m k)] x \"missing\")",
    },
    "when-some": {
      s: "(when-some [binding expr] body*)",
      d: "Like when-let but tests for nil rather than falsey.",
      e: "(when-some [x (get m k)] (println x))",
    },
    when: {
      s: "(when test body*)",
      d: "Evaluates body when test is truthy, otherwise returns nil.",
      e: '(when (> x 0) (println "positive"))',
    },
    "when-not": {
      s: "(when-not test body*)",
      d: "Evaluates body when test is falsey.",
      e: "(when-not (empty? xs) (println (count xs)))",
    },
    cond: {
      s: "(cond & clauses)",
      d: "Takes test/expr pairs and evaluates the expr of the first truthy test. A :else test matches always.",
      e: "(cond\n  (< n 0) :negative\n  (= n 0) :zero\n  :else   :positive)",
    },
    condp: {
      s: "(condp pred expr & clauses)",
      d: "Evaluates pred with expr and each clause test, returning the matching expression.",
      e: '(condp = x\n  1 "one"\n  2 "two"\n  "other")',
    },
    case: {
      s: "(case e & clauses)",
      d: "Dispatches on a compile-time constant. Much faster than cond for constant tests.",
      e: "(case n\n  1 :one\n  2 :two\n  :other)",
    },
    "cond->": {
      s: "(cond-> expr & clauses)",
      d: "Threads expr through each clause step for which the test is truthy.",
      e: "(cond-> {}\n  (pos? x) (assoc :x x)\n  (pos? y) (assoc :y y))",
    },
    "cond->>": {
      s: "(cond->> expr & clauses)",
      d: "Like cond-> but threads as the last argument of each step.",
      e: "(cond->> xs (pos? n) (take n))",
    },
    and: {
      s: "(and exprs*)",
      d: "Short-circuiting logical AND. Returns the first falsey value, or the last value.",
      e: "(and 1 2 3) ;=> 3",
    },
    or: {
      s: "(or exprs*)",
      d: "Short-circuiting logical OR. Returns the first truthy value, or the last value.",
      e: "(or nil false 3) ;=> 3",
    },
    "->": {
      s: "(-> x forms*)",
      d: "Threads x through the forms as the first argument of each step (thread-first).",
      e: "(-> x\n    inc\n    (* 2))",
    },
    "->>": {
      s: "(->> x forms*)",
      d: "Threads x through the forms as the last argument of each step (thread-last).",
      e: "(->> xs\n     (filter even?)\n     (map #(* % %)))",
    },
    "some->": {
      s: "(some-> expr forms*)",
      d: "Like -> but short-circuits to nil as soon as a step produces nil.",
      e: "(some-> user :address :city)",
    },
    "some->>": {
      s: "(some->> expr forms*)",
      d: "Like ->> but short-circuits to nil as soon as a step produces nil.",
      e: "(some->> xs (map inc) (reduce +))",
    },
    "as->": {
      s: "(as-> expr name forms*)",
      d: "Binds expr to name and threads it through forms, allowing the name to be placed anywhere.",
      e: "(as-> 5 x\n  (+ x 3)\n  (* x 2))",
    },
    doto: {
      s: "(doto x forms*)",
      d: "Evaluates the forms with x inserted as the first argument, then returns x.",
      e: "(doto (js/Map.)\n  (.set \"a\" 1)\n  (.set \"b\" 2))",
    },
    for: {
      s: "(for [seq-exprs] body)",
      d: "List comprehension: returns a lazy sequence of body for each combination of the bindings. Supports :let, :when and :while modifiers.",
      e: "(for [x (range 3)\n      y (range 3)\n      :when (not= x y)]\n  [x y])",
    },
    doseq: {
      s: "(doseq [seq-exprs] body)",
      d: "Like for but for side effects; returns nil.",
      e: "(doseq [x xs] (println x))",
    },
    dotimes: {
      s: "(dotimes [i n] body)",
      d: "Evaluates body with i bound from 0 to n-1.",
      e: "(dotimes [i 3] (println i))",
    },
    while: {
      s: "(while test body*)",
      d: "Repeatedly executes body while test is truthy.",
      e: "(while (< i 10) (println i))",
    },
    loop: {
      s: "(loop [bindings*] body)",
      d: "Establishes a recursion point for recur with the given local bindings.",
      e: "(loop [i 0]\n  (when (< i 5)\n    (println i)\n    (recur (inc i))))",
    },
    binding: {
      s: "(binding [bindings*] body)",
      d: "Temporarily rebinds dynamic vars in a new thread-local scope.",
      e: "(binding [*print-length* 5]\n  (prn coll))",
    },
    "with-open": {
      s: "(with-open [bindings*] body)",
      d: "Binds resources and ensures that .close is called on each when body finishes.",
      e: "(with-open [r (js/FileReader.)]\n  (.readAsText r file))",
    },
    "with-redefs": {
      s: "(with-redefs [bindings*] body)",
      d: "Temporarily redefines vars while body runs. Useful for testing.",
      e: "(with-redefs [fetch-user (constantly nil)]\n  (run-tests))",
    },
    "with-out-str": {
      s: "(with-out-str exprs*)",
      d: "Evaluates exprs, capturing everything printed to standard out as a string.",
      e: '(with-out-str (println "hi")) ;=> "hi\\n"',
    },
    "with-meta": {
      s: "(with-meta obj m)",
      d: "Returns an object of the same type with metadata m.",
      e: "(with-meta [1 2] {:doc \"vec\"})",
    },
    comment: {
      s: "(comment body*)",
      d: "Ignores the body entirely — a way to comment out whole forms.",
      e: "(comment (this-is-not-evaluated))",
    },
    time: {
      s: "(time expr)",
      d: "Evaluates expr and prints the elapsed time, returning expr's value.",
      e: "(time (reduce + (range 1e6)))",
    },
    assert: {
      s: "(assert expr message?)",
      d: "Throws an error when expr is falsey. Controlled by *assert*.",
      e: "(assert (pos? n) \"n must be positive\")",
    },
    "lazy-seq": {
      s: "(lazy-seq body*)",
      d: "Produces a lazy sequence from body, deferring evaluation until the sequence is consumed.",
      e: "(lazy-seq (cons 1 (range 10)))",
    },
    delay: {
      s: "(delay body*)",
      d: "Creates a promise that evaluates body only the first time it is dereferenced, then caches the result.",
      e: "(def d (delay (println \"once\")))\n@d",
    },
    reify: {
      s: "(reify protocols-and-interfaces*)",
      d: "Creates an anonymous object implementing the given protocols/interfaces.",
      e: "(reify Shape\n  (area [_] 12))",
    },
    memfn: {
      s: "(memfn name args*)",
      d: "Expands to a function that calls the named method — useful with sequence functions.",
      e: "(map (memfn toUpperCase) [\"a\" \"b\"])",
    },

    // === Core functions ===
    "+": { s: "(+ x y & more)", d: "Returns the sum of the numbers.", e: "(+ 1 2 3) ;=> 6" },
    "-": { s: "(- x) (- x y & more)", d: "Negates x, or subtracts the remaining numbers from x.", e: "(- 10 3) ;=> 7" },
    "*": { s: "(* x y & more)", d: "Returns the product of the numbers.", e: "(* 2 3 4) ;=> 24" },
    "/": { s: "(/ x) (/ x y & more)", d: "Returns the reciprocal of x, or divides x by the remaining numbers.", e: "(/ 10 2) ;=> 5" },
    "=": { s: "(= x y & more)", d: "Returns true when all arguments are equal in value.", e: "(= [1 2] [1 2]) ;=> true" },
    "not=": { s: "(not= x y & more)", d: "Returns true when not all arguments are equal.", e: "(not= 1 2) ;=> true" },
    "<": { s: "(< x y & more)", d: "Returns true when the numbers are in strictly increasing order.", e: "(< 1 2 3) ;=> true" },
    ">": { s: "(> x y & more)", d: "Returns true when the numbers are in strictly decreasing order.", e: "(> 3 2 1) ;=> true" },
    inc: { s: "(inc x)", d: "Returns x + 1.", e: "(inc 41) ;=> 42" },
    dec: { s: "(dec x)", d: "Returns x - 1.", e: "(dec 43) ;=> 42" },
    max: { s: "(max x y & more)", d: "Returns the greatest of the arguments.", e: "(max 1 3 2) ;=> 3" },
    min: { s: "(min x y & more)", d: "Returns the least of the arguments.", e: "(min 1 3 2) ;=> 1" },
    "zero?": { s: "(zero? x)", d: "Returns true when x is zero.", e: "(zero? 0) ;=> true" },
    "even?": { s: "(even? n)", d: "Returns true when the integer n is even.", e: "(even? 4) ;=> true" },
    "odd?": { s: "(odd? n)", d: "Returns true when the integer n is odd.", e: "(odd? 3) ;=> true" },
    "nil?": { s: "(nil? x)", d: "Returns true when x is nil.", e: "(nil? nil) ;=> true" },
    "some?": { s: "(some? x)", d: "Returns true when x is not nil.", e: "(some? 0) ;=> true" },
    not: { s: "(not x)", d: "Returns true when x is falsey.", e: "(not nil) ;=> true" },
    identity: { s: "(identity x)", d: "Returns x unchanged.", e: "(identity 42) ;=> 42" },
    str: { s: "(str & xs)", d: "Concatenates the string representations of its arguments.", e: '(str "a" 1 :b) ;=> "a1:b"' },
    subs: { s: "(subs s start end?)", d: "Returns the substring of s from start (inclusive) to end (exclusive).", e: '(subs "hello" 1 3) ;=> "el"' },
    "pr-str": { s: "(pr-str & xs)", d: "Returns a string of the readable representation of the arguments.", e: '(pr-str "a" 1) ;=> "\\"a\\" 1"' },
    prn: { s: "(prn & xs)", d: "Prints the readable representation of the arguments followed by a newline.", e: '(prn "hello")' },
    println: { s: "(println & xs)", d: "Prints the arguments separated by spaces, followed by a newline, without escaping.", e: '(println "hello" 42)' },
    format: { s: "(format fmt & args)", d: "Returns a formatted string using goog.string.format (printf-style).", e: '(format "%s is %d" "Ada" 36)' },
    first: { s: "(first coll)", d: "Returns the first item of the collection, or nil.", e: "(first [1 2 3]) ;=> 1" },
    rest: { s: "(rest coll)", d: "Returns a sequence of the items after the first, or an empty sequence.", e: "(rest [1 2 3]) ;=> (2 3)" },
    next: { s: "(next coll)", d: "Returns a sequence of the items after the first, or nil when there are none.", e: "(next [1]) ;=> nil" },
    second: { s: "(second coll)", d: "Returns the second item of the collection.", e: "(second [1 2 3]) ;=> 2" },
    last: { s: "(last coll)", d: "Returns the last item of the collection.", e: "(last [1 2 3]) ;=> 3" },
    nth: { s: "(nth coll n not-found?)", d: "Returns the item at index n, or not-found when out of range.", e: "(nth [1 2 3] 1) ;=> 2" },
    count: { s: "(count coll)", d: "Returns the number of items in the collection.", e: "(count [1 2 3]) ;=> 3" },
    seq: { s: "(seq coll)", d: "Returns a sequence view of coll, or nil when coll is empty.", e: "(seq [1 2 3]) ;=> (1 2 3)" },
    conj: { s: "(conj coll & xs)", d: "Returns a new collection with the items added, at the natural position for the collection type.", e: "(conj [1 2] 3) ;=> [1 2 3]" },
    cons: { s: "(cons x coll)", d: "Returns a sequence with x prepended to coll.", e: "(cons 1 [2 3]) ;=> (1 2 3)" },
    concat: { s: "(concat & colls)", d: "Returns a lazy sequence of the concatenation of the collections.", e: "(concat [1] [2 3]) ;=> (1 2 3)" },
    into: { s: "(into to from)", d: "Returns to with all items of from conjoined.", e: "(into [] #{1 2}) ;=> [1 2]" },
    vec: { s: "(vec coll)", d: "Returns a vector of the items in coll.", e: "(vec '(1 2)) ;=> [1 2]" },
    map: { s: "(map f & colls)", d: "Returns a lazy sequence of the results of applying f to the items of the collections.", e: "(map inc [1 2 3]) ;=> (2 3 4)" },
    mapv: { s: "(mapv f coll)", d: "Like map but returns an eager vector.", e: "(mapv inc [1 2 3]) ;=> [2 3 4]" },
    mapcat: { s: "(mapcat f & colls)", d: "Applies f to the items and concatenates the resulting sequences.", e: "(mapcat #(list % %) [1 2]) ;=> (1 1 2 2)" },
    filter: { s: "(filter pred coll)", d: "Returns a lazy sequence of the items for which pred is truthy.", e: "(filter even? [1 2 3 4]) ;=> (2 4)" },
    remove: { s: "(remove pred coll)", d: "Returns a lazy sequence of the items for which pred is falsey.", e: "(remove even? [1 2 3 4]) ;=> (1 3)" },
    reduce: { s: "(reduce f init? coll)", d: "Reduces coll using f, starting from init or the first item.", e: "(reduce + [1 2 3 4]) ;=> 10" },
    "reduce-kv": { s: "(reduce-kv f init m)", d: "Reduces an associative collection, calling f with accumulator, key and value.", e: "(reduce-kv (fn [a k v] (+ a v)) 0 {:a 1 :b 2}) ;=> 3" },
    some: { s: "(some pred coll)", d: "Returns the first truthy result of pred, or nil.", e: "(some even? [1 3 4]) ;=> true" },
    every: { s: "(every? pred coll)", d: "Returns true when pred is truthy for every item.", e: "(every? pos? [1 2 3]) ;=> true" },
    "every?": { s: "(every? pred coll)", d: "Returns true when pred is truthy for every item.", e: "(every? pos? [1 2 3]) ;=> true" },
    sort: { s: "(sort coll) (sort comp coll)", d: "Returns a sorted sequence of the items in coll.", e: "(sort [3 1 2]) ;=> (1 2 3)" },
    "sort-by": { s: "(sort-by keyfn coll)", d: "Returns a sequence sorted by comparing (keyfn item).", e: "(sort-by count [\"ccc\" \"a\" \"bb\"]) ;=> (\"a\" \"bb\" \"ccc\")" },
    reverse: { s: "(reverse coll)", d: "Returns a sequence of the items of coll in reverse order.", e: "(reverse [1 2 3]) ;=> (3 2 1)" },
    distinct: { s: "(distinct coll)", d: "Returns a lazy sequence of the distinct items in coll.", e: "(distinct [1 1 2 3 3]) ;=> (1 2 3)" },
    take: { s: "(take n coll)", d: "Returns a lazy sequence of the first n items.", e: "(take 2 [1 2 3 4]) ;=> (1 2)" },
    "take-while": { s: "(take-while pred coll)", d: "Returns the leading items for which pred is truthy.", e: "(take-while pos? [1 2 -1 3]) ;=> (1 2)" },
    drop: { s: "(drop n coll)", d: "Returns a lazy sequence of coll with the first n items removed.", e: "(drop 2 [1 2 3 4]) ;=> (3 4)" },
    "drop-while": { s: "(drop-while pred coll)", d: "Drops the leading items for which pred is truthy.", e: "(drop-while pos? [1 2 -1 3]) ;=> (-1 3)" },
    range: { s: "(range) (range end) (range start end step)", d: "Returns a lazy sequence of numbers.", e: "(range 5) ;=> (0 1 2 3 4)" },
    repeat: { s: "(repeat n? x)", d: "Returns a lazy sequence of x repeated n times (or infinitely).", e: "(repeat 3 :x) ;=> (:x :x :x)" },
    iterate: { s: "(iterate f x)", d: "Returns an infinite lazy sequence of x, (f x), (f (f x)), …", e: "(take 4 (iterate inc 1)) ;=> (1 2 3 4)" },
    interpose: { s: "(interpose sep coll)", d: "Returns a sequence with sep placed between each item.", e: "(interpose :sep [1 2 3]) ;=> (1 :sep 2 :sep 3)" },
    partition: { s: "(partition n coll) (partition n step coll)", d: "Returns a lazy sequence of lists of n items.", e: "(partition 2 [1 2 3 4]) ;=> ((1 2) (3 4))" },
    "group-by": { s: "(group-by f coll)", d: "Returns a map of the items grouped by the result of f.", e: "(group-by even? [1 2 3 4]) ;=> {false [1 3], true [2 4]}" },
    frequencies: { s: "(frequencies coll)", d: "Returns a map from item to the number of times it appears.", e: "(frequencies [:a :b :a]) ;=> {:a 2, :b 1}" },
    keys: { s: "(keys m)", d: "Returns a sequence of the keys of the map.", e: "(keys {:a 1 :b 2}) ;=> (:a :b)" },
    vals: { s: "(vals m)", d: "Returns a sequence of the values of the map.", e: "(vals {:a 1 :b 2}) ;=> (1 2)" },
    get: { s: "(get m k not-found?)", d: "Returns the value of the key k in m, or not-found/nil.", e: "(get {:a 1} :a) ;=> 1" },
    "get-in": { s: "(get-in m ks not-found?)", d: "Returns the value at the key path ks in a nested collection.", e: "(get-in {:a {:b 1}} [:a :b]) ;=> 1" },
    assoc: { s: "(assoc coll & kvs)", d: "Returns a new collection with the key/value pairs added.", e: "(assoc {} :a 1) ;=> {:a 1}" },
    "assoc-in": { s: "(assoc-in m ks v)", d: "Associates v at the key path ks in a nested collection.", e: "(assoc-in {} [:a :b] 1) ;=> {:a {:b 1}}" },
    dissoc: { s: "(dissoc m & ks)", d: "Returns a new map with the given keys removed.", e: "(dissoc {:a 1 :b 2} :a) ;=> {:b 2}" },
    update: { s: "(update m k f & args)", d: "Returns a new map with k associated to the result of applying f to its current value.", e: "(update {:n 1} :n inc) ;=> {:n 2}" },
    "update-in": { s: "(update-in m ks f & args)", d: "Like update but for a nested key path.", e: "(update-in {:a {:n 1}} [:a :n] inc) ;=> {:a {:n 2}}" },
    merge: { s: "(merge & maps)", d: "Returns a map with the entries of all maps merged, right-most wins.", e: "(merge {:a 1} {:b 2}) ;=> {:a 1, :b 2}" },
    "select-keys": { s: "(select-keys m ks)", d: "Returns a map containing only the given keys.", e: "(select-keys {:a 1 :b 2} [:a]) ;=> {:a 1}" },
    "contains?": { s: "(contains? coll k)", d: "Returns true when the key k is present in the associative collection.", e: "(contains? {:a 1} :a) ;=> true" },
    "empty?": { s: "(empty? coll)", d: "Returns true when the collection has no items.", e: "(empty? []) ;=> true" },
    zipmap: { s: "(zipmap ks vs)", d: "Returns a map with ks as keys and vs as values.", e: "(zipmap [:a :b] [1 2]) ;=> {:a 1, :b 2}" },
    apply: { s: "(apply f args)", d: "Applies f to the argument list, with the final argument expanded as more args.", e: "(apply + [1 2 3]) ;=> 6" },
    comp: { s: "(comp & fns)", d: "Returns the composition of the functions, applied right-to-left.", e: "((comp inc *) 2 3) ;=> 7" },
    partial: { s: "(partial f & args)", d: "Returns a function that calls f with args plus any further arguments.", e: "((partial + 5) 10) ;=> 15" },
    juxt: { s: "(juxt & fns)", d: "Returns a function that applies each fn to the arguments and returns a vector of the results.", e: "((juxt inc dec) 5) ;=> [6 4]" },
    complement: { s: "(complement f)", d: "Returns a function that returns the logical negation of f's result.", e: "((complement even?) 3) ;=> true" },
    constantly: { s: "(constantly x)", d: "Returns a function that always returns x regardless of its arguments.", e: "((constantly 7) 1 2) ;=> 7" },
    fnil: { s: "(fnil f x & more)", d: "Returns a function that replaces nil arguments with the given defaults.", e: "((fnil inc 0) nil) ;=> 1" },
    memoize: { s: "(memoize f)", d: "Returns a memoized version of f that caches results per argument list.", e: "(def fib (memoize (fn [n] ...)))" },
    atom: { s: "(atom x options?)", d: "Creates an atom holding x — a mutable reference with atomic updates.", e: "(def state (atom 0))" },
    deref: { s: "(deref ref)  or  @ref", d: "Returns the current value of a reference (atom, delay, future, …).", e: "(deref (atom 1)) ;=> 1" },
    "reset!": { s: "(reset! a new-value)", d: "Sets the value of the atom to new-value and returns it.", e: "(reset! state 0)" },
    "swap!": { s: "(swap! a f & args)", d: "Atomically sets the atom to the result of applying f to its current value and the extra args.", e: "(swap! state inc)" },
    "add-watch": { s: "(add-watch ref key f)", d: "Adds a watch function called whenever ref changes.", e: "(add-watch state :log #(println %3))" },
    "remove-watch": { s: "(remove-watch ref key)", d: "Removes the watch registered under key.", e: "(remove-watch state :log)" },
    force: { s: "(force x)", d: "Forces a delay to be realized, returning its value.", e: "(force (delay 42)) ;=> 42" },
    "re-find": { s: "(re-find re s)", d: "Returns the first regex match of re in s, or nil.", e: '(re-find #"\\d+" "a1b2") ;=> "1"' },
    "re-matches": { s: "(re-matches re s)", d: "Returns the match when re matches the whole of s, otherwise nil.", e: '(re-matches #"\\d+" "123") ;=> "123"' },
    "re-seq": { s: "(re-seq re s)", d: "Returns a lazy sequence of all matches of re in s.", e: '(re-seq #"\\d" "a1b2") ;=> ("1" "2")' },
    "re-pattern": { s: "(re-pattern s)", d: "Compiles a string into a regular expression.", e: '(re-pattern "a+b")' },
    "read-string": { s: "(read-string s)", d: "Reads one form from the string of source text.", e: '(read-string "{:a 1}") ;=> {:a 1}' },
    type: { s: "(type x)", d: "Returns the type of x.", e: "(type 42) ;=> #object[Number]" },
    "instance?": { s: "(instance? c x)", d: "Returns true when x is an instance of type c.", e: "(instance? js/Date d)" },
    "js->clj": { s: "(js->clj x & opts)", d: "Converts a JavaScript value into ClojureScript data.", e: '(js->clj (js/JSON.parse "{\\"a\\":1}"))' },
    "clj->js": { s: "(clj->js x)", d: "Recursively converts ClojureScript data into JavaScript objects/arrays.", e: "(clj->js {:a 1})" },
    "js-obj": { s: "(js-obj & keyvals)", d: "Creates a JavaScript object from alternating key/value arguments.", e: '(js-obj "a" 1) ;=> #js {"a" 1}' },
    aget: { s: "(aget array i & idxs)", d: "Returns the element at the index of a JavaScript array or object.", e: "(aget (array 1 2 3) 0) ;=> 1" },
    aset: { s: "(aset array i & idxs val)", d: "Sets the element at the index of a JavaScript array or object.", e: "(aset arr 0 42)" },
    alength: { s: "(alength array)", d: "Returns the length of a JavaScript array.", e: "(alength (array 1 2 3)) ;=> 3" },
    aclone: { s: "(aclone array)", d: "Copies a JavaScript array.", e: "(aclone arr)" },
    "ex-info": { s: "(ex-info msg data cause?)", d: "Creates an exception carrying a message and a data map.", e: '(ex-info "bad" {:id 1})' },
    "ex-data": { s: "(ex-data ex)", d: "Returns the data map attached to an exception created with ex-info.", e: "(ex-data e) ;=> {:id 1}" },
  };

  /* ================================================================
   REGISTER LANGUAGE
   ================================================================ */

  monaco.languages.register({
    id: LANG,
    extensions: [".cljs", ".cljc", ".edn"],
    aliases: ["ClojureScript", "clojurescript", "cljs", "Clojure", "clojure"],
  });

  /* ================================================================
   LANGUAGE CONFIGURATION
   ================================================================ */

  monaco.languages.setLanguageConfiguration(LANG, {
    comments: { lineComment: ";" },
    brackets: [
      ["(", ")"],
      ["[", "]"],
      ["{", "}"],
    ],
    autoClosingPairs: [
      { open: "(", close: ")" },
      { open: "[", close: "]" },
      { open: "{", close: "}" },
      { open: '"', close: '"', notIn: ["string"] },
    ],
    surroundingPairs: [
      { open: "(", close: ")" },
      { open: "[", close: "]" },
      { open: "{", close: "}" },
      { open: '"', close: '"' },
    ],
    wordPattern:
      /[a-zA-Z_*+!?$%&=<>./-][\w*+!?$%&=<>./'#-]*|%\d*|@/,
    indentationRules: {
      increaseIndentPattern: /^\s*[({\[].*[^)}\]\s]\s*$/,
      decreaseIndentPattern: /^\s*[)\]}]/,
    },
    onEnterRules: [
      {
        beforeText: /[({\[][^)}\]]*$/,
        action: { indentAction: monaco.languages.IndentAction.Indent },
      },
    ],
  });

  /* ================================================================
   MONARCH TOKENIZER
   ================================================================ */

  monaco.languages.setMonarchTokensProvider(LANG, {
    specialForms: SPECIAL_FORMS,
    macros: MACROS,
    core: CORE,
    globals: GLOBALS,

    tokenizer: {
      root: [
        [/\s+/, "white"],

        // Line comment
        [/;.*$/, "comment"],

        // Discard / reader comment
        [/#_/, "comment"],
        // Shebang
        [/^#!.*$/, "comment"],

        // Regex literal
        [/#"/, "regexp", "@regex"],

        // Strings
        [/"/, "string", "@string"],

        // Anonymous function / set / namespaced map openers
        [/#\(/, "delimiter.parenthesis"],
        [/#\{/, "delimiter.parenthesis"],

        // Reader conditionals and dispatch macros
        [/#\?@?/, "keyword"],
        [/#::?[\w*+!?$%&=<>./'#-]*/, "tag"],
        [/#['=^]/, "tag"],

        // Keywords (namespaced, auto-resolved)
        [/::[\w*+!?$%&=<>./'#-]+/, "constant"],
        [/:[a-zA-Z_*+!?$%&=<>./-][\w*+!?$%&=<>./'#-]*/, "constant"],
        [/:/, "constant"],

        // Character literals
        [
          /\\newline|\\space|\\tab|\\return|\\backspace|\\formfeed|\\nul|\\null/,
          "string",
        ],
        [/\\u[0-9a-fA-F]{4}/, "string"],
        [/\\o[0-7]{1,3}/, "string"],
        [/\\[^\s(){}[\],;"]/, "string"],

        // Numbers
        [/[+-]?\d+\/\d+/, "number"],
        [/[+-]?0[xX][0-9a-fA-F]+N?/, "number"],
        [/[+-]?0[0-7]+N?/, "number"],
        [/[+-]?\d+[rR][0-9a-zA-Z]+N?/, "number"],
        [/[+-]?\d+\.\d*(?:[eE][+-]?\d+)?[MN]?/, "number.float"],
        [/[+-]?\.\d+(?:[eE][+-]?\d+)?[MN]?/, "number.float"],
        [/[+-]?\d+(?:[eE][+-]?\d+)?[MN]?/, "number"],

        // Parens, brackets, braces
        [/[()\[\]{}]/, "delimiter.parenthesis"],

        // Reader macros: quote, syntax-quote, unquote, deref, metadata
        [/~@/, "tag"],
        [/['`~@^]/, "tag"],

        // Symbols
        [
          /[a-zA-Z_*+!?$%&=<>./-][\w*+!?$%&=<>./'#-]*/,
          {
            cases: {
              "@specialForms": "keyword",
              "@macros": "keyword",
              "@core": "type.identifier",
              "@globals": "variable",
              "@default": "identifier",
            },
          },
        ],
      ],

      string: [
        [/[^\\"]+/, "string"],
        [/\\u[0-9a-fA-F]{4}/, "string.escape"],
        [/\\o[0-7]{1,3}/, "string.escape"],
        [/\\[0-7]{1,3}/, "string.escape"],
        [/\\[btnfr"'\\]/, "string.escape"],
        [/\\/, "string.escape"],
        [/"/, "string", "@pop"],
      ],

      regex: [
        [/[^\\"]+/, "regexp"],
        [/\\[^"]/, "regexp"],
        [/"/, "regexp", "@pop"],
      ],
    },
  });

  /* ================================================================
   S-EXPRESSION SCANNER
   ================================================================ */

  // Builds a tree of the document's bracketed forms together with the symbol
  // tokens they contain. This is the basis for scope-aware navigation: every
  // `(...)`, `[...]` and `{...}` group becomes a scope that can hold local
  // bindings, and every symbol token carries its own source range.
  function buildScopes(model) {
    const lines = model.getLinesContent();
    const eol = model.getEOL();
    const lineStart = [];
    let size = 0;
    for (let i = 0; i < lines.length; i++) {
      lineStart.push(size);
      size += lines[i].length + eol.length;
    }
    const at = (line, col) => lineStart[line] + col;

    const root = {
      isScope: true,
      open: "",
      start: 0,
      end: size,
      names: new Set(),
      items: [],
      anon: false,
    };
    const scopes = [root];
    const stack = [root];
    const symbols = [];

    const current = () => stack[stack.length - 1];
    const addToken = (tok) => {
      current().items.push(tok);
      if (tok.t === "sym") symbols.push(tok);
    };
    const openScope = (open, offset, anon) => {
      const sc = {
        isScope: true,
        open: open,
        start: offset,
        end: size,
        names: new Set(),
        items: [],
        anon: !!anon,
      };
      scopes.push(sc);
      current().items.push(sc);
      stack.push(sc);
    };

    const isSymStart = (c) => /[a-zA-Z_*+!?$%&=<>./-]/.test(c);
    const isSymChar = (c) => /[a-zA-Z0-9_*+!?$%&=<>./'#-]/.test(c);

    let inString = false;
    let inRegex = false;

    for (let li = 0; li < lines.length; li++) {
      const line = lines[li];
      let ci = 0;

      if (inString || inRegex) {
        let closed = false;
        while (ci < line.length) {
          if (line[ci] === "\\") {
            ci += 2;
            continue;
          }
          if (line[ci] === '"') {
            ci++;
            closed = true;
            break;
          }
          ci++;
        }
        if (closed) {
          inString = false;
          inRegex = false;
        }
        continue;
      }

      while (ci < line.length) {
        const ch = line[ci];

        if (ch === ";") break;
        if (ch === "," || /\s/.test(ch)) {
          ci++;
          continue;
        }

        if (ch === '"') {
          ci++;
          let closed = false;
          while (ci < line.length) {
            if (line[ci] === "\\") {
              ci += 2;
              continue;
            }
            if (line[ci] === '"') {
              ci++;
              closed = true;
              break;
            }
            ci++;
          }
          if (!closed) inString = true;
          continue;
        }

        if (ch === "\\") {
          ci++;
          if (ci < line.length && /[a-zA-Z]/.test(line[ci])) {
            while (ci < line.length && /[\w-]/.test(line[ci])) ci++;
          } else if (ci < line.length) {
            ci++;
          }
          continue;
        }

        if (ch === "#") {
          const n = line[ci + 1];
          if (n === "_") {
            ci += 2;
            continue;
          }
          if (n === '"') {
            ci += 2;
            let closed = false;
            while (ci < line.length) {
              if (line[ci] === "\\") {
                ci += 2;
                continue;
              }
              if (line[ci] === '"') {
                ci++;
                closed = true;
                break;
              }
              ci++;
            }
            if (!closed) inRegex = true;
            continue;
          }
          if (n === "(") {
            openScope("(", at(li, ci), true);
            ci += 2;
            continue;
          }
          if (n === "{") {
            openScope("{", at(li, ci), false);
            ci += 2;
            continue;
          }
          if (n === "?") {
            ci += line[ci + 2] === "@" ? 3 : 2;
            continue;
          }
          if (n === "'" || n === "=" || n === "^") {
            ci += 2;
            continue;
          }
          if (n === ":") {
            ci += 2;
            continue;
          }
          ci += 1;
          continue;
        }

        if (ch === "(" || ch === "[" || ch === "{") {
          openScope(ch, at(li, ci), false);
          ci++;
          continue;
        }

        if (ch === ")" || ch === "]" || ch === "}") {
          if (stack.length > 1) {
            const sc = stack.pop();
            sc.end = at(li, ci);
            sc.closed = true;
          }
          ci++;
          continue;
        }

        if (ch === ":") {
          const s = ci;
          ci++;
          while (ci < line.length && /[a-zA-Z0-9_*+!?$%&=<>./'#-]/.test(line[ci]))
            ci++;
          addToken({
            t: "kw",
            s: at(li, s),
            e: at(li, ci),
            v: line.slice(s, ci),
            l: li + 1,
            c: s + 1,
          });
          continue;
        }

        if (/[0-9]/.test(ch)) {
          ci++;
          while (ci < line.length && /[0-9a-zA-Z.\/+]/.test(line[ci])) ci++;
          continue;
        }

        if (isSymStart(ch)) {
          const s = ci;
          ci++;
          while (ci < line.length && isSymChar(line[ci])) ci++;
          addToken({
            t: "sym",
            s: at(li, s),
            e: at(li, ci),
            v: line.slice(s, ci),
            l: li + 1,
            c: s + 1,
          });
          continue;
        }

        // Reader macros and stray characters.
        ci++;
      }
    }

    for (const sc of stack) sc.end = size;

    return { root, scopes, symbols, lineStart, at, size };
  }

  const headOf = (scope) => {
    if (!scope.items.length) return null;
    const first = scope.items[0];
    if (first && !first.isScope && (first.t === "sym" || first.t === "kw")) {
      return first.v;
    }
    return null;
  };

  const bare = (name) => {
    const slash = name.lastIndexOf("/");
    return slash >= 0 && slash < name.length - 1 ? name.slice(slash + 1) : name;
  };

  const firstVector = (scope) => {
    for (const item of scope.items) {
      if (item.isScope && item.open === "[") return item;
    }
    return null;
  };

  // Special forms / macros that introduce a binding vector.
  const BINDING_FORMS = new Set([
    "let",
    "let*",
    "loop",
    "loop*",
    "binding",
    "with-open",
    "for",
    "doseq",
    "dotimes",
    "when-let",
    "if-let",
    "when-some",
    "if-some",
    "when-first",
    "with-redefs",
    "with-local-vars",
    "with-bindings",
    "with-precision",
    "with-loading-context",
    "with-test",
    "with-out-str",
    "with-in-str",
  ]);
  const FN_FORMS = new Set(["fn", "fn*"]);
  // Definition forms that take a parameter vector (and so introduce locals).
  const FN_DEF_FORMS = new Set([
    "defn",
    "defn-",
    "defmacro",
    "defmacro-",
    "defmethod",
    "definline",
  ]);

  // Collects every binding introduced by `scope` into `decls`, mirroring
  // Clojure's destructuring rules closely enough that rename/definition agree
  // on which occurrences share a binding.
  function collectDeclarations(scopes) {
    const decls = [];
    const addName = (scope, tok) => {
      if (!tok || tok.isScope || tok.t !== "sym") return;
      const name = bare(tok.v);
      if (!name || name === "&") return;
      scope.names.add(name);
      decls.push({ start: tok.s, end: tok.e, scope, name, tok });
    };

    const bindItem = (item, target) => {
      if (!item) return;
      if (item.isScope) {
        if (item.open === "[") collectAll(item, target);
        else if (item.open === "{") collectMap(item, target);
        return;
      }
      addName(target, item);
    };

    function collectAll(vec, target) {
      for (const item of vec.items) {
        if (item.isScope) {
          if (item.open === "[") collectAll(item, target);
          else if (item.open === "{") collectMap(item, target);
          continue;
        }
        if (item.t !== "sym" || item.v === "&") continue;
        addName(target, item);
      }
    }

    function collectMap(map, target) {
      const items = map.items;
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.isScope || item.t !== "kw") continue;
        if (item.v === ":keys" || item.v === ":strs" || item.v === ":syms") {
          const v = items[i + 1];
          if (v && v.isScope && v.open === "[") {
            for (const e of v.items) {
              if (!e.isScope && e.t === "sym") addName(target, e);
            }
          }
        } else if (item.v === ":as") {
          const v = items[i + 1];
          if (v && !v.isScope && v.t === "sym") addName(target, v);
        }
      }
    }

    function collectBindings(vec, target) {
      const items = vec.items;
      for (let i = 0; i < items.length; i += 2) {
        const item = items[i];
        if (!item) break;
        if (!item.isScope && item.t === "kw") {
          if (item.v === ":let" || item.v === ":when-let" || item.v === ":while-let") {
            const v = items[i + 1];
            if (v && v.isScope && v.open === "[") collectBindings(v, target);
          }
          // :when/:while and other modifiers take a non-binding argument.
          continue;
        }
        if (!item.isScope && item.t === "sym" && item.v === "&") {
          bindItem(items[i + 1], target);
          continue;
        }
        bindItem(item, target);
      }
    }

    // Multi-arity definitions nest their parameter vectors in child lists.
    const registerArities = (scope) => {
      for (const item of scope.items) {
        if (!item.isScope || item.open !== "(") continue;
        const first = item.items[0];
        if (first && first.isScope && first.open === "[") collectAll(first, item);
      }
    };

    const walkAnon = (scope, target) => {
      for (const item of scope.items) {
        if (item.isScope) {
          if (!item.anon) walkAnon(item, target);
          continue;
        }
        if (item.t === "sym" && /^%(\d+)?$/.test(item.v)) addName(target, item);
      }
    };

    for (const sc of scopes) {
      if (sc.open !== "(" && sc.open !== "{" && sc.open !== "[") continue;
      if (sc.anon) {
        walkAnon(sc, sc);
        continue;
      }
      if (sc.open !== "(") continue;
      const head = headOf(sc);
      if (!head) continue;
      const name = bare(head);

      if (BINDING_FORMS.has(name)) {
        const vec = firstVector(sc);
        if (vec) collectBindings(vec, sc);
      } else if (FN_FORMS.has(name)) {
        const items = sc.items;
        const second = items[1];
        const third = items[2];
        if (
          second &&
          !second.isScope &&
          second.t === "sym" &&
          third &&
          third.isScope &&
          third.open === "["
        ) {
          addName(sc, second);
        }
        const vec = firstVector(sc);
        if (vec) collectAll(vec, sc);
        registerArities(sc);
      } else if (FN_DEF_FORMS.has(name)) {
        const vec = firstVector(sc);
        if (vec) collectAll(vec, sc);
        registerArities(sc);
      } else if (name === "letfn") {
        const vec = firstVector(sc);
        if (!vec) continue;
        for (const item of vec.items) {
          if (!item.isScope || item.open !== "(") continue;
          if (item.items[0] && !item.items[0].isScope) addName(sc, item.items[0]);
          const fvec = firstVector(item);
          if (fvec) collectAll(fvec, item);
        }
      } else if (name === "as->") {
        const items = sc.items;
        if (items[1] && !items[1].isScope && items[1].t === "sym") {
          addName(sc, items[1]);
        }
      }
    }

    return decls;
  }

  /* ================================================================
   HELPER: find user definitions
   ================================================================ */

  const SYM_RE = "[a-zA-Z_*+!?$%&=<>./-][\\w*+!?$%&=<>./'#-]*";
  const META_RE = "(?:\\^[^\\s()\\[\\]{}]+\\s+)*";

  function findUserDefs(model) {
    const defs = [];
    const lc = model.getLineCount();
    const fnRe = new RegExp(
      "\\(\\s*(defn-|defn|defmacro-|defmacro|definline)\\s+" +
        META_RE +
        "(" +
        SYM_RE +
        ")",
    );
    const typeRe = new RegExp(
      "\\(\\s*(defmulti|defmethod|defprotocol|definterface|defrecord|deftype)\\s+" +
        META_RE +
        "(" +
        SYM_RE +
        ")",
    );
    const varRe = new RegExp(
      "\\(\\s*(defonce|defvar|def)\\s+" + META_RE + "(" + SYM_RE + ")",
    );
    const declareRe = new RegExp(
      "\\(\\s*declare\\s+" + META_RE + "(" + SYM_RE + ")",
    );
    const nsRe = new RegExp("\\(\\s*ns\\s+" + META_RE + "(" + SYM_RE + ")");

    for (let i = 1; i <= lc; i++) {
      const line = model.getLineContent(i);
      let m = line.match(fnRe);
      if (m) {
        const kind =
          m[1] === "defmacro" || m[1] === "defmacro-"
            ? "macro"
            : m[1] === "definline"
              ? "inline"
              : "function";
        const col = line.indexOf(m[2], m.index) + 1;
        defs.push({ name: m[2], line: i, col, kind, form: m[1] });
        continue;
      }
      m = line.match(typeRe);
      if (m) {
        const kinds = {
          defmulti: "function",
          defmethod: "method",
          defprotocol: "interface",
          definterface: "interface",
          defrecord: "record",
          deftype: "type",
        };
        const col = line.indexOf(m[2], m.index) + 1;
        defs.push({
          name: m[2],
          line: i,
          col,
          kind: kinds[m[1]],
          form: m[1],
        });
        continue;
      }
      m = line.match(nsRe);
      if (m) {
        const col = line.indexOf(m[1], m.index) + 1;
        defs.push({ name: m[1], line: i, col, kind: "namespace", form: "ns" });
        continue;
      }
      m = line.match(varRe);
      if (m) {
        const col = line.indexOf(m[2], m.index) + 1;
        defs.push({
          name: m[2],
          line: i,
          col,
          kind: "variable",
          form: m[1],
        });
        continue;
      }
      m = line.match(declareRe);
      if (m) {
        const col = line.indexOf(m[1], m.index) + 1;
        defs.push({
          name: m[1],
          line: i,
          col,
          kind: "variable",
          form: "declare",
        });
      }
    }
    return defs;
  }

  function getWordAt(model, position) {
    const wp = model.getWordAtPosition(position);
    if (wp) return wp.word;
    const line = model.getLineContent(position.lineNumber);
    const col = position.column - 1;
    const ch = line[col];
    if (!ch) return null;
    if (!/[a-zA-Z0-9_*+!?$%&=<>./'#-]/.test(ch)) return null;
    let s = col;
    let e = col;
    while (s > 0 && /[a-zA-Z0-9_*+!?$%&=<>./'#-]/.test(line[s - 1])) s--;
    while (e < line.length - 1 && /[a-zA-Z0-9_*+!?$%&=<>./'#-]/.test(line[e + 1]))
      e++;
    return line.substring(s, e + 1);
  }

  /* ================================================================
   BINDING RESOLUTION (shared by definition / reference / rename)
   ================================================================ */

  // Resolves the symbol under the cursor to its binding: every occurrence bound
  // to it plus the occurrence that declares it. Symbols with no lexical binding
  // (globals, core functions) report `local: false` so callers fall back to
  // document-wide handling.
  function resolveBinding(model, position) {
    const built = buildScopes(model);

    const wordInfo = model.getWordAtPosition(position);
    let name;
    let cursorStart;
    let cursorEnd;
    if (wordInfo) {
      name = wordInfo.word;
      cursorStart = built.at(position.lineNumber - 1, wordInfo.startColumn - 1);
      cursorEnd = built.at(position.lineNumber - 1, wordInfo.endColumn - 1);
    } else {
      const line = model.getLineContent(position.lineNumber);
      const col = position.column - 1;
      const ch = line[col];
      if (!ch) return null;
      let s = col;
      let e = col;
      while (s > 0 && /[a-zA-Z0-9_*+!?$%&=<>./'#-]/.test(line[s - 1])) s--;
      while (e < line.length - 1 && /[a-zA-Z0-9_*+!?$%&=<>./'#-]/.test(line[e + 1])) e++;
      name = line.substring(s, e + 1);
      cursorStart = built.at(position.lineNumber - 1, s);
      cursorEnd = built.at(position.lineNumber - 1, e + 1);
    }
    if (!name) return null;

    const scopes = built.scopes;
    const decls = collectDeclarations(scopes);

    const narrower = (a, b) => {
      if (!a) return b;
      if (!b) return a;
      if (b.start > a.start) return b;
      if (b.start === a.start && b.end < a.end) return b;
      return a;
    };

    const declaring = (offset) => {
      let found;
      for (const sc of scopes) {
        if (sc.start <= offset && offset <= sc.end && sc.names.has(name)) {
          found = narrower(found, sc);
        }
      }
      return found;
    };

    const resolve = (start, end) => {
      for (const d of decls) {
        if (d.start <= start && end <= d.end) return d.scope;
      }
      return declaring(start);
    };

    const cursorScope = resolve(cursorStart, cursorEnd);
    const targetStart = cursorScope ? cursorScope.start : -1;

    // Document-wide occurrences of a global; scope-restricted for locals.
    const occurrences = [];
    let declarationRange = null;
    const decl =
      targetStart === -1
        ? undefined
        : decls.find((d) => d.scope.start === targetStart && d.name === name);

    for (const tok of built.symbols) {
      if (tok.v !== name) continue;
      const scope = resolve(tok.s, tok.e);
      if ((scope ? scope.start : -1) !== targetStart) continue;
      const range = {
        line: tok.l,
        startColumn: tok.c,
        endColumn: tok.c + tok.v.length,
      };
      occurrences.push(range);
      if (decl && tok.s === decl.tok.s && tok.e === decl.tok.e) {
        declarationRange = range;
      }
    }

    return {
      name,
      local: targetStart !== -1,
      declaration: declarationRange,
      occurrences,
    };
  }

  /* ================================================================
   COMPLETION PROVIDER
   ================================================================ */

  monaco.languages.registerCompletionItemProvider(LANG, {
    triggerCharacters: ["(", "[", ":", "/"],
    provideCompletionItems: function (model, position) {
      const wordInfo = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: wordInfo.startColumn,
        endColumn: wordInfo.endColumn,
      };

      const S = monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet;
      const K = monaco.languages.CompletionItemKind;
      const suggestions = [];

      const snippets = [
        {
          label: "ns (require)",
          detail: "Namespace declaration",
          insert:
            "(ns ${1:app.core}\n  (:require [${2:clojure.string :as str}]))",
          doc: "(ns app.core (:require [clojure.string :as str]))",
        },
        {
          label: "defn",
          detail: "Define a function",
          insert:
            '(defn ${1:name}\n  "${2:docstring}"\n  [${3:args}]\n  ${4:body})',
          doc: "(defn name [args] body)",
        },
        {
          label: "defn-",
          detail: "Define a private function",
          insert: "(defn- ${1:name} [${2:args}]\n  ${3:body})",
          doc: "(defn- name [args] body)",
        },
        {
          label: "def",
          detail: "Define a value",
          insert: "(def ${1:name} ${2:value})",
          doc: "(def name value)",
        },
        {
          label: "defonce",
          detail: "Define a value once",
          insert: "(defonce ${1:name} ${2:value})",
          doc: "(defonce name value)",
        },
        {
          label: "defmacro",
          detail: "Define a macro",
          insert:
            "(defmacro ${1:name} [${2:args}]\n  `(${3:expansion}))",
          doc: "(defmacro name [args] `(expansion))",
        },
        {
          label: "fn",
          detail: "Anonymous function",
          insert: "(fn [${1:args}]\n  ${2:body})",
          doc: "(fn [args] body)",
        },
        {
          label: "let",
          detail: "Local bindings",
          insert: "(let [${1:name} ${2:value}]\n  ${3:body})",
          doc: "(let [name value] body)",
        },
        {
          label: "if-let",
          detail: "Bind and test",
          insert: "(if-let [${1:name} ${2:value}]\n  ${3:then}\n  ${4:else})",
          doc: "(if-let [name value] then else)",
        },
        {
          label: "when-let",
          detail: "Bind and run when truthy",
          insert: "(when-let [${1:name} ${2:value}]\n  ${3:body})",
          doc: "(when-let [name value] body)",
        },
        {
          label: "when",
          detail: "Conditional block",
          insert: "(when ${1:test}\n  ${2:body})",
          doc: "(when test body)",
        },
        {
          label: "cond",
          detail: "Multi-way conditional",
          insert: "(cond\n  ${1:test1} ${2:expr1}\n  :else ${3:default})",
          doc: "(cond test1 expr1 :else default)",
        },
        {
          label: "case",
          detail: "Constant dispatch",
          insert:
            "(case ${1:expr}\n  ${2:value1} ${3:result1}\n  ${4:default})",
          doc: "(case expr value1 result1 default)",
        },
        {
          label: "condp",
          detail: "Predicate dispatch",
          insert:
            "(condp ${1:=} ${2:expr}\n  ${3:value1} ${4:result1}\n  ${5:default})",
          doc: "(condp = expr value1 result1 default)",
        },
        {
          label: "->",
          detail: "Thread-first macro",
          insert: "(-> ${1:x}\n    ${2:form})",
          doc: "(-> x form)",
        },
        {
          label: "->>",
          detail: "Thread-last macro",
          insert: "(->> ${1:coll}\n     (${2:map} ${3:f}))",
          doc: "(->> coll (map f))",
        },
        {
          label: "doto",
          detail: "Interop side effects",
          insert: "(doto ${1:obj}\n  (${2:.method}))",
          doc: "(doto obj (.method))",
        },
        {
          label: "loop / recur",
          detail: "Iteration",
          insert:
            "(loop [${1:i} ${2:0}]\n  (when (${3:<} ${1:i} ${4:10})\n    ${5:body}\n    (recur (inc ${1:i}))))",
          doc: "(loop [i 0] (when (< i 10) body (recur (inc i))))",
        },
        {
          label: "for",
          detail: "List comprehension",
          insert: "(for [${1:x} ${2:coll}]\n  ${3:body})",
          doc: "(for [x coll] body)",
        },
        {
          label: "doseq",
          detail: "Iterate for side effects",
          insert: "(doseq [${1:x} ${2:coll}]\n  ${3:body})",
          doc: "(doseq [x coll] body)",
        },
        {
          label: "try / catch",
          detail: "Exception handling",
          insert:
            "(try\n  ${1:body}\n  (catch ${2:js/Error} ${3:e}\n    ${4:handle}))",
          doc: "(try body (catch js/Error e handle))",
        },
        {
          label: "defrecord",
          detail: "Define a record type",
          insert:
            "(defrecord ${1:Name} [${2:fields}]\n  ${3:Protocol}\n  (${4:method} [this] ${5:body}))",
          doc: "(defrecord Name [fields] Protocol (method [this] body))",
        },
        {
          label: "deftype",
          detail: "Define a type",
          insert:
            "(deftype ${1:Name} [${2:fields}]\n  ${3:Protocol}\n  (${4:method} [this] ${5:body}))",
          doc: "(deftype Name [fields] Protocol (method [this] body))",
        },
        {
          label: "defprotocol",
          detail: "Define a protocol",
          insert: "(defprotocol ${1:Name}\n  (${2:method} [this] ${3:args}))",
          doc: "(defprotocol Name (method [this] args))",
        },
        {
          label: "defmulti",
          detail: "Define a multimethod",
          insert: "(defmulti ${1:name} ${2:dispatch-fn})",
          doc: "(defmulti name dispatch-fn)",
        },
        {
          label: "defmethod",
          detail: "Implement a multimethod",
          insert:
            "(defmethod ${1:name} ${2:dispatch-value}\n  [${3:args}]\n  ${4:body})",
          doc: "(defmethod name dispatch-value [args] body)",
        },
        {
          label: "atom / swap!",
          detail: "Mutable state",
          insert: "(def ${1:state} (atom ${2:initial}))",
          doc: "(def state (atom initial))",
        },
        {
          label: "comment",
          detail: "Comment out forms",
          insert: "(comment\n  ${1:body})",
          doc: "(comment body)",
        },
        {
          label: "js interop",
          detail: "Call a JavaScript method",
          insert: "(.${1:method} ${2:obj} ${3:args})",
          doc: "(.method obj args)",
        },
      ];

      for (const sn of snippets) {
        suggestions.push({
          label: sn.label,
          kind: K.Snippet,
          insertText: sn.insert,
          insertTextRules: S,
          detail: "Snippet: " + sn.detail,
          documentation: { value: "```clojure\n" + sn.doc + "\n```" },
          range: range,
          sortText: "0_" + sn.label,
        });
      }

      for (const kw of ALL_KEYWORDS) {
        const doc = DOCS[kw];
        suggestions.push({
          label: kw,
          kind: K.Keyword,
          insertText: kw,
          detail: kw.startsWith("def") ? "definition" : "special form / macro",
          documentation: doc
            ? { value: "```clojure\n" + doc.s + "\n```\n" + doc.d }
            : undefined,
          range: range,
          sortText: "1_" + kw,
        });
      }

      for (const fn of CORE) {
        if (ALL_KEYWORDS.includes(fn)) continue;
        const doc = DOCS[fn];
        suggestions.push({
          label: fn,
          kind: K.Function,
          insertText: fn,
          detail: "cljs.core",
          documentation: doc
            ? { value: "```clojure\n" + doc.s + "\n```\n" + doc.d }
            : undefined,
          range: range,
          sortText: "2_" + fn,
        });
      }

      for (const g of GLOBALS) {
        const doc = DOCS[g];
        suggestions.push({
          label: g,
          kind: K.Constant,
          insertText: g,
          detail: "global",
          documentation: doc
            ? { value: "```clojure\n" + doc.s + "\n```\n" + doc.d }
            : undefined,
          range: range,
          sortText: "3_" + g,
        });
      }

      const userDefs = findUserDefs(model);
      const seen = new Set([...ALL_KEYWORDS, ...CORE, ...GLOBALS]);
      for (const def of userDefs) {
        if (seen.has(def.name)) continue;
        seen.add(def.name);
        suggestions.push({
          label: def.name,
          kind:
            def.kind === "function"
              ? K.Function
              : def.kind === "macro"
                ? K.Module
                : def.kind === "namespace"
                  ? K.Module
                  : def.kind === "record" || def.kind === "type"
                    ? K.Class
                    : K.Variable,
          insertText: def.name,
          detail: "user-defined " + def.kind,
          range: range,
          sortText: "4_" + def.name,
        });
      }

      return { suggestions: suggestions };
    },
  });

  /* ================================================================
   HOVER PROVIDER
   ================================================================ */

  monaco.languages.registerHoverProvider(LANG, {
    provideHover: function (model, position) {
      const word = getWordAt(model, position);
      if (!word) return null;

      const wp = model.getWordAtPosition(position);
      const hoverRange = wp
        ? new monaco.Range(
            position.lineNumber,
            wp.startColumn,
            position.lineNumber,
            wp.endColumn,
          )
        : undefined;

      const doc = DOCS[word];
      if (doc) {
        const parts = [
          { value: "```clojure\n" + doc.s + "\n```" },
          { value: doc.d },
        ];
        if (doc.e)
          parts.push({ value: "**Example:**\n```clojure\n" + doc.e + "\n```" });
        return { range: hoverRange, contents: parts };
      }

      const userDefs = findUserDefs(model);
      for (const def of userDefs) {
        if (def.name !== word) continue;
        const defLine = model.getLineContent(def.line).trim();
        return {
          range: hoverRange,
          contents: [
            { value: "```clojure\n" + defLine + "\n```" },
            {
              value:
                "User-defined " + def.kind + " — *line " + def.line + "*",
            },
          ],
        };
      }

      return null;
    },
  });

  /* ================================================================
   DEFINITION PROVIDER
   ================================================================ */

  monaco.languages.registerDefinitionProvider(LANG, {
    provideDefinition: function (model, position) {
      // A lexically-bound local resolves to its own declaration rather than the
      // first same-named definition in the document.
      const binding = resolveBinding(model, position);
      if (binding && binding.local) {
        if (!binding.declaration) return null;
        const d = binding.declaration;
        return {
          uri: model.uri,
          range: new monaco.Range(d.line, d.startColumn, d.line, d.endColumn),
        };
      }

      const word = getWordAt(model, position);
      if (!word) return null;
      const results = [];
      for (const def of findUserDefs(model)) {
        if (def.name === word) {
          results.push({
            uri: model.uri,
            range: new monaco.Range(
              def.line,
              def.col,
              def.line,
              def.col + def.name.length,
            ),
          });
        }
      }
      return results.length ? results : null;
    },
  });

  /* ================================================================
   DOCUMENT SYMBOL PROVIDER  (Outline / Breadcrumbs)
   ================================================================ */

  const SYMBOL_KIND = (kind) => {
    const K = monaco.languages.SymbolKind;
    switch (kind) {
      case "function":
        return K.Function;
      case "method":
        return K.Method;
      case "macro":
        return K.Module;
      case "namespace":
        return K.Namespace;
      case "interface":
        return K.Interface;
      case "record":
      case "type":
        return K.Class;
      case "inline":
        return K.Function;
      default:
        return K.Variable;
    }
  };

  monaco.languages.registerDocumentSymbolProvider(LANG, {
    provideDocumentSymbols: function (model) {
      const defs = findUserDefs(model);
      return defs.map(function (def, index) {
        // The symbol extends to the line before the next definition.
        const next = defs[index + 1];
        const endLine = next ? Math.max(def.line, next.line - 1) : def.line;
        return {
          name: def.name,
          detail: def.kind,
          kind: SYMBOL_KIND(def.kind),
          range: new monaco.Range(
            def.line,
            1,
            endLine,
            model.getLineContent(endLine).length + 1,
          ),
          selectionRange: new monaco.Range(
            def.line,
            def.col,
            def.line,
            def.col + def.name.length,
          ),
        };
      });
    },
  });

  /* ================================================================
   REFERENCE PROVIDER  (Shift+F12)
   ================================================================ */

  monaco.languages.registerReferenceProvider(LANG, {
    provideReferences: function (model, position, context) {
      const binding = resolveBinding(model, position);
      if (!binding) return null;
      const includeDeclaration = !context || context.includeDeclaration !== false;
      const results = [];
      for (const r of binding.occurrences) {
        const isDeclaration =
          binding.declaration &&
          binding.declaration.line === r.line &&
          binding.declaration.startColumn === r.startColumn;
        if (isDeclaration && !includeDeclaration) continue;
        results.push({
          uri: model.uri,
          range: new monaco.Range(r.line, r.startColumn, r.line, r.endColumn),
        });
      }
      return results;
    },
  });

  /* ================================================================
   DOCUMENT HIGHLIGHT PROVIDER
   ================================================================ */

  monaco.languages.registerDocumentHighlightProvider(LANG, {
    provideDocumentHighlights: function (model, position) {
      const binding = resolveBinding(model, position);
      if (!binding || !binding.occurrences.length) return null;
      const K = monaco.languages.DocumentHighlightKind;
      return binding.occurrences.map((r) => {
        const isDeclaration =
          binding.declaration &&
          binding.declaration.line === r.line &&
          binding.declaration.startColumn === r.startColumn;
        return {
          range: new monaco.Range(r.line, r.startColumn, r.line, r.endColumn),
          kind: isDeclaration ? K.Write : K.Read,
        };
      });
    },
  });

  /* ================================================================
   SIGNATURE HELP PROVIDER
   ================================================================ */

  monaco.languages.registerSignatureHelpProvider(LANG, {
    signatureHelpTriggerCharacters: ["(", " "],
    provideSignatureHelp: function (model, position) {
      const textUntil = model.getValueInRange({
        startLineNumber: Math.max(1, position.lineNumber - 10),
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });

      // Find the innermost open paren and the symbol immediately after it.
      // Closing brackets on the way back belong to nested forms; an opening
      // bracket at depth zero is the enclosing form — only a `(` is a call.
      let depth = 0;
      let funcStart = -1;
      for (let i = textUntil.length - 1; i >= 0; i--) {
        const ch = textUntil[i];
        if (ch === ")" || ch === "]" || ch === "}") {
          depth++;
        } else if (ch === "(" || ch === "[" || ch === "{") {
          if (depth > 0) {
            depth--;
          } else if (ch === "(") {
            funcStart = i + 1;
            break;
          }
        }
      }
      if (funcStart < 0) return null;

      const rest = textUntil.substring(funcStart).trim();
      const funcMatch = rest.match(
        /^([a-zA-Z_*+!?$%&=<>./-][\w*+!?$%&=<>./'#-]*)/,
      );
      if (!funcMatch) return null;
      const funcName = funcMatch[1];

      let label;
      let documentation;
      const doc = DOCS[funcName];
      if (doc) {
        label = doc.s.split("\n")[0];
        documentation = { value: doc.d };
      } else {
        const def = findUserDefs(model).find((d) => d.name === funcName);
        if (!def) return null;
        const params = getDefParams(model, def);
        label = "(" + funcName + (params ? " " + params : "") + ")";
        documentation = { value: "User-defined " + def.kind };
      }

      const afterFunc = rest.substring(funcMatch[0].length);
      let argIdx = 0;
      let d = 0;
      for (let i = 0; i < afterFunc.length; i++) {
        const c = afterFunc[i];
        if (c === "(" || c === "[" || c === "{") d++;
        else if (c === ")" || c === "]" || c === "}") d--;
        else if (/\s/.test(c) && d === 0 && /\S/.test(afterFunc[i - 1] || ""))
          argIdx++;
      }

      return {
        value: {
          signatures: [
            {
              label: label,
              documentation: documentation,
              parameters: [],
            },
          ],
          activeSignature: 0,
          activeParameter: argIdx,
        },
        dispose: function () {},
      };
    },
  });

  // Extracts the parameter vector text of a user definition, used for signature
  // help. Scans forward from the definition line for the first balanced `[...]`.
  function getDefParams(model, def) {
    const startLine = def.line;
    const endLine = Math.min(model.getLineCount(), startLine + 20);
    let depth = 0;
    let collected = "";
    let started = false;
    for (let i = startLine; i <= endLine; i++) {
      const line = model.getLineContent(i);
      for (let c = 0; c < line.length; c++) {
        const ch = line[c];
        if (!started) {
          if (ch === "[") {
            started = true;
            depth = 1;
            collected = "[";
          }
          continue;
        }
        collected += ch;
        if (ch === "[") depth++;
        else if (ch === "]") {
          depth--;
          if (depth === 0) return collected;
        }
      }
      if (started) collected += " ";
    }
    return started ? collected : "";
  }

  /* ================================================================
   FOLDING RANGE PROVIDER
   ================================================================ */

  monaco.languages.registerFoldingRangeProvider(LANG, {
    provideFoldingRanges: function (model) {
      const ranges = [];
      const built = buildScopes(model);

      // Fold every bracketed form that spans more than one line.
      for (const sc of built.scopes) {
        if (sc === built.root || !sc.open) continue;
        const start = model.getPositionAt(sc.start).lineNumber;
        const end = model.getPositionAt(Math.max(sc.start, sc.end)).lineNumber;
        if (end > start) {
          ranges.push({
            start: start,
            end: end,
            kind: monaco.languages.FoldingRangeKind.Region,
          });
        }
      }

      // Fold runs of consecutive `;` line comments.
      const lines = model.getLinesContent();
      let commentStart = -1;
      for (let i = 0; i <= lines.length; i++) {
        const isComment = i < lines.length && /^\s*;/.test(lines[i]);
        if (isComment && commentStart === -1) {
          commentStart = i;
        } else if (!isComment && commentStart !== -1) {
          if (i - 1 > commentStart) {
            ranges.push({
              start: commentStart + 1,
              end: i,
              kind: monaco.languages.FoldingRangeKind.Comment,
            });
          }
          commentStart = -1;
        }
      }

      return ranges;
    },
  });

  /* ================================================================
   RENAME PROVIDER
   ================================================================ */

  monaco.languages.registerRenameProvider(LANG, {
    provideRenameEdits: function (model, position, newName) {
      const binding = resolveBinding(model, position);
      if (!binding || !binding.occurrences.length) return null;
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
