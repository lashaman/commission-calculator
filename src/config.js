const cashInConfig = {
  percents: 0.03,
  maxCommission: 5,
  week_limit: {
    amount: 1000,
    currency: 'EUR',
  },
};

const cashOutConfig = {
  percents: 0.3,
  juridacalMinCommission: 0.50,
  week_limit: {
    amount: 1000,
    currency: 'EUR',
  },
};

module.exports = {
  cashInConfig,
  cashOutConfig,
};
