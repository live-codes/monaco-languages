import type * as Monaco from "monaco-editor";
import { SvelteTransformer, type TransformResult } from "./svelte-transformer";

// ── Ambient type definitions registered as extra libs ─────────────────────────

export const svelteTypeDefinitions = `
// ── Svelte core ─────────────────────────────────────────────────────────────
declare module 'svelte' {
  export function onMount(fn: () => void | (() => void)): void;
  export function onDestroy(fn: () => void): void;
  export function beforeUpdate(fn: () => void): void;
  export function afterUpdate(fn: () => void): void;
  export function tick(): Promise<void>;
  export function mount<T extends Record<string, any>>(
    component: any,
    options: { target: Element; props?: T; events?: Record<string, (e: any) => void> }
  ): any;
  export function unmount(component: any): void;
  export function untrack<T>(fn: () => T): T;
  export function flushSync(fn?: () => void): void;
  export function createEventDispatcher<T extends Record<string, any>>(): <K extends keyof T>(type: K, detail?: T[K]) => void;
  export function setContext<T>(key: any, context: T): T;
  export function getContext<T>(key: any): T;
  export function hasContext(key: any): boolean;
  export function getAllContexts<T extends Map<any, any>>(): T;
  export type Snippet<Params extends any[] = []> = (...params: Params) => void;
  export type Component<Props extends Record<string, any> = {}> = any;
}

// ── Svelte store ────────────────────────────────────────────────────────────
declare module 'svelte/store' {
  export interface Readable<T> {
    subscribe(run: (value: T) => void, invalidate?: (value?: T) => void): () => void;
  }
  export interface Writable<T> extends Readable<T> {
    set(value: T): void;
    update(updater: (value: T) => T): void;
  }
  export function writable<T>(value?: T, start?: (set: (value: T) => void) => void | (() => void)): Writable<T>;
  export function readable<T>(value?: T, start?: (set: (value: T) => void) => void | (() => void)): Readable<T>;
  export function derived<T, S>(
    stores: Readable<S> | [Readable<S>, ...Readable<any>[]],
    fn: (values: S | [S, ...any[]]) => T,
    initial_value?: T
  ): Readable<T>;
  export function get<T>(store: Readable<T>): T;
}

// ── Svelte motion ───────────────────────────────────────────────────────────
declare module 'svelte/motion' {
  import type { Readable } from 'svelte/store';
  export interface TweenedOptions<T> {
    delay?: number;
    duration?: number | ((from: T, to: T) => number);
    easing?: (t: number) => number;
    interpolate?: (a: T, b: T) => (t: number) => T;
  }
  export interface SpringOpts { stiffness?: number; damping?: number; precision?: number; }
  export function tweened<T>(value?: T, defaults?: TweenedOptions<T>): Readable<T> & { set(value: T, opts?: TweenedOptions<T>): Promise<void>; update(updater: (value: T) => T, opts?: TweenedOptions<T>): Promise<void>; };
  export function spring<T>(value?: T, opts?: SpringOpts): Readable<T> & { set(value: T, opts?: { hard?: boolean; soft?: boolean | number }): Promise<void>; update(updater: (value: T) => T, opts?: { hard?: boolean; soft?: boolean | number }): Promise<void>; precision: number; damping: number; stiffness: number; };
}

// ── Svelte transition ───────────────────────────────────────────────────────
declare module 'svelte/transition' {
  export interface TransitionConfig { delay?: number; duration?: number; easing?: (t: number) => number; css?: (t: number, u: number) => string; tick?: (t: number, u: number) => void; }
  export interface FadeParams { delay?: number; duration?: number; easing?: (t: number) => number; }
  export interface BlurParams extends FadeParams { amount?: number; opacity?: number; }
  export interface FlyParams extends FadeParams { x?: number; y?: number; opacity?: number; }
  export interface SlideParams extends FadeParams { axis?: 'x' | 'y'; }
  export interface ScaleParams extends FadeParams { start?: number; opacity?: number; }
  export interface DrawParams extends FadeParams { speed?: number; }
  export function fade(node: Element, params?: FadeParams): TransitionConfig;
  export function blur(node: Element, params?: BlurParams): TransitionConfig;
  export function fly(node: Element, params?: FlyParams): TransitionConfig;
  export function slide(node: Element, params?: SlideParams): TransitionConfig;
  export function scale(node: Element, params?: ScaleParams): TransitionConfig;
  export function draw(node: SVGElement & { getTotalLength(): number }, params?: DrawParams): TransitionConfig;
  export function crossfade(params?: { delay?: number; duration?: number; easing?: (t: number) => number; fallback?: (node: Element, params: any, intro: boolean) => TransitionConfig }): [(node: Element, params: any) => TransitionConfig, (node: Element, params: any) => TransitionConfig];
}

// ── Svelte animate ──────────────────────────────────────────────────────────
declare module 'svelte/animate' {
  export interface FlipParams { delay?: number; duration?: number | ((len: number) => number); easing?: (t: number) => number; }
  export function flip(node: Element, animation: { from: DOMRect; to: DOMRect }, params?: FlipParams): { delay?: number; duration?: number; easing?: (t: number) => number; css?: (t: number, u: number) => string; tick?: (t: number, u: number) => void; };
}

// ── Svelte easing ───────────────────────────────────────────────────────────
declare module 'svelte/easing' {
  export function linear(t: number): number;
  export function backInOut(t: number): number;
  export function backIn(t: number): number;
  export function backOut(t: number): number;
  export function bounceOut(t: number): number;
  export function bounceInOut(t: number): number;
  export function bounceIn(t: number): number;
  export function circInOut(t: number): number;
  export function circIn(t: number): number;
  export function circOut(t: number): number;
  export function cubicInOut(t: number): number;
  export function cubicIn(t: number): number;
  export function cubicOut(t: number): number;
  export function elasticInOut(t: number): number;
  export function elasticIn(t: number): number;
  export function elasticOut(t: number): number;
  export function expoInOut(t: number): number;
  export function expoIn(t: number): number;
  export function expoOut(t: number): number;
  export function quadInOut(t: number): number;
  export function quadIn(t: number): number;
  export function quadOut(t: number): number;
  export function quartInOut(t: number): number;
  export function quartIn(t: number): number;
  export function quartOut(t: number): number;
  export function quintInOut(t: number): number;
  export function quintIn(t: number): number;
  export function quintOut(t: number): number;
  export function sineInOut(t: number): number;
  export function sineIn(t: number): number;
  export function sineOut(t: number): number;
}
`;

// ── Shadow file record ────────────────────────────────────────────────────────

interface ShadowFile {
  uri: string;
  model: Monaco.editor.ITextModel;
  transformResult: TransformResult;
  disposables: Monaco.IDisposable[];
}

// ── Main IntelliSense class ───────────────────────────────────────────────────

export class SvelteIntelliSense {
  private monaco: typeof Monaco;
  private transformer: SvelteTransformer;
  private shadowFiles = new Map<string, ShadowFile>();
  private disposables: Monaco.IDisposable[] = [];

  constructor(monaco: typeof Monaco) {
    this.monaco = monaco;
    this.transformer = new SvelteTransformer();
    this.initialize();
  }

  // ── Bootstrap ───────────────────────────────────────────────────────────────

  private initialize(): void {
    this.configureTypeScript();
    this.registerAmbientTypes();

    this.disposables.push(
      this.monaco.editor.onDidCreateModel((model) => {
        if (this.isSvelteFile(model)) {
          this.registerModel(model);
        }
      }),
    );

    this.disposables.push(
      this.monaco.editor.onWillDisposeModel((model) => {
        if (this.isSvelteFile(model)) {
          this.unregisterModel(model);
        }
      }),
    );

    this.registerProviders();

    this.monaco.editor.getModels().forEach((model) => {
      if (this.isSvelteFile(model)) {
        this.registerModel(model);
      }
    });
  }

  private isSvelteFile(model: Monaco.editor.ITextModel): boolean {
    return (
      model.getLanguageId() === "svelte" || model.uri.path.endsWith(".svelte")
    );
  }

  // ── TypeScript configuration ────────────────────────────────────────────────

  private configureTypeScript(): void {
    const compilerOptions: Monaco.languages.typescript.CompilerOptions = {
      target: this.monaco.languages.typescript.ScriptTarget.ESNext,
      module: this.monaco.languages.typescript.ModuleKind.ESNext,
      moduleResolution:
        this.monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      allowJs: true,
      checkJs: false,
      strict: true,
      noEmit: true,
      esModuleInterop: true,
      allowSyntheticDefaultImports: true,
      forceConsistentCasingInFileNames: true,
      skipLibCheck: true,
      lib: ["ESNext", "DOM", "DOM.Iterable"],
      suppressImplicitAnyIndexErrors: true,
    };

    this.monaco.languages.typescript.typescriptDefaults.setCompilerOptions(
      compilerOptions,
    );
    this.monaco.languages.typescript.javascriptDefaults.setCompilerOptions(
      compilerOptions,
    );

    const diagnosticsOptions: Monaco.languages.typescript.DiagnosticsOptions = {
      noSemanticValidation: false,
      noSyntaxValidation: false,
      diagnosticCodesToIgnore: [
        2304, // Cannot find name
        2339, // Property does not exist
        2307, // Cannot find module
        7006, // Parameter implicitly has 'any' type
        7028, // Unused label ($: reactive labels)
        7031, // Binding element implicitly has 'any' type
        1184, // Modifiers cannot appear here
      ],
    };

    this.monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions(
      diagnosticsOptions,
    );
  }

  private registerAmbientTypes(): void {
    this.monaco.languages.typescript.typescriptDefaults.addExtraLib(
      svelteTypeDefinitions,
      "svelte-ambient-types.d.ts",
    );
    this.monaco.languages.typescript.javascriptDefaults.addExtraLib(
      svelteTypeDefinitions,
      "svelte-ambient-types.d.ts",
    );
  }

  // ── Shadow model management ─────────────────────────────────────────────────

  private registerModel(model: Monaco.editor.ITextModel): void {
    const uri = model.uri.toString();
    if (this.shadowFiles.has(uri)) return;

    const shadowUri = this.getShadowUri(uri);
    const transformResult = this.transformer.transform(model.getValue());

    const jsLib =
      this.monaco.languages.typescript.javascriptDefaults.addExtraLib(
        transformResult.code,
        shadowUri,
      );
    const tsLib =
      this.monaco.languages.typescript.typescriptDefaults.addExtraLib(
        transformResult.code,
        shadowUri,
      );

    const changeDisposable = model.onDidChangeContent(() => {
      this.updateModel(model);
    });

    this.shadowFiles.set(uri, {
      uri: shadowUri,
      model,
      transformResult,
      disposables: [jsLib, tsLib, changeDisposable],
    });
  }

  private updateModel(model: Monaco.editor.ITextModel): void {
    const uri = model.uri.toString();
    const shadowFile = this.shadowFiles.get(uri);
    if (!shadowFile) return;

    const transformResult = this.transformer.transform(model.getValue());
    shadowFile.transformResult = transformResult;

    // Dispose old extra libs and re-register
    shadowFile.disposables.slice(0, 2).forEach((d) => d.dispose());

    const jsLib =
      this.monaco.languages.typescript.javascriptDefaults.addExtraLib(
        transformResult.code,
        shadowFile.uri,
      );
    const tsLib =
      this.monaco.languages.typescript.typescriptDefaults.addExtraLib(
        transformResult.code,
        shadowFile.uri,
      );

    shadowFile.disposables[0] = jsLib;
    shadowFile.disposables[1] = tsLib;
  }

  private unregisterModel(model: Monaco.editor.ITextModel): void {
    const uri = model.uri.toString();
    const shadowFile = this.shadowFiles.get(uri);
    if (shadowFile) {
      shadowFile.disposables.forEach((d) => d.dispose());
      this.shadowFiles.delete(uri);
    }
  }

  private getShadowUri(svelteUri: string): string {
    return svelteUri.replace(/\.svelte$/, ".tsx");
  }

  // ── Language-feature provider registration ──────────────────────────────────

  private registerProviders(): void {
    this.disposables.push(
      this.monaco.languages.registerCompletionItemProvider("svelte", {
        triggerCharacters: [
          ".",
          "<",
          ":",
          '"',
          "'",
          "/",
          "{",
          " ",
          "$",
          "#",
          "@",
        ],
        provideCompletionItems: async (model, position, context, token) =>
          this.provideCompletions(model, position, context, token),
      }),
    );

    this.disposables.push(
      this.monaco.languages.registerHoverProvider("svelte", {
        provideHover: async (model, position, token) =>
          this.provideHover(model, position, token),
      }),
    );

    this.disposables.push(
      this.monaco.languages.registerDefinitionProvider("svelte", {
        provideDefinition: async (model, position, token) =>
          this.provideDefinition(model, position, token),
      }),
    );

    this.disposables.push(
      this.monaco.languages.registerSignatureHelpProvider("svelte", {
        signatureHelpTriggerCharacters: ["(", ","],
        signatureHelpRetriggerCharacters: [","],
        provideSignatureHelp: async (model, position, token, context) =>
          this.provideSignatureHelp(model, position, token, context),
      }),
    );

    this.disposables.push(
      this.monaco.languages.registerDocumentHighlightProvider("svelte", {
        provideDocumentHighlights: async (model, position, token) =>
          this.provideDocumentHighlights(model, position, token),
      }),
    );

    this.disposables.push(
      this.monaco.languages.registerReferenceProvider("svelte", {
        provideReferences: async (model, position, context, token) =>
          this.provideReferences(model, position, context, token),
      }),
    );

    this.disposables.push(
      this.monaco.languages.registerRenameProvider("svelte", {
        provideRenameEdits: async (model, position, newName, token) =>
          this.provideRenameEdits(model, position, newName, token),
        resolveRenameLocation: async (model, position, token) =>
          this.resolveRenameLocation(model, position, token),
      }),
    );
  }

  // ── TypeScript worker helper ────────────────────────────────────────────────

  private async getTypeScriptWorker(uri: Monaco.Uri): Promise<any> {
    const worker = await this.monaco.languages.typescript.getTypeScriptWorker();
    return worker(uri);
  }

  // ── Completions ─────────────────────────────────────────────────────────────

  private async provideCompletions(
    model: Monaco.editor.ITextModel,
    position: Monaco.Position,
    context: Monaco.languages.CompletionContext,
    token: Monaco.CancellationToken,
  ): Promise<Monaco.languages.CompletionList | null> {
    const uri = model.uri.toString();
    const shadowFile = this.shadowFiles.get(uri);
    if (!shadowFile) return null;

    const offset = model.getOffsetAt(position);
    const tsOffset =
      shadowFile.transformResult.sourceMap.originalToGenerated(offset);

    try {
      const shadowUri = this.monaco.Uri.parse(shadowFile.uri);
      const client = await this.getTypeScriptWorker(shadowUri);

      const completions = await client.getCompletionsAtPosition(
        shadowFile.uri,
        tsOffset,
        {},
      );

      const word = model.getWordUntilPosition(position);
      const range: Monaco.IRange = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };

      const svelteCompletions = this.getSvelteSpecificCompletions(
        model,
        position,
      );

      const tsSuggestions =
        completions?.entries?.map((entry: any) =>
          this.convertCompletion(entry, range),
        ) ?? [];

      return { suggestions: [...svelteCompletions, ...tsSuggestions] };
    } catch (error) {
      console.error("Svelte completion error:", error);
      return null;
    }
  }

  private getSvelteSpecificCompletions(
    model: Monaco.editor.ITextModel,
    position: Monaco.Position,
  ): Monaco.languages.CompletionItem[] {
    const lineContent = model.getLineContent(position.lineNumber);
    const textBeforeCursor = lineContent.substring(0, position.column - 1);

    const word = model.getWordUntilPosition(position);
    const range: Monaco.IRange = {
      startLineNumber: position.lineNumber,
      endLineNumber: position.lineNumber,
      startColumn: word.startColumn,
      endColumn: word.endColumn,
    };

    const completions: Monaco.languages.CompletionItem[] = [];

    if (this.isInMarkup(model, position)) {
      if (textBeforeCursor.match(/\{[#:@/]?$/)) {
        completions.push(...this.getBlockCompletions(range));
      }
      if (
        textBeforeCursor.match(
          /\s(?:bind|on|use|transition|in|out|animate|class|style|let):?$/,
        )
      ) {
        completions.push(...this.getDirectiveCompletions(range));
      }
    }

    if (
      this.isInScript(model, position) &&
      !this.isInImportStatement(model, position)
    ) {
      if (textBeforeCursor.match(/\$\w*$/)) {
        completions.push(...this.getRuneCompletions(range));
      }
    }

    return completions;
  }

  private isInImportStatement(
    model: Monaco.editor.ITextModel,
    position: Monaco.Position,
  ): boolean {
    // Check current line first (covers single-line imports)
    const currentLine = model.getLineContent(position.lineNumber);
    if (/^\s*import\b/.test(currentLine)) {
      return true;
    }

    // For multi-line imports, walk backwards to find an unclosed import
    for (let lineNum = position.lineNumber - 1; lineNum >= 1; lineNum--) {
      const line = model.getLineContent(lineNum);

      if (/^\s*import\b/.test(line)) {
        // Found an import — check if it was closed (semicolon) before our position
        for (let l = lineNum; l <= position.lineNumber; l++) {
          const content =
            l === position.lineNumber
              ? model.getLineContent(l).substring(0, position.column - 1)
              : model.getLineContent(l);
          if (content.includes(";")) {
            return false;
          }
        }
        return true;
      }

      // Stop scanning if we hit a non-empty line that can't be part of a multi-line import
      const trimmed = line.trim();
      if (
        trimmed.length > 0 &&
        !/^[{},*'"\s]/.test(trimmed) &&
        !/^}/.test(trimmed)
      ) {
        break;
      }
    }

    return false;
  }

  private isInMarkup(
    model: Monaco.editor.ITextModel,
    position: Monaco.Position,
  ): boolean {
    return (
      !this.isInScript(model, position) && !this.isInStyle(model, position)
    );
  }

  private isInScript(
    model: Monaco.editor.ITextModel,
    position: Monaco.Position,
  ): boolean {
    const text = model.getValue();
    const offset = model.getOffsetAt(position);

    const scriptRegex = /<script[^>]*>/gi;
    let match: RegExpExecArray | null;

    while ((match = scriptRegex.exec(text)) !== null) {
      const openEnd = match.index + match[0].length;
      const closeStart = text.indexOf("</script>", openEnd);
      if (closeStart !== -1 && offset > openEnd && offset < closeStart) {
        return true;
      }
    }

    return false;
  }

  private isInStyle(
    model: Monaco.editor.ITextModel,
    position: Monaco.Position,
  ): boolean {
    const text = model.getValue();
    const offset = model.getOffsetAt(position);

    const styleRegex = /<style[^>]*>/gi;
    let match: RegExpExecArray | null;

    while ((match = styleRegex.exec(text)) !== null) {
      const openEnd = match.index + match[0].length;
      const closeStart = text.indexOf("</style>", openEnd);
      if (closeStart !== -1 && offset > openEnd && offset < closeStart) {
        return true;
      }
    }

    return false;
  }

  private getBlockCompletions(
    range: Monaco.IRange,
  ): Monaco.languages.CompletionItem[] {
    const blocks = [
      {
        name: "{#if}",
        snippet: "#if ${1:cond}}$0{/if}",
        doc: "Conditional block",
      },
      {
        name: "{#each}",
        snippet: "#each ${1:items} as ${2:item}}$0{/each}",
        doc: "Each block",
      },
      {
        name: "{#await}",
        snippet: "#await ${1:promise}}{:then ${2:val}}$0{/await}",
        doc: "Await block",
      },
      { name: "{#key}", snippet: "#key ${1:expr}}$0{/key}", doc: "Key block" },
      {
        name: "{#snippet}",
        snippet: "#snippet ${1:name}(${2})}$0{/snippet}",
        doc: "Snippet block (Svelte 5)",
      },
      { name: "{@html}", snippet: "@html ${1:expr}}", doc: "Raw HTML" },
      { name: "{@debug}", snippet: "@debug ${1:var}}", doc: "Debug tag" },
      {
        name: "{@const}",
        snippet: "@const ${1:x} = ${2:expr}}",
        doc: "Const declaration",
      },
      {
        name: "{@render}",
        snippet: "@render ${1:snippet}()}",
        doc: "Render snippet (Svelte 5)",
      },
    ];

    return blocks.map((b) => ({
      label: b.name,
      kind: this.monaco.languages.CompletionItemKind.Snippet,
      insertText: b.snippet,
      insertTextRules:
        this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: b.doc,
      detail: "Svelte Block",
      range,
    }));
  }

  private getDirectiveCompletions(
    range: Monaco.IRange,
  ): Monaco.languages.CompletionItem[] {
    const directives = [
      { name: "bind:value", doc: "Two-way binding" },
      { name: "bind:this", doc: "Element reference binding" },
      { name: "on:click", doc: "Event listener (Svelte 4)" },
      { name: "use:action", doc: "Action directive" },
      { name: "transition:fade", doc: "Bidirectional transition" },
      { name: "in:fly", doc: "Intro transition" },
      { name: "out:fade", doc: "Outro transition" },
      { name: "animate:flip", doc: "FLIP animation" },
      { name: "class:active", doc: "Conditional class" },
      { name: "style:color", doc: "Inline style property" },
      { name: "let:item", doc: "Slot prop" },
    ];

    return directives.map((d) => ({
      label: d.name,
      kind: this.monaco.languages.CompletionItemKind.Keyword,
      insertText: d.name,
      documentation: d.doc,
      detail: "Svelte Directive",
      range,
    }));
  }

  private getRuneCompletions(
    range: Monaco.IRange,
  ): Monaco.languages.CompletionItem[] {
    const runes = [
      { name: "$state", insert: "$state(${1})", doc: "Reactive state" },
      { name: "$derived", insert: "$derived(${1})", doc: "Derived value" },
      {
        name: "$derived.by",
        insert: "$derived.by(() => ${1})",
        doc: "Derived with function",
      },
      {
        name: "$effect",
        insert: "$effect(() => {\n\t$0\n});",
        doc: "Side effect",
      },
      {
        name: "$effect.pre",
        insert: "$effect.pre(() => {\n\t$0\n});",
        doc: "Pre-DOM effect",
      },
      { name: "$props", insert: "$props()", doc: "Component props" },
      {
        name: "$bindable",
        insert: "$bindable(${1})",
        doc: "Bindable prop default",
      },
      { name: "$inspect", insert: "$inspect(${1})", doc: "Dev-only inspector" },
      { name: "$host", insert: "$host()", doc: "Custom element host" },
    ];

    return runes.map((r) => ({
      label: r.name,
      kind: this.monaco.languages.CompletionItemKind.Function,
      insertText: r.insert,
      insertTextRules:
        this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: r.doc,
      detail: "Svelte 5 Rune",
      range,
    }));
  }

  private convertCompletion(
    entry: any,
    range: Monaco.IRange,
  ): Monaco.languages.CompletionItem {
    const kindMap: Record<string, Monaco.languages.CompletionItemKind> = {
      function: this.monaco.languages.CompletionItemKind.Function,
      method: this.monaco.languages.CompletionItemKind.Method,
      property: this.monaco.languages.CompletionItemKind.Property,
      variable: this.monaco.languages.CompletionItemKind.Variable,
      class: this.monaco.languages.CompletionItemKind.Class,
      interface: this.monaco.languages.CompletionItemKind.Interface,
      module: this.monaco.languages.CompletionItemKind.Module,
      keyword: this.monaco.languages.CompletionItemKind.Keyword,
      const: this.monaco.languages.CompletionItemKind.Constant,
      let: this.monaco.languages.CompletionItemKind.Variable,
      type: this.monaco.languages.CompletionItemKind.TypeParameter,
      enum: this.monaco.languages.CompletionItemKind.Enum,
      "enum member": this.monaco.languages.CompletionItemKind.EnumMember,
    };

    return {
      label: entry.name,
      kind:
        kindMap[entry.kind] || this.monaco.languages.CompletionItemKind.Text,
      insertText: entry.insertText || entry.name,
      detail: entry.kindModifiers,
      sortText: entry.sortText,
      range,
    };
  }

  // ── Hover ───────────────────────────────────────────────────────────────────

  private async provideHover(
    model: Monaco.editor.ITextModel,
    position: Monaco.Position,
    token: Monaco.CancellationToken,
  ): Promise<Monaco.languages.Hover | null> {
    const uri = model.uri.toString();
    const shadowFile = this.shadowFiles.get(uri);
    if (!shadowFile) return null;

    const offset = model.getOffsetAt(position);
    const tsOffset =
      shadowFile.transformResult.sourceMap.originalToGenerated(offset);

    try {
      const shadowUri = this.monaco.Uri.parse(shadowFile.uri);
      const client = await this.getTypeScriptWorker(shadowUri);

      const info = await client.getQuickInfoAtPosition(
        shadowFile.uri,
        tsOffset,
      );
      if (!info) return null;

      const displayParts = info.displayParts || [];
      const documentation = info.documentation || [];

      let signature = displayParts.map((p: any) => p.text).join("");
      signature = this.cleanupTypeSignature(signature);

      const contents: Monaco.IMarkdownString[] = [];

      if (signature) {
        contents.push({
          value: "```typescript\n" + signature + "\n```",
        });
      }
      if (documentation.length > 0) {
        contents.push({
          value: documentation.map((d: any) => d.text).join("\n"),
        });
      }

      const word = model.getWordAtPosition(position);
      const range = word
        ? {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn,
          }
        : undefined;

      return { contents, range };
    } catch (error) {
      console.error("Svelte hover error:", error);
      return null;
    }
  }

  private cleanupTypeSignature(signature: string): string {
    signature = signature.replace(/__SVELTE_[A-Z_]+__/g, "");
    return signature.trim();
  }

  // ── Go-to-Definition ────────────────────────────────────────────────────────

  private async provideDefinition(
    model: Monaco.editor.ITextModel,
    position: Monaco.Position,
    token: Monaco.CancellationToken,
  ): Promise<Monaco.languages.Definition | null> {
    const uri = model.uri.toString();
    const shadowFile = this.shadowFiles.get(uri);
    if (!shadowFile) return null;

    const offset = model.getOffsetAt(position);
    const tsOffset =
      shadowFile.transformResult.sourceMap.originalToGenerated(offset);

    try {
      const shadowUri = this.monaco.Uri.parse(shadowFile.uri);
      const client = await this.getTypeScriptWorker(shadowUri);

      const definitions = await client.getDefinitionAtPosition(
        shadowFile.uri,
        tsOffset,
      );
      if (!definitions || definitions.length === 0) return null;

      return definitions.map((def: any) => {
        const defUri = def.fileName.replace(".tsx", ".svelte");
        const defShadowFile = this.findShadowFileByUri(def.fileName);

        let startOffset = def.textSpan.start;
        let endOffset = def.textSpan.start + def.textSpan.length;

        if (defShadowFile) {
          startOffset =
            defShadowFile.transformResult.sourceMap.generatedToOriginal(
              startOffset,
            );
          endOffset =
            defShadowFile.transformResult.sourceMap.generatedToOriginal(
              endOffset,
            );
        }

        const targetModel = this.monaco.editor.getModel(
          this.monaco.Uri.parse(defUri),
        );
        if (!targetModel) {
          return {
            uri: this.monaco.Uri.parse(defUri),
            range: {
              startLineNumber: 1,
              startColumn: 1,
              endLineNumber: 1,
              endColumn: 1,
            },
          };
        }

        const startPos = targetModel.getPositionAt(startOffset);
        const endPos = targetModel.getPositionAt(endOffset);

        return {
          uri: this.monaco.Uri.parse(defUri),
          range: {
            startLineNumber: startPos.lineNumber,
            startColumn: startPos.column,
            endLineNumber: endPos.lineNumber,
            endColumn: endPos.column,
          },
        };
      });
    } catch (error) {
      console.error("Svelte definition error:", error);
      return null;
    }
  }

  private findShadowFileByUri(tsUri: string): ShadowFile | undefined {
    for (const [, shadowFile] of this.shadowFiles) {
      if (shadowFile.uri === tsUri) return shadowFile;
    }
    return undefined;
  }

  // ── Signature Help ──────────────────────────────────────────────────────────

  private async provideSignatureHelp(
    model: Monaco.editor.ITextModel,
    position: Monaco.Position,
    token: Monaco.CancellationToken,
    context: Monaco.languages.SignatureHelpContext,
  ): Promise<Monaco.languages.SignatureHelpResult | null> {
    const uri = model.uri.toString();
    const shadowFile = this.shadowFiles.get(uri);
    if (!shadowFile) return null;

    const offset = model.getOffsetAt(position);
    const tsOffset =
      shadowFile.transformResult.sourceMap.originalToGenerated(offset);

    try {
      const shadowUri = this.monaco.Uri.parse(shadowFile.uri);
      const client = await this.getTypeScriptWorker(shadowUri);

      const help = await client.getSignatureHelpItems(
        shadowFile.uri,
        tsOffset,
        {},
      );
      if (!help || !help.items || help.items.length === 0) return null;

      return {
        value: {
          signatures: help.items.map((item: any) => {
            const prefix = item.prefixDisplayParts
              .map((p: any) => p.text)
              .join("");
            const suffix = item.suffixDisplayParts
              .map((p: any) => p.text)
              .join("");
            const params = item.parameters.map((p: any) =>
              p.displayParts.map((d: any) => d.text).join(""),
            );

            return {
              label: prefix + params.join(", ") + suffix,
              parameters: item.parameters.map((p: any) => ({
                label: p.displayParts.map((d: any) => d.text).join(""),
                documentation: p.documentation
                  ?.map((d: any) => d.text)
                  .join("\n"),
              })),
              documentation: item.documentation
                ?.map((d: any) => d.text)
                .join("\n"),
            };
          }),
          activeSignature: help.selectedItemIndex,
          activeParameter: help.argumentIndex,
        },
        dispose: () => {},
      };
    } catch (error) {
      console.error("Svelte signature help error:", error);
      return null;
    }
  }

  // ── Document Highlights ─────────────────────────────────────────────────────

  private async provideDocumentHighlights(
    model: Monaco.editor.ITextModel,
    position: Monaco.Position,
    token: Monaco.CancellationToken,
  ): Promise<Monaco.languages.DocumentHighlight[] | null> {
    const uri = model.uri.toString();
    const shadowFile = this.shadowFiles.get(uri);
    if (!shadowFile) return null;

    const offset = model.getOffsetAt(position);
    const tsOffset =
      shadowFile.transformResult.sourceMap.originalToGenerated(offset);

    try {
      const shadowUri = this.monaco.Uri.parse(shadowFile.uri);
      const client = await this.getTypeScriptWorker(shadowUri);

      const highlights = await client.getDocumentHighlights(
        shadowFile.uri,
        tsOffset,
        [shadowFile.uri],
      );
      if (!highlights || highlights.length === 0) return null;

      const result: Monaco.languages.DocumentHighlight[] = [];

      for (const fileHighlights of highlights) {
        for (const span of fileHighlights.highlightSpans) {
          const startOffset =
            shadowFile.transformResult.sourceMap.generatedToOriginal(
              span.textSpan.start,
            );
          const endOffset =
            shadowFile.transformResult.sourceMap.generatedToOriginal(
              span.textSpan.start + span.textSpan.length,
            );

          const startPos = model.getPositionAt(startOffset);
          const endPos = model.getPositionAt(endOffset);

          result.push({
            range: {
              startLineNumber: startPos.lineNumber,
              startColumn: startPos.column,
              endLineNumber: endPos.lineNumber,
              endColumn: endPos.column,
            },
            kind:
              span.kind === "writtenReference"
                ? this.monaco.languages.DocumentHighlightKind.Write
                : this.monaco.languages.DocumentHighlightKind.Read,
          });
        }
      }

      return result;
    } catch (error) {
      console.error("Svelte document highlights error:", error);
      return null;
    }
  }

  // ── References ──────────────────────────────────────────────────────────────

  private async provideReferences(
    model: Monaco.editor.ITextModel,
    position: Monaco.Position,
    context: Monaco.languages.ReferenceContext,
    token: Monaco.CancellationToken,
  ): Promise<Monaco.languages.Location[] | null> {
    const uri = model.uri.toString();
    const shadowFile = this.shadowFiles.get(uri);
    if (!shadowFile) return null;

    const offset = model.getOffsetAt(position);
    const tsOffset =
      shadowFile.transformResult.sourceMap.originalToGenerated(offset);

    try {
      const shadowUri = this.monaco.Uri.parse(shadowFile.uri);
      const client = await this.getTypeScriptWorker(shadowUri);

      const references = await client.getReferencesAtPosition(
        shadowFile.uri,
        tsOffset,
      );
      if (!references || references.length === 0) return null;

      return references.map((ref: any) => {
        const refUri = ref.fileName.replace(".tsx", ".svelte");
        const refShadowFile = this.findShadowFileByUri(ref.fileName);

        let startOffset = ref.textSpan.start;
        let endOffset = ref.textSpan.start + ref.textSpan.length;

        if (refShadowFile) {
          startOffset =
            refShadowFile.transformResult.sourceMap.generatedToOriginal(
              startOffset,
            );
          endOffset =
            refShadowFile.transformResult.sourceMap.generatedToOriginal(
              endOffset,
            );
        }

        const targetModel = this.monaco.editor.getModel(
          this.monaco.Uri.parse(refUri),
        );
        if (!targetModel) {
          return {
            uri: this.monaco.Uri.parse(refUri),
            range: {
              startLineNumber: 1,
              startColumn: 1,
              endLineNumber: 1,
              endColumn: 1,
            },
          };
        }

        const startPos = targetModel.getPositionAt(startOffset);
        const endPos = targetModel.getPositionAt(endOffset);

        return {
          uri: this.monaco.Uri.parse(refUri),
          range: {
            startLineNumber: startPos.lineNumber,
            startColumn: startPos.column,
            endLineNumber: endPos.lineNumber,
            endColumn: endPos.column,
          },
        };
      });
    } catch (error) {
      console.error("Svelte references error:", error);
      return null;
    }
  }

  // ── Rename ──────────────────────────────────────────────────────────────────

  private async provideRenameEdits(
    model: Monaco.editor.ITextModel,
    position: Monaco.Position,
    newName: string,
    token: Monaco.CancellationToken,
  ): Promise<Monaco.languages.WorkspaceEdit | null> {
    const uri = model.uri.toString();
    const shadowFile = this.shadowFiles.get(uri);
    if (!shadowFile) return null;

    const offset = model.getOffsetAt(position);
    const tsOffset =
      shadowFile.transformResult.sourceMap.originalToGenerated(offset);

    try {
      const shadowUri = this.monaco.Uri.parse(shadowFile.uri);
      const client = await this.getTypeScriptWorker(shadowUri);

      const renameInfo = await client.findRenameLocations(
        shadowFile.uri,
        tsOffset,
        false,
        false,
      );
      if (!renameInfo || renameInfo.length === 0) return null;

      const edits: Monaco.languages.IWorkspaceTextEdit[] = [];

      for (const location of renameInfo) {
        const locUri = location.fileName.replace(".tsx", ".svelte");
        const locShadowFile = this.findShadowFileByUri(location.fileName);

        let startOffset = location.textSpan.start;
        let endOffset = location.textSpan.start + location.textSpan.length;

        if (locShadowFile) {
          startOffset =
            locShadowFile.transformResult.sourceMap.generatedToOriginal(
              startOffset,
            );
          endOffset =
            locShadowFile.transformResult.sourceMap.generatedToOriginal(
              endOffset,
            );
        }

        const targetModel = this.monaco.editor.getModel(
          this.monaco.Uri.parse(locUri),
        );
        if (!targetModel) continue;

        const startPos = targetModel.getPositionAt(startOffset);
        const endPos = targetModel.getPositionAt(endOffset);

        edits.push({
          resource: this.monaco.Uri.parse(locUri),
          textEdit: {
            range: {
              startLineNumber: startPos.lineNumber,
              startColumn: startPos.column,
              endLineNumber: endPos.lineNumber,
              endColumn: endPos.column,
            },
            text: newName,
          },
          versionId: undefined,
        });
      }

      return { edits };
    } catch (error) {
      console.error("Svelte rename error:", error);
      return null;
    }
  }

  private async resolveRenameLocation(
    model: Monaco.editor.ITextModel,
    position: Monaco.Position,
    token: Monaco.CancellationToken,
  ): Promise<Monaco.languages.RenameLocation | null> {
    const word = model.getWordAtPosition(position);
    if (!word) return null;

    return {
      text: word.word,
      range: {
        startLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endLineNumber: position.lineNumber,
        endColumn: word.endColumn,
      },
    };
  }

  // ── Public API ──────────────────────────────────────────────────────────────

  getShadowFileForModel(
    model: Monaco.editor.ITextModel,
  ): ShadowFile | undefined {
    return this.shadowFiles.get(model.uri.toString());
  }

  dispose(): void {
    this.disposables.forEach((d) => d.dispose());
    for (const [, shadowFile] of this.shadowFiles) {
      shadowFile.disposables.forEach((d) => d.dispose());
    }
    this.shadowFiles.clear();
  }
}

// ── Convenience initializer ───────────────────────────────────────────────────

export function initializeSvelteIntelliSense(
  monaco: typeof Monaco = (window as any).monaco,
): SvelteIntelliSense {
  return new SvelteIntelliSense(monaco);
}
