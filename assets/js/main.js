"use strict";

/* =========================================================
   LECTOR IN GRAPHULA
   Main JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  setupMobileNavigation();
  setupExpandableSections();
  setupQueryCards();
  setupActiveNavigation();
});


/* =========================================================
   1. MOBILE NAVIGATION
========================================================= */

function setupMobileNavigation() {
  const toggle = document.querySelector("[data-nav-toggle]");
  const menu = document.querySelector("[data-nav-menu]");

  if (!toggle || !menu) {
    return;
  }

  const accessibleLabel = toggle.querySelector(".sr-only");

  const openMenu = () => {
    menu.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");

    if (accessibleLabel) {
      accessibleLabel.textContent = "Close navigation";
    }
  };

  const closeMenu = () => {
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");

    if (accessibleLabel) {
      accessibleLabel.textContent = "Open navigation";
    }
  };

  toggle.addEventListener("click", () => {
    if (menu.classList.contains("is-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1080) {
      closeMenu();
    }
  });
}


/* =========================================================
   2. ACTIVE NAVIGATION
========================================================= */

function setupActiveNavigation() {
  const navigationLinks = Array.from(
    document.querySelectorAll(".nav-menu a[href^='#']")
  );

  if (navigationLinks.length === 0) {
    return;
  }

  const sections = navigationLinks
    .map((link) => {
      const selector = link.getAttribute("href");
      return selector ? document.querySelector(selector) : null;
    })
    .filter(Boolean);

  if (sections.length === 0 || !("IntersectionObserver" in window)) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort(
          (firstEntry, secondEntry) =>
            secondEntry.intersectionRatio - firstEntry.intersectionRatio
        );

      if (visibleEntries.length === 0) {
        return;
      }

      const activeSectionId = visibleEntries[0].target.id;

      navigationLinks.forEach((link) => {
        const isActive =
          link.getAttribute("href") === `#${activeSectionId}`;

        link.classList.toggle("active", isActive);

        if (isActive) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    },
    {
      rootMargin: "-25% 0px -60% 0px",
      threshold: [0.05, 0.2, 0.5]
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
}


/* =========================================================
   3. EXPANDABLE SECTIONS
========================================================= */

function setupExpandableSections() {
  document.querySelectorAll(".case-card").forEach((card) => {
    const label = card.querySelector(".case-open-label");

    if (!label) {
      return;
    }

    const updateLabel = () => {
      label.textContent = card.open ? "Close" : "Open";
    };

    updateLabel();
    card.addEventListener("toggle", updateLabel);
  });

  document.querySelectorAll(".query-card").forEach((card) => {
    const label = card.querySelector(".query-open-label");

    if (!label) {
      return;
    }

    const updateLabel = () => {
      label.textContent = card.open ? "Close query" : "Open query";
    };

    updateLabel();
    card.addEventListener("toggle", updateLabel);
  });
}


/* =========================================================
   4. QUERY CARDS
========================================================= */

function setupQueryCards() {
  const queryCards = document.querySelectorAll("[data-query-card]");

  queryCards.forEach((card) => {
    const runButton = card.querySelector("[data-run-query]");
    const copyButton = card.querySelector("[data-copy-query]");

    card.addEventListener("toggle", () => {
      if (card.open) {
        loadQuery(card);
      }
    });

    if (runButton) {
      runButton.addEventListener("click", () => {
        simulateQuery(card);
      });
    }

    if (copyButton) {
      copyButton.addEventListener("click", () => {
        copyQuery(card);
      });
    }
  });
}


/* =========================================================
   5. LOAD SPARQL QUERY
========================================================= */

async function loadQuery(card) {
  const queryElement = card.querySelector("[data-query-code]");
  const queryPath = card.dataset.querySrc;

  if (!queryElement || !queryPath) {
    return null;
  }

  if (card.dataset.queryLoaded === "true") {
    return queryElement.textContent;
  }

  queryElement.textContent = "Loading query…";

  try {
    const queryText = await fetchTextFile(queryPath);
    queryElement.textContent = queryText.trim();
    card.dataset.queryLoaded = "true";
    return queryText;
  } catch (error) {
    console.error(error);
    queryElement.textContent =
      "The query could not be loaded.\n" +
      "Check the file path and serve the website through a local server or GitHub Pages.";
    card.dataset.queryLoaded = "false";
    return null;
  }
}


/* =========================================================
   6. SIMULATE QUERY EXECUTION
========================================================= */

async function simulateQuery(card) {
  const runButton = card.querySelector("[data-run-query]");
  const statusElement = card.querySelector("[data-query-status]");
  const resultElement = card.querySelector("[data-query-result]");
  const resultPath = card.dataset.resultSrc;

  if (!runButton || !statusElement || !resultElement || !resultPath) {
    return;
  }

  const queryText = await loadQuery(card);

  if (!queryText) {
    statusElement.textContent =
      "The simulation could not start because the query file was not loaded.";
    return;
  }

  runButton.disabled = true;
  runButton.textContent = "Running…";
  statusElement.textContent = "Simulating query execution…";
  resultElement.replaceChildren();

  try {
    await wait(450);

    statusElement.textContent = "Loading the stored CSV result…";

    const csvText = await fetchTextFile(resultPath);
    const parsedCSV = parseCSV(csvText);

    renderCSVResult(
      parsedCSV,
      resultElement,
      card.classList.contains("query-card-negative")
    );

    statusElement.textContent =
      "Query completed. The table below reproduces the stored evaluation result.";
  } catch (error) {
    console.error(error);
    statusElement.textContent =
      "The stored result could not be loaded.";
    renderQueryError(resultElement, resultPath);
  } finally {
    runButton.disabled = false;
    runButton.textContent = "Run query";
  }
}


/* =========================================================
   7. COPY QUERY
========================================================= */

async function copyQuery(card) {
  const queryElement = card.querySelector("[data-query-code]");

  if (!queryElement) {
    return;
  }

  const queryText = await loadQuery(card);

  if (!queryText) {
    showToast("The query could not be copied.");
    return;
  }

  try {
    await copyTextToClipboard(queryElement.textContent);
    showToast("Query copied to the clipboard.");
  } catch (error) {
    console.error(error);
    showToast("The query could not be copied.");
  }
}

async function copyTextToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const temporaryTextArea = document.createElement("textarea");

  temporaryTextArea.value = text;
  temporaryTextArea.setAttribute("readonly", "");
  temporaryTextArea.style.position = "fixed";
  temporaryTextArea.style.opacity = "0";
  temporaryTextArea.style.pointerEvents = "none";

  document.body.appendChild(temporaryTextArea);
  temporaryTextArea.select();
  temporaryTextArea.setSelectionRange(
    0,
    temporaryTextArea.value.length
  );

  const copied = document.execCommand("copy");
  temporaryTextArea.remove();

  if (!copied) {
    throw new Error("The browser refused the copy operation.");
  }
}


/* =========================================================
   8. FILE LOADING
========================================================= */

async function fetchTextFile(path) {
  const encodedPath = encodeURI(path);
  const response = await fetch(encodedPath);

  if (!response.ok) {
    throw new Error(
      `Unable to load "${path}". HTTP status: ${response.status}`
    );
  }

  return response.text();
}


/* =========================================================
   9. CSV PARSING
========================================================= */

function parseCSV(csvText) {
  const normalizedText = csvText
    .replace(/^\uFEFF/, "")
    .trim();

  if (!normalizedText) {
    return { headers: [], rows: [] };
  }

  const delimiter = detectDelimiter(normalizedText);
  const rows = [];

  let currentRow = [];
  let currentField = "";
  let insideQuotes = false;

  for (let index = 0; index < normalizedText.length; index += 1) {
    const character = normalizedText[index];
    const nextCharacter = normalizedText[index + 1];

    if (character === '"') {
      if (insideQuotes && nextCharacter === '"') {
        currentField += '"';
        index += 1;
      } else {
        insideQuotes = !insideQuotes;
      }

      continue;
    }

    if (character === delimiter && !insideQuotes) {
      currentRow.push(currentField);
      currentField = "";
      continue;
    }

    if (
      (character === "\n" || character === "\r") &&
      !insideQuotes
    ) {
      if (character === "\r" && nextCharacter === "\n") {
        index += 1;
      }

      currentRow.push(currentField);

      if (rowContainsData(currentRow)) {
        rows.push(currentRow);
      }

      currentRow = [];
      currentField = "";
      continue;
    }

    currentField += character;
  }

  currentRow.push(currentField);

  if (rowContainsData(currentRow)) {
    rows.push(currentRow);
  }

  if (rows.length === 0) {
    return { headers: [], rows: [] };
  }

  const widestRowLength = Math.max(
    ...rows.map((row) => row.length)
  );

  const headers = [...rows[0]];

  while (headers.length < widestRowLength) {
    headers.push(`Column ${headers.length + 1}`);
  }

  const cleanedHeaders = headers.map((header, index) => {
    const cleanedHeader = header.trim();
    return cleanedHeader || `Column ${index + 1}`;
  });

  const dataRows = rows
    .slice(1)
    .map((row) =>
      normalizeRowLength(row, cleanedHeaders.length)
    );

  return {
    headers: cleanedHeaders,
    rows: dataRows
  };
}

function detectDelimiter(csvText) {
  const firstLogicalLine = getFirstLogicalCSVLine(csvText);
  const possibleDelimiters = [",", ";", "\t"];

  let selectedDelimiter = ",";
  let highestCount = -1;

  possibleDelimiters.forEach((delimiter) => {
    const count = countDelimiterOutsideQuotes(
      firstLogicalLine,
      delimiter
    );

    if (count > highestCount) {
      highestCount = count;
      selectedDelimiter = delimiter;
    }
  });

  return selectedDelimiter;
}

function getFirstLogicalCSVLine(csvText) {
  let insideQuotes = false;
  let line = "";

  for (let index = 0; index < csvText.length; index += 1) {
    const character = csvText[index];
    const nextCharacter = csvText[index + 1];

    if (character === '"') {
      if (insideQuotes && nextCharacter === '"') {
        line += '""';
        index += 1;
        continue;
      }

      insideQuotes = !insideQuotes;
    }

    if (
      (character === "\n" || character === "\r") &&
      !insideQuotes
    ) {
      break;
    }

    line += character;
  }

  return line;
}

function countDelimiterOutsideQuotes(text, delimiter) {
  let count = 0;
  let insideQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    const nextCharacter = text[index + 1];

    if (character === '"') {
      if (insideQuotes && nextCharacter === '"') {
        index += 1;
      } else {
        insideQuotes = !insideQuotes;
      }

      continue;
    }

    if (character === delimiter && !insideQuotes) {
      count += 1;
    }
  }

  return count;
}

function rowContainsData(row) {
  return row.some((cell) => cell.trim() !== "");
}

function normalizeRowLength(row, expectedLength) {
  const normalizedRow = [...row];

  while (normalizedRow.length < expectedLength) {
    normalizedRow.push("");
  }

  return normalizedRow;
}


/* =========================================================
   10. CSV TABLE RENDERING
========================================================= */

function renderCSVResult(
  parsedCSV,
  resultElement,
  isNegativeQuestion
) {
  resultElement.replaceChildren();

  const { headers, rows } = parsedCSV;

  if (headers.length === 0) {
    renderEmptyResult(
      resultElement,
      isNegativeQuestion,
      "The stored CSV file is empty."
    );
    return;
  }

  if (rows.length === 0) {
    const message = isNegativeQuestion
      ? "The stored result contains no rows. In this negative competency question, this means that no unwanted assertion or violation was found."
      : "The stored result contains column headers but no data rows.";

    renderEmptyResult(
      resultElement,
      isNegativeQuestion,
      message
    );
    return;
  }

  const table = document.createElement("table");
  table.setAttribute(
    "aria-label",
    "Stored SPARQL query result"
  );

  const tableHead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  headers.forEach((header) => {
    const headingCell = document.createElement("th");
    headingCell.scope = "col";
    headingCell.textContent = header;
    headerRow.appendChild(headingCell);
  });

  tableHead.appendChild(headerRow);
  table.appendChild(tableHead);

  const tableBody = document.createElement("tbody");

  rows.forEach((row) => {
    const tableRow = document.createElement("tr");

    headers.forEach((header, index) => {
      const dataCell = document.createElement("td");
      const value = row[index] ?? "";
      dataCell.textContent = formatResultValue(value);
      tableRow.appendChild(dataCell);
    });

    tableBody.appendChild(tableRow);
  });

  table.appendChild(tableBody);
  resultElement.appendChild(table);
}

function formatResultValue(value) {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return "—";
  }

  if (
    trimmedValue.startsWith("<") &&
    trimmedValue.endsWith(">")
  ) {
    return trimmedValue.slice(1, -1);
  }

  return trimmedValue;
}

function renderEmptyResult(
  resultElement,
  isNegativeQuestion,
  message
) {
  const emptyMessage = document.createElement("p");
  emptyMessage.className = "query-result-empty";
  emptyMessage.textContent = message;

  if (isNegativeQuestion) {
    emptyMessage.setAttribute(
      "data-negative-result",
      "true"
    );
  }

  resultElement.appendChild(emptyMessage);
}

function renderQueryError(resultElement, resultPath) {
  resultElement.replaceChildren();

  const errorMessage = document.createElement("p");
  errorMessage.className = "query-error";
  errorMessage.textContent =
    `The file "${resultPath}" could not be loaded. ` +
    "Check that its name and location match the " +
    "data-result-src attribute in index.html.";

  resultElement.appendChild(errorMessage);
}


/* =========================================================
   11. TOAST
========================================================= */

let toastTimer = null;

function showToast(message) {
  const toast = document.querySelector("[data-toast]");

  if (!toast) {
    return;
  }

  toast.textContent = message;
  toast.hidden = false;

  if (toastTimer) {
    window.clearTimeout(toastTimer);
  }

  toastTimer = window.setTimeout(() => {
    toast.hidden = true;
  }, 2200);
}


/* =========================================================
   12. UTILITIES
========================================================= */

function wait(milliseconds) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds);
  });
}
