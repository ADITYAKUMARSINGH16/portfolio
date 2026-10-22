# Graph Report - portfolio  (2026-10-23)

## Corpus Check
- 9 files · ~22,730 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 1, .xml 1, .css 1)

## Summary
- 160 nodes · 245 edges · 21 communities (11 shown, 10 thin omitted)
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 14 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e183c28b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- escapeHtml
- PortfolioAIAssistant
- showToast
- renderArchitectureProjects
- app.js
- Aditya Kumar Singh - Autonomous Systems & Intelligence Dossier
- initLenisSmoothScroll
- initMobileMenu
- build_resume_pdf.py
- ai-assistant.js
- initProjectSandboxModal
- initCommandPalette
- GEMINI.md
- handleDirectProjectQuery
- initLiveClock
- CyberAudioSynthesizer
- manifest.json
- initParticleCanvas
- sw.js
- initTypingEffect
- initFloatingCoPilot

## God Nodes (most connected - your core abstractions)
1. `showToast()` - 14 edges
2. `trapFocus()` - 13 edges
3. `initCommandPalette()` - 11 edges
4. `CyberAudioSynthesizer` - 11 edges
5. `PortfolioAIAssistant` - 10 edges
6. `returnFocus()` - 8 edges
7. `renderArchitectureProjects()` - 8 edges
8. `escapeHtml()` - 8 edges
9. `initProjectSandboxModal()` - 7 edges
10. `executeCoPilotQuery()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `initKeyboardHUD()` --indirect_call--> `closeHUD()`  [INFERRED]
  app.js → app.js  _Bridges community 11 → community 2_
- `initNetworkTelemetry()` --calls--> `updateMetricsCardsTheme()`  [EXTRACTED]
  app.js → app.js  _Bridges community 2 → community 4_
- `closeInspector()` --calls--> `returnFocus()`  [EXTRACTED]
  app.js → app.js  _Bridges community 2 → community 13_
- `closeSandbox()` --calls--> `returnFocus()`  [EXTRACTED]
  app.js → app.js  _Bridges community 2 → community 10_
- `renderArchitectureProjects()` --calls--> `openArchInspector()`  [EXTRACTED]
  app.js → app.js  _Bridges community 11 → community 3_

## Import Cycles
- None detected.

## Communities (21 total, 10 thin omitted)

### Community 0 - "escapeHtml"
Cohesion: 0.33
Nodes (7): appendAssistantResponse(), appendCoPilotMessage(), appendTypingIndicator(), escapeHtml(), executeCoPilotQuery(), initAICoPilotChat(), parseMarkdownToHtml()

### Community 2 - "showToast"
Cohesion: 0.13
Nodes (19): copyToClipboard(), initContactHub(), initCyberAudio(), closeHUD(), initNetworkTelemetry(), updateNetworkStatus(), initPWAInstall(), initRecruiterFastTrack() (+11 more)

### Community 3 - "renderArchitectureProjects"
Cohesion: 0.40
Nodes (6): initProjectFilters(), initSkillCircuitSync(), initTextScramble(), renderArchitectureProjects(), renderArsenalMatrix(), scrambleElement()

### Community 4 - "app.js"
Cohesion: 0.13
Nodes (7): coPilot, FOCUSABLE_SELECTORS, initMetricsCards(), initThemeToggle(), SECTION_TELEMETRY_MAP, updateMetricsCardsTheme(), updateThemeIcon()

### Community 5 - "Aditya Kumar Singh - Autonomous Systems & Intelligence Dossier"
Cohesion: 0.25
Nodes (7): Aditya Kumar Singh - Autonomous Systems & Intelligence Dossier, 🌟 Distinctive Engineering Innovations, Option 1: Python (Recommended), Option 2: Node.js / npx, Option 3: VS Code / IDE Live Server Extension, 📂 Project Architecture, 🚀 Running Locally

### Community 6 - "initLenisSmoothScroll"
Cohesion: 0.29
Nodes (5): initHeroScrollIndicatorFallback(), initLenisSmoothScroll(), raf(), initScrollProgressBarFallback(), updateVelocitySkew()

### Community 9 - "ai-assistant.js"
Cohesion: 0.50
Nodes (3): ADITYA_PROFILE, ADITYA_PROJECTS, ADITYA_SKILLS

### Community 10 - "initProjectSandboxModal"
Cohesion: 0.50
Nodes (4): initProjectSandboxModal(), closeSandbox(), hexToRgb(), updateBulbVisuals()

### Community 11 - "initCommandPalette"
Cohesion: 0.20
Nodes (16): initCommandPalette(), closePalette(), downloadResume(), openPalette(), openResumeModal(), renderResults(), scrollToSection(), initCyberTerminal() (+8 more)

### Community 13 - "handleDirectProjectQuery"
Cohesion: 0.67
Nodes (3): handleDirectProjectQuery(), initArchInspectorModal(), closeInspector()

### Community 16 - "manifest.json"
Cohesion: 0.15
Nodes (12): background_color, categories, description, display, icons, name, orientation, scope (+4 more)

## Knowledge Gaps
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `initCommandPalette()` connect `initCommandPalette` to `app.js`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Should `showToast` be split into smaller, more focused modules?**
  _Cohesion score 0.13157894736842105 - nodes in this community are weakly interconnected._
- **Why does `initProjectSandboxModal()` connect `initProjectSandboxModal` to `escapeHtml`, `showToast`, `app.js`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Should `app.js` be split into smaller, more focused modules?**
  _Cohesion score 0.13071895424836602 - nodes in this community are weakly interconnected._