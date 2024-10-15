// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const actual = generateLinkedList([1, 1, 1]);

    const expected = {
      value: 1,
      next: {
        value: 1,
        next: {
          value: 1,
          next: {
            value: null,
            next: null,
          },
        },
      },
    };

    expect(actual).toStrictEqual(expected);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const actual = generateLinkedList([2, 2, 2]);

    expect(actual).toMatchInlineSnapshot(`
      {
        "next": {
          "next": {
            "next": {
              "next": null,
              "value": null,
            },
            "value": 2,
          },
          "value": 2,
        },
        "value": 2,
      }
    `);
  });
});
