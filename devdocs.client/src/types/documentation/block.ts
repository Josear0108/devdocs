export type TextBlock = { type: 'text'; content: string };
export type CodeBlock = { type: 'code'; language?: string; code: string };
export type ListBlock = { type: 'list'; items: string[] };
export type TableBlock = { type: 'table'; columns: string[]; rows: string[][] };

export type Block = TextBlock | CodeBlock | ListBlock | TableBlock;
