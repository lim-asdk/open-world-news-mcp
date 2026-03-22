# Repository Scope & Privacy Policy

This repository is a **Public Showcase**. Its purpose is to demonstrate the architecture, user interface, and model-context interface of the Open World News MCP.

## 🔍 What is Publicly Released?
- **Architecture & Infrastructure Design**: Diagrams and documentation explaining the 4-layer approach.
- **MCP Tool Interface**: Complete tool definitions, parameter sets, and response schemas.
- **UI Operator Source**: The complete HTML/JS/CSS source code for the monitoring dashboard.
- **Client Implementation Stubs**: Examples of how the server entry points and tool handlers are structured.

## 🔒 What remains Private?
To maintain our competitive advantage and ensure the security of our ingestion engine, the following components are not included in this public repository:

1. **The Ingestion Engine (Core)**: The logic responsible for fetching and normalizing feeds from hundreds of international sources.
2. **Proprietary Cleansing Rules**: The heuristics used to identify high-signal news vs. noise.
3. **Internal Orchestration**: The background refresh workers and cache invalidation policies.
4. **Active Extraction Core**: The underlying parsing engine for "read_article_content" (hosted as a separate microservice).

## 🤝 Why this hybrid approach?
We believe in **"Transparency where it counts; Security where it's needed."**
- We share the **Interface** so developers can integrate and build upon our work.
- We share the **UI** to showcase the project's polish and operational readiness.
- We keep the **Engine** private to ensure we can continue providing a reliable, stable service without exposing the service to destructive scraping or direct clone-copying.

---
*Thank you for exploring our project. For commercial inquiries regarding the core engine, please contact the project maintainers.*
