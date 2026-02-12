# 计划：GLM Plan → Gemini CLI 全站对齐

## Context

`tools-compare.html` 已将四大工具对比中的第四工具从 "GLM Plan" 更新为 "Gemini CLI"（Google 官方开源 CLI 工具，Apache 2.0，94K Stars），但其他页面仍存在 "GLM Plan" / "GLM 方案" 的旧引用，需要对齐。

**基准定义**（来自 tools-compare.html）：四大工具为 **Claude Code / OpenCode / Gemini CLI / Cursor**

**已通过 Web 验证的 Gemini CLI 能力**（来源：geminicli.com 官方文档、GitHub 仓库文档、Addy Osmani 2026.01 指南）：

| 维度 | Gemini CLI 实际能力 |
|------|-------------------|
| Context | `GEMINI.md` 文件 + 6 层配置优先级（默认 → 系统默认 → 用户 → 项目 → 系统覆盖 → 环境变量 → CLI 参数）|
| 配置路径 | 用户级 `~/.gemini/settings.json`、项目级 `settings.json`、`.geminiignore` |
| 记忆 | `/memory` 命令持久化跨会话记忆 |
| Skills | Custom Slash Commands + Extensions 生态 |
| MCP | 完整支持，`settings.json` 的 `mcpServers` 字段，支持 Stdio / SSE / Streamable HTTP |
| Sub-Agent | 实验性，需 `"experimental": {"enableAgents": true}`，YOLO 模式运行 |
| Hooks | 完整生命周期：BeforeSession / BeforeModel / AfterModel / BeforeTool / AfterTool |
| 权限 | 工具审批确认 + YOLO 模式自动批准 + Docker 沙箱模式 |

---

## 修改清单（4 个文件，共 ~18 处修改）

### 1. index.html — 2 处文本替换

**文件路径**: `index.html`

| 位置 | 修改内容 |
|------|---------|
| L751 hero 描述 | `GLM Plan` → `Gemini CLI` |
| L1098 章节01导航卡片 | `GLM Plan` → `Gemini CLI` |

### 2. context-engineering.html — 表头 + 6 行列数据

**文件路径**: `context-engineering.html`，Section 02 对比表（L591-646）

**表头**: L598 `<th>GLM 方案</th>` → `<th>Gemini CLI</th>`

**列数据替换**：

| 行 | 维度 | 旧值 | 新值 |
|----|------|------|------|
| ~L607 | 文件名 | `沿用接入工具的上下文文件` | `GEMINI.md` |
| ~L614 | 位置 | `无独立格式（依赖接入工具）` | 项目根 + `~/.gemini/` |
| ~L621 | 层级 | `复用接入工具层级` | 全局 + 用户 + 项目 + `/memory` 记忆 |
| ~L628 | 自动加载 | `取决于接入工具` | `是`（加 `cell-check` 样式） |
| ~L635 | 条件触发 | `由接入工具决定` | 配置层级覆盖 + Extensions |
| ~L642 | 版本控制 | `沿用接入工具实践` | 纳入 Git |

### 3. mcp-ecosystem.html — 表头 + 4 行列数据 + 样式

**文件路径**: `mcp-ecosystem.html`，MCP 支持矩阵表（L572-613）

**表头**: L579 `<th>GLM Plan</th>` → `<th>Gemini CLI</th>`

**列数据替换**：

| 行 | 维度 | 旧值 | 新值 | 样式变更 |
|----|------|------|------|---------|
| ~L588 | MCP 支持 | `MCP-Atlas (基础)` | `完整支持 + Extensions 生态` | → `class="highlight"` |
| ~L595 | 配置方式 | `配置文件` | `settings.json` mcpServers | → `class="cell-mono"` |
| ~L602 | 远程 MCP | `有限` (dim) | `支持（SSE / HTTP）` | `dim` → `highlight` |
| ~L609 | 本地 MCP | `支持` | `支持（Stdio）` | 保持不变 |

### 4. agent-hooks.html — 表头 + 5 行列数据 + 样式

**文件路径**: `agent-hooks.html`，Agent & Hooks 对比表（L609-657）

**表头**: L616 `<th>GLM Plan</th>` → `<th>Gemini CLI</th>`

**列数据替换**：

| 行 | 维度 | 旧值 | 新值 | 样式变更 |
|----|------|------|------|---------|
| ~L625 | 主 Agent | `基础` (dim) | `原生，完整工具链` | `dim` → `highlight` |
| ~L632 | Sub Agent | `不支持` (dim) | `实验性子 Agent（需启用）` | `dim` → 无特殊样式 |
| ~L639 | 并行执行 | `不支持` (dim) | `支持` | `dim` → 正常 |
| ~L646 | 工具访问 | `有限` (dim) | `文件/命令/搜索/编辑` | `dim` → 正常 |
| ~L653 | 自主程度 | `基础` (dim) | `可配置（审批 / YOLO / 沙箱）` | `dim` → `highlight` |

---

## 不修改的内容

| 页面 | 原因 |
|------|------|
| `tools-compare.html` | 已更新（基准页） |
| `skills.html` | L1322 已使用 "Gemini CLI"，无 GLM 工具级引用 |
| `dev-standards.html` | 无 GLM/Gemini 引用 |
| `sidebar.js` | 导航无工具名 |
| `advanced-practice.html` | GLM 引用均属于模型家族/成本维度（GLM-4.7 定价、GLM Coding Plan 等），用户确认保持不变 |

---

## 验证方式

1. `grep -r "GLM Plan\|GLM 方案" *.html` — 确认工具级 GLM 引用全部清除
2. 浏览器逐页检查 4 个对比表中 Gemini CLI 列的数据准确性和样式一致性
3. 确认 `advanced-practice.html` 中 GLM 模型/定价内容未被修改
