export const CATEGORIES = [
  "llm-basics",
  "rag",
  "agent",
  "mlops",
  "prompt-engineering",
  "fine-tuning",
] as const;

export const DIAGRAM_TYPES = [
  "flowchart",
  "sequence",
  "class",
  "state",
  "mindmap",
  "gantt",
  "er",
] as const;

export const DIFFICULTIES = ["beginner", "intermediate", "advanced"] as const;

export type Category = (typeof CATEGORIES)[number];
export type DiagramType = (typeof DIAGRAM_TYPES)[number];
export type Difficulty = (typeof DIFFICULTIES)[number];

export interface GraphFrontmatter {
  title: string;
  slug: string;
  description: string;
  category: Category;
  diagram_type: DiagramType;
  tags: string[];
  difficulty: Difficulty;
  node_count: number;
  author: string;
  date: string;
  updated?: string;
  version: number;
}

export interface GraphDocument {
  frontmatter: GraphFrontmatter;
  mermaidCode: string;
  explainContent: string;
  promptContent: string;
  sourcePath: string;
}

export interface GraphSummary {
  title: string;
  slug: string;
  description: string;
  category: Category;
  tags: string[];
  difficulty: Difficulty;
  date: string;
  updated?: string;
}
