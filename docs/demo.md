# Live Demo Guide

To see the **Open World News MCP** in action without hosting it yourself, you can connect to our dedicated Live Demo Server.

## 🖥️ How to Connect

### 1. Claude Desktop
Add the following to your `config.json` file:
```json
{
  "mcpServers": {
    "open-world-news-demo": {
      "url": "http://35.202.58.51:8766/sse"
    }
  }
}
```

### 2. ASDK Studio / Other Clients
- **Connection Type**: HTTP (SSE)
- **URL**: `http://35.202.58.51:8766/sse`

## 💬 Try These Scenarios
Once connected, try asking your AI:
1. "What are the top news in South Korea right now? Compare them with US headlines."
2. "I found a link in the headlines, please read the full content and summarize the core conflict."
3. "Are there any recent stocks-related news from the US?"

## ⚠️ Demo Server Limits
To ensure quality for all users, the demo server has the following temporary restrictions:
- **Rate Limiting**: Applied per IP address.
- **Timeout**: Large article extraction may have a 60-second timeout.
- **Availability**: 99.9% uptime (hosted on GCP).

---
*For a deeper look into the code structure, return to the [Main README](../README.md).*
