import _ from 'lodash';

export const computeGoalAverageFromEntries = (entries) => {
  let results = _.map(entries, (entry) => {
    return _.map(entry.results, (result, goalId) => { // eslint-disable-line no-unused-vars
      return result;
    });
  });

  results = _.flatten(results);
  results = _.pull(results, 0);
  const sum = _.sum(results);
  const avg = (sum / results.length);

  return _.round(avg, 1);
};

export const componentToHex = (c) => {
  const hex = c.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
};

export const rgbToHex = (r, g, b) => {
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
};

export const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16), // r
    parseInt(result[2], 16), // g
    parseInt(result[3], 16), // b
  ] : null;
};

function findRgbOffset(startRgb, endRgb, percentage) {

}

export const percentageOfColor = (startHex, endHex, percentage) => {
  const startRgb = hexToRgb(startHex);
  const endRgb = hexToRgb(endHex);
};
