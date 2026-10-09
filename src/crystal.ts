import type * as Monaco from "monaco-editor";

export default (monaco: typeof Monaco) => {
  // ============================================================
  //  DATA: Keywords, types, builtins
  // ============================================================
  const KEYWORDS = [
    "abstract",
    "alias",
    "annotation",
    "as",
    "asm",
    "begin",
    "break",
    "case",
    "class",
    "def",
    "do",
    "else",
    "elsif",
    "end",
    "ensure",
    "enum",
    "extend",
    "for",
    "fun",
    "if",
    "in",
    "include",
    "instance_sizeof",
    "is_a?",
    "lib",
    "macro",
    "module",
    "next",
    "of",
    "offsetof",
    "out",
    "pointerof",
    "private",
    "protected",
    "require",
    "rescue",
    "respond_to?",
    "return",
    "select",
    "self",
    "sizeof",
    "struct",
    "super",
    "then",
    "type",
    "typeof",
    "uninitialized",
    "union",
    "unless",
    "until",
    "verbatim",
    "when",
    "while",
    "with",
    "yield",
    "__DIR__",
    "__END_LINE__",
    "__FILE__",
    "__LINE__",
    "__TIME__",
  ];

  const CONSTANTS = ["true", "false", "nil", "self"];

  const TYPE_KEYWORDS = [
    "Bool",
    "Char",
    "String",
    "Symbol",
    "Nil",
    "Int8",
    "Int16",
    "Int32",
    "Int64",
    "Int128",
    "UInt8",
    "UInt16",
    "UInt32",
    "UInt64",
    "UInt128",
    "Float32",
    "Float64",
    "Number",
    "Array",
    "Hash",
    "Set",
    "Tuple",
    "NamedTuple",
    "StaticArray",
    "Slice",
    "Range",
    "Regex",
    "Proc",
    "Pointer",
    "Channel",
    "Fiber",
    "Mutex",
    "Atomic",
    "Time",
    "File",
    "Dir",
    "IO",
    "Memory",
    "Object",
    "Reference",
    "Struct",
    "Value",
    "Class",
    "Module",
    "Enumerable",
    "Iterator",
    "Indexable",
    "Comparable",
    "GC",
    "System",
    "Process",
    "Env",
    "Math",
    "Random",
    "Log",
    "JSON",
    "YAML",
    "HTTP",
    "Socket",
    "TCPServer",
    "TCPSocket",
    "UDPSocket",
    "Path",
    "UUID",
    "BigInt",
    "BigFloat",
    "BigRational",
    "Signal",
    "Errno",
    "Exception",
    "ArgumentError",
    "IndexError",
    "KeyError",
    "NameError",
    "NoMethodError",
    "NotSupportedError",
    "NotImplementedError",
    "IOError",
    "FileNotFoundError",
    "OverflowError",
    "RuntimeError",
    "TypeCastError",
    "NilAssertionError",
    "DivisionByZeroError",
    "InvalidByteSequenceError",
  ];

  const BUILTIN_FUNCTIONS = [
    "puts",
    "print",
    "p",
    "pp",
    "gets",
    "read_line",
    "raise",
    "loop",
    "spawn",
    "sleep",
    "exit",
    "abort",
    "rand",
    "srand",
    "typeof",
    "sizeof",
    "instance_sizeof",
    "offsetof",
    "pointerof",
    "yield",
    "system",
    "caller",
    "sprintf",
    "printf",
    "at_exit",
    "fork",
    "open",
  ];

  const ANNOTATIONS = [
    "Link",
    "Flags",
    "Extern",
    "CallConvention",
    "Deprecated",
    "Experimental",
    "AlwaysInline",
    "NoInline",
    "Packed",
    "ThreadLocal",
    "Primitive",
    "Raises",
    "Deprecated",
  ];

  const STDLIB = [
    "array",
    "atomic",
    "base64",
    "benchmark",
    "big",
    "bit_array",
    "cgi",
    "channel",
    "char",
    "class",
    "colorize",
    "comparable",
    "compress",
    "concurrent",
    "crypto",
    "csv",
    "digest",
    "dir",
    "ecr",
    "enum",
    "enumerable",
    "env",
    "errno",
    "exception",
    "file",
    "file_utils",
    "gc",
    "hash",
    "html",
    "http",
    "indexable",
    "ini",
    "io",
    "iterator",
    "json",
    "log",
    "markdown",
    "math",
    "mime",
    "mutex",
    "named_tuple",
    "nil",
    "number",
    "object",
    "option_parser",
    "path",
    "pointer",
    "process",
    "random",
    "range",
    "regex",
    "set",
    "signal",
    "slice",
    "socket",
    "spec",
    "string",
    "string_scanner",
    "symbol",
    "system",
    "tempfile",
    "time",
    "tuple",
    "union",
    "uri",
    "uuid",
    "weak_ref",
    "xml",
    "yaml",
    "zlib",
  ];

  // ============================================================
  //  DATA: Hover documentation
  // ============================================================
  const HOVER_DOCS: Record<string, { sig?: string; doc: string }> = {
    abstract: {
      sig: "abstract class Name\nend",
      doc: "Declares an abstract class or method. Abstract types cannot be instantiated and abstract methods must be implemented by subclasses.",
    },
    alias: {
      sig: "alias Name = Type1 | Type2",
      doc: "Creates a type alias. Aliases are replaced by the compiler and cannot be reopened.",
    },
    annotation: {
      sig: "annotation Name\nend",
      doc: "Declares an annotation, applied with @[Name]. Used to attach metadata to types and methods.",
    },
    as: {
      sig: "expression.as(Type)",
      doc: "Restricts the type of an expression, raising at runtime if the value is not of that type.",
    },
    asm: {
      sig: "asm(\"instruction\" : \"outputs\" : \"inputs\" : \"clobbers\")",
      doc: "Inserts inline assembly. Platform specific.",
    },
    begin: {
      sig: "begin\n  body\nrescue ex\n  handle\nensure\n  cleanup\nend",
      doc: "Begins an exception-handling block, or groups expressions as a single one.",
    },
    break: {
      sig: "break\nbreak value",
      doc: "Breaks out of the nearest enclosing loop or block, optionally with a value.",
    },
    case: {
      sig: "case value\nwhen x\n  body\nelse\n  body\nend",
      doc: "Case expression and exhaustive pattern matching. when clauses are matched top to bottom.",
    },
    class: {
      sig: "class Name < Super\n  body\nend",
      doc: "Defines or reopens a class. Classes are reference types allocated on the heap.",
    },
    def: {
      sig: "def name(arg : Type = default) : ReturnType\n  body\nend",
      doc: "Defines a method. Types for arguments and return value are inferred when omitted.",
    },
    do: {
      sig: "collection.each do |item|\n  body\nend",
      doc: "Begins a multi-line block passed to a method. Use { ... } for a single-line block.",
    },
    else: {
      sig: "else",
      doc: "Default branch when no prior condition matched.",
    },
    elsif: {
      sig: "elsif condition",
      doc: "Additional conditional branch in an if expression.",
    },
    end: {
      sig: "end",
      doc: "Closes a def, class, module, struct, enum, lib, macro, or block that was opened with do, if, unless, while, until, for, case, begin, or select.",
    },
    ensure: {
      sig: "ensure\n  cleanup",
      doc: "Runs code that always executes, whether or not an exception was raised. Similar to finally.",
    },
    enum: {
      sig: "enum Name\n  Member\n  Other = 3\nend",
      doc: "Declares an enumeration. Members are constants of the enum type and can carry integer values.",
    },
    extend: {
      sig: "extend ModuleName",
      doc: "Adds a module's methods as class methods of the current type.",
    },
    for: {
      sig: "for item in collection\n  body\nend",
      doc: "Iterates over a collection. Prefer .each in idiomatic Crystal.",
    },
    fun: {
      sig: "fun name(arg : Type) : ReturnType",
      doc: "Declares a C function inside a lib. Used for FFI bindings.",
    },
    if: {
      sig: "if condition\n  body\nelsif other\n  body\nelse\n  body\nend",
      doc: "Conditional branch, or an expression yielding the branch value. Only nil and false are falsy.",
    },
    include: {
      sig: "include ModuleName",
      doc: "Mixes a module's instance methods into the current type.",
    },
    instance_sizeof: {
      sig: "instance_sizeof(Type)",
      doc: "Returns the size in bytes of an instance of the given type.",
    },
    "is_a?": {
      sig: "obj.is_a?(Type) : Bool",
      doc: "Returns true if the runtime type of the receiver is the given type or a subtype of it.",
    },
    lib: {
      sig: "lib LibName\n  fun c_function : Void\nend",
      doc: "Declares a binding to a C library. Contains fun, struct, enum, alias, and constant declarations.",
    },
    macro: {
      sig: "macro name(args)\n  body\nend",
      doc: "Defines a macro that is expanded at compile time. Macro bodies are written in the macro language.",
    },
    module: {
      sig: "module Name\n  body\nend",
      doc: "Defines a module. Modules group types, constants, and methods and can be included or extended.",
    },
    next: {
      sig: "next\nnext value",
      doc: "Skips to the next iteration of the nearest enclosing loop or block.",
    },
    nil: {
      sig: "Nil",
      doc: "The only instance of Nil. Represents the absence of a value. Falsy.",
    },
    of: {
      sig: "Array(Int32 | String) of Int32, String",
      doc: "Used for generic instantiation and union type restrictions.",
    },
    out: {
      sig: "def f(out x : Int32)",
      doc: "Marks a parameter as an output parameter. The argument must be a variable and is assigned by the callee.",
    },
    pointerof: {
      sig: "pointerof(var)",
      doc: "Returns a Pointer to the given variable or instance variable.",
    },
    private: {
      sig: "private def name",
      doc: "Makes a method or type private to the enclosing namespace.",
    },
    protected: {
      sig: "protected def name",
      doc: "Makes a method accessible only from instances of the same type or its subclasses.",
    },
    require: {
      sig: 'require "library"',
      doc: "Loads a file or standard library. Each file is loaded at most once.",
    },
    rescue: {
      sig: "rescue ex : ExClass\n  handle",
      doc: "Catches an exception raised in a begin block or method body. Without a class it catches Exception.",
    },
    "respond_to?": {
      sig: "obj.respond_to?(:method) : Bool",
      doc: "Returns true if the object responds to the given method name.",
    },
    return: {
      sig: "return\nreturn value",
      doc: "Returns from the current method. The last expression of a method is implicitly returned.",
    },
    select: {
      sig: "select\nwhen x = ch.receive\n  body\nend",
      doc: "Waits for one of several channel operations to become ready. Every when must be a channel send or receive.",
    },
    self: {
      sig: "self",
      doc: "Refers to the current object. In a def with a receiver, self is the receiver's instance.",
    },
    sizeof: {
      sig: "sizeof(Type)",
      doc: "Returns the size in bytes of the given type.",
    },
    struct: {
      sig: "struct Name\n  body\nend",
      doc: "Defines a value type. Structs are passed by value and copied on assignment.",
    },
    super: {
      sig: "super\nsuper(args)",
      doc: "Calls the same-named method in the superclass. Without arguments, forwards the current arguments.",
    },
    then: {
      sig: "expression.then { |value| ... }",
      doc: "Yields the receiver to the block and returns the block's value.",
    },
    type: {
      sig: "obj.class",
      doc: "The metaclass of a value. In type restrictions, refers to the literal type of an argument.",
    },
    typeof: {
      sig: "typeof(expression)",
      doc: "Returns the compile-time type of an expression as a type. Also used to declare a variable by inference.",
    },
    uninitialized: {
      sig: "uninitialized Type",
      doc: "Creates an instance whose memory is not initialized. Used inside initialize for performance.",
    },
    union: {
      sig: "union Name\n  field : Type\nend",
      doc: "Declares a C union inside a lib binding. All members share the same memory.",
    },
    unless: {
      sig: "unless condition\n  body\nend",
      doc: "Inverse conditional. Executes the body when the condition is falsy.",
    },
    until: {
      sig: "until condition\n  body\nend",
      doc: "Repeats the body until the condition becomes truthy.",
    },
    verbatim: {
      sig: "verbatim do\n  # macro code\nend",
      doc: "Runs code verbatim inside a macro without macro-language interpretation.",
    },
    when: {
      sig: "when value",
      doc: "A branch of a case expression or a select statement.",
    },
    while: {
      sig: "while condition\n  body\nend",
      doc: "Repeats the body while the condition is truthy.",
    },
    with: {
      sig: "with obj yield",
      doc: "Calls the block with the receiver as an implicit receiver (the default object) inside it.",
    },
    yield: {
      sig: "yield args",
      doc: "Invokes the block passed to the current method. Yields to the block given to the enclosing macro in macro bodies.",
    },

    String: {
      sig: "class String",
      doc: "An immutable sequence of UTF-8 encoded bytes. Supports interpolation with #{} in double quotes.",
    },
    Symbol: {
      sig: "class Symbol",
      doc: "An immutable, interned identifier written :name. Symbols are unique and cheap to compare.",
    },
    Char: {
      sig: "struct Char",
      doc: "A Unicode code point, written 'a'. Backed by a 32-bit integer.",
    },
    Bool: {
      sig: "struct Bool",
      doc: "A boolean value, either true or false. The only falsy values in Crystal are false and nil.",
    },
    Nil: {
      sig: "struct Nil",
      doc: "The type of nil, whose only instance is nil. Falsy.",
    },
    Int32: {
      sig: "struct Int32",
      doc: "A 32-bit signed integer. The default integer type. Fixed-width two's-complement integer.",
    },
    Int64: {
      sig: "struct Int64",
      doc: "A 64-bit signed integer. Literals use the _i64 suffix.",
    },
    UInt8: {
      sig: "struct UInt8",
      doc: "An 8-bit unsigned integer. Literals use the _u8 suffix.",
    },
    Float64: {
      sig: "struct Float64",
      doc: "A 64-bit IEEE 754 double-precision floating point number. The default float type.",
    },
    Float32: {
      sig: "struct Float32",
      doc: "A 32-bit IEEE 754 single-precision floating point number. Literals use the _f32 suffix.",
    },
    Array: {
      sig: "class Array(T)",
      doc: "A resizable, ordered, zero-indexed collection. Generic over its element type.",
    },
    Hash: {
      sig: "class Hash(K, V)",
      doc: "A collection of key-value pairs. Keys are unique. Preserves insertion order.",
    },
    Set: {
      sig: "class Set(T)",
      doc: "A collection of unique unordered values backed by a Hash.",
    },
    Tuple: {
      sig: "struct Tuple(*T)",
      doc: "A fixed-size, immutable collection of heterogeneous values, written {1, \"a\"}.",
    },
    NamedTuple: {
      sig: "struct NamedTuple(**T)",
      doc: "A fixed-size, immutable collection of named heterogeneous values, written {x: 1, y: 2}.",
    },
    StaticArray: {
      sig: "struct StaticArray(T, N)",
      doc: "A fixed-size array allocated inline (typically on the stack).",
    },
    Slice: {
      sig: "struct Slice(T)",
      doc: "A view into a contiguous region of memory with an offset and a size.",
    },
    Range: {
      sig: "struct Range(B, E)",
      doc: "An interval between two values. 1..5 is inclusive, 1...5 excludes the end.",
    },
    Regex: {
      sig: "class Regex",
      doc: "A regular expression pattern written /.../ or Regex.new. Backed by PCRE.",
    },
    Proc: {
      sig: "class Proc(*T, R)",
      doc: "A function pointer combined with an optional closure. Captures the enclosing context.",
    },
    Pointer: {
      sig: "struct Pointer(T)",
      doc: "A typed pointer to memory. Supports arithmetic and dereferencing with value and [].",
    },
    Channel: {
      sig: "class Channel(T)",
      doc: "A typed, buffered or unbuffered communication pipe for fiber concurrency.",
    },
    Fiber: {
      sig: "class Fiber",
      doc: "A lightweight cooperative thread of execution. Many fibers run on a single OS thread.",
    },
    Mutex: {
      sig: "class Mutex",
      doc: "A mutual-exclusion lock for protecting shared state across fibers.",
    },
    Atomic: {
      sig: "struct Atomic(T)",
      doc: "A wrapper providing atomic (lock-free) operations on a value.",
    },
    Time: {
      sig: "struct Time",
      doc: "Represents a point in time with a date, clock time, and timezone.",
    },
    File: {
      sig: "class File < IO",
      doc: "Represents a file on the filesystem and provides reading, writing, and metadata operations.",
    },
    Dir: {
      sig: "class Dir",
      doc: "Provides access to directories: listing, globbing, and changing the working directory.",
    },
    IO: {
      sig: "abstract class IO",
      doc: "The base class for all input/output streams. Provides read, write, and buffering.",
    },
    Object: {
      sig: "class Object",
      doc: "The base type of everything except value types' primitives. All reference types inherit from it.",
    },
    Struct: {
      sig: "abstract struct Struct",
      doc: "The base type of all value types. Structs have value semantics and are copied on assignment.",
    },
    Reference: {
      sig: "abstract class Reference",
      doc: "The base class of all heap-allocated reference types. Instances are pointers.",
    },
    Exception: {
      sig: "class Exception",
      doc: "The root of the exception hierarchy. Prefer rescuing specific subclasses.",
    },
    ArgumentError: {
      sig: "class ArgumentError < Exception",
      doc: "Raised when a method receives an argument it cannot handle.",
    },
    IndexError: {
      sig: "class IndexError < Exception",
      doc: "Raised when an index is out of bounds.",
    },
    KeyError: {
      sig: "class KeyError < Exception",
      doc: "Raised when a key is not found in a Hash.",
    },
    NilAssertionError: {
      sig: "class NilAssertionError < Exception",
      doc: "Raised by not_nil! (and the .not_nil! method) when the receiver is nil.",
    },
    FileNotFoundError: {
      sig: "class FileNotFoundError < IOError",
      doc: "Raised when opening a file that does not exist.",
    },

    puts: {
      sig: "puts(*objects) : Nil",
      doc: "Writes each argument to stdout followed by a newline. With no arguments writes a single newline.",
    },
    print: {
      sig: "print(*objects) : Nil",
      doc: "Writes each argument to stdout without a trailing newline.",
    },
    p: {
      sig: "p(*objects) : Nil",
      doc: "Calls .inspect on each argument and writes it to stdout, followed by a newline. Useful for debugging.",
    },
    pp: {
      sig: "pp(*objects) : Nil",
      doc: "Pretty-prints each argument to stdout. Useful for nested structures.",
    },
    gets: {
      sig: "gets(chomp = true) : String?",
      doc: "Reads a line from stdin, or returns nil at end of input.",
    },
    raise: {
      sig: "raise(message : String)\nraise(exception : Exception)",
      doc: "Raises an exception. With a string it raises Exception with that message.",
    },
    loop: {
      sig: "loop\n  body\nend",
      doc: "Repeats the block forever, or until it returns break.",
    },
    spawn: {
      sig: "spawn { ... }",
      doc: "Runs the block in a new fiber, allowing concurrent execution.",
    },
    sleep: {
      sig: "sleep(seconds : Number) : Nil",
      doc: "Suspends the current fiber for the given number of seconds.",
    },
    exit: {
      sig: "exit(status = 0) : NoReturn",
      doc: "Terminates the program with the given status code.",
    },
    abort: {
      sig: 'abort(message = "Aborted", status = 1) : NoReturn',
      doc: "Prints the message to stderr and terminates the program.",
    },
    rand: {
      sig: "rand(max = 1) : Float64\nrand(max : Int) : Int",
      doc: "Returns a pseudo-random number from the default Random instance.",
    },
    system: {
      sig: "system(command : String) : Bool",
      doc: "Runs a command in a subshell and returns whether it exited successfully.",
    },
    sprintf: {
      sig: 'sprintf(format : String, args) : String',
      doc: "Formats the arguments according to the printf-style format string.",
    },
    caller: {
      sig: "caller : Array(String)",
      doc: "Returns the current execution stack as an array of strings.",
    },
  };

  // ============================================================
  //  DATA: Method completions after a dot
  // ============================================================
  const METHOD_ITEMS: { label: string; sig: string; doc: string }[] = [
    {
      label: "each",
      sig: "each(&block) : Nil",
      doc: "Yields each element to the block.",
    },
    {
      label: "each_with_index",
      sig: "each_with_index(&block) : Nil",
      doc: "Yields each element together with its index.",
    },
    {
      label: "map",
      sig: "map(&block) : Array(U)",
      doc: "Returns an array of the block's results.",
    },
    {
      label: "flat_map",
      sig: "flat_map(&block) : Array(U)",
      doc: "Maps each element and concatenates the resulting collections.",
    },
    {
      label: "select",
      sig: "select(&block) : Array(T)",
      doc: "Returns the elements for which the block is truthy.",
    },
    {
      label: "reject",
      sig: "reject(&block) : Array(T)",
      doc: "Returns the elements for which the block is falsy.",
    },
    {
      label: "reduce",
      sig: "reduce(initial, &block) : U",
      doc: "Combines the elements using the block, starting from the initial value.",
    },
    {
      label: "sum",
      sig: "sum : T",
      doc: "Returns the sum of all elements.",
    },
    {
      label: "product",
      sig: "product : T",
      doc: "Returns the product of all elements.",
    },
    {
      label: "min",
      sig: "min : T",
      doc: "Returns the smallest element.",
    },
    {
      label: "max",
      sig: "max : T",
      doc: "Returns the largest element.",
    },
    {
      label: "min_by",
      sig: "min_by(&block) : T",
      doc: "Returns the element for which the block returns the smallest value.",
    },
    {
      label: "max_by",
      sig: "max_by(&block) : T",
      doc: "Returns the element for which the block returns the largest value.",
    },
    {
      label: "sort",
      sig: "sort : Array(T)",
      doc: "Returns a new array sorted in ascending order.",
    },
    {
      label: "sort_by",
      sig: "sort_by(&block) : Array(T)",
      doc: "Returns a new array sorted by the block's value.",
    },
    {
      label: "reverse",
      sig: "reverse : Array(T)",
      doc: "Returns a new collection with the elements reversed.",
    },
    {
      label: "uniq",
      sig: "uniq : Array(T)",
      doc: "Returns a new collection with duplicate elements removed.",
    },
    {
      label: "flatten",
      sig: "flatten : Array(T)",
      doc: "Returns a new array with nested arrays flattened recursively.",
    },
    {
      label: "compact",
      sig: "compact : Array(T)",
      doc: "Returns a new array with all nil elements removed.",
    },
    {
      label: "first",
      sig: "first : T",
      doc: "Returns the first element. Raises if empty.",
    },
    {
      label: "first?",
      sig: "first? : T?",
      doc: "Returns the first element, or nil if empty.",
    },
    {
      label: "last",
      sig: "last : T",
      doc: "Returns the last element. Raises if empty.",
    },
    {
      label: "last?",
      sig: "last? : T?",
      doc: "Returns the last element, or nil if empty.",
    },
    {
      label: "size",
      sig: "size : Int32",
      doc: "Returns the number of elements.",
    },
    {
      label: "empty?",
      sig: "empty? : Bool",
      doc: "Returns true if there are no elements.",
    },
    {
      label: "any?",
      sig: "any?(&block) : Bool",
      doc: "Returns true if the block is truthy for any element, or if the collection is non-empty.",
    },
    {
      label: "all?",
      sig: "all?(&block) : Bool",
      doc: "Returns true if the block is truthy for every element.",
    },
    {
      label: "none?",
      sig: "none?(&block) : Bool",
      doc: "Returns true if the block is falsy for every element.",
    },
    {
      label: "count",
      sig: "count(&block) : Int32",
      doc: "Returns the number of elements matching the block, or the total count.",
    },
    {
      label: "includes?",
      sig: "includes?(object) : Bool",
      doc: "Returns true if the collection contains the given object.",
    },
    {
      label: "index",
      sig: "index(&block) : Int32?",
      doc: "Returns the index of the first matching element, or nil.",
    },
    {
      label: "find",
      sig: "find(&block) : T?",
      doc: "Returns the first element for which the block is truthy, or nil.",
    },
    {
      label: "index_by",
      sig: "index_by(&block) : Hash(U, T)",
      doc: "Returns a hash keyed by the block's value.",
    },
    {
      label: "group_by",
      sig: "group_by(&block) : Hash(U, Array(T))",
      doc: "Groups the elements by the block's value.",
    },
    {
      label: "partition",
      sig: "partition(&block) : Tuple(Array(T), Array(T))",
      doc: "Splits the elements into truthy and falsy groups.",
    },
    {
      label: "zip",
      sig: "zip(other) : Array(Tuple(T, U))",
      doc: "Combines elements with those of other collections into tuples.",
    },
    {
      label: "join",
      sig: "join(separator = \"\") : String",
      doc: "Joins the string form of each element with the separator.",
    },
    {
      label: "to_a",
      sig: "to_a : Array(T)",
      doc: "Returns an array of the elements.",
    },
    {
      label: "to_s",
      sig: "to_s : String",
      doc: "Returns a string representation of the object.",
    },
    {
      label: "inspect",
      sig: "inspect : String",
      doc: "Returns a debug representation of the object, suited for developers.",
    },
    {
      label: "tap",
      sig: "tap(&block) : self",
      doc: "Yields self to the block and returns self.",
    },
    {
      label: "try",
      sig: "try(&block) : U?",
      doc: "Yields self to the block and returns its value, or nil if the receiver is nil.",
    },
    {
      label: "not_nil!",
      sig: "not_nil! : T",
      doc: "Asserts that the receiver is not nil, raising NilAssertionError otherwise.",
    },
    {
      label: "is_a?",
      sig: "is_a?(Type) : Bool",
      doc: "Returns true if the object is of the given type or a subtype.",
    },
    {
      label: "responds_to?",
      sig: "responds_to?(:method) : Bool",
      doc: "Returns true if the object has the given method.",
    },
    {
      label: "as",
      sig: "as(Type) : Type",
      doc: "Restricts the type, raising TypeCastError on a runtime mismatch.",
    },
    {
      label: "as?",
      sig: "as?(Type) : Type?",
      doc: "Restricts the type, returning nil on a runtime mismatch.",
    },
    {
      label: "class",
      sig: "class : Class",
      doc: "Returns the runtime class of the object.",
    },
    {
      label: "dup",
      sig: "dup : self",
      doc: "Returns a shallow copy of the object.",
    },
    {
      label: "clone",
      sig: "clone : self",
      doc: "Returns a copy of the object with all instance variables cloned.",
    },
    {
      label: "hash",
      sig: "hash : UInt64",
      doc: "Returns a hash value for the object. Used with Hash and Set.",
    },
    {
      label: "object_id",
      sig: "object_id : UInt64",
      doc: "Returns a unique identifier for the object.",
    },
    {
      label: "=== ",
      sig: "obj === other : Bool",
      doc: "Case-equality. By default the same as ==, used in case/when comparisons.",
    },
    // String
    {
      label: "upcase",
      sig: "upcase : String",
      doc: "Returns a new string with all characters converted to uppercase.",
    },
    {
      label: "downcase",
      sig: "downcase : String",
      doc: "Returns a new string with all characters converted to lowercase.",
    },
    {
      label: "capitalize",
      sig: "capitalize : String",
      doc: "Returns a string with the first character uppercased and the rest lowercased.",
    },
    {
      label: "strip",
      sig: "strip : String",
      doc: "Returns a string with leading and trailing whitespace removed.",
    },
    {
      label: "chomp",
      sig: "chomp : String",
      doc: "Returns a string with a trailing newline removed.",
    },
    {
      label: "split",
      sig: "split(separator = \$/) : Array(String)",
      doc: "Splits the string on the separator (default whitespace).",
    },
    {
      label: "gsub",
      sig: "gsub(pattern, replacement) : String",
      doc: "Returns a string with all occurrences of the pattern replaced.",
    },
    {
      label: "sub",
      sig: "sub(pattern, replacement) : String",
      doc: "Returns a string with the first occurrence of the pattern replaced.",
    },
    {
      label: "matches?",
      sig: "matches?(regex : Regex) : Bool",
      doc: "Returns true if the string matches the regular expression.",
    },
    {
      label: "index",
      sig: "index(search, offset = 0) : Int32?",
      doc: "Returns the index of the first occurrence of search, or nil.",
    },
    {
      label: "starts_with?",
      sig: "starts_with?(*prefixes) : Bool",
      doc: "Returns true if the string begins with any of the given prefixes.",
    },
    {
      label: "ends_with?",
      sig: "ends_with?(*suffixes) : Bool",
      doc: "Returns true if the string ends with any of the given suffixes.",
    },
    {
      label: "blank?",
      sig: "blank? : Bool",
      doc: "Returns true if the string is empty or contains only whitespace.",
    },
    {
      label: "to_i",
      sig: "to_i(base = 10) : Int32",
      doc: "Returns the integer value of the string. Raises on invalid input.",
    },
    {
      label: "to_i?",
      sig: "to_i?(base = 10) : Int32?",
      doc: "Returns the integer value of the string, or nil if it is not a valid integer.",
    },
    {
      label: "to_f",
      sig: "to_f : Float64",
      doc: "Returns the floating-point value of the string, or 0.0 if invalid.",
    },
    {
      label: "to_f?",
      sig: "to_f? : Float64?",
      doc: "Returns the floating-point value of the string, or nil if invalid.",
    },
    {
      label: "chars",
      sig: "chars : Array(Char)",
      doc: "Returns an array of the string's characters.",
    },
    {
      label: "lines",
      sig: "lines(chomp = true) : Array(String)",
      doc: "Returns an array of the string's lines.",
    },
    {
      label: "delete",
      sig: "delete(char : Char) : String",
      doc: "Returns a new string with each occurrence of the character removed.",
    },
    {
      label: "tr",
      sig: "tr(from : String, to : String) : String",
      doc: "Returns a string with characters translated, like tr(1).",
    },
    {
      label: "ljust",
      sig: "ljust(width, char = ' ') : String",
      doc: "Left-justifies the string in a field of the given width.",
    },
    {
      label: "rjust",
      sig: "rjust(width, char = ' ') : String",
      doc: "Right-justifies the string in a field of the given width.",
    },
    {
      label: "center",
      sig: "center(width, char = ' ') : String",
      doc: "Centers the string in a field of the given width.",
    },
    {
      label: "size",
      sig: "size : Int32",
      doc: "Returns the number of characters in the string.",
    },
    {
      label: "byte_size",
      sig: "byte_size : Int32",
      doc: "Returns the number of bytes in the string.",
    },
    // Array
    {
      label: "push",
      sig: "push(value : T) : self",
      doc: "Appends one or more elements and returns self.",
    },
    {
      label: "pop",
      sig: "pop : T",
      doc: "Removes and returns the last element. Raises if empty.",
    },
    {
      label: "pop?",
      sig: "pop? : T?",
      doc: "Removes and returns the last element, or nil if empty.",
    },
    {
      label: "shift",
      sig: "shift : T",
      doc: "Removes and returns the first element. Raises if empty.",
    },
    {
      label: "shift?",
      sig: "shift? : T?",
      doc: "Removes and returns the first element, or nil if empty.",
    },
    {
      label: "unshift",
      sig: "unshift(value : T) : self",
      doc: "Prepends one or more elements and returns self.",
    },
    {
      label: "insert",
      sig: "insert(index : Int, value : T) : self",
      doc: "Inserts the value at the given index.",
    },
    {
      label: "delete_at",
      sig: "delete_at(index : Int) : T",
      doc: "Removes and returns the element at the given index.",
    },
    {
      label: "delete_at?",
      sig: "delete_at?(index : Int) : T?",
      doc: "Removes and returns the element at the index, or nil.",
    },
    {
      label: "clear",
      sig: "clear : self",
      doc: "Removes all elements and returns self.",
    },
    {
      label: "sample",
      sig: "sample(n = 1) : T",
      doc: "Returns a random element (or n elements).",
    },
    {
      label: "shuffle",
      sig: "shuffle : Array(T)",
      doc: "Returns a new array with the elements randomly shuffled.",
    },
    {
      label: "rotate",
      sig: "rotate(n = 1) : Array(T)",
      doc: "Returns a new array rotated by n positions.",
    },
    {
      label: "concat",
      sig: "concat(other : Enumerable) : self",
      doc: "Appends the elements of another collection to self.",
    },
    // Hash
    {
      label: "keys",
      sig: "keys : Array(K)",
      doc: "Returns an array of the hash's keys.",
    },
    {
      label: "values",
      sig: "values : Array(V)",
      doc: "Returns an array of the hash's values.",
    },
    {
      label: "has_key?",
      sig: "has_key?(key) : Bool",
      doc: "Returns true if the key exists in the hash.",
    },
    {
      label: "fetch",
      sig: "fetch(key, default) : V",
      doc: "Returns the value for the key, returning the default if missing.",
    },
    {
      label: "merge",
      sig: "merge(other : Hash) : Hash",
      doc: "Returns a new hash with the other hash's entries merged in.",
    },
    {
      label: "dig",
      sig: "dig(key, *keys) : V",
      doc: "Traverses nested hashes and arrays, returning nil if any step is missing.",
    },
    {
      label: "each_value",
      sig: "each_value(&block) : Nil",
      doc: "Yields each value to the block.",
    },
    {
      label: "each_key",
      sig: "each_key(&block) : Nil",
      doc: "Yields each key to the block.",
    },
    // Numeric
    {
      label: "times",
      sig: "times(&block) : Nil",
      doc: "Yields 0 up to (but not including) the receiver.",
    },
    {
      label: "upto",
      sig: "upto(limit, &block) : Nil",
      doc: "Yields the receiver up to and including the limit.",
    },
    {
      label: "downto",
      sig: "downto(limit, &block) : Nil",
      doc: "Yields the receiver down to and including the limit.",
    },
    {
      label: "succ",
      sig: "succ : Int",
      doc: "Returns the successor (the receiver plus one).",
    },
    {
      label: "abs",
      sig: "abs : self",
      doc: "Returns the absolute value.",
    },
    {
      label: "clamp",
      sig: "clamp(min, max) : self",
      doc: "Returns the value limited to the range between min and max.",
    },
    {
      label: "round",
      sig: "round(digits = 0) : self",
      doc: "Rounds the value to the given number of decimal digits.",
    },
    {
      label: "floor",
      sig: "floor : self",
      doc: "Returns the largest integer less than or equal to the value.",
    },
    {
      label: "ceil",
      sig: "ceil : self",
      doc: "Returns the smallest integer greater than or equal to the value.",
    },
    {
      label: "gcd",
      sig: "gcd(other) : self",
      doc: "Returns the greatest common divisor of the receiver and other.",
    },
    {
      label: "to_s",
      sig: "to_s(base = 10) : String",
      doc: "Returns the string representation of the number in the given base.",
    },
  ];

  // ============================================================
  //  DATA: Snippets
  // ============================================================
  const SNIPPETS: { label: string; detail: string; body: string }[] = [
    {
      label: "def",
      detail: "Method definition",
      body: "def ${1:name}(${2:args})\n\t${3:body}\nend",
    },
    {
      label: "deft",
      detail: "Typed method definition",
      body: "def ${1:name}(${2:arg} : ${3:Type}) : ${4:ReturnType}\n\t${5:body}\nend",
    },
    {
      label: "defself",
      detail: "Class method definition",
      body: "def self.${1:name}(${2:args})\n\t${3:body}\nend",
    },
    {
      label: "defq",
      detail: "Predicate method definition",
      body: "def ${1:name}? : Bool\n\t${2:true}\nend",
    },
    {
      label: "initialize",
      detail: "Constructor",
      body: "def initialize(${1:arg} : ${2:Type})\n\t@${1:arg} = ${1:arg}\nend",
    },
    {
      label: "class",
      detail: "Class definition",
      body: "class ${1:Name}\n\t${2:body}\nend",
    },
    {
      label: "classi",
      detail: "Class with superclass",
      body: "class ${1:Name} < ${2:Super}\n\t${3:body}\nend",
    },
    {
      label: "classg",
      detail: "Generic class",
      body: "class ${1:Name}(${2:T})\n\t${3:body}\nend",
    },
    {
      label: "struct",
      detail: "Struct definition",
      body: "struct ${1:Name}\n\t${2:body}\nend",
    },
    {
      label: "module",
      detail: "Module definition",
      body: "module ${1:Name}\n\t${2:body}\nend",
    },
    {
      label: "enum",
      detail: "Enum definition",
      body: "enum ${1:Name}\n\t${2:Member}\n\t${3:Other}\nend",
    },
    {
      label: "enumv",
      detail: "Enum with integer values",
      body: "enum ${1:Name}\n\t${2:Member} = ${3:1}\n\t${4:Other} = ${5:2}\nend",
    },
    {
      label: "lib",
      detail: "C library binding",
      body: "lib ${1:LibName}\n\tfun ${2:c_function}(${3:arg} : ${4:Type}) : ${5:Void}\nend",
    },
    {
      label: "annotation",
      detail: "Annotation definition",
      body: "annotation ${1:Name}\nend",
    },
    {
      label: "macro",
      detail: "Macro definition",
      body: "macro ${1:name}(${2:args})\n\t${3:body}\nend",
    },
    {
      label: "alias",
      detail: "Type alias",
      body: "alias ${1:Name} = ${2:Type}",
    },
    {
      label: "record",
      detail: "Record macro",
      body: "record ${1:Name}, ${2:field} : ${3:Type}",
    },
    {
      label: "if",
      detail: "If statement",
      body: "if ${1:condition}\n\t${2:body}\nend",
    },
    {
      label: "ife",
      detail: "If / else statement",
      body: "if ${1:condition}\n\t${2:then}\nelse\n\t${3:otherwise}\nend",
    },
    {
      label: "ifee",
      detail: "If / elsif / else statement",
      body: "if ${1:condition}\n\t${2:then}\nelsif ${3:other}\n\t${4:otherwise}\nelse\n\t${5:fallback}\nend",
    },
    {
      label: "unless",
      detail: "Unless statement",
      body: "unless ${1:condition}\n\t${2:body}\nend",
    },
    {
      label: "case",
      detail: "Case expression",
      body: "case ${1:value}\nwhen ${2:pattern}\n\t${3:body}\nelse\n\t${4:fallback}\nend",
    },
    {
      label: "while",
      detail: "While loop",
      body: "while ${1:condition}\n\t${2:body}\nend",
    },
    {
      label: "until",
      detail: "Until loop",
      body: "until ${1:condition}\n\t${2:body}\nend",
    },
    {
      label: "times",
      detail: "Times block",
      body: "${1:n}.times do |${2:i}|\n\t${3:body}\nend",
    },
    {
      label: "each",
      detail: "Each block",
      body: "${1:collection}.each do |${2:item}|\n\t${3:body}\nend",
    },
    {
      label: "each_with_index",
      detail: "Each with index block",
      body: "${1:collection}.each_with_index do |${2:item}, ${3:index}|\n\t${4:body}\nend",
    },
    {
      label: "map",
      detail: "Map block",
      body: "${1:collection}.map { |${2:item}| ${3:expression} }",
    },
    {
      label: "select",
      detail: "Select block",
      body: "${1:collection}.select { |${2:item}| ${3:condition} }",
    },
    {
      label: "begin",
      detail: "Exception handling",
      body: "begin\n\t${1:body}\nrescue ${2:ex : Exception}\n\t${3:handle}\nend",
    },
    {
      label: "property",
      detail: "Property declaration",
      body: "property ${1:name} : ${2:Type}",
    },
    {
      label: "getter",
      detail: "Getter declaration",
      body: "getter ${1:name} : ${2:Type}",
    },
    {
      label: "setter",
      detail: "Setter declaration",
      body: "setter ${1:name} : ${2:Type}",
    },
    {
      label: "spawn",
      detail: "Spawn a fiber",
      body: "spawn do\n\t${1:body}\nend",
    },
    {
      label: "channel",
      detail: "Channel with fibers",
      body: "channel = Channel(${1:Int32}).new\n\nspawn do\n\t${2:channel.send(1)}\nend\n\nputs channel.receive",
    },
    {
      label: "union",
      detail: "C union binding",
      body: "union ${1:Name}\n\t${2:field} : ${3:Type}\nend",
    },
    {
      label: "spec",
      detail: "Spec test block",
      body: 'require "spec"\n\ndescribe ${1:subject} do\n\tit "${2:does something}" do\n\t\t${3:expect(1).to eq(1)}\n\tend\nend',
    },
  ];

  // ============================================================
  //  DATA: Signature help
  // ============================================================
  const SIGNATURES: Record<
    string,
    { label: string; params: { label: string; documentation: string }[]; doc: string }
  > = {
    puts: {
      label: "puts(*objects) : Nil",
      params: [{ label: "*objects", documentation: "Objects to print" }],
      doc: "Writes each argument followed by a newline to stdout.",
    },
    print: {
      label: "print(*objects) : Nil",
      params: [{ label: "*objects", documentation: "Objects to print" }],
      doc: "Writes each argument to stdout without a newline.",
    },
    p: {
      label: "p(*objects) : Nil",
      params: [{ label: "*objects", documentation: "Objects to inspect" }],
      doc: "Inspects each argument and writes it to stdout.",
    },
    pp: {
      label: "pp(*objects) : Nil",
      params: [{ label: "*objects", documentation: "Objects to pretty-print" }],
      doc: "Pretty-prints each argument to stdout.",
    },
    gets: {
      label: "gets(chomp = true) : String?",
      params: [{ label: "chomp", documentation: "Remove the trailing newline" }],
      doc: "Reads a line from stdin, or nil at EOF.",
    },
    raise: {
      label: 'raise(message : String) / raise(exception : Exception)',
      params: [
        { label: "message", documentation: "The exception message" },
        { label: "cause", documentation: "The cause exception" },
      ],
      doc: "Raises an exception.",
    },
    sleep: {
      label: "sleep(seconds : Number) : Nil",
      params: [
        { label: "seconds", documentation: "Duration in seconds" },
      ],
      doc: "Suspends the current fiber.",
    },
    rand: {
      label: "rand(max = 1) : Float64 / rand(max : Int) : Int",
      params: [
        { label: "max", documentation: "Upper bound (exclusive for integers)" },
      ],
      doc: "Returns a pseudo-random number.",
    },
    sprintf: {
      label: "sprintf(format : String, args) : String",
      params: [
        { label: "format", documentation: "Printf-style format string" },
        { label: "args", documentation: "Values to format" },
      ],
      doc: "Formats the arguments according to the format string.",
    },
    printf: {
      label: "printf(format : String, args) : Nil",
      params: [
        { label: "format", documentation: "Printf-style format string" },
        { label: "args", documentation: "Values to format" },
      ],
      doc: "Formats and writes the arguments to stdout.",
    },
    exit: {
      label: "exit(status = 0) : NoReturn",
      params: [{ label: "status", documentation: "Exit status code" }],
      doc: "Terminates the program with the given status.",
    },
    abort: {
      label: 'abort(message = "Aborted", status = 1) : NoReturn',
      params: [
        { label: "message", documentation: "Message written to stderr" },
        { label: "status", documentation: "Exit status code" },
      ],
      doc: "Prints the message to stderr and terminates the program.",
    },
    spawn: {
      label: "spawn(*, same_thread = false, &block) : Fiber",
      params: [
        { label: "same_thread", documentation: "Run on the current thread" },
      ],
      doc: "Runs the block in a new fiber.",
    },
    loop: {
      label: "loop(&block) : Nil",
      params: [],
      doc: "Repeats the block until it returns break.",
    },
  };

  // ============================================================
  //  SECTION 1: Language registration & configuration
  // ============================================================
  monaco.languages.register({
    id: "crystal",
    extensions: [".cr"],
    aliases: ["Crystal", "cr"],
    mimetypes: ["text/x-crystal"],
  });

  monaco.languages.setLanguageConfiguration("crystal", {
    comments: { lineComment: "#" },
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
      { open: "'", close: "'", notIn: ["string"] },
      { open: "`", close: "`", notIn: ["string"] },
    ],
    surroundingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: '"', close: '"' },
      { open: "'", close: "'" },
      { open: "`", close: "`" },
    ],
    indentationRules: {
      increaseIndentPattern:
        /^\s*(?:abstract\s+)?(?:module|class|struct|enum|lib|annotation|union|def|macro|if|unless|case|while|until|for|begin|else|elsif|ensure|rescue|when|select|do)\b(?!.*\bend\b).*|\bdo\s*(\|[^|]*\|)?\s*$/,
      decreaseIndentPattern:
        /^\s*(?:end|else|elsif|ensure|rescue|when)\b.*$/,
    },
    folding: {
      markers: {
        start:
          /^\s*(?:#\s*region\b|module\b|class\b|struct\b|enum\b|lib\b|annotation\b|union\b|def\b|macro\b|if\b|unless\b|case\b|while\b|until\b|for\b|begin\b|select\b|do\b)/,
        end: /^\s*(?:#\s*endregion\b|end\b)/,
      },
    },
    onEnterRules: [
      {
        beforeText:
          /^\s*(?:abstract\s+)?(?:module|class|struct|enum|lib|annotation|union|def|macro|if|unless|case|while|until|for|begin|else|elsif|ensure|rescue|when|select|do)\b.*$/,
        action: { indentAction: monaco.languages.IndentAction.Indent },
      },
      {
        beforeText: /^\s*\{\s*\|[^|]*\|\s*$/,
        action: { indentAction: monaco.languages.IndentAction.Indent },
      },
    ],
    wordPattern:
      /(@@?[a-zA-Z_]\w*[?!]?|\$[a-zA-Z_]\w*|[a-zA-Z_]\w*[?!]?|\d[\d_]*(?:\.\d[\d_]*)?)/,
  });

  // ============================================================
  //  SECTION 2: Monarch tokenizer
  // ============================================================
  monaco.languages.setMonarchTokensProvider("crystal", {
    defaultToken: "",
    tokenPostfix: ".crystal",

    keywords: KEYWORDS,
    typeKeywords: TYPE_KEYWORDS,
    constants: CONSTANTS,
    builtins: BUILTIN_FUNCTIONS,

    operators: [
      "=",
      ">",
      "<",
      "!",
      "~",
      "?",
      ":",
      "==",
      "===",
      "<=",
      ">=",
      "!=",
      "=~",
      "!~",
      "&&",
      "||",
      "++",
      "--",
      "+",
      "-",
      "*",
      "/",
      "&",
      "|",
      "^",
      "%",
      "**",
      "<<",
      ">>",
      "+=",
      "-=",
      "*=",
      "/=",
      "&=",
      "|=",
      "^=",
      "%=",
      "**=",
      "<<=",
      ">>=",
      "=>",
      "->",
      "..",
      "...",
    ],

    symbols: /[=><!~?:&|+\-*\/\^%]+/,
    escapes:
      /\\(?:[abefnrtv\\'"0]|x[0-9A-Fa-f]{1,2}|u[0-9A-Fa-f]{4}|u\{[0-9A-Fa-f ]+\})/,

    tokenizer: {
      root: [
        [/[ \t\r\n]+/, "white"],

        // Comments
        [/#.*$/, "comment"],

        // Annotations @[...]
        [/@\[/, "annotation", "@annotation"],

        // Heredocs
        [/<<[-~]?'(\w+)'/, { token: "string.heredoc", next: "@heredocPlain.$1" }],
        [/<<[-~]?"(\w+)"/, { token: "string.heredoc", next: "@heredoc.$1" }],
        [/<<[-~]?(\w+)/, { token: "string.heredoc", next: "@heredoc.$1" }],

        // Symbols
        [/:"/, "string.symbol", "@symbolString"],
        [/:@@[a-zA-Z_]\w*/, "string.symbol"],
        [/:@[a-zA-Z_]\w*/, "string.symbol"],
        [/:\[\]=?/, "string.symbol"],
        [/:[a-zA-Z_]\w*[?!]?/, "string.symbol"],
        [/:<=>|:===|:==|:!=|:=~|:![~=]|:[<>]=?|:![<>]/, "string.symbol"],
        [/:(?![:\s])[+\-*\/%&|^~]+/, "string.symbol"],

        // Instance / class / global variables
        [/@@[a-zA-Z_]\w*/, "variable"],
        [/@[a-zA-Z_]\w*/, "variable"],
        [/\$~?[a-zA-Z_]\w*/, "variable.global"],
        [/\$[!@&`'+~=\/\\,;.<>*$?:"]/, "variable.global"],
        [/\$\d+/, "variable.global"],

        // Method definitions
        [
          /(def)(\s+)(self)(\s*)(\.)(\s*)(\[\]=?|[a-zA-Z_]\w*[?!]?|[+\-*\/%<>=!&|^~]+)/,
          [
            "keyword",
            "white",
            "keyword",
            "white",
            "delimiter",
            "white",
            "identifier.method",
          ],
        ],
        [
          /(def)(\s+)(\[\]=?|[a-zA-Z_]\w*[?!]?|<=>|[+\-*\/%<>=!&|^~]+)/,
          ["keyword", "white", "identifier.method"],
        ],

        // Numbers
        [/0[xX][0-9a-fA-F](_?[0-9a-fA-F])*/, "number.hex"],
        [/0[oO][0-7](_?[0-7])*/, "number.octal"],
        [/0[bB][01](_?[01])*/, "number.binary"],
        [
          /\d[\d_]*\.\d[\d_]*([eE][-+]?\d+)?(_?[fF](32|64))?/,
          "number.float",
        ],
        [/\d[\d_]*[eE][-+]?\d+(_?[fF](32|64))?/, "number.float"],
        [/\d[\d_]*(_?[iu](8|16|32|64|128))?(_?[fF](32|64))?/, "number"],

        // Character literals
        [/'([^'\\]|\\.)'/, "string"],

        // Strings and commands
        [/"/, "string", "@doubleString"],
        [/`/, "string", "@backtickString"],

        // Percent literals
        [/%[qQ]?\(/, "string", "@pctParen"],
        [/%[qQ]?\[/, "string", "@pctBracket"],
        [/%[qQ]?\{/, "string", "@pctBrace"],
        [/%[qwWiI]\(/, "string", "@pctParen"],
        [/%[qwWiI]\[/, "string", "@pctBracket"],
        [/%[qwWiI]\{/, "string", "@pctBrace"],
        [/%r\(/, "regexp", "@regexpParen"],
        [/%r\[/, "regexp", "@regexpBracket"],
        [/%r\{/, "regexp", "@regexpBrace"],

        // Regex (heuristic)
        [/\/(?=[^\/\*\s])(?:[^\/\\\n]|\\.)*\/[imx]*/, "regexp"],

        // Constants, types and identifiers
        [
          /[A-Z][A-Z0-9_]*(?![a-zA-Z0-9_])/,
          { cases: { "@constants": "constant", "@default": "constant" } },
        ],
        [
          /[A-Z]\w*/,
          {
            cases: {
              "@typeKeywords": "type",
              "@default": "type.identifier",
            },
          },
        ],
        [
          /[A-Za-z_]\w*[?!]?/,
          {
            cases: {
              "@keywords": "keyword",
              "@typeKeywords": "type",
              "@builtins": "support.function",
              "@constants": "constant",
              "@default": "identifier",
            },
          },
        ],

        // Delimiters and operators
        [/[{}()\[\]]/, "@brackets"],
        [/[;,.]/, "delimiter"],
        [
          /@symbols/,
          {
            cases: {
              "@operators": "operator",
              "@default": "",
            },
          },
        ],
      ],

      annotation: [
        [/[^\]]+/, "annotation"],
        [/\]/, "annotation", "@pop"],
      ],

      heredoc: [
        [
          /^(\s*)(\w+)\s*$/,
          {
            cases: {
              "$2==$S2": { token: "string.heredoc", next: "@pop" },
              "@default": "string.heredoc",
            },
          },
        ],
        [/#\{/, { token: "string.interpolation", next: "@interpolation" }],
        [/.*/, "string.heredoc"],
      ],

      heredocPlain: [
        [
          /^(\s*)(\w+)\s*$/,
          {
            cases: {
              "$2==$S2": { token: "string.heredoc", next: "@pop" },
              "@default": "string.heredoc",
            },
          },
        ],
        [/.*/, "string.heredoc"],
      ],

      doubleString: [
        [/[^\\"#]+/, "string"],
        [/#\{/, { token: "string.interpolation", next: "@interpolation" }],
        [/#[@$]/, "string.interpolation"],
        [/@escapes/, "string.escape"],
        [/\\./, "string.escape.invalid"],
        [/"/, "string", "@pop"],
      ],

      backtickString: [
        [/[^\\`#]+/, "string"],
        [/#\{/, { token: "string.interpolation", next: "@interpolation" }],
        [/@escapes/, "string.escape"],
        [/\\./, "string.escape.invalid"],
        [/`/, "string", "@pop"],
      ],

      symbolString: [
        [/[^\\"#]+/, "string.symbol"],
        [/#\{/, { token: "string.interpolation", next: "@interpolation" }],
        [/@escapes/, "string.escape"],
        [/\\./, "string.escape.invalid"],
        [/"/, "string.symbol", "@pop"],
      ],

      interpolation: [
        [/\}/, { token: "string.interpolation", next: "@pop" }],
        { include: "root" },
      ],

      pctParen: [
        [/[^\\)#]+/, "string"],
        [/#\{/, { token: "string.interpolation", next: "@interpolation" }],
        [/\\./, "string.escape"],
        [/\)/, "string", "@pop"],
      ],
      pctBracket: [
        [/[^\\\]#]+/, "string"],
        [/#\{/, { token: "string.interpolation", next: "@interpolation" }],
        [/\\./, "string.escape"],
        [/\]/, "string", "@pop"],
      ],
      pctBrace: [
        [/[^\\}#]+/, "string"],
        [/#\{/, { token: "string.interpolation", next: "@interpolation" }],
        [/\\./, "string.escape"],
        [/\}/, "string", "@pop"],
      ],

      regexpParen: [
        [/[^\\)]+/, "regexp"],
        [/\\./, "regexp.escape"],
        [/\)[imx]*/, "regexp", "@pop"],
      ],
      regexpBracket: [
        [/[^\\\]]+/, "regexp"],
        [/\\./, "regexp.escape"],
        [/\](\w*)/, "regexp", "@pop"],
      ],
      regexpBrace: [
        [/[^\\}]+/, "regexp"],
        [/\\./, "regexp.escape"],
        [/\}[imx]*/, "regexp", "@pop"],
      ],
    },
  } as any);

  // ============================================================
  //  SECTION 3: Symbol parser
  // ============================================================
  interface SymbolInfo {
    name: string;
    kind: string;
    line: number;
    col: number;
    params?: string;
    returnType?: string;
    superclass?: string;
    value?: string;
    type?: string;
  }

  function parseSymbols(code: string): SymbolInfo[] {
    const symbols: SymbolInfo[] = [];
    const lines = code.split("\n");
    const seenIvars = new Set<string>();

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNum = i + 1;
      const cleaned = line
        .replace(/(^|[^\\])#.*$/, "$1")
        .replace(/"(?:[^"\\]|\\.)*"/g, '""')
        .replace(/'(?:[^'\\]|\\.)*'/g, "''");
      let m: RegExpMatchArray | null;

      // def methods (with receiver, operators, predicates/bang, return type)
      m = cleaned.match(
        /^\s*def\s+(self\s*\.\s*)?(\[\]=?|[a-zA-Z_]\w*[?!]?|<=>|[+\-*\/%<>=!&|^~]+)\s*(?:\(([^)]*)\))?\s*(?::\s*([^\n#]+?))?\s*$/,
      );
      if (m) {
        const name = m[2];
        const idx = line.indexOf(name, line.indexOf("def") + 3);
        symbols.push({
          name,
          kind: m[1] ? "class_method" : "method",
          params: m[3] ? m[3].trim() : "",
          returnType: m[4] ? m[4].trim() : undefined,
          line: lineNum,
          col: (idx >= 0 ? idx : line.indexOf(name)) + 1,
        });
        continue;
      }

      // fun declarations inside lib
      m = cleaned.match(
        /^\s*fun\s+([a-zA-Z_]\w*[?!]?)\s*(?:\(([^)]*)\))?\s*(?::\s*([^\n#]+?))?\s*$/,
      );
      if (m) {
        const idx = line.indexOf(m[1]);
        symbols.push({
          name: m[1],
          kind: "function",
          params: m[2] ? m[2].trim() : "",
          returnType: m[3] ? m[3].trim() : undefined,
          line: lineNum,
          col: idx + 1,
        });
        continue;
      }

      // macros
      m = cleaned.match(/^\s*macro\s+([a-zA-Z_]\w*[?!]?)/);
      if (m) {
        const idx = line.indexOf(m[1], line.indexOf("macro") + 5);
        symbols.push({
          name: m[1],
          kind: "macro",
          line: lineNum,
          col: (idx >= 0 ? idx : line.indexOf(m[1])) + 1,
        });
        continue;
      }

      // type-like declarations
      m = cleaned.match(
        /^\s*(?:abstract\s+)?(class|struct|module|enum|lib|annotation|union)\s+([A-Z]\w*)/,
      );
      if (m) {
        const idx = line.indexOf(m[2], line.indexOf(m[1]) + m[1].length);
        let superclass: string | undefined;
        if (m[1] === "class") {
          const sup = cleaned.match(/<\s*([A-Z][\w:]*)/);
          if (sup) superclass = sup[1];
        }
        symbols.push({
          name: m[2],
          kind: m[1],
          superclass,
          line: lineNum,
          col: idx + 1,
        });
        continue;
      }

      // record (macro-based value type)
      m = cleaned.match(/^\s*record\s+([A-Z]\w*)/);
      if (m) {
        const idx = line.indexOf(m[1], line.indexOf("record") + 6);
        symbols.push({ name: m[1], kind: "record", line: lineNum, col: idx + 1 });
        continue;
      }

      // type alias
      m = cleaned.match(/^\s*alias\s+([A-Z]\w*)/);
      if (m) {
        const idx = line.indexOf(m[1], line.indexOf("alias") + 5);
        symbols.push({ name: m[1], kind: "alias", line: lineNum, col: idx + 1 });
        continue;
      }

      // constants
      m = cleaned.match(/^\s*([A-Z][A-Z0-9_]{1,})\s*=/);
      if (m) {
        const idx = line.indexOf(m[1]);
        symbols.push({
          name: m[1],
          kind: "constant",
          line: lineNum,
          col: idx + 1,
        });
        continue;
      }

      // getters / setters / properties
      m = cleaned.match(
        /^\s*(getter!?|setter!?|property!?|class_getter!?|class_setter!?|class_property!?)\s+(.+)$/,
      );
      if (m) {
        const keyword = m[1];
        const args = m[2].split(",");
        for (let a of args) {
          a = a.trim();
          if (a.startsWith("@")) a = a.slice(1);
          const nm = a.split(/[\s:]/)[0];
          if (!nm || !/^[a-zA-Z_]\w*[?!]?$/.test(nm)) continue;
          const idx = line.indexOf(nm);
          symbols.push({
            name: nm,
            kind: keyword.startsWith("class_")
              ? "class_property"
              : keyword.startsWith("property")
                ? "property"
                : keyword.startsWith("setter")
                  ? "setter"
                  : "getter",
            type: a.includes(":") ? a.split(":")[1].trim() : undefined,
            line: lineNum,
            col: idx + 1,
          });
        }
        continue;
      }

      // instance variable declarations/assignments
      const ivarRe = /@([a-zA-Z_]\w*)\s*[:=]/g;
      let iv;
      while ((iv = ivarRe.exec(cleaned)) !== null) {
        const nm = "@" + iv[1];
        if (seenIvars.has(nm)) continue;
        seenIvars.add(nm);
        symbols.push({
          name: nm,
          kind: "ivar",
          line: lineNum,
          col: iv.index + 1,
        });
      }
    }
    return symbols;
  }

  const symbolCache = new Map<string, SymbolInfo[]>();
  function getSymbols(model: Monaco.editor.ITextModel): SymbolInfo[] {
    const key = model.uri.toString() + "@" + model.getVersionId();
    let syms = symbolCache.get(key);
    if (!syms) {
      syms = parseSymbols(model.getValue());
      if (symbolCache.size > 50) symbolCache.clear();
      symbolCache.set(key, syms);
    }
    return syms;
  }

  function symbolKind(
    monacoRef: typeof Monaco,
    kind: string,
  ): number {
    const SK = monacoRef.languages.SymbolKind;
    switch (kind) {
      case "method":
      case "class_method":
      case "function":
        return SK.Method;
      case "macro":
        return SK.Function;
      case "class":
      case "record":
        return SK.Class;
      case "struct":
      case "union":
        return SK.Struct;
      case "module":
        return SK.Module;
      case "enum":
        return SK.Enum;
      case "lib":
      case "annotation":
      case "alias":
        return SK.Interface;
      case "constant":
        return SK.Constant;
      case "ivar":
        return SK.Field;
      case "getter":
      case "setter":
      case "property":
      case "class_property":
        return SK.Property;
      default:
        return SK.Variable;
    }
  }

  function symbolDetail(sym: SymbolInfo): string {
    const prefix = sym.kind === "class_method" ? "self." : "";
    if (sym.kind === "method" || sym.kind === "class_method") {
      return `def ${prefix}${sym.name}${sym.params ? "(" + sym.params + ")" : ""}${sym.returnType ? " : " + sym.returnType : ""}`;
    }
    if (sym.kind === "function") {
      return `fun ${sym.name}${sym.params ? "(" + sym.params + ")" : ""}${sym.returnType ? " : " + sym.returnType : ""}`;
    }
    if (sym.kind === "property" || sym.kind === "getter" || sym.kind === "setter") {
      return `${sym.type ? sym.type + " " : ""}${sym.name}`;
    }
    if (sym.kind === "ivar") return sym.name;
    if (sym.superclass) return `${sym.kind} ${sym.name} < ${sym.superclass}`;
    return `${sym.kind} ${sym.name}`;
  }

  // ============================================================
  //  SECTION 4: Completion provider
  // ============================================================
  const CIK = monaco.languages.CompletionItemKind;
  const SNIPPET_RULE =
    monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet;

  monaco.languages.registerCompletionItemProvider("crystal", {
    triggerCharacters: [".", ":", "@", '"', "|"],
    provideCompletionItems(model, position) {
      const line = model.getLineContent(position.lineNumber);
      const before = line.substring(0, position.column - 1);
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };
      const suggestions: Monaco.languages.CompletionItem[] = [];

      // ── require "..." ──
      const requireMatch = before.match(/\brequire\s+"([^"]*)$/);
      if (requireMatch) {
        const reqRange = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: position.column - requireMatch[1].length,
          endColumn: position.column,
        };
        STDLIB.forEach((lib) => {
          suggestions.push({
            label: lib,
            kind: CIK.Module,
            insertText: lib,
            range: reqRange,
            detail: `require "${lib}"`,
            sortText: "0_" + lib,
          });
        });
        return { suggestions };
      }

      // ── @[Annotation] ──
      const annMatch = before.match(/@\[(\w*)$/);
      if (annMatch) {
        const annRange = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: position.column - annMatch[1].length,
          endColumn: position.column,
        };
        ANNOTATIONS.forEach((a) => {
          suggestions.push({
            label: a,
            kind: CIK.Class,
            insertText: a,
            range: annRange,
            detail: `@[${a}]`,
            sortText: "0_" + a,
          });
        });
        return { suggestions };
      }

      // ── After a dot: method completions ──
      if (/[.\w@$)\]]\s*\.\s*\w*$/.test(before) && !/\.\./.test(before)) {
        const dotRange = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };
        const seen = new Set<string>();
        METHOD_ITEMS.forEach((item) => {
          if (seen.has(item.label)) return;
          seen.add(item.label);
          suggestions.push({
            label: item.label,
            kind: CIK.Method,
            insertText: item.label,
            range: dotRange,
            detail: item.sig,
            documentation: { value: item.doc },
            sortText: "0_" + item.label,
          });
        });
        getSymbols(model)
          .filter((s) => s.kind === "method" || s.kind === "getter")
          .forEach((s) => {
            if (seen.has(s.name)) return;
            seen.add(s.name);
            suggestions.push({
              label: s.name,
              kind: CIK.Method,
              insertText: s.name,
              range: dotRange,
              detail: symbolDetail(s),
              sortText: "0_" + s.name,
            });
          });
        return { suggestions };
      }

      // ── After :: (namespace) ──
      if (/::\s*\w*$/.test(before)) {
        const nsRange = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };
        const seen = new Set<string>();
        getSymbols(model)
          .filter(
            (s) =>
              s.kind === "class" ||
              s.kind === "struct" ||
              s.kind === "module" ||
              s.kind === "enum" ||
              s.kind === "lib" ||
              s.kind === "constant",
          )
          .forEach((s) => {
            if (seen.has(s.name)) return;
            seen.add(s.name);
            suggestions.push({
              label: s.name,
              kind:
                s.kind === "constant" ? CIK.Constant : CIK.Class,
              insertText: s.name,
              range: nsRange,
              detail: symbolDetail(s),
              sortText: "0_" + s.name,
            });
          });
        return { suggestions };
      }

      // ── Snippets ──
      SNIPPETS.forEach((s) => {
        suggestions.push({
          label: s.label,
          kind: CIK.Snippet,
          insertText: s.body,
          insertTextRules: SNIPPET_RULE,
          range,
          detail: "(snippet) " + s.detail,
          documentation: { value: s.detail },
          sortText: "1_" + s.label,
        });
      });

      // ── User symbols ──
      const seenUser = new Set<string>();
      getSymbols(model).forEach((s) => {
        if (seenUser.has(s.name)) return;
        seenUser.add(s.name);
        suggestions.push({
          label: s.name,
          kind:
            s.kind === "method" || s.kind === "class_method"
              ? CIK.Method
              : s.kind === "function"
                ? CIK.Function
                : s.kind === "constant"
                  ? CIK.Constant
                  : s.kind === "ivar" ||
                      s.kind === "property" ||
                      s.kind === "getter" ||
                      s.kind === "setter"
                    ? CIK.Field
                    : CIK.Class,
          insertText: s.name,
          range,
          detail: symbolDetail(s),
          documentation: { value: `Defined at line ${s.line}` },
          sortText: "0_" + s.name,
        });
      });

      // ── Keywords ──
      KEYWORDS.forEach((kw) => {
        const info = HOVER_DOCS[kw];
        suggestions.push({
          label: kw,
          kind: CIK.Keyword,
          insertText: kw,
          range,
          detail: "keyword",
          documentation: info ? { value: info.doc } : undefined,
          sortText: "2_" + kw,
        });
      });

      // ── Constants ──
      CONSTANTS.forEach((c) => {
        suggestions.push({
          label: c,
          kind: CIK.Constant,
          insertText: c,
          range,
          detail: "constant",
          sortText: "2_" + c,
        });
      });

      // ── Types ──
      TYPE_KEYWORDS.forEach((t) => {
        const info = HOVER_DOCS[t];
        suggestions.push({
          label: t,
          kind: CIK.Class,
          insertText: t,
          range,
          detail: info && info.sig ? info.sig : "type",
          documentation: info ? { value: info.doc } : undefined,
          sortText: "3_" + t,
        });
      });

      // ── Built-in functions ──
      BUILTIN_FUNCTIONS.forEach((f) => {
        const info = HOVER_DOCS[f];
        suggestions.push({
          label: f,
          kind: CIK.Function,
          insertText: f,
          range,
          detail: info && info.sig ? info.sig : "function",
          documentation: info ? { value: info.doc } : undefined,
          sortText: "3_" + f,
        });
      });

      return { suggestions };
    },
  });

  // ============================================================
  //  SECTION 5: Hover provider
  // ============================================================
  monaco.languages.registerHoverProvider("crystal", {
    provideHover(model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return null;
      const name = word.word;
      const range = new monaco.Range(
        position.lineNumber,
        word.startColumn,
        position.lineNumber,
        word.endColumn,
      );

      // A method item (e.g. via method call) takes precedence when documented.
      const item = METHOD_ITEMS.find((m) => m.label.trim() === name);
      const info = HOVER_DOCS[name];

      const sym = getSymbols(model).find((s) => s.name === name);
      if (sym && (sym.kind === "method" || sym.kind === "class_method")) {
        return {
          range,
          contents: [
            { value: "```crystal\n" + symbolDetail(sym) + "\n```" },
            { value: `Defined at line ${sym.line}` },
          ],
        };
      }

      if (info) {
        const contents: Monaco.IMarkdownString[] = [];
        if (info.sig) contents.push({ value: "```crystal\n" + info.sig + "\n```" });
        contents.push({ value: info.doc });
        return { range, contents };
      }

      if (item) {
        return {
          range,
          contents: [
            { value: "```crystal\n" + item.sig + "\n```" },
            { value: item.doc },
          ],
        };
      }

      if (sym) {
        return {
          range,
          contents: [
            { value: "```crystal\n" + symbolDetail(sym) + "\n```" },
            { value: `Defined at line ${sym.line}` },
          ],
        };
      }

      return null;
    },
  });

  // ============================================================
  //  SECTION 6: Definition provider (scope-aware)
  // ============================================================
  // ─── Binding resolution (shared by the definition, reference and rename
  //     providers) ─────────────────────────────────────────────────────
  // Resolves the name under the cursor to its block-local binding: every
  // occurrence bound to it, plus the occurrence that declares it. Names with no
  // block-local binding (ivars, class vars, globals, methods) report
  // `local: false` so callers keep their document-wide behaviour.
  const resolveBinding = (
    model: Monaco.editor.ITextModel,
    position: Monaco.Position,
  ) => {
    const word = model.getWordAtPosition(position);
    if (!word) return null;
    const name = word.word;
    const isMember = /^[@$]/.test(name);

    const lines = model.getLinesContent();
    const lineStart: number[] = [];
    let total = 0;
    for (let i = 0; i < lines.length; i++) {
      lineStart.push(total);
      total += lines[i].length + 1;
    }
    const at = (line: number, col: number) => lineStart[line] + col;
    const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const isWordChar = (ch: string) =>
      ch !== undefined && ch !== "" && /[A-Za-z0-9_?!@$]/.test(ch);

    // Every whole-token occurrence of `name` with a manual boundary check, so
    // that ?/!-suffixed methods and @/$-sigil names work exactly.
    type Match = { line: number; index: number };
    const all: Match[] = [];
    const re = new RegExp(esc(name), "g");
    for (let i = 0; i < lines.length; i++) {
      re.lastIndex = 0;
      let m: RegExpExecArray | null;
      while ((m = re.exec(lines[i])) !== null) {
        const start = m.index;
        const end = start + name.length;
        const beforeCh = start > 0 ? lines[i][start - 1] : "";
        const afterCh = end < lines[i].length ? lines[i][end] : "";
        if (isWordChar(beforeCh) || isWordChar(afterCh)) {
          re.lastIndex = end;
          continue;
        }
        all.push({ line: i, index: start });
        if (re.lastIndex === m.index) re.lastIndex++;
      }
    }

    // Scopes: `{ … }` blocks plus keyword … end blocks.
    type Scope = { start: number; end: number; names: Set<string> };
    const scopes: Scope[] = [];
    const open: Scope[] = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      for (let c = 0; c < line.length; c++) {
        if (line[c] === "{") {
          const scope: Scope = {
            start: at(i, c),
            end: Infinity,
            names: new Set<string>(),
          };
          scopes.push(scope);
          open.push(scope);
        } else if (line[c] === "}") {
          const scope = open.pop();
          if (scope) scope.end = at(i, c);
        }
      }
      const code = line.replace(/#.*$/, "").trim();
      if (
        /^(?:abstract\s+)?(?:def|class|struct|module|enum|lib|annotation|union|macro|if|unless|while|until|for|case|begin|select|do)\b/.test(
          code,
        ) ||
        /\bdo\s*(\|[^|]*\|)?\s*$/.test(code)
      ) {
        const scope: Scope = {
          start: at(i, 0),
          end: Infinity,
          names: new Set<string>(),
        };
        scopes.push(scope);
        open.push(scope);
      }
      if (/^end\b/.test(code)) {
        const scope = open.pop();
        if (scope) scope.end = at(i, 0);
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

    // A sigil-free name is a local when it is assigned, typed-declared, or is a
    // parameter; those are the ones that are block-scoped.
    const declarations: { start: number; end: number; scope?: Scope }[] = [];
    if (!isMember) {
      for (const occ of all) {
        const line = lines[occ.line];
        const before = line.slice(0, occ.index).replace(/\s+$/, "");
        const after = line.slice(occ.index + name.length);
        const assigned =
          /^\s*(?::\s*[^=,\n]+)?(?:[-+*\/%]|\|\||&&)?=(?!=|>)/.test(after);
        const typedDecl = /^\s*:\s*[A-Z][\w:.{}<>\[\]|(), ]*$/.test(after);
        const parameter =
          (/\b(?:def|macro|fun|->)\b/.test(before) &&
            /[,(]\s*$/.test(before) &&
            /^\s*(?::[^,)]*)?[,)]/.test(after)) ||
          (/\bout\s+$/.test(before) &&
            /^\s*(?::[^,)]*)?[,)]/.test(after)) ||
          (/\|\s*$/.test(before) &&
            /^\s*(?::[^,|)]*)?[,|)]/.test(after));
        if (!assigned && !typedDecl && !parameter) continue;
        const scope = enclosing(at(occ.line, occ.index));
        if (scope) scope.names.add(name);
        declarations.push({
          start: at(occ.line, occ.index),
          end: at(occ.line, occ.index) + name.length,
          scope,
        });
      }
    }

    // Resolve a name span to its binding: declarations use their own scope,
    // plain references the innermost enclosing declaration.
    const resolve = (start: number, end: number) => {
      for (const decl of declarations) {
        if (decl.start <= start && end <= decl.end) return decl.scope;
      }
      return declaring(start);
    };

    const cursorLine = position.lineNumber - 1;
    const cursorScope = isMember
      ? undefined
      : resolve(
          at(cursorLine, word.startColumn - 1),
          at(cursorLine, word.endColumn - 1),
        );
    const targetStart = cursorScope ? cursorScope.start : -1;
    const local = !isMember && targetStart !== -1;
    const decl =
      targetStart === -1
        ? undefined
        : declarations.find((d) => d.scope && d.scope.start === targetStart);

    // Every occurrence bound to the same binding, and the one declaring it.
    type Occurrence = { line: number; startColumn: number; endColumn: number };
    const occurrences: Occurrence[] = [];
    let declarationRange: Occurrence | null = null;
    for (const occ of all) {
      const start = at(occ.line, occ.index);
      if (local) {
        const scope = resolve(start, start + name.length);
        if ((scope ? scope.start : -1) !== targetStart) continue;
      }
      if (targetStart !== -1) {
        const before = lines[occ.line].slice(0, occ.index).replace(/\s+$/, "");
        if (before.endsWith(".") || before.endsWith("::")) continue;
      }
      const range: Occurrence = {
        line: occ.line + 1,
        startColumn: occ.index + 1,
        endColumn: occ.index + 1 + name.length,
      };
      occurrences.push(range);
      if (decl && decl.start <= start && start + name.length <= decl.end)
        declarationRange = range;
    }

    return {
      name,
      local,
      declaration: declarationRange,
      occurrences,
    };
  };

  monaco.languages.registerDefinitionProvider("crystal", {
    provideDefinition(model, position) {
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

      const sym = getSymbols(model).find((s) => s.name === word.word);
      if (sym) {
        return {
          uri: model.uri,
          range: new monaco.Range(
            sym.line,
            sym.col,
            sym.line,
            sym.col + sym.name.length,
          ),
        };
      }
      return null;
    },
  });

  // ============================================================
  //  SECTION 7: Signature help
  // ============================================================
  monaco.languages.registerSignatureHelpProvider("crystal", {
    signatureHelpTriggerCharacters: ["(", ","],
    provideSignatureHelp(model, position) {
      const textUntil = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });

      const match = textUntil.match(/([a-zA-Z_]\w*[?!]?)\s*\(([^()]*)$/);
      if (!match) return null;
      const funcName = match[1];
      const activeParam = (match[2].match(/,/g) || []).length;

      const sym = getSymbols(model).find(
        (s) =>
          (s.kind === "method" ||
            s.kind === "class_method" ||
            s.kind === "function") &&
          s.name === funcName,
      );
      if (sym) {
        const params = (sym.params || "")
          .split(",")
          .map((p) => p.trim())
          .filter(Boolean);
        return {
          value: {
            signatures: [
              {
                label: symbolDetail(sym),
                parameters: params.map((p) => ({ label: p, documentation: "" })),
                documentation: `Defined at line ${sym.line}`,
              },
            ],
            activeSignature: 0,
            activeParameter: activeParam,
          },
          dispose() {},
        };
      }

      const bsig = SIGNATURES[funcName];
      if (bsig) {
        return {
          value: {
            signatures: [
              {
                label: bsig.label,
                parameters: bsig.params,
                documentation: bsig.doc,
              },
            ],
            activeSignature: 0,
            activeParameter: activeParam,
          },
          dispose() {},
        };
      }
      return null;
    },
  });

  // ============================================================
  //  SECTION 8: Document symbols
  // ============================================================
  monaco.languages.registerDocumentSymbolProvider("crystal", {
    provideDocumentSymbols(model) {
      return getSymbols(model).map((sym) => {
        const r = new monaco.Range(
          sym.line,
          sym.col,
          sym.line,
          sym.col + sym.name.length,
        );
        return {
          name: sym.name,
          detail: symbolDetail(sym),
          kind: symbolKind(monaco, sym.kind),
          range: r,
          selectionRange: r,
        };
      });
    },
  });

  // ============================================================
  //  SECTION 9: Folding range provider
  // ============================================================
  monaco.languages.registerFoldingRangeProvider("crystal", {
    provideFoldingRanges(model) {
      const ranges: Monaco.languages.FoldingRange[] = [];
      const lines = model.getLinesContent();
      const stack: { start: number; kind?: number; type: string }[] = [];

      const blockStart =
        /^\s*(?:abstract\s+)?(?:module|class|struct|enum|lib|annotation|union|def|macro)\b|^\s*(?:if|unless|case|while|until|for|begin|select)\b|\bdo\s*(\|[^|]*\|)?\s*$/;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (/^\s*#\s*region\b/.test(line)) {
          stack.push({
            start: i + 1,
            kind: monaco.languages.FoldingRangeKind.Region,
            type: "region",
          });
        }
        if (/^\s*#\s*endregion\b/.test(line)) {
          for (let j = stack.length - 1; j >= 0; j--) {
            if (stack[j].type === "region") {
              ranges.push({
                start: stack[j].start,
                end: i + 1,
                kind: stack[j].kind,
              });
              stack.splice(j, 1);
              break;
            }
          }
        }

        const code = line.replace(/#.*$/, "").trim();
        if (blockStart.test(code) && !/\bend\b/.test(code)) {
          stack.push({ start: i + 1, type: "block" });
        }
        if (/^end\b/.test(code)) {
          for (let j = stack.length - 1; j >= 0; j--) {
            if (stack[j].type === "block") {
              if (i + 1 > stack[j].start) {
                ranges.push({ start: stack[j].start, end: i + 1 });
              }
              stack.splice(j, 1);
              break;
            }
          }
        }

        // Comment blocks
        if (/^\s*#/.test(line) && !/^\s*#\s*(region|endregion)\b/.test(line)) {
          let end = i + 1;
          while (
            end < lines.length &&
            /^\s*#/.test(lines[end]) &&
            !/^\s*#\s*(region|endregion)\b/.test(lines[end])
          )
            end++;
          if (end > i + 2) {
            ranges.push({
              start: i + 1,
              end,
              kind: monaco.languages.FoldingRangeKind.Comment,
            });
          }
        }
      }
      return ranges;
    },
  });

  // ============================================================
  //  SECTION 10: Rename & references (scope-aware)
  // ============================================================
  monaco.languages.registerRenameProvider("crystal", {
    provideRenameEdits(model, position, newName) {
      if (KEYWORDS.includes(newName) || CONSTANTS.includes(newName)) return null;
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
    resolveRenameLocation(model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return { rejectReason: "No symbol at this position." };
      if (KEYWORDS.includes(word.word))
        return { rejectReason: "Cannot rename a keyword." };
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

  monaco.languages.registerReferenceProvider("crystal", {
    provideReferences(model, position) {
      const binding = resolveBinding(model, position);
      if (!binding) return [];
      return binding.occurrences.map((r) => ({
        uri: model.uri,
        range: new monaco.Range(r.line, r.startColumn, r.line, r.endColumn),
      }));
    },
  });
};
