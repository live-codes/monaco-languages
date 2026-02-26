import type * as Monaco from "monaco-editor";

export default (monaco: typeof Monaco) => {
  // ─── C# KEYWORD & TYPE DATABASE ────────────────────────────────────────
  const csharpKeywords = [
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

  const csharpTypes = {
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

  const keywordDocs = {
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
    params:
      "Allows a method to accept a variable number of arguments as an array.",
    yield:
      "Used in an iterator to provide a value or signal the end of iteration.",
    where: "Specifies constraints on a generic type parameter.",
    select: "Projects each element of a sequence into a new form (LINQ).",
    from: "Specifies a data source and range variable in a LINQ query expression.",
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
    checked:
      "Enables overflow checking for integral-type arithmetic operations.",
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
    scoped:
      "Restricts the lifetime of a ref struct value to the current scope.",
    file: "Limits the scope of a type declaration to the file in which it is defined.",
    nint: "Native-sized signed integer (System.IntPtr).",
    nuint: "Native-sized unsigned integer (System.UIntPtr).",
  };

  const consoleMethods = [
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

  const stringMethods = [
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
      label: "TrimStart",
      detail: "string string.TrimStart()",
      doc: "Removes all leading white-space characters.",
    },
    {
      label: "TrimEnd",
      detail: "string string.TrimEnd()",
      doc: "Removes all trailing white-space characters.",
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
      label: "ToCharArray",
      detail: "char[] string.ToCharArray()",
      doc: "Copies the characters in this instance to a char array.",
    },
    {
      label: "PadLeft",
      detail: "string string.PadLeft(int totalWidth)",
      doc: "Right-aligns the characters in this instance by padding with spaces on the left.",
    },
    {
      label: "PadRight",
      detail: "string string.PadRight(int totalWidth)",
      doc: "Left-aligns the characters by padding with spaces on the right.",
    },
    {
      label: "Insert",
      detail: "string string.Insert(int startIndex, string value)",
      doc: "Returns a new string with the specified string inserted at the given index.",
    },
    {
      label: "Remove",
      detail: "string string.Remove(int startIndex)",
      doc: "Returns a new string with characters deleted from the given index to the end.",
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
      detail:
        "static string string.Join(string separator, IEnumerable<string>)",
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
    {
      label: "CompareTo",
      detail: "int string.CompareTo(string)",
      doc: "Compares this instance with a specified string object.",
    },
  ];

  const listMethods = [
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
      label: "RemoveAll",
      detail: "int List<T>.RemoveAll(Predicate<T>)",
      doc: "Removes all elements that match the conditions defined by the specified predicate.",
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
    {
      label: "Exists",
      detail: "bool List<T>.Exists(Predicate<T>)",
      doc: "Determines whether any element matches the specified predicate.",
    },
    {
      label: "TrueForAll",
      detail: "bool List<T>.TrueForAll(Predicate<T>)",
      doc: "Determines whether every element matches the specified predicate.",
    },
  ];

  const linqMethods = [
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
      label: "ThenBy",
      detail: "IOrderedEnumerable<T> ThenBy(Func<T, TKey>)",
      doc: "Performs a secondary sort in ascending order.",
    },
    {
      label: "GroupBy",
      detail: "IEnumerable<IGrouping<TKey, T>> GroupBy(Func<T, TKey>)",
      doc: "Groups elements that share a common key.",
    },
    {
      label: "Join",
      detail: "IEnumerable<TResult> Join(...)",
      doc: "Joins two sequences based on matching keys.",
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
      label: "LastOrDefault",
      detail: "T LastOrDefault()",
      doc: "Returns the last element, or default value if empty.",
    },
    {
      label: "Single",
      detail: "T Single()",
      doc: "Returns the only element. Throws if not exactly one element.",
    },
    {
      label: "SingleOrDefault",
      detail: "T SingleOrDefault()",
      doc: "Returns the single element, or default if empty. Throws if more than one.",
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
      label: "ToDictionary",
      detail: "Dictionary<TKey,T> ToDictionary(Func<T,TKey>)",
      doc: "Creates a Dictionary from an IEnumerable according to a key selector.",
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
      label: "Concat",
      detail: "IEnumerable<T> Concat(IEnumerable<T>)",
      doc: "Concatenates two sequences.",
    },
    {
      label: "Zip",
      detail: "IEnumerable<(T,T2)> Zip(IEnumerable<T2>)",
      doc: "Merges two sequences element-wise into tuples.",
    },
    {
      label: "Aggregate",
      detail: "T Aggregate(Func<T, T, T>)",
      doc: "Applies an accumulator function over a sequence.",
    },
    {
      label: "Contains",
      detail: "bool Contains(T value)",
      doc: "Determines whether a sequence contains a specified element.",
    },
  ];

  // ─── SNIPPETS ──────────────────────────────────────────────────────────

  const csharpSnippets = [
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
      label: "do",
      body: "do\n{\n\t$0\n} while (${1:condition});",
      doc: "do...while loop",
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
      label: "tryfinally",
      body: "try\n{\n\t$1\n}\nfinally\n{\n\t$0\n}",
      doc: "try-finally block",
    },
    {
      label: "trycatchfinally",
      body: "try\n{\n\t$1\n}\ncatch (${2:Exception} ${3:ex})\n{\n\t$4\n}\nfinally\n{\n\t$0\n}",
      doc: "try-catch-finally block",
    },
    {
      label: "class",
      body: "public class ${1:ClassName}\n{\n\t$0\n}",
      doc: "class definition",
    },
    {
      label: "interface",
      body: "public interface ${1:IName}\n{\n\t$0\n}",
      doc: "interface definition",
    },
    {
      label: "struct",
      body: "public struct ${1:StructName}\n{\n\t$0\n}",
      doc: "struct definition",
    },
    {
      label: "record",
      body: "public record ${1:RecordName}(${2:string Property});\n",
      doc: "record definition",
    },
    {
      label: "enum",
      body: "public enum ${1:EnumName}\n{\n\t${2:Value1},\n\t${3:Value2}\n}",
      doc: "enum definition",
    },
    {
      label: "prop",
      body: "public ${1:string} ${2:PropertyName} { get; set; }",
      doc: "auto-property",
    },
    {
      label: "propfull",
      body: "private ${1:string} _${2:fieldName};\npublic ${1:string} ${3:PropertyName}\n{\n\tget { return _${2:fieldName}; }\n\tset { _${2:fieldName} = value; }\n}",
      doc: "full property with backing field",
    },
    {
      label: "propinit",
      body: "public ${1:string} ${2:PropertyName} { get; init; }",
      doc: "init-only property",
    },
    {
      label: "propreq",
      body: "public required ${1:string} ${2:PropertyName} { get; set; }",
      doc: "required property",
    },
    {
      label: "ctor",
      body: "public ${1:ClassName}(${2})\n{\n\t$0\n}",
      doc: "constructor",
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
      label: "main",
      body: "static void Main(string[] args)\n{\n\t$0\n}",
      doc: "Main method",
    },
    {
      label: "mainasync",
      body: "static async Task Main(string[] args)\n{\n\t$0\n}",
      doc: "async Main method",
    },
    { label: "cw", body: "Console.WriteLine($1);", doc: "Console.WriteLine" },
    { label: "cr", body: "Console.ReadLine();", doc: "Console.ReadLine" },
    {
      label: "using",
      body: "using (var ${1:resource} = ${2:new Resource()})\n{\n\t$0\n}",
      doc: "using statement",
    },
    {
      label: "lock",
      body: "lock (${1:lockObject})\n{\n\t$0\n}",
      doc: "lock statement",
    },
    {
      label: "delegate",
      body: "public delegate ${1:void} ${2:DelegateName}(${3});",
      doc: "delegate declaration",
    },
    {
      label: "event",
      body: "public event ${1:EventHandler} ${2:EventName};",
      doc: "event declaration",
    },
    {
      label: "lambda",
      body: "(${1:args}) => ${2:expression}",
      doc: "lambda expression",
    },
    {
      label: "linq",
      body: "var ${1:result} = ${2:collection}\n\t.Where(${3:x} => ${4:condition})\n\t.Select(${3:x} => ${5:x})\n\t.ToList();",
      doc: "LINQ method chain",
    },
    {
      label: "linqquery",
      body: "var ${1:result} = from ${2:item} in ${3:collection}\n\t\t\t\twhere ${4:condition}\n\t\t\t\tselect ${2:item};",
      doc: "LINQ query syntax",
    },
    {
      label: "dispose",
      body: "protected virtual void Dispose(bool disposing)\n{\n\tif (disposing)\n\t{\n\t\t$0\n\t}\n}\n\npublic void Dispose()\n{\n\tDispose(true);\n\tGC.SuppressFinalize(this);\n}",
      doc: "IDisposable pattern",
    },
    {
      label: "singleton",
      body: "private static ${1:ClassName} _instance;\nprivate static readonly object _lock = new object();\n\npublic static ${1:ClassName} Instance\n{\n\tget\n\t{\n\t\tlock (_lock)\n\t\t{\n\t\t\t_instance ??= new ${1:ClassName}();\n\t\t\treturn _instance;\n\t\t}\n\t}\n}",
      doc: "Singleton pattern",
    },
    {
      label: "test",
      body: "[Test]\npublic void ${1:MethodName}_${2:Scenario}_${3:ExpectedResult}()\n{\n\t// Arrange\n\t$4\n\n\t// Act\n\t$5\n\n\t// Assert\n\t$0\n}",
      doc: "Unit test method (NUnit)",
    },
    {
      label: "region",
      body: "#region ${1:RegionName}\n$0\n#endregion",
      doc: "#region block",
    },
    {
      label: "summary",
      body: "/// <summary>\n/// ${1:Description}\n/// </summary>",
      doc: "XML summary comment",
    },
    {
      label: "null",
      body: "${1:value} ?? ${2:defaultValue}",
      doc: "null coalescing",
    },
    {
      label: "nullcheck",
      body: "${1:value} ?? throw new ArgumentNullException(nameof(${1:value}));",
      doc: "null check with exception",
    },
  ];

  // ─── SCAN DOCUMENT FOR SYMBOLS ─────────────────────────────────────────

  function scanDocument(model) {
    const text = model.getValue();
    const lines = text.split("\n");
    const symbols = [];
    const classRegex =
      /\b(?:public|private|internal|protected|abstract|sealed|static|partial)?\s*(?:class|struct|interface|record|enum)\s+(\w+)/;
    const methodRegex =
      /\b(?:public|private|internal|protected|static|virtual|override|abstract|async)?\s*(?:public|private|internal|protected|static|virtual|override|abstract|async)?\s*(?:\w+(?:<[^>]+>)?(?:\[\])?)\s+(\w+)\s*\(/;
    const propRegex =
      /\b(?:public|private|internal|protected|static|virtual|override|abstract|required)?\s*(?:\w+(?:<[^>]+>)?(?:\[\])?)\s+(\w+)\s*\{\s*get/;
    const fieldRegex =
      /\b(?:public|private|internal|protected|static|readonly|const)?\s*(?:public|private|internal|protected|static|readonly|const)?\s*(?:\w+(?:<[^>]+>)?(?:\[\])?)\s+(\w+)\s*[;=]/;
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
        if (
          !csharpKeywords.includes(name) &&
          name !== "get" &&
          name !== "set"
        ) {
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

  // ─── GET WORD CONTEXT ──────────────────────────────────────────────────

  function getWordBefore(model, position) {
    const line = model.getLineContent(position.lineNumber);
    const textBefore = line.substring(0, position.column - 1);
    const dotMatch = textBefore.match(/(\w+)\.\s*$/);
    return dotMatch ? dotMatch[1] : null;
  }

  // ─── REGISTER COMPLETION PROVIDER ──────────────────────────────────────

  monaco.languages.registerCompletionItemProvider("csharp", {
    triggerCharacters: [".", " "],
    provideCompletionItems: function (model, position) {
      const suggestions = [];
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };

      const prefix = getWordBefore(model, position);

      // Dot completions
      if (prefix) {
        const pLower = prefix.toLowerCase();
        let methods = [];

        if (pLower === "console") methods = consoleMethods;
        else if (pLower === "string" || pLower === "str" || pLower === "s")
          methods = stringMethods;
        else if (pLower === "math")
          methods = [
            {
              label: "Abs",
              detail: "static int Math.Abs(int)",
              doc: "Returns the absolute value.",
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
              label: "Log10",
              detail: "static double Math.Log10(double)",
              doc: "Returns the base 10 logarithm of a specified number.",
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
            {
              label: "Sign",
              detail: "static int Math.Sign(int)",
              doc: "Returns an integer indicating the sign of a number.",
            },
            {
              label: "Truncate",
              detail: "static double Math.Truncate(double)",
              doc: "Returns the integral part of a specified number.",
            },
          ];
        else {
          // Provide LINQ + list + string methods as general member access
          const allMember = [...linqMethods, ...listMethods, ...stringMethods];
          const seen = new Set();
          allMember.forEach((m) => {
            if (!seen.has(m.label)) {
              seen.add(m.label);
              methods.push(m);
            }
          });
        }

        methods.forEach((m) => {
          suggestions.push({
            label: m.label,
            kind:
              m.detail &&
              (m.detail.includes("(") ||
                m.detail.includes("void") ||
                m.detail.includes("Task"))
                ? monaco.languages.CompletionItemKind.Method
                : monaco.languages.CompletionItemKind.Property,
            insertText:
              m.label + (m.detail && m.detail.includes("(") ? "($1)" : ""),
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: m.detail,
            documentation: { value: m.doc },
            range,
          });
        });

        if (methods.length > 0) return { suggestions };
      }

      // Snippets
      csharpSnippets.forEach((s) => {
        suggestions.push({
          label: s.label,
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: s.body,
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          detail: "Snippet: " + s.doc,
          documentation: {
            value:
              "```csharp\n" +
              s.body.replace(/\$\{\d+:?([^}]*)}/g, "$1").replace(/\$\d+/g, "") +
              "\n```",
          },
          range,
          sortText: "1_" + s.label,
        });
      });

      // Keywords
      csharpKeywords.forEach((kw) => {
        suggestions.push({
          label: kw,
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: kw,
          detail: "keyword",
          documentation: keywordDocs[kw]
            ? { value: keywordDocs[kw] }
            : undefined,
          range,
          sortText: "2_" + kw,
        });
      });

      // Types
      Object.keys(csharpTypes).forEach((t) => {
        suggestions.push({
          label: t,
          kind: monaco.languages.CompletionItemKind.Class,
          insertText: t,
          detail: csharpTypes[t].detail,
          documentation: { value: csharpTypes[t].doc },
          range,
          sortText: "3_" + t,
        });
      });

      // Document symbols
      const symbols = scanDocument(model);
      symbols.forEach((sym) => {
        const kind =
          sym.kind === "class"
            ? monaco.languages.CompletionItemKind.Class
            : sym.kind === "method"
              ? monaco.languages.CompletionItemKind.Method
              : sym.kind === "property"
                ? monaco.languages.CompletionItemKind.Property
                : monaco.languages.CompletionItemKind.Variable;
        suggestions.push({
          label: sym.name,
          kind,
          insertText: sym.name + (sym.kind === "method" ? "($1)" : ""),
          insertTextRules:
            sym.kind === "method"
              ? monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
              : undefined,
          detail: sym.kind + " (defined at line " + sym.line + ")",
          range,
          sortText: "0_" + sym.name,
        });
      });

      // Common attributes
      const attrs = [
        "Serializable",
        "Obsolete",
        "Flags",
        "DllImport",
        "Conditional",
        "DebuggerStepThrough",
        "MethodImpl",
        "CallerMemberName",
        "Test",
        "TestFixture",
        "SetUp",
        "TearDown",
        "Fact",
        "Theory",
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
      attrs.forEach((a) => {
        suggestions.push({
          label: a,
          kind: monaco.languages.CompletionItemKind.Class,
          insertText: a,
          detail: "attribute",
          range,
          sortText: "4_" + a,
        });
      });

      // Namespaces
      const ns = [
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
        "Microsoft.Extensions.DependencyInjection",
        "Microsoft.AspNetCore.Mvc",
        "Microsoft.EntityFrameworkCore",
      ];
      ns.forEach((n) => {
        suggestions.push({
          label: n,
          kind: monaco.languages.CompletionItemKind.Module,
          insertText: n,
          detail: "namespace",
          range,
          sortText: "5_" + n,
        });
      });

      return { suggestions };
    },
  });

  // ─── REGISTER HOVER PROVIDER ───────────────────────────────────────────

  monaco.languages.registerHoverProvider("csharp", {
    provideHover: function (model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return null;
      const w = word.word;

      // Keyword docs
      if (keywordDocs[w]) {
        return {
          range: new monaco.Range(
            position.lineNumber,
            word.startColumn,
            position.lineNumber,
            word.endColumn,
          ),
          contents: [
            { value: "```csharp\n(keyword) " + w + "\n```" },
            { value: keywordDocs[w] },
          ],
        };
      }

      // Type docs
      if (csharpTypes[w]) {
        return {
          range: new monaco.Range(
            position.lineNumber,
            word.startColumn,
            position.lineNumber,
            word.endColumn,
          ),
          contents: [
            { value: "```csharp\n" + csharpTypes[w].detail + "\n```" },
            { value: csharpTypes[w].doc },
          ],
        };
      }

      // Document symbols
      const symbols = scanDocument(model);
      const sym = symbols.find((s) => s.name === w);
      if (sym) {
        const lineContent = model.getLineContent(sym.line).trim();
        return {
          range: new monaco.Range(
            position.lineNumber,
            word.startColumn,
            position.lineNumber,
            word.endColumn,
          ),
          contents: [
            { value: "```csharp\n" + lineContent + "\n```" },
            { value: `*${sym.kind}* — defined at **line ${sym.line}**` },
          ],
        };
      }

      // Console/string/Math method hover
      const line = model.getLineContent(position.lineNumber);
      const before = line.substring(0, word.startColumn - 1);
      const dotMatch = before.match(/(\w+)\.\s*$/);
      if (dotMatch) {
        const obj = dotMatch[1].toLowerCase();
        let methods = [];
        if (obj === "console") methods = consoleMethods;
        else if (obj === "string") methods = stringMethods;
        const found = methods.find((m) => m.label === w);
        if (found) {
          return {
            range: new monaco.Range(
              position.lineNumber,
              word.startColumn,
              position.lineNumber,
              word.endColumn,
            ),
            contents: [
              { value: "```csharp\n" + found.detail + "\n```" },
              { value: found.doc },
            ],
          };
        }
      }

      // LINQ method hover
      const linqFound = linqMethods.find((m) => m.label === w);
      if (linqFound) {
        return {
          range: new monaco.Range(
            position.lineNumber,
            word.startColumn,
            position.lineNumber,
            word.endColumn,
          ),
          contents: [
            { value: "```csharp\n" + linqFound.detail + "\n```" },
            { value: linqFound.doc + "\n\n*(System.Linq.Enumerable)*" },
          ],
        };
      }

      return null;
    },
  });

  // ─── REGISTER DEFINITION PROVIDER ──────────────────────────────────────

  monaco.languages.registerDefinitionProvider("csharp", {
    provideDefinition: function (model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return null;

      const symbols = scanDocument(model);
      const sym = symbols.find((s) => s.name === word.word);
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

  // ─── REGISTER SIGNATURE HELP PROVIDER ──────────────────────────────────

  monaco.languages.registerSignatureHelpProvider("csharp", {
    signatureHelpTriggerCharacters: ["(", ","],
    provideSignatureHelp: function (model, position) {
      const line = model.getLineContent(position.lineNumber);
      const textBefore = line.substring(0, position.column - 1);

      const parenIdx = textBefore.lastIndexOf("(");
      if (parenIdx < 0) return null;

      const beforeParen = textBefore.substring(0, parenIdx).trim();
      const dotIdx = beforeParen.lastIndexOf(".");
      const methodName =
        dotIdx >= 0
          ? beforeParen.substring(dotIdx + 1).trim()
          : beforeParen.split(/\s+/).pop();

      // Count commas for active parameter
      const insideParen = textBefore.substring(parenIdx + 1);
      const activeParam = (insideParen.match(/,/g) || []).length;

      const signatures = {
        WriteLine: {
          label: "Console.WriteLine(string value)",
          params: [
            {
              label: "string value",
              doc: "The value to write to the output stream.",
            },
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
            {
              label: "string newValue",
              doc: "The string to replace all occurrences.",
            },
          ],
          doc: "Returns a new string with all occurrences replaced.",
        },
        Split: {
          label: "string.Split(char separator)",
          params: [
            {
              label: "char separator",
              doc: "A character that delimits substrings.",
            },
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
          params: [
            { label: "T item", doc: "The object to add to the List<T>." },
          ],
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
          params: [
            { label: "int count", doc: "The number of elements to skip." },
          ],
          doc: "Bypasses a specified number of elements.",
        },
        Take: {
          label: "Enumerable.Take(int count)",
          params: [
            { label: "int count", doc: "The number of elements to return." },
          ],
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

      const sig = signatures[methodName];
      if (!sig) return null;

      return {
        value: {
          signatures: [
            {
              label: sig.label,
              documentation: { value: sig.doc },
              parameters: sig.params.map((p) => ({
                label: p.label,
                documentation: { value: p.doc },
              })),
            },
          ],
          activeSignature: 0,
          activeParameter: Math.min(activeParam, sig.params.length - 1),
        },
        dispose: () => {},
      };
    },
  });

  // ─── REGISTER DOCUMENT SYMBOL PROVIDER ─────────────────────────────────

  monaco.languages.registerDocumentSymbolProvider("csharp", {
    provideDocumentSymbols: function (model) {
      const symbols = scanDocument(model);
      return symbols.map((s) => ({
        name: s.name,
        kind:
          s.kind === "class"
            ? monaco.languages.SymbolKind.Class
            : s.kind === "method"
              ? monaco.languages.SymbolKind.Method
              : s.kind === "property"
                ? monaco.languages.SymbolKind.Property
                : monaco.languages.SymbolKind.Variable,
        range: new monaco.Range(
          s.line,
          1,
          s.line,
          model.getLineContent(s.line).length + 1,
        ),
        selectionRange: new monaco.Range(
          s.line,
          s.col,
          s.line,
          s.col + s.name.length,
        ),
      }));
    },
  });

  // ─── FOLDING RANGE PROVIDER ────────────────────────────────────────────

  monaco.languages.registerFoldingRangeProvider("csharp", {
    provideFoldingRanges: function (model) {
      const ranges = [];
      const lines = model.getLinesContent();
      const stack = [];
      const regionStack = [];

      for (let i = 0; i < lines.length; i++) {
        const trimmed = lines[i].trim();
        if (trimmed.match(/^#region/)) {
          regionStack.push(i);
        } else if (trimmed.match(/^#endregion/) && regionStack.length > 0) {
          const start = regionStack.pop();
          ranges.push({
            start: start + 1,
            end: i + 1,
            kind: monaco.languages.FoldingRangeKind.Region,
          });
        }

        if (trimmed.endsWith("{")) {
          stack.push(i);
        } else if (trimmed.startsWith("}") && stack.length > 0) {
          const start = stack.pop();
          if (i - start > 1) {
            ranges.push({ start: start + 1, end: i + 1 });
          }
        }

        // Multi-line comments
        if (trimmed.startsWith("/// <summary>") || trimmed.startsWith("/*")) {
          for (let j = i + 1; j < lines.length; j++) {
            const t = lines[j].trim();
            if (
              (trimmed.startsWith("/// <summary>") && !t.startsWith("///")) ||
              (trimmed.startsWith("/*") && t.endsWith("*/"))
            ) {
              if (j > i + 1)
                ranges.push({
                  start: i + 1,
                  end: j + 1,
                  kind: monaco.languages.FoldingRangeKind.Comment,
                });
              break;
            }
          }
        }
      }
      return ranges;
    },
  });

  // ─── CODE ACTIONS PROVIDER (quick fixes) ───────────────────────────────

  monaco.languages.registerCodeActionProvider("csharp", {
    provideCodeActions: function (model, range) {
      const line = model.getLineContent(range.startLineNumber);
      const actions = [];

      // Suggest adding missing using
      const typeMatch = line.match(
        /\b(List|Dictionary|Task|StringBuilder|Regex|HttpClient|JsonSerializer)\b/,
      );
      if (typeMatch) {
        const usings = {
          List: "System.Collections.Generic",
          Dictionary: "System.Collections.Generic",
          Task: "System.Threading.Tasks",
          StringBuilder: "System.Text",
          Regex: "System.Text.RegularExpressions",
          HttpClient: "System.Net.Http",
          JsonSerializer: "System.Text.Json",
        };
        const ns = usings[typeMatch[1]];
        if (ns) {
          const fullText = model.getValue();
          if (!fullText.includes("using " + ns)) {
            actions.push({
              title: `Add 'using ${ns};'`,
              kind: "quickfix",
              edit: {
                edits: [
                  {
                    resource: model.uri,
                    textEdit: {
                      range: new monaco.Range(1, 1, 1, 1),
                      text: `using ${ns};\n`,
                    },
                    versionId: model.getVersionId(),
                  },
                ],
              },
            });
          }
        }
      }

      return { actions, dispose: () => {} };
    },
  });
};
