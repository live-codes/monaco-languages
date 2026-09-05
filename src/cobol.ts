import type * as Monaco from "monaco-editor";

export default (monaco: typeof Monaco) => {
  // ─── 1. REGISTER LANGUAGE ──────────────────────────────────────────────
  monaco.languages.register({
    id: "cobol",
    extensions: [".cob", ".cbl", ".cpy", ".cobol"],
    aliases: ["COBOL", "cobol", "Cobol"],
    mimetypes: ["text/x-cobol"],
  });

  // ─── 2. LANGUAGE CONFIGURATION ─────────────────────────────────────────
  monaco.languages.setLanguageConfiguration("cobol", {
    comments: {
      lineComment: "*>",
    },
    brackets: [["(", ")"]],
    autoClosingPairs: [
      { open: "(", close: ")" },
      { open: '"', close: '"' },
      { open: "'", close: "'" },
    ],
    surroundingPairs: [
      { open: "(", close: ")" },
      { open: '"', close: '"' },
      { open: "'", close: "'" },
    ],
    wordPattern:
      /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
    indentationRules: {
      increaseIndentPattern:
        /^\s*(IF|ELSE|PERFORM|EVALUATE|WHEN|READ|WRITE|COMPUTE|ADD|SUBTRACT|MULTIPLY|DIVIDE|CALL|STRING|UNSTRING|SEARCH)\b/i,
      decreaseIndentPattern:
        /^\s*(END-IF|END-EVALUATE|END-PERFORM|END-READ|END-WRITE|END-COMPUTE|END-ADD|END-SUBTRACT|END-MULTIPLY|END-DIVIDE|END-CALL|END-STRING|END-UNSTRING|END-SEARCH|ELSE|WHEN)\b/i,
    },
    folding: {
      markers: {
        start: /^\s*(IDENTIFICATION|ENVIRONMENT|DATA|PROCEDURE)\s+DIVISION/i,
        end: /^\s*(IDENTIFICATION|ENVIRONMENT|DATA|PROCEDURE)\s+DIVISION/i,
      },
    },
  });

  // ─── 3. MONARCH TOKENIZER (SYNTAX HIGHLIGHTING) ────────────────────────
  monaco.languages.setMonarchTokensProvider("cobol", {
    ignoreCase: true,
    defaultToken: "",

    divisions: ["IDENTIFICATION", "ENVIRONMENT", "DATA", "PROCEDURE"],

    sections: [
      "CONFIGURATION",
      "INPUT-OUTPUT",
      "FILE",
      "WORKING-STORAGE",
      "LOCAL-STORAGE",
      "LINKAGE",
      "SCREEN",
      "REPORT",
      "COMMUNICATION",
    ],

    verbs: [
      "ACCEPT",
      "ADD",
      "ALTER",
      "CALL",
      "CANCEL",
      "CLOSE",
      "COMPUTE",
      "CONTINUE",
      "DELETE",
      "DISPLAY",
      "DIVIDE",
      "ENTRY",
      "EVALUATE",
      "EXAMINE",
      "EXEC",
      "EXIT",
      "GENERATE",
      "GO",
      "GOBACK",
      "IF",
      "INITIALIZE",
      "INITIATE",
      "INSPECT",
      "INVOKE",
      "MERGE",
      "MOVE",
      "MULTIPLY",
      "OPEN",
      "PERFORM",
      "READ",
      "RECEIVE",
      "RELEASE",
      "RETURN",
      "REWRITE",
      "SEARCH",
      "SEND",
      "SET",
      "SORT",
      "START",
      "STOP",
      "STRING",
      "SUBTRACT",
      "SUPPRESS",
      "TERMINATE",
      "TRANSFORM",
      "UNSTRING",
      "WRITE",
      "XML",
    ],

    keywords: [
      "ADVANCING",
      "AFTER",
      "ALL",
      "ALPHABETIC",
      "ALPHABETIC-LOWER",
      "ALPHABETIC-UPPER",
      "ALPHANUMERIC",
      "ALPHANUMERIC-EDITED",
      "ALSO",
      "AND",
      "ANY",
      "ARE",
      "ASCENDING",
      "ASSIGN",
      "AT",
      "BEFORE",
      "BEGINNING",
      "BINARY",
      "BLANK",
      "BLOCK",
      "BOTTOM",
      "BY",
      "CHARACTER",
      "CHARACTERS",
      "CLASS",
      "COLLATING",
      "COMP",
      "COMP-1",
      "COMP-2",
      "COMP-3",
      "COMP-4",
      "COMP-5",
      "COMPUTATIONAL",
      "COMPUTATIONAL-1",
      "COMPUTATIONAL-2",
      "COMPUTATIONAL-3",
      "COMPUTATIONAL-4",
      "COMPUTATIONAL-5",
      "CONTAINS",
      "CONTENT",
      "CONVERTING",
      "COPY",
      "CORR",
      "CORRESPONDING",
      "COUNT",
      "CURRENCY",
      "DECIMAL-POINT",
      "DECLARATIVES",
      "DELIMITED",
      "DELIMITER",
      "DEPENDING",
      "DESCENDING",
      "DETAIL",
      "DIVISION",
      "DOWN",
      "DUPLICATES",
      "DYNAMIC",
      "ELSE",
      "END",
      "END-ADD",
      "END-CALL",
      "END-COMPUTE",
      "END-DELETE",
      "END-DIVIDE",
      "END-EVALUATE",
      "END-EXEC",
      "END-IF",
      "END-MULTIPLY",
      "END-OF-PAGE",
      "END-PERFORM",
      "END-READ",
      "END-RECEIVE",
      "END-RETURN",
      "END-REWRITE",
      "END-SEARCH",
      "END-START",
      "END-STRING",
      "END-SUBTRACT",
      "END-UNSTRING",
      "END-WRITE",
      "ENDING",
      "ENVIRONMENT",
      "EQUAL",
      "ERROR",
      "EVERY",
      "EXCEPTION",
      "EXTEND",
      "EXTERNAL",
      "FALSE",
      "FD",
      "FILLER",
      "FINAL",
      "FIRST",
      "FOOTING",
      "FOR",
      "FROM",
      "FUNCTION",
      "GIVING",
      "GLOBAL",
      "GREATER",
      "GROUP",
      "HEADING",
      "HIGH-VALUE",
      "HIGH-VALUES",
      "I-O",
      "I-O-CONTROL",
      "IN",
      "INDEX",
      "INDEXED",
      "INDICATE",
      "INITIAL",
      "INPUT",
      "INTO",
      "INVALID",
      "IS",
      "JUST",
      "JUSTIFIED",
      "KEY",
      "LABEL",
      "LAST",
      "LEADING",
      "LEFT",
      "LENGTH",
      "LESS",
      "LINAGE",
      "LINE",
      "LINES",
      "LOCK",
      "LOW-VALUE",
      "LOW-VALUES",
      "MEMORY",
      "MODE",
      "MODULES",
      "NEGATIVE",
      "NEXT",
      "NO",
      "NOT",
      "NULL",
      "NULLS",
      "NUMBER",
      "NUMERIC",
      "NUMERIC-EDITED",
      "OBJECT-COMPUTER",
      "OCCURS",
      "OF",
      "OFF",
      "OMITTED",
      "ON",
      "OPTIONAL",
      "OR",
      "ORDER",
      "ORGANIZATION",
      "OTHER",
      "OUTPUT",
      "OVERFLOW",
      "PACKED-DECIMAL",
      "PADDING",
      "PAGE",
      "PICTURE",
      "PIC",
      "PLUS",
      "POINTER",
      "POSITION",
      "POSITIVE",
      "PRINTING",
      "PROGRAM",
      "PROGRAM-ID",
      "RANDOM",
      "RECORD",
      "RECORDS",
      "RECURSIVE",
      "REDEFINES",
      "REFERENCE",
      "RELATIVE",
      "REMAINDER",
      "REMOVAL",
      "RENAMES",
      "REPLACE",
      "REPLACING",
      "REPOSITORY",
      "RESERVE",
      "RETURNING",
      "REVERSED",
      "REWIND",
      "RIGHT",
      "ROUNDED",
      "RUN",
      "SAME",
      "SD",
      "SECTION",
      "SELECT",
      "SENTENCE",
      "SEPARATE",
      "SEQUENCE",
      "SEQUENTIAL",
      "SIGN",
      "SIZE",
      "SORT-MERGE",
      "SOURCE",
      "SOURCE-COMPUTER",
      "SPACE",
      "SPACES",
      "SPECIAL-NAMES",
      "STANDARD",
      "STANDARD-1",
      "STANDARD-2",
      "STATUS",
      "TALLYING",
      "THAN",
      "THEN",
      "THROUGH",
      "THRU",
      "TIMES",
      "TO",
      "TOP",
      "TRAILING",
      "TRUE",
      "TYPE",
      "UNIT",
      "UNTIL",
      "UP",
      "UPON",
      "USAGE",
      "USE",
      "USING",
      "VALUE",
      "VALUES",
      "VARYING",
      "WHEN",
      "WITH",
      "WORDS",
      "ZERO",
      "ZEROES",
      "ZEROS",
    ],

    builtinFunctions: [
      "ABS",
      "ACOS",
      "ANNUITY",
      "ASIN",
      "ATAN",
      "CHAR",
      "COMBINED-DATETIME",
      "COS",
      "CURRENT-DATE",
      "DATE-OF-INTEGER",
      "DATE-TO-YYYYMMDD",
      "DAY-OF-INTEGER",
      "DAY-TO-YYYYDDD",
      "DISPLAY-OF",
      "E",
      "EXP",
      "EXP10",
      "FACTORIAL",
      "FORMATTED-CURRENT-DATE",
      "FORMATTED-DATE",
      "FORMATTED-DATETIME",
      "FORMATTED-TIME",
      "INTEGER",
      "INTEGER-OF-DATE",
      "INTEGER-OF-DAY",
      "INTEGER-OF-FORMATTED-DATE",
      "INTEGER-PART",
      "LENGTH",
      "LOG",
      "LOG10",
      "LOWER-CASE",
      "MAX",
      "MEAN",
      "MEDIAN",
      "MIDRANGE",
      "MIN",
      "MOD",
      "NATIONAL-OF",
      "NUMVAL",
      "NUMVAL-C",
      "ORD",
      "ORD-MAX",
      "ORD-MIN",
      "PI",
      "PRESENT-VALUE",
      "RANDOM",
      "RANGE",
      "REM",
      "REVERSE",
      "SIN",
      "SQRT",
      "STANDARD-DEVIATION",
      "SUM",
      "TAN",
      "TEST-DATE-YYYYMMDD",
      "TEST-DAY-YYYYDDD",
      "TRIM",
      "UPPER-CASE",
      "VARIANCE",
      "WHEN-COMPILED",
      "YEAR-TO-YYYY",
    ],

    registers: [
      "RETURN-CODE",
      "SORT-RETURN",
      "TALLY",
      "WHEN-COMPILED",
      "DEBUG-ITEM",
      "DEBUG-LINE",
      "DEBUG-NAME",
      "DEBUG-CONTENTS",
      "DEBUG-SUB-1",
      "DEBUG-SUB-2",
      "DEBUG-SUB-3",
      "LINAGE-COUNTER",
      "LINE-COUNTER",
      "PAGE-COUNTER",
    ],

    tokenizer: {
      root: [
        // Column 7 comment (traditional fixed format - line starting with *)
        [/^\s{0,6}\*.*$/, "comment"],

        // Inline comment *>
        [/\*>.*$/, "comment"],

        // Compiler directives
        [/>>.*$/, "keyword.directive"],

        // Division headers
        [
          /\b(IDENTIFICATION|ENVIRONMENT|DATA|PROCEDURE)\s+(DIVISION)\b/i,
          ["keyword.division", "keyword.division"],
        ],

        // Section headers
        [
          /\b(CONFIGURATION|INPUT-OUTPUT|FILE|WORKING-STORAGE|LOCAL-STORAGE|LINKAGE|SCREEN|REPORT|COMMUNICATION)\s+(SECTION)\b/i,
          ["keyword.section", "keyword.section"],
        ],

        // Paragraph headers (PROGRAM-ID, AUTHOR, etc.)
        [
          /\b(PROGRAM-ID|AUTHOR|INSTALLATION|DATE-WRITTEN|DATE-COMPILED|SECURITY|REMARKS)\b/i,
          "keyword.paragraph",
        ],

        // Level numbers
        [/^\s*(0[1-9]|[1-4][0-9]|66|77|88)\b/, "number.level"],

        // FD / SD entries
        [/\b(FD|SD)\b/i, "keyword.fd"],

        // PICTURE / PIC clause with pattern
        [
          /\b(PIC|PICTURE)\s+(IS\s+)?/i,
          { token: "keyword.pic", next: "@picClause" },
        ],

        // COPY statement
        [/\b(COPY)\b/i, "keyword.copy"],

        // EXEC ... END-EXEC (embedded SQL etc.)
        [/\b(EXEC|EXECUTE)\b/i, { token: "keyword.exec", next: "@execBlock" }],

        // Intrinsic functions
        [/\b(FUNCTION)\s+([A-Z][\w-]*)/i, ["keyword", "support.function"]],

        // END-xxx scope terminators
        [
          /\b(END-ADD|END-CALL|END-COMPUTE|END-DELETE|END-DIVIDE|END-EVALUATE|END-EXEC|END-IF|END-MULTIPLY|END-OF-PAGE|END-PERFORM|END-READ|END-RECEIVE|END-RETURN|END-REWRITE|END-SEARCH|END-START|END-STRING|END-SUBTRACT|END-UNSTRING|END-WRITE)\b/i,
          "keyword.scope-terminator",
        ],

        // Verbs
        [
          /\b(ACCEPT|ADD|ALTER|CALL|CANCEL|CLOSE|COMPUTE|CONTINUE|DELETE|DISPLAY|DIVIDE|ENTRY|EVALUATE|EXAMINE|EXIT|GENERATE|GO\s+TO|GO|GOBACK|IF|INITIALIZE|INITIATE|INSPECT|INVOKE|MERGE|MOVE|MULTIPLY|OPEN|PERFORM|READ|RECEIVE|RELEASE|RETURN|REWRITE|SEARCH|SEND|SET|SORT|START|STOP\s+RUN|STOP|STRING|SUBTRACT|SUPPRESS|TERMINATE|TRANSFORM|UNSTRING|WRITE|XML\s+GENERATE|XML\s+PARSE)\b/i,
          "keyword.verb",
        ],

        // Boolean
        [/\b(TRUE|FALSE)\b/i, "keyword.boolean"],

        // Figurative constants
        [
          /\b(SPACE|SPACES|ZERO|ZEROS|ZEROES|HIGH-VALUE|HIGH-VALUES|LOW-VALUE|LOW-VALUES|QUOTE|QUOTES|NULL|NULLS|ALL)\b/i,
          "constant.figurative",
        ],

        // Special registers
        [
          /\b(RETURN-CODE|SORT-RETURN|TALLY|DEBUG-ITEM|DEBUG-LINE|DEBUG-NAME|DEBUG-CONTENTS|LINAGE-COUNTER|LINE-COUNTER|PAGE-COUNTER)\b/i,
          "variable.special",
        ],

        // Keywords
        [
          /\b(ADVANCING|AFTER|ALPHABETIC|ALPHABETIC-LOWER|ALPHABETIC-UPPER|ALPHANUMERIC|ALPHANUMERIC-EDITED|ALSO|AND|ANY|ARE|ASCENDING|ASSIGN|AT|BEFORE|BEGINNING|BINARY|BLANK|BLOCK|BOTTOM|BY|CHARACTER|CHARACTERS|CLASS|COLLATING|COMP|COMP-1|COMP-2|COMP-3|COMP-4|COMP-5|COMPUTATIONAL|COMPUTATIONAL-1|COMPUTATIONAL-2|COMPUTATIONAL-3|COMPUTATIONAL-4|COMPUTATIONAL-5|CONTAINS|CONTENT|CONVERTING|COPY|CORR|CORRESPONDING|COUNT|CURRENCY|DECIMAL-POINT|DECLARATIVES|DELIMITED|DELIMITER|DEPENDING|DESCENDING|DETAIL|DOWN|DUPLICATES|DYNAMIC|ELSE|END|ENDING|ENVIRONMENT|EQUAL|ERROR|EVERY|EXCEPTION|EXTEND|EXTERNAL|FILLER|FINAL|FIRST|FOOTING|FOR|FROM|FUNCTION|GIVING|GLOBAL|GREATER|GROUP|HEADING|I-O|I-O-CONTROL|IN|INDEX|INDEXED|INDICATE|INITIAL|INPUT|INTO|INVALID|IS|JUST|JUSTIFIED|KEY|LABEL|LAST|LEADING|LEFT|LENGTH|LESS|LINAGE|LINE|LINES|LOCK|MEMORY|MODE|MODULES|NEGATIVE|NEXT|NO|NOT|NUMBER|NUMERIC|NUMERIC-EDITED|OBJECT-COMPUTER|OCCURS|OF|OFF|OMITTED|ON|OPTIONAL|OR|ORDER|ORGANIZATION|OTHER|OUTPUT|OVERFLOW|PACKED-DECIMAL|PADDING|PAGE|PLUS|POINTER|POSITION|POSITIVE|PRINTING|PROGRAM|RANDOM|RECORD|RECORDS|RECURSIVE|REDEFINES|REFERENCE|RELATIVE|REMAINDER|REMOVAL|RENAMES|REPLACE|REPLACING|REPOSITORY|RESERVE|RETURNING|REVERSED|REWIND|RIGHT|ROUNDED|RUN|SAME|SECTION|SELECT|SENTENCE|SEPARATE|SEQUENCE|SEQUENTIAL|SIGN|SIZE|SORT-MERGE|SOURCE|SOURCE-COMPUTER|SPECIAL-NAMES|STANDARD|STANDARD-1|STANDARD-2|STATUS|TALLYING|THAN|THEN|THROUGH|THRU|TIMES|TO|TOP|TRAILING|TYPE|UNIT|UNTIL|UP|UPON|USAGE|USE|USING|VALUE|VALUES|VARYING|WHEN|WITH|WORDS)\b/i,
          "keyword",
        ],

        // Strings
        [/"([^"\\]|\\.)*$/, "string.invalid"],
        [/'([^'\\]|\\.)*$/, "string.invalid"],
        [/"/, "string", "@stringDouble"],
        [/'/, "string", "@stringSingle"],

        // Numbers
        [/[+-]?\d+(\.\d+)?/, "number"],

        // Operators
        [/[=<>+\-*/&]/, "operator"],

        // Paragraph / Section label (identifier followed by period at start of area A)
        [/^[ ]{0,3}[A-Z][A-Z0-9-]*(?=\s*\.\s*$)/im, "type.identifier"],

        // Identifiers (data names, etc.)
        [/[A-Za-z][A-Za-z0-9-]*/, "identifier"],

        // Period (sentence terminator)
        [/\./, "delimiter.period"],

        // Parentheses
        [/[()]/, "@brackets"],

        // Whitespace
        [/\s+/, "white"],
      ],

      picClause: [
        [/[SsVvXxAa9ZzBb0\(\)\+\-\*\/\,\.CcRrDdPp]+/, "string.pic"],
        [/\s/, "white", "@pop"],
        [/\./, "delimiter.period", "@pop"],
        [/$/, "", "@pop"],
      ],

      execBlock: [
        [/\b(END-EXEC)\b/i, { token: "keyword.exec", next: "@pop" }],
        [/./, "string.exec"],
      ],

      stringDouble: [
        [/[^\\"]+/, "string"],
        [/\\./, "string.escape"],
        [/"/, "string", "@pop"],
      ],

      stringSingle: [
        [/[^\\']+/, "string"],
        [/\\./, "string.escape"],
        [/'/, "string", "@pop"],
      ],
    },
  });

  // ─── 4. HOVER DOCUMENTATION DATABASE ───────────────────────────────────
  const hoverDocs = {
    IDENTIFICATION: {
      desc: "IDENTIFICATION DIVISION",
      detail:
        "The first division of a COBOL program. It identifies the program with a name and optionally provides other documentary information such as author and date written.",
    },
    ENVIRONMENT: {
      desc: "ENVIRONMENT DIVISION",
      detail:
        "Specifies the computer environment. Contains CONFIGURATION SECTION (source/object computer) and INPUT-OUTPUT SECTION (file control and I-O control).",
    },
    DATA: {
      desc: "DATA DIVISION",
      detail:
        "Describes the data that the program creates, manipulates, and outputs. Contains FILE SECTION, WORKING-STORAGE SECTION, LOCAL-STORAGE SECTION, and LINKAGE SECTION.",
    },
    PROCEDURE: {
      desc: "PROCEDURE DIVISION",
      detail:
        "Contains the executable statements (procedures) of the program. Organized into sections and paragraphs. The logic of the program is written here.",
    },
    "PROGRAM-ID": {
      desc: "PROGRAM-ID paragraph",
      detail:
        "Specifies the name by which the program is known. This is the only required paragraph in the IDENTIFICATION DIVISION.\n\nSyntax: PROGRAM-ID. program-name [IS INITIAL|RECURSIVE].",
    },
    DISPLAY: {
      desc: "DISPLAY statement",
      detail:
        'Outputs data to the terminal or a specified device.\n\nSyntax: DISPLAY {identifier|literal} ... [UPON mnemonic-name] [WITH NO ADVANCING].\n\nExample:\n  DISPLAY "Hello, World!"',
    },
    MOVE: {
      desc: "MOVE statement",
      detail:
        'Transfers data from one data item to another.\n\nSyntax: MOVE {identifier|literal} TO identifier-1 [identifier-2 ...]\nMOVE CORRESPONDING group-1 TO group-2\n\nExample:\n  MOVE "JOHN" TO WS-NAME\n  MOVE ZEROS TO WS-COUNTER',
    },
    PERFORM: {
      desc: "PERFORM statement",
      detail:
        "Transfers control to one or more procedures and returns control afterwards.\n\nForms:\n  PERFORM paragraph-name [THRU paragraph-name-2]\n  PERFORM paragraph-name n TIMES\n  PERFORM paragraph-name UNTIL condition\n  PERFORM paragraph-name VARYING id FROM val BY val UNTIL condition\n  PERFORM ... END-PERFORM (inline)",
    },
    IF: {
      desc: "IF statement",
      detail:
        "Conditional execution of statements.\n\nSyntax:\n  IF condition THEN\n    statements\n  [ELSE\n    statements]\n  END-IF\n\nConditions can use relational operators: =, >, <, >=, <=, NOT =, etc.",
    },
    EVALUATE: {
      desc: "EVALUATE statement",
      detail:
        "Multi-branch conditional (similar to switch/case).\n\nSyntax:\n  EVALUATE {identifier|TRUE|FALSE|expression}\n    WHEN value-1 statements\n    WHEN value-2 statements\n    WHEN OTHER  statements\n  END-EVALUATE",
    },
    COMPUTE: {
      desc: "COMPUTE statement",
      detail:
        "Assigns the result of an arithmetic expression to a data item.\n\nSyntax: COMPUTE identifier [ROUNDED] = arithmetic-expression\n  [ON SIZE ERROR statements]\n  [NOT ON SIZE ERROR statements]\n  [END-COMPUTE]\n\nExample:\n  COMPUTE WS-TOTAL = WS-PRICE * WS-QTY",
    },
    ADD: {
      desc: "ADD statement",
      detail:
        "Adds numeric values.\n\nForms:\n  ADD id-1 [id-2 ...] TO id-n [ROUNDED]\n  ADD id-1 id-2 GIVING id-3 [ROUNDED]\n  ADD CORRESPONDING group-1 TO group-2\n\nExample:\n  ADD 1 TO WS-COUNTER",
    },
    SUBTRACT: {
      desc: "SUBTRACT statement",
      detail:
        "Subtracts one or more numeric values from another.\n\nForms:\n  SUBTRACT id-1 FROM id-2 [ROUNDED]\n  SUBTRACT id-1 FROM id-2 GIVING id-3 [ROUNDED]\n  SUBTRACT CORRESPONDING group-1 FROM group-2",
    },
    MULTIPLY: {
      desc: "MULTIPLY statement",
      detail:
        "Multiplies numeric values.\n\nForms:\n  MULTIPLY id-1 BY id-2 [ROUNDED]\n  MULTIPLY id-1 BY id-2 GIVING id-3 [ROUNDED]",
    },
    DIVIDE: {
      desc: "DIVIDE statement",
      detail:
        "Divides numeric values.\n\nForms:\n  DIVIDE id-1 INTO id-2 [ROUNDED]\n  DIVIDE id-1 INTO id-2 GIVING id-3 [REMAINDER id-4]\n  DIVIDE id-1 BY id-2 GIVING id-3 [REMAINDER id-4]",
    },
    ACCEPT: {
      desc: "ACCEPT statement",
      detail:
        "Reads data from the terminal or system.\n\nSyntax:\n  ACCEPT identifier [FROM {DATE|DAY|DAY-OF-WEEK|TIME|CONSOLE}]\n\nExample:\n  ACCEPT WS-USER-INPUT\n  ACCEPT WS-TODAY FROM DATE YYYYMMDD",
    },
    READ: {
      desc: "READ statement",
      detail:
        "Retrieves the next logical record from a file.\n\nSyntax:\n  READ file-name [NEXT|PREVIOUS] RECORD [INTO identifier]\n    [AT END statements]\n    [NOT AT END statements]\n  END-READ",
    },
    WRITE: {
      desc: "WRITE statement",
      detail:
        "Writes a logical record to a file.\n\nSyntax:\n  WRITE record-name [FROM identifier]\n    [BEFORE|AFTER ADVANCING {integer LINES|PAGE}]\n    [INVALID KEY statements]\n  END-WRITE",
    },
    OPEN: {
      desc: "OPEN statement",
      detail:
        "Opens one or more files for processing.\n\nSyntax: OPEN {INPUT|OUTPUT|I-O|EXTEND} file-name-1 [file-name-2 ...]",
    },
    CLOSE: {
      desc: "CLOSE statement",
      detail:
        "Closes one or more files.\n\nSyntax: CLOSE file-name-1 [file-name-2 ...]",
    },
    CALL: {
      desc: "CALL statement",
      detail:
        "Transfers control to another program.\n\nSyntax:\n  CALL {identifier|literal}\n    [USING [BY REFERENCE|BY CONTENT|BY VALUE] id-1 ...]\n    [RETURNING identifier]\n    [ON EXCEPTION statements]\n  END-CALL",
    },
    STRING: {
      desc: "STRING statement",
      detail:
        "Concatenates partial or complete contents of data items.\n\nSyntax:\n  STRING id-1 DELIMITED BY {id|SIZE}\n         id-2 DELIMITED BY {id|SIZE}\n    INTO id-dest\n    [WITH POINTER id-ptr]\n    [ON OVERFLOW statements]\n  END-STRING",
    },
    UNSTRING: {
      desc: "UNSTRING statement",
      detail:
        "Splits the contents of a data item into multiple receiving fields.\n\nSyntax:\n  UNSTRING id-source\n    DELIMITED BY [ALL] id-delim [OR [ALL] id-delim-2]\n    INTO id-1 [DELIMITER IN id-d1] [COUNT IN id-c1]\n         id-2 ...\n    [WITH POINTER id-ptr]\n    [TALLYING IN id-tally]\n  END-UNSTRING",
    },
    INSPECT: {
      desc: "INSPECT statement",
      detail:
        "Counts or replaces occurrences of characters in a data item.\n\nForms:\n  INSPECT id TALLYING ...\n  INSPECT id REPLACING ...\n  INSPECT id TALLYING ... REPLACING ...\n  INSPECT id CONVERTING ... TO ...",
    },
    SEARCH: {
      desc: "SEARCH statement",
      detail:
        "Searches a table (array) for an element satisfying a condition.\n\nForms:\n  SEARCH identifier [AT END statements]\n    WHEN condition statement-1\n  END-SEARCH\n\n  SEARCH ALL identifier [AT END statements]\n    WHEN condition statement-1\n  END-SEARCH (binary search)",
    },
    INITIALIZE: {
      desc: "INITIALIZE statement",
      detail:
        "Sets selected data item categories to predetermined values.\n\nSyntax: INITIALIZE identifier-1 [identifier-2 ...]\n  [REPLACING {ALPHABETIC|ALPHANUMERIC|NUMERIC|...} DATA BY {id|literal}]",
    },
    SORT: {
      desc: "SORT statement",
      detail:
        "Sorts records in a file or table.\n\nSyntax:\n  SORT file-name ON {ASCENDING|DESCENDING} KEY data-name-1 ...\n    [INPUT PROCEDURE IS section-name | USING file-1]\n    [OUTPUT PROCEDURE IS section-name | GIVING file-2]",
    },
    GO: {
      desc: "GO TO statement",
      detail:
        "Transfers control to a specified paragraph or section.\n\nSyntax:\n  GO TO paragraph-name\n  GO TO para-1 para-2 ... DEPENDING ON identifier\n\nNote: Excessive use of GO TO is discouraged; prefer PERFORM.",
    },
    GOBACK: {
      desc: "GOBACK statement",
      detail:
        "Returns control to the calling program or the operating system. Equivalent to STOP RUN for a main program or EXIT PROGRAM for a subprogram. Preferred over STOP RUN in modern COBOL.",
    },
    STOP: {
      desc: "STOP statement",
      detail:
        "Terminates the program.\n\nSyntax: STOP RUN [RETURNING integer]\n\nEnds the entire run unit and returns control to the operating system.",
    },
    COPY: {
      desc: "COPY statement",
      detail:
        "Includes text from a copybook (external file) into the program.\n\nSyntax: COPY copybook-name [OF|IN library-name]\n  [REPLACING ==pseudo-text-1== BY ==pseudo-text-2==].\n\nUsed to share common data definitions across programs.",
    },
    REPLACE: {
      desc: "REPLACE statement",
      detail:
        "Substitutes text in subsequent source lines.\n\nSyntax: REPLACE ==pseudo-text-1== BY ==pseudo-text-2==.\nREPLACE OFF.",
    },
    PIC: {
      desc: "PICTURE (PIC) clause",
      detail:
        "Defines the data type and format of an elementary data item.\n\nCommon patterns:\n  PIC X(n)     — Alphanumeric, n characters\n  PIC 9(n)     — Numeric, n digits\n  PIC 9(n)V9(m) — Numeric with decimal\n  PIC S9(n)    — Signed numeric\n  PIC Z(n)9    — Edited numeric (leading zeros suppressed)\n  PIC A(n)     — Alphabetic only",
    },
    PICTURE: {
      desc: "PICTURE (PIC) clause",
      detail:
        "Defines the data type and format of an elementary data item. See PIC for details.",
    },
    VALUE: {
      desc: "VALUE clause",
      detail:
        'Specifies the initial value of a data item.\n\nSyntax: VALUE IS literal.\n\nExamples:\n  05 WS-NAME    PIC X(20) VALUE "DEFAULT".\n  05 WS-COUNT   PIC 9(3)  VALUE ZEROS.\n  88 WS-EOF     VALUE "Y".',
    },
    OCCURS: {
      desc: "OCCURS clause",
      detail:
        "Defines a table (array) within a record.\n\nSyntax:\n  OCCURS integer TIMES\n    [ASCENDING|DESCENDING KEY IS data-name]\n    [INDEXED BY index-name]\n\n  OCCURS integer-1 TO integer-2 TIMES\n    DEPENDING ON data-name",
    },
    REDEFINES: {
      desc: "REDEFINES clause",
      detail:
        "Allows the same storage area to be described by different data descriptions.\n\nSyntax: level-number data-name-1 REDEFINES data-name-2.\n\nBoth items must be at the same level number. The REDEFINES item must immediately follow the redefined item.",
    },
    SELECT: {
      desc: "SELECT clause",
      detail:
        "Associates a file with an external file in the ENVIRONMENT DIVISION.\n\nSyntax:\n  SELECT [OPTIONAL] file-name\n    ASSIGN TO external-file-name\n    [ORGANIZATION IS {SEQUENTIAL|INDEXED|RELATIVE}]\n    [ACCESS MODE IS {SEQUENTIAL|RANDOM|DYNAMIC}]\n    [RECORD KEY IS data-name]\n    [FILE STATUS IS data-name].",
    },
    FD: {
      desc: "File Description (FD)",
      detail:
        "Describes the physical attributes of a file in the FILE SECTION.\n\nSyntax:\n  FD file-name\n    [RECORD CONTAINS integer CHARACTERS]\n    [BLOCK CONTAINS integer RECORDS]\n    [LABEL RECORDS ARE {STANDARD|OMITTED}]\n    [DATA RECORD IS record-name].",
    },
    FUNCTION: {
      desc: "Intrinsic FUNCTION",
      detail:
        "Calls a built-in (intrinsic) function.\n\nSyntax: FUNCTION function-name(arguments)\n\nCommon functions:\n  FUNCTION CURRENT-DATE — returns 21-char date/time\n  FUNCTION LENGTH(item) — returns byte length\n  FUNCTION UPPER-CASE(item) — converts to uppercase\n  FUNCTION LOWER-CASE(item) — converts to lowercase\n  FUNCTION TRIM(item) — removes leading/trailing spaces\n  FUNCTION NUMVAL(item) — converts string to number",
    },
    "WORKING-STORAGE": {
      desc: "WORKING-STORAGE SECTION",
      detail:
        "Defines data items that persist for the lifetime of the program. Variables declared here retain their values between calls (unless INITIAL is specified on the PROGRAM-ID).",
    },
    "LOCAL-STORAGE": {
      desc: "LOCAL-STORAGE SECTION",
      detail:
        "Defines data items that are allocated and initialized each time the program is called. Unlike WORKING-STORAGE, these are re-initialized on each invocation.",
    },
    LINKAGE: {
      desc: "LINKAGE SECTION",
      detail:
        "Describes data items that are passed to the program from a calling program. These items are addressable only when the program is called with corresponding USING parameters.",
    },
    CONTINUE: {
      desc: "CONTINUE statement",
      detail:
        "A no-operation statement. Used as a placeholder where a statement is syntactically required but no action is needed.\n\nCommonly used in empty WHEN branches or as a placeholder in IF/ELSE.",
    },
    EXIT: {
      desc: "EXIT statement",
      detail:
        "Marks the logical end of a paragraph or section.\n\nForms:\n  EXIT — marks end of performed paragraph\n  EXIT PROGRAM — returns control to calling program\n  EXIT PERFORM — exits inline PERFORM\n  EXIT PERFORM CYCLE — skips to next iteration\n  EXIT SECTION — exits current section",
    },
    SET: {
      desc: "SET statement",
      detail:
        "Modifies index values, condition names, or pointer values.\n\nForms:\n  SET index-name TO integer\n  SET index-name UP BY integer\n  SET index-name DOWN BY integer\n  SET condition-name TO TRUE\n  SET pointer-item TO ADDRESS OF data-item",
    },
    EXEC: {
      desc: "EXEC ... END-EXEC block",
      detail:
        "Delimits embedded code from other languages, most commonly SQL.\n\nSyntax:\n  EXEC SQL\n    SELECT column INTO :host-variable\n    FROM table\n    WHERE condition\n  END-EXEC\n\nAlso used for EXEC CICS and EXEC DLI in mainframe environments.",
    },
  };

  // ─── 5. HOVER PROVIDER ─────────────────────────────────────────────────
  monaco.languages.registerHoverProvider("cobol", {
    provideHover: function (model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return null;
      const w = word.word.toUpperCase();

      // Check direct match
      if (hoverDocs[w]) {
        return {
          range: new monaco.Range(
            position.lineNumber,
            word.startColumn,
            position.lineNumber,
            word.endColumn,
          ),
          contents: [
            { value: "**" + hoverDocs[w].desc + "**" },
            { value: "```\n" + hoverDocs[w].detail + "\n```" },
          ],
        };
      }

      // Check if it's a known intrinsic function
      const builtinFunctions = [
        "ABS",
        "ACOS",
        "ANNUITY",
        "ASIN",
        "ATAN",
        "CHAR",
        "COMBINED-DATETIME",
        "COS",
        "CURRENT-DATE",
        "DATE-OF-INTEGER",
        "DATE-TO-YYYYMMDD",
        "DAY-OF-INTEGER",
        "DAY-TO-YYYYDDD",
        "DISPLAY-OF",
        "E",
        "EXP",
        "EXP10",
        "FACTORIAL",
        "INTEGER",
        "INTEGER-OF-DATE",
        "INTEGER-OF-DAY",
        "INTEGER-PART",
        "LENGTH",
        "LOG",
        "LOG10",
        "LOWER-CASE",
        "MAX",
        "MEAN",
        "MEDIAN",
        "MIDRANGE",
        "MIN",
        "MOD",
        "NATIONAL-OF",
        "NUMVAL",
        "NUMVAL-C",
        "ORD",
        "ORD-MAX",
        "ORD-MIN",
        "PI",
        "PRESENT-VALUE",
        "RANDOM",
        "RANGE",
        "REM",
        "REVERSE",
        "SIN",
        "SQRT",
        "STANDARD-DEVIATION",
        "SUM",
        "TAN",
        "TRIM",
        "UPPER-CASE",
        "VARIANCE",
        "WHEN-COMPILED",
        "YEAR-TO-YYYY",
      ];
      if (builtinFunctions.indexOf(w) !== -1) {
        return {
          range: new monaco.Range(
            position.lineNumber,
            word.startColumn,
            position.lineNumber,
            word.endColumn,
          ),
          contents: [
            { value: "**FUNCTION " + w + "**" },
            {
              value:
                "```\nCOBOL intrinsic function.\nUsage: FUNCTION " +
                w +
                "(arguments)\n```",
            },
          ],
        };
      }

      // Try to find user-defined data item or paragraph
      const text = model.getValue();
      const lines = text.split("\n");
      const regex = new RegExp(
        "\\b" + word.word.replace(/[-]/g, "\\-") + "\\b",
        "i",
      );
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();
        // Check if it's a data definition line
        const dataMatch = trimmed.match(
          /^(\d{1,2})\s+([\w-]+)\s*(PIC|PICTURE|VALUE|OCCURS|REDEFINES)?/i,
        );
        if (dataMatch && dataMatch[2].toUpperCase() === w) {
          return {
            range: new monaco.Range(
              position.lineNumber,
              word.startColumn,
              position.lineNumber,
              word.endColumn,
            ),
            contents: [
              {
                value:
                  "**Data Item: " +
                  dataMatch[2] +
                  "** (Level " +
                  dataMatch[1] +
                  ")",
              },
              { value: "```cobol\n" + trimmed + "\n```" },
              { value: "*Defined at line " + (i + 1) + "*" },
            ],
          };
        }
        // Check paragraph labels
        const paraMatch = trimmed.match(/^([A-Z][A-Z0-9-]+)\s*\.\s*$/i);
        if (
          paraMatch &&
          paraMatch[1].toUpperCase() === w &&
          i + 1 !== position.lineNumber
        ) {
          return {
            range: new monaco.Range(
              position.lineNumber,
              word.startColumn,
              position.lineNumber,
              word.endColumn,
            ),
            contents: [
              { value: "**Paragraph: " + paraMatch[1] + "**" },
              { value: "*Defined at line " + (i + 1) + "*" },
            ],
          };
        }
      }

      return null;
    },
  });

  // ─── 6. GO TO DEFINITION PROVIDER ──────────────────────────────────────
  monaco.languages.registerDefinitionProvider("cobol", {
    provideDefinition: function (model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return null;
      const target = word.word.toUpperCase();
      const text = model.getValue();
      const lines = text.split("\n");

      for (let i = 0; i < lines.length; i++) {
        const trimmed = lines[i].trim();
        // Data item definition
        const dataMatch = trimmed.match(/^(\d{1,2})\s+([\w-]+)/i);
        if (dataMatch && dataMatch[2].toUpperCase() === target) {
          const col = lines[i].indexOf(dataMatch[2]) + 1;
          return {
            uri: model.uri,
            range: new monaco.Range(
              i + 1,
              col,
              i + 1,
              col + dataMatch[2].length,
            ),
          };
        }
        // Paragraph label
        const paraMatch = trimmed.match(/^([A-Z][A-Z0-9-]+)\s*\.\s*$/i);
        if (paraMatch && paraMatch[1].toUpperCase() === target) {
          const col = lines[i].indexOf(paraMatch[1]) + 1;
          return {
            uri: model.uri,
            range: new monaco.Range(
              i + 1,
              col,
              i + 1,
              col + paraMatch[1].length,
            ),
          };
        }
        // Section label
        const secMatch = trimmed.match(/^([A-Z][A-Z0-9-]+)\s+SECTION\s*\./i);
        if (secMatch && secMatch[1].toUpperCase() === target) {
          const col = lines[i].indexOf(secMatch[1]) + 1;
          return {
            uri: model.uri,
            range: new monaco.Range(
              i + 1,
              col,
              i + 1,
              col + secMatch[1].length,
            ),
          };
        }
      }
      return null;
    },
  });

  // ─── 7. DOCUMENT SYMBOL PROVIDER (Outline) ────────────────────────────
  monaco.languages.registerDocumentSymbolProvider("cobol", {
    provideDocumentSymbols: function (model) {
      const symbols = [];
      const lines = model.getLinesContent();

      for (let i = 0; i < lines.length; i++) {
        const trimmed = lines[i].trim();
        const lineNum = i + 1;

        // Divisions
        const divMatch = trimmed.match(
          /^(IDENTIFICATION|ENVIRONMENT|DATA|PROCEDURE)\s+DIVISION/i,
        );
        if (divMatch) {
          symbols.push({
            name: divMatch[0],
            kind: monaco.languages.SymbolKind.Module,
            range: new monaco.Range(lineNum, 1, lineNum, lines[i].length + 1),
            selectionRange: new monaco.Range(
              lineNum,
              1,
              lineNum,
              lines[i].length + 1,
            ),
          });
        }

        // Sections
        const secMatch = trimmed.match(/^([A-Z][A-Z0-9-]*)\s+SECTION\s*\./i);
        if (secMatch) {
          symbols.push({
            name: secMatch[1] + " SECTION",
            kind: monaco.languages.SymbolKind.Namespace,
            range: new monaco.Range(lineNum, 1, lineNum, lines[i].length + 1),
            selectionRange: new monaco.Range(
              lineNum,
              1,
              lineNum,
              lines[i].length + 1,
            ),
          });
        }

        // Paragraphs
        const paraMatch = trimmed.match(/^([A-Z][A-Z0-9-]+)\s*\.\s*$/i);
        if (paraMatch && !trimmed.match(/DIVISION|SECTION/i)) {
          symbols.push({
            name: paraMatch[1],
            kind: monaco.languages.SymbolKind.Function,
            range: new monaco.Range(lineNum, 1, lineNum, lines[i].length + 1),
            selectionRange: new monaco.Range(
              lineNum,
              1,
              lineNum,
              lines[i].length + 1,
            ),
          });
        }

        // Level 01 data items
        const dataMatch = trimmed.match(/^(01|1)\s+([\w-]+)/i);
        if (dataMatch && dataMatch[2].toUpperCase() !== "FILLER") {
          symbols.push({
            name: dataMatch[2],
            kind: monaco.languages.SymbolKind.Variable,
            range: new monaco.Range(lineNum, 1, lineNum, lines[i].length + 1),
            selectionRange: new monaco.Range(
              lineNum,
              1,
              lineNum,
              lines[i].length + 1,
            ),
          });
        }

        // FD entries
        const fdMatch = trimmed.match(/^(FD|SD)\s+([\w-]+)/i);
        if (fdMatch) {
          symbols.push({
            name: fdMatch[1] + " " + fdMatch[2],
            kind: monaco.languages.SymbolKind.File,
            range: new monaco.Range(lineNum, 1, lineNum, lines[i].length + 1),
            selectionRange: new monaco.Range(
              lineNum,
              1,
              lineNum,
              lines[i].length + 1,
            ),
          });
        }
      }
      return symbols;
    },
  });

  // ─── 8. COMPLETION PROVIDER (Autocomplete + Snippets) ──────────────────
  monaco.languages.registerCompletionItemProvider("cobol", {
    triggerCharacters: [" ", ".", "-"],
    provideCompletionItems: function (model, position) {
      const textUntilPosition = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endLineNumber: position.lineNumber,
        endColumn: word.endColumn,
      };

      const suggestions = [];

      // ─── SNIPPETS ───
      const snippets = [
        {
          label: "program-skeleton",
          detail: "Complete COBOL program skeleton",
          insertText: [
            "IDENTIFICATION DIVISION.",
            "PROGRAM-ID. ${1:PROGRAM-NAME}.",
            "",
            "ENVIRONMENT DIVISION.",
            "CONFIGURATION SECTION.",
            "SOURCE-COMPUTER. ${2:IBM-370}.",
            "OBJECT-COMPUTER. ${2:IBM-370}.",
            "",
            "DATA DIVISION.",
            "WORKING-STORAGE SECTION.",
            "01 ${3:WS-VARIABLES}.",
            "   05 ${4:WS-ITEM}    PIC ${5:X(10)} VALUE ${6:SPACES}.",
            "",
            "PROCEDURE DIVISION.",
            "${7:MAIN-PARA}.",
            '    ${8:DISPLAY "Hello, COBOL!"}',
            "    STOP RUN.",
          ].join("\n"),
          documentation:
            "Inserts a complete COBOL program skeleton with all four divisions.",
        },
        {
          label: "identification-division",
          detail: "IDENTIFICATION DIVISION template",
          insertText: [
            "IDENTIFICATION DIVISION.",
            "PROGRAM-ID. ${1:PROGRAM-NAME}.",
            "AUTHOR. ${2:Author Name}.",
            "DATE-WRITTEN. ${3:2025-01-01}.",
          ].join("\n"),
          documentation: "Identification Division with common paragraphs.",
        },
        {
          label: "working-storage",
          detail: "WORKING-STORAGE SECTION template",
          insertText: [
            "WORKING-STORAGE SECTION.",
            "01 ${1:WS-VARIABLES}.",
            "   05 ${2:WS-ITEM-1}    PIC ${3:X(20)} VALUE ${4:SPACES}.",
            "   05 ${5:WS-ITEM-2}    PIC ${6:9(5)}  VALUE ${7:ZEROS}.",
          ].join("\n"),
          documentation: "Working-Storage Section with sample data items.",
        },
        {
          label: "if-else",
          detail: "IF ... ELSE ... END-IF",
          insertText: [
            "IF ${1:condition}",
            "    ${2:statement-1}",
            "ELSE",
            "    ${3:statement-2}",
            "END-IF",
          ].join("\n"),
          documentation:
            "IF-ELSE conditional block with END-IF scope terminator.",
        },
        {
          label: "if-then",
          detail: "IF ... END-IF",
          insertText: [
            "IF ${1:condition}",
            "    ${2:statement}",
            "END-IF",
          ].join("\n"),
          documentation: "Simple IF block with END-IF scope terminator.",
        },
        {
          label: "evaluate-true",
          detail: "EVALUATE TRUE (switch/case)",
          insertText: [
            "EVALUATE TRUE",
            "    WHEN ${1:condition-1}",
            "        ${2:statement-1}",
            "    WHEN ${3:condition-2}",
            "        ${4:statement-2}",
            "    WHEN OTHER",
            "        ${5:default-statement}",
            "END-EVALUATE",
          ].join("\n"),
          documentation:
            "EVALUATE TRUE block — equivalent to a switch/case statement.",
        },
        {
          label: "evaluate-variable",
          detail: "EVALUATE variable",
          insertText: [
            "EVALUATE ${1:WS-VARIABLE}",
            "    WHEN ${2:value-1}",
            "        ${3:statement-1}",
            "    WHEN ${4:value-2}",
            "        ${5:statement-2}",
            "    WHEN OTHER",
            "        ${6:default-statement}",
            "END-EVALUATE",
          ].join("\n"),
          documentation: "EVALUATE a variable against multiple values.",
        },
        {
          label: "perform-until",
          detail: "PERFORM ... UNTIL",
          insertText: [
            "PERFORM ${1:PARA-NAME}",
            '    UNTIL ${2:WS-EOF} = ${3:"Y"}',
          ].join("\n"),
          documentation: "PERFORM a paragraph until a condition is met.",
        },
        {
          label: "perform-varying",
          detail: "PERFORM VARYING (for-loop)",
          insertText: [
            "PERFORM ${1:PARA-NAME}",
            "    VARYING ${2:WS-INDEX} FROM ${3:1} BY ${4:1}",
            "    UNTIL ${2:WS-INDEX} > ${5:10}",
          ].join("\n"),
          documentation: "PERFORM VARYING loop — equivalent to a for-loop.",
        },
        {
          label: "perform-inline",
          detail: "Inline PERFORM ... END-PERFORM",
          insertText: [
            "PERFORM VARYING ${1:WS-IDX} FROM ${2:1} BY ${3:1}",
            "    UNTIL ${1:WS-IDX} > ${4:10}",
            "    ${5:DISPLAY ${1:WS-IDX}}",
            "END-PERFORM",
          ].join("\n"),
          documentation: "Inline PERFORM block with END-PERFORM.",
        },
        {
          label: "perform-times",
          detail: "PERFORM ... TIMES",
          insertText: "PERFORM ${1:PARA-NAME} ${2:10} TIMES",
          documentation: "PERFORM a paragraph a fixed number of times.",
        },
        {
          label: "read-file",
          detail: "READ file with AT END",
          insertText: [
            "READ ${1:FILE-NAME} INTO ${2:WS-RECORD}",
            "    AT END",
            "        SET ${3:WS-EOF} TO TRUE",
            "    NOT AT END",
            "        ${4:PERFORM PROCESS-RECORD}",
            "END-READ",
          ].join("\n"),
          documentation: "READ a file record with AT END and NOT AT END.",
        },
        {
          label: "write-record",
          detail: "WRITE record FROM",
          insertText: [
            "WRITE ${1:RECORD-NAME} FROM ${2:WS-OUTPUT-REC}",
            "    ${3:AFTER ADVANCING 1 LINES}",
          ].join("\n"),
          documentation: "WRITE a record to a file.",
        },
        {
          label: "open-files",
          detail: "OPEN INPUT/OUTPUT files",
          insertText: [
            "OPEN INPUT  ${1:INPUT-FILE}",
            "     OUTPUT ${2:OUTPUT-FILE}",
          ].join("\n"),
          documentation: "OPEN files for INPUT and OUTPUT.",
        },
        {
          label: "file-select",
          detail: "SELECT ... ASSIGN TO",
          insertText: [
            "SELECT ${1:FILE-NAME}",
            '    ASSIGN TO ${2:"filename.dat"}',
            "    ORGANIZATION IS ${3:SEQUENTIAL}",
            "    ACCESS MODE IS ${4:SEQUENTIAL}",
            "    FILE STATUS IS ${5:WS-FILE-STATUS}.",
          ].join("\n"),
          documentation: "File SELECT/ASSIGN in INPUT-OUTPUT SECTION.",
        },
        {
          label: "fd-entry",
          detail: "FD file description",
          insertText: [
            "FD ${1:FILE-NAME}",
            "    RECORD CONTAINS ${2:80} CHARACTERS.",
            "01 ${3:FILE-RECORD}.",
            "   05 ${4:FR-DATA}    PIC X(${2:80}).",
          ].join("\n"),
          documentation: "File Description (FD) entry with record definition.",
        },
        {
          label: "call-program",
          detail: "CALL subprogram",
          insertText: [
            'CALL ${1:"SUBPROG"}',
            "    USING ${2:WS-PARAM-1}",
            "          ${3:WS-PARAM-2}",
            "END-CALL",
          ].join("\n"),
          documentation: "CALL a subprogram with parameters.",
        },
        {
          label: "string-concat",
          detail: "STRING concatenation",
          insertText: [
            "STRING ${1:WS-FIRST} DELIMITED BY SPACES",
            '       " " DELIMITED BY SIZE',
            "       ${2:WS-LAST} DELIMITED BY SPACES",
            "    INTO ${3:WS-FULL-NAME}",
            "    WITH POINTER ${4:WS-PTR}",
            "END-STRING",
          ].join("\n"),
          documentation: "STRING concatenation example.",
        },
        {
          label: "unstring-split",
          detail: "UNSTRING split",
          insertText: [
            "UNSTRING ${1:WS-INPUT}",
            '    DELIMITED BY ${2:","}',
            "    INTO ${3:WS-FIELD-1}",
            "         ${4:WS-FIELD-2}",
            "         ${5:WS-FIELD-3}",
            "END-UNSTRING",
          ].join("\n"),
          documentation: "UNSTRING to split a delimited string.",
        },
        {
          label: "search-table",
          detail: "SEARCH table",
          insertText: [
            "SET ${1:WS-IDX} TO 1",
            "SEARCH ${2:WS-TABLE-ENTRY}",
            "    AT END",
            '        ${3:DISPLAY "Not found"}',
            "    WHEN ${4:WS-TABLE-KEY(WS-IDX)} = ${5:WS-SEARCH-KEY}",
            "        ${6:PERFORM FOUND-PARA}",
            "END-SEARCH",
          ].join("\n"),
          documentation: "Sequential SEARCH of a table.",
        },
        {
          label: "compute-arithmetic",
          detail: "COMPUTE with ON SIZE ERROR",
          insertText: [
            "COMPUTE ${1:WS-RESULT} = ${2:WS-A * WS-B + WS-C}",
            "    ON SIZE ERROR",
            '        ${3:DISPLAY "Arithmetic overflow"}',
            "    NOT ON SIZE ERROR",
            "        ${4:CONTINUE}",
            "END-COMPUTE",
          ].join("\n"),
          documentation:
            "COMPUTE with arithmetic expression and error handling.",
        },
        {
          label: "inspect-tallying",
          detail: "INSPECT TALLYING",
          insertText: [
            "INSPECT ${1:WS-STRING}",
            "    TALLYING ${2:WS-COUNT}",
            '    FOR ALL ${3:"A"}',
          ].join("\n"),
          documentation: "INSPECT to count occurrences of a character.",
        },
        {
          label: "exec-sql",
          detail: "EXEC SQL ... END-EXEC",
          insertText: [
            "EXEC SQL",
            "    ${1:SELECT column-1}",
            "    ${2:INTO :WS-HOST-VAR}",
            "    ${3:FROM table-name}",
            "    ${4:WHERE condition}",
            "END-EXEC",
          ].join("\n"),
          documentation: "Embedded SQL block for DB2/SQL access.",
        },
        {
          label: "01-group",
          detail: "01 level group item",
          insertText: [
            "01 ${1:WS-GROUP-NAME}.",
            "   05 ${2:WS-FIELD-1}    PIC ${3:X(10)} VALUE ${4:SPACES}.",
            "   05 ${5:WS-FIELD-2}    PIC ${6:9(5)}  VALUE ${7:ZEROS}.",
          ].join("\n"),
          documentation: "Level 01 group item with child fields.",
        },
        {
          label: "88-condition",
          detail: "88 level condition name",
          insertText: '88 ${1:WS-CONDITION}    VALUE ${2:"Y"}.',
          documentation: "Level 88 condition name — a boolean flag.",
        },
        {
          label: "occurs-table",
          detail: "Table with OCCURS and INDEXED BY",
          insertText: [
            "01 ${1:WS-TABLE}.",
            "   05 ${2:WS-ENTRY} OCCURS ${3:100} TIMES",
            "       INDEXED BY ${4:WS-IDX}.",
            "      10 ${5:WS-ENTRY-KEY}   PIC ${6:X(10)}.",
            "      10 ${7:WS-ENTRY-VALUE} PIC ${8:9(5)}.",
          ].join("\n"),
          documentation: "Table (array) definition with OCCURS and INDEXED BY.",
        },
      ];

      snippets.forEach(function (s) {
        suggestions.push({
          label: s.label,
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: s.insertText,
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          detail: s.detail,
          documentation: { value: s.documentation },
          range: range,
          sortText: "0_" + s.label,
        });
      });

      // ─── DIVISION KEYWORDS ───
      [
        "IDENTIFICATION DIVISION.",
        "ENVIRONMENT DIVISION.",
        "DATA DIVISION.",
        "PROCEDURE DIVISION.",
      ].forEach(function (d) {
        suggestions.push({
          label: d,
          kind: monaco.languages.CompletionItemKind.Module,
          insertText: d + "\n",
          detail: "Division header",
          range: range,
          sortText: "1_" + d,
        });
      });

      // ─── SECTION KEYWORDS ───
      [
        "CONFIGURATION SECTION.",
        "INPUT-OUTPUT SECTION.",
        "FILE SECTION.",
        "WORKING-STORAGE SECTION.",
        "LOCAL-STORAGE SECTION.",
        "LINKAGE SECTION.",
        "SCREEN SECTION.",
        "REPORT SECTION.",
      ].forEach(function (s) {
        suggestions.push({
          label: s,
          kind: monaco.languages.CompletionItemKind.Module,
          insertText: s + "\n",
          detail: "Section header",
          range: range,
          sortText: "1_" + s,
        });
      });

      // ─── VERBS ───
      var verbs = [
        "ACCEPT",
        "ADD",
        "ALTER",
        "CALL",
        "CANCEL",
        "CLOSE",
        "COMPUTE",
        "CONTINUE",
        "DELETE",
        "DISPLAY",
        "DIVIDE",
        "ENTRY",
        "EVALUATE",
        "EXIT",
        "GO TO",
        "GOBACK",
        "IF",
        "INITIALIZE",
        "INSPECT",
        "INVOKE",
        "MERGE",
        "MOVE",
        "MULTIPLY",
        "OPEN",
        "PERFORM",
        "READ",
        "RELEASE",
        "RETURN",
        "REWRITE",
        "SEARCH",
        "SET",
        "SORT",
        "START",
        "STOP RUN",
        "STRING",
        "SUBTRACT",
        "UNSTRING",
        "WRITE",
      ];
      verbs.forEach(function (v) {
        suggestions.push({
          label: v,
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: v + " ",
          detail: "COBOL verb",
          documentation: hoverDocs[v.split(" ")[0]]
            ? hoverDocs[v.split(" ")[0]].detail
            : "",
          range: range,
          sortText: "2_" + v,
        });
      });

      // ─── SCOPE TERMINATORS ───
      var terminators = [
        "END-IF",
        "END-EVALUATE",
        "END-PERFORM",
        "END-READ",
        "END-WRITE",
        "END-COMPUTE",
        "END-ADD",
        "END-SUBTRACT",
        "END-MULTIPLY",
        "END-DIVIDE",
        "END-CALL",
        "END-STRING",
        "END-UNSTRING",
        "END-SEARCH",
        "END-DELETE",
        "END-RETURN",
        "END-REWRITE",
        "END-START",
        "END-EXEC",
      ];
      terminators.forEach(function (t) {
        suggestions.push({
          label: t,
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: t,
          detail: "Scope terminator",
          range: range,
          sortText: "2_" + t,
        });
      });

      // ─── KEYWORDS ───
      var otherKw = [
        "ADVANCING",
        "AFTER",
        "ALL",
        "ALSO",
        "AND",
        "ARE",
        "ASCENDING",
        "ASSIGN",
        "AT",
        "BEFORE",
        "BINARY",
        "BLANK",
        "BLOCK",
        "BY",
        "CHARACTER",
        "CHARACTERS",
        "CLASS",
        "COMP",
        "COMP-1",
        "COMP-2",
        "COMP-3",
        "COMP-5",
        "CONTAINS",
        "CONTENT",
        "CONVERTING",
        "COPY",
        "CORRESPONDING",
        "COUNT",
        "DELIMITED",
        "DELIMITER",
        "DEPENDING",
        "DESCENDING",
        "DOWN",
        "DUPLICATES",
        "DYNAMIC",
        "ELSE",
        "END",
        "ERROR",
        "EXCEPTION",
        "EXTEND",
        "EXTERNAL",
        "FALSE",
        "FD",
        "FILLER",
        "FIRST",
        "FOR",
        "FROM",
        "FUNCTION",
        "GIVING",
        "GLOBAL",
        "GREATER",
        "HIGH-VALUE",
        "HIGH-VALUES",
        "I-O",
        "IN",
        "INDEX",
        "INDEXED",
        "INITIAL",
        "INPUT",
        "INTO",
        "INVALID",
        "IS",
        "KEY",
        "LABEL",
        "LEADING",
        "LEFT",
        "LENGTH",
        "LESS",
        "LINE",
        "LINES",
        "LOCK",
        "LOW-VALUE",
        "LOW-VALUES",
        "NEGATIVE",
        "NEXT",
        "NO",
        "NOT",
        "NULL",
        "NUMERIC",
        "OCCURS",
        "OF",
        "OMITTED",
        "ON",
        "OPTIONAL",
        "OR",
        "ORDER",
        "ORGANIZATION",
        "OTHER",
        "OUTPUT",
        "OVERFLOW",
        "PACKED-DECIMAL",
        "PAGE",
        "PIC",
        "PICTURE",
        "POINTER",
        "POSITIVE",
        "PROGRAM-ID",
        "RANDOM",
        "RECORD",
        "RECORDS",
        "REDEFINES",
        "REFERENCE",
        "RELATIVE",
        "REMAINDER",
        "RENAMES",
        "REPLACE",
        "REPLACING",
        "RESERVE",
        "RETURNING",
        "RIGHT",
        "ROUNDED",
        "RUN",
        "SD",
        "SECTION",
        "SELECT",
        "SENTENCE",
        "SEPARATE",
        "SEQUENCE",
        "SEQUENTIAL",
        "SIGN",
        "SIZE",
        "SOURCE",
        "SOURCE-COMPUTER",
        "OBJECT-COMPUTER",
        "SPACE",
        "SPACES",
        "SPECIAL-NAMES",
        "STANDARD",
        "STATUS",
        "TALLYING",
        "THAN",
        "THEN",
        "THROUGH",
        "THRU",
        "TIMES",
        "TO",
        "TOP",
        "TRAILING",
        "TRUE",
        "UNTIL",
        "UP",
        "UPON",
        "USAGE",
        "USE",
        "USING",
        "VALUE",
        "VALUES",
        "VARYING",
        "WHEN",
        "WITH",
        "WORDS",
        "ZERO",
        "ZEROS",
        "ZEROES",
      ];
      otherKw.forEach(function (k) {
        suggestions.push({
          label: k,
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: k + " ",
          detail: "COBOL keyword",
          range: range,
          sortText: "3_" + k,
        });
      });

      // ─── INTRINSIC FUNCTIONS ───
      var funcs = [
        "ABS",
        "ACOS",
        "ANNUITY",
        "ASIN",
        "ATAN",
        "CHAR",
        "COS",
        "CURRENT-DATE",
        "DATE-OF-INTEGER",
        "DATE-TO-YYYYMMDD",
        "DAY-OF-INTEGER",
        "DAY-TO-YYYYDDD",
        "E",
        "EXP",
        "EXP10",
        "FACTORIAL",
        "INTEGER",
        "INTEGER-OF-DATE",
        "INTEGER-OF-DAY",
        "INTEGER-PART",
        "LENGTH",
        "LOG",
        "LOG10",
        "LOWER-CASE",
        "MAX",
        "MEAN",
        "MEDIAN",
        "MIDRANGE",
        "MIN",
        "MOD",
        "NUMVAL",
        "NUMVAL-C",
        "ORD",
        "ORD-MAX",
        "ORD-MIN",
        "PI",
        "PRESENT-VALUE",
        "RANDOM",
        "RANGE",
        "REM",
        "REVERSE",
        "SIN",
        "SQRT",
        "STANDARD-DEVIATION",
        "SUM",
        "TAN",
        "TRIM",
        "UPPER-CASE",
        "VARIANCE",
        "WHEN-COMPILED",
        "YEAR-TO-YYYY",
      ];
      funcs.forEach(function (f) {
        suggestions.push({
          label: "FUNCTION " + f,
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: "FUNCTION " + f + "(${1})",
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          detail: "Intrinsic function",
          range: range,
          sortText: "4_" + f,
        });
      });

      // ─── USER-DEFINED IDENTIFIERS (from current file) ───
      const text = model.getValue();
      const lineTexts = text.split("\n");
      const seenNames = {};

      for (let i = 0; i < lineTexts.length; i++) {
        const trimmed = lineTexts[i].trim();
        // Data items
        const dataMatch = trimmed.match(/^(\d{1,2})\s+([\w-]+)/i);
        if (dataMatch && dataMatch[2].toUpperCase() !== "FILLER") {
          const name = dataMatch[2].toUpperCase();
          if (!seenNames[name]) {
            seenNames[name] = true;
            suggestions.push({
              label: dataMatch[2],
              kind: monaco.languages.CompletionItemKind.Variable,
              insertText: dataMatch[2],
              detail: "Data item (Level " + dataMatch[1] + ")",
              documentation: trimmed,
              range: range,
              sortText: "5_" + name,
            });
          }
        }
        // Paragraphs
        const paraMatch = trimmed.match(/^([A-Z][A-Z0-9-]+)\s*\.\s*$/i);
        if (paraMatch && !trimmed.match(/DIVISION|SECTION/i)) {
          const name = paraMatch[1].toUpperCase();
          if (!seenNames[name]) {
            seenNames[name] = true;
            suggestions.push({
              label: paraMatch[1],
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: paraMatch[1],
              detail: "Paragraph",
              range: range,
              sortText: "5_" + name,
            });
          }
        }
      }

      return { suggestions: suggestions };
    },
  });

  // ─── 9. SIGNATURE HELP PROVIDER ────────────────────────────────────────
  monaco.languages.registerSignatureHelpProvider("cobol", {
    signatureHelpTriggerCharacters: ["(", ",", " "],
    provideSignatureHelp: function (model, position) {
      const lineContent = model
        .getLineContent(position.lineNumber)
        .substring(0, position.column - 1)
        .toUpperCase();

      const signatures = {
        "FUNCTION LENGTH": {
          label: "FUNCTION LENGTH(argument)",
          documentation: "Returns the length of the argument in bytes.",
          parameters: [
            {
              label: "argument",
              documentation:
                "An alphanumeric or national data item or literal.",
            },
          ],
        },
        "FUNCTION TRIM": {
          label: "FUNCTION TRIM(argument [LEADING|TRAILING])",
          documentation: "Removes leading and/or trailing spaces.",
          parameters: [
            { label: "argument", documentation: "The string to trim." },
            {
              label: "LEADING|TRAILING",
              documentation:
                "Optional. Specify LEADING or TRAILING to trim only one side.",
            },
          ],
        },
        "FUNCTION UPPER-CASE": {
          label: "FUNCTION UPPER-CASE(argument)",
          documentation: "Converts all lowercase letters to uppercase.",
          parameters: [
            {
              label: "argument",
              documentation: "An alphanumeric data item or literal.",
            },
          ],
        },
        "FUNCTION LOWER-CASE": {
          label: "FUNCTION LOWER-CASE(argument)",
          documentation: "Converts all uppercase letters to lowercase.",
          parameters: [
            {
              label: "argument",
              documentation: "An alphanumeric data item or literal.",
            },
          ],
        },
        "FUNCTION NUMVAL": {
          label: "FUNCTION NUMVAL(argument)",
          documentation: "Converts an alphanumeric string to a numeric value.",
          parameters: [
            {
              label: "argument",
              documentation: "An alphanumeric string representing a number.",
            },
          ],
        },
        "FUNCTION CURRENT-DATE": {
          label: "FUNCTION CURRENT-DATE",
          documentation:
            "Returns a 21-character alphanumeric value: YYYYMMDDHHMMSSssZ+hhmm",
          parameters: [],
        },
        "FUNCTION MAX": {
          label: "FUNCTION MAX(argument-1 argument-2 ...)",
          documentation:
            "Returns the maximum value from the supplied arguments.",
          parameters: [
            {
              label: "arguments",
              documentation: "Two or more numeric or alphanumeric arguments.",
            },
          ],
        },
        "FUNCTION MIN": {
          label: "FUNCTION MIN(argument-1 argument-2 ...)",
          documentation:
            "Returns the minimum value from the supplied arguments.",
          parameters: [
            {
              label: "arguments",
              documentation: "Two or more numeric or alphanumeric arguments.",
            },
          ],
        },
        "FUNCTION MOD": {
          label: "FUNCTION MOD(argument-1 argument-2)",
          documentation: "Returns argument-1 modulo argument-2.",
          parameters: [
            { label: "argument-1", documentation: "The dividend (integer)." },
            {
              label: "argument-2",
              documentation: "The divisor (integer, non-zero).",
            },
          ],
        },
        "FUNCTION SQRT": {
          label: "FUNCTION SQRT(argument)",
          documentation: "Returns the square root of the argument.",
          parameters: [
            {
              label: "argument",
              documentation: "A non-negative numeric value.",
            },
          ],
        },
      };

      for (const key in signatures) {
        if (lineContent.indexOf(key) !== -1) {
          const sig = signatures[key];
          return {
            value: {
              signatures: [
                {
                  label: sig.label,
                  documentation: sig.documentation,
                  parameters: sig.parameters,
                },
              ],
              activeSignature: 0,
              activeParameter: 0,
            },
            dispose: function () {},
          };
        }
      }
      return null;
    },
  });

  // ─── 10. FOLDING RANGE PROVIDER ────────────────────────────────────────
  monaco.languages.registerFoldingRangeProvider("cobol", {
    provideFoldingRanges: function (model) {
      const lines = model.getLinesContent();
      const ranges = [];
      const stack = [];

      for (let i = 0; i < lines.length; i++) {
        const trimmed = lines[i].trim().toUpperCase();

        // Division / Section folding
        if (
          trimmed.match(
            /(IDENTIFICATION|ENVIRONMENT|DATA|PROCEDURE)\s+DIVISION/,
          ) ||
          trimmed.match(
            /(CONFIGURATION|INPUT-OUTPUT|FILE|WORKING-STORAGE|LOCAL-STORAGE|LINKAGE|SCREEN|REPORT)\s+SECTION/,
          )
        ) {
          if (stack.length > 0) {
            const prev = stack.pop();
            if (i - 1 > prev) {
              ranges.push({
                start: prev + 1,
                end: i,
                kind: monaco.languages.FoldingRangeKind.Region,
              });
            }
          }
          stack.push(i);
        }

        // IF / EVALUATE / PERFORM inline folding
        if (trimmed.match(/^(IF|EVALUATE)\b/) && !trimmed.match(/^END-/)) {
          stack.push(i);
        }
        if (trimmed.match(/^END-(IF|EVALUATE|PERFORM)\b/)) {
          if (stack.length > 0) {
            const start = stack.pop();
            ranges.push({
              start: start + 1,
              end: i + 1,
              kind: monaco.languages.FoldingRangeKind.Region,
            });
          }
        }
      }

      // Close any remaining open ranges
      if (stack.length > 0) {
        const last = stack.pop();
        if (lines.length > last + 1) {
          ranges.push({
            start: last + 1,
            end: lines.length,
            kind: monaco.languages.FoldingRangeKind.Region,
          });
        }
      }

      return ranges;
    },
  });

  // ─── 11. DIAGNOSTICS (Basic linting) ──────────────────────────────────
  function validateCobol(model) {
    const markers = [];
    const lines = model.getLinesContent();
    let inProcedure = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim().toUpperCase();

      if (trimmed.match(/PROCEDURE\s+DIVISION/)) inProcedure = true;

      // Missing period after DIVISION / SECTION
      if (trimmed.match(/(DIVISION|SECTION)\s*$/) && !trimmed.endsWith(".")) {
        markers.push({
          severity: monaco.MarkerSeverity.Error,
          message: "Missing period after DIVISION/SECTION declaration.",
          startLineNumber: i + 1,
          startColumn: 1,
          endLineNumber: i + 1,
          endColumn: line.length + 1,
        });
      }

      // Potential typo: PREFORM instead of PERFORM
      if (trimmed.match(/\bPREFORM\b/)) {
        markers.push({
          severity: monaco.MarkerSeverity.Warning,
          message: "Did you mean PERFORM?",
          startLineNumber: i + 1,
          startColumn: line.toUpperCase().indexOf("PREFORM") + 1,
          endLineNumber: i + 1,
          endColumn: line.toUpperCase().indexOf("PREFORM") + 8,
        });
      }

      // DSPLAY instead of DISPLAY
      if (trimmed.match(/\bDSPLAY\b/)) {
        markers.push({
          severity: monaco.MarkerSeverity.Warning,
          message: "Did you mean DISPLAY?",
          startLineNumber: i + 1,
          startColumn: line.toUpperCase().indexOf("DSPLAY") + 1,
          endLineNumber: i + 1,
          endColumn: line.toUpperCase().indexOf("DSPLAY") + 7,
        });
      }

      // MOVVE instead of MOVE
      if (trimmed.match(/\bMOVVE\b/)) {
        markers.push({
          severity: monaco.MarkerSeverity.Warning,
          message: "Did you mean MOVE?",
          startLineNumber: i + 1,
          startColumn: line.toUpperCase().indexOf("MOVVE") + 1,
          endLineNumber: i + 1,
          endColumn: line.toUpperCase().indexOf("MOVVE") + 6,
        });
      }

      // Line length warning (>80 chars, traditional COBOL)
      if (line.length > 80) {
        markers.push({
          severity: monaco.MarkerSeverity.Info,
          message:
            "Line exceeds 80 characters (column limit in traditional COBOL fixed format).",
          startLineNumber: i + 1,
          startColumn: 81,
          endLineNumber: i + 1,
          endColumn: line.length + 1,
        });
      }
    }

    // Check for unmatched scope terminators
    const scopeOpeners = { IF: "END-IF", EVALUATE: "END-EVALUATE" };
    let openIf = 0,
      openEval = 0;
    for (let i = 0; i < lines.length; i++) {
      const trimmed = lines[i].trim().toUpperCase();
      if (trimmed.match(/\bIF\b/) && !trimmed.match(/\bEND-IF\b/)) openIf++;
      if (trimmed.match(/\bEND-IF\b/)) openIf--;
      if (trimmed.match(/\bEVALUATE\b/) && !trimmed.match(/\bEND-EVALUATE\b/))
        openEval++;
      if (trimmed.match(/\bEND-EVALUATE\b/)) openEval--;
    }
    if (openIf > 0) {
      markers.push({
        severity: monaco.MarkerSeverity.Warning,
        message: openIf + " unmatched IF statement(s) — missing END-IF.",
        startLineNumber: 1,
        startColumn: 1,
        endLineNumber: 1,
        endColumn: 2,
      });
    }
    if (openEval > 0) {
      markers.push({
        severity: monaco.MarkerSeverity.Warning,
        message:
          openEval + " unmatched EVALUATE statement(s) — missing END-EVALUATE.",
        startLineNumber: 1,
        startColumn: 1,
        endLineNumber: 1,
        endColumn: 2,
      });
    }

    monaco.editor.setModelMarkers(model, "cobol", markers);
  }
};
