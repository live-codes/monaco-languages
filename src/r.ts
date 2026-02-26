import type * as Monaco from "monaco-editor";

export default (monaco: typeof Monaco) => {
  /* ═══════════════════════════════════════════════════════
   R FUNCTION DATABASE
   ═══════════════════════════════════════════════════════ */
  var RD = {
    print: {
      s: "print(x, ...)",
      d: "Print an R object to the console. Generic function that dispatches to specific methods based on object class.",
      p: "base",
    },
    cat: {
      s: 'cat(..., file = "", sep = " ", fill = FALSE, append = FALSE)',
      d: "Concatenate and print. Outputs objects by concatenating their string representations with the given separator.",
      p: "base",
    },
    paste: {
      s: 'paste(..., sep = " ", collapse = NULL)',
      d: "Concatenate strings. Converts arguments to character and joins them with the separator.",
      p: "base",
    },
    paste0: {
      s: "paste0(..., collapse = NULL)",
      d: 'Concatenate strings with no separator (equivalent to paste(..., sep = "")).',
      p: "base",
    },
    sprintf: {
      s: "sprintf(fmt, ...)",
      d: "Return a formatted string using C-style format specifiers like %d, %f, %s, %e, etc.",
      p: "base",
    },
    format: {
      s: "format(x, ...)",
      d: "Format an R object for pretty printing. Controls width, digits, scientific notation, etc.",
      p: "base",
    },
    message: {
      s: "message(..., domain = NULL, appendLF = TRUE)",
      d: "Generate a diagnostic message. Messages can be suppressed with suppressMessages().",
      p: "base",
    },
    formatC: {
      s: 'formatC(x, digits = NULL, width = NULL, format = NULL, flag = "")',
      d: "Format numbers and strings with C-style formatting.",
      p: "base",
    },
    writeLines: {
      s: 'writeLines(text, con = stdout(), sep = "\\n")',
      d: "Write character strings to a connection, one element per line.",
      p: "base",
    },
    readline: {
      s: 'readline(prompt = "")',
      d: "Read a line from the terminal (in interactive sessions).",
      p: "base",
    },
    nchar: {
      s: 'nchar(x, type = "bytes")',
      d: "Return the number of characters (or bytes or width) in a character vector.",
      p: "base",
    },
    substr: {
      s: "substr(x, start, stop)",
      d: "Extract or replace substrings. Returns characters from position start to stop.",
      p: "base",
    },
    substring: {
      s: "substring(text, first, last = 1000000L)",
      d: "Extract substrings. More flexible than substr; supports vectorized first/last arguments.",
      p: "base",
    },
    grep: {
      s: "grep(pattern, x, ignore.case = FALSE, value = FALSE, fixed = FALSE)",
      d: "Search for pattern matches. Returns indices (or values if value=TRUE) of matching elements.",
      p: "base",
    },
    grepl: {
      s: "grepl(pattern, x, ignore.case = FALSE, fixed = FALSE)",
      d: "Test for pattern matches. Returns a logical vector indicating which elements match.",
      p: "base",
    },
    sub: {
      s: "sub(pattern, replacement, x, ignore.case = FALSE, fixed = FALSE)",
      d: "Replace the first occurrence of a pattern in each element of x.",
      p: "base",
    },
    gsub: {
      s: "gsub(pattern, replacement, x, ignore.case = FALSE, fixed = FALSE)",
      d: "Replace all occurrences of a pattern in each element of x.",
      p: "base",
    },
    strsplit: {
      s: "strsplit(x, split, fixed = FALSE)",
      d: "Split elements of a character vector by the specified delimiter. Returns a list.",
      p: "base",
    },
    toupper: {
      s: "toupper(x)",
      d: "Convert all characters in a string to upper case.",
      p: "base",
    },
    tolower: {
      s: "tolower(x)",
      d: "Convert all characters in a string to lower case.",
      p: "base",
    },
    trimws: {
      s: 'trimws(x, which = "both")',
      d: "Remove leading and/or trailing whitespace from character strings.",
      p: "base",
    },
    startsWith: {
      s: "startsWith(x, prefix)",
      d: "Test whether strings start with the specified prefix.",
      p: "base",
    },
    endsWith: {
      s: "endsWith(x, suffix)",
      d: "Test whether strings end with the specified suffix.",
      p: "base",
    },
    regexpr: {
      s: "regexpr(pattern, text, ignore.case = FALSE)",
      d: "Find the first match of a pattern in each string. Returns match positions and lengths.",
      p: "base",
    },
    regmatches: {
      s: "regmatches(x, m)",
      d: "Extract or replace matched substrings from match data returned by regexpr or gregexpr.",
      p: "base",
    },
    chartr: {
      s: "chartr(old, new, x)",
      d: "Character translation: replaces each character in old with the corresponding character in new.",
      p: "base",
    },
    abs: {
      s: "abs(x)",
      d: "Compute the absolute value of a numeric vector.",
      p: "base",
    },
    sqrt: {
      s: "sqrt(x)",
      d: "Compute the square root. Returns NaN for negative inputs.",
      p: "base",
    },
    exp: { s: "exp(x)", d: "Compute the exponential function e^x.", p: "base" },
    log: {
      s: "log(x, base = exp(1))",
      d: "Compute logarithms. Default is natural log (base e).",
      p: "base",
    },
    log2: { s: "log2(x)", d: "Compute base-2 logarithm.", p: "base" },
    log10: {
      s: "log10(x)",
      d: "Compute base-10 (common) logarithm.",
      p: "base",
    },
    ceiling: {
      s: "ceiling(x)",
      d: "Round up to the smallest integer not less than x.",
      p: "base",
    },
    floor: {
      s: "floor(x)",
      d: "Round down to the largest integer not greater than x.",
      p: "base",
    },
    round: {
      s: "round(x, digits = 0)",
      d: "Round to the specified number of decimal places.",
      p: "base",
    },
    trunc: {
      s: "trunc(x)",
      d: "Truncate towards zero (remove the fractional part).",
      p: "base",
    },
    sign: {
      s: "sign(x)",
      d: "Return the sign of a number: -1, 0, or 1.",
      p: "base",
    },
    factorial: {
      s: "factorial(x)",
      d: "Compute the factorial x! = 1 * 2 * ... * x.",
      p: "base",
    },
    choose: {
      s: "choose(n, k)",
      d: 'Compute binomial coefficients "n choose k".',
      p: "base",
    },
    cumsum: {
      s: "cumsum(x)",
      d: "Compute cumulative sums of a numeric vector.",
      p: "base",
    },
    cumprod: {
      s: "cumprod(x)",
      d: "Compute cumulative products of a numeric vector.",
      p: "base",
    },
    cummax: {
      s: "cummax(x)",
      d: "Compute cumulative maxima of a numeric vector.",
      p: "base",
    },
    cummin: {
      s: "cummin(x)",
      d: "Compute cumulative minima of a numeric vector.",
      p: "base",
    },
    sin: {
      s: "sin(x)",
      d: "Compute the sine (argument in radians).",
      p: "base",
    },
    cos: {
      s: "cos(x)",
      d: "Compute the cosine (argument in radians).",
      p: "base",
    },
    tan: {
      s: "tan(x)",
      d: "Compute the tangent (argument in radians).",
      p: "base",
    },
    sum: {
      s: "sum(..., na.rm = FALSE)",
      d: "Compute the sum of all values. Set na.rm=TRUE to remove NAs.",
      p: "base",
    },
    prod: {
      s: "prod(..., na.rm = FALSE)",
      d: "Compute the product of all values in its arguments.",
      p: "base",
    },
    mean: {
      s: "mean(x, trim = 0, na.rm = FALSE)",
      d: "Compute the arithmetic mean. Use trim for trimmed mean.",
      p: "base",
    },
    median: {
      s: "median(x, na.rm = FALSE)",
      d: "Compute the sample median.",
      p: "stats",
    },
    var: {
      s: "var(x, y = NULL, na.rm = FALSE, use)",
      d: "Compute the variance (or covariance if y is provided).",
      p: "stats",
    },
    sd: {
      s: "sd(x, na.rm = FALSE)",
      d: "Compute the standard deviation.",
      p: "stats",
    },
    cor: {
      s: 'cor(x, y = NULL, use = "everything", method = "pearson")',
      d: 'Compute correlation. Methods: "pearson", "kendall", "spearman".',
      p: "stats",
    },
    cov: {
      s: 'cov(x, y = NULL, use = "everything", method = "pearson")',
      d: "Compute covariance between x and y.",
      p: "stats",
    },
    range: {
      s: "range(..., na.rm = FALSE)",
      d: "Return a vector of the minimum and maximum values.",
      p: "base",
    },
    min: {
      s: "min(..., na.rm = FALSE)",
      d: "Return the minimum value among all arguments.",
      p: "base",
    },
    max: {
      s: "max(..., na.rm = FALSE)",
      d: "Return the maximum value among all arguments.",
      p: "base",
    },
    quantile: {
      s: "quantile(x, probs = seq(0, 1, 0.25), na.rm = FALSE)",
      d: "Compute sample quantiles corresponding to the given probabilities.",
      p: "stats",
    },
    scale: {
      s: "scale(x, center = TRUE, scale = TRUE)",
      d: "Center and/or scale a numeric matrix.",
      p: "base",
    },
    rnorm: {
      s: "rnorm(n, mean = 0, sd = 1)",
      d: "Generate n random deviates from the normal distribution.",
      p: "stats",
    },
    runif: {
      s: "runif(n, min = 0, max = 1)",
      d: "Generate n random deviates from the uniform distribution.",
      p: "stats",
    },
    dnorm: {
      s: "dnorm(x, mean = 0, sd = 1, log = FALSE)",
      d: "Normal density function.",
      p: "stats",
    },
    pnorm: {
      s: "pnorm(q, mean = 0, sd = 1, lower.tail = TRUE)",
      d: "Normal cumulative distribution function.",
      p: "stats",
    },
    qnorm: {
      s: "qnorm(p, mean = 0, sd = 1, lower.tail = TRUE)",
      d: "Normal quantile function (inverse CDF).",
      p: "stats",
    },
    rbinom: {
      s: "rbinom(n, size, prob)",
      d: "Generate random deviates from the binomial distribution.",
      p: "stats",
    },
    sample: {
      s: "sample(x, size, replace = FALSE, prob = NULL)",
      d: "Take a random sample of specified size from a vector.",
      p: "base",
    },
    "set.seed": {
      s: "set.seed(seed)",
      d: "Set the random number generator seed for reproducibility.",
      p: "base",
    },
    lm: {
      s: "lm(formula, data, subset, weights, na.action)",
      d: "Fit linear models. Formula syntax: y ~ x1 + x2.",
      p: "stats",
    },
    glm: {
      s: "glm(formula, family = gaussian, data)",
      d: "Fit generalized linear models.",
      p: "stats",
    },
    predict: {
      s: "predict(object, newdata, ...)",
      d: "Obtain predictions from a fitted model object.",
      p: "stats",
    },
    "t.test": {
      s: 't.test(x, y = NULL, alternative = "two.sided", mu = 0, conf.level = 0.95)',
      d: "Perform one- or two-sample t-test.",
      p: "stats",
    },
    "chisq.test": {
      s: "chisq.test(x, y = NULL, p = rep(1/length(x), length(x)))",
      d: "Perform chi-squared contingency table test.",
      p: "stats",
    },
    optim: {
      s: 'optim(par, fn, gr = NULL, method = "Nelder-Mead")',
      d: "General-purpose optimization.",
      p: "stats",
    },
    c: { s: "c(...)", d: "Combine values into a vector or list.", p: "base" },
    vector: {
      s: 'vector(mode = "logical", length = 0)',
      d: "Create a vector of the specified mode and length.",
      p: "base",
    },
    length: {
      s: "length(x)",
      d: "Get or set the length of a vector or list.",
      p: "base",
    },
    rev: {
      s: "rev(x)",
      d: "Reverse the order of elements in a vector.",
      p: "base",
    },
    sort: {
      s: "sort(x, decreasing = FALSE, na.last = NA)",
      d: "Sort a vector in ascending or descending order.",
      p: "base",
    },
    order: {
      s: "order(..., na.last = TRUE, decreasing = FALSE)",
      d: "Return a permutation that rearranges arguments into order.",
      p: "base",
    },
    unique: {
      s: "unique(x)",
      d: "Return a vector with duplicate elements removed.",
      p: "base",
    },
    duplicated: {
      s: "duplicated(x)",
      d: "Return a logical vector indicating which elements are duplicates.",
      p: "base",
    },
    rep: {
      s: "rep(x, times)",
      d: "Replicate elements of a vector.",
      p: "base",
    },
    seq: {
      s: "seq(from = 1, to = 1, by, length.out)",
      d: "Generate regular sequences.",
      p: "base",
    },
    seq_along: {
      s: "seq_along(x)",
      d: "Generate a sequence 1, 2, ..., length(x). Safer than 1:length(x).",
      p: "base",
    },
    seq_len: {
      s: "seq_len(length.out)",
      d: "Generate the sequence 1, 2, ..., length.out.",
      p: "base",
    },
    head: {
      s: "head(x, n = 6)",
      d: "Return the first n elements (or rows) of an object.",
      p: "utils",
    },
    tail: {
      s: "tail(x, n = 6)",
      d: "Return the last n elements (or rows) of an object.",
      p: "utils",
    },
    append: {
      s: "append(x, values, after = length(x))",
      d: "Add elements to a vector at a specified position.",
      p: "base",
    },
    which: {
      s: "which(x, arr.ind = FALSE)",
      d: "Return the indices of TRUE elements in a logical vector.",
      p: "base",
    },
    "which.min": {
      s: "which.min(x)",
      d: "Return the index of the first minimum value.",
      p: "base",
    },
    "which.max": {
      s: "which.max(x)",
      d: "Return the index of the first maximum value.",
      p: "base",
    },
    list: {
      s: "list(...)",
      d: "Create a list. Lists can contain elements of different types.",
      p: "base",
    },
    matrix: {
      s: "matrix(data = NA, nrow = 1, ncol = 1, byrow = FALSE)",
      d: "Create a matrix from the given data.",
      p: "base",
    },
    array: {
      s: "array(data = NA, dim = length(data), dimnames = NULL)",
      d: "Create a multi-dimensional array.",
      p: "base",
    },
    "data.frame": {
      s: "data.frame(..., stringsAsFactors = FALSE)",
      d: "Create a data frame from vectors of equal length.",
      p: "base",
    },
    factor: {
      s: "factor(x, levels, labels = levels, ordered = FALSE)",
      d: "Encode a vector as a factor (categorical variable).",
      p: "base",
    },
    names: {
      s: "names(x)",
      d: "Get or set the names attribute of an object.",
      p: "base",
    },
    dim: {
      s: "dim(x)",
      d: "Get or set the dimensions of an object.",
      p: "base",
    },
    nrow: {
      s: "nrow(x)",
      d: "Return the number of rows of a matrix or data frame.",
      p: "base",
    },
    ncol: {
      s: "ncol(x)",
      d: "Return the number of columns of a matrix or data frame.",
      p: "base",
    },
    rbind: {
      s: "rbind(...)",
      d: "Combine objects by rows (row-bind).",
      p: "base",
    },
    cbind: {
      s: "cbind(...)",
      d: "Combine objects by columns (column-bind).",
      p: "base",
    },
    merge: {
      s: "merge(x, y, by = NULL, all = FALSE, all.x, all.y)",
      d: "Merge two data frames by common columns (database-style join).",
      p: "base",
    },
    t: { s: "t(x)", d: "Transpose a matrix or data frame.", p: "base" },
    table: {
      s: 'table(..., useNA = "no")',
      d: "Build a contingency table of the counts.",
      p: "base",
    },
    unlist: {
      s: "unlist(x, recursive = TRUE, use.names = TRUE)",
      d: "Flatten a list to a vector.",
      p: "base",
    },
    unname: {
      s: "unname(obj)",
      d: "Remove the names or dimnames from an object.",
      p: "base",
    },
    subset: {
      s: "subset(x, subset, select)",
      d: "Return a subset of a data frame matching conditions.",
      p: "base",
    },
    with: {
      s: "with(data, expr)",
      d: "Evaluate an expression in an environment constructed from data.",
      p: "base",
    },
    within: {
      s: "within(data, expr)",
      d: "Like with(), but returns a modified copy of the data.",
      p: "base",
    },
    transform: {
      s: "transform(data, ...)",
      d: "Transform a data frame by adding or modifying columns.",
      p: "base",
    },
    split: {
      s: "split(x, f)",
      d: "Divide a vector or data frame into groups defined by factor f.",
      p: "base",
    },
    "do.call": {
      s: "do.call(what, args, quote = FALSE)",
      d: "Execute a function call constructed from a function and a list of arguments.",
      p: "base",
    },
    Reduce: {
      s: "Reduce(f, x, init, accumulate = FALSE)",
      d: "Apply a binary function successively to elements of a vector (fold).",
      p: "base",
    },
    Filter: {
      s: "Filter(f, x)",
      d: "Return elements of x for which function f returns TRUE.",
      p: "base",
    },
    Map: {
      s: "Map(f, ...)",
      d: "Apply a function to corresponding elements of given vectors.",
      p: "base",
    },
    Find: {
      s: "Find(f, x, right = FALSE)",
      d: "Return the first element for which f returns TRUE.",
      p: "base",
    },
    "is.na": {
      s: "is.na(x)",
      d: "Test which elements are NA (missing values). Returns logical vector.",
      p: "base",
    },
    "is.null": {
      s: "is.null(x)",
      d: "Test whether an object is NULL.",
      p: "base",
    },
    "is.numeric": {
      s: "is.numeric(x)",
      d: "Test whether an object is numeric.",
      p: "base",
    },
    "is.character": {
      s: "is.character(x)",
      d: "Test whether an object is a character vector.",
      p: "base",
    },
    "is.logical": {
      s: "is.logical(x)",
      d: "Test whether an object is a logical vector.",
      p: "base",
    },
    "is.list": {
      s: "is.list(x)",
      d: "Test whether an object is a list.",
      p: "base",
    },
    "is.vector": {
      s: 'is.vector(x, mode = "any")',
      d: "Test whether an object is a vector of the specified mode.",
      p: "base",
    },
    "is.function": {
      s: "is.function(x)",
      d: "Test whether an object is a function.",
      p: "base",
    },
    "is.data.frame": {
      s: "is.data.frame(x)",
      d: "Test whether an object is a data frame.",
      p: "base",
    },
    "is.finite": {
      s: "is.finite(x)",
      d: "Test which elements are finite.",
      p: "base",
    },
    "is.infinite": {
      s: "is.infinite(x)",
      d: "Test which elements are infinite (Inf or -Inf).",
      p: "base",
    },
    "as.numeric": {
      s: "as.numeric(x)",
      d: "Convert an object to numeric (double).",
      p: "base",
    },
    "as.character": {
      s: "as.character(x)",
      d: "Convert an object to character string.",
      p: "base",
    },
    "as.logical": {
      s: "as.logical(x)",
      d: "Convert to logical. 0 becomes FALSE, non-zero becomes TRUE.",
      p: "base",
    },
    "as.integer": {
      s: "as.integer(x)",
      d: "Convert to integer type. Truncates doubles.",
      p: "base",
    },
    "as.double": {
      s: "as.double(x)",
      d: "Convert to double-precision floating point.",
      p: "base",
    },
    "as.factor": {
      s: "as.factor(x)",
      d: "Convert a vector to a factor.",
      p: "base",
    },
    apply: {
      s: "apply(X, MARGIN, FUN, ...)",
      d: "Apply a function over rows (MARGIN=1) or columns (MARGIN=2) of a matrix.",
      p: "base",
    },
    sapply: {
      s: "sapply(X, FUN, ..., simplify = TRUE)",
      d: "Apply a function to each element and simplify the result.",
      p: "base",
    },
    lapply: {
      s: "lapply(X, FUN, ...)",
      d: "Apply a function to each element. Always returns a list.",
      p: "base",
    },
    vapply: {
      s: "vapply(X, FUN, FUN.VALUE, ...)",
      d: "Like sapply but with a specified return type, making it safer.",
      p: "base",
    },
    tapply: {
      s: "tapply(X, INDEX, FUN = NULL, ...)",
      d: "Apply a function to groups of values.",
      p: "base",
    },
    mapply: {
      s: "mapply(FUN, ..., MoreArgs = NULL, SIMPLIFY = TRUE)",
      d: "Multivariate version of sapply.",
      p: "base",
    },
    "read.csv": {
      s: 'read.csv(file, header = TRUE, sep = ",", stringsAsFactors = FALSE)',
      d: "Read a CSV file into a data frame.",
      p: "utils",
    },
    "read.table": {
      s: 'read.table(file, header = FALSE, sep = "", dec = ".")',
      d: "Read a tabular data file into a data frame.",
      p: "utils",
    },
    "write.csv": {
      s: 'write.csv(x, file = "", row.names = TRUE)',
      d: "Write a data frame to a CSV file.",
      p: "utils",
    },
    "write.table": {
      s: 'write.table(x, file = "", sep = " ", row.names = TRUE, col.names = TRUE)',
      d: "Write a data frame to a text file.",
      p: "utils",
    },
    readRDS: {
      s: "readRDS(file)",
      d: "Read a single R object from an .rds file.",
      p: "base",
    },
    saveRDS: {
      s: 'saveRDS(object, file = "")',
      d: "Save a single R object to an .rds file.",
      p: "base",
    },
    readLines: {
      s: "readLines(con, n = -1, warn = TRUE)",
      d: "Read text lines from a connection or file.",
      p: "base",
    },
    scan: {
      s: 'scan(file = "", what = double(), nmax = -1, sep = "")',
      d: "Read data into a vector or list from console or file.",
      p: "base",
    },
    source: {
      s: "source(file, local = FALSE, echo = FALSE)",
      d: "Read and evaluate R expressions from a file.",
      p: "base",
    },
    ifelse: {
      s: "ifelse(test, yes, no)",
      d: "Vectorized conditional: returns yes where test is TRUE, no where FALSE.",
      p: "base",
    },
    switch: {
      s: "switch(EXPR, ...)",
      d: "Select one of a list of alternatives based on the value of EXPR.",
      p: "base",
    },
    tryCatch: {
      s: "tryCatch(expr, ..., finally)",
      d: "Evaluate an expression with condition handlers.",
      p: "base",
    },
    try: {
      s: "try(expr, silent = FALSE)",
      d: 'Try to evaluate an expression, returning "try-error" on failure.',
      p: "base",
    },
    stop: {
      s: "stop(..., call. = TRUE)",
      d: "Stop execution and signal an error condition.",
      p: "base",
    },
    warning: {
      s: "warning(..., call. = TRUE, immediate. = FALSE)",
      d: "Generate a warning message.",
      p: "base",
    },
    stopifnot: {
      s: "stopifnot(...)",
      d: "Ensure all expressions are TRUE; stop with error if any are FALSE.",
      p: "base",
    },
    suppressWarnings: {
      s: "suppressWarnings(expr)",
      d: "Evaluate expression while suppressing all warnings.",
      p: "base",
    },
    suppressMessages: {
      s: "suppressMessages(expr)",
      d: "Evaluate expression while suppressing all messages.",
      p: "base",
    },
    "on.exit": {
      s: "on.exit(expr = NULL, add = FALSE, after = TRUE)",
      d: "Record an expression to be executed when the current function exits.",
      p: "base",
    },
    invisible: {
      s: "invisible(x)",
      d: "Return an invisible copy of x (suppresses auto-printing).",
      p: "base",
    },
    library: {
      s: "library(package)",
      d: "Load and attach an R package.",
      p: "base",
    },
    require: {
      s: "require(package, quietly = FALSE)",
      d: "Load a package; returns FALSE if unavailable.",
      p: "base",
    },
    "install.packages": {
      s: 'install.packages(pkgs, repos = getOption("repos"))',
      d: "Download and install packages from CRAN.",
      p: "utils",
    },
    setwd: { s: "setwd(dir)", d: "Set the working directory.", p: "base" },
    getwd: {
      s: "getwd()",
      d: "Get the current working directory as a string.",
      p: "base",
    },
    "Sys.time": {
      s: "Sys.time()",
      d: "Return the current date-time as a POSIXct object.",
      p: "base",
    },
    "Sys.sleep": {
      s: "Sys.sleep(time)",
      d: "Suspend execution for the given number of seconds.",
      p: "base",
    },
    "system.time": {
      s: "system.time(expr)",
      d: "Measure the CPU and elapsed time used to evaluate expr.",
      p: "base",
    },
    exists: {
      s: "exists(x, where = -1, envir, inherits = TRUE)",
      d: "Test whether a named object exists.",
      p: "base",
    },
    get: {
      s: "get(x, envir = parent.frame())",
      d: "Retrieve the value of a named object from an environment.",
      p: "base",
    },
    assign: {
      s: "assign(x, value, envir = parent.frame())",
      d: "Assign a value to a name in an environment.",
      p: "base",
    },
    rm: {
      s: "rm(..., list = character(), envir = parent.frame())",
      d: "Remove objects from the specified environment.",
      p: "base",
    },
    ls: {
      s: "ls(envir = parent.frame(), all.names = FALSE)",
      d: "List objects in an environment.",
      p: "base",
    },
    environment: {
      s: "environment(fun = NULL)",
      d: "Get or set the environment of a function.",
      p: "base",
    },
    "match.arg": {
      s: "match.arg(arg, choices, several.ok = FALSE)",
      d: "Match a string argument to candidate values (with partial matching).",
      p: "base",
    },
    missing: {
      s: "missing(x)",
      d: "Test whether an argument was supplied in a function call.",
      p: "base",
    },
    class: {
      s: "class(x)",
      d: "Get or set the class attribute of an object.",
      p: "base",
    },
    inherits: {
      s: "inherits(x, what, which = FALSE)",
      d: "Test whether an object inherits from a given class.",
      p: "base",
    },
    str: {
      s: "str(object, max.level = NA)",
      d: "Display the internal structure of an R object compactly.",
      p: "utils",
    },
    summary: {
      s: "summary(object, ...)",
      d: "Produce a summary of an object.",
      p: "base",
    },
    typeof: {
      s: "typeof(x)",
      d: "Return the internal (C-level) type of an object.",
      p: "base",
    },
    mode: {
      s: "mode(x)",
      d: "Get or set the type/mode of an object.",
      p: "base",
    },
    attributes: {
      s: "attributes(x)",
      d: "Get or set all attributes of an object.",
      p: "base",
    },
    attr: {
      s: "attr(x, which)",
      d: "Get or set a specific attribute of an object.",
      p: "base",
    },
    structure: {
      s: "structure(.Data, ...)",
      d: "Set attributes on an object and return it.",
      p: "base",
    },
    setClass: {
      s: "setClass(Class, representation, contains, prototype)",
      d: "Define a new S4 class with typed slots and inheritance.",
      p: "methods",
    },
    setGeneric: {
      s: "setGeneric(name, def, ...)",
      d: "Define a new S4 generic function for method dispatch.",
      p: "methods",
    },
    setMethod: {
      s: "setMethod(f, signature, definition)",
      d: "Define an S4 method for a specific signature.",
      p: "methods",
    },
    UseMethod: {
      s: "UseMethod(generic, object)",
      d: "Dispatch to an S3 method.",
      p: "base",
    },
    methods: {
      s: "methods(generic.function)",
      d: "List available methods for an S3/S4 generic function.",
      p: "utils",
    },
    plot: {
      s: 'plot(x, y, type = "p", main, xlab, ylab, col, ...)',
      d: "Generic X-Y plotting.",
      p: "graphics",
    },
    hist: {
      s: 'hist(x, breaks = "Sturges", freq = NULL, col = NULL, main, xlab)',
      d: "Compute and plot a histogram.",
      p: "graphics",
    },
    barplot: {
      s: "barplot(height, names.arg = NULL, col = NULL, main, beside = FALSE)",
      d: "Create a bar plot.",
      p: "graphics",
    },
    boxplot: {
      s: "boxplot(formula, data = NULL, col = NULL, main, ...)",
      d: "Produce box-and-whisker plot(s).",
      p: "graphics",
    },
    lines: {
      s: 'lines(x, y = NULL, col = par("col"), lty = par("lty"), lwd = par("lwd"))',
      d: "Add connected line segments to an existing plot.",
      p: "graphics",
    },
    points: {
      s: 'points(x, y = NULL, type = "p", col, pch, cex)',
      d: "Add points to an existing plot.",
      p: "graphics",
    },
    legend: {
      s: "legend(x, y = NULL, legend, col, lty, lwd, pch, fill, bg)",
      d: "Add a legend to a plot.",
      p: "graphics",
    },
    abline: {
      s: "abline(a = NULL, b = NULL, h = NULL, v = NULL, col, lty, lwd)",
      d: "Add straight lines to a plot.",
      p: "graphics",
    },
    par: {
      s: "par(...)",
      d: "Set or query graphical parameters.",
      p: "graphics",
    },
    title: {
      s: "title(main = NULL, sub = NULL, xlab = NULL, ylab = NULL)",
      d: "Add title and axis labels to a plot.",
      p: "graphics",
    },
    curve: {
      s: "curve(expr, from = NULL, to = NULL, n = 101, add = FALSE)",
      d: "Plot a mathematical expression as a curve.",
      p: "graphics",
    },
    pairs: {
      s: "pairs(x, labels, col, pch, ...)",
      d: "Produce a matrix of scatterplots.",
      p: "graphics",
    },
    pdf: {
      s: 'pdf(file = "Rplots.pdf", width = 7, height = 7)',
      d: "Open a PDF graphics device.",
      p: "grDevices",
    },
    png: {
      s: 'png(filename, width = 480, height = 480, units = "px", res = NA)',
      d: "Open a PNG graphics device.",
      p: "grDevices",
    },
    "dev.off": {
      s: "dev.off(which = dev.cur())",
      d: "Close a graphics device.",
      p: "grDevices",
    },
    Vectorize: {
      s: "Vectorize(FUN, vectorize.args)",
      d: "Create a vectorized version of a function.",
      p: "base",
    },
    "Sys.getenv": {
      s: "Sys.getenv(x)",
      d: "Get the value of an environment variable.",
      p: "base",
    },
    "file.exists": {
      s: "file.exists(...)",
      d: "Test whether files exist at the given paths.",
      p: "base",
    },
    "file.path": {
      s: "file.path(...)",
      d: "Construct file paths from components in a platform-independent way.",
      p: "base",
    },
    basename: {
      s: "basename(path)",
      d: "Return the filename component of a path.",
      p: "base",
    },
    dirname: {
      s: "dirname(path)",
      d: "Return the directory component of a path.",
      p: "base",
    },
    "Sys.glob": {
      s: "Sys.glob(paths)",
      d: "Expand file path wildcards (glob patterns).",
      p: "base",
    },
    system: {
      s: "system(command, intern = FALSE)",
      d: "Execute a system (shell) command.",
      p: "base",
    },
    "proc.time": {
      s: "proc.time()",
      d: "Return user/system/elapsed time since the R process started.",
      p: "base",
    },
    identical: {
      s: "identical(x, y)",
      d: "Test whether two objects are exactly identical.",
      p: "base",
    },
    "all.equal": {
      s: "all.equal(target, current, tolerance = .Machine$double.eps^0.5)",
      d: "Test near-equality. Useful for comparing floating point numbers.",
      p: "base",
    },
    nargs: {
      s: "nargs()",
      d: "Return the number of arguments supplied to the current function.",
      p: "base",
    },
    rownames: {
      s: "rownames(x)",
      d: "Get or set the row names of a matrix-like object.",
      p: "base",
    },
    colnames: {
      s: "colnames(x)",
      d: "Get or set the column names of a matrix-like object.",
      p: "base",
    },
    rowSums: {
      s: "rowSums(x, na.rm = FALSE)",
      d: "Compute row sums of a numeric matrix.",
      p: "base",
    },
    colSums: {
      s: "colSums(x, na.rm = FALSE)",
      d: "Compute column sums of a numeric matrix.",
      p: "base",
    },
    rowMeans: {
      s: "rowMeans(x, na.rm = FALSE)",
      d: "Compute row means of a numeric matrix.",
      p: "base",
    },
    colMeans: {
      s: "colMeans(x, na.rm = FALSE)",
      d: "Compute column means of a numeric matrix.",
      p: "base",
    },
    crossprod: {
      s: "crossprod(x, y = NULL)",
      d: "Matrix crossproduct: t(x) %*% y.",
      p: "base",
    },
    solve: {
      s: "solve(a, b)",
      d: "Solve a system of linear equations, or compute matrix inverse.",
      p: "base",
    },
    eigen: {
      s: "eigen(x, symmetric, only.values = FALSE)",
      d: "Compute eigenvalues and eigenvectors of a matrix.",
      p: "base",
    },
    det: {
      s: "det(x)",
      d: "Compute the determinant of a square matrix.",
      p: "base",
    },
    diag: {
      s: "diag(x = 1, nrow, ncol)",
      d: "Create a diagonal matrix, or extract the diagonal.",
      p: "base",
    },
    replace: {
      s: "replace(x, list, values)",
      d: "Replace values in x at positions given by list.",
      p: "base",
    },
    match: {
      s: "match(x, table, nomatch = NA_integer_)",
      d: "Return positions of first matches of x in table.",
      p: "base",
    },
    "%in%": {
      s: "x %in% table",
      d: "Binary operator returning logical vector indicating matches.",
      p: "base",
    },
    rank: {
      s: 'rank(x, na.last = TRUE, ties.method = "average")',
      d: "Compute the sample ranks of the values.",
      p: "base",
    },
    diff: {
      s: "diff(x, lag = 1, differences = 1)",
      d: "Compute lagged differences of a vector.",
      p: "base",
    },
    outer: {
      s: 'outer(X, Y, FUN = "*")',
      d: "Compute the outer product of two arrays.",
      p: "base",
    },
    nlevels: {
      s: "nlevels(x)",
      d: "Return the number of levels of a factor.",
      p: "base",
    },
    levels: {
      s: "levels(x)",
      d: "Get or set the levels of a factor.",
      p: "base",
    },
    "complete.cases": {
      s: "complete.cases(...)",
      d: "Return a logical vector indicating which rows have no missing values.",
      p: "stats",
    },
    "na.omit": {
      s: "na.omit(object)",
      d: "Remove rows containing NA values.",
      p: "stats",
    },
  };

  /* ═══════════════════════════════
   R CODE SNIPPETS
   ═══════════════════════════════ */
  var R_SNIPPETS = [
    {
      label: "fun (function definition)",
      detail: "Define a new function",
      insertText:
        "${1:fname} <- function(${2:args}) {\n\t${3}\n\treturn(${4:result})\n}",
      documentation: "Create a new R function with arguments and return value.",
    },
    {
      label: "if (if block)",
      detail: "If statement",
      insertText: "if (${1:condition}) {\n\t${2}\n}",
      documentation: "Conditional if block.",
    },
    {
      label: "ife (if-else)",
      detail: "If-else statement",
      insertText: "if (${1:condition}) {\n\t${2}\n} else {\n\t${3}\n}",
      documentation: "Conditional if-else block.",
    },
    {
      label: "eif (else if)",
      detail: "Else-if clause",
      insertText: "else if (${1:condition}) {\n\t${2}\n}",
      documentation: "Else-if clause.",
    },
    {
      label: "for (for loop)",
      detail: "For loop",
      insertText: "for (${1:i} in ${2:seq_along(x)}) {\n\t${3}\n}",
      documentation: "Iterate over elements of a vector.",
    },
    {
      label: "while (while loop)",
      detail: "While loop",
      insertText: "while (${1:condition}) {\n\t${2}\n}",
      documentation: "Loop while condition is TRUE.",
    },
    {
      label: "repeat (repeat loop)",
      detail: "Repeat loop",
      insertText: "repeat {\n\t${1}\n\tif (${2:condition}) break\n}",
      documentation: "Infinite loop with explicit break.",
    },
    {
      label: "tryCatch (error handling)",
      detail: "tryCatch block",
      insertText:
        "tryCatch(\n\t${1:expr},\n\terror = function(e) {\n\t\t${2:message(conditionMessage(e))}\n\t},\n\twarning = function(w) {\n\t\t${3:message(conditionMessage(w))}\n\t},\n\tfinally = {\n\t\t${4}\n\t}\n)",
      documentation: "Handle errors, warnings, and run cleanup code.",
    },
    {
      label: "lib (library)",
      detail: "Load a package",
      insertText: "library(${1:package})",
      documentation: "Load and attach an R package.",
    },
    {
      label: "req (require)",
      detail: "Require a package",
      insertText:
        'if (!require(${1:package}, quietly = TRUE)) {\n\tinstall.packages("${1:package}")\n\tlibrary(${1:package})\n}',
      documentation: "Load a package, installing if necessary.",
    },
    {
      label: "src (source)",
      detail: "Source a file",
      insertText: 'source("${1:file.R}")',
      documentation: "Read and evaluate R code from a file.",
    },
    {
      label: "df (data.frame)",
      detail: "Create a data frame",
      insertText:
        "${1:df} <- data.frame(\n\t${2:col1} = ${3:c()},\n\t${4:col2} = ${5:c()},\n\tstringsAsFactors = FALSE\n)",
      documentation: "Create a new data frame with named columns.",
    },
    {
      label: "readcsv (read CSV)",
      detail: "Read a CSV file",
      insertText:
        '${1:data} <- read.csv("${2:file.csv}", header = TRUE, stringsAsFactors = FALSE)',
      documentation: "Read a CSV file into a data frame.",
    },
    {
      label: "writecsv (write CSV)",
      detail: "Write a CSV file",
      insertText:
        'write.csv(${1:data}, file = "${2:output.csv}", row.names = FALSE)',
      documentation: "Write a data frame to a CSV file.",
    },
    {
      label: "apply (apply function)",
      detail: "Apply over matrix margins",
      insertText: "apply(${1:X}, ${2|1,2|}, ${3:FUN})",
      documentation: "Apply function over rows (1) or columns (2) of a matrix.",
    },
    {
      label: "sapply (sapply function)",
      detail: "Apply and simplify",
      insertText: "sapply(${1:X}, function(${2:x}) {\n\t${3}\n})",
      documentation:
        "Apply a function to each element and simplify the result.",
    },
    {
      label: "lapply (lapply function)",
      detail: "Apply returning list",
      insertText: "lapply(${1:X}, function(${2:x}) {\n\t${3}\n})",
      documentation:
        "Apply a function to each element, always returning a list.",
    },
    {
      label: "ggplot (ggplot2 template)",
      detail: "ggplot2 plot",
      insertText:
        'ggplot(${1:data}, aes(x = ${2:x_var}, y = ${3:y_var})) +\n\tgeom_${4:point}() +\n\tlabs(title = "${5:Title}", x = "${6:X}", y = "${7:Y}") +\n\ttheme_minimal()',
      documentation: "Create a ggplot2 plot with aesthetic mappings.",
    },
    {
      label: "shinyapp (Shiny app)",
      detail: "Minimal Shiny app",
      insertText:
        'library(shiny)\n\nui <- fluidPage(\n\ttitlePanel("${1:App Title}"),\n\tsidebarLayout(\n\t\tsidebarPanel(\n\t\t\t${2:sliderInput("n", "N:", min = 1, max = 100, value = 50)}\n\t\t),\n\t\tmainPanel(\n\t\t\t${3:plotOutput("plot")}\n\t\t)\n\t)\n)\n\nserver <- function(input, output, session) {\n\toutput\\$${4:plot} <- render${5:Plot}({\n\t\t${6}\n\t})\n}\n\nshinyApp(ui, server)',
      documentation: "Create a minimal Shiny web application.",
    },
    {
      label: "s4class (S4 class)",
      detail: "Define an S4 class",
      insertText:
        'setClass("${1:ClassName}", representation(\n\t${2:slot1} = "${3:character}",\n\t${4:slot2} = "${5:numeric}"\n))',
      documentation: "Define a new S4 class with typed slots.",
    },
    {
      label: "pipe (pipe chain)",
      detail: "Pipe chain template",
      insertText:
        "${1:data} |>\n\t${2:filter(${3:condition})} |>\n\t${4:mutate(${5:new_col} = ${6:expr})} |>\n\t${7:summarise(${8:result} = ${9:mean(x)})}",
      documentation:
        "Build a data transformation pipeline using the native pipe operator.",
    },
    {
      label: "test (testthat test)",
      detail: "Unit test",
      insertText:
        'test_that("${1:description}", {\n\t${2:result} <- ${3:my_function(input)}\n\texpect_equal(${2:result}, ${4:expected})\n})',
      documentation: "Create a testthat unit test.",
    },
    {
      label: "switch (switch statement)",
      detail: "Switch expression",
      insertText:
        "switch(${1:expr},\n\t${2:case1} = ${3:value1},\n\t${4:case2} = ${5:value2},\n\t${6:default_value}\n)",
      documentation: "Multi-way branch based on the value of an expression.",
    },
  ];

  /* ═════════════════════════════
   KEYWORD & CONSTANT LISTS
   ═════════════════════════════ */
  var R_KEYWORDS = [
    "if",
    "else",
    "repeat",
    "while",
    "for",
    "function",
    "in",
    "next",
    "break",
    "return",
  ];
  var R_CONSTANTS = [
    "TRUE",
    "FALSE",
    "NULL",
    "Inf",
    "NaN",
    "NA",
    "NA_integer_",
    "NA_real_",
    "NA_complex_",
    "NA_character_",
    "T",
    "F",
    "pi",
    "LETTERS",
    "letters",
    "month.abb",
    "month.name",
    ".Machine",
    ".Platform",
  ];
  var R_BUILTINS = Object.keys(RD);

  var CONST_DESCS = {
    TRUE: "Logical constant representing truth.",
    FALSE: "Logical constant representing falsehood.",
    NULL: "The null object, used to represent empty or absent data.",
    Inf: "Positive infinity.",
    NaN: "Not a Number — result of undefined math operations like 0/0.",
    NA: "Logical missing value constant. NA values propagate through computations.",
    NA_integer_: "Missing value of integer type.",
    NA_real_: "Missing value of double type.",
    NA_complex_: "Missing value of complex type.",
    NA_character_: "Missing value of character type.",
    T: "Abbreviation for TRUE (can be overwritten — prefer TRUE).",
    F: "Abbreviation for FALSE (can be overwritten — prefer FALSE).",
    pi: "The mathematical constant \u03c0 \u2248 3.14159265...",
    LETTERS: "Character vector of 26 upper-case letters A\u2013Z.",
    letters: "Character vector of 26 lower-case letters a\u2013z.",
    "month.abb": "Character vector of 3-letter English month abbreviations.",
    "month.name": "Character vector of full English month names.",
    ".Machine":
      "List of numerical characteristics of the machine (double.eps, integer.max, etc.).",
    ".Platform":
      "List of platform-specific details (OS type, file separator, etc.).",
  };

  /* ═════════════════════════════
   REGISTER R LANGUAGE
   ═════════════════════════════ */
  monaco.languages.register({
    id: "r",
    extensions: [".r", ".R", ".Rmd", ".Rprofile"],
    aliases: ["R", "r", "Rlang"],
    mimetypes: ["text/x-r", "text/x-R"],
  });

  /* ═════════════════════════════
   LANGUAGE CONFIGURATION
   ═════════════════════════════ */
  monaco.languages.setLanguageConfiguration("r", {
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
      { open: "`", close: "`", notIn: ["string", "comment"] },
    ],
    surroundingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: '"', close: '"' },
      { open: "'", close: "'" },
      { open: "`", close: "`" },
    ],
    folding: {
      offSide: false,
      markers: { start: /^\s*#\s*region\b/, end: /^\s*#\s*endregion\b/ },
    },
    indentationRules: {
      increaseIndentPattern: /^((?!.*#).)*(\{[^}"']*|\([^)"']*)$/,
      decreaseIndentPattern: /^\s*[}\)]/,
    },
    onEnterRules: [
      {
        beforeText: /^\s*#'\s*.*$/,
        action: {
          indentAction: monaco.languages.IndentAction.None,
          appendText: "#' ",
        },
      },
    ],
    wordPattern:
      /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
  });

  /* ═════════════════════════════
   MONARCH TOKENIZER
   ═════════════════════════════ */
  monaco.languages.setMonarchTokensProvider("r", {
    defaultToken: "",
    tokenPostfix: ".r",
    keywords: R_KEYWORDS,
    constants: R_CONSTANTS,
    builtins: R_BUILTINS,
    escapes:
      /\\(?:[abefnrstv\\"']|x[0-9A-Fa-f]{1,4}|u\{?[0-9A-Fa-f]{1,8}\}?|[0-7]{1,3})/,
    tokenizer: {
      root: [
        [/#'.*$/, "comment.doc"],
        [/#.*$/, "comment"],
        [/"/, "string", "@string_double"],
        [/'/, "string", "@string_single"],
        [/`/, "variable.other", "@backtick"],
        [/\.\.\./, "keyword"],
        [/\.\.\d+/, "keyword"],
        [/0[xX][0-9a-fA-F]+[Li]?/, "number"],
        [/\d*\.\d+([eE][+-]?\d+)?[iL]?/, "number"],
        [/\d+([eE][+-]?\d+)?[iL]?/, "number"],
        [/%[^%\s]+%/, "operator"],
        [/\\(?=\s*\()/, "keyword"],
        [/([a-zA-Z_.][a-zA-Z0-9_.]*)(:::?)/, ["namespace", "operator"]],
        [
          /[a-zA-Z_.][a-zA-Z0-9_.]*(?=\s*\()/,
          {
            cases: {
              "@keywords": "keyword",
              "@constants": "keyword",
              "@builtins": "type",
              "@default": "type",
            },
          },
        ],
        [
          /[a-zA-Z_.][a-zA-Z0-9_.]*/,
          {
            cases: {
              "@keywords": "keyword",
              "@constants": "keyword",
              "@builtins": "type",
              "@default": "identifier",
            },
          },
        ],
        [/<<-/, "operator"],
        [/<-/, "operator"],
        [/->>/, "operator"],
        [/->/, "operator"],
        [/\|>/, "operator"],
        [/[<>!=]=/, "operator"],
        [/&&/, "operator"],
        [/\|\|/, "operator"],
        [/[+\-*/^~!&|<>=@$?:]/, "operator"],
        [/[{}()\[\]]/, "@brackets"],
        [/[,;]/, "delimiter"],
        [/\s+/, "white"],
      ],
      string_double: [
        [/[^\\"]+/, "string"],
        [/@escapes/, "string.escape"],
        [/\\./, "string.escape.invalid"],
        [/"/, "string", "@pop"],
      ],
      string_single: [
        [/[^\\']+/, "string"],
        [/@escapes/, "string.escape"],
        [/\\./, "string.escape.invalid"],
        [/'/, "string", "@pop"],
      ],
      backtick: [
        [/[^`]+/, "variable.other"],
        [/`/, "variable.other", "@pop"],
      ],
    },
  });

  /* ═════════════════════════════
   COMPLETION PROVIDER
   ═════════════════════════════ */
  monaco.languages.registerCompletionItemProvider("r", {
    triggerCharacters: [".", ":", "$", "@"],
    provideCompletionItems: function (model, position) {
      var word = model.getWordUntilPosition(position);
      var range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };
      var suggestions = [];
      var keys = Object.keys(RD);
      var i, name, entry;

      for (i = 0; i < keys.length; i++) {
        name = keys[i];
        entry = RD[name];
        suggestions.push({
          label: name,
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: name + "(${1:})",
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          detail: entry.s,
          documentation: {
            value:
              "```r\n" +
              entry.s +
              "\n```\n\n" +
              entry.d +
              "\n\n*Package: " +
              entry.p +
              "*",
          },
          range: range,
          sortText: "1_" + name,
        });
      }

      for (i = 0; i < R_KEYWORDS.length; i++) {
        suggestions.push({
          label: R_KEYWORDS[i],
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: R_KEYWORDS[i],
          detail: "keyword",
          range: range,
          sortText: "2_" + R_KEYWORDS[i],
        });
      }

      for (i = 0; i < R_CONSTANTS.length; i++) {
        suggestions.push({
          label: R_CONSTANTS[i],
          kind: monaco.languages.CompletionItemKind.Constant,
          insertText: R_CONSTANTS[i],
          detail: CONST_DESCS[R_CONSTANTS[i]] || "R constant",
          range: range,
          sortText: "2_" + R_CONSTANTS[i],
        });
      }

      for (i = 0; i < R_SNIPPETS.length; i++) {
        var sn = R_SNIPPETS[i];
        suggestions.push({
          label: sn.label,
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: sn.insertText,
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          detail: sn.detail,
          documentation: {
            value:
              sn.documentation +
              "\n\n```r\n" +
              sn.insertText
                .replace(/\$\{\d+[:|]?([^}]*)\}/g, "$1")
                .replace(/\$\d+/g, "") +
              "\n```",
          },
          range: range,
          sortText: "0_" + sn.label,
        });
      }

      var text = model.getValue();
      var defRegex = /([a-zA-Z_.][a-zA-Z0-9_.]*)\s*(?:<-|<<-|=)\s*/g;
      var m;
      var seen = {};
      for (i = 0; i < R_BUILTINS.length; i++) seen[R_BUILTINS[i]] = true;
      for (i = 0; i < R_KEYWORDS.length; i++) seen[R_KEYWORDS[i]] = true;
      for (i = 0; i < R_CONSTANTS.length; i++) seen[R_CONSTANTS[i]] = true;

      while ((m = defRegex.exec(text)) !== null) {
        var nm = m[1];
        if (!seen[nm]) {
          seen[nm] = true;
          var afterAssign = text.substring(
            m.index + m[0].length,
            m.index + m[0].length + 20,
          );
          var isFunc = /^function\s*\(/.test(afterAssign);
          suggestions.push({
            label: nm,
            kind: isFunc
              ? monaco.languages.CompletionItemKind.Function
              : monaco.languages.CompletionItemKind.Variable,
            insertText: isFunc ? nm + "(${1:})" : nm,
            insertTextRules: isFunc
              ? monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
              : undefined,
            detail: isFunc ? "User-defined function" : "User-defined variable",
            range: range,
            sortText: "3_" + nm,
          });
        }
      }

      return { suggestions: suggestions };
    },
  });

  /* ═════════════════════════════
   HOVER PROVIDER
   ═════════════════════════════ */
  monaco.languages.registerHoverProvider("r", {
    provideHover: function (model, position) {
      var wordInfo = model.getWordAtPosition(position);
      if (!wordInfo) return null;
      var name = wordInfo.word;
      var hoverRange = new monaco.Range(
        position.lineNumber,
        wordInfo.startColumn,
        position.lineNumber,
        wordInfo.endColumn,
      );

      // Check if this is part of a dotted name like is.na, data.frame etc.
      var lineContent = model.getLineContent(position.lineNumber);
      var fullName = name;

      // Look ahead for dotted continuation
      var afterEnd = lineContent.substring(wordInfo.endColumn - 1);
      var aheadMatch = afterEnd.match(/^(\.[a-zA-Z_][a-zA-Z0-9_.]*)/);
      if (aheadMatch) {
        fullName = fullName + aheadMatch[1];
      }

      // Look behind for dotted prefix
      var beforeStart = lineContent.substring(0, wordInfo.startColumn - 1);
      var behindMatch = beforeStart.match(/([a-zA-Z_.][a-zA-Z0-9_.]*\.)$/);
      if (behindMatch) {
        fullName = behindMatch[1] + fullName;
        if (aheadMatch) fullName = behindMatch[1] + name + aheadMatch[1];
      }

      // Try full dotted name first
      if (RD[fullName]) {
        var e = RD[fullName];
        return {
          range: hoverRange,
          contents: [
            { value: "```r\n" + e.s + "\n```" },
            { value: e.d + "\n\n*Package: **" + e.p + "***" },
          ],
        };
      }

      if (RD[name]) {
        var e2 = RD[name];
        return {
          range: hoverRange,
          contents: [
            { value: "```r\n" + e2.s + "\n```" },
            { value: e2.d + "\n\n*Package: **" + e2.p + "***" },
          ],
        };
      }

      // Namespace qualified
      var nsMatch = beforeStart.match(/([a-zA-Z_.][a-zA-Z0-9_.]*)\s*:::?\s*$/);
      if (nsMatch) {
        return {
          range: hoverRange,
          contents: [
            { value: "```r\n" + nsMatch[1] + "::" + name + "\n```" },
            { value: "Function from package **" + nsMatch[1] + "**" },
          ],
        };
      }

      if (R_KEYWORDS.indexOf(name) >= 0) {
        var kwDescs = {
          if: "Conditional execution: if (condition) expr",
          else: "Alternative branch of if statement",
          for: "For loop: for (var in seq) expr",
          while: "While loop: while (condition) expr",
          repeat: "Infinite repeat loop (use break to exit)",
          function: "Define a function: function(args) body",
          in: "Used in for loops: for (x in collection)",
          next: "Skip to next iteration of a loop",
          break: "Exit from a for, while, or repeat loop",
          return: "Return a value from a function",
        };
        return {
          range: hoverRange,
          contents: [
            { value: "**" + name + "** \u2014 R keyword" },
            { value: kwDescs[name] || "" },
          ],
        };
      }

      if (CONST_DESCS[name]) {
        return {
          range: hoverRange,
          contents: [
            { value: "**" + name + "** \u2014 R constant" },
            { value: CONST_DESCS[name] },
          ],
        };
      }

      var text = model.getValue();
      var escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      var funcRe = new RegExp(
        escaped + "\\s*(?:<-|<<-|=)\\s*function\\s*\\(([^)]*)\\)",
      );
      var fm = funcRe.exec(text);
      if (fm) {
        return {
          range: hoverRange,
          contents: [
            { value: "```r\n" + name + "(" + fm[1] + ")\n```" },
            { value: "*User-defined function*" },
          ],
        };
      }

      var varRe = new RegExp(
        "(^|[^a-zA-Z0-9_.])" + escaped + "\\s*(?:<-|<<-|=)\\s*(?!function)",
        "m",
      );
      var vm = varRe.exec(text);
      if (vm) {
        return {
          range: hoverRange,
          contents: [
            { value: "**" + name + "** \u2014 User-defined variable" },
          ],
        };
      }

      return null;
    },
  });

  /* ═════════════════════════════
   DEFINITION PROVIDER
   ═════════════════════════════ */
  monaco.languages.registerDefinitionProvider("r", {
    provideDefinition: function (model, position) {
      var wordInfo = model.getWordAtPosition(position);
      if (!wordInfo) return null;
      var name = wordInfo.word;
      var escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      var lines = model.getValue().split("\n");
      var regex = new RegExp(
        "(^|[^a-zA-Z0-9_.])(" + escaped + ")\\s*(<-|<<-|=)\\s*",
      );
      var results = [];
      var i, m;

      for (i = 0; i < lines.length; i++) {
        m = regex.exec(lines[i]);
        if (m) {
          var col = m.index + m[1].length;
          results.push({
            uri: model.uri,
            range: new monaco.Range(
              i + 1,
              col + 1,
              i + 1,
              col + 1 + name.length,
            ),
          });
        }
      }

      var libRe = new RegExp(
        "(?:library|require)\\s*\\(\\s*[\"']?" + escaped + "[\"']?\\s*\\)",
      );
      for (i = 0; i < lines.length; i++) {
        m = libRe.exec(lines[i]);
        if (m) {
          results.push({
            uri: model.uri,
            range: new monaco.Range(
              i + 1,
              m.index + 1,
              i + 1,
              m.index + 1 + m[0].length,
            ),
          });
        }
      }

      return results.length > 0 ? results : null;
    },
  });

  /* ═════════════════════════════
   SIGNATURE HELP PROVIDER
   ═════════════════════════════ */
  monaco.languages.registerSignatureHelpProvider("r", {
    signatureHelpTriggerCharacters: ["(", ","],
    signatureHelpRetriggerCharacters: [","],
    provideSignatureHelp: function (model, position) {
      var startLine = Math.max(1, position.lineNumber - 30);
      var textBefore = model.getValueInRange({
        startLineNumber: startLine,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });

      var depth = 0,
        activeParam = 0,
        funcEnd = -1;
      var i, ch;
      for (i = textBefore.length - 1; i >= 0; i--) {
        ch = textBefore[i];
        if (ch === ")" || ch === "]" || ch === "}") depth++;
        else if (ch === "(" || ch === "[" || ch === "{") {
          if (depth === 0) {
            funcEnd = i;
            break;
          }
          depth--;
        } else if (ch === "," && depth === 0) {
          activeParam++;
        }
      }

      if (funcEnd < 0) return null;

      var beforeParen = textBefore.substring(0, funcEnd).replace(/\s+$/, "");
      var funcMatch = beforeParen.match(/([a-zA-Z_.][a-zA-Z0-9_.]*)$/);
      if (!funcMatch) return null;
      var funcName = funcMatch[1];

      var sig = null,
        doc = null,
        params = [];

      if (RD[funcName]) {
        sig = RD[funcName].s;
        doc = RD[funcName].d;
      } else {
        var text = model.getValue();
        var escaped = funcName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        var re = new RegExp(
          escaped + "\\s*(?:<-|<<-|=)\\s*function\\s*\\(([^)]*)\\)",
        );
        var m = re.exec(text);
        if (m) {
          sig = funcName + "(" + m[1] + ")";
          doc = "User-defined function";
        }
      }

      if (!sig) return null;

      var paramMatch = sig.match(/\(([^)]*)\)/);
      if (paramMatch) {
        params = paramMatch[1]
          .split(",")
          .map(function (p) {
            return p.trim();
          })
          .filter(function (p) {
            return p.length > 0;
          });
      }

      return {
        value: {
          signatures: [
            {
              label: sig,
              documentation: doc,
              parameters: params.map(function (p) {
                return { label: p, documentation: "" };
              }),
            },
          ],
          activeSignature: 0,
          activeParameter: Math.min(
            activeParam,
            Math.max(0, params.length - 1),
          ),
        },
        dispose: function () {},
      };
    },
  });
};
