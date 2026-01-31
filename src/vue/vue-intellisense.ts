import type * as Monaco from "monaco-editor";
import { VueTransformer, type TransformResult } from "./vue-transformer";
import { vueTypeDefinitions } from "./vue-types";

interface ShadowFile {
  uri: string;
  model: Monaco.editor.ITextModel;
  transformResult: TransformResult;
  disposables: Monaco.IDisposable[];
}

export class VueIntelliSense {
  private monaco: typeof Monaco;
  private transformer: VueTransformer;
  private shadowFiles = new Map<string, ShadowFile>();
  private disposables: Monaco.IDisposable[] = [];

  constructor(monaco: typeof Monaco) {
    this.monaco = monaco;
    this.transformer = new VueTransformer();
    this.initialize();
  }

  private initialize(): void {
    // Configure TypeScript compiler options for Vue
    this.configureTypeScript();

    // Listen for model creation
    this.disposables.push(
      this.monaco.editor.onDidCreateModel((model) => {
        if (this.isVueFile(model)) {
          this.registerModel(model);
        }
      }),
    );

    // Clean up disposed models
    this.disposables.push(
      this.monaco.editor.onWillDisposeModel((model) => {
        if (this.isVueFile(model)) {
          this.unregisterModel(model);
        }
      }),
    );

    // Register language features
    this.registerProviders();

    // Register existing Vue models
    this.monaco.editor.getModels().forEach((model) => {
      if (this.isVueFile(model)) {
        this.registerModel(model);
      }
    });
  }

  private isVueFile(model: Monaco.editor.ITextModel): boolean {
    return model.getLanguageId() === "vue" || model.uri.path.endsWith(".vue");
  }

  private configureTypeScript(): void {
    const compilerOptions: Monaco.languages.typescript.CompilerOptions = {
      target: this.monaco.languages.typescript.ScriptTarget.ESNext,
      module: this.monaco.languages.typescript.ModuleKind.ESNext,
      moduleResolution:
        this.monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      jsx: this.monaco.languages.typescript.JsxEmit.Preserve,
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

    // Set diagnostics options
    const diagnosticsOptions: Monaco.languages.typescript.DiagnosticsOptions = {
      noSemanticValidation: false,
      noSyntaxValidation: false,
      diagnosticCodesToIgnore: [
        2304, // Cannot find name
        2339, // Property does not exist
        2307, // Cannot find module
        7006, // Parameter implicitly has 'any' type
        7031, // Binding element implicitly has 'any' type
      ],
    };

    this.monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions(
      diagnosticsOptions,
    );
  }

  private registerModel(model: Monaco.editor.ITextModel): void {
    const uri = model.uri.toString();

    // Skip if already registered
    if (this.shadowFiles.has(uri)) {
      return;
    }

    const shadowUri = this.getShadowUri(uri);

    // Initial transform
    const transformResult = this.transformer.transform(model.getValue());

    // Add transformed code as extra lib
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

    // Listen for changes
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

    // Re-transform
    const transformResult = this.transformer.transform(model.getValue());
    shadowFile.transformResult = transformResult;

    // Dispose old libs
    shadowFile.disposables.slice(0, 2).forEach((d) => d.dispose());

    // Add new libs
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

  private getShadowUri(vueUri: string): string {
    return vueUri.replace(/\.vue$/, ".tsx");
  }

  private registerProviders(): void {
    // Completion provider
    this.disposables.push(
      this.monaco.languages.registerCompletionItemProvider("vue", {
        triggerCharacters: [
          ".",
          "<",
          "@",
          ":",
          "#",
          '"',
          "'",
          "/",
          "{",
          " ",
          "v",
        ],
        provideCompletionItems: async (model, position, context, token) =>
          this.provideCompletions(model, position, context, token),
      }),
    );

    // Hover provider
    this.disposables.push(
      this.monaco.languages.registerHoverProvider("vue", {
        provideHover: async (model, position, token) =>
          this.provideHover(model, position, token),
      }),
    );

    // Definition provider
    this.disposables.push(
      this.monaco.languages.registerDefinitionProvider("vue", {
        provideDefinition: async (model, position, token) =>
          this.provideDefinition(model, position, token),
      }),
    );

    // Signature help provider
    this.disposables.push(
      this.monaco.languages.registerSignatureHelpProvider("vue", {
        signatureHelpTriggerCharacters: ["(", ","],
        signatureHelpRetriggerCharacters: [","],
        provideSignatureHelp: async (model, position, token, context) =>
          this.provideSignatureHelp(model, position, token, context),
      }),
    );

    // Document highlight provider
    this.disposables.push(
      this.monaco.languages.registerDocumentHighlightProvider("vue", {
        provideDocumentHighlights: async (model, position, token) =>
          this.provideDocumentHighlights(model, position, token),
      }),
    );

    // Reference provider
    this.disposables.push(
      this.monaco.languages.registerReferenceProvider("vue", {
        provideReferences: async (model, position, context, token) =>
          this.provideReferences(model, position, context, token),
      }),
    );

    // Rename provider
    this.disposables.push(
      this.monaco.languages.registerRenameProvider("vue", {
        provideRenameEdits: async (model, position, newName, token) =>
          this.provideRenameEdits(model, position, newName, token),
        resolveRenameLocation: async (model, position, token) =>
          this.resolveRenameLocation(model, position, token),
      }),
    );
  }

  private async getTypeScriptWorker(uri: Monaco.Uri): Promise<any> {
    const worker = await this.monaco.languages.typescript.getTypeScriptWorker();
    return worker(uri);
  }

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

      if (!completions || !completions.entries) return null;

      const word = model.getWordUntilPosition(position);
      const range: Monaco.IRange = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };

      // Add Vue-specific completions
      const vueCompletions = this.getVueSpecificCompletions(model, position);

      const suggestions: Monaco.languages.CompletionItem[] = [
        ...vueCompletions,
        ...completions.entries.map((entry: any) =>
          this.convertCompletion(entry, range),
        ),
      ];

      return { suggestions };
    } catch (error) {
      console.error("Vue completion error:", error);
      return null;
    }
  }

  private getVueSpecificCompletions(
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

    // Check if we're in template and typing a directive
    if (this.isInTemplate(model, position)) {
      if (textBeforeCursor.match(/\sv-?$/)) {
        completions.push(...this.getDirectiveCompletions(range));
      }
      if (textBeforeCursor.match(/@$/)) {
        completions.push(...this.getEventCompletions(range));
      }
      if (textBeforeCursor.match(/:$/)) {
        completions.push(...this.getBindCompletions(range));
      }
    }

    // Check if we're in script setup
    if (this.isInScriptSetup(model, position)) {
      // Add composition API completions
      if (textBeforeCursor.match(/\bconst\s+\w*$/)) {
        completions.push(...this.getReactivePatternCompletions(range));
      }
    }

    return completions;
  }

  private isInTemplate(
    model: Monaco.editor.ITextModel,
    position: Monaco.Position,
  ): boolean {
    const text = model.getValue();
    const offset = model.getOffsetAt(position);

    const templateStart = text.indexOf("<template");
    const templateEnd = text.indexOf("</template>");

    if (templateStart === -1 || templateEnd === -1) return false;

    const templateContentStart = text.indexOf(">", templateStart) + 1;
    return offset > templateContentStart && offset < templateEnd;
  }

  private isInScriptSetup(
    model: Monaco.editor.ITextModel,
    position: Monaco.Position,
  ): boolean {
    const text = model.getValue();
    const offset = model.getOffsetAt(position);

    const scriptSetupMatch = text.match(/<script\s+setup[^>]*>/);
    if (!scriptSetupMatch) return false;

    const scriptStart = scriptSetupMatch.index! + scriptSetupMatch[0].length;
    const scriptEnd = text.indexOf("</script>", scriptStart);

    return offset > scriptStart && offset < scriptEnd;
  }

  private getDirectiveCompletions(
    range: Monaco.IRange,
  ): Monaco.languages.CompletionItem[] {
    const directives = [
      { name: "v-if", doc: "Conditionally render element" },
      { name: "v-else", doc: "Else block for v-if" },
      { name: "v-else-if", doc: "Else-if block for v-if" },
      { name: "v-for", doc: "List rendering" },
      { name: "v-show", doc: "Toggle visibility" },
      { name: "v-model", doc: "Two-way binding" },
      { name: "v-bind", doc: "Dynamic attribute binding" },
      { name: "v-on", doc: "Event listener" },
      { name: "v-slot", doc: "Named/scoped slot" },
      { name: "v-pre", doc: "Skip compilation" },
      { name: "v-once", doc: "Render once" },
      { name: "v-memo", doc: "Memoize sub-tree" },
      { name: "v-cloak", doc: "Hide until compiled" },
    ];

    return directives.map((d) => ({
      label: d.name,
      kind: this.monaco.languages.CompletionItemKind.Keyword,
      insertText: d.name,
      documentation: d.doc,
      detail: "Vue Directive",
      range,
    }));
  }

  private getEventCompletions(
    range: Monaco.IRange,
  ): Monaco.languages.CompletionItem[] {
    const events = [
      "click",
      "dblclick",
      "mousedown",
      "mouseup",
      "mousemove",
      "mouseenter",
      "mouseleave",
      "mouseover",
      "mouseout",
      "keydown",
      "keyup",
      "keypress",
      "focus",
      "blur",
      "input",
      "change",
      "submit",
      "scroll",
      "wheel",
      "resize",
      "dragstart",
      "drag",
      "dragend",
      "dragenter",
      "dragleave",
      "dragover",
      "drop",
      "touchstart",
      "touchmove",
      "touchend",
      "touchcancel",
    ];

    return events.map((e) => ({
      label: `@${e}`,
      kind: this.monaco.languages.CompletionItemKind.Event,
      insertText: `@${e}="\${1:handler}"`,
      insertTextRules:
        this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: `${e} event handler`,
      detail: "Event",
      range,
    }));
  }

  private getBindCompletions(
    range: Monaco.IRange,
  ): Monaco.languages.CompletionItem[] {
    const bindings = [
      { name: "class", doc: "Dynamic class binding" },
      { name: "style", doc: "Dynamic style binding" },
      { name: "key", doc: "Unique key for list items" },
      { name: "ref", doc: "Template reference" },
      { name: "is", doc: "Dynamic component" },
    ];

    return bindings.map((b) => ({
      label: `:${b.name}`,
      kind: this.monaco.languages.CompletionItemKind.Property,
      insertText: `:${b.name}="\${1:value}"`,
      insertTextRules:
        this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      documentation: b.doc,
      detail: "Binding",
      range,
    }));
  }

  private getReactivePatternCompletions(
    range: Monaco.IRange,
  ): Monaco.languages.CompletionItem[] {
    return [
      {
        label: "const ref",
        kind: this.monaco.languages.CompletionItemKind.Snippet,
        insertText: "const ${1:name} = ref(${2:initialValue})",
        insertTextRules:
          this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: "Create a reactive ref",
        detail: "Vue Pattern",
        range,
      },
      {
        label: "const reactive",
        kind: this.monaco.languages.CompletionItemKind.Snippet,
        insertText: "const ${1:state} = reactive({\n\t${2}\n})",
        insertTextRules:
          this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: "Create a reactive object",
        detail: "Vue Pattern",
        range,
      },
      {
        label: "const computed",
        kind: this.monaco.languages.CompletionItemKind.Snippet,
        insertText: "const ${1:name} = computed(() => ${2:expression})",
        insertTextRules:
          this.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: "Create a computed property",
        detail: "Vue Pattern",
        range,
      },
    ];
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

      // Clean up Vue-specific internals from signature
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
      console.error("Vue hover error:", error);
      return null;
    }
  }

  private cleanupTypeSignature(signature: string): string {
    // Clean up Vue internal type references
    signature = signature.replace(/__VUE_[A-Z_]+__/g, "");
    signature = signature.replace(/UnwrapRef<([^>]+)>/g, "$1");
    return signature.trim();
  }

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
        const defUri = def.fileName.replace(".tsx", ".vue");
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
      console.error("Vue definition error:", error);
      return null;
    }
  }

  private findShadowFileByUri(tsUri: string): ShadowFile | undefined {
    for (const [, shadowFile] of this.shadowFiles) {
      if (shadowFile.uri === tsUri) {
        return shadowFile;
      }
    }
    return undefined;
  }

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
      console.error("Vue signature help error:", error);
      return null;
    }
  }

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
      console.error("Vue document highlights error:", error);
      return null;
    }
  }

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
        const refUri = ref.fileName.replace(".tsx", ".vue");
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
      console.error("Vue references error:", error);
      return null;
    }
  }

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
        const locUri = location.fileName.replace(".tsx", ".vue");
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
      console.error("Vue rename error:", error);
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

// Export initialization function
export function initializeVueIntelliSense(
  monaco: typeof Monaco = (window as any).monaco,
): VueIntelliSense {
  return new VueIntelliSense(monaco);
}
