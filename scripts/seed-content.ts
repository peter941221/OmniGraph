import fs from "node:fs";
import path from "node:path";

type Difficulty = "beginner" | "intermediate" | "advanced";

interface SeedItem {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  difficulty: Difficulty;
  diagramType?: "flowchart" | "sequence";
}

const CONTENT_DIR = path.join(process.cwd(), "content");
const TODAY = new Date().toISOString().slice(0, 10);

const CATALOG: Record<string, SeedItem[]> = {
  "llm-basics": [
    {
      slug: "transformer-architecture",
      title: "Transformer 架构总览",
      description: "从输入嵌入到多头注意力再到输出层的主干结构。",
      tags: ["Transformer", "Attention", "LLM"],
      difficulty: "beginner",
    },
    {
      slug: "attention-mechanism",
      title: "Attention 机制计算链路",
      description: "拆解 Q/K/V 到注意力权重再到上下文向量的核心步骤。",
      tags: ["Attention", "QKV", "Transformer"],
      difficulty: "beginner",
    },
    {
      slug: "tokenization-flow",
      title: "Tokenizer 处理流程",
      description: "从原始文本到 token id 的标准处理路径。",
      tags: ["Tokenizer", "BPE", "LLM"],
      difficulty: "beginner",
    },
    {
      slug: "kv-cache-lifecycle",
      title: "KV Cache 生命周期",
      description: "推理时 KV Cache 的创建、扩展、复用与释放。",
      tags: ["KV Cache", "Inference", "Latency"],
      difficulty: "intermediate",
    },
    {
      slug: "position-encoding-comparison",
      title: "位置编码方案对比",
      description: "绝对位置、RoPE 与 ALiBi 在推理阶段的差异。",
      tags: ["Positional Encoding", "RoPE", "ALiBi"],
      difficulty: "intermediate",
    },
    {
      slug: "moe-routing",
      title: "MoE 路由决策流程",
      description: "门控网络如何在专家之间分配 token 计算。",
      tags: ["MoE", "Routing", "Efficiency"],
      difficulty: "intermediate",
    },
    {
      slug: "flash-attention-pipeline",
      title: "Flash Attention 执行管线",
      description: "通过块级计算与内存优化加速注意力。",
      tags: ["FlashAttention", "GPU", "Attention"],
      difficulty: "advanced",
    },
    {
      slug: "quantization-workflow",
      title: "模型量化工作流",
      description: "从校准样本到量化参数再到部署验证的完整链路。",
      tags: ["Quantization", "AWQ", "GPTQ"],
      difficulty: "intermediate",
    },
    {
      slug: "speculative-decoding",
      title: "Speculative Decoding 流程",
      description: "草稿模型与目标模型协作提升解码吞吐。",
      tags: ["Decoding", "Latency", "Inference"],
      difficulty: "advanced",
    },
    {
      slug: "rlhf-training-loop",
      title: "RLHF 训练闭环",
      description: "SFT、奖励模型、PPO 迭代优化对齐能力。",
      tags: ["RLHF", "PPO", "Alignment"],
      difficulty: "advanced",
    },
  ],
  rag: [
    {
      slug: "naive-rag-flow",
      title: "基础 RAG (检索增强生成) 架构流",
      description: "展示 RAG 从离线索引到在线检索生成的完整闭环。",
      tags: ["RAG", "向量数据库", "LLM"],
      difficulty: "beginner",
    },
    {
      slug: "advanced-rag-pipeline",
      title: "高级 RAG 多阶段管线",
      description: "引入重写、召回、重排和答案归因的完整架构。",
      tags: ["RAG", "Rerank", "Pipeline"],
      difficulty: "intermediate",
    },
    {
      slug: "hybrid-search-strategy",
      title: "混合检索策略",
      description: "BM25 与向量检索融合提升召回质量。",
      tags: ["Hybrid Search", "BM25", "Vector"],
      difficulty: "intermediate",
    },
    {
      slug: "query-rewrite-chain",
      title: "Query Rewrite 链路",
      description: "通过多轮改写提升检索命中率与可解释性。",
      tags: ["Query Rewrite", "RAG", "Recall"],
      difficulty: "intermediate",
    },
    {
      slug: "reranker-integration",
      title: "Reranker 集成流程",
      description: "在召回和生成之间增加相关性重排。",
      tags: ["Reranker", "Cross Encoder", "RAG"],
      difficulty: "intermediate",
    },
    {
      slug: "context-compression",
      title: "上下文压缩策略",
      description: "长文档检索场景下的摘要压缩和关键信息保留。",
      tags: ["Context Compression", "Long Context", "RAG"],
      difficulty: "advanced",
    },
    {
      slug: "long-context-routing",
      title: "长上下文路由机制",
      description: "根据问题类型路由到不同检索与阅读策略。",
      tags: ["Routing", "Long Context", "RAG"],
      difficulty: "advanced",
    },
    {
      slug: "citation-grounded-generation",
      title: "带引用的答案生成",
      description: "输出答案同时附带证据引用，增强可信度。",
      tags: ["Citation", "Grounding", "RAG"],
      difficulty: "intermediate",
    },
    {
      slug: "chunking-strategy-design",
      title: "Chunk 切分策略设计",
      description: "滑窗、语义切分与分层切分的适用场景。",
      tags: ["Chunking", "Embedding", "Indexing"],
      difficulty: "beginner",
    },
    {
      slug: "multilingual-rag-pipeline",
      title: "多语言 RAG 流水线",
      description: "跨语言检索、翻译归一与答案生成的协同流程。",
      tags: ["Multilingual", "RAG", "Localization"],
      difficulty: "advanced",
    },
  ],
  agent: [
    {
      slug: "tool-calling-flow",
      title: "Tool Calling 执行流",
      description: "展示 Agent 从思考到调用工具再到汇总答案的循环。",
      tags: ["Agent", "Tool Calling", "ReAct"],
      difficulty: "intermediate",
      diagramType: "sequence",
    },
    {
      slug: "react-agent-loop",
      title: "ReAct Agent 循环",
      description: "Thought / Action / Observation 的最小闭环。",
      tags: ["ReAct", "Agent", "Loop"],
      difficulty: "beginner",
    },
    {
      slug: "multi-agent-orchestration",
      title: "多 Agent 编排",
      description: "Planner、Researcher、Reviewer 的协作执行流。",
      tags: ["Multi-Agent", "Orchestration", "Workflow"],
      difficulty: "advanced",
    },
    {
      slug: "plan-and-execute-cycle",
      title: "Plan-and-Execute 周期",
      description: "先规划后执行的任务分解与重规划机制。",
      tags: ["Plan and Execute", "Agent", "Task Decomposition"],
      difficulty: "intermediate",
    },
    {
      slug: "agent-memory-layering",
      title: "Agent 记忆分层",
      description: "短期记忆、长期记忆和外部存储的分工关系。",
      tags: ["Memory", "Agent", "State"],
      difficulty: "intermediate",
    },
    {
      slug: "safe-tool-sandbox",
      title: "工具调用安全沙箱",
      description: "权限隔离、参数白名单和审计日志链路。",
      tags: ["Sandbox", "Security", "Tooling"],
      difficulty: "advanced",
    },
    {
      slug: "code-interpreter-architecture",
      title: "Code Interpreter 架构",
      description: "文件处理、执行环境和结果回传的系统流程。",
      tags: ["Code Interpreter", "Runtime", "Agent"],
      difficulty: "advanced",
    },
    {
      slug: "autonomous-task-decomposition",
      title: "自主任务拆解机制",
      description: "大任务拆解、子任务调度与依赖回收。",
      tags: ["Autonomy", "Task Graph", "Agent"],
      difficulty: "advanced",
    },
    {
      slug: "agent-observability-loop",
      title: "Agent 可观测性闭环",
      description: "Tracing、事件日志和回放调试组成的观察体系。",
      tags: ["Observability", "Tracing", "Debugging"],
      difficulty: "intermediate",
    },
    {
      slug: "human-in-the-loop-agent",
      title: "Human-in-the-Loop Agent",
      description: "关键步骤引入人工确认提高可靠性与合规性。",
      tags: ["HITL", "Approval", "Safety"],
      difficulty: "intermediate",
    },
  ],
  mlops: [
    {
      slug: "model-serving-pipeline",
      title: "模型服务发布流水线",
      description: "从训练产物到灰度发布与监控回流的 MLOps 服务链路。",
      tags: ["MLOps", "Serving", "Monitoring"],
      difficulty: "intermediate",
    },
    {
      slug: "feature-store-architecture",
      title: "Feature Store 架构",
      description: "离线特征与在线特征一致性的系统设计。",
      tags: ["Feature Store", "Data", "MLOps"],
      difficulty: "intermediate",
    },
    {
      slug: "model-registry-governance",
      title: "模型注册中心治理",
      description: "版本、审批和可追溯信息管理流程。",
      tags: ["Model Registry", "Governance", "MLOps"],
      difficulty: "beginner",
    },
    {
      slug: "ab-testing-for-models",
      title: "模型 A/B 实验流程",
      description: "实验分流、指标采集与结果判定闭环。",
      tags: ["A/B Testing", "Experimentation", "MLOps"],
      difficulty: "intermediate",
    },
    {
      slug: "online-drift-monitoring",
      title: "在线漂移监控体系",
      description: "数据漂移和概念漂移的实时监测与告警。",
      tags: ["Drift", "Monitoring", "Alerting"],
      difficulty: "advanced",
    },
    {
      slug: "offline-online-evaluation-bridge",
      title: "离线与在线评测桥接",
      description: "把离线评测结果映射到线上业务指标。",
      tags: ["Evaluation", "Offline", "Online"],
      difficulty: "advanced",
    },
    {
      slug: "gpu-cluster-scheduling",
      title: "GPU 集群调度",
      description: "训练与推理任务在 GPU 资源池中的调度策略。",
      tags: ["GPU", "Scheduling", "Infrastructure"],
      difficulty: "advanced",
    },
    {
      slug: "canary-release-for-llm",
      title: "LLM Canary 灰度发布",
      description: "小流量灰度、回滚策略和稳定性验证流程。",
      tags: ["Canary", "Release", "LLM Ops"],
      difficulty: "intermediate",
    },
    {
      slug: "cost-performance-optimization",
      title: "成本与性能优化闭环",
      description: "吞吐、延迟、单次调用成本三者协同优化。",
      tags: ["Cost", "Performance", "Optimization"],
      difficulty: "advanced",
    },
    {
      slug: "incident-response-runbook",
      title: "线上故障响应 Runbook",
      description: "从告警触发到恢复与复盘的标准化流程。",
      tags: ["Incident", "Runbook", "Reliability"],
      difficulty: "intermediate",
    },
  ],
  "prompt-engineering": [
    {
      slug: "prompt-chaining-pattern",
      title: "Prompt Chaining 模式",
      description: "通过多阶段提示词拆分复杂任务，提高输出稳定性与可控性。",
      tags: ["Prompt", "Chaining", "LLM Workflow"],
      difficulty: "beginner",
    },
    {
      slug: "few-shot-pattern-library",
      title: "Few-shot 模板库",
      description: "构建可复用样例库提升输出一致性。",
      tags: ["Few-shot", "Prompt", "Examples"],
      difficulty: "beginner",
    },
    {
      slug: "structured-output-contract",
      title: "结构化输出契约",
      description: "通过 JSON schema 约束模型输出格式。",
      tags: ["Structured Output", "JSON", "Prompt"],
      difficulty: "intermediate",
    },
    {
      slug: "self-consistency-sampling",
      title: "Self-Consistency 采样",
      description: "多路径采样并聚合答案提升可靠性。",
      tags: ["Self-Consistency", "Sampling", "Reasoning"],
      difficulty: "advanced",
    },
    {
      slug: "tree-of-thought-workflow",
      title: "Tree-of-Thought 推理流程",
      description: "多分支探索与评估的推理工作流。",
      tags: ["ToT", "Reasoning", "Prompt"],
      difficulty: "advanced",
    },
    {
      slug: "reflection-and-revision-loop",
      title: "反思与修订循环",
      description: "让模型先自检再改写，提升输出质量。",
      tags: ["Reflection", "Revision", "Quality"],
      difficulty: "intermediate",
    },
    {
      slug: "retrieval-augmented-prompting",
      title: "检索增强提示设计",
      description: "在 Prompt 中注入可控外部知识上下文。",
      tags: ["RAG", "Prompting", "Grounding"],
      difficulty: "intermediate",
    },
    {
      slug: "role-instruction-design",
      title: "角色指令设计",
      description: "利用角色设定和边界约束控制模型行为。",
      tags: ["Role Prompt", "Instruction", "Control"],
      difficulty: "beginner",
    },
    {
      slug: "constraint-driven-prompting",
      title: "约束驱动提示词",
      description: "通过规则约束减少漂移和幻觉输出。",
      tags: ["Constraint", "Prompt", "Reliability"],
      difficulty: "intermediate",
    },
    {
      slug: "prompt-evaluation-harness",
      title: "Prompt 评测框架",
      description: "基于数据集和评分器持续评估提示词版本。",
      tags: ["Evaluation", "Prompt", "Regression"],
      difficulty: "advanced",
    },
  ],
};

function toMermaid(category: string, title: string, diagramType: "flowchart" | "sequence" = "flowchart") {
  if (diagramType === "sequence") {
    return `sequenceDiagram
  participant U as User
  participant A as Agent
  participant S as System

  U->>A: Trigger ${title}
  A->>S: Plan next action
  S-->>A: Return instruction
  A-->>U: Final response`;
  }

  switch (category) {
    case "rag":
      return `flowchart TD
  A["📝 用户查询: ${title}"] --> B["🔎 Query Rewrite"]
  B --> C["📚 Retriever"]
  C --> D["🎯 Reranker"]
  D --> E["📦 Context Builder"]
  E --> F["🤖 LLM Generator"]
  F --> G["✅ Grounded Answer"]`;
    case "agent":
      return `flowchart TD
  A["🎯 Task: ${title}"] --> B["🧠 Planner"]
  B --> C["🛠️ Tool Selector"]
  C --> D["⚙️ Tool Execution"]
  D --> E["📝 Observation"]
  E --> F{"Need More Steps?"}
  F -- Yes --> B
  F -- No --> G["✅ Final Output"]`;
    case "mlops":
      return `flowchart LR
  A["🏗️ Training Artifact"] --> B["📦 Model Registry"]
  B --> C["🧪 Validation Gate"]
  C --> D["🚀 Canary Deploy"]
  D --> E["📈 Online Monitoring"]
  E --> F{"SLO Healthy?"}
  F -- Yes --> G["✅ Full Rollout"]
  F -- No --> H["↩️ Rollback"]`;
    case "prompt-engineering":
      return `flowchart TD
  A["🧩 Goal: ${title}"] --> B["📌 Constraint Setup"]
  B --> C["📝 Prompt Draft"]
  C --> D["🤖 Model Response"]
  D --> E["🔍 Critique & Score"]
  E --> F{"Pass Threshold?"}
  F -- No --> C
  F -- Yes --> G["✅ Reusable Prompt"]`;
    default:
      return `flowchart LR
  A["🧩 Topic: ${title}"] --> B["🧠 Core Mechanism"]
  B --> C["⚙️ Key Components"]
  C --> D["📊 Tradeoff Analysis"]
  D --> E["✅ Practical Output"]`;
  }
}

function buildMdx(category: string, item: SeedItem) {
  const diagramType = item.diagramType ?? "flowchart";
  const mermaidCode = toMermaid(category, item.title, diagramType);

  return `---
title: "${item.title}"
slug: "${item.slug}"
description: "${item.description}"
category: "${category}"
diagram_type: "${diagramType}"
tags: [${item.tags.map((tag) => `"${tag}"`).join(", ")}]
difficulty: "${item.difficulty}"
node_count: 8
author: "OmniGraph"
date: "${TODAY}"
updated: "${TODAY}"
version: 1
---

<Mermaid>
${mermaidCode}
</Mermaid>

<Explain>
### 核心逻辑
- ${item.description}
- 图中按“输入 -> 处理 -> 输出”组织，便于快速复现实现路径。
- 可将此图作为技术评审或新人 onboarding 的讨论底图。
</Explain>

<Prompt>
请用 Mermaid ${diagramType} 语法绘制“${item.title}”图谱，要求节点简洁、流程完整、可直接复制到文档中使用。
</Prompt>
`;
}

function ensureDirectory(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function countMdxFiles(dirPath: string): number {
  if (!fs.existsSync(dirPath)) return 0;
  let total = 0;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      total += countMdxFiles(fullPath);
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".mdx")) {
      total += 1;
    }
  }
  return total;
}

function run() {
  ensureDirectory(CONTENT_DIR);

  let created = 0;
  let skipped = 0;
  let totalTarget = 0;

  for (const [category, items] of Object.entries(CATALOG)) {
    const categoryDir = path.join(CONTENT_DIR, category);
    ensureDirectory(categoryDir);
    totalTarget += items.length;

    for (const item of items) {
      const filePath = path.join(categoryDir, `${item.slug}.mdx`);
      if (fs.existsSync(filePath)) {
        skipped += 1;
        continue;
      }
      fs.writeFileSync(filePath, buildMdx(category, item), "utf-8");
      created += 1;
      console.log(`+ created ${path.relative(process.cwd(), filePath)}`);
    }
  }

  const mdxCount = countMdxFiles(CONTENT_DIR);

  console.log(`\nTarget entries: ${totalTarget}`);
  console.log(`Created: ${created}`);
  console.log(`Skipped(existing): ${skipped}`);
  console.log(`Current MDX count: ${mdxCount}`);
}

run();
