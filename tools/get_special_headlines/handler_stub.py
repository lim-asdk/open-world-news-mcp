def run(category: str, limit: int = 5) -> dict:
    """[STUB] Returns sample themed news."""
    return {
        "category": category,
        "headlines": [
            {"title": f"[Demo {category.capitalize()}] Performance Metrics Highlighted", "source": "Insight Lab", "link": "https://example.com/special/1"},
            {"title": f"[Demo {category.capitalize()}] Global Trends in 2026", "source": "Trend Watch", "link": "https://example.com/special/2"}
        ]
    }
