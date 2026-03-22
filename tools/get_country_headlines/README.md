# get_country_headlines

## Description
Fetches the most recent, high-impact news stories for a specific nation. It aggregates data from multiple national publishers to provide a balanced overview.

## Interface
- **Input**: `country_code` (e.g., 'USA'), `limit` (default: 5)
- **Output**: Array of headline objects.

## Showcase Note
In the production version, this tool uses a managed in-memory buffer for millisecond response times.
