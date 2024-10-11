// Uncomment the code below and write your tests
import fs from 'node:fs';
import fsPromises from 'node:fs/promises';
import path from 'node:path';
import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';

describe('doStuffByTimeout', () => {
  let spySetTimeout!: jest.SpyInstance;
  let mockCallback!: jest.Mock;
  const timeoutMS = 5000;

  beforeEach(() => {
    spySetTimeout = jest.spyOn(global, 'setTimeout');
    mockCallback = jest.fn();
  });

  afterEach(() => {
    spySetTimeout.mockRestore();
    mockCallback.mockRestore();
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    doStuffByTimeout(mockCallback, timeoutMS);

    jest.runAllTimers();

    expect(spySetTimeout).toHaveBeenCalledWith(mockCallback, timeoutMS);
  });

  test('should call callback only after timeout', () => {
    expect(mockCallback).not.toHaveBeenCalled();

    doStuffByTimeout(mockCallback, timeoutMS);

    jest.runAllTimers();

    expect(mockCallback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  let spySetInterval!: jest.SpyInstance;
  let mockCallback!: jest.Mock;
  const intervalMS = 1000;

  beforeEach(() => {
    spySetInterval = jest.spyOn(global, 'setInterval');
    mockCallback = jest.fn();
  });

  afterEach(() => {
    spySetInterval.mockRestore();
    mockCallback.mockRestore();
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    doStuffByInterval(mockCallback, intervalMS);

    expect(spySetInterval).toHaveBeenCalledWith(mockCallback, intervalMS);
  });

  test('should call callback multiple times after multiple intervals', () => {
    doStuffByInterval(mockCallback, intervalMS);

    jest.advanceTimersByTime(intervalMS * 5);

    expect(mockCallback).toHaveBeenCalledTimes(5);
  });
});

describe('readFileAsynchronously', () => {
  const mockPathToFile = 'mock/path/to/mock.txt';
  const mockFileContent = 'mock content';

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should call join with pathToFile', async () => {
    const spyJoin = jest.spyOn(path, 'join');

    await readFileAsynchronously(mockPathToFile);

    expect(spyJoin).toHaveBeenCalled();
  });

  test('should return null if file does not exist', async () => {
    const spyExistsSync = jest.spyOn(fs, 'existsSync');

    spyExistsSync.mockReturnValue(false);

    await expect(readFileAsynchronously(mockPathToFile)).resolves.toBe(null);
  });

  test('should return file content if file exists', async () => {
    const spyExistsSync = jest.spyOn(fs, 'existsSync');
    spyExistsSync.mockReturnValue(true);

    const spyReadFile = jest.spyOn(fsPromises, 'readFile');
    spyReadFile.mockResolvedValue(mockFileContent);

    await expect(readFileAsynchronously(mockPathToFile)).resolves.toBe(
      mockFileContent,
    );
  });
});
