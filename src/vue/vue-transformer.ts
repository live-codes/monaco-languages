import { VueSourceMap, SFCBlock, SourceMapping } from "./vue-source-map";

export interface TransformResult {
  code: string;
  sourceMap: VueSourceMap;
  errors: TransformError[];
  scriptContent: string;
  templateContent: string;
  styleContents: string[];
}

export interface TransformError {
  message: string;
  offset: number;
  length: number;
  severity: "error" | "warning";
}

interface ParsedSFC {
  template: SFCBlock | null;
  script: SFCBlock | null;
  scriptSetup: SFCBlock | null;
  styles: SFCBlock[];
  customBlocks: SFCBlock[];
}

export class VueTransformer {
  private sourceMap!: VueSourceMap;
  private output: string = "";
  private outputOffset: number = 0;
  private input: string = "";
  private errors: TransformError[] = [];

  transform(vueCode: string): TransformResult {
    this.input = vueCode;
    this.output = "";
    this.outputOffset = 0;
    this.sourceMap = new VueSourceMap(vueCode);
    this.errors = [];

    // Parse SFC blocks
    const parsed = this.parseSFC();
    this.sourceMap.setBlocks(
      [
        parsed.template,
        parsed.script,
        parsed.scriptSetup,
        ...parsed.styles,
        ...parsed.customBlocks,
      ].filter((b): b is SFCBlock => b !== null),
    );

    // Generate TypeScript code
    this.generateTypeScript(parsed);

    this.sourceMap.setGeneratedCode(this.output);

    return {
      code: this.output,
      sourceMap: this.sourceMap,
      errors: this.errors,
      scriptContent:
        parsed.scriptSetup?.content || parsed.script?.content || "",
      templateContent: parsed.template?.content || "",
      styleContents: parsed.styles.map((s) => s.content),
    };
  }

  private parseSFC(): ParsedSFC {
    const result: ParsedSFC = {
      template: null,
      script: null,
      scriptSetup: null,
      styles: [],
      customBlocks: [],
    };

    const tagRegex = /<(template|script|style)(\s[^>]*)?>[\s\S]*?<\/\1>/gi;
    let match: RegExpExecArray | null;

    while ((match = tagRegex.exec(this.input)) !== null) {
      const fullMatch = match[0];
      const tagName = match[1].toLowerCase();
      const attrsString = match[2] || "";
      const start = match.index;
      const end = start + fullMatch.length;

      // Parse attributes
      const attrs = this.parseAttributes(attrsString);

      // Extract content (between opening and closing tags)
      const openTagEnd = this.input.indexOf(">", start) + 1;
      const closeTagStart = this.input.lastIndexOf("</", end);
      const content = this.input.slice(openTagEnd, closeTagStart);

      const block: SFCBlock = {
        type: tagName as "template" | "script" | "style",
        content,
        start: openTagEnd,
        end: closeTagStart,
        lang: attrs.lang as string | undefined,
        setup: "setup" in attrs,
        scoped: "scoped" in attrs,
        attrs,
      };

      switch (tagName) {
        case "template":
          result.template = block;
          break;
        case "script":
          if (block.setup) {
            result.scriptSetup = block;
          } else {
            result.script = block;
          }
          break;
        case "style":
          result.styles.push(block);
          break;
      }
    }

    return result;
  }

  private parseAttributes(
    attrsString: string,
  ): Record<string, string | boolean> {
    const attrs: Record<string, string | boolean> = {};
    const attrRegex = /(\w+)(?:=["']([^"']*)["'])?/g;
    let match: RegExpExecArray | null;

    while ((match = attrRegex.exec(attrsString)) !== null) {
      attrs[match[1]] = match[2] !== undefined ? match[2] : true;
    }

    return attrs;
  }

  private generateTypeScript(parsed: ParsedSFC): void {
    // Add Vue imports
    this.emit(`import { `);
    this.emit(`ref, reactive, computed, watch, watchEffect, `);
    this.emit(`onMounted, onUnmounted, onBeforeMount, onBeforeUnmount, `);
    this.emit(`onUpdated, onBeforeUpdate, `);
    this.emit(
      `defineProps, defineEmits, defineExpose, defineOptions, defineSlots, defineModel, withDefaults, `,
    );
    this.emit(`toRef, toRefs, toValue, unref, isRef, `);
    this.emit(`provide, inject, `);
    this.emit(`nextTick, getCurrentInstance, `);
    this.emit(`h, createVNode, `);
    this.emit(`Transition, TransitionGroup, KeepAlive, Teleport, Suspense `);
    this.emit(`} from 'vue';\n\n`);

    // Handle script setup
    if (parsed.scriptSetup) {
      this.generateScriptSetup(parsed.scriptSetup, parsed.template);
    } else if (parsed.script) {
      this.generateScript(parsed.script);
    } else {
      // Generate empty component setup
      this.emit(`// No script block found\n`);
      this.emit(`export default {};\n`);
    }

    // Generate template type information
    if (parsed.template) {
      this.generateTemplateTypes(parsed.template);
    }
  }

  private generateScriptSetup(
    scriptSetup: SFCBlock,
    template: SFCBlock | null,
  ): void {
    const content = scriptSetup.content;
    const isTS = scriptSetup.lang === "ts" || scriptSetup.lang === "tsx";

    // Add the script content with source mapping
    this.addMappedContent(content, scriptSetup.start, "script");
    this.emit("\n\n");

    // Generate component wrapper for type checking
    this.emit(`// Auto-generated component wrapper for type checking\n`);
    this.emit(`const __VUE_COMPONENT__ = {\n`);
    this.emit(`  setup() {\n`);

    // Extract and emit any defineProps/defineEmits for the wrapper
    const propsMatch = content.match(/defineProps\s*[<(][^)>]*[)>]/);
    const emitsMatch = content.match(/defineEmits\s*[<(][^)>]*[)>]/);

    if (propsMatch) {
      this.emit(`    const props = ${propsMatch[0]};\n`);
    }
    if (emitsMatch) {
      this.emit(`    const emit = ${emitsMatch[0]};\n`);
    }

    this.emit(`    return {};\n`);
    this.emit(`  }\n`);
    this.emit(`};\n`);
  }

  private generateScript(script: SFCBlock): void {
    const content = script.content;

    // Add the script content with source mapping
    this.addMappedContent(content, script.start, "script");
    this.emit("\n");
  }

  private generateTemplateTypes(template: SFCBlock): void {
    this.emit(`\n// Template type information\n`);
    this.emit(`declare const __VUE_TEMPLATE__: {\n`);

    // Parse template to extract component references
    const componentRefs = this.extractComponentRefs(template.content);
    const eventHandlers = this.extractEventHandlers(template.content);
    const directives = this.extractDirectives(template.content);
    const interpolations = this.extractInterpolations(template.content);

    // Generate refs
    if (componentRefs.length > 0) {
      this.emit(`  refs: {\n`);
      for (const ref of componentRefs) {
        this.emit(`    ${ref}: any;\n`);
      }
      this.emit(`  };\n`);
    }

    // Generate event handlers
    if (eventHandlers.length > 0) {
      this.emit(`  events: {\n`);
      for (const handler of eventHandlers) {
        this.emit(`    ${handler}: (...args: any[]) => void;\n`);
      }
      this.emit(`  };\n`);
    }

    this.emit(`};\n`);

    // Generate fake usage to trigger type checking
    this.generateTemplateUsage(template, interpolations, eventHandlers);
  }

  private generateTemplateUsage(
    template: SFCBlock,
    interpolations: string[],
    eventHandlers: string[],
  ): void {
    this.emit(`\n// Template expression type checking\n`);
    this.emit(`function __VUE_TEMPLATE_CHECK__() {\n`);

    // Check interpolations
    for (const expr of interpolations) {
      // Clean up the expression and add it for type checking
      const cleanExpr = expr.trim();
      if (cleanExpr && !cleanExpr.includes("{{") && !cleanExpr.includes("}}")) {
        this.emit(`  void (${cleanExpr});\n`);
      }
    }

    // Check event handlers
    for (const handler of eventHandlers) {
      if (handler && !handler.includes("(")) {
        this.emit(`  void (${handler});\n`);
      }
    }

    this.emit(`}\n`);
  }

  private extractComponentRefs(template: string): string[] {
    const refs: string[] = [];
    const refRegex = /\bref=["']([^"']+)["']/g;
    let match: RegExpExecArray | null;

    while ((match = refRegex.exec(template)) !== null) {
      refs.push(match[1]);
    }

    return refs;
  }

  private extractEventHandlers(template: string): string[] {
    const handlers: string[] = [];
    // Match @event="handler" or v-on:event="handler"
    const eventRegex = /(?:@|v-on:)[\w.-]+="([^"]+)"/g;
    let match: RegExpExecArray | null;

    while ((match = eventRegex.exec(template)) !== null) {
      const handler = match[1];
      // Extract just the function name if it's a simple reference
      const funcMatch = handler.match(/^(\w+)(?:\(|$)/);
      if (funcMatch) {
        handlers.push(funcMatch[1]);
      }
    }

    return [...new Set(handlers)];
  }

  private extractDirectives(template: string): string[] {
    const directives: string[] = [];
    const directiveRegex = /v-(\w+)(?::[^\s=]+)?(?:\.[\w.]+)?(?:="([^"]*)")?/g;
    let match: RegExpExecArray | null;

    while ((match = directiveRegex.exec(template)) !== null) {
      directives.push(match[1]);
    }

    return [...new Set(directives)];
  }

  private extractInterpolations(template: string): string[] {
    const interpolations: string[] = [];
    const interpolationRegex = /\{\{\s*([^}]+)\s*\}\}/g;
    let match: RegExpExecArray | null;

    while ((match = interpolationRegex.exec(template)) !== null) {
      interpolations.push(match[1].trim());
    }

    return interpolations;
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
