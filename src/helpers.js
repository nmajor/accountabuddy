import _ from 'lodash';
import { badDark, nuturalDark, goodDark } from './styleVars';

export const computeAverageFromEntries = (entries) => {
  if (entries.length === 0) { return null; }

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

export const computeGoalAveragesFromEntries = (entries) => {
  const goalAvgs = {};
  const goalEntrySize = {};

  _.each(entries, (entry) => {
    _.each(entry.results, (score, goalId) => {
      if (score !== 0) { goalEntrySize[goalId] = (goalEntrySize[goalId] || 0) + 1; }
      goalAvgs[goalId] = (goalAvgs[goalId] || 0) + score;
    });
  });

  _.each(goalAvgs, (score, goalId) => {
    goalAvgs[goalId] = _.round((goalAvgs[goalId] / goalEntrySize[goalId]), 1);
  });

  return goalAvgs;
};

function componentToHex(c) {
  const hex = c.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}

function rgbToHex(rgbArray) {
  return `#${componentToHex(rgbArray[0])}${componentToHex(rgbArray[1])}${componentToHex(rgbArray[2])}`;
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16), // r
    parseInt(result[2], 16), // g
    parseInt(result[3], 16), // b
  ] : null;
}

function findRgbDifference(startRgb, endRgb) {
  return [
    (endRgb[0] - startRgb[0]),
    (endRgb[1] - startRgb[1]),
    (endRgb[2] - startRgb[2]),
  ];
}

function findRgbOffset(startRgb, endRgb, percentage) {
  const diffRgb = findRgbDifference(startRgb, endRgb);

  return [
    Math.abs(Math.round(diffRgb[0] * percentage)),
    Math.abs(Math.round(diffRgb[1] * percentage)),
    Math.abs(Math.round(diffRgb[2] * percentage)),
  ];
}

function findOffsetDirection(startRgb, endRgb) {
  return [
    endRgb[0] > startRgb[0] ? 1 : -1,
    endRgb[1] > startRgb[1] ? 1 : -1,
    endRgb[2] > startRgb[2] ? 1 : -1,
  ];
}

function percentageOfColor(startHex, endHex, percentage) {
  const startRgb = hexToRgb(startHex);
  const endRgb = hexToRgb(endHex);
  const offsetRgb = findRgbOffset(startRgb, endRgb, percentage);
  const offsetDirection = findOffsetDirection(startRgb, endRgb);

  const val = [
    startRgb[0] + (offsetRgb[0] * offsetDirection[0]),
    startRgb[1] + (offsetRgb[1] * offsetDirection[1]),
    startRgb[2] + (offsetRgb[2] * offsetDirection[2]),
  ];

  return rgbToHex(val);
}

export const entryValueHex = (val) => {
  if (val >= 1 && val < 2) {
    const percentage = _.round((val - 1), 1);
    return percentageOfColor(badDark, nuturalDark, percentage);
  } else if (val >= 2 && val < 3) {
    const percentage = _.round((val - 2), 1);
    return percentageOfColor(nuturalDark, goodDark, percentage);
  } else if (val >= 2) {
    return goodDark;
  }
};
