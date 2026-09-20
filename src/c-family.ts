// c-family.ts
import type * as Monaco from "monaco-editor";

type Variant = "c" | "cpp" | "objc" | "objcpp";
type FeatureTag = "c" | "cpp" | "objc";

interface DocEntry {
  detail: string;
  doc: string;
  v?: FeatureTag;
}

interface Snippet {
  label: string;
  detail: string;
  insertText: string;
  doc: string;
  v?: FeatureTag;
}

interface SymbolInfo {
  name: string;
  kind: string;
  line: number;
  col: number;
  returnType?: string;
  params?: string;
  type?: string;
  superclass?: string;
  attributes?: string;
  value?: string;
}

const TOKEN_POSTFIX: Record<Variant, string> = {
  c: ".c",
  cpp: ".cpp",
  objc: ".m",
  objcpp: ".mm",
};

// ────────────────────────────────────────────────────────────────────
//  Keyword lists (split by origin language)
// ────────────────────────────────────────────────────────────────────

const C_KEYWORDS = [
  "auto",
  "break",
  "case",
  "const",
  "continue",
  "default",
  "do",
  "else",
  "enum",
  "extern",
  "for",
  "goto",
  "if",
  "inline",
  "register",
  "restrict",
  "return",
  "sizeof",
  "static",
  "struct",
  "switch",
  "typedef",
  "union",
  "volatile",
  "while",
  "_Alignas",
  "_Alignof",
  "_Atomic",
  "_Bool",
  "_Complex",
  "_Generic",
  "_Imaginary",
  "_Noreturn",
  "_Static_assert",
  "_Thread_local",
];

const CPP_KEYWORDS = [
  "alignas",
  "alignof",
  "and",
  "and_eq",
  "asm",
  "bitand",
  "bitor",
  "catch",
  "class",
  "compl",
  "concept",
  "consteval",
  "constexpr",
  "constinit",
  "const_cast",
  "co_await",
  "co_return",
  "co_yield",
  "decltype",
  "delete",
  "dynamic_cast",
  "explicit",
  "export",
  "final",
  "friend",
  "import",
  "module",
  "mutable",
  "namespace",
  "new",
  "noexcept",
  "not",
  "not_eq",
  "operator",
  "or",
  "or_eq",
  "override",
  "private",
  "protected",
  "public",
  "reinterpret_cast",
  "requires",
  "static_assert",
  "static_cast",
  "template",
  "this",
  "thread_local",
  "throw",
  "try",
  "typeid",
  "typename",
  "using",
  "virtual",
  "xor",
  "xor_eq",
];

const OBJC_KEYWORDS = [
  "self",
  "super",
  "_cmd",
  "in",
  "out",
  "inout",
  "bycopy",
  "byref",
  "oneway",
  "__strong",
  "__weak",
  "__unsafe_unretained",
  "__autoreleasing",
  "__block",
  "__bridge",
  "__bridge_transfer",
  "__bridge_retained",
  "__kindof",
];

const C_TYPE_KEYWORDS = [
  "bool",
  "char",
  "double",
  "float",
  "int",
  "long",
  "short",
  "signed",
  "unsigned",
  "void",
  "wchar_t",
  "int8_t",
  "int16_t",
  "int32_t",
  "int64_t",
  "uint8_t",
  "uint16_t",
  "uint32_t",
  "uint64_t",
  "size_t",
  "ptrdiff_t",
];

const CPP_TYPE_KEYWORDS = [
  "char8_t",
  "char16_t",
  "char32_t",
  "nullptr_t",
  "string",
  "wstring",
  "string_view",
  "vector",
  "map",
  "unordered_map",
  "set",
  "unordered_set",
  "list",
  "deque",
  "array",
  "queue",
  "stack",
  "priority_queue",
  "pair",
  "tuple",
  "optional",
  "variant",
  "any",
  "shared_ptr",
  "unique_ptr",
  "weak_ptr",
  "atomic",
  "mutex",
  "thread",
  "future",
  "promise",
];

const OBJC_TYPE_KEYWORDS = [
  "id",
  "BOOL",
  "SEL",
  "IMP",
  "Class",
  "instancetype",
  "NSInteger",
  "NSUInteger",
  "CGFloat",
  "CGRect",
  "CGPoint",
  "CGSize",
  "NSObject",
  "NSString",
  "NSMutableString",
  "NSArray",
  "NSMutableArray",
  "NSDictionary",
  "NSMutableDictionary",
  "NSNumber",
  "NSValue",
  "NSData",
  "NSMutableData",
  "NSDate",
  "NSError",
  "NSURL",
  "NSSet",
  "NSMutableSet",
  "NSNotification",
  "NSNotificationCenter",
  "NSUserDefaults",
  "NSBundle",
  "NSFileManager",
  "NSTimer",
  "NSURLSession",
  "NSURLRequest",
  "NSOperationQueue",
  "NSOperation",
  "NSBlockOperation",
  "NSCache",
  "NSIndexSet",
  "NSRange",
  "dispatch_queue_t",
  "dispatch_group_t",
  "dispatch_semaphore_t",
  "dispatch_block_t",
];

const C_CONSTANTS = [
  "NULL",
  "EOF",
  "INFINITY",
  "NAN",
  "INT_MAX",
  "INT_MIN",
  "UINT_MAX",
  "LONG_MAX",
  "LONG_MIN",
  "SIZE_MAX",
  "__LINE__",
  "__FILE__",
  "__func__",
];

const CPP_CONSTANTS = ["true", "false", "nullptr", "__cplusplus"];

const OBJC_CONSTANTS = [
  "YES",
  "NO",
  "nil",
  "Nil",
  "__OBJC__",
  "NSNotFound",
  "CGFLOAT_MAX",
  "CGFLOAT_MIN",
  "NSIntegerMax",
  "NSIntegerMin",
  "NSUIntegerMax",
];

// ────────────────────────────────────────────────────────────────────
//  Header lists
// ────────────────────────────────────────────────────────────────────

const C_HEADERS = [
  "stdio.h",
  "stdlib.h",
  "string.h",
  "math.h",
  "ctype.h",
  "assert.h",
  "errno.h",
  "float.h",
  "limits.h",
  "locale.h",
  "setjmp.h",
  "signal.h",
  "stdarg.h",
  "stddef.h",
  "time.h",
  "stdbool.h",
  "stdint.h",
  "inttypes.h",
  "complex.h",
  "tgmath.h",
];

const CPP_HEADERS = [
  "iostream",
  "vector",
  "string",
  "map",
  "set",
  "unordered_map",
  "unordered_set",
  "algorithm",
  "numeric",
  "functional",
  "memory",
  "cassert",
  "cmath",
  "cstdio",
  "cstdlib",
  "cstring",
  "fstream",
  "sstream",
  "iomanip",
  "iterator",
  "stdexcept",
  "typeinfo",
  "type_traits",
  "utility",
  "tuple",
  "array",
  "deque",
  "list",
  "queue",
  "stack",
  "bitset",
  "regex",
  "chrono",
  "thread",
  "mutex",
  "atomic",
  "future",
  "condition_variable",
  "filesystem",
  "optional",
  "variant",
  "any",
  "span",
  "ranges",
  "format",
  "concepts",
  "coroutine",
  "numbers",
];

const OBJC_FRAMEWORKS = [
  "Foundation/Foundation.h",
  "UIKit/UIKit.h",
  "AppKit/AppKit.h",
  "CoreData/CoreData.h",
  "CoreGraphics/CoreGraphics.h",
  "CoreAnimation/QuartzCore.h",
  "CoreLocation/CoreLocation.h",
  "MapKit/MapKit.h",
  "AVFoundation/AVFoundation.h",
  "WebKit/WebKit.h",
  "StoreKit/StoreKit.h",
  "UserNotifications/UserNotifications.h",
  "Photos/Photos.h",
  "Contacts/Contacts.h",
  "EventKit/EventKit.h",
  "HealthKit/HealthKit.h",
  "CloudKit/CloudKit.h",
  "GameKit/GameKit.h",
  "SpriteKit/SpriteKit.h",
  "SceneKit/SceneKit.h",
  "Metal/Metal.h",
  "MetalKit/MetalKit.h",
];

// ────────────────────────────────────────────────────────────────────
//  Knowledge base
// ────────────────────────────────────────────────────────────────────

const DOCS: Record<string, DocEntry> = {
  // ── C Keywords ──────────────────────────────────────────────────
  auto: {
    detail: "Keyword",
    doc: 'Automatically deduces the type of a variable from its initializer (C++11) or storage-class specifier (C).\n\n```cpp\nauto x = 42;       // int\nauto s = "hello"s; // std::string\n```',
  },
  const: {
    detail: "Keyword",
    doc: "Specifies that an object or variable is not modifiable.\n\n```cpp\nconst int MAX = 100;\nvoid func(const std::string& s);\n```",
  },
  static: {
    detail: "Keyword",
    doc: "Declares a variable or function with static storage duration, or a class member shared across all instances.",
  },
  inline: {
    detail: "Keyword",
    doc: "Suggests the compiler to inline-expand a function. In C++17, also used for inline variables.",
  },
  extern: {
    detail: "Keyword",
    doc: "Declares a variable or function that is defined in another translation unit.",
  },
  volatile: {
    detail: "Keyword",
    doc: "Indicates that an object may be changed by something external to the program.",
  },
  sizeof: {
    detail: "Keyword",
    doc: "Returns the size in bytes of a type or expression.\n\n```cpp\nsize_t s = sizeof(int); // typically 4\n```",
  },
  typedef: {
    detail: "Keyword",
    doc: "Creates an alias for a type.\n\n```cpp\ntypedef unsigned long ulong;\n```\nPrefer `using` in modern C++.",
  },
  enum: {
    detail: "Keyword",
    doc: "Declares an enumeration type.\n\n```cpp\nenum Color { Red, Green, Blue };\nenum class Fruit { Apple, Banana }; // scoped enum (C++11)\n```",
  },
  struct: {
    detail: "Keyword",
    doc: "Declares a struct type. Members are public by default.\n\n```cpp\nstruct Point {\n    double x, y;\n};\n```",
  },
  union: {
    detail: "Keyword",
    doc: "Declares a union type where all members share the same memory.",
  },
  if: {
    detail: "Keyword",
    doc: "Conditional statement.\n\n```cpp\nif (condition) { ... }\nelse if (other) { ... }\nelse { ... }\n```",
  },
  else: { detail: "Keyword", doc: "Alternative branch of an if statement." },
  for: {
    detail: "Keyword",
    doc: "Loop statement.\n\n```cpp\nfor (int i = 0; i < n; ++i) { ... }\nfor (auto& elem : container) { ... } // range-based (C++11)\n```",
  },
  while: {
    detail: "Keyword",
    doc: "Loop that executes while a condition is true.\n\n```cpp\nwhile (condition) { ... }\n```",
  },
  do: {
    detail: "Keyword",
    doc: "Loop that executes at least once.\n\n```cpp\ndo { ... } while (condition);\n```",
  },
  switch: {
    detail: "Keyword",
    doc: "Multi-way branch statement.\n\n```cpp\nswitch (value) {\n    case 1: ... break;\n    default: ... break;\n}\n```",
  },
  case: { detail: "Keyword", doc: "A label in a switch statement." },
  default: {
    detail: "Keyword",
    doc: "Default label in switch, or default special member function (C++11).",
  },
  break: {
    detail: "Keyword",
    doc: "Exits the nearest enclosing loop or switch statement.",
  },
  continue: {
    detail: "Keyword",
    doc: "Skips to the next iteration of the nearest enclosing loop.",
  },
  return: {
    detail: "Keyword",
    doc: "Returns from a function, optionally with a value.",
  },
  goto: {
    detail: "Keyword",
    doc: "Transfers control to a labeled statement. Generally discouraged.",
  },

  // ── C++ Keywords ────────────────────────────────────────────────
  class: {
    detail: "Keyword",
    doc: "Declares a class type. Members are private by default.\n\n```cpp\nclass MyClass {\npublic:\n    int value;\n    void doSomething();\n};\n```",
    v: "cpp",
  },
  template: {
    detail: "Keyword",
    doc: "Declares a template for generic programming.\n\n```cpp\ntemplate<typename T>\nT max(T a, T b) { return a > b ? a : b; }\n```",
    v: "cpp",
  },
  namespace: {
    detail: "Keyword",
    doc: "Declares a namespace to organize code and prevent name collisions.\n\n```cpp\nnamespace MyLib {\n    void func();\n}\n```",
    v: "cpp",
  },
  typename: {
    detail: "Keyword",
    doc: "Used in template declarations to specify a type parameter, or to disambiguate dependent types.",
    v: "cpp",
  },
  constexpr: {
    detail: "Keyword (C++11)",
    doc: "Specifies that a value or function can be evaluated at compile time.\n\n```cpp\nconstexpr int square(int n) { return n * n; }\n```",
    v: "cpp",
  },
  virtual: {
    detail: "Keyword",
    doc: 'Declares a virtual function for runtime polymorphism.\n\n```cpp\nclass Base {\npublic:\n    virtual void speak() { std::cout << "Base"; }\n};\n```',
    v: "cpp",
  },
  override: {
    detail: "Keyword (C++11)",
    doc: "Indicates that a member function overrides a virtual function from a base class.",
    v: "cpp",
  },
  final: {
    detail: "Keyword (C++11)",
    doc: "Prevents a class from being inherited or a virtual function from being overridden.",
    v: "cpp",
  },
  mutable: {
    detail: "Keyword",
    doc: "Allows a member of a const object to be modified.",
    v: "cpp",
  },
  explicit: {
    detail: "Keyword",
    doc: "Prevents implicit conversions or copy-initialization for constructors and conversion operators.",
    v: "cpp",
  },
  noexcept: {
    detail: "Keyword (C++11)",
    doc: "Specifies that a function does not throw exceptions.\n\n```cpp\nvoid func() noexcept;\n```",
    v: "cpp",
  },
  decltype: {
    detail: "Keyword (C++11)",
    doc: "Inspects the declared type of an expression.\n\n```cpp\nint x = 5;\ndecltype(x) y = 10; // y is int\n```",
    v: "cpp",
  },
  nullptr: {
    detail: "Literal (C++11)",
    doc: "A null pointer literal of type std::nullptr_t. Preferred over NULL or 0.",
    v: "cpp",
  },
  static_assert: {
    detail: "Keyword (C++11)",
    doc: 'Performs a compile-time assertion.\n\n```cpp\nstatic_assert(sizeof(int) == 4, "int must be 4 bytes");\n```',
    v: "cpp",
  },
  static_cast: {
    detail: "Keyword",
    doc: "Performs a safe, compile-time checked cast.\n\n```cpp\ndouble d = 3.14;\nint i = static_cast<int>(d);\n```",
    v: "cpp",
  },
  dynamic_cast: {
    detail: "Keyword",
    doc: "Performs a runtime checked downcast for polymorphic types.",
    v: "cpp",
  },
  reinterpret_cast: {
    detail: "Keyword",
    doc: "Converts between unrelated pointer types. Use with caution.",
    v: "cpp",
  },
  const_cast: {
    detail: "Keyword",
    doc: "Adds or removes const/volatile qualification.",
    v: "cpp",
  },
  typeid: {
    detail: "Keyword",
    doc: "Returns type information about an expression or type (requires <typeinfo>).",
    v: "cpp",
  },
  throw: {
    detail: "Keyword",
    doc: 'Throws an exception.\n\n```cpp\nthrow std::runtime_error("error");\n```',
    v: "cpp",
  },
  try: {
    detail: "Keyword",
    doc: "Begins a try block for exception handling.",
    v: "cpp",
  },
  catch: {
    detail: "Keyword",
    doc: "Handles an exception thrown by a try block.\n\n```cpp\ntry { ... }\ncatch (const std::exception& e) { ... }\n```",
    v: "cpp",
  },
  using: {
    detail: "Keyword",
    doc: "Introduces a name from a namespace, or creates a type alias (C++11).\n\n```cpp\nusing Vec = std::vector<int>;\nusing namespace std;\n```",
    v: "cpp",
  },
  friend: {
    detail: "Keyword",
    doc: "Grants a function or class access to private/protected members.",
    v: "cpp",
  },
  delete: {
    detail: "Keyword",
    doc: "Deallocates memory (delete expression), or explicitly deletes a function (C++11).\n\n```cpp\ndelete ptr;\nMyClass(const MyClass&) = delete;\n```",
    v: "cpp",
  },
  new: {
    detail: "Keyword",
    doc: "Allocates memory dynamically.\n\n```cpp\nint* p = new int(42);\n```",
    v: "cpp",
  },
  this: {
    detail: "Keyword",
    doc: "Pointer to the current object within a member function.",
    v: "cpp",
  },
  concept: {
    detail: "Keyword (C++20)",
    doc: "Defines a named set of constraints for template arguments.\n\n```cpp\ntemplate<typename T>\nconcept Addable = requires(T a, T b) { a + b; };\n```",
    v: "cpp",
  },
  requires: {
    detail: "Keyword (C++20)",
    doc: "Specifies constraints on template arguments or defines a requires expression.",
    v: "cpp",
  },
  co_await: {
    detail: "Keyword (C++20)",
    doc: "Suspends a coroutine and waits for a result.",
    v: "cpp",
  },
  co_return: {
    detail: "Keyword (C++20)",
    doc: "Returns a value from a coroutine.",
    v: "cpp",
  },
  co_yield: {
    detail: "Keyword (C++20)",
    doc: "Yields a value from a coroutine.",
    v: "cpp",
  },

  // ── Objective-C @-Directives ────────────────────────────────────
  "@interface": {
    detail: "Objective-C Directive",
    doc: "Declares a class, category, or class extension.\n\n```objc\n@interface MyClass : NSObject <NSCoding>\n@property (nonatomic, copy) NSString *name;\n- (void)doSomething;\n@end\n\n// Category\n@interface NSString (MyAdditions)\n- (BOOL)isPalindrome;\n@end\n```",
    v: "objc",
  },
  "@implementation": {
    detail: "Objective-C Directive",
    doc: 'Begins the implementation of a class or category.\n\n```objc\n@implementation MyClass\n- (void)doSomething {\n    NSLog(@"Doing something");\n}\n@end\n```',
    v: "objc",
  },
  "@protocol": {
    detail: "Objective-C Directive",
    doc: "Declares a protocol (similar to an interface in other languages).\n\n```objc\n@protocol MyDelegate <NSObject>\n@required\n- (void)didFinishTask;\n@optional\n- (void)didStartTask;\n@end\n```",
    v: "objc",
  },
  "@end": {
    detail: "Objective-C Directive",
    doc: "Marks the end of an `@interface`, `@implementation`, or `@protocol` block.",
    v: "objc",
  },
  "@class": {
    detail: "Objective-C Directive",
    doc: "Forward-declares a class to avoid importing the full header.\n\n```objc\n@class MyOtherClass;\n```",
    v: "objc",
  },
  "@selector": {
    detail: "Objective-C Directive",
    doc: "Returns the SEL (selector) for a given method name.\n\n```objc\nSEL sel = @selector(doSomething:withParam:);\n```",
    v: "objc",
  },
  "@encode": {
    detail: "Objective-C Directive",
    doc: 'Returns the Objective-C type encoding string for a given type.\n\n```objc\nconst char *enc = @encode(int); // "i"\n```',
    v: "objc",
  },
  "@synchronized": {
    detail: "Objective-C Directive",
    doc: "Creates a mutex lock on an object for thread safety.\n\n```objc\n@synchronized(self) {\n    // thread-safe code\n}\n```",
    v: "objc",
  },
  "@autoreleasepool": {
    detail: "Objective-C Directive",
    doc: "Creates an autorelease pool block for managing memory.\n\n```objc\n@autoreleasepool {\n    // objects autoreleased here are drained at block end\n}\n```",
    v: "objc",
  },
  "@try": {
    detail: "Objective-C Directive",
    doc: 'Begins an Objective-C exception handling block.\n\n```objc\n@try {\n    // code that may throw\n}\n@catch (NSException *e) {\n    NSLog(@"%@", e);\n}\n@finally {\n    // cleanup\n}\n```',
    v: "objc",
  },
  "@catch": {
    detail: "Objective-C Directive",
    doc: "Catches an exception thrown within an `@try` block.",
    v: "objc",
  },
  "@finally": {
    detail: "Objective-C Directive",
    doc: "Code that always executes after `@try`/`@catch`, regardless of whether an exception occurred.",
    v: "objc",
  },
  "@throw": {
    detail: "Objective-C Directive",
    doc: 'Throws an Objective-C exception.\n\n```objc\n@throw [NSException exceptionWithName:@"MyException"\n                              reason:@"Something failed"\n                            userInfo:nil];\n```',
    v: "objc",
  },
  "@optional": {
    detail: "Objective-C Directive",
    doc: "Marks subsequent method declarations in a `@protocol` as optional.",
    v: "objc",
  },
  "@required": {
    detail: "Objective-C Directive",
    doc: "Marks subsequent method declarations in a `@protocol` as required (the default).",
    v: "objc",
  },
  "@dynamic": {
    detail: "Objective-C Directive",
    doc: "Tells the compiler that accessor methods for a property will be provided at runtime (e.g. by Core Data).",
    v: "objc",
  },
  "@synthesize": {
    detail: "Objective-C Directive",
    doc: "Generates accessor methods and an instance variable for a property. Modern Objective-C auto-synthesizes, so this is rarely needed.",
    v: "objc",
  },
  "@property": {
    detail: "Objective-C Directive",
    doc: "Declares a property with optional attributes.\n\n```objc\n@property (nonatomic, copy) NSString *name;\n@property (nonatomic, assign) NSInteger count;\n@property (nonatomic, strong) NSArray<NSString *> *items;\n```\nCommon attributes: `nonatomic`, `atomic`, `strong`, `weak`, `copy`, `assign`, `readonly`, `readwrite`, `nullable`, `nonnull`.",
    v: "objc",
  },
  "@import": {
    detail: "Objective-C Directive",
    doc: "Imports a framework module (requires modules to be enabled).\n\n```objc\n@import Foundation;\n@import UIKit;\n```",
    v: "objc",
  },
  "@available": {
    detail: "Objective-C Directive",
    doc: "Checks API availability at runtime.\n\n```objc\nif (@available(iOS 15.0, *)) {\n    // Use iOS 15+ APIs\n}\n```",
    v: "objc",
  },

  // ── Objective-C Types ───────────────────────────────────────────
  id: {
    detail: "Objective-C Type",
    doc: "A generic object pointer that can hold a reference to any Objective-C object.\n\n```objc\nid obj = [[NSObject alloc] init];\n```",
    v: "objc",
  },
  BOOL: {
    detail: "Objective-C Type",
    doc: "Boolean type. Values: `YES` or `NO`. On 64-bit, `BOOL` is `bool`; on 32-bit, `signed char`.",
    v: "objc",
  },
  SEL: {
    detail: "Objective-C Type",
    doc: "A selector type representing a method name.\n\n```objc\nSEL sel = @selector(viewDidLoad);\n[obj performSelector:sel];\n```",
    v: "objc",
  },
  IMP: {
    detail: "Objective-C Type",
    doc: "A pointer to the implementation of a method. Obtained via `method_getImplementation`.",
    v: "objc",
  },
  Class: {
    detail: "Objective-C Type",
    doc: "A type representing an Objective-C class object.\n\n```objc\nClass cls = [NSString class];\nid obj = [[cls alloc] init];\n```",
    v: "objc",
  },
  instancetype: {
    detail: "Objective-C Type",
    doc: "Resolves to the type of the receiving class, enabling better type inference for initializers and factory methods.\n\n```objc\n+ (instancetype)sharedInstance;\n- (instancetype)initWithValue:(int)val;\n```",
    v: "objc",
  },
  NSInteger: {
    detail: "Objective-C Type (<Foundation>)",
    doc: "Platform-dependent integer: `long` on 64-bit, `int` on 32-bit.",
    v: "objc",
  },
  NSUInteger: {
    detail: "Objective-C Type (<Foundation>)",
    doc: "Unsigned counterpart of `NSInteger`.",
    v: "objc",
  },
  CGFloat: {
    detail: "Objective-C Type (<CoreGraphics>)",
    doc: "Floating-point type: `double` on 64-bit, `float` on 32-bit.",
    v: "objc",
  },

  // ── Objective-C Special Keywords ────────────────────────────────
  self: {
    detail: "Objective-C Keyword",
    doc: 'Reference to the current object within an Objective-C method. Equivalent to `this` in C++.\n\n```objc\n[self doSomething];\nself.name = @"Hello";\n```',
    v: "objc",
  },
  super: {
    detail: "Objective-C Keyword",
    doc: "Reference used to call the superclass implementation of a method.\n\n```objc\n[super viewDidLoad];\n```",
    v: "objc",
  },
  _cmd: {
    detail: "Objective-C Keyword",
    doc: "Implicit `SEL` parameter in every Objective-C method, holding the selector of the current method.",
    v: "objc",
  },
  nil: {
    detail: "Objective-C Literal",
    doc: "Null pointer for Objective-C objects. Messaging `nil` is a no-op and returns zero/nil.",
    v: "objc",
  },
  Nil: {
    detail: "Objective-C Literal",
    doc: "Null pointer for Objective-C class pointers (`Class` type).",
    v: "objc",
  },
  YES: {
    detail: "Objective-C Constant",
    doc: "`BOOL` value representing true.",
    v: "objc",
  },
  NO: {
    detail: "Objective-C Constant",
    doc: "`BOOL` value representing false.",
    v: "objc",
  },
  __strong: {
    detail: "Ownership Qualifier (ARC)",
    doc: "Default ownership. The reference keeps the object alive.",
    v: "objc",
  },
  __weak: {
    detail: "Ownership Qualifier (ARC)",
    doc: "Zeroing weak reference. Automatically set to `nil` when the referenced object is deallocated.\n\n```objc\n__weak typeof(self) weakSelf = self;\n```",
    v: "objc",
  },
  __unsafe_unretained: {
    detail: "Ownership Qualifier (ARC)",
    doc: "Non-zeroing weak reference. Not set to `nil` on dealloc (dangling pointer). Prefer `__weak`.",
    v: "objc",
  },
  __autoreleasing: {
    detail: "Ownership Qualifier (ARC)",
    doc: "Used for parameters passed by reference that are autoreleased on return (e.g. `NSError **`).",
    v: "objc",
  },
  __block: {
    detail: "Storage Qualifier",
    doc: "Allows a variable captured by a block to be mutable inside the block.\n\n```objc\n__block int counter = 0;\nvoid (^blk)(void) = ^{ counter++; };\n```",
    v: "objc",
  },

  // ── Foundation Classes ──────────────────────────────────────────
  NSObject: {
    detail: "NSObject (<Foundation>)",
    doc: "Root class of most Objective-C hierarchies. Provides memory management, introspection, and message forwarding.\n\n```objc\n@interface MyClass : NSObject\n@end\n```",
    v: "objc",
  },
  NSString: {
    detail: "NSString (<Foundation>)",
    doc: 'Immutable Unicode string.\n\n```objc\nNSString *s = @"Hello, World!";\nNSString *fmt = [NSString stringWithFormat:@"Count: %ld", (long)count];\n```',
    v: "objc",
  },
  NSMutableString: {
    detail: "NSMutableString (<Foundation>)",
    doc: 'Mutable variant of NSString.\n\n```objc\nNSMutableString *s = [NSMutableString stringWithString:@"Hello"];\n[s appendString:@" World"];\n```',
    v: "objc",
  },
  NSArray: {
    detail: "NSArray (<Foundation>)",
    doc: 'Immutable ordered collection.\n\n```objc\nNSArray *arr = @[@"a", @"b", @"c"];\nNSString *first = arr[0];\n```',
    v: "objc",
  },
  NSMutableArray: {
    detail: "NSMutableArray (<Foundation>)",
    doc: 'Mutable ordered collection.\n\n```objc\nNSMutableArray *arr = [NSMutableArray array];\n[arr addObject:@"hello"];\n```',
    v: "objc",
  },
  NSDictionary: {
    detail: "NSDictionary (<Foundation>)",
    doc: 'Immutable key-value collection.\n\n```objc\nNSDictionary *d = @{@"key": @"value", @"num": @42};\n```',
    v: "objc",
  },
  NSMutableDictionary: {
    detail: "NSMutableDictionary (<Foundation>)",
    doc: 'Mutable key-value collection.\n\n```objc\nNSMutableDictionary *d = [NSMutableDictionary dictionary];\nd[@"key"] = @"value";\n```',
    v: "objc",
  },
  NSNumber: {
    detail: "NSNumber (<Foundation>)",
    doc: "Object wrapper for numeric C types.\n\n```objc\nNSNumber *n = @42;\nint val = n.intValue;\n```",
    v: "objc",
  },
  NSData: {
    detail: "NSData (<Foundation>)",
    doc: "Immutable raw byte buffer.",
    v: "objc",
  },
  NSDate: {
    detail: "NSDate (<Foundation>)",
    doc: "Represents a single point in time.\n\n```objc\nNSDate *now = [NSDate date];\n```",
    v: "objc",
  },
  NSError: {
    detail: "NSError (<Foundation>)",
    doc: 'Encapsulates error information.\n\n```objc\nNSError *error = nil;\nBOOL ok = [obj doSomething:&error];\nif (!ok) NSLog(@"Error: %@", error.localizedDescription);\n```',
    v: "objc",
  },
  NSURL: {
    detail: "NSURL (<Foundation>)",
    doc: 'Represents a URL.\n\n```objc\nNSURL *url = [NSURL URLWithString:@"https://example.com"];\n```',
    v: "objc",
  },
  NSNotificationCenter: {
    detail: "NSNotificationCenter (<Foundation>)",
    doc: "Publish-subscribe notification dispatch mechanism.\n\n```objc\n[[NSNotificationCenter defaultCenter] addObserver:self\n                                         selector:@selector(handleNote:)\n                                             name:SomeNotification\n                                           object:nil];\n```",
    v: "objc",
  },
  NSUserDefaults: {
    detail: "NSUserDefaults (<Foundation>)",
    doc: 'Persistent key-value store for user preferences.\n\n```objc\n[[NSUserDefaults standardUserDefaults] setObject:@"val" forKey:@"key"];\n```',
    v: "objc",
  },
  NSTimer: {
    detail: "NSTimer (<Foundation>)",
    doc: "Fires a message after a time interval, optionally repeating.",
    v: "objc",
  },
  NSURLSession: {
    detail: "NSURLSession (<Foundation>)",
    doc: "API for HTTP/HTTPS networking tasks (data, download, upload).",
    v: "objc",
  },

  // ── Foundation Functions ────────────────────────────────────────
  NSLog: {
    detail: "void NSLog(NSString *format, ...) (<Foundation>)",
    doc: 'Logs a formatted message to the console with a timestamp.\n\n```objc\nNSLog(@"Value: %@, count: %ld", obj, (long)count);\n```\nPrefer `os_log` in production.',
    v: "objc",
  },
  NSStringFromSelector: {
    detail: "NSString *NSStringFromSelector(SEL sel)",
    doc: "Returns the string representation of a selector.",
    v: "objc",
  },
  NSSelectorFromString: {
    detail: "SEL NSSelectorFromString(NSString *name)",
    doc: "Returns the selector for a given string.",
    v: "objc",
  },
  NSStringFromClass: {
    detail: "NSString *NSStringFromClass(Class cls)",
    doc: "Returns the string name of a class.",
    v: "objc",
  },
  NSMakeRange: {
    detail: "NSRange NSMakeRange(NSUInteger loc, NSUInteger len)",
    doc: "Creates an NSRange struct.",
    v: "objc",
  },

  // ── GCD ─────────────────────────────────────────────────────────
  dispatch_async: {
    detail: "void dispatch_async(dispatch_queue_t, dispatch_block_t)",
    doc: "Submits a block for asynchronous execution on a dispatch queue.\n\n```objc\ndispatch_async(dispatch_get_main_queue(), ^{\n    // Update UI\n});\n```",
    v: "objc",
  },
  dispatch_sync: {
    detail: "void dispatch_sync(dispatch_queue_t, dispatch_block_t)",
    doc: "Submits a block for synchronous execution. Blocks the calling thread. Avoid calling on the current queue (deadlock).",
    v: "objc",
  },
  dispatch_once: {
    detail: "void dispatch_once(dispatch_once_t *, dispatch_block_t)",
    doc: "Executes a block exactly once. Thread-safe.\n\n```objc\nstatic dispatch_once_t onceToken;\ndispatch_once(&onceToken, ^{ /* one-time init */ });\n```",
    v: "objc",
  },
  dispatch_get_main_queue: {
    detail: "dispatch_queue_t dispatch_get_main_queue(void)",
    doc: "Returns the serial dispatch queue associated with the main thread.",
    v: "objc",
  },
  dispatch_get_global_queue: {
    detail: "dispatch_queue_t dispatch_get_global_queue(long, unsigned long)",
    doc: "Returns a global concurrent queue of the given priority.",
    v: "objc",
  },

  // ── C / C++ Fundamental Types ───────────────────────────────────
  int: {
    detail: "Fundamental type",
    doc: "Signed integer, typically 32 bits.",
  },
  long: {
    detail: "Fundamental type",
    doc: "Signed integer, at least 32 bits. `long long` is at least 64 bits.",
  },
  short: {
    detail: "Fundamental type",
    doc: "Signed integer, at least 16 bits.",
  },
  char: { detail: "Fundamental type", doc: "Character type, exactly 1 byte." },
  bool: {
    detail: "Fundamental type",
    doc: "Boolean type. Values: `true` or `false`.",
  },
  float: {
    detail: "Fundamental type",
    doc: "Single-precision floating point (typically 32-bit IEEE 754).",
  },
  double: {
    detail: "Fundamental type",
    doc: "Double-precision floating point (typically 64-bit IEEE 754).",
  },
  void: {
    detail: "Fundamental type",
    doc: "Incomplete type indicating no value.",
  },
  size_t: {
    detail: "Type alias (<cstddef>)",
    doc: "Unsigned integer type for sizes and counts. Result of `sizeof`.",
  },

  // ── C++ STL Containers ──────────────────────────────────────────
  vector: {
    detail: "std::vector<T> (<vector>)",
    doc: "Dynamic array. O(1) amortized push_back, O(1) random access.\n\n```cpp\nstd::vector<int> v = {1, 2, 3};\nv.push_back(4);\n```",
    v: "cpp",
  },
  map: {
    detail: "std::map<K,V> (<map>)",
    doc: 'Sorted associative container (red-black tree). O(log n) insert/find.\n\n```cpp\nstd::map<std::string, int> m;\nm["hello"] = 1;\n```',
    v: "cpp",
  },
  unordered_map: {
    detail: "std::unordered_map<K,V> (<unordered_map>)",
    doc: "Hash-table associative container. O(1) average insert/find.",
    v: "cpp",
  },
  set: {
    detail: "std::set<T> (<set>)",
    doc: "Sorted unique elements. O(log n) insert/find.",
    v: "cpp",
  },
  unordered_set: {
    detail: "std::unordered_set<T> (<unordered_set>)",
    doc: "Hash-table unique elements. O(1) average insert/find.",
    v: "cpp",
  },
  string: {
    detail: "std::string (<string>)",
    doc: 'Dynamic character string.\n\n```cpp\nstd::string s = "Hello";\ns += " World";\n```',
    v: "cpp",
  },
  array: {
    detail: "std::array<T,N> (<array>)",
    doc: "Fixed-size array container.",
    v: "cpp",
  },
  deque: {
    detail: "std::deque<T> (<deque>)",
    doc: "Double-ended queue. O(1) push/pop at both ends.",
    v: "cpp",
  },
  list: {
    detail: "std::list<T> (<list>)",
    doc: "Doubly-linked list. O(1) insert/erase with iterator.",
    v: "cpp",
  },
  queue: {
    detail: "std::queue<T> (<queue>)",
    doc: "FIFO queue adapter.",
    v: "cpp",
  },
  stack: {
    detail: "std::stack<T> (<stack>)",
    doc: "LIFO stack adapter.",
    v: "cpp",
  },
  priority_queue: {
    detail: "std::priority_queue<T> (<queue>)",
    doc: "Max-heap priority queue.",
    v: "cpp",
  },
  pair: {
    detail: "std::pair<T1,T2> (<utility>)",
    doc: "Holds two values of possibly different types.",
    v: "cpp",
  },
  tuple: {
    detail: "std::tuple<Ts...> (<tuple>)",
    doc: "Fixed-size heterogeneous collection.",
    v: "cpp",
  },
  optional: {
    detail: "std::optional<T> (<optional>) C++17",
    doc: "May or may not contain a value.\n\n```cpp\nstd::optional<int> opt = 42;\nif (opt) { use(*opt); }\n```",
    v: "cpp",
  },
  variant: {
    detail: "std::variant<Ts...> (<variant>) C++17",
    doc: "Type-safe union.",
    v: "cpp",
  },
  any: {
    detail: "std::any (<any>) C++17",
    doc: "Type-safe container for single values of any type.",
    v: "cpp",
  },
  shared_ptr: {
    detail: "std::shared_ptr<T> (<memory>)",
    doc: "Reference-counted smart pointer.\n\n```cpp\nauto sp = std::make_shared<MyClass>(args);\n```",
    v: "cpp",
  },
  unique_ptr: {
    detail: "std::unique_ptr<T> (<memory>)",
    doc: "Exclusive-ownership smart pointer.\n\n```cpp\nauto up = std::make_unique<MyClass>(args);\n```",
    v: "cpp",
  },
  weak_ptr: {
    detail: "std::weak_ptr<T> (<memory>)",
    doc: "Non-owning observer of a shared_ptr. Breaks circular references.",
    v: "cpp",
  },

  // ── C++ Common Functions ────────────────────────────────────────
  cout: {
    detail: "std::cout (<iostream>)",
    doc: 'Standard output stream.\n\n```cpp\nstd::cout << "Hello" << std::endl;\n```',
    v: "cpp",
  },
  cin: {
    detail: "std::cin (<iostream>)",
    doc: "Standard input stream.",
    v: "cpp",
  },
  cerr: {
    detail: "std::cerr (<iostream>)",
    doc: "Standard error stream (unbuffered).",
    v: "cpp",
  },
  endl: {
    detail: "std::endl (<iostream>)",
    doc: 'Inserts a newline and flushes. Consider "\\n" for performance.',
    v: "cpp",
  },
  printf: {
    detail: "int printf(const char* fmt, ...) (<cstdio>)",
    doc: "C-style formatted output.",
  },
  scanf: {
    detail: "int scanf(const char* fmt, ...) (<cstdio>)",
    doc: "C-style formatted input.",
  },
  sort: {
    detail: "std::sort (<algorithm>)",
    doc: "Sorts elements. O(n log n).\n\n```cpp\nstd::sort(v.begin(), v.end());\n```",
    v: "cpp",
  },
  find: {
    detail: "std::find (<algorithm>)",
    doc: "Finds the first element equal to a value. O(n).",
    v: "cpp",
  },
  count: {
    detail: "std::count (<algorithm>)",
    doc: "Counts elements equal to a value.",
    v: "cpp",
  },
  transform: {
    detail: "std::transform (<algorithm>)",
    doc: "Applies a function to a range.",
    v: "cpp",
  },
  accumulate: {
    detail: "std::accumulate (<numeric>)",
    doc: "Computes the sum/fold of a range.",
    v: "cpp",
  },
  max: {
    detail: "std::max (<algorithm>)",
    doc: "Returns the larger of two values.",
    v: "cpp",
  },
  min: {
    detail: "std::min (<algorithm>)",
    doc: "Returns the smaller of two values.",
    v: "cpp",
  },
  swap: {
    detail: "std::swap (<utility>)",
    doc: "Exchanges values of two objects.",
    v: "cpp",
  },
  move: {
    detail: "std::move (<utility>)",
    doc: "Casts to rvalue reference, enabling move semantics.",
    v: "cpp",
  },
  forward: {
    detail: "std::forward<T> (<utility>)",
    doc: "Perfectly forwards an argument.",
    v: "cpp",
  },
  make_shared: {
    detail: "std::make_shared<T>(args...) (<memory>)",
    doc: "Creates a shared_ptr with a single allocation.",
    v: "cpp",
  },
  make_unique: {
    detail: "std::make_unique<T>(args...) (<memory>) C++14",
    doc: "Creates a unique_ptr.",
    v: "cpp",
  },
  to_string: {
    detail: "std::to_string(val) (<string>)",
    doc: "Converts a numeric value to std::string.",
    v: "cpp",
  },
  getline: {
    detail: "std::getline(stream, string) (<string>)",
    doc: "Reads a line from a stream.",
    v: "cpp",
  },
  assert: {
    detail: "assert(expr) (<cassert>)",
    doc: "Runtime assertion. Aborts if expression is false.",
  },
  thread: {
    detail: "std::thread (<thread>) C++11",
    doc: "Represents a thread of execution.",
    v: "cpp",
  },
  mutex: {
    detail: "std::mutex (<mutex>) C++11",
    doc: "Mutual exclusion primitive.",
    v: "cpp",
  },
  atomic: {
    detail: "std::atomic<T> (<atomic>) C++11",
    doc: "Provides atomic operations on a value.",
    v: "cpp",
  },
  future: {
    detail: "std::future<T> (<future>) C++11",
    doc: "Access the result of async operations.",
    v: "cpp",
  },
  promise: {
    detail: "std::promise<T> (<future>) C++11",
    doc: "Store a value to be acquired via a future.",
    v: "cpp",
  },
  async: {
    detail: "std::async (<future>) C++11",
    doc: "Runs a function asynchronously.",
    v: "cpp",
  },
};

// ────────────────────────────────────────────────────────────────────
//  Snippets
// ────────────────────────────────────────────────────────────────────

const SNIPPETS: Snippet[] = [
  // ── C ───────────────────────────────────────────────────────────
  {
    label: "main",
    detail: "Main function",
    insertText:
      "int main(int argc, char *argv[]) {\n\t${1:// code}\n\treturn 0;\n}",
    doc: "Standard main function with arguments.",
  },
  {
    label: "main-simple",
    detail: "Simple main function",
    insertText: "int main() {\n\t${1:// code}\n\treturn 0;\n}",
    doc: "Simple main function.",
  },
  {
    label: "#include<>",
    detail: "Include system header",
    insertText: "#include <${1:stdio.h}>",
    doc: "Include a system header.",
  },
  {
    label: '#include""',
    detail: "Include local header",
    insertText: '#include "${1:header.h}"',
    doc: "Include a local header.",
  },
  {
    label: "struct",
    detail: "Struct declaration",
    insertText: "struct ${1:Name} {\n\t${2:int value;}\n};",
    doc: "Struct declaration.",
  },
  {
    label: "for",
    detail: "For loop",
    insertText:
      "for (${1:int} ${2:i} = ${3:0}; ${2:i} < ${4:n}; ++${2:i}) {\n\t${5:// body}\n}",
    doc: "Standard for loop.",
  },
  {
    label: "while",
    detail: "While loop",
    insertText: "while (${1:condition}) {\n\t${2:// body}\n}",
    doc: "While loop.",
  },
  {
    label: "do-while",
    detail: "Do-while loop",
    insertText: "do {\n\t${1:// body}\n} while (${2:condition});",
    doc: "Do-while loop.",
  },
  {
    label: "if",
    detail: "If statement",
    insertText: "if (${1:condition}) {\n\t${2:// body}\n}",
    doc: "If statement.",
  },
  {
    label: "ife",
    detail: "If-else statement",
    insertText:
      "if (${1:condition}) {\n\t${2:// then}\n} else {\n\t${3:// else}\n}",
    doc: "If-else statement.",
  },
  {
    label: "switch",
    detail: "Switch statement",
    insertText:
      "switch (${1:expr}) {\n\tcase ${2:value}:\n\t\t${3:// code}\n\t\tbreak;\n\tdefault:\n\t\t${4:// default}\n\t\tbreak;\n}",
    doc: "Switch statement.",
  },
  {
    label: "guard",
    detail: "Include guard",
    insertText:
      "#ifndef ${1:HEADER_H}\n#define ${1:HEADER_H}\n\n${2:// declarations}\n\n#endif // ${1:HEADER_H}",
    doc: "Header include guard.",
  },
  {
    label: "pragma-once",
    detail: "#pragma once",
    insertText: "#pragma once\n\n${1:// declarations}",
    doc: "Pragma once include guard.",
  },

  // ── C++ ─────────────────────────────────────────────────────────
  {
    label: "class",
    detail: "Class declaration",
    insertText:
      "class ${1:ClassName} {\npublic:\n\t${1:ClassName}(${2:});\n\t~${1:ClassName}();\n\nprivate:\n\t${3:// members}\n};",
    doc: "Full class declaration.",
    v: "cpp",
  },
  {
    label: "forr",
    detail: "Range-based for loop",
    insertText:
      "for (${1:auto}& ${2:elem} : ${3:container}) {\n\t${4:// body}\n}",
    doc: "Range-based for loop (C++11).",
    v: "cpp",
  },
  {
    label: "forc",
    detail: "Const range-based for loop",
    insertText:
      "for (const ${1:auto}& ${2:elem} : ${3:container}) {\n\t${4:// body}\n}",
    doc: "Const range-based for loop.",
    v: "cpp",
  },
  {
    label: "try-catch",
    detail: "Try-catch block",
    insertText:
      "try {\n\t${1:// code}\n} catch (const ${2:std::exception}& ${3:e}) {\n\t${4:// handle}\n}",
    doc: "C++ exception handling.",
    v: "cpp",
  },
  {
    label: "lambda",
    detail: "Lambda expression",
    insertText: "[${1:&}](${2:auto param}) {\n\t${3:return param;}\n}",
    doc: "Lambda expression (C++11).",
    v: "cpp",
  },
  {
    label: "template-func",
    detail: "Template function",
    insertText:
      "template<typename ${1:T}>\n${2:T} ${3:func}(${4:T param}) {\n\t${5:return param;}\n}",
    doc: "Template function.",
    v: "cpp",
  },
  {
    label: "template-class",
    detail: "Template class",
    insertText:
      "template<typename ${1:T}>\nclass ${2:ClassName} {\npublic:\n\t${2:ClassName}(${1:T} ${3:val}) : ${4:m_val}(${3:val}) {}\n\t${1:T} get() const { return ${4:m_val}; }\nprivate:\n\t${1:T} ${4:m_val};\n};",
    doc: "Template class.",
    v: "cpp",
  },
  {
    label: "enum-class",
    detail: "Scoped enum",
    insertText:
      "enum class ${1:Name} {\n\t${2:Value1},\n\t${3:Value2},\n\t${4:Value3}\n};",
    doc: "Scoped enumeration (C++11).",
    v: "cpp",
  },
  {
    label: "cout",
    detail: "std::cout statement",
    insertText: 'std::cout << ${1:"Hello"} << std::endl;',
    doc: "Output to stdout.",
    v: "cpp",
  },
  {
    label: "vector-init",
    detail: "Vector initialization",
    insertText: "std::vector<${1:int}> ${2:vec} = {${3:1, 2, 3}};",
    doc: "Initialize a vector.",
    v: "cpp",
  },
  {
    label: "map-init",
    detail: "Map initialization",
    insertText:
      'std::map<${1:std::string}, ${2:int}> ${3:m} = {\n\t{${4:"key"}, ${5:0}}\n};',
    doc: "Initialize a map.",
    v: "cpp",
  },
  {
    label: "unique-ptr",
    detail: "std::make_unique",
    insertText: "auto ${1:ptr} = std::make_unique<${2:Type}>(${3:args});",
    doc: "Create a unique pointer.",
    v: "cpp",
  },
  {
    label: "shared-ptr",
    detail: "std::make_shared",
    insertText: "auto ${1:ptr} = std::make_shared<${2:Type}>(${3:args});",
    doc: "Create a shared pointer.",
    v: "cpp",
  },
  {
    label: "namespace",
    detail: "Namespace declaration",
    insertText:
      "namespace ${1:name} {\n\n${2:// code}\n\n} // namespace ${1:name}",
    doc: "Namespace declaration.",
    v: "cpp",
  },
  {
    label: "algo-sort",
    detail: "std::sort",
    insertText: "std::sort(${1:vec}.begin(), ${1:vec}.end()${2:});",
    doc: "Sort a container.",
    v: "cpp",
  },
  {
    label: "algo-find",
    detail: "std::find",
    insertText:
      "auto ${1:it} = std::find(${2:vec}.begin(), ${2:vec}.end(), ${3:value});\nif (${1:it} != ${2:vec}.end()) {\n\t${4:// found}\n}",
    doc: "Find an element.",
    v: "cpp",
  },
  {
    label: "fstream-read",
    detail: "Read file",
    insertText:
      'std::ifstream ${1:file}(${2:"filename.txt"});\nif (${1:file}.is_open()) {\n\tstd::string ${3:line};\n\twhile (std::getline(${1:file}, ${3:line})) {\n\t\t${4:// process}\n\t}\n}',
    doc: "Read from a file.",
    v: "cpp",
  },
  {
    label: "fstream-write",
    detail: "Write file",
    insertText:
      'std::ofstream ${1:file}(${2:"filename.txt"});\nif (${1:file}.is_open()) {\n\t${1:file} << ${3:"content"} << std::endl;\n\t${1:file}.close();\n}',
    doc: "Write to a file.",
    v: "cpp",
  },
  {
    label: "rule-of-five",
    detail: "Rule of Five",
    insertText:
      "${1:ClassName}(const ${1:ClassName}& other);                    // copy ctor\n${1:ClassName}(${1:ClassName}&& other) noexcept;                 // move ctor\n${1:ClassName}& operator=(const ${1:ClassName}& other);          // copy assign\n${1:ClassName}& operator=(${1:ClassName}&& other) noexcept;     // move assign\n~${1:ClassName}();                                             // dtor",
    doc: "The Rule of Five special member functions.",
    v: "cpp",
  },
  {
    label: "concept",
    detail: "Concept definition (C++20)",
    insertText:
      "template<typename ${1:T}>\nconcept ${2:ConceptName} = requires(${1:T} ${3:a}) {\n\t{ ${4:a.size()} } -> std::convertible_to<std::size_t>;\n};",
    doc: "C++20 concept.",
    v: "cpp",
  },
  {
    label: "static_assert",
    detail: "Static assertion",
    insertText: 'static_assert(${1:condition}, ${2:"message"});',
    doc: "Compile-time assertion.",
    v: "cpp",
  },

  // ── Objective-C ─────────────────────────────────────────────────
  {
    label: "#import<>",
    detail: "Import system header",
    insertText: "#import <${1:Foundation/Foundation.h}>",
    doc: "Import a system/framework header.",
    v: "objc",
  },
  {
    label: '#import""',
    detail: "Import local header",
    insertText: '#import "${1:Header.h}"',
    doc: "Import a local header.",
    v: "objc",
  },
  {
    label: "@import",
    detail: "Module import",
    insertText: "@import ${1:Foundation};",
    doc: "Import a framework module.",
    v: "objc",
  },
  {
    label: "@interface",
    detail: "Class interface",
    insertText:
      "@interface ${1:ClassName} : ${2:NSObject}\n\n${3:// properties and methods}\n\n@end",
    doc: "Declare an Objective-C class.",
    v: "objc",
  },
  {
    label: "@interface-protocol",
    detail: "Class with protocol conformance",
    insertText:
      "@interface ${1:ClassName} : ${2:NSObject} <${3:NSCoding}>\n\n${4:// properties and methods}\n\n@end",
    doc: "Class interface adopting a protocol.",
    v: "objc",
  },
  {
    label: "@interface-category",
    detail: "Category interface",
    insertText:
      "@interface ${1:NSString} (${2:MyAdditions})\n\n${3:// methods}\n\n@end",
    doc: "Declare a category on an existing class.",
    v: "objc",
  },
  {
    label: "@interface-extension",
    detail: "Class extension",
    insertText:
      "@interface ${1:ClassName} ()\n\n${2:// private properties and methods}\n\n@end",
    doc: "Anonymous category (class extension) for private declarations.",
    v: "objc",
  },
  {
    label: "@implementation",
    detail: "Class implementation",
    insertText:
      "@implementation ${1:ClassName}\n\n${2:// method implementations}\n\n@end",
    doc: "Implement an Objective-C class.",
    v: "objc",
  },
  {
    label: "@protocol",
    detail: "Protocol declaration",
    insertText:
      "@protocol ${1:ProtocolName} <NSObject>\n\n@required\n${2:- (void)requiredMethod;}\n\n@optional\n${3:- (void)optionalMethod;}\n\n@end",
    doc: "Declare an Objective-C protocol.",
    v: "objc",
  },
  {
    label: "objc-method",
    detail: "Instance method",
    insertText:
      "- (${1:void})${2:methodName}:(${3:id})${4:param} {\n\t${5:// implementation}\n}",
    doc: "Objective-C instance method.",
    v: "objc",
  },
  {
    label: "objc-method-void",
    detail: "Void instance method",
    insertText: "- (void)${1:methodName} {\n\t${2:// implementation}\n}",
    doc: "Instance method with no parameters.",
    v: "objc",
  },
  {
    label: "objc-class-method",
    detail: "Class method",
    insertText:
      "+ (${1:instancetype})${2:methodName} {\n\t${3:// implementation}\n}",
    doc: "Objective-C class method.",
    v: "objc",
  },
  {
    label: "@property-strong",
    detail: "Strong property",
    insertText:
      "@property (nonatomic, strong) ${1:NSObject} *${2:propertyName};",
    doc: "Declare a strong (owning) object property.",
    v: "objc",
  },
  {
    label: "@property-weak",
    detail: "Weak property",
    insertText: "@property (nonatomic, weak) ${1:id<NSObject>} ${2:delegate};",
    doc: "Declare a weak property (for delegates, breaking cycles).",
    v: "objc",
  },
  {
    label: "@property-copy",
    detail: "Copy property",
    insertText: "@property (nonatomic, copy) ${1:NSString} *${2:propertyName};",
    doc: "Declare a copy property (for value-semantic types like NSString).",
    v: "objc",
  },
  {
    label: "@property-assign",
    detail: "Assign property",
    insertText:
      "@property (nonatomic, assign) ${1:NSInteger} ${2:propertyName};",
    doc: "Declare an assign property (for primitives).",
    v: "objc",
  },
  {
    label: "@property-readonly",
    detail: "Readonly property",
    insertText:
      "@property (nonatomic, readonly) ${1:NSString} *${2:propertyName};",
    doc: "Declare a readonly property.",
    v: "objc",
  },
  {
    label: "init",
    detail: "Designated initializer",
    insertText:
      "- (instancetype)initWith${1:Value}:(${2:id})${3:value} {\n\tself = [super init];\n\tif (self) {\n\t\t_${3:value} = ${3:value};\n\t}\n\treturn self;\n}",
    doc: "Standard designated initializer pattern.",
    v: "objc",
  },
  {
    label: "singleton",
    detail: "Singleton pattern",
    insertText:
      "+ (instancetype)shared${1:Instance} {\n\tstatic ${2:ClassName} *shared = nil;\n\tstatic dispatch_once_t onceToken;\n\tdispatch_once(&onceToken, ^{\n\t\tshared = [[self alloc] init];\n\t});\n\treturn shared;\n}",
    doc: "Thread-safe singleton using dispatch_once.",
    v: "objc",
  },
  {
    label: "@autoreleasepool",
    detail: "Autorelease pool",
    insertText: "@autoreleasepool {\n\t${1:// code}\n}",
    doc: "Autorelease pool block.",
    v: "objc",
  },
  {
    label: "@try-catch",
    detail: "ObjC try-catch-finally",
    insertText:
      '@try {\n\t${1:// code}\n}\n@catch (NSException *${2:exception}) {\n\tNSLog(@"Exception: %@", ${2:exception});\n}\n@finally {\n\t${3:// cleanup}\n}',
    doc: "Objective-C exception handling.",
    v: "objc",
  },
  {
    label: "@synchronized",
    detail: "Synchronized block",
    insertText: "@synchronized(${1:self}) {\n\t${2:// thread-safe code}\n}",
    doc: "Mutual exclusion on an object.",
    v: "objc",
  },
  {
    label: "NSLog",
    detail: "NSLog statement",
    insertText: 'NSLog(@"${1:%@}", ${2:obj});',
    doc: "Log to console.",
    v: "objc",
  },
  {
    label: "dispatch_async",
    detail: "Async dispatch",
    insertText:
      "dispatch_async(${1:dispatch_get_main_queue()}, ^{\n\t${2:// code}\n});",
    doc: "Submit a block for async execution.",
    v: "objc",
  },
  {
    label: "dispatch_once",
    detail: "Execute once",
    insertText:
      "static dispatch_once_t onceToken;\ndispatch_once(&onceToken, ^{\n\t${1:// one-time code}\n});",
    doc: "Execute a block once (thread-safe).",
    v: "objc",
  },
  {
    label: "block-typedef",
    detail: "Block typedef",
    insertText:
      "typedef ${1:void} (^${2:CompletionBlock})(${3:NSError *error});",
    doc: "Typedef for a block type.",
    v: "objc",
  },
  {
    label: "block-variable",
    detail: "Block variable",
    insertText: "${1:void} (^${2:block})(${3:void}) = ^{\n\t${4:// code}\n};",
    doc: "Block variable declaration.",
    v: "objc",
  },
  {
    label: "block-inline",
    detail: "Inline block parameter",
    insertText: "^(${1:id result, NSError *error}) {\n\t${2:// handle}\n}",
    doc: "Inline block for method arguments.",
    v: "objc",
  },
  {
    label: "NS_ENUM",
    detail: "NS_ENUM typedef",
    insertText:
      "typedef NS_ENUM(${1:NSInteger}, ${2:EnumName}) {\n\t${2:EnumName}${3:Value1},\n\t${2:EnumName}${4:Value2},\n\t${2:EnumName}${5:Value3},\n};",
    doc: "Typed enumeration macro.",
    v: "objc",
  },
  {
    label: "NS_OPTIONS",
    detail: "NS_OPTIONS typedef",
    insertText:
      "typedef NS_OPTIONS(${1:NSUInteger}, ${2:OptionName}) {\n\t${2:OptionName}${3:None}   = 0,\n\t${2:OptionName}${4:First}  = 1 << 0,\n\t${2:OptionName}${5:Second} = 1 << 1,\n};",
    doc: "Bitmask options macro.",
    v: "objc",
  },
  {
    label: "weakself",
    detail: "Weak self capture",
    insertText:
      "__weak typeof(self) weakSelf = self;\n${1:// Use weakSelf in block}\n__strong typeof(weakSelf) strongSelf = weakSelf;\nif (!strongSelf) return;",
    doc: "Weak/strong self dance for blocks.",
    v: "objc",
  },
  {
    label: "delegate-property",
    detail: "Delegate protocol + property",
    insertText:
      "@protocol ${1:ClassName}Delegate <NSObject>\n@optional\n- (void)${2:didFinish}:(${1:ClassName} *)sender;\n@end\n\n// In @interface:\n@property (nonatomic, weak) id<${1:ClassName}Delegate> delegate;",
    doc: "Complete delegate pattern.",
    v: "objc",
  },
  {
    label: "forin",
    detail: "Fast enumeration",
    insertText: "for (${1:id} ${2:obj} in ${3:array}) {\n\t${4:// body}\n}",
    doc: "Objective-C fast enumeration (for-in).",
    v: "objc",
  },
];

// ────────────────────────────────────────────────────────────────────
//  Std namespace items (for std:: completion)
// ────────────────────────────────────────────────────────────────────

const STD_ITEMS = [
  "cout",
  "cin",
  "cerr",
  "clog",
  "endl",
  "string",
  "wstring",
  "string_view",
  "vector",
  "map",
  "multimap",
  "set",
  "multiset",
  "unordered_map",
  "unordered_multimap",
  "unordered_set",
  "unordered_multiset",
  "list",
  "deque",
  "array",
  "queue",
  "priority_queue",
  "stack",
  "pair",
  "tuple",
  "optional",
  "variant",
  "any",
  "shared_ptr",
  "unique_ptr",
  "weak_ptr",
  "make_shared",
  "make_unique",
  "make_pair",
  "make_tuple",
  "move",
  "forward",
  "swap",
  "begin",
  "end",
  "sort",
  "stable_sort",
  "find",
  "find_if",
  "count",
  "count_if",
  "for_each",
  "transform",
  "accumulate",
  "reduce",
  "copy",
  "fill",
  "reverse",
  "rotate",
  "unique",
  "remove",
  "remove_if",
  "replace",
  "max",
  "min",
  "max_element",
  "min_element",
  "clamp",
  "lower_bound",
  "upper_bound",
  "binary_search",
  "next_permutation",
  "prev_permutation",
  "iota",
  "gcd",
  "lcm",
  "distance",
  "advance",
  "next",
  "prev",
  "to_string",
  "stoi",
  "stol",
  "stoll",
  "stof",
  "stod",
  "getline",
  "get",
  "tie",
  "thread",
  "mutex",
  "lock_guard",
  "unique_lock",
  "scoped_lock",
  "atomic",
  "future",
  "promise",
  "async",
  "function",
  "bind",
  "ref",
  "cref",
  "numeric_limits",
  "runtime_error",
  "logic_error",
  "invalid_argument",
  "out_of_range",
  "overflow_error",
  "exception",
  "ifstream",
  "ofstream",
  "fstream",
  "stringstream",
  "istringstream",
  "ostringstream",
  "setw",
  "setprecision",
  "fixed",
  "scientific",
  "hex",
  "dec",
  "oct",
  "bitset",
  "complex",
  "regex",
  "smatch",
  "regex_match",
  "regex_search",
  "chrono",
  "filesystem",
  "nullptr_t",
  "size_t",
  "ptrdiff_t",
  "initializer_list",
  "allocator",
  "hash",
  "equal_to",
  "less",
  "greater",
  "plus",
  "minus",
  "format",
  "print",
  "println",
  "span",
  "ranges",
  "views",
];

const STD_CLASS_TYPES = new Set([
  "vector",
  "map",
  "set",
  "string",
  "list",
  "deque",
  "array",
  "queue",
  "stack",
  "pair",
  "tuple",
  "optional",
  "variant",
  "any",
  "shared_ptr",
  "unique_ptr",
  "weak_ptr",
  "atomic",
  "mutex",
  "thread",
  "future",
  "promise",
  "function",
  "regex",
  "bitset",
  "complex",
  "multimap",
  "multiset",
  "unordered_map",
  "unordered_multimap",
  "unordered_set",
  "unordered_multiset",
  "priority_queue",
  "ifstream",
  "ofstream",
  "fstream",
  "stringstream",
  "istringstream",
  "ostringstream",
]);

// ────────────────────────────────────────────────────────────────────
//  ObjC common functions list (for completion)
// ────────────────────────────────────────────────────────────────────

const OBJC_FUNCTIONS = [
  "NSLog",
  "NSStringFromSelector",
  "NSSelectorFromString",
  "NSStringFromClass",
  "NSClassFromString",
  "NSMakeRange",
  "CGRectMake",
  "CGPointMake",
  "CGSizeMake",
  "dispatch_async",
  "dispatch_sync",
  "dispatch_once",
  "dispatch_get_main_queue",
  "dispatch_get_global_queue",
  "dispatch_queue_create",
  "dispatch_group_create",
  "dispatch_group_enter",
  "dispatch_group_leave",
  "dispatch_group_notify",
  "dispatch_semaphore_create",
  "dispatch_semaphore_wait",
  "dispatch_semaphore_signal",
  "dispatch_after",
];

// ────────────────────────────────────────────────────────────────────
//  Member method lists (for . / -> completion)
// ────────────────────────────────────────────────────────────────────

interface MemberEntry {
  label: string;
  detail: string;
  doc: string;
  v: FeatureTag;
  isField?: boolean;
}

const MEMBER_METHODS: MemberEntry[] = [
  // C++
  {
    label: "push_back",
    detail: "void push_back(const T& val)",
    doc: "Adds element to the end.",
    v: "cpp",
  },
  {
    label: "pop_back",
    detail: "void pop_back()",
    doc: "Removes the last element.",
    v: "cpp",
  },
  {
    label: "size",
    detail: "size_t size() const",
    doc: "Returns the number of elements.",
    v: "cpp",
  },
  {
    label: "empty",
    detail: "bool empty() const",
    doc: "Checks if empty.",
    v: "cpp",
  },
  {
    label: "clear",
    detail: "void clear()",
    doc: "Removes all elements.",
    v: "cpp",
  },
  {
    label: "begin",
    detail: "iterator begin()",
    doc: "Iterator to beginning.",
    v: "cpp",
  },
  { label: "end", detail: "iterator end()", doc: "Iterator to end.", v: "cpp" },
  {
    label: "rbegin",
    detail: "reverse_iterator rbegin()",
    doc: "Reverse iterator to end.",
    v: "cpp",
  },
  {
    label: "rend",
    detail: "reverse_iterator rend()",
    doc: "Reverse iterator to beginning.",
    v: "cpp",
  },
  { label: "front", detail: "T& front()", doc: "First element.", v: "cpp" },
  { label: "back", detail: "T& back()", doc: "Last element.", v: "cpp" },
  {
    label: "at",
    detail: "T& at(size_t pos)",
    doc: "Element at position with bounds check.",
    v: "cpp",
  },
  {
    label: "data",
    detail: "T* data()",
    doc: "Pointer to underlying array.",
    v: "cpp",
  },
  {
    label: "reserve",
    detail: "void reserve(size_t n)",
    doc: "Reserves capacity.",
    v: "cpp",
  },
  {
    label: "resize",
    detail: "void resize(size_t n)",
    doc: "Resizes container.",
    v: "cpp",
  },
  {
    label: "capacity",
    detail: "size_t capacity() const",
    doc: "Allocated capacity.",
    v: "cpp",
  },
  {
    label: "shrink_to_fit",
    detail: "void shrink_to_fit()",
    doc: "Reduces capacity to size.",
    v: "cpp",
  },
  {
    label: "insert",
    detail: "iterator insert(pos, val)",
    doc: "Inserts element.",
    v: "cpp",
  },
  {
    label: "erase",
    detail: "iterator erase(pos)",
    doc: "Erases element.",
    v: "cpp",
  },
  {
    label: "emplace_back",
    detail: "void emplace_back(args...)",
    doc: "Constructs in-place at end.",
    v: "cpp",
  },
  {
    label: "emplace",
    detail: "iterator emplace(pos, args...)",
    doc: "Constructs in-place.",
    v: "cpp",
  },
  {
    label: "find",
    detail: "iterator find(key)",
    doc: "Finds element by key.",
    v: "cpp",
  },
  {
    label: "count",
    detail: "size_t count(key)",
    doc: "Counts elements with key.",
    v: "cpp",
  },
  {
    label: "contains",
    detail: "bool contains(key) (C++20)",
    doc: "Checks if container has key.",
    v: "cpp",
  },
  {
    label: "swap",
    detail: "void swap(other)",
    doc: "Swaps contents.",
    v: "cpp",
  },
  {
    label: "push",
    detail: "void push(const T& val)",
    doc: "Pushes element (stack/queue).",
    v: "cpp",
  },
  {
    label: "pop",
    detail: "void pop()",
    doc: "Removes top/front element.",
    v: "cpp",
  },
  { label: "top", detail: "T& top()", doc: "Access top element.", v: "cpp" },
  {
    label: "first",
    detail: "T1 first",
    doc: "First element of pair.",
    v: "cpp",
    isField: true,
  },
  {
    label: "second",
    detail: "T2 second",
    doc: "Second element of pair.",
    v: "cpp",
    isField: true,
  },
  {
    label: "c_str",
    detail: "const char* c_str()",
    doc: "C-style string.",
    v: "cpp",
  },
  {
    label: "length",
    detail: "size_t length()",
    doc: "String length.",
    v: "cpp",
  },
  {
    label: "substr",
    detail: "string substr(pos, len)",
    doc: "Returns substring.",
    v: "cpp",
  },
  {
    label: "rfind",
    detail: "size_t rfind(str, pos)",
    doc: "Finds last occurrence.",
    v: "cpp",
  },
  {
    label: "append",
    detail: "string& append(str)",
    doc: "Appends to string.",
    v: "cpp",
  },
  {
    label: "replace",
    detail: "string& replace(pos, len, str)",
    doc: "Replaces part of string.",
    v: "cpp",
  },
  {
    label: "compare",
    detail: "int compare(str)",
    doc: "Compares strings.",
    v: "cpp",
  },
  {
    label: "starts_with",
    detail: "bool starts_with(sv) (C++20)",
    doc: "Checks prefix.",
    v: "cpp",
  },
  {
    label: "ends_with",
    detail: "bool ends_with(sv) (C++20)",
    doc: "Checks suffix.",
    v: "cpp",
  },
  {
    label: "get",
    detail: "T* get()",
    doc: "Stored pointer (smart ptr).",
    v: "cpp",
  },
  {
    label: "reset",
    detail: "void reset(ptr)",
    doc: "Replace managed object.",
    v: "cpp",
  },
  {
    label: "release",
    detail: "T* release()",
    doc: "Release ownership (unique_ptr).",
    v: "cpp",
  },
  {
    label: "use_count",
    detail: "long use_count()",
    doc: "Reference count (shared_ptr).",
    v: "cpp",
  },
  {
    label: "lock",
    detail: "shared_ptr<T> lock()",
    doc: "shared_ptr from weak_ptr.",
    v: "cpp",
  },
  {
    label: "expired",
    detail: "bool expired()",
    doc: "Checks if deleted (weak_ptr).",
    v: "cpp",
  },
  {
    label: "has_value",
    detail: "bool has_value()",
    doc: "Checks if optional has value.",
    v: "cpp",
  },
  {
    label: "value",
    detail: "T& value()",
    doc: "Returns value or throws.",
    v: "cpp",
  },
  {
    label: "value_or",
    detail: "T value_or(default)",
    doc: "Value or default.",
    v: "cpp",
  },
  {
    label: "index",
    detail: "size_t index() const",
    doc: "Index of held type (variant).",
    v: "cpp",
  },
  {
    label: "join",
    detail: "void join()",
    doc: "Waits for thread to finish.",
    v: "cpp",
  },
  {
    label: "detach",
    detail: "void detach()",
    doc: "Detaches thread.",
    v: "cpp",
  },
  {
    label: "joinable",
    detail: "bool joinable()",
    doc: "Checks if joinable.",
    v: "cpp",
  },
  {
    label: "wait",
    detail: "void wait()",
    doc: "Waits for result (future).",
    v: "cpp",
  },
  {
    label: "is_open",
    detail: "bool is_open()",
    doc: "Checks if file stream is open.",
    v: "cpp",
  },
  {
    label: "close",
    detail: "void close()",
    doc: "Closes file stream.",
    v: "cpp",
  },
  {
    label: "str",
    detail: "string str()",
    doc: "String copy of stringstream.",
    v: "cpp",
  },
  // Objective-C
  {
    label: "count",
    detail: "@property NSUInteger count",
    doc: "Number of objects.",
    v: "objc",
    isField: true,
  },
  {
    label: "length",
    detail: "@property NSUInteger length",
    doc: "String/data length.",
    v: "objc",
    isField: true,
  },
  {
    label: "intValue",
    detail: "@property int intValue",
    doc: "NSNumber/NSString int.",
    v: "objc",
    isField: true,
  },
  {
    label: "floatValue",
    detail: "@property float floatValue",
    doc: "NSNumber/NSString float.",
    v: "objc",
    isField: true,
  },
  {
    label: "doubleValue",
    detail: "@property double doubleValue",
    doc: "NSNumber/NSString double.",
    v: "objc",
    isField: true,
  },
  {
    label: "boolValue",
    detail: "@property BOOL boolValue",
    doc: "NSNumber/NSString BOOL.",
    v: "objc",
    isField: true,
  },
  {
    label: "integerValue",
    detail: "@property NSInteger integerValue",
    doc: "NSInteger value.",
    v: "objc",
    isField: true,
  },
  {
    label: "stringValue",
    detail: "@property NSString *stringValue",
    doc: "String representation.",
    v: "objc",
    isField: true,
  },
  {
    label: "description",
    detail: "@property NSString *description",
    doc: "Human-readable description.",
    v: "objc",
    isField: true,
  },
  {
    label: "allKeys",
    detail: "@property NSArray *allKeys",
    doc: "All dictionary keys.",
    v: "objc",
    isField: true,
  },
  {
    label: "allValues",
    detail: "@property NSArray *allValues",
    doc: "All dictionary values.",
    v: "objc",
    isField: true,
  },
  {
    label: "firstObject",
    detail: "@property id firstObject",
    doc: "First array object (nil-safe).",
    v: "objc",
    isField: true,
  },
  {
    label: "lastObject",
    detail: "@property id lastObject",
    doc: "Last array object (nil-safe).",
    v: "objc",
    isField: true,
  },
  {
    label: "delegate",
    detail: "@property id delegate",
    doc: "Delegate object.",
    v: "objc",
    isField: true,
  },
  {
    label: "frame",
    detail: "@property CGRect frame",
    doc: "View's frame rectangle.",
    v: "objc",
    isField: true,
  },
  {
    label: "bounds",
    detail: "@property CGRect bounds",
    doc: "View's bounds rectangle.",
    v: "objc",
    isField: true,
  },
  {
    label: "center",
    detail: "@property CGPoint center",
    doc: "View's center point.",
    v: "objc",
    isField: true,
  },
  {
    label: "hidden",
    detail: "@property BOOL hidden",
    doc: "Whether the view is hidden.",
    v: "objc",
    isField: true,
  },
  {
    label: "alpha",
    detail: "@property CGFloat alpha",
    doc: "View's opacity.",
    v: "objc",
    isField: true,
  },
  {
    label: "text",
    detail: "@property NSString *text",
    doc: "Text content.",
    v: "objc",
    isField: true,
  },
  {
    label: "superview",
    detail: "@property UIView *superview",
    doc: "Parent view.",
    v: "objc",
    isField: true,
  },
  {
    label: "subviews",
    detail: "@property NSArray *subviews",
    doc: "Child views.",
    v: "objc",
    isField: true,
  },
  {
    label: "localizedDescription",
    detail: "@property NSString *localizedDescription",
    doc: "Localized description.",
    v: "objc",
    isField: true,
  },
];

// ────────────────────────────────────────────────────────────────────
//  Signature help database
// ────────────────────────────────────────────────────────────────────

interface SigEntry {
  label: string;
  params: { label: string; documentation: string }[];
  doc: string;
  v?: FeatureTag;
}

const SIGNATURES: Record<string, SigEntry> = {
  sort: {
    label: "void std::sort(RandomIt first, RandomIt last, Compare comp = {})",
    params: [
      { label: "RandomIt first", documentation: "Beginning of range" },
      { label: "RandomIt last", documentation: "End of range" },
      { label: "Compare comp", documentation: "Comparison (optional)" },
    ],
    doc: "Sorts elements. O(n log n).",
    v: "cpp",
  },
  find: {
    label: "InputIt std::find(InputIt first, InputIt last, const T& value)",
    params: [
      { label: "InputIt first", documentation: "Beginning" },
      { label: "InputIt last", documentation: "End" },
      { label: "const T& value", documentation: "Value to find" },
    ],
    doc: "Finds first element equal to value.",
    v: "cpp",
  },
  accumulate: {
    label: "T std::accumulate(InputIt first, InputIt last, T init)",
    params: [
      { label: "InputIt first", documentation: "Beginning" },
      { label: "InputIt last", documentation: "End" },
      { label: "T init", documentation: "Initial value" },
    ],
    doc: "Computes sum/fold of a range.",
    v: "cpp",
  },
  transform: {
    label:
      "OutputIt std::transform(InputIt first, InputIt last, OutputIt d_first, UnaryOp op)",
    params: [
      { label: "InputIt first", documentation: "Input beginning" },
      { label: "InputIt last", documentation: "Input end" },
      { label: "OutputIt d_first", documentation: "Output beginning" },
      { label: "UnaryOp op", documentation: "Unary operation" },
    ],
    doc: "Applies function to a range.",
    v: "cpp",
  },
  getline: {
    label: "istream& std::getline(istream& is, string& str)",
    params: [
      { label: "istream& is", documentation: "Input stream" },
      { label: "string& str", documentation: "String to store line" },
    ],
    doc: "Reads a line.",
    v: "cpp",
  },
  make_shared: {
    label: "shared_ptr<T> std::make_shared<T>(Args&&... args)",
    params: [
      { label: "Args&&... args", documentation: "Constructor arguments" },
    ],
    doc: "Creates a shared_ptr.",
    v: "cpp",
  },
  make_unique: {
    label: "unique_ptr<T> std::make_unique<T>(Args&&... args)",
    params: [
      { label: "Args&&... args", documentation: "Constructor arguments" },
    ],
    doc: "Creates a unique_ptr.",
    v: "cpp",
  },
  printf: {
    label: "int printf(const char* format, ...)",
    params: [
      { label: "const char* format", documentation: "Format string" },
      { label: "...", documentation: "Arguments" },
    ],
    doc: "Formatted output to stdout.",
  },
  scanf: {
    label: "int scanf(const char* format, ...)",
    params: [
      { label: "const char* format", documentation: "Format string" },
      { label: "...", documentation: "Pointers to variables" },
    ],
    doc: "Formatted input from stdin.",
  },
  NSLog: {
    label: "void NSLog(NSString *format, ...)",
    params: [
      { label: "NSString *format", documentation: "Format string" },
      { label: "...", documentation: "Arguments" },
    ],
    doc: "Logs formatted message to console.",
    v: "objc",
  },
  NSMakeRange: {
    label: "NSRange NSMakeRange(NSUInteger loc, NSUInteger len)",
    params: [
      { label: "NSUInteger loc", documentation: "Location" },
      { label: "NSUInteger len", documentation: "Length" },
    ],
    doc: "Creates an NSRange.",
    v: "objc",
  },
  CGRectMake: {
    label: "CGRect CGRectMake(CGFloat x, CGFloat y, CGFloat w, CGFloat h)",
    params: [
      { label: "CGFloat x", documentation: "X origin" },
      { label: "CGFloat y", documentation: "Y origin" },
      { label: "CGFloat width", documentation: "Width" },
      { label: "CGFloat height", documentation: "Height" },
    ],
    doc: "Creates a CGRect.",
    v: "objc",
  },
  CGPointMake: {
    label: "CGPoint CGPointMake(CGFloat x, CGFloat y)",
    params: [
      { label: "CGFloat x", documentation: "X" },
      { label: "CGFloat y", documentation: "Y" },
    ],
    doc: "Creates a CGPoint.",
    v: "objc",
  },
  CGSizeMake: {
    label: "CGSize CGSizeMake(CGFloat width, CGFloat height)",
    params: [
      { label: "CGFloat width", documentation: "Width" },
      { label: "CGFloat height", documentation: "Height" },
    ],
    doc: "Creates a CGSize.",
    v: "objc",
  },
  dispatch_async: {
    label:
      "void dispatch_async(dispatch_queue_t queue, dispatch_block_t block)",
    params: [
      { label: "dispatch_queue_t queue", documentation: "Target queue" },
      { label: "dispatch_block_t block", documentation: "Block to execute" },
    ],
    doc: "Submits a block for async execution.",
    v: "objc",
  },
  dispatch_after: {
    label:
      "void dispatch_after(dispatch_time_t when, dispatch_queue_t queue, dispatch_block_t block)",
    params: [
      { label: "dispatch_time_t when", documentation: "Time to execute" },
      { label: "dispatch_queue_t queue", documentation: "Target queue" },
      { label: "dispatch_block_t block", documentation: "Block to execute" },
    ],
    doc: "Submits a block after a delay.",
    v: "objc",
  },
};

// ────────────────────────────────────────────────────────────────────
//  ObjC @ directives list (for @ completion)
// ────────────────────────────────────────────────────────────────────

const OBJC_AT_DIRECTIVES = [
  "@interface",
  "@implementation",
  "@protocol",
  "@end",
  "@class",
  "@property",
  "@synthesize",
  "@dynamic",
  "@selector",
  "@encode",
  "@autoreleasepool",
  "@synchronized",
  "@try",
  "@catch",
  "@finally",
  "@throw",
  "@optional",
  "@required",
  "@import",
  "@available",
];

// ────────────────────────────────────────────────────────────────────
//  std:: types that should get the "Add std::" code action
// ────────────────────────────────────────────────────────────────────

const STD_FIXABLE = [
  "vector",
  "map",
  "set",
  "string",
  "cout",
  "cin",
  "endl",
  "array",
  "deque",
  "list",
  "pair",
  "tuple",
  "optional",
  "variant",
  "shared_ptr",
  "unique_ptr",
  "sort",
  "find",
  "unordered_map",
  "unordered_set",
  "queue",
  "stack",
  "priority_queue",
];

// ────────────────────────────────────────────────────────────────────
//  ObjC object types that should get the "Add *" code action
// ────────────────────────────────────────────────────────────────────

const OBJC_OBJ_TYPES = [
  "NSObject",
  "NSString",
  "NSMutableString",
  "NSArray",
  "NSMutableArray",
  "NSDictionary",
  "NSMutableDictionary",
  "NSNumber",
  "NSValue",
  "NSData",
  "NSDate",
  "NSError",
  "NSURL",
  "NSSet",
  "NSMutableSet",
];

// ════════════════════════════════════════════════════════════════════
//  MAIN REGISTRATION FUNCTION
// ════════════════════════════════════════════════════════════════════

export default (monaco: typeof Monaco, variant: Variant) => {
  const LANG_ID = variant;
  const hasCpp = variant === "cpp" || variant === "objcpp";
  const hasObjC = variant === "objc" || variant === "objcpp";

  function matches(tag: FeatureTag): boolean {
    if (tag === "c") return true;
    if (tag === "cpp") return hasCpp;
    if (tag === "objc") return hasObjC;
    return false;
  }

  // ================================================================
  //  1. MONARCH TOKENIZER
  // ================================================================
  monaco.languages.register({ id: LANG_ID });

  const keywords = [
    ...C_KEYWORDS,
    ...(hasCpp ? CPP_KEYWORDS : []),
    ...(hasObjC ? OBJC_KEYWORDS : []),
  ];

  const typeKeywords = [
    ...C_TYPE_KEYWORDS,
    ...(hasCpp ? CPP_TYPE_KEYWORDS : []),
    ...(hasObjC ? OBJC_TYPE_KEYWORDS : []),
  ];

  const constants = [
    ...C_CONSTANTS,
    ...(hasCpp ? CPP_CONSTANTS : []),
    ...(hasObjC ? OBJC_CONSTANTS : []),
  ];

  const objcRootRules: any[] = hasObjC
    ? [
        [/@"/, "string", "@string_double"],
        [
          /@(?:interface|implementation|protocol|end|class|selector|encode|synchronized|autoreleasepool|try|catch|finally|throw|optional|required|dynamic|synthesize|property|compatibility_alias|available|import|package|defs|private|protected|public)\b/,
          "keyword",
        ],
        [/@(?:YES|NO|true|false)\b/, "constant"],
        [/@\d[\d.]*(?:[eE][\-+]?\d+)?/, "number"],
        [/@(?=[(\[{])/, "keyword.operator"],
        [/^\s*[+-]\s*(?=\()/, "keyword"],
      ]
    : [];

  monaco.languages.setMonarchTokensProvider(LANG_ID, {
    defaultToken: "",
    tokenPostfix: TOKEN_POSTFIX[variant],
    keywords,
    typeKeywords,
    constants,

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
      "->",
      "->*",
      "::",
      ".*",
      "...",
    ],

    symbols: /[=><!~?:&|+\-*\/\^%]+/,
    escapes:
      /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8}|[0-7]{1,3})/,
    integersuffix: /(ll|LL|u|U|l|L)?(ll|LL|u|U|l|L)?/,
    floatsuffix: /[fFlL]?/,

    tokenizer: {
      root: [
        ...objcRootRules,

        // Preprocessor
        [/^\s*#\s*\w+/, "keyword.directive"],

        // Identifiers and keywords
        [
          /[a-zA-Z_]\w*/,
          {
            cases: {
              "@keywords": "keyword",
              "@typeKeywords": "type",
              "@constants": "constant",
              "@default": "identifier",
            },
          },
        ],

        { include: "@whitespace" },

        // Delimiters
        [/[{}()\[\]]/, "@brackets"],
        [/[<>](?!@symbols)/, "@brackets"],

        // Operators
        [
          /@symbols/,
          {
            cases: {
              "@operators": "operator",
              "@default": "",
            },
          },
        ],

        // Numbers
        [/\d*\.\d+([eE][\-+]?\d+)?@floatsuffix/, "number.float"],
        [/0[xX][0-9a-fA-F]+@integersuffix/, "number.hex"],
        [/0[bB][01]+@integersuffix/, "number.binary"],
        [/0[0-7]+@integersuffix/, "number.octal"],
        [/\d+@integersuffix/, "number"],

        // Strings
        [/"([^"\\]|\\.)*$/, "string.invalid"],
        [/"/, "string", "@string_double"],
        [/'[^\\']'/, "string"],
        [/(')(@escapes)(')/, ["string", "string.escape", "string"]],
        [/'/, "string.invalid"],
      ],

      whitespace: [
        [/[ \t\r\n]+/, "white"],
        [/\/\*/, "comment", "@comment"],
        [/\/\/.*$/, "comment"],
      ],

      comment: [
        [/[^\/*]+/, "comment"],
        [/\*\//, "comment", "@pop"],
        [/[\/*]/, "comment"],
      ],

      string_double: [
        [/[^\\"]+/, "string"],
        [/@escapes/, "string.escape"],
        [/\\./, "string.escape.invalid"],
        [/"/, "string", "@pop"],
      ],
    },
  } as any);

  // ================================================================
  //  2. LANGUAGE CONFIGURATION
  // ================================================================
  monaco.languages.setLanguageConfiguration(LANG_ID, {
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
      { open: "'", close: "'", notIn: ["string", "comment"] },
    ],
    surroundingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: '"', close: '"' },
      { open: "'", close: "'" },
    ],
    folding: {
      markers: {
        start: hasObjC
          ? /^\s*(?:#pragma\s+region\b|@(?:interface|implementation|protocol)\b)/
          : /^\s*#pragma\s+region\b/,
        end: hasObjC
          ? /^\s*(?:#pragma\s+endregion\b|@end\b)/
          : /^\s*#pragma\s+endregion\b/,
      },
    },
    indentationRules: {
      increaseIndentPattern: /^.*\{[^}"']*$|^.*\([^)"']*$/,
      decreaseIndentPattern: /^\s*[}\)]/,
    },
    onEnterRules: [
      {
        beforeText: /^\s*\/\*\*(?!\/)([^\*]|\*(?!\/))*$/,
        afterText: /^\s*\*\/$/,
        action: {
          indentAction: monaco.languages.IndentAction.IndentOutdent,
          appendText: " * ",
        },
      },
      {
        beforeText: /^\s*\/\*\*(?!\/)([^\*]|\*(?!\/))*$/,
        action: {
          indentAction: monaco.languages.IndentAction.None,
          appendText: " * ",
        },
      },
      {
        beforeText: /^(\t|[ ])*[ ]\*([ ]([^\*]|\*(?!\/))*)?$/,
        action: {
          indentAction: monaco.languages.IndentAction.None,
          appendText: "* ",
        },
      },
    ],
  });

  // ================================================================
  //  3. SYMBOL PARSER
  // ================================================================
  const symbolCache = new Map<string, SymbolInfo[]>();

  function parseSymbols(code: string): SymbolInfo[] {
    const symbols: SymbolInfo[] = [];
    const lines = code.split("\n");

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNum = i + 1;
      let cleaned = line
        .replace(/\/\/.*$/, "")
        .replace(/"(?:[^"\\]|\\.)*"/g, '""')
        .replace(/'(?:[^'\\]|\\.)*'/g, "''")
        .replace(/@"(?:[^"\\]|\\.)*"/g, '@""');

      let m: RegExpMatchArray | null;

      // ── ObjC @interface ──
      if (hasObjC) {
        m = cleaned.match(
          /^\s*@interface\s+([a-zA-Z_]\w*)\s*(?:\(([a-zA-Z_]\w*)?\))?(?:\s*:\s*([a-zA-Z_]\w*))?/,
        );
        if (m) {
          const col = line.indexOf(m[1]) + 1;
          const category = m[2];
          let kind = "class";
          let name = m[1];
          if (m[0].includes("(")) {
            kind = category ? "category" : "extension";
            name = category ? `${m[1]} (${category})` : `${m[1]} ()`;
          }
          symbols.push({ name, kind, superclass: m[3], line: lineNum, col });
          continue;
        }

        // ── ObjC @implementation ──
        m = cleaned.match(
          /^\s*@implementation\s+([a-zA-Z_]\w*)(?:\s*\(([a-zA-Z_]\w*)?\))?/,
        );
        if (m) {
          const col = line.indexOf(m[1]) + 1;
          symbols.push({
            name: m[2] ? `${m[1]} (${m[2]})` : m[1],
            kind: "implementation",
            line: lineNum,
            col,
          });
          continue;
        }

        // ── ObjC @protocol ──
        m = cleaned.match(/^\s*@protocol\s+([a-zA-Z_]\w*)\s*(?:[<;]|$)/);
        if (m) {
          const col = line.indexOf(m[1]) + 1;
          symbols.push({ name: m[1], kind: "protocol", line: lineNum, col });
          continue;
        }

        // ── ObjC method ──
        m = cleaned.match(/^\s*([+-])\s*\(([^)]+)\)\s*(\w+)/);
        if (m) {
          const afterSign = cleaned.substring(cleaned.indexOf(m[3]));
          const selRe = /([a-zA-Z_]\w*)\s*:/g;
          const parts: string[] = [];
          let sm: RegExpExecArray | null;
          while ((sm = selRe.exec(afterSign)) !== null) parts.push(sm[1]);
          const selector = parts.length > 0 ? parts.join(":") + ":" : m[3];
          const col = line.indexOf(m[3]) + 1;
          symbols.push({
            name: selector,
            kind: m[1] === "+" ? "class_method" : "method",
            returnType: m[2].trim(),
            line: lineNum,
            col,
          });
          continue;
        }

        // ── ObjC @property ──
        m = cleaned.match(
          /^\s*@property\s*(?:\(([^)]*)\))?\s*(.+?)\s+\*?\s*([a-zA-Z_]\w*)\s*;/,
        );
        if (m) {
          const col = line.indexOf(m[3]) + 1;
          symbols.push({
            name: m[3],
            kind: "property",
            type: m[2].trim(),
            attributes: m[1]?.trim(),
            line: lineNum,
            col,
          });
          continue;
        }
      }

      // ── C / C++ function definitions ──
      m = cleaned.match(
        /^\s*(?:(?:static|inline|virtual|constexpr|explicit|friend|const|volatile|unsigned|signed|long|short)\s+)*([a-zA-Z_][\w:*&<>, ]*?)\s+([a-zA-Z_]\w*)\s*\(([^)]*)\)\s*(?:const)?\s*(?:noexcept)?\s*(?:override)?\s*(?:final)?\s*\{?\s*$/,
      );
      if (
        m &&
        ![
          "if",
          "else",
          "for",
          "while",
          "do",
          "switch",
          "catch",
          "return",
          "case",
          "throw",
        ].includes(m[2])
      ) {
        const col = line.indexOf(m[2]) + 1;
        symbols.push({
          name: m[2],
          kind: "function",
          returnType: m[1].trim(),
          params: m[3].trim(),
          line: lineNum,
          col,
        });
        continue;
      }

      // ── class / struct / enum ──
      m = cleaned.match(
        /^\s*(class|struct|enum\s+class|enum)\s+([a-zA-Z_]\w*)/,
      );
      if (m) {
        const col = line.indexOf(m[2]) + 1;
        symbols.push({
          name: m[2],
          kind: m[1].replace(/\s+/g, "_"),
          line: lineNum,
          col,
        });
        continue;
      }

      // ── namespace ──
      if (hasCpp) {
        m = cleaned.match(/^\s*namespace\s+([a-zA-Z_]\w*)/);
        if (m) {
          const col = line.indexOf(m[1]) + 1;
          symbols.push({ name: m[1], kind: "namespace", line: lineNum, col });
          continue;
        }
      }

      // ── typedef / using ──
      m = cleaned.match(
        /^\s*(?:typedef\s+.+\s+([a-zA-Z_]\w*)\s*;|using\s+([a-zA-Z_]\w*)\s*=)/,
      );
      if (m) {
        const name = m[1] || m[2];
        const col = line.indexOf(name) + 1;
        symbols.push({ name, kind: "typedef", line: lineNum, col });
        continue;
      }

      // ── #define ──
      m = cleaned.match(
        /^\s*#\s*define\s+([a-zA-Z_]\w*)(?:\(([^)]*)\))?\s*(.*)?/,
      );
      if (m) {
        const col = line.indexOf(m[1]) + 1;
        symbols.push({
          name: m[1],
          kind: "macro",
          params: m[2],
          value: m[3],
          line: lineNum,
          col,
        });
        continue;
      }

      // ── Variable declarations ──
      const varQualifiers = hasObjC
        ? "(?:static|const|constexpr|inline|extern|thread_local|volatile|unsigned|signed|long|short|auto|__weak|__strong|__block)"
        : "(?:static|const|constexpr|inline|extern|thread_local|volatile|unsigned|signed|long|short|auto)";
      const varRe = new RegExp(
        `^\\s*(?:${varQualifiers}\\s+)*([a-zA-Z_][\\w:*&<>, ]+?)\\s+([a-zA-Z_]\\w*)\\s*[=;{(]`,
      );
      m = cleaned.match(varRe);
      if (
        m &&
        ![
          "if",
          "else",
          "for",
          "while",
          "do",
          "switch",
          "catch",
          "return",
          "case",
          "throw",
          "class",
          "struct",
          "enum",
          "namespace",
          "template",
          "using",
          "typedef",
          "delete",
          "new",
          "public",
          "private",
          "protected",
        ].includes(m[2])
      ) {
        const col = line.indexOf(m[2]) + 1;
        symbols.push({
          name: m[2],
          kind: "variable",
          type: m[1].trim(),
          line: lineNum,
          col,
        });
      }
    }
    return symbols;
  }

  function getSymbols(model: Monaco.editor.ITextModel): SymbolInfo[] {
    const uri = model.uri.toString();
    let syms = symbolCache.get(uri);
    if (!syms) {
      syms = parseSymbols(model.getValue());
      symbolCache.set(uri, syms);
    }
    return syms;
  }

  function updateSymbols(model: Monaco.editor.ITextModel) {
    symbolCache.set(model.uri.toString(), parseSymbols(model.getValue()));
  }

  // ================================================================
  //  4. COMPLETION PROVIDER
  // ================================================================
  monaco.languages.registerCompletionItemProvider(LANG_ID, {
    triggerCharacters: [".", ":", "<", "#", '"', ...(hasObjC ? ["@"] : [])],
    provideCompletionItems(model, position) {
      const textUntil = model.getValueInRange({
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
      const suggestions: any[] = [];

      // ── @ directives (ObjC) ──
      if (hasObjC) {
        const atMatch = textUntil.match(/@(\w*)$/);
        if (atMatch) {
          const atCol = position.column - atMatch[0].length;
          const atRange = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: atCol,
            endColumn: position.column,
          };
          OBJC_AT_DIRECTIVES.forEach((d) => {
            const info = DOCS[d];
            suggestions.push({
              label: d,
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: d,
              range: atRange,
              detail: info ? info.detail : "Objective-C Directive",
              documentation: info ? { value: info.doc } : undefined,
              sortText: "0_" + d,
            });
          });
          ["@YES", "@NO", "@true", "@false"].forEach((c) => {
            suggestions.push({
              label: c,
              kind: monaco.languages.CompletionItemKind.Constant,
              insertText: c,
              range: atRange,
              detail: "Objective-C Boolean Literal",
              sortText: "0_" + c,
            });
          });
          return { suggestions };
        }
      }

      // ── Preprocessor ──
      if (textUntil.match(/^\s*#/)) {
        const directives = [
          "#include",
          "#define",
          "#undef",
          "#ifdef",
          "#ifndef",
          "#if",
          "#elif",
          "#else",
          "#endif",
          "#pragma",
          "#error",
          "#warning",
          "#line",
          ...(hasObjC ? ["#import"] : []),
        ];
        directives.forEach((p) => {
          suggestions.push({
            label: p,
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: p.replace("#", ""),
            range,
            detail: "Preprocessor directive",
          });
        });
        if (textUntil.match(/#\s*(?:include|import)\s*</)) {
          const headers = [
            ...C_HEADERS,
            ...(hasCpp ? CPP_HEADERS : []),
            ...(hasObjC ? OBJC_FRAMEWORKS : []),
          ];
          headers.forEach((h) => {
            suggestions.push({
              label: h,
              kind: monaco.languages.CompletionItemKind.File,
              insertText: h + ">",
              range,
              detail: `<${h}>`,
            });
          });
        }
        return { suggestions };
      }

      // ── After std:: (C++) ──
      if (hasCpp && textUntil.match(/std\s*::\s*\w*$/)) {
        STD_ITEMS.forEach((item) => {
          const info = DOCS[item];
          suggestions.push({
            label: item,
            kind: STD_CLASS_TYPES.has(item)
              ? monaco.languages.CompletionItemKind.Class
              : monaco.languages.CompletionItemKind.Function,
            insertText: item,
            range,
            detail: info ? info.detail : `std::${item}`,
            documentation: info ? { value: info.doc } : undefined,
            sortText: "0_" + item,
          });
        });
        return { suggestions };
      }

      // ── Member access (. or ->) ──
      if (textUntil.match(/\.\s*\w*$/) || textUntil.match(/->\s*\w*$/)) {
        MEMBER_METHODS.filter((m) => matches(m.v)).forEach((m) => {
          suggestions.push({
            label: m.label,
            kind: m.isField
              ? monaco.languages.CompletionItemKind.Field
              : monaco.languages.CompletionItemKind.Method,
            insertText: m.label,
            range,
            detail: m.detail,
            documentation: { value: m.doc },
          });
        });
        return { suggestions };
      }

      // ── Snippets ──
      SNIPPETS.filter((s) => matches(s.v ?? "c")).forEach((s) => {
        suggestions.push({
          label: s.label,
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: s.insertText,
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range,
          detail: s.detail,
          documentation: { value: s.doc },
          sortText: "1_" + s.label,
        });
      });

      // ── Keywords ──
      const kws = [
        ...C_KEYWORDS,
        ...(hasCpp ? CPP_KEYWORDS : []),
        ...(hasObjC ? OBJC_KEYWORDS : []),
      ];
      kws.forEach((kw) => {
        const info = DOCS[kw];
        suggestions.push({
          label: kw,
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: kw,
          range,
          detail: info ? info.detail : "Keyword",
          documentation: info ? { value: info.doc } : undefined,
          sortText: "2_" + kw,
        });
      });

      // ── Type keywords ──
      const tks = [
        ...C_TYPE_KEYWORDS,
        ...(hasCpp ? CPP_TYPE_KEYWORDS : []),
        ...(hasObjC ? OBJC_TYPE_KEYWORDS : []),
      ];
      tks.forEach((t) => {
        const info = DOCS[t];
        suggestions.push({
          label: t,
          kind: monaco.languages.CompletionItemKind.TypeParameter,
          insertText: t,
          range,
          detail: info ? info.detail : "Type",
          documentation: info ? { value: info.doc } : undefined,
          sortText: "3_" + t,
        });
      });

      // ── ObjC functions ──
      if (hasObjC) {
        OBJC_FUNCTIONS.forEach((f) => {
          const info = DOCS[f];
          suggestions.push({
            label: f,
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: f,
            range,
            detail: info ? info.detail : "Function",
            documentation: info ? { value: info.doc } : undefined,
            sortText: "3_" + f,
          });
        });
      }

      // ── User-defined symbols ──
      const syms = getSymbols(model);
      syms.forEach((sym) => {
        let kind;
        switch (sym.kind) {
          case "function":
            kind = monaco.languages.CompletionItemKind.Function;
            break;
          case "class":
          case "struct":
          case "implementation":
            kind = monaco.languages.CompletionItemKind.Class;
            break;
          case "enum":
          case "enum_class":
            kind = monaco.languages.CompletionItemKind.Enum;
            break;
          case "namespace":
            kind = monaco.languages.CompletionItemKind.Module;
            break;
          case "macro":
            kind = monaco.languages.CompletionItemKind.Constant;
            break;
          case "typedef":
            kind = monaco.languages.CompletionItemKind.Interface;
            break;
          case "protocol":
            kind = monaco.languages.CompletionItemKind.Interface;
            break;
          case "method":
          case "class_method":
            kind = monaco.languages.CompletionItemKind.Method;
            break;
          case "property":
            kind = monaco.languages.CompletionItemKind.Property;
            break;
          case "category":
          case "extension":
            kind = monaco.languages.CompletionItemKind.Class;
            break;
          default:
            kind = monaco.languages.CompletionItemKind.Variable;
        }
        let detail = sym.kind;
        if (sym.returnType) {
          const prefix =
            sym.kind === "class_method"
              ? "+"
              : sym.kind === "method"
                ? "-"
                : "";
          detail = prefix
            ? `${prefix} (${sym.returnType}) ${sym.name}`
            : `${sym.returnType} ${sym.name}(${sym.params || ""})`;
        } else if (sym.type) {
          detail = `${sym.type} ${sym.name}`;
        } else if (sym.superclass) {
          detail = `${sym.kind} : ${sym.superclass}`;
        }

        suggestions.push({
          label: sym.name,
          kind,
          insertText: sym.name,
          range,
          detail,
          documentation: { value: `Defined at line ${sym.line}` },
          sortText: "0_" + sym.name,
        });
      });

      return { suggestions };
    },
  });

  // ================================================================
  //  5. HOVER PROVIDER
  // ================================================================
  monaco.languages.registerHoverProvider(LANG_ID, {
    provideHover(model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return null;

      let token = word.word;
      let startCol = word.startColumn;

      // Check for preceding @
      if (hasObjC && startCol > 1) {
        const charBefore = model.getValueInRange({
          startLineNumber: position.lineNumber,
          startColumn: startCol - 1,
          endLineNumber: position.lineNumber,
          endColumn: startCol,
        });
        if (charBefore === "@") {
          token = "@" + token;
          startCol -= 1;
        }
      }

      const hoverRange = new monaco.Range(
        position.lineNumber,
        startCol,
        position.lineNumber,
        word.endColumn,
      );

      // Knowledge base
      const info = DOCS[token];
      if (info && matches(info.v ?? "c")) {
        return {
          range: hoverRange,
          contents: [{ value: `**${info.detail}**` }, { value: info.doc }],
        };
      }

      // User symbols
      const sym = getSymbols(model).find((s) => s.name === token);
      if (sym) {
        let sig = "";
        switch (sym.kind) {
          case "function":
            sig = `\`\`\`cpp\n${sym.returnType || ""} ${sym.name}(${sym.params || ""})\n\`\`\``;
            break;
          case "class":
          case "struct":
            sig = `\`\`\`cpp\n${sym.kind} ${sym.name}${sym.superclass ? " : " + sym.superclass : ""}\n\`\`\``;
            break;
          case "enum":
          case "enum_class":
            sig = `\`\`\`cpp\nenum ${sym.kind === "enum_class" ? "class " : ""}${sym.name}\n\`\`\``;
            break;
          case "namespace":
            sig = `\`\`\`cpp\nnamespace ${sym.name}\n\`\`\``;
            break;
          case "macro":
            sig = `\`\`\`cpp\n#define ${sym.name}${sym.params !== undefined ? "(" + (sym.params || "") + ")" : ""}${sym.value ? " " + sym.value : ""}\n\`\`\``;
            break;
          case "typedef":
            sig = `\`\`\`cpp\ntypedef/using ${sym.name}\n\`\`\``;
            break;
          case "variable":
            sig = `\`\`\`cpp\n${sym.type || "auto"} ${sym.name}\n\`\`\``;
            break;
          case "method":
          case "class_method":
            sig = `\`\`\`objc\n${sym.kind === "class_method" ? "+" : "-"} (${sym.returnType || "void"})${sym.name}\n\`\`\``;
            break;
          case "property":
            sig = `\`\`\`objc\n@property${sym.attributes ? " (" + sym.attributes + ")" : ""} ${sym.type || "id"} ${sym.name}\n\`\`\``;
            break;
          case "protocol":
            sig = `\`\`\`objc\n@protocol ${sym.name}\n\`\`\``;
            break;
          case "category":
          case "extension":
          case "implementation":
            sig = `\`\`\`objc\n@${sym.kind === "implementation" ? "implementation" : "interface"} ${sym.name}\n\`\`\``;
            break;
          default:
            sig = `\`\`\`\n${sym.name}\n\`\`\``;
        }
        return {
          range: hoverRange,
          contents: [
            { value: sig },
            { value: `*Defined at line ${sym.line}*` },
          ],
        };
      }

      return null;
    },
  });

  // ================================================================
  //  6. DEFINITION PROVIDER
  // ================================================================
  // ─── Binding resolution (shared by the definition and rename providers) ───
  // Resolves the name under the cursor to its block-local binding: every
  // occurrence bound to it, plus the occurrence that declares it. Names with no
  // block-local binding (members, globals) report `local: false` so callers can
  // keep their document-wide behaviour.
  const resolveBinding = (
    model: Monaco.editor.ITextModel,
    position: Monaco.Position,
  ) => {
    const word = model.getWordAtPosition(position);
    if (!word) return null;
    const name = word.word;

    const lines = model.getLinesContent();
    const lineStart: number[] = [];
    let total = 0;
    for (let i = 0; i < lines.length; i++) {
      lineStart.push(total);
      total += lines[i].length + 1;
    }
    const at = (line: number, col: number) => lineStart[line] + col;
    const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    // A brace opening a type body: names declared directly inside are members,
    // not locals.
    const isTypeBody = (prefix: string) =>
      /\b(class|struct|union|interface|namespace|enum)\b/.test(prefix);

    type Scope = {
      start: number;
      end: number;
      type: boolean;
      names: Set<string>;
    };
    const scopes: Scope[] = [];
    const open: Scope[] = [];
    for (let i = 0; i < lines.length; i++) {
      for (let c = 0; c < lines[i].length; c++) {
        if (lines[i][c] === "{") {
          const scope: Scope = {
            start: at(i, c),
            end: Infinity,
            type: isTypeBody(lines[i].slice(0, c)),
            names: new Set<string>(),
          };
          scopes.push(scope);
          open.push(scope);
        } else if (lines[i][c] === "}") {
          const scope = open.pop();
          if (scope) scope.end = at(i, c);
        }
      }
    }
    const eof = at(lines.length - 1, lines[lines.length - 1].length);
    for (const scope of open) scope.end = eof;

    // Innermost scope containing `offset` (geometry only).
    const enclosing = (offset: number) => {
      let found: Scope | undefined;
      for (const scope of scopes) {
        if (scope.start <= offset && offset <= scope.end) {
          if (!found || scope.start > found.start) found = scope;
        }
      }
      return found;
    };
    // Innermost enclosing scope that declares `name` — the name's binding.
    const declaring = (offset: number) => {
      let found: Scope | undefined;
      for (const scope of scopes) {
        if (
          scope.start <= offset &&
          offset <= scope.end &&
          scope.names.has(name)
        ) {
          if (!found || scope.start > found.start) found = scope;
        }
      }
      return found;
    };
    // First scope opening at or after `offset` (a signature's body).
    const nextScope = (offset: number) => {
      let found: Scope | undefined;
      for (const scope of scopes) {
        if (scope.start >= offset && (!found || scope.start < found.start))
          found = scope;
      }
      return found;
    };

    // Local declarations: typed locals, for-range bindings and parameters.
    const declaration = new RegExp(
      "\\b(?:auto|const|static|unsigned|signed|short|long|int|char|float|double|bool|void|size_t|wchar_t|id|instancetype|std::\\w+|[A-Z][A-Za-z0-9_]*(?:::\\w+)*)(?:\\s*<[^;{}()]*>)?[\\s*&]+" +
        esc(name) +
        "\\s*[=;,)\\[\\]{:]",
      "g",
    );
    const declarations: { start: number; end: number; scope?: Scope }[] = [];
    for (let i = 0; i < lines.length; i++) {
      declaration.lastIndex = 0;
      let m;
      while ((m = declaration.exec(lines[i])) !== null) {
        // A name in a parameter list binds to the body that follows it, not to
        // the scope the signature text sits in.
        const before = lines[i].slice(0, m.index).replace(/\s+$/, "");
        const isParam =
          /^[(,|[{[]/.test(m[0]) || before.endsWith("(") || before.endsWith(",");
        const owner = isParam
          ? nextScope(at(i, m.index))
          : enclosing(at(i, m.index));
        const scope = owner && !owner.type ? owner : undefined;
        if (scope) scope.names.add(name);
        declarations.push({
          start: at(i, m.index),
          end: at(i, m.index) + m[0].length,
          scope,
        });
      }
    }

    // Resolve a name span to its binding: declarations use their own scope,
    // plain references the innermost enclosing declaration of the name.
    const resolve = (start: number, end: number) => {
      for (const decl of declarations) {
        if (decl.start <= start && end <= decl.end) return decl.scope;
      }
      return declaring(start);
    };

    const cursorLine = position.lineNumber - 1;
    const cursor = resolve(
      at(cursorLine, word.startColumn - 1),
      at(cursorLine, word.endColumn - 1),
    );
    const targetStart = cursor ? cursor.start : -1;
    const decl =
      targetStart === -1
        ? undefined
        : declarations.find((d) => d.scope && d.scope.start === targetStart);

    // Every occurrence bound to the same binding, and the one declaring it.
    type Occurrence = { line: number; startColumn: number; endColumn: number };
    const occurrences: Occurrence[] = [];
    let declarationRange: Occurrence | null = null;
    const occurrence = new RegExp("\\b" + esc(name) + "\\b", "g");
    for (let i = 0; i < lines.length; i++) {
      occurrence.lastIndex = 0;
      let m;
      while ((m = occurrence.exec(lines[i])) !== null) {
        const start = at(i, m.index);
        const end = start + name.length;
        const scope = resolve(start, end);
        if ((scope ? scope.start : -1) !== targetStart) continue;
        if (targetStart !== -1) {
          const before = lines[i].slice(0, m.index).replace(/\s+$/, "");
          if (
            before.endsWith(".") ||
            before.endsWith("->") ||
            before.endsWith("::")
          )
            continue;
        }
        const range: Occurrence = {
          line: i + 1,
          startColumn: m.index + 1,
          endColumn: m.index + 1 + name.length,
        };
        occurrences.push(range);
        if (decl && decl.start <= start && end <= decl.end)
          declarationRange = range;
      }
    }

    return {
      name,
      local: targetStart !== -1,
      declaration: declarationRange,
      occurrences,
    };
  };

  monaco.languages.registerDefinitionProvider(LANG_ID, {
    provideDefinition(model, position) {
      // A block-local resolves to its own declaration, not the first match.
      const binding = resolveBinding(model, position);
      if (binding && binding.local) {
        if (!binding.declaration) return null;
        const d = binding.declaration;
        return {
          uri: model.uri,
          range: new monaco.Range(d.line, d.startColumn, d.line, d.endColumn),
        };
      }
      const word = model.getWordAtPosition(position);
      if (!word) return null;

      const syms = getSymbols(model);
      const sym =
        syms.find((s) => s.name === word.word) ||
        syms.find(
          (s) =>
            (s.kind === "method" || s.kind === "class_method") &&
            s.name.startsWith(word.word),
        );
      if (sym) {
        return {
          uri: model.uri,
          range: new monaco.Range(
            sym.line,
            sym.col,
            sym.line,
            sym.col +
              (sym.name.includes(":") ? word.word.length : sym.name.length),
          ),
        };
      }
      return null;
    },
  });

  // ================================================================
  //  7. SIGNATURE HELP PROVIDER
  // ================================================================
  monaco.languages.registerSignatureHelpProvider(LANG_ID, {
    signatureHelpTriggerCharacters: ["(", ","],
    provideSignatureHelp(model, position) {
      const textUntil = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });

      const match = textUntil.match(/([a-zA-Z_]\w*)\s*\(([^)]*)$/);
      if (!match) return null;

      const funcName = match[1];
      const activeParam = (match[2].match(/,/g) || []).length;

      // User symbols
      const sym = getSymbols(model).find(
        (s) => s.name === funcName && s.kind === "function",
      );
      if (sym) {
        const params = (sym.params || "")
          .split(",")
          .map((p: string) => p.trim())
          .filter(Boolean);
        return {
          value: {
            signatures: [
              {
                label: `${sym.returnType || "void"} ${sym.name}(${sym.params || ""})`,
                parameters: params.map((p: string) => ({
                  label: p,
                  documentation: "",
                })),
                documentation: `Defined at line ${sym.line}`,
              },
            ],
            activeSignature: 0,
            activeParameter: activeParam,
          },
          dispose() {},
        };
      }

      // Built-in signatures
      const bsig = SIGNATURES[funcName];
      if (bsig && matches(bsig.v ?? "c")) {
        return {
          value: {
            signatures: [
              {
                label: bsig.label,
                parameters: bsig.params,
                documentation: bsig.doc,
              },
            ],
            activeSignature: 0,
            activeParameter: activeParam,
          },
          dispose() {},
        };
      }

      return null;
    },
  });

  // ================================================================
  //  8. DOCUMENT SYMBOL PROVIDER
  // ================================================================
  monaco.languages.registerDocumentSymbolProvider(LANG_ID, {
    provideDocumentSymbols(model) {
      updateSymbols(model);
      return getSymbols(model).map((sym) => {
        let kind;
        switch (sym.kind) {
          case "function":
            kind = monaco.languages.SymbolKind.Function;
            break;
          case "class":
          case "implementation":
          case "category":
          case "extension":
            kind = monaco.languages.SymbolKind.Class;
            break;
          case "struct":
            kind = monaco.languages.SymbolKind.Struct;
            break;
          case "enum":
          case "enum_class":
            kind = monaco.languages.SymbolKind.Enum;
            break;
          case "namespace":
            kind = monaco.languages.SymbolKind.Namespace;
            break;
          case "macro":
            kind = monaco.languages.SymbolKind.Constant;
            break;
          case "typedef":
          case "protocol":
            kind = monaco.languages.SymbolKind.Interface;
            break;
          case "method":
          case "class_method":
            kind = monaco.languages.SymbolKind.Method;
            break;
          case "property":
            kind = monaco.languages.SymbolKind.Property;
            break;
          case "variable":
            kind = monaco.languages.SymbolKind.Variable;
            break;
          default:
            kind = monaco.languages.SymbolKind.Variable;
        }
        const r = new monaco.Range(
          sym.line,
          sym.col,
          sym.line,
          sym.col + sym.name.length,
        );
        return {
          name: sym.name,
          detail: sym.kind,
          kind,
          range: r,
          selectionRange: r,
        };
      });
    },
  });

  // ================================================================
  //  9. CODE ACTION PROVIDER
  // ================================================================
  monaco.languages.registerCodeActionProvider(LANG_ID, {
    provideCodeActions(model, range) {
      const actions: any[] = [];
      const word = model.getWordAtPosition({
        lineNumber: range.startLineNumber,
        column: range.startColumn,
      });
      if (!word) return { actions, dispose() {} };

      // Suggest std:: prefix (C++)
      if (hasCpp && STD_FIXABLE.includes(word.word)) {
        const lineText = model.getLineContent(range.startLineNumber);
        const before = lineText.substring(0, word.startColumn - 1);
        if (!before.endsWith("std::") && !before.endsWith("::")) {
          actions.push({
            title: `Add std:: prefix → std::${word.word}`,
            kind: "quickfix",
            edit: {
              edits: [
                {
                  resource: model.uri,
                  textEdit: {
                    range: new monaco.Range(
                      range.startLineNumber,
                      word.startColumn,
                      range.startLineNumber,
                      word.endColumn,
                    ),
                    text: `std::${word.word}`,
                  },
                  versionId: model.getVersionId(),
                },
              ],
            },
          });
        }
      }

      // Suggest adding * for ObjC object types
      if (hasObjC && OBJC_OBJ_TYPES.includes(word.word)) {
        const lineText = model.getLineContent(range.startLineNumber);
        const after = lineText.substring(word.endColumn - 1).trim();
        if (after.length > 0 && after[0] !== "*" && after[0] !== "<") {
          actions.push({
            title: `Add pointer → ${word.word} *`,
            kind: "quickfix",
            edit: {
              edits: [
                {
                  resource: model.uri,
                  textEdit: {
                    range: new monaco.Range(
                      range.startLineNumber,
                      word.endColumn,
                      range.startLineNumber,
                      word.endColumn,
                    ),
                    text: " *",
                  },
                  versionId: model.getVersionId(),
                },
              ],
            },
          });
        }
      }

      return { actions, dispose() {} };
    },
  });

  // ================================================================
  //  10. FOLDING RANGE PROVIDER
  // ================================================================
  monaco.languages.registerFoldingRangeProvider(LANG_ID, {
    provideFoldingRanges(model) {
      const ranges: any[] = [];
      const lines = model.getLinesContent();
      const stack: { start: number; kind: any; type: string }[] = [];

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // #pragma region
        if (line.match(/^\s*#pragma\s+region/)) {
          stack.push({
            start: i + 1,
            kind: monaco.languages.FoldingRangeKind.Region,
            type: "pragma",
          });
        }
        if (line.match(/^\s*#pragma\s+endregion/)) {
          for (let j = stack.length - 1; j >= 0; j--) {
            if (stack[j].type === "pragma") {
              ranges.push({
                start: stack[j].start,
                end: i + 1,
                kind: stack[j].kind,
              });
              stack.splice(j, 1);
              break;
            }
          }
        }

        // @interface / @implementation / @protocol ... @end
        if (
          hasObjC &&
          line.match(/^\s*@(?:interface|implementation|protocol)\b/)
        ) {
          stack.push({
            start: i + 1,
            kind: monaco.languages.FoldingRangeKind.Region,
            type: "objc-block",
          });
        }
        if (hasObjC && line.match(/^\s*@end\b/)) {
          for (let j = stack.length - 1; j >= 0; j--) {
            if (stack[j].type === "objc-block") {
              ranges.push({
                start: stack[j].start,
                end: i + 1,
                kind: stack[j].kind,
              });
              stack.splice(j, 1);
              break;
            }
          }
        }

        // Block comments
        if (line.match(/\/\*/) && !line.match(/\*\//)) {
          stack.push({
            start: i + 1,
            kind: monaco.languages.FoldingRangeKind.Comment,
            type: "comment",
          });
        }
        if (
          line.match(/\*\//) &&
          stack.length > 0 &&
          stack[stack.length - 1].type === "comment"
        ) {
          const item = stack.pop()!;
          ranges.push({ start: item.start, end: i + 1, kind: item.kind });
        }
      }
      return ranges;
    },
  });

  // ─── Rename Provider (scope-aware) ──────────────────────────────────
  monaco.languages.registerRenameProvider(LANG_ID, {
    provideRenameEdits: function (model, position, newName) {
      const binding = resolveBinding(model, position);
      if (!binding) return null;
      return {
        edits: binding.occurrences.map((r) => ({
          resource: model.uri,
          versionId: model.getVersionId(),
          textEdit: {
            range: new monaco.Range(r.line, r.startColumn, r.line, r.endColumn),
            text: newName,
          },
        })),
      };
    },
    resolveRenameLocation: function (model, position) {
      const word = model.getWordAtPosition(position);
      if (!word) return { rejectReason: "Cannot rename this element." };
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
