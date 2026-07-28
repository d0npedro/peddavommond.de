import { recalculateAll } from './formula.js';

const cells = {
  A1: '10',
  B1: '20',
  C1: '=SUM(A1:B1)',
  A2: '5',
  B2: '15',
  C2: '=AVERAGE(A2:B2)',
  A3: '=IF(C1>20,"yes","no")',
  A10: 'B2',
  B10: 'Beta',
  A11: 'A1',
  B11: 'Alpha',
  D1: 'B2',
  E1: '=VLOOKUP(D1,A10:B11,2)',
  F1: '=A1+B1*2',
};

const d = recalculateAll(cells);
console.log(d);

const checks = [
  ['C1', '30'],
  ['C2', '10'],
  ['A3', 'yes'],
  ['E1', 'Beta'],
  ['F1', '50'],
];

let ok = true;
for (const [k, v] of checks) {
  if (String(d[k]) !== v) {
    console.error('FAIL', k, 'got', d[k], 'want', v);
    ok = false;
  }
}
console.log(ok ? 'ALL FORMULA TESTS PASSED' : 'SOME FAILED');
process.exit(ok ? 0 : 1);
