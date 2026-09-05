var U=e=>{e.languages.register({id:"cobol",extensions:[".cob",".cbl",".cpy",".cobol"],aliases:["COBOL","cobol","Cobol"],mimetypes:["text/x-cobol"]}),e.languages.setLanguageConfiguration("cobol",{comments:{lineComment:"*>"},brackets:[["(",")"]],autoClosingPairs:[{open:"(",close:")"},{open:'"',close:'"'},{open:"'",close:"'"}],surroundingPairs:[{open:"(",close:")"},{open:'"',close:'"'},{open:"'",close:"'"}],wordPattern:/(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,indentationRules:{increaseIndentPattern:/^\s*(IF|ELSE|PERFORM|EVALUATE|WHEN|READ|WRITE|COMPUTE|ADD|SUBTRACT|MULTIPLY|DIVIDE|CALL|STRING|UNSTRING|SEARCH)\b/i,decreaseIndentPattern:/^\s*(END-IF|END-EVALUATE|END-PERFORM|END-READ|END-WRITE|END-COMPUTE|END-ADD|END-SUBTRACT|END-MULTIPLY|END-DIVIDE|END-CALL|END-STRING|END-UNSTRING|END-SEARCH|ELSE|WHEN)\b/i},folding:{markers:{start:/^\s*(IDENTIFICATION|ENVIRONMENT|DATA|PROCEDURE)\s+DIVISION/i,end:/^\s*(IDENTIFICATION|ENVIRONMENT|DATA|PROCEDURE)\s+DIVISION/i}}}),e.languages.setMonarchTokensProvider("cobol",{ignoreCase:!0,defaultToken:"",divisions:["IDENTIFICATION","ENVIRONMENT","DATA","PROCEDURE"],sections:["CONFIGURATION","INPUT-OUTPUT","FILE","WORKING-STORAGE","LOCAL-STORAGE","LINKAGE","SCREEN","REPORT","COMMUNICATION"],verbs:["ACCEPT","ADD","ALTER","CALL","CANCEL","CLOSE","COMPUTE","CONTINUE","DELETE","DISPLAY","DIVIDE","ENTRY","EVALUATE","EXAMINE","EXEC","EXIT","GENERATE","GO","GOBACK","IF","INITIALIZE","INITIATE","INSPECT","INVOKE","MERGE","MOVE","MULTIPLY","OPEN","PERFORM","READ","RECEIVE","RELEASE","RETURN","REWRITE","SEARCH","SEND","SET","SORT","START","STOP","STRING","SUBTRACT","SUPPRESS","TERMINATE","TRANSFORM","UNSTRING","WRITE","XML"],keywords:["ADVANCING","AFTER","ALL","ALPHABETIC","ALPHABETIC-LOWER","ALPHABETIC-UPPER","ALPHANUMERIC","ALPHANUMERIC-EDITED","ALSO","AND","ANY","ARE","ASCENDING","ASSIGN","AT","BEFORE","BEGINNING","BINARY","BLANK","BLOCK","BOTTOM","BY","CHARACTER","CHARACTERS","CLASS","COLLATING","COMP","COMP-1","COMP-2","COMP-3","COMP-4","COMP-5","COMPUTATIONAL","COMPUTATIONAL-1","COMPUTATIONAL-2","COMPUTATIONAL-3","COMPUTATIONAL-4","COMPUTATIONAL-5","CONTAINS","CONTENT","CONVERTING","COPY","CORR","CORRESPONDING","COUNT","CURRENCY","DECIMAL-POINT","DECLARATIVES","DELIMITED","DELIMITER","DEPENDING","DESCENDING","DETAIL","DIVISION","DOWN","DUPLICATES","DYNAMIC","ELSE","END","END-ADD","END-CALL","END-COMPUTE","END-DELETE","END-DIVIDE","END-EVALUATE","END-EXEC","END-IF","END-MULTIPLY","END-OF-PAGE","END-PERFORM","END-READ","END-RECEIVE","END-RETURN","END-REWRITE","END-SEARCH","END-START","END-STRING","END-SUBTRACT","END-UNSTRING","END-WRITE","ENDING","ENVIRONMENT","EQUAL","ERROR","EVERY","EXCEPTION","EXTEND","EXTERNAL","FALSE","FD","FILLER","FINAL","FIRST","FOOTING","FOR","FROM","FUNCTION","GIVING","GLOBAL","GREATER","GROUP","HEADING","HIGH-VALUE","HIGH-VALUES","I-O","I-O-CONTROL","IN","INDEX","INDEXED","INDICATE","INITIAL","INPUT","INTO","INVALID","IS","JUST","JUSTIFIED","KEY","LABEL","LAST","LEADING","LEFT","LENGTH","LESS","LINAGE","LINE","LINES","LOCK","LOW-VALUE","LOW-VALUES","MEMORY","MODE","MODULES","NEGATIVE","NEXT","NO","NOT","NULL","NULLS","NUMBER","NUMERIC","NUMERIC-EDITED","OBJECT-COMPUTER","OCCURS","OF","OFF","OMITTED","ON","OPTIONAL","OR","ORDER","ORGANIZATION","OTHER","OUTPUT","OVERFLOW","PACKED-DECIMAL","PADDING","PAGE","PICTURE","PIC","PLUS","POINTER","POSITION","POSITIVE","PRINTING","PROGRAM","PROGRAM-ID","RANDOM","RECORD","RECORDS","RECURSIVE","REDEFINES","REFERENCE","RELATIVE","REMAINDER","REMOVAL","RENAMES","REPLACE","REPLACING","REPOSITORY","RESERVE","RETURNING","REVERSED","REWIND","RIGHT","ROUNDED","RUN","SAME","SD","SECTION","SELECT","SENTENCE","SEPARATE","SEQUENCE","SEQUENTIAL","SIGN","SIZE","SORT-MERGE","SOURCE","SOURCE-COMPUTER","SPACE","SPACES","SPECIAL-NAMES","STANDARD","STANDARD-1","STANDARD-2","STATUS","TALLYING","THAN","THEN","THROUGH","THRU","TIMES","TO","TOP","TRAILING","TRUE","TYPE","UNIT","UNTIL","UP","UPON","USAGE","USE","USING","VALUE","VALUES","VARYING","WHEN","WITH","WORDS","ZERO","ZEROES","ZEROS"],builtinFunctions:["ABS","ACOS","ANNUITY","ASIN","ATAN","CHAR","COMBINED-DATETIME","COS","CURRENT-DATE","DATE-OF-INTEGER","DATE-TO-YYYYMMDD","DAY-OF-INTEGER","DAY-TO-YYYYDDD","DISPLAY-OF","E","EXP","EXP10","FACTORIAL","FORMATTED-CURRENT-DATE","FORMATTED-DATE","FORMATTED-DATETIME","FORMATTED-TIME","INTEGER","INTEGER-OF-DATE","INTEGER-OF-DAY","INTEGER-OF-FORMATTED-DATE","INTEGER-PART","LENGTH","LOG","LOG10","LOWER-CASE","MAX","MEAN","MEDIAN","MIDRANGE","MIN","MOD","NATIONAL-OF","NUMVAL","NUMVAL-C","ORD","ORD-MAX","ORD-MIN","PI","PRESENT-VALUE","RANDOM","RANGE","REM","REVERSE","SIN","SQRT","STANDARD-DEVIATION","SUM","TAN","TEST-DATE-YYYYMMDD","TEST-DAY-YYYYDDD","TRIM","UPPER-CASE","VARIANCE","WHEN-COMPILED","YEAR-TO-YYYY"],registers:["RETURN-CODE","SORT-RETURN","TALLY","WHEN-COMPILED","DEBUG-ITEM","DEBUG-LINE","DEBUG-NAME","DEBUG-CONTENTS","DEBUG-SUB-1","DEBUG-SUB-2","DEBUG-SUB-3","LINAGE-COUNTER","LINE-COUNTER","PAGE-COUNTER"],tokenizer:{root:[[/^\s{0,6}\*.*$/,"comment"],[/\*>.*$/,"comment"],[/>>.*$/,"keyword.directive"],[/\b(IDENTIFICATION|ENVIRONMENT|DATA|PROCEDURE)\s+(DIVISION)\b/i,["keyword.division","keyword.division"]],[/\b(CONFIGURATION|INPUT-OUTPUT|FILE|WORKING-STORAGE|LOCAL-STORAGE|LINKAGE|SCREEN|REPORT|COMMUNICATION)\s+(SECTION)\b/i,["keyword.section","keyword.section"]],[/\b(PROGRAM-ID|AUTHOR|INSTALLATION|DATE-WRITTEN|DATE-COMPILED|SECURITY|REMARKS)\b/i,"keyword.paragraph"],[/^\s*(0[1-9]|[1-4][0-9]|66|77|88)\b/,"number.level"],[/\b(FD|SD)\b/i,"keyword.fd"],[/\b(PIC|PICTURE)\s+(IS\s+)?/i,{token:"keyword.pic",next:"@picClause"}],[/\b(COPY)\b/i,"keyword.copy"],[/\b(EXEC|EXECUTE)\b/i,{token:"keyword.exec",next:"@execBlock"}],[/\b(FUNCTION)\s+([A-Z][\w-]*)/i,["keyword","support.function"]],[/\b(END-ADD|END-CALL|END-COMPUTE|END-DELETE|END-DIVIDE|END-EVALUATE|END-EXEC|END-IF|END-MULTIPLY|END-OF-PAGE|END-PERFORM|END-READ|END-RECEIVE|END-RETURN|END-REWRITE|END-SEARCH|END-START|END-STRING|END-SUBTRACT|END-UNSTRING|END-WRITE)\b/i,"keyword.scope-terminator"],[/\b(ACCEPT|ADD|ALTER|CALL|CANCEL|CLOSE|COMPUTE|CONTINUE|DELETE|DISPLAY|DIVIDE|ENTRY|EVALUATE|EXAMINE|EXIT|GENERATE|GO\s+TO|GO|GOBACK|IF|INITIALIZE|INITIATE|INSPECT|INVOKE|MERGE|MOVE|MULTIPLY|OPEN|PERFORM|READ|RECEIVE|RELEASE|RETURN|REWRITE|SEARCH|SEND|SET|SORT|START|STOP\s+RUN|STOP|STRING|SUBTRACT|SUPPRESS|TERMINATE|TRANSFORM|UNSTRING|WRITE|XML\s+GENERATE|XML\s+PARSE)\b/i,"keyword.verb"],[/\b(TRUE|FALSE)\b/i,"keyword.boolean"],[/\b(SPACE|SPACES|ZERO|ZEROS|ZEROES|HIGH-VALUE|HIGH-VALUES|LOW-VALUE|LOW-VALUES|QUOTE|QUOTES|NULL|NULLS|ALL)\b/i,"constant.figurative"],[/\b(RETURN-CODE|SORT-RETURN|TALLY|DEBUG-ITEM|DEBUG-LINE|DEBUG-NAME|DEBUG-CONTENTS|LINAGE-COUNTER|LINE-COUNTER|PAGE-COUNTER)\b/i,"variable.special"],[/\b(ADVANCING|AFTER|ALPHABETIC|ALPHABETIC-LOWER|ALPHABETIC-UPPER|ALPHANUMERIC|ALPHANUMERIC-EDITED|ALSO|AND|ANY|ARE|ASCENDING|ASSIGN|AT|BEFORE|BEGINNING|BINARY|BLANK|BLOCK|BOTTOM|BY|CHARACTER|CHARACTERS|CLASS|COLLATING|COMP|COMP-1|COMP-2|COMP-3|COMP-4|COMP-5|COMPUTATIONAL|COMPUTATIONAL-1|COMPUTATIONAL-2|COMPUTATIONAL-3|COMPUTATIONAL-4|COMPUTATIONAL-5|CONTAINS|CONTENT|CONVERTING|COPY|CORR|CORRESPONDING|COUNT|CURRENCY|DECIMAL-POINT|DECLARATIVES|DELIMITED|DELIMITER|DEPENDING|DESCENDING|DETAIL|DOWN|DUPLICATES|DYNAMIC|ELSE|END|ENDING|ENVIRONMENT|EQUAL|ERROR|EVERY|EXCEPTION|EXTEND|EXTERNAL|FILLER|FINAL|FIRST|FOOTING|FOR|FROM|FUNCTION|GIVING|GLOBAL|GREATER|GROUP|HEADING|I-O|I-O-CONTROL|IN|INDEX|INDEXED|INDICATE|INITIAL|INPUT|INTO|INVALID|IS|JUST|JUSTIFIED|KEY|LABEL|LAST|LEADING|LEFT|LENGTH|LESS|LINAGE|LINE|LINES|LOCK|MEMORY|MODE|MODULES|NEGATIVE|NEXT|NO|NOT|NUMBER|NUMERIC|NUMERIC-EDITED|OBJECT-COMPUTER|OCCURS|OF|OFF|OMITTED|ON|OPTIONAL|OR|ORDER|ORGANIZATION|OTHER|OUTPUT|OVERFLOW|PACKED-DECIMAL|PADDING|PAGE|PLUS|POINTER|POSITION|POSITIVE|PRINTING|PROGRAM|RANDOM|RECORD|RECORDS|RECURSIVE|REDEFINES|REFERENCE|RELATIVE|REMAINDER|REMOVAL|RENAMES|REPLACE|REPLACING|REPOSITORY|RESERVE|RETURNING|REVERSED|REWIND|RIGHT|ROUNDED|RUN|SAME|SECTION|SELECT|SENTENCE|SEPARATE|SEQUENCE|SEQUENTIAL|SIGN|SIZE|SORT-MERGE|SOURCE|SOURCE-COMPUTER|SPECIAL-NAMES|STANDARD|STANDARD-1|STANDARD-2|STATUS|TALLYING|THAN|THEN|THROUGH|THRU|TIMES|TO|TOP|TRAILING|TYPE|UNIT|UNTIL|UP|UPON|USAGE|USE|USING|VALUE|VALUES|VARYING|WHEN|WITH|WORDS)\b/i,"keyword"],[/"([^"\\]|\\.)*$/,"string.invalid"],[/'([^'\\]|\\.)*$/,"string.invalid"],[/"/,"string","@stringDouble"],[/'/,"string","@stringSingle"],[/[+-]?\d+(\.\d+)?/,"number"],[/[=<>+\-*/&]/,"operator"],[/^[ ]{0,3}[A-Z][A-Z0-9-]*(?=\s*\.\s*$)/im,"type.identifier"],[/[A-Za-z][A-Za-z0-9-]*/,"identifier"],[/\./,"delimiter.period"],[/[()]/,"@brackets"],[/\s+/,"white"]],picClause:[[/[SsVvXxAa9ZzBb0\(\)\+\-\*\/\,\.CcRrDdPp]+/,"string.pic"],[/\s/,"white","@pop"],[/\./,"delimiter.period","@pop"],[/$/,"","@pop"]],execBlock:[[/\b(END-EXEC)\b/i,{token:"keyword.exec",next:"@pop"}],[/./,"string.exec"]],stringDouble:[[/[^\\"]+/,"string"],[/\\./,"string.escape"],[/"/,"string","@pop"]],stringSingle:[[/[^\\']+/,"string"],[/\\./,"string.escape"],[/'/,"string","@pop"]]}});let C={IDENTIFICATION:{desc:"IDENTIFICATION DIVISION",detail:"The first division of a COBOL program. It identifies the program with a name and optionally provides other documentary information such as author and date written."},ENVIRONMENT:{desc:"ENVIRONMENT DIVISION",detail:"Specifies the computer environment. Contains CONFIGURATION SECTION (source/object computer) and INPUT-OUTPUT SECTION (file control and I-O control)."},DATA:{desc:"DATA DIVISION",detail:"Describes the data that the program creates, manipulates, and outputs. Contains FILE SECTION, WORKING-STORAGE SECTION, LOCAL-STORAGE SECTION, and LINKAGE SECTION."},PROCEDURE:{desc:"PROCEDURE DIVISION",detail:"Contains the executable statements (procedures) of the program. Organized into sections and paragraphs. The logic of the program is written here."},"PROGRAM-ID":{desc:"PROGRAM-ID paragraph",detail:`Specifies the name by which the program is known. This is the only required paragraph in the IDENTIFICATION DIVISION.

Syntax: PROGRAM-ID. program-name [IS INITIAL|RECURSIVE].`},DISPLAY:{desc:"DISPLAY statement",detail:`Outputs data to the terminal or a specified device.

Syntax: DISPLAY {identifier|literal} ... [UPON mnemonic-name] [WITH NO ADVANCING].

Example:
  DISPLAY "Hello, World!"`},MOVE:{desc:"MOVE statement",detail:`Transfers data from one data item to another.

Syntax: MOVE {identifier|literal} TO identifier-1 [identifier-2 ...]
MOVE CORRESPONDING group-1 TO group-2

Example:
  MOVE "JOHN" TO WS-NAME
  MOVE ZEROS TO WS-COUNTER`},PERFORM:{desc:"PERFORM statement",detail:`Transfers control to one or more procedures and returns control afterwards.

Forms:
  PERFORM paragraph-name [THRU paragraph-name-2]
  PERFORM paragraph-name n TIMES
  PERFORM paragraph-name UNTIL condition
  PERFORM paragraph-name VARYING id FROM val BY val UNTIL condition
  PERFORM ... END-PERFORM (inline)`},IF:{desc:"IF statement",detail:`Conditional execution of statements.

Syntax:
  IF condition THEN
    statements
  [ELSE
    statements]
  END-IF

Conditions can use relational operators: =, >, <, >=, <=, NOT =, etc.`},EVALUATE:{desc:"EVALUATE statement",detail:`Multi-branch conditional (similar to switch/case).

Syntax:
  EVALUATE {identifier|TRUE|FALSE|expression}
    WHEN value-1 statements
    WHEN value-2 statements
    WHEN OTHER  statements
  END-EVALUATE`},COMPUTE:{desc:"COMPUTE statement",detail:`Assigns the result of an arithmetic expression to a data item.

Syntax: COMPUTE identifier [ROUNDED] = arithmetic-expression
  [ON SIZE ERROR statements]
  [NOT ON SIZE ERROR statements]
  [END-COMPUTE]

Example:
  COMPUTE WS-TOTAL = WS-PRICE * WS-QTY`},ADD:{desc:"ADD statement",detail:`Adds numeric values.

Forms:
  ADD id-1 [id-2 ...] TO id-n [ROUNDED]
  ADD id-1 id-2 GIVING id-3 [ROUNDED]
  ADD CORRESPONDING group-1 TO group-2

Example:
  ADD 1 TO WS-COUNTER`},SUBTRACT:{desc:"SUBTRACT statement",detail:`Subtracts one or more numeric values from another.

Forms:
  SUBTRACT id-1 FROM id-2 [ROUNDED]
  SUBTRACT id-1 FROM id-2 GIVING id-3 [ROUNDED]
  SUBTRACT CORRESPONDING group-1 FROM group-2`},MULTIPLY:{desc:"MULTIPLY statement",detail:`Multiplies numeric values.

Forms:
  MULTIPLY id-1 BY id-2 [ROUNDED]
  MULTIPLY id-1 BY id-2 GIVING id-3 [ROUNDED]`},DIVIDE:{desc:"DIVIDE statement",detail:`Divides numeric values.

Forms:
  DIVIDE id-1 INTO id-2 [ROUNDED]
  DIVIDE id-1 INTO id-2 GIVING id-3 [REMAINDER id-4]
  DIVIDE id-1 BY id-2 GIVING id-3 [REMAINDER id-4]`},ACCEPT:{desc:"ACCEPT statement",detail:`Reads data from the terminal or system.

Syntax:
  ACCEPT identifier [FROM {DATE|DAY|DAY-OF-WEEK|TIME|CONSOLE}]

Example:
  ACCEPT WS-USER-INPUT
  ACCEPT WS-TODAY FROM DATE YYYYMMDD`},READ:{desc:"READ statement",detail:`Retrieves the next logical record from a file.

Syntax:
  READ file-name [NEXT|PREVIOUS] RECORD [INTO identifier]
    [AT END statements]
    [NOT AT END statements]
  END-READ`},WRITE:{desc:"WRITE statement",detail:`Writes a logical record to a file.

Syntax:
  WRITE record-name [FROM identifier]
    [BEFORE|AFTER ADVANCING {integer LINES|PAGE}]
    [INVALID KEY statements]
  END-WRITE`},OPEN:{desc:"OPEN statement",detail:`Opens one or more files for processing.

Syntax: OPEN {INPUT|OUTPUT|I-O|EXTEND} file-name-1 [file-name-2 ...]`},CLOSE:{desc:"CLOSE statement",detail:`Closes one or more files.

Syntax: CLOSE file-name-1 [file-name-2 ...]`},CALL:{desc:"CALL statement",detail:`Transfers control to another program.

Syntax:
  CALL {identifier|literal}
    [USING [BY REFERENCE|BY CONTENT|BY VALUE] id-1 ...]
    [RETURNING identifier]
    [ON EXCEPTION statements]
  END-CALL`},STRING:{desc:"STRING statement",detail:`Concatenates partial or complete contents of data items.

Syntax:
  STRING id-1 DELIMITED BY {id|SIZE}
         id-2 DELIMITED BY {id|SIZE}
    INTO id-dest
    [WITH POINTER id-ptr]
    [ON OVERFLOW statements]
  END-STRING`},UNSTRING:{desc:"UNSTRING statement",detail:`Splits the contents of a data item into multiple receiving fields.

Syntax:
  UNSTRING id-source
    DELIMITED BY [ALL] id-delim [OR [ALL] id-delim-2]
    INTO id-1 [DELIMITER IN id-d1] [COUNT IN id-c1]
         id-2 ...
    [WITH POINTER id-ptr]
    [TALLYING IN id-tally]
  END-UNSTRING`},INSPECT:{desc:"INSPECT statement",detail:`Counts or replaces occurrences of characters in a data item.

Forms:
  INSPECT id TALLYING ...
  INSPECT id REPLACING ...
  INSPECT id TALLYING ... REPLACING ...
  INSPECT id CONVERTING ... TO ...`},SEARCH:{desc:"SEARCH statement",detail:`Searches a table (array) for an element satisfying a condition.

Forms:
  SEARCH identifier [AT END statements]
    WHEN condition statement-1
  END-SEARCH

  SEARCH ALL identifier [AT END statements]
    WHEN condition statement-1
  END-SEARCH (binary search)`},INITIALIZE:{desc:"INITIALIZE statement",detail:`Sets selected data item categories to predetermined values.

Syntax: INITIALIZE identifier-1 [identifier-2 ...]
  [REPLACING {ALPHABETIC|ALPHANUMERIC|NUMERIC|...} DATA BY {id|literal}]`},SORT:{desc:"SORT statement",detail:`Sorts records in a file or table.

Syntax:
  SORT file-name ON {ASCENDING|DESCENDING} KEY data-name-1 ...
    [INPUT PROCEDURE IS section-name | USING file-1]
    [OUTPUT PROCEDURE IS section-name | GIVING file-2]`},GO:{desc:"GO TO statement",detail:`Transfers control to a specified paragraph or section.

Syntax:
  GO TO paragraph-name
  GO TO para-1 para-2 ... DEPENDING ON identifier

Note: Excessive use of GO TO is discouraged; prefer PERFORM.`},GOBACK:{desc:"GOBACK statement",detail:"Returns control to the calling program or the operating system. Equivalent to STOP RUN for a main program or EXIT PROGRAM for a subprogram. Preferred over STOP RUN in modern COBOL."},STOP:{desc:"STOP statement",detail:`Terminates the program.

Syntax: STOP RUN [RETURNING integer]

Ends the entire run unit and returns control to the operating system.`},COPY:{desc:"COPY statement",detail:`Includes text from a copybook (external file) into the program.

Syntax: COPY copybook-name [OF|IN library-name]
  [REPLACING ==pseudo-text-1== BY ==pseudo-text-2==].

Used to share common data definitions across programs.`},REPLACE:{desc:"REPLACE statement",detail:`Substitutes text in subsequent source lines.

Syntax: REPLACE ==pseudo-text-1== BY ==pseudo-text-2==.
REPLACE OFF.`},PIC:{desc:"PICTURE (PIC) clause",detail:`Defines the data type and format of an elementary data item.

Common patterns:
  PIC X(n)     \u2014 Alphanumeric, n characters
  PIC 9(n)     \u2014 Numeric, n digits
  PIC 9(n)V9(m) \u2014 Numeric with decimal
  PIC S9(n)    \u2014 Signed numeric
  PIC Z(n)9    \u2014 Edited numeric (leading zeros suppressed)
  PIC A(n)     \u2014 Alphabetic only`},PICTURE:{desc:"PICTURE (PIC) clause",detail:"Defines the data type and format of an elementary data item. See PIC for details."},VALUE:{desc:"VALUE clause",detail:`Specifies the initial value of a data item.

Syntax: VALUE IS literal.

Examples:
  05 WS-NAME    PIC X(20) VALUE "DEFAULT".
  05 WS-COUNT   PIC 9(3)  VALUE ZEROS.
  88 WS-EOF     VALUE "Y".`},OCCURS:{desc:"OCCURS clause",detail:`Defines a table (array) within a record.

Syntax:
  OCCURS integer TIMES
    [ASCENDING|DESCENDING KEY IS data-name]
    [INDEXED BY index-name]

  OCCURS integer-1 TO integer-2 TIMES
    DEPENDING ON data-name`},REDEFINES:{desc:"REDEFINES clause",detail:`Allows the same storage area to be described by different data descriptions.

Syntax: level-number data-name-1 REDEFINES data-name-2.

Both items must be at the same level number. The REDEFINES item must immediately follow the redefined item.`},SELECT:{desc:"SELECT clause",detail:`Associates a file with an external file in the ENVIRONMENT DIVISION.

Syntax:
  SELECT [OPTIONAL] file-name
    ASSIGN TO external-file-name
    [ORGANIZATION IS {SEQUENTIAL|INDEXED|RELATIVE}]
    [ACCESS MODE IS {SEQUENTIAL|RANDOM|DYNAMIC}]
    [RECORD KEY IS data-name]
    [FILE STATUS IS data-name].`},FD:{desc:"File Description (FD)",detail:`Describes the physical attributes of a file in the FILE SECTION.

Syntax:
  FD file-name
    [RECORD CONTAINS integer CHARACTERS]
    [BLOCK CONTAINS integer RECORDS]
    [LABEL RECORDS ARE {STANDARD|OMITTED}]
    [DATA RECORD IS record-name].`},FUNCTION:{desc:"Intrinsic FUNCTION",detail:`Calls a built-in (intrinsic) function.

Syntax: FUNCTION function-name(arguments)

Common functions:
  FUNCTION CURRENT-DATE \u2014 returns 21-char date/time
  FUNCTION LENGTH(item) \u2014 returns byte length
  FUNCTION UPPER-CASE(item) \u2014 converts to uppercase
  FUNCTION LOWER-CASE(item) \u2014 converts to lowercase
  FUNCTION TRIM(item) \u2014 removes leading/trailing spaces
  FUNCTION NUMVAL(item) \u2014 converts string to number`},"WORKING-STORAGE":{desc:"WORKING-STORAGE SECTION",detail:"Defines data items that persist for the lifetime of the program. Variables declared here retain their values between calls (unless INITIAL is specified on the PROGRAM-ID)."},"LOCAL-STORAGE":{desc:"LOCAL-STORAGE SECTION",detail:"Defines data items that are allocated and initialized each time the program is called. Unlike WORKING-STORAGE, these are re-initialized on each invocation."},LINKAGE:{desc:"LINKAGE SECTION",detail:"Describes data items that are passed to the program from a calling program. These items are addressable only when the program is called with corresponding USING parameters."},CONTINUE:{desc:"CONTINUE statement",detail:`A no-operation statement. Used as a placeholder where a statement is syntactically required but no action is needed.

Commonly used in empty WHEN branches or as a placeholder in IF/ELSE.`},EXIT:{desc:"EXIT statement",detail:`Marks the logical end of a paragraph or section.

Forms:
  EXIT \u2014 marks end of performed paragraph
  EXIT PROGRAM \u2014 returns control to calling program
  EXIT PERFORM \u2014 exits inline PERFORM
  EXIT PERFORM CYCLE \u2014 skips to next iteration
  EXIT SECTION \u2014 exits current section`},SET:{desc:"SET statement",detail:`Modifies index values, condition names, or pointer values.

Forms:
  SET index-name TO integer
  SET index-name UP BY integer
  SET index-name DOWN BY integer
  SET condition-name TO TRUE
  SET pointer-item TO ADDRESS OF data-item`},EXEC:{desc:"EXEC ... END-EXEC block",detail:`Delimits embedded code from other languages, most commonly SQL.

Syntax:
  EXEC SQL
    SELECT column INTO :host-variable
    FROM table
    WHERE condition
  END-EXEC

Also used for EXEC CICS and EXEC DLI in mainframe environments.`}};e.languages.registerHoverProvider("cobol",{provideHover:function(R,n){let a=R.getWordAtPosition(n);if(!a)return null;let t=a.word.toUpperCase();if(C[t])return{range:new e.Range(n.lineNumber,a.startColumn,n.lineNumber,a.endColumn),contents:[{value:"**"+C[t].desc+"**"},{value:"```\n"+C[t].detail+"\n```"}]};if(["ABS","ACOS","ANNUITY","ASIN","ATAN","CHAR","COMBINED-DATETIME","COS","CURRENT-DATE","DATE-OF-INTEGER","DATE-TO-YYYYMMDD","DAY-OF-INTEGER","DAY-TO-YYYYDDD","DISPLAY-OF","E","EXP","EXP10","FACTORIAL","INTEGER","INTEGER-OF-DATE","INTEGER-OF-DAY","INTEGER-PART","LENGTH","LOG","LOG10","LOWER-CASE","MAX","MEAN","MEDIAN","MIDRANGE","MIN","MOD","NATIONAL-OF","NUMVAL","NUMVAL-C","ORD","ORD-MAX","ORD-MIN","PI","PRESENT-VALUE","RANDOM","RANGE","REM","REVERSE","SIN","SQRT","STANDARD-DEVIATION","SUM","TAN","TRIM","UPPER-CASE","VARIANCE","WHEN-COMPILED","YEAR-TO-YYYY"].indexOf(t)!==-1)return{range:new e.Range(n.lineNumber,a.startColumn,n.lineNumber,a.endColumn),contents:[{value:"**FUNCTION "+t+"**"},{value:"```\nCOBOL intrinsic function.\nUsage: FUNCTION "+t+"(arguments)\n```"}]};let T=R.getValue().split(`
`),r=new RegExp("\\b"+a.word.replace(/[-]/g,"\\-")+"\\b","i");for(let I=0;I<T.length;I++){let O=T[I].trim(),s=O.match(/^(\d{1,2})\s+([\w-]+)\s*(PIC|PICTURE|VALUE|OCCURS|REDEFINES)?/i);if(s&&s[2].toUpperCase()===t)return{range:new e.Range(n.lineNumber,a.startColumn,n.lineNumber,a.endColumn),contents:[{value:"**Data Item: "+s[2]+"** (Level "+s[1]+")"},{value:"```cobol\n"+O+"\n```"},{value:"*Defined at line "+(I+1)+"*"}]};let l=O.match(/^([A-Z][A-Z0-9-]+)\s*\.\s*$/i);if(l&&l[1].toUpperCase()===t&&I+1!==n.lineNumber)return{range:new e.Range(n.lineNumber,a.startColumn,n.lineNumber,a.endColumn),contents:[{value:"**Paragraph: "+l[1]+"**"},{value:"*Defined at line "+(I+1)+"*"}]}}return null}}),e.languages.registerDefinitionProvider("cobol",{provideDefinition:function(R,n){let a=R.getWordAtPosition(n);if(!a)return null;let t=a.word.toUpperCase(),E=R.getValue().split(`
`);for(let T=0;T<E.length;T++){let r=E[T].trim(),I=r.match(/^(\d{1,2})\s+([\w-]+)/i);if(I&&I[2].toUpperCase()===t){let s=E[T].indexOf(I[2])+1;return{uri:R.uri,range:new e.Range(T+1,s,T+1,s+I[2].length)}}let A=r.match(/^([A-Z][A-Z0-9-]+)\s*\.\s*$/i);if(A&&A[1].toUpperCase()===t){let s=E[T].indexOf(A[1])+1;return{uri:R.uri,range:new e.Range(T+1,s,T+1,s+A[1].length)}}let O=r.match(/^([A-Z][A-Z0-9-]+)\s+SECTION\s*\./i);if(O&&O[1].toUpperCase()===t){let s=E[T].indexOf(O[1])+1;return{uri:R.uri,range:new e.Range(T+1,s,T+1,s+O[1].length)}}}return null}}),e.languages.registerDocumentSymbolProvider("cobol",{provideDocumentSymbols:function(R){let n=[],a=R.getLinesContent();for(let t=0;t<a.length;t++){let N=a[t].trim(),E=t+1,T=N.match(/^(IDENTIFICATION|ENVIRONMENT|DATA|PROCEDURE)\s+DIVISION/i);T&&n.push({name:T[0],kind:e.languages.SymbolKind.Module,range:new e.Range(E,1,E,a[t].length+1),selectionRange:new e.Range(E,1,E,a[t].length+1)});let r=N.match(/^([A-Z][A-Z0-9-]*)\s+SECTION\s*\./i);r&&n.push({name:r[1]+" SECTION",kind:e.languages.SymbolKind.Namespace,range:new e.Range(E,1,E,a[t].length+1),selectionRange:new e.Range(E,1,E,a[t].length+1)});let I=N.match(/^([A-Z][A-Z0-9-]+)\s*\.\s*$/i);I&&!N.match(/DIVISION|SECTION/i)&&n.push({name:I[1],kind:e.languages.SymbolKind.Function,range:new e.Range(E,1,E,a[t].length+1),selectionRange:new e.Range(E,1,E,a[t].length+1)});let A=N.match(/^(01|1)\s+([\w-]+)/i);A&&A[2].toUpperCase()!=="FILLER"&&n.push({name:A[2],kind:e.languages.SymbolKind.Variable,range:new e.Range(E,1,E,a[t].length+1),selectionRange:new e.Range(E,1,E,a[t].length+1)});let O=N.match(/^(FD|SD)\s+([\w-]+)/i);O&&n.push({name:O[1]+" "+O[2],kind:e.languages.SymbolKind.File,range:new e.Range(E,1,E,a[t].length+1),selectionRange:new e.Range(E,1,E,a[t].length+1)})}return n}}),e.languages.registerCompletionItemProvider("cobol",{triggerCharacters:[" ",".","-"],provideCompletionItems:function(R,n){let a=R.getValueInRange({startLineNumber:n.lineNumber,startColumn:1,endLineNumber:n.lineNumber,endColumn:n.column}),t=R.getWordUntilPosition(n),N={startLineNumber:n.lineNumber,startColumn:t.startColumn,endLineNumber:n.lineNumber,endColumn:t.endColumn},E=[];[{label:"program-skeleton",detail:"Complete COBOL program skeleton",insertText:["IDENTIFICATION DIVISION.","PROGRAM-ID. ${1:PROGRAM-NAME}.","","ENVIRONMENT DIVISION.","CONFIGURATION SECTION.","SOURCE-COMPUTER. ${2:IBM-370}.","OBJECT-COMPUTER. ${2:IBM-370}.","","DATA DIVISION.","WORKING-STORAGE SECTION.","01 ${3:WS-VARIABLES}.","   05 ${4:WS-ITEM}    PIC ${5:X(10)} VALUE ${6:SPACES}.","","PROCEDURE DIVISION.","${7:MAIN-PARA}.",'    ${8:DISPLAY "Hello, COBOL!"}',"    STOP RUN."].join(`
`),documentation:"Inserts a complete COBOL program skeleton with all four divisions."},{label:"identification-division",detail:"IDENTIFICATION DIVISION template",insertText:["IDENTIFICATION DIVISION.","PROGRAM-ID. ${1:PROGRAM-NAME}.","AUTHOR. ${2:Author Name}.","DATE-WRITTEN. ${3:2025-01-01}."].join(`
`),documentation:"Identification Division with common paragraphs."},{label:"working-storage",detail:"WORKING-STORAGE SECTION template",insertText:["WORKING-STORAGE SECTION.","01 ${1:WS-VARIABLES}.","   05 ${2:WS-ITEM-1}    PIC ${3:X(20)} VALUE ${4:SPACES}.","   05 ${5:WS-ITEM-2}    PIC ${6:9(5)}  VALUE ${7:ZEROS}."].join(`
`),documentation:"Working-Storage Section with sample data items."},{label:"if-else",detail:"IF ... ELSE ... END-IF",insertText:["IF ${1:condition}","    ${2:statement-1}","ELSE","    ${3:statement-2}","END-IF"].join(`
`),documentation:"IF-ELSE conditional block with END-IF scope terminator."},{label:"if-then",detail:"IF ... END-IF",insertText:["IF ${1:condition}","    ${2:statement}","END-IF"].join(`
`),documentation:"Simple IF block with END-IF scope terminator."},{label:"evaluate-true",detail:"EVALUATE TRUE (switch/case)",insertText:["EVALUATE TRUE","    WHEN ${1:condition-1}","        ${2:statement-1}","    WHEN ${3:condition-2}","        ${4:statement-2}","    WHEN OTHER","        ${5:default-statement}","END-EVALUATE"].join(`
`),documentation:"EVALUATE TRUE block \u2014 equivalent to a switch/case statement."},{label:"evaluate-variable",detail:"EVALUATE variable",insertText:["EVALUATE ${1:WS-VARIABLE}","    WHEN ${2:value-1}","        ${3:statement-1}","    WHEN ${4:value-2}","        ${5:statement-2}","    WHEN OTHER","        ${6:default-statement}","END-EVALUATE"].join(`
`),documentation:"EVALUATE a variable against multiple values."},{label:"perform-until",detail:"PERFORM ... UNTIL",insertText:["PERFORM ${1:PARA-NAME}",'    UNTIL ${2:WS-EOF} = ${3:"Y"}'].join(`
`),documentation:"PERFORM a paragraph until a condition is met."},{label:"perform-varying",detail:"PERFORM VARYING (for-loop)",insertText:["PERFORM ${1:PARA-NAME}","    VARYING ${2:WS-INDEX} FROM ${3:1} BY ${4:1}","    UNTIL ${2:WS-INDEX} > ${5:10}"].join(`
`),documentation:"PERFORM VARYING loop \u2014 equivalent to a for-loop."},{label:"perform-inline",detail:"Inline PERFORM ... END-PERFORM",insertText:["PERFORM VARYING ${1:WS-IDX} FROM ${2:1} BY ${3:1}","    UNTIL ${1:WS-IDX} > ${4:10}","    ${5:DISPLAY ${1:WS-IDX}}","END-PERFORM"].join(`
`),documentation:"Inline PERFORM block with END-PERFORM."},{label:"perform-times",detail:"PERFORM ... TIMES",insertText:"PERFORM ${1:PARA-NAME} ${2:10} TIMES",documentation:"PERFORM a paragraph a fixed number of times."},{label:"read-file",detail:"READ file with AT END",insertText:["READ ${1:FILE-NAME} INTO ${2:WS-RECORD}","    AT END","        SET ${3:WS-EOF} TO TRUE","    NOT AT END","        ${4:PERFORM PROCESS-RECORD}","END-READ"].join(`
`),documentation:"READ a file record with AT END and NOT AT END."},{label:"write-record",detail:"WRITE record FROM",insertText:["WRITE ${1:RECORD-NAME} FROM ${2:WS-OUTPUT-REC}","    ${3:AFTER ADVANCING 1 LINES}"].join(`
`),documentation:"WRITE a record to a file."},{label:"open-files",detail:"OPEN INPUT/OUTPUT files",insertText:["OPEN INPUT  ${1:INPUT-FILE}","     OUTPUT ${2:OUTPUT-FILE}"].join(`
`),documentation:"OPEN files for INPUT and OUTPUT."},{label:"file-select",detail:"SELECT ... ASSIGN TO",insertText:["SELECT ${1:FILE-NAME}",'    ASSIGN TO ${2:"filename.dat"}',"    ORGANIZATION IS ${3:SEQUENTIAL}","    ACCESS MODE IS ${4:SEQUENTIAL}","    FILE STATUS IS ${5:WS-FILE-STATUS}."].join(`
`),documentation:"File SELECT/ASSIGN in INPUT-OUTPUT SECTION."},{label:"fd-entry",detail:"FD file description",insertText:["FD ${1:FILE-NAME}","    RECORD CONTAINS ${2:80} CHARACTERS.","01 ${3:FILE-RECORD}.","   05 ${4:FR-DATA}    PIC X(${2:80})."].join(`
`),documentation:"File Description (FD) entry with record definition."},{label:"call-program",detail:"CALL subprogram",insertText:['CALL ${1:"SUBPROG"}',"    USING ${2:WS-PARAM-1}","          ${3:WS-PARAM-2}","END-CALL"].join(`
`),documentation:"CALL a subprogram with parameters."},{label:"string-concat",detail:"STRING concatenation",insertText:["STRING ${1:WS-FIRST} DELIMITED BY SPACES",'       " " DELIMITED BY SIZE',"       ${2:WS-LAST} DELIMITED BY SPACES","    INTO ${3:WS-FULL-NAME}","    WITH POINTER ${4:WS-PTR}","END-STRING"].join(`
`),documentation:"STRING concatenation example."},{label:"unstring-split",detail:"UNSTRING split",insertText:["UNSTRING ${1:WS-INPUT}",'    DELIMITED BY ${2:","}',"    INTO ${3:WS-FIELD-1}","         ${4:WS-FIELD-2}","         ${5:WS-FIELD-3}","END-UNSTRING"].join(`
`),documentation:"UNSTRING to split a delimited string."},{label:"search-table",detail:"SEARCH table",insertText:["SET ${1:WS-IDX} TO 1","SEARCH ${2:WS-TABLE-ENTRY}","    AT END",'        ${3:DISPLAY "Not found"}',"    WHEN ${4:WS-TABLE-KEY(WS-IDX)} = ${5:WS-SEARCH-KEY}","        ${6:PERFORM FOUND-PARA}","END-SEARCH"].join(`
`),documentation:"Sequential SEARCH of a table."},{label:"compute-arithmetic",detail:"COMPUTE with ON SIZE ERROR",insertText:["COMPUTE ${1:WS-RESULT} = ${2:WS-A * WS-B + WS-C}","    ON SIZE ERROR",'        ${3:DISPLAY "Arithmetic overflow"}',"    NOT ON SIZE ERROR","        ${4:CONTINUE}","END-COMPUTE"].join(`
`),documentation:"COMPUTE with arithmetic expression and error handling."},{label:"inspect-tallying",detail:"INSPECT TALLYING",insertText:["INSPECT ${1:WS-STRING}","    TALLYING ${2:WS-COUNT}",'    FOR ALL ${3:"A"}'].join(`
`),documentation:"INSPECT to count occurrences of a character."},{label:"exec-sql",detail:"EXEC SQL ... END-EXEC",insertText:["EXEC SQL","    ${1:SELECT column-1}","    ${2:INTO :WS-HOST-VAR}","    ${3:FROM table-name}","    ${4:WHERE condition}","END-EXEC"].join(`
`),documentation:"Embedded SQL block for DB2/SQL access."},{label:"01-group",detail:"01 level group item",insertText:["01 ${1:WS-GROUP-NAME}.","   05 ${2:WS-FIELD-1}    PIC ${3:X(10)} VALUE ${4:SPACES}.","   05 ${5:WS-FIELD-2}    PIC ${6:9(5)}  VALUE ${7:ZEROS}."].join(`
`),documentation:"Level 01 group item with child fields."},{label:"88-condition",detail:"88 level condition name",insertText:'88 ${1:WS-CONDITION}    VALUE ${2:"Y"}.',documentation:"Level 88 condition name \u2014 a boolean flag."},{label:"occurs-table",detail:"Table with OCCURS and INDEXED BY",insertText:["01 ${1:WS-TABLE}.","   05 ${2:WS-ENTRY} OCCURS ${3:100} TIMES","       INDEXED BY ${4:WS-IDX}.","      10 ${5:WS-ENTRY-KEY}   PIC ${6:X(10)}.","      10 ${7:WS-ENTRY-VALUE} PIC ${8:9(5)}."].join(`
`),documentation:"Table (array) definition with OCCURS and INDEXED BY."}].forEach(function(i){E.push({label:i.label,kind:e.languages.CompletionItemKind.Snippet,insertText:i.insertText,insertTextRules:e.languages.CompletionItemInsertTextRule.InsertAsSnippet,detail:i.detail,documentation:{value:i.documentation},range:N,sortText:"0_"+i.label})}),["IDENTIFICATION DIVISION.","ENVIRONMENT DIVISION.","DATA DIVISION.","PROCEDURE DIVISION."].forEach(function(i){E.push({label:i,kind:e.languages.CompletionItemKind.Module,insertText:i+`
`,detail:"Division header",range:N,sortText:"1_"+i})}),["CONFIGURATION SECTION.","INPUT-OUTPUT SECTION.","FILE SECTION.","WORKING-STORAGE SECTION.","LOCAL-STORAGE SECTION.","LINKAGE SECTION.","SCREEN SECTION.","REPORT SECTION."].forEach(function(i){E.push({label:i,kind:e.languages.CompletionItemKind.Module,insertText:i+`
`,detail:"Section header",range:N,sortText:"1_"+i})});var r=["ACCEPT","ADD","ALTER","CALL","CANCEL","CLOSE","COMPUTE","CONTINUE","DELETE","DISPLAY","DIVIDE","ENTRY","EVALUATE","EXIT","GO TO","GOBACK","IF","INITIALIZE","INSPECT","INVOKE","MERGE","MOVE","MULTIPLY","OPEN","PERFORM","READ","RELEASE","RETURN","REWRITE","SEARCH","SET","SORT","START","STOP RUN","STRING","SUBTRACT","UNSTRING","WRITE"];r.forEach(function(i){E.push({label:i,kind:e.languages.CompletionItemKind.Keyword,insertText:i+" ",detail:"COBOL verb",documentation:C[i.split(" ")[0]]?C[i.split(" ")[0]].detail:"",range:N,sortText:"2_"+i})});var I=["END-IF","END-EVALUATE","END-PERFORM","END-READ","END-WRITE","END-COMPUTE","END-ADD","END-SUBTRACT","END-MULTIPLY","END-DIVIDE","END-CALL","END-STRING","END-UNSTRING","END-SEARCH","END-DELETE","END-RETURN","END-REWRITE","END-START","END-EXEC"];I.forEach(function(i){E.push({label:i,kind:e.languages.CompletionItemKind.Keyword,insertText:i,detail:"Scope terminator",range:N,sortText:"2_"+i})});var A=["ADVANCING","AFTER","ALL","ALSO","AND","ARE","ASCENDING","ASSIGN","AT","BEFORE","BINARY","BLANK","BLOCK","BY","CHARACTER","CHARACTERS","CLASS","COMP","COMP-1","COMP-2","COMP-3","COMP-5","CONTAINS","CONTENT","CONVERTING","COPY","CORRESPONDING","COUNT","DELIMITED","DELIMITER","DEPENDING","DESCENDING","DOWN","DUPLICATES","DYNAMIC","ELSE","END","ERROR","EXCEPTION","EXTEND","EXTERNAL","FALSE","FD","FILLER","FIRST","FOR","FROM","FUNCTION","GIVING","GLOBAL","GREATER","HIGH-VALUE","HIGH-VALUES","I-O","IN","INDEX","INDEXED","INITIAL","INPUT","INTO","INVALID","IS","KEY","LABEL","LEADING","LEFT","LENGTH","LESS","LINE","LINES","LOCK","LOW-VALUE","LOW-VALUES","NEGATIVE","NEXT","NO","NOT","NULL","NUMERIC","OCCURS","OF","OMITTED","ON","OPTIONAL","OR","ORDER","ORGANIZATION","OTHER","OUTPUT","OVERFLOW","PACKED-DECIMAL","PAGE","PIC","PICTURE","POINTER","POSITIVE","PROGRAM-ID","RANDOM","RECORD","RECORDS","REDEFINES","REFERENCE","RELATIVE","REMAINDER","RENAMES","REPLACE","REPLACING","RESERVE","RETURNING","RIGHT","ROUNDED","RUN","SD","SECTION","SELECT","SENTENCE","SEPARATE","SEQUENCE","SEQUENTIAL","SIGN","SIZE","SOURCE","SOURCE-COMPUTER","OBJECT-COMPUTER","SPACE","SPACES","SPECIAL-NAMES","STANDARD","STATUS","TALLYING","THAN","THEN","THROUGH","THRU","TIMES","TO","TOP","TRAILING","TRUE","UNTIL","UP","UPON","USAGE","USE","USING","VALUE","VALUES","VARYING","WHEN","WITH","WORDS","ZERO","ZEROS","ZEROES"];A.forEach(function(i){E.push({label:i,kind:e.languages.CompletionItemKind.Keyword,insertText:i+" ",detail:"COBOL keyword",range:N,sortText:"3_"+i})});var O=["ABS","ACOS","ANNUITY","ASIN","ATAN","CHAR","COS","CURRENT-DATE","DATE-OF-INTEGER","DATE-TO-YYYYMMDD","DAY-OF-INTEGER","DAY-TO-YYYYDDD","E","EXP","EXP10","FACTORIAL","INTEGER","INTEGER-OF-DATE","INTEGER-OF-DAY","INTEGER-PART","LENGTH","LOG","LOG10","LOWER-CASE","MAX","MEAN","MEDIAN","MIDRANGE","MIN","MOD","NUMVAL","NUMVAL-C","ORD","ORD-MAX","ORD-MIN","PI","PRESENT-VALUE","RANDOM","RANGE","REM","REVERSE","SIN","SQRT","STANDARD-DEVIATION","SUM","TAN","TRIM","UPPER-CASE","VARIANCE","WHEN-COMPILED","YEAR-TO-YYYY"];O.forEach(function(i){E.push({label:"FUNCTION "+i,kind:e.languages.CompletionItemKind.Function,insertText:"FUNCTION "+i+"(${1})",insertTextRules:e.languages.CompletionItemInsertTextRule.InsertAsSnippet,detail:"Intrinsic function",range:N,sortText:"4_"+i})});let l=R.getValue().split(`
`),D={};for(let i=0;i<l.length;i++){let d=l[i].trim(),S=d.match(/^(\d{1,2})\s+([\w-]+)/i);if(S&&S[2].toUpperCase()!=="FILLER"){let o=S[2].toUpperCase();D[o]||(D[o]=!0,E.push({label:S[2],kind:e.languages.CompletionItemKind.Variable,insertText:S[2],detail:"Data item (Level "+S[1]+")",documentation:d,range:N,sortText:"5_"+o}))}let L=d.match(/^([A-Z][A-Z0-9-]+)\s*\.\s*$/i);if(L&&!d.match(/DIVISION|SECTION/i)){let o=L[1].toUpperCase();D[o]||(D[o]=!0,E.push({label:L[1],kind:e.languages.CompletionItemKind.Function,insertText:L[1],detail:"Paragraph",range:N,sortText:"5_"+o}))}}return{suggestions:E}}}),e.languages.registerSignatureHelpProvider("cobol",{signatureHelpTriggerCharacters:["(",","," "],provideSignatureHelp:function(R,n){let a=R.getLineContent(n.lineNumber).substring(0,n.column-1).toUpperCase(),t={"FUNCTION LENGTH":{label:"FUNCTION LENGTH(argument)",documentation:"Returns the length of the argument in bytes.",parameters:[{label:"argument",documentation:"An alphanumeric or national data item or literal."}]},"FUNCTION TRIM":{label:"FUNCTION TRIM(argument [LEADING|TRAILING])",documentation:"Removes leading and/or trailing spaces.",parameters:[{label:"argument",documentation:"The string to trim."},{label:"LEADING|TRAILING",documentation:"Optional. Specify LEADING or TRAILING to trim only one side."}]},"FUNCTION UPPER-CASE":{label:"FUNCTION UPPER-CASE(argument)",documentation:"Converts all lowercase letters to uppercase.",parameters:[{label:"argument",documentation:"An alphanumeric data item or literal."}]},"FUNCTION LOWER-CASE":{label:"FUNCTION LOWER-CASE(argument)",documentation:"Converts all uppercase letters to lowercase.",parameters:[{label:"argument",documentation:"An alphanumeric data item or literal."}]},"FUNCTION NUMVAL":{label:"FUNCTION NUMVAL(argument)",documentation:"Converts an alphanumeric string to a numeric value.",parameters:[{label:"argument",documentation:"An alphanumeric string representing a number."}]},"FUNCTION CURRENT-DATE":{label:"FUNCTION CURRENT-DATE",documentation:"Returns a 21-character alphanumeric value: YYYYMMDDHHMMSSssZ+hhmm",parameters:[]},"FUNCTION MAX":{label:"FUNCTION MAX(argument-1 argument-2 ...)",documentation:"Returns the maximum value from the supplied arguments.",parameters:[{label:"arguments",documentation:"Two or more numeric or alphanumeric arguments."}]},"FUNCTION MIN":{label:"FUNCTION MIN(argument-1 argument-2 ...)",documentation:"Returns the minimum value from the supplied arguments.",parameters:[{label:"arguments",documentation:"Two or more numeric or alphanumeric arguments."}]},"FUNCTION MOD":{label:"FUNCTION MOD(argument-1 argument-2)",documentation:"Returns argument-1 modulo argument-2.",parameters:[{label:"argument-1",documentation:"The dividend (integer)."},{label:"argument-2",documentation:"The divisor (integer, non-zero)."}]},"FUNCTION SQRT":{label:"FUNCTION SQRT(argument)",documentation:"Returns the square root of the argument.",parameters:[{label:"argument",documentation:"A non-negative numeric value."}]}};for(let N in t)if(a.indexOf(N)!==-1){let E=t[N];return{value:{signatures:[{label:E.label,documentation:E.documentation,parameters:E.parameters}],activeSignature:0,activeParameter:0},dispose:function(){}}}return null}}),e.languages.registerFoldingRangeProvider("cobol",{provideFoldingRanges:function(R){let n=R.getLinesContent(),a=[],t=[];for(let N=0;N<n.length;N++){let E=n[N].trim().toUpperCase();if(E.match(/(IDENTIFICATION|ENVIRONMENT|DATA|PROCEDURE)\s+DIVISION/)||E.match(/(CONFIGURATION|INPUT-OUTPUT|FILE|WORKING-STORAGE|LOCAL-STORAGE|LINKAGE|SCREEN|REPORT)\s+SECTION/)){if(t.length>0){let T=t.pop();N-1>T&&a.push({start:T+1,end:N,kind:e.languages.FoldingRangeKind.Region})}t.push(N)}if(E.match(/^(IF|EVALUATE)\b/)&&!E.match(/^END-/)&&t.push(N),E.match(/^END-(IF|EVALUATE|PERFORM)\b/)&&t.length>0){let T=t.pop();a.push({start:T+1,end:N+1,kind:e.languages.FoldingRangeKind.Region})}}if(t.length>0){let N=t.pop();n.length>N+1&&a.push({start:N+1,end:n.length,kind:e.languages.FoldingRangeKind.Region})}return a}});function m(R){let n=[],a=R.getLinesContent(),t=!1;for(let r=0;r<a.length;r++){let I=a[r],A=I.trim().toUpperCase();A.match(/PROCEDURE\s+DIVISION/)&&(t=!0),A.match(/(DIVISION|SECTION)\s*$/)&&!A.endsWith(".")&&n.push({severity:e.MarkerSeverity.Error,message:"Missing period after DIVISION/SECTION declaration.",startLineNumber:r+1,startColumn:1,endLineNumber:r+1,endColumn:I.length+1}),A.match(/\bPREFORM\b/)&&n.push({severity:e.MarkerSeverity.Warning,message:"Did you mean PERFORM?",startLineNumber:r+1,startColumn:I.toUpperCase().indexOf("PREFORM")+1,endLineNumber:r+1,endColumn:I.toUpperCase().indexOf("PREFORM")+8}),A.match(/\bDSPLAY\b/)&&n.push({severity:e.MarkerSeverity.Warning,message:"Did you mean DISPLAY?",startLineNumber:r+1,startColumn:I.toUpperCase().indexOf("DSPLAY")+1,endLineNumber:r+1,endColumn:I.toUpperCase().indexOf("DSPLAY")+7}),A.match(/\bMOVVE\b/)&&n.push({severity:e.MarkerSeverity.Warning,message:"Did you mean MOVE?",startLineNumber:r+1,startColumn:I.toUpperCase().indexOf("MOVVE")+1,endLineNumber:r+1,endColumn:I.toUpperCase().indexOf("MOVVE")+6}),I.length>80&&n.push({severity:e.MarkerSeverity.Info,message:"Line exceeds 80 characters (column limit in traditional COBOL fixed format).",startLineNumber:r+1,startColumn:81,endLineNumber:r+1,endColumn:I.length+1})}let N={IF:"END-IF",EVALUATE:"END-EVALUATE"},E=0,T=0;for(let r=0;r<a.length;r++){let I=a[r].trim().toUpperCase();I.match(/\bIF\b/)&&!I.match(/\bEND-IF\b/)&&E++,I.match(/\bEND-IF\b/)&&E--,I.match(/\bEVALUATE\b/)&&!I.match(/\bEND-EVALUATE\b/)&&T++,I.match(/\bEND-EVALUATE\b/)&&T--}E>0&&n.push({severity:e.MarkerSeverity.Warning,message:E+" unmatched IF statement(s) \u2014 missing END-IF.",startLineNumber:1,startColumn:1,endLineNumber:1,endColumn:2}),T>0&&n.push({severity:e.MarkerSeverity.Warning,message:T+" unmatched EVALUATE statement(s) \u2014 missing END-EVALUATE.",startLineNumber:1,startColumn:1,endLineNumber:1,endColumn:2}),e.editor.setModelMarkers(R,"cobol",n)}};export{U as default};
