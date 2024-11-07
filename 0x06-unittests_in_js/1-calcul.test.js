const assert = require('assert');
const calculateNumber = require('./1-calcul.js');

describe('calculateNumber', () => {
  it('should return the rounded sum of two numbers for type SUM', () => {
    assert.strictEqual(calculateNumber('SUM', 1, 3), 4);
    assert.strictEqual(calculateNumber('SUM', 1, 3.7), 5);
    assert.strictEqual(calculateNumber('SUM', 1, 3.2), 4);
    assert.strictEqual(calculateNumber('SUM', 1.2, 3), 4);
    assert.strictEqual(calculateNumber('SUM', 1.7, 3), 5);
    assert.strictEqual(calculateNumber('SUM', 1.2, 3.2), 4);
    assert.strictEqual(calculateNumber('SUM', 1.5, 3.7), 6);
  });

  it('should return the rounded difference of two numbers for type SUBTRACT', () => {
    assert.strictEqual(calculateNumber('SUBTRACT', 1, 3), -2);
    assert.strictEqual(calculateNumber('SUBTRACT', 3, 1), 2);
    assert.strictEqual(calculateNumber('SUBTRACT', 1, 3.7), -3);
    assert.strictEqual(calculateNumber('SUBTRACT', 3.7, 1), 3);
    assert.strictEqual(calculateNumber('SUBTRACT', 1, 3.2), -2);
    assert.strictEqual(calculateNumber('SUBTRACT', 3.2, 1), 2);
    assert.strictEqual(calculateNumber('SUBTRACT', 1.2, 3), -2);
    assert.strictEqual(calculateNumber('SUBTRACT', 3, 1.2), 2);
    assert.strictEqual(calculateNumber('SUBTRACT', 1.7, 3), -1);
    assert.strictEqual(calculateNumber('SUBTRACT', 3, 1.7), 1);
    assert.strictEqual(calculateNumber('SUBTRACT', 1.2, 3.2), -2);
    assert.strictEqual(calculateNumber('SUBTRACT', 3.2, 1.2), 2);
    assert.strictEqual(calculateNumber('SUBTRACT', 1.5, 3.7), -2);
    assert.strictEqual(calculateNumber('SUBTRACT', 3.7, 1.5), 2);
  });

  it('should return the rounded division result of two numbers for type DIVIDE', () => {
    assert.strictEqual(calculateNumber('DIVIDE', 1.4, 4.5), 0.2);
    assert.strictEqual(calculateNumber('DIVIDE', 2, 4), 0.5);
    assert.strictEqual(calculateNumber('DIVIDE', 1, 3.7), 0.25);
    assert.strictEqual(calculateNumber('DIVIDE', 1, 4.2), 0.25);
    assert.strictEqual(calculateNumber('DIVIDE', 1.2, 4), 0.25);
    assert.strictEqual(calculateNumber('DIVIDE', 1.7, 4), 0.5);
    assert.strictEqual(calculateNumber('DIVIDE', 1.2, 4.2), 0.25);
    assert.strictEqual(calculateNumber('DIVIDE', 1.5, 3.7), 0.5);
  });

  it('should return "Error" for type DIVIDE when the rounded divisor is 0', () => {
    assert.strictEqual(calculateNumber('DIVIDE', 1.4, 0), 'Error');
  });

  it('should throw an error for an invalid type', () => {
    assert.throws(() => calculateNumber('INVALID_TYPE', 1.4, 4.5), {
      message: 'Invalid type. Use SUM, SUBTRACT, or DIVIDE.'
    });
  });
});
