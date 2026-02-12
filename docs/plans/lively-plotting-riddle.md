# 重构 Section 03: 成本控制与 Token 优化

## Context

当前 `advanced-practice.html` 的 Section 03（第 786-869 行）内容单薄，仅包含一个 6 行的策略表和一个月度成本估算块。用户提出三个核心优化维度需要补充：Skills 精简、子 Agent 独立上下文、智能模型路由。通过 Exa 检索了 8+ 篇最新资料（claudefast、claudelog、developertoolkit、mbrenndoerfer 等），获得了量化数据和实操策略。

## 修改文件

`/Users/xktang/person-resources/docs/share/ai-cli-tutorial/advanced-practice.html` — 第 786-869 行（Section 03 整体替换）

**无需新增 CSS**，全部使用现有 class。

## 新结构（6 个区块）

### 1. Section Header（更新描述）
- 将泛泛的"合理策略降低支出"改为精确指出三大维度 + 量化目标（60-80% 降幅）

### 2. Card: Token 优化策略总览表
- 从原 3 列 6 行 → 4 列 10 行
- 新增"维度"列，用 cyan/purple/green 颜色标签映射到三大维度
- 10 条策略覆盖：MCP 裁剪、CLAUDE.md 分层、/compact 压缩、子 Agent 委派、精确调用描述、子 Agent 模型降级、任务复杂度路由、输出 Token 控制、上下文压缩、BYOK+OpenCode

### 3. Card: 三大维度详解（op-grid 三列）

**op-card 1: Skills 精简 (cat-cyan)**
- MCP Server 裁剪 — 每个启用的 MCP 注入系统提示词，即使从未调用也占 Token
- CLAUDE.md 分层 — 根级精简 + 模块级详尽，模型只加载工作目录链上的文件
- Skills 按需加载 — 高频保留，低频通过 /slash-command 按需调用
- 目录级屏蔽 — CLAUDE.md 中明确禁止 node_modules/dist/.git 等
- /compact + 80% 规则 — 窗口占用 80% 时新建会话

**op-card 2: 子 Agent 上下文隔离 (cat-purple)**
- 主控编排 + 子 Agent 执行 — 主会话保持干净编排角色
- 上下文不继承 — 子 Agent 只接收精确任务描述，天然省 Token
- 调用质量 > 数量 — 精确描述比模糊多次重试节省 3-5x
- 并行 vs 串行 — 独立任务并行，有依赖串行
- 子 Agent 模型降级 — 环境变量配置 Haiku/Sonnet

**op-card 3: 智能模型路由 (cat-green)**
- Sonnet 日常 + Opus 架构 — 按任务复杂度选模型
- 输出 Token 控制 — 输出成本是输入 5x，prompt 中指定"简洁回答"
- 历史裁剪 — 只保留最近 N 条消息
- 上下文压缩 — 长文档先摘要再注入，节省 90% 输入 Token
- Prompt Cache — 保持系统提示词稳定以命中缓存

### 4. Card: 实战配置示例（3 个 spec-block）
- CLAUDE.md 分层结构图示（STRUCTURE）
- 子 Agent 模型降级配置：环境变量 + settings.json + Agent 类型选择（BASH）
- 输出 Token 控制的 CLAUDE.md 指令模板（PROMPT）

### 5. Card: 月度成本估算（增强版）
- 从 2 列扩展为 4 列：方案 / 原始成本 / 优化后 / 节省
- 增加注释：订阅制延长用量 vs API 制直降账单

### 6. Insight: Token 优化的 80/20 法则
- 80% 浪费来自：未裁剪 MCP 系统提示词、主 Agent 累积的子任务细节、简单任务用重模型
- 三步优先行动：裁剪闲置 MCP → 委派子 Agent → 日常切 Sonnet

## 验证方式

1. 浏览器打开 `advanced-practice.html`，检查 Section 03 渲染效果
2. 确认三列 op-grid 在桌面端正常展示，移动端自动堆叠为单列
3. 确认 compare-table 横向滚动正常
4. 确认 Mermaid 图（其他 Section）未受影响
5. 对照其他 Section 的卡片样式，确保视觉一致性
