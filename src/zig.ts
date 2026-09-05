import type * as Monaco from "monaco-editor";

export default (monaco: typeof Monaco) => {
  // ── Zig Language Definition ──────────────────────────────────────

  const ZIG_LANG_ID = "zig";

  const ZIG_KEYWORDS = [
    "addrspace",
    "align",
    "allowzero",
    "and",
    "anyframe",
    "anytype",
    "asm",
    "async",
    "await",
    "break",
    "callconv",
    "catch",
    "comptime",
    "const",
    "continue",
    "defer",
    "else",
    "enum",
    "errdefer",
    "error",
    "export",
    "extern",
    "fn",
    "for",
    "if",
    "inline",
    "linksection",
    "noalias",
    "nosuspend",
    "opaque",
    "or",
    "orelse",
    "packed",
    "pub",
    "resume",
    "return",
    "struct",
    "suspend",
    "switch",
    "test",
    "threadlocal",
    "try",
    "union",
    "unreachable",
    "var",
    "volatile",
    "while",
  ];

  const ZIG_TYPES = [
    "bool",
    "void",
    "noreturn",
    "type",
    "anyerror",
    "anyopaque",
    "u8",
    "u16",
    "u32",
    "u64",
    "u128",
    "usize",
    "i8",
    "i16",
    "i32",
    "i64",
    "i128",
    "isize",
    "f16",
    "f32",
    "f64",
    "f80",
    "f128",
    "comptime_int",
    "comptime_float",
    "c_char",
    "c_short",
    "c_ushort",
    "c_int",
    "c_uint",
    "c_long",
    "c_ulong",
    "c_longlong",
    "c_ulonglong",
    "c_longdouble",
  ];

  const ZIG_CONSTANTS = ["null", "undefined", "true", "false"];

  const ZIG_BUILTINS_RAW = [
    "@addWithOverflow",
    "@alignCast",
    "@alignOf",
    "@as",
    "@atomicLoad",
    "@atomicRmw",
    "@atomicStore",
    "@bitCast",
    "@bitOffsetOf",
    "@bitReverse",
    "@bitSizeOf",
    "@boolToInt",
    "@breakpoint",
    "@byteSwap",
    "@call",
    "@cDefine",
    "@ceil",
    "@cImport",
    "@cInclude",
    "@clz",
    "@cmpxchgStrong",
    "@cmpxchgWeak",
    "@compileError",
    "@compileLog",
    "@cos",
    "@ctz",
    "@cUndef",
    "@divExact",
    "@divFloor",
    "@divTrunc",
    "@embedFile",
    "@enumFromInt",
    "@enumToInt",
    "@errorCast",
    "@errorFromInt",
    "@errorName",
    "@errorReturnTrace",
    "@exp",
    "@exp2",
    "@export",
    "@fence",
    "@field",
    "@fieldParentPtr",
    "@floatCast",
    "@floatFromInt",
    "@floatToInt",
    "@floor",
    "@frame",
    "@frameAddress",
    "@frameSize",
    "@hasDecl",
    "@hasField",
    "@import",
    "@intCast",
    "@intFromBool",
    "@intFromEnum",
    "@intFromError",
    "@intFromFloat",
    "@intFromPtr",
    "@intToEnum",
    "@intToError",
    "@intToFloat",
    "@intToPtr",
    "@log",
    "@log10",
    "@log2",
    "@max",
    "@memcpy",
    "@memset",
    "@min",
    "@mod",
    "@mulAdd",
    "@mulWithOverflow",
    "@offsetOf",
    "@panic",
    "@popCount",
    "@prefetch",
    "@ptrCast",
    "@ptrFromInt",
    "@ptrToInt",
    "@reduce",
    "@rem",
    "@returnAddress",
    "@round",
    "@select",
    "@setAlignStack",
    "@setCold",
    "@setEvalBranchQuota",
    "@setFloatMode",
    "@setRuntimeSafety",
    "@shlExact",
    "@shlWithOverflow",
    "@shrExact",
    "@shuffle",
    "@sizeOf",
    "@splat",
    "@sqrt",
    "@src",
    "@subWithOverflow",
    "@tagName",
    "@This",
    "@trap",
    "@truncate",
    "@typeInfo",
    "@typeName",
    "@TypeOf",
    "@unionInit",
    "@Vector",
    "@volatileCast",
    "@wasmMemorySize",
    "@wasmMemoryGrow",
  ];

  const ZIG_BUILTINS_NAMES = ZIG_BUILTINS_RAW.map((b) => b.slice(1));

  // ── Builtin docs for hover/autocomplete ──

  const BUILTIN_DOCS = {
    "@import": {
      sig: "@import(comptime path: []const u8) type",
      doc: "Imports a Zig source file or package, returning the struct/namespace. If the argument is a string literal, it can also import C header files or packages.",
    },
    "@as": {
      sig: "@as(comptime T: type, value) T",
      doc: "Converts a value to a specific type. Performs the same coercions that are implicitly allowed, plus additional integer/float conversions.",
    },
    "@intCast": {
      sig: "@intCast(value: anytype) T",
      doc: "Converts an integer to a different integer type. Invokes safety-checked undefined behavior if the value is out of range.",
    },
    "@floatCast": {
      sig: "@floatCast(value: anytype) T",
      doc: "Converts a float to a smaller float type or from comptime_float.",
    },
    "@ptrCast": {
      sig: "@ptrCast(value: anytype) T",
      doc: "Converts a pointer type to a different pointer type.",
    },
    "@alignCast": {
      sig: "@alignCast(ptr: anytype) T",
      doc: "Changes the alignment of a pointer.",
    },
    "@enumFromInt": {
      sig: "@enumFromInt(value: anytype) T",
      doc: "Converts an integer to an enum value.",
    },
    "@intFromEnum": {
      sig: "@intFromEnum(value: anytype) T",
      doc: "Converts an enum value to its integer tag value.",
    },
    "@errorName": {
      sig: "@errorName(err: anyerror) [:0]const u8",
      doc: "Returns a string representation of the error value.",
    },
    "@tagName": {
      sig: "@tagName(value: anytype) [:0]const u8",
      doc: "Returns the name of an enum/union tag as a string.",
    },
    "@typeName": {
      sig: "@typeName(T: type) [:0]const u8",
      doc: "Returns the fully-qualified name of a type as a string.",
    },
    "@typeInfo": {
      sig: "@typeInfo(T: type) std.builtin.Type",
      doc: "Returns compile-time type information about a type.",
    },
    "@sizeOf": {
      sig: "@sizeOf(T: type) comptime_int",
      doc: "Returns the size of a type in bytes, including padding.",
    },
    "@alignOf": {
      sig: "@alignOf(T: type) comptime_int",
      doc: "Returns the alignment of a type in bytes.",
    },
    "@bitSizeOf": {
      sig: "@bitSizeOf(T: type) comptime_int",
      doc: "Returns the size in bits of a type.",
    },
    "@max": {
      sig: "@max(a: T, b: T) T",
      doc: "Returns the larger of two values.",
    },
    "@min": {
      sig: "@min(a: T, b: T) T",
      doc: "Returns the smaller of two values.",
    },
    "@clz": {
      sig: "@clz(value: T) Log2Int(T)",
      doc: "Counts the number of leading zero bits.",
    },
    "@ctz": {
      sig: "@ctz(value: T) Log2Int(T)",
      doc: "Counts the number of trailing zero bits.",
    },
    "@popCount": {
      sig: "@popCount(value: T) Log2Int(T)",
      doc: "Returns the number of 1-bits in the value.",
    },
    "@truncate": {
      sig: "@truncate(value: anytype) T",
      doc: "Truncates an integer to a smaller bit width.",
    },
    "@memcpy": {
      sig: "@memcpy(dest: []u8, src: []const u8) void",
      doc: "Copies bytes from source slice to destination slice.",
    },
    "@memset": {
      sig: "@memset(dest: []u8, value: u8) void",
      doc: "Sets all bytes in the slice to the given value.",
    },
    "@compileError": {
      sig: "@compileError(msg: []const u8) noreturn",
      doc: "Triggers a compile error with the given message.",
    },
    "@compileLog": {
      sig: "@compileLog(args: ...) void",
      doc: "Prints values at compile time for debugging.",
    },
    "@embedFile": {
      sig: "@embedFile(path: []const u8) *const [N]u8",
      doc: "Embeds a file as a compile-time constant byte array.",
    },
    "@cImport": {
      sig: "@cImport(expression) type",
      doc: "Imports C declarations from a C header file at compile time.",
    },
    "@cInclude": {
      sig: "@cInclude(path: []const u8) void",
      doc: "Used inside @cImport to include a C header.",
    },
    "@This": {
      sig: "@This() type",
      doc: "Returns the innermost struct/enum/union type that this function is declared in.",
    },
    "@src": {
      sig: "@src() std.builtin.SourceLocation",
      doc: "Returns the source location of the call site.",
    },
    "@hasField": {
      sig: "@hasField(T: type, name: []const u8) bool",
      doc: "Returns whether a struct or union has a specific field.",
    },
    "@hasDecl": {
      sig: "@hasDecl(T: type, name: []const u8) bool",
      doc: "Returns whether a type has a specific declaration.",
    },
    "@field": {
      sig: "@field(obj: anytype, name: []const u8) anytype",
      doc: "Accesses a field by a compile-time string name.",
    },
    "@call": {
      sig: "@call(options: CallOptions, func: anytype, args: anytype) anytype",
      doc: "Calls a function with the given arguments and call modifier options.",
    },
    "@panic": {
      sig: "@panic(msg: []const u8) noreturn",
      doc: "Invokes safety-checked undefined behavior. In safe modes, prints the message and stack trace then aborts.",
    },
    "@breakpoint": {
      sig: "@breakpoint() void",
      doc: "Emits a hardware debug breakpoint instruction.",
    },
    "@Vector": {
      sig: "@Vector(len: comptime_int, T: type) type",
      doc: "Returns a SIMD vector type of the given length and element type.",
    },
    "@sqrt": { sig: "@sqrt(value: T) T", doc: "Computes the square root." },
    "@ceil": {
      sig: "@ceil(value: T) T",
      doc: "Rounds up to the nearest integer towards positive infinity.",
    },
    "@floor": {
      sig: "@floor(value: T) T",
      doc: "Rounds down to the nearest integer towards negative infinity.",
    },
    "@round": {
      sig: "@round(value: T) T",
      doc: "Rounds to the nearest integer, ties go away from zero.",
    },
    "@cos": { sig: "@cos(value: T) T", doc: "Computes the cosine." },
    "@log": { sig: "@log(value: T) T", doc: "Computes the natural logarithm." },
    "@log2": {
      sig: "@log2(value: T) T",
      doc: "Computes the base-2 logarithm.",
    },
    "@log10": {
      sig: "@log10(value: T) T",
      doc: "Computes the base-10 logarithm.",
    },
    "@exp": {
      sig: "@exp(value: T) T",
      doc: "Computes e raised to the given power.",
    },
    "@exp2": {
      sig: "@exp2(value: T) T",
      doc: "Computes 2 raised to the given power.",
    },
    "@splat": {
      sig: "@splat(len: comptime_int, scalar: T) @Vector(len, T)",
      doc: "Creates a vector with all elements set to the given scalar value.",
    },
    "@reduce": {
      sig: "@reduce(op: ReduceOp, value: @Vector) T",
      doc: "Reduces a vector to a scalar using the given operator.",
    },
    "@shuffle": {
      sig: "@shuffle(T: type, a: @Vector, b: @Vector, mask: @Vector) @Vector",
      doc: "Produces a new vector by selecting elements from a and b based on the mask.",
    },
    "@select": {
      sig: "@select(T: type, pred: @Vector(bool), a: @Vector, b: @Vector) @Vector",
      doc: "Lane-wise select: picks elements from a or b based on the predicate.",
    },
    "@bitCast": {
      sig: "@bitCast(value: anytype) T",
      doc: "Reinterprets the bits of a value as a different type of the same bit width.",
    },
    "@ptrFromInt": {
      sig: "@ptrFromInt(addr: usize) *T",
      doc: "Converts an integer address to a pointer.",
    },
    "@intFromPtr": {
      sig: "@intFromPtr(ptr: anytype) usize",
      doc: "Converts a pointer to its integer address.",
    },
    "@intFromBool": {
      sig: "@intFromBool(value: bool) u1",
      doc: "Converts a bool to 0 or 1.",
    },
    "@intFromFloat": {
      sig: "@intFromFloat(value: anytype) T",
      doc: "Converts a float to an integer, truncating the fractional part.",
    },
    "@floatFromInt": {
      sig: "@floatFromInt(value: anytype) T",
      doc: "Converts an integer to a floating-point number.",
    },
    "@setRuntimeSafety": {
      sig: "@setRuntimeSafety(enabled: bool) void",
      doc: "Enables or disables runtime safety checks in the current scope.",
    },
    "@setEvalBranchQuota": {
      sig: "@setEvalBranchQuota(quota: u32) void",
      doc: "Sets the maximum number of backwards branches allowed during compile-time evaluation.",
    },
    "@addWithOverflow": {
      sig: "@addWithOverflow(a: T, b: T) struct { T, u1 }",
      doc: "Performs addition and returns a tuple of the result and an overflow bit.",
    },
    "@subWithOverflow": {
      sig: "@subWithOverflow(a: T, b: T) struct { T, u1 }",
      doc: "Performs subtraction and returns a tuple of the result and an overflow bit.",
    },
    "@mulWithOverflow": {
      sig: "@mulWithOverflow(a: T, b: T) struct { T, u1 }",
      doc: "Performs multiplication and returns a tuple of the result and an overflow bit.",
    },
    "@divExact": {
      sig: "@divExact(a: T, b: T) T",
      doc: "Performs exact division. Invokes UB if there is a remainder.",
    },
    "@divFloor": {
      sig: "@divFloor(a: T, b: T) T",
      doc: "Performs floored division (rounds towards negative infinity).",
    },
    "@divTrunc": {
      sig: "@divTrunc(a: T, b: T) T",
      doc: "Performs truncated division (rounds towards zero).",
    },
    "@rem": {
      sig: "@rem(a: T, b: T) T",
      doc: "Returns the remainder of division.",
    },
    "@mod": {
      sig: "@mod(a: T, b: T) T",
      doc: "Returns the modulus (always non-negative).",
    },
    "@mulAdd": {
      sig: "@mulAdd(T: type, a: T, b: T, c: T) T",
      doc: "Fused multiply-add: a * b + c with a single rounding step.",
    },
    "@byteSwap": {
      sig: "@byteSwap(value: T) T",
      doc: "Reverses the byte order of an integer.",
    },
    "@bitReverse": {
      sig: "@bitReverse(value: T) T",
      doc: "Reverses the bit order of an integer.",
    },
    "@shlExact": {
      sig: "@shlExact(value: T, shift: Log2Int(T)) T",
      doc: "Performs a left shift; UB if any 1-bits are shifted out.",
    },
    "@shrExact": {
      sig: "@shrExact(value: T, shift: Log2Int(T)) T",
      doc: "Performs a right shift; UB if any 1-bits are shifted out.",
    },
    "@offsetOf": {
      sig: "@offsetOf(T: type, field: []const u8) comptime_int",
      doc: "Returns the byte offset of a struct field.",
    },
    "@bitOffsetOf": {
      sig: "@bitOffsetOf(T: type, field: []const u8) comptime_int",
      doc: "Returns the bit offset of a struct field.",
    },
    "@fence": {
      sig: "@fence(order: AtomicOrder) void",
      doc: "Emits a memory fence at the given ordering.",
    },
    "@atomicLoad": {
      sig: "@atomicLoad(ptr: *const T, order: AtomicOrder) T",
      doc: "Performs an atomic load operation.",
    },
    "@atomicStore": {
      sig: "@atomicStore(ptr: *T, value: T, order: AtomicOrder) void",
      doc: "Performs an atomic store operation.",
    },
    "@atomicRmw": {
      sig: "@atomicRmw(ptr: *T, op: RmwOp, operand: T, order: AtomicOrder) T",
      doc: "Performs an atomic read-modify-write operation.",
    },
    "@cmpxchgStrong": {
      sig: "@cmpxchgStrong(ptr: *T, expected: T, desired: T, ...) ?T",
      doc: "Performs a strong compare-and-exchange.",
    },
    "@cmpxchgWeak": {
      sig: "@cmpxchgWeak(ptr: *T, expected: T, desired: T, ...) ?T",
      doc: "Performs a weak compare-and-exchange (may fail spuriously).",
    },
    "@prefetch": {
      sig: "@prefetch(ptr: anytype, options: PrefetchOptions) void",
      doc: "Hints the processor to prefetch the given memory location into cache.",
    },
    "@fieldParentPtr": {
      sig: "@fieldParentPtr(T: type, field: []const u8, field_ptr: *FieldType) *T",
      doc: "Given a pointer to a struct field, returns a pointer to the parent struct.",
    },
    "@unionInit": {
      sig: "@unionInit(T: type, field: []const u8, value: anytype) T",
      doc: "Initializes a union by field name at compile time.",
    },
    "@returnAddress": {
      sig: "@returnAddress() usize",
      doc: "Returns the return address of the current function.",
    },
    "@frameAddress": {
      sig: "@frameAddress() usize",
      doc: "Returns the frame pointer of the current function.",
    },
    "@trap": {
      sig: "@trap() noreturn",
      doc: "Triggers an abnormal program termination (trap instruction).",
    },
    "@export": {
      sig: "@export(declaration, options: ExportOptions) void",
      doc: "Exports a declaration to be visible to the linker / dynamic loader.",
    },
    "@errorCast": {
      sig: "@errorCast(value: anytype) T",
      doc: "Casts an error union or error set to a different one.",
    },
    "@errorFromInt": {
      sig: "@errorFromInt(value: anytype) anyerror",
      doc: "Converts an integer to an error value.",
    },
    "@intFromError": {
      sig: "@intFromError(value: anyerror) u16",
      doc: "Converts an error value to its integer representation.",
    },
    "@errorReturnTrace": {
      sig: "@errorReturnTrace() ?*StackTrace",
      doc: "Returns the current error return trace, if available.",
    },
    "@volatileCast": {
      sig: "@volatileCast(ptr: anytype) T",
      doc: "Casts a pointer to/from volatile.",
    },
    "@frame": {
      sig: "@frame() anyframe",
      doc: "Returns a pointer to the current async frame.",
    },
    "@frameSize": {
      sig: "@frameSize(func: anytype) usize",
      doc: "Returns the size of the async frame for a given function.",
    },
    "@setAlignStack": {
      sig: "@setAlignStack(alignment: u29) void",
      doc: "Sets the alignment of the current function's stack frame.",
    },
    "@setCold": {
      sig: "@setCold(is_cold: bool) void",
      doc: "Marks the current function as cold (unlikely to be called).",
    },
    "@setFloatMode": {
      sig: "@setFloatMode(mode: FloatMode) void",
      doc: "Sets the floating-point mode for the current scope (e.g., optimized or strict).",
    },
    "@shlWithOverflow": {
      sig: "@shlWithOverflow(a: T, b: ShiftInt) struct { T, u1 }",
      doc: "Performs shift-left and returns the result and an overflow bit.",
    },
    "@wasmMemorySize": {
      sig: "@wasmMemorySize() usize",
      doc: "Returns the current WebAssembly linear memory size in pages.",
    },
    "@wasmMemoryGrow": {
      sig: "@wasmMemoryGrow(delta: usize) isize",
      doc: "Grows the WebAssembly linear memory by delta pages.",
    },
  };

  const KEYWORD_DOCS = {
    const: {
      sig: "const name: type = value;",
      doc: "Declares a compile-time or runtime immutable binding.",
    },
    var: {
      sig: "var name: type = value;",
      doc: "Declares a mutable variable binding.",
    },
    fn: {
      sig: "fn name(params) ReturnType { body }",
      doc: "Declares a function. Functions in Zig are first-class values.",
    },
    pub: {
      sig: "pub",
      doc: "Makes a declaration visible outside the current scope/file.",
    },
    return: {
      sig: "return value;",
      doc: "Returns a value from the current function.",
    },
    if: {
      sig: "if (condition) |capture| { } else { }",
      doc: "Conditional branching. Can capture optional/error union payloads.",
    },
    else: {
      sig: "else |capture| { }",
      doc: "The alternative branch of an if, while, or for expression.",
    },
    while: {
      sig: "while (condition) : (continue_expr) { }",
      doc: "Loop that executes while the condition is true. Supports optional/error capture and continue expressions.",
    },
    for: {
      sig: "for (slice) |item, index| { }",
      doc: "Iterates over slices, arrays, or ranges. Can iterate multiple sequences in lockstep.",
    },
    switch: {
      sig: "switch (value) { pattern => result, }",
      doc: "Exhaustive multi-way branching construct. Must handle all possible values.",
    },
    break: {
      sig: "break :label value;",
      doc: "Exits the innermost loop or labeled block, optionally returning a value.",
    },
    continue: {
      sig: "continue :label;",
      doc: "Skips to the next iteration of a loop.",
    },
    defer: {
      sig: "defer expression;",
      doc: "Schedules an expression to be executed when the current scope exits.",
    },
    errdefer: {
      sig: "errdefer |err| expression;",
      doc: "Like defer, but only runs when the scope exits with an error. Can capture the error.",
    },
    try: {
      sig: "try expression",
      doc: "Unwraps an error union; if it is an error, returns the error from the current function.",
    },
    catch: {
      sig: "expr catch |err| fallback",
      doc: "Unwraps an error union; if it is an error, evaluates the fallback expression.",
    },
    orelse: {
      sig: "optional orelse fallback",
      doc: "Unwraps an optional; if it is null, evaluates the fallback expression.",
    },
    comptime: {
      sig: "comptime { }",
      doc: "Forces compile-time evaluation of an expression or block.",
    },
    struct: {
      sig: "const T = struct { fields; };",
      doc: "Defines a struct type with named fields and optional methods.",
    },
    enum: {
      sig: "const E = enum { A, B, C };",
      doc: "Defines an enumeration type.",
    },
    union: {
      sig: "const U = union(enum) { A: T1, B: T2 };",
      doc: "Defines a tagged or untagged union type.",
    },
    error: {
      sig: "const E = error { A, B };",
      doc: "Defines an error set type.",
    },
    test: {
      sig: 'test "name" { }',
      doc: "Declares a unit test block. Run with `zig test`.",
    },
    unreachable: {
      sig: "unreachable",
      doc: "Marks code that should never be reached. Triggers safety-checked UB.",
    },
    inline: {
      sig: "inline",
      doc: "Forces inlining of a function or loop iteration.",
    },
    extern: {
      sig: "extern",
      doc: "Declares an external (C ABI) function or variable.",
    },
    export: {
      sig: "export",
      doc: "Exports a declaration from the current compilation unit.",
    },
    packed: {
      sig: "packed struct { }",
      doc: "Defines a struct with guaranteed memory layout with no padding.",
    },
    async: {
      sig: "async",
      doc: "Starts an async function call, returning a frame pointer.",
    },
    await: {
      sig: "await frame",
      doc: "Suspends until an async call completes and returns its result.",
    },
    suspend: {
      sig: "suspend { }",
      doc: "Suspends execution of the current async function.",
    },
    resume: { sig: "resume frame", doc: "Resumes a suspended async frame." },
    nosuspend: {
      sig: "nosuspend expr",
      doc: "Asserts that an expression will not suspend.",
    },
    threadlocal: {
      sig: "threadlocal",
      doc: "Marks a variable as thread-local storage.",
    },
    align: {
      sig: "align(n)",
      doc: "Specifies the alignment of a pointer or variable.",
    },
    allowzero: {
      sig: "allowzero",
      doc: "Allows a pointer to have address zero.",
    },
    volatile: {
      sig: "volatile",
      doc: "Marks a pointer dereference as volatile (prevents optimization).",
    },
    noalias: {
      sig: "noalias",
      doc: "Declares that a pointer does not alias any other pointer in the parameter list.",
    },
    opaque: {
      sig: "opaque {}",
      doc: "Defines an opaque type whose size and layout are hidden.",
    },
    and: { sig: "a and b", doc: "Boolean AND operator (short-circuit)." },
    or: { sig: "a or b", doc: "Boolean OR operator (short-circuit)." },
    asm: { sig: 'asm volatile ("...")', doc: "Inline assembly expression." },
    linksection: {
      sig: 'linksection(".section")',
      doc: "Places a function or variable in a specific linker section.",
    },
    callconv: {
      sig: "callconv(.C)",
      doc: "Specifies the calling convention for a function.",
    },
    anytype: {
      sig: "anytype",
      doc: "A generic parameter type – the function becomes generic over this parameter.",
    },
    anyframe: {
      sig: "anyframe",
      doc: "Type-erased pointer to an async frame.",
    },
  };

  const STD_MEMBERS = {
    std: {
      debug: {
        doc: "Debugging utilities (print, assert, etc.)",
        members: ["print", "assert", "panic", "dumpStackTrace"],
      },
      fmt: {
        doc: "String formatting and parsing.",
        members: [
          "allocPrint",
          "comptimePrint",
          "format",
          "parseInt",
          "parseFloat",
          "bufPrint",
        ],
      },
      mem: {
        doc: "Memory manipulation utilities.",
        members: [
          "eql",
          "indexOf",
          "copy",
          "set",
          "zeroes",
          "Allocator",
          "page_allocator",
          "split",
          "trim",
          "startsWith",
          "endsWith",
          "replacementSort",
        ],
      },
      heap: {
        doc: "Heap allocator implementations.",
        members: [
          "page_allocator",
          "GeneralPurposeAllocator",
          "ArenaAllocator",
          "FixedBufferAllocator",
          "c_allocator",
        ],
      },
      fs: {
        doc: "Filesystem access.",
        members: [
          "cwd",
          "openFileAbsolute",
          "Dir",
          "File",
          "path",
          "createFileAbsolute",
          "openDirAbsolute",
        ],
      },
      io: {
        doc: "I/O interfaces and buffering.",
        members: [
          "getStdIn",
          "getStdOut",
          "getStdErr",
          "BufferedReader",
          "BufferedWriter",
          "Reader",
          "Writer",
        ],
      },
      os: {
        doc: "OS-specific APIs.",
        members: [
          "linux",
          "windows",
          "argv",
          "environ",
          "exit",
          "getenv",
          "sleep",
        ],
      },
      math: {
        doc: "Mathematical functions and constants.",
        members: [
          "add",
          "sub",
          "mul",
          "divExact",
          "max",
          "min",
          "pow",
          "sqrt",
          "log",
          "pi",
          "e",
          "inf",
          "nan",
          "clamp",
          "absInt",
          "absCast",
        ],
      },
      json: {
        doc: "JSON parsing and serialization.",
        members: [
          "parseFromSlice",
          "parseFromTokenSource",
          "stringify",
          "Value",
          "ObjectMap",
          "Array",
        ],
      },
      ArrayList: {
        doc: "A contiguous, growable list backed by an allocator.",
        members: [
          "init",
          "deinit",
          "append",
          "appendSlice",
          "items",
          "pop",
          "resize",
          "clearRetainingCapacity",
          "toOwnedSlice",
        ],
      },
      HashMap: {
        doc: "A hash map implementation.",
        members: [
          "init",
          "deinit",
          "put",
          "get",
          "remove",
          "contains",
          "count",
          "iterator",
        ],
      },
      StringHashMap: {
        doc: "A hash map with string keys.",
        members: ["init", "deinit", "put", "get", "remove", "contains"],
      },
      AutoHashMap: {
        doc: "A hash map with automatic context.",
        members: ["init", "deinit", "put", "get", "remove"],
      },
      testing: {
        doc: "Unit testing utilities.",
        members: [
          "expect",
          "expectEqual",
          "expectEqualStrings",
          "expectError",
          "allocator",
          "expectFmt",
          "expectApproxEqAbs",
          "expectApproxEqRel",
        ],
      },
      log: {
        doc: "Logging facility.",
        members: ["info", "warn", "err", "debug", "scoped"],
      },
      Thread: {
        doc: "Thread management.",
        members: ["spawn", "join", "getCurrentId", "Mutex", "ResetEvent"],
      },
      process: {
        doc: "Process management.",
        members: ["Child", "execve", "exit", "getEnvMap", "args"],
      },
      sort: {
        doc: "Sorting algorithms.",
        members: ["sort", "insertionSort", "asc", "desc"],
      },
      unicode: {
        doc: "Unicode utilities.",
        members: [
          "utf8Decode",
          "utf8Encode",
          "utf8ByteSequenceLength",
          "utf16leToUtf8",
        ],
      },
      crypto: {
        doc: "Cryptographic algorithms.",
        members: ["hash", "random", "aead", "sign"],
      },
      time: {
        doc: "Time and timer utilities.",
        members: [
          "milliTimestamp",
          "nanoTimestamp",
          "Timer",
          "sleep",
          "Instant",
        ],
      },
      net: {
        doc: "Networking APIs.",
        members: ["StreamServer", "Address", "tcpConnectToHost"],
      },
      meta: {
        doc: "Compile-time type reflection utilities.",
        members: [
          "trait",
          "eql",
          "fieldNames",
          "fields",
          "declarations",
          "Child",
        ],
      },
      builtin: {
        doc: "Compiler built-in information.",
        members: ["os", "cpu", "zig_version", "is_test", "mode", "output_mode"],
      },
    },
  };

  // ── Code Snippets ──

  const SNIPPETS = [
    {
      label: "fn",
      detail: "Function definition",
      insert: "fn ${1:name}(${2:params}) ${3:ReturnType} {\n\t${0}\n}",
    },
    {
      label: "pub fn",
      detail: "Public function",
      insert: "pub fn ${1:name}(${2:params}) ${3:ReturnType} {\n\t${0}\n}",
    },
    {
      label: "test",
      detail: "Test block",
      insert: 'test "${1:description}" {\n\t${0}\n}',
    },
    {
      label: "struct",
      detail: "Struct definition",
      insert:
        "const ${1:Name} = struct {\n\t${2:field}: ${3:type},\n\n\t${0}\n};",
    },
    {
      label: "enum",
      detail: "Enum definition",
      insert: "const ${1:Name} = enum {\n\t${2:variant},\n\t${0}\n};",
    },
    {
      label: "union",
      detail: "Tagged union",
      insert:
        "const ${1:Name} = union(enum) {\n\t${2:variant}: ${3:type},\n\t${0}\n};",
    },
    {
      label: "if",
      detail: "If statement",
      insert: "if (${1:condition}) {\n\t${0}\n}",
    },
    {
      label: "if-else",
      detail: "If-else statement",
      insert: "if (${1:condition}) {\n\t${2}\n} else {\n\t${0}\n}",
    },
    {
      label: "while",
      detail: "While loop",
      insert: "while (${1:condition}) {\n\t${0}\n}",
    },
    {
      label: "for",
      detail: "For loop",
      insert: "for (${1:items}) |${2:item}| {\n\t${0}\n}",
    },
    {
      label: "switch",
      detail: "Switch expression",
      insert:
        "switch (${1:value}) {\n\t${2:pattern} => ${3:result},\n\telse => ${0},\n}",
    },
    {
      label: "errdefer",
      detail: "Error defer",
      insert: "errdefer |${1:err}| {\n\t${0}\n};",
    },
    { label: "defer", detail: "Defer statement", insert: "defer ${0};" },
    {
      label: "const",
      detail: "Constant declaration",
      insert: "const ${1:name} = ${0};",
    },
    {
      label: "var",
      detail: "Variable declaration",
      insert: "var ${1:name}: ${2:type} = ${0};",
    },
    {
      label: "print",
      detail: "std.debug.print",
      insert: 'std.debug.print("${1:fmt}\\n", .{${0}});',
    },
    {
      label: "import",
      detail: "@import statement",
      insert: 'const ${1:name} = @import("${2:module}");',
    },
    {
      label: "std-import",
      detail: "Import std",
      insert: 'const std = @import("std");',
    },
    {
      label: "main",
      detail: "Main function",
      insert: "pub fn main() !void {\n\t${0}\n}",
    },
    {
      label: "main-args",
      detail: "Main with allocator",
      insert:
        "pub fn main() !void {\n\tvar gpa = std.heap.GeneralPurposeAllocator(.{}){};\n\tdefer _ = gpa.deinit();\n\tconst allocator = gpa.allocator();\n\t_ = allocator;\n\t${0}\n}",
    },
    {
      label: "arraylist",
      detail: "ArrayList init",
      insert:
        "var ${1:list} = std.ArrayList(${2:u8}).init(${3:allocator});\ndefer ${1:list}.deinit();\n${0}",
    },
    {
      label: "hashmap",
      detail: "HashMap init",
      insert:
        "var ${1:map} = std.AutoHashMap(${2:KeyType}, ${3:ValueType}).init(${4:allocator});\ndefer ${1:map}.deinit();\n${0}",
    },
    {
      label: "error-set",
      detail: "Error set definition",
      insert:
        "const ${1:Name}Error = error {\n\t${2:ErrorVariant},\n\t${0}\n};",
    },
    {
      label: "catch",
      detail: "Catch expression",
      insert: "catch |${1:err}| {\n\t${0}\n}",
    },
    {
      label: "orelse",
      detail: "Orelse expression",
      insert: "orelse ${0:unreachable}",
    },
    { label: "try", detail: "Try expression", insert: "try ${0}" },
    {
      label: "comptime",
      detail: "Comptime block",
      insert: "comptime {\n\t${0}\n}",
    },
    {
      label: "extern-fn",
      detail: "Extern function declaration",
      insert: "extern fn ${1:name}(${2:params}) ${3:ReturnType};",
    },
    {
      label: "packed-struct",
      detail: "Packed struct",
      insert:
        "const ${1:Name} = packed struct {\n\t${2:field}: ${3:type},\n\t${0}\n};",
    },
    {
      label: "inline-for",
      detail: "Inline for loop",
      insert: "inline for (${1:items}) |${2:item}| {\n\t${0}\n}",
    },
    {
      label: "allocPrint",
      detail: "std.fmt.allocPrint",
      insert:
        'const ${1:str} = try std.fmt.allocPrint(${2:allocator}, "${3:fmt}", .{${0}});\ndefer ${2:allocator}.free(${1:str});',
    },
  ];

  // 1) Register Language
  monaco.languages.register({
    id: ZIG_LANG_ID,
    extensions: [".zig"],
    aliases: ["Zig", "zig"],
    mimetypes: ["text/x-zig"],
  });

  // 2) Monarch Tokenizer
  monaco.languages.setMonarchTokensProvider(ZIG_LANG_ID, {
    keywords: ZIG_KEYWORDS,
    typeKeywords: ZIG_TYPES,
    constants: ZIG_CONSTANTS,
    operators: [
      "+",
      "-",
      "*",
      "/",
      "%",
      "=",
      "!",
      "<",
      ">",
      "&",
      "|",
      "^",
      "~",
      "++",
      "--",
      "**",
      "<<",
      ">>",
      "+=",
      "-=",
      "*=",
      "/=",
      "%=",
      "==",
      "!=",
      "<=",
      ">=",
      "&&",
      "||",
      ".",
      "..",
      ".*",
      ".?",
      "=>",
      "|=",
      "&=",
      "^=",
      "<<=",
      ">>=",
      "++=",
    ],
    symbols: /[=><!~?:&|+\-*\/\^%]+/,
    escapes: /\\(?:[abefnrt\\'"]|x[0-9A-Fa-f]{2}|u\{[0-9A-Fa-f]+\})/,

    tokenizer: {
      root: [
        // Doc comments
        [/\/\/\/.*$/, "comment.doc"],
        // Line comments
        [/\/\/.*$/, "comment"],

        // Builtin functions
        [/@[a-zA-Z_]\w*/, "keyword.builtin"],

        // Identifiers / keywords
        [
          /[a-z_]\w*/,
          {
            cases: {
              "@keywords": "keyword",
              "@typeKeywords": "type",
              "@constants": "constant",
              "@default": "identifier",
            },
          },
        ],
        [/[A-Z]\w*/, "type.identifier"],

        // Whitespace
        { include: "@whitespace" },

        // Strings
        [/"/, "string", "@string_double"],

        // Multi-line string literals (\\)
        [/\\\\.*$/, "string.multiline"],

        // Char literals
        [/'[^\\']'/, "string.char"],
        [/'(\\.)+'/, "string.char"],

        // Numbers
        [/0[xX][0-9a-fA-F][0-9a-fA-F_]*/, "number.hex"],
        [/0[oO][0-7][0-7_]*/, "number.octal"],
        [/0[bB][01][01_]*/, "number.binary"],
        [/[0-9][0-9_]*(\.[0-9][0-9_]*)?([eE][\-+]?[0-9_]+)?/, "number"],

        // Brackets
        [/[{}()\[\]]/, "@brackets"],

        // Operators & symbols
        [
          /@symbols/,
          {
            cases: {
              "@operators": "operator",
              "@default": "",
            },
          },
        ],

        // Comma / semicolons
        [/[;,]/, "delimiter"],
      ],

      whitespace: [[/[ \t\r\n]+/, "white"]],

      string_double: [
        [/[^\\"]+/, "string"],
        [/@escapes/, "string.escape"],
        [/\\./, "string.escape.invalid"],
        [/"/, "string", "@pop"],
      ],
    },
  });

  // 3) Language Configuration (brackets, comments, auto-closing)
  monaco.languages.setLanguageConfiguration(ZIG_LANG_ID, {
    comments: { lineComment: "//" },
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
      { open: "'", close: "'", notIn: ["string", "comment"] },
    ],
    surroundingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: '"', close: '"' },
      { open: "'", close: "'" },
    ],
    indentationRules: {
      increaseIndentPattern: /^.*\{[^}"']*$|^.*\([^)"']*$/,
      decreaseIndentPattern: /^\s*[}\)]/,
    },
    folding: {
      markers: {
        start: /^\s*\/\/\s*#region\b/,
        end: /^\s*\/\/\s*#endregion\b/,
      },
    },
    wordPattern:
      /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
    onEnterRules: [
      {
        beforeText: /^\s*\/\/\/.*$/,
        action: {
          indentAction: monaco.languages.IndentAction.None,
          appendText: "/// ",
        },
      },
      {
        beforeText: /^.*\{[^}"']*$/,
        afterText: /^\s*\}/,
        action: { indentAction: monaco.languages.IndentAction.IndentOutdent },
      },
      {
        beforeText: /^.*\{[^}"']*$/,
        action: { indentAction: monaco.languages.IndentAction.Indent },
      },
    ],
  });

  // ── Helpers: simple symbol indexing in current model ──

  function indexSymbols(model) {
    const text = model.getValue();
    const lines = text.split("\n");
    const symbols = [];
    const fnRegex = /(?:pub\s+)?fn\s+(\w+)\s*\(/;
    const constRegex = /(?:pub\s+)?const\s+(\w+)\s*(?::\s*type\s*)?=/;
    const varRegex = /(?:pub\s+)?var\s+(\w+)/;
    const testRegex = /test\s+"([^"]+)"/;
    const structFnRegex = /const\s+(\w+)\s*=\s*struct\s*\{/;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      let m;
      if ((m = fnRegex.exec(line))) {
        const paramPart = line.slice(line.indexOf("("));
        const closeParen = paramPart.indexOf(")");
        const params = closeParen >= 0 ? paramPart.slice(1, closeParen) : "";
        const afterParen =
          closeParen >= 0 ? paramPart.slice(closeParen + 1).trim() : "";
        const retMatch = afterParen.match(/^([^\s{]+)/);
        const retType = retMatch ? retMatch[1] : "void";
        symbols.push({
          name: m[1],
          kind: "function",
          line: i + 1,
          col: m.index + (m[0].indexOf(m[1]) - m.index) + 1,
          detail: `fn ${m[1]}(${params.trim()}) ${retType}`,
          doc: extractDocComment(lines, i),
        });
      }
      if ((m = constRegex.exec(line))) {
        const isType =
          /:\s*type\s*=/.test(line) ||
          /=\s*(struct|enum|union|error)\s*[\({]/.test(line);
        symbols.push({
          name: m[1],
          kind: isType ? "type" : "constant",
          line: i + 1,
          col: line.indexOf(m[1]) + 1,
          detail: line.trim(),
          doc: extractDocComment(lines, i),
        });
      } else if ((m = varRegex.exec(line)) && !constRegex.test(line)) {
        symbols.push({
          name: m[1],
          kind: "variable",
          line: i + 1,
          col: line.indexOf(m[1]) + 1,
          detail: line.trim(),
          doc: extractDocComment(lines, i),
        });
      }
      if ((m = testRegex.exec(line))) {
        symbols.push({
          name: `test "${m[1]}"`,
          kind: "test",
          line: i + 1,
          col: 1,
          detail: `test "${m[1]}"`,
          doc: extractDocComment(lines, i),
        });
      }
    }
    return symbols;
  }

  function extractDocComment(lines, lineIndex) {
    const docs = [];
    let i = lineIndex - 1;
    while (i >= 0) {
      const trimmed = lines[i].trim();
      if (trimmed.startsWith("///")) {
        docs.unshift(trimmed.slice(3).trim());
        i--;
      } else {
        break;
      }
    }
    return docs.length > 0 ? docs.join("\n") : "";
  }

  // 4) Completion Provider
  monaco.languages.registerCompletionItemProvider(ZIG_LANG_ID, {
    triggerCharacters: [".", "@"],
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
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };

      const suggestions = [];

      // Builtin functions triggered by @
      if (textUntilPosition.match(/@\w*$/)) {
        const atRange = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: position.column - word.word.length - 1,
          endColumn: position.column,
        };
        ZIG_BUILTINS_RAW.forEach((b) => {
          const name = b.slice(1);
          const info = BUILTIN_DOCS[b] || {};
          suggestions.push({
            label: b,
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: b + "(${1})",
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: info.sig || b,
            documentation: { value: info.doc || `Built-in function ${b}` },
            range: atRange,
            sortText: "0" + name,
          });
        });
        return { suggestions };
      }

      // std.xxx member access
      const stdMatch = textUntilPosition.match(/\bstd\.(\w*)$/);
      if (stdMatch) {
        const dotRange = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: position.column - (stdMatch[1] || "").length,
          endColumn: position.column,
        };
        Object.keys(STD_MEMBERS.std).forEach((member) => {
          const info = STD_MEMBERS.std[member];
          suggestions.push({
            label: member,
            kind: monaco.languages.CompletionItemKind.Module,
            insertText: member,
            detail: `std.${member}`,
            documentation: { value: info.doc || "" },
            range: dotRange,
          });
        });
        return { suggestions };
      }

      // std.xxx.yyy member access
      const stdDeepMatch = textUntilPosition.match(/\bstd\.(\w+)\.(\w*)$/);
      if (stdDeepMatch) {
        const mod = stdDeepMatch[1];
        const dotRange = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: position.column - (stdDeepMatch[2] || "").length,
          endColumn: position.column,
        };
        if (STD_MEMBERS.std[mod] && STD_MEMBERS.std[mod].members) {
          STD_MEMBERS.std[mod].members.forEach((m) => {
            suggestions.push({
              label: m,
              kind: monaco.languages.CompletionItemKind.Property,
              insertText: m,
              detail: `std.${mod}.${m}`,
              range: dotRange,
            });
          });
        }
        return { suggestions };
      }

      // Snippets
      SNIPPETS.forEach((s) => {
        suggestions.push({
          label: s.label,
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: s.insert,
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          detail: s.detail + " (snippet)",
          documentation: {
            value:
              "```zig\n" +
              s.insert
                .replace(/\$\{\d+:?([^}]*)\}/g, "$1")
                .replace(/\$\d+/g, "") +
              "\n```",
          },
          range: range,
          sortText: "2" + s.label,
        });
      });

      // Keywords
      ZIG_KEYWORDS.forEach((kw) => {
        const info = KEYWORD_DOCS[kw];
        suggestions.push({
          label: kw,
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: kw,
          detail: info ? info.sig : kw,
          documentation: info ? { value: info.doc } : undefined,
          range: range,
          sortText: "3" + kw,
        });
      });

      // Types
      ZIG_TYPES.forEach((t) => {
        suggestions.push({
          label: t,
          kind: monaco.languages.CompletionItemKind.TypeParameter,
          insertText: t,
          detail: `type ${t}`,
          documentation: { value: `Built-in type \`${t}\`` },
          range: range,
          sortText: "4" + t,
        });
      });

      // Constants
      ZIG_CONSTANTS.forEach((c) => {
        suggestions.push({
          label: c,
          kind: monaco.languages.CompletionItemKind.Constant,
          insertText: c,
          range: range,
          sortText: "5" + c,
        });
      });

      // Local symbols
      const symbols = indexSymbols(model);
      symbols.forEach((sym) => {
        let kind;
        switch (sym.kind) {
          case "function":
            kind = monaco.languages.CompletionItemKind.Function;
            break;
          case "type":
            kind = monaco.languages.CompletionItemKind.Class;
            break;
          case "constant":
            kind = monaco.languages.CompletionItemKind.Constant;
            break;
          case "variable":
            kind = monaco.languages.CompletionItemKind.Variable;
            break;
          default:
            kind = monaco.languages.CompletionItemKind.Text;
        }
        suggestions.push({
          label: sym.name,
          kind: kind,
          insertText: sym.kind === "function" ? sym.name + "(${1})" : sym.name,
          insertTextRules:
            sym.kind === "function"
              ? monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
              : undefined,
          detail: sym.detail,
          documentation: sym.doc ? { value: sym.doc } : undefined,
          range: range,
          sortText: "1" + sym.name,
        });
      });

      return { suggestions };
    },
  });

  // 5) Hover Provider
  monaco.languages.registerHoverProvider(ZIG_LANG_ID, {
    provideHover: function (model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return null;
      const token = word.word;
      const lineContent = model.getLineContent(position.lineNumber);

      // Check if it's a @builtin
      const charBefore =
        position.column - 2 >= 0
          ? lineContent[position.column - word.word.length - 1]
          : "";
      if (charBefore === "@") {
        const builtin = "@" + token;
        const info = BUILTIN_DOCS[builtin];
        if (info) {
          return {
            range: new monaco.Range(
              position.lineNumber,
              word.startColumn - 1,
              position.lineNumber,
              word.endColumn,
            ),
            contents: [
              { value: "```zig\n" + info.sig + "\n```" },
              { value: info.doc },
            ],
          };
        }
      }

      // Check keyword docs
      if (KEYWORD_DOCS[token]) {
        const info = KEYWORD_DOCS[token];
        return {
          range: new monaco.Range(
            position.lineNumber,
            word.startColumn,
            position.lineNumber,
            word.endColumn,
          ),
          contents: [
            { value: "```zig\n" + info.sig + "\n```" },
            { value: info.doc },
          ],
        };
      }

      // Check types
      if (ZIG_TYPES.includes(token)) {
        return {
          range: new monaco.Range(
            position.lineNumber,
            word.startColumn,
            position.lineNumber,
            word.endColumn,
          ),
          contents: [
            { value: "```zig\n(type) " + token + "\n```" },
            { value: `Built-in type \`${token}\`` },
          ],
        };
      }

      // Check std module
      if (token === "std") {
        return {
          range: new monaco.Range(
            position.lineNumber,
            word.startColumn,
            position.lineNumber,
            word.endColumn,
          ),
          contents: [
            { value: '```zig\nconst std = @import("std")\n```' },
            {
              value:
                "The Zig Standard Library provides common data structures, algorithms, and OS abstractions.",
            },
          ],
        };
      }

      // Check std sub-modules
      const stdPrefixMatch = lineContent
        .substring(0, word.endColumn - 1)
        .match(/\bstd\.(\w+)$/);
      if (stdPrefixMatch && STD_MEMBERS.std[token]) {
        const info = STD_MEMBERS.std[token];
        return {
          range: new monaco.Range(
            position.lineNumber,
            word.startColumn,
            position.lineNumber,
            word.endColumn,
          ),
          contents: [
            { value: "```zig\nstd." + token + "\n```" },
            {
              value:
                info.doc +
                (info.members
                  ? "\n\nMembers: `" + info.members.join("`, `") + "`"
                  : ""),
            },
          ],
        };
      }

      // Check local symbols
      const symbols = indexSymbols(model);
      const sym = symbols.find((s) => s.name === token);
      if (sym) {
        const contents = [{ value: "```zig\n" + sym.detail + "\n```" }];
        if (sym.doc) contents.push({ value: sym.doc });
        return {
          range: new monaco.Range(
            position.lineNumber,
            word.startColumn,
            position.lineNumber,
            word.endColumn,
          ),
          contents,
        };
      }

      return null;
    },
  });

  // 6) Definition Provider (go to definition within file)
  monaco.languages.registerDefinitionProvider(ZIG_LANG_ID, {
    provideDefinition: function (model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return null;
      const token = word.word;

      const symbols = indexSymbols(model);
      const sym = symbols.find((s) => s.name === token);
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

  // 7) Signature Help Provider
  monaco.languages.registerSignatureHelpProvider(ZIG_LANG_ID, {
    signatureHelpTriggerCharacters: ["(", ","],
    provideSignatureHelp: function (model, position) {
      const textUntilPosition = model.getValueInRange({
        startLineNumber: 1,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });

      // Find the most recent unclosed function call
      let depth = 0;
      let funcEnd = -1;
      let paramIndex = 0;
      for (let i = textUntilPosition.length - 1; i >= 0; i--) {
        const c = textUntilPosition[i];
        if (c === ")") depth++;
        else if (c === "(") {
          if (depth === 0) {
            funcEnd = i;
            break;
          }
          depth--;
        } else if (c === "," && depth === 0) {
          paramIndex++;
        }
      }

      if (funcEnd < 0) return null;

      // Extract function name
      const before = textUntilPosition.substring(0, funcEnd);
      const funcMatch = before.match(/@?(\w+)\s*$/);
      if (!funcMatch) return null;

      const funcName = funcMatch[0].trim();

      // Check builtins
      if (funcName.startsWith("@")) {
        const info = BUILTIN_DOCS[funcName];
        if (info) {
          return {
            value: {
              signatures: [
                {
                  label: info.sig,
                  documentation: { value: info.doc },
                  parameters:
                    info.sig
                      .match(/\(([^)]*)\)/)?.[1]
                      ?.split(",")
                      .map((p) => ({
                        label: p.trim(),
                      })) || [],
                },
              ],
              activeSignature: 0,
              activeParameter: paramIndex,
            },
            dispose: () => {},
          };
        }
      }

      // Check local functions
      const symbols = indexSymbols(model);
      const sym = symbols.find(
        (s) => s.name === funcName && s.kind === "function",
      );
      if (sym) {
        const paramsMatch = sym.detail.match(/\(([^)]*)\)/);
        const params = paramsMatch
          ? paramsMatch[1].split(",").map((p) => ({ label: p.trim() }))
          : [];
        return {
          value: {
            signatures: [
              {
                label: sym.detail,
                documentation: sym.doc ? { value: sym.doc } : undefined,
                parameters: params,
              },
            ],
            activeSignature: 0,
            activeParameter: paramIndex,
          },
          dispose: () => {},
        };
      }

      return null;
    },
  });

  // 8) Document Symbol Provider (outline)
  monaco.languages.registerDocumentSymbolProvider(ZIG_LANG_ID, {
    provideDocumentSymbols: function (model) {
      const symbols = indexSymbols(model);
      return symbols.map((sym) => {
        let kind;
        switch (sym.kind) {
          case "function":
            kind = monaco.languages.SymbolKind.Function;
            break;
          case "type":
            kind = monaco.languages.SymbolKind.Class;
            break;
          case "constant":
            kind = monaco.languages.SymbolKind.Constant;
            break;
          case "variable":
            kind = monaco.languages.SymbolKind.Variable;
            break;
          case "test":
            kind = monaco.languages.SymbolKind.Method;
            break;
          default:
            kind = monaco.languages.SymbolKind.Variable;
        }
        return {
          name: sym.name,
          kind: kind,
          range: new monaco.Range(
            sym.line,
            1,
            sym.line,
            model.getLineLength(sym.line) + 1,
          ),
          selectionRange: new monaco.Range(
            sym.line,
            sym.col,
            sym.line,
            sym.col + sym.name.length,
          ),
          detail: sym.detail,
        };
      });
    },
  });

  // 9) Document Formatting Provider
  monaco.languages.registerDocumentFormattingEditProvider(ZIG_LANG_ID, {
    provideDocumentFormattingEdits: function (model) {
      const lines = model.getValue().split("\n");
      let indent = 0;
      const formatted = [];
      const INDENT = "    ";

      for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        if (line === "") {
          formatted.push("");
          continue;
        }

        // Decrease indent for closing braces/parens first
        const closers = (line.match(/^[\}\)\]]/g) || []).length;
        if (closers > 0 && indent > 0) indent--;

        formatted.push(INDENT.repeat(Math.max(0, indent)) + line);

        // Count net openers
        const opens = (line.match(/[\{\(\[]/g) || []).length;
        const closes = (line.match(/[\}\)\]]/g) || []).length;
        indent += opens - closes;
        if (closers > 0) indent += closers; // re-add the one we subtracted
        indent = Math.max(0, indent + opens - closes - (opens - closes));
        // Simplified: just track brace depth
        indent = Math.max(0, indent);
      }

      // Re-calculate more carefully
      indent = 0;
      const result = [];
      for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        if (line === "") {
          result.push("");
          continue;
        }

        const startsWithClose = /^[\}\)\]]/.test(line);
        if (startsWithClose) indent = Math.max(0, indent - 1);

        result.push(INDENT.repeat(indent) + line);

        const opens = (line.match(/[\{]/g) || []).length;
        const closes = (line.match(/[\}]/g) || []).length;
        indent += opens - closes;
        if (startsWithClose) indent = Math.max(0, indent);
        indent = Math.max(0, indent);
      }

      return [
        {
          range: model.getFullModelRange(),
          text: result.join("\n"),
        },
      ];
    },
  });

  // 10) Folding Range Provider
  monaco.languages.registerFoldingRangeProvider(ZIG_LANG_ID, {
    provideFoldingRanges: function (model) {
      const lines = model.getValue().split("\n");
      const ranges = [];
      const stack = [];

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        for (const ch of line) {
          if (ch === "{") {
            stack.push(i);
          } else if (ch === "}") {
            if (stack.length > 0) {
              const start = stack.pop();
              if (i > start) {
                ranges.push({
                  start: start + 1,
                  end: i + 1,
                  kind: monaco.languages.FoldingRangeKind.Region,
                });
              }
            }
          }
        }
        // Doc-comment folding
        if (
          line.trim().startsWith("///") &&
          i > 0 &&
          !lines[i - 1].trim().startsWith("///")
        ) {
          let end = i;
          while (
            end + 1 < lines.length &&
            lines[end + 1].trim().startsWith("///")
          )
            end++;
          if (end > i) {
            ranges.push({
              start: i + 1,
              end: end + 1,
              kind: monaco.languages.FoldingRangeKind.Comment,
            });
          }
        }
      }
      return ranges;
    },
  });
};
