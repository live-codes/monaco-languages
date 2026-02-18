export interface SourcePosition {
  line: number; // 1-based
  column: number; // 1-based
  offset: number; // 0-based character offset
}

export interface SourceMapping {
  original: SourcePosition;
  generated: SourcePosition;
  length: number;
  type:
    | "identity"
    | "script"
    | "module"
    | "markup"
    | "style"
    | "directive"
    | "interpolation"
    | "rune"
    | "reactive"
    | "component";
}

export interface SFCBlock {
  type: "script" | "module" | "style" | "markup";
  content: string;
  start: number;
  end: number;
  lang?: string;
  attrs: Record<string, string | boolean>;
}

export class SvelteSourceMap {
  private mappings: SourceMapping[] = [];
  private originalCode: string;
  private generatedCode: string = "";
  private blocks: SFCBlock[] = [];

  constructor(originalCode: string) {
    this.originalCode = originalCode;
  }

  setGeneratedCode(code: string): void {
    this.generatedCode = code;
  }

  setBlocks(blocks: SFCBlock[]): void {
    this.blocks = blocks;
  }

  getBlocks(): SFCBlock[] {
    return this.blocks;
  }

  addMapping(mapping: SourceMapping): void {
    this.mappings.push(mapping);
  }

  getMappings(): SourceMapping[] {
    return this.mappings;
  }

  originalToGenerated(offset: number): number {
    for (const mapping of this.mappings) {
      const end = mapping.original.offset + mapping.length;
      if (offset >= mapping.original.offset && offset < end) {
        const relativeOffset = offset - mapping.original.offset;
        return Math.min(
          mapping.generated.offset + relativeOffset,
          mapping.generated.offset + mapping.length - 1,
        );
      }
    }

    let closestBefore: SourceMapping | null = null;
    for (const mapping of this.mappings) {
      const end = mapping.original.offset + mapping.length;
      if (end <= offset) {
        if (
          !closestBefore ||
          end > closestBefore.original.offset + closestBefore.length
        ) {
          closestBefore = mapping;
        }
      }
    }

    if (closestBefore) {
      const closestEnd = closestBefore.original.offset + closestBefore.length;
      const delta = offset - closestEnd;
      return closestBefore.generated.offset + closestBefore.length + delta;
    }

    return offset;
  }

  generatedToOriginal(offset: number): number {
    for (const mapping of this.mappings) {
      const end = mapping.generated.offset + mapping.length;
      if (offset >= mapping.generated.offset && offset < end) {
        const relativeOffset = offset - mapping.generated.offset;
        return Math.min(
          mapping.original.offset + relativeOffset,
          mapping.original.offset + mapping.length - 1,
        );
      }
    }

    let closestBefore: SourceMapping | null = null;
    for (const mapping of this.mappings) {
      const end = mapping.generated.offset + mapping.length;
      if (end <= offset) {
        if (
          !closestBefore ||
          end > closestBefore.generated.offset + closestBefore.length
        ) {
          closestBefore = mapping;
        }
      }
    }

    if (closestBefore) {
      const closestEnd = closestBefore.generated.offset + closestBefore.length;
      const delta = offset - closestEnd;
      return closestBefore.original.offset + closestBefore.length + delta;
    }

    return offset;
  }

  generatedRangeToOriginal(
    start: number,
    end: number,
  ): { start: number; end: number } {
    return {
      start: this.generatedToOriginal(start),
      end: this.generatedToOriginal(end),
    };
  }

  originalRangeToGenerated(
    start: number,
    end: number,
  ): { start: number; end: number } {
    return {
      start: this.originalToGenerated(start),
      end: this.originalToGenerated(end),
    };
  }

  getBlockAtOffset(offset: number): SFCBlock | null {
    for (const block of this.blocks) {
      if (offset >= block.start && offset <= block.end) {
        return block;
      }
    }
    return null;
  }

  getPosition(code: string, offset: number): { line: number; column: number } {
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

  getOffset(code: string, line: number, column: number): number {
    let currentLine = 1;
    let currentColumn = 1;
    for (let i = 0; i < code.length; i++) {
      if (currentLine === line && currentColumn === column) {
        return i;
      }
      if (code[i] === "\n") {
        currentLine++;
        currentColumn = 1;
      } else {
        currentColumn++;
      }
    }
    return code.length;
  }
}
