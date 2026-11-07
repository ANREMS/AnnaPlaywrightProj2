// Usage: node scripts/run-tests.js [smoke|sanity|regression] [extra cucumber args]
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const [profile, ...extra] = process.argv.slice(2);

fs.rmSync(path.join(root, 'reports'), { recursive: true, force: true });

const cucumberBin = path.join(root, 'node_modules', '@cucumber', 'cucumber', 'bin', 'cucumber.js');
const args = [cucumberBin, ...(profile ? ['--profile', profile] : []), ...extra];
const run = spawnSync(process.execPath, args, { cwd: root, stdio: 'inherit' });

spawnSync(process.execPath, [path.join(__dirname, 'evidence-report.js')], { cwd: root, stdio: 'inherit' });

process.exit(run.status ?? 1);
