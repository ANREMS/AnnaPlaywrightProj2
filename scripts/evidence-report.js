const fs = require('fs');
const path = require('path');

const reportsDir = path.resolve(__dirname, '..', 'reports');
const jsonPath = path.join(reportsDir, 'cucumber-report.json');
const outPath = path.join(reportsDir, 'evidence-report.html');

const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

if (!fs.existsSync(jsonPath)) {
  console.error('cucumber-report.json not found; evidence report not generated.');
  process.exit(1);
}

const features = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
let passed = 0;
let failed = 0;
let body = '';

for (const feature of features) {
  body += `<h2>Feature: ${esc(feature.name)}</h2>`;
  for (const scenario of feature.elements.filter((e) => e.type === 'scenario')) {
    const steps = scenario.steps.filter((s) => !s.hidden);
    const ok = steps.every((s) => s.result.status === 'passed');
    ok ? passed++ : failed++;
    const tags = (scenario.tags || []).map((t) => t.name).join(' ');
    body += `<details ${ok ? '' : 'open'}><summary class="${ok ? 'passed' : 'failed'}">${ok ? 'PASSED' : 'FAILED'} - Scenario: ${esc(scenario.name)} <small>(line ${scenario.line}) ${esc(tags)}</small></summary>`;
    steps.forEach((step, i) => {
      const status = step.result.status;
      const ms = Math.round((step.result.duration || 0) / 1e6);
      body += `<div class="step"><div class="${status}"><b>Step ${i + 1}:</b> ${esc(step.keyword)}${esc(step.name)} - ${esc(status)} (${ms} ms)</div>`;
      if (step.result.error_message) body += `<pre>${esc(step.result.error_message)}</pre>`;
      for (const e of step.embeddings || []) {
        if (e.mime_type === 'image/png') {
          body += `<img src="data:image/png;base64,${e.data}" alt="Evidence for step ${i + 1}">`;
        }
      }
      body += '</div>';
    });
    body += '</details>';
  }
}

const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Test Evidence Report</title>
<style>
body{font-family:Segoe UI,Arial,sans-serif;margin:20px;background:#f5f6f8}
details{background:#fff;border:1px solid #ddd;border-radius:6px;margin:8px 0;padding:8px}
summary{cursor:pointer;font-weight:600}
.passed{color:#1a7f37}.failed{color:#cf222e}.skipped,.undefined,.pending{color:#9a6700}
.step{margin:10px 0 14px 18px}
img{display:block;max-width:900px;width:100%;border:1px solid #ccc;margin-top:6px}
pre{background:#fff0f0;padding:8px;white-space:pre-wrap}
</style></head><body>
<h1>Test Evidence Report</h1>
<p>Generated ${new Date().toLocaleString()} - <span class="passed">${passed} passed</span>, <span class="failed">${failed} failed</span> scenarios</p>
${body}</body></html>`;

fs.writeFileSync(outPath, html);
console.log(`Evidence report: ${outPath}`);
