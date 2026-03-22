# MCP Tools Specification

This document lists the tools provided by the **Open World News MCP**. Each tool is designed to provide high-quality, structured news data for AI models.

## 1. `list_countries`
- **Purpose**: Get a list of all countries currently supported by the feed engine.
- **Parameters**: None.
- **Returns**: A JSON object containing country codes (e.g., `USA`, `UK`, `KOR`) and their last successful refresh time.
- **[Example Response](../docs/examples/list_countries_sample.json)**

## 2. `get_country_headlines`
- **Purpose**: Fetch the most recent, high-impact news stories for a specific nation.
- **Parameters**:
  - `country_code` (string): Standard ISO-like code (USA, UK, KOR, etc.).
  - `limit` (int, default 5): Number of headlines to retrieve.
- **Returns**: An array of stories, each including `title`, `source`, `link`, and `published_at`.
- **[Example Response](../docs/examples/usa_headlines_sample.json)**

## 3. `read_article_content`
- **Purpose**: A specialized tool to extract the full main text of a news article on-demand.
- **Parameters**:
  - `url` (string): The URL found in the headlines.
- **Returns**: The pure article text, stripped of ads and navigational clutter.
- **Notes**: This tool is an "Active Agent" tool. AI models are instructed to call this whenever a user asks for "more details" or "summarization."

## 4. `get_special_headlines`
- **Purpose**: Access curated, domain-specific news.
- **Parameters**:
  - `category` (string): One of 'economy', 'stocks', 'sports', or 'toys'.
- **Returns**: Recent news specifically filtered for the target theme.

## 5. `search_google_news` (Fallback)
- **Purpose**: Real-time supplementary search for publishers or topics not covered by the current buffer.
- **Parameters**:
  - `query` (string): The keyword or publisher name.
- **Returns**: A real-time set of 5 links from Google News.

---
*Next: Learn how to try these tools in our [Live Demo](demo.md).*
