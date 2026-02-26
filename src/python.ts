import type * as Monaco from "monaco-editor";
import type { languages } from "monaco-editor";

export default (monaco: typeof Monaco) => {
  monaco.languages.register({ id: "python" });

  // ─── Python Knowledge Base ────────────────────────────────────────
  const PYTHON_KEYWORDS = [
    "False",
    "None",
    "True",
    "and",
    "as",
    "assert",
    "async",
    "await",
    "break",
    "class",
    "continue",
    "def",
    "del",
    "elif",
    "else",
    "except",
    "finally",
    "for",
    "from",
    "global",
    "if",
    "import",
    "in",
    "is",
    "lambda",
    "nonlocal",
    "not",
    "or",
    "pass",
    "raise",
    "return",
    "try",
    "while",
    "with",
    "yield",
  ];

  const PYTHON_BUILTINS = {
    print: {
      signature:
        'print(*objects, sep=" ", end="\\n", file=sys.stdout, flush=False)',
      doc: "Print objects to the text stream file, separated by sep and followed by end.",
    },
    len: {
      signature: "len(s)",
      doc: "Return the number of items in a container.",
    },
    range: {
      signature: "range(stop) / range(start, stop[, step])",
      doc: "Return an immutable sequence of numbers. Commonly used for looping a specific number of times in for loops.",
    },
    input: {
      signature: "input([prompt])",
      doc: "Read a line from input, convert it to a string (stripping a trailing newline), and return that.",
    },
    int: {
      signature: "int(x=0) / int(x, base=10)",
      doc: "Return an integer object constructed from a number or string x, or return 0 if no arguments are given.",
    },
    float: {
      signature: "float(x=0)",
      doc: "Return a floating point number constructed from a number or string x.",
    },
    str: {
      signature: 'str(object="")',
      doc: "Return a string version of object. If object is not provided, returns the empty string.",
    },
    bool: {
      signature: "bool(x=False)",
      doc: "Return a Boolean value, i.e. one of True or False.",
    },
    list: {
      signature: "list([iterable])",
      doc: "Create a new list. If iterable is given, the list items are the same and in the same order as iterable's items.",
    },
    dict: {
      signature: "dict(**kwargs) / dict(mapping, **kwargs)",
      doc: "Create a new dictionary. The dict object is the dictionary class.",
    },
    tuple: {
      signature: "tuple([iterable])",
      doc: "Create a new tuple. If iterable is given, the tuple items are the same and in the same order as iterable's items.",
    },
    set: {
      signature: "set([iterable])",
      doc: "Return a new set object, optionally with elements taken from iterable.",
    },
    frozenset: {
      signature: "frozenset([iterable])",
      doc: "Return a new frozenset object, optionally with elements taken from iterable.",
    },
    type: {
      signature: "type(object) / type(name, bases, dict)",
      doc: "With one argument, return the type of an object. With three arguments, return a new type object.",
    },
    isinstance: {
      signature: "isinstance(object, classinfo)",
      doc: "Return True if the object argument is an instance of the classinfo argument, or of a subclass thereof.",
    },
    issubclass: {
      signature: "issubclass(class, classinfo)",
      doc: "Return True if class is a subclass of classinfo.",
    },
    super: {
      signature: "super([type[, object-or-type]])",
      doc: "Return a proxy object that delegates method calls to a parent or sibling class of type.",
    },
    abs: {
      signature: "abs(x)",
      doc: "Return the absolute value of a number. The argument may be an integer, float, or complex number.",
    },
    round: {
      signature: "round(number[, ndigits])",
      doc: "Return number rounded to ndigits precision after the decimal point.",
    },
    min: {
      signature:
        "min(iterable, *[, key, default]) / min(arg1, arg2, *args[, key])",
      doc: "Return the smallest item in an iterable or the smallest of two or more arguments.",
    },
    max: {
      signature:
        "max(iterable, *[, key, default]) / max(arg1, arg2, *args[, key])",
      doc: "Return the largest item in an iterable or the largest of two or more arguments.",
    },
    sum: {
      signature: "sum(iterable, /, start=0)",
      doc: "Sums start and the items of an iterable from left to right and returns the total.",
    },
    sorted: {
      signature: "sorted(iterable, /, *, key=None, reverse=False)",
      doc: "Return a new sorted list from the items in iterable.",
    },
    reversed: {
      signature: "reversed(seq)",
      doc: "Return a reverse iterator over the values of the given sequence.",
    },
    enumerate: {
      signature: "enumerate(iterable, start=0)",
      doc: "Return an enumerate object. iterable must be a sequence, iterator, or some other object which supports iteration.",
    },
    zip: {
      signature: "zip(*iterables, strict=False)",
      doc: "Iterate over several iterables in parallel, producing tuples with an item from each one.",
    },
    map: {
      signature: "map(function, iterable, *iterables)",
      doc: "Return an iterator that applies function to every item of iterable, yielding the results.",
    },
    filter: {
      signature: "filter(function, iterable)",
      doc: "Construct an iterator from those elements of iterable for which function is true.",
    },
    any: {
      signature: "any(iterable)",
      doc: "Return True if any element of the iterable is true. If the iterable is empty, return False.",
    },
    all: {
      signature: "all(iterable)",
      doc: "Return True if all elements of the iterable are true (or if the iterable is empty).",
    },
    open: {
      signature: 'open(file, mode="r", buffering=-1, encoding=None, ...)',
      doc: "Open file and return a corresponding file object. If the file cannot be opened, an OSError is raised.",
    },
    id: {
      signature: "id(object)",
      doc: "Return the identity of an object. This is an integer which is guaranteed to be unique and constant for this object during its lifetime.",
    },
    hash: {
      signature: "hash(object)",
      doc: "Return the hash value of the object (if it has one). Hash values are integers.",
    },
    callable: {
      signature: "callable(object)",
      doc: "Return True if the object argument appears callable, False if not.",
    },
    getattr: {
      signature: "getattr(object, name[, default])",
      doc: "Return the value of the named attribute of object.",
    },
    setattr: {
      signature: "setattr(object, name, value)",
      doc: "Assigns the value to the attribute, provided the object allows it.",
    },
    hasattr: {
      signature: "hasattr(object, name)",
      doc: "Return True if the string is the name of one of the object's attributes.",
    },
    delattr: {
      signature: "delattr(object, name)",
      doc: "Deletes the named attribute of object.",
    },
    dir: {
      signature: "dir([object])",
      doc: "Without arguments, return the list of names in the current local scope. With an argument, return a list of valid attributes for that object.",
    },
    vars: {
      signature: "vars([object])",
      doc: "Return the __dict__ attribute of the given object.",
    },
    repr: {
      signature: "repr(object)",
      doc: "Return a string containing a printable representation of an object.",
    },
    format: {
      signature: "format(value[, format_spec])",
      doc: "Convert a value to a formatted representation, as controlled by format_spec.",
    },
    chr: {
      signature: "chr(i)",
      doc: "Return the string representing a character whose Unicode code point is the integer i.",
    },
    ord: {
      signature: "ord(c)",
      doc: "Given a string representing one Unicode character, return an integer representing the Unicode code point of that character.",
    },
    hex: {
      signature: "hex(x)",
      doc: 'Convert an integer number to a lowercase hexadecimal string prefixed with "0x".',
    },
    oct: {
      signature: "oct(x)",
      doc: 'Convert an integer number to an octal string prefixed with "0o".',
    },
    bin: {
      signature: "bin(x)",
      doc: 'Convert an integer number to a binary string prefixed with "0b".',
    },
    pow: {
      signature: "pow(base, exp[, mod])",
      doc: "Return base to the power exp; if mod is present, return base to the power exp, modulo mod.",
    },
    divmod: {
      signature: "divmod(a, b)",
      doc: "Return a pair of numbers consisting of their quotient and remainder when using integer division.",
    },
    iter: {
      signature: "iter(object[, sentinel])",
      doc: "Return an iterator object.",
    },
    next: {
      signature: "next(iterator[, default])",
      doc: "Retrieve the next item from the iterator by calling its __next__() method.",
    },
    slice: {
      signature: "slice(stop) / slice(start, stop[, step])",
      doc: "Return a slice object representing the set of indices specified by range(start, stop, step).",
    },
    property: {
      signature: "property(fget=None, fset=None, fdel=None, doc=None)",
      doc: "Return a property attribute.",
    },
    staticmethod: {
      signature: "@staticmethod",
      doc: "Transform a method into a static method. A static method does not receive an implicit first argument.",
    },
    classmethod: {
      signature: "@classmethod",
      doc: "Transform a method into a class method. A class method receives the class as implicit first argument.",
    },
    exec: {
      signature: "exec(object[, globals[, locals]])",
      doc: "Dynamic execution of Python code.",
    },
    eval: {
      signature: "eval(expression[, globals[, locals]])",
      doc: "Evaluate a Python expression string and return the result.",
    },
    compile: {
      signature: "compile(source, filename, mode, ...)",
      doc: "Compile the source into a code or AST object.",
    },
    globals: {
      signature: "globals()",
      doc: "Return the dictionary implementing the current module namespace.",
    },
    locals: {
      signature: "locals()",
      doc: "Return a dictionary representing the current local symbol table.",
    },
    breakpoint: {
      signature: "breakpoint(*args, **kws)",
      doc: "Drop into the debugger at the call site.",
    },
    object: {
      signature: "object()",
      doc: "Return a new featureless object. object is a base for all classes.",
    },
    memoryview: {
      signature: "memoryview(obj)",
      doc: "Create a memoryview that references obj. obj must support the buffer protocol.",
    },
    bytearray: {
      signature: "bytearray([source[, encoding[, errors]]])",
      doc: "Return a new array of bytes.",
    },
    bytes: {
      signature: "bytes([source[, encoding[, errors]]])",
      doc: "Return a new bytes object which is an immutable sequence of integers in the range 0 <= x < 256.",
    },
    complex: {
      signature: "complex(real=0, imag=0)",
      doc: "Return a complex number with the value real + imag*1j or convert a string or number to a complex number.",
    },
    Exception: {
      signature: "Exception(*args)",
      doc: "Common base class for all non-exit exceptions.",
    },
    ValueError: {
      signature: "ValueError(*args)",
      doc: "Raised when an operation receives an argument of the right type but inappropriate value.",
    },
    TypeError: {
      signature: "TypeError(*args)",
      doc: "Raised when an operation or function is applied to an object of inappropriate type.",
    },
    KeyError: {
      signature: "KeyError(*args)",
      doc: "Raised when a mapping key is not found in the set of existing keys.",
    },
    IndexError: {
      signature: "IndexError(*args)",
      doc: "Raised when a sequence subscript is out of range.",
    },
    AttributeError: {
      signature: "AttributeError(*args)",
      doc: "Raised when an attribute reference or assignment fails.",
    },
    ImportError: {
      signature: "ImportError(*args)",
      doc: "Raised when an import statement fails to find the module definition.",
    },
    FileNotFoundError: {
      signature: "FileNotFoundError(*args)",
      doc: "Raised when a file or directory is requested but doesn't exist.",
    },
    IOError: {
      signature: "IOError(*args)",
      doc: "Raised when an I/O operation fails.",
    },
    RuntimeError: {
      signature: "RuntimeError(*args)",
      doc: "Raised when an error is detected that doesn't fall in any of the other categories.",
    },
    StopIteration: {
      signature: "StopIteration(*args)",
      doc: "Raised by next() to signal that there are no further items.",
    },
    NotImplementedError: {
      signature: "NotImplementedError(*args)",
      doc: "Raised when an abstract method that requires an override is not actually overridden.",
    },
    ZeroDivisionError: {
      signature: "ZeroDivisionError(*args)",
      doc: "Raised when the second argument of a division or modulo operation is zero.",
    },
    OverflowError: {
      signature: "OverflowError(*args)",
      doc: "Raised when the result of an arithmetic operation is too large to be represented.",
    },
  };

  const PYTHON_MODULES = {
    os: {
      doc: "Miscellaneous operating system interfaces.",
      members: [
        "path",
        "getcwd",
        "listdir",
        "mkdir",
        "makedirs",
        "remove",
        "rename",
        "environ",
        "sep",
        "linesep",
        "system",
        "getenv",
        "walk",
        "stat",
      ],
    },
    sys: {
      doc: "System-specific parameters and functions.",
      members: [
        "argv",
        "exit",
        "path",
        "stdin",
        "stdout",
        "stderr",
        "version",
        "platform",
        "modules",
        "maxsize",
        "getsizeof",
      ],
    },
    math: {
      doc: "Mathematical functions.",
      members: [
        "sqrt",
        "sin",
        "cos",
        "tan",
        "pi",
        "e",
        "log",
        "log2",
        "log10",
        "ceil",
        "floor",
        "pow",
        "factorial",
        "gcd",
        "isnan",
        "isinf",
        "radians",
        "degrees",
        "asin",
        "acos",
        "atan",
        "atan2",
        "exp",
        "fabs",
        "fmod",
        "trunc",
      ],
    },
    json: {
      doc: "JSON encoder and decoder.",
      members: [
        "dumps",
        "loads",
        "dump",
        "load",
        "JSONEncoder",
        "JSONDecoder",
        "JSONDecodeError",
      ],
    },
    re: {
      doc: "Regular expression operations.",
      members: [
        "match",
        "search",
        "findall",
        "finditer",
        "sub",
        "subn",
        "compile",
        "split",
        "escape",
        "IGNORECASE",
        "MULTILINE",
        "DOTALL",
        "Pattern",
        "Match",
      ],
    },
    datetime: {
      doc: "Basic date and time types.",
      members: [
        "datetime",
        "date",
        "time",
        "timedelta",
        "timezone",
        "MINYEAR",
        "MAXYEAR",
      ],
    },
    collections: {
      doc: "Container datatypes.",
      members: [
        "namedtuple",
        "deque",
        "Counter",
        "OrderedDict",
        "defaultdict",
        "ChainMap",
        "UserDict",
        "UserList",
        "UserString",
      ],
    },
    itertools: {
      doc: "Functions creating iterators for efficient looping.",
      members: [
        "count",
        "cycle",
        "repeat",
        "chain",
        "compress",
        "dropwhile",
        "takewhile",
        "groupby",
        "islice",
        "starmap",
        "product",
        "permutations",
        "combinations",
        "accumulate",
        "zip_longest",
      ],
    },
    functools: {
      doc: "Higher-order functions and operations on callable objects.",
      members: [
        "reduce",
        "partial",
        "lru_cache",
        "cache",
        "wraps",
        "total_ordering",
        "cmp_to_key",
        "singledispatch",
      ],
    },
    typing: {
      doc: "Support for type hints.",
      members: [
        "Any",
        "Union",
        "Optional",
        "List",
        "Dict",
        "Tuple",
        "Set",
        "Callable",
        "Type",
        "ClassVar",
        "Final",
        "Literal",
        "TypeVar",
        "Generic",
        "Protocol",
        "NamedTuple",
        "TypedDict",
      ],
    },
    pathlib: {
      doc: "Object-oriented filesystem paths.",
      members: [
        "Path",
        "PurePath",
        "PurePosixPath",
        "PureWindowsPath",
        "PosixPath",
        "WindowsPath",
      ],
    },
    random: {
      doc: "Generate pseudo-random numbers.",
      members: [
        "random",
        "randint",
        "randrange",
        "choice",
        "choices",
        "shuffle",
        "sample",
        "uniform",
        "gauss",
        "seed",
      ],
    },
    string: {
      doc: "Common string operations.",
      members: [
        "ascii_letters",
        "ascii_lowercase",
        "ascii_uppercase",
        "digits",
        "hexdigits",
        "octdigits",
        "punctuation",
        "whitespace",
        "Template",
        "Formatter",
      ],
    },
    subprocess: {
      doc: "Subprocess management.",
      members: [
        "run",
        "call",
        "check_call",
        "check_output",
        "Popen",
        "PIPE",
        "STDOUT",
        "DEVNULL",
        "CompletedProcess",
      ],
    },
    threading: {
      doc: "Thread-based parallelism.",
      members: [
        "Thread",
        "Lock",
        "RLock",
        "Condition",
        "Event",
        "Semaphore",
        "Barrier",
        "Timer",
        "current_thread",
        "active_count",
      ],
    },
    multiprocessing: {
      doc: "Process-based parallelism.",
      members: [
        "Process",
        "Pool",
        "Queue",
        "Pipe",
        "Lock",
        "Value",
        "Array",
        "Manager",
        "current_process",
        "cpu_count",
      ],
    },
    abc: {
      doc: "Abstract Base Classes.",
      members: [
        "ABC",
        "ABCMeta",
        "abstractmethod",
        "abstractclassmethod",
        "abstractstaticmethod",
      ],
    },
    dataclasses: {
      doc: "Data Classes.",
      members: [
        "dataclass",
        "field",
        "fields",
        "asdict",
        "astuple",
        "make_dataclass",
        "replace",
        "FrozenInstanceError",
      ],
    },
    contextlib: {
      doc: "Utilities for with-statement contexts.",
      members: [
        "contextmanager",
        "asynccontextmanager",
        "closing",
        "suppress",
        "redirect_stdout",
        "redirect_stderr",
        "ExitStack",
        "nullcontext",
      ],
    },
    logging: {
      doc: "Logging facility for Python.",
      members: [
        "getLogger",
        "basicConfig",
        "debug",
        "info",
        "warning",
        "error",
        "critical",
        "Logger",
        "Handler",
        "Formatter",
        "StreamHandler",
        "FileHandler",
        "DEBUG",
        "INFO",
        "WARNING",
        "ERROR",
        "CRITICAL",
      ],
    },
    unittest: {
      doc: "Unit testing framework.",
      members: [
        "TestCase",
        "TestSuite",
        "TestLoader",
        "TextTestRunner",
        "main",
        "mock",
        "skip",
        "skipIf",
        "expectedFailure",
      ],
    },
    argparse: {
      doc: "Command-line parsing library.",
      members: [
        "ArgumentParser",
        "Namespace",
        "Action",
        "FileType",
        "HelpFormatter",
      ],
    },
    csv: {
      doc: "CSV file reading and writing.",
      members: [
        "reader",
        "writer",
        "DictReader",
        "DictWriter",
        "QUOTE_ALL",
        "QUOTE_MINIMAL",
        "QUOTE_NONNUMERIC",
        "QUOTE_NONE",
      ],
    },
    hashlib: {
      doc: "Secure hashes and message digests.",
      members: [
        "md5",
        "sha1",
        "sha224",
        "sha256",
        "sha384",
        "sha512",
        "new",
        "algorithms_available",
        "algorithms_guaranteed",
      ],
    },
    http: {
      doc: "HTTP modules.",
      members: ["client", "server", "cookies", "cookiejar", "HTTPStatus"],
    },
    urllib: {
      doc: "URL handling modules.",
      members: ["request", "parse", "error", "robotparser"],
    },
    socket: {
      doc: "Low-level networking interface.",
      members: [
        "socket",
        "AF_INET",
        "AF_INET6",
        "SOCK_STREAM",
        "SOCK_DGRAM",
        "create_connection",
        "getaddrinfo",
        "gethostname",
      ],
    },
    asyncio: {
      doc: "Asynchronous I/O.",
      members: [
        "run",
        "create_task",
        "gather",
        "sleep",
        "wait",
        "Event",
        "Lock",
        "Semaphore",
        "Queue",
        "StreamReader",
        "StreamWriter",
        "get_event_loop",
        "new_event_loop",
        "AbstractEventLoop",
        "Future",
        "Task",
        "Coroutine",
      ],
    },
    pickle: {
      doc: "Python object serialization.",
      members: [
        "dump",
        "dumps",
        "load",
        "loads",
        "Pickler",
        "Unpickler",
        "PicklingError",
        "UnpicklingError",
      ],
    },
    copy: {
      doc: "Shallow and deep copy operations.",
      members: ["copy", "deepcopy"],
    },
    time: {
      doc: "Time access and conversions.",
      members: [
        "time",
        "sleep",
        "monotonic",
        "perf_counter",
        "process_time",
        "strftime",
        "strptime",
        "gmtime",
        "localtime",
        "mktime",
        "ctime",
        "asctime",
      ],
    },
    io: {
      doc: "Core tools for working with streams.",
      members: [
        "StringIO",
        "BytesIO",
        "TextIOWrapper",
        "BufferedReader",
        "BufferedWriter",
        "FileIO",
        "IOBase",
      ],
    },
    struct: {
      doc: "Interpret bytes as packed binary data.",
      members: [
        "pack",
        "unpack",
        "calcsize",
        "pack_into",
        "unpack_from",
        "Struct",
      ],
    },
    pdb: {
      doc: "The Python Debugger.",
      members: [
        "set_trace",
        "run",
        "runeval",
        "runcall",
        "post_mortem",
        "pm",
        "Pdb",
      ],
    },
    traceback: {
      doc: "Print or retrieve a stack traceback.",
      members: [
        "print_exc",
        "format_exc",
        "print_tb",
        "format_tb",
        "extract_tb",
        "extract_stack",
        "TracebackException",
      ],
    },
  };

  const STRING_METHODS = [
    {
      name: "capitalize",
      sig: "str.capitalize()",
      doc: "Return a copy of the string with its first character capitalized and the rest lowercased.",
    },
    {
      name: "casefold",
      sig: "str.casefold()",
      doc: "Return a casefolded copy of the string. Casefolded strings may be used for caseless matching.",
    },
    {
      name: "center",
      sig: "str.center(width[, fillchar])",
      doc: "Return centered in a string of length width.",
    },
    {
      name: "count",
      sig: "str.count(sub[, start[, end]])",
      doc: "Return the number of non-overlapping occurrences of substring sub.",
    },
    {
      name: "encode",
      sig: 'str.encode(encoding="utf-8", errors="strict")',
      doc: "Return the string encoded to bytes.",
    },
    {
      name: "endswith",
      sig: "str.endswith(suffix[, start[, end]])",
      doc: "Return True if the string ends with the specified suffix.",
    },
    {
      name: "expandtabs",
      sig: "str.expandtabs(tabsize=8)",
      doc: "Return a copy where all tab characters are expanded using spaces.",
    },
    {
      name: "find",
      sig: "str.find(sub[, start[, end]])",
      doc: "Return the lowest index where substring sub is found. Returns -1 on failure.",
    },
    {
      name: "format",
      sig: "str.format(*args, **kwargs)",
      doc: "Perform a string formatting operation.",
    },
    {
      name: "format_map",
      sig: "str.format_map(mapping)",
      doc: "Similar to str.format(**mapping), except mapping is used directly.",
    },
    {
      name: "index",
      sig: "str.index(sub[, start[, end]])",
      doc: "Like find(), but raise ValueError when the substring is not found.",
    },
    {
      name: "isalnum",
      sig: "str.isalnum()",
      doc: "Return True if all characters are alphanumeric.",
    },
    {
      name: "isalpha",
      sig: "str.isalpha()",
      doc: "Return True if all characters are alphabetic.",
    },
    {
      name: "isascii",
      sig: "str.isascii()",
      doc: "Return True if all characters are ASCII.",
    },
    {
      name: "isdecimal",
      sig: "str.isdecimal()",
      doc: "Return True if all characters are decimal characters.",
    },
    {
      name: "isdigit",
      sig: "str.isdigit()",
      doc: "Return True if all characters are digits.",
    },
    {
      name: "isidentifier",
      sig: "str.isidentifier()",
      doc: "Return True if the string is a valid Python identifier.",
    },
    {
      name: "islower",
      sig: "str.islower()",
      doc: "Return True if all cased characters are lowercase.",
    },
    {
      name: "isnumeric",
      sig: "str.isnumeric()",
      doc: "Return True if all characters are numeric.",
    },
    {
      name: "isprintable",
      sig: "str.isprintable()",
      doc: "Return True if all characters are printable.",
    },
    {
      name: "isspace",
      sig: "str.isspace()",
      doc: "Return True if all characters are whitespace.",
    },
    {
      name: "istitle",
      sig: "str.istitle()",
      doc: "Return True if the string is a title-cased string.",
    },
    {
      name: "isupper",
      sig: "str.isupper()",
      doc: "Return True if all cased characters are uppercase.",
    },
    {
      name: "join",
      sig: "str.join(iterable)",
      doc: "Return a string which is the concatenation of the strings in iterable, separated by this string.",
    },
    {
      name: "ljust",
      sig: "str.ljust(width[, fillchar])",
      doc: "Return the string left-justified in a string of length width.",
    },
    {
      name: "lower",
      sig: "str.lower()",
      doc: "Return a copy of the string with all cased characters converted to lowercase.",
    },
    {
      name: "lstrip",
      sig: "str.lstrip([chars])",
      doc: "Return a copy of the string with leading characters removed.",
    },
    {
      name: "partition",
      sig: "str.partition(sep)",
      doc: "Split the string at the first occurrence of sep, return 3-tuple.",
    },
    {
      name: "removeprefix",
      sig: "str.removeprefix(prefix)",
      doc: "If the string starts with prefix, return string[len(prefix):]. Otherwise return the original string.",
    },
    {
      name: "removesuffix",
      sig: "str.removesuffix(suffix)",
      doc: "If the string ends with suffix, return string[:-len(suffix)]. Otherwise return the original string.",
    },
    {
      name: "replace",
      sig: "str.replace(old, new[, count])",
      doc: "Return a copy with all occurrences of substring old replaced by new.",
    },
    {
      name: "rfind",
      sig: "str.rfind(sub[, start[, end]])",
      doc: "Return the highest index where substring sub is found.",
    },
    {
      name: "rindex",
      sig: "str.rindex(sub[, start[, end]])",
      doc: "Like rfind() but raises ValueError when the substring is not found.",
    },
    {
      name: "rjust",
      sig: "str.rjust(width[, fillchar])",
      doc: "Return the string right-justified in a string of length width.",
    },
    {
      name: "rpartition",
      sig: "str.rpartition(sep)",
      doc: "Split the string at the last occurrence of sep, return 3-tuple.",
    },
    {
      name: "rsplit",
      sig: "str.rsplit(sep=None, maxsplit=-1)",
      doc: "Return a list of the words in the string, using sep as the delimiter, scanning from right.",
    },
    {
      name: "rstrip",
      sig: "str.rstrip([chars])",
      doc: "Return a copy of the string with trailing characters removed.",
    },
    {
      name: "split",
      sig: "str.split(sep=None, maxsplit=-1)",
      doc: "Return a list of the words in the string, using sep as the delimiter.",
    },
    {
      name: "splitlines",
      sig: "str.splitlines([keepends])",
      doc: "Return a list of the lines in the string, breaking at line boundaries.",
    },
    {
      name: "startswith",
      sig: "str.startswith(prefix[, start[, end]])",
      doc: "Return True if string starts with the prefix.",
    },
    {
      name: "strip",
      sig: "str.strip([chars])",
      doc: "Return a copy of the string with leading and trailing characters removed.",
    },
    {
      name: "swapcase",
      sig: "str.swapcase()",
      doc: "Return a copy of the string with uppercase characters converted to lowercase and vice versa.",
    },
    {
      name: "title",
      sig: "str.title()",
      doc: "Return a title-cased version of the string.",
    },
    {
      name: "upper",
      sig: "str.upper()",
      doc: "Return a copy of the string with all cased characters converted to uppercase.",
    },
    {
      name: "zfill",
      sig: "str.zfill(width)",
      doc: "Pad a numeric string with zeros on the left, to fill a field of the given width.",
    },
  ];

  const LIST_METHODS = [
    {
      name: "append",
      sig: "list.append(x)",
      doc: "Append x to the end of the list.",
    },
    {
      name: "extend",
      sig: "list.extend(iterable)",
      doc: "Extend the list by appending all the items from the iterable.",
    },
    {
      name: "insert",
      sig: "list.insert(i, x)",
      doc: "Insert x at the given position i.",
    },
    {
      name: "remove",
      sig: "list.remove(x)",
      doc: "Remove the first item from the list whose value is equal to x.",
    },
    {
      name: "pop",
      sig: "list.pop([i])",
      doc: "Remove and return the item at the given position. Default is the last item.",
    },
    {
      name: "clear",
      sig: "list.clear()",
      doc: "Remove all items from the list.",
    },
    {
      name: "index",
      sig: "list.index(x[, start[, end]])",
      doc: "Return zero-based index of the first item whose value is equal to x.",
    },
    {
      name: "count",
      sig: "list.count(x)",
      doc: "Return the number of times x appears in the list.",
    },
    {
      name: "sort",
      sig: "list.sort(*, key=None, reverse=False)",
      doc: "Sort the items of the list in place.",
    },
    {
      name: "reverse",
      sig: "list.reverse()",
      doc: "Reverse the elements of the list in place.",
    },
    {
      name: "copy",
      sig: "list.copy()",
      doc: "Return a shallow copy of the list.",
    },
  ];

  const DICT_METHODS = [
    {
      name: "keys",
      sig: "dict.keys()",
      doc: "Return a view object displaying a list of all the keys.",
    },
    {
      name: "values",
      sig: "dict.values()",
      doc: "Return a view object displaying a list of all the values.",
    },
    {
      name: "items",
      sig: "dict.items()",
      doc: "Return a view object displaying a list of key-value tuple pairs.",
    },
    {
      name: "get",
      sig: "dict.get(key[, default])",
      doc: "Return the value for key if key is in the dictionary, else default.",
    },
    {
      name: "setdefault",
      sig: "dict.setdefault(key[, default])",
      doc: "If key is in the dictionary, return its value. If not, insert key with default and return default.",
    },
    {
      name: "update",
      sig: "dict.update([other])",
      doc: "Update the dictionary with key/value pairs from other, overwriting existing keys.",
    },
    {
      name: "pop",
      sig: "dict.pop(key[, default])",
      doc: "Remove and return value at key. If key is not found, default is returned.",
    },
    {
      name: "popitem",
      sig: "dict.popitem()",
      doc: "Remove and return a (key, value) pair. Pairs are returned in LIFO order.",
    },
    {
      name: "clear",
      sig: "dict.clear()",
      doc: "Remove all items from the dictionary.",
    },
    {
      name: "copy",
      sig: "dict.copy()",
      doc: "Return a shallow copy of the dictionary.",
    },
    {
      name: "fromkeys",
      sig: "dict.fromkeys(iterable[, value])",
      doc: "Create a new dictionary with keys from iterable and values set to value.",
    },
  ];

  const SET_METHODS = [
    { name: "add", sig: "set.add(elem)", doc: "Add element elem to the set." },
    {
      name: "remove",
      sig: "set.remove(elem)",
      doc: "Remove element elem from the set. Raises KeyError if not present.",
    },
    {
      name: "discard",
      sig: "set.discard(elem)",
      doc: "Remove element elem from the set if it is present.",
    },
    {
      name: "pop",
      sig: "set.pop()",
      doc: "Remove and return an arbitrary set element. Raises KeyError if empty.",
    },
    {
      name: "clear",
      sig: "set.clear()",
      doc: "Remove all elements from the set.",
    },
    {
      name: "union",
      sig: "set.union(*others)",
      doc: "Return a new set with elements from the set and all others.",
    },
    {
      name: "intersection",
      sig: "set.intersection(*others)",
      doc: "Return a new set with elements common to the set and all others.",
    },
    {
      name: "difference",
      sig: "set.difference(*others)",
      doc: "Return a new set with elements in the set that are not in the others.",
    },
    {
      name: "symmetric_difference",
      sig: "set.symmetric_difference(other)",
      doc: "Return a new set with elements in either the set or other but not both.",
    },
    {
      name: "issubset",
      sig: "set.issubset(other)",
      doc: "Test whether every element in the set is in other.",
    },
    {
      name: "issuperset",
      sig: "set.issuperset(other)",
      doc: "Test whether every element in other is in the set.",
    },
    {
      name: "isdisjoint",
      sig: "set.isdisjoint(other)",
      doc: "Return True if the set has no elements in common with other.",
    },
    {
      name: "copy",
      sig: "set.copy()",
      doc: "Return a shallow copy of the set.",
    },
    {
      name: "update",
      sig: "set.update(*others)",
      doc: "Update the set, adding elements from all others.",
    },
  ];

  // ─── Snippets ─────────────────────────────────────────────────────
  const PYTHON_SNIPPETS = [
    {
      label: "def",
      detail: "Function definition",
      insertText: "def ${1:function_name}(${2:params}):\n\t${3:pass}",
    },
    {
      label: "defs",
      detail: "Function with docstring",
      insertText:
        'def ${1:function_name}(${2:params}):\n\t"""${3:Docstring}"""\n\t${4:pass}',
    },
    {
      label: "class",
      detail: "Class definition",
      insertText:
        "class ${1:ClassName}:\n\tdef __init__(self${2:, args}):\n\t\t${3:pass}",
    },
    {
      label: "classi",
      detail: "Class with inheritance",
      insertText:
        "class ${1:ClassName}(${2:BaseClass}):\n\tdef __init__(self${3:, args}):\n\t\tsuper().__init__(${4:})\n\t\t${5:pass}",
    },
    {
      label: "if",
      detail: "If statement",
      insertText: "if ${1:condition}:\n\t${2:pass}",
    },
    {
      label: "ife",
      detail: "If/else statement",
      insertText: "if ${1:condition}:\n\t${2:pass}\nelse:\n\t${3:pass}",
    },
    {
      label: "ifee",
      detail: "If/elif/else statement",
      insertText:
        "if ${1:condition}:\n\t${2:pass}\nelif ${3:condition}:\n\t${4:pass}\nelse:\n\t${5:pass}",
    },
    {
      label: "for",
      detail: "For loop",
      insertText: "for ${1:item} in ${2:iterable}:\n\t${3:pass}",
    },
    {
      label: "fore",
      detail: "For/enumerate loop",
      insertText:
        "for ${1:i}, ${2:item} in enumerate(${3:iterable}):\n\t${4:pass}",
    },
    {
      label: "while",
      detail: "While loop",
      insertText: "while ${1:condition}:\n\t${2:pass}",
    },
    {
      label: "try",
      detail: "Try/except",
      insertText:
        "try:\n\t${1:pass}\nexcept ${2:Exception} as ${3:e}:\n\t${4:pass}",
    },
    {
      label: "tryf",
      detail: "Try/except/finally",
      insertText:
        "try:\n\t${1:pass}\nexcept ${2:Exception} as ${3:e}:\n\t${4:pass}\nfinally:\n\t${5:pass}",
    },
    {
      label: "trye",
      detail: "Try/except/else/finally",
      insertText:
        "try:\n\t${1:pass}\nexcept ${2:Exception} as ${3:e}:\n\t${4:pass}\nelse:\n\t${5:pass}\nfinally:\n\t${6:pass}",
    },
    {
      label: "with",
      detail: "With statement",
      insertText: "with ${1:expression} as ${2:variable}:\n\t${3:pass}",
    },
    {
      label: "witho",
      detail: "Open file with statement",
      insertText:
        'with open(${1:"filename"}, ${2:"r"}) as ${3:f}:\n\t${4:content = f.read()}',
    },
    {
      label: "lambda",
      detail: "Lambda expression",
      insertText: "lambda ${1:args}: ${2:expression}",
    },
    {
      label: "lc",
      detail: "List comprehension",
      insertText: "[${1:expr} for ${2:item} in ${3:iterable}]",
    },
    {
      label: "lci",
      detail: "List comp with condition",
      insertText:
        "[${1:expr} for ${2:item} in ${3:iterable} if ${4:condition}]",
    },
    {
      label: "dc",
      detail: "Dict comprehension",
      insertText: "{${1:key}: ${2:value} for ${3:item} in ${4:iterable}}",
    },
    {
      label: "sc",
      detail: "Set comprehension",
      insertText: "{${1:expr} for ${2:item} in ${3:iterable}}",
    },
    {
      label: "gc",
      detail: "Generator expression",
      insertText: "(${1:expr} for ${2:item} in ${3:iterable})",
    },
    {
      label: "main",
      detail: 'if __name__ == "__main__"',
      insertText: 'if __name__ == "__main__":\n\t${1:main()}',
    },
    {
      label: "ifmain",
      detail: "Main block with function",
      insertText:
        'def main():\n\t${1:pass}\n\n\nif __name__ == "__main__":\n\tmain()',
    },
    {
      label: "imp",
      detail: "Import statement",
      insertText: "import ${1:module}",
    },
    {
      label: "impf",
      detail: "From import statement",
      insertText: "from ${1:module} import ${2:name}",
    },
    {
      label: "impa",
      detail: "Import as alias",
      insertText: "import ${1:module} as ${2:alias}",
    },
    { label: "pr", detail: "Print statement", insertText: "print(${1:})" },
    { label: "prf", detail: "Print f-string", insertText: 'print(f"${1:}")\n' },
    {
      label: "fstr",
      detail: "F-string",
      insertText: 'f"${1:text} {${2:expr}}"',
    },
    {
      label: "assert",
      detail: "Assert statement",
      insertText: 'assert ${1:condition}, "${2:message}"',
    },
    {
      label: "raise",
      detail: "Raise exception",
      insertText: 'raise ${1:Exception}("${2:message}")',
    },
    {
      label: "decorator",
      detail: "Decorator function",
      insertText:
        "def ${1:decorator}(func):\n\t@functools.wraps(func)\n\tdef wrapper(*args, **kwargs):\n\t\t${2:# before}\n\t\tresult = func(*args, **kwargs)\n\t\t${3:# after}\n\t\treturn result\n\treturn wrapper",
    },
    {
      label: "property",
      detail: "Property decorator",
      insertText:
        '@property\ndef ${1:name}(self):\n\t"""${2:Getter}"""\n\treturn self._${1:name}\n\n@${1:name}.setter\ndef ${1:name}(self, value):\n\tself._${1:name} = value',
    },
    {
      label: "dataclass",
      detail: "Dataclass",
      insertText:
        "@dataclass\nclass ${1:ClassName}:\n\t${2:field}: ${3:type}\n\t${4:field2}: ${5:type2}",
    },
    {
      label: "async",
      detail: "Async function",
      insertText: "async def ${1:function_name}(${2:params}):\n\t${3:pass}",
    },
    {
      label: "asyncw",
      detail: "Async with",
      insertText: "async with ${1:expression} as ${2:variable}:\n\t${3:pass}",
    },
    {
      label: "asyncfor",
      detail: "Async for",
      insertText: "async for ${1:item} in ${2:iterable}:\n\t${3:pass}",
    },
    {
      label: "aiorun",
      detail: "Asyncio run boilerplate",
      insertText:
        "import asyncio\n\nasync def main():\n\t${1:pass}\n\nasyncio.run(main())",
    },
    {
      label: "ctx",
      detail: "Context manager class",
      insertText:
        "class ${1:ContextManager}:\n\tdef __enter__(self):\n\t\t${2:return self}\n\n\tdef __exit__(self, exc_type, exc_val, exc_tb):\n\t\t${3:pass}",
    },
    {
      label: "log",
      detail: "Logging setup",
      insertText:
        "import logging\n\nlogger = logging.getLogger(__name__)\nlogging.basicConfig(level=logging.${1:INFO})\n",
    },
    {
      label: "dunder",
      detail: "__repr__ and __str__",
      insertText:
        'def __repr__(self):\n\treturn f"${1:ClassName}({${2:self.attr!r}})"\n\ndef __str__(self):\n\treturn f"${3:{self.attr}}"',
    },
    {
      label: "test",
      detail: "Unit test class",
      insertText:
        'import unittest\n\nclass Test${1:Name}(unittest.TestCase):\n\tdef setUp(self):\n\t\t${2:pass}\n\n\tdef test_${3:feature}(self):\n\t\t${4:self.assertEqual(True, True)}\n\n\nif __name__ == "__main__":\n\tunittest.main()',
    },
    {
      label: "argparse",
      detail: "Argparse boilerplate",
      insertText:
        'import argparse\n\nparser = argparse.ArgumentParser(description="${1:Description}")\nparser.add_argument("${2:arg}", type=${3:str}, help="${4:help text}")\nargs = parser.parse_args()',
    },
  ];

  // ─── Helper: Parse user-defined symbols from code ─────────────────
  function parseUserSymbols(code: string) {
    const symbols = { functions: [], classes: [], variables: [], imports: [] };
    const lines = code.split("\n");

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const ln = i + 1;

      // functions
      let m = line.match(/^(\s*)def\s+(\w+)\s*\((.*?)\)/);
      if (m) {
        const indent = m[1].length;
        let docstring = "";
        if (i + 1 < lines.length) {
          const nextLine = lines[i + 1].trim();
          const dm = nextLine.match(/^(?:"""|''')(.*?)(?:"""|''')?$/);
          if (dm) docstring = dm[1];
        }
        symbols.functions.push({
          name: m[2],
          params: m[3],
          line: ln,
          col: m[1].length,
          docstring,
          indent,
        });
      }
      // classes
      m = line.match(/^(\s*)class\s+(\w+)\s*(?:\((.*?)\))?/);
      if (m) {
        symbols.classes.push({
          name: m[2],
          bases: m[3] || "",
          line: ln,
          col: m[1].length,
        });
      }
      // variable assignment
      m = line.match(/^(\w+)\s*(?::.*?)?\s*=\s*/);
      if (m && !PYTHON_KEYWORDS.includes(m[1])) {
        symbols.variables.push({ name: m[1], line: ln, col: 0 });
      }
      // imports
      m = line.match(/^import\s+([\w.]+)(?:\s+as\s+(\w+))?/);
      if (m) {
        symbols.imports.push({
          name: m[2] || m[1],
          module: m[1],
          line: ln,
          col: 0,
        });
      }
      m = line.match(/^from\s+([\w.]+)\s+import\s+(.+)/);
      if (m) {
        const names = m[2].split(",").map((n) => n.trim().split(/\s+as\s+/));
        names.forEach((n) => {
          symbols.imports.push({
            name: n[n.length - 1],
            module: m[1] + "." + n[0],
            line: ln,
            col: 0,
          });
        });
      }
    }
    return symbols;
  }

  // ─── Completion Provider ──────────────────────────────────────────
  const completions: languages.CompletionItemProvider = {
    triggerCharacters: [".", " ", "("],
    provideCompletionItems: function (model, position) {
      const textUntilPosition = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });
      const fullText = model.getValue();
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endLineNumber: position.lineNumber,
        endColumn: word.endColumn,
      };

      const suggestions = [];
      const CIK = monaco.languages.CompletionItemKind;

      // ── Dot completions ──
      const dotMatch = textUntilPosition.match(/(\w+)\.\s*(\w*)$/);
      if (dotMatch) {
        const obj = dotMatch[1];
        const dotRange = {
          startLineNumber: position.lineNumber,
          startColumn: position.column - (dotMatch[2] ? dotMatch[2].length : 0),
          endLineNumber: position.lineNumber,
          endColumn: position.column,
        };

        // Module members
        if (PYTHON_MODULES[obj]) {
          PYTHON_MODULES[obj].members.forEach((m) => {
            suggestions.push({
              label: m,
              kind: CIK.Field,
              detail: `${obj}.${m}`,
              documentation: `Member of ${obj} module`,
              insertText: m,
              range: dotRange,
            });
          });
          return { suggestions };
        }

        // Check user symbols for type hints
        const userSymbols = parseUserSymbols(fullText);

        // String methods
        const isStr =
          fullText.match(new RegExp(`${obj}\\s*[:=]\\s*["'f]`)) ||
          fullText.match(new RegExp(`${obj}\\s*:\\s*str`));
        if (isStr || obj === "str") {
          STRING_METHODS.forEach((m) => {
            suggestions.push({
              label: m.name,
              kind: CIK.Method,
              detail: m.sig,
              documentation: m.doc,
              insertText: m.name.includes("(") ? m.name : m.name + "($0)",
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: dotRange,
            });
          });
          if (suggestions.length > 0) return { suggestions };
        }

        // List methods
        const isList =
          fullText.match(new RegExp(`${obj}\\s*[:=]\\s*\\[`)) ||
          fullText.match(new RegExp(`${obj}\\s*:\\s*(?:List|list)`));
        if (isList || obj === "list") {
          LIST_METHODS.forEach((m) => {
            suggestions.push({
              label: m.name,
              kind: CIK.Method,
              detail: m.sig,
              documentation: m.doc,
              insertText: m.name + "($0)",
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: dotRange,
            });
          });
          if (suggestions.length > 0) return { suggestions };
        }

        // Dict methods
        const isDict =
          fullText.match(new RegExp(`${obj}\\s*[:=]\\s*\\{`)) ||
          fullText.match(new RegExp(`${obj}\\s*:\\s*(?:Dict|dict)`)) ||
          fullText.match(
            new RegExp(`${obj}\\s*=\\s*(?:dict|defaultdict|OrderedDict)\\(`),
          );
        if (isDict || obj === "dict") {
          DICT_METHODS.forEach((m) => {
            suggestions.push({
              label: m.name,
              kind: CIK.Method,
              detail: m.sig,
              documentation: m.doc,
              insertText: m.name + "($0)",
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: dotRange,
            });
          });
          if (suggestions.length > 0) return { suggestions };
        }

        // Set methods
        const isSet =
          fullText.match(new RegExp(`${obj}\\s*=\\s*set\\(`)) ||
          fullText.match(new RegExp(`${obj}\\s*:\\s*(?:Set|set)`));
        if (isSet || obj === "set") {
          SET_METHODS.forEach((m) => {
            suggestions.push({
              label: m.name,
              kind: CIK.Method,
              detail: m.sig,
              documentation: m.doc,
              insertText: m.name + "($0)",
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: dotRange,
            });
          });
          if (suggestions.length > 0) return { suggestions };
        }

        // Self: show class methods/attrs
        if (obj === "self") {
          userSymbols.functions.forEach((fn) => {
            if (fn.indent > 0) {
              suggestions.push({
                label: fn.name,
                kind: CIK.Method,
                detail: `def ${fn.name}(${fn.params})`,
                documentation: fn.docstring || "User-defined method",
                insertText: fn.name + "($0)",
                insertTextRules:
                  monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                range: dotRange,
              });
            }
          });

          // self.attr patterns
          const selfAttrs = new Set();
          const selfAttrRegex = /self\.(\w+)\s*=/g;
          let sam;
          while ((sam = selfAttrRegex.exec(fullText)) !== null) {
            selfAttrs.add(sam[1]);
          }
          selfAttrs.forEach((attr) => {
            suggestions.push({
              label: attr,
              kind: CIK.Property,
              detail: `self.${attr}`,
              documentation: "Instance attribute",
              insertText: attr,
              range: dotRange,
            });
          });

          if (suggestions.length > 0) return { suggestions };
        }

        // Class name dot -> show class methods
        userSymbols.classes.forEach((cls) => {
          if (cls.name === obj) {
            userSymbols.functions.forEach((fn) => {
              suggestions.push({
                label: fn.name,
                kind: CIK.Method,
                detail: `def ${fn.name}(${fn.params})`,
                documentation: fn.docstring || "Method",
                insertText: fn.name + "($0)",
                insertTextRules:
                  monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                range: dotRange,
              });
            });
          }
        });

        if (suggestions.length > 0) return { suggestions };

        // Fallback: offer all common methods
        const allMethods = [
          ...STRING_METHODS,
          ...LIST_METHODS,
          ...DICT_METHODS,
          ...SET_METHODS,
        ];
        const seen = new Set();
        allMethods.forEach((m) => {
          if (!seen.has(m.name)) {
            seen.add(m.name);
            suggestions.push({
              label: m.name,
              kind: CIK.Method,
              detail: m.sig,
              documentation: m.doc,
              insertText: m.name + "($0)",
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: dotRange,
            });
          }
        });
        return { suggestions };
      }

      // ── from X import ──
      const fromImportMatch = textUntilPosition.match(
        /from\s+(\w+)\s+import\s+(\w*)$/,
      );
      if (fromImportMatch) {
        const mod = fromImportMatch[1];
        if (PYTHON_MODULES[mod]) {
          const importRange = {
            startLineNumber: position.lineNumber,
            startColumn:
              position.column -
              (fromImportMatch[2] ? fromImportMatch[2].length : 0),
            endLineNumber: position.lineNumber,
            endColumn: position.column,
          };
          PYTHON_MODULES[mod].members.forEach((m) => {
            suggestions.push({
              label: m,
              kind: CIK.Module,
              detail: `from ${mod} import ${m}`,
              documentation: `Import ${m} from ${mod}`,
              insertText: m,
              range: importRange,
            });
          });
          return { suggestions };
        }
      }

      // ── import X ──
      const importMatch = textUntilPosition.match(/^import\s+(\w*)$/);
      if (importMatch) {
        Object.entries(PYTHON_MODULES).forEach(([name, mod]) => {
          suggestions.push({
            label: name,
            kind: CIK.Module,
            detail: mod.doc,
            documentation: mod.doc,
            insertText: name,
            range,
          });
        });
        return { suggestions };
      }

      // ── Snippets ──
      PYTHON_SNIPPETS.forEach((s) => {
        suggestions.push({
          label: s.label,
          kind: CIK.Snippet,
          detail: "(snippet) " + s.detail,
          documentation: s.detail,
          insertText: s.insertText,
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range,
          sortText: "1_" + s.label,
        });
      });

      // ── Keywords ──
      PYTHON_KEYWORDS.forEach((kw) => {
        suggestions.push({
          label: kw,
          kind: CIK.Keyword,
          detail: "keyword",
          insertText: kw,
          range,
          sortText: "2_" + kw,
        });
      });

      // ── Builtins ──
      Object.entries(PYTHON_BUILTINS).forEach(([name, info]) => {
        suggestions.push({
          label: name,
          kind: CIK.Function,
          detail: info.signature,
          documentation: info.doc,
          insertText: name + "($0)",
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range,
          sortText: "3_" + name,
        });
      });

      // ── Modules ──
      Object.entries(PYTHON_MODULES).forEach(([name, mod]) => {
        suggestions.push({
          label: name,
          kind: CIK.Module,
          detail: mod.doc,
          documentation: mod.doc,
          insertText: name,
          range,
          sortText: "5_" + name,
        });
      });

      // ── User symbols ──
      const userSymbols = parseUserSymbols(fullText);
      userSymbols.functions.forEach((fn) => {
        suggestions.push({
          label: fn.name,
          kind: CIK.Function,
          detail: `def ${fn.name}(${fn.params})`,
          documentation: fn.docstring || "User-defined function",
          insertText: fn.name + "($0)",
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range,
          sortText: "0_" + fn.name,
        });
      });
      userSymbols.classes.forEach((cls) => {
        suggestions.push({
          label: cls.name,
          kind: CIK.Class,
          detail: `class ${cls.name}(${cls.bases})`,
          documentation: "User-defined class",
          insertText: cls.name,
          range,
          sortText: "0_" + cls.name,
        });
      });
      userSymbols.variables.forEach((v) => {
        suggestions.push({
          label: v.name,
          kind: CIK.Variable,
          detail: "variable",
          documentation: "User-defined variable",
          insertText: v.name,
          range,
          sortText: "0_" + v.name,
        });
      });

      return { suggestions };
    },
  };

  // ─── Signature Help Provider ──────────────────────────────────────
  const signatureHelpProvider: Monaco.languages.SignatureHelpProvider = {
    signatureHelpTriggerCharacters: ["(", ","],
    provideSignatureHelp: function (model, position) {
      const textUntilPosition = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });

      // Find the function name before the (
      const funcMatch = textUntilPosition.match(/(\w+)\s*\([^)]*$/);
      if (!funcMatch) return null;

      const funcName = funcMatch[1];

      // Count commas to determine active parameter
      const afterParen = textUntilPosition.slice(
        textUntilPosition.lastIndexOf("(") + 1,
      );
      let activeParam = 0;
      let depth = 0;
      for (const ch of afterParen) {
        if (ch === "(" || ch === "[" || ch === "{") depth++;
        else if (ch === ")" || ch === "]" || ch === "}") depth--;
        else if (ch === "," && depth === 0) activeParam++;
      }

      if (PYTHON_BUILTINS[funcName]) {
        const info = PYTHON_BUILTINS[funcName];
        const sig = info.signature;
        // Parse parameters
        const paramsMatch = sig.match(/\((.+)\)/);
        const params = paramsMatch
          ? paramsMatch[1].split(",").map((p) => ({
              label: p.trim(),
              documentation: "",
            }))
          : [];

        return {
          value: {
            signatures: [
              {
                label: sig,
                documentation: info.doc,
                parameters: params,
              },
            ],
            activeSignature: 0,
            activeParameter: activeParam,
          },
          dispose: () => {},
        };
      }

      // User functions
      const userSymbols = parseUserSymbols(model.getValue());
      const fn = userSymbols.functions.find((f) => f.name === funcName);
      if (fn) {
        const sig = `${fn.name}(${fn.params})`;
        const params = fn.params
          ? fn.params.split(",").map((p) => ({
              label: p.trim(),
              documentation: "",
            }))
          : [];

        return {
          value: {
            signatures: [
              {
                label: sig,
                documentation: fn.docstring || "",
                parameters: params,
              },
            ],
            activeSignature: 0,
            activeParameter: activeParam,
          },
          dispose: () => {},
        };
      }

      return null;
    },
  };

  // ─── Hover Provider ───────────────────────────────────────────────
  const hoverProvider: Monaco.languages.HoverProvider = {
    provideHover: function (model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return null;

      const name = word.word;
      const range = {
        startLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endLineNumber: position.lineNumber,
        endColumn: word.endColumn,
      };

      // Keywords
      if (PYTHON_KEYWORDS.includes(name)) {
        const keywordDocs = {
          def: "Define a function.",
          class: "Define a class.",
          if: "Conditional execution.",
          elif: "Else if — alternative condition in an if chain.",
          else: "Else clause for if, for, while, or try statements.",
          for: "Iterate over items of a sequence.",
          while: "Execute a block as long as a condition is true.",
          try: "Handle exceptions.",
          except: "Catch and handle exceptions in a try block.",
          finally: "Execute cleanup code regardless of exceptions.",
          with: "Wrap block execution with context manager methods.",
          as: "Create an alias or bind exception in except/with.",
          import: "Import a module.",
          from: "Import specific attributes from a module.",
          return: "Return a value from a function.",
          yield: "Pause a generator function and yield a value.",
          raise: "Raise an exception.",
          pass: "Null operation — a placeholder.",
          break: "Break out of the nearest enclosing loop.",
          continue: "Continue with the next iteration of the loop.",
          lambda: "Create an anonymous function.",
          global: "Declare a global variable inside a function.",
          nonlocal: "Declare a nonlocal variable in nested functions.",
          assert: "Verify a condition, raise AssertionError if false.",
          del: "Delete a name binding or item.",
          and: "Boolean AND operator.",
          or: "Boolean OR operator.",
          not: "Boolean NOT operator.",
          in: "Membership test operator.",
          is: "Identity test operator.",
          True: "Boolean true value.",
          False: "Boolean false value.",
          None: "The null object, represents absence of a value.",
          async: "Declare an asynchronous function or context.",
          await: "Await the result of a coroutine.",
        };
        return {
          range,
          contents: [
            { value: `**\`${name}\`** — Python keyword` },
            { value: keywordDocs[name] || "Python keyword." },
          ],
        };
      }

      // Builtins
      if (PYTHON_BUILTINS[name]) {
        const info = PYTHON_BUILTINS[name];
        return {
          range,
          contents: [
            { value: "```python\n" + info.signature + "\n```" },
            { value: info.doc },
            { value: "_Built-in function_" },
          ],
        };
      }

      // Modules
      if (PYTHON_MODULES[name]) {
        const mod = PYTHON_MODULES[name];
        return {
          range,
          contents: [
            { value: `**\`${name}\`** — Python module` },
            { value: mod.doc },
            {
              value:
                "Members: `" +
                mod.members.slice(0, 15).join("`, `") +
                (mod.members.length > 15 ? "`, ..." : "`"),
            },
          ],
        };
      }

      // User defined symbols
      const fullText = model.getValue();
      const userSymbols = parseUserSymbols(fullText);

      const fn = userSymbols.functions.find((f) => f.name === name);
      if (fn) {
        const contents = [
          { value: "```python\ndef " + fn.name + "(" + fn.params + ")\n```" },
        ];
        if (fn.docstring) contents.push({ value: fn.docstring });
        contents.push({ value: `_Defined at line ${fn.line}_` });
        return { range, contents };
      }

      const cls = userSymbols.classes.find((c) => c.name === name);
      if (cls) {
        return {
          range,
          contents: [
            {
              value:
                "```python\nclass " +
                cls.name +
                (cls.bases ? "(" + cls.bases + ")" : "") +
                "\n```",
            },
            { value: `_Defined at line ${cls.line}_` },
          ],
        };
      }

      // Dunder methods
      const dunders = {
        __init__: {
          sig: "__init__(self, ...)",
          doc: "Initialize the object. Called after the instance is created.",
        },
        __str__: {
          sig: "__str__(self)",
          doc: "Return the informal string representation. Called by str() and print().",
        },
        __repr__: {
          sig: "__repr__(self)",
          doc: "Return the official string representation. Called by repr().",
        },
        __len__: {
          sig: "__len__(self)",
          doc: "Return the length. Called by len().",
        },
        __getitem__: {
          sig: "__getitem__(self, key)",
          doc: "Called to implement self[key].",
        },
        __setitem__: {
          sig: "__setitem__(self, key, value)",
          doc: "Called to implement self[key] = value.",
        },
        __delitem__: {
          sig: "__delitem__(self, key)",
          doc: "Called to implement del self[key].",
        },
        __contains__: {
          sig: "__contains__(self, item)",
          doc: "Called to implement membership test (in operator).",
        },
        __iter__: {
          sig: "__iter__(self)",
          doc: "Return an iterator. Called by iter().",
        },
        __next__: {
          sig: "__next__(self)",
          doc: "Return the next item. Called by next().",
        },
        __call__: {
          sig: "__call__(self, ...)",
          doc: "Called when the instance is called as a function.",
        },
        __enter__: {
          sig: "__enter__(self)",
          doc: "Enter the runtime context (with statement).",
        },
        __exit__: {
          sig: "__exit__(self, exc_type, exc_val, exc_tb)",
          doc: "Exit the runtime context (with statement).",
        },
        __eq__: {
          sig: "__eq__(self, other)",
          doc: "Implement equality comparison (==).",
        },
        __ne__: {
          sig: "__ne__(self, other)",
          doc: "Implement inequality comparison (!=).",
        },
        __lt__: {
          sig: "__lt__(self, other)",
          doc: "Implement less-than comparison (<).",
        },
        __gt__: {
          sig: "__gt__(self, other)",
          doc: "Implement greater-than comparison (>).",
        },
        __le__: {
          sig: "__le__(self, other)",
          doc: "Implement less-than-or-equal comparison (<=).",
        },
        __ge__: {
          sig: "__ge__(self, other)",
          doc: "Implement greater-than-or-equal comparison (>=).",
        },
        __add__: {
          sig: "__add__(self, other)",
          doc: "Implement addition (+).",
        },
        __sub__: {
          sig: "__sub__(self, other)",
          doc: "Implement subtraction (-).",
        },
        __mul__: {
          sig: "__mul__(self, other)",
          doc: "Implement multiplication (*).",
        },
        __truediv__: {
          sig: "__truediv__(self, other)",
          doc: "Implement true division (/).",
        },
        __floordiv__: {
          sig: "__floordiv__(self, other)",
          doc: "Implement floor division (//).",
        },
        __mod__: { sig: "__mod__(self, other)", doc: "Implement modulo (%)." },
        __pow__: { sig: "__pow__(self, other)", doc: "Implement power (**)." },
        __hash__: {
          sig: "__hash__(self)",
          doc: "Return a hash integer. Called by hash().",
        },
        __bool__: {
          sig: "__bool__(self)",
          doc: "Called to implement truth value testing and bool().",
        },
        __name__: {
          sig: "__name__",
          doc: 'The name of the module. For the main module, this is "__main__".',
        },
      };

      if (dunders[name]) {
        return {
          range,
          contents: [
            { value: "```python\n" + dunders[name].sig + "\n```" },
            { value: dunders[name].doc },
            { value: "_Dunder (magic method)_" },
          ],
        };
      }

      return null;
    },
  };

  // ─── Definition Provider ──────────────────────────────────────────
  const definitionProvider: Monaco.languages.DefinitionProvider = {
    provideDefinition: function (model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return null;

      const name = word.word;
      const fullText = model.getValue();
      const userSymbols = parseUserSymbols(fullText);

      // Functions
      const fn = userSymbols.functions.find((f) => f.name === name);
      if (fn) {
        return {
          uri: model.uri,
          range: {
            startLineNumber: fn.line,
            startColumn: fn.col + 1,
            endLineNumber: fn.line,
            endColumn: fn.col + 1 + name.length + 4,
          },
        };
      }

      // Classes
      const cls = userSymbols.classes.find((c) => c.name === name);
      if (cls) {
        return {
          uri: model.uri,
          range: {
            startLineNumber: cls.line,
            startColumn: cls.col + 1,
            endLineNumber: cls.line,
            endColumn: cls.col + 1 + name.length + 6,
          },
        };
      }

      // Variables
      const v = userSymbols.variables.find((v) => v.name === name);
      if (v) {
        return {
          uri: model.uri,
          range: {
            startLineNumber: v.line,
            startColumn: 1,
            endLineNumber: v.line,
            endColumn: 1 + name.length,
          },
        };
      }

      // Imports
      const imp = userSymbols.imports.find((i) => i.name === name);
      if (imp) {
        return {
          uri: model.uri,
          range: {
            startLineNumber: imp.line,
            startColumn: 1,
            endLineNumber: imp.line,
            endColumn: model.getLineContent(imp.line).length + 1,
          },
        };
      }

      return null;
    },
  };

  // ─── Document Symbol Provider (Outline) ───────────────────────────
  const documentSymbolProvider: Monaco.languages.DocumentSymbolProvider = {
    provideDocumentSymbols: function (model) {
      const fullText = model.getValue();
      const userSymbols = parseUserSymbols(fullText);
      const symbols = [];
      const SK = monaco.languages.SymbolKind;

      userSymbols.classes.forEach((cls) => {
        symbols.push({
          name: cls.name,
          kind: SK.Class,
          range: {
            startLineNumber: cls.line,
            startColumn: 1,
            endLineNumber: cls.line,
            endColumn: model.getLineContent(cls.line).length + 1,
          },
          selectionRange: {
            startLineNumber: cls.line,
            startColumn: cls.col + 7,
            endLineNumber: cls.line,
            endColumn: cls.col + 7 + cls.name.length,
          },
        });
      });

      userSymbols.functions.forEach((fn) => {
        symbols.push({
          name: fn.name,
          kind: SK.Function,
          range: {
            startLineNumber: fn.line,
            startColumn: 1,
            endLineNumber: fn.line,
            endColumn: model.getLineContent(fn.line).length + 1,
          },
          selectionRange: {
            startLineNumber: fn.line,
            startColumn: fn.col + 5,
            endLineNumber: fn.line,
            endColumn: fn.col + 5 + fn.name.length,
          },
        });
      });

      return symbols;
    },
  };

  // ─── Document Formatting (basic indent fixer) ─────────────────────
  const documentFormattingProvider: Monaco.languages.DocumentFormattingEditProvider =
    {
      provideDocumentFormattingEdits: function (model) {
        const text = model.getValue();
        const lines = text.split("\n");
        const edits = [];

        for (let i = 0; i < lines.length; i++) {
          // Remove trailing whitespace
          const trimmed = lines[i].replace(/\s+$/, "");
          if (trimmed !== lines[i]) {
            edits.push({
              range: {
                startLineNumber: i + 1,
                startColumn: 1,
                endLineNumber: i + 1,
                endColumn: lines[i].length + 1,
              },
              text: trimmed,
            });
          }
        }
        return edits;
      },
    };

  // ─── Folding Range Provider ───────────────────────────────────────
  const foldingRangeProvider: Monaco.languages.FoldingRangeProvider = {
    provideFoldingRanges: function (model) {
      const lines = model.getLinesContent();
      const ranges = [];

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trimStart();

        // Fold on def, class, if, for, while, try, with
        if (
          /^(def |class |if |elif |else:|for |while |try:|except |finally:|with |async def |async for |async with )/.test(
            trimmed,
          ) &&
          trimmed.endsWith(":")
        ) {
          const startIndent = line.length - line.trimStart().length;
          let end = i + 1;
          while (end < lines.length) {
            const nextLine = lines[end];
            if (nextLine.trim() === "") {
              end++;
              continue;
            }
            const nextIndent = nextLine.length - nextLine.trimStart().length;
            if (nextIndent <= startIndent) break;
            end++;
          }
          if (end > i + 1) {
            ranges.push({
              start: i + 1,
              end: end,
              kind: monaco.languages.FoldingRangeKind.Region,
            });
          }
        }

        // Fold on multi-line strings
        if (trimmed.includes('"""') || trimmed.includes("'''")) {
          const quote = trimmed.includes('"""') ? '"""' : "'''";
          const firstIdx = line.indexOf(quote);
          const secondIdx = line.indexOf(quote, firstIdx + 3);
          if (secondIdx === -1) {
            // Find closing
            for (let j = i + 1; j < lines.length; j++) {
              if (lines[j].includes(quote)) {
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

        // Fold on comments blocks
        if (trimmed.startsWith("#")) {
          let end = i + 1;
          while (end < lines.length && lines[end].trimStart().startsWith("#"))
            end++;
          if (end > i + 2) {
            ranges.push({
              start: i + 1,
              end: end,
              kind: monaco.languages.FoldingRangeKind.Comment,
            });
          }
        }
      }

      return ranges;
    },
  };

  // ─── Rename Provider ──────────────────────────────────────────────
  const renameProvider: Monaco.languages.RenameProvider = {
    provideRenameEdits: function (model, position, newName) {
      const word = model.getWordAtPosition(position);
      if (!word) return null;

      const oldName = word.word;
      if (PYTHON_KEYWORDS.includes(oldName) || PYTHON_BUILTINS[oldName])
        return null;

      const fullText = model.getValue();
      const edits = [];
      const regex = new RegExp(
        "\\b" + oldName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b",
        "g",
      );
      const lines = fullText.split("\n");

      for (let i = 0; i < lines.length; i++) {
        let match;
        while ((match = regex.exec(lines[i])) !== null) {
          edits.push({
            resource: model.uri,
            versionId: model.getVersionId(),
            textEdit: {
              range: {
                startLineNumber: i + 1,
                startColumn: match.index + 1,
                endLineNumber: i + 1,
                endColumn: match.index + 1 + oldName.length,
              },
              text: newName,
            },
          });
        }
      }

      return { edits };
    },
    resolveRenameLocation: function (model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return { rejectReason: "No symbol at this position." };
      if (PYTHON_KEYWORDS.includes(word.word))
        return { rejectReason: "Cannot rename a keyword." };
      return {
        range: {
          startLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endLineNumber: position.lineNumber,
          endColumn: word.endColumn,
        },
        text: word.word,
      };
    },
  };

  // ─── Reference Provider ───────────────────────────────────────────
  const referenceProvider: Monaco.languages.ReferenceProvider = {
    provideReferences: function (model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return [];

      const name = word.word;
      const fullText = model.getValue();
      const lines = fullText.split("\n");
      const refs = [];
      const regex = new RegExp(
        "\\b" + name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b",
        "g",
      );

      for (let i = 0; i < lines.length; i++) {
        let match;
        while ((match = regex.exec(lines[i])) !== null) {
          refs.push({
            uri: model.uri,
            range: {
              startLineNumber: i + 1,
              startColumn: match.index + 1,
              endLineNumber: i + 1,
              endColumn: match.index + 1 + name.length,
            },
          });
        }
      }

      return refs;
    },
  };

  // ─── Code Action Provider (Quick Fixes) ───────────────────────────
  const codeActionProvider: Monaco.languages.CodeActionProvider = {
    provideCodeActions: function (model, range, context) {
      const actions = [];
      const line = model.getLineContent(range.startLineNumber);

      // Suggest adding type hints
      const defMatch = line.match(/def\s+(\w+)\s*\(([^)]*)\)\s*:/);
      if (defMatch && !line.includes("->")) {
        actions.push({
          title: "Add return type hint -> None",
          kind: "quickfix",
          edit: {
            edits: [
              {
                resource: model.uri,
                versionId: model.getVersionId(),
                textEdit: {
                  range: {
                    startLineNumber: range.startLineNumber,
                    startColumn: line.lastIndexOf(":") + 1,
                    endLineNumber: range.startLineNumber,
                    endColumn: line.lastIndexOf(":") + 1,
                  },
                  text: " -> None",
                },
              },
            ],
          },
        });
      }

      // Suggest wrapping in try/except
      if (
        line.trim() &&
        !line.trim().startsWith("#") &&
        !line.trim().startsWith("def") &&
        !line.trim().startsWith("class")
      ) {
        const indent = line.match(/^(\s*)/)[1];
        actions.push({
          title: "Wrap in try/except",
          kind: "refactor",
          edit: {
            edits: [
              {
                resource: model.uri,
                versionId: model.getVersionId(),
                textEdit: {
                  range: {
                    startLineNumber: range.startLineNumber,
                    startColumn: 1,
                    endLineNumber: range.endLineNumber,
                    endColumn:
                      model.getLineContent(range.endLineNumber).length + 1,
                  },
                  text:
                    indent +
                    "try:\n" +
                    indent +
                    "    " +
                    line.trim() +
                    "\n" +
                    indent +
                    "except Exception as e:\n" +
                    indent +
                    "    pass",
                },
              },
            ],
          },
        });
      }

      return { actions, dispose: () => {} };
    },
  };

  // ─── Bracket Auto-closing & Auto-indent ───────────────────────────
  const config: Monaco.languages.LanguageConfiguration = {
    comments: {
      lineComment: "#",
      blockComment: ['"""', '"""'],
    },
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
      { open: '"""', close: '"""' },
      { open: "'''", close: "'''" },
    ],
    surroundingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: '"', close: '"' },
      { open: "'", close: "'" },
    ],
    onEnterRules: [
      {
        beforeText: /:\s*$/,
        action: { indentAction: monaco.languages.IndentAction.Indent },
      },
      {
        beforeText: /^\s*(return|pass|break|continue|raise)\b/,
        afterText: /^$/,
        action: { indentAction: monaco.languages.IndentAction.Outdent },
      },
    ],
    indentationRules: {
      increaseIndentPattern: /^.*:\s*$/,
      decreaseIndentPattern: /^\s*(elif|else|except|finally)\b/,
    },
    wordPattern:
      /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
  };

  // ─── Register Language Features ────────────────────────────────────────────
  monaco.languages.setLanguageConfiguration("python", config);
  monaco.languages.registerCompletionItemProvider("python", completions);
  monaco.languages.registerHoverProvider("python", hoverProvider);
  monaco.languages.registerDefinitionProvider("python", definitionProvider);
  monaco.languages.registerRenameProvider("python", renameProvider);
  monaco.languages.registerDocumentSymbolProvider(
    "python",
    documentSymbolProvider,
  );
  monaco.languages.registerDocumentFormattingEditProvider(
    "python",
    documentFormattingProvider,
  );
  monaco.languages.registerReferenceProvider("python", referenceProvider);
  monaco.languages.registerCodeActionProvider("python", codeActionProvider);
  monaco.languages.registerSignatureHelpProvider(
    "python",
    signatureHelpProvider,
  );
  monaco.languages.registerFoldingRangeProvider("python", foldingRangeProvider);
};
