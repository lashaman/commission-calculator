const { cashInConfig, cashOutConfig } = require('./config');
const { UserType, OperationType } = require('./types');
const { ceilToCents, getMonday } = require('./helpers');

const userWeeklyCashOutData = new Map();
const calculateCashInCommission = (amount) => {
  const commission = (amount * cashInConfig.percents) / 100;
  return Math.min(commission, cashInConfig.maxCommission);
};

const calculateCashOutNaturalCommission = (amount, userId, date) => {
  const currentTransactionDate = new Date(date);
  const weekStartDay = getMonday(currentTransactionDate);
  const existingUserData = userWeeklyCashOutData.get(userId);

  if (!existingUserData || existingUserData.startDate < weekStartDay) {
    userWeeklyCashOutData.set(userId, {
      totalAmount: amount,
      startDate: weekStartDay,
    });

    if (amount <= cashOutConfig.week_limit.amount) {
      return 0;
    }
    const exceededAmount = amount - cashOutConfig.week_limit.amount;
    return ceilToCents((exceededAmount * cashOutConfig.percents) / 100);
  }
  const updatedTotalAmount = existingUserData.totalAmount + amount;
  const remainingLimit = cashOutConfig.week_limit.amount - existingUserData.totalAmount;

  userWeeklyCashOutData.set(userId, {
    totalAmount: updatedTotalAmount,
    startDate: existingUserData.startDate,
  });

  if (remainingLimit > 0) {
    if (amount <= remainingLimit) {
      return 0;
    }
    const exceededAmount = amount - remainingLimit;
    return ceilToCents((exceededAmount * cashOutConfig.percents) / 100);
  }
  return ceilToCents((amount * cashOutConfig.percents) / 100);
};

const calculateCashOutJuridicalCommission = (amount) => {
  const commission = (amount * cashOutConfig.percents) / 100;
  return Math.max(ceilToCents(commission), cashOutConfig.juridacalMinCommission);
};

const commissionCalculator = (operation) => {
  const {
    date,
    user_id: userId,
    type,
    user_type: userType,
    operation: { amount },
  } = operation;
  if (type === OperationType.CASH_IN) {
    return calculateCashInCommission(amount);
  }

  if (type === OperationType.CASH_OUT && userType === UserType.NATURAL) {
    return calculateCashOutNaturalCommission(amount, userId, date);
  }

  if (type === OperationType.CASH_OUT && userType === UserType.JURIDICAL) {
    return calculateCashOutJuridicalCommission(amount);
  }

  throw new Error(`Invalid operation: ${JSON.stringify(operation)}`);
};

module.exports = {
  commissionCalculator,
  calculateCashInCommission,
  calculateCashOutNaturalCommission,
  calculateCashOutJuridicalCommission,
};
