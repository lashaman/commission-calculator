const {
  commissionCalculator,
  calculateCashInCommission,
  calculateCashOutNaturalCommission,
  calculateCashOutJuridicalCommission,
} = require('../src/commissionCalculator');

describe('calculateCashInCommission', () => {
  test('calculates cash in commission correctly', () => {
    expect(calculateCashInCommission(200)).toBe(0.06);
  });

  test('limits commission to 5 EUR', () => {
    expect(calculateCashInCommission(200000)).toBe(5);
  });
});

describe('calculateCashOutNaturalCommission', () => {
  test('calculates cash out commission correctly when exceeding the limit', () => {
    expect(calculateCashOutNaturalCommission(900, 124, '2016-02-06')).toBe(0);
    expect(calculateCashOutNaturalCommission(200, 124, '2016-02-06')).toBe(0.3);
  });

  test('calculates cash out commission correctly within the limit', () => {
    expect(calculateCashOutNaturalCommission(800, null, '2016-12-09')).toBe(0);
  });
});

describe('calculateCashOutJuridicalCommission', () => {
  test('calculates cash out commission correctly', () => {
    expect(calculateCashOutJuridicalCommission(300)).toBe(0.90);
  });

  test('sets minimum commission to 0.50 EUR', () => {
    expect(calculateCashOutJuridicalCommission(100)).toBe(0.50);
  });
});

describe('commissionCalculator', () => {
  test('calculates commission for cash in operation', () => {
    const operation = {
      type: 'cash_in',
      user_type: 'natural',
      operation: {
        amount: 200,
        currency: 'EUR',
      },
    };
    expect(commissionCalculator(operation)).toBe(0.06);
  });

  test('calculates commission for cash out operation for natural user', () => {
    const operation = {
      type: 'cash_out',
      user_type: 'natural',
      operation: {
        amount: 3000,
        currency: 'EUR',
      },
    };
    expect(commissionCalculator(operation)).toBe(6);
  });

  test('calculates commission for cash out operation for juridical user', () => {
    const operation = {
      type: 'cash_out',
      user_type: 'juridical',
      operation: {
        amount: 300,
        currency: 'EUR',
      },
    };
    expect(commissionCalculator(operation)).toBe(0.90);
  });
});
