const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const match = html.match(/<script>([\s\S]*?)<\/script>/i);
assert.ok(match, 'index.html should contain the application script');

// Load the real in-page case definitions and rule functions without running DOM setup.
const appScript = match[1];
const domSetup = appScript.indexOf("$('caseSelect').innerHTML=");
assert.notEqual(domSetup, -1, 'expected UI initialization marker in index.html');
const context = {};
vm.runInNewContext(
  appScript.slice(0, domSetup) +
  '\nglobalThis.__api = { cases, runCase, sentinel, guardian, investigator, evidence, adversary, judge, metric };',
  context,
  { filename: 'index.html#app-script' }
);
const { cases, runCase, sentinel, metric } = context.__api;

test('case library contains twelve uniquely identified fictional cases', () => {
  assert.equal(cases.length, 12);
  assert.equal(new Set(cases.map(c => c.id)).size, cases.length);
  assert.ok(cases.every(c => c.id.startsWith('SYN-')));
});

test('identity mismatch is flagged by Specimen Sentinel and Judge', () => {
  const c = cases.find(c => c.id === 'SYN-001');
  const result = runCase(c);
  assert.equal(result.Sentinel.flag, true);
  assert.equal(result.Judge.flag, true);
  assert.ok(result.Sentinel.notes.some(n => /identity/i.test(n)));
});

test('clean routine case does not trigger a Sentinel hard-stop', () => {
  const c = cases.find(c => c.id === 'SYN-008');
  assert.equal(sentinel(c).flag, false);
  assert.equal(runCase(c).Judge.flag, false);
});

test('potassium case triggers the configured illustrative H-index rule', () => {
  const c = cases.find(c => c.id === 'SYN-002');
  assert.equal(sentinel(c).flag, true);
  assert.ok(sentinel(c).notes.some(n => /H-index/i.test(n)));
});

test('missing collection timing is not silently treated as passed', () => {
  const c = cases.find(c => c.id === 'SYN-010');
  assert.equal(sentinel(c).flag, true);
  assert.ok(sentinel(c).notes.some(n => /stability/i.test(n)));
});

test('all synthetic HOLD cases are flagged by the current Sentinel rules', () => {
  const holds = cases.filter(c => c.label === 'hold');
  assert.ok(holds.length > 0);
  for (const c of holds) {
    assert.equal(sentinel(c).flag, true, c.id + ' should be flagged under current synthetic rules');
    assert.equal(runCase(c).Judge.flag, true, c.id + ' should be routed for human review');
  }
});

test('metrics confusion-matrix counts sum to evaluated case count', () => {
  const evaluated = cases.map(c => ({ c, o: runCase(c) }));
  const m = metric(evaluated, 'Sentinel');
  assert.equal(m.tp + m.fp + m.tn + m.fn, cases.length);
  assert.ok(m.sens.endsWith('%'));
  assert.ok(m.spec.endsWith('%'));
});

test('same case produces repeatable agent outputs', () => {
  const c = cases.find(c => c.id === 'SYN-003');
  assert.equal(JSON.stringify(runCase(c)), JSON.stringify(runCase(c)));
});

test('tube mismatch, low volume, QC failure, LIS outage, and stale data each trigger Sentinel', () => {
  for (const id of ['SYN-003', 'SYN-005', 'SYN-009', 'SYN-007', 'SYN-012']) {
    const c = cases.find(item => item.id === id);
    assert.equal(sentinel(c).flag, true, id + ' should trigger a configured safety check');
  }
});

test('elapsed time exactly at the configured stability boundary is not over the limit', () => {
  const base = cases.find(item => item.id === 'SYN-008');
  const c = JSON.parse(JSON.stringify(base));
  c.data.elapsed = c.data.stability;
  assert.equal(sentinel(c).flag, false);
});

test('volume exactly at the configured minimum is not below the minimum', () => {
  const base = cases.find(item => item.id === 'SYN-008');
  const c = JSON.parse(JSON.stringify(base));
  c.data.volume = c.data.minVolume;
  assert.equal(sentinel(c).flag, false);
});

test('missing identity fields are treated as a hard stop', () => {
  const base = cases.find(item => item.id === 'SYN-008');
  const c = JSON.parse(JSON.stringify(base));
  c.data.patient = '';
  assert.equal(sentinel(c).flag, true);
  assert.ok(sentinel(c).notes.some(n => /identity/i.test(n)));
});

test('missing or non-passing QC cannot silently pass', () => {
  const base = cases.find(item => item.id === 'SYN-008');
  for (const qc of [null, 'unknown', 'fail']) {
    const c = JSON.parse(JSON.stringify(base));
    c.data.qc = qc;
    assert.equal(sentinel(c).flag, true, 'QC=' + qc + ' should not pass');
  }
});

test('missing stability window is treated as unverifiable', () => {
  const base = cases.find(item => item.id === 'SYN-008');
  const c = JSON.parse(JSON.stringify(base));
  c.data.stability = null;
  assert.equal(sentinel(c).flag, true);
  assert.ok(sentinel(c).notes.some(n => /stability/i.test(n)));
});
