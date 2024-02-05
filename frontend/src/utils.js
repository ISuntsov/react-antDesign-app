export const percentDifference = (a, b) => {
  return +(100 * Math.abs((a - b) / ((a + b) / 2))).toFixed(2);
};

export const capitalizeFirst = (text) => {
  return text.charAt(0).toUpperCase() + text.substr(1);
};
