# Open World News MCP: Global Intelligence Interface

> **One event, different national narratives.**  
> Decode how the world's media frames global crises, energy, and diplomacy.

| [🚀 Live Demo](http://35.202.58.51:8766/sse) | [🏗️ Architecture](docs/architecture.md) | [🛠️ Tools](docs/tools.md) | [🔍 Privacy Scope](docs/privacy_scope.md) |
| :--- | :--- | :--- | :--- |

---

## 🌎 What is Open World News MCP?
It is a **Country-Aware Intelligence Layer** for AI agents. In a world of geopolitical shifts, the "facts" are only the surface. The real intelligence lies in the **narratives**—how the same event is told by local media across the US, UK, Middle East, and Asia.

## 🔥 Why This is Necessary
During global conflicts or diplomatic crises, information is weaponized through **framing**. 
- **USA** media might focus on security alliances.
- **Saudi Arabia** media might focus on energy stability.
- **UK** media might focus on international law.

This MCP allows AI models to **compare these tones side-by-side** to provide a truly global perspective, not just a Western-centric one.

## 📊 Compare National Narratives (Example)
*How the same crisis is framed across regions:*

| Region | Primary Narrative Framing | Sample Output |
| :--- | :--- | :--- |
| **USA** | Strategic Alliances & Deterrence | [USA Sample](docs/examples/usa_headlines_sample.json) |
| **UK** | Humanitarian Impact & Legal Frameworks | [UK Sample](docs/examples/uk_headlines_sample.json) |
| **Saudi Arabia** | Regional Stability & Energy Leadership | [Saudi Sample](docs/examples/saudi_headlines_sample.json) |

---

## 📸 Dashboard Preview
![Operator Dashboard](screenshots/ui_dashboard.png)

---

## 🚀 Live Demo Connection
Connect your MCP client (Claude Desktop, ASDK Studio) directly to our GCP production instance:

**SSE Endpoint:** `http://35.202.58.51:8766/sse`

---

## ✨ Features
- **Perspective Detection**: Not just *what* happened, but *how* it's reported.
- **Deep-Reading Engine**: Active article extraction to bypass paywalls and ads for AI summarization.
- **Zero-Latency In-Memory Catalog**: Immediate access to the latest global narrative snapshots.

## 📁 Repository Showcase Scope
This repository demonstrates the **Project Architecture, Model-Context Interface, and UI Dashboard**. 

> [!IMPORTANT]
> To protect proprietary operational logic (ingestion engine, fallback heuristics), the core background processing logic is private. This repository provides **Tool Stubs** to illustrate the interface while the **Live Demo** provides the actual performance.

## 📝 License
This showcase repository is licensed under the **General & Non-Commercial Use License**. 
- Personal and educational use is encouraged.
- Commercial use is strictly prohibited without prior authorization.

---
© 2026 Open World News MCP. Tracking the world's shifting narratives. 66
