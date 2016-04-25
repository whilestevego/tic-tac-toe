import _ from 'lodash';

const WIN_CONDITIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function selectIndexes(coll, indexes) {
  return _.filter(coll, (val, index) => _.includes(indexes, index));
}

function checkRow(row) {
  return /xxx|ooo/.test(row.join(''));
}

export function validateWin(grid) {
  return _.find(WIN_CONDITIONS, indexes => checkRow(selectIndexes(grid, indexes)));
}
