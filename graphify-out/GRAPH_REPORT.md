# Graph Report - portfolio  (2026-10-17)

## Corpus Check
- 8 files · ~18,688 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: (none) 1, .css 1)

## Summary
- 128 nodes · 199 edges · 13 communities (9 shown, 4 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 9 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f328d678`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- escapeHtml
- PortfolioAIAssistant
- showToast
- ai-assistant.js
- app.js
- Aditya Kumar Singh - Autonomous Systems & Intelligence Dossier
- initLenisSmoothScroll
- initMobileMenu
- initCommandPalette
- GEMINI.md
- CyberAudioSynthesizer
- manifest.json
- sw.js

## God Nodes (most connected - your core abstractions)
1. `showToast()` - 11 edges
2. `CyberAudioSynthesizer` - 11 edges
3. `PortfolioAIAssistant` - 10 edges
4. `initCommandPalette()` - 10 edges
5. `executeCoPilotQuery()` - 8 edges
6. `renderArchitectureProjects()` - 7 edges
7. `escapeHtml()` - 7 edges
8. `initProjectSandboxModal()` - 6 edges
9. `closePalette()` - 5 edges
10. `initLenisSmoothScroll()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `initCommandPalette()` --calls--> `openArchInspector()`  [EXTRACTED]
  app.js → app.js  _Bridges community 4 → community 11_
- `initProjectSandboxModal()` --calls--> `showToast()`  [EXTRACTED]
  app.js → app.js  _Bridges community 0 → community 2_
- `initAICoPilotChat()` --calls--> `showToast()`  [EXTRACTED]
  app.js → app.js  _Bridges community 1 → community 2_
- `appendAssistantResponse()` --calls--> `executeCoPilotQuery()`  [EXTRACTED]
  app.js → app.js  _Bridges community 1 → community 0_
- `renderResults()` --calls--> `escapeHtml()`  [EXTRACTED]
  app.js → app.js  _Bridges community 0 → community 11_

## Import Cycles
- None detected.

## Communities (13 total, 4 thin omitted)

### Community 0 - "escapeHtml"
Cohesion: 0.22
Nodes (8): appendAssistantResponse(), appendCoPilotMessage(), escapeHtml(), initContactHub(), initProjectSandboxModal(), hexToRgb(), updateBulbVisuals(), parseMarkdownToHtml()

### Community 1 - "PortfolioAIAssistant"
Cohesion: 0.19
Nodes (5): PortfolioAIAssistant, appendTypingIndicator(), executeCoPilotQuery(), initAICoPilotChat(), initFloatingCoPilot()

### Community 2 - "showToast"
Cohesion: 0.18
Nodes (11): initCyberAudio(), initMetricsCards(), initNetworkTelemetry(), updateNetworkStatus(), initPWAInstall(), initResumeModal(), initSettingsModal(), initThemeToggle() (+3 more)

### Community 3 - "ai-assistant.js"
Cohesion: 0.70
Nodes (3): ADITYA_PROFILE, ADITYA_PROJECTS, ADITYA_SKILLS

### Community 4 - "app.js"
Cohesion: 0.10
Nodes (18): coPilot, handleDirectProjectQuery(), initArchInspectorModal(), initCyberTerminal(), runCommand(), initLiveClock(), initParticleCanvas(), initProjectFilters() (+10 more)

### Community 5 - "Aditya Kumar Singh - Autonomous Systems & Intelligence Dossier"
Cohesion: 0.25
Nodes (7): Aditya Kumar Singh - Autonomous Systems & Intelligence Dossier, 🌟 Distinctive Engineering Innovations, Option 1: Python (Recommended), Option 2: Node.js / npx, Option 3: VS Code / IDE Live Server Extension, 📂 Project Architecture, 🚀 Running Locally

### Community 6 - "initLenisSmoothScroll"
Cohesion: 0.29
Nodes (5): initHeroScrollIndicatorFallback(), initLenisSmoothScroll(), raf(), initScrollProgressBarFallback(), updateVelocitySkew()

### Community 11 - "initCommandPalette"
Cohesion: 0.43
Nodes (7): initCommandPalette(), closePalette(), downloadResume(), openPalette(), openResumeModal(), renderResults(), scrollToSection()

### Community 16 - "manifest.json"
Cohesion: 0.15
Nodes (12): background_color, categories, description, display, icons, name, orientation, scope (+4 more)

## Knowledge Gaps
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `initCommandPalette()` connect `initCommandPalette` to `app.js`?**
  _High betweenness centrality (0.077) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `executeCoPilotQuery()` (e.g. with `.ask()` and `.speak()`) actually correct?**
  _`executeCoPilotQuery()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `app.js` be split into smaller, more focused modules?**
  _Cohesion score 0.09852216748768473 - nodes in this community are weakly interconnected._
- **Why does `PortfolioAIAssistant` connect `PortfolioAIAssistant` to `ai-assistant.js`, `app.js`?**
  _High betweenness centrality (0.076) - this node is a cross-community bridge._