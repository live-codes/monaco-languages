import type * as Monaco from "monaco-editor";

export default (
  monaco: typeof Monaco,
  getEditor: () => Monaco.editor.IStandaloneCodeEditor,
) => {
  /* ================================================================
SQL LANGUAGE CONSTANTS
================================================================ */

  const SQL_KEYWORDS = [
    "ABORT",
    "ADD",
    "ALL",
    "ALTER",
    "ANALYZE",
    "AND",
    "AS",
    "ASC",
    "BEGIN",
    "BETWEEN",
    "BY",
    "CASCADE",
    "CASE",
    "CHECK",
    "COLUMN",
    "COMMIT",
    "CONSTRAINT",
    "CREATE",
    "CROSS",
    "CURRENT",
    "DATABASE",
    "DECLARE",
    "DEFAULT",
    "DELETE",
    "DESC",
    "DISTINCT",
    "DROP",
    "ELSE",
    "END",
    "EXCEPT",
    "EXISTS",
    "EXPLAIN",
    "FALSE",
    "FETCH",
    "FOLLOWING",
    "FOR",
    "FOREIGN",
    "FROM",
    "FULL",
    "GRANT",
    "GROUP",
    "HAVING",
    "IF",
    "IGNORE",
    "IN",
    "INDEX",
    "INNER",
    "INSERT",
    "INTERSECT",
    "INTO",
    "IS",
    "JOIN",
    "KEY",
    "LEFT",
    "LIKE",
    "LIMIT",
    "NATURAL",
    "NEXT",
    "NOT",
    "NULL",
    "OFFSET",
    "ON",
    "ONLY",
    "OR",
    "ORDER",
    "OUTER",
    "OVER",
    "PARTITION",
    "PRECEDING",
    "PRIMARY",
    "RANGE",
    "RECURSIVE",
    "REFERENCES",
    "RENAME",
    "REPLACE",
    "RESTRICT",
    "RETURNING",
    "REVOKE",
    "RIGHT",
    "ROLLBACK",
    "ROW",
    "ROWS",
    "SAVEPOINT",
    "SCHEMA",
    "SELECT",
    "SET",
    "TABLE",
    "TEMPORARY",
    "THEN",
    "TOP",
    "TRANSACTION",
    "TRIGGER",
    "TRUE",
    "TRUNCATE",
    "UNBOUNDED",
    "UNION",
    "UNIQUE",
    "UPDATE",
    "USING",
    "VALUES",
    "VIEW",
    "WHEN",
    "WHERE",
    "WITH",
    "AUTO_INCREMENT",
    "BIGINT",
    "BINARY",
    "BIT",
    "BLOB",
    "BOOLEAN",
    "CHAR",
    "CHARACTER",
    "CLOB",
    "DATE",
    "DATETIME",
    "DECIMAL",
    "DOUBLE",
    "FLOAT",
    "INT",
    "INTEGER",
    "NCHAR",
    "NUMERIC",
    "NVARCHAR",
    "REAL",
    "SERIAL",
    "SMALLINT",
    "TEXT",
    "TIME",
    "TIMESTAMP",
    "TINYINT",
    "VARBINARY",
    "VARCHAR",
  ];

  const SQL_FUNCTIONS = [
    {
      name: "COUNT",
      snippet: "COUNT(${1:*})",
      detail: "Aggregate",
      doc: "Returns the number of rows matching a criterion.",
    },
    {
      name: "SUM",
      snippet: "SUM(${1:column})",
      detail: "Aggregate",
      doc: "Returns the total sum of a numeric column.",
    },
    {
      name: "AVG",
      snippet: "AVG(${1:column})",
      detail: "Aggregate",
      doc: "Returns the average value of a numeric column.",
    },
    {
      name: "MIN",
      snippet: "MIN(${1:column})",
      detail: "Aggregate",
      doc: "Returns the minimum value in a set.",
    },
    {
      name: "MAX",
      snippet: "MAX(${1:column})",
      detail: "Aggregate",
      doc: "Returns the maximum value in a set.",
    },
    {
      name: "CONCAT",
      snippet: "CONCAT(${1:str1}, ${2:str2})",
      detail: "String",
      doc: "Concatenates two or more strings.",
    },
    {
      name: "SUBSTRING",
      snippet: "SUBSTRING(${1:string}, ${2:start}, ${3:length})",
      detail: "String",
      doc: "Extracts a substring from a string.",
    },
    {
      name: "LENGTH",
      snippet: "LENGTH(${1:string})",
      detail: "String",
      doc: "Returns the length of a string.",
    },
    {
      name: "UPPER",
      snippet: "UPPER(${1:string})",
      detail: "String",
      doc: "Converts string to upper case.",
    },
    {
      name: "LOWER",
      snippet: "LOWER(${1:string})",
      detail: "String",
      doc: "Converts string to lower case.",
    },
    {
      name: "TRIM",
      snippet: "TRIM(${1:string})",
      detail: "String",
      doc: "Removes leading and trailing whitespace.",
    },
    {
      name: "REPLACE",
      snippet: "REPLACE(${1:string}, ${2:from}, ${3:to})",
      detail: "String",
      doc: "Replaces occurrences of a substring.",
    },
    {
      name: "COALESCE",
      snippet: "COALESCE(${1:val1}, ${2:val2})",
      detail: "Null handling",
      doc: "Returns the first non-null value in the list.",
    },
    {
      name: "NULLIF",
      snippet: "NULLIF(${1:expr1}, ${2:expr2})",
      detail: "Null handling",
      doc: "Returns NULL if two expressions are equal.",
    },
    {
      name: "IFNULL",
      snippet: "IFNULL(${1:expr}, ${2:default})",
      detail: "Null handling",
      doc: "Returns expr if not NULL, otherwise default.",
    },
    {
      name: "CAST",
      snippet: "CAST(${1:expr} AS ${2:type})",
      detail: "Type conversion",
      doc: "Converts a value to a specified data type.",
    },
    {
      name: "ROUND",
      snippet: "ROUND(${1:number}, ${2:decimals})",
      detail: "Math",
      doc: "Rounds to specified decimal places.",
    },
    {
      name: "FLOOR",
      snippet: "FLOOR(${1:number})",
      detail: "Math",
      doc: "Largest integer ≤ the argument.",
    },
    {
      name: "CEIL",
      snippet: "CEIL(${1:number})",
      detail: "Math",
      doc: "Smallest integer ≥ the argument.",
    },
    {
      name: "ABS",
      snippet: "ABS(${1:number})",
      detail: "Math",
      doc: "Returns the absolute value.",
    },
    {
      name: "MOD",
      snippet: "MOD(${1:n}, ${2:m})",
      detail: "Math",
      doc: "Returns the remainder of n / m.",
    },
    {
      name: "POWER",
      snippet: "POWER(${1:base}, ${2:exp})",
      detail: "Math",
      doc: "Returns base raised to the power of exp.",
    },
    {
      name: "SQRT",
      snippet: "SQRT(${1:number})",
      detail: "Math",
      doc: "Returns the square root.",
    },
    {
      name: "NOW",
      snippet: "NOW()",
      detail: "Date/Time",
      doc: "Returns the current date and time.",
    },
    {
      name: "CURDATE",
      snippet: "CURDATE()",
      detail: "Date/Time",
      doc: "Returns the current date.",
    },
    {
      name: "CURTIME",
      snippet: "CURTIME()",
      detail: "Date/Time",
      doc: "Returns the current time.",
    },
    {
      name: "DATEDIFF",
      snippet: "DATEDIFF(${1:date1}, ${2:date2})",
      detail: "Date/Time",
      doc: "Returns difference between two dates.",
    },
    {
      name: "DATE_FORMAT",
      snippet: "DATE_FORMAT(${1:date}, ${2:format})",
      detail: "Date/Time",
      doc: "Formats a date value.",
    },
    {
      name: "EXTRACT",
      snippet: "EXTRACT(${1:YEAR} FROM ${2:date})",
      detail: "Date/Time",
      doc: "Extracts a part from a date.",
    },
    {
      name: "GROUP_CONCAT",
      snippet: "GROUP_CONCAT(${1:column} SEPARATOR ${2:','})",
      detail: "Aggregate",
      doc: "Concatenates group values into one string.",
    },
    {
      name: "STRING_AGG",
      snippet: "STRING_AGG(${1:column}, ${2:','})",
      detail: "Aggregate",
      doc: "Concatenates values with a delimiter (PostgreSQL/SQL Server).",
    },
    {
      name: "ROW_NUMBER",
      snippet: "ROW_NUMBER() OVER (${1:PARTITION BY col }ORDER BY ${2:col})",
      detail: "Window",
      doc: "Assigns unique sequential integers within a partition.",
    },
    {
      name: "RANK",
      snippet: "RANK() OVER (${1:PARTITION BY col }ORDER BY ${2:col})",
      detail: "Window",
      doc: "Assigns rank with gaps for ties.",
    },
    {
      name: "DENSE_RANK",
      snippet: "DENSE_RANK() OVER (${1:PARTITION BY col }ORDER BY ${2:col})",
      detail: "Window",
      doc: "Assigns rank without gaps.",
    },
    {
      name: "NTILE",
      snippet: "NTILE(${1:n}) OVER (ORDER BY ${2:col})",
      detail: "Window",
      doc: "Divides rows into n roughly equal groups.",
    },
    {
      name: "LAG",
      snippet: "LAG(${1:column}, ${2:1}) OVER (ORDER BY ${3:col})",
      detail: "Window",
      doc: "Accesses data from a previous row.",
    },
    {
      name: "LEAD",
      snippet: "LEAD(${1:column}, ${2:1}) OVER (ORDER BY ${3:col})",
      detail: "Window",
      doc: "Accesses data from a subsequent row.",
    },
    {
      name: "FIRST_VALUE",
      snippet:
        "FIRST_VALUE(${1:column}) OVER (${2:PARTITION BY col }ORDER BY ${3:col})",
      detail: "Window",
      doc: "Returns first value in an ordered partition.",
    },
    {
      name: "LAST_VALUE",
      snippet:
        "LAST_VALUE(${1:column}) OVER (${2:PARTITION BY col }ORDER BY ${3:col})",
      detail: "Window",
      doc: "Returns last value in an ordered partition.",
    },
  ];

  const SQL_SNIPPETS = [
    {
      label: "sel",
      detail: "SELECT … FROM",
      insertText: "SELECT ${1:*}\nFROM ${2:table_name}\n${0}",
      doc: "Basic SELECT query",
    },
    {
      label: "selw",
      detail: "SELECT … WHERE",
      insertText:
        "SELECT ${1:*}\nFROM ${2:table_name}\nWHERE ${3:condition}\n${0}",
      doc: "SELECT with WHERE",
    },
    {
      label: "selj",
      detail: "SELECT … INNER JOIN",
      insertText:
        "SELECT ${1:columns}\nFROM ${2:table1} ${3:a}\nINNER JOIN ${4:table2} ${5:b}\n    ON ${3:a}.${6:id} = ${5:b}.${7:id}\n${0}",
      doc: "SELECT with INNER JOIN",
    },
    {
      label: "sellj",
      detail: "SELECT … LEFT JOIN",
      insertText:
        "SELECT ${1:columns}\nFROM ${2:table1} ${3:a}\nLEFT JOIN ${4:table2} ${5:b}\n    ON ${3:a}.${6:id} = ${5:b}.${7:id}\n${0}",
      doc: "SELECT with LEFT JOIN",
    },
    {
      label: "selg",
      detail: "SELECT … GROUP BY",
      insertText:
        "SELECT ${1:column}, COUNT(*) AS cnt\nFROM ${2:table_name}\nGROUP BY ${1:column}\n${0}",
      doc: "SELECT with GROUP BY",
    },
    {
      label: "seld",
      detail: "SELECT DISTINCT",
      insertText: "SELECT DISTINCT ${1:columns}\nFROM ${2:table_name}\n${0}",
      doc: "SELECT DISTINCT",
    },
    {
      label: "selo",
      detail: "SELECT … ORDER BY",
      insertText:
        "SELECT ${1:*}\nFROM ${2:table_name}\nORDER BY ${3:column} ${4:ASC}\n${0}",
      doc: "SELECT with ORDER BY",
    },
    {
      label: "ins",
      detail: "INSERT INTO … VALUES",
      insertText:
        "INSERT INTO ${1:table_name} (${2:columns})\nVALUES (${3:values});\n${0}",
      doc: "Insert rows",
    },
    {
      label: "upd",
      detail: "UPDATE … SET … WHERE",
      insertText:
        "UPDATE ${1:table_name}\nSET ${2:column} = ${3:value}\nWHERE ${4:condition};\n${0}",
      doc: "Update rows",
    },
    {
      label: "del",
      detail: "DELETE FROM … WHERE",
      insertText: "DELETE FROM ${1:table_name}\nWHERE ${2:condition};\n${0}",
      doc: "Delete rows",
    },
    {
      label: "crt",
      detail: "CREATE TABLE",
      insertText:
        "CREATE TABLE ${1:table_name} (\n    ${2:id} INT NOT NULL,\n    ${3:name} VARCHAR(${4:255}),\n    PRIMARY KEY (${2:id})\n);\n${0}",
      doc: "Create a new table",
    },
    {
      label: "crtifne",
      detail: "CREATE TABLE IF NOT EXISTS",
      insertText:
        "CREATE TABLE IF NOT EXISTS ${1:table_name} (\n    ${2:id} INT NOT NULL,\n    ${3:name} VARCHAR(${4:255}),\n    PRIMARY KEY (${2:id})\n);\n${0}",
      doc: "Create table if not exists",
    },
    {
      label: "altadd",
      detail: "ALTER TABLE ADD COLUMN",
      insertText:
        "ALTER TABLE ${1:table_name}\nADD COLUMN ${2:col_name} ${3:type};\n${0}",
      doc: "Add column",
    },
    {
      label: "altdrop",
      detail: "ALTER TABLE DROP COLUMN",
      insertText:
        "ALTER TABLE ${1:table_name}\nDROP COLUMN ${2:col_name};\n${0}",
      doc: "Drop column",
    },
    {
      label: "cridx",
      detail: "CREATE INDEX",
      insertText:
        "CREATE INDEX ${1:idx_name}\nON ${2:table_name} (${3:column});\n${0}",
      doc: "Create index",
    },
    {
      label: "casew",
      detail: "CASE WHEN … END",
      insertText:
        "CASE\n    WHEN ${1:condition} THEN ${2:result}\n    ELSE ${3:default}\nEND",
      doc: "CASE expression",
    },
    {
      label: "cte",
      detail: "WITH … AS (CTE)",
      insertText:
        "WITH ${1:cte_name} AS (\n    SELECT ${2:*}\n    FROM ${3:table_name}\n    WHERE ${4:condition}\n)\nSELECT *\nFROM ${1:cte_name}\n${0}",
      doc: "Common Table Expression",
    },
    {
      label: "subq",
      detail: "Subquery in WHERE",
      insertText:
        "SELECT ${1:*}\nFROM ${2:table_name}\nWHERE ${3:column} IN (\n    SELECT ${4:column}\n    FROM ${5:table2}\n    WHERE ${6:condition}\n)\n${0}",
      doc: "Subquery in WHERE",
    },
    {
      label: "winfn",
      detail: "Window Function",
      insertText:
        "SELECT ${1:*},\n    ${2:ROW_NUMBER}() OVER (\n        PARTITION BY ${3:column}\n        ORDER BY ${4:column} ${5|ASC,DESC|}\n    ) AS ${6:rn}\nFROM ${7:table_name}\n${0}",
      doc: "Window function template",
    },
    {
      label: "exst",
      detail: "WHERE EXISTS (…)",
      insertText:
        "SELECT ${1:*}\nFROM ${2:table1} ${3:a}\nWHERE EXISTS (\n    SELECT 1\n    FROM ${4:table2} ${5:b}\n    WHERE ${5:b}.${6:id} = ${3:a}.${7:id}\n)\n${0}",
      doc: "EXISTS subquery",
    },
    {
      label: "piv",
      detail: "Pivot with CASE",
      insertText:
        "SELECT ${1:group_col},\n    SUM(CASE WHEN ${2:pivot_col} = ${3:'val1'} THEN ${4:val_col} ELSE 0 END) AS ${5:alias1},\n    SUM(CASE WHEN ${2:pivot_col} = ${6:'val2'} THEN ${4:val_col} ELSE 0 END) AS ${7:alias2}\nFROM ${8:table_name}\nGROUP BY ${1:group_col}\n${0}",
      doc: "Manual pivot using CASE",
    },
    {
      label: "merge",
      detail: "MERGE / UPSERT",
      insertText:
        "MERGE INTO ${1:target} t\nUSING ${2:source} s\nON t.${3:id} = s.${3:id}\nWHEN MATCHED THEN\n    UPDATE SET t.${4:col} = s.${4:col}\nWHEN NOT MATCHED THEN\n    INSERT (${5:columns}) VALUES (${6:values});\n${0}",
      doc: "MERGE statement (upsert)",
    },
  ];

  const ALL_RESERVED_UPPER = new Set([
    ...SQL_KEYWORDS.map((k) => k.toUpperCase()),
    ...SQL_FUNCTIONS.map((f) => f.name.toUpperCase()),
    "ASC",
    "DESC",
    "INNER",
    "OUTER",
    "CROSS",
    "NATURAL",
    "LEFT",
    "RIGHT",
    "FULL",
  ]);

  /* ================================================================
SCHEMA PARSER
================================================================ */

  let schema = {};

  function splitByTopLevelComma(text) {
    const parts = [];
    let depth = 0,
      current = "";
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (ch === "(") depth++;
      else if (ch === ")") depth--;
      if (ch === "," && depth === 0) {
        parts.push(current);
        current = "";
      } else {
        current += ch;
      }
    }
    if (current.trim()) parts.push(current);
    return parts;
  }

  function parseSchema(text) {
    const tables = {};
    const regex =
      /CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?`?(\w+)`?\s*\(([\s\S]*?)\)\s*;/gi;
    let match;

    while ((match = regex.exec(text)) !== null) {
      const tableName = match[1];
      const body = match[2];
      const createLine = text.substring(0, match.index).split("\n").length;
      const matchLines = match[0].split("\n");

      const columns = [];
      let primaryKey = [];
      const parts = splitByTopLevelComma(body);

      for (const part of parts) {
        const trimmed = part.trim();
        if (!trimmed) continue;

        const pkMatch = trimmed.match(/PRIMARY\s+KEY\s*\(([^)]+)\)/i);
        if (pkMatch) {
          primaryKey = pkMatch[1]
            .split(",")
            .map((c) => c.trim().replace(/`/g, ""));
          continue;
        }
        if (
          /^(CONSTRAINT|FOREIGN\s+KEY|UNIQUE\s*\(|CHECK\s*\(|INDEX|KEY\s)/i.test(
            trimmed,
          )
        )
          continue;

        const colMatch = trimmed.match(
          /^`?(\w+)`?\s+(\w+(?:\s*\(\s*[\d,\s]+\s*\))?)\s*(.*)/i,
        );
        if (colMatch) {
          const colName = colMatch[1];
          const colType = colMatch[2].toUpperCase();
          const rest = colMatch[3].trim();

          let colLine = createLine;
          for (let i = 0; i < matchLines.length; i++) {
            const re = new RegExp("^\\s*`?" + colName + "`?\\s+\\w", "i");
            if (re.test(matchLines[i])) {
              colLine = createLine + i;
              break;
            }
          }

          columns.push({
            name: colName,
            type: colType,
            constraints: rest,
            nullable: !/NOT\s+NULL/i.test(rest),
            isPrimaryKey: false,
            line: colLine,
          });
        }
      }

      for (const col of columns) {
        col.isPrimaryKey = primaryKey.some(
          (pk) => pk.toLowerCase() === col.name.toLowerCase(),
        );
      }

      tables[tableName.toLowerCase()] = {
        name: tableName,
        columns,
        primaryKey,
        line: createLine,
        endLine: createLine + matchLines.length - 1,
      };
    }
    return tables;
  }

  /* ================================================================
       CONTEXT HELPERS
       ================================================================ */

  function getStatementAtOffset(text, offset) {
    let start = 0,
      inStr = false,
      strCh = "";
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (inStr) {
        if (ch === strCh) {
          if (i + 1 < text.length && text[i + 1] === strCh) {
            i++;
          } else {
            inStr = false;
          }
        }
      } else {
        if (ch === "'" || ch === '"') {
          inStr = true;
          strCh = ch;
        } else if (ch === "-" && text[i + 1] === "-") {
          const eol = text.indexOf("\n", i);
          i = eol < 0 ? text.length - 1 : eol;
        } else if (ch === "/" && text[i + 1] === "*") {
          const ec = text.indexOf("*/", i + 2);
          i = ec < 0 ? text.length - 1 : ec + 1;
        } else if (ch === ";") {
          if (offset >= start && offset <= i) return text.substring(start, i);
          start = i + 1;
        }
      }
    }
    return text.substring(start);
  }

  function getAliasMap(stmtText) {
    const aliases = {};
    const rgx = /\b(?:FROM|JOIN)\s+`?(\w+)`?(?:\s+(?:AS\s+)?`?(\w+)`?)?/gi;
    let m;
    while ((m = rgx.exec(stmtText)) !== null) {
      const tbl = m[1].toLowerCase();
      const alias = m[2] ? m[2].toLowerCase() : null;
      if (schema[tbl]) {
        if (alias && !ALL_RESERVED_UPPER.has(alias.toUpperCase()))
          aliases[alias] = tbl;
        aliases[tbl] = tbl;
      }
    }
    const rgx2 = /\b(?:UPDATE|INTO)\s+`?(\w+)`?(?:\s+(?:AS\s+)?`?(\w+)`?)?/gi;
    while ((m = rgx2.exec(stmtText)) !== null) {
      const tbl = m[1].toLowerCase();
      const alias = m[2] ? m[2].toLowerCase() : null;
      if (schema[tbl]) {
        if (alias && !ALL_RESERVED_UPPER.has(alias.toUpperCase()))
          aliases[alias] = tbl;
        aliases[tbl] = tbl;
      }
    }
    return aliases;
  }

  function formatTableDoc(table) {
    let d = `**Table: ${table.name}**\n\n`;
    d += "| Column | Type | Nullable | PK |\n|---|---|---|---|\n";
    for (const c of table.columns) {
      d += `| \`${c.name}\` | ${c.type} | ${c.nullable ? "YES" : "NO"} | ${c.isPrimaryKey ? "✓" : ""} |\n`;
    }
    if (table.primaryKey.length)
      d += `\n**Primary Key:** (${table.primaryKey.join(", ")})`;
    return d;
  }

  function formatColumnDoc(col, tblName) {
    return (
      `**Column: \`${col.name}\`**\n\n` +
      `**Type:** ${col.type}  \n` +
      `**Nullable:** ${col.nullable ? "YES" : "NO"}  \n` +
      `**Table:** ${tblName}  \n` +
      (col.isPrimaryKey ? "**Primary Key:** YES  \n" : "") +
      (col.constraints ? `**Constraints:** ${col.constraints}` : "")
    );
  }

  // --- Language Configuration ---
  monaco.languages.setLanguageConfiguration("sql", {
    comments: { lineComment: "--", blockComment: ["/*", "*/"] },
    brackets: [
      ["(", ")"],
      ["[", "]"],
    ],
    autoClosingPairs: [
      { open: "(", close: ")" },
      { open: "[", close: "]" },
      { open: "'", close: "'", notIn: ["string"] },
      { open: '"', close: '"', notIn: ["string"] },
      { open: "`", close: "`", notIn: ["string"] },
    ],
    surroundingPairs: [
      { open: "(", close: ")" },
      { open: "'", close: "'" },
      { open: '"', close: '"' },
      { open: "`", close: "`" },
    ],
  });

  // ===================== COMPLETION PROVIDER =====================

  monaco.languages.registerCompletionItemProvider("sql", {
    triggerCharacters: ["."],

    provideCompletionItems: function (model, position) {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };
      const lineContent = model.getLineContent(position.lineNumber);
      const textBeforeWord = lineContent.substring(0, word.startColumn - 1);

      // ---- DOT COMPLETION: alias.column ----
      const dotMatch = textBeforeWord.match(/(\w+)\.\s*$/);
      if (dotMatch) {
        const prefix = dotMatch[1].toLowerCase();
        const fullText = model.getValue();
        const offset = model.getOffsetAt(position);
        const stmtText = getStatementAtOffset(fullText, offset);
        const aliases = getAliasMap(stmtText);
        const tableName = aliases[prefix];
        if (tableName && schema[tableName]) {
          const sugg = schema[tableName].columns.map((col) => ({
            label: col.name,
            kind: monaco.languages.CompletionItemKind.Field,
            insertText: col.name,
            detail: `${col.type}${col.isPrimaryKey ? " [PK]" : ""}${col.nullable ? "" : " NOT NULL"}`,
            documentation: {
              value: formatColumnDoc(col, schema[tableName].name),
            },
            range,
            sortText: "0" + col.name,
          }));
          sugg.push({
            label: "*",
            kind: monaco.languages.CompletionItemKind.Operator,
            insertText: "*",
            detail: "All columns from " + schema[tableName].name,
            range,
            sortText: "00",
          });
          return { suggestions: sugg };
        }
        return { suggestions: [] };
      }

      // ---- CONTEXT DETECTION ----
      const startLn = Math.max(1, position.lineNumber - 30);
      const textBefore = model
        .getValueInRange({
          startLineNumber: startLn,
          startColumn: 1,
          endLineNumber: position.lineNumber,
          endColumn: word.startColumn,
        })
        .replace(/\s+/g, " ")
        .trimEnd();

      const isTableCtx = /\b(FROM|JOIN|INTO|UPDATE|TABLE)\s*$/i.test(
        textBefore,
      );
      const isColCtx =
        /\b(SELECT|WHERE|ON|SET|AND|OR|BY|HAVING)\s*$/i.test(textBefore) ||
        /,\s*$/.test(textBefore);
      const insertColMatch = textBefore.match(
        /INSERT\s+INTO\s+`?(\w+)`?\s*\([^)]*$/i,
      );

      const suggestions = [];

      // ---- TABLE SUGGESTIONS ----
      for (const table of Object.values(schema)) {
        suggestions.push({
          label: table.name,
          kind: monaco.languages.CompletionItemKind.Class,
          insertText: table.name,
          detail: `Table (${table.columns.length} columns)`,
          documentation: { value: formatTableDoc(table) },
          range,
          sortText: isTableCtx ? "00" + table.name : "30" + table.name,
        });
      }

      // ---- COLUMN SUGGESTIONS ----
      if (insertColMatch) {
        const tbl = insertColMatch[1].toLowerCase();
        if (schema[tbl]) {
          for (const col of schema[tbl].columns) {
            suggestions.push({
              label: col.name,
              kind: monaco.languages.CompletionItemKind.Field,
              insertText: col.name,
              detail: `${col.type} — ${schema[tbl].name}`,
              documentation: { value: formatColumnDoc(col, schema[tbl].name) },
              range,
              sortText: "01" + col.name,
            });
          }
        }
      } else {
        const fullText = model.getValue();
        const offset = model.getOffsetAt(position);
        const stmtText = getStatementAtOffset(fullText, offset);
        const aliases = getAliasMap(stmtText);
        const seen = new Set();

        const addCols = (tblName, priority) => {
          if (!schema[tblName]) return;
          for (const col of schema[tblName].columns) {
            const k = tblName + "." + col.name;
            if (seen.has(k)) continue;
            seen.add(k);
            suggestions.push({
              label: col.name,
              kind: monaco.languages.CompletionItemKind.Field,
              insertText: col.name,
              detail: `${col.type} — ${schema[tblName].name}`,
              documentation: {
                value: formatColumnDoc(col, schema[tblName].name),
              },
              range,
              sortText: priority + col.name,
            });
          }
        };

        if (Object.keys(aliases).length > 0) {
          for (const tblName of Object.values(aliases))
            addCols(tblName, isColCtx ? "05" : "20");
        } else {
          for (const tblName of Object.keys(schema)) addCols(tblName, "20");
        }
      }

      if (!isTableCtx) {
        // ---- KEYWORD SUGGESTIONS ----
        for (const kw of SQL_KEYWORDS) {
          suggestions.push({
            label: kw,
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: kw,
            range,
            sortText: "40" + kw,
          });
        }

        // ---- FUNCTION SUGGESTIONS ----
        for (const fn of SQL_FUNCTIONS) {
          suggestions.push({
            label: fn.name,
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: fn.snippet,
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: fn.detail,
            documentation: { value: fn.doc },
            range,
            sortText: "10" + fn.name,
          });
        }

        // ---- SNIPPET SUGGESTIONS ----
        for (const s of SQL_SNIPPETS) {
          suggestions.push({
            label: s.label,
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: s.insertText,
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: s.detail,
            documentation: { value: s.doc },
            range,
            sortText: "50" + s.label,
          });
        }
      }
      return { suggestions };
    },
  });

  // ===================== HOVER PROVIDER =====================

  monaco.languages.registerHoverProvider("sql", {
    provideHover: function (model, position) {
      const wi = model.getWordAtPosition(position);
      if (!wi) return null;
      const wordLower = wi.word.toLowerCase();
      const hoverRange = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: wi.startColumn,
        endColumn: wi.endColumn,
      };
      const lineContent = model.getLineContent(position.lineNumber);

      // Dot prefix?
      let prefix = null;
      if (
        wi.startColumn > 1 &&
        lineContent.charAt(wi.startColumn - 2) === "."
      ) {
        if (wi.startColumn > 2) {
          const bw = model.getWordAtPosition({
            lineNumber: position.lineNumber,
            column: wi.startColumn - 2,
          });
          if (bw) prefix = bw.word.toLowerCase();
        }
      }

      if (prefix) {
        const fullText = model.getValue();
        const offset = model.getOffsetAt(position);
        const aliases = getAliasMap(getStatementAtOffset(fullText, offset));
        const tblName = aliases[prefix];
        if (tblName && schema[tblName]) {
          const col = schema[tblName].columns.find(
            (c) => c.name.toLowerCase() === wordLower,
          );
          if (col)
            return {
              range: hoverRange,
              contents: [
                {
                  value:
                    "```sql\n" +
                    col.name +
                    " " +
                    col.type +
                    (col.nullable ? "" : " NOT NULL") +
                    (col.isPrimaryKey ? " -- PRIMARY KEY" : "") +
                    "\n```",
                },
                { value: formatColumnDoc(col, schema[tblName].name) },
              ],
            };
        }
        return null;
      }

      // Table?
      if (schema[wordLower]) {
        const t = schema[wordLower];
        return {
          range: hoverRange,
          contents: [
            {
              value:
                "```sql\nTABLE " +
                t.name +
                " (" +
                t.columns.length +
                " columns)\n```",
            },
            { value: formatTableDoc(t) },
          ],
        };
      }

      // Column in any table? (try statement context first)
      const fullText = model.getValue();
      const offset = model.getOffsetAt(position);
      const aliases = getAliasMap(getStatementAtOffset(fullText, offset));
      for (const tn of new Set(Object.values(aliases))) {
        if (!schema[tn]) continue;
        const col = schema[tn].columns.find(
          (c) => c.name.toLowerCase() === wordLower,
        );
        if (col)
          return {
            range: hoverRange,
            contents: [
              {
                value:
                  "```sql\n" +
                  col.name +
                  " " +
                  col.type +
                  (col.nullable ? "" : " NOT NULL") +
                  (col.isPrimaryKey ? " -- PRIMARY KEY" : "") +
                  "\n```",
              },
              { value: formatColumnDoc(col, schema[tn].name) },
            ],
          };
      }
      // Fallback all tables
      for (const [tn, tbl] of Object.entries(schema)) {
        const col = tbl.columns.find((c) => c.name.toLowerCase() === wordLower);
        if (col)
          return {
            range: hoverRange,
            contents: [
              {
                value:
                  "```sql\n" +
                  col.name +
                  " " +
                  col.type +
                  (col.nullable ? "" : " NOT NULL") +
                  (col.isPrimaryKey ? " -- PRIMARY KEY" : "") +
                  "\n```",
              },
              { value: formatColumnDoc(col, tbl.name) },
            ],
          };
      }

      // Function?
      const fn = SQL_FUNCTIONS.find(
        (f) => f.name.toUpperCase() === wi.word.toUpperCase(),
      );
      if (fn)
        return {
          range: hoverRange,
          contents: [
            { value: "```sql\n" + fn.name + "(…)\n```" },
            { value: "**" + fn.detail + "**\n\n" + fn.doc },
          ],
        };

      return null;
    },
  });

  // ===================== DEFINITION PROVIDER =====================

  monaco.languages.registerDefinitionProvider("sql", {
    provideDefinition: function (model, position) {
      const wi = model.getWordAtPosition(position);
      if (!wi) return null;
      const wordLower = wi.word.toLowerCase();
      const lineContent = model.getLineContent(position.lineNumber);

      let prefix = null;
      if (
        wi.startColumn > 1 &&
        lineContent.charAt(wi.startColumn - 2) === "."
      ) {
        if (wi.startColumn > 2) {
          const bw = model.getWordAtPosition({
            lineNumber: position.lineNumber,
            column: wi.startColumn - 2,
          });
          if (bw) prefix = bw.word.toLowerCase();
        }
      }

      // alias.column → column definition line
      if (prefix) {
        const fullText = model.getValue();
        const offset = model.getOffsetAt(position);
        const aliases = getAliasMap(getStatementAtOffset(fullText, offset));
        const tblName = aliases[prefix];
        if (tblName && schema[tblName]) {
          const col = schema[tblName].columns.find(
            (c) => c.name.toLowerCase() === wordLower,
          );
          if (col)
            return {
              uri: model.uri,
              range: new monaco.Range(
                col.line,
                1,
                col.line,
                model.getLineLength(col.line) + 1,
              ),
            };
        }
        return null;
      }

      // Table name → CREATE TABLE line
      if (schema[wordLower]) {
        const t = schema[wordLower];
        return {
          uri: model.uri,
          range: new monaco.Range(
            t.line,
            1,
            t.line,
            model.getLineLength(t.line) + 1,
          ),
        };
      }

      // Alias → CREATE TABLE of aliased table
      const fullText = model.getValue();
      const offset = model.getOffsetAt(position);
      const aliases = getAliasMap(getStatementAtOffset(fullText, offset));
      if (aliases[wordLower] && schema[aliases[wordLower]]) {
        const t = schema[aliases[wordLower]];
        return {
          uri: model.uri,
          range: new monaco.Range(
            t.line,
            1,
            t.line,
            model.getLineLength(t.line) + 1,
          ),
        };
      }

      // Column name → first matching table column line
      for (const tbl of Object.values(schema)) {
        const col = tbl.columns.find((c) => c.name.toLowerCase() === wordLower);
        if (col)
          return {
            uri: model.uri,
            range: new monaco.Range(
              col.line,
              1,
              col.line,
              model.getLineLength(col.line) + 1,
            ),
          };
      }

      return null;
    },
  });

  setTimeout(() => {
    let parseTimeout: number | NodeJS.Timeout | undefined;
    function updateSchema() {
      schema = parseSchema(getEditor().getValue());
    }

    getEditor().onDidChangeModelContent(function () {
      clearTimeout(parseTimeout);
      parseTimeout = setTimeout(updateSchema, 400);
    });

    updateSchema();
  }, 50);
};
