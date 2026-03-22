# MCP Intelligence Sensors (Tools) Specification

This document lists the standardized tools (intelligence sensors) provided by the **Open World News MCP**. Each tool is designed to deliver high-signal, multi-national narrative data.

## 1. `list_countries`
- **Purpose**: Enumerate supported regions and current information sensor health.
- **Parameters**: None.
- **Returns**: A JSON object containing country codes (e.g., `USA`, `UK`, `SAU`, `KOR`) and their last metadata refresh time.
- **[Example Response](../docs/examples/list_countries_sample.json)**

## 2. `get_country_headlines` (Narrative Capture)
- **Purpose**: Capture the national headlines and framing for a specific region.
- **Input**:
  - `country_code` (e.g., 'USA', 'KOR').
  - `limit` (default: 5).
- **Intelligence Value**: Allows AI to see which stories are prioritized by a specific nation's local media.
- **[Example Response](../docs/examples/usa_headlines_sample.json)**

## 3. `read_article_content` (Active Deep-Reading)
- **Purpose**: Deep-read the underlying text of a story to detect tone, nuance, and perspective.
- **Input**: `url` (valid news URL).
- **Intelligence Value**: Essential for "Active Agent" mode where the AI must verify framing without hallucination.

## 4. `get_special_headlines` (Thematic Intelligence)
- **Purpose**: Focused sensors for 'Economy', 'Security', 'Energy', or 'Markets'.
- **Input**: `category` (string), `limit`.
- **Intelligence Value**: Filters global narratives for specific operational domains.

## 5. `search_google_news` (Fallback Search)
- **Purpose**: Supplementary real-time search for specific publisher queries not yet in the buffer.

---
*Next: Learn how these sensors work together in our [Architecture Deep Dive](architecture.md).*
