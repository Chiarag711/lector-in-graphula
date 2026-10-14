const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const document = {
  addEventListener() {},
  createElement(tag) {
    return {
      tag, children: [], attributes: {},
      replaceChildren() { this.children = []; },
      appendChild(child) { this.children.push(child); },
      setAttribute(name, value) { this.attributes[name] = value; }
    };
  }
};
const context = vm.createContext({ document });
vm.runInContext(fs.readFileSync(path.join(root, "assets/js/main.js"), "utf8"), context);
const parse = (text) => JSON.parse(JSON.stringify(context.parseCSV(text)));
const counts = [28, 27, 18, 30, 39, 13, 12, 2, 0, 1, 4];
const columns = [
  "fragmentLabel source cueLabel cueText inferenceLabel",
  "fragmentLabel cueLabel cueText knowledgeLabel",
  "fragmentLabel cueLabel cueText presuppositionLabel",
  "fragmentLabel cueLabel cueText resourceLabel",
  "sequence cueLabel cueText inferenceLabel interpretationLabel status",
  "interpretationLabel status",
  "inferenceLabel predictionLabel disjunctionLabel alternativePredictionLabel",
  "textLabel modelReaderLabel",
  "entityLabel",
  "interpretationLabel status",
  "disjunctionLabel alternativePredictionLabel"
];
for (let i = 0; i < counts.length; i++) {
  const label = i < 8 ? `CQ${i + 1}` : `NCQ${i - 7}`;
  const text = fs.readFileSync(path.join(root, `queries/results/Aspected_result(${label}).csv`), "utf8");
  const result = parse(text);
  assert.deepEqual(result.headers, columns[i].split(" ").map((name) => `?${name}`), label);
  assert.equal(result.rows.length, counts[i], label);
  assert(result.rows.every((row) => row.length === result.headers.length), label);
  const target = document.createElement("div");
  context.renderCSVResult(result, target, i >= 8);
  assert.equal(target.children[0].tag, counts[i] === 0 ? "p" : "table", label);
  if (label === "NCQ1") {
    assert.equal(target.children[0].attributes["data-negative-result"], "true");
    assert.match(target.children[0].textContent, /contains no rows/);
  }
}
assert.deepEqual(parse(""), { headers: [], rows: [] });
assert.deepEqual(parse('\uFEFFname,note\r\nAlice,"line 1\nline 2, ""quoted"""'), {
  headers: ["name", "note"], rows: [["Alice", 'line 1\nline 2, "quoted"']]
});
assert.throws(() => parse('"CQ1: missing header",\nvalue,data'), /missing its variable headers/);
console.log("PASS: all 11 result tables, NCQ1 empty rendering, CSV quoting and missing-header handling.");
