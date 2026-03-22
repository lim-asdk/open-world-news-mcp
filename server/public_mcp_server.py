"""
Public entry point for Open World News MCP (Showcase Version).
This file demonstrates the tool interface and server structure.
Core engine logic and background refreshers are excluded for security.
"""

from __future__ import annotations
import os
import uvicorn
from mcp.server.fastmcp import FastMCP

# Initialize FastMCP Showcase
mcp = FastMCP("OpenWorldNewsMCP-Showcase")

# [Architecture Note] 
# In the production version, these tools link to the Private Ingestion Engine.
# In this showcase, they demonstrate the available interface and schemas.

@mcp.tool()
def list_countries() -> dict:
    """enumerate supported regions and topic availability."""
    from tools.list_countries.handler_stub import run
    return run()

@mcp.tool()
def get_country_headlines(country_code: str, limit: int = 5) -> dict:
    """Fetch the most recent, high-impact news stories for a specific nation."""
    from tools.get_country_headlines.handler_stub import run
    return run(country_code=country_code, limit=limit)

@mcp.tool()
def read_article_content(url: str) -> dict:
    """Deep-read an article's full text for summarization (Active Agent Tool)."""
    from tools.read_article_content.handler_stub import run
    return run(url=url)

@mcp.tool()
def get_special_headlines(category: str, limit: int = 5) -> dict:
    """Access curated themes like 'Economy' or 'Stocks'."""
    from tools.get_special_headlines.handler_stub import run
    return run(category=category, limit=limit)

if __name__ == "__main__":
    # Running in SSE mode for demonstration
    uvicorn.run(mcp.sse_app(), host="0.0.0.0", port=8766)
