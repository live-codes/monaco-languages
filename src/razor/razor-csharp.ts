import type * as Monaco from "monaco-editor";

// ─── C# KEYWORDS ───────────────────────────────────────────────────────────

export const csharpKeywords = [
  "abstract",
  "as",
  "base",
  "bool",
  "break",
  "byte",
  "case",
  "catch",
  "char",
  "checked",
  "class",
  "const",
  "continue",
  "decimal",
  "default",
  "delegate",
  "do",
  "double",
  "else",
  "enum",
  "event",
  "explicit",
  "extern",
  "false",
  "finally",
  "fixed",
  "float",
  "for",
  "foreach",
  "goto",
  "if",
  "implicit",
  "in",
  "int",
  "interface",
  "internal",
  "is",
  "lock",
  "long",
  "namespace",
  "new",
  "null",
  "object",
  "operator",
  "out",
  "override",
  "params",
  "private",
  "protected",
  "public",
  "readonly",
  "ref",
  "return",
  "sbyte",
  "sealed",
  "short",
  "sizeof",
  "stackalloc",
  "static",
  "string",
  "struct",
  "switch",
  "this",
  "throw",
  "true",
  "try",
  "typeof",
  "uint",
  "ulong",
  "unchecked",
  "unsafe",
  "ushort",
  "using",
  "var",
  "virtual",
  "void",
  "volatile",
  "while",
  "async",
  "await",
  "dynamic",
  "nameof",
  "when",
  "where",
  "yield",
  "record",
  "init",
  "required",
  "global",
  "partial",
  "value",
  "get",
  "set",
  "add",
  "remove",
  "file",
  "scoped",
  "nint",
  "nuint",
  "not",
  "and",
  "or",
  "with",
];

export const csharpTypeKeywords = [
  "bool",
  "byte",
  "char",
  "decimal",
  "double",
  "float",
  "int",
  "long",
  "object",
  "sbyte",
  "short",
  "string",
  "uint",
  "ulong",
  "ushort",
  "var",
  "void",
  "dynamic",
  "nint",
  "nuint",
];

// ─── TYPES ─────────────────────────────────────────────────────────────────

export const csharpTypes: Record<string, { detail: string; doc: string }> = {
  int: {
    detail: "struct System.Int32",
    doc: "Represents a 32-bit signed integer. Range: -2,147,483,648 to 2,147,483,647.",
  },
  string: {
    detail: "class System.String",
    doc: "Represents text as a sequence of UTF-16 code units.",
  },
  bool: {
    detail: "struct System.Boolean",
    doc: "Represents a Boolean (true or false) value.",
  },
  double: {
    detail: "struct System.Double",
    doc: "Represents a double-precision 64-bit floating-point number.",
  },
  float: {
    detail: "struct System.Single",
    doc: "Represents a single-precision 32-bit floating-point number.",
  },
  decimal: {
    detail: "struct System.Decimal",
    doc: "Represents a 128-bit precise decimal value with 28-29 significant digits.",
  },
  char: {
    detail: "struct System.Char",
    doc: "Represents a character as a UTF-16 code unit.",
  },
  byte: {
    detail: "struct System.Byte",
    doc: "Represents an 8-bit unsigned integer. Range: 0 to 255.",
  },
  long: {
    detail: "struct System.Int64",
    doc: "Represents a 64-bit signed integer.",
  },
  short: {
    detail: "struct System.Int16",
    doc: "Represents a 16-bit signed integer.",
  },
  object: {
    detail: "class System.Object",
    doc: "The ultimate base class of all .NET classes; the root of the type hierarchy.",
  },
  void: {
    detail: "keyword",
    doc: "Specifies that a method does not return a value.",
  },
  var: {
    detail: "keyword",
    doc: "Implicitly typed local variable. The type is inferred by the compiler from the initialization expression.",
  },
  dynamic: {
    detail: "keyword",
    doc: "Bypasses compile-time type checking. Resolved at runtime via DLR.",
  },
  Task: {
    detail: "class System.Threading.Tasks.Task",
    doc: "Represents an asynchronous operation. Use with async/await.",
  },
  List: {
    detail: "class System.Collections.Generic.List<T>",
    doc: "Represents a strongly typed list of objects that can be accessed by index.",
  },
  Dictionary: {
    detail: "class System.Collections.Generic.Dictionary<TKey,TValue>",
    doc: "Represents a collection of key/value pairs organized by the key.",
  },
  IEnumerable: {
    detail: "interface System.Collections.Generic.IEnumerable<T>",
    doc: "Exposes an enumerator for iterating over a collection of a specified type.",
  },
  Console: {
    detail: "static class System.Console",
    doc: "Represents the standard input, output, and error streams for console applications.",
  },
  Math: {
    detail: "static class System.Math",
    doc: "Provides constants and static methods for trigonometric, logarithmic, and other common mathematical functions.",
  },
  String: {
    detail: "class System.String",
    doc: "Represents text. Equivalent to the string keyword alias.",
  },
  DateTime: {
    detail: "struct System.DateTime",
    doc: "Represents an instant in time, typically expressed as a date and time of day.",
  },
  TimeSpan: {
    detail: "struct System.TimeSpan",
    doc: "Represents a time interval.",
  },
  Guid: {
    detail: "struct System.Guid",
    doc: "Represents a globally unique identifier (GUID).",
  },
  Exception: {
    detail: "class System.Exception",
    doc: "Represents errors that occur during application execution.",
  },
  StringBuilder: {
    detail: "class System.Text.StringBuilder",
    doc: "Represents a mutable string of characters. More efficient than string concatenation.",
  },
  Nullable: {
    detail: "struct System.Nullable<T>",
    doc: "Represents a value type that can be assigned null.",
  },
  Tuple: {
    detail: "class System.Tuple",
    doc: "Provides static methods for creating tuple objects.",
  },
  Action: {
    detail: "delegate System.Action",
    doc: "Encapsulates a method that has no parameters and does not return a value.",
  },
  Func: {
    detail: "delegate System.Func<TResult>",
    doc: "Encapsulates a method that returns a value of the type specified by TResult.",
  },
  KeyValuePair: {
    detail: "struct System.Collections.Generic.KeyValuePair<TKey,TValue>",
    doc: "Defines a key/value pair that can be set or retrieved.",
  },
  HashSet: {
    detail: "class System.Collections.Generic.HashSet<T>",
    doc: "Represents a set of unique values.",
  },
  Queue: {
    detail: "class System.Collections.Generic.Queue<T>",
    doc: "Represents a first-in, first-out (FIFO) collection of objects.",
  },
  Stack: {
    detail: "class System.Collections.Generic.Stack<T>",
    doc: "Represents a last-in, first-out (LIFO) collection of objects.",
  },
  Array: {
    detail: "abstract class System.Array",
    doc: "The base class for all arrays in the common language runtime.",
  },
  Enumerable: {
    detail: "static class System.Linq.Enumerable",
    doc: "Provides a set of static methods for querying objects that implement IEnumerable<T>.",
  },
};

// ─── KEYWORD / DIRECTIVE DOCS ──────────────────────────────────────────────

export const keywordDocs: Record<string, string> = {
  using:
    "Imports a namespace or defines a scope for resource management with IDisposable.",
  namespace:
    "Declares a scope that contains a set of related types and sub-namespaces.",
  class: "Defines a reference type that encapsulates data and behavior.",
  struct:
    "Defines a value type that encapsulates data and related functionality.",
  interface: "Defines a contract that classes and structs can implement.",
  enum: "Defines an enumeration, a distinct type consisting of named constants.",
  record:
    "Defines a reference type providing built-in functionality for encapsulating data.",
  abstract:
    "Indicates that a class or member is incomplete and must be implemented in a derived class.",
  sealed:
    "Prevents a class from being inherited or a method from being overridden.",
  static:
    "Declares a member that belongs to the type itself rather than to instances.",
  virtual: "Allows a method or property to be overridden in a derived class.",
  override:
    "Provides a new implementation of a virtual/abstract member inherited from a base class.",
  async:
    "Indicates that a method, lambda, or anonymous method is asynchronous.",
  await:
    "Suspends execution until the awaited asynchronous operation completes.",
  new: "Creates an instance of a type, or hides an inherited member.",
  this: "Refers to the current instance of the class.",
  base: "Accesses members of the base class from within a derived class.",
  return:
    "Terminates execution of a method and returns a value to the caller.",
  if: "Executes a statement block based on a Boolean expression.",
  else: "Specifies the statement block to execute when an if condition is false.",
  for: "Executes a statement block repeatedly while a specified condition evaluates to true.",
  foreach:
    "Iterates over each element in an IEnumerable or IEnumerable<T> collection.",
  while:
    "Executes a statement block zero or more times based on a Boolean expression.",
  do: "Executes a statement block one or more times (loop body runs at least once).",
  switch:
    "A selection statement that chooses a single section to execute based on pattern matching.",
  case: "Defines a label within a switch statement.",
  try: "Defines a block of code to test for exceptions during execution.",
  catch:
    "Defines a handler for a specific type of exception thrown in a try block.",
  finally:
    "Defines a block that always executes after try/catch, regardless of exceptions.",
  throw: "Signals the occurrence of an exception during program execution.",
  lock: "Marks a statement block as a critical section by acquiring a mutual-exclusion lock.",
  typeof:
    "Returns the System.Type object for a type. Used for compile-time type info.",
  nameof:
    "Returns the name of a variable, type, or member as a string constant.",
  is: "Checks if a value is compatible with a given type, including pattern matching.",
  as: "Performs a safe type conversion; returns null if the conversion fails.",
  in: "Used in foreach loops, LINQ queries, and to pass arguments by readonly reference.",
  out: "Passes an argument by reference (must be assigned by the callee).",
  ref: "Passes an argument by reference (must be assigned before being passed).",
  params: "Allows a method to accept a variable number of arguments as an array.",
  yield:
    "Used in an iterator to provide a value or signal the end of iteration.",
  where: "Specifies constraints on a generic type parameter.",
  delegate:
    "Declares a type representing references to methods with a particular parameter list.",
  event: "Declares an event in a publisher class, based on a delegate type.",
  public:
    "Access modifier: accessible from any other code in the same or another assembly.",
  private:
    "Access modifier: accessible only within the body of the containing type.",
  protected:
    "Access modifier: accessible within the containing class or derived classes.",
  internal: "Access modifier: accessible only within the same assembly.",
  const: "Declares a compile-time constant field or local variable.",
  readonly:
    "Declares a field that can only be assigned in its declaration or in the constructor.",
  volatile:
    "Indicates a field might be modified by multiple threads concurrently.",
  null: "Represents a null reference (no object).",
  true: "Boolean literal representing the value true.",
  false: "Boolean literal representing the value false.",
  get: "Defines an accessor for reading the value of a property or indexer.",
  set: "Defines an accessor for assigning the value of a property or indexer.",
  init: "Defines an accessor that allows setting a property only during object initialization.",
  value:
    "Implicit parameter in a property set/init accessor representing the assigned value.",
  partial:
    "Allows splitting the definition of a class, struct, interface, or method across multiple files.",
  global: "The global namespace alias; used to resolve naming conflicts.",
  with: "Produces a copy of a record/struct with specified properties modified.",
  not: "Pattern combinator: negates a pattern (e.g., is not null).",
  and: "Pattern combinator: both patterns must match.",
  or: "Pattern combinator: either pattern must match.",
  when: "Adds a condition to a catch clause or a switch case.",
  checked: "Enables overflow checking for integral-type arithmetic operations.",
  unchecked:
    "Disables overflow checking for integral-type arithmetic operations.",
  unsafe: "Declares an unsafe context, which allows pointer operations.",
  fixed: "Prevents the garbage collector from relocating a movable variable.",
  stackalloc: "Allocates a block of memory on the stack.",
  explicit:
    "Declares a user-defined type conversion that must be invoked with a cast.",
  implicit:
    "Declares a user-defined type conversion that is performed automatically.",
  operator: "Declares an overloaded operator for a class or struct.",
  extern: "Declares a method implemented externally (e.g., in a native DLL).",
  default:
    "Returns the default value of a type, or the default case in a switch.",
  sizeof: "Returns the size in bytes of an unmanaged type.",
  goto: "Transfers program control to a labeled statement.",
  break: "Terminates the closest enclosing loop or switch statement.",
  continue: "Passes control to the next iteration of the enclosing loop.",
  required:
    "Specifies that a property or field must be set during object initialization.",
};

// ─── RAZOR DIRECTIVE DOCS ──────────────────────────────────────────────────

export const razorDirectives = [
  "model",
  "using",
  "namespace",
  "inject",
  "inherits",
  "implements",
  "layout",
  "page",
  "attribute",
  "typeparam",
  "section",
  "addTagHelper",
  "removeTagHelper",
  "tagHelperPrefix",
  "preservewhitespace",
  "functions",
  "code",
];

export const razorDirectiveDocs: Record<string, string> = {
  model: "Specifies the type of the model passed to the view (`@model MyApp.Models.Person`).",
  using:
    "Imports a namespace (`@using MyApp.Models`) or adds a using directive to the generated class.",
  namespace: "Sets the namespace of the generated Razor class (`@namespace MyApp.Pages`).",
  inject:
    "Injects a service into the view (`@inject IUserService Users`).",
  inherits: "Sets the base class for the generated view (`@inherits RazorPage<T>`).",
  implements: "Adds an interface to the generated class (`@implements IDisposable`).",
  layout: "Specifies the layout page for the view (`@layout _Layout`).",
  page: "Marks the file as a routable Razor Page and sets its route.",
  attribute:
    "Adds an attribute to the generated class (`@attribute [Authorize]`).",
  typeparam: "Declares a generic type parameter for a component or page.",
  section: "Defines a named section that the layout can render (`@section Scripts { ... }`).",
  addTagHelper: "Registers a tag helper (`@addTagHelper *, MyAssembly`).",
  removeTagHelper: "Removes a tag helper from the current view.",
  tagHelperPrefix: "Sets a prefix applied to all tag helpers in the view.",
  preservewhitespace: "Preserves whitespace in the rendered output.",
  functions: "Declares C# members for the view (`@functions { ... }`).",
  code: "Declares C# members for a Blazor component (`@code { ... }`).",
};

// ─── MEMBER DATA ───────────────────────────────────────────────────────────

export type MethodInfo = { label: string; detail: string; doc: string };

export const consoleMethods: MethodInfo[] = [
  {
    label: "WriteLine",
    detail: "void Console.WriteLine(string)",
    doc: "Writes the specified data, followed by a newline, to the standard output stream.",
  },
  {
    label: "Write",
    detail: "void Console.Write(string)",
    doc: "Writes the specified data to the standard output stream.",
  },
  {
    label: "ReadLine",
    detail: "string Console.ReadLine()",
    doc: "Reads the next line of characters from the standard input stream.",
  },
  {
    label: "ReadKey",
    detail: "ConsoleKeyInfo Console.ReadKey()",
    doc: "Obtains the next key pressed by the user.",
  },
  {
    label: "Clear",
    detail: "void Console.Clear()",
    doc: "Clears the console buffer and corresponding display.",
  },
  {
    label: "ForegroundColor",
    detail: "ConsoleColor Console.ForegroundColor",
    doc: "Gets or sets the foreground color of the console.",
  },
  {
    label: "BackgroundColor",
    detail: "ConsoleColor Console.BackgroundColor",
    doc: "Gets or sets the background color of the console.",
  },
  {
    label: "SetCursorPosition",
    detail: "void Console.SetCursorPosition(int, int)",
    doc: "Sets the position of the cursor.",
  },
  {
    label: "Beep",
    detail: "void Console.Beep()",
    doc: "Plays a beep sound through the console speaker.",
  },
];

export const stringMethods: MethodInfo[] = [
  {
    label: "Length",
    detail: "int string.Length",
    doc: "Gets the number of characters in the current string.",
  },
  {
    label: "Substring",
    detail: "string string.Substring(int startIndex, int length)",
    doc: "Retrieves a substring from this instance.",
  },
  {
    label: "Contains",
    detail: "bool string.Contains(string value)",
    doc: "Returns whether a specified substring occurs within this string.",
  },
  {
    label: "StartsWith",
    detail: "bool string.StartsWith(string value)",
    doc: "Determines whether the beginning of this string matches the specified string.",
  },
  {
    label: "EndsWith",
    detail: "bool string.EndsWith(string value)",
    doc: "Determines whether the end of this string matches the specified string.",
  },
  {
    label: "IndexOf",
    detail: "int string.IndexOf(string value)",
    doc: "Reports the zero-based index of the first occurrence of the specified string.",
  },
  {
    label: "LastIndexOf",
    detail: "int string.LastIndexOf(string value)",
    doc: "Reports the zero-based index of the last occurrence of the specified string.",
  },
  {
    label: "Replace",
    detail: "string string.Replace(string oldValue, string newValue)",
    doc: "Returns a new string with all occurrences of oldValue replaced with newValue.",
  },
  {
    label: "Split",
    detail: "string[] string.Split(char separator)",
    doc: "Splits a string into substrings based on specified delimiting characters.",
  },
  {
    label: "Trim",
    detail: "string string.Trim()",
    doc: "Removes all leading and trailing white-space characters.",
  },
  {
    label: "ToUpper",
    detail: "string string.ToUpper()",
    doc: "Returns a copy of this string converted to uppercase.",
  },
  {
    label: "ToLower",
    detail: "string string.ToLower()",
    doc: "Returns a copy of this string converted to lowercase.",
  },
  {
    label: "IsNullOrEmpty",
    detail: "static bool string.IsNullOrEmpty(string)",
    doc: "Indicates whether the specified string is null or empty.",
  },
  {
    label: "IsNullOrWhiteSpace",
    detail: "static bool string.IsNullOrWhiteSpace(string)",
    doc: "Indicates whether the specified string is null, empty, or consists only of white-space.",
  },
  {
    label: "Join",
    detail: "static string string.Join(string separator, IEnumerable<string>)",
    doc: "Concatenates the elements of a collection, using the specified separator.",
  },
  {
    label: "Format",
    detail: "static string string.Format(string format, params object[])",
    doc: "Replaces format items in a string with the string representations of corresponding objects.",
  },
  {
    label: "Concat",
    detail: "static string string.Concat(params string[])",
    doc: "Concatenates one or more instances of String.",
  },
  {
    label: "Equals",
    detail: "bool string.Equals(string)",
    doc: "Determines whether two string objects have the same value.",
  },
];

export const mathMethods: MethodInfo[] = [
  {
    label: "Abs",
    detail: "static int Math.Abs(int)",
    doc: "Returns the absolute value of a number.",
  },
  {
    label: "Max",
    detail: "static int Math.Max(int, int)",
    doc: "Returns the larger of two numbers.",
  },
  {
    label: "Min",
    detail: "static int Math.Min(int, int)",
    doc: "Returns the smaller of two numbers.",
  },
  {
    label: "Pow",
    detail: "static double Math.Pow(double, double)",
    doc: "Returns a specified number raised to the specified power.",
  },
  {
    label: "Sqrt",
    detail: "static double Math.Sqrt(double)",
    doc: "Returns the square root of a specified number.",
  },
  {
    label: "Round",
    detail: "static double Math.Round(double)",
    doc: "Rounds a value to the nearest integer.",
  },
  {
    label: "Floor",
    detail: "static double Math.Floor(double)",
    doc: "Returns the largest integer less than or equal to the specified number.",
  },
  {
    label: "Ceiling",
    detail: "static double Math.Ceiling(double)",
    doc: "Returns the smallest integer greater than or equal to the specified number.",
  },
  {
    label: "PI",
    detail: "const double Math.PI",
    doc: "Represents the ratio of the circumference of a circle to its diameter (π ≈ 3.14159).",
  },
  {
    label: "E",
    detail: "const double Math.E",
    doc: "Represents the natural logarithmic base (e ≈ 2.71828).",
  },
  {
    label: "Log",
    detail: "static double Math.Log(double)",
    doc: "Returns the natural (base e) logarithm of a specified number.",
  },
  {
    label: "Sin",
    detail: "static double Math.Sin(double)",
    doc: "Returns the sine of the specified angle.",
  },
  {
    label: "Cos",
    detail: "static double Math.Cos(double)",
    doc: "Returns the cosine of the specified angle.",
  },
  {
    label: "Tan",
    detail: "static double Math.Tan(double)",
    doc: "Returns the tangent of the specified angle.",
  },
  {
    label: "Clamp",
    detail: "static int Math.Clamp(int, int, int)",
    doc: "Returns value clamped to the inclusive range of min and max.",
  },
];

export const listMethods: MethodInfo[] = [
  {
    label: "Add",
    detail: "void List<T>.Add(T item)",
    doc: "Adds an object to the end of the List<T>.",
  },
  {
    label: "AddRange",
    detail: "void List<T>.AddRange(IEnumerable<T>)",
    doc: "Adds the elements of the specified collection to the end of the List<T>.",
  },
  {
    label: "Remove",
    detail: "bool List<T>.Remove(T item)",
    doc: "Removes the first occurrence of a specific object from the List<T>.",
  },
  {
    label: "RemoveAt",
    detail: "void List<T>.RemoveAt(int index)",
    doc: "Removes the element at the specified index.",
  },
  {
    label: "Insert",
    detail: "void List<T>.Insert(int index, T item)",
    doc: "Inserts an element at the specified index.",
  },
  {
    label: "Count",
    detail: "int List<T>.Count",
    doc: "Gets the number of elements contained in the List<T>.",
  },
  {
    label: "Clear",
    detail: "void List<T>.Clear()",
    doc: "Removes all elements from the List<T>.",
  },
  {
    label: "Contains",
    detail: "bool List<T>.Contains(T item)",
    doc: "Determines whether an element is in the List<T>.",
  },
  {
    label: "IndexOf",
    detail: "int List<T>.IndexOf(T item)",
    doc: "Returns the zero-based index of the first occurrence of a value.",
  },
  {
    label: "Find",
    detail: "T List<T>.Find(Predicate<T>)",
    doc: "Searches for the first element that matches the specified predicate.",
  },
  {
    label: "FindAll",
    detail: "List<T> List<T>.FindAll(Predicate<T>)",
    doc: "Retrieves all elements that match the specified predicate.",
  },
  {
    label: "Sort",
    detail: "void List<T>.Sort()",
    doc: "Sorts the elements in the List<T> using the default comparer.",
  },
  {
    label: "Reverse",
    detail: "void List<T>.Reverse()",
    doc: "Reverses the order of the elements in the List<T>.",
  },
  {
    label: "ToArray",
    detail: "T[] List<T>.ToArray()",
    doc: "Copies the elements to a new array.",
  },
  {
    label: "ForEach",
    detail: "void List<T>.ForEach(Action<T>)",
    doc: "Performs the specified action on each element of the List<T>.",
  },
];

export const linqMethods: MethodInfo[] = [
  {
    label: "Where",
    detail: "IEnumerable<T> Where(Func<T, bool>)",
    doc: "Filters a sequence of values based on a predicate.",
  },
  {
    label: "Select",
    detail: "IEnumerable<TResult> Select(Func<T, TResult>)",
    doc: "Projects each element into a new form.",
  },
  {
    label: "SelectMany",
    detail: "IEnumerable<TResult> SelectMany(Func<T, IEnumerable<TResult>>)",
    doc: "Projects each element and flattens the resulting sequences into one sequence.",
  },
  {
    label: "OrderBy",
    detail: "IOrderedEnumerable<T> OrderBy(Func<T, TKey>)",
    doc: "Sorts the elements in ascending order according to a key.",
  },
  {
    label: "OrderByDescending",
    detail: "IOrderedEnumerable<T> OrderByDescending(Func<T, TKey>)",
    doc: "Sorts the elements in descending order according to a key.",
  },
  {
    label: "GroupBy",
    detail: "IEnumerable<IGrouping<TKey, T>> GroupBy(Func<T, TKey>)",
    doc: "Groups elements that share a common key.",
  },
  {
    label: "First",
    detail: "T First()",
    doc: "Returns the first element. Throws if empty.",
  },
  {
    label: "FirstOrDefault",
    detail: "T FirstOrDefault()",
    doc: "Returns the first element, or default value if empty.",
  },
  {
    label: "Last",
    detail: "T Last()",
    doc: "Returns the last element. Throws if empty.",
  },
  {
    label: "Any",
    detail: "bool Any()",
    doc: "Determines whether any element exists, or matches a condition.",
  },
  {
    label: "All",
    detail: "bool All(Func<T, bool>)",
    doc: "Determines whether all elements satisfy a condition.",
  },
  {
    label: "Count",
    detail: "int Count()",
    doc: "Returns the number of elements in a sequence.",
  },
  {
    label: "Sum",
    detail: "decimal Sum(Func<T, decimal>)",
    doc: "Computes the sum of a sequence of numeric values.",
  },
  {
    label: "Average",
    detail: "double Average(Func<T, int>)",
    doc: "Computes the average of a sequence of numeric values.",
  },
  {
    label: "Min",
    detail: "T Min()",
    doc: "Returns the minimum value in a sequence.",
  },
  {
    label: "Max",
    detail: "T Max()",
    doc: "Returns the maximum value in a sequence.",
  },
  {
    label: "ToList",
    detail: "List<T> ToList()",
    doc: "Creates a List<T> from an IEnumerable<T>.",
  },
  {
    label: "ToArray",
    detail: "T[] ToArray()",
    doc: "Creates an array from an IEnumerable<T>.",
  },
  {
    label: "Distinct",
    detail: "IEnumerable<T> Distinct()",
    doc: "Returns distinct elements from a sequence.",
  },
  {
    label: "Skip",
    detail: "IEnumerable<T> Skip(int)",
    doc: "Bypasses a specified number of elements and returns the remaining.",
  },
  {
    label: "Take",
    detail: "IEnumerable<T> Take(int)",
    doc: "Returns a specified number of contiguous elements from the start.",
  },
  {
    label: "Aggregate",
    detail: "T Aggregate(Func<T, T, T>)",
    doc: "Applies an accumulator function over a sequence.",
  },
];

export const dateTimeMethods: MethodInfo[] = [
  {
    label: "Now",
    detail: "static DateTime DateTime.Now",
    doc: "Gets the current local date and time.",
  },
  {
    label: "UtcNow",
    detail: "static DateTime DateTime.UtcNow",
    doc: "Gets the current UTC date and time.",
  },
  {
    label: "Today",
    detail: "static DateTime DateTime.Today",
    doc: "Gets the current date with the time component set to 00:00:00.",
  },
  {
    label: "Year",
    detail: "int DateTime.Year",
    doc: "Gets the year component of the represented date.",
  },
  {
    label: "Month",
    detail: "int DateTime.Month",
    doc: "Gets the month component (1 through 12).",
  },
  {
    label: "Day",
    detail: "int DateTime.Day",
    doc: "Gets the day of the month (1 through 31).",
  },
  {
    label: "AddDays",
    detail: "DateTime DateTime.AddDays(double)",
    doc: "Returns a new DateTime that adds the specified number of days.",
  },
  {
    label: "ToString",
    detail: "string DateTime.ToString(string format)",
    doc: "Converts the value to its string representation using a format string.",
  },
];

export const taskMethods: MethodInfo[] = [
  {
    label: "Delay",
    detail: "static Task Task.Delay(int millisecondsDelay)",
    doc: "Creates a task that completes after a time delay.",
  },
  {
    label: "Run",
    detail: "static Task Task.Run(Action)",
    doc: "Queues work to run on the thread pool and returns a Task.",
  },
  {
    label: "WhenAll",
    detail: "static Task Task.WhenAll(IEnumerable<Task>)",
    doc: "Creates a task that completes when all of the supplied tasks have completed.",
  },
  {
    label: "WhenAny",
    detail: "static Task Task.WhenAny(IEnumerable<Task>)",
    doc: "Creates a task that completes when any of the supplied tasks have completed.",
  },
  {
    label: "FromResult",
    detail: "static Task<T> Task.FromResult(T result)",
    doc: "Creates a successfully completed task with the specified result.",
  },
];

// ─── SNIPPETS ──────────────────────────────────────────────────────────────

export const csharpSnippets: { label: string; body: string; doc: string }[] = [
  {
    label: "for",
    body: "for (int ${1:i} = 0; ${1:i} < ${2:length}; ${1:i}++)\n{\n\t$0\n}",
    doc: "for loop",
  },
  {
    label: "foreach",
    body: "foreach (var ${1:item} in ${2:collection})\n{\n\t$0\n}",
    doc: "foreach loop",
  },
  {
    label: "while",
    body: "while (${1:condition})\n{\n\t$0\n}",
    doc: "while loop",
  },
  {
    label: "if",
    body: "if (${1:condition})\n{\n\t$0\n}",
    doc: "if statement",
  },
  {
    label: "ifelse",
    body: "if (${1:condition})\n{\n\t$2\n}\nelse\n{\n\t$0\n}",
    doc: "if-else statement",
  },
  {
    label: "switch",
    body: "switch (${1:expression})\n{\n\tcase ${2:value}:\n\t\t$0\n\t\tbreak;\n\tdefault:\n\t\tbreak;\n}",
    doc: "switch statement",
  },
  {
    label: "trycatch",
    body: "try\n{\n\t$1\n}\ncatch (${2:Exception} ${3:ex})\n{\n\t$0\n}",
    doc: "try-catch block",
  },
  {
    label: "class",
    body: "public class ${1:ClassName}\n{\n\t$0\n}",
    doc: "class definition",
  },
  {
    label: "method",
    body: "public ${1:void} ${2:MethodName}(${3})\n{\n\t$0\n}",
    doc: "method",
  },
  {
    label: "methodasync",
    body: "public async Task${1:<${2:ReturnType}>} ${3:MethodName}Async(${4})\n{\n\t$0\n}",
    doc: "async method",
  },
  {
    label: "prop",
    body: "public ${1:string} ${2:PropertyName} { get; set; }",
    doc: "auto-property",
  },
  {
    label: "linq",
    body: "var ${1:result} = ${2:collection}\n\t.Where(${3:x} => ${4:condition})\n\t.Select(${3:x} => ${5:x})\n\t.ToList();",
    doc: "LINQ method chain",
  },
  { label: "cw", body: "Console.WriteLine($1);", doc: "Console.WriteLine" },
  { label: "cr", body: "Console.ReadLine();", doc: "Console.ReadLine" },
  {
    label: "null",
    body: "${1:value} ?? ${2:defaultValue}",
    doc: "null coalescing",
  },
  {
    label: "region",
    body: "#region ${1:RegionName}\n$0\n#endregion",
    doc: "#region block",
  },
];

export const csharpAttributes = [
  "Serializable",
  "Obsolete",
  "Flags",
  "DllImport",
  "Conditional",
  "DebuggerStepThrough",
  "MethodImpl",
  "CallerMemberName",
  "ApiController",
  "HttpGet",
  "HttpPost",
  "HttpPut",
  "HttpDelete",
  "Route",
  "Authorize",
  "AllowAnonymous",
  "Required",
  "StringLength",
  "Range",
  "JsonProperty",
  "JsonIgnore",
];

export const csharpNamespaces = [
  "System",
  "System.Collections.Generic",
  "System.Linq",
  "System.Threading.Tasks",
  "System.IO",
  "System.Text",
  "System.Text.Json",
  "System.Net.Http",
  "System.Text.RegularExpressions",
  "System.Diagnostics",
  "System.Reflection",
  "Microsoft.AspNetCore.Mvc",
  "Microsoft.AspNetCore.Mvc.RazorPages",
  "Microsoft.AspNetCore.Components",
  "Microsoft.EntityFrameworkCore",
];

// ─── SIGNATURE HELP DATA ───────────────────────────────────────────────────

export const signatures: Record<
  string,
  {
    label: string;
    doc: string;
    params: { label: string; doc: string }[];
  }
> = {
  WriteLine: {
    label: "Console.WriteLine(string value)",
    params: [
      { label: "string value", doc: "The value to write to the output stream." },
    ],
    doc: "Writes the specified data, followed by a newline, to the standard output stream.",
  },
  Write: {
    label: "Console.Write(string value)",
    params: [{ label: "string value", doc: "The value to write." }],
    doc: "Writes the specified data to the standard output stream.",
  },
  Substring: {
    label: "string.Substring(int startIndex, int length)",
    params: [
      { label: "int startIndex", doc: "Zero-based starting position." },
      { label: "int length", doc: "Number of characters to extract." },
    ],
    doc: "Retrieves a substring.",
  },
  Contains: {
    label: ".Contains(T value)",
    params: [{ label: "T value", doc: "The value to locate." }],
    doc: "Determines whether the sequence or string contains a specified element.",
  },
  IndexOf: {
    label: "string.IndexOf(string value)",
    params: [{ label: "string value", doc: "The string to seek." }],
    doc: "Reports the zero-based index of the first occurrence.",
  },
  Replace: {
    label: "string.Replace(string oldValue, string newValue)",
    params: [
      { label: "string oldValue", doc: "The string to be replaced." },
      { label: "string newValue", doc: "The string to replace occurrences." },
    ],
    doc: "Returns a new string with all occurrences replaced.",
  },
  Split: {
    label: "string.Split(char separator)",
    params: [
      { label: "char separator", doc: "A character that delimits substrings." },
    ],
    doc: "Splits a string into substrings.",
  },
  Where: {
    label: "Enumerable.Where(Func<T, bool> predicate)",
    params: [
      {
        label: "Func<T, bool> predicate",
        doc: "A function to test each element for a condition.",
      },
    ],
    doc: "Filters a sequence based on a predicate.",
  },
  Select: {
    label: "Enumerable.Select(Func<T, TResult> selector)",
    params: [
      {
        label: "Func<T, TResult> selector",
        doc: "A transform function to apply to each element.",
      },
    ],
    doc: "Projects each element into a new form.",
  },
  OrderBy: {
    label: "Enumerable.OrderBy(Func<T, TKey> keySelector)",
    params: [
      {
        label: "Func<T, TKey> keySelector",
        doc: "A function to extract a key from each element.",
      },
    ],
    doc: "Sorts elements in ascending order.",
  },
  Add: {
    label: "List<T>.Add(T item)",
    params: [{ label: "T item", doc: "The object to add to the List<T>." }],
    doc: "Adds an object to the end of the List<T>.",
  },
  Insert: {
    label: "List<T>.Insert(int index, T item)",
    params: [
      {
        label: "int index",
        doc: "The zero-based index at which item should be inserted.",
      },
      { label: "T item", doc: "The object to insert." },
    ],
    doc: "Inserts an element at the specified index.",
  },
  RemoveAt: {
    label: "List<T>.RemoveAt(int index)",
    params: [
      {
        label: "int index",
        doc: "The zero-based index of the element to remove.",
      },
    ],
    doc: "Removes the element at the specified index.",
  },
  Pow: {
    label: "Math.Pow(double x, double y)",
    params: [
      { label: "double x", doc: "A double-precision base number." },
      { label: "double y", doc: "A double-precision exponent." },
    ],
    doc: "Returns x raised to the power y.",
  },
  Max: {
    label: "Math.Max(int val1, int val2)",
    params: [
      { label: "int val1", doc: "The first of two values to compare." },
      { label: "int val2", doc: "The second of two values to compare." },
    ],
    doc: "Returns the larger of two numbers.",
  },
  Min: {
    label: "Math.Min(int val1, int val2)",
    params: [
      { label: "int val1", doc: "The first of two values to compare." },
      { label: "int val2", doc: "The second of two values to compare." },
    ],
    doc: "Returns the smaller of two numbers.",
  },
  Format: {
    label: "string.Format(string format, params object[] args)",
    params: [
      { label: "string format", doc: "A composite format string." },
      { label: "params object[] args", doc: "Objects to format." },
    ],
    doc: "Replaces format items with string representations of objects.",
  },
  Join: {
    label: "string.Join(string separator, IEnumerable<string> values)",
    params: [
      { label: "string separator", doc: "The string separator." },
      {
        label: "IEnumerable<string> values",
        doc: "A collection of strings.",
      },
    ],
    doc: "Concatenates collection elements using a separator.",
  },
  Delay: {
    label: "Task.Delay(int millisecondsDelay)",
    params: [
      {
        label: "int millisecondsDelay",
        doc: "The number of milliseconds to delay.",
      },
    ],
    doc: "Creates a task that completes after a specified time delay.",
  },
  Skip: {
    label: "Enumerable.Skip(int count)",
    params: [{ label: "int count", doc: "The number of elements to skip." }],
    doc: "Bypasses a specified number of elements.",
  },
  Take: {
    label: "Enumerable.Take(int count)",
    params: [{ label: "int count", doc: "The number of elements to return." }],
    doc: "Returns a specified number of contiguous elements from the start.",
  },
  GroupBy: {
    label: "Enumerable.GroupBy(Func<T, TKey> keySelector)",
    params: [
      {
        label: "Func<T, TKey> keySelector",
        doc: "A function to extract the key for each element.",
      },
    ],
    doc: "Groups elements that share a common key.",
  },
};

// ─── MEMBER LOOKUP BY OBJECT ───────────────────────────────────────────────

export function membersForObject(name: string): MethodInfo[] | null {
  switch (name.toLowerCase()) {
    case "console":
      return consoleMethods;
    case "string":
    case "str":
      return stringMethods;
    case "math":
      return mathMethods;
    case "list":
      return listMethods;
    case "datetime":
      return dateTimeMethods;
    case "task":
      return taskMethods;
    default:
      return null;
  }
}

// ─── DOCUMENT SYMBOL SCAN ──────────────────────────────────────────────────

export type DocumentSymbol = {
  name: string;
  kind: "class" | "method" | "property" | "variable";
  line: number;
  col: number;
};

export function scanDocument(model: Monaco.editor.ITextModel): DocumentSymbol[] {
  const lines = model.getValue().split("\n");
  const symbols: DocumentSymbol[] = [];
  const classRegex =
    /\b(?:public|private|internal|protected|abstract|sealed|static|partial)?\s*(?:class|struct|interface|record|enum)\s+(\w+)/;
  const methodRegex =
    /\b(?:public|private|internal|protected|static|virtual|override|abstract|async)?\s*(?:\w+(?:<[^>]+>)?(?:\[\])?)\s+(\w+)\s*\(/;
  const propRegex =
    /\b(?:public|private|internal|protected|static|virtual|override|abstract|required)?\s*(?:\w+(?:<[^>]+>)?(?:\[\])?)\s+(\w+)\s*\{\s*get/;
  const varRegex =
    /\b(?:var|int|string|bool|double|float|decimal|long|char|byte)\s+(\w+)\s*=/;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let m;
    if ((m = classRegex.exec(line))) {
      symbols.push({
        name: m[1],
        kind: "class",
        line: i + 1,
        col: line.indexOf(m[1]) + 1,
      });
    }
    if (
      (m = methodRegex.exec(line)) &&
      !line.includes(" new ") &&
      !line.trim().startsWith("//")
    ) {
      const name = m[1];
      if (!csharpKeywords.includes(name) && name !== "get" && name !== "set") {
        symbols.push({
          name,
          kind: "method",
          line: i + 1,
          col: line.indexOf(name) + 1,
        });
      }
    }
    if ((m = propRegex.exec(line))) {
      symbols.push({
        name: m[1],
        kind: "property",
        line: i + 1,
        col: line.indexOf(m[1]) + 1,
      });
    }
    if ((m = varRegex.exec(line)) && !propRegex.test(line)) {
      symbols.push({
        name: m[1],
        kind: "variable",
        line: i + 1,
        col: line.indexOf(m[1]) + 1,
      });
    }
  }
  return symbols;
}

// ─── BINDING RESOLUTION (locals) ───────────────────────────────────────────

export type Binding = {
  name: string;
  local: boolean;
  declaration: { line: number; startColumn: number; endColumn: number } | null;
  occurrences: { line: number; startColumn: number; endColumn: number }[];
};

export function resolveBinding(
  model: Monaco.editor.ITextModel,
  position: Monaco.Position,
): Binding | null {
  const word = model.getWordAtPosition(position);
  if (!word) return null;
  const name = word.word;

  const lines = model.getLinesContent();
  const lineStart: number[] = [];
  let total = 0;
  for (let i = 0; i < lines.length; i++) {
    lineStart.push(total);
    total += lines[i].length + 1;
  }
  const at = (line: number, col: number) => lineStart[line] + col;
  const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const isTypeBody = (prefix: string) =>
    /\b(class|interface|enum|struct|record|namespace)\b/.test(prefix);

  type Scope = {
    start: number;
    end: number;
    type: boolean;
    names: Set<string>;
  };
  const scopes: Scope[] = [];
  const open: Scope[] = [];
  for (let i = 0; i < lines.length; i++) {
    for (let c = 0; c < lines[i].length; c++) {
      if (lines[i][c] === "{") {
        const scope: Scope = {
          start: at(i, c),
          end: Infinity,
          type: isTypeBody(lines[i].slice(0, c)),
          names: new Set<string>(),
        };
        scopes.push(scope);
        open.push(scope);
      } else if (lines[i][c] === "}") {
        const scope = open.pop();
        if (scope) scope.end = at(i, c);
      }
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
      if (scope.start <= offset && offset <= scope.end && scope.names.has(name)) {
        if (!found || scope.start > found.start) found = scope;
      }
    }
    return found;
  };
  const nextScope = (offset: number) => {
    let found: Scope | undefined;
    for (const scope of scopes) {
      if (scope.start >= offset && (!found || scope.start < found.start))
        found = scope;
    }
    return found;
  };

  const declaration = new RegExp(
    "\\b(?:readonly\\s+)?(?:[A-Z][A-Za-z0-9_]*|var|int|uint|long|ulong|short|ushort|byte|sbyte|float|double|decimal|bool|char|string|object|dynamic|nint|nuint)(?:\\s*<[^;{}()]*>)?(?:\\s*\\[\\s*\\])*\\s+" +
      esc(name) +
      "\\s*[=;:,\\)\\[\\]]",
    "g",
  );
  const declarations: { start: number; end: number; scope?: Scope }[] = [];
  for (let i = 0; i < lines.length; i++) {
    declaration.lastIndex = 0;
    let m;
    while ((m = declaration.exec(lines[i])) !== null) {
      const before = lines[i].slice(0, m.index).replace(/\s+$/, "");
      const isParam =
        /^[(,|]/.test(m[0]) || before.endsWith("(") || before.endsWith(",");
      const owner = isParam
        ? nextScope(at(i, m.index))
        : enclosing(at(i, m.index));
      const scope = owner && !owner.type ? owner : undefined;
      if (scope) scope.names.add(name);
      declarations.push({
        start: at(i, m.index),
        end: at(i, m.index) + m[0].length,
        scope,
      });
    }
  }

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
        if (before.endsWith(".") || before.endsWith("->")) continue;
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
}
