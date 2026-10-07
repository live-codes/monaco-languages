import type * as Monaco from "monaco-editor";

export default (monaco: typeof Monaco) => {
  // ===== 1. REGISTER LANGUAGE =====
  monaco.languages.register({
    id: "flutter",
    extensions: [".dart"],
    aliases: ["Flutter", "flutter", "Dart", "dart"],
    mimetypes: ["application/dart", "text/x-dart"],
  });

  // ===== 2. LANGUAGE CONFIGURATION =====
  monaco.languages.setLanguageConfiguration("flutter", {
    comments: { lineComment: "//", blockComment: ["/*", "*/"] },
    brackets: [
      ["{", "}"],
      ["[", "]"],
      ["(", ")"],
      // Angle brackets are intentionally excluded: they collide with operators
      // such as `=>`/`->`/`>` and generics, causing false unexpected-bracket red.
      // ["<", ">"],
    ],
    autoClosingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: "<", close: ">" },
      { open: "'", close: "'", notIn: ["string", "comment"] },
      { open: '"', close: '"', notIn: ["string"] },
      { open: "/**", close: " */", notIn: ["string"] },
    ],
    surroundingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: "<", close: ">" },
      { open: "'", close: "'" },
      { open: '"', close: '"' },
    ],
    folding: {
      markers: {
        start: /^\s*\/\/\s*#?region\b/,
        end: /^\s*\/\/\s*#?endregion\b/,
      },
    },
    indentationRules: {
      increaseIndentPattern: /^((?!\/\/).)*(\{[^}"']*|\([^)"']*|\[[^\]"']*)$/,
      decreaseIndentPattern: /^((?!.*?\/\*).*\*\/)?\s*[}\])]/,
    },
    onEnterRules: [
      {
        beforeText: /^\s*\/\/\/.*$/,
        action: {
          indentAction: monaco.languages.IndentAction.None,
          appendText: "/// ",
        },
      },
      {
        beforeText: /^\s*\/\*\*(?!\/)([^*]|\*(?!\/))*$/,
        afterText: /^\s*\*\/$/,
        action: {
          indentAction: monaco.languages.IndentAction.IndentOutdent,
          appendText: " * ",
        },
      },
      {
        beforeText: /^\s*\/\*\*(?!\/)([^*]|\*(?!\/))*$/,
        action: {
          indentAction: monaco.languages.IndentAction.None,
          appendText: " * ",
        },
      },
    ],
    wordPattern:
      /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
  });

  // ===== 3. MONARCH TOKENIZER (Syntax Highlighting) =====
  // Flutter is written in Dart, so the tokenizer is the Dart grammar.
  monaco.languages.setMonarchTokensProvider("flutter", {
    defaultToken: "",
    tokenPostfix: ".dart",
    keywords: [
      "abstract",
      "as",
      "assert",
      "async",
      "await",
      "base",
      "break",
      "case",
      "catch",
      "class",
      "const",
      "continue",
      "covariant",
      "default",
      "deferred",
      "do",
      "dynamic",
      "else",
      "enum",
      "export",
      "extends",
      "extension",
      "external",
      "factory",
      "false",
      "final",
      "finally",
      "for",
      "Function",
      "get",
      "hide",
      "if",
      "implements",
      "import",
      "in",
      "interface",
      "is",
      "late",
      "library",
      "mixin",
      "new",
      "null",
      "of",
      "on",
      "operator",
      "part",
      "required",
      "rethrow",
      "return",
      "sealed",
      "set",
      "show",
      "static",
      "super",
      "switch",
      "sync",
      "this",
      "throw",
      "true",
      "try",
      "typedef",
      "var",
      "void",
      "when",
      "while",
      "with",
      "yield",
    ],
    typeKeywords: [
      "int",
      "double",
      "num",
      "String",
      "bool",
      "List",
      "Map",
      "Set",
      "Future",
      "Stream",
      "Iterable",
      "Object",
      "Null",
      "Never",
      "Type",
      "Symbol",
      "BigInt",
      "DateTime",
      "Duration",
      "RegExp",
      "Uri",
      "Comparable",
      "Pattern",
      "Match",
      "Record",
      "dynamic",
      "FutureOr",
      "Completer",
      "StreamController",
      "StreamSubscription",
      "Timer",
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
      "??",
      "?.",
      "..",
      "...",
      "=>",
      "~/",
    ],
    symbols: /[=><!~?:&|+\-*\/\^%\.]+/,
    escapes:
      /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
    digits: /\d+(_+\d+)*/,

    tokenizer: {
      root: [
        [/\/\/\/.*$/, "comment.doc"],
        [/@[a-zA-Z_$][\w$]*/, "annotation"],
        [
          /[a-z_$][\w$]*/,
          {
            cases: {
              "@keywords": "keyword",
              "@typeKeywords": "type.identifier",
              "@default": "identifier",
            },
          },
        ],
        [
          /[A-Z][\w$]*/,
          {
            cases: {
              "@typeKeywords": "type.identifier",
              "@keywords": "keyword",
              "@default": "type.identifier",
            },
          },
        ],
        { include: "@whitespace" },
        [/[{}()\[\]]/, "@brackets"],
        [/[<>](?!@symbols)/, "@brackets"],
        [/@symbols/, { cases: { "@operators": "operator", "@default": "" } }],
        [/(@digits)[eE]([\-+]?(@digits))?/, "number.float"],
        [/(@digits)\.(@digits)([eE][\-+]?(@digits))?/, "number.float"],
        [/0[xX][0-9a-fA-F_]+/, "number.hex"],
        [/0[bB][01_]+/, "number.binary"],
        [/(@digits)/, "number"],
        [/[;,.]/, "delimiter"],
        [/r"""/, "string", "@rawTripleDQ"],
        [/r'''/, "string", "@rawTripleSQ"],
        [/r"/, "string", "@rawDQ"],
        [/r'/, "string", "@rawSQ"],
        [/"""/, "string", "@tripleDQ"],
        [/'''/, "string", "@tripleSQ"],
        [/"/, "string", "@dq"],
        [/'/, "string", "@sq"],
      ],
      whitespace: [
        [/[ \t\r\n]+/, ""],
        [/\/\*\*(?!\/)/, "comment.doc", "@commentDoc"],
        [/\/\*/, "comment", "@comment"],
        [/\/\/.*$/, "comment"],
      ],
      comment: [
        [/[^\/*]+/, "comment"],
        [/\/\*/, "comment", "@push"],
        [/\*\//, "comment", "@pop"],
        [/[\/*]/, "comment"],
      ],
      commentDoc: [
        [/[^\/*]+/, "comment.doc"],
        [/\/\*/, "comment.doc", "@push"],
        [/\*\//, "comment.doc", "@pop"],
        [/[\/*]/, "comment.doc"],
      ],
      dq: [
        [/[^\\"$]+/, "string"],
        [/\$\{/, "string.interpolation", "@interp"],
        [/\$[a-zA-Z_]\w*/, "string.interpolation"],
        [/@escapes/, "string.escape"],
        [/\\./, "string.escape.invalid"],
        [/"/, "string", "@pop"],
      ],
      sq: [
        [/[^\\'$]+/, "string"],
        [/\$\{/, "string.interpolation", "@interp"],
        [/\$[a-zA-Z_]\w*/, "string.interpolation"],
        [/@escapes/, "string.escape"],
        [/\\./, "string.escape.invalid"],
        [/'/, "string", "@pop"],
      ],
      tripleDQ: [
        [/"""/, "string", "@pop"],
        [/[^\\"$]+/, "string"],
        [/\$\{/, "string.interpolation", "@interp"],
        [/\$[a-zA-Z_]\w*/, "string.interpolation"],
        [/@escapes/, "string.escape"],
        [/\\./, "string.escape.invalid"],
        [/./, "string"],
      ],
      tripleSQ: [
        [/'''/, "string", "@pop"],
        [/[^\\'$]+/, "string"],
        [/\$\{/, "string.interpolation", "@interp"],
        [/\$[a-zA-Z_]\w*/, "string.interpolation"],
        [/@escapes/, "string.escape"],
        [/\\./, "string.escape.invalid"],
        [/./, "string"],
      ],
      rawDQ: [
        [/[^"]+/, "string"],
        [/"/, "string", "@pop"],
      ],
      rawSQ: [
        [/[^']+/, "string"],
        [/'/, "string", "@pop"],
      ],
      rawTripleDQ: [
        [/"""/, "string", "@pop"],
        [/./, "string"],
      ],
      rawTripleSQ: [
        [/'''/, "string", "@pop"],
        [/./, "string"],
      ],
      interp: [
        [/\{/, "string.interpolation", "@push"],
        [/\}/, "string.interpolation", "@pop"],
        { include: "root" },
      ],
    },
  });

  // ===== 4. DOCS DATABASE =====
  const D = {
    // ---- Dart core types ----
    int: {
      sig: "abstract class int extends num",
      doc: "An integer number. The default implementation is 64-bit two's complement integers.",
    },
    double: {
      sig: "abstract class double extends num",
      doc: "An IEEE 754 double-precision floating-point number.",
    },
    num: {
      sig: "abstract class num implements Comparable<num>",
      doc: "An integer or floating-point number.",
    },
    String: {
      sig: "abstract class String implements Comparable<String>, Pattern",
      doc: "A sequence of UTF-16 code units. Strings are immutable.",
    },
    bool: {
      sig: "class bool",
      doc: "The reserved words `true` and `false` denote the two objects that are the only instances of this class.",
    },
    List: {
      sig: "abstract class List<E> implements Iterable<E>",
      doc: "An indexable collection of objects with a length. Also known as an array.",
    },
    Map: {
      sig: "abstract class Map<K, V>",
      doc: "A collection of key/value pairs, from which you retrieve a value using its associated key.",
    },
    Set: {
      sig: "abstract class Set<E> implements Iterable<E>",
      doc: "A collection of objects in which each object can occur only once.",
    },
    Future: {
      sig: "abstract class Future<T>",
      doc: "The result of an asynchronous computation. Used to represent a potential value or error available in the future.",
    },
    Stream: {
      sig: "abstract class Stream<T>",
      doc: "A source of asynchronous data events. Provides a way to receive a sequence of events.",
    },
    Iterable: {
      sig: "abstract class Iterable<E>",
      doc: 'A collection of values, or "elements", that can be accessed sequentially.',
    },
    Object: {
      sig: "class Object",
      doc: "The base class for all Dart objects except `null`.",
    },
    DateTime: {
      sig: "class DateTime implements Comparable<DateTime>",
      doc: "An instant in time, such as July 20, 1969, 8:18pm GMT.",
    },
    Duration: {
      sig: "class Duration implements Comparable<Duration>",
      doc: "A span of time, such as 27 days, 4 hours, 12 minutes, and 3 seconds.",
    },
    RegExp: {
      sig: "abstract class RegExp implements Pattern",
      doc: "A regular expression pattern used to match strings or parts of strings.",
    },
    Uri: { sig: "abstract class Uri", doc: "A parsed URI, such as a URL." },
    dynamic: {
      sig: "dynamic",
      doc: "A special type that disables static type checking. Every expression is assignable to `dynamic`.",
    },
    void: {
      sig: "void",
      doc: "Indicates that a function does not return a useful value.",
    },
    Never: {
      sig: "class Never",
      doc: "The bottom type — a subtype of all types. No value can have type `Never`.",
    },
    Null: { sig: "class Null", doc: "The class of the `null` object." },
    Record: {
      sig: "abstract class Record",
      doc: "Records are anonymous immutable aggregate types.",
    },
    FutureOr: {
      sig: "typedef FutureOr<T> = T | Future<T>",
      doc: "A type representing values that are either `Future<T>` or `T`.",
    },
    Completer: {
      sig: "abstract class Completer<T>",
      doc: "A way to produce Future objects and to complete them later with a value or error.",
    },
    StreamController: {
      sig: "abstract class StreamController<T> implements StreamSink<T>",
      doc: "A controller with the stream it controls.",
    },
    Timer: {
      sig: "abstract class Timer",
      doc: "A count-down timer that can be configured to fire once or repeatedly.",
    },
    print: {
      sig: "void print(Object? object)",
      doc: "Prints a string representation of the object to the console.",
    },
    identical: {
      sig: "bool identical(Object? a, Object? b)",
      doc: "Check whether two references are to the same object.",
    },
    abstract: {
      sig: "keyword",
      doc: "Declares an abstract class that cannot be instantiated directly.",
    },
    async: {
      sig: "keyword",
      doc: "Marks a function body as asynchronous. The function returns a `Future`.",
    },
    await: {
      sig: "keyword",
      doc: "Suspends execution until the `Future` completes and unwraps the result.",
    },
    class: { sig: "keyword", doc: "Declares a class definition." },
    const: { sig: "keyword", doc: "Declares a compile-time constant." },
    enum: { sig: "keyword", doc: "Declares an enumerated type." },
    extends: { sig: "keyword", doc: "Creates a subclass (inheritance)." },
    factory: {
      sig: "keyword",
      doc: "A constructor that does not always create a new instance of its class.",
    },
    final: {
      sig: "keyword",
      doc: "Declares a variable that can be set only once.",
    },
    implements: {
      sig: "keyword",
      doc: "Declares that a class implements an interface.",
    },
    import: { sig: "keyword", doc: "Imports a library." },
    late: {
      sig: "keyword",
      doc: "Declares a non-nullable variable initialized after its declaration, or lazily.",
    },
    mixin: {
      sig: "keyword",
      doc: "Declares a mixin for adding functionality to classes.",
    },
    required: { sig: "keyword", doc: "Marks a named parameter as required." },
    sealed: {
      sig: "keyword",
      doc: "A sealed class can't be extended or implemented outside its own library.",
    },
    static: {
      sig: "keyword",
      doc: "Declares a class-level variable or method.",
    },
    typedef: { sig: "keyword", doc: "Creates a type alias." },
    var: {
      sig: "keyword",
      doc: "Declares a variable without specifying its type (type is inferred).",
    },
    with: { sig: "keyword", doc: "Applies one or more mixins to a class." },
    yield: {
      sig: "keyword",
      doc: "Produces a value from a generator function (`sync*` or `async*`).",
    },
    switch: {
      sig: "keyword",
      doc: "Evaluates an expression and matches against case clauses. Supports patterns in Dart 3.",
    },
    is: {
      sig: "keyword",
      doc: "Type test operator. Checks if an object is of a given type.",
    },
    as: {
      sig: "keyword",
      doc: "Type cast operator. Casts an expression to a given type.",
    },

    // ---- Flutter: framework entry points ----
    runApp: {
      sig: "void runApp(Widget app)",
      doc: "Inflates the given widget and attaches it to the screen. The entry point of a Flutter app.",
    },
    widgetsFlutter: {
      sig: "#flutter/widgets.dart",
      doc: "Import `package:flutter/widgets.dart` for the widget layer.",
    },
    materialFlutter: {
      sig: "#material",
      doc: "Import `package:flutter/material.dart` for Material Design widgets.",
    },
    cupertinoFlutter: {
      sig: "#cupertino",
      doc: "Import `package:flutter/cupertino.dart` for iOS-style widgets.",
    },

    // ---- Flutter: core widget/state classes ----
    Widget: {
      sig: "abstract class Widget extends DiagnosticableTree",
      doc: "The base class for all widgets. Widgets describe the configuration for an element in the widget tree.",
    },
    StatelessWidget: {
      sig: "abstract class StatelessWidget extends Widget",
      doc: "A widget that does not require mutable state. Override `build` to describe the UI.",
    },
    StatefulWidget: {
      sig: "abstract class StatefulWidget extends Widget",
      doc: "A widget that has mutable state. Implement `createState` to return the associated `State`.",
    },
    State: {
      sig: "abstract class State<T extends StatefulWidget>",
      doc: "The logic and internal state for a `StatefulWidget`. Call `setState` to rebuild.",
    },
    BuildContext: {
      sig: "abstract class BuildContext",
      doc: "A handle to the location of a widget in the widget tree. Passed to `build`.",
    },
    Element: {
      sig: "abstract class Element extends DiagnosticableTree implements BuildContext",
      doc: "An instantiation of a Widget at a particular location in the tree.",
    },
    Key: {
      sig: "abstract class Key",
      doc: "A Key is an identifier for a Widget in a widget tree.",
    },
    GlobalKey: {
      sig: "class GlobalKey<T extends State<StatefulWidget>> extends Key",
      doc: "A key that is unique across the entire app.",
    },
    ValueKey: {
      sig: "class ValueKey<T> extends LocalKey",
      doc: "A key that uses a value of a particular type to identify itself.",
    },
    UniqueKey: {
      sig: "class UniqueKey extends LocalKey",
      doc: "A key that is only equal to itself.",
    },

    // ---- Flutter: app / material scaffolding ----
    MaterialApp: {
      sig: "class MaterialApp extends StatefulWidget",
      doc: "A convenience widget that wraps a number of widgets commonly required for Material Design apps.",
    },
    CupertinoApp: {
      sig: "class CupertinoApp extends StatefulWidget",
      doc: "An application that uses Cupertino (iOS-style) design.",
    },
    Scaffold: {
      sig: "class Scaffold extends StatefulWidget",
      doc: "Implements the basic Material Design visual layout structure: app bar, body, FAB, drawer, etc.",
    },
    AppBar: {
      sig: "class AppBar extends StatefulWidget implements PreferredSizeWidget",
      doc: "A Material Design app bar with a toolbar and optional tab bar, title, and actions.",
    },
    MaterialAppTheme: {
      sig: "ThemeData get theme",
      doc: "Defines the theme for the Material app.",
    },
    ScaffoldMessenger: {
      sig: "class ScaffoldMessenger extends StatefulWidget",
      doc: "Manages SnackBars and MaterialBanners for descendant Scaffolds.",
    },
    SnackBar: {
      sig: "class SnackBar extends StatefulWidget",
      doc: "A lightweight message with an optional action, shown briefly at the bottom of the screen.",
    },
    Drawer: {
      sig: "class Drawer extends StatefulWidget",
      doc: "A Material Design panel that slides in from the side of the screen.",
    },
    BottomNavigationBar: {
      sig: "class BottomNavigationBar extends StatefulWidget",
      doc: "A Material widget displayed at the bottom with a row of items.",
    },
    FloatingActionButton: {
      sig: "class FloatingActionButton extends StatefulWidget",
      doc: "A circular button that floats above the content for a primary action.",
    },
    NavigationBar: {
      sig: "class NavigationBar extends StatelessWidget",
      doc: "A Material 3 navigation bar.",
    },
    TabBar: {
      sig: "class TabBar extends StatefulWidget implements PreferredSizeWidget",
      doc: "A Material Design tab bar.",
    },
    Dialog: {
      sig: "class Dialog extends StatelessWidget",
      doc: "A Material Design dialog, a base for AlertDialog and SimpleDialog.",
    },
    AlertDialog: {
      sig: "class AlertDialog extends StatelessWidget",
      doc: "A Material Design alert dialog with a title, content, and actions.",
    },

    // ---- Flutter: layout ----
    Container: {
      sig: "class Container extends StatelessWidget",
      doc: "A convenience widget that combines common painting, positioning, and sizing widgets.",
    },
    Center: {
      sig: "class Center extends Align",
      doc: "A widget that centers its child within itself.",
    },
    Align: {
      sig: "class Align extends SingleChildRenderObjectWidget",
      doc: "A widget that aligns its child within itself.",
    },
    Padding: {
      sig: "class Padding extends SingleChildRenderObjectWidget",
      doc: "A widget that insets its child by the given padding.",
    },
    EdgeInsets: {
      sig: "class EdgeInsets extends EdgeInsetsGeometry",
      doc: "An immutable set of offsets in each of the four cardinal directions.",
    },
    SizedBox: {
      sig: "class SizedBox extends SingleChildRenderObjectWidget",
      doc: "A box with a specified size, or that sizes its child to a specific size.",
    },
    Column: {
      sig: "class Column extends Flex",
      doc: "A widget that displays its children in a vertical array.",
    },
    Row: {
      sig: "class Row extends Flex",
      doc: "A widget that displays its children in a horizontal array.",
    },
    Stack: {
      sig: "class Stack extends MultiChildRenderObjectWidget",
      doc: "A widget that positions its children relative to the edges of its box.",
    },
    Positioned: {
      sig: "class Positioned extends ParentDataWidget<StackParentData>",
      doc: "A widget that controls where a child of a Stack is positioned.",
    },
    Expanded: {
      sig: "class Expanded extends Flexible",
      doc: "A widget that expands a child of a Row, Column, or Flex to fill available space.",
    },
    Flexible: {
      sig: "class Flexible extends ParentDataWidget<FlexParentData>",
      doc: "A widget that controls how a child of a Row, Column, or Flex flexes.",
    },
    Spacer: {
      sig: "class Spacer extends StatelessWidget",
      doc: "A widget that takes up space proportional to its flex value.",
    },
    Wrap: {
      sig: "class Wrap extends MultiChildRenderObjectWidget",
      doc: "A widget that displays its children in multiple horizontal or vertical runs.",
    },
    SingleChildScrollView: {
      sig: "class SingleChildScrollView extends StatelessWidget",
      doc: "A box in which a single widget can be scrolled.",
    },
    ListView: {
      sig: "class ListView extends BoxScrollView",
      doc: "A scrollable list of widgets arranged linearly.",
    },
    GridView: {
      sig: "class GridView extends BoxScrollView",
      doc: "A scrollable, 2D array of widgets.",
    },
    ListTile: {
      sig: "class ListTile extends StatelessWidget",
      doc: "A single fixed-height row typically containing leading/trailing widgets and a title.",
    },
    Card: {
      sig: "class Card extends StatelessWidget",
      doc: "A Material Design card: a panel with slightly rounded corners and elevation.",
    },
    Divider: {
      sig: "class Divider extends StatelessWidget",
      doc: "A thin horizontal line with padding on either side.",
    },
    SafeArea: {
      sig: "class SafeArea extends StatelessWidget",
      doc: "Insets its child by sufficient padding to avoid intrusions by the OS.",
    },
    LayoutBuilder: {
      sig: "class LayoutBuilder extends ConstrainedLayoutBuilder<BoxConstraints>",
      doc: "Builds a widget tree that can depend on the parent widget's size.",
    },
    Builder: {
      sig: "class Builder extends StatelessWidget",
      doc: "A stateless utility widget whose build method uses a callback.",
    },

    // ---- Flutter: text / input ----
    Text: {
      sig: "class Text extends StatelessWidget",
      doc: "A run of text with a single style.",
    },
    RichText: {
      sig: "class RichText extends MultiChildRenderObjectWidget",
      doc: "A paragraph of text with inline spans of differing styles.",
    },
    TextSpan: {
      sig: "class TextSpan extends InlineSpan",
      doc: "An immutable span of text.",
    },
    TextStyle: {
      sig: "class TextStyle extends Diagnosticable",
      doc: "An immutable style describing how to format and paint text.",
    },
    TextField: {
      sig: "class TextField extends StatefulWidget",
      doc: "A Material Design text field. A common way to let users enter text.",
    },
    TextFormField: {
      sig: "class TextFormField extends FormField<String>",
      doc: "A FormField that contains a TextField.",
    },
    TextEditingController: {
      sig: "class TextEditingController extends ValueNotifier<TextEditingValue>",
      doc: "A controller for an editable text field.",
    },
    Form: {
      sig: "class Form extends StatefulWidget",
      doc: "An optional container for grouping and validating multiple form fields.",
    },
    FormState: {
      sig: "abstract class FormState extends State<Form>",
      doc: "State associated with a Form widget; call `validate()` and `save()`.",
    },

    // ---- Flutter: buttons ----
    ElevatedButton: {
      sig: "class ElevatedButton extends ButtonStyleButton",
      doc: "A Material Design elevated button.",
    },
    TextButton: {
      sig: "class TextButton extends ButtonStyleButton",
      doc: "A Material Design text button.",
    },
    OutlinedButton: {
      sig: "class OutlinedButton extends ButtonStyleButton",
      doc: "A Material Design outlined button.",
    },
    IconButton: {
      sig: "class IconButton extends StatelessWidget",
      doc: "A Material Design icon button.",
    },
    Checkbox: {
      sig: "class Checkbox extends StatefulWidget",
      doc: "A Material Design checkbox.",
    },
    Switch: {
      sig: "class Switch extends StatefulWidget",
      doc: "A Material Design switch.",
    },
    Radio: {
      sig: "class Radio<T> extends StatefulWidget",
      doc: "A Material Design radio button.",
    },
    Slider: {
      sig: "class Slider extends StatefulWidget",
      doc: "A Material Design slider.",
    },
    DropdownButton: {
      sig: "class DropdownButton<T> extends StatefulWidget",
      doc: "A Material Design button for selecting from a list of items.",
    },

    // ---- Flutter: media / painting ----
    Image: {
      sig: "class Image extends StatefulWidget",
      doc: "A widget that displays an image.",
    },
    Icon: {
      sig: "class Icon extends StatelessWidget",
      doc: "A graphical icon widget drawn with a glyph from a font.",
    },
    Icons: {
      sig: "abstract class Icons",
      doc: "The Material Design icon font. Provides static const IconData values.",
    },
    CircleAvatar: {
      sig: "class CircleAvatar extends StatelessWidget",
      doc: "A circle that represents a user.",
    },
    ClipRRect: {
      sig: "class ClipRRect extends SingleChildRenderObjectWidget",
      doc: "A widget that clips its child using a rounded rectangle.",
    },
    Opacity: {
      sig: "class Opacity extends SingleChildRenderObjectWidget",
      doc: "A widget that makes its child partially transparent.",
    },
    Transform: {
      sig: "class Transform extends SingleChildRenderObjectWidget",
      doc: "A widget that applies a transformation before painting its child.",
    },
    Color: {
      sig: "class Color",
      doc: "An immutable 32-bit color value in ARGB format.",
    },
    Colors: {
      sig: "abstract class Colors",
      doc: "The Material Design color palette, containing swatch constants such as `Colors.blue`.",
    },
    BorderRadius: {
      sig: "class BorderRadius extends BorderRadiusGeometry",
      doc: "An immutable set of radii for each corner of a rectangle.",
    },
    BoxDecoration: {
      sig: "class BoxDecoration extends Decoration",
      doc: "An immutable description of how to paint a box.",
    },
    BoxShadow: {
      sig: "class BoxShadow extends Shadow",
      doc: "A shadow cast by a box.",
    },

    // ---- Flutter: async / state management ----
    FutureBuilder: {
      sig: "class FutureBuilder<T> extends StatefulWidget",
      doc: "A widget that builds itself based on the latest snapshot of interaction with a Future.",
    },
    StreamBuilder: {
      sig: "class StreamBuilder<T> extends StatefulWidget",
      doc: "A widget that builds itself based on the latest snapshot of interaction with a Stream.",
    },
    ValueListenableBuilder: {
      sig: "class ValueListenableBuilder<T> extends StatefulWidget",
      doc: "A widget that rebuilds when a ValueListenable changes.",
    },
    ValueNotifier: {
      sig: "class ValueNotifier<T> extends ChangeNotifier implements ValueListenable<T>",
      doc: "A ChangeNotifier that holds a single value.",
    },
    ChangeNotifier: {
      sig: "class ChangeNotifier implements Listenable",
      doc: "A class that can be extended or mixed in to provide change notifications.",
    },
    AnimatedContainer: {
      sig: "class AnimatedContainer extends ImplicitlyAnimatedWidget",
      doc: "A Container that animates its properties when they change over a duration.",
    },
    AnimationController: {
      sig: "class AnimationController extends Animation<double>",
      doc: "A controller for an animation, driving its value from 0.0 to 1.0.",
    },
    Tween: {
      sig: "class Tween<T extends Object?> extends Animatable<T>",
      doc: "A linear interpolation between a beginning and ending value.",
    },
    Hero: {
      sig: "class Hero extends StatefulWidget",
      doc: "A widget that flies its child from one route to another.",
    },

    // ---- Flutter: navigation ----
    Navigator: {
      sig: "class Navigator extends StatefulWidget",
      doc: "Manages a stack of routes; use `Navigator.of(context)` for imperative navigation.",
    },
    MaterialPageRoute: {
      sig: "class MaterialPageRoute<T> extends PageRoute<T>",
      doc: "A modal route that replaces the screen with a Material page.",
    },
    Route: {
      sig: "abstract class Route<T>",
      doc: "An abstraction for a screen or page that Navigator manages.",
    },
    showDialog: {
      sig: "Future<T?> showDialog<T>({required BuildContext context, required WidgetBuilder builder, ...})",
      doc: "Displays a Material dialog above the current contents of the app.",
    },
    showModalBottomSheet: {
      sig: "Future<T?> showModalBottomSheet<T>({required BuildContext context, required WidgetBuilder builder, ...})",
      doc: "Shows a modal Material Design bottom sheet.",
    },

    // ---- Flutter: styling / theme / accessibility ----
    Theme: {
      sig: "class Theme extends InheritedTheme",
      doc: "Applies a visual theme to descendant widgets. Access the current theme with `Theme.of(context)`.",
    },
    ThemeData: {
      sig: "class ThemeData",
      doc: "Defines the configuration of the overall visual Theme for a MaterialApp.",
    },
    MediaQuery: {
      sig: "class MediaQuery extends InheritedModel<Object>",
      doc: "Provides the size and orientation of the screen. Access with `MediaQuery.of(context)`.",
    },
    GestureDetector: {
      sig: "class GestureDetector extends StatelessWidget",
      doc: "A widget that detects gestures such as taps, drags, and scale.",
    },
    InkWell: {
      sig: "class InkWell extends InkResponse",
      doc: "A Material Design ink splash that responds to taps.",
    },
    InheritedWidget: {
      sig: "abstract class InheritedWidget extends ProxyWidget",
      doc: "A base class for widgets that efficiently propagate information down the tree.",
    },

    // ---- Dart: common members ----
    toString: {
      sig: "String toString()",
      doc: "Returns a string representation of this object.",
    },
    hashCode: {
      sig: "int get hashCode",
      doc: "The hash code for this object.",
    },
    runtimeType: {
      sig: "Type get runtimeType",
      doc: "A representation of the runtime type of the object.",
    },
    length: {
      sig: "int get length",
      doc: "The number of elements / code units.",
    },
    isEmpty: {
      sig: "bool get isEmpty",
      doc: "Whether this collection has no elements.",
    },
    isNotEmpty: {
      sig: "bool get isNotEmpty",
      doc: "Whether this collection has at least one element.",
    },
    map: {
      sig: "Iterable<T> map<T>(T Function(E) toElement)",
      doc: "Returns a new lazy `Iterable` with elements created by calling `toElement` on each element.",
    },
    where: {
      sig: "Iterable<E> where(bool Function(E) test)",
      doc: "Returns a lazy `Iterable` with all elements that satisfy the predicate.",
    },
    forEach: {
      sig: "void forEach(void Function(E) action)",
      doc: "Applies `action` to each element in iteration order.",
    },
    reduce: {
      sig: "E reduce(E Function(E, E) combine)",
      doc: "Reduces a collection to a single value by iteratively combining elements.",
    },
    fold: {
      sig: "T fold<T>(T init, T Function(T, E) combine)",
      doc: "Reduces a collection starting with `init`.",
    },
    any: {
      sig: "bool any(bool Function(E) test)",
      doc: "Checks whether any element satisfies `test`.",
    },
    every: {
      sig: "bool every(bool Function(E) test)",
      doc: "Checks whether every element satisfies `test`.",
    },
    contains: {
      sig: "bool contains(Object? element)",
      doc: "Whether the collection contains an element equal to `element`.",
    },
    add: {
      sig: "void add(E value)",
      doc: "Adds `value` to the end of this list/set.",
    },
    remove: {
      sig: "bool remove(Object? value)",
      doc: "Removes the first occurrence of `value`.",
    },
    sort: {
      sig: "void sort([int Function(E, E)? compare])",
      doc: "Sorts this list according to the `compare` function.",
    },
    join: {
      sig: 'String join([String separator = ""])',
      doc: "Converts each element to a `String` and concatenates them.",
    },
    toList: {
      sig: "List<E> toList({bool growable = true})",
      doc: "Creates a `List` containing the elements of this `Iterable`.",
    },
    toSet: {
      sig: "Set<E> toSet()",
      doc: "Creates a `Set` with the same elements as this iterable.",
    },
    first: { sig: "E get first", doc: "Returns the first element." },
    last: { sig: "E get last", doc: "Returns the last element." },
    reversed: {
      sig: "Iterable<E> get reversed",
      doc: "The elements of this list in reverse order.",
    },
    sublist: {
      sig: "List<E> sublist(int start, [int? end])",
      doc: "Returns a new list from `start` (inclusive) to `end` (exclusive).",
    },
    split: {
      sig: "List<String> split(Pattern pattern)",
      doc: "Splits the string at matches of `pattern`.",
    },
    trim: {
      sig: "String trim()",
      doc: "Removes leading and trailing whitespace.",
    },
    replaceAll: {
      sig: "String replaceAll(Pattern from, String replace)",
      doc: "Replaces all substrings matching `from` with `replace`.",
    },
    startsWith: {
      sig: "bool startsWith(Pattern pattern, [int index = 0])",
      doc: "Whether this string starts with a match of `pattern`.",
    },
    endsWith: {
      sig: "bool endsWith(String other)",
      doc: "Whether this string ends with `other`.",
    },
    substring: {
      sig: "String substring(int start, [int? end])",
      doc: "The substring from `start` inclusive to `end` exclusive.",
    },
    toLowerCase: {
      sig: "String toLowerCase()",
      doc: "Converts all characters to lower case.",
    },
    toUpperCase: {
      sig: "String toUpperCase()",
      doc: "Converts all characters to upper case.",
    },
    then: {
      sig: "Future<R> then<R>(FutureOr<R> Function(T) onValue, {Function? onError})",
      doc: "Registers callbacks for when this future completes.",
    },
    catchError: {
      sig: "Future<T> catchError(Function onError, {bool Function(Object)? test})",
      doc: "Handles errors emitted by this `Future`.",
    },
    whenComplete: {
      sig: "Future<T> whenComplete(FutureOr<void> Function() action)",
      doc: "Registers a function called when this future completes.",
    },
    listen: {
      sig: "StreamSubscription<T> listen(void Function(T)? onData, ...)",
      doc: "Adds a subscription to this stream.",
    },
    keys: { sig: "Iterable<K> get keys", doc: "The keys of this map." },
    values: { sig: "Iterable<V> get values", doc: "The values of this map." },
    entries: {
      sig: "Iterable<MapEntry<K,V>> get entries",
      doc: "The map entries of this map.",
    },
    containsKey: {
      sig: "bool containsKey(Object? key)",
      doc: "Whether this map contains the given `key`.",
    },
    containsValue: {
      sig: "bool containsValue(Object? value)",
      doc: "Whether this map contains the given `value`.",
    },
    putIfAbsent: {
      sig: "V putIfAbsent(K key, V Function() ifAbsent)",
      doc: "Look up the value of `key`, or add a new entry if it isn't there.",
    },
    indexOf: {
      sig: "int indexOf(E element, [int start = 0])",
      doc: "The first index of `element` in this list.",
    },
    clear: {
      sig: "void clear()",
      doc: "Removes all elements from this collection.",
    },
    addAll: {
      sig: "void addAll(Iterable<E> iterable)",
      doc: "Appends all objects of `iterable` to the end of this list.",
    },
    insert: {
      sig: "void insert(int index, E element)",
      doc: "Inserts `element` at position `index`.",
    },
    removeAt: {
      sig: "E removeAt(int index)",
      doc: "Removes the object at position `index`.",
    },
    asMap: {
      sig: "Map<int, E> asMap()",
      doc: "An unmodifiable `Map` view of this list.",
    },
    take: {
      sig: "Iterable<E> take(int count)",
      doc: "Returns a lazy iterable of the first `count` elements.",
    },
    skip: {
      sig: "Iterable<E> skip(int count)",
      doc: "Returns an iterable that skips the first `count` elements.",
    },
    expand: {
      sig: "Iterable<T> expand<T>(Iterable<T> Function(E) f)",
      doc: "Expands each element into zero or more elements.",
    },
  };

  // ===== 5. HELPERS =====
  function findLocalSymbols(text) {
    const syms = [];
    const lines = text.split("\n");
    const pats = [
      {
        r: /(?:abstract\s+)?(?:sealed\s+)?(?:base\s+)?class\s+(\w+)/,
        k: "class",
      },
      { r: /mixin\s+(\w+)/, k: "mixin" },
      { r: /enum\s+(\w+)/, k: "enum" },
      { r: /extension\s+(\w+)\s+on/, k: "extension" },
      { r: /typedef\s+(\w+)/, k: "typedef" },
    ];
    const funcPat =
      /(?:(?:Future|Stream|void|int|double|String|bool|num|dynamic|List|Map|Set|Iterable|Object|Widget|State)(?:<[^>]*>)?\??\s+)(\w+)\s*[\(<]/;
    const varPat = /(?:var|final|const|late)\s+(\w+)/;

    lines.forEach((line, i) => {
      for (const p of pats) {
        const m = line.match(p.r);
        if (m)
          syms.push({
            name: m[1],
            line: i,
            col: line.indexOf(m[1]),
            kind: p.k,
            decl: line.trim(),
          });
      }
      const fm = line.match(funcPat);
      if (fm && !line.trim().startsWith("//"))
        syms.push({
          name: fm[1],
          line: i,
          col: line.indexOf(fm[1]),
          kind: "function",
          decl: line.trim(),
        });
      const vm = line.match(varPat);
      if (vm && !line.trim().startsWith("//"))
        syms.push({
          name: vm[1],
          line: i,
          col: line.indexOf(vm[1]),
          kind: "variable",
          decl: line.trim(),
        });
    });
    return syms;
  }

  function getDocComment(lines, lineIndex) {
    let doc = "";
    for (let j = lineIndex - 1; j >= 0; j--) {
      const t = lines[j].trim();
      if (t.startsWith("///")) {
        doc = t.replace(/^\/\/\/\s?/, "") + "\n" + doc;
      } else if (t === "" || t.startsWith("@")) continue;
      else break;
    }
    return doc.trim();
  }

  // ===== 6. COMPLETION PROVIDER =====
  monaco.languages.registerCompletionItemProvider("flutter", {
    triggerCharacters: [".", "@", "$", ":"],
    provideCompletionItems(model, position) {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };
      const line = model.getLineContent(position.lineNumber);
      const before = line.substring(0, position.column - 1);
      const CK = monaco.languages.CompletionItemKind;
      const SNIPPET =
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet;
      const S = [];

      // ---- DOT COMPLETIONS ----
      if (/\w+\.\s*$/.test(before)) {
        const members = [
          // BuildContext / Flutter accessors
          {
            l: "of",
            i: "of(context)",
            k: CK.Method,
            d: "static ... of(BuildContext context)",
          },
          {
            l: "maybeOf",
            i: "maybeOf(context)",
            k: CK.Method,
            d: "static ...? maybeOf(BuildContext context)",
          },
          {
            l: "watch",
            i: "watch(context)",
            k: CK.Method,
            d: "T watch<T>(BuildContext context)",
          },
          {
            l: "read",
            i: "read(context)",
            k: CK.Method,
            d: "T read<T>(BuildContext context)",
          },
          {
            l: "setState",
            i: "setState(() {\n\t$0\n});",
            k: CK.Method,
            d: "void setState(VoidCallback fn)",
          },
          {
            l: "build",
            i: "build(BuildContext context)",
            k: CK.Method,
            d: "Widget build(BuildContext context)",
          },
          {
            l: "createState",
            i: "createState()",
            k: CK.Method,
            d: "State<StatefulWidget> createState()",
          },
          {
            l: "initState",
            i: "initState()",
            k: CK.Method,
            d: "void initState()",
          },
          {
            l: "dispose",
            i: "dispose()",
            k: CK.Method,
            d: "void dispose()",
          },
          {
            l: "didChangeDependencies",
            i: "didChangeDependencies()",
            k: CK.Method,
            d: "void didChangeDependencies()",
          },
          {
            l: "didUpdateWidget",
            i: "didUpdateWidget(${1:covariant StatefulWidget oldWidget})",
            k: CK.Method,
            d: "void didUpdateWidget(covariant StatefulWidget oldWidget)",
          },
          { l: "context", i: "context", k: CK.Property, d: "BuildContext get context" },
          { l: "mounted", i: "mounted", k: CK.Property, d: "bool get mounted" },
          { l: "widget", i: "widget", k: CK.Property, d: "T get widget" },
          // Navigator / routes
          {
            l: "push",
            i: "push(MaterialPageRoute(builder: (context) => ${1:Widget}))",
            k: CK.Method,
            d: "Future<T?> push<T>(Route<T> route)",
          },
          {
            l: "pop",
            i: "pop(${1})",
            k: CK.Method,
            d: "void pop<T>([T? result])",
          },
          {
            l: "pushNamed",
            i: "pushNamed('${1:/route}')",
            k: CK.Method,
            d: "Future<T?> pushNamed<T>(String routeName)",
          },
          {
            l: "pushReplacement",
            i: "pushReplacement(MaterialPageRoute(builder: (context) => ${1:Widget}))",
            k: CK.Method,
            d: "Future<T?> pushReplacement<T>(Route<T> newRoute)",
          },
          {
            l: "popAndPushNamed",
            i: "popAndPushNamed('${1:/route}')",
            k: CK.Method,
            d: "Future<T?> popAndPushNamed<T>(String routeName)",
          },
          {
            l: "canPop",
            i: "canPop()",
            k: CK.Method,
            d: "bool canPop()",
          },
          // Async / futures
          {
            l: "then",
            i: "then((${1:value}) {\n\t$0\n})",
            k: CK.Method,
            d: "Future<R> then<R>(...)",
          },
          {
            l: "catchError",
            i: "catchError((${1:e}) {\n\t$0\n})",
            k: CK.Method,
            d: "Future<T> catchError(...)",
          },
          {
            l: "whenComplete",
            i: "whenComplete(() {\n\t$0\n})",
            k: CK.Method,
            d: "Future<T> whenComplete(...)",
          },
          {
            l: "timeout",
            i: "timeout(Duration(${1:seconds: 5}))",
            k: CK.Method,
            d: "Future<T> timeout(Duration)",
          },
          {
            l: "asStream",
            i: "asStream()",
            k: CK.Method,
            d: "Stream<T> asStream()",
          },
          {
            l: "listen",
            i: "listen((${1:event}) {\n\t$0\n})",
            k: CK.Method,
            d: "StreamSubscription<T> listen(...)",
          },
          // Collections
          { l: "length", i: "length", k: CK.Property, d: "int get length" },
          { l: "isEmpty", i: "isEmpty", k: CK.Property, d: "bool get isEmpty" },
          { l: "isNotEmpty", i: "isNotEmpty", k: CK.Property, d: "bool get isNotEmpty" },
          { l: "first", i: "first", k: CK.Property, d: "E get first" },
          { l: "last", i: "last", k: CK.Property, d: "E get last" },
          { l: "reversed", i: "reversed", k: CK.Property, d: "Iterable<E> get reversed" },
          { l: "keys", i: "keys", k: CK.Property, d: "Iterable<K> get keys" },
          { l: "values", i: "values", k: CK.Property, d: "Iterable<V> get values" },
          { l: "entries", i: "entries", k: CK.Property, d: "Iterable<MapEntry<K,V>> get entries" },
          {
            l: "add",
            i: "add(${1:value})",
            k: CK.Method,
            d: "void add(E value)",
          },
          {
            l: "addAll",
            i: "addAll(${1:iterable})",
            k: CK.Method,
            d: "void addAll(Iterable<E>)",
          },
          {
            l: "insert",
            i: "insert(${1:index}, ${2:element})",
            k: CK.Method,
            d: "void insert(int, E)",
          },
          {
            l: "remove",
            i: "remove(${1:value})",
            k: CK.Method,
            d: "bool remove(Object?)",
          },
          {
            l: "removeAt",
            i: "removeAt(${1:index})",
            k: CK.Method,
            d: "E removeAt(int index)",
          },
          {
            l: "removeLast",
            i: "removeLast()",
            k: CK.Method,
            d: "E removeLast()",
          },
          {
            l: "removeWhere",
            i: "removeWhere((${1:e}) => ${2})",
            k: CK.Method,
            d: "void removeWhere(bool Function(E))",
          },
          { l: "clear", i: "clear()", k: CK.Method, d: "void clear()" },
          {
            l: "contains",
            i: "contains(${1:element})",
            k: CK.Method,
            d: "bool contains(Object?)",
          },
          {
            l: "containsKey",
            i: "containsKey(${1:key})",
            k: CK.Method,
            d: "bool containsKey(Object?)",
          },
          {
            l: "containsValue",
            i: "containsValue(${1:value})",
            k: CK.Method,
            d: "bool containsValue(Object?)",
          },
          {
            l: "indexOf",
            i: "indexOf(${1:element})",
            k: CK.Method,
            d: "int indexOf(E)",
          },
          {
            l: "lastIndexOf",
            i: "lastIndexOf(${1:element})",
            k: CK.Method,
            d: "int lastIndexOf(E)",
          },
          {
            l: "map",
            i: "map((${1:e}) => ${2})",
            k: CK.Method,
            d: "Iterable<T> map<T>(T Function(E))",
          },
          {
            l: "where",
            i: "where((${1:e}) => ${2})",
            k: CK.Method,
            d: "Iterable<E> where(bool Function(E))",
          },
          {
            l: "forEach",
            i: "forEach((${1:e}) {\n\t$0\n})",
            k: CK.Method,
            d: "void forEach(void Function(E))",
          },
          {
            l: "any",
            i: "any((${1:e}) => ${2})",
            k: CK.Method,
            d: "bool any(bool Function(E))",
          },
          {
            l: "every",
            i: "every((${1:e}) => ${2})",
            k: CK.Method,
            d: "bool every(bool Function(E))",
          },
          {
            l: "reduce",
            i: "reduce((${1:a}, ${2:b}) => ${3})",
            k: CK.Method,
            d: "E reduce(E Function(E,E))",
          },
          {
            l: "fold",
            i: "fold(${1:init}, (${2:prev}, ${3:e}) => ${4})",
            k: CK.Method,
            d: "T fold<T>(T, T Function(T,E))",
          },
          {
            l: "join",
            i: "join('${1:, }')",
            k: CK.Method,
            d: "String join([String separator])",
          },
          {
            l: "sort",
            i: "sort(${1})",
            k: CK.Method,
            d: "void sort([int Function(E,E)?])",
          },
          {
            l: "sublist",
            i: "sublist(${1:start})",
            k: CK.Method,
            d: "List<E> sublist(int, [int?])",
          },
          { l: "toList", i: "toList()", k: CK.Method, d: "List<E> toList()" },
          { l: "toSet", i: "toSet()", k: CK.Method, d: "Set<E> toSet()" },
          {
            l: "take",
            i: "take(${1:count})",
            k: CK.Method,
            d: "Iterable<E> take(int)",
          },
          {
            l: "skip",
            i: "skip(${1:count})",
            k: CK.Method,
            d: "Iterable<E> skip(int)",
          },
          {
            l: "expand",
            i: "expand((${1:e}) => ${2})",
            k: CK.Method,
            d: "Iterable<T> expand<T>(...)",
          },
          { l: "asMap", i: "asMap()", k: CK.Method, d: "Map<int,E> asMap()" },
          // String
          {
            l: "split",
            i: "split('${1}')",
            k: CK.Method,
            d: "List<String> split(Pattern)",
          },
          { l: "trim", i: "trim()", k: CK.Method, d: "String trim()" },
          { l: "trimLeft", i: "trimLeft()", k: CK.Method, d: "String trimLeft()" },
          { l: "trimRight", i: "trimRight()", k: CK.Method, d: "String trimRight()" },
          {
            l: "replaceAll",
            i: "replaceAll('${1:from}', '${2:to}')",
            k: CK.Method,
            d: "String replaceAll(Pattern, String)",
          },
          {
            l: "replaceFirst",
            i: "replaceFirst('${1:from}', '${2:to}')",
            k: CK.Method,
            d: "String replaceFirst(Pattern, String)",
          },
          {
            l: "startsWith",
            i: "startsWith('${1}')",
            k: CK.Method,
            d: "bool startsWith(Pattern)",
          },
          {
            l: "endsWith",
            i: "endsWith('${1}')",
            k: CK.Method,
            d: "bool endsWith(String)",
          },
          {
            l: "substring",
            i: "substring(${1:start})",
            k: CK.Method,
            d: "String substring(int, [int?])",
          },
          {
            l: "toLowerCase",
            i: "toLowerCase()",
            k: CK.Method,
            d: "String toLowerCase()",
          },
          {
            l: "toUpperCase",
            i: "toUpperCase()",
            k: CK.Method,
            d: "String toUpperCase()",
          },
          {
            l: "padLeft",
            i: "padLeft(${1:width})",
            k: CK.Method,
            d: "String padLeft(int, [String])",
          },
          {
            l: "padRight",
            i: "padRight(${1:width})",
            k: CK.Method,
            d: "String padRight(int, [String])",
          },
          {
            l: "compareTo",
            i: "compareTo(${1:other})",
            k: CK.Method,
            d: "int compareTo(...)",
          },
          { l: "codeUnits", i: "codeUnits", k: CK.Property, d: "List<int> get codeUnits" },
          // Numbers
          { l: "abs", i: "abs()", k: CK.Method, d: "num abs()" },
          { l: "round", i: "round()", k: CK.Method, d: "int round()" },
          { l: "ceil", i: "ceil()", k: CK.Method, d: "int ceil()" },
          { l: "floor", i: "floor()", k: CK.Method, d: "int floor()" },
          { l: "toInt", i: "toInt()", k: CK.Method, d: "int toInt()" },
          { l: "toDouble", i: "toDouble()", k: CK.Method, d: "double toDouble()" },
          {
            l: "toStringAsFixed",
            i: "toStringAsFixed(${1:fractionDigits})",
            k: CK.Method,
            d: "String toStringAsFixed(int)",
          },
          {
            l: "clamp",
            i: "clamp(${1:lowerLimit}, ${2:upperLimit})",
            k: CK.Method,
            d: "num clamp(num, num)",
          },
          { l: "isNaN", i: "isNaN", k: CK.Property, d: "bool get isNaN" },
          { l: "isFinite", i: "isFinite", k: CK.Property, d: "bool get isFinite" },
          { l: "isNegative", i: "isNegative", k: CK.Property, d: "bool get isNegative" },
          { l: "sign", i: "sign", k: CK.Property, d: "num get sign" },
          // Identity / diagnostics
          { l: "toString", i: "toString()", k: CK.Method, d: "String toString()" },
          { l: "hashCode", i: "hashCode", k: CK.Property, d: "int get hashCode" },
          { l: "runtimeType", i: "runtimeType", k: CK.Property, d: "Type get runtimeType" },
        ];
        const seen = new Set();
        members.forEach((m) => {
          if (!seen.has(m.l)) {
            seen.add(m.l);
            S.push({
              label: m.l,
              kind: m.k,
              insertText: m.i,
              insertTextRules: m.i.includes("$") ? SNIPPET : undefined,
              detail: m.d,
              documentation: D[m.l] ? D[m.l].doc : "",
              range,
            });
          }
        });
        return { suggestions: S };
      }

      // ---- KEYWORDS ----
      [
        "abstract",
        "as",
        "assert",
        "async",
        "await",
        "base",
        "break",
        "case",
        "catch",
        "class",
        "const",
        "continue",
        "covariant",
        "default",
        "deferred",
        "do",
        "dynamic",
        "else",
        "enum",
        "export",
        "extends",
        "extension",
        "external",
        "factory",
        "false",
        "final",
        "finally",
        "for",
        "get",
        "hide",
        "if",
        "implements",
        "import",
        "in",
        "interface",
        "is",
        "late",
        "library",
        "mixin",
        "new",
        "null",
        "of",
        "on",
        "operator",
        "part",
        "required",
        "rethrow",
        "return",
        "sealed",
        "set",
        "show",
        "static",
        "super",
        "switch",
        "sync",
        "this",
        "throw",
        "true",
        "try",
        "typedef",
        "var",
        "void",
        "when",
        "while",
        "with",
        "yield",
      ].forEach((kw) =>
        S.push({
          label: kw,
          kind: CK.Keyword,
          insertText: kw,
          detail: "keyword",
          range,
        }),
      );

      // ---- DART TYPES ----
      [
        ["int", "dart:core"],
        ["double", "dart:core"],
        ["num", "dart:core"],
        ["String", "dart:core"],
        ["bool", "dart:core"],
        ["List", "dart:core"],
        ["Map", "dart:core"],
        ["Set", "dart:core"],
        ["Future", "dart:async"],
        ["Stream", "dart:async"],
        ["Iterable", "dart:core"],
        ["Object", "dart:core"],
        ["Function", "dart:core"],
        ["Null", "dart:core"],
        ["Never", "dart:core"],
        ["Type", "dart:core"],
        ["Symbol", "dart:core"],
        ["BigInt", "dart:core"],
        ["DateTime", "dart:core"],
        ["Duration", "dart:core"],
        ["RegExp", "dart:core"],
        ["Uri", "dart:core"],
        ["Record", "dart:core"],
        ["Enum", "dart:core"],
        ["Error", "dart:core"],
        ["Exception", "dart:core"],
        ["FormatException", "dart:core"],
        ["StateError", "dart:core"],
        ["ArgumentError", "dart:core"],
        ["RangeError", "dart:core"],
        ["UnsupportedError", "dart:core"],
        ["UnimplementedError", "dart:core"],
        ["TypeError", "dart:core"],
        ["StackTrace", "dart:core"],
        ["Stopwatch", "dart:core"],
        ["StringBuffer", "dart:core"],
        ["StringSink", "dart:core"],
        ["MapEntry", "dart:core"],
        ["FutureOr", "dart:async"],
        ["Completer", "dart:async"],
        ["StreamController", "dart:async"],
        ["StreamSubscription", "dart:async"],
        ["StreamTransformer", "dart:async"],
        ["Timer", "dart:async"],
        ["Zone", "dart:async"],
      ].forEach(([n, lib]) =>
        S.push({
          label: n,
          kind: CK.Class,
          insertText: n,
          detail: lib,
          documentation: D[n] ? D[n].doc : "",
          range,
        }),
      );

      // ---- FLUTTER CLASSES / WIDGETS ----
      [
        ["Widget", "flutter/widgets.dart"],
        ["StatelessWidget", "flutter/widgets.dart"],
        ["StatefulWidget", "flutter/widgets.dart"],
        ["State", "flutter/widgets.dart"],
        ["BuildContext", "flutter/widgets.dart"],
        ["Element", "flutter/widgets.dart"],
        ["Key", "flutter/widgets.dart"],
        ["GlobalKey", "flutter/widgets.dart"],
        ["ValueKey", "flutter/widgets.dart"],
        ["UniqueKey", "flutter/widgets.dart"],
        ["InheritedWidget", "flutter/widgets.dart"],
        ["Builder", "flutter/widgets.dart"],
        ["LayoutBuilder", "flutter/widgets.dart"],
        ["FutureBuilder", "flutter/widgets.dart"],
        ["StreamBuilder", "flutter/widgets.dart"],
        ["ValueNotifier", "flutter/foundation.dart"],
        ["ChangeNotifier", "flutter/foundation.dart"],
        ["ValueListenableBuilder", "flutter/widgets.dart"],
        ["AnimationController", "flutter/animation.dart"],
        ["Tween", "flutter/animation.dart"],
        ["Hero", "flutter/widgets.dart"],
        ["Navigator", "flutter/widgets.dart"],
        ["Route", "flutter/widgets.dart"],
        ["MaterialApp", "flutter/material.dart"],
        ["CupertinoApp", "flutter/cupertino.dart"],
        ["MaterialPageRoute", "flutter/material.dart"],
        ["Scaffold", "flutter/material.dart"],
        ["AppBar", "flutter/material.dart"],
        ["ScaffoldMessenger", "flutter/material.dart"],
        ["SnackBar", "flutter/material.dart"],
        ["Drawer", "flutter/material.dart"],
        ["BottomNavigationBar", "flutter/material.dart"],
        ["NavigationBar", "flutter/material.dart"],
        ["TabBar", "flutter/material.dart"],
        ["FloatingActionButton", "flutter/material.dart"],
        ["Dialog", "flutter/material.dart"],
        ["AlertDialog", "flutter/material.dart"],
        ["Container", "flutter/widgets.dart"],
        ["Center", "flutter/widgets.dart"],
        ["Align", "flutter/widgets.dart"],
        ["Padding", "flutter/widgets.dart"],
        ["EdgeInsets", "flutter/widgets.dart"],
        ["SizedBox", "flutter/widgets.dart"],
        ["Column", "flutter/widgets.dart"],
        ["Row", "flutter/widgets.dart"],
        ["Stack", "flutter/widgets.dart"],
        ["Positioned", "flutter/widgets.dart"],
        ["Expanded", "flutter/widgets.dart"],
        ["Flexible", "flutter/widgets.dart"],
        ["Spacer", "flutter/widgets.dart"],
        ["Wrap", "flutter/widgets.dart"],
        ["SingleChildScrollView", "flutter/widgets.dart"],
        ["ListView", "flutter/widgets.dart"],
        ["GridView", "flutter/widgets.dart"],
        ["ListTile", "flutter/material.dart"],
        ["Card", "flutter/material.dart"],
        ["Divider", "flutter/material.dart"],
        ["SafeArea", "flutter/widgets.dart"],
        ["Text", "flutter/widgets.dart"],
        ["RichText", "flutter/widgets.dart"],
        ["TextSpan", "flutter/painting.dart"],
        ["TextStyle", "flutter/painting.dart"],
        ["TextField", "flutter/material.dart"],
        ["TextFormField", "flutter/material.dart"],
        ["TextEditingController", "flutter/widgets.dart"],
        ["Form", "flutter/widgets.dart"],
        ["FormState", "flutter/widgets.dart"],
        ["ElevatedButton", "flutter/material.dart"],
        ["TextButton", "flutter/material.dart"],
        ["OutlinedButton", "flutter/material.dart"],
        ["IconButton", "flutter/material.dart"],
        ["Checkbox", "flutter/material.dart"],
        ["Switch", "flutter/material.dart"],
        ["Radio", "flutter/material.dart"],
        ["Slider", "flutter/material.dart"],
        ["DropdownButton", "flutter/material.dart"],
        ["Image", "flutter/widgets.dart"],
        ["Icon", "flutter/widgets.dart"],
        ["Icons", "flutter/material.dart"],
        ["CircleAvatar", "flutter/material.dart"],
        ["ClipRRect", "flutter/widgets.dart"],
        ["Opacity", "flutter/widgets.dart"],
        ["Transform", "flutter/widgets.dart"],
        ["Color", "dart:ui"],
        ["Colors", "flutter/material.dart"],
        ["BorderRadius", "flutter/painting.dart"],
        ["BoxDecoration", "flutter/painting.dart"],
        ["BoxShadow", "flutter/painting.dart"],
        ["AnimatedContainer", "flutter/widgets.dart"],
        ["Theme", "flutter/material.dart"],
        ["ThemeData", "flutter/material.dart"],
        ["MediaQuery", "flutter/widgets.dart"],
        ["GestureDetector", "flutter/widgets.dart"],
        ["InkWell", "flutter/material.dart"],
      ].forEach(([n, lib]) =>
        S.push({
          label: n,
          kind: lib === "flutter/material.dart" ? CK.Class : CK.Interface,
          insertText: n,
          detail: lib,
          documentation: D[n] ? D[n].doc : "",
          range,
        }),
      );

      // ---- GLOBAL FUNCTIONS ----
      [
        {
          l: "print",
          i: "print(${1:object})",
          d: "void print(Object?)",
          dc: "Prints to the console.",
        },
        {
          l: "identical",
          i: "identical(${1:a}, ${2:b})",
          d: "bool identical(Object?, Object?)",
          dc: "Checks reference equality.",
        },
        {
          l: "runApp",
          i: "runApp(${1:const MyApp()})",
          d: "void runApp(Widget app)",
          dc: "Inflates the given widget and attaches it to the screen.",
        },
        {
          l: "showDialog",
          i: "showDialog(\n\tcontext: context,\n\tbuilder: (context) => ${1:AlertDialog()},\n)",
          d: "Future<T?> showDialog<T>({...})",
          dc: "Displays a Material dialog.",
        },
        {
          l: "showModalBottomSheet",
          i: "showModalBottomSheet(\n\tcontext: context,\n\tbuilder: (context) => ${1:Container()},\n)",
          d: "Future<T?> showModalBottomSheet<T>({...})",
          dc: "Shows a modal Material bottom sheet.",
        },
      ].forEach((f) =>
        S.push({
          label: f.l,
          kind: CK.Function,
          insertText: f.i,
          insertTextRules: SNIPPET,
          detail: f.d,
          documentation: f.dc,
          range,
        }),
      );

      // ---- ANNOTATIONS ----
      [
        {
          l: "@override",
          doc: "Marks a member as overriding a superclass member.",
        },
        { l: "@deprecated", doc: "Marks a declaration as deprecated." },
        {
          l: "@Deprecated",
          i: "@Deprecated('${1:message}')",
          doc: "Marks as deprecated with a message.",
        },
        { l: "@pragma", i: "@pragma('${1:name}')", doc: "A hint to tools." },
        {
          l: "@protected",
          doc: "Only usable within defining class and subclasses.",
        },
        { l: "@visibleForTesting", doc: "Visible only for testing." },
        { l: "@immutable", doc: "Marks a class as immutable." },
        { l: "@nonVirtual", doc: "Marks an instance member as non-virtual." },
        { l: "@required", doc: "Marks a named parameter as required (legacy)." },
      ].forEach((a) =>
        S.push({
          label: a.l,
          kind: CK.Property,
          insertText: a.i || a.l,
          insertTextRules: a.i ? SNIPPET : undefined,
          detail: "annotation",
          documentation: a.doc,
          range,
        }),
      );

      // ---- SNIPPETS ----
      const snips = [
        {
          l: "main",
          d: "Main function",
          t: "void main() {\n\trunApp(const ${1:MyApp}());\n}",
        },
        {
          l: "statelessWidget",
          d: "StatelessWidget",
          t: "class ${1:MyWidget} extends StatelessWidget {\n\tconst ${1:MyWidget}({super.key});\n\n\t@override\n\tWidget build(BuildContext context) {\n\t\treturn ${2:Container()};\n\t}\n}",
        },
        {
          l: "statefulWidget",
          d: "StatefulWidget",
          t: "class ${1:MyWidget} extends StatefulWidget {\n\tconst ${1:MyWidget}({super.key});\n\n\t@override\n\tState<${1:MyWidget}> createState() => _${1:MyWidget}State();\n}\n\nclass _${1:MyWidget}State extends State<${1:MyWidget}> {\n\t@override\n\tWidget build(BuildContext context) {\n\t\treturn ${2:Container()};\n\t}\n}",
        },
        {
          l: "state",
          d: "State class",
          t: "class _${1:MyWidget}State extends State<${2:MyWidget}> {\n\t@override\n\tvoid initState() {\n\t\tsuper.initState();\n\t\t$0\n\t}\n\n\t@override\n\tWidget build(BuildContext context) {\n\t\treturn ${3:Container()};\n\t}\n}",
        },
        {
          l: "materialApp",
          d: "MaterialApp",
          t: "MaterialApp(\n\ttitle: '${1:App}',\n\ttheme: ThemeData(\n\t\tcolorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),\n\t\tuseMaterial3: true,\n\t),\n\thome: const ${2:HomePage()},\n)",
        },
        {
          l: "scaffold",
          d: "Scaffold",
          t: "Scaffold(\n\tappBar: AppBar(\n\t\ttitle: const Text('${1:Title}'),\n\t),\n\tbody: ${2:Center(child: const Text('Hello'))},\n\tfloatingActionButton: FloatingActionButton(\n\t\tonPressed: () {},\n\t\tchild: const Icon(Icons.add),\n\t),\n)",
        },
        {
          l: "appBar",
          d: "AppBar",
          t: "AppBar(\n\ttitle: const Text('${1:Title}'),\n\tactions: [\n\t\tIconButton(\n\t\t\ticon: const Icon(Icons.${2:settings}),\n\t\t\tonPressed: () {},\n\t\t),\n\t],\n)",
        },
        {
          l: "column",
          d: "Column",
          t: "Column(\n\tmainAxisAlignment: MainAxisAlignment.${1:center},\n\tcrossAxisAlignment: CrossAxisAlignment.${2:center},\n\tchildren: [\n\t\t$0\n\t],\n)",
        },
        {
          l: "row",
          d: "Row",
          t: "Row(\n\tmainAxisAlignment: MainAxisAlignment.${1:center},\n\tchildren: [\n\t\t$0\n\t],\n)",
        },
        {
          l: "stack",
          d: "Stack",
          t: "Stack(\n\tchildren: [\n\t\t${1:Container()},\n\t\tPositioned(\n\t\t\t${2:top: 0, left: 0},\n\t\t\tchild: ${3:Text('')},\n\t\t),\n\t],\n)",
        },
        {
          l: "listView",
          d: "ListView",
          t: "ListView(\n\tchildren: [\n\t\t$0\n\t],\n)",
        },
        {
          l: "listViewBuilder",
          d: "ListView.builder",
          t: "ListView.builder(\n\titemCount: ${1:items.length},\n\titemBuilder: (context, index) {\n\t\treturn ${2:ListTile(title: Text('\\${${1:items}[index]}'))};\n\t},\n)",
        },
        {
          l: "gridViewBuilder",
          d: "GridView.builder",
          t: "GridView.builder(\n\tgridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(\n\t\tcrossAxisCount: ${1:2},\n\t),\n\titemCount: ${2:items.length},\n\titemBuilder: (context, index) {\n\t\treturn ${3:Card(child: Center(child: Text('\\$index')))};\n\t},\n)",
        },
        {
          l: "singleChildScrollView",
          d: "SingleChildScrollView",
          t: "SingleChildScrollView(\n\tchild: ${1:Column(children: [])},\n)",
        },
        {
          l: "container",
          d: "Container",
          t: "Container(\n\twidth: ${1:100},\n\theight: ${2:100},\n\tpadding: const EdgeInsets.all(${3:8}),\n\tdecoration: BoxDecoration(\n\t\tcolor: ${4:Colors.blue},\n\t\tborderRadius: BorderRadius.circular(${5:8}),\n\t),\n\tchild: ${6:const Text('')},\n)",
        },
        {
          l: "textField",
          d: "TextField",
          t: "TextField(\n\tcontroller: ${1:controller},\n\tdecoration: const InputDecoration(\n\t\tlabelText: '${2:Label}',\n\t\thintText: '${3:Hint}',\n\t),\n\tonChanged: (value) {\n\t\t$0\n\t},\n)",
        },
        {
          l: "form",
          d: "Form",
          t: "Form(\n\tkey: _formKey,\n\tchild: Column(\n\t\tchildren: [\n\t\t\t$0\n\t\t],\n\t),\n)",
        },
        {
          l: "elevatedButton",
          d: "ElevatedButton",
          t: "ElevatedButton(\n\tonPressed: () {\n\t\t$0\n\t},\n\tchild: const Text('${1:Button}'),\n)",
        },
        {
          l: "futureBuilder",
          d: "FutureBuilder",
          t: "FutureBuilder<${1:Type}>(\n\tfuture: ${2:future},\n\tbuilder: (context, snapshot) {\n\t\tif (snapshot.connectionState == ConnectionState.waiting) {\n\t\t\treturn const CircularProgressIndicator();\n\t\t}\n\t\tif (snapshot.hasError) {\n\t\t\treturn Text('Error: \\${snapshot.error}');\n\t\t}\n\t\treturn ${3:Text('\\${snapshot.data}')};\n\t},\n)",
        },
        {
          l: "streamBuilder",
          d: "StreamBuilder",
          t: "StreamBuilder<${1:Type}>(\n\tstream: ${2:stream},\n\tbuilder: (context, snapshot) {\n\t\t$0\n\t\treturn ${3:Container()};\n\t},\n)",
        },
        {
          l: "setState",
          d: "setState",
          t: "setState(() {\n\t$0\n});",
        },
        {
          l: "initState",
          d: "initState override",
          t: "@override\nvoid initState() {\n\tsuper.initState();\n\t$0\n}",
        },
        {
          l: "dispose",
          d: "dispose override",
          t: "@override\nvoid dispose() {\n\t${1:controller}.dispose();\n\tsuper.dispose();\n}",
        },
        {
          l: "navigateTo",
          d: "Navigate to a new route",
          t: "Navigator.of(context).push(\n\tMaterialPageRoute(builder: (context) => const ${1:NextPage}()),\n);",
        },
        {
          l: "navigateBack",
          d: "Pop the current route",
          t: "Navigator.of(context).pop();",
        },
        {
          l: "themeOf",
          d: "Access the Theme",
          t: "final theme = Theme.of(context);\n$0",
        },
        {
          l: "mediaQueryOf",
          d: "Access MediaQuery size",
          t: "final size = MediaQuery.of(context).size;\n$0",
        },
        {
          l: "showDialog",
          d: "Show an AlertDialog",
          t: "showDialog<void>(\n\tcontext: context,\n\tbuilder: (context) {\n\t\treturn AlertDialog(\n\t\t\ttitle: const Text('${1:Title}'),\n\t\t\tcontent: const Text('${2:Message}'),\n\t\t\tactions: [\n\t\t\t\tTextButton(\n\t\t\t\t\tonPressed: () => Navigator.of(context).pop(),\n\t\t\t\t\tchild: const Text('OK'),\n\t\t\t\t),\n\t\t\t],\n\t\t);\n\t},\n);",
        },
        {
          l: "snackBar",
          d: "Show a SnackBar",
          t: "ScaffoldMessenger.of(context).showSnackBar(\n\tSnackBar(content: Text('${1:Message}')),\n);",
        },
        // ---- Dart language snippets ----
        {
          l: "fun",
          d: "Function",
          t: "${1:void} ${2:name}(${3}) {\n\t$0\n}",
        },
        {
          l: "asyncFun",
          d: "Async function",
          t: "Future<${1:void}> ${2:name}(${3}) async {\n\t$0\n}",
        },
        {
          l: "arrowFun",
          d: "Arrow function",
          t: "${1:void} ${2:name}(${3}) => ${4:expression};",
        },
        {
          l: "getter",
          d: "Getter",
          t: "${1:Type} get ${2:name} => ${3:value};",
        },
        {
          l: "setter",
          d: "Setter",
          t: "set ${1:name}(${2:Type} ${3:value}) {\n\t_${1:name} = ${3:value};\n}",
        },
        {
          l: "ifElse",
          d: "If-else",
          t: "if (${1:condition}) {\n\t$2\n} else {\n\t$0\n}",
        },
        {
          l: "forIn",
          d: "For-in loop",
          t: "for (final ${1:item} in ${2:items}) {\n\t$0\n}",
        },
        {
          l: "switchExpr",
          d: "Switch expression (Dart 3)",
          t: "final ${1:result} = switch (${2:value}) {\n\t${3:pattern} => ${4:expr},\n\t_ => ${5:default},\n};",
        },
        {
          l: "tryCatch",
          d: "Try-catch",
          t: "try {\n\t$0\n} catch (e) {\n\tprint(e);\n}",
        },
        {
          l: "importPkg",
          d: "Import package",
          t: "import 'package:flutter/material.dart';$0",
        },
        {
          l: "importWidgets",
          d: "Import flutter/widgets.dart",
          t: "import 'package:flutter/widgets.dart';$0",
        },
        {
          l: "importMaterial",
          d: "Import flutter/material.dart",
          t: "import 'package:flutter/material.dart';$0",
        },
        {
          l: "importCupertino",
          d: "Import flutter/cupertino.dart",
          t: "import 'package:flutter/cupertino.dart';$0",
        },
        {
          l: "typedef",
          d: "Type alias",
          t: "typedef ${1:Name} = ${2:Type};",
        },
      ];
      snips.forEach((s) =>
        S.push({
          label: s.l,
          kind: CK.Snippet,
          insertText: s.t,
          insertTextRules: SNIPPET,
          detail: "Snippet: " + s.d,
          documentation: { value: s.d },
          range,
          sortText: "0" + s.l,
        }),
      );

      // ---- LOCAL SYMBOLS ----
      const localSyms = findLocalSymbols(model.getValue());
      const added = new Set(S.map((s) => s.label));
      localSyms.forEach((sym) => {
        if (!added.has(sym.name)) {
          added.add(sym.name);
          const kindMap = {
            class: CK.Class,
            mixin: CK.Class,
            enum: CK.Enum,
            extension: CK.Class,
            typedef: CK.Interface,
            function: CK.Function,
            variable: CK.Variable,
          };
          S.push({
            label: sym.name,
            kind: kindMap[sym.kind] || CK.Variable,
            insertText: sym.name,
            detail: "(local " + sym.kind + ")",
            range,
          });
        }
      });

      return { suggestions: S };
    },
  });

  // ===== 7. HOVER PROVIDER =====
  monaco.languages.registerHoverProvider("flutter", {
    provideHover(model, position) {
      const w = model.getWordAtPosition(position);
      if (!w) return null;
      const txt = w.word;
      const rng = new monaco.Range(
        position.lineNumber,
        w.startColumn,
        position.lineNumber,
        w.endColumn,
      );

      if (D[txt]) {
        return {
          range: rng,
          contents: [
            { value: "```dart\n" + D[txt].sig + "\n```" },
            { value: D[txt].doc },
          ],
        };
      }

      const lines = model.getLinesContent();
      const pats = [
        {
          r: new RegExp(
            "(?:abstract\\s+)?(?:sealed\\s+)?(?:base\\s+)?class\\s+" +
              txt +
              "(?:\\s|[<{]|extends|implements|with)",
          ),
          t: "class",
        },
        { r: new RegExp("mixin\\s+" + txt + "(?:\\s|[<{]|on)"), t: "mixin" },
        { r: new RegExp("enum\\s+" + txt + "(?:\\s|[<{])"), t: "enum" },
        { r: new RegExp("extension\\s+" + txt + "\\s+on"), t: "extension" },
        { r: new RegExp("typedef\\s+" + txt + "\\s*[=<]"), t: "typedef" },
        {
          r: new RegExp(
            "(?:void|int|double|String|bool|num|dynamic|Widget|Future|Stream|List|Map|Set|Iterable|Object)(?:<[^>]*>)?\\??\\s+" +
              txt +
              "\\s*[(<]",
          ),
          t: "function/method",
        },
        {
          r: new RegExp("(?:var|final|const|late)\\s+" + txt + "\\b"),
          t: "variable",
        },
      ];

      for (let i = 0; i < lines.length; i++) {
        for (const p of pats) {
          if (p.r.test(lines[i])) {
            const doc = getDocComment(lines, i);
            return {
              range: rng,
              contents: [
                { value: "```dart\n" + lines[i].trim() + "\n```" },
                ...(doc ? [{ value: doc }] : []),
                { value: "*Defined at line " + (i + 1) + "*" },
              ],
            };
          }
        }
      }
      return null;
    },
  });

  // ===== 8. DEFINITION PROVIDER =====
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
      /\b(class|interface|enum|struct|record|trait|protocol|extension|impl|actor|namespace|module|union|opaque)\b/.test(
        prefix,
      );

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
    // First scope opening at or after `offset` (a signature's body). A call
    // like `f(x)` is not a signature: anything past a statement boundary is
    // rejected so it cannot be mistaken for a parameter list.
    const nextScope = (offset: number) => {
      let found: Scope | undefined;
      for (const scope of scopes) {
        if (scope.start >= offset && (!found || scope.start < found.start))
          found = scope;
      }
      if (found && /[;}]/.test(lines.join("\n").slice(offset, found.start)))
        return undefined;
      return found;
    };

    // Local declarations: var/final/const/late, typed locals, for-each bindings
    // and parameters.
    const declaration = new RegExp(
      "\\b(?:var|final|const|late)\\s+" +
        esc(name) +
        "\\b|\\b(?:[A-Z][A-Za-z0-9_]*|int|double|num|String|bool|dynamic|Object|void)(?:\\s*<[^;{}()]*>)?\\??\\s+" +
        esc(name) +
        "\\s*[=;,)\\]}?]|(?:[(,{[]\\s*)" +
        esc(name) +
        "\\s*[,:}\\])]",
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
          /^[(,|[{[]/.test(m[0]) ||
          /[(,{[]$/.test(before) ||
          /\brequired$/.test(before);
        const owner = isParam
          ? nextScope(at(i, m.index))
          : enclosing(at(i, m.index));
        // A parameter list must bind to a body; otherwise this is a call, not a
        // declaration, and must not shadow the real binding.
        if (isParam && !owner) continue;
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

  monaco.languages.registerDefinitionProvider("flutter", {
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
      const w = model.getWordAtPosition(position);
      if (!w) return null;
      const txt = w.word;
      const lines = model.getLinesContent();
      const pats = [
        new RegExp(
          "(?:abstract\\s+)?(?:sealed\\s+)?(?:base\\s+)?class\\s+" +
            txt +
            "(?:\\s|[<{]|extends|implements|with)",
        ),
        new RegExp("mixin\\s+" + txt + "(?:\\s|[<{]|on)"),
        new RegExp("enum\\s+" + txt + "(?:\\s|[<{])"),
        new RegExp("extension\\s+" + txt + "\\s+on"),
        new RegExp("typedef\\s+" + txt + "\\s*[=<]"),
        new RegExp(
          "(?:void|int|double|String|bool|num|dynamic|Widget|var|final|const|late|Future|Stream|List|Map|Set|Iterable|Object)(?:<[^>]*>)?\\??\\s+" +
            txt +
            "\\s*[\\(;=,]",
        ),
        new RegExp("\\b" + txt + "\\s*\\([^)]*\\)\\s*\\{"),
      ];
      for (let i = 0; i < lines.length; i++) {
        for (const p of pats) {
          if (p.test(lines[i])) {
            const col = lines[i].indexOf(txt) + 1;
            return {
              uri: model.uri,
              range: new monaco.Range(i + 1, col, i + 1, col + txt.length),
            };
          }
        }
      }
      return null;
    },
  });

  // ===== 9. SIGNATURE HELP PROVIDER =====
  monaco.languages.registerSignatureHelpProvider("flutter", {
    signatureHelpTriggerCharacters: ["(", ","],
    provideSignatureHelp(model, position) {
      const line = model.getLineContent(position.lineNumber);
      const before = line.substring(0, position.column - 1);
      const m = before.match(/(\w+)\s*\([^)]*$/);
      if (!m) return null;
      const fn = m[1];
      const afterParen = before.substring(before.lastIndexOf("(") + 1);
      const activeParam = (afterParen.match(/,/g) || []).length;

      const sigs = {
        print: {
          l: "void print(Object? object)",
          d: "Prints a string representation to the console.",
          p: [
            { label: "Object? object", documentation: "The object to print." },
          ],
        },
        identical: {
          l: "bool identical(Object? a, Object? b)",
          d: "Check reference equality.",
          p: [
            { label: "Object? a", documentation: "First object." },
            { label: "Object? b", documentation: "Second object." },
          ],
        },
        runApp: {
          l: "void runApp(Widget app)",
          d: "Inflates the widget and attaches it to the screen.",
          p: [{ label: "Widget app", documentation: "The root widget." }],
        },
        MaterialApp: {
          l: "MaterialApp({Key? key, String? title, ThemeData? theme, Widget? home, ...})",
          d: "Creates a Material Design application.",
          p: [
            { label: "Key? key", documentation: "Widget key." },
            { label: "String? title", documentation: "App title." },
            { label: "ThemeData? theme", documentation: "App theme." },
            { label: "Widget? home", documentation: "Default route widget." },
          ],
        },
        Scaffold: {
          l: "Scaffold({Key? key, PreferredSizeWidget? appBar, Widget? body, Widget? floatingActionButton, Widget? drawer, ...})",
          d: "Implements the basic Material Design visual layout.",
          p: [
            { label: "Key? key", documentation: "Widget key." },
            {
              label: "PreferredSizeWidget? appBar",
              documentation: "App bar.",
            },
            { label: "Widget? body", documentation: "Primary content." },
            {
              label: "Widget? floatingActionButton",
              documentation: "Primary action button.",
            },
            { label: "Widget? drawer", documentation: "Side panel." },
          ],
        },
        Text: {
          l: "Text(String data, {Key? key, TextStyle? style, TextAlign? textAlign, int? maxLines, ...})",
          d: "A run of text with a single style.",
          p: [
            { label: "String data", documentation: "The text to display." },
            { label: "Key? key", documentation: "Widget key." },
            { label: "TextStyle? style", documentation: "Text style." },
            { label: "TextAlign? textAlign", documentation: "Alignment." },
          ],
        },
        Container: {
          l: "Container({Key? key, double? width, double? height, EdgeInsetsGeometry? padding, EdgeInsetsGeometry? margin, BoxDecoration? decoration, Widget? child, ...})",
          d: "A convenience widget combining painting, positioning and sizing.",
          p: [
            { label: "Key? key", documentation: "Widget key." },
            { label: "double? width", documentation: "Box width." },
            { label: "double? height", documentation: "Box height." },
            {
              label: "EdgeInsetsGeometry? padding",
              documentation: "Inner padding.",
            },
            { label: "Widget? child", documentation: "Child widget." },
          ],
        },
        EdgeInsets: {
          l: "EdgeInsets.all(double value)",
          d: "Creates insets with the same value on all sides.",
          p: [{ label: "double value", documentation: "Inset for each side." }],
        },
        Column: {
          l: "Column({Key? key, MainAxisAlignment mainAxisAlignment, List<Widget> children})",
          d: "Displays children in a vertical array.",
          p: [
            { label: "Key? key", documentation: "Widget key." },
            {
              label: "MainAxisAlignment mainAxisAlignment",
              documentation: "Vertical alignment.",
            },
            {
              label: "List<Widget> children",
              documentation: "The widgets below one another.",
            },
          ],
        },
        Row: {
          l: "Row({Key? key, MainAxisAlignment mainAxisAlignment, List<Widget> children})",
          d: "Displays children in a horizontal array.",
          p: [
            { label: "Key? key", documentation: "Widget key." },
            {
              label: "MainAxisAlignment mainAxisAlignment",
              documentation: "Horizontal alignment.",
            },
            {
              label: "List<Widget> children",
              documentation: "The widgets beside one another.",
            },
          ],
        },
        ElevatedButton: {
          l: "ElevatedButton({Key? key, VoidCallback? onPressed, Widget? child})",
          d: "A Material Design elevated button.",
          p: [
            { label: "Key? key", documentation: "Widget key." },
            {
              label: "VoidCallback? onPressed",
              documentation: "Tap callback.",
            },
            { label: "Widget? child", documentation: "Button content." },
          ],
        },
        TextField: {
          l: "TextField({Key? key, TextEditingController? controller, InputDecoration? decoration, ValueChanged<String>? onChanged, ...})",
          d: "A Material Design text field.",
          p: [
            { label: "Key? key", documentation: "Widget key." },
            {
              label: "TextEditingController? controller",
              documentation: "Controls the text.",
            },
            {
              label: "InputDecoration? decoration",
              documentation: "Decoration.",
            },
            {
              label: "ValueChanged<String>? onChanged",
              documentation: "Value change callback.",
            },
          ],
        },
        ListView: {
          l: "ListView({Key? key, bool? shrinkWrap, List<Widget> children})",
          d: "A scrollable list of widgets.",
          p: [
            { label: "Key? key", documentation: "Widget key." },
            { label: "bool? shrinkWrap", documentation: "Size to content." },
            { label: "List<Widget> children", documentation: "List items." },
          ],
        },
        Duration: {
          l: "Duration({int days, int hours, int minutes, int seconds, int milliseconds, int microseconds})",
          d: "Creates a Duration.",
          p: [
            { label: "int days", documentation: "Days." },
            { label: "int hours", documentation: "Hours." },
            { label: "int minutes", documentation: "Minutes." },
            { label: "int seconds", documentation: "Seconds." },
            { label: "int milliseconds", documentation: "Milliseconds." },
            { label: "int microseconds", documentation: "Microseconds." },
          ],
        },
        RegExp: {
          l: "RegExp(String source, {bool multiLine, bool caseSensitive})",
          d: "Creates a regular expression.",
          p: [
            { label: "String source", documentation: "The pattern." },
            { label: "bool multiLine", documentation: "Match across lines." },
            { label: "bool caseSensitive", documentation: "Case sensitive." },
          ],
        },
        "Future.delayed": {
          l: "Future.delayed(Duration duration, [FutureOr<T> Function()? computation])",
          d: "Creates a future that completes after a delay.",
          p: [
            { label: "Duration duration", documentation: "The delay." },
            {
              label: "FutureOr<T> Function()? computation",
              documentation: "Computation after delay.",
            },
          ],
        },
        showDialog: {
          l: "Future<T?> showDialog<T>({required BuildContext context, required WidgetBuilder builder})",
          d: "Displays a Material dialog above the current contents.",
          p: [
            { label: "BuildContext context", documentation: "Build context." },
            { label: "WidgetBuilder builder", documentation: "Dialog content." },
          ],
        },
      };

      let sig = sigs[fn];
      if (!sig) {
        const text = model.getValue();
        const fp = new RegExp(
          "(?:\\w+(?:<[^>]*>)?\\??\\s+)?" + fn + "\\s*\\(([^)]*)\\)",
          "m",
        );
        const fm = text.match(fp);
        if (fm) {
          const params = fm[1]
            .split(",")
            .map((p) => p.trim())
            .filter(Boolean);
          sig = {
            l: fm[0].trim(),
            d: "",
            p: params.map((p) => ({ label: p, documentation: "" })),
          };
        }
      }
      if (!sig) return null;

      return {
        value: {
          signatures: [
            { label: sig.l, documentation: sig.d, parameters: sig.p },
          ],
          activeSignature: 0,
          activeParameter: activeParam,
        },
        dispose() {},
      };
    },
  });

  // ===== 10. DOCUMENT SYMBOL PROVIDER =====
  monaco.languages.registerDocumentSymbolProvider("flutter", {
    provideDocumentSymbols(model) {
      const syms = [];
      const SK = monaco.languages.SymbolKind;
      const lines = model.getLinesContent();
      const pats = [
        {
          r: /(?:abstract\s+)?(?:sealed\s+)?(?:base\s+)?class\s+(\w+)/,
          k: SK.Class,
        },
        { r: /mixin\s+(\w+)/, k: SK.Class },
        { r: /enum\s+(\w+)/, k: SK.Enum },
        { r: /extension\s+(\w+)/, k: SK.Class },
        { r: /typedef\s+(\w+)/, k: SK.Interface },
        {
          r: /(?:void|int|double|String|bool|num|Widget|Future|Stream|dynamic|List|Map|Set)\S*\s+(\w+)\s*\(/,
          k: SK.Function,
        },
        { r: /(?:get|set)\s+(\w+)/, k: SK.Property },
      ];
      lines.forEach((line, i) => {
        if (line.trim().startsWith("//")) return;
        pats.forEach((p) => {
          const m = line.match(p.r);
          if (m) {
            const c = line.indexOf(m[1]) + 1;
            syms.push({
              name: m[1],
              kind: p.k,
              range: new monaco.Range(i + 1, 1, i + 1, line.length + 1),
              selectionRange: new monaco.Range(
                i + 1,
                c,
                i + 1,
                c + m[1].length,
              ),
              detail: "",
              tags: [],
            });
          }
        });
      });
      return syms;
    },
  });

  // ===== 11. FOLDING RANGE PROVIDER =====
  monaco.languages.registerFoldingRangeProvider("flutter", {
    provideFoldingRanges(model) {
      const ranges = [];
      const lines = model.getLinesContent();
      const braceStack = [];
      const commentStarts = [];

      lines.forEach((line, i) => {
        const t = line.trim();
        if (t.startsWith("/*") || t.startsWith("/**")) commentStarts.push(i);
        if (t.endsWith("*/") && commentStarts.length) {
          const s = commentStarts.pop();
          if (s !== i)
            ranges.push({
              start: s + 1,
              end: i + 1,
              kind: monaco.languages.FoldingRangeKind.Comment,
            });
        }
        for (const ch of line) {
          if (ch === "{") braceStack.push(i);
          else if (ch === "}" && braceStack.length) {
            const s = braceStack.pop();
            if (s !== i)
              ranges.push({
                start: s + 1,
                end: i + 1,
                kind: monaco.languages.FoldingRangeKind.Region,
              });
          }
        }
        if (
          t.startsWith("import ") &&
          (i === 0 || !lines[i - 1].trim().startsWith("import "))
        ) {
          let e = i;
          while (
            e + 1 < lines.length &&
            lines[e + 1].trim().startsWith("import ")
          )
            e++;
          if (e > i)
            ranges.push({
              start: i + 1,
              end: e + 1,
              kind: monaco.languages.FoldingRangeKind.Imports,
            });
        }
      });
      return ranges;
    },
  });

  // ===== 12. RENAME PROVIDER (scope-aware) =====
  monaco.languages.registerRenameProvider("flutter", {
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
