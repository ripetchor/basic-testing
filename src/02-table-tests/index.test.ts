// Uncomment the code below and write your tests
import { Action, simpleCalculator } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 10, b: 2, action: Action.Subtract, expected: 8 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: '1', b: '1', action: Action.Add, expected: null },
  { a: 1, b: 1, action: 'invalid action', expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should perform calculations',
    ({ a, b, action, expected }) => {
      const actual = simpleCalculator({ a, b, action });
      expect(actual).toBe(expected);
    },
  );
});
