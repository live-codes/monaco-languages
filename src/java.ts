import type * as Monaco from "monaco-editor";

export default (monaco: typeof Monaco) => {
  /* ───────────────────────────────────────────
     1.  REGISTER LANGUAGE
     ─────────────────────────────────────────── */
  monaco.languages.register({ id: "java" });

  /* ───────────────────────────────────────────
     2.  MONARCH SYNTAX HIGHLIGHTING
     ─────────────────────────────────────────── */
  monaco.languages.setMonarchTokensProvider("java", {
    defaultToken: "",
    tokenPostfix: ".java",

    keywords: [
      "abstract",
      "assert",
      "boolean",
      "break",
      "byte",
      "case",
      "catch",
      "char",
      "class",
      "const",
      "continue",
      "default",
      "do",
      "double",
      "else",
      "enum",
      "extends",
      "final",
      "finally",
      "float",
      "for",
      "goto",
      "if",
      "implements",
      "import",
      "instanceof",
      "int",
      "interface",
      "long",
      "native",
      "new",
      "package",
      "private",
      "protected",
      "public",
      "return",
      "short",
      "static",
      "strictfp",
      "super",
      "switch",
      "synchronized",
      "this",
      "throw",
      "throws",
      "transient",
      "try",
      "void",
      "volatile",
      "while",
      "yield",
      "var",
      "record",
      "sealed",
      "non-sealed",
      "permits",
      "module",
      "requires",
      "exports",
      "opens",
      "uses",
      "provides",
      "with",
      "open",
      "to",
      "transitive",
    ],
    literals: ["true", "false", "null"],
    typeKeywords: [
      "boolean",
      "byte",
      "char",
      "double",
      "float",
      "int",
      "long",
      "short",
      "void",
      "String",
      "Integer",
      "Double",
      "Float",
      "Long",
      "Short",
      "Byte",
      "Character",
      "Boolean",
      "Object",
      "List",
      "Map",
      "Set",
      "ArrayList",
      "HashMap",
      "HashSet",
      "LinkedList",
      "TreeMap",
      "TreeSet",
      "Queue",
      "Deque",
      "Stack",
      "Vector",
      "Optional",
      "Stream",
      "Comparable",
      "Iterable",
      "Iterator",
      "Collection",
      "Collections",
      "Arrays",
      "Math",
      "System",
      "Thread",
      "Runnable",
      "Callable",
      "Future",
      "CompletableFuture",
      "Exception",
      "RuntimeException",
      "IOException",
      "NullPointerException",
      "StringBuilder",
      "StringBuffer",
    ],
    annotations: [
      "Override",
      "Deprecated",
      "SuppressWarnings",
      "FunctionalInterface",
      "SafeVarargs",
      "Nullable",
      "NonNull",
      "NotNull",
    ],
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
      "!=",
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
      "<<",
      ">>",
      ">>>",
      "+=",
      "-=",
      "*=",
      "/=",
      "&=",
      "|=",
      "^=",
      "%=",
      "<<=",
      ">>=",
      ">>>=",
    ],
    symbols: /[=><!~?:&|+\-*\/\^%]+/,
    escapes:
      /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
    digits: /\d+(_+\d+)*/,
    octaldigits: /[0-7]+(_+[0-7]+)*/,
    binarydigits: /[0-1]+(_+[0-1]+)*/,
    hexdigits: /[[0-9a-fA-F]+(_+[0-9a-fA-F]+)*/,

    tokenizer: {
      root: [
        // annotations
        [
          /@[a-zA-Z_$][\w$]*/,
          {
            cases: { "@annotations": "annotation", "@default": "annotation" },
          },
        ],

        // identifiers and keywords
        [
          /[a-zA-Z_$][\w$]*/,
          {
            cases: {
              "@typeKeywords": "type.identifier",
              "@keywords": "keyword",
              "@literals": "keyword.literal",
              "@default": "identifier",
            },
          },
        ],

        // whitespace
        { include: "@whitespace" },

        // delimiters and operators
        [/[{}()\[\]]/, "@brackets"],
        [/[<>](?!@symbols)/, "@brackets"],
        [/@symbols/, { cases: { "@operators": "operator", "@default": "" } }],

        // numbers
        [/(@digits)[eE]([\-+]?(@digits))?[fFdD]?/, "number.float"],
        [/(@digits)\.(@digits)([eE][\-+]?(@digits))?[fFdD]?/, "number.float"],
        [/0[xX](@hexdigits)[Ll]?/, "number.hex"],
        [/0[oO]?(@octaldigits)[Ll]?/, "number.octal"],
        [/0[bB](@binarydigits)[Ll]?/, "number.binary"],
        [/(@digits)[fFdD]/, "number.float"],
        [/(@digits)[lL]?/, "number"],

        // delimiter
        [/[;,.]/, "delimiter"],

        // strings
        [/"([^"\\]|\\.)*$/, "string.invalid"],
        [/"""/, "string", "@multilinestring"],
        [/"/, "string", "@string"],

        // characters
        [/'[^\\']'/, "string"],
        [/(')(@escapes)(')/, ["string", "string.escape", "string"]],
        [/'/, "string.invalid"],
      ],

      whitespace: [
        [/[ \t\r\n]+/, ""],
        [/\/\*\*(?!\/)/, "comment.doc", "@javadoc"],
        [/\/\*/, "comment", "@comment"],
        [/\/\/.*$/, "comment"],
      ],

      comment: [
        [/[^\/*]+/, "comment"],
        [/\*\//, "comment", "@pop"],
        [/[\/*]/, "comment"],
      ],

      javadoc: [
        [/[^\/*]+/, "comment.doc"],
        [/@\w+/, "comment.doc.tag"],
        [/\*\//, "comment.doc", "@pop"],
        [/[\/*]/, "comment.doc"],
      ],

      string: [
        [/[^\\"]+/, "string"],
        [/@escapes/, "string.escape"],
        [/\\./, "string.escape.invalid"],
        [/"/, "string", "@pop"],
      ],

      multilinestring: [
        [/[^\\"]+/, "string"],
        [/@escapes/, "string.escape"],
        [/\\./, "string.escape.invalid"],
        [/"""/, "string", "@pop"],
        [/"/, "string"],
      ],
    },
  });

  /* ───────────────────────────────────────────
     3.  LANGUAGE CONFIGURATION (brackets etc.)
     ─────────────────────────────────────────── */
  monaco.languages.setLanguageConfiguration("java", {
    comments: { lineComment: "//", blockComment: ["/*", "*/"] },
    brackets: [
      ["{", "}"],
      ["[", "]"],
      ["(", ")"],
      ["<", ">"],
    ],
    autoClosingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: '"', close: '"', notIn: ["string"] },
      { open: "'", close: "'", notIn: ["string", "comment"] },
      { open: "<", close: ">", notIn: ["string"] },
    ],
    surroundingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: '"', close: '"' },
      { open: "'", close: "'" },
      { open: "<", close: ">" },
    ],
    folding: {
      markers: {
        start: /^\s*\/\/\s*#?region\b/,
        end: /^\s*\/\/\s*#?endregion\b/,
      },
    },
    indentationRules: {
      increaseIndentPattern:
        /^((?!.*?\/\*).*\*\/)?\s*[\}]\s*$|^((?!.*?\/\*).*\*\/)?\s*[\}]\s*\).*$|^\s*(case|default)\b.*:|\{[^}"']*$/,
      decreaseIndentPattern: /^\s*(case|default)\b.*:|^\s*[\}]|^\s*[\}]\s*[\)]/,
    },
  });

  /* ───────────────────────────────────────────
     4.  JAVA STANDARD LIBRARY KNOWLEDGE BASE
     ─────────────────────────────────────────── */
  const javaClasses = {
    System: {
      desc: "`public final class System` — The System class contains several useful class fields and methods.",
      fields: {
        out: { type: "PrintStream", desc: 'The "standard" output stream.' },
        err: {
          type: "PrintStream",
          desc: 'The "standard" error output stream.',
        },
        in: { type: "InputStream", desc: 'The "standard" input stream.' },
      },
      methods: {
        exit: {
          sig: "void exit(int status)",
          desc: "Terminates the currently running JVM.",
        },
        currentTimeMillis: {
          sig: "long currentTimeMillis()",
          desc: "Returns the current time in milliseconds.",
        },
        nanoTime: {
          sig: "long nanoTime()",
          desc: "Returns the current value of the running JVM high-resolution time source, in nanoseconds.",
        },
        gc: { sig: "void gc()", desc: "Runs the garbage collector." },
        arraycopy: {
          sig: "void arraycopy(Object src, int srcPos, Object dest, int destPos, int length)",
          desc: "Copies an array from the specified source array.",
        },
        getenv: {
          sig: "String getenv(String name)",
          desc: "Gets the value of the specified environment variable.",
        },
        getProperty: {
          sig: "String getProperty(String key)",
          desc: "Gets the system property indicated by the specified key.",
        },
        lineSeparator: {
          sig: "String lineSeparator()",
          desc: "Returns the system-dependent line separator string.",
        },
      },
    },
    String: {
      desc: "`public final class String implements Serializable, Comparable<String>, CharSequence` — Represents character strings.",
      methods: {
        length: {
          sig: "int length()",
          desc: "Returns the length of this string.",
        },
        charAt: {
          sig: "char charAt(int index)",
          desc: "Returns the char value at the specified index.",
        },
        substring: {
          sig: "String substring(int beginIndex, int endIndex)",
          desc: "Returns a substring.",
        },
        indexOf: {
          sig: "int indexOf(String str)",
          desc: "Returns the index within this string of the first occurrence of the specified substring.",
        },
        lastIndexOf: {
          sig: "int lastIndexOf(String str)",
          desc: "Returns the index within this string of the last occurrence.",
        },
        contains: {
          sig: "boolean contains(CharSequence s)",
          desc: "Returns true if this string contains the specified sequence of char values.",
        },
        startsWith: {
          sig: "boolean startsWith(String prefix)",
          desc: "Tests if this string starts with the specified prefix.",
        },
        endsWith: {
          sig: "boolean endsWith(String suffix)",
          desc: "Tests if this string ends with the specified suffix.",
        },
        equals: {
          sig: "boolean equals(Object anObject)",
          desc: "Compares this string to the specified object.",
        },
        equalsIgnoreCase: {
          sig: "boolean equalsIgnoreCase(String anotherString)",
          desc: "Compares this String to another String, ignoring case.",
        },
        compareTo: {
          sig: "int compareTo(String anotherString)",
          desc: "Compares two strings lexicographically.",
        },
        toLowerCase: {
          sig: "String toLowerCase()",
          desc: "Converts all characters to lower case.",
        },
        toUpperCase: {
          sig: "String toUpperCase()",
          desc: "Converts all characters to upper case.",
        },
        trim: {
          sig: "String trim()",
          desc: "Returns a string whose value is this string with leading and trailing whitespace removed.",
        },
        strip: {
          sig: "String strip()",
          desc: "Returns a string whose value is this string with all leading and trailing white space removed.",
        },
        replace: {
          sig: "String replace(CharSequence target, CharSequence replacement)",
          desc: "Replaces each substring.",
        },
        replaceAll: {
          sig: "String replaceAll(String regex, String replacement)",
          desc: "Replaces each substring matching the given regex.",
        },
        split: {
          sig: "String[] split(String regex)",
          desc: "Splits this string around matches of the given regex.",
        },
        join: {
          sig: "static String join(CharSequence delimiter, CharSequence... elements)",
          desc: "Returns a new String composed of elements joined together.",
        },
        format: {
          sig: "static String format(String format, Object... args)",
          desc: "Returns a formatted string.",
        },
        valueOf: {
          sig: "static String valueOf(Object obj)",
          desc: "Returns the string representation of the Object argument.",
        },
        toCharArray: {
          sig: "char[] toCharArray()",
          desc: "Converts this string to a new character array.",
        },
        isEmpty: {
          sig: "boolean isEmpty()",
          desc: "Returns true if length() is 0.",
        },
        isBlank: {
          sig: "boolean isBlank()",
          desc: "Returns true if the string is empty or contains only white space.",
        },
        matches: {
          sig: "boolean matches(String regex)",
          desc: "Tells whether this string matches the given regular expression.",
        },
        repeat: {
          sig: "String repeat(int count)",
          desc: "Returns a string whose value is the concatenation of this string repeated count times.",
        },
        chars: {
          sig: "IntStream chars()",
          desc: "Returns an IntStream of char values from this sequence.",
        },
        formatted: {
          sig: "String formatted(Object... args)",
          desc: "Formats using this string as the format string.",
        },
      },
    },
    Math: {
      desc: "`public final class Math` — Contains methods for performing basic numeric operations.",
      fields: {
        PI: {
          type: "double",
          desc: "The double value that is closer than any other to pi (π).",
        },
        E: {
          type: "double",
          desc: "The double value that is closer than any other to e, the base of the natural logarithms.",
        },
      },
      methods: {
        abs: {
          sig: "static int abs(int a)",
          desc: "Returns the absolute value.",
        },
        max: {
          sig: "static int max(int a, int b)",
          desc: "Returns the greater of two values.",
        },
        min: {
          sig: "static int min(int a, int b)",
          desc: "Returns the smaller of two values.",
        },
        pow: {
          sig: "static double pow(double a, double b)",
          desc: "Returns the value of a raised to the power of b.",
        },
        sqrt: {
          sig: "static double sqrt(double a)",
          desc: "Returns the correctly rounded positive square root.",
        },
        cbrt: {
          sig: "static double cbrt(double a)",
          desc: "Returns the cube root.",
        },
        random: {
          sig: "static double random()",
          desc: "Returns a double value with a positive sign, >= 0.0 and < 1.0.",
        },
        round: {
          sig: "static long round(double a)",
          desc: "Returns the closest long to the argument.",
        },
        ceil: {
          sig: "static double ceil(double a)",
          desc: "Returns the smallest double >= argument that is a mathematical integer.",
        },
        floor: {
          sig: "static double floor(double a)",
          desc: "Returns the largest double <= argument that is a mathematical integer.",
        },
        log: {
          sig: "static double log(double a)",
          desc: "Returns the natural logarithm (base e).",
        },
        log10: {
          sig: "static double log10(double a)",
          desc: "Returns the base 10 logarithm.",
        },
        sin: {
          sig: "static double sin(double a)",
          desc: "Returns the trigonometric sine of an angle.",
        },
        cos: {
          sig: "static double cos(double a)",
          desc: "Returns the trigonometric cosine of an angle.",
        },
        tan: {
          sig: "static double tan(double a)",
          desc: "Returns the trigonometric tangent of an angle.",
        },
        toRadians: {
          sig: "static double toRadians(double angdeg)",
          desc: "Converts an angle in degrees to radians.",
        },
        toDegrees: {
          sig: "static double toDegrees(double angrad)",
          desc: "Converts an angle in radians to degrees.",
        },
      },
    },
    ArrayList: {
      desc: "`public class ArrayList<E> extends AbstractList<E> implements List<E>` — Resizable-array implementation of the List interface.",
      methods: {
        add: {
          sig: "boolean add(E e)",
          desc: "Appends the specified element to the end of this list.",
        },
        get: {
          sig: "E get(int index)",
          desc: "Returns the element at the specified position.",
        },
        set: {
          sig: "E set(int index, E element)",
          desc: "Replaces the element at the specified position.",
        },
        remove: {
          sig: "E remove(int index)",
          desc: "Removes the element at the specified position.",
        },
        size: {
          sig: "int size()",
          desc: "Returns the number of elements in this list.",
        },
        isEmpty: {
          sig: "boolean isEmpty()",
          desc: "Returns true if this list contains no elements.",
        },
        contains: {
          sig: "boolean contains(Object o)",
          desc: "Returns true if this list contains the specified element.",
        },
        indexOf: {
          sig: "int indexOf(Object o)",
          desc: "Returns the index of the first occurrence.",
        },
        clear: {
          sig: "void clear()",
          desc: "Removes all of the elements from this list.",
        },
        toArray: {
          sig: "Object[] toArray()",
          desc: "Returns an array containing all of the elements.",
        },
        addAll: {
          sig: "boolean addAll(Collection<? extends E> c)",
          desc: "Appends all of the elements in the specified collection.",
        },
        sort: {
          sig: "void sort(Comparator<? super E> c)",
          desc: "Sorts this list according to the order induced by the specified Comparator.",
        },
        forEach: {
          sig: "void forEach(Consumer<? super E> action)",
          desc: "Performs the given action for each element.",
        },
        stream: {
          sig: "Stream<E> stream()",
          desc: "Returns a sequential Stream with this collection as its source.",
        },
        iterator: {
          sig: "Iterator<E> iterator()",
          desc: "Returns an iterator over the elements in this list.",
        },
        subList: {
          sig: "List<E> subList(int fromIndex, int toIndex)",
          desc: "Returns a view of the portion of this list.",
        },
      },
    },
    HashMap: {
      desc: "`public class HashMap<K,V> extends AbstractMap<K,V> implements Map<K,V>` — Hash table based implementation of the Map interface.",
      methods: {
        put: {
          sig: "V put(K key, V value)",
          desc: "Associates the specified value with the specified key.",
        },
        get: {
          sig: "V get(Object key)",
          desc: "Returns the value to which the specified key is mapped.",
        },
        getOrDefault: {
          sig: "V getOrDefault(Object key, V defaultValue)",
          desc: "Returns the value or a default value.",
        },
        remove: {
          sig: "V remove(Object key)",
          desc: "Removes the mapping for the specified key.",
        },
        containsKey: {
          sig: "boolean containsKey(Object key)",
          desc: "Returns true if this map contains a mapping for the specified key.",
        },
        containsValue: {
          sig: "boolean containsValue(Object value)",
          desc: "Returns true if this map maps one or more keys to the specified value.",
        },
        size: {
          sig: "int size()",
          desc: "Returns the number of key-value mappings.",
        },
        isEmpty: {
          sig: "boolean isEmpty()",
          desc: "Returns true if this map contains no key-value mappings.",
        },
        keySet: {
          sig: "Set<K> keySet()",
          desc: "Returns a Set view of the keys.",
        },
        values: {
          sig: "Collection<V> values()",
          desc: "Returns a Collection view of the values.",
        },
        entrySet: {
          sig: "Set<Map.Entry<K,V>> entrySet()",
          desc: "Returns a Set view of the mappings.",
        },
        putIfAbsent: {
          sig: "V putIfAbsent(K key, V value)",
          desc: "If the key is not already associated with a value, associates it.",
        },
        forEach: {
          sig: "void forEach(BiConsumer<? super K, ? super V> action)",
          desc: "Performs the given action for each entry.",
        },
        clear: { sig: "void clear()", desc: "Removes all of the mappings." },
        merge: {
          sig: "V merge(K key, V value, BiFunction<? super V, ? super V, ? extends V> remappingFunction)",
          desc: "Merges the value.",
        },
        computeIfAbsent: {
          sig: "V computeIfAbsent(K key, Function<? super K, ? extends V> mappingFunction)",
          desc: "Computes a value if absent.",
        },
      },
    },
    Optional: {
      desc: "`public final class Optional<T>` — A container object which may or may not contain a non-null value.",
      methods: {
        of: {
          sig: "static <T> Optional<T> of(T value)",
          desc: "Returns an Optional describing the given non-null value.",
        },
        ofNullable: {
          sig: "static <T> Optional<T> ofNullable(T value)",
          desc: "Returns an Optional describing the given value, or empty if null.",
        },
        empty: {
          sig: "static <T> Optional<T> empty()",
          desc: "Returns an empty Optional instance.",
        },
        isPresent: {
          sig: "boolean isPresent()",
          desc: "Returns true if a value is present.",
        },
        isEmpty: {
          sig: "boolean isEmpty()",
          desc: "Returns true if a value is not present.",
        },
        get: {
          sig: "T get()",
          desc: "Returns the value if present, otherwise throws NoSuchElementException.",
        },
        orElse: {
          sig: "T orElse(T other)",
          desc: "Returns the value if present, otherwise returns other.",
        },
        orElseGet: {
          sig: "T orElseGet(Supplier<? extends T> supplier)",
          desc: "Returns the value if present, otherwise invokes supplier.",
        },
        orElseThrow: {
          sig: "<X extends Throwable> T orElseThrow(Supplier<? extends X> exceptionSupplier)",
          desc: "Returns the value if present, otherwise throws an exception.",
        },
        map: {
          sig: "<U> Optional<U> map(Function<? super T, ? extends U> mapper)",
          desc: "If a value is present, returns an Optional of the result of applying the mapping function.",
        },
        flatMap: {
          sig: "<U> Optional<U> flatMap(Function<? super T, ? extends Optional<? extends U>> mapper)",
          desc: "Similar to map but the mapper returns an Optional.",
        },
        filter: {
          sig: "Optional<T> filter(Predicate<? super T> predicate)",
          desc: "If a value is present and matches the predicate, returns this Optional.",
        },
        ifPresent: {
          sig: "void ifPresent(Consumer<? super T> action)",
          desc: "If a value is present, performs the given action.",
        },
        stream: {
          sig: "Stream<T> stream()",
          desc: "Returns a sequential Stream containing only that value if present.",
        },
      },
    },
    Arrays: {
      desc: "`public class Arrays` — Contains various static methods for manipulating arrays.",
      methods: {
        sort: {
          sig: "static void sort(int[] a)",
          desc: "Sorts the specified array into ascending numerical order.",
        },
        binarySearch: {
          sig: "static int binarySearch(int[] a, int key)",
          desc: "Searches the array for the specified value using binary search.",
        },
        fill: {
          sig: "static void fill(int[] a, int val)",
          desc: "Assigns the specified value to each element.",
        },
        copyOf: {
          sig: "static int[] copyOf(int[] original, int newLength)",
          desc: "Copies the specified array, truncating or padding.",
        },
        copyOfRange: {
          sig: "static int[] copyOfRange(int[] original, int from, int to)",
          desc: "Copies the specified range of the array.",
        },
        equals: {
          sig: "static boolean equals(int[] a, int[] a2)",
          desc: "Returns true if the two arrays are equal.",
        },
        deepEquals: {
          sig: "static boolean deepEquals(Object[] a1, Object[] a2)",
          desc: "Returns true if the two arrays are deeply equal.",
        },
        toString: {
          sig: "static String toString(int[] a)",
          desc: "Returns a string representation of the contents.",
        },
        deepToString: {
          sig: "static String deepToString(Object[] a)",
          desc: "Returns a string representation of the deep contents.",
        },
        asList: {
          sig: "static <T> List<T> asList(T... a)",
          desc: "Returns a fixed-size list backed by the specified array.",
        },
        stream: {
          sig: "static IntStream stream(int[] array)",
          desc: "Returns a sequential IntStream with the specified array as its source.",
        },
      },
    },
    Collections: {
      desc: "`public class Collections` — Consists exclusively of static methods that operate on or return collections.",
      methods: {
        sort: {
          sig: "static <T extends Comparable<? super T>> void sort(List<T> list)",
          desc: "Sorts the specified list into ascending natural order.",
        },
        reverse: {
          sig: "static void reverse(List<?> list)",
          desc: "Reverses the order of the elements.",
        },
        shuffle: {
          sig: "static void shuffle(List<?> list)",
          desc: "Randomly permutes the list.",
        },
        min: {
          sig: "static <T extends Object & Comparable<? super T>> T min(Collection<? extends T> coll)",
          desc: "Returns the minimum element.",
        },
        max: {
          sig: "static <T extends Object & Comparable<? super T>> T max(Collection<? extends T> coll)",
          desc: "Returns the maximum element.",
        },
        frequency: {
          sig: "static int frequency(Collection<?> c, Object o)",
          desc: "Returns the number of elements equal to the specified object.",
        },
        unmodifiableList: {
          sig: "static <T> List<T> unmodifiableList(List<? extends T> list)",
          desc: "Returns an unmodifiable view.",
        },
        singletonList: {
          sig: "static <T> List<T> singletonList(T o)",
          desc: "Returns an immutable list containing only the specified object.",
        },
        emptyList: {
          sig: "static <T> List<T> emptyList()",
          desc: "Returns an empty list (immutable).",
        },
        emptyMap: {
          sig: "static <K,V> Map<K,V> emptyMap()",
          desc: "Returns an empty map (immutable).",
        },
        emptySet: {
          sig: "static <T> Set<T> emptySet()",
          desc: "Returns an empty set (immutable).",
        },
        synchronizedList: {
          sig: "static <T> List<T> synchronizedList(List<T> list)",
          desc: "Returns a synchronized (thread-safe) list.",
        },
      },
    },
    Thread: {
      desc: "`public class Thread implements Runnable` — A thread is a thread of execution in a program.",
      methods: {
        start: {
          sig: "void start()",
          desc: "Causes this thread to begin execution.",
        },
        run: {
          sig: "void run()",
          desc: "If this thread was constructed using a separate Runnable, then that Runnable object's run method is called.",
        },
        sleep: {
          sig: "static void sleep(long millis) throws InterruptedException",
          desc: "Causes the currently executing thread to sleep.",
        },
        join: {
          sig: "void join() throws InterruptedException",
          desc: "Waits for this thread to die.",
        },
        interrupt: { sig: "void interrupt()", desc: "Interrupts this thread." },
        isAlive: {
          sig: "boolean isAlive()",
          desc: "Tests if this thread is alive.",
        },
        getName: {
          sig: "String getName()",
          desc: "Returns this thread's name.",
        },
        setName: {
          sig: "void setName(String name)",
          desc: "Changes the name of this thread.",
        },
        currentThread: {
          sig: "static Thread currentThread()",
          desc: "Returns a reference to the currently executing thread object.",
        },
        yield: {
          sig: "static void yield()",
          desc: "A hint to the scheduler that the current thread is willing to yield.",
        },
        setPriority: {
          sig: "void setPriority(int newPriority)",
          desc: "Changes the priority of this thread.",
        },
        setDaemon: {
          sig: "void setDaemon(boolean on)",
          desc: "Marks this thread as either a daemon thread or a user thread.",
        },
      },
    },
    Stream: {
      desc: "`public interface Stream<T>` — A sequence of elements supporting sequential and parallel aggregate operations.",
      methods: {
        filter: {
          sig: "Stream<T> filter(Predicate<? super T> predicate)",
          desc: "Returns a stream of elements matching the given predicate.",
        },
        map: {
          sig: "<R> Stream<R> map(Function<? super T, ? extends R> mapper)",
          desc: "Returns a stream of results of applying the given function.",
        },
        flatMap: {
          sig: "<R> Stream<R> flatMap(Function<? super T, ? extends Stream<? extends R>> mapper)",
          desc: "Returns a flattened stream.",
        },
        forEach: {
          sig: "void forEach(Consumer<? super T> action)",
          desc: "Performs an action for each element.",
        },
        collect: {
          sig: "<R, A> R collect(Collector<? super T, A, R> collector)",
          desc: "Performs a mutable reduction operation.",
        },
        reduce: {
          sig: "Optional<T> reduce(BinaryOperator<T> accumulator)",
          desc: "Performs a reduction on the elements.",
        },
        count: { sig: "long count()", desc: "Returns the count of elements." },
        sorted: {
          sig: "Stream<T> sorted()",
          desc: "Returns a stream with elements sorted in natural order.",
        },
        distinct: {
          sig: "Stream<T> distinct()",
          desc: "Returns a stream with distinct elements.",
        },
        limit: {
          sig: "Stream<T> limit(long maxSize)",
          desc: "Returns a stream truncated to no longer than maxSize.",
        },
        skip: {
          sig: "Stream<T> skip(long n)",
          desc: "Returns a stream after discarding the first n elements.",
        },
        findFirst: {
          sig: "Optional<T> findFirst()",
          desc: "Returns an Optional describing the first element.",
        },
        findAny: {
          sig: "Optional<T> findAny()",
          desc: "Returns an Optional describing some element.",
        },
        anyMatch: {
          sig: "boolean anyMatch(Predicate<? super T> predicate)",
          desc: "Returns whether any elements match the predicate.",
        },
        allMatch: {
          sig: "boolean allMatch(Predicate<? super T> predicate)",
          desc: "Returns whether all elements match the predicate.",
        },
        noneMatch: {
          sig: "boolean noneMatch(Predicate<? super T> predicate)",
          desc: "Returns whether no elements match the predicate.",
        },
        toList: {
          sig: "List<T> toList()",
          desc: "Accumulates the elements into an unmodifiable List.",
        },
        of: {
          sig: "static <T> Stream<T> of(T... values)",
          desc: "Returns a sequential ordered stream.",
        },
        peek: {
          sig: "Stream<T> peek(Consumer<? super T> action)",
          desc: "Returns a stream performing the action on each element as consumed.",
        },
        mapToInt: {
          sig: "IntStream mapToInt(ToIntFunction<? super T> mapper)",
          desc: "Returns an IntStream.",
        },
      },
    },
    StringBuilder: {
      desc: "`public final class StringBuilder extends AbstractStringBuilder` — A mutable sequence of characters.",
      methods: {
        append: {
          sig: "StringBuilder append(String str)",
          desc: "Appends the specified string.",
        },
        insert: {
          sig: "StringBuilder insert(int offset, String str)",
          desc: "Inserts the string at the specified offset.",
        },
        delete: {
          sig: "StringBuilder delete(int start, int end)",
          desc: "Removes the characters in a substring.",
        },
        replace: {
          sig: "StringBuilder replace(int start, int end, String str)",
          desc: "Replaces the characters in a substring.",
        },
        reverse: {
          sig: "StringBuilder reverse()",
          desc: "Reverses the sequence.",
        },
        toString: {
          sig: "String toString()",
          desc: "Returns a string representing the data.",
        },
        length: {
          sig: "int length()",
          desc: "Returns the length (character count).",
        },
        charAt: {
          sig: "char charAt(int index)",
          desc: "Returns the char value at the specified index.",
        },
        indexOf: {
          sig: "int indexOf(String str)",
          desc: "Returns the index within this string of the first occurrence.",
        },
        substring: {
          sig: "String substring(int start, int end)",
          desc: "Returns a new String from a subsequence.",
        },
      },
    },
  };

  /* Build a quick-lookup for all known symbols (class + method definitions in source) */
  function buildSourceSymbols(code) {
    const symbols = [];
    const lines = code.split("\n");
    // class/interface/enum/record declarations
    const classPat = /\b(class|interface|enum|record)\s+(\w+)/g;
    const methodPat =
      /\b(?:public|private|protected|static|final|abstract|synchronized|native|\s)*\s+[\w<>\[\],\s]+\s+(\w+)\s*\(/g;
    const fieldPat =
      /\b(?:public|private|protected|static|final|volatile|transient|\s)*\s+[\w<>\[\],]+\s+(\w+)\s*[;=]/g;

    for (let i = 0; i < lines.length; i++) {
      let m;
      const line = lines[i];
      classPat.lastIndex = 0;
      while ((m = classPat.exec(line)) !== null) {
        symbols.push({ name: m[2], kind: m[1], line: i + 1, col: m.index + 1 });
      }
      methodPat.lastIndex = 0;
      while ((m = methodPat.exec(line)) !== null) {
        if (
          ![
            "if",
            "else",
            "for",
            "while",
            "switch",
            "catch",
            "return",
            "new",
            "throw",
          ].includes(m[1])
        ) {
          symbols.push({
            name: m[1],
            kind: "method",
            line: i + 1,
            col: m.index + 1,
          });
        }
      }
    }
    return symbols;
  }

  /* ───────────────────────────────────────────
     5.  COMPLETION PROVIDER
     ─────────────────────────────────────────── */
  monaco.languages.registerCompletionItemProvider("java", {
    triggerCharacters: [".", "@"],
    provideCompletionItems: function (model, position) {
      const textUntilPosition = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });
      const wordInfo = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: wordInfo.startColumn,
        endColumn: wordInfo.endColumn,
      };

      const suggestions = [];
      const CK = monaco.languages.CompletionItemKind;

      /* ---- Dot-completion: ClassName. or variable. ---- */
      const dotMatch = textUntilPosition.match(/(\w+)\.\s*(\w*)$/);
      if (dotMatch) {
        const className = dotMatch[1];
        const info = javaClasses[className];
        if (info) {
          if (info.methods) {
            Object.entries(info.methods).forEach(([name, m]) => {
              suggestions.push({
                label: name,
                kind: CK.Method,
                insertText: name + (m.sig.includes("()") ? "()" : "($0)"),
                insertTextRules:
                  monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                detail: m.sig,
                documentation: { value: m.desc },
                range,
              });
            });
          }
          if (info.fields) {
            Object.entries(info.fields).forEach(([name, f]) => {
              suggestions.push({
                label: name,
                kind: CK.Field,
                insertText: name,
                detail: f.type,
                documentation: { value: f.desc },
                range,
              });
            });
          }
          return { suggestions };
        }
        /* Common variable type inference from source */
        const fullText = model.getValue();
        const varPat = new RegExp(
          "(\\w[\\w<>\\[\\]]+)\\s+" +
            className.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") +
            "\\s*[=;(]",
        );
        const vm = fullText.match(varPat);
        if (vm) {
          let type = vm[1].replace(/<.*>/, "");
          const ti = javaClasses[type];
          if (ti && ti.methods) {
            Object.entries(ti.methods).forEach(([name, m]) => {
              suggestions.push({
                label: name,
                kind: CK.Method,
                insertText: name + (m.sig.includes("()") ? "()" : "($0)"),
                insertTextRules:
                  monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                detail: m.sig,
                documentation: { value: m.desc },
                range,
              });
            });
            return { suggestions };
          }
        }
      }

      /* ---- Annotation completions ---- */
      const annoMatch = textUntilPosition.match(/@(\w*)$/);
      if (annoMatch) {
        [
          "Override",
          "Deprecated",
          "SuppressWarnings",
          "FunctionalInterface",
          "SafeVarargs",
          "Nullable",
          "NonNull",
          "NotNull",
        ].forEach((a) => {
          suggestions.push({
            label: "@" + a,
            kind: CK.Keyword,
            insertText: a,
            detail: "Annotation",
            range,
          });
        });
        return { suggestions };
      }

      /* ---- General keyword + class + snippet completions ---- */
      // Keywords
      const keywords = [
        "abstract",
        "assert",
        "boolean",
        "break",
        "byte",
        "case",
        "catch",
        "char",
        "class",
        "const",
        "continue",
        "default",
        "do",
        "double",
        "else",
        "enum",
        "extends",
        "final",
        "finally",
        "float",
        "for",
        "goto",
        "if",
        "implements",
        "import",
        "instanceof",
        "int",
        "interface",
        "long",
        "native",
        "new",
        "package",
        "private",
        "protected",
        "public",
        "return",
        "short",
        "static",
        "strictfp",
        "super",
        "switch",
        "synchronized",
        "this",
        "throw",
        "throws",
        "transient",
        "try",
        "void",
        "volatile",
        "while",
        "yield",
        "var",
        "record",
        "sealed",
        "permits",
      ];
      keywords.forEach((kw) => {
        suggestions.push({
          label: kw,
          kind: CK.Keyword,
          insertText: kw,
          range,
        });
      });

      // Classes
      Object.keys(javaClasses).forEach((cls) => {
        suggestions.push({
          label: cls,
          kind: CK.Class,
          insertText: cls,
          detail: "Class",
          documentation: { value: javaClasses[cls].desc },
          range,
        });
      });

      // Extra common types
      [
        "List",
        "Map",
        "Set",
        "Queue",
        "Deque",
        "Iterator",
        "Iterable",
        "Comparable",
        "Comparator",
        "Runnable",
        "Callable",
        "Future",
        "CompletableFuture",
        "Exception",
        "RuntimeException",
        "IOException",
        "Integer",
        "Double",
        "Float",
        "Long",
        "Short",
        "Byte",
        "Character",
        "Boolean",
        "Object",
        "Collection",
        "LinkedList",
        "TreeMap",
        "TreeSet",
        "HashSet",
        "Stack",
        "Vector",
        "PrintStream",
        "Scanner",
        "File",
        "Path",
        "Paths",
        "Files",
        "BufferedReader",
        "InputStreamReader",
        "FileReader",
        "FileWriter",
      ].forEach((cls) => {
        suggestions.push({
          label: cls,
          kind: CK.Class,
          insertText: cls,
          detail: "Class / Interface",
          range,
        });
      });

      // Literals
      ["true", "false", "null"].forEach((l) => {
        suggestions.push({ label: l, kind: CK.Value, insertText: l, range });
      });

      // Source symbols
      const syms = buildSourceSymbols(model.getValue());
      const seen = new Set();
      syms.forEach((s) => {
        if (!seen.has(s.name)) {
          seen.add(s.name);
          suggestions.push({
            label: s.name,
            kind: s.kind === "method" ? CK.Method : CK.Class,
            insertText: s.name,
            detail: "Defined in source (" + s.kind + ")",
            range,
          });
        }
      });

      /* ─── Snippets ─── */
      const snippets = [
        {
          label: "sout",
          detail: "System.out.println()",
          insertText: "System.out.println(${1});",
          documentation: "Print to standard output",
        },
        {
          label: "serr",
          detail: "System.err.println()",
          insertText: "System.err.println(${1});",
          documentation: "Print to standard error",
        },
        {
          label: "soutf",
          detail: "System.out.printf()",
          insertText: 'System.out.printf("${1}%n"${2});',
          documentation: "Formatted print to standard output",
        },
        {
          label: "main",
          detail: "public static void main",
          insertText: "public static void main(String[] args) {\n\t${0}\n}",
          documentation: "Main method entry point",
        },
        {
          label: "psvm",
          detail: "public static void main",
          insertText: "public static void main(String[] args) {\n\t${0}\n}",
          documentation: "Main method (IntelliJ style shortcut)",
        },
        {
          label: "fori",
          detail: "for (int i ...) loop",
          insertText:
            "for (int ${1:i} = 0; ${1:i} < ${2:length}; ${1:i}++) {\n\t${0}\n}",
          documentation: "Indexed for loop",
        },
        {
          label: "foreach",
          detail: "for-each loop",
          insertText:
            "for (${1:Type} ${2:item} : ${3:collection}) {\n\t${0}\n}",
          documentation: "Enhanced for loop",
        },
        {
          label: "ifelse",
          detail: "if-else statement",
          insertText: "if (${1:condition}) {\n\t${2}\n} else {\n\t${0}\n}",
          documentation: "If-else block",
        },
        {
          label: "while",
          detail: "while loop",
          insertText: "while (${1:condition}) {\n\t${0}\n}",
          documentation: "While loop",
        },
        {
          label: "dowhile",
          detail: "do-while loop",
          insertText: "do {\n\t${0}\n} while (${1:condition});",
          documentation: "Do-while loop",
        },
        {
          label: "trycatch",
          detail: "try-catch block",
          insertText:
            "try {\n\t${1}\n} catch (${2:Exception} ${3:e}) {\n\t${0:e.printStackTrace();}\n}",
          documentation: "Try-catch exception handling",
        },
        {
          label: "tryfinally",
          detail: "try-catch-finally block",
          insertText:
            "try {\n\t${1}\n} catch (${2:Exception} ${3:e}) {\n\t${4:e.printStackTrace();}\n} finally {\n\t${0}\n}",
          documentation: "Try-catch-finally block",
        },
        {
          label: "trywith",
          detail: "try-with-resources",
          insertText:
            "try (${1:Resource} ${2:res} = ${3:new Resource()}) {\n\t${0}\n} catch (${4:Exception} ${5:e}) {\n\t${6:e.printStackTrace();}\n}",
          documentation: "Try-with-resources (AutoCloseable)",
        },
        {
          label: "switch",
          detail: "switch statement",
          insertText:
            "switch (${1:expression}) {\n\tcase ${2:value}:\n\t\t${3}\n\t\tbreak;\n\tdefault:\n\t\t${0}\n\t\tbreak;\n}",
          documentation: "Switch statement",
        },
        {
          label: "switchexpr",
          detail: "switch expression (Java 14+)",
          insertText:
            "var ${1:result} = switch (${2:expression}) {\n\tcase ${3:value} -> ${4};\n\tdefault -> ${0};\n};",
          documentation: "Switch expression with arrow syntax",
        },
        {
          label: "class",
          detail: "class declaration",
          insertText: "public class ${1:ClassName} {\n\n\t${0}\n}",
          documentation: "Class declaration",
        },
        {
          label: "interface",
          detail: "interface declaration",
          insertText: "public interface ${1:InterfaceName} {\n\n\t${0}\n}",
          documentation: "Interface declaration",
        },
        {
          label: "enum",
          detail: "enum declaration",
          insertText:
            "public enum ${1:EnumName} {\n\t${2:VALUE1},\n\t${3:VALUE2};\n\n\t${0}\n}",
          documentation: "Enum declaration",
        },
        {
          label: "record",
          detail: "record declaration (Java 16+)",
          insertText:
            "public record ${1:RecordName}(${2:String name}) {\n\t${0}\n}",
          documentation: "Record declaration",
        },
        {
          label: "singleton",
          detail: "Singleton pattern",
          insertText:
            "public class ${1:Singleton} {\n\tprivate static volatile ${1:Singleton} instance;\n\n\tprivate ${1:Singleton}() {}\n\n\tpublic static ${1:Singleton} getInstance() {\n\t\tif (instance == null) {\n\t\t\tsynchronized (${1:Singleton}.class) {\n\t\t\t\tif (instance == null) {\n\t\t\t\t\tinstance = new ${1:Singleton}();\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\treturn instance;\n\t}\n\n\t${0}\n}",
          documentation:
            "Thread-safe Singleton pattern (double-checked locking)",
        },
        {
          label: "lambda",
          detail: "Lambda expression",
          insertText: "(${1:params}) -> ${2:expression}",
          documentation: "Lambda expression",
        },
        {
          label: "method",
          detail: "method declaration",
          insertText:
            "${1:public} ${2:void} ${3:methodName}(${4}) {\n\t${0}\n}",
          documentation: "Method declaration",
        },
        {
          label: "constructor",
          detail: "constructor",
          insertText: "public ${1:ClassName}(${2}) {\n\t${0}\n}",
          documentation: "Constructor",
        },
        {
          label: "getter",
          detail: "getter method",
          insertText:
            "public ${1:String} get${2:Name}() {\n\treturn this.${3:name};\n}",
          documentation: "Getter method",
        },
        {
          label: "setter",
          detail: "setter method",
          insertText:
            "public void set${1:Name}(${2:String} ${3:name}) {\n\tthis.${3:name} = ${3:name};\n}",
          documentation: "Setter method",
        },
        {
          label: "tostring",
          detail: "toString() override",
          insertText:
            "@Override\npublic String toString() {\n\treturn \"${1:ClassName}{\" +\n\t\t${0}\n\t\t'}';\n}",
          documentation: "Override toString()",
        },
        {
          label: "equals",
          detail: "equals() and hashCode() override",
          insertText:
            "@Override\npublic boolean equals(Object o) {\n\tif (this == o) return true;\n\tif (o == null || getClass() != o.getClass()) return false;\n\t${1:ClassName} that = (${1:ClassName}) o;\n\treturn Objects.equals(${2:field}, that.${2:field});\n}\n\n@Override\npublic int hashCode() {\n\treturn Objects.hash(${2:field});\n}",
          documentation: "Override equals() and hashCode()",
        },
        {
          label: "streamcollect",
          detail: "Stream collect to list",
          insertText:
            "${1:list}.stream()\n\t.filter(${2:item} -> ${3:condition})\n\t.map(${2:item} -> ${4:transform})\n\t.collect(Collectors.toList());",
          documentation: "Stream pipeline with collect",
        },
        {
          label: "javadoc",
          detail: "Javadoc comment",
          insertText:
            "/**\n * ${1:Description}\n *\n * @param ${2:param} ${3:description}\n * @return ${4:description}\n * @throws ${5:Exception} ${6:description}\n */",
          documentation: "Javadoc documentation comment",
        },
        {
          label: "test",
          detail: "JUnit test method",
          insertText:
            "@Test\npublic void ${1:testMethodName}() {\n\t// Arrange\n\t${2}\n\n\t// Act\n\t${3}\n\n\t// Assert\n\t${0}\n}",
          documentation: "JUnit test method with AAA pattern",
        },
        {
          label: "sychronized",
          detail: "synchronized block",
          insertText: "synchronized (${1:lock}) {\n\t${0}\n}",
          documentation: "Synchronized block",
        },
        {
          label: "instanceof",
          detail: "instanceof pattern matching (Java 16+)",
          insertText:
            "if (${1:obj} instanceof ${2:Type} ${3:name}) {\n\t${0}\n}",
          documentation: "Pattern matching for instanceof",
        },
        {
          label: "import",
          detail: "import statement",
          insertText: "import ${1:java.util.*};",
          documentation: "Import statement",
        },
        {
          label: "package",
          detail: "package declaration",
          insertText: "package ${1:com.example};",
          documentation: "Package declaration",
        },
        {
          label: "ternary",
          detail: "Ternary operator",
          insertText: "${1:condition} ? ${2:trueValue} : ${3:falseValue}",
          documentation: "Ternary conditional expression",
        },
        {
          label: "newlist",
          detail: "new ArrayList<>()",
          insertText: "List<${1:String}> ${2:list} = new ArrayList<>();",
          documentation: "Create new ArrayList",
        },
        {
          label: "newmap",
          detail: "new HashMap<>()",
          insertText:
            "Map<${1:String}, ${2:Object}> ${3:map} = new HashMap<>();",
          documentation: "Create new HashMap",
        },
        {
          label: "newset",
          detail: "new HashSet<>()",
          insertText: "Set<${1:String}> ${2:set} = new HashSet<>();",
          documentation: "Create new HashSet",
        },
      ];
      snippets.forEach((s) => {
        suggestions.push({
          label: s.label,
          kind: CK.Snippet,
          insertText: s.insertText,
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          detail: s.detail,
          documentation: {
            value:
              typeof s.documentation === "string"
                ? s.documentation
                : s.documentation,
          },
          range,
          sortText: "0" + s.label, // prioritize snippets
        });
      });

      return { suggestions };
    },
  });

  /* ───────────────────────────────────────────
     6.  HOVER PROVIDER
     ─────────────────────────────────────────── */
  monaco.languages.registerHoverProvider("java", {
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

      // Check if it's a known class
      if (javaClasses[name]) {
        return {
          range,
          contents: [
            { value: "```java\n" + name + "\n```" },
            { value: javaClasses[name].desc },
          ],
        };
      }

      // Check if it's a method accessed via dot
      const lineText = model.getLineContent(position.lineNumber);
      const beforeWord = lineText.substring(0, word.startColumn - 1);
      const dotMatch = beforeWord.match(/(\w+)\.\s*$/);
      if (dotMatch) {
        const cls = dotMatch[1];
        // Direct class lookup
        let info = javaClasses[cls];
        if (!info) {
          // Try variable type inference
          const fullText = model.getValue();
          const varPat = new RegExp(
            "([\\w<>\\[\\]]+)\\s+" +
              cls.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") +
              "\\s*[=;(]",
          );
          const vm = fullText.match(varPat);
          if (vm) {
            const type = vm[1].replace(/<.*>/, "");
            info = javaClasses[type];
          }
        }
        if (info) {
          if (info.methods && info.methods[name]) {
            const m = info.methods[name];
            return {
              range,
              contents: [
                { value: "```java\n" + m.sig + "\n```" },
                { value: m.desc },
              ],
            };
          }
          if (info.fields && info.fields[name]) {
            const f = info.fields[name];
            return {
              range,
              contents: [
                { value: "```java\n" + f.type + " " + name + "\n```" },
                { value: f.desc },
              ],
            };
          }
        }
      }

      // Check source symbols
      const syms = buildSourceSymbols(model.getValue());
      const sym = syms.find((s) => s.name === name);
      if (sym) {
        const line = model.getLineContent(sym.line).trim();
        return {
          range,
          contents: [
            { value: "```java\n" + line + "\n```" },
            { value: "_Defined at line " + sym.line + " (" + sym.kind + ")_" },
          ],
        };
      }

      // Java keywords hover
      const keywordDocs = {
        abstract:
          "Declares a class or method as abstract. An abstract class cannot be instantiated, and an abstract method must be implemented by subclasses.",
        assert:
          "Used for debugging. Tests a boolean expression and throws AssertionError if false (when assertions are enabled).",
        boolean: "Primitive type. Holds `true` or `false`.",
        break: "Exits a loop or switch statement.",
        byte: "Primitive type. 8-bit signed integer (-128 to 127).",
        case: "Defines a branch in a switch statement.",
        catch: "Catches exceptions thrown in a try block.",
        char: "Primitive type. 16-bit Unicode character.",
        class: "Declares a class.",
        continue: "Skips the remainder of the current loop iteration.",
        default: "Default branch in switch, or default method in interface.",
        do: "Starts a do-while loop.",
        double: "Primitive type. 64-bit IEEE 754 floating point.",
        else: "Alternative branch of an if statement.",
        enum: "Declares an enumerated type.",
        extends:
          "Indicates that a class inherits from a superclass or a type parameter has an upper bound.",
        final:
          "Declares a constant, prevents inheritance, or prevents method overriding.",
        finally:
          "Block that always executes after try-catch, regardless of whether an exception was thrown.",
        float: "Primitive type. 32-bit IEEE 754 floating point.",
        for: "Starts a for loop.",
        if: "Conditional branching statement.",
        implements: "Indicates that a class implements an interface.",
        import: "Imports a class, interface, or entire package.",
        instanceof:
          "Tests whether an object is an instance of a specific class or interface.",
        int: "Primitive type. 32-bit signed integer.",
        interface: "Declares an interface.",
        long: "Primitive type. 64-bit signed integer.",
        native:
          "Indicates that a method is implemented in native code (e.g., C/C++).",
        new: "Creates a new object instance or array.",
        package: "Declares a package.",
        private: "Access modifier. Accessible only within the declaring class.",
        protected:
          "Access modifier. Accessible within the package and by subclasses.",
        public: "Access modifier. Accessible from anywhere.",
        return: "Returns from a method, optionally with a value.",
        short: "Primitive type. 16-bit signed integer.",
        static:
          "Declares a member as belonging to the class rather than to instances.",
        strictfp:
          "Restricts floating-point calculations to ensure portability.",
        super:
          "Refers to the superclass. Used to access superclass members or constructors.",
        switch: "Multi-way branch statement.",
        synchronized:
          "Declares a block or method as synchronized for thread safety.",
        this: "Refers to the current object instance.",
        throw: "Throws an exception.",
        throws: "Declares exceptions that a method may throw.",
        transient:
          "Marks a field as not part of the serialized form of an object.",
        try: "Starts a try block for exception handling.",
        void: "Indicates that a method does not return a value.",
        volatile:
          "Indicates that a variable may be modified by multiple threads.",
        while: "Starts a while loop.",
        yield: "Yields a value from a switch expression (Java 13+).",
        var: "Local variable type inference (Java 10+). The compiler infers the type.",
        record:
          "Declares a record class — a transparent carrier for immutable data (Java 16+).",
        sealed: "Restricts which classes can extend or implement (Java 17+).",
        permits:
          "Specifies the permitted subclasses of a sealed class (Java 17+).",
      };
      if (keywordDocs[name]) {
        return {
          range,
          contents: [
            { value: "```java\n" + name + "\n```" },
            { value: keywordDocs[name] },
          ],
        };
      }

      return null;
    },
  });

  /* ───────────────────────────────────────────
     7.  DEFINITION PROVIDER (Go to Definition)
     ─────────────────────────────────────────── */
  monaco.languages.registerDefinitionProvider("java", {
    provideDefinition: function (model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return null;
      const name = word.word;
      const syms = buildSourceSymbols(model.getValue());
      const sym = syms.find((s) => s.name === name);
      if (sym) {
        return {
          uri: model.uri,
          range: {
            startLineNumber: sym.line,
            endLineNumber: sym.line,
            startColumn: 1,
            endColumn: model.getLineContent(sym.line).length + 1,
          },
        };
      }
      // Also search for field/variable declarations
      const lines = model.getValue().split("\n");
      for (let i = 0; i < lines.length; i++) {
        const re = new RegExp(
          "\\b" + name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b",
        );
        if (re.test(lines[i]) && i + 1 !== position.lineNumber) {
          const declPatterns = [
            new RegExp("\\b\\w+\\s+" + name + "\\s*[=;(]"),
            new RegExp("\\b(class|interface|enum|record)\\s+" + name),
          ];
          for (const dp of declPatterns) {
            if (dp.test(lines[i])) {
              return {
                uri: model.uri,
                range: {
                  startLineNumber: i + 1,
                  endLineNumber: i + 1,
                  startColumn: 1,
                  endColumn: lines[i].length + 1,
                },
              };
            }
          }
        }
      }
      return null;
    },
  });

  /* ───────────────────────────────────────────
     8.  SIGNATURE HELP PROVIDER
     ─────────────────────────────────────────── */
  monaco.languages.registerSignatureHelpProvider("java", {
    signatureHelpTriggerCharacters: ["(", ","],
    provideSignatureHelp: function (model, position) {
      const textUntil = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });

      // Find the method call context
      let depth = 0;
      let methodEnd = -1;
      let commaCount = 0;
      for (let i = textUntil.length - 1; i >= 0; i--) {
        const c = textUntil[i];
        if (c === ")") depth++;
        else if (c === "(") {
          if (depth === 0) {
            methodEnd = i;
            break;
          }
          depth--;
        } else if (c === "," && depth === 0) {
          commaCount++;
        }
      }
      if (methodEnd < 0) return null;

      const before = textUntil.substring(0, methodEnd);
      const match = before.match(/(\w+)\.(\w+)\s*$/);
      if (!match) {
        const simpleMatch = before.match(/(\w+)\s*$/);
        if (simpleMatch) {
          // Could be a constructor or local method
          return null;
        }
        return null;
      }

      const className = match[1];
      const methodName = match[2];
      let info = javaClasses[className];
      if (!info) {
        const fullText = model.getValue();
        const varPat = new RegExp(
          "([\\w<>\\[\\]]+)\\s+" +
            className.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") +
            "\\s*[=;(]",
        );
        const vm = fullText.match(varPat);
        if (vm) {
          const type = vm[1].replace(/<.*>/, "");
          info = javaClasses[type];
        }
      }

      if (info && info.methods && info.methods[methodName]) {
        const m = info.methods[methodName];
        const sigMatch = m.sig.match(/\(([^)]*)\)/);
        const params =
          sigMatch && sigMatch[1]
            ? sigMatch[1].split(",").map((p) => p.trim())
            : [];

        return {
          value: {
            activeSignature: 0,
            activeParameter: Math.min(commaCount, params.length - 1),
            signatures: [
              {
                label: m.sig,
                documentation: { value: m.desc },
                parameters: params.map((p) => ({
                  label: p,
                  documentation: "",
                })),
              },
            ],
          },
          dispose: function () {},
        };
      }

      return null;
    },
  });

  /* ───────────────────────────────────────────
     9.  DOCUMENT SYMBOL PROVIDER (Outline)
     ─────────────────────────────────────────── */
  monaco.languages.registerDocumentSymbolProvider("java", {
    provideDocumentSymbols: function (model) {
      const symbols = [];
      const lines = model.getValue().split("\n");
      const SK = monaco.languages.SymbolKind;
      for (let i = 0; i < lines.length; i++) {
        let m;
        if ((m = lines[i].match(/\b(class|interface|enum|record)\s+(\w+)/))) {
          symbols.push({
            name: m[2],
            detail: m[1],
            kind:
              m[1] === "class" || m[1] === "record"
                ? SK.Class
                : m[1] === "interface"
                  ? SK.Interface
                  : SK.Enum,
            range: {
              startLineNumber: i + 1,
              startColumn: 1,
              endLineNumber: i + 1,
              endColumn: lines[i].length + 1,
            },
            selectionRange: {
              startLineNumber: i + 1,
              startColumn: m.index + 1,
              endLineNumber: i + 1,
              endColumn: m.index + m[0].length + 1,
            },
          });
        }
        if (
          (m = lines[i].match(
            /\b(?:public|private|protected|static|final|abstract|synchronized|native|\s)*\s+([\w<>\[\],]+)\s+(\w+)\s*\(/,
          ))
        ) {
          const name = m[2];
          if (
            ![
              "if",
              "else",
              "for",
              "while",
              "switch",
              "catch",
              "return",
              "new",
              "throw",
            ].includes(name)
          ) {
            symbols.push({
              name: name + "()",
              detail: m[1],
              kind: SK.Method,
              range: {
                startLineNumber: i + 1,
                startColumn: 1,
                endLineNumber: i + 1,
                endColumn: lines[i].length + 1,
              },
              selectionRange: {
                startLineNumber: i + 1,
                startColumn: m.index + 1,
                endLineNumber: i + 1,
                endColumn: m.index + m[0].length + 1,
              },
            });
          }
        }
      }
      return symbols;
    },
  });

  /* ───────────────────────────────────────────
     10.  CODE ACTIONS (Quick Fixes)
     ─────────────────────────────────────────── */
  monaco.languages.registerCodeActionProvider("java", {
    provideCodeActions: function (model, range, context) {
      const actions = [];
      // Suggest adding missing import for known classes
      const line = model.getLineContent(range.startLineNumber);
      Object.keys(javaClasses).forEach((cls) => {
        const re = new RegExp("\\b" + cls + "\\b");
        if (re.test(line)) {
          const fullText = model.getValue();
          if (
            !fullText.includes("import") ||
            !fullText.match(new RegExp("import\\s+.*" + cls))
          ) {
            // Only suggest if there's no existing import
            let pkg = "java.lang";
            if (
              [
                "ArrayList",
                "HashMap",
                "HashSet",
                "LinkedList",
                "TreeMap",
                "TreeSet",
                "Collections",
                "Arrays",
                "Optional",
                "Stream",
              ].includes(cls)
            ) {
              pkg = cls === "Stream" ? "java.util.stream" : "java.util";
            }
            actions.push({
              title: "Import " + pkg + "." + cls,
              kind: "quickfix",
              edit: {
                edits: [
                  {
                    resource: model.uri,
                    textEdit: {
                      range: {
                        startLineNumber: 1,
                        startColumn: 1,
                        endLineNumber: 1,
                        endColumn: 1,
                      },
                      text: "import " + pkg + "." + cls + ";\n",
                    },
                    versionId: model.getVersionId(),
                  },
                ],
              },
            });
          }
        }
      });
      return { actions, dispose: function () {} };
    },
  });

  /* ───────────────────────────────────────────
     11.  FOLDING RANGE PROVIDER
     ─────────────────────────────────────────── */
  monaco.languages.registerFoldingRangeProvider("java", {
    provideFoldingRanges: function (model) {
      const ranges = [];
      const lines = model.getValue().split("\n");
      const stack = [];
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.includes("{")) {
          stack.push(i);
        }
        if (line.includes("}") && stack.length > 0) {
          const start = stack.pop();
          if (i > start) {
            ranges.push({
              start: start + 1,
              end: i + 1,
              kind: monaco.languages.FoldingRangeKind.Region,
            });
          }
        }
        // Javadoc / multi-line comments
        if (line.trim().startsWith("/**") || line.trim().startsWith("/*")) {
          const commentStart = i;
          while (i < lines.length && !lines[i].includes("*/")) i++;
          if (i > commentStart) {
            ranges.push({
              start: commentStart + 1,
              end: i + 1,
              kind: monaco.languages.FoldingRangeKind.Comment,
            });
          }
        }
        // import blocks
        if (line.trim().startsWith("import ")) {
          const importStart = i;
          while (
            i + 1 < lines.length &&
            lines[i + 1].trim().startsWith("import ")
          )
            i++;
          if (i > importStart) {
            ranges.push({
              start: importStart + 1,
              end: i + 1,
              kind: monaco.languages.FoldingRangeKind.Imports,
            });
          }
        }
      }
      return ranges;
    },
  });
};
