import type * as Monaco from "monaco-editor";

/**
 * x86 / x86-64 assembly support.
 *
 * The tokenizer understands the two dialects that dominate real-world use:
 *   - Intel/NASM syntax   (`mov rax, [rbx + rcx*4]`)
 *   - AT&T/GAS syntax     (`movq -8(%rbp), %rax`)
 * Both are treated loosely so that a file using either one highlights well.
 */
export default (monaco: typeof Monaco) => {
  const ASM_LANG_ID = "asm";

  // ──────────────────────────────────────────
  // 1. VOCABULARY
  // ──────────────────────────────────────────
  const range = (prefix: string, from: number, to: number, suffix = "") =>
    Array.from({ length: to - from + 1 }, (_, i) => `${prefix}${from + i}${suffix}`);

  const BARE_REGISTERS = [
    // 8-bit
    "al",
    "ah",
    "bl",
    "bh",
    "cl",
    "ch",
    "dl",
    "dh",
    ...range("r", 8, 15, "b"),
    // 16-bit
    "ax",
    "bx",
    "cx",
    "dx",
    "si",
    "di",
    "bp",
    "sp",
    "ip",
    ...range("r", 8, 15, "w"),
    // 32-bit
    "eax",
    "ebx",
    "ecx",
    "edx",
    "esi",
    "edi",
    "ebp",
    "esp",
    "eip",
    ...range("r", 8, 15, "d"),
    // 64-bit
    "rax",
    "rbx",
    "rcx",
    "rdx",
    "rsi",
    "rdi",
    "rbp",
    "rsp",
    "rip",
    ...range("r", 8, 15),
    // segment
    "cs",
    "ds",
    "es",
    "fs",
    "gs",
    "ss",
    // flags / system
    "eflags",
    "rflags",
    "gdtr",
    "idtr",
    "ldtr",
    "tr",
    "msr",
    ...range("cr", 0, 15),
    ...range("dr", 0, 15),
    // x87
    "st",
    ...range("st", 0, 7),
    // MMX / SSE / AVX
    ...range("mm", 0, 7),
    ...range("xmm", 0, 31),
    ...range("ymm", 0, 31),
    ...range("zmm", 0, 31),
    ...range("k", 0, 7),
    ...range("bnd", 0, 3),
  ];
  const ATT_REGISTERS = BARE_REGISTERS.map((r) => `%${r}`);

  const ASM_MNEMONICS = [
    // data movement
    "mov",
    "movabs",
    "movzx",
    "movsx",
    "movsxd",
    "lea",
    "xchg",
    "xlat",
    "xlatb",
    "bswap",
    "cbw",
    "cwde",
    "cdqe",
    "cwd",
    "cdq",
    "cqo",
    "push",
    "pushf",
    "pushfd",
    "pushfq",
    "pusha",
    "pushad",
    "pop",
    "popf",
    "popfd",
    "popfq",
    "popa",
    "popad",
    "in",
    "out",
    "insb",
    "insw",
    "insd",
    "outsb",
    "outsw",
    "outsd",
    "movsb",
    "movsw",
    "movsd",
    "movsq",
    "cmpsb",
    "cmpsw",
    "cmpsd",
    "cmpsq",
    "scasb",
    "scasw",
    "scasd",
    "scasq",
    "stosb",
    "stosw",
    "stosd",
    "stosq",
    "lodsb",
    "lodsw",
    "lodsd",
    "lodsq",
    // conditional moves
    "cmove",
    "cmovz",
    "cmovne",
    "cmovnz",
    "cmova",
    "cmovae",
    "cmovb",
    "cmovbe",
    "cmovg",
    "cmovge",
    "cmovl",
    "cmovle",
    "cmovs",
    "cmovns",
    "cmovo",
    "cmovno",
    "cmovc",
    "cmovnc",
    "cmovp",
    "cmovnp",
    // arithmetic / logic
    "add",
    "adc",
    "sub",
    "sbb",
    "mul",
    "imul",
    "div",
    "idiv",
    "inc",
    "dec",
    "neg",
    "cmp",
    "and",
    "or",
    "xor",
    "not",
    "test",
    "shl",
    "shr",
    "sal",
    "sar",
    "rol",
    "ror",
    "rcl",
    "rcr",
    "shld",
    "shrd",
    "daa",
    "das",
    "aaa",
    "aas",
    "aam",
    "aad",
    // bit manipulation
    "bt",
    "bts",
    "btr",
    "btc",
    "bsf",
    "bsr",
    "popcnt",
    "lzcnt",
    "tzcnt",
    "andn",
    "bextr",
    "blsi",
    "blsmsk",
    "blsr",
    "bzhi",
    "mulx",
    "pdep",
    "pext",
    "rorx",
    "sarx",
    "shlx",
    "shrx",
    "adcx",
    "adox",
    // control flow
    "jmp",
    "je",
    "jz",
    "jne",
    "jnz",
    "ja",
    "jae",
    "jb",
    "jbe",
    "jc",
    "jcxz",
    "jecxz",
    "jrcxz",
    "jg",
    "jge",
    "jl",
    "jle",
    "jo",
    "jno",
    "js",
    "jns",
    "jp",
    "jpe",
    "jnp",
    "jpo",
    "call",
    "ret",
    "retn",
    "retf",
    "leave",
    "enter",
    "loop",
    "loope",
    "loopne",
    "loopz",
    "loopnz",
    "int",
    "int3",
    "into",
    "iret",
    "iretd",
    "iretq",
    "syscall",
    "sysret",
    "sysenter",
    "sysexit",
    "ud2",
    "hlt",
    "nop",
    "pause",
    "wait",
    "fwait",
    // prefixes
    "lock",
    "rep",
    "repe",
    "repz",
    "repne",
    "repnz",
    "bnd",
    "notrack",
    "xacquire",
    "xrelease",
    "data16",
    "addr16",
    // system / misc
    "cpuid",
    "rdtsc",
    "rdtscp",
    "rdmsr",
    "wrmsr",
    "rdpmc",
    "movbe",
    "crc32",
    "rdrand",
    "rdseed",
    "xgetbv",
    "xsetbv",
    "cli",
    "sti",
    "cld",
    "std",
    "clc",
    "stc",
    "cmc",
    "lahf",
    "sahf",
    "invlpg",
    "invpcid",
    "lgdt",
    "sgdt",
    "lidt",
    "sidt",
    "lldt",
    "sldt",
    "ltr",
    "str",
    "lmsw",
    "smsw",
    "lar",
    "lsl",
    "verr",
    "verw",
    "arpl",
    "bound",
    "clflush",
    "lfence",
    "sfence",
    "mfence",
    // x87
    "fld",
    "fst",
    "fstp",
    "fild",
    "fist",
    "fistp",
    "fadd",
    "faddp",
    "fsub",
    "fsubp",
    "fmul",
    "fmulp",
    "fdiv",
    "fdivp",
    "fcom",
    "fcomp",
    "fcompp",
    "fucom",
    "fucomp",
    "fucompp",
    "fabs",
    "fchs",
    "fsqrt",
    "fsin",
    "fcos",
    "fptan",
    "fpatan",
    "fldz",
    "fld1",
    "fldpi",
    "fscale",
    "frndint",
    "fxch",
    "fninit",
    "finit",
    "fnstsw",
    "fstsw",
    "fnstcw",
    "fstcw",
    "fldcw",
    "ffree",
    "fincstp",
    "fdecstp",
    // SSE / SSE2 / SSE3 / SSSE3 / SSE4
    "movaps",
    "movups",
    "movapd",
    "movupd",
    "movss",
    "movd",
    "movq",
    "movdqa",
    "movdqu",
    "movntps",
    "movntdq",
    "movnti",
    "movhps",
    "movlps",
    "movhpd",
    "movlpd",
    "movhlps",
    "movlhps",
    "movshdup",
    "movsldup",
    "movddup",
    "movmskps",
    "movmskpd",
    "addps",
    "addpd",
    "addss",
    "addsd",
    "subps",
    "subpd",
    "subss",
    "subsd",
    "mulps",
    "mulpd",
    "mulss",
    "mulsd",
    "divps",
    "divpd",
    "divss",
    "divsd",
    "sqrtps",
    "sqrtpd",
    "sqrtss",
    "sqrtsd",
    "rsqrtps",
    "rsqrtss",
    "rcpps",
    "rcpss",
    "maxps",
    "maxpd",
    "maxss",
    "maxsd",
    "minps",
    "minpd",
    "minss",
    "minsd",
    "andps",
    "andpd",
    "andnps",
    "andnpd",
    "orps",
    "orpd",
    "xorps",
    "xorpd",
    "cmpps",
    "cmppd",
    "cmpss",
    "comiss",
    "comisd",
    "ucomiss",
    "ucomisd",
    "shufps",
    "shufpd",
    "unpckhps",
    "unpcklps",
    "unpckhpd",
    "unpcklpd",
    "cvtps2pd",
    "cvtpd2ps",
    "cvtsi2ss",
    "cvtsi2sd",
    "cvtss2si",
    "cvtsd2si",
    "cvttss2si",
    "cvttsd2si",
    "cvtss2sd",
    "cvtsd2ss",
    "cvtdq2ps",
    "cvtps2dq",
    "cvttps2dq",
    "ldmxcsr",
    "stmxcsr",
    "prefetchnta",
    "prefetcht0",
    "prefetcht1",
    "prefetcht2",
    "pshufd",
    "pshufhw",
    "pshuflw",
    "pslldq",
    "psrldq",
    "pslld",
    "psrld",
    "psllq",
    "psrlq",
    "psllw",
    "psrlw",
    "paddb",
    "paddw",
    "paddd",
    "paddq",
    "psubb",
    "psubw",
    "psubd",
    "psubq",
    "pand",
    "pandn",
    "por",
    "pxor",
    "pmullw",
    "pmulhw",
    "pmuludq",
    "pmaddwd",
    "pcmpeqb",
    "pcmpeqw",
    "pcmpeqd",
    "pcmpgtb",
    "pcmpgtw",
    "pcmpgtd",
    "packsswb",
    "packssdw",
    "packuswb",
    "punpcklbw",
    "punpcklwd",
    "punpckldq",
    "punpckhbw",
    "punpckhwd",
    "punpckhdq",
    "psadbw",
    "pavgb",
    "pavgw",
    "pmaxsw",
    "pminsw",
    "pmaxub",
    "pminub",
    "ptest",
    "pblendvb",
    "blendvps",
    "blendvpd",
    "phaddw",
    "phaddd",
    "phsubw",
    "phsubd",
    "haddps",
    "hsubps",
    "insertps",
    "extractps",
    "roundps",
    "roundpd",
    "roundss",
    "roundsd",
    "mpsadbw",
    "pcmpistri",
    "pcmpistrm",
    "pcmpestri",
    "pcmpestrm",
    // AVX / AVX2 / FMA
    "vaddps",
    "vaddpd",
    "vaddss",
    "vaddsd",
    "vsubps",
    "vsubpd",
    "vsubss",
    "vsubsd",
    "vmulps",
    "vmulpd",
    "vmulss",
    "vmulsd",
    "vdivps",
    "vdivpd",
    "vdivss",
    "vdivsd",
    "vsqrtps",
    "vsqrtpd",
    "vsqrtss",
    "vsqrtsd",
    "vmaxps",
    "vmaxpd",
    "vminps",
    "vminpd",
    "vmovaps",
    "vmovups",
    "vmovapd",
    "vmovupd",
    "vmovss",
    "vmovsd",
    "vmovd",
    "vmovq",
    "vmovdqa",
    "vmovdqu",
    "vxorps",
    "vxorpd",
    "vandps",
    "vandpd",
    "vorps",
    "vorpd",
    "vcmpps",
    "vcmppd",
    "vcmpss",
    "vshufps",
    "vshufpd",
    "vpermilps",
    "vpermilpd",
    "vperm2f128",
    "vinsertf128",
    "vextractf128",
    "vbroadcastss",
    "vbroadcastsd",
    "vpbroadcastb",
    "vpbroadcastd",
    "vzeroupper",
    "vzeroall",
    "vfmadd132ps",
    "vfmadd213ps",
    "vfmadd231ps",
    "vfmadd132pd",
    "vfmadd213pd",
    "vfmadd231pd",
    "vfmsub132ps",
    "vfmsub213ps",
    "vfmsub231ps",
    "vfnmadd132ps",
    "vfnmadd213ps",
    "vfnmadd231ps",
    "vmaskmovps",
    "vmaskmovpd",
    "vgatherdps",
    "vpgatherdd",
    "vpaddb",
    "vpaddw",
    "vpaddd",
    "vpaddq",
    "vpsubb",
    "vpsubw",
    "vpsubd",
    "vpsubq",
    "vpand",
    "vpor",
    "vpxor",
    "vpcmpeqb",
    "vpcmpeqd",
    "vpmovmskb",
    "vpshufb",
  ];

  // Size-suffixed AT&T variants (`movl`, `addq`, `cmpb`, ...), plus the common
  // two-suffix moves (`movzbl`, `movslq`, ...).
  const SIZED_STEMS = [
    "mov",
    "movs",
    "movz",
    "add",
    "adc",
    "sub",
    "sbb",
    "and",
    "or",
    "xor",
    "cmp",
    "test",
    "inc",
    "dec",
    "neg",
    "not",
    "mul",
    "imul",
    "div",
    "idiv",
    "shl",
    "shr",
    "sal",
    "sar",
    "rol",
    "ror",
    "rcl",
    "rcr",
    "push",
    "pop",
    "lea",
    "xchg",
    "bt",
    "bts",
    "btr",
    "btc",
    "cmpxchg",
    "xadd",
    "bswap",
    "call",
    "jmp",
    "ret",
    "fld",
    "fst",
    "fstp",
    "fadd",
    "fsub",
    "fmul",
    "fdiv",
  ];
  for (const stem of SIZED_STEMS) {
    for (const suffix of ["b", "w", "l", "q"]) {
      ASM_MNEMONICS.push(stem + suffix);
    }
  }
  ASM_MNEMONICS.push(
    "movzbl",
    "movzwl",
    "movzbq",
    "movzwq",
    "movsbl",
    "movswl",
    "movsbq",
    "movswq",
    "movslq",
    "cltq",
    "cltd",
    "cqto",
    "movabsq",
  );

  const ASM_DIRECTIVES = [
    // sections / linking
    "section",
    "segment",
    "global",
    "globl",
    "extern",
    "external",
    "public",
    "extrn",
    "export",
    "import",
    "weak",
    "hidden",
    "protected",
    "internal",
    // data definition
    "db",
    "dw",
    "dd",
    "dq",
    "dt",
    "do",
    "dy",
    "dz",
    "ddq",
    "resb",
    "resw",
    "resd",
    "resq",
    "rest",
    "reso",
    "resy",
    "resz",
    "byte",
    "word",
    "dword",
    "qword",
    "tword",
    "oword",
    "yword",
    "zword",
    "ptr",
    "offset",
    "short",
    "near",
    "far",
    "flat",
    "rel",
    "abs",
    "strict",
    "ascii",
    "asciz",
    "string",
    "stringz",
    // symbols / constants
    "equ",
    "set",
    "equiv",
    "define",
    "xdefine",
    "assign",
    "undef",
    "deftok",
    "defstr",
    // structures / procedures / macros
    "struc",
    "endstruc",
    "istruc",
    "at",
    "iend",
    "proc",
    "endp",
    "macro",
    "endm",
    "endmacro",
    "unmacro",
    "local",
    // assembly control
    "bits",
    "use16",
    "use32",
    "use64",
    "org",
    "align",
    "alignb",
    "even",
    "times",
    "incbin",
    "include",
    "default",
    "cpu",
    "warning",
    "error",
    "fatal",
    "list",
    "nolist",
    "page",
    "title",
    "subtitle",
    "code16",
    "code32",
    "code64",
    "intel_syntax",
    "att_syntax",
    "syntax",
    "comment",
    // GAS-style
    ".text",
    ".data",
    ".bss",
    ".rodata",
    ".section",
    ".globl",
    ".global",
    ".extern",
    ".type",
    ".size",
    ".align",
    ".balign",
    ".p2align",
    ".byte",
    ".word",
    ".long",
    ".int",
    ".short",
    ".quad",
    ".octa",
    ".ascii",
    ".asciz",
    ".string",
    ".space",
    ".zero",
    ".fill",
    ".comm",
    ".lcomm",
    ".set",
    ".equ",
    ".equiv",
    ".macro",
    ".endm",
    ".rept",
    ".endr",
    ".irp",
    ".irpc",
    ".if",
    ".ifdef",
    ".ifndef",
    ".else",
    ".elseif",
    ".endif",
    ".include",
    ".incbin",
    ".code16",
    ".code32",
    ".code64",
    ".intel_syntax",
    ".att_syntax",
    ".file",
    ".line",
    ".loc",
    ".subsection",
    ".previous",
    ".pushsection",
    ".popsection",
    ".org",
    ".skip",
    ".abort",
    ".err",
    ".error",
    ".warning",
    ".print",
    ".ident",
    ".cfi_startproc",
    ".cfi_endproc",
    ".cfi_def_cfa",
    ".cfi_def_cfa_offset",
    ".cfi_offset",
    ".cfi_remember_state",
    ".cfi_restore_state",
    ".cfi_restore",
    ".cfi_sections",
    ".func",
    ".endfunc",
    ".seh_proc",
    ".seh_endproc",
    ".model",
    ".stack",
    ".const",
    ".code",
  ];

  const ASM_OPERATORS = [
    "+",
    "-",
    "*",
    "/",
    "%",
    "&",
    "|",
    "^",
    "~",
    "!",
    "=",
    "<",
    ">",
    "<<",
    ">>",
  ];

  // ──────────────────────────────────────────
  // 2. REGISTER LANGUAGE
  // ──────────────────────────────────────────
  monaco.languages.register({
    id: ASM_LANG_ID,
    extensions: [".asm", ".s", ".S", ".inc", ".nasm", ".nas"],
    aliases: ["Assembly", "assembly", "asm", "x86", "x86-64", "NASM", "GAS"],
    mimetypes: ["text/x-asm", "text/x-assembly"],
  });

  // ──────────────────────────────────────────
  // 3. MONARCH SYNTAX HIGHLIGHTING
  // ──────────────────────────────────────────
  monaco.languages.setMonarchTokensProvider(ASM_LANG_ID, {
    defaultToken: "",
    ignoreCase: true,

    mnemonics: ASM_MNEMONICS,
    directives: ASM_DIRECTIVES,
    registers: BARE_REGISTERS,
    attRegisters: ATT_REGISTERS,
    operators: ASM_OPERATORS,

    symbols: /[@~!%^&*\-+=|\\:;,.?\/$]+/,
    escapes: /\\(?:[abfnrtv\\'"0]|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4})/,

    tokenizer: {
      root: [
        // Comments: `;` (Intel/NASM), `#` (GAS) and C-style.
        [/\/\/.*$/, "comment"],
        [/\/\*/, "comment", "@blockComment"],
        [/[;#].*$/, "comment"],

        // Strings
        [/"/, "string", "@stringDouble"],
        [/'/, "string", "@stringSingle"],
        [/`/, "string", "@stringDouble"],

        // NASM preprocessor directives
        [
          /%(?:include|define|xdefine|assign|macro|endmacro|unmacro|undef|deftok|defstr|if|ifdef|ifndef|ifctx|ifidn|ifidni|ifid|elif|elifdef|elifndef|else|endif|rep|endrep|irp|irpc|exitrep|push|pop|error|warning|fatal|pathsearch|local|line|clear|depend|use|strlen|substr|rotate|stacksize|comment|endcomment)\b/,
          "keyword.directive",
        ],
        [
          /%[A-Za-z_]\w*/,
          {
            cases: {
              "@attRegisters": "variable.register",
              "@default": "variable.parameter",
            },
          },
        ],
        [/%[0-9]+/, "variable.parameter"],

        // Label definitions: `main:`, `.loop:`
        [/[A-Za-z_.$?@][\w.$?@]*(?=\s*:)/, "type.identifier"],

        // Numeric literals
        [/\$?(?:0[xX][0-9a-fA-F]+|0[bB][01]+|0[oO][0-7]+)/, "number.hex"],
        [/[0-9][0-9a-fA-F]*[hH]\b/, "number.hex"],
        [/[01]+[bB]\b/, "number.binary"],
        [/[0-7]+[oOqQ]\b/, "number.octal"],
        [/\d+\.\d*(?:[eE][-+]?\d+)?/, "number.float"],
        [/\d[\d_]*/, "number"],

        // Identifiers: mnemonics, directives, registers or plain names.
        [
          /[A-Za-z_.$?@][\w.$?@]*/,
          {
            cases: {
              "@mnemonics": "keyword",
              "@directives": "keyword.directive",
              "@registers": "variable.register",
              "@default": "identifier",
            },
          },
        ],

        // Brackets, separators
        [/[()[\]{}]/, "@brackets"],
        [/[,;]/, "delimiter"],
        [/\$+/, "keyword"],

        // Operators
        [
          /@symbols/,
          {
            cases: {
              "@operators": "operator",
              "@default": "delimiter",
            },
          },
        ],

        [/[ \t\r\n]+/, "white"],
      ],

      blockComment: [
        [/[^*/]+/, "comment"],
        [/\*\//, "comment", "@pop"],
        [/[*/]/, "comment"],
      ],

      stringDouble: [
        [/[^\\"`]+/, "string"],
        [/@escapes/, "string.escape"],
        [/\\./, "string.escape.invalid"],
        [/["`]/, "string", "@pop"],
      ],

      stringSingle: [
        [/[^\']+/, "string"],
        [/@escapes/, "string.escape"],
        [/\\./, "string.escape.invalid"],
        [/'/, "string", "@pop"],
      ],
    },
  });

  // ──────────────────────────────────────────
  // 4. LANGUAGE CONFIGURATION
  // ──────────────────────────────────────────
  monaco.languages.setLanguageConfiguration(ASM_LANG_ID, {
    comments: {
      lineComment: ";",
      blockComment: ["/*", "*/"],
    },
    brackets: [
      ["[", "]"],
      ["(", ")"],
      ["{", "}"],
    ],
    autoClosingPairs: [
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: "{", close: "}" },
      { open: '"', close: '"', notIn: ["string", "comment"] },
      { open: "'", close: "'", notIn: ["string", "comment"] },
      { open: "`", close: "`", notIn: ["string", "comment"] },
    ],
    surroundingPairs: [
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: "{", close: "}" },
      { open: '"', close: '"' },
      { open: "'", close: "'" },
      { open: "`", close: "`" },
    ],
    wordPattern: /[@$%?.\w]+/g,
  });

  // ──────────────────────────────────────────
  // 5. DOCUMENTATION DATABASE
  // ──────────────────────────────────────────
  const MNEMONIC_DOCS: Record<string, { sig: string; doc: string }> = {
    mov: {
      sig: "MOV destination, source",
      doc: "Copies the source operand into the destination. The operands must be the same size; memory-to-memory moves are not allowed.",
    },
    movabs: {
      sig: "MOVABS reg64, imm64",
      doc: "Moves a full 64-bit immediate into a register (no sign extension).",
    },
    movzx: {
      sig: "MOVZX destination, source",
      doc: "Moves a smaller operand into a larger register, zero-extending it.",
    },
    movsx: {
      sig: "MOVSX destination, source",
      doc: "Moves a smaller operand into a larger register, sign-extending it.",
    },
    movsxd: {
      sig: "MOVSXD reg64, r/m32",
      doc: "Sign-extends a 32-bit source into a 64-bit destination register.",
    },
    lea: {
      sig: "LEA reg, [base + index*scale + disp]",
      doc: "Loads the effective address of the memory operand into a register. Commonly used for pointer arithmetic without touching memory.",
    },
    xchg: {
      sig: "XCHG operand1, operand2",
      doc: "Exchanges the values of the two operands atomically (implicitly locked when memory is involved).",
    },
    push: {
      sig: "PUSH source",
      doc: "Decrements the stack pointer and stores the operand on the stack. In 64-bit mode usually pushes 8 bytes.",
    },
    pop: {
      sig: "POP destination",
      doc: "Loads the operand from the stack and increments the stack pointer.",
    },
    add: {
      sig: "ADD destination, source",
      doc: "destination = destination + source. Sets CF, OF, SF, ZF, AF and PF.",
    },
    adc: {
      sig: "ADC destination, source",
      doc: "Adds source plus the carry flag to destination. Used for multi-word arithmetic.",
    },
    sub: {
      sig: "SUB destination, source",
      doc: "destination = destination - source. Sets CF, OF, SF, ZF, AF and PF.",
    },
    sbb: {
      sig: "SBB destination, source",
      doc: "Subtracts source plus the borrow (carry) flag from destination.",
    },
    mul: {
      sig: "MUL source",
      doc: "Unsigned multiply. For 8/16/32/64-bit sources the result goes into AX/DX:AX/EDX:EAX/RDX:RAX.",
    },
    imul: {
      sig: "IMUL source  |  IMUL destination, source  |  IMUL destination, source, immediate",
      doc: "Signed multiply. The one-operand form uses the implicit accumulator; the two- and three-operand forms produce a truncated result.",
    },
    div: {
      sig: "DIV divisor",
      doc: "Unsigned divide of DX:AX / EDX:EAX / RDX:RAX by the divisor; quotient in AX/EAX/RAX, remainder in DX/EDX/RDX.",
    },
    idiv: {
      sig: "IDIV divisor",
      doc: "Signed divide using the implicit accumulator; raises #DE if the quotient overflows or the divisor is zero.",
    },
    inc: {
      sig: "INC operand",
      doc: "Increments the operand by one. Does not affect the carry flag.",
    },
    dec: {
      sig: "DEC operand",
      doc: "Decrements the operand by one. Does not affect the carry flag.",
    },
    neg: { sig: "NEG operand", doc: "Two's-complement negation of the operand." },
    not: { sig: "NOT operand", doc: "Bitwise complement of the operand." },
    cmp: {
      sig: "CMP operand1, operand2",
      doc: "Computes operand1 - operand2 and sets the flags, discarding the result. Usually followed by a conditional jump.",
    },
    test: {
      sig: "TEST operand1, operand2",
      doc: "Computes the bitwise AND and sets the flags, discarding the result. Often used to test a register for zero.",
    },
    and: { sig: "AND destination, source", doc: "Bitwise AND; stores the result in destination." },
    or: { sig: "OR destination, source", doc: "Bitwise OR; stores the result in destination." },
    xor: {
      sig: "XOR destination, source",
      doc: "Bitwise exclusive OR; stores the result in destination. `XOR reg, reg` is the idiomatic way to zero a register.",
    },
    shl: { sig: "SHL operand, count", doc: "Shifts the operand left by count bits, filling with zeros." },
    shr: { sig: "SHR operand, count", doc: "Shifts the operand right by count bits, filling with zeros (logical shift)." },
    sar: { sig: "SAR operand, count", doc: "Shifts the operand right by count bits, replicating the sign bit (arithmetic shift)." },
    rol: { sig: "ROL operand, count", doc: "Rotates the operand left by count bits." },
    ror: { sig: "ROR operand, count", doc: "Rotates the operand right by count bits." },
    jmp: {
      sig: "JMP target",
      doc: "Unconditional jump to a label or address. `JMP reg` / `JMP [mem]` performs an indirect jump.",
    },
    call: {
      sig: "CALL target",
      doc: "Pushes the return address and transfers control to a procedure.",
    },
    ret: {
      sig: "RET  |  RET immediate",
      doc: "Pops the return address into RIP and returns to the caller, optionally releasing `immediate` bytes of arguments.",
    },
    leave: { sig: "LEAVE", doc: "Sets RSP to RBP, then pops RBP. The standard epilogue before RET." },
    enter: { sig: "ENTER size, nesting", doc: "Builds a stack frame for a procedure. Rarely used by modern compilers." },
    loop: {
      sig: "LOOP target",
      doc: "Decrements RCX/ECX/CX and jumps to target if the counter is nonzero.",
    },
    int: {
      sig: "INT vector",
      doc: "Software interrupt. `INT 0x80` is the classic 32-bit Linux system call entry point.",
    },
    syscall: {
      sig: "SYSCALL",
      doc: "Fast system call into the kernel (x86-64). The number goes in RAX, arguments in RDI, RSI, RDX, R10, R8, R9.",
    },
    cpuid: {
      sig: "CPUID",
      doc: "Returns processor identification and feature information selected by the value in EAX.",
    },
    nop: { sig: "NOP", doc: "No operation. Used for alignment and timing." },
    pause: { sig: "PAUSE", doc: "Spin-loop hint; improves performance and power in busy-wait loops." },
    lock: { sig: "LOCK instruction", doc: "Prefix asserting a bus lock so the following read-modify-write instruction is atomic." },
    rep: { sig: "REP instruction", doc: "Prefix repeating a string instruction RCX times." },
    bt: { sig: "BT operand, bit", doc: "Copies the selected bit into the carry flag." },
    bsf: { sig: "BSF destination, source", doc: "Bit scan forward: index of the lowest set bit." },
    bsr: { sig: "BSR destination, source", doc: "Bit scan reverse: index of the highest set bit." },
    popcnt: { sig: "POPCNT destination, source", doc: "Counts the number of set bits in the source." },
    movdqa: { sig: "MOVDQA xmm, xmm/m128", doc: "Moves 128 bits between aligned memory and XMM registers." },
    movdqu: { sig: "MOVDQU xmm, xmm/m128", doc: "Moves 128 bits between unaligned memory and XMM registers." },
    movaps: { sig: "MOVAPS xmm, xmm/m128", doc: "Moves 128 bits of packed single-precision floats (16-byte aligned)." },
    movups: { sig: "MOVUPS xmm, xmm/m128", doc: "Moves 128 bits of packed single-precision floats (unaligned)." },
    leaq: { sig: "LEAQ reg64, [base + index*scale + disp]", doc: "64-bit LEA: loads a computed address/offset." },
  };

  const DIRECTIVE_DOCS: Record<string, string> = {
    section: "Starts an object-file section, e.g. `section .text`. Sections group code and data.",
    segment: "MASM synonym for `section`.",
    global: "Exports a symbol so the linker can see it, e.g. `global _start`.",
    globl: "GAS spelling of `global`.",
    extern: "Declares a symbol defined in another module.",
    ".text": "The executable code section.",
    ".data": "The writable, initialised data section.",
    ".bss": "The writable, zero-initialised data section.",
    ".rodata": "The read-only data section (constants).",
    db: "Defines byte-sized data, e.g. `db 'Hello', 0`.",
    dw: "Defines word-sized (2-byte) data.",
    dd: "Defines double-word (4-byte) data.",
    dq: "Defines quad-word (8-byte) data.",
    dt: "Defines ten-byte (80-bit) data.",
    resb: "Reserves uninitialised bytes, e.g. `buffer resb 64`.",
    resw: "Reserves uninitialised words.",
    resd: "Reserves uninitialised double-words.",
    resq: "Reserves uninitialised quad-words.",
    equ: "Defines a constant, e.g. `SIZE equ 64`. The value is fixed at assembly time.",
    times: "Repeats the following data or instruction a number of times, e.g. `times 64 db 0`.",
    align: "Advances the location counter to an alignment boundary.",
    org: "Sets the assembly origin (the address the code is assembled for).",
    incbin: "Includes a binary file verbatim.",
    include: "Includes another source file.",
    proc: "Marks the start of a procedure (MASM `name PROC ... name ENDP`).",
    endp: "Marks the end of a procedure.",
    macro: "Defines a macro.",
    endm: "Ends a macro definition.",
    ".globl": "GAS: makes a symbol global.",
    ".type": "GAS: records a symbol's type, e.g. `.type main, @function`.",
    ".size": "GAS: records a symbol's size in bytes.",
    ".equ": "GAS: defines a constant symbol.",
    ".set": "GAS: defines or redefines a symbol.",
    ".ascii": "GAS: emits a string without a terminating NUL.",
    ".asciz": "GAS: emits a NUL-terminated string.",
    ".string": "GAS: emits a NUL-terminated string.",
    ".quad": "GAS: emits 8-byte values.",
    ".long": "GAS: emits 4-byte values.",
    ".byte": "GAS: emits byte values.",
    ".intel_syntax": "GAS: switches to Intel operand order.",
    ".att_syntax": "GAS: switches to AT&T operand order.",
    ".cfi_startproc": "GAS: begins call-frame-information records for a function.",
    ".cfi_endproc": "GAS: ends call-frame-information records.",
  };

  const GPR_ROLES: Record<string, string> = {
    rax: "Accumulator. Return value, syscall number, and implicit operand of MUL/DIV.",
    rbx: "Base register. Callee-saved (preserved across calls).",
    rcx: "Counter. Shift/rotate count, loop counter, and the 4th integer argument.",
    rdx: "Data register. High half of MUL/DIV results and the 3rd integer argument.",
    rsi: "Source index. 2nd integer argument (and string source).",
    rdi: "Destination index. 1st integer argument (and string destination).",
    rbp: "Base pointer. Points at the current stack frame.",
    rsp: "Stack pointer. Points at the top of the stack.",
    rip: "Instruction pointer. Address of the next instruction.",
  };

  const describeRegister = (raw: string): { sig: string; doc: string } => {
    const name = raw.toLowerCase().replace(/^%/, "");
    if (GPR_ROLES[name]) {
      return { sig: name, doc: `${name.toUpperCase()}: ${GPR_ROLES[name]}` };
    }
    const alias: Record<string, [string, string]> = {
      eax: ["rax", "32-bit"],
      ebx: ["rbx", "32-bit"],
      ecx: ["rcx", "32-bit"],
      edx: ["rdx", "32-bit"],
      esi: ["rsi", "32-bit"],
      edi: ["rdi", "32-bit"],
      ebp: ["rbp", "32-bit"],
      esp: ["rsp", "32-bit"],
      eip: ["rip", "32-bit"],
      ax: ["rax", "16-bit"],
      bx: ["rbx", "16-bit"],
      cx: ["rcx", "16-bit"],
      dx: ["rdx", "16-bit"],
      si: ["rsi", "16-bit"],
      di: ["rdi", "16-bit"],
      bp: ["rbp", "16-bit"],
      sp: ["rsp", "16-bit"],
      ip: ["rip", "16-bit"],
      al: ["rax", "low 8-bit"],
      ah: ["rax", "high 8-bit"],
      bl: ["rbx", "low 8-bit"],
      bh: ["rbx", "high 8-bit"],
      cl: ["rcx", "low 8-bit"],
      ch: ["rcx", "high 8-bit"],
      dl: ["rdx", "low 8-bit"],
      dh: ["rdx", "high 8-bit"],
    };
    if (alias[name]) {
      const [parent, size] = alias[name];
      return {
        sig: name,
        doc: `${name.toUpperCase()} — the ${size} portion of ${parent.toUpperCase()}. ${GPR_ROLES[parent]}`,
      };
    }
    if (/^r\d+b$/.test(name))
      return { sig: name, doc: `${name.toUpperCase()} — 8-bit low byte of general-purpose register ${name.slice(0, -1).toUpperCase()}.` };
    if (/^r\d+w$/.test(name))
      return { sig: name, doc: `${name.toUpperCase()} — 16-bit portion of general-purpose register ${name.slice(0, -1).toUpperCase()}.` };
    if (/^r\d+d$/.test(name))
      return { sig: name, doc: `${name.toUpperCase()} — 32-bit portion of general-purpose register ${name.slice(0, -1).toUpperCase()}.` };
    if (/^r\d+$/.test(name))
      return { sig: name, doc: `${name.toUpperCase()} — a 64-bit general-purpose register.` };
    if (/^xmm\d+$/.test(name))
      return { sig: name, doc: `${name.toUpperCase()} — a 128-bit SSE/AVX vector register.` };
    if (/^ymm\d+$/.test(name))
      return { sig: name, doc: `${name.toUpperCase()} — a 256-bit AVX vector register.` };
    if (/^zmm\d+$/.test(name))
      return { sig: name, doc: `${name.toUpperCase()} — a 512-bit AVX-512 vector register.` };
    if (/^mm\d$/.test(name))
      return { sig: name, doc: `${name.toUpperCase()} — a 64-bit MMX register.` };
    if (/^k\d$/.test(name))
      return { sig: name, doc: `${name.toUpperCase()} — an AVX-512 mask register.` };
    if (/^cr\d+$/.test(name))
      return { sig: name, doc: `${name.toUpperCase()} — a control register.` };
    if (/^dr\d+$/.test(name))
      return { sig: name, doc: `${name.toUpperCase()} — a debug register.` };
    if (/^st\d?$/.test(name))
      return { sig: name, doc: `${name.toUpperCase()} — a register in the x87 floating-point stack.` };
    if (/^bnd\d$/.test(name))
      return { sig: name, doc: `${name.toUpperCase()} — an MPX bounds register.` };
    if (["cs", "ds", "es", "fs", "gs", "ss"].includes(name))
      return { sig: name, doc: `${name.toUpperCase()} — a segment register.` };
    if (name === "eflags" || name === "rflags")
      return { sig: name, doc: `${name.toUpperCase()} — the processor status/control flags register.` };
    return { sig: name, doc: `${name.toUpperCase()} — processor register.` };
  };

  // ──────────────────────────────────────────
  // 6. SNIPPETS
  // ──────────────────────────────────────────
  const asmSnippets = [
    {
      label: "section",
      detail: "Section directive",
      insertText: "section ${1:.text}",
      doc: "Starts an object-file section such as `.text`, `.data` or `.bss`.",
    },
    {
      label: "global",
      detail: "Global symbol",
      insertText: "global ${1:_start}",
      doc: "Exports a symbol so the linker can see it.",
    },
    {
      label: "extern",
      detail: "External symbol",
      insertText: "extern ${1:printf}",
      doc: "Declares a symbol defined in another module.",
    },
    {
      label: "equ",
      detail: "Constant definition",
      insertText: "${1:NAME} equ ${0:value}",
      doc: "Defines an assembly-time constant.",
    },
    {
      label: "label",
      detail: "Label",
      insertText: "${1:label}:",
      doc: "Declares a global label.",
    },
    {
      label: "locallabel",
      detail: "Local label (dot label)",
      insertText: ".${1:loop}:",
      doc: "Declares a local label scoped to the preceding global label (NASM).",
    },
    {
      label: "db",
      detail: "Byte data",
      insertText: '${1:msg} db "${2:Hello, world!}", ${3:0}',
      doc: "Emits NUL-terminated byte data.",
    },
    {
      label: "resb",
      detail: "Reserved bytes",
      insertText: "${1:buffer} resb ${2:64}",
      doc: "Reserves uninitialised bytes in `.bss`.",
    },
    {
      label: "proc",
      detail: "Procedure (NASM-style)",
      insertText: "${1:name}:\n\tpush rbp\n\tmov rbp, rsp\n\t${0}\n\tpop rbp\n\tret",
      doc: "Creates a function with a standard prologue and epilogue.",
    },
    {
      label: "endp",
      detail: "Procedure end (MASM)",
      insertText: "${1:name} endp",
      doc: "Ends a MASM procedure.",
    },
    {
      label: "main",
      detail: "Program entry point",
      insertText: "global _start\n\nsection .text\n_start:\n\t${0}\n\tmov rax, 60\n\txor rdi, rdi\n\tsyscall",
      doc: "Creates a Linux x86-64 entry point that exits cleanly.",
    },
    {
      label: "hello",
      detail: "Hello world (Linux syscalls)",
      insertText:
        'global _start\n\nsection .data\n    msg db "Hello, world!", 10\n    len equ $ - msg\n\nsection .text\n_start:\n    mov rax, 1\n    mov rdi, 1\n    mov rsi, msg\n    mov rdx, len\n    syscall\n\n    mov rax, 60\n    xor rdi, rdi\n    syscall',
      doc: "A complete x86-64 Linux program that writes a message with the write(2) syscall.",
    },
    {
      label: "syscall-exit",
      detail: "Exit syscall",
      insertText: "mov rax, 60\nxor rdi, rdi\nsyscall",
      doc: "Terminates the process with exit status 0 using syscall 60.",
    },
    {
      label: "syscall-write",
      detail: "Write syscall",
      insertText: "mov rax, 1\nmov rdi, 1\nmov rsi, ${1:msg}\nmov rdx, ${2:len}\nsyscall",
      doc: "Writes to a file descriptor using syscall 1 (write).",
    },
    {
      label: "call",
      detail: "Call a procedure",
      insertText: "call ${1:function}",
      doc: "Pushes the return address and transfers control to a procedure.",
    },
    {
      label: "ret",
      detail: "Return",
      insertText: "ret",
      doc: "Returns from the current procedure.",
    },
    {
      label: "push-pop",
      detail: "Preserve a register",
      insertText: "push ${1:rbx}\n${0}\npop ${1:rbx}",
      doc: "Saves and restores a register around a block of code.",
    },
    {
      label: "cmp",
      detail: "Compare and branch",
      insertText: "cmp ${1:rax}, ${2:rbx}\n${3:je} ${0:label}",
      doc: "Compares two operands and jumps to a label if the condition holds.",
    },
    {
      label: "if",
      detail: "If / else",
      insertText:
        "cmp ${1:rax}, ${2:0}\n${3:je} .else_${4:1}\n\t${5:; then}\n\tjmp .end_${4:1}\n.else_${4:1}:\n\t${6:; else}\n.end_${4:1}:",
      doc: "Builds an if/else using a compare and conditional jumps.",
    },
    {
      label: "loop",
      detail: "Counted loop",
      insertText:
        "mov rcx, ${1:10}\n.${2:loop}:\n\t${3:; body}\n\tdec rcx\n\tjnz .${2:loop}",
      doc: "Runs a body a fixed number of times using DEC/JNZ.",
    },
    {
      label: "for",
      detail: "Indexed for loop",
      insertText:
        "xor ${1:rcx}, ${1:rcx}\n.${2:for}:\n\tcmp ${1:rcx}, ${3:10}\n\tjge .${2:end}\n\t${4:; body}\n\tinc ${1:rcx}\n\tjmp .${2:for}\n.${2:end}:",
      doc: "A for-style loop with an explicit index and bound.",
    },
    {
      label: "macro",
      detail: "NASM macro definition",
      insertText: "%macro ${1:name} ${2:1}\n\t${0}\n%endmacro",
      doc: "Defines a NASM assembly-time macro with one parameter.",
    },
    {
      label: "pushall",
      detail: "Save caller-saved registers",
      insertText: "push rax\npush rcx\npush rdx\npush rsi\npush rdi\npush r8\npush r9\npush r10\npush r11\n${0}\npop r11\npop r10\npop r9\npop r8\npop rdi\npop rsi\npop rdx\npop rcx\npop rax",
      doc: "Saves and restores the SysV x86-64 caller-saved registers.",
    },
    {
      label: "gas-main",
      detail: "GAS main function",
      insertText:
        ".globl ${1:main}\n${1:main}:\n\tpush %rbp\n\tmov %rsp, %rbp\n\t${0}\n\txor %eax, %eax\n\tpop %rbp\n\tret",
      doc: "Creates an AT&T/GAS entry point with a standard frame.",
    },
    {
      label: "region",
      detail: "Foldable region",
      insertText: "; #region ${1:name}\n${0}\n; #endregion",
      doc: "A comment-delimited region that can be folded.",
    },
  ];

  // ──────────────────────────────────────────
  // 7. SIGNATURES (for parameter help)
  // ──────────────────────────────────────────
  const SIGNATURES: Record<
    string,
    { label: string; doc: string; params: string[] }
  > = {
    mov: {
      label: "MOV destination, source",
      doc: "Copy source into destination.",
      params: ["destination — register or memory", "source — register, memory or immediate"],
    },
    lea: {
      label: "LEA register, [base + index*scale + disp]",
      doc: "Load the effective address of the memory operand.",
      params: ["destination register", "memory operand"],
    },
    add: {
      label: "ADD destination, source",
      doc: "Add source to destination.",
      params: ["destination", "source"],
    },
    sub: {
      label: "SUB destination, source",
      doc: "Subtract source from destination.",
      params: ["destination", "source"],
    },
    cmp: {
      label: "CMP operand1, operand2",
      doc: "Compare operand1 with operand2 and set the flags.",
      params: ["first operand", "second operand"],
    },
    test: {
      label: "TEST operand1, operand2",
      doc: "Bitwise AND of the operands, setting the flags.",
      params: ["first operand", "second operand"],
    },
    imul: {
      label: "IMUL destination, source[, immediate]",
      doc: "Signed multiply.",
      params: ["destination", "source", "immediate (optional)"],
    },
    shl: {
      label: "SHL operand, count",
      doc: "Shift left by count bits.",
      params: ["operand", "count (CL or immediate)"],
    },
    shr: {
      label: "SHR operand, count",
      doc: "Logical shift right by count bits.",
      params: ["operand", "count (CL or immediate)"],
    },
    jmp: {
      label: "JMP target",
      doc: "Unconditional jump.",
      params: ["label or register/memory"],
    },
    call: {
      label: "CALL target",
      doc: "Call a procedure.",
      params: ["label or register/memory"],
    },
    push: {
      label: "PUSH source",
      doc: "Push an operand onto the stack.",
      params: ["register, memory or immediate"],
    },
    xchg: {
      label: "XCHG operand1, operand2",
      doc: "Exchange two operands.",
      params: ["first operand", "second operand"],
    },
  };

  // ──────────────────────────────────────────
  // 8. SYMBOL INDEX
  // ──────────────────────────────────────────
  type AsmSymbol = {
    name: string;
    kind: "section" | "label" | "constant" | "macro" | "function";
    line: number;
    column: number;
    endColumn: number;
    detail: string;
  };

  const isCommentLine = (line: string) => {
    const t = line.trimStart();
    return t.startsWith(";") || t.startsWith("#") || t.startsWith("//");
  };

  const parseSymbols = (model: Monaco.editor.ITextModel): AsmSymbol[] => {
    const symbols: AsmSymbol[] = [];
    const lines = model.getLinesContent();

    const add = (name: string, kind: AsmSymbol["kind"], line: number, idx: number, detail: string) => {
      if (!name) return;
      symbols.push({
        name,
        kind,
        line: line + 1,
        column: idx + 1,
        endColumn: idx + 1 + name.length,
        detail,
      });
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (isCommentLine(line)) continue;

      let m: RegExpExecArray | null;

      m = /^\s*%?(?:define|xdefine|assign)\s+([\w.$?@]+)/i.exec(line);
      if (m) {
        add(m[1], "constant", i, line.indexOf(m[1]), line.trim());
        continue;
      }

      m = /^\s*\.(?:equ|set|equiv)\s+([\w.$?@]+)/i.exec(line);
      if (m) {
        add(m[1], "constant", i, line.indexOf(m[1]), line.trim());
        continue;
      }

      m = /^\s*([A-Za-z_.$?@][\w.$?@]*)\s+(?:equ|EQU)\b/.exec(line);
      if (m) {
        add(m[1], "constant", i, line.indexOf(m[1]), line.trim());
        continue;
      }

      m = /^\s*(?:%macro|\.macro)\s+([\w.$?@]+)/i.exec(line);
      if (m) {
        add(m[1], "macro", i, line.indexOf(m[1]), line.trim());
        continue;
      }

      m = /^\s*([\w.$?@]+)\s+macro\b/i.exec(line);
      if (m) {
        add(m[1], "macro", i, line.indexOf(m[1]), line.trim());
        continue;
      }

      m = /^\s*(?:section|segment)\s+([\w.$]+)/i.exec(line);
      if (m) {
        add(m[1], "section", i, line.indexOf(m[1]), line.trim());
        continue;
      }

      m = /^\s*(\.(?:text|data|bss|rodata|code|const|stack|init|fini))\b/i.exec(line);
      if (m) {
        add(m[1], "section", i, line.indexOf(m[1]), line.trim());
        continue;
      }

      m = /^\s*([\w.$?@]+)\s+proc\b/i.exec(line);
      if (m) {
        add(m[1], "function", i, line.indexOf(m[1]), line.trim());
        continue;
      }

      m = /^\s*([A-Za-z_.$?@][\w.$?@]*)\s*:/.exec(line);
      if (m) {
        add(m[1], "label", i, line.indexOf(m[1]), line.trim());
        continue;
      }
    }

    return symbols;
  };

  const isIdentChar = (ch: string) => ch !== "" && /[\w.$?@%]/.test(ch);

  const findOccurrences = (
    lines: string[],
    name: string,
    fromLine = 0,
    toLine = lines.length - 1,
  ) => {
    const out: { line: number; startColumn: number; endColumn: number }[] = [];
    const end = Math.min(toLine, lines.length - 1);
    for (let i = Math.max(0, fromLine); i <= end; i++) {
      const line = lines[i];
      let at = 0;
      for (;;) {
        const idx = line.indexOf(name, at);
        if (idx === -1) break;
        const before = idx > 0 ? line[idx - 1] : "";
        const after = idx + name.length < line.length ? line[idx + name.length] : "";
        if (!isIdentChar(before) && !isIdentChar(after)) {
          out.push({
            line: i + 1,
            startColumn: idx + 1,
            endColumn: idx + 1 + name.length,
          });
        }
        at = idx + 1;
      }
    }
    return out;
  };

  // ──────────────────────────────────────────
  // 9. SCOPE RESOLUTION (local labels bind to a global label)
  // ──────────────────────────────────────────
  const globalLabelRe = /^\s*([A-Za-z_$?@][\w.$?@]*)\s*:/;

  const globalLabelLines = (lines: string[]) => {
    const result: number[] = [];
    for (let i = 0; i < lines.length; i++) {
      if (isCommentLine(lines[i])) continue;
      if (globalLabelRe.test(lines[i])) result.push(i);
    }
    return result;
  };

  const scopeBounds = (globals: number[], line: number, total: number) => {
    let start = 0;
    let end = total - 1;
    for (const g of globals) {
      if (g <= line) start = g;
      else {
        end = g - 1;
        break;
      }
    }
    return { start, end };
  };

  const resolveName = (model: Monaco.editor.ITextModel, name: string, line: number) => {
    const lines = model.getLinesContent();
    const symbols = parseSymbols(model);
    const isLocal = name.startsWith(".");
    if (isLocal) {
      const globals = globalLabelLines(lines);
      const { start, end } = scopeBounds(globals, line, lines.length);
      const scoped = symbols.filter((s) => s.name === name && s.line - 1 >= start && s.line - 1 <= end);
      return { isLocal, symbols: scoped, lines, start, end };
    }
    return { isLocal, symbols, lines, start: 0, end: lines.length - 1 };
  };

  // ──────────────────────────────────────────
  // 10. COMPLETION PROVIDER
  // ──────────────────────────────────────────
  const CIK = monaco.languages.CompletionItemKind;
  const InsertAsSnippet = monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet;

  monaco.languages.registerCompletionItemProvider(ASM_LANG_ID, {
    triggerCharacters: [".", "%", "["],
    provideCompletionItems: (model, position) => {
      const textUntil = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });
      const trimmed = textUntil.trimStart();
      if (trimmed.startsWith(";") || trimmed.startsWith("#") || trimmed.startsWith("//")) {
        return { suggestions: [] };
      }

      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };
      const suggestions: Monaco.languages.CompletionItem[] = [];
      const att = word.word.startsWith("%");

      // `%`-prefixed: AT&T registers (e.g. `%rax`) or NASM preprocessor directives.
      if (/%\w*$/.test(textUntil)) {
        const partial = (/%(\w*)$/.exec(textUntil)?.[1] || "").toLowerCase();
        const atRange = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: position.column - word.word.length,
          endColumn: position.column,
        };
        const registerMatches = BARE_REGISTERS.filter((r) => r.startsWith(partial));
        if (partial.length > 0 && registerMatches.length > 0) {
          registerMatches.forEach((r) => {
            suggestions.push({
              label: "%" + r,
              kind: CIK.Variable,
              detail: "register",
              documentation: { value: describeRegister(r).doc },
              insertText: "%" + r,
              range: atRange,
              sortText: "0_" + r,
            });
          });
          return { suggestions };
        }
        const percentDirectives = [
          "%include",
          "%define",
          "%xdefine",
          "%assign",
          "%macro",
          "%endmacro",
          "%undef",
          "%if",
          "%ifdef",
          "%ifndef",
          "%elif",
          "%else",
          "%endif",
          "%rep",
          "%endrep",
          "%irp",
          "%irpc",
          "%error",
          "%warning",
          "%line",
          "%local",
        ];
        percentDirectives.forEach((d) => {
          suggestions.push({
            label: d,
            kind: CIK.Keyword,
            detail: "preprocessor directive",
            documentation: { value: DIRECTIVE_DOCS[d.slice(1)] || `NASM preprocessor directive \`${d}\`.` },
            insertText: d.slice(1),
            range: atRange,
            sortText: "0_" + d,
          });
        });
        return { suggestions };
      }

      // Local-label / dot-directive completion after `.`
      if (/\.\w*$/.test(textUntil) && /^\s*\.\w*$/.test(textUntil)) {
        ASM_DIRECTIVES.filter((d) => d.startsWith(".")).forEach((d) => {
          suggestions.push({
            label: d,
            kind: CIK.Keyword,
            detail: "directive",
            documentation: { value: DIRECTIVE_DOCS[d] || `Assembler directive \`${d}\`.` },
            insertText: d,
            range,
            sortText: "0_" + d,
          });
        });
      }

      // User-defined labels, constants and macros
      const symbols = parseSymbols(model);
      const seen = new Set<string>();
      symbols.forEach((sym) => {
        const key = sym.name.toLowerCase();
        if (seen.has(key)) return;
        seen.add(key);
        let kind: Monaco.languages.CompletionItemKind = CIK.Variable;
        switch (sym.kind) {
          case "label":
          case "function":
            kind = CIK.Function;
            break;
          case "macro":
            kind = CIK.Method;
            break;
          case "constant":
            kind = CIK.Constant;
            break;
          case "section":
            kind = CIK.Module;
            break;
        }
        suggestions.push({
          label: sym.name,
          kind,
          detail: `${sym.kind} (user-defined)`,
          documentation: { value: "```asm\n" + sym.detail + "\n```\n_Defined at line " + sym.line + "_" },
          insertText: sym.name,
          range,
          sortText: "1_" + sym.name,
        });
      });

      // Snippets
      asmSnippets.forEach((s) => {
        suggestions.push({
          label: s.label,
          kind: CIK.Snippet,
          detail: "Snippet: " + s.detail,
          documentation: { value: s.doc },
          insertText: s.insertText,
          insertTextRules: InsertAsSnippet,
          range,
          sortText: "2_" + s.label,
        });
      });

      // Mnemonics
      ASM_MNEMONICS.forEach((m) => {
        const info = MNEMONIC_DOCS[m];
        suggestions.push({
          label: m,
          kind: CIK.Keyword,
          detail: info ? info.sig : "instruction",
          documentation: info ? { value: info.doc } : undefined,
          insertText: m,
          range,
          sortText: "3_" + m,
        });
      });

      // Registers
      BARE_REGISTERS.forEach((r) => {
        const label = att ? "%" + r : r;
        const info = describeRegister(r);
        suggestions.push({
          label,
          kind: CIK.Variable,
          detail: "register",
          documentation: { value: info.doc },
          insertText: att ? "%" + r : r,
          range,
          sortText: "4_" + r,
        });
      });

      // Directives
      ASM_DIRECTIVES.forEach((d) => {
        suggestions.push({
          label: d,
          kind: CIK.Keyword,
          detail: "directive",
          documentation: { value: DIRECTIVE_DOCS[d] || `Assembler directive \`${d}\`.` },
          insertText: d,
          range,
          sortText: "5_" + d,
        });
      });

      return { suggestions };
    },
  });

  // ──────────────────────────────────────────
  // 11. HOVER PROVIDER
  // ──────────────────────────────────────────
  monaco.languages.registerHoverProvider(ASM_LANG_ID, {
    provideHover: (model, position) => {
      const word = model.getWordAtPosition(position);
      if (!word) return null;
      const raw = word.word;
      const lower = raw.toLowerCase().replace(/^%/, "");
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };

      // Registers (bare or %-prefixed)
      if (BARE_REGISTERS.includes(lower)) {
        const info = describeRegister(lower);
        return {
          range,
          contents: [
            { value: "```asm\n" + info.sig + "\n```" },
            { value: info.doc },
          ],
        };
      }

      // Mnemonics
      const mdoc = MNEMONIC_DOCS[lower];
      if (mdoc || ASM_MNEMONICS.includes(lower)) {
        return {
          range,
          contents: [
            { value: "```asm\n" + (mdoc ? mdoc.sig : lower.toUpperCase()) + "\n```" },
            { value: mdoc ? mdoc.doc : "x86 instruction." },
          ],
        };
      }

      // Directives
      const ddoc = DIRECTIVE_DOCS[raw] || DIRECTIVE_DOCS[lower];
      if (ddoc || ASM_DIRECTIVES.includes(lower)) {
        return {
          range,
          contents: [
            { value: "```asm\n" + (ddoc ? raw : lower) + "\n```" },
            { value: ddoc || "Assembler directive." },
          ],
        };
      }

      // User-defined symbols
      if (raw.startsWith("%")) return null;
      const symbols = parseSymbols(model);
      const key = lower;
      const matches = symbols.filter((s) => s.name.toLowerCase() === key);
      if (matches.length > 0) {
        const sym = matches[0];
        return {
          range,
          contents: [
            { value: "**" + sym.kind + "** `" + sym.name + "`" },
            { value: "```asm\n" + sym.detail + "\n```" },
            { value: "_Defined at line " + sym.line + "_" },
          ],
        };
      }

      return null;
    },
  });

  // ──────────────────────────────────────────
  // 12. DEFINITION PROVIDER
  // ──────────────────────────────────────────
  monaco.languages.registerDefinitionProvider(ASM_LANG_ID, {
    provideDefinition: (model, position) => {
      const word = model.getWordAtPosition(position);
      if (!word || word.word.startsWith("%")) return null;
      const name = word.word;
      const { symbols } = resolveName(model, name, position.lineNumber - 1);
      if (symbols.length === 0) return null;
      return symbols.map((sym) => ({
        uri: model.uri,
        range: {
          startLineNumber: sym.line,
          endLineNumber: sym.line,
          startColumn: sym.column,
          endColumn: sym.endColumn,
        },
      }));
    },
  });

  // ──────────────────────────────────────────
  // 13. SIGNATURE HELP PROVIDER
  // ──────────────────────────────────────────
  monaco.languages.registerSignatureHelpProvider(ASM_LANG_ID, {
    signatureHelpTriggerCharacters: ["(", ","],
    provideSignatureHelp: (model, position) => {
      const lineText = model
        .getLineContent(position.lineNumber)
        .slice(0, position.column - 1)
        .replace(/;.*$/, "");
      // Drop a leading label (`main:`) so the mnemonic is the first word.
      const code = lineText.replace(/^\s*[\w.$?@]+\s*:/, "");
      const match = /^\s*([A-Za-z][\w.]*)\b/.exec(code);
      if (!match) return null;
      const mnemonic = match[1].toLowerCase();
      const sig = SIGNATURES[mnemonic];
      if (!sig) return null;

      const after = code.slice(match[0].length);
      const activeParameter = (after.match(/,/g) || []).length;

      return {
        value: {
          signatures: [
            {
              label: sig.label,
              documentation: sig.doc,
              parameters: sig.params.map((p) => ({ label: p })),
            },
          ],
          activeSignature: 0,
          activeParameter: Math.min(activeParameter, sig.params.length - 1),
        },
        dispose: () => {},
      };
    },
  });

  // ──────────────────────────────────────────
  // 14. DOCUMENT SYMBOL PROVIDER (Outline)
  // ──────────────────────────────────────────
  monaco.languages.registerDocumentSymbolProvider(ASM_LANG_ID, {
    provideDocumentSymbols: (model) => {
      const symbols = parseSymbols(model);
      const SK = monaco.languages.SymbolKind;
      return symbols.map((sym) => {
        let kind: Monaco.languages.SymbolKind;
        switch (sym.kind) {
          case "section":
            kind = SK.Namespace;
            break;
          case "macro":
            kind = SK.Method;
            break;
          case "constant":
            kind = SK.Constant;
            break;
          case "label":
          case "function":
          default:
            kind = SK.Function;
            break;
        }
        return {
          name: sym.name,
          detail: sym.detail,
          kind,
          range: {
            startLineNumber: sym.line,
            startColumn: 1,
            endLineNumber: sym.line,
            endColumn: sym.endColumn,
          },
          selectionRange: {
            startLineNumber: sym.line,
            startColumn: sym.column,
            endLineNumber: sym.line,
            endColumn: sym.endColumn,
          },
        };
      });
    },
  });

  // ──────────────────────────────────────────
  // 15. FOLDING RANGE PROVIDER
  // ──────────────────────────────────────────
  monaco.languages.registerFoldingRangeProvider(ASM_LANG_ID, {
    provideFoldingRanges: (model) => {
      const lines = model.getLinesContent();
      const ranges: {
        start: number;
        end: number;
        kind: Monaco.languages.FoldingRangeKind;
      }[] = [];

      // Region markers
      let regionStart = -1;
      for (let i = 0; i < lines.length; i++) {
        if (/^\s*[;#/]+\s*#?region\b/i.test(lines[i])) {
          regionStart = i + 1;
        } else if (/^\s*[;#/]+\s*#?endregion\b/i.test(lines[i]) && regionStart !== -1) {
          if (i + 1 - regionStart >= 1) {
            ranges.push({
              start: regionStart,
              end: i + 1,
              kind: monaco.languages.FoldingRangeKind.Region,
            });
          }
          regionStart = -1;
        }
      }

      // Procedural / macro blocks
      const blockPairs: [RegExp, RegExp][] = [
        [/^\s*(?:%macro|\.macro)\b/i, /^\s*(?:%endmacro|\.endm)\b/i],
        [/^\s*[\w.$?@]+\s+PROC\b/i, /^\s*[\w.$?@]+\s+ENDP\b/i],
        [/^\s*[\w.$?@]+\s+MACRO\b/i, /^\s*[\w.$?@]+\s+ENDM\b/i],
        [/^\s*[\w.$?@]+\s+STRUC\b/i, /^\s*[\w.$?@]+\s+ENDSTRUC\b/i],
        [/^\s*\.cfi_startproc\b/i, /^\s*\.cfi_endproc\b/i],
      ];
      const stack: { line: number; close: RegExp }[] = [];
      for (let i = 0; i < lines.length; i++) {
        for (const [open, close] of blockPairs) {
          if (open.test(lines[i])) stack.push({ line: i + 1, close });
        }
        if (stack.length > 0 && stack[stack.length - 1].close.test(lines[i])) {
          const blk = stack.pop()!;
          if (i + 1 - blk.line >= 1) {
            ranges.push({
              start: blk.line,
              end: i + 1,
              kind: monaco.languages.FoldingRangeKind.Region,
            });
          }
        }
      }

      // Sections span up to the next section directive.
      const sectionLine = (line: string) =>
        /^\s*\.?(?:section|segment)\s+\S+/i.test(line) ||
        /^\s*\.(?:text|data|bss|rodata|code|const)\s*$/i.test(line);
      const sectionStarts: number[] = [];
      for (let i = 0; i < lines.length; i++) {
        if (sectionLine(lines[i])) sectionStarts.push(i + 1);
      }
      for (let s = 0; s < sectionStarts.length - 1; s++) {
        const start = sectionStarts[s];
        const end = sectionStarts[s + 1] - 1;
        if (end > start) {
          ranges.push({ start, end, kind: monaco.languages.FoldingRangeKind.Region });
        }
      }

      // Consecutive comment blocks
      let commentStart = -1;
      for (let i = 0; i < lines.length; i++) {
        const isComment = isCommentLine(lines[i]);
        if (isComment && commentStart === -1) commentStart = i + 1;
        else if (!isComment && commentStart !== -1) {
          if (i + 1 - commentStart >= 2) {
            ranges.push({
              start: commentStart,
              end: i,
              kind: monaco.languages.FoldingRangeKind.Comment,
            });
          }
          commentStart = -1;
        }
      }
      if (commentStart !== -1 && lines.length + 1 - commentStart >= 2) {
        ranges.push({
          start: commentStart,
          end: lines.length,
          kind: monaco.languages.FoldingRangeKind.Comment,
        });
      }

      return ranges;
    },
  });

  // ──────────────────────────────────────────
  // 16. REFERENCE, HIGHLIGHT & RENAME PROVIDERS
  // ──────────────────────────────────────────
  monaco.languages.registerReferenceProvider(ASM_LANG_ID, {
    provideReferences: (model, position) => {
      const word = model.getWordAtPosition(position);
      if (!word || word.word.startsWith("%")) return [];
      const name = word.word;
      const { isLocal, lines, start, end } = resolveName(model, name, position.lineNumber - 1);
      const hits = isLocal
        ? findOccurrences(lines, name, start, end)
        : findOccurrences(lines, name);
      return hits.map((r) => ({
        uri: model.uri,
        range: new monaco.Range(r.line, r.startColumn, r.line, r.endColumn),
      }));
    },
  });

  monaco.languages.registerDocumentHighlightProvider(ASM_LANG_ID, {
    provideDocumentHighlights: (model, position) => {
      const word = model.getWordAtPosition(position);
      if (!word) return [];
      const name = word.word;
      const local = name.startsWith(".");
      const lines = model.getLinesContent();
      const globals = local ? globalLabelLines(lines) : [];
      const { start, end } = local
        ? scopeBounds(globals, position.lineNumber - 1, lines.length)
        : { start: 0, end: lines.length - 1 };
      return findOccurrences(lines, name, start, end).map((r) => ({
        range: new monaco.Range(r.line, r.startColumn, r.line, r.endColumn),
        kind: monaco.languages.DocumentHighlightKind.Text,
      }));
    },
  });

  monaco.languages.registerRenameProvider(ASM_LANG_ID, {
    provideRenameEdits: (model, position, newName) => {
      const word = model.getWordAtPosition(position);
      if (!word) return null;
      const name = word.word;
      if (name.startsWith("%") || ASM_MNEMONICS.includes(name.toLowerCase())) {
        return null;
      }

      const { isLocal, lines, start, end } = resolveName(model, name, position.lineNumber - 1);
      const hits = isLocal ? findOccurrences(lines, name, start, end) : findOccurrences(lines, name);

      return {
        edits: hits.map((r) => ({
          resource: model.uri,
          versionId: model.getVersionId(),
          textEdit: {
            range: new monaco.Range(r.line, r.startColumn, r.line, r.endColumn),
            text: newName,
          },
        })),
      };
    },
    resolveRenameLocation: (model, position) => {
      const word = model.getWordAtPosition(position);
      if (!word) return { rejectReason: "Cannot rename this element." };
      if (word.word.startsWith("%") || ASM_MNEMONICS.includes(word.word.toLowerCase())) {
        return { rejectReason: "Cannot rename a register or instruction." };
      }
      return {
        range: new monaco.Range(
          position.lineNumber,
          word.startColumn,
          position.lineNumber,
          word.endColumn,
        ),
        text: word.word,
      };
    },
  });
};
