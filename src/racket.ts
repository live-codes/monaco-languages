import type * as Monaco from "monaco-editor";

export default (monaco: typeof Monaco) => {
  const LANG = "racket";

  /* ================================================================
   DATA
   ================================================================ */

  // Special forms and core syntactic forms / macros.
  const SPECIAL_FORMS = [
    // definitions
    "define",
    "define-values",
    "define-values-for-syntax",
    "define-syntax",
    "define-syntaxes",
    "define-syntax-rule",
    "define-for-syntax",
    "define-runtime-path",
    "define/contract",
    "define/match",
    "define/public",
    "define/private",
    "define/override",
    "define/augment",
    "define/augment-final",
    "define/override-final",
    "define/final",
    "define/abstract",
    "define/member",
    "define-unit",
    "define-signature",
    "define-simple-macro",
    "define-syntax-parse-rule",
    "define-syntax-class",
    "define-lambda",
    "define-struct",
    "define-struct/contract",
    "define-member",
    "define-serializable-class",
    "define-serializable-class*",
    // functions
    "lambda",
    "λ",
    "case-lambda",
    "opt-lambda",
    "let/cc",
    "let/ec",
    // binding
    "let",
    "let*",
    "letrec",
    "let-values",
    "let*-values",
    "letrec-values",
    "let-syntax",
    "letrec-syntax",
    "let-syntaxes",
    "letrec-syntaxes",
    "letrec-syntaxes+values",
    "with-syntax",
    "with-syntax*",
    "local",
    "shared",
    // control
    "if",
    "cond",
    "case",
    "when",
    "unless",
    "and",
    "or",
    "begin",
    "begin0",
    "begin-for-syntax",
    "set!",
    "set!-values",
    "quote",
    "quasiquote",
    "unquote",
    "unquote-splicing",
    "quote-syntax",
    "syntax",
    "quasisyntax",
    "unsyntax",
    "unsyntax-splicing",
    "syntax-rules",
    "syntax-case",
    "syntax-case*",
    "syntax-parse",
    "syntax-parser",
    "syntax-id-rule",
    "with-continuation-mark",
    "parameterize",
    "parameterize*",
    "with-handlers",
    "with-handlers*",
    "call-with-values",
    "call-with-current-continuation",
    "call/cc",
    "dynamic-wind",
    "do",
    "delay",
    "delay/sync",
    "delay/thread",
    "delay/name",
    "guard",
    // modules
    "require",
    "provide",
    "module",
    "module*",
    "module+",
    "module++",
    "#%module-begin",
    "#%plain-module-begin",
    "#%require",
    "#%provide",
    "#%top",
    "#%app",
    "#%plain-app",
    "#%datum",
    "#%expression",
    "#%declare",
    "#%variable-reference",
    "include",
    "include-at/relative-to",
    "include/reader",
    "include/at",
    "include/lexical-context",
    // iteration
    "for",
    "for/list",
    "for/vector",
    "for/hash",
    "for/hasheq",
    "for/hasheqv",
    "for/and",
    "for/or",
    "for/sum",
    "for/product",
    "for/first",
    "for/last",
    "for/fold",
    "for/foldr",
    "for/lists",
    "for*",
    "for*/list",
    "for*/vector",
    "for*/hash",
    "for*/hasheq",
    "for*/hasheqv",
    "for*/and",
    "for*/or",
    "for*/sum",
    "for*/product",
    "for*/first",
    "for*/last",
    "for*/fold",
    "for*/lists",
    "for/lists:",
    "for-label",
    "for-template",
    "for-syntax",
    "for-meta",
    "for/fold/derived",
    // pattern matching
    "match",
    "match*",
    "match-lambda",
    "match-lambda*",
    "match-let",
    "match-let*",
    "match-letrec",
    "match-define",
    "match-define-values",
    // structs & classes
    "struct",
    "struct*",
    "class",
    "class*",
    "class/derived",
    "mixin",
    "interface",
    "unit",
    "import",
    "export",
    "link",
    "compound-unit",
    "compound-unit/sig",
    "invoke-unit",
    "invoke-unit/infer",
    "new",
    "instantiate",
    "send",
    "send/apply",
    "send*",
    "send+",
    "super-new",
    "this%",
    "object-contract",
    "contract-out",
    "provide/contract",
    "else",
    "=>",
  ];

  // Core library functions.
  const CORE = [
    // arithmetic
    "+",
    "-",
    "*",
    "/",
    "add1",
    "sub1",
    "abs",
    "max",
    "min",
    "quotient",
    "remainder",
    "modulo",
    "gcd",
    "lcm",
    "expt",
    "exp",
    "log",
    "sqrt",
    "sin",
    "cos",
    "tan",
    "asin",
    "acos",
    "atan",
    "floor",
    "ceiling",
    "round",
    "truncate",
    "numerator",
    "denominator",
    "exact->inexact",
    "inexact->exact",
    "exact",
    "inexact",
    "exact-integer?",
    "exact-nonnegative-integer?",
    "sgn",
    "squared",
    "conjugate",
    "magnitude",
    "angle",
    "real-part",
    "imag-part",
    "make-rectangular",
    "make-polar",
    "random",
    "random-seed",
    // comparison & predicates
    "=",
    "<",
    ">",
    "<=",
    ">=",
    "eq?",
    "eqv?",
    "equal?",
    "equal-always?",
    "not",
    "zero?",
    "positive?",
    "negative?",
    "even?",
    "odd?",
    "number?",
    "integer?",
    "rational?",
    "real?",
    "complex?",
    "exact-integer?",
    "nan?",
    "infinite?",
    "boolean?",
    "boolean=?",
    "symbol?",
    "symbol=?",
    "string?",
    "char?",
    "bytes?",
    "list?",
    "pair?",
    "null?",
    "empty?",
    "cons?",
    "vector?",
    "hash?",
    "box?",
    "procedure?",
    "struct?",
    "sequence?",
    "set?",
    "void?",
    "path?",
    "path-string?",
    "regexp?",
    "pregexp?",
    "port?",
    "input-port?",
    "output-port?",
    "eof-object?",
    "immutable?",
    "stream?",
    // lists
    "cons",
    "car",
    "cdr",
    "caar",
    "cadr",
    "cdar",
    "cddr",
    "caddr",
    "cdddr",
    "cadddr",
    "list",
    "list*",
    "cons*",
    "make-list",
    "build-list",
    "range",
    "length",
    "list-ref",
    "list-tail",
    "first",
    "second",
    "third",
    "fourth",
    "fifth",
    "sixth",
    "seventh",
    "eighth",
    "ninth",
    "tenth",
    "last",
    "rest",
    "append",
    "append*",
    "append-map",
    "reverse",
    "member",
    "memq",
    "memv",
    "assoc",
    "assq",
    "assv",
    "remove",
    "remove*",
    "remove-duplicates",
    "partition",
    "sort",
    "sort!",
    "shuffle",
    "argmin",
    "argmax",
    "flatten",
    "filter",
    "filter-map",
    "filter-not",
    "map",
    "mapcat",
    "andmap",
    "ormap",
    "for-each",
    "foldl",
    "foldr",
    "fold",
    "reduce",
    "apply",
    "count",
    "group-by",
    "combinations",
    "permutations",
    "cartesian-product",
    "list->vector",
    "list->string",
    "list->set",
    "index-of",
    "check-duplicates",
    // vectors
    "vector",
    "make-vector",
    "build-vector",
    "vector-ref",
    "vector-set!",
    "vector-length",
    "vector->list",
    "vector-fill!",
    "vector-copy",
    "vector-copy!",
    "vector-append",
    "vector-map",
    "vector-map!",
    "vector-for-each",
    "vector-sort",
    "vector-sort!",
    "vector->immutable-vector",
    "vector-immutable",
    // strings
    "string",
    "make-string",
    "build-string",
    "string-length",
    "string-ref",
    "substring",
    "string-append",
    "string-join",
    "string-split",
    "string-copy",
    "string-copy!",
    "string-fill!",
    "string->list",
    "string->symbol",
    "string->number",
    "string->immutable-string",
    "string->bytes/utf-8",
    "string-upcase",
    "string-downcase",
    "string-titlecase",
    "string-foldcase",
    "string-trim",
    "string-normalize-space",
    "string-replace",
    "string-contains?",
    "string-prefix?",
    "string-suffix?",
    "string=?",
    "string<?",
    "string>?",
    "string<=?",
    "string>=?",
    "string-ci=?",
    "string-ci<?",
    "number->string",
    "symbol->string",
    "format",
    "~a",
    "~s",
    "~v",
    "~e",
    "~r",
    "~n",
    "printf",
    "fprintf",
    "eprintf",
    "display",
    "displayln",
    "print",
    "println",
    "write",
    "writeln",
    "pretty-print",
    "pretty-format",
    // chars & bytes
    "char->integer",
    "integer->char",
    "char-upcase",
    "char-downcase",
    "char-alphabetic?",
    "char-numeric?",
    "char-whitespace?",
    "char-upper-case?",
    "char-lower-case?",
    "char=?",
    "bytes",
    "make-bytes",
    "bytes-length",
    "bytes-ref",
    "bytes-append",
    "bytes->string/utf-8",
    "bytes->list",
    "list->bytes",
    // hashes
    "hash",
    "hasheq",
    "hasheqv",
    "hash-ref",
    "hash-ref!",
    "hash-set",
    "hash-set!",
    "hash-remove",
    "hash-remove!",
    "hash-update",
    "hash-update!",
    "hash-has-key?",
    "hash-keys",
    "hash-values",
    "hash-count",
    "hash-map",
    "hash-for-each",
    "hash->list",
    "list->hash",
    "hash-keys-subset?",
    // boxes & parameters
    "box",
    "box-immutable",
    "unbox",
    "set-box!",
    "make-parameter",
    "make-derived-parameter",
    // functional helpers
    "identity",
    "const",
    "compose",
    "compose1",
    "curry",
    "curryr",
    "negate",
    "thunk",
    "conjoin",
    "disjoin",
    "sequence->list",
    "sequence-length",
    "sequence-ref",
    "sequence-map",
    "sequence-for-each",
    // sequences / iterators
    "in-range",
    "in-list",
    "in-vector",
    "in-string",
    "in-bytes",
    "in-hash",
    "in-hash-keys",
    "in-hash-values",
    "in-hash-pairs",
    "in-indexed",
    "in-naturals",
    "in-parallel",
    "in-cycle",
    "in-value",
    "in-producer",
    "in-directory",
    "in-port",
    // regexp
    "regexp",
    "pregexp",
    "regexp-match",
    "regexp-match?",
    "regexp-match*",
    "regexp-replace",
    "regexp-replace*",
    "regexp-split",
    "regexp-quote",
    // errors
    "error",
    "raise",
    "raise-argument-error",
    "raise-arguments-error",
    "raise-range-error",
    "raise-result-error",
    "raise-user-error",
    "raise-type-error",
    "exn",
    "exn?",
    "exn-message",
    "exn->string",
    "exn:fail?",
    "exn:fail:contract?",
    "error-message->string",
    "with-handlers",
    // io
    "read",
    "read-line",
    "read-string",
    "read-bytes",
    "read-char",
    "peek-char",
    "write-char",
    "newline",
    "print-error-message",
    "flush-output",
    "open-input-file",
    "open-output-file",
    "open-input-string",
    "open-output-string",
    "get-output-string",
    "get-output-bytes",
    "close-input-port",
    "close-output-port",
    "call-with-input-file",
    "call-with-output-file",
    "with-input-from-file",
    "with-output-to-file",
    "file->string",
    "file->bytes",
    "string->file",
    "file-exists?",
    "delete-file",
    "rename-file-or-directory",
    "copy-file",
    "directory-list",
    "make-directory",
    "make-directory*",
    "current-directory",
    "current-input-port",
    "current-output-port",
    "current-error-port",
    // system
    "system-type",
    "system-language+country",
    "getenv",
    "putenv",
    "current-seconds",
    "current-inexact-milliseconds",
    "current-process-milliseconds",
    "current-milliseconds",
    "sleep",
    "exit",
    "executable-yield-handler",
    // namespaces & eval
    "eval",
    "eval-syntax",
    "expand",
    "expand-syntax",
    "macroexpand",
    "macroexpand-all",
    "compile",
    "compile-syntax",
    "namespace",
    "make-base-namespace",
    "make-empty-namespace",
    "current-namespace",
    "namespace-require",
    "namespace-variable-value",
    "module->exports",
    "module->imports",
    "dynamic-require",
    "dynamic-require-for-syntax",
    "module-declared?",
    "syntax->datum",
    "datum->syntax",
    "syntax->list",
    "syntax-e",
    "syntax?",
    "identifier?",
    "free-identifier=?",
    "bound-identifier=?",
    "generate-temporaries",
    "gensym",
    // misc
    "void",
    "values",
    "call-with-values",
    "dynamic-wind",
    "current-continuation-marks",
    "continuation-mark-set->list",
    "object-name",
    "current-print",
    "current-read-interaction",
    "port->string",
    "port->lines",
    "port->bytes",
    "call-with-input-string",
    "call-with-output-string",
    "call-with-input-bytes",
    "call-with-output-bytes",
  ];

  // Literal constants.
  const CONSTANTS = ["#t", "#f", "#true", "#false"];

  const ALL_FORMS = [...SPECIAL_FORMS];

  /* ================================================================
   DOCUMENTATION
   ================================================================ */

  const DOCS = {
    // === Definitions ===
    define: {
      s: "(define name value)\n(define (name args ...) body ...)",
      d: "Define a value or function. Internal definitions are scoped to the enclosing body.",
      e: "(define answer 42)\n(define (square x) (* x x))",
    },
    "define-values": {
      s: "(define-values (id ...) expr)",
      d: "Define multiple values from a single expression, binding each identifier.",
      e: "(define-values (q r) (quotient/remainder 17 5))",
    },
    "define-syntax": {
      s: "(define-syntax name transformer-expr)",
      d: "Define a macro whose transformer is the result of evaluating the expression.",
      e: "(define-syntax swap!\n  (syntax-rules () [(_ a b) (let ([t a]) (set! a b) (set! b t))]))",
    },
    "define-syntax-rule": {
      s: "(define-syntax-rule (name pattern ...) template)",
      d: "Shorthand for a syntax-rules macro with a single pattern/template pair.",
      e: "(define-syntax-rule (unless2 c body ...) (when (not c) body ...))",
    },
    "define/contract": {
      s: "(define/contract (name args ...) contract body ...)",
      d: "Define a function with an attached contract that is checked at run time.",
      e: "(define/contract (add1/nat n)\n  (-> natural? natural?)\n  (add1 n))",
    },
    "define/match": {
      s: "(define/match (name args ...) [pattern body] ...)",
      d: "Define a function whose body is a sequence of pattern/body clauses.",
      e: "(define/match (fact n)\n  [(0) 1]\n  [(n) (* n (fact (sub1 n)))])",
    },
    struct: {
      s: "(struct name (field ...) option ...)",
      d: "Define a new structure type with a constructor, predicate and field accessors.",
      e: "(struct point (x y) #:transparent)\n(point 1 2)",
    },
    "define-struct": {
      s: "(define-struct name (field ...))",
      d: "Legacy alias for struct that also provides mutators.",
      e: "(define-struct posn (x y))",
    },
    lambda: {
      s: "(lambda (arg ...) body ...)\n(lambda args body ...)",
      d: "Create a procedure. Use & for rest arguments.",
      e: "(lambda (x y) (+ x y))\n(lambda args (length args))",
    },
    "λ": {
      s: "(λ (arg ...) body ...)",
      d: "Unicode alias for lambda.",
      e: "(λ (x) (* x x))",
    },
    "case-lambda": {
      s: "(case-lambda [formals body ...] ...)",
      d: "Create a procedure that dispatches on the number of arguments it receives.",
      e: "(case-lambda [() 0] [(x) x] [(x y) (+ x y)])",
    },

    // === Binding ===
    let: {
      s: "(let ([id rhs] ...) body ...)\n(let name ([id rhs] ...) body ...)",
      d: "Bind identifiers in a new scope. A named let is a loop: name is bound to the procedure.",
      e: "(let ([x 1] [y 2]) (+ x y))\n(let loop ([i 0]) (when (< i 3) (loop (add1 i))))",
    },
    "let*": {
      s: "(let* ([id rhs] ...) body ...)",
      d: "Like let, but each binding can refer to the previous ones.",
      e: "(let* ([x 1] [y (add1 x)]) y)",
    },
    letrec: {
      s: "(letrec ([id rhs] ...) body ...)",
      d: "Like let, but the bindings are in scope within the right-hand sides.",
      e: "(letrec ([even? (lambda (n) (if (zero? n) #t (odd? (sub1 n))))]\n         [odd?  (lambda (n) (if (zero? n) #f (even? (sub1 n))))])\n  (even? 10))",
    },
    "let-values": {
      s: "(let-values ([(id ...) rhs] ...) body ...)",
      d: "Bind multiple values produced by each right-hand side.",
      e: "(let-values ([(q r) (quotient/remainder 17 5)]) (list q r))",
    },
    "let*-values": {
      s: "(let*-values ([(id ...) rhs] ...) body ...)",
      d: "Like let-values, but each binding is visible to later right-hand sides.",
      e: "(let*-values ([(q r) (quotient/remainder 17 5)] [(a) (values q)]) a)",
    },
    "letrec-values": {
      s: "(letrec-values ([(id ...) rhs] ...) body ...)",
      d: "Like let-values, with all bindings in scope within the right-hand sides.",
      e: "(letrec-values ([(f) (values (lambda () 1))]) (f))",
    },
    "with-syntax": {
      s: "(with-syntax ([pattern expr] ...) body ...)",
      d: "Bind syntax patterns to the syntax objects produced by the expressions.",
      e: "(with-syntax ([x #'foo]) #'x)",
    },
    local: {
      s: "(local [definition ...] body ...)",
      d: "Create a scope containing definitions followed by a body, like a letrec of defines.",
      e: "(local [(define x 1)] (+ x 1))",
    },
    shared: {
      s: "(shared ([id rhs] ...) body ...)",
      d: "Bind identifiers like letrec, but allows cyclic references in constructed data.",
      e: "(shared ([x (cons 1 x)]) x)",
    },
    parameterize: {
      s: "(parameterize ([parameter value] ...) body ...)",
      d: "Evaluate the body with the given parameters temporarily set to new values.",
      e: "(parameterize ([current-output-port p]) (displayln \"captured\"))",
    },
    "with-handlers": {
      s: "(with-handlers ([pred handler] ...) body ...)",
      d: "Evaluate the body, catching exceptions with the first predicate that matches.",
      e: "(with-handlers ([exn:fail? (lambda (e) (exn-message e))])\n  (error \"boom\"))",
    },
    do: {
      s: "(do ([id init step] ...) (test expr ...) body ...)",
      d: "Iteration construct. Bindings are stepped in parallel until the test is true.",
      e: "(do ([i 0 (add1 i)]) [(= i 5) i] (displayln i))",
    },

    // === Control ===
    if: {
      s: "(if test then else)",
      d: "Conditional expression. Only #f is false; everything else is true.",
      e: '(if (> x 0) "positive" "non-positive")',
    },
    cond: {
      s: "(cond [test expr ...] ... [else expr ...])",
      d: "Multi-way conditional. A clause may use => to apply a procedure to the test value.",
      e: "(cond\n  [(< n 0) 'negative]\n  [(= n 0) 'zero]\n  [else 'positive])",
    },
    case: {
      s: "(case expr [(datum ...) body ...] ... [else body ...])",
      d: "Dispatch on a value compared with equal?.",
      e: "(case day\n  [(mon tue wed thu fri) 'weekday]\n  [(sat sun) 'weekend])",
    },
    when: {
      s: "(when test body ...)",
      d: "Evaluate the body when test is true, otherwise return void.",
      e: "(when (> x 0) (displayln x))",
    },
    unless: {
      s: "(unless test body ...)",
      d: "Evaluate the body when test is false, otherwise return void.",
      e: "(unless (empty? xs) (displayln (first xs)))",
    },
    and: {
      s: "(and expr ...)",
      d: "Short-circuiting conjunction returning the last value, or #f.",
      e: "(and 1 2 3) ; => 3",
    },
    or: {
      s: "(or expr ...)",
      d: "Short-circuiting disjunction returning the first true value, or #f.",
      e: "(or #f #f 3) ; => 3",
    },
    begin: {
      s: "(begin body ...)",
      d: "Evaluate expressions in order, returning the last value.",
      e: "(begin (displayln \"a\") 42)",
    },
    begin0: {
      s: "(begin0 body ... result)",
      d: "Evaluate the body, then evaluate the last expression and return its value.",
      e: "(begin0 (displayln \"side effect\") 42)",
    },
    "set!": {
      s: "(set! id expr)",
      d: "Mutate an existing binding.",
      e: "(set! counter (add1 counter))",
    },
    quote: {
      s: "(quote datum)  or  'datum",
      d: "Produce a datum without evaluating it.",
      e: "'(1 2 3)\n(quote sym)",
    },
    quasiquote: {
      s: "(quasiquote template)  or  `template",
      d: "Like quote, but unquote and unquote-splicing are evaluated within it.",
      e: "`(1 ,(+ 1 1) ,@(list 3 4))",
    },
    "unquote-splicing": {
      s: "(unquote-splicing expr)  or  ,@expr",
      d: "Splice the elements of a list into the surrounding quasiquoted list.",
      e: "`(0 ,@(list 1 2) 3)",
    },
    delay: {
      s: "(delay body ...)",
      d: "Create a promise that evaluates the body only when forced.",
      e: "(force (delay (+ 1 2)))",
    },
    "call-with-values": {
      s: "(call-with-values producer consumer)",
      d: "Apply consumer to the multiple values produced by producer.",
      e: "(call-with-values (lambda () (values 1 2)) +)",
    },
    "dynamic-wind": {
      s: "(dynamic-wind pre thunk post)",
      d: "Call thunk, running pre on entry and post on every exit.",
      e: "(dynamic-wind (lambda () (displayln \"in\"))\n              (lambda () 42)\n              (lambda () (displayln \"out\")))",
    },

    // === Modules ===
    require: {
      s: "(require require-spec ...)",
      d: "Import bindings from other modules, files or libraries.",
      e: '(require racket/list)\n(require (only-in racket/string string-split))',
    },
    provide: {
      s: "(provide provide-spec ...)",
      d: "Export bindings from the enclosing module.",
      e: "(provide square cube)\n(provide (contract-out [f (-> integer? integer?)]))",
    },
    module: {
      s: "(module name initial-import body ...)",
      d: "Define a module within the current module.",
      e: "(module helper racket/base\n  (provide twice)\n  (define (twice x) (* 2 x)))",
    },
    "module+": {
      s: "(module+ name body ...)",
      d: "Add declarations to a submodule, creating it if needed.",
      e: "(module+ test\n  (check-equal? (square 2) 4))",
    },
    "module*": {
      s: "(module* name initial-import body ...)",
      d: "Like module, but the submodule can see the enclosing module's bindings.",
      e: "(module* helper #f (define (twice x) (* 2 x)))",
    },
    include: {
      s: "(include path ...)",
      d: "Include the contents of the given files as though written inline.",
      e: '(include "defs.rkt")',
    },
    "#lang": {
      s: "#lang language",
      d: "Declare the language of a module. Must be the first line of the file.",
      e: "#lang racket/base",
    },

    // === Iteration ===
    for: {
      s: "(for (clause ...) body ...)",
      d: "Iterate for side effects. Clauses are [id seq-expr] or [id seq-expr #:when guard] etc.",
      e: "(for ([i (in-range 3)]) (displayln i))",
    },
    "for/list": {
      s: "(for/list (clause ...) body ...)",
      d: "Like for, but collect the body results into a list.",
      e: "(for/list ([i (in-range 3)]) (* i i))",
    },
    "for/vector": {
      s: "(for/vector (clause ...) body ...)",
      d: "Like for, but collect the body results into a vector.",
      e: "(for/vector ([i (in-range 3)]) (* i i))",
    },
    "for/hash": {
      s: "(for/hash (clause ...) body ...)",
      d: "Like for, but the body must produce two values, used as a hash key and value.",
      e: "(for/hash ([i (in-range 3)]) (values i (* i i)))",
    },
    "for/and": {
      s: "(for/and (clause ...) body ...)",
      d: "Like for, returning #f at the first false result, else the last value.",
      e: "(for/and ([x xs]) (even? x))",
    },
    "for/or": {
      s: "(for/or (clause ...) body ...)",
      d: "Like for, returning the first true result, else #f.",
      e: "(for/or ([x xs]) (odd? x))",
    },
    "for/sum": {
      s: "(for/sum (clause ...) body ...)",
      d: "Like for, summing the body results.",
      e: "(for/sum ([i (in-range 5)]) i)",
    },
    "for/product": {
      s: "(for/product (clause ...) body ...)",
      d: "Like for, multiplying the body results.",
      e: "(for/product ([i (in-range 1 5)]) i)",
    },
    "for/first": {
      s: "(for/first (clause ...) body ...)",
      d: "Like for, returning the first body result, or #f if the loops run out.",
      e: "(for/first ([x xs] #:when (even? x)) x)",
    },
    "for/last": {
      s: "(for/last (clause ...) body ...)",
      d: "Like for, returning the last body result, or #f if the loops run out.",
      e: "(for/last ([x xs]) x)",
    },
    "for/fold": {
      s: "(for/fold ([accum-id init] ...) (clause ...) body ...)",
      d: "Like for, threading accumulator bindings through each iteration.",
      e: "(for/fold ([sum 0]) ([i (in-range 5)]) (+ sum i))",
    },
    "for*": {
      s: "(for* (clause ...) body ...)",
      d: "Like for, but nested rather than parallel.",
      e: "(for* ([i (in-range 3)] [j (in-range 3)]) (displayln (list i j)))",
    },
    "for*/list": {
      s: "(for*/list (clause ...) body ...)",
      d: "Nested version of for/list.",
      e: "(for*/list ([i (in-range 2)] [j (in-range 2)]) (list i j))",
    },

    // === Pattern matching ===
    match: {
      s: "(match expr [pattern body ...] ...)",
      d: "Match a value against patterns, evaluating the body of the first that matches.",
      e: "(match x\n  [(list a b) (+ a b)]\n  [(? string? s) (string-length s)]\n  [_ 'other])",
    },
    "match-lambda": {
      s: "(match-lambda [pattern body ...] ...)",
      d: "Produce a procedure of one argument that matches it against the clauses.",
      e: "(map (match-lambda [(list a b) (+ a b)] [(? number? n) n]) xs)",
    },
    "match-define": {
      s: "(match-define pattern expr)",
      d: "Match expr against a pattern and define the pattern's identifiers.",
      e: "(match-define (list a b) (list 1 2))",
    },
    "match-let": {
      s: "(match-let ([pattern expr] ...) body ...)",
      d: "Like let, but each binding is a pattern matched against the expression.",
      e: "(match-let ([(list a b) (list 1 2)]) (+ a b))",
    },

    // === Structs & objects ===
    "struct*": {
      s: "(struct* name (field ...) option ...)",
      d: "Like struct, but fields are inspected with a contract-style accessor.",
      e: "(struct* point ([x integer?] [y integer?]))",
    },
    class: {
      s: "(class superclass (field ...) body ...)",
      d: "Create a class. Use define/public, define/private and super-new inside.",
      e: "(define counter%\n  (class object%\n    (define/public (get) 0)))",
    },
    new: {
      s: "(new class-expr (field id) ...)",
      d: "Instantiate a class, optionally initialising fields.",
      e: "(new counter%)",
    },
    send: {
      s: "(send obj method-expr arg ...)",
      d: "Invoke a method on an object.",
      e: "(send c get)",
    },
    instantiate: {
      s: "(instantiate class-expr (id val) ...)",
      d: "Instantiate a class, binding the given identifiers to its fields.",
      e: "(instantiate counter%)",
    },
    interface: {
      s: "(interface (id ...) body ...)",
      d: "Create an interface declaring the given methods.",
      e: "(interface () [get])",
    },

    // === Functions ===
    "+": { s: "(+ number ...)", d: "Return the sum of the numbers.", e: "(+ 1 2 3) ; => 6" },
    "-": { s: "(- number ...)", d: "Negate, or subtract the remaining numbers from the first.", e: "(- 10 3) ; => 7" },
    "*": { s: "(* number ...)", d: "Return the product of the numbers.", e: "(* 2 3 4) ; => 24" },
    "/": { s: "(/ number ...)", d: "Divide, or return the reciprocal of a single number.", e: "(/ 10 2) ; => 5" },
    add1: { s: "(add1 n)", d: "Return n + 1.", e: "(add1 41) ; => 42" },
    sub1: { s: "(sub1 n)", d: "Return n - 1.", e: "(sub1 43) ; => 42" },
    abs: { s: "(abs x)", d: "Return the absolute value of x.", e: "(abs -5) ; => 5" },
    max: { s: "(max x ...)", d: "Return the greatest of the arguments.", e: "(max 1 3 2) ; => 3" },
    min: { s: "(min x ...)", d: "Return the least of the arguments.", e: "(min 1 3 2) ; => 1" },
    quotient: { s: "(quotient n m)", d: "Return the truncated integer quotient.", e: "(quotient 10 3) ; => 3" },
    remainder: { s: "(remainder n m)", d: "Return the remainder with the sign of n.", e: "(remainder -10 3) ; => -1" },
    modulo: { s: "(modulo n m)", d: "Return the modulo with the sign of m.", e: "(modulo -10 3) ; => 2" },
    expt: { s: "(expt base power)", d: "Return base raised to power.", e: "(expt 2 10) ; => 1024" },
    sqrt: { s: "(sqrt x)", d: "Return the square root of x.", e: "(sqrt 16) ; => 4" },
    exp: { s: "(exp x)", d: "Return e raised to x.", e: "(exp 0) ; => 1" },
    log: { s: "(log x [base])", d: "Return the natural logarithm of x, or the logarithm in the given base.", e: "(log 8 2) ; => 3" },
    floor: { s: "(floor x)", d: "Return the largest integer not greater than x.", e: "(floor 3.7) ; => 3.0" },
    ceiling: { s: "(ceiling x)", d: "Return the smallest integer not less than x.", e: "(ceiling 3.2) ; => 4.0" },
    round: { s: "(round x)", d: "Round x to the nearest integer, breaking ties to even.", e: "(round 3.5) ; => 4.0" },
    truncate: { s: "(truncate x)", d: "Return the integer closest to x toward zero.", e: "(truncate -3.7) ; => -3.0" },
    random: { s: "(random [limit])", d: "Return a random natural less than limit, or a random inexact in [0,1).", e: "(random 10)" },
    "=": { s: "(= x ...)", d: "Numeric equality.", e: "(= 1 1 1) ; => #t" },
    "<": { s: "(< x ...)", d: "Strictly increasing.", e: "(< 1 2 3) ; => #t" },
    ">": { s: "(> x ...)", d: "Strictly decreasing.", e: "(> 3 2 1) ; => #t" },
    "<=": { s: "(<= x ...)", d: "Non-decreasing.", e: "(<= 1 1 2) ; => #t" },
    ">=": { s: "(>= x ...)", d: "Non-increasing.", e: "(>= 3 3 1) ; => #t" },
    "eq?": { s: "(eq? a b)", d: "Identity comparison.", e: "(eq? 'a 'a) ; => #t" },
    "eqv?": { s: "(eqv? a b)", d: "Like eq?, but compares numbers and characters by value.", e: "(eqv? 1.0 1.0) ; => #t" },
    "equal?": { s: "(equal? a b)", d: "Deep structural equality.", e: "(equal? (list 1 2) (list 1 2)) ; => #t" },
    not: { s: "(not x)", d: "Return #t when x is #f, otherwise #f.", e: "(not #f) ; => #t" },
    "zero?": { s: "(zero? x)", d: "Return #t when x is zero.", e: "(zero? 0) ; => #t" },
    "positive?": { s: "(positive? x)", d: "Return #t when x is greater than zero.", e: "(positive? 1) ; => #t" },
    "negative?": { s: "(negative? x)", d: "Return #t when x is less than zero.", e: "(negative? -1) ; => #t" },
    "even?": { s: "(even? n)", d: "Return #t when the integer n is even.", e: "(even? 4) ; => #t" },
    "odd?": { s: "(odd? n)", d: "Return #t when the integer n is odd.", e: "(odd? 3) ; => #t" },
    "number?": { s: "(number? x)", d: "Return #t when x is a number.", e: "(number? 42) ; => #t" },
    "integer?": { s: "(integer? x)", d: "Return #t when x is an integer.", e: "(integer? 42) ; => #t" },
    "string?": { s: "(string? x)", d: "Return #t when x is a string.", e: '(string? "hi") ; => #t' },
    "symbol?": { s: "(symbol? x)", d: "Return #t when x is a symbol.", e: "(symbol? 'hi) ; => #t" },
    "char?": { s: "(char? x)", d: "Return #t when x is a character.", e: "(char? #\\a) ; => #t" },
    "list?": { s: "(list? x)", d: "Return #t when x is a proper list.", e: "(list? (list 1 2)) ; => #t" },
    "pair?": { s: "(pair? x)", d: "Return #t when x is a pair.", e: "(pair? (cons 1 2)) ; => #t" },
    "null?": { s: "(null? x)", d: "Return #t when x is the empty list.", e: "(null? '()) ; => #t" },
    "empty?": { s: "(empty? x)", d: "Return #t when x is an empty sequence.", e: "(empty? '()) ; => #t" },
    "vector?": { s: "(vector? x)", d: "Return #t when x is a vector.", e: "(vector? #(1 2)) ; => #t" },
    "hash?": { s: "(hash? x)", d: "Return #t when x is a hash table.", e: "(hash? (hash 'a 1)) ; => #t" },
    "procedure?": { s: "(procedure? x)", d: "Return #t when x is a procedure.", e: "(procedure? add1) ; => #t" },
    "void?": { s: "(void? x)", d: "Return #t when x is the void value.", e: "(void? (void)) ; => #t" },
    "exn:fail?": { s: "(exn:fail? x)", d: "Return #t when x is an exception raised by error or raise.", e: "(exn:fail? (exn)) ; => #f" },
    cons: { s: "(cons a d)", d: "Construct a pair.", e: "(cons 1 (list 2 3)) ; => '(1 2 3)" },
    car: { s: "(car p)", d: "Return the first element of a pair.", e: "(car (list 1 2)) ; => 1" },
    cdr: { s: "(cdr p)", d: "Return the rest of a pair.", e: "(cdr (list 1 2)) ; => '(2)" },
    list: { s: "(list elem ...)", d: "Construct a list from the arguments.", e: "(list 1 2 3)" },
    "list*": { s: "(list* elem ... tail)", d: "Construct a list with the final argument as the tail.", e: "(list* 1 2 (list 3)) ; => '(1 2 3)" },
    "make-list": { s: "(make-list n [v])", d: "Return a list of n copies of v.", e: "(make-list 3 0) ; => '(0 0 0)" },
    "build-list": { s: "(build-list n proc)", d: "Return a list of (proc i) for i from 0 to n-1.", e: "(build-list 3 add1) ; => '(1 2 3)" },
    range: { s: "(range end [start step])", d: "Return a list of numbers in the given range.", e: "(range 5) ; => '(0 1 2 3 4)" },
    length: { s: "(length lst)", d: "Return the number of elements in a list or vector.", e: "(length (list 1 2 3)) ; => 3" },
    "list-ref": { s: "(list-ref lst pos)", d: "Return the element of lst at the given index.", e: "(list-ref (list 'a 'b) 1) ; => 'b" },
    "list-tail": { s: "(list-tail lst pos)", d: "Return the sublist after the given index.", e: "(list-tail (list 1 2 3) 1) ; => '(2 3)" },
    first: { s: "(first lst)", d: "Return the first element of a non-empty list.", e: "(first (list 1 2 3)) ; => 1" },
    second: { s: "(second lst)", d: "Return the second element of a list.", e: "(second (list 1 2 3)) ; => 2" },
    third: { s: "(third lst)", d: "Return the third element of a list.", e: "(third (list 1 2 3)) ; => 3" },
    last: { s: "(last lst)", d: "Return the last element of a non-empty list.", e: "(last (list 1 2 3)) ; => 3" },
    rest: { s: "(rest lst)", d: "Return the list after the first element.", e: "(rest (list 1 2 3)) ; => '(2 3)" },
    append: { s: "(append lst ...)", d: "Concatenate lists.", e: "(append (list 1) (list 2 3)) ; => '(1 2 3)" },
    "append*": { s: "(append* lst ...)", d: "Concatenate a list of lists.", e: "(append* (list (list 1) (list 2))) ; => '(1 2)" },
    "append-map": { s: "(append-map proc lst ...)", d: "Map proc over the lists and concatenate the results.", e: "(append-map (lambda (x) (list x x)) (list 1 2))" },
    reverse: { s: "(reverse lst)", d: "Return the list in reverse order.", e: "(reverse (list 1 2 3)) ; => '(3 2 1)" },
    member: { s: "(member v lst)", d: "Return the sublist starting at v, or #f.", e: "(member 2 (list 1 2 3)) ; => '(2 3)" },
    assoc: { s: "(assoc v lst)", d: "Return the first pair whose car equals v, or #f.", e: "(assoc 'b (list (cons 'a 1) (cons 'b 2)))" },
    remove: { s: "(remove v lst)", d: "Return a list with the first occurrence of v removed.", e: "(remove 2 (list 1 2 3)) ; => '(1 3)" },
    "remove*": { s: "(remove* vs lst)", d: "Return a list with all occurrences of the values removed.", e: "(remove* (list 1 3) (list 1 2 3)) ; => '(2)" },
    "remove-duplicates": { s: "(remove-duplicates lst)", d: "Return a list with duplicate elements removed.", e: "(remove-duplicates (list 1 1 2)) ; => '(1 2)" },
    sort: { s: "(sort lst less-than?)", d: "Return a sorted copy of lst.", e: "(sort (list 3 1 2) <) ; => '(1 2 3)" },
    "sort!": { s: "(sort! lst less-than?)", d: "Sort a vector or list in place.", e: "(sort! (vector 3 1 2) <)" },
    shuffle: { s: "(shuffle lst)", d: "Return a list with the elements in random order.", e: "(shuffle (list 1 2 3))" },
    argmin: { s: "(argmin proc lst)", d: "Return the element of lst for which proc returns the smallest value.", e: "(argmin abs (list 3 -1 2)) ; => -1" },
    argmax: { s: "(argmax proc lst)", d: "Return the element of lst for which proc returns the largest value.", e: "(argmax abs (list 3 -5 2)) ; => -5" },
    flatten: { s: "(flatten v)", d: "Flatten nested lists into a single list.", e: "(flatten (list 1 (list 2 (list 3)))) ; => '(1 2 3)" },
    filter: { s: "(filter pred lst)", d: "Return the elements for which pred is true.", e: "(filter even? (list 1 2 3 4)) ; => '(2 4)" },
    "filter-map": { s: "(filter-map proc lst ...)", d: "Map proc and keep the true results.", e: "(filter-map (lambda (x) (and (even? x) x)) (list 1 2 3 4))" },
    "filter-not": { s: "(filter-not pred lst)", d: "Return the elements for which pred is false.", e: "(filter-not even? (list 1 2 3 4)) ; => '(1 3)" },
    map: { s: "(map proc lst ...)", d: "Apply proc to the elements of the lists, returning a list of results.", e: "(map add1 (list 1 2 3)) ; => '(2 3 4)" },
    andmap: { s: "(andmap pred lst ...)", d: "Return #t when pred is true for every element, else the first false value.", e: "(andmap even? (list 2 4)) ; => #t" },
    ormap: { s: "(ormap pred lst ...)", d: "Return the first true result of pred, or #f.", e: "(ormap even? (list 1 3 4)) ; => #t" },
    "for-each": { s: "(for-each proc lst ...)", d: "Apply proc to each element for its side effects.", e: "(for-each displayln (list 1 2 3))" },
    foldl: { s: "(foldl proc init lst ...)", d: "Fold proc over the lists from the left.", e: "(foldl + 0 (list 1 2 3)) ; => 6" },
    foldr: { s: "(foldr proc init lst ...)", d: "Fold proc over the lists from the right.", e: "(foldr cons '() (list 1 2 3)) ; => '(1 2 3)" },
    fold: { s: "(fold proc init lst ...)", d: "Like foldl with the accumulator as the first argument.", e: "(fold + 0 (list 1 2 3)) ; => 6" },
    apply: { s: "(apply proc v lst)", d: "Apply proc to the arguments, with the final list expanded.", e: "(apply + (list 1 2 3)) ; => 6" },
    count: { s: "(count pred lst ...)", d: "Return the number of elements for which pred is true.", e: "(count even? (list 1 2 3 4)) ; => 2" },
    "group-by": { s: "(group-by key lst)", d: "Group the elements of lst into an association list keyed by key.", e: "(group-by even? (list 1 2 3 4))" },
    vector: { s: "(vector elem ...)", d: "Construct a vector.", e: "(vector 1 2 3) ; => #(1 2 3)" },
    "make-vector": { s: "(make-vector n [v])", d: "Return a vector of n copies of v.", e: "(make-vector 3 0) ; => #(0 0 0)" },
    "build-vector": { s: "(build-vector n proc)", d: "Return a vector of (proc i) for i from 0 to n-1.", e: "(build-vector 3 add1) ; => #(1 2 3)" },
    "vector-ref": { s: "(vector-ref vec pos)", d: "Return the element of vec at pos.", e: "(vector-ref (vector 1 2 3) 1) ; => 2" },
    "vector-set!": { s: "(vector-set! vec pos v)", d: "Set the element of vec at pos.", e: "(vector-set! v 0 42)" },
    "vector-length": { s: "(vector-length vec)", d: "Return the number of elements in vec.", e: "(vector-length (vector 1 2 3)) ; => 3" },
    "vector->list": { s: "(vector->list vec)", d: "Convert a vector to a list.", e: "(vector->list (vector 1 2 3)) ; => '(1 2 3)" },
    "list->vector": { s: "(list->vector lst)", d: "Convert a list to a vector.", e: "(list->vector (list 1 2 3)) ; => #(1 2 3)" },
    "vector-map": { s: "(vector-map proc vec ...)", d: "Map proc over the vectors, returning a vector.", e: "(vector-map add1 (vector 1 2 3))" },
    "vector-for-each": { s: "(vector-for-each proc vec ...)", d: "Apply proc to each element of the vectors.", e: "(vector-for-each displayln (vector 1 2 3))" },
    string: { s: "(string char ...)", d: "Construct a string from characters.", e: "(string #\\a #\\b) ; => \"ab\"" },
    "make-string": { s: "(make-string n [char])", d: "Return a string of n copies of char.", e: "(make-string 3 #\\x) ; => \"xxx\"" },
    "string-length": { s: "(string-length str)", d: "Return the number of characters in str.", e: '(string-length "hello") ; => 5' },
    "string-ref": { s: "(string-ref str pos)", d: "Return the character of str at pos.", e: '(string-ref "hello" 1) ; => #\\e' },
    substring: { s: "(substring str start [end])", d: "Return the substring from start (inclusive) to end (exclusive).", e: '(substring "hello" 1 3) ; => "el"' },
    "string-append": { s: "(string-append str ...)", d: "Concatenate the strings.", e: '(string-append "a" "b") ; => "ab"' },
    "string-join": { s: "(string-join lst [sep #:before-first #:after-last])", d: "Join a list of strings into one string.", e: '(string-join (list "a" "b") ", ") ; => "a, b"' },
    "string-split": { s: "(string-split str [sep])", d: "Split a string on a separator into a list of strings.", e: '(string-split "a,b,c" ",")' },
    "string-copy": { s: "(string-copy str [start end])", d: "Copy a string, optionally a slice of it.", e: '(string-copy "hello" 1 3) ; => "el"' },
    "string->list": { s: "(string->list str)", d: "Convert a string to a list of characters.", e: '(string->list "abc")' },
    "list->string": { s: "(list->string lst)", d: "Convert a list of characters to a string.", e: "(list->string (list #\\a #\\b)) ; => \"ab\"" },
    "string->symbol": { s: "(string->symbol str)", d: "Convert a string to a symbol.", e: '(string->symbol "foo") ; => \'foo' },
    "symbol->string": { s: "(symbol->string sym)", d: "Convert a symbol to a string.", e: "(symbol->string 'foo) ; => \"foo\"" },
    "string->number": { s: "(string->number str [radix])", d: "Parse a number from a string, or #f.", e: '(string->number "42") ; => 42' },
    "number->string": { s: "(number->string n [radix])", d: "Convert a number to a string.", e: '(number->string 255 16) ; => "ff"' },
    "string-upcase": { s: "(string-upcase str)", d: "Return an uppercased copy of str.", e: '(string-upcase "abc") ; => "ABC"' },
    "string-downcase": { s: "(string-downcase str)", d: "Return a lowercased copy of str.", e: '(string-downcase "ABC") ; => "abc"' },
    "string-trim": { s: "(string-trim str [sep])", d: "Remove leading and trailing whitespace from str.", e: '(string-trim "  hi  ") ; => "hi"' },
    "string-replace": { s: "(string-replace str from to)", d: "Replace the first occurrence of from with to.", e: '(string-replace "hello" "l" "L") ; => "heLlo"' },
    "string-contains?": { s: "(string-contains? str sub)", d: "Return #t when str contains sub.", e: '(string-contains? "hello" "ell") ; => #t' },
    "string-prefix?": { s: "(string-prefix? str prefix)", d: "Return #t when str starts with prefix.", e: '(string-prefix? "hello" "he") ; => #t' },
    "string-suffix?": { s: "(string-suffix? str suffix)", d: "Return #t when str ends with suffix.", e: '(string-suffix? "hello" "lo") ; => #t' },
    format: { s: "(format fmt v ...)", d: "Format a string using ~a, ~s, ~v and friends.", e: '(format "~a is ~a" "x" 1) ; => "x is 1"' },
    "~a": { s: "~a", d: "format directive: display the argument in human-readable form.", e: '(format "~a" "hi") ; => "hi"' },
    "~s": { s: "~s", d: "format directive: write the argument in machine-readable form.", e: '(format "~s" "hi") ; => "\\"hi\\""' },
    "~v": { s: "~v", d: "format directive: print the argument with print.", e: '(format "~v" (list 1 2))' },
    "~e": { s: "~e", d: "format directive: write the argument with an error-writing style.", e: '(format "~e" "hi")' },
    "~r": { s: "~r", d: "format directive: print the argument in a specific base.", e: '(format "~r" 255) ; => "#xff"' },
    "~n": { s: "~n", d: "format directive: emit a newline.", e: '(format "a~nb")' },
    printf: { s: "(printf fmt v ...)", d: "Print formatted output to the current output port.", e: '(printf "~a~n" 42)' },
    eprintf: { s: "(eprintf fmt v ...)", d: "Print formatted output to the current error port.", e: '(eprintf "error: ~a~n" msg)' },
    display: { s: "(display v [port])", d: "Write v to the port in human-readable form.", e: '(display "hi")' },
    displayln: { s: "(displayln v [port])", d: "Write v followed by a newline.", e: '(displayln "hi")' },
    print: { s: "(print v [port])", d: "Write v to the port in machine-readable form followed by a newline.", e: "(print (list 1 2))" },
    println: { s: "(println v ...)", d: "Write the arguments to the current output port separated by spaces, followed by a newline.", e: '(println "a" 1)' },
    write: { s: "(write v [port])", d: "Write v in a form that can be read back.", e: '(write "hi") ; writes "hi" with quotes' },
    "pretty-print": { s: "(pretty-print v [port])", d: "Pretty-print v to the port.", e: "(pretty-print (list 1 2 3))" },
    "char->integer": { s: "(char->integer c)", d: "Return the Unicode code point of a character.", e: "(char->integer #\\A) ; => 65" },
    "integer->char": { s: "(integer->char n)", d: "Return the character with the given code point.", e: "(integer->char 65) ; => #\\A" },
    "char-upcase": { s: "(char-upcase c)", d: "Return the uppercase version of a character.", e: "(char-upcase #\\a) ; => #\\A" },
    "char-whitespace?": { s: "(char-whitespace? c)", d: "Return #t when c is a whitespace character.", e: "(char-whitespace? #\\space) ; => #t" },
    bytes: { s: "(bytes byte ...)", d: "Construct a byte string.", e: "(bytes 65 66) ; => #\"AB\"" },
    "bytes-length": { s: "(bytes-length bstr)", d: "Return the number of bytes in a byte string.", e: "(bytes-length #\"abc\") ; => 3" },
    "bytes-ref": { s: "(bytes-ref bstr k)", d: "Return the byte at index k.", e: "(bytes-ref #\"abc\" 0) ; => 97" },
    "bytes-append": { s: "(bytes-append bstr ...)", d: "Concatenate byte strings.", e: "(bytes-append #\"a\" #\"b\")" },
    "string->bytes/utf-8": { s: "(string->bytes/utf-8 str)", d: "Encode a string as UTF-8 bytes.", e: '(string->bytes/utf-8 "hi")' },
    "bytes->string/utf-8": { s: "(bytes->string/utf-8 bstr)", d: "Decode UTF-8 bytes into a string.", e: "(bytes->string/utf-8 #\"hi\")" },
    hash: { s: "(hash key val ...)", d: "Construct an immutable hash table using equal? for keys.", e: "(hash 'a 1 'b 2)" },
    hasheq: { s: "(hasheq key val ...)", d: "Construct an immutable hash table using eq? for keys.", e: "(hasheq 'a 1)" },
    "hash-ref": { s: "(hash-ref h key [failure])", d: "Look up key in h, returning failure or raising when absent.", e: "(hash-ref (hash 'a 1) 'a) ; => 1" },
    "hash-set": { s: "(hash-set h key val)", d: "Return a hash table like h with key mapped to val.", e: "(hash-set (hash) 'a 1)" },
    "hash-set!": { s: "(hash-set! h key val)", d: "Mutate a mutable hash table to map key to val.", e: "(hash-set! h 'a 1)" },
    "hash-remove": { s: "(hash-remove h key)", d: "Return a hash table like h without key.", e: "(hash-remove (hash 'a 1) 'a)" },
    "hash-update": { s: "(hash-update h key proc [failure])", d: "Return h with key updated by applying proc to its value.", e: "(hash-update (hash 'n 1) 'n add1)" },
    "hash-has-key?": { s: "(hash-has-key? h key)", d: "Return #t when h maps key to a value.", e: "(hash-has-key? (hash 'a 1) 'a) ; => #t" },
    "hash-keys": { s: "(hash-keys h)", d: "Return a list of the keys of h.", e: "(hash-keys (hash 'a 1)) ; => '(a)" },
    "hash-values": { s: "(hash-values h)", d: "Return a list of the values of h.", e: "(hash-values (hash 'a 1)) ; => '(1)" },
    "hash-count": { s: "(hash-count h)", d: "Return the number of entries in h.", e: "(hash-count (hash 'a 1)) ; => 1" },
    "hash-map": { s: "(hash-map proc h)", d: "Apply proc to each key and value, returning a list of results.", e: "(hash-map (lambda (k v) v) (hash 'a 1))" },
    "hash-for-each": { s: "(hash-for-each proc h)", d: "Apply proc to each key and value of h for its side effects.", e: "(hash-for-each displayln (hash 'a 1))" },
    box: { s: "(box v)", d: "Create a mutable box holding v.", e: "(define b (box 0))" },
    unbox: { s: "(unbox b)", d: "Return the value held in a box.", e: "(unbox (box 42)) ; => 42" },
    "set-box!": { s: "(set-box! b v)", d: "Set the value held in a box.", e: "(set-box! b 42)" },
    "make-parameter": { s: "(make-parameter init [guard])", d: "Create a new parameter, optionally converting values with guard.", e: "(define current-name (make-parameter \"world\"))" },
    identity: { s: "(identity v)", d: "Return v unchanged.", e: "(identity 42) ; => 42" },
    const: { s: "(const v)", d: "Return a procedure that accepts any arguments and returns v.", e: "((const 7) 1 2) ; => 7" },
    compose: { s: "(compose proc ...)", d: "Compose procedures right-to-left, allowing any number of arguments.", e: "((compose add1 add1) 0) ; => 2" },
    "compose1": { s: "(compose1 proc ...)", d: "Compose unary procedures right-to-left.", e: "((compose1 add1 add1) 0) ; => 2" },
    curry: { s: "(curry proc)", d: "Curry a procedure from the left.", e: "((curry + 1) 2) ; => 3" },
    curryr: { s: "(curryr proc)", d: "Curry a procedure from the right.", e: "((curryr - 1) 10) ; => 9" },
    negate: { s: "(negate pred)", d: "Return a procedure that returns the logical negation of pred.", e: "((negate even?) 3) ; => #t" },
    thunk: { s: "(thunk body ...)", d: "Return a procedure of no arguments that evaluates the body.", e: "((thunk (displayln \"hi\")))" },
    "in-range": { s: "(in-range end [start step])", d: "Return a sequence of numbers in the given range.", e: "(for/list ([i (in-range 3)]) i) ; => '(0 1 2)" },
    "in-list": { s: "(in-list lst)", d: "Return a sequence over the elements of a list.", e: "(for/list ([x (in-list (list 1 2))]) x)" },
    "in-vector": { s: "(in-vector vec [start end step])", d: "Return a sequence over the elements of a vector.", e: "(for/list ([x (in-vector (vector 1 2))]) x)" },
    "in-string": { s: "(in-string str)", d: "Return a sequence over the characters of a string.", e: '(for/list ([c (in-string "ab")]) c)' },
    "in-hash": { s: "(in-hash h)", d: "Return a sequence of the key/value pairs of a hash table.", e: "(for/list ([(k v) (in-hash (hash 'a 1))]) k)" },
    "in-indexed": { s: "(in-indexed seq)", d: "Return a sequence of index/value pairs over a sequence.", e: "(for/list ([(i v) (in-indexed (list 'a 'b))]) i)" },
    "in-naturals": { s: "(in-naturals [start])", d: "Return an infinite sequence of natural numbers.", e: "(for/list ([i (in-naturals 1)] #:break (> i 3)) i)" },
    "in-value": { s: "(in-value v)", d: "Return a sequence producing v exactly once.", e: "(for/list ([x (in-value 1)]) x) ; => '(1)" },
    "in-cycle": { s: "(in-cycle seq ...)", d: "Return an infinite sequence cycling through the given sequences.", e: "(for/list ([x (in-cycle (list 1 2))] #:break (= x 1) #:when #f) x)" },
    regexp: { s: "(regexp str)", d: "Compile a string into a regular expression.", e: '(regexp "a+b")' },
    pregexp: { s: "(pregexp str)", d: "Compile a string into a regexp that is automatically anchored.", e: '(pregexp "a+b")' },
    "regexp-match": { s: "(regexp-match re str [start end])", d: "Match re against str, returning a list of matches or #f.", e: '(regexp-match #rx"\\\\d+" "a12")' },
    "regexp-match?": { s: "(regexp-match? re str)", d: "Return #t when re matches somewhere in str.", e: '(regexp-match? #rx"\\\\d" "a1") ; => #t' },
    "regexp-replace": { s: "(regexp-replace re str replacement)", d: "Replace the first match of re in str.", e: '(regexp-replace #rx"l" "hello" "L")' },
    "regexp-replace*": { s: "(regexp-replace* re str replacement)", d: "Replace every match of re in str.", e: '(regexp-replace* #rx"l" "hello" "L")' },
    "regexp-split": { s: "(regexp-split re str)", d: "Split str on matches of re.", e: '(regexp-split #rx"," "a,b,c")' },
    error: { s: "(error msg v ...)", d: "Raise an exception whose message is the formatted arguments.", e: '(error "bad value" v)' },
    raise: { s: "(raise v)", d: "Raise v as an exception.", e: '(raise (exn "boom"))' },
    "raise-user-error": { s: "(raise-user-error sym fmt v ...)", d: "Raise an error that looks like a user error rather than a bug.", e: "(raise-user-error 'app \"bad input: ~a\" x)" },
    exn: { s: "(exn msg [continuation-marks])", d: "Create a base exception value.", e: '(exn "boom")' },
    "exn-message": { s: "(exn-message e)", d: "Return the message of an exception.", e: "(exn-message (exn \"boom\")) ; => \"boom\"" },
    "exn->string": { s: "(exn->string e)", d: "Return a string describing an exception.", e: "(exn->string (exn \"boom\"))" },
    read: { s: "(read [port])", d: "Read a datum from a port.", e: "(read (open-input-string \"(1 2)\"))" },
    "read-line": { s: "(read-line [port])", d: "Read a line of characters from a port, or eof.", e: "(read-line)" },
    "read-string": { s: "(read-string n [port])", d: "Read up to n characters from a port.", e: "(read-string 3)" },
    "open-input-file": { s: "(open-input-file path)", d: "Open a file for reading.", e: '(open-input-file "data.txt")' },
    "open-output-file": { s: "(open-output-file path)", d: "Open a file for writing.", e: '(open-output-file "out.txt")' },
    "open-input-string": { s: "(open-input-string str)", d: "Create an input port that reads from a string.", e: '(read (open-input-string "42"))' },
    "open-output-string": { s: "(open-output-string)", d: "Create an output port that accumulates into a string.", e: "(define p (open-output-string))" },
    "get-output-string": { s: "(get-output-string port)", d: "Return the string accumulated by an output string port.", e: "(get-output-string p)" },
    "close-input-port": { s: "(close-input-port port)", d: "Close an input port.", e: "(close-input-port p)" },
    "close-output-port": { s: "(close-output-port port)", d: "Close an output port.", e: "(close-output-port p)" },
    "call-with-input-file": { s: "(call-with-input-file path proc)", d: "Open a file for reading and pass the port to proc, closing it afterwards.", e: '(call-with-input-file "f" read-line)' },
    "with-input-from-file": { s: "(with-input-from-file path thunk)", d: "Call thunk with the current input port set to the given file.", e: '(with-input-from-file "f" read-line)' },
    "with-output-to-file": { s: "(with-output-to-file path thunk)", d: "Call thunk with the current output port set to the given file.", e: '(with-output-to-file "f" (lambda () (displayln "hi")))' },
    "file->string": { s: "(file->string path)", d: "Read the whole file into a string.", e: '(file->string "data.txt")' },
    "file->bytes": { s: "(file->bytes path)", d: "Read the whole file into a byte string.", e: '(file->bytes "data.bin")' },
    "string->file": { s: "(string->file str path)", d: "Write a string to a file.", e: '(string->file "hi" "out.txt")' },
    "file-exists?": { s: "(file-exists? path)", d: "Return #t when the file exists.", e: '(file-exists? "data.txt")' },
    "delete-file": { s: "(delete-file path)", d: "Delete the named file.", e: '(delete-file "out.txt")' },
    "directory-list": { s: "(directory-list [path])", d: "Return a list of the files and directories in path.", e: '(directory-list ".")' },
    "make-directory": { s: "(make-directory path)", d: "Create a directory, failing if it already exists.", e: '(make-directory "newdir")' },
    "current-directory": { s: "(current-directory [path])", d: "Get or set the current working directory.", e: "(current-directory)" },
    "current-output-port": { s: "(current-output-port [port])", d: "Get or set the current output port parameter.", e: "(current-output-port)" },
    "current-input-port": { s: "(current-input-port [port])", d: "Get or set the current input port parameter.", e: "(current-input-port)" },
    "system-type": { s: "(system-type [kind])", d: "Return a symbol describing the operating system.", e: "(system-type) ; => 'unix" },
    "getenv": { s: "(getenv name)", d: "Return the value of an environment variable, or #f.", e: '(getenv "PATH")' },
    "current-seconds": { s: "(current-seconds)", d: "Return the current time in seconds since the epoch.", e: "(current-seconds)" },
    "current-inexact-milliseconds": { s: "(current-inexact-milliseconds)", d: "Return the current time in milliseconds since the epoch.", e: "(current-inexact-milliseconds)" },
    sleep: { s: "(sleep seconds)", d: "Suspend the current thread for the given number of seconds.", e: "(sleep 1)" },
    exit: { s: "(exit [code])", d: "Exit the process with the given status code.", e: "(exit 0)" },
    eval: { s: "(eval expr [namespace])", d: "Evaluate a datum in a namespace.", e: "(eval '(+ 1 2)) ; => 3" },
    expand: { s: "(expand expr)", d: "Fully expand a syntax object or datum.", e: "(expand '(when #t 1))" },
    macroexpand: { s: "(macroexpand expr)", d: "Expand the outermost macro use in a datum.", e: "(macroexpand '(when #t 1))" },
    "macroexpand-all": { s: "(macroexpand-all expr)", d: "Recursively expand macros in a datum.", e: "(macroexpand-all '(when #t 1))" },
    "syntax->datum": { s: "(syntax->datum stx)", d: "Strip the lexical information from a syntax object.", e: "(syntax->datum #'x) ; => 'x" },
    "datum->syntax": { s: "(datum->syntax ctxt v)", d: "Convert a datum into a syntax object with the context's lexical information.", e: "(datum->syntax #'here 'x)" },
    gensym: { s: "(gensym [base])", d: "Return a fresh uninterned symbol.", e: "(gensym 'tmp)" },
    void: { s: "(void v ...)", d: "Return the void value, ignoring any arguments.", e: "(void)" },
    values: { s: "(values v ...)", d: "Return multiple values.", e: "(values 1 2 3)" },
    "call/cc": { s: "(call/cc proc)", d: "Call proc with the current continuation.", e: "(call/cc (lambda (k) (k 42))) ; => 42" },
    "call-with-current-continuation": { s: "(call-with-current-continuation proc)", d: "Same as call/cc.", e: "(call-with-current-continuation (lambda (k) (k 42)))" },
    "object-name": { s: "(object-name v)", d: "Return a symbol naming an object, when it has one.", e: "(object-name add1) ; => '+ " },
  };

  /* ================================================================
   REGISTER LANGUAGE
   ================================================================ */

  monaco.languages.register({
    id: LANG,
    extensions: [".rkt", ".rktl", ".rktd", ".scrbl"],
    aliases: ["Racket", "racket", "rkt"],
  });

  /* ================================================================
   LANGUAGE CONFIGURATION
   ================================================================ */

  monaco.languages.setLanguageConfiguration(LANG, {
    comments: { lineComment: ";", blockComment: ["#|", "|#"] },
    brackets: [
      ["(", ")"],
      ["[", "]"],
      ["{", "}"],
    ],
    autoClosingPairs: [
      { open: "(", close: ")" },
      { open: "[", close: "]" },
      { open: "{", close: "}" },
      { open: '"', close: '"', notIn: ["string", "comment"] },
    ],
    surroundingPairs: [
      { open: "(", close: ")" },
      { open: "[", close: "]" },
      { open: "{", close: "}" },
      { open: '"', close: '"' },
    ],
    wordPattern: /[a-zA-Z!$%&*+\-.\/:<=>?@^_~][a-zA-Z0-9!$%&*+\-.\/:<=>?@^_~]*/,
    indentationRules: {
      increaseIndentPattern: /^\s*[([{].*[^)\]}\s]\s*$/,
      decreaseIndentPattern: /^\s*[)\]}]/,
    },
    onEnterRules: [
      {
        beforeText: /[([{][^)\]}]*$/,
        action: { indentAction: monaco.languages.IndentAction.Indent },
      },
    ],
  });

  /* ================================================================
   MONARCH TOKENIZER
   ================================================================ */

  monaco.languages.setMonarchTokensProvider(LANG, {
    specialForms: SPECIAL_FORMS,
    core: CORE,
    constants: CONSTANTS,

    tokenizer: {
      root: [
        [/\s+/, "white"],

        // Block comment (nestable)
        [/#\|/, "comment", "@blockComment"],
        // Datum comment
        [/#;/, "comment"],
        // Line comment
        [/;.*$/, "comment"],
        // Shebang
        [/^#!.*$/, "comment"],
        // #lang directive
        [/#lang\b/, "keyword"],

        // Byte strings and regexp literals
        [/#(?:rx|px)"/, "string", "@string"],
        [/#"/, "string", "@string"],
        [/"/, "string", "@string"],

        // #-prefixed reader macros: syntax quote / unquote
        [/#,@/, "tag"],
        [/#[',`]/, "tag"],

        // Character literals
        [
          /#\\(?:space|newline|linefeed|tab|return|backspace|vtab|nul|null|page|rubout|delete|escape|alarm|altmode)/,
          "string",
        ],
        [/#\\u[0-9a-fA-F]{1,4}/, "string"],
        [/#\\x[0-9a-fA-F]{1,2}/, "string"],
        [/#\\./, "string"],

        // Booleans
        [/#(?:true|false)\b/, "constant"],
        [/#[tf](?=[\s()[\]{}";,']|$)/, "constant"],

        // Vectors, prefab structs, hash tables and boxes
        [/#s\(/, "delimiter.parenthesis"],
        [/#hash(?:eqv|eq|alw)?\(/, "delimiter.parenthesis"],
        [/#\(/, "delimiter.parenthesis"],
        [/#&/, "tag"],

        // Keywords and #% core identifiers
        [/#:[^\s()[\]{}";,]*/, "constant"],
        [/#%[^\s()[\]{}";,]*/, "keyword"],

        // Number prefixes
        [/#[bodx][0-9a-fA-F_]+/, "number"],
        [/#[ei][0-9a-fA-F_+\-.\/]+/, "number"],

        // Here-strings and any remaining #-forms
        [/#<</, "tag"],
        [/#/, "tag"],

        // Numbers
        [/[+-]?inf\.0/, "number"],
        [/[+-]?nan\.0/, "number"],
        [/[+-]?\d+\.\d*(?:[eE][+-]?\d+)?/, "number.float"],
        [/[+-]?\.\d+(?:[eE][+-]?\d+)?/, "number.float"],
        [/[+-]?\d+[eE][+-]?\d+/, "number.float"],
        [/[+-]?\d+\/\d+/, "number"],
        // Complex numbers: `2i`, `1+2i` need a leading digit; `+i`/`-i` need a
        // sign. A bare `i` is an ordinary identifier.
        [/[+-]?\d+(?:[+-]\d+)?i(?![a-zA-Z0-9!$%&*+\-.\/:<=>?@^_~])/, "number"],
        [/[+-]i(?![a-zA-Z0-9!$%&*+\-.\/:<=>?@^_~])/, "number"],
        [/[+-]?\d+/, "number"],

        // Parens and brackets
        [/[()\[\]{}]/, "delimiter.parenthesis"],

        // Reader macros: quote, quasiquote, unquote, unquote-splicing
        [/,@/, "tag"],
        [/[',`]/, "tag"],

        // Symbols
        [
          /[a-zA-Z!$%&*+\-.\/:<=>?@^_~][a-zA-Z0-9!$%&*+\-.\/:<=>?@^_~]*/,
          {
            cases: {
              "@specialForms": "keyword",
              "@core": "type.identifier",
              "@constants": "constant",
              "@default": "identifier",
            },
          },
        ],
      ],

      string: [
        [/[^\\"]+/, "string"],
        [/\\x[0-9a-fA-F]+;/, "string.escape"],
        [/\\u[0-9a-fA-F]{1,4}/, "string.escape"],
        [/\\U[0-9a-fA-F]{1,8}/, "string.escape"],
        [/\\[abtnvfre"'\\0]/, "string.escape"],
        [/\\./, "string.escape"],
        [/"/, "string", "@pop"],
      ],

      blockComment: [
        [/#\|/, "comment", "@push"],
        [/\|#/, "comment", "@pop"],
        [/[^#|]+/, "comment"],
        [/./, "comment"],
      ],
    },
  });

  /* ================================================================
   S-EXPRESSION SCANNER
   ================================================================ */

  const isSymStart = (c) => /[a-zA-Z!$%&*+\-.\/:<=>?@^_~]/.test(c);
  const isSymChar = (c) => /[a-zA-Z0-9!$%&*+\-.\/:<=>?@^_~]/.test(c);
  const isOpenBracket = (c) => c === "(" || c === "[" || c === "{";

  // Builds a tree of the document's bracketed forms together with the symbol
  // tokens they contain. Every `(...)`, `[...]` and `{...}` group becomes a
  // scope that can hold local bindings, and every symbol token carries its own
  // source range. This is the basis for scope-aware navigation.
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
      parent: null,
    };
    const scopes = [root];
    const stack = [root];
    const symbols = [];

    const current = () => stack[stack.length - 1];
    const addToken = (tok) => {
      current().items.push(tok);
      if (tok.t === "sym") symbols.push(tok);
    };
    const openScope = (open, offset) => {
      const sc = {
        isScope: true,
        open,
        start: offset,
        end: size,
        names: new Set(),
        items: [],
        parent: current(),
      };
      scopes.push(sc);
      current().items.push(sc);
      stack.push(sc);
    };

    let inString = false;
    let blockDepth = 0;
    let hereTag = null;

    // Scans block-comment nesting from ci, updating blockDepth. Returns the
    // index just past the closing `|#` (or the end of the line).
    const scanBlock = (line, ci) => {
      while (ci < line.length) {
        if (line.startsWith("#|", ci)) {
          blockDepth++;
          ci += 2;
          continue;
        }
        if (line.startsWith("|#", ci)) {
          blockDepth--;
          ci += 2;
          if (blockDepth === 0) return ci;
          continue;
        }
        ci++;
      }
      return ci;
    };

    for (let li = 0; li < lines.length; li++) {
      const line = lines[li];
      let ci = 0;

      // Continue a multi-line string.
      if (inString) {
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
        if (closed) inString = false;
        continue;
      }

      // Inside a here-string: skip lines until the terminator.
      if (hereTag !== null) {
        if (line.trim() === hereTag) hereTag = null;
        continue;
      }

      // Continue a multi-line block comment.
      if (blockDepth > 0) {
        ci = scanBlock(line, ci);
        if (blockDepth > 0) continue;
      }

      while (ci < line.length) {
        const ch = line[ci];

        if (ch === ";") break;
        if (/\s/.test(ch)) {
          ci++;
          continue;
        }

        // Nestable block comment.
        if (ch === "#" && line[ci + 1] === "|") {
          blockDepth = 1;
          ci = scanBlock(line, ci + 2);
          if (blockDepth > 0) break;
          continue;
        }

        // Datum comment: the next datum is ignored.
        if (ch === "#" && line[ci + 1] === ";") {
          ci += 2;
          continue;
        }

        // Here-string: `#<<TAG` followed by lines until TAG.
        if (line.startsWith("#<<", ci)) {
          hereTag = line.slice(ci + 3).trim();
          ci = line.length;
          continue;
        }

        // Strings, byte strings and regexp literals.
        let quoteAt = -1;
        if (ch === '"') quoteAt = ci;
        else if (line.startsWith('#"', ci)) quoteAt = ci + 1;
        else if (line.startsWith('#rx"', ci) || line.startsWith('#px"', ci))
          quoteAt = ci + 3;
        if (quoteAt >= 0) {
          ci = quoteAt + 1;
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

        // Character literals.
        if (line.startsWith("#\\", ci)) {
          ci += 2;
          if (ci < line.length && /[a-zA-Z]/.test(line[ci])) {
            while (ci < line.length && /[a-zA-Z0-9]/.test(line[ci])) ci++;
          } else if (ci < line.length) {
            ci++;
          }
          continue;
        }

        // Quoted symbols: `|...|`.
        if (ch === "|") {
          ci++;
          while (ci < line.length && line[ci] !== "|") ci++;
          if (ci < line.length) ci++;
          continue;
        }

        // Reader macros.
        if (ch === "'" || ch === "`" || ch === ",") {
          ci++;
          if (ch === "," && line[ci] === "@") ci++;
          continue;
        }

        if (ch === "#") {
          if (line.startsWith("#,@", ci)) {
            ci += 3;
            continue;
          }
          if (line[ci + 1] === "'" || line[ci + 1] === "`" || line[ci + 1] === ",") {
            ci += 2;
            continue;
          }
          if (line[ci + 1] === "&") {
            ci += 2;
            continue;
          }
          if (line[ci + 1] === ":") {
            ci += 2;
            while (ci < line.length && isSymChar(line[ci])) ci++;
            continue;
          }
          if (line[ci + 1] === "%") {
            ci += 2;
            while (ci < line.length && isSymChar(line[ci])) ci++;
            continue;
          }
          if (line[ci + 1] === "s" && line[ci + 2] === "(") {
            openScope("(", at(li, ci));
            ci += 3;
            continue;
          }
          const hashMatch = line.slice(ci).match(/^#hash(?:eqv|eq|alw)?\(/);
          if (hashMatch) {
            openScope("(", at(li, ci));
            ci += hashMatch[0].length;
            continue;
          }
          if (line[ci + 1] === "(") {
            openScope("(", at(li, ci));
            ci += 2;
            continue;
          }
          if (line.startsWith("#true", ci)) {
            ci += 5;
            continue;
          }
          if (line.startsWith("#false", ci)) {
            ci += 6;
            continue;
          }
          if (line[ci + 1] === "t" || line[ci + 1] === "f") {
            ci += 2;
            continue;
          }
          ci++;
          continue;
        }

        if (isOpenBracket(ch)) {
          openScope(ch, at(li, ci));
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

        // Numbers.
        if (/[0-9]/.test(ch)) {
          ci++;
          while (ci < line.length && /[0-9a-zA-Z.+\-/]/.test(line[ci])) ci++;
          continue;
        }

        // Symbols.
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

  // Definition forms that bind a single name in the enclosing scope.
  const DEF_NAME_FORMS = new Set([
    "define-syntax",
    "define-syntaxes",
    "define-for-syntax",
    "define-runtime-path",
    "define-unit",
    "define-signature",
    "define-syntax-class",
    "define-lambda",
  ]);
  // Definition forms that bind either `name` or `(name args ...)`.
  const DEF_FN_FORMS = new Set([
    "define",
    "define/contract",
    "define/match",
    "define/public",
    "define/private",
    "define/override",
    "define/augment",
    "define/augment-final",
    "define/override-final",
    "define/final",
    "define/abstract",
    "define/member",
    "define-simple-macro",
    "define-syntax-parse-rule",
  ]);
  // Definition forms that bind a tuple of names.
  const DEF_VALUES_FORMS = new Set([
    "define-values",
    "define-values-for-syntax",
  ]);
  // Struct definitions bind the struct name.
  const STRUCT_FORMS = new Set([
    "struct",
    "struct*",
    "define-struct",
    "define-struct/contract",
  ]);
  // Forms that introduce a procedure scope.
  const LAMBDA_FORMS = new Set(["lambda", "λ"]);
  // Forms whose second element is a list of `[id rhs]` bindings.
  const LET_FORMS = new Set([
    "let",
    "let*",
    "letrec",
    "let-values",
    "let*-values",
    "letrec-values",
    "let-syntax",
    "letrec-syntax",
    "let-syntaxes",
    "letrec-syntaxes",
    "letrec-syntaxes+values",
    "match-let",
    "match-let*",
    "match-letrec",
    "for",
    "for/list",
    "for/vector",
    "for/hash",
    "for/hasheq",
    "for/hasheqv",
    "for/and",
    "for/or",
    "for/sum",
    "for/product",
    "for/first",
    "for/last",
    "for*",
    "for*/list",
    "for*/vector",
    "for*/hash",
    "for*/hasheq",
    "for*/hasheqv",
    "for*/and",
    "for*/or",
    "for*/sum",
    "for*/product",
    "for*/first",
    "for*/last",
  ]);
  // Fold-style for forms: accumulators first, then iteration clauses.
  const FOR_FOLD_FORMS = new Set([
    "for/fold",
    "for/foldr",
    "for/lists",
    "for*/fold",
    "for*/lists",
    "for/fold/derived",
  ]);
  const DO_FORMS = new Set(["do"]);

  // Collects every binding introduced by the scopes, mirroring Racket's lexical
  // scoping closely enough that rename/definition/references agree on which
  // occurrences share a binding.
  function collectDeclarations(scopes) {
    const decls = [];
    const addName = (scope, tok) => {
      if (!scope || !tok || tok.isScope || tok.t !== "sym") return;
      const name = tok.v;
      if (!name || name === "&" || name === "." || name === "...") return;
      scope.names.add(name);
      decls.push({ start: tok.s, end: tok.e, scope, name, tok });
    };

    // Bind a pattern: a symbol binds directly, a tuple/struct pattern binds
    // every symbol it contains.
    function bindPattern(item, target) {
      if (!item) return;
      if (item.isScope) {
        if (isOpenBracket(item.open)) collectAll(item, target);
        return;
      }
      addName(target, item);
    }

    function collectAll(node, target) {
      for (const item of node.items) {
        if (item.isScope) collectAll(item, target);
        else if (item.t === "sym") addName(target, item);
      }
    }

    // A binding list whose elements are `[pattern expr ...]` clauses.
    function collectClauses(listScope, target) {
      for (const clause of listScope.items) {
        if (clause && clause.isScope) bindPattern(clause.items[0], target);
      }
    }

    for (const sc of scopes) {
      if (sc.open !== "(") continue;
      const head = headOf(sc);
      if (!head) continue;
      const items = sc.items;

      if (STRUCT_FORMS.has(head)) {
        addName(sc.parent, items[1]);
      } else if (DEF_NAME_FORMS.has(head)) {
        addName(sc.parent, items[1]);
      } else if (DEF_FN_FORMS.has(head)) {
        const target = items[1];
        if (target && target.isScope) {
          addName(sc.parent, target.items[0]);
          for (let k = 1; k < target.items.length; k++) {
            bindPattern(target.items[k], sc);
          }
        } else {
          addName(sc.parent, target);
        }
      } else if (DEF_VALUES_FORMS.has(head)) {
        const tuple = items[1];
        if (tuple && tuple.isScope) {
          for (const t of tuple.items) addName(sc.parent, t);
        }
      } else if (LAMBDA_FORMS.has(head)) {
        const formals = items[1];
        if (formals && formals.isScope) collectAll(formals, sc);
        else addName(sc, formals);
      } else if (LET_FORMS.has(head)) {
        let listScope = items[1];
        if (listScope && !listScope.isScope) {
          // Named let: (let name ([id rhs] ...) body ...)
          addName(sc.parent, listScope);
          listScope = items[2];
        }
        if (listScope && listScope.isScope) collectClauses(listScope, sc);
      } else if (FOR_FOLD_FORMS.has(head)) {
        const accs = items[1];
        if (accs && accs.isScope) collectClauses(accs, sc);
        const clauses = items[2];
        if (clauses && clauses.isScope) collectClauses(clauses, sc);
      } else if (DO_FORMS.has(head)) {
        const specs = items[1];
        if (specs && specs.isScope) collectClauses(specs, sc);
      }
    }

    return decls;
  }

  /* ================================================================
   HELPER: find user definitions
   ================================================================ */

  const SYM = "[a-zA-Z!$%&*+\\-./:<=>?@^_~][a-zA-Z0-9!$%&*+\\-./:<=>?@^_~]*";

  function findUserDefs(model) {
    const defs = [];
    const lc = model.getLineCount();
    const patterns = [
      [
        new RegExp("\\(\\s*define-syntax-rule\\s+\\(\\s*(" + SYM + ")"),
        "macro",
      ],
      [new RegExp("\\(\\s*define-syntax\\s+(" + SYM + ")"), "macro"],
      [
        new RegExp(
          "\\(\\s*(?:define/contract|define/match|define/public|define/private|define/override|define/augment|define)\\s+\\(\\s*(" +
            SYM +
            ")",
        ),
        "function",
      ],
      [
        new RegExp("\\(\\s*(?:struct\\*|struct|define-struct)\\s+(" + SYM + ")"),
        "struct",
      ],
      [new RegExp("\\(\\s*define-values\\s+\\(\\s*(" + SYM + ")"), "variable"],
      [new RegExp("\\(\\s*define\\s+(" + SYM + ")"), "variable"],
    ];

    for (let i = 1; i <= lc; i++) {
      const line = model.getLineContent(i);
      for (const [re, kind] of patterns) {
        const m = line.match(re);
        if (m) {
          const col = line.indexOf(m[1], m.index) + 1;
          defs.push({ name: m[1], line: i, col, kind });
          break;
        }
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
    if (!ch || !isSymChar(ch)) return null;
    let s = col;
    let e = col;
    while (s > 0 && isSymChar(line[s - 1])) s--;
    while (e < line.length - 1 && isSymChar(line[e + 1])) e++;
    return line.substring(s, e + 1);
  }

  /* ================================================================
   BINDING RESOLUTION (shared by definition / reference / rename)
   ================================================================ */

  // Resolves the symbol under the cursor to its binding: every occurrence bound
  // to it plus the occurrence that declares it. Symbols with no lexical binding
  // (core functions, macros) report `local: false` so callers fall back to
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
      if (!ch || !isSymChar(ch)) return null;
      let s = col;
      let e = col;
      while (s > 0 && isSymChar(line[s - 1])) s--;
      while (e < line.length - 1 && isSymChar(line[e + 1])) e++;
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
    triggerCharacters: ["(", "[", "{", "#"],
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
          label: "define",
          detail: "Define a value",
          insert: "(define ${1:name} ${2:value})",
          doc: "(define name value)",
        },
        {
          label: "define (function)",
          detail: "Define a function",
          insert: "(define (${1:name} ${2:args})\n  ${3:body})",
          doc: "(define (name args) body)",
        },
        {
          label: "define/contract",
          detail: "Define a contracted function",
          insert:
            "(define/contract (${1:name} ${2:args})\n  (-> ${3:contract} ${4:contract})\n  ${5:body})",
          doc: "(define/contract (name args) (-> in out) body)",
        },
        {
          label: "define-syntax-rule",
          detail: "Define a macro",
          insert:
            "(define-syntax-rule (${1:name} ${2:pattern})\n  ${3:template})",
          doc: "(define-syntax-rule (name pattern) template)",
        },
        {
          label: "struct",
          detail: "Define a structure type",
          insert: "(struct ${1:name} (${2:field}) #:transparent)",
          doc: "(struct name (field) #:transparent)",
        },
        {
          label: "lambda",
          detail: "Anonymous function",
          insert: "(lambda (${1:args})\n  ${2:body})",
          doc: "(lambda (args) body)",
        },
        {
          label: "λ",
          detail: "Anonymous function (unicode)",
          insert: "(λ (${1:args})\n  ${2:body})",
          doc: "(λ (args) body)",
        },
        {
          label: "let",
          detail: "Local bindings",
          insert: "(let ([${1:name} ${2:value}])\n  ${3:body})",
          doc: "(let ([name value]) body)",
        },
        {
          label: "let*",
          detail: "Sequential local bindings",
          insert: "(let* ([${1:name} ${2:value}])\n  ${3:body})",
          doc: "(let* ([name value]) body)",
        },
        {
          label: "letrec",
          detail: "Recursive local bindings",
          insert: "(letrec ([${1:name} ${2:value}])\n  ${3:body})",
          doc: "(letrec ([name value]) body)",
        },
        {
          label: "let loop",
          detail: "Named let loop",
          insert:
            "(let ${1:loop} ([${2:i} ${3:0}])\n  (if (${4:<} ${2:i} ${5:10})\n      (begin\n        ${6:body}\n        (${1:loop} (add1 ${2:i})))\n      ${7:done}))",
          doc: "(let loop ([i 0]) (if (< i 10) (loop (add1 i)) done))",
        },
        {
          label: "let-values",
          detail: "Bind multiple values",
          insert: "(let-values ([(${1:id}) ${2:expr}])\n  ${3:body})",
          doc: "(let-values ([(id) expr]) body)",
        },
        {
          label: "cond",
          detail: "Multi-way conditional",
          insert: "(cond\n  [${1:test} ${2:body}]\n  [else ${3:default}])",
          doc: "(cond [test body] [else default])",
        },
        {
          label: "case",
          detail: "Value dispatch",
          insert:
            "(case ${1:expr}\n  [(${2:datum}) ${3:body}]\n  [else ${4:default}])",
          doc: "(case expr [(datum) body] [else default])",
        },
        {
          label: "when",
          detail: "Conditional block",
          insert: "(when ${1:test}\n  ${2:body})",
          doc: "(when test body)",
        },
        {
          label: "unless",
          detail: "Negated conditional block",
          insert: "(unless ${1:test}\n  ${2:body})",
          doc: "(unless test body)",
        },
        {
          label: "for",
          detail: "Iterate for side effects",
          insert: "(for ([${1:i} (in-range ${2:10})])\n  ${3:body})",
          doc: "(for ([i (in-range 10)]) body)",
        },
        {
          label: "for/list",
          detail: "Iterate collecting a list",
          insert: "(for/list ([${1:i} (in-range ${2:10})])\n  ${3:body})",
          doc: "(for/list ([i (in-range 10)]) body)",
        },
        {
          label: "for/hash",
          detail: "Iterate collecting a hash",
          insert:
            "(for/hash ([${1:k} ${2:keys}])\n  (values ${1:k} ${3:value}))",
          doc: "(for/hash ([k keys]) (values k value))",
        },
        {
          label: "for/fold",
          detail: "Iterate with accumulators",
          insert:
            "(for/fold ([${1:acc} ${2:init}]) ([${3:i} ${4:lst}])\n  ${5:body})",
          doc: "(for/fold ([acc init]) ([i lst]) body)",
        },
        {
          label: "match",
          detail: "Pattern matching",
          insert:
            "(match ${1:expr}\n  [${2:pattern} ${3:body}]\n  [_ ${4:default}])",
          doc: "(match expr [pattern body] [_ default])",
        },
        {
          label: "match-lambda",
          detail: "Pattern-matching procedure",
          insert: "(match-lambda\n  [${1:pattern} ${2:body}]\n  [_ ${3:default}])",
          doc: "(match-lambda [pattern body] [_ default])",
        },
        {
          label: "define/match",
          detail: "Define a pattern-matching function",
          insert:
            "(define/match (${1:name} ${2:args})\n  [(${3:pattern}) ${4:body}])",
          doc: "(define/match (name args) [(pattern) body])",
        },
        {
          label: "with-handlers",
          detail: "Exception handling",
          insert:
            "(with-handlers ([${1:exn:fail?} ${2:handler}])\n  ${3:body})",
          doc: "(with-handlers ([exn:fail? handler]) body)",
        },
        {
          label: "parameterize",
          detail: "Dynamic binding",
          insert: "(parameterize ([${1:parameter} ${2:value}])\n  ${3:body})",
          doc: "(parameterize ([parameter value]) body)",
        },
        {
          label: "module+",
          detail: "Submodule",
          insert: "(module+ ${1:test}\n  ${2:body})",
          doc: "(module+ test body)",
        },
        {
          label: "require",
          detail: "Import a module",
          insert: "(require ${1:racket/list})",
          doc: "(require racket/list)",
        },
        {
          label: "provide",
          detail: "Export bindings",
          insert: "(provide ${1:name})",
          doc: "(provide name)",
        },
        {
          label: "dynamic-wind",
          detail: "Before/after cleanup",
          insert:
            "(dynamic-wind\n  (lambda () ${1:before})\n  (lambda () ${2:body})\n  (lambda () ${3:after}))",
          doc: "(dynamic-wind before thunk after)",
        },
        {
          label: "call-with-values",
          detail: "Consume multiple values",
          insert: "(call-with-values (lambda () (values ${1:v})) ${2:consumer})",
          doc: "(call-with-values producer consumer)",
        },
      ];

      for (const sn of snippets) {
        suggestions.push({
          label: sn.label,
          kind: K.Snippet,
          insertText: sn.insert,
          insertTextRules: S,
          detail: "Snippet: " + sn.detail,
          documentation: { value: "```racket\n" + sn.doc + "\n```" },
          range: range,
          sortText: "0_" + sn.label,
        });
      }

      for (const kw of ALL_FORMS) {
        const doc = DOCS[kw];
        suggestions.push({
          label: kw,
          kind: K.Keyword,
          insertText: kw,
          detail: kw.startsWith("define") || kw === "struct"
            ? "definition"
            : "special form / macro",
          documentation: doc
            ? { value: "```racket\n" + doc.s + "\n```\n" + doc.d }
            : undefined,
          range: range,
          sortText: "1_" + kw,
        });
      }

      for (const fn of CORE) {
        if (ALL_FORMS.includes(fn)) continue;
        const doc = DOCS[fn];
        suggestions.push({
          label: fn,
          kind: K.Function,
          insertText: fn,
          detail: "core",
          documentation: doc
            ? { value: "```racket\n" + doc.s + "\n```\n" + doc.d }
            : undefined,
          range: range,
          sortText: "2_" + fn,
        });
      }

      for (const c of CONSTANTS) {
        suggestions.push({
          label: c,
          kind: K.Constant,
          insertText: c,
          detail: "constant",
          range: range,
          sortText: "3_" + c,
        });
      }

      const userDefs = findUserDefs(model);
      const seen = new Set([...ALL_FORMS, ...CORE, ...CONSTANTS]);
      for (const def of userDefs) {
        if (seen.has(def.name)) continue;
        seen.add(def.name);
        suggestions.push({
          label: def.name,
          kind: def.kind === "function" ? K.Function : K.Variable,
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
          { value: "```racket\n" + doc.s + "\n```" },
          { value: doc.d },
        ];
        if (doc.e)
          parts.push({ value: "**Example:**\n```racket\n" + doc.e + "\n```" });
        return { range: hoverRange, contents: parts };
      }

      const userDefs = findUserDefs(model);
      for (const def of userDefs) {
        if (def.name !== word) continue;
        const defLine = model.getLineContent(def.line).trim();
        return {
          range: hoverRange,
          contents: [
            { value: "```racket\n" + defLine + "\n```" },
            {
              value: "User-defined " + def.kind + " — *line " + def.line + "*",
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
          kind:
            def.kind === "function"
              ? monaco.languages.SymbolKind.Function
              : def.kind === "macro"
                ? monaco.languages.SymbolKind.Module
                : def.kind === "struct"
                  ? monaco.languages.SymbolKind.Struct
                  : monaco.languages.SymbolKind.Variable,
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
      const includeDeclaration =
        !context || context.includeDeclaration !== false;
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
        /^([a-zA-Z!$%&*+\-.\/:<=>?@^_~][a-zA-Z0-9!$%&*+\-.\/:<=>?@^_~]*)/,
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

  // Extracts the argument tuple text of a user definition, used for signature
  // help. Handles both `(define (f a b) ...)` and `(define f ...)`.
  function getDefParams(model, def) {
    const startLine = def.line;
    const endLine = Math.min(model.getLineCount(), startLine + 20);
    const firstLine = model.getLineContent(startLine);
    const nameCol = def.col - 1;

    // Find the nearest opening bracket before the name.
    let open = -1;
    for (let i = nameCol - 1; i >= 0; i--) {
      if (firstLine[i] === "(" || firstLine[i] === "[") {
        open = i;
        break;
      }
      if (firstLine[i] === ")" || firstLine[i] === "]") break;
    }

    // If the name is not inside a group of its own, the arguments follow it.
    if (open < 0 || firstLine.slice(0, open).trim() === "") {
      open = -1;
      for (let i = nameCol + def.name.length; i < firstLine.length; i++) {
        if (firstLine[i] === "(" || firstLine[i] === "[") {
          open = i;
          break;
        }
        if (firstLine[i] === ")" || firstLine[i] === "]") break;
      }
      if (open < 0) return "";
    }

    let depth = 0;
    let collected = "";
    for (let i = startLine; i <= endLine; i++) {
      const line = model.getLineContent(i);
      const from = i === startLine ? open : 0;
      for (let c = from; c < line.length; c++) {
        const ch = line[c];
        collected += ch;
        if (ch === "(" || ch === "[") depth++;
        else if (ch === ")" || ch === "]") {
          depth--;
          if (depth === 0) {
            // `(define (name args) ...)` — drop the repeated name from the
            // parameter group so the signature reads `(name args)`.
            const escaped = def.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            const m = collected.match(
              new RegExp("^([\\(\\[])\\s*" + escaped + "\\s*([\\s\\S]*)$"),
            );
            return m ? m[1] + m[2] : collected;
          }
        }
      }
      collected += " ";
    }
    return collected;
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
      const line = model.getLineContent(position.lineNumber);
      const ch = line[position.column - 1];
      if (ch === ":" || ch === '"' || ch === "#") {
        return { rejectReason: "Cannot rename this element." };
      }
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
