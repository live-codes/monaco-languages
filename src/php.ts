import type * as Monaco from "monaco-editor";

export default (monaco: typeof Monaco) => {
  // ===================================================================
  // PHP FUNCTIONS DATABASE
  // ===================================================================
  const PHP_FUNCTIONS = {
    // --- String ---
    strlen: {
      params: "string $string",
      returns: "int",
      doc: "Returns the length of a string.",
    },
    str_replace: {
      params:
        "mixed $search, mixed $replace, mixed $subject, int &$count = null",
      returns: "string|array",
      doc: "Replace all occurrences of the search string with the replacement string.",
    },
    substr: {
      params: "string $string, int $offset, ?int $length = null",
      returns: "string",
      doc: "Return part of a string.",
    },
    strpos: {
      params: "string $haystack, string $needle, int $offset = 0",
      returns: "int|false",
      doc: "Find the position of the first occurrence of a substring in a string.",
    },
    strrpos: {
      params: "string $haystack, string $needle, int $offset = 0",
      returns: "int|false",
      doc: "Find the position of the last occurrence of a substring in a string.",
    },
    strtolower: {
      params: "string $string",
      returns: "string",
      doc: "Make a string lowercase.",
    },
    strtoupper: {
      params: "string $string",
      returns: "string",
      doc: "Make a string uppercase.",
    },
    trim: {
      params: 'string $string, string $characters = " \\t\\n\\r\\0\\x0B"',
      returns: "string",
      doc: "Strip whitespace from the beginning and end of a string.",
    },
    ltrim: {
      params: 'string $string, string $characters = " \\t\\n\\r\\0\\x0B"',
      returns: "string",
      doc: "Strip whitespace from the beginning of a string.",
    },
    rtrim: {
      params: 'string $string, string $characters = " \\t\\n\\r\\0\\x0B"',
      returns: "string",
      doc: "Strip whitespace from the end of a string.",
    },
    explode: {
      params: "string $separator, string $string, int $limit = PHP_INT_MAX",
      returns: "array",
      doc: "Split a string by a separator.",
    },
    implode: {
      params: "string $separator, array $array",
      returns: "string",
      doc: "Join array elements with a separator string.",
    },
    sprintf: {
      params: "string $format, mixed ...$values",
      returns: "string",
      doc: "Return a formatted string.",
    },
    str_contains: {
      params: "string $haystack, string $needle",
      returns: "bool",
      doc: "Determine if a string contains a given substring. (PHP 8.0+)",
    },
    str_starts_with: {
      params: "string $haystack, string $needle",
      returns: "bool",
      doc: "Checks if a string starts with a given substring. (PHP 8.0+)",
    },
    str_ends_with: {
      params: "string $haystack, string $needle",
      returns: "bool",
      doc: "Checks if a string ends with a given substring. (PHP 8.0+)",
    },
    str_split: {
      params: "string $string, int $length = 1",
      returns: "array",
      doc: "Convert a string to an array.",
    },
    str_pad: {
      params:
        'string $string, int $length, string $pad_string = " ", int $pad_type = STR_PAD_RIGHT',
      returns: "string",
      doc: "Pad a string to a certain length.",
    },
    str_repeat: {
      params: "string $string, int $times",
      returns: "string",
      doc: "Repeat a string.",
    },
    str_word_count: {
      params: "string $string, int $format = 0, ?string $characters = null",
      returns: "int|array",
      doc: "Return information about words used in a string.",
    },
    ucfirst: {
      params: "string $string",
      returns: "string",
      doc: "Make the first character uppercase.",
    },
    lcfirst: {
      params: "string $string",
      returns: "string",
      doc: "Make the first character lowercase.",
    },
    ucwords: {
      params: 'string $string, string $separators = " \\t\\r\\n\\f"',
      returns: "string",
      doc: "Uppercase the first character of each word.",
    },
    nl2br: {
      params: "string $string, bool $use_xhtml = true",
      returns: "string",
      doc: "Inserts HTML line breaks before all newlines.",
    },
    htmlspecialchars: {
      params:
        "string $string, int $flags = ENT_QUOTES, ?string $encoding = null, bool $double_encode = true",
      returns: "string",
      doc: "Convert special characters to HTML entities.",
    },
    htmlentities: {
      params:
        "string $string, int $flags = ENT_QUOTES, ?string $encoding = null, bool $double_encode = true",
      returns: "string",
      doc: "Convert all applicable characters to HTML entities.",
    },
    strip_tags: {
      params: "string $string, array|string|null $allowed_tags = null",
      returns: "string",
      doc: "Strip HTML and PHP tags from a string.",
    },
    urlencode: {
      params: "string $string",
      returns: "string",
      doc: "URL-encodes a string.",
    },
    urldecode: {
      params: "string $string",
      returns: "string",
      doc: "Decodes URL-encoded string.",
    },
    base64_encode: {
      params: "string $string",
      returns: "string",
      doc: "Encodes data with MIME base64.",
    },
    base64_decode: {
      params: "string $string, bool $strict = false",
      returns: "string|false",
      doc: "Decodes data encoded with MIME base64.",
    },
    md5: {
      params: "string $string, bool $binary = false",
      returns: "string",
      doc: "Calculate the md5 hash of a string.",
    },
    sha1: {
      params: "string $string, bool $binary = false",
      returns: "string",
      doc: "Calculate the sha1 hash of a string.",
    },
    number_format: {
      params:
        'float $num, int $decimals = 0, ?string $dec_sep = ".", ?string $thousands_sep = ","',
      returns: "string",
      doc: "Format a number with grouped thousands.",
    },
    preg_match: {
      params:
        "string $pattern, string $subject, array &$matches = null, int $flags = 0, int $offset = 0",
      returns: "int|false",
      doc: "Perform a regular expression match.",
    },
    preg_match_all: {
      params:
        "string $pattern, string $subject, array &$matches = null, int $flags = 0, int $offset = 0",
      returns: "int|false",
      doc: "Perform a global regular expression match.",
    },
    preg_replace: {
      params:
        "string|array $pattern, string|array $replacement, string|array $subject, int $limit = -1, int &$count = null",
      returns: "string|array|null",
      doc: "Perform a regular expression search and replace.",
    },
    preg_split: {
      params:
        "string $pattern, string $subject, int $limit = -1, int $flags = 0",
      returns: "array|false",
      doc: "Split string by a regular expression.",
    },
    json_encode: {
      params: "mixed $value, int $flags = 0, int $depth = 512",
      returns: "string|false",
      doc: "Returns the JSON representation of a value.",
    },
    json_decode: {
      params:
        "string $json, ?bool $associative = null, int $depth = 512, int $flags = 0",
      returns: "mixed",
      doc: "Decodes a JSON string.",
    },
    password_hash: {
      params: "string $password, string|int|null $algo, array $options = []",
      returns: "string",
      doc: "Creates a password hash.",
    },
    password_verify: {
      params: "string $password, string $hash",
      returns: "bool",
      doc: "Verifies that a password matches a hash.",
    },
    // --- Array ---
    array_push: {
      params: "array &$array, mixed ...$values",
      returns: "int",
      doc: "Push elements onto the end of an array.",
    },
    array_pop: {
      params: "array &$array",
      returns: "mixed",
      doc: "Pop the element off the end of an array.",
    },
    array_shift: {
      params: "array &$array",
      returns: "mixed",
      doc: "Shift an element off the beginning of an array.",
    },
    array_unshift: {
      params: "array &$array, mixed ...$values",
      returns: "int",
      doc: "Prepend elements to the beginning of an array.",
    },
    array_merge: {
      params: "array ...$arrays",
      returns: "array",
      doc: "Merge one or more arrays.",
    },
    array_keys: {
      params: "array $array, mixed $filter_value = UNDEF, bool $strict = false",
      returns: "array",
      doc: "Return all the keys or a subset of the keys of an array.",
    },
    array_values: {
      params: "array $array",
      returns: "array",
      doc: "Return all the values of an array.",
    },
    array_map: {
      params: "?callable $callback, array $array, array ...$arrays",
      returns: "array",
      doc: "Applies the callback to the elements of the given arrays.",
    },
    array_filter: {
      params: "array $array, ?callable $callback = null, int $mode = 0",
      returns: "array",
      doc: "Filters elements of an array using a callback function.",
    },
    array_reduce: {
      params: "array $array, callable $callback, mixed $initial = null",
      returns: "mixed",
      doc: "Iteratively reduce the array to a single value using a callback.",
    },
    array_search: {
      params: "mixed $needle, array $haystack, bool $strict = false",
      returns: "int|string|false",
      doc: "Searches the array for a given value and returns the corresponding key.",
    },
    array_unique: {
      params: "array $array, int $flags = SORT_STRING",
      returns: "array",
      doc: "Removes duplicate values from an array.",
    },
    array_reverse: {
      params: "array $array, bool $preserve_keys = false",
      returns: "array",
      doc: "Return an array with elements in reverse order.",
    },
    array_slice: {
      params:
        "array $array, int $offset, ?int $length = null, bool $preserve_keys = false",
      returns: "array",
      doc: "Extract a slice of the array.",
    },
    array_splice: {
      params:
        "array &$array, int $offset, ?int $length = null, mixed $replacement = []",
      returns: "array",
      doc: "Remove a portion of the array and replace it.",
    },
    array_key_exists: {
      params: "string|int $key, array $array",
      returns: "bool",
      doc: "Checks if the given key or index exists in the array.",
    },
    array_combine: {
      params: "array $keys, array $values",
      returns: "array",
      doc: "Creates an array by using one array for keys and another for values.",
    },
    array_chunk: {
      params: "array $array, int $length, bool $preserve_keys = false",
      returns: "array",
      doc: "Split an array into chunks.",
    },
    array_flip: {
      params: "array $array",
      returns: "array",
      doc: "Exchanges all keys with their associated values.",
    },
    array_column: {
      params:
        "array $array, int|string|null $column_key, int|string|null $index_key = null",
      returns: "array",
      doc: "Return the values from a single column.",
    },
    array_diff: {
      params: "array $array, array ...$arrays",
      returns: "array",
      doc: "Computes the difference of arrays.",
    },
    array_intersect: {
      params: "array $array, array ...$arrays",
      returns: "array",
      doc: "Computes the intersection of arrays.",
    },
    array_sum: {
      params: "array $array",
      returns: "int|float",
      doc: "Calculate the sum of values in an array.",
    },
    array_count_values: {
      params: "array $array",
      returns: "array",
      doc: "Counts all the values of an array.",
    },
    array_fill: {
      params: "int $start_index, int $count, mixed $value",
      returns: "array",
      doc: "Fill an array with values.",
    },
    array_rand: {
      params: "array $array, int $num = 1",
      returns: "int|string|array",
      doc: "Pick one or more random keys from an array.",
    },
    array_walk: {
      params: "array &$array, callable $callback, mixed $arg = null",
      returns: "bool",
      doc: "Apply a user function to every member of an array.",
    },
    in_array: {
      params: "mixed $needle, array $haystack, bool $strict = false",
      returns: "bool",
      doc: "Checks if a value exists in an array.",
    },
    count: {
      params: "Countable|array $value, int $mode = COUNT_NORMAL",
      returns: "int",
      doc: "Counts all elements in an array or Countable object.",
    },
    sort: {
      params: "array &$array, int $flags = SORT_REGULAR",
      returns: "bool",
      doc: "Sorts an array in ascending order.",
    },
    rsort: {
      params: "array &$array, int $flags = SORT_REGULAR",
      returns: "bool",
      doc: "Sort an array in descending order.",
    },
    usort: {
      params: "array &$array, callable $callback",
      returns: "bool",
      doc: "Sort an array using a user-defined comparison function.",
    },
    ksort: {
      params: "array &$array, int $flags = SORT_REGULAR",
      returns: "bool",
      doc: "Sort an array by key in ascending order.",
    },
    asort: {
      params: "array &$array, int $flags = SORT_REGULAR",
      returns: "bool",
      doc: "Sort an array and maintain index association.",
    },
    shuffle: {
      params: "array &$array",
      returns: "bool",
      doc: "Shuffle an array.",
    },
    compact: {
      params: "array|string $var_name, array|string ...$var_names",
      returns: "array",
      doc: "Create array containing variables and their values.",
    },
    extract: {
      params: 'array &$array, int $flags = EXTR_OVERWRITE, string $prefix = ""',
      returns: "int",
      doc: "Import variables into the current symbol table from an array.",
    },
    range: {
      params:
        "string|int|float $start, string|int|float $end, int|float $step = 1",
      returns: "array",
      doc: "Create an array containing a range of elements.",
    },
    // --- File ---
    file_get_contents: {
      params:
        "string $filename, bool $use_include_path = false, ?resource $context = null, int $offset = 0, ?int $length = null",
      returns: "string|false",
      doc: "Reads entire file into a string.",
    },
    file_put_contents: {
      params:
        "string $filename, mixed $data, int $flags = 0, ?resource $context = null",
      returns: "int|false",
      doc: "Write data to a file.",
    },
    file_exists: {
      params: "string $filename",
      returns: "bool",
      doc: "Checks whether a file or directory exists.",
    },
    is_file: {
      params: "string $filename",
      returns: "bool",
      doc: "Tells whether the filename is a regular file.",
    },
    is_dir: {
      params: "string $filename",
      returns: "bool",
      doc: "Tells whether the filename is a directory.",
    },
    mkdir: {
      params:
        "string $directory, int $permissions = 0777, bool $recursive = false",
      returns: "bool",
      doc: "Makes a directory.",
    },
    unlink: {
      params: "string $filename",
      returns: "bool",
      doc: "Deletes a file.",
    },
    rename: {
      params: "string $from, string $to",
      returns: "bool",
      doc: "Renames a file or directory.",
    },
    copy: {
      params: "string $from, string $to",
      returns: "bool",
      doc: "Copies a file.",
    },
    fopen: {
      params: "string $filename, string $mode",
      returns: "resource|false",
      doc: "Opens file or URL.",
    },
    fclose: {
      params: "resource $stream",
      returns: "bool",
      doc: "Closes an open file pointer.",
    },
    fread: {
      params: "resource $stream, int $length",
      returns: "string|false",
      doc: "Binary-safe file read.",
    },
    fwrite: {
      params: "resource $stream, string $data, ?int $length = null",
      returns: "int|false",
      doc: "Binary-safe file write.",
    },
    fgets: {
      params: "resource $stream, ?int $length = null",
      returns: "string|false",
      doc: "Gets line from file pointer.",
    },
    glob: {
      params: "string $pattern, int $flags = 0",
      returns: "array|false",
      doc: "Find pathnames matching a pattern.",
    },
    realpath: {
      params: "string $path",
      returns: "string|false",
      doc: "Returns canonicalized absolute pathname.",
    },
    pathinfo: {
      params: "string $path, int $flags = PATHINFO_ALL",
      returns: "string|array",
      doc: "Returns information about a file path.",
    },
    basename: {
      params: 'string $path, string $suffix = ""',
      returns: "string",
      doc: "Returns trailing name component of path.",
    },
    dirname: {
      params: "string $path, int $levels = 1",
      returns: "string",
      doc: "Returns parent directory path.",
    },
    // --- Math ---
    abs: {
      params: "int|float $num",
      returns: "int|float",
      doc: "Absolute value.",
    },
    ceil: {
      params: "int|float $num",
      returns: "int",
      doc: "Round fractions up.",
    },
    floor: {
      params: "int|float $num",
      returns: "int",
      doc: "Round fractions down.",
    },
    round: {
      params:
        "int|float $num, int $precision = 0, int $mode = PHP_ROUND_HALF_UP",
      returns: "float",
      doc: "Rounds a float.",
    },
    max: {
      params: "mixed $value, mixed ...$values",
      returns: "mixed",
      doc: "Find highest value.",
    },
    min: {
      params: "mixed $value, mixed ...$values",
      returns: "mixed",
      doc: "Find lowest value.",
    },
    rand: {
      params: "int $min = 0, int $max = getrandmax()",
      returns: "int",
      doc: "Generate a random integer.",
    },
    random_int: {
      params: "int $min, int $max",
      returns: "int",
      doc: "Generate a cryptographically secure random integer.",
    },
    sqrt: { params: "float $num", returns: "float", doc: "Square root." },
    pow: {
      params: "mixed $base, mixed $exp",
      returns: "int|float",
      doc: "Exponential expression.",
    },
    log: {
      params: "float $num, float $base = M_E",
      returns: "float",
      doc: "Natural logarithm.",
    },
    // --- Type ---
    isset: {
      params: "mixed $var, mixed ...$vars",
      returns: "bool",
      doc: "Determine if a variable is declared and is not null.",
    },
    unset: {
      params: "mixed $var, mixed ...$vars",
      returns: "void",
      doc: "Unset a given variable.",
    },
    empty: {
      params: "mixed $var",
      returns: "bool",
      doc: "Determine whether a variable is empty.",
    },
    var_dump: {
      params: "mixed $value, mixed ...$values",
      returns: "void",
      doc: "Dumps information about a variable.",
    },
    print_r: {
      params: "mixed $value, bool $return = false",
      returns: "string|true",
      doc: "Prints human-readable information about a variable.",
    },
    var_export: {
      params: "mixed $value, bool $return = false",
      returns: "string|null",
      doc: "Outputs or returns a parsable string representation of a variable.",
    },
    gettype: {
      params: "mixed $value",
      returns: "string",
      doc: "Get the type of a variable.",
    },
    settype: {
      params: "mixed &$var, string $type",
      returns: "bool",
      doc: "Set the type of a variable.",
    },
    is_array: {
      params: "mixed $value",
      returns: "bool",
      doc: "Finds whether a variable is an array.",
    },
    is_string: {
      params: "mixed $value",
      returns: "bool",
      doc: "Find whether the type is string.",
    },
    is_int: {
      params: "mixed $value",
      returns: "bool",
      doc: "Find whether the type is integer.",
    },
    is_float: {
      params: "mixed $value",
      returns: "bool",
      doc: "Finds whether the type is float.",
    },
    is_bool: {
      params: "mixed $value",
      returns: "bool",
      doc: "Finds whether a variable is a boolean.",
    },
    is_null: {
      params: "mixed $value",
      returns: "bool",
      doc: "Finds whether a variable is null.",
    },
    is_numeric: {
      params: "mixed $value",
      returns: "bool",
      doc: "Finds whether a variable is a number or a numeric string.",
    },
    is_object: {
      params: "mixed $value",
      returns: "bool",
      doc: "Finds whether a variable is an object.",
    },
    is_callable: {
      params:
        "mixed $value, bool $syntax_only = false, ?string &$callable_name = null",
      returns: "bool",
      doc: "Verify that a value can be called as a function.",
    },
    intval: {
      params: "mixed $value, int $base = 10",
      returns: "int",
      doc: "Get the integer value of a variable.",
    },
    floatval: {
      params: "mixed $value",
      returns: "float",
      doc: "Get float value of a variable.",
    },
    strval: {
      params: "mixed $value",
      returns: "string",
      doc: "Get string value of a variable.",
    },
    boolval: {
      params: "mixed $value",
      returns: "bool",
      doc: "Get the boolean value of a variable.",
    },
    // --- Date/Time ---
    date: {
      params: "string $format, ?int $timestamp = null",
      returns: "string",
      doc: "Format a Unix timestamp.",
    },
    time: { params: "", returns: "int", doc: "Return current Unix timestamp." },
    strtotime: {
      params: "string $datetime, ?int $baseTimestamp = null",
      returns: "int|false",
      doc: "Parse English textual datetime to a Unix timestamp.",
    },
    mktime: {
      params:
        "int $hour, ?int $minute = null, ?int $second = null, ?int $month = null, ?int $day = null, ?int $year = null",
      returns: "int|false",
      doc: "Get Unix timestamp for a date.",
    },
    microtime: {
      params: "bool $as_float = false",
      returns: "string|float",
      doc: "Return current Unix timestamp with microseconds.",
    },
    // --- Output/Misc ---
    echo: {
      params: "string ...$expressions",
      returns: "void",
      doc: "Output one or more strings. Language construct.",
    },
    print: {
      params: "string $expression",
      returns: "int",
      doc: "Output a string. Returns 1.",
    },
    printf: {
      params: "string $format, mixed ...$values",
      returns: "int",
      doc: "Output a formatted string.",
    },
    die: {
      params: 'string|int $message = ""',
      returns: "never",
      doc: "Equivalent to exit. Terminates the script.",
    },
    exit: {
      params: 'string|int $status = ""',
      returns: "never",
      doc: "Output a message and terminate the current script.",
    },
    header: {
      params: "string $header, bool $replace = true, int $response_code = 0",
      returns: "void",
      doc: "Send a raw HTTP header.",
    },
    http_response_code: {
      params: "int $response_code = 0",
      returns: "int|bool",
      doc: "Get or Set the HTTP response code.",
    },
    setcookie: {
      params: 'string $name, string $value = "", int $expires = 0, ...',
      returns: "bool",
      doc: "Send a cookie.",
    },
    session_start: {
      params: "array $options = []",
      returns: "bool",
      doc: "Start new or resume existing session.",
    },
    session_destroy: {
      params: "",
      returns: "bool",
      doc: "Destroys all data registered to a session.",
    },
    error_log: {
      params: "string $message, int $message_type = 0",
      returns: "bool",
      doc: "Send an error message to the defined error handling routines.",
    },
    define: {
      params: "string $constant_name, mixed $value",
      returns: "bool",
      doc: "Defines a named constant.",
    },
    defined: {
      params: "string $constant_name",
      returns: "bool",
      doc: "Checks whether a given named constant exists.",
    },
    function_exists: {
      params: "string $function",
      returns: "bool",
      doc: "Return true if the given function has been defined.",
    },
    class_exists: {
      params: "string $class, bool $autoload = true",
      returns: "bool",
      doc: "Checks if the class has been defined.",
    },
    method_exists: {
      params: "object|string $object_or_class, string $method",
      returns: "bool",
      doc: "Checks if the class method exists.",
    },
    property_exists: {
      params: "object|string $object_or_class, string $property",
      returns: "bool",
      doc: "Checks if the object or class has a property.",
    },
    get_class: {
      params: "object $object",
      returns: "string",
      doc: "Returns the name of the class of an object.",
    },
    call_user_func: {
      params: "callable $callback, mixed ...$args",
      returns: "mixed",
      doc: "Call the callback given by the first parameter.",
    },
    call_user_func_array: {
      params: "callable $callback, array $args",
      returns: "mixed",
      doc: "Call a callback with an array of parameters.",
    },
    filter_var: {
      params:
        "mixed $value, int $filter = FILTER_DEFAULT, array|int $options = 0",
      returns: "mixed",
      doc: "Filters a variable with a specified filter.",
    },
    sleep: { params: "int $seconds", returns: "int", doc: "Delay execution." },
    usleep: {
      params: "int $microseconds",
      returns: "void",
      doc: "Delay execution in microseconds.",
    },
  };

  // ===================================================================
  // PHP SNIPPETS
  // ===================================================================
  const PHP_SNIPPETS = [
    { label: "php", detail: "PHP opening tag", insertText: "<?php\n\n${0}\n" },
    {
      label: "echoshort",
      detail: "Short echo tag",
      insertText: "<?= \\$${1:variable} ?>",
    },
    {
      label: "if",
      detail: "if statement",
      insertText: "if (${1:condition}) {\n\t${0}\n}",
    },
    {
      label: "ifelse",
      detail: "if-else statement",
      insertText: "if (${1:condition}) {\n\t${2}\n} else {\n\t${0}\n}",
    },
    {
      label: "ifelseif",
      detail: "if-elseif-else",
      insertText:
        "if (${1:condition}) {\n\t${2}\n} elseif (${3:condition}) {\n\t${4}\n} else {\n\t${0}\n}",
    },
    {
      label: "for",
      detail: "for loop",
      insertText:
        "for (\\$${1:i} = 0; \\$${1:i} < ${2:count}; \\$${1:i}++) {\n\t${0}\n}",
    },
    {
      label: "foreach",
      detail: "foreach loop",
      insertText:
        "foreach (\\$${1:array} as \\$${2:key} => \\$${3:value}) {\n\t${0}\n}",
    },
    {
      label: "foreachv",
      detail: "foreach value only",
      insertText: "foreach (\\$${1:array} as \\$${2:value}) {\n\t${0}\n}",
    },
    {
      label: "while",
      detail: "while loop",
      insertText: "while (${1:condition}) {\n\t${0}\n}",
    },
    {
      label: "dowhile",
      detail: "do-while loop",
      insertText: "do {\n\t${0}\n} while (${1:condition});",
    },
    {
      label: "switch",
      detail: "switch statement",
      insertText:
        "switch (\\$${1:variable}) {\n\tcase ${2:value}:\n\t\t${3}\n\t\tbreak;\n\tdefault:\n\t\t${0}\n\t\tbreak;\n}",
    },
    {
      label: "match",
      detail: "match expression (PHP 8.0+)",
      insertText:
        "\\$${1:result} = match (\\$${2:value}) {\n\t${3:pattern} => ${4:result},\n\tdefault => ${0:result},\n};",
    },
    {
      label: "function",
      detail: "function declaration",
      insertText: "function ${1:name}(${2:params}): ${3:void}\n{\n\t${0}\n}",
    },
    {
      label: "fn",
      detail: "arrow function (PHP 7.4+)",
      insertText: "fn(${1:params}) => ${0:expression}",
    },
    {
      label: "closure",
      detail: "anonymous function / closure",
      insertText: "function (${1:params}) use (\\$${2:var}) {\n\t${0}\n}",
    },
    {
      label: "class",
      detail: "class declaration",
      insertText:
        "class ${1:ClassName}\n{\n\tpublic function __construct(${2})\n\t{\n\t\t${3}\n\t}\n\n\t${0}\n}",
    },
    {
      label: "classext",
      detail: "class extends",
      insertText:
        "class ${1:ClassName} extends ${2:ParentClass}\n{\n\tpublic function __construct(${3})\n\t{\n\t\tparent::__construct(${4});\n\t\t${5}\n\t}\n\n\t${0}\n}",
    },
    {
      label: "abstract_class",
      detail: "abstract class",
      insertText: "abstract class ${1:ClassName}\n{\n\t${0}\n}",
    },
    {
      label: "interface",
      detail: "interface declaration",
      insertText:
        "interface ${1:InterfaceName}\n{\n\tpublic function ${2:method}(${3}): ${4:void};\n\n\t${0}\n}",
    },
    {
      label: "trait",
      detail: "trait declaration",
      insertText: "trait ${1:TraitName}\n{\n\t${0}\n}",
    },
    {
      label: "enum",
      detail: "enum declaration (PHP 8.1+)",
      insertText:
        "enum ${1:Name}: ${2:string}\n{\n\tcase ${3:Value} = '${4:value}';\n\t${0}\n}",
    },
    {
      label: "trycatch",
      detail: "try-catch block",
      insertText:
        "try {\n\t${1}\n} catch (${2:\\\\Exception} \\$${3:e}) {\n\t${0}\n}",
    },
    {
      label: "trycatchfinally",
      detail: "try-catch-finally",
      insertText:
        "try {\n\t${1}\n} catch (${2:\\\\Exception} \\$${3:e}) {\n\t${4}\n} finally {\n\t${0}\n}",
    },
    {
      label: "throw",
      detail: "throw exception",
      insertText: "throw new ${1:\\\\RuntimeException}('${2:message}');",
    },
    {
      label: "namespace",
      detail: "namespace declaration",
      insertText: "namespace ${1:App}\\\\${2:Namespace};\n\n${0}",
    },
    {
      label: "use",
      detail: "use statement",
      insertText: "use ${1:Namespace}\\\\${2:Class};",
    },
    {
      label: "pubf",
      detail: "public function",
      insertText: "public function ${1:name}(${2}): ${3:void}\n{\n\t${0}\n}",
    },
    {
      label: "prif",
      detail: "private function",
      insertText: "private function ${1:name}(${2}): ${3:void}\n{\n\t${0}\n}",
    },
    {
      label: "prof",
      detail: "protected function",
      insertText: "protected function ${1:name}(${2}): ${3:void}\n{\n\t${0}\n}",
    },
    {
      label: "pubsf",
      detail: "public static function",
      insertText:
        "public static function ${1:name}(${2}): ${3:void}\n{\n\t${0}\n}",
    },
    {
      label: "construct",
      detail: "__construct",
      insertText: "public function __construct(\n\t${1}\n) {\n\t${0}\n}",
    },
    {
      label: "promoted",
      detail: "constructor promotion (PHP 8.0+)",
      insertText:
        "public function __construct(\n\tprivate readonly ${1:string} \\$${2:property},\n) {}",
    },
    {
      label: "readonlyclass",
      detail: "readonly class (PHP 8.2+)",
      insertText:
        "readonly class ${1:ClassName}\n{\n\tpublic function __construct(\n\t\tpublic ${2:string} \\$${3:property},\n\t) {}\n}",
    },
    {
      label: "docblock",
      detail: "PHPDoc block",
      insertText:
        "/**\n * ${1:Description}\n *\n * @param ${2:type} \\$${3:param}\n * @return ${4:void}\n */",
    },
    {
      label: "array",
      detail: "array literal",
      insertText: "[${1:key} => ${2:value}, ${0}]",
    },
    {
      label: "log",
      detail: "error_log",
      insertText: "error_log(${1:'message'});",
    },
    {
      label: "dump",
      detail: "var_dump + die",
      insertText: "var_dump(\\$${1:variable}); die();",
    },
    {
      label: "ternary",
      detail: "ternary expression",
      insertText: "\\$${1:condition} ? ${2:true} : ${3:false}",
    },
    {
      label: "nullcoalesce",
      detail: "null coalescing",
      insertText: "\\$${1:value} ?? ${2:default}",
    },
  ];

  // ===================================================================
  // KEYWORDS & CONSTANTS
  // ===================================================================
  const phpKeywords = [
    "abstract",
    "and",
    "as",
    "break",
    "callable",
    "case",
    "catch",
    "class",
    "clone",
    "const",
    "continue",
    "declare",
    "default",
    "do",
    "else",
    "elseif",
    "enddeclare",
    "endfor",
    "endforeach",
    "endif",
    "endswitch",
    "endwhile",
    "enum",
    "extends",
    "final",
    "finally",
    "fn",
    "for",
    "foreach",
    "function",
    "global",
    "goto",
    "if",
    "implements",
    "include",
    "include_once",
    "instanceof",
    "insteadof",
    "interface",
    "match",
    "namespace",
    "new",
    "or",
    "print",
    "private",
    "protected",
    "public",
    "readonly",
    "require",
    "require_once",
    "return",
    "static",
    "switch",
    "throw",
    "trait",
    "try",
    "use",
    "var",
    "while",
    "xor",
    "yield",
    "true",
    "false",
    "null",
    "TRUE",
    "FALSE",
    "NULL",
  ];

  const phpTypeKeywords = [
    "array",
    "bool",
    "boolean",
    "float",
    "int",
    "integer",
    "iterable",
    "mixed",
    "never",
    "null",
    "object",
    "parent",
    "self",
    "string",
    "void",
  ];

  const phpConstants = [
    "PHP_EOL",
    "PHP_INT_MAX",
    "PHP_INT_MIN",
    "PHP_INT_SIZE",
    "PHP_VERSION",
    "PHP_MAJOR_VERSION",
    "PHP_OS",
    "STDIN",
    "STDOUT",
    "STDERR",
    "E_ALL",
    "E_ERROR",
    "E_WARNING",
    "E_NOTICE",
    "SORT_ASC",
    "SORT_DESC",
    "SORT_REGULAR",
    "SORT_NUMERIC",
    "SORT_STRING",
    "JSON_PRETTY_PRINT",
    "JSON_UNESCAPED_UNICODE",
    "JSON_THROW_ON_ERROR",
    "ARRAY_FILTER_USE_BOTH",
    "ARRAY_FILTER_USE_KEY",
    "PASSWORD_BCRYPT",
    "PASSWORD_DEFAULT",
    "PASSWORD_ARGON2I",
    "DIRECTORY_SEPARATOR",
    "PATH_SEPARATOR",
    "STR_PAD_LEFT",
    "STR_PAD_RIGHT",
    "STR_PAD_BOTH",
    "FILTER_VALIDATE_EMAIL",
    "FILTER_VALIDATE_URL",
    "FILTER_VALIDATE_IP",
    "FILTER_SANITIZE_STRING",
    "FILTER_DEFAULT",
    "COUNT_NORMAL",
    "PATHINFO_ALL",
    "PREG_SPLIT_NO_EMPTY",
  ];

  const superGlobalInfo = {
    $_GET:
      "HTTP GET variables. An associative array of variables passed via URL query parameters.",
    $_POST:
      "HTTP POST variables. An associative array of variables passed via the HTTP POST method.",
    $_REQUEST:
      "HTTP Request variables. Contains $_GET, $_POST, and $_COOKIE by default.",
    $_SERVER:
      "Server and execution environment information. Contains headers, paths, and script locations.",
    $_FILES:
      "HTTP File Upload variables. Items uploaded via HTTP POST file uploads.",
    $_COOKIE:
      "HTTP Cookies. An associative array of variables passed via HTTP Cookies.",
    $_SESSION: "Session variables. Available after session_start() is called.",
    $_ENV:
      "Environment variables. Set by the environment and available to the script.",
    $GLOBALS: "References all variables available in global scope.",
    $this: "Pseudo-variable referencing the current object instance.",
  };

  const keywordInfo = {
    class:
      "Defines a class — the fundamental building block of object-oriented PHP.",
    function: "Defines a function or method.",
    interface:
      "Defines an interface. Specifies a contract that implementing classes must follow.",
    trait:
      "Defines a trait for code reuse in single inheritance languages like PHP.",
    enum: "Defines an enumeration. Available since PHP 8.1.",
    abstract:
      "Defines an abstract class or method that must be implemented by child classes.",
    final:
      "Prevents a class from being inherited or a method from being overridden.",
    namespace:
      "Defines a namespace for organizing code and preventing name conflicts.",
    use: "Imports a namespace, class, function, or constant. Also includes traits in classes.",
    extends: "Indicates that a class inherits from another class.",
    implements: "Indicates that a class implements one or more interfaces.",
    return: "Returns a value from a function or method and ends its execution.",
    yield: "Used in generator functions to produce a series of values.",
    match:
      "Match expression with strict comparison and value return. PHP 8.0+.",
    fn: "Arrow function syntax for short closures. PHP 7.4+.",
    readonly:
      "Declares a property as readonly — can only be initialized once. PHP 8.1+.",
    static:
      "Declares static properties/methods. Also used for late static binding.",
    public: "Access modifier: member is visible from anywhere.",
    private:
      "Access modifier: member is visible only within the declaring class.",
    protected:
      "Access modifier: visible within the declaring class and its descendants.",
    try: "Begins a try-catch block for exception handling.",
    catch: "Catches an exception thrown within the corresponding try block.",
    finally:
      "Block that always executes after try/catch, regardless of exceptions.",
    throw: "Throws an exception.",
    new: "Creates a new instance of a class.",
    instanceof:
      "Checks whether an object is an instance of a specific class or interface.",
    foreach: "Iterates over arrays and Traversable objects.",
    for: "Creates a counting loop with init, condition, and increment expressions.",
    while: "Creates a loop that executes as long as the condition is true.",
    do: "Used with while to create a do-while loop (executes at least once).",
    switch: "Evaluates an expression and executes matching case blocks.",
    if: "Conditional statement — executes code if the condition evaluates to true.",
    else: "Alternative branch executed when the if condition is false.",
    elseif: "Alternative conditional branch.",
    declare:
      "Sets execution directives such as strict_types, ticks, or encoding.",
    const: "Defines a constant. Used in classes or at the namespace level.",
    global: "Imports a global variable into the current function scope.",
    include: "Includes and evaluates a file. Produces a warning on failure.",
    include_once: "Includes a file only if it has not been included before.",
    require:
      "Includes and evaluates a file. Produces a fatal error on failure.",
    require_once: "Requires a file only if it has not been included before.",
    callable:
      "Type hint indicating a parameter must be callable (function, closure, etc.).",
    clone: "Creates a shallow copy of an object.",
    var: "Legacy keyword for declaring class properties (use public/private/protected instead).",
    insteadof:
      "Resolves conflicts between traits by choosing which method to use.",
  };

  const magicMethods = [
    "__construct",
    "__destruct",
    "__call",
    "__callStatic",
    "__get",
    "__set",
    "__isset",
    "__unset",
    "__sleep",
    "__wakeup",
    "__serialize",
    "__unserialize",
    "__toString",
    "__invoke",
    "__set_state",
    "__clone",
    "__debugInfo",
  ];

  // ===================================================================
  // LANGUAGE CONFIGURATION
  // ===================================================================
  monaco.languages.setLanguageConfiguration("php", {
    comments: { lineComment: "//", blockComment: ["/*", "*/"] },
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
      { open: "/**", close: " */", notIn: ["string"] },
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
        start: /^\s*(\/\/\s*#?region\b|\/\*\s*#?region\b)/,
        end: /^\s*(\/\/\s*#?endregion\b|\/\*\s*#?endregion\b)/,
      },
    },
    indentationRules: {
      increaseIndentPattern: /^.*\{[^}"']*$|^.*\([^)"']*$/,
      decreaseIndentPattern: /^\s*[}\)]/,
    },
    onEnterRules: [
      {
        beforeText: /\/\*\*(?!\/)([^*]|\*(?!\/))*$/,
        afterText: /^\s*\*\/$/,
        action: {
          indentAction: monaco.languages.IndentAction.IndentOutdent,
          appendText: " * ",
        },
      },
      {
        beforeText: /\/\*\*(?!\/)([^*]|\*(?!\/))*$/,
        action: {
          indentAction: monaco.languages.IndentAction.None,
          appendText: " * ",
        },
      },
      {
        beforeText: /^\s*\*( ([^*]|\*(?!\/))*)?$/,
        action: {
          indentAction: monaco.languages.IndentAction.None,
          appendText: "* ",
        },
      },
    ],
    wordPattern:
      /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
  });

  // ===================================================================
  // MONARCH TOKENIZER
  // ===================================================================
  monaco.languages.setMonarchTokensProvider("php", {
    defaultToken: "",
    tokenPostfix: ".php",
    keywords: phpKeywords,
    typeKeywords: phpTypeKeywords,
    constants: phpConstants,

    brackets: [
      { open: "{", close: "}", token: "delimiter.curly" },
      { open: "[", close: "]", token: "delimiter.square" },
      { open: "(", close: ")", token: "delimiter.parenthesis" },
    ],

    tokenizer: {
      root: [
        [/<\?(php|=)?/, { token: "metatag", next: "@phpBlock" }],
        [/[\s\S]/, ""],
      ],

      phpBlock: [
        [/\?>/, { token: "metatag", next: "@root" }],
        { include: "@phpBody" },
      ],

      phpBody: [
        [/[ \t\r\n]+/, ""],
        [/\/\*\*(?!\/)/, "comment.doc", "@docComment"],
        [/\/\*/, "comment", "@blockComment"],
        [/\/\/.*$/, "comment"],
        [/#(?!\[).*$/, "comment"],

        [/#\[/, "annotation", "@attribute"],

        [/\$[a-zA-Z_]\w*/, "variable"],

        [
          /<<<\s*'(\w+)'\s*$/,
          { token: "string.heredoc.delimiter", next: "@nowdoc.$1" },
        ],
        [
          /<<<\s*"?(\w+)"?\s*$/,
          { token: "string.heredoc.delimiter", next: "@heredoc.$1" },
        ],

        [/"/, "string", "@stringDouble"],
        [/'/, "string", "@stringSingle"],

        [/0[xX][0-9a-fA-F_]+/, "number.hex"],
        [/0[bB][01_]+/, "number.binary"],
        [/0[oO][0-7_]+/, "number.octal"],
        [/\d[\d_]*\.[\d_]*([eE][-+]?\d[\d_]*)?/, "number.float"],
        [/\d[\d_]*[eE][-+]?\d[\d_]*/, "number.float"],
        [/\d[\d_]*/, "number"],

        [
          /[a-zA-Z_]\w*/,
          {
            cases: {
              "@keywords": "keyword",
              "@typeKeywords": "type.identifier",
              "@constants": "variable",
              "@default": "identifier",
            },
          },
        ],

        [/[{}()\[\]]/, "@brackets"],
        [/=>|->|\?\->|::/, "delimiter"],
        [/\.\.\./, "delimiter"],
        [/\?\?=?/, "delimiter"],
        [/<=>/, "delimiter"],
        [/[!<>]=?=?/, "delimiter"],
        [/[+\-*\/%]=?/, "delimiter"],
        [/&&|\|\|/, "delimiter"],
        [/[&|^~]/, "delimiter"],
        [/\.=?/, "delimiter"],
        [/=/, "delimiter"],
        [/@/, "delimiter"],
        [/[;,:]/, "delimiter"],
        [/\\/, "delimiter"],
      ],

      docComment: [
        [/@[a-zA-Z_]+/, "tag"],
        [/\*\//, "comment.doc", "@pop"],
        [/./, "comment.doc"],
      ],

      blockComment: [
        [/\*\//, "comment", "@pop"],
        [/./, "comment"],
      ],

      attribute: [[/\]/, "annotation", "@pop"], { include: "@phpBody" }],

      stringDouble: [
        [/\$[a-zA-Z_]\w*(?:->[\w]+)*/, "variable"],
        [/\{\$/, { token: "variable", next: "@stringInterp" }],
        [/\\[\\nrtve\$"0-7xuU]/, "string.escape"],
        [/"/, "string", "@pop"],
        [/./, "string"],
      ],

      stringInterp: [
        [/\}/, { token: "variable", next: "@pop" }],
        { include: "@phpBody" },
      ],

      stringSingle: [
        [/\\['\\]/, "string.escape"],
        [/'/, "string", "@pop"],
        [/./, "string"],
      ],

      heredoc: [
        [
          /^\s*(\w+);?\s*$/,
          {
            cases: {
              "$1==$S2": { token: "string.heredoc.delimiter", next: "@pop" },
              "@default": "string",
            },
          },
        ],
        [/\$[a-zA-Z_]\w*/, "variable"],
        [/\\[\\nrtve\$]/, "string.escape"],
        [/./, "string"],
      ],

      nowdoc: [
        [
          /^\s*(\w+);?\s*$/,
          {
            cases: {
              "$1==$S2": { token: "string.heredoc.delimiter", next: "@pop" },
              "@default": "string",
            },
          },
        ],
        [/./, "string"],
      ],
    },
  });

  // ===================================================================
  // COMPLETION PROVIDER
  // ===================================================================
  monaco.languages.registerCompletionItemProvider("php", {
    triggerCharacters: ["$", ">", ":", "\\"],

    provideCompletionItems: function (model, position) {
      var word = model.getWordUntilPosition(position);
      var range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };

      var lineContent = model.getLineContent(position.lineNumber);
      var textBefore = lineContent.substring(0, position.column - 1);
      var suggestions = [];

      // Variable context: $ before current word
      var varMatch = textBefore.match(/\$(\w*)$/);
      if (varMatch) {
        var varRange = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: position.column - varMatch[0].length,
          endColumn: word.endColumn,
        };

        // Scan file for variable names
        var text = model.getValue();
        var varRegex = /\$([a-zA-Z_]\w*)/g;
        var seen = {};
        var m;
        while ((m = varRegex.exec(text)) !== null) {
          if (!seen[m[0]]) {
            seen[m[0]] = true;
            suggestions.push({
              label: m[0],
              kind: monaco.languages.CompletionItemKind.Variable,
              insertText: m[0],
              range: varRange,
              detail: "variable",
              sortText: "0_" + m[0],
            });
          }
        }

        // Superglobals
        Object.keys(superGlobalInfo).forEach(function (sg) {
          if (!seen[sg]) {
            suggestions.push({
              label: sg,
              kind: monaco.languages.CompletionItemKind.Variable,
              insertText: sg,
              range: varRange,
              detail: "superglobal",
              documentation: superGlobalInfo[sg],
              sortText: "1_" + sg,
            });
          }
        });

        return { suggestions: suggestions };
      }

      // After -> : suggest methods from the file
      var arrowMatch = textBefore.match(/->(\w*)$/);
      if (arrowMatch) {
        var arrowRange = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: position.column - arrowMatch[1].length,
          endColumn: word.endColumn,
        };
        var text2 = model.getValue();
        var methRegex =
          /(?:public|private|protected)\s+(?:static\s+)?function\s+(\w+)\s*\(/g;
        var seen2 = {};
        var m2;
        while ((m2 = methRegex.exec(text2)) !== null) {
          if (!seen2[m2[1]] && m2[1] !== "__construct") {
            seen2[m2[1]] = true;
            suggestions.push({
              label: m2[1],
              kind: monaco.languages.CompletionItemKind.Method,
              insertText: m2[1] + "($0)",
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: arrowRange,
            });
          }
        }
        // Also add common magic methods
        magicMethods.forEach(function (mm) {
          if (!seen2[mm]) {
            suggestions.push({
              label: mm,
              kind: monaco.languages.CompletionItemKind.Method,
              insertText: mm + "($0)",
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: arrowRange,
              detail: "magic method",
            });
          }
        });

        // Add properties found in file
        var propRegex =
          /(?:public|private|protected)\s+(?:readonly\s+)?(?:\?\s*)?(?:\w+\s+)?\$(\w+)/g;
        var m3;
        while ((m3 = propRegex.exec(text2)) !== null) {
          if (!seen2[m3[1]]) {
            seen2[m3[1]] = true;
            suggestions.push({
              label: m3[1],
              kind: monaco.languages.CompletionItemKind.Property,
              insertText: m3[1],
              range: arrowRange,
            });
          }
        }

        return { suggestions: suggestions };
      }

      // After :: : suggest static methods/constants
      var staticMatch = textBefore.match(/::(\w*)$/);
      if (staticMatch) {
        var staticRange = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: position.column - staticMatch[1].length,
          endColumn: word.endColumn,
        };
        var staticItems = [
          "class",
          "create",
          "find",
          "findOrFail",
          "where",
          "all",
          "count",
          "query",
          "make",
        ];
        staticItems.forEach(function (item) {
          suggestions.push({
            label: item,
            kind: monaco.languages.CompletionItemKind.Method,
            insertText: item === "class" ? item : item + "($0)",
            insertTextRules:
              item === "class"
                ? undefined
                : monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: staticRange,
          });
        });
        return { suggestions: suggestions };
      }

      // Default: keywords, functions, snippets
      // Keywords
      phpKeywords.forEach(function (kw) {
        suggestions.push({
          label: kw,
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: kw,
          range: range,
          sortText: "2_" + kw,
        });
      });

      // Type keywords
      phpTypeKeywords.forEach(function (t) {
        suggestions.push({
          label: t,
          kind: monaco.languages.CompletionItemKind.TypeParameter,
          insertText: t,
          range: range,
          sortText: "2_" + t,
        });
      });

      // Constants
      phpConstants.forEach(function (c) {
        suggestions.push({
          label: c,
          kind: monaco.languages.CompletionItemKind.Constant,
          insertText: c,
          range: range,
          sortText: "3_" + c,
        });
      });

      // Built-in functions
      Object.keys(PHP_FUNCTIONS).forEach(function (name) {
        var info = PHP_FUNCTIONS[name];
        suggestions.push({
          label: name,
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: name + "($0)",
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          detail: name + "(" + info.params + "): " + info.returns,
          documentation: { value: info.doc },
          range: range,
          sortText: "1_" + name,
        });
      });

      // User-defined functions/classes from the file
      var fileText = model.getValue();
      var userFuncRegex = /function\s+(\w+)\s*\(/g;
      var uf;
      var seenUser = {};
      while ((uf = userFuncRegex.exec(fileText)) !== null) {
        if (!seenUser[uf[1]] && !PHP_FUNCTIONS[uf[1]]) {
          seenUser[uf[1]] = true;
          suggestions.push({
            label: uf[1],
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: uf[1] + "($0)",
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: "function (user-defined)",
            range: range,
            sortText: "0_" + uf[1],
          });
        }
      }
      var userClassRegex = /(?:class|interface|trait|enum)\s+(\w+)/g;
      var uc;
      while ((uc = userClassRegex.exec(fileText)) !== null) {
        if (!seenUser[uc[1]]) {
          seenUser[uc[1]] = true;
          suggestions.push({
            label: uc[1],
            kind: monaco.languages.CompletionItemKind.Class,
            insertText: uc[1],
            detail: "class (user-defined)",
            range: range,
            sortText: "0_" + uc[1],
          });
        }
      }

      // Magic methods
      magicMethods.forEach(function (mm) {
        suggestions.push({
          label: mm,
          kind: monaco.languages.CompletionItemKind.Method,
          insertText: mm,
          detail: "magic method",
          range: range,
          sortText: "3_" + mm,
        });
      });

      // Snippets
      PHP_SNIPPETS.forEach(function (s) {
        suggestions.push({
          label: s.label,
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: s.insertText,
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          detail: "✦ " + s.detail,
          documentation: { value: "Snippet: " + s.detail },
          range: range,
          sortText: "4_" + s.label,
        });
      });

      return { suggestions: suggestions };
    },
  });

  // ===================================================================
  // HOVER PROVIDER
  // ===================================================================
  monaco.languages.registerHoverProvider("php", {
    provideHover: function (model, position) {
      var wordInfo = model.getWordAtPosition(position);
      if (!wordInfo) return null;

      var w = wordInfo.word;
      var lineContent = model.getLineContent(position.lineNumber);
      var charBefore =
        wordInfo.startColumn > 1
          ? lineContent.charAt(wordInfo.startColumn - 2)
          : "";

      // Variable hover
      if (charBefore === "$") {
        var varName = "$" + w;
        if (superGlobalInfo[varName]) {
          return {
            range: new monaco.Range(
              position.lineNumber,
              wordInfo.startColumn - 1,
              position.lineNumber,
              wordInfo.endColumn,
            ),
            contents: [
              { value: "```php\n(superglobal) " + varName + ": array\n```" },
              { value: superGlobalInfo[varName] },
            ],
          };
        }

        // Search for variable type annotations in the file
        var fileText = model.getValue();
        var typeAnnotRegex = new RegExp(
          "@var\\s+([\\w|\\\\?]+)\\s+\\$" + w + "\\b",
        );
        var typeMatch = typeAnnotRegex.exec(fileText);

        var paramRegex = new RegExp(
          "(?:(?:public|private|protected|readonly)\\s+)*([\\w|\\\\?]+)\\s+\\$" +
            w +
            "\\b",
        );
        var paramMatch = paramRegex.exec(fileText);

        var typeStr = typeMatch
          ? typeMatch[1]
          : paramMatch
            ? paramMatch[1]
            : "mixed";

        return {
          range: new monaco.Range(
            position.lineNumber,
            wordInfo.startColumn - 1,
            position.lineNumber,
            wordInfo.endColumn,
          ),
          contents: [
            {
              value: "```php\n(variable) " + varName + ": " + typeStr + "\n```",
            },
          ],
        };
      }

      // Function hover
      if (PHP_FUNCTIONS[w]) {
        var fn = PHP_FUNCTIONS[w];
        return {
          range: new monaco.Range(
            position.lineNumber,
            wordInfo.startColumn,
            position.lineNumber,
            wordInfo.endColumn,
          ),
          contents: [
            {
              value:
                "```php\nfunction " +
                w +
                "(" +
                fn.params +
                "): " +
                fn.returns +
                "\n```",
            },
            { value: fn.doc },
          ],
        };
      }

      // Keyword hover
      if (keywordInfo[w]) {
        return {
          range: new monaco.Range(
            position.lineNumber,
            wordInfo.startColumn,
            position.lineNumber,
            wordInfo.endColumn,
          ),
          contents: [
            { value: "```php\n(keyword) " + w + "\n```" },
            { value: keywordInfo[w] },
          ],
        };
      }

      // User-defined function hover
      var fileText2 = model.getValue();
      var funcDefRegex = new RegExp(
        "(?:\\/\\*\\*([\\s\\S]*?)\\*\\/\\s*)?(?:(?:public|private|protected|static|abstract|final)\\s+)*function\\s+" +
          w +
          "\\s*\\(([^)]*)\\)(?:\\s*:\\s*([\\w|\\\\?]+))?",
        "m",
      );
      var funcMatch = funcDefRegex.exec(fileText2);
      if (funcMatch) {
        var docStr = "";
        if (funcMatch[1]) {
          docStr = funcMatch[1].replace(/^\s*\*\s?/gm, "").trim();
        }
        var params = funcMatch[2] || "";
        var retType = funcMatch[3] || "void";
        var contents = [
          {
            value:
              "```php\nfunction " +
              w +
              "(" +
              params.trim() +
              "): " +
              retType +
              "\n```",
          },
        ];
        if (docStr) contents.push({ value: docStr });
        return {
          range: new monaco.Range(
            position.lineNumber,
            wordInfo.startColumn,
            position.lineNumber,
            wordInfo.endColumn,
          ),
          contents: contents,
        };
      }

      // Class/interface/trait/enum hover
      var classRegex = new RegExp(
        "(class|interface|trait|enum)\\s+" + w + "\\b",
      );
      var classMatch = classRegex.exec(fileText2);
      if (classMatch) {
        return {
          range: new monaco.Range(
            position.lineNumber,
            wordInfo.startColumn,
            position.lineNumber,
            wordInfo.endColumn,
          ),
          contents: [{ value: "```php\n" + classMatch[1] + " " + w + "\n```" }],
        };
      }

      return null;
    },
  });

  // ===================================================================
  // DEFINITION PROVIDER
  // ===================================================================
  monaco.languages.registerDefinitionProvider("php", {
    provideDefinition: function (model, position) {
      var wordInfo = model.getWordAtPosition(position);
      if (!wordInfo) return null;

      var w = wordInfo.word;
      var text = model.getValue();
      var results = [];

      // Function definitions
      var funcRegex = new RegExp("function\\s+(" + w + ")\\s*\\(", "gm");
      var m;
      while ((m = funcRegex.exec(text)) !== null) {
        var pos = model.getPositionAt(m.index + m[0].indexOf(m[1]));
        results.push({
          uri: model.uri,
          range: new monaco.Range(
            pos.lineNumber,
            pos.column,
            pos.lineNumber,
            pos.column + m[1].length,
          ),
        });
      }

      // Class/interface/trait/enum definitions
      var classRegex = new RegExp(
        "(?:class|interface|trait|enum)\\s+(" + w + ")\\b",
        "gm",
      );
      while ((m = classRegex.exec(text)) !== null) {
        var pos2 = model.getPositionAt(m.index + m[0].indexOf(m[1]));
        results.push({
          uri: model.uri,
          range: new monaco.Range(
            pos2.lineNumber,
            pos2.column,
            pos2.lineNumber,
            pos2.column + m[1].length,
          ),
        });
      }

      // Constant definitions
      var constRegex = new RegExp("const\\s+(" + w + ")\\s*=", "gm");
      while ((m = constRegex.exec(text)) !== null) {
        var pos3 = model.getPositionAt(m.index + m[0].indexOf(m[1]));
        results.push({
          uri: model.uri,
          range: new monaco.Range(
            pos3.lineNumber,
            pos3.column,
            pos3.lineNumber,
            pos3.column + m[1].length,
          ),
        });
      }

      // Variable definitions (for $variables) - look at char before word
      var lineContent = model.getLineContent(position.lineNumber);
      var charBefore =
        wordInfo.startColumn > 1
          ? lineContent.charAt(wordInfo.startColumn - 2)
          : "";
      if (charBefore === "$") {
        var varRegex = new RegExp("\\$(" + w + ")\\s*=", "gm");
        while ((m = varRegex.exec(text)) !== null) {
          var pos4 = model.getPositionAt(m.index);
          results.push({
            uri: model.uri,
            range: new monaco.Range(
              pos4.lineNumber,
              pos4.column,
              pos4.lineNumber,
              pos4.column + m[0].length - 1,
            ),
          });
        }
        // Also match parameter definitions
        var paramRegex = new RegExp(
          "[,(]\\s*(?:[\\w|\\\\?]+\\s+)?\\$(" + w + ")\\b",
          "gm",
        );
        while ((m = paramRegex.exec(text)) !== null) {
          var idx = m.index + m[0].indexOf("$" + w);
          var pos5 = model.getPositionAt(idx);
          results.push({
            uri: model.uri,
            range: new monaco.Range(
              pos5.lineNumber,
              pos5.column,
              pos5.lineNumber,
              pos5.column + w.length + 1,
            ),
          });
        }
      }

      return results;
    },
  });

  // ===================================================================
  // SIGNATURE HELP PROVIDER
  // ===================================================================
  monaco.languages.registerSignatureHelpProvider("php", {
    signatureHelpTriggerCharacters: ["(", ","],
    signatureHelpRetriggerCharacters: [","],

    provideSignatureHelp: function (model, position) {
      var startLine = Math.max(1, position.lineNumber - 20);
      var textUntil = model.getValueInRange({
        startLineNumber: startLine,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });

      // Walk backwards to find the function call context
      var depth = 0;
      var parenPos = -1;
      var activeParam = 0;
      var inString = false;
      var stringChar = "";

      for (var i = textUntil.length - 1; i >= 0; i--) {
        var ch = textUntil[i];

        if (inString) {
          if (ch === stringChar && textUntil[i - 1] !== "\\") {
            inString = false;
          }
          continue;
        }

        if (ch === '"' || ch === "'") {
          inString = true;
          stringChar = ch;
          continue;
        }

        if (ch === ")") {
          depth++;
          continue;
        }
        if (ch === "(") {
          if (depth === 0) {
            parenPos = i;
            break;
          }
          depth--;
          continue;
        }
        if (ch === "," && depth === 0) {
          activeParam++;
        }
      }

      if (parenPos <= 0) return null;

      var beforeParen = textUntil.substring(0, parenPos).trimEnd();
      var funcMatch = beforeParen.match(/([a-zA-Z_]\w*)$/);
      if (!funcMatch) return null;

      var funcName = funcMatch[1];
      var funcInfo = PHP_FUNCTIONS[funcName];

      if (!funcInfo) {
        // Try user-defined functions
        var fullText = model.getValue();
        var userDefRegex = new RegExp(
          "function\\s+" +
            funcName +
            "\\s*\\(([^)]*)\\)(?:\\s*:\\s*([\\w|\\\\?]+))?",
        );
        var userMatch = userDefRegex.exec(fullText);
        if (userMatch) {
          funcInfo = {
            params: userMatch[1].trim(),
            returns: userMatch[2] || "mixed",
            doc: "User-defined function",
          };
        }
      }

      if (!funcInfo) return null;

      var rawParams = funcInfo.params;
      // Split params carefully (handle nested generics, etc.)
      var params = [];
      var pDepth = 0;
      var current = "";
      for (var j = 0; j < rawParams.length; j++) {
        var c = rawParams[j];
        if (c === "(" || c === "<") pDepth++;
        else if (c === ")" || c === ">") pDepth--;
        else if (c === "," && pDepth === 0) {
          params.push(current.trim());
          current = "";
          continue;
        }
        current += c;
      }
      if (current.trim()) params.push(current.trim());

      return {
        value: {
          signatures: [
            {
              label:
                funcName + "(" + funcInfo.params + "): " + funcInfo.returns,
              documentation: funcInfo.doc,
              parameters: params.map(function (p) {
                return { label: p, documentation: "" };
              }),
            },
          ],
          activeSignature: 0,
          activeParameter: Math.min(
            activeParam,
            Math.max(params.length - 1, 0),
          ),
        },
        dispose: function () {},
      };
    },
  });

  // ===================================================================
  // DOCUMENT SYMBOL PROVIDER (Outline / Breadcrumbs)
  // ===================================================================
  monaco.languages.registerDocumentSymbolProvider("php", {
    provideDocumentSymbols: function (model) {
      var symbols = [];
      var text = model.getValue();
      var lines = text.split("\n");

      var patterns = [
        {
          regex: /^\s*(?:abstract\s+)?(?:final\s+)?class\s+(\w+)/,
          kind: monaco.languages.SymbolKind.Class,
        },
        {
          regex: /^\s*interface\s+(\w+)/,
          kind: monaco.languages.SymbolKind.Interface,
        },
        { regex: /^\s*trait\s+(\w+)/, kind: monaco.languages.SymbolKind.Class },
        { regex: /^\s*enum\s+(\w+)/, kind: monaco.languages.SymbolKind.Enum },
        {
          regex:
            /^\s*(?:public|private|protected|static|abstract|final|\s)*function\s+(\w+)\s*\(/,
          kind: monaco.languages.SymbolKind.Function,
        },
        {
          regex:
            /^\s*(?:public|private|protected)\s+(?:readonly\s+)?(?:static\s+)?(?:[\w|\\?]+\s+)?const\s+(\w+)/,
          kind: monaco.languages.SymbolKind.Constant,
        },
        {
          regex: /^\s*const\s+(\w+)/,
          kind: monaco.languages.SymbolKind.Constant,
        },
        {
          regex: /^\s*namespace\s+([\w\\]+)/,
          kind: monaco.languages.SymbolKind.Namespace,
        },
      ];

      for (var i = 0; i < lines.length; i++) {
        for (var p = 0; p < patterns.length; p++) {
          var m = patterns[p].regex.exec(lines[i]);
          if (m) {
            symbols.push({
              name: m[1],
              kind: patterns[p].kind,
              range: new monaco.Range(i + 1, 1, i + 1, lines[i].length + 1),
              selectionRange: new monaco.Range(
                i + 1,
                m.index + 1,
                i + 1,
                m.index + m[0].length + 1,
              ),
            });
          }
        }
      }

      return symbols;
    },
  });
};
