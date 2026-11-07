const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const report = path.resolve(__dirname, '..', 'reports', 'evidence-report.html');
if (!fs.existsSync(report)) {
  console.error('Report not found. Run a test command first.');
  process.exit(1);
}
exec(`start "" "${report}"`);
