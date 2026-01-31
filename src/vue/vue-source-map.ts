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
    | "template"
    | "style"
    | "directive"
    | "interpolation"
    | "prop"
    | "component";
}

export interface SFCBlock {
  type: "template" | "script" | "style" | "custom";
  content: string;
  start: number;
  end: number;
  lang?: string;
  setup?: boolean;
  scoped?: boolean;
  attrs: Record<string, string | boolean>;
}

export class VueSourceMap {
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

  // Convert original offset to generated offset
  originalToGenerated(offset: number): number {
    // Find exact mapping
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

    // Find closest mapping before the offset
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

  // Convert generated offset to original offset
  generatedToOriginal(offset: number): number {
    // Find exact mapping
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

    // Find closest mapping before the offset
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

  // Map a range from generated to original
  generatedRangeToOriginal(
    start: number,
    end: number,
  ): { start: number; end: number } {
    return {
      start: this.generatedToOriginal(start),
      end: this.generatedToOriginal(end),
    };
  }

  // Map a range from original to generated
  originalRangeToGenerated(
    start: number,
    end: number,
  ): { start: number; end: number } {
    return {
      start: this.originalToGenerated(start),
      end: this.originalToGenerated(end),
    };
  }

  // Get the block containing a given offset
  getBlockAtOffset(offset: number): SFCBlock | null {
    for (const block of this.blocks) {
      if (offset >= block.start && offset <= block.end) {
        return block;
      }
    }
    return null;
  }

  // Helper to get line/column from offset
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

  // Helper to get offset from line/column
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
