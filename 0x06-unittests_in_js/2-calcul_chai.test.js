const { expect } = require('chai');
const calculateNumber = require('./1-calcul.js');

describe('calculateNumber', () => {
  it('should return the rounded sum of two numbers for type SUM', () => {
    expect(calculateNumber('SUM', 1, 3), 4);
    expect(calculateNumber('SUM', 1, 3.7), 5);
    expect(calculateNumber('SUM', 1, 3.2), 4);
    expect(calculateNumber('SUM', 1.2, 3), 4);
    expect(calculateNumber('SUM', 1.7, 3), 5);
    expect(calculateNumber('SUM', 1.2, 3.2), 4);
    expect(calculateNumber('SUM', 1.5, 3.7), 6);
  });

  it('should return the rounded difference of two numbers for type SUBTRACT', () => {
    expect(calculateNumber('SUBTRACT', 1, 3), -2);
    expect(calculateNumber('SUBTRACT', 3, 1), 2);
    expect(calculateNumber('SUBTRACT', 1, 3.7), -3);
    expect(calculateNumber('SUBTRACT', 3.7, 1), 3);
    expect(calculateNumber('SUBTRACT', 1, 3.2), -2);
    expect(calculateNumber('SUBTRACT', 3.2, 1), 2);
    expect(calculateNumber('SUBTRACT', 1.2, 3), -2);
    expect(calculateNumber('SUBTRACT', 3, 1.2), 2);
    expect(calculateNumber('SUBTRACT', 1.7, 3), -1);
    expect(calculateNumber('SUBTRACT', 3, 1.7), 1);
    expect(calculateNumber('SUBTRACT', 1.2, 3.2), -2);
    expect(calculateNumber('SUBTRACT', 3.2, 1.2), 2);
    expect(calculateNumber('SUBTRACT', 1.5, 3.7), -2);
    expect(calculateNumber('SUBTRACT', 3.7, 1.5), 2);
  });

  it('should return the rounded division result of two numbers for type DIVIDE', () => {
    expect(calculateNumber('DIVIDE', 1.4, 4.5), 0.2);
    expect(calculateNumber('DIVIDE', 2, 4), 0.5);
    expect(calculateNumber('DIVIDE', 1, 3.7), 0.25);
    expect(calculateNumber('DIVIDE', 1, 4.2), 0.25);
    expect(calculateNumber('DIVIDE', 1.2, 4), 0.25);
    expect(calculateNumber('DIVIDE', 1.7, 4), 0.5);
    expect(calculateNumber('DIVIDE', 1.2, 4.2), 0.25);
    expect(calculateNumber('DIVIDE', 1.5, 3.7), 0.5);
  });

  it('should return "Error" for type DIVIDE when the rounded divisor is 0', () => {
    expect(calculateNumber('DIVIDE', 1.4, 0), 'Error');
  });

  it('should throw an error for an invalid type', () => {
    expect(() => calculateNumber('INVALID_TYPE', 1.4, 4.5))
    .to
    .throw('Invalid type. Use SUM, SUBTRACT, or DIVIDE.');
    });
  });
