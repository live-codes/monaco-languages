import {
  SvelteSourceMap,
  type SFCBlock,
  type SourceMapping,
} from "./svelte-source-map";

export interface TransformResult {
  code: string;
  sourceMap: SvelteSourceMap;
  errors: TransformError[];
  instanceScriptContent: string;
  moduleScriptContent: string;
  markupContent: string;
  styleContents: string[];
}

export interface TransformError {
  message: string;
  offset: number;
  length: number;
  severity: "error" | "warning";
}

interface ParsedSFC {
  instanceScript: SFCBlock | null;
  moduleScript: SFCBlock | null;
  styles: SFCBlock[];
  markup: SFCBlock | null;
}

export class SvelteTransformer {
  private sourceMap!: SvelteSourceMap;
  private output: string = "";
  private outputOffset: number = 0;
  private input: string = "";
  private errors: TransformError[] = [];

  transform(svelteCode: string): TransformResult {
    this.input = svelteCode;
    this.output = "";
    this.outputOffset = 0;
    this.sourceMap = new SvelteSourceMap(svelteCode);
    this.errors = [];

    const parsed = this.parseSFC();
    this.sourceMap.setBlocks(
      [
        parsed.instanceScript,
        parsed.moduleScript,
        ...parsed.styles,
        parsed.markup,
      ].filter((b): b is SFCBlock => b !== null),
    );

    this.generateTypeScript(parsed);

    this.sourceMap.setGeneratedCode(this.output);

    return {
      code: this.output,
      sourceMap: this.sourceMap,
      errors: this.errors,
      instanceScriptContent: parsed.instanceScript?.content || "",
      moduleScriptContent: parsed.moduleScript?.content || "",
      markupContent: parsed.markup?.content || "",
      styleContents: parsed.styles.map((s) => s.content),
    };
  }

  private parseSFC(): ParsedSFC {
    const result: ParsedSFC = {
      instanceScript: null,
      moduleScript: null,
      styles: [],
      markup: null,
    };

    // ── Parse <script> and <style> blocks ───────────────────────────────────
    const tagRegex = /<(script|style)(\s[^>]*)?>[\s\S]*?<\/\1>/gi;
    let match: RegExpExecArray | null;

    const blockRanges: { start: number; end: number }[] = [];

    while ((match = tagRegex.exec(this.input)) !== null) {
      const fullMatch = match[0];
      const tagName = match[1].toLowerCase();
      const attrsString = match[2] || "";
      const start = match.index;
      const end = start + fullMatch.length;

      blockRanges.push({ start, end });

      const attrs = this.parseAttributes(attrsString);
      const openTagEnd = this.input.indexOf(">", start) + 1;
      const closeTagStart = this.input.lastIndexOf("</", end);
      const content = this.input.slice(openTagEnd, closeTagStart);

      if (tagName === "script") {
        const isModule = "module" in attrs || attrs.context === "module";
        const block: SFCBlock = {
          type: isModule ? "module" : "script",
          content,
          start: openTagEnd,
          end: closeTagStart,
          lang: attrs.lang as string | undefined,
          attrs,
        };

        if (isModule) {
          result.moduleScript = block;
        } else {
          result.instanceScript = block;
        }
      } else if (tagName === "style") {
        result.styles.push({
          type: "style",
          content,
          start: openTagEnd,
          end: closeTagStart,
          lang: attrs.lang as string | undefined,
          attrs,
        });
      }
    }

    // ── Everything outside <script> and <style> is markup ───────────────────
    const markupParts: string[] = [];
    let lastEnd = 0;
    const sortedRanges = blockRanges.sort((a, b) => a.start - b.start);

    for (const range of sortedRanges) {
      if (range.start > lastEnd) {
        markupParts.push(this.input.slice(lastEnd, range.start));
      }
      lastEnd = range.end;
    }
    if (lastEnd < this.input.length) {
      markupParts.push(this.input.slice(lastEnd));
    }

    const markupContent = markupParts.join("").trim();
    if (markupContent.length > 0) {
      // Find the first non-whitespace character in markup for the start offset
      let markupStart = 0;
      for (const range of sortedRanges) {
        if (range.start > 0) {
          const before = this.input.slice(0, range.start).trim();
          if (before.length > 0) {
            markupStart = this.input.indexOf(before.charAt(0));
            break;
          }
        }
      }
      if (markupStart === 0 && sortedRanges.length > 0) {
        markupStart = sortedRanges[sortedRanges.length - 1].end;
        // Skip whitespace
        while (
          markupStart < this.input.length &&
          /\s/.test(this.input[markupStart])
        ) {
          markupStart++;
        }
      }

      result.markup = {
        type: "markup",
        content: markupContent,
        start: markupStart,
        end: this.input.length,
        attrs: {},
      };
    }

    return result;
  }

  private parseAttributes(
    attrsString: string,
  ): Record<string, string | boolean> {
    const attrs: Record<string, string | boolean> = {};
    const attrRegex = /([\w-]+)(?:\s*=\s*["']([^"']*)["'])?/g;
    let match: RegExpExecArray | null;

    while ((match = attrRegex.exec(attrsString)) !== null) {
      attrs[match[1]] = match[2] !== undefined ? match[2] : true;
    }

    return attrs;
  }

  // ── TypeScript code generation ────────────────────────────────────────────

  private generateTypeScript(parsed: ParsedSFC): void {
    // 1. Ambient Svelte rune declarations
    this.emitSvelteAmbientTypes();

    // 2. Module-level script (if present)
    if (parsed.moduleScript) {
      this.emit(`// ── Module script ──\n`);
      this.addMappedContent(
        parsed.moduleScript.content,
        parsed.moduleScript.start,
        "module",
      );
      this.emit("\n\n");
    }

    // 3. Instance script
    if (parsed.instanceScript) {
      this.emit(`// ── Instance script ──\n`);
      this.addMappedContent(
        parsed.instanceScript.content,
        parsed.instanceScript.start,
        "script",
      );
      this.emit("\n\n");
    } else {
      this.emit(`// No instance script block found\n`);
    }

    // 4. Template / markup type checking
    if (parsed.markup) {
      this.generateMarkupTypes(parsed.markup);
    }

    // 5. Default export so this is a valid module
    this.emit(`\nexport default {};\n`);
  }

  private emitSvelteAmbientTypes(): void {
    this.emit(`// ── Svelte ambient types (auto-generated) ──\n`);
    this.emit(`declare function $state<T>(initial: T): T;\n`);
    this.emit(`declare function $state<T>(): T | undefined;\n`);
    this.emit(`declare namespace $state {\n`);
    this.emit(`  function raw<T>(initial: T): T;\n`);
    this.emit(`  function raw<T>(): T | undefined;\n`);
    this.emit(`  function snapshot<T>(state: T): T;\n`);
    this.emit(`}\n`);

    this.emit(`declare function $derived<T>(expression: T): T;\n`);
    this.emit(`declare namespace $derived {\n`);
    this.emit(`  function by<T>(fn: () => T): T;\n`);
    this.emit(`}\n`);

    this.emit(
      `declare function $effect(fn: () => void | (() => void)): void;\n`,
    );
    this.emit(`declare namespace $effect {\n`);
    this.emit(`  function pre(fn: () => void | (() => void)): void;\n`);
    this.emit(`  function tracking(): boolean;\n`);
    this.emit(`  function root(fn: () => void | (() => void)): () => void;\n`);
    this.emit(`}\n`);

    this.emit(`declare function $props<T = Record<string, any>>(): T;\n`);
    this.emit(`declare function $bindable<T>(fallback?: T): T;\n`);
    this.emit(
      `declare function $inspect<T extends any[]>(...values: T): { with: (fn: (type: 'init' | 'update', ...values: T) => void) => void };\n`,
    );
    this.emit(
      `declare function $host<T extends HTMLElement = HTMLElement>(): T;\n`,
    );
    this.emit("\n");
  }

  private generateMarkupTypes(markup: SFCBlock): void {
    this.emit(`// ── Markup type information ──\n`);

    const interpolations = this.extractInterpolations(markup.content);
    const eventHandlers = this.extractEventHandlers(markup.content);
    const bindRefs = this.extractBindThis(markup.content);
    const componentRefs = this.extractComponentRefs(markup.content);

    // Declare template refs
    if (bindRefs.length > 0) {
      this.emit(`declare const __SVELTE_REFS__: {\n`);
      for (const ref of bindRefs) {
        this.emit(`  ${ref}: HTMLElement;\n`);
      }
      this.emit(`};\n`);
    }

    // Generate fake usage for type checking
    this.emit(`function __SVELTE_TEMPLATE_CHECK__() {\n`);

    for (const expr of interpolations) {
      const clean = expr.trim();
      if (clean && !clean.includes("{") && !clean.includes("}")) {
        this.emit(`  void (${clean});\n`);
      }
    }

    for (const handler of eventHandlers) {
      if (handler && !handler.includes("(")) {
        this.emit(`  void (${handler});\n`);
      }
    }

    this.emit(`}\n`);
  }

  private extractInterpolations(template: string): string[] {
    const interpolations: string[] = [];

    // Match {expression} but not {#...}, {:...}, {/...}, {@...}
    // Use a simple state machine to handle brace nesting
    let i = 0;
    while (i < template.length) {
      if (template[i] === "{") {
        const next = template[i + 1];
        if (next === "#" || next === ":" || next === "/" || next === "@") {
          // Skip Svelte block syntax — find matching }
          i = this.findClosingBrace(template, i);
          continue;
        }
        // Regular interpolation
        const start = i + 1;
        const end = this.findClosingBrace(template, i);
        if (end > start) {
          interpolations.push(template.slice(start, end - 1).trim());
        }
        i = end;
      } else {
        i++;
      }
    }

    return interpolations;
  }

  private findClosingBrace(template: string, openIndex: number): number {
    let depth = 0;
    let inString: string | null = null;

    for (let i = openIndex; i < template.length; i++) {
      const ch = template[i];

      if (inString) {
        if (ch === inString && template[i - 1] !== "\\") {
          inString = null;
        }
        continue;
      }

      if (ch === '"' || ch === "'" || ch === "`") {
        inString = ch;
        continue;
      }

      if (ch === "{") depth++;
      if (ch === "}") {
        depth--;
        if (depth === 0) return i + 1;
      }
    }

    return template.length;
  }

  private extractEventHandlers(template: string): string[] {
    const handlers: string[] = [];

    // Svelte 4: on:event={handler}
    const onDirectiveRegex = /(?:on:[\w.-]+(?:\|[\w|]+)?)=\{([^}]+)\}/g;
    let match: RegExpExecArray | null;

    while ((match = onDirectiveRegex.exec(template)) !== null) {
      const handler = match[1].trim();
      const funcMatch = handler.match(/^(\w+)(?:\(|$)/);
      if (funcMatch) {
        handlers.push(funcMatch[1]);
      }
    }

    // Svelte 5: onclick={handler}
    const onAttrRegex = /\bon\w+=\{([^}]+)\}/g;
    while ((match = onAttrRegex.exec(template)) !== null) {
      const handler = match[1].trim();
      const funcMatch = handler.match(/^(\w+)(?:\(|$)/);
      if (funcMatch) {
        handlers.push(funcMatch[1]);
      }
    }

    return [...new Set(handlers)];
  }

  private extractBindThis(template: string): string[] {
    const refs: string[] = [];
    const bindThisRegex = /bind:this=\{(\w+)\}/g;
    let match: RegExpExecArray | null;

    while ((match = bindThisRegex.exec(template)) !== null) {
      refs.push(match[1]);
    }

    return refs;
  }

  private extractComponentRefs(template: string): string[] {
    const components: string[] = [];
    const componentRegex = /<([A-Z][\w]*)/g;
    let match: RegExpExecArray | null;

    while ((match = componentRegex.exec(template)) !== null) {
      components.push(match[1]);
    }

    return [...new Set(components)];
  }

  private addMappedContent(
    content: string,
    originalStart: number,
    type: SourceMapping["type"],
  ): void {
    const generatedStart = this.outputOffset;

    this.sourceMap.addMapping({
      original: {
        ...this.getPosition(this.input, originalStart),
        offset: originalStart,
      },
      generated: {
        ...this.getPosition(this.output, generatedStart),
        offset: generatedStart,
      },
      length: content.length,
      type,
    });

    this.output += content;
    this.outputOffset += content.length;
  }

  private emit(str: string): void {
    this.output += str;
    this.outputOffset += str.length;
  }

  private getPosition(
    code: string,
    offset: number,
  ): { line: number; column: number } {
    let line = 1;
    let column = 1;
    for (let i = 0; i < offset && i < code.length; i++) {
      if (code[i] === "\n") {
        line++;
        column = 1;
      } else {
        column++;
      }
    }
    return { line, column };
  }
}
