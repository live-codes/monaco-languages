import type * as Monaco from "monaco-editor";

export default (monaco: typeof Monaco) => {
  // ============================================================
  //  DATA: Hover Documentation
  // ============================================================
  const HOVER_DOCS = {
    def: {
      sig: "def method_name(args)\n  body\nend",
      doc: "Defines an instance method. The method body is enclosed between def and end.",
    },
    class: {
      sig: "class Name < Super\n  body\nend",
      doc: "Defines or reopens a class. Ruby classes are open — you can add methods at any time.",
    },
    module: {
      sig: "module Name\n  body\nend",
      doc: "Defines a module. Modules are collections of methods and constants. They cannot be instantiated but can be mixed into classes via include or extend.",
    },
    if: {
      sig: "if condition\n  body\nelsif cond\n  body\nelse\n  body\nend",
      doc: "Conditional branch. Executes the body if the condition is truthy (anything other than false or nil).",
    },
    elsif: {
      sig: "elsif condition",
      doc: "Additional conditional branch in an if expression.",
    },
    else: {
      sig: "else",
      doc: "Default branch executed when no preceding conditions match.",
    },
    unless: {
      sig: "unless condition\n  body\nend",
      doc: "Inverse conditional. Executes the body if the condition is falsy.",
    },
    case: {
      sig: "case expr\nwhen val\n  body\nelse\n  body\nend",
      doc: "Case expression (pattern matching). Uses === for comparisons in when clauses.",
    },
    when: {
      sig: "when value",
      doc: "A branch inside a case expression. Matches using the === operator.",
    },
    while: {
      sig: "while condition\n  body\nend",
      doc: "Executes the body repeatedly as long as the condition is truthy.",
    },
    until: {
      sig: "until condition\n  body\nend",
      doc: "Executes the body repeatedly until the condition becomes truthy.",
    },
    for: {
      sig: "for var in collection\n  body\nend",
      doc: "Iterates over a collection. Prefer .each in idiomatic Ruby.",
    },
    do: {
      sig: "do |args|\n  body\nend",
      doc: "Begins a multi-line block passed to a method. Use braces {} for single-line blocks.",
    },
    begin: {
      sig: "begin\n  body\nrescue E => e\n  handle\nensure\n  cleanup\nend",
      doc: "Begins an exception-handling block.",
    },
    rescue: {
      sig: "rescue ExceptionClass => variable",
      doc: "Catches exceptions in a begin or method body. Defaults to StandardError.",
    },
    ensure: {
      sig: "ensure\n  cleanup_code\nend",
      doc: "Code that always executes, whether an exception was raised or not. Similar to finally in other languages.",
    },
    raise: {
      sig: 'raise "message"\nraise ErrorClass, "msg"',
      doc: "Raises an exception. Can take a string, exception class, or exception instance.",
    },
    return: {
      sig: "return value",
      doc: "Returns a value from a method. The last expression in a method is implicitly returned.",
    },
    yield: {
      sig: "yield(args)",
      doc: "Invokes the block passed to the current method. Raises LocalJumpError if no block given.",
    },
    "block_given?": {
      sig: "block_given? → true/false",
      doc: "Returns true if a block was passed to the current method.",
    },
    self: {
      sig: "self",
      doc: "Refers to the current object — the receiver of the current method.",
    },
    super: {
      sig: "super\nsuper(args)",
      doc: "Calls the same-named method in the superclass. Without parentheses, forwards all arguments.",
    },
    nil: {
      sig: "nil",
      doc: "The singleton instance of NilClass. Represents the absence of a value. Falsy.",
    },
    true: {
      sig: "true",
      doc: "The singleton instance of TrueClass. Boolean true.",
    },
    false: {
      sig: "false",
      doc: "The singleton instance of FalseClass. Boolean false.",
    },
    and: {
      sig: "expr and expr",
      doc: "Logical AND with low precedence. Prefer && in conditionals.",
    },
    or: {
      sig: "expr or expr",
      doc: "Logical OR with low precedence. Prefer || in conditionals.",
    },
    not: {
      sig: "not expr",
      doc: "Logical negation with low precedence. Prefer ! in conditionals.",
    },
    in: {
      sig: "for x in collection\nin pattern (Ruby 3+)",
      doc: "Used in for loops and pattern matching (case/in).",
    },
    end: {
      sig: "end",
      doc: "Closes a block, method, class, module, or control structure.",
    },
    require: {
      sig: "require 'library'",
      doc: "Loads and executes a Ruby file or gem. Each file is loaded only once.",
    },
    require_relative: {
      sig: "require_relative 'path'",
      doc: "Loads a file relative to the directory of the current file.",
    },
    include: {
      sig: "include ModuleName",
      doc: "Mixes a module\u2019s instance methods into a class.",
    },
    extend: {
      sig: "extend ModuleName",
      doc: "Adds a module\u2019s methods as class methods (singleton methods).",
    },
    prepend: {
      sig: "prepend ModuleName",
      doc: "Like include, but inserts the module before the class in the method lookup chain.",
    },
    attr_accessor: {
      sig: "attr_accessor :name, :age",
      doc: "Creates getter and setter methods for the named attributes.",
    },
    attr_reader: {
      sig: "attr_reader :name",
      doc: "Creates getter methods for the named attributes (read-only).",
    },
    attr_writer: {
      sig: "attr_writer :name",
      doc: "Creates setter methods for the named attributes (write-only).",
    },
    public: {
      sig: "public :method_name",
      doc: "Makes methods public (default visibility). Can be used as a section marker.",
    },
    private: {
      sig: "private :method_name",
      doc: "Makes methods accessible only within the class and its subclasses (no explicit receiver).",
    },
    protected: {
      sig: "protected :method_name",
      doc: "Makes methods accessible from instances of the same class and subclasses.",
    },
    lambda: {
      sig: "->(args) { body }\nlambda { |args| body }",
      doc: "Creates a lambda (strict Proc). Checks argument count and return exits the lambda, not the enclosing method.",
    },
    proc: {
      sig: "proc { |args| body }\nProc.new { |args| body }",
      doc: "Creates a Proc. Lenient with arguments; return exits the enclosing method.",
    },
    puts: {
      sig: "puts(obj, ...) → nil",
      doc: "Writes objects to stdout, each followed by a newline. Calls .to_s on each argument.",
    },
    print: {
      sig: "print(obj, ...) → nil",
      doc: "Writes objects to stdout without a trailing newline.",
    },
    p: {
      sig: "p(obj, ...) → obj",
      doc: "Calls .inspect on each argument and writes to stdout. Returns the object. Useful for debugging.",
    },
    pp: {
      sig: "pp(obj, ...) → obj",
      doc: "Pretty-prints objects to stdout using the pp library.",
    },
    freeze: {
      sig: "obj.freeze → obj",
      doc: "Prevents further modifications to the object. Frozen objects raise FrozenError on mutation attempts.",
    },
    "frozen?": {
      sig: "obj.frozen? → true/false",
      doc: "Returns true if the object is frozen.",
    },
    alias: {
      sig: "alias new_name old_name",
      doc: "Creates an alias for a method. The alias persists even if the original method is later redefined.",
    },
    "defined?": {
      sig: "defined?(expression) → String or nil",
      doc: "Returns a string describing the expression, or nil if it is undefined.",
    },
    retry: {
      sig: "retry",
      doc: "Re-executes the begin block from the start. Used inside rescue.",
    },
    break: {
      sig: "break\nbreak value",
      doc: "Exits a loop or block, optionally returning a value.",
    },
    next: {
      sig: "next\nnext value",
      doc: "Skips to the next iteration of a loop or block.",
    },
    redo: {
      sig: "redo",
      doc: "Restarts the current iteration of a loop without re-evaluating the condition.",
    },
    throw: {
      sig: "throw :tag, value",
      doc: "Non-local exit. Unwinds the stack to the matching catch block.",
    },
    catch: {
      sig: "catch(:tag) { body }",
      doc: "Establishes a catch point for a matching throw.",
    },

    String: {
      sig: "class String",
      doc: "Mutable sequence of bytes representing characters. Supports interpolation in double quotes.",
    },
    Array: {
      sig: "class Array",
      doc: "Ordered, integer-indexed collection. Heterogeneous — can contain objects of any type.",
    },
    Hash: {
      sig: "class Hash",
      doc: 'Key-value store (dictionary). { key: "value", name: "Ruby" }. Keys can be any object.',
    },
    Integer: {
      sig: "class Integer < Numeric",
      doc: "Arbitrary-precision integer. Ruby auto-promotes from fixed to big integers as needed.",
    },
    Float: {
      sig: "class Float < Numeric",
      doc: "Double-precision floating-point number (IEEE 754).",
    },
    Symbol: {
      sig: "class Symbol",
      doc: "Immutable, interned string identifier. :name. Symbols are unique — :foo.object_id == :foo.object_id is always true.",
    },
    Range: {
      sig: "class Range",
      doc: "Represents an interval between two values. 1..10 (inclusive) or 1...10 (exclusive end).",
    },
    Regexp: {
      sig: "class Regexp",
      doc: "Regular expression pattern. /pattern/flags. Supports Oniguruma regex syntax.",
    },
    Proc: {
      sig: "class Proc",
      doc: "Encapsulates a block of code that can be stored and called later. Created via Proc.new, proc, or lambda.",
    },
    IO: {
      sig: "class IO",
      doc: "Base class for input/output. Parent of File. Handles reading/writing to streams.",
    },
    File: {
      sig: "class File < IO",
      doc: "Represents a file system file. Provides methods for reading, writing, and querying file metadata.",
    },
    Dir: {
      sig: "class Dir",
      doc: "Represents a directory. Provides methods for listing contents, changing directories, and globbing.",
    },
    Enumerable: {
      sig: "module Enumerable",
      doc: "Mixin that provides collection methods (map, select, reduce, etc.) to any class implementing each.",
    },
    Comparable: {
      sig: "module Comparable",
      doc: "Mixin that provides comparison operators (<, >, between?, clamp) to any class implementing <=>.",
    },
    Struct: {
      sig: "Struct.new(:attr1, :attr2)",
      doc: "Convenient way to create classes with named attributes. Generates accessors, ==, to_s, etc.",
    },
    Object: {
      sig: "class Object < BasicObject",
      doc: "Default superclass of all Ruby classes. Includes Kernel module.",
    },
    Kernel: {
      sig: "module Kernel",
      doc: "Module mixed into Object. Provides global methods like puts, require, raise, rand, sleep.",
    },
    Thread: {
      sig: "class Thread",
      doc: "Lightweight concurrency primitive. Ruby threads are native OS threads with a Global VM Lock (GVL).",
    },
    Fiber: {
      sig: "class Fiber",
      doc: "Lightweight cooperative concurrency primitive. Must be explicitly resumed. Used for generators and coroutines.",
    },
    Exception: {
      sig: "class Exception",
      doc: "Root class of the exception hierarchy. Rescue StandardError (not Exception) in general code.",
    },
    StandardError: {
      sig: "class StandardError < Exception",
      doc: "Base class for most rescuable errors. The default class caught by rescue without arguments.",
    },
    RuntimeError: {
      sig: "class RuntimeError < StandardError",
      doc: 'Default error raised by raise "message" without specifying a class.',
    },
    TypeError: {
      sig: "class TypeError < StandardError",
      doc: "Raised when an object is not of the expected type.",
    },
    ArgumentError: {
      sig: "class ArgumentError < StandardError",
      doc: "Raised when a method receives an argument it cannot handle (wrong number, invalid value).",
    },
    NameError: {
      sig: "class NameError < StandardError",
      doc: "Raised when a name (variable, method, constant) is not found.",
    },
    NoMethodError: {
      sig: "class NoMethodError < NameError",
      doc: "Raised when a method is called on an object that does not define it.",
    },
    Encoding: {
      sig: "class Encoding",
      doc: "Represents a character encoding (UTF-8, ASCII, etc.). Strings carry their encoding.",
    },
    Numeric: {
      sig: "class Numeric",
      doc: "Abstract superclass for all numeric types (Integer, Float, Rational, Complex).",
    },
    NilClass: {
      sig: "class NilClass",
      doc: "Class of nil. Singleton. nil is falsy and evaluates to false in boolean contexts.",
    },
    TrueClass: {
      sig: "class TrueClass",
      doc: "Class of true. Singleton boolean value.",
    },
    FalseClass: {
      sig: "class FalseClass",
      doc: "Class of false. Singleton. Together with nil, the only falsy values in Ruby.",
    },

    each: {
      sig: "collection.each { |item| block }",
      doc: "Calls the block once for each element in the collection. The fundamental iterator in Ruby.",
    },
    map: {
      sig: "collection.map { |item| block } → Array",
      doc: "Returns a new array containing the results of running the block for every element. Also aliased as collect.",
    },
    select: {
      sig: "collection.select { |item| block } → Array",
      doc: "Returns a new array containing elements for which the block returns true. Also aliased as filter.",
    },
    reject: {
      sig: "collection.reject { |item| block } → Array",
      doc: "Returns a new array excluding elements for which the block returns true. Inverse of select.",
    },
    reduce: {
      sig: "collection.reduce(init) { |memo, item| block } → obj",
      doc: "Combines all elements by applying a binary operation. Also aliased as inject.",
    },
    inject: {
      sig: "collection.inject(init) { |memo, item| block } → obj",
      doc: "Alias for reduce. Combines all elements using the block or a named method.",
    },
    find: {
      sig: "collection.find { |item| block } → obj or nil",
      doc: "Returns the first element for which the block returns true. Also aliased as detect.",
    },
    "any?": {
      sig: "collection.any? { |item| block } → true/false",
      doc: "Returns true if the block returns true for at least one element.",
    },
    "all?": {
      sig: "collection.all? { |item| block } → true/false",
      doc: "Returns true if the block returns true for every element.",
    },
    "none?": {
      sig: "collection.none? { |item| block } → true/false",
      doc: "Returns true if the block returns false for every element.",
    },
    count: {
      sig: "collection.count → Integer\ncollection.count(obj) → Integer",
      doc: "Returns the number of elements, or the number equal to the argument, or matching the block.",
    },
    sort: {
      sig: "collection.sort → Array\ncollection.sort { |a, b| block } → Array",
      doc: "Returns a sorted array. Uses <=> or a custom comparison block.",
    },
    sort_by: {
      sig: "collection.sort_by { |item| key } → Array",
      doc: "Sorts by the value returned by the block (Schwartzian transform). More efficient than sort with a block.",
    },
    flat_map: {
      sig: "collection.flat_map { |item| block } → Array",
      doc: "Maps each element and flattens the result by one level.",
    },
    group_by: {
      sig: "collection.group_by { |item| key } → Hash",
      doc: "Groups elements into a hash where keys are block return values and values are arrays of matching elements.",
    },
    each_with_index: {
      sig: "collection.each_with_index { |item, i| block }",
      doc: "Calls the block with each element and its index.",
    },
    each_with_object: {
      sig: "collection.each_with_object(obj) { |item, memo| block } → obj",
      doc: "Iterates with an accumulator object that is passed to each iteration and returned at the end.",
    },
    zip: {
      sig: "array.zip(other, ...) → Array",
      doc: "Combines elements from multiple arrays into arrays of tuples.",
    },
    compact: {
      sig: "array.compact → Array",
      doc: "Returns a new array with all nil elements removed.",
    },
    uniq: {
      sig: "array.uniq → Array",
      doc: "Returns a new array with duplicate elements removed.",
    },
    flatten: {
      sig: "array.flatten → Array",
      doc: "Returns a one-dimensional array by recursively flattening nested arrays.",
    },
    reverse: {
      sig: "array.reverse → Array",
      doc: "Returns a new array with elements in reverse order.",
    },
    first: {
      sig: "array.first → obj\narray.first(n) → Array",
      doc: "Returns the first element, or the first n elements.",
    },
    last: {
      sig: "array.last → obj\narray.last(n) → Array",
      doc: "Returns the last element, or the last n elements.",
    },
    push: {
      sig: "array.push(obj, ...) → Array",
      doc: "Appends objects to the end of the array. Also available via <<.",
    },
    pop: {
      sig: "array.pop → obj or nil",
      doc: "Removes and returns the last element. Returns nil if empty.",
    },
    shift: {
      sig: "array.shift → obj or nil",
      doc: "Removes and returns the first element.",
    },
    unshift: {
      sig: "array.unshift(obj, ...) → Array",
      doc: "Prepends objects to the front of the array. Also aliased as prepend.",
    },
    join: {
      sig: 'array.join(separator="") → String',
      doc: "Returns a string of all elements joined by the separator.",
    },
    "include?": {
      sig: "collection.include?(obj) → true/false",
      doc: "Returns true if the collection contains the given object (using ==).",
    },
    "empty?": {
      sig: "collection.empty? → true/false",
      doc: "Returns true if the collection has no elements.",
    },
    "nil?": {
      sig: "obj.nil? → true/false",
      doc: "Returns true only for nil. All other objects return false.",
    },
    length: {
      sig: "obj.length → Integer",
      doc: "Returns the length/size of the object (string, array, hash, etc.).",
    },
    size: {
      sig: "obj.size → Integer",
      doc: "Alias for length. Returns the number of elements or characters.",
    },
    to_s: {
      sig: "obj.to_s → String",
      doc: "Returns a string representation of the object.",
    },
    to_i: {
      sig: "obj.to_i → Integer",
      doc: "Converts the object to an integer. Returns 0 if conversion fails.",
    },
    to_f: {
      sig: "obj.to_f → Float",
      doc: "Converts the object to a float. Returns 0.0 if conversion fails.",
    },
    to_a: { sig: "obj.to_a → Array", doc: "Converts the object to an array." },
    to_h: { sig: "obj.to_h → Hash", doc: "Converts the object to a hash." },
    inspect: {
      sig: "obj.inspect → String",
      doc: "Returns a human-readable string representation, useful for debugging.",
    },
    "respond_to?": {
      sig: "obj.respond_to?(method_name) → true/false",
      doc: "Returns true if the object responds to the given method.",
    },
    "is_a?": {
      sig: "obj.is_a?(klass) → true/false",
      doc: "Returns true if the object is an instance of the given class or its subclass. Alias: kind_of?.",
    },
    send: {
      sig: "obj.send(method_name, *args) → result",
      doc: "Invokes the named method, passing any arguments. Can call private methods.",
    },
    new: {
      sig: "ClassName.new(args) → instance",
      doc: "Creates a new instance of the class. Calls initialize with the given arguments.",
    },
    initialize: {
      sig: "def initialize(args)\n  # constructor body\nend",
      doc: "Constructor method called by .new. Always private. Set up instance variables here.",
    },
    open: {
      sig: "File.open(path, mode) { |f| block }\nFile.open(path, mode) → File",
      doc: "Opens a file. With a block, automatically closes the file when the block exits.",
    },
    split: {
      sig: "str.split(pattern=nil, limit=-1) → Array",
      doc: "Divides a string into substrings based on a delimiter pattern.",
    },
    strip: {
      sig: "str.strip → String",
      doc: "Returns a copy with leading and trailing whitespace removed.",
    },
    chomp: {
      sig: "str.chomp(separator=$/) → String",
      doc: "Returns a copy with the trailing record separator removed (default: newline).",
    },
    gsub: {
      sig: "str.gsub(pattern, replacement) → String",
      doc: "Returns a copy with all occurrences of the pattern replaced.",
    },
    sub: {
      sig: "str.sub(pattern, replacement) → String",
      doc: "Returns a copy with the first occurrence of the pattern replaced.",
    },
    match: {
      sig: "str.match(pattern) → MatchData or nil",
      doc: "Matches the string against a regular expression, returning MatchData or nil.",
    },
    tap: {
      sig: "obj.tap { |x| block } → obj",
      doc: "Yields the object to the block and returns the object. Useful for inserting debugging into call chains.",
    },
    then: {
      sig: "obj.then { |x| block } → result",
      doc: "Yields the object to the block and returns the result of the block. Also aliased as yield_self.",
    },
    dup: {
      sig: "obj.dup → copy",
      doc: "Creates a shallow copy of the object. Unfreezes the copy.",
    },
    clone: {
      sig: "obj.clone → copy",
      doc: "Creates a shallow copy of the object, preserving frozen state and singleton methods.",
    },
    rand: {
      sig: "rand(max=0) → Numeric",
      doc: "Returns a random number. rand(10) → 0..9. rand → 0.0...1.0.",
    },
    sleep: {
      sig: "sleep(seconds) → Integer",
      doc: "Suspends the current thread for the given number of seconds.",
    },
    loop: {
      sig: "loop { block }",
      doc: "Executes the block repeatedly forever. Break with break.",
    },
    sum: {
      sig: "collection.sum(init=0) → Numeric",
      doc: "Returns the sum of all elements, plus an optional initial value.",
    },
    min: {
      sig: "collection.min → obj",
      doc: "Returns the minimum element (using <=>).",
    },
    max: {
      sig: "collection.max → obj",
      doc: "Returns the maximum element (using <=>).",
    },
    sample: {
      sig: "array.sample → obj\narray.sample(n) → Array",
      doc: "Returns one or more random elements from the array.",
    },
    shuffle: {
      sig: "array.shuffle → Array",
      doc: "Returns a new array with elements in random order.",
    },
    take: {
      sig: "collection.take(n) → Array",
      doc: "Returns the first n elements.",
    },
    drop: {
      sig: "collection.drop(n) → Array",
      doc: "Returns all elements after the first n.",
    },
    keys: {
      sig: "hash.keys → Array",
      doc: "Returns an array of all keys in the hash.",
    },
    values: {
      sig: "hash.values → Array",
      doc: "Returns an array of all values in the hash.",
    },
    merge: {
      sig: "hash.merge(other) → Hash",
      doc: "Returns a new hash combining both hashes. Values from other win on key conflicts.",
    },
    fetch: {
      sig: "hash.fetch(key)\nhash.fetch(key, default)",
      doc: "Returns the value for the key. Raises KeyError if missing (unlike [] which returns nil).",
    },
    delete: {
      sig: "hash.delete(key) → value or nil",
      doc: "Removes the key-value pair and returns the value, or nil if not found.",
    },
    each_pair: {
      sig: "hash.each_pair { |key, val| block }",
      doc: "Calls the block with each key-value pair. Alias for each on Hash.",
    },
    "map!": {
      sig: "array.map! { |item| block } → Array",
      doc: "Modifies the array in place, replacing each element with the block result. Alias: collect!.",
    },
    "select!": {
      sig: "array.select! { |item| block } → Array or nil",
      doc: "Keeps only elements for which the block returns true, modifying the array in place.",
    },
    tally: {
      sig: "collection.tally → Hash",
      doc: "Counts occurrences of each element. Returns a hash of element => count.",
    },
    chunk: {
      sig: "collection.chunk { |item| key } → Enumerator",
      doc: "Groups consecutive elements that share the same block return value.",
    },
    dig: {
      sig: "obj.dig(key, ...) → value or nil",
      doc: "Navigates into nested hashes/arrays. Returns nil if any intermediate key is missing.",
    },
  };

  // ============================================================
  //  DATA: Snippet templates
  // ============================================================
  const SNIPPETS = [
    {
      label: "def",
      detail: "Method definition",
      insert: "def ${1:method_name}(${2:args})\n  ${0}\nend",
    },
    {
      label: "defs",
      detail: "Class method definition",
      insert: "def self.${1:method_name}(${2:args})\n  ${0}\nend",
    },
    {
      label: "class",
      detail: "Class definition",
      insert: "class ${1:ClassName}\n  ${0}\nend",
    },
    {
      label: "classi",
      detail: "Class with initialize",
      insert:
        "class ${1:ClassName}\n  def initialize(${2:args})\n    ${0}\n  end\nend",
    },
    {
      label: "classp",
      detail: "Class with parent",
      insert:
        "class ${1:ClassName} < ${2:ParentClass}\n  def initialize(${3:args})\n    super(${4})\n    ${0}\n  end\nend",
    },
    {
      label: "module",
      detail: "Module definition",
      insert: "module ${1:ModuleName}\n  ${0}\nend",
    },
    {
      label: "if",
      detail: "if / end",
      insert: "if ${1:condition}\n  ${0}\nend",
    },
    {
      label: "ife",
      detail: "if / else / end",
      insert: "if ${1:condition}\n  ${2}\nelse\n  ${0}\nend",
    },
    {
      label: "ifel",
      detail: "if / elsif / else / end",
      insert:
        "if ${1:condition}\n  ${2}\nelsif ${3:condition}\n  ${4}\nelse\n  ${0}\nend",
    },
    {
      label: "unless",
      detail: "unless / end",
      insert: "unless ${1:condition}\n  ${0}\nend",
    },
    {
      label: "case",
      detail: "case / when / end",
      insert:
        "case ${1:expression}\nwhen ${2:value}\n  ${3}\nwhen ${4:value}\n  ${5}\nelse\n  ${0}\nend",
    },
    {
      label: "while",
      detail: "while / end",
      insert: "while ${1:condition}\n  ${0}\nend",
    },
    {
      label: "until",
      detail: "until / end",
      insert: "until ${1:condition}\n  ${0}\nend",
    },
    {
      label: "begin",
      detail: "begin / rescue / end",
      insert: "begin\n  ${1}\nrescue ${2:StandardError} => ${3:e}\n  ${0}\nend",
    },
    {
      label: "beginf",
      detail: "begin / rescue / ensure",
      insert:
        "begin\n  ${1}\nrescue ${2:StandardError} => ${3:e}\n  ${4}\nensure\n  ${0}\nend",
    },
    {
      label: "each",
      detail: ".each do |item| ... end",
      insert: "each do |${1:item}|\n  ${0}\nend",
    },
    {
      label: "eachi",
      detail: ".each_with_index do ... end",
      insert: "each_with_index do |${1:item}, ${2:index}|\n  ${0}\nend",
    },
    {
      label: "mapit",
      detail: ".map do |item| ... end",
      insert: "map do |${1:item}|\n  ${0}\nend",
    },
    {
      label: "sel",
      detail: ".select do |item| ... end",
      insert: "select do |${1:item}|\n  ${0}\nend",
    },
    {
      label: "red",
      detail: ".reduce do ... end",
      insert: "reduce(${1:initial}) do |${2:memo}, ${3:item}|\n  ${0}\nend",
    },
    {
      label: "do",
      detail: "do |args| ... end block",
      insert: "do |${1}|\n  ${0}\nend",
    },
    {
      label: "init",
      detail: "initialize method",
      insert: "def initialize(${1:args})\n  ${0}\nend",
    },
    {
      label: "frozen",
      detail: "frozen_string_literal",
      insert: "# frozen_string_literal: true\n${0}",
    },
    {
      label: "lam",
      detail: "Lambda (stabby)",
      insert: "->(${1:args}) { ${0} }",
    },
    { label: "prc", detail: "Proc.new", insert: "proc { |${1:args}| ${0} }" },
    { label: "attr", detail: "attr_accessor", insert: "attr_accessor :${0}" },
    { label: "attrr", detail: "attr_reader", insert: "attr_reader :${0}" },
    { label: "attrw", detail: "attr_writer", insert: "attr_writer :${0}" },
    { label: "req", detail: "require 'lib'", insert: "require '${0}'" },
    {
      label: "reqr",
      detail: "require_relative 'path'",
      insert: "require_relative '${0}'",
    },
    {
      label: "struct",
      detail: "Struct definition",
      insert:
        "${1:Name} = Struct.new(:${2:attr1}, :${3:attr2}) do\n  ${0}\nend",
    },
    {
      label: "forr",
      detail: "for loop",
      insert: "for ${1:item} in ${2:collection}\n  ${0}\nend",
    },
    {
      label: "loopd",
      detail: "loop do ... end",
      insert: "loop do\n  ${0}\n  break if ${1:condition}\nend",
    },
    {
      label: "fopen",
      detail: "File.open block",
      insert: "File.open('${1:path}', '${2:r}') do |${3:f}|\n  ${0}\nend",
    },
    {
      label: "rais",
      detail: "raise exception",
      insert: "raise ${1:RuntimeError}, '${0:message}'",
    },
  ];

  // ============================================================
  //  DATA: Method completions (shown after dot)
  // ============================================================
  const METHOD_ITEMS = [
    "each",
    "map",
    "select",
    "reject",
    "reduce",
    "inject",
    "find",
    "detect",
    "any?",
    "all?",
    "none?",
    "count",
    "sort",
    "sort_by",
    "reverse",
    "flat_map",
    "group_by",
    "zip",
    "compact",
    "uniq",
    "flatten",
    "first",
    "last",
    "push",
    "pop",
    "shift",
    "unshift",
    "join",
    "split",
    "strip",
    "chomp",
    "chop",
    "gsub",
    "sub",
    "match",
    "scan",
    "include?",
    "empty?",
    "nil?",
    "length",
    "size",
    "to_s",
    "to_i",
    "to_f",
    "to_a",
    "to_h",
    "to_sym",
    "inspect",
    "freeze",
    "frozen?",
    "dup",
    "clone",
    "tap",
    "then",
    "yield_self",
    "respond_to?",
    "is_a?",
    "kind_of?",
    "instance_of?",
    "send",
    "public_send",
    "method",
    "methods",
    "class",
    "object_id",
    "hash",
    "equal?",
    "eql?",
    "taint",
    "untaint",
    "tainted?",
    "each_with_index",
    "each_with_object",
    "each_slice",
    "each_cons",
    "chunk",
    "min",
    "max",
    "min_by",
    "max_by",
    "minmax",
    "minmax_by",
    "sum",
    "tally",
    "sample",
    "shuffle",
    "take",
    "take_while",
    "drop",
    "drop_while",
    "select!",
    "reject!",
    "map!",
    "collect!",
    "flatten!",
    "compact!",
    "uniq!",
    "reverse!",
    "sort!",
    "sort_by!",
    "rotate",
    "rotate!",
    "delete",
    "delete_at",
    "delete_if",
    "keep_if",
    "index",
    "rindex",
    "at",
    "fetch",
    "dig",
    "slice",
    "values_at",
    "assoc",
    "rassoc",
    "combination",
    "permutation",
    "product",
    "transpose",
    "pack",
    "concat",
    "append",
    "prepend",
    "insert",
    "keys",
    "values",
    "merge",
    "merge!",
    "update",
    "each_pair",
    "each_key",
    "each_value",
    "has_key?",
    "has_value?",
    "key?",
    "value?",
    "store",
    "to_proc",
    "call",
    "arity",
    "curry",
    "upcase",
    "downcase",
    "capitalize",
    "swapcase",
    "center",
    "ljust",
    "rjust",
    "chars",
    "bytes",
    "lines",
    "encode",
    "encoding",
    "force_encoding",
    "b",
    "start_with?",
    "end_with?",
    "replace",
    "clear",
    "hex",
    "oct",
    "succ",
    "next",
    "upto",
    "downto",
    "times",
    "abs",
    "ceil",
    "floor",
    "round",
    "truncate",
    "divmod",
    "modulo",
    "remainder",
    "zero?",
    "positive?",
    "negative?",
    "even?",
    "odd?",
    "between?",
    "clamp",
    "infinite?",
    "nan?",
    "finite?",
    "new",
    "open",
    "read",
    "write",
    "close",
    "closed?",
    "puts",
    "print",
    "gets",
    "readline",
    "readlines",
    "each_line",
    "rewind",
    "seek",
    "tell",
    "pos",
    "eof?",
    "exist?",
    "exists?",
    "file?",
    "directory?",
    "readable?",
    "writable?",
    "executable?",
    "basename",
    "dirname",
    "extname",
    "expand_path",
    "absolute_path",
    "glob",
    "entries",
  ];

  // ============================================================
  //  SECTION 1: Language Registration & Configuration
  // ============================================================
  monaco.languages.register({
    id: "ruby",
    extensions: [".rb", ".rbx", ".rjs", ".gemspec", ".rake", ".ru"],
    aliases: ["Ruby", "rb"],
    mimetypes: ["text/x-ruby"],
  });

  monaco.languages.setLanguageConfiguration("ruby", {
    comments: { lineComment: "#", blockComment: ["=begin", "=end"] },
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
      { open: "`", close: "`" },
      { open: "|", close: "|" },
    ],
    surroundingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: '"', close: '"' },
      { open: "'", close: "'" },
      { open: "`", close: "`" },
      { open: "|", close: "|" },
    ],
    indentationRules: {
      increaseIndentPattern:
        /^\s*(module|class|def|if|unless|case|while|until|for|begin|else|elsif|ensure|rescue|when|do)\b(?!.*\bend\b).*$/,
      decreaseIndentPattern: /^\s*(end|else|elsif|ensure|rescue|when)\b.*$/,
    },
    folding: {
      markers: {
        start:
          /^\s*(#\s*region\b|module\b|class\b|def\b|if\b|unless\b|case\b|while\b|until\b|for\b|begin\b|do\b)/,
        end: /^\s*(#\s*endregion\b|end\b)/,
      },
    },
    onEnterRules: [
      {
        beforeText:
          /^\s*(def|class|module|if|unless|case|while|until|for|begin|do|else|elsif|rescue|ensure|when)\b.*$/,
        action: { indentAction: monaco.languages.IndentAction.Indent },
      },
    ],
    wordPattern:
      /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
  });

  // ============================================================
  //  SECTION 2: Monarch Tokenizer
  // ============================================================
  monaco.languages.setMonarchTokensProvider("ruby", {
    defaultToken: "",
    tokenPostfix: ".ruby",

    keywords: [
      "BEGIN",
      "END",
      "alias",
      "and",
      "begin",
      "break",
      "case",
      "class",
      "def",
      "defined?",
      "do",
      "else",
      "elsif",
      "end",
      "ensure",
      "false",
      "for",
      "if",
      "in",
      "module",
      "next",
      "nil",
      "not",
      "or",
      "redo",
      "rescue",
      "retry",
      "return",
      "self",
      "super",
      "then",
      "true",
      "undef",
      "unless",
      "until",
      "when",
      "while",
      "yield",
      "__FILE__",
      "__LINE__",
      "__ENCODING__",
    ],

    builtinFunctions: [
      "require",
      "require_relative",
      "include",
      "extend",
      "prepend",
      "attr_accessor",
      "attr_reader",
      "attr_writer",
      "public",
      "private",
      "protected",
      "raise",
      "throw",
      "catch",
      "proc",
      "lambda",
      "puts",
      "print",
      "p",
      "pp",
      "warn",
      "fail",
      "block_given?",
      "loop",
      "sleep",
      "rand",
      "srand",
      "exit",
      "abort",
      "at_exit",
      "freeze",
      "frozen?",
      "sprintf",
      "format",
      "gets",
      "readline",
    ],

    builtinTypes: [
      "Array",
      "Hash",
      "String",
      "Integer",
      "Float",
      "Symbol",
      "Range",
      "Regexp",
      "Proc",
      "Method",
      "IO",
      "File",
      "Dir",
      "Time",
      "Struct",
      "OpenStruct",
      "Comparable",
      "Enumerable",
      "Enumerator",
      "Thread",
      "Mutex",
      "Fiber",
      "Rational",
      "Complex",
      "Numeric",
      "TrueClass",
      "FalseClass",
      "NilClass",
      "Object",
      "BasicObject",
      "Kernel",
      "Module",
      "Class",
      "Exception",
      "StandardError",
      "RuntimeError",
      "TypeError",
      "ArgumentError",
      "NameError",
      "NoMethodError",
      "IOError",
      "Encoding",
      "GC",
      "ObjectSpace",
      "Process",
      "Signal",
      "Math",
      "ENV",
      "ARGV",
      "ARGF",
      "STDIN",
      "STDOUT",
      "STDERR",
      "DATA",
      "TRUE",
      "FALSE",
      "NIL",
    ],

    escapes:
      /\\(?:[abefnrstv\\"'0]|x[0-9A-Fa-f]{1,2}|u[0-9A-Fa-f]{4}|u\{[0-9A-Fa-f]+\})/,
    symbols: /[=><!~?:&|+\-*\/\^%\.]+/,

    tokenizer: {
      root: [
        [/\s+/, "white"],

        // Multi-line comments
        [/^=begin\b/, "comment", "@multiComment"],

        // Single-line comments
        [/#.*$/, "comment"],

        // Heredocs
        [
          /<<[-~]?(\w+)/,
          { token: "string.heredoc.delimiter", next: "@heredoc.$1" },
        ],
        [
          /<<[-~]?"(\w+)"/,
          { token: "string.heredoc.delimiter", next: "@heredoc.$1" },
        ],
        [
          /<<[-~]?'(\w+)'/,
          { token: "string.heredoc.delimiter", next: "@heredocPlain.$1" },
        ],

        // Symbols
        [/:[a-zA-Z_]\w*[!?=]?/, "string.symbol"],
        [/:"/, "string.symbol", "@symbolString"],

        // Numbers
        [/0[xX][0-9a-fA-F](_?[0-9a-fA-F])*/, "number.hex"],
        [/0[oO][0-7](_?[0-7])*/, "number.octal"],
        [/0[bB][01](_?[01])*/, "number.binary"],
        [/\d(_?\d)*\.\d(_?\d)*([eE][-+]?\d+)?/, "number.float"],
        [/\d(_?\d)*[eE][-+]?\d+/, "number.float"],
        [/\d(_?\d)*r?i?/, "number"],

        // Variables
        [/@@[a-zA-Z_]\w*/, "variable"],
        [/@[a-zA-Z_]\w*/, "variable"],
        [/\$[a-zA-Z_]\w*/, "variable"],
        [/\$[!@&`'+~=\/\\,;.<>*$?:"]/, "variable"],
        [/\$-\w/, "variable"],
        [/\$\d+/, "variable"],

        // Constants and types (PascalCase or ALL_CAPS)
        [
          /[A-Z]\w*/,
          {
            cases: {
              "@builtinTypes": "type",
              "@default": "type.identifier",
            },
          },
        ],

        // Method definitions
        [
          /(def)(\s+)(self)(\.)?([a-zA-Z_]\w*[!?=]?)/,
          ["keyword", "white", "variable", "delimiter", "identifier.method"],
        ],
        [
          /(def)(\s+)([a-zA-Z_]\w*[!?=]?)/,
          ["keyword", "white", "identifier.method"],
        ],

        // Identifiers and keywords
        [
          /[a-zA-Z_]\w*[!?]?/,
          {
            cases: {
              "@keywords": "keyword",
              "@builtinFunctions": "support.function",
              "@default": "identifier",
            },
          },
        ],

        // Strings
        [/"/, "string", "@doubleString"],
        [/'/, "string", "@singleString"],
        [/`/, "string", "@backtickString"],

        // Percent literals
        [/%[qQ]?\(/, "string", "@pctParen"],
        [/%[qQ]?\[/, "string", "@pctBracket"],
        [/%[qQ]?\{/, "string", "@pctBrace"],
        [/%[wWiI]\(/, "string", "@pctParen"],
        [/%[wWiI]\[/, "string", "@pctBracket"],
        [/%[wWiI]\{/, "string", "@pctBrace"],
        [/%r\(/, "regexp", "@regexpParen"],
        [/%r\[/, "regexp", "@regexpBracket"],
        [/%r\{/, "regexp", "@regexpBrace"],

        // Regex (simple inline heuristic)
        [/\/(?=[^\/\*\s])(?:[^\/\\]|\\.)*\/[imxo]*/, "regexp"],

        // Delimiters
        [/[{}()\[\]]/, "@brackets"],
        [/[;,]/, "delimiter"],
        [/\.\.\.?/, "operator"],
        [/=>/, "operator"],
        [/->/, "operator"],
        [
          /<<=?|>>=?|<=>|===|!~|=~|&&|\|\||[!=<>]=?|[&|^~+\-*\/%]=?|\*\*=?/,
          "operator",
        ],
        [/[?:]/, "operator"],
      ],

      multiComment: [
        [/^=end\b/, "comment", "@pop"],
        [/.*/, "comment"],
      ],

      heredoc: [
        [
          /^(\s*)(\w+)\s*$/,
          {
            cases: {
              "$2==$S2": { token: "string.heredoc.delimiter", next: "@pop" },
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
              "$2==$S2": { token: "string.heredoc.delimiter", next: "@pop" },
              "@default": "string.heredoc",
            },
          },
        ],
        [/.*/, "string.heredoc"],
      ],

      doubleString: [
        [/[^\\\"#]+/, "string"],
        [/#\{/, { token: "string.interpolation", next: "@interpolation" }],
        [/#[@$]/, "string.interpolation"],
        [/@escapes/, "string.escape"],
        [/\\./, "string.escape"],
        [/"/, "string", "@pop"],
      ],

      singleString: [
        [/[^\\']+/, "string"],
        [/\\./, "string.escape"],
        [/'/, "string", "@pop"],
      ],

      backtickString: [
        [/[^\\`#]+/, "string"],
        [/#\{/, { token: "string.interpolation", next: "@interpolation" }],
        [/@escapes/, "string.escape"],
        [/\\./, "string.escape"],
        [/`/, "string", "@pop"],
      ],

      symbolString: [
        [/[^\\"#]+/, "string.symbol"],
        [/#\{/, { token: "string.interpolation", next: "@interpolation" }],
        [/@escapes/, "string.escape"],
        [/\\./, "string.escape"],
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
        [/\)[imxo]*/, "regexp", "@pop"],
      ],
      regexpBracket: [
        [/[^\\\]]+/, "regexp"],
        [/\\./, "regexp.escape"],
        [/\][imxo]*/, "regexp", "@pop"],
      ],
      regexpBrace: [
        [/[^\\}]+/, "regexp"],
        [/\\./, "regexp.escape"],
        [/\}[imxo]*/, "regexp", "@pop"],
      ],
    },
  });

  // ============================================================
  //  SECTION 3: Completion Provider
  // ============================================================
  monaco.languages.registerCompletionItemProvider("ruby", {
    triggerCharacters: [".", ":", "@"],
    provideCompletionItems: function (model, position) {
      var word = model.getWordUntilPosition(position);
      var range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };
      var line = model.getLineContent(position.lineNumber);
      var before = line.substring(0, word.startColumn - 1);
      var isDot = before.trimEnd().endsWith(".");
      var isColon = before.trimEnd().endsWith("::");

      var suggestions = [];

      // After a dot → method completions
      if (isDot) {
        var unique = [];
        var seen = {};
        METHOD_ITEMS.forEach(function (m) {
          if (!seen[m]) {
            seen[m] = true;
            unique.push(m);
          }
        });
        unique.forEach(function (m) {
          var hd = HOVER_DOCS[m];
          suggestions.push({
            label: m,
            kind: monaco.languages.CompletionItemKind.Method,
            insertText: m,
            range: range,
            detail: hd ? hd.sig.split("\n")[0] : "method",
            documentation: hd ? hd.doc : undefined,
            sortText: "0" + m,
          });
        });
        return { suggestions: suggestions };
      }

      // After :: → class/constant completions
      if (isColon) {
        var types = [
          "Array",
          "Hash",
          "String",
          "Integer",
          "Float",
          "Symbol",
          "Range",
          "Regexp",
          "Proc",
          "IO",
          "File",
          "Dir",
          "Time",
          "Struct",
          "Thread",
          "Fiber",
          "Encoding",
          "GC",
          "Math",
          "Process",
          "Enumerable",
          "Comparable",
          "Kernel",
          "Object",
        ];
        types.forEach(function (t) {
          suggestions.push({
            label: t,
            kind: monaco.languages.CompletionItemKind.Class,
            insertText: t,
            range: range,
            detail: "class/module",
          });
        });
        [
          "new",
          "open",
          "read",
          "write",
          "exist?",
          "delete",
          "glob",
          "entries",
          "foreach",
        ].forEach(function (m) {
          suggestions.push({
            label: m,
            kind: monaco.languages.CompletionItemKind.Method,
            insertText: m,
            range: range,
            detail: "class method",
          });
        });
        return { suggestions: suggestions };
      }

      // Keywords
      var keywords = [
        "BEGIN",
        "END",
        "alias",
        "and",
        "begin",
        "break",
        "case",
        "class",
        "def",
        "defined?",
        "do",
        "else",
        "elsif",
        "end",
        "ensure",
        "false",
        "for",
        "if",
        "in",
        "module",
        "next",
        "nil",
        "not",
        "or",
        "redo",
        "rescue",
        "retry",
        "return",
        "self",
        "super",
        "then",
        "true",
        "undef",
        "unless",
        "until",
        "when",
        "while",
        "yield",
        "__FILE__",
        "__LINE__",
        "__ENCODING__",
        "require",
        "require_relative",
        "include",
        "extend",
        "prepend",
        "attr_accessor",
        "attr_reader",
        "attr_writer",
        "public",
        "private",
        "protected",
        "raise",
        "throw",
        "catch",
        "proc",
        "lambda",
        "puts",
        "print",
        "p",
        "pp",
        "freeze",
        "frozen?",
        "block_given?",
        "loop",
        "sleep",
        "rand",
      ];
      keywords.forEach(function (kw) {
        var hd = HOVER_DOCS[kw];
        suggestions.push({
          label: kw,
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: kw,
          range: range,
          detail: "keyword",
          documentation: hd ? hd.doc : undefined,
          sortText: "1" + kw,
        });
      });

      // Built-in types
      var btypes = [
        "Array",
        "Hash",
        "String",
        "Integer",
        "Float",
        "Symbol",
        "Range",
        "Regexp",
        "Proc",
        "Method",
        "IO",
        "File",
        "Dir",
        "Time",
        "Struct",
        "OpenStruct",
        "Comparable",
        "Enumerable",
        "Enumerator",
        "Thread",
        "Mutex",
        "Fiber",
        "Rational",
        "Complex",
        "Numeric",
        "TrueClass",
        "FalseClass",
        "NilClass",
        "Object",
        "BasicObject",
        "Kernel",
        "Module",
        "Class",
        "Exception",
        "StandardError",
        "RuntimeError",
        "TypeError",
        "ArgumentError",
        "NameError",
        "NoMethodError",
        "IOError",
        "Encoding",
        "Math",
      ];
      btypes.forEach(function (t) {
        var hd = HOVER_DOCS[t];
        suggestions.push({
          label: t,
          kind: monaco.languages.CompletionItemKind.Class,
          insertText: t,
          range: range,
          detail: "class",
          documentation: hd ? hd.doc : undefined,
          sortText: "2" + t,
        });
      });

      // Snippets
      SNIPPETS.forEach(function (sn) {
        suggestions.push({
          label: sn.label,
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: sn.insert,
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range: range,
          detail: sn.detail + " (snippet)",
          documentation:
            "Inserts: " +
            sn.insert
              .replace(/\$\{\d+:?([^}]*)\}/g, "$1")
              .replace(/\$\d+/g, ""),
          sortText: "0" + sn.label,
        });
      });

      // User-defined symbols from the document
      var lines = model.getLinesContent();
      var userSymbols = {};
      for (var li = 0; li < lines.length; li++) {
        var ln = lines[li];
        var m;
        m = ln.match(/\bdef\s+(?:self\.)?(\w+[!?=]?)/);
        if (m) userSymbols[m[1]] = true;
        m = ln.match(/\bclass\s+(\w+)/);
        if (m) userSymbols[m[1]] = true;
        m = ln.match(/\bmodule\s+(\w+)/);
        if (m) userSymbols[m[1]] = true;
        m = ln.match(/([A-Z][A-Z_0-9]+)\s*=/);
        if (m) userSymbols[m[1]] = true;
      }
      var existingLabels = {};
      suggestions.forEach(function (s) {
        existingLabels[s.label] = true;
      });
      Object.keys(userSymbols).forEach(function (sym) {
        if (!existingLabels[sym]) {
          suggestions.push({
            label: sym,
            kind: sym.match(/^[A-Z]/)
              ? monaco.languages.CompletionItemKind.Class
              : monaco.languages.CompletionItemKind.Function,
            insertText: sym,
            range: range,
            detail: "user-defined",
            sortText: "3" + sym,
          });
        }
      });

      return { suggestions: suggestions };
    },
  });

  // ============================================================
  //  SECTION 4: Hover Provider
  // ============================================================
  monaco.languages.registerHoverProvider("ruby", {
    provideHover: function (model, position) {
      var word = model.getWordAtPosition(position);
      if (!word) return null;

      var line = model.getLineContent(position.lineNumber);
      var prefix = line.substring(
        Math.max(0, word.startColumn - 3),
        word.startColumn - 1,
      );
      var lookupWord = word.word;
      var varPrefix = "";
      if (prefix.endsWith("@@")) {
        varPrefix = "@@";
      } else if (prefix.endsWith("@")) {
        varPrefix = "@";
      } else if (prefix.endsWith("$")) {
        varPrefix = "$";
      }

      if (varPrefix) {
        var fullVar = varPrefix + word.word;
        var varTypes = {
          "@": "Instance variable",
          "@@": "Class variable",
          $: "Global variable",
        };
        var lines = model.getLinesContent();
        var assignment = null;
        for (var i = 0; i < lines.length; i++) {
          var re = new RegExp(
            fullVar.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\s*=\\s*(.+)",
          );
          var m = lines[i].match(re);
          if (m) {
            assignment = m[1].trim();
            break;
          }
        }
        return {
          range: new monaco.Range(
            position.lineNumber,
            word.startColumn,
            position.lineNumber,
            word.endColumn,
          ),
          contents: [
            { value: "```ruby\n" + fullVar + "\n```" },
            {
              value:
                varTypes[varPrefix] +
                (assignment ? "\n\nAssigned: `" + assignment + "`" : ""),
            },
          ],
        };
      }

      var doc = HOVER_DOCS[lookupWord];
      if (doc) {
        var contents = [];
        if (doc.sig) contents.push({ value: "```ruby\n" + doc.sig + "\n```" });
        if (doc.doc) contents.push({ value: doc.doc });
        return {
          range: new monaco.Range(
            position.lineNumber,
            word.startColumn,
            position.lineNumber,
            word.endColumn,
          ),
          contents: contents,
        };
      }

      // Check user-defined symbols
      var allLines = model.getLinesContent();
      for (var j = 0; j < allLines.length; j++) {
        var defRe = new RegExp(
          "\\b(def|class|module)\\s+(?:self\\.)?(" +
            lookupWord.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") +
            ")\\b",
        );
        var dm = allLines[j].match(defRe);
        if (dm) {
          return {
            range: new monaco.Range(
              position.lineNumber,
              word.startColumn,
              position.lineNumber,
              word.endColumn,
            ),
            contents: [
              { value: "```ruby\n" + allLines[j].trim() + "\n```" },
              { value: "Defined at line " + (j + 1) },
            ],
          };
        }
      }

      return null;
    },
  });

  // ============================================================
  //  SECTION 5: Definition Provider
  // ============================================================
  monaco.languages.registerDefinitionProvider("ruby", {
    provideDefinition: function (model, position) {
      var word = model.getWordAtPosition(position);
      if (!word) return null;
      var search = word.word;
      var lines = model.getLinesContent();
      var definitions = [];
      var esc = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      for (var i = 0; i < lines.length; i++) {
        var ln = lines[i];

        var defRe = new RegExp("\\b(def)\\s+(?:self\\.)?(" + esc + ")\\b");
        var m = ln.match(defRe);
        if (m) {
          var col = ln.indexOf(m[2], m.index + m[1].length) + 1;
          definitions.push({
            uri: model.uri,
            range: new monaco.Range(i + 1, col, i + 1, col + m[2].length),
          });
        }

        var classRe = new RegExp("\\b(class|module)\\s+(" + esc + ")\\b");
        m = ln.match(classRe);
        if (m) {
          var col2 = ln.indexOf(m[2], m.index + m[1].length) + 1;
          definitions.push({
            uri: model.uri,
            range: new monaco.Range(i + 1, col2, i + 1, col2 + m[2].length),
          });
        }

        if (search.match(/^[A-Z]/)) {
          var constRe = new RegExp("\\b(" + esc + ")\\s*=");
          m = ln.match(constRe);
          if (m) {
            var col3 = ln.indexOf(m[1]) + 1;
            definitions.push({
              uri: model.uri,
              range: new monaco.Range(i + 1, col3, i + 1, col3 + m[1].length),
            });
          }
        }
      }

      return definitions.length > 0 ? definitions : null;
    },
  });

  // ============================================================
  //  SECTION 6: Signature Help Provider
  // ============================================================
  monaco.languages.registerSignatureHelpProvider("ruby", {
    signatureHelpTriggerCharacters: ["(", ","],
    provideSignatureHelp: function (model, position) {
      var line = model.getLineContent(position.lineNumber);
      var textBefore = line.substring(0, position.column - 1);

      var callMatch = textBefore.match(/(\w+[!?]?)\s*\(([^)]*)$/);
      if (!callMatch) return null;

      var methodName = callMatch[1];
      var argsText = callMatch[2];
      var commaMatches = argsText.match(/,/g);
      var activeParam = commaMatches ? commaMatches.length : 0;

      var signatures = {
        puts: {
          label: "puts(obj, ...) → nil",
          params: [
            { label: "obj", documentation: "Object to print (calls .to_s)" },
          ],
        },
        print: {
          label: "print(obj, ...) → nil",
          params: [{ label: "obj", documentation: "Object to print" }],
        },
        p: {
          label: "p(obj, ...) → obj",
          params: [
            { label: "obj", documentation: "Object to inspect and print" },
          ],
        },
        rand: {
          label: "rand(max=0) → Numeric",
          params: [{ label: "max", documentation: "Upper bound (exclusive)" }],
        },
        sleep: {
          label: "sleep(seconds) → Integer",
          params: [
            { label: "seconds", documentation: "Number of seconds to sleep" },
          ],
        },
        raise: {
          label: "raise(exception_class, message)",
          params: [
            {
              label: "exception_class",
              documentation: "Exception class (default: RuntimeError)",
            },
            { label: "message", documentation: "Error message string" },
          ],
        },
        open: {
          label: "File.open(filename, mode='r') { |file| ... }",
          params: [
            { label: "filename", documentation: "Path to the file" },
            {
              label: "mode",
              documentation: "File mode: 'r', 'w', 'a', 'r+', etc.",
            },
          ],
        },
        new: {
          label: "ClassName.new(args)",
          params: [
            { label: "args", documentation: "Arguments passed to initialize" },
          ],
        },
        map: {
          label: "map { |element| block } → Array",
          params: [{ label: "element", documentation: "Current element" }],
        },
        select: {
          label: "select { |element| block } → Array",
          params: [{ label: "element", documentation: "Current element" }],
        },
        reject: {
          label: "reject { |element| block } → Array",
          params: [{ label: "element", documentation: "Current element" }],
        },
        reduce: {
          label: "reduce(initial) { |memo, element| block } → obj",
          params: [
            { label: "initial", documentation: "Initial accumulator value" },
            { label: "memo", documentation: "Accumulator" },
          ],
        },
        each: {
          label: "each { |element| block } → self",
          params: [{ label: "element", documentation: "Current element" }],
        },
        gsub: {
          label: "gsub(pattern, replacement) → String",
          params: [
            { label: "pattern", documentation: "Regexp or String to match" },
            { label: "replacement", documentation: "Replacement string" },
          ],
        },
        sub: {
          label: "sub(pattern, replacement) → String",
          params: [
            { label: "pattern", documentation: "Regexp or String to match" },
            { label: "replacement", documentation: "Replacement string" },
          ],
        },
        split: {
          label: "split(pattern=nil, limit=-1) → Array",
          params: [
            { label: "pattern", documentation: "Delimiter pattern" },
            { label: "limit", documentation: "Max number of splits" },
          ],
        },
        fetch: {
          label: "fetch(key, default=nil) → value",
          params: [
            { label: "key", documentation: "Key to look up" },
            {
              label: "default",
              documentation: "Default value if key not found",
            },
          ],
        },
        join: {
          label: "join(separator='') → String",
          params: [
            {
              label: "separator",
              documentation: "String to insert between elements",
            },
          ],
        },
        "include?": {
          label: "include?(obj) → true/false",
          params: [{ label: "obj", documentation: "Object to search for" }],
        },
        "respond_to?": {
          label: "respond_to?(method_name) → true/false",
          params: [
            {
              label: "method_name",
              documentation: "Method name as symbol or string",
            },
          ],
        },
        "is_a?": {
          label: "is_a?(klass) → true/false",
          params: [
            {
              label: "klass",
              documentation: "Class or module to check against",
            },
          ],
        },
        send: {
          label: "send(method_name, *args) → result",
          params: [
            { label: "method_name", documentation: "Method to invoke" },
            { label: "args", documentation: "Arguments to pass" },
          ],
        },
        sort_by: {
          label: "sort_by { |element| key } → Array",
          params: [{ label: "element", documentation: "Current element" }],
        },
        dig: {
          label: "dig(key, ...) → value or nil",
          params: [{ label: "key", documentation: "Key for nested lookup" }],
        },
        match: {
          label: "match(pattern) → MatchData or nil",
          params: [
            { label: "pattern", documentation: "Regexp pattern to match" },
          ],
        },
        format: {
          label: "format(format_string, *args) → String",
          params: [
            {
              label: "format_string",
              documentation: "Format string with % placeholders",
            },
            { label: "args", documentation: "Values to substitute" },
          ],
        },
      };

      var sig = signatures[methodName];
      if (!sig) return null;

      return {
        value: {
          signatures: [
            {
              label: sig.label,
              parameters: sig.params,
            },
          ],
          activeSignature: 0,
          activeParameter: Math.min(activeParam, sig.params.length - 1),
        },
        dispose: function () {},
      };
    },
  });

  // ============================================================
  //  SECTION 7: Document Symbol Provider
  // ============================================================
  monaco.languages.registerDocumentSymbolProvider("ruby", {
    provideDocumentSymbols: function (model) {
      var result = [];
      var lines = model.getLinesContent();
      for (var i = 0; i < lines.length; i++) {
        var ln = lines[i];
        var m;
        m = ln.match(/\b(class)\s+(\w+)/);
        if (m) {
          result.push({
            name: m[2],
            kind: monaco.languages.SymbolKind.Class,
            range: new monaco.Range(i + 1, 1, i + 1, ln.length + 1),
            selectionRange: new monaco.Range(
              i + 1,
              ln.indexOf(m[2]) + 1,
              i + 1,
              ln.indexOf(m[2]) + 1 + m[2].length,
            ),
          });
        }
        m = ln.match(/\b(module)\s+(\w+)/);
        if (m) {
          result.push({
            name: m[2],
            kind: monaco.languages.SymbolKind.Module,
            range: new monaco.Range(i + 1, 1, i + 1, ln.length + 1),
            selectionRange: new monaco.Range(
              i + 1,
              ln.indexOf(m[2]) + 1,
              i + 1,
              ln.indexOf(m[2]) + 1 + m[2].length,
            ),
          });
        }
        m = ln.match(/\bdef\s+(?:self\.)?(\w+[!?=]?)/);
        if (m) {
          result.push({
            name: m[1],
            kind: monaco.languages.SymbolKind.Method,
            range: new monaco.Range(i + 1, 1, i + 1, ln.length + 1),
            selectionRange: new monaco.Range(
              i + 1,
              ln.indexOf(m[1]) + 1,
              i + 1,
              ln.indexOf(m[1]) + 1 + m[1].length,
            ),
          });
        }
        m = ln.match(/([A-Z][A-Z_0-9]+)\s*=/);
        if (m) {
          result.push({
            name: m[1],
            kind: monaco.languages.SymbolKind.Constant,
            range: new monaco.Range(i + 1, 1, i + 1, ln.length + 1),
            selectionRange: new monaco.Range(
              i + 1,
              ln.indexOf(m[1]) + 1,
              i + 1,
              ln.indexOf(m[1]) + 1 + m[1].length,
            ),
          });
        }
      }
      return result;
    },
  });
};
