const ceilToCents = (value) => Math.ceil(value * 100) / 100;
const getMonday = (date) => {
  const inputDate = new Date(date);
  const dayOfWeek = inputDate.getUTCDay() || 7; // 1 (Monday) to 7 (Sunday)
  const difference = dayOfWeek - 1; // Calculate days to go back to Monday
  const monday = new Date(inputDate);
  monday.setUTCDate(inputDate.getUTCDate() - difference);
  return monday;
};

module.exports = {
  ceilToCents,
  getMonday,
};
