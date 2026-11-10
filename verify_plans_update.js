const fs = require('fs');
const path = require('path');

const plansPath = path.join(__dirname, 'project-data', 'plans.json');
const plans = JSON.parse(fs.readFileSync(plansPath, 'utf-8'));

console.log('--- PLANS CONSISTENCY CHECK ---');
console.log(`Total plans count: ${plans.length} (Expected: 4)`);
if (plans.length !== 4) throw new Error('Expected exactly 4 plans');

const expectedOrder = ['1-month', '3-months', '6-months', '12-months'];
const expectedPrices = [13, 19, 29, 49];

plans.forEach((p, idx) => {
  console.log(`\nPlan ${idx + 1}: ${p.id} ("${p.name}")`);
  console.log(`  Price: $${p.price} (Expected: $${expectedPrices[idx]})`);
  console.log(`  Duration: ${p.duration}, Months: ${p.months}`);
  console.log(`  Monthly Equivalent: $${p.monthlyEquivalent}`);
  console.log(`  Savings: ${p.savingsPercent}%`);
  console.log(`  isPopular: ${p.isPopular}, isBestValue: ${p.isBestValue}`);
  console.log(`  Features count: ${p.features.length} (Expected: 9)`);
  console.log(`  Delivery note: ${p.deliveryNote}`);

  if (p.id !== expectedOrder[idx]) throw new Error(`Order mismatch at index ${idx}`);
  if (p.price !== expectedPrices[idx]) throw new Error(`Price mismatch at index ${idx}`);
  if (p.features.length !== 9) throw new Error(`Expected 9 features for ${p.id}`);
});

const plan12 = plans[3];
if (!plan12.isBestValue || !plan12.isPopular) {
  throw new Error('12-months plan must have isBestValue: true and isPopular: true');
}

console.log('\n✓ ALL PLANS CONSISTENCY CHECKS PASSED!');

