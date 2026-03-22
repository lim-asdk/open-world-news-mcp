async function loadJson(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load ${path}`);
  }
  return response.json();
}

function byId(id) {
  return document.getElementById(id);
}

function selectedCountry() {
  return byId("country-filter")?.value || "";
}

function selectedTopic() {
  return byId("topic-filter")?.value || "";
}

function selectedSort() {
  return byId("sort-mode")?.value || "state";
}

function sortWeight(state) {
  return {
    ready: 0,
    degraded: 1,
    failed: 2,
    unknown: 3,
  }[state || "unknown"] ?? 3;
}

function compareText(a, b) {
  return String(a || "").localeCompare(String(b || ""), undefined, {
    numeric: true,
    sensitivity: "base",
  });
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function parseDate(value) {
  if (!value) {
    return 0;
  }
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function sortFeeds(feeds, mode) {
  const rows = [...(feeds || [])];
  rows.sort((a, b) => {
    if (mode === "latest") {
      return (
        parseDate(b.last_success_at || b.last_checked_at) -
          parseDate(a.last_success_at || a.last_checked_at) ||
        sortWeight(a.state) - sortWeight(b.state) ||
        compareText(a.country_code, b.country_code) ||
        compareText(a.topic, b.topic) ||
        compareText(a.source_name, b.source_name)
      );
    }

    if (mode === "country") {
      return (
        compareText(a.country_code, b.country_code) ||
        compareText(a.topic, b.topic) ||
        compareText(a.source_name, b.source_name)
      );
    }

    if (mode === "topic") {
      return (
        compareText(a.topic, b.topic) ||
        compareText(a.country_code, b.country_code) ||
        compareText(a.source_name, b.source_name)
      );
    }

    if (mode === "source") {
      return (
        compareText(a.source_name, b.source_name) ||
        compareText(a.country_code, b.country_code) ||
        compareText(a.topic, b.topic)
      );
    }

    return (
      sortWeight(a.state) - sortWeight(b.state) ||
      compareText(a.country_code, b.country_code) ||
      compareText(a.topic, b.topic) ||
      compareText(a.source_name, b.source_name)
    );
  });
  return rows;
}

function flattenItems(snapshot) {
  const rows = [];
  for (const feed of snapshot?.feeds || []) {
    for (const item of feed.items || []) {
      rows.push({
        feed_id: feed.id,
        state: feed.state || "unknown",
        last_checked_at: feed.last_checked_at,
        last_success_at: feed.last_success_at,
        country_code: feed.country_code,
        topic: feed.topic,
        source_name: item.source_name || feed.source_name,
        title: item.title || "Untitled item",
        link: item.link || "",
        published_at: item.published_at || "",
        summary: item.summary || "",
      });
    }
  }
  rows.sort((a, b) => parseDate(b.published_at) - parseDate(a.published_at) || compareText(a.title, b.title));
  return rows;
}

function filterSnapshotFeeds(feeds, countryCode, topic) {
  return (feeds || []).filter((feed) => {
    if (countryCode && feed.country_code !== countryCode) {
      return false;
    }
    if (topic && feed.topic !== topic) {
      return false;
    }
    return true;
  });
}

function filterSnapshotItems(items, countryCode, topic) {
  return (items || []).filter((item) => {
    if (countryCode && item.country_code !== countryCode) {
      return false;
    }
    if (topic && item.topic !== topic) {
      return false;
    }
    return true;
  });
}

function renderChipList(container, items, formatter) {
  container.innerHTML = "";
  for (const item of items) {
    const chip = document.createElement("div");
    chip.className = "chip";
    chip.textContent = formatter(item);
    container.appendChild(chip);
  }
}

function renderPackSummary(container, pack) {
  container.innerHTML = "";
  const card = document.createElement("article");
  card.className = "pack-card";
  card.innerHTML = `
    <div class="status-pill">Active Pack</div>
    <h3>${pack.label}</h3>
    <p class="pack-note">Topics: ${(pack.topic_scope || []).join(", ") || "none"}</p>
    <p class="pack-note">Tools: ${(pack.tool_ids || []).join(", ") || "none"}</p>
  `;
  container.appendChild(card);
}

function renderRuntimeProfile(container, overview) {
  container.innerHTML = "";
  const card = document.createElement("article");
  card.className = "runtime-card";
  const runtime = overview.runtime || {};
  const operatorUi = overview.operator_ui || {};
  const project = overview.project || {};
  card.innerHTML = `
    <div class="status-pill ready">Public Runtime</div>
    <h3>${project.label || "Open World News MCP v1"}</h3>
    <div class="runtime-grid">
      <div><span>Refresh interval:</span> ${runtime.refresh_interval_sec || "-"} sec</div>
      <div><span>Default headline limit:</span> ${runtime.headline_limit_default || "-"}</div>
      <div><span>Default feed timeout:</span> ${runtime.feed_timeout_sec_default || "-"} sec</div>
      <div><span>Operator UI:</span> ${operatorUi.host || "127.0.0.1"}:${operatorUi.port || 8765}</div>
      <div><span>Browser open on launch:</span> ${operatorUi.open_browser ? "yes" : "no"}</div>
      <div><span>Runtime config:</span> ${project.config_path || "-"}</div>
    </div>
  `;
  container.appendChild(card);
}

function renderToolCards(container, tools) {
  container.innerHTML = "";
  for (const tool of tools) {
    const status = tool.status || "planned";
    const card = document.createElement("article");
    card.className = "tool-card";
    card.innerHTML = `
      <div class="status-pill ${status}">${status}</div>
      <h3>${tool.id}</h3>
      <p class="tool-meta">Topics: ${(tool.topic_scope || []).join(", ") || "catalog-only"}</p>
      <p class="tool-status">Public operator note: this tool is part of the public runtime inventory.</p>
    `;
    container.appendChild(card);
  }
}

function renderFeedStatusMeta(container, payload) {
  const counts = payload.counts || {};
  const source = payload.source || {};
  const visible = payload.visible || {};
  const filters = payload.filters || {};
  container.textContent =
    `Visible feeds: ${visible.feeds || 0}/${counts.total || 0} | ` +
    `Ready: ${counts.ready || 0} | Degraded: ${counts.degraded || 0} | Failed: ${counts.failed || 0} | ` +
    `Filter: ${filters.country_code || "all"} / ${filters.topic || "all"} | ` +
    `Snapshot: ${source.status_generated_at || "-"} / ${source.items_generated_at || "-"}`;
}

function renderFeedDetail(container, payload, sortMode) {
  container.innerHTML = "";
  const feeds = payload.feeds || [];
  if (!feeds.length) {
    container.innerHTML = `
      <article class="feed-row">
        <h3>No feeds loaded</h3>
        <p class="feed-note">The runtime snapshot is still empty or has not been refreshed yet.</p>
      </article>
    `;
    return;
  }

  for (const feed of sortFeeds(feeds, sortMode)) {
    const state = feed.state || "unknown";
    const row = document.createElement("article");
    row.className = "feed-row";
    row.innerHTML = `
      <div class="feed-row-top">
        <div>
          <h3>${feed.source_name || feed.id || "Unnamed feed"}</h3>
          <p class="feed-subtitle">${feed.country_code || "-"} | ${feed.topic || "-"} | ${feed.language || "-"}</p>
        </div>
        <div class="status-pill ${state}">${state}</div>
      </div>
      <div class="feed-tags">
        <div class="feed-tag">ID: ${feed.id || "-"}</div>
        <div class="feed-tag">Definition: ${feed.definition_file || "-"}</div>
        <div class="feed-tag">Items cached: ${feed.item_count || 0}</div>
        <div class="feed-tag">Last checked: ${feed.last_checked_at || "never"}</div>
        <div class="feed-tag">Last success: ${feed.last_success_at || "never"}</div>
      </div>
      <p class="feed-note">URL: ${feed.feed_url || "-"}</p>
      <p class="feed-note">Last error: ${feed.last_error || "none"}</p>
    `;
    container.appendChild(row);
  }
}

function renderHeadlineStatusMeta(container, payload) {
  const visible = payload.visible || {};
  const source = payload.source || {};
  const filters = payload.filters || {};
  container.textContent =
    `Visible headlines: ${visible.items || 0}/${visible.total || 0} | ` +
    `Filter: ${filters.country_code || "all"} / ${filters.topic || "all"} | ` +
    `Snapshot: ${source.items_generated_at || "-"}`;
}

function renderHeadlinePreview(container, items, limit = 48) {
  container.innerHTML = "";
  const rows = items || [];
  const cacheMode = "snapshot";
  if (!rows.length) {
    container.innerHTML = `
      <article class="headline-card">
        <h3>No headlines yet</h3>
        <p class="headline-meta">Cache mode: ${cacheMode}</p>
        <p class="headline-meta">The snapshot may still be empty or waiting for the next refresh.</p>
      </article>
    `;
    return;
  }

  for (const item of rows.slice(0, limit)) {
    const card = document.createElement("article");
    card.className = "headline-card";
    const title = item.title || "Untitled item";
    const link = item.link || "";
    const summary = item.summary || "";
    const sourceLine = `${item.source_name || "Unknown source"} | ${item.country_code || "-"} | ${item.topic || "-"} | ${cacheMode}`;
    const publishedLine = item.published_at || "unknown time";
    const titleMarkup = link
      ? `<a href="${escapeHtml(link)}" target="_blank" rel="noopener noreferrer">${escapeHtml(title)}</a>`
      : escapeHtml(title);
    const urlMarkup = link
      ? `<p class="headline-url"><a href="${escapeHtml(link)}" target="_blank" rel="noopener noreferrer">Open original URL</a><span class="headline-url-sep">|</span><a class="headline-url-text" href="${escapeHtml(link)}" target="_blank" rel="noopener noreferrer">${escapeHtml(link)}</a></p>`
      : "";
    const summaryMarkup = summary ? `<p class="headline-summary">${escapeHtml(summary)}</p>` : "";
    card.innerHTML = `
      <h3 class="headline-title">${titleMarkup}</h3>
      <p class="headline-meta">${escapeHtml(sourceLine)}</p>
      <p class="headline-meta">${escapeHtml(publishedLine)}</p>
      ${summaryMarkup}
      ${urlMarkup}
    `;
    container.appendChild(card);
  }
}

async function boot() {
  const overview = await loadJson("/ui_api/overview");
  const sortSelect = byId("sort-mode");
  const countrySelect = byId("country-filter");
  const topicSelect = byId("topic-filter");

  countrySelect.innerHTML = [
    `<option value="">All countries</option>`,
    ...(overview.countries || []).map((item) => `<option value="${item.code}">${item.code} - ${item.label}</option>`),
  ].join("");
  topicSelect.innerHTML = [
    `<option value="">All topics</option>`,
    ...(overview.topics || []).map((item) => `<option value="${item.id}">${item.id} - ${item.label}</option>`),
  ].join("");

  const loadCurrentView = async (refreshStatus = true) => {
    if (refreshStatus) {
      await loadJson("/ui_api/feed-status?refresh=1");
    }
    const [statusSnapshot, itemSnapshot] = await Promise.all([
      loadJson("/data/feed_status_snapshot.json"),
      loadJson("/data/feed_items_snapshot.json"),
    ]);

    const counts = {
      total: (statusSnapshot.feeds || []).length,
      ready: (statusSnapshot.feeds || []).filter((entry) => entry.state === "ready").length,
      degraded: (statusSnapshot.feeds || []).filter((entry) => entry.state === "degraded").length,
      failed: (statusSnapshot.feeds || []).filter((entry) => entry.state === "failed").length,
      unknown: (statusSnapshot.feeds || []).filter((entry) => entry.state === "unknown").length,
    };
    const countryCode = selectedCountry();
    const topic = selectedTopic();
    const sortMode = selectedSort();
    const allItems = flattenItems(itemSnapshot);
    const filteredFeeds = filterSnapshotFeeds(statusSnapshot.feeds || [], countryCode, topic);
    const filteredItems = filterSnapshotItems(allItems, countryCode, topic);
    const sortedFeeds = sortFeeds(filteredFeeds, sortMode);

    byId("feed-ready-count").textContent = counts.ready;
    byId("feed-degraded-count").textContent = counts.degraded;
    byId("feed-unknown-count").textContent = counts.unknown;

    renderFeedStatusMeta(byId("feed-status-meta"), {
      counts,
      visible: { feeds: filteredFeeds.length },
      source: {
        status_generated_at: statusSnapshot.generated_at || "-",
        items_generated_at: itemSnapshot.generated_at || "-",
      },
      filters: { country_code: countryCode || "all", topic: topic || "all" },
    });
    renderHeadlineStatusMeta(byId("headline-status-meta"), {
      visible: { items: filteredItems.length, total: allItems.length },
      source: { items_generated_at: itemSnapshot.generated_at || "-" },
      filters: { country_code: countryCode || "all", topic: topic || "all" },
    });
    renderFeedDetail(byId("feed-detail"), { feeds: sortedFeeds }, sortMode);
    renderHeadlinePreview(byId("headline-preview"), filteredItems);
  };

  byId("country-count").textContent = overview.counts.countries;
  byId("topic-count").textContent = overview.counts.topics;
  byId("tool-count").textContent = overview.counts.tools;

  renderRuntimeProfile(byId("runtime-profile"), overview);
  renderChipList(byId("countries"), overview.countries, (item) => `${item.code} - ${item.label}`);
  renderChipList(byId("topics"), overview.topics, (item) => `${item.id} - ${item.label}`);
  renderPackSummary(byId("pack-summary"), overview.pack);
  renderToolCards(byId("tool-cards"), overview.tools);

  byId("refresh-button").addEventListener("click", () => loadCurrentView(true).catch(handleUiError));
  byId("status-button").addEventListener("click", () => loadCurrentView(false).catch(handleUiError));
  countrySelect.addEventListener("change", () => loadCurrentView(false).catch(handleUiError));
  topicSelect.addEventListener("change", () => loadCurrentView(false).catch(handleUiError));
  sortSelect.addEventListener("change", () => loadCurrentView(false).catch(handleUiError));

  await loadCurrentView(true);
}

function handleUiError(error) {
  console.error(error);
  const container = byId("tool-cards");
  if (container) {
    container.innerHTML = `
      <article class="tool-card">
        <div class="status-pill planned">UI Error</div>
        <h3>Catalog load failed</h3>
        <p class="tool-status">${error.message}</p>
      </article>
    `;
  }
}

boot().catch(handleUiError);
