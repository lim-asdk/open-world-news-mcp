# Open World News MCP

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](http://35.202.58.51:8766/sse)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **One event, different national narratives.**  
> A country-aware global news layer for AI Agents via Model Context Protocol (MCP).

---

## 🌍 Overview
**Open World News MCP** is a specialized news delivery layer designed for AI agents that need to compare news framing across different countries. It goes beyond simple "top headlines" by providing a structured, multi-national perspective on global events.

This repository serves as a **Public Showcase** of the project's architecture, tool interfaces, and UI dashboard. 

> [!IMPORTANT]
> To protect proprietary operational logic and ensure service stability, the **core processing engine** is not included in this public repository. However, a **Live Demo Server** is available for direct testing.

## ✨ Key Features
- **Country-Specific Framing**: Compare how the same topic is covered by major publishers in the US, UK, South Korea, etc.
- **AI-Optimized Content**: Clean, structured data (JSON) designed specifically for LLM consumption.
- **Active Article Extraction**: Bypasses clutter to read the full text of linked articles on-demand.
- **SSE Transport Support**: Native HTTP streaming for robust remote connections.

## 🚀 Live Demo
You can connect your MCP client (like Claude Desktop or ASDK Studio) directly to our demo server:

**SSE Endpoint:** `http://35.202.58.51:8766/sse`

---

## 🛠️ Tool Inventory
| Tool Name | Purpose |
| :--- | :--- |
| `list_countries` | Enumerate supported regions and topic availability. |
| `get_country_headlines` | Retrieve high-impact news stories for a specific nation. |
| `read_article_content` | Deep-read an article's full text for summarization. |
| `get_special_headlines` | Access curated themes like 'Economy' or 'Stocks'. |
| `search_google_news` | Real-time fallback for specific publisher queries. |

*For full details, see [Tools Documentation](docs/tools.md).*

## 🏗️ Architecture
The system follows a 4-layer architecture designed for cloud scalability:
1. **Feed Engine**: Managed ingestion and normalization (Private).
2. **Buffer/Snapshot Layer**: In-memory catalog for near-zero latency.
3. **MCP Interface**: Unified tool set for AI interaction.
4. **UI Operator**: Real-time monitoring and oversight dashboard.

*See the [Architecture Deep Dive](docs/architecture.md) for more.*

---

## 📁 Repository Scope
| Component | Public | Private |
| :--- | :--- | :--- |
| UI Dashboard (Tailwind/JS) | ✅ Full | - |
| MCP Tool Interface (Stubs) | ✅ Specs | - |
| Documentation & Examples | ✅ Full | - |
| **Core Feed Engine** | - | 🔒 Private |
| **Article Extraction Logic** | - | 🔒 Private |
| **Operational Secrets** | - | 🔒 Private |

## 📝 License
This showcase repository is licensed under the MIT License.

---
© 2026 Open World News MCP. Developed for the next generation of Global AI Agents.
