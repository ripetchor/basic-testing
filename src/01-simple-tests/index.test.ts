// Uncomment the code below and write your tests
import { Action, simpleCalculator } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const actual = simpleCalculator({
      a: 1,
      b: 1,
      action: Action.Add,
    });

    const expected = 2;

    expect(actual).toBe(expected);
  });

  test('should subtract two numbers', () => {
    const actual = simpleCalculator({
      a: 10,
      b: 5,
      action: Action.Subtract,
    });

    const expected = 5;

    expect(actual).toBe(expected);
  });

  test('should multiply two numbers', () => {
    const actual = simpleCalculator({
      a: 2,
      b: 2,
      action: Action.Multiply,
    });

    const expected = 4;

    expect(actual).toBe(expected);
  });

  test('should divide two numbers', () => {
    const actual = simpleCalculator({
      a: 10,
      b: 2,
      action: Action.Divide,
    });

    const expected = 5;

    expect(actual).toBe(expected);
  });

  test('should exponentiate two numbers', () => {
    const actual = simpleCalculator({
      a: 2,
      b: 2,
      action: Action.Exponentiate,
    });

    const expected = 4;

    expect(actual).toBe(expected);
  });

  test('should return null for invalid action', () => {
    const actual = simpleCalculator({
      a: 1,
      b: 1,
      action: 'invalid action',
    });

    expect(actual).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const actual = simpleCalculator({
      a: '1',
      b: '1',
      action: Action.Add,
    });

    expect(actual).toBeNull();
  });
});
