// Uncomment the code below and write your tests
import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  let sutAccount!: BankAccount;
  const sutInitialBalance = 1000;

  let targetAccount!: BankAccount;
  const targetInitialBalance = 1000;

  beforeEach(() => {
    sutAccount = getBankAccount(sutInitialBalance);
    targetAccount = getBankAccount(targetInitialBalance);
  });

  test('should create account with initial balance', () => {
    expect(sutAccount.getBalance()).toBe(sutInitialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => sutAccount.withdraw(2000)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => sutAccount.transfer(2000, targetAccount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => sutAccount.transfer(1000, sutAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const depositAmount = 500;

    sutAccount.deposit(depositAmount);

    expect(sutAccount.getBalance()).toBe(sutInitialBalance + depositAmount);
  });

  test('should withdraw money', () => {
    const withdrawAmount = 500;

    sutAccount.withdraw(withdrawAmount);

    expect(sutAccount.getBalance()).toBe(sutInitialBalance - withdrawAmount);
  });

  test('should transfer money', () => {
    const transferAmount = 500;

    sutAccount.transfer(transferAmount, targetAccount);

    expect(targetAccount.getBalance()).toBe(
      targetInitialBalance + transferAmount,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const mockValue = 10;

    jest.spyOn(sutAccount, 'fetchBalance').mockResolvedValue(mockValue);

    const actual = await sutAccount.fetchBalance();

    expect(actual).toBe(mockValue);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const mockValue = 10;

    jest.spyOn(sutAccount, 'fetchBalance').mockResolvedValue(mockValue);

    await sutAccount.synchronizeBalance();

    expect(sutAccount.getBalance()).toBe(mockValue);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(sutAccount, 'fetchBalance').mockResolvedValue(null);

    await expect(sutAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
