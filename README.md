# Lector in Graphula — Project Website

Static presentation website for **Lector in Graphula**, an ontology of Umberto Eco's theory of the "Lettore Modello" instantiated on *The Handmaid's Tale*.

Course: Knowledge Representation and Extraction (Prof. Aldo Gangemi) — DHDK, University of Bologna, a.y. 2025/2026.
Authors: Chiara Genovese, Asia Marselli, Adriana Monte.

## Contents

```
index.html              ← the whole website (single page, no build step needed)
assets/
  econtology.ttl        ← ontology (TBox)
  knowledge-graph.ttl   ← knowledge graph (ABox)
  queries.zip           ← 11 SPARQL queries
  queries/*.rq          ← individual query files
```

## How to publish on GitHub Pages (for the repository owner)

1. Copy this whole folder's contents into the repository (either in the root, or in a `/docs` folder).
2. Commit and push.
3. On GitHub: **Settings → Pages**.
4. Under *Build and deployment*: Source = **Deploy from a branch**; Branch = `main`, folder = `/ (root)` (or `/docs` if you used the docs folder).
5. Save. After a minute or two the site will be live at `https://<username>.github.io/<repository>/`.

No build tools, frameworks, or configuration required — it's pure HTML/CSS/JS.

## Local preview

Just open `index.html` in a browser (double-click it). Everything works offline except the Google Fonts.
