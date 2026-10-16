# Graph Report - portfolio  (2026-10-16)

## Corpus Check
- 9 files · ~17,935 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: .css 1)

## Summary
- 113 nodes · 169 edges · 19 communities (10 shown, 9 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- escapeHtml
- PortfolioAIAssistant
- showToast
- ai-assistant.js
- app.js
- Aditya Kumar Singh - Autonomous Systems & Intelligence Dossier
- initHeroScrollIndicator
- initMobileMenu
- initLiveClock
- initParticleCanvas
- initTypingEffect
- initCommandPalette
- GEMINI.md
- initScrollProgressBar
- renderArchitectureProjects
- CyberAudioSynthesizer
- manifest.json
- openProjectSandbox
- sw.js

## God Nodes (most connected - your core abstractions)
1. `showToast()` - 11 edges
2. `PortfolioAIAssistant` - 10 edges
3. `initCommandPalette()` - 10 edges
4. `executeCoPilotQuery()` - 8 edges
5. `escapeHtml()` - 7 edges
6. `initProjectSandboxModal()` - 6 edges
7. `renderArchitectureProjects()` - 5 edges
8. `closePalette()` - 5 edges
9. `CyberAudioSynthesizer` - 5 edges
10. `initNetworkTelemetry()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `initCommandPalette()` --calls--> `openArchInspector()`  [EXTRACTED]
  app.js → app.js  _Bridges community 14 → community 11_
- `initProjectSandboxModal()` --calls--> `showToast()`  [EXTRACTED]
  app.js → app.js  _Bridges community 0 → community 2_
- `initCommandPalette()` --calls--> `openProjectSandbox()`  [EXTRACTED]
  app.js → app.js  _Bridges community 17 → community 11_
- `renderArchitectureProjects()` --calls--> `openProjectSandbox()`  [EXTRACTED]
  app.js → app.js  _Bridges community 17 → community 14_
- `renderArchitectureProjects()` --calls--> `handleDirectProjectQuery()`  [EXTRACTED]
  app.js → app.js  _Bridges community 14 → community 4_

## Import Cycles
- None detected.

## Communities (19 total, 9 thin omitted)

### Community 0 - "escapeHtml"
Cohesion: 0.29
Nodes (6): appendCoPilotMessage(), escapeHtml(), initContactHub(), initProjectSandboxModal(), hexToRgb(), updateBulbVisuals()

### Community 1 - "PortfolioAIAssistant"
Cohesion: 0.16
Nodes (7): PortfolioAIAssistant, appendAssistantResponse(), appendTypingIndicator(), executeCoPilotQuery(), initAICoPilotChat(), initFloatingCoPilot(), parseMarkdownToHtml()

### Community 2 - "showToast"
Cohesion: 0.18
Nodes (11): initCyberAudio(), initMetricsCards(), initNetworkTelemetry(), updateNetworkStatus(), initPWAInstall(), initResumeModal(), initSettingsModal(), initThemeToggle() (+3 more)

### Community 3 - "ai-assistant.js"
Cohesion: 0.70
Nodes (3): ADITYA_PROFILE, ADITYA_PROJECTS, ADITYA_SKILLS

### Community 4 - "app.js"
Cohesion: 0.22
Nodes (3): coPilot, handleDirectProjectQuery(), initArchInspectorModal()

### Community 5 - "Aditya Kumar Singh - Autonomous Systems & Intelligence Dossier"
Cohesion: 0.25
Nodes (7): Aditya Kumar Singh - Autonomous Systems & Intelligence Dossier, 🌟 Distinctive Engineering Innovations, Option 1: Python (Recommended), Option 2: Node.js / npx, Option 3: VS Code / IDE Live Server Extension, 📂 Project Architecture, 🚀 Running Locally

### Community 11 - "initCommandPalette"
Cohesion: 0.43
Nodes (7): initCommandPalette(), closePalette(), downloadResume(), openPalette(), openResumeModal(), renderResults(), scrollToSection()

### Community 14 - "renderArchitectureProjects"
Cohesion: 0.50
Nodes (4): initProjectFilters(), openArchInspector(), renderArchitectureProjects(), renderInspectorStep()

### Community 16 - "manifest.json"
Cohesion: 0.15
Nodes (12): background_color, categories, description, display, icons, name, orientation, scope (+4 more)

### Community 17 - "openProjectSandbox"
Cohesion: 0.67
Nodes (3): initCyberTerminal(), runCommand(), openProjectSandbox()

## Knowledge Gaps
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `initCommandPalette()` connect `initCommandPalette` to `openProjectSandbox`, `app.js`, `renderArchitectureProjects`?**
  _High betweenness centrality (0.083) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `executeCoPilotQuery()` (e.g. with `.ask()` and `.speak()`) actually correct?**
  _`executeCoPilotQuery()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Why does `PortfolioAIAssistant` connect `PortfolioAIAssistant` to `ai-assistant.js`, `app.js`?**
  _High betweenness centrality (0.082) - this node is a cross-community bridge._